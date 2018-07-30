/********************************************************
*    설명: 영업정보 > 매입관리 > 평균단가조정등록(대출입)
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2018-03-23     송원두        초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/

$(document).ready(function() {

	init();

	// 최초 도움말 불러오기
	setHelpMessage($(location).attr('pathname').replace('/', ''));

	// 팝업의 조회조건절의 엔터시 검색되게....
	$("input[name=P_ITM_NAME]").keydown(function(key) {
		if (key.keyCode == 13) {// 키가 13이면 실행 (엔터는 13)
			btn_comm_store_search();
		}
	});

	// 팝업의 조회조건절의 엔터시 검색되게....
	$("input[name=P_INS_ITM_NAME]").keydown(function(key) {
		if (key.keyCode == 13) {// 키가 13이면 실행 (엔터는 13)
			btn_comm_product_search2();
		}
	});

	/** 검색조건 날짜 체크 */
	$(".datepicker1").datepicker({
		onSelect : function(dateText) {

		},
		showMonthAfterYear : true
	});

	/** 등록조건 날짜 체크 */
	$(".datepicker2").datepicker({
		onSelect : function(dateText) {
		},
		showMonthAfterYear : true
	});

});
// ----------------------- 그리드 설정 시작 -------------------------------------
// rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
// 1. 그리드의 id ( 임의로 지정하십시오. )
// 2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
// 3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
// 4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
// 5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);

// 그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1, collection1;

// 그리드 데이터 초기화
var gridData1 = [];

// 그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	// 그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);

	// 최초 로딩시 그리드1 데이터 조회 X
	gridApp1.setData(gridData1);

	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);

}

// 그리드1 layoutCompleteHandler1
function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid(); // 그리드 객체

	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
	dataGrid1.setDoubleClickEnabled(true);
	dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
}
// 그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid();
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
}

// 그리드1 더블클릭 이벤트
function itemDoubleClickHandler1(event) {
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);

	$("#P_INS_STR_NAME").val(dataRow1.STR_NAME);		// 점포명
	$("#P_INS_STR_CODE").val(dataRow1.STR_CODE); 		// 점포코드
	$("#P_INS_APP_DT").val(dataRow1.APP_DT); 			// 적용일자
	$("#P_INS_ITM_NAME").val(dataRow1.ITM_NAME); 		// 상품명
	$("#P_INS_ITM_CODE").val(dataRow1.ITM_CODE); 		// 아이템코드
	$("#P_INS_WPRC").val(dataRow1.WPRC); 				// 마스터 단가
	$("#P_INS_PUR_AVR_AMT").val(dataRow1.PUR_AVR_AMT); 	// 평균단가
	$("#P_INS_CHG_AVR_AMT").val(dataRow1.CHG_AVR_AMT); 	// 변경단가
	$("#P_INS_SCAN_CODE").val(dataRow1.SCAN_CODE);		// 스캔코드
	
	$('#P_INS_STR_CODE').attr("disabled", true);
	$('#P_INS_APP_DT').attr("readonly", true);
	$('#P_INS_ITM_NAME').attr("readonly", true);
	$('#P_INS_ITM_CODE').attr("readonly", true);
	$('#P_INS_WPRC').attr("readonly", true);
	$('#P_INS_PUR_AVR_AMT').attr("readonly", true);
	$("#P_INS_CHG_AVR_AMT").attr("readonly", false);
	
	saveFlag = "U";
}

// ----------------------- 그리드 설정 끝 -----------------------

