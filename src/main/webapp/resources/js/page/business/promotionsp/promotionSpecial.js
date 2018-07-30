/********************************************************
 * 설명:  프로모션특단가 상품관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 이성진
 * since	: 2017.03.24
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

var V_REG_FLAG = ""; //insert,update flag
var V_STR_CODE_BF = "";
var V_STR_DT_BF ="";

var V_CST_USE_FLAG = "";

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
	
	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeMonthDate = new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var STR_DT =new CommDateManager().getDate("yyyy-mm-dd"); // 
	
	$('#S_STR_DT').val(STR_DT);
	$("#STR_DT").val(STR_DT);
	$("#END_DT").val(STR_DT);

	//달력설정
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var startDate = parseInt($("#STR_DT").val().replace(/-/g, ""));
			var endDate = parseInt($("#END_DT").val().replace(/-/g, ""));
			if(startDate > endDate)
			{
				alert("입력 날자기간의 종료일이 시작일 보다 작을 수 없습니다.");
				
				if(this.id == "STR_DT")
					$("#STR_DT").val(beforeMonthDate);
				else if(this.id == "END_DT")
					$("#END_DT").val(lsToDate);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
	
	//엔터로 검색창 오픈
	$("#S_CUST_NAME").keydown(function(key) {
		$("#S_CUST_NO").val("");
		if(key.keyCode == 13){
			btn_comm_user_search('S');
		}
	});
	
	$("#CUST_NAME").keydown(function(key) {
		if(key.keyCode == 13){
			btn_comm_user_search('R');
		}
	});
	
	$("#ITM_NAME").keydown(function(key) {
		if(key.keyCode == 13){
			btn_comm_product_search();
		}
	});
	
	// 팝업 초기설정
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 1000,
	    resizable : false,
	    open: function(){
		$("body").css("overflow-y", "hidden");
	    },
	    close: function(){
		$("body").css("overflow-y", "scroll");
	    }
	});
	
	$( "#dialog-confirm" ).dialog({
	      dialogClass: 'dialog_confirm',		
	      resizable: false,
	      autoOpen : false,
	      height: "auto",
	      width: 400,
	      modal: true,
	      buttons: [
	                {
	                	text: "예",
	                	"class": 'btn btn_style4',
	                	"style" : "width:100px;",
	                	click: function(){
	                		$(this).dialog("close");
	                		$("#SCAN_CODE").val("");
	                		$("#ITM_NAME").val("");
	                		$("#ITM_CODE").val("");
	                		var STR_DT = new CommDateManager().getDate("yyyy-mm-dd");
	                		var END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	                		$('#STR_DT').val(STR_DT);
	                		$("#END_DT").val(END_DT);
	                		$("#SPECIAL_SPRC").val(0);
	                		$("#WPRC").val("");
	                		$("#BASE_WPRC").val("");
	                		$("#BASE_SPRC").val("");
	                	}
	                },
	                {
	                	text: "아니오",
	                	"class": 'btn btn_style4',
	                	"style" : "width:100px;",
	                	click: function(){
	                		$(this).dialog("close");
	                		btn_close();
	                	}	   
	                }
	        ]
	    });
		$(".ui-dialog-buttonset").css({textAlign:"center", margin:"5px 0 5px 0"});
		$(".ui-dialog-buttonset").children().first().css({marginRight:"4px"});
		$("#dialog-confirm").css({border:0,paddingTop:"5px",lineHeight:7});
		$("#dialog-confirm").find("p").css({textAlign:"center"});
		$("#dialog-confirm").find("p").children().css({float:"initial",margin:0});
		$("#dialog-confirm").next().css({border:0});

});


// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";
var jsVars3 = "rMateOnLoadCallFunction=gridReadyHandler3";

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
rMateGridH5.create("grid3", "gridHolder3", jsVars3, "200px", "350px");

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
	
	$("#CUST_NO").val(dataRow1.CUST_NO);
	$("#CUST_NAME").val(dataRow1.CUST_NAME);
	$("#CUST_NAME").attr("disabled", true);
	$("#btnCustName").attr("disabled", true);
	
	btnSearchItem(rowIndex);
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
	gridApp2.setDataType("xml");
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
	
	//그리드1 셀선택 이벤트
	//dataGrid2.addEventListener("itemClick", itemClickHandler2);
	
}

function itemClickHandler2(event){
	
	var rowIndex = event.rowIndex;
	dataRow = gridRoot2.getItemAt(rowIndex);
	V_REG_FLAG = "U";
	$('#CUST_NO').val(dataRow["CUST_NO"]);
	$('#CUST_NAME').val(dataRow["CUST_NAME"]);
	$('#STR_CODE').val(dataRow["STR_CODE"]);  //
	$('#SCAN_CODE').val(dataRow["SCAN_CODE"]);
	$('#ITM_NAME').val(dataRow["ITM_NAME"]);
	$('#STR_DT').val(dataRow["STR_DT"]);
	$('#END_DT').val(dataRow["END_DT"]);
	$('#SPECIAL_SPRC').val(dataRow["SPECIAL_SPRC"]);
	$('#RMK').val(dataRow["RMK"]);	
	$('#WPRC').val("");
	
	V_STR_CODE_BF = dataRow["STR_CODE"];
	V_STR_DT_BF   = dataRow["STR_DT"];
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
	
	if(dataField == "SPECIAL_SPRC"){
		
		if(gridRoot2.getItemFieldAt(rowIndex, "SPECIAL_SPRC") == "" || gridRoot2.getItemFieldAt(rowIndex, "SPECIAL_SPRC") == undefined) return;
		
		var pWPRC = Number(gridRoot2.getItemFieldAt(rowIndex, "WPRC"));
		var pSPECIAL_SPRC = Number(gridRoot2.getItemFieldAt(rowIndex, "SPECIAL_SPRC"));
		var pBENEFIT = (pSPECIAL_SPRC-pWPRC)/pSPECIAL_SPRC*100;
		
		gridRoot2.setItemFieldAt( pBENEFIT.toFixed(2) , rowIndex, "BENEFIT");
	}
	
	if(dataField == "END_DT"){
		//var startDate = parseInt($("#STR_DT").val().replace(/-/g, ""));
		//var endDate = parseInt($("#END_DT").val().replace(/-/g, ""));
		var startDate = gridRoot2.getItemFieldAt(rowIndex, "STR_DT");
		var endDate = gridRoot2.getItemFieldAt(rowIndex, "END_DT");
		
		startDate = startDate.replace(/[^0-9]/g, "");
		endDate = endDate.replace(/[^0-9]/g, "");
		
		if(Number(startDate) > Number(endDate)){
			alert("입력 날자기간의 종료일이 시작일 보다 작을 수 없습니다.");
			gridRoot2.setItemFieldAt( oldValue , rowIndex, "END_DT");
		}
	}
}

//GRID3 Event Handler
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

//그리드3 컴플릿트 핸들러
function dataCompleteHandler3(event) {
	
	// 그리드 객체
	dataGrid3 = gridRoot3.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection3 = gridRoot3.getCollection();
	
	//그리드3 셀선택 이벤트
	//dataGrid3.addEventListener("itemClick", itemClickHandler3);
	
}




//그리드1 데이터 초기화
var gridData1 = [];
var gridData2 = [];
var gridData3 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2,dataRow2,clickData2,selectorColumn2, collection2, rowIndex2;
var gridApp3, gridRoot3, dataGrid3, dataRow3,clickData3,selectorColumn3;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="CUST_NO"  		headerText="'+cstCode+'" 	sortable="true"	textAlign="center" width="70" />\
			<DataGridColumn dataField="CUST_NAME" 		headerText="'+cusName+'" 	sortable="true"	textAlign="center" width="85" />\
			<DataGridColumn dataField="MBR_GRADE_NM" 	headerText="'+grade+'" 		sortable="true"	textAlign="center" width="75" />\
			<DataGridColumn dataField="STR_NAME" 		headerText="'+cstStr+'" 	sortable="true"	textAlign="center" width="65" />\
			<DataGridColumn dataField="STR_CODE" 		headerText="관리코드" 		textAlign="center" visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<PercentFormatter id="percfmt" useThousandsSeparator="true"/>\
		<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg2" sortableColumns="true" editable="true" horizontalScrollPolicy="auto" showDeletedRows="true">\
			<columns>\
				<DataGridRowStateColumn id="rowState" 		dataField=" " textAlign="center" visible="true"/>\
				<DataGridColumn id="INPUT_YN"			dataField="INPUT_YN"  headerText="INPUT_YN" textAlign="center" visible="false" />\
				<DataGridColumn id="NUM" 				dataField="NUM"  				headerText="'+rowNumber+'" 	sortable="true"	textAlign="center" width="43" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="CUST_NAME" 		dataField="CUST_NAME" 	headerText="'+cusName+'" 	sortable="true"	textAlign="center" width="85" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="STR_NAME" 		dataField="STR_NAME" 		headerText="'+tgetStr+'" 	sortable="true"	textAlign="center" width="70" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="ITM_CODE" 		dataField="ITM_CODE" 		headerText="'+itmCode+'" 	sortable="true"	textAlign="center" width="100" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="SCAN_CODE" 		dataField="SCAN_CODE" 	headerText="'+scanCode+'" 	sortable="true"	textAlign="center" width="100" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="ITM_NAME" 		dataField="ITM_NAME" 		headerText="'+itmName+'" 	sortable="true"	textAlign="left"  editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="STR_DT" 			dataField="STR_DT" 			headerText="'+appStrDay+'" 	sortable="true"	textAlign="center" width="85" itemEditor="DateEditor" formatter="{datefmt}" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="END_DT" 			dataField="END_DT" 			headerText="'+appEndDay+'" 	sortable="true"	textAlign="center" width="85" itemEditor="DateEditor" formatter="{datefmt}" />\
				<DataGridColumn id="WPRC" 				dataField="WPRC" 				headerText="'+baseWPRC+'" 	sortable="true"	textAlign="right"  width="70" formatter="{numfmt}" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="SPRC" 				dataField="SPRC" 				headerText="'+salePrc+'" 	sortable="true"	textAlign="right"  width="70" formatter="{numfmt}" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="SPECIAL_SPRC"	dataField="SPECIAL_SPRC" 	headerText="'+dcPrc+'" 		sortable="true"	textAlign="right"  width="70" formatter="{numfmt}"/>\
				<DataGridColumn id="BENEFIT" 			dataField="BENEFIT" 			headerText="'+ProfitRt+'" 	sortable="true"	textAlign="right"  width="80" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="CORP_CODE" 		dataField="CORP_CODE" 	headerText="회사코드"		textAlign="center" visible="false" />\
				<DataGridColumn id="STR_CODE" 		dataField="STR_CODE" 		headerText="점포코드"		textAlign="center" visible="false" />\
				<DataGridColumn id="STR_DATE" 		dataField="STR_DATE" 		headerText="적용일자"		textAlign="center" visible="false" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
		<DataGrid id="dg3">\
			<columns>\
				<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="' + storCode + '" textAlign="left" />\
				<DataGridColumn dataField="STR_NAME" headerText="' + storNm + '" textAlign="left" />\
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
	
	$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
	
	//$("#S_STR_CODE").append('<option value="">'+ select +'</option>');
	$("#top_search select[name=S_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("S_STR_CODE");

	$("#STR_CODE").append('<option value="">'+ select +'</option>');
	getStoreCode("STR_CODE");	
	
	$('#SPECIAL_SPRC').number( true, 0 ); 

	
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   				   ###
//########################################################




//(회원검색) 팝업 호출 function
function btn_comm_user_search(v_flag){
	
	//조회- 팝업
	if (v_flag == "S"){
		
		$("#S_CUST_NAME").focus();
		
		/*V_CST_USE_FLAG = "S"; //조회
		$('#comm_pop_wrap1' ).dialog( 'open' );
		gridApp10.resize();*/
		
		$("#comm_pop_wrap1").dialog("open");
		gridApp10.resize();
		
		// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
		//$("#P_CALLBACK_NM1").val("fn_comm_user_callback"(dataRow10)");
		$("#P_CALLBACK_NM1").val('fn_comm_user_callback_top(dataRow10)');
		
		// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
		if($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != ""){
			$("#P_TEXT1").val($("#S_CUST_NAME").val());
			btn_comm_search('1');
		}
		
	//등록-팝업
	}else{
		
		$("#CUST_NAME").focus();
		
		V_CST_USE_FLAG = "R";
		//신규입력일경우에만 회원입력가능
		if (V_REG_FLAG == "I"){ 
			$('#comm_pop_wrap1' ).dialog( 'open' );
			gridApp10.resize();		
			
			$("#P_CALLBACK_NM1").val('fn_comm_user_callback_body(dataRow10)');
			
			// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
			if($("#CUST_NAME").val() != null && $("#CUST_NAME").val() != ""){
				$("#P_TEXT1").val($("#CUST_NAME").val());
				btn_comm_search('1');
			}
		}		
	}


}

