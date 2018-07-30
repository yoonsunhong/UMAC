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
var BUSI_NO_DUP_BIT  =   "";    // 사업자번호  중복 체크버튼
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호
var totalCnt = 0;
var SEARCH_BTN_CLICK_YN = "Y";
$(document).ready(function(){
	
	init();
	
//	// 조회조건절의 상품에서 엔터시 상품검색되게....
//	$("input[name=S_ITM_NAME]").keydown(function (key) { 
//        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
//        	btn_comm_product_search();
//        } 
//	});
//	

//	
//	// 숫자만, 제자리 마다 콤마 찍기
//    $('#BASE_WPRC').number( true, 2 );  // 기준원가
//    $('#SUR_TAX').number( true, 2 );  // 부가세
//    $('#BASE_SPRC').number( true, 2 );  // 기준매가
//    $('#BOT_SPRC').number( true, 0 );  // 공병단가 
//    
//    $('#WSAL_RATE_1').number( true, 2 );  // 도매할인 1
//    $('#WSAL_RATE_2').number( true, 2 );  // 도매할인 2
//    $('#WSAL_RATE_3').number( true, 2 );  // 도매할인 3
//    $('#WSAL_RATE_4').number( true, 2 );  // 도매할인 4
//    $('#WSAL_RATE_5').number( true, 2 );  // 도매할인 5
//    
//    
//    
//    $("#STKLM_QTY").val("0");  
//    $("#LEAD_TIME").val("0");  
//    
//    // LEAD_TIME  - 숫자만 입력받기
//	$("#LEAD_TIME").keyup(function(){
//		$(this).val($(this).val().replace(/[^0-9]/g,''));
//    });
//    
//	// 안전재고  - 숫자만 입력받기
//	$("#STKLM_QTY").keyup(function(){
//		$(this).val($(this).val().replace(/[^0-9]/g,''));
//    });
//    
//	// 스캔코드  - 숫자만 입력받기
//	$("#SCAN_CODE").keyup(function(){
//		$(this).val($(this).val().replace(/[^0-9]/g,''));
//    });
//	
//	// 유효일수  - 숫자만 입력받기
//	$("#VALID_DD").keyup(function(){
//		$(this).val($(this).val().replace(/[^0-9]/g,''));
//    });
//	
//	// 입수  - 숫자만 입력받기
//	$("#IPSU_QTY").keyup(function(){
//		$(this).val($(this).val().replace(/[^0-9]/g,''));
//    });
//	
//	
//	// 신규 혹은 최초페이지 일때 거래종료일 입력 못 받게 한다.     
//	$("#END_DT").datepicker( "option", "disabled", true );
//	$("input[name=END_DT]").attr("readonly",false);
//	
//	
//	// 가격에 0 으로 초기화
//	$("#BASE_WPRC").val("0");   // 기준원가(VAT별도)
//	$("#SUR_TAX").val("0");   	// 부가세
//	$("#BASE_SPRC").val("0");   // 기준매가(VAT포함)
//	
//	// 도매할인 
//	$("#WSAL_RATE_1").val("0");  
//	$("#WSAL_RATE_2").val("0");  
//	$("#WSAL_RATE_3").val("0");  
//	$("#WSAL_RATE_4").val("0");  
//	$("#WSAL_RATE_5").val("0");  
//	
//	//취급일자는 시스템 날짜 + 1 해서 default 로 넣는다
//	var STR_DT = new CommDateManager().after(0, 0, 1).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
//	$("#STR_DT").val( STR_DT );
//	 
//	// 회원할인 체크박스는 Y 디폴트 
//	$('input:checkbox[id="MBR_DC_YN"]').attr("checked", true); 
//  
//	//이익율 /  이익액 0으로 초기화
//	$("#PROFIT_PRC").val("0"); 
//	$("#PROFIT_PER").val("0"); 
//	 
//	//유효일수
//	$("#VALID_DD").val("0"); 
	
	$('#ITM_NAME').focus();
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
rMateGridH5.create("grid1", "gridHolder1", jsVars+"&dataType=xml", "100%");   // 취급점포 등록 그리드

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
 //				//  취급여부  콤보박스
//				var COMBO_END_IND_NM = gridRoot1.getObjectById("END_IND_NM");    
//				COMBO_END_IND_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('END_IND') );
  
				// 더블클릭
				dataGrid1.setDoubleClickEnabled(true);
				dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
				
			}; 
			
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1); 
			
			// 그리드내 콤보박스 change 시 이벤트
			gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);
			gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
			 
		}  
  
}



//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 헤더 클릭 이벤트
//	dataGrid1.addEventListener("headerRelease", headerRelease1);
	
	drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
}



//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1; 

