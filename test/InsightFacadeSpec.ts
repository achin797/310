

import fs = require('fs');
import Log from "../src/Util";
import {expect} from 'chai';
import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse} from "../src/controller/IInsightFacade";
import {QueryRequest} from "../src/controller/QueryController";

describe("InsightFacade", function () {

    var zipFileContents: string = null;
    var zipFileContents2: string = null;
    var facade: InsightFacade = null;
    before(function () {
        Log.info('InsightController::before() - start');

        zipFileContents = new Buffer(fs.readFileSync('310courses.1.0.zip')).toString('base64');
        zipFileContents2 = new Buffer(fs.readFileSync('310rooms.1.1.zip')).toString('base64');
        try {
            // what you delete here is going to depend on your impl, just make sure
            // all of your temporary files and directories are deleted
            fs.unlinkSync('./data/courses.json');
            fs.unlinkSync('./data/rooms.json');
        } catch (err) {
            // silently fail, but don't crash; this is fine
            Log.warn('InsightController::before() - id.json not removed (probably not present)');
        }
        Log.info('InsightController::before() - done');
    });

    beforeEach(function () {
        facade = new InsightFacade;
    });

    it("Should be able to add a new dataset using process(204)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        return facade.addDataset('courses', zipFileContents).then(function (response: InsightResponse) {
            expect(response.code).to.equal(204);
        }).catch(function (response: InsightResponse) {
            expect.fail('Should not happen');
        });
    });
    ///

