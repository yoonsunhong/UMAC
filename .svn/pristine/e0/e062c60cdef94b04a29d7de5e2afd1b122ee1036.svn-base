    var selBinder, selRowIdx, selColIdx; // rightClick된 대상이 설정됨

    function handleFreezing(command) {
        if (command == "freeze") {
            selBinder.freezeFrameAt(selRowIdx, selColIdx);
        } else if (command == "unFreeze") {
            selBinder.freezeFrameAt(0, 0);
        }
    }

    var replPattern = /,/g; // 차트데이타 replace(,)
    function handleChart() {
        var sheet = selBinder.sheet;
        var range = sheet.getSelections()[0];
        // 선택시작셀 인덱스:row,col  끝셀인덱스:row+rowCount-1,col+colCount-1
        if (range.row < selBinder.frozenRows || range.col < selBinder.frozenCols) {
            alert("헤더를 제외한 순수 데이타영역만 선택하세요!");
            return;
        }
        if (range.rowCount == 1 && range.colCount == 1) {
            alert("두개 이상의 데이타셀을 선택하세요!");
            return;
        }

        var data = new Array(range.rowCount); // all string type
        for (var i = 0; i < data.length; i++) {
            data[i] = new Array(range.colCount);
            for (var j = 0; j < range.colCount; j++) {
                // 링크(case)때문에 value대신 text사용
                // 데이타: null, undefined(pie에서는 오류), "숫자"는 허용됨
                //        "숫자"에서 ','는 허용되지 않음 -> 일괄삭제
                var t = sheet.getText(range.row+i, range.col+j);
                if (t && t.indexOf(",", 0) != -1) {
                    t = t.replace(replPattern, ""); // comma 제거
                }
                data[i][j] = t;
            }
        }

        // 헤더값획득: 기본틀고정셀이 데이타영역의 시작이므로 그 이전이 최종헤더셀임
        //           값헤더가 있는 경우 그 위치한 행 또는 열은 -- 함
        // null/undefined: 오류없이 텍스트로 출력됨(현재 그러한 데이타는 없음)
        var rowHeaderColumn = selBinder.frozenCols - 1;
        if (selBinder.valueHDPos == 0) rowHeaderColumn--; // row에 있음
        var colHeaderRow = selBinder.frozenRows - 1;
        if (selBinder.valueHDPos == 1) colHeaderRow--;    // col에 있음

        var rowHeaders = new Array(range.rowCount);
        for (i = 0; i < rowHeaders.length; i++) {
            rowHeaders[i] = sheet.getValue(range.row+i, rowHeaderColumn);
        }

        var colHeaders = new Array(range.colCount);
        for (i = 0; i < colHeaders.length; i++) {
            colHeaders[i] = sheet.getValue(colHeaderRow, range.col+i);
        }

        drawChart(data, rowHeaders, colHeaders, selBinder);
    }

    var colHeaderContextOptions = {
        callback: function(key, options) {
            if (key == "hide") {
                selBinder.hide(selColIdx, true);
            } else if (key == "show") {
                selBinder.showHiddens(true);
            } else if (key == "showPartial") {
                selBinder.showHiddensPartial(true);
            }
        },
        items: {
            "hide": {name: "현재열 숨기기"},
            "showPartial": {name: "영역내 숨김열 보이기"},
            "show": {name: "모든 숨김열 보이기"}
        },
        autoHide: true
    };

    var rowHeaderContextOptions = {
        callback: function(key, options) {
            if (key == "hide") {
                selBinder.hide(selRowIdx, false);
            } else if (key == "show") {
                selBinder.showHiddens(false);
            } else if (key == "showPartial") {
                selBinder.showHiddensPartial(false);
            }
        },
        items: {
            "hide":  {name: "현재행 숨기기"},
            "showPartial": {name: "영역내 숨김행 보이기"},
            "show": {name: "모든 숨김행 보이기"}
        },
        autoHide: true
    };

    var cellContextOptions = {
        callback: function(key, options) {
            if (key == "freeze") {
                handleFreezing(key);
            } else {
                if (key == "unFreeze") {
                    handleFreezing(key);
                } else if (key == "rowHdView") {
                    rowHdViewClicked(selBinder);
                } else if (key == "colHdView") {
                    colHdViewClicked(selBinder);
                } else if (key.indexOf("zoom", 0) == 0) {
                    zoomClicked(null, selBinder, key);
                } else if (key == "pasteExcel") {
                    aiXtabLoader.copyToClipboard(selBinder);
                } else if (key == "saveCSV") {
                    //aiXtabLoader.saveToCSV(selBinder);
                    ExcelConvert();
                } else if (key == "chart") {
                    handleChart();
                } else if (key == "print") {
                    PDFPrint();
                }
            }
        },
        items: {
            "freeze":  {name: "현재셀에 틀고정"},
            "unFreeze":  {name: "틀고정 취소"},
            "sep1": "------",
            "rowHdView":  {name: ""},
            "colHdView":  {name: ""},
            "sep2": "------",
            "zoomP":  {name: "확대(+10%)"},
            "zoomM":  {name: "축소(-10%)"},
            "zoom":  {name: "원래 크기로"},
            "sep3": "------",
            "saveCSV":  {name: "엑셀화일로 저장"},
            "pasteExcel": {name: "엑셀로 붙여넣기"},
            "sep4": "------",
            "chart":  {name: "차트 그리기", disabled: function(){return (window.ie78);}},
            "sep5": "------",
            "print":  {name: "인쇄"}
        },
        autoHide: true
    };

    function addXTabContextMenu(containerID) {
        $.contextMenu({
            selector: "#" + containerID,
            className: containerID + "-context-menu",
            build: function($trigger, e) { // 우클릭시마다 동적으로 호출됨
                //$trigger: element jq obj, e: original contextmenu event
                var offset = $trigger.offset();
                var x = e.pageX - offset.left;
                var y = e.pageY - offset.top;

                selBinder = aiXtabLoader.getBinderFromID(containerID);
                var target = selBinder.sheet.hitTest(x, y);
                if (!target) return false; // not display

                if (!window.ie78) {
                    selRowIdx = target.row;
                    selColIdx = target.col;
                }
                // IE8의 경우 위의 hitTest에서 해당 row/col을 일관성있게 얻지 못함(사용불가)
                // 따라서 셀클릭시 해당인덱스를 selRowIdx/selColIdx에 선행설정함
                // (클릭셀과 우클릭셀이 다른 경우 의도치않게 클릭셀이 사용될 수도 있음)
                // (아래는 최초에 바로 우클릭이 선행하는 경우로 지원이 곤란함)
                if (selRowIdx === undefined  || selColIdx === undefined) return false;

                if (target.rowViewportIndex == -1) { // column header
                    if (target.colViewportIndex == -1) return false; // 헤더머리
                    return colHeaderContextOptions;
                } else if (target.colViewportIndex == -1) { // row header
                    return rowHeaderContextOptions;
                } else { //  data cell
                    var rowHeaderVisible = selBinder.sheet.getRowHeaderVisible();
                    var colHeaderVisible = selBinder.sheet.getColumnHeaderVisible();
                    cellContextOptions.items.rowHdView.name = (rowHeaderVisible)? "행헤더 숨기기" : "행헤더 보이기";
                    cellContextOptions.items.colHdView.name = (colHeaderVisible)? "열헤더 숨기기" : "열헤더 보이기";

                    return cellContextOptions;
                }
            }
        });
    }

