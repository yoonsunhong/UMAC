/********************************************************
 * 설명: 상품 마스터 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 유재훈
 * since	: 2016.12.19
 * 2017.09.11	윤태희			신규 또는 수정 저장시, 데이터 그대로 보여주기.(기존에는 초기화됬음)
 * 2017.09.11	윤태희			layoutStr1에 거래구분/수수료율(edit 가능하게 수정) 표시
 * version : 1.0
 ********************************************************/
	
var crudBit          =   "C";   // 최초 신규로 시작함 
var VEN_CODE_DUP_BIT =   "";    // 협력업체코드 중복 체크버튼
var BUSI_NO_DUP_BIT  =   "";    // 사업자번호  중복 체크버튼

$(document).ready(function(){
	
	init();
	
	
	
	$('#uploadForm').ajaxForm({
   	 url: "/productImageFileUpload.do",
   	 enctype: "multipart/form-data", // 여기에 url과 enctype은 꼭 지정해주어야 하는 부분이며 multipart로 지정해주지 않으면 controller로 파일을 보낼 수 없음
   	 success: function(result){
   		 alert("result : "+result);
   	 },
   	 error:function(request,status,error){
   	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
   	 }
    });
	
	//name="imageFile['+imgCnt+']"
	var imgCnt = 0;

	$('.addImage').click(function(e) {
	    if(imgCnt > 2)
	    {   alert('이미지는 3개까지 추가 가능합니다.');
	    	return;
	    }
		e.preventDefault();
		 
	    $(".productImages").append(
	        '<td><input type=hidden id=imgBit name=imgBit>'
	      + '<input name="files" id="files" type="file" accept="image/*" class="newImage" onchange="fileInfo(this,'+imgCnt+')"   /> '
	      + '<a href="#" class="removeImage" border="2"><b><img src="/resources/img/button/btn_product_master_file_del.PNG" style="width:20px"></b></a>'
	      + '<div id="img_box'+imgCnt+'"></div>' 
	      + '</td>'); 
	    imgCnt = imgCnt + 1;
	});
	 
	// 이미지 제거
	$('.productImages').on('click', '.removeImage', function(e) {
	    e.preventDefault(); 
	    $(this).parent().remove();
	    imgCnt = imgCnt - 1;
	});

	
	
	 
	
	//  묶음 상품 에서 엔터시 검색되게....
	$("input[name=REPT_ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_product_rept_search();
        } 
	});
	
	// 조회조건절의 상품에서 엔터시 상품검색되게....
	$("input[name=S_ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_product_search();
        } 
	});
	
	//   협력업체에서 엔터시 검색되게....
	$("input[name=VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        } 
	});
	
	
 

 
	// 숫자만, 제자리 마다 콤마 찍기
    $('#BASE_WPRC_TOT').number( true , 2 );  	// 기준원가 
    $('#BASE_WPRC').number( true, 2 );  
    $('#BASE_WVAT').number( true, 2 );  		// 부가세  
    $('#BASE_SPRC').number( true , 0);  			//  매가
    $('#BOT_SPRC').number( true, 0 );  			// 공병단가 
    
//    $('#WSAL_RATE_1').number( true, 2 );  // 도매할인 1
    $('#WSAL_RATE_2').number( true, 1 );  // 도매할인 2
    $('#WSAL_RATE_3').number( true, 1 );  // 도매할인 3
    $('#WSAL_RATE_4').number( true, 1 );  // 도매할인 4
    $('#WSAL_RATE_5').number( true, 1 );  // 도매할인 5
    
    
    $("#END_IND").val("0");  
    $("#STKLM_QTY").val("0");  
    $("#LEAD_TIME").val("0");  
    
    // LEAD_TIME  - 숫자만 입력받기
	$("#LEAD_TIME").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
    
	// 안전재고  - 숫자만 입력받기
	$("#STKLM_QTY").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
    
	// 스캔코드  - 숫자만 입력받기
	$("#SCAN_CODE").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
	
	// 유효일수  - 숫자만 입력받기
	$("#VALID_DD").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
	
	// 입수  - 숫자만 입력받기
	$("#IPSU_QTY").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
	
	// 달력	
	$(".datepicker").datepicker({
	 showMonthAfterYear:true 
	 });
	
	// 신규 혹은 최초페이지 일때 거래종료일 입력 못 받게 한다.     
	$("#END_DT").datepicker( "option", "disabled", true );
	$("input[name=END_DT]").attr("readonly",false);
	
	
	// 가격에 0 으로 초기화
//	$("#BASE_WPRC_TOT").val("");   // 기준원가(VAT별도)
	$("#BASE_WPRC").val("0");   	 
	$("#BASE_WVAT").val("0");   	// 부가세
//	$("#BASE_SPRC").val("");   // 기준매가(VAT포함)
	
	// 도매할인 
//	$("#WSAL_RATE_1").val("0");  
	$("#WSAL_RATE_2").val("0");  
	$("#WSAL_RATE_3").val("0");  
	$("#WSAL_RATE_4").val("0");  
	$("#WSAL_RATE_5").val("0");  
	
	//취급일자는 시스템 날짜 + 1 해서 default 로 넣는다
	var STR_DT = new CommDateManager().after(0, 0, 1).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#STR_DT").val( STR_DT );
	 
	// 특단가여부(회원할인) 체크박스는 Y 디폴트 
	$('input:checkbox[id="MBR_DC_YN"]').attr("checked", true); 
	//  포인트적립 체크박스는 Y 디폴트 
	$('input:checkbox[id="POINT_SAVE"]').attr("checked", true); 
	
	
	//이익율 /  이익액 0으로 초기화
	$("#PROFIT_PRC").val("0"); 
	$("#PROFIT_PER").val("0"); 
	 
	//유효일수
	$("#VALID_DD").val("0"); 
	
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
});

//선택한 이미지 화면에 표출
function fileInfo(f, cnt){ 
	var file = f.files; // files 를 사용하면 파일의 정보를 알 수 있음 
	if(file[0].size > 1024 * 1024){ 
		alert('1MB 이상의 이미지는 업로드가 불가능합니다.');
		return;
	} 
	var reader = new FileReader(); // FileReader 객체 사용
	reader.onload = function(rst){ // 이미지를 선택후 로딩이 완료되면 실행될 부분
		$('#img_box'+cnt).html('<img src="' + rst.target.result + '"  style="width:100px;border:2">'); // append 메소드를 사용해서 이미지 추가
		// 이미지는 base64 문자열로 추가
		// 이 방법을 응용하면 선택한 이미지를 미리보기 할 수 있음 
	};
	reader.readAsDataURL(file[0]); // 파일을 읽는다, 배열이기 때문에 0 으로 접근
}

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
rMateGridH5.create("grid1", "gridHolder1", jsVars+"&dataType=xml", "100%", "330px");   // 취급점포 등록 그리드
rMateGridH5.create("grid2", "gridHolder2", jsVars+"&dataType=xml", "100%", "130px");   // 묶음상품 그리드
rMateGridH5.create("grid3", "gridHolder3", jsVars+"&dataType=xml", "100%", "130px");   // 박스상품 그리드

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
				 
				if (dataField == "VEN_NAME") {
					editRowIndex = rowIndex;
					editDataRow = dataRow;
					editDataField = dataField;
					
					// 협력업체검색 - 그리드 내 팝업 				   
					venPopup(event);
					
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
				alert("파싱된 "+dataField+"의 값:"+value+"\n\n전달된 XML\n\n"+getXmlString(dataRow));
			};
			
			  
			//그리드1 핸들러
			var layoutCompleteHandler1 = function(event) {
				dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체 
				 
 				// 그리드의 특정 컬럼에 select box 달기 
				// 배송루트 콤보박스
				var COMBO_ROUTE_GB_NM = gridRoot1.getObjectById("ROUTE_GB_NM");    
				COMBO_ROUTE_GB_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('ROUTE_GB') );
				// 원산지 콤보박스
				var COMBO_ORG_CODE_NM = gridRoot1.getObjectById("ORG_CODE_NM");    
				COMBO_ORG_CODE_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('ORG_CODE') );
				// 거래구분 콤보박스
				var COMBO_GRE_GB_NM = gridRoot1.getObjectById("GRE_GB_NM");    
				COMBO_GRE_GB_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('GRE_GB') );
				// 발주구분 콤보박스
				var COMBO_ORD_GB_NM = gridRoot1.getObjectById("ORD_GB_NM");    
				COMBO_ORD_GB_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('ORD_GB') );
				// 규격 콤보박스
				var COMBO_UNIT_NM = gridRoot1.getObjectById("UNIT_NM");    
				COMBO_UNIT_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('UNIT') );
				// 수중량관리여부  콤보박스
				var COMBO_WEIGHT_YN_NM = gridRoot1.getObjectById("WEIGHT_YN_NM");    
				COMBO_WEIGHT_YN_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('WEIGHT_YN') );
				// 사은품인정여부  콤보박스
				var COMBO_GIFT_APP_YN_NM = gridRoot1.getObjectById("GIFT_APP_YN_NM");    
				COMBO_GIFT_APP_YN_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('GIFT_APP_YN') );
				// 포인트 적립여부  콤보박스
				var COMBO_POINT_SAVE_NM = gridRoot1.getObjectById("POINT_SAVE_NM");    
				COMBO_POINT_SAVE_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('POINT_SAVE') );
				// 특단가여부(회원할일여부)  콤보박스
				var COMBO_MBR_DC_YN_NM = gridRoot1.getObjectById("MBR_DC_YN_NM");    
				COMBO_MBR_DC_YN_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('MBR_DC_YN') );
				//  취급여부  콤보박스
				var COMBO_END_IND_NM = gridRoot1.getObjectById("END_IND_NM");    
				COMBO_END_IND_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('END_IND') );
  
//				//그리드1 셀선택 이벤트
//				dataGrid1.addEventListener("itemClick", itemClickHandler); 
				
				// 더블클릭
				dataGrid1.setDoubleClickEnabled(true);
				dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
				
				$("#S_ITM_NAME").focus(); 
				
				
			}; 
			
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1); 
			
			// 그리드내 콤보박스 change 시 이벤트
			gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);
			 
		}else if (id == "grid2") { 
			// rMateGrid 관련 객체
			gridApp2 	= document.getElementById(id);	// 그리드를 포함하는 div 객체
			gridRoot2 	= gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체
			gridApp2.setDataType("xml");
			gridApp2.setLayout(layoutStr2);		
			gridApp2.setData(gridData2);
			//로우 클릭 이벤트 제어
			var itemClickHandler = function(event) { 
			}; 
			var itemDoubleClickHandler2 = function(event) {
				var rowIndex = event.rowIndex;
				var columnIndex = event.columnIndex;
				var dataRow = gridRoot2.getItemAt(rowIndex);
				// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
				var column = dataGrid2.getDisplayableColumns()[columnIndex];
				var dataField = column.getDataField();
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
			
			  
			//그리드1 핸들러
			var layoutCompleteHandler2 = function(event) {
				dataGrid2 = gridRoot2.getDataGrid();	// 그리드 객체 
				 
  
//				//그리드1 셀선택 이벤트
//				dataGrid1.addEventListener("itemClick", itemClickHandler); 
				
				var REPT_YN_COMBO = gridRoot2.getObjectById("REPT_YN");    
				REPT_YN_COMBO.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('REPT_YN') );
				
				// 더블클릭
				dataGrid2.setDoubleClickEnabled(true);
				dataGrid2.addEventListener("itemDoubleClick", itemDoubleClickHandler2);
				
				$("#S_ITM_NAME").focus(); 
				
				
			}; 
			
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드2 핸들러 생성.
			gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2); 
			
			 
		}else if (id == "grid3") { 
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
				var dataRow = gridRoot3.getItemAt(rowIndex);
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
				alert("파싱된 "+dataField+"의 값:"+value+"\n\n전달된 XML\n\n"+getXmlString(dataRow));
			};
			
			  
			//그리드1 핸들러
			var layoutCompleteHandler3 = function(event) {
				dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체 
				 
  
//				//그리드1 셀선택 이벤트
//				dataGrid1.addEventListener("itemClick", itemClickHandler); 
				
/*				var REPT_YN_COMBO = gridRoot3.getObjectById("REPT_YN");    
				REPT_YN_COMBO.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('REPT_YN') );*/
				
				// 더블클릭
				/*dataGrid3.setDoubleClickEnabled(true);
				dataGrid3.addEventListener("itemDoubleClick", itemDoubleClickHandler3);*/
				
				/*$("#S_ITM_NAME").focus(); */
				
				
			}; 
			
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드2 핸들러 생성.
			gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3); 
			
			 
		}
 
 
}


