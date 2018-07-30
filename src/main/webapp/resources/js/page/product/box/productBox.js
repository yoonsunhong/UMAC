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

$(document).ready(function(){
	
	init();
	  
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
rMateGridH5.create("grid1", "gridHolder1", jsVars+"&dataType=xml", "100%", "460px");   // 취급점포 등록 그리드

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
				   
				if (dataField == "BOX_NAME"  ) 
				{ 
					if(   typeof gridRoot1.getItemFieldAt( rowIndex , "CRUD") != "undefined"     )
					{ 
						$('#P_TEXT7').val("");
						gridRoot16.removeAll();
						editRowIndex 	= rowIndex;
						editDataRow 	= dataRow;
						editDataField 	= dataField; 
						// 박스상품검색 - 그리드 내 팝업 				   
						boxProductPopup(event); 
						
					} else {
						
						alert('저장된 BOX 상품은 수정 할수없습니다.');
						
					}
				}  
					 
				if (dataField == "ITM_NAME") 
				{
					$('#P_TEXT7').val("");
					gridRoot16.removeAll();
					editRowIndex 	= rowIndex;
					editDataRow 	= dataRow;
					editDataField 	= dataField; 
					// 낱개상품검색 - 그리드 내 팝업 				   
					itmProductPopup(event); 
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
			 
		}  
 
 
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1; 

//----------------------- 그리드 설정 끝 -----------------------

 
// 박스코드 그리드 - 그리드1 헤더 설정    
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
	<DataGrid id="dg1"    lockedColumnCount="9"  editable="true" horizontalScrollPolicy="auto" showDeletedRows="true"  sortableColumns="true"  doubleClickEnabled="false" selectionMode="multipleRows" >\
		<columns>\
			<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"/>\
			<DataGridColumn  id="CRUD"		 	 dataField="CRUD"     		visible="false"     />\
	<DataGridColumn  id="SEQ_NO"		 dataField="SEQ_NO"     	headerText="순번"			editable="false" 	itemRenderer="IndexNoItem"	textAlign="center"   width="45"  	 />\
			<DataGridColumn  id="BOX_NAME"		 dataField="BOX_NAME"     	headerText="박스상품명"	editable="false" itemRenderer="IconItem" icon="Magnifier"     textAlign="left"	width="125"   />\
			<DataGridColumn  id="BOX_CODE"		 dataField="BOX_CODE"     	headerText="박스관리코드"	editable="false" 		textAlign="center"	 width="100"   />\
			<DataGridColumn  id="BOX_SCAN_CODE"	 dataField="BOX_SCAN_CODE" 	headerText="박스스캔코드"    editable="false"		textAlign="center"   width="100"   />\
			<DataGridColumn  id="IPSU_QTY"		 dataField="IPSU_QTY"    	headerText="낱개입수"  		showEditableIcon="always"   itemRenderer="EditableIconItem"	 editable="true"		 	textAlign="right"    width="85"   formatter="{numfmt}"  />\
			<DataGridColumn  id="BOX_WPRC"		 dataField="BOX_WPRC"    	headerText="박스원가"    	editable="false"		textAlign="right"    width="85"   formatter="{numfmt}"  />\
 			<DataGridColumn  id="BOX_TAX"		 dataField="BOX_TAX"    	headerText="원가부가세"    editable="false"		textAlign="right"	 width="85"   formatter="{numfmt}"  />\
			<DataGridColumn  id="BOX_SPRC"		 dataField="BOX_SPRC"    	headerText="박스매가" 	    editable="false"		textAlign="right"	 width="85"   formatter="{numfmt}"  />\
			<DataGridColumn  id="ITM_NAME"		 dataField="ITM_NAME"     	headerText="낱개상품명"	editable="true" itemRenderer="IconItem" icon="Magnifier"     textAlign="left"	width="125"   />\
			<DataGridColumn  id="ITM_CODE"		 dataField="ITM_CODE"     	headerText="낱개관리코드"	editable="false" 		textAlign="center"	 width="100"   />\
			<DataGridColumn  id="ITM_SCAN_CODE"	 dataField="ITM_SCAN_CODE" 	headerText="낱개스캔코드"   	editable="false"		textAlign="center"   width="100"   />\
			<DataGridColumn  id="ITM_WPRC"		 dataField="ITM_WPRC"    	headerText="낱개기준원가"	editable="false"		textAlign="right"    width="95"   formatter="{numfmt}"   />\
			<DataGridColumn  id="ITM_TAX"		 dataField="ITM_TAX"    	headerText="원가부가세"    editable="false"		textAlign="right"	 width="85"   formatter="{numfmt}" />\
			<DataGridColumn  id="ITM_SPRC"		 dataField="ITM_SPRC"    	headerText="낱개기준매가"	editable="false"		textAlign="right"	 width="95"   formatter="{numfmt}"  />\
			<DataGridColumn  id="TOT_SPRC"		 dataField="TOT_SPRC"    	headerText="기준매가합계"	editable="true"			textAlign="right"	 width="85"   formatter="{numfmt}"  />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

  

//그리드  데이터 초기화
var gridData1 = []; 

  


// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

 

function init() {
  
	
// 
//	alert('기준 매가 합계 셀  채우기');
//	 
 
	  
	
	// 박스상품 에서 엔터시 검색되게....
	$("input[name=BOX_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_product_search('02');
        } 
	});
	
	// 낱개상품 에서 엔터시 검색되게....
	$("input[name=ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_product_search('01');
        } 
	});
	
	
	//   협력(매입)업체에서 엔터시 검색되게....
	$("input[name=VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        } 
	});
	
 
	
	// SELECT BOX 바인딩   
 
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
 