// 이하는 메뉴바의 사용자액션처리
    function zoomClicked(mode, binder, command) { // context메뉴와 사용자클릭을 모두 처리
        var zoomed; // binder에서 실제로 줌처리여부(else alert)
        var sizeEle = document.getElementById("vSize");
        if (binder) { // context메뉴
            zoomed = binder.zoom(command);
        } else { // // (현재는)메뉴바에서 사용자가 클릭한 경우
            var rate = parseInt(sizeEle.value, 10);
            if (mode == 0) { // 배율선택
            } else if (mode == 1) { // 축소
                rate -= 10;
            } else if (mode == 2) { // 확대
                rate += 10;
            }

            binder = aiXtabLoader.getBinder(0); // 하나만 가정 (id사용전환가능)
            zoomed = binder.zoom(null, rate);
        }

        if (zoomed && sizeEle) { // select element의 크기화 동기화
            var zf = binder.zoomFactor + ""; // string으로 전환
            var opts = sizeEle.options;
            for (var i = 0; i < opts.length; i++) {
                if (opts[i].value === zf) {
                    opts[i].selected = true;
                    break;
                }
            }
        }
    }

    function syncHDViewImage(config) {
        if (document.getElementById('menubar') == null) {
            return; // 메뉴바생략 -> 아래코드 진입불가
        }

        var hdVisible = true;
        if (config.hasOwnProperty("rowHeaderVisible")) {
            hdVisible = config["rowHeaderVisible"];
        }
        if (!hdVisible) { // 숨기기 이미지가 기본 로딩됨 -> 보이기 이미지로 전환
            document.getElementById('rowHD').src = window.installPath + "common/images/KO/rowHdShow.png";
        }

        hdVisible = true;
        if (config.hasOwnProperty("columnHeaderVisible")) {
            hdVisible = config["columnHeaderVisible"];
        }
        if (!hdVisible) {
            document.getElementById('colHD').src = window.installPath + "common/images/KO/colHdShow.png";
        }
    }

    function rowHdViewClicked(binder) { // context메뉴와 사용자클릭을 모두 처리
        if (!binder) { // (현재는)메뉴바에서 사용자가 클릭한 경우
            binder = aiXtabLoader.getBinder(0); // 하나만 가정 (id사용전환가능)
        }
        var visible = binder.sheet.getRowHeaderVisible();
        var imgEle = document.getElementById('rowHD');
        if (imgEle) {
            var img = (visible)? "rowHdShow.png" : "rowHdHide.png";
            imgEle.src = window.installPath + "common/images/KO/" + img;
        }
        binder.sheet.setRowHeaderVisible(!visible);
    }

    function colHdViewClicked(binder) {
        if (!binder) { // (현재는)메뉴바에서 사용자가 클릭한 경우
            binder = aiXtabLoader.getBinder(0); // 하나만 가정 (id사용전환가능)
        }
        var visible = binder.sheet.getColumnHeaderVisible();
        var imgEle = document.getElementById('colHD');
        if (imgEle) {
            var img = (visible)? "colHdShow.png" : "colHdHide.png";
            imgEle.src = window.installPath + "common/images/KO/" + img;
        }
        binder.sheet.setColumnHeaderVisible(!visible);
    }