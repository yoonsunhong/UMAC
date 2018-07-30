/********************************************************
*   설명:  실사재고엑셀조정
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-05-03    문희훈       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/


// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars3 = "rMateOnLoadCallFunction=gridReadyHandler3";
var jsVars4 = "rMateOnLoadCallFunction=gridReadyHandler4";
var jsVars5 = "rMateOnLoadCallFunction=gridReadyHandler5";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid3", "gridHolder3", jsVars3, "100%","500px");
rMateGridH5.create("grid4", "gridHolder4", jsVars4, "100%","500px");
rMateGridH5.create("grid5", "gridHolder5", jsVars5, "100%","500px");

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1,	rowIndex1;
var gridApp3, gridRoot3, dataGrid3, dataRow3,clickData3,selectorColumn3, collection3,	rowIndex3;
var gridApp4, gridRoot4, dataGrid4, dataRow4,clickData4,selectorColumn4, collection4,	rowIndex4;
var gridApp5, gridRoot5, dataGrid5, dataRow5,clickData5,selectorColumn5, collection5,	rowIndex5;

var gridData1 =[];
var gridData3 =[];
var gridData4 =[];
var gridData5 =[];

var tabClickNum = "1";

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridApp1.setDataType("xml");
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp1.setData(gridData1);

	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	
}

//그리드1 layoutCompleteHandler1
function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}


//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//데이터 조회 및 엑셀 업로드 후 데이터 유효성 검사 실시
	checkData();
	
	//drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
}

//그리드1 레디 핸들러
function gridReadyHandler3(id) {
	// rMateGrid 관련 객체
	gridApp3 = document.getElementById(id); // 그리드를 포함하는 div 객체
	
	gridRoot3 = gridApp3.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp3.setLayout(layoutStr3);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp3.setData(gridData3);

	gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
	gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
	
}


function layoutCompleteHandler3() {
	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
}
//그리드1 컴플릿트 핸들러
function dataCompleteHandler3(event) {
	// 그리드 객체
	dataGrid3 = gridRoot3.getDataGrid(); 
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection3 = gridRoot3.getCollection();
}


//그리드1 레디 핸들러
function gridReadyHandler4(id) {
	// rMateGrid 관련 객체
	gridApp4 = document.getElementById(id); // 그리드를 포함하는 div 객체
	
	gridRoot4 = gridApp4.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp4.setLayout(layoutStr4);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp4.setData(gridData4);

	gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4);
	gridRoot4.addEventListener("dataComplete", dataCompleteHandler4);
	
}

function layoutCompleteHandler4() {
	dataGrid4 = gridRoot4.getDataGrid();  // 그리드 객체
}
//그리드1 컴플릿트 핸들러
function dataCompleteHandler4(event) {
	// 그리드 객체
	dataGrid4 = gridRoot4.getDataGrid(); 
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection4 = gridRoot4.getCollection();
}

//그리드1 레디 핸들러
function gridReadyHandler5(id) {
	// rMateGrid 관련 객체
	gridApp5 = document.getElementById(id); // 그리드를 포함하는 div 객체
	
	gridRoot5 = gridApp5.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp5.setLayout(layoutStr5);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp5.setData(gridData5);

	gridRoot5.addEventListener("layoutComplete", layoutCompleteHandler5);
	gridRoot5.addEventListener("dataComplete", dataCompleteHandler5);
	
}

function layoutCompleteHandler5() {
	dataGrid5 = gridRoot5.getDataGrid();  // 그리드 객체
}
//그리드1 컴플릿트 핸들러
function dataCompleteHandler5(event) {
	// 그리드 객체
	dataGrid5 = gridRoot5.getDataGrid(); 
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection5 = gridRoot5.getCollection();
}

//----------------------- 그리드 설정 끝 -----------------------


//<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="40" /> 넘버링을 하면 병합오류 발생
//그리드1 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle"  showDataTips="true" >\
		<groupedColumns>\
			<DataGridColumn id="colNo" dataField="No" itemRenderer="IndexNoItem" textAlign="center" width="40"  sortable="false"/>\
			<DataGridColumn id="STR_CODE" dataField="STR_CODE" headerText="'+storCode+'" textAlign="center" width="100"   visible="false"/>\
			<DataGridColumn id="STR_NAME" dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" width="100"  />\
			<DataGridColumn id="INV_DT" dataField="INV_DT" headerText="'+inventoryDate+'" textAlign="center" width="100"  visible="false"/>\
			<DataGridColumn id="INV_INSP_SCHD_ID" dataField="INV_INSP_SCHD_ID" headerText="'+dueDiligenceInventoryId+'" textAlign="center" visible="false"  />\
			<DataGridColumn id="LINE_CODE" dataField="LINE_CODE" headerText="'+lineCode+'" textAlign="center" width="100"  visible="false" />\
			<DataGridColumn id="MKT_GB_CODE" dataField="MKT_GB_CODE" headerText="'+storeTypeCode+'" textAlign="center" width="100"  visible="false" />\
			<DataGridColumn id="MKT_GB" dataField="MKT_GB" headerText="'+storeType+'" textAlign="center" width="100"  visible="false" />\
			<DataGridColumn id="VEN_CODE" dataField="VEN_CODE" headerText="'+venCode+'" textAlign="center" width="100"  visible="false" />\
			<DataGridColumn id="VEN_NAME" dataField="VEN_NAME"  headerText="'+venName+'" textAlign="left" width="150" />\
			<DataGridColumn id="SCAN_CODE" dataField="SCAN_CODE" headerText="'+scanningCode+'" textAlign="center" width="140"  />\
			<DataGridColumn id="ITM_CODE" dataField="ITM_CODE"  headerText="'+itmCode+'" textAlign="center" width="150" visible="false" />\
			<DataGridColumn id="ITM_NAME" dataField="ITM_NAME"  headerText="'+itmName+'" textAlign="left" width="150" />\
			<DataGridColumn id="CLS_NAME" dataField="CLS_NAME"  headerText="'+goodsCl+'" textAlign="center" width="100" />\
			<DataGridColumn id="PUR_SALE_QTY" dataField="PUR_SALE_QTY" headerText="'+purchaseSales+'"   textAlign="right" formatter="{numfmt}"  width="100"/>\
			<DataGridColumn id="BFR_INV_QTY" dataField="BFR_INV_QTY" headerText="조정전수량"   textAlign="right" formatter="{numfmt}"  width="100"/>\
			<DataGridColumn id="INV_END_QTY" dataField="INV_END_QTY"  headerText="'+accountingBookQuantity+'" textAlign="right" formatter="{numfmt}"   width="100" />\
			<DataGridColumn id="SURVEYQTY1" dataField="SURVEYQTY1"  headerText="1차수량"   textAlign="right" formatter="{numfmt}"   width="100" />\
			<DataGridColumn id="SURVEYQTY2" dataField="SURVEYQTY2"  headerText="2차수량"   textAlign="right" formatter="{numfmt}"   width="100" />\
			<DataGridColumn id="DEC_QTY" dataField="DEC_QTY"  headerText="'+fixedQuantity+'"   textAlign="right" formatter="{numfmt}"   width="100" />\
			<DataGridColumn id="LOSS_QTY" dataField="LOSS_QTY"  headerText="'+quantityDifference+'"   textAlign="right" formatter="{numfmt}"  width="100" />\
			<DataGridColumn id="BEFORE_LOSS_QTY" dataField="BEFORE_LOSS_QTY"  headerText="'+beforeQuantityDifference+'"   textAlign="right" formatter="{numfmt}"  width="100" />\
			<DataGridColumn id="WAMT" dataField="WAMT"  headerText="'+supplyUnitPrice+'" textAlign="right" formatter="{numfmt}"  width="100" />\
			<DataGridColumn id="SPRC" dataField="SPRC"  headerText="'+productSprc+'" textAlign="right" formatter="{numfmt}"  width="100" />\
			<DataGridColumn id="LOSS_WAMT" dataField="LOSS_WAMT"  headerText="'+differenceCost+'" textAlign="right" formatter="{numfmt}"  width="100" />\
			<DataGridColumn id="LOSS_SPRC" dataField="LOSS_SPRC"  headerText="'+differenceSellingPrice+'" textAlign="right" formatter="{numfmt}"  width="100" />\
			<DataGridColumn id="VALID_YN" dataField="VALID_YN"  headerText="체크플래그"  visible="false"/>\
			<DataGridColumn id="ITM_GB" dataField="ITM_GB"  headerText="체크플래그"  visible="false" editable="false" />\
			<DataGridColumn id="SEQ" dataField="SEQ"  headerText="SEQ"  visible="false" editable="false" />\
			<DataGridColumn id="DEC_QTY1" dataField="DEC_QTY1"  headerText="'+fixedQuantity+'"   textAlign="right" formatter="{numfmt}" visible="false"   />\
		</groupedColumns>\
		<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
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
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{PUR_SALE_QTY}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{BFR_INV_QTY}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{INV_END_QTY}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{SURVEYQTY1}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{SURVEYQTY2}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{DEC_QTY}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{LOSS_QTY}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{BEFORE_LOSS_QTY}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{WAMT}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{SPRC}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{LOSS_WAMT}"  textAlign="right"/>\
				<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{LOSS_SPRC}"  textAlign="right"/>\
			</DataGridFooter>\
		</footers>\
	</DataGrid>\
</rMateGrid>';





var layoutStr3 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#f3f3f3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="2" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto"    selectionMode="multipleCells"       >\
				<columns>\
					<DataGridColumn id="CD"   	labelJsFunction="labelFunc" 			dataField="CD" 					headerText="'+codeTop+'" 			textAlign="center"		width="80"/>\
					<DataGridColumn id="NM"   			dataField="NM"					headerText="'+categoryNmTop+'" 		textAlign="left"		width="80"/>\
					<DataGridColumn id="BASIC_SALE"   	dataField="BASIC_SALE" 			headerText="기초금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="PUR_WPRC"   	dataField="PUR_WPRC" 			headerText="매입금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="RTN_WPRC"   	dataField="RTN_WPRC" 			headerText="매입반품" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_SPRC"   	dataField="SALE_SPRC" 			headerText="매출금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DOUT_SPRC"   	dataField="DOUT_SPRC" 			headerText="대출금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DIN_SPRC"   	dataField="DIN_SPRC" 			headerText="대입금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="INV_END_SPRC"   dataField="INV_END_SPRC" 		headerText="기말재고매가" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="ADJ_SPRC" dataField="ADJ_SPRC" 			headerText="실사조사금액" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="INV_ADJ_SPRC"   dataField="INV_ADJ_SPRC" 		headerText="조정금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC"   	dataField="SALE_WPRC" 			headerText="원가계" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_PROFIT"   	dataField="SALE_PROFIT" 		headerText="매가계" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC_PER"  dataField="SALE_WPRC_PER" 		headerText="원가율" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="PROFIT"   		dataField="PROFIT"   			headerText="매익율(%)" 				textAlign="right"		formatter="{numfmt}" />\
					<DataGridColumn id="TAX_SALE_SPRC"  dataField="TAX_SALE_SPRC" 		headerText="매출이익" 					textAlign="right"		formatter="{numfmt}"/>\
				</columns>\
				<footers>\
					<DataGridFooter backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal" >\
						<DataGridFooterColumn  dataColumn="{CD}"   label="'+sm+'"  />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn dataColumn="{BASIC_SALE}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{PUR_WPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{RTN_WPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{SALE_SPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{DOUT_SPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{DIN_SPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{INV_END_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{ADJ_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{INV_ADJ_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{SALE_WPRC}" 		   	labelJsFunction="labelFunc_SALE_WPRC"  		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{SALE_PROFIT}" 	   	labelJsFunction="labelFunc_SALE_PROFIT"  	summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{SALE_WPRC_PER}" 	   	labelJsFunction="labelFunc_SALE_WPRC_PER"        formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{PROFIT}" 			labelJsFunction="labelFunc_PROFIT"   			 formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{TAX_SALE_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					</DataGridFooter>\
				</footers>\
			</DataGrid>\
	</rMateGrid>';

 






var layoutStr4 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#f3f3f3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="4" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto"        >\
				<columns>\
					<DataGridColumn id="LRG_CODE" 		dataField="LRG_CODE" 				headerText="'+codeTop+'" 			textAlign="center"	width="80"/>\
					<DataGridColumn id="LRG_NAME" 		dataField="LRG_NAME"				headerText="'+categoryNmTop+'" 		textAlign="left"	width="80"/>\
					<DataGridColumn id="CD" 			dataField="CD" 						headerText="'+codeMid+'" 			textAlign="center"	width="80"/>\
					<DataGridColumn id="NM" 			dataField="NM"						headerText="'+categoryNmMid+'" 		textAlign="left"	width="80"/>\
					<DataGridColumn id="BASIC_SALE" 	dataField="BASIC_SALE" 				headerText="기초금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="PUR_WPRC" 		dataField="PUR_WPRC" 				headerText="매입금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="RTN_WPRC" 		dataField="RTN_WPRC" 				headerText="매입반품" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_SPRC" 		dataField="SALE_SPRC" 				headerText="매출금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DOUT_SPRC" 		dataField="DOUT_SPRC" 				headerText="대출금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DIN_SPRC" 		dataField="DIN_SPRC" 				headerText="대입금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="INV_END_SPRC" 	dataField="INV_END_SPRC" 			headerText="기말재고매가" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="ADJ_SPRC" dataField="ADJ_SPRC" 			headerText="실사조사금액" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="INV_ADJ_SPRC" 	dataField="INV_ADJ_SPRC" 			headerText="조정금액" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC" 		dataField="SALE_WPRC" 				headerText="원가계" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_PROFIT" 	dataField="SALE_PROFIT" 			headerText="매가계" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC_PER" 	dataField="SALE_WPRC_PER" 			headerText="원가율" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="PROFIT" 		dataField="PROFIT"      			headerText="매익율(%)" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="TAX_SALE_SPRC" 	dataField="TAX_SALE_SPRC" 			headerText="매출이익" 					textAlign="right"		formatter="{numfmt}"/>\
				</columns>\
				<dataProvider>\
					<SpanSummaryCollection source="{$gridData}">\
						<mergingFields>\
							<SpanMergingField name="LRG_CODE">\
								<SpanSummaryRow label="'+subTotal+'" labelDataField="LRG_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
									<SpanSummaryField dataField="BASIC_SALE" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="PUR_WPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="RTN_WPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="DOUT_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="DIN_SPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="INV_END_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="ADJ_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="INV_ADJ_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_WPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_PROFIT" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="PROFIT" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="TAX_SALE_SPRC" 	summaryOperation="SUM" />\
								</SpanSummaryRow>\
							</SpanMergingField>\
							<SpanMergingField name="LRG_NAME"/>\
						</mergingFields>\
					</SpanSummaryCollection>\
				</dataProvider>\
				<footers>\
				<DataGridFooter backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal" >\
					<DataGridFooterColumn  dataColumn="{CD}"   label="'+sm+'"  />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn dataColumn="{BASIC_SALE}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PUR_WPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{RTN_WPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_SPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{DOUT_SPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{DIN_SPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{INV_END_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{ADJ_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{INV_ADJ_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_WPRC}" 		   	labelJsFunction="labelFunc_SALE_WPRC"  		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_PROFIT}" 	   	labelJsFunction="labelFunc_SALE_PROFIT"  	summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_WPRC_PER}" 	   	labelJsFunction="labelFunc_SALE_WPRC_PER"        formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PROFIT}" 			labelJsFunction="labelFunc_PROFIT"   			 formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{TAX_SALE_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
				</DataGridFooter>\
			</footers>\
			</DataGrid>\
	</rMateGrid>';

var layoutStr5 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#f3f3f3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="6" />\
		<SpanCellAttribute id="sumTotalCellAttr2" colNo="2" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="4" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto">\
				<columns>\
					<DataGridColumn id="LRG_CODE" 		dataField="LRG_CODE" 				headerText="'+codeTop+'" 			textAlign="center"		width="80"/>\
					<DataGridColumn id="LRG_NAME" 		dataField="LRG_NAME"				headerText="'+categoryNmTop+'" 		textAlign="left"		width="80"/>\
					<DataGridColumn id="MID_CODE" 		dataField="MID_CODE" 				headerText="'+codeMid+'" 			textAlign="center"		width="80"/>\
					<DataGridColumn id="MID_NAME" 		dataField="MID_NAME"				headerText="'+categoryNmMid+'" 		textAlign="left"		width="80"/>\
					<DataGridColumn id="CD" 			dataField="CD" 						headerText="'+codeBotton+'" 		textAlign="center"/>\
					<DataGridColumn id="NM" 			dataField="NM"						headerText="'+categoryNmBotton+'" 	textAlign="left"/>\
					<DataGridColumn id="BASIC_SALE" 	dataField="BASIC_SALE" 				headerText="기초금액" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="PUR_WPRC" 		dataField="PUR_WPRC" 				headerText="매입금액" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="RTN_WPRC" 		dataField="RTN_WPRC" 				headerText="매입반품" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_SPRC" 		dataField="SALE_SPRC" 				headerText="매출금액" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DIN_SPRC" 		dataField="DIN_SPRC" 				headerText="대입금액" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="INV_END_SPRC" 	dataField="INV_END_SPRC" 			headerText="기말재고매가" 		textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="ADJ_SPRC" dataField="ADJ_SPRC" 			headerText="실사조사금액" 				textAlign="right"		formatter="{numfmt}"/>\					<DataGridColumn id="DOUT_SPRC" 		dataField="DOUT_SPRC" 				headerText="대출금액" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="INV_ADJ_SPRC" 	dataField="INV_ADJ_SPRC" 			headerText="조정금액" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC" 		dataField="SALE_WPRC" 				headerText="원가계" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_PROFIT" 	dataField="SALE_PROFIT" 			headerText="매가계" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC_PER" 	dataField="SALE_WPRC_PER" 			headerText="원가율" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="PROFIT" 		dataField="PROFIT"    				headerText="매익율(%)" 		textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="TAX_SALE_SPRC" 	dataField="TAX_SALE_SPRC" 			headerText="매출이익" 			textAlign="right"		formatter="{numfmt}"/>\
				</columns>\
				<dataProvider>\
					<SpanSummaryCollection source="{$gridData}">\
						<mergingFields>\
							<SpanMergingField name="LRG_CODE">\
								<SpanSummaryRow label="'+subTotal+'" labelDataField="LRG_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
									<SpanSummaryField dataField="BASIC_SALE" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="PUR_WPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="RTN_WPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="DOUT_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="DIN_SPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="INV_END_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="ADJ_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="INV_ADJ_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_WPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_PROFIT" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="PROFIT" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="TAX_SALE_SPRC" 	summaryOperation="SUM" />\
								</SpanSummaryRow>\
							</SpanMergingField>\
							<SpanMergingField name="LRG_NAME"/>\
							<SpanMergingField name="MID_CODE">\
								<SpanSummaryRow label="'+subTotal+'" labelDataField="MID_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr2}">\
									<SpanSummaryField dataField="BASIC_SALE" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="PUR_WPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="RTN_WPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="DOUT_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="DIN_SPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="INV_END_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="ADJ_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="INV_ADJ_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_WPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_PROFIT" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="PROFIT" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="TAX_SALE_SPRC" 	summaryOperation="SUM" />\
								</SpanSummaryRow>\
							</SpanMergingField>\
							<SpanMergingField name="MID_NAME"/>\
						</mergingFields>\
					</SpanSummaryCollection>\
				</dataProvider>\
				<footers>\
				<DataGridFooter backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal" >\
					<DataGridFooterColumn  dataColumn="{CD}"   label="'+sm+'"  />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn dataColumn="{BASIC_SALE}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PUR_WPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{RTN_WPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_SPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{DOUT_SPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{DIN_SPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{INV_END_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{ADJ_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{INV_ADJ_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_WPRC}" 		   	labelJsFunction="labelFunc_SALE_WPRC"  		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_PROFIT}" 	   	labelJsFunction="labelFunc_SALE_PROFIT"  	summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_WPRC_PER}" 	   	labelJsFunction="labelFunc_SALE_WPRC_PER"        formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PROFIT}" 			labelJsFunction="labelFunc_PROFIT"   			 formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{TAX_SALE_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
				</DataGridFooter>\
			</footers>\
			</DataGrid>\
	</rMateGrid>';

// ----------------------- 그리드 설정 끝 -------------------------------------


//########################################################
//###	8. init ( 시작 )   							   												###
//########################################################

$(document).ready(function(){
	
	init();
	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var loadData= {};
	// 점포코드 가져오기
	$("#iframeCnt select[name=P_STR_NAME]").append('<option value="">'+ select +'</option>');
	
	getCateCodeSelectBoxList("P_POP_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_POP_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_POP_CLS_CODE"   , "3" ,  ""   );    // 소 분류
	
	
	jQuery.ajax({
	    type:"POST",
	    url:"/getSelectStoreCode.do", 
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:loadData,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#P_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
				 $("#P_POP_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});

	
	// 대 중 소 분류 바인딩  : 첫번째인자=html오브젝트     두번째인자=대(1)중(2)소(3) 구분      세번째인자=분류 구분 코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. 
	$("#iframeCnt select[name=P_LRG_CODE]").append('<option value="">'+ all +'</option>'); 
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류     
	/********************************************************
	 * 조사범위 SELECT BOX 리스트를 생성한다. 대중소리스트 박스 사용가능
	 * SELECTBOX_ID		:  html오브젝트ID        
	 * CATE_GUBUN	    :  대(1)중(2)소(3) 구분
	 * CATE_CODE        :  분류코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. ex) 010101
	 ******************************************************/

	
	$("#excelFile").on('change', function(){
		
		//엑셀파일이 업로드 되었을때 실행
	    if($("#excelFile").val() != ""){
	    	//엑셀 폼 서브밋
	    	checkFile();
	    }
	    
	});
	
	// 팝업의 조회조건절의 협력업체에서 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        } 
	});
	// 팝업의 조회조건절의 상품에서 엔터시 상품검색되게....
	$("input[name=P_ITEM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_product_search();
        } 
	});
	
	//행추가 팝업(상품재고수량등록)
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	//미리보기 버튼
	$("#pop_wrap2").dialog({
		autoOpen : false,
		modal : true,
		width : "95%",
//		height :"50%",
		height :750,
		resizable : false,
		open: function(){
			$("body").css("overflow-y", "hidden");
		},
		close: function(){
			$("body").css("overflow-y", "scroll");
		}
	});
	
	$("#bt_tab1").click(function(){
		tabClickNum = "1";
		$("#P_TAB").val("1");
	});		
	$("#bt_tab2").click(function(){
		tabClickNum = "2";
		$("#P_TAB").val("2");
	});		
	$("#bt_tab3").click(function(){
		tabClickNum = "3";
		$("#P_TAB").val("3");
	});		
	
	//숫자만 입력
	CommonJs.addInputHandler({input:$("#P_DIFF_CNT"), dataType:"N", maxlength:10});
	/** 
	 * input 숫자와 콤마만 입력되게 하기. 
	 * 매우중요 : jquery.number.js 파일 인크루드하기
	 * include js : jquery.number.js
	 * input 속성에 numberOnly 추가
	 * jsp : <input type="text" id="amount" name="amount" numberOnly placeholder="0" />
	 * $(this).number(true);
	 * $.number( 5020.2364 );				// Outputs 5,020
	 * $.number( 5020.2364, 2 );			// Outputs: 5,020.24
	 * $.number( 135.8729, 3, ',' );		// Outputs: 135,873
	 * $.number( 5020.2364, 1, ',', ' ' );	// Outputs: 5 020,2 
	 */
	$('#P_DIFF_CNT').number( true);
	
	
	$('#P_POP_INV_QTY').number( true);
	$("#P_POP_SPRC").number( true, 0 );
	
	/**
	 * 실사재고등록 스캔 또는 입력시
	 * 13자리일경우 스캔번호에 대한 상품정보 조회
	 * 6자리경우 생식 상품정보 조회
	  */
	$("#P_POP_SCAN_CODE").on('keyup', function(){

		if($("#P_POP_STR_CODE").val()==""){
			$("#P_POP_SCAN_CODE").val("");
			//점포는 필수입력 입니다.
			alert(stockRealMent4);
			$('#P_POP_STR_NAME').focus();
			
			return;
		}
		
		//팝업 데이터 초기화
		clearePop();
		var postValue ={};	
		postValue = { 
				 "P_STR_CODE"			: $("#P_POP_STR_CODE").val(),
				 "P_POP_SCAN_CODE"	: $("#P_POP_SCAN_CODE").val()
		};
		var P_INV_INSP_GB = $("#P_INV_DT option:selected").data("p_inv_insp_gb");
		if(($("#P_POP_SCAN_CODE").val().length == 13) || ($("#P_POP_SCAN_CODE").val().length == 6)){
	    	jQuery.ajax({
			    type:"POST",
			    url:"/getProductDtlInfo.do",
			    dataType:"JSON",  
			    data:postValue,
			    async:false,
			    success : function(data) {
			    	if(data.length == 1){
			    		if(data[0].ITM_GB != "1"  && P_INV_INSP_GB == "2"){  
			    			alert("생식조사에는 생식상품만 저장 가능합니다.");
			    			$("#P_POP_SCAN_CODE").val("");
			    			return;
			    		}else{
			    			$("#P_POP_ITM_NAME").val(data[0].ITM_NAME);
			    			$("#P_POP_CLS_NAME").val(data[0].CLS_NAME);
			    			$("#P_POP_UNIT").val(data[0].UNIT);
			    			//3자리마다 콤마
			    			$("#P_POP_SPRC").val(data[0].SPRC.format());
			    			$("#P_POP_VEN_NAME").val(data[0].VEN_NAME);
			    			$("#P_POP_VEN_CODE").val(data[0].VEN_CODE);
			    			$("#P_POP_ITM_CODE").val(data[0].ITM_CODE);
			    			
			    			//정보를 불러왔을경우 수량입력을 위한 포커스 처리
			    			$('#P_POP_INV_QTY').focus();
			    			if($("#P_POP_SCAN_CODE").val().length == 6){
			    				$("#P_POP_SPRC").removeAttr("disabled");
			    			}else{
			    				$("#P_POP_SPRC").attr("disabled","true");
			    			}
			    			return;
			    		}
			    	}else{
			    		//직매입상품이 아닙니다. 스캐닝코드를 확인하세요. 생식의 경우 6자리 생식이 아닐경우 계속 입력 가능하게
			    		if($("#P_POP_SCAN_CODE").val().length != 6){
			    			alert(stockRealMent26);
			    			$("#P_POP_SCAN_CODE").val("");
			    			return;
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
	});
	//팝업매장구분
	getCommonCodeSelectBoxList("pop_wrap1 select[name=P_POP_MKT_GB]", "MKT_GB");
});

function btn_preview() {
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	if($("#P_INV_DT").val()=="" || $("#P_INV_DT").val() == null){
		//재고실사일이 존재하지 않습니다.
		alert(stockExcelMent3);
		$('#P_INV_DT').focus();
		return;
	}
	
	$('#pop_wrap2').dialog( 'open' );
	gridApp3.resize();
	gridApp4.resize();
	gridApp5.resize();
    gridRoot3.removeAll( );
    gridRoot4.removeAll( );
    gridRoot5.removeAll( );
}
function pop2_close() {
	$("#pop_wrap2").dialog("close");
}	


function labelFunc(item, value, column){
	var str = value;
	if( str == "01" || str == "02" || str == "03"   )
    {
		item.SALE_WPRC_PER =     100 - item.PROFIT ; 
    }
	return moneyComma(String(str));
}


//달성율
function perFunction12(item, value, column){
	var num1 = (item["SALE_PROFIT"] / item["SALE_SPRC"]) * 100;
	debugger;
	return perFunction(num1);    
}
var G_SALE_WPRC   = 0;
var G_SALE_PROFIT = 0;  

function labelFunc_SALE_WPRC(item, value, column)
{
	G_SALE_WPRC   =  value  ; 
	return value;
}

function labelFunc_SALE_PROFIT(item, value, column)
{
	G_SALE_PROFIT =  value  ; 
	return value;
}

//원가율 :  (원가계/매가계) * 100 , 소수3자리에서  반올림
function labelFunc_SALE_WPRC_PER(item, value, column)
{
	var pTab	=	$("#P_TAB").val();
	if(pTab =="2"){
		var src =gridRoot4.getChangedData(true);
		
		for (var i = 0; i < src.length; i++){
			var  dataSet = src[i].data;
			if(  dataSet.LRG_CODE == "01"  ||  dataSet.LRG_CODE == "02" ||  dataSet.LRG_CODE == "03"  )
			{
				gridRoot4.setItemFieldAt(   ( 100 -  gridRoot4.getItemFieldAt( i , "PROFIT")  ).toFixed(2)   , i, "SALE_WPRC_PER");
				
			}
		}
		
		for (var i = 0; i < src.length; i++){
			var  dataSet = src[i].data;
			if(dataSet.LRG_CODE == "소계"){
				var sum = (dataSet.SALE_WPRC/dataSet.SALE_PROFIT*100).toFixed(2);
				if(dataSet.SALE_PROFIT == "0" || dataSet.SALE_PROFIT == 0 ){
					sum=0;
				}
				gridRoot4.setItemFieldAt( sum , i, "SALE_WPRC_PER");
				gridRoot4.setItemFieldAt((100 - sum).toFixed(2) , i, "PROFIT");
			} 
		}
		
		
		
	}
	
	if(pTab =="3"){
		var src =gridRoot5.getChangedData(true);
		
		for (var i = 0; i < src.length; i++){
			var  dataSet = src[i].data;
			if(  dataSet.LRG_CODE == "01"  ||  dataSet.LRG_CODE == "02" ||  dataSet.LRG_CODE == "03"   )
			{
				gridRoot5.setItemFieldAt(   ( 100 -  gridRoot5.getItemFieldAt( i , "PROFIT")  ).toFixed(2)   , i, "SALE_WPRC_PER");
				
			}
		}
		
	 
		
		for (var i = 0; i < src.length; i++){
			var  dataSet = src[i].data;
			if(dataSet.LRG_CODE == "소계"    || dataSet.MID_CODE == "소계"   ){
				var sum = (dataSet.SALE_WPRC/dataSet.SALE_PROFIT*100).toFixed(2);
				if(dataSet.SALE_PROFIT == "0" || dataSet.SALE_PROFIT == 0 ){
					sum=0;
				}
				gridRoot5.setItemFieldAt( sum , i, "SALE_WPRC_PER");
				gridRoot5.setItemFieldAt((100 - sum).toFixed(2) , i, "PROFIT");
			}
		}
	}
	
	var rt = ( G_SALE_WPRC / G_SALE_PROFIT ) * 100 ;
	return  rt.toFixed(2)  ;
	 
} 


// 매익율 : 100-원가율, 소수3자리에서  반올림
function labelFunc_PROFIT()
{
	var rt =     100 -  ( ( G_SALE_WPRC / G_SALE_PROFIT ) * 100  ) ; 
	return  rt.toFixed(2)  ;
}


function pop2_search(){
	
	//재고조사일정ID의 재고실사등록 확정 여부 체크
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
//	if(dataCnt == 0){
//		//확정할 데이터가 없습니다.
//		alert("데이터가 없습니다.");
//		return;
//	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	loadData.P_INV_INSP_SCHD_ID = loadData.P_INV_DT.replace(/-/gi, '');
	loadData.P_INV_DT = $("#P_INV_DT option:selected").text().replace(/-/gi, '');
	loadData.P_LRG_CODE = $("#P_POP_LRG_CODE").val();
	loadData.P_MID_CODE = $("#P_POP_MID_CODE").val();
	loadData.P_CLS_CODE = $("#P_POP_CLS_CODE").val();
	
	jQuery.ajax({ 
	    url:"/stockRealExcelPreview.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: loadData,
		beforeSend : function(){ 	    
			if(tabClickNum == "1"){
				gridRoot3.addLoadingBar();		
			}else if(tabClickNum == "2"){
				gridRoot4.addLoadingBar();		
			}else if(tabClickNum == "3"){
				gridRoot5.addLoadingBar();		
			}
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
	       	if(tabClickNum == "1"){
				gridApp3.setData(data);			
				dataGrid3.setEnabled(true);
		       	gridRoot3.removeLoadingBar();		
			}else if(tabClickNum == "2"){
				gridApp4.setData(data);			
				dataGrid4.setEnabled(true);
		       	gridRoot4.removeLoadingBar();	
			}else if(tabClickNum == "3"){
				gridApp5.setData(data);			
				dataGrid5.setEnabled(true);
		       	gridRoot5.removeLoadingBar();	
			}	    
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	if(tabClickNum == "1"){
		dataGrid3.exportFileName = "재고결과현황_"+majorCategory+date+".xlsx";
		gridRoot3.excelExportSave("/gridExcelDown.do", false);		
	}else if(tabClickNum == "2"){
		dataGrid4.exportFileName = "재고결과현황_"+middleCategory+date+".xlsx";
		gridRoot4.excelExportSave("/gridExcelDown.do", false);
	}else if(tabClickNum == "3"){
		dataGrid5.exportFileName = "재고결과현황_"+subCategory+date+".xlsx";
		gridRoot5.excelExportSave("/gridExcelDown.do", false);
	}
}

//달성율
function perFunction12(item, value, column){
	var num1 = (item["SALE_PROFIT"] / item["SALE_SPRC"]) * 100;
	debugger;
	return perFunction(num1);    
}

function chgCate1(){ 
	$("select[name='P_POP_CLS_CODE'] option").remove();
	$("#P_POP_CLS_CODE").prepend("<option value=''>"+select+"</option>");
	   
	getCateCodeSelectBoxList("P_POP_MID_CODE","2",$('#P_POP_LRG_CODE' ).val());	 
}
function chgCate2(){	
	var num1 = $('#P_POP_MID_CODE' ).val().substr(0,2);
	$("#P_POP_LRG_CODE").val(num1).prop("selected", true);
		
	getCateCodeSelectBoxList("P_POP_CLS_CODE","3",$('#P_POP_MID_CODE' ).val());
}
function chgCate3(){	
	var num1 = $('#P_POP_CLS_CODE' ).val().substr(0,2);
	var num2 = $('#P_POP_CLS_CODE' ).val().substr(0,4);
	$("#P_POP_LRG_CODE").val(num1).prop("selected", true);
	$("#P_POP_MID_CODE").val(num2).prop("selected", true);		
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	$("#SET_VEN_CODE").val( $("#P_VEN_CODE").val() );
	if($("#P_ITEM_NAME").val() != null && $("#P_ITEM_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITEM_NAME").val());
		btn_comm_search('2');
	}
}


//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
}

//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#P_ITEM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
}


//점포명 변경 EVENT
function fnStrChange(){
	
	//그리드1 데이터 초기화 
	 gridRoot1.removeAll( );
	
	 $("#P_STR_CODE").val($("#P_STR_NAME").val());
	 
	 if($("#P_STR_NAME").val() == ""){
		  $("#P_INV_DT").find("option").remove();
		  $("#P_INV_BEFORE_DT").find("option").remove();
		  $("#iframeCnt select[name=P_INV_DT]").append('<option value="">'+ select +'</option>');
		  $("#iframeCnt select[name=P_INV_BEFORE_DT]").append('<option value="">'+ select +'</option>');
		  $("#P_INV_BEFORE_ID").val("");
	 }else{
		 
		var postValue ={};	
		postValue = { 
				  		"STR_CODE" : $("#P_STR_CODE").val() 
					};
		jQuery.ajax({
		    type:"POST",
		    url:"/getInvInspDtList.do",
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	
		    	$("#P_INV_DT").find("option").remove();
		    	
				for(var i = 0; i < data.length; i++){
					 $("#P_INV_DT").append('<option data-CFM_FLAG="' + data[i].CFM_FLAG + '" data-P_INV_INSP_GB="' + data[i].INV_INSP_GB + '" value="' + data[i].INV_INSP_SCHD_ID + '">' + data[i].INV_DT + '</option>'); 
			   	}
				
				//전 재고조사일 조회
				fnInvDtChange();
		    }, 
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	 }
}


//재고조사일정 ID 변경 EVENT
function fnInvDtChange(){
	
	//그리드1  데이터 초기화 
	gridRoot1.removeAll( );

	//조사일정 아이디 NULL일시 조사일자 초기화 
	if($("#P_INV_DT").val() == ""){
		$("#iframeCnt select[name=P_INV_BEFORE_DT]").append('<option value="">'+ select +'</option>');
		$("#P_INV_BEFORE_ID").val("");
	} else {
		 
		var postValue ={};	
		postValue = { 
						"P_INV_DT"		: $("#P_INV_DT").val()
					  , "P_STR_CODE"	: $("#P_STR_CODE").val()
					};
			
		jQuery.ajax({
		    type:"POST",
		    url:"/getInvBeforeDtList.do",
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	$("#P_INV_BEFORE_DT").find("option").remove();
		    	$("#P_INV_BEFORE_ID").val("");
		    	
		    	if(data.length <= 0) {
		    		$("#iframeCnt select[name=P_INV_BEFORE_DT]").append('<option value="">없음</option>');
		    	} else {
		    		for(var i = 0; i < data.length; i++){
		    			if(i == 0) {
		    				$("#P_INV_BEFORE_ID").val(data[i].INV_INSP_SCHD_ID);
		    			}
		    			
		    			$("#P_INV_BEFORE_DT").append('<option value="' + data[i].INV_INSP_SCHD_ID + '">' + data[i].INV_DT + '</option>');
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
	
}


function fnInvBeforeDtChange() {
	$("#P_INV_BEFORE_ID").val($("#P_INV_BEFORE_DT").val());
}


function init() {

	
	
}

  

//########################################################
//###   상단 버튼 구현								   ###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$(".ui-dialog-titlebar").text("실사재고조정(업로드) 미리보기");
	$("#gridHolder1").height( $(window).height() - 125);

	$(window).on('resize',function (){	
		$("#gridHolder1").height( $(window).height() - 125 );
	});
});

//탭1을 선택 했을때의 그리드1 조회
function tab1_search(){
	//var nStart = new Date().getTime();      //시작시간 체크(단위 ms)
	//var nEnd;
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	if($("#P_INV_DT").val()=="" || $("#P_INV_DT").val() == null){
		//재고실사일이 존재하지 않습니다.
		alert(stockExcelMent3);
		$('#P_INV_DT').focus();
		return;
	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	loadData.P_INV_INSP_SCHD_ID = loadData.P_INV_DT.replace(/-/gi, ''); 
	
	if(($.trim(loadData.P_VEN_NAME) == "" || $.trim(loadData.P_VEN_NAME) == null) &&
			   ($.trim(loadData.P_LRG_CODE) == "" || $.trim(loadData.P_LRG_CODE) == null))
	{
		alert("협력업체 또는 상품분류를 선택 해 주세요.");
		return;
	}
			
	
	//실사재고 조회
	jQuery.ajax({ 
	    url:"/getStockRealExcelList.do",         
	    type:"POST",
		datatype:"xml",
		//async:false,
		data: loadData, 
		beforeSend : function(){ 
			//로딩바 show
			showLoadingBar();
	    }, 
		success:function(data){  
			
			//그리드 JSON으로 변경
//			gridApp1.setDataType("json");
//			gridApp1.setLayout(layoutStr1);
			
			//그리드1 초기화
			gridRoot1.removeAll();
			
            for(var i=0 ; i < data.length ; i++ )
			{ 
				/*XML 기본 구성 헤더 시작*/
				var firstTag="<GRIDROW></GRIDROW>";  
				if (window.DOMParser)
			    {   parser = new DOMParser();
			        xmlDoc = parser.parseFromString(firstTag,"text/xml");
				}
				else // 인터넷 익스플로러
				{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				    xmlDoc.async=false;
			        xmlDoc.loadXML(firstTag); 
			    }  
				/*XML 기본 구성 헤더 끝*/
				var INPUT_YN 				= xmlDoc.createElement("INPUT_YN");
				var STR_CODE 				= xmlDoc.createElement('STR_CODE');
				var STR_NAME 				= xmlDoc.createElement('STR_NAME');
				var INV_DT 					= xmlDoc.createElement('INV_DT');
				var INV_INSP_SCHD_ID		= xmlDoc.createElement('INV_INSP_SCHD_ID');
				var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
				var MKT_GB_CODE 			= xmlDoc.createElement('MKT_GB_CODE'); 
				var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
				var VEN_CODE				= xmlDoc.createElement('VEN_CODE'); 
				var VEN_NAME 				= xmlDoc.createElement('VEN_NAME');
				var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE'); 
				var ITM_CODE 				= xmlDoc.createElement('ITM_CODE'); 
				var ITM_NAME 				= xmlDoc.createElement('ITM_NAME'); 
				var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
				var PUR_SALE_QTY 			= xmlDoc.createElement('PUR_SALE_QTY');
				var INV_END_QTY 			= xmlDoc.createElement('INV_END_QTY');
				
				var BFR_INV_QTY				= xmlDoc.createElement('BFR_INV_QTY');
				
				var SURVEYQTY1 				= xmlDoc.createElement('SURVEYQTY1');
				var SURVEYQTY2 				= xmlDoc.createElement('SURVEYQTY2');
				var DEC_QTY 				= xmlDoc.createElement('DEC_QTY');
				var LOSS_QTY 				= xmlDoc.createElement('LOSS_QTY');
				var BEFORE_LOSS_QTY 		= xmlDoc.createElement('BEFORE_LOSS_QTY');
				var WAMT 					= xmlDoc.createElement('WAMT');
				var SPRC 					= xmlDoc.createElement('SPRC');
				var LOSS_WAMT 				= xmlDoc.createElement('LOSS_WAMT');
				var LOSS_SPRC 				= xmlDoc.createElement('LOSS_SPRC');
				var VALID_YN 				= xmlDoc.createElement('VALID_YN');
				var ITM_GB 					= xmlDoc.createElement('ITM_GB');
				var SEQ 					= xmlDoc.createElement('SEQ');
				var DEC_QTY1 				= xmlDoc.createElement('DEC_QTY1');
				 
				INPUT_YN.appendChild(xmlDoc.createTextNode("N"));
				STR_CODE.appendChild(xmlDoc.createTextNode(data[i].STR_CODE));
				STR_NAME.appendChild(xmlDoc.createTextNode(data[i].STR_NAME));
				INV_DT.appendChild(xmlDoc.createTextNode(data[i].INV_DT));
				INV_INSP_SCHD_ID.appendChild(xmlDoc.createTextNode(data[i].INV_INSP_SCHD_ID));
				LINE_CODE.appendChild(xmlDoc.createTextNode(data[i].LINE_CODE));
				MKT_GB_CODE.appendChild(xmlDoc.createTextNode(data[i].MKT_GB_CODE));
				MKT_GB.appendChild(xmlDoc.createTextNode(data[i].MKT_GB));
				VEN_CODE.appendChild(xmlDoc.createTextNode(data[i].VEN_CODE));
				VEN_NAME.appendChild(xmlDoc.createTextNode(data[i].VEN_NAME));
				SCAN_CODE.appendChild(xmlDoc.createTextNode(data[i].SCAN_CODE));
				ITM_CODE.appendChild(xmlDoc.createTextNode(data[i].ITM_CODE));
				ITM_NAME.appendChild(xmlDoc.createTextNode(data[i].ITM_NAME));
				CLS_NAME.appendChild(xmlDoc.createTextNode(data[i].CLS_NAME));
				PUR_SALE_QTY.appendChild(xmlDoc.createTextNode(data[i].PUR_SALE_QTY));
				INV_END_QTY.appendChild(xmlDoc.createTextNode(data[i].INV_END_QTY));
				
				BFR_INV_QTY.appendChild(xmlDoc.createTextNode(data[i].BFR_INV_QTY));
				
				SURVEYQTY1.appendChild(xmlDoc.createTextNode(data[i].SURVEYQTY1));
				SURVEYQTY2.appendChild(xmlDoc.createTextNode(data[i].SURVEYQTY2)); 
				DEC_QTY.appendChild(xmlDoc.createTextNode(data[i].DEC_QTY)); 
				LOSS_QTY.appendChild(xmlDoc.createTextNode(data[i].LOSS_QTY));
				BEFORE_LOSS_QTY.appendChild(xmlDoc.createTextNode(data[i].BEFORE_LOSS_QTY));
				WAMT.appendChild(xmlDoc.createTextNode(data[i].WAMT));
				SPRC.appendChild(xmlDoc.createTextNode(data[i].SPRC));
				LOSS_WAMT.appendChild(xmlDoc.createTextNode(data[i].LOSS_WAMT));
				LOSS_SPRC.appendChild(xmlDoc.createTextNode(data[i].LOSS_SPRC));
				VALID_YN.appendChild(xmlDoc.createTextNode(	data[i].VALID_YN));
				ITM_GB.appendChild(xmlDoc.createTextNode(	data[i].ITM_GB));
				SEQ.appendChild(xmlDoc.createTextNode(	data[i].SEQ));
				DEC_QTY1.appendChild(xmlDoc.createTextNode(	data[i].DEC_QTY));
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_DT);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_INSP_SCHD_ID);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SALE_QTY);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BFR_INV_QTY);
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEYQTY1);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEYQTY2);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_QTY);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BEFORE_LOSS_QTY);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WAMT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_WAMT);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_SPRC);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VALID_YN);    
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_GB);    
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);    
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY1);    
				
				//xml데이터 형변환 후 row add
				gridRoot1.addItemAt(  xmlDoc  , -1 , false);
				var selectedItem = gridRoot1.getItemAt(i);
				gridRoot1.removeChangedData(selectedItem);
				
			}		
			
			
			
			
