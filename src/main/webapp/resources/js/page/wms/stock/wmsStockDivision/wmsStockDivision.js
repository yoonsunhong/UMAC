/********************************************************
 * 설명:  소분상품 관리
 * 수정일          수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author   : 최호정
 * since    : 2017.05.15
 * version  : 1.0
 ********************************************************/

$(document).ready(function(){

	init();
	
	$('#P_PUR_WPRC_DS, #P_PUR_SPRC_DS, #P_DIV_QTY, #P_DIV_PUR_WPRC_DS, #P_DIV_PUR_SPRC_DS').number( true, 0 );

	//재고조사 물류센터 리스트 조회
	var postValue ={};	
	jQuery.ajax({
		type:"POST",
		url:"/getWmsStockOrganizationList.do",
		dataType:"JSON",
		data:postValue,
		async:false,
		success : function(data) {
//			$("#S_STR_NAME").append('<option value="">'+select+'</option>');
			for(var i = 0; i < data.length; i++){
				 $("#S_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>');
			}
		},
		complete : function(data) {
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});

	/**검색조건 날짜 체크*/
	 $(".datepicker1").datepicker({ onSelect: function(dateText){
			 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			 if($("#S_STR_DATE").val()  >  $("#S_END_DATE").val()){
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#S_STR_DATE").val(CUR_DT);
				return;
			}
		},
		showMonthAfterYear:true
	});

	$(".datepicker2").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_STR_DATE").val()  >  $("#S_END_DATE").val()){
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#S_STR_DATE").val(CUR_DT);
				return;
			}
		},
		showMonthAfterYear:true 
	});

	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));

	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeMonthDate = new CommDateManager().before(0, 0).getDate("yyyy-mm"); // 일주일전 before(년,월,일)

	$("#S_END_DATE").val(lsToDate);
	$("#S_STR_DATE").val(beforeMonthDate+'-01');

	//상품검색 팝업
	$("#pop_wrap1").dialog({
		autoOpen : false,
		modal : true,
		width : 900,
		height : 483,
		resizable : false,
		open: function(){
		$("body").css("overflow-y", "hidden");
		},
		close: function(){
		$("body").css("overflow-y", "scroll");
		}
	});

	$('#P_KEYWORD').on('keyup', function(e) {
		if (e.which == 13) {
			btn_weight_item_search();
		}
	});

//	$('#P_DIV_QTY').on('keyup', function(e) {
//		if (e.which == 13) {
//			fn_calc_divPrice();
//		}
//	});
//	
	$('#P_DIV_QTY').blur(function(){
		fn_calc_divPrice();
	});
	
});

//----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1     = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2     = "rMateOnLoadCallFunction=gridReadyHandler2";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1); //IV_DIV_ITEM 조회결과 용
rMateGridH5.create("grid2", "gridHolder2", jsVars2); //수중량관리 상품검색

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1, collection1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2, collection2;

//그리드 데이터 초기화
var gridData1 = [];
var gridData2 = [];

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);

	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

//그리드1 layoutCompleteHandler1
function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}


