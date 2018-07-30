/********************************************************
 * 설명: 협력업체관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 유재훈
 * since	: 2016.12.19
 * version : 1.0
 ********************************************************/
	
var crudBit          =   "C";   // 최초 신규로 시작함 
var VEN_CODE_DUP_BIT =   "";    // 협력업체코드 중복 체크버튼
var BUSI_NO_DUP_BIT  =   "";    // 사업자번호  중복 체크버튼

$(document).ready(function(){
	
	init();
	 
	 
	$(document).on("keyup", "input:text[numberOnly]", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});
  
	
	// 수수료율 숫자만, 소수점 2자리, 콤마 찍기 
	$('#SALE_RATE').number( true, 2 );
	
	// 여신한도 숫자만, 콤마 찍기
	$('#CREDIT_LIMIT').number( true, 0 );

	// 달력 
	$(".datepicker").datepicker({
		 showMonthAfterYear:true 
	});
	
	// 신규 혹은 최초페이지 일때 거래종료일 입력 못 받게 한다.     
	$( "#OUT_DT" ).datepicker( "option", "disabled", true );
	$("input[name=OUT_DT]").attr("readonly",false);
	
	// 수수료율 초기에 입력 못받게 한다.
	$("input[name=SALE_RATE]").attr("readonly", true);
	
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	 
});



 


// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");


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
rMateGridH5.create("grid1", "gridHolder1", jsVars, "110%", "582px");  // 왼쪽 - 협력업체 목록 572px
rMateGridH5.create("grid2", "gridHolder2", jsVars+"&dataType=xml", "100%", "130px");   // 지불조건등록
rMateGridH5.create("grid3", "gridHolder3", jsVars+"&dataType=xml", "100%", "130px");   // 장려율 등록
rMateGridH5.create("grid4", "gridHolder4", jsVars+"&dataType=xml", "100%", "130px");   // 장려제외 상품 등록
rMateGridH5.create("grid5", "gridHolder5", jsVars+"&dataType=xml", "100%", "130px");   // 담당자 정보 등록
rMateGridH5.create("grid6", "gridHolder6", jsVars, "100%", "340px");   // 취급상품 조회 

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	
	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체
//		gridApp1.setDataType("xml");
		gridApp1.setLayout(layoutStr1);
		gridApp1.setData(gridData1);
		
		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) { 
			var rowIndex = event.rowIndex;  
			dataRow1 = gridRoot1.getItemAt(rowIndex); 
			// 협력업체 정보 보기
			productCustomerInfoSelect( dataRow1["CORP_CODE"] , dataRow1["VEN_CODE"] ); 
		}; 
		
		//엔터   이벤트 제어
		var enterClickHandler = function(event) {  
			 
			if(event.keyCode == "13")
			{   
//				var rowIndex = dataGrid1._selectedIndex;
				var rowIndex = dataGrid1.getSelectedIndex();
				dataRow1 = gridRoot1.getItemAt(rowIndex); 
				// 협력업체 정보 보기
				productCustomerInfoSelect( dataRow1["CORP_CODE"] , dataRow1["VEN_CODE"] ); 
				
			}	 
		}; 
		
		//그리드1 핸들러
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체  
			//그리드1 셀선택 이벤트
			dataGrid1.addEventListener("itemClick", itemClickHandler);  
			dataGrid1.addEvent("keydown", enterClickHandler);   //enterClickHandler   if(event.keyCode != "13") return;
			
		}; 
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1); 
		
		
		//조회 완료 후  첫줄에  포커스 - 시작 
		var dataCompleteHandler = function(event) { 
		       dataGrid = gridRoot1.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		    }
	    gridRoot1.addEventListener("dataComplete", dataCompleteHandler);
	    //조회 완료 후  첫줄에  포커스 - 끝
		 
	}  else if (id == "grid2") {
		 
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp2.setDataType("xml");
		gridApp2.setLayout(layoutStr2);		
		gridApp2.setData(gridData2);
		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			 

			
//			// xml 추출하기 시작
//			var rowIndex = event.rowIndex;
//			var columnIndex = event.columnIndex;
//			var dataRow = gridRoot1.getItemAt(rowIndex);
//			var column = dataGrid1.getDisplayableColumns()[columnIndex];
//			var dataField = column.getDataField();
//
//			// 전달된 레코드(XMLElement)에서 필드 뽑아내기
//			var value = getNodeText(dataRow, dataField);
//			alert("파싱된 "+dataField+"의 값:"+value+"\n\n전달된 XML\n\n"+getXmlString(dataRow));
//			// xml 추출하기 끝
			 
		}; 
		
		var selectionChangeHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			var dataRow = gridRoot2.getItemAt(rowIndex);
			var column = dataGrid2.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();

			// 전달된 레코드(XMLElement)에서 필드 뽑아내기
			var value = getNodeText(dataRow, dataField);
			alert("파싱된 "+dataField+"의 값:"+value+"\n\n전달된 XML\n\n"+getXmlString(dataRow));
		};
		
		 
		
		
		//그리드2 핸들러
		var layoutCompleteHandler2 = function(event) {
			dataGrid2 = gridRoot2.getDataGrid();	// 그리드 객체 
			
			 
			// 그리드의 특정 컬럼에 select box 달기
			// 지불주기 콤보박스
			var COMBO_PAY_CON_NM = gridRoot2.getObjectById("PAY_CON_NM");    
			COMBO_PAY_CON_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('PAY_CON') );
			// 지불차수 콤보박스
			var COMBO_PAY_SEQ_NM = gridRoot2.getObjectById("PAY_SEQ_NM");    
			COMBO_PAY_SEQ_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('PAY_SEQ') );
			// 지불조건 콤보박스
			var COMBO_PAY_TYPE_NM = gridRoot2.getObjectById("PAY_TYPE_NM");    
			COMBO_PAY_TYPE_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('PAY_TYPE') );
			
			// 사용여부 콤보박스
			var COMBO_USE_YN_NM = gridRoot2.getObjectById("USE_YN_NM");    
			COMBO_USE_YN_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('USE_YN') );
			
			
			
			//xml 테스트
//			  dataGrid2.addEventListener("change", selectionChangeHandler); 
//			  var comboPartUnit = gridRoot.getObjectById("partUnit");
//			  comboPartUnit.setItemRendererDataProviderField(comboList);
			  
			
			//그리드2 셀선택 이벤트
			dataGrid2.addEventListener("itemClick", itemClickHandler); 
		}; 
		
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot2.addEventListener("itemDataChanged", itemDataChangeHandler2);
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드2 핸들러 생성.
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2); 
		
		
		
		
	} else if (id == "grid3") {
		// rMateGrid 관련 객체
		gridApp3 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot3 = gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp3.setDataType("xml");
		gridApp3.setLayout(layoutStr3);
		gridApp3.setData(gridData3);
		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			 
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow3 = gridRoot3.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid3.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData3 = dataRow3[dataField];
			
			  
			
		}; 
		//그리드3 핸들러
		var layoutCompleteHandler3 = function(event) {
			dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체 

			// 그리드의 특정 컬럼에 select box 달기
			// 매입구간 콤보박스
			var COMBO_PUR_SECTION_NM = gridRoot3.getObjectById("PUR_SECTION_NM");    
			COMBO_PUR_SECTION_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('PUR_SECTION') );
			
			// 사용여부 콤보박스
			var COMBO_USE_YN_NM = gridRoot3.getObjectById("USE_YN_NM");    
			COMBO_USE_YN_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('USE_YN') );
			
			
			// 적용월
			var COMBO_APPL_MON_NM = gridRoot3.getObjectById("APPL_MON_NM");    
			COMBO_APPL_MON_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('APPL_MON') );
			
			
			// 적용대상 
			var COMBO_APPL_TGT_NM = gridRoot3.getObjectById("APPL_TGT_NM");    
			COMBO_APPL_TGT_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('APPL_TGT') );
			
			
			
			dataGrid3.addEventListener("itemClick", itemClickHandler); 
			
			
		}; 
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3); 
		 
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot3.addEventListener("itemDataChanged", itemDataChangeHandler3);
		
		 
	} else if (id == "grid4") {
		
		// rMateGrid 관련 객체
		gridApp4 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot4 = gridApp4.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp4.setDataType("xml");
		gridApp4.setLayout(layoutStr4);
		gridApp4.setData(gridData4);
		//로우 클릭 이벤트 제어
//		var itemClickHandler = function(event) {
//			var rowIndex = event.rowIndex;
//			var columnIndex = event.columnIndex;
//			dataRow4 = gridRoot4.getItemAt(rowIndex);
//			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
//			var column = dataGrid4.getDisplayableColumns()[columnIndex];
//			var dataField = column.getDataField();
//			clickData4 = dataRow4[dataField];
//			 
//		}; 
		var itemDoubleClickHandler4 = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			var dataRow = gridRoot4.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid4.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			 
			if (dataField == "LINK_CODE") {
				editRowIndex = rowIndex;
				editDataRow = dataRow;
				editDataField = dataField;
				
				// 상품검색 팝업 				   
				itemPopup(editRowIndex);
				 
			}
			
			
			
		};
		//그리드4 핸들러
		var layoutCompleteHandler4 = function(event) {
			dataGrid4 = gridRoot4.getDataGrid();	// 그리드 객체 

			// 사용여부 콤보박스
			var COMBO_USE_YN_NM = gridRoot4.getObjectById("USE_YN_NM");    
			COMBO_USE_YN_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('USE_YN') );
			
			// 더블클릭
			dataGrid4.setDoubleClickEnabled(true);
			dataGrid4.addEventListener("itemDoubleClick", itemDoubleClickHandler4);
			 
		}; 
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4); 
		  
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot4.addEventListener("itemDataChanged", itemDataChangeHandler4);
		
	} else if (id == "grid5") {
		 
		// rMateGrid 관련 객체
		gridApp5 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot5 = gridApp5.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp5.setDataType("xml");
		gridApp5.setLayout(layoutStr5);
		gridApp5.setData(gridData5);
		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow5 = gridRoot5.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid5.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData5 = dataRow5[dataField];
			 
		}; 
		var itemDoubleClickHandler5 = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			var dataRow = gridRoot5.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid5.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			 
			if (dataField == "EMP_NM") {
				editRowIndex = rowIndex;
				editDataRow = dataRow;
				editDataField = dataField;
				
				// 관리자 검색 팝업				   
				btn_comm_user_search(rowIndex , 'P');
				
			}
			
			
			
		}; 
		//그리드5 핸들러
		var layoutCompleteHandler5 = function(event) {
			dataGrid5 = gridRoot5.getDataGrid();	// 그리드 객체 
 
			 		
			// POSITION 직급콤보박스
			var COMBO_POSITION_NM = gridRoot5.getObjectById("POSITION_NM");    
			COMBO_POSITION_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('POSITION') );	
			// 사용여부 콤보박스
			var COMBO_USE_YN_NM = gridRoot5.getObjectById("USE_YN_NM");    
			COMBO_USE_YN_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('USE_YN') );
			
			// 관리담당자 콤보박스
//			var COMBO_EMP_NM = gridRoot5.getObjectById("EMP_NM");    
//			COMBO_EMP_NM.setItemRendererDataProvider( getEmpNoSelectBoxListInGrid( ) );
			 
			// 더블클릭
			dataGrid5.setDoubleClickEnabled(true);
			dataGrid5.addEventListener("itemDoubleClick", itemDoubleClickHandler5);
			
		}; 
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot5.addEventListener("layoutComplete", layoutCompleteHandler5); 
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot5.addEventListener("itemDataChanged", itemDataChangeHandler5);
		
	} else if (id == "grid6") {
		 
		// rMateGrid 관련 객체
		gridApp6 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot6 = gridApp6.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp6.setLayout(layoutStr6);
		gridApp6.setData(gridData6);
		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow6 = gridRoot6.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid6.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData6 = dataRow6[dataField];
			 
		}; 
		//그리드6 핸들러
		var layoutCompleteHandler6 = function(event) {
			dataGrid6 = gridRoot6.getDataGrid();	// 그리드 객체 
			//그리드6 셀선택 이벤트
			dataGrid6.addEventListener("itemClick", itemClickHandler); 
			
			$("#S_VEN").focus(); 
			
		}; 
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot6.addEventListener("layoutComplete", layoutCompleteHandler6); 
		    
	}
//	btn_search();
	
	
 
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2;
var gridApp3, gridRoot3, dataGrid3, dataRow3, clickData3, selectorColumn3;
var gridApp4, gridRoot4, dataGrid4, dataRow4, clickData4, selectorColumn4; 
var gridApp5, gridRoot5, dataGrid5, dataRow5, clickData5, selectorColumn5; 
var gridApp6, gridRoot6, dataGrid6, dataRow6, clickData6, selectorColumn6;

//----------------------- 그리드 설정 끝 -----------------------

//협력업체목록 - 그리드1 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<DataGrid id="dg1"  sortableColumns="true" >\
		<columns>\
			<DataGridColumn id="NO" 		dataField="NO"  		headerText="No"    	itemRenderer="IndexNoItem"		textAlign="center"  width="33" />\
			<DataGridColumn id="VEN_CODE" 	dataField="VEN_CODE" 	headerText="코드"     textAlign="center"   width="46"/>\
			<DataGridColumn id="VEN_NAME" 	dataField="VEN_NAME"   	headerText="업체명" 		textAlign="left"   />\
			<DataGridColumn id="GRE_GB_NM" 	dataField="GRE_GB_NM" 	headerText="거래구분"    	textAlign="center"   width="65" />\
			<DataGridColumn id="GRE_GB" 	dataField="GRE_GB" 		headerText="거래구분코드"     visible="false"	  />\
		</columns>\
	</DataGrid>\
</rMateGrid>';
 
//지불조건등록 - 그리드2 헤더 설정  
var layoutStr2 =
'<rMateGrid>\
	<DataGrid id="dg2" headerColors="[#f2f2f2]" editable="true" doubleClickEnabled="true" selectionMode="singleCell" borderColor="#ddd" rollOverColor="#ddffdc" selectionColor="#ffe6cd" color="#4c4f53" headerHeight="25" rowHeight="25" headerPaddingTop="5" headerPaddingBottom="5" paddingTop="3" paddingBottom="3" headerBorderTopColor="#2c2c2c" headerBorderTopWidth="2" textSelectedColor = "#4c4f53" fontFamily= "돋움">\
		<columns>\
			<DataGridColumn  id="PAY_CON_NM"	dataField="PAY_CON_NM"   headerText="지불주기" editable="false"   itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	    textAlign="center"  width="140"   />\
			<DataGridColumn  id="PAY_SEQ_NM"	dataField="PAY_SEQ_NM"   headerText="지불차수"  editable="false"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	    textAlign="center"   width="140" />\
			<DataGridColumn  id="PAY_SEQ_SUM"	dataField="PAY_SEQ_SUM"  visible="false" />\
			<DataGridColumn  id="PAY_TYPE_NM"	dataField="PAY_TYPE_NM"  headerText="지불조건"   itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"		    textAlign="center"  width="80"  />\
			<DataGridColumn  id="PAY_CON"		dataField="PAY_CON"    	 visible="false"	  />\
			<DataGridColumn  id="PAY_SEQ" 		dataField="PAY_SEQ"      visible="false"      />\
			<DataGridColumn  id="PAY_TYPE" 		dataField="PAY_TYPE"   	 visible="false"	  />\
			<DataGridColumn  id="USE_YN_NM" 	dataField="USE_YN_NM"   headerText="사용여부"    itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"		  	    textAlign="center"  width="65"  />\
	        <DataGridColumn  id="USE_YN" 	    dataField="USE_YN"      visible="false"/>\
	        <DataGridColumn  id="REMARK" 	    dataField="REMARK"         headerText="비고"    	showEditableIcon="always"  itemRenderer="EditableIconItem"	        textAlign="left"                />\
	</columns>\
	</DataGrid>\
</rMateGrid>';


// 장려율 등록 - 그리드3 헤더 설정
// <DataGridColumn id="PUR_SECTION_NM" 	dataField="PUR_SECTION_NM"  headerText="매입구간"   	 textAlign="center"       itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem" />\

