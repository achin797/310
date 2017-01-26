/**
 * Created by rtholmes on 2016-09-03.
 */

import Log from "../Util";
import JSZip = require('jszip');
import fs = require('fs');
import {error} from "util";
import {stringify} from "querystring";
import {ASTNode} from "parse5";
import {TreeAdapter} from "parse5";
import parse5 = require('parse5');
/**
 * In memory representation of all datasets.
 */
export interface Datasets {
    [id: string]: {};

}

export default class DatasetController {

    private datasets: Datasets = {};

    constructor() {
        Log.trace('DatasetController::init()');
    }
    /**
     * Returns the referenced dataset. If the dataset is not in memory, it should be
     * loaded from disk and put in memory. If it is not in disk, then it should return
     * null.
     *
     * @param id
     * @returns {{}}
     */
    public getDataset(id: string): any {
        // TODO: this should check if the dataset is on disk in ./data if it is not already in memory.
        var fs = require("fs");
        var inDisk : boolean = fs.existsSync('./data/' + id +'.json');

        if (!inDisk) {
            return null;
        }

        if (this.datasets[id] === undefined || this.datasets[id] === {}) {
            var data = fs.readFileSync("./data/"+id+".json", "utf8");
            this.datasets[id] = JSON.parse(data);
            Log.trace(JSON.stringify(this.datasets[id]));
        }

        return this.datasets[id];
    }

    public getDatasets(): Datasets {
        // TODO: if datasets is empty, load all dataset files in ./data from disk

        var courses :any = this.datasets["courses"];
        if (courses === undefined) {
            var fs = require('fs');
            if (fs.existsSync("./data/courses.json")) {
                this.datasets["courses"] = JSON.parse(fs.readFileSync("./data/courses.json", "utf8"));
            }
        }

        var rooms :any = this.datasets["rooms"];
        if (rooms === undefined) {
            var fs = require('fs');
            if (fs.existsSync("./data/rooms.json")) {
                this.datasets["rooms"] = JSON.parse(fs.readFileSync("./data/rooms.json", "utf8"));
            }
        }
        return this.datasets;
    }


    public delete(id: string): Promise<boolean> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                var fs = require("fs");
                var inDisk : boolean = fs.existsSync('./data/' + id +'.json');

                if (Object.keys(that.datasets).length !== 0) {
                    that.datasets = {};
                }

