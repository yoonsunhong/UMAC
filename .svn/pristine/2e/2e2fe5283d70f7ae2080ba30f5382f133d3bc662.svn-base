/********************************************************
 * 설명:  매출TR조회
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.01.10
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridData3 = [];

var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridApp2, gridRoot2, dataGrid2, dataRow2;
var gridApp3, gridRoot3, dataGrid3, dataRow3, collection3;

//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";
var jsVars3 = "rMateOnLoadCallFunction=gridReadyHandler3";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid2", "gridHolder2", jsVars1);
rMateGridH5.create("grid3", "gridHolder3", jsVars3);

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

var gridData1ClickStrCode = "";
var totalCnt;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호
var gridData1ClickStrCode = "";

var T_SALE_AMT = 0;
var T_DC_AMT = 0;
var T_SPECIAL_DC_AMT = 0;
var T_MBR_DC_AMT = 0;
var T_SALE_AMOUNT = 0;

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
	}else if(id == "grid2"){
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		gridApp2.setLayout(layoutStr2);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData2();	
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);	
	
	//dataGrid1.setDoubleClickEnabled(true);
	//dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	
	//그리드1 헤더 클릭 이벤트
	//dataGrid1.addEventListener("headerRelease", headerRelease1);
	selectorColumn1 = gridRoot1.getObjectById("selector");	
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}
function dataCompleteHandler2(event) {
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	//debugger;
	if(dataRow1["SALE_DT"] != undefined && dataRow1["STR_CODE"] != undefined && dataRow1["POS_NO"] != undefined && dataRow1["TRXN_NO"] != undefined && dataRow1["CANC_FLAG_NM"] != undefined){
		getGridData2(dataRow1["SALE_DT"],dataRow1["STR_CODE"],dataRow1["POS_NO"],dataRow1["TRXN_NO"],dataRow1["CANC_FLAG_NM"]);
		getGridData3(dataRow1);
	}	
}

//팝업 닫기
function btn_close(){
	$("#pop_wrap1").dialog( "close" );
}

function gridReadyHandler3(id) {
	// rMateGrid 관련 객체
	gridApp3 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot3 = gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp3.setLayout(layoutStr3);
	gridApp3.setData(gridData3);
	
	gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
	gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
}

function layoutCompleteHandler3() {
	
	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler3(event) {
	
	// 그리드 객체
	dataGrid3 = gridRoot3.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection3 = gridRoot3.getCollection();
}


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="9" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true"  horizontalScrollPolicy="auto">\
			<columns>\
				<DataGridColumn dataField="STR_NAME" 			headerText="'+storeName+'" 	textAlign="center"	width="80"/>\
				<DataGridColumn dataField="SALE_DT"   		headerText="'+selngDate+'"    	textAlign="center"	formatter="{datefmt}"	width="90"/>\
				<DataGridColumn dataField="POS_TIMES"   	headerText="'+saleTime+'"    	textAlign="center"	width="80"/>\
				<DataGridColumn dataField="POS_NO" 	 		headerText="POS"  				textAlign="center" 	width="70"/>\
				<DataGridColumn dataField="TRXN_NO" 		headerText="'+dealingsNumber+'"  	textAlign="center" 	width="80"/>\
				<DataGridColumn dataField="GRE_TYPE_NM"		headerText="'+greTypeNm+'"  			textAlign="center"	width="90"/>\
				<DataGridColumn dataField="CANC_FLAG_NM" 	headerText="'+cancelFlag+'"  		textAlign="center"	width="90"/>\
				<DataGridColumn dataField="EMP_NAME" 	 	headerText="'+cashier+'"  		textAlign="center" 	width="90"/>\
				<DataGridColumn dataField="MBR_CARD_NO" 	headerText="'+memberCard+'"  	textAlign="center"	width="120"/>\
				<DataGridColumn dataField="SALE_AMT" 		headerText="'+totalSales+'"  	textAlign="right" 	formatter="{numfmt}"/>\
				<DataGridColumn dataField="DC_AMT" 			headerText="'+eventDc+'"  		textAlign="right" 	formatter="{numfmt}"/>\
				<DataGridColumn dataField="SPECIAL_DC_AMT" 		headerText="'+bigEventDc+'"  	textAlign="right" 	formatter="{numfmt}"/>\
				<DataGridColumn dataField="MBR_DC_AMT" 		headerText="'+memberDc+'"  	textAlign="right" 	formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMOUNT" 		headerText="'+selngAmount+'"  		textAlign="right" 	formatter="{numfmt}"/>\
				<DataGridColumn dataField="PAY_AMT_04" 		headerText="외상매출"  		textAlign="right" 	formatter="{numfmt}" width="80" />\
				<DataGridColumn dataField="PAY_AMT_01" 		headerText="현금"  		textAlign="right" 	formatter="{numfmt}" width="80" />\
				<DataGridColumn dataField="PAY_AMT_03" 		headerText="신용카드"  		textAlign="right" 	formatter="{numfmt}" width="80" />\
				<DataGridColumn dataField="PAY_AMT_18" 		headerText="포인트"  		textAlign="right" 	formatter="{numfmt}" width="80" />\
				<DataGridColumn dataField="PAY_AMT_34" 		headerText="COD발생"  		textAlign="right" 	formatter="{numfmt}" width="80" />\
				<DataGridColumn dataField="SALE_POINT" 		headerText="포인트점수"  		textAlign="right" 	formatter="{numfmt}" width="80" />\
				<DataGridColumn dataField="TRXN_NO_OLD" 		headerText="원거래번호"  	textAlign="center" 	width="80"/>\
				<DataGridColumn dataField="CASH_AMOUNT" 		headerText="현금승인"  		textAlign="right" 	formatter="{numfmt}" width="80" />\
				<DataGridColumn dataField="JURNAL"  headerText="JURNAL" visible="false"/>\
				<DataGridColumn dataField="RECEIPT"  headerText="RECEIPT" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';


/*var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="9" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true">\
			<columns>\
				<DataGridColumn dataField="STR_NAME" 			headerText="'+storeName+'" 	textAlign="center"	width="80"/>\
				<DataGridColumn dataField="SALE_DT"   		headerText="'+selngDate+'"    	textAlign="center"	formatter="{datefmt}"	width="90"/>\
				<DataGridColumn dataField="POS_TIMES"   	headerText="'+saleTime+'"    	textAlign="center"	width="80"/>\
				<DataGridColumn dataField="POS_NO" 	 		headerText="POS"  				textAlign="center" 	width="70"/>\
				<DataGridColumn dataField="TRXN_NO" 		headerText="'+dealingsNumber+'"  	textAlign="center" 	width="80"/>\
				<DataGridColumn dataField="GRE_TYPE_NM"		headerText="'+greTypeNm+'"  			textAlign="center"	width="90"/>\
				<DataGridColumn dataField="CANC_FLAG_NM" 	headerText="'+cancelFlag+'"  		textAlign="center"	width="90"/>\
				<DataGridColumn dataField="EMP_NAME" 	 	headerText="'+cashier+'"  		textAlign="center" 	width="90"/>\
				<DataGridColumn dataField="MBR_CARD_NO" 	headerText="'+memberCard+'"  	textAlign="center"	width="120"/>\
				<DataGridColumn dataField="SALE_AMT" 		headerText="'+totalSales+'"  	textAlign="right" 	formatter="{numfmt}"/>\
				<DataGridColumn dataField="DC_AMT" 			headerText="'+eventDc+'"  		textAlign="right" 	formatter="{numfmt}"/>\
				<DataGridColumn dataField="SPECIAL_DC_AMT" 		headerText="'+bigEventDc+'"  	textAlign="right" 	formatter="{numfmt}"/>\
				<DataGridColumn dataField="MBR_DC_AMT" 		headerText="'+memberDc+'"  	textAlign="right" 	formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMOUNT" 		headerText="'+selngAmount+'"  		textAlign="right" 	formatter="{numfmt}"/>\
			</columns>\
			<footers>\
			<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal" >\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" colSpan="5"/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn	label="T_SALE_AMT"			labelJsFunction="labelFunc"		textAlign="right" formatter="{numfmt}"/>\
				<DataGridFooterColumn	label="T_DC_AMT"				labelJsFunction="labelFunc"		textAlign="right" formatter="{numfmt}"/>\
				<DataGridFooterColumn	label="T_SPECIAL_DC_AMT"		labelJsFunction="labelFunc"		textAlign="right" formatter="{numfmt}"/>\
				<DataGridFooterColumn	label="T_SPECIAL_DC_AMT"			labelJsFunction="labelFunc"		textAlign="right" formatter="{numfmt}"/>\
				<DataGridFooterColumn	label="T_SALE_AMOUNT"			labelJsFunction="labelFunc"		textAlign="right" formatter="{numfmt}"/>\
			</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';*/


