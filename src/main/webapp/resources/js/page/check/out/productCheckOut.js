/********************************************************
 * 설명:  점간대출등록
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2017.05.03
 * version : 1.0
 ********************************************************/

var selectedIndex = -1;
var gridRoot2Flag = "add";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();
if(dd < 10) {
    dd = '0' + dd;
} 
if(mm<10) {
    mm = '0' + mm;
}

$(document).ready(function(){
	
	init();
	
	
	if(   $("#SESSION_ROLE_ID").val() == "ROLE009"
		  ||  $("#SESSION_ROLE_ID").val() == "ROLE010"  
		  ||  $("#SESSION_ROLE_ID").val() == "ROLE021"    //call 센터   	
		)  // 바이어(ROLE009)  ,  센터(ROLE010) 로그인시 다보여줌
		{ 
			// CD_STORE 에서 UPTAE_FLAG 가 3인것(물류) 만 가져오기
			// 유맥의 요청으로 바이어는 다 보이게 한다. 그래서 전부다 보이는 함수로 교체 한다.
			/*$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ select +'</option>');*/
			getStoreCode("top_search select[name=P_STR_CODE]");
			
			$('.P_STR_CODE').removeAttr("disabled");
			
//			getStoreCodeFlag("STR_CODE","3");
			
			
		} else {         // 점포 로그인시 해당 점포만 보여줌, 조회조건의 점포코드도 마찬가지
			getStoreCode("top_search select[name=P_STR_CODE]");
			$("#top_search select[name=P_STR_CODE]").val($("#SESSION_STR_CODE").val());
			$('.P_STR_CODE').attr("disabled", "disabled");

		}
	
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var P_DOUT_STR_DT = new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var P_DOUT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#top_search input[name=P_DOUT_STR_DT]').val(P_DOUT_STR_DT);
	$('#top_search input[name=P_DOUT_END_DT]').val(P_DOUT_END_DT);
	
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : "95%",
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	//달력설정
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var startDate = parseInt($("#top_search input[name=P_DOUT_STR_DT]").val().replace(/-/g, ""));
			var endDate = parseInt($("#top_search input[name=P_DOUT_END_DT]").val().replace(/-/g, ""));
			if(startDate > endDate)
			{
				alert(msgDateValidation);
				
				if(this.id == "P_DOUT_STR_DT")
					$("#top_search input[name=P_DOUT_STR_DT]").val(P_DOUT_STR_DT);
				else if(this.id == "P_DOUT_END_DT")
					$("#top_search input[name=P_DOUT_END_DT]").val(P_DOUT_END_DT);
				
				return;
			}
		},showMonthAfterYear:true
	});
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");
rMateGridH5.create("grid2", "gridHolder2", jsVars2+"&dataType=xml", "100%");

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp1.setDataType("xml");
	gridApp1.setLayout(layoutStr);
	gridApp1.setData(gridData1);
	
	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

function itemClickHandler1(event){
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	$("#DIN_STR_CODE").val(dataRow1.DIN_STR_CODE);
	$("#REMARK").val(dataRow1.REMARK);
	
	$("#DIN_STR_CODE").attr("disabled", true);
	
	btnSearchDetail();
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
}

function selectionChangeHandler(event) {
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex; 
	$("#selectedPrintRow").val("");
	$("#P_PRINT_PUR_DT").val("");//레포트용 파라미터
	$("#P_PRINT_STR_CODE").val("");//레포트용 파라미터
	$("#P_PRINT_CORP_CODE").val("");//레포트용 파라미터
	var rows = dataGrid1.getSelectedCells(); 
	for (var i = 0; i < rows.length; i++) {
		if($("#selectedPrintRow").val().indexOf(gridRoot1.getItemFieldAt( rows[i].rowIndex , "SLIP_NO" )) == -1){
			$("#selectedPrintRow").val(   gridRoot1.getItemFieldAt( rows[i].rowIndex , "SLIP_NO" )    +","+    $("#selectedPrintRow").val()    );
			$("#P_PRINT_PUR_DT").val(   gridRoot1.getItemFieldAt( rows[i].rowIndex , "DOUT_DT" )    +","+    $("#P_PRINT_PUR_DT").val()    );
			$("#P_PRINT_STR_CODE").val(   gridRoot1.getItemFieldAt( rows[i].rowIndex , "STR_CODE" )    +","+    $("#P_PRINT_STR_CODE").val()    );
			$("#P_PRINT_CORP_CODE").val(   $("#CORP_CODE").val()   +","+    $("#P_PRINT_CORP_CODE").val()    );
		}  
	}	
}


