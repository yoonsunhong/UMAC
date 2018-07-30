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
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
//rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "526px");
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");
rMateGridH5.create("grid2", "gridHolder2", jsVars2, "100%");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, selectorColumn2, collection2;
var collection1; // 그리드의 데이터 객체
var src1;
var gridData = [];
var gridData2 = [];

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
	//rMateSortHeadInit(dataGrid1);
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
	//dataGrid1.addEventListener("headerRelease", headerRelease1);
	//drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
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
	
	getGridDataDetail(dataRow1);
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

function gridReadyHandler2(id) {
	// rMateGrid 관련 객체
	gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp2.setLayout(layoutStr2);
	gridApp2.setData(gridData2);
	
	gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
	gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
}

function layoutCompleteHandler2() {
	
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
}

function dataCompleteHandler2(event) {
	
	// 그리드 객체
	dataGrid2 = gridRoot2.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
}


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_CODE"  headerText="STR_CODE" textAlign="center" visible="false" />\
				<DataGridColumn dataField="STR_NAME"     headerText="회계단위(점포명)" textAlign="center" width="120" />\
				<DataGridColumn dataField="PURCH_DT"       headerText="처리일자" textAlign="center" width="95" formatter="{datefmt}" />\
				<DataGridColumn dataField="No"  		 headerText="' + rowNumber + '"		itemRenderer="IndexNoItem" textAlign="center" width="50"/>\
				<DataGridColumn dataField="VEN_CODE"  		headerText="VEN_CODE" textAlign="center" visible="false" />\
				<DataGridColumn dataField="VEN_NAME"     	headerText="매입업체명" textAlign="left" width="150" />\
				<DataGridColumn dataField="LST_CONF_EMP_NO"  		headerText="LST_CONF_EMP_NO" textAlign="center" visible="false" />\
				<DataGridColumn dataField="LAST_CONF_EMP_NAME"     	headerText="회계승인자" textAlign="center" />\
				<DataGridColumn dataField="LST_CFM_DT"       headerText="회계승인일자" textAlign="center" width="120" formatter="{datefmt}" />\
				<DataGridColumn dataField="CONF_EMP_NO"  		headerText="CONF_EMP_NO" textAlign="center" visible="false" />\
				<DataGridColumn dataField="CONF_EMP_NAME"     	headerText="담당승인자" textAlign="center" />\
				<DataGridColumn dataField="CONF_DT"       headerText="담당승인일자" textAlign="center" width="120" formatter="{datefmt}" />\
				<DataGridColumn dataField="TAX_GB"  		headerText="TAX_GB" textAlign="center" visible="false" />\
				<DataGridColumn dataField="TAX_GB_NAME"     	headerText="과세구분" textAlign="center" width="80" />\
				<DataGridColumn dataField="DRCR_FG_AMT1"  headerText="차변" textAlign="right"  formatter="{numfmt}" id="col13" />\
				<DataGridColumn dataField="DRCR_FG_AMT2"  headerText="대변" textAlign="right"  formatter="{numfmt}" id="col14" />\
			</groupedColumns>\
			<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{col13}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{col14}" formatter="{numfmt}" textAlign="right" />\
			</DataGridFooter>\
		</footers>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg2" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="SEQ"  		 headerText="' + rowNumber + '"		itemRenderer="IndexNoItem" textAlign="center" width="50"/>\
				<DataGridColumn dataField="DRCR_FG"  headerText="DRCR_FG" textAlign="center" visible="false" />\
				<DataGridColumn dataField="DRCR_FG_NAME"     headerText="구분" textAlign="center" width="80" />\
				<DataGridColumn dataField="ACCT_CD"     headerText="코드" textAlign="center" width="80" />\
				<DataGridColumn dataField="ACCT_NAME"     headerText="계정과목" textAlign="left" width="120" />\
				<DataGridColumn dataField="SALE_AMT"  headerText="금액" textAlign="right"  formatter="{numfmt}" />\
				<DataGridColumn dataField="RMK_DC"     headerText="적요" textAlign="left" />\
				<DataGridColumn dataField="ATTR_CD"     headerText="증빙" textAlign="center" width="80" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData(isHeadDefault) {
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/selectPurchClosed.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {
			'P_STR_CODE' : $("#P_STR_CODE").val()
		,	'P_PUR_DT' : $("#P_PUR_DT").val()
		},
		beforeSend : function(){
			gridRoot2.removeAll();
			gridRoot1.addLoadingBar();
		},
		success:function(data){
			gridApp1.setData(data);
			//totalCnt = data.totalCount;
			//drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
	    },
	    complete : function(data) {
	    	//dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	//dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
	    }
	});
}

function getGridDataDetail(dataRow) {
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/selectPurchClosedDetail.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {
			'P_STR_CODE' : dataRow.STR_CODE
		,	'P_PUR_DT' : dataRow.PURCH_DT
		,	'P_VEN_CODE' : dataRow.VEN_CODE
		,	'P_TAX_GB' : dataRow.TAX_GB
		},
		beforeSend : function(){
			gridRoot2.addLoadingBar();
		},
		success:function(data){
			gridApp2.setData(data);
	    },
	    complete : function(data) {
			gridRoot2.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
			gridRoot2.removeLoadingBar();
	    }
	});
}


