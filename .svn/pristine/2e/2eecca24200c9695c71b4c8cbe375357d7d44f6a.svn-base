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

var params = "?reportMode=HTML"; // AIViewer 파라미터


$(document).ready(function(){
	 
	
	//  상품구분(ITM_GB) 이 1 ( 생식) 제외하고 다 보여준다.  
	//	getCommonCodeSelectBoxList("ITM_GB"    ,   "ITM_GB"		);   
	//	$("#ITM_GB  option[value='1']").remove();  
	
//	// 배송구분에서 R3 는 뺀다.
//	getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	);  
//	$("#ROUTE_GB  option[value='R3']").remove(); 
	
//	getCommonCodeSelectBoxList("S_ROUTE_GB"  ,   "ROUTE_GB"	); 
	// 조회조건의 배송구분에서 R3 는 뺀다.
//	$("#S_ROUTE_GB  option[value='R3']").remove(); 
	 
	getCommonCodeSelectBoxList("PUR_GB"    ,   "PUR_GB"		);  
	getCommonCodeSelectBoxList("CFM_YN"    ,   "CFM_YN"		);      // 확정구분
	 
	
//	getStoreCode("STR_CODE");
	 
	init();
	  
	$('input:radio[name=INOUT_GB]:input[value=IN]').attr("checked", true);
	getStoreCode("STR_CODE");   // 전체 점포 보여주기
	
//	if(   $("#SESSION_ROLE_ID").val() == "ROLE009"  ||  $("#SESSION_ROLE_ID").val() == "ROLE010"    )  // 바이어(ROLE009)  ,  센터(ROLE010) 로그인시 다보여줌
//	{ 
//		//		// CD_STORE 에서 UPTAE_FLAG 가 3인것(물류) 만 가져오기
//		//		getStoreCodeFlag("STR_CODE","3");
//		
//		getStoreCode("STR_CODE");   // 전체 점포 보여주기
//		
//		
//		// 앞의 체크 박스 "대출(OUT) 으로 보여주기"  
//		$('input:radio[name=INOUT_GB]:input[value=OUT]').attr("checked", true);
// 
//	} else {   // 점포 로그인시 해당 점포만 보여줌, 조회조건의 점포코드도 마찬가지
//		getStoreCode("STR_CODE");
//		$("#STR_CODE  option[value!='"+$("#SESSION_STR_CODE").val()+"']").remove();  
//	
//		// 앞의 체크 박스 "대입(IN) 으로 보여주기"
//		$('input:radio[name=INOUT_GB]:input[value=IN]').attr("checked", true);
//		
//	}
	
	$('#TOT_WSPRC_TAX_FREE').number( true, 0 );  
	$('#TOT_WSPRC_TAX_ADD').number( true, 0 );  
	$('#TOT_WVAT').number( true, 0 );  
	$('#TOT_PRICE').number( true, 0 );  
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
rMateGridH5.create("grid1", "gridHolder1", jsVars+"&dataType=xml", "100%", "363px");   // 매입 상품 상세 리스트  그리드
rMateGridH5.create("grid2", "gridHolder2", jsVars, "100%", "213px");                   // 매입 헤더 리스트
rMateGridH5.create("grid3", "gridHolder3", jsVars+"&dataType=xml", "100%", "609px");   // 대출입 분기 전표

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
			 
			
			  var itemFocusOutHandler = function(event) {
				 
				   var editor = dataGrid1.itemEditorInstance;
	                setTimeout(function(){
	                    if(event.columnIndex == 7){
	                    
	                    	gridRoot1.setItemFieldAt( "여기에 코드값 넣어야함" , event.rowIndex,"CAR_CODE");            
	                    
	                    } 
	                }, 0.5);
	                
				  dataGrid1.setEnabled(false); 
				  dataGrid1.setEnabled(true);
			  }; 
				
			  
			//그리드1 핸들러
			var layoutCompleteHandler1 = function(event) {
				dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체 
  
				var CAR_CODE_NM = gridRoot1.getObjectById("CAR_CODE_NM");    
				CAR_CODE_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('CAR_CODE') );
   
				//  과세구분 콤보박스
				//	var COMBO_TAX_GB_NM = gridRoot1.getObjectById("TAX_GB_NM");    
				//	COMBO_TAX_GB_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('TAX_GB') );
   
				// 더블클릭
				dataGrid1.setDoubleClickEnabled(true);
				dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
				
			};  
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1); 
			
			// 그리드내 콤보박스 change 시 이벤트
			gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);
			 
			
			 var dataCompletedHandler = function(event) {
			        dataGrid = gridRoot1.getDataGrid();    // 그리드 객체
			        dataGrid.addEventListener("itemFocusOut", itemFocusOutHandler); // itemFocusOut 이벤트 적용
			        collection = gridRoot1.getCollection();
			    };
			 gridRoot1.addEventListener("dataComplete", dataCompletedHandler);
			    
			    
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
					var rows = dataGrid2.getSelectedIndices(); 
					for (var i = 0; i < rows.length; i++) {
						  
							$("#selectedPrintRow").val(   gridRoot2.getItemFieldAt( rows[i] , "SLIP_NO" )    +","+    $("#selectedPrintRow").val()    );
						  
					}
 
			};
			
			
			var itemClickHandler = function(event) {
				var rowIndex = event.rowIndex; 
				dataRow2 = gridRoot2.getItemAt(rowIndex);
				 
				 
				// 대출입 헤더 및 상품상세 보이기 
				inOutCenterCarHeadDtailInfo(   dataRow2["INOUT_GB"] 
									     	,  dataRow2["STR_CODE"] 
										 	,  dataRow2["SLIP_NO"]     );
				 
				 
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
			
		} else  if (id == "grid3") { 
			// rMateGrid 관련 객체
			gridApp3 	= document.getElementById(id);	// 그리드를 포함하는 div 객체
			gridRoot3 	= gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체
			gridApp3.setDataType("xml");
			gridApp3.setLayout(layoutStr3);		
			gridApp3.setData(gridData3);
			//로우 클릭 이벤트 제어
			var itemClickHandler = function(event) { 
			}; 
			var itemDoubleClickHandler3 = function(event) {
				var rowIndex = event.rowIndex;
				var columnIndex = event.columnIndex;
				var dataRow = gridRoo3.getItemAt(rowIndex);
				// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
				var column = dataGrid3.getDisplayableColumns()[columnIndex];
				var dataField = column.getDataField();
				  
					 
			};
			
			
			
			  
			var selectionChangeHandler = function(event) {
				var rowIndex = event.rowIndex;
				var columnIndex = event.columnIndex;
				var dataRow = gridRoot3.getItemAt(rowIndex);
				var column = dataGrid3.getDisplayableColumns()[columnIndex];
				var dataField = column.getDataField();

				// 전달된 레코드(XMLElement)에서 필드 뽑아내기
				var value = getNodeText(dataRow, dataField); 
			};
			 
			//그리드3 핸들러
			var layoutCompleteHandler3 = function(event) {
				dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체 
  
//				var CAR_CODE_NM = gridRoot3.getObjectById("CAR_CODE_NM");    
//				CAR_CODE_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('CAR_CODE') );
    
				// 더블클릭
				dataGrid3.setDoubleClickEnabled(true);
				dataGrid3.addEventListener("itemDoubleClick", itemDoubleClickHandler3);
				
			};  
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3); 
			 