//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	//다중선택을위한
	dataGrid1.addEventListener("change", selectionChangeHandler);
	//addRow();
}

//GRID2 Event Handler
function gridReadyHandler2(id) {
	// rMateGrid 관련 객체
	gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp2.setLayout(layoutStr2);
	gridApp2.setData(gridData2);
	
	gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
	gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	
	gridRoot2.addEventListener("itemDataChanged", itemDataChangeHandler2);
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 그리드 객체
	dataGrid2 = gridRoot2.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
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
	
	if(dataField == "ITM_NAME"){
		gridRoot2.setItemFieldAt( "" , rowIndex, "DOUT_QTY");
		btn_comm_product_search(newValue);
		
		var value = {};
		value.rowIndex = rowIndex;
		value.columnIndex = 9;
		dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
	}
	
	if(dataField == "DOUT_QTY"){
		
//		if(newValue == "0"){
//			alert("상품의 수량은 0개를 입력할 수 없습니다.");
//			gridRoot2.setItemFieldAt( oldValue , rowIndex, "DOUT_QTY");
//			gridRoot2.setItemFieldAt( oldValue , rowIndex, "DOUT_TOTAL");
//			return;
//		}
		
		var doutSprc = Number(gridRoot2.getItemFieldAt(rowIndex, "DOUT_SPRC"));
		var doutWprcTot = doutSprc * Number(newValue);
		
		gridRoot2.setItemFieldAt( doutWprcTot , rowIndex, "DOUT_TOTAL");
		
	}
	
	if(dataField == "DOUT_SPRC"){
		
		var doutSprc = Number(newValue);
		var WPRC = 0;
		var WVAT = 0;
		
		if(gridRoot2.getItemFieldAt(rowIndex, "TAX_GB") == "1"){
			WPRC = Number(doutSprc)/1.1;
			WVAT = Number(doutSprc) - (Number(doutSprc)/1.1);
		}else{
			WPRC = newValue;
			WVAT = 0;
		}
		
		gridRoot2.setItemFieldAt( WPRC , rowIndex, "DOUT_WPRC");
		gridRoot2.setItemFieldAt( WVAT , rowIndex, "DOUT_WVAT");
		
		if(gridRoot2.getItemFieldAt(rowIndex, "DOUT_QTY") != undefined && gridRoot2.getItemFieldAt(rowIndex, "DOUT_QTY") != undefined && gridRoot2.getItemFieldAt(rowIndex, "DOUT_QTY") != undefined){
			var doutWprcTot = doutSprc * Number(gridRoot2.getItemFieldAt(rowIndex, "DOUT_QTY"));
			gridRoot2.setItemFieldAt( doutWprcTot , rowIndex, "DOUT_TOTAL");
		}
	}
	
}



//그리드1 데이터 초기화
var gridData1 = [];
var gridData2 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1, collection2;
var gridApp2, gridRoot2, dataGrid2,dataRow2,clickData2,selectorColumn2, collection2, rowIndex2;

//----------------------- 그리드 설정 끝 -----------------------

function secondLabelFunc2(item, value, column) {
	if (item.DOUT_CFM_DT != "-" )
		return false;
	else
		return true;
}

//<DataGrid id="dg1" sortableColumns="true" editable="true" itemEditBeginningJsFunction="itemFunc2" selectionMode="multipleRows">\
//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" editable="false" selectionMode="multipleCells">\
		<groupedColumns>\
			<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0" secondLabelJsFunction="secondLabelFunc2" />\
			<DataGridColumn id="DOUT_DT" 				dataField="DOUT_DT"  headerText="대출일자" textAlign="center" editable="false" width="100" />\
			<DataGridColumn id="SLIP_NO" 				dataField="SLIP_NO"  headerText="전표번호" textAlign="center" editable="false" width="120" />\
			<DataGridColumn id="STR_CODE"				dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
			<DataGridColumn id="STR_NAME"				dataField="STR_NAME"  headerText="대출점" textAlign="center" width="80" />\
			<DataGridColumn id="DIN_STR_CODE"		dataField="DIN_STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
			<DataGridColumn id="DIN_STR_NAME"		dataField="DIN_STR_NAME"  headerText="대입점" textAlign="center" width="80" />\
			<DataGridColumn id="DOUT_CFM_DT"		dataField="DOUT_CFM_DT"  headerText="대출확정일자" textAlign="center" width="100" />\
			<DataGridColumn id="IEMP_NAME" 			dataField="IEMP_NAME"  			headerText="대출확정자" textAlign="center" editable="false" width="80"/>\
			<DataGridColumn id="DIN_CFM_DT"			dataField="DIN_CFM_DT"  headerText="대입확정일자" textAlign="center" width="100" />\
			<DataGridColumn id="UEMP_NAME" 			dataField="UEMP_NAME"  			headerText="대입확정자" textAlign="center" editable="false" width="80"/>\
			<DataGridColumn id="DOUT_TOTAL"			dataField="DOUT_TOTAL"  headerText="대출합계" editable="false" textAlign="right" formatter="{numfmt}" width="200" />\
			<DataGridColumn id="REMARK"					dataField="REMARK"  headerText="' + remark + '" textAlign="left" maxChars="250" />\
		</groupedColumns>\
	</DataGrid>\
