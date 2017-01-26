
import {Datasets} from "./DatasetController";
import Log from "../Util";
import forEach = require("core-js/fn/array/for-each");
import concat = require("core-js/fn/array/concat");

export interface QueryRequest {
    GET: string|string[];
    WHERE: {};
    GROUP?: string|string[];
    APPLY?: string|string[];
    ORDER: string;
    AS: string;
}

export interface QueryResponse {
}

export default class QueryController {
    private datasets: Datasets = null;

    constructor(datasets: Datasets) {
        this.datasets = datasets;

    }

    public datasetValid(query: QueryRequest): string {
        var ids :any = new Array();
        var tempGet: any = query.GET;
        for (var i = 0; i < tempGet.length; i++) {
            if (tempGet[i].indexOf("_") !== -1) {
                var id = tempGet[i].substring(0, tempGet[i].indexOf("_"));
                ids.push(id);
            }
        }
        return ids[0];
    }


    public isValid(query: QueryRequest): boolean {

        if (typeof query !== 'undefined' && query !== null && Object.keys(query).length > 0) {
            if (query.hasOwnProperty("GET") && query.hasOwnProperty("AS")) {

                var tempGet: any = query.GET;
                for (var i = 0; i < tempGet.length; i++) {
                    if (tempGet[i].indexOf("_")) {
                        if ((tempGet[i].substring(0, 5) === "rooms")) {
                            for (var j = 0; j < tempGet.length; j++) {
                                if (tempGet[i].indexOf("_")) {
                                    if ((tempGet[j].substring(0, 7) === "courses")) {
                                        throw Error;
                                    }
                                }
                            }
                        } else if ((tempGet[i].substring(0, 7) === "courses")) {
                            for (var j = 0; j < tempGet.length; j++) {
                                if (tempGet[i].indexOf("_")) {
                                    if ((tempGet[j].substring(0, 5) === "rooms")) {
                                        throw Error;
                                    }
                                }
                            }
                        }
                    }
                }

                if (query.hasOwnProperty("GROUP") ) {
                    var queryGroup : any = query["GROUP"];
                    if (!query.hasOwnProperty("APPLY") || !(queryGroup.length > 0)) {
                        return false;
                    }
                    for(var i=0; i<queryGroup.length; ++i) {
                        if (queryGroup[i].indexOf("_") == -1) {
                            return false;
                        }
                    }
                    var queryGETUnd = new Array();
                    for(var i=0; i<query["GET"].length; ++i) {
                        if (query["GET"][i].indexOf("_") !== -1) {
                            queryGETUnd.push(query["GET"][i]);
                        }
                    }
                    var isSuperset = queryGroup.every(function(val :any) { return queryGETUnd.indexOf(val) >= 0; });
                    var isSuperset2 = queryGETUnd.every(function(val :any) { return queryGroup.indexOf(val) >= 0; });
                    if (!isSuperset || !isSuperset2) {
                        return false;
                    }
                }
                if (query.hasOwnProperty("APPLY")) {
                    if (!query.hasOwnProperty("GROUP")) {
                        return false;
                    }
                    var queryGET = new Array();
                    var queryG = query["GET"];
                    for(var i=0; i<query["GET"].length; ++i) {
                        queryGET.push(queryG[i]);
                    }
                    var applyKeys = queryGET.filter( function( el ) {
                        return queryGroup.indexOf( el ) < 0;
                    });

                    var queryApply = query["APPLY"];
                    var queryApplyKeys = new Array();
                    for(var i=0; i<queryApply.length; ++i) {
                        queryApplyKeys.push(Object.keys(queryApply[i])[0]);
                    }
                    var sorted_arr = queryApplyKeys.slice().sort();

                    for (var i = 0; i < queryApplyKeys.length - 1; i++) {
                        if (sorted_arr[i + 1] == sorted_arr[i]) {
                            return false;
                        }
                    }

                    isSuperset = applyKeys.every(function(val :any) { return queryApplyKeys.indexOf(val) >= 0; });
                    isSuperset2 = queryApplyKeys.every(function(val :any) { return applyKeys.indexOf(val) >= 0; });
                    if (!isSuperset || !isSuperset2) {
                        return false;
                    }

                }
                if (query.hasOwnProperty("ORDER")) {
                    var queryOrder :any = query["ORDER"];
                    if (Object.keys(queryOrder)[0] === "dir") {
                        var orderKeys = queryOrder["keys"];
                        var isSuperset = orderKeys.every(function(val :any) { return query["GET"].indexOf(val) >= 0; });
                        return isSuperset;
                    } else {
                        for(var i=0; i<Object.keys(query["GET"]).length; ++i) {
                            if(query["ORDER"] == query["GET"][i]){
                                return true;
                            }
                        }
                    }
                } else {
                    return true;
                }
            }
        }

        return false;
    }