// 협력업체 삭제시 ven_code 초기화 
function chgVenName()
{   
	if( $.trim( $("#VEN_NAME").val() )  == "" )
	{
		$("#VEN_CODE").val("");
	}	
}
 


//function  btn_pop_close(){ 
//	 $( "#show_product_pop" ).dialog( 'close' );	 
//}
 

function btn_save(){
	 

	// 그리드에 대한 유효성 검사
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	for(var i=0 ; i < rowCnt.length ; i++)
	{      
		if( typeof gridRoot1.getItemFieldAt( i , "BOX_NAME") == 'undefined' || gridRoot1.getItemFieldAt( i , "BOX_NAME") == '' )
		{
			alert("하단 그리드의 박스상품을 선택  하세요");
			return;
		}
		if(  typeof  gridRoot1.getItemFieldAt( i , "IPSU_QTY") == 'undefined' || gridRoot1.getItemFieldAt( i , "IPSU_QTY") == '0' )
		{
			alert("하단 그리드의 입수를 입력 하세요");
			return;
		}
		
		if( typeof gridRoot1.getItemFieldAt( i , "ITM_NAME") == 'undefined' || gridRoot1.getItemFieldAt( i , "ITM_NAME") == '' )
		{
			alert("하단 그리드의 낱개상품을 선택 하세요");
			return;
		} 
		   
	}   
 
 
  
 
	// 박스 상품 그리드를 저장/수정/삭제하기 위해서 XML로 만듬 
    var gridXmlData1 = ""; 
	var rowCnt  = gridRoot1.getCollection().getSource() ;  
	for(var i=0 ; i < rowCnt.length ; i++)
	{    gridXmlData1 = gridXmlData1 + getXmlString(   gridRoot1.getItemAt(i)   );     }  
	gridXmlData1 =  "<GRIDLIST>"+gridXmlData1+"</GRIDLIST>" ;
  
	
	//   박스 상품 그리드 업데이트
	jQuery.ajax({ 
	    url:"/productBoxUpdate.do",          //  productStoreUpdate.do
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
				
				btn_search();
 			  
				
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
	 
}



function btn_search(){
	 
	  
//	if( 	$.trim( $("#BOX_NAME").val() )  == ""   
//		&&  $.trim( $("#ITM_NAME").val() )  == ""  
//	)
//	{   alert("조회 할 BOX 또는 낱개상품을 검색 하세요.");
//		$("#BOX_NAME").focus();
//		return;
//	}
 
	
	  
	var loadData = $("#top_search").serializeAllObject(); 
	var TAX_GB = "";
	 
	// 박스 상품 리스트 보여주기 - grid1 
	jQuery.ajax({ 
	    url:"/productBoxSearchList.do",         //  productStoreSearchList   
	    type:"POST",
		datatype:"xml",
		async:true,
		beforeSend : function(){   
            gridRoot1.addLoadingBar(); 
	    }, 
		data: loadData, 
		success:function(data){  
			  
			//그리드1 초기화 
			gridRoot1.removeAll( );
			if(data.length == 0) 
 			{  
 				dataGrid1.setEnabled(true);
 		    	gridRoot1.removeLoadingBar(); 
 				return;
 			} 
			if(data[0].BOX_TAX_GB == "1"){
				TAX_GB = "1"; //과세
			}else{
				TAX_GB = "2"; //면세
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
				var CRUD 		     = xmlDoc.createElement('CRUD'); 
				var BOX_NAME 		 = xmlDoc.createElement('BOX_NAME'); 
				var BOX_CODE 		 = xmlDoc.createElement('BOX_CODE'); 
				var BOX_SCAN_CODE 	 = xmlDoc.createElement('BOX_SCAN_CODE'); 
				var IPSU_QTY 		 = xmlDoc.createElement('IPSU_QTY'); 
				var BOX_WPRC 		 = xmlDoc.createElement('BOX_WPRC'); 
				var BOX_TAX 		 = xmlDoc.createElement('BOX_TAX'); 
				var BOX_SPRC 		 = xmlDoc.createElement('BOX_SPRC'); 
				var ITM_NAME 		 = xmlDoc.createElement('ITM_NAME'); 
				var ITM_CODE 		 = xmlDoc.createElement('ITM_CODE'); 
				var ITM_SCAN_CODE 	 = xmlDoc.createElement('ITM_SCAN_CODE'); 
				var ITM_WPRC 		 = xmlDoc.createElement('ITM_WPRC'); 
				var ITM_TAX 		 = xmlDoc.createElement('ITM_TAX'); 
				var ITM_SPRC 		 = xmlDoc.createElement('ITM_SPRC'); 
				var TOT_SPRC 		 = xmlDoc.createElement('TOT_SPRC'); 
				
				 
				CRUD.appendChild(			xmlDoc.createTextNode(	""						)	);  
				BOX_NAME.appendChild(		xmlDoc.createTextNode(	data[i].BOX_NAME   		)	);  
				BOX_CODE.appendChild(		xmlDoc.createTextNode(	data[i].BOX_CODE   		)	); 
				BOX_SCAN_CODE.appendChild(	xmlDoc.createTextNode(	data[i].BOX_SCAN_CODE   )	); 
				IPSU_QTY.appendChild(		xmlDoc.createTextNode(	data[i].IPSU_QTY   		)	); 
				BOX_WPRC.appendChild(		xmlDoc.createTextNode(	data[i].BOX_WPRC   		)	); 
				
				//console.log("data[i].BOX_TAX_GB : " + +data[i].BOX_TAX_GB)
				if(data[i].BOX_TAX_GB == "1"){
					// 박스 부가세 계산
					var BOX_TAX_VAL = 0; 
					var BOX_WPRC_VAL = data[i].BOX_WPRC ; 
					BOX_TAX_VAL = ( 10 * BOX_WPRC_VAL ) / 100 ; 
					BOX_TAX.appendChild(		xmlDoc.createTextNode(	BOX_TAX_VAL     		)	); 
					BOX_SPRC.appendChild(		xmlDoc.createTextNode(	data[i].BOX_SPRC   		)	); 
					ITM_NAME.appendChild(		xmlDoc.createTextNode(	data[i].ITM_NAME   		)	); 
					ITM_CODE.appendChild(		xmlDoc.createTextNode(	data[i].ITM_CODE   		)	); 
					ITM_SCAN_CODE.appendChild(	xmlDoc.createTextNode(	data[i].ITM_SCAN_CODE   )	); 
					ITM_WPRC.appendChild(		xmlDoc.createTextNode(	data[i].ITM_WPRC   		)	); 
					
					// 낱개 부가세 계산
					var ITM_TAX_VAL = 0; 
					var ITM_WPRC_VAL = data[i].ITM_WPRC ; 
					ITM_TAX_VAL = ( 10 * ITM_WPRC_VAL ) / 100 ; 
					ITM_TAX.appendChild(		xmlDoc.createTextNode(	ITM_TAX_VAL   						)	); 
				}
				else{
					var BOX_TAX_VAL = 0; 
					var BOX_WPRC_VAL = 0; 
					BOX_TAX_VAL = 0; 
					BOX_TAX.appendChild(		xmlDoc.createTextNode(	BOX_TAX_VAL     		)	); 
					BOX_SPRC.appendChild(		xmlDoc.createTextNode(	data[i].BOX_SPRC   		)	); 
					ITM_NAME.appendChild(		xmlDoc.createTextNode(	data[i].ITM_NAME   		)	); 
					ITM_CODE.appendChild(		xmlDoc.createTextNode(	data[i].ITM_CODE   		)	); 
					ITM_SCAN_CODE.appendChild(	xmlDoc.createTextNode(	data[i].ITM_SCAN_CODE   )	); 
					ITM_WPRC.appendChild(		xmlDoc.createTextNode(	data[i].ITM_WPRC   		)	); 
					
					// 낱개 부가세 계산
					var ITM_TAX_VAL = 0; 
					var ITM_WPRC_VAL = 0; 
					ITM_TAX_VAL = 0 ; 
					ITM_TAX.appendChild(		xmlDoc.createTextNode(	ITM_TAX_VAL   						)	); 
				}
			
				ITM_SPRC.appendChild(		xmlDoc.createTextNode(	data[i].ITM_SPRC   					)	); 
				TOT_SPRC.appendChild(		xmlDoc.createTextNode(	data[i].IPSU_QTY * data[i].ITM_SPRC	)	); 
			      
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	CRUD        		); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOX_NAME          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOX_CODE          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOX_SCAN_CODE     	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	IPSU_QTY          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOX_WPRC          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOX_TAX           	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	BOX_SPRC          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_NAME          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_CODE          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_SCAN_CODE     	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_WPRC          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_TAX           	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	ITM_SPRC          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(	TOT_SPRC          	); 
				  
				gridRoot1.addItemAt(  xmlDoc  , 0 , false );
				 
			}
			 
			// row 속성 제거
			for(var j=0 ; j < data.length ; j++ )
			{   var selectedItem = gridRoot1.getItemAt(j);
				gridRoot1.removeChangedData(	selectedItem	);
			}
			//그리드 속성 refresh
			//dataGrid1.invalidateList();
			     
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
   
//	if(newValue == "")    {  return; }   // 선택한 값이 ""  일때  빠져나감
	
	
	if(  gridRoot1.getItemFieldAt( rowIndex , "CRUD")   ==  "C" )   // 기존 데이터가 C이면 신규 추가이므로, U 로 바꾸지 않는다. 
	{ 
	} else {
		gridRoot1.setItemFieldAt( "U" , rowIndex, "CRUD");  // 수정시 상태값을 U 로 바꾸어준다.		
	}
	
 
//	alert( gridRoot1.getItemFieldAt( rowIndex , "CRUD") );
	
	if(   dataField == "BOX_CODE" || dataField == "ITM_CODE"  ) {  
		gridRoot1.setItemFieldAt( "U" , rowIndex, "CRUD");   
	}
	 
	if( dataField == "IPSU_QTY" ) {  
		  
		if(     $.trim(  gridRoot1.getItemFieldAt( rowIndex , "IPSU_QTY")   ) == ""
			||  $.trim(  gridRoot1.getItemFieldAt( rowIndex , "IPSU_QTY")   ) == "0" ) 
		{   alert('입수를 입력 하세요');
			return;
		}
		 
		if
		(
			(     $.trim(gridRoot1.getItemFieldAt(rowIndex , "IPSU_QTY"))
			    * $.trim(gridRoot1.getItemFieldAt(rowIndex , "ITM_SPRC"))
			)  != $.trim(gridRoot1.getItemFieldAt(rowIndex , "BOX_SPRC"))  
		)
		{
			 alert(" ( 입수 * 낱개매가 ) 와 (박스매가) 가 일치 하지 않습니다.");
			 
//			 gridRoot1.setItemFieldAt( oldValue , rowIndex, "IPSU_QTY"); 
			 return;
		}  
		var ITM_SPRC =  gridRoot1.getItemFieldAt( rowIndex , "ITM_SPRC")  ;
		gridRoot1.setItemFieldAt( newValue * ITM_SPRC  , rowIndex, "TOT_SPRC"); 
		return;
		
		 
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
	var	BOX_NAME		= xmlDoc.createElement('BOX_NAME');
	var	BOX_CODE		= xmlDoc.createElement('BOX_CODE');
	var	BOX_SCAN_CODE	= xmlDoc.createElement('BOX_SCAN_CODE');
	var	IPSU_QTY		= xmlDoc.createElement('IPSU_QTY');
	var	BOX_WPRC		= xmlDoc.createElement('BOX_WPRC');
	var	BOX_TAX			= xmlDoc.createElement('BOX_TAX');
	var	BOX_SPRC		= xmlDoc.createElement('BOX_SPRC');
	var	ITM_NAME		= xmlDoc.createElement('ITM_NAME');
	var	ITM_CODE		= xmlDoc.createElement('ITM_CODE');
	var	ITM_SCAN_CODE	= xmlDoc.createElement('ITM_SCAN_CODE');
	var	ITM_WPRC		= xmlDoc.createElement('ITM_WPRC');
	var	ITM_TAX			= xmlDoc.createElement('ITM_TAX');
	var	ITM_SPRC		= xmlDoc.createElement('ITM_SPRC');
	var	TOT_SPRC		= xmlDoc.createElement('TOT_SPRC'); 


	 CRUD.appendChild(  		xmlDoc.createTextNode(  "C" )	);
	 BOX_NAME.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	 BOX_CODE.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	 BOX_SCAN_CODE.appendChild( xmlDoc.createTextNode(  ""	)	);
	 IPSU_QTY.appendChild(  	xmlDoc.createTextNode(  ""  )	);
	 BOX_WPRC.appendChild(  	xmlDoc.createTextNode(  ""  )	);
	 BOX_TAX.appendChild(  		xmlDoc.createTextNode(  ""  )	);
	 BOX_SPRC.appendChild(  	xmlDoc.createTextNode(  "" 	)	);
	 ITM_NAME.appendChild(  	xmlDoc.createTextNode(  ""  )	);
	 ITM_CODE.appendChild(  	xmlDoc.createTextNode(  ""  )	);
	 ITM_SCAN_CODE.appendChild( xmlDoc.createTextNode(  ""	)	);
	 ITM_WPRC.appendChild(  	xmlDoc.createTextNode(  ""  )	);
	 ITM_TAX.appendChild(  		xmlDoc.createTextNode(  ""  )	);
	 ITM_SPRC.appendChild(  	xmlDoc.createTextNode(  ""  )	);
	 TOT_SPRC.appendChild(  	xmlDoc.createTextNode(  ""  )	);

	  
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CRUD			); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOX_NAME 		); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOX_CODE     	); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOX_SCAN_CODE  	); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IPSU_QTY 		); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOX_WPRC        ); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOX_TAX         ); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BOX_SPRC        ); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME        ); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_CODE        ); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_SCAN_CODE   ); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_WPRC        ); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_TAX         ); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_SPRC        ); 
	 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TOT_SPRC        ); 
  
	
	gridRoot1.addItemAt(  xmlDoc  , 0 , false);
	girdMoveSelctedIndex(0 , gridRoot1.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기
	 

}