//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 

	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();

	//셀렉트박스 선택 이벤트
	selectorColumn1 = gridRoot1.getObjectById("selector1");

	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);

	if (dataRow1.CFM_DT != null && dataRow1.CFM_DT != "") {
		alert(msgDivSearchWarning5 );
		
		
		$("#P_DVION_DT").val(dataRow1.DVION_DT);
		$("#P_STR_CODE").val(dataRow1.STR_CODE);
		$("#P_SEQ").val(dataRow1.SEQ);
		$("#P_SCAN_CODE").val(dataRow1.SCAN_CODE);
		$("#P_ITM_CODE").val(dataRow1.ITM_NAME);
		$("#P_ITM_NAME").val(dataRow1.ITM_NAME);
		$("#P_TAX_GB").val(dataRow1.TAX_GB);
		$("#P_TAX_GB_STR").val(dataRow1.TAX_GB_STR);
		$("#P_QTY").val(dataRow1.QTY);
		$("#P_UNIT").val(dataRow1.UNIT);
		$("#P_PUR_WPRC").val(dataRow1.PUR_WPRC); //
		$("#P_PUR_WPRC_DS").val(dataRow1.PUR_WPRC_DS);
		$("#P_PUR_WVAT").val(dataRow1.PUR_WVAT);
		$("#P_PUR_SPRC").val(dataRow1.PUR_SPRC); //
		$("#P_PUR_SPRC_DS").val(dataRow1.PUR_SPRC);
		$("#P_DIV_SCAN_CODE").val(dataRow1.DIV_SCAN_CODE);
		$("#P_DIV_ITM_CODE").val(dataRow1.ITM_NAME);
		$("#P_DIV_ITM_NAME").val(dataRow1.DIV_ITM_NAME);
		$("#P_DIV_QTY").val(dataRow1.DIV_QTY);
		$("#P_DIV_PUR_WPRC").val(dataRow1.DIV_PUR_WPRC);
		$("#P_DIV_PUR_WPRC_DS").val(dataRow1.DIV_PUR_WPRC_DS);//
		$("#P_DIV_PUR_WVAT").val(dataRow1.DIV_PUR_WVAT);
		$("#P_DIV_PUR_SPRC").val(dataRow1.DIV_PUR_SPRC);
		$("#P_DIV_PUR_SPRC_DS").val(dataRow1.DIV_PUR_SPRC_DS);//
		$("#P_CFM_DT").val(dataRow1.CFM_DT);
		
		
		return;
	}
	else {
		//alert(dataRow1.DVION_DT);
		$("#P_DVION_DT").val(dataRow1.DVION_DT);
		$("#P_STR_CODE").val(dataRow1.STR_CODE);
		$("#P_SEQ").val(dataRow1.SEQ);
		$("#P_SCAN_CODE").val(dataRow1.SCAN_CODE);
		$("#P_ITM_CODE").val(dataRow1.ITM_NAME);
		$("#P_ITM_NAME").val(dataRow1.ITM_NAME);
		$("#P_TAX_GB").val(dataRow1.TAX_GB);
		$("#P_TAX_GB_STR").val(dataRow1.TAX_GB_STR);
		$("#P_QTY").val(dataRow1.QTY);
		$("#P_UNIT").val(dataRow1.UNIT);
		$("#P_PUR_WPRC").val(dataRow1.PUR_WPRC); //
		$("#P_PUR_WPRC_DS").val(dataRow1.PUR_WPRC_DS);
		$("#P_PUR_WVAT").val(dataRow1.PUR_WVAT);
		$("#P_PUR_SPRC").val(dataRow1.PUR_SPRC); //
		$("#P_PUR_SPRC_DS").val(dataRow1.PUR_SPRC);
		$("#P_DIV_SCAN_CODE").val(dataRow1.DIV_SCAN_CODE);
		$("#P_DIV_ITM_CODE").val(dataRow1.ITM_NAME);
		$("#P_DIV_ITM_NAME").val(dataRow1.DIV_ITM_NAME);
		$("#P_DIV_QTY").val(dataRow1.DIV_QTY);
		$("#P_DIV_PUR_WPRC").val(dataRow1.DIV_PUR_WPRC);
		$("#P_DIV_PUR_WPRC_DS").val(dataRow1.DIV_PUR_WPRC_DS);//
		$("#P_DIV_PUR_WVAT").val(dataRow1.DIV_PUR_WVAT);
		$("#P_DIV_PUR_SPRC").val(dataRow1.DIV_PUR_SPRC);
		$("#P_DIV_PUR_SPRC_DS").val(dataRow1.DIV_PUR_SPRC_DS);//
		$("#P_CFM_DT").val(dataRow1.CFM_DT);
		//상품검색버튼 비활성화 (상품검색 못하게)
		btn_off();
		//상태 업데이트로 저장
		crudFlag = "U";
	}
}

//그리드2 레디 핸들러
function gridReadyHandler2(id) {
	// rMateGrid 관련 객체
	gridApp2 = document.getElementById(id);  // 그리드를 포함하는 div 객체
	gridRoot2 = gridApp2.getRoot();  // 데이터와 그리드를 포함하는 객체
	//그리드2에 헤더 및 레이아웃 셋팅
	gridApp2.setLayout(layoutStr2);
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp2.setData(gridData2);

	gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
	gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
}