var layoutStr3 =
'<rMateGrid>\
	<NumberFormatter       id="numfmt" 			useThousandsSeparator="true"   />\
	<PercentFormatter      id="currfmt" 	   divideHundred="false"     />\
	<DataGrid id="dg3" headerColors="[#f2f2f2]" editable="true" selectionMode="singleCell"   doubleClickEnabled="true"    borderColor="#ddd" rollOverColor="#ddffdc" selectionColor="#ffe6cd" color="#4c4f53" headerHeight="25" rowHeight="25" headerPaddingTop="5" headerPaddingBottom="5" paddingTop="3" paddingBottom="3" headerBorderTopColor="#2c2c2c" headerBorderTopWidth="2" textSelectedColor = "#4c4f53" fontFamily= "돋움">\
		<columns>\
	        <DataGridRowStateColumn id="rowState" textAlign="center"  visible="false"/>\
			<DataGridColumn id="PUR_SECTION_NM" 	dataField="PUR_SECTION_NM"  headerText="매입구간"   	 textAlign="center"     editable="false"     />\
			<DataGridColumn id="PUR_SECTION"		dataField="PUR_SECTION"     visible="false"	 		  editable="false"  />\
		    <DataGridColumn id="MIN_STD_AMT" 		dataField="MIN_STD_AMT"   	headerText="최소기준금액"    editable="true"  type="int"  textAlign="right"   showEditableIcon="always" itemRenderer="EditableIconItem"	  formatter="{numfmt}"   />\
	        <DataGridColumn id="MAX_STD_AMT" 		dataField="MAX_STD_AMT"   	headerText="최대기준금액"    editable="true"  type="int"  textAlign="right"   showEditableIcon="always" itemRenderer="EditableIconItem"	  formatter="{numfmt}"   />\
	<DataGridColumn id="APPL_MON_NM" 			dataField="APPL_MON_NM"  		headerText="적용월"   	 textAlign="center"       itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 />\
	<DataGridColumn id="APPL_MON"				dataField="APPL_MON"          visible="false"	  />\
	<DataGridColumn id="APPL_TGT_NM" 			dataField="APPL_TGT_NM"  		headerText="적용대상"   	 textAlign="center"       itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 />\
	<DataGridColumn id="APPL_TGT"				dataField="APPL_TGT"          visible="false"	  />\
			<DataGridColumn id="PUR_RATE" 			dataField="PUR_RATE"     	headerText="매입장려율" 	  maxChars="5" type="float" textAlign="right"  showEditableIcon="always" itemRenderer="EditableIconItem"	  formatter="{currfmt}"  sortCompareFunction="numericSort"  />\
			<DataGridColumn id="SALE_RATE" 			dataField="SALE_RATE"    	headerText="판매장려율"      maxChars="5" type="float" textAlign="right"  showEditableIcon="always"   itemRenderer="EditableIconItem"	 formatter="{currfmt}"   sortCompareFunction="numericSort"   />\
	        <DataGridColumn id="PMOT_RATE" 			dataField="PMOT_RATE"    	headerText="판촉장려율"      maxChars="5" type="float" textAlign="right"  showEditableIcon="always"  itemRenderer="EditableIconItem"	 formatter="{currfmt}"   sortCompareFunction="numericSort"  />\
	 		<DataGridColumn id="LOGIS_RATE" 		dataField="LOGIS_RATE"   	headerText="물류장려율"      maxChars="5" type="float" textAlign="right"  showEditableIcon="always"   itemRenderer="EditableIconItem"	 formatter="{currfmt}"   sortCompareFunction="numericSort"    />\
			<DataGridColumn id="USE_YN_NM" 			dataField="USE_YN_NM"  		headerText="사용여부"   	 textAlign="center"       itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 />\
			<DataGridColumn id="USE_YN"				dataField="USE_YN"          visible="false"	  />\
	</columns>\
	</DataGrid>\
</rMateGrid>';

 
//장려제외 상품 등록 - 그리드4 헤더 설정
var layoutStr4 =
'<rMateGrid>\
	<DataGrid id="dg4" headerColors="[#f2f2f2]" editable="true" selectionMode="singleCell" borderColor="#ddd" rollOverColor="#ddffdc" selectionColor="#ffe6cd" color="#4c4f53" headerHeight="25" rowHeight="25" headerPaddingTop="5" headerPaddingBottom="5" paddingTop="3" paddingBottom="3" headerBorderTopColor="#2c2c2c" headerBorderTopWidth="2" textSelectedColor = "#4c4f53" fontFamily= "돋움">\
		<columns>\
			<DataGridColumn id="NO" 		dataField="NO"    	  	headerText="순번"   	 	 textAlign="center"  width="65" itemRenderer="IndexNoItem"	 editable="false"      />\
			<DataGridColumn id="LINK_CODE" 	dataField="LINK_CODE" 	headerText="상품코드"  	 textAlign="left"  	 width="140" itemRenderer="IconItem" icon="Magnifier"   editable="false"       />\
			<DataGridColumn id="LINK_NAME" 	dataField="LINK_NAME" 	headerText="상품명" 	  	 textAlign="left"    editable="false" />\
			<DataGridColumn id="STR_DT" 	dataField="STR_DT"   	headerText="적용일자"    	 textAlign="center"   width="95" itemEditor="DateEditor"   showEditableIcon="always" editableIcon="calendar" itemRenderer="EditableIconItem"   />\
	        <DataGridColumn id="END_DT" 	dataField="END_DT"   	headerText="종료일자"    	 textAlign="center"   width="95"  itemEditor="DateEditor"   showEditableIcon="always" editableIcon="calendar" itemRenderer="EditableIconItem"	/>\
	 		<DataGridColumn id="USE_YN_NM" 	dataField="USE_YN_NM"   headerText="사용여부"      textAlign="center"   width="95"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem" />\
		    <DataGridColumn id="USE_YN" 	dataField="USE_YN"      visible="false"	 />\
            <DataGridColumn id="REMARK" 	dataField="REMARK"   	headerText="적요"         textAlign="left"  showEditableIcon="always"   itemRenderer="EditableIconItem"   />\
	</columns>\
	</DataGrid>\
</rMateGrid>';

//담당자 정보 등록 - 그리드5 헤더 설정  
var layoutStr5 =
'<rMateGrid>\
	<DataGrid id="dg5" headerColors="[#f2f2f2]" editable="true" selectionMode="singleCell"  borderColor="#ddd" rollOverColor="#ddffdc" selectionColor="#ffe6cd" color="#4c4f53" headerHeight="25" rowHeight="25" headerPaddingTop="5" headerPaddingBottom="5" paddingTop="3" paddingBottom="3" headerBorderTopColor="#2c2c2c" headerBorderTopWidth="2" textSelectedColor = "#4c4f53" fontFamily= "돋움">\
		<columns>\
			<DataGridColumn  id="NO" 			dataField="NO"        	 headerText="순번"   	   editable="false" itemRenderer="IndexNoItem"	 textAlign="center"  width="41"    />\
			<DataGridColumn  id="USER_ID" 		dataField="USER_ID"   	 headerText="아이디"     editable="false" textAlign="center"     />\
	        <DataGridColumn  id="PASSWD" 		dataField="PASSWD"    	 headerText="패스워드"    showEditableIcon="always"   itemRenderer="EditableIconItem"	 textAlign="center"       />\
			<DataGridColumn  id="USER_NM" 		dataField="USER_NM"   	 headerText="이름" 	    showEditableIcon="always"  itemRenderer="EditableIconItem"	 textAlign="center"       />\
			<DataGridColumn  id="VEN_DEPT" 	    dataField="VEN_DEPT"  	 headerText="소속"       showEditableIcon="always"  itemRenderer="EditableIconItem"	 textAlign="center"     />\
			<DataGridColumn  id="POSITION_NM" 	dataField="POSITION_NM"  headerText="직급"       textAlign="center"    itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"  />\
			<DataGridColumn  id="POSITION" 		dataField="POSITION"     visible="false"	 />\
	        <DataGridColumn  id="TEL_NO" 		dataField="TEL_NO"    	 headerText="전화번호"    showEditableIcon="always"   itemRenderer="EditableIconItem"	 textAlign="center"     />\
	        <DataGridColumn  id="MOBIL_NO" 		dataField="MOBIL_NO"  	 headerText="휴대폰"     showEditableIcon="always"   itemRenderer="EditableIconItem"	  textAlign="center"     />\
			<DataGridColumn  id="MAIL_ID" 		dataField="MAIL_ID"   	 headerText="이메일"      showEditableIcon="always"   itemRenderer="EditableIconItem"	 textAlign="center"     />\
			<DataGridColumn  id="EMP_NM" 		dataField="EMP_NM"   	headerText="관리담당자"     textAlign="left" itemRenderer="IconItem" icon="Magnifier"   editable="false"     />\
			<DataGridColumn  id="EMP_NO" 		dataField="EMP_NO"    	visible="false"	  />\
			<DataGridColumn  id="USE_YN_NM" 	dataField="USE_YN_NM"    headerText="사용여부"     textAlign="center"    itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code"   showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"  />\
	        <DataGridColumn  id="USE_YN" 		dataField="USE_YN"      visible="false"	 />\
	</columns>\
	</DataGrid>\
</rMateGrid>';


//취급 상품 조회 - 그리드6 헤더 설정
var layoutStr6 =
'<rMateGrid>\
	<DataGrid id="dg6"  sortableColumns="true" horizontalScrollPolicy="auto"  selectionMode="singleCell" >\
	<columns>\
		<DataGridColumn dataField="NO"        	 	headerText="No"   	   		editable="false" itemRenderer="IndexNoItem"	 textAlign="center"  width="41"    />\
		<DataGridColumn dataField="CORP_CODE"    	headerText="기업코드"    		textAlign="center"  visible="false"	 width="41"    />\
	<DataGridColumn dataField="STR_NAME"    	headerText="점포명"    		textAlign="center"  width="65"    />\
	<DataGridColumn dataField="ITM_CODE"    	headerText="상품코드"    		textAlign="center"  width="120"    />\
		<DataGridColumn dataField="SCAN_CODE"    	headerText="스캔코드"    		textAlign="center"  width="120"    />\
		<DataGridColumn dataField="ITM_NAME"    	headerText="상품명"    		textAlign="left"  	width="120"    />\
		<DataGridColumn dataField="ITM_SHORT_NAME"  headerText="단축상품명"    	textAlign="left"  	width="120"    />\
		<DataGridColumn dataField="VEN_CODE"    	headerText="협력업체코드"    	textAlign="center"  visible="false" width="41"    />\
		<DataGridColumn dataField="ITM_STD"    		headerText="관리구분"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="STR_DT"    		headerText="시작일자"    		textAlign="center"  width="90"    />\
		<DataGridColumn dataField="END_DT"    		headerText="종료일자"    		textAlign="center"  width="90"    />\
		<DataGridColumn dataField="END_IND"    		headerText="취급여부"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="LRG_NAME"    	headerText="대분류"    		textAlign="center"   width="120"    />\
		<DataGridColumn dataField="MID_NAME"    	headerText="중분류"    		textAlign="center"    width="120"    />\
		<DataGridColumn dataField="SML_NAME"    	headerText="소분류"    		textAlign="center"  width="120"    />\
		<DataGridColumn dataField="CLS_CODE"    	headerText="소분류코드"    	textAlign="center"  visible="false" width="120"    />\
		<DataGridColumn dataField="ITM_GB"    		headerText="상품구분"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="ITM_FORM"    	headerText="상품형태"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="TAX_GB"    		headerText="과세구분"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="UNIT"    		headerText="규격"    			textAlign="center"  width="66"    />\
		<DataGridColumn dataField="IPSU_QTY"    	headerText="입수량"    		textAlign="right"  	width="60"    />\
		<DataGridColumn dataField="IN_CAPACITY"    	headerText="제품용량"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="UNIT_CAPACITY"   headerText="표시용량"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="DP_PRC_UNIT"    	headerText="표시단위"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="ORG_CODE"    	headerText="원산지"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="ROUTE_GB"    	headerText="배송구분"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="ORD_GB"    		headerText="발주구분"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="BASE_WPRC"    	headerText="기준원가"    		textAlign="right"  	width="66"    />\
		<DataGridColumn dataField="BASE_WVAT"    	headerText="기준원가부가세"    	textAlign="right"  	width="120"    />\
		<DataGridColumn dataField="BASE_SPRC"    	headerText="기준매가"    		textAlign="right"  	width="66"    />\
		<DataGridColumn dataField="BOT_CODE"    	headerText="공병코드"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="BOT_SPRC"    	headerText="공병단가"    		textAlign="right"  	width="66"    />\
		<DataGridColumn dataField="FTRACE_YN"    	headerText="영유아식품이력"    	textAlign="center"  width="100"    />\
		<DataGridColumn dataField="STRACE_YN"    	headerText="수산물이력"    	textAlign="center"  width="120"    />\
		<DataGridColumn dataField="MTRACE_YN"    	headerText="축산물이력"    	textAlign="center"  width="120"    />\
		<DataGridColumn dataField="INGR_YN"    		headerText="공산식자재유무"    	textAlign="center"  width="120"    />\
		<DataGridColumn dataField="POINT_SAVE"    	headerText="포인트적립여부"    	textAlign="center"  width="120"    />\
		<DataGridColumn dataField="MBR_DC_YN"    	headerText="회원할인가능여부"    textAlign="center"  width="120"    />\
		<DataGridColumn dataField="VALID_DT_YN"    	headerText="유효일자관리유무"    textAlign="center"  width="120"    />\
		<DataGridColumn dataField="VALID_DD"    	headerText="유효일수"    		textAlign="center"  width="66"    />\
		<DataGridColumn dataField="REPT_YN"    		headerText="대표여부"    		textAlign="center" visible="false" width="66"    />\
		<DataGridColumn dataField="USE_YN"    		headerText="사용유무"    		textAlign="center"  width="66"    />\
	</columns>\
	</DataGrid>\
</rMateGrid>';


//그리드  데이터 초기화
var gridData1 = [];
var gridData2 = [];
var gridData3 = [];
var gridData4 = [];
var gridData5 = [];
var gridData6 = [];

//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅

 
//var loadData = $("#top_search").serializeAllObject();  
//jQuery.ajax({ 
//    url:"/productCustomerList.do",         
//    type:"POST",
//	datatype:"json",
//	async:false,
// 	data: loadData,
//	success:function(data){  
//		gridApp1.setData(data );     
//		  
//		 
//    },
//    complete : function(data) {
//    },
//    error : function(xhr, status, error) {
//    	CommonJs.alertErrorStatus(xhr.status, error);
//    }
//});
  


 


// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

 

//(상품검색) 팝업 호출 function
function btn_comm_store_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#P_CALLBACK_NM2").val('btn_comm_product_search_call_back(dataRow11)');
	if($("#ITM_NAME").val() != null && $("#ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#ITM_NAME").val());
		btn_comm_search('2');
	}
}

function btn_comm_product_search_call_back(dataRow){
	 
	$("#SCAN_CODE").val( dataRow.SCAN_CODE ) ;
	$("#ITM_NAME").val( dataRow.ITM_NAME ) ;
	$("#ITM_CODE").val( dataRow.ITM_CODE ) ;
}

function chgItmName()
{   
	if( $.trim( $("#ITM_NAME").val() )  == "" )
	{
		$("#ITM_CODE").val("");
		$("#SCAN_CODE").val("");
	}	
}


function init() {
 
	// SELECT BOX 바인딩
	getCommonCodeSelectBoxList("S_GRE_GB",     "GRE_GB");      //	조회조건 거래구분
	getCommonCodeSelectBoxList("S_USE_YN",     "USE_YN");      //	업체사용 유무
	
	getCommonCodeSelectBoxList("BUSI_FLAG",   "BUSI_FLAG");    //	회원구분
	$("#BUSI_FLAG  option[value='0']").remove();    // 회원구분에서 직원(0) 은 뺀다.
	
	getCommonCodeSelectBoxList("BANK_CODE",   "BANK_CODE");    //	결제은행
	getCommonCodeSelectBoxList("GRE_GB",      "GRE_GB");       //	거래구분
	getCommonCodeSelectBoxList("SCM_PUR_OPN", "SCM_PUR_OPN");  //	원가노출
	getCommonCodeSelectBoxList("ORDER_TYPE",  "ORDER_TYPE");   //	발주유형
	getCommonCodeSelectBoxList("PAY_CON",     "PAY_CON");      //	지불주기
//	getCommonCodeSelectBoxList("PAY_SEQ",     "PAY_SEQ");      //	지불차수
	getCommonCodeSelectBoxList("PAY_TYPE",    "PAY_TYPE");     //	지불조건
	getCommonCodeSelectBoxList("JANG_YN",     "JANG_YN");      //	장려금 유무
	
	getCommonCodeSelectBoxList("TEL_NO1",     "TEL_NO");       //	전화 국번
	getCommonCodeSelectBoxList("FAX_NO1",     "FAX_NO");       //	FAX 국번
	
	getCommonCodeSelectBoxList("SLIP_DIV_YN", "SLIP_DIV_YN");  //	전표분할유무
	    
	$("input[name=ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_store_search();
        } 
	});

	//숫자만 입력받기
	$("#D_SORT_ORDER").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
	
	$("#SCM_PUR_OPN").val("Y");

	$("#ORDER_TYPE").val("1");
	  
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

