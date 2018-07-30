/********************************************************
 * 설명:  영업정보 > POS정산 > 매출부가세전송
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.04.03
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var collection1; // 그리드의 데이터 객체
var src1;
var gridData = [];
var totalCnt = 0;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

//그리드1 레디 핸들러
function gridReadyHandler(id) {
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
	
	// 전체 데이타 가져오기
	src1 = collection1.getSource();
	
	// 그리드1 셀선택 이벤트
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
	clickData1 = dataRow1[dataField];
	
}

//그리드 헤더 정렬 기능 이벤트
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


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="60" />\
				<DataGridColumn dataField="CUST_NO" headerText="회원번호" textAlign="center" />\
				<DataGridColumn dataField="ACCT_DEPT" headerText="회계코드" textAlign="center" />\
				<DataGridColumn dataField="CUST_NAME" headerText="거래처명" textAlign="left" width="230" />\
				<DataGridColumn dataField="BUSI_NO" headerText="사업자번호" textAlign="center" labelJsFunction="rMateLabelBusiFunc" />\
				<DataGridColumn dataField="TAX_GB_NM" headerText="세무구분" textAlign="center" />\
				<DataGridColumn dataField="SALE_AMT" headerText="공급가액" textAlign="right" formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="TAX_AMT" headerText="부가세" textAlign="right" formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="SUM_SALE_AMT" headerText="합계액" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SALE_DT"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="TAX_GB"  headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData(isHeadDefault, isFirstPage) {
	var param = $("#frm").serializeAllObject();
	
	if(isHeadDefault == true)
	{
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
	}
	
	if($("#P_SALE_DT").val() == null || $("#P_SALE_DT").val() == "")
	{
		alert("매출년월" + msgConfirm);
		$("#P_SALE_DT").focus();
		return;
	}
	
	if($("#P_CUST_NAME").val()==""){
		$("#P_CUST_NO").val("");
	}
	
	if(isFirstPage) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/posClosedDouzoneList.do",
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
			totalCnt = data.totalCount;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
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

// 확정전송
function updatePosClosedDouzone1()
{
	var param = $("#frm").serializeAllObject();
	
	if(src1.length < 1)
	{
		alert("조회 후 저장 해주세요.");
		return;
	}
	
	if($("#P_SALE_DT").val() == null || $("#P_SALE_DT").val() == "")
	{
		alert("매출년월" + msgConfirm);
		$("#P_SALE_DT").focus();
		return;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({ 
	    url:"/updatePosClosedDouzone1.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
				}
				else
				{
					alert(msgErrorDefault);
				}
			}
			else
			{
				alert(msgErrorDefault);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 마감생성
function updatePosClosedDouzone2()
{
	var param = $("#frm").serializeAllObject();
	
	if(src1.length < 1)
	{
		alert("조회 후 저장 해주세요.");
		return;
	}
	
	if($("#P_SALE_DT").val() == null || $("#P_SALE_DT").val() == "")
	{
		alert("매출년월" + msgConfirm);
		$("#P_SALE_DT").focus();
		return;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({ 
	    url:"/updatePosClosedDouzone2.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
				}
				else if(data.RETURN_CODE == -2)
				{
					alert("더존(회계)시스템 전송 완료되어 처리할 수 없습니다.");
				}
				else if(data.RETURN_CODE == -3)
				{
					alert("더존(회계)시스템 전송 오류.");
				}
				else
				{
					alert(msgErrorDefault);
				}
			}
			else
			{
				alert(msgErrorDefault);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//엑셀다운로드(자동분개)
function excelExport1()
{
	if($("#P_CUST_NAME").val()==""){
		$("#P_CUST_NO").val("");
	}
	var frm = document.frm;
	frm.action = "/posClosedDouzoneListExcel1.do";
	frm.method = "post";
   	frm.submit();
}

// 엑셀다운로드(면과세)
function excelExport2()
{
	if($("#P_CUST_NAME").val()==""){
		$("#P_CUST_NO").val("");
	}
	var frm = document.frm;
	frm.action = "/posClosedDouzoneListExcel2.do";
	frm.method = "post";
   	frm.submit();
}

//(회원검색) 팝업 호출 function
function btn_comm_user_search(type)
{
	$("#comm_pop_wrap1").dialog("open");
	gridApp10.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM1").val("fn_comm_user_callback_"+type+"(dataRow10)");
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUST_NAME").val());
		btn_comm_search('1');
	}
}

//회원검색 팝업 callback function
function fn_comm_user_callback_S(dataRow)
{
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("회원정보 조회 실패");
		return;
	}
	
	$("#P_CUST_NAME").val(dataRow.CUST_NAME);	// 회원명
	$("#P_CUST_NO").val(dataRow.CUST_NO);		// 회원번호
}

$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	getCommonCodeSelectBoxList("P_TAX_GB", "TAX_GB");
	
	//달력설정
	/*$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_SALE_DT").val(date);*/
	
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	$("#P_SALE_DT").val(nowDateYm);
	datePickerYearMonth();
	
	$("#P_CUST_NAME").keydown(function(key) {
		
		if(key.keyCode == 13){
			btn_comm_user_search('S');
		}
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData(true, true);
	});
	
	// 확정/전송 버튼 클릭
	$("#btn_update1").click(function() {
		updatePosClosedDouzone1();
	});
	
	// 마감생성 버튼 클릭
	$("#btn_update2").click(function() {
		updatePosClosedDouzone2();
	});
	
	// 엑셀 다운 (자동분개)
	$("#btn_excel_down1").click(function() {
		excelExport1();
	});
	
	// 엑셀 다운 (면과세)
	$("#btn_excel_down2").click(function() {
		excelExport2();
	});
	
});

//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-150); // -105

	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-150); // -105
	});
});