//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1; 
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2; 
var gridApp3, gridRoot3, dataGrid3, dataRow3, clickData3, selectorColumn3; 
//----------------------- 그리드 설정 끝 -----------------------

 
//취급점포 등록 그리드 - 그리드1 헤더 설정  
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg1" headerColors="[#f2f2f2]" sortableColumns="true"  editable="true" horizontalScrollPolicy="auto" showDeletedRows="true" doubleClickEnabled="false" selectionMode="multipleRows"  >\
		<columns>\
			<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"/>\
			<DataGridColumn  id="CRUD"		 	 		dataField="CRUD"     				visible="false"     />\
			<DataGridColumn  id="CHECK_BOX"      	dataField="CHECK_BOX"    		headerText="선택" 			visible="false"	itemRenderer="CheckBoxItem" rendererIsEditor="true" editorDataField="CHECK_BOX" width="41" textAlign="center" backgroundColor="#EDEDF0"/>\
			<DataGridColumn  id="STR_CODE"		 	dataField="STR_CODE"     		visible="false"     />\
			<DataGridColumn  id="STR_NAME"		 	dataField="STR_NAME"     		headerText="점포명"			editable="false" 	textAlign="center"	width="65"     />\
			<DataGridColumn  id="VEN_CODE"		 	dataField="VEN_CODE"     		headerText="협력업체코드" 	editable="false" 	textAlign="center"	width="65"     />\
			<DataGridColumn  id="VEN_NAME"		 	dataField="VEN_NAME"     		headerText="협력업체"		editable="false" 	textAlign="center"	width="65"     />\
			<DataGridColumn  id="WPRC_TOT"	     	dataField="WPRC_TOT"   		headerText="원가합계"    	formatter="{numfmt}" textAlign="right"	showEditableIcon="always"  itemRenderer="EditableIconItem" width="85"  />\
			<DataGridColumn  id="WPRC"			 		dataField="WPRC"    	 			headerText="원가"    		formatter="{numfmt}" editable="false"    textAlign="right"	  width="65"  />\
			<DataGridColumn  id="WVAT"		 	 		dataField="WVAT" 	   			headerText="부가세"    		formatter="{numfmt}" editable="false"	textAlign="right"     width="65"  />\
			<DataGridColumn  id="SPRC"			 		dataField="SPRC"    	 			headerText="매가"    		formatter="{numfmt}" textAlign="right"   showEditableIcon="always"  itemRenderer="EditableIconItem" width="85"  />\
			<DataGridColumn  id="GRE_GB_NM"		 	dataField="GRE_GB_NM"    		headerText="거래구분"	  	itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 textAlign="center"	width="65"   />\
			<DataGridColumn  id="ROUTE_GB_NM"	 	dataField="ROUTE_GB_NM"  	headerText="배송루트"		itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 textAlign="center"	width="85"  />\
			<DataGridColumn  id="ROUTE_GB"		 	dataField="ROUTE_GB"     		visible="false"     />\
			<DataGridColumn  id="PRGT_RATE"		 	dataField="PRGT_RATE"    		headerText="수수료율"		textAlign="right" showEditableIcon="always"  itemRenderer="EditableIconItem" 	width="65"  />\
			<DataGridColumn  id="PROFIT_PRC"		 	dataField="PROFIT_PRC"    	headerText="이익액"			formatter="{numfmt}" editable="false" textAlign="right"	width="65"  />\
			<DataGridColumn  id="PROFIT_PER"		 	dataField="PROFIT_PER"    		headerText="이익율"			editable="false" textAlign="right"	width="65"  />\
			<DataGridColumn  id="CUR_INV_QTY"		dataField="CUR_INV_QTY"    	headerText="현재고"			textAlign="right"	 editable="false" width="77"  formatter="{numfmt}" />\
			<DataGridColumn  id="STKLM_QTY"		 	dataField="STKLM_QTY"    		headerText="안전재고량"		textAlign="right"   showEditableIcon="always"  itemRenderer="EditableIconItem" width="85"  />\
			<DataGridColumn  id="STR_DT"		 		dataField="STR_DT"    	 		headerText="적용일"    		editable="false"	formatter="{datefmt}" textAlign="center"	width="85"  />\
			<DataGridColumn  id="ORD_GB_NM"		 	dataField="ORD_GB_NM"    		headerText="발주구분"   	itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 textAlign="center"	width="65"   />\
			<DataGridColumn  id="ORD_GB"		 		dataField="ORD_GB"       		visible="false"     />\
			<DataGridColumn  id="UNIT_NM"		 		dataField="UNIT_NM"    			headerText="규격"    		visible="false"   textAlign="center"	width="65"  />\
			<DataGridColumn  id="UNIT"			 		dataField="UNIT"         			headerText="규격"  			visible="true"   textAlign="center"  editable="false" width="65"   />\
			<DataGridColumn  id="IPSU_QTY"		 		dataField="IPSU_QTY"     		headerText="입수"   			editable="false"	textAlign="right"   width="50"   />\
			<DataGridColumn  id="LEAD_TIME"		 	dataField="LEAD_TIME"    		headerText="Lead Time"	textAlign="right"	showEditableIcon="always"  itemRenderer="EditableIconItem" width="77"   />\
			<DataGridColumn  id="ORG_CODE_NM"	 	dataField="ORG_CODE_NM"  	headerText="원산지"			itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 textAlign="center"	width="65"  />\
			<DataGridColumn  id="ORG_CODE"		 	dataField="ORG_CODE"     		visible="false"     />\
			<DataGridColumn  id="GRE_GB"		 		dataField="GRE_GB"       		visible="false"     />\
			<DataGridColumn  id="ITM_CODE"		 	dataField="ITM_CODE"     		visible="false"     />\
			<DataGridColumn  id="WEIGHT_YN_NM"	 	dataField="WEIGHT_YN_NM"   headerText="수중량관리"	itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 textAlign="center"	width="85"  />\
			<DataGridColumn  id="WEIGHT_YN"		 	dataField="WEIGHT_YN"     	visible="false"     />\
			<DataGridColumn  id="GIFT_APP_YN_NM" 	dataField="GIFT_APP_YN_NM"	headerText="사은품인정"		itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 textAlign="center"	width="85"  />\
			<DataGridColumn  id="GIFT_APP_YN"	 	dataField="GIFT_APP_YN"    	visible="false"     />\
			<DataGridColumn  id="SCAN_CODE"	     	dataField="SCAN_CODE"      	visible="false"     />\
			<DataGridColumn  id="CLS_CODE"	     	dataField="CLS_CODE"       	visible="false"     />\
			<DataGridColumn  id="MBR_DC_YN_NM"   	dataField="MBR_DC_YN_NM"	headerText="특단가여부"		itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code"  showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"		 textAlign="center"	width="85"  />\
			<DataGridColumn  id="POINT_SAVE_NM"  	dataField="POINT_SAVE_NM"	headerText="포인트적립"		itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code"  	showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 textAlign="center"	width="85"  />\
			<DataGridColumn  id="POINT_SAVE"	 		dataField="POINT_SAVE"     	visible="false"     />\
			<DataGridColumn  id="MBR_DC_YN"	     	dataField="MBR_DC_YN"      	visible="false"     />\
			<DataGridColumn  id="END_IND_NM"     	dataField="END_IND_NM"		headerText="취급여부"		itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"		 textAlign="center"	width="85"  />\
			<DataGridColumn  id="END_IND"	     		dataField="END_IND"        		visible="false"     />\
	</columns>\
	</DataGrid>\
</rMateGrid>';

 
var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg2" headerColors="[#f2f2f2]" sortableColumns="true"  editable="true" showDeletedRows="true" doubleClickEnabled="false" selectionMode="multipleRows"  >\
			<columns>\
				<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"/>\
				<DataGridColumn  id="SCAN_CODE"	 dataField="SCAN_CODE"     	headerText="스캔코드"	editable="false" 	textAlign="center"	width="80"     />\
				<DataGridColumn  id="REPT_YN"		 dataField="REPT_YN"    		headerText="대표구분" 	itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" showEditableIcon="always" editableIcon="DownArrow" itemRenderer="EditableIconItem"	 textAlign="center"	width="65" />\
				<DataGridColumn  id="ITM_NAME"	 dataField="ITM_NAME"     		headerText="상품명" 		editable="false" 	textAlign="center"	width="500"     />\
				<DataGridColumn  id="ITM_CODE"	 dataField="ITM_CODE"        	visible="false"     />\
				<DataGridColumn  id="CORP_CODE"	 dataField="CORP_CODE"       visible="false"     />\
		</columns>\
		</DataGrid>\
	</rMateGrid>';


var layoutStr3 =
	'<rMateGrid>\
		<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg2" headerColors="[#f2f2f2]" sortableColumns="true"  editable="true" showDeletedRows="true" doubleClickEnabled="false" selectionMode="multipleRows"  >\
			<columns>\
				<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"/>\
				<DataGridColumn  id="SCAN_CODE"		dataField="BOX_CODE"     		headerText="박스코드"		editable="false" 	textAlign="center"	width="80"     />\
				<DataGridColumn  id="ITM_CODE_EA"	dataField="ITM_CODE_EA"     	headerText="낱개코드"		editable="false" 	textAlign="center"	width="80"     />\
				<DataGridColumn  id="ITM_NAME"		dataField="ITM_NAME"     		headerText="상품명" 			editable="false" 	textAlign="center"	width="500"     />\
				<DataGridColumn  id="IPSU_QTY"		 	dataField="IPSU_QTY"     		headerText="입수량" 			editable="false" 	textAlign="center"	width="500"     />\
				<DataGridColumn  id="ITM_CODE"	    dataField="ITM_CODE"        	visible="false"     />\
				<DataGridColumn  id="CORP_CODE"	    dataField="CORP_CODE"        	visible="false"     />\
		</columns>\
		</DataGrid>\
	</rMateGrid>';


//그리드  데이터 초기화
var gridData1 = []; 
var gridData2 = []; 
var gridData3 = []; 

  
function change_rept(item, value, column){
	console.log("change_rept"); 
	var ch_str = item["REPT_YN"];
	var return_str = "";
	if(ch_str == "Y"){
		return_str = "대표";
	}else{
		return_str = "일반";
	}
	return return_str;
}

// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

 

function init() {
 
	// SELECT BOX 바인딩  
	 getCommonCodeSelectBoxList("ITM_STD"   ,   "ITM_STD"	);   // 관리구분
//	 getCommonCodeSelectBoxList("ITM_GB"    ,   "ITM_GB"	);   // 상품구분
	 getCommonCodeSelectBoxList("TAX_GB"    ,   "TAX_GB"	);   // 과세구분
	 getCommonCodeSelectBoxList("ITM_FORM"  ,   "ITM_FORM"	);   // 상품형태
	 getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	);   // 배송루트
	 getCommonCodeSelectBoxList("TPER_MTHD" ,   "TPER_MTHD"	);   // 보관방법
//	 getCommonCodeSelectBoxList("UNIT"      ,   "UNIT"	    );   // 규격
	 getCommonCodeSelectBoxList("END_IND"   ,   "END_IND"   );   // 취급여부
	 getCommonCodeSelectBoxList("ORD_GB"    ,   "ORD_GB"    );   // 권고발주대상	
	 getCommonCodeSelectBoxList("ORG_CODE"    	 ,   "ORG_CODE"   	  );   // 원산지
	 getCommonCodeSelectBoxList("VALID_DT_YN"    ,   "VALID_DT_YN"    );   // 유효기간관리유무
	 
	 getBotCodeSelectBoxList("BOT_CODE"      );   // 공병코드
	 getStoreCode("ONE_STR_CODE"  );   // 점포코드
	 
	 $("#ORD_GB").val("1");  // 권고발주대상 콤보 세팅 후 수동(1) 로 세팅
	 
//	 $("#ORG_CODE").val("KR");  // 원산지(1) 한국으로 세팅
	 
	 // 대 중 소 분류 바인딩  : 첫번째인자=html오브젝트     두번째인자=대(1)중(2)소(3) 구분      세번째인자=분류 구분 코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. 
	 getCateCodeSelectBoxList("LRG_CODE"   , "1" ,  ""   );    // 대 분류     
	 
	  
	  
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
     

// 스캔코드 중복 체크
function productMasterScanCodeDup(){
	 
	
//	if(  $("#ITM_STD").val() == "1"  || $("#ITM_STD").val() == "2"      )  // 규격일때 체크한다.
//	{ 
//			if(  $("#NO_BARCODE").val() == "1"     )   // 바코드  존재(1)  일때 만 체크한다.
//			{
//					if( $.trim( $("#SCAN_CODE").val() 		) == "" ) {   alert("스캔코드를  선택 하세요!");	$("#SCAN_CODE").focus();  		return; }  // 스캔코드
//					var scanLength =  $.trim( $("#SCAN_CODE").val().length ) ;   
//					if( !  ( scanLength  == 6  || scanLength  == 13   )  )
//					{
//						alert("스캔코드는 6 혹은 13 자리여야 합니다.");
//						$("#SCAN_CODE").val("");
//						return;
//					}  
//			}
//	}
	
	
	if(crudBit != "C")
	{
		return;
	}
	
	
	//  스캔코드 는 상품 마스터에서 중복 검사한다. 
	jQuery.ajax({ 
		    url:"/productMasterScanCodeDup.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {  SCAN_CODE  :   $.trim(  $('#SCAN_CODE').val()  )   }, 
			success:function(data){   
				var obj = jQuery.parseJSON( data.RETURN_CUR ); 
				if( obj.RETURN_CODE == "0000" )
				{ 
//					alert("사용가능한 스캔코드입니다.");
					  
				} else {
					
					$('#SCAN_CODE').val("");
					alert("이미 등록된  스캔코드 입니다."); 
					return;
				}  
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		           
		    }
		});
  
}

function chgReptYn()
{
  
	// 묶음 선택 시 
	if(  $(':radio[name="REPT_YN"]:checked').val() == 'MULTI'  )
	{ 
		 $('#REPT_YN_DIV').show();
		 $("input[name=REPT_YN]").attr("disabled",false); 
		 $("input[name=REPT_ITM_NAME]").attr("disabled",false); 
		 $("#REPT_ITM_NAME").show(); 
		 $("#BTN_REPT_ITM_NAME").show(); 
			
		
	} else {  // 일반 선택 시 
		 
		 $('#REPT_YN_DIV').hide();
		 
		 $('#REPT_ITM_CODE').val("");
		 $('#REPT_SCAN_CODE').val("");
		 $('#REPT_ITM_NAME').val("");
		  
	}
 
}



//(묶음대표상품검색) 팝업 호출 function
function btn_comm_product_rept_search(   ){
	$('#comm_pop_wrap12' ).dialog( 'open' );
	gridApp21.resize();
//	fnGetStrName();
	$("#P_CALLBACK_NM12").val('fn_comm_product_rept_callback(dataRow21)'); 
 // 	여기서는 STR_CODE가 필요 없으나, ITM_FORM를 넘기기위해서 사용했음  
//	$("#P_ITM_FORM").val(  ITM_FORM  );
	 
	if($("#REPT_ITM_NAME").val() != null && $("#REPT_ITM_NAME").val() != ""){
		$("#P_TEXT12").val($("#REPT_ITM_NAME").val());
		btn_comm_search('12');
	}
}


//(묶음대표상품검색)  - 유재훈 추가 시작
//(묶음대표상품검색) 팝업 callback function
function fn_comm_product_rept_callback(dataRow)
{ 
	$('#REPT_ITM_CODE').val(dataRow.ITM_CODE);				// 상품코드
	$('#REPT_SCAN_CODE').val(dataRow.SCAN_CODE);			// 스캔코드  
	$('#REPT_ITM_NAME').val(dataRow.ITM_NAME);			// 상품명
}
//(묶음대표상품검색)  - 유재훈 추가 끝



function  btn_pop_close(){
	
	 $( "#show_product_pop" ).dialog( 'close' );	
	 
}
 
/**
 * 그리드에서 바로 수정한 뒤 포커스아웃하지 않은 상태에서 
 * 저장 버튼 클릭 하면, 수정한 값으로 바뀌지 않는 문제를 
 * 해결하기 위한 setTimeout 함수.
 * */
var myVar = "";
function btn_saveCheck() {
    myVar = setTimeout(btn_save, 500);
}

function btn_save(){
	 
	
	
	//  이미지 업로드 테스트 시작
    //	imgSave("11111"); 
	//  이미지 업로드 테스트 끝 
    //	return;
	
	 
	// 묶음(MULTI)를 선택 했으나  묶음 상품을 지정 안했을때 
	if(    $(':radio[name="REPT_YN"]:checked').val() == 'MULTI'   && $("#REPT_ITM_CODE").val()  == "" )  
	{   if (confirm("현 등록 상품은 대표 묶음상품으로 지정됩니다.\n진행 하시겠습니까?") == false){ 
		    return;
		}  
	}
	
	// 묶음(MULTI)를 선택 했으나  묶음 상품을 지정 했을때 
	if(    $(':radio[name="REPT_YN"]:checked').val() == 'MULTI'  && $("#REPT_ITM_CODE").val()   != ""  )  
	{   if (confirm("현 등록 상품은 선택하신 대표 묶음상품에 그룹핑 됩니다.\n진행 하시겠습니까?") == false){    
		    return;
		}  
	}
	
	
	// 공산품인데 바코드 없는 상품 등록시 확인알람 보여주기
	if(   (  $("#ITM_STD").val() == "1"  || $("#ITM_STD").val() == "2"    )  &&   $("#NO_BARCODE").val() == "0"   )
	{ 
		if (confirm("현재 등록 상품은 바코드 없는 공산품 입니다.\n등록 하시겠습니까?") == false)
		{     
				return;
		}
		
	}
		 
	// 상품 상세 유효성 검사.
	if( $.trim( $("#ITM_STD").val()    ) == "" ) {   alert("관리구분을  선택 하세요!");				$("#ITM_STD").focus();  		return; }  // 관리구분
  
	//	if( $.trim( $("#ITM_GB").val() 			) == "" ) {   alert("상품구분을  선택 하세요!");	$("#ITM_GB").focus();  			return; }  // 상품구분
	if( $.trim( $("#CLS_CODE").val() 		) == "" ) {   alert("상품분류를  선택 하세요!");	$("#CLS_CODE").focus();  		return; }  // 상품분류
	if( $.trim( $("#ITM_NAME").val() 		) == "" ) {   alert("상품명을 입력 하세요!");		$("#ITM_NAME").focus();  		return; }  // 상품명
	if( $.trim( $("#ITM_SHORT_NAME").val() 	) == "" ) {   alert("단축상품명을  입력 하세요!");	$("#ITM_SHORT_NAME").focus();	return; }  // 단축상품명
	if( $.trim( $("#VEN_CODE").val() 		) == "" ) {   alert("협력업체를  선택 하세요!");	$("#VEN_NAME").focus();  		return; }  // 협력업체
	

	if(  $("#ITM_STD").val() == "1"  || $("#ITM_STD").val() == "2"      )  // 규격일때 체크한다.
	{ 
			if(  $("#NO_BARCODE").val() == "1"     )   // 바코드  존재(1)  일때 만 체크한다.
			{
					if( $.trim( $("#SCAN_CODE").val() 		) == "" ) {   alert("스캔코드를  선택 하세요!");	$("#SCAN_CODE").focus();  		return; }  // 스캔코드
					var scanLength =  $.trim( $("#SCAN_CODE").val().length ) ;   
					if( !  ( scanLength  == 6  || scanLength  == 13   )  )
					{
						alert("스캔코드는 6 혹은 13 자리여야 합니다.");
						return;
					}  
			}
	}
	 
	if( $.trim( $("#TAX_GB").val() 			) == "" ) {   alert("과세구분을  선택 하세요!");	$("#TAX_GB").focus();  			return; }  // 과세구분
	if( $.trim( $("#ITM_FORM").val() 		) == "" ) {   alert("상품형태를  선택 하세요!");	$("#ITM_FORM").focus();  		return; }  // 상품형태
	if( $.trim( $("#IPSU_QTY").val() 		) == "" ) {   alert("입수를  입력 하세요!");     	$("#IPSU_QTY").focus();  		return; }  // 입수              
	if( $.trim( $("#UNIT").val() 			) == "" ) {   alert("규격을  입력 하세요!");     	$("#UNIT").focus();  			return; }  // 규격                    
	if( $.trim( $("#DP_PRC_UNIT").val() 	) == "" ) {   alert("표시단위를  입력 하세요!");	$("#DP_PRC_UNIT").focus();  	return; }  // 표시단위             
	if( $.trim( $("#ROUTE_GB").val() 		) == "" ) {   alert("배송루트를  선택 하세요!");	$("#ROUTE_GB").focus();  		return; }  // 배송루트             
	if( $.trim( $("#TPER_MTHD").val() 		) == "" ) {   alert("보관방법를  선택 하세요!");	$("#TPER_MTHD").focus();  		return; }  // 보관방법              
//	if( $.trim( $("#ORG_CODE").val() 		) == "" ) {   alert("원산지를  선택 하세요!");		$("#ORG_CODE").focus();  		return; }  // 보관방법              
	if( $.trim( $("#ORD_GB").val() 			) == "" ) {   alert("권고발주대상을  선택 하세요!");	$("#ORD_GB").focus();  			return; }  // 권고발주대상          
	if( $.trim( $("#STR_DT").val() 			) == "" ) {   alert("취급일자를 선택 하세요!");	$("#STR_DT").focus();  			return; }  // 취급일자             
	if( $.trim( $("#END_IND").val() 		) == "" ) {   alert("취급여부를  선택 하세요!");	$("#END_IND").focus();  		return; }  // 취급여부      
	if( $.trim( $("#VALID_DT_YN").val() 	) == "" ) {   alert("유효기간관리유무를  선택 하세요!");	$("#VALID_DT_YN").focus();  		return; }  // 유효기간관리유무      
	if( $("#VALID_DT_YN").val() == "Y" &&   ( $.trim( $("#VALID_DD").val() ) == "" || $.trim( $("#VALID_DD").val() ) == "0" )   )
	{
		alert("유효기간을  입력 하세요!");	$("#VALID_DD").focus();  return;
	}
	
	
	if( $("#ITM_GB").val() != "1"   )   // 생식일때는 유효성 검사 안한다.
	{
		if( $.trim( $("#BASE_WPRC_TOT").val()   ) == "" ) {   alert("원가합계를  선택 하세요!");	$("#BASE_WPRC_TOT").focus(); 	return; }  // 원가합계
		if( $.trim( $("#BASE_SPRC").val() 		) == "" ) {   alert("매가를  선택 하세요!");	    $("#BASE_SPRC").focus();  		return; }  // 기준매가
	
		// 매가는 원가단가보다 커야함.
		if( parseFloat($("#BASE_WPRC_TOT").val())  > parseFloat($("#BASE_SPRC").val() ) )
		{
			alert('매가는 원가합계보다 작을 수 없습니다.'); 
			return;
		} 
		
	}
	
	

	// 그리드에 대한 유효성 검사
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	for(var i=0 ; i < rowCnt.length ; i++)
	{      
		if(isNaN(gridRoot1.getItemFieldAt( i , "PRGT_RATE"))){
			alert("하단 그리드의 수수료율은 숫자만 입력 할 수 있습니다.");
			return ;
		}
		
		if(  gridRoot1.getItemFieldAt( i , "GRE_GB") == "2" && gridRoot1.getItemFieldAt( i , "PRGT_RATE") <=0)
		{
			alert("하단 그리드의 거래구분이 임대을이면 수수료율이 0보다 커야합니다.");
			return;
		}
		
		if(  typeof  gridRoot1.getItemFieldAt( i , "WEIGHT_YN") == 'undefined' )
		{
			alert("하단 그리드의 수중량관리여부를 선택 하세요");
			return;
		}
		if( typeof gridRoot1.getItemFieldAt( i , "GIFT_APP_YN") == 'undefined' )
		{
			alert("하단 그리드의 사은품인정여부를 선택 하세요");
			return;
		} 
		if( typeof gridRoot1.getItemFieldAt( i , "END_IND_NM") == 'undefined' )
		{
			alert("하단 그리드의 취급여부를 선택 하세요");
			return;
		} 
	}   
	// 그리드에 대한 유효성 검사
	var rowCnt2  = gridRoot2.getCollection().getSource() ;   
	var rept_count = 0;
	
	for(var i=0 ; i < rowCnt2.length ; i++)
		{
		console.log(gridRoot2.getItemFieldAt( i , "REPT_YN"));
			if (gridRoot2.getItemFieldAt( i , "REPT_YN") == "Y"){
				rept_count ++;
				
			}
		}
	
	if(rept_count > 1){
		alert("묶음상품 그리드의 대표구분을 확인해주세요.\n대표상품은 1개만 지정하실 수 있습니다.");
		return ;
	}
	rept_count = 0;
	
	// 상품 마스터 상세정보 저장위해 xml 만듦
	var productMasterDetail = ""; 
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
	var ITM_STD  		= xmlDoc.createElement('ITM_STD');   
	var NO_BARCODE      = xmlDoc.createElement('NO_BARCODE');  
	var ITM_GB  		= xmlDoc.createElement('ITM_GB'); 
	var CLS_CODE   		= xmlDoc.createElement('CLS_CODE');
	var ITM_NAME  		= xmlDoc.createElement('ITM_NAME');
	var ITM_SHORT_NAME  = xmlDoc.createElement('ITM_SHORT_NAME');
	var VEN_CODE  		= xmlDoc.createElement('VEN_CODE');
	var SCAN_CODE    	= xmlDoc.createElement('SCAN_CODE');
	var VALID_DT_YN  	= xmlDoc.createElement('VALID_DT_YN');
	var VALID_DD      	= xmlDoc.createElement('VALID_DD');
	var TAX_GB        	= xmlDoc.createElement('TAX_GB');
	var BASE_WPRC       = xmlDoc.createElement('BASE_WPRC');
	var BASE_WVAT       = xmlDoc.createElement('BASE_WVAT');
	var BASE_SPRC       = xmlDoc.createElement('BASE_SPRC');
	var ITM_FORM        = xmlDoc.createElement('ITM_FORM');
	var IPSU_QTY        = xmlDoc.createElement('IPSU_QTY');
	var UNIT            = xmlDoc.createElement('UNIT');
	var DP_PRC_UNIT     = xmlDoc.createElement('DP_PRC_UNIT');
	var ROUTE_GB        = xmlDoc.createElement('ROUTE_GB');
	var TPER_MTHD       = xmlDoc.createElement('TPER_MTHD');
	var MAKE_VEN_NAME   = xmlDoc.createElement('MAKE_VEN_NAME');
	var ORG_CODE        = xmlDoc.createElement('ORG_CODE');
	var ORD_GB          = xmlDoc.createElement('ORD_GB');
	var STR_DT          = xmlDoc.createElement('STR_DT');
	var END_DT          = xmlDoc.createElement('END_DT');
	var END_IND         = xmlDoc.createElement('END_IND');
//	var WSAL_RATE_1     = xmlDoc.createElement('WSAL_RATE_1');
	var WSAL_RATE_2     = xmlDoc.createElement('WSAL_RATE_2');
	var WSAL_RATE_3     = xmlDoc.createElement('WSAL_RATE_3');
	var WSAL_RATE_4     = xmlDoc.createElement('WSAL_RATE_4');
	var WSAL_RATE_5     = xmlDoc.createElement('WSAL_RATE_5');
	var FTRACE_YN       = xmlDoc.createElement('FTRACE_YN');
	var STRACE_YN       = xmlDoc.createElement('STRACE_YN');
	var MTRACE_YN       = xmlDoc.createElement('MTRACE_YN');
	var INGR_YN         = xmlDoc.createElement('INGR_YN');
	var MBR_DC_YN       = xmlDoc.createElement('MBR_DC_YN');
	var POINT_SAVE      = xmlDoc.createElement('POINT_SAVE');
	var ITM_CODE        = xmlDoc.createElement('ITM_CODE');
	var BOT_CODE        = xmlDoc.createElement('BOT_CODE');
	var BOT_SPRC        = xmlDoc.createElement('BOT_SPRC');
	var REPT_YN         = xmlDoc.createElement('REPT_YN');
	var REPT_ITM_CODE	= xmlDoc.createElement('REPT_ITM_CODE');
	var REPT_SCAN_CODE	= xmlDoc.createElement('REPT_SCAN_CODE');
	var FRESH_BARCODE	= xmlDoc.createElement('FRESH_BARCODE'); 
	var IN_CAPACITY		= xmlDoc.createElement('IN_CAPACITY');
	
	
	
	
	var FTRACE_YN_VAL  = "";
	var STRACE_YN_VAL  = "";
	var MTRACE_YN_VAL  = "";
	var INGR_YN_VAL    = "";
	var MBR_DC_YN_VAL  = "";
	var POINT_SAVE_VAL = ""; 
	if(   $("input:checkbox[id='FTRACE_YN']").is(":checked")  )  {  FTRACE_YN_VAL  = "Y"; } else { FTRACE_YN_VAL  = "N";  }
	if(   $("input:checkbox[id='STRACE_YN']").is(":checked")  )  {  STRACE_YN_VAL  = "Y"; } else { STRACE_YN_VAL  = "N";  }
	if(   $("input:checkbox[id='MTRACE_YN']").is(":checked")  )  {  MTRACE_YN_VAL  = "Y"; } else { MTRACE_YN_VAL  = "N";  }
	if(   $("input:checkbox[id='INGR_YN']").is(":checked")    )  {  INGR_YN_VAL    = "Y"; } else { INGR_YN_VAL    = "N";  }
	if(   $("input:checkbox[id='MBR_DC_YN']").is(":checked")  )  {  MBR_DC_YN_VAL  = "Y"; } else { MBR_DC_YN_VAL  = "N";  }
	if(   $("input:checkbox[id='POINT_SAVE']").is(":checked") )  {  POINT_SAVE_VAL = "Y"; } else { POINT_SAVE_VAL = "N";  }
	 
	
	FTRACE_YN.appendChild( xmlDoc.createTextNode(      FTRACE_YN_VAL      )	); 
	STRACE_YN.appendChild( xmlDoc.createTextNode(      STRACE_YN_VAL      )	); 
	MTRACE_YN.appendChild( xmlDoc.createTextNode(      MTRACE_YN_VAL      )	); 
	INGR_YN.appendChild( xmlDoc.createTextNode(        INGR_YN_VAL        )	); 
	MBR_DC_YN.appendChild( xmlDoc.createTextNode(      MBR_DC_YN_VAL      )	); 
	POINT_SAVE.appendChild( xmlDoc.createTextNode(     POINT_SAVE_VAL     )	); 
	
//	WSAL_RATE_1.appendChild( xmlDoc.createTextNode(     $("#WSAL_RATE_1").val()        )	);   
	WSAL_RATE_2.appendChild( xmlDoc.createTextNode(     $("#WSAL_RATE_2").val()        )	);   
	WSAL_RATE_3.appendChild( xmlDoc.createTextNode(     $("#WSAL_RATE_3").val()        )	);   
	WSAL_RATE_4.appendChild( xmlDoc.createTextNode(     $("#WSAL_RATE_4").val()        )	);   
	WSAL_RATE_5.appendChild( xmlDoc.createTextNode(     $("#WSAL_RATE_5").val()        )	); 
	 
	ITM_CODE.appendChild( xmlDoc.createTextNode(        $("#ITM_CODE").val()           )	); 
	NO_BARCODE.appendChild( xmlDoc.createTextNode(      $("#NO_BARCODE").val()         )	); 
	ITM_STD.appendChild( xmlDoc.createTextNode(         $("#ITM_STD").val()            )	);                     
	ITM_GB.appendChild( xmlDoc.createTextNode(	        $("#ITM_GB").val()             )	);                       
	CLS_CODE.appendChild( xmlDoc.createTextNode(        $("#CLS_CODE").val()           )	);                     
	ITM_NAME.appendChild( xmlDoc.createTextNode(        $("#ITM_NAME").val()           )	);                     
	ITM_SHORT_NAME.appendChild( xmlDoc.createTextNode(  $("#ITM_SHORT_NAME").val()     )	);                     
	VEN_CODE.appendChild( xmlDoc.createTextNode(        $("#VEN_CODE").val()           )	);                     
	SCAN_CODE.appendChild( xmlDoc.createTextNode(       $("#SCAN_CODE").val()          )	);                     
	VALID_DT_YN.appendChild( xmlDoc.createTextNode(     $("#VALID_DT_YN").val()        )	);                     
	VALID_DD.appendChild( xmlDoc.createTextNode(        $("#VALID_DD").val()           )	);                     
	TAX_GB.appendChild( xmlDoc.createTextNode(	        $("#TAX_GB").val()             )	);                       
	BASE_WPRC.appendChild( xmlDoc.createTextNode(       $("#BASE_WPRC").val()          )	);  
	BASE_WVAT.appendChild( xmlDoc.createTextNode(       $("#BASE_WVAT").val()          )	);  
	BASE_SPRC.appendChild( xmlDoc.createTextNode(       $("#BASE_SPRC").val()          )	);                     
	ITM_FORM.appendChild( xmlDoc.createTextNode(        $("#ITM_FORM").val()           )	);                     
	IPSU_QTY.appendChild( xmlDoc.createTextNode(        $("#IPSU_QTY").val()           )	);                     
	UNIT.appendChild( xmlDoc.createTextNode(	        $("#UNIT").val()               )	);                     
	DP_PRC_UNIT.appendChild( xmlDoc.createTextNode(     $("#DP_PRC_UNIT").val()        )	);                     
	ROUTE_GB.appendChild( xmlDoc.createTextNode(        $("#ROUTE_GB").val()           )	);                     
	TPER_MTHD.appendChild( xmlDoc.createTextNode(       $("#TPER_MTHD").val()          )	);                     
	MAKE_VEN_NAME.appendChild( xmlDoc.createTextNode(   $("#MAKE_VEN_NAME").val()      )	);                     
	ORG_CODE.appendChild( xmlDoc.createTextNode(        $("#ORG_CODE").val()           )	);                     
	ORD_GB.appendChild( xmlDoc.createTextNode(	        $("#ORD_GB").val()             )	);                       
	STR_DT.appendChild( xmlDoc.createTextNode(	        $("#STR_DT").val()             )	);                       
	END_DT.appendChild( xmlDoc.createTextNode(	        $("#END_DT").val()             )	);                       
	END_IND.appendChild( xmlDoc.createTextNode(         $("#END_IND").val()            )	);                     
	BOT_CODE.appendChild( xmlDoc.createTextNode(     	$("#BOT_CODE").val()           )	); 
	BOT_SPRC.appendChild( xmlDoc.createTextNode(     	$("#BOT_SPRC").val()           )	); 
	REPT_YN.appendChild( xmlDoc.createTextNode(         $(':radio[name="REPT_YN"]:checked').val()    )	); 
	REPT_ITM_CODE.appendChild( xmlDoc.createTextNode(   $("#REPT_ITM_CODE").val()      )	); 
	REPT_SCAN_CODE.appendChild( xmlDoc.createTextNode(  $("#REPT_SCAN_CODE").val()     )	); 
	IN_CAPACITY.appendChild( xmlDoc.createTextNode(     $("#IN_CAPACITY").val()        )	); 
	
	
	
	var FRESH_BARCODE_VAL = "";
	if ($('#FRESH_BARCODE').is(":checked"))
	{
		FRESH_BARCODE_VAL = "Y";
	} else {
		FRESH_BARCODE_VAL = "N"; 
	}
	
	 
	FRESH_BARCODE.appendChild( xmlDoc.createTextNode(  FRESH_BARCODE_VAL   )	); 
	 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	FRESH_BARCODE     ); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	BOT_CODE 		  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	BOT_SPRC 		  );  
//	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( WSAL_RATE_1 );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	WSAL_RATE_2 	  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	WSAL_RATE_3 	  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	WSAL_RATE_4 	  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	WSAL_RATE_5 	  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	FTRACE_YN  		  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	STRACE_YN  		  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	MTRACE_YN  		  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	INGR_YN  		  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	MBR_DC_YN  		  );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( 	POINT_SAVE  	  );   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE          );   
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_STD           ); 
    xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	NO_BARCODE        );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_GB            );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CLS_CODE          );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_NAME          );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_SHORT_NAME    );   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	VEN_CODE          );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SCAN_CODE         );     
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	VALID_DT_YN       );     
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	VALID_DD          );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TAX_GB            );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BASE_WPRC         );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BASE_WVAT         );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BASE_SPRC         );     
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_FORM          );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	IPSU_QTY          );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	UNIT              );         
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  DP_PRC_UNIT       );     
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  ROUTE_GB          );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  TPER_MTHD         );     
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  MAKE_VEN_NAME     );   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  ORG_CODE          );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  ORD_GB            );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  STR_DT            );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  END_DT            );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  END_IND           );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  REPT_YN           );   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  REPT_ITM_CODE     );       
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  REPT_SCAN_CODE    );  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(  IN_CAPACITY    );  
	 
	
	
    productMasterDetail  =  "<GRIDLIST>"+getXmlString(   xmlDoc   )+"</GRIDLIST>" ; 
	     
 
	// 취급점포 그리드 저장하기 위해서 XML로 만듬 
    var gridXmlData1 = ""; 
	var rowCnt  = gridRoot1.getCollection().getSource() ;  
	for(var i=0 ; i < rowCnt.length ; i++)
	{    gridXmlData1 = gridXmlData1 + getXmlString(   gridRoot1.getItemAt(i)   );     }  
	gridXmlData1 =  "<GRIDLIST>"+gridXmlData1+"</GRIDLIST>" ;
	
	
	// 묶음상품 그리드 저장하기 위해서 XML로 만듬 
    var gridXmlData2 = ""; 
	var rowCnt2  = gridRoot2.getCollection().getSource() ;  
	for(var i=0 ; i < rowCnt2.length ; i++)
	{    gridXmlData2 = gridXmlData2 + getXmlString(   gridRoot2.getItemAt(i)   );     }  
	gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
	
	
	 
	
	// 상품 마스터 상세 및 취급점포 그리드 저장  
	jQuery.ajax({ 
	    url:"/productMasterRegister.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {   "CRUD_BIT"     		  : crudBit
				, "PRODUCT_MASTER_DETAIL" : productMasterDetail  
				, "gridXmlData1" 		  : gridXmlData1
				, "gridXmlData2" 		  : gridXmlData2    
	    }, 
		success:function(data){   
			if(  data[0].RETURN_CODE  == "0000")
			{  
				alert("상품 저장에 성공 하였습니다");
				
				if(crudBit != 'C'){		//신규가 아니면
					btn_search();
				}else if(crudBit == 'C'){	//신규
					$('#S_ITM_CODE').val(data[0].RETURN_ITM_CODE);	//상품명(코드)
					$('#SCAN_CODE').val(data[0].RETURN_SCAN_CODE);	//스캔코드
					$('#S_ITM_NAME').val($('#ITM_NAME').val());		//상단 상품명
					$('#S_SCAN_CODE').val(data[0].RETURN_SCAN_CODE);	//hidden 상품코드
					$('#ITM_CODE').val(data[0].RETURN_ITM_CODE);	//상품명
					btn_search();
				}
				/*console.log("RETURN_ITM_CODE : " + data[0].RETURN_ITM_CODE);
				console.log("---------------------------------------------------");
				console.log("RETURN_SCAN_CODE : " + data[0].RETURN_SCAN_CODE);
				console.log("---------------------------------------------------");
				console.log(JSON.stringify(data));*/
				
				
				// 저장에 성공 했으므로  수정 모드로 바꾼다
				crudBit = "U";   
				
				// 이미지 저장
//				imgSave(data[0].RETURN_ITM_CODE);
				 
				//alert("상품 저장에 성공 하였습니다");
				//btn_new("N");	// 주석해제시, 리셋됨(초기화)
				
			} else {
				alert("상품 저장에 실패 하였습니다");
			}   
			
	    },
	    complete : function(data) {
//	    	  location.reload();
//	    	gridRoot1.removeAll();
//	    	console.log("-------------------------------");
//	    	
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	 
//	
	
	
	
}

function imgSave(ITM_CODE)
{
	 
//	 var frm = document.getElementById('imageFile');
//	    frm.method = 'POST';
//	    frm.enctype = 'multipart/form-data';
//	  
//	    var fileData = new FormData(frm);
//
//	    return;
	   
//	document.getElementsByName('txt3')[0].value
//	for (var i=0; i<document.getElementsByName('txt3').length; i++) {
//	    alert(document.getElementsByName('txt3')[i].value);
//	}
//	document.getElementsByTagName('input').item('txt3',0).value
//	for (var i=0; i<document.getElementsByTagName('input').item('txt3').length; i++) {
//	    alert(document.getElementsByTagName('input').item('txt3',i).value);
//	}
	
//	var formData = new FormData();   
//  $("input[name='imageFile']").each(function (i) {  
//		formData.append("imageFile"+i, $("input[name='imageFile']").eq(i).val() );
//		alert($("input[name='imageFile']").eq(i).val());
//	}); 
//  return;
	
	
//	var formData = new FormData(); 
//	var frm = null;
//	for (var i=0; i<document.getElementsByName('imageFile').length; i++) 
//	{ 
//		frm  = document.getElementsByName('imageFile')[i]  ;
//		frm.enctype = 'multipart/form-data';
//		formData.append("imageFile["+i+"]" , frm );
//	}
	
	 
	  
	
     
     $("#uploadForm").submit();
 
 
	 

 
	
}


function btn_new(show){
	
	if(  show == "Y")
	{ 
		if (confirm("조회된 데이터들을 초기화 시키시겠습니까?") == false){     
		
			return;
		}
	}
	
	// 신규 모드
	crudBit = "C";
	$('#ITM_STD').removeAttr("disabled");	//신규등록시 disabled 해제 
	
	$('#P_CALLBACK_NM3').val("");		//협렵업체 검색 콜백함수 value 초기화
	// 신규  초기화  
	// 특정 아이디 값의 필드를 제외 :  $(':text:not([id=TEL_NO4])').val('');
    // 특정 2개의 id 값 제외하고 체크박스 초기화 : $('input:checkbox:not([id=ckmail]):not([id=ckmin])').attr('checked','');
	// text box 초기화 :  $(':text').val('');    
	// 셀렉트 박스 초기화
	//	 $('select').each(function(){
	//	 	 $(this).find('option:first').attr('selected','true');
	//	 });
	
	// 조회조건 초기화
	$("form").each(function() {  
        if(this.id == "frmSearch") this.reset();  
     });  
	
	// 기본 입력란 초기화
	$("form").each(function() {  
        if(this.id == "frmBody") this.reset();  
    });  
	
	// 상태관리등록란 초기화
	$("form").each(function() {  
        if(this.id == "frmStatus") this.reset();  
    });  
	
	
	//  중 소 분류 초기화  
	$("#MID_CODE  option[value!='']").remove();
	$("#CLS_CODE  option[value!='']").remove();
 
	//권고발주 수동(1)으로 세팅
	$("#ORD_GB").val("1");  // 권고발주대상 콤보 세팅 후 수동(1) 로 세팅
	
	
	// 가격에 0 으로 초기화
//	$("#BASE_WPRC_TOT").val("");  
	$("#BASE_WPRC").val("0");    
	
	$("#BASE_WVAT").val("0");   	// 부가세
//	$("#BASE_SPRC").val("");   // 기준매가(VAT포함)
	
	 
	//취급일자는 시스템 날짜 + 1 해서 default 로 넣는다
	var STR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#STR_DT").val( STR_DT );
	 
	// 특단가여부(회원할인) 체크박스는 Y 디폴트 
	$('input:checkbox[id="MBR_DC_YN"]').attr("checked", true); 
    //  포인트적립 체크박스는 Y 디폴트 
	$('input:checkbox[id="POINT_SAVE"]').attr("checked", true); 
	
	
	
	$("#END_IND").val("0"); 
	
	//이익율 /  이익액 0으로 초기화
	$("#PROFIT_PRC").val("0"); 
	$("#PROFIT_PER").val("0"); 
	 
	//유효일수
	$("#VALID_DD").val("0");
	$("input[name=VALID_DD]").attr("readonly",true);
	
	// 도매할인 
//	$("#WSAL_RATE_1").val("0");  
	$("#WSAL_RATE_2").val("0");  
	$("#WSAL_RATE_3").val("0");  
	$("#WSAL_RATE_4").val("0");  
	$("#WSAL_RATE_5").val("0");  
	
	

	// 관리구분 코드를 다시 뿌려준다. 이유는, 수정시에 해당 값을제외한 값을 remove 했기 때문에.  
	// 전체 remove -> "선택" 추가 후 다시 조회한다. 
	$("select[name='ITM_STD'] option").remove();
	$("#ITM_STD").prepend("<option value=''>선택</option>"); 
	getCommonCodeSelectBoxList("ITM_STD"   ,   "ITM_STD"	); 
	
	// 안전재고 
	$("#STKLM_QTY").val("0");  
	// LEAD_TIME
	$("#LEAD_TIME").val("0");  
	
	$("input[name=SCAN_CODE]").attr("readonly",false);

//	$("#ORG_CODE").val("KR");  // 원산지(1) 한국으로 세팅
	 

	$('input:checkbox[id="FTRACE_YN"]').attr("checked", false); 
	$('input:checkbox[id="STRACE_YN"]').attr("checked", false);	 
	$('input:checkbox[id="MTRACE_YN"]').attr("checked", false);	 
	$('input:checkbox[id="INGR_YN"]').attr("checked", false);	 
	$('input:checkbox[id="MBR_DC_YN"]').attr("checked", true);	 
	$('input:checkbox[id="POINT_SAVE"]').attr("checked", true);
	
	 
	$('input:checkbox[id="SET_ALL_STORE"]').attr("checked", false);  
	$('input:checkbox[id="FOOD_MART"]').attr("checked", false);  
	$('input:checkbox[id="MART_AND_MART"]').attr("checked", false); 
	$('input:checkbox[id="DC_CENTER"]').attr("checked", false); 
		
	
	$('input:radio[name=REPT_YN]:input[value=NORMAL]').attr("checked", true);
	$("input[name=REPT_YN]").attr("disabled",false); 
	$("#REPT_ITM_NAME").hide(); 
	$("#BTN_REPT_ITM_NAME").hide(); 
  
	
	chgItmGb();
	$("input[name=BASE_WPRC_TOT]").attr("readonly",false);
    $("input[name=BASE_SPRC]").attr("readonly",false);
	
    $('#NO_BARCODE').hide();
	
	//그리드1 초기화 
	gridRoot1.removeAll( );
	
	 
}

function btn_search(){
	first_flag = "N";
	$('#P_CALLBACK_NM3').val("");		//협렵업체 검색 콜백함수 value 초기화
	$('#FRESH_BARCODE_DIV').hide(); 
	$('input:checkbox[id="FRESH_BARCODE"]').attr("checked", false); 
	
	var P_CORP_CODE = "";
	var P_ITM_CODE  = "";
	if( $("#S_ITM_CODE").val()  == "" )
	{   alert("조회 할 상품을 검색 하세요.");
		$("#S_ITM_NAME").focus();
		return;
	}
	    
	jQuery.ajax({ 
	    url:"/productMasterDetail.do",               
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
			  "ITM_CODE"      : $("#S_ITM_CODE").val() 
		,	  "SCAN_CODE"     : $("#S_SCAN_CODE").val()  
		}, 
		success:function(data){  
		    // gridApp1.setData(data);     

			
			 
			
			$("input[name=SCAN_CODE]").attr("readonly",true);
			$('#NO_BARCODE').hide();
			
			
  			if(data.length == "1")   // 조회결과가 있을때만 수정 저장 모드로 변경
  			{ 	crudBit = "U";  }
  			   
  			P_CORP_CODE = data[0].CORP_CODE;
  			P_ITM_CODE  = data[0].ITM_CODE;
  			
  			$('#PRGT_RATE').val(		data[0].SALE_RATE		);  // 수수료율
			$('#CORP_CODE').val(		data[0].CORP_CODE		);
			$('#ITM_CODE').val(			data[0].ITM_CODE		);
			$('#SCAN_CODE').val(		data[0].SCAN_CODE		);
			$('#ITM_NAME').val(			data[0].ITM_NAME		);
			$('#ITM_SHORT_NAME').val(	data[0].ITM_SHORT_NAME	);
			$('#VEN_CODE').val(			data[0].VEN_CODE		);   
			$('#VEN_NAME').val(			data[0].VEN_NAME		);  
			$('#ITM_STD').val(			data[0].ITM_STD			);
			$('#END_IND').val(			data[0].END_IND			);
			$('#GRE_GB').val(			data[0].GRE_GB			); 
/*ttt
			var column1 = gridRoot1.getObjectById("PRGT_RATE"); 
			if(  data[0].GRE_GB == "2" )   // 임대을 (2) 일때만 수수료율 수정가능하게 한다.
			{ 
				column1.editable = true; 
			} else { 
				column1.editable = false; 
			}*/
			
			
			$('#GRE_GB_NM').val(			data[0].GRE_GB_NM			); 
			//취급일자
			var STR_DT = data[0].STR_DT;  
			$('#STR_DT').val( STR_DT.substr(0,4) + "-" + STR_DT.substr(4,2) + "-" + STR_DT.substr(6,2) );
			
			//종료일자
			var END_DT = data[0].END_DT;    
			if(END_DT == "" || typeof END_DT == "undefined")
			{
				$('#END_DT').val( "" );
			} else {
				$('#END_DT').val( END_DT.substr(0,4) + "-" + END_DT.substr(4,2) + "-" + END_DT.substr(6,2)  );
			}
			  
			//종료일자 입력가능하게 풀기
			// 신규 혹은 최초페이지 일때 거래종료일 입력 못 받게 한다.     
			$("#END_DT").datepicker( "option", "disabled", false );
			$("input[name=END_DT]").attr("readonly",false);
			 
			// 관리구분은 못바꾸게 해당 값이외는 지워준다. data[0].ITM_STD
//			$("#ITM_STD").val()
			//getCommonCodeSelectBoxList("ITM_STD"   ,   "ITM_STD"	);   // 관리구분
			//$('#ITM_STD option[value!="'+data[0].ITM_STD+'"]').remove();
			//$("input[name=ITM_STD]").attr("disabled","disabled);
			
			$('#ITM_STD').attr("disabled","false");	//못바꾸게 disabled 처리
			
			// 분류 카테고리 세팅 - 시작
			var CLS_CODE =  data[0].CLS_CODE ;       // 소분류
			var MID_CODE =  CLS_CODE.substr(0, 4);	 // 중분류
			var LRG_CODE =  CLS_CODE.substr(0, 2);	 // 대분류
			 
			 // 대 중 소 분류 바인딩  : 첫번째인자=html오브젝트     두번째인자=대(1)중(2)소(3) 구분      세번째인자=분류 구분 코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. 
			getCateCodeSelectBoxList("LRG_CODE"   , "1" ,  ""   );    		// 대 분류 
			getCateCodeSelectBoxList("MID_CODE"   , "2" ,  LRG_CODE   );    // 중 분류 
			getCateCodeSelectBoxList("CLS_CODE"   , "3" ,  MID_CODE   );    // 소 분류 
			 
			$('#LRG_CODE').val(	LRG_CODE );
			$('#MID_CODE').val(	MID_CODE );
			$('#CLS_CODE').val(	CLS_CODE );
			// 분류 카테고리 세팅 - 끝
			 
			$('#ITM_GB').val(			data[0].ITM_GB			);
			$('#ITM_FORM').val(			data[0].ITM_FORM		);
			$('#TAX_GB').val(			data[0].TAX_GB			);
			$('#UNIT').val(				data[0].UNIT			);
			$('#IPSU_QTY').val(			data[0].IPSU_QTY		);
			$('#IN_CAPACITY').val(		data[0].IN_CAPACITY		);
			$('#UNIT_CAPACITY').val(	data[0].UNIT_CAPACITY	);
			$('#DP_PRC_UNIT').val(		data[0].DP_PRC_UNIT		);
			$('#MAKE_VEN_NAME').val(	data[0].MAKE_VEN_NAME	);
			$('#ORG_CODE').val(			data[0].ORG_CODE		);
			$('#ROUTE_GB').val(			data[0].ROUTE_GB		);
			$('#ORD_GB').val(			data[0].ORD_GB			);
			$('#BASE_WPRC').val(		data[0].BASE_WPRC		);
 
//			var priceVat = calPriceVat(  data[0].BASE_WPRC   ,  data[0].TAX_GB );  
			$("#BASE_WPRC").val(  		data[0].BASE_WPRC		);
			$("#BASE_WVAT").val(   		data[0].BASE_WVAT 		);	 
			$("#BASE_WPRC_TOT").val(    parseFloat( data[0].BASE_WPRC )  +  parseFloat( data[0].BASE_WVAT ) );
			
			$('#BASE_SPRC').val(		data[0].BASE_SPRC		);
			$('#BOT_CODE').val(			data[0].BOT_CODE		);
			$('#BOT_SPRC').val(			data[0].BOT_SPRC		);
			$('#MTRACE_YN').val(		data[0].MTRACE_YN		);    
			$('#VALID_DT_YN').val(		data[0].VALID_DT_YN		);    //유효기간관리유무
			$('#VALID_DD').val(			data[0].VALID_DD		);    //유효일수
			 
			// 이익율, 이익액 계산
			setCalProfit();
			
			
			//영유아식품이력
			if(data[0].FTRACE_YN == "N")
			{  	$('input:checkbox[id="FTRACE_YN"]').attr("checked", false);  } 
			else 
			{ 	$('input:checkbox[id="FTRACE_YN"]').attr("checked", true);   }
			 
			//수산이력
			if(data[0].STRACE_YN == "N")
			{  	$('input:checkbox[id="STRACE_YN"]').attr("checked", false);  } 
			else 
			{ 	$('input:checkbox[id="STRACE_YN"]').attr("checked", true);   }
			
			//축산물이력
			if(data[0].MTRACE_YN == "N")
			{  	$('input:checkbox[id="MTRACE_YN"]').attr("checked", false);  } 
			else 
			{ 	$('input:checkbox[id="MTRACE_YN"]').attr("checked", true);   }
			
			//공산식자재
			if(data[0].INGR_YN == "N")
			{  	$('input:checkbox[id="INGR_YN"]').attr("checked", false); 	 } 
			else 
			{ 	$('input:checkbox[id="INGR_YN"]').attr("checked", true);     }
			 
			//포인트적립
			if(data[0].POINT_SAVE == "N")
			{   $('input:checkbox[id="POINT_SAVE"]').attr("checked", false);  } 
			else 
			{   $('input:checkbox[id="POINT_SAVE"]').attr("checked", true);   }
			 
			//특단가여부(회원할인)
			if(data[0].MBR_DC_YN == "N")
			{ 	$('input:checkbox[id="MBR_DC_YN"]').attr("checked", false);   } 
			else 
			{   $('input:checkbox[id="MBR_DC_YN"]').attr("checked", true);    } 
			  
//			$('#WSAL_RATE_1').val(		data[0].WSAL_RATE_1		);
			$('#WSAL_RATE_2').val(		data[0].WSAL_RATE_2		);
			$('#WSAL_RATE_3').val(		data[0].WSAL_RATE_3		);
			$('#WSAL_RATE_4').val(		data[0].WSAL_RATE_4		);
			$('#WSAL_RATE_5').val(		data[0].WSAL_RATE_5		);
			$('#TPER_MTHD').val(		data[0].TPER_MTHD		);
			$('#CFM_FLAG').val(			data[0].CFM_FLAG		);
			$('#USE_YN').val(			data[0].USE_YN			);
			$('#IEMP_NO').val(			data[0].IEMP_NO			);
			$('#IDATE').val(			data[0].IDATE			);
			$('#UEMP_NO').val(			data[0].UEMP_NO			);
			$('#UDATE').val(			data[0].UDATE			);
			
			 
 			//  묶음 상품 관련 시작
 			//  N : 묶음 하위        Y : 묶음 대표     Y : 일반  
			//  DB 에서 리턴되는 REPT_YN_WEB는  NORMAL 과 MULTI 두 종류가 리턴된다.    
			//  NORMAL은 일반이고, MULTI 는 묶음대표와 묶음하위 이므로 웹에서 표현됨
			//  MULTI에서  묶음대표와 묶음 하위 구분 :  REPT_YN이 Y이면 묶음 대표, N이면 묶음하위  
			 
			 
			
			
			// NORMAL (일반)
			if(   data[0].REPT_YN_WEB == "NORMAL"  )
			{   $('input:radio[name=REPT_YN]:input[value=NORMAL]').attr("checked", true); 
				$('#REPT_ITM_NAME').val( "" );
				$('#REPT_YN_DIV').hide();
			}
			
			// MULTI   :REPT_YN이 Y이면 묶음 대표 ->  묶음 대표 
			if(   data[0].REPT_YN_WEB == "MULTI"   &&   data[0].REPT_YN  == "Y" )
			{   $('input:radio[name=REPT_YN]:input[value=MULTI]').attr("checked", true); 
				$('#REPT_ITM_NAME').val( "" );
				$('#REPT_YN_DIV').hide();
			}
			
			// MULTI   : REPT_YN이 N이면 묶음 대표 ->  묶음 하위
			if(   data[0].REPT_YN_WEB == "MULTI"  && data[0].REPT_YN  == "N"   )
			{   $('input:radio[name=REPT_YN]:input[value=MULTI]').attr("checked", true);
				$('#REPT_ITM_NAME').val( data[0].REPT_ITM_NAME );
				$('#REPT_YN_DIV').show();
			}   
			
			
			$("input[name=REPT_YN]").attr("disabled",true);
			$("input[name=REPT_ITM_NAME]").attr("disabled",true); 
			$("#BTN_REPT_ITM_NAME").hide();  
			
			
			
// S : 묶음 하위        Y : 묶음 대표      N : 일반   ====> 
//			if(   data[0].REPT_YN == "S"   )
//			{   $('input:radio[name=REPT_YN]:input[value=Y]').attr("checked", true);
//				$('#REPT_ITM_NAME').val( data[0].REPT_ITM_NAME );
//				$('#REPT_YN_DIV').show();
//			}   
//			if(   data[0].REPT_YN == "Y" )
//			{   $('input:radio[name=REPT_YN]:input[value=Y]').attr("checked", true);
//				$('#REPT_YN_DIV').hide();
//				$('#REPT_ITM_NAME').val( "" );
//			} 
//			if(   data[0].REPT_YN == "N" )
//			{   $('input:radio[name=REPT_YN]:input[value=N]').attr("checked", true);
//				$('#REPT_YN_DIV').hide();
//				$('#REPT_ITM_NAME').val( "" );
//			}
			
			
			// 생식일때 금액들을 0으로 초기화 한다.
//			if( data[0].ITM_GB == "1" )
//			{
				chgItmGb();
//			}
			   
		 
			// 그리드 초기화
			gridRoot1.removeAll();
			 
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	alert("code:"+xhr.status);

	    }
	});
	
	//묶음상품 조회
/*	jQuery.ajax({ 
	    url:"/productMukkum.do",               
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
			  "ITM_CODE"      : $("#S_ITM_CODE").val() 
			  ,"SCAN_CODE"     : $("#S_SCAN_CODE").val()  
		}, 
		success:function(data){  
			if(data.length > "1"){
				gridApp2.setData(data);
				gridRoot2.removeAll();
			}else{
				//gridRoot2.removeAll();
				gridRoot2.removeAll();
			}
			console.log("data.length : " + data.length); 
			console.log("data : " + JSON.stringify(data));
	
		},
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	alert("code:"+xhr.status);

	    }
	});*/
	
	//묶음상품 조회 grid-2
	jQuery.ajax({ 
		  url:"/productMukkum.do",               
		    type:"POST",
			datatype:"json",
			async:false,
			data: {
				  "ITM_CODE"      : $("#S_ITM_CODE").val() 
				  ,"SCAN_CODE"     : $("#S_SCAN_CODE").val()  
			}, 
		success:function(data){  
			// gridApp2.setData( data );  
			console.log(data.length);
			if(data.length > "1"){
				//그리드1 초기화 
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
					var CORP_CODE 		     	 = xmlDoc.createElement('CORP_CODE');
					var SCAN_CODE 		     	= xmlDoc.createElement('SCAN_CODE');
					var ITM_CODE 		     	= xmlDoc.createElement('ITM_CODE');
					var REPT_YN 		     		= xmlDoc.createElement('REPT_YN');
					var ITM_NAME 		     		= xmlDoc.createElement('ITM_NAME');
					
	
					
					CORP_CODE.appendChild(			xmlDoc.createTextNode(	data[i].CORP_CODE				)	);
					SCAN_CODE.appendChild(		xmlDoc.createTextNode(	data[i].SCAN_CODE		)	);
					ITM_CODE.appendChild(		xmlDoc.createTextNode(	data[i].ITM_CODE		)	);
					REPT_YN.appendChild(		xmlDoc.createTextNode(	data[i].REPT_YN		)	);
					ITM_NAME.appendChild(		xmlDoc.createTextNode(	data[i].ITM_NAME		)	);
	
					
					
					 
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CORP_CODE			);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SCAN_CODE		);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE		);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	REPT_YN		);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_NAME		);
	
					
					gridRoot2.addItemAt(  xmlDoc  , 0 ,  false );
				
					 
			}
			 
			/*// row 속성 제거
			for(var j=0 ; j < data.length ; j++ )
			{   var selectedItem = gridRoot1.getItemAt(j);
				gridRoot1.removeChangedData(	selectedItem	);
			}
			//그리드 속성 refresh
			dataGrid1.invalidateList();
			dataGrid2.invalidateList();*/
			}else{
				gridRoot2.removeAll();
			}
			
	    },
	    complete : function(data) {
	    	 
	       
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//박스상품 조회 grid-3
	jQuery.ajax({ 
		  url:"/productBoxList.do",               
		    type:"POST",
			datatype:"json",
			async:false,
			data: {
				  "ITM_CODE"      : $("#S_ITM_CODE").val() 
				  ,"SCAN_CODE"     : $("#S_SCAN_CODE").val()  
			}, 
		success:function(data){  
			console.log(data.length);
			console.log(JSON.stringify(data));
				//그리드1 초기화 
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
					var CORP_CODE 		     	 = xmlDoc.createElement('CORP_CODE');
					var BOX_CODE 		     	= xmlDoc.createElement('BOX_CODE');
					var ITM_CODE_EA 		     	= xmlDoc.createElement('ITM_CODE_EA');
					var ITM_NAME 		     		= xmlDoc.createElement('ITM_NAME');
					var IPSU_QTY 		     		= xmlDoc.createElement('IPSU_QTY');
					
					
	
					
					CORP_CODE.appendChild(			xmlDoc.createTextNode(	data[i].CORP_CODE				)	);
					BOX_CODE.appendChild(		xmlDoc.createTextNode(	data[i].BOX_CODE		)	);
					ITM_CODE_EA.appendChild(		xmlDoc.createTextNode(	data[i].ITM_CODE_EA		)	);
					ITM_NAME.appendChild(		xmlDoc.createTextNode(	data[i].ITM_NAME		)	);
					IPSU_QTY.appendChild(		xmlDoc.createTextNode(	data[i].IPSU_QTY		)	);
					
					
					 
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CORP_CODE			);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOX_CODE		);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE_EA		);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_NAME		);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	IPSU_QTY		);
	
					
					gridRoot3.addItemAt(  xmlDoc  , 0 ,  false );
				
					 
			}
			 

			
			
	    },
	    complete : function(data) {
	       
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	
	// 상품 구분에 생식 비생식 넣어주기
	jQuery.ajax({
	    type:"POST",
	    url:"/getItmGb.do",             
	    dataType:"JSON", 
	    data: {  LRG_CODE  :    $('#LRG_CODE').val()    }, 
	    async:false,
	    success : function(data) { 
	    	if(  data.length > 0 )
	    	{
	    		 
	    		
	    		 $('#ITM_GB').val(   	data[0].ITM_GB     );
	    		 $('#ITM_GB_NM').val(   data[0].ITM_GB_NM  ); 
	    	} else {
	    		 $('#ITM_GB').val(   	""   );
	    		 $('#ITM_GB_NM').val(   ""   ); 
	    	} 
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) { 
	    }
	});
	
	
	 
	// 취급점포 리스트 보여주기 - grid1 
	jQuery.ajax({ 
	    url:"/productStoreList.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
	 	data: {  "CORP_CODE" : P_CORP_CODE   
	 		  ,  "ITM_CODE"  : P_ITM_CODE         
	 	},
		success:function(data){  
			// gridApp2.setData( data );  
			
			//그리드1 초기화 
			gridRoot1.removeAll( );
			  
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
				var CRUD 		     	 = xmlDoc.createElement('CRUD');
				var CHECK_BOX 		     = xmlDoc.createElement('CHECK_BOX');
				var STR_NAME 		     = xmlDoc.createElement('STR_NAME');
				var STR_CODE 		     = xmlDoc.createElement('STR_CODE');
				var VEN_NAME          	 = xmlDoc.createElement('VEN_NAME');
				var VEN_CODE             = xmlDoc.createElement('VEN_CODE');
				var WPRC_TOT             = xmlDoc.createElement('WPRC_TOT');
				var WPRC                 = xmlDoc.createElement('WPRC');
				var WVAT          	 	 = xmlDoc.createElement('WVAT');  
				var SPRC             	 = xmlDoc.createElement('SPRC');
				var ROUTE_GB_NM      	 = xmlDoc.createElement('ROUTE_GB_NM');   
				var ROUTE_GB             = xmlDoc.createElement('ROUTE_GB');
				var STR_DT               = xmlDoc.createElement('STR_DT');
				var ORD_GB_NM            = xmlDoc.createElement('ORD_GB_NM');     
				var ORD_GB               = xmlDoc.createElement('ORD_GB');
				var UNIT_NM              = xmlDoc.createElement('UNIT_NM');
				var UNIT                 = xmlDoc.createElement('UNIT');
				var IPSU_QTY             = xmlDoc.createElement('IPSU_QTY');    
				var STKLM_QTY            = xmlDoc.createElement('STKLM_QTY');     
				var LEAD_TIME            = xmlDoc.createElement('LEAD_TIME');
				var ORG_CODE_NM          = xmlDoc.createElement('ORG_CODE_NM');  
				var ORG_CODE             = xmlDoc.createElement('ORG_CODE');
				var GRE_GB_NM            = xmlDoc.createElement('GRE_GB_NM');
				var GRE_GB               = xmlDoc.createElement('GRE_GB');
				var PRGT_RATE            = xmlDoc.createElement('PRGT_RATE');
				var PROFIT_PRC			= xmlDoc.createElement('PROFIT_PRC');
				var PROFIT_PER			= xmlDoc.createElement('PROFIT_PER');
				var ITM_CODE             = xmlDoc.createElement('ITM_CODE');
				var WEIGHT_YN_NM         = xmlDoc.createElement('WEIGHT_YN_NM');  
				var WEIGHT_YN            = xmlDoc.createElement('WEIGHT_YN');
				var GIFT_APP_YN_NM       = xmlDoc.createElement('GIFT_APP_YN_NM');
				var GIFT_APP_YN          = xmlDoc.createElement('GIFT_APP_YN');
				var SCAN_CODE            = xmlDoc.createElement('SCAN_CODE');
				var CLS_CODE             = xmlDoc.createElement('CLS_CODE');
				var POINT_SAVE_NM        = xmlDoc.createElement('POINT_SAVE_NM'); 
				var POINT_SAVE           = xmlDoc.createElement('POINT_SAVE');
				var MBR_DC_YN_NM         = xmlDoc.createElement('MBR_DC_YN_NM');  
				var MBR_DC_YN            = xmlDoc.createElement('MBR_DC_YN');
				var END_IND_NM           = xmlDoc.createElement('END_IND_NM');
				var END_IND              = xmlDoc.createElement('END_IND');
				var CUR_INV_QTY              = xmlDoc.createElement('CUR_INV_QTY');
				
				
				
				
				
				CRUD.appendChild(			xmlDoc.createTextNode(	""						)	);
				CHECK_BOX.appendChild(		xmlDoc.createTextNode(	data[i].CHECK_BOX		)	);
				STR_NAME.appendChild(		xmlDoc.createTextNode(	data[i].STR_NAME		)	);
				STR_CODE.appendChild(		xmlDoc.createTextNode(	data[i].STR_CODE		)	);
				VEN_NAME.appendChild(		xmlDoc.createTextNode(	data[i].VEN_NAME		)	);
				VEN_CODE.appendChild(		xmlDoc.createTextNode(	data[i].VEN_CODE		)	);
				WPRC_TOT.appendChild(		xmlDoc.createTextNode(	parseFloat( data[i].WPRC ) + parseFloat( data[i].WVAT )   )	);
				WPRC.appendChild(			xmlDoc.createTextNode(	data[i].WPRC			)	);
				
//				// 부가세 계산
//				var SUR_TAX_VAL = 0;
//				if(  $("#TAX_GB").val()  == "1"  )  // 과세시 vat 계산
//				{
//					var BASE_WPRC = data[i].WPRC ; 
//					SUR_TAX_VAL = ( 10 * BASE_WPRC ) / 100 ;  
//				} else {
//					SUR_TAX_VAL = 0 ;   // 면세이므로 부가세 필드에 0
//				}
				WVAT.appendChild(			xmlDoc.createTextNode(	data[i].WVAT			)	);
				SPRC.appendChild(			xmlDoc.createTextNode(	data[i].SPRC			)	);
				ROUTE_GB_NM.appendChild(	xmlDoc.createTextNode(	data[i].ROUTE_GB_NM		)	);
				ROUTE_GB.appendChild(		xmlDoc.createTextNode(	data[i].ROUTE_GB		)	);
				STR_DT.appendChild(			xmlDoc.createTextNode(	data[i].STR_DT			)	); 
				ORD_GB_NM.appendChild(		xmlDoc.createTextNode(	data[i].ORD_GB_NM		)	);
				ORD_GB.appendChild(			xmlDoc.createTextNode(	data[i].ORD_GB			)	);
				UNIT_NM.appendChild(		xmlDoc.createTextNode(	data[i].UNIT_NM			)	);
				UNIT.appendChild(			xmlDoc.createTextNode(	data[i].UNIT			)	);
				IPSU_QTY.appendChild(		xmlDoc.createTextNode(	data[i].IPSU_QTY		)	);
				STKLM_QTY.appendChild(		xmlDoc.createTextNode(	data[i].STKLM_QTY		)	);
				
				 
				 
				var LEAD_TIME_VAL = "";
				if(  typeof data[i].LEAD_TIME	 == "undefined")
				{
					LEAD_TIME_VAL = "0";
				} else {
					LEAD_TIME_VAL = data[i].LEAD_TIME	;
				}
				LEAD_TIME.appendChild(		xmlDoc.createTextNode(	LEAD_TIME_VAL		)	); 
				CUR_INV_QTY.appendChild(    xmlDoc.createTextNode(	data[i].CUR_INV_QTY		)	); 
				
				
				
				var ORG_CODE_NM_VAL = "";
				if(  typeof data[i].ORG_CODE_NM	 == "undefined")
				{
					ORG_CODE_NM_VAL = "";
				} else {
					ORG_CODE_NM_VAL = data[i].ORG_CODE_NM	;
				}
				var ORG_CODE_VAL = "";
				if(  typeof data[i].ORG_CODE 	 == "undefined")
				{
					ORG_CODE_VAL = "";
				} else {
					ORG_CODE_VAL = data[i].ORG_CODE	;
				}
				
				ORG_CODE_NM.appendChild(	xmlDoc.createTextNode(	ORG_CODE_NM_VAL			)	);
				ORG_CODE.appendChild(		xmlDoc.createTextNode(	ORG_CODE_VAL			)	);
				GRE_GB_NM.appendChild(		xmlDoc.createTextNode(	data[i].GRE_GB_NM		)	);
				GRE_GB.appendChild(			xmlDoc.createTextNode(	data[i].GRE_GB			)	);
				PRGT_RATE.appendChild(		xmlDoc.createTextNode(	data[i].PRGT_RATE		)	);
				ITM_CODE.appendChild(		xmlDoc.createTextNode(	data[i].ITM_CODE		)	);
				WEIGHT_YN_NM.appendChild(	xmlDoc.createTextNode(	data[i].WEIGHT_YN_NM	)	);
				WEIGHT_YN.appendChild(		xmlDoc.createTextNode(	data[i].WEIGHT_YN		)	);
				GIFT_APP_YN_NM.appendChild(	xmlDoc.createTextNode(	data[i].GIFT_APP_YN_NM	)	);
				GIFT_APP_YN.appendChild(	xmlDoc.createTextNode(	data[i].GIFT_APP_YN		)	);
				SCAN_CODE.appendChild(		xmlDoc.createTextNode(	data[i].SCAN_CODE		)	);
				CLS_CODE.appendChild(		xmlDoc.createTextNode(	data[i].CLS_CODE		)	);
				POINT_SAVE_NM.appendChild(	xmlDoc.createTextNode(	data[i].POINT_SAVE_NM	)	);
				POINT_SAVE.appendChild(		xmlDoc.createTextNode(	data[i].POINT_SAVE		)	);
				MBR_DC_YN_NM.appendChild(	xmlDoc.createTextNode(	data[i].MBR_DC_YN_NM	)	);
				MBR_DC_YN.appendChild(		xmlDoc.createTextNode(	data[i].MBR_DC_YN		)	);
				END_IND_NM.appendChild(		xmlDoc.createTextNode(	data[i].END_IND_NM		)	);
				END_IND.appendChild(		xmlDoc.createTextNode(	data[i].END_IND		)	);
				
				
				
				var calProfit =  setCalProfitGrid(    parseFloat( data[i].WPRC ) +   parseFloat( data[i].WVAT ) , data[i].SPRC   );
			 
				PROFIT_PRC.appendChild(		xmlDoc.createTextNode(    calProfit[1] 		)	);
				PROFIT_PER.appendChild(		xmlDoc.createTextNode(	  calProfit[2]   	)	);
				 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CRUD			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CHECK_BOX		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_NAME		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_CODE		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	VEN_NAME		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	VEN_CODE		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WPRC_TOT 		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WPRC			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WVAT			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SPRC			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ROUTE_GB_NM		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ROUTE_GB		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_DT			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_GB_NM		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_GB			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	UNIT_NM			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	UNIT			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	IPSU_QTY		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STKLM_QTY		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	LEAD_TIME		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORG_CODE_NM		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORG_CODE		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GRE_GB_NM		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GRE_GB			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PRGT_RATE		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WEIGHT_YN_NM	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WEIGHT_YN		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GIFT_APP_YN_NM	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GIFT_APP_YN		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SCAN_CODE		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CLS_CODE		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	POINT_SAVE_NM	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	POINT_SAVE		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	MBR_DC_YN_NM	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	MBR_DC_YN		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	END_IND_NM		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	END_IND			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PROFIT_PRC		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PROFIT_PER		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CUR_INV_QTY		);
				
				
				gridRoot1.addItemAt(  xmlDoc  , 0 ,  false );
				 
			}
			 
			// row 속성 제거
			for(var j=0 ; j < data.length ; j++ )
			{   var selectedItem = gridRoot1.getItemAt(j);
				gridRoot1.removeChangedData(	selectedItem	);
			}
			//그리드 속성 refresh
			dataGrid1.invalidateList();
			dataGrid2.invalidateList();
			    
			
	    },
	    complete : function(data) {
	    	 
	       
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	 
}
 

// 생식으로 변경 시 금액을 0 으로 바꾸여준다. 생식은 금액을 안넣어도 된다.
// 단, 생식이면서 SCAN_CODE이 규격( 88 ) 로 시작 할 때는 입력가능하게 해야 한다. 
function chgItmGb()
{ 
 	 
	 var SCAN_CODE_STR = $("#SCAN_CODE").val().substr(0,2);
	
	 if(  $("#ITM_GB").val() == "1" &&  !(  SCAN_CODE_STR == "88"    ) ) 
	 {
		 $("#BASE_WPRC_TOT").val("0") ; // 원가합계
		 $("#BASE_SPRC").val("0") ;     // 매가
		 
		 $("#PROFIT_PER").val("0") ;    // 이익률
		 $("#BASE_WPRC").val("0") ;     // 원가
		 $("#BASE_WVAT").val("0") ;     // 부가세
		 $("#PROFIT_PRC").val("0") ;    // 이익액
 
		 $("input[name=BASE_WPRC_TOT]").attr("readonly",true);
		 $("input[name=BASE_SPRC]").attr("readonly",true);

	 } else {

		 $("input[name=BASE_WPRC_TOT]").attr("readonly",false);
		 $("input[name=BASE_SPRC]").attr("readonly",false);
		 
	 }
	 
	 
}



function gridHolder1DelRow()
{  
	if (confirm("선택한 취급점포을 제거 하시겠습니까?\n( 제거 후 [저장]버튼을 눌러야만 삭제처리 됩니다! )") == true){     
		var selectedIndex = dataGrid1.getSelectedIndex();
		gridRoot1.removeItemAt(selectedIndex); 
		gridRoot1.setItemFieldAt( "D" , selectedIndex, "CRUD");
		
		 
	} else {    
	    return;
    } 
	 
}


// 수정 시 점포 마스터  모두 같이 바꾸어주기
function chgEndInd_add()
{
	 
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		gridRoot1.setItemFieldAt(  "U"                 , i , "CRUD"); 
		gridRoot1.setItemFieldAt(  $("#END_IND").val() , i , "END_IND");  
		gridRoot1.setItemFieldAt(  $("#END_IND  option:selected").text() , i , "END_IND_NM"); 
	}

}