//장려금 유무 변경 : 신규에서 장려금없을때(N)  장려금그리드에 입력 못하게 한다.
function chgJangYn()
{
//	if(  $("#JANG_YN").val() == "N"  )
//	{ 
//		$('#JANG_BTN_ADD').attr('disabled',true);
//		$('#JANG_BTN_DEL').attr('disabled',true);
//	} else {
//		$('#JANG_BTN_ADD').attr('disabled',false);
//		$('#JANG_BTN_DEL').attr('disabled',false);
//	}
}
 

// ex) 214-82-01661
// 회원구분 변경시 직원, 개인일때 만 사업자 번호에  000-00-00000 를 넣어주고 readonly 해준다.
function chgBusiFlag()
{
	if(   $("#BUSI_FLAG").val() == "0"  || $("#BUSI_FLAG").val() == "1"  ) // 직원(0) , 개인(1) 일 때 
//    if(     $("#BUSI_FLAG").val() == "1"  ) //   개인(1) 일 때 
	{ 
		$("#BUSI_NO").val("000-00-00000");  
		$("input[name=BUSI_NO]").attr("readonly",true);
		$('#btnBusiNoDup').hide();
		BUSI_NO_DUP_BIT = "Y";
		
	} else { 
		$("#BUSI_NO").val(""); 
		$("input[name=BUSI_NO]").attr("readonly",false);
		$('#btnBusiNoDup').show();
		BUSI_NO_DUP_BIT = "";
	}

}
 

//코드 상세 조회 클릭 후 이벤트 리스너 호출 테스트
function test(event){
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	
	alert(dataField.CD_ID);
}

function checkBizID(bizID){ 	
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다. 
	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	var i, chkSum=0, c2, remander;
	bizID = bizID.replace(/-/gi,'');	 
	for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i);
	c2 = "0" + (checkID[8] * bizID.charAt(8));
	c2 = c2.substring(c2.length - 2, c2.length);
	chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
	remander = (10 - (chkSum % 10)) % 10 ;	 
	if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK!
	return false;
} 

function autoHypenBizNo(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    
    if( str.length < 4){
        return str;
    }else if(str.length < 5){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 6){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 2);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{       
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3,2);
        tmp += '-';
        tmp += str.substr(5);
        return tmp;
    }
    return str;
}



function showProductPop(){ 
    
 
	
	$("select[name=STR_CODE   ] option").remove();
	$("#STR_CODE" ).append('<option value="">전체</option>'); 
 	
	getStoreCode("STR_CODE");
	

	gridRoot6.removeAll();
	
	var rowIndex = dataGrid1.getSelectedIndex();
	dataRow1 = gridRoot1.getItemAt(rowIndex); 	 
	if( rowIndex == -1 )
	{
		alert("왼쪽 그리드에서 협력업체를 선택 하세요.");
		return;
	} 
	$("#SHOW_VEN_NAME").text( "- " + dataRow1.VEN_NAME );
	    
	$( "#show_product_pop" ).dialog( 'open' );		   
	gridApp6.resize();  // 이걸해줘야지 레이어 팝업에 그리드가 제대로 나타난다.
	
	// venProductList(   );
} 	

// 조회
function venProductList(   )
{  
			var rowIndex = dataGrid1.getSelectedIndex();
			dataRow1 = gridRoot1.getItemAt(rowIndex); 	
	
			jQuery.ajax({ 
			    url:"/venProductList.do",             
			    type:"POST",
				datatype:"json",
				async:true,
				data: {
					  P_VEN_CODE      : dataRow1.VEN_CODE
				,     P_STR_CODE      : $("#STR_CODE").val()
				,     P_POINT_SAVE    : $("#POINT_SAVE").val()
				,     P_SCAN_CODE     : $("#SCAN_CODE").val()
				}, 
			    beforeSend : function(){ 
		            gridRoot6.addLoadingBar(); 
			    }, 
				success:function(data){  
					 
					gridRoot6.removeAll();
					 
					if(data.length == 0) 
					{ 
						alert("협력업체의 상품이 존재하지 않습니다.");
						dataGrid6.setEnabled(true);
				    	gridRoot6.removeLoadingBar();
						return;
					}
					 
					gridApp6.setData(data);   
					
					dataGrid6.setEnabled(true);
			    	gridRoot6.removeLoadingBar();
					  
			    },
			    complete : function(data) {
			      
			    },
			    error : function(xhr, status, error) {
			    	dataGrid6.setEnabled(true);
			    	gridRoot6.removeLoadingBar();
			    	CommonJs.alertErrorStatus(xhr.status, error);
			    }
			});
	 
}


function venProductExcelDown()
{
	var rowIndex = dataGrid1.getSelectedIndex();
	dataRow1 = gridRoot1.getItemAt(rowIndex); 	
	
	var VEN_NAME = $.trim( dataRow1.VEN_NAME );
	dataGrid6.exportFileName = "협력업체상품_"+VEN_NAME+".xlsx" ;  
	gridRoot6.excelExportSave("", false);


}

function  btn_pop_close(){
	
	 $( "#show_product_pop" ).dialog( 'close' );	
	 
}


