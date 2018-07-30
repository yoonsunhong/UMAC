/********************************************************
 * 설명:  점간대출등록
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2017.05.03
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
	
	var P_DOUT_STR_DT =new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var P_DOUT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#top_search input[name=P_DOUT_STR_DT]').val(P_DOUT_STR_DT);
	$('#top_search input[name=P_DOUT_END_DT]').val(P_DOUT_END_DT);
	
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
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var startDate = parseInt($("#top_search input[name=P_DOUT_STR_DT]").val().replace(/-/g, ""));
			var endDate = parseInt($("#top_search input[name=P_DOUT_END_DT]").val().replace(/-/g, ""));
			if(startDate > endDate)
			{
				alert(msgDateValidation);
				
				if(this.id == "P_DOUT_STR_DT")
					$("#top_search input[name=P_DOUT_STR_DT]").val(P_DOUT_STR_DT);
				else if(this.id == "P_DOUT_END_DT")
					$("#top_search input[name=P_DOUT_END_DT]").val(P_DOUT_END_DT);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
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

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드1 데이터 초기화
var gridData1 = [];
var gridData2 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1, collection2;
var gridApp2, gridRoot2, dataGrid2,dataRow2,clickData2,selectorColumn2, collection2, rowIndex2;

//----------------------- 그리드 설정 끝 -----------------------


//<DataGrid id="dg1" sortableColumns="true" editable="true" itemEditBeginningJsFunction="itemFunc2" selectionMode="multipleRows">\
//그리드1 헤더 설정
// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}


function init() {
	$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ select +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
	$("#top_search select[name=P_STR_CODE]").val($("#SESSION_STR_CODE").val());
	
	$("#top_search select[name=P_DIN_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_DIN_STR_CODE]");
	
	$("#DIN_STR_CODE").append('<option value="">'+ select +'</option>');
	getStoreCode("DIN_STR_CODE");
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################



//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################

//출력
function btn_print(){
	var P_CORP_CODE 	= $("#CORP_CODE").val();
	var P_STR_CODE 		= $("#P_STR_CODE").val();
	var P_DIN_STR_CODE 	= $("#P_DIN_STR_CODE").val();
	var P_DOUT_STR_DT 	= $("#P_DOUT_STR_DT").val().replace(/-/gi,"");;
	var P_DOUT_END_DT 	= $("#P_DOUT_END_DT").val().replace(/-/gi,"");;
	var P_CFM_YN 		= $("#P_CFM_YN").val();

	
	if(setValidation()){
		var params = "?reportMode=HTML"	+
					"&P_CORP_CODE="		+P_CORP_CODE+
					"&P_STR_CODE="		+P_STR_CODE+
					"&P_DIN_STR_CODE="	+P_DIN_STR_CODE+
					"&P_DOUT_STR_DT="	+P_DOUT_STR_DT+
					"&P_DOUT_END_DT="	+P_DOUT_END_DT+
					"&P_CFM_YN="		+P_CFM_YN;
		
		window.open("/aireportInoutSumPrint.do"+ params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	}
}


//출력
function btn_print2(){
	var P_CORP_CODE 	= $("#CORP_CODE").val();
	var P_STR_CODE 		= $("#P_STR_CODE").val();
	var P_DIN_STR_CODE 	= $("#P_DIN_STR_CODE").val();
	var P_DOUT_STR_DT 	= $("#P_DOUT_STR_DT").val().replace(/-/gi,"");;
	var P_DOUT_END_DT 	= $("#P_DOUT_END_DT").val().replace(/-/gi,"");;
	var P_CFM_YN 		= $("#P_CFM_YN").val();
	
	
	if(setValidation()){
		var params = "?reportMode=HTML"	+
					"&P_CORP_CODE="		+P_CORP_CODE+
					"&P_STR_CODE="		+P_STR_CODE+
					"&P_DIN_STR_CODE="	+P_DIN_STR_CODE+
					"&P_DOUT_STR_DT="	+P_DOUT_STR_DT+
					"&P_DOUT_END_DT="	+P_DOUT_END_DT+
					"&P_CFM_YN="		+P_CFM_YN;
		
		window.open("/aireportInoutSumStorePrint.do"+ params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	}
}

function btn_print3(){
	var P_CORP_CODE		= $("#CORP_CODE").val();
	var P_STR_CODE 		= $("#P_STR_CODE").val();
	var P_DIN_STR_CODE 	= $("#P_DIN_STR_CODE").val();
	var P_DOUT_STR_DT 	= $("#P_DOUT_STR_DT").val().replace(/-/gi,"");;
	var P_DOUT_END_DT 	= $("#P_DOUT_END_DT").val().replace(/-/gi,"");;
	var P_CFM_YN 		= $("#P_CFM_YN").val();

	if(setValidation()){
		var params = "?reportMode=HTML"	+
		"&P_CORP_CODE="		+P_CORP_CODE+
		"&P_STR_CODE="		+P_STR_CODE+
		"&P_DIN_STR_CODE="	+P_DIN_STR_CODE+
		"&P_DOUT_STR_DT="	+P_DOUT_STR_DT+
		"&P_DOUT_END_DT="	+P_DOUT_END_DT+
		"&P_CFM_YN="		+P_CFM_YN;
		
		if($('#P_CFM_YN').val()=="Y"){
			console.log("확정");
			window.open("/aireportInoutSumStorePrint2.do"+ params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
		}else if($('#P_CFM_YN').val()=="N"){
			console.log("미확정");
			window.open("/aireportInoutSumStorePrint.do"+ params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
		}
	}
}


//유효성검사
function setValidation(){
	var P_STR_DT_ARR	= $("#P_DOUT_STR_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_DOUT_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	var P_STR_CODE 		= $("#P_STR_CODE").val();
	
	
	if(P_STR_CODE == null || P_STR_CODE == ""){
		alert("대출점포를 선택 해 주세요.");
		$("#P_STR_CODE").focus();
		return false;
	}

	if(dateDiff1 > 60) {
		alert("조회기간 60일 이상은 조회하실 수 없습니다.");
		$("#P_DOUT_STR_DT").focus();
		return false;
	}
	
	return true;
}
