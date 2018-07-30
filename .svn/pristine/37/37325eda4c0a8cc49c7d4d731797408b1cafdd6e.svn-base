/********************************************************
 * 설명:  매입집계 및 대금지불원장 생성 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.02.08
 * version : 1.0
 ********************************************************/


$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	datePickerYearMonth();
	//$(".datepicker").datepicker();
	
	$("input[name='P_TYPE']").click(function(){
		var val = $("input[name='P_TYPE']:checked").val();
		if(val == "1"){
			$("#P_GRE_GB").val("1");
		}else if(val == "2"){
			$("#P_GRE_GB").val("2");
		}else{
			$("#P_GRE_GB").val("");
		}
	});
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";


var RowsPerPage = 25;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호
var totalCnt = 0;


// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%");
//rMateGridH5.create("grid2", "gridHolder2", jsVars);

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp1.setLayout(layoutStr1);
		gridApp1.setData(gridData);
		
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData1 = dataRow1[dataField];
			
			$('#P_PAY_SEQ' ).val(dataRow1.PAY_SEQ);
			$('#P_GRE_GB' ).val(dataRow1.GRE_GB);
		};
		
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			dataGrid1.addEventListener("itemClick", itemClickHandler);

		};
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
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
	
	//그리드1 헤더 클릭 이벤트
//	dataGrid1.addEventListener("headerRelease", headerRelease1);
	
	//drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;

//----------------------- 그리드 설정 끝 -----------------------
var layoutStr1;
//그리드1 헤더 설정

layoutStr1 =
'<rMateGrid>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" horizontalScrollPolicy="auto" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="No"  		headerText="' + rowNumber + '"		itemRenderer="IndexNoItem" textAlign="center" width="60"/>\
			<DataGridColumn dataField="CD_NM"  		headerText="' + paySeq + '"  		textAlign="left"	/>\
			<DataGridColumn dataField="PUR_CLOSE"  	headerText="' + purClose + '"  		textAlign="center" width="100" formatter="{datefmt}" />\
			<DataGridColumn dataField="PUR_CLOSE_COUNT"  	headerText="' + purClose + ' ' + co + '"  		textAlign="right" width="100" formatter="{numfmt}" />\
			<DataGridColumn dataField="SALE_CLOSE" 	headerText="' + saleClose + '" 		textAlign="center" width="100" formatter="{datefmt}" />\
			<DataGridColumn dataField="SALE_CLOSE_COUNT" 	headerText="' + saleClose + ' ' + co + '" 		textAlign="right" width="100" formatter="{numfmt}" />\
			<DataGridColumn dataField="JANG_CLOSE"  headerText="' + jangClose + '"		textAlign="center" width="100" formatter="{datefmt}" />\
			<DataGridColumn dataField="JANG_CLOSE_COUNT"  	headerText="' + jangClose + ' ' + co + '"		textAlign="right" width="100" formatter="{numfmt}" />\
			<DataGridColumn dataField="ORG_CREAT"	headerText="' + orgCreat + '" 		textAlign="center" width="100" formatter="{datefmt}"	/>\
			<DataGridColumn dataField="ORG_CREAT_COUNT"		headerText="' + orgCreat + ' ' + co + '" 		textAlign="right" width="100" formatter="{numfmt}"	/>\
			<DataGridColumn dataField="PAY_CLOSE"  	headerText="' + payClose + '" 		textAlign="center" width="100" formatter="{datefmt}"  />\
			<DataGridColumn dataField="UDATE"		headerText="' + uDate + '" 			textAlign="center" width="100" formatter="{datefmt}" />\
			<DataGridColumn dataField="PAY_SEQ"		headerText="' + paySeq + '" 		visible="false"	/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//그리드1 데이터 초기화
var gridData = [];

//그리드 페이지 이동
function gridMovePage(page) {
	
	//alert(page);
	$("#pageIndex").val(page);
	pageIndex = page;
	
	btn_search('N');
	
}
// ----------------------- 그리드 설정 끝 -------------------------------------

function fnGetPyPayClose() {
	if($.trim($("#P_SEARCH_DT").val() ) == null || $.trim($("#P_SEARCH_DT").val() ) == "")
	{
		confirm(payYm + msgConfirm);
		$("#P_SEARCH_DT").focus();
		return;
	}
	
	//조회시 그리드1 선택 데이터 초기화
	dataRow1 = null;
	
	var loadData = $("#top_search").serializeAllObject(); 
	loadData.ROWS_PER_PAGE = RowsPerPage ; 
	loadData.PAGE_INDEX = "1";
	pageIndex = "1";
	
//	gridApp1.setData(gridData1);
	//그리드2 초기화 
//	gridRoot2.removeAll( );
	//로딩바 보기기
//	showLoadingBar1();
	//그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/paymentLedgerInfo_PayList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){  
			//alert(data.list);
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;
			
			//drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
			gridRoot1.removeLoadingBar();
	    },
	    complete : function(data) {
	    	//hideLoadingBar1();
	    	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	gridRoot1.removeLoadingBar();
	    }
	});
}

function fnCreate(){
	if($.trim($("#P_SEARCH_DT").val() ) == null || $.trim($("#P_SEARCH_DT").val() ) == "")
	{
		confirm(payYm + msgConfirm);
		$("#P_SEARCH_DT").focus();
		return;
	}
	
	$("#tbody").empty();
	
	var loadData = $("#top_search").serializeAllObject(); 
 
	jQuery.ajax({ 
	    url:"/paymentLedgerProcess.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){  
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(successLedger);
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
	    	gridRoot1.removeLoadingBar();
	    	
	    	fnGetPyPayClose();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	gridRoot1.removeLoadingBar();
	    }
	});
}

function fnCancle(){
	if($.trim($("#P_SEARCH_DT").val() ) == null || $.trim($("#P_SEARCH_DT").val() ) == "")
	{
		confirm(payYm + msgConfirm);
		$("#P_SEARCH_DT").focus();
		return;
	}
	
	var loadData = $("#top_search").serializeAllObject(); 
 
	jQuery.ajax({ 
	    url:"/updatePaymentLedgerCancle.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){  
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(cancellationLedger);
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
	    	gridRoot1.removeLoadingBar();
	    	
	    	fnGetPyPayClose();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	gridRoot1.removeLoadingBar();
	    }
	});
}

function init() {
	var nowDate = new CommDateManager().getDate("yyyy-mm");
	$("#P_SEARCH_DT").val(nowDate);
	getCommonCodeSelectBoxList("P_PAY_SEQ",  "PAY_SEQ");

	/* 년월 선택하면 바로 조회 되도록 처리.
	$(".datepickerYm").datepicker({ onSelect: function(dateText) 
		{ 	//var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm");
			//$("#P_SEARCH_DT").val(CUR_DT);
		}, 	 showMonthAfterYear:true
		, changeMonth: true // 월을 바꿀수 있는 셀렉트 박스를 표시
        , changeYear: true // 년을 바꿀 수 있는 셀렉트 박스를 표시
        , monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12']
		, dateFormat: "yy-mm"
		, onClose: function(dateText, inst) {
       	 var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
            $(this).datepicker('setDate', new Date(year, month, 1));
            
            fnGetPyPayClose();
          }
		, beforeShow: function() {
       	 var selectDate = $(".datepickerYm").val().split("-");
            var year = Number(selectDate[0]);
            var month = Number(selectDate[1]) - 1;
            $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
            $('#ui-datepicker-div').addClass('DATE_YM');
          }
	});
	*/

}

//########################################################
//###   상단 버튼 구현 ( 끝 )   						   ###
//########################################################

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-270); // -169

	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-270); // -169
	});
});