function btn_save(){
	  
	 
		
	// 유효성 검사. 
    if( $.trim( $("#BUSI_FLAG").val() ) == "" ) {   alert("회원구분을  선택 하세요!");     $("#BUSI_FLAG").focus();  return;     }	 
	if( $.trim( $("#VEN_CODE").val()  ) == "" ) {   alert("협력업체 코드를 입력하세요!");   $("#VEN_CODE").focus();   return;      }
	if( VEN_CODE_DUP_BIT == "" &&  crudBit == "C" )  
	{   alert('협력업체코드 중복검사 버튼을 클릭하세요!'); 
		return;
	}
	
	
	
//	if(  BUSI_NO_DUP_BIT != "Y"  && $("#BUSI_FLAG").val() == "2" )  
 	if( crudBit == "C"  )  
 	{
 	    if(  BUSI_NO_DUP_BIT != "Y"  )  
 		{   alert('사업자번호 중복검사 버튼을 클릭하세요!'); 
 			return;
 		} 		
 	}

	
	if( $.trim( $("#VEN_NAME").val()  ) == "" ) {   alert("협력업체 명을 입력하세요!");     $("#VEN_NAME").focus();  return;   }
	   
	if( $.trim( $("#BUSI_NO").val()   ) == "" )      // 214-82-01661
	{   
		alert("사업자번호를 입력하세요!");      $("#BUSI_NO").focus();   return;   
	
	} else { 
		 
		if( ! checkBizID(  $.trim(    $("#BUSI_NO").val().replace(/-/g, '')   ) )    )
		{    alert('유효하지 않은 사업자번호 입니다.');     return;   } 
	
	}
	
	if( $.trim( $("#POST_NO").val()      ) == "" ) {   alert("우편번호를  입력하세요!");    $("#POST_NO").focus();  return;      }	
	if( $.trim( $("#REP_NAME").val()     ) == "" ) {   alert("대표자명을  입력하세요!");    $("#REP_NAME").focus();  return;     }	
	if( $.trim( $("#REP_MAIL_ID").val()  ) == "" ) {   alert("이메일을  입력하세요!");     $("#REP_MAIL_ID").focus();  return;   }	
	if( $.trim( $("#ADDR").val()         ) == "" ) {   alert("주소를  입력하세요!");       $("#ADDR").focus();  return;      }	
//	if( $.trim( $("#ADDR_DTL").val()     ) == "" ) {   alert("상세주소를  입력하세요!");    $("#ADDR_DTL").focus();  return;  }	
	if( $.trim( $("#JANG_YN").val()      ) == "" ) {   alert("장려율 유무를  선택하세요!");   $("#JANG_YN").focus();  return;  }	 
	if( $.trim( $("#UPTAE").val()        ) == "" ) {   alert("업태를  입력하세요!");       $("#UPTAE").focus();  return;     } 
	if( $.trim( $("#UPJONG").val()       ) == "" ) {   alert("업종을  입력하세요!");       $("#UPJONG").focus();  return;    } 
	if( $.trim( $("#TEL_NO1").val()      ) == "" ) {   alert("전화번호를  입력하세요!");    $("#TEL_NO1").focus();  return;   }	
	if( $.trim( $("#TEL_NO2").val()      ) == "" ) {   alert("전화번호를  입력하세요!");    $("#TEL_NO2").focus();  return;   }	
	if( $.trim( $("#TEL_NO3").val()      ) == "" ) {   alert("전화번호를  입력하세요!");    $("#TEL_NO3").focus();  return;   } 
	

	if( $.trim( $("#FAX_NO1").val() ) != ""   &&  $.trim( $("#FAX_NO2").val() ) == ""    )
	{
		alert("팩스번호를  입력하세요!");    $("#FAX_NO2").focus();  return;
	}
	if( $.trim( $("#FAX_NO1").val() ) != ""   &&  $.trim( $("#FAX_NO3").val() ) == ""    )
	{
		alert("팩스번호를  입력하세요!");    $("#FAX_NO3").focus();  return;
	}
	 
	
	//	if( $.trim( $("#FAX_NO1").val()      ) == "" ) {   alert("팩스번호를  입력하세요!");    $("#FAX_NO1").focus();  return;   }
	//	if( $.trim( $("#FAX_NO2").val()      ) == "" ) {   alert("팩스번호를  입력하세요!");    $("#FAX_NO2").focus();  return;   }
	//	if( $.trim( $("#FAX_NO3").val()  	 ) == "" ) {   alert("팩스번호를  입력하세요!");    $("#FAX_NO3").focus();  return;   }	
	if( $.trim( $("#ENTR_DT").val()      ) == "" ) {   alert("거래시작일자를  입력하세요!"); $("#ENTR_DT").focus();  return;   }	
	if( $.trim( $("#BANK_CODE").val()    ) == "" ) {   alert("결제은행를  선택 하세요!");   $("#BANK_CODE").focus();  return;     }	
	if( $.trim( $("#BANK_ACC_NO").val()  ) == "" ) {   alert("결제계좌를  입력 하세요!");   $("#BANK_ACC_NO").focus();  return;   }	
	if( $.trim( $("#BANK_ACOWN").val()   ) == "" ) {   alert("예금주를  입력 하세요!");     $("#BANK_ACOWN").focus();  return;    }	
	if( $.trim( $("#GRE_GB").val()       ) == "" ) {   alert("거래구분를  입력 하세요!");   $("#GRE_GB").focus();  return;        }
	
	// 거래구분이 임대을일때만 수수료율 입력 받으므로 임대을일 때만 유효성 체크한다.. 
	if( $('#GRE_GB').val() == "2" )
	{
		if( $.trim( $("#SALE_RATE").val()  ) == ""  ||  $.trim( $("#SALE_RATE").val()  ) == "0" )
		{   alert("수수료율을  입력 하세요!");     $("#SALE_RATE").focus();  return;   }
	}
	
//	if( $.trim( $("#CREDIT_LIMIT").val()  ) == "" || $.trim( $("#CREDIT_LIMIT").val()  ) == "0" )
//	{   alert("여신한도를  입력 하세요!");     $("#CREDIT_LIMIT").focus();  return;   }
	
	if( $.trim( $("#SCM_PUR_OPN").val()  ) == "" )  {   alert("원가노출을 선택  하세요!");     $("#SCM_PUR_OPN").focus();  return;    }	
	if( $.trim( $("#ORDER_TYPE").val()   ) == "" )  {   alert("발주유형을 선택  하세요!");     $("#ORDER_TYPE").focus();   return;    }
	 
	// 일  월  화  수  목  금  토 세팅
	var ORD_TERM = "";
	$('input:checkbox[name="ORD_TERM_CHK"]').each(function() { 
	      if(this.checked){    //check 된   항목의 값 
	    	  ORD_TERM = ORD_TERM + "1" ;  
	      } else {
	    	  ORD_TERM = ORD_TERM + "0" ;  
	      }
	});	 
	if( ORD_TERM.indexOf('1') == "-1")
	{    alert("발주가능요일을 선택하세요.");
		 $("#ORD_TERM").val("");
		 return;
	} else { 
		 $("#ORD_TERM").val( ORD_TERM );
	}
	 
	
 
	// [ 그리드에 한껀이상 입력 해야하는 조건 체크 ]
	// 지불조건등록 : 필수 
	var rowCnt2 = gridRoot2.getCollection().getSource();  // 지불조건 그리드 카운트 
	if(  rowCnt2.length == "0" ) {  alert('지불조건을 추가 하세요');       return;  }
	
	
	// 장려율 금액 유효성 체크
	var rowCnt3 = gridRoot3.getCollection().getSource() ; 
	for(var i=0 ; i < rowCnt3.length ; i++)
	{ 
		if(     typeof gridRoot3.getItemFieldAt( i , "MAX_STD_AMT")  == 'undefined' 
			||  gridRoot3.getItemFieldAt( i , "MAX_STD_AMT")  == '0'  
		) 
		{   alert("[장려율등록] 의 최대기준금액을 입력하세요");
			return;
		} 
		
		
		if(     typeof gridRoot3.getItemFieldAt( i , "APPL_MON")  == 'undefined'  ) 
		{   alert("[장려율등록] 의 적용월을 선택하세요");
			return;
		}
		
		if(     typeof gridRoot3.getItemFieldAt( i , "APPL_TGT")  == 'undefined'  ) 
		{   alert("[장려율등록] 의 적용대상을 선택하세요");
			return;
		}
		
		
	}
	
	
	
	// 장려율 등록  : 장려금 유무(JANG_YN) 이 'Y' 일때만 등록가능
	if(  $("#JANG_YN").val() == 'Y' )
	{
		var rowCnt3 = gridRoot3.getCollection().getSource();  // 장려율  그리드 카운트
		if(  rowCnt3.length == "0" ) {  alert('장려율을 추가 하세요');        return;  }
		
		//		var rowCnt4 = gridRoot4.getCollection().getSource();  // 장려제외 상품  그리드 카운트  
		//		if(  rowCnt4.length == "0" ) {  alert('장려제외 상품을 추가 하세요');   return;  }
	 
		// 장려율 등록grid3  ,  장려제외 상품 등록grid4 : 장려금 유무(JANG_YN) 이 'Y' 일때 USE_YN 를 Y 으로 전부 바꾸기  
		var rowCnt  = gridRoot3.getCollection().getSource() ; 
		for(var i=0 ; i < rowCnt.length ; i++)
		{       
			gridRoot3.setItemFieldAt( 'Y'   , i , "USE_YN");
			gridRoot3.setItemFieldAt( '사용' , i , "USE_YN_NM"); 
		} 
		var rowCnt  = gridRoot4.getCollection().getSource() ; 
		for(var i=0 ; i < rowCnt.length ; i++)
		{        
			gridRoot4.setItemFieldAt( 'Y'   , i , "USE_YN");			
			gridRoot4.setItemFieldAt( '사용' , i , "USE_YN_NM"); 
		}
		 
	} else {
		
		// 장려율 등록grid3  ,  장려제외 상품 등록grid4 : 장려금 유무(JANG_YN) 이 'N' 일때 USE_YN 를 N 으로 전부 바꾸기  
		var rowCnt  = gridRoot3.getCollection().getSource() ; 
		for(var i=0 ; i < rowCnt.length ; i++)
		{       
			gridRoot3.setItemFieldAt( 'N'    , i , "USE_YN");
			gridRoot3.setItemFieldAt( '미사용' , i , "USE_YN_NM"); 
		} 
		var rowCnt  = gridRoot4.getCollection().getSource() ; 
		for(var i=0 ; i < rowCnt.length ; i++)
		{        
			gridRoot4.setItemFieldAt( 'N'    , i , "USE_YN");			
			gridRoot4.setItemFieldAt( '미사용' , i , "USE_YN_NM"); 
		}
		 
	}
	

//	var rowCnt5 = gridRoot5.getCollection().getSource();  // 담당자 정보  그리드 카운트 
//	if(  rowCnt5.length == "0" ) {  alert('담당자를 추가 하세요');        return;  }
	 
	

	// 유효성 검사 :  장려제외 상품  
	var rowCnt  = gridRoot4.getCollection().getSource() ; 
	 
	for(var i=0 ; i < rowCnt.length ; i++)
	{       
		if( typeof gridRoot4.getItemFieldAt( i , "USE_YN")  == 'undefined'  ) 
		{   alert("사용여부를 선택하세요");
			return;
		}
		if( typeof gridRoot4.getItemFieldAt( i , "LINK_CODE")  == 'undefined'  ) 
		{   alert("장려제외 상품을 선택하세요");
			return;
		}
		if( typeof gridRoot4.getItemFieldAt( i , "STR_DT")  == 'undefined'  ) 
		{   alert("장려제외 상품  적용일을 선택하세요");
			return;
		}
		if( typeof gridRoot4.getItemFieldAt( i , "END_DT")  == 'undefined'  ) 
		{   alert("장려제외 상품  종료일을 선택하세요");
			return;
		} 
	}
	
	

	// 유효성 검사 :  담당자  
	var rowCnt  = gridRoot5.getCollection().getSource() ; 
	 
	for(var i=0 ; i < rowCnt.length ; i++)
	{       
		if( typeof gridRoot5.getItemFieldAt( i , "PASSWD")  == 'undefined'  ) 
		{   alert("[담당자정보] 패스워드를 입력하세요");
			return;
		}
		if( typeof gridRoot5.getItemFieldAt( i , "USER_NM")  == 'undefined'  ) 
		{   alert("[담당자정보] 이름을 입력하세요");
			return;
		}
		if( typeof gridRoot5.getItemFieldAt( i , "VEN_DEPT")  == 'undefined'  ) 
		{   alert("[담당자정보] 소속을 입력하세요");
			return;
		}
		if( typeof gridRoot5.getItemFieldAt( i , "POSITION")  == 'undefined'  ) 
		{   alert("[담당자정보] 직급을 선택하세요");
			return;
		} 
		
		if( typeof gridRoot5.getItemFieldAt( i , "TEL_NO")  == 'undefined'  ) 
		{   alert("[담당자정보] 전화번호를 입력하세요");
			return;
		} 
		if( typeof gridRoot5.getItemFieldAt( i , "MOBIL_NO")  == 'undefined'  ) 
		{   alert("[담당자정보] 핸드폰 번호를 입력하세요");
			return;
		} 
		if( typeof gridRoot5.getItemFieldAt( i , "MAIL_ID")  == 'undefined'  ) 
		{   alert("[담당자정보] 이메일을 선택하세요");
			return;
		} 
		if( typeof gridRoot5.getItemFieldAt( i , "EMP_NO")  == 'undefined'  ) 
		{   alert("[담당자정보] 관리담당자이름을   선택하세요");
			return;
		} 
		if( typeof gridRoot5.getItemFieldAt( i , "USE_YN")  == 'undefined'  ) 
		{   alert("[담당자정보] 사용여부를  선택하세요");
			return;
		} 
	}
	 
	
	if (confirm("저장 하시겠습니까?") == false)
	{    
		return; 
	}
	
	
//	if( crudBit == "C" ) // 신규저장 모드 일때 수행
//	{ 					  
						var gridXmlData2 = "";
						var gridXmlData3 = "";
						var gridXmlData4 = "";
						var gridXmlData5 = ""; 
						 
						// 지불조건 XML로 뽑기  - xml
						var rowCnt  = gridRoot2.getCollection().getSource() ;  
						for(var i=0 ; i < rowCnt.length ; i++)
						{    gridXmlData2 = gridXmlData2 + getXmlString(   gridRoot2.getItemAt(i)   );     } 
						
						//	장려율 XML로 뽑기  - xml
						var rowCnt  = gridRoot3.getCollection().getSource() ;  
						for(var i=0 ; i < rowCnt.length ; i++)
						{    gridXmlData3 = gridXmlData3 + getXmlString(   gridRoot3.getItemAt(i)   );     } 
						
						//	장려제외 상품 XML로 뽑기  - xml
						var rowCnt  = gridRoot4.getCollection().getSource() ;  
						for(var i=0 ; i < rowCnt.length ; i++)
						{    gridXmlData4 = gridXmlData4 + getXmlString(   gridRoot4.getItemAt(i)   );     } 
						
						//	담당자 정보 XML로 뽑기  - xml
						var rowCnt  = gridRoot5.getCollection().getSource() ;  
						for(var i=0 ; i < rowCnt.length ; i++)
						{    gridXmlData5 = gridXmlData5 + getXmlString(   gridRoot5.getItemAt(i)   );     } 
						
						gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
						gridXmlData3 =  "<GRIDLIST>"+gridXmlData3+"</GRIDLIST>" ;
						gridXmlData4 =  "<GRIDLIST>"+gridXmlData4+"</GRIDLIST>" ;
						gridXmlData5 =  "<GRIDLIST>"+gridXmlData5+"</GRIDLIST>" ;
						  
						// 협력업체 상세정보 저장위해 xml 만듦
						var cdSupply     = ""; 
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
						var VEN_CODE         = xmlDoc.createElement('VEN_CODE');
						var VEN_NAME         = xmlDoc.createElement('VEN_NAME');
						var BUSI_NO          = xmlDoc.createElement('BUSI_NO');
						var POST_NO          = xmlDoc.createElement('POST_NO');
						var REP_NAME         = xmlDoc.createElement('REP_NAME');
						var REP_MAIL_ID      = xmlDoc.createElement('REP_MAIL_ID');
						var ADDR             = xmlDoc.createElement('ADDR');
						var ADDR_DTL         = xmlDoc.createElement('ADDR_DTL');
						var UPTAE            = xmlDoc.createElement('UPTAE');
						var UPJONG           = xmlDoc.createElement('UPJONG');
						var TEL_NO           = xmlDoc.createElement('TEL_NO');
						var FAX_NO           = xmlDoc.createElement('FAX_NO');
						var ENTR_DT          = xmlDoc.createElement('ENTR_DT');
						var OUT_DT           = xmlDoc.createElement('OUT_DT');
						var BANK_CODE        = xmlDoc.createElement('BANK_CODE');
						var BANK_ACC_NO      = xmlDoc.createElement('BANK_ACC_NO');
						var BANK_ACOWN       = xmlDoc.createElement('BANK_ACOWN');
						var GRE_GB           = xmlDoc.createElement('GRE_GB');
						var SALE_RATE        = xmlDoc.createElement('SALE_RATE');
						var CREDIT_LIMIT     = xmlDoc.createElement('CREDIT_LIMIT');
						var SCM_PUR_OPN      = xmlDoc.createElement('SCM_PUR_OPN');
						var ORDER_TYPE       = xmlDoc.createElement('ORDER_TYPE');
						var ORD_TERM         = xmlDoc.createElement('ORD_TERM'); 
						var JANG_YN          = xmlDoc.createElement('JANG_YN');
						var BUSI_FLAG        = xmlDoc.createElement('BUSI_FLAG');
						var SLIP_DIV_YN      = xmlDoc.createElement('SLIP_DIV_YN');
						
						

						SLIP_DIV_YN.appendChild( xmlDoc.createTextNode(    $("#SLIP_DIV_YN" ).val()    	)	);
					    VEN_CODE.appendChild(  	 xmlDoc.createTextNode(    $("#VEN_CODE" ).val()    	)	);
					    VEN_NAME.appendChild(  	 xmlDoc.createTextNode(    $("#VEN_NAME" ).val()    	)	);
					    BUSI_NO.appendChild(  	 xmlDoc.createTextNode(    $("#BUSI_NO" ).val().replace(/-/gi,'')    		)	);
					    POST_NO.appendChild(  	 xmlDoc.createTextNode(    $("#POST_NO" ).val()   		)	);
					    REP_NAME.appendChild(  	 xmlDoc.createTextNode(    $.trim( $("#REP_NAME" ).val()    )	)	);
					    REP_MAIL_ID.appendChild( xmlDoc.createTextNode(    $.trim( $("#REP_MAIL_ID" ).val() )	)	);
					    ADDR.appendChild(  		 xmlDoc.createTextNode(    $("#ADDR" ).val()    		)	);
					    ADDR_DTL.appendChild(  	 xmlDoc.createTextNode(    $("#ADDR_DTL" ).val()  		)	);
					    UPTAE.appendChild(  	 xmlDoc.createTextNode(    $("#UPTAE" ).val()    		)	);
					    UPJONG.appendChild(  	 xmlDoc.createTextNode(    $("#UPJONG" ).val()    		)	);
					    TEL_NO.appendChild(  	 xmlDoc.createTextNode(    $("#TEL_NO1" ).val() +"-"+  $("#TEL_NO2" ).val()  +"-"+ $("#TEL_NO3" ).val()   	)	);
					     
					    FAX_NO.appendChild(  	 xmlDoc.createTextNode(    $("#FAX_NO1" ).val() +"-"+  $("#FAX_NO2" ).val()  +"-"+ $("#FAX_NO3" ).val()    	)	);
					    ENTR_DT.appendChild(  	 xmlDoc.createTextNode(    $("#ENTR_DT" ).val()   		)	);
					    OUT_DT.appendChild(  	 xmlDoc.createTextNode(    $("#OUT_DT" ).val()    		)	);
					    BANK_CODE.appendChild(   xmlDoc.createTextNode(    $("#BANK_CODE" ).val() 		)	);
					    BANK_ACC_NO.appendChild( xmlDoc.createTextNode(    $("#BANK_ACC_NO" ).val() 	)	);
					    BANK_ACOWN.appendChild(  xmlDoc.createTextNode(    $.trim( $("#BANK_ACOWN" ).val() 	)	)	);
					    GRE_GB.appendChild(  	 xmlDoc.createTextNode(    $("#GRE_GB" ).val()   		)	);
					    SALE_RATE.appendChild(   xmlDoc.createTextNode(    $("#SALE_RATE" ).val() 		)	);
					    CREDIT_LIMIT.appendChild(xmlDoc.createTextNode(    $("#CREDIT_LIMIT" ).val() 	)	);
					    SCM_PUR_OPN.appendChild( xmlDoc.createTextNode(    $("#SCM_PUR_OPN" ).val() 	)	);
					    ORDER_TYPE.appendChild(  xmlDoc.createTextNode(    $("#ORDER_TYPE" ).val() 		)	);
					    ORD_TERM.appendChild(  	 xmlDoc.createTextNode(    $("#ORD_TERM" ).val() 		)	); 
					    JANG_YN.appendChild(  	 xmlDoc.createTextNode(    $("#JANG_YN" ).val() 		)	);
					    BUSI_FLAG.appendChild(   xmlDoc.createTextNode(    $("#BUSI_FLAG" ).val() 		)	);
					     
					     
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SLIP_DIV_YN);  
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);    
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);    
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BUSI_NO);     
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POST_NO);     
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REP_NAME);    
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REP_MAIL_ID); 
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ADDR);        
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ADDR_DTL);    
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UPTAE);       
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UPJONG);      
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TEL_NO);      
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(FAX_NO);      
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ENTR_DT);     
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(OUT_DT);      
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BANK_CODE);   
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BANK_ACC_NO); 
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BANK_ACOWN);  
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(GRE_GB);      
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SALE_RATE);   
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CREDIT_LIMIT);
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCM_PUR_OPN); 
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORDER_TYPE);  
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_TERM);  
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(JANG_YN);  
					    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BUSI_FLAG);  
					     
					    cdSupply  =  "<GRIDLIST>"+getXmlString(   xmlDoc   )+"</GRIDLIST>" ; 
					    // 	alert(  cdSupply );
						 
						// 협력업체 저장
						jQuery.ajax({ 
						    url:"/productCustomerRegister.do",         
						    type:"POST",
							datatype:"xml",
							async:false,
							data: {   "VEN_CODE"     : $("#VEN_CODE").val()
					   				, "gridXmlData2" : gridXmlData2  
									, "gridXmlData3" : gridXmlData3  
									, "gridXmlData4" : gridXmlData4  
									, "gridXmlData5" : gridXmlData5  
									, "cdSupply"     : cdSupply
							      }, 
							success:function(data){   
								 
//								var obj = jQuery.parseJSON( data.RETURN_CUR );
								 
								if(  data[0].RETURN_CODE  == "0000")
								{   alert("저장에 성공 하였습니다");
								} else {
									alert("저장에 실패 하였습니다");
								}   
						    },
						    complete : function(data) {
						    	 
						    },
						    error : function(xhr, status, error) {
						    	CommonJs.alertErrorStatus(xhr.status, error);
						    }
						});
						
//		} else {   // 수정 모드일때 수행
			
			
//			alert('수정');
			
//		}
	
	
	
	 
	
	
	
	
	
	
	
	
}


function btn_new(){

	// 신규 모드
	crudBit = "C";
	
	// 신규  초기화  
	// 특정 아이디 값의 필드를 제외 :  $(':text:not([id=TEL_NO4])').val('');
    // 특정 2개의 id 값 제외하고 체크박스 초기화 : $('input:checkbox:not([id=ckmail]):not([id=ckmin])').attr('checked','');
	// text box 초기화 :  $(':text').val('');    
	// 셀렉트 박스 초기화
	//	 $('select').each(function(){
	//	 	 $(this).find('option:first').attr('selected','true');
	//	 });
	
	$("form").each(function() {  
        if(this.id == "frmBody") this.reset();  
     });  

	// 협력업체 코드입력란  활성화
	$("input[name=VEN_CODE]").attr("readonly",false);
	 
	//협력업체코드 중복버튼  활성화 
	$('#btnDup').show();
	
	// 등록일 등록자 / 수정일 수정자 초기화
//	$('#UEMP_NO').text("");
	$('#UDATE').val( ""  );
//	$('#IEMP_NO').text("");
	$('#IDATE').val( ""  );
	
	//	수수료율  : 0 으로 세팅
	$( "#SALE_RATE" ).val('0');		
	//	여신한도 : 0 으로 세팅
	$( "#CREDIT_LIMIT" ).val('0');	
	 
	// 회원구분 바꾸게 한다.     
	$('#BUSI_FLAG').removeAttr('disabled');
	
	$("#SCM_PUR_OPN").val("Y");
	
	// 신규일때 거래종료일 입력 못 받게 한다.     
	$( "#OUT_DT" ).datepicker( "option", "disabled", true );
	$("input[name=OUT_DT]").attr("readonly",false);
	 
//	$("input[name=OUT_DT]").removeClass("wid2 datepicker");
//	$("input[name=OUT_DT]").addClass("wid2 datepicker");
	
	
	// 일  월  화  수  목  금  토 세팅
	var ORD_TERM = "";
	$('input:checkbox[name="ORD_TERM_CHK"]').each(function() { 
		$(this).attr("checked", true);
	});	  
	

	$("#ORDER_TYPE").val("1");


	$("select[name=GRE_GB   ] option").remove();  
	$("#GRE_GB" ).append('<option value="">선택</option>'); 
	getCommonCodeSelectBoxList("GRE_GB",     "GRE_GB");     
	
	// 그리드 초기화 
	grid1.setData([]);
	grid2.setData([]);
	grid3.setData([]);
	grid4.setData([]);
	grid5.setData([]);
	
	

	$("#S_VEN").val("");
	$("#S_USE_YN").val("");
	$("#S_GRE_GB").val("");
	
	
	
}

