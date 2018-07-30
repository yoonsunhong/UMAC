/********************************************************
 * 설명:  영업정보 > 영업분석 > 면과세매출내역
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 윤태희
 * since	: 2017.09.01
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "526px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var collection; // 그리드의 데이터 객체
var gridData = [];

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	gridApp1.setData(gridData);
	
	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	//collection = gridRoot1.getCollection();
	
	// 그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
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
	
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F" />\
		<SpanCellAttribute id="sum1CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048" colSpan="2" />\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="2" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" verticalAlign="middle" sortableColumns="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" 		headerText="'+storNm+'" 		textAlign="center" />\
				<DataGridColumn dataField="SALE_DT" 		headerText="'+selngDate+'" 	textAlign="center" />\
				<DataGridColumn dataField="SALE_AMT" 		headerText="면세금액"  			textAlign="right" 			formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_TAX" 		headerText="과세금액" 			textAlign="right"  			formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_BUKA"   	headerText="부가세액" 			textAlign="right"  			formatter="{numfmt}"/>\
				<DataGridColumn dataField="BOT_AMT"   		headerText="공병금액" 			textAlign="right" 			formatter="{numfmt}"/>\
				<DataGridColumn dataField="SO_SALE_AMT"  headerText="소모품" 			textAlign="right" 			formatter="{numfmt}" />\
				<DataGridColumn dataField="ROW_TOTAL"   	headerText="전체합계" 			textAlign="right" 			formatter="{numfmt}"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
					<SpanMergingField name="STR_NAME">\
							<SpanSummaryRow label="'+subTotal+'" labelDataField="STR_NAME" rowAttribute="{sumRowAttr}" cellAttribute="{sum1CellAttr}">\
					            <SpanSummaryField dataField="SALE_AMT" 		summaryOperation="SUM" />\
					            <SpanSummaryField dataField="SALE_TAX" 		summaryOperation="SUM" />\
					            <SpanSummaryField dataField="SALE_BUKA" 		summaryOperation="SUM" />\
					            <SpanSummaryField dataField="BOT_AMT" 		summaryOperation="SUM" />\
					            <SpanSummaryField dataField="SO_SALE_AMT" 		summaryOperation="SUM" />\
					            <SpanSummaryField dataField="ROW_TOTAL" 		summaryOperation="SUM" />\
					        </SpanSummaryRow>\
				        </SpanMergingField>\
					</mergingFields>\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="STR_NAME" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
					        <SpanSummaryField dataField="SALE_AMT" 		summaryOperation="SUM" />\
				            <SpanSummaryField dataField="SALE_TAX" 		summaryOperation="SUM" />\
				            <SpanSummaryField dataField="SALE_BUKA" 		summaryOperation="SUM" />\
				            <SpanSummaryField dataField="BOT_AMT" 		summaryOperation="SUM" />\
				            <SpanSummaryField dataField="SO_SALE_AMT" 		summaryOperation="SUM" />\
				            <SpanSummaryField dataField="ROW_TOTAL" 		summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

//목록 그리드 조회
function getGridData() {
	var param = $("#frm").serializeAllObject();
	
	param.S_STR_CODE = $("#S_STR_CODE").val();
	
	if(getValidation()) {
		//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
		jQuery.ajax({ 
			url:"/salesAnalReportTaxHistoryList.do",
			type:"POST",
			datatype:"json",
			//async:false,
			data: param,
			beforeSend : function(){
				dataGrid1.setEnabled(false);
				gridRoot1.addLoadingBar();
			},
			success:function(data){
				gridData = data.list;
				gridApp1.setData(gridData);
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
	
}

//엑셀다운로드
function excelExport() {
	if(getValidation()) {
		$("#S_STR_CODE").prop("disabled", false);
		
		var frm = document.frm;
		frm.action = "/salesAnalReportTaxHistoryListExcel.do";
		frm.method = "post";
		frm.submit();
		
		$("#S_STR_CODE").prop("disabled", true);
	}
}


//유효성검사
function getValidation() {
	var P_STR_DT_ARR 	= $("#S_SALE_DT").val().split("-");
	var P_END_DT_ARR 	= $("#S_SALE_DT_E").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;


	if(dateDiff > 60) {
		alert("조회일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#S_SALE_DT").focus();
		return false;
	}
	
	if($("#S_SALE_DT").val() == null || $("#S_SALE_DT").val() == "")
	{
		alert("영업일자" + msgConfirm);
		$("#S_SALE_DT").focus();
		return false;
	}
	
	if($("#S_SALE_DT_E").val() == null || $("#S_SALE_DT_E").val() == "")
	{
		alert("영업일자" + msgConfirm);
		$("#S_SALE_DT_E").focus();
		return false;
	}
	
	var sDt = $("#S_SALE_DT").val().replace(/-/g, "");
	var eDt = $("#S_SALE_DT_E").val().replace(/-/g, "");
	if(sDt > eDt)
	{
		alert(msgDateValidation);
		$("#S_SALE_DT_E").focus();
		return false;
	}

	return true;
}



/*//점포명 체인지 이벤트 (onchange 시, 계산원 select box 다시 불러옴.
function changeTopSelectStrCode(STR_CODE) {
	$("#S_STR_CODE").html("<option value=\"\">" + all + "</option>");	//점포 select box 초기화
	getStoreCode("S_STR_CODE");		//점포 select box 다시 불러오기
	$("#S_STR_CODE").val(STR_CODE);//바뀐 점포코드 value
	

	
	$('#S_EMP_NO').val("");
	
}*/
$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 점포코드 콤보 가져오기
	getStoreCode("S_STR_CODE");
	$("#S_STR_CODE").val($("#SESSION_STR_CODE").val());
	
	
	//달력설정
	//$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var date_only_one = new CommDateManager().getDate("yyyy-mm-dd");	
	$("#S_SALE_DT").val(date_only_one);
	$("#S_SALE_DT_E").val(date);
	
	// 달력체크
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var gongDt = parseInt($("#S_SALE_DT").val().replace(/-/g, ""));
			var endDt = parseInt($("#S_SALE_DT_E").val().replace(/-/g, ""));
			if(gongDt > endDt)
			{
				alert(msgStartDateAndEndDate);
				
				if(this.id == "S_SALE_DT")
					$("#S_SALE_DT").val(date);
				else if(this.id == "S_SALE_DT_E")
					$("#S_SALE_DT_E").val(date);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData();
	});
	
	//사용자 권한정보 조회
	 var psotValue = {};
	 
	 jQuery.ajax({ 
	    url:"/selectUserOrgType.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: psotValue,
		success:function(data){  
			var sessionGroupCode = data[0].GROUP_CODE;
			if(sessionGroupCode == "ROLE001" || sessionGroupCode == "ROLE025" || sessionGroupCode == "ROLE026" || sessionGroupCode == "ROLE002"){
				$("#S_STR_CODE").attr("disabled", false);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
});