//			var dataCompleteHandler3 = function(event) {
//				dataGrid = gridRoot3.getDataGrid();	// 그리드 객체
//				columns = dataGrid3.getColumns();
//				var acoll = gridRoot3.getCollection();
//
//				// 정렬할 컬럼 정보를 instance로 지정합니다.
//				var sortField = gridRoot3.newClassInstance("SortField");
//				// 정렬 함수를 instance로 지정합니다.
//				var sot = gridRoot3.newClassInstance("Sort");
//
//				// Seoul 에 대한 정렬을 처리 합니다.
//				sortField.name = "IPSU_QTY";
//				// 내림 차순 설정 올림은 false
//				sortField.descending = true;
//				sot.setFields([sortField]);
//				acoll.setSort(sot);
//				// collection 정보를 새로고침합니다.
//				acoll.refresh();
//			}
//			gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
			
			
			
		}
 
 
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1; 
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2;  
var gridApp3, gridRoot3, dataGrid3, dataRow3, clickData3, selectorColumn3; 

//----------------------- 그리드 설정 끝 -----------------------

//<DataGridColumn  id="LINK_CODE"		 dataField="LINK_CODE"     	headerText="바코드"		editable="true" 	    textAlign="center"	width="125"  editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem" />\
 
// 발주상품  그리드 - 그리드1 헤더 설정        itemRenderer="IconItem" icon="Magnifier"    selectionMode="multipleRows"    singleCell
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
	<DataGrid id="dg1"  sortableColumns="true" editable="true" doubleClickEnabled="true" selectionMode="singleCell"  horizontalScrollPolicy="auto" showDeletedRows="true"      >\
		<columns>\
			<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"  visible="false"  />\
			<DataGridColumn  id="CRUD"		 	 dataField="CRUD"     		editable="false"		visible="false"     />\
			<DataGridColumn  id="No"		 	 dataField="No"     		headerText="No" 	    editable="false"		itemRenderer="IndexNoItem"	visible="true"    textAlign="center"	width="33"  />\
			<DataGridColumn  id="SLIP_NO"		 dataField="SLIP_NO"    	headerText="매입번호"		editable="false"		visible="false" textAlign="center"	 width="125"    		/>\
			<DataGridColumn  id="STR_CODE"		 dataField="STR_CODE"     	headerText="STR_CODE"	editable="false" 		visible="false" />\
			<DataGridColumn  id="ITM_CODE"		 dataField="ITM_CODE"     	headerText="상품코드"		editable="false" 		visible="false" />\
	<DataGridColumn  id="CAR_CODE"		 	 dataField="CAR_CODE"              />\
	<DataGridColumn  id="CAR_CODE_NM"		 dataField="CAR_CODE_NM"     	headerText="차량선택"		editable="true"   itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	    textAlign="center"	 width="85"        />\
			<DataGridColumn  id="LINK_CODE"		 dataField="LINK_CODE"     	headerText="스캔코드"		editable="false" 	    textAlign="center"	 width="125"        />\
			<DataGridColumn  id="ITM_NAME"		 dataField="ITM_NAME"     	headerText="상품명"		editable="false" 		textAlign="left"	 width="145"   		/>\
			<DataGridColumn  id="DP_PRC_UNIT"	 dataField="DP_PRC_UNIT"    headerText="단위"    		editable="false"		textAlign="center"   width="65"      	/>\
			<DataGridColumn  id="UNIT"	 	 	 dataField="UNIT" 		    headerText="규격"    		editable="false"		textAlign="right"    width="75"   		/>\
			<DataGridColumn  id="IPSU_QTY"		 dataField="IPSU_QTY"    	headerText="입수"    		editable="false"		textAlign="right"    width="65"     formatter="{numfmt}"  	/>\
			<DataGridColumn  id="ORD_QTY"		 dataField="ORD_QTY"     	headerText="발주수량"		editable="false" 		textAlign="right"	 width="70"     formatter="{numfmt}"   	/>\
			<DataGridColumn  id="TAX_GB"		 dataField="TAX_GB"     	headerText="TAX_GB"		visible="false" />\
			<DataGridColumn  id="QTY"       	 dataField="QTY"       		headerText="대입수량"		editable="false"			textAlign="right"    width="98"     formatter="{numfmt}"		/>\
			<DataGridColumn  id="CFM_QTY"	 	 dataField="CFM_QTY"        headerText="대입확정수량"  	editable="false"		textAlign="right"	 width="98"     formatter="{numfmt}"  	/>\
			<DataGridColumn  id="TAX_GB_NM"		 dataField="TAX_GB_NM"    	headerText="과세구분"		editable="false"		textAlign="center"   width="70"       	/>\
			<DataGridColumn  id="WPRC"		 	 dataField="WPRC"       	headerText="대입원가단가"   editable="false"		textAlign="right"	 width="98"     formatter="{numfmt}" 	/>\
			<DataGridColumn  id="WVAT"   	 	 dataField="WVAT"    		headerText="대입원가부가세" editable="false"			textAlign="right"	 width="108"    formatter="{numfmt}" 	/>\
			<DataGridColumn  id="SPRC"   	     dataField="SPRC"    	    headerText="대입매가단가"   editable="false"		textAlign="right"	 width="98"     formatter="{numfmt}" 	/>\
			<DataGridColumn  id="BOT_SPRC"		 dataField="BOT_SPRC"    	headerText="공병단가"		editable="false"		textAlign="right"	 width="85"     formatter="{numfmt}" 	/>\
			<DataGridColumn  id="BOT_SPRC_TOT"	 dataField="BOT_SPRC_TOT"   headerText="공병금액"		editable="false"		textAlign="right"	 width="85"     formatter="{numfmt}" 	/>\
			<DataGridColumn  id="ORD_FLAG"		 dataField="ORD_FLAG"     	headerText="ORD_FLAG"	visible="false" />\
			<DataGridColumn  id="ORD_FLAG_NM"	 dataField="ORD_FLAG_NM"    headerText="매입형태"  	editable="false"		textAlign="center"	 width="70"      	/>\
			<DataGridColumn  id="ORD_SLIP_NO"    dataField="ORD_SLIP_NO"    headerText="발주번호"		editable="false" 		visible="false" />\
			<DataGridColumn  id="SEQ"		 	 dataField="SEQ"    		visible="false" />\
	</columns>\
	</DataGrid>\
</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
		<DataGrid id="dg1" sortableColumns="true"  dragSelectable="true"  editable="true" horizontalScrollPolicy="auto" showDeletedRows="true"     doubleClickEnabled="false" selectionMode="multipleRows" >\
			<columns>\
				<DataGridSelectorColumn id="selector2" width="40" textAlign="center"  headerText=""  backgroundColor="#EDEDF0" allowAllSelection="true" secondLabelJsFunction="secondLabelFunc" />\
				<DataGridColumn  id="No"		 	  dataField="No"     		    headerText="No" 	    visible="true"  		editable="false"		itemRenderer="IndexNoItem"	   textAlign="center"	width="33"  />\
				<DataGridColumn  id="DIN_OUT_DT"	  dataField="DIN_OUT_DT"        headerText="전표일자"  	visible="true"  		editable="false"	    textAlign="center"   width="88"  formatter="{datefmt}"        	/>\
				<DataGridColumn  id="SLIP_NO"	 	  dataField="SLIP_NO"    		headerText="전표번호"  	visible="true"  		editable="false"		textAlign="center"   width="117"      	/>\
				<DataGridColumn  id="VEN_CODE"	 	  dataField="VEN_CODE"    		headerText="매입처코드"    visible="true"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="VEN_NAME"	      dataField="VEN_NAME"    		headerText="매입처"       visible="true"          editable="false"		textAlign="left"   	 width="130"      	/>\
				<DataGridColumn  id="STR_CODE"	 	  dataField="STR_CODE"    				 				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="STR_NAME"	 	  dataField="STR_NAME"    		headerText="대출점"	    visible="true"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="DIN_STR_CODE"	  dataField="DIN_STR_CODE"    		 	                visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="DIN_STR_NAME"	  dataField="DIN_STR_NAME"   	headerText="대입점"	    visible="true"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ITM_GB"	 	  dataField="ITM_GB"    				  				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ITM_GB_NM"	      dataField="ITM_GB_NM"      	headerText="상품구분"  	visible="true"  		editable="false"		textAlign="center"   width="84"      	/>\
				<DataGridColumn  id="ROUTE_GB"	 	  dataField="ROUTE_GB"    				  				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ROUTE_GB_NM"	  dataField="ROUTE_GB_NM"    	headerText="배송구분"  	visible="true"  		editable="false"		textAlign="center"   width="84"      	/>\
				<DataGridColumn  id="CFM_DT"	  	  dataField="CFM_DT"    		headerText="대입확정일"  	visible="true"  		editable="false"	formatter="{datefmt}"	textAlign="center"   width="88"      	/>\
				<DataGridColumn  id="INOUT_GB"	  	  dataField="INOUT_GB"    	   	visible="false"  		            	/>\
	</columns>\
		</DataGrid>\
	</rMateGrid>';