//			gridApp1.setData(data);
			
            //로딩바 숨기기
            hideLoadingBar();

		},
	    complete : function(data) {
	    	//nEnd =  new Date().getTime();      //종료시간 체크(단위 ms)
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	//var nDiff = nEnd - nStart;      //두 시간차 계산(단위 ms)
	//alert(nDiff + "ms");
	
}




//엑셀 업로드
function excelUpload(){
	
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	
	$("#excelFile").val("");
	$('#excelFile').trigger('click');
	
}

//파일형식 체크 (엑셀만)
function checkFile(){
	
	//엑셀 업로드 플래그 체크 초기화
	if($("#excelFile").val()==""){
		//엑셀파일을 선택하세요.
		alert(stockRealMent9);
		return;
	}
	
	if( $("#excelFile").val() != "" ){
		var ext = $('#excelFile').val().split('.').pop().toLowerCase();
	    if($.inArray(ext, ['xls','xlsx']) == -1) {
	    	//xls,xlsx 파일만 업로드 할수 있습니다.
	    	alert(stockRealMent10);
			$("#excelFile").val("");
			return;
	    }
	}
	
	$("#PARAM1").val($("#P_STR_CODE").val());
	//P_INV_INSP_SCHD_ID 파라미터 셋팅
	$("#PARAM2").val($("#P_INV_DT").val().replace(/-/gi, ''));
	$("#PARAM3").val($("#P_INV_BEFORE_ID").val());
	$("#PARAM4").val("2");
	$("#PARAM5").val($("#P_INV_DT option:selected").data("p_inv_insp_gb"));
	
	//업로드 하시겠습니까?
	if (confirm(stockRealMent11)) {
		
		//엑셀 업로드 체크 플러그 N 처리
		$("#VALID_YN").val("N");
		
		//그리드1 로딩바 호출
		showLoadingBar();
        var options = {
            success : function(data) {
            	
            	//그리드 XML로 변경
//            	gridApp1.setDataType("xml");
//                gridApp1.setLayout(layoutStr1);
            	
            	$("#VALID_YN").val(data.VALID_YN);
            	//alert(data.VALID_YN);
                //그리드 로딩바 숨기기
                hideLoadingBar();
                
                //xml포맷 데이터 변경으로 인한 주석
                //gridApp1.setData(data.list);
                
                //업로드 완료후 그리드1,2 모두 초기화
                gridRoot1.removeAll( );
                for(var i=0 ; i < data.CUR.length ; i++ )
    			{ 
    				/*XML 기본 구성 헤더 시작*/
    				var firstTag="<GRIDROW></GRIDROW>";  
    				if (window.DOMParser)
    			    {   parser = new DOMParser();
    			        xmlDoc = parser.parseFromString(firstTag,"text/xml");
    				}
    				else // 인터넷 익스플로러
    				{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    				    xmlDoc.async=false;
    			        xmlDoc.loadXML(firstTag); 
    			    }  
    				/*XML 기본 구성 헤더 끝*/
    				var STR_CODE 				= xmlDoc.createElement('STR_CODE');
    				var STR_NAME 				= xmlDoc.createElement('STR_NAME');
    				var INV_DT 					= xmlDoc.createElement('INV_DT');
    				var INV_INSP_SCHD_ID		= xmlDoc.createElement('INV_INSP_SCHD_ID');
    				var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
    				var MKT_GB_CODE 			= xmlDoc.createElement('MKT_GB_CODE'); 
    				var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
    				var VEN_CODE				= xmlDoc.createElement('VEN_CODE'); 
    				var VEN_NAME 				= xmlDoc.createElement('VEN_NAME');
    				var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE'); 
    				var ITM_CODE 				= xmlDoc.createElement('ITM_CODE'); 
    				var ITM_NAME 				= xmlDoc.createElement('ITM_NAME'); 
    				var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
    				var PUR_SALE_QTY 			= xmlDoc.createElement('PUR_SALE_QTY');
    				var INV_END_QTY 			= xmlDoc.createElement('INV_END_QTY');  
    				var SURVEYQTY1 				= xmlDoc.createElement('SURVEYQTY1');
    				var SURVEYQTY2 				= xmlDoc.createElement('SURVEYQTY2');
    				var DEC_QTY 				= xmlDoc.createElement('DEC_QTY');
    				var LOSS_QTY 				= xmlDoc.createElement('LOSS_QTY');
    				var BEFORE_LOSS_QTY 		= xmlDoc.createElement('BEFORE_LOSS_QTY');
    				var WAMT 					= xmlDoc.createElement('WAMT');
    				var SPRC 					= xmlDoc.createElement('SPRC');
    				var LOSS_WAMT 				= xmlDoc.createElement('LOSS_WAMT');
    				var LOSS_SPRC 				= xmlDoc.createElement('LOSS_SPRC');
    				var VALID_YN 				= xmlDoc.createElement('VALID_YN');
    				var DEC_QTY1 				= xmlDoc.createElement('DEC_QTY1');
    				 
    				STR_CODE.appendChild(			xmlDoc.createTextNode( 	data.CUR[i].STR_CODE			));
    				STR_NAME.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].STR_NAME			));
    				INV_DT.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].INV_DT				));
    				INV_INSP_SCHD_ID.appendChild(   xmlDoc.createTextNode( 	data.CUR[i].INV_INSP_SCHD_ID	));
    				LINE_CODE.appendChild(  		xmlDoc.createTextNode( 	data.CUR[i].LINE_CODE  			));
    				MKT_GB_CODE.appendChild(  		xmlDoc.createTextNode(	data.CUR[i].MKT_GB_CODE			));
    				MKT_GB.appendChild(  			xmlDoc.createTextNode(	data.CUR[i].MKT_GB 				));
    				VEN_CODE.appendChild( 			xmlDoc.createTextNode(	data.CUR[i].VEN_CODE 			));
    				VEN_NAME.appendChild( 			xmlDoc.createTextNode(	data.CUR[i].VEN_NAME 			));
    				SCAN_CODE.appendChild(  		xmlDoc.createTextNode( 	data.CUR[i].SCAN_CODE			));
    				ITM_CODE.appendChild( 			xmlDoc.createTextNode(	data.CUR[i].ITM_CODE 			));
    				ITM_NAME.appendChild( 			xmlDoc.createTextNode(	data.CUR[i].ITM_NAME 			));
    				CLS_NAME.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].CLS_NAME  			));
    				PUR_SALE_QTY.appendChild( 		xmlDoc.createTextNode(	data.CUR[i].PUR_SALE_QTY		));
    				INV_END_QTY.appendChild(		xmlDoc.createTextNode(	data.CUR[i].INV_END_QTY			));
    				SURVEYQTY1.appendChild( 		xmlDoc.createTextNode(	data.CUR[i].SURVEYQTY1   		)); 
    				SURVEYQTY2.appendChild( 		xmlDoc.createTextNode(	data.CUR[i].SURVEYQTY2   		)); 
    				DEC_QTY.appendChild( 			xmlDoc.createTextNode(	data.CUR[i].DEC_QTY   			)); 
    				LOSS_QTY.appendChild(			xmlDoc.createTextNode(	data.CUR[i].LOSS_QTY	    	));
    				BEFORE_LOSS_QTY.appendChild(	xmlDoc.createTextNode(	data.CUR[i].BEFORE_LOSS_QTY		));
    				WAMT.appendChild(				xmlDoc.createTextNode(	data.CUR[i].WAMT				));
    				SPRC.appendChild(				xmlDoc.createTextNode(	data.CUR[i].SPRC				));
    				LOSS_WAMT.appendChild(			xmlDoc.createTextNode(	data.CUR[i].LOSS_WAMT 			));
    				LOSS_SPRC.appendChild(			xmlDoc.createTextNode(	data.CUR[i].LOSS_SPRC 			));
    				VALID_YN.appendChild(			xmlDoc.createTextNode(	data.CUR[i].VALID_YN			));
    				DEC_QTY1.appendChild(			xmlDoc.createTextNode(	data.CUR[i].DEC_QTY				));
    				
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_DT);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_INSP_SCHD_ID);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SALE_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEYQTY1);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEYQTY2);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BEFORE_LOSS_QTY);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WAMT);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_WAMT);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_SPRC);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VALID_YN);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY1);   
    				
    				//xml데이터 형변환 후 row add
    				gridRoot1.addItemAt(  xmlDoc  , -1 , false);
    			}
    			
                
                if(data.VALID_YN == "Y"){
                	//모든 데이터가 업로드 되었습니다. \n내용 확인 후 저장하여 서버에 등록하세요.
                	alert(stockRealMent12+"\n"+stockRealMent13);
                }else{
                	//엑셀 업로드 데이터 형식이 잘못 되었습니다.\n데이터를 올바르게 수정 한 뒤 엑셀업로드를 하세요.
                	alert(stockExcelMent4+'\n'+stockExcelMent5);
                }
                
            },
            error : function(xhr, status, error){
            	CommonJs.alertErrorStatus(xhr.status, error);
            	hideLoadingBar();
            },
            datatype:"json",
            type : "POST"
        };
        
        $("#frmUpload").attr("action", "/stockExcelUpload.do");
        $("#frmUpload").ajaxSubmit(options);

    }
	//$("#frmUpload").attr("action", "/stockGridExcelUpload.do");
	//$("#frmUpload").submit();
	//checkData();
}