function gridHolder1DelRow()
{
	if (confirm("선택한 BOX상품을  삭제하시겠습니까?") == true){     
		var selectedIndex = dataGrid1.getSelectedIndex();
		gridRoot1.removeItemAt(selectedIndex);
		gridRoot1.setItemFieldAt( "D" , selectedIndex, "CRUD");
	} else {    
	    return;
    } 

}
 
// CD_PRODUCT_CMS
// ITM_FORM    01    낱개상품    
// ITM_FORM    03    묶음상품            
// ITM_FORM    02    박스상품      
function btn_product_search( ITM_FORM )
{
	
	$('#P_TEXT7').val("");
	gridRoot16.removeAll();
	$('#comm_pop_wrap7' ).dialog( 'open' );
	gridApp16.resize(); 
	$("#P_ITM_FORM").val(  ITM_FORM  ); 
	
	if( ITM_FORM == "01" )  // 낱개
	{ 
		$("#P_CALLBACK_NM7").val('fn_comm_product_itm_form_callback(dataRow16)');  
		if($("#ITM_NAME").val() != null && $("#ITM_NAME").val() != ""){
			$("#P_TEXT7").val($("#ITM_NAME").val());
			btn_comm_search('7');
		}
		
	} else if( ITM_FORM == "02" )   {  // 박스
		 
		$("#P_CALLBACK_NM7").val('fn_comm_product_box_form_callback(dataRow16)');  
		if($("#BOX_NAME").val() != null && $("#BOX_NAME").val() != ""){
			$("#P_TEXT7").val($("#BOX_NAME").val());
			btn_comm_search('7');
		} 
	} 
}
function fn_comm_product_box_form_callback(dataRow)
{ 
	$('#BOX_CODE').val(dataRow.ITM_CODE);		 
	$('#BOX_SCAN_CODE').val(dataRow.SCAN_CODE);		 
	$('#BOX_NAME').val(dataRow.ITM_NAME);		 
}
function fn_comm_product_itm_form_callback(dataRow)
{
	$('#ITM_CODE').val(dataRow.ITM_CODE);		 
	$('#ITM_SCAN_CODE').val(dataRow.SCAN_CODE);		 
	$('#ITM_NAME').val(dataRow.ITM_NAME);		 
}



