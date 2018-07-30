/********************************************************
 * 설명:  포인트적립/사용현황
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.06.09
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//헤더정렬을 위한 FALG
var searchFlag ="";
var totalCnt="0";	// 전체건수
var RowsPerPage = 25;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호
var orderBy = "";
var columnName = ""; 
//그리드1 데이터 초기화
var gridData1 = [];

// 그리드 푸터 할당 변수
var TOT_COUNT = 0;
var TOT_SDSM = 0;
var TOT_SALE_POINT = 0;
var TOT_PAY_AMT_01 = 0;
var TOT_PAY_AMT_03 = 0;
var TOT_PAY_AMT_18 = 0;
var TOT_CASH_AMOUNT = 0;

var gridFooterObj = [];

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

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		//최초 로딩시 그리드1 데이터 조회 X
		gridApp1.setData(gridData1);
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
	//그리드1 페이징 셋팅
	drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713"/>\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="2" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto">\
			<columns>\
				<DataGridColumn dataField="CUST_NO"				headerText="'+cusNo+'"					textAlign="center" />\
				<DataGridColumn dataField="CUST_NAME"			headerText="'+cusName+'"				textAlign="left" />\
				<DataGridColumn dataField="SALE_UPOINT"			headerText="'+salUpPoint+'"				textAlign="right" 		formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_DT"				headerText="'+selngDate+'"				textAlign="center" 		formatter="{datefmt}" sortable="false" />\
				<DataGridColumn dataField="POS_NO"				headerText="POS"						textAlign="center"  sortable="false" />\
				<DataGridColumn dataField="TRXN_NO"				headerText="'+dealingsNumber+'"			textAlign="center"  sortable="false" />\
				<DataGridColumn dataField="CANC_FLAG_NM"		headerText="'+cancelFlag+'"				textAlign="center"  sortable="false" />\
				<DataGridColumn dataField="SDSM"				headerText="'+selngAm+'"				textAlign="right" 		formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="SALE_POINT"			headerText="'+accumulationScore+'"		textAlign="right" 		formatter="{numfmt}" sortable="false"/>\
				<DataGridColumn dataField="PAY_AMT_01"			headerText="'+cash+'"					textAlign="right" 		formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="PAY_AMT_03"			headerText="'+card+'"					textAlign="right" 		formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="PAY_AMT_18"			headerText="'+point+'"					textAlign="right" 		formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="CASH_AMOUNT"			headerText="'+cashAppr+'"				textAlign="right" 		formatter="{numfmt}" sortable="false" />\
			</columns>\
			<footers>\
		       <DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
			        <DataGridFooterColumn />\
			        <DataGridFooterColumn />\
			        <DataGridFooterColumn />\
			        <DataGridFooterColumn />\
			        <DataGridFooterColumn />\
			        <DataGridFooterColumn />\
			        <DataGridFooterColumn labelJsFunction="gridFooterFn1" formatter="{numfmt}" textAlign="right" />\
			        <DataGridFooterColumn labelJsFunction="gridFooterFn2" formatter="{numfmt}" textAlign="right" />\
			        <DataGridFooterColumn labelJsFunction="gridFooterFn3" formatter="{numfmt}" textAlign="right" />\
			        <DataGridFooterColumn labelJsFunction="gridFooterFn4" formatter="{numfmt}" textAlign="right" />\
			        <DataGridFooterColumn labelJsFunction="gridFooterFn5" formatter="{numfmt}" textAlign="right" />\
			        <DataGridFooterColumn labelJsFunction="gridFooterFn6" formatter="{numfmt}" textAlign="right" />\
			        <DataGridFooterColumn labelJsFunction="gridFooterFn7" formatter="{numfmt}" textAlign="right" />\
				</DataGridFooter>\
		   </footers>\
		</DataGrid>\
	</rMateGrid>';
/*<dataProvider>\
<SpanSummaryCollection source="{$gridData}">\
	<summaries>\
		<SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="CUST_NO" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
			<SpanSummaryField dataField="SALE_UPOINT" summaryOperation="SUM" />\
			<SpanSummaryField dataField="SDSM" summaryOperation="SUM" />\
			<SpanSummaryField dataField="SALE_POINT" summaryOperation="SUM" />\
			<SpanSummaryField dataField="PAY_AMT_01" summaryOperation="SUM" />\
			<SpanSummaryField dataField="PAY_AMT_03" summaryOperation="SUM" />\
			<SpanSummaryField dataField="PAY_AMT_18" summaryOperation="SUM" />\
			<SpanSummaryField dataField="CASH_AMOUNT" summaryOperation="SUM" />\
		</SpanSummaryRow>\
	</summaries>\
</SpanSummaryCollection>\
</dataProvider>\*/