</rMateGrid>';


function itemFunc(rowIndex, columnIndex, item, dataField){
	if(gridRoot2.getItemFieldAt(rowIndex, "ITM_GB") != "1" && columnIndex == 14 ){
		return false;
	}
	return true;  //return 값이 true면 editable이 가능하고. false면 editable이 불가능합니다.
}

var layoutStr2 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<NumberFormatter id="onlynum" useThousandsSeparator="false"/>\
	<PercentFormatter id="percfmt" useThousandsSeparator="true"/>\
	<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>\
	<DataGrid id="dg2" editable="true" horizontalScrollPolicy="auto" showDeletedRows="true" itemEditBeginningJsFunction="itemFunc" selectionMode="multipleCells">\
		<columns>\
	 		<DataGridRowStateColumn id="rowState" 	dataField=" " textAlign="center" visible="true"/>\
			<DataGridColumn id="INPUT_YN"				dataField="INPUT_YN"  headerText="INPUT_YN" textAlign="center" visible="false" />\
			<DataGridColumn id="SEQ"						dataField="SEQ"  headerText="' + rowNumber + '" textAlign="center" width="55" editable="false"  backgroundColor="#EFEFEF" />\
			<DataGridColumn id="SCAN_CODE"			dataField="SCAN_CODE" headerText="' + scanCode + '"  textAlign="center" editable="false"  backgroundColor="#EFEFEF" width="120"  />\
			<DataGridColumn id="STR_CODE"				dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
			<DataGridColumn id="ITM_NAME"				dataField="ITM_NAME"  headerText="' + itmName + '"  textAlign="left" editable="true"  width="250" editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem"  />\
			<DataGridColumn id="DP_PRC_UNIT"			dataField="DP_PRC_UNIT"  headerText="' + unit + '" textAlign="center" width="80" maxChars="10" editable="false"  backgroundColor="#EFEFEF" />\
			<DataGridColumn id="UNIT"						dataField="UNIT"  headerText="' + standard + '" textAlign="center" width="80" maxChars="10" editable="false"  backgroundColor="#EFEFEF" />\
			<DataGridColumn id="TAX_GB"					dataField="TAX_GB"  headerText="' + taxGb + '" textAlign="center" width="80" maxChars="10" editable="false"  backgroundColor="#EFEFEF" />\
			<DataGridColumn id="DOUT_QTY"			dataField="DOUT_QTY"  headerText="' + orderQuantity + '" formatter="{numfmt}" textAlign="right" width="80" editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem" />\
			<DataGridColumn id="DOUT_CFM_QTY"		dataField="DOUT_CFM_QTY"  headerText="대출확정수량" formatter="{numfmt}" textAlign="right" width="80"  editable="false"  backgroundColor="#EFEFEF"  />\
			<DataGridColumn id="DIN_CFM_QTY"		dataField="DIN_CFM_QTY"  headerText="대입확정수량" formatter="{numfmt}" textAlign="right" width="80"  editable="false"  backgroundColor="#EFEFEF" />\
			<DataGridColumn id="DOUT_WPRC"			dataField="DOUT_WPRC"  headerText="대출원가" textAlign="right" formatter="{numfmt}" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="DOUT_WVAT"			dataField="DOUT_WVAT"  headerText="부가세" textAlign="right" formatter="{numfmt}" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="DOUT_SPRC"			dataField="DOUT_SPRC"  headerText="대출단가" textAlign="right" formatter="{numfmt}" editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem"  />\
			<DataGridColumn id="DOUT_TOTAL"			dataField="DOUT_TOTAL"  headerText="대출금액" editable="false" textAlign="right" formatter="{numfmt}" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="ITM_CODE"				dataField="ITM_CODE"  headerText="ITM_CODE" textAlign="center" visible="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="BOT_SPRC"				dataField="BOT_SPRC"  headerText="ITM_CODE" textAlign="center" visible="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="ITM_GB"					dataField="ITM_GB"  headerText="ITM_GB" textAlign="center" visible="false" />\
		</columns>\
		<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DOUT_QTY}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DOUT_CFM_QTY}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DIN_CFM_QTY}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DOUT_WPRC}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DOUT_WVAT}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DOUT_SPRC}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DOUT_TOTAL}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
			</DataGridFooter>\
		</footers>\
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
	/*$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ select +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
	$("#top_search select[name=P_STR_CODE]").val($("#SESSION_STR_CODE").val());*/
	
	
	
	
	
	$("#top_search select[name=P_DIN_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_DIN_STR_CODE]");
	
	$("#DIN_STR_CODE").append('<option value="">'+ select +'</option>');
	getStoreCode("DIN_STR_CODE");
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )					   ###
//########################################################
/*
function btn_comm_product_search(newValue){
	$("#P_TEXT6").val(newValue);
	$("#top_search15 input[name=STORE_NAME]").val($("#P_STR_CODE option:selected").text());
	
	if($("#P_STR_CODE option:selected").val() != ""){
		$("#top_search15 input[name=P_STR_CODE]").val($("#P_STR_CODE option:selected").val());
	}else{
		$("#top_search15 input[name=P_STR_CODE]").val("");
	}
	
	btn_comm_search('6');
	$('#comm_pop_wrap6' ).dialog( 'open' );
	gridApp15.resize();
	
	// callback함수명을 P_CALLBACK_NM8에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM6").val('fn_comm_order_product_callback(dataRow15)');
}
*/