//엑셀업로드시 유효성체크에 걸린 row 체크하여 색갈칠하기
function checkData(){
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	var valueCheckCnt = 0;
	for (var i = 0; i < dataCnt; i++) {
		var VALID_YN = gridRoot1.getItemFieldAt( i , "VALID_YN");	
		if(VALID_YN =="N"){
			 collection1.addRowAttributeDetailAt(i , "", "#ff6666", "", false, '');
			 //alert(rowData.SCAN_CODE);
			 
			 valueCheckCnt++;
			 
			 //문제가 발생시 플래그 N
			 $("#VALID_YN").val("N");
		}
	};
	
	if(valueCheckCnt == 0){
		//모든 검증작업 후 데이터 이상이 없을경우 플래그 Y
		 $("#VALID_YN").val("Y");
	}
	
	
}


//그리드 로딩바  보이기
function showLoadingBar() {
    gridRoot1.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar() {
    gridRoot1.removeLoadingBar();
}


//탭1 저장
function tab1_saveCheck(){
	
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	

	
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	//재고조사일정ID의 재고실사등록 확정 여부 체크
	if($("#P_INV_DT option:selected").data("cfm_flag")=="2"){
		//선택하신 재고실사조사가 완료되어 수정 할 수 없습니다.
		alert(stockRealMent8);
		return;
	}

	
	if(dataCnt == 0){
		//저장할 데이터가 없습니다.
		alert(stockRealMent17);
		return;
	}
	
	//데이터 유효성 검사
	checkData();
	
	if($("#VALID_YN").val()=="N"){
		//엑셀 업로드 데이터 형식이 잘못 되었습니다.\n데이터를 올바르게 수정 한 뒤 엑셀업로드를 하세요.
		alert(stockExcelMent4+'\n'+stockExcelMent5);
		return;
	}
	
	//엑셀 업로드 유무 체크
		if(gridRoot1.dataType == 'json' ){
			//업로드된 엑셀데이터가 없습니다.
//			alert(stockExcelMent6);
			alert("변경된 항목이 없습니다.");
			return;
	}
	
		var gridXmlData1 = "";
		//실사재고등록 데이터  XML로 뽑기  - xml
		var rowCnt  = gridRoot1.getCollection().getSource() ;  
		for(var i = 0; i < rowCnt.length ; i++)
		   {  // 발주 삭제 - 슬립넘버를 xml 로  만든다.  
		       
		         var firstTag="<GRIDROW></GRIDROW>";  
		         if (window.DOMParser)
		          {   parser = new DOMParser();
		              xmlDoc = parser.parseFromString(firstTag,"text/xml");
		         }
		         else // 인터넷 익스플로러
		         {   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		             xmlDoc.async=false;
		              xmlDoc.loadXML(firstTag); 
		          }  
		          
		         var STR_CODE      = xmlDoc.createElement('STR_CODE');   
		         STR_CODE.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "STR_CODE")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      STR_CODE       );   
		          
		          var INV_DT      = xmlDoc.createElement('INV_DT');   
		          INV_DT.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "INV_DT")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      INV_DT       );   
		          
		          var INV_INSP_SCHD_ID      = xmlDoc.createElement('INV_INSP_SCHD_ID');   
		          INV_INSP_SCHD_ID.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "INV_INSP_SCHD_ID")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      INV_INSP_SCHD_ID       );   
		          
		          var LINE_CODE      = xmlDoc.createElement('LINE_CODE');   
		          LINE_CODE.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "LINE_CODE")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      LINE_CODE       );   
		          
		          var MKT_GB_CODE      = xmlDoc.createElement('MKT_GB_CODE');   
		          MKT_GB_CODE.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "MKT_GB_CODE")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      MKT_GB_CODE       );   
		          
		          var ITM_CODE      = xmlDoc.createElement('ITM_CODE');   
		          ITM_CODE.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "ITM_CODE")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      ITM_CODE       );   
		          
		          var SCAN_CODE      = xmlDoc.createElement('SCAN_CODE');   
		          SCAN_CODE.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "SCAN_CODE")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      SCAN_CODE       );   
		          
		          var DEC_QTY      = xmlDoc.createElement('DEC_QTY');   
		          DEC_QTY.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "DEC_QTY")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      DEC_QTY       );   
		          
		          var INV_END_QTY      = xmlDoc.createElement('INV_END_QTY');   
		          INV_END_QTY.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "INV_END_QTY")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      INV_END_QTY       );   
		          
		          var WAMT      = xmlDoc.createElement('WAMT');   
		          WAMT.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "WAMT")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      WAMT       );   
		          
		          var SPRC      = xmlDoc.createElement('SPRC');   
		          SPRC.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "SPRC")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      SPRC       );   
		          
		          var INPUT_YN      = xmlDoc.createElement('INPUT_YN');   
		          INPUT_YN.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "INPUT_YN")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      INPUT_YN       );
		          
		          var SEQ      = xmlDoc.createElement('SEQ');   
		          SEQ.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "SEQ")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      SEQ       );   
		          
		          var ITM_GB      = xmlDoc.createElement('ITM_GB');   
		          ITM_GB.appendChild( xmlDoc.createTextNode(        gridRoot1.getItemFieldAt( i , "ITM_GB")     )   );   
		          xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(      ITM_GB       );   
		          
		          gridXmlData1 = gridXmlData1 + getXmlString(   xmlDoc   );
		   } 
		
		gridXmlData1 =  "<GRIDLIST>"+gridXmlData1+"</GRIDLIST>" ;
	
	var loadData = $("#top_search").serializeAllObject();
	loadData.gridXmlData1 = gridXmlData1;
	
	//저장하시겠습니까?
	if(confirm(msgSaveConfirm) == false) return;
	
	//실사재고 저장
	jQuery.ajax({ 
	    url:"/saveStockExcelData.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: loadData, 
		success:function(data){  
			//결과리턴
			var obj = jQuery.parseJSON(data.CUR);
			if(  obj[0].RETURN_CODE  == "0000")
			{   
				//저장되었습니다.
				alert(msgSave);
				//조회
				tab1_search();
			}else{
				//요청중 문제가 발생했습니다.관리자에게 문의하세요.
				alert(msgErrorDefault);
				return;
			}
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
		
	
}
 




//탭2 그리드 확정
function tab1_saveFinishCheck(){
	
	//재고조사일정ID의 재고실사등록 확정 여부 체크
	if($("#P_INV_DT option:selected").data("cfm_flag")=="2"){
		//선택하신 재고실사조사가 완료되어 수정 할 수 없습니다.
		alert(stockRealMent8);
		return;
	}
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//확정할 데이터가 없습니다.
		alert(stockRealMent18);
		return;
	}
	var loadData = $("#top_search").serializeAllObject();
	
	//일곡점(2017-001) 재고조사를 확정처리 하시겠습니까?
	if(confirm($("#P_STR_NAME option:selected").text()+"("+ $("#P_INV_DT").val() +") "+stockRealMent20+'\n'+"확정 후 더 이상 수정이 불가능 합니다.") == false) return;
	
	
	jQuery.ajax({ 
	    url:"/confirmStockRealExcelFinish.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: loadData, 
		success:function(data){   
			//결과리턴
			var obj = jQuery.parseJSON(data.CUR);
			if(  obj[0].RETURN_CODE  == "0000")
			{   
				//확정처리되었습니다.
				alert(mentWmsIn8);
				//조회
				tab1_search();
				$("#P_INV_DT option:selected").data("cfm_flag","2");
			}else{
				//요청중 문제가 발생했습니다.관리자에게 문의하세요.
				alert(msgErrorDefault);
				return;
			}
			
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//alert(gridXmlData2);
	//alert("확정");
	
}

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################



// 엑셀 export (엑셀다운로드 그리드기능 이용)
//excelExportSave(url:String, async:Boolean);
// url : 업로드할 서버의 url, 기본값 null
// async : 비동기 모드로 수행여부, 기본값 false
function ExcelDownload1() {
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	
	//엑셀다운 필드 지정
	//dataGrid1.exportColumns = [1,2,3,4,6,10,12,18,22,14,15,19,20,23,28];
	dataGrid1.exportColumns = [1,2,3,4,6,10,12,19,22,14,15,18,20,23,28];//2차수량(18)/확정수량(19) 위치 바꿈.
	dataGrid1.exportFileName = "실사재고엑셀등록_"+$("#P_STR_NAME option:selected").text()+"_"+$("#P_INV_DT option:selected").text()+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
	
};

function btnExcell() {
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	dataGrid1.exportColumns = [];
	dataGrid1.exportFileName = "실사재고엑셀등록_"+$("#P_STR_NAME option:selected").text()+"_"+$("#P_INV_DT option:selected").text()+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
	
};

//행추가 팝업 오픈
function btn_popup() {
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	$('#pop_wrap1').dialog( 'open' );
	
	//그리드 XML로 변경
//	gridApp1.setDataType("xml");
//    gridApp1.setLayout(layoutStr1);
	
    //업로드 완료후 그리드1,2 모두 초기화
//    gridRoot1.removeAll( );
	
	//팝업오픈시 스캔코드 포커스 
	$('#P_POP_SCAN_CODE').focus();
	$('#P_POP_SCAN_CODE').val("");
	
	$("#P_POP_STR_NAME").val("");
	//팝업 점포 선택
	fnPopStrChange();
	
	//팝업 데이터 초기화
	clearePop();
}

//실사재고등록 팝업 닫기
function pop1_close() {
	$("#pop_wrap1").dialog("close");
}	


//팝업 점포선택 이벤트
function fnPopStrChange(){
	
	if($("#P_STR_CODE").val() == "00000"){
		$("#P_POP_STR_NAME").removeAttr('disabled');
	}else{
		$("#P_POP_STR_NAME").val($("#P_STR_CODE").val());
		$("#P_POP_STR_CODE").val($("#P_POP_STR_NAME").val());
		$("#P_POP_STR_NAME").attr("disabled", 'disabled');
	}
	fnSelectChangeText();
	
}

function fnSelectChangeText(){
	
	$("#P_POP_STR_CODE").val($("#P_POP_STR_NAME").val());
}

//팝업 데이터 초기화
function clearePop(){
	$('#P_POP_INV_QTY').val("");
	$('#P_POP_MKT_GB').val("1");
	
	$('#P_POP_ITM_NAME').val("");
	$('#P_POP_CLS_NAME').val("");
	$('#P_POP_UNIT').val("");
	$('#P_POP_SPRC').val("");
	$('#P_POP_VEN_NAME').val("");
	$('#P_POP_SPRC').attr("disabled","true");
}

function pop1_save() {
	
	if($("#P_POP_STR_CODE").val()==""){
		//점포는 필수입력 입니다.
		alert(stockRealMent4);
		$('#P_POP_STR_NAME').focus();
		return;
	}
	
	if($("#P_POP_SCAN_CODE").val()==""){
		//스캐닝 코드는 필수입력 입니다.
		alert(stockRealMent24);
		$('#P_POP_SCAN_CODE').focus();
		return;
	}
	if($("#P_POP_INV_QTY").val()==0){
		//조사수량은 필수입력 입니다.
		alert(stockRealMent25);
		$('#P_POP_INV_QTY').focus();
		return;
	}
	if($("#P_POP_ITM_NAME").val()==""){
		//조회된 상품이 없습니다. 스캐닝코드를 확인하세요.
		alert(stockRealMent28);
		return;
	}
	
	//소팅상태에서는 행추가가 되지 않으므로 초기화
	collection1.setSort(null);
	// collection 정보를 새로고침합니다.
	collection1.refresh();
	

	
	//P_INV_INSP_SCHD_ID 파라미터 셋팅
	var P_INV_DT =$("#P_INV_DT").val().replace(/-/gi, '');
	var P_INV_INSP_SCHD_ID =$("#P_INV_DT option:selected").text().replace(/-/gi, '');
	
	var postValue = { 
			  "P_STR_CODE"	: $("#P_STR_CODE").val()
			, "P_INV_DT"	: P_INV_INSP_SCHD_ID
			, "P_INV_BEFORE_ID" : $("#P_INV_BEFORE_ID").val()
			, "P_INV_INSP_SCHD_ID" : P_INV_DT
			, "P_POP_SCAN_CODE" : $("#P_POP_SCAN_CODE").val()
			, "P_POP_INV_QTY" : $("#P_POP_INV_QTY").val()
			, "P_POP_MKT_GB" : $("#P_POP_MKT_GB").val()
			, "P_POP_ITM_CODE" : $("#P_POP_ITM_CODE").val()
			, "P_POP_SPRC" : $("#P_POP_SPRC").val()
			, "P_LINE_CODE" : "0"
	};
	jQuery.ajax({
	    type:"POST",
	    url:"/stockExcelUploadSave.do",
	    dataType:"JSON",  
	    data:postValue,
	    async:false,
	    success : function(data) {
//	        gridApp1.setDataType("xml");
//	        gridApp1.setLayout(layoutStr1);
	    	/*XML 기본 구성 헤더 시작*/
	    	
	    	
	    	var firstTag="<GRIDROW></GRIDROW>";  
	    	if (window.DOMParser)
	    	{   parser = new DOMParser();
	    	xmlDoc = parser.parseFromString(firstTag,"text/xml");
	    	}
	    	else // 인터넷 익스플로러
	    	{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	    	xmlDoc.async=false;
	    	xmlDoc.loadXML(firstTag); 
	    	}  
	    	/*XML 기본 구성 헤더 끝*/
	    	var STR_CODE 				= xmlDoc.createElement('STR_CODE');
	    	var STR_NAME 				= xmlDoc.createElement('STR_NAME');
	    	var INV_DT 					= xmlDoc.createElement('INV_DT');
	    	var INV_INSP_SCHD_ID		= xmlDoc.createElement('INV_INSP_SCHD_ID');
	    	var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
	    	var MKT_GB_CODE 			= xmlDoc.createElement('MKT_GB_CODE'); 
	    	var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
	    	var VEN_CODE					= xmlDoc.createElement('VEN_CODE'); 
	    	var VEN_NAME 				= xmlDoc.createElement('VEN_NAME');
	    	var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE'); 
	    	var ITM_CODE 				= xmlDoc.createElement('ITM_CODE'); 
	    	var ITM_NAME 				= xmlDoc.createElement('ITM_NAME'); 
	    	var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
	    	var PUR_SALE_QTY 			= xmlDoc.createElement('PUR_SALE_QTY');
	    	var INV_END_QTY 			= xmlDoc.createElement('INV_END_QTY');  
	    	var DEC_QTY 					= xmlDoc.createElement('DEC_QTY');
	    	var LOSS_QTY 				= xmlDoc.createElement('LOSS_QTY');
	    	var BEFORE_LOSS_QTY 	= xmlDoc.createElement('BEFORE_LOSS_QTY');
	    	var WAMT 						= xmlDoc.createElement('WAMT');
	    	var SPRC 						= xmlDoc.createElement('SPRC');
	    	var LOSS_WAMT 				= xmlDoc.createElement('LOSS_WAMT');
	    	var LOSS_SPRC 				= xmlDoc.createElement('LOSS_SPRC');
	    	var VALID_YN 					= xmlDoc.createElement('VALID_YN');
			var ITM_GB 					= xmlDoc.createElement('ITM_GB');
			var SEQ 					= xmlDoc.createElement('SEQ');
			var DEC_QTY1 					= xmlDoc.createElement('DEC_QTY1');
	    	
			STR_CODE.appendChild(  				xmlDoc.createTextNode( 	data[0].STR_CODE				));
			STR_NAME.appendChild(  				xmlDoc.createTextNode( 	data[0].STR_NAME				));
			INV_DT.appendChild(  					xmlDoc.createTextNode( 	data[0].INV_DT					));
			INV_INSP_SCHD_ID.appendChild(    	xmlDoc.createTextNode( 	data[0].INV_INSP_SCHD_ID  	));
			LINE_CODE.appendChild(  				xmlDoc.createTextNode( 	data[0].LINE_CODE  			));
			MKT_GB_CODE.appendChild(  			xmlDoc.createTextNode(	data[0].MKT_GB_CODE			));
			MKT_GB.appendChild(  					xmlDoc.createTextNode(	data[0].MKT_GB 					));
			VEN_CODE.appendChild( 				xmlDoc.createTextNode(	data[0].VEN_CODE 				));
			VEN_NAME.appendChild( 				xmlDoc.createTextNode(	data[0].VEN_NAME 				));
			SCAN_CODE.appendChild(  			xmlDoc.createTextNode( 	data[0].SCAN_CODE			));
			ITM_CODE.appendChild( 				xmlDoc.createTextNode(	data[0].ITM_CODE 				));
			ITM_NAME.appendChild( 				xmlDoc.createTextNode(	data[0].ITM_NAME 				));
			CLS_NAME.appendChild(  				xmlDoc.createTextNode( 	data[0].CLS_NAME  			));
			PUR_SALE_QTY.appendChild( 			xmlDoc.createTextNode(	data[0].PUR_SALE_QTY		));
			INV_END_QTY.appendChild(			xmlDoc.createTextNode(	data[0].INV_END_QTY			));
			DEC_QTY.appendChild( 					xmlDoc.createTextNode(	data[0].DEC_QTY   				)); 
			LOSS_QTY.appendChild(				xmlDoc.createTextNode(	data[0].LOSS_QTY	    		));
			BEFORE_LOSS_QTY.appendChild(		xmlDoc.createTextNode(	data[0].BEFORE_LOSS_QTY	));
			WAMT.appendChild(						xmlDoc.createTextNode(	data[0].WAMT					));
			SPRC.appendChild(						xmlDoc.createTextNode(	data[0].SPRC						));
			LOSS_WAMT.appendChild(				xmlDoc.createTextNode(	data[0].LOSS_WAMT 			));
			LOSS_SPRC.appendChild(				xmlDoc.createTextNode(	data[0].LOSS_SPRC 			));
			VALID_YN.appendChild(					xmlDoc.createTextNode(	data[0].VALID_YN				));
			ITM_GB.appendChild(					xmlDoc.createTextNode(	data[0].ITM_GB				));
			SEQ.appendChild(					xmlDoc.createTextNode(	data[0].SEQ				));
			DEC_QTY1.appendChild(					xmlDoc.createTextNode(	data[0].DEC_QTY				));

	    	
	    	
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_DT);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_INSP_SCHD_ID);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SALE_QTY);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_QTY);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BEFORE_LOSS_QTY);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WAMT);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_WAMT);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_SPRC);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VALID_YN);
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_GB);    
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);    	    	
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY1);    	    	
	    	
	    	// 0 : 맨위에 추가 ,  -1 :맨 아래에 추가 
	    	gridRoot1.addItemAt(  xmlDoc  , -1 , false);
	    	
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
		

	
	
	//계속등록기능 변경으로 주석처리
	//$("#pop_wrap1").dialog("close");
	
	//팝업내용 초기화 처리
	clearePop();
	$('#P_POP_SCAN_CODE').val("");
	//새로운 스캔코드 입력을 위한 포커스 처리
	$('#P_POP_SCAN_CODE').focus();
}	