//----------------------- 그리드 설정 끝 -----------------------

 
//취급점포 등록 그리드 - 그리드1 헤더 설정  
var layoutStr1 =
'<rMateGrid>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" lockedColumnCount="5"  headerColors="[#f2f2f2]" editable="true" horizontalScrollPolicy="auto" showDeletedRows="true" doubleClickEnabled="false" selectionMode="multipleRows" borderColor="#ddd" rollOverColor="#ddffdc" selectionColor="#ffe6cd" color="#4c4f53" headerHeight="25" rowHeight="25" headerPaddingTop="5" headerPaddingBottom="5" paddingTop="3" paddingBottom="3" headerBorderTopColor="#2c2c2c" headerBorderTopWidth="2" textSelectedColor = "#4c4f53" fontFamily= "돋움">\
		<columns>\
			<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"/>\
			<DataGridColumn  id="CRUD"		 	 dataField="CRUD"     		visible="false"     />\
			<DataGridColumn  id="STR_CODE"		 dataField="STR_CODE"     	visible="false"     />\
			<DataGridColumn  id="STR_NAME"		 dataField="STR_NAME"     	headerText="점포명"	visible="true" 	editable="false" 	textAlign="center"	 width="65"     />\
			<DataGridColumn  id="ITM_CODE"		 dataField="ITM_CODE"    	headerText="관리코드"     visible="false" 	editable="false"	textAlign="center"   width="100"  />\
			<DataGridColumn  id="SCAN_CODE"		 dataField="SCAN_CODE"    	headerText="스캔코드"    	editable="false"	textAlign="center"   width="100"  />\
			<DataGridColumn  id="ITM_NAME"		 dataField="ITM_NAME"    	headerText="상품명"    	editable="false"	textAlign="left"   width="130"  />\
 			<DataGridColumn  id="ORD_UNIT"		 dataField="ORD_UNIT"    	headerText="규격"    	 	editable="false"	textAlign="right"	 width="65"  />\
	<DataGridColumn  id="TAX_GB"		 dataField="TAX_GB"      editable="false"  visible="false"    />\
	<DataGridColumn  id="TAX_GB_NM"		 dataField="TAX_GB_NM"    	headerText="과세구분"     editable="false"		textAlign="center"	 width="65"  />\
			<DataGridColumn  id="WPRC_TOT"  	 dataField="WPRC_TOT"   	headerText="원가합계"   formatter="{numfmt}"  editable="true"		showEditableIcon="always"  itemRenderer="EditableIconItem"	 textAlign="right"	 width="75"  />\
			<DataGridColumn  id="WPRC"		 	 dataField="WPRC"    		headerText="원가"      editable="false" formatter="{numfmt}"   textAlign="right"	 width="75"  />\
			<DataGridColumn  id="WVAT"		     dataField="WVAT"       	headerText="부가세"     formatter="{numfmt}" 	editable="false"	textAlign="right"	 width="75"  />\
			<DataGridColumn  id="SPRC"		 	 dataField="SPRC"    		headerText="매가"     formatter="{numfmt}"  editable="true"		showEditableIcon="always"  itemRenderer="EditableIconItem" textAlign="right"	 width="75"  />\
			<DataGridColumn  id="MARGIN_PER"	 dataField="MARGIN_PER"    	headerText="마진율"     	editable="false"	textAlign="right"	 width="65"  />\
	<DataGridColumn  id="PRGT_RATE"		 dataField="PRGT_RATE"    	headerText="수수료율"     editable="true"		showEditableIcon="always"  itemRenderer="EditableIconItem" textAlign="right"	 width="75"  />\
	<DataGridColumn  id="EVT_SPRC"		 dataField="EVT_SPRC"    	headerText="행사매가"     editable="false"		 formatter="{numfmt}"   textAlign="right"	 width="75"  />\
	<DataGridColumn  id="IPSU_QTY"		 dataField="IPSU_QTY"    	headerText="입수"     	editable="false"	textAlign="right"	 width="65"  />\
			<DataGridColumn  id="GRE_GB_NM"		 dataField="GRE_GB_NM"  	headerText="거래구분"     editable="false"		textAlign="center"	 width="65"  />\
			<DataGridColumn  id="PREV_PRICE"		 	 dataField="PREV_PRICE"    	headerText="직전매입가"    editable="false" formatter="{numfmt}" 	visible="true"		textAlign="right"	 width="85"  />\
	<DataGridColumn  id="LAST_PUR_DT"		 	 dataField="LAST_PUR_DT"    headerText="최종매입일"	editable="false" 	formatter="{datefmt}"  visible="true"		textAlign="center"	 width="105"  />\
	<DataGridColumn  id="LAST_SALE_DT"		 	 dataField="LAST_SALE_DT"   headerText="최종매출일"	editable="false" 	formatter="{datefmt}"  visible="true"		textAlign="center"	 width="105"  />\
	<DataGridColumn  id="EVT_NM"		 		 dataField="EVT_NM"    		headerText="행사명"		editable="false"	 visible="false"	textAlign="center"	 width="125"  />\
	<DataGridColumn  id="CUR_INV_QTY"	 		 dataField="CUR_INV_QTY"    headerText="현재고"		editable="false"	formatter="{numfmt}" 	textAlign="right"	 width="66"  />\
			<DataGridColumn  id="CLS_NAME"		 dataField="CLS_NAME"    	headerText="상품분류"     editable="false"		textAlign="left"	 width="105"  />\
			<DataGridColumn  id="ITM_STD_NM"	 dataField="ITM_STD_NM"    	headerText="관리구분"     editable="false"		textAlign="center"	 width="95"  />\
			<DataGridColumn  id="ITM_GB_NM"		 dataField="ITM_GB_NM"    	headerText="상품구분"     editable="false"		textAlign="center"	 width="65"  />\
			<DataGridColumn  id="VEN_CODE"		 dataField="VEN_CODE"     	headerText="협력업체코드"  editable="false"	 visible="false"    textAlign="center"   width="75"  />\
		 	<DataGridColumn  id="VEN_NAME"		 dataField="VEN_NAME"     	headerText="협력업체"		itemRenderer="IconItem" icon="Magnifier"     	textAlign="left"	width="125"   />\
			<DataGridColumn  id="ROUTE_GB"		 dataField="ROUTE_GB"    	headerText="배송루트"     editable="false"		textAlign="center"	 width="105"  />\
		 	<DataGridColumn  id="UDATE"		 	 dataField="UDATE"     		headerText="변경일자"	 	editable="false" textAlign="center"   width="65"  />\
	<DataGridColumn  id="GRE_GB"		 dataField="GRE_GB"  visible="true" />\
	</columns>\
	</DataGrid>\
</rMateGrid>';

  

