/********************************************************
 * 설명: 외상매출미수채권 매뉴화면
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 추황영
 * since	: 2017.04.05
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1;
//var gridApp2, gridRoot2, dataGrid2, dataRow2;

var gridData1 = [];
//그리드2 데이터 초기화

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
		//gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
			<DataGrid id="dg1" sortableColumns="true" showDataTips="true"  verticalAlign="middle" >\
				<groupedColumns>\
					<DataGridColumn  id="No" 	 dataField="No"  				headerText="No" 	    editable="false"		itemRenderer="IndexNoItem"	visible="true"    textAlign="center"	width="38"  />\
					<DataGridColumn dataField="STR_CODE" 					headerText="'+storCode+'" 			width="80" 		textAlign="center"/>\
					<DataGridColumn dataField="STR_NAME" 					headerText="'+storeName+'" 			width="110" 		textAlign="center"/>\
					<DataGridColumn dataField="CUST_NO" 					headerText="'+cusNo+'"  		textAlign="center"  width="80"  />\
					<DataGridColumn dataField="CUST_NAME" 				headerText="'+cusName+'"  		width="235"	textAlign="left" />\
					<DataGridColumn dataField="MBR_GRADE_NAME" 		headerText="'+mbrGrade+'"  		textAlign="center" width="130" />\
					<DataGridColumn dataField="BUSI_FLAG_NAME" 		headerText="'+busiFlag+'"  		textAlign="center" width="110" />\
					<DataGridColumn dataField="ACCT_DEPT"   				headerText="'+accountingCode+'"    	width="80"		textAlign="center" />\
					<DataGridColumn dataField="SALE_DT"   					headerText="'+lastSalesDt+'"    	width="100"	formatter="{datefmt}"	textAlign="center" />\
					<DataGridColumn dataField="RCP_DT"   					headerText="'+lastDepositDt+'"    	width="100"	formatter="{datefmt}"	textAlign="center" />\
					<DataGridColumn dataField="ACCT_REABLE" 				headerText="'+accruedBalance+'"  		width="140" textAlign="right" formatter="{numfmt}" id="dg1col8"/>\
				</groupedColumns>\
				<dataProvider>\
					<SpanSummaryCollection source="{$gridData}">\
						<mergingFields>\
							<SpanMergingField name="STR_CODE" colNum="1" >\
							</SpanMergingField>\
							<SpanMergingField name="STR_NAME" colNum="2" >\
								<SpanSummaryRow label="점포별 소계" labelDataField="STR_NAME" rowAttribute="{sumRowAttr}" cellAttribute="{sum2CellAttr}" >\
									<SpanSummaryField dataField="ACCT_REABLE" summaryOperation="SUM" />\
								</SpanSummaryRow>\
							</SpanMergingField>\
						</mergingFields>\
					</SpanSummaryCollection>\
				</dataProvider>\
				<footers>\
					<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
						<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn />\
						<DataGridFooterColumn />\
						<DataGridFooterColumn />\
						<DataGridFooterColumn />\
						<DataGridFooterColumn />\
						<DataGridFooterColumn />\
						<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col8}" formatter="{numfmt}" textAlign="right" />\
					</DataGridFooter>\
				</footers>\
			</DataGrid>\
	</rMateGrid>';



//목록 그리드 조회
function getGridData() {
	
	var params = $("#frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/creditReceivablesList.do",
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
	       	gridRoot1.removeLoadingBar();
	    },
	    complete : function(data) {
	    	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	gridRoot1.removeLoadingBar();
	    }
	});
}

/*
 * 
 */

//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	  
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUST_NAME").val());
		btn_comm_search('1');
	}
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow){
	$('#P_CUST_NAME' ).val(dataRow.CUST_NAME);		// 회원명
//	$('#CUS_NAME_TEXT' ).text(dataRow.CUST_NAME);	// 회원명
}
/*
 * 
 */





function excelExport(){    
	var nowDate = new CommDateManager().getDate("yyyymmdd");
	var str_name = $("#P_STR_CODE option:selected").text();
	dataGrid1.exportFileName = "외상매출미수채권_"+nowDate+"_"+str_name+"_"+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}

//출력
function btn_print(){
	
	
	var P_CORP_CODE	= $("#P_CORP_CODE").val();
	var P_STR_CODE		= $("#P_STR_CODE").val();
	var P_BUSI_FLAG		= $("#P_BUSI_FLAG").val();
	var P_CUST_NAME		= $("#P_CUST_NAME").val();
	var P_CUST_NO			= $("#P_CUST_NO").val();
	var params = "?reportMode=HTML"	+
	"&P_CORP_CODE="		+P_CORP_CODE+
	"&P_STR_CODE="		+P_STR_CODE+
	"&P_BUSI_FLAG="		+P_BUSI_FLAG+
	"&P_CUST_NAME="		+P_CUST_NAME+
	"&P_CUST_NO="			+P_CUST_NO;
	 // AIViewer 파라미터
	window.open("aireportCreditReceivablesPrint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	
}

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
//	var beforeMonthDate = new CommDateManager().before(0, 0).getDate("yyyy-mm"); // 일주일전 before(년,월,일)
	
//	$("#P_WORK_EXEC_DT").val(lsToDate);
//	$("#P_PUR_SDAY").val(beforeMonthDate+'-01');
	
	$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	getCommonCodeSelectBoxList("P_BUSI_FLAG","BUSI_FLAG");
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 107 );
	
	$(window).on('resize',function (){			
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 107 );		
	});	
	
	//조회
	$("#btn_search").click(function(){
		getGridData();
	});	

	$("#btn_excel_down").click(function(){
		excelExport();
	});
	
	$("#btn_print").click(function(){
		btn_print();
	});
	
	$("#P_CUST_NAME").keydown(function(key) {
		$("#P_CUST_NO").val("");
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
	});
});