// <DataGridColumn dataField="RNUM" headerText="No" textAlign="center"
// sortable="false" width="40" /> 넘버링을 하면 병합오류 발생
// 그리드1<Wms입고내역> 헤더 설정
var layoutStr1 = '<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle" showDataTips="true">\
			<groupedColumns>\
				<DataGridColumn dataField="NUM" 			headerText="No"				textAlign="center"	sortable="false"							width="40" />\
			 	<DataGridColumn dataField="STR_CODE"		headerText="점포코드"		textAlign="center"	sortable="false" 	visible="false"			width="80" />\
				<DataGridColumn dataField="STR_NAME" 		headerText="점포명" 		textAlign="center"	sortable="false"							width="90" />\
				<DataGridColumn dataField="APP_DT" 			headerText="적용일자" 		textAlign="center"	sortable="false"	formatter="{datefmt}"	width="90" />\
				<DataGridColumn dataField="SCAN_CODE" 		headerText="상품코드" 		textAlign="center"  sortable="false" 							width="120"	/>\
				<DataGridColumn dataField="ITM_CODE" 		headerText="아이템코드" 	textAlign="center"  sortable="false" 							width="120"	/>\
				<DataGridColumn dataField="ITM_NAME" 		headerText="상품명" 		textAlign="left"	sortable="false" />\
				<DataGridColumn dataField="WPRC"			headerText="마스터 단가" 	textAlign="right"	sortable="false"	formatter="{numfmt}"	width="100"	/>\
				<DataGridColumn dataField="PUR_AVR_AMT"		headerText="평균단가" 		textAlign="right"	sortable="false" 	formatter="{numfmt}"	width="80" />\
				<DataGridColumn dataField="CHG_AVR_AMT" 	headerText="변경단가" 		textAlign="right"	sortable="false" 	formatter="{numfmt}"	width="80" />\
				<DataGridColumn dataField="CONF_DT"			headerText="확정일자" 		textAlign="center"	sortable="false" 	formatter="{datefmt}"	width="100"	/>\
				<DataGridColumn dataField="USER_ID"			headerText="사용자ID" 		textAlign="center"	sortable="false"	visible="false"			width="100"	/>\
				<DataGridColumn dataField="USER_NM"			headerText="등록자" 		textAlign="center"	sortable="false"							width="70" />\
				<DataGridColumn dataField="IDATE"			headerText="등록일자" 		textAlign="center"	sortable="false"	formatter="{datefmt}"	width="90" />\
			</groupedColumns>\
	</DataGrid>\
</rMateGrid>';
// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

// 검색조건(점별상품검색)
function btn_comm_store_search() {
	$('#comm_pop_wrap6').dialog('open');
	gridApp15.resize();
	// 공통JSP에 함수가있음
	fnGetStrName();
	$("#P_CALLBACK_NM6").val('fn_comm_store_callback(dataRow15)');
	if ($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != "") {
		$("#P_TEXT6").val($("#P_ITM_NAME").val());
		btn_comm_search('6');
	} else {
		$("#P_TEXT6").val("");
		gridRoot15.removeAll();
	}
}
// 검색조건(점별상품검색 CallBack함수)
function fn_comm_store_callback(dataRow) {
	$("#P_ITM_NAME").val(dataRow.ITM_NAME);
	$("#P_ITM_CODE").val(dataRow.ITM_CODE);
}

// 신규,수정화면(점별상품검색)
function btn_comm_store_search2() {
	$('#comm_pop_wrap6').dialog('open');
	gridApp15.resize();
	// 공통JSP에 함수가있음
	fnGetStrName2();
	$("#P_CALLBACK_NM6").val('fn_comm_store_callback2(dataRow15)');
	if ($("#P_INS_ITM_NAME").val() != null && $("#P_INS_ITM_NAME").val() != "") {
		$("#P_TEXT6").val($("#P_INS_ITM_NAME").val());
		btn_comm_search('6');
	} else {
		$("#P_TEXT6").val("");
		gridRoot15.removeAll();
	}
}