function btn_search(){
	
	 
	if(    $.trim( $("#S_VEN").val()  )   == "")
	{   alert("협력업체명을 입력하세요");
		$("#S_VEN").focus();
		return;
	}
	
	
//	var loadData = $("#top_search").serializeAllObject(); 
	 
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅 
	
	jQuery.ajax({ 
	    url:"/productCustomerList.do",         
	    type:"POST",
		datatype:"json",
//		async:false,
		data: {
			  S_VEN     : $("#S_VEN").val() 
			, S_GRE_GB  : $.trim( $("#S_GRE_GB").val()  )  
			, S_USE_YN  : $("#S_USE_YN").val() 
		}, 
	    beforeSend : function(){ 
            gridRoot1.addLoadingBar(); 
	    }, 
		success:function(data){  
			

			
			if(data.length == 0) 
			{ 
				alert("검색 한 [ "+ $('#S_VEN').val() +" ] 협력업체가 존재하지 않습니다.");
				dataGrid1.setEnabled(true);
		    	gridRoot1.removeLoadingBar();
				return;
			}
			 
			gridApp1.setData(data);   
			
			dataGrid1.setEnabled(true);
	    	gridRoot1.removeLoadingBar();
			 
			 
	    },
	    complete : function(data) {
	     
	    
	    },
	    error : function(xhr, status, error) {
	    	dataGrid1.setEnabled(true);
	    	gridRoot1.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	
	
	
//	jQuery.ajax({ 
//	    url:"/groupGridTest.do",         
//	    type:"POST",
//		datatype:"xml",
//		async:false,
//		data: loadData, 
//		success:function(data){  
//			gridApp1.setData(data.CUR);     
//			
//			
//			alert(data.RETURN_CUR   );    
//			var obj = jQuery.parseJSON( data.RETURN_CUR );
//			alert(obj.RETURN_CODE);
//			alert(obj.RETURN_MESSAGE);
//			 
//	    },
//	    complete : function(data) {
//	    },
//	    error : function(xhr, status, error) {
//	           
//	    }
//	});
	
}

//function itemEditBeginningChecker3(rowIndex, columnIndex, item, dataField) {
//	if (dataField != "YEAR_Y4sss")
//		return true;
//	else
//		return false;
//}

//
//function itemEditEndChecker3(rowIndex, columnIndex, item, dataField, oldValue, newValue, reason) {
//	 
//	
//	// 사용자 취소의 경우 return
//	if (reason == "cancelled")
//		return null;
//
//	if( dataField == "YEAR_Y2")
//	{ 
//		if(  isNaN(Number(newValue))  )
//		{ 
//			return dataField + "값은 숫자만 가능합니다.";
//		}
//	}
//	 
//	return null;
//}



function gridHolder5AddRow()
{
	
	
	 
	if( VEN_CODE_DUP_BIT == ""  && crudBit == "C")
	{
		alert("상단의 [협력업체코드 중복검사] 버튼을 클릭하세요.");
		return;
	}
	if( crudBit == "C" && $("#BUSI_FLAG").val() == "2" )  
	{   alert('사업자번호 중복검사 버튼을 클릭하세요!'); 
		return;
	}
	
	
	// 현재 보이는 ROW 수 구하기
	var collection = gridRoot5.getCollection(); 
	var rowCount = collection.getSource(); 
	  
	 
	if( rowCount.length  == 0)
	{
		rowCount = "01";
		
	} else  {
		var user_id_val = gridRoot5.getItemFieldAt( rowCount.length -1  , "USER_ID") ;
		
		user_id_val = user_id_val.substring(5) ;
		
		rowCount = parseInt(user_id_val) + 1;
		 
		if(rowCount < 10)
		{  rowCount = "0"+rowCount;  }
		
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
	var NO 			= xmlDoc.createElement('NO'); 
	var USER_ID 	= xmlDoc.createElement('USER_ID'); 
	var PASSWD 		= xmlDoc.createElement('PASSWD');  
	var USER_NM 	= xmlDoc.createElement('USER_NM'); 
	var VEN_DEPT 	= xmlDoc.createElement('VEN_DEPT'); 
	var POSITION_NM = xmlDoc.createElement('POSITION_NM'); 
	var POSITION 	= xmlDoc.createElement('POSITION'); 
	var TEL_NO 		= xmlDoc.createElement('TEL_NO');  
	var MOBIL_NO 	= xmlDoc.createElement('MOBIL_NO'); 
	var MAIL_ID 	= xmlDoc.createElement('MAIL_ID'); 
	var EMP_NM 		= xmlDoc.createElement('EMP_NM'); 
	var EMP_NO 		= xmlDoc.createElement('EMP_NO'); 
	var USE_YN_NM 	= xmlDoc.createElement('USE_YN_NM'); 
	var USE_YN 		= xmlDoc.createElement('USE_YN');  
	   
	NO.appendChild(  		xmlDoc.createTextNode( 	 "" 	)	);
	USER_ID.appendChild(  	xmlDoc.createTextNode( 	 $("#VEN_CODE").val() + "" +  rowCount 	)	);
	PASSWD.appendChild(  	xmlDoc.createTextNode( 	 $("#VEN_CODE").val() + "" +  rowCount 	)	);
	USER_NM.appendChild(  	xmlDoc.createTextNode( 	 "" 	)	);
	VEN_DEPT.appendChild(  	xmlDoc.createTextNode( 	 "" 	)	);
	POSITION_NM.appendChild(xmlDoc.createTextNode( 	 "" 	)	);
	POSITION.appendChild(  	xmlDoc.createTextNode( 	 "" 	)	);
	TEL_NO.appendChild(  	xmlDoc.createTextNode( 	 "" 	)	);
	MOBIL_NO.appendChild(  	xmlDoc.createTextNode( 	 "" 	)	);
	MAIL_ID.appendChild(  	xmlDoc.createTextNode( 	 "" 	)	);
	EMP_NM.appendChild(  	xmlDoc.createTextNode( 	 "" 	)	);
	EMP_NO.appendChild(  	xmlDoc.createTextNode( 	 "" 	)	);
	USE_YN_NM.appendChild(  xmlDoc.createTextNode( 	 "" 	)	);
	USE_YN.appendChild(  	xmlDoc.createTextNode( 	 ""     )	);
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(NO);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USER_ID);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PASSWD);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USER_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_DEPT);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POSITION_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POSITION);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TEL_NO);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MOBIL_NO);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MAIL_ID);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EMP_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EMP_NO);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);  
	 
	gridRoot5.addItemAt( xmlDoc , -1 ,false);
	girdMoveSelctedIndex(0 , gridRoot5.getDataGrid() );  
	
}
function gridHolder5DelRow()
{
	if (confirm("선택한 담당자 정보를 삭제하시겠습니까?") == true){    
		var selectedIndex = dataGrid5.getSelectedIndex();
		gridRoot5.removeItemAt(selectedIndex);
	}else{    
	    return;
	} 
}

function gridHolder4AddRow()
{

	// 장려금 유무가 N 일때에는 입력/삭제 못하게 한다.
//	if(  $("#JANG_YN").val() == "N" || $("#JANG_YN").val() == ""  )
//	{   alert("장려금은 사용하지 않음로 설정 되어있습니다.\n사용하시려면 장려금유무 항목에서 '장려금 있음'으로 변경하시기 바랍니다.");
//		$("#JANG_YN").focus();
//		return;
//	}  




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
	
	var NO 		 	= xmlDoc.createElement('NO'); 
	var LINK_CODE 	= xmlDoc.createElement('LINK_CODE'); 
	var LINK_NAME   = xmlDoc.createElement('LINK_NAME'); 
	var STR_DT 		= xmlDoc.createElement('STR_DT'); 
	var END_DT 		= xmlDoc.createElement('END_DT'); 
	var USE_YN_NM 	= xmlDoc.createElement('USE_YN_NM'); 
	var USE_YN 		= xmlDoc.createElement('USE_YN'); 
	var REMARK 		= xmlDoc.createElement('REMARK'); 
	   
	NO.appendChild(  		xmlDoc.createTextNode( 	""	)   );
	LINK_CODE.appendChild(  xmlDoc.createTextNode( 	""	)   );
	LINK_NAME.appendChild(  xmlDoc.createTextNode( 	""	)   );
	STR_DT.appendChild(  	xmlDoc.createTextNode( 	""	)   );
	END_DT.appendChild(  	xmlDoc.createTextNode( 	""	)   );
	USE_YN_NM.appendChild(  xmlDoc.createTextNode( 	""	)   );
	USE_YN.appendChild(  	xmlDoc.createTextNode( 	""	)   );
	REMARK.appendChild(  	xmlDoc.createTextNode( 	""	)   );
 
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(NO);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINK_CODE);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINK_NAME);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_DT);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(END_DT);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);  
 
	gridRoot4.addItemAt( xmlDoc , 0 , false);
	girdMoveSelctedIndex(0 , gridRoot4.getDataGrid() ); 

}

function gridHolder4DelRow()
{
	if (confirm("선택한 장려제외 상품을 삭제하시겠습니까?") == true){    
		var selectedIndex = dataGrid4.getSelectedIndex();
		gridRoot4.removeItemAt(selectedIndex);
	}else{    
	    return;
	} 
}


function gridHolder3DelRow()
{
	// 장려금 유무가 N 일때에는 입력/삭제 못하게 한다.
	if(  $("#JANG_YN").val() == "N" || $("#JANG_YN").val() == ""  )
	{   alert("장려금은 사용하지 않음로 설정 되어있습니다.\n사용하시려면 장려금유무 항목에서 '장려금 있음'으로 변경하시기 바랍니다.");
		$("#JANG_YN").focus();
		return;
	}  
	
 
	var rowCnt  = gridRoot3.getCollection().getSource() ;  
	if(rowCnt.length == 0)
	{
		alert("삭제할 구간이 없습니다.");
		
	} else {  		
			if (confirm("최고 구간인 ["+rowCnt.length+" 구간]을 삭제합니다.\n삭제 하시겠습니까?") == true){    
		//		var selectedIndex = dataGrid3.getSelectedIndex();
				gridRoot3.removeItemAt( rowCnt.length-1 );
			}else{    
			    return;
			}
	}
	
	
	
	
}


// 장려율등록
function gridHolder3AddRow()
{  
	var rowCnt  = gridRoot3.getCollection().getSource() ;  
	// 장려금 유무가 N 일때에는 입력/삭제 못하게 한다.
	if(  $("#JANG_YN").val() == "N" || $("#JANG_YN").val() == ""  )
	{   alert("장려금은 사용하지 않음로 설정 되어있습니다.\n사용하시려면 장려금유무 항목에서 '장려금 있음'으로 변경하시기 바랍니다.");
		$("#JANG_YN").focus();
		return;
	}  
 
	var  alertStr = rowCnt.length ;
	if(  
		    gridRoot3.getItemFieldAt( rowCnt.length -1 , "MAX_STD_AMT")   == 0 
		 || gridRoot3.getItemFieldAt( rowCnt.length -1 , "MAX_STD_AMT")   == ""	
		 || typeof gridRoot3.getItemFieldAt( rowCnt.length -1 , "MAX_STD_AMT")   == "undefined"	
	)
	{
		alert('[ '+  alertStr +' 구간 ] 의 최대기준금액을 입력하세요.');
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
 
	var PUR_SECTION_NM 	= xmlDoc.createElement('PUR_SECTION_NM'); 
	var PUR_SECTION 	= xmlDoc.createElement('PUR_SECTION');  
	var MIN_STD_AMT 	= xmlDoc.createElement('MIN_STD_AMT'); 
	var MAX_STD_AMT 	= xmlDoc.createElement('MAX_STD_AMT'); 
	var PUR_RATE 		= xmlDoc.createElement('PUR_RATE'); 
	var SALE_RATE 		= xmlDoc.createElement('SALE_RATE'); 
	var PMOT_RATE 		= xmlDoc.createElement('PMOT_RATE'); 
	var LOGIS_RATE 		= xmlDoc.createElement('LOGIS_RATE'); 
	var USE_YN_NM 		= xmlDoc.createElement('USE_YN_NM'); 
	var USE_YN 			= xmlDoc.createElement('USE_YN'); 
	var APPL_TGT 		= xmlDoc.createElement('APPL_TGT'); 
	var APPL_MON 		= xmlDoc.createElement('APPL_MON'); 
	var APPL_TGT_NM 	= xmlDoc.createElement('APPL_TGT_NM'); 
	var APPL_MON_NM 	= xmlDoc.createElement('APPL_MON_NM'); 
	
	var PUR_SECTION_VAL = rowCnt.length+1;
	PUR_SECTION_NM.appendChild( xmlDoc.createTextNode(   PUR_SECTION_VAL+" 구간"  )	);
	PUR_SECTION.appendChild(  	xmlDoc.createTextNode( 	 PUR_SECTION_VAL	 )	);
	 
	// 행추가시 이전 구간의 최대기준금액에 1을 더해서 최소기준금액에 넣는다.
	var MIN_STD_AMT_VAL = 0;
	if( rowCnt.length != 0)
	{
		MIN_STD_AMT_VAL = parseInt(1) + parseInt(  gridRoot3.getItemFieldAt( rowCnt.length -1 , "MAX_STD_AMT")  );
	}
		
	MIN_STD_AMT.appendChild(  	xmlDoc.createTextNode( 	 MIN_STD_AMT_VAL )	);
	MAX_STD_AMT.appendChild(  	xmlDoc.createTextNode( 	 "0" )	);
	PUR_RATE.appendChild(  		xmlDoc.createTextNode( 	 "0" )	);
	SALE_RATE.appendChild(  	xmlDoc.createTextNode(   "0" )	);
	PMOT_RATE.appendChild(  	xmlDoc.createTextNode( 	 "0" )	);
	LOGIS_RATE.appendChild(  	xmlDoc.createTextNode( 	 "0" )	); 
	USE_YN_NM.appendChild(		xmlDoc.createTextNode(   ""  )	);
	USE_YN.appendChild(			xmlDoc.createTextNode(	 ""	 )	); 
	APPL_TGT.appendChild(		xmlDoc.createTextNode(	 ""	 )	);
	APPL_MON.appendChild(		xmlDoc.createTextNode(	 ""	 )	);
	APPL_TGT_NM.appendChild(	xmlDoc.createTextNode(	 ""	 )	);
	APPL_MON_NM.appendChild(	xmlDoc.createTextNode(	 ""	 )	);
	 
 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APPL_TGT); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APPL_MON); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APPL_TGT_NM); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APPL_MON_NM); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SECTION_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SECTION);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MIN_STD_AMT);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MAX_STD_AMT);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_RATE);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SALE_RATE);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PMOT_RATE);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOGIS_RATE);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);  
	 
	 
	gridRoot3.addItemAt( xmlDoc , -1 , false);
	girdMoveSelctedIndex(-1 , gridRoot3.getDataGrid() ); 
	
//	var value = {};
//    value.rowIndex = 0;         // 이동할 행의 index 입니다.
//    value.columnIndex = 1;    // 이동할 열의 index 입니다.
//    dataGrid1.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
    
}

function gridHolder2DelRow()
{
	if (confirm("선택한 지불조건을 삭제하시겠습니까?") == true){     
		var selectedIndex = dataGrid2.getSelectedIndex();
		gridRoot2.removeItemAt(selectedIndex);
	} else {    
	    return;
    } 
}

