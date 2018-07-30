/********************************************************
 * 설명:  재고결과현황(분류)
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.05.29
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2;
var gridApp3, gridRoot3, dataGrid3, dataRow3, clickData3;

var gridApp4, gridRoot4, dataGrid4, dataRow4, clickData4;

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
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid2", "gridHolder2", jsVars1);
rMateGridH5.create("grid3", "gridHolder3", jsVars1);
rMateGridH5.create("grid4", "gridHolder4", jsVars1, "100%", "340px");   
//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

var gridData1ClickStrCode = "";

var tabClickNum = "1";	//점포별 영업사원 회원그룹 클릭했을때 값 1,2,3

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	}else if(id == "grid2"){
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		dataGrid2 = gridRoot2.getDataGrid(); // 그리드 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp2.setLayout(layoutStr2);
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);	
		
		
		
		
	}else if(id == "grid3"){
		// rMateGrid 관련 객체
		gridApp3 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot3 = gridApp3.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp3.setLayout(layoutStr3);
		
		
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex; 
			dataRow3 = gridRoot3.getItemAt(rowIndex); 
//			$('#VEN_CODE').val(	   dataRow3["CD"] 	 		); 
//			$('#VEN_NAME').val(    dataRow3["VEN_NAME"]  			);  
			 
			showProductPop( dataRow3["CD"] );
			
			//orderHeadDtailInfo( dataRow2["STR_CODE"] , dataRow2["SLIP_NO"] , dataRow2["PUR_GB"] ,  dataRow2["SLIP_DIV_YN"] ); 
		}; 
		
		var layoutCompleteHandler3 = function(event) {
			dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체 
			dataGrid3.addEventListener("itemDoubleClick", itemClickHandler); 	
			
		};  
		
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);	
		
	} else if(id == "grid4"){
		 
		// rMateGrid 관련 객체
		gridApp4 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot4 = gridApp4.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp4.setLayout(layoutStr4);
		gridApp4.setData(gridData4);
		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow4 = gridRoot4.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid4.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData4 = dataRow4[dataField];
			 
		}; 
		//그리드4 핸들러
		var layoutCompleteHandler4 = function(event) {
			dataGrid4 = gridRoot4.getDataGrid();	// 그리드 객체 
			//그리드4 셀선택 이벤트
//			dataGrid4.addEventListener("itemClick", itemClickHandler); 
			
//			$("#S_VEN").focus(); 
			
		}; 
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4); 
		 
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}
function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}

//function layoutCompleteHandler3() {
//	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
//	
//	dataGrid3.addEventListener("itemClick", itemClickHandler); 
//}


function showProductPop(CD){ 
     
//	$("select[name=STR_CODE   ] option").remove();
//	$("#STR_CODE" ).append('<option value="">전체</option>'); 
 	
//	getStoreCode("STR_CODE");
	

	gridRoot4.removeAll();
	
//	var rowIndex = dataGrid1.getSelectedIndex();
//	dataRow1 = gridRoot1.getItemAt(rowIndex); 	 
//	if( rowIndex == -1 )
//	{
//		alert("왼쪽 그리드에서 협력업체를 선택 하세요.");
//		return;
//	} 
//	$("#SHOW_VEN_NAME").text( "- " + dataRow1.VEN_NAME );
	    
	$( "#show_product_pop" ).dialog( 'open' );		   
	gridApp4.resize();  // 이걸해줘야지 레이어 팝업에 그리드가 제대로 나타난다.
	
	
	salesAnalProductList();
	
	// venProductList(   );
} 	









var gridData4 = [];

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#f3f3f3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="2" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto"    selectionMode="multipleCells"       >\
				<columns>\
					<DataGridColumn id="CD"   							dataField="CD" 						headerText="'+codeTop+'" 				textAlign="center"	width="80"/>\
					<DataGridColumn id="NM"   							dataField="NM"							headerText="'+categoryNmTop+'" 		textAlign="left"			width="80"/>\
					<DataGridColumn id="BASE_WPRC"   				dataField="BASE_WPRC" 			headerText="기초원가" 						textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="PUR_WPRC"   					dataField="PUR_WPRC" 				headerText="'+purchaseCost+'" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="RTM_WPRC"   					dataField="RTM_WPRC" 				headerText="반품원가" 						textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC"   				dataField="SALE_WPRC" 			headerText="'+selngPrimeCost+'" 		textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="NET_SALE_SPRC"   			dataField="NET_SALE_SPRC" 		headerText="'+sellingSprc+'" 				textAlign="right"		formatter="{numfmt}" 	/>\
					<DataGridColumn id="DIN_WPRC"   					dataField="DIN_WPRC" 				headerText="'+dePrmpc+'" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DOUT_WPRC"   				dataField="DOUT_WPRC" 			headerText="'+loanPrmpc+'" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="NEXT_BASE_WPRC"   		dataField="NEXT_BASE_WPRC" 	headerText="월말재고원가" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="NEXT_BASE_SPRC"   		dataField="NEXT_BASE_SPRC" 	headerText="월말재고매가" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_OWN_TOTAL"   		dataField="SALE_OWN_TOTAL" 	headerText="원가계" 							textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_MAGA_TOTAL"  		dataField="SALE_MAGA_TOTAL" 	headerText="매가계" 							textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="COST_RATE"  					dataField="COST_RATE"  			headerText="원가율(%)"  					textAlign="right" 	 	/>\
					<DataGridColumn id="PROFIT_RATE"  				dataField="PROFIT_RATE"   		headerText="매익율(%)" 					textAlign="right"		/>\
					<DataGridColumn id="PROFIT_AMT"  				dataField="PROFIT_AMT" 			headerText="'+selngProfit+'" 				textAlign="right"		formatter="{numfmt}" />\
				</columns>\
				<footers>\
					<DataGridFooter backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal" >\
						<DataGridFooterColumn  dataColumn="{CD}"   label="'+sm+'" textAlign="center" />\
						<DataGridFooterColumn/>\
						<DataGridFooterColumn dataColumn="{BASE_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{PUR_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{RTM_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{SALE_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{NET_SALE_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{DIN_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{DOUT_WPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{NEXT_BASE_WPRC}" 	summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{NEXT_BASE_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{SALE_OWN_TOTAL}" 	labelJsFunction="labelFunc_SALE_OWN_TOTAL"  summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{SALE_MAGA_TOTAL}" 	labelJsFunction="labelFunc_SALE_MAGA_TOTAL"  summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{COST_RATE}" 				labelJsFunction="labelFunc_COST_RATE" 	  textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{PROFIT_RATE}" 			labelJsFunction="labelFunc_PROFIT_RATE"   textAlign="right"  />\
						<DataGridFooterColumn dataColumn="{PROFIT_AMT}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					</DataGridFooter>\
				</footers>\
			</DataGrid>\
	</rMateGrid>';

 






var layoutStr2 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#f3f3f3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="4" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto"        >\
				<columns>\
					<DataGridColumn id="LRG_CODE" 			dataField="LRG_CODE" 				headerText="'+codeTop+'" 				textAlign="center"	width="80"/>\
					<DataGridColumn id="LRG_NAME" 			dataField="LRG_NAME"				headerText="'+categoryNmTop+'" 		textAlign="left"			width="80"/>\
					<DataGridColumn id="CD" 						dataField="CD" 						headerText="'+codeMid+'" 					textAlign="center"	width="80"/>\
					<DataGridColumn id="NM" 						dataField="NM"							headerText="'+categoryNmMid+'" 		textAlign="left"			width="80"/>\
					<DataGridColumn id="BASE_WPRC"   		dataField="BASE_WPRC" 			headerText="기초원가" 						textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="PUR_WPRC"   			dataField="PUR_WPRC" 				headerText="'+purchaseCost+'" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="RTM_WPRC"   			dataField="RTM_WPRC" 				headerText="반품원가" 						textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC"   		dataField="SALE_WPRC" 			headerText="'+selngPrimeCost+'" 		textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="NET_SALE_SPRC"    dataField="NET_SALE_SPRC" 		headerText="'+sellingSprc+'" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DIN_WPRC"   			dataField="DIN_WPRC" 				headerText="'+dePrmpc+'" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DOUT_WPRC"   		dataField="DOUT_WPRC" 			headerText="'+loanPrmpc+'" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="NEXT_BASE_WPRC"  dataField="NEXT_BASE_WPRC" 	headerText="월말재고원가" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="NEXT_BASE_SPRC"   dataField="NEXT_BASE_SPRC" 	headerText="월말재고매가" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_OWN_TOTAL"  dataField="SALE_OWN_TOTAL" 	headerText="원가계" 							textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_MAGA_TOTAL" dataField="SALE_MAGA_TOTAL" headerText="매가계" 							textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="COST_RATE"   		dataField="COST_RATE"   			headerText="원가율(%)" 					textAlign="right"		  />\
					<DataGridColumn id="PROFIT_RATE"  		dataField="PROFIT_RATE" 			headerText="매익율(%)" 					textAlign="right"		 />\
					<DataGridColumn id="PROFIT_AMT"  		dataField="PROFIT_AMT" 			headerText="'+selngProfit+'" 				textAlign="right"		formatter="{numfmt}"/>\
				</columns>\
				<dataProvider>\
					<SpanSummaryCollection source="{$gridData}">\
						<mergingFields>\
							<SpanMergingField name="LRG_CODE">\
								<SpanSummaryRow label="'+subTotal+'" labelDataField="LRG_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
									<SpanSummaryField dataField="BASE_WPRC" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="PUR_WPRC" 					summaryOperation="SUM" />\
									<SpanSummaryField dataField="RTM_WPRC" 					summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_WPRC" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="NET_SALE_SPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="DIN_WPRC" 					summaryOperation="SUM" />\
									<SpanSummaryField dataField="DOUT_WPRC" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="NEXT_BASE_WPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="NEXT_BASE_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_OWN_TOTAL" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_MAGA_TOTAL" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="COST_RATE" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="PROFIT_RATE" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="PROFIT_AMT" 				summaryOperation="SUM" />\
								</SpanSummaryRow>\
							</SpanMergingField>\
							<SpanMergingField name="LRG_NAME"/>\
						</mergingFields>\
					</SpanSummaryCollection>\
				</dataProvider>\
				<footers>\
				<DataGridFooter backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal" >\
					<DataGridFooterColumn  dataColumn="{CD}"   label="'+sm+'"  textAlign="center"/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn dataColumn="{BASE_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PUR_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{RTM_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{NET_SALE_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{DIN_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{DOUT_WPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{NEXT_BASE_WPRC}" 	summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{NEXT_BASE_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_OWN_TOTAL}" 	labelJsFunction="labelFunc_SALE_OWN_TOTAL"  summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_MAGA_TOTAL}" 	labelJsFunction="labelFunc_SALE_MAGA_TOTAL"  summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{COST_RATE}" 				labelJsFunction="labelFunc_COST_RATE" 	  textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PROFIT_RATE}" 			labelJsFunction="labelFunc_PROFIT_RATE"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PROFIT_AMT}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
				</DataGridFooter>\
			</footers>\
			</DataGrid>\
	</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#f3f3f3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="6" />\
		<SpanCellAttribute id="sumTotalCellAttr2" colNo="2" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="4" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto"  doubleClickEnabled="true" >\
				<columns>\
					<DataGridColumn id="LRG_CODE" 			dataField="LRG_CODE" 				headerText="'+codeTop+'" 				textAlign="center"		width="80"/>\
					<DataGridColumn id="LRG_NAME" 			dataField="LRG_NAME"				headerText="'+categoryNmTop+'" 		textAlign="left"				width="80"/>\
					<DataGridColumn id="MID_CODE" 			dataField="MID_CODE" 				headerText="'+codeMid+'" 					textAlign="center"		width="80"/>\
					<DataGridColumn id="MID_NAME" 			dataField="MID_NAME"				headerText="'+categoryNmMid+'" 		textAlign="left"				width="80"/>\
					<DataGridColumn id="CD" 						dataField="CD" 						headerText="'+codeBotton+'" 				textAlign="center"/>\
					<DataGridColumn id="NM" 						dataField="NM"							headerText="'+categoryNmBotton+'" 	textAlign="left"/>\
					<DataGridColumn id="BASE_WPRC"   		dataField="BASE_WPRC" 			headerText="기초원가" 						textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="PUR_WPRC"   			dataField="PUR_WPRC" 				headerText="'+purchaseCost+'" 			textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="RTM_WPRC"   			dataField="RTM_WPRC" 				headerText="반품원가" 						textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC"   		dataField="SALE_WPRC" 			headerText="'+selngPrimeCost+'" 		textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="NET_SALE_SPRC"    dataField="NET_SALE_SPRC" 		headerText="'+sellingSprc+'" 				textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="DIN_WPRC"   			dataField="DIN_WPRC" 				headerText="'+dePrmpc+'" 					textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="DOUT_WPRC"   		dataField="DOUT_WPRC" 			headerText="'+loanPrmpc+'" 				textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="NEXT_BASE_WPRC"  dataField="NEXT_BASE_WPRC" 	headerText="월말재고원가" 					textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="NEXT_BASE_SPRC"   dataField="NEXT_BASE_SPRC" 	headerText="월말재고매가" 					textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_OWN_TOTAL"  dataField="SALE_OWN_TOTAL" 	headerText="원가계" 							textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_MAGA_TOTAL" dataField="SALE_MAGA_TOTAL" headerText="매가계" 							textAlign="right"			formatter="{numfmt}"/>\
					<DataGridColumn id="COST_RATE"   		dataField="COST_RATE"   			headerText="원가율(%)" 					textAlign="right"			 />\
					<DataGridColumn id="PROFIT_RATE"  		dataField="PROFIT_RATE" 			headerText="매익율(%)" 					textAlign="right"			 />\
					<DataGridColumn id="PROFIT_AMT"  		dataField="PROFIT_AMT" 			headerText="'+selngProfit+'" 				textAlign="right"			formatter="{numfmt}"/>\
				</columns>\
				<dataProvider>\
					<SpanSummaryCollection source="{$gridData}">\
						<mergingFields>\
							<SpanMergingField name="LRG_CODE">\
								<SpanSummaryRow label="'+subTotal+'" labelDataField="LRG_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
									<SpanSummaryField dataField="BASE_WPRC" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="PUR_WPRC" 					summaryOperation="SUM" />\
									<SpanSummaryField dataField="RTM_WPRC" 					summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_WPRC" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="NET_SALE_SPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="DIN_WPRC" 					summaryOperation="SUM" />\
									<SpanSummaryField dataField="DOUT_WPRC" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="NEXT_BASE_WPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="NEXT_BASE_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_OWN_TOTAL" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_MAGA_TOTAL" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="COST_RATE" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="PROFIT_RATE" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="PROFIT_AMT" 				summaryOperation="SUM" />\
								</SpanSummaryRow>\
							</SpanMergingField>\
							<SpanMergingField name="LRG_NAME"/>\
							<SpanMergingField name="MID_CODE">\
								<SpanSummaryRow label="'+subTotal+'" labelDataField="MID_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr2}">\
									<SpanSummaryField dataField="BASE_WPRC" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="PUR_WPRC" 					summaryOperation="SUM" />\
									<SpanSummaryField dataField="RTM_WPRC" 					summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_WPRC" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="NET_SALE_SPRC" 			summaryOperation="SUM" />\
									<SpanSummaryField dataField="DIN_WPRC" 					summaryOperation="SUM" />\
									<SpanSummaryField dataField="DOUT_WPRC" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="NEXT_BASE_WPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="NEXT_BASE_SPRC" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_OWN_TOTAL" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="SALE_MAGA_TOTAL" 		summaryOperation="SUM" />\
									<SpanSummaryField dataField="COST_RATE" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="PROFIT_RATE" 				summaryOperation="SUM" />\
									<SpanSummaryField dataField="PROFIT_AMT" 				summaryOperation="SUM" />\
								</SpanSummaryRow>\
							</SpanMergingField>\
							<SpanMergingField name="MID_NAME"/>\
						</mergingFields>\
					</SpanSummaryCollection>\
				</dataProvider>\
				<footers>\
				<DataGridFooter backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal" >\
					<DataGridFooterColumn  dataColumn="{CD}"   label="'+sm+'" textAlign="center" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn dataColumn="{BASE_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PUR_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{RTM_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{NET_SALE_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{DIN_WPRC}" 				summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{DOUT_WPRC}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{NEXT_BASE_WPRC}" 	summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{NEXT_BASE_SPRC}" 		summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_OWN_TOTAL}" 	labelJsFunction="labelFunc_SALE_OWN_TOTAL"  summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{SALE_MAGA_TOTAL}" 	labelJsFunction="labelFunc_SALE_MAGA_TOTAL"  summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{COST_RATE}" 				labelJsFunction="labelFunc_COST_RATE" 	  textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PROFIT_RATE}" 			labelJsFunction="labelFunc_PROFIT_RATE"   textAlign="right"  />\
					<DataGridFooterColumn dataColumn="{PROFIT_AMT}" 			summaryOperation="SUM"   formatter="{numfmt}"   textAlign="right"  />\
				</DataGridFooter>\
			</footers>\
			</DataGrid>\
	</rMateGrid>';





//그리드4 헤더 및 레이아웃 
var layoutStr4 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#f3f3f3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="2" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg4" sortableColumns="true" horizontalScrollPolicy="auto"    selectionMode="multipleCells"       >\
				<columns>\
					<DataGridColumn id="CLS_CODE"   				dataField="CLS_CODE" 				headerText="소분류코드" 					textAlign="center"	width="80"/>\
					<DataGridColumn id="CLS_NAME"   				dataField="CLS_NAME"				headerText="소분류명" 						textAlign="left"			width="80"/>\
					<DataGridColumn id="SCAN_CODE"   			dataField="SCAN_CODE"				headerText="스캔코드" 						textAlign="center"	width="100"/>\
					<DataGridColumn id="ITM_NAME"   				dataField="ITM_NAME"				headerText="상품명" 							textAlign="left"			width="150"/>\
					<DataGridColumn id="BASE_WPRC"   			dataField="BASE_WPRC" 			headerText="기초원가" 						textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="PUR_WPRC"   				dataField="PUR_WPRC" 				headerText="'+purchaseCost+'" 			textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="RTM_WPRC"   				dataField="RTM_WPRC" 				headerText="반품원가" 						textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_WPRC"   			dataField="SALE_WPRC" 			headerText="'+selngPrimeCost+'" 		textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="NET_SALE_SPRC"   		dataField="NET_SALE_SPRC" 		headerText="'+sellingSprc+'" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DIN_WPRC"   				dataField="DIN_WPRC" 				headerText="'+dePrmpc+'" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="DOUT_WPRC"   			dataField="DOUT_WPRC" 			headerText="'+loanPrmpc+'" 				textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="NEXT_BASE_WPRC"   	dataField="NEXT_BASE_WPRC" 	headerText="월말재고원가" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="NEXT_BASE_SPRC"   	dataField="NEXT_BASE_SPRC" 	headerText="월말재고매가" 					textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_OWN_TOTAL"   	dataField="SALE_OWN_TOTAL" 	headerText="원가계" 							textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="SALE_MAGA_TOTAL"  	dataField="SALE_MAGA_TOTAL" 	headerText="매가계" 							textAlign="right"		formatter="{numfmt}"/>\
					<DataGridColumn id="COST_RATE"   			dataField="COST_RATE"   			headerText="원가율" 							textAlign="right"		/>\
					<DataGridColumn id="PROFIT_RATE"  			dataField="PROFIT_RATE" 			headerText="매익율" 							textAlign="right"		/>\
					<DataGridColumn id="PROFIT_AMT"  			dataField="PROFIT_AMT" 			headerText="'+selngProfit+'" 				textAlign="right"		formatter="{numfmt}"/>\
				</columns>\
			</DataGrid>\
	</rMateGrid>';






var SALE_OWN_TOTAL = 0;
var SALE_MAGA_TOTAL =0;
var PROFIT_AMT = 0;
var NET_SALE_SPRC = 0;
var TOTAL_PROFIT_RATE = 0;

var SUM_PROFIT_AMT = 0;
var SUM_NET_SALE_SPRC = 0;
function labelFunc_SALE_OWN_TOTAL(item, value, column)
{
	SALE_OWN_TOTAL   =  value  ;
	return value;
}

function labelFunc_SALE_MAGA_TOTAL(item, value, column)
{
	SALE_MAGA_TOTAL   =  value  ; 
	return value;
}

function labelFunc_PROFIT_AMT(item, value, column)
{
	//console.log(column);
	PROFIT_AMT   =  value  ; 
	//SUM_PROFIT_AMT += PROFIT_AMT;
	//console.log("PROFIT_AMT : " + PROFIT_AMT + "//////   SUM_PROFIT_AMT : " + SUM_PROFIT_AMT);
	return value;
}

function labelFunc_NET_SALE_SPRC(item, value, column)
{
	NET_SALE_SPRC   =  value  ; 
	//SUM_NET_SALE_SPRC += value;
	return value;
}



//원가율 :  (원가계/매가계) * 100 , 소수2자리에서  반올림
function labelFunc_COST_RATE(item, value, column)
{
	var pTab	=	$("#P_TAB").val();
	
	if(pTab =="2"){
		var src =gridRoot2.getChangedData(true);
		

		
		for (var i = 0; i < src.length; i++){
			var  dataSet = src[i].data;
			if(dataSet.LRG_CODE == "소계"){
				var sum = (dataSet.SALE_OWN_TOTAL/dataSet.SALE_MAGA_TOTAL*100).toFixed(2);
				if(dataSet.SALE_MAGA_TOTAL == "0" || dataSet.SALE_MAGA_TOTAL == 0 ){
					sum=0;
					sum = sum.toFixed(2);
				}
				
				var sum_2 = (dataSet.PROFIT_AMT/dataSet.NET_SALE_SPRC*100).toFixed(2);
				if(dataSet.NET_SALE_SPRC == "0" || dataSet.NET_SALE_SPRC == 0 ){
					sum_2=0;
					sum_2 = sum_2.toFixed(2);
				}
				gridRoot2.setItemFieldAt( sum , i, "COST_RATE");
				gridRoot2.setItemFieldAt( sum_2 , i, "PROFIT_RATE");
			} 
		}
		 
	}
	
	if(pTab =="3"){
		var src =gridRoot3.getChangedData(true);
		
		for (var i = 0; i < src.length; i++){
			var  dataSet = src[i].data;
			if(dataSet.LRG_CODE == "소계"    || dataSet.MID_CODE == "소계"   ){
				var sum = (dataSet.SALE_OWN_TOTAL/dataSet.SALE_MAGA_TOTAL*100).toFixed(2);
				if(dataSet.SALE_MAGA_TOTAL == "0" || dataSet.SALE_MAGA_TOTAL == 0 ){
					sum=0;
					sum = sum.toFixed(2);
				}
				
				var sum_2 = (dataSet.PROFIT_AMT/dataSet.NET_SALE_SPRC*100).toFixed(2);
				if(dataSet.NET_SALE_SPRC == "0" || dataSet.NET_SALE_SPRC == 0 ){
					sum_2=0;
					sum_2 = sum_2.toFixed(2);
				}
				gridRoot3.setItemFieldAt( sum , i, "COST_RATE");
				gridRoot3.setItemFieldAt( sum_2 , i, "PROFIT_RATE");
				
			}
		}
	}
	
	var rt ="0";
	if(SALE_OWN_TOTAL == "0" && SALE_MAGA_TOTAL == "0"){
			return rt;
	}else{
		 rt = ( SALE_OWN_TOTAL / SALE_MAGA_TOTAL ) * 100 ;
		return  rt.toFixed(2)  ;
	}
} 

//매익율 :  (매출이익/매출매가) * 100 , 소수2자리에서  반올림
function labelFunc_PROFIT_RATE(item, value, column){
	if(TOTAL_PROFIT_RATE == "0"){
		var zero_0 = 0;
		return zero_0.toFixed(2);
	}else{
		return TOTAL_PROFIT_RATE;
	}
}



// 상품 팝업 조회
function salesAnalProductList() { 
	 
	 
	if(  typeof dataRow3["CD"]   == "undefined"  )
	{   alert('소분류를 선택하지 않으셨습니다.');
		btn_pop_close();
		return;
	}
	
	
	var rowIndex 	= dataGrid4.getSelectedIndex();
	dataRow4 		= gridRoot4.getItemAt(rowIndex); 	

	jQuery.ajax({ 
	    url:"/salesAnalProductList.do",               // venProductList    
	    type:"POST",
		datatype:"json",
		async:true,
		data: {  P_STR_CODE      : $("#P_STR_CODE").val() 
		,     	 P_SCAN_CODE     : $("#SCAN_CODE").val()
		,     	 P_CLS_CODE      : dataRow3["CD"]
	    ,        P_INV_MT        : $("#P_INV_DT").val() 
		}, 
	    beforeSend : function(){ 
            gridRoot4.addLoadingBar(); 
	    }, 
		success:function(data){  
			 
			gridRoot4.removeAll();
			 
			if(data.length == 0) 
			{ 
//				alert("협력업체의 상품이 존재하지 않습니다.");
				dataGrid4.setEnabled(true);
		    	gridRoot4.removeLoadingBar();
				return;
			}
			 
			gridApp4.setData(data);   
			
			dataGrid4.setEnabled(true);
	    	gridRoot4.removeLoadingBar();
			  
	    },
	    complete : function(data) {
	      
	    },
	    error : function(xhr, status, error) {
	    	dataGrid4.setEnabled(true);
	    	gridRoot4.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	 
}



function  btn_pop_close(){
	
	 $( "#show_product_pop" ).dialog( 'close' );	
	 
}



//목록 그리드 조회
function getGridData() { 
	
	var params = $("#frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesAnalReportInvntrySttusList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    
			if(tabClickNum == "1"){
				gridRoot1.addLoadingBar();		
			}else if(tabClickNum == "2"){
				gridRoot2.addLoadingBar();		
			}else if(tabClickNum == "3"){
				gridRoot3.addLoadingBar();		
			}
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
	       	if(tabClickNum == "1"){
				gridApp1.setData(data);			
				dataGrid1.setEnabled(true);
		       	gridRoot1.removeLoadingBar();	
		       	var i=0;
				var SUM_PROFIT_AMT = 0;
				var SUM_NET_SALE_SPRC = 0;
				
					for(i; i<data.length;i++){
						
					SUM_PROFIT_AMT += data[i].PROFIT_AMT;
					SUM_NET_SALE_SPRC		+= data[i].NET_SALE_SPRC;
					}
					if(SUM_NET_SALE_SPRC == "0"){
						TOTAL_PROFIT_RATE = 0;
						TOTAL_PROFIT_RATE = TOTAL_PROFIT_RATE.toFixed(2);
					}else{
						TOTAL_PROFIT_RATE = ((SUM_PROFIT_AMT / SUM_NET_SALE_SPRC) * 100).toFixed(2);
					}
					
			}else if(tabClickNum == "2"){
				gridApp2.setData(data);		
				dataGrid2.setEnabled(true);
		       	gridRoot2.removeLoadingBar();
		       	
		     	var i=0;
				var SUM_PROFIT_AMT = 0;
				var SUM_NET_SALE_SPRC = 0;
				
					for(i; i<data.length;i++){
						
					SUM_PROFIT_AMT += data[i].PROFIT_AMT;
					SUM_NET_SALE_SPRC		+= data[i].NET_SALE_SPRC;
					}
					if(SUM_NET_SALE_SPRC == "0"){
						TOTAL_PROFIT_RATE = 0;
						TOTAL_PROFIT_RATE = TOTAL_PROFIT_RATE.toFixed(2);
					}else{
						TOTAL_PROFIT_RATE = ((SUM_PROFIT_AMT / SUM_NET_SALE_SPRC) * 100).toFixed(2);
					}
		       	
			}else if(tabClickNum == "3"){
				gridApp3.setData(data);			
				dataGrid3.setEnabled(true);
		       	gridRoot3.removeLoadingBar();	
		       	
		     	var i=0;
				var SUM_PROFIT_AMT = 0;
				var SUM_NET_SALE_SPRC = 0;
				
					for(i; i<data.length;i++){
						
					SUM_PROFIT_AMT += data[i].PROFIT_AMT;
					SUM_NET_SALE_SPRC		+= data[i].NET_SALE_SPRC;
					}
					if(SUM_NET_SALE_SPRC == "0"){ 
						TOTAL_PROFIT_RATE = 0;
						TOTAL_PROFIT_RATE = TOTAL_PROFIT_RATE.toFixed(2);
					}else{
						TOTAL_PROFIT_RATE = ((SUM_PROFIT_AMT / SUM_NET_SALE_SPRC) * 100).toFixed(2);
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

function chgCate1(){ 
	$("select[name='P_CLS_CODE'] option").remove();
	$("#P_CLS_CODE").prepend("<option value=''>"+select+"</option>");
	   
	getCateCodeSelectBoxList("P_MID_CODE","2",$('#P_LRG_CODE' ).val());	 
}
function chgCate2(){	
	var num1 = $('#P_MID_CODE' ).val().substr(0,2);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
		
	getCateCodeSelectBoxList("P_CLS_CODE","3",$('#P_MID_CODE' ).val());
}
function chgCate3(){	
	var num1 = $('#P_CLS_CODE' ).val().substr(0,2);
	var num2 = $('#P_CLS_CODE' ).val().substr(0,4);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
	$("#P_MID_CODE").val(num2).prop("selected", true);		
}
//업태구분a
function uptaeFunction(){
	var uptaeFlagCode = $('#P_UPTAE_FLAG' ).val();
	updateStrCodeSelectBox("P_STR_CODE",uptaeFlagCode);
	
}


function excelExport(){    
	var param		= "";
	var P_STR_CODE 	= $.trim($('#P_STR_CODE').val());	//점포코드
	var P_INV_DT 	= $.trim($('#P_INV_DT').val());		//조회일자
	var P_LRG_CODE 	= $.trim($('#P_LRG_CODE').val());	//대분류코드
	var P_MID_CODE 	= $.trim($('#P_MID_CODE').val());	//중분류코드
	var P_CLS_CODE 	= $.trim($('#P_CLS_CODE').val());	//소분류코드

	param += "P_STR_CODE=" 	+ P_STR_CODE;
	param += "&P_INV_DT=" 	+ P_INV_DT;
	param += "&P_LRG_CODE="	+ P_LRG_CODE;
	param += "&P_MID_CODE=" + P_MID_CODE;
	param += "&P_CLS_CODE=" + P_CLS_CODE;
	
	//엑셀호출
	$.download('/salesAnalReportInvntrySttusListExcel.do', param, "post");
}


/*
function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	if(tabClickNum == "1"){
		dataGrid1.exportFileName = "재고결과현황_"+majorCategory+date+".xlsx";
		gridRoot1.excelExportSave("/gridExcelDown.do", false);		
	}else if(tabClickNum == "2"){
		dataGrid2.exportFileName = "재고결과현황_"+middleCategory+date+".xlsx";
		gridRoot2.excelExportSave("/gridExcelDown.do", false);
	}else if(tabClickNum == "3"){
		dataGrid3.exportFileName = "재고결과현황_"+subCategory+date+".xlsx";
		gridRoot3.excelExportSave("/gridExcelDown.do", false);
	}
}*/


