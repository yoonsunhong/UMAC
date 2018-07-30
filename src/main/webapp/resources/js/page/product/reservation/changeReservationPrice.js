/********************************************************
*   설명:  긴급매가변경
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-06-12    권용욱       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/
var saveFlag ="I";
var G_FILE 			 =   "";

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1,	rowIndex1;

var gridData1 =[];

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp1.setData(gridData1);

	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	
 
   /* var layoutCompleteHandler = function(event) {
        dataGrid1 = gridRoot1.getDataGrid();    // 그리드 객체
        dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
    };
    gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler);*/
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
}


//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
/*	var rowIndex = event.rowIndex;                  // 변경된 행번호
    var columnIndex = event.columnIndex;        // 변경된 열번호
    var dataField = event.dataField;                // 변경된 열의 데이터 필드
    var dataRow = gridRoot1.getItemAt(rowIndex); // 변경된 데이터 레코드
    var oldValue = event.value;                     // 변경전 값
    var newValue = event.newValue;                  // 변경후 값
*/    
	
	console.log("itemClickHandler1_event : " + event);
	
	var rowIndex = event.rowIndex;
	console.log("rowIndex : " + rowIndex);
	var columnIndex = event.columnIndex;
	console.log("columnIndex : " + columnIndex);
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	console.log("dataRow1 : " + dataRow1);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	console.log("column : " + column);
	var dataField = column.getDataField();
	console.log("dataField : " + dataField);
	clickData1 = dataRow1[dataField];
	console.log("clickData1 : " + clickData1);
	
	if(clickData1 ="undefined"){		//업로드로 조회될떄 ROW데이터 클릭시 XML
		$("#ADD_ITM_CODE").val(gridRoot1.getItemFieldAt( rowIndex , "ITM_CODE"));
		$("#ADD_SCAN_CODE").val(gridRoot1.getItemFieldAt( rowIndex , "SCAN_CODE"));
		$("#ADD_ITM_NAME").val(gridRoot1.getItemFieldAt( rowIndex , "ITM_NAME"));
		$("#ADD_TAX_GB").val(gridRoot1.getItemFieldAt( rowIndex , "TAX_GB_NAME"));
		$("#ADD_APPL_DT").val(gridRoot1.getItemFieldAt( rowIndex , "APPL_DT"));
		$("#ADD_CHG_SPRC").val(gridRoot1.getItemFieldAt( rowIndex , "CHG_SPRC"));
		$("#ADD_CHG_WPRC").val(gridRoot1.getItemFieldAt( rowIndex , "CHG_WPRC"));
		$("#ADD_CHG_WVAT").val(gridRoot1.getItemFieldAt( rowIndex , "CHG_WVAT"));
		$("#ADD_VEN_NAME").val(gridRoot1.getItemFieldAt( rowIndex , "VEN_NAME"));
		$("#ADD_SPRC").val(gridRoot1.getItemFieldAt( rowIndex , "SPRC"));
		$("#ADD_WPRC").val(gridRoot1.getItemFieldAt( rowIndex , "WPRC"));
		$("#ADD_WVAT").val(gridRoot1.getItemFieldAt( rowIndex , "WVAT"));
		$("#ADD_CLS_NAME").val(gridRoot1.getItemFieldAt( rowIndex , "CLS_NAME"));
		$("#ADD_IEMP_NM").val(gridRoot1.getItemFieldAt( rowIndex , "IEMP_NO"));
		$("#ADD_IDATE").val(gridRoot1.getItemFieldAt( rowIndex , "IDATE"));
		
		$("#ADD_APPL_DT").attr("disabled", true);
		$("#ADD_APPL_DT").datepicker("destroy");
	}else{		//일반 ROW 클릭시
		$("#ADD_ITM_CODE").val(dataRow1.ITM_CODE);
		$("#ADD_SCAN_CODE").val(dataRow1.SCAN_CODE);
		$("#ADD_ITM_NAME").val(dataRow1.ITM_NAME);
		$("#ADD_TAX_GB").val(dataRow1.TAX_GB_NAME);
		$("#ADD_APPL_DT").val(dataRow1.APPL_DT);
		$("#ADD_CHG_SPRC").val(dataRow1.CHG_SPRC);
		$("#ADD_CHG_WPRC").val(dataRow1.CHG_WPRC);
		$("#ADD_CHG_WVAT").val(dataRow1.CHG_WVAT);
		$("#ADD_VEN_NAME").val(dataRow1.VEN_NAME);
		$("#ADD_SPRC").val(dataRow1.SPRC);
		$("#ADD_WPRC").val(dataRow1.WPRC);
		$("#ADD_WVAT").val(dataRow1.WVAT);
		$("#ADD_CLS_NAME").val(dataRow1.CLS_NAME);
		$("#ADD_IEMP_NM").val(dataRow1.IEMP_NAME);
		$("#ADD_IDATE").val(dataRow1.IDATE);
		
		$("#ADD_APPL_DT").attr("disabled", true);
		$("#ADD_APPL_DT").datepicker("destroy");
		
		/*$("#ADD_ITM_CODE").val("");
		$("#ADD_SCAN_CODE").val("");
		$("#ADD_ITM_NAME").val("");
		$("#ADD_TAX_GB").val("");
		$("#ADD_APPL_DT").val("");
		$("#ADD_CHG_SPRC").val("");
		$("#ADD_CHG_WPRC").val("");
		$("#ADD_CHG_WVAT").val("");
		$("#ADD_VEN_NAME").val("");
		$("#ADD_SPRC").val("");
		$("#ADD_WPRC").val("");
		$("#ADD_WVAT").val("");
		$("#ADD_CLS_NAME").val("");
		$("#ADD_IEMP_NM").val("");
		$("#ADD_IDATE").val("");*/
	}
	
}

