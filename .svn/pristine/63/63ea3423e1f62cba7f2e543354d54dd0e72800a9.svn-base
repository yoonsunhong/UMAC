/**
 * 
 */



/*
 *  주어진 페이지 번호에 따라 페이지 네비게이션 html을 만들고 obj 에 innerHTML로 넣어줍니다.
 *  @gridTotalRowCount : 전체 데이터 건수 - html이 서버에서 작성될때 반드시 넣어줘야 하는 변수입니다.
 *  @gridRowsPerPage : 1페이지에서 보여줄 행 수
 *  @goPage : 현재 페이지
 *  @jsFunction : 페이징 호출 함수명
 */
function drawGridPagingNavigation(gridTotalRowCount, gridRowsPerPage, goPage, jsFunction) {
	
	// 화면에 표시할 맨앞으로 와 맨뒤로, 앞으로, 뒤로 문구 - 이미지를 쓸 경우 img 태그로 대체
	var gridStartTxt = "<<";
	var gridEndTxt = ">>";
	var gridPrevTxt = "◀";
	var gridNextTxt = "▶";
	var gridPageGapTxt = " | ";	// 페이지 사이의 구분을 위한 문자 - 사용하지 않을 경우 공백을 넣습니다.
	
	var gridViewPageCount = 10;		// 페이지 네비게이션에서 보여줄 페이지의 수
	var gridTotalPage = Math.ceil(gridTotalRowCount / gridRowsPerPage);	// 전체 페이지 계산
	
	if (gridTotalPage == 0) {
		gridPageNavigationDiv.innerHTML = "<span class='gridPagingDisable'>" + gridStartTxt + "</span> <span class='gridPagingDisable'>" + gridPrevTxt + "</span> <span class='gridPagingDisable'>" + gridNextTxt + "</span> <span class='gridPagingDisable'>" + gridEndTxt + "</span>";
		return;
	}
	
	var retStr = "";
	var prepage = parseInt((goPage - 1)/gridViewPageCount) * gridViewPageCount;
	var nextpage = ((parseInt((goPage - 1)/gridViewPageCount)) * gridViewPageCount) + gridViewPageCount + 1;
	
	// 맨앞으로
	retStr += "<span class=";
	if (goPage > 1) {
		retStr += "'gridPagingMove'><a href='javascript:" + jsFunction + "(1)'>" + gridStartTxt + "</a></span> ";
	} else {
		retStr += "'gridPagingDisable'>" + gridStartTxt + "</span> ";
	}
	
	// 앞으로
	retStr += "<span class=";
	if (goPage > gridViewPageCount) {
		retStr += "'gridPagingMove'><a href='javascript:" + jsFunction + "(" + prepage + ")'>" + gridPrevTxt + "</a></span> ";
	} else {
		retStr += "'gridPagingDisable'>" + gridPrevTxt + "</span> ";
	}
	
	for (var i = (1 + prepage); i < gridViewPageCount + 1 + prepage; i++) {
		if (goPage == i) {
			retStr += "<span class='gridPagingCurrent'>";
			retStr += i;
			retStr += "</span>";
		} else {
			retStr += "<span>";
			retStr += "<a href='javascript:" + jsFunction + "(" + i + ")'>" + i + "</a>";
			retStr += "</span>";
		}

		if (i >= gridTotalPage) {
			retStr += " ";
			break;
		}

		if (i == gridViewPageCount + prepage)
			retStr += " ";
		else
			retStr += gridPageGapTxt;
	}
	
	// 뒤로
	retStr += "<span class=";
	if (nextpage <= gridTotalPage) {
		retStr += "'gridPagingMove'><a href='javascript:" + jsFunction + "(" + nextpage + ")'>" + gridNextTxt + "</a></span> ";
	} else {
		retStr += "'gridPagingDisable'>" + gridNextTxt + "</span> ";
	}
	
	// 맨뒤로
	retStr += "<span class=";
	if (goPage != gridTotalPage) {
		retStr += "'gridPagingMove'><a href='javascript:" + jsFunction + "(" + gridTotalPage + ")'>" + gridEndTxt + "</span>";
	} else {
		retStr += "'gridPagingDisable'>" + gridEndTxt + "</span>";
	}
	gridPageNavigationDiv.innerHTML = retStr;
}