function gridHolder2AddRow()
{   
	
	if(crudBit != "U")  // 신규일때만 처리 : 수정모드가 아닐때만 처리
	{   if( VEN_CODE_DUP_BIT == "" )
		{   alert("상단의 [협력업체코드 중복검사] 버튼을 클릭하세요.");
			return;
		}
	}
	 
	// 유효성 검사
	if( $('#PAY_CON').val()  == "") { alert('지불주기를 선택 하세요!');  $('#PAY_CON').focus();    return;  }	
	if( $('#PAY_SEQ').val()  == "") { alert('지불차수를 선택 하세요!');  $('#PAY_SEQ').focus();    return;  }	
	if( $('#PAY_TYPE').val() == "") { alert('지불조건을 선택 하세요!');  $('#PAY_TYPE').focus();   return;  }	
	if( $('#USE_YN').val() == "")   { alert('사용여부를 선택 하세요!');  $('#USE_YN').focus();     return;  }	
	
	// 지불조건 및 지불 차수에 관한 로직
	var PAY_CON_MGMT_ENTRY_1 = $('#PAY_CON_MGMT_ENTRY_1').val();
	var PAY_SEQ_MGMT_ENTRY_1 = $('#PAY_SEQ_MGMT_ENTRY_1').val();
	var PAY_SEQ_MGMT_ENTRY_2 = $('#PAY_SEQ_MGMT_ENTRY_2').val();
	var PAY_SEQ_MGMT_ENTRY   = $('#PAY_SEQ_MGMT_ENTRY').val();
	
//	 if( PAY_CON_MGMT_ENTRY_1 != PAY_SEQ_MGMT_ENTRY )
//	 {   alert('지불 주기의 기간과 지불차수의 기간이 일치 하지 않습니다.');
//		 return;
//	 }
	 var PAY_SEQ_TOT = 0;
	 var rowCnt  = gridRoot2.getCollection().getSource() ; 
	 for(var i=0 ; i < rowCnt.length ; i++)
	 {     
		 PAY_SEQ_TOT = parseInt(PAY_SEQ_TOT) + parseInt(gridRoot2.getItemFieldAt( i , "PAY_SEQ_SUM") ) ; 
	 } 
	 PAY_SEQ_TOT = parseInt(PAY_SEQ_MGMT_ENTRY) + parseInt(PAY_SEQ_TOT) ; 
	   
	 if( PAY_SEQ_TOT  > 30 )
	 {
		 alert('차수의 합이 30일이 넘습니다.\n더 이상 추가 할 수 없습니다.');
		 return;
	 }
	 
	 
	// 유효성 검사 : 지불차수 - 컬럼내 데이터 중복 방지
	var rowCnt2 = gridRoot2.getCollection().getSource() ; 
	for(var i=0 ; i < rowCnt2.length ; i++)
	{   if( gridRoot2.getItemFieldAt( i , "PAY_SEQ")  == $('#PAY_SEQ').val()   ) 
		{
			alert("선택하신 지불차수는 이미 등록 되었습니다.");
			return;
		}
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
	var PAY_CON 	= xmlDoc.createElement('PAY_CON'); 
	var PAY_SEQ 	= xmlDoc.createElement('PAY_SEQ'); 
	var PAY_TYPE 	= xmlDoc.createElement('PAY_TYPE'); 
	var PAY_CON_NM 	= xmlDoc.createElement('PAY_CON_NM'); 
	var PAY_SEQ_NM 	= xmlDoc.createElement('PAY_SEQ_NM'); 
	var PAY_TYPE_NM = xmlDoc.createElement('PAY_TYPE_NM'); 
	var REMARK 		= xmlDoc.createElement('REMARK'); 
	var USE_YN_NM 	= xmlDoc.createElement('USE_YN_NM'); 
	var USE_YN 		= xmlDoc.createElement('USE_YN'); 
	var VEN_CODE 	= xmlDoc.createElement('VEN_CODE'); 
	var PAY_SEQ_SUM 	= xmlDoc.createElement('PAY_SEQ_SUM');
	
	
	PAY_CON.appendChild(  	xmlDoc.createTextNode( 	$('#PAY_CON').val() 					)	);
	PAY_SEQ.appendChild(  	xmlDoc.createTextNode(	$('#PAY_SEQ').val()						)	);
	PAY_TYPE.appendChild( 	xmlDoc.createTextNode(	$('#PAY_TYPE').val()					)	);
	PAY_CON_NM.appendChild( xmlDoc.createTextNode(	$("#PAY_CON option:selected").text()	) 	);
	PAY_SEQ_NM.appendChild( xmlDoc.createTextNode(	$("#PAY_SEQ option:selected").text()	) 	);
	PAY_TYPE_NM.appendChild(xmlDoc.createTextNode(	$("#PAY_TYPE option:selected").text()	) 	);
	REMARK.appendChild( 	xmlDoc.createTextNode(	$('#REMARK').val()						)	);
	USE_YN_NM.appendChild(	xmlDoc.createTextNode(	$("#USE_YN option:selected").text() 	)	);
	USE_YN.appendChild(		xmlDoc.createTextNode(	$('#USE_YN').val()						)	);
	VEN_CODE.appendChild(	xmlDoc.createTextNode(	$('#VEN_CODE').val()					)	);
	PAY_SEQ_SUM.appendChild(	xmlDoc.createTextNode(	PAY_SEQ_MGMT_ENTRY				)	);
	
	
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_CON);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_SEQ);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_TYPE);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_CON_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_SEQ_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_TYPE_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN_NM);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_SEQ_SUM);
	
	gridRoot2.addItemAt(  xmlDoc  , 0);
	girdMoveSelctedIndex(0 , gridRoot2.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기
	 
		 
}


//function getXMLTest()
//{ 
//	
//	var rowCnt  = gridRoot2.getCollection().getSource() ; 
//	var gridXmlData = "";
//	for(var i=0 ; i < rowCnt.length ; i++)
//	{     
//		gridXmlData = gridXmlData + getXmlString( gridRoot2.getItemAt(i) ); 
//	} 
//	 
//	
//	alert(    gridXmlData  );
//	  
//}

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

function itemDataChangeHandler5(event)
{
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot5.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값

	if( dataField == "POSITION_NM" )  
	{
		gridRoot5.setItemFieldAt( newValue , rowIndex, "POSITION"); 
	}
	
	if( dataField == "USE_YN_NM" )  
	{
		gridRoot5.setItemFieldAt( newValue , rowIndex, "USE_YN"); 
	}
	
	if( dataField == "EMP_NM" )  
	{
		gridRoot5.setItemFieldAt( newValue , rowIndex, "EMP_NO"); 
	}
	
	
	
}

function itemDataChangeHandler4(event)
{
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot4.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
 
	 
	// 적용일자와 종료일자의 크기 비교
	if( gridRoot4.getItemFieldAt( rowIndex , "STR_DT")  > gridRoot4.getItemFieldAt( rowIndex , "END_DT") )
	{
		if(gridRoot4.getItemFieldAt( rowIndex , "END_DT") != "")
		{ 
			alert("적용일자는 종료일자보다 이전 날짜여야 합니다.");
			gridRoot4.setItemFieldAt( "", rowIndex , "STR_DT");
			gridRoot4.setItemFieldAt( "", rowIndex , "END_DT");
			return;
		}
	}
	 

	if( dataField == "USE_YN_NM" )  
	{
		gridRoot4.setItemFieldAt( newValue , rowIndex, "USE_YN"); 
	}
	 
}



function chgPay( PAY_GB )
{ 
	
	if( PAY_GB == "PAY_CON")
	{
		
					if( $('#PAY_CON').val() == "" )
					{    
						$('#PAY_CON_MGMT_ENTRY_1').val( "" );   
						return;
					}
					
					var MGMT_ENTRY_VAL = "";
					jQuery.ajax({ 
					    url:"/getPayMgmtEntry.do",         
					    type:"POST",
						datatype:"json",
						async:false,
					 	data: {   "CD_CL"  : "PAY_CON"
					 	,         "CD_ID"  : $('#PAY_CON').val()
					    },
						success:function(data){ 
							MGMT_ENTRY_VAL  =  data[0].MGMT_ENTRY_1  ;
							$('#PAY_CON_MGMT_ENTRY_1').val(   data[0].MGMT_ENTRY_1   ); 
					    },
					    complete : function(data) { 
					    },
					    error : function(xhr, status, error) {
					    	CommonJs.alertErrorStatus(xhr.status, error);
					    }
					});
				
					 
					var postValue ={};	
					postValue = { 
							  "MGMT_ENTRY"	: MGMT_ENTRY_VAL  
					}; 
					jQuery.ajax({
					    type:"POST",
					    url:"/getPaySeqCodeSelectBoxList.do",    // getCateCodeSelectBoxList
					    dataType:"JSON",  
					    data:postValue,
					    async:false,
					    success : function(data) {
					    	$("select[name=PAY_SEQ   ] option").remove();
					    	$("#PAY_SEQ" ).append('<option value="">선택</option>'); 
							for(var i = 0; i < data.length; i++){
								 $("#PAY_SEQ"  ).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
						   	}
					    },
					    complete : function(data) {
					    },
					    error : function(xhr, status, error) {
					    	CommonJs.alertErrorStatus(xhr.status, error);
					    }
					});
	}
	
	if( PAY_GB == "PAY_SEQ")
	{  
					if( $('#PAY_SEQ').val() == "" )
					{   
						$('#PAY_SEQ_MGMT_ENTRY_1').val( "" ); 
						$('#PAY_SEQ_MGMT_ENTRY_2').val( "" );  
						$('#PAY_SEQ_MGMT_ENTRY').val(   "" );
						return;
					} 
					jQuery.ajax({ 
					    url:"/getPayMgmtEntry.do",         
					    type:"POST",
						datatype:"json",
						async:false,
					 	data: {   "CD_CL"  : "PAY_SEQ"
					 	,         "CD_ID"  : $('#PAY_SEQ').val()
					    },
						success:function(data){
						    
							$('#PAY_SEQ_MGMT_ENTRY_1').val(   data[0].MGMT_ENTRY_1   );
							$('#PAY_SEQ_MGMT_ENTRY_2').val(   data[0].MGMT_ENTRY_2   );
							
							var MGMT_ENTRY_1 = data[0].MGMT_ENTRY_1;
							var MGMT_ENTRY_2 = data[0].MGMT_ENTRY_2; 
							if(  parseInt(MGMT_ENTRY_1)  >  parseInt(MGMT_ENTRY_2)    )
							{  
								MGMT_ENTRY  =   parseInt(31) - parseInt(MGMT_ENTRY_1)   + parseInt(MGMT_ENTRY_2)  ;
							} else {
							 
								MGMT_ENTRY  =    parseInt(MGMT_ENTRY_2) -  parseInt(MGMT_ENTRY_1);
								if ( MGMT_ENTRY == 14)
								{    MGMT_ENTRY = 15;    }
							}  
							$('#PAY_SEQ_MGMT_ENTRY').val(   MGMT_ENTRY    );
							 
					    },
					    complete : function(data) {
					    	 
					    },
					    error : function(xhr, status, error) {
					    	CommonJs.alertErrorStatus(xhr.status, error);
					    }
					});
		
		
	}
	
	
}


