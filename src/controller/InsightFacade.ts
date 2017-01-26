/**
 * Created by Leo on 10/18/2016.
 */


import Log from "../Util";
import fs = require('fs');
import DatasetController from '../controller/DatasetController';
import {QueryRequest, default as QueryController} from "../controller/QueryController";
import {InsightResponse} from "./IInsightFacade";
//declare var facade: InsightResponse;

export default class InsightFacade {
    private static datasetController = new DatasetController();


    public addDataset(id: string, content: string): Promise<InsightResponse> {

        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                let controller = InsightFacade.datasetController;
                var a : Number;
                if (controller.getDataset(id) == null || controller.getDataset(id) == {}){
                    a = 204;
                } else {
                    a = 201;
                }
                if (id === "courses") {
                    controller.process(id, content).then(function (result) {
                        fulfill({code: a, body: {}});
                    }).catch(function (err: Error) {
                        reject({code: 400, error: 'error'});
                    });
                } else if (id === "rooms") {
                    Log.any(2);
                    controller.process2(id, content).then(function (result) {
                        fulfill({code: a, body: {}});
                    }).catch(function (err: Error) {
                        reject({code: 400, error: 'error'});
                    });
                }
            } catch (err) {
                reject({code:400, error: 'error'});
            }
        });
    }


    public removeDataset(id: string): Promise<InsightResponse> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                let controller = InsightFacade.datasetController;
                controller.delete(id).then(function (result) {
                    fulfill({code: 204, body: {}});
                }).catch(function (err: Error) {
                    reject({code: 404, error: 'dataset not found'});
                });

            } catch (err) {
                reject({code: 404, error: 'dataset not found'});
            }
        });
    }

    public performQuery(query: QueryRequest): Promise<InsightResponse> {

        let that = this;
        return new Promise(function (fulfill, reject) {
            try {

                let queryController = new QueryController(InsightFacade.datasetController.getDatasets());
                Log.any(query);
                let isValid = queryController.isValid(query);
                let id = queryController.datasetValid(query);
                let dataset = InsightFacade.datasetController.getDataset(id);
                if (isValid) {
                    if (dataset === undefined || dataset === null) {
                        return fulfill({code:424, body :{missing: id}});
                    } else {
                        var result = queryController.query(query);
                        return fulfill({code:200, body: result}); //JSON.stringify(result) ?
                    }
                } else {
                    reject({code:400, error :'invalid query'});
                }
            } catch (err) {
                reject({code:400, error: 'error'});
            }
        });
    }

}