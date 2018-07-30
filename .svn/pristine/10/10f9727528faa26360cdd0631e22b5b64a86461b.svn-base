/********************************************************
 * 설명:  영업정보 > 영업관리 > 견적서관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.02.27
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "200px");
rMateGridH5.create("grid2", "gridHolder2", jsVars1, "100%", "380px");
rMateGridH5.create("grid3", "gridHolder3", jsVars1, "100%", "200px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

// 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, selectorColumn2;
var gridApp3, gridRoot3, dataGrid3, dataRow3, selectorColumn3;
var collection1, collection2, collection3; // 그리드의 데이터 객체
var src1, src2, src3;
var gridData = [];
var totalCnt = 0;	// 전체건수
var RowsPerPage = 10;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

var editRowIndex;	// 수정할 index
var editDataRow;
var editDataField;

var totalEmateAmt = 0;

var copyFlag = false;	// 복사 여부
var itemSeq = ""; 

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
	else if(id == "grid2")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (사업자탭)
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}
	else if(id == "grid3")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (사업자탭)
		gridApp3 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot3 = gridApp3.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp3.setLayout(layoutStr3);
		gridApp3.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
		gridRoot3.addEventListener("itemDataChanged", itemDataChangedHandler3);
	}
	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	var T_EMATE_FLAG = gridRoot1.getObjectById("T_EMATE_FLAG");
	T_EMATE_FLAG.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("EMATE_FLAG") );
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	// 전체 데이타 가져오기
	src1 = collection1.getSource();
	
	//그리드1 셀선택 이벤트
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
	
	$("#S_EMATE_DT").val(dataRow1.EMATE_DT);
	$("#S_EMATE_NO").val(dataRow1.EMATE_NO);
	
	gridApp2.setData([]);
	
	getGridData2();
}

// 그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {
	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "S_COLUMN_NAME", "S_ORDERBY");
	
	getGridData(false);
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
	//src2 = collection2.getSource();
	
	var T_TAX_GB = gridRoot2.getObjectById("T_TAX_GB");
	T_TAX_GB.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("TAX_GB") );
	
	var T_TPER_MTHD = gridRoot2.getObjectById("T_TPER_MTHD");
	T_TPER_MTHD.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("TPER_MTHD") );
	
	src2 = gridRoot2.getChangedData(true);
	if (src2.length > 0)
	{
		var avg = getPROFIT_RT();
		var rowIndex = collection2.getLength()-1; //마지막 행의 위치를 가져옵니다.
		gridRoot2.setItemFieldAt(avg, rowIndex, "PROFIT_RT"); //마지막 행 PROFIT_RT 필드에 avg 값을 설정합니다.
	}
	
	
}

function layoutCompleteHandler3() {
	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
	
	var T_TAX_GB = gridRoot3.getObjectById("T_TAX_GB");
	T_TAX_GB.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("TAX_GB") );
	
	var T_TPER_MTHD = gridRoot3.getObjectById("T_TPER_MTHD");
	T_TPER_MTHD.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("TPER_MTHD") );
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler3(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection3 = gridRoot3.getCollection();
	src3 = collection3.getSource();
	
	dataGrid3.addEventListener("itemDoubleClick", itemDoubleClickHandler3);
}

function itemDoubleClickHandler3(event) {
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	var dataRow = gridRoot3.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid3.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
	if (dataField == "ITM_NAME")
	{
		editRowIndex = rowIndex;
		editDataRow = dataRow;
		editDataField = dataField;
		// pop up edit window
		popupEditCell();
		
		// 기등록된 상품을 재등록(수정) 시 상품검색 콜백함수에서 seq 셋팅을 위해 전역변수로 선언
		if(typeof dataRow.SEQ != "undefined" && dataRow.SEQ != null )
		{
			itemSeq = dataRow.SEQ;
		}
	}
}

// 데이터 수정완료 후 이벤트
function itemDataChangedHandler3(event)
{
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	var dataRow = gridRoot3.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid3.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
	if(typeof dataRow.BASE_SPRC != "undefined" && dataRow.BASE_SPRC != null && typeof dataRow.ORD_QTY != "undefined" && dataRow.ORD_QTY != null)
	{
		if (dataField == "ORD_QTY" || dataField == "EMATE_SPRC")	// 수량, 단가 수정후
		{
			editRowIndex = rowIndex;
			editDataRow = dataRow;
			editDataField = dataField;
			
			var vat;		// vat
			var amt;		// 공급금액
			var amt2;		// 공급합계
			var rt;			// 이익률
			var dcAmt;		// 할인금액
			
			if(dataRow.TAX_GB == "1")	// 과세
			{
				vat = (dataRow.EMATE_SPRC * dataRow.ORD_QTY) / 11;
				vat = Math.floor(vat);
				amt = (dataRow.EMATE_SPRC * dataRow.ORD_QTY) - vat;
				amt2 = vat + amt;
			}
			else
			{
				vat = 0;
				amt = (dataRow.EMATE_SPRC * dataRow.ORD_QTY) - vat;
				amt2 = vat + amt;
			}
			
			rt = ( amt2 - (dataRow.WPRC * dataRow.ORD_QTY) ) / amt2 * 100;
			dcAmt = ( dataRow.BASE_SPRC - dataRow.EMATE_SPRC ) * dataRow.ORD_QTY;
			
			var item = { "ITM_NAME" : dataRow.ITM_NAME
					 , "ORD_QTY" : dataRow.ORD_QTY
					 , "SCAN_CODE" : dataRow.SCAN_CODE
					 , "UNIT" : dataRow.UNIT
					 , "BASE_SPRC" : dataRow.BASE_SPRC
					 , "WPRC" : dataRow.WPRC				// 매입단가 (기준원가 + 기준원가부가세) (상품검색 후 콜백에서 계산처리함)
					 , "EMATE_SPRC" : dataRow.EMATE_SPRC
					 , "EMATE_AMT" : amt					// 공급금액
					 , "EMATE_VAT" : vat					// vat
					 , "EMATE_AMT2" : amt2					// 공급합계
					 , "PROFIT_RT" : rt.toFixed(1)
					 , "ITM_CODE" : dataRow.ITM_CODE
					 , "TAX_GB" : dataRow.TAX_GB
					 , "TPER_MTHD" : dataRow.TPER_MTHD
					 , "SEQ" : dataRow.SEQ
					 , "IPSU_QTY" : dataRow.IPSU_QTY
					 , "DC_AMT" : dcAmt
					 , "BASE_WPRC" : dataRow.BASE_WPRC		// 기준원가
					 , "BASE_WVAT" : dataRow.BASE_WVAT		// 기준원가부가세
					 
			};
			
			/*
			item	object		수정할 행의 데이터
			index	number		수정할 행의 index번호
			ediMode	boolean		수정을 수행한 후 해당 행의 수정모드로 전환할지 여부. (기본값 : false)
			*/
			gridRoot3.setItemAt(item, editRowIndex, false);
			
			// 토탈 계산
			procAmt();
		}
	}
}

