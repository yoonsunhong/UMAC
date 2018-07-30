/********************************************************
 * 설명: 프로모션 등록관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 이성진
 * since	: 2017.03.06
 * version  : 1.0
 ********************************************************/

//행사 시작 종료일 중복체크를 위한 Date조회용 변수
var checkDate = {};
var selectedIndex = -1;


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();

var item_gubun = "";
if(dd < 10) {
    dd = '0' + dd;
} 
if(mm<10) {
    mm = '0' + mm;
}
if(hh < 10){
	hh = '0' + hh;
}
if(min<10){
	min = '0' + min;
}

$(document).ready(function(){
	
	init();
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	$(".memo").height(100);
	
	var S_EVT_STR_DT = new CommDateManager().getDate("yyyy-mm-dd");
	$('#S_EVT_STR_DT').val(S_EVT_STR_DT);
	
	//$("#BASE_AMT1").on("keyup", function(e) {$(this).val( $(this).val().replace(/[^a-z0-9.]/gi,"") );});
	$("#BASE_AMT1, #BASE_AMT2, #BASE_AMT3, #POP_BASE_AMT1, #POP_BASE_AMT2, #POP_BASE_AMT3").on('keyup', function(e){
		var money = $(this).val().replace(/[^0-9]/gi,"");
		$(this).val( money.replace(/\B(?=(\d{3})+(?!\d))/g, ",") );	
	});
	
	$("#DC_AMT1, #DC_AMT2, #DC_AMT3, #POP_DC_AMT1, #POP_DC_AMT2, #POP_DC_AMT3").on('keyup', function(e){
		var returnVal = "";
		//1 : 정액할인, 2: 정율할인
		if($("#DC_FLAG").val() == "2"){
			returnVal = $(this).val().replace(/[^0-9.]/gi,"");
			if(Number(returnVal) > 100){
				$(this).val("100.0");
			}
		}else{
			returnVal = $(this).val().replace(/[^0-9]/gi,"");
			$(this).val( returnVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",") );	
		}
	});
	
	$("#POP_SCAN_NAME1").on('keydown', function(e){
		if(e.keyCode == "13"){
			btn_comm_product_search1();
		}
	});
	
	$("#POP_SCAN_NAME2").on('keydown', function(e){
		if(e.keyCode == "13"){
			btn_comm_product_search2();
		}
	});
	
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 958,
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
	    width : 900,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});

	//달력설정
	$(".datepicker").datepicker();
});


// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%", "180px");
//rMateGridH5.create("grid2", "gridHolder2", jsVars+"&dataType=xml", "100%", "180px");
rMateGridH5.create("grid2", "gridHolder2", jsVars+"&dataType=xml", "100%");
rMateGridH5.create("grid3", "gridHolder3", jsVars, "100%", "180px");
rMateGridH5.create("grid4", "gridHolder4", jsVars, "100%", "180px");

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {

	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp1.setLayout(layoutStr);
		gridApp1.setData(gridData1);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData1 = dataRow1[dataField];
			selectPromotionItem(rowIndex);

		};
		//그리드1 핸들러
		var layoutCompleteHandler1 = function(event) {

			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			
			//그리드1 셀선택 이벤트
			dataGrid1.addEventListener("itemClick", itemClickHandler);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		
		
	}else if(id == "grid2"){

		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData2);

		//로우 클릭 이벤트 제어
		var itemClickHandler2 = function(event) {
			var rowIndex = event.rowIndex;
			selectedIndex = rowIndex;
			rowIndex2 = rowIndex;
			var columnIndex = event.columnIndex;
			dataRow2 = gridRoot2.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid2.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData2 = dataRow2[dataField];

		};
		
		//그리드1 핸들러
		var layoutCompleteHandler2 = function(event) {
			dataGrid2 = gridRoot2.getDataGrid();	// 그리드 객체
			
			//그리드1 셀선택 이벤트
			dataGrid2.addEventListener("itemClick", itemClickHandler2);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("itemDataChanged", itemDataChangeHandler2);

		
	}else if (id == "grid3") {

		// rMateGrid 관련 객체
		gridApp3 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot3 = gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp3.setLayout(layoutStr3);
		gridApp3.setData(gridData3);

		
	}else if (id == "grid4") {

		// rMateGrid 관련 객체
		gridApp4 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot4 = gridApp4.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp4.setLayout(layoutStr4);
		gridApp4.setData(gridData4);

	}
}



function itemDataChangeHandler2(event) {
	
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot2.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	
	//수정값과 이전값이 같지 않은 경우 내용이 수정된것으로 판단 저장시 값을 전달한다.
	if(oldValue != newValue){
		if(gridRoot2.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "U" , rowIndex, "INPUT_YN");
		}
	}
	
	if(dataField == "BASE_AMT1"){
		if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot2.setItemFieldAt(0, rowIndex , "BASE_AMT1");
			saveFlag="N";
			return;
		}
	}else if(dataField == "BASE_AMT2"){
		if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot2.setItemFieldAt(0, rowIndex , "BASE_AMT2");
			saveFlag="N";
			return;
		}
	}else if(dataField == "BASE_AMT3"){
		if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot2.setItemFieldAt(0, rowIndex , "BASE_AMT3");
			saveFlag="N";
			return;
		}
	}else if(dataField == "DC_AMT1"){
		if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot2.setItemFieldAt(0, rowIndex , "DC_AMT1");
			saveFlag="N";
			return;
		}
	}else if(dataField == "DC_AMT2"){
		if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot2.setItemFieldAt(0, rowIndex , "DC_AMT2");
			saveFlag="N";
			return;
		}
	}else if(dataField == "DC_AMT3"){
		if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot2.setItemFieldAt(0, rowIndex , "DC_AMT3");
			saveFlag="N";
			return;
		}
	}
}



//그리드1 데이터 초기화
var gridData1 = [];
var gridData2 = [];
var gridData3 = [];
var gridData4 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2,dataRow2,clickData2,selectorColumn2, collection2, rowIndex2;
var gridApp3, gridRoot3, dataGrid3,dataRow3,clickData3,selectorColumn3, collection3, rowIndex3;
var gridApp4, gridRoot4, dataGrid4,dataRow4,clickData4,selectorColumn4, collection4, rowIndex4;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1">\
			<columns>\
				<DataGridColumn dataField="PMT_CODE"    	headerText="'+eventCode+'" 		textAlign="center" width="90" />\
				<DataGridColumn dataField="PMT_NAME"    	headerText="'+eventName+'" 		textAlign="center" width="140" />\
				<DataGridColumn dataField="TGET_CUST_NM"   	headerText="'+cstmrType+'" 		textAlign="center" width="70" />\
				<DataGridColumn dataField="EVT_TP_NM"  		headerText="'+eventKinds+'" 	textAlign="center" width="90" />\
				<DataGridColumn dataField="PUR_COND_NM"  	headerText="'+buyref+'" 		textAlign="center" width="90" />\
				<DataGridColumn dataField="DC_FLAG_NM"  	headerText="'+dcRef+'" 			textAlign="center" width="90" />\
				<DataGridColumn dataField="EVT_STR_DT"  	headerText="'+eventStartDate+'"	textAlign="center" width="90" />\
				<DataGridColumn dataField="EVT_END_DT"  	headerText="'+eventEndDate+'" 	textAlign="center" width="90" />\
				<DataGridColumn dataField="BASE_AMT1"  		headerText="'+qtyNAmt1+'" 		formatter="{numfmt}" textAlign="right" width="90" />\
				<DataGridColumn dataField="DC_AMT1"  		headerText="'+dcAmt1+'" 		formatter="{numfmt}" textAlign="right" width="90" />\
				<DataGridColumn dataField="BASE_AMT2"  		headerText="'+qtyNAmt2+'" 		formatter="{numfmt}" textAlign="right" width="90" />\
				<DataGridColumn dataField="DC_AMT2"  		headerText="'+dcAmt2+'" 		formatter="{numfmt}" textAlign="right" width="90" />\
				<DataGridColumn dataField="BASE_AMT3"  		headerText="'+qtyNAmt1+'" 		formatter="{numfmt}" textAlign="right" width="90" />\
				<DataGridColumn dataField="DC_AMT3"  		headerText="'+dcAmt3+'" 		formatter="{numfmt}" textAlign="right" width="90" />\
				<DataGridColumn dataField="PUR_COND"  		headerText="'+buyref+'" 		textAlign="center" visible="false" />\
				<DataGridColumn dataField="DC_FLAG"  		headerText="'+dcRef+'" 			textAlign="center" visible="false" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

