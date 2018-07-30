/********************************************************
 * 설명: 점 상품 마스타  관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 유재훈
 * since	: 2016.12.19
 * version : 1.0
 ********************************************************/
	
var crudBit          =   "C";   // 최초 신규로 시작함 
var VEN_CODE_DUP_BIT =   "";    // 협력업체코드 중복 체크버튼
var BTN_SAVE_BIT     =   "Y";    // 배송루트변경에 따른 발주버장 버튼 저장 기능 활설화 및 비 활성화



$(document).ready(function(){
	  
	getCommonCodeSelectBoxList("PUR_GB"    ,   "PUR_GB"		);  
	getCommonCodeSelectBoxList("CFM_YN"    ,   "CFM_YN"		);      // 확정구분
	  
	init();
	    
	getStoreCode("STR_CODE");
	
	$('#TOT_WSPRC_TAX_FREE').number( true, 2 );  
	$('#TOT_WSPRC_TAX_ADD').number( true, 2 );  
	$('#TOT_WVAT').number( true, 2 );  
	$('#TOT_PRICE').number( true, 2 );  
	$('#TOT_SPRC').number( true, 0 );  
	$('#BOT_SPRC_TOT').number( true, 0 );  
	 
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
});


// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
//rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");


// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";
//jsVars += "&dataType=xml";
// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%) 
rMateGridH5.create("grid1", "gridHolder1", jsVars+"&dataType=xml", "100%", "350px");   // 매입 상품 상세 리스트  그리드
rMateGridH5.create("grid2", "gridHolder2", jsVars );                                   // 매입 헤더 리스트

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	
	 if (id == "grid1") { 
			// rMateGrid 관련 객체
			gridApp1 	= document.getElementById(id);	// 그리드를 포함하는 div 객체
			gridRoot1 	= gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체
			gridApp1.setDataType("xml");
			gridApp1.setLayout(layoutStr1);		
			gridApp1.setData(gridData1);
			//로우 클릭 이벤트 제어
			var itemClickHandler = function(event) { 
			}; 
			var itemDoubleClickHandler1 = function(event) {
				var rowIndex = event.rowIndex;
				var columnIndex = event.columnIndex;
				var dataRow = gridRoot1.getItemAt(rowIndex);
				// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
				var column = dataGrid1.getDisplayableColumns()[columnIndex];
				var dataField = column.getDataField();
				   
				if (dataField == "ITM_NAME"  ) 
				{ 
					if(   typeof gridRoot1.getItemFieldAt( rowIndex , "CRUD") != "undefined"     )
					{ 
						editRowIndex 	= rowIndex;
						editDataRow 	= dataRow;
						editDataField 	= dataField; 
						// 점상품검색 - 그리드 내 팝업 				   
						// storeProductPopup(event);  
					} else { 
						// alert('저장된 점 상품은 수정 할수없습니다.'); 
					}
				}  
					 
			};
			
			var selectionChangeHandler = function(event) {
				var rowIndex = event.rowIndex;
				var columnIndex = event.columnIndex;
				var dataRow = gridRoot1.getItemAt(rowIndex);
				var column = dataGrid1.getDisplayableColumns()[columnIndex];
				var dataField = column.getDataField();

				// 전달된 레코드(XMLElement)에서 필드 뽑아내기
				var value = getNodeText(dataRow, dataField);
//				alert("파싱된 "+dataField+"의 값:"+value+"\n\n전달된 XML\n\n"+getXmlString(dataRow));
			};
			 
			//그리드1 핸들러
			var layoutCompleteHandler1 = function(event) {
				dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체 
  
				// 더블클릭
				dataGrid1.setDoubleClickEnabled(true);
				dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
				
			};  
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1); 
			
			// 그리드내 콤보박스 change 시 이벤트
			gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);   //itemDataChanged   itemFocusOut
			  
			
			
		}  else  if (id == "grid2") {
			// rMateGrid 관련 객체
			gridApp2 	= document.getElementById(id);	// 그리드를 포함하는 div 객체
			gridRoot2 	= gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체
//			gridApp2.setDataType("xml");
			gridApp2.setLayout(layoutStr2);		
			gridApp2.setData(gridData2);
			
			var selectionChangeHandler = function(event) {
				var rowIndex = event.rowIndex;
				var columnIndex = event.columnIndex; 
				$("#selectedPrintRow").val("");
				$("#P_PRINT_PUR_DT").val("");//레포트용 파라미터
				$("#P_PRINT_STR_CODE").val("");//레포트용 파라미터
				$("#P_PRINT_CORP_CODE").val("");//레포트용 파라미터
					var rows = dataGrid2.getSelectedIndices(); 
					for (var i = 0; i < rows.length; i++) {
						  
							$("#selectedPrintRow").val(   gridRoot2.getItemFieldAt( rows[i] , "SLIP_NO" )    +","+    $("#selectedPrintRow").val()    );
							$("#P_PRINT_PUR_DT").val(   gridRoot2.getItemFieldAt( rows[i] , "PUR_DT" )    +","+    $("#P_PRINT_PUR_DT").val()    );
							$("#P_PRINT_STR_CODE").val(   gridRoot2.getItemFieldAt( rows[i] , "STR_CODE" )    +","+    $("#P_PRINT_STR_CODE").val()    );
							$("#P_PRINT_CORP_CODE").val(   $("#CORP_CODE").val()   +","+    $("#P_PRINT_CORP_CODE").val()    );
						  
					}
 
			};
			
			var itemClickHandler = function(event) {
				var rowIndex = event.rowIndex; 
				dataRow2 = gridRoot2.getItemAt(rowIndex);
				  
				// 매입 헤더 및 상품상세 보이기 
				purchHeadDtailInfo(   dataRow2["PUR_DT"] 
									, dataRow2["STR_CODE"] 
									, dataRow2["SLIP_NO"]  
								    , dataRow2["PUR_GB"] 
									, dataRow2["PUR_CFM_DT"] 
									, dataRow2["CFM_DT"]   
								    , dataRow2["PAY_CLOSE"]  );
				  
			}; 
			//그리드2 핸들러
			var layoutCompleteHandler2 = function(event) {
				dataGrid2 = gridRoot2.getDataGrid();	// 그리드 객체 
				dataGrid2.addEventListener("itemClick", itemClickHandler); 	
				
			};  
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2); 
			 
			
			var menuItemSelectedHandler = function(event) {
				contextMenuHandler(event.getMenuItemCaption());
			};

			var dataCompleteHandler = function(event) {
				dataGrid = gridRoot2.getDataGrid();
				dataGrid.addEventListener("change", selectionChangeHandler);
				dataGrid.addEventListener("gridMenuItemSelect", menuItemSelectedHandler);
				collection = gridRoot2.getCollection();
			};

			gridRoot2.addEventListener("dataComplete", dataCompleteHandler);
		}
 
 
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1; 
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2; 

//----------------------- 그리드 설정 끝 -----------------------

//<DataGridColumn  id="LINK_CODE"		 dataField="LINK_CODE"     	headerText="바코드"		editable="true" 	    textAlign="center"	width="125"  editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem" />\
 
// 발주상품  그리드 - 그리드1 헤더 설정        itemRenderer="IconItem" icon="Magnifier"    selectionMode="multipleRows"    singleCell
var layoutStr1 =
'<rMateGrid>\
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="4" />\
	<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
	<DataGrid id="dg1"  sortableColumns="true"  editable="true" horizontalScrollPolicy="auto" showDeletedRows="false"    selectionMode="multipleCells"   doubleClickEnabled="false" >\
		<columns>\
			<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"  visible="false"  />\
			<DataGridColumn  id="CRUD"		 	 dataField="CRUD"     		editable="false"		visible="false"     />\
			<DataGridColumn  id="No"		 	 dataField="No"     		headerText="No" 	    editable="false"		itemRenderer="IndexNoItem"	visible="true"    textAlign="center"	width="33"  />\
			<DataGridColumn  id="SLIP_NO"		 dataField="SLIP_NO"    	headerText="매입번호"		editable="false"		visible="false" textAlign="center"	 width="125"    		/>\
			<DataGridColumn  id="STR_CODE"		 dataField="STR_CODE"     	headerText="STR_CODE"	editable="false" 		visible="false" />\
			<DataGridColumn  id="ITM_CODE"		 dataField="ITM_CODE"     	headerText="상품코드"		editable="false" 		visible="false" />\
			<DataGridColumn  id="LINK_CODE"		 dataField="LINK_CODE"     	headerText="스캔코드"		editable="false" 	    textAlign="center"	width="125"    />\
			<DataGridColumn  id="ITM_NAME"		 dataField="ITM_NAME"     	headerText="상품명"		editable="false" 		 textAlign="left"	 width="145"   		/>\
			<DataGridColumn  id="SPECS"	 		 dataField="SPECS"          headerText="단위"    		editable="false"		textAlign="center"   width="65"      	/>\
			<DataGridColumn  id="UNIT"	 	 	 dataField="UNIT" 		    headerText="규격"    		editable="false"		textAlign="right"   width="75"   		/>\
			<DataGridColumn  id="IPSU_QTY"		 dataField="IPSU_QTY"    	headerText="입수"    		editable="false"		textAlign="right"    width="65"    formatter="{numfmt}"  	/>\
			<DataGridColumn  id="ORD_QTY"		 dataField="ORD_QTY"     	headerText="발주수량"		editable="false" 		textAlign="right"	  maxChars="6" type="int"   width="70"    formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
			<DataGridColumn  id="SCM_QTY"	 	 dataField="SCM_QTY" 		headerText="SCM납품수량"  	editable="false"		    visible="false"  textAlign="right"     maxChars="6" type="int"   width="95"    formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
			<DataGridColumn  id="PUR_QTY"	 	 dataField="PUR_QTY" 		headerText="매입수량"  	editable="false"		    visible="false"  textAlign="right"     maxChars="6" type="int"   width="70"    formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
			<DataGridColumn  id="DEC_QTY"	 	 dataField="DEC_QTY" 		headerText="확정수량"  	editable="false"		    textAlign="right"     maxChars="6" type="int"   width="70"    formatter="{numfmt}"  />\
			<DataGridColumn  id="TAX_GB"		 dataField="TAX_GB"     	headerText="TAX_GB"		visible="false" />\
			<DataGridColumn  id="TAX_GB_NM"		 dataField="TAX_GB_NM"    	headerText="과세구분"		editable="false"		textAlign="center"   width="70"       	/>\
			<DataGridColumn  id="PUR_WAMT"       dataField="PUR_WAMT"       headerText="매입단가"		editable="false"			 textAlign="right"	 width="98"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="PUR_WPRC"	 	 dataField="PUR_WPRC"       headerText="공급가"  		visible="true" editable="false"		   textAlign="right"	 width="85"   formatter="{numfmt}"  	/>\
			<DataGridColumn  id="PUR_WVAT"		 dataField="PUR_WVAT"       headerText="부가세" 		visible="true" editable="false"		   textAlign="right"	 width="85"    formatter="{numfmt}"		/>\
	<DataGridColumn  id="PUR_WPRC_TOT"	 	 dataField="PUR_WPRC_TOT"       headerText="공급가(*수량)"  	editable="false"		    textAlign="right"	 width="105"   formatter="{numfmt}"  	/>\
	<DataGridColumn  id="PUR_WVAT_TOT"		 dataField="PUR_WVAT_TOT"       headerText="부가세(*수량)" 	editable="false"		    textAlign="right"	 width="105"    formatter="{numfmt}"		/>\
	<DataGridColumn  id="PUR_WAMT_TOT"		 dataField="PUR_WAMT_TOT"       headerText="합계금액" 		editable="false"	    	    textAlign="right"	 width="105"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="PUR_SPRC"   	 dataField="PUR_SPRC"    	headerText="매가단가"		editable="false"		textAlign="right"	 width="85"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="PUR_SAMT"   	 dataField="PUR_SAMT"    	headerText="매입매가금액"   editable="false"		textAlign="right"	 width="95"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="BOT_SPRC"		 dataField="BOT_SPRC"    	headerText="공병단가"		editable="false"		textAlign="right"	 width="85"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="BOT_SPRC_TOT"	 dataField="BOT_SPRC_TOT"   headerText="공병금액"		editable="false"		textAlign="right"	 width="85"    formatter="{numfmt}" 	/>\
			<DataGridColumn  id="ORD_FLAG"		 dataField="ORD_FLAG"     	headerText="ORD_FLAG"	visible="false" />\
			<DataGridColumn  id="ORD_FLAG_NM"	 dataField="ORD_FLAG_NM"    headerText="매입형태"  	editable="false"			  textAlign="center"	 width="85"      	/>\
			<DataGridColumn  id="ORD_SLIP_NO"    dataField="ORD_SLIP_NO"    headerText="발주번호"		editable="false" 		visible="false" />\
			<DataGridColumn  id="SEQ"		 	 dataField="SEQ"    	    visible="false" />\
			<DataGridColumn  id="PUR_DT"		 	 dataField="PUR_DT"    	    visible="false" />\
	<DataGridColumn  id="OLD_DEC_QTY"		 	 dataField="OLD_DEC_QTY"    	    visible="false" />\
			<DataGridColumn  id="OLD_PUR_WAMT"		 	 dataField="OLD_PUR_WAMT"    	    visible="false" />\
			<DataGridColumn  id="OLD_PUR_WPRC"		 	 dataField="OLD_PUR_WPRC"    	    visible="false" />\
			<DataGridColumn  id="OLD_PUR_WVAT"		 	 dataField="OLD_PUR_WVAT"    	    visible="false" />\
	<DataGridColumn  id="SUM_COUNT"		 	 dataField="SUM_COUNT"    	    visible="false" />\
	</columns>\
	<footers>\
	<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
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
		<DataGridFooterColumn summaryOperation="SUM" dataColumn="{ORD_QTY}" formatter="{numfmt}" textAlign="right" />\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
		<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DEC_QTY}" formatter="{numfmt}" textAlign="right" />\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn summaryOperation="SUM" dataColumn="{PUR_WAMT_TOT}" formatter="{numfmt}" textAlign="right" />\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	</DataGridFooter>\
    </footers>\
	</DataGrid>\
</rMateGrid>'; 