function gridHolder1MulAddRow()
{  
	
	if(  $("#ITM_STD").val() == ''  )
	{   alert('관리구분을 입력하세요.');
		$("#ITM_STD").focus();
		return; 
	}
	
	
	
	if(  $("#ITM_STD").val() == "1"  || $("#ITM_STD").val() == "2"      )  // 규격일때 체크한다.
	{ 
			if(  $("#NO_BARCODE").val() == "1"     )   // 바코드  존재(1)  일때 만 체크한다.
			{
					if( $.trim( $("#SCAN_CODE").val() 		) == "" ) {   alert("스캔코드를  선택 하세요!");	$("#SCAN_CODE").focus();  		return; }  // 스캔코드
					var scanLength =  $.trim( $("#SCAN_CODE").val().length ) ;   
					if( !  ( scanLength  == 6  || scanLength  == 13   )  )
					{
						alert("스캔코드는 6 혹은 13 자리여야 합니다.");
						$("#SCAN_CODE").focus(); 
						return;
					}  
			}
	}
	
	
	
	
	if(  $("#STKLM_QTY").val() == ''  )
	{   alert('안전재고를 입력하세요.');
		$("#STKLM_QTY").focus();
		return; 
	}
	if(  $("#LEAD_TIME").val() == ''  )
	{   alert('LEAD TIME을 입력하세요.');
		$("#LEAD_TIME").focus();
		return; 
	}
	
	if( $.trim( $("#VEN_CODE").val() 		) == "" ) {   alert("협력업체를  선택 하세요!");	$("#VEN_NAME").focus();  		return; }  // 협력업체
    
	if(  $("#ITM_GB").val()  != "1"   )   // 생식이 아닐때만 유효성 검사한다.
	{
		var BASE_WPRC_TOT_VAL =  $.trim(   $("#BASE_WPRC_TOT").val() );
		var BASE_SPRC_VAL     =  $.trim(   $("#BASE_SPRC").val()     ); 
		if(  BASE_WPRC_TOT_VAL  == "" || BASE_WPRC_TOT_VAL  == "0"  ) {   alert("원가합계를  입력 하세요!");	    $("#BASE_WPRC_TOT").focus();    return; }   
		if(  BASE_SPRC_VAL      == "" || BASE_SPRC_VAL      == "0"  ) {   alert("매가를  입력 하세요!");	    $("#BASE_SPRC").focus();  		return; }   

		// 매가는 원가단가보다 커야함.
		if( parseFloat($("#BASE_WPRC_TOT").val())  > parseFloat($("#BASE_SPRC").val() ) )
		{   alert('매가는 원가합계보다 작을 수 없습니다.'); 
			return;
		}  
	}
	
	
	if( $.trim( $("#IPSU_QTY").val() 	) == "" ) {   alert("입수를  입력 하세요!");     	$("#IPSU_QTY").focus();  		return; }  // 입수              
	if( $.trim( $("#UNIT").val() 		) == "" ) {   alert("규격을  입력 하세요!");     	$("#UNIT").focus();  			return; }  // 규격                    
    if( $.trim( $("#ROUTE_GB").val() 	) == "" ) {   alert("배송루트를  선택 하세요!");	$("#ROUTE_GB").focus();  		return; }  // 배송루트             
//    if( $.trim( $("#ORG_CODE").val()	) == "" ) {   alert("원산지를  선택 하세요!");		$("#ORG_CODE").focus();  		return; }  // 보관방법              
	if( $.trim( $("#ORD_GB").val() 		) == "" ) {   alert("권고발주대상을  선택 하세요!");	$("#ORD_GB").focus();  			return; }  // 권고발주대상          
	if( $.trim( $("#STR_DT").val() 		) == "" ) {   alert("취급일자를 입력 하세요!");	$("#STR_DT").focus();  			return; }  // 취급일자             
	if( $.trim( $("#TAX_GB").val() 		) == "" ) {   alert("과세구분을  선택 하세요!");	$("#TAX_GB").focus();  			return; }  // 취급일자             
	 
	if( $.trim( $("#CLS_CODE").val() 	) == "" ) {   alert("상품 분류를 선택 하세요!");	$("#CLS_CODE").focus();  			return; }  // 상품분류        
	 
	
	if( 
		     ( 
			     !( 
			    	 	  $("input:checkbox[id='FOOD_MART']").is(":checked") 
					 ||   $("input:checkbox[id='MART_AND_MART']").is(":checked") 
					 ||   $("input:checkbox[id='DC_CENTER']").is(":checked")  
				 ) 
				 
		    )  && ( $("#ONE_STR_CODE").val() == ""  )
	  ) 
	{    
		alert('업태구분 또는 점포를 선택 하세요. ');
		return;
	}  
	   
	// 식자재마트   마트앤마트   물류센터  중 하나만 선택 하면 true -> 여러ROW  추가됨
	if( 	$("input:checkbox[id='SET_ALL_STORE']").is(":checked") 
		 || $("input:checkbox[id='FOOD_MART']").is(":checked") 
		 || $("input:checkbox[id='MART_AND_MART']").is(":checked") 
		 || $("input:checkbox[id='DC_CENTER']").is(":checked")  
	 )
	{    
						var FOOD_MART_UPTAE_FLAG = ""; 
						var MART_AND_MART_UPTAE_FLAG = ""; 
						var DC_CENTER_UPTAE_FLAG = "";  
						var DC_BONBU_UPTAE_FLAG ="";	//해당 변수는 프로시저 본부코드 변수 추가로 인해 파라메터 갯수 오류 나지 않도록 넣어둔것
						
						if(  $("input:checkbox[id='FOOD_MART']").is(":checked") )
						{ 
							FOOD_MART_UPTAE_FLAG = "1" ; 
						}
						if(  $("input:checkbox[id='MART_AND_MART']").is(":checked") )
						{ 
							MART_AND_MART_UPTAE_FLAG = "2" ; 
						}
						if(  $("input:checkbox[id='DC_CENTER']").is(":checked") )
						{ 
							DC_CENTER_UPTAE_FLAG = "3" ; 
						}
						 
						// 그리드에 여러개  행 추가  
						//취급점포리스트 보여주기 - grid1
						jQuery.ajax({ 
						    url:"/productStoreNewList.do",           // productCustomerPyExclItemList
						    type:"POST",
							datatype:"xml",
							async:false,
						 	data: {  "FOOD_MART_UPTAE_FLAG"     : FOOD_MART_UPTAE_FLAG
						 		,	 "MART_AND_MART_UPTAE_FLAG" : MART_AND_MART_UPTAE_FLAG
						 		,	 "DC_CENTER_UPTAE_FLAG"     : DC_CENTER_UPTAE_FLAG
						 		,	"DC_BONBU_UPTAE_FLAG"	: DC_BONBU_UPTAE_FLAG
						 	},
							success:function(data){   
								//그리드1 초기화 
//								gridRoot1.removeAll( );
								
								var gridDataArray = new Array();
								var rowCnt  = gridRoot1.getCollection().getSource() ; 
								for(var i=0 ; i < rowCnt.length ; i++ )
								{   gridDataArray[i] = gridRoot1.getItemFieldAt( i , "STR_CODE") ;  }
								 
								for(var i=0 ; i < data.length ; i++ )
								{  
									if(  gridDataArray.indexOf( data[i].STR_CODE  ) == -1   )
									{  
										addRowData( data[i].STR_CODE , data[i].STR_NAME ); 
									}
									 
									// addRowData( data[i].STR_CODE , data[i].STR_NAME ); 
									 
								} 
						    },
						    complete : function(data) {
						    },
						    error : function(xhr, status, error) { 
						    }
						});
						
	} else {  
		
		// 단일점포 행 추가   
		var rowCnt  = gridRoot1.getCollection().getSource()    ; 
		for(var i=0 ; i < rowCnt.length ; i++)
		{     
			if( gridRoot1.getItemFieldAt( i , "STR_CODE")  == $("#ONE_STR_CODE").val()   ) 
			{
				alert("선택하신 점포는 이미 등록 되었습니다.");
				return;
			}
		} 
		addRowData(  $("#ONE_STR_CODE").val()  ,  $("#ONE_STR_CODE option:selected").text()  ); 
		  
				
	}					
	  
		 
}

