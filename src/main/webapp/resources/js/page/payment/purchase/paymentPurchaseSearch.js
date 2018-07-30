/********************************************************
 * 설명:  거래선별 매입 조회(직매입)
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.02.22
 * version : 1.0
 ********************************************************/



$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	$(".datepicker").datepicker();
	
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";

//그리드1 데이터 초기화
var gridData = [];
//헤더정렬을 위한 FALG
var searchFlag ="";
//페이징 처리 필요 변수
var RowsPerPage = 25;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호
var totalCnt = 0;
var orderBy = "";
var columnName = ""; 


// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%");
//rMateGridH5.create("grid2", "gridHolder2", jsVars);

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp1.setLayout(layoutStr1);
		gridApp1.setData(gridData);
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}  
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);

	drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
	
	
	//그리드 속성지정
	//collection = gridRoot1.getCollection();
	//collection.addRowAttributeDetailAt(7, null, "#ffd633");
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;

//----------------------- 그리드 설정 끝 -----------------------
var layoutStr1;
//그리드1 헤더 설정

layoutStr1 =
'<rMateGrid>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="9" />\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" horizontalScrollPolicy="auto" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="RNUM"  		headerText="' + rowNumber + '"	    textAlign="center" width="50"/>\
			<DataGridColumn dataField="VEN_CODE"  	headerText="' + venCode + '"  		textAlign="center" width="90"	/>\
			<DataGridColumn dataField="VEN_NAME"  	headerText="' + supply + '"  		textAlign="left" width="160" />\
			<DataGridColumn dataField="STR_NAME" 	headerText="' + storNm + '" 		textAlign="center" width="70" />\
			<DataGridColumn dataField="GRE_GB" 	headerText="' + greGb + '" 		textAlign="center" width="70" />\
			<DataGridColumn dataField="PUR_DT"  	headerText="전표일자"		textAlign="center" width="80" formatter="{datefmt}" />\
			<DataGridColumn dataField="ITM_CODE"	headerText="' + itmCode + '" 		textAlign="center" width="100"	/>\
			<DataGridColumn dataField="LINK_CODE"  	headerText="' + scanCode + '" 		textAlign="center" width="100"  />\
			<DataGridColumn dataField="ITM_NAME"	headerText="' + itmName + '" 		textAlign="left" width="200" />\
			<DataGridColumn dataField="TAX_GB"		headerText="' + taxGb + '" 			textAlign="center" width="60"	 sortable="false"/>\
			<DataGridColumn dataField="DEC_QTY"		headerText="' + decQty + '" 		textAlign="center" width="60"	 sortable="false"/>\
			<DataGridColumn dataField="PUR_WPRC"	headerText="' + purchaseCost + '" 	textAlign="right" formatter="{numfmt}"  sortable="false"/>\
			<DataGridColumn dataField="PUR_WVAT"	headerText="' + taxGubun + '" 		textAlign="right" formatter="{numfmt}"  sortable="false"/>\
			<DataGridColumn dataField="PUR_WAMT"	headerText="' + purchasePrice + '" 	textAlign="right" formatter="{numfmt}"  sortable="false"/>\
			<DataGridColumn dataField="PUR_WAMT2"	headerText="' + puchasAmount + '" 	textAlign="right" formatter="{numfmt}"  sortable="false"/>\
			<DataGridColumn dataField="PUR_SPRC"	headerText="' + purSprc + '" 		textAlign="right" formatter="{numfmt}"  sortable="false"/>\
			<DataGridColumn dataField="PUR_SAMT"	headerText="' + purSamt + '" 		textAlign="right" formatter="{numfmt}"  sortable="false"/>\
			<DataGridColumn dataField="ROUTE_GB"	headerText="' + routeGb + '" 		textAlign="center" width="70"  sortable="false"/>\
			<DataGridColumn dataField="BOT_SPRC"	headerText="' + botSprc + '" 		textAlign="right" width="70" formatter="{numfmt}"  sortable="false"/>\
			<DataGridColumn dataField="BOT_SUM"		headerText="' + botSum + '" 		textAlign="right" formatter="{numfmt}"  sortable="false"/>\
			<DataGridColumn dataField="CFM_DT"		headerText="입고일자" 	textAlign="center" width="80" formatter="{datefmt}"  sortable="false"/>\
			<DataGridColumn dataField="SLIP_NO"		headerText="' + docNo + '" 			textAlign="center" width="100" 	 sortable="false"/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';