var layoutStr2 =
	'<rMateGrid>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
		<DataGrid id="dg1" sortableColumns="false"  dragSelectable="true"    editable="true" horizontalScrollPolicy="auto"  selectionMode="singleCell" >\
			<columns>\
				<DataGridSelectorColumn id="selector2" width="40" textAlign="center"  headerText=""  allowMultipleSelection="true"  backgroundColor="#EDEDF0" allowAllSelection="false"  secondLabelJsFunction="secondLabelFunc"  />\
				<DataGridColumn  id="No"		 	  dataField="No"     		    headerText="No" 	    visible="true"  		editable="false"		itemRenderer="IndexNoItem"	   textAlign="center"	width="33"  />\
				<DataGridColumn  id="PUR_DT"	 	  dataField="PUR_DT"    		headerText="전표일자"  	visible="true"  		editable="false"	    textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="SLIP_NO"	 	  dataField="SLIP_NO"    		headerText="전표번호"  	visible="true"  		editable="false"		textAlign="center"   width="125"      	/>\
				<DataGridColumn  id="VEN_CODE"	 	  dataField="VEN_CODE"    		headerText="매입처코드"    visible="true"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="VEN_NAME"	      dataField="VEN_NAME"    		headerText="매입처"       editable="false"		textAlign="left"   		width="130"      	/>\
				<DataGridColumn  id="STR_CODE"	 	  dataField="STR_CODE"    				 				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ORDER_STR_CODE"  dataField="ORDER_STR_CODE"    				 		visible="false"  		editable="false"		     	/>\
				<DataGridColumn  id="DOUT_SLIP_NO"	  dataField="DOUT_SLIP_NO"    	headerText="대출전표번호"  	visible="true"  		editable="false"		textAlign="center"   width="125"      	/>\
				<DataGridColumn  id="PUR_GB"	 	  dataField="PUR_GB"    				  				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="PUR_GB_NM"	 	  dataField="PUR_GB_NM"    		headerText="매입구분"  styleJsFunction="stylePurGbNm" 	visible="true"  		editable="false"		textAlign="center"   width="74"      	/>\
				<DataGridColumn  id="ITM_GB"	 	  dataField="ITM_GB"    				  				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ITM_GB_NM"	      dataField="ITM_GB_NM"      	headerText="상품구분"  	visible="true"  		editable="false"		textAlign="center"   width="70"      	/>\
				<DataGridColumn  id="ROUTE_GB"	 	  dataField="ROUTE_GB"    				  				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ROUTE_GB_NM"	  dataField="ROUTE_GB_NM"    	headerText="배송구분"  	visible="true"  		editable="false"		textAlign="center"   width="84"      	/>\
				<DataGridColumn  id="PUR_CFM_DT"	  dataField="PUR_CFM_DT"    	headerText="매입(입고)일"  	visible="true"  		editable="false"	formatter="{datefmt}"	textAlign="center"   width="112"      	/>\
				<DataGridColumn  id="CFM_DT"	 	  dataField="CFM_DT"    		headerText="마감일자"  	visible="true"  		editable="false"		formatter="{datefmt}" textAlign="center"   width="80"      	/>\
				<DataGridColumn  id="PAY_CLOSE"	 	  dataField="PAY_CLOSE"    		headerText="지불마감일"  	visible="true"  		editable="false"		formatter="{datefmt}" textAlign="center"   width="80"      	/>\
	<DataGridColumn  id="PUR_WPRC_FREE"	 	  dataField="PUR_WPRC_FREE"    		headerText="면세원가 금액합계"  	visible="false"     	/>\
	<DataGridColumn  id="PUR_WPRC"	 	  dataField="PUR_WPRC"    		headerText="과세원가 금액합계"  	visible="false"     	/>\
	<DataGridColumn  id="PUR_WVAT"	 	  dataField="PUR_WVAT"    		headerText="부가세 금액합계"  	visible="false"     	/>\
	<DataGridColumn  id="PUR_WAMT"	 	  dataField="PUR_WAMT"    		headerText="구입 금액합계"  	visible="false"     	/>\
	<DataGridColumn  id="PUR_SAMT"	 	  dataField="PUR_SAMT"    		headerText="매가 금액합계"  	visible="false"     	/>\
	<DataGridColumn  id="BOT_SPRC"	 	  dataField="BOT_SPRC"    		headerText="공병합계"  	visible="false"     	/>\
	</columns>\
		</DataGrid>\
	</rMateGrid>';


//그리드  데이터 초기화
var gridData1 = []; 
var gridData2 = []; 
  


// ----------------------- 그리드 설정 끝 -------------------------------------


function stylePurGbNm(item, column) { 
	var value = column.getDataField();
	if (item[value] == "반품")
		return { color:"#FF0000", fontWeight:"bold" };
	return null;
}


function secondLabelFunc(item, value, column) {
	 // PAY_CLOSE 가 널인것  활성화  -> 삭제가능
	 // PAY_CLOSE가 not null 이고 CFM_DT가 널인것 활성화 -> 삭제가능  
	 if ( (  item.PAY_CLOSE == undefined )  ||  (  item.PAY_CLOSE != undefined  && item.CFM_DT == undefined )       )
		 return true;
	 else
		 return false;
 } 
	
function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

 

function init() {
  
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
		 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
				if(     $("#PUR_DT_FROM").val()  >  $("#PUR_DT_TO").val()     )
				{   alert("검색할 납품예정  끝 일자는 시작 일자보다 작을수 없습니다.");
					$("#PUR_DT_FROM").val(CUR_DT);
					return;
				}	 
			 }, 	 showMonthAfterYear:true 
			});
		 
		$(".datepicker2").datepicker({ onSelect: function(dateText) 
		 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
				if(     $("#PUR_DT_FROM").val()  >  $("#PUR_DT_TO").val()     )
				{   alert("검색할 납품예정 끝 일자는 시작 일자보다 작을수 없습니다.");
				$("#PUR_DT_TO").val(CUR_DT);
					return;
				}	 
		 }, 	 showMonthAfterYear:true 
		});


	

	
	//  점포명에서 엔터시 검색되게....
	$("input[name=STR_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_store_search();
        } 
	});
  
	//   협력(매입)업체에서 엔터시 검색되게....
	$("input[name=VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        } 
	});
	 

	//조회조건  from 매입일자는 시스템 날짜 - 1 해서 default 로 넣는다
	var PUR_DT_FROM = new CommDateManager().after(0, 0, -7).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#PUR_DT_FROM").val( PUR_DT_FROM );
	//조회조건  to 발주일자는 시스템 날짜   해서 default 로 넣는다
	var PUR_DT_TO = new CommDateManager().after(0, 0, 1).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#PUR_DT_TO").val( PUR_DT_TO );
	  
	$("#PUR_DT_CHG").val(""); 
	
	
//    $("#btn_save_amt").hide(); 
	 
	 
	//매입구분 : 매입으로 세팅
//	$("#PUR_GB").val("1");
	// 확정구분
//	$("#CFM_YN").val("N");
	      
}


//나중에 js로 빼
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
//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
 
// 입고예정일자 세팅하기
function setOrderDay( startDate )
{ 
//	var startDate =  $("#ORD_DT").val() ;
	startDate = startDate.replace(/-/g, "");
	 
	startDate = new Date( startDate.substring(0,4),startDate.substring(4,6)-1,startDate.substring(6,8) );  
	
	startDate.setDate(startDate.getDate() + 1);    // 하루 증가
	var yyyy = startDate.getFullYear();
	var mm 	 = ( startDate.getMonth()+(1*1) );
	if(mm < 10 )  { 	mm = "0" + mm;  }  
	var dd   = startDate.getDate();
	if(dd < 10 )  { 	dd = "0" + dd;  }  
	
	$("#PUR_DT").val(   yyyy +"-"+ mm +"-"+ dd   );
}

function chgOrderDay()
{ 
	 
	setOrderDay(  $("#ORD_DT").val()  );
	 
}
  

function  btn_pop_close(){ 
	 $( "#show_product_pop" ).dialog( 'close' );	 
}
 
// 매입(입고)일(PUR_CFM_DT) 과 마감일자(CFM_DT)가 널이 아닐때 , 마감 취소   CFM_DT를  null 로 바꾼다.
function  btn_magam_cancel()
{
	
	var rowCnt  = gridRoot2.getCollection().getSource() ;   
	if(rowCnt.length == 0)
	{
		alert("조회 된 전표가 없습니다.\n전표를 조회하세요"); 
		return; 
	}
	 
	
	var selectedIndex = dataGrid2.getSelectedIndex() ;  
    var SLIP_NO_VAR   = gridRoot2.getItemFieldAt( selectedIndex , "SLIP_NO") ;  
    if(  selectedIndex ==   -1 )
	{
		alert("마감취소 할 전표를 선택하세요");
		return;
	} 
    
	if (confirm("전표 "+SLIP_NO_VAR+"  를 [마감취소] 하시겠습니까?") == false){  
		return;
	}
	  
	
	
	var PUR_CFM_DT_VAL 	= gridRoot2.getItemFieldAt( selectedIndex , "PUR_CFM_DT") ; 
	var CFM_DT_VAL     	= gridRoot2.getItemFieldAt( selectedIndex , "CFM_DT") ; 
	 
	if(  typeof PUR_CFM_DT_VAL != 'undefined'   &&   typeof CFM_DT_VAL != 'undefined'    )
	{ 	
			var PAY_CLOSE_VAL = gridRoot2.getItemFieldAt( selectedIndex , "PAY_CLOSE") ; 
			if(  typeof PAY_CLOSE_VAL != 'undefined'    )
			{
					alert("지불마감된 전표는 마감취소를 할 수 없습니다.");
					return;
			} else {
				
					// 마감취소  
					jQuery.ajax({ 
					    url:"/purchMagamCancel.do",           // purchChangeDate   
					    type:"POST",
						datatype:"xml",
						async:true,
						data: {    
					             "SLIP_NO"     : SLIP_NO_VAR 
					    }, 
						success:function(data){   
							if(  data[0].RETURN_CODE  == "0000")
							{   
								alert("선택하신 전표가 [마감취소] 되었습니다.");
							}  
					    },
					    complete : function(data) {  
					        //	  $("#PUR_DT_CHG").val("");
					    	btn_search();
					    },
					    error : function(xhr, status, error) {
					    	CommonJs.alertErrorStatus(xhr.status, error);
					    }
					});
				  
			}
		 
	} else {
		alert("마감 된 전표가 아니므로 마감취소를 할 수 없습니다.");
		return;
		
	}
	 

}


function  purchChangeDate()
{
	var rowCnt  = gridRoot2.getCollection().getSource() ;   
	if(rowCnt.length == 0)
	{
		alert("조회 된 전표가 없습니다.\n전표를 조회하세요"); 
		return; 
	}
	
	
	var selectedIndex = dataGrid2.getSelectedIndex()   ; 
	 
    var SLIP_NO_VAR   = gridRoot2.getItemFieldAt( selectedIndex , "SLIP_NO") ;  
	if(  selectedIndex ==   -1 )
	{
		alert("날짜를 바꿀 전표를 선택하세요");
		return;
	} 
	
	
 
	
	var PAY_CLOSE_VAL = gridRoot2.getItemFieldAt( selectedIndex , "PAY_CLOSE") ; 
	if(  typeof PAY_CLOSE_VAL != 'undefined'    )
	{
		alert("지불마감된 전표는 날짜를 바꿀수 없습니다.");
		return;
	}
	
	 
	if(  $("#PUR_DT_CHG").val()  == ""  )
	{   alert("수정 전표 일을 입력 하세요.");
		$("#PUR_DT_CHG").focus();
		return;
	}

	if (confirm("전표 "+SLIP_NO_VAR+" 의 날짜를 "+$("#PUR_DT_CHG").val() +" 로 수정  하시겠습니까?") == false){  
		return;
	}
	
	  
	
	jQuery.ajax({ 
	    url:"/purchChangeDate.do",         
	    type:"POST",
		datatype:"xml",
		async:true,
		data: {    
	             "SLIP_NO"     : SLIP_NO_VAR
	    ,        "PUR_DT_CHG"  : $("#PUR_DT_CHG").val().replace(/-/g, "")
	    }, 
		success:function(data){   
			if(  data[0].RETURN_CODE  == "0000")
			{   
				alert("전표 날짜가 수정 되었습니다.");
			}  
	    },
	    complete : function(data) {  
	    	 $("#PUR_DT_CHG").val("");
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	
	
	
	

}








//function btn_report(report)
//{ 
//	if(   $("#selectedPrintRow").val() == "" )
//	{ 	alert('출력할 매입 전표를 선택 하세요.');
//		return;
//	}
//	var P_CORP_CODE =$("#P_PRINT_CORP_CODE").val().substring(  0,
//								 $("#P_PRINT_CORP_CODE").val().length - 1);
//	var P_STR_CODE =$("#P_PRINT_STR_CODE").val().substring(  0,
//								$("#P_PRINT_STR_CODE").val().length - 1);
//	var P_PUR_DT =$("#P_PRINT_PUR_DT").val().substring(  0,
//							$("#P_PRINT_PUR_DT").val().length - 1).replace(/-/gi,"");
//	var P_SLIP_NO =$("#selectedPrintRow").val().substring(  0,
//							$("#selectedPrintRow").val().length - 1);
//	var params = "?reportMode=HTML"	+
//						"&P_CORP_CODE="		+P_CORP_CODE+
//						"&P_STR_CODE="		+P_STR_CODE+
//						"&P_PUR_DT="			+P_PUR_DT+
//						"&P_SLIP_NO="			+P_SLIP_NO; // AIViewer 파라미터
//	window.open(report + params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
//
//}


//function btn_save(){
//	 
//	 
//	if( typeof  dataRow2["PUR_CFM_DT"] != 'undefined'  )
//	{
//		alert('매입(입고)가 확정되어 저장 할 수 없습니다.');
//		return;
//	}
//	  
//	// 그리드에 대한 유효성 검사
//	var rowCnt  = gridRoot1.getCollection().getSource() ;   
//	if(rowCnt.length == 0)
//	{   alert("등록된 매입상품이 없습니다.");
//		return;
//	}
//	 
//	for(var i=0 ; i < rowCnt.length ; i++)
//	{   
//		if(  typeof  gridRoot1.getItemFieldAt( i , "DEC_QTY") == 'undefined' ||   gridRoot1.getItemFieldAt( i , "DEC_QTY") == ''  )
//		{   alert("하단 그리드의 확정수량을 입력 하세요");
//			return;
//		}
//		
//		if( typeof gridRoot1.getItemFieldAt( i , "PUR_WAMT") == 'undefined'   || gridRoot1.getItemFieldAt( i , "PUR_WAMT") == '' )
//		{   alert("하단 그리드의 매입원가금액을 입력 하세요");
//			return;
//		}  
//	}   
//
//
////	// 매입 헤더 신규 저장 위해 xml 만듦
////	var orderStoreHeader = ""; 
////	var firstTag="<GRIDROW></GRIDROW>";  
////	if (window.DOMParser)
////    {   parser = new DOMParser();
////        xmlDoc = parser.parseFromString(firstTag,"text/xml");
////	}
////	else // 인터넷 익스플로러
////	{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
////	    xmlDoc.async=false;
////        xmlDoc.loadXML(firstTag); 
////    }   
////	var ORD_DT		= xmlDoc.createElement('ORD_DT'); 
////	var STR_CODE	= xmlDoc.createElement('STR_CODE');  
////	var PUR_GB		= xmlDoc.createElement('PUR_GB');        // 매입구분
////	var ROUTE_GB	= xmlDoc.createElement('ROUTE_GB');      // 배송구분
////	var VEN_CODE	= xmlDoc.createElement('VEN_CODE');      // 협력업체코드
////	var ORD_TYPE_GB	= xmlDoc.createElement('ORD_TYPE_GB');   // 발주형태구분 
////	var MKT_GB		= xmlDoc.createElement('MKT_GB');        // 매장구분
////	var PUR_DT		= xmlDoc.createElement('PUR_DT');        // 매입일자  
////	var CFM_YN		= xmlDoc.createElement('CFM_YN');   
////	var SLIP_NO		= xmlDoc.createElement('SLIP_NO');   
////	SLIP_NO.appendChild( xmlDoc.createTextNode(     $("#SLIP_NO").val()     )	); 
////	CFM_YN.appendChild( xmlDoc.createTextNode(     	$("#CFM_YN").val()      )	); 
////    ORD_DT.appendChild( xmlDoc.createTextNode(     	$("#ORD_DT").val()      )	); 
////    STR_CODE.appendChild( xmlDoc.createTextNode(    $("#STR_CODE").val()    )	); 
////    PUR_GB.appendChild( xmlDoc.createTextNode(     	$("#PUR_GB").val()      )	); 
////    ROUTE_GB.appendChild( xmlDoc.createTextNode(    $("#ROUTE_GB").val()    )	); 
////    VEN_CODE.appendChild( xmlDoc.createTextNode(    "000000"        	    )	);   // 협력업체코드   000000 으로 채우기 
////    ORD_TYPE_GB.appendChild( xmlDoc.createTextNode( "2"        				)	);   // 발주형태구분    2(권고) 로 채우기 
////    MKT_GB.appendChild( xmlDoc.createTextNode(     	"1"       				)	);   // 매장구분     1(매장)으로 채우기
////    PUR_DT.appendChild( xmlDoc.createTextNode(     	$("#PUR_DT").val()      )	);   
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   SLIP_NO		 ); 
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   CFM_YN		 ); 
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ORD_DT		 ); 
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   STR_CODE	     ); 
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   PUR_GB		 ); 
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ROUTE_GB	     ); 
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   VEN_CODE	     ); 
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ORD_TYPE_GB	 ); 
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   MKT_GB		 ); 
////    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   PUR_DT		 );  
////    orderStoreHeader  =  "<GRIDLIST>"+getXmlString(   xmlDoc   )+"</GRIDLIST>" ; 
//     
//    
//	// 매입 상품 등록 위해서 XML로 만듬 
//    var purchDetail = ""; 
//	var rowCnt  = gridRoot1.getCollection().getSource() ;  
//	for(var i=0 ; i < rowCnt.length ; i++)
//	{    purchDetail = purchDetail + getXmlString(   gridRoot1.getItemAt(i)   );     }  
//	purchDetail =  "<GRIDLIST>"+purchDetail+"</GRIDLIST>" ;
//   
//	 
//	//   매입 저장 ( 업데이트 )      
//	jQuery.ajax({ 
//	    url:"/purchRegisterDelete.do",        
//	    type:"POST",
//		datatype:"xml",
//		async:true,
//		data: {
//			"SLIP_NO"        : dataRow2["SLIP_NO"]
//		,	"purchDetail"    : purchDetail   
//	    }, 
//		success:function(data){   
//			if(  data[0].RETURN_CODE  == "0000")
//			{  
//				// 저장에 성공 했으므로  수정 모드로 바꾼다
////				crudBit = "U"; 
//				btn_search();
// 			  
////		    	btn_clear();
//				 
//			    alert("매입 저장에 성공 하였습니다"); 
//				
//			} else {
//				alert("매입 저장에 실패 하였습니다");
//			}   
//			
//	    },
//	    complete : function(data) {
//
//	    },
//	    error : function(xhr, status, error) {
//	    	CommonJs.alertErrorStatus(xhr.status, error);
//	    }
//	});
// 	
//}


 
 