var layoutStr3 =
	'<rMateGrid>\
		<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
		<DataGrid id="dg3"  sortableColumns="true" editable="true" doubleClickEnabled="true" selectionMode="singleCell"  horizontalScrollPolicy="auto" showDeletedRows="true"      >\
			<columns>\
				<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"  visible="false"  />\
				<DataGridColumn  id="CRUD"		 	 dataField="CRUD"     		editable="false"		visible="false"     />\
				<DataGridColumn  id="No"		 	 dataField="No"     		headerText="No" 	    editable="false"		itemRenderer="IndexNoItem"	visible="true"    textAlign="center"	width="33"  />\
				<DataGridColumn  id="SLIP_NO"		 dataField="SLIP_NO"    	headerText="매입번호"		editable="false"		visible="false" textAlign="center"	 width="125"    		/>\
				<DataGridColumn  id="STR_CODE"		 dataField="STR_CODE"     	headerText="STR_CODE"	editable="false" 		visible="false" />\
				<DataGridColumn  id="ITM_CODE"		 dataField="ITM_CODE"     	headerText="상품코드"		editable="false" 		visible="false" />\
				<DataGridColumn  id="CAR_CODE"		 dataField="CAR_CODE"     	headerText="차량"			editable="false"       textAlign="center"	 width="85"        />\
				<DataGridColumn  id="LINK_CODE"		 dataField="LINK_CODE"     	headerText="스캔코드"		editable="false" 	    textAlign="center"	 width="125"        />\
				<DataGridColumn  id="ITM_NAME"		 dataField="ITM_NAME"     	headerText="상품명"		editable="false" 		textAlign="left"	 width="145"   		/>\
				<DataGridColumn  id="DP_PRC_UNIT"	 dataField="DP_PRC_UNIT"    headerText="단위"    		editable="false"		textAlign="center"   width="65"      	/>\
				<DataGridColumn  id="UNIT"	 	 	 dataField="UNIT" 		    headerText="규격"    		editable="false"		textAlign="right"    width="75"   		/>\
				<DataGridColumn  id="IPSU_QTY"		 dataField="IPSU_QTY"    	headerText="입수"    		editable="false"		textAlign="right"    width="65"     formatter="{numfmt}"  	/>\
				<DataGridColumn  id="ORD_QTY"		 dataField="ORD_QTY"     	headerText="발주수량"		editable="false" 		textAlign="right"	 width="70"     formatter="{numfmt}"   	/>\
				<DataGridColumn  id="TAX_GB"		 dataField="TAX_GB"     	headerText="TAX_GB"		visible="false" />\
				<DataGridColumn  id="QTY"       	 dataField="QTY"       		headerText="대입수량"		editable="false"			textAlign="right"    width="98"     formatter="{numfmt}"		/>\
				<DataGridColumn  id="CFM_QTY"	 	 dataField="CFM_QTY"        headerText="대입확정수량"  	editable="false"		textAlign="right"	 width="98"     formatter="{numfmt}"  	/>\
				<DataGridColumn  id="TAX_GB_NM"		 dataField="TAX_GB_NM"    	headerText="과세구분"		editable="false"		textAlign="center"   width="70"       	/>\
				<DataGridColumn  id="WPRC"		 	 dataField="WPRC"       	headerText="대입원가단가"   editable="false"		textAlign="right"	 width="98"     formatter="{numfmt}" 	/>\
				<DataGridColumn  id="WVAT"   	 	 dataField="WVAT"    		headerText="대입원가부가세" editable="false"			textAlign="right"	 width="108"    formatter="{numfmt}" 	/>\
				<DataGridColumn  id="SPRC"   	     dataField="SPRC"    	    headerText="대입매가단가"   editable="false"		textAlign="right"	 width="98"     formatter="{numfmt}" 	/>\
				<DataGridColumn  id="BOT_SPRC"		 dataField="BOT_SPRC"    	headerText="공병단가"		editable="false"		textAlign="right"	 width="85"     formatter="{numfmt}" 	/>\
				<DataGridColumn  id="BOT_SPRC_TOT"	 dataField="BOT_SPRC_TOT"   headerText="공병금액"		editable="false"		textAlign="right"	 width="85"     formatter="{numfmt}" 	/>\
				<DataGridColumn  id="ORD_FLAG"		 dataField="ORD_FLAG"     	headerText="ORD_FLAG"	visible="false" />\
				<DataGridColumn  id="ORD_FLAG_NM"	 dataField="ORD_FLAG_NM"    headerText="매입형태"  	editable="false"		textAlign="center"	 width="70"      	/>\
				<DataGridColumn  id="ORD_SLIP_NO"    dataField="ORD_SLIP_NO"    headerText="발주번호"		editable="false" 		visible="false" />\
				<DataGridColumn  id="SEQ"		 	 dataField="SEQ"    		visible="false" />\
		</columns>\
		</DataGrid>\
	</rMateGrid>';

//그리드  데이터 초기화
var gridData1 = []; 
var gridData2 = []; 
var gridData3 = []; 


// ----------------------- 그리드 설정 끝 -------------------------------------