//그리드  데이터 초기화
var gridData1 = []; 

  


// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

//그리드 페이지 이동
function gridMovePage(page) {
	
	//alert(page);
	$("#pageIndex").val(page);
	pageIndex = page;
	
	btn_search('N');
	
}

function init() {
  
	// 마진율 from  - 숫자와 음수만 입력받기
	$("#MARGIN_PER_FROM").keyup(function(){
		$(this).val($(this).val().replace(/-[^0-9]/g,''));
    });
	// 마진율 to  - 숫자와 음수만 입력받기
	$("#MARGIN_PER_TO").keyup(function(){
		$(this).val($(this).val().replace(/-[^0-9]/g,''));
    });
	
	
	
	//   협력(매입)업체에서 엔터시 검색되게....
	$("input[name=VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        } 
	});
	
	 
	$("input[name=ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_store_search();
        } 
	});
	

	// 달력
	$(".datepicker").datepicker({
		 showMonthAfterYear:true 
	});
	
	// SELECT BOX 바인딩   
	getStoreCode("STR_CODE");   							   // 점포코드
    getCommonCodeSelectBoxList("ITM_STD"    ,   "ITM_STD");    // 관리구분
    getCommonCodeSelectBoxList("ITM_FORM"   ,   "ITM_FORM");   // 상품형태 
    getCommonCodeSelectBoxList("ORD_UNIT"   ,   "ORD_UNIT");   // 발주단위
    getCommonCodeSelectBoxList("ROUTE_GB"   ,   "ROUTE_GB");   // 배송루트
    getCommonCodeSelectBoxList("END_IND"    ,   "END_IND");    // 취급여부
    getCommonCodeSelectBoxList("GRE_GB"     ,   "GRE_GB");     // 거래형태
    getCommonCodeSelectBoxList("POINT_SAVE" ,   "POINT_SAVE"); // 포인트적립여부
     
	// 대 중 소 분류 바인딩  : 첫번째인자=html오브젝트     두번째인자=대(1)중(2)소(3) 구분      세번째인자=분류 구분 코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. 
	getCateCodeSelectBoxList("LRG_CODE"   , "1" ,  ""   );    // 대 분류    
    
	
	
	$("#END_IND").val("0");
	
	
	// 유맥의 요청으로 전체가 검색되게 해야해서 주석 처리 한다.
	// 점포 로그인시 점포 select를 해당 점포만 나오게 한다. 관리자인경우에는 다나오게 한다. 
 
