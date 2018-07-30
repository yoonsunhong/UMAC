/********************************************************
 * 설명:  지불수단별현황
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

var gridData1ClickStrCode = "";

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
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	//그리드 펼치기	
	dataGrid1.expandAll();
	
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
	
	if(dataRow1["STR_CODE"] != undefined){
		getGridData2(dataRow1["STR_CODE"],dataRow1["P_STR_DT"],dataRow1["P_END_DT"]);
	}
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="1">\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" 		headerText="'+storNm+'" width="110" />\
				<DataGridColumn dataField="CCPCG_TOTAL"   	headerText="'+sm+'"    	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumnGroup headerText="'+cash+'">\
					<DataGridColumn dataField="CASH_SR_AMT" 	 	 headerText="'+amount+'"  		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  			 textAlign="right" 				labelJsFunction="perFunction1"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+card+'">\
					<DataGridColumn dataField="CARD_R_AMT" 	 	 headerText="'+amount+'"  			textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  		 textAlign="right" 					labelJsFunction="perFunction2"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+point+'">\
					<DataGridColumn dataField="POINT_USE_AMT" 	 	 headerText="'+amount+'"  		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  			 textAlign="right" 				labelJsFunction="perFunction3"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+creditSelling+'">\
					<DataGridColumn dataField="CREDIT_AMT" 	 	 headerText="'+amount+'"  		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  		 textAlign="right" 				labelJsFunction="perFunction4"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+resiDualCash+'">\
					<DataGridColumn dataField="ZAN_CASH_AMT" 	  headerText="'+amount+'"  		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  		  textAlign="right" 			labelJsFunction="perFunction5"/>\
				</DataGridColumnGroup>\
			</groupedColumns>\
			<dataProvider>\
			<GroupingCollection  source="{$gridData}">\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="CCPCG_TOTAL" summaryOperation="SUM" label="CCPCG_TOTAL" />\
								<SummaryField dataField="CASH_SR_AMT" summaryOperation="SUM" label="CASH_SR_AMT" />\
								<SummaryField dataField="CARD_R_AMT" summaryOperation="SUM" label="CARD_R_AMT" />\
								<SummaryField dataField="POINT_USE_AMT" summaryOperation="SUM" label="POINT_USE_AMT" />\
								<SummaryField dataField="CREDIT_AMT" summaryOperation="SUM" label="CREDIT_AMT" />\
								<SummaryField dataField="ZAN_CASH_AMT" summaryOperation="SUM" label="ZAN_CASH_AMT" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="CD_SHORT_NM">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="CCPCG_TOTAL" summaryOperation="SUM" label="CCPCG_TOTAL" />\
								<SummaryField dataField="CASH_SR_AMT" summaryOperation="SUM" label="CASH_SR_AMT" />\
								<SummaryField dataField="CARD_R_AMT" summaryOperation="SUM" label="CARD_R_AMT" />\
								<SummaryField dataField="POINT_USE_AMT" summaryOperation="SUM" label="POINT_USE_AMT" />\
								<SummaryField dataField="CREDIT_AMT" summaryOperation="SUM" label="CREDIT_AMT" />\
								<SummaryField dataField="ZAN_CASH_AMT" summaryOperation="SUM" label="ZAN_CASH_AMT" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
				</Grouping>\
			</GroupingCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="1">\
			<groupedColumns>\
				<DataGridColumn dataField="SALE_DT" 		headerText="'+selngDate+'"  textAlign="center" width="110" />\
				<DataGridColumn dataField="CCPCG_TOTAL"   	headerText="'+sm+'"    	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumnGroup headerText="'+cash+'">\
					<DataGridColumn dataField="CASH_SR_AMT" 	 	 headerText="'+amount+'"  		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  			 textAlign="right" 				labelJsFunction="perFunction1"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+card+'">\
					<DataGridColumn dataField="CARD_R_AMT" 	 	 	 headerText="'+amount+'"  		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  			 textAlign="right" 				labelJsFunction="perFunction2"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+point+'">\
					<DataGridColumn dataField="POINT_USE_AMT" 	 	 headerText="'+amount+'"  		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  			 textAlign="right" 				labelJsFunction="perFunction3"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+creditSelling+'">\
					<DataGridColumn dataField="CREDIT_AMT" 	 	 	 headerText="'+amount+'"  		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  			 textAlign="right" 				labelJsFunction="perFunction4"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+resiDualCash+'">\
					<DataGridColumn dataField="ZAN_CASH_AMT" 	  	 headerText="'+amount+'"  		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+per+'"  			 textAlign="right" 				labelJsFunction="perFunction5"/>\
				</DataGridColumnGroup>\
			</groupedColumns>\
		</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData() {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_STR_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;
	

	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//유효성검사
	if(dateDiff > 60) {
		alert("조회 일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_STR_DT").focus();
		return false;
	}
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesInfoReportPaymentList.do",
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

//목록 그리드 조회
function getGridData2(strCode, strDt, endDt) {
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
		url:"/salesInfoReportPaymentDetailList.do",
		type:"POST",
		datatype:"json",
		//async:false,
		data: { P_STR_CODE:  strCode, P_STR_DT: strDt, P_END_DT: endDt},
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
	
	dataGrid1.exportSheetName = storePaymentMn;
    dataGrid2.exportSheetName = datePaymentMn;
    
	dataGrid1.exportFileName = payMnSelngStatus+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);
}

function perFunction1(item, value, column){
	var num1 = 0;
	
	if(item["CCPCG_TOTAL"] != 0) 
		num1 = (item["CASH_SR_AMT"] / item["CCPCG_TOTAL"]) * 100;
	
	return perFunction(num1);    
}

function perFunction2(item, value, column){	
	var num1 = 0;
	
	if(item["CCPCG_TOTAL"] != 0)
		num1 = (item["CARD_R_AMT"] / item["CCPCG_TOTAL"]) * 100;
	
	return perFunction(num1);    
}

function perFunction3(item, value, column){	
	var num1 = 0;
	
	if(item["CCPCG_TOTAL"] != 0) 
		num1 = (item["POINT_USE_AMT"] / item["CCPCG_TOTAL"]) * 100;
	
	return perFunction(num1);    
}

function perFunction4(item, value, column){	
	var num1 = 0;
	
	if(item["CCPCG_TOTAL"] != 0)
		num1 = (item["CREDIT_AMT"] / item["CCPCG_TOTAL"]) * 100;
	
	return perFunction(num1);    
}

function perFunction5(item, value, column){	
	var num1 = 0;
	
	if(item["CCPCG_TOTAL"] != 0)
		num1 = (item["ZAN_CASH_AMT"] / item["CCPCG_TOTAL"]) * 100;
	
	return perFunction(num1);    
}

//업태구분
function uptaeFunction(){
	var uptaeFlagCode = $('#P_UPTAE_FLAG' ).val();
	updateStrCodeSelectBox("P_STR_CODE",uptaeFlagCode);	
}

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getCommonCodeSelectBoxList2("P_UPTAE_FLAG", "UPTAE_FLAG", "S");		// 업태구분
	
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_STR_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
				$("#P_STR_DT").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
		});
	 
	$(".datepicker2").datepicker({ onSelect: function(dateText) 
	 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_STR_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
			$("#P_END_DT").val(CUR_DT);
				return;
			}	 
	 }, 	 showMonthAfterYear:true 
	});
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
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
		gridData1ClickStrCode = "";
	});
	
	$("#btn_excel_search").click(function(){
		excelExport();
	});
	
});