//----------------------- 그리드 설정 끝 -----------------------


//<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="40" /> 넘버링을 하면 병합오류 발생
//그리드1 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle"  showDataTips="true" >\
			<groupedColumns>\
				<DataGridColumn id="STR_CODE" dataField="STR_CODE" headerText="STR_CODE" visible="false"  />\
				<DataGridColumn id="STR_NAME" dataField="STR_NAME" headerText="' + storNm + '" width="80" textAlign="center"  />\
				<DataGridColumn id="APPL_DT" dataField="APPL_DT" headerText="적용일자" width="100" textAlign="center"  />\
				<DataGridColumn id="SCAN_CODE" dataField="SCAN_CODE" headerText="' + scanCode + '" width="120" textAlign="center"  />\
				<DataGridColumn id="ITM_CODE" dataField="ITM_CODE" headerText="ITM_CODE" visible="false"  />\
				<DataGridColumn id="ITM_NAME" dataField="ITM_NAME" headerText="' + itmName + '" width="200" textAlign="left"  />\
				<DataGridColumn id="TAX_GB" dataField="TAX_GB" headerText="TAX_GB" visible="false"  />\
				<DataGridColumn id="TAX_GB_NAME" dataField="TAX_GB_NAME" headerText="' + taxGb + '" width="80" textAlign="center"  />\
				<DataGridColumn id="WPRC" dataField="WPRC" headerText="' + productWprc + '" width="90" formatter="{numfmt}" textAlign="right"  />\
				<DataGridColumn id="WVAT" dataField="WVAT" headerText="' + baseWVAT + '" width="90" formatter="{numfmt}" textAlign="right"  />\
				<DataGridColumn id="SPRC" dataField="SPRC" headerText="' + productSprc + '" width="90" formatter="{numfmt}" textAlign="right"  />\
				<DataGridColumn id="CHG_WPRC" dataField="CHG_WPRC" headerText="변경원가" width="90"  formatter="{numfmt}" textAlign="right" />\
				<DataGridColumn id="CHG_WVAT" dataField="CHG_WVAT" headerText="변경부가세" width="90"  formatter="{numfmt}" textAlign="right"  />\
				<DataGridColumn id="CHG_SPRC" dataField="CHG_SPRC" headerText="변경매가" width="90"  formatter="{numfmt}" textAlign="right"  />\
				<DataGridColumn id="VEN_CODE" dataField="VEN_CODE" headerText="VEN_CODE" visible="false"  />\
				<DataGridColumn id="VEN_NAME" dataField="VEN_NAME" headerText="' + venName + '" width="80" textAlign="center" />\
				<DataGridColumn id="CLS_CODE" dataField="CLS_CODE" headerText="CLS_CODE" visible="false"  />\
				<DataGridColumn id="CLS_NAME" dataField="CLS_NAME" headerText="' + subCategoryName + '" widh="80" textAlign="center"  />\
				<DataGridColumn id="IEMP_NO" dataField="IEMP_NO" headerText="IEMP_NO" visible="false"  />\
				<DataGridColumn id="IEMP_NAME" dataField="IEMP_NAME" headerText="' + inputName + '" width="80" textAlign="center"  />\
				<DataGridColumn id="IDATE" dataField="IDATE" headerText="' + inputDate + '" textAlign="center"  />\
				<DataGridColumn id="UEMP_NO" dataField="UEMP_NO" headerText="UEMP_NO" visible="false"  />\
				<DataGridColumn id="UEMP_NAME" dataField="UEMP_NAME" headerText="UEMP_NAME" visible="false"  />\
				<DataGridColumn id="UDATE" dataField="UDATE" headerText="UDATE" visible="false"  />\
			</groupedColumns>\
			<dataProvider>\
				<!-- 그리드의 자료를 일반 dataProvider가 아닌 별도의 컴포넌트에 입력해야 할 경우 아래와 같이 source에 $gridData를 넣어줍니다 -->\
				<SpanArrayCollection source="{$gridData}"/>\
			</dataProvider>\
	</DataGrid>\
</rMateGrid>';

// ----------------------- 그리드 설정 끝 -------------------------------------


//########################################################
//###	8. init ( 시작 )   							   												###
//########################################################

function btn_download(){
	location.href="/resources/js/page/product/reservation/SAMPLE.xlsx";
}