function labelFunc(item, value, column){
	//item.getLabel()
	//return "11"
	var num = 0;
	if(item.getLabel() == "T_SALE_AMT"){
		num = T_SALE_AMT;
	}else if(item.getLabel() == "T_DC_AMT"){
		num = T_DC_AMT;
	}else if(item.getLabel() == "T_SPECIAL_DC_AMT"){
		num = T_SPECIAL_DC_AMT;
	}else if(item.getLabel() == "T_MBR_DC_AMT"){
		num = T_MBR_DC_AMT;
	}else if(item.getLabel() == "T_SALE_AMOUNT"){
		num = T_SALE_AMOUNT;
	};
	
	return num;
}



/*
<dataProvider>\
	<SpanSummaryCollection source="{$gridData}">\
		<summaries>\
	        <SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="STR_NAME" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
	            <SpanSummaryField dataField="SALE_AMT" summaryOperation="SUM" />\
	            <SpanSummaryField dataField="DC_AMT" summaryOperation="SUM" />\
	            <SpanSummaryField dataField="SPECIAL_DC_AMT" summaryOperation="SUM" />\
	            <SpanSummaryField dataField="MBR_DC_AMT" summaryOperation="SUM" />\
	        	<SpanSummaryField dataField="SALE_AMOUNT" summaryOperation="SUM" />\
	        </SpanSummaryRow>\
	    </summaries>\
	</SpanSummaryCollection>\
</dataProvider>\
*/

