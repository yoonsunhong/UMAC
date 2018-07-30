/********************************************************
 * 설명:  회원매출상세내역
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 추황영
 * since	: 2017.04.18
 * version : 1.0
 ********************************************************/



$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//그리드 너비제어
//	$("#gridHolder1").height(340);
//	$("#gridHolder2").height($(window).height()-477).css({"borderBottom":"1px solid #ddd"});
//	
//	$(window).on('resize',function (){	
//		$("#gridHolder1").height(340);
//		$("#gridHolder2").height($(window).height()-477).css({"borderBottom":"1px solid #ddd"});
//	});
	
	var hei = ($(window).height() - 145) / 5;
	
	$("#gridHolder1").height(hei*2.5);
	$("#gridHolder2").height(hei*2.5);

	$(window).on('resize',function (){	
		
		var hei = ($(window).height() - 145) / 5;
		
		$("#gridHolder1").height(hei*2.5);
		$("#gridHolder2").height(hei*2.5);	
		
	});
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";



// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");
rMateGridH5.create("grid2", "gridHolder2", jsVars1, "100%");
// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.


//전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, selectorColumn2;
var collection1, collection2; // 그리드의 데이터 객체
var gridData = [];
var totalCnt = 0;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호


function gridReadyHandler(id) {
	
	if(id == "grid1")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp1.setLayout(layoutStr1);	// 데이터와 그리드를 포함하는 객체
		gridApp1.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
	else if(id == "grid2")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (사업자탭)
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}
	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
	$("#P_TRXN_NO").val(dataRow1.TRXN_NO);
	getGridData2();
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
}

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true" showDataTips="true" lockedColumnCount="3" verticalAlign="middle">\
				<groupedColumns>\
					<DataGridColumn dataField="CUST_NO" headerText="'+cusNo+'" textAlign="center" visible="false" />\
					<DataGridColumn dataField="CUST_NAME" headerText="'+cusName+'" textAlign="center" visible="false" />\
					<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" width="100" />\
					<DataGridColumn dataField="SALE_DT" headerText="'+selngDate+'" textAlign="center" width="100" formatter="{datefmt}"  />\
					<DataGridColumn dataField="POS_NO" headerText="'+pos+'" textAlign="center"  width="60"/>\
					<DataGridColumn dataField="TRXN_NO" headerText="'+dealingsNumber+'" textAlign="center"  width="90"/>\
					<DataGridColumn dataField="POS_TIMES" headerText="'+time+'" textAlign="center" width="65" />\
					<DataGridColumn dataField="CANC_FLAG" headerText="'+se+'" textAlign="center" width="60" />\
					<DataGridColumn dataField="SALE_AMT_TAX2" headerText="'+taxFreeSales+'" textAlign="right" formatter="{numfmt}"   width="100"  id="dg1col1"  />\
					<DataGridColumn dataField="SALE_AMT_TAX1" headerText="'+taxableSales+'" textAlign="right" formatter="{numfmt}"  width="100" id="dg1col2"  />\
					<DataGridColumn dataField="SALE_AMT" headerText="'+totalSales+'" textAlign="right" formatter="{numfmt}" width="100"  id="dg1col0" />\
					<DataGridColumn dataField="DC_AMT" headerText="'+productDc+'" textAlign="right" formatter="{numfmt}" width="100"  id="dg1col8" />\
					<DataGridColumn dataField="MBR_DC_AMT" headerText="'+memberDc+'" textAlign="right" formatter="{numfmt}" width="100"  id="dg1col9" />\
					<DataGridColumn dataField="SALE_AMOUNT" headerText="'+selngAmount+'" textAlign="right" formatter="{numfmt}" width="100"  id="dg1col10" />\
					<DataGridColumn dataField="PAY_METH_04" headerText="'+creditSelling+'" textAlign="right" formatter="{numfmt}" width="90"  id="dg1col3"  />\
					<DataGridColumn dataField="PAY_METH_01" headerText="'+cash+'" textAlign="right" formatter="{numfmt}"  width="90" id="dg1col4"  />\
					<DataGridColumn dataField="PAY_METH_03" headerText="'+card+'" textAlign="right" formatter="{numfmt}"   width="90"  id="dg1col5" />\
					<DataGridColumn dataField="PAY_METH_18" headerText="'+point+'" textAlign="right" formatter="{numfmt}"  width="90"   id="dg1col6" />\
					<DataGridColumn dataField="CASH_AMOUNT" headerText="'+cashAppr+'" textAlign="right" formatter="{numfmt}"   width="100"  id="dg1col7" />\
					<DataGridColumn dataField="CORP_CODE" headerText=""  visible="false"/>\
					<DataGridColumn dataField="STR_CODE" headerText="" visible="false" />\
					<DataGridColumn dataField="POS_NO" headerText="" visible="false" />\
				</groupedColumns>\
				<dataProvider>\
					<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="STR_NAME" colNum="2" />\
						<SpanMergingField name="SALE_DT" colNum="3" />\
						<SpanMergingField name="POS_NAME" colNum="4" />\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
				<footers>\
					<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col1}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col2}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col0}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col8}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col9}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col10}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col3}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col4}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col5}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col6}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col7}" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
					</DataGridFooter>\
				</footers>\
			</DataGrid>\
		</rMateGrid>';

