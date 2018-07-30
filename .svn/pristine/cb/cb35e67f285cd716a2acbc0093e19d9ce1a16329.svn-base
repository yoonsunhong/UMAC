/********************************************************
 * 설명:  외상매출관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2017.02.12
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
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var SALE_STR_DT =new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var SALE_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#top_search input[name=P_SALE_STR_DT]').val(SALE_STR_DT);
	$('#top_search input[name=P_SALE_END_DT]').val(SALE_END_DT);
	
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
	$(".datepicker").datepicker();
	
	// 점포명 체인지 이벤트
	$("#top_search select[name=P_STR_CODE]").change(function(){
		getPosList();
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
rMateGridH5.create("grid2", "gridHolder2", jsVars2, "100%");

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
	
	gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);
}

function itemClickHandler1(event){
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	if(dataRow1.USE_YN == "Y"){
		gridRoot2Flag = "search";
		gridRoot2.removeAll();
		
		//로딩바 출력
		showLoadingBar2();
		
		jQuery.ajax({ 
		    url:"/selectBusinessGiftGrantItem.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {
						'P_GIFT_CODE' : dataRow1.GIFT_CODE
					,	'P_STR_CODE' : dataRow1.STR_CODE
					,	'P_TRXN_NO' : dataRow1.TRXN_NO
					,	'P_SALE_DT' : dataRow1.SALE_DT
					,	'P_POS_NO' : dataRow1.POS_NO
			        }, 
			success:function(data){   
				//gridApp1.setData(data);
				
				if(data.length > 0){
					
					gridApp2.setData(data);
					
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
	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	//addRow();
}

function itemDataChangeHandler1(event) {
	 
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot2.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;	
	
	if(dataField == "GIFT_CODE"){
		var value = {};
		value.rowIndex = rowIndex;
		value.columnIndex = 2;
		dataGrid1.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
	}
	
	if(dataField == "TRXN_NO"){
		if(newValue.length == 23){
			btnSearchTrxnNo(newValue, rowIndex);
		}
	}
	
	if(dataField == "GIFT_CODE"){
		if(newValue.length == 8){
			btnSearchItem(newValue, rowIndex);
		}
	}
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

function itemDataChangeHandler2(event) {
	 
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot2.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	
}



//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 그리드 객체
	dataGrid2 = gridRoot2.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
	var USE_YN = gridRoot2.getObjectById("USE_YN");	
	var dataProvider = [];
	
	var defaultValue = {'label':select, 'code':''};
	dataProvider.push(defaultValue);
	
	var postValue ={};	
	postValue = { "CD_CL"	: "USE_YN" };
	
	// 공통코드를 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getCommonCodeSelectBoxList.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				var providerValue = {'label':data[i].CD_NM, 'code':data[i].CD_ID};
				dataProvider.push(providerValue);
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	USE_YN.setItemRendererDataProvider(dataProvider);
	
}





//그리드1 데이터 초기화
var gridData1 = [];
var gridData2 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1, collection2;
var gridApp2, gridRoot2, dataGrid2,dataRow2,clickData2,selectorColumn2, collection2, rowIndex2;

//----------------------- 그리드 설정 끝 -----------------------

function itemFunc2(rowIndex, columnIndex, item, dataField){
	if(gridRoot1.getItemFieldAt(rowIndex, "USE_YN") == "Y" && (columnIndex == 1 || columnIndex == 2)){
		return false;
	}
	return true;  //return 값이 true면 editable이 가능하고. false면 editable이 불가능합니다.
}

function secondLabelFunc2(item, value, column) {
	if (item.USE_YN == "Y" )
		return false;
	else
		return true;
}

//<DataGrid id="dg1" sortableColumns="true" editable="true" itemEditBeginningJsFunction="itemFunc2" selectionMode="multipleRows">\
//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" editable="true" selectionMode="multipleRows" itemEditBeginningJsFunction="itemFunc2">\
		<groupedColumns>\
			<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0" secondLabelJsFunction="secondLabelFunc2" />\
			<DataGridColumn id="GIFT_CODE" 	dataField="GIFT_CODE"  headerText="' + eventCode + '" textAlign="center" width="300" maxChars="23" editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem" />\
			<DataGridColumn id="TRXN_NO" 		dataField="TRXN_NO"  headerText="' + trxnNo + '" textAlign="center" width="300" maxChars="23" editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem" />\
			<DataGridColumn id="STR_CODE" 	dataField="STR_CODE"  headerText="STR_CODE" textAlign="center" visible="false" editable="false" />\
			<DataGridColumn id="STR_NAME" 	dataField="STR_NAME"  headerText="' + storNm + '" textAlign="center" width="150" editable="false" />\
			<DataGridColumn id="SALE_DT" 		dataField="SALE_DT"  headerText="SALE_DT" textAlign="center" visible="false" editable="false" />\
			<DataGridColumn id="POS_NO" 		dataField="POS_NO"  headerText="POS" textAlign="center" editable="false" />\
			<DataGridColumn id="CUST_NO" 		dataField="CUST_NO"  headerText="' + cusNo + '" textAlign="center" editable="false" />\
			<DataGridColumn id="PAY_AMT" 		dataField="PAY_AMT"  headerText="' + selngAmount + '" textAlign="right" formatter="{numfmt}" width="200" editable="false" />\
			<DataGridColumn id="USE_YN" 		dataField="USE_YN"  headerText="' + useYn + '" textAlign="center" width="100" editable="false"/>\
			<DataGridColumn id="GIFT_CMP_FLAG" 	dataField="GIFT_CMP_FLAG"  headerText="GIFT_CMP_FLAG" textAlign="center" visible="false" editable="false" />\
		</groupedColumns>\
		<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{PAY_AMT}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
			</DataGridFooter>\
		</footers>\
	</DataGrid>\
</rMateGrid>';


function itemFunc(rowIndex, columnIndex, item, dataField){
	if(gridRoot2.getItemFieldAt(rowIndex, "USE_YN") != "Y" && columnIndex == 6 && dataRow1.USE_YN == "Y"){
		return false;
	}
	return true;  //return 값이 true면 editable이 가능하고. false면 editable이 불가능합니다.
}

function secondLabelFunc(item, value, column) {
	if(gridRoot2Flag == "search"){
		if (item.USE_YN == "Y" && dataRow1.USE_YN != "Y" ){
			return true;
		}
		else{
			return false;
		}
	}else{
		if (item.USE_YN == "Y"){
			return true;
		}
		else{
			return false;
		}
		
	}
}

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<PercentFormatter id="percfmt" useThousandsSeparator="true"/>\
		<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>\
		<DataGrid id="dg2" editable="true" horizontalScrollPolicy="auto" showDeletedRows="true" itemEditBeginningJsFunction="itemFunc">\
			<groupedColumns>\
				<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0" secondLabelJsFunction="secondLabelFunc"/>\
				<DataGridColumn id="GIFT_ITM_CODE"				dataField="GIFT_ITM_CODE"  headerText="GIFT_ITM_CODE" textAlign="center" visible="false" />\
				<DataGridColumn id="GIFT_ITM_NM"					dataField="GIFT_ITM_NM"  headerText="' + giftItmNm + '" textAlign="left" editable="false" />\
				<DataGridColumn id="USE_YN"							dataField="USE_YN"  headerText="' + useYn + '" width="120" textAlign="center"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" editable="false" />\
				<DataGridColumnGroup headerText="지급기준(매출금액/원)">\
					<DataGridColumn id="BASE_MIN_AMT"				dataField="BASE_MIN_AMT"  headerText="' + giftBaseMinAmt + '" textAlign="right" formatter="{numfmt}" editable="false" />\
					<DataGridColumn id="BASE_MAX_AMT"				dataField="BASE_MAX_AMT"  headerText="' + giftBaseMaxAmt + '" textAlign="right" formatter="{numfmt}" editable="false" />\
				</DataGridColumnGroup>\
				<DataGridColumn id="PAY_QTY"						dataField="PAY_QTY"  headerText="' + qY + '" textAlign="right" editable="true" width="150" />\
			</groupedColumns>\
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
	$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

//행사검색팝업
function btn_comm_gift_search(){
	$('#comm_pop_wrap18' ).dialog( 'open' );
	gridApp27.resize();
	
	// callback함수명을 P_CALLBACK_NM18에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM18").val('fn_comm_gift_callback(dataRow27)');
}

function fn_comm_gift_callback(dataRow){
	//alert(dataRow);
	$("#P_GIFT_CODE").val(dataRow.GIFT_CODE);
	$("#P_GIFT_NAME").val(dataRow.GIFT_NAME);
}

//JSON 행추가
function addRow(){
	gridRoot2Flag = "add";
	gridRoot2.removeAll();
	
	var addItem = {};
	gridRoot1.addItemAt(addItem, 0);
}

//JSON 행 제거
function deleteRow(){
	var selectorColumn1 = gridRoot1.getObjectById("selector");
	var selectedTrxn = selectorColumn1.getSelectedIndices();
	
	if(selectedTrxn.length == 0){
		//삭제할 행을 선택하세요
		alert(msgDeleteRowSel);
		return;
	}
	
	gridRoot1.removeSelectorColumnSelectedIndices("selector");
}

//행추가
function addRow_XML(){
	
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
	
	var TRXN_NO = xmlDoc.createElement("TRXN_NO");
	var STR_CODE = xmlDoc.createElement("STR_CODE");
	var STR_NAME = xmlDoc.createElement("STR_NAME");
	var SALE_DT = xmlDoc.createElement("SALE_DT");
	var POS_NO = xmlDoc.createElement("POS_NO");
	var CUST_NO = xmlDoc.createElement("CUST_NO");
	var PAY_AMT = xmlDoc.createElement("PAY_AMT");
	var USE_YN = xmlDoc.createElement("USE_YN");
	
	TRXN_NO.appendChild(xmlDoc.createTextNode( '' ));
	STR_CODE.appendChild(xmlDoc.createTextNode( '' ));
	STR_NAME.appendChild(xmlDoc.createTextNode( '' ));
	SALE_DT.appendChild(xmlDoc.createTextNode( '' ));
	POS_NO.appendChild(xmlDoc.createTextNode( '' ));
	CUST_NO.appendChild(xmlDoc.createTextNode( '' ));
	PAY_AMT.appendChild(xmlDoc.createTextNode( '' ));
	USE_YN.appendChild(xmlDoc.createTextNode( '' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TRXN_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SALE_DT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POS_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CUST_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_AMT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);
	
	gridRoot1.addItemAt(  xmlDoc  , 0, false);
	
}

function addRowNotFalse_XML(){
	
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
	
	var TRXN_NO = xmlDoc.createElement("TRXN_NO");
	var STR_CODE = xmlDoc.createElement("STR_CODE");
	var STR_NAME = xmlDoc.createElement("STR_NAME");
	var SALE_DT = xmlDoc.createElement("SALE_DT");
	var POS_NO = xmlDoc.createElement("POS_NO");
	var CUST_NO = xmlDoc.createElement("CUST_NO");
	var PAY_AMT = xmlDoc.createElement("PAY_AMT");
	var USE_YN = xmlDoc.createElement("USE_YN");
	
	TRXN_NO.appendChild(xmlDoc.createTextNode( '' ));
	STR_CODE.appendChild(xmlDoc.createTextNode( '' ));
	STR_NAME.appendChild(xmlDoc.createTextNode( '' ));
	SALE_DT.appendChild(xmlDoc.createTextNode( '' ));
	POS_NO.appendChild(xmlDoc.createTextNode( '' ));
	CUST_NO.appendChild(xmlDoc.createTextNode( '' ));
	PAY_AMT.appendChild(xmlDoc.createTextNode( '' ));
	USE_YN.appendChild(xmlDoc.createTextNode( '' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TRXN_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SALE_DT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POS_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CUST_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_AMT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);
	
	gridRoot1.addItemAt(  xmlDoc  , 0, true);
	
}

//주문내용저장
function btnSave(){
	
	var gridXmlData1 = "";
	var gridXmlData2 = "";
	
	var selectorColumn = gridRoot1.getObjectById("selector");
	var selectedTrxn = selectorColumn.getSelectedIndices();
	
	var selectorColumn2 = gridRoot2.getObjectById("selector");
	var selectedGiftItem = selectorColumn2.getSelectedIndices();
	
	if(selectedTrxn.length < 1){
		//사은품을 증정할 영수증을 선택하세요.
		alert(msgSelectTrxnNo);
		return;
	}
	
	if(selectedGiftItem.length < 1){
		//지급할 사은품을 선택하세요.
		alert(msgSelectGiftItem);
		return;
	}
	
	for(var i=0; i < selectedTrxn.length; i++){
		var rowIndex = Number(selectedTrxn[i]);
		var dataRow = gridRoot1.getItemAt(rowIndex);
		
		if(dataRow.GIFT_CODE == undefined ||
				dataRow.GIFT_CODE == undefined ||
				dataRow.STR_CODE == undefined ||
				dataRow.TRXN_NO == undefined ||
				dataRow.SALE_DT == undefined ||
				dataRow.POS_NO == undefined ||
				dataRow.GIFT_CMP_FLAG == undefined ||
				dataRow.CUST_NO == undefined ||
				dataRow.PAY_AMT == undefined){
			//영수증 등록 데이터의 문제가 있습니다. 확인 후 다시 시도하세요.
			alert(msgErrorTrxnData);
			return;
		}
		
		gridXmlData1 = gridXmlData1 + "<GRIDROW>";
		gridXmlData1 = gridXmlData1 + "<GIFT_CODE>" + dataRow.GIFT_CODE + "</GIFT_CODE>";
		gridXmlData1 = gridXmlData1 + "<STR_CODE>" + dataRow.STR_CODE + "</STR_CODE>";
		gridXmlData1 = gridXmlData1 + "<TRXN_NO>" + dataRow.TRXN_NO + "</TRXN_NO>";
		gridXmlData1 = gridXmlData1 + "<SALE_DT>" + dataRow.SALE_DT + "</SALE_DT>";
		gridXmlData1 = gridXmlData1 + "<POS_NO>" + dataRow.POS_NO + "</POS_NO>";
		gridXmlData1 = gridXmlData1 + "<GIFT_CMP_FLAG>" + dataRow.GIFT_CMP_FLAG + "</GIFT_CMP_FLAG>";
		gridXmlData1 = gridXmlData1 + "<CUST_NO>" + dataRow.CUST_NO + "</CUST_NO>";
		gridXmlData1 = gridXmlData1 + "<SALE_AMT>" + dataRow.PAY_AMT + "</SALE_AMT>";
		gridXmlData1 = gridXmlData1 + "</GRIDROW>";
	}
	
	for(var i=0; i < selectedGiftItem.length; i++){
		var rowIndex = Number(selectedGiftItem[i]);
		var dataRow = gridRoot2.getItemAt(rowIndex);
		
		if(dataRow.PAY_QTY == undefined){
			//지급할 사은품의 수량을 입력하세요.
			alert(msgErrorGiftItem);
			return;
		}
		
		gridXmlData2 = gridXmlData2 + "<GRIDROW>";
		gridXmlData2 = gridXmlData2 + "<GIFT_ITM_CODE>" + dataRow.GIFT_ITM_CODE + "</GIFT_ITM_CODE>";
		gridXmlData2 = gridXmlData2 + "<PAY_QTY>" + dataRow.PAY_QTY + "</PAY_QTY>";
		gridXmlData2 = gridXmlData2 + "</GRIDROW>";
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData1 =  "<GRIDLIST>"+gridXmlData1+"</GRIDLIST>" ; 
	gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
	
	alert(gridXmlData1);
	alert(gridXmlData2);
	
	jQuery.ajax({ 
	    url:"/registBusinessGiftGrant.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					"GRID_XML_DATA1" : gridXmlData1
				,	"GRID_XML_DATA2" : gridXmlData2
		        }, 
		success:function(data){   
			
			gridRoot1.removeAll();
			//btnSearch();
			
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
	
	if($("#P_GIFT_CODE").val() == "" || $("#P_GIFT_CODE").val() == undefined || $("#P_GIFT_CODE").val() == "undefined"){
		//조회할 행사를 선택하세요.
		alert(msgSelectGift);
		return;
	}
	
	gridRoot1.removeAll();
	
	//로딩바 출력
	showLoadingBar1();
	
	jQuery.ajax({ 
	    url:"/selectBusinessGiftGrant.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'P_GIFT_CODE' : $("#P_GIFT_CODE").val()
		        }, 
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

function btnSearchTrxnNo(BAR_CODE, rowIndex){
	
	var STR_CODE = BAR_CODE.substring(0, 5);
	var SALE_DT = BAR_CODE.substring(5, 13);
	var POS_NO = BAR_CODE.substring(13, 17);
	var TRXN_NO = BAR_CODE.substring(17, 23);
	
	
	jQuery.ajax({ 
	    url:"/selectTrxnNo.do",         
	    type:"POST",
		datatype:"json",
		data: {	'P_TRXN_NO' : TRXN_NO
				,	'P_STR_CODE' : STR_CODE
				,	'P_SALE_DT' : SALE_DT
				,	'P_POS_NO' : POS_NO
				},
		success:function(data){  
			//alert(data.list);
			//alert(data);
			if(data.length > 0){
				gridRoot1.setItemFieldAt(data[0].STR_CODE, rowIndex, "STR_CODE");
				gridRoot1.setItemFieldAt(data[0].STR_NAME, rowIndex, "STR_NAME");
				gridRoot1.setItemFieldAt(data[0].POS_NO, rowIndex, "POS_NO");
				gridRoot1.setItemFieldAt(data[0].CUST_NO, rowIndex, "CUST_NO");
				gridRoot1.setItemFieldAt(data[0].PAY_AMT, rowIndex, "PAY_AMT");
				gridRoot1.setItemFieldAt(data[0].USE_YN, rowIndex, "USE_YN");
				gridRoot1.setItemFieldAt(data[0].SALE_DT, rowIndex, "SALE_DT");
				gridRoot1.setItemFieldAt(TRXN_NO, rowIndex, "TRXN_NO");
				
				//addRow();
				//addRowNotFalse();
			}
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btnSearchItem(GIFT_CODE, rowIndex){
	
	gridRoot2.removeAll();
	
	//로딩바 출력
	showLoadingBar2();
	
	jQuery.ajax({ 
	    url:"/selectGiftItem.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'P_GIFT_CODE' : GIFT_CODE
		        }, 
		success:function(data){   
			//gridApp1.setData(data);
			
			if(data.length > 0){
				
				gridApp2.setData(data);
				
				gridRoot1.setItemFieldAt(data[0].GIFT_CMP_FLAG, rowIndex, "GIFT_CMP_FLAG");
				
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


//해당 점포의 POS 가져오기
function getPosList() {
	
	var html = "";
	
	if($("#P_STR_CODE").val() == "")
	{
		$("#P_POS_NO").html("<option value=\"\">" + all + "</option>");
		return;
	}
	
	jQuery.ajax({ 
	    url:"/getPosList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {'P_STR_CODE' : $("#top_search select[name=P_STR_CODE]").val()},
		success:function(data){
			if(typeof data != "undefined" && data != null)
			{
				html += "<option value=\"\">" + all + "</option>";
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].POS_NO + "\">" + data[i].POS_NAME + "</option>";
				}
				$("#P_POS_NO").html(html);
			}
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

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height( $(window).height() - 368 );
	$("#gridHolder2").height(200);
	$(window).on('resize',function (){	
		$("#gridHolder1").height( $(window).height() - 368 );
		$("#gridHolder2").height(200);
		
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