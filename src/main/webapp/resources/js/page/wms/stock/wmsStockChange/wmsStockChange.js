/********************************************************
*    설명: WMS - 할당 조정
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2018-02-01     송원두        초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/
	
$(document).ready(function(){
	
	init();

//	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	
//	var beforeMonthDate = new CommDateManager().before(0, 0,1).getDate("yyyy-mm-dd"); // 일주일전 before(년,월,일)
//	
//	$("#P_INV_DT").val(beforeMonthDate);
	
	// 재고조사 물류센터 리스트 조회
	$("#iframeCnt select[name=P_STR_NAME]").append('<option value="">'+ select +'</option>');
	
	var loadData= {};
	
	jQuery.ajax({
	    type:"POST",
	    url:"/getWmsStockOrganizationList.do", 	//WmsStockScheduleController.java 호출
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:loadData,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#P_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
		
	// 팝업의 조회조건절의 엔터시 검색되게....
	$("input[name=P_ITM_NAME]").keydown(function (key) { 
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_product_search();
		} 
	});
	
	
	//숫자만 입력 가능하도록
	$("#INS_PUR_QTY, #INS_ALLO_QTY, #P_DIFF_QTY").keypress(function (event) {
		var key = event.charCode || event.keyCode || 0; // keyCode를 가져온다
	    var keyValue = event.key; // jquery로 눌려진 값을 가져온다
	    var str = $("#INS_PUR_QTY, #INS_ALLO_QTY, #P_DIFF_QTY").val(); // 현재 input태그에 입력된 문자열을 가져온다
	    var regex = /^[-]?\d*$/g; // 음수처리를 위한 정규식, 맨 앞에 '-'가 오거나 숫자가 올 수 있다
	    var totalStr = String(str).replace(/^\s+|\s+$/g, "") + keyValue; // concat
	    
	    if(key == 8 || key == 9 || key == 46 ){
	        // 8, 9, 46번은 backspace, tab, del의 keyCode -> 무조건 통과
	        return true;
	    }else if(key == 45 || (key >= 37 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)){

	        // 45 : '-', 37~40 : 방향키, 48~57 과 96~105 : 숫자키(오른쪽키패드 포함)
	        if(regex.test(totalStr)){
	            return;
	        }else{
	            return false;
	        }
	    }else{
	        return false;
	    }

	});

	//입고수량, 할당수량 1,000단위 콤마찍기
	$("#INS_PUR_QTY, #INS_ALLO_QTY").number(true);
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";
var jsVars3 = "rMateOnLoadCallFunction=gridReadyHandler3";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid2", "gridHolder2", jsVars2);
rMateGridH5.create("grid3", "gridHolder3", jsVars3);

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1;
var gridApp2, gridRoot2, dataGrid2, dataRow2,clickData2,selectorColumn2, collection2;
var gridApp3, gridRoot3, dataGrid3, dataRow3,clickData3,selectorColumn3, collection3;

//그리드 데이터 초기화
var gridData1 = [];
var gridData2 = [];
var gridData3 = [];

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp1.setData(gridData1);

	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	
}

//그리드1 layoutCompleteHandler1
function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
	
	dataGrid1.setDoubleClickEnabled(true);
	
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
}
//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid();
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();	
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
    
	var loadData = $("#top_search").serializeAllObject();
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	//로딩바보이기
	showLoadingBar3();
	//그리드3 데이터 조회 및 그리드 데이터 셋팅(현 재고)
	jQuery.ajax({ 
	    url:"/getWmsStockChangePreList.do",         
	    type:"POST",
		datatype:"json",
		
		data: loadData,
		success:function(data){  
			gridData3 = data.list; 
			gridApp3.setData(data.list);
		
	    },
	    complete : function(data) {
	    	hideLoadingBar3();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar3();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//그리드1 더블클릭 이벤트
function itemDoubleClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	//var column = dataGrid1.getDisplayableColumns()[columnIndex];

	$("#INS_PUR_DT").val(CommonJs.dateFormat(dataRow1.PUR_DT, '-'));//입고일자
	$("#INS_SEQ").val(dataRow1.SEQ);						//순번
	$("#INS_ITM_CODE").val(dataRow1.ITM_CODE);				//상품코드
	$("#INS_ITM_NAME").val(dataRow1.ITM_NAME);				//상품명
	$("#INS_LINE_CODE").val(dataRow1.LINE_CODE);			//LineCode
	$("#INS_PUR_QTY").val(dataRow1.PUR_QTY);				//입고수량
	$("#INS_ALLO_QTY").val(dataRow1.ALLO_QTY);				//할당수량
	$("#INS_DIFF_QTY").val(dataRow1.DIFF_QTY);				//차이수량(입고수량-조정수량)
	$("#INS_REMARK").val(dataRow1.REMARK);					//변경사유
	$("#INS_VALID_STR_DT").val(CommonJs.dateFormat(dataRow1.VALID_STR_DT, '-'));		//유효기간
	$("#INS_VALID_END_DT").val(CommonJs.dateFormat(dataRow1.VALID_END_DT, '-'));
}

//그리드 2 ReadyHandler
function gridReadyHandler2(id) {
    // rMateGrid 관련 객체
    gridApp2 = document.getElementById(id);  // 그리드를 포함하는 div 객체
    gridRoot2 = gridApp2.getRoot();   // 데이터와 그리드를 포함하는 객체
 
    gridApp2.setLayout(layoutStr2);
    gridApp2.setData(gridData2);
    
    gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
}
//그리드2 layoutCompletehandler
function layoutCompleteHandler2() {
        dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
    }
//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 그리드 객체
	dataGrid2 = gridRoot2.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
}


//그리드 3 ReadyHandler
function gridReadyHandler3(id) {
    // rMateGrid 관련 객체
    gridApp3 = document.getElementById(id);  // 그리드를 포함하는 div 객체
    gridRoot3 = gridApp3.getRoot();   // 데이터와 그리드를 포함하는 객체
 
    gridApp3.setLayout(layoutStr3);
    gridApp3.setData(gridData3);
    
    gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
}
//그리드3 layoutCompletehandler
function layoutCompleteHandler3() {
        dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
    }

//그리드3 컴플릿트 핸들러
function dataCompleteHandler3(event) {
	
	// 그리드 객체
	dataGrid3 = gridRoot3.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection3 = gridRoot3.getCollection();
}
 
//----------------------- 그리드 설정 끝 -----------------------


//<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="40" /> 넘버링을 하면 병합오류 발생
//그리드1<Wms입고내역> 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle" showDataTips="true">\
			<groupedColumns>\
				<DataGridColumn dataField="NUM" 			headerText="No"			textAlign="center"	sortable="false"						width="40"	/>\
			 	<DataGridColumn dataField="PUR_DT" 			headerText="입고일자"		textAlign="center"	sortable="false" formatter="{datefmt}"	width="110"	/>\
				<DataGridColumn dataField="SEQ" 			headerText="순번" 		textAlign="center"	sortable="false"						width="60"	/>\
				<DataGridColumn dataField="LINK_CODE" 		headerText="스캔코드" 		textAlign="center"	sortable="false"  						width="100"	/>\
				<DataGridColumn dataField="ITM_CODE" 		headerText="상품코드" 		textAlign="center"	sortable="false"	visible="false"		width="100"	/>\
				<DataGridColumn dataField="ITM_NAME" 		headerText="상품명" 		textAlign="left"  	sortable="false" 									/>\
				<DataGridColumn dataField="LINE_CODE" 		headerText="라인코드" 		textAlign="center"	sortable="false"						width="80"	/>\
				<DataGridColumn dataField="UNIT" 			headerText="단위" 		textAlign="center"	sortable="false"						width="80"	/>\
				<DataGridColumn dataField="IPSU_QTY"		headerText="입수" 		textAlign="right"	sortable="false" 						width="80"	/>\
				<DataGridColumn dataField="PUR_QTY" 		headerText="입고수량" 		textAlign="right"	sortable="false" formatter="{numfmt}"	width="80"	/>\
				<DataGridColumn dataField="ALLO_QTY"		headerText="할당수량" 		textAlign="right"	sortable="false" formatter="{numfmt}"	width="80"	/>\
				<DataGridColumn dataField="DIFF_QTY"		headerText="차이수량" 		textAlign="right"	sortable="false" formatter="{numfmt}"	width="80"	/>\
				<DataGridColumn dataField="PUR_WPRC" 		headerText="WPRC" 		textAlign="center"	sortable="false" visible="false" 					/>\
				<DataGridColumn dataField="PUR_SPRC" 		headerText="SPRC" 		textAlign="center"	sortable="false" visible="false" 					/>\
				<DataGridColumn dataField="VALID_STR_DT" 	headerText="유효기간"		textAlign="center"	sortable="false" formatter="{datefmt}"	width="110"	/>\
				<DataGridColumn dataField="VALID_END_DT" 	headerText="유효기간" 		textAlign="center"	sortable="false" formatter="{datefmt}"	width="110"	/>\
				<DataGridColumn dataField="IDATE"			headerText="생성일자" 		textAlign="center"	sortable="false"						width="110"	/>\
			</groupedColumns>\
	</DataGrid>\
</rMateGrid>';

//그리드2 헤더 설정
var layoutStr2 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg2" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle" showDataTips="true">\
			<groupedColumns>\
				<DataGridColumn dataField="NUM" 			headerText="No"			textAlign="center"	sortable="false"						width="34"	/>\
				<DataGridColumn dataField="PUR_DT" 			headerText="입고일자" 		textAlign="center"	sortable="false" formatter="{datefmt}"	width="90"	/>\
				<DataGridColumn dataField="SEQ" 			headerText="순번" 		textAlign="center"	sortable="false"  						width="45"	/>\
				<DataGridColumn dataField="ITM_CODE"		headerText="상품코드" 		textAlign="center"	sortable="false" visible="false"		width="110"	/>\
				<DataGridColumn dataField="ITM_NAME" 		headerText="상품명" 		textAlign="left"  	sortable="false" 									/>\
				<DataGridColumn dataField="LINK_CODE" 		headerText="스캔코드" 		textAlign="center"	sortable="false"  						width="110"	/>\
				<DataGridColumn dataField="LINE_CODE" 		headerText="라인코드" 		textAlign="center"	sortable="false" 						width="70"	/>\
				<DataGridColumn dataField="PUR_QTY" 		headerText="입고수량" 		textAlign="right" 	sortable="false" formatter="{numfmt}"	width="65"	/>\
				<DataGridColumn dataField="CHG_PUR_QTY" 	headerText="입고변경" 		textAlign="center"	sortable="false" visible="false"					/>\
				<DataGridColumn dataField="ALLO_QTY" 		headerText="할당수량" 		textAlign="right"	sortable="false" formatter="{numfmt}"	width="65"	/>\
				<DataGridColumn dataField="CHG_ALLO_QTY"	headerText="조정수량" 		textAlign="right"	sortable="false" formatter="{numfmt}"	width="65"	/>\
				<DataGridColumn dataField="VALID_STR_DT" 	headerText="유효기간" 		textAlign="center"	sortable="false" formatter="{datefmt}"	width="90"	/>\
				<DataGridColumn dataField="VALID_END_DT" 	headerText="유효기간" 		textAlign="center"	sortable="false" formatter="{datefmt}"	width="90"	/>\
				<DataGridColumn dataField="REMARK" 			headerText="사유" 		textAlign="left"	sortable="false"									/>\
				<DataGridColumn dataField="IEMP_NO" 		headerText="수정자사번"		textAlign="center"	sortable="false" visible="false"					/>\
				<DataGridColumn dataField="USER_NM" 		headerText="수정자" 		textAlign="center"	sortable="false"						width="70"	/>\
				<DataGridColumn dataField="IDATE" 			headerText="수정일자" 		textAlign="center"	sortable="false" formatter="{datefmt}"	width="90"	/>\
			</groupedColumns>\
	</DataGrid>\
</rMateGrid>';

//그리드3 헤더 설정
var layoutStr3 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg3" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle" showDataTips="true">\
			<groupedColumns>\
			 	<DataGridColumn dataField="STR_CODE" 		headerText="점포코드" 		textAlign="center"	sortable="false" 						width="65"	/>\
				<DataGridColumn dataField="STR_NAME" 		headerText="점포명"		textAlign="center"	sortable="false" visible="false"					/>\
				<DataGridColumn dataField="SCAN_CODE" 		headerText="스캔코드" 		textAlign="center"	sortable="false" 						width="99"	/>\
				<DataGridColumn dataField="ITM_CODE" 		headerText="상품코드" 		textAlign="center"	sortable="false" visible="false"		width="99"	/>\
				<DataGridColumn dataField="ITM_NAME" 		headerText="상품명" 		textAlign="left"	sortable="false" 						width="58"	/>\
				<DataGridColumn dataField="LINE_CODE" 		headerText="라인코드" 		textAlign="center"	sortable="false" 						width="65"	/>\
				<DataGridColumn dataField="CUR_INV_QTY"		headerText="현 재고" 		textAlign="right"	sortable="false" formatter="{numfmt}"	width="58"	/>\
				<DataGridColumn dataField="UDATE" 			headerText="최종수정일자"	textAlign="center"	sortable="false" 						width="90"	/>\
			</groupedColumns>\
	</DataGrid>\
</rMateGrid>';
// ----------------------- 그리드 설정 끝 -------------------------------------


function init() {

}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )							   ###
//########################################################
 

//점포명 변경 EVENT(2. 1)
function fnStrChange(){
	
	 $("#P_STR_CODE").val($("#P_STR_NAME").val());
	 
}

//저장
function btn_save(){
	//입력폼 데이터
	var loadData = $("#wmsproduct_detail").serializeAllObject();
	
	//폼 벨리데이션 검사로직 추가.
	if(parseInt(loadData.INS_PUR_QTY) < parseInt(loadData.INS_ALLO_QTY)){
		alert("조정수량은 입고수량 보다 클 수 없습니다.");
		$("#INS_ALLO_QTY").focus();
		return false;
	} 
	
	if($("#INS_ALLO_QTY").val() == ""){
		alert("조정수량을 입력하세요.");
		$("#INS_ALLO_QTY").focus();
		return false;
	}
	
	//dataRow1 = 그리드1 선택한 필드 전체 데이터
	loadData.P_PUR_DT = dataRow1.PUR_DT;
	loadData.P_SEQ = loadData.INS_SEQ;
	loadData.P_LINK_CODE = dataRow1.LINK_CODE;
	loadData.P_ITM_CODE = loadData.INS_ITM_CODE;
	loadData.P_ITM_NAME = loadData.INS_ITM_NAME;
	loadData.P_LINE_CODE = loadData.INS_LINE_CODE;
	loadData.P_UNIT = dataRow1.UNIT;
	loadData.P_IPSU_QTY = dataRow1.IPSU_QTY;
	loadData.P_PUR_QTY = loadData.INS_PUR_QTY;
	loadData.P_CHG_PUR_QTY = dataRow1.CHG_PUR_QTY;
	loadData.P_ALLO_QTY = loadData.INS_ALLO_QTY;
	loadData.P_CHG_ALLO_QTY = dataRow1.ALLO_QTY;
	loadData.P_PUR_WPRC = dataRow1.PUR_WPRC;
	loadData.P_PUR_SPRC = dataRow1.PUR_SPRC;
	loadData.P_DIFF_QTY = loadData.INS_DIFF_QTY;
	loadData.P_REMARK = loadData.INS_REMARK;
	loadData.P_VALID_STR_DT = dataRow1.VALID_STR_DT;
	loadData.P_VALID_END_DT = dataRow1.VALID_END_DT;
	loadData.P_IDATE = dataRow1.IDATE;
	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	
//	loadData.P_INS_LINE_CODE = loadData.INS_LINE_CODE;
//필수입력값 체크 (숫자만, 입력안했을경우, 더블클릭으로 데이터불러와야 되는데 안그런경우는 더블클릭으로 선택하라는 메세지..ㄷㄷㄷㄷㄷ
	
	//숫자칸에 문자가 들어갔을경우
	
	if(confirm("저장 하시겠습니까?") == false) return;
	
	//저장
	jQuery.ajax({ 
	    url:"/saveWmsStockChangeUpdate.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: loadData, 
		success:function(data){  
			if(data[0].RETURN_CODE == '0000'){
				alert("저장 되었습니다.");
				btn_search();
			}else{
				//요청중 문제가 발생했습니다.관리자에게 문의하세요.
				alert(msgErrorDefault);
				return;
			}
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});	
}


//WMS 할당변경 폼 초기화
function clearForm(){
	$('#INS_PUR_DT' ).val('');
	$('#INS_SEQ' ).val('');
	$('#INS_ITM_CODE' ).val('');
	$('#INS_ITM_NAME' ).val('');
	$('#INS_LINE_CODE' ).val('');
	$('#INS_PUR_QTY' ).val('');
	$('#INS_ALLO_QTY' ).val('');
	$('#INS_DIFF_QTY' ).val('');
	$('#INS_REMARK' ).val('');
	$('#INS_VALID_STR_DT' ).val('');
	$('#INS_VALID_END_DT' ).val('');	
}

//조회
function btn_search(){
	clearForm();
	
	var loadData = $("#top_search").serializeAllObject();
	loadData.P_LINE_CODE = $("#P_LINE_CODE").val();
	loadData.P_DIFF_QTY = $("#P_DIFF_QTY").val();
	
	if(loadData.P_STR_CODE==""){
		//점포는 필수입력 입니다.
		alert(stockRealMent4);
		$('#P_STR_NAME').focus();
	}else if(loadData.P_ITM_NAME==""){
		alert("상품명을 입력해주세요");
	}
	//그리드1 데이터 조회 및 그리드 데이터 셋팅(입고내역)
	jQuery.ajax({ 
	    url:"/getWmsStockChangeList.do",         
	    type:"POST",
		datatype:"json",
		
		data: loadData,
		success:function(data){  
			gridData1 = data; 
			gridApp1.setData(data);
	    },
	    complete : function(data) {
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//그리드2 데이터 조회 및 그리드 데이터 셋팅(변경내역)
	jQuery.ajax({ 
	    url:"/getWmsStockChangeInfoList.do",         
	    type:"POST",
		datatype:"json",
		
		data: loadData,
		success:function(data){  
			gridData2 = data; 
			gridApp2.setData(data);
		
	    },
	    complete : function(data) {
	    	hideLoadingBar2();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar2();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//그리드3 데이터 조회 및 그리드 데이터 셋팅(현 재고)
	jQuery.ajax({ 
	    url:"/getWmsStockChangePreList.do",         
	    type:"POST",
		datatype:"json",
		
		data: loadData,
		success:function(data){  
			gridData3 = data.list; 
			gridApp3.setData(data.list);
		
	    },
	    complete : function(data) {
	    	hideLoadingBar3();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar3();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITM_NAME").val());
		btn_comm_search('2');
	}
}

//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#P_ITM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
	$('#P_ITM_CODE' ).val(dataRow.ITM_CODE);				// 상품코드
	//$('#SCAN_CODE' ).val(SCAN_CODE);			// 스캔코드
	//$('#ITM_SHORT_NAME' ).val(ITM_SHORT_NAME);	// 단축상품명
}

//그리드 로딩바  보이기
function showLoadingBar1() {
	gridRoot1.addLoadingBar();
	}
function showLoadingBar2() {
	gridRoot2.addLoadingBar();
	}
function showLoadingBar3() {
	gridRoot3.addLoadingBar();
	}

//그리드 로딩바  숨기기
function hideLoadingBar1() {
	gridRoot1.removeLoadingBar();
	}
function hideLoadingBar2() {
	gridRoot2.removeLoadingBar();
	}
function hideLoadingBar3() {
	gridRoot3.removeLoadingBar();
	}

/**
 * 글자수(바이트 체크)
 * @param oid : 글자를 받을 Textarea 오브젝트
 * @param maxByte : 바이트 체크할 값
 */
