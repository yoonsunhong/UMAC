(function () {
    "use strict";

    var const_undefined = "undefined";
    var const_function = "function";

    var defaultSheetCount = 1;
    var defaultActiveSheetIndex = 0;
    var defaultRowCount = 200;
    var defaultColCount = 20;
    var defaultGridLineColor = "#d0d7e5";
    var defaultShowVerticalGridline = true;
    var defaultShowHorizontalGridline = true;
    var isNoneSchema = false;

    //<editor-fold desc="Help Methods">
    function subclass(target, methodName, redirectFn) {
        var oldMethodRenamed = "_o_" + methodName;
        if (target.prototype.hasOwnProperty(oldMethodRenamed)) {
            throw new Error("override method conflit");
        }
        target.prototype[oldMethodRenamed] = target.prototype[methodName];
        target.prototype[methodName] = redirectFn;
    }

    function bindToBaseCall(target, obj, methodName) {
        var oldMethodRenamed = "_o_" + methodName;
        var fn = null;
        if (target && target.prototype.hasOwnProperty(oldMethodRenamed)) {
            fn = target.prototype[oldMethodRenamed];
        }
        if (!fn || typeof fn !== "function") {
            if (obj !== null && obj !== undefined && obj.hasOwnProperty(methodName)) {
                fn = obj[methodName];
            }
            if (!fn || typeof fn !== "function") {
                fn = function () {
                    // do nothing.
                };
            }
        }
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function overrideClassMethod(target, methodName, redirectFn) {
        var oldMethodRenamed = "_o_" + methodName;
        if (target.hasOwnProperty(oldMethodRenamed)) {
            throw new Error("override method conflit");
        }
        target[oldMethodRenamed] = target[methodName];
        target[methodName] = redirectFn;
    }

    function convertToStyle(jsStyle) {
        if (!jsStyle) {
            return null;
        }

        var style = new $.wijmo.wijspread.Style();
        if (jsStyle.IsBackColorSet) {
            style.backColor = jsStyle.BackColor;
        }
        if (jsStyle.IsBackgroundImageSet) {
            style.backgroundImage = jsStyle.BackgroundImage;
        }
        if (jsStyle.IsForeColorSet) {
            style.foreColor = jsStyle.ForeColor;
        }
        if (jsStyle.IsHAlignSet) {
            style.hAlign = jsStyle.HAlign;
        }
        if (jsStyle.IsVAlignSet) {
            style.vAlign = jsStyle.VAlign;
        }
        if (jsStyle.IsFontSet) {
            style.font = jsStyle.Font;
        }
        if (jsStyle.IsThemeFontSet) {
            style.themeFont = jsStyle.ThemeFont;
        }
        if (jsStyle.IsFormatterSet) {
            style.formatter = jsStyle.Formatter;
        }

        if (jsStyle.IsValidatorSet) {
            if (jsStyle.Validator) {
                var validator = jsStyle.Validator;
                var type = validator.CriteriaType,
                    op = validator.ComparisonOperator,
                    v1 = validator.Value1,
                    v2 = validator.Value2;
                var dv;
                switch (type) {
                    case $.wijmo.wijspread.CriteriaType.WholeNumber:
                        dv = $.wijmo.wijspread.DefaultDataValidator.createNumberValidator(op, v1, v2, true);
                        break;
                    case $.wijmo.wijspread.CriteriaType.DecimalValues:
                        dv = $.wijmo.wijspread.DefaultDataValidator.createNumberValidator(op, v1, v2, false);
                        break;
                    case $.wijmo.wijspread.CriteriaType.Date:
                        dv = $.wijmo.wijspread.DefaultDataValidator.createDateValidator(op, v1, v2);
                        break;
                    case $.wijmo.wijspread.CriteriaType.TextLength:
                        dv = $.wijmo.wijspread.DefaultDataValidator.createTextLengthValidator(op, v1, v2);
                        break;
                    case $.wijmo.wijspread.CriteriaType.Custom:
                        dv = $.wijmo.wijspread.DefaultDataValidator.createFormulaValidator(v1);
                        break;
                    case $.wijmo.wijspread.CriteriaType.List:
                        if (v1 && v1.charAt(0) === "=") {
                            dv = $.wijmo.wijspread.DefaultDataValidator.createFormulaListValidator(v1);
                        } else {
                            dv = $.wijmo.wijspread.DefaultDataValidator.createListValidator(v1);
                        }
                        break;
                }
                if (dv) {
                    dv.errorStyle = validator.ErrorStyle;
                    dv.ignoreBlank = validator.IgnoreBlank;
                    dv.inCellDropdown = validator.InCellDropdown;
                    dv.showInputMessage = validator.ShowInputMessage;
                    dv.showErrorMessage = validator.ShowErrorMessage;
                    dv.inputTitle = validator.InputTitle;
                    dv.errorTitle = validator.ErrorTitle;
                    dv.inputMessage = validator.InputMessage;
                    dv.errorMessage = validator.ErrorMessage;
                    if (dv.inputMessage) {
                        dv.inputMessage = dv.inputMessage.replace(/\r\n/g, "<br/>");
                    }
                    if (dv.errorMessage) {
                        dv.errorMessage = dv.errorMessage.replace(/\r\n/g, "<br/>");
                    }
                }
                style.validator = dv;
            } else {
                style.validator = null;
            }
        }

        if (jsStyle.IsBorderLeftSet) {
            if (jsStyle.BorderLeft) {
                var border = jsStyle.BorderLeft;
                style.borderLeft = new $.wijmo.wijspread.LineBorder(border.Color, border.Style);
            } else {
                style.borderLeft = null;
            }
        }
        if (jsStyle.IsBorderTopSet) {
            if (jsStyle.BorderTop) {
                border = jsStyle.BorderTop;
                style.borderTop = new $.wijmo.wijspread.LineBorder(border.Color, border.Style);
            } else {
                style.borderTop = null;
            }
        }
        if (jsStyle.IsBorderRightSet) {
            if (jsStyle.BorderRight) {
                border = jsStyle.BorderRight;
                style.borderRight = new $.wijmo.wijspread.LineBorder(border.Color, border.Style);
            } else {
                style.borderRight = null;
            }
        }
        if (jsStyle.IsBorderBottomSet) {
            if (jsStyle.BorderBottom) {
                border = jsStyle.BorderBottom;
                style.borderBottom = new $.wijmo.wijspread.LineBorder(border.Color, border.Style);
            } else {
                style.borderBottom = null;
            }
        }

        if (jsStyle.IsLockedSet) {
            style.locked = jsStyle.Locked;
        }
        if (jsStyle.IsTextIndentSet) {
            style.textIndent = jsStyle.TextIndent;
        }
        if (jsStyle.IsWordWrapSet) {
            style.wordWrap = jsStyle.WordWrap;
        }
        if (jsStyle.IsShrinkToFitSet) {
            style.shrinkToFit = jsStyle.ShrinkToFit;
        }
        if (jsStyle.IsTabStopSet) {
            style.tabStop = jsStyle.TabStop;
        }
        if (jsStyle.IsTextDecorationSet) {
            style.textDecoration = jsStyle.TextDecoration;
        }
        return style;
    }

    function convertToRange(jsRange) {
        if (!jsRange) {
            return null;
        }

        var rg = new $.wijmo.wijspread.Range();
        rg.row = jsRange.Row;
        rg.rowCount = jsRange.RowCount;
        rg.col = jsRange.Column;
        rg.colCount = jsRange.ColumnCount;

        return rg;
    }

    function convertToRanges(jsRanges) {
        if (!jsRanges) {
            return null;
        }

        var rgs = new Array();
        for (var i = 0; i < jsRanges.length; i++) {
            rgs.push(convertToRange(jsRanges[i]));
        }
        return rgs;
    }

    function convertToSparklineSetting(jsSetting) {
        if (!jsSetting) {
            return null;
        }

        var st = new $.wijmo.wijspread.SparklineSetting();

        st.axisColor(jsSetting.AxisColor);
        st.firstMarkerColor(jsSetting.FirstMarkerColor);
        st.highMarkerColor(jsSetting.HighMarkerColor);
        st.lastMarkerColor(jsSetting.LastMarkerColor);
        st.lowMarkerColor(jsSetting.LowMarkerColor);
        st.markersColor(jsSetting.MarkersColor);
        st.negativeColor(jsSetting.NegativeColor);
        st.seriesColor(jsSetting.SeriesColor);

        st.showFirst(jsSetting.ShowFirst);
        st.showHigh(jsSetting.ShowHigh);
        st.showLast(jsSetting.ShowLast);
        st.showLow(jsSetting.ShowLow);
        st.showNegative(jsSetting.ShowNegative);
        st.showMarkers(jsSetting.ShowMarkers);

        st.displayEmptyCellsAs = jsSetting.DisplayEmptyCellsAs;
        st.rightToLeft = jsSetting.RightToLeft;

        st.displayHidden = jsSetting.DisplayHidden;
        st.displayXAxis = jsSetting.DisplayXAxis;

        st.manualMax = jsSetting.ManualMax;
        st.manualMin = jsSetting.ManualMin;
        st.maxAxisType = jsSetting.MaxAxisType;
        st.minAxisType = jsSetting.MinAxisType;

        st.groupMaxValue = jsSetting.GroupMaxValue;
        st.groupMinValue = jsSetting.GroupMinValue;
        st.lineWeight = jsSetting.LineWeight;

        return st;
    }

    function convertToSXValue(value) {
        if (value instanceof Date) {
            // convert date
            value = "/Date(" + value.getTime() + ")/";
        } else if (value instanceof Number) {
            value = value.valueOf();
        }

        return value;
    }

    function doGroupObjectFromJSON(spreadObject, sheetName, groupJSON, isRowGroup) {
        if (!spreadObject || !groupJSON) {
            return;
        }
        if (groupJSON.itemsData) {
            var length = groupJSON.itemsData.length;
            for (var i = 0; i < length; i++) {
                var item = groupJSON.itemsData[i];
                if (item.count > 0 && item.index >= 0 && item.info) {
                    for (var k = 0; k < item.count; k++) {
                        if (item.index + k >= groupJSON.itemsCount) {
                            break;
                        }
                        spreadObject.SetLevel(sheetName, isRowGroup, item.index + k, item.info.level);
                    }
                }
            }
            for (var i = 0; i < length; i++) {
                var item = groupJSON.itemsData[i];
                if (item.count > 0 && item.index >= 0 && item.info) {
                    spreadObject.SetCollapsed(sheetName, isRowGroup, item.index, !!item.info.collapsed);
                }
            }
        }
        if (groupJSON.direction !== null && groupJSON.direction !== undefined) {
            spreadObject.SetRangeGroupDirection(sheetName, isRowGroup, groupJSON.direction);
        }
    }

    function doSpreadObjectFromJSON(spreadObject, spreadJson,isNoneSchema) {
        if (!spreadObject || !spreadJson) {
            return;
        }

        var t = spreadObject, jsonData = spreadJson;
        t.Suspend();
        try {
            t.ClearSheets();
            var sheetCount = jsonData.sheetCount;
            if (typeof sheetCount === "undefined") {
                sheetCount = defaultSheetCount;
            }
            t.SetSheetCount(sheetCount);
            if (jsonData.referenceStyle !== null && jsonData.referenceStyle !== undefined) {
                t.SetSpreadReferenceStyle(jsonData.referenceStyle);
            }

            var i = 0;
            if (jsonData.sheets) {
                for (var s in jsonData.sheets) {
                    if (typeof (s) === "string") {
                        var sheetData = jsonData.sheets[s];
                        t.SetNameFromJson(i, sheetData.name);
                        doSheetObjectFromJSON(t, sheetData, isNoneSchema);
                        i++;
                    }
                }
            }

            var activeSheetIndex = jsonData.activeSheetIndex;
            if (typeof activeSheetIndex === const_undefined) {
                activeSheetIndex = defaultActiveSheetIndex;
            }
            t.SetActiveSheetIndex(jsonData.activeSheetIndex);

            if (typeof (jsonData.tabStripRatio) !== const_undefined) {
                t.SetTabStripRatio(jsonData.tabStripRatio);
            }
            if (typeof (jsonData.tabStripVisible) !== const_undefined) {
                t.SetTabStripVisible(jsonData.tabStripVisible);
            }
            if (typeof (jsonData.tabEditable) !== const_undefined) {
                t.SetTabEditable(jsonData.tabEditable);
            }
            if (typeof (jsonData.newTabVisible) !== const_undefined) {
                t.SetNewTabVisible(jsonData.newTabVisible);
            }
            if (typeof (jsonData.canUserEditFormula) !== const_undefined) {
                t.AllowUserFormula = jsonData.canUserEditFormula;
            }
            if (typeof (jsonData.startSheetIndex) !== const_undefined) {
                t.StartSheetIndex = jsonData.startSheetIndex;
            }

            if (typeof (jsonData.allowUndo) !== const_undefined) {
                t.SetAllowUndo(jsonData.allowUndo);
            }
            if (typeof (jsonData.allowUserZoom) !== const_undefined) {
                t.AllowUserZoom = jsonData.allowUserZoom;
            }
            if (typeof (jsonData.allowDragDrop) !== const_undefined) {
                t.SetCanUserDragDrop(jsonData.allowDragDrop);
            }
            if (typeof (jsonData.allowDragFill) !== const_undefined) {
                t.SetCanUserDragFill(jsonData.allowDragFill);
            }
            if (typeof (jsonData.highlightInvalidData) !== const_undefined) {
                t.HighlightInvalidData = jsonData.highlightInvalidData;
            }
            if (typeof (jsonData.showHorizontalScrollbar) !== const_undefined) {
                t.ShowHorizontalScrollbar(jsonData.showHorizontalScrollbar);
            }
            if (typeof (jsonData.showVerticalScrollbar) !== const_undefined) {
                t.ShowVerticalScrollbar(jsonData.showVerticalScrollbar);
            }
            if (typeof (jsonData.showScrollTip) !== const_undefined) {
                t.ShowScrollTip(jsonData.showScrollTip);
            } 
            if (typeof (jsonData.showResizeTip) !== const_undefined) {
                t.ShowResizeTip(jsonData.showResizeTip);
            }
            if (typeof (jsonData.showDragDropTip) !== const_undefined) {
                t.ShowDragDropTip(jsonData.showDragDropTip);
            }
            if (typeof (jsonData.showDragFillTip) !== const_undefined) {
                t.ShowDragFillTip(jsonData.showDragFillTip);
            } 
            if (typeof (jsonData.grayAreaBackColor) !== const_undefined) {
                t.GrayAreaBackColor(jsonData.grayAreaBackColor);
            }
            if (jsonData.names) {
                for (var n = 0; n < jsonData.names.length; n++) {
                    var ni = jsonData.names[n];
                    t.AddCustomName(ni.name, ni.formula, ni.row, ni.col);
                }
            }
            if (jsonData.sheets) {
                var sheets = jsonData.sheets;
                for (var s in sheets) {
                    if (typeof s === "string") {
                        var sheet = sheets[s];
                        formulaFromJson(t, sheet, isNoneSchema);
                    }
                }
            }
            if (jsonData.namedStyles) {
                var styles = jsonData.namedStyles;
                var stylesCount = styles.length;
                for (var ns = 0; ns < stylesCount; ns++) {
                    t.AddNamedStyle(styles[ns]);
                }
            }
            t.Invalidate();

        } finally {
            t.Resume()
        }
    }

    function formulaFromJson(spreadObject, sheetJson, isNoneSchema) {
        if (!spreadObject || !sheetJson) {
            return;
        }

        var t = spreadObject,
            jsonData = sheetJson;
        //customeNames.
        var names = jsonData.names;
        if (names) {
            for (var i = 0; i < names.length; i++) {
                var ni = names[i];
                t.AddCustomName(jsonData.name, ni.name, ni.formula, ni.baseRow, ni.baseCol);
            }
        }
        //formulas.
        var data = jsonData.data;
        if (data) {
            var dataTable = data.dataTable;
            if (dataTable) {
                for (var r in dataTable) {
                    if (typeof r !== "function") {
                        for (var c in dataTable[r]) {
                            if (typeof c !== "function") {
                                var node = dataTable[r][c];
                                var formula = node.formula;
                                if (formula) {
                                    //setArrayFormulaCore
                                    t.SetFormula(jsonData.name, parseInt(r, 10), parseInt(c, 10), formula);
                                }
                            }
                        }
                    }
                }
            }
        }

        //sparklines.
        //var sparklineGroups = isNoneSchema ? jsonData.sparklineGroupManager : jsonData.sparklineGroups;
        //if (sparklineGroups) {
        //}
    }

    function doSheetObjectFromJSON(spreadObject, sheetJson, isNoneSchema) {
        if (!spreadObject || !sheetJson) {
            return;
        }
        if (spreadObject.IsUpdating) {
            return;
        }

        var SheetArea = $.wijmo.wijspread.SheetArea;
        var t = spreadObject, jsonData = sheetJson;
        var name = jsonData.name;
        var rowCount = jsonData.rowCount;
        if (typeof rowCount === const_undefined) {
            rowCount = defaultRowCount;
        }
        var columnCount = jsonData.columnCount;
        if (typeof columnCount === const_undefined) {
            columnCount = defaultColCount;
        }

        t.SetRowCount(name, rowCount, $.wijmo.wijspread.SheetArea.viewport);
        t.SetColumnCount(name, columnCount, $.wijmo.wijspread.SheetArea.viewport);
        if (typeof jsonData.activeRow !== const_undefined && typeof jsonData.activeCol !== const_undefined) {
            t.SetActiveCell(name, jsonData.activeRow, jsonData.activeCol);
        }
        if (typeof jsonData.frozenRowCount !== const_undefined) {
            t.SetFrozenRowCount(name, jsonData.frozenRowCount);
        }
        if (typeof jsonData.frozenColCount !== const_undefined) {
            t.SetFrozenColumnCount(name, jsonData.frozenColCount);
        }
        if (typeof jsonData.frozenTrailingRowCount !== const_undefined) {
            t.SetFrozenTrailingRowCount(name, jsonData.frozenTrailingRowCount);
        }
        if (typeof jsonData.frozenTrailingColCount !== const_undefined) {
            t.SetFrozenTrailingColumnCount(name, jsonData.frozenTrailingColCount);
        }

        if (typeof jsonData.gridline !== const_undefined ) {
            var gridlineColor = jsonData.gridline.color;
            var showVerticalGridline = jsonData.gridline.showVerticalGridline;
            var showHorizontalGridline = jsonData.gridline.showHorizontalGridline;
            if (typeof gridlineColor === const_undefined) {
                gridlineColor = defaultGridLineColor;
            }
            if (typeof showVerticalGridline === const_undefined) {
                showVerticalGridline === defaultShowVerticalGridline;
            }
            if (typeof showHorizontalGridline === const_undefined) {
                showHorizontalGridline = defaultShowHorizontalGridline;
            }
            t.SetGridlineOptions(name, gridlineColor, showVerticalGridline, showHorizontalGridline);
        }
        if (typeof jsonData.allowCellOverflow !== const_undefined) {
            t.CanCellOverflow = jsonData.allowCellOverflow;
        }

        if (typeof (jsonData.referenceStyle) !== const_undefined) {
            t.SetSheetReferenecStyle(name, jsonData.referenceStyle);
        }
        var zoomFactor = jsonData.zoomFactor ? jsonData.zoomFactor : jsonData._zoomFactor;
        if (typeof zoomFactor !== const_undefined) {
            t.Zoom(name, zoomFactor);
        }

        if (jsonData.defaults) {
            if (typeof (jsonData.defaults.rowHeight) !== const_undefined) {
                t.SetDefaultRowHeight(name, jsonData.defaults.rowHeight);
            }
            if (typeof (jsonData.defaults.colWidth) !== const_undefined) {
                t.SetDefaultColumnWidth(name, jsonData.defaults.colWidth);
            }
            if (typeof (jsonData.defaults.rowHeaderColWidth) !== const_undefined) {
                t.SetDefaultRowHeaderColumnWidth(name, jsonData.defaults.rowHeaderColWidth);
            }
            if (typeof (jsonData.defaults.colHeaderRowHeight) !== const_undefined) {
                t.SetDefaultColumnHeaderRowHeight(name, jsonData.defaults.colHeaderRowHeight);
            }
        }

        if (typeof (jsonData.autoGenerateColumns) !== const_undefined) {
            //in spreadjs autoGenerateColumns control both AutoGenerateColumns and DataAutoHeadings in SX.
            t.SetAutoGenerateColumns(name, jsonData.autoGenerateColumns);
            t.SetDataAutoHeadings(name, jsonData.autoGenerateColumns);
        }
        //data source, not support now
        if (jsonData.dataSource) {
            //todo
        }

        //row axis
        if (jsonData.rows) {
            var rowInfos = jsonData.rows;
            for (var ri in rowInfos) {
                if (!isNaN(ri)) {
                    var r = parseInt(ri, 10);
                    t.SetRowInfo(name, r, rowInfos[ri], SheetArea.viewport);
                }
            }
        }
        //column axis
        if (jsonData.columns) {
            var colInfos = jsonData.columns;
            for (var ci in colInfos) {
                if (!isNaN(ci)) {
                    var c = parseInt(ci, 10);
                    t.SetColumnInfo(name, c, colInfos[ci], SheetArea.viewport);
                }
            }
        }
        //column styles
        if (jsonData.colStyles) {
            for (var ci in jsonData.colStyles) {
                if (!isNaN(ci)) {
                    var c = parseInt(ci, 10);
                    t.SetStyle(name, -1, c, jsonData.colStyles[ci], SheetArea.viewport);
                }
            }
        }
        //row styles
        if (jsonData.rowStyles) {
            for (var ri in jsonData.rowStyles) {
                if (!isNaN(ri)) {
                    var r = parseInt(ri, 10);
                    t.SetStyle(name, r, -1, jsonData.rowStyles[ri], SheetArea.viewport);
                }
            }
        }
        //header axis
        if (jsonData.rowHeaderColInfos) {
            var colInfos = jsonData.rowHeaderColInfos;
            for (var ci in colInfos) {
                if (!isNaN(ci)) {
                    var c = parseInt(ci, 10);
                    t.SetColumnInfo(name, c, colInfos[ci], SheetArea.rowHeader);
                }
            }
        }
        if (jsonData.colHeaderRowInfos) {
            var rowInfos = jsonData.colHeaderRowInfos;
            for (var ri in rowInfos) {
                if (!isNaN(ri)) {
                    var r = parseInt(ri, 10);
                    t.SetRowInfo(name, r, rowInfos[ri], SheetArea.colHeader);
                }
            }
        }

        //header autoText
        if (typeof (jsonData.rowHeaderAutoText) !== const_undefined) {
            t.SetRowHeaderAutoText(name, jsonData.rowHeaderAutoText);
        }
        if (typeof (jsonData.colHeaderAutoText) !== const_undefined) {
            t.SetColHeaderAutoText(name, jsonData.colHeaderAutoText);
        }

        //header autoTextIndex
        if (typeof (jsonData.rowHeaderAutoTextIndex) !== const_undefined) {
            t.SetRowHeaderAutoTextIndex(name, jsonData.rowHeaderAutoTextIndex);
        }
        if (typeof (jsonData.colHeaderAutoTextIndex) !== const_undefined) {
            t.SetColHeaderAutoTextIndex(name, jsonData.colHeaderAutoTextIndex);
        }

        //header visible
        if (typeof (jsonData.rowHeaderVisible) !== const_undefined) {
            t.SetRowHeaderVisible(name, jsonData.rowHeaderVisible);
        }
        if (typeof (jsonData.colHeaderVisible) !== const_undefined) {
            t.SetColumnHeaderVisible(name, jsonData.colHeaderVisible);
        }

        //header count
        if (typeof (jsonData.rowHeaderColCount) !== const_undefined) {
            t.SetColumnCount(name, jsonData.rowHeaderColCount, SheetArea.rowHeader);
        }
        if (typeof (jsonData.colHeaderRowCount) !== const_undefined) {
            t.SetRowCount(name, jsonData.colHeaderRowCount, SheetArea.colHeader);
        }

        //row header span
        if (jsonData.rowHeaderSpan) {
            doSpansFromJSON(t, name, jsonData.rowHeaderSpan, SheetArea.rowHeader, isNoneSchema);
        }

        //row header data
        if (jsonData.rowHeaderData) {
            doDataFromJSON(t, name, jsonData.rowHeaderData, SheetArea.rowHeader, isNoneSchema);
        }

        //col header span
        if (jsonData.colHeaderSpan) {
            doSpansFromJSON(t, name, jsonData.colHeaderSpan, SheetArea.colHeader, isNoneSchema);
        }

        //col header data
        if (jsonData.colHeaderData) {
            doDataFromJSON(t, name, jsonData.colHeaderData, SheetArea.colHeader, isNoneSchema);
        }

        //viewport span
        if (jsonData.spans) {
            doSpansFromJSON(t, name, jsonData.spans, SheetArea.viewport, isNoneSchema);
        }

        //selections
        if (jsonData.selections) {
            doSelectionsFromJSON(t, name, jsonData.selections, isNoneSchema);
        }

        //viewport data
        if (jsonData.data) {
            doDataFromJSON(t, name, jsonData.data, SheetArea.viewport, isNoneSchema);
        }

        //theme
        if (jsonData.theme) {
            var st = jsonData.theme;
            if (typeof st === "string" || typeof st === "undefined") {
                t.CurrentThemeName = st;
            } else {
                //st._name, st._headingFont, st._bodyFont, st._themeColor
                t.CurrentThemeName = st._name;
            }
        }

        //group
        if (typeof (jsonData.showRowRangeGroup) !== const_undefined) {
            t.ShowRowRangeGroup = jsonData.showRowRangeGroup;
        }
        if (typeof (jsonData.showColumnRangeGroup) !== const_undefined) {
            t.ShowColumnRangeGroup = jsonData.showColumnRangeGroup;
        }
        if (jsonData.rowRangeGroup) {
            doGroupObjectFromJSON(t, name, jsonData.rowRangeGroup, true, isNoneSchema);
        }
        if (jsonData.colRangeGroup) {
            doGroupObjectFromJSON(t, name, jsonData.colRangeGroup, false, isNoneSchema);
        }

        //filter
        if (jsonData.rowFilter) {
            doFilterFromJSON(t, name, null, jsonData.rowFilter, isNoneSchema);
        }
        if (jsonData.sheetTabColor) {
            t.SetSheetTabColor(name, jsonData.sheetTabColor);
        }

        //conditional formats
        if (jsonData.conditionalFormats) {
            t.DoConditionalFormatsFromJSON(name, jsonData.conditionalFormats);
        }

        if (typeof (jsonData.isProtected) !== const_undefined) {
            t.SetSheetProtected(name, jsonData.isProtected);
        }

        //tables
        var tables = isNoneSchema ? (jsonData.tableManager ? jsonData.tableManager.tables : null) : jsonData.tables;
        if (typeof (tables) !== const_undefined) {
            doTablesFromJSON(t, name, tables, isNoneSchema);
        }

        //floatingObjects
        var floatingObjects = isNoneSchema ? (jsonData.floatingObjectArray ? jsonData.floatingObjectArray.floatingObjects : null) : jsonData.floatingObjects;
        if (typeof (floatingObjects) !== const_undefined) {
            doFloatingObjectsFromJSON(t, name, floatingObjects, isNoneSchema);
        }

        //selection
        if (jsonData.selectionBackColor) {
            t.SelectionBackColor(name, jsonData.selectionBackColor);
        }

        if (jsonData.selectionBorderColor) {
            t.SelectionBorderColor(name, jsonData.selectionBorderColor);
        }

        //sparklineGroups
        var sparklineGroups = isNoneSchema ? (jsonData.sparklineGroupManager ? jsonData.sparklineGroupManager.groups : null) : jsonData.sparklineGroups;
        if (typeof (sparklineGroups) !== const_undefined) {
            doSparklineFromJSON(t, name, sparklineGroups, SheetArea.viewport, isNoneSchema);
        }

        if (typeof (jsonData.namedStyles) !== const_undefined) {
            doNamedStylesFromJSON(t, name, jsonData.namedStyles, isNoneSchema);
        }

        if (typeof jsonData.visible !== const_undefined) {
            t.SetVisible(name, jsonData.visible);
        }

        t.InvalidateSheet(name);
    }

    function doNamedStylesFromJSON(spreadObject, sheetName, namedStyles, isNoneSchema) {
        var styles = namedStyles;
        var t = spreadObject;
        var stylesCount = styles.length;
        for (var i = 0; i < stylesCount; i++) {
            t.AddNamedStyle(sheetName, styles[i]);
        }
    }

    function doTablesFromJSON(spreadObject, sheetName, tables, isNoneSchema) {
        if (!tables) {
            return;
        }

        var t = spreadObject, count = tables.length;
        for (var i = 0; i < count; i++) {
            var tb = tables[i], tbName = tb.name;

            var isMoveTable = false;

            if (typeof tb.showHeader !== const_undefined) {
                if (!tb.showHeader) {
                    if (tb.row - 1 >= 0) {
                        tb.row -= 1;
                        tb.rowCount += 1;
                    }
                    else //The table is at the first row with no header
                    {
                        tb.rowCount += 1;
                        isMoveTable = true;
                    }
                }
            }
            if (tb.showFooter) {
                tb.rowCount -= 1;
            }
            t.AddTable(sheetName, tbName, tb.row, tb.col, tb.rowCount, tb.colCount, tb.style);
            
            if (typeof tb.showHeader !== const_undefined) {
                t.ShowTableHeader(sheetName, tbName, tb.showHeader);
            }
            if (typeof tb.showFooter !== const_undefined) {
                t.ShowTableFooter(sheetName, tbName, tb.showFooter);
            }
            if (typeof tb.bandRows !== const_undefined) {
                t.BandTableRows(sheetName, tbName, tb.bandRows);
            }
            if (typeof tb.bandColumns !== const_undefined) {
                t.BandTableColumns(sheetName, tbName, tb.bandColumns);
            }
            if (typeof tb.highlightFirstColumn !== const_undefined) {
                t.HighlightTableFirstColumn(sheetName, tbName, tb.highlightFirstColumn);
            }
            if (typeof tb.highlightLastColumn !== const_undefined) {
                t.HighlightTableLastColumn(sheetName, tbName, tb.highlightLastColumn);
            }

            if (typeof tb.style !== const_undefined) {
                var tableStyle = new $.wijmo.wijspread.TableStyle();
                tableStyle.fromJSON(tb.style, isNoneSchema);
                t.SetTableStyle(sheetName, tbName, tableStyle);
            }

            var columns = tb.columns;
            if (columns) {
                var columnsCount = columns.length, column;
                for (var j = 0; j < columnsCount; j++) {
                    column = columns[j];
                    var name = column.name ? column.name : column._name;
                    if (name) {
                        t.SetTableColumnName(sheetName, tbName, j, name);
                    }
                    var fformula = isNoneSchema ? (column.fformula ? column.fformula : column._fformula) : column.footerFormula;
                    var fvalue = isNoneSchema ? (column.fvalue ? column.fvalue : column._fvalue) : column.footerValue;
                    if (fformula) {
                        t.SetTableColumnFormula(sheetName, tbName, j, "=" + fformula)
                    } else if (fvalue) {
                        t.SetTableColumnFormula(sheetName, tbName, j, fvalue.toString())
                    }

                }
            }
            var rowFilter = tb.rowFilter;
            if (rowFilter) {
                doFilterFromJSON(t, sheetName, tbName, rowFilter, isNoneSchema);
            }
            if (isMoveTable) {
                t.MoveTable(sheetName, tbName, 0, tb.col);
            }
        }
    }

    function doFloatingObjectsFromJSON(spreadObject, sheetName, floatingObjects, isNoneSchema) {
        if (!floatingObjects) {
            return;
        }

        var t = spreadObject, count = floatingObjects.length;
        for (var i = 0; i < count; i++) {
            var fo = floatingObjects[i];
            if (fo.floatingObjectType !== $.wijmo.wijspread.FloatingObjectType.Picture) {
                return;
            }
            var foName = fo.name;
            var foX = fo.x;
            var foY = fo.y;
            var foWidth = fo.width;
            var foHeight = fo.height;
            var src = fo.src;
            var picture = new $.wijmo.wijspread.Picture(foName, src, foX, foY, foWidth, foHeight);
            var pictureType = $.wijmo.wijspread.Picture;
            t.AddPicture(sheetName, picture);
            t.CanPrint(sheetName, foName, fo.canPrint);
            t.IsSelected(sheetName, foName, fo.isSelected);
            t.IsLocked(sheetName, foName, fo.isLocked);
            t.IsVisible(sheetName, foName, fo.isVisible);
            t.DynamicMove(sheetName, foName, fo.dynamicMove);
            t.DynamicSize(sheetName, foName, fo.dynamicSize);
            t.Fill(sheetName, foName, fo.backColor);
            t.BorderRadius(sheetName, foName, fo.borderRadius);
            t.BorderWidth(sheetName, foName, fo.borderWidth);
            t.BorderStyle(sheetName, foName, fo.borderStyle);
            t.BorderColor(sheetName, foName, fo.borderColor);
            t.PictureStretch(sheetName, foName, fo.pictureStretch);
        }
    }

    function doFilterFromJSON(spreadObject, sheetName, tableName, rowFilter, isNoneSchema) {
        var t = spreadObject;
        var range = rowFilter.range;
        if (!tableName) { // If do the table rowFilter's fromJSON, should not set the sheet's rowFilter.  
            t.SetRowFilter(sheetName, range);
        }
        if (rowFilter.filterItemMap) {
            for (var i = 0; i < rowFilter.filterItemMap.length; i++) {
                var conditionArray = rowFilter.filterItemMap[i].conditions;
                if (conditionArray) {
                    for (var k = 0; k < conditionArray.length; k++) {
                        var conditionSettings = conditionArray[k];
                        if (conditionSettings) {
                            t.AddFilterItem(sheetName, tableName, rowFilter.filterItemMap[i].index, conditionSettings);
                        }
                    }
                }
            }
        }

        if (rowFilter.filteredColMap) {
            for (var i = 0; i < rowFilter.filteredColMap.length; i++) {
                var filteredCol = rowFilter.filteredColMap[i];
                if (filteredCol !== undefined && filteredCol !== null) {
                    t.Filter(sheetName, tableName, filteredCol);
                }
            }
        }

        if (rowFilter.sortInfo) {
            t.SortColumn(sheetName, tableName, rowFilter.sortInfo.index, rowFilter.sortInfo.ascending);
        }

        if (rowFilter.showFilterButton !== null && rowFilter.showFilterButton !== undefined) {
            t.SetShowFilterButton(sheetName, tableName, rowFilter.showFilterButton);
        }
    }

    function doSpansFromJSON(spreadObject, sheetName, spans, sheetArea, isNoneSchema) {
        if (!spans || !spreadObject || !sheetName) {
            return;
        }

        var t = spreadObject, name = sheetName;
        for (var j = 0; j < spans.length; j++) {
            var cr = spans[j];
            t.AddSpan(name, cr.row, cr.col, cr.rowCount, cr.colCount, sheetArea);
        }
    }

    function doSelectionsFromJSON(spreadObject, sheetName, selections, isNoneSchema) {
        if (!selections || !spreadObject || !sheetName) {
            return;
        }

        var t = spreadObject, name = sheetName;
        if (selections.selectionPolicy !== undefined && selections.selectionPolicy !== null) {
            t.SetSelectionPolicy(name, selections.selectionPolicy);
        }
        if (selections.selectionUnit !== undefined && selections.selectionUnit !== null) {
            t.SetSelectionUnit(name, selections.selectionUnit);
        }
        for (var i = 0; i < selections.length; i++) {
            var cr = selections[i];
            t.AddSelection(name, cr.row, cr.col, cr.rowCount, cr.colCount);
        }

    }

    function doDataFromJSON(spreadObject, sheetName, jsonData, sheetArea, isNoneSchema) {
        if (!jsonData || !spreadObject || !sheetName) {
            return;
        }

        var t = spreadObject, name = sheetName;
        var rowCount = jsonData.rowCount;
        if (typeof rowCount === const_undefined) {
            rowCount = defaultRowCount;
        }
        var colCount = jsonData.colCount;
        if (typeof colCount === const_undefined) {
            colCount = defaultColCount;
        }

        //data
        var data = jsonData.dataTable;
        if (data) {
            var dm = new $.wijmo.wijspread._GcSheetModel(rowCount, colCount);
            dm.dataTable = data;

            var r = dm.nextNonNullRow(-1);
            while (r >= 0) {
                var c = dm.nextNonNullColumn(r, -1);
                while (c >= 0) {
                    var node = dm.getNode(r, c);
                    if (node) {
                        doNodeDataFromJSON(t, name, r, c, node, sheetArea, isNoneSchema);
                    }
                    c = dm.nextNonNullColumn(r, c);
                }
                r = dm.nextNonNullRow(r);
            }
        }

        //row data
        var rowData = jsonData.rowDataArray ? jsonData.rowDataArray : jsonData._rowDataArray;
        if (rowData) {
            for (var r = 0; r < rowCount; r++) {
                if (rowData.hasOwnProperty(r) && rowData[r]) {
                    doNodeDataFromJSON(t, name, r, -1, rowData[r], sheetArea, isNoneSchema);
                }
            }
        }

        //column data
        var colData = jsonData.columnDataArray ? jsonData.columnDataArray : jsonData._columnDataArray;
        if (colData) {
            for (var c = 0; c < colCount; c++) {
                if (colData.hasOwnProperty(c) && colData[c]) {
                    doNodeDataFromJSON(t, name, -1, c, colData[c], sheetArea, isNoneSchema);
                }
            }
        }

        //default style
        var defDataNode = jsonData.defaultDataNode ? jsonData.defaultDataNode : jsonData._defaultDataNode;
        if (defDataNode) {
            if (typeof (defDataNode.style) !== const_undefined) {
                t.SetDefaultStyle(name, defDataNode.style, sheetArea);
            }
        }
    }
    //sparkline
    function doSparklineFromJSON(spreadObject, sheetName, sparklineGroups, sheetArea, isNoneSchema) {
        if (!sparklineGroups || !spreadObject || !sheetName) {
            return;
        }
        var t = spreadObject, name = sheetName;
        if (sparklineGroups) {
            for (var g = 0; g < sparklineGroups.length; g++) {
                var group = sparklineGroups[g];
                var sparklines = group.sparklines;
                for (var s = 0; s < group.sparklines.length; s++) {
                    var sparkline = sparklines[s];
                    var setting = new $.wijmo.wijspread.SparklineSetting();
                    var jsonSetting = sparkline.setting;
                    for (var item in setting) {
                        if (setting.hasOwnProperty(item)) {
                            if (jsonSetting.hasOwnProperty(item)) {
                                setting[item] = jsonSetting[item];
                            } else {
                                if (item.substr(0, 1) === "_") {
                                    var aliasItem = item.substr(1);
                                    if (jsonSetting.hasOwnProperty(aliasItem)) {
                                        setting[item] = jsonSetting[aliasItem];
                                    }
                                }
                            }
                        }
                    }
                    t.SetSparkline(name, sparkline.row, sparkline.col, sparkline.data, sparkline.orientation, sparkline.type, setting, sparkline.axisReference, sparkline.axisOrientation);
                }
            }
        }
    }

    function doNodeDataFromJSON(spreadObject, sheetName, row, col, node, sheetArea, isNoneSchema) {
        if (!node || !spreadObject || !sheetName) {
            return;
        }

        var t = spreadObject, name = sheetName;
        var r = row, c = col;
        ////sparklines
        //if (node.sparkline && sheetArea === $.wijmo.wijspread.SheetArea.viewport) {
        //    var x = node.sparkline;
        //    var setting = new $.wijmo.wijspread.SparklineSetting(x.setting);
        //    t.SetSparkline(name, x.row, x.col, x.data, x.orientation, x.type, setting, x.axisReference, x.axisOrientation);
        //}
        //value
        if (typeof (node.value) !== const_undefined) {
            t.SetValue(name, r, c, node.value, sheetArea);
        }
        //style
        if (typeof (node.style) !== const_undefined) {
            if (typeof (node.style) === 'object') {
                var style = $.extend(true, {}, node.style);
                if (typeof (node.style.validator) !== const_undefined) {
                    var dv = new $.wijmo.wijspread.DefaultDataValidator();
                    $.extend(dv, node.style.validator);
                    style.validator = dv;
                }
                t.SetStyle(name, r, c, style, sheetArea);
            }
            if (typeof (node.style) ==='string') {
                t.SetStyleByName(name, r, c, node.style, sheetArea);
            }
        }
        //formual
        if (typeof (node.formula) !== const_undefined && sheetArea === $.wijmo.wijspread.SheetArea.viewport) {
            t.SetFormula(name, r, c, node.formula);
        }
    }

    function convertKeyCode(keyCode) {
        var result = 0;
        var Key = $.wijmo.wijspread.Key;
        switch (keyCode) {
            case Key.left:
                result = 14;
                break;
            case Key.right:
                result = 16;
                break;
            case Key.up:
                result = 15;
                break;
            case Key.down:
                result = 17;
                break;
            case Key.tab:
                result = 2;
                break;
            case Key.enter:
                result = 3;
                break;
            case Key.shift:
                result = 4;
                break;
            case Key.ctrl:
                result = 5;
                break;
            case Key.space:
                result = 9;
                break;
            case Key.altkey:
                result = 6;
                break;
            case Key.home:
                result = 13;
                break;
            case Key.end:
                result = 12;
                break;
            case Key.pup:
                result = 10;
                break;
            case Key.pdn:
                result = 11;
                break;
            case Key.backspace:
                result = 1;
                break;
            case Key.del:
                result = 19;
                break;
            case Key.esc:
                result = 8;
                break;
            case Key.c:
                result = 32;
                break;
            case Key.v:
                result = 51;
                break;
            case Key.x:
                result = 53;
                break;
            case Key.z:
                result = 55;
                break;
            case Key.y:
                result = 54;
                break;
        }
        if (result === 0) {
            var aCode = "a".charCodeAt(0);
            var zCode = "z".charCodeAt(0);
            var ACode = "A".charCodeAt(0);
            var ZCode = "Z".charCodeAt(0);
            if (aCode <= keyCode && keyCode <= zCode) {
                result = 30 + keyCode - aCode;
            } else if (ACode <= keyCode && keyCode <= ZCode) {
                result = 30 + keyCode - ACode;
            }
        }
        return result;
    }

    function fixFormula(formula) {
        if (formula && formula[0] !== "=") {
            return "=" + formula;
        } else {
            return formula;
        }
    }

    function toSHPropertyName(name) {
        switch (name) {
            case "Location":
                return "isSelected";
            case "Size":
                return "isSelected";
            case "IsSelected":
                return "isSelected";
            default :
                return name;
        }
    }

    //</editor-fold>

    //<editor-fold desc="Spread">
    (function (spreadType) {
        // override gcspread
        spreadType.prototype.attachSpreadsheetObject = function (spreadsheetObject) {
            if (!spreadsheetObject) {
                return;
            }

            var self = this;

            self.spreadsheetObject = spreadsheetObject;

            self._doResize();

            spreadsheetObject.ActiveSheetChanging = function (sender, args) {
                self.onActiveSheetChanging.call(self, args);
            };

            spreadsheetObject.ActiveSheetChanged = function (sender, args) {
                self.onActiveSheetChanged.call(self, args);
            };

            spreadsheetObject.CellClick = function (sender, args) {
                self.onCellClick.call(self, args);
            };

            spreadsheetObject.CellDoubleClick = function (sender, args) {
                self.onCellDoubleClick.call(self, args);
            };

            spreadsheetObject.InvalidOperation = function (sender, args) {
                self.onInvalidOperation.call(self, args);
            };

            spreadsheetObject.RowHeightChanging = function (sender, args) {
                self.onRowHeightChanging.call(self, args);
            };

            spreadsheetObject.RowHeightChanged = function (sender, args) {
                self.onRowHeightChanged.call(self, args);
            };

            spreadsheetObject.ColumnWidthChanging = function (sender, args) {
                self.onColumnWidthChanging.call(self, args);
            };

            spreadsheetObject.ColumnWidthChanged = function (sender, args) {
                self.onColumnWidthChanged.call(self, args);
            };

            spreadsheetObject.ClipboardChanging = function (sender, args) {
                self.onClipboardChanging.call(self, args);
            };

            spreadsheetObject.ClipboardChanged = function (sender, args) {
                self.onClipboardChanged.call(self, args);
            };

            spreadsheetObject.ClipboardPasting = function (sender, args) {
                self.onClipboardPasting.call(self, args);
            };

            spreadsheetObject.ClipboardPasted = function (sender, args) {
                self.onClipboardPasted.call(self, args);
            };

            spreadsheetObject.EnterCell = function (sender, args) {
                self.onEnterCell.call(self, args);
            };

            spreadsheetObject.LeaveCell = function (sender, args) {
                self.onLeaveCell.call(self, args);
            };

            spreadsheetObject.SelectionChanging = function (sender, args) {
                self.onSelectionChanging.call(self, args);
            };

            spreadsheetObject.SelectionChanged = function (sender, args) {
                self.onSelectionChanged.call(self, args);
            };

            spreadsheetObject.EditStarting = function (sender, args) {
                self.onEditStarting.call(self, args);
            };

            spreadsheetObject.EditChange = function (sender, args) {
                self.onEditChange.call(self, args);
            };

            spreadsheetObject.EditEnd = function (sender, args) {
                self.onEditEnd.call(self, args);
            };

            spreadsheetObject.ValueChanged = function (sender, args) {
                self.onValueChanged.call(self, args);
            };

            spreadsheetObject.DragDropBlock = function (sender, args) {
                self.onDragDropBlock.call(self, args);
            };

            spreadsheetObject.DragDropBlockCompleted = function (sender, args) {
                self.onDragDropBlockCompleted.call(self, args);
            };

            spreadsheetObject.SheetTabClick = function (sender, args) {
                self.onSheetTabClick.call(self, args);
            };

            spreadsheetObject.SheetTabDoubleClick = function (sender, args) {
                self.onSheetTabDoubleClick.call(self, args);
            };

            spreadsheetObject.ValidationError = function (sender, args) {
                self.onValidationError.call(self, args);
            };

            spreadsheetObject.LeftColumnChanged = function (sender, args) {
                self.onLeftColumnChanged.call(self, args);
            };

            spreadsheetObject.TopRowChanged = function (sender, args) {
                self.onTopRowChanged.call(self, args);
            };

            spreadsheetObject.UserZooming = function (sender, args) {
                self.onUserZooming.call(self, args);
            };

            spreadsheetObject.UserFormulaEntered = function (sender, args) {
                self.onUserFormulaEntered.call(self, args);
            };

            spreadsheetObject.RangeGroupStateChanging = function (sender, args) {
                self.onRangeGroupStateChanging.call(self, args);
            };

            spreadsheetObject.RangeGroupStateChanged = function (sender, args) {
                self.onRangeGroupStateChanged.call(self, args);
            };

            spreadsheetObject.RangeFiltering = function (sender, args) {
                self.onRangeFiltering.call(self, args);
            };

            spreadsheetObject.RangeFiltered = function (sender, args) {
                self.onRangeFiltered.call(self, args);
            };

            spreadsheetObject.RangeSorting = function (sender, args) {
                self.onRangeSorting.call(self, args);
            };

            spreadsheetObject.RangeSorted = function (sender, args) {
                self.onRangeSorted.call(self, args);
            };

            spreadsheetObject.DragFillBlock = function (sender, args) {
                self.onDragFillBlock.call(self, args);
            };

            spreadsheetObject.DragFillBlockCompleted = function (sender, args) {
                self.onDragFillBlockCompleted.call(self, args);
            };

            spreadsheetObject.CellDataChanged = function (sender, args) {
                self.onCellDataChanged.call(self, args);
            };

            spreadsheetObject.RowDataChanged = function (sender, args) {
                self.onRowDataChanged.call(self, args);
            };

            spreadsheetObject.ColumnDataChanged = function (sender, args) {
                self.onColumnDataChanged.call(self, args);
            };

            spreadsheetObject.SpanModelChanged = function (sender, args) {
                self.onSpanModelChanged.call(self, args);
            };

            spreadsheetObject.RangeGroupDataChanged = function (sender, args) {
                self.onRangeGroupDataChanged.call(self, args);
            };

            spreadsheetObject.WorksheetPropertyChanged = function (sender, args) {
                self.onWorksheetPropertyChanged.call(self, args);
            };

            spreadsheetObject.WorkbookPropertyChanged = function (sender, args) {
                self.onWorkbookPropertyChanged.call(self, args);
            };

            spreadsheetObject.PictureChanged = function (sender, args) {
                self.onPictureChanged.call(self, args);
            };

            spreadsheetObject.PictureSelectionChanged = function (sender, args) {
                self.onPictureSelectionChanged.call(self, args);
            };

            //TODO: add for more for spreadsheetObject

            //work around for sample, after attached spread object then notify sample client to set its code.
            self._trigger("SpreadsheetObjectLoaded");
        };

        spreadType.prototype.onActiveSheetChanging = function (args) {
            var oldSheet = this.getSheetFromName(args.OldSheetName);
            var newSheet = this.getSheetFromName(args.NewSheetName);
            var eArg = {
                oldSheet: oldSheet,
                newSheet: newSheet,
                cancel: false
            };
            this._trigger($.wijmo.wijspread.Events.ActiveSheetChanging, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onActiveSheetChanged = function (args) {
            var oldSheet = this.getSheetFromName(args.OldSheetName);
            var newSheet = this.getSheetFromName(args.NewSheetName);
            this._trigger($.wijmo.wijspread.Events.ActiveSheetChanged,
                {
                    oldSheet: oldSheet,
                    newSheet: newSheet
                }
            );
        };

        spreadType.prototype.onCellClick = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.CellClick,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    sheetArea: args.SheetArea,
                    row: args.Row,
                    col: args.Column
                }
            );
        };

        spreadType.prototype.onCellDoubleClick = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.CellDoubleClick, {
                sheet: sheet,
                sheetName: sheet._name,
                sheetArea: args.SheetArea,
                row: args.Row,
                col: args.Column
            });
        };

        spreadType.prototype.onInvalidOperation = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.InvalidOperation,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    message: args.Message
                }
            );
        };

        spreadType.prototype.onRowHeightChanging = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                rowList: args.RowList,
                header: args.Header,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.RowHeightChanging, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onRowHeightChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.RowHeightChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    rowList: args.RowList,
                    header: args.Header
                }
            );
        };

        spreadType.prototype.onColumnWidthChanging = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                colList: args.ColumnList,
                header: args.Header,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.ColumnWidthChanging, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onColumnWidthChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.ColumnWidthChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    colList: args.ColumnList,
                    header: args.Header
                }
            );
        };

        spreadType.prototype.onClipboardChanging = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                copyData: args.CopyData,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.ClipboardChanging, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onClipboardChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.ClipboardChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    copyData: args.CopyData
                });
        };

        spreadType.prototype.onClipboardPasting = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                cellRange: convertToRange(args.CellRange),
                pastOption: args.PastOption,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.ClipboardPasting, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onClipboardPasted = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.ClipboardPasted,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    cellRange: convertToRange(args.CellRange),
                    pastOption: args.PastOption
                }
            );
        };

        spreadType.prototype.onEnterCell = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.EnterCell,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    row: args.Row,
                    col: args.Column
                });
        };

        spreadType.prototype.onLeaveCell = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                row: args.Row,
                col: args.Column,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.LeaveCell, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onSelectionChanging = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var t = this.spreadsheetObject;
            if (t) t.SuspendUpdating();
            try {
                var oldRanges = convertToRanges(args.OldSelections);
                var newRanges = convertToRanges(args.NewSelections);
                var sheetType = $.wijmo.wijspread.Sheet;
                bindToBaseCall(sheetType, sheet, "clearSelection")();
                if (newRanges) {
                    for (var i = 0; i < newRanges.length; i++) {
                        var cr = newRanges[i];
                        bindToBaseCall(sheetType, sheet, "addSelection")(cr.row, cr.col, cr.rowCount, cr.colCount);
                    }
                }
            } finally {
                if (t) t.ResumeUpdating();
            }

            //fixed SH issue, when clearselection, it will set activecell to (0,0)
            sheet._activeRowIndex = args.ActiveRowIndex;
            sheet._activeColIndex = args.ActiveColumnIndex;

            sheet._trigger($.wijmo.wijspread.Events.SelectionChanging,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    oldSelections: oldRanges,
                    newSelections: newRanges
                }
            );
        };

        spreadType.prototype.onSelectionChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.SelectionChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name
                }
            );
        };

        spreadType.prototype.onEditStarting = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                row: args.Row,
                col: args.Column,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.EditStarting, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onEditChange = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.EditChange,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    row: args.Row,
                    col: args.Column
                }
            );
        };

        spreadType.prototype.onEditEnd = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.EditEnd,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    row: args.Row,
                    col: args.Column
                }
            );
        };

        spreadType.prototype.onDragDropBlock = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                fromRow: args.FromRow,
                fromCol: args.FromColumn,
                toRow: args.ToRow,
                toCol: args.ToColumn,
                rowCount: args.RowCount,
                colCount: args.ColumnCount,
                copy: args.Copy,
                insert: args.Insert,
                copyOption: args.CopyOption,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.DragDropBlock, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onDragDropBlockCompleted = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var extent = new $.wijmo.wijspread.UndoRedo.DragDropExtent(
                args.FromRow
                , args.FromColumn
                , args.ToRow
                , args.ToColumn
                , args.RowCount
                , args.ColumnCount
            );

            var t = this.spreadsheetObject;
            if (t) t.SuspendUpdating();
            try {
                var action = new $.wijmo.wijspread.UndoRedo.DragDropUndoAction(sheet, extent, args.Copy, args.Insert, args.CopyOption);
                action.execute(sheet);
            } catch (e) {
                console.log(e);
            } finally {
                if (t) t.ResumeUpdating();
            }

            sheet._trigger($.wijmo.wijspread.Events.DragDropBlockCompleted, {
                sheet: sheet,
                sheetName: sheet._name,
                fromRow: args.FromRow,
                fromCol: args.FromColumn,
                toRow: args.ToRow,
                toCol: args.ToColumn,
                rowCount: args.RowCount,
                colCount: args.ColumnCount,
                copy: args.Copy,
                insert: args.Insert,
                copyOption: args.CopyOption
            });
        };

        spreadType.prototype.onSheetTabClick = function (args) {
            if (args.SheetTabIndex === -1) { //new tab
                this._trigger($.wijmo.wijspread.Events.SheetTabClick,
                    {
                        sheet: null,
                        sheetName: null,
                        sheetTabIndex: -1
                    }
                );
                var index = this.sheets ? this.sheets.length : 0;
                bindToBaseCall(spreadType, this, "addSheet")(index);

                //Fixed issue: sx, sh rename new worksheet policy is not same.
                if (this.spreadsheetObject) {
                    var t = this.spreadsheetObject;
                    var addedSheet = this.sheets[index];
                    if (addedSheet) {
                        t.SetNameFromJson(index, addedSheet.getName());
                        t.SetRowCount(addedSheet.getName(), addedSheet.getRowCount(), $.wijmo.wijspread.SheetArea.viewport);
                        t.SetColumnCount(addedSheet.getName(), addedSheet.getColumnCount(), $.wijmo.wijspread.SheetArea.viewport);
                    }
                }
                //
            } else {
                var sheet = this.getSheetFromName(args.SheetName);
                if (!sheet) return;

                this._trigger($.wijmo.wijspread.Events.SheetTabClick,
                    {
                        sheet: sheet,
                        sheetName: sheet._name,
                        sheetTabIndex: args.SheetTabIndex
                    }
                );
            }
        };

        spreadType.prototype.onSheetTabDoubleClick = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            this._trigger($.wijmo.wijspread.Events.SheetTabDoubleClick,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    sheetTabIndex: args.SheetTabIndex
                }
            );
        };

        spreadType.prototype.onValidationError = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var dv = sheet.getDataValidator(args.Row, args.Column);
            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                row: args.Row,
                col: args.Column,
                validator: dv,
                validationResult: args.ValidationResult
            };

            sheet._trigger($.wijmo.wijspread.Events.ValidationError, eArg);
            args.ValidationResult = eArg.validationResult;
        };

        spreadType.prototype.onLeftColumnChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.LeftColumnChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    oldLeftCol: args.OldIndex,
                    newLeftCol: args.NewIndex
                }
            );
        };

        spreadType.prototype.onTopRowChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.TopRowChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    oldTopRow: args.OldIndex,
                    newTopRow: args.NewIndex
                }
            );
        };

        spreadType.prototype.onUserZooming = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.UserZooming,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    oldZoomFactor: args.OldZoomFactor,
                    newZoomFactor: args.NewZoomFactor
                }
            );
        };

        spreadType.prototype.onUserFormulaEntered = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.UserFormulaEntered,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    row: args.Row,
                    col: args.Column,
                    formula: args.Formula
                }
            );
        };

        spreadType.prototype.onRangeGroupStateChanging = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                isRowGroup: args.IsRowGroup,
                index: args.Index,
                level: args.Level,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.RangeGroupStateChanging, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onRangeGroupStateChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.RangeGroupStateChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    isRowGroup: args.IsRowGroup,
                    index: args.Index,
                    level: args.Level
                }
            );
        };

        spreadType.prototype.onRangeFiltering = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                col: args.Column,
                filterValues: args.FilterValues,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.RangeFiltering, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onRangeFiltered = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.RangeFiltered,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    col: args.Column,
                    filterValues: args.FilterValues
                }
            );
        };

        spreadType.prototype.onRangeSorting = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                col: args.Column,
                ascending: args.Ascending,
                cancel: false
            };

            sheet._trigger($.wijmo.wijspread.Events.RangeSorting, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onRangeSorted = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.RangeSorted,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    col: args.Column,
                    ascending: args.Ascending
                }
            );
        };

        spreadType.prototype.onDragFillBlock = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var eArg = {
                sheet: sheet,
                sheetName: sheet._name,
                fillRange: convertToRange(args.FillRange),
                autoFillType: args.AutoFillType,
                fillDirection: args.FillDirection,
                cancel: false
            };
            sheet._trigger($.wijmo.wijspread.Events.DragFillBlock, eArg);
            args.Cancel = eArg.cancel;
        };

        spreadType.prototype.onDragFillBlockCompleted = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.DragFillBlockCompleted,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    fillRange: convertToRange(args.FillRange),
                    autoFillType: args.AutoFillType,
                    fillDirection: args.FillDirection
                }
            );
        };

        spreadType.prototype.onValueChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            sheet._trigger($.wijmo.wijspread.Events.ValueChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    row: args.Row,
                    col: args.Column
                }
            );
        };

        //<editor-fold desc="For Update SH Data">
        spreadType.prototype.onRowDataChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var sheetType = $.wijmo.wijspread.Sheet;
            var sheetArea = args.SheetArea;
            var values = args.Values;
            var row = args.Row;
            var rowCount = args.RowCount;
            var type = args.Type;

            if (type === 0) { //Updated
                if (args.Values && args.Values.length === rowCount) {
                    for (var i = 0; i < rowCount; i++) {
                        if (args.PropertyName === "Height") {
                            bindToBaseCall(sheetType, sheet, "setRowHeight")(row + i, values[i], sheetArea);
                        }
                    }
                }
            } else if (type === 1) { //RowsAdded
                //todo: as needed
            } else if (type === 2) { //RowsRemoved
                //todo: as needed
            }
        };

        spreadType.prototype.onColumnDataChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var sheetType = $.wijmo.wijspread.Sheet;
            var sheetArea = args.SheetArea;
            var values = args.Values;
            var col = args.Column;
            var colCount = args.ColumnCount;
            var type = args.Type;

            if (type === 0) {
                if (args.Values && args.Values.length === colCount) {
                    for (var i = 0; i < colCount; i++) {
                        if (args.PropertyName === "Width") {
                            bindToBaseCall(sheetType, sheet, "setColumnWidth")(col + i, values[i], sheetArea);
                        }
                    }
                }
            } else if (type === 3) { //ColumnsAdded
                //todo: as needed
            } else if (type === 4) { //ColumnsRemoved
                //todo: as needed
            }
        };

        spreadType.prototype.onCellDataChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var sheetType = $.wijmo.wijspread.Sheet;
            var row = args.Row;
            var col = args.Column;
            var sheetArea = args.SheetArea;
            var value = args.Value;

            if (args.PropertyName === "Value") {
                bindToBaseCall(sheetType, sheet, "setValue")(row, col, value, sheetArea);
                if (sheetArea === $.wijmo.wijspread.SheetArea.viewport) {
                    bindToBaseCall(sheetType, sheet, "setFormula")(row, col, args.Formula);
                }
            } else if (args.PropertyName === "Formula") {
                bindToBaseCall(sheetType, sheet, "setFormula")(row, col, value);
            } else if (args.PropertyName === "[StyleInfo]" || args.PropertyName === "Style") {
                bindToBaseCall(sheetType, sheet, "setStyle")(row, col, convertToStyle(value), sheetArea);
            } else if (args.PropertyName === "Sparkline") {
                if (value) {
                    bindToBaseCall(sheetType, sheet, "setSparkline")(
                        row
                        , col
                        , convertToRange(value.DataRange)
                        , value.DataOrientation
                        , value.Type
                        , convertToSparklineSetting(value.Setting)
                        , convertToRange(value.DateAxisRange)
                        , value.DateAxisOrientation
                    );
                } else {
                    bindToBaseCall(sheetType, sheet, "removeSparkline")(row, col);
                }
            }
        };

        spreadType.prototype.onSpanModelChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var spanModel = sheet._getSpanModel(args.SheetArea);
            if (!spanModel) {
                return;
            }

            var row = args.Row;
            var col = args.Column;
            var rowCount = args.RowCount;
            var colCount = args.ColumnCount;
            if (args.Type === 0) { // SpanAdded
                spanModel.clear(row, col, rowCount, colCount);
                var cr = new $.wijmo.wijspread.Range(row, col, rowCount, colCount);
                spanModel.push(cr);
            } else if (args.Type === 1) { //SpanRemoved
                spanModel.clear(row, col, rowCount, colCount);
            } else if (args.Type === 2 || args.Type === 3) { //2:SpanUpdated, 3:ModelUpdated
                spanModel.clear(-1, -1, -1, -1);
                var spans = convertToRanges(args.Spans);
                if (spans) {
                    for (var i = 0; i < spans.length; i++) {
                        spanModel.push(spans[i]);
                    }
                }
            }
        };

        spreadType.prototype.onRangeGroupDataChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            //update data
            if (!args.GroupInfos
                || (args.IsRowGroup && !sheet.rowRangeGroup)
                || (!args.IsRowGroup && !sheet.colRangeGroup)) {
                return;
            }
            var infos = args.GroupInfos;
            var group;
            if (args.IsRowGroup) {
                group = sheet.rowRangeGroup;
            } else {
                group = sheet.colRangeGroup;
            }
            var groupType = $.wijmo.wijspread.RangeGroup;
            for (var i = 0; i < infos.length; i++) {
                bindToBaseCall(groupType, group, "setCollapsed")(infos[i].SummaryIndex, infos[i].Collapsed);
            }
        };

        spreadType.prototype.onWorksheetPropertyChanged = function (args) {
            //handle sheet name changed
            if (args.PropertyName === "Name") {
                if (args.SheetIndex > 0 && this.sheets) {
                    var sh = this.sheets[args.SheetIndex];
                    if (sh) {
                        sh.setName(args.Value);
                    }
                }
                return;
            }

            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }

            var p = args.PropertyName;
            var v = args.Value;

            if (p === "ActiveRowIndex") {
                sheet._activeRowIndex = v;
            } else if (p === "ActiveColumnIndex") {
                sheet._activeColIndex = v;
            } else if (p === "ActiveCell") {
                sheet._activeRowIndex = v.Row;
                sheet._activeColIndex = v.Column;
            } else if (p === "Name") {
                sheet.setName(v);
            } else if (p === "DefaultRowHeight") {
                sheet.defaults.rowHeight = v;
            } else if (p === "DefaultColumnWidth") {
                sheet.defaults.colWidth = v;
            } else if (p === "DefaultRowHeaderColumnWidth") {
                sheet.defaults.rowHeaderColWidth = v;
            } else if (p === "DefaultColumnHeaderRowHeight") {
                sheet.defaults.colHeaderRowHeight = v;
            } else if (p === "ZoomFactor") {
                sheet.zoom(v);
            }
            //todo
        };

        spreadType.prototype.onWorkbookPropertyChanged = function (args) {
            var p = args.PropertyName;
            var v = args.Value;

            if (p === "ActiveSheetIndex") {
                this._activeSheetIndex = v;
            }
            //todo
        };

        spreadType.prototype.onPictureChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }
            var pictureType = $.wijmo.wijspread.Picture;
            var fo = sheet.findPicture(args.PictureName);
            if (args.PropertyName === "Size" || args.PropertyName === "Location") {
                bindToBaseCall(pictureType, fo, "position")(new $.wijmo.wijspread.Point(args.X, args.Y));
                bindToBaseCall(pictureType, fo, "width")(args.Width);
                bindToBaseCall(pictureType, fo, "height")(args.Height);
            }
            var propName = toSHPropertyName(args.PropertyName);
            sheet._trigger($.wijmo.wijspread.Events.PictureChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    picture: fo,
                    propertyName: propName
                }
            );
        };

        spreadType.prototype.onPictureSelectionChanged = function (args) {
            var sheet = this.getSheetFromName(args.SheetName);
            if (!sheet) {
                return;
            }
            var pictureType = $.wijmo.wijspread.Picture;
            var fo = sheet.findPicture(args.PictureName);
            bindToBaseCall(pictureType, fo, "isSelected")(args.IsSelected);
            sheet._trigger($.wijmo.wijspread.Events.PictureSelectionChanged,
                {
                    sheet: sheet,
                    sheetName: sheet._name,
                    picture: fo
                }
            );
        };
        //</editor-fold>

        subclass(spreadType, "addSheet", function (index, sheet) {
            bindToBaseCall(spreadType, this, "addSheet")(index, sheet);

            if (this.spreadsheetObject) {
                if (arguments.length <= 0) { // no sheet provided
                    index = this.spreadsheetObject.GetSheetCount();
                }
                var addedSheet = this.sheets[index];
                if (addedSheet) {
                    this.spreadsheetObject.AddSheet(index, addedSheet.getName(), addedSheet.getRowCount(), addedSheet.getColumnCount());
                }
                if (arguments.length >= 2) { // have both index and sheet
                    //TODO: need sync data from sheet to new SX spreadsheet
                }
            }
        });

        subclass(spreadType, "addCustomName", function (name, formula, baseRow, baseCol) {
            bindToBaseCall(spreadType, this, "addCustomName")(name, formula, baseRow, baseCol);

            // do custom action
            if (this.spreadsheetObject) {
                var t = this.spreadsheetObject;
                t.AddCustomName(name, formula, baseRow, baseCol);
            }
        });

        subclass(spreadType, "removeCustomName", function (name) {
            bindToBaseCall(spreadType, this, "removeCustomName")(name);

            // do custom action
            if (this.spreadsheetObject) {
                var t = this.spreadsheetObject;
                t.RemoveCustomName(name);
            }
        });

        subclass(spreadType, "clearCustomNames", function () {
            bindToBaseCall(spreadType, this, "clearCustomNames")();

            // do custom action
            if (this.spreadsheetObject) {
                var t = this.spreadsheetObject;
                t.ClearCustomNames();
            }
        });

        subclass(spreadType, "setActiveSheetIndex", function (index) {
            bindToBaseCall(spreadType, this, "setActiveSheetIndex")(index);

            if (this.spreadsheetObject) {
                this.spreadsheetObject.SetActiveSheetIndex(index);
            }
        });
        subclass(spreadType, "_setActiveSheetImp", function (sheet) {
            if (!this.spreadsheetObject) {
                bindToBaseCall(spreadType, this, "_setActiveSheetImp")(sheet);
            }
        });

        subclass(spreadType, "fromJSON", function (spreadData) {
            var t = this.spreadsheetObject ? this.spreadsheetObject : null;
            
	    //Get the jsonData version:schema or noneSchema.
            var jsonVersion;
            if (spreadData && spreadData.version !== undefined && !isNaN(parseFloat(spreadData.version))) {
                jsonVersion = parseFloat(spreadData.version);
            } else {
                jsonVersion = 1.0;
            }
            isNoneSchema = jsonVersion < 3.0;

            try {
                if (t) t.SuspendUpdating();
                bindToBaseCall(spreadType, this, "fromJSON")(spreadData);
            } finally {
                if (t) t.ResumeUpdating();
            }

            // do custom action
            if (t) {
                doSpreadObjectFromJSON(t, spreadData,isNoneSchema);
            }
        });

        subclass(spreadType, "allowUserZoom", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.AllowUserZoom = value;
                }
            }

            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "allowUserZoom")(value);
            } else {
                return bindToBaseCall(spreadType, this, "allowUserZoom")();
            }
        });

        subclass(spreadType, "tabStripVisible", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.SetTabStripVisible(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "tabStripVisible")(value);
            } else {
                return bindToBaseCall(spreadType, this, "tabStripVisible")();
            }
        });

        subclass(spreadType, "tabEditable", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.SetTabEditable(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "tabEditable")(value);
            } else {
                return bindToBaseCall(spreadType, this, "tabEditable")();
            }
        });

        subclass(spreadType, "newTabVisible", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.SetNewTabVisible(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "newTabVisible")(value);
            } else {
                return bindToBaseCall(spreadType, this, "newTabVisible")();
            }
        });

        subclass(spreadType, "removeSheet", function (index) {
            bindToBaseCall(spreadType, this, "removeSheet")(index);

            // do custom action
            if (this.spreadsheetObject) {
                var t = this.spreadsheetObject;
                t.RemoveSheet(index);
            }
        });

        subclass(spreadType, "clearSheets", function () {
            bindToBaseCall(spreadType, this, "clearSheets")();

            // do custom action
            if (this.spreadsheetObject) {
                var t = this.spreadsheetObject;
                t.ClearSheets();
            }
        });

        subclass(spreadType, "setSheetCount", function (count) {
            bindToBaseCall(spreadType, this, "setSheetCount")(count);

            // do custom action
            if (this.spreadsheetObject) {
                var t = this.spreadsheetObject;
                t.SetSheetCount(count);
            }
        });

        subclass(spreadType, "referenceStyle", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.SetSpreadReferenceStyle(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "referenceStyle")(value);
            } else {
                return bindToBaseCall(spreadType, this, "referenceStyle")();
            }
        });

        subclass(spreadType, "allowUndo", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.SetAllowUndo(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "allowUndo")(value);
            } else {
                return bindToBaseCall(spreadType, this, "allowUndo")();
            }
        });

        subclass(spreadType, "canUserDragDrop", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.SetCanUserDragDrop(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "canUserDragDrop")(value);
            } else {
                return bindToBaseCall(spreadType, this, "canUserDragDrop")();
            }
        });

        subclass(spreadType, "canUserDragFill", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.SetCanUserDragFill(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "canUserDragFill")(value);
            } else {
                return bindToBaseCall(spreadType, this, "canUserDragFill")();
            }
        });

        subclass(spreadType, "setTabStripRatio", function (tabStripRatio, skipRefreshScrollbar) {
            var ratio;
            if (isNaN(ratio = parseFloat(tabStripRatio))) {
                throw "ArgumentException";
            }
            if (ratio < 0) {
                this._tabStripRatio = 0;
            } else if (ratio > 1) {
                this._tabStripRatio = 1;
            } else {
                this._tabStripRatio = ratio;
            }
            this._tabStripRatioUserSet = this._tabStripRatio;//for getTabStripRatio

            // do custom action
            if (this.spreadsheetObject) {
                var t = this.spreadsheetObject;
                t.SetTabStripRatio(this.getTabStripRatio());
            }
        });

        subclass(spreadType, "repaint", function () {
            if (this.spreadsheetObject) {
                var t = this.spreadsheetObject;
                t.Invalidate();
            }
        });

        subclass(spreadType, "canUserEditFormula", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.AllowUserFormula = value;
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "canUserEditFormula")(value);
            } else {
                return bindToBaseCall(spreadType, this, "canUserEditFormula")();
            }
        });

        subclass(spreadType, "startSheetIndex", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                var t = this.spreadsheetObject;
                if (arguments.length > 0) {
                    t.StartSheetIndex = value;
                    return this;
                } else {
                    return t.StartSheetIndex;
                }
            }
        });

        subclass(spreadType, "_dispose", function () {
            //Silverlight have itself dispose policy, not care in javascript
        });

        subclass(spreadType, "highlightInvalidData", function (value) {
            // do custom action
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.HighlightInvalidData = value;
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "highlightInvalidData")(value);
            } else {
                return bindToBaseCall(spreadType, this, "highlightInvalidData")();
            }
        });

        subclass(spreadType, "showHorizontalScrollbar", function (value) {
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.ShowHorizontalScrollbar(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "showHorizontalScrollbar")(value);
            } else {
                return bindToBaseCall(spreadType, this, "showHorizontalScrollbar")();
            }
        });

        subclass(spreadType, "showVerticalScrollbar", function (value) {
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.ShowVerticalScrollbar(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "showVerticalScrollbar")(value);
            } else {
                return bindToBaseCall(spreadType, this, "showVerticalScrollbar")();
            }
        });

        subclass(spreadType, "showScrollTip", function (value) {
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.ShowScrollTip(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "showScrollTip")(value);
            } else {
                return bindToBaseCall(spreadType, this, "showScrollTip")();
            }
        });

        subclass(spreadType, "showResizeTip", function (value) {
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.ShowResizeTip(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "showResizeTip")(value);
            } else {
                return bindToBaseCall(spreadType, this, "showResizeTip")();
            }
        });

        subclass(spreadType, "showDragDropTip", function (value) {
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.ShowDragDropTip(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "showDragDropTip")(value);
            } else {
                return bindToBaseCall(spreadType, this, "showDragDropTip")();
            }
        });

        subclass(spreadType, "showDragFillTip", function (value) {
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.ShowDragFillTip(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "showDragFillTip")(value);
            } else {
                return bindToBaseCall(spreadType, this, "showDragFillTip")();
            }
        });

        subclass(spreadType, "grayAreaBackColor", function (value) {
            if (this.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.spreadsheetObject;
                    t.GrayAreaBackColor(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(spreadType, this, "grayAreaBackColor")(value);
            } else {
                return bindToBaseCall(spreadType, this, "grayAreaBackColor")();
            }
        });

        subclass(spreadType, "addNamedStyle", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(spreadType, this, "addNamedStyle");
            } else {
                if (this.parent && this.spreadsheetObject) {
                    var t = this.spreadsheetObject;
                    t.AddNamedStyle(value);
                }
                return bindToBaseCall(spreadType, this, "addNamedStyle")(value);
            }
        });

        subclass(spreadType, "removeNamedStyle", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(spreadType, this, "removeNamedStyle");
            } else {
                if (this.parent && this.spreadsheetObject) {
                    var t = this.spreadsheetObject;
                    t.RemoveNamedStyle(this.getName(), value);
                }
                return bindToBaseCall(spreadType, this, "removeNamedStyle")(value);
            }
        });


    })($.wijmo.wijspread.Spread);
    //</editor-fold>

    //<editor-fold desc="Sheet">
    (function (sheetType) {
        // override gcssheet
        subclass(sheetType, "setStyle", function (row, col, value, sheetArea) {
            bindToBaseCall(sheetType, this, "setStyle")(row, col, value, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }

                var t = this.parent.spreadsheetObject;
                t.SetStyle(this.getName(), row, col, value, sheetArea);
            }
        });

        subclass(sheetType, "setValue", function (row, col, value, sheetArea, ignoreRecalc) {
            bindToBaseCall(sheetType, this, "setValue")(row, col, value, sheetArea, ignoreRecalc);

            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }

                var t = this.parent.spreadsheetObject;
                var v = value;
                if (value instanceof Number) {
                    v = value.valueOf();
                } else if (value instanceof Date) {
                    v = "/Date(" + value.valueOf() + ")/";
                }
                t.SetValue(this.getName(), row, col, v, sheetArea);
            }
        });

        subclass(sheetType, "setText", function (row, col, text, sheetArea) {
            bindToBaseCall(sheetType, this, "setText")(row, col, text, sheetArea);

            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }

                var t = this.parent.spreadsheetObject;
                t.SetText(this.getName(), row, col, text, sheetArea);
            }
        });

        subclass(sheetType, "setFormula", function (row, col, value, sheetArea) {
            bindToBaseCall(sheetType, this, "setFormula")(row, col, value, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                if (sheetArea === $.wijmo.wijspread.SheetArea.viewport || sheetArea === null || sheetArea === undefined) {
                    t.SetFormula(this.getName(), row, col, value);
                }
            }
        });

        subclass(sheetType, "addCustomName", function (name, formula, baseRow, baseCol) {
            bindToBaseCall(sheetType, this, "addCustomName")(name, formula, baseRow, baseCol);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.AddCustomName(this.getName(), name, formula, baseRow, baseCol);
            }
        });

        subclass(sheetType, "removeCustomName", function (name) {
            bindToBaseCall(sheetType, this, "removeCustomName")(name);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.RemoveCustomName(this.getName(), name);
            }
        });

        subclass(sheetType, "clearCustomNames", function () {
            bindToBaseCall(sheetType, this, "clearCustomNames")();

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.ClearCustomNames(this.getName());
            }
        });

        subclass(sheetType, "sortRange", function (row, column, rowCount, columnCount, byRows, sortInfo) {
            var result = bindToBaseCall(sheetType, this, "sortRange")(row, column, rowCount, columnCount, byRows, sortInfo);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                for (var i = 0; i < sortInfo.length;) {
                    var info = sortInfo[i];
                    if (info) {
                        var index = info.index;
                        if ((byRows && (index < column || index >= column + columnCount)) ||
                            (!byRows && (index < row || index >= row + rowCount))) {
                            sortInfo.splice(i, 1);
                        } else {
                            i++;
                        }
                    } else {
                        sortInfo.splice(i, 1);
                    }
                }
                if (sortInfo.length > 0) {
                    t.SortRange(this.getName(), row, column, rowCount, columnCount, byRows, sortInfo);
                }
            }

            return result;
        });

        subclass(sheetType, "fromJSON", function (sheetData) {
            //first forbit to update data to sx
            var t = (this.parent ? this.parent.spreadsheetObject : null);
            try {
                if (t) t.SuspendUpdating();
                //The sheet's "fromJSON()" method of has an extra parameter "setFormulaDirectly"(boolean),and it should be "false" in there. 
                bindToBaseCall(sheetType, this, "fromJSON")(sheetData,false,isNoneSchema);
            } finally {
                if (t) t.ResumeUpdating();
            }

            //do custom action
            if (t) {
                doSheetObjectFromJSON(t, sheetData,isNoneSchema);
            }
        });

        // API for invoke from JS
        subclass(sheetType, "addSpan", function (row, col, rowCount, colCount, sheetArea) {
            bindToBaseCall(sheetType, this, "addSpan")(row, col, rowCount, colCount, sheetArea);

            //sync data to spreadsheetObject
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === null || sheetArea === undefined) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                } else if (sheetArea === $.wijmo.wijspread.SheetArea.corner) {
                    return;
                }
                if (col === -1) {
                    col = 0;
                    colCount = this.getColumnCount(sheetArea);
                }
                if (row === -1) {
                    row = 0;
                    rowCount = this.getRowCount(sheetArea);
                }
                this.parent.spreadsheetObject.AddSpan(this.getName(), row, col, rowCount, colCount, sheetArea);
            }
        });
        subclass(sheetType, "removeSpan", function (row, col, sheetArea) {
            bindToBaseCall(sheetType, this, "removeSpan")(row, col, sheetArea);

            //sync data to spreadsheetObject
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === null || sheetArea === undefined) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                this.parent.spreadsheetObject.RemoveSpan(this.getName(), row, col, sheetArea);
            }
        });

        subclass(sheetType, "setActiveCell", function (row, col, rowViewportIndex, colViewportIndex) {
            bindToBaseCall(sheetType, this, "setActiveCell")(row, col, rowViewportIndex, colViewportIndex);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetActiveCell(this.getName(), row, col);
            }
        });

        subclass(sheetType, "reset", function () {
            bindToBaseCall(sheetType, this, "reset")();
            //set for sync rangegroup data to sx silverlight
            if (this.rowRangeGroup) {
                this.rowRangeGroup._worksheet = this;
                this.rowRangeGroup._isRowGroup = true;
            }
            if (this.colRangeGroup) {
                this.colRangeGroup._worksheet = this;
                this.colRangeGroup._isRowGroup = false;
            }

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.ResetSheet(this.getName());
            }
        });

        subclass(sheetType, "setSparkline", function (row, col, dataRange, dataOrientation, sparklineType, sparklineSetting, dateAxisRange, dateAxisOrientation) {
            var sp = bindToBaseCall(sheetType, this, "setSparkline")(row, col, dataRange, dataOrientation, sparklineType, sparklineSetting, dateAxisRange, dateAxisOrientation);
            sp._worksheet = this;

            //do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetSparkline(this.getName(), row, col, dataRange, dataOrientation, sparklineType, sparklineSetting, dateAxisRange, dateAxisOrientation);
            }
            return sp;
        });

        subclass(sheetType, "removeSparkline", function (row, col) {
            bindToBaseCall(sheetType, this, "removeSparkline")(row, col);

            //do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                this.parent.spreadsheetObject.RemoveSparkline(this.getName(), row, col);
            }
        });

        subclass(sheetType, "groupSparkline", function (sparklines) {
            bindToBaseCall(sheetType, this, "groupSparkline")(sparklines);

            var ret = new Array();
            //do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                for (var i = 0; i < sparklines.length; i++) {
                    var obj = { row: sparklines[i].row, column: sparklines[i].column };
                    ret.push(obj);
                }

                this.parent.spreadsheetObject.GroupSparkline(this.getName(), ret);
            }
        });

        subclass(sheetType, "ungroupSparkline", function (group) {
            //call base
            var sparkline = null;
            if (group._innerList && group._innerList.length > 0) {
                sparkline = group._innerList[0];
            }

            bindToBaseCall(sheetType, this, "ungroupSparkline")(group);

            //do custom action
            if (sparkline && this.parent && this.parent.spreadsheetObject) {
                this.parent.spreadsheetObject.UngroupSparkline(this.getName(), sparkline.row, sparkline.column);
            }
        });

        subclass(sheetType, "referenceStyle", function (value) {
            var ret;
            if (arguments.length > 0) {
                ret = bindToBaseCall(sheetType, this, "referenceStyle")(value);
            } else {
                ret = bindToBaseCall(sheetType, this, "referenceStyle")();
            }

            // do custom action
            if (this.parent.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.parent.spreadsheetObject;
                    t.SetSheetReferenecStyle(this.getName(), value);
                }
            }

            return ret;
        });

        subclass(sheetType, "recalcAll", function () {
            bindToBaseCall(sheetType, this, "recalcAll")();

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.ReCalcAll(this.getName());
            }
        });

        subclass(sheetType, "setName", function (name) {
            var oldName = this.getName();
            bindToBaseCall(sheetType, this, "setName")(name);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetName(oldName, this.getName());
            }
        });

        subclass(sheetType, "allowCellOverflow", function (value) {
            var ret;
            if (arguments.length > 0) {
                ret = bindToBaseCall(sheetType, this, "allowCellOverflow")(value);
            } else {
                ret = bindToBaseCall(sheetType, this, "allowCellOverflow")();
            }

            // do custom action
            if (this.parent.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.parent.spreadsheetObject;
                    t.CanCellOverflow = value;
                }
            }

            return ret;
        });

        subclass(sheetType, "allowUndo", function (value) {
            var ret;
            if (arguments.length > 0) {
                ret = bindToBaseCall(sheetType, this, "allowUndo")(value);
            } else {
                ret = bindToBaseCall(sheetType, this, "allowUndo")();
            }

            // do custom action
            if (this.parent.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.parent.spreadsheetObject;
                    t.SetAllowUndo(value);
                }
            }

            return ret;
        });

        subclass(sheetType, "addRows", function (row, count) {
            bindToBaseCall(sheetType, this, "addRows")(row, count);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.AddRows(this.getName(), row, count);
            }
        });

        subclass(sheetType, "deleteRows", function (row, count) {
            bindToBaseCall(sheetType, this, "deleteRows")(row, count);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.DeleteRows(this.getName(), row, count);
            }
        });

        subclass(sheetType, "addColumns", function (col, count) {
            bindToBaseCall(sheetType, this, "addColumns")(col, count);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.AddColumns(this.getName(), col, count);
            }
        });

        subclass(sheetType, "deleteColumns", function (col, count) {
            bindToBaseCall(sheetType, this, "deleteColumns")(col, count);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.DeleteColumns(this.getName(), col, count);
            }
        });

        subclass(sheetType, "setFrozenCount", function (rowCount, colCount) {
            bindToBaseCall(sheetType, this, "setFrozenCount")(rowCount, colCount);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetFrozenCount(this.getName(), rowCount, colCount);
            }
        });

        subclass(sheetType, "setFrozenRowCount", function (rowCount) {
            bindToBaseCall(sheetType, this, "setFrozenRowCount")(rowCount);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetFrozenRowCount(this.getName(), rowCount);
            }
        });

        subclass(sheetType, "setFrozenColumnCount", function (colCount) {
            bindToBaseCall(sheetType, this, "setFrozenColumnCount")(colCount);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetFrozenColumnCount(this.getName(), colCount);
            }
        });

        subclass(sheetType, "setFrozenTrailingRowCount", function (rowCount) {
            bindToBaseCall(sheetType, this, "setFrozenTrailingRowCount")(rowCount);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetFrozenTrailingRowCount(this.getName(), rowCount);
            }
        });

        subclass(sheetType, "setFrozenTrailingColumnCount", function (colCount) {
            bindToBaseCall(sheetType, this, "setFrozenTrailingColumnCount")(colCount);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetFrozenTrailingColumnCount(this.getName(), colCount);
            }
        });

        subclass(sheetType, "setRowCount", function (rowCount, sheetArea) {
            bindToBaseCall(sheetType, this, "setRowCount")(rowCount, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                t.SetRowCount(this.getName(), rowCount, sheetArea);
            }
        });

        subclass(sheetType, "setColumnCount", function (colCount, sheetArea) {
            bindToBaseCall(sheetType, this, "setColumnCount")(colCount, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                t.SetColumnCount(this.getName(), colCount, sheetArea);
            }
        });

        subclass(sheetType, "setDefaultStyle", function (style, sheetArea) {
            bindToBaseCall(sheetType, this, "setDefaultStyle")(style, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }

                var t = this.parent.spreadsheetObject;
                t.SetDefaultStyle(this.getName(), style, sheetArea);
            }
        });

        subclass(sheetType, "addSelection", function (row, column, rowCount, columnCount) {
            bindToBaseCall(sheetType, this, "addSelection")(row, column, rowCount, columnCount);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.AddSelection(this.getName(), row, column, rowCount, columnCount);
            }
        });

        subclass(sheetType, "clearSelection", function () {
            bindToBaseCall(sheetType, this, "clearSelection")();

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.ClearSelection(this.getName());
            }
        });

        subclass(sheetType, "setRowResizable", function (row, value, sheetArea) {
            bindToBaseCall(sheetType, this, "setRowResizable")(row, value, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                var t = this.parent.spreadsheetObject;
                t.SetRowResizable(this.getName(), row, value, sheetArea);
            }
        });

        subclass(sheetType, "setColumnResizable", function (col, value, sheetArea) {
            bindToBaseCall(sheetType, this, "setColumnResizable")(col, value, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                var t = this.parent.spreadsheetObject;
                t.SetColumnResizable(this.getName(), col, value, sheetArea);
            }
        });

        subclass(sheetType, "setRowHeight", function (row, value, sheetArea) {
            bindToBaseCall(sheetType, this, "setRowHeight")(row, value, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                var t = this.parent.spreadsheetObject;
                t.SetRowHeight(this.getName(), row, value, sheetArea);
            }
        });

        subclass(sheetType, "setRowVisible", function (row, value, sheetArea) {
            bindToBaseCall(sheetType, this, "setRowVisible")(row, value, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                var t = this.parent.spreadsheetObject;
                t.SetRowVisible(this.getName(), row, value, sheetArea);
            }
        });

        subclass(sheetType, "setColumnWidth", function (col, value, sheetArea) {
            bindToBaseCall(sheetType, this, "setColumnWidth")(col, value, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                var t = this.parent.spreadsheetObject;
                t.SetColumnWidth(this.getName(), col, value, sheetArea);
            }
        });

        subclass(sheetType, "setColumnVisible", function (col, value, sheetArea) {
            bindToBaseCall(sheetType, this, "setColumnVisible")(col, value, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                var t = this.parent.spreadsheetObject;
                t.SetColumnVisible(this.getName(), col, value, sheetArea);
            }
        });

        subclass(sheetType, "zoom", function (factor) {
            bindToBaseCall(sheetType, this, "zoom")(factor);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.Zoom(this.getName(), this._zoomFactor);
            }
        });

        subclass(sheetType, "setBorder", function (cellRange, border, option, sheetArea) {
            bindToBaseCall(sheetType, this, "setBorder")(cellRange, border, option, sheetArea);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (sheetArea === undefined || sheetArea === null) {
                    sheetArea = $.wijmo.wijspread.SheetArea.viewport;
                }
                var t = this.parent.spreadsheetObject;
                var op = 0;
                if (option) {
                    if (option.top) {
                        op |= 1;
                    }
                    if (option.left) {
                        op |= 2;
                    }
                    if (option.right) {
                        op |= 4;
                    }
                    if (option.bottom) {
                        op |= 8;
                    }
                    if (option.outline) {
                        op |= 15;
                    }
                    if (option.innerVertical) {
                        op |= 16;
                    }
                    if (option.innerHorizontal) {
                        op |= 32;
                    }
                    if (option.inside) {
                        op |= 48;
                    }
                    if (option.all) {
                        op |= 63;
                    }
                } else {
                    op = 63;
                }
                t.SetBorder(this.getName(), cellRange, border, op, sheetArea);
            }
        });

        subclass(sheetType, "currentTheme", function (value) {
            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.parent.spreadsheetObject;
                    var name = value;
                    if (value instanceof $.wijmo.wijspread.SpreadTheme) {
                        name = value.name();
                    }
                    t.CurrentThemeName = name;
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(sheetType, this, "currentTheme")(value);
            } else {
                return bindToBaseCall(sheetType, this, "currentTheme")();
            }
        });

        subclass(sheetType, "clipBoardOptions", function (value) {
            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.parent.spreadsheetObject;
                    t.ClipBoardOptions = value;
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(sheetType, this, "clipBoardOptions")(value);
            } else {
                return bindToBaseCall(sheetType, this, "clipBoardOptions")();
            }
        });

        subclass(sheetType, "setCsv", function (row, column, text, rowDelimiter, columnDelimiter, flags) {
            bindToBaseCall(sheetType, this, "setCsv")(row, column, text, rowDelimiter, columnDelimiter, flags);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetCsv(this.getName(), row, column, text, rowDelimiter, columnDelimiter, "\"", flags);
            }
        });

        subclass(sheetType, "fillAuto", function (startRange, wholeRange, series) {
            bindToBaseCall(sheetType, this, "fillAuto")(startRange, wholeRange, series);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.FillAuto(this.getName(), startRange, wholeRange, series);
            }
        });

        subclass(sheetType, "fillAutobyDirection", function (startRange, wholeRange, direction) {
            bindToBaseCall(sheetType, this, "fillAutobyDirection")(startRange, wholeRange, direction);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.FillAutoByDirection(this.getName(), startRange, wholeRange, direction);
            }
        });

        subclass(sheetType, "fillLinear", function (startRange, wholeRange, series, step, stop) {
            bindToBaseCall(sheetType, this, "fillLinear")(startRange, wholeRange, series, step, stop);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.FillLinear(this.getName(), startRange, wholeRange, series, step, stop);
            }
        });

        subclass(sheetType, "fillGrowth", function (startRange, wholeRange, series, step, stop) {
            bindToBaseCall(sheetType, this, "fillGrowth")(startRange, wholeRange, series, step, stop);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.FillGrowth(this.getName(), startRange, wholeRange, series, step, stop);
            }
        });

        subclass(sheetType, "fillDate", function (startRange, wholeRange, series, unit, step, stop) {
            bindToBaseCall(sheetType, this, "fillDate")(startRange, wholeRange, series, unit, step, stop);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var v = stop;
                if (stop instanceof Date) {
                    v = stop.toDateString();
                }
                t.FillDate(this.getName(), startRange, wholeRange, series, unit, step, v);
            }
        });

        subclass(sheetType, "clear", function (row, column, rowCount, columnCount, area, type) {
            bindToBaseCall(sheetType, this, "clear")(row, column, rowCount, columnCount, area, type);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                if (area === undefined || area === null) {
                    area = $.wijmo.wijspread.SheetArea.viewport;
                }
                if (type === undefined || type === null) {
                    type = 0;
                }
                t.Clear(this.getName(), row, column, rowCount, columnCount, area, type);
            }
        });

        subclass(sheetType, "addKeyMap", function (keyCode, ctrl, shift, alt, action) {
            bindToBaseCall(sheetType, this, "addKeyMap")(keyCode, ctrl, shift, alt, action);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.AddKeyMap(convertKeyCode(keyCode), ctrl, shift, alt, action._name);
            }
        });

        subclass(sheetType, "removeKeyMap", function (keyCode, ctrl, shift, alt, action) {
            bindToBaseCall(sheetType, this, "removeKeyMap")(keyCode, ctrl, shift, alt, action);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.RemoveKeyMap(convertKeyCode(keyCode), ctrl, shift, alt);
            }
        });

        subclass(sheetType, "showCell", function (row, col, verticalPosition, horizontalPosition) {
            bindToBaseCall(sheetType, this, "showCell")(row, col, verticalPosition, horizontalPosition);

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var activeSheet = this.parent.getActiveSheet();
                if (activeSheet && this.getName() === activeSheet.getName()) {
                    t.ShowCell(row, col, verticalPosition, horizontalPosition);
                }
            }
        });

        subclass(sheetType, "canUserDragDrop", function (value) {
            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.parent.spreadsheetObject;
                    t.SetCanUserDragDrop(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(sheetType, this, "canUserDragDrop")(value);
            } else {
                return bindToBaseCall(sheetType, this, "canUserDragDrop")();
            }
        });

        subclass(sheetType, "canUserDragFill", function (value) {
            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.parent.spreadsheetObject;
                    t.SetCanUserDragFill(value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(sheetType, this, "canUserDragFill")(value);
            } else {
                return bindToBaseCall(sheetType, this, "canUserDragFill")();
            }
        });

        subclass(sheetType, "isEditing", function () {
            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var activeSheet = this.parent.getActiveSheet();
                if (activeSheet && this.getName() === activeSheet.getName()) {
                    return t.IsEditing();
                }
            }
            return false;
        });

        subclass(sheetType, "startEdit", function (selectAll, defaultText) {
            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                if (!selectAll) {
                    selectAll = false;
                }
                var activeSheet = this.parent.getActiveSheet();
                if (activeSheet && this.getName() === activeSheet.getName()) {
                    if (arguments.length < 2) {
                        t.StartEdit(selectAll);
                    } else {
                        t.StartEditWithDefaultText(selectAll, defaultText);
                    }
                }
            }
        });

        subclass(sheetType, "endEdit", function (ignoreValueChange) {
            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                if (!ignoreValueChange) {
                    ignoreValueChange = false;
                }
                var activeSheet = this.parent.getActiveSheet();
                if (activeSheet && this.getName() === activeSheet.getName()) {
                    t.EndEdit(ignoreValueChange);
                }
            }
        });

        subclass(sheetType, "getViewportHeight", function (rowViewportIndex) {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var vpIndex = rowViewportIndex - 1;
                return t.GetViewportHeight(this.getName(), vpIndex);
            }
            return 0;
        });

        subclass(sheetType, "getViewportTopRow", function (rowViewportIndex) {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var vpIndex = rowViewportIndex - 1;
                return t.GetViewportTopRow(this.getName(), vpIndex);
            }
            return -1;
        });

        subclass(sheetType, "getViewportBottomRow", function (rowViewportIndex) {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var vpIndex = rowViewportIndex - 1;
                return t.GetViewportBottomRow(this.getName(), vpIndex);
            }
            return -1;
        });

        subclass(sheetType, "getViewportWidth ", function (colViewportIndex) {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var vpIndex = colViewportIndex - 1;
                return t.GetViewportWidth(this.getName(), vpIndex);
            }
            return 0;
        });

        subclass(sheetType, "getViewportLeftColumn", function (colViewportIndex) {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var vpIndex = colViewportIndex - 1;
                return t.GetViewportLeftColumn(this.getName(), vpIndex);
            }
            return -1;
        });

        subclass(sheetType, "getViewportRightColumn", function (colViewportIndex) {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var vpIndex = colViewportIndex - 1;
                return t.GetViewportRightColumn(this.getName(), vpIndex);
            }
            return -1;
        });

        subclass(sheetType, "copyTo", function (fromRow, fromColumn, toRow, toColumn, rowCount, columnCount, option) {
            var t;
            if (this.parent && this.parent.spreadsheetObject) {
                t = this.parent.spreadsheetObject;
            }
            try {
                if (t) {
                    t.SuspendUpdating();
                }
                bindToBaseCall(sheetType, this, "copyTo")(fromRow, fromColumn, toRow, toColumn, rowCount, columnCount,
                    option);
            } finally {
                if (t) {
                    t.ResumeUpdating();
                }
            }

            if (t) {
                if (!option) {
                    option = 0;
                }
                t.CopyTo(this.getName(), fromRow, fromColumn, toRow, toColumn, rowCount, columnCount, option);
            }
        });

        subclass(sheetType, "moveTo", function (fromRow, fromColumn, toRow, toColumn, rowCount, columnCount, option) {
            var t;
            if (this.parent && this.parent.spreadsheetObject) {
                t = this.parent.spreadsheetObject;
            }
            try {
                if (t) {
                    t.SuspendUpdating();
                }
                bindToBaseCall(sheetType, this, "moveTo")(fromRow, fromColumn, toRow, toColumn, rowCount, columnCount,
                    option);
            } finally {
                if (t) {
                    t.ResumeUpdating();
                }
            }

            if (t) {
                if (!option) {
                    option = 0;
                }
                t.MoveTo(this.getName(), fromRow, fromColumn, toRow, toColumn, rowCount, columnCount, option);
            }
        });

        subclass(sheetType, "suspendCalcService", function () {
            bindToBaseCall(sheetType, this, "suspendCalcService")();

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SuspendCalcService(this.getName());
            }
        });

        subclass(sheetType, "resumeCalcService", function () {
            bindToBaseCall(sheetType, this, "resumeCalcService")();

            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.ResumeCalcService(this.getName());
            }
        });

        subclass(sheetType, "isPaintSuspended", function (value) {
            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                if (arguments.length > 0) {
                    if (value === true) {
                        t.SuspendAutoRefresh();
                    } else if (value === false) {
                        t.ResumeAutoRefresh();
                    }
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(sheetType, this, "isPaintSuspended")(value);
            } else {
                return bindToBaseCall(sheetType, this, "isPaintSuspended")();
            }
        });

        subclass(sheetType, "repaint", function () {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.InvalidateSheet(this.getName());
            }
        });

        subclass(sheetType, "rowFilter", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "rowFilter")();
            } else {
                var ret = bindToBaseCall(sheetType, this, "rowFilter")(value);

                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    t.SetRowFilter(this.getName(), (value ? value.range : null));
                }

                return ret;
            }
        });

        subclass(sheetType, "autoFitColumn", function (column) {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.AutoFitColumn(this.getName(), column);
            }
        });

        subclass(sheetType, "autoFitRow", function (row) {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.AutoFitRow(this.getName(), row);
            }
        });

        subclass(sheetType, "setGridlineOptions", function (options) {
            bindToBaseCall(sheetType, this, "setGridlineOptions")(options);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var color = "", showVerticalGridline = true, showHorizontalGridline = true;
                if (options) {
                    if (options.color) {
                        color = options.color;
                    }
                    if (options.showVerticalGridline !== null && options.showVerticalGridline !== undefined) {
                        showVerticalGridline = options.showVerticalGridline;
                    }
                    if (options.showHorizontalGridline !== null && options.showHorizontalGridline !== undefined) {
                        showHorizontalGridline = options.showHorizontalGridline;
                    }
                }
                t.SetGridlineOptions(this.getName(), color, showVerticalGridline, showHorizontalGridline);
            }
        });

        subclass(sheetType, "setRowHeaderVisible", function (visible) {
            bindToBaseCall(sheetType, this, "setRowHeaderVisible")(visible);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetRowHeaderVisible(this.getName(), visible);
            }
        });

        subclass(sheetType, "setColumnHeaderVisible", function (visible) {
            bindToBaseCall(sheetType, this, "setColumnHeaderVisible")(visible);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetColumnHeaderVisible(this.getName(), visible);
            }
        });

        subclass(sheetType, "setRowHeaderAutoText", function (autoText) {
            bindToBaseCall(sheetType, this, "setRowHeaderAutoText")(autoText);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetRowHeaderAutoText(this.getName(), autoText);
            }
        });

        subclass(sheetType, "setColumnHeaderAutoText", function (autoText) {
            bindToBaseCall(sheetType, this, "setColumnHeaderAutoText")(autoText);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetColHeaderAutoText(this.getName(), autoText);
            }
        });

        subclass(sheetType, "setRowHeaderAutoTextIndex", function (autoTextIndex) {
            bindToBaseCall(sheetType, this, "setRowHeaderAutoTextIndex")(autoTextIndex);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetRowHeaderAutoTextIndex(this.getName(), autoTextIndex);
            }
        });

        subclass(sheetType, "setColumnHeaderAutoTextIndex", function (autoTextIndex) {
            bindToBaseCall(sheetType, this, "setColumnHeaderAutoTextIndex")(autoTextIndex);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetColHeaderAutoTextIndex(this.getName(), autoTextIndex);
            }
        });

        subclass(sheetType, "setIsProtected", function (isProtected) {
            bindToBaseCall(sheetType, this, "setIsProtected")(isProtected);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.SetSheetProtected(this.getName(), isProtected);
            }
        });

        subclass(sheetType, "sheetTabColor", function (value) {
            // do custom action
            if (this.parent && this.parent.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.parent.spreadsheetObject;
                    t.SetSheetTabColor(this.getName(), value);
                }
            }
            if (arguments.length > 0) {
                return bindToBaseCall(sheetType, this, "sheetTabColor")(value);
            } else {
                return bindToBaseCall(sheetType, this, "sheetTabColor")();
            }
        });

        subclass(sheetType, "showRowRangeGroup", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "showRowRangeGroup")();
            } else {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    t.ShowRowRangeGroup = value;
                }

                return bindToBaseCall(sheetType, this, "showRowRangeGroup")(value);
            }
        });

        subclass(sheetType, "showColumnRangeGroup", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "showColumnRangeGroup")();
            } else {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    t.ShowColumnRangeGroup = value;
                }

                return bindToBaseCall(sheetType, this, "showColumnRangeGroup")(value);
            }
        });

        subclass(sheetType, "editorStatus", function () {
            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                if (this === this.parent.getActiveSheet()) {
                    return t.GetEditorStatus();
                }
            }
            return $.wijmo.wijspread.EditorStatus.Ready;
        });

        subclass(sheetType, "selectionPolicy", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "selectionPolicy")();
            } else {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    t.SetSelectionPolicy(this.getName(), value);
                }
                return bindToBaseCall(sheetType, this, "selectionPolicy")(value);
            }
        });

        subclass(sheetType, "selectionUnit", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "selectionUnit")();
            } else {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    t.SetSelectionUnit(this.getName(), value);
                }
                return bindToBaseCall(sheetType, this, "selectionUnit")(value);
            }
        });

        subclass(sheetType, "addTable", function (name, row, column, rowCount, columnCount, style) {
            var table = bindToBaseCall(sheetType, this, "addTable")(name, row, column, rowCount, columnCount, style);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.AddTable(this.getName(), name, row, column, rowCount, columnCount, table.style());
            }
            return table;
        });

        subclass(sheetType, "addTableByDataSource", function (name, row, column, dataSource, style) {
            var table = bindToBaseCall(sheetType, this, "addTableByDataSource")(name, row, column, dataSource, style);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                var cr = table.range();
                t.AddTable(this.getName(), table.name(), cr.row, cr.col, cr.rowCount, cr.colCount, table.style());
            }
            return table;
        });

        subclass(sheetType, "removeTable", function (table) {
            var ret = bindToBaseCall(sheetType, this, "removeTable")(table);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.RemoveTable(this.getName(), table.name());
            }
            return ret;
        });

        subclass(sheetType, "moveTable", function (table, row, column) {
            var ret;
            var t;
            if (this.parent && this.parent.spreadsheetObject) {
                t = this.parent.spreadsheetObject;
            }
            try {
                if (t) {
                    t.SuspendUpdating();
                }
                ret = bindToBaseCall(sheetType, this, "moveTable")(table, row, column);
            } finally {
                if (t) {
                    t.ResumeUpdating();
                }
            }

            if (t) {
                t.MoveTable(this.getName(), table.name(), row, column);
            }
            return ret;
        });

        subclass(sheetType, "resizeTable", function (table, rowCount, columnCount) {
            var ret = bindToBaseCall(sheetType, this, "resizeTable")(table, rowCount, columnCount);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.ResizeTable(this.getName(), table.name(), rowCount, columnCount);
            }
            return ret;
        });

        subclass(sheetType, "selectionBackColor", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "selectionBackColor");
            } else {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    t.SelectionBackColor(this.getName(), value);
                }
                return bindToBaseCall(sheetType, this, "selectionBackColor")(value);
            }
        })

        subclass(sheetType, "selectionBorderColor", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "selectionBorderColor");
            } else {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    t.SelectionBorderColor(this.getName(), value);
                }
                return bindToBaseCall(sheetType, this, "selectionBorderColor")(value);
            }
        })

        subclass(sheetType, "addNamedStyle", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "addNamedStyle");
            } else {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    t.AddNamedStyle(this.getName(), value);
                }
                return bindToBaseCall(sheetType, this, "addNamedStyle")(value);
            }
        });

        subclass(sheetType, "removeNamedStyle", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "removeNamedStyle");
            } else {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    t.RemoveNamedStyle(this.getName(), value);
                }
                return bindToBaseCall(sheetType, this, "removeNamedStyle")(value);
            }
        });

        subclass(sheetType, "setStyleObject", function (row, col, style, sheetArea) {
            if (arguments.length === 0) {
                return bindToBaseCall(sheetType, this, "setStyleObject");
            } else {
                if (style === undefined || style === null) {
                    return;
                }

                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    if (sheetArea !== undefined && sheetArea !== null) {
                        if (typeof (style) === 'string') {
                            t.SetStyleNameArea(this.getName(), row, col, sheetArea, style);
                        }
                        if (typeof (style) === 'object') {
                            t.SetStyle(this.getName(), row, col, style, sheetArea);
                        }
                        return bindToBaseCall(sheetType, this, "setStyleObject")(row, col, style, sheetArea);
                    } else {
                        if (typeof (style) === 'string') {
                            t.SetStyleName(this.getName(), row, col, style);
                        }
                        if (typeof (style) === 'object') {
                            t.SetStyle(this.getName(), row, col, style, $.wijmo.wijspread.SheetArea.viewport);
                        }
                        return bindToBaseCall(sheetType, this, "setStyleObject")(row, col, style);
                    }
                }

            }
        });

        //add for avoiding the bug which extends from array.
        subclass(sheetType, "getSelections", function () {
            if ($.browser.msie && (typeof document.documentMode === 'undefined' || document.documentMode == 7)) {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    var ret = [];
                    var selections = t.GetSelections(this.getName());
                    if (selections) {
                        for (var index = 0; index < selections.length; index++) {
                            var selection = selections[index];
                            ret.push(new $.wijmo.wijspread.Range(selection.Row, selection.Column, selection.RowCount, selection.ColumnCount));
                        }
                    }
                    return ret;
                }
            }
            return bindToBaseCall(sheetType, this, "getSelections")();
        });

        //add for avoiding the bug which extends from array.
        subclass(sheetType, "getSpans", function (range, sheetArea) {
            if (sheetArea === null || sheetArea === undefined) {
                sheetArea = $.wijmo.wijspread.SheetArea.viewport;
            }
            if ($.browser.msie && (typeof document.documentMode === 'undefined' || document.documentMode == 7)) {
                if (this.parent && this.parent.spreadsheetObject) {
                    var t = this.parent.spreadsheetObject;
                    var ret = [];
                    var spans = t.GetSpans(this.getName(), range, sheetArea);
                    if (spans) {
                        for (var index = 0; index < spans.length; index++) {
                            var span = spans[index];
                            ret.push(new $.wijmo.wijspread.Range(span.Row, span.Column, span.RowCount, span.ColumnCount));
                        }
                    }
                    return ret;
                }
            }
            return bindToBaseCall(sheetType, this, "getSpans")(range, sheetArea);
        });

        subclass(sheetType, "visible", function (value) {
            if (arguments.length > 0) {
                return bindToBaseCall(sheetType, this, "visible")(value);
            } else {
                return bindToBaseCall(sheetType, this, "visible")();
            }

            if (this.parent && this.parent.spreadsheetObject) {
                if (arguments.length > 0) {
                    var t = this.parent.spreadsheetObject;
                    t.SetVisible(this.getName(), value);
                }
            }
        })

        subclass(sheetType, "addPicture", function (name, src, startRow, startColumn, endRow, endColumn, startRowOffset, startColumnOffset, endRowOffset, endColumnOffset) {
            bindToBaseCall(sheetType, this, "addPicture")(name, src, startRow, startColumn, endRow, endColumn, startRowOffset, startColumnOffset, endRowOffset, endColumnOffset);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.AddPicture(this.getName(), name, src, startRow, startColumn, endRow, endColumn, startRowOffset, startColumnOffset, endRowOffset, endColumnOffset);
            }
        });

        subclass(sheetType, "removePicture", function (name) {
            var ret = bindToBaseCall(sheetType, this, "removePicture")(name);

            if (this.parent && this.parent.spreadsheetObject) {
                var t = this.parent.spreadsheetObject;
                t.RemovePicture(this.getName(), name);
            }
            return ret;
        });
        // });
    })($.wijmo.wijspread.Sheet);
    //</editor-fold>

    //<editor-fold desc="Cell">
    (function (cellType) {
        subclass(cellType, "clearStyleProperty", function (propertyName) {
            bindToBaseCall(cellType, this, "clearStyleProperty")(propertyName);

            //
            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;

                for (var r = this.row; r <= this.row2; r++) {
                    for (var c = this.col; c <= this.col2; c++) {
                        if (this._isValidIndex(r, c)) {
                            var style = this.sheet.getStyle(r, c, this.sheetArea);
                            if (style) {
                                t.SetStyle(this.sheet.getName(), r, c, style, this.sheetArea);
                            }
                        }
                    }
                }
            }
        });

    })($.wijmo.wijspread.Cell);
    //</editor-fold>

    //<editor-fold desc="Row">
    (function (rowType) {
        subclass(rowType, "clearStyleProperty", function (propertyName) {
            bindToBaseCall(rowType, this, "clearStyleProperty")(propertyName);

            //
            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;

                for (var r = this.index; r <= this.index2; r++) {
                    if (this._isValidIndex(r)) {
                        var style = this.sheet.getStyle(r, -1, this.sheetArea);
                        if (style) {
                            t.SetStyle(this.sheet.getName(), r, -1, style, this.sheetArea);
                        }
                    }
                }
            }
        });

    })($.wijmo.wijspread.Row);
    //</editor-fold>

    //<editor-fold desc="Column">
    (function (colType) {
        subclass(colType, "clearStyleProperty", function (propertyName) {
            bindToBaseCall(colType, this, "clearStyleProperty")(propertyName);

            //
            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;

                for (var c = this.index; c <= this.index2; c++) {
                    if (this._isValidIndex(c)) {
                        var style = this.sheet.getStyle(-1, c, this.sheetArea);
                        if (style) {
                            t.SetStyle(this.sheet.getName(), -1, c, style, this.sheetArea);
                        }
                    }
                }
            }
        });

    })($.wijmo.wijspread.Column);

    //</editor-fold>

    //<editor-fold desc="Sparkline">
    (function (sparklineType) {
        subclass(sparklineType, "sparklineType", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sparklineType, this, "sparklineType")();
            }
            else {
                bindToBaseCall(sparklineType, this, "sparklineType")(value);

                if (this._worksheet && this._worksheet.parent && this._worksheet.parent.spreadsheetObject) {
                    var t = this._worksheet.parent.spreadsheetObject;
                    t.SetSparklineType(this._worksheet.getName(), this.row, this.column, value);
                }
            }
        });

        subclass(sparklineType, "setting", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(sparklineType, this, "setting")();
            }
            else {
                bindToBaseCall(sparklineType, this, "setting")(value);

                if (this._worksheet && this._worksheet.parent && this._worksheet.parent.spreadsheetObject) {
                    var t = this._worksheet.parent.spreadsheetObject;
                    t.SetSparklineSetting(this._worksheet.getName(), this.row, this.column, value);
                }
            }
        });

    })($.wijmo.wijspread.Sparkline);
    //</editor-fold>

    //<editor-fold desc="SheetTable">
    (function (tableType) {
        subclass(tableType, "name", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(tableType, this, "name")();
            }

            var sheet = this._getSheet();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.RenameTable(sheet.getName(), this.name(), value);
            }

            bindToBaseCall(tableType, this, "name")(value);
        });

        subclass(tableType, "showHeader", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(tableType, this, "showHeader")();
            }

            bindToBaseCall(tableType, this, "showHeader")(value);

            var sheet = this._getSheet();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.ShowTableHeader(sheet.getName(), this.name(), value);
            }
        });

        subclass(tableType, "showFooter", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(tableType, this, "showFooter")();
            }

            bindToBaseCall(tableType, this, "showFooter")(value);

            var sheet = this._getSheet();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.ShowTableFooter(sheet.getName(), this.name(), value);
            }
        });

        subclass(tableType, "bandRows", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(tableType, this, "bandRows")();
            }

            bindToBaseCall(tableType, this, "bandRows")(value);

            var sheet = this._getSheet();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.BandTableRows(sheet.getName(), this.name(), value);
            }
        });

        subclass(tableType, "bandColumns", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(tableType, this, "bandColumns")();
            }

            bindToBaseCall(tableType, this, "bandColumns")(value);

            var sheet = this._getSheet();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.BandTableColumns(sheet.getName(), this.name(), value);
            }
        });

        subclass(tableType, "highlightFirstColumn", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(tableType, this, "highlightFirstColumn")();
            }

            bindToBaseCall(tableType, this, "highlightFirstColumn")(value);

            var sheet = this._getSheet();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.HighlightTableFirstColumn(sheet.getName(), this.name(), value);
            }
        });

        subclass(tableType, "highlightLastColumn", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(tableType, this, "highlightLastColumn")();
            }

            bindToBaseCall(tableType, this, "highlightLastColumn")(value);

            var sheet = this._getSheet();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.HighlightTableLastColumn(sheet.getName(), this.name(), value);
            }
        });

        subclass(tableType, "style", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(tableType, this, "style")();
            }

            bindToBaseCall(tableType, this, "style")(value);

            var sheet = this._getSheet();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.SetTableStyle(sheet.getName(), this.name(), value);
            }
        });
    })($.wijmo.wijspread.SheetTable);

    //<editor-fold>

    //<editor-fold desc="Picture">
    (function (floatingObjectType) {
        subclass(floatingObjectType, "name", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "name")();
            }

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.RenameFloatingObject(sheet.getName(), this.name(), value);
            }

            bindToBaseCall(floatingObjectType, this, "name")(value);
        });

        subclass(floatingObjectType, "isSelected", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "isSelected")();
            }

            bindToBaseCall(floatingObjectType, this, "isSelected")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.IsSelected(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "isLocked", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "isLocked")();
            }

            bindToBaseCall(floatingObjectType, this, "isLocked")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.IsLocked(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "canPrint", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "canPrint")();
            }

            bindToBaseCall(floatingObjectType, this, "canPrint")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.CanPrint(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "isVisible", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "isVisible")();
            }

            bindToBaseCall(floatingObjectType, this, "isVisible")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.IsVisible(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "position", function (position) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "position")();
            }

            bindToBaseCall(floatingObjectType, this, "position")(position);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.Position(sheet.getName(), this.name(), position);
            }
        });

        subclass(floatingObjectType, "height", function (height) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "height")();
            }

            bindToBaseCall(floatingObjectType, this, "height")(height);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.Height(sheet.getName(), this.name(), height);
            }
        });

        subclass(floatingObjectType, "width", function (width) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "width")();
            }

            bindToBaseCall(floatingObjectType, this, "width")(width);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.Width(sheet.getName(), this.name(), width);
            }
        });

        subclass(floatingObjectType, "dynamicMove", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "dynamicMove")();
            }

            bindToBaseCall(floatingObjectType, this, "dynamicMove")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.DynamicMove(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "dynamicSize", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "dynamicSize")();
            }

            bindToBaseCall(floatingObjectType, this, "dynamicSize")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.DynamicSize(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "src", function (src) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "src")();
            }

            bindToBaseCall(floatingObjectType, this, "src")(src);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.Src(sheet.getName(), this.name(), src);
            }
        });

        subclass(floatingObjectType, "backColor", function (backColor) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "backColor")();
            }

            bindToBaseCall(floatingObjectType, this, "backColor")(backColor);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.Fill(sheet.getName(), this.name(), backColor);
            }
        });

        subclass(floatingObjectType, "borderRadius", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "borderRadius")();
            }

            bindToBaseCall(floatingObjectType, this, "borderRadius")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.BorderRadius(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "borderWidth", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "borderWidth")();
            }

            bindToBaseCall(floatingObjectType, this, "borderWidth")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.BorderWidth(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "borderStyle", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "borderStyle")();
            }

            bindToBaseCall(floatingObjectType, this, "borderStyle")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.BorderStyle(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "borderColor", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "borderColor")();
            }

            bindToBaseCall(floatingObjectType, this, "borderColor")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.BorderColor(sheet.getName(), this.name(), value);
            }
        });

        subclass(floatingObjectType, "pictureStretch", function (value) {
            if (arguments.length === 0) {
                return bindToBaseCall(floatingObjectType, this, "pictureStretch")();
            }

            bindToBaseCall(floatingObjectType, this, "pictureStretch")(value);

            var sheet = this.owner();
            if (sheet && sheet.parent && sheet.parent.spreadsheetObject) {
                var t = sheet.parent.spreadsheetObject;
                t.PictureStretch(sheet.getName(), this.name(), value);
            }
        });

    })($.wijmo.wijspread.Picture);
    //<editor-fold>

    //<editor-fold desc="RangeGroup">
    (function (groupType) {
        subclass(groupType, "group", function (index, count) {
            bindToBaseCall(groupType, this, "group")(index, count);

            if (this._worksheet && this._worksheet.parent && this._worksheet.parent.spreadsheetObject) {
                var t = this._worksheet.parent.spreadsheetObject;
                t.Group(this._worksheet.getName(), this._isRowGroup, index, count);
            }
        });

        subclass(groupType, "ungroupRange", function (index, count) {
            bindToBaseCall(groupType, this, "ungroupRange")(index, count);

            if (this._worksheet && this._worksheet.parent && this._worksheet.parent.spreadsheetObject) {
                var t = this._worksheet.parent.spreadsheetObject;
                t.UngroupRange(this._worksheet.getName(), this._isRowGroup, index, count);
            }
        });

        subclass(groupType, "ungroup", function () {
            bindToBaseCall(groupType, this, "ungroup")();

            if (this._worksheet && this._worksheet.parent && this._worksheet.parent.spreadsheetObject) {
                var t = this._worksheet.parent.spreadsheetObject;
                t.Ungroup(this._worksheet.getName(), this._isRowGroup);
            }
        });

        subclass(groupType, "expand", function (level, expand) {
            bindToBaseCall(groupType, this, "expand")();

            if (this._worksheet && this._worksheet.parent && this._worksheet.parent.spreadsheetObject) {
                var t = this._worksheet.parent.spreadsheetObject;
                t.Expand(this._worksheet.getName(), this._isRowGroup, level, expand);
            }
        });

        subclass(groupType, "expandGroup", function (groupInfo, expand) {
            bindToBaseCall(groupType, this, "expandGroup")(groupInfo, expand);

            if (this._worksheet && this._worksheet.parent && this._worksheet.parent.spreadsheetObject) {
                var t = this._worksheet.parent.spreadsheetObject;
                t.ExpandGroup(this._worksheet.getName(), this._isRowGroup, groupInfo.start, groupInfo.end, groupInfo.level, expand);
            }
        });

        subclass(groupType, "setCollapsed", function (index, collapsed) {
            bindToBaseCall(groupType, this, "setCollapsed")(index, collapsed);

            if (this._worksheet && this._worksheet.parent && this._worksheet.parent.spreadsheetObject) {
                var t = this._worksheet.parent.spreadsheetObject;
                t.SetCollapsed(this._worksheet.getName(), this._isRowGroup, index, collapsed);
            }
        });

        subclass(groupType, "setDirection", function (direction) {
            bindToBaseCall(groupType, this, "setDirection")(direction);

            if (this._worksheet && this._worksheet.parent && this._worksheet.parent.spreadsheetObject) {
                var t = this._worksheet.parent.spreadsheetObject;
                t.SetRangeGroupDirection(this._worksheet.getName(), this._isRowGroup, direction);
            }
        });
    })($.wijmo.wijspread.RangeGroup);
    //</editor-fold>

    //<editor-fold desc="RowFilter">
    (function (filterBase) {
        subclass(filterBase, "addFilterItem", function (col, filterItem) {
            bindToBaseCall(filterBase, this, "addFilterItem")(col, filterItem);

            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;
                var tableName = (typeof (this.table) === const_function) ? this.table().name() : null;
                t.AddFilterItem(this.sheet.getName(), tableName, col, filterItem);
            }
        });
        subclass(filterBase, "filter", function (col) {
            bindToBaseCall(filterBase, this, "filter")(col);

            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;
                var tableName = (typeof (this.table) === const_function) ? this.table().name() : null;
                t.Filter(this.sheet.getName(), tableName, col);
            }
        });
        subclass(filterBase, "unfilter", function (col) {
            bindToBaseCall(filterBase, this, "unfilter")(col);

            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;
                var tableName = (typeof (this.table) === const_function) ? this.table().name() : null;
                if (col === undefined) {
                    t.UnFilter(this.sheet.getName(), tableName);
                } else {
                    t.UnFilter(this.sheet.getName(), tableName, col);
                }
            }
        });
        subclass(filterBase, "reFilter", function () {
            bindToBaseCall(filterBase, this, "reFilter")();

            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;
                var tableName = (typeof (this.table) === const_function) ? this.table().name() : null;
                var name = this.sheet.getName();
                t.ReFilter(name, tableName);
                t.InvalidateSheet(name);
            }
        });
        subclass(filterBase, "removeFilterItems", function (col) {
            bindToBaseCall(filterBase, this, "removeFilterItems")(col);

            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;
                var tableName = (typeof (this.table) === const_function) ? this.table().name() : null;
                t.RemoveFilterItems(this.sheet.getName(), tableName, col);
            }
        });
        subclass(filterBase, "reset", function () {
            bindToBaseCall(filterBase, this, "reset")();

            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;
                var tableName = (typeof (this.table) === const_function) ? this.table().name() : null;
                var name = this.sheet.getName();
                t.UnFilter(name, tableName);
                t.ResetFilter(name, tableName);
                t.InvalidateSheet(name);
            }
        });
        subclass(filterBase, "sortColumn", function (col, ascending) {
            bindToBaseCall(filterBase, this, "sortColumn")(col, ascending);

            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;
                var tableName = (typeof (this.table) === const_function) ? this.table().name() : null;
                t.SortColumn(this.sheet.getName(), tableName, col, ascending, (this.sheet.rowFilter()) ? this.sheet.rowFilter().range : null);
            }
        });
        subclass(filterBase, "getSortState", function (col) {
            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;
                var tableName = (typeof (this.table) === const_function) ? this.table().name() : null;
                return t.GetSortState(this.sheet.getName(), tableName, col);
            } else {
                return bindToBaseCall(filterBase, this, "getSortState")(col);
            }
        });
        subclass(filterBase, "setShowFilterButton", function (value) {
            bindToBaseCall(filterBase, this, "setShowFilterButton")(value);

            if (this.sheet && this.sheet.parent && this.sheet.parent.spreadsheetObject) {
                var t = this.sheet.parent.spreadsheetObject;
                var tableName = (typeof (this.table) === const_function) ? this.table().name() : null;
                t.SetShowFilterButton(this.sheet.getName(), tableName, value);
            }
        });
    })($.wijmo.wijspread.RowFilterBase);
    //</editor-fold>

    //<editor-fold desc="CellValueRule">
    (function (cellValueRuleType) {
        // override cellValueRule
        cellValueRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.CellValueRule;

    })($.wijmo.wijspread.CellValueRule);
    //</editor-fold>

    //<editor-fold desc="SpecificTextRule">
    (function (specificTextRuleType) {
        // override specificTextRule
        specificTextRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.SpecificTextRule;

    })($.wijmo.wijspread.SpecificTextRule);
    //</editor-fold>

    //<editor-fold desc="FormulaRule">
    (function (formulaRuleType) {
        // override formulaRule
        formulaRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.FormulaRule;

    })($.wijmo.wijspread.FormulaRule);
    //</editor-fold>

    //<editor-fold desc="DateOccurringRule">
    (function (dateOccurringRuleType) {
        // override dateOccurringRule
        dateOccurringRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.DateOccurringRule;

    })($.wijmo.wijspread.DateOccurringRule);
    //</editor-fold>

    //<editor-fold desc="Top10Rule">
    (function (top10RuleType) {
        // override top10Rule
        top10RuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.Top10Rule;

    })($.wijmo.wijspread.Top10Rule);
    //</editor-fold>

    //<editor-fold desc="UniqueRule">
    (function (uniqueRuleType) {
        // override uniqueRule
        uniqueRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.UniqueRule;

    })($.wijmo.wijspread.UniqueRule);
    //</editor-fold>

    //<editor-fold desc="DuplicateRule">
    (function (duplicateRuleType) {
        // override duplicateRule
        duplicateRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.DuplicateRule;

    })($.wijmo.wijspread.DuplicateRule);
    //</editor-fold>

    //<editor-fold desc="AverageRule">
    (function (averageRuleType) {
        // override averageRule
        averageRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.AverageRule;

    })($.wijmo.wijspread.AverageRule);
    //</editor-fold>

    //<editor-fold desc="TwoScaleRule">
    (function (twoScaleRuleType) {
        // override twoScaleRule
        twoScaleRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.TwoScaleRule;

    })($.wijmo.wijspread.TwoScaleRule);
    //</editor-fold>

    //<editor-fold desc="ThreeScaleRule">
    (function (threeScaleRuleType) {
        // override threeScaleRule
        threeScaleRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.ThreeScaleRule;

    })($.wijmo.wijspread.ThreeScaleRule);
    //</editor-fold>

    //<editor-fold desc="DataBarRule">
    (function (dataBarRuleType) {
        // override DataBarRule
        dataBarRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.DataBarRule;

    })($.wijmo.wijspread.DataBarRule);
    //</editor-fold>

    //<editor-fold desc="IconSetRule">
    (function (iconSetRuleType) {
        // override IconSetRule
        iconSetRuleType.prototype.ruleType = $.wijmo.wijspread.RuleType.IconSetRule;

    })($.wijmo.wijspread.IconSetRule);
    //</editor-fold>

    //<editor-fold desc="ConditionalFormats">
    (function (cfType) {
        // override ConditionalFormats
        subclass(cfType, "addRule", function (rule) {
            rule = bindToBaseCall(cfType, this, "addRule")(rule);

            // do custom action
            if (this.worksheet && this.worksheet.parent && this.worksheet.parent.spreadsheetObject) {
                var t = this.worksheet.parent.spreadsheetObject;
                var ruleType = rule.ruleType;
                if (ruleType === $.wijmo.wijspread.RuleType.TwoScaleRule) {
                    rule.minType = rule.getMinimumType();
                    rule.minValue = rule.getMinimumValue();
                    rule.minColor = rule.getMinimumColor();

                    rule.maxType = rule.getMaximumType();
                    rule.maxValue = rule.getMaximumValue();
                    rule.maxColor = rule.getMaximumColor();
                } else if (ruleType === $.wijmo.wijspread.RuleType.ThreeScaleRule) {
                    rule.minType = rule.getMinimumType();
                    rule.minValue = rule.getMinimumValue();
                    rule.minColor = rule.getMinimumColor();

                    rule.midType = rule.getMidpointType();
                    rule.midValue = rule.getMidpointValue();
                    rule.midColor = rule.getMidpointColor();

                    rule.maxType = rule.getMaximumType();
                    rule.maxValue = rule.getMaximumValue();
                    rule.maxColor = rule.getMaximumColor();
                } else if (ruleType === $.wijmo.wijspread.RuleType.DataBarRule) {
                    rule._minType = rule.minimumType();
                    rule._minValue = rule.minimumValue();
                    rule._maxType = rule.maximumType();
                    rule._maxValue = rule.maximumValue();
                }
                t.AddRule(this.worksheet.getName(), rule);
            }

            return rule;
        });

        subclass(cfType, "removeRule", function (rule) {
            // do custom action
            if (this.worksheet && this.worksheet.parent && this.worksheet.parent.spreadsheetObject) {
                var t = this.worksheet.parent.spreadsheetObject;
                if (rule && this.rules) {
                    for (var i = 0; i < this.rules.length; i++) {
                        if (this.rules[i] === rule) {
                            t.RemoveRule(this.worksheet.getName(), i);
                            break;
                        }
                    }
                }
            }

            bindToBaseCall(cfType, this, "removeRule")(rule);

        });

        subclass(cfType, "removeRuleByRange", function (row, column, rowCount, columnCount) {
            // do custom action
            if (this.worksheet && this.worksheet.parent && this.worksheet.parent.spreadsheetObject) {
                var t = this.worksheet.parent.spreadsheetObject;
                t.RemoveRule(this.worksheet.getName(), row, column, rowCount, columnCount);
            }

            bindToBaseCall(cfType, this, "removeRuleByRange")(row, column, rowCount, columnCount);
        });

        subclass(cfType, "clearRule", function () {
            // do custom action
            if (this.worksheet && this.worksheet.parent && this.worksheet.parent.spreadsheetObject) {
                var t = this.worksheet.parent.spreadsheetObject;
                t.ClearRule(this.worksheet.getName());
            }

            bindToBaseCall(cfType, this, "clearRule")();
        });

    })($.wijmo.wijspread.ConditionalFormats);
    //</editor-fold>

    //<editor-fold desc="DefaultDataValidator">
    (function (dvType) {
        // override DefaultDataValidator
        overrideClassMethod(dvType, "createNumberValidator", function (typeOperator, v1, v2, isIntegerValue) {
            var dv = dvType._o_createNumberValidator.call(this, typeOperator, v1, v2, isIntegerValue);
            if (dv) {
                dv._value1 = convertToSXValue(v1);
                dv._value2 = convertToSXValue(v2);
            }
            return dv;
        });

        overrideClassMethod(dvType, "createDateValidator", function (typeOperator, v1, v2) {
            var dv = dvType._o_createDateValidator.call(this, typeOperator, v1, v2);
            if (dv) {
                dv._value1 = convertToSXValue(v1);
                dv._value2 = convertToSXValue(v2);
            }
            return dv;
        });

        overrideClassMethod(dvType, "createTextLengthValidator", function (typeOperator, v1, v2) {
            var dv = dvType._o_createTextLengthValidator.call(this, typeOperator, v1, v2);
            if (dv) {
                dv._value1 = convertToSXValue(v1);
                dv._value2 = convertToSXValue(v2);
            }
            return dv;
        });

        overrideClassMethod(dvType, "createFormulaValidator", function (formula) {
            var dv = dvType._o_createFormulaValidator.call(this, formula);
            if (dv) {
                dv._value1 = convertToSXValue(formula);
            }
            return dv;
        });

        overrideClassMethod(dvType, "createFormulaListValidator", function (formula) {
            var dv = dvType._o_createFormulaListValidator.call(this, formula);
            if (dv) {
                dv._value1 = convertToSXValue(formula);
                dv._isFormulaList = true;
            }
            return dv;
        });

        overrideClassMethod(dvType, "createListValidator", function (source) {
            var dv = dvType._o_createListValidator.call(this, source);
            if (dv) {
                dv._value1 = convertToSXValue(source);
                dv._isFormulaList = false;
            }
            return dv;
        });

        subclass(dvType, "fromJSON", function (settings) {
            bindToBaseCall(dvType, this, "fromJSON")(settings,isNoneSchema);

            var type = settings.type;
            var condition = settings.condition;
            if (type !== null && type !== undefined && condition) {
                switch (type) {
                    case $.wijmo.wijspread.CriteriaType.WholeNumber:
                    case $.wijmo.wijspread.CriteriaType.DecimalValues:
                    case $.wijmo.wijspread.CriteriaType.Date:
                    case $.wijmo.wijspread.CriteriaType.TextLength:
                        var isRelationCondition = false;
                        if (condition.item1) {//RelationCondition
                            if (condition.item1.formula) {
                                settings._value1 = convertToSXValue("=" + condition.item1.formula);
                            } else if (condition.item1.expected !== null && condition.item1.expected !== undefined) {
                                settings._value1 = convertToSXValue(condition.item1.expected);
                            }
                            isRelationCondition = true;
                        }
                        if (condition.item2) {//RelationCondition
                            if (condition.item2.formula) {
                                settings._value2 = convertToSXValue("=" + condition.item2.formula);
                            } else if (condition.item2.expected !== null && condition.item2.expected !== undefined) {
                                settings._value2 = convertToSXValue(condition.item2.expected);
                            }
                            isRelationCondition = true;
                        }
                        if (!isRelationCondition) {
                            if (condition.formula) {
                                settings._value1 = convertToSXValue("=" + condition.formula);
                            } else if (condition.expected !== null && condition.expected !== undefined) {
                                settings._value1 = convertToSXValue(condition.expected);
                            }
                        }
                        break;
                    case $.wijmo.wijspread.CriteriaType.Custom:
                        if (condition.formula) {
                            settings._value1 = "=" + condition.formula;
                        }
                        break;
                    case $.wijmo.wijspread.CriteriaType.List:
                        if (condition.formula) {
                            settings._value1 = "=" + condition.formula;
                            settings._isFormulaList = true;
                        } else if (condition.expected) {
                            settings._value1 = condition.expected;
                            settings._isFormulaList = false;
                        }
                        break;
                }
            }
        });
    })($.wijmo.wijspread.DefaultDataValidator);
    //</editor-fold>

    //<editor-fold desc="_UndoManager">
    (function (undoManagerType) {
        subclass(undoManagerType, "canUndo", function () {
            var t = this.context().spreadsheetObject;
            if (!t && this.context().parent && this.context().parent.spreadsheetObject) {
                t = this.context().parent.spreadsheetObject;
            }

            if (t) {
                return t.GetUndoManagerCanUndo();
            }
            return bindToBaseCall(undoManagerType, this, "canUndo")();
        });

        subclass(undoManagerType, "canRedo", function () {
            var t = this.context().spreadsheetObject;
            if (!t && this.context().parent && this.context().parent.spreadsheetObject) {
                t = this.context().parent.spreadsheetObject;
            }

            if (t) {
                return t.GetUndoManagerCanRedo();
            }
            return bindToBaseCall(undoManagerType, this, "canRedo")();
        });

        subclass(undoManagerType, "undo", function () {
            var t = this.context().spreadsheetObject;
            if (!t && this.context().parent && this.context().parent.spreadsheetObject) {
                t = this.context().parent.spreadsheetObject;
            }

            if (t) {
                t.UndoMangerUndo();
            } else {
                bindToBaseCall(undoManagerType, this, "undo")();
            }
        });

        subclass(undoManagerType, "redo", function () {
            var t = this.context().spreadsheetObject;
            if (!t && this.context().parent && this.context().parent.spreadsheetObject) {
                t = this.context().parent.spreadsheetObject;
            }

            if (t) {
                t.UndoMangerRedo();
            } else {
                bindToBaseCall(undoManagerType, this, "redo")();
            }
        });
    })($.wijmo.wijspread._UndoManager);
    //</editor-fold>

    //<editor-fold desc="SpreadActions">
    (function (spreadActionsType) {
        // override SpreadActions
        spreadActionsType.navigationLeft._name = "navigationLeft";
        spreadActionsType.navigationRight._name = "navigationRight";
        spreadActionsType.navigationUp._name = "navigationUp";
        spreadActionsType.navigationDown._name = "navigationDown";
        spreadActionsType.commitInputNavigationDown._name = "commitInputNavigationDown";
        spreadActionsType.commitInputNavigationUp._name = "commitInputNavigationUp";
        spreadActionsType.navigationHome._name = "navigationHome";
        spreadActionsType.navigationHome2._name = "navigationHome2";
        spreadActionsType.navigationEnd._name = "navigationEnd";
        spreadActionsType.navigationTop._name = "navigationTop";
        spreadActionsType.navigationBottom._name = "navigationBottom";
        spreadActionsType.navigationPageUp._name = "navigationPageUp";
        spreadActionsType.navigationPageDown._name = "navigationPageDown";
        spreadActionsType.navigationNextSheet._name = "navigationNextSheet";
        spreadActionsType.navigationPreviousSheet._name = "navigationPreviousSheet";
        spreadActionsType.navigationPrevious._name = "navigationPrevious";
        spreadActionsType.navigationNext._name = "navigationNext";
        spreadActionsType.navigationFirst._name = "navigationFirst";
        spreadActionsType.navigationLast._name = "navigationLast";
        spreadActionsType.commitInputNavigationTabNext._name = "commitInputNavigationTabNext";
        spreadActionsType.commitInputNavigationTabPrevious._name = "commitInputNavigationTabPrevious";
        spreadActionsType.cancelInput._name = "cancelInput";
        spreadActionsType.clear._name = "clear";
        spreadActionsType.clearAndEditing._name = "clearAndEditing";
        spreadActionsType.copy._name = "copy";
        spreadActionsType.cut._name = "cut";
        spreadActionsType.paste._name = "paste";
        spreadActionsType.selectionLeft._name = "selectionLeft";
        spreadActionsType.selectionRight._name = "selectionRight";
        spreadActionsType.selectionUp._name = "selectionUp";
        spreadActionsType.selectionDown._name = "selectionDown";
        spreadActionsType.selectionHome._name = "selectionHome";
        spreadActionsType.selectionEnd._name = "selectionEnd";
        spreadActionsType.selectionPageUp._name = "selectionPageUp";
        spreadActionsType.selectionPageDown._name = "selectionPageDown";
        spreadActionsType.selectionTop._name = "selectionTop";
        spreadActionsType.selectionBottom._name = "selectionBottom";
        spreadActionsType.selectionFirst._name = "selectionFirst";
        spreadActionsType.selectionLast._name = "selectionLast";
        spreadActionsType.undo._name = "undo";
        spreadActionsType.redo._name = "redo";
    })($.wijmo.wijspread.SpreadActions);
    //</editor-fold>

    //<editor-fold desc="RelationCondition">
    (function (relationConditionType) {
        relationConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.RelationCondition;

    })($.wijmo.wijspread.RelationCondition);
    //</editor-fold>

    //<editor-fold desc="NumberCondition">
    (function (numberConditionType) {
        numberConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.NumberCondition;

    })($.wijmo.wijspread.NumberCondition);
    //</editor-fold>

    //<editor-fold desc="TextCondition">
    (function (textConditionType) {
        textConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.TextCondition;

    })($.wijmo.wijspread.TextCondition);
    //</editor-fold>

    //<editor-fold desc="ColorCondition">
    (function (colorConditionType) {
        colorConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.ColorCondition;

    })($.wijmo.wijspread.ColorCondition);
    //</editor-fold>

    //<editor-fold desc="FormulaCondition">
    (function (formulaConditionType) {
        formulaConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.FormulaCondition;

    })($.wijmo.wijspread.FormulaCondition);
    //</editor-fold>

    //<editor-fold desc="DateCondition">
    (function (dateConditionType) {
        dateConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.DateCondition;

    })($.wijmo.wijspread.DateCondition);
    //</editor-fold>

    //<editor-fold desc="DateExCondition">
    (function (dateExConditionType) {
        dateExConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.DateExCondition;

    })($.wijmo.wijspread.DateExCondition);
    //</editor-fold>

    //<editor-fold desc="TextLengthCondition">
    (function (textLengthConditionType) {
        textLengthConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.TextLengthCondition;

    })($.wijmo.wijspread.TextLengthCondition);
    //</editor-fold>

    //<editor-fold desc="Top10Condition">
    (function (top10ConditionType) {
        top10ConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.Top10Condition;

    })($.wijmo.wijspread.Top10Condition);
    //</editor-fold>

    //<editor-fold desc="UniqueCondition">
    (function (uniqueConditionType) {
        uniqueConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.UniqueCondition;

    })($.wijmo.wijspread.UniqueCondition);
    //</editor-fold>

    //<editor-fold desc="AverageCondition">
    (function (averageConditionType) {
        averageConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.AverageCondition;

    })($.wijmo.wijspread.AverageCondition);
    //</editor-fold>

    //<editor-fold desc="CellValueCondition">
    (function (cellValueConditionType) {
        cellValueConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.CellValueCondition;

    })($.wijmo.wijspread.CellValueCondition);
    //</editor-fold>

    //<editor-fold desc="AreaCondition">
    (function (areaConditionType) {
        areaConditionType.prototype.conType = $.wijmo.wijspread.ConditionType.AreaCondition;

    })($.wijmo.wijspread.AreaCondition);
    //</editor-fold>
})();
