/********************************************************
 * 설명:  신용카드집계현황
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.01.10
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridApp2, gridRoot2, dataGrid2, dataRow2;
var gridApp3, gridRoot3, dataGrid3, dataRow3;

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
rMateGridH5.create("grid3", "gridHolder3", jsVars1);

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

var tabClickNum = "1";	//점포별 영업사원 회원그룹 클릭했을때 값 1,2,3

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}else if(id == "grid2"){
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp2.setLayout(layoutStr2);
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);		
	}else if(id == "grid3"){
		// rMateGrid 관련 객체
		gridApp3 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot3 = gridApp3.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp3.setLayout(layoutStr3);
		
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);		
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}
//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
}
//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}
function dataCompleteHandler2(event) {
}
function itemClickHandler2(event){	
}

function layoutCompleteHandler3() {
	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
}
function dataCompleteHandler3(event) {
}
function itemClickHandler3(event){	
}
//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true">\
				<groupedColumns>\
					<DataGridColumn dataField="CD_NM" headerText="'+cardCompany+'" width="110" textAlign="center"/>\
					<DataGridColumnGroup headerText="'+normality+'">\
						<DataGridColumn dataField="SALE_AMT0_CT"   headerText="'+co+'"   textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="SALE_AMT0_SUM" 	 headerText="'+amount+'"  	textAlign="right" formatter="{numfmt}"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+returnningGoods+'">\
						<DataGridColumn dataField="SALE_AMT2_CT" 	 headerText="'+co+'"  	textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="SALE_AMT2_SUM" 	 headerText="'+amount+'"  	textAlign="right" formatter="{numfmt}"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+calText17+average+'">\
						<DataGridColumn dataField="SALE_AMT0_2_CT_PER" 	 headerText="'+co+'"  	textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="SALE_AMT0_2_SUM_PER" 	 headerText="'+amount+'"  	textAlign="right" formatter="{numfmt}"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+sm+'">\
						<DataGridColumn dataField="SALE_AMT0_2_CT_SUM" 	 headerText="'+co+'"  	textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="SALE_AMT0_2_SUM_SUM" 	 headerText="'+amount+'" 	textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="SALE_AMT0_2_SUM_SUM_PER" 	 headerText="'+cmpntrt+'" 	textAlign="right" />\
					</DataGridColumnGroup>\
				</groupedColumns>\
				<dataProvider>\
					<SpanSummaryCollection source="{$gridData}">\
						<summaries>\
							<SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="CD_NM" rowAttribute="{sumRowAttr_T}">\
								<SpanSummaryField dataField="SALE_AMT0_CT" 	summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_AMT0_SUM" summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_AMT2_CT" 	summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_AMT2_SUM" summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_AMT0_2_CT_PER" 	summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_AMT0_2_SUM_PER" summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_AMT0_2_CT_SUM" 	summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_AMT0_2_SUM_SUM" summaryOperation="SUM" />\
							</SpanSummaryRow>\
						</summaries>\
					</SpanSummaryCollection>\
				</dataProvider>\
			</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="3" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
			<DataGrid id="dg1" verticalAlign="middle" autoHeight="true" >\
				<groupedColumns>\
					<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" width="110" 	textAlign="center" />\
					<DataGridColumn dataField="CD_NM" headerText="'+cardCompany+'" width="110" 	textAlign="center" />\
					<DataGridColumn dataField="SALE_DT" headerText="'+sellingDate+'" width="110" 	textAlign="center" formatter="{datefmt}"/>\
					<DataGridColumnGroup headerText="'+normality+'">\
						<DataGridColumn dataField="SALE_AMT0_CT"   headerText="'+co+'"   textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="SALE_AMT0_SUM" 	 headerText="'+amount+'"  	textAlign="right" formatter="{numfmt}"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+returnningGoods+'">\
						<DataGridColumn dataField="SALE_AMT2_CT" 	 headerText="'+co+'"  	textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="SALE_AMT2_SUM" 	 headerText="'+amount+'"  	textAlign="right" formatter="{numfmt}"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+sm+'">\
						<DataGridColumn dataField="SALE_AMT0_2_CT_SUM" 	 headerText="'+co+'"  	textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="SALE_AMT0_2_SUM_SUM" 	 headerText="'+amount+'" 	textAlign="right" formatter="{numfmt}"/>\
					</DataGridColumnGroup>\
				</groupedColumns>\
				<dataProvider>\
					<SpanSummaryCollection source="{$gridData}">\
						<summaries>\
					        <SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="STR_NAME" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
					            <SpanSummaryField dataField="SALE_AMT0_CT" summaryOperation="SUM" />\
					            <SpanSummaryField dataField="SALE_AMT0_SUM" summaryOperation="SUM" />\
					            <SpanSummaryField dataField="SALE_AMT2_CT" summaryOperation="SUM" />\
					            <SpanSummaryField dataField="SALE_AMT2_SUM" summaryOperation="SUM" />\
					            <SpanSummaryField dataField="SALE_AMT0_2_CT_SUM" summaryOperation="SUM" />\
					            <SpanSummaryField dataField="SALE_AMT0_2_SUM_SUM" summaryOperation="SUM" />\
					        </SpanSummaryRow>\
					    </summaries>\
					</SpanSummaryCollection>\
				</dataProvider>\
			</DataGrid>\
	</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="8" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
			<DataGrid id="dg1" sortableColumns="true">\
				<groupedColumns>\
					<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" width="90" 		textAlign="center"/>\
					<DataGridColumn dataField="SALE_DT" headerText="'+dealingsDate+'" width="110" 		textAlign="center"	formatter="{datefmt}"/>\
					<DataGridColumn dataField="TRXN_NO" headerText="'+dealingsNumber+'" width="110" 		textAlign="center"/>\
					<DataGridColumn dataField="CD_NM" headerText="'+cardCompany+'" width="110" 		textAlign="center"/>\
					<DataGridColumn dataField="CARD_NO" headerText="'+cardNumber+'" width="130" 		textAlign="center"/>\
					<DataGridColumn dataField="APP_NO" headerText="'+consentNumber+'" width="110" 		textAlign="center"/>\
					<DataGridColumn dataField="APP_DT" headerText="'+consentDate+'" width="110" 		textAlign="center"	formatter="{datefmt}"/>\
					<DataGridColumn dataField="CANC_FLAG" headerText="'+se+'" width="70" 		textAlign="center"/>\
					<DataGridColumn dataField="SALE_AMT" headerText="'+amount+'" width="110" 		textAlign="right" formatter="{numfmt}"/>\
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


//목록 그리드 조회
function getGridData() {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;

	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//유효성검사
	if(dateDiff > 60) {
		alert("조회일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return false;
	}
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesAnalReportCardList.do",
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
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;

	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//유효성검사
	if(dateDiff > 60) {
		alert("조회일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return false;
	}
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
		url:"/salesAnalReportCardDList.do",
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

function getGridData3() {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;

	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//유효성검사
	if(dateDiff > 60) {
		alert("조회일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return false;
	}
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
		url:"/salesAnalReportCardTList.do",
		type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
			gridRoot3.addLoadingBar();
		}, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridApp3.setData(data);
			
			dataGrid3.setEnabled(true);
			gridRoot3.removeLoadingBar();			
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
	
	if(tabClickNum == "1"){
		dataGrid1.exportFileName = "카드사별_"+date+".xlsx";
		gridRoot1.excelExportSave("/gridExcelDown.do", false);		
	}else if(tabClickNum == "2"){
		dataGrid2.exportFileName = "일자별_"+date+".xlsx";
		gridRoot2.excelExportSave("/gridExcelDown.do", false);
	}else if(tabClickNum == "3"){
		dataGrid3.exportFileName = "거래건별_"+date+".xlsx";
		gridRoot3.excelExportSave("/gridExcelDown.do", false);
	}
}

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	getCommonCodeSelectBoxList("P_CARD_CODE", "CARD_CODE");				// 카드사
	
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
	$("#gridHolder1,#gridHolder2,#gridHolder3").width("100%");
	$("#gridHolder1,#gridHolder2,#gridHolder3").height( $(window).height() - 135 );
	
	$(window).on('resize',function (){			
		$("#gridHolder1,#gridHolder2,#gridHolder3").width("100%");	
		$("#gridHolder1,#gridHolder2,#gridHolder3").height( $(window).height() - 135 );		
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
		if(tabClickNum == "1"){
			getGridData();		
		}else if(tabClickNum == "2"){
			getGridData2();		
		}else if(tabClickNum == "3"){
			getGridData3();		
		}
	});	
	
	$("#bt_tab1").click(function(){
		tabClickNum = "1";
	});		
	$("#bt_tab2").click(function(){
		tabClickNum = "2";
	});		
	$("#bt_tab3").click(function(){
		tabClickNum = "3";
	});			
	
	
	//excel다운
	$("#btn_excel_down").click(function(){
		excelExport();	
	});		
});