function addRowData( STR_CODE_VAL , STR_NAME_VAL )
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
	var CRUD	    	= xmlDoc.createElement('CRUD');
	var STR_CODE 		= xmlDoc.createElement('STR_CODE'); 
	var STR_NAME 		= xmlDoc.createElement('STR_NAME');  
	var VEN_CODE 		= xmlDoc.createElement('VEN_CODE');  
	var VEN_NAME 		= xmlDoc.createElement('VEN_NAME'); 
	var WPRC_TOT    	= xmlDoc.createElement('WPRC_TOT');
	var WPRC 			= xmlDoc.createElement('WPRC');  
	var WVAT 		    = xmlDoc.createElement('WVAT');     //var SUR_TAX 		= xmlDoc.createElement('SUR_TAX');  
	var SPRC 			= xmlDoc.createElement('SPRC');  
	var ROUTE_GB_NM 	= xmlDoc.createElement('ROUTE_GB_NM');  
	var ROUTE_GB 		= xmlDoc.createElement('ROUTE_GB');  
	var STR_DT 			= xmlDoc.createElement('STR_DT'); 
	var ORD_GB_NM   	= xmlDoc.createElement('ORD_GB_NM'); 
	var ORD_GB 			= xmlDoc.createElement('ORD_GB');  
	var UNIT 			= xmlDoc.createElement('UNIT'); 
	var UNIT_NM 		= xmlDoc.createElement('UNIT_NM'); 
	var IPSU_QTY 		= xmlDoc.createElement('IPSU_QTY'); 
	var STKLM_QTY 		= xmlDoc.createElement('STKLM_QTY'); 
	var LEAD_TIME 		= xmlDoc.createElement('LEAD_TIME'); 
	var ORG_CODE_NM 	= xmlDoc.createElement('ORG_CODE_NM'); 
	var ORG_CODE 		= xmlDoc.createElement('ORG_CODE');  
	var CHECK_BOX		= xmlDoc.createElement('CHECK_BOX'); 
	var PRGT_RATE		= xmlDoc.createElement('PRGT_RATE'); 
	var ITM_CODE		= xmlDoc.createElement('ITM_CODE');
	var WEIGHT_YN_NM	= xmlDoc.createElement('WEIGHT_YN_NM');										
	var WEIGHT_YN		= xmlDoc.createElement('WEIGHT_YN');							
	var GIFT_APP_YN_NM  = xmlDoc.createElement('GIFT_APP_YN_NM');			 		
	var GIFT_APP_YN	    = xmlDoc.createElement('GIFT_APP_YN');
	var SCAN_CODE	    = xmlDoc.createElement('SCAN_CODE');
	var END_IND	    	= xmlDoc.createElement('END_IND');
	var END_IND_NM	    = xmlDoc.createElement('END_IND_NM');
	var CLS_CODE	    = xmlDoc.createElement('CLS_CODE');
	var POINT_SAVE_NM	= xmlDoc.createElement('POINT_SAVE_NM');
	var POINT_SAVE	    = xmlDoc.createElement('POINT_SAVE');
	var MBR_DC_YN_NM	= xmlDoc.createElement('MBR_DC_YN_NM');
	var MBR_DC_YN	    = xmlDoc.createElement('MBR_DC_YN');
	var GRE_GB_NM	    = xmlDoc.createElement('GRE_GB_NM');
	var PROFIT_PRC      = xmlDoc.createElement('PROFIT_PRC');
	var PROFIT_PER      = xmlDoc.createElement('PROFIT_PER');
	var GRE_GB	    = xmlDoc.createElement('GRE_GB');
	var CUR_INV_QTY	    = xmlDoc.createElement('CUR_INV_QTY');
	
	
	
	
	CRUD.appendChild( 			xmlDoc.createTextNode( 	"C"  								)	);
	
	if( $("#ITM_GB").val() == "2"  )  // 수중량(2) 일때 만 관리로 표시. 아니면 미관리로 표시
	{
		WEIGHT_YN_NM.appendChild( 	xmlDoc.createTextNode( 	"관리"  							)	);
		WEIGHT_YN.appendChild( 		xmlDoc.createTextNode( 	"Y"  							)	);
		
	} else {
		WEIGHT_YN_NM.appendChild( 	xmlDoc.createTextNode( 	"미관리"							)	);
		WEIGHT_YN.appendChild( 		xmlDoc.createTextNode( 	"N" 							)	);
		
	}
	
	GIFT_APP_YN_NM.appendChild( xmlDoc.createTextNode( 	"인정"  								)	);
	GIFT_APP_YN.appendChild( 	xmlDoc.createTextNode( 	"Y"  								)	);
	 
	GRE_GB_NM.appendChild( 	xmlDoc.createTextNode(  $("#GRE_GB_NM").val()            		)	); 
	GRE_GB.appendChild( 	xmlDoc.createTextNode(  $("#GRE_GB").val()            		)	); 
	CLS_CODE.appendChild( 	xmlDoc.createTextNode(  $("#CLS_CODE").val()            		)	); 
	END_IND.appendChild( 	xmlDoc.createTextNode(  $("#END_IND").val()            			)	); 
	END_IND_NM.appendChild(	xmlDoc.createTextNode( 	$("#END_IND option:selected").text() 	)	); 
	SCAN_CODE.appendChild( 	xmlDoc.createTextNode(  $("#SCAN_CODE").val()            		)	); 
	ITM_CODE.appendChild( 	xmlDoc.createTextNode(  $("#ITM_CODE").val()            		)	); 
	CHECK_BOX.appendChild( 	xmlDoc.createTextNode( 	""  									)	); 
	STR_CODE.appendChild( 	xmlDoc.createTextNode( 	STR_CODE_VAL 							)	);
	STR_NAME.appendChild( 	xmlDoc.createTextNode( 	STR_NAME_VAL  							)	); 
	VEN_CODE.appendChild( 	xmlDoc.createTextNode( 	$("#VEN_CODE").val()  					)	);
	VEN_NAME.appendChild( 	xmlDoc.createTextNode( 	$("#VEN_NAME").val() 					)	); 
	
	WPRC_TOT.appendChild(   xmlDoc.createTextNode( 	$("#BASE_WPRC_TOT").val() 				)	); 
	WPRC.appendChild( 		xmlDoc.createTextNode( 	$("#BASE_WPRC").val() 					)	); 
	 
	WVAT.appendChild( 	    xmlDoc.createTextNode(  $("#BASE_WVAT").val() 					)	); 
	SPRC.appendChild( 		xmlDoc.createTextNode( 	$("#BASE_SPRC").val() 					)	);  
	
	
	var calProfit =  setCalProfitGrid(  $("#BASE_WPRC_TOT").val()  , $("#BASE_SPRC").val()   ); 
	PROFIT_PRC.appendChild(		xmlDoc.createTextNode(    calProfit[1] 		)	);
	PROFIT_PER.appendChild(		xmlDoc.createTextNode(	  calProfit[2]   	)	);
	
	
	
	
	ROUTE_GB_NM.appendChild(xmlDoc.createTextNode( 	$("#ROUTE_GB option:selected").text() 	)	); 
	ROUTE_GB.appendChild( 	xmlDoc.createTextNode( 	$("#ROUTE_GB").val() 					)	); 
	
	var CURR_STR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
    STR_DT.appendChild( 	xmlDoc.createTextNode( 	CURR_STR_DT								)	); 
	ORD_GB_NM.appendChild( 	xmlDoc.createTextNode( 	$("#ORD_GB option:selected").text() 	)	); 
	ORD_GB.appendChild( 	xmlDoc.createTextNode( 	$("#ORD_GB").val() 						)	); 
 	
	UNIT_NM.appendChild( 	xmlDoc.createTextNode( 	$("#UNIT option:selected").text() 		)	); 
	UNIT.appendChild( 		xmlDoc.createTextNode( 	$("#UNIT").val() 						)	); 
	IPSU_QTY.appendChild( 	xmlDoc.createTextNode( 	$("#IPSU_QTY").val() 					)	); 
	STKLM_QTY.appendChild( 	xmlDoc.createTextNode( 	$("#STKLM_QTY").val() 					)	); 
	LEAD_TIME.appendChild( 	xmlDoc.createTextNode( 	$("#LEAD_TIME").val() 					)	); 
	ORG_CODE_NM.appendChild(xmlDoc.createTextNode( 	""										)	); 
	ORG_CODE.appendChild( 	xmlDoc.createTextNode( 	"" 										)	);  
	