//그리드2 layoutCompleteHandler2
function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid(); // 그리드 객체

	dataGrid2.setDoubleClickEnabled(true);
	//그리드1 셀선택 이벤트
	dataGrid2.addEventListener("itemDoubleClick", itemClickHandler2);
	dataGrid2.addEvent("keydown", enterClickHandler2);
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	dataGrid2 = gridRoot2.getDataGrid();    // 그리드 객체
	dataGrid2.setSelectedIndices([0]);
	dataGrid2.setVerticalScrollPosition(0);
	dataGrid2.focus();
}

//그리드2 enter key 입력 이벤트
function enterClickHandler2(event){
	if(event.keyCode != "13") return;

	var rowIndex = dataGrid2.getSelectedIndex();
	dataRow2 = gridRoot2.getItemAt(rowIndex);

	// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
	var callbackName = $("#P_CALLBACK").val();
	if(callbackName != null && callbackName != ""){
		eval(callbackName);
	}else{
		fn_comm_product_callback(dataRow2);
	}

	return false;
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler2(event){
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow2 = gridRoot2.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid2.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData2 = dataRow2[dataField];
	
	// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
	var callbackName = $("#P_CALLBACK").val();
	if(callbackName != null && callbackName != ""){
		eval(callbackName);
	}
	else{
		fn_comm_product_callback(dataRow2);
	}
	//$("#pop_wrap1").dialog( "close" );
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD" returnValueWhenError="true" />\
	<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows" showDataTips="true" >\
		<columns>\
			<DataGridColumn dataField="No" id="colNo" itemRenderer="IndexNoItem"      textAlign="center"  width="40"/>\
			<DataGridColumn dataField="DVION_DT"        headerText="'+divDvionDt+'"     textAlign="center"  width="100" formatter="{datefmt}"/>\
			<DataGridColumn dataField="SEQ"             headerText="'+rowNumber+'"      textAlign="center"  width="40"/>\
			<DataGridColumn dataField="SCAN_CODE"       headerText="'+divOriginScan+'"  textAlign="center"  width="100"/>\
			<DataGridColumn dataField="ITM_NAME"        headerText="'+itmName+'"        textAlign="center"  width="150"/>\
			<DataGridColumn dataField="DIV_SCAN_CODE"   headerText="'+divDividedScan+'" textAlign="center"  width="100"/>\
			<DataGridColumn dataField="DIV_ITM_NAME"    headerText="'+itmName+'"        textAlign="center"  width="150"/>\
			<DataGridColumn dataField="DIV_QTY"         headerText="'+divDivisionQty+'" textAlign="center"  width="80"/>\
			<DataGridColumn dataField="CFM_DT"          headerText="'+dateConfirmed+'"  textAlign="center"  width="100" formatter="{datefmt}"/>\
			<DataGridColumn dataField="STR_CODE"        headerText="'+storCode+'"       visible="false"/>\
			<DataGridColumn dataField="ITM_CODE"        headerText="'+divOriginItm+'"   visible="false"/>\
			<DataGridColumn dataField="DIV_ITM_CODE"    headerText="'+divDividedItm+'"  visible="false"/>\
			<DataGridColumn dataField="TAX_GB"          headerText="'+divTaxGb+'"       visible="false"/>\
			<DataGridColumn dataField="TAX_GB_STR"      headerText="'+divTaxGb+'"       visible="false"/>\
			<DataGridColumn dataField="QTY"             headerText="'+ipsuQty+'"        visible="false"/>\
			<DataGridColumn dataField="UNIT"            headerText="'+unit+'"           visible="false"/>\
			<DataGridColumn dataField="PUR_WPRC"        headerText="'+purchaseCost+'"   visible="false"/>\
			<DataGridColumn dataField="PUR_WPRC_DS"     headerText="'+purchaseCost+'"   visible="false"/>\
			<DataGridColumn dataField="PUR_WVAT"        headerText="'+baseWVAT+'"       visible="false"/>\
			<DataGridColumn dataField="PUR_SPRC"        headerText="'+purchaseSprc+'"   visible="false"/>\
			<DataGridColumn dataField="PUR_SPRC_DS"     headerText="'+purchaseSprc+'"   visible="false"/>\
			<DataGridColumn dataField="DIV_PUR_WPRC"    headerText="'+purchaseCost+'"   visible="false"/>\
			<DataGridColumn dataField="DIV_PUR_WPRC_DS" headerText="'+purchaseCost+'"   visible="false"/>\
			<DataGridColumn dataField="DIV_PUR_WVAT"    headerText="'+baseWVAT+'"       visible="false"/>\
			<DataGridColumn dataField="DIV_PUR_SPRC"    headerText="'+purchaseCost+'"   visible="false"/>\
			<DataGridColumn dataField="DIV_PUR_SPRC_DS" headerText="'+purchaseCost+'"   visible="false"/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//팝업용 - 상품명, 상품코드, 스캔코드, 규격, 단위, 입수, 협력업체, 기준원가, 협력업체코드, 단축상품명
var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" sortableColumns="true">\
			<columns>\
				<DataGridColumn dataField="ITM_NAME"		headerText="'+itmName+'"     textAlign="left"/>\
				<DataGridColumn dataField="ITM_CODE"		headerText="'+itmCode+'"     textAlign="center" width="100"/>\
				<DataGridColumn dataField="SCAN_CODE"		headerText="'+scanCode+'"    textAlign="center" width="100"/>\
				<DataGridColumn dataField="UNIT"			headerText="'+unit+'"        textAlign="center" width="70"/>\
				<DataGridColumn dataField="DP_PRC_UNIT"		headerText="'+dpPrcUnit+'"   textAlign="center" width="70"/>\
				<DataGridColumn dataField="IPSU_QTY"		headerText="'+ipsuQty+'"     textAlign="center" width="50"/>\
				<DataGridColumn dataField="VEN_NAME"		headerText="'+venName+'"     textAlign="left"/>\
				<DataGridColumn dataField="WPRC"			headerText="'+productWprc+'" textAlign="right" width="70"/>\
				<DataGridColumn dataField="WVAT"			headerText="'+baseWVAT+'"    visible="false"/>\
				<DataGridColumn dataField="SPRC"			headerText="'+productSprc+'" visible="false"/>\
				<DataGridColumn dataField="CLS_CODE"		headerText="'+subCategory+'" visible="false"/>\
				<DataGridColumn dataField="CLS_NAME"		headerText="'+subCategoryName+'" visible="false"/>\
				<DataGridColumn dataField="VEN_CODE"		headerText="'+venCode+'"     visible="false"/>\
				<DataGridColumn dataField="ORD_UNIT"		headerText="발주단위"          visible="false"/>\
				<DataGridColumn dataField="TAX_GB"			headerText="'+taxGb+'"       visible="false"/>\
				<DataGridColumn dataField="USE_YN"			headerText="'+useYn+'"       visible="false"/>\
				<DataGridColumn dataField="WEIGHT_YN"		headerText="'+weightYn+'"    visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//----------------------- 그리드 설정 끝 -------------------------------------

//#########################################################
//###	8. init ( 시작 )									###
//#########################################################

function init() {
	btn_on();
}

//#########################################################
//###	사용자 정의 함수 ( 시작 )								###
//#########################################################
var crudFlag = "C";

//input value가 null 또는 빈값인지 체크 (무조건 입력 받아야 하는 부분에 사용)
function fn_check_number(inputID){
	var str = document.getElementById(inputID).value;
	str = str.replace(/,/gi, "");
	//alert("str===>"+str);
	if(!numbersonly(str)){
		//alert(mentWmsIn2);
		document.getElementById(inputID).value="";
		return;
	}
	else {
		//alert("inputID===>"+inputID);
		if (inputID == "P_PUR_WPRC_DS") {
			$("#P_PUR_WPRC").val(str);
			//alert($("#P_PUR_WPRC").val());
		}
		else if (inputID == "P_PUR_SPRC_DS") {
			$("#P_PUR_SPRC").val(str);
			//alert($("#P_PUR_SPRC").val());
		}
	}
}

//소분할 수량 입력 시 소분 매입원가, 매입매가 자동 계산
function fn_calc_divPrice() {
	var wprc, sprc, wvat, divvat;
	if ($("#P_DIV_QTY").val() == null || $("#P_DIV_QTY").val() == ""){
		alert(mentWmsIn1);
		$("#P_DIV_QTY").focus();
		return;
	}
	else if (isNaN($("#P_DIV_QTY").val())) {
		alert(mentWmsIn2);
		$("#P_DIV_QTY").focus();
	}
	else if ($("#P_DIV_QTY").val() == "0") {
		alert("0 이상의 숫자로 입력해 주십시오.");
//		$("#P_DIV_QTY").focus();
		return;
	}
	else {
		wprc = $("#P_PUR_WPRC").val() / $("#P_DIV_QTY").val();
		sprc = $("#P_PUR_SPRC").val() / $("#P_DIV_QTY").val();
		$("#P_DIV_PUR_WPRC").val(Math.round(wprc));
		$("#P_DIV_PUR_SPRC").val(Math.round(sprc));
		$("#P_DIV_PUR_WPRC_DS").val(moneyComma(String(Math.round(wprc))));
		$("#P_DIV_PUR_SPRC_DS").val(moneyComma(String(Math.round(sprc))));
	}
	if ($("#P_TAX_GB").val() == 1) { //과세일경우
		wvat   = $("#P_PUR_WPRC").val() * 0.1;
		divvat = $("#P_DIV_PUR_WPRC").val() * 0.1;
		$("#P_PUR_WVAT").val(Math.round(wvat));
		$("#P_DIV_PUR_WVAT").val(Math.round(divvat));
	}
	else {
		$("#P_PUR_WVAT").val("0");
		$("#P_DIV_PUR_WVAT").val("0");
	}
}

//점포명 셀렉트박스 체인지 이벤트
function setStrCode(){
	//셀렉트박스 값을 넣어주기
	$("#S_STR_CODE").val($("#S_STR_NAME").val());
}

function fnNew() {
	crudFlag = "C";
	btn_on();

	$("#P_DVION_DT").val("");
	$("#P_SEQ").val("");
	$("#P_TAX_GB").val("");
	$("#P_PUR_WVAT").val("");
	$("#P_DIV_PUR_WVAT").val("");
	$("#P_CFM_DT").val("");

	$("#P_SCAN_CODE").val("");
	$("#P_ITM_CODE").val("");
	$("#P_ITM_NAME").val("");
	$("#P_QTY").val("");
	$("#P_UNIT").val("");
	$("#P_TAX_GB_STR").val("");
	$("#P_PUR_WPRC").val("");
	$("#P_PUR_SPRC").val("");
	$("#P_PUR_WPRC_DS").val("");
	$("#P_PUR_SPRC_DS").val("");

	fn_divpart_reset();
}

function fnSearch(strcode){
	var loadData =  $("#top_search").serializeAllObject();
	
	loadData.S_STR_DATE = loadData.S_STR_DATE.replace(/-/gi, '');
	loadData.S_END_DATE = loadData.S_END_DATE.replace(/-/gi, '');
	loadData.S_STR_CODE = loadData.S_STR_NAME;
	if(strcode == "" && loadData.S_STR_NAME == "" ){
		confirm(inventorySurveyMent2);
		$("#S_STR_NAME").focus();
		return;
	}
	
	if (strcode != "") {
		loadData.S_STR_NAME = strcode;
		
	}

	if (loadData.S_STR_DATE == ""){
		confirm(searchStartDate + msgConfirm);
		$("#S_STR_DATE").focus();
		return;
	}

	if (loadData.S_END_DATE == ""){
		confirm(searchEndDate + msgConfirm);
		$("#S_END_DATE").focus();
		return;
	}

	if (loadData.S_STR_DATE  >  loadData.S_END_DATE){
		//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
		alert(msgDateValidation);
		$("#S_STR_DATE").focus();
		return;
	}

	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({
		url:"/wmsStockDivisionList.do",
		type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){
			gridRoot1.addLoadingBar();
		},
		success:function(data){
			//alert(data.list);
			gridApp1.setData(data.list);
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

function fnUpdate(){ 
	
	
	// 확정 일자가 있으면 저장 안함.
	if (dataRow1.CFM_DT != null && dataRow1.CFM_DT != "") {
		alert("해당 상품은 이미 확정되어 저장할 수 없습니다.");
		return;
	}
		 	
	
	
	if(!fnValidation()) return;
	if(!confirm(msgSaveConfirm)) return;

	var loadData = $("#reg_form").serializeAllObject();
	var strcode  = $("#S_STR_NAME").val();

	var dourl = "";
	if (crudFlag == "C") {
		dourl = "/wmsStockDivisionInsert.do";
		loadData.P_DVION_DT = new CommDateManager().after(0, 0, 0).getDate("yyyymmdd");
		loadData.P_STR_CODE = $("#S_STR_NAME").val();
	}
	else {
		dourl = "/wmsStockDivisionUpdate.do";
	}
	//alert(dourl);
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({
		url:dourl,
		type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){
			gridRoot1.addLoadingBar();
		},
		success:function(data){

			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE == '0')
				{
					//입력폼만 리셋
					$("#reg_form").each(function() {
						this.reset();
					});
					//성공메시지
					alert(msgSave);
					//재조회
					fnSearch(strcode);
					//상품검색버튼 활성화
					btn_on();
				}
				else
				{
					alert(data.RETURN_MSG);
				}
			}
			else
			{
				alert(msgErrorDefault);
			}
		},
		complete : function(data) {
			dataGrid1.setEnabled(true);
			hideLoadingBar1(); 
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
			dataGrid1.setEnabled(true);
			hideLoadingBar1();
		}
	});
}

function fnConfirm(){
	if (crudFlag != 'U') {
		alert(stockRealMent18);
		return;
	}
	if(!confirm(msgDcsnConfirm)) return;

	var loadData = $("#reg_form").serializeAllObject();
	var strcode  = loadData.P_STR_CODE;

	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({
		url:"/wmsStockDivisionConfirm.do",
		type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){
			gridRoot1.addLoadingBar();
		},
		success:function(data){

			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE == '0')
				{
					//입력폼만 리셋
					$("#reg_form").each(function() {
						this.reset();
					});
					//성공메시지
					alert(msgSave);
					//재조회
					fnSearch(strcode);
					//상품검색버튼 활성화
					btn_on();
				}
				else
				{
					alert(data.RETURN_MSG);
				}
			}
			else
			{
				alert(msgErrorDefault);
			}

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

function fnValidation(){
	if($.trim($("#P_SCAN_CODE").val() ) == null || $.trim($("#P_SCAN_CODE").val() ) == "")
	{
		alert(scanCode + msgConfirm);
		$("#P_SCAN_CODE").focus();
		return false;
	}

	if($.trim($("#P_PUR_WPRC").val() ) == null || $.trim($("#P_PUR_WPRC").val() ) == "")
	{
		alert(purchaseCost + msgConfirm);
		$("#P_PUR_WPRC").focus();
		return false;
	}

	if($.trim($("#P_PUR_SPRC").val() ) == null || $.trim($("#P_PUR_SPRC").val() ) == "")
	{
		alert(purchaseSprc + msgConfirm);
		$("#P_PUR_SPRC").focus();
		return false;
	}

	if($.trim($("#P_DIV_SCAN_CODE").val() ) == null || $.trim($("#P_DIV_SCAN_CODE").val() ) == "")
	{
		alert(divDividedScan + msgConfirm);
		$("#P_DIV_SCAN_CODE").focus();
		return false;
	}

	if($.trim($("#P_DIV_QTY").val() ) == null || $.trim($("#P_DIV_QTY").val() ) == "")
	{
		alert(qY + msgConfirm);
		$("#P_DIV_QTY").focus();
		return false;
	}

	return true;
}

//그리드 로딩바  보이기
function showLoadingBar1() {
	gridRoot1.addLoadingBar();
}

function showLoadingBar2() {
	gridRoot2.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar1() {
	gridRoot1.removeLoadingBar();
}

function hideLoadingBar2() {
	gridRoot2.removeLoadingBar();
}

//(수중량관리 상품 검색) 팝업 호출 function
function btn_item_search(order){
	if (order == 'a') {
		if ($("#P_CLS_CODE").val() != null && $("#P_CLS_CODE").val() != ""){
			if(!confirm(msgDivNewOrgConfirm))
				return;
			else
				fn_divpart_reset();
		}
	}
	else {
		fn_check_number('P_PUR_WPRC_DS');
		fn_check_number('P_PUR_SPRC_DS');
		if ($("#P_CLS_CODE").val() == null || $("#P_CLS_CODE").val() == ""){
			alert(msgDivSearchWarning1);
			return;
		}
		if ($("#P_PUR_WPRC").val() == null || $("#P_PUR_WPRC").val() == ""){
			alert(msgDivSearchWarning2);
			$("#P_PUR_WPRC").focus();
			return;
		}
		if ($("#P_PUR_SPRC").val() == null || $("#P_PUR_SPRC").val() == ""){
			alert(msgDivSearchWarning3);
			$("#P_PUR_SPRC").focus();
			return;
		}
	}
	$('#pop_wrap1' ).dialog( 'open' );
	gridApp2.resize();

	if($("#P_KEYWORD").val() != null && $("#P_KEYWORD").val() != ""){
		//$("#P_TEXT3").val($("#S_VEN_NAME").val());
		btn_weight_item_search();
	}
}

function btn_weight_item_search(){
	loadData = $("#top_search2").serializeAllObject();

	gridApp2.setData(gridData2);
	//그리드2 초기화 
	gridRoot2.removeAll( );
	//로딩바 보기기
	showLoadingBar2();
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
		url:"/wmsStockDivisionItem.do",
		type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 
			gridRoot2.addLoadingBar();
		},
		success:function(data){
			gridApp2.setData(data.list);
			dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
		},
		complete : function(data) {
			hideLoadingBar2();
		},
		error : function(xhr, status, error) {
			hideLoadingBar2();
		}
	});
}

//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	if ($("#P_FLAG").val() == 'N') {
		fnNew();
		$("#P_FLAG").val("Y");
		$("#P_CLS_CODE").val(dataRow.CLS_CODE);
		$("#P_SCAN_CODE").val(dataRow.SCAN_CODE); // 스캔코드
		$("#P_ITM_CODE").val(dataRow.ITM_CODE);  // 상품코드
		$("#P_ITM_NAME").val(dataRow.ITM_NAME);  // 상품명
		$("#P_QTY").val(dataRow.IPSU_QTY);
		$("#P_UNIT").val(dataRow.UNIT);
		$("#P_TAX_GB").val(dataRow.TAX_GB);
		$("#P_TAX_GB_STR").val(dataRow.TAX_GB_STR);
		$("#pop_wrap1").dialog( "close" );
	}
	else {
		if(dataRow.SCAN_CODE == $("#P_SCAN_CODE").val()) {
			alert(msgDivSearchWarning4);
			return;
		}
		else {
			$("#P_DIV_SCAN_CODE").val(dataRow.SCAN_CODE); // 스캔코드
			$("#P_DIV_ITM_CODE").val(dataRow.ITM_CODE); // 상품코드
			$("#P_DIV_ITM_NAME").val(dataRow.ITM_NAME);  // 상품명
			$("#pop_wrap1").dialog( "close" );
		}
	}
}