function  btn_load()
{  
	if(  $('#excelFile' ).val() == ""  )
	{   alert("예약매가변경 엑셀파일을 선택 하세요.");
		$('#excelFile' ).focus();
		return;
	} 
	 
	/*if( $("#SESSION_ROLE_ID").val()    == "ROLE009" || $("#SESSION_ROLE_ID").val()    == "ROLE010" )  // 바이어(ROLE009) 
	{
		if(  $('#ITM_GB_UPLOAD' ).val() == ""  )
		{   alert("업로드구분을 선택 하세요.");
			$('#ITM_GB_UPLOAD' ).focus();
			return;
		}  
		if(  $('#ITM_GB_UPLOAD' ).val() == "9" &&  $('#CENTA_CODE' ).val() == ""  )
		{   alert("물류센터를 선택 하세요.");
			$('#CENTA_CODE' ).focus();
			return;
		} 
	}*/
	 
	
	/*if(! chk_order_day() )
	{ return;}*/
	 
	loadExcelFile(  G_FILE  ); 
	
	//EXCEL_LOAD_BIT = "Y";
	
	 
	
	
}

function loadExcelFile(e){
	
	var files = e.target.files;
	var i, f;
	
	for (i = 0, f = files[i]; i != files.length; ++i) {
		console.log("------------------------------------");
		console.log("first for start");
		console.log("------------------------------------");
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
        	console.log("------------------------------------");
        	console.log("reader.onload");
        	console.log("------------------------------------");
        	var data = e.target.result; 
            var result = 0;
//            var workbook = XLSX.read(data, { type: 'binary' });
            var arr = fixdata(data);
            var workbook = X.read(btoa(arr), {type: 'base64'});
            var sheet_cnt = 0;
            var sheet_name_list = workbook.SheetNames; 
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
               
         	   if(sheet_cnt == 0) // 첫번째 시트만 읽는다.
	               {   //Convert the cell value to Json
	                   var roa = X.utils.sheet_to_json( workbook.Sheets[y] );  
	                   if (roa.length > 0) {
	                       result = roa;
	                       console.log("---------------------------------------------------------------------------------------------------------");
	                       console.log("excel_data : " + JSON.stringify(result));
	                       console.log("---------------------------------------------------------------------------------------------------------");
	                   }  
                 } 
                 sheet_cnt = sheet_cnt + 1; 
            });
            //Get the first column irst cell value 
            if( typeof result.length == 'undefined' )   
            {   alert("업로드한 엑셀에 상품데이터가 존재 하지 않습니다.");
         	   return; 
            }
            
            //엑셀 최상단 컬럼명 체크
            if( typeof result[0].ADD_APPL_DT == 'undefined'  || typeof result[0].ADD_SCAN_CODE == 'undefined' || typeof result[0].ADD_CHG_WPRC == 'undefined' || typeof result[0].ADD_CHG_WVAT == 'undefined' || typeof result[0].ADD_CHG_SPRC == 'undefined')
            { 	alert("[ 엑셀양식 오류 ]\n업로드 엑셀의 첫 행의 명칭순서는  ADD_APPL_DT, ADD_SCAN_CODE, ADD_CHG_WPRC, ADD_CHG_WVAT,ADD_CHG_SPRC   이어야 합니다.\n첫행을   ADD_APPL_DT, ADD_SCAN_CODE, ADD_CHG_WPRC, ADD_CHG_WVAT,ADD_CHG_SPRC  로 바꾸고 업로드 하거나, 양식을 다운로드 하여 사용하세요 ");
     	   		return;  
            }
            
            
            // DB 로 던지기 위해 XML 로 변경 하는 작업 
    	    var excelLoadProduct = ""; 
    	    var num_check  		 =/^[0-9]*$/; 
    	    var double_check		=/^[+-]?\d*(\.?\d*)$/;
    	    var year_check		=/^(20\d{2})$/;					//연도체크... 일단 2099년도까지만..
    	    var month_check = /^(0[1-9]|1[0-2])*$/;			//월체크 01월~12월
    	    var day_check = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])*$/;		//일체크 01일~31일
    	    var now = new Date();
    	    var now_format = now.format("yyyy")+now.format("MM")+now.format("dd");
    	    var ADD_APPL_DT	= "";
    	    var ADD_SCAN_CODE	= "";
    	    var ADD_CHG_WPRC		= "";
    	    var ADD_CHG_WVAT	= "";
    	    var ADD_CHG_SPRC	= "";
    		for( var i = 0 ;  i < result.length ; i++ ) 
    		{
    			
    			//각 행마다 벨리데이션 체크
    			//연
    			
		    		   ADD_APPL_DT = result[i].ADD_APPL_DT.toString();
		    		   ADD_APPL_DT = ADD_APPL_DT.trim(); 
    					if (!num_check.test(ADD_APPL_DT)){
    						alert(i+2 + "번째 라인 날짜는 숫자가 아닙니다.\nex)20170101");
    						return;
    					}else if(ADD_APPL_DT.length != 8){
    						alert(i+2 + "번째 라인 날짜는 8자리를 입력해주세요.\nex)20170101");
    						return;
    					}else if(now_format >= ADD_APPL_DT){
    						//console.log("now_data : " + now_format + "/////  add_appl_dt : " + ADD_APPL_DT);
    						alert(i+2+ "번째 라인 적용일자는 금일 이후 일자만 입력이 가능합니다.");
    						return;
    					}else if(!year_check.test(ADD_APPL_DT.substr(0,4))){		//년도 체크
    						//console.log("ADD_APPL_DT.substr(0,4) : " + ADD_APPL_DT.substr(0,4));
    						alert(i+2+ "번째 라인 날짜의 연도을 확인해주세요.");
    						return;
    					}else if(!month_check.test(ADD_APPL_DT.substr(4,2))){		//월체크
    						//console.log("ADD_APPL_DT.substr(4,2) : " + ADD_APPL_DT.substr(4,2));
    						//console.log("ADD_APPL_DT : " + ADD_APPL_DT);
    						alert(i+2+ "번째 라인 날짜의 월을 확인해주세요.");
    						return;
    					}else if(!day_check.test(ADD_APPL_DT.substr(6,2))){			//일체크
    						//console.log("ADD_APPL_DT.substr(6,2) : " + ADD_APPL_DT.substr(6,2));
    						//console.log("ADD_APPL_DT : " + ADD_APPL_DT);
    						alert(i+2+ "번째 라인 날짜의 일을 확인해주세요.");
    						return;
    					}
    					
    					ADD_SCAN_CODE = result[i].ADD_SCAN_CODE.toString();
    					ADD_SCAN_CODE = ADD_SCAN_CODE.trim();
    					if(!num_check.test(ADD_SCAN_CODE)){
    						alert(i+2 + "번째 라인 스캔코드는 숫자가 아닙니다.\nex)8801043019392");
    						return;
    					}else if(ADD_SCAN_CODE.length != 13){
    						alert(i+2 + "번째 라인 스캔코드는 13자리를 입력해주세요.\nex)8801043019392");
    						return;
    					}
    					
    					ADD_CHG_WPRC = result[i].ADD_CHG_WPRC.toString();
    					ADD_CHG_WPRC = ADD_CHG_WPRC.trim();
    					ADD_CHG_WPRC = ADD_CHG_WPRC.replace(',', '');
    					
    					if (!double_check.test(ADD_CHG_WPRC)){
    						alert(i+2 + "번째 라인 변경원가는 숫자가 아닙니다.\nex)7,000");
    						return;
    					}
    					
    					ADD_CHG_WVAT = result[i].ADD_CHG_WVAT.toString();
    					ADD_CHG_WVAT = ADD_CHG_WVAT.trim();
    					ADD_CHG_WVAT = ADD_CHG_WVAT.replace(',', '');
    					
    					if (!double_check.test(ADD_CHG_WVAT)){
    						alert(i+2 + "번째 라인 변경원가부가세는 숫자가 아닙니다.\nex)7,000");
    						return;
    					}
    					
    					ADD_CHG_SPRC = result[i].ADD_CHG_SPRC.toString();
    					ADD_CHG_SPRC = ADD_CHG_SPRC.trim();
    					ADD_CHG_SPRC = ADD_CHG_SPRC.replace(',', '');
    					
    					if (!double_check.test(ADD_CHG_SPRC)){
    						alert(i+2 + "번째 라인 변경매가는 숫자가 아닙니다.\nex)7,000");
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
                		 var	STR_CODE	  = xmlDoc.createElement('STR_CODE'); 
                		 var	ADD_APPL_DT	= xmlDoc.createElement('ADD_APPL_DT'); 
                		 var	ADD_SCAN_CODE	= xmlDoc.createElement('ADD_SCAN_CODE');
                		 var	ADD_CHG_WPRC	= xmlDoc.createElement('ADD_CHG_WPRC');
                		 var	ADD_CHG_WVAT	= xmlDoc.createElement('ADD_CHG_WVAT');
                		 var	ADD_CHG_SPRC	= xmlDoc.createElement('ADD_CHG_SPRC');
            			 
            			 STR_CODE.appendChild(  xmlDoc.createTextNode(  $("#ADD_STR_CODE").val()    )	); 
            			 ADD_APPL_DT.appendChild(  xmlDoc.createTextNode(  result[i].ADD_APPL_DT      )	); 
            			 ADD_SCAN_CODE.appendChild(  xmlDoc.createTextNode(  result[i].ADD_SCAN_CODE      )	); 
            			 ADD_CHG_WPRC.appendChild(  xmlDoc.createTextNode(  result[i].ADD_CHG_WPRC      )	); 
            			 ADD_CHG_WVAT.appendChild(  xmlDoc.createTextNode(  result[i].ADD_CHG_WVAT      )	); 
            			 ADD_CHG_SPRC.appendChild(  xmlDoc.createTextNode(  result[i].ADD_CHG_SPRC      )	); 
            			 
            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE );
            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ADD_APPL_DT );
            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ADD_SCAN_CODE );
            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ADD_CHG_WPRC );
            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ADD_CHG_WVAT );
            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ADD_CHG_SPRC );
            			 
            			 excelLoadProduct = excelLoadProduct + getXmlString(   xmlDoc   );
    		}
    		excelLoadProduct  =  "<GRIDLIST>"+ excelLoadProduct +"</GRIDLIST>" ; 
    		
    		
        	jQuery.ajax({ 
		    	    url:"/changeReserExcel_map.do",            
		    	    type:"POST",
		    		datatype:"xml",
		    		async:false,
		    		beforeSend : function(){ 
		                gridRoot1.addLoadingBar(); 
		    	    }, 
		    		data: {     "STR_CODE"    : $("#STR_CODE").val()
		    		//,           "ORD_DT"      :	$("#ORD_DT").val().replace(/-/g, "")
		    		,			"EXCEL_DATA"  : excelLoadProduct   },
		    		success:function(data){   
		    			
		    			console.log("data : " + JSON.stringify(data));
		    			if(data.RETURN_CODE > 0){
		    				alert(data.RETURN_MSG + "\n스캔코드 : " +data.RETURN_CODE );
		    			}else{
		    				//그리드 XML로 변경
		                	/*gridApp1.setDataType("xml");
		                    gridApp1.setLayout(layoutStr1);*/
		                    
		    				//그리드1 초기화 
	            			gridRoot1.removeAll( ); 
	            			
	            			/*if(data.list[0].size() == 0) 
	            			{  
	            				dataGrid1.setEnabled(true);
	            		    	gridRoot1.removeLoadingBar();
	            				return;
	            			}*/
	            			gridRoot1.removeLoadingBar();
	            			
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
	            				var CORP_CODE 				= xmlDoc.createElement("CORP_CODE");
	            				var STR_CODE 				= xmlDoc.createElement("STR_CODE");
	            				var ITM_CODE 				= xmlDoc.createElement("ITM_CODE");
	            				var TAX_GB 				= xmlDoc.createElement("TAX_GB");
	            				var IEMP_NO 				= xmlDoc.createElement("IEMP_NO");
	            				var UEMP_NO 				= xmlDoc.createElement("UEMP_NO");
	            				var UEMP_NAME 				= xmlDoc.createElement("UEMP_NAME");
	            				var UDATE 				= xmlDoc.createElement("UDATE");
	            				var VEN_CODE 				= xmlDoc.createElement("VEN_CODE");
	            				var CLS_CODE 				= xmlDoc.createElement("CLS_CODE");
	            				
	            				
	            				var STR_NAME 				= xmlDoc.createElement("STR_NAME");
	            				var APPL_DT 					= xmlDoc.createElement("APPL_DT");
	            				var SCAN_CODE 				= xmlDoc.createElement("SCAN_CODE");
	            				var ITM_NAME 				= xmlDoc.createElement("ITM_NAME");
	            				var TAX_GB_NAME 			= xmlDoc.createElement("TAX_GB_NAME");
	            				var WPRC 						= xmlDoc.createElement("WPRC");
	            				var WVAT 						= xmlDoc.createElement("WVAT");
	            				var SPRC 						= xmlDoc.createElement("SPRC");
	            				var CHG_WPRC 				= xmlDoc.createElement("CHG_WPRC");
	            				var CHG_WVAT 				= xmlDoc.createElement("CHG_WVAT");
	            				var CHG_SPRC 				= xmlDoc.createElement("CHG_SPRC");
	            				var VEN_NAME 				= xmlDoc.createElement("VEN_NAME");
	            				var CLS_NAME 				= xmlDoc.createElement("CLS_NAME");
	            				var IEMP_NAME 				= xmlDoc.createElement("IEMP_NAME");
	            				var IDATE 						= xmlDoc.createElement("IDATE");
	            				
	            				
	            				//
	            				CORP_CODE.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].CORP_CODE			));
	            				STR_CODE.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].STR_CODE			));
	            				ITM_CODE.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].ITM_CODE			));
	            				TAX_GB.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].TAX_GB			));
	            				IEMP_NO.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].IEMP_NO			));
	            				
	            				UEMP_NO.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].UEMP_NO			));
	            				UEMP_NAME.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].UEMP_NAME			));
	            				UDATE.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].UDATE			));
	            				VEN_CODE.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].VEN_CODE			));
	            				CLS_CODE.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].CLS_CODE			));
	            				 
	            				STR_NAME.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].STR_NAME			));
	            				APPL_DT.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].APPL_DT			));
	            				SCAN_CODE.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].SCAN_CODE			));
	            				ITM_NAME.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].ITM_NAME			));
	            				TAX_GB_NAME.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].TAX_GB_NAME			));
	            				
	            				WPRC.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].WPRC			));
	            				WVAT.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].WVAT			));
	            				SPRC.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].SPRC			));
	            				CHG_WPRC.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].CHG_WPRC			));
	            				CHG_WVAT.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].CHG_WVAT			));
	            				
	            				CHG_SPRC.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].CHG_SPRC			));
	            				VEN_NAME.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].VEN_NAME			));
	            				CLS_NAME.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].CLS_NAME			));
	            				IEMP_NAME.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].IEMP_NAME			));
	            				IDATE.appendChild(				xmlDoc.createTextNode( 	data.CUR[i].IDATE			));
	            				
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CORP_CODE);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IEMP_NO);
	            				
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UEMP_NO);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UEMP_NAME);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UDATE);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_CODE);
	            				
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APPL_DT);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB_NAME);
	            				
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WPRC);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WVAT);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CHG_WPRC);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CHG_WVAT);
	            				
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CHG_SPRC);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IEMP_NAME);
	            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IDATE);
	            				
	            				
	            				
	            				gridRoot1.addItemAt(  xmlDoc  , -1 , false);
	            				
	            			}
	            			
		    				alert("예약매가변경_엑셀_업로드가 완료되었습니다.");
		    				gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
		    			}
		    		},
		    	    complete : function(data) { 
		   	    	 
		   	    	 // PO_ORDER_UPLOAD 에 저장
		   	    	 // btn_save 함수 안에는 오류시 리턴해버리는 코드가 들어있어서 위에서 에러가 나도  저장이 안된다. 
		   	    	 // 하지만 유맥의 요청으로 오류제거후 저장되게 바꿈
		   	          //btn_save();
		    	    	gridRoot1.removeLoadingBar();
		    	    	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
		    	    	
		   	    	
		   	    },
		   	    error : function(xhr, status, error) {
		   	    	dataGrid1.setEnabled(true);
		   	    	gridRoot1.removeLoadingBar();
		   	    	CommonJs.alertErrorStatus(xhr.status, error);
		   	    }
		   	});
	};
	 reader.readAsArrayBuffer(f);
}
}

