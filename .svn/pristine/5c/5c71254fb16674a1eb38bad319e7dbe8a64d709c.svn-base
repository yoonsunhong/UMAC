/********************************************************
 * 설명:  보류등록(해제) 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.01.11
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
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";



// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%", "700px");
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
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1">\
		<columns>\
			<DataGridColumn dataField="APP_DT"  	headerText="' + occurDate + '"  	textAlign="center" 	width="130"	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="STR_NAME" 	headerText="' + store + '" 			textAlign="center" 	width="130"	/>\
			<DataGridColumn dataField="CUST_NO"  	headerText="' + cusNo + '"			textAlign="center" 	width="130"	/>\
			<DataGridColumn dataField="CUS_NAME"	headerText="' + cusName + '" 		textAlign="center" 	width="130"	/>\
			<DataGridColumn dataField="MNUL_POINT"  headerText="' + point + '" 			textAlign="right" 	width="130"	formatter="{numfmt}" id="POINT"/>\
			<DataGridColumn dataField="MNUL_REASON" headerText="' + reasonGubun + '" 	textAlign="center"  width="200" />\
			<DataGridColumn dataField="REMARK"		headerText="' + detailMemo + '" 	textAlign="left" 	/>\
			<DataGridColumn dataField="IEMP_NO"		headerText="' + inputName + '" 		textAlign="center" 	width="130"	/>\
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
	/*if($.trim($("#D_STR_CODE").val() ) == null || $.trim($("#D_STR_CODE").val() ) == "")
	{
		confirm(storNm + msgConfirm);
		$("#D_STR_CODE").focus();
		return;
	}*/
	
	var loadData = $("#top_search").serializeAllObject(); 
 
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/salesMngPointList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: loadData,
		success:function(data){  
			gridApp1.setData(data.list);
			resultList = data.result;
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}


function init() {
	var nowDate = new CommDateManager().getDate("yyyy-mm-dd");
	var firstDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	
	$("#P_SEARCH_END_DT").val(nowDate);
	$("#P_SEARCH_START_DT").val(firstDate);
	$("#P_APP_DT").val(nowDate);
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################