function fn_divpart_reset(){
	$("#P_FLAG").val("N");
	$("#P_CLS_CODE").val("");
	$("#P_DIV_SCAN_CODE").val("");
	$("#P_DIV_ITM_CODE").val("");
	$("#P_DIV_ITM_NAME").val("");
	$("#P_DIV_QTY").val("");
	$("#P_DIV_PUR_WPRC").val("");
	$("#P_DIV_PUR_SPRC").val("");
	$("#P_DIV_PUR_WPRC_DS").val("");
	$("#P_DIV_PUR_SPRC_DS").val("");
}

//공통코드 상세 정보 팝업 닫기
function btn_popup_close(){
	$("#pop_wrap1").dialog( "close" );
}

var btn1, btn2;
//버튼활성화
function btn_on() {
	btn1 = document.getElementById('search1');
	btn1.disabled = false;
	btn2 = document.getElementById('search2');
	btn2.disabled = false;
}

//버튼비활성화
function btn_off() {
	btn1 = document.getElementById('search1');
	btn1.disabled = 'disabled';
	btn2 = document.getElementById('search2');
	btn2.disabled = 'disabled';
}

//#########################################################
//###	상단 버튼 구현 ( 끝 )									###
//#########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1, #gridHolder2").width("100%");

	var hei = ($(window).height() - 157) / 5;
	
	$("#gridHolder1").height(hei*4);
	$("#gridHolder2").height(hei*2);

	$(window).on('resize',function (){	
		var hei = ($(window).height() - 157) / 5;
		$("#gridHolder1").height(hei*4);
		$("#gridHolder2").height(hei*2);
	});
});
