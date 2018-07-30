/********************************************************
 * 설명:  영업정보 > POS정산 > POS영수증조회
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.03.21
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
var collection1, collection2; // 그리드의 데이터 객체
var gridData = [];
var totalCnt = 0;	// 전체건수
var RowsPerPage = 25;// 1페이지에서 보여줄 행 수
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
	//collection1 = gridRoot1.getCollection();
	
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
	
	$("#receipt_content").text(dataRow1.RECEIPT);
	
	$("#pop_wrap").dialog("open");
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
				<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="60" />\
				<DataGridColumn dataField="POS_NAME" headerText="'+pos+'"  textAlign="center" />\
				<DataGridColumn dataField="TRXN_NO" headerText="거래번호" textAlign="center" />\
				<DataGridColumn dataField="CANC_NM" headerText="매출구분" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="POS_TIMES" headerText="판매시간" textAlign="center" />\
				<DataGridColumn dataField="TRXN_NO_OLD" headerText="원거래번호" textAlign="center" />\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SALE_DT"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="POS_NO"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SEQ"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="JURNAL"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="RECEIPT"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="GRE_TYPE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CANC_FLAG"  headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData(isHeadDefault, isFirstPage) {
	var param = $("#frm").serializeAllObject();
	
	if(isHeadDefault == true) {
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
	}
	
	if($("#P_TRXN_NO_S").val() != "" && $("#P_TRXN_NO_E").val() != "") {
		if($("#P_POS_NO").val() == "")
		{
			alert("거래번호 조회시 POS 를 선택해주세요.");
			$("#P_POS_NO").focus();
			return;
		}
	}
	
	if(isFirstPage) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/posClosedReceiptList.do",
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

// 해당 점포의 POS 가져오기
function getPosList() {
	
	var html = "";
	
	if($("#P_STR_CODE").val() == "")
	{
		$("#P_POS_NO").html("<option value=\"\">" + all + "</option>");
		return;
	}
	
	var param = $("#frm").serializeAllObject();
	
	jQuery.ajax({ 
	    url:"/getPosList.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			if(typeof data != "undefined" && data != null)
			{
				html += "<option value=\"\">" + all + "</option>";
				
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].POS_NO + "\">" + data[i].POS_NAME + "</option>";
				}
				
				$("#P_POS_NO").html(html);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 회원검색 팝업 호출 function
function btn_comm_user_search()
{
	$("#comm_pop_wrap1").dialog("open");
	gridApp10.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM1").val("fn_comm_user_callback(dataRow10)");
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUST_NAME").val());
		btn_comm_search('1');
	}
}

// 회원검색 팝업 callback function
function fn_comm_user_callback(dataRow)
{
	$("#P_CUST_NAME").val(dataRow.CUST_NAME);	// 회원명
	$("#P_CUST_ID" ).val(dataRow.CUST_NO);		// 회원번호
}

//팝업 닫기
function btn_close(){
	$("#pop_wrap").dialog( "close" );
}

//팝업 영수증출력
function btn_print(){
	var P_CORP_CODE = dataRow1.CORP_CODE;
	var P_SALE_DT = dataRow1.SALE_DT;
	var P_STR_CODE = dataRow1.STR_CODE;
	var P_TRXN_NO = dataRow1.TRXN_NO;
	var P_POS_NO = dataRow1.POS_NO;
	
	var params = "?reportMode=HTML"	+
	"&P_CORP_CODE="		+P_CORP_CODE+
	"&P_STR_CODE="		+P_STR_CODE+
	"&P_SALE_DT="			+P_SALE_DT+
	"&P_TRXN_NO="			+P_TRXN_NO+
	"&P_POS_NO="			+P_POS_NO;
	 // AIViewer 파라미터
	window.open("aireportPosClosedReceiptPrint.do" + params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
}

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
	$("#P_STR_CODE").val($("#SESSION_STR_CODE").val());
	
	//달력설정
	$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_SALE_DT").val(date);
	
	// 숫자만 입력 처리
	try {
		
		CommonJs.addInputHandler({input:$("#P_TRXN_NO_S"), dataType:"N", maxlength:"6"});
		CommonJs.addInputHandler({input:$("#P_TRXN_NO_E"), dataType:"N", maxlength:"6"});
		
    } catch(e) {
    	console.log(e);
    }
    
	// 점포명 체인지 이벤트
	$("#P_STR_CODE").change(function(){
		getPosList();
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData(true, true);
	});
	
	//팝업 영수증 출력
	$("#btn_print").click(function(){
		btn_print();
	});
	
	$("#P_STR_CODE").trigger("change");
	
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
				$("#P_STR_CODE").attr("disabled", false);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
	 
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 150 );

	$(window).on('resize',function (){
		$("#gridHolder1").width("100%");
		$("#gridHolder1").height( $(window).height() - 150 );
	});
});
