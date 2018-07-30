/********************************************************
 * 설명:  카드프리픽스 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.03.27
 * version : 1.0
 ********************************************************/

$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//초기 팝업 사이즈 조절
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 800,
	    height : 500,
	    resizable : false,
	    position : "center",
	    open: function(){
	    	$("body").css("overflow-y", "hidden");
	    },
	    close: function(){
	    	$("body").css("overflow-y", "scroll");
	    }  
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
rMateGridH5.create("grid3", "gridHolder3", jsVars, "100%", "300px");

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
			
			fnSearch(dataRow1.CD_ID);
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
	}else if (id == "grid3") {
		// rMateGrid 관련 객체)
		gridApp3 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot3 = gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp3.setLayout(layoutStr3);
		gridApp3.setData(gridData);
		
		var layoutCompleteHandler3 = function(event) {
			dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체 

			var CARD_CODE = gridRoot3.getObjectById("CARD_CODE");
			CARD_CODE.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('CARD_CODE') );
			
			var BANK_CODE = gridRoot3.getObjectById("BANK_CODE");
			BANK_CODE.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('BANK_CODE') );
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드3 핸들러 생성.
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3); 
	}  
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2;
var gridApp3, gridRoot3, dataGrid3, dataRow3, clickData3, selectorColumn3;

//----------------------- 그리드 설정 끝 -----------------------
var layoutStr1;
var layoutStr2;
var layoutStr3;
//그리드1 헤더 설정

layoutStr1 =
'<rMateGrid>\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="CD_ID"  	headerText="' + cardCode + '"  		textAlign="center" />\
			<DataGridColumn dataField="MGMT_ENTRY_1"  	headerText="매입사코드"  		textAlign="center" width="80" />\
			<DataGridColumn dataField="CD_NM" 	headerText="' + cardCompanyNm + '" 	textAlign="center" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

layoutStr2 =
	'<rMateGrid>\
		<DataGrid id="dg2" sortableColumns="true">\
			<columns>\
				<DataGridColumn dataField="CARD_PREFIX" headerText="' + cardPrefix + '"  	textAlign="center" 	width="130" />\
				<DataGridColumn dataField="MBR_DSNT" 	headerText="' + cardNm + '" 		textAlign="center" 	width="220" />\
				<DataGridColumn dataField="BANK_CODE"  	headerText="' + bankCodeCode + '"	textAlign="center" 	width="100"	/>\
				<DataGridColumn dataField="BANK_NAME"	headerText="' + bankNm + '" 		textAlign="center" 	width="160"	/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

layoutStr3 =
	'<rMateGrid>\
		<DataGrid id="dg3" editable="true" >\
			<columns>\
				<DataGridColumn dataField="CARD_PREFIX" headerText="' + cardPrefix + '"  	showEditableIcon="always"   itemRenderer="EditableIconItem" textAlign="center" 	width="130" type="int" />\
				<DataGridColumn dataField="MBR_DSNT" 	headerText="' + cardNm + '" 		showEditableIcon="always"   itemRenderer="EditableIconItem" textAlign="center" 	width="220" />\
				<DataGridColumn dataField="CARD_CODE"  	headerText="' + cardIssuer + '"		textAlign="center" 	width="100"	id="CARD_CODE" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="BANK_CODE"  	headerText="' + bankNm + '"			textAlign="center" 	width="160"	id="BANK_CODE" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';
//그리드1 데이터 초기화
var gridData = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

function fnSearch(detCardCode){
	if(detCardCode != ""){
		$("#P_DET_CARD_CODE").val(detCardCode);
	}else{
		$("#P_DET_CARD_CODE").val("");
	}
	var loadData = $("#top_search").serializeAllObject(); 
 
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/businessManageCardList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){  
			gridApp2.setData(data.list);
			if(detCardCode == ""){
				gridApp1.setData(data.codeList);
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

//카드 등록
function fnUpdate(){
	var param = setProList();
	if(param == "N") return;
	if(!confirm(msgSaveConfirm)) return;
	
	jQuery.ajax({ 
	    url:"/businessManageCardUpdate.do",
	    type:"POST",
		datatype:"json",
		data: {
			'P_DATA_LIST' : param
		},
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					btn_close();
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
	    }
	});
}

// 그리드 데이터를 아래 형식으로 적재 후 return
function setProList()
{
	var paramData = "";
	var changedData = gridRoot3.getChangedData();
	if (changedData.length > 0)
	{
		// P_DATA_LIST 파리미터에 아래와 같은 형식의 스트링을 ',' '|' 두개의 구분자로 서버에전송 = '111|222|333,111|222|333,111|222|333'
		/* 카드식별번호|카드명칭|카드코드   |은행코드|
		 * CARD_PREFIX|MBR_DSNT|CARD_CODE|BANK_CODE
		 */
		var data;
		for (var i = 0; i < changedData.length; i++)
		{
			data = changedData[i].data;
			if(CommonJs.isNullToString(data.CARD_PREFIX, "") == ""){
				alert(cardPrefix + msgConfirm);
				return "N";
			}
			if(paramData != "")
			{
				paramData += ",";
			}
			paramData += CommonJs.isNullToString(data.CARD_PREFIX, "") + "|" + CommonJs.isNullToString(data.MBR_DSNT, "")
				+ "|" + CommonJs.isNullToString(data.CARD_CODE, "") + "|" + CommonJs.isNullToString(data.BANK_CODE, "");
		}
		return paramData;
	}else{
		alert(stockRealMent17);
		return "N";
	}
}

//엑셀 export
function fnExcelExport(){
	var nowDate = new CommDateManager().getDate("yyyymmdd");
	dataGrid2.exportFileName = "export_"+nowDate+".xlsx";
	gridRoot2.excelExportSave("/gridExcelDown.do", false);
}

//팝업 오픈
function fn_pop_open(){
	gridApp3.setData([]);
	$("#pop_wrap1").dialog("open");
	gridApp3.resize();
}

// 팝업 닫기
function btn_close(){
	$("#pop_wrap1").dialog("close");
}

//행추가
function fn_addRow() {
	
	var item = {};
	
	gridRoot3.addItemAt(item, -1, false, -1);
}

function init() {
	getCommonCodeSelectBoxList("P_CARD_CODE",   "CARD_CODE");    //	카드코드
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