/********************************************************
 * 분류공통코드의 SELECT BOX 리스트를 생성한다. 대중소리스트 박스 사용가능
 * SELECTBOX_ID		:  html오브젝트ID        
 * CATE_GUBUN	    :  대(1)중(2)소(3) 구분
 * CATE_CODE        :  분류코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. ex) 010101
 ******************************************************/
function getCateCodeSelectBoxList(SELECTBOX_ID , CATE_GUBUN, CATE_CODE ){
	var postValue ={};	
	postValue = { 
			  "CATE_GUBUN"	: CATE_GUBUN 
			, "CATE_CODE"	: CATE_CODE  
	};
	 
	jQuery.ajax({
	    type:"POST",
	    url:"/getCateCodeSelectBoxList.do",
	    dataType:"JSON",  
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	$("select[name="+SELECTBOX_ID+"   ] option").remove();
	    	$("#"+SELECTBOX_ID).append('<option value="">'+all+'</option>'); 
			for(var i = 0; i < data.length; i++){
				 $("#"+SELECTBOX_ID).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function clearVenCode(){
	if($('#P_VEN_NAME').val() == "" )
	{
		$('#P_VEN_CODE').val("");
	}
}



//엑셀다운을 위한 폼 생성 함수
jQuery.download = function(url, data, method){
	// url과 data를 입력받음
	if( url && data ){ 
	    // data 는  string 또는 array/object 를 파라미터로 받는다.
	    data = typeof data == 'string' ? data : jQuery.param(data);
	    // 파라미터를 form의  input으로 만든다.
	    var inputs = '';
	    jQuery.each(data.split('&'), function(){ 
	        var pair = this.split('=');
	        inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
	    });
	    // request를 보낸다.
	    jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
	    .appendTo('body').submit().remove();
	};
};

//XML스트링 변환
function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

//숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function(){
    if(this==0) return 0;
 
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
 
    return n;
};
 
// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0";
 
    return num.format();
};


//XML 형태로 데이터 넣기
function changeXMLData() {
    gridApp1.setDataType("xml");
    gridApp1.setLayout(layoutStr1);
    gridApp1.setData(gridData1);
}

//JSON 형태로 데이터 넣기
function changeJSONData() {
	gridApp1.setDataType("json");
	gridApp1.setLayout(layoutStr1);
	gridApp1.setData(gridData1);
}