//function purchDel(){
//	
//	selectorColumn2 = gridRoot2.getObjectById("selector2"); 
//	var chkArr = selectorColumn2.getSelectedIndices() ; 
//	
//	if( chkArr.length == 0)
//	{   alert("삭제할 매입 건이 체크되지 않았습니다.");
//		return;
//	}
//	
//	if (confirm("매입 건을 삭제 하시겠습니까?") == false){  
//		return;
//	}
//	
//	var purchDelXml = "";  
//	
//	for(var i = 0; i < chkArr.length ; i++)
//	{       // 매입 삭제 - 슬립넘버를 xml 로  만든다.  
//		 
//			var firstTag="<GRIDROW></GRIDROW>";  
//			if (window.DOMParser)
//		    {   parser = new DOMParser();
//		        xmlDoc = parser.parseFromString(firstTag,"text/xml");
//			}
//			else // 인터넷 익스플로러
//			{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
//			    xmlDoc.async=false;
//		        xmlDoc.loadXML(firstTag); 
//		    }  
//		    
//			var SLIP_NO		= xmlDoc.createElement('SLIP_NO');   
//			SLIP_NO.appendChild( xmlDoc.createTextNode(     	gridRoot2.getItemFieldAt( chkArr[i] , "SLIP_NO")     )	);   
//		    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   SLIP_NO		 );   
//		    purchDelXml = purchDelXml + getXmlString(   xmlDoc   );
//	} 
//	purchDelXml  =  "<GRIDLIST>"+ purchDelXml +"</GRIDLIST>" ; 
//	  
//    //  매입 삭제   
//	jQuery.ajax({ 
//	    url:"/purchDelDelete.do",          // orderDel.do 
//	    type:"POST",
//		datatype:"xml",
//		async:false,
//		data: {      "purchDelXml"   : purchDelXml       
//	    }, 
//		success:function(data){   
//			if(  data[0].RETURN_CODE  == "0000")
//			{    
//				btn_search();
//				
//				alert("매입 삭제에 성공 하였습니다");
//				
//			} else {
//				alert("매입 삭제에 실패 하였습니다");
//			}   
//			
//	    },
//	    complete : function(data) {
//	    	 
//	    },
//	    error : function(xhr, status, error) {
//	    	CommonJs.alertErrorStatus(xhr.status, error);
//	    }
//	});
//	 
//}
 

function btn_clear(){
	 
	BTN_SAVE_BIT = "Y";
	
//	$("#btn_save").show(); 
//	$("#btn_add").show();
//	$("#btn_del").show();
		
	// 초기화 버튼  클릭시 발주일자 입력란을 인에이블 한다. 단 readonly 는 true 로 한다.
//	$( "#ORD_DT" ).datepicker( "option", "disabled", false );
//	$("input[name=ORD_DT]").attr("readonly",true);
	
	
	// 조회조건 초기화
	$("form").each(function() {  
        if(this.id == "frmSearch") this.reset();  
    });
	
	init();
	
	$("#VEN_CODE").val("");
	
	// 배송구분 초기화 후, 선택 넣고 다시 그려주고, R3 를 뺀다. 
//	$('#ROUTE_GB').find('option').remove().end().append('<option value="">선택</option>').val(''); 
//	getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	);  
//	$("#ROUTE_GB  option[value='R3']").remove();    // 배송구분에서 R3 는 뺀다.
	
	// 그리드 초기화
	gridRoot1.removeAll();
	gridRoot2.removeAll();
	
	// 신규모드로 전환
	crudBit = "C";

	$('#TOT_WSPRC_TAX_FREE').val("");  
	$('#TOT_WSPRC_TAX_ADD').val("");  
	$('#TOT_WVAT').val("");  
	$('#TOT_PRICE').val("");  
	$('#TOT_SPRC').val("");  
	$('#BOT_SPRC_TOT').val("");  
	$('#SLIP_NO').val(""); 
	
}



