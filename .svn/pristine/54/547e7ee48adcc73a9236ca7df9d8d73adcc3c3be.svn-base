var xc_data, xc_rowHeaders, xc_colHeaders, xc_binder;
var xc_rowSeries; // 가로를 series로 사용하는지 여부
var xc_theChart;
var dialog_offset;

// 새로운 데이타를 선택하여 차트를 그리는 처음에 호출
function drawChart(data, rowHeaders, colHeaders, binder) {
    xc_data = data;
    xc_rowHeaders = rowHeaders;
    xc_colHeaders = colHeaders;
    xc_binder = binder;

    var switchDir = document.getElementById("switchDir"); // anchor
    var opts = document.getElementsByName('chartType'); // radios
    var chartType;
    if (rowHeaders.length > 1 && colHeaders.length > 1) {
        chartType = 1; // line
        opts[2].disabled = true; // pie비활성화
        switchDir.style.visibility = "visible"; // 행.열바꾸기 활성화
    } else { // 행 또는 열이 single인 경우에는 pie로 그림
        chartType = 3; // pie
        opts[2].disabled = false; // pie활성화
        switchDir.style.visibility = "hidden"; // 행.열바꾸기 감추기
    }
    // 기본설정으로 초기화(UI 동기화)
    xc_rowSeries = true;
    opts[chartType-1].checked = true; // index

    doDrawChart(chartType);
}

// drawChart()이후 사용자의 변경에 의해 새로운 옵션으로 호출
function redrawChart(switchDirection) {
    var chartType;
    var opts = document.getElementsByName('chartType');
    for (var i = 0; i < opts.length; i++) {
        if (opts[i].checked) {
            chartType = window.parseInt(opts[i].value, 10);
            break;
        }
    }
    var switchDir = document.getElementById("switchDir"); // anchor
    if (chartType == 3) { // pie
        switchDir.style.visibility = "hidden"; // 행.열바꾸기 감추기
    } else {
        switchDir.style.visibility = "visible"; // 행.열바꾸기 활성화
    }
    // 차트종류변경호출시에는 이전의 가로.세로설정이 사용됨
    if (switchDirection) xc_rowSeries = !xc_rowSeries;
    xc_theChart.clear(); xc_theChart.destroy();

    doDrawChart(chartType);
}

function doDrawChart(chartType) { // 1:line, 2:bar, 3-pie
    var myPosition;
    if (dialog_offset) {
        myPosition = dialog_offset;
    } else {
        myPosition = {
            my: "left top",
            at: "left+0 top+0",
            of: xc_binder.$container
        };
    }

    $("#chartContainer").dialog({
        title: "선택된 데이타로 차트 그리기  (여기를 끌어서 이동 가능)",
        modal: true,
        resizable: false,
        draggable: true,
        dialogClass: "no-close-dialog",
        width: 470,
        position: myPosition,
        dragStop: function(e, ui) {
            dialog_offset = [ui.offset.left, ui.offset.top];
        },
        buttons: {
            "Close": function() {
                xc_theChart.clear(); xc_theChart.destroy();
                xc_binder.sheet.invalidateLayout();
                $(this).dialog("close");
                xc_binder.sheet.repaint();
            }
        }
    });

    var canvas = document.getElementById("chartCanvas");
    // Canvas 높이: IE && Pie인 경우 차트가 왜곡되어 지정을 생략함
    //  -> 어차피 ChartJS가 (너비에 기반하여)높이를 재지정하므로 그냥 위임함
    var myChart = new Chart(canvas.getContext("2d"));
    if (chartType == 1) {
        myChart = myChart.Line(createLineBarData(true), lineOptions);
    } else if (chartType == 2) {
        myChart = myChart.Bar(createLineBarData(false), barOptions);
    } else {
        myChart = myChart.Doughnut(createPieData(), pieOptions);
    }
    xc_theChart = myChart;

    document.getElementById("legendPanel").innerHTML = myChart.generateLegend();
}

function createLineBarData(isLineType) {
    var lineData = {};

    // 아래는 기본방향기준, 가로/세로 변경시에는 row/col을 switching
    var series;
    if (xc_rowSeries) { // 사용자선택으로 구성한 기본 방향
        lineData.labels = xc_colHeaders; // X축(category): array
        series = new Array(xc_rowHeaders.length);
    } else { // category와 series를 switching
        lineData.labels = xc_rowHeaders;
        series = new Array(xc_colHeaders.length);
    }

    for (var i = 0; i < series.length; i++) {
        var serial = {}; // one series
        if (xc_rowSeries) {
            serial.label = xc_rowHeaders[i];
            serial.data = xc_data[i];
        } else {
            serial.label = xc_colHeaders[i];
            serial.data = new Array(xc_data.length);
            for (var j = 0; j < xc_data.length; j++) {
                serial.data[j] = xc_data[j][i];
            }
        }
        styleLineBarChart(isLineType, serial, i);

        series[i] = serial;
    }
    lineData.datasets = series;

    return lineData;
}