/***************************************************************************
 * Description : grid 헤드 클릭시 정렬기능 
 * @author  : 김창열
 * @since   : 2017.01.06
 * 1) grid의 layoutComplete 이벤트시 => rMateSortHeadInit;
 * 2) grid의 헤드클릭 이벤트시 => rMateSortHeadRelease;
 * 조회 버튼을 클릭하거나 등의 grid 초기화 할경우 => rMateSortHeadSetDefault(그리드객체명);	
 ***************************************************************************/
var rMateSortHeadName = [];	//헤드명설정
var rMateSortColumnName;
var rMateSortOrderby;
var rMateCount;
var rMateColumns;

/*
 *  헤드명설정 기본값으로 셋팅
 *  @dataGrid : 그리드 객체
 */
function rMateSortHeadInit(dataGrid){
	
	rMateSortColumnName = "";
	rMateSortOrderby = "";
	
	if(typeof dataGrid != "undefined" && dataGrid != null)
	{
		rMateSortHeadGet(dataGrid);
		
		rMateSortHeadSetDefault(dataGrid);
	}
}

function rMateSortHeadGet(dataGrid){
	
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	rMateCount = dataGrid.getColumns().length;				// 전체 컬럼
	//rMateCount = dataGrid.getDisplayableColumns().length;	// visible="false" 인것 제외
	
	rMateColumns = dataGrid.getColumns();					// 전체 컬럼
	//rMateColumns = dataGrid.getDisplayableColumns();		// visible="false" 인것 제외
	
	for(var i = 0; i<rMateCount; i++)
	{
		if(typeof rMateColumns[i] != "undefined" && rMateColumns[i] != null)
		{
			//헤드명설정 (▼ 이것이 적용되지 않은 값 설정)
			rMateSortHeadName[i] = rMateColumns[i].getHeaderText();
		}
	}
}

/*
 *  헤드명설정 기본값으로 셋팅
 *  @dataGrid : 그리드 객체
 *  @column_name : 정렬할 헤더 컬럼 key (서버 통신할 파라미터)
 *  @orderby : 정렬 구분 key (서버 통신할 파라미터)
 */
function rMateSortHeadSetDefault(dataGrid, column_name, orderby){
	
	if(typeof dataGrid != "undefined" || dataGrid != null)
	{
		for(var i=0; i<rMateCount; i++)
		{
			if(typeof rMateColumns[i] != "undefined" && rMateColumns[i] != null)
			{
				rMateColumns[i].setHeaderText(rMateSortHeadName[i]);
			}
		}
	}
	
	if(typeof column_name != "undefined" && column_name != null && typeof orderby != "undefined" && orderby != null)
	{
		document.getElementById(column_name).value = "";
		document.getElementById(orderby).value = "";
	}
}

/*
 *  헤더 정렬 클릭시 아이콘 이미지 표시 
 *  @dataGrid : 그리드 객체
 *  @event : 헤더 클릭 event 객체 (rMate)
 *  @column_name : 정렬할 헤더 컬럼 key (서버 통신할 파라미터)
 *  @orderby : 정렬 구분 key (서버 통신할 파라미터)
 */
function rMateSortHeadRelease(dataGrid, event, column_name, orderby){
	
	if(typeof dataGrid == "undefined" || dataGrid == null || typeof event == "undefined" || event == null )
	{
		return;
	}
	
	var columnIndex = event.columnIndex;
	var column = rMateColumns[columnIndex];
	var dataField = column.getDataField();
	
	if(dataField != rMateSortColumnName)		// 현재헤더가 아닌 다른 헤더의 정렬 클릭시
	{
		rMateSortOrderby = "ASC";
	}
	else
	{
		if(rMateSortOrderby == "" || rMateSortOrderby == "DESC")
		{
			rMateSortOrderby = "ASC";
		}
		else
		{
			rMateSortOrderby = "DESC";
		}
	}
	rMateSortColumnName = dataField;
	
	rMateSortHeadSetDefault(dataGrid, column_name, orderby);	// sorting header 디폴트로 다시 셋팅
	
	column.setItemRenderer(gridRoot1.newFactoryInstance("HtmlItem"));
	
	$(".rMateH5__DataGridHeaderRenderer").css({textAlign:'center'});
	$(".rMateH5__UITextField").css({position:'static', left:'inherit', top:'inherit'});	

	if(rMateSortOrderby == "DESC"){
		// 내림 차순 설정 올림은 false
		column.setHeaderText(rMateSortHeadName[columnIndex] + "<img style='position:absolute;top:50%;right:0px;margin-top:-3px;' src=\"/resources/js/rMateGridH5/Assets/down-arrow-black.png\" alt=\"역순 정렬\">");
	}else{
		column.setHeaderText(rMateSortHeadName[columnIndex] + "<img style='position:absolute;top:50%;right:0px;margin-top:-3px;' src=\"/resources/js/rMateGridH5/Assets/up-arrow-black.png\" alt=\"순차 정렬\">");
	}	
	
	document.getElementById(column_name).value = rMateSortColumnName;
	document.getElementById(orderby).value = rMateSortOrderby;
}