function gridMovePage(page) {
	$("#pageIndex").val(page);
	pageIndex = page;
	getGridData(false);
}

//itemEditEndJsFunction 기능을 이용하여 에티팅후 값을 받아 편집 적용여부를 제어할 수 있습니다.
//rowIndex: 해당 행의 index번호
//columnIndex: 해당 열의 index번호
//item: 해당 행의 data 객체
//dataField: 필드명
//oldValue: 수정전의 값
//newValue: 수정후의 값
//reason: 수정이 끝난 이유 (cancelled : 사용자가 수정 취소, sameValue : 같은 값을 유지, newColumn : 수정후 다른 열로 이동, newRow : 수정후 다른 행으로 이동, other : 포커스 이동이나 설정값 변경등등)
//에러메세지를 반환할 경우 에디팅 결과가 반영되지 않으며 해당 셀에 에러메세지가 표시되며, null을 반환할 경우 에디팅 결과가 적용됩니다.
function itemEditEndFunction(rowIndex, columnIndex, item, dataField, oldValue, newValue, reason) {
	// 실제 수정이 안 일어났으면 return
	//if (reason == "cancelled" || reason == "sameValue")
	if (reason == "cancelled")
		return null;
	
	/*if (columnIndex == 3) {
		if (newValue == "GMC-1 Release2")
		return "GMC-1 Release2는 선택할 수 없습니다";
	} else if (columnIndex == 6) {
		if (newValue == null || newValue == "")
			return dataField + "값을 입력하시기 바랍니다.";
	if (isNaN(Number(newValue)))
		return dataField + "값은 숫자만 가능합니다.";
	if (newValue < 1000)
		
	}*/
	
	if (columnIndex == 2)
	{
		if (newValue == null || newValue == "")
		{
			return "수량을 입력하시기 바랍니다.";
		}
		
		if (parseInt(newValue) < 1)
		{
			return "수량을 1개 이상 입력해주세요.";
		}
	}
	
	/*var idx = $(':radio[name="chk_user"]:checked').val();
	
	if (columnIndex == 5)
	{
		if(idx == "0")	// 회원용
		{
			if (newValue == null || newValue == "")
			{
				return "공급단가를 입력하시기 바랍니다.";
			}
			
			if (parseInt(newValue) < 1)
			{
				return "공급단가는 0 이상 입력해주세요.";
			}
			
			fn_addRow();	// 값 입력 후 행추가 자동
		}
	}*/
	
	if (columnIndex == 7)
	{
		if (newValue == null || newValue == "")
		{
			return "공급단가를 입력하시기 바랍니다.";
		}
		
		if (parseInt(newValue) < 1)
		{
			return "공급단가는 0 이상 입력해주세요.";
		}
		
		fn_addRow();	// 값 입력 후 행추가 자동
	}
	
	return null;
}

// 합계 레벨 설정
function secondFunc(item, value, column){
    if(item["No"])
        return item["No"]; //SpanSummaryRow에서 label속성으로 설정한 값 리턴
    else
        return value;
}

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true" editable="true" doubleClickEnabled="true" >\
			<columns>\
				<DataGridColumn dataField="EMATE_FLAG" id="T_EMATE_FLAG" headerText="출력구분" textAlign="center" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="EMATE_NO" headerText="견적NO" textAlign="center" editable="false" />\
				<DataGridColumn dataField="EMATE_DT" headerText="견적일자" textAlign="center" formatter="{datefmt}" editable="false" />\
				<DataGridColumn dataField="VALID_DT" headerText="유효일자" textAlign="center" formatter="{datefmt}" editable="false" />\
				<DataGridColumn dataField="EMATE_NM" headerText="견적명" textAlign="left" width="180" editable="false" />\
				<DataGridColumn dataField="CUST_NAME" headerText="'+cusName+'" textAlign="center" editable="false" />\
				<DataGridColumn dataField="SUM_SPRC" headerText="판매금액" textAlign="right" formatter="{numfmt}" editable="false" />\
				<DataGridColumn dataField="SUM_DC_AMT" headerText="'+dcAmt+'" textAlign="right" formatter="{numfmt}" editable="false" />\
				<DataGridColumn dataField="EMATE_AMT" headerText="공급금액" textAlign="right" formatter="{numfmt}" editable="false" />\
				<DataGridColumn dataField="EMATE_USAGE" headerText="견적용도" textAlign="left" width="150" editable="false" />\
				<DataGridColumn dataField="USER_NM" headerText="'+employeeName+'" textAlign="center" editable="false" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CUST_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="INDUST_FLAG" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="MEMO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="TEL_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="EMAIL" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="EMP_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SEND_TEL_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SEND_EMAIL" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="PAY_TYPE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="DLIVRY_TYPE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="REMARK" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="BUSI_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="REP_NAME" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="UPTAE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="UPJONG" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="POST_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="ADDR" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="ADDR_DTL" headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//그리드2 헤더 및 레이아웃