function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

$(document).ready(function(){
	
	init();
	
	// 내용이 다른 같은 이름의 엑셀을 연속  올리면 file 의 change 에서 인식 못하므로 "엑셀 로드" 버튼을 만들고, G_FILE이라는 전역변수를 사용했음 
	$('#excelFile').change(function (e) {
		G_FILE  = e;    
	});
	
	/**검색조건 날짜 체크*/
	 $(".datepicker1").datepicker({ onSelect: function(dateText){ 	 	 
			 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			 if($("#P_APPL_STR_DT").val()  >  $("#P_APPL_END_DT").val()){   
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_APPL_STR_DT").val(CUR_DT);
				return;
			}	 
	 	}, 	
	 	showMonthAfterYear:true 
	});
		 
	$(".datepicker2").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if($("#P_APPL_STR_DT").val()  >  $("#P_APPL_END_DT").val()){
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_APPL_END_DT").val(CUR_DT);
				return;
			}	 
	 	}, 	
	 	showMonthAfterYear:true 
	});
	
	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().before(0, 0,1).getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)

	$("#P_APPL_STR_DT").val(beforeDate);
	$("#P_APPL_END_DT").val(lsToDate);
	
	
	//점포명 가지고오기
	getStoreCode("P_STR_NAME");
	//숫자만 입력
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
	$('#ADD_SPRC').number( true);
	$('#ADD_WPRC').number( true);
	$('#ADD_WVAT').number( true);
	$('#ADD_CHG_SPRC, #ADD_CHG_WPRC, #ADD_CHG_WVAT').number( true);
	$("#ADD_CHG_SPRC").on('blur', function(){
		
		if($("#ADD_WPRC").val() != "" && $("#ADD_WPRC").val() != undefined && $("#ADD_WPRC").val() != null &&
				$("#ADD_CHG_SPRC").val() != "0" && $("#ADD_CHG_SPRC").val() != ""){
			var pWPRC = Number($("#ADD_WPRC").val().replace(/,/g, ''));
			var pCHG_SPRC = Number($("#ADD_CHG_SPRC").val().replace(/,/g, ''));
			var pBENEFIT = (pCHG_SPRC-pWPRC)/pCHG_SPRC*100;
			$("#ADD_BENEFIT").val(pBENEFIT.toFixed(2));
		}
	});
	
	$("#ADD_APPL_DT").on('change', function(){
		var IS_TODAY = lsToDate;
		IS_TODAY = IS_TODAY.replace(/-/gi, '');
		var ADD_APPL_DT = $("#ADD_APPL_DT").val().replace(/-/gi, '');
		
		if(ADD_APPL_DT <= IS_TODAY){
			alert("적용일자는 금일 이후 일자만 입력이 가능합니다.");
			$("#ADD_APPL_DT").val("");
		}
	});
	
	//조회조건절의 상품에서 엔터시 상품검색되게....
	$("input[name=P_ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_product_search();
        } 
	});
	$("input[name=ADD_ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_add_product_search();
        } 
	});
	
});