//	ORG_CODE_NM.appendChild(xmlDoc.createTextNode( 	$("#ORG_CODE option:selected").text() 	)	); 
//	ORG_CODE.appendChild( 	xmlDoc.createTextNode( 	$("#ORG_CODE").val() 					)	);  
	PRGT_RATE.appendChild( 	xmlDoc.createTextNode( 	$("#PRGT_RATE").val() 					)	);   
	
	var MBR_DC_YN_NM_VAL = "";
	var MBR_DC_YN_VAL = "";
	if( $("input:checkbox[id='MBR_DC_YN']").is(":checked")  )
	{
		MBR_DC_YN_VAL      = "Y";
		MBR_DC_YN_NM_VAL   = "가능";
	} else {
		MBR_DC_YN_VAL      = "N";
		MBR_DC_YN_NM_VAL   = "불가능";
	} 
	MBR_DC_YN_NM.appendChild(xmlDoc.createTextNode( 	MBR_DC_YN_NM_VAL 				    )	); 
	MBR_DC_YN.appendChild(   xmlDoc.createTextNode( 	MBR_DC_YN_VAL						)	);  
	
	
	
	var POINT_SAVE_VAL = "";
	var POINT_SAVE_NM_VAL = "";
	if( $("input:checkbox[id='POINT_SAVE']").is(":checked")  )
	{
		POINT_SAVE_VAL      = "Y";
		POINT_SAVE_NM_VAL   = "적립가능";
	} else {
		POINT_SAVE_VAL      = "N";
		POINT_SAVE_NM_VAL   = "적립불가";
	} 
	POINT_SAVE_NM.appendChild(xmlDoc.createTextNode( 	POINT_SAVE_NM_VAL 				    )	); 
	POINT_SAVE.appendChild(   xmlDoc.createTextNode( 	POINT_SAVE_VAL						)	);  
	CUR_INV_QTY.appendChild(   xmlDoc.createTextNode( 	""					)	);  
	
	
	
	
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CRUD			);

	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CUR_INV_QTY			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GRE_GB		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GRE_GB_NM		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CLS_CODE		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	END_IND			); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SCAN_CODE		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WEIGHT_YN_NM	); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WEIGHT_YN		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GIFT_APP_YN_NM	); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GIFT_APP_YN		);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PRGT_RATE		);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CHECK_BOX		);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_CODE		);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_NAME		);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	VEN_CODE		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	VEN_NAME		);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WPRC_TOT		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WPRC			); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WVAT			); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SPRC			); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ROUTE_GB_NM		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ROUTE_GB		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_DT			); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_GB_NM		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_GB			); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	UNIT_NM			); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	UNIT			); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	IPSU_QTY		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STKLM_QTY		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	LEAD_TIME		);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORG_CODE_NM		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORG_CODE		);  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	POINT_SAVE_NM	); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	POINT_SAVE		); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	MBR_DC_YN_NM	); 
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	MBR_DC_YN		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	END_IND_NM		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	END_IND			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PROFIT_PRC			);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PROFIT_PER			);
	 
	
	
	gridRoot1.addItemAt(  xmlDoc  , 0 ); 
 
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
 