function btn_search(){
	var P_STR_DT_ARR	= $("#PUR_DT_FROM").val().split("-");
	var P_END_DT_ARR 	= $("#PUR_DT_TO").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if($("#STR_CODE").val() == "")
	{   alert("조회 점포를 선택하세요.");
		$("#STR_CODE").focus();
		return;
	}
	
	if($("#PUR_DT_FROM").val() == "")
	{   alert("검색할 매입 일자를 선택하세요.");
		$("#PUR_DT_FROM").focus();
		return;
	}
	 
	if($("#PUR_DT_TO").val() == "")
	{   alert("검색할 매입 일자를 선택하세요.");
		$("#PUR_DT_TO").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#PUR_DT_FROM").focus();
		return;
	}


	// 매입 헤더 리스트 보여주기 
	jQuery.ajax({ 
	    url:"/purchHeadSearchDelete.do",          
	    type:"POST",
		datatype:"json",
		async:true,
		beforeSend : function(){   
            gridRoot2.addLoadingBar(); 
	    }, 
		data: {  	"STR_CODE"     : $("#STR_CODE").val() 
		,  	        "VEN_CODE"     : $("#VEN_CODE").val()
		,			"PUR_DT_FROM"  : $("#PUR_DT_FROM").val() 
		,			"PUR_DT_TO"    : $("#PUR_DT_TO").val() 
		,			"PUR_GB"       : $("#PUR_GB").val() 
		,           "CFM_YN"       : $("#CFM_YN").val()   
		,           "PUR_CFM_DT"   : $("#PUR_CFM_DT").val().replace(/-/g, "")   
		,           "SLIP_NO"      : $.trim(  $("#SLIP_NO").val()   )
		
		}, 
		success:function(data){  
			    
			
			//그리드1, 2 초기화 
			gridRoot1.removeAll( );
			gridRoot2.removeAll( );
			
			if(data.length == 0) 
 			{  
 				dataGrid2.setEnabled(true);
 		    	gridRoot2.removeLoadingBar(); 
 				return;
 			} 
			
			gridApp2.setData( data ); 
			  
			
			dataGrid2.setEnabled(true);
 	    	gridRoot2.removeLoadingBar();
	    },
	    complete : function(data) {
	    	  
	    	$("#PUR_DT_CHG").val("");

	    	// 면세원가 금액합계 
	    	$("#TOT_WSPRC_TAX_FREE").val( 0);
	    	 
	    	// 과세원가 금액합계
	    	$("#TOT_WSPRC_TAX_ADD").val( 0); 
	    	
	    	// 부가세 금액합계
	    	$("#TOT_WVAT").val( 0);
	    	  	
	    	// 구입 금액합계
	    	$("#TOT_PRICE").val(  0);
	    	
	    	// 매가 금액합계
	    	$("#TOT_SPRC").val( 0 );
	    	 
	    	// 공병 금액합계 
	    	$("#BOT_SPRC_TOT").val( 0 );
	    	 
	    	
	    	
	    },
	    error : function(xhr, status, error) {
	      	dataGrid2.setEnabled(true);
 	    	gridRoot2.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	 
}
 

//그리드의 selctedIndex를 전달된 행으로 이동
function girdMoveSelctedIndex(idx, dataGrid) {
	 
	// addItemAt나 removeItemAt후에 바로 selctedIndex를 변경하면 무시되는 경우가 발생하여 setTimeout로 지연후 실행토록 함
//	setTimeout(    "gridSetSelectedIndex( "+idx+" , "+dataGrid+" )"    , 100);	 
	 gridSetSelectedIndex("+idx+",dataGrid )  ;
}

function gridSetSelectedIndex(idx, dataGrid ) {      
  
	// 현재 그리드의 verticalScrollPosition을 조사하여 스크롤을 일으킬지 조사하여 필요시 세팅
	var verticalScrollPosition = dataGrid.getVerticalScrollPosition();
	// 그리드의 행수를 가져옵니다 (이 값은 화면에 제대로 표시되지 않는 행을 포함하기 때문에 실제와 다른 값으로 보일 수 있으며, DataGrid의 variableRowHeight가 true일 경우에는 추정치를 의미합니다.
	var rowCount = dataGrid.getRowCount();
	if (rowCount > 0)
		rowCount = rowCount - 1;
	var halfRowCount = (rowCount / 2).toFixed();

	// idx가 값이 없는 경우 collection에서 현재 데이터의 레코드수를 가져와 맨 마지막 행값을 계산.
	if (idx == null || idx == undefined) {
		if (!collection)
			collection = gridRoot.getCollection();
		idx = collection.getLength() - 1;
	}
	dataGrid.setSelectedIndex(idx);
	if (idx < verticalScrollPosition || idx > verticalScrollPosition + rowCount) {
		if (idx - halfRowCount >= 0)	// 화면 중간에 위치하도록 계산
			dataGrid.setVerticalScrollPosition(idx - halfRowCount);
		else
			dataGrid.setVerticalScrollPosition(0);
	}
}
 
  

// 자바스크립으로 서버시간 가져오기  window.location.href.toString()
var xmlHttp; 
function srvTime()
{ 		 
	 
		if(window.XMLHttpRequest) {//분기하지 않으면 IE에서만 작동된다. 
			xmlHttp = new XMLHttpRequest(); // IE 7.0 이상, 크롬, 파이어폭스 등 
			xmlHttp.open('HEAD', window.location.href.toString() ,false); 
			xmlHttp.setRequestHeader("Content-Type", "text/html"); 
			xmlHttp.send(''); 
			return xmlHttp.getResponseHeader("Date"); 
		} else if (window.ActiveXObject) { 
		 
			xmlHttp = new ActiveXObject('Msxml2.XMLHTTP'); 
			xmlHttp.open('HEAD',window.location.href.toString(),false); 
			xmlHttp.setRequestHeader("Content-Type", "text/html"); 
			xmlHttp.send(''); 
			return xmlHttp.getResponseHeader("Date"); 
		} 
} 

function getTimeDiff(MGMT_ENTRY  , CUR_TIME )
{
	var  DIFF  = MGMT_ENTRY - CUR_TIME ; 
	if(DIFF < 0) { DIFF = DIFF * -1 ;} 
	DIFF =   LPAD( ""+DIFF  ,'0',6);  // 스트링으로 바꾸기 위해서 "" 붙임.
	var  DIFF_H = DIFF.substring(0, 2);
	var  DIFF_M = DIFF.substring(2, 4);
	var  DIFF_S = DIFF.substring(4, 6); 
	return DIFF_H +"시 "+ DIFF_M +"분 "+  DIFF_S +"초";
}

function LPAD(s, c, n) {   
 
    if (! s || ! c || s.length >= n) {
        return s;
    } 
    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
        s = c + s;
    } 
    return s;
}

// 배송루트 변경으로 발주가능 시간 보여주기 변경 
function chgRouteGb()
{  
	// 배송루트 한번 변경 시, 다른것으로 변경 못하게 한다. 
	$("#ROUTE_GB    option[value!='"+$("#ROUTE_GB").val()+"']").remove(); 
	  
	// ROUTE_GB 병경으로 인한 발주가능시간 구하기
	// 발주 불가능일때 저장버튼 disable 한다.
	jQuery.ajax({ 
	    url:"/getCommonMgmtEntry.do",           // orderStoreProductSelect 
	    type:"POST",
		datatype:"json",
		async:false,
	 	data: {	"CD_CL"  : "ROUTE_GB"
	 	, 		"CD_ID"  : $('#ROUTE_GB').val()   
	 	},
		success:function(data){
		     
			if(  data.length > 0 )
			{    
				var st = srvTime(); 
				var today = new Date(st); 
				var hh =  today.getHours();
				var mm =  today.getMinutes();   if(mm < 10)  {  mm = "0"+mm;  }  
				var ss =  today.getSeconds();   if(ss < 10)  {  ss = "0"+ss;  } 
				 
				var MGMT_ENTRY_1 = data[0].MGMT_ENTRY_1 ;
				var MGMT_ENTRY   = data[0].MGMT_ENTRY_2 ;
				var MGMT_ENTRY_2 = MGMT_ENTRY.substring(0, 6);                 
				var MGMT_ENTRY_3 = MGMT_ENTRY.substring(6, 12);
				  
				var CUR_TIME = hh  +""+ mm  +""+ ss;
				 
				if(  (MGMT_ENTRY_1 - CUR_TIME) > 0 )       // 양수 
				{   
					$('#MGMT_ENTRY').val(    getTimeDiff(MGMT_ENTRY_1 , CUR_TIME )    ) ; 
					BTN_SAVE_BIT = "Y";
					
				} else {   // 음수
					
					   if(  (MGMT_ENTRY_2 < CUR_TIME) && (MGMT_ENTRY_3 > CUR_TIME) )
				       {      
						   BTN_SAVE_BIT = "Y";
						   $('#MGMT_ENTRY').val(  getTimeDiff(MGMT_ENTRY_3 , CUR_TIME )  ) ;
						   //	 alert("발주가능 2 : "+CUR_TIME  + "_" + MGMT_ENTRY_2 + "_" + MGMT_ENTRY_3); // 차이를 시간으로 걔산 해서 보여주기     
 
				       } else { 
				    	   BTN_SAVE_BIT = "N";
				    	   alert( "선택하신 배송루트는 발주불가능 합니다.\n[초기화] 버튼을 클릭하고 다른 배송루트를 선택 하세요." ) ;
				    	   $('#MGMT_ENTRY').val( "발주 불가능" ) ; 
				       }  
					
				}
				  
			} else {
				 
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


// 그리드 2 ( 헤더) 의 ROW 클릭시 발생
function purchHeadDtailInfo( PUR_DT,   STR_CODE , SLIP_NO ,PUR_GB , PUR_CFM_DT , CFM_DT ,  PAY_CLOSE )
{ 
	 
	 
	
//	// 이 함수 하단에서 ROUTE_GB 를 선택 못하게 했으므로 , 항상 이 함수 수행시 ROUTE_GB 코드를 새로 뿌려줘야 한다. ( grid2 의 다른 row 가 선택 되므로...) 
//	$("select[name='ROUTE_GB'] option").remove();    			// ROUTE_GB 초기화   
//	getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	);   //ROUTE_GB 다시 채움 
//	// 매입 헤더 정보 보여주기
//	jQuery.ajax({ 
//	    url:"/orderHeadInfo.do",         // productCustomerInfoSelect
//	    type:"POST",
//		datatype:"json",
//		async:false,
//	 	data: {    "SLIP_NO"  : SLIP_NO
//	 	},
//		success:function(data){ 
//			$('#ORD_DT').val( 	data[0].ORD_DT.substr(0,4) + "-" + data[0].ORD_DT.substr(4,2) + "-" + data[0].ORD_DT.substr(6,2)  );
//			$('#PUR_DT').val( 	data[0].PUR_DT.substr(0,4) + "-" + data[0].PUR_DT.substr(4,2) + "-" + data[0].PUR_DT.substr(6,2)  ); 
//	 		$('#ROUTE_GB').val(	data[0].ROUTE_GB	);  
//	 		$('#PUR_GB').val(	data[0].PUR_GB		); 
//	 		$('#SLIP_NO').val(	SLIP_NO				);  
//	 		// 확정일자 유무에 따라서 각종 저장버튼 보이고 안보이게 하기
//	 		if(  typeof data[0].CFM_DT  == "undefined"   ||  data[0].CFM_DT == "" )
//	 		{   $('#CFM_YN').val(  'N'	);  
//	 			$("#btn_save").show(); 
//	 			$("#btn_add").show();
//	 			$("#btn_del").show(); 
//	 		} else { 
//	 			$('#CFM_YN').val(  'Y'  );  
//	 			$("#btn_save").hide(); 
//	 			$("#btn_add").hide();
//	 			$("#btn_del").hide();
//	 		} 
//	    },
//	    complete : function(data) { 
//	    },
//	    error : function(xhr, status, error) {
//	    	CommonJs.alertErrorStatus(xhr.status, error);
//	    }
//	}); 
//	// 발주 헤더 보여줄 시 배송구분과  발주일자는 수정 못하게 한다.
//	// 배송구분과  발주일자는 수정시 변경 되면 안되므로 
//	$( "#ORD_DT" ).datepicker( "option", "disabled", true );
//	$("input[name=ORD_DT]").attr("readonly",true); 
//	$("#ROUTE_GB  option[value!='"+$("#ROUTE_GB").val()+"']").remove(); 
     
   
	  
	var DEC_QTY_COL  	= gridRoot1.getObjectById("DEC_QTY"); 
	var PUR_WAMT_COL 	= gridRoot1.getObjectById("PUR_WAMT"); 
	   

	var PUR_WPRC_COL         =  gridRoot1.getObjectById("PUR_WPRC"); 
	var PUR_WVAT_COL         =  gridRoot1.getObjectById("PUR_WVAT"); 
	var PUR_WAMT_TOT_COL     =  gridRoot1.getObjectById("PUR_WAMT_TOT"); 

	
	// PUR_CFM_DT 가 있고, 지불마감이 안되었으면 금액만 수정가능하게 하기 
	if( typeof PUR_CFM_DT   !=   'undefined'  &&  typeof PAY_CLOSE  ==   'undefined' )
	{
		 DEC_QTY_COL.editable  		   = false; // 수량 활성화
		 PUR_WAMT_COL.editable 		   = false;  // 금액 활성화 
		 
		 PUR_WPRC_COL.editable         =  false;   // 공급가
		 PUR_WVAT_COL.editable         =  false;   // 부가세 
		 PUR_WAMT_TOT_COL.editable     =  false;   // 합계금액  
		 
//		 $("#btn_save_amt").show();     //  이때만 PO_PURCH_ADJUST 에 넣어준다. 없으면 insert 있으면 업데이트
	} else if( typeof PUR_CFM_DT  !=   'undefined'  &&  typeof PAY_CLOSE  !=   'undefined' ) {
		 DEC_QTY_COL.editable  	       = false; // 수량 비활성화
		 PUR_WAMT_COL.editable 		   = false; // 금액 비활성화 
		 
		 PUR_WPRC_COL.editable         =  false;   // 공급가
		 PUR_WVAT_COL.editable         =  false;   // 부가세 
		 PUR_WAMT_TOT_COL.editable     =  false;   // 합계금액  
//		 $("#btn_save_amt").hide(); 
		 
	} else if( typeof PUR_CFM_DT  ==   'undefined'  ) {           
		 DEC_QTY_COL.editable  		   = false; // 수량  활성화
		 PUR_WAMT_COL.editable 		   = false; // 금액  활성화 
		 
		 PUR_WPRC_COL.editable         =  false;   // 공급가
		 PUR_WVAT_COL.editable         =  false;   // 부가세 
		 PUR_WAMT_TOT_COL.editable     =  false;   // 합계금액  
		 
//		 $("#btn_save_amt").show();
	}
	
	//   CFM_DT 가 있으면 수정 못하게 막기
	if(  typeof  CFM_DT   !=   'undefined' )
	{ 	 DEC_QTY_COL.editable  = false; 
		 PUR_WAMT_COL.editable = false; 
		 
		 PUR_WPRC_COL.editable         =  false;   // 공급가
		 PUR_WVAT_COL.editable         =  false;   // 부가세 
		 PUR_WAMT_TOT_COL.editable     =  false;   // 합계금액  
//		 $("#btn_save_amt").hide();
	} 
	  
	  
	 
	 
	// 매입상품 리스트 정보 보여주기 - grid2 
	jQuery.ajax({ 
	    url:"/purchDetailInfoDelete.do",          
	    type:"POST",
		datatype:"xml",
		async:true,
		beforeSend : function(){   
            gridRoot1.addLoadingBar(); 
	    }, 
		data: {   "PUR_DT"          : PUR_DT.replace(/-/g, "")  
		, 		  "STR_CODE"        : STR_CODE 
		,		  "SLIP_NO"         : SLIP_NO 
		},
		success:function(data){  
			// gridApp2.setData( data );  
			 
			//그리드1 초기화 
			gridRoot1.removeAll();
			if(data.length == 0) 
 			{  
 				dataGrid1.setEnabled(true);
 		    	gridRoot1.removeLoadingBar(); 
 				return;
 			} 
			
			for(var i=0 ; i < data.length ; i++ )
			{ 
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
				var CRUD           = xmlDoc.createElement('CRUD'); 
				var SLIP_NO        = xmlDoc.createElement('SLIP_NO'); 
				var STR_CODE       = xmlDoc.createElement('STR_CODE'); 
				var ITM_CODE       = xmlDoc.createElement('ITM_CODE');
				var LINK_CODE      = xmlDoc.createElement('LINK_CODE');
				var ITM_NAME       = xmlDoc.createElement('ITM_NAME');
				var SPECS          = xmlDoc.createElement('SPECS');
				var UNIT           = xmlDoc.createElement('UNIT');
				var IPSU_QTY       = xmlDoc.createElement('IPSU_QTY');
				var ORD_QTY        = xmlDoc.createElement('ORD_QTY');
				var SCM_QTY        = xmlDoc.createElement('SCM_QTY');
				var PUR_QTY        = xmlDoc.createElement('PUR_QTY');
				var DEC_QTY        = xmlDoc.createElement('DEC_QTY');
				var TAX_GB         = xmlDoc.createElement('TAX_GB');
				var TAX_GB_NM      = xmlDoc.createElement('TAX_GB_NM');
				var PUR_WAMT       = xmlDoc.createElement('PUR_WAMT');
				var PUR_WPRC       = xmlDoc.createElement('PUR_WPRC');
				var PUR_WVAT       = xmlDoc.createElement('PUR_WVAT');
				
				var PUR_WPRC_TOT 	= xmlDoc.createElement('PUR_WPRC_TOT');
				var PUR_WVAT_TOT 	= xmlDoc.createElement('PUR_WVAT_TOT');
				
				var PUR_SPRC       = xmlDoc.createElement('PUR_SPRC');
				var PUR_SAMT       = xmlDoc.createElement('PUR_SAMT');
				var BOT_SPRC       = xmlDoc.createElement('BOT_SPRC');
				var BOT_SPRC_TOT   = xmlDoc.createElement('BOT_SPRC_TOT');
				var ORD_FLAG       = xmlDoc.createElement('ORD_FLAG');
				var ORD_FLAG_NM    = xmlDoc.createElement('ORD_FLAG_NM');
				var ORD_SLIP_NO    = xmlDoc.createElement('ORD_SLIP_NO');
				var SEQ    		   = xmlDoc.createElement('SEQ'); 
				var PUR_DT         = xmlDoc.createElement('PUR_DT'); 
				var PUR_WAMT_TOT   = xmlDoc.createElement('PUR_WAMT_TOT');
				var OLD_PUR_WAMT   = xmlDoc.createElement('OLD_PUR_WAMT');
				var OLD_PUR_WVAT   = xmlDoc.createElement('OLD_PUR_WVAT');
				var OLD_PUR_WPRC   = xmlDoc.createElement('OLD_PUR_WPRC'); 
				var OLD_DEC_QTY    = xmlDoc.createElement('OLD_DEC_QTY'); 
				var SUM_COUNT      = xmlDoc.createElement('SUM_COUNT'); 

				
				
				
				OLD_DEC_QTY.appendChild(	xmlDoc.createTextNode(  data[i].DEC_QTY		)   );
				OLD_PUR_WAMT.appendChild(	xmlDoc.createTextNode(  parseFloat(data[i].PUR_WPRC) +    parseFloat(data[i].PUR_WVAT)	)   );
				
				
				CRUD.appendChild(		    xmlDoc.createTextNode(  "" 					) 	);
				SLIP_NO.appendChild(		xmlDoc.createTextNode(	data[i].SLIP_NO		)	);
				STR_CODE.appendChild(		xmlDoc.createTextNode(	data[i].STR_CODE	)	);
				ITM_CODE.appendChild(		xmlDoc.createTextNode(	data[i].ITM_CODE	)	);
				LINK_CODE.appendChild(		xmlDoc.createTextNode(	data[i].LINK_CODE	)	);
				ITM_NAME.appendChild(		xmlDoc.createTextNode(	data[i].ITM_NAME	)	);
				SPECS.appendChild(		    xmlDoc.createTextNode(	data[i].SPECS		)	);
				UNIT.appendChild(		    xmlDoc.createTextNode(	data[i].UNIT		)	);
				IPSU_QTY.appendChild(		xmlDoc.createTextNode(	data[i].IPSU_QTY	)	);
				PUR_DT.appendChild(			xmlDoc.createTextNode(	data[i].PUR_DT		)	);
				
				
//				var ORD_QTY_VAL 	= "0";
//				var DEC_QTY_VAL 	= "0"; 
//				if(PUR_GB == "2")  // 반품이면 음수 붙여준다. 그리고 저장시에는 다시 양수로바꾸어준다. 
//				{
//					ORD_QTY_VAL 	= data[i].ORD_QTY * -1;
//					DEC_QTY_VAL 	= data[i].DEC_QTY * -1 ;  
//				} else {
//					ORD_QTY_VAL 	= data[i].ORD_QTY ;
//					DEC_QTY_VAL 	= data[i].DEC_QTY ; 
//				}	
				ORD_QTY.appendChild(		xmlDoc.createTextNode(	data[i].ORD_QTY		)	);
				DEC_QTY.appendChild(		xmlDoc.createTextNode(	data[i].DEC_QTY		)	);
				
				
				
//				PUR_WAMT_TOT.appendChild(	xmlDoc.createTextNode(	parseFloat(data[i].PUR_WAMT)  * parseFloat(data[i].DEC_QTY)	)	);
				
				var PUR_WAMT_TOT_VAL = parseInt(	(parseFloat(data[i].PUR_WPRC) + parseFloat(data[i].PUR_WVAT)) *  parseFloat(data[i].DEC_QTY ) ) * 1;
				PUR_WAMT_TOT.appendChild(	xmlDoc.createTextNode(     PUR_WAMT_TOT_VAL    	));
				
				SCM_QTY.appendChild(		xmlDoc.createTextNode(	data[i].SCM_QTY		)	);
				PUR_QTY.appendChild(		xmlDoc.createTextNode(	data[i].PUR_QTY		)	); 
				TAX_GB.appendChild(		    xmlDoc.createTextNode(	data[i].TAX_GB		)	);
				TAX_GB_NM.appendChild(		xmlDoc.createTextNode(	data[i].TAX_GB_NM	)	);
				PUR_WAMT.appendChild(		xmlDoc.createTextNode(	parseFloat(data[i].PUR_WPRC) +    parseFloat(data[i].PUR_WVAT)	)	);
				
				
				var PUR_WPRC_TOT_VAL =  0; 
				
				var PUR_WVAT_TOT_VAL = 0;
				if(  data[i].TAX_GB == "2" )  //면세
				{
					PUR_WVAT_TOT_VAL =  0 ; 
					PUR_WPRC_TOT_VAL =  PUR_WAMT_TOT_VAL  ; 
					
					PUR_WPRC.appendChild(		xmlDoc.createTextNode(	data[i].PUR_WAMT	)	);
					PUR_WVAT.appendChild(		xmlDoc.createTextNode(	"0"	)	);
					
					OLD_PUR_WVAT.appendChild(	xmlDoc.createTextNode(  "0"	)   );
					OLD_PUR_WPRC.appendChild(	xmlDoc.createTextNode(  parseFloat(data[i].PUR_WPRC)     +   parseFloat(data[i].PUR_WVAT)	)   );
					
				} else {
					PUR_WVAT_TOT_VAL =    parseFloat( data[i].DEC_QTY )    *   parseFloat( data[i].PUR_WVAT )   ;  
					PUR_WPRC_TOT_VAL =    parseFloat( data[i].DEC_QTY )    *   parseFloat( data[i].PUR_WPRC )   ; 
					
//					PUR_WVAT_TOT_VAL =  Math.floor( PUR_WAMT_TOT_VAL / 11 ) ;  
//					PUR_WPRC_TOT_VAL =  PUR_WAMT_TOT_VAL- Math.floor( PUR_WAMT_TOT_VAL / 11 ) ; 
					
					PUR_WPRC.appendChild(		xmlDoc.createTextNode(	data[i].PUR_WPRC	)	);
					PUR_WVAT.appendChild(		xmlDoc.createTextNode(	data[i].PUR_WVAT	)	);
					
					OLD_PUR_WVAT.appendChild(	xmlDoc.createTextNode(  data[i].PUR_WVAT	)   );
					OLD_PUR_WPRC.appendChild(	xmlDoc.createTextNode(  data[i].PUR_WPRC	)   );
					
				}
				
				PUR_WPRC_TOT.appendChild(	xmlDoc.createTextNode(	 PUR_WPRC_TOT_VAL	));
				
				PUR_WVAT_TOT.appendChild(	xmlDoc.createTextNode(	 PUR_WVAT_TOT_VAL 	));
				
				
				
				PUR_SPRC.appendChild(		xmlDoc.createTextNode(	data[i].PUR_SPRC	)	);
				PUR_SAMT.appendChild(		xmlDoc.createTextNode(	data[i].PUR_SAMT	)	);
				BOT_SPRC.appendChild(		xmlDoc.createTextNode(	data[i].BOT_SPRC	)	);
				BOT_SPRC_TOT.appendChild(	xmlDoc.createTextNode(  data[i].BOT_SPRC_TOT    )   );
				ORD_FLAG.appendChild(		xmlDoc.createTextNode(	data[i].ORD_FLAG	)	);
				ORD_FLAG_NM.appendChild(	xmlDoc.createTextNode(	data[i].ORD_FLAG_NM	)	);
				ORD_SLIP_NO.appendChild(	xmlDoc.createTextNode(	data[i].ORD_SLIP_NO	)	);
				SEQ.appendChild(			xmlDoc.createTextNode(	data[i].SEQ		    )	);
				
				SUM_COUNT.appendChild(		xmlDoc.createTextNode(	"0"		    )	);
				
				
				//  대출원가, 부가세 계산 
//				var WVAT_VAL = 0; 
//				var PUR_AVR_AMT_VAL = data[i].PUR_AVR_AMT;
//				if(  data[i].TAX_GB  == "1"   ) // 과세
//				{ 
//					WVAT_VAL = ( 10 * PUR_AVR_AMT_VAL ) / 100 ; 
//				} else {        // 면세 
//					WVAT_VAL = 0 ; 
//				}  
				 
//				var priceVat = calPriceVat( data[i].PUR_AVR_AMT , data[i].TAX_GB  ); 
//				PUR_AVR_AMT.appendChild(  	xmlDoc.createTextNode( 	priceVat[0]     			)	);   // 단가( VAT 포함)
//				WSPRC.appendChild(  		xmlDoc.createTextNode( 	priceVat[1]  				)	);   // 대출원가
//				WVAT.appendChild(  			xmlDoc.createTextNode( 	priceVat[2]      			)	);   // 부가세
				 
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_WAMT_TOT    );  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CRUD            );  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SLIP_NO         );  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_CODE        );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE        );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	LINK_CODE       );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_NAME        );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SPECS           );          
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	UNIT            );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	IPSU_QTY		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_QTY         );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SCM_QTY		    );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_QTY         );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	DEC_QTY			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TAX_GB          );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TAX_GB_NM		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_WAMT        );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_WPRC		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_WVAT        );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_SPRC		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_SAMT        );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOT_SPRC		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOT_SPRC_TOT    );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_FLAG		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_FLAG_NM     );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_SLIP_NO     );  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SEQ     		); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_DT     		); 

				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_WPRC_TOT   	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PUR_WVAT_TOT   	); 

				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SUM_COUNT   	); 

				
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(OLD_PUR_WAMT ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(OLD_PUR_WVAT ); 
						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(OLD_PUR_WPRC); 

						xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(OLD_DEC_QTY); 
				gridRoot1.addItemAt(  xmlDoc  , 0 , false );
  	
			}
			
			dataGrid1.setEnabled(true);
 	    	gridRoot1.removeLoadingBar();
			   
	    },
	    complete : function(data) {
	    	setTotalSum();
	    },
	    error : function(xhr, status, error) {
	    	dataGrid1.setEnabled(true);
 	    	gridRoot1.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	
	// 수정모드 업데이트로 변경
	crudBit = "U";
	 
	// 합계 정보 조회 뿌려주기
	
	
	
}


