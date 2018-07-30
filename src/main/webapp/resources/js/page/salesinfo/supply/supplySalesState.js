/********************************************************
 * 설명: 협력업체매출현황 매뉴화면
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 추황영
 * since	: 2017.04.26
 * version : 1.0
 ********************************************************/

// 최종 검색한 매출 일자를 담아둠
var searchSaleSd;
var searchSaleEd;

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	init();
	
});
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1,src1;
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
var totalAmtList; // 검색결과의 합계정보
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData();
		
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



function dataCompleteHandler2(event)
{
	
}




//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
'<rMateGrid>\
	<SpanCellAttribute id="sum1CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
	<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
	<NumberFormatter id="numfmt2" useThousandsSeparator="true" precision="2" />\
	<DataGrid id="dg1" sortableColumns="true" showDataTips="true" horizontalScrollPolicy="auto" lockedColumnCount="5" >\
		<columns>\
            <DataGridColumn dataField="STR_CODE" 	headerText="점포코드" 			width="70" 		textAlign="center" />\
			<DataGridColumn dataField="STR_NAME" 	headerText="점포명" 			width="90" 		textAlign="center" />\
			<DataGridColumn dataField="VEN_CODE" 	headerText="'+venCode+'" 		width="90" 		textAlign="center" />\
			<DataGridColumn dataField="VEN_NAME" 	headerText="'+venName+'" 		width="300" 	textAlign="left" />\
			<DataGridColumn dataField="SALE_WPRC" 	headerText="매출원가금액" 		width="120" 	textAlign="right"	formatter="{numfmt2}" 	id="dg1col3" />\
			<DataGridColumn dataField="SALE_SAMT" 	headerText="매출합계" 			width="120" 	textAlign="right"  	formatter="{numfmt}" 	id="dg1col5" />\
			<DataGridColumn dataField="BOT_AMT" 	headerText="'+botSum+'" 		width="120" 	textAlign="right"  	formatter="{numfmt}" 	id="dg1col7" />\
			<DataGridColumn dataField="DC_AMT" 		headerText="'+productDc+'" 		width="120" 	textAlign="right"  	formatter="{numfmt}" 	id="dg1col8" />\
			<DataGridColumn dataField="MBR_DC_AMT" 	headerText="'+memberDc+'" 		width="120" 	textAlign="right"  	formatter="{numfmt}" 	id="dg1col9" />\
			<DataGridColumn dataField="SALE_SPRC" 	headerText="'+selngAmount+'"	width="120" 	textAlign="right"  	formatter="{numfmt}" 	id="dg1col10" />\
			<DataGridColumn dataField="PROPIT_AMT" 	headerText="'+profitAmt+'" 		width="120"		textAlign="right"  	formatter="{numfmt}" 	id="dg1col6" />\
			<DataGridColumn dataField="PROPIT_RT" 	headerText="'+ProfitRt+'" 		width="80" 		textAlign="right"  />\
		</columns>\
		<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn labelJsFunction="labelFunc2" formatter="{numfmt2}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="labelFunc3" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="labelFunc4" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="labelFunc5" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="labelFunc6" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="labelFunc7" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="labelFunc8" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="labelFunc9" textAlign="right" />\
			</DataGridFooter>\
		</footers>\
	</DataGrid>\
</rMateGrid>';