                if (inDisk) {
                    fs.unlinkSync('./data/' + id +'.json');
                } else {
                    throw Error;
                }
            } catch (err) {
                //Log.trace('DatasetController::process(..) - ERROR: ' + err);
                reject(err);
            }
        });
    }




    /**
     * Process the dataset; save it to disk when complete.
     *
     * @param id
     * @param data base64 representation of a zip file
     * @returns {Promise<boolean>} returns true if successful; false if the dataset was invalid (for whatever reason)
     */
    public process(id: string, data: any): Promise<boolean> {
        Log.trace('DatasetController::process( ' + id + '... )');

        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                let myZip = new JSZip();

                myZip.loadAsync(data, {base64: true}).then(function (zip: JSZip) {
                    Log.trace('DatasetController::process(..) - unzipped');

                    var processedDataset = new Array();
                    var allMyPromises  = new Array();
                    var allMyPromises2  = new Array();

                    // TODO: iterate through files in zip (zip.files)
                    // The contents of the file will depend on the id provided. e.g.,
                    // some zips will contain .html files, some will contain .json files.
                    // You can depend on 'id' to differentiate how the zip should be handled,
                    // although you should still be tolerant to errors.

                    // zip.folder("courses").forEach(function (relativePath, file){
                    //     Log.trace("iterating over" + file);
                    // });

                    zip.forEach(function(relativePath: string, file: JSZipObject) {
                        if (!file.dir) {


                            if (file.name.indexOf("course") == -1) {
                                throw Error;
                            }

                            var p = file.async("string");
                            allMyPromises.push(p);

                        }
                    });

                    Promise.all(allMyPromises).then( function(filesString) {
                        filesString.forEach(function(data : any) {

                            var obj = JSON.parse(data);
                            obj.result.forEach(function(res :any) {
                                var course :any = new Object();
                                course['courses_dept'] = res['Subject'];
                                course['courses_id'] = res['Course'];
                                course['courses_avg'] = res['Avg'];
                                course['courses_instructor'] = res['Professor'];
                                course['courses_title'] = res['Title'];
                                course['courses_pass'] = res['Pass'];
                                course['courses_fail'] = res['Fail'];
                                course['courses_audit'] = res['Audit'];
                                course['courses_uuid'] = res['id'].toString();
                                course['courses_sectionSize'] = res['Pass'] + res['Fail'];
                                if (res['Section'] === "overall") {
                                    course['courses_year'] = 1900;
                                } else {
                                    course['courses_year'] = Number(res['Year']);

                                }

                                processedDataset.push(course);

                            })
                        });
                        that.save(id, processedDataset);
                        fulfill(true);
                    }).catch(function(reason:any) {
                        //Log.error('Error in saving data' + reason);
                        reject(reason);
                    });



                }).catch(function (err) {
                    //Log.trace('DatasetController::process(..) - unzip ERROR: ' + err.message);
                    reject(err);
                });
            } catch (err) {
                //Log.trace('DatasetController::process(..) - ERROR: ' + err);
                reject(err);
            }
        });
    }


    public process2(id: string, data: any): Promise<boolean> {
        Log.trace('DatasetController::process( ' + id + '... )');

        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                let myZip = new JSZip();

                myZip.loadAsync(data, {base64: true}).then(function (zip: JSZip) {
                    Log.trace('DatasetController::process(..) - unzipped');

                    var processedDataset :any = new Array();
                    var allMyPromises  = new Array();
                    var allMyPromises2  = new Array();

                    zip.forEach(function(relativePath: string, file: JSZipObject) {

                        if (file.name.indexOf("index.htm") !== -1) {
                            var p = file.async("string");
                            allMyPromises.push(p);
                            return;
                        }

                        if (!file.dir && file.name.indexOf("DS_Store")== -1 ) {
                            if (file.name.indexOf("rooms") == -1) {
                                throw Error;
                            }
                            var p = file.async("string");
                            allMyPromises.push(p);
                        }
                    });

                    Promise.all(allMyPromises).then( function(filesString) {

// add all classes from index into an array, check that each class in on index before making rooms
                        var index :string = filesString[76];
                        var usefulIndex :string = index.substring(index.indexOf('<div class="view-content">'), index.indexOf('</table>')+20);
                        let adapter: parse5.TreeAdapter = parse5.treeAdapters.default;
                        let indexDocument: ASTNode = parse5.parse(usefulIndex);
                        var tempIndex :any = adapter.getFirstChild(indexDocument);
                        var tempIndex2 :any = adapter.getChildNodes(tempIndex);
                        var tempIndex3 :any = tempIndex2[1];
                        var tempIndex4 :any = adapter.getFirstChild(tempIndex3);
                        var tempIndex5 :any = adapter.getChildNodes(tempIndex4);
                        var tempIndex6 :any = tempIndex5[1];
                        var tempIndex7 :any = adapter.getChildNodes(tempIndex6);
                        var tempIndex8 :any = tempIndex7[3];
                        var tempIndex9 :any = adapter.getChildNodes(tempIndex8);
                        var validBuildings :any = new Array();
                        for(var i=0; i<tempIndex9.length; ++i) {
                            if ((i%2)!==0) {
                                var temp :any = tempIndex9[i];
                                var temp2 :any = adapter.getChildNodes(temp);
                                var temp3 :any = temp2[5];
                                var temp4 :any = adapter.getChildNodes(temp3);
                                var temp5 :any = temp4[1];
                                var temp6 :any = adapter.getFirstChild(temp5);
                                var name :any = temp6["value"];
                                validBuildings.push(name);
                            }
                        }

                        var tempRoom :any ;
                        var tempRoom2 :any;
                        var tempRoom3 :any ;
                        var number :any;
                        var seats :any ;
                        var furniture :any ;
                        var type :any;

                        filesString.forEach(function(data : any) {
                            if (data !== filesString[76]) {
                                var usefulData: string = data.substring(data.indexOf('<div id="buildings-wrapper">'), data.indexOf('<div id="building-image">'));
                                let document: ASTNode = parse5.parse(usefulData);
                                var childNodes: any = adapter.getFirstChild(document);
                                var tempName: any = adapter.getChildNodes(childNodes);
                                tempName = tempName[1];
                                tempName = adapter.getFirstChild(tempName);
                                tempName = adapter.getChildNodes(tempName);
                                tempName = tempName[1];
                                var tempName2: any = adapter.getChildNodes(tempName);
                                tempName = tempName2[1];
                                tempName = adapter.getFirstChild(tempName);
                                tempName = adapter.getFirstChild(tempName);
                                var fullName: any = tempName["value"];
                                var lat :any;
                                var lon :any;

                                for (var i = 0; i < validBuildings.length; ++i) {

                                    if (fullName.indexOf(validBuildings[i]) !== -1) {

                                        var p = new Promise(function (fulfill :any, reject :any) {

                                            tempName = tempName2[3];
                                            tempName = adapter.getFirstChild(tempName);
                                            tempName = adapter.getFirstChild(tempName);
                                            var address: any = tempName["value"];
                                            var tempAddress :any = address;

                                            if (data.indexOf('buildingID=') !== -1) {
                                                var shortName: any = data.substring(data.indexOf('buildingID=') + 11, data.indexOf('"', data.indexOf('buildingID=') + 11));
                                            } else {
                                                var shortName: any = data.substring(data.indexOf('http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/') + 69, data.indexOf('-', data.indexOf('http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/') + 69));
                                            }
                                            var urlAddress :any = encodeURI(tempAddress);
                                            var restify = require('restify');
                                            var client = restify.createJsonClient({
                                                url: 'http://skaha.cs.ubc.ca:8022/api/v1/team42/'+urlAddress,
                                                version: '*'
                                            });

                                            client.get('', function(err :any, req :any, res :any, obj :any) {

                                                if (obj["lat"] !== undefined) {
                                                    lat = obj["lat"];
                                                    lon = obj["lon"];
                                                    fulfill(true);
                                                } else {
                                                    fulfill(false);
                                                }
                                            });
                                        }).then(function (value) {
                                            if (data.indexOf('<td class="views-field views-field-field-room-number" >') !== -1) {

                                                tempName = tempName2[3];
                                                tempName = adapter.getFirstChild(tempName);
                                                tempName = adapter.getFirstChild(tempName);
                                                var address: any = tempName["value"];
                                                if (data.indexOf('buildingID=') !== -1) {
                                                    var shortName: any = data.substring(data.indexOf('buildingID=') + 11, data.indexOf('"', data.indexOf('buildingID=') + 11));
                                                } else {
                                                    var shortName: any = data.substring(data.indexOf('http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/') + 69, data.indexOf('-', data.indexOf('http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/') + 69));
                                                }
                                                var roomsData: string = data.substring(data.lastIndexOf('<div class="view-content">'), data.indexOf('</table>') + 20);
                                                let roomDocument: ASTNode = parse5.parse(roomsData);
                                                //make a room for each object that has a child node
                                                tempRoom = adapter.getFirstChild(roomDocument);
                                                tempRoom = adapter.getChildNodes(tempRoom);
                                                tempRoom = tempRoom[1];
                                                tempRoom = adapter.getFirstChild(tempRoom);
                                                tempRoom = adapter.getChildNodes(tempRoom);
                                                tempRoom = tempRoom[1];
                                                tempRoom = adapter.getChildNodes(tempRoom);
                                                tempRoom = tempRoom[3];
                                                tempRoom = adapter.getChildNodes(tempRoom);
                                                for (var i = 0; i < tempRoom.length; ++i) {
                                                    if ((i % 2) !== 0) {
                                                        tempRoom2 = tempRoom[i];
                                                        tempRoom3 = adapter.getChildNodes(tempRoom2);
                                                        tempRoom2 = tempRoom3[1];
                                                        tempRoom2 = adapter.getChildNodes(tempRoom2);
                                                        tempRoom2 = tempRoom2[1];
                                                        tempRoom2 = adapter.getFirstChild(tempRoom2);
                                                        number = tempRoom2["value"];
                                                        tempRoom2 = tempRoom3[3];
                                                        tempRoom2 = adapter.getFirstChild(tempRoom2);
                                                        seats = tempRoom2["value"];
                                                        seats = seats.substring(2);
                                                        seats = seats.trim();
                                                        tempRoom2 = tempRoom3[5];
                                                        tempRoom2 = adapter.getFirstChild(tempRoom2);
                                                        furniture = tempRoom2["value"];
                                                        furniture = furniture.substring(2);
                                                        furniture = furniture.trim();
                                                        tempRoom2 = tempRoom3[7];
                                                        tempRoom2 = adapter.getFirstChild(tempRoom2);
                                                        type = tempRoom2["value"];
                                                        type = type.substring(2);
                                                        type = type.trim();

                                                        var room: any = new Object();
                                                        room['rooms_fullname'] = fullName;
                                                        room['rooms_shortname'] = shortName;
                                                        room['rooms_number'] = number;
                                                        room['rooms_name'] = room['rooms_shortname'] + "_" + room['rooms_number'];
                                                        room['rooms_address'] = address;
                                                        room['rooms_lat'] = lat;
                                                        room['rooms_lon'] = lon;
                                                        room['rooms_seats'] = Number(seats);
                                                        room['rooms_type'] = type;
                                                        room['rooms_furniture'] = furniture;
                                                        room['rooms_href'] = "http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/"+shortName+ "-" + number;
                                                        processedDataset.push(room);
                                                    }
                                                }
                                            }
                                        });
//update lat lon here
                                        allMyPromises2.push(p);
                                        break;
                                    }
                                }
                            }
                        });

                        Promise.all(allMyPromises2).then( function(room) {
                            that.save(id, processedDataset);
                            fulfill(true);

                        });


                    }).catch(function(reason:any) {
                        //Log.error('Error in saving data' + reason);
                        reject(reason);
                    });

                }).catch(function (err) {
                    //Log.trace('DatasetController::process(..) - unzip ERROR: ' + err.message);
                    reject(err);
                });
            } catch (err) {
                //Log.trace('DatasetController::process(..) - ERROR: ' + err);
                reject(err);
            }
        });
    }

    /**
     * Writes the processed dataset to disk as 'id.json'. The function should overwrite
     * any existing dataset with the same name.
     *
     * @param id
     * @param processedDataset
     */
    public save(id: string, processedDataset: any) {
        // add it to the memory model
        if (!fs.existsSync('./data')){
            fs.mkdirSync('./data');
        }
        this.datasets[id] = processedDataset;
        //fs.writeFile(id, processedDataset, error);

        Log.trace("imma save dis one rn");
        fs.writeFile('./data/' + id + '.json', JSON.stringify(processedDataset), (err) => {
            if (err) throw err;
        });

        // TODO: actually write to disk in the ./data directory
    }
}