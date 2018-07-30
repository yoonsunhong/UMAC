/********************************************************
 * 설명:  공통코드관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2016.12.27
 * version : 1.0
 ********************************************************/

var maxLRGCode = "";

var selectedIndex1 = -1;
var selectedIndex2 = -1;
var selectedIndex3 = -1;
var selectedIndex4 = -1;

$(document).ready(function(){
	
	init();

	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	$("#top_search select[name=STR_CODE]").change(function(){
		if($("#top_search select[name=STR_CODE]").val() != ""){
			btnSearchZoneSelect();
			btnSearchZone();
		}
		
		$("#top_search select[name=RACK_CODE] option").remove();
		$("#RACK_CODE").append('<option value="">'+ all +'</option>');
		
		$("#top_search select[name=LINE_CODE] option").remove();
		$("#LINE_CODE").append('<option value="">'+ all +'</option>');
	});
	$("#top_search select[name=ZONE_CODE]").change(function(){
		if($("#top_search select[name=STR_CODE]").val() != "" && $("#top_search select[name=ZONE_CODE]").val() != ""){
			btnSearchRackSelect();
		}
		
		$("#top_search select[name=LINE_CODE] option").remove();
		$("#LINE_CODE").append('<option value="">'+ all +'</option>');
	});
	$("#top_search select[name=RACK_CODE]").change(function(){
		if($("#top_search select[name=STR_CODE]").val() != "" && $("#top_search select[name=RACK_CODE]").val() != ""){
			btnSearchLineSelect();
		}
	});
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
rMateGridH5.create("grid1", "gridHolder1", jsVars+"&dataType=xml");
rMateGridH5.create("grid2", "gridHolder2", jsVars+"&dataType=xml");
rMateGridH5.create("grid3", "gridHolder3", jsVars+"&dataType=xml");
rMateGridH5.create("grid4", "gridHolder4", jsVars+"&dataType=xml");

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
		var itemClickHandler1 = function(event) {
			var rowIndex = event.rowIndex;
			selectedIndex1 = rowIndex
			var columnIndex = event.columnIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			//var column = dataGrid1.getDisplayableColumns()[columnIndex];
			//var dataField = column.getDataField();
			//clickData1 = dataRow1[dataField];
			gridRoot2.removeAll();
			gridRoot3.removeAll();
			gridRoot4.removeAll();
			dataRow2 = "";
			dataRow3 = "";
			dataRow4 = "";
			
			if($("#top_search select[name=STR_CODE]").val() == ""){
				alert(msgStorNmSelected);
				return;
			}
			
			btnSearchRack();
		};
		
		var itemDoubleClickHandler1 = function(event) {
			
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			
			//그리드1 셀선택 이벤트
			dataGrid1.addEventListener("itemClick", itemClickHandler1);
			dataGrid1.setDoubleClickEnabled(true);
			dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
			
			if($("#top_search select[name=STR_CODE]").val() != ""){
				btnSearchZoneSelect();
				btnSearchZone();
			}
			
			$("#top_search select[name=RACK_CODE] option").remove();
			$("#RACK_CODE").append('<option value="">'+ all +'</option>');
			
			$("#top_search select[name=LINE_CODE] option").remove();
			$("#LINE_CODE").append('<option value="">'+ all +'</option>');
			
			btnSearchZone();

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);
		
	} else if(id =="grid2") {
		
		gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData2);
		
		//로우 클릭 이벤트 제어
		var itemClickHandler2 = function(event) {
			var rowIndex = event.rowIndex;
			selectedIndex2 = rowIndex
			var columnIndex = event.columnIndex;
			dataRow2 = gridRoot2.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			//var column = dataGrid2.getDisplayableColumns()[columnIndex];
			//var dataField = column.getDataField();
			//clickData2 = dataRow2[dataField];
			gridRoot3.removeAll();
			gridRoot4.removeAll();
			dataRow3 = "";
			dataRow4 = "";
			
			if($("#top_search select[name=STR_CODE]").val() == ""){
				alert(msgStorNmSelected);
				return;
			}
			
			btnSearchLine();
		};
		
		var itemDoubleClickHandler2 = function(event) {
			
		};
		
		//그리드2 핸들러
		var layoutCompleteHandler2 = function(event) {
			dataGrid2 = gridRoot2.getDataGrid();	// 그리드 객체
			
			//그리드2 셀선택 이벤트
			dataGrid2.addEventListener("itemClick", itemClickHandler2);
			
			//그리드2 더블클릭 이벤트
			dataGrid2.setDoubleClickEnabled(true);
			dataGrid2.addEventListener("itemDoubleClick", itemDoubleClickHandler2);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot2.addEventListener("itemDataChanged", itemDataChangeHandler2);
		
	} else if(id == "grid3"){
		gridApp3 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot3 = gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp3.setLayout(layoutStr3);
		gridApp3.setData(gridData3);
		
		
		//로우 클릭 이벤트 제어
		var itemClickHandler3 = function(event) {
			var rowIndex = event.rowIndex;
			selectedIndex3 = rowIndex
			var columnIndex = event.columnIndex;
			dataRow3 = gridRoot3.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			//var column = dataGrid2.getDisplayableColumns()[columnIndex];
			//var dataField = column.getDataField();
			//clickData2 = dataRow2[dataField];
			
			gridRoot4.removeAll();
			dataRow4 = "";
			
			if($("#top_search select[name=STR_CODE]").val() == ""){
				alert(msgStorNmSelected);
				return;
			}
			
			btnSearchCategory();
		};
		
		var itemDoubleClickHandler3 = function(event) {
	    	
		};
		
		//그리드3 핸들러
		var layoutCompleteHandler3 = function(event) {
			dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체
			
			//그리드3 셀선택 이벤트
			dataGrid3.addEventListener("itemClick", itemClickHandler3);
			
			//그리드3 더블클릭 이벤트
			dataGrid3.setDoubleClickEnabled(true);
			dataGrid3.addEventListener("itemDoubleClick", itemDoubleClickHandler3);

		};
		
		var dataCompleteHandler3 = function(event) {
			
			// 그리드 객체
			dataGrid3 = gridRoot3.getDataGrid(); 
			
			// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
			collection3 = gridRoot3.getCollection();
			
			var AVAIL_INV_YN = gridRoot3.getObjectById("AVAIL_INV_YN");	
			var dataProvider = [];
			
			var providerValue1 = {'label':'가용', 'code':'Y'};
			dataProvider.push(providerValue1);
			
			var providerValue2 = {'label':'미가용', 'code':'N'};
			dataProvider.push(providerValue2);
			
			AVAIL_INV_YN.setItemRendererDataProvider(dataProvider);
			
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
		
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot3.addEventListener("itemDataChanged", itemDataChangeHandler3);
		
	}else if(id == "grid4"){
		gridApp4 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot4 = gridApp4.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp4.setLayout(layoutStr4);
		gridApp4.setData(gridData4);
		
		
		//로우 클릭 이벤트 제어
		var itemClickHandler4 = function(event) {
			var rowIndex = event.rowIndex;
			selectedIndex4 = rowIndex;
			var columnIndex = event.columnIndex;
			dataRow4 = gridRoot4.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			//var column = dataGrid2.getDisplayableColumns()[columnIndex];
			//var dataField = column.getDataField();
			//clickData2 = dataRow2[dataField];
		};
		
		var itemDoubleClickHandler4 = function(event) {
			
			var rowIndex = event.rowIndex;
			selectedIndex4 = rowIndex;
			var columnIndex = event.columnIndex;
			var dataRow = gridRoot4.getItemAt(rowIndex);
			dataRow4 = gridRoot4.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid4.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			if (dataField == "CLS_CODE") {
				editRowIndex = rowIndex;
				editDataRow = dataRow;
				editDataField = dataField;
				// pop up edit window
				//alert("팝업오픈");
				
				openCategoryPop();
			}
	    	
		};
		
		//그리드3 핸들러
		var layoutCompleteHandler4 = function(event) {
			dataGrid4 = gridRoot4.getDataGrid();	// 그리드 객체
			
			//그리드4 셀선택 이벤트
			dataGrid4.addEventListener("itemClick", itemClickHandler4);
			
			//그리드4 더블클릭 이벤트
			dataGrid4.setDoubleClickEnabled(true);
			dataGrid4.addEventListener("itemDoubleClick", itemDoubleClickHandler4);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4);
		
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot4.addEventListener("itemDataChanged", itemDataChangeHandler4);
	}
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1, collection1;
var gridApp2, gridRoot2, dataGrid2, dataRow2,clickData2,selectorColumn2, collection2;
var gridApp3, gridRoot3, dataGrid3, dataRow3,clickData3,selectorColumn3, collection3;
var gridApp4, gridRoot4, dataGrid4, dataRow4,clickData4,selectorColumn4, collection4;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
	'<rMateGrid>\
		<DataGrid id="dg1" editable="true" selectionMode="multipleRows" horizontalScrollPolicy="auto" showDeletedRows="true">\
			<columns>\
				<DataGridRowStateColumn id="rowState" textAlign="center" visible="true"/>\
				<DataGridColumn dataField="INPUT_YN" headerText="INPUT_YN" textAlign="center" visible="false" />\
				<DataGridColumn dataField="ZONE_CODE"  headerText="' + zoneCode + '" textAlign="center" maxChars="2" width="70" />\
				<DataGridColumn dataField="ZONE_NAME" headerText="' + zoneName + '" textAlign="left" maxChars="20" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<DataGrid id="dg2" editable="true" selectionMode="multipleRows" horizontalScrollPolicy="auto" showDeletedRows="true">\
			<columns>\
				<DataGridRowStateColumn id="rowState" textAlign="center" visible="true"/>\
				<DataGridColumn dataField="INPUT_YN" headerText="INPUT_YN" textAlign="center" visible="false" />\
				<DataGridColumn dataField="ZONE_CODE"  headerText="' + zoneCode + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="RACK_CODE" headerText="' + rackCode + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="65" />\
				<DataGridColumn dataField="RACK_NAME" headerText="' + rackName + '" textAlign="left" maxChars="20" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
	<NumberFormatter id="onlynum" useThousandsSeparator="false"/>\
		<DataGrid id="dg3" editable="true" selectionMode="multipleRows" horizontalScrollPolicy="auto" showDeletedRows="true">\
			<columns>\
				<DataGridRowStateColumn id="rowState" textAlign="center" visible="true"/>\
				<DataGridColumn dataField="INPUT_YN" headerText="INPUT_YN" textAlign="center" visible="false" />\
				<DataGridColumn dataField="RACK_CODE"  headerText="' + rackCode + '" textAlign="center"  visible="false" />\
				<DataGridColumn dataField="LINE_CODE" headerText="' + lineCode + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="70" />\
				<DataGridColumn dataField="LINE_NAME" headerText="' + lineName + '" textAlign="left" maxChars="20" />\
				<DataGridColumn dataField="LOC_BAR_CODE" headerText="바코드" textAlign="center" maxChars="12" />\
				<DataGridColumn dataField="AVAIL_INV_YN" id="AVAIL_INV_YN"	headerText="가용재고관리여부" textAlign="center" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" width="80" visible="false" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr4 =
	'<rMateGrid>\
		<DataGrid id="dg4" editable="true" selectionMode="multipleRows" horizontalScrollPolicy="auto" showDeletedRows="true">\
			<columns>\
				<DataGridRowStateColumn id="rowState" textAlign="center" visible="true"/>\
				<DataGridColumn dataField="INPUT_YN" headerText="INPUT_YN" textAlign="center" visible="false" />\
				<DataGridColumn dataField="LINE_CODE"  headerText="' + lineCode + '" textAlign="center"  visible="false" />\
				<DataGridColumn dataField="CLS_CODE" headerText="' + categoryCode + '"  textAlign="right" itemRenderer="IconItem" icon="Magnifier" editable="false"  backgroundColor="#EFEFEF" width="80"  />\
				<DataGridColumn dataField="CLS_NAME" headerText="' + categoryName + '" textAlign="left" maxChars="20" editable="false"  backgroundColor="#EFEFEF"  />\
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

//그리드1 데이터 초기화
var gridData1 = [];
//그리드2, 3, 4 데이터 초기화
var gridData2 = [];
var gridData3 = [];
var gridData4 = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}


function init() {

	$("#top_search select[name=STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCodeFlag("top_search select[name=STR_CODE]", "3");
	$("#top_search select[name=STR_CODE]").val($("#SESSION_STR_CODE").val());
	
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
function itemDataChangeHandler1(event) {
	
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot1.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	
	if(oldValue != newValue){
		if(gridRoot1.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot1.setItemFieldAt( "U" , rowIndex, "INPUT_YN");
		}
	}
	
	if(dataField == "ZONE_CODE"){
		
		if(newValue.length == 1){
			alert("ZONE 코드는 2자리를 입력해야 합니다.");
			gridRoot1.setItemFieldAt( oldValue , rowIndex, "ZONE_CODE");
			return;
		}
		
		if(newValue.length > 0){
			//alert(newValue[0].charCodeAt(0)); alert(newValue[1].charCodeAt(0)); return;
			//A : 65 ~ Z : 90
			for(var i=0; i < newValue.length ; i++){
				if(Number(newValue[i].charCodeAt(0)) < 65 || Number(newValue[i].charCodeAt(0)) > 90){
					alert("Zone 코드는 영어 대문자만 입력이 가능합니다.");
					gridRoot1.setItemFieldAt( oldValue , rowIndex, "ZONE_CODE");
					return;
				}
			}
		}
		
		var rowCnt = gridRoot1.getCollection().getSource();
		for(var i=0; i < rowCnt.length ; i++){
			
			if(i == rowIndex) continue;
			
			if(newValue == gridRoot1.getItemFieldAt(i, "ZONE_CODE")){
				alert("중복된 ZONE 코드가 존재합니다.");
				gridRoot1.setItemFieldAt( oldValue , rowIndex, "ZONE_CODE");
				
				/*var value = {};
				value.rowIndex = rowIndex;
				value.columnIndex = 1;
				dataGrid1.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
				return;*/
			}
		}
	}
	
}
function itemDataChangeHandler2(event) {
	
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot2.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	
	if(oldValue != newValue){
		if(gridRoot2.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "U" , rowIndex, "INPUT_YN");
		}
	}
	
}
function itemDataChangeHandler3(event) {
	
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot3.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	
	if(oldValue != newValue){
		if(gridRoot3.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot3.setItemFieldAt( "U" , rowIndex, "INPUT_YN");
		}
	}
	
	if(dataField == "LOC_BAR_CODE"){
		if(newValue.length > 0){
			//alert(newValue[0].charCodeAt(0)); alert(newValue[1].charCodeAt(0)); return;
			//A : 65 ~ Z : 90
			//0 : 30 ~ 9 : 39
			for(var i=0; i < newValue.length ; i++){
				if(Number(newValue[i].charCodeAt(0)) < 30 || Number(newValue[i].charCodeAt(0)) > 39){
					alert("바코드는 숫자만 입력이 가능합니다.");
					gridRoot3.setItemFieldAt( oldValue , rowIndex, "LOC_BAR_CODE");
					return;
				}
			}
		}
	}
	
}
function itemDataChangeHandler4(event) {
	
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot4.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	
	if(oldValue != newValue){
		if(gridRoot4.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot4.setItemFieldAt( "U" , rowIndex, "INPUT_YN");
		}
	}
	
}

function addZone(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		alert(msgStorNmSelected);
		return;
	}
	
	var rowCnt1 = gridRoot1.getCollection().getSource();
	
	if(gridRoot1.getItemFieldAt(Number(rowCnt1.length)-1, "ZONE_CODE") == "99"){
		alert(msgInsertCodeMax);
		return;
	}
	
	var zoneCode = Number(gridRoot1.getItemFieldAt(Number(rowCnt1.length)-1, "ZONE_CODE")) + 1;
	if(zoneCode < 10){
		zoneCode = "0" + zoneCode;
	}
	
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
	
	var INPUT_YN = xmlDoc.createElement("INPUT_YN");
	var ZONE_CODE = xmlDoc.createElement("ZONE_CODE");
	var ZONE_NAME = xmlDoc.createElement("ZONE_NAME");
	
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	ZONE_CODE.appendChild(xmlDoc.createTextNode( '' ));
	ZONE_NAME.appendChild(xmlDoc.createTextNode( '' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_NAME);
	
	gridRoot1.addItemAt(  xmlDoc  , -1);
	//girdMoveSelctedIndex();
	
}

function addRack(){
	
	if(selectedIndex1 == -1 || gridRoot1.getItemFieldAt(selectedIndex1, "ZONE_CODE") == undefined){
		return;
	}
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	var maxCode = gridRoot2.getItemFieldAt(Number(rowCnt2.length)-1, "RACK_CODE");
	var zoneCode = gridRoot1.getItemFieldAt(selectedIndex1, "ZONE_CODE");
	var rackCode = 0;
	
	if(rowCnt2.length > 0){
		if(maxCode.substring(2, 4) == "99"){
			alert(msgInsertCodeMax);
			return;
		}
		
		 rackCode = Number(maxCode.substring(2,4)) + 1;
	}else{
		rackCode = 1;
	}
	
	if(rackCode < 10){
		rackCode = "0" + rackCode;
	}
	
	rackCode = zoneCode + rackCode;
	
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
	
	var INPUT_YN = xmlDoc.createElement("INPUT_YN");
	var ZONE_CODE = xmlDoc.createElement("ZONE_CODE");
	var RACK_CODE = xmlDoc.createElement("RACK_CODE");
	var RACK_NAME = xmlDoc.createElement("RACK_NAME");
	
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	ZONE_CODE.appendChild(xmlDoc.createTextNode( gridRoot1.getItemFieldAt(selectedIndex1, "ZONE_CODE") ));
	RACK_CODE.appendChild(xmlDoc.createTextNode( rackCode ));
	RACK_NAME.appendChild(xmlDoc.createTextNode( '' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_NAME);
	
	gridRoot2.addItemAt(  xmlDoc  , -1);
	//girdMoveSelctedIndex();
	
}

function addLine(){
	
	if(selectedIndex2 == -1 || gridRoot2.getItemFieldAt(selectedIndex2, "RACK_CODE") == undefined){
		return;
	}
	
	var rowCnt3 = gridRoot3.getCollection().getSource();
	var maxCode = gridRoot3.getItemFieldAt(Number(rowCnt3.length)-1, "LINE_CODE");
	var rackCode = gridRoot2.getItemFieldAt(selectedIndex2, "RACK_CODE");
	var lineCode = 0;
	
	if(rowCnt3.length > 0){
		if(maxCode.substring(4, 6) == "99"){
			alert(msgInsertCodeMax);
			return;
		}
		
		lineCode = Number(maxCode.substring(4, 6)) + 1;
	}else{
		lineCode = 1;
	}

	if(lineCode < 10){
		lineCode = "0" + lineCode;
	}
	
	lineCode = rackCode + lineCode;
	
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
	
	var INPUT_YN = xmlDoc.createElement("INPUT_YN");
	var RACK_CODE = xmlDoc.createElement("RACK_CODE");
	var LINE_CODE = xmlDoc.createElement("LINE_CODE");
	var LINE_NAME = xmlDoc.createElement("LINE_NAME");
	var LOC_BAR_CODE = xmlDoc.createElement("LOC_BAR_CODE");
	var AVAIL_INV_YN = xmlDoc.createElement("AVAIL_INV_YN");
	
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	RACK_CODE.appendChild(xmlDoc.createTextNode( gridRoot2.getItemFieldAt(selectedIndex2, "RACK_CODE") ));
	LINE_CODE.appendChild(xmlDoc.createTextNode( lineCode ));
	LINE_NAME.appendChild(xmlDoc.createTextNode( '' ));
	LOC_BAR_CODE.appendChild(xmlDoc.createTextNode( '' ));
	AVAIL_INV_YN.appendChild(xmlDoc.createTextNode( 'Y' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOC_BAR_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AVAIL_INV_YN);
	
	gridRoot3.addItemAt(  xmlDoc  , -1);
	//girdMoveSelctedIndex();
	
}

function openCategoryPop(){
	$('#comm_pop_wrap11' ).dialog( 'open' );
	gridApp20.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM11").val('fn_comm_category_callback(dataRow20)');
}

function fn_comm_category_callback(p_dataRow){
	
	if(selectedIndex4 != -1){
		gridRoot4.setItemFieldAt( 'I' , selectedIndex4, "INPUT_YN");
		gridRoot4.setItemFieldAt( gridRoot3.getItemFieldAt(selectedIndex3, "LINE_CODE") , selectedIndex4, "LINE_CODE");
		gridRoot4.setItemFieldAt( p_dataRow.CLS_CODE , selectedIndex4, "CLS_CODE");
		gridRoot4.setItemFieldAt( p_dataRow.CLS_NAME , selectedIndex4, "CLS_NAME");
	}
	
}

function addCategory(){
	
	if(selectedIndex3 == -1 || gridRoot3.getItemFieldAt(selectedIndex3, "LINE_CODE") == undefined){
		return;
	}
	
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
	
	var INPUT_YN = xmlDoc.createElement("INPUT_YN");
	var LINE_CODE = xmlDoc.createElement("LINE_CODE");
	var CLS_CODE = xmlDoc.createElement("CLS_CODE");
	var CLS_NAME = xmlDoc.createElement("CLS_NAME");
	
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	LINE_CODE.appendChild(xmlDoc.createTextNode( gridRoot3.getItemFieldAt(selectedIndex3, "LINE_CODE") ));
	CLS_CODE.appendChild(xmlDoc.createTextNode( '' ));
	CLS_NAME.appendChild(xmlDoc.createTextNode( '' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
	
	gridRoot4.addItemAt(  xmlDoc  , -1);
	//girdMoveSelctedIndex();
	
}

//그리드의 selctedIndex를 전달된 행으로 이동
function girdMoveSelctedIndex(idx) {
	// addItemAt나 removeItemAt후에 바로 selctedIndex를 변경하면 무시되는 경우가 발생하여 setTimeout로 지연후 실행토록 함
	setTimeout("gridSetSelectedIndex("+idx+")", 100);
}

function gridSetSelectedIndex(idx) {
	// 현재 그리드의 verticalScrollPosition을 조사하여 스크롤을 일으킬지 조사하여 필요시 세팅
	var verticalScrollPosition = dataGrid2.getVerticalScrollPosition();
	// 그리드의 행수를 가져옵니다 (이 값은 화면에 제대로 표시되지 않는 행을 포함하기 때문에 실제와 다른 값으로 보일 수 있으며, DataGrid의 variableRowHeight가 true일 경우에는 추정치를 의미합니다.
	var rowCount = dataGrid2.getRowCount();
	if (rowCount > 0)
		rowCount = rowCount - 1;
	var halfRowCount = (rowCount / 2).toFixed();

	// idx가 값이 없는 경우 collection에서 현재 데이터의 레코드수를 가져와 맨 마지막 행값을 계산.
	if (idx == null || idx == undefined) {
		if (!collection2)
			collection2 = gridRoot2.getCollection();
		idx = collection2.getLength() - 1;
	}
	dataGrid2.setSelectedIndex(idx);
	if (idx < verticalScrollPosition || idx > verticalScrollPosition + rowCount) {
		if (idx - halfRowCount >= 0)	// 화면 중간에 위치하도록 계산
			dataGrid2.setVerticalScrollPosition(idx - halfRowCount);
		else
			dataGrid2.setVerticalScrollPosition(0);
	}
}

function btnSearchZoneSelect(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		return;
	}
	
	$("#top_search select[name=ZONE_CODE] option").remove();
	$("#ZONE_CODE").append('<option value="">'+ all +'</option>'); 
	
	jQuery.ajax({ 
	    url:"/selectWmsInZone.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
				},
		success:function(data){  
			if(data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					$("#ZONE_CODE").append('<option value="'+ data[i].ZONE_CODE +'">'+ data[i].ZONE_NAME +'</option>'); 
				}
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

function btnSearchRackSelect(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		return;
	}
	
	$("#top_search select[name=RACK_CODE] option").remove();
	$("#RACK_CODE").append('<option value="">'+ all +'</option>'); 
	
	jQuery.ajax({ 
	    url:"/selectWmsInRack.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
				,	'ZONE_CODE' : $("#top_search select[name=ZONE_CODE]").val()
				},
		success:function(data){  
			if(data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					$("#RACK_CODE").append('<option value="'+ data[i].RACK_CODE +'">'+ data[i].RACK_NAME +'</option>'); 
				}
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

function btnSearchLineSelect(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		return;
	}
	
	$("#top_search select[name=LINE_CODE] option").remove();
	$("#LINE_CODE").append('<option value="">'+ all +'</option>'); 
	
	jQuery.ajax({ 
	    url:"/selectWmsInLine.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
				,	'RACK_CODE' : $("#top_search select[name=RACK_CODE]").val()
				},
		success:function(data){  
			if(data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					$("#LINE_CODE").append('<option value="'+ data[i].LINE_CODE +'">'+ data[i].LINE_NAME +'</option>'); 
				}
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

function btnSearchZone(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		return;
	}
	
	gridRoot1.removeAll();
	gridRoot2.removeAll();
	gridRoot3.removeAll();
	gridRoot4.removeAll();

	jQuery.ajax({ 
	    url:"/selectWmsInZone.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
				},
		success:function(data){  
			//gridApp1.setData(data);
			//alert(data);
			
			if(data != null && data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					
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
					
					var INPUT_YN = xmlDoc.createElement("INPUT_YN");
					var ZONE_CODE = xmlDoc.createElement("ZONE_CODE");
					var ZONE_NAME = xmlDoc.createElement("ZONE_NAME");
					
					INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
					ZONE_CODE.appendChild(xmlDoc.createTextNode( data[i].ZONE_CODE ));
					ZONE_NAME.appendChild(xmlDoc.createTextNode( data[i].ZONE_NAME ));
					
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_NAME);
					
					gridRoot1.addItemAt(  xmlDoc  , -1, false);
					
					//i (index) 입력하여 그리드 아이템 가져오기
					var selectedItem = gridRoot1.getItemAt(i);
					//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
					gridRoot1.removeChangedData(selectedItem);
					
				}
				
				dataGrid1.invalidateList();
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function btnSearchRack(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		return;
	}
	
	gridRoot2.removeAll();
	gridRoot3.removeAll();
	gridRoot4.removeAll();
	
	jQuery.ajax({ 
	    url:"/selectWmsInRack.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
				,	'ZONE_CODE' : gridRoot1.getItemFieldAt(selectedIndex1, "ZONE_CODE")
				},
		success:function(data){  
			//gridApp1.setData(data);
			//alert(data);
			
			if(data != null && data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					
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
					
					var INPUT_YN = xmlDoc.createElement("INPUT_YN");
					var ZONE_CODE = xmlDoc.createElement("ZONE_CODE");
					var RACK_CODE = xmlDoc.createElement("RACK_CODE");
					var RACK_NAME = xmlDoc.createElement("RACK_NAME");
					
					INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
					ZONE_CODE.appendChild(xmlDoc.createTextNode( data[i].ZONE_CODE ));
					RACK_CODE.appendChild(xmlDoc.createTextNode( data[i].RACK_CODE ));
					RACK_NAME.appendChild(xmlDoc.createTextNode( data[i].RACK_NAME ));
					
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_NAME);
					
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
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function btnSearchLine(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		return;
	}
	
	gridRoot3.removeAll();
	gridRoot4.removeAll();
	
	jQuery.ajax({ 
	    url:"/selectWmsInLine.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
				,	'RACK_CODE' : gridRoot2.getItemFieldAt(selectedIndex2, "RACK_CODE")
				},
		success:function(data){  
			//gridApp1.setData(data);
			//alert(data);
			
			if(data != null && data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					
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
					
					var INPUT_YN = xmlDoc.createElement("INPUT_YN");
					var RACK_CODE = xmlDoc.createElement("RACK_CODE");
					var LINE_CODE = xmlDoc.createElement("LINE_CODE");
					var LINE_NAME = xmlDoc.createElement("LINE_NAME");
					var LOC_BAR_CODE = xmlDoc.createElement("LOC_BAR_CODE");
					var AVAIL_INV_YN = xmlDoc.createElement("AVAIL_INV_YN");
					
					INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
					RACK_CODE.appendChild(xmlDoc.createTextNode( data[i].RACK_CODE ));
					LINE_CODE.appendChild(xmlDoc.createTextNode( data[i].LINE_CODE ));
					LINE_NAME.appendChild(xmlDoc.createTextNode( data[i].LINE_NAME ));
					LOC_BAR_CODE.appendChild(xmlDoc.createTextNode( data[i].LOC_BAR_CODE ));
					AVAIL_INV_YN.appendChild(xmlDoc.createTextNode( data[i].AVAIL_INV_YN ));
					
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_NAME);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOC_BAR_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AVAIL_INV_YN);
					
					gridRoot3.addItemAt(  xmlDoc  , -1, false);
					
					//i (index) 입력하여 그리드 아이템 가져오기
					var selectedItem = gridRoot3.getItemAt(i);
					//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
					gridRoot3.removeChangedData(selectedItem);
					
				}
				
				dataGrid3.invalidateList();
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function btnSearchCategory(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		return;
	}
	
	gridRoot4.removeAll();
	
	jQuery.ajax({ 
	    url:"/selectWmsInCategory.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
				,	'LINE_CODE' : gridRoot3.getItemFieldAt(selectedIndex3, "LINE_CODE")
				},
		success:function(data){  
			//gridApp1.setData(data);
			//alert(data);
			
			if(data != null && data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					
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
					
					var INPUT_YN = xmlDoc.createElement("INPUT_YN");
					var LINE_CODE = xmlDoc.createElement("LINE_CODE");
					var CLS_CODE = xmlDoc.createElement("CLS_CODE");
					var CLS_NAME = xmlDoc.createElement("CLS_NAME");
					
					INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
					LINE_CODE.appendChild(xmlDoc.createTextNode( data[i].LINE_CODE ));
					CLS_CODE.appendChild(xmlDoc.createTextNode( data[i].CLS_CODE ));
					CLS_NAME.appendChild(xmlDoc.createTextNode( data[i].CLS_NAME ));
					
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
					
					gridRoot4.addItemAt(  xmlDoc  , -1, false);
					
					//i (index) 입력하여 그리드 아이템 가져오기
					var selectedItem = gridRoot4.getItemAt(i);
					//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
					gridRoot4.removeChangedData(selectedItem);
					
				}
				
				dataGrid4.invalidateList();
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

var myVar = "";
function btnSaveCheck() {
    myVar = setTimeout(btnSave, 500);
}

function btnSave(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		alert(msgStorNmSelected);
		return;
	}
	
	// Oracle Package에서 사용될 xml데이터 선언
	var gridXmlData1 = "";
	var gridXmlData2 = "";
	var gridXmlData3 = "";
	var gridXmlData4 = "";
	
	// Oracle Package 상에서 변경 여부에 따라 업무 수행을 위해 구분자 추가
	var P_GRID_DATA1_YN = "N";
	var P_GRID_DATA2_YN = "N";
	var P_GRID_DATA3_YN = "N";
	var P_GRID_DATA4_YN = "N";
	
	// XML형태로 데이터 생성을 위해 Count 조회
	var rowCnt1 = gridRoot1.getCollection().getSource();
	var rowCnt2 = gridRoot2.getCollection().getSource();
	var rowCnt3 = gridRoot3.getCollection().getSource();
	var rowCnt4 = gridRoot4.getCollection().getSource();
	
	var updateRowCnt = 0;
	
	for(var i=0 ; i < rowCnt1.length ; i++)
	{   
		if(gridRoot1.getItemFieldAt(i, "INPUT_YN") != "N" ){
			
			if(gridRoot1.getItemFieldAt(i, "INPUT_YN") != "D"){
				if(gridRoot1.getItemFieldAt(i, "ZONE_NAME") == undefined){
					alert(zoneName + msgConfirm);
					return;
				}
				if(gridRoot1.getItemFieldAt(i, "ZONE_NAME").trim() == ""){
					alert(zoneName + msgConfirm);
					return;
				}
			}
			gridXmlData1 = gridXmlData1 + getXmlString(   gridRoot1.getItemAt(i)   );
			P_GRID_DATA1_YN = "Y";
			updateRowCnt++;
		}
	}
	
	for(var i=0 ; i < rowCnt2.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			
			if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "D"){
				if(gridRoot2.getItemFieldAt(i, "RACK_NAME") == undefined){
					alert(rackName + msgConfirm);
					return;
				}
				if(gridRoot2.getItemFieldAt(i, "RACK_NAME").trim() == ""){
					alert(rackName + msgConfirm);
					return;
				}
			}
			
			gridXmlData2 = gridXmlData2 + getXmlString(   gridRoot2.getItemAt(i)   );
			P_GRID_DATA2_YN = "Y";
			updateRowCnt++;
		}
	}
	
	for(var i=0 ; i < rowCnt3.length ; i++)
	{   
		if(gridRoot3.getItemFieldAt(i, "INPUT_YN") != "N" ){
			
			if(gridRoot3.getItemFieldAt(i, "INPUT_YN") != "D"){
				if(gridRoot3.getItemFieldAt(i, "LINE_NAME") == undefined){
					alert(lineName + msgConfirm);
					return;
				}
				if(gridRoot3.getItemFieldAt(i, "LINE_NAME").trim() == ""){
					alert(lineName + msgConfirm);
					return;
				}
			}
			gridXmlData3 = gridXmlData3 + getXmlString(   gridRoot3.getItemAt(i)   );
			P_GRID_DATA3_YN = "Y";
			updateRowCnt++;
		}
	}
	
	for(var i=0 ; i < rowCnt4.length ; i++)
	{   
		if(gridRoot4.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData4 = gridXmlData4 + getXmlString(   gridRoot4.getItemAt(i)   );
			P_GRID_DATA4_YN = "Y";
			updateRowCnt++;
		}
	}
	
	if(updateRowCnt == 0){
		alert(noneChangeData);
		return;
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData1 =  "<GRIDLIST>"+gridXmlData1+"</GRIDLIST>" ;
	gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
	gridXmlData3 =  "<GRIDLIST>"+gridXmlData3+"</GRIDLIST>" ;
	gridXmlData4 =  "<GRIDLIST>"+gridXmlData4+"</GRIDLIST>" ;
	
	jQuery.ajax({ 
	    url:"/registWmsInLocation.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {
					"STR_CODE" : $("#top_search select[name=STR_CODE]").val()
				,	"gridXmlData1" : gridXmlData1
				,	"gridXmlData2" : gridXmlData2
				,	"gridXmlData3" : gridXmlData3
				,	"gridXmlData4" : gridXmlData4
				,	"P_GRID_DATA1_YN" : P_GRID_DATA1_YN
				,	"P_GRID_DATA2_YN" : P_GRID_DATA2_YN
				,	"P_GRID_DATA3_YN" : P_GRID_DATA3_YN
				,	"P_GRID_DATA4_YN" : P_GRID_DATA4_YN
		        }, 
		success:function(data){   
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

//대분류 조회
function btnSearch(){
	
	if($("#top_search select[name=STR_CODE]").val() == ""){
		alert(msgStorNmSelected);
		return;
	}
	
	gridRoot1.removeAll();
	gridRoot2.removeAll();
	gridRoot3.removeAll();
	gridRoot4.removeAll();
	selectedIndex1 = -1;
	selectedIndex2 = -1;
	selectedIndex3 = -1;
	selectedIndex4 = -1;
	
	btnSearchZone();
	
	if($("#top_search select[name=ZONE_CODE]").val() != ""){
		
		jQuery.ajax({ 
		    url:"/selectWmsInRack.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {
						'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
					,	'ZONE_CODE' : $("#top_search select[name=ZONE_CODE]").val()
					},
			success:function(data){  
				//gridApp1.setData(data);
				//alert(data);
				
				if(data != null && data.length > 0){
					for(var i=0 ; i < data.length ; i++){
						
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
						
						var INPUT_YN = xmlDoc.createElement("INPUT_YN");
						var ZONE_CODE = xmlDoc.createElement("ZONE_CODE");
						var RACK_CODE = xmlDoc.createElement("RACK_CODE");
						var RACK_NAME = xmlDoc.createElement("RACK_NAME");
						
						INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
						ZONE_CODE.appendChild(xmlDoc.createTextNode( data[i].ZONE_CODE ));
						RACK_CODE.appendChild(xmlDoc.createTextNode( data[i].RACK_CODE ));
						RACK_NAME.appendChild(xmlDoc.createTextNode( data[i].RACK_NAME ));
						
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_NAME);
						
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
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
			
	}	
	if($("#top_search select[name=RACK_CODE]").val() != ""){
		
		jQuery.ajax({ 
		    url:"/selectWmsInLine.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {
						'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
					,	'RACK_CODE' : $("#top_search select[name=RACK_CODE]").val()
					},
			success:function(data){  
				//gridApp1.setData(data);
				//alert(data);
				
				if(data != null && data.length > 0){
					for(var i=0 ; i < data.length ; i++){
						
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
						
						var INPUT_YN = xmlDoc.createElement("INPUT_YN");
						var RACK_CODE = xmlDoc.createElement("RACK_CODE");
						var LINE_CODE = xmlDoc.createElement("LINE_CODE");
						var LINE_NAME = xmlDoc.createElement("LINE_NAME");
						var AVAIL_INV_YN = xmlDoc.createElement("AVAIL_INV_YN");
						
						INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
						RACK_CODE.appendChild(xmlDoc.createTextNode( data[i].RACK_CODE ));
						LINE_CODE.appendChild(xmlDoc.createTextNode( data[i].LINE_CODE ));
						LINE_NAME.appendChild(xmlDoc.createTextNode( data[i].LINE_NAME ));
						AVAIL_INV_YN.appendChild(xmlDoc.createTextNode( data[i].AVAIL_INV_YN ));
						
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_NAME);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AVAIL_INV_YN);
						
						gridRoot3.addItemAt(  xmlDoc  , -1, false);
						
						//i (index) 입력하여 그리드 아이템 가져오기
						var selectedItem = gridRoot3.getItemAt(i);
						//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
						gridRoot3.removeChangedData(selectedItem);
					}
					
					dataGrid3.invalidateList();
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
		
	}
	if($("#top_search select[name=LINE_CODE]").val() != ""){
		
		jQuery.ajax({ 
		    url:"/selectWmsInCategory.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {
						'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
					,	'LINE_CODE' : $("#top_search select[name=LINE_CODE]").val()
					},
			success:function(data){  
				//gridApp1.setData(data);
				//alert(data);
				
				if(data != null && data.length > 0){
					for(var i=0 ; i < data.length ; i++){
						
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
						
						var INPUT_YN = xmlDoc.createElement("INPUT_YN");
						var LINE_CODE = xmlDoc.createElement("LINE_CODE");
						var CLS_CODE = xmlDoc.createElement("CLS_CODE");
						var CLS_NAME = xmlDoc.createElement("CLS_NAME");
						
						INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
						LINE_CODE.appendChild(xmlDoc.createTextNode( data[i].LINE_CODE ));
						CLS_CODE.appendChild(xmlDoc.createTextNode( data[i].CLS_CODE ));
						CLS_NAME.appendChild(xmlDoc.createTextNode( data[i].CLS_NAME ));
						
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_CODE);
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
						
						gridRoot4.addItemAt(  xmlDoc  , -1, false);
						
						//i (index) 입력하여 그리드 아이템 가져오기
						var selectedItem = gridRoot4.getItemAt(i);
						//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
						gridRoot4.removeChangedData(selectedItem);
					}
					
					dataGrid4.invalidateList();
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
		
	}
	
}

function deleteRow1(){
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	if(rowCnt2.length > 0){
		alert(msgExistChild);
		return;
	}
	
	var rowIndex = dataGrid1.getSelectedIndex();
	
	if (rowIndex >= 0){
		gridRoot1.removeItemAt(rowIndex);
		if(gridRoot1.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot1.setItemFieldAt( "D" , rowIndex, "INPUT_YN");
		}
	}	
}

function deleteRow2(){
	
	var rowCnt3 = gridRoot3.getCollection().getSource();
	if(rowCnt3.length > 0){
		alert(msgExistChild);
		return;
	}
	
	var rowIndex = dataGrid2.getSelectedIndex();
	
	if (rowIndex >= 0){
		gridRoot2.removeItemAt(rowIndex);
		if(gridRoot2.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "D" , rowIndex, "INPUT_YN");
		}
	}	
}

function deleteRow3(){
	
	var rowCnt4 = gridRoot4.getCollection().getSource();
	if(rowCnt4.length > 0){
		alert(msgExistChild);
		return;
	}
	
	var rowIndex = dataGrid3.getSelectedIndex();
	
	if (rowIndex >= 0){
		gridRoot3.removeItemAt(rowIndex);
		if(gridRoot3.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot3.setItemFieldAt( "D" , rowIndex, "INPUT_YN");
		}
	}	
}

function deleteRow4(){
	var rowIndex = dataGrid4.getSelectedIndex();
	
	if (rowIndex >= 0){
		gridRoot4.removeItemAt(rowIndex);
		if(gridRoot4.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot4.setItemFieldAt( "D" , rowIndex, "INPUT_YN");
		}
	}
}


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$(".col2 .box_rgt").css({marginLeft:'15px'});
	//$(".cnt1, .cnt2, .cnt3, .cnt4").width(($(window).width()-142)/4);
	$(".cnt1, .cnt4").width(($(window).width()-142)/4);
	$(".cnt2").width(($(window).width()-142)/4-20);
	$(".cnt3").width(($(window).width()-142)/4+20);
	$("#gridHolder1, #gridHolder2, #gridHolder3, #gridHolder4").height($(window).height() - 105);
	$(window).on('resize',function (){
		$(".col2 .box_rgt").css({marginLeft:'15px'});
		//$(".cnt1, .cnt2, .cnt3, .cnt4").width(($(window).width()-142)/4);
		$(".cnt1, .cnt4").width(($(window).width()-142)/4);
		$(".cnt2").width(($(window).width()-142)/4-20);
		$(".cnt3").width(($(window).width()-142)/4+20);
		$("#gridHolder1, #gridHolder2, #gridHolder3, #gridHolder4").height($(window).height() - 105);
	});
});

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
