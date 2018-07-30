/********************************************************
 * 설명:  업체여신한도관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.02.01
 * version : 1.0
 ********************************************************/

$(document).ready(function(){
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	datePickerYearMonth();
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	$("#P_SEARCH_DT").val(nowDateYm);
	
	//초기 팝업 사이즈 조절
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    resizable : false,
	    position : "center"
	});
	
	$("#gridHolder2").width("100%");
	
	var height = $(window).height() - 322;
	
	$("#gridHolder2").height(height);
	
	$(window).on('resize',function (){	
		$("#gridHolder2").height(height);
	});
	
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
rMateGridH5.create("grid2", "gridHolder2", jsVars, "100%");

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
		
	}else if(id == "grid2"){
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2;

//----------------------- 그리드 설정 끝 -----------------------
var layoutStr1;
var layoutStr2;
//그리드1 헤더 설정

layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="No"  				headerText="' + rowNumber + '"		textAlign="center" 	width="50"	itemRenderer="IndexNoItem" />\
			<DataGridColumn dataField="VEN_CODE"  			headerText="' + venCode + '"  		textAlign="center" 	width="100"	/>\
			<DataGridColumn dataField="VEN_NAME"  			headerText="' + venName + '"		textAlign="left" 	width="160"	/>\
			<DataGridColumn dataField="PAY_SEQ"				headerText="' + paySeq + '" 		textAlign="right" 	width="130" />\
			<DataGridColumn dataField="CREDIT_LIMIT"  		headerText="' + creditLimit + '" 	textAlign="right" 	width="130" formatter="{numfmt}"/>\
			<DataGridColumn dataField="NEXT_CREDIT_LIMIT"  	headerText="' + nextCreditLimit + '" textAlign="right" 	width="130" formatter="{numfmt}"/>\
			<DataGridColumn dataField="PUR_AMT"				headerText="' + puchasAmount + '" 	textAlign="right" 	width="130" formatter="{numfmt}"/>\
			<DataGridColumn dataField="PAY_AMT" 			headerText="' + paymentAmount + '" 	textAlign="right"   width="130" formatter="{numfmt}"/>\
			<DataGridColumn dataField="ADJUST_AMT"			headerText="' + adjustAmt + '" 		textAlign="right" 	width="130" formatter="{numfmt}"/>\
			<DataGridColumn dataField="AVAIL_AMT"			headerText="' + availAmt + '" 		textAlign="right" 	width="130" formatter="{numfmt}"/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1">\
			<columns>\
				<DataGridColumn dataField="P_CORP_CODE"  	headerText="' + corpCode + '"		textAlign="center" 	width="80"	/>\
				<DataGridColumn dataField="P_PAY_YM"  		headerText="' + payYm + '"			textAlign="center" 	width="100"	/>\
				<DataGridColumn dataField="P_VEN_CODE"  	headerText="' + venCode + '"  		textAlign="center" 	width="110"	/>\
				<DataGridColumn dataField="P_PAY_SEQ"		headerText="' + paySeq + '" 		textAlign="right" 	width="80" />\
				<DataGridColumn dataField="P_PUR_AMT"  		headerText="' + puchasAmount + '" 	textAlign="right" 	width="130" formatter="{numfmt}"/>\
				<DataGridColumn dataField="P_PAY_AMT"  		headerText="' + paymentAmount + '" 	textAlign="right" 	width="130" formatter="{numfmt}"/>\
				<DataGridColumn dataField="P_ADJUST_AMT"  	headerText="' + adjustAmt + '" 		textAlign="right" 	width="130" formatter="{numfmt}"/>\
				<DataGridColumn dataField="P_IEMP_NO"		headerText="' + staffNo + '" 		textAlign="right" 	width="130"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//그리드1 데이터 초기화
var gridData = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}
}

//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
}

function fnSearch(){
	var venName = $('#P_VEN_NAME' ).val();
	if(venName == null || venName == ''){
		$('#P_VEN_CODE' ).val('');
	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/paymentLimitInfoList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){  
			gridApp1.setData(data.list);
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

function fnPop(){
	$("#pop_wrap1").dialog("open");
	gridApp2.setData(null);
	gridApp2.resize();
}

//공통코드 상세 정보 팝업 닫기
function fnClose(){
	$("#pop_wrap1").dialog( "close" );
}

function excelDown() {
	location.href="/resources/js/page/payment/limit/CREDIT_LIMIT_SAMPLE.xlsx";
}

function excelImport() {
	var option = {
		layoutChangeOption:1,						// 레이아웃 변경 방식 - 0 : 사용자에게 질의, 1 : 현재 레이아웃에 데이터만 import, 2 : 헤더나 데이터에 따라 레이아웃을 재설정하고 데이터를 import
		headerRowCount:1,								// 헤더라인 수. 기본 값 0
		headerRowCountVisible:false,								// 헤더라인 수. 기본 값 0
		selectSheet:false,			// import한 파일내에 여러 Sheet가 있을 경우 사용자가 Sheet를 선택할 수 있도록 할 지 여부. (false일 경우 첫번째 Sheet를 가져옵니다) 기본 값 false
		useGroupedColumn:true           // 그룹컬럼 생성 여부. false일 경우 1줄의 컬럼만 생성됩니다.
	};
	// 엑셀 import
	//   파라메터 설명
	//   option : import시 사용할 옵션
	//   url : 서버에 불러올 URL
	gridRoot2.excelImport(option, "/gridExcelUp.do");	
	//gridRoot2.addEventListener("importComplete", importCompleteHandler4);
}

function fnUpdate(){
	if(!confirm(msgSaveConfirm)) return;
	
	var length = gridRoot2.getCollection().getSource().length;
	var arrPostData = new Array();
	var idx = 0;
	
	for (var i = 0; i < length; i++) {
		var rowData = gridRoot2.getCollection().getSource()[i];			
		arrPostData[i] = rowData;
		idx ++;
	};
	
	arrPostData = JSON.stringify(arrPostData);
	var postData = arrPostData;
	
	jQuery.ajax({ 
	    url:"/paymentLimitUpdate.do",         
	    type:"POST",
		datatype:"json",
		data: postData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					fnSearch();
					fnClose();
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


//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-83);

	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-83);
	});
	
	// 협력(매입)업체에서 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        }
	});
});