//그리드내의 낱개상품 검색 팝업
function itmProductPopup(event)
{
	var rowIndex 	= event.rowIndex;
	var columnIndex = event.columnIndex;
	var dataRow 	= gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column 		= dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField 	= column.getDataField();
	 
	$('#comm_pop_wrap7' ).dialog( 'open' );
	gridApp16.resize(); 
	// 선택한 그리드의 VEN_NAME 을 가져온다.
	var ITM_NAME =   gridRoot1.getItemFieldAt( rowIndex , "ITM_NAME")   ; 
	$("#P_CALLBACK_NM7").val('fn_comm_itm_product_callback_grid(dataRow16)');
	$("#P_ITM_FORM").val(  "01"  );
	if( ITM_NAME  != null && ITM_NAME  != ""){
		$("#P_TEXT7").val( ITM_NAME );
		btn_comm_search('7');
	} 
}


// 그리드내의 박스상품 검색 팝업
function boxProductPopup(event)
{	  
	var rowIndex 	= event.rowIndex;
	var columnIndex = event.columnIndex;
	var dataRow 	= gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column 		= dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField 	= column.getDataField();
	 
	$('#comm_pop_wrap7' ).dialog( 'open' );
	gridApp16.resize(); 
	// 선택한 그리드의 VEN_NAME 을 가져온다.
	var BOX_NAME =   gridRoot1.getItemFieldAt( rowIndex , "BOX_NAME")   ; 
	$("#P_CALLBACK_NM7").val('fn_comm_box_product_callback_grid(dataRow16)');
	$("#P_ITM_FORM").val(  "02"  );
	if( BOX_NAME  != null && BOX_NAME  != ""){
		$("#P_TEXT7").val( BOX_NAME );
		btn_comm_search('7');
	} 
} 
//그리드내의 박스상품 검색 팝업 callback function
function fn_comm_box_product_callback_grid(dataRow){
	
	// 박스 상품 중복 금지 - 컬럼내 데이터 중복 방지
	var rowCnt  = gridRoot1.getCollection().getSource() ; 
	for(var i=0 ; i < rowCnt.length ; i++)
	{   if( gridRoot1.getItemFieldAt( i , "BOX_CODE")  == dataRow.ITM_CODE   ) 
		{
			alert("선택하신 박스 상품은 이미 등록 되었습니다.");
			return;
		}
	}
	
	//상품 검색한 BOX_CODE가 낱개ITM_CODE로 이미 등록되어있는지 체크 ajax
	jQuery.ajax({ 
	    url:"/productBoxalready_ch.do",         //  productStoreSearchList   
	    type:"POST",
		datatype:"JSON",
		async:true,
		beforeSend : function(){   
            gridRoot1.addLoadingBar(); 
	    }, 
		data: {P_BOX_CODE:dataRow.ITM_CODE, P_BOX_ITM_FLAG:"A"}, 
		success:function(data){
			if(data[0].ITM_CODE_CNT == "1"){
				alert("선택하신 박스관리코드 ["+dataRow.ITM_CODE+"]는 이미 낱개관리코드로 등록되어있는 코드입니다.");
				return ;
			}else{
				var selectedIndex = dataGrid1.getSelectedIndex(); 
				gridRoot1.setItemFieldAt( dataRow.ITM_NAME  , selectedIndex, "BOX_NAME");
				gridRoot1.setItemFieldAt( dataRow.ITM_CODE  , selectedIndex, "BOX_CODE");
				gridRoot1.setItemFieldAt( dataRow.SCAN_CODE , selectedIndex, "BOX_SCAN_CODE");
				gridRoot1.setItemFieldAt( dataRow.IPSU_QTY  , selectedIndex, "IPSU_QTY");
				gridRoot1.setItemFieldAt( dataRow.BASE_WPRC , selectedIndex, "BOX_WPRC");
				
				var SUR_TAX_VAL = 0; 
				var BASE_WPRC = dataRow.BASE_WPRC ; 
				SUR_TAX_VAL = ( 10 * BASE_WPRC ) / 100 ;  
				gridRoot1.setItemFieldAt( SUR_TAX_VAL , selectedIndex, "BOX_TAX"); 
				gridRoot1.setItemFieldAt( dataRow.BASE_SPRC , selectedIndex, "BOX_SPRC");
			}
		},
		complete : function(data) {
			gridRoot1.removeLoadingBar(); 
	       
	    },
	    error : function(xhr, status, error) {
	    	dataGrid1.setEnabled(true);
 	    	gridRoot1.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}
//그리드내의 낱개상품 검색 팝업 callback function
function fn_comm_itm_product_callback_grid(dataRow){
	//상품 검색한 ITM_CODE가 낱개BOX_CODE로 이미 등록되어있는지 체크 ajax
	jQuery.ajax({ 
	    url:"/productBoxalready_ch.do",         //  productStoreSearchList   
	    type:"POST",
		datatype:"JSON",
		async:true,
		beforeSend : function(){   
            gridRoot1.addLoadingBar(); 
	    }, 
		data: {P_ITM_CODE:dataRow.ITM_CODE, P_BOX_ITM_FLAG:"B"}, 
		success:function(data){
			if(data[0].BOX_CODE_CNT == "1"){
				alert("선택하신 낱개관리코드 ["+dataRow.ITM_CODE+"]는 이미 박스관리코드로 등록되어있는 코드입니다.");
				return ;
			}else{
				var selectedIndex = dataGrid1.getSelectedIndex(); 
				gridRoot1.setItemFieldAt( dataRow.ITM_NAME  , selectedIndex, "ITM_NAME");
				gridRoot1.setItemFieldAt( dataRow.ITM_CODE  , selectedIndex, "ITM_CODE");
				gridRoot1.setItemFieldAt( dataRow.SCAN_CODE , selectedIndex, "ITM_SCAN_CODE");
				gridRoot1.setItemFieldAt( dataRow.BASE_WPRC , selectedIndex, "ITM_WPRC");
				
				var SUR_TAX_VAL = 0; 
				var BASE_WPRC = dataRow.BASE_WPRC ; 
				SUR_TAX_VAL = ( 10 * BASE_WPRC ) / 100 ;
				gridRoot1.setItemFieldAt( SUR_TAX_VAL , selectedIndex, "ITM_TAX"); 
				gridRoot1.setItemFieldAt( dataRow.BASE_SPRC , selectedIndex, "ITM_SPRC");
			}
		},
		complete : function(data) {
			gridRoot1.removeLoadingBar(); 
	       
	    },
	    error : function(xhr, status, error) {
	    	dataGrid1.setEnabled(true);
 	    	gridRoot1.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	 
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
	
//	$('#GRE_GB_NM').val(dataRow.GRE_GB_NM);     // 거래구분 명
//	$('#GRE_GB').val(dataRow.GRE_GB);           // 거래구분  코드 
//	$('#PRGT_RATE').val( dataRow.SALE_RATE);   // 수수료율 
  
}

   

function chgBoxName()
{
	if(    $.trim( $('#BOX_NAME').val()) == ""   )
	{ 
		$('#BOX_CODE').val("");
		$('#BOX_SCAN_CODE').val("");
		$('#BOX_NAME').val("");
	}
}

function chgItmName()
{
	if(   $.trim(  $('#ITM_NAME').val()) == ""   )
	{ 
		$('#ITM_CODE').val("");
		$('#ITM_SCAN_CODE').val("");
		$('#ITM_NAME').val("");
		
	}

}

 


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	  
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