//★운영엔 이 함수로 적용. 기존 CD_PRODUCT_STORE 에서 단가를 가져온거를 IV_DT_ITEM_COLL의 PUR_AVR_AMT로 변경. 
function btn_comm_product_search(newValue){
	$("#P_TEXT6_1").val(newValue);
	$("#top_search15_1 input[name=STORE_NAME]").val($("#P_STR_CODE option:selected").text());
	if($("#P_STR_CODE option:selected").val() != ""){
		$("#top_search15_1 input[name=P_STR_CODE]").val($("#P_STR_CODE option:selected").val());
	}else{
		$("#top_search15 input[name=P_STR_CODE]").val("");
	}
	
	btn_comm_search('6_1');
	$('#comm_pop_wrap6_1' ).dialog( 'open' ); 
	gridApp15_1.resize();
	
	// callback함수명을 P_CALLBACK_NM8에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM6_1").val('fn_comm_order_product_callback(dataRow15_1)');
}

function fn_comm_order_product_callback(dataRow){
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	
	
	for(var i=0 ; i < rowCnt2.length ; i++){
		if(dataRow.ITM_CODE == gridRoot2.getItemFieldAt(i, "ITM_CODE")){
			alert(duplicateProduct);
			return;
		}
	}
	
	var selectedIndex = dataGrid2.getSelectedIndex();
	
	if(dataRow != null && dataRow != "" || dataRow != undefined){
		
		if(selectedIndex != -1){
			
			var INPUT_YN = gridRoot2.getItemFieldAt(selectedIndex, "ITM_CODE");
			
			if(INPUT_YN == "N" || INPUT_YN == "U"){
				gridRoot2.setItemFieldAt( 'U' , selectedIndex, "INPUT_YN");
			}else{
				gridRoot2.setItemFieldAt( 'I' , selectedIndex, "INPUT_YN");
			}
			
			gridRoot2.setItemFieldAt( dataRow.SCAN_CODE , selectedIndex, "SCAN_CODE");
			gridRoot2.setItemFieldAt( dataRow.ITM_NAME , selectedIndex, "ITM_NAME");
			gridRoot2.setItemFieldAt( dataRow.DP_PRC_UNIT , selectedIndex, "DP_PRC_UNIT");
			gridRoot2.setItemFieldAt( dataRow.UNIT , selectedIndex, "UNIT");
			gridRoot2.setItemFieldAt( dataRow.TAX_GB , selectedIndex, "TAX_GB");
			
			var WPRC = 0;
			var WVAT = 0;
			
			if(dataRow.ITM_GB == "1"){
				if(dataRow.TAX_GB == "1"){
					WPRC = Number(dataRow.PUR_AVR_AMT)/1.1;
					WVAT = Number(dataRow.PUR_AVR_AMT) - (Number(dataRow.PUR_AVR_AMT)/1.1);
				}else{
					WPRC = dataRow.WPRC;
					WVAT = 0;
				}
			}else{
				WPRC = dataRow.WPRC;
				WVAT = dataRow.WVAT;
			}
			
			gridRoot2.setItemFieldAt( WPRC.toFixed(1) , selectedIndex, "DOUT_WPRC");
			gridRoot2.setItemFieldAt( WVAT.toFixed(1) , selectedIndex, "DOUT_WVAT");
			gridRoot2.setItemFieldAt( Number(dataRow.WPRC) + Number(dataRow.WVAT) , selectedIndex, "DOUT_SPRC");
			gridRoot2.setItemFieldAt( dataRow.ITM_CODE , selectedIndex, "ITM_CODE");
			gridRoot2.setItemFieldAt( dataRow.BOT_SPRC , selectedIndex, "BOT_SPRC");
			gridRoot2.setItemFieldAt( dataRow.ITM_GB , selectedIndex, "ITM_GB");
			
			var value = {};
			value.rowIndex = dataGrid2._selectedIndex;
			value.columnIndex = 9;
			dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
		}
	}
}

