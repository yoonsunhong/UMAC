/********************************************************
 * 설명:  단품별재고현황
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.05.02
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
//var gridApp2, gridRoot2, dataGrid2, dataRow2;

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

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

var gridData1ClickStrCode = "";
var totalCnt;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

//전체 합계 담을 변수
var totalAmtList;

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
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);		
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
	selectorColumn1 = gridRoot1.getObjectById("selector");
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="3" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
			<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto"	>\
				<columns>\
					<DataGridColumn dataField="SCAN_CODE" 				headerText="'+scanCode+'" 				textAlign="center"/>\
					<DataGridColumn dataField="ITM_SHORT_NAME"   		headerText="'+itmName+'"    			textAlign="left" />\
					<DataGridColumn dataField="INV_DT" 				headerText="재고일자" 				textAlign="center" formatter="{datefmt}" />\
					<DataGridColumn dataField="BASE_QTY"   				headerText="'+theDayBeforeStockQy+'"    textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="PUR_QTY"   				headerText="'+decQty+'"    				textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="PUR_WAMT"   				headerText="'+purchaseCost+'"    		textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="RTN_QTY"   				headerText="반품수량"    		textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="RTN_WPRC"   				headerText="반품원가"    		textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_QTY"   				headerText="'+sellingQy+'"    			textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_SPRC"   			headerText="'+sellingSprc+'"    		textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="DIN_QTY"   				headerText="'+deQy+'"    				textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="DIN_WPRC"   				headerText="'+dePrmpc+'"    			textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="DOUT_QTY"   				headerText="'+loanQy+'"    				textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="DOUT_WPRC"   		headerText="'+loanPrmpc+'"    			textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="INV_ADJ_QTY"   		headerText="'+inventoryMediationQy+'"   textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="INV_ADJ_SPRC"   		headerText="'+inventoryMediationPrmpc+'"    	textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="INV_END_QTY"   		headerText="'+trmendInventoryQy+'"    			textAlign="right"	formatter="{numfmt}"/>\
					<DataGridColumn dataField="INV_END_WAMT"   		headerText="당일재고금액"    			textAlign="right"	formatter="{numfmt}"/>\
				</columns>\
				<footers>\
					<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
						<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn labelJsFunction="labelFunc1" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc2" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc2_1" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc2_2" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc3" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc4" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc5" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc6" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc7" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc8" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc9" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn labelJsFunction="labelFunc10" formatter="{numfmt}" textAlign="right" />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn labelJsFunction="labelFunc11" formatter="{numfmt}" textAlign="right" />\
					</DataGridFooter>\
				</footers>\
			</DataGrid>\
	</rMateGrid>';

function labelFunc1() {
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].PUR_QTY;
	}
	else {
		return 0;
	}

}

function labelFunc2() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].PUR_WAMT;
	}
	else {
		return 0;
	}

}

function labelFunc2_1() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].RTN_QTY;
	}
	else {
		return 0;
	}

}

function labelFunc2_2() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].RTN_WPRC;
	}
	else {
		return 0;
	}

}


function labelFunc3() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].SALE_QTY;
	}
	else {
		return 0;
	}

}

function labelFunc4() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].SALE_SPRC;
	}
	else {
		return 0;
	}

}

function labelFunc5() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].DIN_QTY;
	}
	else {
		return 0;
	}

}

function labelFunc6() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].DIN_WPRC;
	}
	else {
		return 0;
	}

}

function labelFunc7() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].DOUT_QTY;
	}
	else {
		return 0;
	}

}

function labelFunc8() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].DOUT_WPRC;
	}
	else {
		return 0;
	}

}

function labelFunc9() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].INV_ADJ_QTY;
	}
	else {
		return 0;
	}

}

function labelFunc10() {
	
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].INV_ADJ_SPRC;
	}
	else {
		return 0;
	}

}

function labelFunc11() {
	if(totalAmtList && totalAmtList.length > 0) {
		return totalAmtList[0].INV_END_WAMT;
	}
	else {
		return 0;
	}
	
}

//목록 그리드 조회
function getGridData(isPageMove) {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_STR_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;
	
	
	//유효성검사
	if($.trim($("#P_ITM_NAME").val() ) == null || $.trim($("#P_ITM_NAME").val() ) == "") $("#P_ITM_CODE").val("");
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_STR_DT").focus();
		return;
	}
	
	if(isPageMove) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesInfoReportGISList.do",
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
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;
			totalAmtList = data.list2;
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
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

function gridMovePage(page) {
	$("#pageIndex").val(page);
	pageIndex = page;
	getGridData();
}

function excelExport(){
	var P_STR_DT = $.trim($('#P_STR_DT').val()); 
	var P_END_DT = $.trim($('#P_END_DT').val()); 
	var P_STR_CODE = $.trim($('#P_STR_CODE').val());
	var P_ITM_SHORT_NAME = $.trim($('#P_ITM_SHORT_NAME').val());
	var P_LRG_CODE = $.trim($('#P_LRG_CODE').val());
	var P_MID_CODE = $.trim($('#P_MID_CODE').val());
	var P_CLS_CODE = $.trim($('#P_CLS_CODE').val()); 
	var P_ITM_CODE = $.trim($('#P_ITM_CODE').val()); 
	 
	//엑셀호출
	$.download('/salesInfoReportGISDownload.do',"P_END_DT="+P_END_DT
			+"&P_STR_CODE="+P_STR_CODE
			+"&P_ITM_CODE="+P_ITM_CODE
			+"&P_ITM_SHORT_NAME="+P_ITM_SHORT_NAME
			+"&P_LRG_CODE="+P_LRG_CODE
			+"&P_MID_CODE="+P_MID_CODE
			+"&P_CLS_CODE="+P_CLS_CODE
			+"&P_STR_DT="+P_STR_DT
			,"post");
};

//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	getGridData();
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	if($("#P_ITM_SHORT_NAME").val() != null && $("#P_ITM_SHORT_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITM_SHORT_NAME").val());
		btn_comm_search('2');
	}
}

//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#P_ITM_SHORT_NAME' ).val(dataRow.ITM_NAME);				// 상품명
}

//(점별상품검색) 팝업 호출 function
function btn_comm_store_search(){
/*	$('#comm_pop_wrap6_1' ).dialog( 'open' );
	gridApp15_1.resize();
	fnGetStrName_1();
	$("#pop_wrap input[name='P_STR_CODE']").val($("#P_STR_CODE").val());
	 $("#P_CALLBACK_NM6_1").val('fn_comm_store_callback1(dataRow15_1)');
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT6_1").val($("#P_ITM_NAME").val());
		btn_comm_search('6_1');
	}*/
	
	$('#comm_pop_wrap6' ).dialog( 'open' );
	gridApp15.resize();
	fnGetStrName();
	$("#pop_wrap input[name='P_STR_CODE']").val($("#P_STR_CODE").val())
	 $("#P_CALLBACK_NM6").val('fn_comm_store_callback1(dataRow15)');
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT6").val($("#P_ITM_NAME").val());
		btn_comm_search('6');
	}
	
}


