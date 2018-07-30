/********************************************************
 * 설명:  회원정보 > 멤버십관리 > DM발송관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.02.13
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

// 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var collection1; // 그리드의 데이터 객체
var gridData = [];
var totalCnt = 0;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	// rMateGrid 관련 객체
	
	if(id == "grid1")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp1.setLayout(layoutStr1);	// 데이터와 그리드를 포함하는 객체
		gridApp1.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
	
	drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
	$("#P_CUST_NO").val(dataRow1.CUST_NO);
	
}

// 그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {
	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	getGridData(false);
}

function gridMovePage(page) {
	$("#pageIndex").val(page);
	pageIndex = page;
	getGridData(false);
}

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="CUST_NAME" headerText="'+cusName+'" textAlign="center" />\
				<DataGridColumn dataField="CUST_NO" headerText="'+cusNo+'" textAlign="center" width="70" />\
				<DataGridColumn dataField="TEL_NO" headerText="'+phoneNumber+'" textAlign="center" sortable="false" labelJsFunction="rMateLabelPhoneFunc2" />\
				<DataGridColumn dataField="MOBIL_NO" headerText="'+mobilePhoneNumber+'" textAlign="center" sortable="false" labelJsFunction="rMateLabelPhoneFunc" />\
				<DataGridColumn dataField="BUSI_NAME" headerText="'+supplyName+'" textAlign="left" />\
				<DataGridColumn dataField="SALE_AMT_SUM" headerText="'+selngAm+'" textAlign="right" formatter="{numfmt}" width="80" />\
				<DataGridColumn dataField="MOD_CUST_CNT" headerText="'+visits+'" textAlign="right" formatter="{numfmt}" width="70" />\
				<DataGridColumn dataField="POST_NO" headerText="우편번호" textAlign="right" width="70" />\
				<DataGridColumn dataField="ADDR" headerText="'+addr+'" textAlign="left" width="210" />\
				<DataGridColumn dataField="ADDR_DTL" headerText="'+addrDtl+'" textAlign="left" width="150" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE" headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//----------------------- 그리드 설정 끝 -----------------------

// 회원정보 조회
function getGridData(isHeadDefault) {
	var param 			= $("#sertch_frm").serializeArray();
	var gongDt 			= $("#P_GONG_DT").val().replace(/-/g, "");
	var endDt 			= $("#P_END_DT").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#P_GONG_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if(isHeadDefault == true)
	{
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
		//페이지 1페이지로 이동
		pageIndex = 1;
		$("#pageIndex").val(pageIndex);
	}
	
	if($("#P_GONG_DT").val() == null || $("#P_GONG_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_GONG_DT").focus();
		return;
	}
	
	if($("#P_END_DT").val() == null || $("#P_END_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_END_DT").focus();
		return;
	}
		
	if(gongDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_END_DT").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_GONG_DT").focus();
		return;
	}

	if($("#P_SALE_AMT_S").val() == null || $("#P_SALE_AMT_S").val() == "")
	{
		alert(selngAm + msgConfirm);
		$("#P_SALE_AMT_S").focus();
		return;
	}
	
	if($("#P_SALE_AMT_E").val() == null || $("#P_SALE_AMT_E").val() == "")
	{
		alert(selngAm + msgConfirm);
		$("#P_SALE_AMT_E").focus();
		return;
	}
	
	if($("#P_MOD_CUST_CNT").val() == null || $("#P_MOD_CUST_CNT").val() == "")
	{
		alert(visits + msgConfirm);
		$("#P_MOD_CUST_CNT").focus();
		return;
	}

	param[7].value = param[7].value.replace(/-/gi, '');
	param[8].value = param[8].value.replace(/-/gi, '');
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberDmList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid1.setEnabled(false);
			gridRoot1.addLoadingBar();
		},
		success:function(data){
			
			if(typeof data.list != "undefiend" && data.list != null)
			{
				//그리드1 데이터 조회
				gridData = data.list;
				gridApp1.setData(gridData);
				totalCnt = data.totalCount;
				
				drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			}
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

//엑셀다운로드
function excelExport(){
	var frm 			= document.sertch_frm;
	var gongDt 			= $("#P_GONG_DT").val().replace(/-/g, "");
	var endDt 			= $("#P_END_DT").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#P_GONG_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if($("#P_GONG_DT").val() == null || $("#P_GONG_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_GONG_DT").focus();
		return;
	}
	
	if($("#P_END_DT").val() == null || $("#P_END_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_END_DT").focus();
		return;
	}
	
	if(gongDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_END_DT").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_GONG_DT").focus();
		return;
	}

	if($("#P_SALE_AMT_S").val() == null || $("#P_SALE_AMT_S").val() == "")
	{
		alert(selngAm + msgConfirm);
		$("#P_SALE_AMT_S").focus();
		return;
	}
	
	if($("#P_SALE_AMT_E").val() == null || $("#P_SALE_AMT_E").val() == "")
	{
		alert(selngAm + msgConfirm);
		$("#P_SALE_AMT_E").focus();
		return;
	}
	
	if($("#P_MOD_CUST_CNT").val() == null || $("#P_MOD_CUST_CNT").val() == "")
	{
		alert(visits + msgConfirm);
		$("#P_MOD_CUST_CNT").focus();
		return;
	}
	
	
	frm.action = "/memberDmListExcel.do";
	frm.method = "post";
   	frm.submit();
}

$(document).ready(function () {
	
	//최초 도움말 불러오기
	setHelpMessage($(location).attr("pathname").replace("/",""));
	
	//달력설정
	//$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().before(0, 0, 7).getDate("yyyy-mm-dd"); // 일주일전 before(년,월,일)
	
	$("#P_GONG_DT").val(beforeDate);
	$("#P_END_DT").val(date);
	
	// 달력체크
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var gongDt = parseInt($("#P_GONG_DT").val().replace(/-/g, ""));
			var endDt = parseInt($("#P_END_DT").val().replace(/-/g, ""));
			if(gongDt > endDt)
			{
				alert(msgStartDateAndEndDate);
				
				if(this.id == "P_GONG_DT")
					$("#P_GONG_DT").val(beforeDate);
				else if(this.id == "P_END_DT")
					$("#P_END_DT").val(date);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
	// 매출금액 처리
	$("#P_SALE_AMT_S").number( true, 0 );
	$("#P_SALE_AMT_E").number( true, 0 );
	
	// 숫자만 입력 처리
	try {
		
		CommonJs.addInputHandler({input:$("#P_MOD_CUST_CNT"), dataType:"N", maxlength:"5"});
		
    } catch(e) {
    	console.log(e);
    }
    
	getCommonCodeSelectBoxList("P_MBR_GRADE", "MBR_GRADE");		// 회원등급
	getCommonCodeSelectBoxList("P_BUSI_FLAG", "BUSI_FLAG");		// 회원구분
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		getGridData(true);
	});
	
	// 거래현황 엑셀 다운
	$("#btn_excel_down").click(function() {
		excelExport();
	});
	
	// 회원구분 체인지 이벤트 (회원구분 변경시 회원등급 리스트 재조회)
	$("#P_BUSI_FLAG").change(function() {
		getCommonCodeGradeSelectBoxList("P_MBR_GRADE", "MBR_GRADE", $("#P_BUSI_FLAG").val(), true);	// 회원등급
	});
	
	
});