//(회원검색) 팝업 callback function
function fn_comm_user_callback_top(dataRow){
	$('#S_CUST_NAME' ).val(dataRow.CUST_NAME);		// 회원명
	$('#S_CUST_NO' ).val(dataRow.CUST_NO);			// 회원번호
}
function fn_comm_user_callback_body(dataRow){
	$('#CUST_NAME' ).val(dataRow.CUST_NAME);		// 회원명
	$('#CUST_NO' ).val(dataRow.CUST_NO);			// 회원번호
}

//상품선택 팝업
function btn_comm_product_search(){
	
	//신규입력일경우에만 회원입력가능
	if (V_REG_FLAG == "I"){ 
		$('#comm_pop_wrap2' ).dialog( 'open' );
		gridApp11.resize();		
		
		// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
		if($("#ITM_NAME").val() != null && $("#ITM_NAME").val() != ""){
			$("#P_TEXT2").val($("#ITM_NAME").val());
			btn_comm_search('2');
		}
		
	}

	
}
//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){

	$('#SCAN_CODE' ).val(dataRow.SCAN_CODE);			// 상품코드
	$('#ITM_CODE' ).val(dataRow.SCAN_CODE);
	$('#ITM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
	$('#WPRC' ).val(baseWprc+":"+dataRow.BASE_WPRC);	// 기준원가
	$('#BASE_SPRC' ).val(dataRow.BASE_SPRC);
	$('#BASE_WPRC' ).val(dataRow.BASE_WPRC);

}