//점포명 변경 EVENT
function fnStrChange(pageLoadFlag){
	
	//pageLoadFlag - F: 페이지 첫 로딩시 호출일 경우
	if(pageLoadFlag != "F"){
		//그리드1 데이터 초기화 , 저장플래그 I 
		gridRoot1.removeAll();
	}
	
	clearData();
	saveFlag ="I";
			 
	$("#P_STR_CODE").val($("#P_STR_NAME").val());
	$("#ADD_STR_CODE").val($("#P_STR_NAME").val());
	$("#ADD_STR_NAME").val($("#P_STR_NAME option:selected").text());
}


function init() {
	
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	
	$('#comm_pop_wrap6' ).dialog( 'open' );
	$("#P_TEXT6").val("");
	gridApp15.setData([]);
	gridApp15.resize();
	fnGetStrName();
	$("#P_CALLBACK_NM6").val('fn_comm_store_callback(dataRow15)');
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT6").val($("#P_ITM_NAME").val());
		btn_comm_search('6');
	}else{
		//검색된 데이터가 없으면 검색조건에 포커스 이동
		fnDelay();
	}
} 

//(상품검색) 팝업 호출 function
function btn_add_product_search(){
	
	$('#comm_pop_wrap6' ).dialog( 'open' );
	$("#P_TEXT6").val("");
	gridApp15.setData([]);
	gridApp15.resize();
	fnGetStrName();
	
	$("#P_CALLBACK_NM6").val('fn_add_product_callback(dataRow15)');
	
	if($("#ADD_ITM_NAME").val() != null && $("#ADD_ITM_NAME").val() != ""){
		$("#P_TEXT6").val($("#ADD_ITM_NAME").val());
		btn_comm_search('6');
		
	}else{
		//검색된 데이터가 없으면 검색조건에 포커스 이동
		fnDelay();
	}
	
} 

