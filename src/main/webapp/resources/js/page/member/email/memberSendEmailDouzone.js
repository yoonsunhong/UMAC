/********************************************************
 * 설명:  
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 
 * since	: 
 * version : 1.0
 ********************************************************/

$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//초기 팝업 사이즈 조절
	$("#pop_wrap").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 380,
	    resizable : false,
	    position : "center",
	    open: function(){
	    	$("body").css("overflow-y", "hidden");
	    },
	    close: function(){
	    	$("body").css("overflow-y", "scroll");
	    }
	});
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	/*
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009")  // 바이어 로그인시 다보여줌
	{ 
	} else {         // 점포 로그인시 해당 점포만 보여줌, 조회조건의 점포코드도 마찬가지
		$("#P_STR_CODE  option[value!='"+$("#SESSION_STR_CODE").val()+"']").remove(); 
	}
	*/
	getCommonCodeSelectBoxList("P_TAX_GB", "TAX_GB");
	
	
	//달력설정
	$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_SALE_DT").val(date);
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 150 );
	
	$(window).on('resize',function (){	
		
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 150 );
		
	});		
	
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData(true);
	});
	
	// 마감생성 버튼 클릭
	$("#btn_update3").click(function() {
		updatePosClosedDouzoneDay();
	});
	
	// 전송 버튼 클릭
	$("#btn_update1").click(function() {
		saveBillPdf();
	});
	
});



// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars);

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
		<DataGrid id="dg1" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="60" visible="false"/>\
				<DataGridColumn dataField="SEQ" headerText="순번"  textAlign="center" sortable="false" width="60" />\
				<DataGridColumn dataField="DRCR_FG" headerText="차대구분"  textAlign="center" sortable="false" />\
				<DataGridColumn dataField="" headerText="계정코드" textAlign="center" />\
				<DataGridColumn dataField="CUST_NAME" headerText="계정과목" textAlign="center" width="230" />\
				<DataGridColumn dataField="VEN_CODE" headerText="업체코드" textAlign="center" />\
				<DataGridColumn dataField="VEN_NAME" headerText="협력업체" textAlign="center" />\
				<DataGridColumn dataField="BUSI_NO" headerText="사업자번호" textAlign="center" labelJsFunction="rMateLabelBusiFunc" />\
				<DataGridColumn dataField="SALE_AMT" headerText="금액" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="RMK_DC" headerText="적요" textAlign="right" />\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SALE_DT"  headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData(isHeadDefault) {
	var param = $("#frm").serializeAllObject();
	
	/*
	20180410-조현석: 소스확인하다보니 이렇게 개발되있어서 일단 사용자 사고 방지로 이렇게 처리해놓음.
	이후 확인 후 소스 수정 해야 합니다.
	 */
	alert("이 기능은 현재 사용하실 수 없습니다.\n관리자에게 문의주세요."); return false;
	
	
	if(isHeadDefault == true)
	{
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberSendEmailDouzoneList.do",
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


//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	 /*
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUS_NAME").val() != null && $("#P_CUS_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUS_NAME").val());
		btn_comm_search('1');
	}
	*/
}
//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow){

}

//ai레포트 pdf 다운로드
function saveBillPdf(){
	
//	var P_CORP_CODE	= $("#P_CORP_CODE").val();;
//	var P_STR_CODE		= dataRow1.STR_CODE;
//	var P_CUST_NO		= dataRow1.CUST_NO;
//	var P_YYYYMM		= dataRow1.YYYYMM;
//	var P_SEQ				= dataRow1.SEQ;
//	var P_TAX_GB			= dataRow1.TAX_GB;
//	//	파일이름
//	var tax_no				= dataRow1.TAX_NO;
//	var file_path			= P_STR_CODE+"_"+P_CUST_NO+"_"+tax_no+".pdf";
//	
	/*
	 * 위에는 필요한 파라미터와 파일이름 생성하는데 필요한 값들
	 * 아래는 ai레포트 필요한 속성,파라미터
	 * pdfsavename:절대경로/파일이름.pdf  로 경로 지정가능 
	 * pdfsavename:/파일이름.pdf 경우 C:밑에 파일이름.pdf 생성 
	 * 지정안할시 webapp\resources\js\AIViewer56\temp\ 밑에 생성 
	 */
//	var params = "reportMode=PDF&reportParams=pdfserversave:true	" +
//			",pdfsavename:"  +file_path+
//	"&P_CORP_CODE="		+P_CORP_CODE+
//	"&P_STR_CODE="		+P_STR_CODE+
//	"&P_CUST_NO="			+P_CUST_NO+
//	"&P_YYYYMM="			+P_YYYYMM+
//	"&P_TAX_GB="			+P_TAX_GB+
//	"&P_SEQ="					+P_SEQ;
	
	/*
		20180410-조현석: 소스확인하다보니 이렇게 개발되있어서 일단 사용자 사고 방지로 이렇게 처리해놓음.
		이후 확인 후 소스 수정 해야 합니다.
	 */
	alert("이 기능은 현재 사용하실 수 없습니다.\n관리자에게 문의주세요."); return false;
	
	//테스트용 파라미터
	var params="?reportMode=PDF&reportParams=pdfserversave:true,pdfsavename:test.pdf&P_CORP_CODE=U1&P_STR_CODE=10015&P_YYYYMM=201703&P_TAX_GB=1&P_CUST_NO=006038&P_SEQ=1&clientURIEncoding=UTF-8";	
		
	jQuery.ajax({ 
	    url:"/aireportMemberBillPdfPrint.do"+params,
	    type:"GET",
		datatype:"json",
		success:function(data){
			alert(data);
			//성공시 크롬,익스는 저장된 경로를 반환
			//실패시 크롬,익스는 스샷 메일첨부했습니다.
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});


	 // AIViewer 파라미터
//	window.open("aireportMemberBillPdfPrint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no');
}
