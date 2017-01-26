$(function () {
    var button;
    var val;
    var val2;
    var val3;
    var val4;
    var val5;
    var val6;
    var val7;
    var val8;
    var val9;
    var val10;
    var val11;
    var val12;
    var val13;
    var val14;
    var val15;
    var val16;
    var val17;
    var val18;
    var val19;
    var val20;
    var andOr;
    var andOr2;
    var dept;
    var id;
    var avg;
    var title;
    var instructor;
    var sectionSize;
    var totalPass;
    var totalFail;
    var results = new Array(); //courses
    var results2 = new Array(); //rooms
    var fail;
    var pass;
    var average;
    var courseSize;
    var sections;
    var fullname;
    var shortname;
    var number; // number
    var address; //address
    var seats; // seats
    var type; // type
    var furniture; //furniture



    $("#datasetAdd").click(function () {
        var id = $("#datasetId").val();
        var zip = $("#datasetZip").prop('files')[0];
        var data = new FormData();
        data.append("zip", zip);
        $.ajax("/dataset/" + id,
            {
                type: "PUT",
                data: data,
                processData: false
            }).fail(function (e) {
            spawnHttpErrorModal(e)
        });
    });

    $("#datasetRm").click(function () {
        var id = $("#datasetId").val();
        $.ajax("/dataset/" + id, {type: "DELETE"}).fail(function (e) {
            spawnHttpErrorModal(e)
        });
    });
    $("#container").hide();
    $("#container2").hide();
    $("#render").hide();
    $("#render2").hide();
    $("#render3").hide();
    $("#render4").hide();
    $("#render5").hide();
    $("#render6").hide();
    $("#renderRoom").hide();
    $("#scheduleForm").hide();
    $("#timetableRender").hide();


    $("#displayForm").submit(function (e) {
        e.preventDefault();

        var chooseDisplay = $("#chooseDisplay").val();

        if (chooseDisplay == "All") {
            $("#container").slideDown(500);
            $("#container2").slideDown(500);
            $("#render").slideDown(500);
            $("#render2").slideDown(500);
            $("#render3").slideDown(500);
            $("#render4").slideDown(500);
            $("#render5").slideDown(500);
            $("#render6").slideDown(500);
            $("#renderRoom").slideDown(500);
            $("#scheduleForm").slideDown(500);
            $("#timetableRender").slideDown(500);
        }

        if (chooseDisplay == "All explorers") {
            $("#container").slideDown(500);
            $("#container2").slideDown(500);
            $("#render").slideDown(500);
            $("#render2").slideDown(500);
            $("#render3").slideDown(500);
            $("#render4").slideDown(500);
            $("#render5").slideDown(500);
            $("#render6").slideDown(500);
            $("#renderRoom").slideDown(500);
            $("#scheduleForm").slideUp(500);
        }

        if (chooseDisplay == "Course Explorer") {
            $("#container").slideDown(500);
            $("#container2").slideUp(500);
            $("#render").slideDown(500);
            $("#render2").slideDown(500);
            $("#render3").slideDown(500);
            $("#render4").slideUp(500);
            $("#render5").slideUp(500);
            $("#render6").slideUp(500);
            $("#renderRoom").slideUp(500);
            $("#scheduleForm").slideUp(500);
        }

        if (chooseDisplay == "Rooms Explorer") {
            $("#container").slideUp(500);
            $("#container2").slideDown(500);
            $("#render").slideUp(500);
            $("#render2").slideUp(500);
            $("#render3").slideUp(500);
            $("#render4").slideDown(500);
            $("#render5").slideDown(500);
            $("#render6").slideDown(500);
            $("#renderRoom").slideDown(500);
            $("#scheduleForm").slideUp(500);
        }

        if (chooseDisplay == "Scheduler") {
            $("#container").slideUp(500);
            $("#container2").slideUp(500);
            $("#render").slideUp(500);
            $("#render2").slideUp(500);
            $("#render3").slideUp(500);
            $("#render4").slideUp(500);
            $("#render5").slideUp(500);
            $("#render6").slideUp(500);
            $("#renderRoom").slideUp(500);
            $("#scheduleForm").slideDown(500);
            $("#timetableRender").slideDown(500);
        }
    });

    $("#hideForm").submit(function (e) {
        e.preventDefault();

        var chooseHide = $("#chooseHide").val();

        if (chooseHide == "All") {
            $("#container").slideUp(500);
            $("#container2").slideUp(500);
            $("#render").slideUp(500);
            $("#render2").slideUp(500);
            $("#render3").slideUp(500);
            $("#render4").slideUp(500);
            $("#render5").slideUp(500);
            $("#render6").slideUp(500);
            $("#renderRoom").slideUp(500);
            $("#scheduleForm").slideUp(500);
            $("#timetableRender").slideUp(500);
            $("#two").slideUp(500);
        }

        if (chooseHide == "All explorers") {
            $("#container").slideUp(500);
            $("#container2").slideUp(500);
            $("#render").slideUp(500);
            $("#render2").slideUp(500);
            $("#render3").slideUp(500);
            $("#render4").slideUp(500);
            $("#render5").slideUp(500);
            $("#render6").slideUp(500);
            $("#renderRoom").slideUp(500);
        }

        if (chooseHide == "Course Explorer") {
            $("#container").slideUp(500);
            $("#render").slideUp(500);
            $("#render2").slideUp(500);
            $("#render3").slideUp(500);
        }

        if (chooseHide == "Rooms Explorer") {
            $("#container2").slideUp(500);
            $("#render4").slideUp(500);
            $("#render5").slideUp(500);
            $("#render6").slideUp(500);
            $("#renderRoom").slideUp(500);
        }

        if (chooseHide == "Scheduler") {
            $("#scheduleForm").slideUp(500);
            $("#timetableRender").slideUp(500);
            $("#two").slideUp(500);
        }
    });

    $("#query").change(function() {
        var query = $("#query").val();
        $("#dept").attr("style","display:none");
        $("#id").attr("style","display:none");
        $("#title").attr("style","display:none");
        $("#instructor").attr("style","display:none");
        $("#size").attr("style","display:none");
        $("#sizeText").attr("style","display:none");
        if (query === "dept") {
            $("#dept").removeAttr('style');
        } else if (query === "title") {
            $("#title").removeAttr('style');
            var title = $("#title").val();


        } else if (query === "size") {
            $("#size").removeAttr('style');
            $("#sizeText").removeAttr('style');
            var size = $("#size").val();
            var sizeText = $("#sizeText").val();

        } else if (query === "instructor") {
            $("#instructor").removeAttr('style');
            var instructor = $("#instructor").val();

        } else if (query === "id") {
            $("#id").removeAttr('style');

        }
    });

    $("#query2").change(function() {
        var query = $("#query2").val();
        $("#dept2").attr("style","display:none");
        $("#title2").attr("style","display:none");
        $("#id2").attr("style","display:none");
        $("#instructor2").attr("style","display:none");
        $("#size2").attr("style","display:none");
        $("#sizeText2").attr("style","display:none");
        if (query === "dept") {
            $("#dept2").removeAttr('style');
        } else if (query === "title") {
            $("#title2").removeAttr('style');
            var title = $("#title2").val();


        } else if (query === "size") {
            $("#size2").removeAttr('style');
            $("#sizeText2").removeAttr('style');
            var size = $("#size2").val();
            var sizeText = $("#sizeText2").val();

        } else if (query === "instructor") {
            $("#instructor2").removeAttr('style');
            var instructor = $("#instructor2").val();

        } else if (query === "id") {
            $("#id2").removeAttr('style');

        }
    });

    $("#query3").change(function() {
        var query = $("#query3").val();
        $("#dept3").attr("style","display:none");
        $("#title3").attr("style","display:none");
        $("#id3").attr("style","display:none");
        $("#instructor3").attr("style","display:none");
        $("#size3").attr("style","display:none");
        $("#sizeText3").attr("style","display:none");
        if (query === "dept") {
            $("#dept3").removeAttr('style');
        } else if (query === "title") {
            $("#title3").removeAttr('style');
            var title = $("#title3").val();


        } else if (query === "size") {
            $("#size3").removeAttr('style');
            $("#sizeText3").removeAttr('style');
            var size = $("#size3").val();
            var sizeText = $("#sizeText3").val();

        } else if (query === "instructor") {
            $("#instructor3").removeAttr('style');
            var instructor = $("#instructor3").val();

        }else if (query === "id") {
            $("#id3").removeAttr('style');

        }
    });

    $("#query4").change(function() {
        var query = $("#query4").val();
        $("#dept4").attr("style","display:none");
        $("#title4").attr("style","display:none");
        $("#id4").attr("style","display:none");
        $("#instructor4").attr("style","display:none");
        $("#size4").attr("style","display:none");
        $("#sizeText4").attr("style","display:none");
        if (query === "dept") {
            $("#dept4").removeAttr('style');
        } else if (query === "title") {
            $("#title4").removeAttr('style');
            var title = $("#title4").val();


        } else if (query === "size") {
            $("#size4").removeAttr('style');
            $("#sizeText4").removeAttr('style');
            var size = $("#size4").val();
            var sizeText = $("#sizeText4").val();

        } else if (query === "instructor") {
            $("#instructor4").removeAttr('style');
            var instructor = $("#instructor4").val();

        }else if (query === "id") {
            $("#id4").removeAttr('style');

        }
    });

    $("#query5").change(function() {
        var query = $("#query5").val();
        $("#dept5").attr("style","display:none");
        $("#id5").attr("style","display:none");
        $("#title5").attr("style","display:none");
        $("#instructor5").attr("style","display:none");
        $("#size5").attr("style","display:none");
        $("#sizeText5").attr("style","display:none");
        if (query === "dept") {
            $("#dept5").removeAttr('style');
        } else if (query === "title") {
            $("#title5").removeAttr('style');
            var title = $("#title5").val();


        } else if (query === "size") {
            $("#size5").removeAttr('style');
            $("#sizeText5").removeAttr('style');
            var size = $("#size5").val();
            var sizeText = $("#sizeText5").val();

        } else if (query === "instructor") {
            $("#instructor5").removeAttr('style');
            var instructor = $("#instructor5").val();

        }else if (query === "id") {
            $("#id5").removeAttr('style');

        }
    });

    $("#query6").change(function() {
        var query = $("#query6").val();
        $("#dept6").attr("style","display:none");
        $("#title6").attr("style","display:none");
        $("#instructor6").attr("style","display:none");
        $("#id6").attr("style","display:none");
        $("#size6").attr("style","display:none");
        $("#sizeText6").attr("style","display:none");
        if (query === "dept") {
            $("#dept6").removeAttr('style');
        } else if (query === "title") {
            $("#title6").removeAttr('style');
            var title = $("#title6").val();


        } else if (query === "size") {
            $("#size6").removeAttr('style');
            $("#sizeText6").removeAttr('style');
            var size = $("#size6").val();
            var sizeText = $("#sizeText6").val();

        } else if (query === "instructor") {
            $("#instructor6").removeAttr('style');
            var instructor = $("#instructor6").val();

        }else if (query === "id") {
            $("#id6").removeAttr('style');

        }
    });

    $("#query7").change(function() {
        var query = $("#query7").val();
        $("#dept7").attr("style","display:none");
        $("#title7").attr("style","display:none");
        $("#id7").attr("style","display:none");
        $("#instructor7").attr("style","display:none");
        $("#size7").attr("style","display:none");
        $("#sizeText7").attr("style","display:none");
        if (query === "dept") {
            $("#dept7").removeAttr('style');
        } else if (query === "title") {
            $("#title7").removeAttr('style');
            var title = $("#title7").val();


        } else if (query === "size") {
            $("#size7").removeAttr('style');
            $("#sizeText7").removeAttr('style');
            var size = $("#size7").val();
            var sizeText = $("#sizeText7").val();

        } else if (query === "instructor") {
            $("#instructor7").removeAttr('style');
            var instructor = $("#instructor7").val();

        }else if (query === "id") {
            $("#id7").removeAttr('style');

        }
    });

    $("#query8").change(function() {
        var query = $("#query8").val();
        $("#dept8").attr("style","display:none");
        $("#title8").attr("style","display:none");
        $("#instructor8").attr("style","display:none");
        $("#size8").attr("style","display:none");
        $("#sizeText8").attr("style","display:none");
        $("#id8").attr("style","display:none");
        if (query === "dept") {
            $("#dept8").removeAttr('style');
        } else if (query === "title") {
            $("#title8").removeAttr('style');
            var title = $("#title8").val();


        } else if (query === "size") {
            $("#size8").removeAttr('style');
            $("#sizeText8").removeAttr('style');
            var size = $("#size8").val();
            var sizeText = $("#sizeText8").val();

        } else if (query === "instructor") {
            $("#instructor8").removeAttr('style');
            var instructor = $("#instructor8").val();

        }else if (query === "id") {
            $("#id8").removeAttr('style');

        }
    });

    $("#query9").change(function() {
        var query = $("#query9").val();
        $("#dept9").attr("style","display:none");
        $("#title9").attr("style","display:none");
        $("#instructor9").attr("style","display:none");
        $("#id9").attr("style","display:none");
        $("#size9").attr("style","display:none");
        $("#sizeText9").attr("style","display:none");
        if (query === "dept") {
            $("#dept9").removeAttr('style');
        } else if (query === "title") {
            $("#title9").removeAttr('style');
            var title = $("#title9").val();


        } else if (query === "size") {
            $("#size9").removeAttr('style');
            $("#sizeText9").removeAttr('style');
            var size = $("#size9").val();
            var sizeText = $("#sizeText9").val();

        } else if (query === "instructor") {
            $("#instructor9").removeAttr('style');
            var instructor = $("#instructor9").val();

        }else if (query === "id") {
            $("#id9").removeAttr('style');

        }
    });

    $("#query10").change(function() {
        var query = $("#query10").val();
        $("#dept10").attr("style","display:none");
        $("#id10").attr("style","display:none");
        $("#title10").attr("style","display:none");
        $("#instructor10").attr("style","display:none");
        $("#size10").attr("style","display:none");
        $("#sizeText10").attr("style","display:none");
        if (query === "dept") {
            $("#dept10").removeAttr('style');
        } else if (query === "title") {
            $("#title10").removeAttr('style');
            var title = $("#title10").val();


        } else if (query === "size") {
            $("#size10").removeAttr('style');
            $("#sizeText10").removeAttr('style');
            var size = $("#size10").val();
            var sizeText = $("#sizeText10").val();

        } else if (query === "instructor") {
            $("#instructor10").removeAttr('style');
            var instructor = $("#instructor10").val();

        }else if (query === "id") {
            $("#id10").removeAttr('style');

        }
    });

    $("#query11").change(function() {
        var query = $("#query11").val();
        $("#dept11").attr("style","display:none");
        $("#id11").attr("style","display:none");
        $("#title11").attr("style","display:none");
        $("#instructor11").attr("style","display:none");
        $("#size11").attr("style","display:none");
        $("#sizeText11").attr("style","display:none");
        if (query === "dept") {
            $("#dept11").removeAttr('style');
        } else if (query === "title") {
            $("#title11").removeAttr('style');
            var title = $("#title").val();


        } else if (query === "size") {
            $("#size11").removeAttr('style');
            $("#sizeText11").removeAttr('style');
            var size = $("#size").val();
            var sizeText = $("#sizeText").val();

        } else if (query === "instructor") {
            $("#instructor11").removeAttr('style');
            var instructor = $("#instructor").val();

        } else if (query === "id") {
            $("#id11").removeAttr('style');
        }
    });

    $("#query12").change(function() {
        var query = $("#query12").val();
        $("#dept12").attr("style","display:none");
        $("#title12").attr("style","display:none");
        $("#id12").attr("style","display:none");
        $("#instructor12").attr("style","display:none");
        $("#size12").attr("style","display:none");
        $("#sizeText12").attr("style","display:none");
        if (query === "dept") {
            $("#dept12").removeAttr('style');
        } else if (query === "title") {
            $("#title12").removeAttr('style');
            var title = $("#title2").val();


        } else if (query === "size") {
            $("#size12").removeAttr('style');
            $("#sizeText12").removeAttr('style');
            var size = $("#size2").val();
            var sizeText = $("#sizeText2").val();

        } else if (query === "instructor") {
            $("#instructor12").removeAttr('style');
            var instructor = $("#instructor2").val();

        } else if (query === "id") {
            $("#id12").removeAttr('style');

        }
    });

    $("#query13").change(function() {
        var query = $("#query13").val();
        $("#dept13").attr("style","display:none");
        $("#title13").attr("style","display:none");
        $("#id13").attr("style","display:none");
        $("#instructor13").attr("style","display:none");
        $("#size13").attr("style","display:none");
        $("#sizeText13").attr("style","display:none");
        if (query === "dept") {
            $("#dept13").removeAttr('style');
        } else if (query === "title") {
            $("#title13").removeAttr('style');
            var title = $("#title3").val();


        } else if (query === "size") {
            $("#size13").removeAttr('style');
            $("#sizeText13").removeAttr('style');
            var size = $("#size3").val();
            var sizeText = $("#sizeText3").val();

        } else if (query === "instructor") {
            $("#instructor13").removeAttr('style');
            var instructor = $("#instructor13").val();

        }else if (query === "id") {
            $("#id13").removeAttr('style');

        }
    });

    $("#query14").change(function() {
        var query = $("#query14").val();
        $("#dept14").attr("style","display:none");
        $("#title14").attr("style","display:none");
        $("#id14").attr("style","display:none");
        $("#instructor14").attr("style","display:none");
        $("#size14").attr("style","display:none");
        $("#sizeText14").attr("style","display:none");
        if (query === "dept") {
            $("#dept14").removeAttr('style');
        } else if (query === "title") {
            $("#title14").removeAttr('style');
            var title = $("#title14").val();


        } else if (query === "size") {
            $("#size14").removeAttr('style');
            $("#sizeText14").removeAttr('style');
            var size = $("#size14").val();
            var sizeText = $("#sizeText14").val();

        } else if (query === "instructor") {
            $("#instructor14").removeAttr('style');
            var instructor = $("#instructor14").val();

        }else if (query === "id") {
            $("#id14").removeAttr('style');

        }
    });

    $("#query15").change(function() {
        var query = $("#query15").val();
        $("#dept15").attr("style","display:none");
        $("#id15").attr("style","display:none");
        $("#title15").attr("style","display:none");
        $("#instructor15").attr("style","display:none");
        $("#size15").attr("style","display:none");
        $("#sizeText15").attr("style","display:none");
        if (query === "dept") {
            $("#dept15").removeAttr('style');
        } else if (query === "title") {
            $("#title15").removeAttr('style');
            var title = $("#title15").val();


        } else if (query === "size") {
            $("#size15").removeAttr('style');
            $("#sizeText15").removeAttr('style');
            var size = $("#size15").val();
            var sizeText = $("#sizeText15").val();

        } else if (query === "instructor") {
            $("#instructor15").removeAttr('style');
            var instructor = $("#instructor5").val();

        }else if (query === "id") {
            $("#id15").removeAttr('style');

        }
    });

    $("#query16").change(function() {
        var query = $("#query16").val();
        $("#dept16").attr("style","display:none");
        $("#title16").attr("style","display:none");
        $("#instructor16").attr("style","display:none");
        $("#id16").attr("style","display:none");
        $("#size16").attr("style","display:none");
        $("#sizeText16").attr("style","display:none");
        if (query === "dept") {
            $("#dept16").removeAttr('style');
        } else if (query === "title") {
            $("#title16").removeAttr('style');
            var title = $("#title16").val();


        } else if (query === "size") {
            $("#size16").removeAttr('style');
            $("#sizeText16").removeAttr('style');
            var size = $("#size16").val();
            var sizeText = $("#sizeText16").val();

        } else if (query === "instructor") {
            $("#instructor16").removeAttr('style');
            var instructor = $("#instructor16").val();

        }else if (query === "id") {
            $("#id16").removeAttr('style');

        }
    });

    $("#query17").change(function() {
        var query = $("#query17").val();
        $("#dept17").attr("style","display:none");
        $("#title17").attr("style","display:none");
        $("#id17").attr("style","display:none");
        $("#instructor17").attr("style","display:none");
        $("#size17").attr("style","display:none");
        $("#sizeText17").attr("style","display:none");
        if (query === "dept") {
            $("#dept17").removeAttr('style');
        } else if (query === "title") {
            $("#title17").removeAttr('style');
            var title = $("#title17").val();


        } else if (query === "size") {
            $("#size17").removeAttr('style');
            $("#sizeText17").removeAttr('style');
            var size = $("#size17").val();
            var sizeText = $("#sizeText17").val();

        } else if (query === "instructor") {
            $("#instructor17").removeAttr('style');
            var instructor = $("#instructor17").val();

        }else if (query === "id") {
            $("#id17").removeAttr('style');

        }
    });

    $("#query18").change(function() {
        var query = $("#query18").val();
        $("#dept18").attr("style","display:none");
        $("#title18").attr("style","display:none");
        $("#instructor18").attr("style","display:none");
        $("#size18").attr("style","display:none");
        $("#sizeText18").attr("style","display:none");
        $("#id18").attr("style","display:none");
        if (query === "dept") {
            $("#dept18").removeAttr('style');
        } else if (query === "title") {
            $("#title18").removeAttr('style');
            var title = $("#title8").val();


        } else if (query === "size") {
            $("#size18").removeAttr('style');
            $("#sizeText18").removeAttr('style');
            var size = $("#size8").val();
            var sizeText = $("#sizeText8").val();

        } else if (query === "instructor") {
            $("#instructor18").removeAttr('style');
            var instructor = $("#instructor8").val();

        }else if (query === "id") {
            $("#id18").removeAttr('style');

        }
    });

    $("#query19").change(function() {
        var query = $("#query19").val();
        $("#dept19").attr("style","display:none");
        $("#title19").attr("style","display:none");
        $("#instructor19").attr("style","display:none");
        $("#id19").attr("style","display:none");
        $("#size19").attr("style","display:none");
        $("#sizeText19").attr("style","display:none");
        if (query === "dept") {
            $("#dept19").removeAttr('style');
        } else if (query === "title") {
            $("#title19").removeAttr('style');
            var title = $("#title19").val();


        } else if (query === "size") {
            $("#size19").removeAttr('style');
            $("#sizeText19").removeAttr('style');
            var size = $("#size19").val();
            var sizeText = $("#sizeText19").val();

        } else if (query === "instructor") {
            $("#instructor19").removeAttr('style');
            var instructor = $("#instructor9").val();

        }else if (query === "id") {
            $("#id19").removeAttr('style');

        }
    });

    $("#query20").change(function() {
        var query = $("#query20").val();
        $("#dept20").attr("style","display:none");
        $("#id20").attr("style","display:none");
        $("#title20").attr("style","display:none");
        $("#instructor20").attr("style","display:none");
        $("#size20").attr("style","display:none");
        $("#sizeText20").attr("style","display:none");
        if (query === "dept") {
            $("#dept20").removeAttr('style');
        } else if (query === "title") {
            $("#title20").removeAttr('style');
            var title = $("#title20").val();


        } else if (query === "size") {
            $("#size20").removeAttr('style');
            $("#sizeText20").removeAttr('style');

        } else if (query === "instructor") {
            $("#instructor20").removeAttr('style');

        }else if (query === "id") {
            $("#id20").removeAttr('style');

        }
    });


    $("button").click(function() {

        if (this.id === "and" || this.id === "or") {
            $("#query2").removeAttr('style');
            $("#dept2").removeAttr('style');
            $("#and").attr("style","display:none");
            $("#or").attr("style","display:none");
            if (this.id === "and") {
                $("#and2").removeAttr('style');
            } else {
                $("#or2").removeAttr('style');
            }
        }
        for (var i = 2; i<11; i++) {
            var current = i+1;
            if (this.id === "and" + i.toString()) {
                $("#query" + current.toString()).removeAttr('style');
                $("#dept" + current.toString()).removeAttr('style');
                $("#and"+ i.toString()).attr("style","display:none");
                $("#and"+ current.toString()).removeAttr('style');
            } else if (this.id === "or" + i.toString()) {
                $("#query" + current.toString()).removeAttr('style');
                $("#dept" + current.toString()).removeAttr('style');
                $("#or"+ i.toString()).attr("style","display:none");
                $("#or"+ current.toString()).removeAttr('style');
            }
        }

        if (this.id === "and11" || this.id === "or11") {
            $("#query12").removeAttr('style');
            $("#dept12").removeAttr('style');
            $("#and11").attr("style","display:none");
            $("#or11").attr("style","display:none");
            if (this.id === "and11") {
                $("#and12").removeAttr('style');
            } else {
                $("#or12").removeAttr('style');
            }
        }
        for (var i = 12; i<21; i++) {
            var current = i+1;
            if (this.id === "and" + i.toString()) {
                $("#query" + current.toString()).removeAttr('style');
                $("#dept" + current.toString()).removeAttr('style');
                $("#and"+ i.toString()).attr("style","display:none");
                $("#and"+ current.toString()).removeAttr('style');
            } else if (this.id === "or" + i.toString()) {
                $("#query" + current.toString()).removeAttr('style');
                $("#dept" + current.toString()).removeAttr('style');
                $("#or"+ i.toString()).attr("style","display:none");
                $("#or"+ current.toString()).removeAttr('style');
            }
        }

        if (this.id === "add") {
            $("#add2").removeAttr('style');
            $("#orderBy2").removeAttr('style');
            $("#add").attr("style","display:none");
        } else if (this.id === "add2") {
            $("#orderBy3").removeAttr('style');
            $("#add2").attr("style","display:none");
        }

        if (this.id === "reset") {

            $("#and").removeAttr('style');
            $("#or").removeAttr('style');
            val='';
            val2='';
            val3='';
            val4='';
            val5='';
            val6='';
            val7='';
            val8 ='';
            val9='';
            val10='';

                $("#dept").removeAttr('style');
                $("#reset").attr("style","display:none");
                $("#query2").attr("style","display:none");
                $("#query3").attr("style","display:none");
                $("#query4").attr("style","display:none");
                $("#query5").attr("style","display:none");
                $("#query6").attr("style","display:none");
                $("#query7").attr("style","display:none");
                $("#query8").attr("style","display:none");
                $("#query9").attr("style","display:none");
                $("#query10").attr("style","display:none");
            $("#depts2").val("");
            $("#depts").val("");
            $("#depts3").val("");
            $("#depts4").val("");
            $("#depts5").val("");
            $("#depts6").val("");
            $("#depts7").val("");
            $("#depts8").val("");
            $("#depts9").val("");
            $("#depts10").val("");
            $("#dept2").val("");
            $("#dept").val("");
            $("#dept3").val("");
            $("#dept4").val("");
            $("#dept5").val("");
            $("#dept6").val("");
            $("#dept7").val("");
            $("#dept8").val("");
            $("#dept9").val("");
            $("#dept10").val("");
                $("#dept2").attr("style","display:none");
                $("#dept3").attr("style","display:none");
                $("#dept4").attr("style","display:none");
                $("#dept5").attr("style","display:none");
                $("#dept6").attr("style","display:none");
                $("#dept7").attr("style","display:none");
                $("#dept8").attr("style","display:none");
                $("#dept9").attr("style","display:none");
                $("#dept10").attr("style","display:none");
            $("#title").attr("style","display:none");
            $("#title2").attr("style","display:none");
            $("#title3").attr("style","display:none");
            $("#title4").attr("style","display:none");
            $("#title5").attr("style","display:none");
            $("#title6").attr("style","display:none");
            $("#title7").attr("style","display:none");
            $("#title8").attr("style","display:none");
            $("#title9").attr("style","display:none");
            $("#title10").attr("style","display:none");
            $("#id").attr("style","display:none");
            $("#id2").attr("style","display:none");
            $("#id3").attr("style","display:none");
            $("#id4").attr("style","display:none");
            $("#id5").attr("style","display:none");
            $("#id6").attr("style","display:none");
            $("#id7").attr("style","display:none");
            $("#id8").attr("style","display:none");
            $("#id9").attr("style","display:none");
            $("#id10").attr("style","display:none");
            $("#instructor").attr("style","display:none");
            $("#instructor2").attr("style","display:none");
            $("#instructor3").attr("style","display:none");
            $("#instructor4").attr("style","display:none");
            $("#instructor5").attr("style","display:none");
            $("#instructor6").attr("style","display:none");
            $("#instructor7").attr("style","display:none");
            $("#instructor8").attr("style","display:none");
            $("#instructor9").attr("style","display:none");
            $("#instructor10").attr("style","display:none");
            $("#size").attr("style","display:none");
            $("#size2").attr("style","display:none");
            $("#size3").attr("style","display:none");
            $("#size4").attr("style","display:none");
            $("#size5").attr("style","display:none");
            $("#size6").attr("style","display:none");
            $("#size7").attr("style","display:none");
            $("#size8").attr("style","display:none");
            $("#size9").attr("style","display:none");
            $("#size10").attr("style","display:none");
            $("#sizeText").attr("style","display:none");
            $("#sizeText2").attr("style","display:none");
            $("#sizeText3").attr("style","display:none");
            $("#sizeText4").attr("style","display:none");
            $("#sizeText5").attr("style","display:none");
            $("#sizeText6").attr("style","display:none");
            $("#sizeText7").attr("style","display:none");
            $("#sizeText8").attr("style","display:none");
            $("#sizeText9").attr("style","display:none");
            $("#sizeText10").attr("style","display:none");
            $("#and2").attr("style","display:none");
            $("#and3").attr("style","display:none");
            $("#and4").attr("style","display:none");
            $("#and5").attr("style","display:none");
            $("#and6").attr("style","display:none");
            $("#and7").attr("style","display:none");
            $("#and8").attr("style","display:none");
            $("#and9").attr("style","display:none");
            $("#and10").attr("style","display:none");
            $("#or2").attr("style","display:none");
            $("#or3").attr("style","display:none");
            $("#or4").attr("style","display:none");
            $("#or5").attr("style","display:none");
            $("#or6").attr("style","display:none");
            $("#or7").attr("style","display:none");
            $("#or8").attr("style","display:none");
            $("#or9").attr("style","display:none");
            $("#or10").attr("style","display:none");
            var nothing = new Array();
            var base = {"courses_dept":"","courses_id":"","courses_title":'',"courses_instructor":"","courses_sectionSize":"","courses_fail":'',"courses_pass":'',"courses_avg":''};
            nothing.push(base);
            generateTable(nothing);
        }

        if (this.id === "reset2") {

            $("#and11").removeAttr('style');
            $("#add").removeAttr('style');
            $("#or11").removeAttr('style');

            val11='';
            val12='';
            val13='';
            val14='';
            val15='';
            val16='';
            val17='';
            val18 ='';
            val19='';
            val20='';

            $("#dept11").removeAttr('style');
            $("#add2").attr("style","display:none");
            $("#reset2").attr("style","display:none");
            $("#query12").attr("style","display:none");
            $("#query13").attr("style","display:none");
            $("#query14").attr("style","display:none");
            $("#query15").attr("style","display:none");
            $("#query16").attr("style","display:none");
            $("#query17").attr("style","display:none");
            $("#query18").attr("style","display:none");
            $("#query19").attr("style","display:none");
            $("#query20").attr("style","display:none");
            $("#dept12").attr("style","display:none");
            $("#dept13").attr("style","display:none");
            $("#dept14").attr("style","display:none");
            $("#dept15").attr("style","display:none");
            $("#dept16").attr("style","display:none");
            $("#dept17").attr("style","display:none");
            $("#dept18").attr("style","display:none");
            $("#dept19").attr("style","display:none");
            $("#dept20").attr("style","display:none");
            $("#title11").attr("style","display:none");
            $("#title12").attr("style","display:none");
            $("#title13").attr("style","display:none");
            $("#title14").attr("style","display:none");
            $("#title15").attr("style","display:none");
            $("#title16").attr("style","display:none");
            $("#title17").attr("style","display:none");
            $("#title18").attr("style","display:none");
            $("#title19").attr("style","display:none");
            $("#title20").attr("style","display:none");
            $("#id11").attr("style","display:none");
            $("#id12").attr("style","display:none");
            $("#id13").attr("style","display:none");
            $("#id14").attr("style","display:none");
            $("#id15").attr("style","display:none");
            $("#id16").attr("style","display:none");
            $("#id17").attr("style","display:none");
            $("#id18").attr("style","display:none");
            $("#id19").attr("style","display:none");
            $("#id20").attr("style","display:none");
            $("#instructor11").attr("style","display:none");
            $("#instructor12").attr("style","display:none");
            $("#instructor13").attr("style","display:none");
            $("#instructor14").attr("style","display:none");
            $("#instructor15").attr("style","display:none");
            $("#instructor16").attr("style","display:none");
            $("#instructor17").attr("style","display:none");
            $("#instructor18").attr("style","display:none");
            $("#instructor19").attr("style","display:none");
            $("#instructor20").attr("style","display:none");
            $("#size11").attr("style","display:none");
            $("#size12").attr("style","display:none");
            $("#size13").attr("style","display:none");
            $("#size14").attr("style","display:none");
            $("#size15").attr("style","display:none");
            $("#size16").attr("style","display:none");
            $("#size17").attr("style","display:none");
            $("#size18").attr("style","display:none");
            $("#size19").attr("style","display:none");
            $("#size20").attr("style","display:none");
            $("#sizeText11").attr("style","display:none");
            $("#sizeText12").attr("style","display:none");
            $("#sizeText13").attr("style","display:none");
            $("#sizeText14").attr("style","display:none");
            $("#sizeText15").attr("style","display:none");
            $("#sizeText16").attr("style","display:none");
            $("#sizeText17").attr("style","display:none");
            $("#sizeText18").attr("style","display:none");
            $("#sizeText19").attr("style","display:none");
            $("#sizeText20").attr("style","display:none");
            $("#and12").attr("style","display:none");
            $("#and13").attr("style","display:none");
            $("#and14").attr("style","display:none");
            $("#and15").attr("style","display:none");
            $("#and16").attr("style","display:none");
            $("#and17").attr("style","display:none");
            $("#and18").attr("style","display:none");
            $("#and19").attr("style","display:none");
            $("#and20").attr("style","display:none");
            $("#or12").attr("style","display:none");
            $("#or13").attr("style","display:none");
            $("#or14").attr("style","display:none");
            $("#or15").attr("style","display:none");
            $("#or16").attr("style","display:none");
            $("#or17").attr("style","display:none");
            $("#or18").attr("style","display:none");
            $("#or19").attr("style","display:none");
            $("#or20").attr("style","display:none");
            $("#orderBy2").attr("style","display:none");
            $("#orderBy3").attr("style","display:none");
            var nothing = new Array();
            var base = {"courses_dept":"","courses_id":"","courses_title":"","CourseSize":'',"TotalPass":'',"TotalFail":'', "Average": ''};
            nothing.push(base);
            generateTable(nothing);
        }


        button = this.id;
    });

    $("#dept").on('input', function () {
        val = this.value;
    });
    $("#dept2").on('input', function () {
        val2 = this.value;
    });
    $("#dept3").on('input', function () {
        val3 = this.value;
    });
    $("#dept4").on('input', function () {
        val4 = this.value;
    });
    $("#dept5").on('input', function () {
        val5 = this.value;
    });
    $("#dept6").on('input', function () {
        val6 = this.value;
    });
    $("#dept7").on('input', function () {
        val7 = this.value;
    });
    $("#dept8").on('input', function () {
        val8 = this.value;
    });
    $("#dept9").on('input', function () {
        val9 = this.value;
    });
    $("#dept10").on('input', function () {
        val10 = this.value;
    });
    $("#dept11").on('input', function () {
        val11 = this.value;
    });
    $("#dept12").on('input', function () {
        val12 = this.value;
    });
    $("#dept13").on('input', function () {
        val13 = this.value;
    });
    $("#dept14").on('input', function () {
        val14 = this.value;
    });
    $("#dept15").on('input', function () {
        val15 = this.value;
    });
    $("#dept16").on('input', function () {
        val16 = this.value;
    });
    $("#dept17").on('input', function () {
        val17 = this.value;
    });
    $("#dept18").on('input', function () {
        val18 = this.value;
    });
    $("#dept19").on('input', function () {
        val19 = this.value;
    });
    $("#dept20").on('input', function () {
        val20 = this.value;
    });

    $("#queryForm").submit(function (e) {
        e.preventDefault();

        if (button === "and" || button === "or" || button === "and2" || button === "or2" || button === "and3" || button === "or3" || button === "and4" || button === "or4" || button === "and5" || button === "or5" || button === "and6" || button === "or6" || button === "and7" || button === "or7" || button === "and8" || button === "or8" || button === "and9" || button === "or9" || button === "and10" || button === "or10") {
            andOr = button;
        }

        if (button === "find") {
            var current;
            var array = new Array();
            for (var i = 1; i<11; i++) {
                where = undefined;
                if (i === 1) {
                    current = "";
                } else {
                    current = i;
                }
                var where;
                var query = $("#query" + current.toString()).val();
                var id = $("#id" + current.toString()).val();
                var instructor = $("#instructor" + current.toString()).val();
                var dept;
                if (i === 1) {
                    dept = val;
                } else if (i === 2) {
                    dept = val2;
                } else if (i === 3) {
                    dept = val3;
                } else if (i === 4) {
                    dept = val4;
                } else if (i === 5) {
                    dept = val5;
                } else if (i === 6) {
                    dept = val6;
                } else if (i === 7) {
                    dept = val7;
                } else if (i === 8) {
                    dept = val8;
                } else if (i === 9) {
                    dept = val9;
                } else if (i === 10) {
                    dept = val10;
                }
                var title = $("#title" + current.toString()).val();
                var size = $("#size" + current.toString()).val();
                var sizeText = $("#sizeText" + current.toString()).val();


                if (query === "dept" && dept !== undefined && dept !== "") {
                    where = {
                        "IS": {
                            "courses_dept": dept
                        }
                    };
                } else if (query === "title" && title.indexOf("undefined") == -1 && title !== "") {
                    where = {
                        "IS": {
                            "courses_title": title
                        }
                    };
                }  else if (query === "id" && id.indexOf("undefined") == -1 && id !== "") {
                    where = {
                        "IS": {
                            "courses_id": id
                        }
                    };
                }else if (query === "instructor" && instructor !== "") {
                    where = {
                        "IS": {
                            "courses_instructor": instructor
                        }
                    };
                } else if (query === "size" && sizeText !== '') {

                    if (size === "GT") {
                        where = {
                            "GT": {
                                "courses_sectionSize": Number(sizeText)
                            }
                        };
                    } else if (size === "LT") {
                        where = {
                            "LT": {
                                "courses_sectionSize": Number(sizeText)
                            }
                        };
                    } else if (size === "EQ") {
                        where = {
                            "EQ": {
                                "courses_sectionSize": Number(sizeText)
                            }
                        };
                    }
                }

                if (where === undefined) {
                    where = undefined;
                } else {
                    array.push(where);
                }

            }
            if (andOr === undefined) {
                andOr = "default";
            }


            if ((andOr.indexOf("and") !== -1 || andOr === "default") && array.length >0) {

                    var finalQuery = {
                        "GET": ["courses_dept", "courses_id", "courses_title", "courses_instructor", "courses_sectionSize", "courses_fail", "courses_pass", "courses_avg"],
                        "WHERE": {"AND": array},
                        "AS": "TABLE"
                    };

            } else if (andOr.indexOf("or") !== -1 && array.length >0) {

                    var finalQuery = {
                        "GET": ["courses_dept", "courses_id", "courses_title", "courses_instructor", "courses_sectionSize", "courses_fail", "courses_pass", "courses_avg"],
                        "WHERE": {"OR": array},
                        "AS": "TABLE"
                    };


            } else if(array.length === 0) {

                    var finalQuery = {
                        "GET": ["courses_dept", "courses_id", "courses_title", "courses_instructor", "courses_sectionSize", "courses_fail", "courses_pass", "courses_avg"],
                        "WHERE": {},
                        "AS": "TABLE"
                    };


            }
            $("#reset").removeAttr('style');
            //console.log(JSON.stringify(finalQuery));
            try {
                $.ajax("/query", {
                    type: "POST",
                    data: JSON.stringify(finalQuery),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data["render"] === "TABLE") {
                            if (data["result"].length === 0) {
                                alert("No sections match that description!");
                            } else {
                                generateTable(data["result"]);


                            }

                        }
                    }
                }).fail(function (e) {
                    spawnHttpErrorModal(e)
                });
            } catch (err) {
                spawnErrorModal("Query Error", err);
            }
        }
    });

    $("#queryForm2").submit(function (e) {
        e.preventDefault();
        if (button === "and11" || button === "or11" || button === "and12" || button === "or12" || button === "and13" || button === "or13" || button === "and14" || button === "or14" || button === "and15" || button === "or15" || button === "and16" || button === "or16" || button === "and17" || button === "or17" || button === "and18" || button === "or18" || button === "and19" || button === "or19" || button === "and20" || button === "or20") {
            andOr2 = button;
        }

        if (button === "find2") {
            var current;
            var array = new Array();
            for (var i = 11; i<21; i++) {
                where = undefined;
                current = i;
                var where;
                var query = $("#query" + current.toString()).val();
                var id = $("#id" + current.toString()).val();
                var instructor = $("#instructor" + current.toString()).val();
                var dept;
                if (i === 11) {
                    dept = val11;
                } else if (i === 12) {
                    dept = val12;
                } else if (i === 13) {
                    dept = val13;
                } else if (i === 14) {
                    dept = val14;
                } else if (i === 15) {
                    dept = val15;
                } else if (i === 16) {
                    dept = val16;
                } else if (i === 17) {
                    dept = val17;
                } else if (i === 18) {
                    dept = val18;
                } else if (i === 19) {
                    dept = val19;
                } else if (i === 20) {
                    dept = val20;
                }
                var title = $("#title" + current.toString()).val();
                var size = $("#size" + current.toString()).val();
                var sizeText = $("#sizeText" + current.toString()).val();


                if (query === "dept" && dept !== undefined && dept !== "") {
                    where = {
                        "IS": {
                            "courses_dept": dept
                        }
                    };
                } else if (query === "title" && title.indexOf("undefined") == -1 && title !== "") {
                    where = {
                        "IS": {
                            "courses_title": title
                        }
                    };
                }  else if (query === "id" && id.indexOf("undefined") == -1 && id !== "") {
                    where = {
                        "IS": {
                            "courses_id": id
                        }
                    };
                }else if (query === "instructor" && instructor !== "") {

                    where = {
                        "IS": {
                            "courses_instructor": instructor
                        }
                    };
                } else if (query === "size" && sizeText !== '') {

                    if (size === "GT") {
                        where = {
                            "GT": {
                                "courses_sectionSize": Number(sizeText)
                            }
                        };
                    } else if (size === "LT") {
                        where = {
                            "LT": {
                                "courses_sectionSize": Number(sizeText)
                            }
                        };
                    } else if (size === "EQ") {
                        where = {
                            "EQ": {
                                "courses_sectionSize": Number(sizeText)
                            }
                        };
                    }
                }

                if (where === undefined) {
                    where = undefined;
                } else {
                    array.push(where);
                }

            }
            if (andOr2 === undefined) {
                andOr2 = "default";
            }

             var orderKey = $("#orderBy").val();
             var orderKey2 = $("#orderBy2").val();
             var orderKey3 = $("#orderBy3").val();

             var order = new Array();
             if (orderKey !== "none") {
             if (orderKey === "courses_avg") {
             orderKey = "Average";
             } else if (orderKey === "courses_pass") {
             orderKey = "TotalPass";
             } else if (orderKey === "courses_fail") {
             orderKey = "TotalFails";
             }
             order.push(orderKey);
             }
             if (orderKey2 !== "none") {
             if (orderKey2 === "courses_avg") {
             orderKey2 = "Average";
             } else if (orderKey2 === "courses_pass") {
             orderKey2 = "TotalPass";
             } else if (orderKey2 === "courses_fail") {
             orderKey2 = "TotalFails";
             }
             order.push(orderKey2);
             }
             if (orderKey3 !== "none") {
             if (orderKey3 === "courses_avg") {
             orderKey3 = "Average";
             } else if (orderKey3 === "courses_pass") {
             orderKey3 = "TotalPass";
             } else if (orderKey3 === "courses_fail") {
             orderKey3 = "TotalFails";
             }
             order.push(orderKey3);
             }

            if ((andOr2.indexOf("and") !== -1 || andOr2 === "default") && array.length >0) {

                 if (order.length > 0) {

                 var finalQuery = {
                 "GET": ["courses_dept", "courses_id", "Title",  "CourseSize", "TotalPass", "TotalFails", "Average"],
                 "WHERE":{"AND": array},
                 "GROUP": ["courses_dept","courses_id"],
                 "APPLY": [{"Average": {"AVG": "courses_avg"}}, {"Title": {"GET": "courses_title"}}, {"CourseSize": {"MAX": "courses_sectionSize"}}, {"TotalPass": {"SUM": "courses_pass"}} ,{"TotalFails": {"SUM": "courses_fail"}} ],
                 "ORDER": {"dir": "UP", "keys": order},
                 "AS": "TABLE"
                 };

                 } else {

                     var finalQuery = {
                         "GET": ["courses_dept", "courses_id", "Title",  "CourseSize", "TotalPass", "TotalFails", "Average"],
                         "WHERE": {"AND": array},
                         "GROUP": ["courses_dept","courses_id"],
                         "APPLY": [{"Average": {"AVG": "courses_avg"}}, {"Title": {"GET": "courses_title"}}, {"CourseSize": {"MAX": "courses_sectionSize"}}, {"TotalPass": {"SUM": "courses_pass"}} ,{"TotalFails": {"SUM": "courses_fail"}} ],
                         "AS": "TABLE"
                     };

                }
            } else if (andOr2.indexOf("or") !== -1 && array.length >0) {

                 if (order.length > 0) {

                 var finalQuery = {
                 "GET": ["courses_dept", "courses_id", "Title",  "CourseSize", "TotalPass", "TotalFails", "Average"],
                 "WHERE": {"OR": array},
                 "GROUP": ["courses_dept","courses_id"],
                 "APPLY": [{"Average": {"AVG": "courses_avg"}}, {"Title": {"GET": "courses_title"}},  {"CourseSize": {"MAX": "courses_sectionSize"}}, {"TotalPass": {"SUM": "courses_pass"}} ,{"TotalFails": {"SUM": "courses_fail"}} ],
                 "ORDER": {"dir": "UP", "keys": order},
                 "AS": "TABLE"
                 };
                 } else {

                     var finalQuery = {
                         "GET": ["courses_dept", "courses_id", "Title",  "CourseSize", "TotalPass", "TotalFails", "Average"],
                         "WHERE": {"OR": array},
                         "GROUP": ["courses_dept","courses_id"],
                         "APPLY": [{"Average": {"AVG": "courses_avg"}}, {"Title": {"GET": "courses_title"}},  {"CourseSize": {"MAX": "courses_sectionSize"}}, {"TotalPass": {"SUM": "courses_pass"}} ,{"TotalFails": {"SUM": "courses_fail"}} ],
                         "AS": "TABLE"
                     };
                }

            } else if(array.length === 0) {

                 if (order.length > 0) {

                 var finalQuery = {
                 "GET": ["courses_dept", "courses_id", "Title",  "CourseSize", "TotalPass", "TotalFails","Average"],
                 "WHERE": {},
                 "GROUP": ["courses_dept", "courses_id"],
                 "APPLY": [{"Average": {"AVG": "courses_avg"}}, {"Title": {"GET": "courses_title"}}, {"CourseSize": {"MAX": "courses_sectionSize"}}, {"TotalPass": {"SUM": "courses_pass"}} ,{"TotalFails": {"SUM": "courses_fail"}} ],
                 "ORDER": {"dir": "UP", "keys": order},
                 "AS": "TABLE"
                 };
                 } else {

                     var finalQuery = {
                         "GET": ["courses_dept", "courses_id", "Title",  "CourseSize", "TotalPass", "TotalFails","Average"],
                         "WHERE": {},
                         "GROUP": ["courses_dept", "courses_id"],
                         "APPLY": [{"Average": {"AVG": "courses_avg"}}, {"Title": {"GET": "courses_title"}}, {"CourseSize": {"MAX": "courses_sectionSize"}}, {"TotalPass": {"SUM": "courses_pass"}} ,{"TotalFails": {"SUM": "courses_fail"}} ],
                         "AS": "TABLE"
                     };

            }

            }
            $("#reset2").removeAttr('style');
            //console.log(JSON.stringify(finalQuery));
            var sectionQuery = {
                "GET": ["courses_dept", "courses_id", "Sectionsin2014"],
                "WHERE": {"EQ": {"courses_year": 2014 }},
                "GROUP": ["courses_dept", "courses_id"],
                "APPLY": [{"Sectionsin2014": {"COUNT": "courses_uuid"}} ],
                "AS": "TABLE"
            };
            var tempResult;
            try {
                $.ajax("/query", {
                    type: "POST",
                    data: JSON.stringify(sectionQuery),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data["render"] === "TABLE") {
                            if (data["result"].length > 0) {
                                tempResult = data["result"];
                            }

                        }
                    }
                }).fail(function (e) {
                    spawnHttpErrorModal(e)
                });
            } catch (err) {
                spawnErrorModal("Query Error", err);
            }

            try {
                $.ajax("/query", {
                    type: "POST",
                    data: JSON.stringify(finalQuery),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data["render"] === "TABLE") {
                            if (data["result"].length === 0) {
                                alert("No courses match that description!");
                            } else {
                                var overallResult = data["result"];
                                for (var i = 0; i< overallResult.length; i++) {
                                    var currentCourse = overallResult[i];
                                    for (var j = 0; j< tempResult.length; j++) {
                                        var currentTemp = tempResult[j];
                                        if (currentCourse["courses_dept"] === currentTemp["courses_dept"] && currentCourse["courses_id"] === currentTemp["courses_id"]) {
                                            currentCourse["SectionsIn2014"] = currentTemp["Sectionsin2014"];
                                            break;
                                        }
                                    }

                                }
                                generateTable(overallResult);

                                $(".chooseAll").each(function() {
                                    $(this).click(function () {

                                        var temp = $(this)[0];
                                        var temp2 = temp['offsetParent'];
                                        var temp3 = temp2['childNodes'];
                                        var temp4 = temp3[1];
                                        var temp5 = temp4['childNodes'];

                                        for (var i = 0; i<temp5.length; i++) {
                                            var temp6 = temp5[i];
                                            var ccourse = temp6.__data__;
                                            var course = new Object();
                                            course['courses_dept'] = ccourse['courses_dept'];
                                            course['courses_id'] = ccourse['courses_id'];
                                            course['courses_title'] = ccourse['Title'];
                                            course['courses_sectionSize'] = ccourse['CourseSize'];
                                            course['courses_fail'] = ccourse['TotalFails'];
                                            course['courses_pass'] = ccourse['TotalPass'];
                                            course['courses_avg'] = ccourse['Average'];
                                            if (ccourse['SectionsIn2014'] === undefined) {
                                                ccourse['SectionsIn2014'] = 0;
                                            }
                                            course['SectionsRequired'] = Math.ceil(ccourse['SectionsIn2014']/3);
                                            var duplicate = false;
                                            for (var j = 0; j<results.length; j++) {
                                                var current = results[j];
                                                if (current['courses_dept']===course['courses_dept'] &&
                                                    current['courses_id']===course['courses_id'] ) {
                                                    duplicate = true;
                                                }
                                            }
                                            if (duplicate === false) {
                                                results.push(course);
                                            }
                                        }
                                        if (temp5.length >0) {
                                            var data2 = new Object();
                                            data2["render"] = "TABLE";
                                            data2["result"] = results;
                                            generateTable2(data2["result"]);
                                        } else {
                                            alert('Nothing to add!');
                                        }

                                    });
                                });


                                $(".getHelp").each(function() {

                                    $(this).click(function () {
                                        var $row = $(this).closest("tr");
                                        var $course = $row[0];
                                        var i = 0;

                                        $($course).find('td').each (function() {
                                            if (i === 0 ) {
                                                dept = $(this)[0].__data__.html;
                                            } else if (i === 1) {
                                                id = $(this)[0].__data__.html;
                                            } else if (i === 2) {
                                                title = $(this)[0].__data__.html;
                                            }
                                            i = i + 1;
                                        });
                                        var url = "http://www.calendar.ubc.ca/VANCOUVER/courses.cfm?page=name&code=" + dept.toUpperCase();
                                        $.ajax({ url: url, success: function(data) {

                                            var usefulInfo = data.substring(data.indexOf('<dl class="double">'),data.indexOf('</dl>'));
                                            var index = '<dt><a name='+'"'+id.toString()+'"'+'></a>'+dept.toUpperCase()+' '+id.toString();
                                            var courseInfo = usefulInfo.substring(usefulInfo.indexOf(index), usefulInfo.indexOf('</dd>',usefulInfo.indexOf(index)));
                                            var courseTitle = courseInfo.substring(courseInfo.indexOf('<b>')+3,courseInfo.indexOf('</b>') );
                                            var courseDescription = courseInfo.substring(courseInfo.indexOf('<dd>')+4,courseInfo.indexOf('<br >') );

                                            courseDescription = courseDescription.toLowerCase();
                                            courseDescription = courseDescription.replace(/ and /g, ' ');
                                            courseDescription = courseDescription.replace(/ or /g, ' ');
                                            courseDescription = courseDescription.replace(/ the /g , ' ');
                                            courseDescription = courseDescription.replace(/ for /g , ' ');
                                            courseDescription = courseDescription.replace(/ as /g, ' ');
                                            courseDescription = courseDescription.replace(/ to /g, ' ');
                                            courseDescription = courseDescription.replace(/ a /g, ' ');
                                            courseDescription = courseDescription.replace(/,/g, '');
                                            courseDescription = courseDescription.replace(/\(/g, '');
                                            courseDescription = courseDescription.replace(/\)/g, '');
                                            courseDescription = courseDescription.replace(/\./g, '');
                                            courseDescription = courseDescription.replace(/\'/g, '');
                                            courseDescription = courseDescription.replace(/\;/g, '');
                                            courseDescription = courseDescription.replace(/ of /g, ' ');
                                            courseDescription = courseDescription.replace(/introduction/g, '');
                                            courseDescription = courseDescription.replace(/upper-level/g, '');
                                            courseDescription = courseDescription.replace(/introductory/g, '');
                                            courseDescription = courseDescription.replace(/ with /g, ' ');
                                            courseDescription = courseDescription.replace(/including/g, '');
                                            courseDescription = courseDescription.replace(/  /g, ' ');
                                            courseTitle = courseTitle.toLowerCase();
                                            courseTitle = courseTitle.replace(/ and /g, ' ');
                                            courseTitle = courseTitle.replace(/,/g, ' ');
                                            courseTitle = courseTitle.replace(/\(/g, '');
                                            courseTitle = courseTitle.replace(/\)/g, '');
                                            courseTitle = courseTitle.replace(/\./g, '');
                                            courseTitle = courseTitle.replace(/\;/g, '');
                                            courseTitle = courseTitle.replace(/\'/g, '');
                                            courseTitle = courseTitle.replace(/ of /g, ' ');
                                            courseTitle = courseTitle.replace(/ the /g, ' ');
                                            courseTitle = courseTitle.replace(/ for /g, ' ');
                                            courseTitle = courseTitle.replace(/ a /g, ' ');
                                            courseTitle = courseTitle.replace(/ or /g, ' ');
                                            courseTitle = courseTitle.replace(/ to /g, ' ');
                                            courseTitle = courseTitle.replace(/introduction/g, '');
                                            courseTitle = courseTitle.replace(/ with /g, ' ');
                                            courseTitle = courseTitle.replace(/introductory/g, '');
                                            courseTitle = courseTitle.replace(/upper-level/g, '');
                                            courseTitle = courseTitle.replace(/  /g, ' ');

                                            var search = courseDescription.split(' ');
                                            for (var i=0; i<search.length; i++) {
                                                if (search[i].length < 5) {
                                                    search.splice(i, 1);
                                                }
                                            }
                                            var finalSearch = courseTitle.split(' ');

                                            for (var i=0; i<2; i++) {
                                                var use = Math.floor((Math.random() * search.length));
                                                var duplicate = false;
                                                for (var j=0; j<finalSearch.length; j++) {
                                                    if (finalSearch[j].indexOf(search[use]) !== -1 && search[use].indexOf(finalSearch[j]) !== -1) {
                                                        duplicate = true;
                                                    }
                                                }
                                                if (duplicate===false) {
                                                    finalSearch.push(search[use])
                                                }
                                            }
                                            var removeThese = new Array();
                                            for (var j=0; j<finalSearch.length; j++) {
                                                if (finalSearch[j] === '' || finalSearch[j].length < 5 || finalSearch[j].includes('<')  || finalSearch[j].includes('>') ||  finalSearch[j].includes('[')) {
                                                    removeThese.push(finalSearch[j]);
                                                }
                                            }
                                            for (var j=0; j<removeThese.length; j++) {
                                                finalSearch.splice(finalSearch.indexOf(removeThese[j]), 1);
                                            }

                                            var searchString = '';
                                            for (var j=0; j<finalSearch.length; j++) {
                                                if (j===0) {
                                                    searchString = finalSearch[j];
                                                } else {
                                                    searchString = searchString+'+'+finalSearch[j];
                                                }
                                            }
                                            console.log(searchString);
                                            var url2 = 'https://www.youtube.com/results?search_query='+searchString;
                                            $.ajax({ url: url2, success: function(data) {
                                                var temp = data.substring(data.indexOf('first-focus">About ')+19, data.indexOf(' results', data.indexOf('first-focus">About ')+19));
                                                var temp2 = temp.replace(/,/g, '');
                                                var result = Number(temp2);

                                                if (result < 1000) {
                                                    finalSearch.splice(finalSearch[finalSearch.length], 1);
                                                    searchString = '';
                                                    for (var j=0; j<finalSearch.length; j++) {
                                                        if (j===0) {
                                                            searchString = finalSearch[j];
                                                        } else {
                                                            searchString = searchString+'+'+finalSearch[j];
                                                        }
                                                    }
                                                    url2 = 'https://www.youtube.com/results?search_query='+searchString;
                                                    $.ajax({ url: url2, success: function(data) {
                                                        var temp = data.substring(data.indexOf('first-focus">About ')+19, data.indexOf(' results', data.indexOf('first-focus">About ')+19));
                                                        var temp2 = temp.replace(/,/g, '');
                                                        var result = Number(temp2);

                                                        if (result < 1000) {
                                                            finalSearch.splice(finalSearch[finalSearch.length], 1);
                                                            searchString = '';
                                                            for (var j = 0; j < finalSearch.length; j++) {
                                                                if (j === 0) {
                                                                    searchString = finalSearch[j];
                                                                } else {
                                                                    searchString = searchString + '+' + finalSearch[j];
                                                                }
                                                            }
                                                            url2 = 'https://www.youtube.com/results?search_query=' + searchString;
                                                            $.ajax({url: url2, success: function (data) {
                                                                var temp = data.substring(data.indexOf('first-focus">About ')+19, data.indexOf(' results', data.indexOf('first-focus">About ')+19));
                                                                var temp2 = temp.replace(/,/g, '');
                                                                var result = Number(temp2);

                                                                var videoURL = data.substring(data.indexOf('data-context-item-id="')+22, data.indexOf('" data',data.indexOf('data-context-item-id="')+22 ));
                                                                url2 = 'https://www.youtube.com/watch?v=' + videoURL;
                                                                window.open(url2,'_blank');
                                                                //window.location.href = url2;
                                                            }});
                                                        } else {
                                                            var videoURL = data.substring(data.indexOf('data-context-item-id="')+22, data.indexOf('" data',data.indexOf('data-context-item-id="')+22 ));
                                                            url2 = 'https://www.youtube.com/watch?v=' + videoURL;
                                                            window.open(url2,'_blank');
                                                            //window.location.href = url2;
                                                        }
                                                    }});
                                                } else {
                                                    var videoURL = data.substring(data.indexOf('data-context-item-id="')+22, data.indexOf('" data',data.indexOf('data-context-item-id="')+22 ));
                                                    url2 = 'https://www.youtube.com/watch?v=' + videoURL;
                                                    window.open(url2,'_blank');
                                                    //window.location.href = url2;
                                                }

                                            }});

                                        }});
                                    });
                                });

                                $(".chooseCourse").each(function() {

                                    $(this).click(function () {
                                        var $row = $(this).closest("tr");
                                        var $course = $row[0];
                                        var i = 0;

                                        $($course).find('td').each (function() {
                                            if (i === 0 ) {
                                                dept = $(this)[0].__data__.html;
                                            } else if (i === 1) {
                                                id = $(this)[0].__data__.html;
                                            } else if (i === 2) {
                                                title = $(this)[0].__data__.html;
                                            } else if (i === 3) {
                                                courseSize = $(this)[0].__data__.html;
                                            } else if (i === 4) {
                                                fail = $(this)[0].__data__.html;
                                            } else if (i === 5) {
                                                pass = $(this)[0].__data__.html;
                                            } else if (i === 6) {
                                                average = $(this)[0].__data__.html;
                                            } else if (i === 7) {
                                                sections = $(this)[0].__data__.html;
                                                if (sections === undefined) {
                                                    sections = 0;
                                                }
                                                sections = Math.ceil(sections/3);
                                            }
                                            i = i + 1;
                                        });

                                        var course = new Object();
                                        course['courses_dept'] = dept;
                                        course['courses_id'] = id;
                                        course['courses_title'] = title;
                                        course['courses_sectionSize'] = courseSize;
                                        course['courses_fail'] = fail;
                                        course['courses_pass'] = pass;
                                        course['courses_avg'] = average;
                                        course['SectionsRequired'] = sections;
                                        var duplicate = false;
                                        for (var i = 0; i<results.length; i++) {
                                            var current = results[i];
                                            if (current['courses_dept']===course['courses_dept'] &&
                                                current['courses_id']===course['courses_id'] ) {
                                                duplicate = true;
                                            }
                                        }
                                        if (duplicate) {
                                            alert('This course has already been selected!');
                                        } else {
                                            results.push(course);
                                            var data2 = new Object();
                                            data2["render"] = "TABLE";
                                            data2["result"] = results;
                                            generateTable2(data2["result"]);
                                        }

                                    });
                                });
                            }
                        }
                    }
                }).fail(function (e) {
                    spawnHttpErrorModal(e)
                });
            } catch (err) {
                spawnErrorModal("Query Error", err);
            }
        }
    });

    $("#chooseBuilding").change(function() {
        var value = $("#chooseBuilding").val();
        if (value === "All") {
            $("#metres").attr('style', 'display:none');
        } else {
            $("#metres").removeAttr('style');
        }
    });


    $("#roomForm").submit(function (e) {
        e.preventDefault();

        var finalQuery;
        var array = [];
        var chooseBuilding = $("#chooseBuilding").val();
        var metres = $("#metres").val();
        var size = $("#roomSize").val();

        var chooseType = $("#chooseType").val();
        var chooseFurniture = $("#chooseFurniture").val();
        var tempArray2 = new Array();

        var Obj = {
            ALRD: {
                lat: 49.2699,
                lon: -123.25318,
                fullname: "Allard Hall (LAW)"
            }
        };
        array.push(Obj);

        Obj = {
            ANSO: {
                lat: 49.26958,
                lon: -123.25741,
                fullname: "Anthropology and Sociology"
            }
        };
        array.push(Obj);

        Obj = {
            AERL: {
                lat: 49.26372,
                lon: -123.25099,
                fullname: "Aquatic Ecosystems Research Laboratory"
            }
        };
        array.push(Obj);

        Obj = {
            AUDX: {
                lat: 49.2666,
                lon: -123.25655,
                fullname: "Auditorium Annex"
            }
        };
        array.push(Obj);

        Obj = {
            ANGU: {
                lat: 49.26486,
                lon: -123.25364,
                fullname: "Henry Angus"
            }
        };
        array.push(Obj);

        Obj = {
            CHEM: {
                lat: 49.2659,
                lon: -123.25308,
                fullname: "Chemistry"
            }
        };
        array.push(Obj);

        Obj = {
            BRKX: {
                lat: 49.26862,
                lon: -123.25237,
                fullname: "Brock Hall Annex"
            }
        };
        array.push(Obj);

        Obj = {
            BUCH: {
                lat: 49.26826,
                lon: -123.25468,
                fullname: "Buchanan"
            }
        };
        array.push(Obj);

        Obj = {
            CEME: {
                lat: 49.26273,
                lon: -123.24894,
                fullname:"Civil and Mechanical Engineering"
            }
        };
        array.push(Obj);

        Obj = {
            EOSM: {
                lat: 49.26228,
                lon: -123.25198,
                fullname: "Earth and Ocean Sciences - Main"
            }
        };
        array.push(Obj);

        Obj = {
            CIRS: {
                lat: 49.26207,
                lon: -123.25314,
                fullname: "Centre for Interactive Research on Sustainability"
            }
        };
        array.push(Obj);

        Obj = {
            BIOL: {
                lat: 49.26479,
                lon: -123.25249,
                fullname: "Biological Sciences"
            }
        };
        array.push(Obj);

        Obj = {
            ESB: {
                lat: 49.26274,
                lon: -123.25224,
                fullname: "Earth Sciences Building"
            }
        };
        array.push(Obj);

        Obj = {
            GEOG: {
                lat: 49.26605,
                lon: -123.25623,
                fullname: "Geography"
            }
        };
        array.push(Obj);

        Obj = {
            FSC: {
                lat: 49.26044,
                lon: -123.24886,
                fullname: "Forest Sciences Centre"
            }
        };
        array.push(Obj);

        Obj = {
            FRDM: {
                lat: 49.26541,
                lon: -123.24608,
                fullname: "Friedman Building"
            }
        };
        array.push(Obj);

        Obj = {
            FNH: {
                lat: 49.26414,
                lon: -123.24959,
                fullname: "Food, Nutrition and Health"
            }
        };
        array.push(Obj);

        Obj = {
            CHBE: {
                lat: 49.26228,
                lon: -123.24718,
                fullname: "Chemical and Biological Engineering Building"
            }
        };
        array.push(Obj);

        Obj = {
            DMP: {
                lat: 49.26125,
                lon: -123.24807,
                fullname: "Hugh Dempster Pavilion"
            }
        };
        array.push(Obj);

        Obj = {
            FORW: {
                lat: 49.26176,
                lon: -123.25179,
                fullname: "Frank Forward"
            }
        };
        array.push(Obj);

        Obj = {
            HENN: {
                lat: 49.26627,
                lon: -123.25374,
                fullname: "Hennings"
            }
        };
        array.push(Obj);

        Obj = {
            MATX: {
                lat: 49.28273,
                lon: -123.12074,
                fullname: "Mathematics Annex"
            }
        };
        array.push(Obj);

        Obj = {
            IONA: {
                lat: 49.27106,
                lon: -123.25042,
                fullname: "Iona Building"
            }
        };
        array.push(Obj);

        Obj = {
            IBLC: {
                lat: 49.26766,
                lon: -123.2521,
                fullname: "Irving K Barber Learning Centre"
            }
        };
        array.push(Obj);

        Obj = {
            MCML: {
                lat: 49.26114,
                lon: -123.25027,
                fullname: "MacMillan"
            }
        };
        array.push(Obj);

        Obj = {
            HEBB: {
                lat: 49.2661,
                lon: -123.25165,
                fullname: "Hebb"
            }
        };
        array.push(Obj);

        Obj = {
            LSK: {
                lat: 49.26545,
                lon: -123.25533,
                fullname: "Leonard S. Klinck (also known as CSCI)"
            }
        };
        array.push(Obj);

        Obj = {
            SPPH: {
                lat: 49.2642,
                lon: -123.24842,
                fullname: "School of Population and Public Health"
            }
        };
        array.push(Obj);

        Obj = {
            WESB: {
                lat: 49.26517,
                lon: -123.24937,
                fullname: "Wesbrook"
            }
        };
        array.push(Obj);

        Obj = {
            LSC: {
                lat: 49.26236,
                lon: -123.24494,
                fullname: "Life Sciences Centre"
            }
        };
        array.push(Obj);

        Obj = {
            PHRM: {
                lat: 49.26229,
                lon: -123.24342,
                fullname: "Pharmaceutical Sciences Building"
            }
        };
        array.push(Obj);

        Obj = {
            SOWK: {
                lat: 49.2643,
                lon: -123.25505,
                fullname: "Jack Bell Building for the School of Social Work"
            }
        };
        array.push(Obj);

        Obj = {
            PCOH: {
                lat: 49.264,
                lon: -123.2559,
                fullname: "Ponderosa Commons: Oak House"
            }
        };
        array.push(Obj);

        Obj = {
            MCLD: {
                lat: 49.26176,
                lon: -123.24935,
                fullname: "MacLeod"
            }
        };
        array.push(Obj);

        Obj = {
            MGYM: {
                lat: 49.2663,
                lon: -123.2466,
                fullname: "War Memorial Gymnasium"
            }
        };
        array.push(Obj);

        Obj = {
            MATH: {
                lat: 49.28273,
                lon: -123.12074,
                fullname: "Mathematics"
            }
        };
        array.push(Obj);

        Obj = {
            SWNG: {
                lat: 49.26293,
                lon: -123.25431,
                fullname: "West Mall Swing Space"
            }
        };
        array.push(Obj);

        Obj = {
            WOOD: {
                lat: 49.26478,
                lon: -123.24673,
                fullname: "Woodward (Instructional Resources Centre-IRC)"
            }
        };
        array.push(Obj);

        Obj = {
            OSBO: {
                lat: 49.26047,
                lon: -123.24467,
                fullname: "Robert F. Osborne Centre"
            }
        };
        array.push(Obj);

        Obj = {
            ORCH: {
                lat: 49.26048,
                lon: -123.24944,
                fullname: "Orchard Commons"
            }
        };
        array.push(Obj);

        Obj = {
            LASR: {
                lat: 49.26767,
                lon: -123.25583,
                fullname: "Frederic Lasserre"
            }
        };
        array.push(Obj);

        Obj = {
            SCRF: {
                lat: 49.26398,
                lon: -123.2531,
                fullname: "Neville Scarfe"
            }
        };
        array.push(Obj);

        Obj = {
            SRC: {
                lat: 49.2683,
                lon: -123.24894,
                fullname: "Student Recreation Centre"
            }
        };
        array.push(Obj);

        Obj = {
            UCLL: {
                lat: 49.26867,
                lon: -123.25692,
                fullname: "The Leon and Thea Koerner University Centre"
            }
        };
        array.push(Obj);
        var newArray2 = [];
        var final = [];

        if (metres !== "") {
            var newArray = [];

            for (var m = 0; m < array.length; m++) {
                var newArray3 = [];

                var temp = array[m];
                var temp2 = Object.keys(temp);
                var temp3 = temp[temp2];
                var building = temp3['fullname'];

                var LatLonArray = new Object();
                LatLonArray['lat'] = temp3['lat'];
                LatLonArray['lon'] = temp3['lon'];
                final[building] = newArray3;

                for (var k = 0; k < array.length; k++) {
                    var temp4 = array[k];
                    var temp5 = Object.keys(temp4);
                    var temp6 = temp4[temp5];
                    var building2 = temp6['fullname'];

                    var LatLonArray2 = new Object();
                    LatLonArray2['lat'] = temp6['lat'];
                    LatLonArray2['lon'] = temp6['lon'];

                    var distance = getDistance(LatLonArray['lat'], LatLonArray['lon'], LatLonArray2['lat'], LatLonArray2['lon']);
                    var tempObject = new Object();
                    tempObject[building2] = distance;
                    newArray3.push(tempObject);
                }
            }

            for (var i in final) {
                // i is fullname
                // final[i] is each array
                for (var j = 0; j < final[i].length; j++){
                    if (chooseBuilding == Object.keys(final[i][j])[0]) {
                        var temp = final[i][j];
                        var temp2 = Object.keys(temp);
                        var temp3 = temp[temp2];
                        if (temp3 <= metres){
                            newArray.push(i);
                        }
                    }
                }
            }


            for (var i in final) {
                // i is fullname
                // final[i] is each array
                if (i == chooseBuilding) {
                    for (var j = 0; j < final[i].length; j++){
                        var temp = final[i][j];
                        var temp2 = Object.keys(temp);
                        var temp3 = temp[temp2];
                        if (temp3 <= metres) {
                            var goodRoom = new Object();
                            goodRoom['rooms_fullname'] = temp2[0];
                            goodRoom['distance'] = temp3;
                            tempArray2.push(goodRoom);
                            newArray.push(Object.keys(final[i][j])[0]);
                        }
                    }
                }
            }

            for (var n = 0; n < newArray.length; n++) {
                var where = {
                    "IS": {
                        "rooms_fullname": newArray[n]
                    }
                };
                newArray2.push(where);
            }
        }
        var def = {
            "IS": {
                "rooms_fullname": chooseBuilding
            }
        };

        newArray2.push(def);
        if (chooseBuilding !== "All") {
            if (metres == "" && size !== "" && chooseFurniture !== "" && chooseType !== "") {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}}
                                ]
                            },
                            {"GT": {"rooms_seats": size}},
                            {
                                "OR": [
                                    {"IS": {"rooms_type": chooseType}},
                                    {"IS": {"rooms_furniture": chooseFurniture}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (size == "" && metres !== "" && newArray2.length > 0&& chooseFurniture !== "" && chooseType !== "") {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}},
                                    {"OR": newArray2}
                                ]
                            },
                            {
                                "OR": [
                                    {"IS": {"rooms_type": chooseType}},
                                    {"IS": {"rooms_furniture": chooseFurniture}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (chooseType == "" && chooseFurniture !== "" && size !== "" && metres !== "" && newArray2.length > 0) {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}},
                                    {"OR": newArray2}
                                ]
                            },
                            {"GT": {"rooms_seats": size}},
                            {
                                "OR": [
                                    {"IS": {"rooms_furniture": chooseFurniture}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (chooseFurniture == "" && chooseType !== "" && size !== "" && metres !== "" && newArray2.length > 0) {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}},
                                    {"OR": newArray2}
                                ]
                            },
                            {"GT": {"rooms_seats": size}},
                            {
                                "OR": [
                                    {"IS": {"rooms_type": chooseType}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (metres == "" && size == "" && chooseFurniture !== "" && chooseType !== "") {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}}
                                ]
                            },
                            {
                                "OR": [
                                    {"IS": {"rooms_type": chooseType}},
                                    {"IS": {"rooms_furniture": chooseFurniture}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (metres == "" && chooseType == "" && size !== "" && chooseFurniture !== "") { // needs to change
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}}
                                ]
                            },
                            {"GT": {"rooms_seats": size}},
                            {
                                "OR": [
                                    {"IS": {"rooms_furniture": chooseFurniture}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (metres == "" && chooseFurniture == "" && size !== "" && chooseType !== "") {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}}
                                ]
                            },
                            {"GT": {"rooms_seats": size}},
                            {
                                "OR": [
                                    {"IS": {"rooms_type": chooseType}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (size == "" && chooseType == "" && chooseFurniture !== "" && metres !== "" && newArray2.length > 0) {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}},
                                    {"OR": newArray2}
                                ]
                            },
                            {
                                "OR": [
                                    {"IS": {"rooms_furniture": chooseFurniture}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (size == "" && chooseFurniture == "" && chooseType !== "" && metres !== "" && newArray2.length > 0) {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}},
                                    {"OR": newArray2}
                                ]
                            },
                            {
                                "OR": [
                                    {"IS": {"rooms_type": chooseType}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (chooseType == "" && chooseFurniture == "" && size !== "" && metres !== "" && newArray2.length > 0) {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}},
                                    {"OR": newArray2}
                                ]
                            },
                            {"GT": {"rooms_seats": size}}
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (metres == "" && size == "" && chooseType == "" && chooseFurniture !== "") {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}}
                                ]
                            },
                            {
                                "OR": [
                                    {"IS": {"rooms_furniture": chooseFurniture}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (metres == "" && size == "" && chooseFurniture == "" && chooseType !== "") {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}}
                                ]
                            },
                            {
                                "OR": [
                                    {"IS": {"rooms_type": chooseType}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (size == "" && chooseType == "" && chooseFurniture == "" && metres !== "" && newArray2.length > 0) {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}},
                                    {"OR": newArray2}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (metres == "" && chooseType == "" && chooseFurniture == "" && size !== "") {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}}
                                ]
                            },
                            {"GT": {"rooms_seats": size}}
                        ]
                    },
                    "AS": "TABLE"
                };
            } else if (metres == "" && chooseType == "" && chooseFurniture == "" && size == "") {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {"IS": {"rooms_fullname": chooseBuilding}},
                    "AS": "TABLE"
                };
            } else  {
                finalQuery = {
                    "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                        "rooms_seats", "rooms_type", "rooms_furniture"],
                    "WHERE": {
                        "AND": [
                            {
                                "OR": [
                                    {"IS": {"rooms_fullname": chooseBuilding}},
                                    {"OR": newArray2}
                                ]
                            },
                            {"GT": {"rooms_seats": size}},
                            {
                                "OR": [
                                    {"IS": {"rooms_type": chooseType}},
                                    {"IS": {"rooms_furniture": chooseFurniture}}
                                ]
                            }
                        ]
                    },
                    "AS": "TABLE"
                };
            }
        } else if (size !== "" && chooseType !== "" && chooseFurniture !== "") {
            finalQuery = {
                "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                    "rooms_seats", "rooms_type", "rooms_furniture"],
                "WHERE": {
                    "AND": [
                        {"GT": {"rooms_seats": size}},
                        {
                            "OR": [
                                {"IS": {"rooms_type": chooseType}},
                                {"IS": {"rooms_furniture": chooseFurniture}}
                            ]
                        }
                    ]
                },
                "AS": "TABLE"
            };
        } else if (size === "" && chooseType !== "" && chooseFurniture !== "") {
            finalQuery = {
                "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                    "rooms_seats", "rooms_type", "rooms_furniture"],
                "WHERE":

                        {
                            "OR": [
                                {"IS": {"rooms_type": chooseType}},
                                {"IS": {"rooms_furniture": chooseFurniture}}
                            ]
                        }
                    ,
                "AS": "TABLE"
            };
        } else if (size === "" && chooseType === "" && chooseFurniture !== "") {
            finalQuery = {
                "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                    "rooms_seats", "rooms_type", "rooms_furniture"],
                "WHERE": {"IS": {"rooms_furniture": chooseFurniture}},
                "AS": "TABLE"
            };
        } else if (size === "" && chooseType === "" && chooseFurniture === "") {
            finalQuery = {
                "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                    "rooms_seats", "rooms_type", "rooms_furniture"],
                "WHERE": {},
                "AS": "TABLE"
            };
        } else if (size !== "" && chooseType === "" && chooseFurniture === "") {
            finalQuery = {
                "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                    "rooms_seats", "rooms_type", "rooms_furniture"],
                "WHERE": {"GT": {"rooms_seats": size}},
                "AS": "TABLE"
            };
        } else if (size === "" && chooseType !== "" && chooseFurniture === "") {
            finalQuery = {
                "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                    "rooms_seats", "rooms_type", "rooms_furniture"],
                "WHERE": {"IS": {"rooms_type": chooseType}},
                "AS": "TABLE"
            };
        } else if (size !== "" && chooseType === "" && chooseFurniture !== "") {
            finalQuery = {
                "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                    "rooms_seats", "rooms_type", "rooms_furniture"],
                "WHERE": {
                    "AND": [
                        {"GT": {"rooms_seats": size}},
                        {"IS": {"rooms_furniture": chooseFurniture}}
                    ]
                },
                "AS": "TABLE"
            };
        } else if (size !== "" && chooseType !== "" && chooseFurniture === "") {
            finalQuery = {
                "GET": ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_address",
                    "rooms_seats", "rooms_type", "rooms_furniture"],
                "WHERE": {
                    "AND": [
                        {"GT": {"rooms_seats": size}},
                        {"IS": {"rooms_type": chooseType}}
                    ]
                },
                "AS": "TABLE"
            };
        }

        //console.log(JSON.stringify(finalQuery));
        try {
            $.ajax("/query", {type:"POST", data: JSON.stringify(finalQuery), contentType: "application/json", dataType: "json", success: function(data) {
                if (data["render"] === "TABLE") {
                    if (data["result"].length == 0) {
                        alert("No rooms match the description!");
                    } else {

                        var overallResult = data["result"];
                        for (var i = 0; i< overallResult.length; i++) {
                            var currentCourse = overallResult[i];
                            for (var j = 0; j< tempArray2.length; j++) {
                                var currentTemp = tempArray2[j];
                                if (currentCourse["rooms_fullname"] === currentTemp["rooms_fullname"]) {
                                    var distance = Math.round(currentTemp["distance"]);
                                    currentCourse["DistanceFromBuilding"] = distance;
                                    break;
                                }
                            }

                        }
                        generateTableRoom(overallResult);

                        $(".chooseAllRooms").each(function() {

                            $(this).click(function () {
                                var temp = $(this)[0];
                                var temp2 = temp['offsetParent'];
                                var temp3 = temp2['childNodes'];
                                var temp4 = temp3[1];
                                var temp5 = temp4['childNodes'];

                                for (var i = 0; i < temp5.length; i++) {
                                    var temp6 = temp5[i];
                                    var rroom = temp6.__data__;
                                    var room = new Object();
                                    room['rooms_fullname'] = rroom['rooms_fullname'];
                                    room['rooms_shortname'] = rroom['rooms_shortname'];
                                    room['rooms_number'] = rroom['rooms_number'];
                                    room['rooms_address'] = rroom['rooms_address'];
                                    room['rooms_seats'] = rroom['rooms_seats'];
                                    room['rooms_furniture'] = rroom['rooms_furniture'];
                                    room['rooms_type'] = rroom['rooms_type'];

                                    var duplicate = false;
                                    for (var j = 0; j < results2.length; j++) {
                                        var current = results2[j];
                                        if (current['rooms_shortname'] === room['rooms_shortname'] &&
                                            current['rooms_number'] === room['rooms_number']) {
                                            duplicate = true;
                                        }
                                    }
                                    if (duplicate === false) {
                                        results2.push(room);
                                    }
                                }
                                if (temp5.length > 0) {
                                    var data2 = new Object();
                                    data2["render"] = "TABLE";
                                    data2["result"] = results2;
                                    generateTableRoom2(data2["result"]);
                                } else {
                                    alert('Nothing to add!');
                                }
                            });
                        });

                        $(".chooseRoom").each(function() {

                            $(this).click(function () {
                                var $row = $(this).closest("tr");
                                var $room = $row[0];
                                var i = 0;

                                $($room).find('td').each (function() {
                                    if (i === 0 ) {
                                        fullname = $(this)[0].__data__.html;
                                    } else if (i === 1) {
                                        shortname = $(this)[0].__data__.html;
                                    } else if (i === 2) {
                                        number = $(this)[0].__data__.html;
                                    } else if (i === 3) {
                                        address = $(this)[0].__data__.html;
                                    } else if (i === 4) {
                                        seats = $(this)[0].__data__.html;
                                    } else if (i === 5) {
                                        type = $(this)[0].__data__.html;
                                    } else if (i === 6) {
                                        furniture = $(this)[0].__data__.html;
                                    }
                                    i = i + 1;
                                });

                                var room = new Object();
                                room['rooms_fullname'] = fullname;
                                room['rooms_shortname'] = shortname;
                                room['rooms_number'] = number; // number
                                room['rooms_address'] = address; //address
                                room['rooms_seats'] = seats; // seats
                                room['rooms_type'] = type; // type
                                room['rooms_furniture'] = furniture; //furniture
                                var duplicate = false;
                                for (var i = 0; i<results2.length; i++) {
                                    var current = results2[i];
                                    if (current['rooms_fullname']===room['rooms_fullname'] &&
                                        current['rooms_shortname']===room['rooms_shortname'] &&
                                        current['rooms_number']===room['rooms_number'] &&
                                        current['rooms_address']===room['rooms_address'] &&
                                        current['rooms_seats']===room['rooms_seats'] &&
                                        current['rooms_type']===room['rooms_type'] &&
                                        current['rooms_furniture']===room['rooms_furniture'] ) {
                                        duplicate = true;
                                    }
                                }
                                if (duplicate) {
                                    alert('This room has already been selected!');
                                } else {
                                    results2.push(room);
                                    var data2 = new Object();
                                    data2["render"] = "TABLE";
                                    data2["result"] = results2;
                                    generateTableRoom2(data2["result"]);
                                }

                            });
                        });
                    }
                }
            }}).fail(function (e) {
                spawnHttpErrorModal(e)
            });
        } catch (err) {
            spawnErrorModal("Query Error", err);
        }
    });

    function generateTableRoom(data) {
        var columns = [];

        Object.keys(data[0]).forEach(function (title) {
            var goodTitle = title;

            if (goodTitle === "rooms_fullname") {
                goodTitle = "Fullname";
            } else if (goodTitle === "rooms_shortname") {
                goodTitle = "Shortname";
            } else if (goodTitle === "rooms_number") {
                goodTitle = "Number";
            } else if (goodTitle === "rooms_address") {
                goodTitle = "Address";
            } else if (goodTitle === "rooms_seats") {
                goodTitle = "Seats";
            } else if (goodTitle === "rooms_type") {
                goodTitle = "Type";
            } else if (goodTitle === "rooms_furniture") {
                goodTitle = "Furniture";
            }
            columns.push({
                head: goodTitle,
                cl: "title",
                html: function (d) {
                    return d[title]
                }
            });
        });
        var container = d3.select("#renderRoom");
        container.html("");
        container.selectAll("*").remove();
        var table = container.append("table").style("margin", "auto");

        table.append("thead").append("tr")
            .selectAll("th")
            .data(columns).enter()
            .append("th")
            .attr("class", function (d) {
                return d["cl"]
            })
            .text(function (d) {
                return d["head"]
            });


        table.append("tbody")
            .selectAll("tr")
            .data(data).enter()
            .append("tr")
            .selectAll("td")
            .data(function (row, i) {
                return columns.map(function (c) {
                    // compute cell values for this specific row
                    var cell = {};
                    d3.keys(c).forEach(function (k) {
                        cell[k] = typeof c[k] == "function" ? c[k](row, i) : c[k];
                    });
                    return cell;
                });
            }).enter()
            .append("td")
            .html(function (d) {
                return d["html"]
            })
            .attr("class", function (d) {
                return d["cl"]
            });

        var i = 0;

        table.selectAll("tr").each(function(){
            var stringI = i.toString();
            $(this).attr("id", "row"+stringI);
            if (i === 0) {
                var button0 = $("<button type='submit' class='chooseAllRooms' >Select All</button>");
                $(this).append(button0);
            }
            if (i !== 0 ) {
                var buttonId = "buttonRoom" + stringI;
                var button = $("<button type='submit' class='chooseRoom' >Select</button>");
                button.attr("id", buttonId);
                $(this).append(button);

            }
            i = i + 1;
        });

    }

    function generateTableRoom2(data) {
        var columns = [];
        var empty = false;
        var first = data[0];
        if(first['Fullname']==='') {
            empty = true;
        }
        Object.keys(data[0]).forEach(function (title) {
            var goodTitle = title;
            if (goodTitle === "rooms_fullname") {
                goodTitle = "Fullname";
            } else if (goodTitle === "rooms_shortname") {
                goodTitle = "Shortname";
            } else if (goodTitle === "rooms_number") {
                goodTitle = "Number";
            } else if (goodTitle === "rooms_address") {
                goodTitle = "Address";
            } else if (goodTitle === "rooms_seats") {
                goodTitle = "Seats";
            } else if (goodTitle === "rooms_type") {
                goodTitle = "Type";
            } else if (goodTitle === "rooms_furniture") {
                goodTitle = "Furniture";
            }

            columns.push({
                head: goodTitle,
                cl: "title",
                html: function (d) {
                    return d[title]
                }
            });
        });
        var container = d3.select("#render6");
        container.html("");
        container.selectAll("*").remove();
        var table = container.append("table").style("margin", "auto");

        table.append("thead").append("tr")
            .selectAll("th")
            .data(columns).enter()
            .append("th")
            .attr("class", function (d) {
                return d["cl"]
            })
            .text(function (d) {
                return d["head"]
            });


        table.append("tbody")
            .selectAll("tr")
            .data(data).enter()
            .append("tr")
            .selectAll("td")
            .data(function (row, i) {
                return columns.map(function (c) {
                    // compute cell values for this specific row
                    var cell = {};
                    d3.keys(c).forEach(function (k) {
                        cell[k] = typeof c[k] == "function" ? c[k](row, i) : c[k];
                    });
                    return cell;
                });
            }).enter()
            .append("td")
            .html(function (d) {
                return d["html"]
            })
            .attr("class", function (d) {
                return d["cl"]
            });

        var i = 0;
        table.selectAll("tr").each(function(){
            var stringI = i.toString();
            $(this).attr("id", "srow"+stringI);
            if (i === 0) {
                var button0 = $("<button type='submit' class='deleteAllRooms' >Delete All</button>");
                $(this).append(button0);
            }
            if (i !== 0 && empty === false ) {
                var buttonId = "delete" + stringI;
                var button = $("<button type='submit' class='deleteRoom' >Delete</button>");
                button.attr("id", buttonId);
                $(this).append(button);

            }
            i = i + 1;
        });

        $(".deleteAllRooms").each(function() {

            $(this).click(function () {
                if (results2.length > 0) {
                    results2 = [];
                    var nothing = new Array();
                    var base = {"Fullname":"","Shortname":"","Number":'',"Address":"","Seats":"","Type":'',"Furniture":''};
                    nothing.push(base);
                    generateTableRoom2(nothing);
                } else {
                    alert("No rooms to delete!")
                }
            });
        });

        $(".deleteRoom").each(function() {

            $(this).click(function () {
                var $row = $(this).closest("tr");
                var $course = $row[0];
                var i = 0;
                $($course).find('td').each (function() {
                    if (i === 0 ) {
                        fullname = $(this)[0].__data__.html;

                    } else if (i === 1) {
                        shortname = $(this)[0].__data__.html;

                    } else if (i === 2) {
                        number = $(this)[0].__data__.html;

                    } else if (i === 3) {
                        address = $(this)[0].__data__.html;

                    } else if (i === 4) {
                        seats = $(this)[0].__data__.html;

                    } else if (i === 5) {
                        type = $(this)[0].__data__.html;

                    } else if (i === 6) {
                        furniture = $(this)[0].__data__.html;

                    }
                    i = i + 1;
                });


                var first = true;
                results2 = $.grep(results2,
                    function(e1,i) { if (e1["rooms_fullname"] === fullname
                        && e1["rooms_shortname"] === shortname
                        && e1["rooms_number"] === number
                        && first === true) {
                        first = false;
                        return true;
                    } else {
                        return false;
                    }
                    },
                    true);



                var data3 = new Object();
                data3["render"] = "TABLE";
                data3["result"] = results2;

                if (results2.length === 0) {
                    var nothing = new Array();
                    var base = {"Fullname":"","Shortname":"","Number":'',"Address":"","Seats":"","Type":'',"Furniture":''};
                    nothing.push(base);
                    generateTableRoom2(nothing);
                } else {
                    generateTableRoom2(data3["result"]);
                }

            });
        });
    }

    function generateTable(data) {
        var columns = [];
        var isCourse = true;
        var first = data[0];
        if(first['courses_dept']==='') {
            isCourse = false;
        }
        Object.keys(data[0]).forEach(function (title) {
            var goodTitle = title;

            if (goodTitle === "courses_dept") {
                goodTitle = "Department";
            } else if (goodTitle === "courses_id") {
                goodTitle = "ID";
            } else if (goodTitle === "courses_title") {
                goodTitle = "Title";
            } else if (goodTitle === "courses_instructor") {
                goodTitle = "Instructor";
                isCourse = false;
            } else if (goodTitle === "courses_sectionSize") {
                goodTitle = "SectionSize";
            } else if (goodTitle === "courses_fail") {
                goodTitle = "SectionFail";
            } else if (goodTitle === "courses_pass") {
                goodTitle = "SectionPass";
            } else if (goodTitle === "courses_avg") {
                goodTitle = "SectionAvg";
            } else if (goodTitle === "Average") {
                goodTitle = "CourseAvg";

            }
            columns.push({
                head: goodTitle,
                cl: "title",
                html: function (d) {
                    return d[title]
                }
            });
        });
        var container = d3.select("#render");
        container.html("");
        container.selectAll("*").remove();
        var table = container.append("table").style("margin", "auto");

        table.append("thead").append("tr")
            .selectAll("th")
            .data(columns).enter()
            .append("th")
            .attr("class", function (d) {
                return d["cl"]
            })
            .text(function (d) {
                return d["head"]
            });


        table.append("tbody")
            .selectAll("tr")
            .data(data).enter()
            .append("tr")
            .selectAll("td")
            .data(function (row, i) {
                return columns.map(function (c) {
                    // compute cell values for this specific row
                    var cell = {};
                    d3.keys(c).forEach(function (k) {
                        cell[k] = typeof c[k] == "function" ? c[k](row, i) : c[k];
                    });
                    return cell;
                });
            }).enter()
            .append("td")
            .html(function (d) {
                return d["html"]
            })
            .attr("class", function (d) {
                return d["cl"]
            });

        var i = 0;

        table.selectAll("tr").each(function(){
            var stringI = i.toString();
            $(this).attr("id", "row"+stringI);
            if (i === 0 && isCourse === true) {
                var button0 = $("<button type='submit' class='chooseAll' >Select All</button>");
                $(this).append(button0);
            }
            if (i !== 0 && isCourse === true) {
                var buttonId = "button" + stringI;
                var button = $("<button type='submit' class='chooseCourse' >Select</button>");
                var button2 = $("<button type='submit' class='getHelp' >Help</button>");
                button.attr("id", buttonId);
                $(this).append(button);
                $(this).append(button2);
            }
            i = i + 1;
        });

    }

    function generateTable2(data) {
        var columns = [];
        var empty = false;
        var first = data[0];
        if(first['courses_dept']==='') {
            empty = true;
        }
        Object.keys(data[0]).forEach(function (title) {
            var goodTitle = title;
            if (goodTitle === "courses_dept") {
                goodTitle = "Department";
            } else if (goodTitle === "courses_id") {
                goodTitle = "ID";
            } else if (goodTitle === "courses_title") {
                goodTitle = "Title";
            } else if (goodTitle === "courses_instructor") {
                goodTitle = "Instructor";
            } else if (goodTitle === "courses_sectionSize") {
                goodTitle = "CourseSize";
            } else if (goodTitle === "courses_fail") {
                goodTitle = "TotalFail";
            } else if (goodTitle === "courses_pass") {
                goodTitle = "TotalPass";
            } else if (goodTitle === "courses_avg") {
                goodTitle = "CourseAvg";
            } else if (goodTitle === "Average") {
                goodTitle = "CourseAvg";
            }
            columns.push({
                head: goodTitle,
                cl: "title",
                html: function (d) {
                    return d[title]
                }
            });
        });
        var container = d3.select("#render3");
        container.html("");
        container.selectAll("*").remove();
        var table = container.append("table").style("margin", "auto");

        table.append("thead").append("tr")
            .selectAll("th")
            .data(columns).enter()
            .append("th")
            .attr("class", function (d) {
                return d["cl"]
            })
            .text(function (d) {
                return d["head"]
            });


        table.append("tbody")
            .selectAll("tr")
            .data(data).enter()
            .append("tr")
            .selectAll("td")
            .data(function (row, i) {
                return columns.map(function (c) {
                    // compute cell values for this specific row
                    var cell = {};
                    d3.keys(c).forEach(function (k) {
                        cell[k] = typeof c[k] == "function" ? c[k](row, i) : c[k];
                    });
                    return cell;
                });
            }).enter()
            .append("td")
            .html(function (d) {
                return d["html"]
            })
            .attr("class", function (d) {
                return d["cl"]
            });

        var i = 0;
        table.selectAll("tr").each(function(){
            var stringI = i.toString();
            $(this).attr("id", "srow"+stringI);
            if (i === 0) {
                var button0 = $("<button type='submit' class='deleteAll' >Delete All</button>");
                $(this).append(button0);
            }
            if (i !== 0 && empty === false) {
                var buttonId = "deleteR" + stringI;
                var button = $("<button type='submit' class='deleteCourse' >Delete</button>");
                button.attr("id", buttonId);
                $(this).append(button);

            }
            i = i + 1;
        });

        $(".deleteAll").each(function() {
            $(this).click(function () {
                if ( results.length > 0) {
                    results = [];
                    var nothing = new Array();
                    var base = {"courses_dept":"","courses_id":"","courses_avg":'',"courses_instructor":"","courses_title":"","courses_pass":'',"courses_fail":'',"courses_sectionSize":''};
                    nothing.push(base);
                    generateTable2(nothing);
                } else {
                    alert("No courses to delete!")
                }

            });
        });

        $(".deleteCourse").each(function() {

            $(this).click(function () {
                var $row = $(this).closest("tr");
                var $course = $row[0];

                var i = 0;
                $($course).find('td').each (function() {
                    if (i === 0 ) {
                        dept = $(this)[0].__data__.html;
                    } else if (i === 1) {
                        id = $(this)[0].__data__.html;
                    } else if (i === 2) {
                        title = $(this)[0].__data__.html;
                    } else if (i === 3) {
                        courseSize = $(this)[0].__data__.html;
                    } else if (i === 4) {
                        fail = $(this)[0].__data__.html;
                    } else if (i === 5) {
                        pass = $(this)[0].__data__.html;
                    } else if (i === 6) {
                        average = $(this)[0].__data__.html;
                    }
                    i = i + 1;
                });

                var first = true;
                results = $.grep(results,
                    function(e1,i) { if (e1["courses_avg"] === average
                        && e1["courses_dept"] === dept
                        && e1["courses_id"] === id
                        && e1["courses_sectionSize"] === courseSize
                        && e1["courses_fail"] === fail
                        && e1["courses_pass"] === pass
                        && e1["courses_title"] === title
                        && first === true) {
                        first = false;
                        return true;
                    } else {
                        return false;
                    }; },
                    true);

                var data3 = new Object();
                data3["render"] = "TABLE";
                data3["result"] = results;

                if (results.length === 0) {
                    var nothing = new Array();
                    var base = {"courses_dept":"","courses_id":"","courses_avg":'',"courses_instructor":"","courses_title":"","courses_pass":'',"courses_fail":'',"courses_sectionSize":''};
                    nothing.push(base);
                    generateTable2(nothing);
                } else {
                    generateTable2(data3["result"]);
                }

            });
        });
    }

    $("#scheduleForm").submit(function (e) {
        e.preventDefault();
        var MWF;
        var TTH;
        var allCourses = results;
        var allRooms = results2;
        var timetable = new Timetable();
        timetable.setScope(8, 17);

        var qualityDenominator = 0;
        for (var i =0 ; i< allCourses.length; i ++) {
            var course = allCourses[i];
            var sections = course["SectionsRequired"];
            qualityDenominator = qualityDenominator + sections;
        }

        allRooms.forEach(function(room) {
            room['count'] = 15;
            room['MWF'] = 8;
            room['TTH'] = 8;
        });

        allCourses = allCourses.sort(function (a, b) {
            var tempA = a;
            var tempB = b;
            if (tempA["courses_sectionSize"] > tempB["courses_sectionSize"]) {
                return 1;
            }
            if (tempA["courses_sectionSize"] < tempB["courses_sectionSize"]) {
                return -1;
            }
            if (tempA["courses_sectionSize"] === tempB["courses_sectionSize"]) {
                if (tempA["SectionsRequired"] > tempB["SectionsRequired"]) {
                    return 1;
                }
                if (tempA["SectionsRequired"] > tempB["SectionsRequired"]) {
                    return -1;
                }
            }
            return 0;
        });
        var bestRoom = {};
        var pairedArray = new Array();
        for (var i =0 ; i< allCourses.length; i ++) {
            var course = allCourses[i];
            var sections = course["SectionsRequired"];
            var usedTimes = new Object();
            usedTimes['MWF'] = [];
            usedTimes['TTH'] = [];
            for (var k = 0; k < sections; k++) {
                var canUse = true;
                var canUse2 = true;
                var roomCourse = new Object();
                roomCourse['course'] = course;
                var courseSize = course["courses_sectionSize"];
                var min = 100000;
                for (var j = 0; j < allRooms.length; j++) {
                    var room = allRooms[j];
                    var size = room["rooms_seats"];
                    if (size > courseSize) {
                        var difference = size - courseSize;
                        if (room['TTH'] < room['MWF']) {
                            var usedTimesTTH = usedTimes['TTH'];
                            for (var l = 0; l < usedTimesTTH.length; l++) {
                                var usedTime = usedTimesTTH[l];
                                if (room['TTH']===usedTime) {
                                    canUse = false;
                                }
                                var nextTIme = room['TTH']+1.5;
                                if (nextTIme===usedTime || nextTIme>=16) {
                                    canUse2 = false;
                                }
                            }
                        } else {
                            var usedTimesMWF = usedTimes['MWF'];
                            for (var l = 0; l < usedTimesMWF.length; l++) {
                                var usedTime = usedTimesMWF[l];
                                if (room['MWF']===usedTime) {
                                    canUse = false;
                                }
                                var nextTIme = room['MWF']+1;
                                if (nextTIme===usedTime || nextTIme>=16) {
                                    canUse2 = false;
                                }
                            }
                        }
                        if (difference < min && room['count'] >0 && canUse) {
                            min = difference;
                            MWF = room['MWF'];
                            TTH = room['TTH'];
                            bestRoom = room;
                        } else if(difference < min && room['count'] >0 && canUse2) {
                            min = difference;
                            MWF = room['MWF'];
                            TTH = room['TTH'];
                            bestRoom = room;
                        }
                    }
                }
                if (bestRoom['rooms_fullname'] !== undefined) {
                    bestRoom['MWF'] = MWF;
                    bestRoom['TTH'] = TTH;
                    var temper = JSON.stringify(bestRoom);
                    roomCourse['room'] = JSON.parse(temper);
                    pairedArray.push(roomCourse);
                    for (var j = 0; j < allRooms.length; j++) {
                        var room = allRooms[j];
                        if (room === bestRoom) {
                            allRooms[j]['count'] = room['count'] - 1;
                            if (TTH < MWF && TTH < 16) {
                                var temp = room['TTH'] + 1.5;
                                usedTimes['TTH'].push(TTH);
                                allRooms[j]['TTH']= temp;
                            } else if (MWF < 16){
                                usedTimes['MWF'].push(MWF);
                                var temp = MWF + 1;
                                allRooms[j]['MWF'] = room['MWF']+ 1;
                            }
                            break;
                        }
                    }
                    bestRoom = {};
                }
            }
        }


        var usedRooms = new Array();
        for (var j = 0; j < pairedArray.length; j++) {
            var temp = pairedArray[j];
            var room = temp['room'];
            var course = temp['course'];
            var roomName = room['rooms_shortname'] + room['rooms_number'] + ' ' + 'MWF';
            var roomName2 = room['rooms_shortname'] + room['rooms_number'] + ' ' + 'TTH';
            var exists = false;
            for (var i = 0; i < usedRooms.length; i++) {
                var room = usedRooms[i];
                if (roomName === room) {
                    exists = true;
                }
            }
            if (exists === false) {
                usedRooms.push(roomName);
                usedRooms.push(roomName2);
            }
        }

        timetable.addLocations(usedRooms);
        for (var j = 0; j < pairedArray.length; j++) {
            var temp = pairedArray[j];
            var room = temp['room'];
            var course = temp['course'];
            var roomName = room['rooms_shortname'] + room['rooms_number'] +' ' + 'MWF';
            var roomName2 = room['rooms_shortname'] + room['rooms_number'] + ' ' +'TTH';
            var deptid = course['courses_dept'].toUpperCase() + course['courses_id'];
            var startTime = room['MWF'];

            var startTime2 = room['TTH'];

            if (startTime > startTime2) {
                var setTime = startTime2;
                if (Math.floor(setTime+0.5) === setTime) {
                    timetable.addEvent(deptid, roomName2,new Date(2015,7,17,setTime,00), new Date(2015,7,17,setTime+1,30));
                } else {
                    timetable.addEvent(deptid, roomName2,new Date(2015,7,17,setTime-0.5,30), new Date(2015,7,17,setTime+1.5,00));
                }
            } else {
                var setTime = startTime;
                timetable.addEvent(deptid, roomName,new Date(2015,7,17,setTime,00), new Date(2015,7,17,setTime+1,00));
            }
        }

        var qualityNumerator = pairedArray.length;
        if (qualityNumerator ===0 && qualityDenominator===0) {
            $(".content").attr('style', 'display:none');
            $(".content .value").html(0);
        } else {
            var quality = qualityNumerator/qualityDenominator;
            $(".content").removeAttr('style');
            $(".content .value").html(qualityNumerator.toString() +' ' + 'of' +' ' + qualityDenominator.toString()+ ' ' + 'sections');
        }

        allRooms.forEach(function(room) {
            delete room['count'];
            delete room['MWF'];
            delete room['TTH'];
        });

        if (pairedArray.length > 0) {
            var renderer = new Timetable.Renderer(timetable);
            renderer.draw('.timetable');
        } else if (allCourses.length === 0 && allRooms.length === 0) {
            var timetable = new Timetable();
            timetable.setScope(8, 17);
            var renderer = new Timetable.Renderer(timetable);
            renderer.draw('.timetable');
            alert('No courses or rooms selected!');
        } else if (allCourses.length === 0 && allRooms.length > 0) {
            var timetable = new Timetable();
            timetable.setScope(8, 17);
            var renderer = new Timetable.Renderer(timetable);
            renderer.draw('.timetable');
            alert('No courses selected!');
        } else if (allCourses.length > 0 && allRooms.length === 0) {
            var timetable = new Timetable();
            timetable.setScope(8, 17);
            var renderer = new Timetable.Renderer(timetable);
            renderer.draw('.timetable');
            alert('No rooms selected!');
        } else {
            var timetable = new Timetable();
            timetable.setScope(8, 17);
            var renderer = new Timetable.Renderer(timetable);
            renderer.draw('.timetable');
            alert('Cannot match selected courses to rooms!');
        }
    });

    function spawnHttpErrorModal(e) {
        $("#errorModal .modal-title").html(e.status);
        $("#errorModal .modal-body p").html(e.statusText + "</br>" + e.responseText);
        if ($('#errorModal').is(':hidden')) {
            $("#errorModal").modal('show')
        }
    }

    function spawnErrorModal(errorTitle, errorText) {
        $("#errorModal .modal-title").html(errorTitle);
        $("#errorModal .modal-body p").html(errorText);
        if ($('#errorModal').is(':hidden')) {
            $("#errorModal").modal('show')
        }
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    function getDistance(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);
        var dLon = deg2rad(lon2-lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        if (isNaN(R*c*1000)) {
            return 0;
        } else {
            return R*c*1000; // in metres
        }
    }
});