var fnVal="";
function fnDelay() {
	fnVal = setTimeout(focusGo, 300);
}

function focusGo(){
	//alert(111);
	$("#P_TEXT6").focus();
}

//(점별상품검색) 팝업 callback function
function fn_comm_store_callback( dataRow15 ){
	$('#P_ITM_NAME' ).val(dataRow15.ITM_NAME);				// 상품명
	$('#P_ITM_CODE' ).val(dataRow15.ITM_CODE);				// 상품코드
}

//(점별상품검색) 팝업 callback function
function fn_add_product_callback( dataRow15 ){
	
	saveFlag ="I";
	
	$('#ADD_ITM_NAME' ).val(dataRow15.ITM_NAME);				// 상품명
	$('#ADD_ITM_CODE' ).val(dataRow15.ITM_CODE);				// 상품코드
	$('#ADD_SCAN_CODE' ).val(dataRow15.SCAN_CODE);			// 스캔코드
	
	//팝업닫기
	$("#comm_pop_wrap6").dialog( "close" );
	$('#ADD_CHG_SPRC' ).val('');				
	$("#ADD_CHG_SPRC").focus();
	
	var loadData = $("#in_frame").serializeAllObject();
	
	//긴급매가변경등록 체크(동일날짜, 동일점, 동일상품이 2건 등록 안되게)
	jQuery.ajax({
	    type:"POST",
	    url:"/checkChangePriceInfo.do",
	    dataType:"JSON",  
	    data:loadData,
	    async:false,
	    success : function(data) {
	    	//alert(data[0].CNT);
	    	if(data[0].CNT != 0){
	    		//동일한 상품을 적용기간내에 등록할수 없습니다.
	    		alert(promMessg16);
	    		clearData();
	    		$("#ADD_ITM_NAME").focus();
	    		return;
	    	}else{
	    		$("#ADD_TAX_GB").val(dataRow15.TAX_GB);
	    		$("#ADD_CLS_NAME").val(dataRow15.CLS_NAME);
	    		$("#ADD_VEN_NAME").val(dataRow15.VEN_NAME);
	    		$("#ADD_SPRC").val(dataRow15.SPRC);
	    		$("#ADD_CHG_SPRC").val('');
	    		$("#ADD_IEMP_NM").val('');
	    		$("#ADD_IDATE").val('');
	    		$("#ADD_UEMP_NM").val('');
	    		$("#ADD_UDATE").val('');
	    		$("#ADD_WPRC").val(dataRow15.WPRC);
	    		$("#ADD_WVAT").val(dataRow15.WVAT);
	    		
	    	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


 
//########################################################
//###   상단 버튼 구현																				###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-220);

	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-220);	
	});
});



