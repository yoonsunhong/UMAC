/********************************************************
 * 설명: 일매출정산집계조회 매뉴화면
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 추황영
 * since	: 2017.04.05
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridApp2, gridRoot2, dataGrid2, dataRow2;
var gridApp3, gridRoot3, dataGrid3, dataRow3;
var gridApp4, gridRoot4, dataGrid4, dataRow4;

var gridData1 = [];
var gridData2 = [];
var gridData3 = [];
var gridData4 = [];

//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";
var jsVars3 = "rMateOnLoadCallFunction=gridReadyHandler3";
var jsVars4 = "rMateOnLoadCallFunction=gridReadyHandler4";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1,"100%");
rMateGridH5.create("grid2", "gridHolder2", jsVars2,"100%");
rMateGridH5.create("grid3", "gridHolder3", jsVars3, "100%","400px");
rMateGridH5.create("grid4", "gridHolder4", jsVars4, "100%","400px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

var gridData1ClickStrCode = "";

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
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
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}
function dataCompleteHandler1(event) {
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	dataRow1.P_SALE_SD = $("#P_SALE_SD").val().replace(/-/gi,'');
	dataRow1.P_SALE_ED = $("#P_SALE_ED").val().replace(/-/gi,'');
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
	$("#STR_CODE").val(dataRow1.STR_CODE);
	
	getGridData2();
}

//그리드1 레디 핸들러
function gridReadyHandler2(id) {
	if(id == "grid2"){
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp2.setLayout(layoutStr2);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData();
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}
function dataCompleteHandler2(event) {
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	dataGrid2.addEventListener("itemClick", itemClickHandler2);
}
//그리드1 ROW 원클릭 이벤트
function itemClickHandler2(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow2 = gridRoot2.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid2.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	dataRow2.STR_CODE =$("#STR_CODE").val();
		if(dataRow2.SALE_DT !="" && dataRow2.SALE_DT !=null){
		if (dataField == "CREDIT_SALE") {
			// pop up edit window
			$( '#pop_wrap1' ).dialog( 'open' );	
			gridApp3.resize();
			getGridData3();
		}else if(dataField == "DPOT_AMT"){
			// pop up edit window
			$( '#pop_wrap2' ).dialog( 'open' );	
			gridApp4.resize();
			getGridData4();
		}
	}
}


//그리드3 레디 핸들러
function gridReadyHandler3(id) {
	if(id == "grid3"){
		// rMateGrid 관련 객체
		gridApp3 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot3 = gridApp3.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp3.setLayout(layoutStr3);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData();
		
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		//gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
	}
}

function layoutCompleteHandler3() {
	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
}
//그리드4레디 핸들러
function gridReadyHandler4(id) {
	if(id == "grid4"){
		// rMateGrid 관련 객체
		gridApp4 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot4 = gridApp4.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp4.setLayout(layoutStr4);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData();
		
		gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4);
		//gridRoot3.addEventListener("dataComplete", dataCompleteHandler4);
	}
}

function layoutCompleteHandler4() {
	dataGrid4 = gridRoot4.getDataGrid();  // 그리드 객체
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true">\
				<groupedColumns>\
					<DataGridColumn dataField="STR_CODE" 					headerText="'+storCode+'" 			width="80" 		textAlign="center"  visible="false"/>\
					<DataGridColumn dataField="MOBIL_NO" 					headerText="'+phoneNumber+'"  				textAlign="center"  width="125"  />\
					<DataGridColumn dataField="CUST_NO" 					headerText="'+cusNo+'"  				textAlign="center"  width="80"  />\
					<DataGridColumn dataField="CUST_NAME" 				headerText="'+cusName+'"  			width="180"	textAlign="left" />\
					<DataGridColumn dataField="MBR_GRADE_NAME" 		headerText="'+mbrGrade+'"  		textAlign="center" width="130" visible="false" />\
					<DataGridColumn dataField="BUSI_FLAG_NAME" 		headerText="'+busiFlag+'"  			textAlign="center" width="110" visible="false" />\
					<DataGridColumn dataField="ACCT_DEPT"   				headerText="'+accountingCode+'" width="80"		textAlign="center" visible="false" />\
					<DataGridColumn dataField="CREDIT_MONTH_AMT"   	headerText="이월잔액"   width="110"	formatter="{numfmt}"	textAlign="right" id="dg1col1"/>\
					<DataGridColumn dataField="CREDIT_SALE"   			headerText="당월매출"    		width="110"	formatter="{numfmt}"	textAlign="right" id="dg1col2"/>\
					<DataGridColumn dataField="DPOT_AMT"   				headerText="당월입금"    			width="110"	formatter="{numfmt}"	textAlign="right" id="dg1col3"/>\
					<DataGridColumn dataField="LAST_SALE_DT" 				headerText="'+lastSalesDt+'"		textAlign="center"	formatter="{datefmt}" width="100" 	/>\
					<DataGridColumn dataField="LAST_RCP_DT" 				headerText="'+lastDepositDt+'"		textAlign="center"	formatter="{datefmt}" width="100" 	/>\
					<DataGridColumn dataField="ACCT_REABLE" 				headerText="'+accruedBalance+'"  width="110" textAlign="right" formatter="{numfmt}" id="dg1col4"/>\
				</groupedColumns>\
				<footers>\
					<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col1}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col2}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col3}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col4}" formatter="{numfmt}" textAlign="right" />\
					</DataGridFooter>\
				</footers>\
			</DataGrid>\
		</rMateGrid>';

//그리드2 헤더 및 레이아웃
var layoutStr2 =
	'<rMateGrid>\
		<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg2" sortableColumns="true" selectionMode="singleCell">\
			<groupedColumns>\
				<DataGridColumn dataField="STR_CODE" 			headerText="점포코드"					textAlign="center"	width="110" visible="false" />\
				<DataGridColumn dataField="CUST_NO" 			headerText="'+cusNo+'"				textAlign="center"	width="80" 	/>\
				<DataGridColumn dataField="CUST_NAME" 		headerText="'+cusName+'"			textAlign="left"	width="180" 	/>\
				<DataGridColumn dataField="CD_NM" 				headerText="'+mbrGrade+'"			textAlign="center"	width="130" 	/>\
				<DataGridColumn dataField="BUSI_FLAG_NAME" headerText="'+busiFlag+'"			textAlign="center"	width="110" 	/>\
				<DataGridColumn dataField="ACCT_DEPT" 			headerText="'+accountingCode+'"	textAlign="center"	width="80" 	/>\
				<DataGridColumn dataField="SALE_DT" 				headerText="'+dealingsDate+'"		textAlign="center"	formatter="{datefmt}" width="100" 	/>\
				<DataGridColumn dataField="CREDIT_MONTH_AMT"		headerText="이월잔액"    		formatter="{numfmt}"	textAlign="right" id="dg1col1" width="110" 	/>\
				<DataGridColumn dataField="CREDIT_SALE" 		headerText="'+selngAm+'"			textAlign="right"	formatter="{numfmt}" id="dg1col2" textDecoration="underline" width="110"  />\
				<DataGridColumn dataField="DPOT_AMT" 			headerText="'+dpotAmt+'"			textAlign="right"	formatter="{numfmt}" id="dg1col3" textDecoration="underline" width="110"  />\
				<DataGridColumn dataField="REABLE" 				headerText="'+accruedBalance+'"	textAlign="right"	formatter="{numfmt}" id="dg1col4" width="110" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="CUST_NO" colNum="1" >\
						</SpanMergingField>\
						<SpanMergingField name="CUST_NAME" colNum="2" >\
						</SpanMergingField>\
						<SpanMergingField name="CD_NM" colNum="3" >\
						</SpanMergingField>\
						<SpanMergingField name="BUSI_FLAG_NAME" colNum="4" >\
						</SpanMergingField>\
						<SpanMergingField name="ACCT_DEPT" colNum="5" >\
						</SpanMergingField>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
		   <footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col2}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col3}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn  labelJsFunction="SUM_REABLE" formatter="{numfmt}" textAlign="right" />\
			</DataGridFooter>\
		  </footers>\
		</DataGrid>\
	</rMateGrid>';
//그리드3헤더 및 레이아웃
var layoutStr3 =
	'<rMateGrid>\
	<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
	<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg3" sortableColumns="true" showDataTips="true" horizontalScrollPolicy="auto">\
		<groupedColumns>\
				<DataGridColumn dataField="CUST_NO" 			headerText="'+cusNo+'"				textAlign="center"	width="65"/>\
				<DataGridColumn dataField="CUST_NAME" 		headerText="'+cusName+'"			textAlign="left"	width="130"/>\
				<DataGridColumn dataField="SALE_DT" 				headerText="'+dealingsDate+'"		textAlign="center"	formatter="{datefmt}" width="90" />\
				<DataGridColumn dataField="POS_NO" 				headerText="'+pos+'"		textAlign="center" width="55"	/>\
				<DataGridColumn dataField="TRXN_NO" 			headerText="'+dealingsNumber+'"		textAlign="center" width="65"	/>\
				<DataGridColumn dataField="SCAN_CODE" 		headerText="'+scanCode+'"		textAlign="center" width="115"	/>\
				<DataGridColumn dataField="ITM_NAME" 			headerText="'+itmName+'"		textAlign="left"	width="200" />\
				<DataGridColumn dataField="SALE_QTY" 			headerText="'+qY+'"		textAlign="right" width="50"	/>\
				<DataGridColumn dataField="SALE_AMT" 			headerText="'+selngAmount+'"		textAlign="right"  id="dg1col1" width="90"  formatter="{numfmt}"	/>\
		</groupedColumns>\
		<dataProvider>\
			<SpanSummaryCollection source="{$gridData}">\
				<mergingFields>\
					<SpanMergingField name="CUST_NO" colNum="0" >\
					</SpanMergingField>\
					<SpanMergingField name="CUST_NAME" colNum="1" >\
					</SpanMergingField>\
					<SpanMergingField name="POS_NO" colNum="2" >\
					</SpanMergingField>\
					<SpanMergingField name="POS_NO" colNum="3" >\
					</SpanMergingField>\
					<SpanMergingField name="TRXN_NO" colNum="4" >\
						<SpanSummaryRow label="소계"  labelDataField="TRXN_NO"  rowAttribute="{sumRowAttr}" cellAttribute="{sum2CellAttr}" >\
							<SpanSummaryField dataField="SALE_AMT" summaryOperation="SUM" />\
						</SpanSummaryRow>\
					</SpanMergingField>\
				</mergingFields>\
			</SpanSummaryCollection>\
		</dataProvider>\
		<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn label="합계" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn    id="f1col1" formatter="{numfmt}" textAlign="right" />\
			</DataGridFooter>\
		</footers>\
	</DataGrid>\
	</rMateGrid>';
//그리드4헤더 및 레이아웃
var layoutStr4 =
	'<rMateGrid>\
	<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
	<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg4" sortableColumns="true" showDataTips="true" horizontalScrollPolicy="auto">\
		<groupedColumns>\
			<DataGridColumn dataField="CUST_NO" 			headerText="'+cusNo+'"				textAlign="center"	width="80"	/>\
			<DataGridColumn dataField="CUST_NAME" 		headerText="'+cusName+'"			textAlign="left"	width="180"	/>\
			<DataGridColumn dataField="RCP_DT" 				headerText="'+rcpDt+'"				textAlign="center"	formatter="{datefmt}" width="100" />\
			<DataGridColumn dataField="DPOT_FLAG_NAME" 	headerText="'+dpotFlag+'"		textAlign="center" width="90"	/>\
			<DataGridColumn dataField="CARD_NO" 			headerText="'+cardNo+'"				textAlign="center"	width="120" />\
			<DataGridColumn dataField="APP_NO" 				headerText="'+consentNumber+'"	textAlign="center" width="80"	/>\
			<DataGridColumn dataField="SLIP_NO" 				headerText="'+dpotNo+'"				textAlign="center"	width="130"/>\
			<DataGridColumn dataField="DPOT_AMT" 			headerText="'+dpotAmt+'"			textAlign="right" id="dg1col4"	width="110" formatter="{numfmt}"	/>\
		</groupedColumns>\
		<dataProvider>\
			<SpanSummaryCollection source="{$gridData}">\
				<mergingFields>\
					<SpanMergingField name="CUST_NO" colNum="0" >\
					</SpanMergingField>\
					<SpanMergingField name="CUST_NAME" colNum="1" >\
					</SpanMergingField>\
					<SpanMergingField name="RCP_DT" colNum="2" >\
					</SpanMergingField>\
				</mergingFields>\
			</SpanSummaryCollection>\
		</dataProvider>\
		<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
			<DataGridFooterColumn label="합계" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col4}" formatter="{numfmt}" textAlign="right" />\
			</DataGridFooter>\
		</footers>\
	</DataGrid>\
	</rMateGrid>';
//----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################


function getGridData() {
	var params 			= $("#sertch_frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_SALE_SD").val().split("-");
	var P_END_DT_ARR 	= $("#P_SALE_ED").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if($("#P_STR_CODE").val() == null || $("#P_STR_CODE").val() == ""){
		alert("점포는 필수 선택입니다.");
		return;
	}

	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SALE_SD").focus();
		return;
	}
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/custReceivablesLedgerHdrList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
            gridRoot2.removeAll();
	    }, 
		success:function(data){
				gridApp1.setData(data);
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

//목록 그리드2 조회
function getGridData2() {
	
	jQuery.ajax({ 
		url:"/custReceivablesLedgerDtlList.do",
		type:"POST",
		datatype:"json",
		//async:false,
		data: dataRow1,
		beforeSend : function(){ 	    	
			gridRoot2.addLoadingBar();
		}, 
		success:function(data){
			gridApp2.setData(data);
		
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

//외상매출발생팝업 조회
function getGridData3() {
	
	jQuery.ajax({ 
		url:"/custReceivablesLedgerSalesPop.do",
		type:"POST",
		datatype:"json",
		//async:false,
		data: dataRow2,
		beforeSend : function(){ 	    	
			gridRoot3.addLoadingBar();
		}, 
		success:function(data){
			//그리드3 데이터 조회
			gridApp3.setData(data);
			
		},
		complete : function(data) {
			gridRoot3.removeLoadingBar();
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
			gridRoot3.removeLoadingBar();
		}
	});
}
//외상매출입금팝업 조회
function getGridData4() {
	
	jQuery.ajax({ 
		url:"/custReceivablesLedgerDpotPop.do",//POS별매출집계 조회
		type:"POST",
		datatype:"json",
		//async:false,
		data: dataRow2,
		beforeSend : function(){ 	    	
			gridRoot4.addLoadingBar();
		}, 
		success:function(data){
			//그리드3 데이터 조회
			gridApp4.setData(data);
			
		},
		complete : function(data) {
			gridRoot4.removeLoadingBar();
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
			gridRoot4.removeLoadingBar();
		}
	});
}



//출력
function btn_print(val){
	
	if(val=="1"){
		var P_CORP_CODE		=	$("#P_CORP_CODE").val();
		var P_STR_CODE			= 	$("#P_STR_CODE").val();
		var P_CUST_NO			=	$("#P_CUST_NO").val();
		var P_SALE_SD			=	$("#P_SALE_SD").val().replace(/-/gi,"");
		var P_SALE_ED			=	$("#P_SALE_ED").val().replace(/-/gi,"");
		var P_CUST_NAME		= 	$("#P_CUST_NAME").val();
		var params = "?reportMode=HTML"	+
		"&P_CORP_CODE="		+P_CORP_CODE+
		"&P_STR_CODE="		+P_STR_CODE+
		"&P_CUST_NO="			+P_CUST_NO+
		"&P_SALE_SD="			+P_SALE_SD+
		"&P_SALE_ED="			+P_SALE_ED+
		"&P_CUST_NAME="		+P_CUST_NAME;
		// AIViewer 파라미터
		window.open("aireportCustReceivablesLedgerPrint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
		
		
	}else if(val=="2"){
		if(dataRow1 == null || dataRow1==""){
			alert("회원을 선택 해주세요.");
			return;
		}
		var P_CORP_CODE		=	$("#P_CORP_CODE").val();
		var P_STR_CODE			= 	dataRow1.STR_CODE;
		var P_CUST_NO			=	dataRow1.CUST_NO;
		var P_SALE_SD			=	$("#P_SALE_SD").val().replace(/-/gi,"");
		var P_SALE_ED			=	$("#P_SALE_ED").val().replace(/-/gi,"");
		var P_TEXT_SALE_SD	=	$("#P_SALE_SD").val();
		var P_TEXT_SALE_ED	=	$("#P_SALE_ED").val();
		
		var params = "?reportMode=HTML"	+
		"&P_CORP_CODE="		+P_CORP_CODE+
		"&P_STR_CODE="		+P_STR_CODE+
		"&P_CUST_NO="			+P_CUST_NO+
		"&P_SALE_SD="			+P_SALE_SD+
		"&P_SALE_ED="			+P_SALE_ED+
		"&P_TEXT_SALE_SD="	+P_TEXT_SALE_SD+
		"&P_TEXT_SALE_ED="	+P_TEXT_SALE_ED;
		// AIViewer 파라미터
		window.open("aireportMemberReceivablesLedgerPrint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	}
}

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));

	var hei = ($(window).height() - 145) / 5;
	
	$("#gridHolder1").height(hei*2.5);
	$("#gridHolder2").height(hei*2.5);

	$(window).on('resize',function (){	
		
		var hei = ($(window).height() - 145) / 5;
		
		$("#gridHolder1").height(hei*2.5);
		$("#gridHolder2").height(hei*2.5);	
		
	});
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	$("#sertch_frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	//달력설정
//	$(".datepicker").datepicker();
	$("#P_SALE_SD").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_SALE_SD").val()  >  $("#P_SALE_ED").val()     ){
					alert(msgDateValidation);
					$("#P_SALE_SD").val(CUR_DT);
					return;
			}
			
			var sdt = $("#P_SALE_SD").val().replace(/-/gi,'');
			var strCode = $("#P_STR_CODE").val();
			
			if(strCode == "10019"){
				if(   sdt < "20170615"      ){
					alert("2017년 6월 15일부터 조회 할 수 있습니다.");
					$("#P_SALE_SD").val(CUR_DT);
					return;
				}
			}else{
				if(   sdt < "20170619"      ){
					alert("2017년 6월 19일부터 조회 할 수 있습니다.");
					$("#P_SALE_SD").val(CUR_DT);
					return;
				}
			}
			
		}, 	 showMonthAfterYear:true 
	});
	$("#P_SALE_ED").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_SALE_SD").val()  >  $("#P_SALE_ED").val()     ){
					alert(msgDateValidation);
					$("#P_SALE_ED").val(CUR_DT);
					return;
			}	 
		 },	 showMonthAfterYear:true 
	});
//	var date = new CommDateManager().before(0, 0, 1).getDate("yyyy-mm-dd"); // 하루전 before(년,월,일)
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var yymm = new CommDateManager().getDate("yyyymm");
	var beforeDate ="";
	var strCode = $("#P_STR_CODE").val();
	if(yymm=="201706"){
		if(strCode == "10019"){
			 beforeDate = new CommDateManager().getDate("yyyy-mm") + "-15";
		}else{
			 beforeDate = new CommDateManager().getDate("yyyy-mm") + "-19";
		}
	}else{
		 beforeDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	}
	
	$("#P_SALE_SD").val(beforeDate);
	$("#P_SALE_ED").val(date);
	
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		gridApp2.setData([]);
		getGridData();
	});
	
	$("#P_CUST_NAME").keydown(function(key) {
		$("#P_CUST_NO").val("");
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
	});
	
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : "70%",
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#pop_wrap2").dialog({
	    autoOpen : false,
	    modal : true,
	    width : "70%",
//	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
});

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
	$('#P_CUST_NO' ).val(dataRow.CUST_NO);		// 회원명
}

function btn_close(val){
	if(val=="1"){
		$("#pop_wrap1").dialog('close');
	}else if(val =="2"){
		$("#pop_wrap2").dialog('close');
	}
}

function btnExcell(val){
	var str_name 		=  $("#P_STR_CODE option:selected").text();
	var cust_name 		=  $("#P_CUST_NAME").val();
	if(val == "1"){
		dataGrid1.exportFileName = "고객미수금원장_"+str_name+"_"+cust_name+".xlsx";
		gridRoot1.excelExportSave("/gridExcelDown.do", false);
	}else if(val == "2"){
		dataGrid2.exportFileName = "회원미수원장_"+str_name+"_"+cust_name+".xlsx";
		gridRoot2.excelExportSave("/gridExcelDown.do", false);
	}else if(val == "3"){
		dataGrid3.exportFileName = "외상매출발생팝업_"+str_name+"_"+cust_name+".xlsx";
		gridRoot3.excelExportSave("/gridExcelDown.do", false);
	}else if(val == "4"){
		dataGrid4.exportFileName = "외상매출입금팝업_"+str_name+"_"+cust_name+".xlsx";
		gridRoot4.excelExportSave("/gridExcelDown.do", false);
	}
}	
	//그리드 미수잔액 = 누적이월잔액 +매출액 - 입금액
function SUM_REABLE(){
		var chkdata = gridRoot2.getItemAt(0);
		var data;
		var data2;
		var amt = 0;
		var misuAmt =0;
		if(chkdata !="" && chkdata != null ){
			src1 = gridRoot2.getChangedData(true);
			if(src1.length == 1){
				data = src1[0].data;
				amt=Number(data.REABLE);
			}else{
				for (var i = 0; i < src1.length; i++)
				{
					data = src1[i].data;
					if( i < src1.length-1){
						data2  = src1[i+1].data;
						misuAmt = Number(data.REABLE) + Number(data2.CREDIT_SALE) - Number(data2.DPOT_AMT);
						gridRoot2.setItemFieldAt(data.REABLE, i+1, "CREDIT_MONTH_AMT");
						gridRoot2.setItemFieldAt(misuAmt, i+1, "REABLE");
						amt=misuAmt;
					}
				}
			}
		}else{
			amt="0";
		}
		return amt; 
}