function setCalProfitGrid(   BASE_WPRC_TOT , BASE_SPRC  )
{ 
	 // 이익액(PROFIT_PRC) = 매가(BASE_SPRC) - 원가합계(BASE_WPRC_TOT)
	 // 이익율(PROFIT_PER) = (이익액/매가)*100 소수1의자리 반올림 처리
	
//	 if ( $("#BASE_SPRC").val() == ""  ||  $("#BASE_WPRC_TOT").val() == "" )
//	 {
//		 $("#PROFIT_PRC").val("");
//		 $("#PROFIT_PER").val("");
//		 return;
//	 }
	
	 
	var PROFIT_PRC =   parseFloat( BASE_SPRC )  -  parseFloat( BASE_WPRC_TOT )     ;
	PROFIT_PRC  =  PROFIT_PRC.toFixed(1)   ;
	
	var PROFIT_PER_VAL =   (  ( parseFloat( PROFIT_PRC ) /  parseFloat( BASE_SPRC ) ) * 100 );

	if(  $.trim( BASE_SPRC  ) == "0"  ||  $.trim( BASE_SPRC  ) == "" )
	{
		PROFIT_PER_VAL = parseFloat(  0   );
	}
	
	PROFIT_PER_VAL =  PROFIT_PER_VAL.toFixed(1)   ;

	return [ BASE_WPRC_TOT , PROFIT_PRC , PROFIT_PER_VAL];
}


