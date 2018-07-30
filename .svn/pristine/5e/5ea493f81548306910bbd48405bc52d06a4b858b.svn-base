/********************************************************
 * 설명:  영업사원별매출현황
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.05.11
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
	dataGrid2.expandLevel(1);
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	if(dataRow1["SALE_DT"] != undefined && dataRow1["STR_CODE"] != undefined && dataRow1["POS_NO"] != undefined && dataRow1["TRXN_NO"] != undefined){
		getGridData2(dataRow1["SALE_DT"], dataRow1["STR_CODE"], dataRow1["POS_NO"], dataRow1["TRXN_NO"]);
	}
}


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="9" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true">\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" 		headerText="'+storNm+'" 		textAlign="center"	width="90" />\
				<DataGridColumn dataField="USER_NM" 		headerText="배달사원" 			textAlign="center" 	width="90" />\
				<DataGridColumn dataField="SALE_DT" 		headerText="'+selngDate+'" 		textAlign="center"	width="110"		formatter="{datefmt}" />\
				<DataGridColumn dataField="CUST_NO" 		headerText="'+cusNo+'" 			textAlign="center" 	width="80"/>\
				<DataGridColumn dataField="CUST_NAME" 		headerText="'+cusName+'" 		textAlign="left" />\
				<DataGridColumn dataField="CD_NM_1" 		headerText="'+busiFlag+'" 		textAlign="center"	width="80" />\
				<DataGridColumn dataField="CD_NM_2" 		headerText="'+industFlag+'" 	textAlign="center"	width="110" />\
				<DataGridColumn dataField="POS_NO" 			headerText="POS" 				textAlign="center"	width="80" />\
				<DataGridColumn dataField="TRXN_NO" 		headerText="'+dealingsNumber+'"	textAlign="center"	width="80" />\
				<DataGridColumn dataField="ORD_MTHD" 		headerText="'+orderMth+'" 		textAlign="center"	width="80" />\
				<DataGridColumn dataField="SALE_AMT" 		headerText="'+selngAmount+'" 	textAlign="right"	width="100"		formatter="{numfmt}" />\
				<DataGridColumn dataField="FISH_DATETIME" 	headerText="배달완료일시" 		textAlign="right"	width="140" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="STR_NAME" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
				            <SpanSummaryField dataField="SALE_AMT" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="7" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true">\
			<groupedColumns>\
				<DataGridColumn dataField="SALE_DT" 		headerText="'+selngDate+'" 			textAlign="center" />\
				<DataGridColumn dataField="POS_NO" 			headerText="POS" 					textAlign="center"	width="100" />\
				<DataGridColumn dataField="TRXN_NO" 		headerText="'+dealingsNumber+'" 	textAlign="center" />\
				<DataGridColumn dataField="SCAN_CODE" 		headerText="'+scanCode+'" 	 		textAlign="center" />\
				<DataGridColumn dataField="ITM_SHORT_NAME"	headerText="'+itmName+'" 			textAlign="left" 	width="150" />\
				<DataGridColumn dataField="SALE_PRC" 		headerText="'+selngPrice+'" 	 	textAlign="right"	formatter="{numfmt}" />\
				<DataGridColumn dataField="SALE_QTY" 		headerText="'+qY+'" 	 			textAlign="right"	formatter="{numfmt}" />\
				<DataGridColumn dataField="SD_AMT" 			headerText="'+productDc+'" 	 		textAlign="right"	formatter="{numfmt}" />\
				<DataGridColumn dataField="MBR_DC_AMT" 		headerText="'+memberDc+'" 	 		textAlign="right"	formatter="{numfmt}" />\
				<DataGridColumn dataField="SALE_AMT" 		headerText="'+selngAmount+'" 	 	textAlign="right"	formatter="{numfmt}" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="SALE_DT"/>\
						<SpanMergingField name="POS_NO"/>\
						<SpanMergingField name="TRXN_NO"/>\
					</mergingFields>\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="SALE_DT" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
				            <SpanSummaryField dataField="SD_AMT" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="MBR_DC_AMT" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="SALE_AMT" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

//목록 그리드 조회
function getGridData() {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	
	
	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return;
	}
	
	if($("#P_USER_NM_01").val() == ""){
		$("#P_USER_ID").val("");
	}
	if($("#P_USER_NM_02").val() == ""){
		$("#P_USER_ID").val("");
	}
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//사원조회구분(영업사원:01, 배달사원:02)
	$("#P_EMP_GUBUN").val($('input:radio[name="member_ch"]:checked').val());
	
	gridRoot1.addLoadingBar();
	
	jQuery.ajax({ 
	    url:"/salesInfoReportDlvrList.do",
	    type:"POST",
		datatype:"json",
		async:true,
		data: params,
		beforeSend : function(){ 	    	
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
function getGridData2(num1,num2,num3,num4) {
	//debugger;
	jQuery.ajax({ 
	    url:"/salesInfoReportDlvrDList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		//data: params,
		data: {'P_SALE_DT':num1,'P_STR_CODE':num2,'P_POS_NO':num3,'P_TRXN_NO':num4},
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

//엑셀-배달목록 다운로드
function excelExport(){    
	var dt 		= new Date();
	var month 	= dt.getMonth()+1;
	var day 	= dt.getDate();
	var year 	= dt.getFullYear();
	var date 	= year+""+month+""+day;
	
	dataGrid1.exportSheetName = deliveryList;
    dataGrid2.exportSheetName = deliveryDetail;
        
	dataGrid1.exportFileName = deliverySearch+"_"+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);
}


//(영업사원검색) 팝업 호출 function
function btn_comm_user_search(){
	$('#comm_pop_wrap4' ).dialog( 'open' );
	gridApp13.resize();
	
	// $("#P_CALLBACK_NM4").val('fn_comm_member_callback1(dataRow13)');
	if($("#P_USER_NM_01").val() != null && $("#P_USER_NM_01").val() != ""){
		$("#P_TEXT4").val($("#P_USER_NM_01").val());
		btn_comm_search('4');
	}	
}

//(영업사원검색) 팝업 callback function
function fn_comm_member_callback(dataRow){
	$('#P_USER_NM_01').val(dataRow.USER_NM);	//사원명
	$('#P_USER_ID').val(dataRow.USER_ID);	//사원ID
}

//(배달사원검색) 팝업 호출 function
function btn_comm_user_search_02(){
	$('#comm_pop_wrap4_1' ).dialog( 'open' );
	gridApp13.resize();
	
	// $("#P_CALLBACK_NM4").val('fn_comm_member_callback1(dataRow13)');
	if($("#P_USER_NM_02").val() != null && $("#P_USER_NM_02").val() != ""){
		$("#P_TEXT4_1").val($("#P_USER_NM_02").val());
		btn_comm_search('4_1');
	}	
}

//(배달사원검색) 팝업 callback function
function fn_comm_member_callback_02(dataRow){
	$('#P_USER_NM_02').val(dataRow.USER_NM);	//사원명
	$('#P_USER_ID').val(dataRow.USER_ID);	//사원ID
}


function member_change(val){
	if(val == "01"){
		$('#P_USER_NM_02').val("");
		$("input[name=P_USER_NM_01").attr("disabled",false);
		$('#search_01').attr("disabled", false);
		$("input[name=P_USER_NM_02").attr("disabled",true);
		$('#search_02').attr("disabled", true);
	}else if(val == "02"){
		$('#P_USER_NM_01').val("");
		$("input[name=P_USER_NM_01").attr("disabled",true);
		$('#search_01').attr("disabled", true);
		$("input[name=P_USER_NM_02").attr("disabled",false);
		$('#search_02').attr("disabled", false);
	}
	
	$("#P_USER_ID").val("");
}
$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	
	getCommonCodeSelectBoxList("P_INDUST_FLAG", "INDUST_FLAG");			// 고객구분(업종유형)
	getCommonCodeSelectBoxList("P_BUSI_FLAG", "BUSI_FLAG");			// 고객구분(업종유형)
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	$(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
				$("#P_OPEN_DT").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
		});
	 
	$(".datepicker2").datepicker({ onSelect: function(dateText) 
	 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
			$("#P_END_DT").val(CUR_DT);
				return;
			}	 
	 }, 	 showMonthAfterYear:true 
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
	
	$("#btn_excel_search").click(function(){
		excelExport();		
	});
			
	$("#P_USER_NM_01").keydown(function(key) {		
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
	});
	$("#P_USER_NM_02").keydown(function(key) {		
		if(key.keyCode == 13){
			btn_comm_user_search_02();
		}
	});
	
});