function setTotalSum()
{   
	// 합계 정보 조회 뿌려주기
	var rowCnt  = gridRoot1.getCollection().getSource() ;  
	var WSPRC_TAX_ADD 	= 0 ;   // 과세 대출원가
	var WSPRC_TAX_FREE 	= 0 ;   // 면세 대출원가
	var WVAT  			= 0 ;   // 부가세
	var SPRC  			= 0 ;   // 매가
	var BOT_SPRC_TOT    = 0 ;   // 공병
	var DEC_QTY			= 0 ;   // 확정수량
    var PUR_WAMT_TOT    = 0 ;   // 합계금액
    
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		// 확정수량(DEC_QTY)을 금액에 곱해줘야 한다.	  
		DEC_QTY = gridRoot1.getItemFieldAt( i , "DEC_QTY");
		
		// 대출원가
		if( gridRoot1.getItemFieldAt( i , "TAX_GB")  == "1" )  // 과세
		{
			WSPRC_TAX_ADD  = parseFloat(WSPRC_TAX_ADD)  + (   parseFloat(gridRoot1.getItemFieldAt( i , "PUR_WPRC_TOT"))   );
		} else {   // 면세
			WSPRC_TAX_FREE = parseFloat(WSPRC_TAX_FREE) + (   parseFloat(gridRoot1.getItemFieldAt( i , "PUR_WPRC_TOT"))   );
		} 
		WVAT 		 = parseFloat(WVAT) 		 +  (   parseFloat(gridRoot1.getItemFieldAt( i , "PUR_WVAT_TOT"))   );  
		SPRC 		 = parseFloat(SPRC) 		 +  (   parseFloat(gridRoot1.getItemFieldAt( i , "PUR_SAMT"))   );  
		BOT_SPRC_TOT = parseFloat(BOT_SPRC_TOT)  +  (   parseFloat(gridRoot1.getItemFieldAt( i , "BOT_SPRC_TOT"))   );   
	
		PUR_WAMT_TOT  = parseFloat(PUR_WAMT_TOT) +  (   parseFloat(gridRoot1.getItemFieldAt( i , "PUR_WAMT_TOT"))   );  
		 
	}
	 
	
	var selectedIndex = dataGrid2.getSelectedIndex()   ;
	var pur_gb_minus = "";
	if( gridRoot2.getItemFieldAt( selectedIndex , "PUR_GB")    == "2"  )  // 반품 발주일 경우  
	{
		pur_gb_minus = -1;
	} else {
		pur_gb_minus =  1;
	}
		
		
	// 면세원가 금액합계 
	$("#TOT_WSPRC_TAX_FREE").val( WSPRC_TAX_FREE  * pur_gb_minus );
	
	
	// 과세원가 금액합계
	$("#TOT_WSPRC_TAX_ADD").val( WSPRC_TAX_ADD * pur_gb_minus); 
	// 부가세 금액합계
	$("#TOT_WVAT").val( WVAT * pur_gb_minus);
	 
	
	// 과세원가 금액합계
    //	$("#TOT_WSPRC_TAX_ADD").val(    ( parseFloat( PUR_WAMT_TOT ) )  - Math.floor( ( parseFloat( PUR_WAMT_TOT ) ) / 11 )    ); 
	// 부가세 금액합계
    //	$("#TOT_WVAT").val(      Math.floor(    parseFloat( PUR_WAMT_TOT )  / 11 )   );
	
	
	
	
	// 구입 금액합계
	$("#TOT_PRICE").val(    (  parseFloat( PUR_WAMT_TOT )    ) * pur_gb_minus);
	
	// 매가 금액합계
	$("#TOT_SPRC").val( SPRC * pur_gb_minus );
	 
	// 공병 금액합계 
	$("#BOT_SPRC_TOT").val( BOT_SPRC_TOT * pur_gb_minus );
	 
	
	
	
	
	
	/*
	// 면세원가 금액합계 
	$("#TOT_WSPRC_TAX_FREE").val( WSPRC_TAX_FREE  * pur_gb_minus );
	
	// 기존
//	$("#TOT_WSPRC_TAX_ADD").val( WSPRC_TAX_ADD * pur_gb_minus);// 과세원가 금액합계 
//	$("#TOT_WVAT").val( WVAT * pur_gb_minus);    // 부가세 금액합계
	 
	// 구입 금액합계
	var TOT_PRICE_VAL =  (  parseFloat(WSPRC_TAX_FREE)  +  parseFloat(WSPRC_TAX_ADD)  +  parseFloat(WVAT)    ) * pur_gb_minus;
	$("#TOT_PRICE").val(  TOT_PRICE_VAL  );
	 
	// 공급가 부가세 계산전에 공병금액은 빼고 계산해준다.
	var PRICE_MINUS_BOT = (  parseFloat(WSPRC_TAX_ADD)  +  parseFloat(WVAT)   ) - parseFloat(BOT_SPRC_TOT) ;
	
	// 구입금액합걔가 0이면 원가와 부가세는 0이다
	if(TOT_PRICE_VAL == 0)
	{
		$("#TOT_WSPRC_TAX_ADD").val(   "0"   );
		$("#TOT_WVAT").val(       "0"  );
		
	} else {
		$("#TOT_WSPRC_TAX_ADD").val(    ( PRICE_MINUS_BOT )  - Math.floor( ( PRICE_MINUS_BOT  ) / 11 )    );
		$("#TOT_WVAT").val(      Math.floor( ( PRICE_MINUS_BOT  ) / 11 )   );
	}
	 
	// 매가 금액합계
	$("#TOT_SPRC").val( SPRC * pur_gb_minus );
	 
	// 공병 금액합계 
	$("#BOT_SPRC_TOT").val( BOT_SPRC_TOT * pur_gb_minus );
	 
	*/
	
	
	
	
	
}




 
//function btnSaveAmt(){   
// 
////alert(   	gridRoot1.getItemFieldAt( 0 , "DEC_QTY")    );
// 
//	// PO_PURCH_DTL 에 금액 업데이트 하고, PO_PURCH_ADJUST에 없으면 insert 있으면 업데이트 해준다
//	    
////	var value2 = {}; 
////	value2.rowIndex = 1;         // 이동할 행의 index 입니다.
////    value2.columnIndex = 19;    // 이동할 열의 index 입니다.
////    dataGrid1.setEditedItemPosition(value2);   // dateGrid 객체에서 불러오는 함수입니다.
//	
//	
////	$('#VEN_NAME').focus();  
////
////	var idx = 0;
////	var dataGrid1 = "dataGrid1";
////	setTimeout(    "gridSetSelectedIndex( "+idx+" , "+dataGrid1+" )"    , 4400);	
//// 
////	$('#VEN_NAME').focus();  
//	 
//	if (confirm("확정수량 및 매입상품금액을 수정 하시겠습니까?") == true){     
////			var selectedIndex = dataGrid1.getSelectedIndex();
////			gridRoot1.removeItemAt(selectedIndex); 
// 
//		} else {    
//		    return;
//    } 
//	  
//	// 그리드에 대한 유효성 검사
//	var rowCnt  = gridRoot1.getCollection().getSource() ;   
//	if(rowCnt.length == 0)
//	{   alert("등록된 매입상품이 없습니다.");
//		return;
//	}
//	 
//	for(var i=0 ; i < rowCnt.length ; i++)
//	{   
//		if(  typeof  gridRoot1.getItemFieldAt( i , "DEC_QTY") == 'undefined' ||   gridRoot1.getItemFieldAt( i , "DEC_QTY") == ''  )
//		{   alert("하단 그리드의 확정수량을 입력 하세요.");
//			return;
//		}
//		
//		if( typeof gridRoot1.getItemFieldAt( i , "PUR_WAMT") == 'undefined'   || gridRoot1.getItemFieldAt( i , "PUR_WAMT") == '' )
//		{   alert("하단 그리드의 매입원가금액을 입력 하세요");
//			return;
//		}  
//	}   
//  
//	// 매입 상품 등록 위해서 XML로 만듬 
//    var purchDetail = ""; 
//	var rowCnt  = gridRoot1.getCollection().getSource() ;  
//	for(var i=0 ; i < rowCnt.length ; i++)
//	{    purchDetail = purchDetail + getXmlString(   gridRoot1.getItemAt(i)   );     }  
//	purchDetail =  "<GRIDLIST>"+purchDetail+"</GRIDLIST>" ;
//      
//	jQuery.ajax({ 
//	    url:"/purchRegisterAmt.do",        
//	    type:"POST",
//		datatype:"xml",
//		async:true,
//		data: {
//			"SLIP_NO"        : dataRow2["SLIP_NO"]
//		,	"purchDetail"    : purchDetail   
//	    }, 
//		success:function(data){   
//			if(  data[0].RETURN_CODE  == "0000")
//			{  
//				// 저장에 성공 했으므로  수정 모드로 바꾼다
////				crudBit = "U"; 
//				
//				btn_search();
// 			  
////		    	btn_clear();
//				 
//			    alert("매입금액수정에 성공 하였습니다"); 
//				
//			} else {
//				alert("매입 저장에 실패 하였습니다");
//			}    
//	    },
//	    complete : function(data) {
//
//	    },
//	    error : function(xhr, status, error) {
//	    	CommonJs.alertErrorStatus(xhr.status, error);
//	    }
//	});
// 	
//}