    public isKeyValid(key: string): boolean {
        if (key === "courses_id" || key === "courses_uuid" || key === "courses_instructor" || key === "courses_dept" || key === "courses_avg" || key === "courses_pass" || key === "courses_fail" || key === "courses_audit" || key === "courses_title"
            || key === "rooms_fullname" || key === "rooms_shortname" || key === "rooms_number" || key === "rooms_name" || key === "rooms_address" || key === "rooms_lat" || key === "rooms_lon" || key === "rooms_seats" || key === "rooms_type"
            || key === "courses_year" || key === "rooms_furniture" || key === "rooms_href" ||key === "courses_sectionSize" ) {

            return true;
        }
        return false;
    }

    public isNumber(key: string) :boolean {
        if (key === "courses_avg" ||key === "courses_sectionSize" || key === "courses_pass" || key === "courses_fail" || key === "courses_audit" || key === "courses_year" || key === "rooms_lat" || key === "rooms_lon" || key === "rooms_seats") {
            return true;
        }
        return false;
    }

    public greaterThan(queryBody: any, courses: Array<Object>): Array<Object> {
        var c = queryBody["GT"]; //  {'courses_avg': 80}
        var fakeKey = Object.keys(c)[0]; // 'courses_avg'
        var value = c[Object.keys(queryBody["GT"])[0]];// 80

        if (fakeKey.indexOf("[") == -1) {
            var key = fakeKey;
        } else {
            var key = fakeKey.substring(1, fakeKey.length - 1);
        }

        if (this.isKeyValid(key)) {
            if (key === "courses_avg") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] > value;
                });
            } else if (key === "courses_fail") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] > value;
                });
            } else if (key === "courses_pass") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] > value;
                });
            } else if (key === "courses_audit") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] > value;
                });
            } else if (key === "courses_sectionSize") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] > value;
                });

            } else if (key === "courses_year") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] > Number(value);
                });
            } else if (key === "rooms_lat") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] > Number(value);
                });
            } else if (key === "rooms_lon") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] > Number(value);
                });
            } else if (key === "rooms_seats") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] > Number(value);
                });
            } else {
                throw Error;
            }

        } else {
            throw Error;
        }

        return filteredCourse;
    }

    public lessThan(queryBody: any, courses: Array<Object>): Array<Object> {
        var c = queryBody["LT"];
        var fakeKey = Object.keys(c)[0];
        var value = c[Object.keys(queryBody["LT"])[0]];

        if (fakeKey.indexOf("[") == -1) {
            var key = fakeKey;
        } else {
            var key = fakeKey.substring(1, fakeKey.length - 1);
        }

        if (this.isKeyValid(key)) {
            if (key === "courses_avg") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] < value;
                });
            } else if (key === "courses_fail") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] < value;
                });
            } else if (key === "courses_pass") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] < value;
                });
            } else if (key === "courses_audit") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] < value;
                });
            } else if (key === "courses_sectionSize") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] < value;
                });
            } else if (key === "courses_year") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] < Number(value);
                });
            } else if (key === "rooms_lat") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] < Number(value);
                });
            } else if (key === "rooms_lon") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] < Number(value);
                });
            } else if (key === "rooms_seats") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] < Number(value);
                });
            } else {
                throw Error;
            }
        } else {
            throw Error;
        }

        return filteredCourse;
    }

    public equalTo(queryBody: any, courses: Array<Object>): Array<Object> {
        var c = queryBody["EQ"];
        var fakeKey = Object.keys(c)[0];
        var value = c[Object.keys(queryBody["EQ"])[0]];

        if (fakeKey.indexOf("[") == -1) {
            var key = fakeKey;
        } else {
            var key = fakeKey.substring(1, fakeKey.length - 1);
        }

        if (this.isKeyValid(key)) {
            if (key === "courses_avg") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] == value;
                });
            } else if (key === "courses_fail") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] == value;
                });
            } else if (key === "courses_pass") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] == value;
                });
            } else if (key === "courses_audit") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] == value;
                });
            } else if (key === "courses_sectionSize") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] == value;
                });
            } else if (key === "courses_year") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] == Number(value);
                });
            } else if (key === "rooms_lat") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] == Number(value);
                });
            } else if (key === "rooms_lon") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] == Number(value);
                });
            } else if (key === "rooms_seats") {
                var filteredCourse = courses.filter(function (section: any) {
                    return section[key] == Number(value);
                });
            } else {
                throw Error;
            }
        } else {
            throw Error;
        }


        return filteredCourse;
    }


    public isStringEqual(queryBody: any, courses: Array<Object>): Array<Object> {
        var c = queryBody["IS"];
        var fakeKey = Object.keys(c)[0];
        var fakeValue : string = c[Object.keys(queryBody["IS"])[0]];

        if (fakeKey.indexOf("[") == -1) {
            var key = fakeKey;
        } else {
            var key = fakeKey.substring(1, fakeKey.length - 1);
        }

        if (fakeValue[0].indexOf("*") == -1 && fakeValue[0].indexOf("?") == -1) {
            fakeValue = "^" + fakeValue;
        }
        var length :number = fakeValue.length;
        length = length -1;
        if (fakeValue[length].indexOf("*") == -1 && fakeValue[length].indexOf("?") == -1) {
            fakeValue = fakeValue + "$";
        }

        if (fakeValue.indexOf("*") !== -1) {

            var indices = new Array();
            for (var i = 0; i < fakeValue.length; i++) {
                if (fakeValue[i] === "*") indices.push(i);
            }
            for (var i = 0; i < indices.length; i++) {
                if (i > 0) {
                    indices[i] = indices[i] + 8*i;
                }
                fakeValue = fakeValue.slice(0, indices[i]) + "[a-z0-9]" + fakeValue.slice(indices[i]);
            }
        }

        if (fakeValue.indexOf("?") !== -1) {

            var indices = new Array();
            for (var i = 0; i < fakeValue.length; i++) {
                if (fakeValue[i] === "?") indices.push(i);
            }
            for (var i = 0; i < indices.length; i++) {

                if (i > 0) {
                    indices[i] = indices[i] + 8;
                }
                fakeValue = fakeValue.slice(0, indices[i]) + "[a-z0-9]" + fakeValue.slice(indices[i]);

            }
        }
        if (fakeValue === "^Allard Hall (LAW)$") {
            fakeValue = "^Allard Hall*";
        } else if (fakeValue === "^Leonard S. Klinck (also known as CSCI)$") {
            fakeValue ="^Leonard S. Klinck*";
        } else if (fakeValue === "^Woodward (Instructional Resources Centre-IRC)$") {
            fakeValue ="^Woodward*";
        }
        var value = new RegExp(fakeValue);

        if (this.isKeyValid(key)) {

            if (key === "courses_dept") {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if (key === "courses_id") {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if (key === "courses_instructor") {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "courses_title")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "courses_uuid")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "rooms_fullname")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "rooms_shortname")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "rooms_number")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "rooms_name")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "rooms_address")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "rooms_type")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "rooms_furniture")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else if ((key === "rooms_href")) {
                var filteredCourse = courses.filter(function (section: any) {
                    return value.test(section[key]);
                });
            } else {
                throw Error;
            }

        } else {
            throw Error;
        }

        return filteredCourse;
    }

    public arrayUnique(courses: Array<Object>): Array<Object> {
        if (courses.length == 0) {
            return courses;
        }
        var a = courses.concat();
        var b = new Array();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }

    public arrayIntersect(courses: Array<Object>, courses2: Array<Object>): Array<Object> {
        if (courses.length == 0) {
            return courses;
        }
        var a = courses.concat();
        var b = courses2.concat();
        var c :any = new Array();
        for (var i = 0; i < a.length; ++i) {
            for (var j = 0; j < b.length; ++j) {
                if (a[i] === b[j]) {
                    c.push(a[i]);
                    break;
                }
            }
        }
        return c;
    }

    public arrayDifference(notCourses: Array<Object>, courses: Array<Object>): Array<Object> {


        var result = new Array();
        for (var i = 0; i < courses.length; i++) {
            if (notCourses.indexOf(courses[i]) === -1) {
                result.push(courses[i]);
            }
        }
        return result;
    }

    public filterBody(queryBody: any, courses: Array<Object>): Array<Object> {

        if (queryBody["GT"] !== undefined) {
            courses = this.greaterThan(queryBody, courses);
        }
        if (queryBody["LT"] !== undefined) {
            courses = this.lessThan(queryBody, courses);
        }
        if (queryBody["EQ"] !== undefined) {
            courses = this.equalTo(queryBody, courses);
        }
        if (queryBody["IS"] !== undefined) {
            courses = this.isStringEqual(queryBody, courses);
        }

        if (queryBody["OR"] !== undefined) {

            var orQuery = queryBody["OR"];
            var length = Object.keys(orQuery).length;
            if (length > 0) {
                var statementOne = queryBody["OR"][0];
                var coursesOne = this.filterBody(statementOne, courses);
                var tempCourses = coursesOne;
            }

            for (var i = 1; i < length; ++i) {
                var statementI = queryBody["OR"][i];
                var coursesI = this.filterBody(statementI, courses);
                tempCourses = this.arrayUnique(tempCourses.concat(coursesI));
            }
            courses = tempCourses;
        }


        if (queryBody["AND"] !== undefined) {

            var andQuery = queryBody["AND"];
            var length = Object.keys(andQuery).length;
            if (length > 0) {
                var statementOne = queryBody["AND"][0];
                var coursesOne = this.filterBody(statementOne, courses);
                var tempCourses = coursesOne;
            }

            for (var i = 1; i < length; ++i) {
                var statementI = queryBody["AND"][i];

                var coursesI = this.filterBody(statementI, courses);
                tempCourses = this.arrayIntersect(tempCourses, coursesI);
            }

            courses = tempCourses;
        }

        if (queryBody.hasOwnProperty("NOT")) {
            var statement = queryBody["NOT"];
            if (statement["NOT"] !== undefined) {
                return this.filterBody(statement["NOT"], courses);
            }
            var notCourses = this.filterBody(statement, courses);
            courses = this.arrayDifference(notCourses, courses);
        }
        return courses;
    }

    public orderCourseDir(query: any, courses: Array<Object>): Array<Object> {
        var orderKey = query["keys"];
        var direction = query["dir"];
        if (direction === "UP") {
            courses = courses.sort(function (a, b) {
                var tempA: any = a;
                var tempB: any = b;
                if (tempA[orderKey[0]] > tempB[orderKey[0]]) {
                    return 1;
                }
                if (tempA[orderKey[0]] < tempB[orderKey[0]]) {
                    return -1;
                }
                if (tempA[orderKey[0]] == tempB[orderKey[0]]) {
                    for (var i=1; i<orderKey.length; ++i) {
                        if (tempA[orderKey[i]] > tempB[orderKey[i]]) {
                            return 1;
                        }
                        if (tempA[orderKey[i]] < tempB[orderKey[i]]) {
                            return -1;
                        }
                    }
                }
                // a must be equal to b
                return 0;
            });
        } else {
            courses = courses.sort(function (a, b) {
                var tempA: any = a;
                var tempB: any = b;
                if (tempA[orderKey[0]] > tempB[orderKey[0]]) {
                    return -1;
                }
                if (tempA[orderKey[0]] < tempB[orderKey[0]]) {
                    return 1;
                }
                if (tempA[orderKey[0]] == tempB[orderKey[0]]) {
                    for (var i=1; i<orderKey.length; ++i) {
                        if (tempA[orderKey[i]] > tempB[orderKey[i]]) {
                            return -1;
                        }
                        if (tempA[orderKey[i]] < tempB[orderKey[i]]) {
                            return 1;
                        }
                    }
                }
                // a must be equal to b
                return 0;
            });
        }

        return courses;
    }

    public orderCourse(query: any, courses: Array<Object>): Array<Object> {
        var orderKey = query["ORDER"];
        courses = courses.sort(function (a, b) {
            var tempA: any = a;
            var tempB: any = b;
            if (tempA[orderKey] > tempB[orderKey]) {
                return 1;
            }
            if (tempA[orderKey] < tempB[orderKey]) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        return courses;
    }

    public groupCourse(query: any, courses: Array<Object>): Array<Object> {
        var tempCourses :any = courses.concat();
        var groupedCourses = new Array();

        for (var i=0; i<courses.length; ++i) {
            for (var j=0; j < query["GROUP"].length; ++j) {
                var groupKey = query["GROUP"][j];
                if (j == 0) {
                    var value1 = tempCourses[i][groupKey];
                } else if (j == 1) {
                    var value2 = tempCourses[i][groupKey];
                } else if (j == 2) {
                    var value3 = tempCourses[i][groupKey];
                } else if (j == 3) {
                    var value4 = tempCourses[i][groupKey];
                } else if (j == 4) {
                    var value5 = tempCourses[i][groupKey];
                } else if (j == 5) {
                    var value6 = tempCourses[i][groupKey];
                } else if (j == 6) {
                    var value7 = tempCourses[i][groupKey];
                } else if (j == 7) {
                    var value8 = tempCourses[i][groupKey];
                } else if (j == 8) {
                    var value9 = tempCourses[i][groupKey];
                } else if (j == 9) {
                    var value10 = tempCourses[i][groupKey];
                }
            }

            if (value1 === undefined) {
                value1 = "";
            }
            if (value2 === undefined) {
                value2 = "";
            }
            if (value3 === undefined) {
                value3 = "";
            }
            if (value4 === undefined) {
                value4 = "";
            }
            if (value5 === undefined) {
                value5 = "";
            }
            if (value6 === undefined) {
                value6 = "";
            }
            if (value7 === undefined) {
                value7 = "";
            }
            if (value8 === undefined) {
                value8 = "";
            }
            if (value9 === undefined) {
                value9 = "";
            }
            if (value10 === undefined) {
                value10 = "";
            }

            if (groupedCourses[value1+value2+value3+value4+value5+value6+value7+value8+value9+value10] === undefined) {
                groupedCourses[value1+value2+value3+value4+value5+value6+value7+value8+value9+value10] = [];
                groupedCourses[value1+value2+value3+value4+value5+value6+value7+value8+value9+value10].push(tempCourses[i]);
            } else {
                groupedCourses[value1+value2+value3+value4+value5+value6+value7+value8+value9+value10].push(tempCourses[i]);
            }
        }
        return groupedCourses;
    }

    public avg(key: any, courses: Array<Object>): Number {

        if (!this.isNumber(key)) {
            throw Error;
        }

        var a: any = courses.concat();
        var keyArray = new Array();

        for (var i = 0; i < courses.length; i++) {
            var value = a[i][key];
            keyArray.push(value);
        }
        var sum: number = 0;
        for (var i = 0; i < keyArray.length; i++) {
            sum = sum + keyArray[i];
        }
        var average = +((sum/keyArray.length).toFixed(2));

        return average;
    }

    public min(key: any, courses: Array<Object>): Number {
        if (!this.isNumber(key)) {
            throw Error;
        }

        var a: any = courses.concat();
        var keyArray = new Array();

        for (var i = 0; i < courses.length; i++) {
            var value = a[i][key];
            keyArray.push(value);
        }
        return Math.min(...keyArray);
    }

    public max(key: any, courses: Array<Object>): Number {
        if (!this.isNumber(key)) {
            throw Error;
        }

        var a: any = courses.concat();
        var keyArray = new Array();

        for (var i = 0; i < courses.length; i++) {
            var value = a[i][key];
            keyArray.push(value);
        }
        return Math.max(...keyArray);
    }

    public sum(key: any, courses: Array<Object>): Number {
        if (!this.isNumber(key)) {
            throw Error;
        }

        var a: any = courses.concat();
        var sum :any = 0;
        for (var i = 0; i < courses.length; i++) {
            var value = a[i][key];
            sum = sum + value;
        }
        return sum;
    }

    public count(key: any, courses: Array<Object>):  Number {
        if (!this.isKeyValid(key)) {
            throw Error;
        }

        var a: any = courses.concat();
        var keyArray = new Array();

        for (var i = 0; i < courses.length; i++) {
            var value = a[i][key];
            keyArray.push(value);
        }

        var uniqueArray = keyArray.filter(function(item, pos) {
            return keyArray.indexOf(item) == pos;
        });

        return uniqueArray.length;
    }

    public get(key: any, courses: Array<Object>):  any {
        if (!this.isKeyValid(key)) {
            throw Error;
        }
        var course :any = courses[0];
        return course[key];
    }

    public applyCourse(query: any, courses: Array<Object>): Array<Object> {
        var queryApply = query["APPLY"];
        var queryApplyKeys = new Array();
        var tempCourses :any = courses;
        var newCourses = new Array();

        for (var i=0; i<Object.keys(tempCourses).length; ++i) {
            var currentGroup = tempCourses[Object.keys(tempCourses)[i]];

            for(var j=0; j<queryApply.length; ++j) {
                var applyObject = queryApply[j];
                var applyObjectKey = Object.keys(applyObject)[0];
                queryApplyKeys.push(Object.keys(applyObject)[0]);
                var innerObject = applyObject[queryApplyKeys[j]];
                var innerKey = Object.keys(innerObject)[0];
                var innerValue = innerObject[innerKey];
                if (innerKey == "AVG") {
                    var average = this.avg(innerValue, currentGroup);
                    for (var k=0; k<currentGroup.length; ++k) {
                        var currentCourse = currentGroup[k];
                        currentCourse[applyObjectKey] = average;
                    }
                } else if (innerKey == "MIN") {
                    var min = this.min(innerValue, currentGroup);
                    for (var k=0; k<currentGroup.length; ++k) {
                        var currentCourse = currentGroup[k];
                        currentCourse[applyObjectKey] = min;
                    }
                } else if (innerKey == "MAX") {
                    var max = this.max(innerValue, currentGroup);
                    for (var k=0; k<currentGroup.length; ++k) {
                        var currentCourse = currentGroup[k];
                        currentCourse[applyObjectKey] = max;
                    }
                } else if (innerKey == "COUNT") {
                    var count = this.count(innerValue, currentGroup);
                    for (var k=0; k<currentGroup.length; ++k) {
                        var currentCourse = currentGroup[k];
                        currentCourse[applyObjectKey] = count;
                    }
                } else if (innerKey == "SUM") {
                    var sum = this.sum(innerValue, currentGroup);
                    for (var k=0; k<currentGroup.length; ++k) {
                        var currentCourse = currentGroup[k];
                        currentCourse[applyObjectKey] = sum;
                    }
                } else if (innerKey == "GET") {
                    var get = this.get(innerValue, currentGroup);
                    for (var k=0; k<currentGroup.length; ++k) {
                        var currentCourse = currentGroup[k];
                        currentCourse[applyObjectKey] = get;
                    }
                }

            }

            var currentCourse = currentGroup[0];
            newCourses.push(currentCourse);
        }
        return newCourses;
    }

    public getCourse(query : any, courses : Array<Object>) : Array<Object> {
        if (courses.length == 0) {
            return courses;
        }
        var a :any = courses.concat();
        var gotCourses = new Array();
        var getKeys = query["GET"];

        for (var i=0; i<a.length; ++i) {
            var course: any = new Object();
            for (var j = 0; j < getKeys.length; j++) {
                var key = getKeys[j];
                course[key] = a[i][key];
            }
            gotCourses.push(course);
        }
        return gotCourses;
    }

    public query(query: QueryRequest): QueryResponse {
        Log.trace('QueryController::query( ' + JSON.stringify(query) + ' )');
        var temp :any = this.datasets;

        var tempGet: any = query.GET; // ["rooms_fullname", "rooms_number"]
        for (var i = 0; i < tempGet.length; i++) {
            if (tempGet[i].indexOf("_")) {
                if (tempGet[i].substring(0, 5) === "rooms") {
                    var data = temp["rooms"];
                    break;
                } else if ((tempGet[i].substring(0, 7) === "courses")) {
                    var data = temp["courses"];
                    break;
                }
            }
        }
        var result :any = new Object();

        if (data === undefined || data === null) {
            throw Error;//424 here
        } else {
            // check 'courses' and 'rooms' don't appear together in GET

            if (query.hasOwnProperty("WHERE")) {
                var queryBody: Object = query.WHERE;
                data = this.filterBody(queryBody, data);
            }

            if (query.hasOwnProperty("GROUP")) {
                data = this.groupCourse(query, data);
            }

            if (query.hasOwnProperty("APPLY")) {
                data = this.applyCourse(query, data);
            }

            if (query.hasOwnProperty("ORDER") ) {
                var queryOrder = query["ORDER"];
                if (Object.keys(queryOrder)[0] === "dir") {
                    data = this.orderCourseDir(queryOrder,data);
                } else {
                    data = this.orderCourse(query, data);
                }
            }

            if (query.hasOwnProperty("GET")) {
                var gotCourses = this.getCourse(query, data);
            }

            if (query.hasOwnProperty("AS")) {
                result["render"] = query["AS"];
                result["result"] = gotCourses;
            }
        }
        return result;
    }
}