function chgPay_BAKUP( PAY_GB )
{
//	PAY_CON : 지불주기  : PAY_CON_MGMT_ENTRY_1 
//	PAY_SEQ : 지불차수  : PAY_SEQ_MGMT_ENTRY_1  , PAY_SEQ_MGMT_ENTRY_2
	
	if( PAY_GB == "PAY_CON")
	{
		
		if( $('#PAY_CON').val() == "" )
		{    
			$('#PAY_CON_MGMT_ENTRY_1').val( "" );   
			return;
		}
		
		jQuery.ajax({ 
		    url:"/getPayMgmtEntry.do",         
		    type:"POST",
			datatype:"json",
			async:false,
		 	data: {   "CD_CL"  : "PAY_CON"
		 	,         "CD_ID"  : $('#PAY_CON').val()
		    },
			success:function(data){
			   
				$('#PAY_CON_MGMT_ENTRY_1').val(   data[0].MGMT_ENTRY_1   );
				 
		    },
		    complete : function(data) {
		    	 
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
		 
	}
	
	if( PAY_GB == "PAY_SEQ")
	{ 
		
		if( $('#PAY_SEQ').val() == "" )
		{   
			$('#PAY_SEQ_MGMT_ENTRY_1').val( "" ); 
			$('#PAY_SEQ_MGMT_ENTRY_2').val( "" );  
			$('#PAY_SEQ_MGMT_ENTRY').val(   "" );
			return;
		}
		
		
		jQuery.ajax({ 
		    url:"/getPayMgmtEntry.do",         
		    type:"POST",
			datatype:"json",
			async:false,
		 	data: {   "CD_CL"  : "PAY_SEQ"
		 	,         "CD_ID"  : $('#PAY_SEQ').val()
		    },
			success:function(data){
			    
				$('#PAY_SEQ_MGMT_ENTRY_1').val(   data[0].MGMT_ENTRY_1   );
				$('#PAY_SEQ_MGMT_ENTRY_2').val(   data[0].MGMT_ENTRY_2   );
				
				var MGMT_ENTRY_1 = data[0].MGMT_ENTRY_1;
				var MGMT_ENTRY_2 = data[0].MGMT_ENTRY_2; 
				if(  parseInt(MGMT_ENTRY_1)  >  parseInt(MGMT_ENTRY_2)    )
				{  
					MGMT_ENTRY  =   parseInt(31) - parseInt(MGMT_ENTRY_1)   + parseInt(MGMT_ENTRY_2)  ;
				} else {
				 
					MGMT_ENTRY  =    parseInt(MGMT_ENTRY_2) -  parseInt(MGMT_ENTRY_1);
					if ( MGMT_ENTRY == 14)
					{    MGMT_ENTRY = 15;    }
				}  
				$('#PAY_SEQ_MGMT_ENTRY').val(   MGMT_ENTRY    );
				
				
		    },
		    complete : function(data) {
		    	 
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
		
		 
	}
	
	
}





function itemDataChangeHandler3(event)
{
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot3.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	  
	if( typeof oldValue == 'undefined' && newValue == "" ) {  return;	 }  // 최초 "선택" 선택시 값 없어지는것 대비
	
	 
	if( dataField == "MIN_STD_AMT" ) 
	{  
//		var rowCnt3 = gridRoot3.getCollection().getSource() ; 
		 
		if( rowIndex != 0 )
		{ 
			if(   parseInt(newValue) >= parseInt(  gridRoot3.getItemFieldAt( rowIndex , "MAX_STD_AMT")   )  )
			{  
				alert("최소기준금액은 최대기준금액 보다 크거나 같을 수 없습니다.");
				gridRoot3.setItemFieldAt(oldValue  , rowIndex , "MIN_STD_AMT"  ); 
				return; 
			}  
			
			
			var showGugan = "";
			showGugan = rowIndex + 1 ;
			if(   parseInt(newValue) != parseInt(  gridRoot3.getItemFieldAt( rowIndex -1 , "MAX_STD_AMT")   )  )
			{
				alert("입력하신 최소기준금액은 [ "+showGugan+"  구간 ]의  최대기준금액 + 1 이어야  합니다.");
				gridRoot3.setItemFieldAt(oldValue  , rowIndex , "MIN_STD_AMT"  ); 
				return;
				
			}	
		}
		
		 
		for(var i=0 ; i < rowIndex ; i++)
		{
			    var j = i+1;
				if (    !
						(parseInt(newValue) >  parseInt(  gridRoot3.getItemFieldAt( i , "MIN_STD_AMT")   ) 
						 &&
						 parseInt(  gridRoot3.getItemFieldAt( i , "MAX_STD_AMT")   )   <   parseInt(newValue)
						)
				)
				{
					alert("입력하신 최소기준금액은 [ "+j+"  구간 ]의 최대기준금액보다 커야 합니다.");
					gridRoot3.setItemFieldAt(oldValue  , rowIndex , "MIN_STD_AMT"  ); 
					return;
				}   
		}
		  
	}
	
	
	
	if( dataField == "MAX_STD_AMT" ) 
	{ 
		if(   parseInt(newValue) <= parseInt(gridRoot3.getItemFieldAt( rowIndex , "MIN_STD_AMT"))    )
		{
			alert("최대기준금액은 최소기준금액 보다 작거나  같을 수 없습니다.");
			gridRoot3.setItemFieldAt(oldValue  , rowIndex , "MAX_STD_AMT"  ); 
			return; 
		}  
		
		var rowCnt3 = gridRoot3.getCollection().getSource() ;   
		if( (rowIndex+1) !=  rowCnt3.length  )  // 맨 마지막 ROW 가 아닐경우에만 수행
		{ 
			//  최대기준금액 수정시 다음 구간의 최소기준금액에  (최대기준금액 +1)을 넣어준다.
		    gridRoot3.setItemFieldAt( parseInt(newValue) +  parseInt( 1 )   , rowIndex+1 , "MIN_STD_AMT"  ); 
				
		}
		
	}
	
	if( dataField == "USE_YN_NM" )  
	{
		gridRoot3.setItemFieldAt( newValue , rowIndex, "USE_YN"); 
	}
	
	if( dataField == "APPL_MON_NM" )  
	{
		gridRoot3.setItemFieldAt( newValue , rowIndex, "APPL_MON"); 
	}
	
	if( dataField == "APPL_TGT_NM" )  
	{
		gridRoot3.setItemFieldAt( newValue , rowIndex, "APPL_TGT"); 
	}
	
	
	
//	if( dataField == "PUR_SECTION_NM" )    // 매입구간 변경시 매입구간코드도 같이 변경  
//	{    
//		// 매입구간는 중복이 되면 안되므로 중복 체크  
//		var rowCnt3 = gridRoot3.getCollection().getSource() ; 
//		for(var i=0 ; i < rowCnt3.length ; i++)
//		{    
//			if( gridRoot3.getItemFieldAt( i , "PUR_SECTION")  == newValue   ) 
//			{    
//				gridRoot3.setItemFieldAt(oldValue  , rowIndex , "PUR_SECTION_NM"  );
//				
//				alert("[장려율] 선택하신 매입구간는 이미 등록 되었습니다.");
//				
//				return;
//			}
//		} 
//		gridRoot3.setItemFieldAt( newValue , rowIndex, "PUR_SECTION");
//		
// 
//		// 매입구간 변경시 , 최소기준금액과 최대 기준금액을  세팅해준다. 이 두 금액은 보여주기만 하는것임. 
//		if( newValue != "" )
//		{ 	
//			jQuery.ajax({ 
//			    url:"/purSectionStdPrice.do",         
//			    type:"POST",
//				datatype:"json",
//				async:false,
//				data: {  CD_ID  :   newValue , CD_CL : 'PUR_SECTION' }, 
//				success:function(data){   
//					var obj = jQuery.parseJSON( data.RETURN_CUR );  
//					gridRoot3.setItemFieldAt( obj.STD_PRICE_MIN , rowIndex, "STD_PRICE_MIN");
//					gridRoot3.setItemFieldAt( obj.STD_PRICE_MAX , rowIndex, "STD_PRICE_MAX"); 
//			    },
//			    complete : function(data) {
//			    },
//			    error : function(xhr, status, error) { 
//			    }
//			});
//		} else {
//			gridRoot3.setItemFieldAt( "" , rowIndex, "STD_PRICE_MIN");
//			gridRoot3.setItemFieldAt( "" , rowIndex, "STD_PRICE_MAX"); 
//		}
//		 
//	}
	
	
	

}



function itemDataChangeHandler2(event) {
 
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot2.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
 
	   
 
	if( typeof oldValue == "undefined")
	{
		return;
	}
		 
	if( dataField == "PAY_CON_NM" )    // 지불주기명 변경시 지불주기코드도 같이 변경  
	{
		// 지불주기는 중복이 되면 안되므로 중복 체크  
		var rowCnt2 = gridRoot2.getCollection().getSource() ; 
		for(var i=0 ; i < rowCnt2.length ; i++)
		{   if( gridRoot2.getItemFieldAt( i , "PAY_CON")  == newValue   ) 
			{ 
				gridRoot2.setItemFieldAt(oldValue  , rowIndex , "PAY_CON_NM"  );
				alert("[지불조건] 선택하신 지불주기는 이미 등록 되었습니다.");
				return;
			}
		} 
		gridRoot2.setItemFieldAt( newValue , rowIndex, "PAY_CON");
		
	} else  if( dataField == "PAY_SEQ_NM" ) {   // 지불차수명 변경시 지불차수코드도 같이 변경  
		gridRoot2.setItemFieldAt( newValue , rowIndex, "PAY_SEQ");		
	
	}  if( dataField == "PAY_TYPE_NM" ) { // 지불조건명 변경시 지불조건코드도 같이 변경  
	
		gridRoot2.setItemFieldAt( newValue , rowIndex, "PAY_TYPE");
	
	}
	  
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


//사업자번호  중복검사
function productCustomerBusiNoDup()
{ 
	
	if( $.trim(  $('#BUSI_NO').val()  )  == "" )
	{   alert('사업자번호를 입력하세요.');
		$('#BUSI_NO').focus();
		return;
	}
	 
	if( ! checkBizID(  $.trim(    $("#BUSI_NO").val().replace(/-/g, '')   ) )    )
	{    
		alert('유효하지 않은 사업자번호 입니다.');     
		return;   
	} 
	
	
	
	BUSI_NO_DUP_BIT  = "Y";
	jQuery.ajax({ 
	    url:"/productCustomerBusiNoDup.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {  "BUSI_NO"  :   $.trim(  $('#BUSI_NO').val().replace(/-/gi,'')  )   }, 
		success:function(data){   
			var obj = jQuery.parseJSON( data.RETURN_CUR ); 
			if( obj.RETURN_CODE == "0000" )
			{
				alert("사용가능한 사업자번호 입니다.");
				
				// 담당자의  row 가 있는경우 user_id 와 암호를 현재 ㅎ벼력업체 코드로 변경해준다... 신규이니까 변경해도 문제가 없다.
				// 뒷자리 두개제외하고 VEN_CODE로 교체한다.
//				var collection = gridRoot5.getCollection(); 
//				var rowCount = collection.getSource(); 
//				for(var i=0 ; i < rowCount.length ; i++)
//				{    
//					var subCode =     gridRoot5.getItemFieldAt( i , "USER_ID")   ;
//					subCode =  subCode.substr( subCode.length - 2 , subCode.length)   ; 
//					gridRoot5.setItemFieldAt( $('#VEN_CODE').val() + subCode   , i , "USER_ID"  ); 
//					gridRoot5.setItemFieldAt( $('#VEN_CODE').val() + subCode   , i , "PASSWD"   ); 
//				}  
				
				
			} else {

				 
				if (confirm("이미 등록된 사업자 번호 입니다. 사용 하시겠습니까?") == true){    
					 
				}else{    
					$('#BUSI_NO').val("");
					BUSI_NO_DUP_BIT = "";
				} 
				
				
			}  
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	           
	    }
	});

}

//협력업체 코드 중복검사
function productCustomerVenCodeDup()
{
	
	if( $.trim(  $('#VEN_CODE').val()  )  == "" )
	{
		alert('협력업체 코드를 입력하세요.');
		$('#VEN_CODE').focus();
		return;
	}
	
	
	VEN_CODE_DUP_BIT = "Y"; 
	jQuery.ajax({ 
	    url:"/productCustomerVenCodeDup.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {  VEN_CODE  :   $.trim(  $('#VEN_CODE').val()  )   }, 
		success:function(data){   
			var obj = jQuery.parseJSON( data.RETURN_CUR ); 
			if( obj.RETURN_CODE == "0000" )
			{
				alert("사용가능한 협력업체 코드입니다.");
				
				// 담당자의  row 가 있는경우 user_id 와 암호를 현재 ㅎ벼력업체 코드로 변경해준다... 신규이니까 변경해도 문제가 없다.
				// 뒷자리 두개제외하고 VEN_CODE로 교체한다.
				var collection = gridRoot5.getCollection(); 
				var rowCount = collection.getSource(); 
				for(var i=0 ; i < rowCount.length ; i++)
				{    
					var subCode =     gridRoot5.getItemFieldAt( i , "USER_ID")   ;
					subCode =  subCode.substr( subCode.length - 2 , subCode.length)   ; 
					gridRoot5.setItemFieldAt( $('#VEN_CODE').val() + subCode   , i , "USER_ID"  ); 
					gridRoot5.setItemFieldAt( $('#VEN_CODE').val() + subCode   , i , "PASSWD"   ); 
				}  
				
				
			} else {
				$('#VEN_CODE').val("");
				alert("이미 등록된  협력업체 코드입니다."); 
			}  
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	           
	    }
	});
  
}


// 협력업체 정보 보기
function productCustomerInfoSelect(  CORP_CODE  , VEN_CODE  )
{
	//수정모드 세팅
	crudBit = "U";
	
	// 항목중 수정금지 항목 설정하기 
	$("input[name=VEN_CODE]").attr("readonly",true);
	 
	// 수정모드이므로 일때 거래종료일 입력 하게 한다.      
	$( "#OUT_DT" ).datepicker( "option", "disabled", false );
	$("input[name=OUT_DT]").attr("readonly",false);
	
	//협력업체코드 중복 비활성화
	$('#btnDup').hide();
	
	
	// 초기화 시작
	$("form").each(function() {  
        if(this.id == "frmBody") this.reset();  
    });  

	
	// 회원구분 못바꾸게 한다.    
	$("#BUSI_FLAG").attr("disabled", "disabled");
	
 
	
	// 협력업체 코드입력란  활성화
//	$("input[name=VEN_CODE]").attr("readonly",false);
	 
	//협력업체코드 중복버튼  활성화 
//	$('#btnDup').show();
	
	// 등록일 등록자 / 수정일 수정자 초기화
//	$('#UEMP_NO').text("");
	$('#UDATE').val( ""  );
//	$('#IEMP_NO').text("");
	$('#IDATE').val( ""  );
	
	//	수수료율  : 0 으로 세팅
	$( "#SALE_RATE" ).val('0');		
	//	여신한도 : 0 으로 세팅
	$( "#CREDIT_LIMIT" ).val('0');	
	  
	// 신규일때 거래종료일 입력 못 받게 한다.     
//	$( "#OUT_DT" ).datepicker( "option", "disabled", true );
//	$("input[name=OUT_DT]").attr("readonly",false);
	  

	$("select[name=GRE_GB   ] option").remove();
	getCommonCodeSelectBoxList("GRE_GB",     "GRE_GB");  
	
	// 협력업체 상세 보여주기
	jQuery.ajax({ 
	    url:"/productCustomerInfoSelect.do",         
	    type:"POST",
		datatype:"json",
		async:false,
	 	data: {   "VEN_CODE"  : VEN_CODE  },
		success:function(data){
		 
			// 협력업체 상세정보	
			$('#CORP_CODE').val(data[0].CORP_CODE);
			$('#VEN_CODE').val(data[0].VEN_CODE);
			$('#VEN_NAME').val(data[0].VEN_NAME);
			$('#REP_NAME').val(data[0].REP_NAME);
			$('#POST_NO').val(data[0].POST_NO);
			$('#ADDR').val(data[0].ADDR);
			$('#ADDR_DTL').val(data[0].ADDR_DTL);
			$('#UPJONG').val(data[0].UPJONG);
			$('#UPTAE').val(data[0].UPTAE);
			$('#SLIP_DIV_YN').val(data[0].SLIP_DIV_YN);
			var BUSI_NO = data[0].BUSI_NO;   
			$('#BUSI_NO').val(BUSI_NO.substr(0,3) + "-" + BUSI_NO.substr(3,2) + "-" + BUSI_NO.substr(5,5) );
			
			 
			var TEL_NO = data[0].TEL_NO ; 
			if(  $.trim(  TEL_NO ) == "")
			{ 
				$('#TEL_NO1').val( "" );
				$('#TEL_NO2').val( "" );
				$('#TEL_NO3').val( "" );
			} else {
				var TEL_NO_ARRAY = TEL_NO.split("-");
				$('#TEL_NO1').val( TEL_NO_ARRAY[0] );
				$('#TEL_NO2').val( TEL_NO_ARRAY[1] );
				$('#TEL_NO3').val( TEL_NO_ARRAY[2] );
				 
			}
			 
			var FAX_NO = data[0].FAX_NO ; 
			if(  $.trim(  FAX_NO ) == "")
			{ 
				$('#FAX_NO1').val( "" );
				$('#FAX_NO2').val( "" );
				$('#FAX_NO3').val( "" );
			} else {
				var FAX_NO_ARRAY = FAX_NO.split("-"); 
				$('#FAX_NO1').val( FAX_NO_ARRAY[0] );
				$('#FAX_NO2').val( FAX_NO_ARRAY[1] );
				$('#FAX_NO3').val( FAX_NO_ARRAY[2] ); 
			}
			
			
			$('#REP_MAIL_ID').val(data[0].REP_MAIL_ID);
//			$('#PAY_CON').val(data[0].PAY_CON);
//			$('#PAY_SEQ').val(data[0].PAY_SEQ);
//			$('#PAY_TYPE').val(data[0].PAY_TYPE);
			$('#BANK_CODE').val(data[0].BANK_CODE);
			$('#BANK_ACC_NO').val(data[0].BANK_ACC_NO);
			$('#BANK_ACOWN').val(data[0].BANK_ACOWN);
			
			var ENTR_DT = data[0].ENTR_DT;  
			$('#ENTR_DT').val( ENTR_DT.substr(0,4) + "-" + ENTR_DT.substr(4,2) + "-" + ENTR_DT.substr(6,2) );
			
			var OUT_DT = data[0].OUT_DT;    
			if(OUT_DT == "" || typeof OUT_DT == "undefined")
			{
				$('#OUT_DT').val( "" );
			} else {
				$('#OUT_DT').val( OUT_DT.substr(0,4) + "-" + OUT_DT.substr(4,2) + "-" + OUT_DT.substr(6,2)  );
			}
			 
			$('#BUSI_FLAG').val(	data[0].BUSI_FLAG		);
			$('#REP_VEN_CODE').val(	data[0].REP_VEN_CODE	);
			
			    
			$('#GRE_GB').val(		data[0].GRE_GB			); 
			if( data[0].ITM_COUNT != "0" )  // 해당 거래처에 상품이 존재할때는 거래구분을 못바꾸에 한다
			{
				// 거래구분 못바꾸게한다 
				$("#GRE_GB    option[value!='"+data[0].GRE_GB+"']").remove(); 
					
			}
			
			
			$('#SALE_RATE').val(	data[0].SALE_RATE		);
			$('#JANG_YN').val(		data[0].JANG_YN			);
			$('#PUR_RATE').val(		data[0].PUR_RATE		);
			$('#TAX_TYPE').val(		data[0].TAX_TYPE		);
			$('#ORDER_TYPE').val(	data[0].ORDER_TYPE		);
			
			// 발주가능요일 선택 : 일월화수목금토 
			var ORD_TERM = data[0].ORD_TERM; 
			var i = 0;
			$('input:checkbox[name="ORD_TERM_CHK"]').each(function() {  
				if( ORD_TERM.charAt(i) == "1" )
				{
					this.checked = true;  //checked 처리
				} else {
					this.checked = false; //checked 처리					
				} 
			    i++; 
			});	
			 
			$('#CREDIT_LIMIT').val(data[0].CREDIT_LIMIT);
			$('#SCM_PUR_OPN').val(data[0].SCM_PUR_OPN);
			$('#ACCT_DEPT').val(data[0].ACCT_DEPT);
			$('#CFM_YN').val(data[0].CFM_YN);
			$('#USE_YN').val(data[0].USE_YN);
			
			var REMARK_VAL = "";
			if(  typeof data[0].REMARK == "undefined"   ||   data[0].REMARK == "undefined" )
			{
				REMARK_VAL = " ";
			} else {
				REMARK_VAL =data[0].REMARK  ;
			} 
			$('#REMARK').val( REMARK_VAL );
			
//			$('#IEMP_NO').text("("+data[0].IEMP_NO+")");
			$('#IDATE').val( data[0].IDATE );
			
			var UEMP_NO = data[0].UEMP_NO;
			if(UEMP_NO == "" || typeof UEMP_NO == "undefined")
			{ 
//				$('#UEMP_NO').text("");
				$('#UDATE').val( ""  );
			} else { 
//				$('#UEMP_NO').text("("+data[0].UEMP_NO+")");
				$('#UDATE').val( data[0].UDATE  );
			}
			 
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	  
	// 거래구분이 임대을일때만 수수료율 입력 받는다. 
	if( $('#GRE_GB').val() == "2" )
	{   $("input[name=SALE_RATE]").attr("readonly",false); 
	} else { 
		$('#SALE_RATE').val("0");
		$("input[name=SALE_RATE]").attr("readonly",true);
	}
	
	
	// 지불조건 리스트 보여주기 - grid2
//	grid2.setData([]);
	jQuery.ajax({ 
	    url:"/productCustomerPyPayNumList.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
	 	data: {  "CORP_CODE" : CORP_CODE   
	 		  ,  "VEN_CODE"  : VEN_CODE
	 	},
		success:function(data){  
			// gridApp2.setData( data );  
			
			//그리드2 초기화 
			gridRoot2.removeAll( );
  
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
				var PAY_CON_NM 		= xmlDoc.createElement('PAY_CON_NM'); 
				var PAY_SEQ_NM 		= xmlDoc.createElement('PAY_SEQ_NM'); 
				var PAY_TYPE_NM 	= xmlDoc.createElement('PAY_TYPE_NM'); 
				var PAY_CON 		= xmlDoc.createElement('PAY_CON'); 
				var PAY_SEQ 		= xmlDoc.createElement('PAY_SEQ'); 
				var PAY_TYPE 		= xmlDoc.createElement('PAY_TYPE'); 
				var USE_YN_NM 		= xmlDoc.createElement('USE_YN_NM'); 
				var USE_YN 			= xmlDoc.createElement('USE_YN'); 
				var REMARK 			= xmlDoc.createElement('REMARK');  
				var VEN_CODE 		= xmlDoc.createElement('VEN_CODE');  
				 
				PAY_CON_NM.appendChild(  	xmlDoc.createTextNode( 	data[i].PAY_CON_NM  )	);
				PAY_SEQ_NM.appendChild(  	xmlDoc.createTextNode(	data[i].PAY_SEQ_NM 	)	);
				PAY_TYPE_NM.appendChild( 	xmlDoc.createTextNode(	data[i].PAY_TYPE_NM )	);
				PAY_CON.appendChild( 		xmlDoc.createTextNode(	data[i].PAY_CON		) 	);
				PAY_SEQ.appendChild( 		xmlDoc.createTextNode(	data[i].PAY_SEQ		) 	);
				PAY_TYPE.appendChild(		xmlDoc.createTextNode(	data[i].PAY_TYPE	) 	);
				USE_YN_NM.appendChild( 		xmlDoc.createTextNode(	data[i].USE_YN_NM   )	); 
				USE_YN.appendChild(			xmlDoc.createTextNode(	data[i].USE_YN	    )	);
				
				var REMARK_VAL = "";
				if(  typeof data[0].REMARK == "undefined"   ||   data[0].REMARK == "undefined" )
				{
					REMARK_VAL = " ";
				} else {
					REMARK_VAL =data[0].REMARK  ;
				} 
				REMARK.appendChild(			xmlDoc.createTextNode(	REMARK_VAL  )	);
				VEN_CODE.appendChild(	    xmlDoc.createTextNode(	 VEN_CODE	    )	);
				  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_CON_NM);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_SEQ_NM);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_TYPE_NM);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_CON);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_SEQ);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_TYPE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN_NM);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);   
				
				gridRoot2.addItemAt(  xmlDoc  , 0 , false );
  	
			}
			  
	    },
	    complete : function(data) {
	    	
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	// 장려율 리스트 보여주기 - grid3
	jQuery.ajax({ 
	    url:"/productCustomerPyPayRateList.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
	 	data: {  "CORP_CODE" : CORP_CODE   
	 		  ,  "VEN_CODE"  : VEN_CODE
	 	},
		success:function(data){  
//			gridApp3.setData( data );  
			
			//그리드3 초기화 
			gridRoot3.removeAll( );
  
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
				var PUR_SECTION_NM 	= xmlDoc.createElement('PUR_SECTION_NM'); 
				var PUR_SECTION 	= xmlDoc.createElement('PUR_SECTION'); 
				var MIN_STD_AMT 	= xmlDoc.createElement('MIN_STD_AMT'); 
				var MAX_STD_AMT 	= xmlDoc.createElement('MAX_STD_AMT'); 
				var PUR_RATE 		= xmlDoc.createElement('PUR_RATE'); 
				var SALE_RATE 		= xmlDoc.createElement('SALE_RATE'); 
				var PMOT_RATE 		= xmlDoc.createElement('PMOT_RATE'); 
				var LOGIS_RATE 		= xmlDoc.createElement('LOGIS_RATE'); 
				var USE_YN_NM 		= xmlDoc.createElement('USE_YN_NM'); 
				var USE_YN 			= xmlDoc.createElement('USE_YN'); 
				 
				var APPL_MON		= xmlDoc.createElement('APPL_MON'); 
				var APPL_TGT 		= xmlDoc.createElement('APPL_TGT'); 
				var APPL_MON_NM		= xmlDoc.createElement('APPL_MON_NM'); 
				var APPL_TGT_NM 	= xmlDoc.createElement('APPL_TGT_NM'); 
				 
				APPL_MON.appendChild( xmlDoc.createTextNode( 		data[i].APPL_MON  		)	);
				APPL_TGT.appendChild( xmlDoc.createTextNode( 		data[i].APPL_TGT  		)	);
				APPL_MON_NM.appendChild( xmlDoc.createTextNode( 	data[i].APPL_MON_NM  	)	);
				APPL_TGT_NM.appendChild( xmlDoc.createTextNode( 	data[i].APPL_TGT_NM  	)	); 
				PUR_SECTION_NM.appendChild( xmlDoc.createTextNode( 	data[i].PUR_SECTION_NM  )	);
				PUR_SECTION.appendChild(  	xmlDoc.createTextNode(	data[i].PUR_SECTION 	)	);
				MIN_STD_AMT.appendChild( 	xmlDoc.createTextNode(	data[i].MIN_STD_AMT 	)	);
				MAX_STD_AMT.appendChild( 	xmlDoc.createTextNode(	data[i].MAX_STD_AMT		) 	);
				PUR_RATE.appendChild( 		xmlDoc.createTextNode(	data[i].PUR_RATE		) 	);
				SALE_RATE.appendChild(		xmlDoc.createTextNode(	data[i].SALE_RATE		) 	);
				PMOT_RATE.appendChild(		xmlDoc.createTextNode(	data[i].PMOT_RATE	    )	);
				LOGIS_RATE.appendChild(		xmlDoc.createTextNode(	data[i].LOGIS_RATE	    )	);
				USE_YN_NM.appendChild( 		xmlDoc.createTextNode(	data[i].USE_YN_NM   	)	); 
				USE_YN.appendChild(			xmlDoc.createTextNode(	data[i].USE_YN	    	)	);
				 
				

				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APPL_MON);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APPL_TGT);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APPL_MON_NM);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APPL_TGT_NM);  
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SECTION_NM);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SECTION);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MIN_STD_AMT);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MAX_STD_AMT);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_RATE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SALE_RATE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PMOT_RATE); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOGIS_RATE); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN_NM);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);   
				   
				 
				
				gridRoot3.addItemAt(  xmlDoc  , -1 , false ); 
				
				
				
