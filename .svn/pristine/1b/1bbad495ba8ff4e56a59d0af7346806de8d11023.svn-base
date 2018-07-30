/********************************************************
 * 설명:  회원정보 > 멤버십관리 > 회원등급변경기준 관리
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");

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
	$("#P_MBR_GRADE").val(dataRow1.MBR_GRADE);
	$("#P_BASE_MIN_AMT").val(dataRow1.BASE_MIN_AMT);
	$("#P_BASE_MAX_AMT").val(dataRow1.BASE_MAX_AMT);
	$("#P_IDATE").val(dataRow1.IDATE_CHAR);
	$("#P_IEMP_NO").val(dataRow1.IEMP_NM);
	
	$("#pop_wrap").dialog("open");
}

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" verticalAlign="middle" autoHeight="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="UPTAE_FLAG_NAME" headerText="'+category+'" textAlign="center" />\
				<DataGridColumn dataField="BUSI_FLAG_NAME" headerText="'+busiFlag+'" textAlign="center" />\
				<DataGridColumn dataField="MBR_GRADE_NAME" headerText="'+mbrGrade+'" textAlign="center" />\
				<DataGridColumn dataField="BASE_MIN_AMT" headerText="'+baseMinAmt+'" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="BASE_MAX_AMT" headerText="'+baseMaxAmt+'" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="UPTAE_FLAG" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="BUSI_FLAG" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="MBR_GRADE" headerText="" textAlign="center" visible="false"/>\
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
	    url:"/memberGradeStandardList.do",         
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
function updateMemberGradeStandard()
{
	if($("#P_UPTAE_FLAG").val() == null || $("#P_UPTAE_FLAG").val() == "")
	{
		alert(category + msgConfirm);
		$("#P_UPTAE_FLAG").focus();
		return;
	}
	
	if($("#P_BUSI_FLAG").val() == null || $("#P_BUSI_FLAG").val() == "")
	{
		alert(busiFlag + msgConfirm);
		$("#P_BUSI_FLAG").focus();
		return;
	}
	
	if($("#P_MBR_GRADE").val() == null || $("#P_MBR_GRADE").val() == "")
	{
		alert(mbrGrade + msgConfirm);
		$("#P_MBR_GRADE").focus();
		return;
	}
	
	if($("#P_BASE_MIN_AMT").val() == null || $("#P_BASE_MIN_AMT").val() == "")
	{
		alert("최소기준값" + msgConfirm);
		$("#P_BASE_MIN_AMT").focus();
		return;
	}
	
	if($("#P_BASE_MIN_AMT").val() == null || $("#P_BASE_MIN_AMT").val() == "")
	{
		alert("최대기준값" + msgConfirm);
		$("#P_BASE_MIN_AMT").focus();
		return;
	}
	
	selectDisplay(0);	// selectbox disabled 해제
	var param = $("#reg_frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updateMemberGradeStandard.do",
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
		    width : 850,
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
	
	getCommonCodeSelectBoxList("P_MBR_GRADE", "MBR_GRADE");		// 회원등급
	
	$("#P_BASE_MIN_AMT").number(true, 0);
	$("#P_BASE_MAX_AMT").number(true, 0);
	
	// 신규등록 버튼
	$("#btn_new").click(function(){
		
		frmReset(0);
		
		$("#pop_wrap").dialog("open");
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		getGridData();
	});
	
	// 저장 버튼 클릭
	$("#btn_update").click(function() {
		updateMemberGradeStandard();
	});
	
	
});