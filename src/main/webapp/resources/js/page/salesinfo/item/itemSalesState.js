/********************************************************
 * 설명: 협력업체매출현황 매뉴화면
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 추황영
 * since	: 2017.04.26
 * version : 1.0
 ********************************************************/

var saleSd;
var saleEd;
var venCd;
var grid1SumObj;
var saleAmt = 0;
var saleQty = 0;    // 수량
var guestCnt = 0; // 객수

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	init();
	
});
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1;
var gridApp2, gridRoot2, dataGrid2, dataRow2;

var gridData1 = [];
//그리드2 데이터 초기화
var gridData2 = [];

//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid2", "gridHolder2", jsVars1);

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

var gridData1ClickStrCode = "";
var totalCnt;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

var gridData1ClickStrCode = "";

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);		
	}
	else if(id == 'grid2') {
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp2.setLayout(layoutStr2);
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);			
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
		
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
	selectorColumn1 = gridRoot1.getObjectById("selector");	
	
	dataGrid1.addEventListener('itemClick', getDetailGridData);
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체

	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid2);
}
//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	
}


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048" colSpan="5"/>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
	    <NumberFormatter id="numfmt2" useThousandsSeparator="true" precision="2" />\
			<DataGrid id="dg1" sortableColumns="false" showDataTips="true"  horizontalScrollPolicy="auto" lockedColumnCount="5" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
	                <DataGridColumn dataField="STR_CODE" 	 headerText="점포코드" 			    width="100"  resizable="false"  	textAlign="center" visible="false" />\
					<DataGridColumn dataField="STR_NAME"  	 headerText="점포명" 			    width="100"  resizable="false"  	textAlign="center" />\
					<DataGridColumn dataField="SCAN_CODE" 	 headerText="스캔코드" 			    width="100"  resizable="false"  	textAlign="center"/>\
					<DataGridColumn dataField="ITM_NAME" 	     headerText="상품명" 			    width="200"  textAlign="left"                                                                    />\
					<DataGridColumn dataField="UNIT" 	       	     headerText="규격" 			        width="50" 	textAlign="left"/>\
					<DataGridColumn dataField="SALE_QTY" 	     headerText="수량" 			        width="50"    resizable="false"  	textAlign="right"  formatter="{numfmt}"    />\
					<DataGridColumn dataField="SALE_AVG" 	     headerText="평균단가" 			    width="100"    resizable="false"  	textAlign="right"  formatter="{numfmt2}"  />\
					<DataGridColumn dataField="SALE_AMT" 	     headerText="매출합계" 			    width="110"  resizable="false"  	textAlign="right"  formatter="{numfmt}"    />\
					<DataGridColumn dataField="BOT_AMT" 	     headerText="'+botSum+'" 	    width="70"    resizable="false"  	textAlign="right"  formatter="{numfmt}"    />\
					<DataGridColumn dataField="DC_AMT" 		 headerText="'+productDc+'" 	width="70"    resizable="false" 	textAlign="right"  formatter="{numfmt}"    />\
					<DataGridColumn dataField="MBR_DC_AMT"  headerText="회원할인" 			width="70"    resizable="false"  	textAlign="right"  formatter="{numfmt}"    />\
					<DataGridColumn dataField="SALE_TOTAL" 	 headerText="매출금액" 			    width="110"  resizable="false"  	textAlign="right"  formatter="{numfmt}"    />\
					<DataGridColumn dataField="CNT" 		         headerText="객수" 		            width="50"	    resizable="false"  	textAlign="right"  formatter="{numfmt}"    />\
					<DataGridColumn dataField="CNT_PRICE" 	 headerText="객단가" 			    width="50" 	textAlign="right"                              formatter="{numfmt}"    />\
				</groupedColumns>\
				<footers>\
					<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn label="'+sm+'" />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn  labelJsFunction="labelFunc1" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn  labelJsFunction="labelFunc2" formatter="{numfmt2}" textAlign="right" />\
						<DataGridFooterColumn  labelJsFunction="labelFunc3" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn  labelJsFunction="labelFunc4" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn  labelJsFunction="labelFunc5" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn  labelJsFunction="labelFunc6" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn  labelJsFunction="labelFunc7" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn  labelJsFunction="labelFunc8" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn  labelJsFunction="labelFunc9" formatter="{numfmt}"   textAlign="right" />\
					</DataGridFooter>\
				</footers>\
			</DataGrid>\
	</rMateGrid>';	

