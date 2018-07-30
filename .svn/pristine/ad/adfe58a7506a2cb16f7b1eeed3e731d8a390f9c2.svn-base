/********************************************************
 * 설명:  회원정보 > 멤버십관리 > 예외고객관리
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
rMateGridH5.create("grid2", "gridHolder2", jsVars1, "100%", "600px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

// 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, selectorColumn2;
var collection1, collection2; // 그리드의 데이터 객체
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
	if(id == "grid2")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp2.setLayout(layoutStr2);	// 데이터와 그리드를 포함하는 객체
		gridApp2.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}
	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
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

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
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
		<DataGrid id="dg1" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="60" />\
				<DataGridColumn dataField="MGMT_NO" headerText="관리번호"  textAlign="center" width="80" />\
				<DataGridColumn dataField="CUST_NAME" headerText="'+cusName+'" textAlign="center" />\
				<DataGridColumn dataField="MOBIL_NO" headerText="'+mobilePhoneNumber+'" textAlign="center" sortable="false" labelJsFunction="rMateLabelPhoneFunc" />\
				<DataGridColumn dataField="DM_YN_NM" headerText="DM여부" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="POST_NO" headerText="'+postAddr+'" textAlign="center" />\
				<DataGridColumn dataField="ADDR" headerText="'+addr+'" textAlign="left" width="300" />\
				<DataGridColumn dataField="ADDR_DTL" headerText="'+addrDtl+'" textAlign="left" width="200" />\
				<DataGridColumn dataField="DM_YN" headerText="DM여부" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//그리드1 헤더 및 레이아웃
var layoutStr2 =
	'<rMateGrid>\
		<DataGrid id="dg2" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="MGMT_NO" headerText="관리번호"  textAlign="center" width="80" />\
				<DataGridColumn dataField="CUST_NAME" headerText="'+cusName+'" textAlign="center" />\
				<DataGridColumn dataField="MOBIL_NO" headerText="'+mobilePhoneNumber+'" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="DM_YN_NM" headerText="DM여부" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="POST_NO" headerText="'+postAddr+'" textAlign="center" />\
				<DataGridColumn dataField="ADDR" headerText="'+addr+'" textAlign="left" width="200" />\
				<DataGridColumn dataField="ADDR_DTL" headerText="'+addrDtl+'" textAlign="left" width="150" />\
				<DataGridColumn dataField="DM_YN" headerText="DM여부" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//----------------------- 그리드 설정 끝 -----------------------

// 회원정보 조회
function getGridData(isHeadDefault) {
	
	if(isHeadDefault == true)
	{
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
		//페이지 1페이지로 이동
		pageIndex = 1;
		$("#pageIndex").val(pageIndex);
	}
	
	var param = $("#sertch_frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({
	    url:"/memberExceptionList.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
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
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//엑셀다운로드
function excelExport()
{
	var frm = document.sertch_frm;
	frm.action = "/memberExceptionListExcel.do";
	frm.method = "post";
   	frm.submit();
}

// 엑셀 업로드
function excelImport()
{
	var option = {
		layoutChangeOption:1,			// 레이아웃 변경 방식 - 0 : 사용자에게 질의, 1 : 현재 레이아웃에 데이터만 import, 2 : 헤더나 데이터에 따라 레이아웃을 재설정하고 데이터를 import
		headerRowCount:1,				// 헤더라인 수. 기본 값 0
		headerRowCountVisible:false,	// 헤더라인 수 표시 여부
		selectSheet:false,				// import한 파일내에 여러 Sheet가 있을 경우 사용자가 Sheet를 선택할 수 있도록 할 지 여부. (false일 경우 첫번째 Sheet를 가져옵니다) 기본 값 false
		useGroupedColumn:true,			// 그룹컬럼 생성 여부. false일 경우 1줄의 컬럼만 생성됩니다.
	};
	
	gridRoot2.excelImport(option, "/gridExcelUp.do");
}

// 저장
function saveExcel() {
	
	/* 회원카드 정보 셋팅
	 * 수정 작업 결과 가져오기 (그리드에서 작업된 입력,수정,삭제 내용을 가져옵니다)
	 * 데이터는 배열 형태로
	 * idx: 행번호
	 * job: 수행 작업 (I:입력, U:수정, D:삭제)
	 * data: 행의 자료
	 * 를 가지고 있으며 삭제가 먼저 오도록 정렬되어 있습니다.
	 */
	var paramData = "";
	var changedData = gridRoot2.getChangedData();
	var rt = 0;
	
	$("#D_MEM_LIST").val("");
	if (changedData.length > 0)
	{
		// D_MEM_LIST 파리미터에 아래와 같은 형식의 스트링을 '@' '|' 두개의 구분자로 서버에전송 = '111|222|333@111|222|333@111|222|333'
		/* 수정타입	|관리번호	|회원명		|전화번호		|DM여부	|우편번호		|주소		|상세주소
		 * JOB_TYPE	|MGMT_NO|CUST_NAME	|MOBIL_NO	|DM_YN	|POST_NO	|ADDR	|ADDR_DTL
		 */
		var data;
		for (var i = 0; i < changedData.length; i++)
		{
			//console.log("index:"+changedData[i].idx+"\n"+"job:"+changedData[i].job+"\n"+"data:"+changedData[i].data);
			
			data = changedData[i].data;
			
			if( "" == CommonJs.isNullToString(data.MGMT_NO, "") )
			{
				rt = -1;
				break;
			}
			
			if( CommonJs.isNullToString(data.MGMT_NO, "").length > 8 )
			{
				rt = -2;
				break;
			}
			
			if(paramData != "")
			{
				paramData += "@";
			}
			paramData += changedData[i].job +  "|" + CommonJs.isNullToString(data.MGMT_NO, "") +  "|" + CommonJs.isNullToString(data.CUST_NAME, "") + "|" + CommonJs.isNullToString(data.MOBIL_NO, "") 
				+ "|" + CommonJs.isNullToString(data.DM_YN_NM, "") + "|" + CommonJs.isNullToString(data.POST_NO, "") + "|" + CommonJs.isNullToString(data.ADDR, "") + "|" + CommonJs.isNullToString(data.ADDR_DTL, "");
		}
		$("#D_MEM_LIST").val(paramData);
	}
	//console.log(paramData);
	//alert(paramData);return;
	
	if(rt == -1)
	{
		alert("엑셀 양식에 관리항목을 입력해 주세요!");
		return;
	}
	
	if(rt == -2)
	{
		alert("엑셀 양식에 관리항목 자릿수는 8자리까지 입력 가능 합니다.");
		return;
	}
	
	var param = $("#reg_frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updateMemberException.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					btn_close();
					getGridData(true);
				}
				else
				{
					alert(msgErrorDefault);
					btn_close();
				}
			}
			else
			{
				alert(msgErrorDefault);
				btn_close();
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	btn_close();
	    }
	});
}