function setCalProfit()
{
	 if ( $("#BASE_SPRC").val() == ""  ||  $("#BASE_WPRC_TOT").val() == "" )
	 {   $("#PROFIT_PRC").val("");
		 $("#PROFIT_PER").val("");
		 return;
	 }
	 
	// 이익액(PROFIT_PRC) = 매가(BASE_SPRC) - 원가합계(BASE_WPRC_TOT)
	// 이익율(PROFIT_PER) = (이익액/매가)*100 소수1의자리 반올림 처리
	var PROFIT_PRC_VAR = (parseFloat( $("#BASE_SPRC").val() )  -  parseFloat( $("#BASE_WPRC_TOT").val() ));
	$("#PROFIT_PRC").val(   PROFIT_PRC_VAR.toFixed(2)   ) ;
	 
	var PROFIT_PER_VAL =   (  ( parseFloat( $("#PROFIT_PRC").val() ) /  parseFloat( $("#BASE_SPRC").val() ) ) * 100 );
	if(  $.trim( $("#BASE_SPRC").val()  ) == "0"  ||  $.trim( $("#BASE_SPRC").val()  ) == "" )
	{
		PROFIT_PER_VAL = parseFloat(  0   );
	} 
	$("#PROFIT_PER").val(  PROFIT_PER_VAL.toFixed(1)     ) ;
	
}
 
function setSurProfit()   
{  
	if( parseFloat($("#BASE_WPRC_TOT").val())  > parseFloat($("#BASE_SPRC").val() ) )
	{
		alert('매가는 원가합계보다 작을 수 없습니다.\n( 임대을 상품인 경우, 원가합계를 지우고 매가를 입력하시면 자동계산이 됩니다. )');
//		$("#BASE_SPRC").val("0.0");
//		$("#BASE_SPRC").focus();
		return;
	} 
	 
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		gridRoot1.setItemFieldAt(  $("#BASE_SPRC").val() , i , "SPRC"); 
		
		var WPRC_TOT = gridRoot1.getItemFieldAt( i , "WPRC_TOT") ;
		var SPRC     = gridRoot1.getItemFieldAt( i , "SPRC") ;
		var calProfit =  setCalProfitGrid(   WPRC_TOT , SPRC  ); 
		gridRoot1.setItemFieldAt(  calProfit[1] , i, "PROFIT_PRC");
		gridRoot1.setItemFieldAt(  calProfit[2]  , i, "PROFIT_PER");
		gridRoot1.setItemFieldAt( "U" , i, "CRUD"); 
	}
	
	// 임대을일때,  매가 입력시    ( 매가 *  (100 - 수수료율) ) / 100       한 금액을 원가합계에 넣어준다.
	// setSurTax 로 원가 부가세 구해준다.
	// 서광)로투스오리지널
	if( $("#GRE_GB").val() == "2" )
	{
		var BASE_SPRC     =  $("#BASE_SPRC").val() ;
		var PRGT_RATE     =  $("#PRGT_RATE").val() ;
		var BASE_WPRC_TOT =  0;
		
		BASE_WPRC_TOT = ( parseFloat(BASE_SPRC)  *  ( 100 - parseFloat(PRGT_RATE) )  ) / 100 ; 
	    $("#BASE_WPRC_TOT").val( BASE_WPRC_TOT ) ; 
		
	    setSurTax();
	    
	}
	
	
	
	
	setCalProfit();
	
}

//원가합계 변경시, 원가와 부가세 계산해서   세팅
function setSurTax()
{
	if(  $("#TAX_GB").val()  == ""  )
	{
		alert('과세구분을 선택 하세요');
		$("#BASE_WPRC_TOT").val(""); 
		$("#BASE_WPRC").val("0"); 
		$("#BASE_WVAT").val("0"); 
		$("#TAX_GB").focus();
		return;
	}	
	setCalProfit();
  
//	if(  $("#TAX_GB").val()  == "1"  )  // 과세시 vat 계산
//	{
//		var BASE_WPRC = $("#BASE_WPRC").val(); 
//		var SUR_TAX = ( 10 * BASE_WPRC ) / 100 ; 
//		$("#SUR_TAX").val( SUR_TAX );  // 부가세 필드에 세팅
//	} else {
//		$("#SUR_TAX").val("0");   // 면세이므로 부가세 필드에 0
//	}
	
	
	var priceVat = calPriceVat(  $("#BASE_WPRC_TOT").val()   ,  $("#TAX_GB").val()  ); 
	  
	$("#BASE_WPRC").val(   priceVat[1] ) ;
	$("#BASE_WVAT").val(   priceVat[2] ) ;
	
	//setSurProfit();   // 과세 구분 혹은 기준원가 변동시에도 이익률계산 다시 해준다.
	
	// 변경시 점포원가도 바꾸어주기 
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		gridRoot1.setItemFieldAt(  $("#BASE_WPRC_TOT").val() , i , "WPRC_TOT"); 
		
		var WPRC_TOT = gridRoot1.getItemFieldAt( i , "WPRC_TOT") ;
		var priceVat = calPriceVat(  WPRC_TOT  ,  $("#TAX_GB").val()  );  
		gridRoot1.setItemFieldAt( priceVat[1]  , i, "WPRC");
		gridRoot1.setItemFieldAt( priceVat[2]  , i, "WVAT");
		 
		var WPRC_TOT = gridRoot1.getItemFieldAt( i , "WPRC_TOT") ;
		var SPRC     = gridRoot1.getItemFieldAt( i , "SPRC") ;
		var calProfit =  setCalProfitGrid(   WPRC_TOT , SPRC  ); 
		gridRoot1.setItemFieldAt(  calProfit[1] , i, "PROFIT_PRC");
		gridRoot1.setItemFieldAt(  calProfit[2]  , i, "PROFIT_PER");
		
		gridRoot1.setItemFieldAt( "U" , i, "CRUD"); 


		
	}
	
	
}

//입수변경시 점포도 같이 바꾸어주기
function chgIpsuQty()
{
	
	// 변경시 점포입수도 바꾸어주기  IPSU_QTY
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	for(var i=0 ; i < rowCnt.length ; i++)
	{       
		gridRoot1.setItemFieldAt( $("#IPSU_QTY").val()  , i, "IPSU_QTY"); 
		   
		gridRoot1.setItemFieldAt( "U" , i, "CRUD"); 
 
	}
}


//원가합계와 과세구분 입력하여 -> 원가, 부가세 뽑기
function calPriceVat(  BASE_WPRC_TOT  , TAX_GB )
{  
	var BASE_WPRC = 0;
	var BASE_WVAT = 0;  
	if(  TAX_GB  == "1"   ) // 과세
	{  
		 
		BASE_WPRC = BASE_WPRC_TOT- Math.floor( BASE_WPRC_TOT / 11 ) ;  
		BASE_WVAT =    Math.floor( BASE_WPRC_TOT / 11 ) ; 
		 
		
	} else {        // 면세 
		BASE_WPRC  = BASE_WPRC_TOT ; 
		BASE_WVAT = 0 ; 
	} 
	return [ BASE_WPRC_TOT , BASE_WPRC , BASE_WVAT];
}