var layoutStr2 = 
	'<rMateGrid>\
		<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048" colSpan="5"/>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
	    <NumberFormatter id="numfmt2" useThousandsSeparator="true" precision="2" />\
			<DataGrid id="dg1" sortableColumns="true" showDataTips="true"  horizontalScrollPolicy="auto" lockedColumnCount="5" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
					<DataGridColumn id="STR_CODE" dataField="STR_CODE" 	 headerText="점포코드" 			resizable="false" width="100" 	textAlign="center" visible="false" />\
					<DataGridColumn id="SCAN_CODE"  dataField="SCAN_CODE" 	 headerText="스캔코드" 			resizable="false" width="100" 	textAlign="center"/>\
					<DataGridColumn id="ITM_NAME" dataField="ITM_NAME"   	 headerText="상품명" 			width="200" textAlign="left" />\
					<DataGridColumn id="UNIT" dataField="UNIT" 		         headerText="규격" 			width="50" 	textAlign="left"/>\
					<DataGridColumn id="SALE_DT" dataField="SALE_DT"     	 headerText="매출일자" 			resizable="false" width="80" 	textAlign="center"/>\
					<DataGridColumn id="GUBN" dataField="GUBN" 		     headerText="구분" 			resizable="false" width="60" 	textAlign="center" />\
					<DataGridColumn id="SALE_QTY" dataField="SALE_QTY" 	     headerText="수량" 			resizable="false" width="50" 	textAlign="right"  formatter="{numfmt}"  />\
					<DataGridColumn id="SALE_AVG" dataField="SALE_AVG" 	     headerText="평균단가" 			resizable="false" width="70" 	textAlign="right"  formatter="{numfmt2}" />\
					<DataGridColumn id="SALE_AMT" dataField="SALE_AMT" 	     headerText="매출합계" 			resizable="false" width="110" 	textAlign="right"  formatter="{numfmt}"  />\
					<DataGridColumn id="BOT_AMT" dataField="BOT_AMT" 	     headerText="'+botSum+'" 	resizable="false" width="70" 	textAlign="right"  formatter="{numfmt}"  />\
					<DataGridColumn id="DC_AMT" dataField="DC_AMT" 		 headerText="'+productDc+'" 	resizable="false" width="70" 	textAlign="right"  formatter="{numfmt}"  />\
					<DataGridColumn id="MBR_DC_AMT" dataField="MBR_DC_AMT"  headerText="회원할인" 			resizable="false" width="70" 	textAlign="right"  formatter="{numfmt}"  />\
					<DataGridColumn id="SALE_TOTAL" dataField="SALE_TOTAL" 	 headerText="매출금액" 			resizable="false" width="110" 	textAlign="right"  formatter="{numfmt}"  />\
					<DataGridColumn id="CNT" dataField="CNT" 		         headerText="객수" 			resizable="false" width="50" 	textAlign="right"  formatter="{numfmt}" />\
					<DataGridColumn id="CNT_PRICE" dataField="CNT_PRICE" 	 headerText="객단가" 			width="50" 	textAlign="right"  formatter="{numfmt}" />\
				</groupedColumns>\
				<footers>\
					<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn label="'+sm+'" />\
						<DataGridFooterColumn />\
						<DataGridFooterColumn />\
						<DataGridFooterColumn />\
						<DataGridFooterColumn />\
						<DataGridFooterColumn labelJsFunction="labelFunc10" summaryOperation="SUM" dataColumn="{SALE_QTY}" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc11" summaryOperation="SUM" dataColumn="{SALE_AMT}" formatter="{numfmt2}"   textAlign="right" />\
						<DataGridFooterColumn summaryOperation="SUM" dataColumn="{SALE_AMT}" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn summaryOperation="SUM" dataColumn="{BOT_AMT}" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DC_AMT}" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn summaryOperation="SUM" dataColumn="{MBR_DC_AMT}" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn summaryOperation="SUM" dataColumn="{SALE_TOTAL}" formatter="{numfmt}"   textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc12" summaryOperation="SUM" dataColumn="{CNT}" formatter="{numfmt}"   textAlign="right"/>\
						<DataGridFooterColumn labelJsFunction="labelFunc13" summaryOperation="SUM" dataColumn="{SALE_TOTAL}" formatter="{numfmt}" textAlign="right" />\
					</DataGridFooter>\
				</footers>\
			</DataGrid>\
	</rMateGrid>';