function fnGetStrName2() {
	// 점포명을 가져온다.
	jQuery.ajax({
		type : "POST",
		url : "/getStrName.do",
		dataType : "JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		data : {
			P_STR_CODE : $("#P_INS_STR_CODE").val()
		},
		success : function(data) {
			var result = data.result;
			$("#STORE_NAME").val(result[0].STR_NAME);
		},
		complete : function(data) {
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

// 신규,수정화면(점별상품검색 CallBack함수)
function fn_comm_store_callback2(dataRow) {
	$("#P_INS_ITM_NAME").val(dataRow.ITM_NAME);
	$("#P_INS_ITM_CODE").val(dataRow.ITM_CODE);
	$("#P_INS_SCAN_CODE").val(dataRow.SCAN_CODE);
}

function init() {

	// 숫자만 입력받기
	$("#P_INS_WPRC, #P_INS_PUR_AVR_AMT, #P_INS_CHG_AVR_AMT").keyup(function() {
		$(this).val($(this).val().replace(/[^0-9]/g, ''));
	});

	// 1000단위 콤마
	$("#P_INS_CHG_AVR_AMT, #P_INS_PUR_AVR_AMT, #P_INS_WPRC").number(true);

	// 검색조건 점포명 조회
	getStoreCode("top_search select[name=P_STR_CODE]");

	// 신규조건 점포명 조회
	getStoreCode("P_INS_STR_CODE");

	// 상품에서 엔터시 검색되게....
	$("input[name=S_ITM_NAME]").keydown(function(key) {
		if (key.keyCode == 13) {// 키가 13이면 실행 (엔터는 13)
			btn_comm_store_search();
		}
	});

	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
	$("#P_APP_DT").val(CUR_DT);
}

// ########################################################
// ### 8. init ( 시작 ) ###
// ########################################################

// ########################################################
// ### 사용자 정의 함수 ( 시작 ) ###
// ########################################################

var saveFlag = "";


//조회
function btn_search() {
	var loadData = $("#top_search").serializeAllObject();
	
	$('#P_INS_STR_CODE').val("").attr("disabled", true);
	$('#P_INS_APP_DT').val("").attr("readonly", true);
	$('#P_INS_ITM_NAME').val("").attr("readonly", true);
	$('#P_INS_ITM_CODE').val("");
	$('#P_INS_WPRC').val("").attr("readonly", true);
	$('#P_INS_PUR_AVR_AMT').val("").attr("readonly", true);
	$('#P_INS_CHG_AVR_AMT').val("").attr("readonly", true);
	

	/* 폼 벨리데이션 검사로직 추가. */
	// 조회 필수로직.
	if (loadData.P_APP_DT == "") {
		alert("적용일자를 입력해주세요");
		$("#P_APP_DT").focus();
		return;
	}
	
	loadData.P_STR_CODE = $("#P_STR_CODE").val();

	// 그리드1 데이터 조회 및 그리드 데이터 셋팅(입고내역)
	jQuery.ajax({
		url : "/getUnitPriceAvgList.do",
		type : "POST",
		datatype : "json",
		data : loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success : function(data) {
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
};


// 신규
function btn_new() {
	var today = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
	
	// grid1 셀렉트 된 내용 초기화
	//dataGrid1.setSelectedIndex(-1);
	$('#P_INS_STR_CODE').val("").attr("disabled", false);
	$('#P_INS_APP_DT').val("").attr("readonly", false);
	$('#P_INS_ITM_NAME').val("").attr("readonly", false);
	$('#P_INS_ITM_CODE').val("").attr("readonly", false);
	$('#P_INS_WPRC').val("").attr("readonly", true);
	$('#P_INS_PUR_AVR_AMT').val("").attr("readonly", true);
	$('#P_INS_CHG_AVR_AMT').val("").attr("readonly", false);
	
	//현재일자 가져오기
	$('#P_INS_APP_DT').val(today);
	
	saveFlag = "I";
}

//저장버튼
function btn_save() {
	
	if(setValidation()){
		if(confirm("저장하시겠습니까?")){
			if (saveFlag == "I") {
				setCreate();
			} else if(saveFlag == "U") {
				setUpdate();
			}
			
			$('#P_INS_STR_CODE').val("");
			$('#P_INS_APP_DT').val("");
			$('#P_INS_ITM_NAME').val("");
			$('#P_INS_ITM_CODE').val("");
			$('#P_INS_WPRC').val("");
			$('#P_INS_PUR_AVR_AMT').val("");
			$('#P_INS_CHG_AVR_AMT').val("");
		}
	}
}

//유효성검사
function setValidation(){
	var loadData 		= $("#inoutunitprice_detail").serializeAllObject();
	var today 			= new CommDateManager().after(0, 0, 0).getDate("yyyymmdd");
	var P_INS_APP_DT 	= $("#P_INS_APP_DT").val().replace(/-/gi, '');
	
	if (saveFlag == "") {
		alert("저장할 데이터가 없습니다.");
		return false;
	}
	
	if($("#P_INS_APP_DT").val() == "") {
		alert("적용일자를 선택하세요.");
		$("#P_INS_APP_DT").focus();
		return false;
	}
	
	if(Number(today) > Number(P_INS_APP_DT)) {
		alert("과거일자는 선택하실 수 없습니다.");
		$("#P_INS_APP_DT").focus();
		return;
	}
	
	if($("#P_INS_ITM_CODE").val() == "") {
		alert("조회된 상품이 없습니다.");
		$("#P_INS_ITM_NAME").focus();
		return false;
	}

	if ($("#P_INS_CHG_AVR_AMT").val() <= 0 || $("#P_INS_CHG_AVR_AMT").val() == "") {
		alert("변경단가를 입력해 주세요.");
		$("#P_INS_CHG_AVR_AMT").focus();
		return false;
	}
	
	//DB에서검사
	jQuery.ajax({
		url : "/countInoutUnitpriceAvgInfo.do",
		type : "POST",
		datatype : "json",
		// async:false,
		data : loadData,
		success : function(data) {
			if(data[0].RETURN_CODE != "0000"){
				alert(data[0].RETURN_MESSAGE);
				return false;
			}
		},
		complete : function(data) {

		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
	
	return true;
}


//신규저장
function setCreate(){
	var loadData = $("#inoutunitprice_detail").serializeAllObject();
	
	loadData.P_INS_APP_DT 		= loadData.P_INS_APP_DT.replace(/-/gi, '');
	loadData.P_INS_CHG_AVR_AMT 	= loadData.P_INS_CHG_AVR_AMT.replace(/,/gi, '');
	
	// 저장
	jQuery.ajax({
		url : "/saveInoutUnitpriceAvg.do",
		type : "POST",
		datatype : "json",
		// async:false,
		data : loadData,
		success : function(data) {
			if (data[0].RETURN_CODE == '0000') {
				alert("저장 되었습니다.");
				btn_search();
			} else {
				// 요청중 문제가 발생했습니다.관리자에게 문의하세요.
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


//수정저장
function setUpdate(){
	var loadData = $("#inoutunitprice_detail").serializeAllObject();
	
	loadData.P_INS_APP_DT 		= loadData.P_INS_APP_DT.replace(/-/gi, '');
	loadData.P_INS_CHG_AVR_AMT 	= loadData.P_INS_CHG_AVR_AMT.replace(/,/gi, '');
	
	// Update
	jQuery.ajax({
		url : "/updateInoutUnitpriceAvg.do",
		type : "POST",
		datatype : "json",
		// async:false,
		data : loadData,
		success : function(data) {
			if (data[0].RETURN_CODE == '0000') {
				alert("저장 되었습니다.");
				btn_search();
			} else {
				// 요청중 문제가 발생했습니다.관리자에게 문의하세요.
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


// 그리드 로딩바 보이기
function showLoadingBar1() {
	gridRoot1.addLoadingBar();
}

// 그리드 로딩바 숨기기
function hideLoadingBar1() {
	gridRoot1.removeLoadingBar();
}

// ########################################################
// ### 상단 버튼 구현 ( 끝 ) ###
// ########################################################

/* 추가 js */
// 그리드 너비 제어
$(document).ready(function() {
	$("#gridHolder1").width("100%");

	$("#gridHolder1").height($(window).height() - 210); // -169
	
	$(window).on('resize', function() {

		$("#gridHolder1").height($(window).height()-210); // -169

	});
});