function itemFunc(rowIndex, columnIndex, item, dataField){ //
	if($("#EVT_TP").val() == "2" &&  (columnIndex == 7 || columnIndex == 8 || columnIndex == 9 || columnIndex == 10 || columnIndex == 11 || columnIndex == 12) ){
		return false;		
	}else if(gridRoot2.getItemFieldAt(rowIndex, "EVT_ITM_TYPE") == "G" &&  (columnIndex == 7 || columnIndex == 8 || columnIndex == 9 || columnIndex == 10 || columnIndex == 11 || columnIndex == 12) ){
		return false;
	}

	return true;  //return 값이 true면 editable이 가능하고. false면 editable이 불가능합니다.
}

var layoutStr2 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<PercentFormatter id="percfmt" useThousandsSeparator="true"/>\
	<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>\
	<DataGrid id="dg2" itemEditBeginningJsFunction="itemFunc" editable="true" horizontalScrollPolicy="auto" showDeletedRows="true" selectionMode="multipleRows" >\
		<columns>\
	 		<DataGridRowStateColumn id="rowState" textAlign="center" visible="true"/>\
			<DataGridColumn id="INPUT_YN"			dataField="INPUT_YN"  		headerText="INPUT_YN" 			textAlign="center" 	  visible="false" />\
			<DataGridColumn id="STR_NAME"			dataField="STR_NAME"  		headerText="'+storNm+'"			textAlign="center"    editable="false"  width="120"/>\
			<DataGridColumn id="SCAN_CODE"			dataField="SCAN_CODE" 		headerText="'+itmCode+'"  		textAlign="center"    editable="false"  width="120"/>\
			<DataGridColumn id="ITM_NAME"			dataField="ITM_NAME"  		headerText="'+itmName+'"  		textAlign="left"      editable="false"  width="350"/>\
			<DataGridColumn id="PACK_CODE"			dataField="PACK_CODE"  		headerText="'+pairCode+'"  		textAlign="center"    editable="false"  width="80" />\
			<DataGridColumn id="EVT_ITM_TYPE_NM"	dataField="EVT_ITM_TYPE_NM" headerText="'+prdKinds+'" 		textAlign="center"    editable="false"  width="100"/>\
			<DataGridColumn id="BASE_AMT1"			dataField="BASE_AMT1"  		headerText="'+qtyNAmt1+'"   	textAlign="right" 	  editable="true"   width="90" formatter="{numfmt}"  />\
			<DataGridColumn id="DC_AMT1"			dataField="DC_AMT1"  		headerText="'+dcAmt1+'" 		textAlign="right" 	  editable="true"   width="90" formatter="{numfmt}"  />\
			<DataGridColumn id="BASE_AMT2"			dataField="BASE_AMT2"  		headerText="'+qtyNAmt2+'"   	textAlign="right" 	  editable="true"   width="90" formatter="{numfmt}"  />\
			<DataGridColumn id="DC_AMT2"			dataField="DC_AMT2"  		headerText="'+dcAmt2+'" 		textAlign="right" 	  editable="true"   width="90" formatter="{numfmt}"  />\
			<DataGridColumn id="BASE_AMT3"			dataField="BASE_AMT3"  		headerText="'+qtyNAmt3+'"   	textAlign="right" 	  editable="true"   width="90" formatter="{numfmt}"  />\
			<DataGridColumn id="DC_AMT3"			dataField="DC_AMT3"  		headerText="'+dcAmt3+'" 		textAlign="right" 	  editable="true"   width="90" formatter="{numfmt}"  />\
			<DataGridColumn id="PMT_CODE"			dataField="PMT_CODE"  		headerText="'+eventCode+'" 		textAlign="center"    editable="false"  visible="false"  />\
			<DataGridColumn id="PMT_NAME"			dataField="PMT_NAME"  		headerText="'+eventName+'"  	textAlign="center"    editable="false"  visible="false"  />\
			<DataGridColumn id="STR_CODE"			dataField="STR_CODE"  		headerText="STR_CODE"			textAlign="center"  visible="false"  />\
	</columns>\
	</DataGrid>\
</rMateGrid>';


var layoutStr3 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<PercentFormatter id="percfmt" useThousandsSeparator="true"/>\
	<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>\
	<DataGrid id="dg3" horizontalScrollPolicy="auto" showDeletedRows="true">\
		<columns>\
			<DataGridSelectorColumn id="selector3" width="40" textAlign="center" backgroundColor="#EDEDF0" allowAllSelection="false" />\
			<DataGridColumn dataField="STR_CODE"    	headerText="'+storCode+'" textAlign="center" width="65" />\
			<DataGridColumn dataField="STR_NAME"    	headerText="'+storNm+'" textAlign="center" width="80" />\
	</columns>\
	</DataGrid>\
</rMateGrid>';




var layoutStr4 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg4">\
		<columns>\
			<DataGridSelectorColumn id="selector4" textAlign="center" backgroundColor="#EDEDF0"/>\
			<DataGridColumn dataField="POP2_STR_NAME"    		headerText="'+storNm+'" 		textAlign="center" width="80"  />\
			<DataGridColumn dataField="POP2_EVT_TP_NM"    		headerText="'+eventKinds+'" 	textAlign="center" width="80"  />\
			<DataGridColumn dataField="POP2_SCAN_CODE"    		headerText="'+itmCode+'" 		textAlign="center" width="100" />\
			<DataGridColumn dataField="POP2_SCAN_NAME"    		headerText="'+itmName+'" 		textAlign="center" width="150" />\
			<DataGridColumn dataField="POP2_EVT_ITM_TYPE_NM"   	headerText="'+prdKinds+'" 		textAlign="center" width="80"  />\
			<DataGridColumn dataField="POP2_PACK_CODE"    		headerText="'+pairCode+'" 		textAlign="center" width="40"  />\
			<DataGridColumn dataField="POP2_BASE_AMT1"    		headerText="'+qtyNAmt1+'" 		textAlign="center" width="80"  />\
			<DataGridColumn dataField="POP2_DC_AMT1"    		headerText="'+dcAmt1+'" 		textAlign="center" width="80"  />\
			<DataGridColumn dataField="POP2_BASE_AMT2"    		headerText="'+qtyNAmt2+'" 		textAlign="center" width="80"  />\
			<DataGridColumn dataField="POP2_DC_AMT2"    		headerText="'+dcAmt2+'" 		textAlign="center" width="80"  />\
			<DataGridColumn dataField="POP2_BASE_AMT3"    		headerText="'+qtyNAmt3+'" 		textAlign="center" width="80"  />\
			<DataGridColumn dataField="POP2_DC_AMT3"    		headerText="'+dcAmt3+'" 		textAlign="center" width="80"  />\
			<DataGridColumn dataField="POP2_STR_CODE"    		headerText="점포코드" 			textAlign="center" width="80" visible="false" />\
			<DataGridColumn dataField="POP2_EVT_TP"    			headerText="행사유형코드" 		textAlign="center" width="80" visible="false" />\
			<DataGridColumn dataField="POP2_EVT_ITM_TYPE"   	headerText="상품유형" 			textAlign="center" width="80" visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//그리드 row의 값을 변경하여 보여주기
function labelFunc(item, value, column){
  var str = item["DEL_YN"];//삭제여부 컬럼의 필드명
  if(str=="N")
    return "사용";
  else if(str=="Y")
   return "미사용";
}
// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}


