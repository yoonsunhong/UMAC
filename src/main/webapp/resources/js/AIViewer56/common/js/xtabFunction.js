    var imgObj = document.createElement("img");
    imgObj.src = installPath + "common/SpreadJS/css/filter.png";
    
    function ImageButtonCellType(label) {
        // 이곳에서 이미지객체 생성시 chrome에서 preload되지 않음
        // -> 전역객체로 전환하고 셀에서 공유함(공유에 따른 문제는 없음)
        this.imgObj = window.imgObj;
        this.text(label);
        this.buttonBackColor("#d6f0e9"); // #ebf1f5,
    }

    ImageButtonCellType.prototype = new $.wijmo.wijspread.ButtonCellType();
    ImageButtonCellType.prototype.paint = function(ctx, value, x, y, w, h, style, options) {
        $.wijmo.wijspread.ButtonCellType.prototype.paint.apply(this, arguments);
        ctx.drawImage(this.imgObj, x+w-18, y+h-17, 16, 16);
    };


    function newRowFilter(dataType, binder) {
        if (dataType == "STRING") return (new StringRowFilter(binder));
        if (dataType == "NUMBER") return (new NumberRowFilter(binder));
    }

// Custom필터는 실제로 FormulaCondition type으로 evaluate()가 IF역할을 함
// (현재문서상의 filterItem type은 존재하지 않으며 오기임)
    function StringRowFilter(binder) { // 필터col별로 유지(binder(sheet) scope)
        // 해당 html dialog ele.(document scope)의 속성들을 이곳에서만 유지함
        // (아래값들은 개념상으로는 this처럼 binder/col scope가 아닌 static임)
        this.wrapElementID = "#filter-dialog-string"; // 형별 고정값
        this.width = 320; // 테이블 + 20

        // 이하는 instance멤버
        this.binder = binder;
        this.opt; // 검색조건 cate(1,2,3,4)
        this.srchWord;
        this.spanned; // match && span
        this.textList = {};   // select's innerHTML을 (col별로)캐싱
        this.sumTextArr = {}; // binder.filterOpt.sumTexts[col]을 캐싱
    }
    StringRowFilter.prototype = {
        evaluate: function(evaluator, row, col) { // 필터 IF
            // evaluator: Sheet객체대등(확장?)이므로 필요 함수 활용가능
            // rowSpan/숨김과 상관없이 모든 row에 대해 호출됨 (0/0,1/0,2/0 ... n/0)
            if (row < this.binder.frozenRows) return true; // 열필드는 항상 표시

            var t = evaluator.getText(row, col); // 링크(가능성)때문에 v대신 t사용
//console.log(row + "," + col + t);
            if (t == null || t.length == 0) {
                return this.spanned;  // (rowSpanned후 이어지는)병합셀이면 표시
            }

            // 이하에서 값(행필드)은 항상존재해야함(groupBy해당 값이므로)
            var v = evaluator.getTag(row, col);
            var containTest = true; // (선택행만/포함행만) 검색여부
            var matched; // 조건을 만족하는지 여부 -> visibility
            if (this.opt == '1') { // 선택행만
                matched = (v === this.srchWord);
            } else if (this.opt == '3') { // 포함행만
                matched = (v.indexOf(this.srchWord) != -1);
            } else if (this.opt == '2') { // 제외하고
                matched = (v !== this.srchWord);
                containTest = false;
            } else { // 4-없는행만
                matched = (v.indexOf(this.srchWord) == -1);
                containTest = false;
            }

            if (containTest) {
                this.spanned = matched;
                return matched;
            } else { // summary셀인 경우에는 숨김 <- 재계산이 불가능함
                if (matched) { // 추가로 summary셀이 아니어야 표시
                    matched = (this.sumTextArr[col].indexOf(v) == -1);
                }
                this.spanned = matched;
                return matched;
            }
        },
        initDialog: function(col) { // ES 5이상 (arr.indexOf)
            // 동일형(column)이 content element를 공유하므로 사용시마다 초기화해야함
            var controls = document.forms["f-d-s-form"].elements;
            var rflist = $(controls["rflist"]); // select(필드값 목록)
            rflist.empty(); // Remove all options

            var list = this.textList[col];
            if (list === undefined) { // this column이 캐싱되지 않았음
                list = "<option value=''>전체 보기</option>";
                var summayText = this.binder.filterOpt.sumTexts[col]; // maybe empty
                var arr = []; // Set(중복제거)목적으로 사용
                var sheet = this.binder.sheet;
                var rows = this.binder.rows;
                for (var i = 0; i < rows; i++) {
                    var t = sheet.getTag(i, col);
                    if (t == null || t.length == 0) continue; // 실제는 모두 empty임
                    if (summayText.indexOf(t) != -1) continue; // summaryText인 경우
                    if (arr.indexOf(t) == -1) { // 중복체크
                        list += "<option>" + t  + "</option>";
                        arr.push(t);
                    }
                }
                this.textList[col] = list;
                this.sumTextArr[col] = summayText;
            }
            rflist.html(list);

            // 검색옵션의 초기화/일관화
            onFDConditionClick(true, 'f-d-s-form', 'rflist', 'srchKey');
            controls["condition"][0].checked = true; // autofocus와 일치
        },
        onUserSelected: function() {
            this.spanned = false;
            var controls = document.forms["f-d-s-form"].elements;
            this.opt = controls["condition"].value;
            if (this.opt === undefined) { // IE
                var cons = controls["condition"];
                for (var i = 0; i < cons.length; i++) {
                    if (cons[i].checked) {
                        this.opt = cons[i].value;
                        break;
                    }
                }
            }
            if (this.opt == "1" || this.opt == "2") { // 선택값 검색
                this.srchWord = controls["rflist"].value;
            } else { // 입력값 검색
                this.srchWord = controls["srchKey"].value;
                if (!this.srchWord) { // 입력값이 empty
                    return false; // cancel처리
                }
            }

            return true; // 필터링 처리
        }
    };

    function NumberRowFilter(binder) { // 필터col별로 유지(binder(sheet) scope)
        // 해당 html dialog ele.(document scope)의 속성들을 이곳에서만 유지함
        // (아래값들은 개념상으로는 this처럼 binder/col scope가 아닌 static임)
        this.wrapElementID = "#filter-dialog-number"; // 형별 고정값
        this.width = 320; // 테이블 + 20

        // 이하는 instance멤버
        this.binder = binder;
        this.opt; // 검색조건 cate(1,2,3,4)
        this.srchWord;
        this.srchValue; // 수치형
        this.spanned; // match && span
        this.textList = {};   // select's innerHTML을 (col별로)캐싱
    }
    NumberRowFilter.prototype = {
        evaluate: function(evaluator, row, col) { // 필터 IF
            // evaluator: Sheet객체대등(확장?)이므로 필요 함수 활용가능
            // rowSpan/숨김과 상관없이 모든 row에 대해 호출됨 (0/0,1/0,2/0 ... n/0)
            if (row < this.binder.frozenRows) return true; // 열필드는 항상 표시

            var t = evaluator.getText(row, col); // 링크(가능성)때문에 v대신 t사용
            if (t == null || t.length == 0) {
                return this.spanned;  // (rowSpanned후 이어지는)병합셀이면 표시
            }

            // 이하에서 값(행필드)은 항상존재해야함(groupBy해당 값이므로)
            // 수치형의 경우에도 summaryText를 포함할 수 있음
            var v = evaluator.getTag(row, col);
            if (isNaN(v)) { // summaryText ('S'로 마킹됨)
                this.spanned = false;
                return false;
            }
            // 이하는 수치값
            var matched; // 조건을 만족하는지 여부 -> visibility
            if (this.opt == '1') { // 선택행만
                matched = (v === this.srchValue);
            } else if (this.opt == '3') { // 포함행만
                matched = (v > this.srchValue);
            } else if (this.opt == '2') { // 제외하고
                matched = (v !== this.srchValue);
            } else { // 4-없는행만
                matched = (v < this.srchValue);
            }

            this.spanned = matched;
            return matched;
        },
        initDialog: function(col) { // ES 5이상 (arr.indexOf)
            // 동일형(column)이 content element를 공유하므로 사용시마다 초기화해야함
            var controls = document.forms["f-d-n-form"].elements;
            var rflist = $(controls["rflist-n"]); // select(필드값 목록)
            rflist.empty(); // Remove all options

            var list = this.textList[col];
            if (list === undefined) { // this column이 캐싱되지 않았음
                list = "<option value=''>전체 보기</option>";
                var arr = []; // Set(중복제거)목적으로 사용
                var sheet = this.binder.sheet;
                var rows = this.binder.rows;
                for (var i = 0; i < rows; i++) {
                    var v = sheet.getTag(i, col); // 수치형 or 'S'
                    if (v == null) continue;
                    if (isNaN(v)) { // summaryText ('S'로 마킹됨)
                        continue;
                    }
                    if (arr.indexOf(v) == -1) { // 중복체크
                        list += "<option>" + v  + "</option>";
                        arr.push(v);
                    }
                }
                this.textList[col] = list;
            }
            rflist.html(list);

            // 검색옵션의 초기화/일관화
            onFDConditionClick(true, 'f-d-n-form', 'rflist-n', 'srchKey-n');
            controls["condition"][0].checked = true; // autofocus와 일치
        },
        onUserSelected: function() {
            this.spanned = false;
            var controls = document.forms["f-d-n-form"].elements;
            this.opt = controls["condition"].value;
            if (this.opt === undefined) { // IE
                var cons = controls["condition"];
                for (var i = 0; i < cons.length; i++) {
                    if (cons[i].checked) {
                        this.opt = cons[i].value;
                        break;
                    }
                }
            }
            if (this.opt == "1" || this.opt == "2") { // 선택값 검색
                this.srchWord = controls["rflist-n"].value;
                if (this.srchWord != "") { // '전체'인 경우는 값필터링이 skip됨
                    this.srchValue = parseFloat(this.srchWord);
                }
                return true;
            } else { // 입력값 검색
                this.srchWord = controls["srchKey-n"].value;
                if (!this.srchWord) { // 입력값이 empty
                    return false; // cancel처리
                }
                this.srchValue = parseFloat(this.srchWord);
                if (isNaN(this.srchValue)) {
                    alert("유효한 숫자값만 입력하세요 !");
                    return false;
                } else {
                    return true;
                }
            }
        }
    };

    function onFilterButtonClick(row, col, binder) {
        var myFilter = binder.sheet.getColumn(col).tag(); // 형별 custom필터

        myFilter.initDialog(col);

        //var cellRect = binder.sheet.getCellRect(row, col, -1, 1);
        var cellRect = binder.sheet.getCellRect(row, col, -1); // col header
        var ox = cellRect.x; // 선택셀의 left(and top)에 정렬

        // of:정렬기준(target),my:at의 위치에 어느부분을 배치할것인가,at:of에서의 offset
        // -> 일반적인 parent에서의 anchor는 my를 left-top으로 고정하고 at에 offset부여
        // dialogClass: SpreadJS theme과의 충돌(overRide)로 close버튼의 X가 잘못배치됨
        //              -> 추가된 style에서 ui-dialog-titlebar-close(버튼포함)를 감춤
        $(myFilter.wrapElementID).dialog({
            modal: true,
            resizable: false,
            draggable: false,
            dialogClass: "no-close-dialog",
            width: myFilter.width,
            position: {
                my: "left top",
                at: "left+" + ox + " top",
                of: binder.$container
            },
            buttons: {
                "확 인": function() {
                    if (!myFilter.onUserSelected()) {
                        $(this).dialog("close");
                        return; // 검색값 미입력시 단순히 cancel처리
                    }

                    var rowFilter = binder.sheet.rowFilter();
                    for (var i = 0; i < binder.filterOpt.indexes.length; i++) {
                        rowFilter.removeFilterItems(binder.filterOpt.indexes[i]);
                    }

                    // 전체보기인 경우에는 "제외하고"도 별도 구분하지 않음(empty는 무의미)
                    if (myFilter.srchWord != "") { // 전체보기가 아닌 경우
                        rowFilter.addFilterItem(col, myFilter);
                        rowFilter.filter(col);
                    }
                    binder.sheet.invalidateLayout();
                    $(this).dialog("close");
                    binder.sheet.repaint();
                },
                "취 소": function() {
                    $(this).dialog("close");
                }
            }
        });
    }

    function onFDConditionClick(isList, aform, rflist, srchKey) {
        var controls = document.forms[aform].elements;
        if (isList) {
            if (!controls["condition"][1].checked) { // 기존 1선택은 유지
                controls["condition"][0].checked = true;
            }
            $(controls[srchKey]).fadeTo(100, 0.6); // 불투명도, disable effect
            $(controls[rflist]).fadeTo(100, 1.0);
        } else {
            if (!controls["condition"][3].checked) {  // 기존 3선택은 유지
                controls["condition"][2].checked = true;
            }
            $(controls[rflist]).fadeTo(100, 0.6);
            $(controls[srchKey]).fadeTo(100, 1.0);
        }
    }