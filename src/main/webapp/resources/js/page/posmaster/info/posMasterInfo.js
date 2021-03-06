/********************************************************
 * 설명:  POS 마스터 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2016.12.19
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
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var collection; // 그리드의 데이터 객체
var gridData = [];
var totalCnt = 0;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
	
	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	gridApp1.setData(gridData);
	//getGridData();
	
	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection = gridRoot1.getCollection();
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
	
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
	
	$("#D_CORP_CODE").val(dataRow1.CORP_CODE);
	$("#D_STR_CODE").val(dataRow1.STR_CODE);
	$("#D_POS_NO").val(dataRow1.POS_NO);
	$("#D_POS_NAME").val(dataRow1.POS_NAME);
	$("#D_LOGO_NO").val(dataRow1.LOGO_NO);
	
	if(dataRow1.CREDIT_USE_YN == "Y")
		$("input:radio[name='D_CREDIT_USE_YN']:input[value='Y']").prop("checked", true);
	else if(dataRow1.CREDIT_USE_YN == "N")
		$("input:radio[name='D_CREDIT_USE_YN']:input[value='N']").prop("checked", true);
	
	if(dataRow1.RET_YN == "Y")
		$("input:radio[name='D_RET_YN']:input[value='Y']").attr("checked", true);
	else if(dataRow1.RET_YN == "N")
		$("input:radio[name='D_RET_YN']:input[value='N']").prop("checked", true);
	
	if(dataRow1.COD_YN == "Y")
		$("input:radio[name='D_COD_YN']:input[value='Y']").attr("checked", true);
	else if(dataRow1.COD_YN == "N")
		$("input:radio[name='D_COD_YN']:input[value='N']").attr("checked", true);
	
	if(dataRow1.PRC_CHG_YN == "Y")
		$("input:radio[name='D_PRC_CHG_YN']:input[value='Y']").attr("checked", true);
	else if(dataRow1.PRC_CHG_YN == "N")
		$("input:radio[name='D_PRC_CHG_YN']:input[value='N']").attr("checked", true);
	
	if(dataRow1.USE_YN == "Y")
		$("input:radio[name='D_USE_YN']:input[value='Y']").attr("checked", true);
	else if(dataRow1.USE_YN == "N")
		$("input:radio[name='D_USE_YN']:input[value='N']").attr("checked", true);
	
	$("#D_STR_CODE").removeAttr("disabled");
	$("#D_STR_CODE").trigger("change");// 초기 진입시 트리거로 강제 체인지 이벤트 발생
	$("#D_STR_CODE").attr("disabled", "disabled");
	$("#D_POS_NO").attr("readOnly", "readOnly");
	
	$("#pop_btn_save").attr("onclick", "updateDetail('update');");
	
	$("#pop_wrap").dialog("open");
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

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 	STR_NAME
var layoutStr1 =
	'<rMateGrid>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="60" />\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" />\
				<DataGridColumn dataField="POS_NO" headerText="'+posNumber+'" textAlign="center" />\
				<DataGridColumn dataField="POS_NAME" headerText="'+posName+'" textAlign="left" />\
				<DataGridColumn dataField="LOGO_NO"   headerText="'+guideNumber+'" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="CREDIT_USE_YN"   headerText="외상거래가능유무" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="RET_YN"   headerText="반품가능유무" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="COD_YN"   headerText="COD가능유무" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="PRC_CHG_YN"   headerText="단가변경유무" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="IDATE"   headerText="'+inputDate+'" textAlign="center" sortable="false" formatter="{datefmt}" />\
				<DataGridColumn dataField="UEMP_NM"   headerText="'+modifier+'" textAlign="left" sortable="false" />\
				<DataGridColumn dataField="UDATE"   headerText="'+modifiedDate+'" textAlign="center" sortable="false" formatter="{datefmt}"/>\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData(isHeadDefault) {
	
	if(isHeadDefault == true)
	{
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
	}
	
	var param = $("#frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/posMasterInfoList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid1.setEnabled(false);
			gridRoot1.addLoadingBar();
		},
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridData = data.list;
			gridApp1.setData(gridData);
			totalCnt = data.totalCount;
			
			//drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
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

//해당 점포의 POS 가져오기
function getPosList() {
	
	var html = "";
	
	if($("#P_STR_CODE").val() == "")
	{
		$("#P_POS_NO").html("<option value=\"\">" + all + "</option>");
		return;
	}
	
	var param = $("#frm").serializeArray();
	
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

//해당 점포의 안내문 번호
function getLogNoList() {
	
	var html = "";
	
	var param = $("#reg_frm").serializeArray();
	
	jQuery.ajax({
	    url:"/getLogNoList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			
			if(typeof data != "undefined" && data != null)
			{
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].LOGO_NO + "\">" + data[i].LOGO_NO + "</option>";
				}
				$("#D_LOGO_NO").html(html);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// POS마스터 수정
function updateDetail(flag) {
	
	if($("#D_STR_CODE").val() == null || $("#D_STR_CODE").val() == "")
	{
		alert(storNm + msgConfirm);
		$("#D_STR_CODE").focus();
		return;
	}
	
	if($("#D_POS_NO").val() == null || $("#D_POS_NO").val() == "")
	{
		alert(posNumber + msgConfirm);
		$("#D_POS_NO").focus();
		return;
	}
	
	if($("#D_POS_NAME").val() == null || $("#D_POS_NAME").val() == "")
	{
		alert(posName + msgConfirm);
		$("#D_POS_NAME").focus();
		return;
	}
	
	if($("#D_LOGO_NO").val() == null || $("#D_LOGO_NO").val() == "")
	{
		alert(guideNumber + msgConfirm);
		$("#D_LOGO_NO").focus();
		return;
	}
	
	$("#D_STR_CODE").removeAttr("disabled");
	
	$("#D_TYPE").val(flag);
	var param = $("#reg_frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updatePosMaster.do",         
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
					alert(data.RETURN_MSG);
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
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	
	// 점포코드 콤보 가져오기(팝업)
	getStoreCode("D_STR_CODE");
	
	//초기 팝업 사이즈 조절
	$(function() {
		$("#pop_wrap").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 500,
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
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData(true);
	});
	
	// 신규등록 버튼
	$("#btn_new").click(function(){
		
		$("#D_TYPE").val("insert");
		$("#D_CORP_CODE").val("");
		$("#D_STR_CODE").val("");
		$("#D_POS_NO").val("");
		$("#D_POS_NAME").val("");
		$("#D_LOGO_NO").val("");
		
		$("input:radio[name='D_CREDIT_USE_YN']:input[value='N']").attr("checked", true);
		$("input:radio[name='D_RET_YN']:input[value='N']").attr("checked", true);
		$("input:radio[name='D_COD_YN']:input[value='N']").attr("checked", true);
		$("input:radio[name='D_PRC_CHG_YN']:input[value='N']").attr("checked", true);
		$("input:radio[name='D_USE_YN']:input[value='Y']").attr("checked", true);
		
		$("#D_STR_CODE").removeAttr("disabled");
		$("#D_POS_NO").removeAttr("readOnly");
		$("#D_STR_CODE").trigger("change");		// 초기 진입시 트리거로 강제 체인지 이벤트 발생
		
		$("#pop_btn_save").attr("onclick", "updateDetail('insert');");
		
		$("#pop_wrap").dialog("open");
	});
	
	// 점포명 체인지 이벤트
	$("#P_STR_CODE").change(function(){
		getPosList();
	});
	
	// 점포명 체인지 이벤트(팝업)
	$("#D_STR_CODE").change(function(){
		getLogNoList();
	});
	
	
});