function init() {
	
	var EVT_STR_DT = new CommDateManager().getDate("yyyy-mm-dd");
	var EVT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	var ORD_STR_DT = new CommDateManager().getDate("yyyy-mm-dd");
	var ORD_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	$("#EVT_STR_DT").val(EVT_STR_DT);
	$("#EVT_END_DT").val(EVT_END_DT);
	$("#ORD_STR_DT").val(ORD_STR_DT);
	$("#ORD_END_DT").val(ORD_END_DT);
	
	$("#top_search select[name=S_EVT_TP]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("S_EVT_TP", "EVT_TP");
	
	$("#TGET_CUST").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("TGET_CUST", "TGET_CUST");
	
	$("#EVT_TP").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("EVT_TP", "EVT_TP");
	
	$("#PUR_COND").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("PUR_COND", "PUR_COND");
	
	$("#DC_FLAG").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("DC_FLAG", "DC_FLAG");
	
	$("#POP_TGET_CUST").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("POP_TGET_CUST", "TGET_CUST");
	
	$("#POP_EVT_TP").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("POP_EVT_TP", "EVT_TP");
	
	/*$('#BASE_AMT1').number( true, 0 );
	$('#BASE_AMT2').number( true, 0 );
	$('#BASE_AMT3').number( true, 0 );
	$('#DC_AMT1').number( true, 1 );
	$('#DC_AMT2').number( true, 1 );
	$('#DC_AMT3').number( true, 1 );
	$('#POP_BASE_AMT1').number( true, 0 );
	$('#POP_BASE_AMT2').number( true, 0 );
	$('#POP_BASE_AMT3').number( true, 0 );
	$('#POP_DC_AMT1').number( true, 1 );
	$('#POP_DC_AMT2').number( true, 1 );
	$('#POP_DC_AMT3').number( true, 1 );*/
	
	
	
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   			   	   ###
//########################################################


//프로모션 마스터 조회
function selectPromotionMaster(EVT_TP, EVT_STR_DT){

	//로딩바 출력
	showLoadingBar1();
	
	jQuery.ajax({ 
	    url:"/promotionMasterSearch.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'EVT_TP' : EVT_TP
				,	'EVT_STR_DT' : EVT_STR_DT
				},
		success:function(data){
			
			gridApp1.setData(data);
			
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar1();
//	    	if (rowIndex > 0){
//	    		selectPromotionItem(0);
//	    	}	    	
	    	
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}


function selectPromotionItem(rowIndex){
	
	btnNew();
	
	//마스터 정보
	$('#PMT_CODE').val(dataRow1["PMT_CODE"]);
	$('#PMT_NAME').val(dataRow1["PMT_NAME"]);
	$('#EVT_STR_DT').val(dataRow1["EVT_STR_DT"]);
	$('#EVT_END_DT').val(dataRow1["EVT_END_DT"]);
	$('#TGET_CUST').val(dataRow1["TGET_CUST"]);
	$('#EVT_TP').val(dataRow1["EVT_TP"]);
	$('#PUR_COND').val(dataRow1["PUR_COND"]);
	$('#DC_FLAG').val(dataRow1["DC_FLAG"]);
	$('#ORD_STR_DT').val(dataRow1["ORD_STR_DT"]);
	$('#ORD_END_DT').val(dataRow1["ORD_END_DT"]);
	$('#REMARK').val(dataRow1["REMARK"]);
	
	
	if(dataRow1.EVT_TP == "2"){
		$("#BASE_AMT1, #BASE_AMT2, #BASE_AMT3, #DC_AMT1, #DC_AMT2, #DC_AMT3").attr("disabled", false);
		$("#POP_BASE_AMT1, #POP_BASE_AMT2, #POP_BASE_AMT3, #POP_DC_AMT1, #POP_DC_AMT2, #POP_DC_AMT3").attr("disabled", true);
		
		if(dataRow1.BASE_AMT1 != undefined && dataRow1.DC_AMT1 != undefined){
			$('#BASE_AMT1').val(dataRow1["BASE_AMT1"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$('#DC_AMT1').val(dataRow1["DC_AMT1"]);
		}
		if(dataRow1.BASE_AMT2 != undefined && dataRow1.DC_AMT2 != undefined){
			$('#BASE_AMT2').val(dataRow1["BASE_AMT2"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$('#DC_AMT2').val(dataRow1["DC_AMT2"]);
		}
		if(dataRow1.BASE_AMT3 != undefined && dataRow1.DC_AMT3 != undefined){
			$('#BASE_AMT3').val(dataRow1["BASE_AMT3"].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$('#DC_AMT3').val(dataRow1["DC_AMT3"]);
		}
	}else{
		$("#BASE_AMT1, #BASE_AMT2, #BASE_AMT3, #DC_AMT1, #DC_AMT2, #DC_AMT3").attr("disabled", true);
		$("#POP_BASE_AMT1, #POP_BASE_AMT2, #POP_BASE_AMT3, #POP_DC_AMT1, #POP_DC_AMT2, #POP_DC_AMT3").attr("disabled", false);
	}
	
	if($("#DC_FLAG").val() == "1"){
		$("#AMT1, #POP_AMT1").html("수량/할인금액1");
		$("#AMT2, #POP_AMT2").html("수량/할인금액2");
		$("#AMT3, #POP_AMT3").html("수량/할인금액3");
	}else{
		$("#AMT1, #POP_AMT1").html("금액/할인율1");
		$("#AMT2, #POP_AMT2").html("금액/할인율2");
		$("#AMT3, #POP_AMT3").html("금액/할인율3");
	}
	
	//grid 초기화
	gridRoot2.removeAll();
	
	//로딩바 출력
	showLoadingBar2();
	
	dataRow1 = gridRoot1.getItemAt(rowIndex);

	jQuery.ajax({ 
	    url:"/promotionItemSearch.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'PMT_CODE' : dataRow1["PMT_CODE"]
				},
		success:function(data){

			//디테일정보
			var ORD_CNT = data.length;
			var ORD_TOT = 0;
			
			for(var i=0; i <data.length ; i++){
				
				var v_edit = "true";
			
				var firstTag="<GRIDROW></GRIDROW>";  
				if (window.DOMParser)
			    {   parser = new DOMParser();
			        xmlDoc = parser.parseFromString(firstTag,"text/xml");
				}
				else // 인터넷 익스플로러
				{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				    xmlDoc.async=false;
			        xmlDoc.loadXML(firstTag); 
			    }
				
				var INPUT_YN 		= xmlDoc.createElement("INPUT_YN");
				var PMT_CODE 		= xmlDoc.createElement("PMT_CODE");
				var STR_NAME 		= xmlDoc.createElement("STR_NAME");
				var PMT_NAME 		= xmlDoc.createElement("PMT_NAME");
				var SCAN_CODE 		= xmlDoc.createElement("SCAN_CODE");
				var ITM_NAME 		= xmlDoc.createElement("ITM_NAME");
				var PACK_CODE 		= xmlDoc.createElement("PACK_CODE");
				var EVT_ITM_TYPE_NM = xmlDoc.createElement("EVT_ITM_TYPE_NM");
				var BASE_AMT1 		= xmlDoc.createElement("BASE_AMT1");
				var BASE_AMT2 		= xmlDoc.createElement("BASE_AMT2");
				var BASE_AMT3 		= xmlDoc.createElement("BASE_AMT3");
				var DC_AMT1 		= xmlDoc.createElement("DC_AMT1");
				var DC_AMT2 		= xmlDoc.createElement("DC_AMT2");
				var DC_AMT3 		= xmlDoc.createElement("DC_AMT3");
				var EVT_ITM_TYPE 	= xmlDoc.createElement("EVT_ITM_TYPE");
				var STR_CODE 	= xmlDoc.createElement("STR_CODE");
				
				INPUT_YN.appendChild(xmlDoc.createTextNode( 		'N' ));
				PMT_CODE.appendChild(xmlDoc.createTextNode( 		data[i].PMT_CODE ));
				STR_NAME.appendChild(xmlDoc.createTextNode( 		data[i].STR_NAME ));
				PMT_NAME.appendChild(xmlDoc.createTextNode( 		data[i].PMT_NAME ));
				SCAN_CODE.appendChild(xmlDoc.createTextNode( 		data[i].SCAN_CODE ));
				ITM_NAME.appendChild(xmlDoc.createTextNode( 		data[i].ITM_NAME ));
				PACK_CODE.appendChild(xmlDoc.createTextNode( 		data[i].PACK_CODE ));
				EVT_ITM_TYPE_NM.appendChild(xmlDoc.createTextNode(  data[i].EVT_ITM_TYPE_NM ));
				BASE_AMT1.appendChild(xmlDoc.createTextNode( 		data[i].BASE_AMT1 ));
				BASE_AMT2.appendChild(xmlDoc.createTextNode( 		data[i].BASE_AMT2 ));
				BASE_AMT3.appendChild(xmlDoc.createTextNode( 		data[i].BASE_AMT3 ));
				DC_AMT1.appendChild(xmlDoc.createTextNode( 			data[i].DC_AMT1 ));
				DC_AMT2.appendChild(xmlDoc.createTextNode( 			data[i].DC_AMT2 ));
				DC_AMT3.appendChild(xmlDoc.createTextNode( 			data[i].DC_AMT3 ));
				EVT_ITM_TYPE.appendChild(xmlDoc.createTextNode( 	data[i].EVT_ITM_TYPE ));
				STR_CODE.appendChild(xmlDoc.createTextNode( 			data[i].STR_CODE ));
 
				
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PMT_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PMT_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PACK_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_ITM_TYPE_NM);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_AMT1);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_AMT2);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_AMT3);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DC_AMT1);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DC_AMT2);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DC_AMT3);		
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_ITM_TYPE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
				
				gridRoot2.addItemAt(  xmlDoc  , -1, false);
				
				//i (index) 입력하여 그리드 아이템 가져오기
				var selectedItem = gridRoot2.getItemAt(i);
				//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
				gridRoot2.removeChangedData(selectedItem);
			}
			
			
			//dataGrid2.invalidateList();
			
			
	    },
	    complete : function(data) {

	    	//로딩바 숨기기
	    	hideLoadingBar2();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar2();
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}


//프로모션 Store 조회
function selectPromotionStore(){

	//로딩바 출력
	showLoadingBar3();
	jQuery.ajax({ 
	    url:"/promotionStoreSearch.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					
				},
		success:function(data){
			
			gridApp3.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar3();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar3();
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	

}



//조회 항목 초기화
function btnNew(){
	$("#PMT_CODE").val("");
	$("#PMT_NAME").val("");
	$("#TGET_CUST").val("");
	$("#EVT_TP").val("");
	$("#REMARK").val("");
	$("#BASE_AMT1").val("");
	$("#BASE_AMT2").val("");
	$("#BASE_AMT3").val("");
	$("#DC_AMT1").val("");
	$("#DC_AMT2").val("");
	$("#DC_AMT3").val("");
	

	var EVT_STR_DT = new CommDateManager().getDate("yyyy-mm-dd");
	var EVT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	var ORD_STR_DT = new CommDateManager().getDate("yyyy-mm-dd");
	var ORD_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	$("#EVT_STR_DT").val(EVT_STR_DT);
	$("#EVT_END_DT").val(EVT_END_DT);
	$("#ORD_STR_DT").val(ORD_STR_DT);
	$("#ORD_END_DT").val(ORD_END_DT);
	
	
	
	var clearData = [];
	//gridApp1.setData(clearData);
	gridRoot2.removeAll();
	
	if($("#DC_FLAG").val() == "1"){
		$("#AMT1, #POP_AMT1").html("수량/할인금액1");
		$("#AMT2, #POP_AMT2").html("수량/할인금액2");
		$("#AMT3, #POP_AMT3").html("수량/할인금액3");
	}else{
		$("#AMT1, #POP_AMT1").html("금액/할인율1");
		$("#AMT2, #POP_AMT2").html("금액/할인율2");
		$("#AMT3, #POP_AMT3").html("금액/할인율3");
	}
	
}

//상품추가팝업버튼
function openItemAddPop(){

	if($("#PMT_CODE").val() == ""){
		alert(promMessg01); //프로모션 상품마스터를 선택해주세요.
		return;
	}else{
		
		$("#POP_BASE_AMT1, #POP_BASE_AMT2, #POP_BASE_AMT3, #POP_DC_AMT1, #POP_DC_AMT2, #POP_DC_AMT3").val("");
		
		selectPromotionStore();
		$("#POP_PMT_CODE").val($("#PMT_CODE").val());
		$("#POP_PMT_NAME").val($("#PMT_NAME").val());
		$("#POP_TGET_CUST").val($("#TGET_CUST").val());
		$("#POP_EVT_TP").val($("#EVT_TP").val());
		
		$("#pop_wrap1").dialog("open");		
	}

}

//상품추가팝업 취소
function btn_pop_cancel(){

	$("#pop_wrap1").dialog("close");	
	popup_clear();


}

//행추가
function deleteRow(){
	if (rowIndex2 >= 0){
		gridRoot2.removeItemAt(rowIndex2);
		if(gridRoot2.getItemFieldAt(rowIndex2, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "D" , rowIndex2, "INPUT_YN");
		}
	}		
	return;
	
}


//프로모션 마스터 조회
function btnSearch(){
	
	if($("#S_EVT_STR_DT").val() == ""){
		alert(eventStartDate + msgConfirm);
		$('#S_EVT_STR_DT' ).focus();
		return;
	}	
	//초기화
	btnNew();
	
	var EVT_TP 		= $("#S_EVT_TP").val();
	var EVT_STR_DT 	= $("#S_EVT_STR_DT").val();
	
	
	
	selectPromotionMaster(EVT_TP, EVT_STR_DT);
}

//저장가능 상태 체크 :: N->저장불가능  Y->저장가능
var saveFlag="Y";
var myVar = "";
function btn_saveCheck() {
    myVar = setTimeout(btnSave, 500);
}

//프로모션 마스터 저장
function btnSave(){
	
	/*
	 * 필수입력값 체크
	 */
	if($("#PMT_NAME").val() == ""){
		alert(promName + msgConfirm);
		$('#PMT_NAME' ).focus();
		return;
	}
	if($("#TGET_CUST").val() == ""){
		alert(cstmrType + msgConfirm);
		$('#TGET_CUST' ).focus();
		return;
	}
	if($("#EVT_TP").val() == ""){
		alert(eventKinds + msgConfirm);
		$('#EVT_TP' ).focus();
		return;
	}
	if($("#EVT_STR_DT").val() == ""){
		alert(eventStartDate + msgConfirm);
		$('#EVT_STR_DT' ).focus();
		return;
	}
	
	if($("#EVT_STR_DT").val().replace(/-/g,"") > $("#EVT_END_DT").val().replace(/-/g,"")){
		alert(msgEventDateValidation);
		$('#EVT_STR_DT' ).focus();
		return;		
	}
	
	if($("#ORD_STR_DT").val().replace(/-/g,"") > $("#ORD_END_DT").val().replace(/-/g,"")){
		alert(msgOrderDateValidation);
		$('#EVT_STR_DT' ).focus();
		return;		
	}	
	
	if ($("#EVT_TP").val() != "2"){
		if (($("#BASE_AMT1").val() != "") ||  ($("#BASE_AMT2").val() != "") ||  ($("#BASE_AMT3").val() != "")
		 || ($("#DC_AMT1").val() != "") ||  ($("#DC_AMT2").val() != "") ||  ($("#DC_AMT3").val() != "")
		){
			alert(promMessg02); //행사유형이 상품군일경우에만 금액(수량)을 입력할수 있습니다.
			$("#BASE_AMT1").val("");
			$("#BASE_AMT2").val("");
			$("#BASE_AMT3").val("");
			$("#DC_AMT1").val("");
			$("#DC_AMT2").val("");
			$("#DC_AMT3").val("");	
			return;		
		}
	}
	
	if ($("#EVT_TP").val() == "1"){
		if ($("#PUR_COND").val() == $("#DC_FLAG").val()){
			alert(promMessg03); //행사유형이 다다익선일경우 구매/할인기준이 수량/정액또는 금액/정율만 가능합니다.
			$("#PUR_COND").val("1");
			$("#DC_FLAG").val("2");
			$('#PUR_COND' ).focus();
			return;		
		}
		
	}else if ($("#EVT_TP").val() == "2"){
		if ($("#PUR_COND").val() == "1" & $("#DC_FLAG").val() == "2"){
		}else{
			alert(promMessg04); //행사유형이 상품군일경우 구매/할인기준이 금액/정율만 가능합니다.
			$("#PUR_COND").val("1");
			$("#DC_FLAG").val("2");
			$('#PUR_COND' ).focus();
			return;					
		}
	}else{
		if ($("#PUR_COND").val() == "2" & $("#DC_FLAG").val() == "1"){
		}else{
			alert(promMessg05); //행사유형이 Mix&Match경우 구매/할인기준이 수량/정액만 가능합니다.
			$("#PUR_COND").val("2");
			$("#DC_FLAG").val("1");
			$('#PUR_COND' ).focus();
			return;					
		}	
	}
	
	var validationMsg = promotionMasterValidationSave();
	
	if(validationMsg != "0000"){
		alert('"' + validationMsg + '"' + ' 행사와 중복되는 상품이 존재하여 저장이 불가능합니다.');
		return;
	}
	
	var gridXmlData = "";
	var rowCnt      = gridRoot2.getCollection().getSource();

	var updateRowCnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData = gridXmlData + getXmlString(   gridRoot2.getItemAt(i)   );
			updateRowCnt++;
		}
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ;

	jQuery.ajax({ 
	    url:"/promotionMasterRegister.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: { 
		    "gridXmlData" : gridXmlData
			,   "PMT_CODE"	 : $("#PMT_CODE").val()
			,	"PMT_NAME"   : $("#PMT_NAME").val()
			,	"EVT_STR_DT" : $("#EVT_STR_DT").val()
			,	"EVT_END_DT" : $("#EVT_END_DT").val()
			,	"TGET_CUST"  : $("#TGET_CUST").val()			
			,	"EVT_TP"     : $("#EVT_TP").val()			
			,	"ORD_STR_DT" : $("#ORD_STR_DT").val()
			,	"ORD_END_DT" : $("#ORD_END_DT").val()			
			,	"PUR_COND" 	 : $("#PUR_COND").val()
			,	"DC_FLAG"    : $("#DC_FLAG").val()
			,	"BASE_AMT1"  : $("#BASE_AMT1").val().replace(/,/g,"")
			,	"BASE_AMT2"  : $("#BASE_AMT2").val().replace(/,/g,"")
			,	"BASE_AMT3"  : $("#BASE_AMT3").val().replace(/,/g,"")
			,	"DC_AMT1"  	 : $("#DC_AMT1").val().replace(/,/g,"")
			,	"DC_AMT2"  	 : $("#DC_AMT2").val().replace(/,/g,"")
			,	"DC_AMT3"  	 : $("#DC_AMT3").val().replace(/,/g,"")
			,	"RMK"     	 : $("#RMK").val()
			}, 
		success:function(data){   
			var obj = jQuery.parseJSON( data.RETURN_CUR ); 
			if( obj.RETURN_CODE == "0000" )
			{ 
				//btnNew();
				alert(msgSave);
				btnSearch();
				  
			} else if( obj.RETURN_CODE == "1111" ){
				
				alert(promMessg06); //동일한 행사유형을 같은 기간에 생성할수 없습니다.
				return;
			} else {
				alert(errCode+":"+obj.RETURN_CODE );
				return;				
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	           
	    }
	});
	

}


//(주상품검색) 팝업 호출 function
function btn_comm_product_search1(){
	
	$("#POP_SCAN_NAME1").focus();
	
	item_gubun = "1";
	
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	if($("#POP_SCAN_NAME1").val() != null && $("#POP_SCAN_NAME1").val() != ""){
		$("#P_TEXT2").val($("#POP_SCAN_NAME1").val());
		btn_comm_search('2');
	}
	
}

//(부상품검색) 팝업 호출 function
function btn_comm_product_search2(){
	
	$("#POP_SCAN_NAME2").focus();
	
	item_gubun = "2";
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	if($("#POP_SCAN_NAME2").val() != null && $("#POP_SCAN_NAME2").val() != ""){
		$("#P_TEXT2").val($("#POP_SCAN_NAME2").val());
		btn_comm_search('2');
	}
}

//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	if (item_gubun == "1"){
		$('#POP_SCAN_CODE1' ).val(dataRow.SCAN_CODE);				// 상품코드
		$('#POP_SCAN_NAME1' ).val(dataRow.ITM_NAME);				// 상품명
	}else {
		$('#POP_SCAN_CODE2' ).val(dataRow.SCAN_CODE);				// 상품코드
		$('#POP_SCAN_NAME2' ).val(dataRow.ITM_NAME);				// 상품명
	}
}

//팝업 신규시 초기화
function btn_pop_new(){
	$("#POP_SCAN_CODE1").val("");
	$("#POP_SCAN_NAME1").val("");
	$("#POP_SCAN_CODE2").val("");
	$("#POP_SCAN_NAME2").val("");
	$("#POP_BASE_AMT1").val("");
	$("#POP_BASE_AMT2").val("");	
	$("#POP_BASE_AMT3").val("");
	$("#POP_DC_AMT1").val("");
	$("#POP_DC_AMT2").val("");	
	$("#POP_DC_AMT3").val("");

}

//팝업 적용 상품 추가
function btn_pop_add(){

	//사용자가 선택한 행의 index번호들 가져오기
	var selector  = gridRoot3.getObjectById("selector3");
	var sIndexArr = selector.getSelectedIndices();
	var rowCnt    = gridRoot4.getCollection().getSource();
	var packCode  = 0;

	/*
	 * 필수 입력체크
	 */
	//다다익선
	if ($("#POP_EVT_TP").val()  == "1"){
		if ($("#POP_SCAN_CODE1").val()  == ""){
			alert(promMessg08); //주상품을 반드시 입력해야합니다.
			$('#POP_SCAN_CODE1' ).focus();
			return;			
		}
		if ($("#POP_BASE_AMT1").val() == "" || $("#POP_DC_AMT1").val() == ""){

			$('#POP_BASE_AMT1' ).focus();
			alert(promMessg09);
			return;	
		}

	//상품군일경우 주상품입력 금액입력불가
	}else if ($("#POP_EVT_TP").val()  == "2"){
		if ($("#POP_SCAN_CODE1").val()  == ""){
			alert(promMessg08); //주상품을 반드시 입력해야합니다.
			$('#POP_SCAN_CODE1' ).focus();
			return;			
		}
		if ($("#POP_BASE_AMT1").val()  != "" || $("#POP_BASE_AMT2").val()  != "" || $("#POP_BASE_AMT3").val()  != ""
		||  $("#POP_DC_AMT1").val()  != ""   || $("#POP_DC_AMT2").val()  != ""   || $("#POP_DC_AMT3").val()  != ""	
		){
			alert(promMessg12);
			$('#POP_BASE_AMT1').val("");
			$('#POP_BASE_AMT2').val("");
			$('#POP_BASE_AMT3').val("");
			$('#POP_DC_AMT1').val("");
			$('#POP_DC_AMT2').val("");
			$('#POP_DC_AMT3').val("");			
			return;	
		}
		
	//Mix&Match
	}else{
		if ($("#POP_SCAN_CODE1").val()  == ""){
			alert(promMessg07);  //행사유형이 Mix&Metch일경우 주/부 상품을 모두 입력해야합니다.
			$('#POP_SCAN_CODE1' ).focus();	
			return;
		}else if ($("#POP_SCAN_CODE2").val()  == ""){
			alert(promMessg07);  //행사유형이 Mix&Metch일경우 주/부 상품을 모두 입력해야합니다.
			$('#POP_SCAN_CODE2' ).focus();	
			return;
		}	
		if ($("#POP_BASE_AMT1").val() == "" || $("#POP_DC_AMT1").val() == ""){

			$('#POP_BASE_AMT1' ).focus();
			alert(promMessg09);
			return;	
		}
	}


	
	if (sIndexArr == null || sIndexArr.length == 0){
		alert(promMessg10);
		return;
	}

	/*
	 * Pack Code 채번
	 */
	if(rowCnt.length < 1){

		packCode = 1;
	}else{
		if ($("#POP_EVT_TP").val()  == "3") {
			packCode = (rowCnt.length / 2) + 1;
		}else{
			packCode = rowCnt.length + 1;
		}
	}
	
	/*
	 * 적용 상품 생성
	 */
	//상품유형 : Mix&Metch
	if ($("#POP_EVT_TP").val()  == "3"){
	
		// 선택한 행을 오른쪽 rMateGrid에 삽입한다.
		selectorColumn = gridRoot3.getObjectById("selector3");
		selectorColumn.getSelectedIndices();	

		var sItemArr = selectorColumn.getSelectedIndices();	
		sItemArr = sItemArr.sort(function(a, b){return a-b;});
		for (var i = 0; i < sItemArr.length; i++) {
			//주상품 등록
			pop_insertRow(gridRoot3.getItemFieldAt(sItemArr[i], "STR_CODE")    //점포코드
						, gridRoot3.getItemFieldAt(sItemArr[i], "STR_NAME")    //점포명
						, "B"                                        //상품유형(주)
						, "주상품(Buy)"
						, packCode  //묶음코드
						, $("#POP_SCAN_CODE1").val()//상품코드
						, $("#POP_SCAN_NAME1").val()//상품명
					);

			//부상품 등록		
			pop_insertRow(gridRoot3.getItemFieldAt(sItemArr[i], "STR_CODE")    //점포코드
						, gridRoot3.getItemFieldAt(sItemArr[i], "STR_NAME")    //점포명
						, "G"                                        //상품유형(주)
						, "부상품(Get)"
						, packCode  //묶음코드
						, $("#POP_SCAN_CODE2").val()//상품코드
						, $("#POP_SCAN_NAME2").val()//상품명
				);
			
			packCode = packCode + 1;
			
		
		};
		
		selectorColumn.setAllItemSelected(false);
	//상품유형 : 다다익선 & 상품군	등록
	}else{

		// 선택한 행을 오른쪽 rMateGrid에 삽입한다.
		selectorColumn = gridRoot3.getObjectById("selector3");
		selectorColumn.getSelectedIndices();	

		var sItemArr = selectorColumn.getSelectedIndices();	
		sItemArr = sItemArr.sort(function(a, b){return a-b;});
		for (var i = 0; i < sItemArr.length; i++) {

			//주상품만 등록
			pop_insertRow(gridRoot3.getItemFieldAt(sItemArr[i], "STR_CODE")    //점포코드
						, gridRoot3.getItemFieldAt(sItemArr[i], "STR_NAME")    //점포명
						, "N"                                        //상품유형(주)
						, "기타(Normal)"
						, packCode  //묶음코드
						, $("#POP_SCAN_CODE1").val()//상품코드
						, $("#POP_SCAN_NAME1").val()//상품명
					);	
			packCode = packCode + 1;
			
		
		};
		
	}


}

//팝업하단 그리드에 적용 상품 추가
function pop_insertRow(V_STR_CODE, V_STR_NAME, V_EVT_ITM_TYPE, V_EVT_ITM_TYPE_NM, V_PACK_CODE, V_SCAN_CODE, V_SCAN_NAME){
	
	var firstTag="<GRIDROW></GRIDROW>";  
	if (window.DOMParser)
    {   parser = new DOMParser();
        xmlDoc = parser.parseFromString(firstTag,"text/xml");
	}
	else // 인터넷 익스플로러
	{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	    xmlDoc.async=false;
        xmlDoc.loadXML(firstTag); 
    }  
	
	var V_BASE_AMT1 = 0;
	var V_BASE_AMT2 = 0;
	var V_BASE_AMT3 = 0;
	var V_DC_AMT1 	= 0;
	var V_DC_AMT2 	= 0;
	var V_DC_AMT3 	= 0;

	if (V_EVT_ITM_TYPE  != "G"){
		if ($("#POP_BASE_AMT1").val() != ""){
			V_BASE_AMT1 = $("#POP_BASE_AMT1").val();
		}
		if ($("#POP_BASE_AMT2").val() != ""){
			V_BASE_AMT2 = $("#POP_BASE_AMT2").val();
		}
		if ($("#POP_BASE_AMT2").val() != ""){
			V_BASE_AMT3 = $("#POP_BASE_AMT3").val();
		}
		if ($("#POP_DC_AMT1").val() != ""){
			V_DC_AMT1 = $("#POP_DC_AMT1").val();
		}	
		if ($("#POP_DC_AMT2").val() != ""){
			V_DC_AMT2 = $("#POP_DC_AMT2").val();
		}	
		if ($("#POP_DC_AMT3").val() != ""){
			V_DC_AMT3 = $("#POP_DC_AMT3").val();
		}		
	}
	
    var	INPUT_YN				= xmlDoc.createElement('INPUT_YN'); 
	var	POP2_STR_NAME			= xmlDoc.createElement('POP2_STR_NAME');
	var	POP2_EVT_TP_NM			= xmlDoc.createElement('POP2_EVT_TP_NM');
	var	POP2_SCAN_CODE			= xmlDoc.createElement('POP2_SCAN_CODE');
	var	POP2_SCAN_NAME			= xmlDoc.createElement('POP2_SCAN_NAME');
	var	POP2_EVT_ITM_TYPE_NM	= xmlDoc.createElement('POP2_EVT_ITM_TYPE_NM');
	var	POP2_PACK_CODE			= xmlDoc.createElement('POP2_PACK_CODE');
	var	POP2_BASE_AMT1			= xmlDoc.createElement('POP2_BASE_AMT1');
	var	POP2_DC_AMT1			= xmlDoc.createElement('POP2_DC_AMT1');
	var	POP2_BASE_AMT2			= xmlDoc.createElement('POP2_BASE_AMT2');
	var	POP2_DC_AMT2			= xmlDoc.createElement('POP2_DC_AMT2');
	var	POP2_BASE_AMT3			= xmlDoc.createElement('POP2_BASE_AMT3');
	var	POP2_DC_AMT3			= xmlDoc.createElement('POP2_DC_AMT3');
	var	POP2_STR_CODE			= xmlDoc.createElement('POP2_STR_CODE');
	var	POP2_EVT_TP				= xmlDoc.createElement('POP2_EVT_TP');
	var	POP2_EVT_ITM_TYPE		= xmlDoc.createElement('POP2_EVT_ITM_TYPE');
	
	INPUT_YN.appendChild(  				xmlDoc.createTextNode("I" )	); 
	POP2_STR_NAME.appendChild(  		xmlDoc.createTextNode(V_STR_NAME ));
	POP2_EVT_TP_NM.appendChild(  		xmlDoc.createTextNode($("#POP_EVT_TP option:selected").text() ));
	POP2_SCAN_CODE.appendChild(  		xmlDoc.createTextNode(V_SCAN_CODE ));
	POP2_SCAN_NAME.appendChild(  		xmlDoc.createTextNode(V_SCAN_NAME ));
	POP2_EVT_ITM_TYPE_NM.appendChild(	xmlDoc.createTextNode(V_EVT_ITM_TYPE_NM ));
	POP2_PACK_CODE.appendChild(  		xmlDoc.createTextNode(V_PACK_CODE ));
	POP2_BASE_AMT1.appendChild(			xmlDoc.createTextNode(V_BASE_AMT1 ));
	POP2_DC_AMT1.appendChild(  			xmlDoc.createTextNode(V_DC_AMT1 ));
	POP2_BASE_AMT2.appendChild(			xmlDoc.createTextNode(V_BASE_AMT2 ));
	POP2_DC_AMT2.appendChild(  			xmlDoc.createTextNode(V_DC_AMT2 ));
	POP2_BASE_AMT3.appendChild(  		xmlDoc.createTextNode(V_BASE_AMT3 ));
	POP2_DC_AMT3.appendChild(  			xmlDoc.createTextNode(V_DC_AMT3 ));
	POP2_STR_CODE.appendChild(  		xmlDoc.createTextNode(V_STR_CODE));
	POP2_EVT_TP.appendChild(  			xmlDoc.createTextNode($("#POP_EVT_TP").val() ));
	POP2_EVT_ITM_TYPE.appendChild(  	xmlDoc.createTextNode(V_EVT_ITM_TYPE ));
	
	  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( INPUT_YN				);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_STR_NAME		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_EVT_TP_NM		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_SCAN_CODE		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_SCAN_NAME		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_EVT_ITM_TYPE_NM	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_PACK_CODE		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_BASE_AMT1	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_DC_AMT1		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_BASE_AMT2	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_DC_AMT2		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_BASE_AMT3	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_DC_AMT3		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_STR_CODE	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_EVT_TP		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( POP2_EVT_ITM_TYPE);
	
	gridRoot4.addItemAt(  xmlDoc  , 0);
	girdMoveSelctedIndex(0 , gridRoot4.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기	
}


//팝업 적용상품 메인 하단 리스트 적용
function btn_pop_apply(){
	
	var validationMsg = promotionMasterValidation();
	
	if(validationMsg == "9999"){
		return;
	}
	
	if(validationMsg != "0000"){
		alert('"' + validationMsg + '"' + ' 행사와 중복되는 상품이 존재하여 추가가 불가능합니다.');
		return;
	}

	var rowCnt    = gridRoot4.getCollection().getSource();
	var rowCnt2   = gridRoot2.getCollection().getSource();
	var addCnt   = 0;
	if (rowCnt.length < 1){
		alert(promMessg11);
		return;	
	}
	
	if (rowCnt2.length > 0){
		if ($("#POP_EVT_TP").val()  == "3"){
//			alert("묶음코드 계산1");
			addCnt = rowCnt2.length / 2;
		}else{
//			alert("묶음코드 계산2");
			addCnt = rowCnt2.length;
//			alert(addCnt);
		}		
	}

	//팝업 데이터 -> 메인그리드 insert
	for (var i = 0; i < rowCnt.length; i++) {

		pop_insertRow2(
		  $("#PMT_CODE").val()
		, $("#PMT_NAME").val()
		, gridRoot4.getItemFieldAt(i, "POP2_STR_NAME")
		, gridRoot4.getItemFieldAt(i, "POP2_SCAN_CODE")
		, gridRoot4.getItemFieldAt(i, "POP2_SCAN_NAME")
		, Number(gridRoot4.getItemFieldAt(i, "POP2_PACK_CODE")) + addCnt
		, gridRoot4.getItemFieldAt(i, "POP2_EVT_ITM_TYPE_NM")
		, gridRoot4.getItemFieldAt(i, "POP2_BASE_AMT1")
		, gridRoot4.getItemFieldAt(i, "POP2_DC_AMT1")
		, gridRoot4.getItemFieldAt(i, "POP2_BASE_AMT2")
		, gridRoot4.getItemFieldAt(i, "POP2_DC_AMT2")
		, gridRoot4.getItemFieldAt(i, "POP2_BASE_AMT3")
		, gridRoot4.getItemFieldAt(i, "POP2_DC_AMT3")
		, gridRoot4.getItemFieldAt(i, "POP2_EVT_ITM_TYPE")
		, gridRoot4.getItemFieldAt(i, "POP2_STR_CODE")
		);	
	}
	
	popup_clear();
	$("#pop_wrap1").dialog("close");		
}


function pop_insertRow2(V_PMT_CODE, V_PMT_NAME, V_STR_NAME, V_SCAN_CODE, V_SCAN_NAME,V_PACK_CODE,V_EVT_ITM_TYPE_NM,V_BASE_AMT1,V_DC_AMT1,V_BASE_AMT2,V_DC_AMT2,V_BASE_AMT3,V_DC_AMT3,V_EVT_ITM_TYPE,V_STR_CODE){
	
	var firstTag="<GRIDROW></GRIDROW>";  
	if (window.DOMParser)
    {   parser = new DOMParser();
        xmlDoc = parser.parseFromString(firstTag,"text/xml");
	}
	else // 인터넷 익스플로러
	{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	    xmlDoc.async=false;
        xmlDoc.loadXML(firstTag); 
    }  
	
    var	INPUT_YN		= xmlDoc.createElement('INPUT_YN'); 
	var	PMT_CODE		= xmlDoc.createElement('PMT_CODE');
	var	PMT_NAME		= xmlDoc.createElement('PMT_NAME');
	var	STR_NAME		= xmlDoc.createElement('STR_NAME');
	var SCAN_CODE		= xmlDoc.createElement('SCAN_CODE');
	var	ITM_NAME		= xmlDoc.createElement('ITM_NAME');
	var	PACK_CODE		= xmlDoc.createElement('PACK_CODE');
	var	EVT_ITM_TYPE_NM	= xmlDoc.createElement('EVT_ITM_TYPE_NM');
	var	BASE_AMT1		= xmlDoc.createElement('BASE_AMT1');
	var	DC_AMT1			= xmlDoc.createElement('DC_AMT1');
	var	BASE_AMT2		= xmlDoc.createElement('BASE_AMT2');
	var	DC_AMT2			= xmlDoc.createElement('DC_AMT2');
	var	BASE_AMT3		= xmlDoc.createElement('BASE_AMT3');
	var	DC_AMT3			= xmlDoc.createElement('DC_AMT3');
	var	EVT_ITM_TYPE	= xmlDoc.createElement('EVT_ITM_TYPE');
	var	STR_CODE		= xmlDoc.createElement('STR_CODE');
	
	INPUT_YN.appendChild(  			xmlDoc.createTextNode("I" )	); 
	PMT_CODE.appendChild(  			xmlDoc.createTextNode(V_PMT_CODE));
	PMT_NAME.appendChild(  			xmlDoc.createTextNode(V_PMT_NAME));
	STR_NAME.appendChild(  			xmlDoc.createTextNode(V_STR_NAME));
	SCAN_CODE.appendChild(  		xmlDoc.createTextNode(V_SCAN_CODE));
	ITM_NAME.appendChild(  			xmlDoc.createTextNode(V_SCAN_NAME));
	PACK_CODE.appendChild(			xmlDoc.createTextNode(V_PACK_CODE));
	EVT_ITM_TYPE_NM.appendChild(	xmlDoc.createTextNode(V_EVT_ITM_TYPE_NM));
	BASE_AMT1.appendChild(			xmlDoc.createTextNode(V_BASE_AMT1.replace(/,/g, "")));
	DC_AMT1.appendChild(  			xmlDoc.createTextNode(V_DC_AMT1.replace(/,/g, "")));
	BASE_AMT2.appendChild(			xmlDoc.createTextNode(V_BASE_AMT2.replace(/,/g, "")));
	DC_AMT2.appendChild(  			xmlDoc.createTextNode(V_DC_AMT2.replace(/,/g, "")));
	BASE_AMT3.appendChild(  		xmlDoc.createTextNode(V_BASE_AMT3.replace(/,/g, "")));
	DC_AMT3.appendChild(  			xmlDoc.createTextNode(V_DC_AMT3.replace(/,/g, "")));
	EVT_ITM_TYPE.appendChild(  		xmlDoc.createTextNode(V_EVT_ITM_TYPE));
	STR_CODE.appendChild(  			xmlDoc.createTextNode(V_STR_CODE));
	
	  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( INPUT_YN			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PMT_CODE			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PMT_NAME			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_NAME			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PACK_CODE		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( EVT_ITM_TYPE_NM	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BASE_AMT1		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( DC_AMT1			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BASE_AMT2		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( DC_AMT2			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BASE_AMT3		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( DC_AMT3			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( EVT_ITM_TYPE		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE			);
	
//	gridRoot2.addItemAt(  xmlDoc  , 0);
	gridRoot2.addItemAt(  xmlDoc  , 0 , false);
	//girdMoveSelctedIndex(0 , gridRoot2.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기
	
}



//팝업 clear
function popup_clear(){
	btn_pop_new();
	gridRoot3.removeAll();
	gridRoot4.removeAll();

	var clearData = [];
	gridApp11.setData(clearData);	
}




//그리드의 selctedIndex를 전달된 행으로 이동
function girdMoveSelctedIndex(idx) {
	// addItemAt나 removeItemAt후에 바로 selctedIndex를 변경하면 무시되는 경우가 발생하여 setTimeout로 지연후 실행토록 함
	setTimeout("gridSetSelectedIndex("+idx+")", 100);
}

function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

//상품유형 변경시 설정
function evtKind_onchange(){
	/*
	 * 다다익선(1)  : 기준금액:입력불가, 구매/할인기준: 수량/정액또는 금액정율
	 * 상품군(2)    : 기준금액:입력가능, 구매/할인기준: 금액/정율
	 * Mix&Match(3) : 기준금액:입력불가, 구매/할인기준: 수량/정액
	 * 
	 * 구매기준: 금액구매(1), 수량구매(2)
	 * 할인기준: 정액할인(1), 정율할인(2)
	 */
	
	//다다익선
	if ($("#EVT_TP").val()  == "1"){
		$("#PUR_COND").val("2");
		$("#DC_FLAG").val("1");
		$("#BASE_AMT1").val("");
		$("#BASE_AMT2").val("");
		$("#BASE_AMT3").val("");
		$("#DC_AMT1").val("");
		$("#DC_AMT2").val("");
		$("#DC_AMT3").val("");
		
		$("#BASE_AMT1, #BASE_AMT2, #BASE_AMT3, #DC_AMT1, #DC_AMT2, #DC_AMT3").attr("disabled", true);
		$("#POP_BASE_AMT1, #POP_BASE_AMT2, #POP_BASE_AMT3, #POP_DC_AMT1, #POP_DC_AMT2, #POP_DC_AMT3").attr("disabled", false);
		
	//상품군
	}else if ($("#EVT_TP").val()  == "2"){
		$("#PUR_COND").val("1");
		$("#DC_FLAG").val("2");
		
		$("#BASE_AMT1, #BASE_AMT2, #BASE_AMT3, #DC_AMT1, #DC_AMT2, #DC_AMT3").attr("disabled", false);
		$("#POP_BASE_AMT1, #POP_BASE_AMT2, #POP_BASE_AMT3, #POP_DC_AMT1, #POP_DC_AMT2, #POP_DC_AMT3").attr("disabled", true);
		
	//Mix&Match	
	}else{
		$("#PUR_COND").val("2");
		$("#DC_FLAG").val("1");		
		$("#BASE_AMT1").val("");
		$("#BASE_AMT2").val("");
		$("#BASE_AMT3").val("");
		$("#DC_AMT1").val("");
		$("#DC_AMT2").val("");
		$("#DC_AMT3").val("");		
		
		$("#BASE_AMT1, #BASE_AMT2, #BASE_AMT3, #DC_AMT1, #DC_AMT2, #DC_AMT3").attr("disabled", true);
		$("#POP_BASE_AMT1, #POP_BASE_AMT2, #POP_BASE_AMT3, #POP_DC_AMT1, #POP_DC_AMT2, #POP_DC_AMT3").attr("disabled", false);
	}
	
	if($("#DC_FLAG").val() == "1"){
		$("#AMT1, #POP_AMT1").html("수량/할인금액1");
		$("#AMT2, #POP_AMT2").html("수량/할인금액2");
		$("#AMT3, #POP_AMT3").html("수량/할인금액3");
	}else{
		$("#AMT1, #POP_AMT1").html("금액/할인율1");
		$("#AMT2, #POP_AMT2").html("금액/할인율2");
		$("#AMT3, #POP_AMT3").html("금액/할인율3");
	}
}

//금액변경시 이벤트
function amt_onchange(flag){
	/*
	 * 상품유형:상품군만 입력 가능 그 외 불가
	 */
	if ($("#EVT_TP").val()  != "2"){
		alert(promMessg02);
		if (flag =="1"){
			$("#BASE_AMT1").val("");
			$("#DC_AMT1").val("");
			
		}else if (flag == "2"){
			$("#BASE_AMT2").val("");
			$("#DC_AMT2").val("");
			
		}else {
			$("#BASE_AMT3").val("");
			$("#DC_AMT3").val("");			
			
		}
	}
}

//구매기준 변경시 이벤트
function purCond_onchange(){
	/*
	 * 다다익선(1)  : 기준금액:입력불가, 구매/할인기준: 수량/정액또는 금액정율
	 * 상품군(2)    : 기준금액:입력가능, 구매/할인기준: 금액/정율
	 * Mix&Match(3) : 기준금액:입력불가, 구매/할인기준: 수량/정액
	 */

	if ($("#EVT_TP").val()  == "1"){
		if ($("#PUR_COND").val() == "1"){
			$("#DC_FLAG").val("2");	
		}else{
			$("#DC_FLAG").val("1");
		}
		
	}else if ($("#EVT_TP").val()  == "2"){
		$("#PUR_COND").val("1");
		$("#DC_FLAG").val("2");
	}else {
		$("#PUR_COND").val("2");
		$("#DC_FLAG").val("1");		
	}
	
	if($("#DC_FLAG").val() == "1"){
		$("#AMT1, #POP_AMT1").html("수량/할인금액1");
		$("#AMT2, #POP_AMT2").html("수량/할인금액2");
		$("#AMT3, #POP_AMT3").html("수량/할인금액3");
	}else{
		$("#AMT1, #POP_AMT1").html("금액/할인율1");
		$("#AMT2, #POP_AMT2").html("금액/할인율2");
		$("#AMT3, #POP_AMT3").html("금액/할인율3");
	}
}

function dcFlag_onchange(){
	/*
	 * 다다익선(1)  : 기준금액:입력불가, 구매/할인기준: 수량/정액또는 금액정율
	 * 상품군(2)    : 기준금액:입력가능, 구매/할인기준: 금액/정율
	 * Mix&Match(3) : 기준금액:입력불가, 구매/할인기준: 수량/정액
	 */	
	
	$("#DC_AMT1, #DC_AMT2, #DC_AMT3").val("");
	
	if ($("#EVT_TP").val()  == "1"){
		if ($("#DC_FLAG").val() == "1"){
			$("#PUR_COND").val("2");	
		}else{
			$("#PUR_COND").val("1");
		}
		
	}else if ($("#EVT_TP").val()  == "2"){
		$("#PUR_COND").val("1");
		$("#DC_FLAG").val("2");
	}else {
		$("#PUR_COND").val("2");
		$("#DC_FLAG").val("1");		
	}
	
	if($("#DC_FLAG").val() == "1"){
		$("#AMT1, #POP_AMT1").html("수량/할인금액1");
		$("#AMT2, #POP_AMT2").html("수량/할인금액2");
		$("#AMT3, #POP_AMT3").html("수량/할인금액3");
	}else{
		$("#AMT1, #POP_AMT1").html("금액/할인율1");
		$("#AMT2, #POP_AMT2").html("금액/할인율2");
		$("#AMT3, #POP_AMT3").html("금액/할인율3");
	}
}

function dateCheck_onChange(id, element){
	
	var evtStrDate = $("#EVT_STR_DT").val().split("-");
	var evtEndDate = $("#EVT_END_DT").val().split("-");
	var ordStrDate = $("#ORD_STR_DT").val().split("-");
	var ordEndDate = $("#ORD_END_DT").val().split("-");
	
	if($("#PMT_CODE").val() != ""){
		if(id == "EVT_STR_DT"){
			if(Number(evtStrDate[0] + evtStrDate[1] + evtStrDate[2]) < Number(yyyy+mm+dd)){
				alert("이미 시작했거나 종료된 프로모션 시작일자는 수정할 수 없습니다.");
				$("#EVT_STR_DT").val(dataRow1.EVT_STR_DT);
				return;
			}
		}else if(id == "EVT_END_DT"){
			if(Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2]) < Number(yyyy+mm+dd)){
				alert(msgEventEndDate);
				$("#EVT_END_DT").val(dataRow1.EVT_END_DT);
				return;
			}
		}else if(id == "ORD_STR_DT"){
			if(Number(ordStrDate[0] + ordStrDate[1] + ordStrDate[2]) > Number(ordEndDate[0] + ordEndDate[1] + ordEndDate[2]) || Number(ordStrDate[0] + ordStrDate[1] + ordStrDate[2]) > Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2])){
				alert("발주시작일은 발주 종료일보다 크거나 행사 종료일보다 클 수 없습니다.");
				$("#ORD_STR_DT").val(dataRow1.ORD_STR_DT);
				return;
			}
		}else{
			if(Number(ordEndDate[0] + ordEndDate[1] + ordEndDate[2]) > Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2])){
				alert("발주종료일은 행사종료일보다 클 수 없습니다.");
				$("#ORD_END_DT").val(dataRow1.ORD_END_DT);
				return;
			}
		}
	}else{
	 	if(id == "ORD_STR_DT"){
			if(Number(ordStrDate[0] + ordStrDate[1] + ordStrDate[2]) > Number(ordEndDate[0] + ordEndDate[1] + ordEndDate[2]) || Number(ordStrDate[0] + ordStrDate[1] + ordStrDate[2]) > Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2])){
				alert("발주시작일은 발주 종료일보다 크거나 행사 종료일보다 클 수 없습니다.");
				return;
			}
		}else{
			if(Number(ordEndDate[0] + ordEndDate[1] + ordEndDate[2]) > Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2])){
				alert("발주종료일은 행사종료일보다 클 수 없습니다.");
				return;
			}
		}
	}
	
}