function fnChangeable(gubun){
	if (V_REG_FLAG == "U"){
		if (gubun == "STR_CODE"){
			alert(promMessg13); //등록된 특단가상품정보의 대상점포는 변경할수 없습니다.
			$('#STR_CODE').val(V_STR_CODE_BF);
			return;			
		}else{
			alert(promMessg14); //등록된 특단가상품정보의 적용시작일자는 변경할수 없습니다.
			$('#STR_DT').val(V_STR_DT_BF);
			return;	
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

//초기화
function btnNew(){
	
	fnClear();
	addRow();
}

function fnClear(){
	//grid1 셀렉트 된 내용 초기화
	dataGrid1.setSelectedIndex(-1);
	dataRow1 = "";
	
	//입력항목 초기화
	V_REG_FLAG = "I";
	
	$("#CUST_NO").val("");
	$("#CUST_NAME").val("");
	
	$("#CUST_NAME").attr("disabled", false);
	$("#btnCustName").attr("disabled", false);
	
	//$("#STR_CODE").val("");
	$("#SCAN_CODE").val("");
	$("#ITM_NAME").val("");
	$("#ITM_CODE").val("");
	var STR_DT = new CommDateManager().getDate("yyyy-mm-dd");
	var END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	$('#STR_DT').val(STR_DT);
	$("#END_DT").val(END_DT);
	$("#SPECIAL_SPRC").val(0);
	$("#WPRC").val("");
	$("#BASE_SPRC").val("");
	$("#BASE_WPRC").val("");
	
	//grid clear
	gridRoot2.removeAll();
}

/*
 * 특단가 회원 조회
 */
function btnSearch(){
	
	fnClear();
	
	//로딩바 출력
	showLoadingBar1();
	
	jQuery.ajax({ 
	    url:"/selectPromotionSpecialCustom.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'P_STR_CODE' : $("#S_STR_CODE").val()
				,   'P_CUST_NO'  : $("#S_CUST_NO").val()
				,   'P_STR_DT'   : $("#S_STR_DT").val()
		        }, 
		success:function(data){   

			gridData = data.list; 
			gridApp1.setData(data.list);
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


function btnSearchItem(rowIndex){

	gridRoot2.removeAll();
	
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	var CUST_NO  = dataRow1["CUST_NO"];
		
	//로딩바 출력
	showLoadingBar2();
	
	jQuery.ajax({ 
	    url:"/selectPromotionSpecialItem.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
				'P_CUST_NO'  : CUST_NO
				},
		success:function(data){
			
			//gridApp2.setData(data);
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
					var NUM = xmlDoc.createElement("NUM");
					var CUST_NAME = xmlDoc.createElement("CUST_NAME");
					var STR_NAME = xmlDoc.createElement("STR_NAME");
					var ITM_CODE = xmlDoc.createElement("ITM_CODE");
					var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
					var ITM_NAME = xmlDoc.createElement("ITM_NAME");
					var STR_DT = xmlDoc.createElement("STR_DT");
					var END_DT = xmlDoc.createElement("END_DT");
					var WPRC = xmlDoc.createElement("WPRC");
					var SPRC = xmlDoc.createElement("SPRC");
					var SPECIAL_SPRC = xmlDoc.createElement("SPECIAL_SPRC");
					var BENEFIT = xmlDoc.createElement("BENEFIT");
					var CORP_CODE = xmlDoc.createElement("CORP_CODE");
					var STR_CODE = xmlDoc.createElement("STR_CODE");
					var STR_DATE = xmlDoc.createElement("STR_DATE");
					
					INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
					NUM.appendChild(xmlDoc.createTextNode( i+1 ));
					CUST_NAME.appendChild(xmlDoc.createTextNode( data[i].CUST_NAME ));
					STR_NAME.appendChild(xmlDoc.createTextNode( data[i].STR_NAME ));
					ITM_CODE.appendChild(xmlDoc.createTextNode( data[i].ITM_CODE ));
					SCAN_CODE.appendChild(xmlDoc.createTextNode( data[i].SCAN_CODE ));
					ITM_NAME.appendChild(xmlDoc.createTextNode( data[i].ITM_NAME ));
					STR_DT.appendChild(xmlDoc.createTextNode( data[i].STR_DT ));
					END_DT.appendChild(xmlDoc.createTextNode( data[i].END_DT ));
					WPRC.appendChild(xmlDoc.createTextNode( data[i].WPRC ));
					SPRC.appendChild(xmlDoc.createTextNode( data[i].SPRC ));
					SPECIAL_SPRC.appendChild(xmlDoc.createTextNode( data[i].SPECIAL_SPRC ));
					BENEFIT.appendChild(xmlDoc.createTextNode( data[i].BENEFIT ));
					CORP_CODE.appendChild(xmlDoc.createTextNode( '' ));
					STR_CODE.appendChild(xmlDoc.createTextNode( data[i].STR_CODE ));
					STR_DATE.appendChild(xmlDoc.createTextNode( data[i].STR_DATE ));
					
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(NUM);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CUST_NAME);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_DT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(END_DT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WPRC);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPECIAL_SPRC);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BENEFIT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CORP_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_DATE);
					
					gridRoot2.addItemAt(  xmlDoc  , -1, false);
					
					//i (index) 입력하여 그리드 아이템 가져오기
					var selectedItem = gridRoot2.getItemAt(i);
					//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
					gridRoot2.removeChangedData(selectedItem);
				}
				
				//그리드 속성 refresh
				dataGrid2.invalidateList();
			}
			
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar2();
	    	//if (rowIndex > 0){
	    	//	selectPromotionItem(0);
	    	//}	    	
	    	
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar2();
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function btnRegist(){
	
	if($("#CUST_NO").val() == ""){
		alert(cusNo + msgConfirm);
		return;
	}else if($("#STR_CODE").val() == ""){
		alert(tgetStr + msgConfirm);
		return;
	}else if($("#SCAN_CODE").val() == ""){
		alert(itmCode + msgConfirm);
		return;		
	}else if($("#ITM_NAME").val() == ""){
		alert(itmName + msgConfirm);
		return;		
	}else if($("#STR_DT").val() == ""){
		alert(appStrDay + msgConfirm);
		return;		
	}else if($("#END_DT").val() == ""){
		alert(appEndDay + msgConfirm);
		return;		
	}else if($("#SPECIAL_SPRC").val() == ""){
		alert(dcAmt + msgConfirm);
		return;		
	}
	
	var selectorColumn = gridRoot3.getObjectById("selector");
	var selectedStrore = selectorColumn.getSelectedIndices();
	
	if(selectedStrore.length < 1){
		alert(storeName + msgConfirm);
		return;
	}
	
	for(var i=0; i < selectedStrore.length ; i++){
		
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
		
		var INPUT_YN = xmlDoc.createElement("INPUT_YN");
		var NUM = xmlDoc.createElement("NUM");
		var CUST_NAME = xmlDoc.createElement("CUST_NAME");
		var STR_NAME = xmlDoc.createElement("STR_NAME");
		var ITM_CODE = xmlDoc.createElement("ITM_CODE");
		var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
		var ITM_NAME = xmlDoc.createElement("ITM_NAME");
		var STR_DT = xmlDoc.createElement("STR_DT");
		var END_DT = xmlDoc.createElement("END_DT");
		var WPRC = xmlDoc.createElement("WPRC");
		var SPRC = xmlDoc.createElement("SPRC");
		var SPECIAL_SPRC = xmlDoc.createElement("SPECIAL_SPRC");
		var BENEFIT = xmlDoc.createElement("BENEFIT");
		var CORP_CODE = xmlDoc.createElement("CORP_CODE");
		var STR_CODE = xmlDoc.createElement("STR_CODE");
		var STR_DATE = xmlDoc.createElement("STR_DATE");
		
		INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
		NUM.appendChild(xmlDoc.createTextNode( rowCnt2.length+1 ));
		CUST_NAME.appendChild(xmlDoc.createTextNode( $("#CUST_NAME").val() ));
		STR_NAME.appendChild(xmlDoc.createTextNode( gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_NAME") ));
		ITM_CODE.appendChild(xmlDoc.createTextNode( $("#ITM_CODE").val() ));
		SCAN_CODE.appendChild(xmlDoc.createTextNode( $("#SCAN_CODE").val() ));
		ITM_NAME.appendChild(xmlDoc.createTextNode( $("#ITM_NAME").val() ));
		STR_DT.appendChild(xmlDoc.createTextNode( $("#STR_DT").val() ));
		END_DT.appendChild(xmlDoc.createTextNode( $("#END_DT").val() ));
		WPRC.appendChild(xmlDoc.createTextNode( $("#BASE_WPRC").val() ));
		SPRC.appendChild(xmlDoc.createTextNode( $("#BASE_SPRC").val() ));
		SPECIAL_SPRC.appendChild(xmlDoc.createTextNode( $("#SPECIAL_SPRC").val() ));
		
		var pWPRC = Number($("#BASE_WPRC").val());
		var pSPECIAL_SPRC = Number($("#SPECIAL_SPRC").val());
		var pBENEFIT = (pSPECIAL_SPRC-pWPRC)/pSPECIAL_SPRC*100;
		
		BENEFIT.appendChild(xmlDoc.createTextNode( pBENEFIT.toFixed(2) ));
		CORP_CODE.appendChild(xmlDoc.createTextNode( '' ));
		STR_CODE.appendChild(xmlDoc.createTextNode( gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_CODE") ));
		STR_DATE.appendChild(xmlDoc.createTextNode( '' ));
		
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(NUM);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CUST_NAME);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_DT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(END_DT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WPRC);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPECIAL_SPRC);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BENEFIT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CORP_CODE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_DATE);
		
		gridRoot2.addItemAt(  xmlDoc  , -1, false);
		
	}
	
	$("#dialog-confirm").dialog( "open" );
	
}

var myVar = "";
function btnSaveCheck() {
    myVar = setTimeout(btnSave, 500);
}

function btnSave(){
	
	if($("#STR_DT").val().replace(/-/g,"") > $("#END_DT").val().replace(/-/g,"")){
		alert(promMessg15);//"적용시작일이  종료일보다 클수 없습니다."
		$('#STR_DT').focus();
		return;		
	}
	
	var gridXmlData = "";
	var rowCnt = gridRoot2.getCollection().getSource();
	
	var updateRowCnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "SPECIAL_SPRC") == "" || gridRoot2.getItemFieldAt(i, "SPECIAL_SPRC") == "0" || gridRoot2.getItemFieldAt(i, "SPECIAL_SPRC") == undefined){
			alert("할인매가가 공백인 항목은 등록할 수 없습니다.");
			return;
		}
		if(gridRoot2.getItemFieldAt(i, "STR_DT") == "" || gridRoot2.getItemFieldAt(i, "STR_DT") == undefined ||
				gridRoot2.getItemFieldAt(i, "END_DT") == "" || gridRoot2.getItemFieldAt(i, "END_DT") == undefined){
			alert("적용일자가 공백인 항목은 등록할 수 없습니다.");
			return;
		}
		
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData = gridXmlData + getXmlString(   gridRoot2.getItemAt(i)   );
			updateRowCnt++;
		}
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ;

	jQuery.ajax({ 
	    url:"/promotionSpecialItemRegister.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
			    "GRID_XML_DATA" : gridXmlData
			,	'P_CUST_NO' : $("#CUST_NO").val()
			}, 
		success:function(data){   
			var obj = jQuery.parseJSON( data.RETURN_CUR ); 
			if( obj.RETURN_CODE == "0000" )
			{ 

				alert(msgSave);
				btnSearch();
				  
			} else if( obj.RETURN_CODE == "1111" ){
				
				alert(promMessg16);//"동일한 상품을 적용기간내에 등록할수 없습니다."
				return;
			} else {
				alert("한 점포의 중복된 상품이 존재합니다.");
				return;				
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	           
	    }
	});
	

}


function addRow(){
	
	$( '#pop_wrap1' ).dialog( 'open' );
	
	gridApp3.resize();
	
	$("#SCAN_CODE").val("");
	$("#ITM_NAME").val("");
	$("#ITM_CODE").val("");
	var STR_DT = new CommDateManager().getDate("yyyy-mm-dd");
	var END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	$('#STR_DT').val(STR_DT);
	$("#END_DT").val(END_DT);
	$("#SPECIAL_SPRC").val(0);
	$("#WPRC").val("");
	$("#BASE_WPRC").val("");
	$("#BASE_SPRC").val("");
	
	var postValue = {};
	
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:"/getStoreCode.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	gridRoot3.removeAll();
			gridApp3.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
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

function btn_close() {
	$("#pop_wrap1").dialog("close");
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
	$(".lft_wid").width(300);
	$(".rgt_wid").width($(window).width()-358);
	
	$("#gridHolder1").height($(window).height()-105);
	$("#gridHolder2").height($(window).height()-105);

	$(window).on('resize',function (){	
		$(".lft_wid").width(300);
		$(".rgt_wid").width($(window).width()-358);
		
		$("#gridHolder1").height($(window).height()-105);
		$("#gridHolder2").height($(window).height()-105);		
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