var layoutStr2 =
'<rMateGrid>\
	<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
	<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
	<NumberFormatter id="numfmt2" useThousandsSeparator="true" precision="2" />\
	<DataGrid id="dg2" sortableColumns="true" showDataTips="true" horizontalScrollPolicy="auto" lockedColumnCount="5" >\
		<columns>\
			<DataGridColumn dataField="VEN_CODE" 		headerText="'+venCode+'"		width="100"		textAlign="center"		visible="false" />\
			<DataGridColumn dataField="VEN_NAME" 		headerText="'+venName+'" 		width="140" 	textAlign="left"     	visible="false" />\
			<DataGridColumn dataField="SCAN_CODE" 	    headerText="'+scanCode+'" 		width="105" 	textAlign="center"/>\
			<DataGridColumn dataField="ITM_NAME" 	 	headerText="'+itmName+'" 		width="300" 	textAlign="left"/>\
			<DataGridColumn dataField="SALE_QTY" 		headerText="'+qY+'" 			width="60" 		textAlign="right"  formatter="{numfmt}"   	id="dg2col1" />\
			<DataGridColumn dataField="WPRC" 			headerText="매출단가" 		    width="120" 	textAlign="right"  formatter="{numfmt}"   	id="dg2col2"  visible="false"/>\
			<DataGridColumn dataField="SALE_WPRC"    	headerText="매출원가금액" 		width="120" 	textAlign="right"  formatter="{numfmt2}" 	id="dg2col3" />\
			<DataGridColumn dataField="SPRC" 			headerText="'+selngPrice+'" 	width="120" 	textAlign="right"  formatter="{numfmt}"   	id="dg2col4"  visible="false" />\
			<DataGridColumn dataField="SALE_SAMT" 		headerText="매출합계" 			width="120" 	textAlign="right"  formatter="{numfmt}"   	id="dg2col5" />\
			<DataGridColumn dataField="BOT_AMT" 		headerText="'+botSum+'" 		width="120" 	textAlign="right"  formatter="{numfmt}"   	id="dg2col7" />\
			<DataGridColumn dataField="DC_AMT" 			headerText="'+productDc+'" 		width="120" 	textAlign="right"  formatter="{numfmt}"   	id="dg2col8" />\
			<DataGridColumn dataField="MBR_DC_AMT"		headerText="'+memberDc+'" 		width="120" 	textAlign="right"  formatter="{numfmt}"   	id="dg2col9" />\
			<DataGridColumn dataField="SALE_SPRC" 		headerText="'+selngAmount+'" 	width="120" 	textAlign="right"  formatter="{numfmt}"   	id="dg2col10" />\
			<DataGridColumn dataField="PROPIT_AMT" 		headerText="'+profitAmt+'" 		width="120" 	textAlign="right"  formatter="{numfmt}"   	id="dg2col6" />\
			<DataGridColumn dataField="PROPIT_RT" 		headerText="'+ProfitRt+'" 		width="90" 		textAlign="right"   />\
		</columns>\
		<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn  labelJsFunction="labelFunc1" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn  labelJsFunction="labelFunc2" formatter="{numfmt2}" textAlign="right" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn  labelJsFunction="labelFunc3" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn  labelJsFunction="labelFunc4" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn  labelJsFunction="labelFunc5" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn  labelJsFunction="labelFunc6" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn  labelJsFunction="labelFunc7" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn  labelJsFunction="labelFunc8" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn  labelJsFunction="labelFunc9" textAlign="right" />\
			</DataGridFooter>\
		</footers>\
	</DataGrid>\
</rMateGrid>';


// 공병 갯수
function labelFunc1() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].SALE_QTY;
	}
	else {
		return 0;
	}

}

// 매출 단가
function labelFunc2() {
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].SALE_WPRC;
	}
	else {
		return 0;
	}
}

// 매출 합계
function labelFunc3() {
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].SALE_SAMT;
	}
	else {
		return 0;
	}
}

// 공병 합계
function labelFunc4() {
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].BOT_AMT;
	}
	else {
		return 0;
	}
}

// 상품할인
function labelFunc5() {
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].DC_AMT;
	}
	else {
		return 0;
	}
}

// 회원할인
function labelFunc6() {
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].MBR_DC_AMT;
	}
	else {
		return 0;
	}
}

// 매출금액
function labelFunc7() {
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].SALE_SPRC;
	}
	else {
		return 0;
	}
}

// 이익액
function labelFunc8() {
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].PROPIT_AMT;
	}
	else {
		return 0;
	}
}

