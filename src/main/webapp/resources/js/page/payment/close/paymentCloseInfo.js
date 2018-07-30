/********************************************************
 * 설명:  대금지불 마감관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.01.24
 * version : 1.0
 ********************************************************/

$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	datePickerYearMonth();
	
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
			
			$("#I_PAY_YM").val(dataRow1.PAY_YM);
			$("#I_PAY_SEQ").val(dataRow1.PAY_SEQ);
			
			var nowDate = new CommDateManager().getDate("yyyymmdd");
			var PUR_CLOSE = dataRow1.PUR_CLOSE;
			var SALE_CLOSE = dataRow1.SALE_CLOSE;
			var JANG_CLOSE = dataRow1.JANG_CLOSE;
			var ORG_CREAT = dataRow1.ORG_CREAT;
			var PAY_CLOSE = dataRow1.PAY_CLOSE;
			var UDATE = dataRow1.UDATE;
			
			$("select").removeAttr("disabled");
			
			//지불마감
			if(PAY_CLOSE != "" && PAY_CLOSE != null && typeof(PAY_CLOSE) != 'undefined'){
				$("#P_PAY_CLOSE").empty();
				//$("#P_PAY_CLOSE").append('<option value="'+ dataRow1.PAY_CLOSE +'">'+ dataRow1.PAY_CLOSE +'</option>');
				//$("#P_PAY_CLOSE").append('<option value="">해제</option>');
				$("#P_PAY_CLOSE").val(dataRow1.PAY_CLOSE);
				$("#P_UDATE").val(UDATE);
				
				$("#P_PUR_CLOSE").attr("disabled", "disabled");
				$("#P_SALE_CLOSE").attr("disabled", "disabled");
				$("#P_JANG_CLOSE").attr("disabled", "disabled");
				$("#P_ORG_CREAT").attr("disabled", "disabled");
				//if(PAY_CLOSE != nowDate){
					$("#P_PAY_CLOSE").attr("disabled", "disabled");
				//}
			}else{
				$("#P_UDATE").val('');
				$("#P_PAY_CLOSE").val('');
				$("#P_PAY_CLOSE").attr("disabled", "disabled");
			}
			
			//원장생성
			if(ORG_CREAT != "" && ORG_CREAT != null && typeof(ORG_CREAT) != 'undefined'){
				//$("#P_ORG_CREAT *").remove();
				$("#P_ORG_CREAT").empty();
				$("#P_ORG_CREAT").append('<option value="'+ dataRow1.ORG_CREAT +'">'+ dataRow1.ORG_CREAT +'</option>');
				$("#P_ORG_CREAT").append('<option value="">해제</option>');
				
				$("#P_PUR_CLOSE").attr("disabled", "disabled");
				$("#P_SALE_CLOSE").attr("disabled", "disabled");
				$("#P_JANG_CLOSE").attr("disabled", "disabled");
				
				if(PAY_CLOSE != "" && PAY_CLOSE != null && typeof(PAY_CLOSE) != 'undefined'){
					$("#P_PAY_CLOSE").attr("disabled", "disabled");
				}
				else {
					$("#P_PAY_CLOSE").removeAttr("disabled"); // 활성화
				}
			}else{
				$("#P_ORG_CREAT").val('');
				$("#P_ORG_CREAT").attr("disabled", "disabled");

				$("#P_UDATE").val('');
				$("#P_PAY_CLOSE").val('');
				$("#P_PAY_CLOSE").attr("disabled", "disabled");
			}
			
//			//장려금마감
//			if(JANG_CLOSE != "" && JANG_CLOSE != null && typeof(JANG_CLOSE) != 'undefined'){
//				$("#P_JANG_CLOSE").empty();
//				$("#P_JANG_CLOSE").append('<option value="'+ dataRow1.JANG_CLOSE +'">'+ dataRow1.JANG_CLOSE +'</option>');
//				$("#P_JANG_CLOSE").append('<option value="">해제</option>');
//				$("#P_PUR_CLOSE").attr("disabled", "disabled");
//				$("#P_SALE_CLOSE").attr("disabled", "disabled");
//			}else{
//				$("#P_JANG_CLOSE").val('');
//				$("#P_JANG_CLOSE").attr("disabled", "disabled");
//			}
			
			//매출집계
			if(SALE_CLOSE != "" && SALE_CLOSE != null && typeof(SALE_CLOSE) != 'undefined'){
				$("#P_SALE_CLOSE").empty();
				$("#P_SALE_CLOSE").append('<option value="'+ dataRow1.SALE_CLOSE +'">'+ dataRow1.SALE_CLOSE +'</option>');
				$("#P_SALE_CLOSE").append('<option value="">해제</option>');
				$("#P_JANG_CLOSE").attr("disabled", "disabled");
			}else{
				$("#P_SALE_CLOSE").val('');
				$("#P_SALE_CLOSE").attr("disabled", "disabled");
			}
			
			//매입집계
			if(PUR_CLOSE != "" && PUR_CLOSE != null && typeof(PUR_CLOSE) != 'undefined'){
				$("#P_PUR_CLOSE").empty();
				$("#P_PUR_CLOSE").append('<option value="'+ dataRow1.PUR_CLOSE +'">'+ dataRow1.PUR_CLOSE +'</option>');
				$("#P_PUR_CLOSE").append('<option value="">해제</option>');
				$("#P_JANG_CLOSE").attr("disabled", "disabled");
			}else{
				$("#P_PUR_CLOSE").val('');
				$("#P_PUR_CLOSE").attr("disabled", "disabled");
			}
			
			//장려금마감
			if(JANG_CLOSE != "" && JANG_CLOSE != null && typeof(JANG_CLOSE) != 'undefined'){
				$("#P_JANG_CLOSE").empty();
				$("#P_JANG_CLOSE").append('<option value="'+ dataRow1.JANG_CLOSE +'">'+ dataRow1.JANG_CLOSE +'</option>');
				$("#P_JANG_CLOSE").append('<option value="">해제</option>');
			}else{
				$("#P_JANG_CLOSE").val('');
				$("#P_JANG_CLOSE").attr("disabled", "disabled");
			}
		};
		
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			dataGrid1.addEventListener("itemClick", itemClickHandler);

		};
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	}  
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;