//	if( $("#SESSION_ROLE_ID").val()    == "ROLE009"  ||  $("#SESSION_ROLE_ID").val()    == "ROLE010")  // 바이어(ROLE009) 로그인시 다보여줌
//	{  
//	} else {         // 점포 로그인시 해당 점포만 보여줌
//		
//		$("#STR_CODE  option[value!='"+$("#SESSION_STR_CODE").val()+"']").remove(); 
//	}
	
      
	  
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
 

// 협력업체 삭제시 ven_code 초기화 
function chgVenName()
{   
	if( $.trim( $("#VEN_NAME").val() )  == "" )
	{
		$("#VEN_CODE").val("");
	}	
}
 
function chgItmName()
{   
	if( $.trim( $("#ITM_NAME").val() )  == "" )
	{
		$("#ITM_CODE").val("");
		$("#SCAN_CODE").val("");
	}	
}
 



function  btn_pop_close(){ 
	 $( "#show_product_pop" ).dialog( 'close' );	 
}
 

function btn_save(){
	 

	// 그리드에 대한 유효성 검사
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	for(var i=0 ; i < rowCnt.length ; i++)
	{      
		if(  typeof  gridRoot1.getItemFieldAt( i , "WPRC") == 'undefined' || gridRoot1.getItemFieldAt( i , "WPRC") == '0' )
		{
			alert("하단 그리드의 원가를 입력 하세요");
			return;
		}
		if( typeof gridRoot1.getItemFieldAt( i , "SPRC") == 'undefined' || gridRoot1.getItemFieldAt( i , "SPRC") == '0' )
		{
			alert("하단 그리드의 매가를 입력 하세요");
			return;
		}
//		if( typeof gridRoot1.getItemFieldAt( i , "PRGT_RATE") == 'undefined' || gridRoot1.getItemFieldAt( i , "PRGT_RATE") == '0' )
//		{
//			alert("하단 그리드의 수수료율를 입력 하세요");
//			return;
//		} 
		   
	}   
 

	
	// 점상품   저장위해 xml 만듦
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
	var WPRC  		= xmlDoc.createElement('WPRC');   
	var WVAT  		= xmlDoc.createElement('WVAT');   
	var SPRC  		= xmlDoc.createElement('SPRC'); 
	var PRGT_RATE   = xmlDoc.createElement('PRGT_RATE');
	var VEN_CODE  	= xmlDoc.createElement('VEN_CODE');
	var CORP_CODE  	= xmlDoc.createElement('CORP_CODE');
	var STR_CODE  	= xmlDoc.createElement('STR_CODE');
	var ITM_CODE  	= xmlDoc.createElement('ITM_CODE');
			
	WPRC.appendChild( xmlDoc.createTextNode(          WPRC      	)	); 
	WVAT.appendChild( xmlDoc.createTextNode(          WVAT      	)	); 
	SPRC.appendChild( xmlDoc.createTextNode(          SPRC      	)	); 
	PRGT_RATE.appendChild( xmlDoc.createTextNode(     PRGT_RATE     )	); 
	VEN_CODE.appendChild( xmlDoc.createTextNode(      VEN_CODE      )	); 
	CORP_CODE.appendChild( xmlDoc.createTextNode(     CORP_CODE     )	); 
	STR_CODE.appendChild( xmlDoc.createTextNode(      STR_CODE      )	); 
	ITM_CODE.appendChild( xmlDoc.createTextNode(      ITM_CODE      )	); 
	  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( WPRC 		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( WVAT 		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SPRC 		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PRGT_RATE 	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE 	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CORP_CODE 	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE 	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_CODE 	);
	     
 
	// 취급점포 그리드 저장하기 위해서 XML로 만듬 
    var gridXmlData1 = ""; 
	var rowCnt  = gridRoot1.getCollection().getSource() ;  
	for(var i=0 ; i < rowCnt.length ; i++)
	{    gridXmlData1 = gridXmlData1 + getXmlString(   gridRoot1.getItemAt(i)   );     }  
	gridXmlData1 =  "<GRIDLIST>"+gridXmlData1+"</GRIDLIST>" ;
 
	 

	
	//   취급점포 그리드 업데이트
	jQuery.ajax({ 
	    url:"/productStoreUpdate.do",          //  productMasterRegister.do
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {    "gridXmlData1" 		  : gridXmlData1    
	    }, 
		success:function(data){   
			if(  data[0].RETURN_CODE  == "0000")
			{  
				// 저장에 성공 했으므로  수정 모드로 바꾼다
//				crudBit = "U";
				
				btn_search('N');
 			  
				
				alert("저장에 성공 하였습니다");
				
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
	 
	
}
 


function btn_clear(){
	 
	// 조회조건 초기화
	$("form").each(function() {  
        if(this.id == "frmSearch") this.reset();  
     }); 
	$("#ITM_CODE").val("") ; 
	$("#VEN_CODE").val("") ; 
 
	$("#END_IND").val("0");
	
	gridRoot1.removeAll( );
	dataGrid1.setEnabled(true);
	gridRoot1.removeLoadingBar();
}



function btn_search( SEARCH_BTN_CLICK_YN ){
	var loadData = $("#top_search").serializeAllObject(); 

	loadData.ROWS_PER_PAGE 	= RowsPerPage;
	loadData.STR_CODE 		= $("#STR_CODE").val();
	
	if( $("#STR_CODE").val()  == "" )
	{
		if( $.trim(   $("#ITM_NAME").val()  )  == "" )
		{   alert("점포명이 전체 일때는  상품명을 선택 하셔야 합니다.");
			$("#ITM_NAME").focus();
			return;
		}  
	}
	
	if(    $.trim(  $("#STR_DT_FROM").val()  )  != ""   &&  $.trim(   $("#STR_DT_TO").val()  )  == "" 
		|| $.trim(  $("#STR_DT_FROM").val()  )  == ""   &&  $.trim(   $("#STR_DT_TO").val()  )  != ""  
	)
	{     
		 if( $.trim(  $("#STR_DT_FROM").val()  )  == ""   )
		 {   alert("취급일자(FROM)를 입력 하세요.");
			 $("#STR_DT_FROM").focus();
		 } else {
			 alert("취급일자(TO)를 입력 하세요.");
			 $("#STR_DT_TO").focus();
		 }  
	     return; 
	}   
	 
	
	if( SEARCH_BTN_CLICK_YN == 'Y')
	{
		loadData.PAGE_INDEX = "1";
		pageIndex = "1";
	} else {
		loadData.PAGE_INDEX = pageIndex;
	}

	// 점포별 상품 리스트 보여주기 - grid1 
	jQuery.ajax({ 
	    url:"/productStoreSearchList.do",       
	    type:"POST",
		datatype:"xml",
//		async:false,
		data: loadData, 
		beforeSend : function(){ 
	            gridRoot1.addLoadingBar(); 
		}, 
		success:function(data){  
			   
			//그리드1 초기화 
			gridRoot1.removeAll( );
			
			if(data.length == 0) 
			{   alert("상품이  존재하지 않습니다.");
				dataGrid1.setEnabled(true);
		    	gridRoot1.removeLoadingBar();
				return;
			} else {
				
				totalCnt = data[0].TOTAL_CNT ;
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
				var CRUD 		     	 = xmlDoc.createElement('CRUD'); 
				
				var STR_CODE           	 = xmlDoc.createElement('STR_CODE');
				var STR_NAME           	 = xmlDoc.createElement('STR_NAME');
				var ITM_CODE           	 = xmlDoc.createElement('ITM_CODE');
				var SCAN_CODE          	 = xmlDoc.createElement('SCAN_CODE');
				var ITM_NAME           	 = xmlDoc.createElement('ITM_NAME');
				var ORD_UNIT             = xmlDoc.createElement('ORD_UNIT');

				var TAX_GB           	 = xmlDoc.createElement('TAX_GB');
				var TAX_GB_NM          	 = xmlDoc.createElement('TAX_GB_NM');
				var WPRC_TOT             = xmlDoc.createElement('WPRC_TOT');
				var WPRC   		         = xmlDoc.createElement('WPRC');
				var WVAT            	 = xmlDoc.createElement('WVAT');
				var SPRC   		     	 = xmlDoc.createElement('SPRC');
				var MARGIN_PER         	 = xmlDoc.createElement('MARGIN_PER');
				var IPSU_QTY           	 = xmlDoc.createElement('IPSU_QTY');
				var GRE_GB_NM         	 = xmlDoc.createElement('GRE_GB_NM');
				var PRGT_RATE          	 = xmlDoc.createElement('PRGT_RATE');
				var CLS_NAME           	 = xmlDoc.createElement('CLS_NAME');
				var ITM_STD_NM         	 = xmlDoc.createElement('ITM_STD_NM');
				var ITM_GB_NM          	 = xmlDoc.createElement('ITM_GB_NM');
				var VEN_CODE           	 = xmlDoc.createElement('VEN_CODE');
				var VEN_NAME           	 = xmlDoc.createElement('VEN_NAME');
				var UDATE              	 = xmlDoc.createElement('UDATE'); 
				var PREV_PRICE 			 = xmlDoc.createElement('PREV_PRICE'); 
				var LAST_PUR_DT 		 = xmlDoc.createElement('LAST_PUR_DT'); 
				var LAST_SALE_DT 		 = xmlDoc.createElement('LAST_SALE_DT'); 
				var EVT_NM 				 = xmlDoc.createElement('EVT_NM'); 
				var CUR_INV_QTY 		 = xmlDoc.createElement('CUR_INV_QTY'); 
				var EVT_SPRC 		 = xmlDoc.createElement('EVT_SPRC'); 
				var GRE_GB 		 = xmlDoc.createElement('GRE_GB'); 
				var ROUTE_GB 		 = xmlDoc.createElement('ROUTE_GB'); 
				
				CRUD.appendChild(			xmlDoc.createTextNode(	""						)	);  
//			    STR_CODE.appendChild(		xmlDoc.createTextNode(	$("#STR_CODE").val()  	)	); 
//			    STR_NAME.appendChild(		xmlDoc.createTextNode(	$("#STR_CODE option:selected").text()  	)	); 
			    STR_CODE.appendChild(		xmlDoc.createTextNode(	data[i].STR_CODE 		)	); 
			    STR_NAME.appendChild(		xmlDoc.createTextNode(	data[i].STR_NAME 	  	)	); 
			    ITM_CODE.appendChild(		xmlDoc.createTextNode(	data[i].ITM_CODE   		)	); 
			    SCAN_CODE.appendChild(		xmlDoc.createTextNode(	data[i].SCAN_CODE  		)	); 
			    ITM_NAME.appendChild(		xmlDoc.createTextNode(	data[i].ITM_NAME   		)	); 
			    ORD_UNIT.appendChild(		xmlDoc.createTextNode(	data[i].ORD_UNIT   		)	); 

			    TAX_GB.appendChild(			xmlDoc.createTextNode(	data[i].TAX_GB   		)	); 
			    TAX_GB_NM.appendChild(		xmlDoc.createTextNode(	data[i].TAX_GB_NM  		)	); 
			    WPRC.appendChild(			xmlDoc.createTextNode(	data[i].WPRC       		)	);  
				WVAT.appendChild(			xmlDoc.createTextNode(	data[i].WVAT  		    )	); 
				WPRC_TOT.appendChild(		xmlDoc.createTextNode(	parseFloat( data[i].WPRC )  + parseFloat( data[i].WVAT )   )	);
				GRE_GB.appendChild(			xmlDoc.createTextNode(	data[i].GRE_GB  		    )	); 
				ROUTE_GB.appendChild(			xmlDoc.createTextNode(	data[i].ROUTE_GB  		    )	); 
				
				
				
				
				var LAST_PUR_DT_VAL 	= data[i].LAST_PUR_DT;
				var LAST_SALE_DT_VAL	= data[i].LAST_SALE_DT;
				var EVT_NM_VAL  		= data[i].EVT_NM;
				var CUR_INV_QTY_VAL		= data[i].CUR_INV_QTY;
				var PREV_PRICE_VAL		= data[i].PREV_PRICE;
				if( typeof LAST_PUR_DT_VAL == "undefined"  || LAST_PUR_DT_VAL == "" )
				{  LAST_PUR_DT_VAL = " "; } 
				if( typeof LAST_SALE_DT_VAL == "undefined"  || LAST_SALE_DT_VAL == "" )
				{  LAST_SALE_DT_VAL = " "; } 
				if( typeof EVT_NM_VAL == "undefined"  || EVT_NM_VAL == "" )
				{  EVT_NM_VAL = " "; } 
				if( typeof CUR_INV_QTY_VAL == "undefined"  || CUR_INV_QTY_VAL == "" )
				{  CUR_INV_QTY_VAL = " "; } 
				if( typeof PREV_PRICE_VAL == "undefined"  || PREV_PRICE_VAL == "" )
				{  PREV_PRICE_VAL = " "; } 
				
				
				PREV_PRICE.appendChild(		xmlDoc.createTextNode(	 PREV_PRICE_VAL  		    )	); 
				LAST_PUR_DT.appendChild(	xmlDoc.createTextNode(	 LAST_PUR_DT_VAL  		    )	); 
				LAST_SALE_DT.appendChild(	xmlDoc.createTextNode(	 LAST_SALE_DT_VAL  		    )	); 
				EVT_NM.appendChild(			xmlDoc.createTextNode(	 EVT_NM_VAL  		    	)	); 
				CUR_INV_QTY.appendChild(	xmlDoc.createTextNode(	 CUR_INV_QTY_VAL  		    )	); 
				
				
				
//				INV_END_QTY.appendChild(	 xmlDoc.createTextNode(	data[i].INV_END_QTY   		)	); 
//			    EVT_CODE.appendChild(		xmlDoc.createTextNode(	data[i].EVT_CODE   		)	);  
//			    
//			    var EVT_NAME_VAL = "";
//			    if( typeof data[i].EVT_CODE == "undefined"  || data[i].EVT_CODE == "" )
//			    {
//			    	EVT_NAME_VAL = "";
//			    } else {
//			    	
//			    	EVT_NAME_VAL = "["+data[i].EVT_FLAG +"]["+ data[i].EVT_TYPE  +"] "+   data[i].EVT_NAME    ;
//			    }
//				EVT_NAME.appendChild(	    xmlDoc.createTextNode(	EVT_NAME_VAL  		)	); 
				 				
				
			    SPRC.appendChild(			xmlDoc.createTextNode(	data[i].SPRC       		)	); 
			    MARGIN_PER.appendChild(		xmlDoc.createTextNode(	data[i].MARGIN_PER 		)	); 
			    IPSU_QTY.appendChild(		xmlDoc.createTextNode(	data[i].IPSU_QTY   		)	); 
			    GRE_GB_NM.appendChild(		xmlDoc.createTextNode(	data[i].GRE_GB_NM  		)	); 
			    PRGT_RATE.appendChild(		xmlDoc.createTextNode(	data[i].PRGT_RATE  		)	); 
			    CLS_NAME.appendChild(		xmlDoc.createTextNode(	data[i].CLS_NAME   		)	); 
			    ITM_STD_NM.appendChild(		xmlDoc.createTextNode(	data[i].ITM_STD_NM 		)	); 
			    ITM_GB_NM.appendChild(		xmlDoc.createTextNode(	data[i].ITM_GB_NM  		)	); 
			    VEN_CODE.appendChild(		xmlDoc.createTextNode(	data[i].VEN_CODE   		)	); 
			    VEN_NAME.appendChild(		xmlDoc.createTextNode(	data[i].VEN_NAME   		)	);  
			    EVT_SPRC.appendChild(		xmlDoc.createTextNode(	 data[i].EVT_SPRC  		    )	); 

			    
			    var UDATE_VAL = "";
			    if( typeof data[i].UDATE == "undefined" )
			    {   UDATE_VAL = "";
			    } else {
			    	UDATE_VAL =  data[i].UDATE;
			    } 
			    UDATE.appendChild(			xmlDoc.createTextNode(	 UDATE_VAL    			)	); 
 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CRUD			); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_CODE  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	STR_NAME  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SCAN_CODE 	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_NAME  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ORD_UNIT   	);

				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TAX_GB  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TAX_GB_NM 	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WPRC      	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WVAT	   	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	WPRC_TOT   	);
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	SPRC      	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	MARGIN_PER	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	IPSU_QTY  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GRE_GB_NM  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PRGT_RATE 	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CLS_NAME  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_STD_NM	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_GB_NM 	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	VEN_CODE  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	VEN_NAME  	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	UDATE     	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	PREV_PRICE	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	LAST_PUR_DT	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	LAST_SALE_DT	);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	EVT_NM			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CUR_INV_QTY		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	EVT_SPRC		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ROUTE_GB		);

				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	GRE_GB		);
				
				
				gridRoot1.addItemAt(  xmlDoc  , 0 ,  false );
				 
			}
			
			
			// row 속성 제거
			for(var j=0 ; j < data.length ; j++ )
			{   var selectedItem = gridRoot1.getItemAt(j);
				gridRoot1.removeChangedData(	selectedItem	);
			}
			//그리드 속성 refresh
			dataGrid1.invalidateList();
			    
			dataGrid1.setEnabled(true);
	    	gridRoot1.removeLoadingBar();
	    	
	    	
	    	drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
	    },
	    complete : function(data) {
	    	 
	       
	    },
	    error : function(xhr, status, error) {
	    	dataGrid1.setEnabled(true);
	    	gridRoot1.removeLoadingBar();
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
	 
	if( dataField == "WPRC_TOT" ) { 
		 
		// 부가세 계산
//		var SUR_TAX_VAL = 0;
//		 
//		var BASE_WPRC = gridRoot1.getItemFieldAt( rowIndex , "WPRC") ; 
//		SUR_TAX_VAL = ( 10 * BASE_WPRC ) / 100 ;  
//		  
//		gridRoot1.setItemFieldAt( SUR_TAX_VAL , rowIndex, "SUR_TAX");
		 
		var priceVat = calPriceVat( newValue ,    gridRoot1.getItemFieldAt( rowIndex , "TAX_GB") ); 
		gridRoot1.setItemFieldAt( priceVat[1] , rowIndex, "WPRC");
		gridRoot1.setItemFieldAt( priceVat[2] , rowIndex, "WVAT");
		 
	} 
	
	
	// 임대을(2) 일때  수수료율 변경시, 원가 , VAT , 자동계산 
	if( dataField == "PRGT_RATE" ) { 
		 if( gridRoot1.getItemFieldAt( rowIndex , "GRE_GB") == "2"   )
		 {
			 
		 }
	}	

	// 임대을(2) 일때   매가 변경 시,  원가 , VAT , 자동계산 
	if( dataField == "SPRC" ) { 
		if( gridRoot1.getItemFieldAt( rowIndex , "GRE_GB") == "2"   )
		 {
			 
		 }
	}	
	  
}





//단가와 과세구분 입력하여 -> 단가, 운가, 부가세 뽑기
function calPriceVat(  PUR_AVR_AMT  , TAX_GB )
{  
	var WSPRC_VAL = 0;
	var WVAT_VAL = 0;  
	if(  TAX_GB  == "1"   ) // 과세
	{  
//		WSPRC_VAL = Math.round( PUR_AVR_AMT / 1.1 ) ;  
//		WVAT_VAL = PUR_AVR_AMT - Math.round( PUR_AVR_AMT / 1.1 ) ; 
//		 
		WSPRC_VAL = PUR_AVR_AMT- Math.floor( PUR_AVR_AMT / 11 ) ;  
		WVAT_VAL =    Math.floor( PUR_AVR_AMT / 11 ) ; 
		
	} else {        // 면세 
		WSPRC_VAL  = PUR_AVR_AMT ; 
		WVAT_VAL = 0 ; 
	} 
	return [ PUR_AVR_AMT , WSPRC_VAL , WVAT_VAL];
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

 



 


// 그리드내의 협력업체검색 팝업
function venPopup(event)
{	 
	
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
	gridRoot1.setItemFieldAt( dataRow.GRE_GB_NM , selectedIndex, "GRE_GB_NM");
	 
}


// 조회 조건절의   (협력업체검색) 팝업 호출 function
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
	
	$('#GRE_GB_NM').val(dataRow.GRE_GB_NM);     // 거래구분 명
	$('#GRE_GB').val(dataRow.GRE_GB);           // 거래구분  코드
	
	$('#PRGT_RATE').val( dataRow.SALE_RATE);   // 수수료율 
  
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

////(점별상품검색) 팝업 호출 function
//function btn_comm_store_search(){
//	$('#comm_pop_wrap6' ).dialog( 'open' );
//	gridApp15.resize();
//	fnGetStrName();
//	// $("#P_CALLBACK_NM6").val('fn_comm_store_callback1(dataRow15)');
//	if($("#ITM_NAME").val() != null && $("#ITM_NAME").val() != ""){
//		$("#P_TEXT6").val($("#ITM_NAME").val());
//		btn_comm_search('6');
//	}
//}
//
//
//function fn_comm_store_callback(dataRow)
//{ 
//	$("#ITM_NAME").val( dataRow.ITM_NAME ) ;
//	$("#ITM_CODE").val( dataRow.ITM_CODE ) ;
//}
 



function btnExcelDown(){
	var loadData =  $("#top_search").serializeAllObject();
	
	loadData.STR_CODE = $("#STR_CODE").val();

	$.download('/excelProductMasterStore.do',"P_STR_CODE="+loadData.STR_CODE
											+"&P_ITM_NAME="+loadData.ITM_NAME
											+"&P_VEN_CODE="+loadData.VEN_CODE
											+"&P_ITM_STD="+loadData.ITM_STD
											+"&P_GRE_GB="+loadData.GRE_GB
											+"&P_ITM_FORM="+loadData.ITM_FORM
											+"&P_LRG_CODE="+loadData.LRG_CODE
											+"&P_MID_CODE="+loadData.MID_CODE
											+"&P_CLS_CODE="+loadData.CLS_CODE
											+"&P_END_IND="+loadData.END_IND
											+"&P_ORD_UNIT="+loadData.ORD_UNIT
											+"&P_ROUTE_GB="+loadData.ROUTE_GB
											+"&P_POINT_SAVE="+loadData.POINT_SAVE
											+"&P_STR_DT_FROM="+loadData.STR_DT_FROM
											+"&P_STR_DT_TO="+loadData.STR_DT_TO
											+"&P_MARGIN_PER_FROM="+loadData.MARGIN_PER_FROM
											+"&P_MARGIN_PER_TO="+loadData.MARGIN_PER_TO
											+"&P_ROWS_PER_PAGE="+loadData.ROWS_PER_PAGE
											+"&P_PAGE_INDEX="+loadData.PAGE_INDEX
											+"&P_ITM_CODE="+loadData.ITM_CODE
											+"&P_SCAN_CODE="+loadData.SCAN_CODE
			 ,"post" );	
}




/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() -270 );

	$(window).on('resize',function (){
		$("#gridHolder1").width("100%");
		$("#gridHolder1").height( $(window).height()-270);
	});

	  
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