//				var value = {};
//			    value.rowIndex = i;         // 이동할 행의 index 입니다.
//			    value.columnIndex = 0;    // 이동할 열의 index 입니다.
//			    dataGrid1.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다. 
//				document.getElementById("grid3").focus();
				  
			}
			 
			
	    },
	    complete : function(data) {
//	    	 dataGrid3.setSelectedCells([{rowIndex:0,columnIndex:2}]);
	    		
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	 
	
	
	//장려제외  상품 리스트 보여주기 - grid4
	jQuery.ajax({ 
	    url:"/productCustomerPyExclItemList.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
	 	data: {  "CORP_CODE" : CORP_CODE   
	 		  ,  "VEN_CODE"  : VEN_CODE
	 	},
		success:function(data){  
//			gridApp4.setData( data );  
			
			//그리드4 초기화 
			gridRoot4.removeAll( );
  
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
				var LINK_CODE 	= xmlDoc.createElement('LINK_CODE'); 
				var LINK_NAME 	= xmlDoc.createElement('LINK_NAME'); 
				var STR_DT 		= xmlDoc.createElement('STR_DT'); 
				var END_DT 		= xmlDoc.createElement('END_DT'); 
				var USE_YN_NM 	= xmlDoc.createElement('USE_YN_NM'); 
				var USE_YN 		= xmlDoc.createElement('USE_YN'); 
				var REMARK 		= xmlDoc.createElement('REMARK');  
				 
				LINK_CODE.appendChild( 	xmlDoc.createTextNode( 	data[i].LINK_CODE  	)	);
				LINK_NAME.appendChild( 	xmlDoc.createTextNode( 	data[i].LINK_NAME  	)	);
				STR_DT.appendChild( 	xmlDoc.createTextNode( 	data[i].STR_DT  	)	);
				END_DT.appendChild( 	xmlDoc.createTextNode( 	data[i].END_DT  	)	);
				USE_YN_NM.appendChild( 	xmlDoc.createTextNode( 	data[i].USE_YN_NM  	)	);
				USE_YN.appendChild( 	xmlDoc.createTextNode( 	data[i].USE_YN  	)	);
				var REMARK_VAL = "";
				if(typeof data[i].REMARK  == "undefined")
				{   REMARK_VAL = "";  } 
				else 
				{   REMARK_VAL = data[i].REMARK;  }
				REMARK.appendChild( 	xmlDoc.createTextNode( 	REMARK_VAL	)	); 
				 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINK_CODE);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINK_NAME); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_DT); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(END_DT); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN_NM); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);  
				   
				gridRoot4.addItemAt(  xmlDoc  , 0  , false ); 
				
			}
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	
	//담당자  리스트 보여주기 - grid5    cd_supply_psn
	jQuery.ajax({ 
	    url:"/cdSupplyPsnList.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
	 	data: {  "CORP_CODE" : CORP_CODE   
	 		  ,  "VEN_CODE"  : VEN_CODE
	 	},
		success:function(data){  
//			gridApp5.setData( data );  
			
			//그리드5 초기화 
			gridRoot5.removeAll( );
  
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
				var USER_ID 	= xmlDoc.createElement('USER_ID'); 
				var PASSWD 		= xmlDoc.createElement('PASSWD');
				var USER_NM 	= xmlDoc.createElement('USER_NM');
				var VEN_DEPT 	= xmlDoc.createElement('VEN_DEPT');
				var POSITION_NM = xmlDoc.createElement('POSITION_NM');
				var POSITION 	= xmlDoc.createElement('POSITION');
				var TEL_NO 		= xmlDoc.createElement('TEL_NO');
				var MOBIL_NO 	= xmlDoc.createElement('MOBIL_NO');
				var MAIL_ID 	= xmlDoc.createElement('MAIL_ID');
				var EMP_NM 		= xmlDoc.createElement('EMP_NM');
				var EMP_NO 		= xmlDoc.createElement('EMP_NO');
				var USE_YN_NM 	= xmlDoc.createElement('USE_YN_NM');
				var USE_YN 		= xmlDoc.createElement('USE_YN');  
				 
				USER_ID.appendChild( 	xmlDoc.createTextNode( 	data[i].USER_ID  	)	); 
				PASSWD.appendChild( 	xmlDoc.createTextNode( 	data[i].PASSWD  	)	); 
				USER_NM.appendChild( 	xmlDoc.createTextNode( 	data[i].USER_NM  	)	); 
				VEN_DEPT.appendChild( 	xmlDoc.createTextNode( 	data[i].VEN_DEPT  	)	); 
				POSITION_NM.appendChild(xmlDoc.createTextNode( 	data[i].POSITION_NM )	); 
				POSITION.appendChild( 	xmlDoc.createTextNode( 	data[i].POSITION  	)	); 
				TEL_NO.appendChild( 	xmlDoc.createTextNode( 	data[i].TEL_NO  	)	); 
				MOBIL_NO.appendChild( 	xmlDoc.createTextNode( 	data[i].MOBIL_NO  	)	); 
				MAIL_ID.appendChild( 	xmlDoc.createTextNode( 	data[i].MAIL_ID  	)	); 
				EMP_NM.appendChild( 	xmlDoc.createTextNode( 	data[i].EMP_NM  	)	); 
				EMP_NO.appendChild( 	xmlDoc.createTextNode( 	data[i].EMP_NO  	)	); 
				USE_YN_NM.appendChild( 	xmlDoc.createTextNode( 	data[i].USE_YN_NM  	)	); 
				USE_YN.appendChild( 	xmlDoc.createTextNode( 	data[i].USE_YN  	)	); 
				 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USER_ID);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PASSWD);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USER_NM);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_DEPT);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POSITION_NM);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POSITION);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TEL_NO);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MOBIL_NO);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MAIL_ID);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EMP_NM);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EMP_NO);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN_NM);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);  
				   
				gridRoot5.addItemAt(  xmlDoc  , 0 , false ); 
				
			}
			 
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	 
	  
	
}
 
function btn_comm_user_search(rowIndex , type)
{
	if(type == "S")
	{
		$("#comm_pop_wrap1").dialog("open");
		gridApp10.resize();
		 
		$("#P_CALLBACK_NM1").val("fn_comm_user_callback_"+type+"(dataRow10)");
		 
		if($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != ""){
			$("#P_TEXT1").val($("#S_CUST_NAME").val());
			btn_comm_search('1');
		}
	}
	else if(type == "P")
	{
		$('#comm_pop_wrap4' ).dialog( 'open' );
		gridApp13.resize();
		
		$("#P_CALLBACK_NM4").val("fn_comm_user_callback_"+type+"("+rowIndex+" , dataRow13)");
		
		if($("#P_EMP_NAME").val() != null && $("#P_EMP_NAME").val() != ""){
			$("#P_TEXT4").val($("#P_EMP_NAME").val());
			btn_comm_search('4');
		}
	}
	else if(type == "B")
	{
		$('#comm_pop_wrap4' ).dialog( 'open' );
		gridApp13.resize();
		
		$("#P_CALLBACK_NM4").val("fn_comm_user_callback_"+type+"(dataRow13)");
		
		if($("#B_EMP_NAME").val() != null && $("#B_EMP_NAME").val() != ""){
			$("#P_TEXT4").val($("#B_EMP_NAME").val());
			btn_comm_search('4');
		}
	}
}

function fn_comm_user_callback_P(rowIndex , dataRow)
{ 	 

	 
	gridRoot5.setItemFieldAt( dataRow.USER_NM   , rowIndex , "EMP_NM"  ); 	
	gridRoot5.setItemFieldAt( dataRow.USER_ID   , rowIndex , "EMP_NO"  ); 
	
	
}




//입력 한 사업자번호 코드 변경 시, BUSI_NO_DUP_BIT를 초기화하여 다시한번 버튼을 눌러서 점검 할 수 있도록 한다.
function chgBusiNo()
{
	BUSI_NO_DUP_BIT = "";
}

// 입력 한 협력업체 코드 변경 시, VEN_CODE_DUP_BIT를 초기화하여 다시한번 버튼을 눌러서 점검 할 수 있도록 한다.
function chgVenCode()
{
	VEN_CODE_DUP_BIT = "";
}
  
// 상품검색 팝업
var itemEditRowIndex = "";
function itemPopup(editRowIndex)
{
	// 선택한 ROW 의 값을 기억하기  위해서 itemEditRowIndex에 로우 인덱스 저장. itemEditRowIndex는 콜백함수에서 사용한다.
	itemEditRowIndex = editRowIndex;
	
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();

	$("#P_CALLBACK_NM1").val('fn_comm_product_callback(dataRow11)');
	if($("#S_ITM_NAME").val() != null && $("#S_ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#S_ITM_NAME").val());
		btn_comm_search('2');
	}

}

//그리드내 (상품검색) 팝업 callback function  ITM_NAME, ITM_CODE, SCAN_CODE, ITM_SHORT_NAME
function fn_comm_product_callback(dataRow  ){
 
	 
	// 상품 코드 중복추가 금지
	var rowCnt4 = gridRoot4.getCollection().getSource() ; 
	for(var i=0 ; i < rowCnt4.length ; i++)
	{    
		if( gridRoot4.getItemFieldAt( i , "LINK_CODE")  == dataRow.ITM_CODE   ) 
		{    
			alert("선택하신 상품은 이미 등록 되었습니다.");
			return;
		}
	}  
  
	
	// 그리드 ROW에 상품코드 및 상품명 추가
	gridRoot4.setItemFieldAt( dataRow.ITM_CODE   , itemEditRowIndex , "LINK_CODE"  ); 	
	gridRoot4.setItemFieldAt( dataRow.ITM_NAME   , itemEditRowIndex , "LINK_NAME"  ); 
	
	 
	
}




//거래구분이 임대을 (2) 일경우 수수료율 을 입력할수있다 . 나머지일경우 0으로 세팅
function chgGreGb()
{   
	if( $('#GRE_GB').val() == "2" )
	{ 
		$("input[name=SALE_RATE]").attr("readonly",false); 
	} else {
		 
		$('#SALE_RATE').val("0");
		$("input[name=SALE_RATE]").attr("readonly",true);
	}
		
}
 

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	
	
	$("input[name=S_VEN]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_search();
        } 
	});
	
	
	// 사업자번호 키 입력시 하이픈 넣기
	$('#BUSI_NO').keyup(function(event) {  
		event = event || window.event;
		var _val = this.value.trim();
		this.value = autoHypenBizNo(_val) ;
		
	}); 
	
	
	$(".box_lft").width(260);
	$(".box_rgt").css("marginLeft","300px");  //275px
	$(window).on('resize',function (){		
		$(".box_lft").width(260);
		$(".box_rgt").css("marginLeft","300px");  //275px
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

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################