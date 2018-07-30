/********************************************************
 * 설명:  영업정보 > POS정산 > POS시재등록
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.03.15
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "220px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var collection; // 그리드의 데이터 객체
var gridData = [];
var check_amt = 0;	// 수표 합계 
var gift_amt = 0;	// 기타 합계
var cash_amt = 0;	// 현금 합계
var posSum_amt = 0;	// pos정산 합계

//로그인한 사용자의 추가정보 조회
var sessionOrgType = "";
var sessionOrgName = "";
var sessionStrCode = "";
var sessionGroupCode = "";

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	gridApp1.setData(gridData);
	
	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	//collection = gridRoot1.getCollection();
	
	// 그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	checkData();
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
	
	if(typeof dataRow1.POS_NO == "undefiend" || dataRow1.POS_NO == null || dataRow1.POS_NO == "")
	{
		return;
	}
	
	// 수정모드 값 셋팅
	$("#P_TYPE").val(dataRow1.P_TYPE);
	
	$("#T_STR_CODE").removeAttr("disabled");
	$("#T_POS_NO").removeAttr("disabled");
	$("#T_EMP_NO").removeAttr("disabled");
	$("#T_SALE_DT").datepicker().prop("readonly", false);	// 영업일자는 활성
	
	$("#T_STR_CODE").val(dataRow1.STR_CODE);
	$("#T_STR_CODE").trigger("change");
	$("#T_SALE_DT").val(CommonJs.dateFormat(dataRow1.SALE_DT, "-"));
	$("#T_POS_NO").val(dataRow1.POS_NO);
	$("#T_EMP_NO").val(dataRow1.EMP_NO);
	
	$("#P_STR_CODE").val(dataRow1.STR_CODE);
	$("#P_SALE_DT").val(CommonJs.dateFormat(dataRow1.SALE_DT, "-"));
	$("#P_POS_NO").val(dataRow1.POS_NO);
	$("#P_EMP_NO").val(dataRow1.EMP_NO);
	
	$("#T_STR_CODE").attr("disabled", "disabled");
	$("#T_POS_NO").attr("disabled", "disabled");
	$("#T_EMP_NO").attr("disabled", "disabled");
	$("#T_SALE_DT").datepicker("destroy").prop("readonly", true);	// 영업일자는 비활성
	
	getPosClosed();		// 위에 selectbox disabled 해제 후 재조회
	
	
	$("#P_CHECK_10").val(dataRow1.CHECK_10);
	$("#P_CHECK_10").trigger("onblur");
	$("#P_CHECK_30").val(dataRow1.CHECK_30);
	$("#P_CHECK_30").trigger("onblur");
	$("#P_CHECK_50").val(dataRow1.CHECK_50);
	$("#P_CHECK_50").trigger("onblur");
	$("#P_CHECK_100").val(dataRow1.CHECK_100);
	$("#P_CHECK_100").trigger("onblur");
	$("#P_CHECK_QTY_ETC").val(dataRow1.CHECK_QTY_ETC);
	$("#P_CHECK_QTY_ETC").trigger("onblur");
	$("#P_CHECK_AMT_ETC").val(CommonJs.numberFormat(dataRow1.CHECK_AMT_ETC));
	$("#P_CHECK_AMT_ETC").trigger("onblur");
	$("#P_CASH_50000").val(dataRow1.CASH_50000);
	$("#P_CASH_50000").trigger("onblur");
	$("#P_CASH_10000").val(dataRow1.CASH_10000);
	$("#P_CASH_10000").trigger("onblur");
	$("#P_CASH_5000").val(dataRow1.CASH_5000);
	$("#P_CASH_5000").trigger("onblur");
	$("#P_CASH_1000").val(dataRow1.CASH_1000);
	$("#P_CASH_1000").trigger("onblur");
	$("#P_CASH_500").val(dataRow1.CASH_500);
	$("#P_CASH_500").trigger("onblur");
	$("#P_CASH_100").val(dataRow1.CASH_100);
	$("#P_CASH_100").trigger("onblur");
	$("#P_CASH_50").val(dataRow1.CASH_50);
	$("#P_CASH_50").trigger("onblur");
	$("#P_CASH_10").val(dataRow1.CASH_10);
	$("#P_CASH_10").trigger("onblur");
	$("#P_GIFT_QTY1").val(dataRow1.GIFT_QTY1);
	$("#P_GIFT_QTY1").trigger("onblur");
	$("#P_GIFT_AMT1").val(CommonJs.numberFormat(dataRow1.GIFT_AMT1));
	$("#P_GIFT_AMT1").trigger("onblur");
	$("#P_GIFT_AMT_ETC").val(CommonJs.numberFormat(dataRow1.GIFT_AMT_ETC));
	$("#P_GIFT_AMT_ETC").trigger("onblur");
	
	fn_cashOver();
	//$("#P_CASH_SHORT_OVER").val(dataRow1.CASH_SHORT_OVER);
	//$("#P_CASH_SHORT_OVER_TXT").text(dataRow1.CASH_SHORT_OVER);
	
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="2" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" verticalAlign="middle" >\
			<groupedColumns>\
				<DataGridColumn dataField="POS_NAME" headerText="'+pos+'"  textAlign="center" />\
				<DataGridColumn dataField="EMP_NAME" headerText="계산원" textAlign="center" />\
				<DataGridColumn dataField="CREDIT_AMT"   headerText="외상매출" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="SUM_CHECK" headerText="수표" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="SUM_CASH"   headerText="현금" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="SUM_GIFT"   headerText="기타" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="DPOT_AMT"   headerText="입금소계" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="CASH_SUM_AMT"   headerText="POS정산소계" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="CASH_SHORT_OVER"   headerText="현금과부족" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="POS_NO"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="EMP_NO"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CHECK_10"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CHECK_30"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CHECK_50"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CHECK_100"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CHECK_QTY_ETC"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CHECK_AMT_ETC"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CASH_50000"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CASH_10000"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CASH_5000"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CASH_1000"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CASH_500"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CASH_100"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CASH_50"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CASH_10"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="GIFT_QTY1"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="GIFT_AMT1"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="GIFT_QTY2"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="GIFT_AMT2"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="GIFT_QTY_ETC"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="GIFT_AMT_ETC"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="P_TYPE"  headerText="" textAlign="center" visible="false" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<summaries>\
						<SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="POS_NAME" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
							<SpanSummaryField dataField="CREDIT_AMT" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="SUM_CHECK" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="SUM_CASH" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="SUM_GIFT" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="DPOT_AMT" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="CASH_SUM_AMT" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="CASH_SHORT_OVER" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

/*
 * *엑셀업로드시 유효성체크에 걸린 row 체크하여 색갈칠하기
 * POS시재등록을 하지 않은 계산원은 분홍색으로 표시 된다.
 * POS마감 정산시 POS시재 등록한 계산원들의 현금과부족만 반영하여, 마감집계 처리한다.
 */

