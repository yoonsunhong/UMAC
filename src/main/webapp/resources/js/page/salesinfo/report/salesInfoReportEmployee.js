/********************************************************
*    설명: 영업정보 > 매입관리 > 평균단가조정등록(대출입)
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2018-03-28     송원두        초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/

$(document).ready(function() {

	init();

	// 최초 도움말 불러오기
	setHelpMessage($(location).attr('pathname').replace('/', ''));

	/** 매출일자 날짜 체크 */
	$(".datepicker1").datepicker({ onSelect: function(dateText){ 	 	 
		},showMonthAfterYear:true 
	});
		 
	$(".datepicker2").datepicker({ onSelect: function(dateText){ 	 	
	 	},showMonthAfterYear:true 
	});
	
	// 고객구분(업종유형)
	getCommonCodeSelectBoxList("P_INDUST_FLAG", "INDUST_FLAG");
	
	// 팝업의 조회조건절의 엔터시 검색되게....
	$("input[name=P_USER_NM]").keydown(function (key) { 
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_user_search();
		} 
	});
	
	$("#btn_excel_down").click(function(){
		excelExport();		
	});
	
	$("#btn_excel_detail_down").click(function(){
		excelExport2();		
	});
});
// ----------------------- 그리드 설정 시작 -------------------------------------
// rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
// 1. 그리드의 id ( 임의로 지정하십시오. )
// 2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
// 3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
// 4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
// 5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid2", "gridHolder2", jsVars2);

// 그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1, collection1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2, collection2;

// 그리드 데이터 초기화
var gridData1 = [];
var gridData2 = [];

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
	
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
}
// 그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid();
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	
	dataRow1.P_SALES_SD = $("#P_SALES_SD").val();
	dataRow1.P_SALES_ED = $("#P_SALES_ED").val();
	
	//그리드2 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	url:"/salesInfoReportProductList.do",         
	type:"POST",
	datatype:"json",	
	data: dataRow1,
	beforeSend : function(){ 	    	
        gridRoot2.addLoadingBar();
    },
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

// ----------------------- 그리드 설정 끝 -----------------------

// <DataGridColumn dataField="RNUM" headerText="No" textAlign="center"
// sortable="false" width="40" /> 넘버링을 하면 병합오류 발생
var layoutStr1 = '<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg1" editable="true" itemClickEnabled="true"  horizontalScrollPolicy="false" verticalAlign="middle"  textAlign="center" sortableColumns="true" showDataTips="true"  itemEditBeginningJsFunction="itemFunc" >\
		<groupedColumns>\
			<DataGridColumn dataField="NUM" 			headerText="No"				textAlign="center"	sortable="false"											width="40"	/>\
			<DataGridColumn dataField="EMP_NO" 			headerText="EMP_NO"			textAlign="center"	sortable="false"							visible="false"	width="40"	/>\
		 	<DataGridColumn dataField="USER_NM"			headerText="관리사원명"		textAlign="center"	sortable="false"						 								/>\
			<DataGridColumn dataField="CUST_NO" 		headerText="회원번호" 		textAlign="center"	sortable="false"						 								/>\
			<DataGridColumn dataField="CUST_NAME" 		headerText="회원명" 		textAlign="center"	sortable="false"						 								/>\
			<DataGridColumn dataField="BUSI_NM" 		headerText="회원구분" 		textAlign="center"  sortable="false"														/>\
			<DataGridColumn dataField="MBR_GRADE" 		headerText="회원등급코드" 	textAlign="center"  sortable="false"							visible="false"				/>\
			<DataGridColumn dataField="GRADE_NM" 		headerText="회원등급" 		textAlign="center"	sortable="false"														/>\
			<DataGridColumn dataField="INDUST_FLAG" 	headerText="업종유형코드" 	textAlign="center"  sortable="false"							visible="false"				/>\
			<DataGridColumn dataField="INDUST_NM" 		headerText="업종유형" 		textAlign="center"  sortable="false"														/>\
			<DataGridColumn dataField="STR_CODE"		headerText="매장코드" 		textAlign="right"	sortable="false"							visible="false"				/>\
			<DataGridColumn dataField="ITM_CODE"		headerText="상품코드" 		textAlign="right"	sortable="false"							visible="false"				/>\
			<DataGridColumn dataField="TOT_SALE_AMT"	headerText="매출액" 		textAlign="right"	sortable="false"	formatter="{numfmt}"	id="dg1col13"				/>\
			<DataGridColumn dataField="SALE_AMT"		headerText="할인제외" 		textAlign="right"	sortable="false"	formatter="{numfmt}"	visible="false"				/>\
			<DataGridColumn dataField="DC_AMT"			headerText="할인금액" 		textAlign="right"	sortable="false"	formatter="{numfmt}"	visible="false"				/>\
			<DataGridColumn dataField="TOTAL_SALE_AMT" 	headerText="총 할인금액"	textAlign="right"	sortable="false"	formatter="{numfmt}"	visible="false"				/>\
			<DataGridColumn dataField="ACCT_REABLE" 	headerText="미수금" 		textAlign="right"	sortable="false"	formatter="{numfmt}"	id="dg1col17"				/>\
			<DataGridColumn dataField="LAST_SALE_DT" 	headerText="최종구매일" 	textAlign="center"	sortable="false"	formatter="{datefmt}"								/>\
		</groupedColumns>\
	<footers>\
	<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
			<DataGridFooterColumn backgroundColor="#acacac" />\
			<DataGridFooterColumn backgroundColor="#acacac" />\
			<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg1col13}" textAlign="right" />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn />\
			<DataGridFooterColumn summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg1col17}" textAlign="right" />\
		</DataGridFooter>\
	</footers>\
	</DataGrid>\