function orderProductDup(SCAN_CODE)
{
	var rowCnt  = gridRoot1.getCollection().getSource() ; 
	var cnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   if( gridRoot1.getItemFieldAt( i , "SCAN_CODE")  == SCAN_CODE  ) 
		{
			cnt = cnt + 1;
		}  
	}
	cnt = cnt - 1; // 입력한 바코드가 cnt에 포함되므로 여기서 하나를 빼준다. 
	return cnt;
}


// 단가와 과세구분 입력하여 -> 단가, 운가, 부가세 뽑기
function calPriceVat(  PUR_AVR_AMT  , TAX_GB )
{  
	var WSPRC_VAL = 0;
	var WVAT_VAL = 0;  
	if(  TAX_GB  == "1"   ) // 과세
	{  
	 
		WSPRC_VAL = PUR_AVR_AMT- Math.floor( PUR_AVR_AMT / 11 ) ;  
		WVAT_VAL =    Math.floor( PUR_AVR_AMT / 11 ) ; 
		
	} else {        // 면세 
		WSPRC_VAL  = PUR_AVR_AMT ; 
		WVAT_VAL = 0 ; 
	} 
	return [ PUR_AVR_AMT , WSPRC_VAL , WVAT_VAL];
}

function itemDataChangeHandler1(event) {
	  
	var rowIndex 	= event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;				// 변경된 열번호
	var dataField 	= event.dataField;					// 변경된 열의 데이터 필드
	var dataRow 	= gridRoot1.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue 	= event.value;						// 변경전 값
	var newValue 	= event.newValue;					// 변경후 값
//	var dataGrid 	= gridRoot1.getDataGrid();
	
	 
	//if(newValue == "")    {  return; }   // 선택한 값이 ""  일때  빠져나감
	 
	 
	
	// 공급가 변경시 : 매입단가(PUR_WAMT) = 공급가 + 부가세    ,      합계금액(PUR_WAMT_TOT)  = (공급가 + 부가세 ) * 확정수량
	if(   dataField == "PUR_WPRC"  ) 
	{
		var PUR_WPRC = gridRoot1.getItemFieldAt( rowIndex , "PUR_WPRC") ;    // 공급가
		var PUR_WVAT = gridRoot1.getItemFieldAt( rowIndex , "PUR_WVAT") ;    // 부가세
		var DEC_QTY  = gridRoot1.getItemFieldAt( rowIndex , "DEC_QTY") ;     // 확정수량 
		
		gridRoot1.setItemFieldAt(  parseFloat(PUR_WPRC) + parseFloat(PUR_WVAT)                , rowIndex, "PUR_WAMT");        // 매입단가
		gridRoot1.setItemFieldAt(  parseInt (  (parseFloat(PUR_WPRC) + parseFloat(PUR_WVAT)) *  parseFloat(DEC_QTY)  )*1 , rowIndex, "PUR_WAMT_TOT");    // 합계금액
	
		gridRoot1.setItemFieldAt(   parseFloat(newValue) *  parseFloat(DEC_QTY)   , rowIndex, "PUR_WPRC_TOT");    // 공급가 * 수량금액
		gridRoot1.setItemFieldAt( "U" , rowIndex  , "CRUD"  ); 
		 
	    
		 
		
	}
	
	// 부가세 변경시  : 매입단가  = 공급가 + 부가세   ,    합계금액  = (공급가 + 부가세 ) * 확정수량
	if(   dataField == "PUR_WVAT"  ) 
	{
			var TAX_GB = gridRoot1.getItemFieldAt( rowIndex , "TAX_GB") ;     // 부가세
 
			if( TAX_GB == "2")  //면세
			{
				alert("면세상품은 VAT 가 0 이어야 합니다.");
				gridRoot1.setItemFieldAt( "0"   , rowIndex, "PUR_WVAT");    
				return;
			} else { 
				var PUR_WPRC = gridRoot1.getItemFieldAt( rowIndex , "PUR_WPRC") ;    // 공급가
				var PUR_WVAT = gridRoot1.getItemFieldAt( rowIndex , "PUR_WVAT") ;    // 부가세
				var DEC_QTY  = gridRoot1.getItemFieldAt( rowIndex , "DEC_QTY") ;     // 확정수량 
				
				gridRoot1.setItemFieldAt(  parseFloat(PUR_WPRC) + parseFloat(PUR_WVAT)                , rowIndex, "PUR_WAMT");        // 매입단가
				gridRoot1.setItemFieldAt( parseInt(  (parseFloat(PUR_WPRC) + parseFloat(PUR_WVAT)) *  parseFloat(DEC_QTY ) ) *1  , rowIndex, "PUR_WAMT_TOT");    // 합계금액
			

				gridRoot1.setItemFieldAt(   parseFloat(newValue) *  parseFloat(DEC_QTY)   , rowIndex, "PUR_WVAT_TOT");    // 공급가 * 수량금액
			
			}
			gridRoot1.setItemFieldAt( "U" , rowIndex  , "CRUD"  ); 
			
	}
	
	
	
	// [ 확정 수량 변경 시 ]
	// 매입원가금액 = ( 매입원가 + 매입원가부가세 ) * 확정수량   
    // 매입매가금액 = 매입매가 * 확정수량
	// 합계 토탈 다시계산 
	if(   dataField == "DEC_QTY"  ) {
		 
		if(newValue == "")
		{   // alert("확정 수량을 입력 하세요.");
			gridRoot1.setItemFieldAt(  "0"  , rowIndex, "DEC_QTY"); 
			//			return;
		}
		// 수정시 CRUD 에 "U" 를 넣어준다. 매입금액 수정에서 수정된것만 저장하기위함.
		gridRoot1.setItemFieldAt( "U" , rowIndex  , "CRUD"  ); 
		
		  
		
		// 0 도 입력 할수있게 한다.그래서 아래 코드 주석 처리 한다.
//		if( parseInt(newValue) <= parseInt( 0 ) )
//		{   alert("매입 발주의 확정상품 수량은 양수이여야만 합니다.");
//			gridRoot1.setItemFieldAt( oldValue  , rowIndex, "DEC_QTY"); 
//			return;
//		}  
		
		if( newValue > parseInt(gridRoot1.getItemFieldAt( rowIndex , "ORD_QTY"  ))   )
		{   alert('확정수량은 발주수량보다 클수 없습니다. '); 
			gridRoot1.setItemFieldAt(  oldValue  , rowIndex, "DEC_QTY"); 
			return;
		}
		
		
		// 공병 금액 계산해서 보여주기 :  IPSU_QTY(입수)  * DEC_QTY(확정수량) * BOT_SPRC(공병단가)  = BOT_SPRC_TOT(공병금액) 
		var IPSU_QTY = gridRoot1.getItemFieldAt( rowIndex , "IPSU_QTY") ;
		var DEC_QTY  = newValue ;
		var BOT_SPRC = gridRoot1.getItemFieldAt( rowIndex , "BOT_SPRC") ; 
		gridRoot1.setItemFieldAt( IPSU_QTY * DEC_QTY * BOT_SPRC  , rowIndex, "BOT_SPRC_TOT"); 
		  
		
		
		 
//		// 매입원가금액 = ( 매입원가 + 매입원가부가세 ) * 확정수량   
//		var PUR_WPRC = parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_WPRC"  )  ) ;
//		var PUR_WVAT = parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_WVAT"  )  ) ;
//		var DEC_QTY  = parseFloat( gridRoot1.getItemFieldAt( rowIndex , "DEC_QTY"   )  ) ; 
//		gridRoot1.setItemFieldAt( Math.round(     ( parseFloat(PUR_WPRC) + parseFloat(PUR_WVAT) ) * DEC_QTY    )
//								, rowIndex 
//								, "PUR_WAMT"  ); 
		  
		// 매입매가금액 = 매입매가 * 확정수량  
		var PUR_SPRC  = parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_SPRC"   )  ) ; 
		gridRoot1.setItemFieldAt( PUR_SPRC * DEC_QTY    
								, rowIndex 
								, "PUR_SAMT"  ); 
		
		// 매입원가총금액 = 확정수량 * 매입원가금액
		// PUR_WAMT_TOT = DEC_QTY * PUR_WAMT 
		var PUR_WAMT  =  gridRoot1.getItemFieldAt( rowIndex , "PUR_WAMT"   )   ;   
		gridRoot1.setItemFieldAt( parseFloat(PUR_WAMT) * parseFloat(newValue)    
								, rowIndex 
								, "PUR_WAMT_TOT"  ); 
		  
		
		// 수량 변경시 공급가*수량,  부가세*수량  보여주기 
		var PUR_WPRC = parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_WPRC"  )  ) ;
		var PUR_WVAT = parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_WVAT"  )  ) ;
		var DEC_QTY  = parseFloat( gridRoot1.getItemFieldAt( rowIndex , "DEC_QTY"   )  ) ; 
		 
		gridRoot1.setItemFieldAt(    parseFloat(PUR_WPRC)   *  parseFloat( DEC_QTY )  
								,  rowIndex 
								,  "PUR_WPRC_TOT"  ); 
		gridRoot1.setItemFieldAt(  parseFloat(PUR_WVAT)   *  parseFloat( DEC_QTY )  
								,  rowIndex 
								,  "PUR_WVAT_TOT"  ); 
  		 
		setTotalSum();
	}
	
	
	
	
	// 매입원가금액  수정
	if(   dataField == "PUR_WAMT"  ) {  
		    
		if( typeof gridRoot1.getItemFieldAt(rowIndex , "TAX_GB")   ==   'undefined' )
		{   alert('상품을 선택 하세요.');
			return;			
		}		
//		if(  parseInt(  newValue ) >  parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_SPRC"  ))   )
//		{
//			
//			alert('매입원가금액은 매입매가보다 클수 없습니다.');
//			gridRoot1.setItemFieldAt( oldValue , rowIndex  , "PUR_WAMT"  ); 
//			return;	
//		}
		
		// 그리드상 문제로  화면에서는 이것으로 보여주고,  저장시에는 DBG 에서 단가/부가세를 또 계산해 주어야 한다.
		var DEC_QTY  =  gridRoot1.getItemFieldAt( rowIndex , "DEC_QTY"   )   ;  
		var priceVat = calPriceVat( newValue , gridRoot1.getItemFieldAt( rowIndex , "TAX_GB"  )   );		 
     
		gridRoot1.setItemFieldAt( priceVat[1]  				, rowIndex, "PUR_WPRC");   		   
		gridRoot1.setItemFieldAt( priceVat[2]  				, rowIndex, "PUR_WVAT");  
		
		gridRoot1.setItemFieldAt( parseFloat( priceVat[1] )   * parseFloat( DEC_QTY )   , rowIndex, "PUR_WPRC_TOT");  
		gridRoot1.setItemFieldAt( parseFloat( priceVat[2] )   * parseFloat( DEC_QTY	) 	, rowIndex, "PUR_WVAT_TOT");  
		
		// 매입원가총금액 = 확정수량 * 매입원가금액
		// PUR_WAMT_TOT = DEC_QTY * PUR_WAMT 
		 
		gridRoot1.setItemFieldAt( parseInt( parseFloat(newValue) * parseFloat(DEC_QTY)     ) *1
								, rowIndex 
								, "PUR_WAMT_TOT"  ); 
		
		// 수정시 CRUD 에 "U" 를 넣어준다. 매입금액 수정에서 수정된것만 저장하기위함.
		gridRoot1.setItemFieldAt( "U" , rowIndex  , "CRUD"  ); 
		   
//		gridRoot1.setItemFieldAt( gridRoot1.getItemFieldAt( rowIndex , "PUR_WPRC"  ) , rowIndex  , "OLD_PUR_WPRC"  ); 
//		gridRoot1.setItemFieldAt( gridRoot1.getItemFieldAt( rowIndex , "PUR_WVAT"  ) , rowIndex  , "OLD_PUR_WVAT"  ); 
	 
		setTotalSum();
	 
	}
	
	
	
	// 합계금액  수정
	// 수정시 공급가, 부가세 , 공급가(합), 부가세(합) 으로 계산해서 보여주기 
	if(   dataField == "PUR_WAMT_TOT"  ) {  
		
		
		if( newValue == "0" ||  $.trim( newValue ) == "")
		{
			gridRoot1.setItemFieldAt(  oldValue , rowIndex  , "PUR_WAMT_TOT"  ); 
			alert("합계금액을 입력해 주세요."); 
			return;
		}
		
		//      공급가,부가세 <= 합계금액 / 수량
		//      매입단가        <= 공급가 ,  부가세
		var TAX_GB1   =  gridRoot1.getItemFieldAt( rowIndex , "TAX_GB" ) ;
		var DEC_QTY1  =  gridRoot1.getItemFieldAt( rowIndex , "DEC_QTY" ) ;  
		var priceVat =  calPriceVat(  parseFloat(newValue / DEC_QTY1 )  , TAX_GB1  ); 
		 
		gridRoot1.setItemFieldAt(  priceVat[1].toFixed(2)     , rowIndex  , "PUR_WPRC"  ); 
		gridRoot1.setItemFieldAt(  priceVat[2]                , rowIndex  , "PUR_WVAT"  );  
		gridRoot1.setItemFieldAt(  parseFloat(priceVat[1].toFixed(2) ) + parseFloat( priceVat[2])  , rowIndex  , "PUR_WAMT"  );  
			
		var priceVatTot =  calPriceVat(  parseFloat( newValue )  , TAX_GB1  ); 
		gridRoot1.setItemFieldAt(  priceVatTot[1]   , rowIndex  , "PUR_WPRC_TOT"  ); 
		gridRoot1.setItemFieldAt(  priceVatTot[2]   , rowIndex  , "PUR_WVAT_TOT"  );  
		 
		gridRoot1.setItemFieldAt( "U" , rowIndex  , "CRUD"  ); 
		setTotalSum();
		
	}
	 
	// 공급가(*수량) 수정
	if(   dataField == "PUR_WPRC_TOT"  ) 
	{  
		if( newValue == "0" ||  $.trim( newValue ) == "")
		{
			gridRoot1.setItemFieldAt(  oldValue , rowIndex  , "PUR_WPRC_TOT"  ); 
			alert("공급가(*수량)을 입력해 주세요."); 
			return;
		}
		
		// 부가세  셀 편집 모드 변경  
		var value1 = {}; 
		value1.rowIndex = rowIndex;         // 이동할 행의 index 입니다.
	    value1.columnIndex = 21;    // 이동할 열의 index 입니다.
	    dataGrid1.setEditedItemPosition(value1);   // dateGrid 객체에서 불러오는 함수입니다.
		  
	    var TAX_GB_VAL1   =  gridRoot1.getItemFieldAt( rowIndex , "TAX_GB" ) ;
		if(TAX_GB_VAL1 == "1") // 과세
		{  
		    var PUR_WAMT_TOT_VAL =  parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_WAMT_TOT"  ) ) - newValue ; 
		    gridRoot1.setItemFieldAt(  PUR_WAMT_TOT_VAL , rowIndex  , "PUR_WVAT_TOT"  ) ; 
	    
		}   else {
			var  PUR_WAMT_TOT_VAL   =  parseFloat(  newValue )  +  parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_WVAT_TOT"  ))  ; 
			if(  PUR_WAMT_TOT_VAL  !=     gridRoot1.getItemFieldAt( rowIndex , "PUR_WAMT_TOT"  )   )
			{
				gridRoot1.setItemFieldAt( oldValue , rowIndex  , "PUR_WPRC_TOT"  ); 
				alert("공급가 + 부가세가 합계금액과 일치하지 않습니다. ");
				return;
			}   
		}
	    

		gridRoot1.setItemFieldAt( "U" , rowIndex  , "CRUD"  ); 
		setTotalSum();
		
	}
	
	 
	if(   dataField == "PUR_WVAT_TOT"  ) 
	{   
		var TAX_GB_VAL   =  gridRoot1.getItemFieldAt( rowIndex , "TAX_GB" ) ;
		if(TAX_GB_VAL == "1") // 과세
		{ 
				if( newValue == "0" ||  $.trim( newValue ) == "")
				{
					gridRoot1.setItemFieldAt(  oldValue , rowIndex  , "PUR_WVAT_TOT"  ); 
					alert("부가세(*수량)을 입력해 주세요."); 
					return;
				}
		} else {
				if  ( ! (  newValue == "0" ||  $.trim( newValue ) == "" ) )
				{
					gridRoot1.setItemFieldAt(  "0" , rowIndex  , "PUR_WVAT_TOT"  ); 
					alert("면세 상품의 부가세는 0 입니다."); 
					return;
			}
			
		}
		  
	    var PUR_WAMT_TOT_VAL =  parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_WAMT_TOT"  ) ) - newValue ; 
	    gridRoot1.setItemFieldAt(  PUR_WAMT_TOT_VAL , rowIndex  , "PUR_WPRC_TOT"  ) ; 
	    
		
		
		// 공급가  셀 편집 모드 변경  
		var value2 = {}; 
		value2.rowIndex = rowIndex;         // 이동할 행의 index 입니다.
	    value2.columnIndex = 20;    // 이동할 열의 index 입니다.
	    dataGrid1.setEditedItemPosition(value2);   // dateGrid 객체에서 불러오는 함수입니다.
		
	  
		var  PUR_WAMT_TOT_VAL1 =  parseFloat(  newValue ) +   parseFloat( gridRoot1.getItemFieldAt( rowIndex , "PUR_WPRC_TOT"  ))  ; 
		if(  PUR_WAMT_TOT_VAL1  !=     gridRoot1.getItemFieldAt( rowIndex , "PUR_WAMT_TOT"  )   )
		{
			gridRoot1.setItemFieldAt( oldValue , rowIndex  , "PUR_WVAT_TOT"  ); 
			alert("공급가 + 부가세가 합계금액과 일치하지 않습니다. ");
			return;
		}
	 		
		
		
		gridRoot1.setItemFieldAt( "U" , rowIndex  , "CRUD"  ); 
		setTotalSum();
	}
	
	
	
	
	
	
//	// 발주수량 수정  및 행추가 기능
//	if(   dataField == "ORD_QTY"  ) {   
//		// 공병 금액 계산해서 보여주기 :  IPSU_QTY(입수)  * ORD_QTY(발주수량) * BOT_SPRC(공병단가)  = BOT_SPRC_TOT(공병금액) 
//		var IPSU_QTY = gridRoot1.getItemFieldAt( rowIndex , "IPSU_QTY") ;
//		var ORD_QTY  = newValue ;
//		var BOT_SPRC = gridRoot1.getItemFieldAt( rowIndex , "BOT_SPRC") ; 
//		gridRoot1.setItemFieldAt( IPSU_QTY * ORD_QTY * BOT_SPRC  , rowIndex, "BOT_SPRC_TOT"); 
//		gridRoot1.setItemFieldAt(  ORD_QTY  , rowIndex, "DEC_QTY"); 
//		setTotalSum(); 
//		// 상품 선택이 있고, 수량 없을때  -> 행추가  // 유재훈
//		if(     typeof gridRoot1.getItemFieldAt(rowIndex , "ITM_CODE")   !=   'undefined' 
//			 && typeof oldValue   										 ==   'undefined'
//		)
//		{   // 발주수량을 처음 입력 할때만 행 추가 
//			gridHolder1AddRow();  
//		}    
//	}
	
	
	
	 
	
	//	바코드 중복 검사 
//	if(   dataField == "SCAN_CODE"  ) {  
//		// 유재훈
//		var value = {};
//	     
//		var SCAN_CODE = gridRoot1.getItemFieldAt( rowIndex , "SCAN_CODE");
//		SCAN_CODE = newValue;   // 유재훈
//		 
//		if( typeof SCAN_CODE   != 'undefined' )
//		{
//			SCAN_CODE = SCAN_CODE.replace('@',"");  
//			SCAN_CODE = SCAN_CODE.replace(/\s+/, "");//왼쪽 공백제거
//			SCAN_CODE = SCAN_CODE.replace(/\s+$/g, "");//오른쪽 공백제거
//			SCAN_CODE = SCAN_CODE.replace(/\n/g, "");//행바꿈제거
//			SCAN_CODE = SCAN_CODE.replace(/\r/g, "");//엔터제거 
//			  
//			gridRoot1.setItemFieldAt( SCAN_CODE , rowIndex, "SCAN_CODE");  
//			if( orderProductDup( SCAN_CODE ) >= 1 )
//			{ 	
//				gridRoot1.setItemFieldAt( oldValue  , rowIndex, "SCAN_CODE"); 
//				alert("입력 한 "+SCAN_CODE+" 상품코드는  이미 등록 되었습니다."); 
//				return;  
//			}  else {
//				 
//				// 점별 바코드 상세 ajax 로 뿌리기 -- 시작 
//				jQuery.ajax({ 
//				    url:"/orderStoreProductSelect.do",              
//				    type:"POST",
//					datatype:"json",
//					async:false,
//				 	data: {   "SCAN_CODE"  : SCAN_CODE
//				 	,         "STR_CODE"   : $('#STR_CODE').val()
//				 	,         "ROUTE_GB"   : $('#ROUTE_GB').val()   
//				 	},
//					success:function(data){
//				 
//						// 점포 상품 상세   - 일치하는것이 하나일 대는 그냥 뿌려준다.
//						if(  data.length == 1 )
//						{  
//							
//							setOrderProduct(
//									  rowIndex
//									, data[0].ORD_TERM   
//									, data[0].STR_CODE 
//									, data[0].ITM_CODE		 
//									, data[0].SCAN_CODE	 
//									, data[0].ITM_NAME	 
//									, data[0].UNIT_NM		 
//									, data[0].IPSU_QTY	 
//									, data[0].DP_PRC_UNIT 
//									, data[0].ORD_QTY		 
//									, data[0].ORD_FLAG	 
//									, data[0].ORD_FLAG_NM    
//									, data[0].STKLM_QTY	 
//									, data[0].INV_END_QTY    
//									, data[0].DEC_QTY 	 
//									, data[0].TAX_GB			 
//									, data[0].TAX_GB_NM		 
//									, data[0].SPRC	 
//									, data[0].PUR_AVR_AMT  		 
//									, data[0].BOT_SPRC			 
//									, data[0].BOT_SPRC_TOT 		 
//									, data[0].UPTAE_FLAG_NM 
//									, data[0].VEN_CODE	 
//									, data[0].VEN_NAME 
//									, data[0].AVAIL_AMT    
//							);
//							// 발주 수량 셀 편집 모드 변경  // 유재훈
//							value.rowIndex = rowIndex;         // 이동할 행의 index 입니다.
//						    value.columnIndex = 11;    // 이동할 열의 index 입니다.
//						    dataGrid1.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
//							    	
//						} else if(  data.length >= 2 ){
//							
//							// 상품 팝업을 띄운다.   
//						    btn_comm_store_route_gb_product_search(   rowIndex 
//													    		   ,  $('#STR_CODE').val() 
//													    		   ,  $('#ROUTE_GB').val() 
//	                                                               ,  $('#VEN_CODE').val() 
//													    		   ,  gridRoot1.getItemFieldAt( rowIndex , "SCAN_CODE"  ) 
//													    		  );
//  
//						} else { 
//							alert("해당 점에는 등록하신 상품이 없습니다.");
//							return;
//						}
//						 
//				    },
//				    complete : function(data) {
//				    	 
//				    },
//				    error : function(xhr, status, error) {
//				    	CommonJs.alertErrorStatus(xhr.status, error);
//				    }
//				 });
//				 
//				// 점별 바코드 상세 ajax 로 뿌리기 -- 끝 
//				 
//			}
//		}
//  		 
//	}
	
	
//	if(  gridRoot1.getItemFieldAt( rowIndex , "CRUD")   ==  "C" )   // 기존 데이터가 C이면 신규 추가이므로, U 로 바꾸지 않는다. 
//	{ 
//	} else {
//		gridRoot1.setItemFieldAt( "U" , rowIndex, "CRUD");  // 수정시 상태값을 U 로 바꾸어준다.		
//	}
	 
	 
//	//매입형태   변경시 CODE 값 수정
//	if( dataField == "ORD_FLAG_NM" )  
//	{
//		gridRoot1.setItemFieldAt( newValue , rowIndex, "ORD_FLAG"); 
//	}
//	//과세구분  변경시 CODE 값 수정
//	if( dataField == "TAX_GB_NM" )  
//	{
//		gridRoot1.setItemFieldAt( newValue , rowIndex, "TAX_GB"); 
//	}
	 
	
}