function itemDataChangeHandler1(event) {
	var rowIndex 	= event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;				// 변경된 열번호
	var dataField 	= event.dataField;					// 변경된 열의 데이터 필드
	var dataRow 	= gridRoot1.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue 	= event.value;						// 변경전 값
	var newValue 	= event.newValue;					// 변경후 값
   
	 
	
	
	if(newValue == "")    {  return; }   // 선택한 값이 ""  일때  빠져나감
	 
	if(  gridRoot1.getItemFieldAt( rowIndex , "CRUD")   ==  "C" )   // 기존 데이터가 C이면 신규 추가이므로, U 로 바꾸지 않는다. 
	{
		
	} else {
		gridRoot1.setItemFieldAt( "U" , rowIndex, "CRUD");  // 수정시 상태값을 U 로 바꾸어준다.		
	}
	 
	if(   dataField == "VEN_CODE" ) {   
		gridRoot1.setItemFieldAt( "U" , rowIndex, "CRUD"); 
	}
	 
	if(   dataField == "VEN_NAME" ) {   
		gridRoot1.setItemFieldAt( "U" , rowIndex, "CRUD"); 
	} 
	if( dataField == "ROUTE_GB_NM" ) {   
		gridRoot1.setItemFieldAt( newValue , rowIndex, "ROUTE_GB"); 
	} else if( dataField == "ORG_CODE_NM" )    { 
		gridRoot1.setItemFieldAt( newValue , rowIndex, "ORG_CODE");
	} else if( dataField == "GRE_GB_NM" )      { 
		gridRoot1.setItemFieldAt( newValue , rowIndex, "GRE_GB");
			if(newValue =="1"){
				gridRoot1.setItemFieldAt( "0" , rowIndex, "PRGT_RATE");
			}else if(newValue == "2"){
				//
			}
	} else if( dataField == "ORD_GB_NM" )      { 
		gridRoot1.setItemFieldAt( newValue , rowIndex, "ORD_GB");
	} else if( dataField == "UNIT_NM" )        { 
		gridRoot1.setItemFieldAt( newValue , rowIndex, "UNIT");
	} else if( dataField == "WEIGHT_YN_NM" )   { 
		gridRoot1.setItemFieldAt( newValue , rowIndex, "WEIGHT_YN");
	} else if( dataField == "GIFT_APP_YN_NM" ) { 
		gridRoot1.setItemFieldAt( newValue , rowIndex, "GIFT_APP_YN");
	} else if( dataField == "POINT_SAVE_NM" ) { 
		gridRoot1.setItemFieldAt( newValue , rowIndex, "POINT_SAVE");
	} else if( dataField == "MBR_DC_YN_NM" ) { 
		gridRoot1.setItemFieldAt( newValue , rowIndex, "MBR_DC_YN");
	} else if( dataField == "WPRC_TOT"    ) { 
		   
		
		var WPRC_TOT = gridRoot1.getItemFieldAt( rowIndex , "WPRC_TOT") ;
		var priceVat = calPriceVat(  WPRC_TOT  ,  $("#TAX_GB").val()  );  
		gridRoot1.setItemFieldAt( priceVat[1]  , rowIndex, "WPRC");
		gridRoot1.setItemFieldAt( priceVat[2]  , rowIndex, "WVAT");
		 
		var WPRC_TOT = gridRoot1.getItemFieldAt( rowIndex , "WPRC_TOT") ;
		var SPRC     = gridRoot1.getItemFieldAt( rowIndex , "SPRC") ;
		var calProfit =  setCalProfitGrid(   WPRC_TOT , SPRC  ); 
		gridRoot1.setItemFieldAt(  calProfit[1] , rowIndex, "PROFIT_PRC");
		gridRoot1.setItemFieldAt(  calProfit[2]  , rowIndex, "PROFIT_PER");
		 
		 
	} else if( dataField == "SPRC"    ) { 

		var WPRC_TOT = gridRoot1.getItemFieldAt( rowIndex , "WPRC_TOT") ;
		var SPRC     = gridRoot1.getItemFieldAt( rowIndex , "SPRC") ;
		var calProfit =  setCalProfitGrid(   WPRC_TOT , SPRC  ); 
		gridRoot1.setItemFieldAt(  calProfit[1] , rowIndex, "PROFIT_PRC");
		gridRoot1.setItemFieldAt(  calProfit[2]  , rowIndex, "PROFIT_PER");
	} else if( dataField == "END_IND_NM" ) {   
		gridRoot1.setItemFieldAt( "U" , rowIndex, "CRUD"); 
		gridRoot1.setItemFieldAt( newValue , rowIndex, "END_IND");
	}else if( dataField == "END_IND" ) {   
		gridRoot1.setItemFieldAt( "U" , rowIndex, "CRUD");  
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

  
 

// 유효기간관리유무 변경
function chgValidDtYn()
{
	if( $("#VALID_DT_YN").val() == "Y" )  // 관리  함
	{
		$("input[name=VALID_DD]").attr("readonly",false);
	} else {
		 $("#VALID_DD").val("0");
		$("input[name=VALID_DD]").attr("readonly",true);
	}
 
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
	 
	// 대분류 변경 시 상품 구분 넣어주기   ( ITM_GB 와 ITM_GB_NM ) 
	if( SELECTBOX_ID == "MID_CODE" )  
	{ 
			jQuery.ajax({
				    type:"POST",
				    url:"/getItmGb.do",             
				    dataType:"JSON", 
				    data: {  LRG_CODE  :    $('#LRG_CODE').val()    }, 
				    async:false,
				    success : function(data) { 
				    	if(  data.length > 0 )
				    	{
				    		 
				    		
				    		 $('#ITM_GB').val(   	data[0].ITM_GB     );
				    		 $('#ITM_GB_NM').val(   data[0].ITM_GB_NM  ); 
				    	} else {
				    		 $('#ITM_GB').val(   	""   );
				    		 $('#ITM_GB_NM').val(   ""   ); 
				    	} 
				    },
				    complete : function(data) {
				    },
				    error : function(xhr, status, error) { 
				    }
			});
		
	}
	 
	// 생식으로 변경 시 금액을 0 으로 바꾸여준다. 생식은 금액을 안넣어도 되므로.
	chgItmGb();
	
}

function setStoreSelect()
{ 
	if( 
		   $("input:checkbox[id='FOOD_MART']").is(":checked")
		|| $("input:checkbox[id='MART_AND_MART']").is(":checked")
		|| $("input:checkbox[id='DC_CENTER']").is(":checked")
	) {
		 
		$("#ONE_STR_CODE").val("") ;
		$('#ONE_STR_CODE').attr('disabled', 'disabled');
		
	} else {
		$('#ONE_STR_CODE').removeAttr('disabled');
		
	} 
}

// 권고 발주 수정시 점포도 수정되게
function chgOrdGb()
{
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	for(var i=0 ; i < rowCnt.length ; i++)
	{     
		 
		gridRoot1.setItemFieldAt( $("#ORD_GB").val()  , i, "ORD_GB_NM"); 
		
		gridRoot1.setItemFieldAt( $("#ORD_GB").val()  , i, "ORD_GB"); 
		
		gridRoot1.setItemFieldAt( "U" , i, "CRUD"); 


		
	}
}

function setAllStore()
{ 
	if(   $("input:checkbox[id='SET_ALL_STORE']").is(":checked")  )  
	{    
		$('input:checkbox[id="FOOD_MART"]').attr("checked", true);  
		$('input:checkbox[id="MART_AND_MART"]').attr("checked", true); 
		$('input:checkbox[id="DC_CENTER"]').attr("checked", true); 
		
		$("#FOOD_MART").attr("disabled", true);
		$("#MART_AND_MART").attr("disabled", true);
		$("#DC_CENTER").attr("disabled", true);
		
		$("#ONE_STR_CODE").val("") ;
		$('#ONE_STR_CODE').attr('disabled', 'disabled');
		  
	} else {   
		  
		$('input:checkbox[id="FOOD_MART"]').attr("checked", false);  
		$('input:checkbox[id="MART_AND_MART"]').attr("checked", false); 
		$('input:checkbox[id="DC_CENTER"]').attr("checked", false); 
 
		$("#FOOD_MART").attr("disabled", false);
		$("#MART_AND_MART").attr("disabled", false);
		$("#DC_CENTER").attr("disabled", false); 
		
		$('#ONE_STR_CODE').removeAttr('disabled');
	} 
	
	
//	U1    UPTAE_FLAG    3     뮬류센터
//	U1    UPTAE_FLAG    2         마트앤마트        
//	U1    UPTAE_FLAG    1         식자재마트     
	  
}



 


// 그리드내의 협력업체검색 팝업
function venPopup(event)
{	 
//	gridRoot12.removeAll( );
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	var dataRow = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	 
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	 
	// 선택한 그리드의 VEN_NAME 을 가져온다.
	var VEN_NAME =   gridRoot1.getItemFieldAt( rowIndex , "VEN_NAME")   ;
	  
	$("#P_CALLBACK_NM3").val('fn_comm_supply_callback_grid(dataRow12)');
	if( VEN_NAME  != null && VEN_NAME  != ""){
		$("#P_TEXT3").val( VEN_NAME );
		btn_comm_search('3');
	}
	 
}
 
//그래드내의 (협력업체검색) 팝업 callback function
function fn_comm_supply_callback_grid(dataRow){
	     
	var selectedIndex = dataGrid1.getSelectedIndex(); 
	gridRoot1.setItemFieldAt( dataRow.VEN_NAME , selectedIndex, "VEN_NAME");
	gridRoot1.setItemFieldAt( dataRow.VEN_CODE , selectedIndex, "VEN_CODE");
	gridRoot1.setItemFieldAt( dataRow.GRE_GB , selectedIndex, "GRE_GB");					//2017-12-11	//협력업체 변경시, 등록된 거래구분 따라감
	gridRoot1.setItemFieldAt( dataRow.GRE_GB_NM , selectedIndex, "GRE_GB_NM");		//2017-12-11
	gridRoot1.setItemFieldAt( "U" , selectedIndex, "CRUD");
	$('#P_CALLBACK_NM3').val("");		//협렵업체 검색 콜백함수 value 초기화  
	
}


// 상품상세 부분 내에서의 (협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){


	// gridRoot12.removeAll( );
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize(); 
	
	$("#P_CALLBACK_NM1").val('fn_comm_supply_callback(dataRow11)');
	 
	
	if($("#VEN_NAME").val() != null && $("#VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#VEN_NAME").val());
		btn_comm_search('3');
		$('#SUPPLY_USE_YN_Y').prop("checked", true);
	}
	 
} 

//상품상세 부분 내에서의 (협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	
	$('#VEN_NAME').val(dataRow.VEN_NAME);		// 협력업체명
	$('#VEN_CODE').val(dataRow.VEN_CODE);		// 협력업체코드
	
	$('#GRE_GB_NM').val(dataRow.GRE_GB_NM);     // 거래구분 명
	$('#GRE_GB').val(dataRow.GRE_GB);           // 거래구분  코드
	
	$('#PRGT_RATE').val( dataRow.SALE_RATE);   // 수수료율 
	
	
  
/*ttt	 
	var column1 = gridRoot1.getObjectById("PRGT_RATE"); 
	if(  dataRow.GRE_GB == "2" )   // 임대을 (2) 일때만 수수료율 수정가능하게 한다.
	{ 
		column1.editable = true; 
	} else { 
		column1.editable = false; 
	}*/
	
	
}


//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#P_CALLBACK_NM1").val('fn_comm_product_callback(dataRow11)');
	if($("#S_ITM_NAME").val() != null && $("#S_ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#S_ITM_NAME").val());
		btn_comm_search('2');
	}
	  
} 
//(상품검색) 팝업 callback function
function fn_comm_product_callback( dataRow ){
	$('#S_ITM_CODE' ).val(dataRow.ITM_CODE);	// 상품코드
	$('#S_ITM_NAME' ).val(dataRow.ITM_NAME);	// 상품명 
	$('#S_SCAN_CODE' ).val(dataRow.SCAN_CODE);	//  
}

// 관리구분  비규격 변경시 스캔코드는 readonly 하고, 비규격일때는 발번되는 ITM_CODE 를 넣어준다.
function setItmStd()
{ 
	$('#SCAN_CODE' ).val("");
	
	// 규격일경우  SCAN_CODE 보여주고, NO_BARCODE도 보여준다.
    if(  $('#ITM_STD').val() == "1" || $('#ITM_STD').val() == "2" )   // 규격
    {
    	
    	$("input[name=SCAN_CODE]").attr("readonly", false);  
    	$('#NO_BARCODE').show();
    	$('#NO_BARCODE').val("1");
    	
    	$('#FRESH_BARCODE_DIV').hide(); 
    	$('input:checkbox[id="FRESH_BARCODE"]').attr("checked", false); 
 
    	
    } else  {   // 비규격
    	$("#FRESH_BARCODE").prop('checked', false) ;
 
    	$("input[name=SCAN_CODE]").attr("readonly", true);
    	$('#NO_BARCODE').hide();
    	$('#NO_BARCODE').val("0");
    	$('#SCAN_CODE' ).val("");
    
    	$('#FRESH_BARCODE_DIV').show();
    }	
    	
}



function chgFreshBarcode()
{
	$('#SCAN_CODE' ).val("");
	if( $("#FRESH_BARCODE").prop("checked")   )   // 비규격인데 바코드가 있는 경우
	{
		$("input[name=SCAN_CODE]").attr("readonly", false);
		 
	} else {
		
		$("input[name=SCAN_CODE]").attr("readonly", true);
		 
	}
 
}



// 특단가 변경시 점포도 같이 바뀌게
function chgMbrDcYn()
{
	var rowCnt   =  gridRoot1.getCollection().getSource() ;  
	var checkBit =  ""; 
	if(   $("input:checkbox[id='MBR_DC_YN']").is(":checked")    )   // 체크함 "Y
	{
		checkBit = "Y"; 
	} else {
		checkBit = "N"; 
	} 
	 
	// 점포도 같이 바꾸어 주기
	for(var i=0 ; i < rowCnt.length ; i++)
	{  
		 gridRoot1.setItemFieldAt( "U" , i, "CRUD");
		 gridRoot1.setItemFieldAt( checkBit , i, "MBR_DC_YN_NM");
		 gridRoot1.setItemFieldAt( checkBit , i, "MBR_DC_YN");
	}
	 
}


// 포인트 적립 변경시 점포도 같이 바뀌게
function chgPointSave()
{
 
	var rowCnt   =  gridRoot1.getCollection().getSource() ;  
	var checkBit =  ""; 
	if(   $("input:checkbox[id='POINT_SAVE']").is(":checked")    )   // 체크함 "Y
	{
		checkBit = "Y"; 
	} else {
		checkBit = "N"; 
	} 
	 
	// 점포도 같이 바꾸어 주기
	for(var i=0 ; i < rowCnt.length ; i++)
	{  
		 gridRoot1.setItemFieldAt( "U" , i, "CRUD");
		 gridRoot1.setItemFieldAt( checkBit , i, "POINT_SAVE_NM");
		 gridRoot1.setItemFieldAt( checkBit , i, "POINT_SAVE");
	}
	
	
}




function chgNoBarcode()
{
	$('#SCAN_CODE' ).val("");
	if( $('#NO_BARCODE').val() == "1" )  // 바코드 존재시 입력가능하게함.
	{
		$("input[name=SCAN_CODE]").attr("readonly",false);
	} else {   // 바코드 미존재시 SCAN_CODE readonly 
		$("input[name=SCAN_CODE]").attr("readonly",true);
	} 
}



getBotCodeSelectBoxList("BOT_CODE"      );   // 공병코드





/************************************************
 * 상품 마스터의 공병 리스트의 SELECT BOX 리스트를 생성한다
 * checkBoxId		: 셀렉트 박스 ID
 * groupCode	    : 공통 코드 Group (ex : CD0005)
 ************************************************/
function getBotCodeSelectBoxList(selectBoxId ){
//	var postValue ={};	
//	postValue = { "CD_CL"	: groupCode };
	
	// 공통코드를 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getBotCodeSelectBoxList.do",    // getCommonCodeSelectBoxList
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
//	    data:postValue,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#"+selectBoxId).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}



 


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	
//	// 사업자번호 키 입력시 하이픈 넣기
//	$('#BUSI_NO').keyup(function(event) {  
//		event = event || window.event;
//		var _val = this.value.trim();
//		this.value = autoHypenBizNo(_val) ;
//		
//	}); 
	
	
	$(".box_lft").width(260);
	$(".box_rgt").css("marginLeft","275px");
	$(window).on('resize',function (){		
		$(".box_lft").width(260);
		$(".box_rgt").css("marginLeft","275px");
	});
	
});

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################