/*
 * Footer 함수 정의
 */
// 총 수량
function labelFunc1(item, value, column) {
	if(grid1SumObj && grid1SumObj.length > 0) {
		return grid1SumObj[0].SALE_QTY;
	}
	else {
		return 0;
	}
}

// 총 평균단가
function labelFunc2(item, value, column) {
	if(grid1SumObj && grid1SumObj.length > 0) {
		return grid1SumObj[0].SALE_AVG;
	}
	else {
		return 0;
	}
}

// 총 매출합계
function labelFunc3(item, value, column) {
	if(grid1SumObj && grid1SumObj.length > 0) {
		return grid1SumObj[0].SALE_AMT;
	}
	else {
		return 0;
	}
}

function labelFunc4(item, value, column) {
	if(grid1SumObj && grid1SumObj.length > 0) {
		return grid1SumObj[0].BOT_AMT;
	}
	else {
		return 0;
	}
}

function labelFunc5(item, value, column) {
	if(grid1SumObj && grid1SumObj.length > 0) {
		return grid1SumObj[0].DC_AMT;
	}
	else {
		return 0;
	}
}

function labelFunc6(item, value, column) {
	if(grid1SumObj && grid1SumObj.length > 0) {
		return grid1SumObj[0].MBR_DC_AMT;
	}
	else {
		return 0;
	}
}

function labelFunc7(item, value, column) {
	if(grid1SumObj && grid1SumObj.length > 0) {
		return grid1SumObj[0].SALE_TOTAL;
	}
	else {
		return 0;
	}
}

function labelFunc8(item, value, column) {
	if(grid1SumObj && grid1SumObj.length > 0) {
		return grid1SumObj[0].CNT;
	}
	else {
		return 0;
	}
}

function labelFunc9(item, value, column) {
	if(grid1SumObj && grid1SumObj.length > 0) {
		return grid1SumObj[0].CNT_PRICE;
	}
	else {
		return 0;
	}
}

/* 그리드2 */
function labelFunc10(item, value, column) {
	saleQty = value;
	return value;
}


function labelFunc11(item, value, column) {
	if(saleQty == 0) {
		return 0;
	}
	else {
		return Math.round(value / saleQty, 2);
	}
}

function labelFunc12(item, value, column) {
	guestCnt = value;
	return value;
}

function labelFunc13(item, value, column) {
	
	console.log(value, guestCnt);
	
	if(guestCnt == 0) {
		return 0;
	}
	else {
		return Math.round(value / guestCnt);
	}
}




//목록 그리드 조회
function getGridData(isFirstPage) {
	var params 			= $("#sertch_frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_SALES_SD").val().split("-");
	var P_END_DT_ARR 	= $("#P_SALES_ED").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;
	

	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//유효성검사
	if(dateDiff > 365) {
		alert("조회 일자 간 365일 이상은 조회하실 수 없습니다.");
		$("#P_STR_DT").focus();
		return false;
	}
	
	//날짜 체크
	if($("#P_SALES_SD").val() == null || $("#P_SALES_SD").val() == "") {
		alert(selngDate + msgConfirm);
		$("#P_SALES_SD").focus();
		return;
	}
	
	if( $("#P_SALES_ED").val() == null || $("#P_SALES_ED").val() == "") {
		alert(selngDate + msgConfirm);
		$("#P_SALES_ED").focus();
		return;
	}
	
	var strDt = $("#P_SALES_SD").val().replace(/-/g, "");
	var endDt = $("#P_SALES_ED").val().replace(/-/g, "");
	
	if(strDt > endDt) {
		alert(msgDateValidation);
		$("#P_SALES_ED").focus(); 
		return;
	}
	
	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "") $("#P_VEN_CODE").val("");
	if($.trim($("#P_ITM_NAME").val() ) == null || $.trim($("#P_ITM_NAME").val() ) == "") $("#P_SCAN_CODE").val("");
	
	if(isFirstPage) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}

	
    jQuery.ajax({ 
	    url:"/itemSingleSalesStateList.do",
	    type:"POST",
		datatype:"json",
		async: true,
		data: params,
		beforeSend : function(){ 
			
			gridRoot1.addLoadingBar();
			
	    }, 
		success:function(data){
			
			if(data) {
				
				gridApp1.setData(data.list);
				gridRoot2.removeAll();
				var list2 = JSON.parse(data.list2);
				
				if(list2 && list2.length > 0) {
					totalCnt = list2[0].TOT_CNT;
					grid1SumObj = list2;
					if(totalCnt == 0 || totalCnt == undefined){
						drawGridPagingNavigation(0, RowsPerPage, pageIndex, "gridMovePage");
					}else{
						drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
					}
						
					
				}
				
				
				
				
				saleSd = strDt;
				saleEd = endDt;
				venCd = $('#P_VEN_CODE').val();
				
			}
			
	    },
	    complete : function(data) {
	    	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	gridRoot1.removeLoadingBar();
	    }
	});
}