/*
<dataProvider>\
		<SpanSummaryCollection source="{$gridData}">\
			<summaries>\
		        <SpanSummaryRow summaryPlacement="last" label="합계" labelDataField="No" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
		            <SpanSummaryField dataField="DEC_QTY" summaryOperation="SUM" />\
		            <SpanSummaryField dataField="PUR_WPRC" id="sumPUR_WPRC" />\
		            <SpanSummaryField dataField="PUR_WVAT" summaryOperation="SUM" />\
		            <SpanSummaryField dataField="PUR_WAMT" summaryOperation="SUM" />\
		            <SpanSummaryField dataField="PUR_SPRC" summaryOperation="SUM" />\
		            <SpanSummaryField dataField="PUR_SAMT" summaryOperation="SUM" />\
		            <SpanSummaryField dataField="BOT_SPRC" summaryOperation="SUM" />\
		            <SpanSummaryField dataField="BOT_SUM" summaryOperation="SUM" />\
		        </SpanSummaryRow>\
		    </summaries>\
	    </SpanSummaryCollection>\
    </dataProvider>\
*/

//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {
	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	btn_search(false);
}

//그리드 페이지 이동
function gridMovePage(page) {
	
	//alert(page);
	$("#pageIndex").val(page);
	pageIndex = page;
	
	btn_search(false);
	
}
// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   				   ###
//########################################################

//조회 (searchFlag -> true : 헤더정렬 기본값으로    false : 헤더정렬 값 유지)
function btn_search(searchFlag){
	var loadData 		= $("#top_search").serializeAllObject(); 
	var stdDt 			= $("#P_SEARCH_START_DT").val().replace(/-/g, "");
	var enddDt 			= $("#P_SEARCH_END_DT").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#P_SEARCH_START_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_SEARCH_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//조회시 그리드1 선택 데이터 초기화
	dataRow1 = null;
	
	//유효성검사
	if( searchFlag  ==  true)
	{
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
		//페이지 1페이지로 이동
		pageIndex = 1;
		$("#pageIndex").val(pageIndex);
	}
	
	
	if($.trim($("#P_SEARCH_START_DT").val() ) == null || $.trim($("#P_SEARCH_START_DT").val() ) == "")
	{
		confirm(purDt + msgConfirm);
		$("#P_SEARCH_START_DT").focus();
		return;
	}
	
	if($.trim($("#P_SEARCH_END_DT").val() ) == null || $.trim($("#P_SEARCH_END_DT").val() ) == "")
	{
		confirm(purDt + msgConfirm);
		$("#P_SEARCH_END_DT").focus();
		return;
	}
	
	if(Number(stdDt) > Number(enddDt))
	{
		alert(msgDateValidation);	
		$("#P_SEARCH_END_DT").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SEARCH_START_DT").focus();
		return;
	}

	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "") $("#P_VEN_CODE").val("");
	
	
	$("#tbody").empty();
	
	loadData.P_STR_CODE 	= $("#P_STR_CODE").val();
	loadData.ROWS_PER_PAGE 	= RowsPerPage; 
	
	showLoadingBar1();
	gridApp1.setData(gridData);
	
	//그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/paymentPurchaseInfoList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
	    },
		success:function(data){  
			//alert(data.list);
			gridApp1.setData(data.list);
			//var resultTotalCount = data.list;
			var resultList = data.totalList;
			
			//alert('data.totalCount='+data.totalCount+' , '+resultTotalCount[0].TOTAL_CNT);
			totalCnt = data.totalCount;
			//totalCnt = resultTotalCount[0].TOTAL_CNT; //data[0].TOTAL_CNT;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
			for(var i=0; i < resultList.length; i++){
				$("#tbody").append('<tr><th scope="row">' + resultList[i].TOT_TAX_GB + '</th><td>' + moneyComma(String(resultList[i].TOT_TAX_COUNT)) + '</td><td>' + moneyComma(String(resultList[i].TOT_DEC_QTY)) + '</td><td>' + moneyComma(String(resultList[i].TOT_PUR_WPRC)) + '</td><td>' + moneyComma(String(resultList[i].TOT_PUR_WVAT)) + '</td><td>' + moneyComma(String(resultList[i].TOT_SUM)) + '</td></tr>');
			}
			
			$("#TOT_BOT_SUM").text(botDeposit + ": " + moneyComma(String(data.TOT_BOT_SUM)));
			$("#TOT_PAY").text(botPurchTotal + ": " + moneyComma(String(data.TOT_PAY)));
			
			$("#tbody").append('<tr><th scope="row">' + sm + '</th><td>' +  moneyComma(String(data.RESULT_COUNT)) + '</td><td>' + moneyComma(String(data.RESULT_DEC_QTY)) + '</td><td>' + moneyComma(String(data.RESULT_PUR_WPRC)) + '</td><td>' + moneyComma(String(data.RESULT_PUR_WVAT)) + '</td><td>' + moneyComma(String(data.RESULT_SUM)) + '</td></tr>');
			
	    },    
	    complete : function(data) {
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}
}