function fn_comm_store_callback1(dataRow){
	$("#P_ITM_NAME").val( dataRow.ITM_NAME ) ;
	$("#P_ITM_CODE").val( dataRow.ITM_CODE ) ;
}


$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 135 );
	
	//달력설정
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
		 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
				if(     $("#P_STR_DT").val()  >  $("#P_END_DT").val()     )
				{   alert(msgStartDateAndEndDate);
					$("#P_STR_DT").val(CUR_DT);
					return;
				}	 
			 }, 	 showMonthAfterYear:true 
			});
		 
		$(".datepicker2").datepicker({ onSelect: function(dateText) 
		 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
				if(     $("#P_STR_DT").val()  >  $("#P_END_DT").val()     )
				{   alert(msgStartDateAndEndDate);
				$("#P_END_DT").val(CUR_DT);
					return;
				}	 
		 }, 	 showMonthAfterYear:true 
		});
		var beforeDate = new CommDateManager().getDate("yyyy-mm-01"); // 하루전 before(년,월,일)
		var date = new CommDateManager().getDate("yyyy-mm-dd");
		$("#P_STR_DT").val(beforeDate);
		$("#P_END_DT").val(date);
		
		
		
	$(window).on('resize',function (){			
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 135 );		
	});	
	
	$(function() {
		$("#pop_wrap").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 900,
		    resizable : false,
		    position : "center"
		});
		
	});
	
	//조회
	$("#btn_search").click(function(){
		getGridData(true);
	});	

	$("#btn_excel_down").click(function(){
		excelExport();
	});
	
	$("#P_ITM_NAME").keydown(function(key) {		
		if(key.keyCode == 13){
//			getGridData();
			btn_comm_store_search();
		}
	});	
	
});