function fnChkByte(obj, maxByte){
	var str = obj.value;
	var str_len = str.length;

	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";

	for(var i=0; i<str_len; i++){
	one_char = str.charAt(i);
	if(escape(one_char).length > 4){
	    rbyte += 2;                                         //한글2Byte
	}else{
	    rbyte++;                                            //영문 등 나머지 1Byte
	}

	if(rbyte <= maxByte){
	    rlen = i+1;                                          //return할 문자열 갯수
	}
	}

	if(rbyte > maxByte){
	    //alert("한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
		alert(msgValueLength); //입력할 수 있는 문자열의 길이를 초과하였습니다.
	    str2 = str.substr(0,rlen);                                  //문자열 자르기
	    obj.value = str2;
	    fnChkByte(obj, maxByte);
	}
}
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").width("100%");
	$(".col2 .box_lft").width(457);
	$(".col2 .box_rgt").css("marginLeft","457px");
	$("#gridHolder3").width($(".col2 .box_lft").width()-15);
	$("#gridHolder2").width("100%");
	/*if ( $(window).width <= 1200 ) $($("#frame_box").width(960));*/
	var hei = ($(window).height() - 157) / 5;

	$("#gridHolder1").height(hei*3);
	$("#gridHolder3").height(hei*1);
	$("#gridHolder2").height(hei*1);

	$(window).on('resize',function (){	

		var hei = ($(window).height() - 157) / 5;
		
		$("#gridHolder1").height(hei*3);
		$("#gridHolder3").height(hei*1);
		$("#gridHolder2").height(hei*1);
	});
});