function setOrderProduct( 
						  rowIndex
						, ORD_TERM   
					  	, STR_CODE 
					  	, ITM_CODE		 
					  	, SCAN_CODE	 
					  	, ITM_NAME	 
					  	, UNIT_NM		 
					  	, IPSU_QTY	 
					  	, DP_PRC_UNIT 
					  	, ORD_QTY		 
					  	, ORD_FLAG	 
					  	, ORD_FLAG_NM    
					  	, STKLM_QTY	 
					  	, INV_END_QTY    
					  	, DEC_QTY 	 
					  	, TAX_GB			 
					  	, TAX_GB_NM		 
					  	, SPRC	 
					  	, PUR_AVR_AMT 			 
					  	, BOT_SPRC			 
					  	, BOT_SPRC_TOT 		 
					  	, UPTAE_FLAG_NM 
					  	, VEN_CODE	 
					  	, VEN_NAME 
					  	, AVAIL_AMT   )
{
//		//  발주가능요일 ( 일  월  화  수  목  금  토 )   
//		var ORD_TERM_VAL =  ORD_TERM;   
//		var ORD_DT 	 = new Date( $('#ORD_DT' ).val() ).getDay(); 
//		if(   ORD_TERM_VAL.charAt( ORD_DT )  == "0"     )
//		{
//			alert("입력한 발주일은 본 상품의 발주 가능 요일이 아닙니다.");
//		}  
	 
		gridRoot1.setItemFieldAt(	 STR_CODE,		rowIndex,"STR_CODE"			);
		gridRoot1.setItemFieldAt(	 ITM_CODE,		rowIndex,"ITM_CODE"			);
		gridRoot1.setItemFieldAt(	 SCAN_CODE,		rowIndex,"SCAN_CODE"		);
		gridRoot1.setItemFieldAt(	 ITM_NAME,		rowIndex,"ITM_NAME"			);
		gridRoot1.setItemFieldAt(	 UNIT_NM,		rowIndex,"UNIT_NM"			);
		gridRoot1.setItemFieldAt(	 IPSU_QTY,		rowIndex,"IPSU_QTY"			);
		gridRoot1.setItemFieldAt(	 DP_PRC_UNIT,	rowIndex,"DP_PRC_UNIT"		);
		gridRoot1.setItemFieldAt(	 ORD_QTY,		rowIndex,"ORD_QTY"			);
		gridRoot1.setItemFieldAt(	 ORD_FLAG,	 	rowIndex,"ORD_FLAG"			);
		gridRoot1.setItemFieldAt(	 ORD_FLAG_NM,   rowIndex,"ORD_FLAG_NM"		);
		gridRoot1.setItemFieldAt(	 STKLM_QTY,		rowIndex,"STKLM_QTY"		); 
		gridRoot1.setItemFieldAt(	 INV_END_QTY,   rowIndex,"INV_END_QTY"		);
		gridRoot1.setItemFieldAt(	'0',			rowIndex,"DEC_QTY"			);
		gridRoot1.setItemFieldAt(	 TAX_GB,		rowIndex,"TAX_GB"			);
		gridRoot1.setItemFieldAt(	 TAX_GB_NM,		rowIndex,"TAX_GB_NM"		);
		gridRoot1.setItemFieldAt(	 SPRC,			rowIndex,"SPRC"				);
	 
		//  대출원가, 부가세 계산 
//		var WVAT_VAL = 0; 
//		var PUR_AVR_AMT_VAL = PUR_AVR_AMT;
//		if(   TAX_GB  == "1"   ) // 과세
//		{ 
//			WVAT_VAL = ( 10 * PUR_AVR_AMT_VAL ) / 100 ; 
//		} else {        // 면세 
//			WVAT_VAL = 0 ; 
//		}    
		

		var priceVat = calPriceVat( PUR_AVR_AMT , TAX_GB  ); 
		
		gridRoot1.setItemFieldAt(	priceVat[0] ,				    rowIndex,"PUR_AVR_AMT"		); // 단가
		gridRoot1.setItemFieldAt(	priceVat[1] , 				    rowIndex,"WSPRC"			); // 대출원가
		gridRoot1.setItemFieldAt(	priceVat[2] ,				    rowIndex,"WVAT"				); // VAT
		gridRoot1.setItemFieldAt(	SPRC,							rowIndex,"SPRC"				);
		gridRoot1.setItemFieldAt(	BOT_SPRC,						rowIndex,"BOT_SPRC"			);
		gridRoot1.setItemFieldAt(	"0",							rowIndex,"BOT_SPRC_TOT"		);
		gridRoot1.setItemFieldAt(	"물류센터",						rowIndex,"UPTAE_FLAG_NM"	);
		gridRoot1.setItemFieldAt(	VEN_CODE,						rowIndex,"VEN_CODE"			);
		gridRoot1.setItemFieldAt(	VEN_NAME,						rowIndex,"VEN_NAME"			); 
		 
		var AVAIL_AMT_VAL = 0;
		if( typeof  AVAIL_AMT != 'undefined'   ||  AVAIL_AMT != "")
		{    AVAIL_AMT_VAL =  AVAIL_AMT;     }
		gridRoot1.setItemFieldAt(	AVAIL_AMT_VAL   ,			rowIndex,"AVAIL_AMT"		);

}