var layoutStr2 =
	'<rMateGrid>\
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="7" />\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="ITM_CODE" 		headerText="'+itmCode+'" 	width="140" 	textAlign="center"/>\
			<DataGridColumn dataField="SCAN_CODE"   	headerText="'+scanCode+'"  width="140"		textAlign="center"/>\
			<DataGridColumn dataField="ITM_SHORT_NAME" 	headerText="'+itmName+'"  	width="170"		textAlign="left" />\
			<DataGridColumn dataField="UNIT" 	 		headerText="'+standard+'"  	width="90"		textAlign="left" />\
			<DataGridColumn dataField="IPSU_QTY" 	 	headerText="'+obtainment+'" width="70"	 	textAlign="right" />\
			<DataGridColumn dataField="SALE_PRC" 	 	headerText="'+wprc+'"  	width="80"			textAlign="right" formatter="{numfmt}"/>\
			<DataGridColumn dataField="SALE_QTY" 	 	headerText="'+qY+'"  	width="50"	textAlign="right" formatter="{numfmt}"/>\
			<DataGridColumn dataField="SALE_AMT" 	 	headerText="'+totalSales+'"  	textAlign="right" formatter="{numfmt}"/>\
			<DataGridColumn dataField="DC_AMT" 			headerText="'+eventDc+'"  		textAlign="right" 	formatter="{numfmt}"/>\
			<DataGridColumn dataField="SPECIAL_DC_AMT" 		headerText="'+bigEventDc+'"  	textAlign="right" 	formatter="{numfmt}"/>\
			<DataGridColumn dataField="MBR_DC_AMT" 		headerText="'+memberDc+'"  	textAlign="right" 	formatter="{numfmt}"/>\
			<DataGridColumn dataField="SALE_AMOUNT" 		headerText="'+selngAmount+'"  		textAlign="right" 	formatter="{numfmt}"/>\
		</columns>\
		<dataProvider>\
			<SpanSummaryCollection source="{$gridData}">\
				<summaries>\
			        <SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="ITM_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
			            <SpanSummaryField dataField="SALE_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="DC_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="SPECIAL_DC_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="MBR_DC_AMT" summaryOperation="SUM" />\
			        	<SpanSummaryField dataField="SALE_AMOUNT" summaryOperation="SUM" />\
			        </SpanSummaryRow>\
			    </summaries>\
			</SpanSummaryCollection>\
		</dataProvider>\
	</DataGrid>\
</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg3" sortableColumns="true"   horizontalScrollPolicy="auto">\
		<columns>\
			<DataGridColumn dataField="PAY_METH"  headerText="PAY_METH" visible="false"/>\
			<DataGridColumn dataField="PAY_METH_NAME"  headerText="' + payType + '" textAlign="center" width="120" />\
			<DataGridColumn dataField="PAY_AMT" 	 	headerText="'+paymentAmount+'"  	textAlign="right" formatter="{numfmt}" width="180" />\
			<DataGridColumn dataField="ZAN_AMT" 	 	headerText="'+accruedBalance+'"  	textAlign="right" formatter="{numfmt}" width="180" />\
			<DataGridColumn dataField="SALE_AMT" 	 	headerText="'+cellSPRC+'"  	textAlign="right" formatter="{numfmt}" width="180" />\
			<DataGridColumn dataField="SEQ"  headerText="' + rowNumber + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="CARD_NO"  headerText="' + cardNo + '" textAlign="center" width="200" />\
			<DataGridColumn dataField="APP_NO"  headerText="' + consentNumber + '" textAlign="center" width="140" />\
			<DataGridColumn dataField="ACQ_NAME"  headerText="' + cardCompanyNm + '" textAlign="center" width="120" />\
			<DataGridColumn dataField="APP_INQ_TYPE"  headerText="APP_INQ_TYPE" visible="false"/>\
			<DataGridColumn dataField="APP_INQ_TYPE_NAME"  headerText="' + slCardAppInqType + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="SIGN_FLAG"  headerText="SIGN_FLAG" visible="false"/>\
			<DataGridColumn dataField="SIGN_FLAG_NAME"  headerText="전자서명" textAlign="center" width="80" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';




