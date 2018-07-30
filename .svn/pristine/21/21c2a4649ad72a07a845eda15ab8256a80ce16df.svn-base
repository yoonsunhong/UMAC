/********************************************************
 * 설명:  행사상품로그조회
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.06.02
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridPopupApp, gridPopupRoot, dataPopupGrid, dataPopupRow, clickPopupData;

//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("gridPopup", "gridUser_Holder26", jsVars1, "100%", "250px");


//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

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
	}else if(id == "gridPopup"){
		// rMateGrid 관련 객체
		gridPopupApp = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridPopupRoot = gridPopupApp.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridPopupApp.setLayout(layoutStrPopup);
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataPopupRow = gridPopupRoot.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataPopupGrid.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickPopupData = dataPopupRow[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#U_CALLBACK_NM1").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_event_callback(dataPopupRow);
			}
			btn_user_close();
		};
		
		var enterClickHandler = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataPopupGrid.getSelectedIndex();
			dataPopupRow = gridPopupRoot.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#U_CALLBACK_NM1").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_event_callback(dataPopupRow);
			}			
			btn_user_close();
		};

		var layoutCompleteHandlerPopup = function(event){
			dataPopupGrid = gridPopupRoot.getDataGrid();  // 그리드 객체
			dataPopupGrid.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataPopupGrid.addEventListener("itemDoubleClick", itemClickHandler);
			dataPopupGrid.addEvent("keydown", enterClickHandler);

		};
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅		
		gridPopupRoot.addEventListener("layoutComplete", layoutCompleteHandlerPopup);

		//조회 완료 후 포커스 
		var dataCompleteHandlerPopup = function(event) { 
			dataPopupGrid = gridPopupRoot.getDataGrid();    // 그리드 객체
			dataPopupGrid.setSelectedIndices([0]);
			dataPopupGrid.setVerticalScrollPosition(0);  
			dataPopupGrid.focus(); 
		 };
		 gridPopupRoot.addEventListener("dataComplete", dataCompleteHandlerPopup);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {

}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#f3f3f3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="9" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
			<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto" selectionMode="singleCell" >\
				<columns>\
					<DataGridColumn dataField="STR_NAME" 			headerText="점포명"					textAlign="center" />\
					<DataGridColumn dataField="EVT_CODE"			headerText="'+eventCode+'"				textAlign="center" />\
					<DataGridColumn dataField="EVT_NAME" 			headerText="'+eventName+'"				textAlign="left" />\
					<DataGridColumn dataField="SCAN_CODE" 			headerText="'+scanCode+'"				textAlign="center" />\
					<DataGridColumn dataField="ITM_SHORT_NAME" 		headerText="'+itmName+'"				textAlign="left" 		width="150"/>\
					<DataGridColumn dataField="UNIT" 				headerText="'+standard+'"				textAlign="right" 		formatter="{numfmt}"/>\
					<DataGridColumn dataField="EVT_STR_DT" 			headerText="'+eventStartDate+'"			textAlign="center" 		formatter="{datefmt}"/>\
					<DataGridColumn dataField="EVT_END_DT" 			headerText="'+eventEndDate+'"			textAlign="center" 		formatter="{datefmt}"/>\
					<DataGridColumn dataField="ORD_STR_DT" 			headerText="'+orderStartDate+'"			textAlign="center" 		formatter="{datefmt}"/>\
					<DataGridColumn dataField="ORD_END_DT" 			headerText="'+orderEnddate+'"			textAlign="center" 		formatter="{datefmt}"/>\
					<DataGridColumn dataField="BWBW" 				headerText="'+normalityPurchase+'"			textAlign="right" 		formatter="{numfmt}"/>\
					<DataGridColumn dataField="BASE_SPRC" 			headerText="'+sprc+'"						textAlign="right" 		formatter="{numfmt}"/>\
					<DataGridColumn dataField="NORMAL_MARGIN" 		headerText="'+normalityMargin+'"			textAlign="right" 		formatter="{numfmt}"/>\
					<DataGridColumn dataField="EVT_WW" 				headerText="'+eventPurchase+'"				textAlign="right" 		formatter="{numfmt}"/>\
					<DataGridColumn dataField="EVT_SPRC" 			headerText="'+evtSPRC+'"					textAlign="right" 		formatter="{numfmt}"/>\
					<DataGridColumn dataField="EVENT_MARGIN" 		headerText="'+eventMargin+'"				textAlign="right" 		formatter="{numfmt}"/>\
					<DataGridColumn dataField="POINT_YN" 			headerText="'+point+'"						textAlign="center" />\
					<DataGridColumn dataField="VEN_CODE" 			headerText="'+venCode+'"					textAlign="center" />\
					<DataGridColumn dataField="VEN_NAME" 			headerText="'+venName+'"					textAlign="left" 		width="150"/>\
					<DataGridColumn dataField="CLS_CODE" 			headerText="'+subCategory+'"				textAlign="center" />\
					<DataGridColumn dataField="CLS_NAME" 			headerText="'+subCategoryName+'"			textAlign="left" />\
				</columns>\
			</DataGrid>\
	</rMateGrid>';

var layoutStrPopup =
	'<rMateGrid>\
			<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
			<DataGrid id="dg1" sortableColumns="false" showDataTips="true"  horizontalScrollPolicy="auto" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
					<DataGridColumn dataField="CORP_CODE" 	headerText="법인코드" 	visible="false"	width="100" 	textAlign="center"/>\
					<DataGridColumn dataField="STR_CODE" 	headerText="점포코드" 	visible="false"	width="100" 	textAlign="center"  />\
					<DataGridColumn dataField="EVT_CODE" 	headerText="행사코드" 	width="80" 	textAlign="center"  />\
					<DataGridColumn dataField="EVT_NAME" 	headerText="행사명" 	width="200" textAlign="left"  />\
					<DataGridColumn dataField="EVT_FLAG_NM" headerText="행사구분" 	width="80" 	textAlign="left"  />\
					<DataGridColumn dataField="EVT_STR_DT" 	headerText="시작일" 	width="100" textAlign="center" formatter="{datefmt}" />\
					<DataGridColumn dataField="EVT_END_DT" 	headerText="종료일" 	width="100" textAlign="center" formatter="{datefmt}" />\
				</groupedColumns>\
			</DataGrid>\
	</rMateGrid>';
//목록 그리드 조회
function getGridData() {
	var params = $("#frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	params.P_STR_CODE = $("#P_STR_CODE").val();

	
	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return;
	}
	
	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "") $("#P_VEN_CODE").val("");
	if($.trim($("#P_ITM_NAME").val() ) == null || $.trim($("#P_ITM_NAME").val() ) == "") $("#P_ITM_CODE").val("");
	if($.trim($("#P_EVT_NAME_V").val() ) == null || $.trim($("#P_EVT_NAME_V").val() ) == "") $("#P_EVT_CODE").val("");
	
	var temp = $("#P_ITM_NAME").val();
	$("#P_ITM_NAME").val($.trim($("#P_SEARCH_ITM_NAME").val()));
	$("#P_ITM_NAME").val(temp);
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesInfoReportEGLList.do",
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
			gridApp1.setData(data);
			
			dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function chgCate1(){ 
	$("select[name='P_CLS_CODE'] option").remove();
	$("#P_CLS_CODE").prepend("<option value=''>"+select+"</option>");
	   
	getCateCodeSelectBoxList("P_MID_CODE","2",$('#P_LRG_CODE' ).val());	 
}
function chgCate2(){	
	var num1 = $('#P_MID_CODE' ).val().substr(0,2);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
		
	getCateCodeSelectBoxList("P_CLS_CODE","3",$('#P_MID_CODE' ).val());
}
function chgCate3(){	
	var num1 = $('#P_CLS_CODE' ).val().substr(0,2);
	var num2 = $('#P_CLS_CODE' ).val().substr(0,4);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
	$("#P_MID_CODE").val(num2).prop("selected", true);		
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();

	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}	
}
//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체CODE
}


//(점별상품검색) 팝업 호출 function
function btn_comm_store_search(){
	if($('#P_STR_CODE').val() == "") {
		
		//console.log("전체선택");
		$('#comm_pop_wrap2' ).dialog( 'open' );
		gridApp11.resize();
		
		//fnGetStrName();
		$("#SET_VEN_CODE").val( $("#P_VEN_CODE").val() ); 
		$("#pop_wrap input[name='P_STR_CODE']").val($("#P_STR_CODE").val());
		
		
		
		$("#P_CALLBACK_NM1").val('fn_comm_product_callback(dataRow11)');
		if($("#S_ITM_NAME").val() != null && $("#S_ITM_NAME").val() != ""){
			$("#P_TEXT6").val($("#P_ITM_NAME").val());
			btn_comm_search('2');
		}
		
	}else{
		//console.log("점별선택");
	
		$('#comm_pop_wrap6' ).dialog( 'open' );
		gridApp15.resize();
		fnGetStrName();
		$("#SET_VEN_CODE").val( $("#P_VEN_CODE").val() ); 
		$("#pop_wrap input[name='P_STR_CODE']").val($("#P_STR_CODE").val());
		 $("#P_CALLBACK_NM6").val('fn_comm_store_callback1(dataRow15)');
		if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
			$("#P_TEXT6").val($("#P_ITM_NAME").val());
			btn_comm_search('6');
		}
	}
	
//	$('#comm_pop_wrap6_6' ).dialog( 'open' );
//	$("#P_TEXT6_6").val("");
//	gridApp15_6.setData([]);
//	gridApp15_6.resize();
//	$("#P_CALLBACK_NM6_6").val('fn_comm_store_callback(dataRow15_6)');
//	$("#P_SELECTED_STR_CODE").val(  $("#P_STR_CODE").val()  );    // $("#P_STR_CODE").val() 는 부모창의 코드값
//	
//	$("#P_TEXT6_6").val($("#P_ITM_NAME").val());
//	btn_comm_search6_6(); 
}

//(상품검색) 팝업 callback function
function fn_comm_product_callback( dataRow ){
	$('#P_ITM_CODE' ).val(dataRow.ITM_CODE);	// 상품코드
	$('#P_ITM_NAME' ).val(dataRow.ITM_NAME);	// 상품명 
}

function clearVenCode(){
	if($('#P_VEN_NAME').val() == "" )
	{
		$('#P_VEN_CODE').val("");
	}
}


function fn_comm_store_callback1(dataRow){
	$("#P_ITM_NAME").val( dataRow.ITM_NAME ) ;
	$("#P_ITM_CODE").val( dataRow.ITM_CODE ) ;
}

function fn_event_callback(dataRow){
	$("#P_EVT_CODE").val( dataRow.EVT_CODE ) ;
	$("#P_EVT_NAME_V").val( dataRow.EVT_NAME ) ;
	$("#P_SALES_SD2").val( dataRow.EVT_STR_DT ) ;
	$("#P_SALES_ED2").val( dataRow.EVT_END_DT ) ;
}



function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportFileName = "행사상품로그조회_"+date+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);		
}


$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	$("#P_EVT_CODE").number( false, 0 );
	
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류
	
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
				$("#P_OPEN_DT").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
		});
	 
	$(".datepicker2").datepicker({ onSelect: function(dateText) 
	 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
			$("#P_END_DT").val(CUR_DT);
				return;
			}	 
	 }, 	 showMonthAfterYear:true 
	});
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 160 );
	
	$(window).on('resize',function (){	
		
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 160 );
		
	});	

	//조회
	$("#btn_search").click(function(){
		getGridData();
	});	
	
	$("#btn_excel_down").click(function(){
		excelExport();
	});		
	
	
	//협력업체 검색
	$("#P_VEN_NAME_SEARCH").click(function(){		
		btn_comm_supply_search();
	});			
	
	$("#P_VEN_NAME").keydown(function(key) {		
		if(key.keyCode == 13){
			btn_comm_supply_search();
		}
	});	
	
	$("#P_ITM_NAME").keydown(function(key){
		if(key.keyCode == 13){
			btn_comm_store_search();
		}
	});
	
	
	$(function() {
		$("#user_pop_wrap1").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 700,
		    height : 483,
		    resizable : false,
		    open: function(){
		    	$("body").css("overflow-y", "hidden");
		        },
		        close: function(){
		    	$("body").css("overflow-y", "scroll");
		        }
		});	
	});
	
	var EVT_STR_DT =new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var EVT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#P_EVT_STR_DT').val(EVT_STR_DT);
	$('#P_EVT_END_DT').val(EVT_END_DT);	

});


btn_evt_search = function(){
	// 행사 popup
	$("#user_pop_wrap1").dialog("open");	
	gridPopupApp.resize();
	btn_pop_search();
};

btn_user_close=function(){
	$("#user_pop_wrap1").dialog("close");
};

btn_pop_search = function(){
	gridPopupRoot.addLoadingBar();
	jQuery.ajax({ 
	    url:"/commonSearch.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'P_STR_CODE' : $("#P_STR_CODE").val()
					,'P_EVT_NAME' : $("#P_U_TEXT17").val()
					,'P_SALES_SD' : $("#P_EVT_STR_DT").val()
					,'P_SALES_ED' : $("#P_EVT_END_DT").val()
					,'URL' :'itemSalesState.itemSalesEventPopupList'
				},
		success:function(data){
			var returnCode = eval(data['code']);
			var returnValue = "";
			if(returnCode == "9999"){
				returnValue = data['Alert'];
			}else{
				returnValue = eval(data['list']);
				gridPopupApp.setData(returnValue);				
			}
			
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	gridPopupRoot.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	gridPopupRoot.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
};