//팝업 닫기
function btn_close(){
	$("#pop_wrap").dialog( "close" );
}

$(document).ready(function () {
	
	//최초 도움말 불러오기
	setHelpMessage($(location).attr("pathname").replace("/",""));
	
	//초기 팝업 사이즈 조절
	$(function() {
		$("#pop_wrap").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 900,
		    resizable : false,
		    position : "center",
		    open: function(){
		    	$("body").css("overflow-y", "hidden");
		    },
		    close: function(){
		    	$("body").css("overflow-y", "scroll");
		    }
		});
		
	});
	
	getCommonCodeSelectBoxList("P_DM_YN", "USE_YN");	// DM여부
	
	$("#P_DM_YN").val("Y");		// 검색조건 DM여부 디폴트 셋팅
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		getGridData(true);
	});
	
	// 엑셀 다운
	$("#btn_excel_down").click(function() {
		excelExport();
	});
	
	// 엑셀 업로드 팝업 오픈
	$("#btn_excel_pop").click(function() {
		gridApp2.setData([]);
		$("#pop_wrap").dialog("open");
	});
	
	// 엑셀 업로드
	$("#btn_excel_upload").click(function() {
		excelImport();
	});
	
	$("#btn_excel_sample_down").click(function() {
		location.href = "/resources/js/page/member/exception/sample.xls";
	});
	
	// 저장
	$("#btn_save").click(function() {
		saveExcel();
	});
	
});