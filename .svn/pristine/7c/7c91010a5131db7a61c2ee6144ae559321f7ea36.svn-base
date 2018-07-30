/********************************************************
 * 설명:  회원정보 > 멤버십관리 > 회원등급변경(일괄)
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.01.20
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
rMateGridH5.create("grid2", "gridHolder2", jsVars1, "100%");
rMateGridH5.create("grid3", "gridHolder3", jsVars1, "100%");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

// 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridApp2, gridRoot2, dataGrid2, dataRow2;
var gridApp3, gridRoot3, dataGrid3, dataRow3;
var collection1, collection2, collection2; // 그리드의 데이터 객체
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
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		gridApp1.setData(gridData);
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
	else if(id == "grid2")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp2.setLayout(layoutStr2);	// 데이터와 그리드를 포함하는 객체
		
		//최초 로딩시 그리드2 데이터 조회 및 그리드 데이터 셋팅
		gridApp2.setData(gridData);
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}
	else if(id == "grid3")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp3 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot3 = gridApp3.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp3.setLayout(layoutStr3);	// 데이터와 그리드를 포함하는 객체
		
		//최초 로딩시 그리드2 데이터 조회 및 그리드 데이터 셋팅
		gridApp3.setData(gridData);
		
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
}

function layoutCompleteHandler3() {
	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
	//그리드2 셀선택 이벤트
	dataGrid2.addEventListener("itemClick", itemClickHandler2);
}

//그리드3 컴플릿트 핸들러
function dataCompleteHandler3(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection3 = gridRoot3.getCollection();
	
	//그리드3 셀선택 이벤트
	//dataGrid3.addEventListener("itemClick", itemClickHandler3);
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler2(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot2.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid2.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
}

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F" />\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sum1CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048" colSpan="3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="3" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" verticalAlign="middle" autoHeight="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="UPTAE_FLAG_NAME" headerText="'+category+'" textAlign="center" width="40px" />\
				<DataGridColumn dataField="BUSI_FLAG_NAME" headerText="'+busiFlag+'" textAlign="center" />\
				<DataGridColumn dataField="MBR_GRADE_NAME" headerText="'+mbrGrade+'" textAlign="left" />\
				<DataGridColumn dataField="CUS_CNT" headerText="회원(명)" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="PERC" headerText="구성비(%)" textAlign="right" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IEMP_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IDATE" headerText="" textAlign="center" visible="false" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="UPTAE_FLAG_NAME">\
								<SpanSummaryRow label="'+subTotal+'" labelDataField="UPTAE_FLAG_NAME" rowAttribute="{sumRowAttr}" cellAttribute="{sum1CellAttr}">\
		                        <SpanSummaryField dataField="CUS_CNT" summaryOperation="SUM" />\
		                    </SpanSummaryRow>\
						</SpanMergingField>\
						<SpanMergingField name="BUSI_FLAG_NAME"/>\
					</mergingFields>\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="UPTAE_FLAG_NAME" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
				            <SpanSummaryField dataField="CUS_CNT" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

//그리드2 헤더 및 레이아웃
var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" verticalAlign="middle" autoHeight="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="UPTAE_FLAG_NAME" headerText="'+category+'" textAlign="center" />\
				<DataGridColumn dataField="BUSI_FLAG_NAME" headerText="'+busiFlag+'" textAlign="center" />\
				<DataGridColumn dataField="MBR_GRADE_NAME" headerText="'+mbrGrade+'" textAlign="center" />\
				<DataGridColumn dataField="BASE_MIN_AMT" headerText="'+baseMinAmt+'" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="BASE_MAX_AMT" headerText="'+baseMaxAmt+'" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IEMP_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IDATE" headerText="" textAlign="center" visible="false" />\
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

//그리드3 헤더 및 레이아웃
var layoutStr3 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F" />\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sum1CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048" colSpan="3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="3" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" verticalAlign="middle" autoHeight="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="UPTAE_FLAG_NAME" headerText="'+category+'" textAlign="center" />\
				<DataGridColumn dataField="BUSI_FLAG_NAME" headerText="'+busiFlag+'" textAlign="center" />\
				<DataGridColumn dataField="MBR_GRADE_NAME" headerText="'+mbrGrade+'" textAlign="left" />\
				<DataGridColumn dataField="CUS_CNT" headerText="회원(명)" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="PERC" headerText="회원(%)" textAlign="right" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IEMP_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IDATE" headerText="" textAlign="center" visible="false" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="UPTAE_FLAG_NAME">\
								<SpanSummaryRow label="'+subTotal+'" labelDataField="UPTAE_FLAG_NAME" rowAttribute="{sumRowAttr}" cellAttribute="{sum1CellAttr}">\
		                        <SpanSummaryField dataField="CUS_CNT" summaryOperation="SUM" />\
		                    </SpanSummaryRow>\
						</SpanMergingField>\
						<SpanMergingField name="BUSI_FLAG_NAME"/>\
					</mergingFields>\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="UPTAE_FLAG_NAME" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
				            <SpanSummaryField dataField="CUS_CNT" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';
//----------------------- 그리드 설정 끝 -----------------------

// 회원등급현황 및 등급기준 조회
function getGridData() {
	
	var param = $("#sertch_frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberGradeBatchDetail.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid1.setEnabled(false);
			gridRoot1.addLoadingBar();
			
			dataGrid2.setEnabled(false);
			gridRoot2.addLoadingBar();
		},
		success:function(data){
			if(typeof data.list != "undefiend" && data.list != null)
			{
				//그리드1 데이터 조회
				gridData = data.list;
				gridApp1.setData(gridData);
			}
			
			if(typeof data.list2 != "undefiend" && data.list2 != null)
			{
				//그리드1 데이터 조회
				gridData = data.list2;
				gridApp2.setData(gridData);
			}
	    },
	    complete : function(data) {
	    	dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
			
			dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
			
			dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
	    }
	});
}

// 미리보기 팝업
function setGridData() {
	
	if(gridData == null || gridData.length < 1 || gridData == "")
	{
		alert(msgSearchData);
		$("#btn_search").focus();
		return;
	}
	
	if($("#P_GONG_DT").val() == null || $("#P_GONG_DT").val() == "")
	{
		alert(startDay + msgConfirm);
		$("#P_GONG_DT").focus();
		return;
	}
	
	if($("#P_END_DT").val() == null || $("#P_END_DT").val() == "")
	{
		alert(stopDay + msgConfirm);
		$("#P_END_DT").focus();
		return;
	}
	
	var gongDt = $("#P_GONG_DT").val().replace(/-/g, "");
	var endDt = $("#P_END_DT").val().replace(/-/g, "");
	if(Number(gongDt) > Number(endDt))
	{
		alert(msgDateValidation);
		$("#P_GONG_DT").focus();
		return;
	}
	
	var param = $("#preview_frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberGradeBatchPreview.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		success:function(data){
			if(typeof data.list != "undefiend" && data.list != null)
			{
				//그리드1 데이터 조회
				gridData = data.list;
				gridApp3.setData(gridData);
				$("#pop_wrap").dialog("open");
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 등록 수정
function updateMemberGradeBatch()
{
	var gongDt = $("#P_GONG_DT").val();
	var endDt = $("#P_END_DT").val();
	
	if(confirm(gongDt + " ~ " + endDt +" 기간의 매출기준으로 회원등급 일괄 변경 하시겠습니까?") == false)
	{
		return;
	}
	//return;
	
	var param = $("#preview_frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updateMemberGradeBatch.do",
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
					getGridData();
					btn_close();
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
	}
	else	// 수정
	{
		$("#P_TYPE").val("update");
	}
}

//팝업 닫기
function btn_close(){
	$("#pop_wrap").dialog( "close" );
}

$(document).ready(function () {
	
	//최초 도움말 불러오기
	setHelpMessage($(location).attr("pathname").replace("/",""));
	
	$("#pop_wrap").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 750,
	    resizable : false,
	    position : "center",
	    open: function(){
	    	$("body").css("overflow-y", "hidden");
	    },
	    close: function(){
	    	$("body").css("overflow-y", "scroll");
	    }
	});
	
	//달력설정
	//$(".datepicker1").datepicker();
	//$(".datepicker2").datepicker();
	
	var beforeDate = new CommDateManager().before(0, 6, 0).getDate("yyyy-mm-dd"); // 일주일전 before(년,월,일)
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	
	$("#P_CHANGE_DT").val(date);
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
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		getGridData();
	});
	
	// 미리보기 버튼 클릭
	$("#btn_preview").click(function() {
		setGridData();
	});
	
	// 저장 버튼 클릭
	$("#pop_btn_save").click(function() {
		updateMemberGradeBatch();
	});
	
	$(".box_lft").width(($(window).width()-81)/2);
	$(".box_rgt").width(($(window).width()-81)/2);
	$(".box_rgt").css({marginLeft:$(".box_lft").width()+15});
	
	$(window).on('resize',function  () {
		$(".box_lft").width(($(window).width()-81)/2);
		$(".box_rgt").width(($(window).width()-81)/2);
		$(".box_rgt").css({marginLeft:$(".box_lft").width()+15});
	});
});