//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
}

//엑셀 export
function fnExcelExport(){
	var loadData 		= $("#top_search").serializeAllObject();
	var P_COLUMN_NAME 	= $.trim($('#P_COLUMN_NAME').val());
	var P_ORDERBY 		= $.trim($('#P_ORDERBY').val());
	var P_STR_DT_ARR	= $("#P_SEARCH_START_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_SEARCH_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	
	
	//유효성검사
	if($("#P_STR_CODE").val() == ""){
		alert("점포를 선택 하세요.");
		$("#P_STR_CODE").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SEARCH_START_DT").focus();
		return;
	}
	
	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	
	$.download('/excelPaymentPurchaseInfoList.do',"P_STR_CODE="+loadData.P_STR_CODE
												 +"&P_SEARCH_START_DT="+loadData.P_SEARCH_START_DT
												 +"&P_SEARCH_END_DT="+loadData.P_SEARCH_END_DT 
												 +"&P_VEN_NAME="+loadData.P_VEN_NAME 
												 +"&P_VEN_CODE="+loadData.P_VEN_CODE
												 +"&P_PUR_GB="+loadData.P_PUR_GB
												 +"&P_GRE_GB="+loadData.P_GRE_GB
												 +"&P_LIMIT_LEVEL=1" //+loadData.P_LIMIT_LEVEL
												 +"&P_COLUMN_NAME="+P_COLUMN_NAME
												 +"&P_ORDERBY="+P_ORDERBY
			 ,"post" );
}

function clearVenCode()
{ 	
	if(  $('#VEN_NAME').val()  == "" )
	{
		 $('#VEN_CODE').val("");
	}
}

function fnSearch(){
	if($.trim($("#P_SEARCH_START_DT").val() ) == null || $.trim($("#P_SEARCH_START_DT").val() ) == "")
	{
		confirm(purDt + msgConfirm);
		$("#P_SEARCH_START_DT").focus();
		return;
	}
	
	if($.trim($("#P_SEARCH_END_DT").val() ) == null || $.trim($("#P_SEARCH_END_DT").val() ) == "")
	{
		confirm(purDt + msgConfirm);
		$("#P_SEARCH_END_DT").focus();
		return;
	}
	
	var stdDt = $("#P_SEARCH_START_DT").val().replace(/-/g, "");
	var enddDt = $("#P_SEARCH_END_DT").val().replace(/-/g, "");
	if(Number(stdDt) > Number(enddDt))
	{
		alert(msgDateValidation);	
		$("#P_SEARCH_END_DT").focus();
		return;
	}

//	if($.trim($("#P_STR_CODE").val() ) == null || $.trim($("#P_STR_CODE").val() ) == "")
//	{
//		confirm(storeName + msgConfirm);
//		$("#P_STR_CODE").focus();
//		return;
//	}
	
	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "") $("#P_VEN_CODE").val("");
	
	$("#tbody").empty();
	
	var loadData = $("#top_search").serializeAllObject(); 

	// Paging 초기화
	loadData.PAGE_INDEX = "1";
	pageIndex = "1";
	
	jQuery.ajax({ 
	    url:"/paymentPurchaseInfoList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){  
			gridApp1.setData(data.list);
			//var resultTotalCount = data.list;
			var resultList = data.totalList;
			
			//alert('data.totalCount='+data.totalCount+' , '+resultTotalCount[0].TOTAL_CNT);
			totalCnt = data.totalCount;
			//totalCnt = resultTotalCount[0].TOTAL_CNT; //data[0].TOTAL_CNT;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
			for(var i=0; i < resultList.length; i++){
				$("#tbody").append('<tr><th scope="row">' + resultList[i].TOT_TAX_GB + '</th><td>' + moneyComma(String(resultList[i].TOT_TAX_COUNT)) + '</td><td>' + moneyComma(String(resultList[i].TOT_DEC_QTY)) + '</td><td>' + moneyComma(String(resultList[i].TOT_PUR_WPRC)) + '</td><td>' + moneyComma(String(resultList[i].TOT_PUR_WVAT)) + '</td><td>' + moneyComma(String(resultList[i].TOT_SUM)) + '</td></tr>');
			}
			
			$("#TOT_BOT_SUM").text(botDeposit + ": " + moneyComma(String(data.TOT_BOT_SUM)));
			$("#TOT_PAY").text(botPurchTotal + ": " + moneyComma(String(data.TOT_PAY)));
			
			$("#tbody").append('<tr><th scope="row">' + sm + '</th><td>' +  moneyComma(String(data.RESULT_COUNT)) + '</td><td>' + moneyComma(String(data.RESULT_DEC_QTY)) + '</td><td>' + moneyComma(String(data.RESULT_PUR_WPRC)) + '</td><td>' + moneyComma(String(data.RESULT_PUR_WVAT)) + '</td><td>' + moneyComma(String(data.RESULT_SUM)) + '</td></tr>');
	    },
	    complete : function(data) {
	    	dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	    }
	});
}