//----------------------- 그리드 설정 끝 -----------------------
var layoutStr1;
//그리드1 헤더 설정

layoutStr1 =
'<rMateGrid>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="No"  			headerText="' + rowNumber + '"		itemRenderer="IndexNoItem" textAlign="center" width="50" />\
			<DataGridColumn dataField="PAY_SEQ_NAME"	headerText="' + paySeq + '" 		textAlign="center" 	width="130"	/>\
			<DataGridColumn dataField="PUR_CLOSE"  		headerText="' + purClose + '" 		textAlign="center" 	width="130"	formatter="{datefmt}"/>\
			<DataGridColumn dataField="SALE_CLOSE" 		headerText="' + saleClose + '" 		textAlign="center"  width="130" formatter="{datefmt}"/>\
			<DataGridColumn dataField="JANG_CLOSE"		headerText="' + jangClose + '" 		textAlign="center" 	width="160" formatter="{datefmt}"/>\
			<DataGridColumn dataField="ORG_CREAT"		headerText="' + orgCreat + '" 		textAlign="center" 	width="130"	formatter="{datefmt}"/>\
			<DataGridColumn dataField="PAY_CLOSE"		headerText="' + payClose + '" 		textAlign="center" 	width="130"	formatter="{datefmt}"/>\
			<DataGridColumn dataField="UDATE"			headerText="' + uDate + '" 			textAlign="center" 	width="130"	formatter="{datefmt}"/>\
			<DataGridColumn dataField="PAY_YM"			headerText="지불년월" 					visible="false"/>\
			<DataGridColumn dataField="PAY_SEQ"			headerText="지불차수" 					visible="false"/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';
//그리드1 데이터 초기화
var gridData = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

function fnSearch(){
	var loadData = $("#top_search").serializeAllObject();  
 
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/paymentCloseInfoList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){  
			gridApp1.setData(data.list);
			frmReset();
			
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

function fnUpdate(){
	var loadData = $("#reg_form").serializeAllObject();
	
	if(loadData.P_UDATE) {
		alert(msgPayClose);
		return;
	}
	
	if(!confirm(msgSaveConfirm)) return;
	
	//'원장해제' 일 경우.
	if(loadData.P_ORG_CREAT == '' || loadData.P_ORG_CREAT == null) {
		loadData.P_PAY_CLOSE = '';
	}

	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/paymentCloseUpdate.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){
			
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					frmReset();
					alert(msgSave);
					fnSearch();
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
	    	dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	    }
	});
}

//지불주기 선택 > 지불차수 출력.
function chgClose( closeType ) { 
	if( closeType == "ORG_CREAT")
	{
		if( $('#P_ORG_CREAT').val() == "" )
		{
			$("#P_PAY_CLOSE").val('');
			$("#P_PAY_CLOSE").attr("disabled", "disabled");
			//return;
		}
		else {
			$("#P_PAY_CLOSE").removeAttr("disabled"); // 활성화
		}
	}

}

function init() {
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	$("#P_SEARCH_DT").val(nowDateYm);
	getCommonCodeSelectBoxList("P_PAY_SEQ",   "PAY_SEQ");
	$("select").attr("disabled", "disabled");
	$("#P_PAY_SEQ").removeAttr("disabled");
}

function frmReset(){
	$("#P_PUR_CLOSE option").remove();
	$("#P_SALE_CLOSE option").remove();
	$("#P_JANG_CLOSE option").remove();
	$("#P_ORG_CREAT option").remove();
	$("#P_PAY_CLOSE option").remove();
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-193);

	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-193);
	});
});