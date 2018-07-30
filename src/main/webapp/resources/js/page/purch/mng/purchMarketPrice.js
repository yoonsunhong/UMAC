/********************************************************
 * 설명:  시세정보등록 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.04.10
 * version : 1.0
 ********************************************************/

$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	$(".datepicker").datepicker();
	
	$("#P_LRG_CODE").change(function(){
		var a = $("#P_LRG_CODE option:selected").text();
		if(a == "전체"){
			a = null;
		}
		$("#P_LRG_NAME").val(a);
	});
	
	$("#I_LRG_CODE").change(function(){
		var a = $("#I_LRG_CODE option:selected").text();
		if(a == "전체"){
			a = null;
		}
		$("#I_LRG_NAME").val(a);
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
		
		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			
			fnSearch(dataRow1.STR_CODE, dataRow1.APPL_DT, dataRow1.LRG_NAME);
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			//그리드1 셀선택 이벤트
			dataGrid1.addEventListener("itemClick", itemClickHandler);
		};
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	}else if (id == "grid2") {
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData);
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
	}
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
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
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0" />\
			<DataGridColumn dataField="STR_NAME"  	headerText="' + storNm + '"  		textAlign="center" />\
			<DataGridColumn dataField="APPL_DT" 	headerText="' + date + '" 			textAlign="center" formatter="{datefmt}"/>\
			<DataGridColumn dataField="LRG_NAME" 	headerText="' + categoryNm + '" 	textAlign="center" />\
			<DataGridColumn dataField="STR_CODE" 	headerText="점포코드" 	visible="false" 	/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" sortableColumns="true">\
			<columns>\
				<DataGridColumn dataField="ITM_NAME" 	headerText="' + product + '"  	textAlign="center" 	width="130" />\
				<DataGridColumn dataField="ORG_NAME" 	headerText="' + orgName + '" 	textAlign="center" 	width="160" />\
				<DataGridColumn dataField="UNIT"  		headerText="' + standard + '"	textAlign="center" 	width="100"	/>\
				<DataGridColumn dataField="PRICE"		headerText="' + pricing + '" 	textAlign="right" 	width="100"	formatter="{numfmt}" />\
				<DataGridColumn dataField="REMARK"		headerText="' + remarks + '" 	textAlign="center" 	width="160"	/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//그리드1 데이터 초기화
var gridData = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

function fnSearch(detStrCode, detApplDt, detLrgName){
	var loadData 		= $("#top_search").serializeAllObject(); 
	var P_STR_DT_ARR	= $("#P_SEARCH_START_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_SEARCH_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SEARCH_START_DT").focus();
		return;
	}
	
	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	
	if(detStrCode != ""){
		$("#P_DET_STR_CODE").val(detStrCode);
		$("#P_DET_APPL_DT").val(detApplDt);
		$("#P_DET_LRG_NAME").val(detLrgName);
	}else{
		$("#P_DET_STR_CODE").val("");
		$("#P_DET_APPL_DT").val("");
		$("#P_DET_LRG_NAME").val("");
	}
 
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/purchMarketPriceList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){
			if(detStrCode != ""){
				gridRoot2.addLoadingBar();
			}else{
				gridRoot1.addLoadingBar();
				gridRoot2.addLoadingBar();
			}
	    },
		success:function(data){  
			gridApp2.setData(data.list);
			if(detStrCode == ""){
				gridApp1.setData(data.codeList);
			}
	    },
	    complete : function(data) {
	    	if(detStrCode != ""){
	    		dataGrid2.setEnabled(true);
		       	gridRoot2.removeLoadingBar();
			}else{
				dataGrid1.setEnabled(true);
		       	gridRoot1.removeLoadingBar();
		       	dataGrid2.setEnabled(true);
		       	gridRoot2.removeLoadingBar();
			}
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	if(detStrCode != ""){
	    		dataGrid2.setEnabled(true);
		       	gridRoot2.removeLoadingBar();
			}else{
				dataGrid1.setEnabled(true);
		       	gridRoot1.removeLoadingBar();
		       	dataGrid2.setEnabled(true);
		       	gridRoot2.removeLoadingBar();
			}
	    }
	});
}

function excelDown() {
	location.href="/resources/js/page/purch/mng/MARKET_PRICE_SAMPLE.xlsx";
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

//상품시세 등록
function fnUpdate(){
	var param = setProList();
	if(param == "N") return;
	
	if($("#I_LRG_NAME").val() == ""){
		var a = $("#I_LRG_CODE option:selected").text();
		$("#I_LRG_NAME").val(a);
	}
	if(!confirm(msgSaveConfirm)) return;
	
	jQuery.ajax({ 
	    url:"/purchMarketPriceInsert.do",
	    type:"POST",
		datatype:"json",
		data: {
			'P_DATA_LIST' : param
		,	'I_STR_CODE' : $("#I_STR_CODE").val()
		,	'I_APPL_DT' : $("#I_APPL_DT").val()
		,	'I_LRG_NAME' : $("#I_LRG_NAME").val()
		},
		beforeSend : function(){ 	    	
            gridRoot2.addLoadingBar();
	    },
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					fnSearch('','','');
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
			dataGrid2.setEnabled(true);
	       	gridRoot2.removeLoadingBar();
	    },
	    complete : function(data) {
	    	dataGrid2.setEnabled(true);
	       	gridRoot2.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid2.setEnabled(true);
	       	gridRoot2.removeLoadingBar();
	    }
	});
}