function promotionMasterValidation(){
	
	var gridXmlData = "";
	var rowCnt      = gridRoot4.getCollection().getSource();
	
	var returnMsg = "0000";
	
	var selectorColumn = gridRoot4.getObjectById("selector4");
	var selectedProduct = selectorColumn.getSelectedIndices();
	
	if(selectedProduct.length < 1){
		alert("적용할 상품을 체크 후 진행하시기 바랍니다.");
		return "9999";
	}

	for(var i=0 ; i < selectedProduct.length ; i++)
	{   
		//gridXmlData = gridXmlData + getXmlString(   gridRoot4.getItemAt(i)   );
		gridXmlData = gridXmlData + "<GRIDROW>";
			gridXmlData = gridXmlData + "<STR_CODE>" + gridRoot4.getItemFieldAt(Number(selectedProduct[i]), "POP2_STR_CODE") + "</STR_CODE>";
			gridXmlData = gridXmlData + "<SCAN_CODE>" + gridRoot4.getItemFieldAt(Number(selectedProduct[i]), "POP2_SCAN_CODE") + "</SCAN_CODE>";
		gridXmlData = gridXmlData + "</GRIDROW>";
	}
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ;

	jQuery.ajax({ 
	    url:"/promotionMasterValidation.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: { 
			    "P_PMT_CODE"	 : $("#PMT_CODE").val()
			,	"P_EVT_STR_DT" : $("#EVT_STR_DT").val().replace(/-/g,"")
			,	"P_EVT_END_DT" : $("#EVT_END_DT").val().replace(/-/g,"")
			,	'GRID_XML_DATA' :  gridXmlData
			}, 
		success:function(data){
			
			if(data.length > 0){
				if(data[0].RETURN_CODE == "1001"){
					returnMsg = data[0].RETURN_MESSAGE;
				}
			}
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    }
	});
	
	return returnMsg;
	
}