/*
 * 상세 조회 
 */
function getDetailGridData(event) {
	
	var rowIndex = event.rowIndex;
	
	var strCode  = gridRoot1.getItemAt(rowIndex).STR_CODE;
	var scanCode = gridRoot1.getItemAt(rowIndex).SCAN_CODE;
	
	jQuery.ajax({ 
		url: "/itemSingleSalesStateDetailList.do",
	    type: "POST",
		datatype: "json",
		data: { P_STR_CODE: strCode, P_SALES_SD: saleSd, P_SALES_ED: saleEd, P_VEN_CODE: venCd, P_SCAN_CODE: scanCode},
		beforeSend : function() { 	    	
            gridRoot2.addLoadingBar();
	    }, 
		success: function(data) {
			
			console.log(data);
			
			gridApp2.setData(data.list);
			
			console.log('2222');
			
			dataGrid2.setEnabled(true);
	       	gridRoot2.removeLoadingBar();
	    },
	    complete : function(data) {
	    	gridRoot2.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	gridRoot2.removeLoadingBar();
	    }
	});
}


function chgCate1(){ 
	$("select[name='P_CLS_CODE'] option").remove();
	$("#P_CLS_CODE").prepend("<option value=''>"+select+"</option>");
	   
	getCateCodeSelectBoxList("P_MID_CODE","2",$('#P_LRG_CODE' ).val());	 
}
function chgCate2(){	
	var num1 = $('#P_MID_CODE' ).val().substr(0,2);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
		
	getCateCodeSelectBoxList("P_CLS_CODE","3",$('#P_MID_CODE' ).val());
}
function chgCate3(){	
	var num1 = $('#P_CLS_CODE' ).val().substr(0,2);
	var num2 = $('#P_CLS_CODE' ).val().substr(0,4);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
	$("#P_MID_CODE").val(num2).prop("selected", true);		
}

function gridMovePage(page) {
	$("#pageIndex").val(page);
	pageIndex = page;
	getGridData();
}

//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	getGridData();
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
		$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체CODE	
}

function excelExport(){    
	var nowDate = new CommDateManager().getDate("yyyymmdd");
	var str_name = $("#P_STR_CODE option:selected").text();
	dataGrid1.exportFileName = "단품매출판매내역"+nowDate+"_"+str_name+"_"+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}

function clearVenCode()
{ 	
	if(  $('#P_VEN_NAME').val()  == "" )
	{
		 $('#P_VEN_CODE').val("");
	}
}



//(점별상품검색) 팝업 호출 function
/*
function btn_comm_store_search(){
	
	if($("#P_STR_CODE").val()  == "")
	{
		alert("점포를 선택 하세요.");
		$("#P_STR_CODE").focus() ;
		return;
	}
	
	$('#comm_pop_wrap6_6' ).dialog( 'open' );
	$("#P_TEXT6_6").val("");
	
	gridApp15_6.setData([]);
	gridApp15_6.resize();   
	
	fnGetStrName();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
	
	$("#SET_VEN_CODE").val( $("#P_VEN_CODE").val() );
	$("#P_CALLBACK_NM6_6").val('fn_comm_store_callback(dataRow15_6)');
	$("#P_SELECTED_STR_CODE").val(  $("#P_STR_CODE").val()  );    // $("#P_STR_CODE").val() 는 부모창의 코드값
	
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT6_6").val($("#P_ITM_NAME").val());
		btn_comm_search6_6();  
	}
}


function fn_comm_store_callback(dataRow)
{ 
	$("#P_ITM_NAME").val( dataRow.ITM_NAME ) ;
	$("#P_SCAN_CODE").val( dataRow.SCAN_CODE ) ;
}
*/