//행추가
function addRow(){
	var rowCnt 		= gridRoot2.getCollection().getSource();
	var maxNextSEQ 	= 0;
	var firstTag	= "<GRIDROW></GRIDROW>";
	
	if (window.DOMParser) {
		parser = new DOMParser();
        xmlDoc = parser.parseFromString(firstTag,"text/xml");
    // 인터넷 익스플로러
	} else {   
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	    xmlDoc.async = false;
        xmlDoc.loadXML(firstTag); 
    }
	
	//현재 로우중 가장 큰 SEQ값을 찾아온다.
	for(var i = 0; i <= rowCnt.length - 1; i++) {
		currentRowSEQ = gridRoot2.getItemFieldAt(i, "SEQ");
		
		if(parseInt(maxNextSEQ) < parseInt(currentRowSEQ)) {
			maxNextSEQ = currentRowSEQ;
		}
	}
	maxNextSEQ = parseInt(maxNextSEQ) + 1;
	
	var INPUT_YN 		= xmlDoc.createElement("INPUT_YN");
	var SEQ 			= xmlDoc.createElement("SEQ");
	var SCAN_CODE 		= xmlDoc.createElement("SCAN_CODE");
	var STR_CODE 		= xmlDoc.createElement("STR_CODE");
	var ITM_NAME 		= xmlDoc.createElement("ITM_NAME");
	var DP_PRC_UNIT 	= xmlDoc.createElement("DP_PRC_UNIT");
	var UNIT 			= xmlDoc.createElement("UNIT");
	var TAX_GB 			= xmlDoc.createElement("TAX_GB");
	var DOUT_QTY 		= xmlDoc.createElement("DOUT_QTY");
	var DOUT_CFM_QTY 	= xmlDoc.createElement("DOUT_CFM_QTY");
	var DIN_CFM_QTY 	= xmlDoc.createElement("DIN_CFM_QTY");
	var DOUT_WPRC 		= xmlDoc.createElement("DOUT_WPRC");
	var DOUT_WVAT 		= xmlDoc.createElement("DOUT_WVAT");
	var DOUT_SPRC 		= xmlDoc.createElement("DOUT_SPRC");
	var DOUT_TOTAL 		= xmlDoc.createElement("DOUT_TOTAL");
	var ITM_CODE 		= xmlDoc.createElement("ITM_CODE");
	var BOT_SPRC 		= xmlDoc.createElement("BOT_SPRC");
	var ITM_GB 			= xmlDoc.createElement("ITM_GB");
	
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	SEQ.appendChild(xmlDoc.createTextNode( maxNextSEQ ));
	SCAN_CODE.appendChild(xmlDoc.createTextNode( '' ));
	STR_CODE.appendChild(xmlDoc.createTextNode( $("#DIN_STR_CODE").val() ));
	ITM_NAME.appendChild(xmlDoc.createTextNode( '' ));
	DP_PRC_UNIT.appendChild(xmlDoc.createTextNode( '' ));
	UNIT.appendChild(xmlDoc.createTextNode( '' ));
	TAX_GB.appendChild(xmlDoc.createTextNode( '' ));
	DOUT_QTY.appendChild(xmlDoc.createTextNode( '' ));
	DOUT_CFM_QTY.appendChild(xmlDoc.createTextNode( '' ));
	DIN_CFM_QTY.appendChild(xmlDoc.createTextNode( '' ));
	DOUT_WPRC.appendChild(xmlDoc.createTextNode( '' ));
	DOUT_WVAT.appendChild(xmlDoc.createTextNode( '' ));
	DOUT_SPRC.appendChild(xmlDoc.createTextNode( '' ));
	DOUT_TOTAL.appendChild(xmlDoc.createTextNode( '' ));
	ITM_CODE.appendChild(xmlDoc.createTextNode( '' ));
	BOT_SPRC.appendChild(xmlDoc.createTextNode( '' ));
	ITM_GB.appendChild(xmlDoc.createTextNode( '0' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DP_PRC_UNIT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_QTY);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_CFM_QTY);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DIN_CFM_QTY);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_WPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_WVAT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_SPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_TOTAL);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_SPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_GB);
	
	gridRoot2.addItemAt(  xmlDoc  , -1, false);
}


