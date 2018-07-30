
    function XtabBinder(containerID) {
        this.containerID = containerID;
        this.$container = $("#"+containerID);
        this.spread = null;
        this.sheet = null;
        this.stylesArr = null;

        this.useFullWidth = false;
        
        this.records = null;
        this.currRow = 0;

        this.rows;
        this.cols;
        this.frozenRows;
        this.frozenCols;
        this.valueHDPos = -1; // 0:row, 1:col

        this.filterOpt = null;

        this.zoomFactor = 100;
        this.hiddenCols = [];
        this.hiddenRows = [];
    }

    XtabBinder.prototype = {
        defBorder: new $.wijmo.wijspread.LineBorder("black", $.wijmo.wijspread.LineStyle.thin),
        hiddenBorder: new $.wijmo.wijspread.LineBorder("black", $.wijmo.wijspread.LineStyle.double),

        sortRange: function(asc) {
            var selectedRanges = this.sheet.getSelections().toArray(); // always 0 size
            var stRow = selectedRanges[0].row;
            var stCol = selectedRanges[0].col;
            var rows = selectedRanges[0].rowCount;
            var cols = selectedRanges[0].colCount;

            //sortRange(row, column, rowCount, columnCount, byRows, sortInfo)
            this.sheet.sortRange(stRow, stCol, rows, cols, true, [{index:selColIdx, ascending:asc}]);
        },

        sortColumn: function(asc) {
            //this.sheet.sortRange(-1, selColIdx, -1, 1, true, [{index:selColIdx, ascending:asc}]);
            this.sheet.sortRange(this.frozenRows, selColIdx, this.rows-this.frozenRows, 1, true, [{index:selColIdx, ascending:asc}]);
        },

        freezeFrameAt: function(rowIdx, colIdx) {
            this.sheet.setFrozenCount(rowIdx, colIdx);
        },

        hide: function(index, isColumn) {
            if (isColumn) {
                this.hiddenCols.push(index);
                this.sheet.setColumnVisible(index, false);
                this.sheet.getCell(0, index, $.wijmo.wijspread.SheetArea.colHeader).borderRight(this.hiddenBorder);
            } else {
                this.hiddenRows.push(index);
                this.sheet.setRowVisible(index, false);
                this.sheet.getCell(index, 0, $.wijmo.wijspread.SheetArea.rowHeader).borderTop(this.hiddenBorder);
            }
        },

        showHiddensPartial: function(isColumn) {
            var selectedRanges = this.sheet.getSelections().toArray(); // always 0 size
            var stRow = selectedRanges[0].row;
            var stCol = selectedRanges[0].col;
            var rows = selectedRanges[0].rowCount;
            var cols = selectedRanges[0].colCount;
//            console.log(stRow + "," + stCol + "," + rows + "," + cols);
// 첫 col을 예외처리
// 머리부터 드래그시 stCol:-1 cols:columnCount
            var i, end;
            this.spread.isPaintSuspended(true);
            if (isColumn) {
                end = stCol + cols - 1;
                for (i = 0; i < this.hiddenCols.length; i++) {
                    if (this.hiddenCols[i] >= stCol && this.hiddenCols[i] <= end) {
                        this.sheet.getCell(0, this.hiddenCols[i], $.wijmo.wijspread.SheetArea.colHeader).borderRight(null);
                        this.sheet.setColumnVisible(this.hiddenCols[i], true);
                        this.hiddenCols.splice(i, 1); // remove i'th && resize
                        i--;
                    }
                }
            } else {
                end = stRow + rows - 1;
                for (i = 0; i < this.hiddenRows.length; i++) {
                    if (this.hiddenRows[i] >= stRow && this.hiddenRows[i] <= end) {
                        this.sheet.getCell(this.hiddenRows[i], 0, $.wijmo.wijspread.SheetArea.rowHeader).borderTop(null);
                        this.sheet.setRowVisible(this.hiddenRows[i], true);
                        this.hiddenRows.splice(i, 1); // remove i'th && resize
                        i--;
                    }
                }
            }
            this.spread.isPaintSuspended(false);
            this.spread.repaint();
        },

        showHiddens: function(isColumn) {
            var i;
            this.spread.isPaintSuspended(true);
            if (isColumn) {
                for (i = 0; i < this.hiddenCols.length; i++) {
                    this.sheet.getCell(0, this.hiddenCols[i], $.wijmo.wijspread.SheetArea.colHeader).borderRight(null);
                    this.sheet.setColumnVisible(this.hiddenCols[i], true);
                }
                this.hiddenCols.length = 0;
            } else {
                for (i = 0; i < this.hiddenRows.length; i++) {
                    this.sheet.getCell(this.hiddenRows[i], 0, $.wijmo.wijspread.SheetArea.rowHeader).borderTop(null);
                    this.sheet.setRowVisible(this.hiddenRows[i], true);
                }
                this.hiddenRows.length = 0;
            }
            this.spread.isPaintSuspended(false);
            this.spread.repaint();
        },

        zoom: function(cmd, rate) {
            if (rate) {
                if (rate > 150) {
                    alert("확대가능한 최대크기입니다.");
                    return false;
                } else if (rate < 50) {
                    alert("축소가능한 최소크기입니다.");
                    return false;
                }
                this.zoomFactor = rate;
            } else {
                if (cmd == "zoomP") {
                    if (this.zoomFactor >= 150) {
                        alert("확대가능한 최대크기입니다.");
                        return false;
                    }
                    this.zoomFactor += 10;
                } else if (cmd == "zoomM") {
                    if (this.zoomFactor <= 50) {
                        alert("축소가능한 최소크기입니다.");
                        return false;
                    }
                    this.zoomFactor -= 10;
                } else { // 본래크기
                    this.zoomFactor = 100;
                }
            }

            this.sheet.zoom(this.zoomFactor/100);
            return true;
        },

        resize: function() {
            if (this.useFullWidth === true) {
                // parent().parent(): div aip1 ele, -9: 좌우마진6+스크롤(서버참조)
                this.$container.parent().parent().css("width", $(window).width());
                this.$container.css("width", $(window).width()-9);
            }

            this.$container.css("height", $(window).height()-window.staticHeight);
        },

        bind: function(meta, records, config, index) {
            "use strict";

            if (window.useFullWidth) this.useFullWidth = true; // resize에서 사용됨
            this.resize(); // 아래 초기화코드이전에 호출되어야 함(특히 IE78)

            this.$container.wijspread();
            if (window.ie78) { //run for ie7/8
                try {
                    var control = new ActiveXObject('AgControl.AgControl');
                    if (!control.IsVersionSupported("4.0")) { // 4.0미만 버전
                        alert("Silverlight 프로그램의 업그레이드가 필요합니다.");
                    }
                } catch (e) {
                    alert("화면의 설치하기를 클릭하여 Silverlight 프로그램을 설치하세요.\n" +
                          "설치후 새로고침을 하시면(F5) 페이지가 정상적으로 표시됩니다.");
                    return;
                }

                var sspread = this.$container.wijspread("spread");
                sspread.bind("SpreadsheetObjectLoaded", function () {
                    window.aiXtabLoader.getBinder(index).init(meta, records, config, index);
                });
            } else {
                this.init(meta, records, config, index);
            }
        },

        init: function(meta, records, config, index) {
            "use strict";

            this.records = records;
            this.rows = meta.rows;
            this.cols = meta.cols;
            this.frozenRows = meta.frozenRows;
            this.frozenCols = meta.frozenCols;
            if ("valueHDPos" in meta) {
                this.valueHDPos = meta.valueHDPos;
            }

            this.parseCellStyles(meta.cellStyles);
            if (window.ie78) {
                this.spread = this.$container.wijspread("spread", 1);
                this.sheet = this.spread.getActiveSheet();
            } else {
                this.spread = this.$container.wijspread("spread", 0);
                this.sheet = new $.wijmo.wijspread.Sheet();
                this.spread.isPaintSuspended(true); // batch painting
            }

            this.spread.canUserEditFormula(false);
            this.spread.tabStripVisible(false);

            this.spread.scrollbarMaxAlign(true); // def false
            this.spread.scrollbarShowMax(false); // def true

            if (!window.ie78) this.spread.useWijmoTheme = true;

            this.sheet.setRowCount(meta.rows);
            this.sheet.setColumnCount(meta.cols);
            for (var k = 0, nn = meta.cols; k < nn; k++) {
                this.sheet.setColumnWidth(k, meta.colWidths[k]); // pixel
            }

            this.sheet.setIsProtected(true); // lock cells
            //this.sheet.setGridlineOptions({showVerticalGridline: false, showHorizontalGridline: false});
            this.sheet.setGridlineOptions({color: "#78866B"});
            this.sheet.frozenlineColor("#ff6666");
            this.sheet.setFrozenCount(meta.frozenRows, meta.frozenCols);
            this.sheet.selectionBorderColor("#006c87");
            //this.sheet.selectionBackColor("rgba(215, 44, 44, 0.15)");

            if ("filterOpt" in meta) { // ie78은 서버에서 선행적으로 skip함
                this.filterOpt = meta.filterOpt;    // 따라서 ie78분기처리는 생략
                // 일단 모든 행필드 대응 column을 필터링대상으로 설정 -> 특정시점에는 설정필드만 작동케함
                var range = new $.wijmo.wijspread.Range(-1,0,-1,this.filterOpt.rowFields);
                var filter = new $.wijmo.wijspread.HideRowFilter(range);
                filter.setShowFilterButton(false);
                this.sheet.rowFilter(filter);
            }

// window.CSVString = spread.getSheet(0).getCsv(0, 0, rows, coks, "\r", ",");
 //Copy Paste Action
        /*var fromRange = new $.wijmo.wijspread.Range(0, 0, 3, 2);
        var toRanges = [new $.wijmo.wijspread.Range(4, 0, 3, 2)];
        var clipboardCopyPasteAction = new $.wijmo.wijspread.UndoRedo.ClipboardPasteUndoAction(this.sheet, this.sheet, this.sheet,
                                                { fromRange: fromRange, pastedRanges: toRanges, isCutting: false, clipboardText: "" },
                                                        $.wijmo.wijspread.ClipboardPasteOptions.Values);
        clipboardCopyPasteAction.execute(this.sheet);*/
// clipboard paste는 불가능 (사용자에게 메세지로 대체)

            if (config) this.configComponentUI(config);

            window.setTimeout(render, 0, this);
        },

        configComponentUI: function(setting) {
            if (setting.hasOwnProperty("rowHeaderVisible")) {
                this.sheet.setRowHeaderVisible(setting["rowHeaderVisible"]);
            }
            if (setting.hasOwnProperty("columnHeaderVisible")) {
                this.sheet.setColumnHeaderVisible(setting["columnHeaderVisible"]);
            }

            if (setting.hasOwnProperty("selectionBorderColor")) {
                this.sheet.selectionBorderColor(setting["selectionBorderColor"]);
            }
            // 마우스 드래그셀들에 적용(첫 클릭셀에는 적용되지 않아 보기가 흉함 -> 보류)
            /*if (setting.hasOwnProperty("selectionBackColor")) {
                this.sheet.selectionBackColor(setting["selectionBackColor"]);
            }*/

            if (setting.hasOwnProperty("gridLineColor")) { // 테두리가 없는(empty유형)셀에만 적용됨
                this.sheet.setGridlineOptions({color: setting["gridLineColor"]});
            }

            /*if (setting.hasOwnProperty("frozenLineCell")) {
                this.sheet.setFrozenCount(setting["frozenLineCell"][0],setting["frozenLineCell"][1]);
            }*/
            if (setting.hasOwnProperty("frozenLineColor")) {
                this.sheet.frozenlineColor(setting["frozenLineColor"]);
            }
        },

        parseCellStyles: function(cellStyles) {
            "use strict";

            var bdNames = ["borderTop", "borderRight", "borderBottom", "borderLeft"];

            // {ft: "itatlic bold 10pt '굴림'", fc: "rgb(0, 0, 0)", aln: [ha,va], pd: [l,r]
            //  bc: "rgb(0, 0, 0)", bdr[t,r,b,l]} // border=[type,wd,'rgb(0, 0, 0)']
            this.stylesArr = new Array(cellStyles.length);
            for (var i = 1; i < cellStyles.length; i++) {
                var cs = cellStyles[i];

                if (!cs.hasOwnProperty("ft")) continue;

                var style = new $.wijmo.wijspread.Style();

                style.font = cs.ft; // css font property
                if (cs.hasOwnProperty("fc")) {
                    style.foreColor = cs.fc;
                }

                /*if (cs.hasOwnProperty("df")) { // displayFormat
                    style.formatter = cs.df;
                }*/

                switch (cs.aln[0]) {
                    // 0 - left, 1 - center, 2 - right, 3 - justify(양쪽정렬), 4 - Distribute(균등분할 or 배분정렬)
                    case 1: style.hAlign = $.wijmo.wijspread.HorizontalAlign.center; break;
                    case 2: style.hAlign = $.wijmo.wijspread.HorizontalAlign.right; break;
                }
                switch (cs.aln[1]) {
                    // 0 - top, 1 - middle, 2 - bottom
                    case 1: style.vAlign = $.wijmo.wijspread.VerticalAlign.center; break;
                    case 2: style.vAlign = $.wijmo.wijspread.VerticalAlign.bottom; break;
                }

                //  bc: "rgb(0, 0, 0)", bdr[t,r,b,l]}
                if (cs.hasOwnProperty("bc")) {
                    style.backColor = cs.bc; // rgb(0, 0, 0)
                }

                for (var j = 0; j < bdNames.length; j++) {
                    var bd = cs.bdr[j]; // top/right.. [type,wd,'rgb(0, 0, 0)']
                    if (bd.length == 0) { // solid && wd=1.0(0.0) && black
                        style[bdNames[j]] = this.defBorder;
                    } else {
                        var color = (bd[2].length == 0)? "black" : bd[2];
                        //type 0 - None, 1 - Solid, 2 - Dash, 3 - Dot, 4 - DashDot, 5 - DashDotDot, 8 - DoubleSlim
                        //wd   0 - (Dot, DashDot, DashDotDot, DoubleSlim), Solid:0-4
                        switch (bd[0]) {
                            case 1 :
                                if (bd[1] <= 1.0) { // 0.0, 1.0
                                    style[bdNames[j]] = new $.wijmo.wijspread.LineBorder(color, $.wijmo.wijspread.LineStyle.thin);
                                } else if (bd[1] <= 3.0) {
                                    style[bdNames[j]] = new $.wijmo.wijspread.LineBorder(color, $.wijmo.wijspread.LineStyle.medium);
                                } else {
                                    style[bdNames[j]] = new $.wijmo.wijspread.LineBorder(color, $.wijmo.wijspread.LineStyle.thick);
                                }
                                break;
                            case 2 :
                                style[bdNames[j]] = new $.wijmo.wijspread.LineBorder(color, $.wijmo.wijspread.LineStyle.dashed);
                                break;
                            case 3 :
                                style[bdNames[j]] = new $.wijmo.wijspread.LineBorder(color, $.wijmo.wijspread.LineStyle.dotted);
                                break;
                            case 4 :
                                style[bdNames[j]] = new $.wijmo.wijspread.LineBorder(color, $.wijmo.wijspread.LineStyle.dashDot);
                                break;
                            case 5 :
                                style[bdNames[j]] = new $.wijmo.wijspread.LineBorder(color, $.wijmo.wijspread.LineStyle.dashDotDot);
                                break;
                            case 8 :
                                style[bdNames[j]] = new $.wijmo.wijspread.LineBorder(color, $.wijmo.wijspread.LineStyle.double);
                                break;
                            case 0 : // empty는 미지정과 동일함(그려지지 않음)
                                style[bdNames[j]] = new $.wijmo.wijspread.LineBorder(color, $.wijmo.wijspread.LineStyle.empty);
                                break;
                        }
                    }
                }

                style.wordWrap = true;
                this.stylesArr[i] = style;
            }
        }
    };

    /* style.copyFrom이 오작동(?)하므로 대체하는 코드로 사용 */
    function cloneStyle(style) {
        var newStyle = new $.wijmo.wijspread.Style();

        newStyle.font = style.font;
        newStyle.foreColor = style.foreColor;
        newStyle.hAlign = style.hAlign;
        newStyle.vAlign = style.vAlign;
        newStyle.backColor = style.backColor;
        newStyle.borderTop = style.borderTop;
        newStyle.borderRight = style.borderRight;
        newStyle.borderBottom = style.borderBottom;
        newStyle.borderLeft = style.borderLeft;
        newStyle.wordWrap = true; // fixed

        return newStyle;
    }

    /*
     * JS엔진(과 렌더링엔진)의 freezing을 막기위한 progressive렌더링 코드.
     * setTimeout()에 의해 call되므로 this는 window를 가리킴
     */
    function render(binder) { // this -> window
        "use strict";

        var dataArea = $.wijmo.wijspread.SheetArea.viewport;
        var rowIdx, colIdx, rowSpan, colSpan;
        var sum = 0;

        for (var i = binder.currRow, m = binder.records.length; i < m; i++) {
            binder.currRow = i;
            if (sum == 50) {
                window.setTimeout(render, 50, binder);
                return;
            }
            sum++;

            var row = binder.records[i];
            for (var j = 0, n = row.length; j < n; j++) {
                var cellData = row[j];
                if (j == 0) {
                    binder.sheet.setRowHeight(i, cellData.rh); // pixel
                }
                var spanned = false;
                var idxArr = cellData.i.split(",");
                rowIdx = parseInt(idxArr[0], 10);
                colIdx = parseInt(idxArr[1], 10);
                if (idxArr.length == 4) { // 병합셀
                    rowSpan = parseInt(idxArr[2], 10);
                    colSpan = parseInt(idxArr[3], 10);
                    binder.sheet.addSpan(rowIdx, colIdx, rowSpan, colSpan);
                    spanned = true;
                }

                var isLinkType = cellData.hasOwnProperty("lk");
                var cellStyle = binder.stylesArr[cellData.s];
                if (cellStyle) {
                    var style = (isLinkType)? cloneStyle(cellStyle) : cellStyle;
                    binder.sheet.setStyle(rowIdx, colIdx, style);
                    if (spanned) { // 병합원점셀의 border가 clear되지 않으면 이중드로잉(?)
                        var cellArea = new $.wijmo.wijspread.Range(rowIdx, colIdx, rowSpan, colSpan);
                        binder.sheet.setBorder(cellArea, style.borderTop, {top:true});
                        binder.sheet.setBorder(cellArea, style.borderRight, {right:true});
                        binder.sheet.setBorder(cellArea, style.borderBottom, {bottom:true});
                        binder.sheet.setBorder(cellArea, style.borderLeft, {left:true});
                    }
                }

                // border등의 style은 데이타와 무관하게 적용해야 함
                if (!cellData.hasOwnProperty("t")) continue;

                var cell = binder.sheet.getCell(rowIdx, colIdx, dataArea);
                if (isLinkType && !window.ie78) {
                    var linkToolTipText;
                    if (cellData.lk[0] == 1) { // lk:[type,target,'title','url']
                        linkToolTipText = "[";
                    } else {
                        linkToolTipText = "웹페이지 [";
                    }
                    linkToolTipText += cellData.lk[2] + "]";
                    if (cellData.lk[1] == 0) linkToolTipText += " 새창에서 열기";

                    var linkCell = new $.wijmo.wijspread.HyperLinkCellType();
                    //linkCell.linkColor("blue");
                    //linkCell.visitedLinkColor("#FFFF00");
                    linkCell.text(cellData.t);
                    linkCell.linkToolTip(linkToolTipText);
                    linkCell.target(cellData.lk[1]);//$.wijmo.wijspread.HyperLinkTargetType.Blank,Self
                    cell.cellType(linkCell);
                    cell.value(cellData.lk[3]); // text가 아닌 링크값 -> 정렬이 오작동
                    cell.locked(false); // lock시 링크가 작동않음
                } else {
                    //cell.formatter("1/1/0");
                    // value: 포맷팅값을 그대로 유지, text: SS가 재처리하여 포맷 제거
                    cell.value(cellData.t); // text()도 동일값 return
                }

                // 필러링에 사용할 값 설정
                if (cellData.hasOwnProperty("v")) { // rawData(비텍스트형)
                    cell.tag(cellData.v); // 수치형 or 'S'
                } else { // text형인 경우
                    cell.tag(cellData.t);
                }
            }
        }
        // 이하는 모든 데이타를 처리한 이후임

        if (binder.filterOpt != null) { // 필터링처리: CustomCol헤더(이미지), 필터등록
            for (var k = 0; k < binder.filterOpt.indexes.length; k++) {
                var col = binder.filterOpt.indexes[k];
                var ccell = binder.sheet.getCell(0, col, $.wijmo.wijspread.SheetArea.colHeader);
                ccell.cellType(new ImageButtonCellType(ccell.value()));
                binder.sheet.getColumn(col).tag(newRowFilter(binder.filterOpt.types[k], binder));
            }

            binder.sheet.bind($.wijmo.wijspread.Events.CellClick, function(e, info) {
                if (info.sheetArea != $.wijmo.wijspread.SheetArea.colHeader) return;

                for (var m = 0; m < binder.filterOpt.indexes.length; m++) {
                    if (info.col == binder.filterOpt.indexes[m]) { // 필터 column
                        onFilterButtonClick(info.row, info.col, binder);
                        return;
                    }
                }
            });
        }

        if (!window.ie78) {
            window.xtabBinded(); // loading message -> SS visible
        }

        binder.sheet.setSelection(binder.sheet.getFrozenRowCount(),
                                  binder.sheet.getFrozenColumnCount(), 1, 1);
        binder.spread.isPaintSuspended(false);

        window[binder.containerID].length = 0;// for instance GC
        window[binder.containerID] = null;
        binder.records.length = 0;
        binder.records = null;

        if (window.ie78) {
            // 우클릭시 셀인덱스를 제대로 인식하지 못하므로 클릭셀값으로 선행설정함
            binder.sheet.bind($.wijmo.wijspread.Events.CellClick, function(sender, args) {
                window.selRowIdx = args.row;
                window.selColIdx = args.col;
            });
        } else {
            $(document.getElementsByName('chartType')).on("change", function() {
                redrawChart(false);
            });

            binder.spread.addSheet(0, binder.sheet);

            delete window[binder.containerID];
            delete binder.records;
        }
    }