/***************************************************************************
 * Function Name : rMateLabelFunc
 * Description : 끝에 '%' 붙이기
 * @author  : 김창열
 * @since   : 2017.02.17
 * @parameters : 
 * 		item : 
 *		value : 
 * 
 * return : string
 ***************************************************************************/
function rMateLabelFunc(item, value, column){
	return value + "%";
}

/***************************************************************************
 * Function Name : rMateLabelPhoneFunc
 * Description : 폰번호 하이픈 처리및 가운데 자리 '*' 표시 함수
 * @author  : 김경진
 * @since   : 2017.02.17
 * @parameters : 
 * 		item : 
 *		value : 
 * 
 * return : string
 ***************************************************************************/
function rMateLabelPhoneFunc(item, value, column){
	return CommonJs.phoneFomatter(value, 0);
}

/***************************************************************************
 * Function Name : rMateLabelPhoneFunc
 * Description : 폰번호 하이픈 처리
 * @author  : 김경진
 * @since   : 2017.02.21
 * @parameters : 
 * 		item : 
 *		value : 
 * 
 * return : string
 ***************************************************************************/
function rMateLabelPhoneFunc2(item, value, column){
	return CommonJs.phoneFomatter(value);
}

/***************************************************************************
 * Function Name : rMateLabelBusiFunc
 * Description : 사업자 번호 하이픈 처리
 * @author  : 김경진
 * @since   : 2017.04.04
 * @parameters : 
 * 		item : 
 *		value : 
 * 
 * return : string
 ***************************************************************************/
function rMateLabelBusiFunc(item, value, column){
	return CommonJs.busiFomatter(value);
}

/***************************************************************************
 * Function Name : perFunction
 * Description : grid에 0 -> 0.0 으로 표시
 * @author  : 김창열
 * @since   : 2017.03.02
 * @parameters : 
 * 		item : 
 *		value : 
 * 
 * return : string
 ***************************************************************************/
function perFunction(num1){
	if(isNaN(num1) || Infinity == num1){
		return "0.0";	
	}else{
		//var num2 = num1.toFixed(1);	//소수점 한자리
		var num2 = Math.round(num1*10)/10;
		if(num2 == 0){
			return "0.0";
		}else{
			if(num2.toString().indexOf(".") == -1){		//정수는 .0 을 붙여줘야 됨
				return num2 + ".0";	
			}else{
				return num2;
			}
		}
	} 	
}

/***************************************************************************
 * Function Name : perFunction
 * Description : grid에 0 -> 00,000,000,000.0 으로 표시 (위 함수에 콤마만 추가) 
 * @author  : 오동근
 * @since   : 2017.04.12
 * @parameters : 
 * 		item : 
 *		value : 
 * 
 * return : string
 ***************************************************************************/
function perFunction2(num1){
	if(isNaN(num1) || Infinity == num1){
		return "0.0";	
	}else{
		//var num2 = num1.toFixed(1);	//소수점 한자리
		var num2 = Math.round(num1*10)/10;
		if(num2 == 0){
			return "0.0";
		}else{
			if(num2.toString().indexOf(".") == -1){		//정수는 .0 을 붙여줘야 됨
				return numberWithCommas(num2) + ".0";	
			}else{
				return numberWithCommas(num2);
			}
		}
	} 	
}

function numFunction(num1){
	if(isNaN(num1) || Infinity == num1){
		return "0";	
	}else{
		var num2 = parseInt(num1); //소수점 버리기 
		num2 = numberWithCommas(num2);	//3자리 마다 , 찍기
		return num2;
	} 	
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