function secondLabelFunc(item, value, column) 
{ 
	
 
	 
	// 바이어(ROLE009)  ,  센터(ROLE010) 로그인시  R2/R3 는 체크 못하게 해야함 <- 저장, 확정, 등을 못하게 하기위해서 
	if(   $("#SESSION_ROLE_ID").val() == "ROLE009"  ||  $("#SESSION_ROLE_ID").val() == "ROLE010"   )
	{   
		if(  item.ROUTE_GB == "R2"  ||  item.ROUTE_GB == "R3" || item.CFM_DT != undefined   )
		{
			return false;
		} else {
			return true; 
		} 
	} else {
		
		if (item.CFM_DT != undefined   )
		{	 return false;  }
		else
		{	 return true;   }
		
	}
		 
}

	
function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

 

function init() {
  
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
		 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
				if(     $("#DIN_OUT_DT_FROM").val()  >  $("#DIN_OUT_DT_TO").val()     )
				{   alert("검색할 납품예정 끝 일자는 시작 일자보다 작을수 없습니다.");
					$("#DIN_OUT_DT_FROM").val(CUR_DT);
					return;
				}	 
			 }, 	 showMonthAfterYear:true 
			});
		 
		$(".datepicker2").datepicker({ onSelect: function(dateText) 
		 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
				if(     $("#DIN_OUT_DT_FROM").val()  >  $("#DIN_OUT_DT_TO").val()     )
				{   alert("검색할 납품예정 끝 일자는 시작 일자보다 작을수 없습니다.");
				$("#DIN_OUT_DT_TO").val(CUR_DT);
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
	var DIN_OUT_DT_FROM = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#DIN_OUT_DT_FROM").val( DIN_OUT_DT_FROM );
	//조회조건  to 발주일자는 시스템 날짜   해서 default 로 넣는다
	var DIN_OUT_DT_TO = new CommDateManager().after(0, 0, 1).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#DIN_OUT_DT_TO").val( DIN_OUT_DT_TO );
	  
	//매입구분 : 매입으로 세팅
//	$("#PUR_GB").val("1"); 
	

	$("#CFM_YN  option[value!='N']").remove(); 
	 
 
	       
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
 

function btn_save(){
	  
	 
	if( typeof  dataRow2["PUR_CFM_DT"] != 'undefined'  )
	{
		alert('검품/입고가 확정되어 저장 할 수 없습니다.');
		return;
	}
	
	
	 
	// 그리드에 대한 유효성 검사
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	if(rowCnt.length == 0)
	{   alert("등록된 매입상품이 없습니다.");
		return;
	}
	 
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(  typeof  gridRoot1.getItemFieldAt( i , "DEC_QTY") == 'undefined' ||   gridRoot1.getItemFieldAt( i , "DEC_QTY") == ''  )
		{   alert("하단 그리드의 확정수량을 입력 하세요");
			return;
		}
		
		if( typeof gridRoot1.getItemFieldAt( i , "PUR_WAMT") == 'undefined'   || gridRoot1.getItemFieldAt( i , "PUR_WAMT") == '' )
		{   alert("하단 그리드의 매입원가금액을 입력 하세요");
			return;
		}  
	}   


//	// 매입 헤더 신규 저장 위해 xml 만듦
//	var orderStoreHeader = ""; 
//	var firstTag="<GRIDROW></GRIDROW>";  
//	if (window.DOMParser)
//    {   parser = new DOMParser();
//        xmlDoc = parser.parseFromString(firstTag,"text/xml");
//	}
//	else // 인터넷 익스플로러
//	{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
//	    xmlDoc.async=false;
//        xmlDoc.loadXML(firstTag); 
//    }   
//	var ORD_DT		= xmlDoc.createElement('ORD_DT'); 
//	var STR_CODE	= xmlDoc.createElement('STR_CODE');  
//	var PUR_GB		= xmlDoc.createElement('PUR_GB');        // 매입구분
//	var ROUTE_GB	= xmlDoc.createElement('ROUTE_GB');      // 배송구분
//	var VEN_CODE	= xmlDoc.createElement('VEN_CODE');      // 협력업체코드
//	var ORD_TYPE_GB	= xmlDoc.createElement('ORD_TYPE_GB');   // 발주형태구분 
//	var MKT_GB		= xmlDoc.createElement('MKT_GB');        // 매장구분
//	var PUR_DT		= xmlDoc.createElement('PUR_DT');        // 매입일자  
//	var CFM_YN		= xmlDoc.createElement('CFM_YN');   
//	var SLIP_NO		= xmlDoc.createElement('SLIP_NO');   
//	SLIP_NO.appendChild( xmlDoc.createTextNode(     $("#SLIP_NO").val()     )	); 
//	CFM_YN.appendChild( xmlDoc.createTextNode(     	$("#CFM_YN").val()      )	); 
//    ORD_DT.appendChild( xmlDoc.createTextNode(     	$("#ORD_DT").val()      )	); 
//    STR_CODE.appendChild( xmlDoc.createTextNode(    $("#STR_CODE").val()    )	); 
//    PUR_GB.appendChild( xmlDoc.createTextNode(     	$("#PUR_GB").val()      )	); 
//    ROUTE_GB.appendChild( xmlDoc.createTextNode(    $("#ROUTE_GB").val()    )	); 
//    VEN_CODE.appendChild( xmlDoc.createTextNode(    "000000"        	    )	);   // 협력업체코드   000000 으로 채우기 
//    ORD_TYPE_GB.appendChild( xmlDoc.createTextNode( "2"        				)	);   // 발주형태구분    2(권고) 로 채우기 
//    MKT_GB.appendChild( xmlDoc.createTextNode(     	"1"       				)	);   // 매장구분     1(매장)으로 채우기
//    PUR_DT.appendChild( xmlDoc.createTextNode(     	$("#PUR_DT").val()      )	);   
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   SLIP_NO		 ); 
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   CFM_YN		 ); 
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ORD_DT		 ); 
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   STR_CODE	     ); 
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   PUR_GB		 ); 
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ROUTE_GB	     ); 
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   VEN_CODE	     ); 
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ORD_TYPE_GB	 ); 
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   MKT_GB		 ); 
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   PUR_DT		 );  
//    orderStoreHeader  =  "<GRIDLIST>"+getXmlString(   xmlDoc   )+"</GRIDLIST>" ; 
//	     
    
	// 매입 상품 등록 위해서 XML로 만듬 
    var purchDetail = ""; 
	var rowCnt  = gridRoot1.getCollection().getSource() ;  
	for(var i=0 ; i < rowCnt.length ; i++)
	{    purchDetail = purchDetail + getXmlString(   gridRoot1.getItemAt(i)   );     }  
	purchDetail =  "<GRIDLIST>"+purchDetail+"</GRIDLIST>" ;
   
	 
	//   매입 저장 ( 업데이트 )      
	jQuery.ajax({ 
	    url:"/purchRegister.do",         //orderStoreProductRegister   
	    type:"POST",
		datatype:"xml",
		async:true,
		data: {
			"SLIP_NO"        : dataRow2["SLIP_NO"]
		,	"purchDetail"    : purchDetail   
	    }, 
		success:function(data){   
			if(  data[0].RETURN_CODE  == "0000")
			{  
				// 저장에 성공 했으므로  수정 모드로 바꾼다
//				crudBit = "U"; 
//				btn_search();
 			  
//		    	btn_clear();
				 
			    alert("매입 저장에 성공 하였습니다"); 
				
			} else {
				alert("매입 저장에 실패 하였습니다");
			}   
			
	    },
	    complete : function(data) {

	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
 	
}


 
// 발주 삭제
function orderDel(){
	
	selectorColumn2 = gridRoot2.getObjectById("selector2"); 
	var chkArr = selectorColumn2.getSelectedIndices() ; 
	
	if( chkArr.length == 0)
	{   alert("삭제할 발주 건이 체크되지 않았습니다.");
		return;
	}
	
	if (confirm("발주 건을 삭제 하시겠습니까?") == false){  
		return;
	}
	
	var orderDelXml = "";  
	
	for(var i = 0; i < chkArr.length ; i++)
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
		    
			var SLIP_NO		= xmlDoc.createElement('SLIP_NO');   
			SLIP_NO.appendChild( xmlDoc.createTextNode(     	gridRoot2.getItemFieldAt( chkArr[i] , "SLIP_NO")     )	);   
		    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   SLIP_NO		 );   
		    orderDelXml = orderDelXml + getXmlString(   xmlDoc   );
	} 
	orderDelXml  =  "<GRIDLIST>"+ orderDelXml +"</GRIDLIST>" ; 
	  
    //  발주 삭제   
	jQuery.ajax({ 
	    url:"/orderDel.do",          // orderStoreProductRegister 
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {      "orderDelXml"   : orderDelXml       
	    }, 
		success:function(data){   
			if(  data[0].RETURN_CODE  == "0000")
			{    
				btn_search();
				
				alert("발주 삭제에 성공 하였습니다");
				
			} else {
				alert("발주 삭제에 실패 하였습니다");
			}   
			
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	 
}
 

function btn_clear(){
	 
	BTN_SAVE_BIT = "Y";
	
	$("#btn_save").show(); 
	$("#btn_add").show();
	$("#btn_del").show();
		
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
	    
	if(  $("#STR_CODE").val() == ""   )
	{   alert("조회 점포를 선택  하세요.");
		$("#STR_CODE").focus();
		return;
	}
	  
	if(  $("#DIN_OUT_DT_FROM").val() == ""   )
	{   alert("검색할 납품예정 일자를 선택  하세요.");
		$("#DIN_OUT_DT_FROM").focus();
		return;
	}
	 
	if(  $("#DIN_OUT_DT_TO").val() == ""   )
	{   alert("검색할 납품예정 일자를 선택  하세요.");
		$("#DIN_OUT_DT_TO").focus();
		return;
	}
	 
	// 대출입 헤더 리스트 보여주기 
	jQuery.ajax({ 
	    url:"/inOutCenterHeadCarDivisionSearch.do",          
	    type:"POST",
		datatype:"json",
		async:false,
		data: {  	"INOUT_GB"          : $(':radio[name="INOUT_GB"]:checked').val()
		,      	    "STR_CODE"     	    : $("#STR_CODE").val()  
		,           "VEN_CODE"          : $("#VEN_CODE").val()
		,			"DIN_OUT_DT_FROM"   : $("#DIN_OUT_DT_FROM").val() 
		,			"DIN_OUT_DT_TO"     : $("#DIN_OUT_DT_TO").val()  
		,           "CFM_YN"            : $("#CFM_YN").val()  
		}, 
		success:function(data){  
			    
			
			//그리드1, 2 초기화 
			gridRoot1.removeAll( );
			gridRoot2.removeAll( );
			
			gridApp2.setData( data ); 
			  
	    },
	    complete : function(data) {
	    	  
	    },
	    error : function(xhr, status, error) {
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
//var xmlHttp; 
//function srvTime()
//{ 		 
//	 
//		if(window.XMLHttpRequest) {//분기하지 않으면 IE에서만 작동된다. 
//			xmlHttp = new XMLHttpRequest(); // IE 7.0 이상, 크롬, 파이어폭스 등 
//			xmlHttp.open('HEAD', window.location.href.toString() ,false); 
//			xmlHttp.setRequestHeader("Content-Type", "text/html"); 
//			xmlHttp.send(''); 
//			return xmlHttp.getResponseHeader("Date"); 
//		} else if (window.ActiveXObject) { 
//		 
//			xmlHttp = new ActiveXObject('Msxml2.XMLHTTP'); 
//			xmlHttp.open('HEAD',window.location.href.toString(),false); 
//			xmlHttp.setRequestHeader("Content-Type", "text/html"); 
//			xmlHttp.send(''); 
//			return xmlHttp.getResponseHeader("Date"); 
//		} 
//} 

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

//// 배송루트 변경으로 발주가능 시간 보여주기 변경 
//function chgRouteGb()
//{  
//	// 배송루트 한번 변경 시, 다른것으로 변경 못하게 한다. 
//	$("#ROUTE_GB    option[value!='"+$("#ROUTE_GB").val()+"']").remove(); 
//	  
//	// ROUTE_GB 병경으로 인한 발주가능시간 구하기
//	// 발주 불가능일때 저장버튼 disable 한다.
//	jQuery.ajax({ 
//	    url:"/getCommonMgmtEntry.do",           // orderStoreProductSelect 
//	    type:"POST",
//		datatype:"json",
//		async:false,
//	 	data: {	"CD_CL"  : "ROUTE_GB"
//	 	, 		"CD_ID"  : $('#ROUTE_GB').val()   
//	 	},
//		success:function(data){
//		     
//			if(  data.length > 0 )
//			{    
//				var st = srvTime(); 
//				var today = new Date(st); 
//				var hh =  today.getHours();
//				var mm =  today.getMinutes();   if(mm < 10)  {  mm = "0"+mm;  }  
//				var ss =  today.getSeconds();   if(ss < 10)  {  ss = "0"+ss;  } 
//				 
//				var MGMT_ENTRY_1 = data[0].MGMT_ENTRY_1 ;
//				var MGMT_ENTRY   = data[0].MGMT_ENTRY_2 ;
//				var MGMT_ENTRY_2 = MGMT_ENTRY.substring(0, 6);                 
//				var MGMT_ENTRY_3 = MGMT_ENTRY.substring(6, 12);
//				  
//				var CUR_TIME = hh  +""+ mm  +""+ ss;
//				 
//				if(  (MGMT_ENTRY_1 - CUR_TIME) > 0 )       // 양수 
//				{   
//					$('#MGMT_ENTRY').val(    getTimeDiff(MGMT_ENTRY_1 , CUR_TIME )    ) ; 
//					BTN_SAVE_BIT = "Y";
//					
//				} else {   // 음수
//					
//					   if(  (MGMT_ENTRY_2 < CUR_TIME) && (MGMT_ENTRY_3 > CUR_TIME) )
//				       {      
//						   BTN_SAVE_BIT = "Y";
//						   $('#MGMT_ENTRY').val(  getTimeDiff(MGMT_ENTRY_3 , CUR_TIME )  ) ;
//						   //	 alert("발주가능 2 : "+CUR_TIME  + "_" + MGMT_ENTRY_2 + "_" + MGMT_ENTRY_3); // 차이를 시간으로 걔산 해서 보여주기     
// 
//				       } else { 
//				    	   BTN_SAVE_BIT = "N";
//				    	   alert( "선택하신 배송루트는 발주불가능 합니다.\n[초기화] 버튼을 클릭하고 다른 배송루트를 선택 하세요." ) ;
//				    	   $('#MGMT_ENTRY').val( "발주 불가능" ) ; 
//				       }  
//					
//				}
//				  
//			} else {
//				 
//				return;
//			}
//	    },
//	    complete : function(data) {
//	    	 
//	    },
//	    error : function(xhr, status, error) {
//	    	CommonJs.alertErrorStatus(xhr.status, error);
//	    }
//	 });
//	 
//}


// 그리드 2 ( 헤더) 의 ROW 클릭시 발생
function inOutCenterCarHeadDtailInfo( INOUT_GB , STR_CODE , SLIP_NO   )
{ 
	   
	// 대출 입상품 리스트 정보 보여주기 - grid2 
	jQuery.ajax({ 
	    url:"/inOutCenterCarDivisionDetailInfo.do",         // inOutCenterDetailInfo.do
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {    "INOUT_GB"        : INOUT_GB
		,	       "STR_CODE"        : STR_CODE
		,	       "SLIP_NO"         : SLIP_NO 
		},
		success:function(data){  
			// gridApp2.setData( data );  
			 
			//그리드1 초기화 
			gridRoot1.removeAll();
  
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
				var CRUD			=	xmlDoc.createElement('CRUD');
				var SLIP_NO			=	xmlDoc.createElement('SLIP_NO');
				var STR_CODE		=	xmlDoc.createElement('STR_CODE');
				var ITM_CODE		=	xmlDoc.createElement('ITM_CODE');
				var LINK_CODE		=	xmlDoc.createElement('LINK_CODE');
				var ITM_NAME		=	xmlDoc.createElement('ITM_NAME');
				var DP_PRC_UNIT     =	xmlDoc.createElement('DP_PRC_UNIT');
				var UNIT			=	xmlDoc.createElement('UNIT');
				var IPSU_QTY		=	xmlDoc.createElement('IPSU_QTY');
				var ORD_QTY			=	xmlDoc.createElement('ORD_QTY');
				var TAX_GB			=	xmlDoc.createElement('TAX_GB');
				var TAX_GB_NM		=	xmlDoc.createElement('TAX_GB_NM');
				var QTY				=	xmlDoc.createElement('QTY');
				var CFM_QTY			=	xmlDoc.createElement('CFM_QTY');
				var WPRC			=	xmlDoc.createElement('WPRC');
				var WVAT			=	xmlDoc.createElement('WVAT');
				var SPRC			=	xmlDoc.createElement('SPRC');
				var BOT_SPRC		=	xmlDoc.createElement('BOT_SPRC');
				var BOT_SPRC_TOT	=	xmlDoc.createElement('BOT_SPRC_TOT');
				var ORD_FLAG		=	xmlDoc.createElement('ORD_FLAG');
				var ORD_FLAG_NM		=	xmlDoc.createElement('ORD_FLAG_NM');
				var ORD_SLIP_NO		=	xmlDoc.createElement('ORD_SLIP_NO');
				var SEQ				=	xmlDoc.createElement('SEQ'); 
				var CAR_CODE_NM		=	xmlDoc.createElement('CAR_CODE_NM'); 
				var CAR_CODE		=	xmlDoc.createElement('CAR_CODE'); 
				
				
				CRUD.appendChild(			xmlDoc.createTextNode(  ""	                    )   );
				SLIP_NO.appendChild(		xmlDoc.createTextNode(	data[i].SLIP_NO			)	);
				STR_CODE.appendChild(		xmlDoc.createTextNode(	data[i].STR_CODE		)	);
				ITM_CODE.appendChild(		xmlDoc.createTextNode(	data[i].ITM_CODE		)	);
				LINK_CODE.appendChild(		xmlDoc.createTextNode(	data[i].LINK_CODE		)	);
				ITM_NAME.appendChild(		xmlDoc.createTextNode(	data[i].ITM_NAME		)	);
				DP_PRC_UNIT.appendChild(    xmlDoc.createTextNode(	data[i].DP_PRC_UNIT		)	);
				UNIT.appendChild(			xmlDoc.createTextNode(	data[i].UNIT			)	);
				IPSU_QTY.appendChild(		xmlDoc.createTextNode(	data[i].IPSU_QTY		)	);
				ORD_QTY.appendChild(		xmlDoc.createTextNode(	data[i].ORD_QTY			)	);
				TAX_GB.appendChild(			xmlDoc.createTextNode(	data[i].TAX_GB			)	);
				TAX_GB_NM.appendChild(		xmlDoc.createTextNode(	data[i].TAX_GB_NM		)	);
				QTY.appendChild(			xmlDoc.createTextNode(	data[i].QTY				)	);
				CFM_QTY.appendChild(		xmlDoc.createTextNode(	data[i].CFM_QTY			)	);
				WPRC.appendChild(			xmlDoc.createTextNode(	data[i].WPRC			)	);
				WVAT.appendChild(			xmlDoc.createTextNode(	data[i].WVAT			)	);
				SPRC.appendChild(			xmlDoc.createTextNode(	data[i].SPRC			)	);
				BOT_SPRC.appendChild(		xmlDoc.createTextNode(	data[i].BOT_SPRC		)	);
				BOT_SPRC_TOT.appendChild(	xmlDoc.createTextNode(	data[i].BOT_SPRC_TOT	)	);
				ORD_FLAG.appendChild(		xmlDoc.createTextNode(	data[i].ORD_FLAG		)	);
				ORD_FLAG_NM.appendChild(	xmlDoc.createTextNode(	data[i].ORD_FLAG_NM		)	);
				ORD_SLIP_NO.appendChild(	xmlDoc.createTextNode(	data[i].ORD_SLIP_NO		)	);
				SEQ.appendChild(			xmlDoc.createTextNode(	data[i].SEQ				)	); 
				CAR_CODE_NM.appendChild(    xmlDoc.createTextNode(	  ""			)	); 
				CAR_CODE.appendChild(		xmlDoc.createTextNode(	""				)	); 
				
				
				
				
				 
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
				 
 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CRUD            ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SLIP_NO         ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_CODE        ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE        ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	LINK_CODE       ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_NAME        ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	DP_PRC_UNIT     ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	UNIT            ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	IPSU_QTY        ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_QTY         ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TAX_GB          ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TAX_GB_NM       ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	QTY             ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CFM_QTY         ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WPRC            ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WVAT            ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SPRC            ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOT_SPRC        ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOT_SPRC_TOT    ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_FLAG        ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_FLAG_NM     ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_SLIP_NO     ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SEQ             );   
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CAR_CODE_NM             );   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CAR_CODE             );   
				
				
				 
				
				gridRoot1.addItemAt(  xmlDoc  , 0 , false );
  	
			}
			   
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	
	// 수정모드 업데이트로 변경
	crudBit = "U";
	 
	// 합계 정보 조회 뿌려주기
	setTotalSum();
	
	
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
	 
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		//  수량( QTY)을 금액에 곱해줘야 한다.	  
		QTY = gridRoot1.getItemFieldAt( i , "QTY");
		
		// 대출원가
		if( gridRoot1.getItemFieldAt( i , "TAX_GB")  == "1" )  // 과세
		{
			WSPRC_TAX_ADD  = parseFloat(WSPRC_TAX_ADD)  + ( QTY * parseFloat(gridRoot1.getItemFieldAt( i , "WPRC"))   );
		} else {   // 면세
			WSPRC_TAX_FREE = parseFloat(WSPRC_TAX_FREE) + ( QTY * parseFloat(gridRoot1.getItemFieldAt( i , "WPRC"))   );
		} 
		WVAT 		 = parseFloat(WVAT) 		+  ( QTY *   parseFloat(gridRoot1.getItemFieldAt( i , "WVAT"))   );  
		SPRC 		 = parseFloat(SPRC) 		+  ( QTY *   parseFloat(gridRoot1.getItemFieldAt( i , "SPRC"))   );  
		BOT_SPRC_TOT = parseFloat(BOT_SPRC_TOT) +  ( 		 parseFloat(gridRoot1.getItemFieldAt( i , "BOT_SPRC_TOT"))   );   
	}
	 
	// 면세원가 금액합계 
	$("#TOT_WSPRC_TAX_FREE").val( WSPRC_TAX_FREE );
	
	// 과세원가 금액합계
	$("#TOT_WSPRC_TAX_ADD").val( WSPRC_TAX_ADD );
	
	// 부가세 금액합계
	$("#TOT_WVAT").val( WVAT );
	
	// 구입 금액합계
	$("#TOT_PRICE").val( parseFloat(WSPRC_TAX_FREE)  +  parseFloat(WSPRC_TAX_ADD)  +  parseFloat(WVAT) );
	
	// 매가 금액합계
	$("#TOT_SPRC").val( SPRC );
	 
	// 공병 금액합계 
	$("#BOT_SPRC_TOT").val( BOT_SPRC_TOT  );
	 
}

 


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
		WSPRC_VAL = Math.round( PUR_AVR_AMT / 1.1 ) ;  
		WVAT_VAL = PUR_AVR_AMT - Math.round( PUR_AVR_AMT / 1.1 ) ; 
		 
	} else {        // 면세 
		WSPRC_VAL  = PUR_AVR_AMT ; 
		WVAT_VAL = 0 ; 
	} 
	return [ PUR_AVR_AMT , WSPRC_VAL , WVAT_VAL];
}

function carDivision()
{
	dataGrid1.setEnabled(false); 
	dataGrid1.setEnabled(true); 
	 
	if (confirm("해당 전표를 분리 하시겠습니까?") == true){  
		 
	} else {
		return;
	} 
	
	
	clearSort();
	
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	if(	rowCnt.length == 0	)
	{   alert("대출입전표를 선택 하세요");
		return;
	}
	
	for(var i=0 ; i < rowCnt.length ; i++)
	{
		if( typeof gridRoot1.getItemFieldAt( i , "CAR_CODE")  == 'undefined' )
		{
			var rowNum = i +1 ;
			alert( "대출입전표상세 그리드의 "+rowNum+" 번째 행의 차량을 선택 하세요");
			return;
		} 	
	}
	 
	gridRoot3.removeAll();
	
	for(var i=0 ; i < rowCnt.length ; i++)
	{     
		 gridHolder1AddRow( i );
		 gridRoot3.setItemFieldAt(  gridRoot1.getItemFieldAt( i , "LINK_CODE")  , i , "LINK_CODE");  
		 gridRoot3.setItemFieldAt(  gridRoot1.getItemFieldAt( i , "IPSU_QTY")   , i , "IPSU_QTY"); 
		 gridRoot3.setItemFieldAt(  gridRoot1.getItemFieldAt( i , "CAR_CODE")   , i , "CAR_CODE"); 
		   
		 
	}   
	

	

    
	dataGrid = gridRoot3.getDataGrid();	// 그리드 객체
	columns = dataGrid3.getColumns();
	var acoll = gridRoot3.getCollection(); 
	// 정렬할 컬럼 정보를 instance로 지정합니다.
	var sortField = gridRoot3.newClassInstance("SortField");
	// 정렬 함수를 instance로 지정합니다.
	var sot = gridRoot3.newClassInstance("Sort"); 
	// Seoul 에 대한 정렬을 처리 합니다.
	sortField.name = "CAR_CODE";
	// 내림 차순 설정 올림은 false
	sortField.descending = false;
	sot.setFields([sortField]);
	acoll.setSort(sot);
	// collection 정보를 새로고침합니다.
	acoll.refresh();
	
	
	
	 //clearSort();
	
}

function clearSort()
{

	// 소트 없애기
	var collection = gridRoot3.getCollection();
    collection.setSort(null);
    // collection 정보를 새로고침합니다.
    collection.refresh();
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
	
	
	if( dataField == "CAR_CODE_NM" )  
	{
		gridRoot1.setItemFieldAt( newValue , rowIndex, "CAR_CODE"); 
	}
 
	  
	
}



function btn_report(report)
{ 
	if(   $("#selectedPrintRow").val() == "" )
	{ 	alert('출력할 매출입 전표를 선택 하세요.');
		return;
	}

	
	var selectedIndex = dataGrid2.getSelectedIndex();
//	gridRoot2.removeItemAt(selectedIndex);
//	gridRoot2.setItemFieldAt( "D" , selectedIndex, "CRUD");
	 
	if(   gridRoot2.getItemFieldAt( selectedIndex , "ROUTE_GB"  )  == "R2")
	{
		alert("R2 전표는 매입전표 화면에서 출력하십시요.");
		return;	
		
	}
	
	var selectedPrintRowArray = $("#selectedPrintRow").val().substring(  0
								  							           , $("#selectedPrintRow").val().length - 1 
																	   ).split(',');
	  
	for(var i = 0; i < selectedPrintRowArray.length ; i++)
	{
//		alert( selectedPrintRowArray[i] );
	}
	
	window.open(report + params,'AIViewer','width=900,height=800,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');

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

 
function gridHolder1AddRow( i )
{

	 
//	// 행 추가 클릭시 발주일자 입력란을 디스에이블 한다.
//	$( "#ORD_DT" ).datepicker( "option", "disabled", true );
//	$("input[name=ORD_DT]").attr("readonly",false);
//	 
//	if( $('#STR_CODE' ).val() == "" )
//	{   alert("점포를 선택 하세요.");
//		$('#STR_CODE' ).focus();
//		return;
//	}
//	
//	if( $('#ROUTE_GB' ).val() == "" )
//	{   alert("배송구분을 선택 하세요.");
//		$('#ROUTE_GB' ).focus();
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
	var	CRUD 			= 	xmlDoc.createElement('CRUD');
	var	No				=	xmlDoc.createElement('No');
	var	SLIP_NO			=	xmlDoc.createElement('SLIP_NO');
	var	STR_CODE		=	xmlDoc.createElement('STR_CODE');
	var	ITM_CODE		=	xmlDoc.createElement('ITM_CODE');
	var	CAR_CODE		=	xmlDoc.createElement('CAR_CODE');
	var	CAR_CODE_NM		=	xmlDoc.createElement('CAR_CODE_NM');
	var	LINK_CODE		=	xmlDoc.createElement('LINK_CODE');
	var	ITM_NAME		=	xmlDoc.createElement('ITM_NAME');
	var	DP_PRC_UNIT		=	xmlDoc.createElement('DP_PRC_UNIT');
	var	UNIT			=	xmlDoc.createElement('UNIT');
	var	IPSU_QTY		=	xmlDoc.createElement('IPSU_QTY');
	var	ORD_QTY			=	xmlDoc.createElement('ORD_QTY');
	var	TAX_GB			=	xmlDoc.createElement('TAX_GB');
	var	QTY				=	xmlDoc.createElement('QTY');
	var	CFM_QTY			=	xmlDoc.createElement('CFM_QTY');
	var	TAX_GB_NM		=	xmlDoc.createElement('TAX_GB_NM');
	var	WPRC			=	xmlDoc.createElement('WPRC');
	var	WVAT			=	xmlDoc.createElement('WVAT');
	var	SPRC			=	xmlDoc.createElement('SPRC');
	var	BOT_SPRC		=	xmlDoc.createElement('BOT_SPRC');
	var	BOT_SPRC_TOT	=	xmlDoc.createElement('BOT_SPRC_TOT');
	var	ORD_FLAG		=	xmlDoc.createElement('ORD_FLAG');
	var	ORD_FLAG_NM		=	xmlDoc.createElement('ORD_FLAG_NM');
	var	ORD_SLIP_NO		=	xmlDoc.createElement('ORD_SLIP_NO');
	var	SEQ				=	xmlDoc.createElement('SEQ');
	
	CRUD.appendChild(  			xmlDoc.createTextNode(  "" )	); 
	No.appendChild(  			xmlDoc.createTextNode(  "" )	); 
	SLIP_NO.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	STR_CODE.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	ITM_CODE.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	CAR_CODE.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	CAR_CODE_NM.appendChild(  	xmlDoc.createTextNode(  "" )	); 
	LINK_CODE.appendChild(  	xmlDoc.createTextNode(  "" )	); 
	ITM_NAME.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	DP_PRC_UNIT.appendChild(  	xmlDoc.createTextNode(  "" )	); 
	UNIT.appendChild(  			xmlDoc.createTextNode(  "" )	); 
	IPSU_QTY.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	ORD_QTY.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	TAX_GB.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	QTY.appendChild(  			xmlDoc.createTextNode(  "" )	); 
	CFM_QTY.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	TAX_GB_NM.appendChild(  	xmlDoc.createTextNode(  "" )	); 
	WPRC.appendChild(  			xmlDoc.createTextNode(  "" )	); 
	WVAT.appendChild(  			xmlDoc.createTextNode(  "" )	); 
	SPRC.appendChild(  			xmlDoc.createTextNode(  "" )	); 
	BOT_SPRC.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	BOT_SPRC_TOT.appendChild(  	xmlDoc.createTextNode(  "" )	); 
	ORD_FLAG.appendChild(  		xmlDoc.createTextNode(  "" )	); 
	ORD_FLAG_NM.appendChild(  	xmlDoc.createTextNode(  "" )	); 
	ORD_SLIP_NO.appendChild(  	xmlDoc.createTextNode(  "" )	); 
	SEQ.appendChild(  			xmlDoc.createTextNode(  "" )	); 
	
	  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CRUD		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	No			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SLIP_NO		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_CODE	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CAR_CODE	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CAR_CODE_NM	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	LINK_CODE	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_NAME	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	DP_PRC_UNIT	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	UNIT		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	IPSU_QTY	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_QTY		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TAX_GB		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	QTY			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CFM_QTY		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TAX_GB_NM	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WPRC		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WVAT		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SPRC		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOT_SPRC	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOT_SPRC_TOT	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_FLAG		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_FLAG_NM		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_SLIP_NO		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SEQ				);
	
	gridRoot3.addItemAt(  xmlDoc  , i);
//	girdMoveSelctedIndex(0 , gridRoot3.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기
	           
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


//매입생성
function btn_purch_creat()
{
	
	// 업로드 주체가 바이어 인지 점포인지 구분. REG_PATH :   1- 점등록   , 2 -  바이어등록   
	var REG_PATH = "";
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009")  // 바이어(ROLE009) 
	{   REG_PATH = "2";
	} else {    // 점포
		REG_PATH = "1";
	}
	
	//  매입 데이터 생성      
	jQuery.ajax({ 
	    url:"/jobOrderToPurch.do",         // jobUploadToOrder    
	    type:"POST",
		datatype:"xml",
		async:true,
		data: {     
		           "REG_PATH"   : REG_PATH
        ,          "STR_CODE"   : $("#STR_CODE").val()
        ,   	   "ITM_GB"     : $("#ITM_GB").val()  
        ,		   "LRG_CODE"   : $("#LRG_CODE").val()
        ,          "PUR_DT"     : "20170329"
	    }, 
		success:function(data){   
			if(  data[0].RETURN_CODE  == "0000")
			{   alert("매입 생성에 성공 하였습니다");
			} else {
				alert("매입 생성에 실패 하였습니다");
			}   
			
	    },
	    complete : function(data) {
//	    	gridRoot1.removeAll(); 
//	    	$('#excelFile').val(""); 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	


}
	      




function btn_confirm()
{
	
	selectorColumn2 = gridRoot2.getObjectById("selector2"); 
	var chkArr = selectorColumn2.getSelectedIndices() ; 
	var ERR_CODE = 0;  
	if( chkArr.length == 0)
	{   alert("대출입 전표 확정 건이 체크되지 않았습니다.");
		return;
	}
	
	if (confirm("선택하신 대출입전표 건을 확정 하시겠습니까?") == false){  
		return;
	}

	for(var i = 0; i < chkArr.length ; i++)
	{ 
		//  매입 확정  
		jQuery.ajax({ 
		    url:"/inOutCenterConfirm.do",         // purchConfirm     
		    type:"POST",
			datatype:"xml",
			async:true,
			data: {   "INOUT_GB"    : gridRoot2.getItemFieldAt( chkArr[i] , "INOUT_GB")  
		    ,         "SLIP_NO"     : gridRoot2.getItemFieldAt( chkArr[i] , "SLIP_NO")
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
		alert('대출입전표 확정에 성공 하였습니다.');
	} else {
		alert('대출입전표 확정에 실패 하였습니다.'); 
	}
	
	btn_search();

}
   



 


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$(".lft_wid").width($(window).width()-530);
	$(".rgt_wid").width(410);	
	$("#gridHolder1").height($(window).height()-500);
	$("#gridHolder3").height($(window).height()-105);	
	$(".pop_btn_updown").css({left:$(".lft_wid").width()+10,marginLeft:0});
	$(".pop_btn_updown p").css({width:"48px"});
	$(".pop_btn_updown p:first").css({marginBottom:"5px"});
	$(".pop_btn_updown p:last").css({marginTop:"5px"});
	
	$(".pop_btn_updown button").css({marginLeft:"13px"});
	
	$("#comm_pop_wrap3").css({position:'relative'});
	$("#comm_pop_wrap3 #pop_wrap").css({position:'absolute', top:0, left:0, width:'100%'}); 
	$(window).on('resize',function (){		
		$(".lft_wid").width($(window).width()-530);
		$(".pop_btn_updown").css({left:$(".lft_wid").width()+10});
		$("#gridHolder1").height($(window).height()-500);
		$("#gridHolder3").height($(window).height()-105);			
	});
	
});

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################