//그리드2 헤더 및 레이아웃
var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" sortableColumns="true">\
			<groupedColumns>\
				<DataGridColumn dataField="SCAN_CODE" headerText="'+scanCode+'" textAlign="center" width="200"/>\
				<DataGridColumn dataField="ITM_CODE" headerText="'+itmCode+'" textAlign="center" width="200"/>\
				<DataGridColumn dataField="ITM_NAME" headerText="'+itmName+'" textAlign="left" width="400" />\
				<DataGridColumn dataField="UNIT" headerText="'+standard+'" textAlign="center" width="150" />\
				<DataGridColumn dataField="SALE_PRC" headerText="'+wprc+'" textAlign="right" width="180" formatter="{numfmt}" />\
				<DataGridColumn dataField="SALE_QTY" headerText="'+qY+'" textAlign="right" width="120" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT_TAX2" headerText="'+taxFreeSales+'" textAlign="right" width="280" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT_TAX1" headerText="'+taxableSales+'" textAlign="right" width="280" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT" headerText="'+totalSales+'" textAlign="right" width="280" formatter="{numfmt}"/>\
				<DataGridColumn dataField="DC_AMT" headerText="'+productDc+'" textAlign="right" width="280" formatter="{numfmt}"/>\
				<DataGridColumn dataField="MBR_DC_AMT" headerText="'+memberDc+'" textAlign="right" width="280" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMOUNT" headerText="'+selngAmount+'" textAlign="right" width="280" formatter="{numfmt}"/>\
			</groupedColumns>\
		</DataGrid>\
	</rMateGrid>';
// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################


