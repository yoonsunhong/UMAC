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
var gridApp2, gridRoot2, dataGrid2, dataRow2;

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
rMateGridH5.create("grid2", "gridHolder2", jsVars1);

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.


//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData();
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
		
	}else if(id == "grid2"){
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		gridApp2.setLayout(layoutStr2);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData2();	
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
//	getGridData();
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);	
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}
function dataCompleteHandler2(event) {
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	$("#P_DTL_LRG_CODE").val(dataRow1["LRG_CODE"]);
	getGridData2();
}

//----------------------- 그리드 설정 끝 -----------------------

var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true">\
			<groupedColumns>\
				<DataGridColumn dataField="LRG_CODE" headerText="대분류" width="100" textAlign="center" />\
				<DataGridColumn dataField="LRG_NAME" headerText="대분류명" width="100" textAlign="center" />\
				<DataGridColumn dataField="SALE_QTY"  id="dg1col2"  headerText="매출수량" width="100" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="SALE_AMT" id="dg1col0"  headerText="매출금액" width="150" textAlign="right" formatter="{numfmt}"  />\
			</groupedColumns>\
			<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col2}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col0}" formatter="{numfmt}" textAlign="right" />\
				</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<NumberFormatter id="numfmt2" useThousandsSeparator="true" precision="-2" />\
	<DataGrid id="dg1" sortableColumns="true">\
		<groupedColumns>\
			<DataGridColumn dataField="LRG_CODE" headerText="대분류" width="60" textAlign="center" />\
			<DataGridColumn dataField="LRG_NAME" headerText="대분류명" width="100" textAlign="center" />\
			<DataGridColumn dataField="ITM_CODE" headerText="상품코드" width="120" textAlign="center" />\
			<DataGridColumn dataField="SCAN_CODE" headerText="스캔코드" width="120" textAlign="center" />\
			<DataGridColumn dataField="ITM_NAME" headerText="상품명" width="350" textAlign="left" />\
			<DataGridColumn dataField="UNIT" headerText="규격" width="80" textAlign="center" />\
			<DataGridColumn dataField="TAX_GB" headerText="면과세" width="60" textAlign="center" />\
			<DataGridColumn id="dg1col0" dataField="SALE_QTY"  headerText="매출수량" width="80" formatter="{numfmt}" textAlign="right" />\
			<DataGridColumn id="dg1col1" dataField="SALE_AMT"  headerText="매출금액" width="120" formatter="{numfmt}" textAlign="right" />\
			<DataGridColumn id="dg1col2" dataField="PROFIT_AMT" headerText="예상매익액" width="80" formatter="{numfmt}" textAlign="right" />\
			<DataGridColumn dataField="PROFIT" headerText="매익율" width="60" formatter="{numfmt2}" />\
		</groupedColumns>\
		<dataProvider>\
		<SpanSummaryCollection source="{$gridData}">\
			<mergingFields>\
				<SpanMergingField name="LRG_CODE" colNum="0" />\
				<SpanMergingField name="LRG_NAME" colNum="1" />\
			</mergingFields>\
		</SpanSummaryCollection>\
	</dataProvider>\
		<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col0}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col1}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col2}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn/>\
			</DataGridFooter>\
		</footers>\
	</DataGrid>\
</rMateGrid>';




//목록 그리드 조회
function getGridData() {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_SALE_SD").val().split("-");
	var P_END_DT_ARR 	= $("#P_SALE_ED").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	
	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SALE_SD").focus();
		return;
	}
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberSalesCategoryHdrList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
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


function getGridData2() {
	var params = $("#frm").serializeArray();
	
	jQuery.ajax({ 
		url:"/memberSalesCategoryDtlList.do",
		type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot2.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridApp2.setData(data);
			
			dataGrid2.setEnabled(true);
	       	gridRoot2.removeLoadingBar();
		},
		complete : function(data) {
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportSheetName = selngAcmslt;
    dataGrid2.exportSheetName = goodsClAcmSlt;
    
	dataGrid1.exportFileName = selngAcmsltSearch+"_"+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);
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
	
	$('#P_CUST_NAME' ).val(dataRow.CUST_NAME);		// 회원명
	$('#P_CUST_NO').val(dataRow.CUST_NO);
	
}



$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//달력설정
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
		 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
				if(     $("#P_SALE_SD").val()  >  $("#P_SALE_ED").val()     )
				{   alert(msgStartDateAndEndDate);
					$("#P_SALE_SD").val(CUR_DT);
					return;
				}	 
			 }, 	 showMonthAfterYear:true 
			});
		 
		$(".datepicker2").datepicker({ onSelect: function(dateText) 
		 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
				if(     $("#P_SALE_SD").val()  >  $("#P_SALE_ED").val()     )
				{   alert(msgStartDateAndEndDate);
				$("#P_SALE_ED").val(CUR_DT);
					return;
				}	 
		 }, 	 showMonthAfterYear:true 
		});
		var beforeDate = new CommDateManager().getDate("yyyy-mm-01"); // 하루전 before(년,월,일)
		var date = new CommDateManager().getDate("yyyy-mm-dd");
		$("#P_SALE_SD").val(date);
		$("#P_SALE_ED").val(date);
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	getCommonCodeSelectBoxList("P_INDUST_FLAG", "INDUST_FLAG");			// 업종유형
	getCommonCodeSelectBoxList("P_BUSI_FLAG", "BUSI_FLAG");			// 고객구분
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCommonCodeSelectBoxList("P_MBR_GRADE", "MBR_GRADE");//회원등급
	
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
	$("#gridHolder1, #gridHolder2").width("100%");
	
	var hei = ($(window).height() - 157) / 5;
	
	$("#gridHolder1").height(hei*2);
	$("#gridHolder2").height(hei*3);

	$(window).on('resize',function (){	
		
		var hei = ($(window).height() - 157) / 5;
		
		$("#gridHolder1").height(hei*2);
		$("#gridHolder2").height(hei*3);	
		
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
		gridApp2.setData(null);
	});

	//excel
	$("#btn_excel_search").click(function(){
		excelExport();
	});
	
	
});



















