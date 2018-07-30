/********************************************************
 * 설명: 점발주(R1/R2/R3) 
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
	  
	getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	); 
	 
	getCommonCodeSelectBoxList("S_CFM_YN"  ,   "CFM_YN"	); 

	getCommonCodeSelectBoxList("S_PUR_GB"  ,   "PUR_GB"	); 
	
	// 배송구분에서 R3 는 뺀다.
//	$("#ROUTE_GB  option[value='R3']").remove(); 
	
	getCommonCodeSelectBoxList("S_ROUTE_GB"  ,   "ROUTE_GB"	); 
//	// 조회조건의 배송구분에서 R3 는 뺀다.
//	$("#S_ROUTE_GB  option[value='R3']").remove(); 
	 
	getCommonCodeSelectBoxList("PUR_GB"    ,   "PUR_GB"		);  
//	getCommonCodeSelectBoxList("CFM_YN"    ,   "CFM_YN"		);      // 확정구분은 제거함
	 
	getStoreCode("S_STR_CODE");
	getStoreCode("STR_CODE");
	 
	init();
	  
	if( $("#SESSION_ROLE_ID").val()  == "ROLE009"  ||  $("#SESSION_ROLE_ID").val()  == "ROLE010")  // 바이어/물류 로그인시 다보여줌
	{ 
		$("#HEAD_STRING").text(" * 미확정인 경우에 매입데이터를 생성 할 수 없습니다."); 
		 
	} else {         // 점포 로그인시 해당 점포만 보여줌, 조회조건의 점포코드도 마찬가지
		
		$("#HEAD_STRING").text(" * 생식이거나 미확정인 경우에 매입데이터를 생성 할 수 없습니다."); 
		
		$("#S_STR_CODE  option[value!='"+$("#SESSION_STR_CODE").val()+"']").remove(); 
		$("#STR_CODE    option[value!='"+$("#SESSION_STR_CODE").val()+"']").remove(); 
		
		// 바이어 로그인시 확정구분이 확정/미확정 다 나오고, 점포 로그인시 미확정만 나온다.  
//		$("#CFM_YN  option[value!='N']").remove();  
	}
	
	 
	
	$('#TOT_WSPRC_TAX_FREE').number( true, 2 );  
	$('#TOT_WSPRC_TAX_ADD').number( true ,2 );  
	$('#TOT_WVAT').number( true, 2 );  
	$('#TOT_PRICE').number( true, 2 );  
	$('#TOT_SPRC').number( true, 0 );  
	$('#BOT_SPRC_TOT').number( true, 0 );  
	 
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 선택한 점포의 물류코드 가져오기
	getCentaCode();

	
// 
//	 alert(  $('VEN_NAME').is('[readonly]') ); 
//	// readpnly 에서의 백스페이스 막기
//	$('#VEN_NAME').keydown(function(event) {
//		
//		//readonly 일때만
//		if(   $('VEN_NAME').is('[readonly]')  ==  true  )
//		{   
//			 
//		    if ( event.keyCode === 8 ) {
//			    return false;
//			}
//		} else {
//			 
//			
//		}
//		  
//	});
	
	
	
	
	
	// 휴일 적용 입고일자 세팅
//	setOrderDay();
	
	
});


// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
//rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
 
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";
//jsVars += "&dataType=xml"; 
rMateGridH5.create("grid1", "gridHolder1", jsVars+"&dataType=xml", "100%", "300px");   // 발주 상품 상세 리스트  그리드
rMateGridH5.create("grid2", "gridHolder2", jsVars   );         // 발주 헤더 리스트
 
function gridReadyHandler(id) {
	
	 if (id == "grid1") { 
			// rMateGrid 관련 객체
			gridApp1 	= document.getElementById(id);	// 그리드를 포함하는 div 객체
			gridRoot1 	= gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체
			gridApp1.setDataType("xml");
			gridApp1.setLayout(layoutStr1);		
			gridApp1.setData(gridData1);
			//로우 클릭 이벤트 제어
//			var itemClickHandler = function(event) { 
//			}; 
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
//						storeProductPopup(event); 
//						alert('여기 수정 막아햐 할지 아닐디');
					} else { 
//						alert('저장된 점 상품은 수정 할수없습니다.'); 
					}
				}  
					 
			};
			
//			var selectionChangeHandler = function(event) {
//				var rowIndex = event.rowIndex;
//				var columnIndex = event.columnIndex;
//				var dataRow = gridRoot1.getItemAt(rowIndex);
//				var column = dataGrid1.getDisplayableColumns()[columnIndex];
//				var dataField = column.getDataField();
//
//				// 전달된 레코드(XMLElement)에서 필드 뽑아내기
////				var value = getNodeText(dataRow, dataField);
////				alert("파싱된 "+dataField+"의 값:"+value+"\n\n전달된 XML\n\n"+getXmlString(dataRow));
//			};
			 
			//그리드1 핸들러
			var layoutCompleteHandler1 = function(event) {
				dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체 
  
				// 확정수량 수정/불수정 세팅
				setDecQtyCol();
				
				// 더블클릭
				dataGrid1.setDoubleClickEnabled(true);
				dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
				
			};  
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1); 
			
			// 그리드내 콤보박스 change 시 이벤트
			gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);
			 
		}  else  if (id == "grid2") {
			// rMateGrid 관련 객체
			gridApp2 	= document.getElementById(id);	// 그리드를 포함하는 div 객체
			gridRoot2 	= gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체
//			gridApp2.setDataType("xml");
			gridApp2.setLayout(layoutStr2);		
			gridApp2.setData(gridData2);
			var itemClickHandler = function(event) {
				var rowIndex = event.rowIndex; 
				dataRow2 = gridRoot2.getItemAt(rowIndex);
				  

				$('#VEN_CODE').val(	   dataRow2["VEN_CODE"] 	 		); 
				$('#VEN_NAME').val(    dataRow2["VEN_NAME"]  			); 

				 
				// 발주 헤더 및 상품상세 보이기 
				orderHeadDtailInfo( dataRow2["STR_CODE"] , dataRow2["SLIP_NO"] , dataRow2["PUR_GB"] ,  dataRow2["SLIP_DIV_YN"] );
				 
			}; 
			//그리드2 핸들러
			var layoutCompleteHandler2 = function(event) {
				dataGrid2 = gridRoot2.getDataGrid();	// 그리드 객체 
				dataGrid2.addEventListener("itemClick", itemClickHandler); 	
				
			};  
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2); 
			 
		}
  
	 
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1; 
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2; 

//----------------------- 그리드 설정 끝 -----------------------
 
 
// 발주상품  그리드 - 그리드1 헤더 설정        itemRenderer="IconItem" icon="Magnifier"    selectionMode="multipleRows"    singleCell
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
	<DataGrid id="dg1" sortableColumns="false"   editable="true" horizontalScrollPolicy="auto" showDeletedRows="true"  selectionMode="multipleRows"   doubleClickEnabled="false" >\
		<columns>\
			<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"  visible="false"  />\
			<DataGridColumn  id="CRUD"		 	 dataField="CRUD"     		editable="false"		visible="false"     />\
			<DataGridColumn  id="No"		 	 dataField="No"     		headerText="No" 	    editable="false"		itemRenderer="IndexNoItem"	visible="true"    textAlign="center"	width="33"  />\
			<DataGridColumn  id="SLIP_NO"		 dataField="SLIP_NO"    	headerText="발주번호"		editable="false"		visible="false"  textAlign="center"	 width="125"    		/>\
			<DataGridColumn  id="STR_CODE"		 dataField="STR_CODE"     	headerText="STR_CODE"	editable="false" 		visible="false" />\
			<DataGridColumn  id="ITM_CODE"		 dataField="ITM_CODE"     	headerText="상품코드"		editable="false" 		visible="false" />\
			<DataGridColumn  id="SCAN_CODE"		 dataField="SCAN_CODE"     	headerText="스캔코드"		editable="true" 	    textAlign="center"	width="125"  editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem" />\
			<DataGridColumn  id="ITM_NAME"		 dataField="ITM_NAME"     	headerText="상품명"		editable="false" 		 textAlign="left"	 width="145"   		/>\
	<DataGridColumn  id="DP_PRC_UNIT"	 dataField="DP_PRC_UNIT"    headerText="단위"    		editable="false"		textAlign="center"   width="65"      	/>\
	<DataGridColumn  id="UNIT_NM"	 	 dataField="UNIT_NM" 		headerText="규격"    		editable="false"		textAlign="right"   width="75"   		/>\
			<DataGridColumn  id="IPSU_QTY"		 dataField="IPSU_QTY"    	headerText="입수"    		editable="false"		textAlign="right"    width="65"    formatter="{numfmt}"  	/>\
			<DataGridColumn  id="ORD_QTY"		 dataField="ORD_QTY"     	headerText="발주수량"		editable="true" 		textAlign="right"	  maxChars="6" type="int"   width="70"    formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
			<DataGridColumn  id="DEC_QTY"	 	 dataField="DEC_QTY" 		headerText="확정수량"  	editable="true"		    textAlign="right"     maxChars="6" type="int"   width="70"    formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
			<DataGridColumn  id="TAX_GB"		 dataField="TAX_GB"     	headerText="TAX_GB"		visible="false" />\
			<DataGridColumn  id="TAX_GB_NM"		 dataField="TAX_GB_NM"    	headerText="과세구분"		editable="false"		textAlign="center"   width="70"       	/>\
			<DataGridColumn  id="ORD_FLAG"		 dataField="ORD_FLAG"     	headerText="ORD_FLAG"	visible="false" />\
			<DataGridColumn  id="PUR_AVR_AMT"    dataField="PUR_AVR_AMT"    headerText="단가(VAT포함)"	 editable="true"		showEditableIcon="always"   itemRenderer="EditableIconItem" textAlign="right"	 width="98"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="WSPRC"	 		 dataField="WSPRC"    		headerText="대출원가"  	editable="false"		textAlign="right"	 width="85"   formatter="{numfmt}"  	/>\
			<DataGridColumn  id="WVAT"		 	 dataField="WVAT"    		headerText="부가세"		editable="false"		textAlign="right"	 width="85"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="SPRC"		 	 dataField="SPRC"    		headerText="매가"			editable="false"		textAlign="right"	 width="85"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="ORD_FLAG_NM"	 dataField="ORD_FLAG_NM"    headerText="매입형태"  	editable="false"			  textAlign="center"	 width="85"      	/>\
			<DataGridColumn  id="SALE_QTY"		 dataField="SALE_QTY"    	headerText="매출수량" 	 	editable="false"		textAlign="right"	 width="85"    formatter="{numfmt}"  	/>\
			<DataGridColumn  id="INV_END_QTY"	 dataField="INV_END_QTY"    headerText="현재고"		editable="false" 	 	textAlign="right"	 width="85"    formatter="{numfmt}" 	/>\
			<DataGridColumn  id="CENTER_INV_END_QTY"	 dataField="CENTER_INV_END_QTY"    headerText="물류재고"		editable="false" 	 	textAlign="right"	 width="85"    formatter="{numfmt}" 	/>\
			<DataGridColumn  id="UPTAE_FLAG_NM"  dataField="UPTAE_FLAG_NM"  headerText="출고처"		editable="false"		textAlign="center"	 width="85"    		/>\
	<DataGridColumn  id="BOT_SPRC"		 dataField="BOT_SPRC"    	headerText="공병단가"		editable="false"	visible="true"	textAlign="right"	 width="85"    formatter="{numfmt}"		/>\
	<DataGridColumn  id="BOT_SPRC_TOT"	 dataField="BOT_SPRC_TOT"   headerText="공병금액"		editable="false"	visible="true"	textAlign="right"	 width="85"    formatter="{numfmt}" 	/>\
	<DataGridColumn  id="VEN_CODE"		 dataField="VEN_CODE"     	headerText="매입처코드"	editable="false" 	visible="false"	textAlign="center"   width="85"  		/>\
	<DataGridColumn  id="VEN_NAME"		 dataField="VEN_NAME"    	headerText="매입처"		visible="false"   editable="false"		textAlign="left"	 width="160"    		/>\
			<DataGridColumn  id="TPER_MTHD"   	 dataField="TPER_MTHD"      editable="false"   		visible="false"	  		/>\
			<DataGridColumn  id="TPER_MTHD_NM"   dataField="TPER_MTHD_NM"   headerText="보관방법"		editable="false"		textAlign="center"	 width="85"     	/>\
			<DataGridColumn  id="AVAIL_AMT"   dataField="AVAIL_AMT"   headerText="여신한도"		editable="false"		textAlign="right"	 width="50"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="ORD_DT"		 dataField="ORD_DT"     	headerText="ORD_DT"		editable="false" 		visible="false" />\
	<DataGridColumn  id="ITM_GB"		 dataField="ITM_GB"     	headerText="ITM_GB" 		visible="true" />\
	</columns>\
	</DataGrid>\
</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
		<DataGrid id="dg1" sortableColumns="true"   editable="true" horizontalScrollPolicy="auto" showDeletedRows="true"     doubleClickEnabled="false" selectionMode="multipleRows" >\
			<columns>\
				<DataGridSelectorColumn id="selector2" width="40" textAlign="center"  headerText=""  backgroundColor="#EDEDF0" allowAllSelection="true" secondLabelJsFunction="secondLabelFunc" />\
				<DataGridColumn  id="No"		 	  dataField="No"     		    headerText="No" 	    visible="true"  		editable="false"		itemRenderer="IndexNoItem"	   textAlign="center"	width="33"  />\
				<DataGridColumn  id="ORD_DT"	 	  dataField="ORD_DT"    		headerText="발주일자"  	visible="true"  		editable="false"	    textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="STR_CODE"	 	  dataField="STR_CODE"    				 				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="SLIP_NO"	 	  dataField="SLIP_NO"    		headerText="발주번호"  	visible="true"  		editable="false"		textAlign="center"   width="125"      	/>\
				<DataGridColumn  id="PUR_GB"	 	  dataField="PUR_GB"    				  				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ITM_GB_NM"	 	  dataField="ITM_GB_NM"    		headerText="상품구분"  	visible="true"  		editable="false"		textAlign="center"   width="75"      	/>\
				<DataGridColumn  id="PUR_GB_NM"	 	  dataField="PUR_GB_NM"    		headerText="매입구분"  	visible="true"  	styleJsFunction="stylePurGbNm" 	editable="false"		textAlign="center"   width="75"      	/>\
				<DataGridColumn  id="ROUTE_GB"	 	  dataField="ROUTE_GB"    				  				visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ROUTE_GB_NM"	  dataField="ROUTE_GB_NM"    	headerText="배송구분"  	visible="true"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ORD_TYPE_GB"	  dataField="ORD_TYPE_GB"    		  					visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="ORD_TYPE_GB_NM"  dataField="ORD_TYPE_GB_NM"    headerText="발주형태"  visible="true"  			editable="false"		textAlign="center"   width="80"      	/>\
				<DataGridColumn  id="MKT_GB"	 	  dataField="MKT_GB"    					  			visible="false"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="MKT_GB_NM"	 	  dataField="MKT_GB_NM"    		headerText="매장구분"  	visible="true"  		editable="false"		textAlign="center"   width="75"      	/>\
				<DataGridColumn  id="PUR_DT"	 	  dataField="PUR_DT"    		headerText="매입일자"  	visible="true"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="VEN_CODE"	 	  dataField="VEN_CODE"    	headerText="매입처코드"  		visible="true"  		editable="false"		textAlign="center"   width="85"      	/>\
				<DataGridColumn  id="VEN_NAME"	      dataField="VEN_NAME"    	headerText="매입처"           editable="false"		textAlign="left"   width="125"      	/>\
				<DataGridColumn  id="CFM_DT"	 	  dataField="CFM_DT"    		headerText="확정일자"  	visible="true"  		editable="false"		textAlign="center"   width="80"      	/>\
				<DataGridColumn  id="ITM_GB"	 	  dataField="ITM_GB"    		 	visible="false"  		editable="false"		textAlign="center"   width="75"      	/>\
	<DataGridColumn  id="SLIP_DIV_YN"	 	  dataField="SLIP_DIV_YN"    				  				visible="false"  		editable="false"	    	/>\
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

function setDecQtyCol()
{ 
    //	[ 확정수량 수정 가능/불가능 ]
	//	점포   로그인시 :  확정수량을 입력 불가능하게
	//	바이어 로그인시 :  확정수량을 입력 가능하게 
	//  DEC_QTY   : 수정가능한 확정수량 필드
	//  DEC_QTY_R : 수정 불 가능한 확정수량 필드  
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009")  // 바이어 로그인시 :  확정수량을 입력 가능하게 
	{   var DEC_QTY = gridRoot1.getObjectById("DEC_QTY");  
		DEC_QTY.editable = true; 
		
	} else {			//	점포   로그인시 :  확정수량을 입력 불가능하게
		 
		var DEC_QTY = gridRoot1.getObjectById("DEC_QTY");  
		DEC_QTY.editable = false; 
		
	}
	 
}


function secondLabelFunc(item, value, column) 
{
	// 점 로그인시 생식이거나 정 된것은   체크 못하게 해야함 <- 저장, 확정, 등을 못하게 하기위해서 
	if(   $("#SESSION_ROLE_ID").val() == "ROLE009"  ||  $("#SESSION_ROLE_ID").val() == "ROLE010"   )
	{    
		if (item.CFM_DT != undefined   )
		{	 return false;  }
		else
		{	 return true;   }
		
	} else {  // 점 로그인
		
		if(  item.ITM_GB == "1"  || item.CFM_DT != undefined   )
		{
			return false;
		} else {
			return true; 
		} 
		
	}
}

	
function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

 

function init() {
  
	 
	
	
	
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#ORD_DT_FROM").val()  >  $("#ORD_DT_TO").val()     )
			{   alert("검색할 발주 끝 일자는 시작 일자보다 작을수 없습니다.");
				$("#ORD_DT_FROM").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
		});
	 
	$(".datepicker2").datepicker({ onSelect: function(dateText) 
	 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#ORD_DT_FROM").val()  >  $("#ORD_DT_TO").val()     )
			{   alert("검색할 발주 끝 일자는 시작 일자보다 작을수 없습니다.");
			$("#ORD_DT_TO").val(CUR_DT);
				return;
			}	 
	 }, 	 showMonthAfterYear:true 
	});
 
	$(".datepicker").datepicker({ onSelect: function(dateText) 
		{ 	 
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if( CUR_DT  > this.value )
			{ 
				$("#ORD_DT").val( CUR_DT );
				alert("발주일자는 과거 일수 없습니다."); 
				return;  
			}
//			setOrderDay( );     
		}, showMonthAfterYear:true 
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
	

	//조회조건  from 발주일자는 시스템 날짜 - 1 해서 default 로 넣는다
	var ORD_DT_FROM = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#ORD_DT_FROM").val( ORD_DT_FROM );
	//조회조건  to 발주일자는 시스템 날짜   해서 default 로 넣는다
	var ORD_DT_TO = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#ORD_DT_TO").val( ORD_DT_TO );
	  
	//발주일자는 시스템 날짜   해서 default 로 넣는다
	var ORD_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#ORD_DT").val( ORD_DT );
	  
	//입고(납품)예정일자는 발주일자 + 1   해서 default 로 넣는다 
//	var PUR_DT = new CommDateManager().after(0, 0, 1).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
//	$("#PUR_DT").val( PUR_DT );
	
//	$("#VEN_NAME").attr("readonly" , false); 
	$( "#VEN_NAME" ).prop( "disabled", false );
	$('#MUST_ICON_VEN_NAME').show();	
	
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
 
 
function chgStrCode()
{ 
	getCentaCode();
}






// 입고예정일자 세팅하기
function setOrderDay()
{     
	if( $('#STR_CODE').val()  ==  ""  )
	{
		$('#PUR_DT').val(  ""  );  	
		return;
	}
	
	
	//  입고예정 요일 보여주기
	jQuery.ajax({ 
	    url:"/orderPurDtSelect.do",           // productCustomerInfoSelect
	    type:"POST",
		datatype:"json",
		async:true,
	 	data: {  
	 	   	     "STR_CODE"  :  $('#STR_CODE').val() 
	 	,   	 "BASE_DT"   :  $("#ORD_DT").val().replace(/-/g, "")  
	 	, 		 "TERM_DAY"  : 1  
	 	},
		success:function(data){
		  
			if(data.length > 0)
			{
				$('#PUR_DT').val(    data[0].BASE_DT   );  		
			} else {
				alert("휴일근무관리 프로그램에 해당 일자가 등록되지 않았습니다. 날짜를 등록하세요."); 
			} 
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	 

}

 
  

function  btn_pop_close(){ 
	 $( "#show_product_pop" ).dialog( 'close' );	 
}
 

function btn_save()
{ 
	
	
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009"  ||  $("#SESSION_ROLE_ID").val()    == "ROLE010")   
	{
		alert("바이어권한은  본 화면에서 점발주 하지 마십시요.\n단, 물류 발주만 가능 합니다.");
		 
	}
	
	
	
	
	if(  $('#ORD_DT' ).val() == ""  )
	{   alert("발주일자를 선택 하세요");
		$('#ORD_DT' ).focus();
		return;
	}
	 
	if(  $('#ROUTE_GB' ).val() == ""  )
	{   alert("배송구분을 선택 하세요");
		$('#ROUTE_GB' ).focus();
		return;
	}
	  
//	if( BTN_SAVE_BIT == "N")
//	{   
//		alert("선택하신 배송루트("+$("#ROUTE_GB option:selected").text()+")의  발주가능 시간이 종료 되었습니다.");
//		return;
//	}
	 
	if(  $('#PUR_GB' ).val() == ""  )
	{   alert("매입구분을 선택 하세요");
		$('#PUR_GB' ).focus();
		return;
	}
	
	if( $('#ROUTE_GB').val() != "R1"  )
	{ 	
		if(  $('#VEN_CODE' ).val() == ""  )
		{   alert("매입처를 선택 하세요");
			$('#VEN_NAME' ).focus();
			return;
		}
	}
	 
	
	// 빈 ROW 제거 - 저장시 행삭제 안하고 발주 할수있게 하기 위하여
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	for(var i=0 ; i < rowCnt.length ; i++)
	{
		if(     typeof gridRoot1.getItemFieldAt( i , "ITM_CODE") == 'undefined' 
			 || gridRoot1.getItemFieldAt( i , "ITM_CODE")    	 == "" 
		)
		{
			gridRoot1.removeItemAt( i );
		}		
	}	
	
	
	// 그리드에 대한 유효성 검사
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	if(rowCnt.length == 0)
	{   alert("등록된 발주상품이 없습니다.");
		return;
	}
	 
	for(var i=0 ; i < rowCnt.length ; i++)
	{   if( typeof gridRoot1.getItemFieldAt( i , "ITM_CODE") == 'undefined' || gridRoot1.getItemFieldAt( i , "ITM_CODE") == '' )
		{   alert("하단 그리드의 발주상품(스캔코드)을 등록  하세요");
			return;
		}
		if(  typeof  gridRoot1.getItemFieldAt( i , "ORD_QTY") == 'undefined' || gridRoot1.getItemFieldAt( i , "ORD_QTY") == '0' || gridRoot1.getItemFieldAt( i , "ORD_QTY") == ''  )
		{   alert("하단 그리드의 발주수량을 입력 하세요");
			return;
		} 
		
		// 스캔코드 6자리가 아닐때만  체크함. 
		var SCAN_CODE_LENGTH = gridRoot1.getItemFieldAt( i , "SCAN_CODE"  ) ; 
		SCAN_CODE_LENGTH = SCAN_CODE_LENGTH.length;
		
		// 
		var ITM_GB_VAL = gridRoot1.getItemFieldAt( i , "ITM_GB"  ) ; 
		if( SCAN_CODE_LENGTH != 6  )
		{
			// ITM_GB 가 공병(4) 혹은 (5) 인것은 원가 체크안함. 
			if ( !( ITM_GB_VAL == "4" ||  ITM_GB_VAL == "5" )  )
			{ 
					if( typeof gridRoot1.getItemFieldAt( i , "PUR_AVR_AMT") == 'undefined' || gridRoot1.getItemFieldAt( i , "PUR_AVR_AMT") == '0'  || gridRoot1.getItemFieldAt( i , "PUR_AVR_AMT") == '' )
					{   alert("하단 그리드의 단가(VAT포함)를 입력 하세요\n단, 공병 및 P-box는 단가가 없어도 됨.");
						return;
					} 
			}	
		}
		
	}   


	// 발주 헤더 신규 저장 위해 xml 만듦
	var orderStoreHeader = ""; 
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
    
	var ORD_DT		= xmlDoc.createElement('ORD_DT'); 
	var STR_CODE	= xmlDoc.createElement('STR_CODE');  
	var PUR_GB		= xmlDoc.createElement('PUR_GB');        // 매입구분
	var ROUTE_GB	= xmlDoc.createElement('ROUTE_GB');      // 배송구분
	var VEN_CODE	= xmlDoc.createElement('VEN_CODE');      // 협력업체코드
	var ORD_TYPE_GB	= xmlDoc.createElement('ORD_TYPE_GB');   // 발주형태구분 
	var MKT_GB		= xmlDoc.createElement('MKT_GB');        // 매장구분
	var PUR_DT		= xmlDoc.createElement('PUR_DT');        // 매입일자 
//	var ITM_GB		= xmlDoc.createElement('ITM_GB');        // 상품구분
	var CFM_YN		= xmlDoc.createElement('CFM_YN');   
	var SLIP_NO		= xmlDoc.createElement('SLIP_NO');  
	var REG_PATH		= xmlDoc.createElement('REG_PATH'); 
	
	SLIP_NO.appendChild( xmlDoc.createTextNode(     $("#SLIP_NO").val()     )	); 
	CFM_YN.appendChild( xmlDoc.createTextNode(     "N"     )	); 
    ORD_DT.appendChild( xmlDoc.createTextNode(     	$("#ORD_DT").val()      )	); 
    STR_CODE.appendChild( xmlDoc.createTextNode(    $("#STR_CODE").val()    )	); 
    PUR_GB.appendChild( xmlDoc.createTextNode(     	$("#PUR_GB").val()      )	); 
    ROUTE_GB.appendChild( xmlDoc.createTextNode(    $("#ROUTE_GB").val()    )	); 
    VEN_CODE.appendChild( xmlDoc.createTextNode(    $("#VEN_CODE").val()  	)	);   // "99999"   R1 일때만  박아준다. 하지만 프로시져 쿼리를 보면  유맥의 VEN_CODE 를 가져온다.  
    ORD_TYPE_GB.appendChild( xmlDoc.createTextNode( "2"        				)	);   // 발주형태구분    2(권고) 로 채우기 
    MKT_GB.appendChild( xmlDoc.createTextNode(     	"1"       				)	);   // 매장구분     1(매장)으로 채우기
    PUR_DT.appendChild( xmlDoc.createTextNode(     	$("#ORD_DT").val()      )	);   // 유맥의 요청으로  PUR_DT 에 ORD_DT를 넣음
//    ITM_GB.appendChild( xmlDoc.createTextNode(     	$("#ITM_GB").val()      )	); 
      
    
    
	// 업로드 주체가 바이어 인지 점포인지 구분. REG_PATH :   1- 점등록   , 2 -  바이어등록   
	var REG_PATH_VAR = "";
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009"  ||  $("#SESSION_ROLE_ID").val()    == "ROLE010")   
	{
		REG_PATH_VAR = "2";
	} else {
		REG_PATH_VAR = "1";
		
	}
    REG_PATH.appendChild( xmlDoc.createTextNode(     	REG_PATH_VAR	    )	); 
    
    

    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   REG_PATH		 ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   SLIP_NO		 ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   CFM_YN		 ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ORD_DT		 ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   STR_CODE	     ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   PUR_GB		 ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ROUTE_GB	     ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   VEN_CODE	     ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ORD_TYPE_GB	 ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   MKT_GB		 ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   PUR_DT		 );  
//    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	   ITM_GB	     );           
	            
    orderStoreHeader  =  "<GRIDLIST>"+getXmlString(   xmlDoc   )+"</GRIDLIST>" ; 
	
    
    

	 
    
    if(    $('#SLIP_DIV_YN').val()     == "N" )   // 전표분리 안함.
    { 
		    	// 발주 상품 등록 위해서 XML로 만듦   :  냉동 구분 안하고 전체를 XML 로 만든다.
		        var orderStoreDetail = ""; 
		    	var rowCnt  = gridRoot1.getCollection().getSource() ;  
		    	for(var i=0 ; i < rowCnt.length ; i++)
		    	{    orderStoreDetail = orderStoreDetail + getXmlString(   gridRoot1.getItemAt(i)   );      }  
		    	orderStoreDetail =  "<GRIDLIST>"+orderStoreDetail+"</GRIDLIST>" ;
		        
		    	 //   발주 전부 저장      
		    	jQuery.ajax({ 
		    	    url:"/orderStoreProductRegister.do",           
		    	    type:"POST",
		    		datatype:"xml",
		    		async:true,
		    		data: {    "CRUD_BIT"           : crudBit
		    		,	       "orderStoreHeader"   : orderStoreHeader   
		    		,		   "orderStoreDetail"   : orderStoreDetail   
		    	    }, 
		    		success:function(data){   
		    			if(  data[0].RETURN_CODE  == "0000")
		    			{    
		    				alert("발주 등록에 성공 하였습니다");
		    				 
		    			} else {
		    				alert("발주 등록에 실패 하였습니다!");
		    			}    
		    	    },
		    	    complete : function(data) { 
		    	    },
		    	    error : function(xhr, status, error) {
		    	    	CommonJs.alertErrorStatus(xhr.status, error);
		    	    }
		    	});
		    	
    } else {    // 전표분리 함.
		    	
		    	// 발주 상품 등록 위해서 XML로 만듬   :  냉동과 아닌경우로 나눈다.
		        var orderStoreDetailIce 	= ""; 
		        var orderStoreDetailNoneIce = ""; 
		        var orderStoreDetailIce_GRIDLIST 	 = ""; 
		        var orderStoreDetailNoneIce_GRIDLIST = ""; 
		    	var rowCnt  = gridRoot1.getCollection().getSource() ;  
		    	for(var i=0 ; i < rowCnt.length ; i++)
		    	{     
		    	    if(  gridRoot1.getItemFieldAt( i , "TPER_MTHD") == "2" )  // 냉동 : 2 인 경우와 아닌경우로 구분
		    		{
		    	    	 orderStoreDetailIce     = orderStoreDetailIce + getXmlString(   gridRoot1.getItemAt(i)   );    
		    		} else {
		    			 orderStoreDetailNoneIce = orderStoreDetailNoneIce + getXmlString(   gridRoot1.getItemAt(i)   );    
		    		}  
		    	}  
		    	orderStoreDetailIce_GRIDLIST	   =  "<GRIDLIST>"+orderStoreDetailIce+"</GRIDLIST>" ;
		    	orderStoreDetailNoneIce_GRIDLIST   =  "<GRIDLIST>"+orderStoreDetailNoneIce+"</GRIDLIST>" ;
		          
		    	
		    	var RETURN_CODE_ICE 	 = "";
		    	var RETURN_CODE_NONE_ICE = "";
		    	if( orderStoreDetailIce != ""  ) 
		    	{
			    		//   발주 저장     :  냉동
				    	jQuery.ajax({ 
				    	    url:"/orderStoreProductRegister.do",           
				    	    type:"POST",
				    		datatype:"xml",
				    		async:false,
				    		data: {    "CRUD_BIT"           : crudBit
				    		,	       "orderStoreHeader"   : orderStoreHeader   
				    		,		   "orderStoreDetail"   : orderStoreDetailIce_GRIDLIST   
				    	    }, 
				    		success:function(data){   
				    			
				    			RETURN_CODE_ICE = data[0].RETURN_CODE;
 
				    	    },
				    	    complete : function(data) { 
				    	    },
				    	    error : function(xhr, status, error) {
//				    	    	CommonJs.alertErrorStatus(xhr.status, error);
				    	    }
				    	});
		    		
		    	}
		    	if( orderStoreDetailNoneIce != ""  ) 
		    	{
		    		//   발주   저장   : 비냉동   
			    	jQuery.ajax({ 
			    	    url:"/orderStoreProductRegister.do",           
			    	    type:"POST",
			    		datatype:"xml",
			    		async:false,
			    		data: {    "CRUD_BIT"           : crudBit
			    		,	       "orderStoreHeader"   : orderStoreHeader   
			    		,		   "orderStoreDetail"   : orderStoreDetailNoneIce_GRIDLIST   
			    	    }, 
			    		success:function(data){  
			    			
			    			RETURN_CODE_NONE_ICE= data[0].RETURN_CODE;
			    			  
			    	    },
			    	    complete : function(data) { 
			    	    },
			    	    error : function(xhr, status, error) {
//			    	    	CommonJs.alertErrorStatus(xhr.status, error);
			    	    }
			    	});
		    		
		    	}
		    	
		    	 
		    	if( RETURN_CODE_ICE  == "0000"  || RETURN_CODE_NONE_ICE  == "0000"  )
		    	{
    				 
    				alert("발주 등록에 성공 하였습니다!");
    				 
		    	} else {
		    		
		    		alert('발주 등록에 실패 하였습니다');
		    		
		    	}
		    	
    }  // end else if
    
     
     
	
}




//조회 조건절의   (협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	  
	$("#P_CALLBACK_NM1").val('fn_comm_supply_callback(dataRow11)');
	if($("#VEN_NAME").val() != null && $("#VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#VEN_NAME").val());
		btn_comm_search('3');
	} 
	 
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize(); 
	
}  

//상품상세 부분 내에서의 (협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow)
{ 

	$('#VEN_NAME').val(dataRow.VEN_NAME);		// 협력업체명
	$('#VEN_CODE').val(dataRow.VEN_CODE);		// 협력업체코드 
	 
	// 점포가 하남 물류이고 R1이면서 매입처가 하남물류(10000) 이면 입력 못하게 한다.
	if(     $('#STR_CODE').val() == "10030"  
		&&  $('#ROUTE_GB').val() == "R1"   
	    &&  dataRow.VEN_CODE     == "10000"   
	)
	{
		alert("하남물류에서 R1 상품을 하남물류로 발주 할수 없습니다. ");
		$('#VEN_CODE').val("");
		$('#VEN_NAME').val("");
		return;
	}
	
	
	
	$('#SLIP_DIV_YN').val(dataRow.SLIP_DIV_YN);		// 전표분할여부
	 
//	$("#VEN_NAME").attr("readonly" , true);  
	 $( "#VEN_NAME" ).prop( "disabled", true ); 
	$('#VEN_SEARCH_BTN').hide();
	
	if( dataRow.GRE_GB == "2" )
	{ 
		alert("임대을 협력업체의 상품은 발주 할수 없습니다.")  ;
		$('#VEN_NAME').val("");		// 협력업체명
		$('#VEN_CODE').val("");		// 협력업체코드 
		$('#SLIP_DIV_YN').val("");	//  보관방법
//		$("#VEN_NAME").attr("readonly" , false);  
		 $( "#VEN_NAME" ).prop( "disabled", false ); 
		$('#VEN_SEARCH_BTN').show();
		return;
	}	

}


function chgVenName()
{ 
//	// 점포가 하남 물류이고 R1이면서 매입처가 하남물류(10000) 이면 입력 못하게 한다.
//	if(     $('#STR_CODE').val() == "10030"  
//		&&  $('#ROUTE_GB').val() == "R1"   
//	    &&  $('#VEN_CODE').val() == "10000"   
//	)
//	{
//		alert("하남물류에서 R1 상품을 하남물류로 발주 할수 없습니다. ");
//		$('#VEN_CODE').val("");
//		$('#VEN_NAME').val("");
//		return;
//	}
	
	
	if(  $.trim(  $('#VEN_NAME').val("")  ) == ""  )
	{ 
//		$('#VEN_NAME').val("");		// 협력업체명
//		$('#VEN_CODE').val("");		// 협력업체코드 
//		$('#SLIP_DIV_YN').val("");	//   전표분할여부
	}  
	
	
	
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
	$( "#ORD_DT" ).datepicker( "option", "disabled", false );
	$("input[name=ORD_DT]").attr("readonly",true);
	
	
	// 조회조건 초기화
	$("form").each(function() {  
        if(this.id == "frmSearch") this.reset();  
    });
	
	init();
	
	
	
	// 배송구분 초기화 후, 선택 넣고 다시 그려주고, R3 를 뺀다. 
	$('#ROUTE_GB').find('option').remove().end().append('<option value="">선택</option>').val(''); 
	getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	);  
//	$("#ROUTE_GB  option[value='R3']").remove();    // 배송구분에서 R3 는 뺀다.
	
	// 매입구분  초기화 후, 선택 넣고 다시 그려준다
	$('#PUR_GB').find('option').remove().end().append('<option value="">선택</option>').val(''); 
	getCommonCodeSelectBoxList("PUR_GB"  ,   "PUR_GB"	);  
	 
	
	

    $('#VEN_NAME').attr('disabled',false);
	$('#VEN_SEARCH_BTN').show();
	 
	 
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
	var P_STR_DT_ARR	= $("#ORD_DT_FROM").val().split("-");
	var P_END_DT_ARR 	= $("#ORD_DT_TO").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	
	$("#btn_save").show(); 
	$("#btn_add").show();
	$("#btn_del").show();
	
	
	if(  $("#S_STR_CODE").val() == ""   )
	{   alert("조회 점포를 선택  하세요.");
		$("#S_STR_CODE").focus();
		return;
	}
	
	if(  $("#ORD_DT_FROM").val() == ""   )
	{   alert("검색할 발주 일자를 선택  하세요.");
		$("#ORD_DT_FROM").focus();
		return;
	}
	
	if(  $("#ORD_DT_TO").val() == ""   )
	{   alert("검색할 발주 일자를 선택  하세요.");
		$("#ORD_DT_TO").focus();
		return;
	}
	
	//유효성검사
	if(dateDiff1 > 185) {
		alert("기준기간 185일 이상은 조회하실 수 없습니다.");
		$("#ORD_DT_FROM").focus();
		return;
	}


	// 발주 헤더 리스트 보여주기 - grid1 
	jQuery.ajax({ 
	    url:"/orderHeadSearch.do",          
	    type:"POST",
		datatype:"json",
		async:false,
		data: {  	"STR_CODE"     : $("#S_STR_CODE").val() 
		,			"ORD_DT_FROM"  : $("#ORD_DT_FROM").val() 
		,			"ORD_DT_TO"    : $("#ORD_DT_TO").val() 
		,			"ROUTE_GB"     : $("#S_ROUTE_GB").val()  
		,			"CFM_YN"       : $("#S_CFM_YN").val()  
		,			"PUR_GB"       : $("#S_PUR_GB").val()  
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

//function getTimeDiff(MGMT_ENTRY  , CUR_TIME )
//{
//	var  DIFF  = MGMT_ENTRY - CUR_TIME ; 
//	if(DIFF < 0) { DIFF = DIFF * -1 ;} 
//	DIFF =   LPAD( ""+DIFF  ,'0',6);  // 스트링으로 바꾸기 위해서 "" 붙임.
//	var  DIFF_H = DIFF.substring(0, 2);
//	var  DIFF_M = DIFF.substring(2, 4);
//	var  DIFF_S = DIFF.substring(4, 6); 
//	return DIFF_H +"시 "+ DIFF_M +"분 "+  DIFF_S +"초";
//}

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



// 매입구분 : 한번 선택하면 못 바꾸게 하기
function chgPurGb()
{  
	  
	$("#PUR_GB    option[value!='"+$("#PUR_GB").val()+"']").remove(); 
	
}
function chgMustIcon()
{
	
	if(  $('#ROUTE_GB').val()  == "R1" )
	{
		 $('#MUST_ICON_VEN_NAME').hide();
		
	} else {
		
		 $('#MUST_ICON_VEN_NAME').show();		
	}
		
		

}

// 배송루트 변경으로 발주가능 시간 보여주기 변경 <- 화면에서 제거함
// 점 로그인시  ( 점포 선택): R1 일때 매입처는 유맥을 (VEN_CODE / VEN_NAME 넣어주기)박아주기
// 바이어 로그인 시 (하남물류선택) :   R1 일때 매입처는 입력할수있게  
function chgRouteGb()
{   
	
	if(  $('#STR_CODE').val()  == "" )
	{   alert('점포를 선택 하세요');
		$("#ROUTE_GB").val("");
		$('#STR_CODE').focus();
		return;
	}
	
	
	//   점포가 하남물류가 아니고,  ROUTE_GB 가  R1 일때  매입처를 물류센터 박아주는 로직     ( 점포 선택 시에만 물류센터 박아주는 로직 수행  )
	if(   $('#STR_CODE').val()   !=   "10030"  )
	{
		  
				if( $("#ROUTE_GB").val()  == "R1" )
				{    
						//  R1 일때 유맥 ven_code 및 ven_name가져오기
						jQuery.ajax({ 
							    url:"/getVenInfoR1.do",            
							    type:"POST",
								datatype:"json",
								async:true,
							 	data: {  
							 	   	     "STR_CODE"  : $('#STR_CODE').val()  
							 	},
								success:function(data){ 
									 $('#VEN_CODE').val( data[0].VEN_CODE   );
									 $('#VEN_NAME').val( data[0].VEN_NAME   ); 
									 $('#SLIP_DIV_YN').val(data[0].SLIP_DIV_YN  );
							    },
							    complete : function(data) { 
							    },
							    error : function(xhr, status, error) {
							    	CommonJs.alertErrorStatus(xhr.status, error);
							    }
						});
						 
						$('#VEN_NAME').attr('disabled',true);
						$('#VEN_SEARCH_BTN').hide();
					  
				} else  { 
					
						$('#VEN_CODE').val("");
						$('#VEN_NAME').val("");
						$('#SLIP_DIV_YN').val("");
				
						$("input[name=VEN_NAME]").attr("readonly",false);
						$('#VEN_NAME').attr('disabled',false);
					 	$('#VEN_SEARCH_BTN').show();
				 	  
				}
				
//				$('#VEN_CODE').val("");
//				$('#VEN_NAME').val("");
//				$('#SLIP_DIV_YN').val("");
//		
//				$("input[name=VEN_NAME]").attr("readonly",false);
//				$('#VEN_NAME').attr('disabled',false);
//			 	$('#VEN_SEARCH_BTN').show();
				
	}
	 
	
	// 배송루트 한번 변경 시, 다른것으로 변경 못하게 한다. 
	$("#ROUTE_GB    option[value!='"+$("#ROUTE_GB").val()+"']").remove(); 
	  
	
	
	
//	// ROUTE_GB 병경으로 인한 발주가능시간 구하기
//	// 발주 불가능일때 저장버튼 disable 한다.
//	jQuery.ajax({ 
//	    url:"/getCommonMgmtEntry.do",           
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
	 
}


// 그리드 2 의 ROW 클릭시 발생
function orderHeadDtailInfo(  STR_CODE , SLIP_NO  , PUR_GB  , SLIP_DIV_YN )
{ 
	// 이 함수 하단에서 ROUTE_GB 를 선택 못하게 했으므로 , 항상 이 함수 수행시 ROUTE_GB 코드를 새로 뿌려줘야 한다. ( grid2 의 다른 row 가 선택 되므로...)
 
	$('#SLIP_DIV_YN').val(	SLIP_DIV_YN 	); 
	 
	$("select[name='ROUTE_GB'] option").remove();    			// ROUTE_GB 초기화   
	getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	);   //ROUTE_GB 다시 채움
	 
	// 발주헤더 정보 보여주기
	jQuery.ajax({ 
	    url:"/orderHeadInfo.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		
	 	data: {    "SLIP_NO"  : SLIP_NO
	 	},
		success:function(data){
		  
			$('#ORD_DT').val( 	data[0].ORD_DT.substr(0,4) + "-" + data[0].ORD_DT.substr(4,2) + "-" + data[0].ORD_DT.substr(6,2)  );
//			$('#PUR_DT').val( 	data[0].PUR_DT.substr(0,4) + "-" + data[0].PUR_DT.substr(4,2) + "-" + data[0].PUR_DT.substr(6,2)  ); 
	 		$('#ROUTE_GB').val(	data[0].ROUTE_GB	); 
//	 		$('#ITM_GB').val(	data[0].ITM_GB		); 
	 		$('#PUR_GB').val(	data[0].PUR_GB		); 
	 		$('#SLIP_NO').val(	SLIP_NO				); 
	  		
	 		// 확정일자 유무에 따라서 각종 저장버튼 보이고 안보이게 하기
	 		if(  typeof data[0].CFM_DT  == "undefined"   ||  data[0].CFM_DT == "" )
	 		{
//	 			$('#CFM_YN').val(  'N'	); 
	 			 
	 			$("#btn_save").show(); 
	 			$("#btn_add").show();
	 			$("#btn_del").show();
	 			
	 		} else {
	 			
//	 			$('#CFM_YN').val(  'Y'  ); 
	 			
	 			$("#btn_save").hide(); 
	 			$("#btn_add").hide();
	 			$("#btn_del").hide();
	 		}
			   
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	// 발주 헤더 보여줄 시 배송구분과  발주일자는 수정 못하게 한다.
	// 배송구분과  발주일자는 수정시 변경 되면 안되므로 
	$( "#ORD_DT" ).datepicker( "option", "disabled", true );
	$("input[name=ORD_DT]").attr("readonly",true);
	
	$("#ROUTE_GB  option[value!='"+$("#ROUTE_GB").val()+"']").remove(); 
     
	// 발주상품 리스트 정보 보여주기 - grid2 
	jQuery.ajax({ 
	    url:"/orderDetailInfo.do",           
	    type:"POST",
		datatype:"xml",
		async:true,
		beforeSend : function(){   
            gridRoot1.addLoadingBar(); 
	    }, 
		data: {   "STR_CODE"  : STR_CODE  , "SLIP_NO"  : SLIP_NO    },
		success:function(data){  
		 	
			//그리드1 초기화 
			gridRoot1.removeAll( );
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
				var CRUD 		    = xmlDoc.createElement('CRUD'); 
				var SLIP_NO         = xmlDoc.createElement('SLIP_NO'); 
				var STR_CODE		= xmlDoc.createElement('STR_CODE'); 
				var ITM_CODE		= xmlDoc.createElement('ITM_CODE'); 
				var SCAN_CODE		= xmlDoc.createElement('SCAN_CODE'); 
				var ITM_NAME		= xmlDoc.createElement('ITM_NAME'); 
				var UNIT_NM 		= xmlDoc.createElement('UNIT_NM'); 
				var IPSU_QTY		= xmlDoc.createElement('IPSU_QTY'); 
				var DP_PRC_UNIT     = xmlDoc.createElement('DP_PRC_UNIT'); 
				var ORD_QTY 		= xmlDoc.createElement('ORD_QTY'); 
				var ORD_FLAG		= xmlDoc.createElement('ORD_FLAG'); 
				var ORD_FLAG_NM 	= xmlDoc.createElement('ORD_FLAG_NM'); 
				var SALE_QTY		= xmlDoc.createElement('SALE_QTY'); 
				var INV_END_QTY 	= xmlDoc.createElement('INV_END_QTY'); 
				var CENTER_INV_END_QTY 	= xmlDoc.createElement('CENTER_INV_END_QTY'); 
				var DEC_QTY 		= xmlDoc.createElement('DEC_QTY'); 
				var TAX_GB  		= xmlDoc.createElement('TAX_GB'); 
				var TAX_GB_NM		= xmlDoc.createElement('TAX_GB_NM'); 
				var PUR_AVR_AMT 	= xmlDoc.createElement('PUR_AVR_AMT'); 
				var WSPRC			= xmlDoc.createElement('WSPRC'); 
				var WVAT 			= xmlDoc.createElement('WVAT'); 
				var SPRC 			= xmlDoc.createElement('SPRC'); 
				var BOT_SPRC		= xmlDoc.createElement('BOT_SPRC'); 
				var BOT_SPRC_TOT	= xmlDoc.createElement('BOT_SPRC_TOT'); 
				var UPTAE_FLAG_NM	= xmlDoc.createElement('UPTAE_FLAG_NM'); 
				var VEN_CODE		= xmlDoc.createElement('VEN_CODE'); 
				var VEN_NAME		= xmlDoc.createElement('VEN_NAME'); 
				var AVAIL_AMT		= xmlDoc.createElement('AVAIL_AMT'); 
				var ORD_DT  		= xmlDoc.createElement('ORD_DT'); 
		 		
				var TPER_MTHD  		= xmlDoc.createElement('TPER_MTHD'); 
				var TPER_MTHD_NM    = xmlDoc.createElement('TPER_MTHD_NM'); 
				var ITM_GB  		= xmlDoc.createElement('ITM_GB'); 
				
				
				
				CRUD.appendChild(  			xmlDoc.createTextNode(  ""          			)	);
				SLIP_NO.appendChild(  		xmlDoc.createTextNode( 	data[i].SLIP_NO  	    )	);
				STR_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].STR_CODE     	)	);
				ITM_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_CODE    	)	);
				SCAN_CODE.appendChild(  	xmlDoc.createTextNode( 	data[i].SCAN_CODE     	)	);
				ITM_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_NAME     	)	);
				
				var UNIT_NM_VAL = "";
				if(  typeof data[i].UNIT_NM  == "undefined")
				{
					UNIT_NM_VAL = " ";
				} else {
					UNIT_NM_VAL = data[i].UNIT_NM; 
				}
				
				UNIT_NM.appendChild(  		xmlDoc.createTextNode(  UNIT_NM_VAL     	)	);
				IPSU_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].IPSU_QTY   		)	);
				DP_PRC_UNIT.appendChild(  	xmlDoc.createTextNode( 	data[i].DP_PRC_UNIT   	)	);
				
				
				
				TPER_MTHD.appendChild(  	xmlDoc.createTextNode( 	data[i].TPER_MTHD      	)	);
				TPER_MTHD_NM.appendChild(  	xmlDoc.createTextNode( 	data[i].TPER_MTHD_NM   	)	);
				ORD_FLAG.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_FLAG      	)	);
				ORD_FLAG_NM.appendChild(  	xmlDoc.createTextNode( 	data[i].ORD_FLAG_NM   	)	);
				SALE_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].SALE_QTY    	)	);
				INV_END_QTY.appendChild(  	xmlDoc.createTextNode( 	data[i].INV_END_QTY 	)	); 
				CENTER_INV_END_QTY.appendChild(  	xmlDoc.createTextNode( 	data[i].CENTER_INV_END_QTY 	)	); 
				TAX_GB.appendChild(  		xmlDoc.createTextNode( 	data[i].TAX_GB   		)	);
				TAX_GB_NM.appendChild(  	xmlDoc.createTextNode( 	data[i].TAX_GB_NM    	)	);
				ITM_GB.appendChild(  	xmlDoc.createTextNode( 	data[i].ITM_GB    	)	);
				
				
				
				//  대출원가, 부가세 계산  		 	
				var priceVat = calPriceVat( data[i].PUR_AVR_AMT , data[i].TAX_GB  ); 
				 
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
				ORD_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_QTY      	    )	);
				DEC_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].DEC_QTY             )	);
				
				PUR_AVR_AMT.appendChild(  	xmlDoc.createTextNode( 	parseFloat(data[i].WPRC ) +  parseFloat(data[i].WVAT)   			)	);   // 단가( VAT 포함)
				WSPRC.appendChild(  		xmlDoc.createTextNode( 	data[i].WPRC   				)	);   // 대출원가
				WVAT.appendChild(  			xmlDoc.createTextNode( 	data[i].WVAT     			)	);   // 부가세
				
				SPRC.appendChild(  			xmlDoc.createTextNode( 	data[i].SPRC 				)	);
				BOT_SPRC.appendChild(  		xmlDoc.createTextNode( 	data[i].BOT_SPRC			)	);
				
				
				
				BOT_SPRC_TOT.appendChild(  	xmlDoc.createTextNode( 	data[i].BOT_SPRC_TOT		)	);
				UPTAE_FLAG_NM.appendChild(	xmlDoc.createTextNode( 	data[i].UPTAE_FLAG_NM		)	);
				VEN_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_CODE      		)	);
				VEN_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_NAME       		)	);
				AVAIL_AMT.appendChild(  	xmlDoc.createTextNode( 	data[i].AVAIL_AMT 		)	);
				ORD_DT.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_DT        		)	);
 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CRUD          	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SLIP_NO       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_CODE      	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE     	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( UNIT_NM       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IPSU_QTY       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( DP_PRC_UNIT   	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_FLAG       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_FLAG_NM    	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SALE_QTY      	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( INV_END_QTY   	);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CENTER_INV_END_QTY   	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( DEC_QTY        	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TAX_GB         	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TAX_GB_NM      	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_AVR_AMT    	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( WSPRC          	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( WVAT           	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SPRC         	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOT_SPRC       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOT_SPRC_TOT     );  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( UPTAE_FLAG_NM 	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE     	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_NAME       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( AVAIL_AMT    	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT          	);   				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TPER_MTHD_NM    	);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TPER_MTHD      	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB      	);   
				
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
	 
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		// 확정수량(DEC_QTY)을 금액에 곱해줘야 한다.	  
		DEC_QTY = gridRoot1.getItemFieldAt( i , "DEC_QTY");
		
		// 대출원가
		if( gridRoot1.getItemFieldAt( i , "TAX_GB")  == "1" )  // 과세
		{
			WSPRC_TAX_ADD  = parseFloat(WSPRC_TAX_ADD)  + ( DEC_QTY * parseFloat(gridRoot1.getItemFieldAt( i , "WSPRC"))   );
		} else {   // 면세
			WSPRC_TAX_FREE = parseFloat(WSPRC_TAX_FREE) + ( DEC_QTY * parseFloat(gridRoot1.getItemFieldAt( i , "WSPRC"))   );
		} 
		WVAT 		 = parseFloat(WVAT) 		+  ( DEC_QTY * parseFloat(gridRoot1.getItemFieldAt( i , "WVAT"))   );  
		SPRC 		 = parseFloat(SPRC) 		+  ( DEC_QTY * parseFloat(gridRoot1.getItemFieldAt( i , "SPRC"))   );  
		BOT_SPRC_TOT = parseFloat(BOT_SPRC_TOT) +  (           parseFloat(gridRoot1.getItemFieldAt( i , "BOT_SPRC_TOT"))   );   
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
	$("#TOT_WSPRC_TAX_FREE").val( WSPRC_TAX_FREE * pur_gb_minus);
	
	// 기존 
//	$("#TOT_WSPRC_TAX_ADD").val( parseFloat(WSPRC_TAX_ADD) *  parseFloat(pur_gb_minus) );   // 과세원가 금액합계 
//	$("#TOT_WVAT").val( WVAT * pur_gb_minus );   // 부가세 금액합계
	
	
	// 수정
	$("#TOT_WSPRC_TAX_ADD").val(    ( parseFloat(WSPRC_TAX_ADD)  +  parseFloat(WVAT) )  - Math.floor( (parseFloat(WSPRC_TAX_ADD)  +  parseFloat(WVAT)  ) / 11 )    );
	$("#TOT_WVAT").val(      Math.floor( (parseFloat(WSPRC_TAX_ADD)  +  parseFloat(WVAT)  ) / 11 )   );
	
	
	// 구입 금액합계
	$("#TOT_PRICE").val( (  parseFloat(WSPRC_TAX_FREE)  +  parseFloat(WSPRC_TAX_ADD)  +  parseFloat(WVAT)   ) * pur_gb_minus);
	
	
  
	
	
	
	// 매가 금액합계
	$("#TOT_SPRC").val( SPRC * pur_gb_minus);
	 
	// 공병 금액합계 
	$("#BOT_SPRC_TOT").val( BOT_SPRC_TOT * pur_gb_minus );
	 
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
		WSPRC_VAL = PUR_AVR_AMT- Math.floor( PUR_AVR_AMT / 11 ) ;  
		WVAT_VAL =    Math.floor( PUR_AVR_AMT / 11 ) ; 
		 
	} else {        // 면세 
		WSPRC_VAL  = PUR_AVR_AMT ; 
		WVAT_VAL = 0 ; 
	} 
	return [ PUR_AVR_AMT , WSPRC_VAL , WVAT_VAL];
}



// 선택한 점포의 물류코드를 가져온다.
function getCentaCode()
{ 
	if( $('#STR_CODE').val()  != "" )
	{
			jQuery.ajax({ 
			    url:"/getCentaCode.do",         
			    type:"POST",
				datatype:"json",
				async:false,
			 	data: {   "STR_CODE"  : $('#STR_CODE').val()  },
				success:function(data){
				   
					$('#CENTA_CODE').val( data[0].CENTA_CODE ); 
					 
			    },
			    complete : function(data) {
			    	 
			    },
			    error : function(xhr, status, error) {  
			    }
			});
		
	}
	  
}


function itemDataChangeHandler1(event) {
	  
	var rowIndex 	= event.rowIndex;					// 변경된 행번호
//	var columnIndex = event.columnIndex;				// 변경된 열번호
	var dataField 	= event.dataField;					// 변경된 열의 데이터 필드
//	var dataRow 	= gridRoot1.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue 	= event.value;						// 변경전 값
	var newValue 	= event.newValue;					// 변경후 값
//	var dataGrid 	= gridRoot1.getDataGrid();
	 
	if( dataField == "SCAN_CODE"   )    
	{   if( newValue == "" )
		{  return; } 
	} 
	if( dataField == "DEC_QTY"    )   
	{   if( newValue == "" )
		{  return; } 
	} 
	if( dataField == "ORD_QTY"   )    
	{   if( newValue == "" )
		{  return; } 
	}    
	 
	// 발주수량 수정  및 행추가 기능
	if(   dataField == "ORD_QTY"  ) {  
		
//		// 발주껀이 반품일때는 음수만 입력해야 한다. 0 제외
//	    var  selectedIndex = dataGrid2.getSelectedIndex()   ;
//		if( gridRoot2.getItemFieldAt( selectedIndex , "PUR_GB")    == "2"  )  // 반품 발주일 경우  
//		{ 
//				if( parseInt(newValue) >= parseInt( 0 ) )
//				{   alert("반품 발주의 상품 수량은 음수이여야만 합니다.");
//					gridRoot1.setItemFieldAt( oldValue  , rowIndex, "ORD_QTY"); 
//					return;
//				} 
//		} else {  // 매입 일경우
//				if( parseInt(newValue) <= parseInt( 0 ) )
//				{   alert("매입 발주의 상품 수량은 양수이여야만 합니다.");
//					gridRoot1.setItemFieldAt( oldValue  , rowIndex, "ORD_QTY"); 
//					return;
//				}  
//		}
		
		if( parseInt(newValue) <= parseInt( 0 ) )
		{   alert("매입 발주의 상품 수량은 양수이여야만 합니다.");
			gridRoot1.setItemFieldAt( oldValue  , rowIndex, "ORD_QTY"); 
			return;
		}  
		
		// 공병 금액 계산해서 보여주기 :  IPSU_QTY(입수)  * ORD_QTY(발주수량) * BOT_SPRC(공병단가)  = BOT_SPRC_TOT(공병금액) 
		var IPSU_QTY = gridRoot1.getItemFieldAt( rowIndex , "IPSU_QTY") ;
		var ORD_QTY  = newValue ;
		var BOT_SPRC = gridRoot1.getItemFieldAt( rowIndex , "BOT_SPRC") ; 
		gridRoot1.setItemFieldAt( IPSU_QTY * ORD_QTY * BOT_SPRC  , rowIndex, "BOT_SPRC_TOT"); 
		gridRoot1.setItemFieldAt(  ORD_QTY  , rowIndex, "DEC_QTY"); 
		setTotalSum();
		
		// 상품 선택이 있고, 수량 없을때  -> 행추가  // 유재훈
		if(     typeof gridRoot1.getItemFieldAt(rowIndex , "ITM_CODE")   !=   'undefined' 
			 && typeof oldValue   										 ==   'undefined'
		)
		{   // 발주수량을 처음 입력 할때만 행 추가 
			gridHolder1AddRow();  
		}   
		 
	}
	
	
	// 확정 수량 변경시 합계 토탈 다시계산 
	if(   dataField == "DEC_QTY"  ) {  
		setTotalSum();
	}
	
	// 단가   수정
	if(   dataField == "PUR_AVR_AMT"  ) {  
		 
//		// 발주껀이 반품일때는 음수만 입력해야 한다. 0 제외
//	    var  selectedIndex = dataGrid2.getSelectedIndex()   ;
//		if( gridRoot2.getItemFieldAt( selectedIndex , "PUR_GB")    == "2"  )  // 반품 발주일 경우  
//		{ 
//				if( parseInt(newValue) >= parseInt( 0 ) )
//				{   alert("반품 발주의 상품 단가는 음수이여야만 합니다.");
//					gridRoot1.setItemFieldAt( oldValue  , rowIndex, "PUR_AVR_AMT"); 
//					return;
//				} 
//		} else {  // 매입 일경우
//				if( parseInt(newValue) <= parseInt( 0 ) )
//				{   alert("매입 발주의 상품 단가는 양수이여야만 합니다.");
//					gridRoot1.setItemFieldAt( oldValue  , rowIndex, "PUR_AVR_AMT"); 
//					return;
//				}  
//		}
		
		
		
		if( typeof gridRoot1.getItemFieldAt(rowIndex , "TAX_GB")   ==   'undefined' )
		{   alert('상품을 선택 하세요.');
			return;			
		}		
		 
		if(  parseInt(  newValue ) >  parseInt( gridRoot1.getItemFieldAt( rowIndex , "SPRC"  ))   )
		{ 
			// 6자리 생식은 제외. 0 을 입력해도 되므로, 6자리일경우 스킵한다.
			var SCAN_CODE_LENGTH = gridRoot1.getItemFieldAt( rowIndex , "SCAN_CODE"  ) ; 
			SCAN_CODE_LENGTH = SCAN_CODE_LENGTH.length;
			if(  SCAN_CODE_LENGTH  != 6 )
			{ 
				alert('단가는 매가보다 클수 없습니다.');
				gridRoot1.setItemFieldAt( oldValue , rowIndex  , "PUR_AVR_AMT"  ); 
				return;
				
			} 
		}
		
 
		var priceVat = calPriceVat( newValue , gridRoot1.getItemFieldAt( rowIndex , "TAX_GB"  )   );		 
		gridRoot1.setItemFieldAt( priceVat[0]  				, rowIndex, "PUR_AVR_AMT");     // 단가 
		gridRoot1.setItemFieldAt( priceVat[1]  				, rowIndex, "WSPRC");   		// 대출원가
		gridRoot1.setItemFieldAt( priceVat[2]  				, rowIndex, "WVAT");    		// 부가세
		
		if( newValue  == ""  ||   newValue  == "0"  ||  typeof newValue == "undefined"  || $.trim( newValue )  == ""    )
		{
	 			gridRoot1.setItemFieldAt( "0" , rowIndex  , "PUR_AVR_AMT"  );  
	 			gridRoot1.setItemFieldAt( "0" , rowIndex  , "WSPRC"  );  
		} 
		
		
		setTotalSum();
		
		 
		
	}
	 
	//	바코드 중복 검사 
	if(   dataField == "SCAN_CODE"  ) {  
		// 유재훈
		var value = {};
	     
		var SCAN_CODE = gridRoot1.getItemFieldAt( rowIndex , "SCAN_CODE");
		SCAN_CODE = newValue;   // 유재훈
		 
		if( typeof SCAN_CODE   != 'undefined' )
		{
			SCAN_CODE = SCAN_CODE.replace('@',"");  
			SCAN_CODE = SCAN_CODE.replace(/\s+/, "");//왼쪽 공백제거
			SCAN_CODE = SCAN_CODE.replace(/\s+$/g, "");//오른쪽 공백제거
			SCAN_CODE = SCAN_CODE.replace(/\n/g, "");//행바꿈제거
			SCAN_CODE = SCAN_CODE.replace(/\r/g, "");//엔터제거 
			  
			gridRoot1.setItemFieldAt( SCAN_CODE , rowIndex, "SCAN_CODE");  
			if( orderProductDup( SCAN_CODE ) >= 1 )
			{ 	
				gridRoot1.setItemFieldAt( oldValue  , rowIndex, "SCAN_CODE"); 
				alert("입력 한 "+SCAN_CODE+" 상품코드는  이미 등록 되었습니다."); 
				return;  
			}  else {
				  
				// ?????? [[  아래와 같이 처리하면 점에서 발주 상품 조회 및 추가시 조회가 되지 않아서 주석 처리함.  ]]
				//  점발주등록(R1/R2/R3) 와 엑셀 발주(수정) 만 해당. R2 상품은 물류 단가들을 가져와야 하기 때문에 
				//  발주에서 R2 일 경우, 발주할 상품 조회시 접속한 점상품이 아니고   물류(10030)상품을 조회 해야 한다. 
				//
				var STR_CODE_VAL = "";
				if(  $('#ROUTE_GB').val()  == "R2" )
				{
					STR_CODE_VAL = $('#CENTA_CODE').val();
				} else {
					STR_CODE_VAL = $('#STR_CODE').val();
				}
				
				 
				// 점별 바코드 상세 ajax 로 뿌리기 -- 시작 
				jQuery.ajax({ 
				    url:"/orderStoreProductSelect.do",              
				    type:"POST",
					datatype:"json",
					async:false,
				 	data: {   "SCAN_CODE"  : SCAN_CODE
				 	,         "STR_CODE"   :  STR_CODE_VAL   // $('#STR_CODE').val()
				 	,         "ROUTE_GB"   : $('#ROUTE_GB').val()   
				 	,         "PUR_GB"     : $('#PUR_GB').val()   
				 	,         "VEN_CODE"   : $('#VEN_CODE').val()  
				 	},
					success:function(data){
				  
						// 점포 상품 상세   - 일치하는것이 하나일 때는 그냥 뿌려준다.
						if(  data.length == 1 )
						{   
							 
							setOrderProduct(
									  rowIndex
									, data[0].ORD_TERM   
									, $('#STR_CODE').val()    //  R2 상품 일 경우 물류센터에서 상품 상세를 가져와야 한다. 그런데 물류코드가 아닌 점포코드를 넣어야 하므로 로그인한 점포코드를 넣어줬음          data[0].STR_CODE 
									, data[0].ITM_CODE		 
									, data[0].SCAN_CODE	 
									, data[0].ITM_NAME	 
									, data[0].UNIT_NM		 
									, data[0].IPSU_QTY	 
									, data[0].DP_PRC_UNIT 
									, data[0].ORD_QTY		 
									, data[0].ORD_FLAG	 
									, data[0].ORD_FLAG_NM    
									, data[0].SALE_QTY	 
									, data[0].INV_END_QTY    
									, data[0].CENTER_INV_END_QTY    
									, data[0].DEC_QTY 	 
									, data[0].TAX_GB			 
									, data[0].TAX_GB_NM		 
									, data[0].SPRC	 
									, data[0].PUR_AVR_AMT  		 
									, data[0].BOT_SPRC			 
									, data[0].BOT_SPRC_TOT 		 
									, data[0].UPTAE_FLAG_NM 
									, data[0].VEN_CODE	 
									, data[0].VEN_NAME 
									, data[0].AVAIL_AMT  
									,  data[0].TPER_MTHD
									,  data[0].TPER_MTHD_NM
									
									,  data[0].WPRC
									,  data[0].WVAT
									,  data[0].ITM_GB
									
							);
							// 발주 수량 셀 편집 모드 변경  // 유재훈
							value.rowIndex = rowIndex;         // 이동할 행의 index 입니다.
						    value.columnIndex = 11;    // 이동할 열의 index 입니다.
						    dataGrid1.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
							    	
						} else if(  data.length >= 2 ){
							
							 
							// 상품 팝업을 띄운다.   
						    btn_comm_store_route_gb_product_search(   rowIndex 
													    		   ,   STR_CODE_VAL   //  $('#STR_CODE').val() 
													    		   ,  $('#ROUTE_GB').val() 
													    		   , $('#VEN_CODE').val() 
													    		   ,  gridRoot1.getItemFieldAt( rowIndex , "SCAN_CODE"  ) 
													    		   ,  $('#PUR_GB').val() 
													    		  );
  
						} else { 
							alert("해당 점에는 등록하신 상품이 없습니다.");
							return;
						}
						 
				    },
				    complete : function(data) {
				    	 
				    },
				    error : function(xhr, status, error) {
				    	CommonJs.alertErrorStatus(xhr.status, error);
				    }
				 });
				 
				// 점별 바코드 상세 ajax 로 뿌리기 -- 끝 
				 
			}
		}
  		 
	}
	
	
	if(  gridRoot1.getItemFieldAt( rowIndex , "CRUD")   ==  "C" )   // 기존 데이터가 C이면 신규 추가이므로, U 로 바꾸지 않는다. 
	{ 
	} else {
		gridRoot1.setItemFieldAt( "U" , rowIndex, "CRUD");  // 수정시 상태값을 U 로 바꾸어준다.		
	}
	 
	 
	//매입형태   변경시 CODE 값 수정
	if( dataField == "ORD_FLAG_NM" )  
	{
		gridRoot1.setItemFieldAt( newValue , rowIndex, "ORD_FLAG"); 
	}
	//과세구분  변경시 CODE 값 수정
	if( dataField == "TAX_GB_NM" )  
	{
		gridRoot1.setItemFieldAt( newValue , rowIndex, "TAX_GB"); 
	}
	 
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
					  	, SALE_QTY	 
					  	, INV_END_QTY    
					  	, CENTER_INV_END_QTY 
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
					  	, AVAIL_AMT   
					  	,  TPER_MTHD
					  	,   TPER_MTHD_NM 
					  	, WPRC
					  	, WVAT
					  	, ITM_GB
)
{
 	 
	 
		gridRoot1.setItemFieldAt(	 STR_CODE,		rowIndex,"STR_CODE"			);
		gridRoot1.setItemFieldAt(	 ITM_CODE,		rowIndex,"ITM_CODE"			);
		gridRoot1.setItemFieldAt(	 SCAN_CODE,		rowIndex,"SCAN_CODE"		);
		gridRoot1.setItemFieldAt(	 ITM_NAME,		rowIndex,"ITM_NAME"			); 
		gridRoot1.setItemFieldAt(	 UNIT_NM,		rowIndex,"UNIT_NM"			);
		gridRoot1.setItemFieldAt(	 IPSU_QTY,		rowIndex,"IPSU_QTY"			);
 		 
		if(typeof DP_PRC_UNIT == "undefined")
		{  DP_PRC_UNIT = ""; } 
		gridRoot1.setItemFieldAt(	 DP_PRC_UNIT,	rowIndex,"DP_PRC_UNIT"		);
		
		if(typeof ORD_QTY == "undefined")
		{  ORD_QTY = ""; } 
		gridRoot1.setItemFieldAt(	 ORD_QTY,		rowIndex,"ORD_QTY"			);
		gridRoot1.setItemFieldAt(	 ORD_FLAG,	 	rowIndex,"ORD_FLAG"			);
		gridRoot1.setItemFieldAt(	 ORD_FLAG_NM,   rowIndex,"ORD_FLAG_NM"		);
		gridRoot1.setItemFieldAt(	 SALE_QTY,		rowIndex,"SALE_QTY"		); 
		gridRoot1.setItemFieldAt(	 INV_END_QTY,   rowIndex,"INV_END_QTY"		);

		gridRoot1.setItemFieldAt(	 CENTER_INV_END_QTY,   rowIndex,"CENTER_INV_END_QTY"		);
		gridRoot1.setItemFieldAt(	'0',			rowIndex,"DEC_QTY"			);
		gridRoot1.setItemFieldAt(	 TAX_GB,		rowIndex,"TAX_GB"			);
		gridRoot1.setItemFieldAt(	 TAX_GB_NM,		rowIndex,"TAX_GB_NM"		);
		
		
//		gridRoot1.setItemFieldAt(	 SPRC,			rowIndex,"SPRC"				); 
	//  대출원가, 부가세 계산 
		 
  		var priceVat = calPriceVat( PUR_AVR_AMT , TAX_GB  );  
		// 공병(4)  혹은 Pbox(5) 일때 
		if(ITM_GB == "4" || ITM_GB == "5"  )
		{ 	   
			gridRoot1.setItemFieldAt(	"0" ,				    		rowIndex,"PUR_AVR_AMT"		); // 단가
			gridRoot1.setItemFieldAt(	"0" , 				    		rowIndex,"WSPRC"			); // 대출원가
			gridRoot1.setItemFieldAt(	"0" ,				    		rowIndex,"WVAT"				); // VAT
			gridRoot1.setItemFieldAt(	"0",							rowIndex,"SPRC"				);
			
			// 매입구분(PUR_GB) 이 반품(2) 일때 는SPRC 적용하고 , 매입(1)이면  WPRC 적용한다.
			if( $("#PUR_GB").val() == "2" )
			{
				gridRoot1.setItemFieldAt(	SPRC,							rowIndex,"BOT_SPRC"			);
					
			} else {
				gridRoot1.setItemFieldAt(	WPRC,							rowIndex,"BOT_SPRC"			);
				
			} 
			gridRoot1.setItemFieldAt(	"0",							rowIndex,"BOT_SPRC_TOT"		);
			
		} else {   // 일반 상품일때 
			 
			
			gridRoot1.setItemFieldAt(	priceVat[0] ,				    rowIndex,"PUR_AVR_AMT"		); // 단가
			gridRoot1.setItemFieldAt(	priceVat[1] , 				    		rowIndex,"WSPRC"			); // 대출원가
			gridRoot1.setItemFieldAt(	priceVat[2] ,				    		rowIndex,"WVAT"				); // VAT
			gridRoot1.setItemFieldAt(	SPRC,							rowIndex,"SPRC"				);
			 
			gridRoot1.setItemFieldAt(	BOT_SPRC,						rowIndex,"BOT_SPRC"			);
			gridRoot1.setItemFieldAt(	"0",							rowIndex,"BOT_SPRC_TOT"		);
			
		}
		
		
		
		
		
		
		gridRoot1.setItemFieldAt(	"물류센터",						rowIndex,"UPTAE_FLAG_NM"	);
		gridRoot1.setItemFieldAt(	VEN_CODE,						rowIndex,"VEN_CODE"			);
		gridRoot1.setItemFieldAt(	VEN_NAME,						rowIndex,"VEN_NAME"			); 
		
		gridRoot1.setItemFieldAt(	TPER_MTHD,						rowIndex,"TPER_MTHD"			); 
		gridRoot1.setItemFieldAt(	TPER_MTHD_NM,					rowIndex,"TPER_MTHD_NM"			); 
		  
		gridRoot1.setItemFieldAt(	ITM_GB,					rowIndex,"ITM_GB"			); 
		
		var AVAIL_AMT_VAL = 0;
		if( typeof  AVAIL_AMT != 'undefined'   ||  AVAIL_AMT != "")
		{    AVAIL_AMT_VAL =  AVAIL_AMT;     }
		gridRoot1.setItemFieldAt(	AVAIL_AMT_VAL   ,			rowIndex,"AVAIL_AMT"		);

}

//점별 배송구분(ROUTE_GB)별 상품검색 팝업 호출 function
function btn_comm_store_route_gb_product_search( rowIndex , STR_CODE , ROUTE_GB , VEN_CODE , ITM_NAME , PUR_GB){
	 
	$('#comm_pop_wrap13' ).dialog( 'open' );
	gridApp22.resize(); 
	$("#P_CALLBACK_NM13").val('btn_comm_store_route_gb_product_callback('+rowIndex+', dataRow22)'); 
    // STR_CODE , ROUTE_GB를 넘기기위해서 사용했음  
	 
	$("#P_STR_CODE_CODE").val(  STR_CODE  );
	$("#P_ROUTE_GB").val(  ROUTE_GB  );
	$("#P_VEN_CODE").val(  VEN_CODE  ); 
	$("#P_PUR_GB").val(  PUR_GB  );
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
		  	, $('#STR_CODE').val()    // dataRow.STR_CODE  
		  	, dataRow.ITM_CODE		 
		  	, dataRow.SCAN_CODE	 
		  	, dataRow.ITM_NAME	 
		  	, dataRow.UNIT_NM		 
		  	, dataRow.IPSU_QTY	 
		  	, dataRow.DP_PRC_UNIT 
		  	, dataRow.ORD_QTY		 
		  	, dataRow.ORD_FLAG	 
		  	, dataRow.ORD_FLAG_NM    
		  	, dataRow.SALE_QTY	 
		  	, dataRow.INV_END_QTY  
		  	, dataRow.CENTER_INV_END_QTY 
		  	, dataRow.DEC_QTY 	 
		  	, dataRow.TAX_GB			 
		  	, dataRow.TAX_GB_NM		 
		  	, dataRow.SPRC	 
		  	, parseFloat( dataRow.WPRC ) +  parseFloat( dataRow.WVAT )    // dataRow.PUR_AVR_AMT   VAT유재훈추가 		 
		  	, dataRow.BOT_SPRC			 
		  	, dataRow.BOT_SPRC_TOT 		 
		  	, dataRow.UPTAE_FLAG_NM 
		  	, dataRow.VEN_CODE	 
		  	, dataRow.VEN_NAME 
		  	, dataRow.AVAIL_AMT 
		  	, dataRow.TPER_MTHD
		  	, dataRow.TPER_MTHD_NM	  
		  	, dataRow.WPRC
		  	, dataRow.WVAT
		  	, dataRow.ITM_GB
		  	
	);
	   
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


 

function setColumnVisible(columnNo, check) {
	 
	dataGrid = gridRoot1.getDataGrid();
	columns = dataGrid1.getColumns();
	columns[columnNo].setVisible(check.checked);
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
	
	
//	if(  $('#ROUTE_GB' ).val() != "R1" )
//	{
		if( $('#VEN_CODE' ).val() == "" )
		{   alert("매입처를 선택 하세요.");
			$('#VEN_NAME' ).focus();
			return;
		}
//	}
	
	
	if( $('#PUR_GB' ).val() == "" )
	{   alert("매입구분을 선택 하세요.");
		$('#PUR_GB' ).focus();
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
	var	SALE_QTY		= xmlDoc.createElement('SALE_QTY');
	var	INV_END_QTY		= xmlDoc.createElement('INV_END_QTY'); 
	var	CENTER_INV_END_QTY		= xmlDoc.createElement('CENTER_INV_END_QTY');
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
	
	var	TPER_MTHD			= xmlDoc.createElement('TPER_MTHD');
	var	TPER_MTHD_NM			= xmlDoc.createElement('TPER_MTHD_NM');
	
	var	ITM_GB			= xmlDoc.createElement('ITM_GB');
	
	
	
	
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
	SALE_QTY.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	INV_END_QTY.appendChild(  	xmlDoc.createTextNode(  ""	)	);

	CENTER_INV_END_QTY.appendChild(  	xmlDoc.createTextNode(  ""	)	);
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
	 
	TPER_MTHD.appendChild(  	xmlDoc.createTextNode(  ""	)	); 
	TPER_MTHD_NM.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	ITM_GB.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	  
	
	
	
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
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SALE_QTY	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( INV_END_QTY	);

	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CENTER_INV_END_QTY	);
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
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( AVAIL_AMT 	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT 		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TPER_MTHD 	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TPER_MTHD_NM );

	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB );
	
	
	
	gridRoot1.addItemAt(  xmlDoc  , 0);
	girdMoveSelctedIndex(0 , gridRoot1.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기
 
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
 




//매입생성
function btn_purch_creat()
{
	
	
	// 업로드 주체가 바이어 인지 점포인지 구분. REG_PATH :   1- 점등록   , 2 -  바이어등록   
	var REG_PATH = "";
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009"  ||  $("#SESSION_ROLE_ID").val()    == "ROLE010")  // 바이어(ROLE009) 로그인시 다보여줌
	{
		  REG_PATH = "2";
	} else {
		  REG_PATH = "1";
		
	}
	
	 
	
	var ERR_CODE = 0;  
	selectorColumn2 = gridRoot2.getObjectById("selector2"); 
	var chkArr = selectorColumn2.getSelectedIndices() ; 
	
	if( chkArr.length == 0)
	{   alert("매입 생성할 발주 건이 체크되지 않았습니다.");
		return;
	}
	
	if (confirm("발주 건을 매입 생성 하시겠습니까?") == false){  
		return;
	}
	 

	var RETURN_VEN_CODE = ""; 
	
	for(var i = 0; i < chkArr.length ; i++)
	{ 
 		//  매입 데이터 생성      
		jQuery.ajax({ 
		    url:"/jobOrderToPurch.do",         
		    type:"POST",
			datatype:"xml",
			 async:false,
			data: {    "REG_PATH"   : REG_PATH
		    ,          "STR_CODE"   : $("#S_STR_CODE").val()
		    ,   	   "ITM_GB"     : $("#ITM_GB").val()  
		    ,		   "LRG_CODE"   : $("#LRG_CODE").val()
		    ,          "SLIP_NO"    : gridRoot2.getItemFieldAt( chkArr[i] , "SLIP_NO")
		    ,		   "ONLY_FRESH_PROCESS_GB"  :  "N"       
		    //      N : 전체를 매입처리한다.  Y : 바이어가 올린 생식만 매입처리한다. 
			}, 
			success:function(data){   
				if(  data[0].RETURN_CODE  != "0000")
				{   ERR_CODE = parseInt(ERR_CODE) + 1; 
				} else {
					RETURN_VEN_CODE = RETURN_VEN_CODE  +""+ data[0].RETURN_VEN_CODE;
					
				}
			 
		    },
		    complete : function(data) {
		    	
		    	
		    	
//		    	gridRoot1.removeAll(); 
//		    	$('#excelFile').val(""); 
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	}
	
	if(ERR_CODE == 0)
	{   
		// 맨 앞의 @ 제거
		RETURN_VEN_CODE = RETURN_VEN_CODE.substring(   1, RETURN_VEN_CODE.length );
		// 불필요 문자 제거
		RETURN_VEN_CODE = RETURN_VEN_CODE.replace(/undefined/g, "")  ; 
		RETURN_VEN_CODE = RETURN_VEN_CODE.replace(/ndefined@/g, "")  ; 
		
		 
		
		// 알림톡 발송 - 임시로 막아둠
// 		fn_alimtalkSend( RETURN_VEN_CODE );
		
		alert('매입생성에 성공 하였습니다.');
	} else {
		alert('매입생성에 실패 하였습니다.'); 
	}
	
	btn_search();
	 
	
	 
}
	      
	 
/**
 * 알림톡 발송
 * @param	venList		알림톡 전송할 대상 List
 * 			발주점|회원명|휴대폰번호@발주점2|회원명2|휴대폰번호2@발주점3|회원명3|휴대폰번호3
 */
function fn_alimtalkSend(venList)
{ 
	 
	CommonJs.sendAlimtalk("", venList, "dadam_103", 0);	// 알림톡 발송
	
	
	
//	if(venList != null && venList.length > 0)
//	{
//		for(var i=0; i<venList.length; i++)
//		{
//			if(memList != "")
//			{
//				memList += "@";
//			}
//			memList += venList[i].STR_NAME + "|" + venList[i].CUST_NAME + "|" + venList[i].MOBIL_NO;
//		}
//		
//		 CommonJs.sendAlimtalk("", memList, "dadam_103", 0);	// 알림톡 발송
//	}
	
}


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder2").width($(window).width()-371);
	$("#gridHolder2").height("164px");
	
	//$("#comm_pop_wrap13").css({position:'relative'});
	//$("#comm_pop_wrap13 #pop_wrap").css({position:'absolute', top:0, left:0, width:'100%'});	 
	$(window).on('resize',function (){		
		$("#gridHolder2").width($(window).width()-371);
		$("#gridHolder2").height("164px");		
	});
	
});

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################