/********************************************************
 * 설명:  회원정보 > 멤버십관리 > 포인트기준관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.01.18
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "400px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

// 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var collection1; // 그리드의 데이터 객체
var gridData = [];

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
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 셀선택 이벤트
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
	
	frmReset(1);
	$("#P_UPTAE_FLAG").val(dataRow1.UPTAE_FLAG);
	$("#P_BUSI_FLAG").val(dataRow1.BUSI_FLAG);
	getCommonCodeGradeSelectBoxList("P_MBR_GRADE", "MBR_GRADE", $("#P_BUSI_FLAG").val(), false);	// 회원등급
	$("#P_MBR_GRADE").val(dataRow1.MBR_GRADE);
	$("#P_DC_RATE").val(dataRow1.DC_RATE);
	$("#P_BASE_AMT").val(dataRow1.BASE_AMT);
	$("#P_MIN_USE_POINT").val(dataRow1.MIN_USE_POINT);
	$("#P_CASH_RATE").val(dataRow1.CASH_RATE);
	$("#P_CARD_RATE").val(dataRow1.CARD_RATE);
	$("#P_POINT_RATE").val(dataRow1.POINT_RATE);
	$("#P_CREDIT_RATE").val(dataRow1.CREDIT_RATE);
	$("#P_ETC_RATE").val(dataRow1.ETC_RATE);
	$("#P_IDATE").val(dataRow1.IDATE_CHAR);
	$("#P_IEMP_NO").val(dataRow1.IEMP_NM);
	
	$("#pop_wrap").dialog("open");
}

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<DataGrid id="dg1" verticalAlign="middle" >\
			<groupedColumns>\
				<DataGridColumn dataField="UPTAE_FLAG_NAME" headerText="'+category+'" textAlign="center" />\
				<DataGridColumn dataField="BUSI_FLAG_NAME" headerText="'+busiFlag+'" textAlign="center" />\
				<DataGridColumn dataField="MBR_GRADE_NAME" headerText="'+mbrGrade+'" textAlign="center" />\
				<DataGridColumn dataField="DC_RATE" headerText="회원할인율" textAlign="center" />\
				<DataGridColumn dataField="CASH_RATE" headerText="'+cashRate+'" textAlign="center" />\
				<DataGridColumn dataField="CARD_RATE" headerText="'+cardRate+'" textAlign="center" />\
				<DataGridColumn dataField="POINT_RATE" headerText="'+pointRate+'" textAlign="center" />\
				<DataGridColumn dataField="CREDIT_RATE" headerText="'+creditRate+'" textAlign="center" />\
				<DataGridColumn dataField="ETC_RATE" headerText="'+etcRate+'" textAlign="center" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="UPTAE_FLAG" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="BUSI_FLAG" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="MBR_GRADE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="MIN_USE_POINT" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IEMP_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IEMP_NM" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IDATE" headerText="" textAlign="center" visible="false" />\
				<DataGridColumn dataField="IDATE_CHAR" headerText="" textAlign="center" visible="false" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="UPTAE_FLAG_NAME"/>\
						<SpanMergingField name="BUSI_FLAG_NAME"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

//----------------------- 그리드 설정 끝 -----------------------

// 회원포인트 및 멤버십카드 조회
function getGridData() {
	
	var param = $("#sertch_frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberPointList.do",         
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

// 등록 수정
function updateMemberPoint()
{
	if($("#P_UPTAE_FLAG").val() == null || $("#P_UPTAE_FLAG").val() == "")
	{
		confirm(category + msgConfirm);
		$("#P_UPTAE_FLAG").focus();
		return;
	}
	
	if($("#P_BUSI_FLAG").val() == null || $("#P_BUSI_FLAG").val() == "")
	{
		confirm(busiFlag + msgConfirm);
		$("#P_BUSI_FLAG").focus();
		return;
	}
	
	if($("#P_MBR_GRADE").val() == null || $("#P_MBR_GRADE").val() == "")
	{
		confirm(mbrGrade + msgConfirm);
		$("#P_MBR_GRADE").focus();
		return;
	}
	
	if($("#P_DC_RATE").val() == null || $("#P_DC_RATE").val() == "")
	{
		confirm(memberDiscountRate + msgConfirm);
		$("#P_DC_RATE").focus();
		return;
	}
	
	if($("#P_BASE_AMT").val() == null || $("#P_BASE_AMT").val() == "")
	{
		confirm(referenceValue + msgConfirm);
		$("#P_BASE_AMT").focus();
		return;
	}
	
	if($("#P_MIN_USE_POINT").val() == null || $("#P_MIN_USE_POINT").val() == "")
	{
		confirm(availablePoints + msgConfirm);
		$("#P_MIN_USE_POINT").focus();
		return;
	}
	
	if($("#P_CASH_RATE").val() == null || $("#P_CASH_RATE").val() == "")
	{
		confirm(cashRate + msgConfirm);
		$("#P_CASH_RATE").focus();
		return;
	}
	
	if($("#P_CARD_RATE").val() == null || $("#P_CARD_RATE").val() == "")
	{
		confirm(cardRate + msgConfirm);
		$("#P_CARD_RATE").focus();
		return;
	}
	
	if($("#P_POINT_RATE").val() == null || $("#P_POINT_RATE").val() == "")
	{
		confirm(pointRate + msgConfirm);
		$("#P_POINT_RATE").focus();
		return;
	}
	
	if($("#P_CREDIT_RATE").val() == null || $("#P_CREDIT_RATE").val() == "")
	{
		confirm(creditRate + msgConfirm);
		$("#P_CREDIT_RATE").focus();
		return;
	}
	
	if($("#P_ETC_RATE").val() == null || $("#P_ETC_RATE").val() == "")
	{
		confirm(etcRate + msgConfirm);
		$("#P_ETC_RATE").focus();
		return;
	}
	
	selectDisplay(0);	// selectbox disabled 해제
	var param = $("#reg_frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updateMemberPoint.do",
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
					getGridData();
				}
				else
				{
					alert(data.RETURN_MSG);
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
	selectDisplay(1);	// selectbox disabled
}

//팝업 닫기
function btn_close(){
	$("#pop_wrap").dialog("close");
}

// form 초기화
function frmReset(type)
{
	$("#reg_frm").each(function() {
		this.reset();
	});
	
	if(type == 0)	// 신규
	{
		$("#P_TYPE").val("insert");
		selectDisplay(0);
	}
	else	// 수정
	{
		$("#P_TYPE").val("update");
		selectDisplay(1);
	}
	
	$("#P_BASE_AMT").val(0);
	$("#P_MIN_USE_POINT").val(2000);
	$("#P_DC_RATE").val(0);		// 할인율
	$("#P_CASH_RATE").val(0);	// 현금적립율
	$("#P_CARD_RATE").val(0);	// 신용카드적립율
	$("#P_POINT_RATE").val(0);	// 포인트적립율
	$("#P_CREDIT_RATE").val(0);	// 외상적립율
	$("#P_ETC_RATE").val(0);	// 기타적립율
}

// 셀렉트박스 disabled 추가삭제
function selectDisplay(type)
{
	if(type == 0)	// disabled
	{
		$("#P_UPTAE_FLAG").removeAttr("disabled");
		$("#P_BUSI_FLAG").removeAttr("disabled");
		$("#P_MBR_GRADE").removeAttr("disabled");
	}
	else	// unDisabled
	{
		$("#P_UPTAE_FLAG").attr("disabled", "disabled");
		$("#P_BUSI_FLAG").attr("disabled", "disabled");
		$("#P_MBR_GRADE").attr("disabled", "disabled");
	}
}

$(document).ready(function () {
	
	//최초 도움말 불러오기
	setHelpMessage($(location).attr("pathname").replace("/",""));
	
	//초기 팝업 사이즈 조절
	$(function() {
		$("#pop_wrap").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 800,
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
	
	getCommonCodeSelectBoxList("P_UPTAE_FLAG", "UPTAE_FLAG");	// 업태구분
	
	getCommonCodeSelectBoxList("P_BUSI_FLAG", "BUSI_FLAG");		// 회원구분
	
	//getCommonCodeSelectBoxList("P_MBR_GRADE", "MBR_GRADE");		// 회원등급
	//getCommonCodeGradeSelectBoxList("P_MBR_GRADE", "MBR_GRADE", $("#P_BUSI_FLAG").val(), false);	// 회원등급
	
	$("#P_BASE_AMT").number(true, 0);
	$("#P_MIN_USE_POINT").number(true, 0);
	
	$("#P_DC_RATE").number(true, 1);	// 할인율
	$("#P_CASH_RATE").number(true, 1);	// 현금적립율
	$("#P_CARD_RATE").number(true, 1);	// 신용카드적립율
	$("#P_POINT_RATE").number(true, 1);	// 포인트적립율
	$("#P_CREDIT_RATE").number(true, 1);	// 외상적립율
	$("#P_ETC_RATE").number(true, 1);	// 기타적립율
	
	// 신규등록 버튼
	$("#btn_new").click(function(){
		
		frmReset(0);
		getCommonCodeGradeSelectBoxList("P_MBR_GRADE", "MBR_GRADE", $("#P_BUSI_FLAG").val(), false);	// 회원등급
		$("#pop_wrap").dialog("open");
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		getGridData();
	});
	
	// 저장 버튼 클릭
	$("#btn_update").click(function() {
		updateMemberPoint();
	});
	
	// 회원구분 체인지 이벤트 (회원구분 변경시 회원등급 리스트 재조회)
	$("#P_BUSI_FLAG").change(function() {
		getCommonCodeGradeSelectBoxList("P_MBR_GRADE", "MBR_GRADE", $("#P_BUSI_FLAG").val(), false);	// 회원등급
	});
	
});