//확정전송
function updatePurchClosed()
{
	if($("#P_PUR_DT").val() == ""){
		alert("마감생성을 위해 매입월을 선택하세요.");
		return;
	}
	
	if(confirm("기존에 생성된 마감 내역이 존재한다면 재생성합니다. 계속 하시겠습니까? (단, 회계승인이 완료된 마감은 재생성 불가)") == false) return;
	
	var param = $("#frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updatePurchClosed.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE == 0)
				{
					getGridData(false);
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

function updatePurchClosedConf(){
	
	if($("#P_PUR_DT").val() == ""){
		alert("담당자 확정을 위해 매입월을 선택하세요.");
		return;
	}
	
	if(confirm("담당자 확정을 하시겠습니까?") == false) return;
	
	var param = $("#frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updatePurchClosedConf.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE == 0)
				{
					getGridData(false);
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

function insertPurchClosedDouzone(){
	var param = $("#frm").serializeAllObject();
	
	if($("#P_PUR_DT").val() == ""){
		alert("회계 승인을 위해 매입월을 선택하세요.");
		return;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	if(confirm("회계승인을 하시겠습니까?") == false) return;
	
	jQuery.ajax({ 
	    url:"/insertPurchClosedDouzone.do",
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
					getGridData(false);
					alert(msgSave);
					
					// oracle 에서 select하는 작업
			    	jQuery.ajax({
				    	    url:"/insertPurchClosedDouzoneSend.do",
				    	    type:"POST",
				    		datatype:"json",
				    		async:false,
				    		data: param,
				    		success:function(data){
				    			alert("회계서버 이관에 성공했습니다. "); 
				    	    },
				    	    complete : function(data) {
				    	    },
				    	    error : function(xhr, status, error) {
				    	    	alert("회계서버 이관 시 문제가 있습니다.\n관리자에게 문의하세요."); 
				    	    }
			    	});
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

function validateLstConf(){
	jQuery.ajax({ 
	    url:"/selectPurchClosed.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
			'P_STR_CODE' : $("#P_STR_CODE").val()
		,	'P_PUR_DT' : $("#P_PUR_DT").val()
		},
		beforeSend : function(){
		},
		success:function(data){
			if(data.length > 0){
				if(data[0].LST_CFM_DT != "" && data[0].LST_CFM_DT != null && data[0].LST_CFM_DT != undefined){
					alert("해당 입금내역은 회계승인이 완료되어 마감생성이 불가능합니다.");
					return;
				}else{
					updatePurchClosed();
				} 
			}else{
				updatePurchClosed();
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	return false;
	    }
	});
}

function validateLstConf2(){
	jQuery.ajax({ 
	    url:"/selectPurchClosed.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
			'P_STR_CODE' : $("#P_STR_CODE").val()
		,	'P_PUR_DT' : $("#P_PUR_DT").val()
		},
		beforeSend : function(){
		},
		success:function(data){
			if(data.length > 0){
				if(data[0].LST_CFM_DT != "" && data[0].LST_CFM_DT != null && data[0].LST_CFM_DT != undefined){
					alert("해당 입금내역은 회계승인이 완료되어 담당자승인이 불가능합니다.");
					return;
				}else{
					updatePurchClosedConf();
				} 
			}else{
				updatePurchClosedConf();
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	return false;
	    }
	});
}

$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	datePickerYearMonth();
	
	var firstDate = new CommDateManager().getDate("yyyy-mm");
	$("#P_PUR_DT").val(firstDate);
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	getCommonCodeSelectBoxList("P_TAX_GB", "TAX_GB");
	//$("select[id='P_STR_CODE']").val(SSSC).prop("selected", true); // 회원의 점포 선택

//	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
//	$("#P_SALE_DT").val(nowDateYm);
//	datePickerYearMonth();
	
	
	
	getCommonCodeSelectBoxList("P_PUR_GB",   "PUR_GB");    //	공제코드
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData(true);
	});
	
	// 확정/전송 버튼 클릭
	$("#btn_update").click(function() {
		//updatePurchClosed();
		validateLstConf();
	});
	
	// 확정/전송 버튼 클릭
	$("#btn_update2").click(function() {
		//updatePurchClosedConf();
		validateLstConf2();
	});
	
	// 확정/전송 버튼 클릭
	$("#btn_update3").click(function() {
		insertPurchClosedDouzone();
	});
	
/*	$("#gridHolder1").height($(window).height()-169); // -169

	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-169); // -169
	});*/
	
	var wheight = ($(window).height()-159)/5;
	
	$("#gridHolder1").height(wheight*4); // -169
	$("#gridHolder2").height(wheight*1); // -169

	$(window).on('resize',function (){	
		var wheight = ($(window).height()-159)/5;
		
		$("#gridHolder1").height(wheight*4); // -169
		$("#gridHolder2").height(wheight*1); // -169
	});
});