//목록 그리드 조회
function getGridData() {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_START_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if(dateDiff > 60) {
		alert("조회일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_START_DT").focus();
		return false;
	}
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesAnalReportTrList.do",
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
			//gridApp1.setData(data);
			
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;			
			
			//drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
			dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	       	
	       	//합계부분
	       /*	var jsonObject = eval(data.list);
	       	T_SALE_AMT = jsonObject[0]["T_SALE_AMT"];
	       	T_DC_AMT = jsonObject[0]["T_DC_AMT"];
	       	T_SPECIAL_DC_AMT = jsonObject[0]["T_SPECIAL_DC_AMT"];
	       	T_MBR_DC_AMT = jsonObject[0]["T_MBR_DC_AMT"];
	       	T_SALE_AMOUNT = jsonObject[0]["T_SALE_AMOUNT"];     */	
	       	
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//목록 그리드 조회
function getGridData2(num1,num2,num3,num4,num5) {
	if(num5 == "정상"){
		num5 = "0";
	}else{
		num5 = "2";
	}
	jQuery.ajax({ 
	    url:"/salesAnalReportTrDList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		//data: params,
		data: {'P_SALE_DT':num1,'P_STR_CODE':num2,'P_POS_NO':num3,'P_TRXN_NO':num4,'P_CANC_FLAG':num5},
		beforeSend : function(){ 	    	
            gridRoot2.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridApp2.setData(data);
			
			dataGrid2.setEnabled(true);
	       	gridRoot2.removeLoadingBar();			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function getGridData3(dataRow){
	
	jQuery.ajax({ 
	    url:"/selectSalesAnalReportTrPay.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		//data: params,
		data: {
				'P_STR_CODE' : dataRow.STR_CODE
			,	'P_SALE_DT' : dataRow.SALE_DT
			,	'P_POS_NO' : dataRow.POS_NO
			,	'P_TRXN_NO' : dataRow.TRXN_NO
			},
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridApp3.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}


function excelExport(){    
/*	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportSheetName = bsnSttus;
    dataGrid2.exportSheetName = goodsClSttus;
    
	dataGrid1.exportFileName = selngTRSearch+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);*/
	
	var P_STR_CODE 		= $.trim($('#P_STR_CODE').val());
	var P_START_DT 		= $.trim($('#P_START_DT').val());
	var P_END_DT 		= $.trim($('#P_END_DT').val());
	var P_CANC_FLAG 	= $.trim($('#P_CANC_FLAG').val());
	var P_POS_NO 		= $.trim($('#P_POS_NO').val());
	var P_GRE_TYPE 		= $.trim($('#P_GRE_TYPE').val());
	var P_CUST_NAME 	= $.trim($('#P_CUST_NO').val());
	var P_ITM_NAME 		= $.trim($('#P_ITM_NAME').val());
	var P_TRXN_NO 		= $.trim($('#P_TRXN_NO').val());
	var P_SELNG_AMOUNT1 = $.trim($('#P_SELNG_AMOUNT1').val());
	var P_SELNG_AMOUNT2 = $.trim($('#P_SELNG_AMOUNT2').val());
		 
	//엑셀호출
	$.download('/salesAnalReportTrListDownload.do',   "P_STR_CODE="			+ P_STR_CODE
													+ "&P_START_DT="		+ P_START_DT
													+ "&P_END_DT="			+ P_END_DT
													+ "&P_CANC_FLAG="		+ P_CANC_FLAG
													+ "&P_POS_NO="			+ P_POS_NO
													+ "&P_GRE_TYPE="		+ P_GRE_TYPE
													+ "&P_CUST_NAME="		+ P_CUST_NAME
													+ "&P_ITM_NAME="		+ P_ITM_NAME
													+ "&P_TRXN_NO="			+ P_TRXN_NO
													+ "&P_SELNG_AMOUNT1="	+ P_SELNG_AMOUNT1
													+ "&P_SELNG_AMOUNT2="	+ P_SELNG_AMOUNT2
			,"post");
}


//해당 점포의 POS 가져오기
function getPosList() {
	
	var html = "";
	var selId = "";
	var param;
	
	selId = "P_POS_NO";
	if($("#P_STR_CODE").val() == "")
	{
		$("#"+selId).html("<option value=\"\">" + all + "</option>");
		return;
	}
	
	param = $("#frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/getPosList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){			
			if(typeof data != "undefined" && data != null)
			{
				html = "<option value=\"\">"+all+"</option>";
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].POS_NO + "\">" + data[i].POS_NAME + "</option>";
				}
				$("#"+selId).html(html);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//aiview 레포트
function aiviewPrint(){
	
	
	if(dataRow1 == null || dataRow1 ==""){
		alert("출력할 ROW를 선택해주세요.");
		return;
	};
	var P_CORP_CODE		= $("#P_CORP_CODE").val();
	var P_STR_CODE			= dataRow1["STR_CODE"];
	var P_POS_NO			= dataRow1["POS_NO"];
	var P_SALE_DT			= dataRow1["SALE_DT"];
	var P_TRXN_NO			= dataRow1["TRXN_NO"];
	
	var params = "?reportMode=HTML"	+
	"&P_CORP_CODE="		+P_CORP_CODE+
	"&P_STR_CODE="		+P_STR_CODE+
	"&P_TRXN_NO="			+P_TRXN_NO+
	"&P_SALE_DT="			+P_SALE_DT+
	"&P_POS_NO="			+P_POS_NO;
	
	 // AIViewer 파라미터
	window.open("aireportSalesAnalReportTrPrint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	
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

//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	  
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUST_NAME").val());
		btn_comm_search('1');
	}
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow){
	$('#P_CUST_NAME' ).val(dataRow.CUST_NAME);		// 회원명
	$('#P_CUST_NO' ).val(dataRow.CUST_NO);
	//$('#CUS_NAME_TEXT' ).text(dataRow.CUST_NAME);	// 회원명
}


//(점별상품검색) 팝업 호출 function
function btn_comm_store_search(){
	$('#comm_pop_wrap6' ).dialog( 'open' );
	gridApp15.resize();
	fnGetStrName();
	// $("#P_CALLBACK_NM6").val('fn_comm_store_callback1(dataRow15)');
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT6").val($("#P_ITM_NAME").val());
		btn_comm_search('6');
	}
}

//팝업 영수증출력
function btn_print(){
	var P_CORP_CODE = dataRow1.CORP_CODE;
	var P_SALE_DT = dataRow1.SALE_DT;
	var P_STR_CODE = dataRow1.STR_CODE;
	var P_TRXN_NO = dataRow1.TRXN_NO;
	var P_POS_NO = dataRow1.POS_NO;
	
	var params = "?reportMode=HTML"	+
	"&P_CORP_CODE="		+P_CORP_CODE+
	"&P_STR_CODE="		+P_STR_CODE+
	"&P_SALE_DT="			+P_SALE_DT+
	"&P_TRXN_NO="			+P_TRXN_NO+
	"&P_POS_NO="			+P_POS_NO;
	 // AIViewer 파라미터
	window.open("aireportPosClosedReceiptPrint.do" + params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
}


function fn_comm_store_callback(dataRow)
{ 
	$("#P_ITM_NAME").val( dataRow.ITM_NAME ) ;
	$("#ITM_CODE").val( dataRow.ITM_CODE ) ;
}


$(document).ready(function () {
	
	
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getCommonCodeSelectBoxList("P_CANC_FLAG", "CANC_FLAG");				// 전표구분
	getCommonCodeSelectBoxList("P_BUSI_FLAG", "BUSI_FLAG");				// POS
	getCommonCodeSelectBoxList2("P_GRE_TYPE", "GRE_TYPE", "1");				// 거래형태 00,35 만 나오게 
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	//$("#frm select[id='P_STR_CODE']").val("10015").prop("selected", true);
	getPosList('0');
	
	$(".datepicker2").datepicker();
	
	
	//그리드 너비 제어
	/*$("#gridHolder1, #gridHolder2").width("100%");
	
	var hei = ($(window).height() - 190) / 5;
	
	$("#gridHolder1").height(hei*2);
	$("#gridHolder2").height(hei*3);

	$(window).on('resize',function (){	
		
		var hei = ($(window).height() - 190) / 5;
		
		$("#gridHolder1").height(hei*2);
		$("#gridHolder2").height(hei*3);	
		
	});*/
	$("#gridHolder1, #gridHolder2, #gridHolder3").width("100%");
	
	var hei = ($(window).height() - 200) / 7;
	
	$("#gridHolder1").height(hei*3);
	$("#gridHolder2").height(hei*3);
	$("#gridHolder3").height(hei*1);

	$(window).on('resize',function (){	
		$("#gridHolder1, #gridHolder2, #gridHolder3").width("100%");
		var hei = ($(window).height() - 200) / 7;
		
		$("#gridHolder1").height(hei*3);
		$("#gridHolder2").height(hei*3);
		$("#gridHolder3").height(hei*1);
		
	});
	
	$(function() {
		//초기 팝업 사이즈 조절
		$("#pop_wrap1").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 380,
		    resizable : false,
		    position : "center",
		    open: function(){
		    	$("body").css("overflow-y", "hidden");
		    },
		    close: function(){
		    	$("body").css("overflow-y", "scroll");
		    }
		});
		
	});
	
	//조회
	$("#btn_search").click(function(){
		getGridData();
		//상품 분류별 목표 내용 삭제 
		gridApp2.setData(null);
		gridData1ClickStrCode = "";
	});	

	$("#btn_excel_down").click(function(){
		excelExport();
	});
	
	$("#btn_print").click(function(){
		aiviewPrint();
	});	
	
	// 점포명 체인지 이벤트
	$("#P_STR_CODE").change(function(){
		getPosList('0');
	});
	
	$("#P_CUST_NAME").keydown(function(key) {		
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
	});		
	
	$("#P_ITM_NAME").keydown(function(key){
		if(key.keyCode == 13){
			btn_comm_store_search();
		}
	});
	
	
	
});