function venProductExcelDown()
{
//	var rowIndex = dataGrid1.getSelectedIndex();
//	dataRow1 = gridRoot1.getItemAt(rowIndex); 	
	
//	var VEN_NAME = $.trim( dataRow1.VEN_NAME );
	dataGrid4.exportFileName = "소분류상품.xlsx";
	gridRoot4.excelExportSave("", false);
}



$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	datePickerYearMonth();
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	$("#P_INV_DT").val(nowDateYm);
	
	getStoreCode("frm select[id='P_STR_CODE']");
	
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	getCommonCodeSelectBoxList("P_GRE_GB","GRE_GB");

	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류
	
	//그리드 너비 제어
	$("#gridHolder1,#gridHolder2,#gridHolder3").width("100%");
	$("#gridHolder1,#gridHolder2,#gridHolder3").height( $(window).height() - 135 );
	
	$(window).on('resize',function (){			
		$("#gridHolder1,#gridHolder2,#gridHolder3").width("100%");	
		$("#gridHolder1,#gridHolder2,#gridHolder3").height( $(window).height() - 135 );		
	});	
	
	//조회
	$("#btn_search").click(function(){		
		getGridData();
	});	

	$("#btn_excel_down").click(function(){
		excelExport();
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
	

	$("#show_product_pop").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 980,
	    height : 480,
	    resizable : false
// 	    , open: function (event, ui) { 
//             $('.ui-dialog').css('z-index',950);
//             $('.ui-widget-overlay').css('z-index',949);
//         },
	});

});