var layoutStr2 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#a8c305" colSpan="10" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" horizontalScrollPolicy="auto">\
			<groupedColumns>\
				<DataGridColumn dataField="No" itemRenderer="IndexNoItem" textAlign="center" width="60" secondLabelJsFunction="secondFunc" />\
				<DataGridColumn dataField="ITM_NAME" headerText="'+itmName+'" textAlign="left" width="220" />\
				<DataGridColumn dataField="ORD_QTY" headerText="'+qY+'" textAlign="center" width="60" />\
				<DataGridColumn dataField="ITM_CODE" headerText="'+itmCode+'" textAlign="center" width="110" />\
				<DataGridColumn dataField="UNIT" headerText="규격" textAlign="center" width="70" />\
				<DataGridColumn dataField="TAX_GB" id="T_TAX_GB" headerText="과세구분" textAlign="center" width="70" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="TPER_MTHD" id="T_TPER_MTHD" headerText="보관방법" textAlign="center" width="70" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="WPRC" headerText="매입단가" textAlign="right" width="80" formatter="{numfmt}" />\
				<DataGridColumn dataField="BASE_SPRC" headerText="판매단가" textAlign="right" width="80" formatter="{numfmt}" />\
				<DataGridColumn dataField="EMATE_SPRC" headerText="공급단가" textAlign="right" width="80" formatter="{numfmt}" />\
				<DataGridColumn dataField="EMATE_AMT" headerText="공급금액" textAlign="right" width="80" formatter="{numfmt}" />\
				<DataGridColumn dataField="EMATE_VAT" headerText="VAT" textAlign="right" width="80" formatter="{numfmt}" />\
				<DataGridColumn dataField="EMATE_AMT2" headerText="공급합계" textAlign="right" width="80" formatter="{numfmt}" />\
				<DataGridColumn dataField="PROFIT_RT" headerText="'+ProfitRt+'" textAlign="right" width="60" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CUST_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SEQ" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="BASE_WPRC" headerText="" textAlign="center" visible="false"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<summaries>\
						<SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="No" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
				            <SpanSummaryField dataField="EMATE_AMT2" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
		<Style>\
			.subTotalStyle {\
				textAlign: center;\
			}\
		</Style>\
	</rMateGrid>';

//그리드3 헤더 및 레이아웃
var layoutStr3 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg4" editable="true" doubleClickEnabled="true" itemEditEndJsFunction="itemEditEndFunction" horizontalScrollPolicy="auto">\
			<columns>\
				<DataGridColumn dataField="No" itemRenderer="IndexNoItem" textAlign="center" width="50" editable="false" />\
				<DataGridColumn dataField="ITM_NAME" headerText="'+itmName+'" textAlign="left" itemRenderer="IconItem" icon="Magnifier" editable="false" />\
				<DataGridColumn dataField="ORD_QTY" headerText="'+qY+'" textAlign="center" width="50" maxChars="6" type="int" />\
				<DataGridColumn dataField="SCAN_CODE" headerText="'+itmCode+'" textAlign="center" width="100" editable="false" />\
				<DataGridColumn dataField="TAX_GB" id="T_TAX_GB" headerText="과세구분" textAlign="center" width="70" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="TPER_MTHD" id="T_TPER_MTHD" headerText="보관방법" textAlign="center" width="70" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="UNIT" headerText="규격" textAlign="center" width="60" editable="false" />\
				<DataGridColumn dataField="WPRC" headerText="매입단가" textAlign="right" width="80" formatter="{numfmt}" editable="false" />\
				<DataGridColumn dataField="BASE_SPRC" headerText="판매단가" textAlign="right" width="80" formatter="{numfmt}" editable="false" />\
				<DataGridColumn dataField="EMATE_SPRC" headerText="공급단가" textAlign="right" width="80" formatter="{numfmt}" maxChars="16" type="int" />\
				<DataGridColumn dataField="EMATE_AMT" headerText="공급금액" textAlign="right" width="80" formatter="{numfmt}" editable="false" />\
				<DataGridColumn dataField="EMATE_VAT" headerText="VAT" textAlign="right" width="80" formatter="{numfmt}" editable="false" />\
				<DataGridColumn dataField="EMATE_AMT2" headerText="공급합계" textAlign="right" width="80" formatter="{numfmt}" editable="false" />\
				<DataGridColumn dataField="PROFIT_RT" headerText="'+ProfitRt+'" textAlign="right" width="70" editable="false" />\
				<DataGridColumn dataField="ITM_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SEQ" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IPSU_QTY" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="DC_AMT" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="BASE_WPRC" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="BASE_WVAT" headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';
//----------------------- 그리드 설정 끝 -----------------------

// 견적목록 조회
function getGridData(isHeadDefault) {
	var param 			= $("#sertch_frm").serializeAllObject();
	var gongDt 			= $("#S_GONG_DT").val().replace(/-/g, "");
	var endDt 			= $("#S_END_DT").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#S_GONG_DT").val().split("-");
	var P_END_DT_ARR 	= $("#S_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if(isHeadDefault == true)
	{
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "S_COLUMN_NAME", "S_ORDERBY");
	}
	
	if($("#S_GONG_DT").val() == null || $("#S_GONG_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#S_GONG_DT").focus();
		return;
	}
	
	if($("#S_END_DT").val() == null || $("#S_END_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#S_END_DT").focus();
		return;
	}
	
	if(gongDt > endDt)
	{
		alert(msgDateValidation);
		$("#S_END_DT").focus();
		return;
	}

	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#S_GONG_DT").focus();
		return;
	}
	
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/businessEstimateList.do",         
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
				totalCnt = data.totalCount;
				
				drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
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

// 견적상품 조회
function getGridData2() {
	
	var param = $("#sertch_frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/businessEstimateProList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid2.setEnabled(false);
			gridRoot2.addLoadingBar();
		},
		success:function(data){
			
			if(typeof data.list != "undefiend" && data.list != null)
			{
				//그리드1 데이터 조회
				gridData = data.list;
				gridApp2.setData(gridData);
			}
	    },
	    complete : function(data) {
	    	dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
	    }
	});
}

// 합산 이익률 연산을 위한 함수
function getPROFIT_RT(){
	
	var data;
	var amt = 0;
	var wprc = 0;
	var rs;
	
	for (var i = 0; i < src2.length; i++)
	{
		data = src2[i].data;
		
		if(data.No == "합계")
			continue;
		
		amt += data.EMATE_AMT;
		wprc += (data.WPRC * data.ORD_QTY);
	}
	rs = ( amt - wprc ) / amt * 100;
	
	/*for(var i = 0; i<src2.length; i++){
		result += src2[i]["EMATE_AMT"];
	}*/
	
	//var amt = dataRow.EMATE_SPRC * dataRow.ORD_QTY;							// 견적금액
	//var rt = ( amt - (dataRow.BASE_WPRC * dataRow.ORD_QTY) ) / amt * 100;		// 이익률
	
	return rs.toFixed(1); // 평균을 구합니다.
}