function promotionMasterValidationSave(){
	
	var gridXmlData = "";
	var rowCnt      = gridRoot2.getCollection().getSource();
	
	var returnMsg = "0000";
	
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		//gridXmlData = gridXmlData + getXmlString(   gridRoot4.getItemAt(i)   );
		gridXmlData = gridXmlData + "<GRIDROW>";
			gridXmlData = gridXmlData + "<STR_CODE>" + gridRoot2.getItemFieldAt(i, "STR_CODE") + "</STR_CODE>";
			gridXmlData = gridXmlData + "<SCAN_CODE>" + gridRoot2.getItemFieldAt(i, "SCAN_CODE") + "</SCAN_CODE>";
		gridXmlData = gridXmlData + "</GRIDROW>";
	}
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ;

	jQuery.ajax({ 
	    url:"/promotionMasterValidation.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: { 
			    "P_PMT_CODE"	 : $("#PMT_CODE").val()
			,	"P_EVT_STR_DT" : $("#EVT_STR_DT").val().replace(/-/g,"")
			,	"P_EVT_END_DT" : $("#EVT_END_DT").val().replace(/-/g,"")
			,	'GRID_XML_DATA' :  gridXmlData
			}, 
		success:function(data){
			
			if(data.length > 0){
				if(data[0].RETURN_CODE == "1001"){
					returnMsg = data[0].RETURN_MESSAGE;
				}
			}
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    }
	});
	
	return returnMsg;
	
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   					   ###
//########################################################
$(document).ready(function (){
	
	$("#gridHolder2").width("100%");
	$("#gridHolder2").height( $(window).height() - 491 );
	
	$("#pop_wrap1 #pop_cnt .f_l").width(706);
	$("#pop_wrap1 #pop_cnt .f_r").width(210);

	$(window).on('resize',function (){	
		
		$("#gridHolder2").width("100%");
		$("#gridHolder2").height( $(window).height() - 491 );
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

//그리드 로딩바  보이기
function showLoadingBar2() {
    gridRoot2.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar2() {
    gridRoot2.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar3() {
    gridRoot3.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar3() {
    gridRoot3.removeLoadingBar();
}