function init() {
	var nowDate = new CommDateManager().getDate("yyyy-mm-dd");
	var firstDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	
	$("#P_SEARCH_END_DT").val(nowDate);
	$("#P_SEARCH_START_DT").val(nowDate);
	getCommonCodeSelectBoxList("P_PUR_GB",   "PUR_GB");    //	공제코드
	
	//getCommonCodeSelectBoxList("P_GRE_GB",   "P_GRE_GB");    //	거래구분코드
	
	$("#P_STR_CODE").append('<option value="">'+ all +'</option>');
	getStoreCode("P_STR_CODE");
	$("select[id='P_STR_CODE']").val(SSSC).prop("selected", true); // 회원의 점포 선택
	
	/*
	// 매출집계/거래건별
	$("input:radio[name='P_LIMIT_LEVEL']:radio[value='2']").prop("checked", true);
	//$("input:radio[id='P_LIMIT_LEVEL_1']").attr("checked", true);
	*/

	$(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_SEARCH_START_DT").val()  >  $("#P_SEARCH_END_DT").val()     )
			{   alert("검색할 납품예정  끝 일자는 시작 일자보다 작을수 없습니다.");
				$("#P_SEARCH_START_DT").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
		});
	 
	$(".datepicker2").datepicker({ onSelect: function(dateText) 
	 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_SEARCH_START_DT").val()  >  $("#P_SEARCH_END_DT").val()     )
			{   alert("검색할 납품예정 끝 일자는 시작 일자보다 작을수 없습니다.");
			$("#P_SEARCH_END_DT").val(CUR_DT);
				return;
			}	 
	 }, 	 showMonthAfterYear:true 
	});
		
	// 협력(매입)업체에서 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        } 
	});
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-169); // -169

	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-169); // -169
	});
});


//그리드 로딩바  보이기
function showLoadingBar1() {
  gridRoot1.addLoadingBar();
}

//그리드 로딩바  숨기기
function hideLoadingBar1() {
  gridRoot1.removeLoadingBar();
}