// 견적상품 조회 (팝업)
function getGridData3() {
	
	var param = $("#sertch_frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/businessEstimateProList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid3.setEnabled(false);
			gridRoot3.addLoadingBar();
		},
		success:function(data){
			
			if(typeof data.list != "undefiend" && data.list != null)
			{
				//그리드1 데이터 조회
				gridData = data.list;
				gridApp3.setData(gridData);
			}
	    },
	    complete : function(data) {
	    	dataGrid3.setEnabled(true);
			gridRoot3.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid3.setEnabled(true);
			gridRoot3.removeLoadingBar();
	    }
	});
}

// 견적서 등록
function updateEstimateInfo()
{
	if($("#P_CUST_NAME").val() == null || $("#P_CUST_NAME").val() == "")
	{
		alert(cusName + msgConfirm);
		$("#P_CUST_NAME").focus();
		return;
	}
	
	if($("#P_TEL_NO_1").val() == null || $("#P_TEL_NO_1").val() == "")
	{
		alert(phoneNumber + msgConfirm);
		$("#P_TEL_NO_1").focus();
		return;
	}
	
	if($("#P_TEL_NO_2").val() == null || $("#P_TEL_NO_2").val() == "")
	{
		alert(phoneNumber + msgConfirm);
		$("#P_TEL_NO_2").focus();
		return;
	}
	
	if($("#P_TEL_NO_3").val() == null || $("#P_TEL_NO_3").val() == "")
	{
		alert(phoneNumber + msgConfirm);
		$("#P_TEL_NO_3").focus();
		return;
	}
	
	if($("#P_EMAIL_1").val() == null || $("#P_EMAIL_1").val() == "")
	{
		alert(email + msgConfirm);
		$("#P_EMAIL_1").focus();
		return;
	}
	
	if($("#P_EMAIL_2").val() == null || $("#P_EMAIL_2").val() == "")
	{
		alert(email + msgConfirm);
		$("#P_EMAIL_2").focus();
		return;
	}
	
	if($("#P_EMATE_DT").val() == null || $("#P_EMATE_DT").val() == "")
	{
		alert("견적일자" + msgConfirm);
		$("#P_EMATE_DT").focus();
		return;
	}
	
	if($("#P_VALID_DT").val() == null || $("#P_VALID_DT").val() == "")
	{
		alert("유효기간" + msgConfirm);
		$("#P_VALID_DT").focus();
		return;
	}
	
	var emateDt = $("#P_EMATE_DT").val().replace(/-/g, "");
	var validDt = $("#P_VALID_DT").val().replace(/-/g, "");
	if(Number(emateDt) > Number(validDt))
	{
		alert(msgBusinessValid);	// "유효기간은 견적일자보다 큰 날짜를 선택해주세요."
		$("#P_VALID_DT").focus();
		return;
	}
	
	if($("#P_EMATE_NM").val() == null || $("#P_EMATE_NM").val() == "")
	{
		alert("견적명" + msgConfirm);
		$("#P_EMATE_NM").focus();
		return;
	}
	
	if($("#P_INDUST_FLAG").val() == null || $("#P_INDUST_FLAG").val() == "")
	{
		alert("견적유형" + msgConfirm);
		$("#P_INDUST_FLAG").focus();
		return;
	}
	
	if($("#P_EMP_NAME").val() == null || $("#P_EMP_NAME").val() == "")
	{
		alert(employeeName + msgConfirm);
		$("#P_EMP_NAME").focus();
		return;
	}
	
	if($("#P_SEND_TEL_NO_1").val() == null || $("#P_SEND_TEL_NO_1").val() == "")
	{
		alert(phoneNumber + msgConfirm);
		$("#P_SEND_TEL_NO_1").focus();
		return;
	}
	
	if($("#P_SEND_TEL_NO_2").val() == null || $("#P_SEND_TEL_NO_2").val() == "")
	{
		alert(phoneNumber + msgConfirm);
		$("#P_SEND_TEL_NO_2").focus();
		return;
	}
	
	if($("#P_SEND_TEL_NO_3").val() == null || $("#P_SEND_TEL_NO_3").val() == "")
	{
		alert(phoneNumber + msgConfirm);
		$("#P_SEND_TEL_NO_3").focus();
		return;
	}
	
	if($("#P_SEND_EMAIL_1").val() == null || $("#P_SEND_EMAIL_1").val() == "")
	{
		alert(email + msgConfirm);
		$("#P_SEND_EMAIL_1").focus();
		return;
	}
	
	if($("#P_SEND_EMAIL_2").val() == null || $("#P_SEND_EMAIL_2").val() == "")
	{
		alert(email + msgConfirm);
		$("#P_SEND_EMAIL_2").focus();
		return;
	}
	
	if($("#P_PAY_TYPE").val() == null || $("#P_PAY_TYPE").val() == "")
	{
		alert("결제조건" + msgConfirm);
		$("#P_PAY_TYPE").focus();
		return;
	}
	
	if($("#P_DLIVRY_TYPE").val() == null || $("#P_DLIVRY_TYPE").val() == "")
	{
		alert("납기조건" + msgConfirm);
		$("#P_DLIVRY_TYPE").focus();
		return;
	}
	
	if($("#P_EMATE_USAGE").val() == null || $("#P_EMATE_USAGE").val() == "")
	{
		alert("견적용도" + msgConfirm);
		$("#P_EMATE_USAGE").focus();
		return;
	}
	
	// 멤버십 카드 파라미터 셋팅
	if(copyFlag == true)
	{
		setProList_copry();
	}
	else
	{
		setProList();
	}
	
	var rowCnt  = collection3.getSource();
	if(rowCnt < 1)
	{
		alert("견적상품을 추가 후 등록해주세요.");
		return;
	}
	
	var param = $("#reg_frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updateBusinessEstimate.do",
	    type:"POST",
		datatype:"json",
		//async:false,
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
					getGridData(true);		// 견적목록 조회
					gridApp2.setData([]);	// 견적상품 비우기
				}
				else
				{
					alert(data.RETURN_MSG);
					getGridData(true);
					gridApp2.setData([]);
				}
			}
			else
			{
				alert(msgErrorDefault);
				getGridData(true);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 견적상품 정보 저장 (신규, 수정 일때~)
function setProList()
{
	/* 회원카드 정보 셋팅
	 * 수정 작업 결과 가져오기 (그리드에서 작업된 입력,수정,삭제 내용을 가져옵니다)
	 * 데이터는 배열 형태로
	 * idx: 행번호
	 * job: 수행 작업 (I:입력, U:수정, D:삭제)
	 * data: 행의 자료
	 * 를 가지고 있으며 삭제가 먼저 오도록 정렬되어 있습니다.
	 */
	var paramData = "";
	var changedData = gridRoot3.getChangedData();
	if (changedData.length > 0)
	{
		// P_CARD_LIST 파리미터에 아래와 같은 형식의 스트링을 ',' '|' 두개의 구분자로 서버에전송 = '111|222|333,111|222|333,111|222|333'
		/* 수정타입	|수량		|상품ID   	|규격		|공급단가		|매입단가		|상품ID		|과세구분	|순번		|입수량		|할인금액	|보관방법
		 * JOB_TYPE	|ORD_QTY|SCAN_CODE	|UNIT	|EMATE_SPRC	|WPRC		|ITM_CODE	|TAX_GB	|SEQ	|IPSU_QTY	|DC_AMT	|TPER_MTHD
		 */
		var data;
		for (var i = 0; i < changedData.length; i++)
		{
			data = changedData[i].data;
			if(paramData != "")
			{
				paramData += ",";
			}
			paramData += changedData[i].job + "|" + CommonJs.isNullToString(data.ORD_QTY, "") + "|" + CommonJs.isNullToString(data.SCAN_CODE, "") + "|" + CommonJs.isNullToString(data.UNIT, "")
				+ "|" + CommonJs.isNullToString(data.EMATE_SPRC, "") + "|" + CommonJs.isNullToString(data.WPRC, "") + "|" + CommonJs.isNullToString(data.ITM_CODE, "")
				+ "|" + CommonJs.isNullToString(data.TAX_GB, "") + "|" + CommonJs.isNullToString(data.SEQ, "") + "|" + CommonJs.isNullToString(data.IPSU_QTY, "") + "|" + CommonJs.isNullToString(data.DC_AMT, "")
				+ "|" + CommonJs.isNullToString(data.TPER_MTHD, "");
		}
		$("#P_PRO_LIST").val(paramData);
	}
	//console.log(paramData);
}

/**
 * 견적상품 정보 저장 (복사 일때~)
 * 복사일때 getChangedData 의 JOB_TYPE 이 'N' 이어서 'I' 로 모두 변경
 */
function setProList_copry()
{
	/* 회원카드 정보 셋팅
	 * 수정 작업 결과 가져오기 (그리드에서 작업된 입력,수정,삭제 내용을 가져옵니다)
	 * 데이터는 배열 형태로
	 * idx: 행번호
	 * job: 수행 작업 (I:입력, U:수정, D:삭제)
	 * data: 행의 자료
	 * 를 가지고 있으며 삭제가 먼저 오도록 정렬되어 있습니다.
	 */
	var paramData = "";
	var changedData = gridRoot3.getChangedData(true);
	if (changedData.length > 0)
	{
		// P_CARD_LIST 파리미터에 아래와 같은 형식의 스트링을 ',' '|' 두개의 구분자로 서버에전송 = '111|222|333,111|222|333,111|222|333'
		/* 수정타입	|수량		|상품ID   	|규격		|공급단가		|매입단가		|상품ID		|과세구분	|순번		|입수량		|할인금액	|보관방법
		 * JOB_TYPE	|ORD_QTY|SCAN_CODE	|UNIT	|EMATE_SPRC	|WPRC		|ITM_CODE	|TAX_GB	|SEQ	|IPSU_QTY	|DC_AMT	|TPER_MTHD
		 */
		var data;
		for (var i = 0; i < changedData.length; i++)
		{
			data = changedData[i].data;
			
			if(changedData[i].job == "D")
				continue;
			
			if(paramData != "")
			{
				paramData += ",";
			}
			paramData += "C" + "|" + CommonJs.isNullToString(data.ORD_QTY, "") + "|" + CommonJs.isNullToString(data.SCAN_CODE, "") + "|" + CommonJs.isNullToString(data.UNIT, "")
				+ "|" + CommonJs.isNullToString(data.EMATE_SPRC, "") + "|" + CommonJs.isNullToString(data.WPRC, "") + "|" + CommonJs.isNullToString(data.ITM_CODE, "")
				+ "|" + CommonJs.isNullToString(data.TAX_GB, "") + "|" + CommonJs.isNullToString(data.SEQ, "") + "|" + CommonJs.isNullToString(data.IPSU_QTY, "") + "|" + CommonJs.isNullToString(data.DC_AMT, "")
				+ "|" + CommonJs.isNullToString(data.TPER_MTHD, "");
		}
		$("#P_PRO_LIST").val(paramData);
	}
	//console.log(paramData);
}

/**
 * 조직정보 상세
 * param : DEPT_CODE, DEPT_NAME, GRADE, ORG_TYPE, USE_YN 
 * 
 **/
function setBonbu()
{
	var resultData;
	
	jQuery.ajax({ 
	    url:"/getOrganizationDetailInfo.do" ,
	    type:"POST",
		datatype:"json",
		//async:false,
		data : {"DEPT_CODE": "00000"},	// 본부 코드 
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data != "undefined" && data != null)
			{
				resultData = data[0];
				//setInfo(resultData);
				$("#D_BUSI_NO").val(CommonJs.busiFomatter(resultData.BUSI_NO));
				$("#D_REP_NAME").val(resultData.REP_NAME);
				$("#D_UPTAE").val(resultData.UPTAE);
				$("#D_UPJONG").val(resultData.UPJONG);
				$("#D_POST_NO").val(resultData.POST_NO);
				$("#D_ADDR").val(resultData.ADDR);
				$("#D_ADDR_DTL").val(resultData.ADDR_DTL);
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

// 상품 검색 팝업호출
function popupEditCell() {
	
	$("#comm_pop_wrap2").dialog({
		dialogClass: "p_f"
	});
	
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#P_CALLBACK_NM2").val('btn_comm_product_search(dataRow11)');
	/*if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT2").val($("#I_TEXT").val());
		btn_comm_search('2');
	}*/
}

//(회원검색) 팝업 호출 function
function btn_comm_user_search(type)
{
	if(type == "S")
	{
		$("#comm_pop_wrap1").dialog("open");
		gridApp10.resize();
		
		// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
		$("#P_CALLBACK_NM1").val("fn_comm_user_callback_"+type+"(dataRow10)");
		
		// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
		if($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != ""){
			$("#P_TEXT1").val($("#S_CUST_NAME").val());
			btn_comm_search('1');
		}
	}
	else if(type == "P")
	{
		// 팝업 멀티로 띄울시 가운데 정렬 강제로 셋팅
		$("#comm_pop_wrap1").dialog({
			dialogClass: "p_f"
		});
		
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
	else if(type == "B")
	{
		$("#comm_pop_wrap4").dialog({
		    dialogClass: "p_f"
		});
		
		$('#comm_pop_wrap4' ).dialog( 'open' );
		gridApp13.resize();
		
		$("#P_CALLBACK_NM4").val("fn_comm_user_callback_"+type+"(dataRow13)");
		
		if($("#P_EMP_NAME").val() != null && $("#P_EMP_NAME").val() != ""){
			$("#P_TEXT4").val($("#P_EMP_NAME").val());
			btn_comm_search('4');
		}
	}
}

function fn_comm_user_callback_S(dataRow)
{
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("회원정보 조회 실패");
		return;
	}
	$("#S_CUST_NAME").val(dataRow.CUST_NAME);	// 회원명
	$("#S_CUST_NO").val(dataRow.CUST_NO);		// 회원번호
}

function fn_comm_user_callback_P(dataRow)
{
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("회원정보 조회 실패");
		return;
	}
	
	$("#P_BUSI_NO").val(CommonJs.busiFomatter(dataRow.BUSI_NO));
	$("#P_REP_NAME").val(dataRow.OWN_NAME);
	$("#P_UPTAE").val(dataRow.UPTAE);
	$("#P_UPJONG").val(dataRow.UPJONG);
	$("#P_POST_NO").val(dataRow.POST_NO);
	$("#P_ADDR").val(dataRow.ADDR);
	$("#P_ADDR_DTL").val(dataRow.ADDR_DTL);
	
	$("#P_CUST_NAME").val(dataRow.CUST_NAME);	// 회원명
	$("#P_CUST_NO").val(dataRow.CUST_NO);		// 회원번호
	
	var telArr = CommonJs.phoneFomatterArr(dataRow.TEL_NO);
	var emailArr = CommonJs.emailSplit(dataRow.SEND_EMAIL);
	
	if(telArr != null && telArr.length == 3)
	{
		$("#P_TEL_NO_1").val(telArr[0]);		// 전화번호
		$("#P_TEL_NO_2").val(telArr[1]);		// 전화번호
		$("#P_TEL_NO_3").val(telArr[2]);		// 전화번호
	}
	
	if(emailArr != null && emailArr.length == 2)
	{
		$("#P_EMAIL_1").val(emailArr[0]);		// 이메일
		$("#P_EMAIL_2").val(emailArr[1]);		// 이메일
	}
}

function fn_comm_user_callback_B(dataRow)
{
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("담당자정보 조회 실패");
		return;
	}
	$("#P_EMP_NAME").val(dataRow.USER_NM);		// 담당자명
	$("#P_EMP_NO").val(dataRow.USER_ID);		// 담당자ID
	
	var telArr = CommonJs.phoneFomatterArr(dataRow.MOBIL_NO);
	var emailArr = CommonJs.emailSplit(dataRow.SEND_EMAIL);
	
	if(telArr != null && telArr.length == 3)
	{
		$("#P_SEND_TEL_NO_1").val(telArr[0]);		// 전화번호
		$("#P_SEND_TEL_NO_2").val(telArr[1]);		// 전화번호
		$("#P_SEND_TEL_NO_3").val(telArr[2]);		// 전화번호
	}
	
	if(emailArr != null && emailArr.length == 2)
	{
		$("#P_SEND_EMAIL_1").val(emailArr[0]);		// 이메일
		$("#P_SEND_EMAIL_2").val(emailArr[1]);		// 이메일
	}
}

// 상품 검색 콜백
function btn_comm_product_search(dataRow)
{
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("상품정보 조회 실패");
		return;
	}
	
	var item = { "ITM_NAME" : dataRow.ITM_NAME
				 , "ORD_QTY" : 1
				 , "IPSU_QTY" : dataRow.IPSU_QTY
				 , "SCAN_CODE" : dataRow.SCAN_CODE
				 , "ITM_CODE" : dataRow.ITM_CODE
				 , "EMATE_SPRC" : dataRow.BASE_SPRC		// 공급단가 (기준메가로 가져오고 입력을 받을수 있다.)
				 , "WPRC" : dataRow.BASE_WPRC + dataRow.BASE_WVAT		// 매입단가 (기준원가 + 기준원가부가세)
				 , "UNIT" : dataRow.UNIT
				 , "TAX_GB" : dataRow.TAX_GB
				 , "TPER_MTHD" : dataRow.TPER_MTHD
				 , "BASE_SPRC" : dataRow.BASE_SPRC
				 , "SEQ" : itemSeq
				 , "BASE_WPRC" : dataRow.BASE_WPRC		// 기준원가
				 , "BASE_WVAT" : dataRow.BASE_WVAT		// 기준원가부가세
	};
	
	/*
	item	object		수정할 행의 데이터
	index	number		수정할 행의 index번호
	ediMode	boolean		수정을 수행한 후 해당 행의 수정모드로 전환할지 여부. (기본값 : false)
	*/
	gridRoot3.setItemAt(item, editRowIndex, true);
	
	itemSeq = "";	// 기등록 상품 seq 셋팅후 리셋
}

// 견적금액 토탈 및 한글표기 처리
function procAmt()
{
	// 견적금액 토탈 금액 및 한글 표기
	/**
	 * getChangedData(includeAllData, useClone)
	 * 		Name			Type		Description
	 * 		includeAllData	boolean		반환되는 결과값에 변경이 발생하지 않은 행을 포함할지 여부. true 이면 변경이 발생하지 않은 행을 job:”N”으로 반환합니다.
	 *		useClone		boolean		clone기능을 통해 복제 후 결과를 반환할 지 여부. true 이면 전달된 복사본이 반환되며, span속성 등 내부 속성은 제거됩니다.
	 */
	var changedData = gridRoot3.getChangedData(true);
	if (changedData.length > 0)
	{
		totalEmateAmt = 0;
		
		var data;
		for (var i = 0; i < changedData.length; i++)
		{
			data = changedData[i].data;
			if(changedData[i].job != "D")
			{
				if(null != data.EMATE_AMT2 && "" != data.EMATE_AMT2)
				{
					totalEmateAmt += data.EMATE_AMT2;
				}
			}
		}
		
		$("#P_EMATE_AMT").val(totalEmateAmt);
		$("#T_EMATE_AMT").text(CommonJs.numberFormat(totalEmateAmt));
		$("#T_EMATE_AMT_KOR").text(CommonJs.viewKorean(String(totalEmateAmt)));
	}
	
}

// 복사
function fn_copy()
{
	if (dataGrid1.getSelectedIndex() < 0)
	{
		alert(msgSelectData);	// 데이터를 선택해주세요.
		return;
	}
	
	copyFlag = true;
	setPopData("insert");
	
	fn_pop_open();
}

// 수정
function fn_update()
{
	if (dataGrid1.getSelectedIndex() < 0)
	{
		alert(msgSelectData);	// 데이터를 선택해주세요.
		return;
	}
	
	copyFlag = false;
	setPopData("update");
	
	fn_pop_open();
}

// 수정 & 복사 팝업 오픈 시 데이터 셋팅
function setPopData(type)
{
	frmReset();
	$("#P_TYPE").val(type);
	
	var telArr = CommonJs.phoneFomatterArr(dataRow1.TEL_NO);
	var telArr2 = CommonJs.phoneFomatterArr(dataRow1.SEND_TEL_NO);
	var emailArr = CommonJs.emailSplit(dataRow1.EMAIL);
	var emailArr2 = CommonJs.emailSplit(dataRow1.SEND_EMAIL);
	
	// 수정 모드 일때..
	if(type == "update")
	{
		$("#P_EMATE_NO").val(dataRow1.EMATE_NO);	// 견적 No
		$("#P_EMATE_DT").datepicker("destroy").prop("readonly", true);	// 견적일자는 비활성
	}
	
	// 수신처================================================
	$("#P_CUST_NO").val(dataRow1.CUST_NO);
	$("#P_CUST_NAME").val(dataRow1.CUST_NAME);
	$("#P_BUSI_NO").val(CommonJs.busiFomatter(dataRow1.BUSI_NO));
	$("#P_REP_NAME").val(dataRow1.REP_NAME);
	$("#P_UPTAE").val(dataRow1.UPTAE);
	$("#P_UPJONG").val(dataRow1.UPJONG);
	$("#P_POST_NO").val(dataRow1.POST_NO);
	$("#P_ADDR").val(dataRow1.ADDR);
	$("#P_ADDR_DTL").val(dataRow1.ADDR_DTL);
	$("#P_EMP_NO").val(dataRow1.EMP_NO);		// 관리자ID
	$("#P_EMATE_AMT").val(dataRow1.EMATE_AMT);
	$("#P_MEMO").val(dataRow1.MEMO);
	
	if(telArr != null && telArr.length == 3)
	{
		$("#P_TEL_NO_1").val(telArr[0]);		// 전화번호
		$("#P_TEL_NO_2").val(telArr[1]);		// 전화번호
		$("#P_TEL_NO_3").val(telArr[2]);		// 전화번호
	}
	if(emailArr != null && emailArr.length == 2)
	{
		$("#P_EMAIL_1").val(emailArr[0]);		// 이메일
		$("#P_EMAIL_2").val(emailArr[1]);		// 이메일
	}
	
	$("#P_EMATE_DT").val(CommonJs.dateFormat(dataRow1.EMATE_DT, "-"));
	$("#P_VALID_DT").val(CommonJs.dateFormat(dataRow1.VALID_DT, "-"));
	$("#P_EMATE_NM").val(dataRow1.EMATE_NM);
	
	// 발신처================================================
	$("#P_INDUST_FLAG").val(dataRow1.INDUST_FLAG);
	$("#P_EMP_NAME").val(dataRow1.USER_NM);			// 관리자명
	
	if(telArr2 != null && telArr2.length == 3)
	{
		$("#P_SEND_TEL_NO_1").val(telArr2[0]);		// 전화번호
		$("#P_SEND_TEL_NO_2").val(telArr2[1]);		// 전화번호
		$("#P_SEND_TEL_NO_3").val(telArr2[2]);		// 전화번호
	}
	if(emailArr2 != null && emailArr2.length == 2)
	{
		$("#P_SEND_EMAIL_1").val(emailArr2[0]);		// 이메일
		$("#P_SEND_EMAIL_2").val(emailArr2[1]);		// 이메일
	}
	
	$("#P_PAY_TYPE").val(dataRow1.PAY_TYPE);
	$("#P_DLIVRY_TYPE").val(dataRow1.DLIVRY_TYPE);
	$("#P_EMATE_USAGE").val(dataRow1.EMATE_USAGE);
	
	$("#P_REMARK").val(dataRow1.REMARK);			// 특이사항
	
	getGridData3();	// 견적상품 조회
	
	// 총 금액
	$("#P_EMATE_AMT").val(dataRow1.EMATE_AMT);
	$("#T_EMATE_AMT").text(CommonJs.numberFormat(dataRow1.EMATE_AMT));
	$("#T_EMATE_AMT_KOR").text(CommonJs.viewKorean(String(dataRow1.EMATE_AMT)));
}

// 행추가
function fn_addRow() {
	
	var item = {};
	
	/* addItemAt(item, index, ediMode, editColumnNo)
	 * item	: 등록할 행의 data객체
	 * index : 등록할 행의 index번호, 넣지 않거나 -1을 넣어주면 맨마지막에 등록합니다.
	 * ediMode : 등록을 수행한 후 해당 행의 수정모드로 전환할지 여부. (기본값 : true)
	 * editColumnNo : 등록을 수행한 후 수정모드로 전환할 컬럼의 번호. (기본값 : -1)
	 */
	gridRoot3.addItemAt(item, -1, false, -1);
}

// 행삭제
function fn_delRow()
{
	var lastRollOverIndex = gridRoot3.getLastRollOverIndex();
	if (lastRollOverIndex >= 0)
	{
		//gridRoot2.removeItemAt(lastRollOverIndex);
		gridRoot3.removeItemAt();
		procAmt();
	}
	else
	{
		alert(msgDeleteRowSel);	// 삭제할 행을 선택해주세요.
	}
}

//개인 입력폼 초기화
function frmReset()
{
	// 검색영역 초기화
	/*var date = new CommDateManager().getDate("yyyy-mm-dd");
	var date1 = new CommDateManager().getDate("yyyy-mm") + "-01";
	
	$("#S_GONG_DT").val(date1);
	$("#S_END_DT").val(date);
	$("#S_CUST_NAME").val("");
	$("#SS_EMATE_NO").val("");*/
	
	// 등폭폼 초기화
	$("#reg_frm").each(function() {
		this.reset();
	});
	
	$("#T_EMATE_AMT").text("0");
	$("#T_EMATE_AMT_KOR").text("");
	$("#P_PRO_LIST").val("");
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_EMATE_DT").val(date);
	$("#P_VALID_DT").val(date);
	
	// 견적일자는 수정모드 활성
	$("#P_EMATE_DT").datepicker().prop("readonly", false);
	
	// 견적일자 & 유효기간 과거일자 비활성 처리
	$("#P_EMATE_DT").datepicker("option", "minDate", 0);
	$("#P_VALID_DT").datepicker("option", "minDate", 0);
	
	gridApp3.setData([]);	// 카드 데이터 초기화
}

// 팝업 오픈
function fn_pop_open(){
	
	gridApp3.setLayout(layoutStr3);	// 디폴트 회원용
	$("#pop_wrap1").dialog("open");
	gridApp3.resize();
	
	setBonbu();
}

// 팝업 닫기
function btn_close(){
	$("#pop_wrap1").dialog("close");
}

//출력
function btn_print1(){
	var P_CORP_CODE		= $("#S_CORP_CODE").val();
	var P_EMATE_DT		= dataRow1.EMATE_DT.replace(/-/gi, "");
	var P_EMATE_NO 		= dataRow1.EMATE_NO;
	var P_EMATE_FLAG 	= dataRow1.EMATE_FLAG;
	
	//출력전표 발리데이션 체크
	if(dataRow1 == null){
		//출력할 납품 목록을 선택하세요.
		alert(msgSelectData);
		return;
	}
	
	if(P_EMATE_FLAG == "10" || P_EMATE_FLAG =="20"){
		var params = "?reportMode=HTML"+
					"&P_CORP_CODE="		+P_CORP_CODE+
					"&P_EMATE_DT="		+P_EMATE_DT+
					"&P_EMATE_FLAG="	+P_EMATE_FLAG+
					"&P_EMATE_NO="		+P_EMATE_NO; // AIViewer 파라미터
		
		window.open("aireportEstimatePrint.do" + params,'AIViewer','width=900,height=800,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	}else{
		alert("출력구분을 선택 해주세요.");
		return;
	}
}

$(document).ready(function () {
	
	//초기 팝업 사이즈 조절
	$("#pop_wrap1").dialog({
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
	
	//최초 도움말 불러오기
	setHelpMessage($(location).attr("pathname").replace("/",""));
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var date1 = new CommDateManager().getDate("yyyy-mm") + "-01";
	
	$("#S_GONG_DT").val(date1);
	$("#S_END_DT").val(date);
	
	// 달력체크
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var gongDt = parseInt($("#S_GONG_DT").val().replace(/-/g, ""));
			var endDt = parseInt($("#S_END_DT").val().replace(/-/g, ""));
			if(gongDt > endDt)
			{
				alert(msgStartDateAndEndDate);
				
				if(this.id == "S_GONG_DT")
					$("#S_GONG_DT").val(date1);
				else if(this.id == "S_END_DT")
					$("#S_END_DT").val(date);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
	// 숫자만 입력 처리
	try {
		
		CommonJs.addInputHandler({input:$("#P_TEL_NO_2"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#P_TEL_NO_3"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#P_SEND_TEL_NO_2"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#P_SEND_TEL_NO_3"), dataType:"N", maxlength:"4"});
    } catch(e) {
    	console.log(e);
    }
    
	getCommonCodeSelectBoxList("P_INDUST_FLAG", "INDUST_FLAG");		// 견적유형
	getCommonCodeSelectBoxList("P_PAY_TYPE", "PAY_TYPE");			// 지불조건
	getCommonCodeSelectBoxList("P_TEL_NO_1", "TEL_NO");				// 휴대폰번호 앞자리
	getCommonCodeSelectBoxList("P_SEND_TEL_NO_1", "TEL_NO");		// 휴대폰번호 앞자리
	
	$("#S_CUST_NAME").keydown(function(key) {
		
		if(key.keyCode == 13){
			btn_comm_user_search('S');
		}
	});
	
	//사업자등록번호 자동 하이픈
	$("#P_BUSI_NO").keyup(function(event) {
		var _val = this.value.trim();
		this.value = CommonJs.autoHypenBizNo(_val);
	});
	
	// 신규등록 버튼
	$("#btn_new").click(function(){
		
		frmReset();
		$("#P_TYPE").val("insert");
		
		copyFlag = false;
		fn_pop_open();
		
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		gridApp2.setData([]);
		getGridData(true);
	});
	
	// 저장 버튼 클릭
	$("#pop_btn_save").click(function() {
		updateEstimateInfo();
	});
	
	// VAT 이벤트
	/*$("input:radio[name='chk_user']").click(function() {
		
	});*/
	
	// 비회원 처리
	$("#P_NON_CUST").click(function() {
		
		if($(this).is(":checked") == true)
		{
			$("#userSearch_btn").attr("disabled", true);
			$("#P_CUST_NO").val("");
			$("#P_CUST_NAME").val("");
			
			$("#P_BUSI_NO").val("");
			$("#P_REP_NAME").val("");
			$("#P_UPTAE").val("");
			$("#P_UPJONG").val("");
			$("#P_POST_NO").val("");
			$("#P_ADDR").val("");
			$("#P_ADDR_DTL").val("");
			
			$("#P_TEL_NO_1").val("");		// 전화번호
			$("#P_TEL_NO_2").val("");		// 전화번호
			$("#P_TEL_NO_3").val("");		// 전화번호
			$("#P_EMAIL_1").val("");		// 이메일
			$("#P_EMAIL_2").val("");		// 이메일
		}
		else
		{
			$("#userSearch_btn").attr("disabled", false);
		}
	});
	
	// 신규 버튼 팝업 제어 js
	$(".box_lft, .box_rgt").width(429);
	
});