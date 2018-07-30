/********************************************************
 * 설명:  콜센터주문등록
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2017.01.12
 * version : 1.0
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
	
	var GIFT_STR_DT =new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var GIFT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#GIFT_STR_DT').val(GIFT_STR_DT);
	$('#GIFT_END_DT').val(GIFT_END_DT);
	
	$("#GIFT_CMP_FLAG").change(function(){
		if($("#GIFT_CMP_FLAG").val() == "2"){
			$("#BTN_EVT").attr("disabled", false);
			$("#STR_CODE").attr("disabled", true);
			
			$("#PUBLISH_CNT").attr("disabled", true);
		}else if($("#GIFT_CMP_FLAG").val() == "3"){
			$("#PUBLISH_CNT").attr("disabled", false);
			
			$("#BTN_EVT").attr("disabled", true);
			$("#STR_CODE").attr("disabled", false);
		}else{
			$("#BTN_EVT").attr("disabled", true);
			$("#STR_CODE").attr("disabled", false);
			
			$("#PUBLISH_CNT").attr("disabled", true);
		}
		
		$("#PUBLISH_CNT").val("");
		$("#EVT_NAME").val("");
		$("#EVT_CODE").val("");
		$("#STR_CODE").val("");
	});
	
	//달력설정
	$(".datepicker").datepicker();
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
//rMateGridH5.create("grid2", "gridHolder2", jsVars+"&dataType=xml", "100%", "180px");
rMateGridH5.create("grid2", "gridHolder2", jsVars2+"&dataType=xml", "100%");

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp1.setLayout(layoutStr);
	gridApp1.setData(gridData1);
	
	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

function itemClickHandler1(event){
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	$("#GIFT_CMP_FLAG").val(dataRow1.GIFT_CMP_FLAG);
	$("#GIFT_CODE").val(dataRow1.GIFT_CODE);
	$("#GIFT_NAME").val(dataRow1.GIFT_NAME);
	$("#GIFT_STR_DT").val(dataRow1.GIFT_STR_DT);
	$("#GIFT_END_DT").val(dataRow1.GIFT_END_DT);
	$("#STR_CODE").val(dataRow1.STR_CODE);
	$("#REMARK").val(dataRow1.REMARK);
	$("#EVT_NAME").val(dataRow1.EVT_NAME);
	$("#EVT_CODE").val(dataRow1.EVT_CODE);
	$("#PUBLISH_CNT").val(dataRow1.PUBLISH_CNT);
	
	$("#GIFT_CMP_FLAG").attr("disabled", true);
	
	if(dataRow1.GIFT_CMP_FLAG == "2"){
		$("#BTN_EVT").attr("disabled", false);
	}else{
		$("#BTN_EVT").attr("disabled", true);
	}
	
	btnSearchItem();
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
	
	if(oldValue != newValue){
		if(gridRoot2.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "U" , rowIndex, "INPUT_YN");
		}
	}
	
	if(dataField == "BASE_MIN_AMT"){
		if(gridRoot2.getItemFieldAt(rowIndex, "BASE_MAX_AMT") != undefined || gridRoot2.getItemFieldAt(rowIndex, "BASE_MAX_AMT") != ""){
			if(Number(newValue) > Number(gridRoot2.getItemFieldAt(rowIndex, "BASE_MAX_AMT"))){
				alert("From 값이 To 값보다 클 수 없습니다.");
				gridRoot2.setItemFieldAt(undefined, rowIndex, "BASE_MIN_AMT");
				return;
			}
		}
	}
	
	if(dataField == "BASE_MAX_AMT"){
		if(gridRoot2.getItemFieldAt(rowIndex, "BASE_MIN_AMT") != undefined || gridRoot2.getItemFieldAt(rowIndex, "BASE_MIN_AMT") != ""){
			if(Number(newValue) < Number(gridRoot2.getItemFieldAt(rowIndex, "BASE_MIN_AMT"))){
				alert("To 값이 From 값보다 작을 수 없습니다.");
				gridRoot2.setItemFieldAt(undefined, rowIndex, "BASE_MAX_AMT");
				return;
			}
		}
	}
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
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2,dataRow2,clickData2,selectorColumn2, collection2, rowIndex2;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1">\
		<columns>\
			<DataGridColumn dataField="GIFT_NAME"  		headerText="' + giftName + '" textAlign="left" />\
			<DataGridColumn dataField="GIFT_STR_DT" 		headerText="' + giftStrDt + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="GIFT_END_DT"  		headerText="' + giftEndDt + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="GIFT_CODE"  		headerText="GIFT_CODE" visible="false" />\
			<DataGridColumn dataField="STR_CODE"  			headerText="STR_CODE" visible="false" />\
			<DataGridColumn dataField="GIFT_CMP_FLAG"	headerText="GIFT_CMP_FLAG" visible="false" />\
			<DataGridColumn dataField="POINT"  				headerText="POINT" visible="false" />\
			<DataGridColumn dataField="REMARK"  				headerText="REMARK" visible="false" />\
			<DataGridColumn dataField="EVT_CODE"  			headerText="EVT_CODE" visible="false" />\
			<DataGridColumn dataField="EVT_NAME"  			headerText="EVT_NAME" visible="false" />\
			<DataGridColumn dataField="PUBLISH_CNT"		headerText="PUBLISH_CNT" visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<PercentFormatter id="percfmt" useThousandsSeparator="true"/>\
		<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>\
		<DataGrid id="dg2" editable="true" horizontalScrollPolicy="auto" showDeletedRows="true">\
			<groupedColumns>\
				<DataGridRowStateColumn id="rowState" textAlign="center" visible="true"/>\
				<DataGridColumn id="INPUT_YN"						dataField="INPUT_YN"  headerText="INPUT_YN" textAlign="center" visible="false" />\
				<DataGridColumn id="GIFT_ITM_CODE"				dataField="GIFT_ITM_CODE"  headerText="GIFT_ITM_CODE" textAlign="center" visible="false" />\
				<DataGridColumn id="GIFT_ITM_NM"					dataField="GIFT_ITM_NM"  headerText="' + giftItmNm + '" textAlign="left" />\
				<DataGridColumn id="USE_YN"							dataField="USE_YN"  headerText="' + useYn + '" width="120" textAlign="center"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumnGroup headerText="지급기준(매출금액/원)">\
					<DataGridColumn id="BASE_MIN_AMT"				dataField="BASE_MIN_AMT"  headerText="' + giftBaseMinAmt + '" textAlign="right" formatter="{numfmt}" />\
					<DataGridColumn id="BASE_MAX_AMT"				dataField="BASE_MAX_AMT"  headerText="' + giftBaseMaxAmt + '" textAlign="right" formatter="{numfmt}" />\
				</DataGridColumnGroup>\
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
	
	$("#STR_CODE").append('<option value="">'+ select +'</option>');
	$("#STR_CODE").append('<option value="00000">전사</option>');
	getStoreCode("STR_CODE");
	
	$("#GIFT_CMP_FLAG").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("GIFT_CMP_FLAG", "GIFT_CMP_FLAG");
	
	getCommonCodeSelectBoxList("TGET_CUST", "TGET_CUST");
	
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	$('#comm_pop_wrap17' ).dialog( 'open' );
	gridApp26.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM17").val('fn_comm_event_callback(dataRow26)');
	
}

//(회원검색) 팝업 callback function
function fn_comm_event_callback (dataRow){
	
	//alert(dataRow);
	$("#EVT_CODE").val(dataRow.EVT_CODE);
	$("#EVT_NAME").val(dataRow.EVT_NAME);
	$("#STR_CODE").val(dataRow.STR_CODE);
	$("#GIFT_STR_DT").val(dataRow.EVT_STR_DT);
	$("#GIFT_END_DT").val(dataRow.EVT_END_DT);
	
}


//행추가
function addRow(){
	
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
	var GIFT_ITM_CODE = xmlDoc.createElement("GIFT_ITM_CODE");
	var GIFT_ITM_NM = xmlDoc.createElement("GIFT_ITM_NM");
	var USE_YN = xmlDoc.createElement("USE_YN");
	var BASE_MIN_AMT = xmlDoc.createElement("BASE_MIN_AMT");
	var BASE_MAX_AMT = xmlDoc.createElement("BASE_MAX_AMT");
	
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	GIFT_ITM_CODE.appendChild(xmlDoc.createTextNode( '' ));
	GIFT_ITM_NM.appendChild(xmlDoc.createTextNode( '' ));
	USE_YN.appendChild(xmlDoc.createTextNode( '' ));
	BASE_MIN_AMT.appendChild(xmlDoc.createTextNode( '' ));
	BASE_MAX_AMT.appendChild(xmlDoc.createTextNode( '' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(GIFT_ITM_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(GIFT_ITM_NM);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_MIN_AMT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_MAX_AMT);
	
	gridRoot2.addItemAt(  xmlDoc  , -1, false);
	
}

function deleteRow(){
	
	if (rowIndex2 >= 0){
		gridRoot2.removeItemAt(rowIndex2);
		if(gridRoot2.getItemFieldAt(rowIndex2, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "D" , rowIndex2, "INPUT_YN");
		}
	}	
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

//조회 항목 초기화
function btnNew(){
	
	//grid1 셀렉트 된 내용 초기화
	dataGrid1.setSelectedIndex(-1);
	dataRow1 = "";
	
	gridRoot2.removeAll();
	
	$("#GIFT_CMP_FLAG").val("");
	$("#GIFT_CODE").val("");
	$("#GIFT_NAME").val("");
	$("#GIFT_STR_DT").val("");
	$("#GIFT_END_DT").val("");
	$("#STR_CODE").val("");
	$("#REMARK").val("");
	$("#EVT_NAME").val("");
	$("#EVT_CODE").val("");
	$("#PUBLISH_CNT").val("");
	
	$("#BTN_EVT").attr("disabled", true);
	$("#PUBLISH_CNT").attr("disabled", true);
	
	$("#GIFT_CMP_FLAG").attr("disabled", false);
	
}

function btnSearch(){
	
	btnNew();
	
	//로딩바 출력
	showLoadingBar1();
	
	jQuery.ajax({ 
	    url:"/selectBusinessGiftMaster.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'P_GIFT_NAME' : $("#top_search input[name=P_GIFT_NAME]").val()
		        }, 
		success:function(data){   
			gridApp1.setData(data);
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

function btnSearchItem(){
	
	gridRoot2.removeAll();
	
	//로딩바 출력
	showLoadingBar2();
	
	jQuery.ajax({ 
	    url:"/selectGiftItem.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'P_GIFT_CODE' : dataRow1.GIFT_CODE
		        }, 
		success:function(data){   
			//gridApp1.setData(data);
			
			if(data.length > 0){
				
				for(var i=0; i < data.length; i++){
					
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
					var GIFT_ITM_CODE = xmlDoc.createElement("GIFT_ITM_CODE");
					var GIFT_ITM_NM = xmlDoc.createElement("GIFT_ITM_NM");
					var USE_YN = xmlDoc.createElement("USE_YN");
					var BASE_MIN_AMT = xmlDoc.createElement("BASE_MIN_AMT");
					var BASE_MAX_AMT = xmlDoc.createElement("BASE_MAX_AMT");
					
					INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
					GIFT_ITM_CODE.appendChild(xmlDoc.createTextNode( data[i].GIFT_ITM_CODE ));
					GIFT_ITM_NM.appendChild(xmlDoc.createTextNode( data[i].GIFT_ITM_NM ));
					USE_YN.appendChild(xmlDoc.createTextNode( data[i].USE_YN ));
					BASE_MIN_AMT.appendChild(xmlDoc.createTextNode( data[i].BASE_MIN_AMT ));
					BASE_MAX_AMT.appendChild(xmlDoc.createTextNode( data[i].BASE_MAX_AMT ));
					
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(GIFT_ITM_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(GIFT_ITM_NM);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_MIN_AMT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_MAX_AMT);
					
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

function btnSave(){
	
	if($("#GIFT_CMP_FLAG").val() == ""){
		//사은행사구분은(는) 필수 입력항목입니다.
		alert(giftCmpFlag + msgConfirm);
		return;
	}
	
	if($("#GIFT_NAME").val() == ""){
		//행사명은(는) 필수 입력항목입니다.
		alert(giftName + msgConfirm);
		return;
	}
	
	if($("#GIFT_STR_DT").val() == "" || $("#GIFT_END_DT").val() == ""){
		alert(giftDt + msgConfirm);
		return;
	}
	
	if($("#TGET_CUST").val() == ""){
		alert(tgetCust + msgConfirm);
		return;
	}
	
	if($("#STR_CODE").val() == ""){
		alert(tgetStr + msgConfirm);
		return;
	}
	
	if($("#GIFT_CMP_FLAG").val() == "2"){
		if($("#EVT_NAME").val() == ""){
			alert(giftName + msgConfirm);
			return;
		}
	}
	
	if($("#GIFT_CMP_FLAG").val() == "3"){
		if($("#PUBLISH_CNT").val() == ""){
			alert(publishCnt + msgConfirm);
			return;
		}
	}
	
	var giftStrDt = $("#GIFT_STR_DT").val().split("-");
	var giftEndDt = $("#GIFT_END_DT").val().split("-");
	
	if(Number(giftStrDt[0] + giftStrDt[1] + giftStrDt[2]) > Number(giftEndDt[0] + giftEndDt[1] + giftEndDt[2])){
		alert(msgEventDateValidation);
		return;
	} 
	
	var gridXmlData = "";
	
	var rowCnt = gridRoot2.getCollection().getSource();
	
	var updateRowCnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			if(gridRoot2.getItemFieldAt(i, "GIFT_ITM_NM") == "" || gridRoot2.getItemFieldAt(i, "GIFT_ITM_NM") == undefined ||
					gridRoot2.getItemFieldAt(i, "USE_YN") == "" || gridRoot2.getItemFieldAt(i, "USE_YN") == undefined ||
					gridRoot2.getItemFieldAt(i, "BASE_MIN_AMT") == "" || gridRoot2.getItemFieldAt(i, "BASE_MIN_AMT") == undefined ||
					gridRoot2.getItemFieldAt(i, "BASE_MAX_AMT") == "" || gridRoot2.getItemFieldAt(i, "BASE_MAX_AMT") == undefined){
				alert("사은품 정보에 공백인 값이 존재합니다.");
				return;
			}
			gridXmlData = gridXmlData + getXmlString(   gridRoot2.getItemAt(i)   );
			updateRowCnt++;
		}
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ;
	
	jQuery.ajax({ 
	    url:"/registBusinessGiftMaster.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {
					'P_GIFT_CODE' : $("#GIFT_CODE").val()
				,	'P_GIFT_NAME' : $("#GIFT_NAME").val()
				,	'P_STR_CODE' : $("#STR_CODE").val()
				,	'P_GIFT_CMP_FLAG' : $("#GIFT_CMP_FLAG").val()
				,	'P_GIFT_STR_DT' : $("#GIFT_STR_DT").val()
				,	'P_GIFT_END_DT' : $("#GIFT_END_DT").val()
				,	'P_TGET_CUST' : $("#TGET_CUST").val()
				,	'P_REMARK' : $("#REMARK").val()
				,	'P_PUBLISH_CNT' : $("#PUBLISH_CNT").val()
				,	'P_EVT_CODE' : $("#EVT_CODE").val()
				,	'GRID_XML_DATA' : gridXmlData
		        }, 
		success:function(data){   
			
			btnNew();
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

function btnChooseInsert(STR_CODE, ITM_CODE){
	jQuery.ajax({ 
	    url:"/businessCallSelectProduct2.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : STR_CODE
				,	'ITM_CODE' : ITM_CODE
				},
		success:function(data){
			if(data != null && data.length > 0){
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
				var STR_CODE = xmlDoc.createElement("STR_CODE");
				var ITM_NAME = xmlDoc.createElement("ITM_NAME");
				var ORD_QTY = xmlDoc.createElement("ORD_QTY");
				var IPSU_QTY = xmlDoc.createElement("IPSU_QTY");
				var INV_END_QTY = xmlDoc.createElement("INV_END_QTY");
				var ITM_CODE = xmlDoc.createElement("ITM_CODE");
				var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
				var UNIT = xmlDoc.createElement("UNIT");
				var WPRC = xmlDoc.createElement("WPRC");
				var SPRC = xmlDoc.createElement("SPRC");
				var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
				var REMARK = xmlDoc.createElement("REMARK");
				
				INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
				STR_CODE.appendChild(xmlDoc.createTextNode( '' ));
				ITM_NAME.appendChild(xmlDoc.createTextNode( data[0].ITM_NAME ));
				ORD_QTY.appendChild(xmlDoc.createTextNode( '' ));
				IPSU_QTY.appendChild(xmlDoc.createTextNode( data[0].IPSU_QTY ));
				INV_END_QTY.appendChild(xmlDoc.createTextNode( data[0].INV_END_QTY ));
				ITM_CODE.appendChild(xmlDoc.createTextNode( data[0].ITM_CODE ));
				SCAN_CODE.appendChild(xmlDoc.createTextNode( data[0].SCAN_CODE ));
				UNIT.appendChild(xmlDoc.createTextNode( data[0].UNIT ));
				WPRC.appendChild(xmlDoc.createTextNode( data[0].WPRC ));
				SPRC.appendChild(xmlDoc.createTextNode( data[0].SPRC ));
				EVT_SPRC.appendChild(xmlDoc.createTextNode( data[0].EVT_SPRC ));
				REMARK.appendChild(xmlDoc.createTextNode( '' ));
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_QTY);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IPSU_QTY);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);
				
				gridRoot2.addItemAt(  xmlDoc  , -1);
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
$(document).ready(function (){
	$(".lft_wid").width(450);
	$(".rgt_wid").width($(window).width()-508);
	
	$("#gridHolder1").height($(window).height()-108);
	$("#gridHolder2").height($(window).height()-365);

	$(window).on('resize',function (){	
		$(".lft_wid").width(450);
		$(".rgt_wid").width($(window).width()-508);
		
		$("#gridHolder1").height($(window).height()-108);
		$("#gridHolder2").height($(window).height()-365);		
	});
});

/*$(document).ready(function (){
	$(".lft_wid").width(250);
	$(".rgt_wid").width($(window).width()-308);
	
	$("#gridHolder1").height($(window).height()-108);
	$("#gridHolder2").height($(window).height()-391);

	$(window).on('resize',function (){	
		$(".lft_wid").width(250);
		$(".rgt_wid").width($(window).width()-308);
		
		$("#gridHolder1").height($(window).height()-108);
		$("#gridHolder2").height($(window).height()-391);		
	});
});*/

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