function createPieData() {
    var row; // 데이타배열 (단일 시리즈개념)
    var category; // 라벨배열
    if (xc_data.length == 1) { // 가로 단일라인 선택
        row = xc_data[0];
        category = xc_colHeaders;
    } else { // 세로 단일라인(가정)
        row = new Array(xc_data.length);
        for (var i = 0; i < row.length; i++) {
            row[i] = xc_data[i][0];
        }
        category = xc_rowHeaders;
    }

    var pieData = new Array(row.length);
    for (i = 0; i < pieData.length; i++) {
        var col = {};
        col.value = row[i];
        col.label = category[i];
        var color;
        if (i < rgbPalette.length) {
            color = rgbPalette[i];
        } else {
            color = getRandomInt(5,250) + "," + getRandomInt(5,250)
                                        + "," + getRandomInt(5,250);
        }
        col.color = "rgb(" + color + ")";
        col.highlight = "rgba(" + color + ",0.6)";

        pieData[i] = col;
    }

    return pieData;
}

Chart.defaults.Line.legendTemplate =
    "<table><% for(var i = 0; i < datasets.length; i++){%><tr style=\"height:11px;\">" +
    "<td style=\"width:30px;padding:0;vertical-align:middle;\"><div style=\"height:9px;background-color:<%=datasets[i].strokeColor%>\"></div></td>" +
    "<td style=\"width:80px;padding:0;\"><div style=\"font-size:10px;line-height:11px;height:11px;overflow:hidden;\">" +
    "<%if(datasets[i].label){%><%=datasets[i].label%><%}%></div></td></tr><%}%></table>";

var lineOptions = {
    bezierCurve: false,
    pointHitDetectionRadius: 10,
    datasetStrokeWidth: 1
};

Chart.defaults.Bar.legendTemplate =
    "<table><% for(var i = 0; i < datasets.length; i++){%><tr style=\"height:11px;\">" +
    "<td style=\"width:30px;padding:0;vertical-align:middle;\"><div style=\"height:9px;background-color:<%=datasets[i].fillColor%>\"></div></td>" +
    "<td style=\"width:80px;padding:0;\"><div style=\"font-size:10px;line-height:11px;height:11px;overflow:hidden;\">" +
    "<%if(datasets[i].label){%><%=datasets[i].label%><%}%></div></td></tr><%}%></table>";

var barOptions = {
    barShowStroke: false
};

Chart.defaults.Doughnut.legendTemplate =
    "<table><% for(var i = 0; i < segments.length; i++){%><tr style=\"height:11px;\">" +
    "<td style=\"width:30px;padding:0;vertical-align:middle;\"><div style=\"height:9px;background-color:<%=segments[i].fillColor%>\"></div></td>" +
    "<td style=\"width:80px;padding:0;\"><div style=\"font-size:10px;line-height:11px;height:11px;overflow:hidden;\">" +
    "<%if(segments[i].label){%><%=segments[i].label%><%}%></div></td></tr><%}%></table>";

var pieOptions = {
    percentageInnerCutout: 40
};

// rgba(IE9이상)상수를 일정갯수(8)정의하여 상수값으로 활용
var rgbPalette = [ // blue,purple,lime,orange,teal,fuchsia,olive,silver
    "0,0,255", "128,0,128", "0,255,0", "255,165,0",
    "0,128,128", "255,0,255", "128,128,0", "192,192,192"
];
function styleLineBarChart(isLineType, serial, index) {
    var baseColor;
    if (index < rgbPalette.length) {
        baseColor = rgbPalette[index];
    } else {
        //baseColor = getRandomInt(5,250) + "," + getRandomInt(5,250)
        //                                + "," + getRandomInt(5,250);

        //dlawoejr 2016.08.29 ADD
        baseColor = 0 + "," + 0
            + "," + 255;
    }

    if (isLineType) {
        serial.fillColor = "rgba(" + baseColor + ",0.2)";
        var theColor = "rgba(" + baseColor + ",1.0)";
        serial.strokeColor = theColor;
        serial.pointColor = theColor;
        serial.pointStrokeColor = "#fff"; // 포인트가 작게 느껴지게함
        serial.pointHighlightFill = "#fff";
        serial.pointHighlightStroke = theColor;
    } else {
        serial.fillColor = "rgba(" + baseColor + ",0.5)";
        //serial.strokeColor = "rgba(" + baseColor + ",0.8)";
        serial.highlightFill = "rgba(" + baseColor + ",0.75)";
        serial.highlightStroke = "rgba(" + baseColor + ",1.0)";
    }
}

/*
function getRandomInt(min, max) {
    return (Math.floor(Math.random()*(max-min+1)) + min);
}
*/