// 이익율
function labelFunc9() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].PROPIT_RT + '';
	}
	else {
		return '0';
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
	
	
	params.P_STR_CODE = $("#STR_CODE").val();
	
	//유효성검사
	if(dateDiff > 60) {
		alert("조회 일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_STR_DT").focus();
		return false;
	}
	
	if(isFirstPage) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}
	
	//날짜 체크
	if($("#P_SALES_SD").val() == null || $("#P_SALES_SD").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_SALES_SD").focus();
		return;		
	}
	if( $("#P_SALES_ED").val() == null || $("#P_SALES_ED").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_SALES_ED").focus();
		return;		
	}
	
	var strDt = $("#P_SALES_SD").val().replace(/-/g, "");
	var endDt = $("#P_SALES_ED").val().replace(/-/g, "");
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_SALES_ED").focus();
		return;
	}
	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "") $("#P_VEN_CODE").val("");
	$("#P_STR_CODE").val($("#STR_CODE option:selected").val());
	
	
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/supplySalesStateList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			/*gridApp1.setData(data);
	       	gridRoot1.removeLoadingBar();*/
			
			gridApp1.setData(data.list);
			gridApp2.setData(null);
			
			var list2 = JSON.parse(data.list2);
			
			if(list2 && list2.length > 0) {
				totalCnt = list2[0].TOT_CNT;
				totalAmtList = list2;
			}
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");			
			
			dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	       	
	       	// 검색이 완료되면 최종 검색한 매출일자 조건을 전역 변수에 할당 (상세 조회에 사용을 위함)
	       	searchSaleSd = strDt;
	       	searchSaleEd = endDt;
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
	
	var strCode = gridRoot1.getItemAt(rowIndex).STR_CODE;
	var venCode = gridRoot1.getItemAt(rowIndex).VEN_CODE;
	
	jQuery.ajax({ 
	    url: "/supplySalesStateDtList.do",
	    type: "POST",
		datatype: "json",
		data: { P_STR_CODE: strCode, P_SALES_SD: searchSaleSd, P_SALES_ED: searchSaleEd, P_VEN_CODE: venCode },
		beforeSend : function() { 	    	
            gridRoot2.addLoadingBar();
	    }, 
		success: function(data) {
			
			gridApp2.setData(data.list);
			
			var list2 = JSON.parse(data.list2);
			
			if(list2 && list2.length > 0) {
				//totalCnt = list2[0].TOT_CNT;
				totalAmtList = list2;
			}
			
			dataGrid1.setEnabled(true);
	       	gridRoot2.removeLoadingBar();
	    },
	    complete : function(data) {
	    	gridRoot2.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	gridRoot1.removeLoadingBar();
	    }
	});
}



//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3').dialog('open');
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



function clearVenCode()
{ 	
	if(  $('#VEN_NAME').val()  == "" )
	{
		 $('#VEN_CODE').val("");
	}
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


function headerRelease2(event) {
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid2, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	getGridData();
}


//출력
function btn_print(){
	
	//출력전표 발리데이션 체크
	if($("#P_SALES_SD").val() == null || $("#P_SALES_SD").val() == "")
	{
		alert(btnSearchDate + msgConfirm);
		$("#P_SALES_SD").focus();
		return;		
	}
	if( $("#P_SALES_ED").val() == null || $("#P_SALES_ED").val() == "")
	{
		alert(btnSearchDate + msgConfirm);
		$("#P_SALES_ED").focus();
		return;		
	}
	
	var strDt = $("#P_SALES_SD").val().replace(/-/g, "");
	var endDt = $("#P_SALES_ED").val().replace(/-/g, "");
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_SALES_ED").focus();
		return;
	}
	
	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "") $("#P_VEN_CODE").val("");
	
	var P_CORP_CODE		= $("#P_CORP_CODE").val();
	var P_STR_CODE		= $("#P_STR_CODE").val();
	var P_SALES_SD		= $("#P_SALES_SD").val().replace(/-/gi,'');
	var P_SALES_ED		= $("#P_SALES_ED").val().replace(/-/gi,'');
	var P_TEXT_SALES_SD	= $("#P_SALES_SD").val();
	var P_TEXT_SALES_ED	= $("#P_SALES_ED").val();
	var P_EMP_NO		= $("#P_EMP_NO").val();
	var P_VEN_NAME		= $("#P_VEN_NAME").val();
	var P_VEN_CODE		= $("#P_VEN_CODE").val();
	var P_COLUMN_NAME	= $("#P_COLUMN_NAME").val();
	var P_ORDERBY		= $("#P_ORDERBY").val();
	
	var params = "?reportMode="			+ "HTML" +
				 "&P_CORP_CODE="		+ P_CORP_CODE +
				 "&P_STR_CODE="			+ P_STR_CODE +
				 "&P_SALES_SD="			+ P_SALES_SD +
				 "&P_SALES_ED="			+ P_SALES_ED +
				 "&P_TEXT_SALES_SD="	+ P_TEXT_SALES_SD +
				 "&P_TEXT_SALES_ED="	+ P_TEXT_SALES_ED +
				 "&P_VEN_NAME="			+ P_VEN_NAME +
				 "&P_VEN_CODE="			+ P_VEN_CODE +
				 "&P_COLUMN_NAME="		+ P_COLUMN_NAME +
				 "&P_ORDERBY="			+ P_ORDERBY +
				 "&P_EMP_NO="			+ P_EMP_NO;
	
	// AIViewer 파라미터
	window.open("aireportSupplySalesStatePrint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	
}