/*    it("Should be able to delete dataset rooms", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        return facade.removeDataset('rooms').then(function (response: InsightResponse) {
            expect(response.code).to.equal(404);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        })
    });*/



    it("Should be able to add a new dataset using process2 (204)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        return facade.addDataset('rooms', zipFileContents2).then(function (response: InsightResponse) {
            expect(response.code).to.equal(204);
        }).catch(function (response: InsightResponse) {
            expect.fail('Should not happen');
        });
    });

    it("Should be able to update an existing dataset (201)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        return facade.addDataset('courses', zipFileContents).then(function (response: InsightResponse) {
            expect(response.code).to.equal(201);
        }).catch(function (response: InsightResponse) {
            expect.fail('Should not happen');
        });
    });

    it("Should not be able to add an invalid dataset (400)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        return facade.addDataset('courses', 'some random bytes').then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query a valid query (200)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage"],
            "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
            "GROUP": [ "courses_id" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail('Should not happen');
        });
    });

    it("Should be able to query a more complex valid query (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "courseAverage", "maxFail"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}}, {"maxFail": {"MAX": "courses_fail"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "maxFail", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail('Should not happen');
        });
    });

    it("Should be able to query COUNT correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"numSections": {"COUNT": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail('Should not happen');
        });
    });

    it("Should not be able to query when group is not in get (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courseAverage"],
            "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
            "GROUP": [ "courses_id" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when GT dept (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage"],
            "WHERE": {"GT": {"courses_dept": "cpsc"}} ,
            "GROUP": [ "courses_id" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when key is invalid (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage"],
            "WHERE": {"IS": {"courses_invalid": "cpsc"}} ,
            "GROUP": [ "courses_id" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when GROUP and no APPLY (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage"],
            "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
            "GROUP": [ "courses_id" ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when APPLY and no GROUP (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage"],
            "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when no GET (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
            "GROUP": [ "courses_id" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when no AS (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage"],
            "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
            "GROUP": [ "courses_id" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]}
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when GROUP by nothing (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when GROUP doesn't have _ (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "coursesid" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when get doesn't have gorup values (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id", "courses_dept" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when Apply has same strings (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id"],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}}, {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query when Apply has more than GET (400)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id"],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}}, {"courseMIN": {"MIN": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });


    it("Should should be able to query a D1 ORDER (200)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_dept", "courses_avg"],
                "WHERE": {
                    "GT": {
                        "courses_avg": 90
                    }
                },
                "ORDER": "courses_avg",
                "AS": "TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail('Should not happen');
        });
    });




    /*
     CORRECT QUERY:
     {
     "GET": ["courses_dept", "courses_id", "numSections"],
     "WHERE": {},
     "GROUP": [ "courses_dept", "courses_id" ],
     "APPLY": [ {"numSections": {"COUNT": "courses_uuid"}} ],
     "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
     "AS":"TABLE"
     }
     */
    it("Should be able to query MIN correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "minAverage"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"minAverage": {"MIN": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["minAverage", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });
    it("Should not be able to query MIN on type string", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"numSections": {"MIN": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail('Cannot call MIN on string.');
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });
    it("Should be able to query MAX correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "maxAverage"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"maxAverage": {"MAX": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["maxAverage", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });
    it("Should not be able to query MAX on type string", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"numSections": {"MAX": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail('Cannot call MAX on string.');
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query AVG on type string", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"numSections": {"AVG": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail('Cannot call AVG on string.');
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });
    it("Should be able to query COUNT correctly on type string (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"numSections": {"COUNT": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });
    it("Should be able to query COUNT correctly on type number (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numFailedStudents"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"numFailedStudents": {"COUNT": "courses_fail"}} ],
            "ORDER": { "dir": "UP", "keys": ["numFailedStudents", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to APPLY terms not in GET", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"numFailedStudents": {"COUNT": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });
    it("Should not be able to query GROUP if APPLY not present", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });
    it("Should not be able to query APPLY if GROUP not present", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "APPLY": [ {"numSections": {"COUNT": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });
    it("Should not be able to query if GROUP contains no terms", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [],
            "APPLY": [ {"numSections": {"COUNT": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });
    it("Should not be able to query if GET contains terms other than type String[]", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": [1, 2, 3],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"numSections": {"COUNT": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query if GROUP contains terms other than type String[]", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [1,2],
            "APPLY": [ {"numSections": {"COUNT": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query if APPLY contains terms other than type String[]", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [1],
            "ORDER": { "dir": "UP", "keys": ["numSections", "courses_dept", "courses_id"]},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query if ORDER contains terms other than type String", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_id", "numSections"],
            "WHERE": {},
            "GROUP": [ "courses_dept", "courses_id" ],
            "APPLY": [ {"numSections": {"COUNT": "courses_uuid"}} ],
            "ORDER": { "dir": "UP", "keys": 1},
            "AS":"TABLE"
        };
        let result :any = {};
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query GT correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "GT": {
                    "courses_avg": 90
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to query GT on invalid key", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "GT": {
                    "courses_invalid": 90
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query GT on key of type string", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "GT": {
                    "courses_dept": 90
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query LT correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "LT": {
                    "courses_avg": 90
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to query LT on invalid key", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "LT": {
                    "courses_invalid": 90
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query LT on key of type string", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "LT": {
                    "courses_dept": 90
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query EQ correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "EQ": {
                    "courses_avg": 90
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query EQ correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "EQ": {
                    "courses_pass": 5
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query EQ correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "EQ": {
                    "courses_fail": 1
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query EQ correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "LT": {
                    "courses_pass": 5
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query EQ correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "LT": {
                    "courses_fail": 1
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query EQ correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "GT": {
                    "courses_pass": 5
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query EQ correctly (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "GT": {
                    "courses_fail": 1
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to query EQ on invalid key", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "EQ": {
                    "courses_invalid": 90
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query EQ dept", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "EQ": {
                    "courses_dept": 90
                }
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query IS for regex *", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cp*"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for regex ?", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_instructor": "gregor?"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for ID", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_id": "310"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for title", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_title": "prg*"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for UUID", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_uuid": "123"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to query IS for invalid key", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_avg": "12"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query IS for invalid key", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_invalid": "12"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    /*
     it("Should be able to query OR", function () {
     this.timeout(10000);
     var that = this;
     Log.trace("starting test: " + that.test.title);
     let query: any = {
     "GET": ["courses_dept", "courses_id", "courses_avg"],
     "WHERE": {
     "OR": [
     {"GT": {"courses_avg": 80}},
     {"GT": {"courses_avg": 100}}
     ]
     },
     "ORDER": "courses_avg",
     "AS": "TABLE"
     }
     ;
     return facade.performQuery(query).then(function (response: InsightResponse) {
     expect(response.code).to.equal(200);
     }).catch(function (response: InsightResponse) {
     expect.fail();
     });
     });
     it("Should be able to query AND", function () {
     this.timeout(10000);
     var that = this;
     Log.trace("starting test: " + that.test.title);
     let query: any = {
     "GET": ["courses_dept", "courses_id", "courses_avg"],
     "WHERE": {
     "AND": [
     {"GT": {"courses_avg": 80}},
     {"GT": {"courses_avg": 100}}
     ]
     },
     "ORDER": "courses_avg",
     "AS": "TABLE"
     }
     ;
     return facade.performQuery(query).then(function (response: InsightResponse) {
     expect(response.code).to.equal(200);
     }).catch(function (response: InsightResponse) {
     expect.fail();
     });
     });
     */

    it("Should be able to query NOT", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_dept", "courses_avg"],
            "WHERE": {
                "NOT": {"GT": {
                    "courses_avg": 90
                }}
            },
            "ORDER": "courses_avg",
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query ORDER UP for 2 things", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage"],
            "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
            "GROUP": [ "courses_id" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query ORDER DOWN for 2 things", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage"],
            "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
            "GROUP": [ "courses_id" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "DOWN", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query GROUP for multiple keys", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage", "courses_pass", "courses_fail", "courses_dept", "courses_instructor"],
            "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
            "GROUP": [ "courses_id", "courses_pass", "courses_fail", "courses_dept", "courses_instructor" ],
            "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query APPLY AVG", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to query APPLY AVG if not number", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"AVG": "courses_dept"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {

            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query APPLY MIN", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"MIN": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to query APPLY MIN if not number", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"MIN": "courses_dept"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {

            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query APPLY MAX", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"MAX": "courses_avg"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to query APPLY MAX if not number", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"MAX": "courses_dept"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {

            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query APPLY COUNT", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"COUNT": "courses_id"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to query APPLY COUNT if invalid key", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
                "GET": ["courses_id", "courseAverage"],
                "WHERE": {"IS": {"courses_dept": "cpsc"}} ,
                "GROUP": [ "courses_id" ],
                "APPLY": [ {"courseAverage": {"COUNT": "courses_invalid"}} ],
                "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
                "AS":"TABLE"
            }
            ;
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {

            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query GET even if empty", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_id", "courseAverage"],
            "WHERE": {"IS": {"courses_dept": "c"}} ,
            "GROUP": [ "courses_id" ],
            "APPLY": [ {"courseAverage": {"COUNT": "courses_id"}} ],
            "ORDER": { "dir": "UP", "keys": ["courseAverage", "courses_id"]},
            "AS":"TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });




    it("Should not be able to remove a non-present dataset (404)", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        return facade.removeDataset('abc').then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(404);
        });
    });


    it("Should be able to query a valid room query #1", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_shortname": "DMP"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        }
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a valid room query #2", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_shortname", "numRooms"],
            "WHERE": {"GT": {"rooms_seats": 160}},
            "GROUP": [ "rooms_shortname" ],
            "APPLY": [ {"numRooms": {"COUNT": "rooms_name"}} ],
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a valid room query #3", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_fullname", "rooms_number", "rooms_seats"],
            "WHERE": {"AND": [
                {"GT": {"rooms_lat": 49.261292}},
                {"LT": {"rooms_lon": -123.245214}},
                {"LT": {"rooms_lat": 49.262966}},
                {"GT": {"rooms_lon": -123.249886}},
                {"IS": {"rooms_furniture": "*Movable Tables*"}}
            ]},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a valid room query with wildcard case", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_shortname", "numRooms"],
            "WHERE": {"IS": {"rooms_fullname": "m*"}},
            "GROUP": [ "rooms_shortname" ],
            "APPLY": [ {"numRooms": {"COUNT": "rooms_name"}} ],
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should not be able to query a room query that MAX a type String", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_shortname", "numRooms"],
            "WHERE": {"IS": {"rooms_fullname": "m*"}},
            "GROUP": [ "rooms_shortname" ],
            "APPLY": [ {"numRooms": {"MAX": "rooms_fullname"}} ],
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query a room query that MIN a type String", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_shortname", "numRooms"],
            "WHERE": {"IS": {"rooms_fullname": "m*"}},
            "GROUP": [ "rooms_shortname" ],
            "APPLY": [ {"numRooms": {"MIN": "rooms_fullname"}} ],
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should not be able to query a room query that AVG a type String", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_shortname", "numRooms"],
            "WHERE": {"IS": {"rooms_fullname": "m*"}},
            "GROUP": [ "rooms_shortname" ],
            "APPLY": [ {"numRooms": {"AVG": "rooms_fullname"}} ],
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect.fail();
        }).catch(function (response: InsightResponse) {
            expect(response.code).to.equal(400);
        });
    });

    it("Should be able to query a room query with greater than 'courses_audit'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_audit"],
            "WHERE": {"GT": {"courses_audit": 30}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with greater than 'courses_year'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_year"],
            "WHERE": {"GT": {"courses_year": 2000}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with greater than 'rooms_lat'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_lat"],
            "WHERE": {"GT": {"rooms_lat": 49}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with greater than 'rooms_lon'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_lon"],
            "WHERE": {"GT": {"rooms_lon": 49}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with greater than 'rooms_seats'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_seats"],
            "WHERE": {"GT": {"rooms_seats": 20}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with less than 'courses_audit'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_audit"],
            "WHERE": {"LT": {"courses_audit": 30}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with less than 'courses_year'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_year"],
            "WHERE": {"LT": {"courses_year": 2000}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with less than 'rooms_lat'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_lat"],
            "WHERE": {"LT": {"rooms_lat": 49}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with less than 'rooms_lon'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_lon"],
            "WHERE": {"LT": {"rooms_lon": 49}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with less than 'rooms_seats'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_seats"],
            "WHERE": {"LT": {"rooms_seats": 20}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with equal to 'courses_audit'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_audit"],
            "WHERE": {"EQ": {"courses_audit": 30}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with equal to 'courses_year'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["courses_year"],
            "WHERE": {"EQ": {"courses_year": 2000}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with equal to 'rooms_lat'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_lat"],
            "WHERE": {"EQ": {"rooms_lat": 49}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with equal to 'rooms_lon'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_lon"],
            "WHERE": {"EQ": {"rooms_lon": 49}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with equal to 'rooms_seats'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_seats"],
            "WHERE": {"EQ": {"rooms_seats": 30}},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with AND'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_fullname", "rooms_number", "rooms_seats"],
            "WHERE": {"AND": [
                {"GT": {"rooms_lon": -123.249886}},
                {"IS": {"rooms_furniture": "*Movable Tables*"}}
            ]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query a room query with OR'", function () {
        this.timeout(10000);
        var that = this;
        Log.trace("Starting test: " + that.test.title);
        let query: any = {
            "GET": ["rooms_fullname", "rooms_number", "rooms_seats"],
            "WHERE": {"OR": [
                {"GT": {"rooms_lon": -123.249886}},
                {"IS": {"rooms_furniture": "*Movable Tables*"}}
            ]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for rooms (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any =  {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_shortname": "DMP"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for roomsfullname (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any =  {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_fullname": "Hugh Dempster Pavilion"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for roomsshortname (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any =  {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_shortname": "DMP"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for roomsnumber (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any =  {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_number": "101"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for roomsname (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any =  {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_name": "DMP_101"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for rooms address (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any =  {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_address": "6*"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for rooms type (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any =  {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_type": "Open*"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for rooms furniture (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any =  {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_furniture": "Classroom*"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });

    it("Should be able to query IS for rooms href (200)", function () {
        this.timeout(100000);
        var that = this;
        Log.trace("starting test: " + that.test.title);
        let query: any =  {
            "GET": ["rooms_fullname", "rooms_number"],
            "WHERE": {"IS": {"rooms_href": "http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/FORW-519"}},
            "ORDER": { "dir": "UP", "keys": ["rooms_number"]},
            "AS": "TABLE"
        };
        return facade.performQuery(query).then(function (response: InsightResponse) {
            expect(response.code).to.equal(200);
        }).catch(function (response: InsightResponse) {
            expect.fail();
        });
    });



});