//점별 배송구분(ROUTE_GB)별 상품검색 팝업 호출 function
function btn_comm_store_route_gb_product_search( rowIndex , STR_CODE , ROUTE_GB , VEN_CODE, ITM_NAME){
	$('#comm_pop_wrap13' ).dialog( 'open' );
	gridApp22.resize(); 
	$("#P_CALLBACK_NM13").val('btn_comm_store_route_gb_product_callback('+rowIndex+', dataRow22)'); 
 // STR_CODE , ROUTE_GB를 넘기기위해서 사용했음  
	 
	$("#P_STR_CODE_CODE").val(  STR_CODE  );
	$("#P_ROUTE_GB").val(  ROUTE_GB  );
	$("#P_VEN_CODE").val(  VEN_CODE  );
	if(   ITM_NAME != null && ITM_NAME != ""){
		$("#P_TEXT13").val( ITM_NAME );
		btn_comm_search13();
	}
}
function btn_comm_store_route_gb_product_callback(rowIndex , dataRow)
{
	setOrderProduct( 
			  rowIndex
			, dataRow.ORD_TERM   
		  	, dataRow.STR_CODE 
		  	, dataRow.ITM_CODE		 
		  	, dataRow.SCAN_CODE	 
		  	, dataRow.ITM_NAME	 
		  	, dataRow.UNIT_NM		 
		  	, dataRow.IPSU_QTY	 
		  	, dataRow.DP_PRC_UNIT 
		  	, dataRow.ORD_QTY		 
		  	, dataRow.ORD_FLAG	 
		  	, dataRow.ORD_FLAG_NM    
		  	, dataRow.STKLM_QTY	 
		  	, dataRow.INV_END_QTY    
		  	, dataRow.DEC_QTY 	 
		  	, dataRow.TAX_GB			 
		  	, dataRow.TAX_GB_NM		 
		  	, dataRow.SPRC	 
		  	, dataRow.PUR_AVR_AMT  		 
		  	, dataRow.BOT_SPRC			 
		  	, dataRow.BOT_SPRC_TOT 		 
		  	, dataRow.UPTAE_FLAG_NM 
		  	, dataRow.VEN_CODE	 
		  	, dataRow.VEN_NAME 
		  	, dataRow.AVAIL_AMT   );
	   
}


function getNodeText(xmlElement, nodeName) {
	var node = xmlElement.getElementsByTagName(nodeName)[0];
	if (node != null)
		return node.text ? node.text : node.textContent;
	return null;
}

function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

  
function barCodeReplace(item, value, column)
{ 
	 var SCAN_CODE = item["SCAN_CODE"]; 
	 
	 if( typeof SCAN_CODE   != 'undefined' )
	 {
		 SCAN_CODE = SCAN_CODE.replace('@','');
		 SCAN_CODE = SCAN_CODE.replace(/\r\n/g, ''); 
	 	 
	 } 
	 return SCAN_CODE; 
}

function chgCate( SELECTBOX_ID  , CATE_GUBUN  )
{ 
	var CATE_CODE = "";
	if(CATE_GUBUN == "2")  
	{   CATE_CODE = $('#LRG_CODE' ).val(); 
		$("select[name='CLS_CODE'] option").remove();
		$("#CLS_CODE").prepend("<option value=''>선택</option>");
	} else if(CATE_GUBUN == "3") { 
		CATE_CODE = $('#MID_CODE' ).val(); 
	}
	   
	getCateCodeSelectBoxList( SELECTBOX_ID  , CATE_GUBUN , CATE_CODE );
	 
}

 
function gridHolder1AddRow()
{

	 
	// 행 추가 클릭시 발주일자 입력란을 디스에이블 한다.
	$( "#ORD_DT" ).datepicker( "option", "disabled", true );
	$("input[name=ORD_DT]").attr("readonly",false);
	 
	if( $('#STR_CODE' ).val() == "" )
	{   alert("점포를 선택 하세요.");
		$('#STR_CODE' ).focus();
		return;
	}
	
	if( $('#ROUTE_GB' ).val() == "" )
	{   alert("배송구분을 선택 하세요.");
		$('#ROUTE_GB' ).focus();
		return;
	}
	
 
	
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
    var	CRUD			= xmlDoc.createElement('CRUD'); 
	var	STR_CODE		= xmlDoc.createElement('STR_CODE');
	var	ITM_CODE		= xmlDoc.createElement('ITM_CODE');
	var	SCAN_CODE		= xmlDoc.createElement('SCAN_CODE');
	var	ITM_NAME		= xmlDoc.createElement('ITM_NAME');
	var	UNIT_NM			= xmlDoc.createElement('UNIT_NM');
	var	IPSU_QTY		= xmlDoc.createElement('IPSU_QTY');
	var	DP_PRC_UNIT		= xmlDoc.createElement('DP_PRC_UNIT');
	var	ORD_FLAG		= xmlDoc.createElement('ORD_FLAG');
	var	ORD_FLAG_NM		= xmlDoc.createElement('ORD_FLAG_NM');
	var	STKLM_QTY		= xmlDoc.createElement('STKLM_QTY');
	var	INV_END_QTY		= xmlDoc.createElement('INV_END_QTY');
	var	ORD_QTY			= xmlDoc.createElement('ORD_QTY');
	var	DEC_QTY			= xmlDoc.createElement('DEC_QTY');
	var	TAX_GB			= xmlDoc.createElement('TAX_GB');
	var	TAX_GB_NM		= xmlDoc.createElement('TAX_GB_NM'); 
	var	PUR_AVR_AMT 	= xmlDoc.createElement('PUR_AVR_AMT');
	var	WVAT			= xmlDoc.createElement('WVAT');
	var	WSPRC			= xmlDoc.createElement('WSPRC'); 
	var	SPRC			= xmlDoc.createElement('SPRC');
	var	BOT_SPRC		= xmlDoc.createElement('BOT_SPRC');
	var	BOT_SPRC_TOT	= xmlDoc.createElement('BOT_SPRC_TOT');
	var	UPTAE_FLAG_NM	= xmlDoc.createElement('UPTAE_FLAG_NM');
	var	VEN_CODE		= xmlDoc.createElement('VEN_CODE');
	var	VEN_NAME		= xmlDoc.createElement('VEN_NAME');
	var	SLIP_NO			= xmlDoc.createElement('SLIP_NO');
	var	AVAIL_AMT	= xmlDoc.createElement('AVAIL_AMT');
	var	ORD_DT			= xmlDoc.createElement('ORD_DT');
	
	CRUD.appendChild(  			xmlDoc.createTextNode(  "C" )	); 
	STR_CODE.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	ITM_CODE.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	SCAN_CODE.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	ITM_NAME.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	UNIT_NM.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	IPSU_QTY.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	DP_PRC_UNIT.appendChild(	xmlDoc.createTextNode(  ""	)	);
	ORD_FLAG.appendChild(  		xmlDoc.createTextNode(  "1"	)	);
	ORD_FLAG_NM.appendChild(	xmlDoc.createTextNode(  ""	)	);
	STKLM_QTY.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	INV_END_QTY.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	ORD_QTY.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	DEC_QTY.appendChild(  		xmlDoc.createTextNode(  "0"	)	);
	TAX_GB.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	TAX_GB_NM.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	PUR_AVR_AMT.appendChild(	xmlDoc.createTextNode(  ""	)	); 
	WVAT.appendChild(  			xmlDoc.createTextNode(  ""	)	);
	WSPRC.appendChild(  		xmlDoc.createTextNode(  ""	)	); 
	SPRC.appendChild(  			xmlDoc.createTextNode(  ""	)	);
	BOT_SPRC.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	BOT_SPRC_TOT.appendChild(  	xmlDoc.createTextNode(  "0"	)	);
	UPTAE_FLAG_NM.appendChild(  xmlDoc.createTextNode(  ""	)	);
	VEN_CODE.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	VEN_NAME.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	SLIP_NO.appendChild(  		xmlDoc.createTextNode(  $("#SLIP_NO").val()	)	);
	AVAIL_AMT.appendChild(  	xmlDoc.createTextNode(  "0"	)	);
	ORD_DT.appendChild(  		xmlDoc.createTextNode(  $("#ORD_DT").val()	)	);
	
	  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CRUD 		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_CODE		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( UNIT_NM		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IPSU_QTY		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( DP_PRC_UNIT	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_FLAG		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_FLAG_NM	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STKLM_QTY	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( INV_END_QTY	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( DEC_QTY		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TAX_GB		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TAX_GB_NM	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_AVR_AMT	); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( WVAT			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( WSPRC		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SPRC			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOT_SPRC		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOT_SPRC_TOT	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( UPTAE_FLAG_NM );
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_NAME		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SLIP_NO		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( AVAIL_AMT );
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT 		);
	
	gridRoot1.addItemAt(  xmlDoc  , 0);
	girdMoveSelctedIndex(0 , gridRoot1.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기
	           
//	  dataGrid = gridRoot1.getDataGrid();
//	    // 미리 선택된 셀을 설정
//	  dataGrid.setSelectedCells([{rowIndex:0,columnIndex:12}]);

}


function gridHolder1DelRow()
{
	if (confirm("선택한 발주상품을  삭제하시겠습니까?") == true){     
		var selectedIndex = dataGrid1.getSelectedIndex();
		gridRoot1.removeItemAt(selectedIndex);
//		gridRoot1.setItemFieldAt( "D" , selectedIndex, "CRUD");
	} else {    
	    return;
    } 

}
 


//조회 조건절의   (협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	 
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize(); 
 
	$("#P_CALLBACK_NM1").val('fn_comm_supply_callback(dataRow11)');
	if($("#VEN_NAME").val() != null && $("#VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#VEN_NAME").val());
		btn_comm_search('3');
	} 
}  


//상품상세 부분 내에서의 (협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	 
	$('#VEN_NAME').val(dataRow.VEN_NAME);		// 협력업체명
	$('#VEN_CODE').val(dataRow.VEN_CODE);		// 협력업체코드
	  
}

function clearVenCode()
{ 	
	if(  $('#VEN_NAME').val()  == "" )
	{
		 $('#VEN_CODE').val("");
		
	}

}


////매입생성
//function btn_purch_creat()
//{ 
//	// 업로드 주체가 바이어 인지 점포인지 구분. REG_PATH :   1- 점등록   , 2 -  바이어등록   
//	var REG_PATH = "";
//	if( $("#SESSION_ROLE_ID").val()    == "ROLE009")  // 바이어(ROLE009) 
//	{   REG_PATH = "2";
//	} else {    // 점포
//		REG_PATH = "1";
//	}
//	
//	//  매입 데이터 생성      
//	jQuery.ajax({ 
//	    url:"/jobOrderToPurch.do",         // jobUploadToOrder    
//	    type:"POST",
//		datatype:"xml",
//		async:true,
//		data: {     
//		           "REG_PATH"   : REG_PATH
//        ,          "STR_CODE"   : $("#STR_CODE").val()
//        ,   	   "ITM_GB"     : $("#ITM_GB").val()  
//        ,		   "LRG_CODE"   : $("#LRG_CODE").val()
//        ,          "PUR_DT"     : "20170329"
//	    }, 
//		success:function(data){   
//			if(  data[0].RETURN_CODE  == "0000")
//			{   alert("매입 생성에 성공 하였습니다");
//			} else {
//				alert("매입 생성에 실패 하였습니다");
//			}   
//			
//	    },
//	    complete : function(data) {
////	    	gridRoot1.removeAll(); 
////	    	$('#excelFile').val(""); 
//	    },
//	    error : function(xhr, status, error) {
//	    	CommonJs.alertErrorStatus(xhr.status, error);
//	    }
//	});
//	 
//}
	      




function btn_del()
{
   
	
	selectorColumn2 = gridRoot2.getObjectById("selector2"); 
	var chkArr = selectorColumn2.getSelectedIndices() ; 
	var ERR_CODE = 0;  
	if( chkArr.length == 0)
	{   alert("매입 삭제 처리 건이 체크되지 않았습니다.");
		return;
	}
	
	if (confirm("총 "+chkArr.length+" 건의 매입데이터를 삭제 처리 하시겠습니까?") == false){  
		return;
	}
   
	for(var i = 0; i < chkArr.length ; i++)
	{  
		
		//  매입 삭제처리
		jQuery.ajax({ 
		    url:"/purchDeleteAll.do",         
		    type:"POST",
			datatype:"xml",
			async:true,
			data: {    
		             "SLIP_NO"     : gridRoot2.getItemFieldAt( chkArr[i] , "SLIP_NO")
		    }, 
			success:function(data){   
				if(  data[0].RETURN_CODE  != "0000")
				{   ERR_CODE = parseInt(ERR_CODE) + 1; 
				}  
		    },
		    complete : function(data) {  
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
		
		
	}

	if(ERR_CODE == 0)
	{
		alert('매입삭제 처리에 성공 하였습니다.');
	} else {
		alert('매입삭제 처리에 실패 하였습니다.'); 
	}
	
	btn_search();

}
   



 


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder2").width($(window).width()-371);
	$("#gridHolder2").height("164px");

	$("#comm_pop_wrap3").css({position:'relative'});
	$("#comm_pop_wrap3 #pop_wrap").css({position:'absolute', top:0, left:0, width:'100%'}); 
	$(window).on('resize',function (){		
		$("#gridHolder2").width($(window).width()-371);
		$("#gridHolder2").height("164px");		
	});
	
});

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################