//삭제
function fnDelete(){
	var selectorColumn = gridRoot1.getObjectById("selector");
	var selectedData = selectorColumn.getSelectedIndices();
	var ERR_CODE = 0;  
	
	
	if(selectedData.length < 1){
		alert("선택 된 내역이 없습니다.");
		return;
	}
	
	if(!confirm("삭제 하시겠습니까?")) return;
	
	for(var i = 0; i < selectedData.length ; i++)
	{  
		
		//  매입 삭제처리
		jQuery.ajax({ 
		    url:"/purchMarketPriceDelete.do",         
		    type:"POST",
			datatype:"xml",
			async:false,
			data: {    
		             "P_APPL_DT"     : gridRoot1.getItemFieldAt( selectedData[i] , "APPL_DT")
		             ,"P_LRG_NAME"     : gridRoot1.getItemFieldAt( selectedData[i] , "LRG_NAME")
		             ,"P_STR_CODE"	   : gridRoot1.getItemFieldAt( selectedData[i] , "STR_CODE")
		             
		    }, 
			success:function(data){   
				if(  data.RETURN_CODE  != "1111"){
					ERR_CODE = parseInt(ERR_CODE) + 1; 
				} 
		    },
		    complete : function(data) {  
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
		
		
	}
	
	if(ERR_CODE == 0)
	{
		alert('삭제 처리에 성공 하였습니다.');
	} else {
		alert('삭제 처리에 실패 하였습니다.'); 
	}
	
	fnSearch('','','');
}

// 그리드 데이터를 아래 형식으로 적재 후 return
function setProList()
{
	var paramData = "";
	var changedData = gridRoot2.getChangedData();
	if (changedData.length > 0)
	{
		// P_DATA_LIST 파리미터에 아래와 같은 형식의 스트링을 '$' '|' 두개의 구분자로 서버에전송 = '111|222|333,111|222|333,111|222|333'
		/* 상품|원산지|규격|가격|비고
		 * ITM_NAME|ORG_NAME|UNIT|PRICE|REMARK
		 */
		var data;
		for (var i = 0; i < changedData.length; i++)
		{
			data = changedData[i].data;
			if(isNaN(Number(data.PRICE))){
				alert(mentWmsIn2);
				return "N";
			}
			
			if(CommonJs.isNullToString(data.ITM_NAME, "") == ""){
				alert(itmName + msgConfirm);
				return "N";
			}
			
			if(CommonJs.isNullToString(data.UNIT, "") == ""){
				alert(standard + msgConfirm);
				return "N";
			}
			
			if(paramData != "")
			{
				paramData += "$";
			}
			paramData += CommonJs.isNullToString(data.ITM_NAME, "") + "|" + CommonJs.isNullToString(data.ORG_NAME, "")
				+ "|" + CommonJs.isNullToString(data.UNIT, "") + "|" + CommonJs.isNullToString(data.PRICE, "") + "|" + CommonJs.isNullToString(data.REMARK, "");
		}
		return paramData;
	}else{
		alert(stockRealMent17);
		return "N";
	}
}

function init() {
	var nowDate = new CommDateManager().getDate("yyyy-mm-dd");
	var firstDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	
	$("#P_SEARCH_END_DT").val(nowDate);
	$("#P_SEARCH_START_DT").val(firstDate);
	$("#I_APPL_DT").val(nowDate);
	
	getStoreCode("P_STR_CODE");
	getStoreCode("I_STR_CODE");
	
	getCommonCodeSelectBoxList("P_LRG_CODE",   "LRG_NAME");    //	분류명
	getCommonCodeSelectBoxList("I_LRG_CODE",   "LRG_NAME");    //	분류명
	
	$("#P_STR_CODE").val(SSSC).prop("selected", true);
	$("#I_STR_CODE").val(SSSC).prop("selected", true);
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	
	var w = $(window).width()-48;
	
	$(".lft_wid").width(300);
	$(".rgt_wid").width(w-310);
	$("#gridHolder1, #gridHolder2").height($(window).height() - 105);
	
	$("#pop_wrap1").css({position:'relative'});
	$("#pop_wrap1 > div").css({position:'absolute', top:'9px', left:'15px', width:'96%'});	
	
	$(window).on('resize',function (){	
		
		var w = $(window).width()-48;
		
		$(".lft_wid").width(300);
		$(".rgt_wid").width(w-310);
		$("#gridHolder1, #gridHolder2").height($(window).height() - 105);
	});
});