/*function excelExport(){    
var nowDate = new CommDateManager().getDate("yyyymmdd");
var str_name = $("#STR_CODE option:selected").text();
dataGrid1.exportFileName = "협력업체매출현황_"+nowDate+"_"+str_name+"_"+".xlsx";
gridRoot1.excelExportSave("/gridExcelDown.do", false);
}*/

function excelExport(){
	var P_SALES_SD 		= $.trim($('#P_SALES_SD').val());
	var P_SALES_ED 		= $.trim($('#P_SALES_ED').val());
	var P_VEN_CODE 		= $.trim($('#P_VEN_CODE').val());
	var P_VEN_NAME 		= $.trim($('#P_VEN_NAME').val());
	var P_STR_CODE 		= $.trim($('#P_STR_CODE').val());
	var P_COLUMN_NAME 	= $.trim($('#P_COLUMN_NAME').val());
	var P_ORDERBY 		= $.trim($('#P_ORDERBY').val());
		 
	//엑셀호출
	$.download('/supplySalesStateListDownload.do',"P_SALES_SD=" 	+ P_SALES_SD
												+ "&P_SALES_ED="	+ P_SALES_ED
												+ "&P_VEN_CODE="	+ P_VEN_CODE
												+ "&P_VEN_NAME="	+ P_VEN_NAME
												+ "&P_STR_CODE="	+ P_STR_CODE
												+ "&P_COLUMN_NAME="	+ P_COLUMN_NAME
												+ "&P_ORDERBY="		+ P_ORDERBY
												, "post");
};


function init() {
	// 점포코드 콤보 가져오기
	getStoreCode("STR_CODE");
	$("#sertch_frm select[id='STR_CODE']").val(SSSC).prop("selected", true);
	
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
	$("#gridHolder2").height($(window).height() - 370);
	
	$(window).on('resize',function (){			
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height(200);
		
		//그리드 너비 제어
		$("#gridHolder2").width("100%");
		$("#gridHolder2").height( $(window).height() - 370);
	});	
	
	//조회
	$("#btn_search").click(function(){
		getGridData(true);
	});	
	$("#btn_excel_down").click(function(){
		excelExport();
	});
	
	$('#btn_excel_detail_down').click(function() {
		var nowDate = new CommDateManager().getDate("yyyymmdd");
		var str_name = $("#P_STR_CODE option:selected").text();
		dataGrid2.exportFileName = "협력업체매출현황"+nowDate+"_"+str_name+"_"+".xlsx";
		gridRoot2.excelExportSave("/gridExcelDown.do", false);
//	    dataGrid2.exportFileName = "협력업체매출현황_" + Date.now() + ".xlsx";
//	 
//	    gridRoot2.excelExportSave("", false);
	    
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
}


//합산 이익률 연산을 위한 함수
function getPROFIT_RT(){
	var chkdata = gridRoot1.getItemAt(0);
	var rs="0";
	var data;
	var amt = 0;
	var sprc = 0;
	if(chkdata !="" && chkdata != null ){
		src1 = gridRoot1.getChangedData(true);
			for (var i = 0; i < src1.length; i++)
			{
				data = src1[i].data;
				
				if(data.VEN_CODE == "합계")
					continue;
				if(data.VEN_NAME=="소계"){
					var temp = data.PROPIT_AMT * 100 /Math.abs(data.SALE_SPRC);
					temp = temp.toFixed(2);
					temp = temp+"";
					if(temp.indexOf('.') == -1){
						temp=temp+".00";
					}else{
						
						var tempArray = temp.split('.');
						var len = tempArray[1].length;
						if(len ==1){
							temp = temp+"0";
						}
					}
					if(data.SALE_SPRC == "0"){
						temp = "0.00"; 
					}
					gridRoot1.setItemFieldAt(temp,i,"PROPIT_RT");
				}else{
					sprc += data.SALE_SPRC;
					amt +=data.PROPIT_AMT;
				}
			}
			rs = amt*100  / Math.abs(sprc);
			rs =rs.toFixed(2);
	}
	return rs; // 평균을 구합니다.
}