function checkData(){
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	var dataCnt = collection1.getLength();
	
	for (var i = 0; i < dataCnt; i++) {
		var VALID_YN = gridRoot1.getItemFieldAt( i , "P_TYPE");	
		if(VALID_YN =="N"){
			 collection1.addRowAttributeDetailAt(i , "", "#ffccff", "", false, '');
			 //alert(rowData.SCAN_CODE);
		}
	};
}



//목록 그리드 조회
function getGridData() {
	
	//var param = $("#frm").serializeArray();
	var param = $("#frm").serializeAllObject();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/posClosedCashList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			if(dataGrid1 != undefined){
				dataGrid1.setEnabled(false);
				gridRoot1.addLoadingBar();
			}
		},
		success:function(data){
			if(dataGrid1 != undefined){
				gridData = data.list;
				gridApp1.setData(gridData);
				
				frmReset();
			}
	    },
	    complete : function(data) {
	    	if(dataGrid1 != undefined){
	    		dataGrid1.setEnabled(true);
				gridRoot1.removeLoadingBar();
	    	}
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
	    }
	});
	
}

// 해당 점포의 POS 가져오기
function getPosList(type) {
	
	var html = "";
	
	if(type == "S" && $("#S_STR_CODE").val() == "")
	{
		$("#S_POS_NO").html("<option value=\"\">" + all + "</option>");
		return;
	}
	else if(type == "P" && $("#T_STR_CODE").val() == "")
	{
		$("#T_POS_NO").html("<option value=\"\">" + all + "</option>");
		return;
	}
	
	//var param = $("#frm").serializeArray();
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
				//S : 상단 검색 전포, P: 하단 검색 점포  
				if(type == "S")
				{
					html += "<option value=\"\">" + all + "</option>";
				}else{
					html += "<option value=\"\">" + select + "</option>";
				}
				
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].POS_NO + "\">" + data[i].POS_NAME + "</option>";
				}
				
				if(type == "S")
				{
					$("#S_POS_NO").html(html);
				}
				else if(type == "P")
				{
					$("#T_POS_NO").html(html);
				}
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// POS정산 정보 가져오기
function getPosClosed()
{
	//var param = $("#frm").serializeArray();
	var param = $("#frm").serializeAllObject();
	
	jQuery.ajax({ 
	    url:"/posClosedCash2.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			
			if(typeof data.list != "undefined" && data.list != null)
			{
				var list = data.list;
				if(list.length > 0)
				{
					$("#D_CREDIT_CNT").text(CommonJs.numberFormat(CommonJs.isNullToString(list[0].CREDIT_CNT, 0)));
					$("#D_CREDIT_AMT").text(CommonJs.numberFormat(CommonJs.isNullToString(list[0].CREDIT_AMT, 0)));
					$("#D_POS_CASH_AMT").text(CommonJs.numberFormat(CommonJs.isNullToString(list[0].CASH_AMT, 0)));
					$("#D_SALE_BOT_AMT").text(CommonJs.numberFormat(CommonJs.isNullToString(list[0].SALE_BOT_AMT, 0)));
					$("#D_SALE_BOT_CNT").text(CommonJs.numberFormat(CommonJs.isNullToString(list[0].SALE_BOT_CNT, 0)));
					$("#D_RES_FUND_AMT").text(CommonJs.numberFormat(CommonJs.isNullToString(list[0].RES_FUND_AMT, 0)));
					$("#D_MID_CASH_AMT").text(CommonJs.numberFormat(CommonJs.isNullToString(list[0].MID_CASH_AMT, 0)));
					$("#D_POS_AMT").text(CommonJs.numberFormat(CommonJs.isNullToString(list[0].CASH_SUM_AMT, 0)));
					posSum_amt = CommonJs.isNullToString(list[0].CASH_SUM_AMT, 0);
				}
				else
				{
					$("#D_CREDIT_CNT").text("0");
					$("#D_CREDIT_AMT").text("0");
					$("#D_POS_CASH_AMT").text("0");
					$("#D_SALE_BOT_AMT").text("0");
					$("#D_SALE_BOT_CNT").text("0");
					$("#D_RES_FUND_AMT").text("0");
					$("#D_MID_CASH_AMT").text("0");
					$("#D_POS_AMT").text("0");
					posSum_amt = 0;
				}
			}
			else
			{
				$("#D_CREDIT_CNT").text("0");
				$("#D_CREDIT_AMT").text("0");
				$("#D_POS_CASH_AMT").text("0");
				$("#D_SALE_BOT_AMT").text("0");
				$("#D_SALE_BOT_CNT").text("0");
				$("#D_RES_FUND_AMT").text("0");
				$("#D_MID_CASH_AMT").text("0");
				$("#D_POS_AMT").text("0");
				posSum_amt = 0;
			}
			fn_cashOver();	// 현금과부족 계산
	    },
	    complete : function(data) {
	    	
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//클리어 마감시재등록
function clearForm(){
	
	//조회시 그리드1 선택 데이터 초기화
	dataRow1 = null;
	
	$("#P_CHECK_10").val('');
	$("#P_CHECK_10").trigger("onblur");
	$("#P_CHECK_30").val('');
	$("#P_CHECK_30").trigger("onblur");
	$("#P_CHECK_50").val('');
	$("#P_CHECK_50").trigger("onblur");
	$("#P_CHECK_100").val('');
	$("#P_CHECK_100").trigger("onblur");
	$("#P_CHECK_QTY_ETC").val('');
	$("#P_CHECK_QTY_ETC").trigger("onblur");
	$("#P_CHECK_AMT_ETC").val('');
	$("#P_CHECK_AMT_ETC").trigger("onblur");
	$("#P_CASH_50000").val('');
	$("#P_CASH_50000").trigger("onblur");
	$("#P_CASH_10000").val('');
	$("#P_CASH_10000").trigger("onblur");
	$("#P_CASH_5000").val('');
	$("#P_CASH_5000").trigger("onblur");
	$("#P_CASH_1000").val('');
	$("#P_CASH_1000").trigger("onblur");
	$("#P_CASH_500").val('');
	$("#P_CASH_500").trigger("onblur");
	$("#P_CASH_100").val('');
	$("#P_CASH_100").trigger("onblur");
	$("#P_CASH_50").val('');
	$("#P_CASH_50").trigger("onblur");
	$("#P_CASH_10").val('');
	$("#P_CASH_10").trigger("onblur");
	$("#P_GIFT_QTY1").val('');
	$("#P_GIFT_QTY1").trigger("onblur");
	$("#P_GIFT_AMT1").val('');
	$("#P_GIFT_AMT1").trigger("onblur");
	$("#P_GIFT_AMT_ETC").val('');
	$("#P_GIFT_AMT_ETC").trigger("onblur");
	
	$("#D_CREDIT_CNT").text("0");
	$("#D_CREDIT_AMT").text("0");
	$("#D_POS_CASH_AMT").text("0");
	$("#D_SALE_BOT_AMT").text("0");
	$("#D_SALE_BOT_CNT").text("0");
	$("#D_RES_FUND_AMT").text("0");
	$("#D_MID_CASH_AMT").text("0");
	$("#D_POS_AMT").text("0");
	posSum_amt = 0;
	
	$("#T_POS_NO").val("0");
	$("#T_EMP_NO").val("0");
}


// 저장 
function updatePosClosed(){
	var param = $("#frm").serializeAllObject();
	
	
	//마감내역 그리드 미 선택시 선택 메세지 출력
	if(dataRow1 == null){
		alert('마감내역목록의 계산원을 선택하세요.');
		return;
	}
	
	if($("#P_STR_CODE").val() == null || $("#P_STR_CODE").val() == "")
	{
		alert(store + msgConfirm);
		$("#P_STR_CODE").focus();
		return;
	}
	
	if($("#P_SALE_DT").val() == null || $("#P_SALE_DT").val() == "")
	{
		alert("영업일자" + msgConfirm);
		$("#P_SALE_DT").focus();
		return;
	}
	
	if($("#P_POS_NO").val() == null || $("#P_POS_NO").val() == "")
	{
		alert(pos + msgConfirm);
		$("#P_POS_NO").focus();
		return;
	}
	
	if($("#P_EMP_NO").val() == null || $("#P_EMP_NO").val() == "")
	{
		alert("계산원" + msgConfirm);
		$("#P_EMP_NO").focus();
		return;
	}
	
	
	if(confirm(msgSaveConfirm) == false) return;
	
	params.S_STR_CODE = $("#S_STR_CODE").val();
	
	// 서버 파라미터로 맞춤
	selectRemoveDisabled();
	
	jQuery.ajax({ 
	    url:"/updatePosClosedCash.do",
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
					frmReset();

				}
				else
				{
					selectDisabled();
					alert(msgErrorDefault);
				}
			}
			else
			{
				selectDisabled();
				alert(msgErrorDefault);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	selectDisabled();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

function selectDisabled()
{
	/*
	$("#P_STR_CODE").attr("disabled", "disabled");
	$("#P_POS_NO").attr("disabled", "disabled");
	$("#P_EMP_NO").attr("disabled", "disabled");
	$("#P_SALE_DT").datepicker("destroy").prop("readonly", true);	// 영업일자는 비활성
	*/
}

function selectRemoveDisabled()
{
	/*
	$("#P_STR_CODE").removeAttr("disabled");
	$("#P_POS_NO").removeAttr("disabled");
	$("#P_EMP_NO").removeAttr("disabled");
	$("#P_SALE_DT").datepicker().prop("readonly", false);	// 영업일자는 활성
	*/
}

// 현금과부족 계산
function fn_cashOver()
{
	var cashOver = 0;
	
	if(posSum_amt != null && check_amt != null && cash_amt != null && gift_amt != null)
	{
		// 현금과부족 = (수표/소계 + 기타/소계 + 현금/소계) - POS정산/소계, 과부족이 마이너스일 경우 빨강색 표기
		cashOver = (check_amt + gift_amt + cash_amt) - posSum_amt;
		if(cashOver < 0)
		{
			//$("#P_CASH_SHORT_OVER_TXT").text(CommonJs.numberFormat(cashOver));
			//$("#P_CASH_SHORT_OVER_TXT").css("color","red");
			$("#P_CASH_SHORT_OVER").val(cashOver);
		}
		else
		{
			//$("#P_CASH_SHORT_OVER_TXT").text(CommonJs.numberFormat(cashOver));
			//$("#P_CASH_SHORT_OVER_TXT").css("color","");
			$("#P_CASH_SHORT_OVER").val(cashOver);
		}
	}
}

// 수표 금액 표시처리
function fn_check_onblur(obj)
{
	var cnt = parseInt($(obj).val());
	var base_amt = 10000;
	
	var idArry = obj.id.split("_");
	if(idArry == null || idArry.length < 3)
	{
		return;
	}
	
	var amt = idArry[2];
	
	if($(obj).val() != "" && $(obj).val() != null)
	{
		if(idArry.length == 3)
		{
			$("#D_CHECK_"+idArry[2]).text(CommonJs.numberFormat( cnt * (base_amt * amt) ));
		}
	}
	else
	{
		$("#D_CHECK_"+idArry[2]).text("");
	}
	
	fn_check_sum();
}

// 수표 합계 구하기
function fn_check_sum()
{
	var check_cnt = 0;
	var chk_10 = 0;
	var chk_30 = 0;
	var chk_50 = 0;
	var chk_100 = 0;
	var chk_etc = 0;
	var chk_etc_amt = 0;
	
	if($("#P_CHECK_10").val() != "" && $("#P_CHECK_10").val() != null)
		chk_10 = parseInt($("#P_CHECK_10").val());
	
	if($("#P_CHECK_30").val() != "" && $("#P_CHECK_30").val() != null)
		chk_30 = parseInt($("#P_CHECK_30").val());
	
	if($("#P_CHECK_50").val() != "" && $("#P_CHECK_50").val() != null)
		chk_50 = parseInt($("#P_CHECK_50").val());
	
	if($("#P_CHECK_100").val() != "" && $("#P_CHECK_100").val() != null)
		chk_100 = parseInt($("#P_CHECK_100").val());
	
	if($("#P_CHECK_QTY_ETC").val() != "" && $("#P_CHECK_QTY_ETC").val() != null)
		chk_etc = parseInt($("#P_CHECK_QTY_ETC").val());
	
	if($("#P_CHECK_AMT_ETC").val() != "" && $("#P_CHECK_AMT_ETC").val() != null)
		chk_etc_amt = parseInt(CommonJs.remove_comma2($("#P_CHECK_AMT_ETC").val()));
	
	check_amt = (chk_10 * 100000) + (chk_30 * 300000) + (chk_50 * 500000) + (chk_100 * 1000000) + chk_etc_amt;
	check_cnt = chk_10 + chk_30 + chk_50 + chk_100 + chk_etc;
	
	$("#D_CHECK_CNT").text(check_cnt);
	$("#D_CHECK_AMT").text(CommonJs.numberFormat(check_amt));
	
	fn_cashOver();	// 현금과부족 계산
}

//상품권 합계처리
function fn_gift_onblur(obj)
{
	var gift_cnt = 0;
	
	// 합계 구하기	P_GIFT_QTY1
	var gift_1 = 0;
	var gift_amt_1 = 0;
	var gift_amt_3 = 0;
	if($("#P_GIFT_QTY1").val() != "" && $("#P_GIFT_QTY1").val() != null)
		gift_1 = parseInt($("#P_GIFT_QTY1").val());
	
	if($("#P_GIFT_AMT1").val() != "" && $("#P_GIFT_AMT1").val() != null)
		gift_amt_1 = parseInt(CommonJs.remove_comma2($("#P_GIFT_AMT1").val()));
	
	if($("#P_GIFT_AMT_ETC").val() != "" && $("#P_GIFT_AMT_ETC").val() != null)
		gift_amt_3 = parseInt(CommonJs.remove_comma2($("#P_GIFT_AMT_ETC").val()));
	
	
	gift_cnt = gift_1;
	gift_amt = gift_amt_1 + gift_amt_3;
	
	$("#D_GIFT_CNT").text(gift_cnt);
	$("#D_GIFT_AMT").text(CommonJs.numberFormat(gift_amt));
	
	fn_cashOver();	// 현금과부족 계산
}

// 현금 금액 표시처리
function fn_cash_onblur(obj)
{
	var cnt = parseInt($(obj).val());
	
	var idArry = obj.id.split("_");
	if(idArry == null || idArry.length < 3)
	{
		return;
	}
	
	var amt = idArry[2];
	
	if($(obj).val() != "" && $(obj).val() != null)
	{
		$("#D_CASH_"+idArry[2]).text(CommonJs.numberFormat( cnt * amt ));
	}
	else
	{
		$("#D_CASH_"+idArry[2]).text("");
	}
	
	fn_cash_sum();
}

// 현금 합계 구하기
function fn_cash_sum()
{
	var cash_cnt = 0;
	var cash_50000 = 0;
	var cash_10000 = 0;
	var cash_5000 = 0;
	var cash_1000 = 0;
	var cash_500 = 0;
	var cash_100 = 0;
	var cash_50 = 0;
	var cash_10 = 0;
	if($("#P_CASH_50000").val() != "" && $("#P_CASH_50000").val() != null)
		cash_50000 = parseInt($("#P_CASH_50000").val());
	
	if($("#P_CASH_10000").val() != "" && $("#P_CASH_10000").val() != null)
		cash_10000 = parseInt($("#P_CASH_10000").val());
	
	if($("#P_CASH_5000").val() != "" && $("#P_CASH_5000").val() != null)
		cash_5000 = parseInt($("#P_CASH_5000").val());
	
	if($("#P_CASH_1000").val() != "" && $("#P_CASH_1000").val() != null)
		cash_1000 = parseInt($("#P_CASH_1000").val());
	
	if($("#P_CASH_500").val() != "" && $("#P_CASH_500").val() != null)
		cash_500 = parseInt($("#P_CASH_500").val());
	
	if($("#P_CASH_100").val() != "" && $("#P_CASH_100").val() != null)
		cash_100 = parseInt($("#P_CASH_100").val());
	
	if($("#P_CASH_50").val() != "" && $("#P_CASH_50").val() != null)
		cash_50 = parseInt($("#P_CASH_50").val());
	
	if($("#P_CASH_10").val() != "" && $("#P_CASH_10").val() != null)
		cash_10 = parseInt($("#P_CASH_10").val());
	
	
	cash_cnt = cash_50000 + cash_10000 + cash_5000 + cash_1000 + cash_500 + cash_100 + cash_50 + cash_10;
	cash_amt = (cash_50000 * 50000) + (cash_10000 * 10000) + (cash_5000 * 5000) + (cash_1000 * 1000) + (cash_500 * 500) + (cash_100 * 100) + (cash_50 * 50) + (cash_10 * 10);
	
	$("#D_CASH_CNT").text(cash_cnt);
	$("#D_CASH_AMT").text(CommonJs.numberFormat(cash_amt));
	
	fn_cashOver();	// 현금과부족 계산
}

// 입력폼 초기화
function frmReset()
{
	var sDt = $("#S_SALE_DT").val();
	
	$("#frm").each(function() {
		//this.reset();
	});
	
	// hidden 초기화
	//$("#P_TYPE").val("insert");
	
	$("#S_SALE_DT").val(sDt);
	$("#T_STR_CODE").val($("#S_STR_CODE").val());
	$("#T_SALE_DT").val($("#S_SALE_DT").val());
	$("#P_POS_NO").val("");
	$("#P_EMP_NO").val("");
	
	// p태그 text clear
	$("#inputBox").find("P").text("");
	
	selectRemoveDisabled();
	
	check_amt = 0;	// 수표 합계 
	gift_amt = 0;	// 기타 합계
	posSum_amt = 0;	// pos정산 합계
	cash_amt = 0;	// 현금 합계
	
	//getPosClosed();	// POS정산 가져오기
	//fn_cashOver();	// 현금과부족 계산
	
	//클리어 마감시재 등록 폼
	clearForm();
}

$(document).ready(function () {
	
	$(".tbl1").width(280);
	$(".tbl2, .tbl3").width($(window).width()/2-174);
	$(window).resize(function() {
		$(".tbl1").width(280);
		$(".tbl2, .tbl3").width($(window).width()/2-174);
	});
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 점포코드 콤보 가져오기
	getStoreCode("S_STR_CODE");
	$("#S_STR_CODE").val($("#SESSION_STR_CODE").val());

	//하단 검색 조건 점포코드 가져오기
	var postValue = {};
	jQuery.ajax({
	    type:"POST",
	    url:"/getStoreCode.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	 $("#T_STR_CODE").append('<option value="">선택</option>');
			for(var i = 0; i < data.length; i++){
				 $("#T_STR_CODE").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	/* 계산원 콤보 가져오기
	 * elID				: 셀렉트 박스 ID
	 * STR_CODE		: 점포 코드
	 * allFlag			: option 에 '전체' 추가 flag
	 * isEmpNo			: 계산원 ID 표시 여부    
	 */
	getPosMasterMember("S_EMP_NO", $("#S_STR_CODE").val(), true, true);
	//getPosMasterMember("T_EMP_NO", $("#T_STR_CODE").val(), true, true);     
	
	//달력설정
	$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	$("#S_SALE_DT").val(date);
	$("#T_SALE_DT").val(date);
	
	// 숫자만 입력 처리
	try {
		
		CommonJs.addInputHandler({input:$("#P_CHECK_10"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CHECK_30"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CHECK_50"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CHECK_100"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CHECK_QTY_ETC"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_GIFT_QTY1"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CASH_50000"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CASH_10000"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CASH_5000"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CASH_1000"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CASH_500"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CASH_100"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CASH_50"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#P_CASH_10"), dataType:"N", maxlength:"3"});
		
    } catch(e) {
    	console.log(e);
    }
	
	
	// 상단검색 달력 체인지 이벤트
	$("#S_SALE_DT").change(function(){
		//날짜 변경시 마감시재등록폼 초기화
		clearForm();
		//날짜 변경 후 선택된 날짜의 마감내역 조회
		getGridData();
	});
	
	
	// 점포명 체인지 이벤트 (등록폼)
	$("#T_STR_CODE").change(function(){
		getPosList("P");
		
		var postValue = { "P_STR_CODE"	:  $("#T_STR_CODE").val() };
		var html = "";
		var isEmpNo = true;
		
		// 점포코드 가져오기
		jQuery.ajax({
		    type:"POST",
		    url:"/getPosMasterMember.do",
		    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	
		    	html += "<option value=\"\">"+select+"</option>";
		    	 
				for(var i = 0; i < data.length; i++)
				{
					if(isEmpNo == true)
					{
						html += "<option value=\"" + data[i].EMP_NO + "\">"+ data[i].EMP_NAME + " (" + data[i].EMP_NO + ")</option>";
					}
					else
					{
						html += "<option value=\"" + data[i].EMP_NO + "\">"+ data[i].EMP_NAME + "</option>";
					}
			   	}
				
				$("#T_EMP_NO").html(html);
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
		
		if($("#P_TYPE").val() == "insert")
		{
			getPosClosed();
		}
	});
	
	// POS 변경시 현금과부족 계산
	$("#T_POS_NO").change(function(){
		if($("#P_TYPE").val() == "insert")
		{
			getPosClosed();
		}
	});
	
	// 계산원 변경시 현금과부족 계산
	$("#T_EMP_NO").change(function(){
		if($("#P_TYPE").val() == "insert")
		{
			getPosClosed();
		}
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData();
	});
	
	// 저장 버튼 클릭
	$("#btn_update").click(function(){
		updatePosClosed();
	});
	
	// 신규 버튼 클릭
	$("#btn_create").click(function(){
		frmReset();
	});
	
	$("#S_STR_CODE").trigger("change");
	$("#T_STR_CODE").trigger("change");
	
	//사용자 권한정보 조회
	 var psotValue = {};
	 
	 jQuery.ajax({ 
		    url:"/selectUserOrgType.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: psotValue,
			success:function(data){  
				//alert(data[0].ORG_TYPE);
				//alert(data[0].ORG_NAME);
				sessionOrgType = data[0].ORG_TYPE;
				sessionOrgName = data[0].ORG_NAME;
				sessionStrCode = data[0].STR_CODE;
				sessionGroupCode = data[0].GROUP_CODE;
				
				//alert(sessionGroupCode);
				if(sessionGroupCode == "ROLE027"){
					$("#S_EMP_NO").val($("#P_REG_ID").val());
					$("#S_EMP_NO").attr("disabled", true);
				}
				
				if(sessionGroupCode == "ROLE001" || sessionGroupCode == "ROLE025" || sessionGroupCode == "ROLE026" || sessionGroupCode == "ROLE002"){
					$("#S_STR_CODE").attr("disabled", false);
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	
});


//점포명 체인지 이벤트
function changeTopSelectStrCode() {
	
	getPosList("S");
	
	$("#T_STR_CODE").val("");
	$("#T_POS_NO").val("");
	$("#T_EMP_NO").val("");
	
	getPosMasterMember("S_EMP_NO", $("#S_STR_CODE").val(), true, true);
	
	//날짜 변경시 마감시재등록폼 초기화
	clearForm();
	
	//날짜 변경 후 선택된 날짜의 마감내역 조회
	getGridData();
	
}