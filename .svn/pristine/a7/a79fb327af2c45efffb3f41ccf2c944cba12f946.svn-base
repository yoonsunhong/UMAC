/********************************************************
 * 설명:  매출실적조회
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.01.09
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;

//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.


//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		//rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData();
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	//getGridData();
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);	
}
//----------------------- 그리드 설정 끝 -----------------------

var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true">\
			<columns>\
				<DataGridColumn id="SEQ" 			dataField="SEQ" 			headerText="순번"			width="50" 	textAlign="center" />\
				<DataGridColumn id="CUST_NO" 		dataField="CUST_NO" 		headerText="회원번호"		width="80" 	textAlign="center" />\
				<DataGridColumn id="CUST_NAME" 		dataField="CUST_NAME" 		headerText="회원명" 		width="140" textAlign="center" />\
				<DataGridColumn id="BUSI_FLAG" 		dataField="BUSI_FLAG"   	headerText="회원구분"		width="80" 	textAlign="center" />\
				<DataGridColumn id="MBR_GRADE" 		dataField="MBR_GRADE" 		headerText="회원등급"		width="100" textAlign="center" />\
				<DataGridColumn id="INDUST_FLAG" 	dataField="INDUST_FLAG"   	headerText="업종"			width="90" 	textAlign="center" />\
				<DataGridColumn id="IDATE" 			dataField="IDATE"  			headerText="발급일자"		width="100" textAlign="center"	formatter="{datefmt}" />\
				<DataGridColumn id="LAST_SALE_DT" 	dataField="LAST_SALE_DT"	headerText="최종매출" 		width="100" textAlign="center" 	formatter="{datefmt}" />\
				<DataGridColumn id="SALE_POINT" 	dataField="SALE_POINT"  	headerText="포인트적립" 	width="100" textAlign="right"   formatter="{numfmt}" />\
				<DataGridColumn id="SALE_AMT" 		dataField="SALE_AMT"  		headerText="매출액" 		width="100" textAlign="right"  	formatter="{numfmt}" />\
				<DataGridColumn id="CASH" 			dataField="CASH"  			headerText="현금" 			width="100" textAlign="right"  	formatter="{numfmt}" />\
				<DataGridColumn id="CARD" 			dataField="CARD"  			headerText="카드" 			width="100" textAlign="right" 	formatter="{numfmt}" />\
				<DataGridColumn id="POINT" 			dataField="POINT"  			headerText="포인트" 		width="90" 	textAlign="right" 	formatter="{numfmt}" />\
				<DataGridColumn id="CASH_AMOUNT" 	dataField="CASH_AMOUNT" 	headerText="현금승인" 		width="90" 	textAlign="right" 	formatter="{numfmt}" />\
				<DataGridColumn id="VISIT_CNT" 		dataField="VISIT_CNT"  		headerText="방문횟수"		width="80" 	textAlign="right"  	formatter="{numfmt}" />\
				<DataGridColumn id="SALE_AVG_AMT"	dataField="SALE_AVG_AMT" 	headerText="평균회원매출액" width="110"	textAlign="right"   formatter="{numfmt}" />\
			</columns>\
			<footers>\
			<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn summaryOperation="SUM"	dataColumn="{SALE_POINT}" 	formatter="{numfmt}"	textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" 	dataColumn="{SALE_AMT}" 	formatter="{numfmt}" 	textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" 	dataColumn="{CASH}" 		formatter="{numfmt}" 	textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" 	dataColumn="{CARD}" 		formatter="{numfmt}" 	textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" 	dataColumn="{POINT}" 		formatter="{numfmt}" 	textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" 	dataColumn="{CASH_AMOUNT}" 	formatter="{numfmt}" 	textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" 	dataColumn="{VISIT_CNT}" 	formatter="{numfmt}" 	textAlign="right" />\
				<DataGridFooterColumn summaryOperation=""		dataColumn="{SALE_AVG_AMT}" formatter="{numfmt}" 	textAlign="right" labelJsFunction="getFooterSaleAvgAmt" />\
			</DataGridFooter>\
		</footers>\
		</DataGrid>\
	</rMateGrid>';


//합계-평균회원매출액
function getFooterSaleAvgAmt(){
	var chkdata 		= gridRoot1.getItemAt(0);
	var totalSaleAmt	= 0;
	var totalVisitCnt	= 0;
	var result			= 0;

	
	if(chkdata != "" && chkdata != null)
	{
		list = gridRoot1.getChangedData(true);
		for (var i = 0; i < list.length; i++)
		{
			if(list[i].data.CUST_NO != ""){
				totalSaleAmt 	+= list[i].data.SALE_AMT;	//매출액
				totalVisitCnt 	+= list[i].data.VISIT_CNT;	//방문횟수
			}
		}

		if(totalSaleAmt > 0){
			//총매출액/총방문횟수
			result = (totalSaleAmt / totalVisitCnt).toFixed(2);
		}
	}

	return result; // 평균을 구합니다.
}



//목록 그리드 조회
function getGridData(){
	var params = $("#frm").serializeAllObject();
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
		
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberSalesMonthStateList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			//그리드1 데이터 조회
			gridApp1.setData(data);
			
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

function excelExport(){
	var dt 		= new Date();
	var month 	= dt.getMonth()+1;
	var day 	= dt.getDate();
	var year 	= dt.getFullYear();
	var date 	= year+""+month+""+day;
	
	dataGrid1.exportSheetName = selngAcmslt;
    
	dataGrid1.exportFileName = selngAcmsltSearch+"_"+date+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}


//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	
	$("#comm_pop_wrap20").dialog("open");
	gridApp29.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM20").val("fn_comm_user_callback(dataRow29)");
	
	if($("#P_CUST_NAME").val()) {
		$("#P_TEXT20").val($("#P_CUST_NAME").val());
		btn_comm_search('20');
	}
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow){
	$('#P_CUST_NAME' ).val(dataRow.CUST_NAME);	//회원명
	$('#P_CUST_NO').val(dataRow.CUST_NO);
}


$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//달력설정
	datePickerYearMonth();
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	$("#P_SALE_DT").val(nowDateYm);
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	getCommonCodeSelectBoxList("P_INDUST_FLAG", "INDUST_FLAG");			// 업종유형
	getCommonCodeSelectBoxList("P_BUSI_FLAG", "BUSI_FLAG");				// 고객구분
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    		// 대 분류
	getCommonCodeSelectBoxList("P_MBR_GRADE", "MBR_GRADE");				//회원등급
	
	$("#P_CUST_NAME").keydown(function(key) {
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
	});
	
	$('#P_CUST_NAME' ).keyup(function() {
		if($('#P_CUST_NAME').val().replace(/(\s*)/g, "").length <= 0) {
			$('#P_CUST_NO').val('');
		}
	});
	
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	
	var hei = ($(window).height() - 157) / 5;
	
	$("#gridHolder1").height(hei*5);

	$(window).on('resize',function (){	
		var hei = ($(window).height() - 157) / 5;
		$("#gridHolder1").height(hei*5);
	});	
	

	$(function() {
		$("#pop_wrap").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 900,
		    resizable : false,
		    position : "center"
		});
	});
	
	//조회
	$("#btn_search").click(function(){
		getGridData();
		//상품 분류별 목표 내용 삭제 
	});

	//excel
	$("#btn_excel_search").click(function(){
		excelExport();
	});

});//end (document).ready