</rMateGrid>';

//그리드2 헤더 설정
var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle" showDataTips="true">\
			<groupedColumns>\
				<DataGridColumn dataField="SCAN_CODE" 		headerText="스캔코드"		textAlign="center"	sortable="false"										/>\
				<DataGridColumn dataField="ITM_NAME" 		headerText="상품명" 		textAlign="left"	sortable="false" 										/>\
				<DataGridColumn dataField="UNIT" 			headerText="규격" 			textAlign="center"	sortable="false"  										/>\
				<DataGridColumn dataField="SAMT"			headerText="단가" 			textAlign="right"	sortable="false" formatter="{numfmt}"					/>\
				<DataGridColumn dataField="SALE_QTY" 		headerText="수량" 			textAlign="center"  sortable="false" formatter="{numfmt}"					/>\
				<DataGridColumn dataField="NON_TAX_AMT" 	headerText="면세합계" 		textAlign="right"	sortable="false" formatter="{numfmt}"	id="dg2col6" 	/>\
				<DataGridColumn dataField="TAX_AMT" 		headerText="과세합계" 		textAlign="right"	sortable="false" formatter="{numfmt}"	id="dg2col7"	/>\
				<DataGridColumn dataField="TOTAL_SALE_AMT" 	headerText="매출합계" 		textAlign="right" 	sortable="false" formatter="{numfmt}"	id="dg2col8"	/>\
			</groupedColumns>\
			<footers>\
				<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
					<DataGridFooterColumn />\
					<DataGridFooterColumn />\
					<DataGridFooterColumn />\
					<DataGridFooterColumn />\
					<DataGridFooterColumn summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg2col6}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg2col7}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg2col8}" textAlign="right" />\
				</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';
// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

//(영업사원검색) 팝업 호출 function
function btn_comm_user_search(){
	$('#comm_pop_wrap4' ).dialog( 'open' );
	gridApp13.resize();
	
	// $("#P_CALLBACK_NM4").val('fn_comm_member_callback1(dataRow13)');
	if($("#P_USER_NM").val() != null && $("#P_USER_NM").val() != ""){
		$("#P_TEXT4").val($("#P_USER_NM").val());
		btn_comm_search('4');
	}	
}

//(영업사원검색) 팝업 callback function
function fn_comm_member_callback(dataRow){
	$('#P_USER_NM').val(dataRow.USER_NM);	//사원명
	$('#P_USER_ID').val(dataRow.USER_ID);	//사원ID
}

function init() {
	// 검색조건 점포명 조회
	getStoreCode("P_STR_CODE");
}
// ########################################################
// ### 8. init ( 시작 ) ###
// ########################################################

// ########################################################
// ### 사용자 정의 함수 ( 시작 ) ###
// ########################################################


//엑셀 다운로드(회원목록)
function excelExport(){    
	var dt 		= new Date();
	var month 	= dt.getMonth()+1;
	var day 	= dt.getDate();
	var year 	= dt.getFullYear();
	var date 	= year+""+month+""+day;
	
	dataGrid1.exportSheetName = "회원목록";
      
	dataGrid1.exportFileName = "회원목록"+"_"+date+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", true);
}

//엑셀 다운로드(회원목록)
function excelExport2(){    
	var dt 		= new Date();
	var month 	= dt.getMonth()+1;
	var day 	= dt.getDate();
	var year 	= dt.getFullYear();
	var date 	= year+""+month+""+day;
	
	dataGrid2.exportSheetName = "매출상세현황";
      
	dataGrid2.exportFileName = "매출상세현황"+"_"+date+".xlsx";
	gridRoot2.excelExportSave("/gridExcelDown.do", true);
}

function btn_search(){
	var loadData 		= $("#top_search").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_SALES_SD").val().split("-");
	var P_END_DT_ARR 	= $("#P_SALES_ED").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SALES_SD").focus();
		return;
	}
	
	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	
	//그리드1 데이터 조회 및 그리드 데이터 셋팅(매출현황 조회)
	jQuery.ajax({ 
	    url:"/salesInfoReportEmployeeList.do",         
	    type:"POST",
		datatype:"json",		
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
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
};

// 그리드 로딩바 보이기
function showLoadingBar1() {
	gridRoot1.addLoadingBar();
}
function showLoadingBar2() {
	gridRoot2.addLoadingBar();
}

// 그리드 로딩바 숨기기
function hideLoadingBar1() {
	gridRoot1.removeLoadingBar();
}
function hideLoadingBar2() {
	gridRoot2.removeLoadingBar();
}
// ########################################################
// ### 상단 버튼 구현 ( 끝 ) ###
// ########################################################

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height(200);
	
	//그리드 너비 제어
	$("#gridHolder2").width("100%");
	$("#gridHolder2").height($(window).height() - 370);
	
	$(window).on('resize',function (){			
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height(200);
		
		//그리드 너비 제어
		$("#gridHolder2").width("100%");
		$("#gridHolder2").height( $(window).height() - 370);		
	});

});