//조회 (searchFlag -> true : 헤더정렬 기본값으로    false : 헤더정렬 값 유지)
function btn_search(searchFlag){
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//조회시 그리드1 선택 데이터 초기화
	dataRow1 = null;
	
	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return;
	}
	
	if(searchFlag  ==  true){
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
		//페이지 1페이지로 이동
		pageIndex = 1;
		$("#pageIndex").val(pageIndex);
	}
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//로딩바 보이기
	showLoadingBar1();
	
	gridApp1.setData(gridData1);
	
	//그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/memberPointStatusList.do",         
	    type:"POST",
		datatype:"json",
		data: params,
		success:function(data){  
			gridFooterObj = JSON.parse(data.list2);
			
			//alert(data.list);
			gridApp1.setData(data.list);
			
			//console.log('카운트', gridFooterObj[0].TOT_COUNT);
			
			totalCnt = gridFooterObj[0].TOT_COUNT;  //data.totalCount;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
	    },
	    complete : function(data) {
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	/*jQuery.ajax({ 
	    url:"/memberPointStatusList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
	    beforeSend : function(){ 	    	
            //gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			//gridApp1.setData(data);
			//dataGrid1.setEnabled(true);
			
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
	       	//gridRoot1.removeLoadingBar();			
	    },
	    complete : function(data) {
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});*/
}


//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {
	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	btn_search(false);
}

//그리드 페이지 이동
function gridMovePage(page) {
	
	//alert(page);
	$("#pageIndex").val(page);
	pageIndex = page;
	
	btn_search(false);
	
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
	$('#P_CUST_NO').val(dataRow.CUST_NO);
	//$('#CUS_NAME_TEXT' ).text(dataRow.CUST_NAME);	// 회원명
	
}

/*function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportFileName = pointAccumulationStatus+"_"+date+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);		
}*/


$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
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
	$("#gridHolder1").height( $(window).height() - 135 );
	
	$(window).on('resize',function (){			
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 135 );		
	});	
	
	//조회
	/*$("#btn_search").click(function(){
		getGridData();
		//상품 분류별 목표 내용 삭제 
		//gridApp2.setData(null);
		//gridData1ClickStrCode = "";
	});	*/

	/*$("#btn_excel_down").click(function(){
		excelExport();
	});*/	
	
	$("#P_CUST_NAME").keydown(function(key) {		
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
	});
	
	$('#P_CUST_NAME' ).keyup(function() {
		
		if($('#P_CUST_NAME').val().replace(/(\s*)/g, "").length <= 0) {
			$('#P_CUST_NO').val('');
		}
		
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


//엑셀다운로드
function ExcelDownload() {
	
	var P_STR_CODE = $.trim($('#P_STR_CODE').val()); 
	var P_OPEN_DT = $.trim($('#P_OPEN_DT').val()); 
	var P_END_DT = $.trim($('#P_END_DT').val());
	var P_CUST_NAME = $.trim($('#P_CUST_NAME').val());
	var P_CUST_NO = $.trim($('#P_CUST_NO').val());
	var P_COLUMN_NAME = $.trim($('#P_COLUMN_NAME').val());
	var P_ORDERBY = $.trim($('#P_ORDERBY').val());
	var P_POINT_FLAG = $.trim($('#P_POINT_FLAG').val());
	 
	//엑셀호출
	$.download('/memberPointStatusListExcelDown.do',"P_STR_CODE="+P_STR_CODE
																	+"&P_OPEN_DT="+P_OPEN_DT
																	+"&P_END_DT="+P_END_DT
																	+"&P_CUST_NAME="+P_CUST_NAME
																	+"&P_CUST_NO="+P_CUST_NO
																	+"&P_COLUMN_NAME="+P_COLUMN_NAME
																	+"&P_ORDERBY="+P_ORDERBY
																	+"&P_POINT_FLAG="+P_POINT_FLAG
																	,"post" );
	
};


//엑셀다운을 위한 폼 생성 함수
jQuery.download = function(url, data, method){
// url과 data를 입력받음
if( url && data ){ 
    // data 는  string 또는 array/object 를 파라미터로 받는다.
    data = typeof data == 'string' ? data : jQuery.param(data);
    // 파라미터를 form의  input으로 만든다.
    var inputs = '';
    jQuery.each(data.split('&'), function(){ 
        var pair = this.split('=');
        inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
    });
    // request를 보낸다.
    jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
    .appendTo('body').submit().remove();
};
};


function gridFooterFn1() {
	
	
	if(gridFooterObj.length > 0) {
		
		console.log('footer', gridFooterObj);
		console.log('footer', gridFooterObj[0]);
		console.log('footer', gridFooterObj[0].TOT_COUNT);
		
		return gridFooterObj[0].TOT_COUNT;
	}
	
	return 0;
}

function gridFooterFn2() {
	if(gridFooterObj.length > 0) {
		return gridFooterObj[0].TOT_SDSM;
	}
	
	return 0;
}

function gridFooterFn3() {
	if(gridFooterObj.length > 0) {
		return gridFooterObj[0].TOT_SALE_POINT;
	}
	
	return 0;
}

function gridFooterFn4() {
	if(gridFooterObj.length > 0) {
		return gridFooterObj[0].TOT_PAY_AMT_01;
	}
	
	return 0;
}

function gridFooterFn5() {
	if(gridFooterObj.length > 0) {
		return gridFooterObj[0].TOT_PAY_AMT_03;
	}
	
	return 0;
}

function gridFooterFn6() {
	if(gridFooterObj.length > 0) {
		return gridFooterObj[0].TOT_PAY_AMT_18;
	}
	
	return 0;
}

function gridFooterFn7() {
	if(gridFooterObj.length > 0) {
		return gridFooterObj[0].TOT_CASH_AMOUNT;
	}
	
	return 0;
}
