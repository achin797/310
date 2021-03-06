/**
 * Created by rtholmes on 2016-06-14.
 */
import restify = require('restify');
import fs = require('fs');

import DatasetController from '../controller/DatasetController';
import {Datasets} from '../controller/DatasetController';
import QueryController from '../controller/QueryController';

import {QueryRequest} from "../controller/QueryController";
import Log from '../Util';
import InsightFacade from "../controller/InsightFacade";

export default class RouteHandler {

    private static datasetController = new DatasetController();
    private static insightFacade = new InsightFacade();

    public static getHomepage(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('RoutHandler::getHomepage(..)');
        fs.readFile('./src/rest/views/index.html', 'utf8', function (err: Error, file: Buffer) {
            if (err) {
                res.send(500);
                Log.error(JSON.stringify(err));
                return next();
            }
            res.write(file);
            res.end();
            return next();
        });
    }

    public static putDataset(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('RouteHandler::postDataset(..) - params: ' + JSON.stringify(req.params));
        try {
            var id: string = req.params.id;

            if (id === "courses") {
                // stream bytes from request into buffer and convert to base64
                // adapted from: https://github.com/restify/node-restify/issues/880#issuecomment-133485821
                let buffer: any = [];
                req.on('data', function onRequestData(chunk: any) {
                    Log.trace('RouteHandler::postDataset(..) on data; chunk length: ' + chunk.length);
                    buffer.push(chunk);
                });

                req.once('end', function () {
                    let concated = Buffer.concat(buffer);
                    req.body = concated.toString('base64');
                    Log.trace('RouteHandler::postDataset(..) on end; total length: ' + req.body.length);

                    let facade = RouteHandler.insightFacade;

                    return facade.addDataset('courses', req.body).then(function (result) {
                        res.json(result.code, {success: result});
                    }).catch(function (err: Error) {
                        Log.trace('RouteHandler::postDataset(..) - ERROR: ' + err.message);
                        res.json(400, {err: err.message});
                    });

                });
            } else if (id === "rooms") {
                let buffer: any = [];
                req.on('data', function onRequestData(chunk: any) {
                    Log.trace('RouteHandler::postDataset(..) on data; chunk length: ' + chunk.length);
                    buffer.push(chunk);
                });

                req.once('end', function () {
                    let concated = Buffer.concat(buffer);
                    req.body = concated.toString('base64');
                    Log.trace('RouteHandler::postDataset(..) on end; total length: ' + req.body.length);

                    let facade = RouteHandler.insightFacade;
                    Log.any(1);
                    return facade.addDataset('rooms', req.body).then(function (result) {
                        res.json(result.code, {success: result});
                    }).catch(function (err: Error) {
                        Log.trace('RouteHandler::postDataset(..) - ERROR: ' + err.message);
                        res.json(400, {err: err.message});
                    });

                });

            }

        } catch (err) {
            Log.error('RouteHandler::postDataset(..) - ERROR: ' + err.message);
            res.send(400, {err: err.message});
        }
        return next();
    }

    public static postQuery(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('RouteHandler::postQuery(..) - params: ' + JSON.stringify(req.params));
        try {

            let query: QueryRequest = req.params;

            let facade = RouteHandler.insightFacade;

            return facade.performQuery(query).then(function (result) {
                res.json(result.code, result.body);
            }).catch(function (err : Error) {
                res.json(400, {error: err.message});
            });

        } catch (err) {
            Log.error('RouteHandler::postQuery(..) - ERROR: ' + err);
            res.send(403);
        }
        return next();
    }

    public static deleteDataset(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('RouteHandler::postDataset(..) - params: ' + JSON.stringify(req.params));
        try {
            var id: string = req.params.id;
            let buffer: any = [];
            req.on('data', function onRequestData(chunk: any) {
                Log.trace('RouteHandler::postDataset(..) on data; chunk length: ' + chunk.length);
                buffer.push(chunk);
            });

            req.once('end', function () {
                let concated = Buffer.concat(buffer);
                req.body = concated.toString('base64');
                Log.trace('RouteHandler::postDataset(..) on end; total length: ' + req.body.length);

                let controller = RouteHandler.insightFacade;

                return controller.removeDataset(id).then(function (result) {
                    res.json(result.code, {success:result});
                }).catch(function (err: Error) {
                    Log.trace('RouteHandler::postDataset(..) - ERROR: ' + err.message);
                    res.json(404, {err: err.message});
                });
            });

        } catch (err) {
            Log.error('RouteHandler::postDataset(..) - ERROR: ' + err.message);
            res.send(404, {err: err.message});
        }
        return next();
    }



}