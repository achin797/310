

/**
 * Created by rtholmes on 2016-09-03.
 */

import DatasetController from "../src/controller/DatasetController";
import Log from "../src/Util";

import JSZip = require('jszip');
import {expect} from 'chai';

describe("DatasetController", function () {
    var controller: DatasetController = null;

    beforeEach(function () {
        controller = new DatasetController();
    });

    afterEach(function () {
    });
    it("getDataset Test (204)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        var fs = require("fs");
        var inDisk : boolean = fs.existsSync('./data/' + "courses" +'.json');
        if (inDisk) {
            var dataset = controller.getDataset('courses');
            expect(dataset).to.not.equal(null);
        } else {
            var dataset = controller.getDataset('courses');
            expect(dataset).to.equal(null);
        }

    });

    it("getDatasets Test (204)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        var fs = require("fs");
        var inDisk : boolean = fs.existsSync('./data/' + "courses" +'.json');
        if (inDisk) {
            var dataset = controller.getDatasets();
            expect(dataset).to.not.equal(null);
        } else {
            expect.fail();
        }
    });

    //
    it("Should be able to return dataset if dataset is undefined or null", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        return controller.getDataset(undefined).then(function (response: any) {
            expect(response.code).to.equal(204);
        }).catch(function (response: any) {
            expect.fail();
        });
    });

    it("Should not be able to get dataset if rooms.json does not exist", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);


        var fs = require("fs");
        var inDisk : boolean = fs.existsSync('./data/' + "rooms" +'.json');
        if (inDisk) {

            var dataset = controller.getDatasets();
            expect(dataset).to.not.equal(null);
        } else {
            expect.fail();
        }
    });

});