//저장
function btn_save(){
	//긴급매가변경등록/수정
	var loadData = $("#in_frame").serializeAllObject();
	
	if(loadData.ADD_CHG_SPRC == "" || loadData.ADD_CHG_SPRC == 0){
		//변경매가는 필수입력 입니다.
		alert(emergencySalesMent2);
		$("#ADD_CHG_SPRC").focus();
		return;
	}
	if(isNaN(Number(loadData.ADD_CHG_SPRC ))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			$("#ADD_CHG_SPRC").val('');
			$("#ADD_CHG_SPRC").focus();
			return;
	}
	if($("#ADD_APPL_DT").val() == "" || $("#ADD_APPL_DT").val() == undefined){
		alert("적용일자는 필수 입력항목 입니다.");
		return;
	}
	
	if($("#ADD_TAX_GB").val() == "과세"){
		var WPRC = Number($("#ADD_CHG_WPRC").val());
		var WVAT = Number($("#ADD_CHG_WVAT").val());
		
		var WVAT_MIN = WPRC * 0.1 -10;
		var WVAT_SUM = WPRC * 0.1 + 10;
		
		if(WVAT > WVAT_SUM || WVAT < WVAT_MIN){
			alert("부가세가 잘 못 입력되었습니다.");
			return;
		}
		
	}else{
		var WVAT = Number($("#ADD_CHG_WVAT").val());
		if(WVAT > 0){
			alert("면세의 경우 부가세가 0원보다 클 수 없습니다.");
			return;
		}
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	//긴급매가변경 저장
	jQuery.ajax({
	    type:"POST",
	    url: '/registChangeReservationPrice.do',
	    dataType:"JSON",  
	    data:loadData,
	    async:false,
	    success : function(data) {
	    	btn_search();
	    	
	    	alert(msgSave);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	
}

//신규
function btn_new(){
	//데이터 초기화
	saveFlag ="I";
	clearData();
	
	$('#excelFile').val('');
	$("#P_ITM_NAME").val('');
	$("#P_ITM_CODE").val('');
	
	$("#ADD_ITM_NAME").focus();
}

//조회
function btn_search(){
	var loadData 		= $("#top_search").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_APPL_STR_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_APPL_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	$('#excelFile').val("");
	saveFlag ="I";
	
	loadData.P_APPL_STR_DT 	= loadData.P_APPL_STR_DT.replace(/-/gi, '');
	loadData.P_APPL_END_DT 	= loadData.P_APPL_END_DT.replace(/-/gi, '');
	loadData.P_STR_CODE 	= $("#P_STR_CODE").val();
	
	//유효성검사
	if(loadData.P_APPL_STR_DT  >  loadData.P_APPL_END_DT){
		//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
		alert(msgDateValidation);
		$("#P_APPL_STR_DT").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_APPL_STR_DT").focus();
		return;
	}
	
	//긴급매가변경조회
	jQuery.ajax({
	    type:"POST",
	    url:"/selectChangeReservationPrice.do",
	    dataType:"JSON",  
	    data:loadData,
	    async:false,
	    success : function(data) {
	    	gridApp1.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//등록초기화
	clearData();
	
}

function btnExcelDown(){
	var loadData 		= $("#top_search").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_APPL_STR_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_APPL_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	
	loadData.P_APPL_STR_DT 	= loadData.P_APPL_STR_DT.replace(/-/gi, '');
	loadData.P_APPL_END_DT 	= loadData.P_APPL_END_DT.replace(/-/gi, '');
	loadData.P_STR_CODE 	= $("#P_STR_CODE").val();
	
	
	//유효성검사
	if(loadData.P_APPL_STR_DT  >  loadData.P_APPL_END_DT){
		//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
		alert(msgDateValidation);
		$("#P_APPL_STR_DT").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_APPL_STR_DT").focus();
		return;
	}
	
	$.download('/excelChangeReservationPrice.do',"P_STR_CODE="+loadData.P_STR_CODE
												 +"&P_APPL_STR_DT="+loadData.P_APPL_STR_DT
												 +"&P_APPL_END_DT="+loadData.P_APPL_END_DT
												 +"&P_ITM_CODE="+loadData.P_ITM_CODE
			 ,"post" );
}

//데이터 클리어
function clearData(){
	
	//$("#ADD_STR_CODE").val('');
	//$("#ADD_STR_NAME").val('');
	$("#ADD_ITM_CODE").val('');
	$("#ADD_SCAN_CODE").val('');
	$("#ADD_ITM_NAME").val('');
	$("#ADD_TAX_GB").val('');
	$("#ADD_CLS_NAME").val('');
	$("#ADD_VEN_NAME").val('');
	$("#ADD_SPRC").val('');
	$("#ADD_CHG_SPRC").val('');
	$("#ADD_CHG_WPRC").val('');
	$("#ADD_CHG_WVAT").val('');
	$("#ADD_IEMP_NM").val('');
	$("#ADD_IDATE").val('');
	$("#ADD_APPL_DT").val('');
	
	$("#ADD_APPL_DT").attr("disabled", false);
	$("#ADD_APPL_DT").datepicker();
	
	//지태수 이사님 요청으로 수정일자 쪽 제거 KYW 2017-05-23
	//$("#ADD_UEMP_NM").val('');
	//$("#ADD_UDATE").val('');
	$("#ADD_WPRC").val("");
	$("#ADD_BENEFIT").val("");
}

//그리드 로딩바  보이기
function showLoadingBar() {
    gridRoot1.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar() {
    gridRoot1.removeLoadingBar();
}



//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################



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



//엑셀 export (엑셀다운로드 그리드기능 이용)
//excelExportSave(url:String, async:Boolean);
//url : 업로드할 서버의 url, 기본값 null
//async : 비동기 모드로 수행여부, 기본값 false
function ExcelDownload1() {
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	
	dataGrid1.exportFileName = "예약매가변경_"+$("#P_STR_NAME option:selected").text()+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
	
};