function deleteRow(){
	var rowIndex2 = dataGrid2.getSelectedIndex();
	if (rowIndex2 >= 0){
		gridRoot2.removeItemAt(rowIndex2);
		if(gridRoot2.getItemFieldAt(rowIndex2, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "D" , rowIndex2, "INPUT_YN");
		}
	}
}

var myVar = "";
function btnSaveCheck() {
    myVar = setTimeout(btnSave, 500);
}

//주문내용저장
function btnSave(){
	
	if(dataRow1 != undefined && dataRow1 != null && dataRow1 != ""){
		if(dataRow1.DOUT_CFM_DT != "-"){
			alert("확정상태의 대출 항목은 수정이 불가능합니다.");
			return;
		}
		
		var getToday = new CommDateManager().getDate("yyyy-mm-dd");
		if(dataRow1.DOUT_DT != getToday){
			alert("수정은 당일 등록한 대출건에 대해서만 가능합니다.");
			return;
		}
	}
	
	if($("#DIN_STR_CODE").val() == ""){
		alert("대입 점포명은 필수 입력항목 입니다.");
		return;
	}
	
	if($("#P_STR_CODE").val() == $("#DIN_STR_CODE").val()){
		alert("대출 점포와 대입 점포가 동일할 수 없습니다.");
		return;
	}
	
	var gridXmlData = "";
	
	var rowCnt = gridRoot2.getCollection().getSource();
	
	var updateRowCnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "DOUT_QTY") == "" ||  gridRoot2.getItemFieldAt(i, "DOUT_QTY") == undefined ||
				gridRoot2.getItemFieldAt(i, "ITM_CODE") == "" || gridRoot2.getItemFieldAt(i, "ITM_CODE") == "0" || gridRoot2.getItemFieldAt(i, "ITM_CODE") == undefined){
			//주문내용이 공백이거나 수량이 0인 상품이 존재합니다.
			alert("주문내용이 공백인 상품이 존재합니다.\n숫자를 입력하세요");
			return;
		}

		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData = gridXmlData + getXmlString(   gridRoot2.getItemAt(i)   );
			updateRowCnt++;
		}
	}
	
	/*if(updateRowCnt == 0){
		alert(noneChangeData);
		return;
	}*/
	
	var SLIP_NO = "";
	
	if(dataRow1 != null && dataRow1 != undefined){
		SLIP_NO = dataRow1.SLIP_NO;
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData = "<GRIDLIST>" + gridXmlData + "</GRIDLIST>";
	
	jQuery.ajax({ 
	    url:"/registProductCheckOut.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'P_SLIP_NO' : SLIP_NO
				,	'P_STR_CODE' : $("#P_STR_CODE").val()
				,	'P_DIN_STR_CODE' : $("#DIN_STR_CODE").val()
				,	'P_REMARK' : $("#REMARK").val()
				,	'GRID_XML_DATA' : gridXmlData
		        }, 
		success:function(data){   
			gridRoot2.removeAll();
			
			$("#DIN_STR_CODE").val("");
			$("#REMARK").val("");
			
			$("#DIN_STR_CODE").attr("disabled", false);
			
			btnSearch();
			alert(msgSave);
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

function btnDetermine(){
	
	var selectorColumn = gridRoot1.getObjectById("selector");
	var selectedCheck = selectorColumn.getSelectedIndices();
	
	if(selectedCheck.length < 1){
		alert("확정대상 전표번호를 선택 하십시오.");
		return;
	}
	
	var gridXmlData = "";
	
	for(var i=0 ; i < selectedCheck.length ; i++){
		//gridRoot1.getItemFieldAt(Number(selectedStrore[i]), "STR_CODE")
		gridXmlData = gridXmlData + "<GRIDROW>";
			gridXmlData = gridXmlData + "<STR_CODE>" + gridRoot1.getItemFieldAt(Number(selectedCheck[i]), "STR_CODE") + "</STR_CODE>";
			gridXmlData = gridXmlData + "<SLIP_NO>" + gridRoot1.getItemFieldAt(Number(selectedCheck[i]), "SLIP_NO") + "</SLIP_NO>";
			gridXmlData = gridXmlData + "<DOUT_DT>" + gridRoot1.getItemFieldAt(Number(selectedCheck[i]), "DOUT_DT") + "</DOUT_DT>";
		gridXmlData = gridXmlData + "</GRIDROW>";
	}
	
	if(confirm("선택한 항목들을 확정하겠습니까?") == false) return;
	
	gridXmlData = "<GRIDLIST>" + gridXmlData + "</GRIDLIST>";
	
	jQuery.ajax({ 
	    url:"/determineProductCheckOut.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'GRID_XML_DATA' : gridXmlData
		        }, 
		success:function(data){   
			gridRoot2.removeAll();
			btnSearch();
			alert(msgSave);
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

function btnSearch(){
	var loadData 		= $("#top_search").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_DOUT_STR_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_DOUT_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	

	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_DOUT_STR_DT").focus();
		return;
	}

	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	loadData.P_DOUT_STR_DT = loadData.P_DOUT_STR_DT.replace(/-/gi, "");
	loadData.P_DOUT_END_DT = loadData.P_DOUT_END_DT.replace(/-/gi, "");
	
	gridRoot1.removeAll();
	gridRoot2.removeAll();
	
	//로딩바 출력
	showLoadingBar1();
	
	jQuery.ajax({ 
	    url:"/selectProductCheckOut.do",         
	    type:"POST",
		datatype:"json",
		data: loadData, 
		success:function(data){   
			//gridApp1.setData(data);
			if(data.length > 0){
				gridApp1.setData(data);
			}
			
	    },
	    complete : function(data) {
	    	 //로딩바 숨기기
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	 //로딩바 숨기기
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btnSearchDetail(){

	gridRoot2.removeAll();
	
	//로딩바 출력
	showLoadingBar2();
	
	jQuery.ajax({ 
	    url:"/selectProductCheckOutDtl.do",         
	    type:"POST",
		datatype:"json",
		data: {
				'P_STR_CODE'	: dataRow1.STR_CODE
			  , 'P_SLIP_NO' 	: dataRow1.SLIP_NO
			  , 'P_DOUT_DT'		: dataRow1.DOUT_DT
		      }, 
		success:function(data){   
			
			if(data.length > 0){
				
				for(var i=0 ; i < data.length ; i++){
					
					var rowCnt2 = gridRoot2.getCollection().getSource();
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
					var SEQ 			= xmlDoc.createElement("SEQ");
					var SCAN_CODE 		= xmlDoc.createElement("SCAN_CODE");
					var STR_CODE 		= xmlDoc.createElement("STR_CODE");
					var ITM_NAME 		= xmlDoc.createElement("ITM_NAME");
					var DP_PRC_UNIT 	= xmlDoc.createElement("DP_PRC_UNIT");
					var UNIT 			= xmlDoc.createElement("UNIT");
					var TAX_GB 			= xmlDoc.createElement("TAX_GB");
					var DOUT_QTY 		= xmlDoc.createElement("DOUT_QTY");
					var DOUT_CFM_QTY 	= xmlDoc.createElement("DOUT_CFM_QTY");
					var DIN_CFM_QTY 	= xmlDoc.createElement("DIN_CFM_QTY");
					var DOUT_WPRC 		= xmlDoc.createElement("DOUT_WPRC");
					var DOUT_WVAT 		= xmlDoc.createElement("DOUT_WVAT");
					var DOUT_SPRC 		= xmlDoc.createElement("DOUT_SPRC");
					var DOUT_TOTAL 		= xmlDoc.createElement("DOUT_TOTAL");
					var ITM_CODE 		= xmlDoc.createElement("ITM_CODE");
					var BOT_SPRC 		= xmlDoc.createElement("BOT_SPRC");
					var ITM_GB 			= xmlDoc.createElement("ITM_GB");
					
					INPUT_YN.appendChild(xmlDoc.createTextNode( data[i].INPUT_YN ));
					//SEQ.appendChild(xmlDoc.createTextNode( rowCnt2.length+1 ));
					SEQ.appendChild(xmlDoc.createTextNode( data[i].SEQ ));
					SCAN_CODE.appendChild(xmlDoc.createTextNode( data[i].SCAN_CODE ));
					STR_CODE.appendChild(xmlDoc.createTextNode( data[i].STR_CODE ));
					ITM_NAME.appendChild(xmlDoc.createTextNode( data[i].ITM_NAME ));
					DP_PRC_UNIT.appendChild(xmlDoc.createTextNode( data[i].DP_PRC_UNIT ));
					UNIT.appendChild(xmlDoc.createTextNode( data[i].UNIT ));
					TAX_GB.appendChild(xmlDoc.createTextNode( data[i].TAX_GB ));
					DOUT_QTY.appendChild(xmlDoc.createTextNode( data[i].DOUT_QTY ));
					DOUT_CFM_QTY.appendChild(xmlDoc.createTextNode( data[i].DOUT_CFM_QTY ));
					DIN_CFM_QTY.appendChild(xmlDoc.createTextNode( data[i].DIN_CFM_QTY ));
					DOUT_WPRC.appendChild(xmlDoc.createTextNode( data[i].DOUT_WPRC ));
					DOUT_WVAT.appendChild(xmlDoc.createTextNode( data[i].DOUT_WVAT ));
					DOUT_SPRC.appendChild(xmlDoc.createTextNode( data[i].DOUT_SPRC ));
					DOUT_TOTAL.appendChild(xmlDoc.createTextNode( Number(data[i].DOUT_SPRC) * Number(data[i].DOUT_QTY) ));
					ITM_CODE.appendChild(xmlDoc.createTextNode( data[i].ITM_CODE ));
					BOT_SPRC.appendChild(xmlDoc.createTextNode( data[i].BOT_SPRC ));
					ITM_GB.appendChild(xmlDoc.createTextNode( data[i].ITM_GB ));
					
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DP_PRC_UNIT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_QTY);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_CFM_QTY);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DIN_CFM_QTY);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_WPRC);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_WVAT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_SPRC);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DOUT_TOTAL);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_SPRC);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_GB);
					
					gridRoot2.addItemAt(  xmlDoc  , -1, false);
					
					//i (index) 입력하여 그리드 아이템 가져오기
					var selectedItem = gridRoot2.getItemAt(i);
					
					//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
					gridRoot2.removeChangedData(selectedItem);
				}
				
				dataGrid2.invalidateList();
			}
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

function btnNew(){
	dataGrid1.setSelectedIndex(-1);
	dataRow1 = "";
	
	gridRoot2.removeAll();
	
	$("#DIN_STR_CODE").val("");
	$("#REMARK").val("");
	
	$("#DIN_STR_CODE").attr("disabled", false);
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
/*$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-162);
	$(".ui-dialog-titlebar").text("콜센터접수관리 팝업");
	
	$(window).on('resize',function  () {
		$("#gridHolder1").height($(window).height()-104);
	})
});*/
function btn_popup() {
	$( '#pop_wrap1' ).dialog( 'open' );	
	gridApp2.resize();
}

function btn_close() {
	$("#pop_wrap1").dialog("close");
}

//출력
function btn_print(){
	
	if(   $("#selectedPrintRow").val() == "" )
	{ 	alert('출력할 대출 전표를 선택 하세요.');
		return;
	}
	var P_CORP_CODE =$("#P_PRINT_CORP_CODE").val().substring(  0,
								 $("#P_PRINT_CORP_CODE").val().length - 1);
	var P_STR_CODE =$("#P_PRINT_STR_CODE").val().substring(  0,
								$("#P_PRINT_STR_CODE").val().length - 1);
	var P_PUR_DT =$("#P_PRINT_PUR_DT").val().substring(  0,
							$("#P_PRINT_PUR_DT").val().length - 1).replace(/-/gi,"");
	var P_SLIP_NO =$("#selectedPrintRow").val().substring(  0,
							$("#selectedPrintRow").val().length - 1);
	var params = "?reportMode=HTML"	+
						"&P_CORP_CODE="		+P_CORP_CODE+
						"&P_STR_CODE="		+P_STR_CODE+
						"&P_PUR_DT="			+P_PUR_DT+
						"&P_SLIP_NO="			+P_SLIP_NO; // AIViewer 파라미터
	window.open("/aireportProductCheckOutInPrint.do"+ params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
}



/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height(250);
	$("#gridHolder2").height($(window).height()-388);
	
	$(window).on('resize',function (){	
		$("#gridHolder1").height(250);
		$("#gridHolder2").height($(window).height()-388);
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