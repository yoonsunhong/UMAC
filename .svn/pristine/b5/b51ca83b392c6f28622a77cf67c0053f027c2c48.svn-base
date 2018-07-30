/********************************************************
 * 설명:  회원매출상세내역
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 추황영
 * since	: 2017.04.18
 * version : 1.0
 ********************************************************/



$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
//var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";



// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
//rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");
// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.


//전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var collection1; // 그리드의 데이터 객체
var gridData = [];
var totalCnt = 0;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호


function gridReadyHandler(id) {
	
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp1.setLayout(layoutStr1);	// 데이터와 그리드를 포함하는 객체
		gridApp1.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
//		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드1 헤더 및 레이아웃
var layoutStr1 ='';
// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################


//회원정보 조회
//function getGridData() {
//	if($("#P_BUSI_SD").val() == null || $("#P_BUSI_SD").val() == "")
//	{
//		alert(btnSearchDate + msgConfirm);
//		$("#P_BUSI_SD").focus();
//		return;		
//	}
//	if( $("#P_BUSI_ED").val() == null || $("#P_BUSI_ED").val() == "")
//	{
//		alert(btnSearchDate + msgConfirm);
//		$("#P_BUSI_ED").focus();
//		return;		
//	}
//	
//	var strDt = $("#P_BUSI_SD").val().replace(/-/g, "");
//	var endDt = $("#P_BUSI_ED").val().replace(/-/g, "");
//	if(strDt > endDt)
//	{
//		alert(msgDateValidation);
//		$("#P_BUSI_SD").focus();
//		return;
//	}
////	if($.trim($("#P_CUST_NO").val()) == null || $.trim($("#P_CUST_NO").val()) == "")
////	{
////		alert(msgMemberSearch);
////		btn_comm_user_search();
////		return;
////	}
//	
//	var param = $("#frm").serializeAllObject();
//	
//	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
//	jQuery.ajax({
//	    url:"/creditDpotDtlSelect.do",
//	    type:"POST",
//		datatype:"json",
//		//async:false,
//		data: param,
//		beforeSend : function(){
//			gridRoot1.addLoadingBar();
//		},
//		success:function(data){
//			gridApp1.setData(data);
//	    },
//	    complete : function(data) {
//			gridRoot1.removeLoadingBar();
//	    },
//	    error : function(xhr, status, error) {
//	    	CommonJs.alertErrorStatus(xhr.status, error);
//			gridRoot1.removeLoadingBar();
//	    }
//	});
//}


function init() {
	
	// 점포코드 콤보 가져오기
	//$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
	$("#top_search select[name=P_STR_CODE]").val($("#SESSION_STR_CODE").val());
	
	//달력설정
	$(".datepicker").datepicker();
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_SALE_DT").val(date);
	
	$("#btn_print").click(function() {
		btn_print();
	});
}

function btn_print(){
	var P_CORP_CODE		= $("#P_CORP_CODE").val();
	var P_STR_CODE		= $("#P_STR_CODE").val();
	var P_SALE_DT		= $("#P_SALE_DT").val().replace(/-/gi,'');
	var params 			= "";
	
	params = "?reportMode=HTML"	+
			"&P_CORP_CODE="		+P_CORP_CODE+
			"&P_STR_CODE="		+P_STR_CODE+
			"&P_SALE_DT="		+P_SALE_DT;
	
	// AIViewer 파라미터
	window.open("aireportDaylySalesStatePrint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
}
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