//(점별상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#P_CALLBACK_NM2").val('btn_comm_product_search_call_back(dataRow11)');
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITM_NAME").val());
		btn_comm_search('2');
	}
}

function btn_comm_product_search_call_back(dataRow){
	$("#P_ITM_NAME").val(dataRow.ITM_NAME);
	$("#P_SCAN_CODE").val(dataRow.SCAN_CODE);
}




function excelExport(){
	var P_STR_CODE 	= $.trim($('#P_STR_CODE').val());
	var P_EMP_NO 	= $.trim($('#P_EMP_NO').val());
	var URL 		= $.trim($('#URL').val());
	var P_STR_CODE 	= $.trim($('#P_STR_CODE').val());
	var P_SALES_SD 	= $.trim($('#P_SALES_SD').val());
	var P_SALES_ED 	= $.trim($('#P_SALES_ED').val());
	var P_VEN_NAME 	= $.trim($('#P_VEN_NAME').val());
	var P_VEN_CODE 	= $.trim($('#P_VEN_CODE').val());
	var P_LRG_CODE 	= $.trim($('#P_LRG_CODE').val());
	var P_MID_CODE 	= $.trim($('#P_MID_CODE').val());
	var P_CLS_CODE 	= $.trim($('#P_CLS_CODE').val());
	var P_ITM_CODE 	= $.trim($('#P_ITM_CODE').val());
	var P_ITM_NAME 	= $.trim($('#P_ITM_NAME').val());
	var P_SCAN_CODE = $.trim($('#P_SCAN_CODE').val());
		 
	//엑셀호출
	$.download('/commonSearchDownload.do',"P_STR_CODE="+P_STR_CODE
			+"&P_EMP_NO="+P_EMP_NO
			+"&URL="+URL
			+"&P_STR_CODE="+P_STR_CODE
			+"&P_SALES_SD="+P_SALES_SD
			+"&P_SALES_ED="+P_SALES_ED
			+"&P_VEN_NAME="+P_VEN_NAME
			+"&P_VEN_CODE="+P_VEN_CODE
			+"&P_LRG_CODE="+P_LRG_CODE
			+"&P_MID_CODE="+P_MID_CODE
			+"&P_CLS_CODE="+P_CLS_CODE
			+"&P_ITM_CODE="+P_ITM_CODE
			+"&P_ITM_NAME="+P_ITM_NAME
			+"&P_SCAN_CODE="+P_SCAN_CODE
			,"post");
};

function init() {
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	$("#sertch_frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류

	
	//달력설정
	$("#P_SALES_SD").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_SALES_SD").val()  >  $("#P_SALES_ED").val()     ){
					alert(msgDateValidation);
					$("#P_SALES_SD").val(CUR_DT);
					return;
			}	 
		}, 	 showMonthAfterYear:true 
	});
	$("#P_SALES_ED").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_SALES_SD").val()  >  $("#P_SALES_ED").val()     ){
					alert(msgDateValidation);
					$("#P_SALES_ED").val(CUR_DT);
					return;
			}	 
		 },	 showMonthAfterYear:true 
	});
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	$("#P_SALES_SD").val(date);
	$("#P_SALES_ED").val(date);
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height(200);
	
	//그리드 너비 제어
	$("#gridHolder2").width("100%");
	$("#gridHolder2").height($(window).height() - 410);
	
	$(window).on('resize',function (){			
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height(200);
		
		//그리드 너비 제어
		$("#gridHolder2").width("100%");
		$("#gridHolder2").height( $(window).height() - 410);
	});		
	
	//조회
	$("#btn_search").click(function(){
	    //setTimeout(getGridData, 0);
		getGridData(true);
	});
	
	$("#btn_excel_down").click(function(){
		excelExport();
	});
	
	$('#btn_excel_detail_down').click(function() {
		var nowDate = new CommDateManager().getDate("yyyymmdd");
		var str_name = $("#P_STR_CODE option:selected").text();
		dataGrid2.exportFileName = "협력업체매출현황" + nowDate + "_" + str_name + "_" + ".xlsx";
		gridRoot2.excelExportSave("/gridExcelDown.do", false);
	});
	
	//협력업체 검색
	$("#P_VEN_NAME_SEARCH").click(function(){
		btn_comm_supply_search();
	});
	// 협력(매입)업체에서 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        } 
	});
	
	$("input[name=P_ITM_NAME]").keydown(function (key) { 
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_product_search();
		} 
	});
}