//회원정보 조회
function getGridData() {
	var param 			= $("#sertch_frm").serializeAllObject();
	var strDt 			= $("#P_SALE_SD").val().replace(/-/g, "");
	var endDt 			= $("#P_SALE_ED").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#P_SALE_SD").val().split("-");
	var P_END_DT_ARR 	= $("#P_SALE_ED").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if($("#P_SALE_SD").val() == null || $("#P_SALE_SD").val() == "")
	{
		alert(btnSearchDate + msgConfirm);
		$("#P_SALE_SD").focus();
		return;		
	}
	
	if( $("#P_SALE_ED").val() == null || $("#P_SALE_ED").val() == "")
	{
		alert(btnSearchDate + msgConfirm);
		$("#P_SALE_ED").focus();
		return;		
	}
	
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_SALE_ED").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SALE_SD").focus();
		return;
	}
	
	if($.trim($("#P_CUST_NO").val()) == null || $.trim($("#P_CUST_NO").val()) == "")
	{
		alert(msgMemberSearch);
		btn_comm_user_search();
		return;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({
	    url:"/memberSalesStateHdrList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			gridRoot1.addLoadingBar();
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

//매출상세
function getGridData2() {
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberSalesStateDtlList.do",
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


function init() {
	
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
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	$("#P_SALE_SD").val(beforeDate);
	$("#P_SALE_ED").val(date);
	
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		gridApp2.setData([]);
		getGridData();
	});
	$("#btn_excel_down").click(function(){
		excelExport('H');
	});
	$("#btn_excel_down2").click(function(){
		excelExport('D');
	});
	
	$("#P_CUST_NAME").keydown(function(key) {
		$("#P_CUST_NO").val("");
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
	});
}

function excelExport(flag){    
	var str_name 		=  $("#P_STR_CODE option:selected").text();
	var cust_name 		=  $("#P_CUST_NAME").val();
	
	if(flag=="H"){
		dataGrid1.exportFileName = "회원매출상세내역_"+str_name+"_"+cust_name+".xlsx";
		gridRoot1.excelExportSave("/gridExcelDown.do", false);
	}else if(flag=="D"){
		dataGrid2.exportFileName = "회원매출상품상세내역_"+str_name+"_"+cust_name+".xlsx";
		gridRoot2.excelExportSave("/gridExcelDown.do", false);
	}else{
		
	}
}
 
//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	
	$("#comm_pop_wrap20").dialog("open");
	gridApp29.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM20").val("fn_comm_user_callback(dataRow29)");
	
	if($("#P_CUST_NAME").val()) {
		
		$("#P_TEXT20").val($("#P_CUST_NAME").val());
		btn_comm_search('20');
		
	}
	
//	$('#comm_pop_wrap1' ).dialog( 'open' );
//	gridApp10.resize();
//	  
//	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
//	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
//		$("#P_TEXT1").val($("#P_CUST_NAME").val());
//		btn_comm_search('1');
//	}
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow){
	$('#P_CUST_NAME' ).val(dataRow.CUST_NAME);		// 회원명
	$('#P_CUST_NO' ).val(dataRow.CUST_NO);		// 회원명
}

//출력
function btn_print(){
	var P_CORP_CODE		= $("#P_CORP_CODE").val();
	var P_STR_CODE		= $("#P_STR_CODE").val();
	var P_STR_NAME		= $("#P_STR_CODE option:selected").text();
	var P_SALE_SD		= $("#P_SALE_SD").val().replace(/-/gi,'');
	var P_SALE_ED		= $("#P_SALE_ED").val().replace(/-/gi,'');
	var P_TEXT_SALE_SD	= $("#P_SALE_SD").val();
	var P_TEXT_SALE_ED	= $("#P_SALE_ED").val();
	var P_CUST_NAME		= $("#P_CUST_NAME").val();
	var P_CUST_NO		= $("#P_CUST_NO").val();
	var P_EMP_NO		= $("#P_EMP_NO").val();
	var strDt 			= $("#P_SALE_SD").val().replace(/-/g, "");
	var endDt 			= $("#P_SALE_ED").val().replace(/-/g, "");
	var params			= "";
	var P_STR_DT_ARR	= $("#P_SALE_SD").val().split("-");
	var P_END_DT_ARR 	= $("#P_SALE_ED").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if($("#P_SALE_SD").val() == null || $("#P_SALE_SD").val() == "")
	{
		alert(btnSearchDate + msgConfirm);
		$("#P_SALE_SD").focus();
		return;		
	}
	
	if( $("#P_SALE_ED").val() == null || $("#P_SALE_ED").val() == "")
	{
		alert(btnSearchDate + msgConfirm);
		$("#P_SALE_ED").focus();
		return;		
	}
	
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_SALE_ED").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SALE_SD").focus();
		return;
	}
	
	if($("#P_CUST_NO").val() == null || $("#P_CUST_NO").val() == "")
	{
		alert(msgMemberSearch);
		btn_comm_user_search();
		return;
	}
	
	params = "?reportMode=HTML"	+
			"&P_CORP_CODE="		+P_CORP_CODE+
			"&P_STR_CODE="		+P_STR_CODE+
			"&P_STR_NAME="		+P_STR_NAME+
			"&P_SALE_SD="		+P_SALE_SD+
			"&P_SALE_ED="		+P_SALE_ED+
			"&P_CUST_NAME="		+P_CUST_NAME+
			"&P_TEXT_SALE_SD="	+P_TEXT_SALE_SD+
			"&P_TEXT_SALE_ED="	+P_TEXT_SALE_ED+
			"&P_EMP_NO="		+P_EMP_NO+
			"&P_CUST_NO="		+P_CUST_NO;
	
	// AIViewer 파라미터
	window.open("aireportMemberSalesStateprint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
}
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################