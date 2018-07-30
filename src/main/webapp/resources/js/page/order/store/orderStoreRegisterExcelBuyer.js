/********************************************************
 * 설명: 엑셀발주 (바이어)  관리
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
var G_FILE 			 =   "";
var EXCEL_LOAD_BIT   =   "N";
var excelBarCodeErr  =   "";
var startStrColNum   =   16;  // 점의 컬럼이 시작되는 index ( 점포 컬럼의 앞쪽 컬럼의 갯수가 변동되면 여기는 바꾸어준다. 이때 점포컬럼 앞쪽의 컬럼들은 visible 이 true 인것만 해당 된다.)
var allStrColNum     =   0 ;  // 화면에 뿌려줄 전체 STR_CODE 수 
var params = "?reportMode=HTML"; // AIViewer 파라미터

$(document).ready(function(){
	
	// 내용이 다른 같은 이름의 엑셀을 연속  올리면 file 의 change 에서 인식 못하므로 "엑셀 로드" 버튼을 만들고, G_FILE이라는 전역변수를 사용했음 
	$('#excelFile').change(function (e) {
		G_FILE  = e;    
	});
	  
	
	// 수량  - 숫자만 입력받기
	$("#ORD_QTY").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
	
	
	getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	); 
	
	// CD_STORE 에서 UPTAE_FLAG 가 3인것(물류) 만 가져오기
	getStoreCodeFlag("CENTA_CODE","3");
	
	getCommonCodeSelectBoxList("REG_PATH"  ,   "REG_PATH"	);   
//	$("#REG_PATH    option[value!='2']").remove(); // 바이어만 선택되게 한다.   ->  엑셀 다운로드 한것과 조회된것이 같이 보이게 하기 위해서 주석 처리한다. 박부장님 요청
	 
	 
	
	
	$("#CFM_YN").val("N");   // 미처리 인것 선택  
	
	getStoreCode("STR_CODE");
 
	getCateCodeSelectBoxList("LRG_CODE"   , "1" ,  ""   );    // 대 분류     
	
	init();
	 
	// 점포 로그인시 점포 select를 해당 점포만 나오게 한다. 바이어인 경우에는 다나오게 한다.
	// 점 일때는 "엑셀 양식다운로드"(btn_excel_form) 버튼이   나오고,
	// 바이어 일때는 "발주데이터 엑셀 다운로드"(btn_excel_fresh) 버튼이 나오게 해야 한다.	
	// BUYER_CONTENTS 는 조건 절에서 로그인별 분기 처리
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009"  ||  $("#SESSION_ROLE_ID").val()    == "ROLE010" ||  $("#SESSION_ROLE_ID").val()    == "ROLE014")  // 바이어(ROLE009) 로그인시 다보여줌     , 물류센터 ROLE010
	{  
		$('#btn_excel_fresh').show(); 
		$('#btn_excel_form').hide();   
	     
//		$('#REG_PATH').val("2");     // ->  엑셀 다운로드 한것과 조회된것이 같이 보이게 하기 위해서 주석 처리한다. 박부장님 요청
		  
	}  
	 
  
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	 
	
});

  



// 점포별 수량과 매입처 저장  
// 생식의 수량 수정시( 0 에서 0이상의 숫자 ) 에 PO_ORDER_UPLOAD 에 insert 하기
function btn_qty_save()
{ 
	var changedData = gridRoot1.getChangedData();
	if (changedData.length == 0)
	{	
		alert("변경된 데이터가 없습니다");
	} else {
		 
		for (var i = 0; i < changedData.length; i++)     
		{	  
			var strCodeArray     = null;
			var STORENAME_CNT    = 1 ;
			for( var k = startStrColNum ;  k < startStrColNum + allStrColNum ; k++ ) 
			{  
				    strCodeArray = columns[k].getHeaderText().split("<br>");
				     
					jQuery.ajax({ 
						    url:"/orderUploadUpdateBuyer.do",         // orderUploadUpdate.do 
						    type:"POST", 
						      
							data: {      "ORD_DT"     	: gridRoot1.getItemFieldAt( changedData[i].idx , "ORD_DT")
							,	 		 "STR_CODE"   	: strCodeArray[1] 
							,            "REG_PATH"   	: gridRoot1.getItemFieldAt( changedData[i].idx , "REG_PATH")
							,            "SEQ"        	: gridRoot1.getItemFieldAt( changedData[i].idx , "SEQ") 
							,            "SCAN_CODE"  	: gridRoot1.getItemFieldAt( changedData[i].idx , "SCAN_CODE")
							,			 "ORD_QTY"    	: gridRoot1.getItemFieldAt( changedData[i].idx , "STORENAME"+STORENAME_CNT)
							,            "VEN_CODE"   	: gridRoot1.getItemFieldAt( changedData[i].idx , "VEN_CODE")
							,            "VEN_CODE_OLD" : gridRoot1.getItemFieldAt( changedData[i].idx , "VEN_CODE_OLD")
							,            "PUR_WPRC"		: gridRoot1.getItemFieldAt( changedData[i].idx , "PUR_WPRC")
							,            "PUR_WVAT" 	: gridRoot1.getItemFieldAt( changedData[i].idx , "PUR_WVAT")
							,            "ITM_GB" 	    : gridRoot1.getItemFieldAt( changedData[i].idx , "ITM_GB")
							
//							,            "PUR_GB" 	: gridRoot1.getItemFieldAt( changedData[i].idx , "PUR_WVAT")
						     
							}, 
						    beforeSend : function(){  
						    }, 
						    success:function(data){    
						    },
						    complete : function(data) { 
						    },
						    error : function(xhr, status, error) { 
						    	CommonJs.alertErrorStatus(xhr.status, error);
						    }
					 });
					 STORENAME_CNT = STORENAME_CNT + 1;
			 
			}
			  
		}
		 
		alert("데이터가 수정 되었습니다.");
		
	}
	
}


// 바이어  생식 및 비생식 업로드
function buyer_upload(e)
{ 
	// 그리드에서 발주 수량과 확정 수량는 디폴트로 편집 불가임. 발주 수량 셀  편집 불가, 확정 수량 편집 가능
//    var CFM_QTY_COL = gridRoot1.getObjectById("CFM_QTY");//컬럼의 id 속성으로 설정된 값
//    CFM_QTY_COL.editable = true; 
    
    var files = e.target.files;
    var i, f; 
     
    for (i = 0, f = files[i]; i != files.length; ++i) {    // 파일이 존재 하는가.
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            var data = e.target.result; 
            var result = 0;
//            var workbook = XLSX.read(data, { type: 'binary' });  // 이렇게 사용하면  XLS 파일은 인식 못하므로 아래와 같이 사용했음
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
	                   }  
                 } 
                 sheet_cnt = sheet_cnt + 1; 
            });
              
            if( typeof result.length == 'undefined' )   
            {   alert("업로드한 엑셀에 발주데이터가 존재 하지 않습니다.");
         	    return; 
            }
             
            // 점 명 가져와서 배열에 넣기(형식: 일곡점_10015). 엑셀에서 점명을 가져올 수 없으므로 배열에 담아서 사용.
            var strArray = new Array();
            jQuery.ajax({ 
        	    url:"/getStoreInfo.do",            
        	    type:"POST",
        		datatype:"xml",
         		async:false, 
        		success:function(data){ 
        			
        			var strText = "";
        			for( var i = 0 ;  i < data.length ; i++ )
        			{   // 점포정보 배열에 넣기
        				strArray[i] = data[i].STR_NAME+"_"+data[i].STR_CODE ;  
        			}
        			 
        	    },
        	    complete : function(data) { 
        	    },
        	    error : function(xhr, status, error) { 
        	    }
        	});
              
             
//            if( typeof result[0].바코드 == 'undefined'    )
//            { 	alert("[ 엑셀양식 오류 ]\n업로드 엑셀의 첫 행은  BAR_CODE 과  QTY 이어야 합니다.\n첫행을   BAR_CODE  과   QTY  로 바꾸고 업로드 하거나, [엑셀다운]버튼을 눌러 다운로드 하여 사용하세요 ");
//     	   		return;  
//            }
             
            
            var num_check  		 	=/^[0-9]*$/; 
            var errStrBarCode     	= ""; 
            var errStrBarCodeDup  	= "";
            var errStrQty	      	= ""; 
            var errStrPurWprc     	= "";
            var errStrPurWvat     	= "";
            var errStrVenCode     	= "";
            var errStrBarCodeVenCodeDup   	= "";
            var errCnt            	= 0;
            var rowNum 			 	= 0;
            var barCodeString     	= "";
            var barCodeVenCodeString = "";
            for( var i = 0 ;  i < result.length ; i++ )   // result : 헤더 한줄 제외하고 읽는다.
            {
		         	   //   13자리 BAR_CODE 중복 체크를 위해 전체 바코드를 모두 문자열 합치기를한다.
            		   var barCodeLength = result[i].바코드;
            		   barCodeLength     = barCodeLength.length;
            		   if( barCodeLength == 13  )
            		   {
            			   barCodeString = result[i].바코드 + "_" + barCodeString;     
            		   } 
            		   
            		   //   6자리 BAR_CODE 와 VEN_CODE 중복 체크를 위해 전체 바코드+VEN_CODE를 모두 문자열 합치기를한다.
            		   var barCodeVenCodeLength = result[i].바코드+""+result[i].VEN_CODE;
            		   barCodeVenCodeLength    = barCodeVenCodeLength.length;
            		   if( barCodeVenCodeLength == 11  )
            		   {
            			   barCodeVenCodeString = result[i].바코드+""+result[i].VEN_CODE + "_" + barCodeVenCodeString;     
            		   }
            		    
            } 
             
            for( var i = 0 ;  i < result.length ; i++ )   // result : 헤더 한줄 제외하고 읽는다.
            {    
		                // 바코드 중복 검사  <- 위에서 문자열(barCodeString)로 만든것에서 첫번째 중복 지우고도, 또 중복되면 중복에러를 발생한다.
		          	    barCodeString = barCodeString.replace( result[i].바코드+"_" , ""); 
		          	    if(barCodeString.indexOf( result[i].바코드 ) != -1)
		          	    {  
		          	    			rowNum = i + 2 ;
		    	        		    errCnt = errCnt + 1;
		    	        		    errStrBarCodeDup = errStrBarCodeDup +  result[i].바코드 + ", ";  
		          	    }
		          	    
		          	    
		          	    // 6자리 바코드 와 5자리 VEN_CODE 중복 검사  <- 위에서 문자열(barCodeVenCodeString)로 만든것에서 첫번째 중복 지우고도, 또 중복되면 중복에러를 발생한다.
		          	    barCodeVenCodeString = barCodeVenCodeString.replace( result[i].바코드+""+result[i].VEN_CODE+"_" , ""); 
		          	    if(barCodeVenCodeString.indexOf( result[i].바코드+""+result[i].VEN_CODE ) != -1)
		          	    {  
		          	    			// 6자리 바코드는 중복되도됨
			          	           var barCodeLength_ex = result[i].바코드;
			            		   barCodeLength_ex     = barCodeLength_ex.length;
			            		   if( barCodeLength_ex == 13  )
		            			   { 
			          	    		   rowNum = i + 2 ;
			    	        		   errCnt = errCnt + 1;
			    	        		   errStrBarCodeVenCodeDup = errStrBarCodeVenCodeDup +  result[i].바코드 + ", ";  
		            			   }
		          	     
		          	    }
		          	     
		          	    
		          	    
		          	    // 바코드 유효성 검사 - 숫자 13 혹은 6자리 이여야만 한다.
		          	    var BAR_CODE_TEMP = result[i].바코드.toString();
		          	   
		                BAR_CODE_TEMP = BAR_CODE_TEMP.trim(); 
			   		    if(   num_check.test( BAR_CODE_TEMP ) && (  BAR_CODE_TEMP.length == 13   ||  BAR_CODE_TEMP.length == 6 )   )
			   		    { 
			   		    } else {  
				       		    rowNum = i + 2 ;
				       		    errCnt = errCnt + 1; 
				       		    errStrBarCode = errStrBarCode +"바코드 "+ rowNum + " 번째 열에  문자, 공백, 길이(13 혹은 6)자리가 맞지 않습니다.\n"; 
			   		    }
		          	     
		                // 원가 유효성 검증 - 생식일때는 0 혹은 공백 허용하고, 0 혹은 공백일때는 0으로 insert
		          	    var PUR_WPRC_VAL =   result[i].원가 ;  
		          	   
		          	    if( typeof PUR_WPRC_VAL  == 'undefined' )
		          	    {  PUR_WPRC_VAL = "";  } 
		          	    PUR_WPRC_VAL     =   PUR_WPRC_VAL.replace(/,/g, "");
		          	    PUR_WPRC_VAL 	 =   $.trim( PUR_WPRC_VAL );   
		          	    if(       ! num_check.test( PUR_WPRC_VAL )  
	//		          			   || PUR_WPRC_VAL         == 0  
	//		          			   || typeof PUR_WPRC_VAL  == 'undefined'
		          			   || PUR_WPRC_VAL.length  >= 13 
		          	    )
		          	    {   rowNum = i + 2 ;
		          		    errCnt = errCnt + 1;
		          		    errStrPurWprc = errStrPurWprc +"원가 "+ rowNum + " 번째 열에  문자, 공백, 0 이 있거나, 숫자가 너무 큽니다.\n";  
		          	    } 
		          	   
		          	    // 부가세 유효성 검증 - 생식일때는 0 혹은 공백 허용하고, 0 혹은 공백일때는 0으로 insert
		          	    var PUR_WVAT_VAL =   result[i].부가세 ;
		          	    if( typeof PUR_WVAT_VAL  == 'undefined' )
		          	    {  PUR_WVAT_VAL = "";  } 
		          	    PUR_WVAT_VAL     =   PUR_WVAT_VAL.replace(/,/g, ""); 
		            	PUR_WVAT_VAL     =   $.trim( PUR_WVAT_VAL );   
		          	    
		          	    if( 	  ! num_check.test( PUR_WVAT_VAL )   
		           //	       || typeof PUR_WVAT_VAL   == 'undefined'
		          			   || PUR_WVAT_VAL.length   >= 13 
		          	    )
		          	    {   rowNum = i + 2 ;
		          		    errCnt = errCnt + 1;
		          		    errStrPurWvat = errStrPurWvat +"부가세 "+ rowNum + " 번째 열에  문자, 공백 이 있거나, 숫자가 너무 큽니다.\n";  
		          	    }  
		          	    
		          	    
		          	    // 매입처코드 유효성 검증 - 바코드가 6자리 일때만 매입처 코드가 존재 해야만 한다.
		          	    var VEN_CODE_VAL =   result[i].VEN_CODE ;
		          	    if( typeof VEN_CODE_VAL  == 'undefined' )
		          	    {  VEN_CODE_VAL = "";  } 
		          	    VEN_CODE_VAL     =   VEN_CODE_VAL.replace(/,/g, ""); 
		          	    VEN_CODE_VAL     =   $.trim( VEN_CODE_VAL );   
		          	    // 바코드가 6자리이고, 매입처코드가 5가 아니거나 문자이면 에러 
		          	    if(  BAR_CODE_TEMP.length == 6 && (    ! num_check.test(VEN_CODE_VAL) || VEN_CODE_VAL.length != 5    )   )
		          	    {    
		          	    	// VEN_CODE 에 값을 안넣어도됨.
		          	    	if (   VEN_CODE_VAL  != '')
		          	    	{
		          	    		rowNum = i + 2 ;
			          		    errCnt = errCnt + 1;
			          		    errStrVenCode = errStrVenCode +"매입처코드(VEN_CODE) "+ rowNum + " 번째 열은  숫자 5자리여야 합니다.\n";  	
		          	    	} 
		          	    }   
		          	   
		          	    
		          	    
		          	    
		          	    
		          	     
		          	   // 점별 수량 유효성 검증   -  수량을 안넣어도  에러처리 안하고 0으로 insert 한다.
		          	   var STORE_QTY_VAL = ""; 
		          	   for( var k = 0 ;  k < strArray.length ; k++ ) 
		          	   {
		          		   STORE_QTY_VAL  = eval( " result[i]."+strArray[k]+" ;"   ); 
		          		    
		          		   if( typeof STORE_QTY_VAL == 'undefined' )  
		          		   {    STORE_QTY_VAL = "";    }
		          		   STORE_QTY_VAL     =   STORE_QTY_VAL.replace(/,/g, ""); 
		          		   STORE_QTY_VAL     =   $.trim( STORE_QTY_VAL ); 
//		          		   STORE_QTY_VAL  = $.trim( STORE_QTY_VAL.replace(/,/g, "")  );
		          		     
		              	   if( ! num_check.test( STORE_QTY_VAL )  
//		              			   || typeof STORE_QTY_VAL == 'undefined'
//		              			   || STORE_QTY_VAL == ''
		              			   || STORE_QTY_VAL.length  >= 10 
		              	   )
		              	   {   rowNum = i + 2 ;
		              		   errCnt = errCnt + 1;
		              		   errStrQty = errStrQty +"["+ strArray[k] +"] "+ rowNum + " 번째 열에  문자, 공백 이 있거나, 숫자가 너무 큽니다.\n"; 
		              	   } 
		          	   }
 
            }     // end for 
             
            if(errCnt != 0)
            {     
         	   if(errStrBarCodeDup != "")
         	   {    prompt("엑셀에서 다음의 13 자리 스캔코드가 중복 됩니다.", errStrBarCodeDup  );    } 
                 
         	   // 생식은 바코드가 중복 되어도 됨
//         	   if(errStrBarCodeVenCodeDup != "")
//        	   {    prompt("엑셀에서 다음의  6자리 스캔코드가 중복 됩니다.", errStrBarCodeVenCodeDup  );    } 
               
         	   if(       errStrBarCode      != ""  
	         		  || errStrQty       	!= ""
	         		  || errStrPurWprc      != ""
	         		  || errStrPurWvat      != ""
	         		  || errStrVenCode      != ""
         	   )
         	   {     alert( "[엑셀 오류]"
	             		   +"\n"+ errStrBarCode  
	             		   +"\n"+ errStrQty
	             		   +"\n"+ errStrPurWprc 
	             		   +"\n"+ errStrPurWvat 
	             		   +"\n"+ errStrVenCode
	                );
         	   }
         	   
            } else { 
            	
         	    //  DB 로 던지기 위해 XML 로 변경하는 작업
            	var excelLoadProduct    = "";
//            	var excelLoadProductAll = "";
//                var strXmlArray = new Array();
//                var rowIndex    = 0 ;
         		for( var i = 0 ;  i < result.length ; i++ ) 
         		{  
		                		// 점포수 만큼 루프 돈다.
         						var getStrCode 		 = null;
         						 
		                		for( var k = 0 ;  k < strArray.length ; k++ ) 
		                		{ 
		                			var bar_code_val = result[i].바코드;
		                			
			            			var pur_wprc_val = result[i].원가; 
			            			if( typeof pur_wprc_val  == 'undefined'  )
			            			{  pur_wprc_val = "0";  }
			            			else
		                		    { pur_wprc_val     = pur_wprc_val.replace(/,/g, ""); }
			            			 
			            			 
			            			var pur_wvat_val = result[i].부가세; 
			            			if( typeof pur_wvat_val  == 'undefined'  )
			            			{  pur_wvat_val = 0;  }
			            			else
			            			{	pur_wvat_val     = pur_wvat_val.replace(/,/g, "");		}
			            			
			            			var ven_code_val = result[i].VEN_CODE; 
			            			if( typeof ven_code_val  == 'undefined'  )
			            			{   ven_code_val     =  "";  }
			            			else
			            			{	
			            				ven_code_val     =  ven_code_val.replace(/,/g, "");	
			            				ven_code_val     =  $.trim( ven_code_val ) ; 
			            			}
			            			
			            			
			            			var ord_qty_val  = eval("result["+i+"]."+strArray[k]+"")   ; 
			            			if( typeof ord_qty_val  == 'undefined' ||  ord_qty_val == '' )
			            			{  ord_qty_val = 0;  }
			            			else
			            			{  ord_qty_val = ord_qty_val.replace(/,/g, ""); }
			            			 
			            			
			            			var ord_dt_val   = $("#ORD_DT").val()    ; 
			            			getStrCode 		 = strArray[k].split("_"); 
			            			 
			            			// 엑셀의 정보를 XML 로 만듬
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
		                			var	BAR_CODE  = xmlDoc.createElement('BAR_CODE');  
			                		var	PUR_WPRC  = xmlDoc.createElement('PUR_WPRC');
			                		var	PUR_WVAT  = xmlDoc.createElement('PUR_WVAT'); 
			            			var	ORD_DT    = xmlDoc.createElement('ORD_DT');   
			            			var	STR_CODE  = xmlDoc.createElement('STR_CODE'); 
			            			var	ORD_QTY	  = xmlDoc.createElement('ORD_QTY'); 
			            			var	VEN_CODE  = xmlDoc.createElement('VEN_CODE'); 
			            			 
			            			BAR_CODE.appendChild(  xmlDoc.createTextNode(  bar_code_val.replace(/,/g, "") 	)	);   
			            			PUR_WPRC.appendChild(  xmlDoc.createTextNode(  pur_wprc_val  	)	); 
			            			PUR_WVAT.appendChild(  xmlDoc.createTextNode(  pur_wvat_val   	)	); 
			            			ORD_DT.appendChild(    xmlDoc.createTextNode(  ord_dt_val.replace(/-/g, "")  	)	); 
			            			STR_CODE.appendChild(  xmlDoc.createTextNode(  getStrCode[1]   			 )	); 
			            			ORD_QTY.appendChild(   xmlDoc.createTextNode(  ord_qty_val   	)	); 
			            			VEN_CODE.appendChild(  xmlDoc.createTextNode(  ven_code_val   	)	); 
			            			 
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BAR_CODE	); 
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WPRC	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WVAT	); 
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT 	); 
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY	); 
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE	); 
			            			
			            			excelLoadProduct =   getXmlString(   xmlDoc   ) +""+ excelLoadProduct; 
			            			 
		                		} 
		                	 
         		} 
	            excelLoadProduct  =  "<GRIDLIST>"+ excelLoadProduct +"</GRIDLIST>" ; 
	             
	           
	            // 엑셀 (excelLoadProduct)의 발주 데이터를 DB 로 넘겨 , 상품 정보를 조회후 그리드에 출력하기
	            
	            var DONT_SAVE_BIT = "N";
	              
             	jQuery.ajax({ 
         	    url:"/excelDataLoadBuyerAll.do",        //  excelDataLoadBuyer.do      
         	    type:"POST",
         		datatype:"xml",
         		async:false,
         		data: {     "ORD_DT"      :	$("#ORD_DT").val().replace(/-/g, "")
         		,			"EXCEL_DATA"  : excelLoadProduct   },
         		beforeSend : function(){ 
                     gridRoot1.addLoadingBar(); 
         	    }, 
         		success:function(data){   
         			//그리드1 초기화 
         			gridRoot1.removeAll();
         			if(data.length == 0) 
         			{  
         				dataGrid1.setEnabled(true);
         		    	gridRoot1.removeLoadingBar();
         				return;
         			} 
         			
//         			for(var i=0 ; i < data.length ; i++ )
//         			{
//         				 
//         				if(  data[i].ITM_GB != "1" )  // 비생식일  경우에는 금액이 0이 면 안되므로 리턴한다. 
//         			    {
//         					if(   data[i].PUR_WPRC == "0"  ||   data[i].PUR_WVAT    == "0"  )
//         					{ 
//         						DONT_SAVE_BIT = "Y";
//         						
//         						alert("비생식 상품의 단가가  0 입니다.\n해당 상품의 단가를 수정하여 재업로드 해주세요!");
//         						
//         						dataGrid1.setEnabled(true);
//         	         	    	gridRoot1.removeLoadingBar();
//         						return;
//         						
//         					}
//         					 
//         			    }
//         				
//         			}
         			
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
         				var ERR_CHK 		= xmlDoc.createElement('ERR_CHK'); 
         				var SEQ 		    = xmlDoc.createElement('SEQ');  
         				var SEQ_NO 		    = xmlDoc.createElement('SEQ_NO');  
         				var REG_PATH 	    = xmlDoc.createElement('REG_PATH');  
         				var STR_CODE 	    = xmlDoc.createElement('STR_CODE');  
         				var STR_NAME 	    = xmlDoc.createElement('STR_NAME');  
         				var ITM_CODE		= xmlDoc.createElement('ITM_CODE'); 
         				var SCAN_CODE		= xmlDoc.createElement('SCAN_CODE'); 
         				var ITM_NAME		= xmlDoc.createElement('ITM_NAME');  
         				var IPSU_QTY		= xmlDoc.createElement('IPSU_QTY');  
         				var ORD_QTY 		= xmlDoc.createElement('ORD_QTY');  
         				var CFM_QTY 		= xmlDoc.createElement('CFM_QTY');    
         				var PUR_WPRC		= xmlDoc.createElement('PUR_WPRC'); 
         				var PUR_WVAT 	    = xmlDoc.createElement('PUR_WVAT');   
         				var VEN_CODE		= xmlDoc.createElement('VEN_CODE'); 
         				var VEN_NAME		= xmlDoc.createElement('VEN_NAME');  
         				var ORD_DT  		= xmlDoc.createElement('ORD_DT'); 
         				var	ITM_GB    		= xmlDoc.createElement('ITM_GB'); 
         				var	ITM_GB_NM 		= xmlDoc.createElement('ITM_GB_NM');
         				var	CFM_DT 		    = xmlDoc.createElement('CFM_DT');
         				var	ROUTE_GB 	    = xmlDoc.createElement('ROUTE_GB');
         				var	PUR_AVR_AMT     = xmlDoc.createElement('PUR_AVR_AMT');
         				
         				ROUTE_GB.appendChild(  	    xmlDoc.createTextNode(   data[i].ROUTE_GB       )	);
         				SEQ_NO.appendChild(  	    xmlDoc.createTextNode(  i+1	        			)	);
         				SEQ.appendChild(  	        xmlDoc.createTextNode(  data[i].SEQ    			)	);
         				REG_PATH.appendChild(  	    xmlDoc.createTextNode(  data[i].REG_PATH   		)	); 
         				ERR_CHK.appendChild(  	    xmlDoc.createTextNode(  ""          			)	);  
         				STR_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].STR_NAME  	    )	);
         				STR_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].STR_CODE  	    )	); 
         				ITM_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_CODE    	)	);
         				SCAN_CODE.appendChild(  	xmlDoc.createTextNode( 	data[i].SCAN_CODE     	)	);
         				ITM_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_NAME     	)	); 
         				IPSU_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].IPSU_QTY   		)	); 
         				ORD_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_QTY       	)	);
         				CFM_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].CFM_QTY         )	);
         				PUR_AVR_AMT.appendChild(  	xmlDoc.createTextNode( 	parseInt(data[i].PUR_WPRC)  + parseInt(data[i].PUR_WVAT )  		)	); 
         				
         				var priceVat = calPriceVat( data[i].PUR_WPRC , data[i].TAX_GB       );	
         				 
         				PUR_WPRC.appendChild(  		xmlDoc.createTextNode( 		data[i].PUR_WPRC  		)	);   // 대출원가
         				PUR_WVAT.appendChild(  		xmlDoc.createTextNode(     data[i].PUR_WVAT    	)	);   // 부가세
         				VEN_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_CODE      	)	);
         				VEN_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_NAME       	)	); 
         				ORD_DT.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_DT        	)	);
         				ITM_GB.appendChild(     	xmlDoc.createTextNode(  data[i].ITM_GB			)	); 
	            		ITM_GB_NM.appendChild( 	 	xmlDoc.createTextNode(  data[i].ITM_GB_NM		)	); 
	            		CFM_DT.appendChild( 	 	xmlDoc.createTextNode(  ""	     				)	); 

	            		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB			);
	            		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB_NM		);
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_NAME      	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE      	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ERR_CHK      	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_CODE      	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE     	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME       	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IPSU_QTY       	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY       	);    
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_QTY        	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WPRC         );  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WVAT         );    
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE     	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_NAME       	);    
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT          	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ          	); 
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ_NO          	); 
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( REG_PATH     	); 
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_DT        	); 
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ROUTE_GB        	); 
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_AVR_AMT     	); 
         				 

        				var	STORENAME1 		= xmlDoc.createElement('STORENAME1');
        				var	STORENAME2 		= xmlDoc.createElement('STORENAME2');
        				var	STORENAME3 		= xmlDoc.createElement('STORENAME3');
        				var	STORENAME4 		= xmlDoc.createElement('STORENAME4');
        				var	STORENAME5 		= xmlDoc.createElement('STORENAME5');
        				var	STORENAME6 		= xmlDoc.createElement('STORENAME6');
        				var	STORENAME7 		= xmlDoc.createElement('STORENAME7');
        				var	STORENAME8 		= xmlDoc.createElement('STORENAME8');
        				var	STORENAME9 		= xmlDoc.createElement('STORENAME9');
        				var	STORENAME10 	= xmlDoc.createElement('STORENAME10');
        				var	STORENAME11 	= xmlDoc.createElement('STORENAME11');
        				var	STORENAME12 	= xmlDoc.createElement('STORENAME12');
        				var	STORENAME13 	= xmlDoc.createElement('STORENAME13');
        				var	STORENAME14 	= xmlDoc.createElement('STORENAME14');
        				var	STORENAME15 	= xmlDoc.createElement('STORENAME15');
        				var	STORENAME16 	= xmlDoc.createElement('STORENAME16');
        				var	STORENAME17 	= xmlDoc.createElement('STORENAME17');
        				var	STORENAME18 	= xmlDoc.createElement('STORENAME18'); 
        				var	STORENAME19 	= xmlDoc.createElement('STORENAME19'); 
        				var	STORENAME20 	= xmlDoc.createElement('STORENAME20');
        				STORENAME1.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME1  	    )	);  
        				STORENAME2.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME2  	    )	);  
        				STORENAME3.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME3  	    )	);  
        				STORENAME4.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME4  	    )	);  
        				STORENAME5.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME5  	    )	);  
        				STORENAME6.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME6  	    )	);  
        				STORENAME7.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME7  	    )	);  
        				STORENAME8.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME8  	    )	);  
        				STORENAME9.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME9  	    )	);  
        				STORENAME10.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME10  	    )	);  
        				STORENAME11.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME11  	    )	);  
        				STORENAME12.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME12  	    )	);  
        				STORENAME13.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME13  	    )	);  
        				STORENAME14.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME14  	    )	);  
        				STORENAME15.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME15  	    )	);  
        				STORENAME16.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME16  	    )	);  
        				STORENAME17.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME17  	    )	);  
        				STORENAME18.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME18  	    )	);  
        				STORENAME19.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME19  	    )	);  
        				STORENAME20.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME20  	    )	);  
            			 
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME1			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME2			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME3			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME4			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME5			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME6			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME7			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME8			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME9			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME10			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME11			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME12			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME13			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME14			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME15			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME16			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME17			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME18			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME19			);
        				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME20			);
        				 
         				gridRoot1.addItemAt(  xmlDoc  , i ,false ); 
         			} 
//         			var excelBarCodeErr = "";
         			for(var i=0 ; data.length > i  ; i++ )
         			{   // 상품명이 없을경우, 즉 바코드가 존재 안할때 ... (undefined) 확인란에 빨간색으로 표기 
         				if(     gridRoot1.getItemFieldAt( i , "ITM_NAME")   == "undefined"   
         					||  gridRoot1.getItemFieldAt( i , "ITM_NAME")   == ""   )
         				{       
         					    gridRoot1.setItemFieldAt( '오류_'+(i+2)  , i, "ERR_CHK");    
         						excelBarCodeErr = excelBarCodeErr +  (i+2)+ "라인, "   ;
         						
         						// 유맥의 요청 사항 : 오류가 발생한 행은 오류 얼럿만 보여주고, 정상적인 데이터만 업로드한다.( 오류제외하고 올림 )
            					// 그리드에서  오류가 발생한 ROW는 삭제 한다. 
            					gridRoot1.removeItemAt(i);
            					
         				}
         			}                                    
         			

         			if(excelBarCodeErr != "")
         			{
         				prompt("아래 보이는 엑셀 라인의  스캔코드는 DB에 존재 하지 않습니다.\n오류 데이터를 제거하고 업로드 합니다.", excelBarCodeErr ); 
         			}
         			
         			dataGrid1.setEnabled(true);
         	    	gridRoot1.removeLoadingBar();
         	    },
         	    complete : function(data) { 
         	    	 
        	    	// PO_ORDER_UPLOAD 에 저장
         	    	// 비생식에 금액이 0일경우에는 저장하지 않음.
         	    	if ( DONT_SAVE_BIT == "N" )
         	    	{
//         	    		alert('테스트위하여 btn_save 주석처리');   
          	    	 	btn_save();
         	    	}  
         	    },
         	    error : function(xhr, status, error) {
         	    	dataGrid1.setEnabled(true);
         	    	gridRoot1.removeLoadingBar();
//         	    	CommonJs.alertErrorStatus(xhr.status, error);
         	    	alert('업로드 하신 바코드중 일부가  상품마스터 혹은 점상품 마스터에 존재 하지  않습니다.');
         	    }
         	});
	                  
            } 
        };
        reader.readAsArrayBuffer(f);
    }


}
 

function loadExcelFile(e) {
	 
	 //그리드1 초기화 
	 gridRoot1.removeAll(); 
	 
	 // 바이어(ROLE009), 물류 (ROLE010) 로그인 시 
	 if( $("#SESSION_ROLE_ID").val()    == "ROLE009"    ||  $("#SESSION_ROLE_ID").val()    == "ROLE010" ||  $("#SESSION_ROLE_ID").val()    == "ROLE014")  
	 {   
		    // 생식 및 비생식을 전부 처리 한다. 
		    // 바이어 비생식은 STR_CODE 에 물류코드만  들어가야함. 또한 비생식은 물류만 수정 하게끔 해야한다.
		 	buyer_upload(e);
		 	   
	 } else {
		 	alert('바이어 혹은 물류센터 계정으로 로그인 하셔야 합니다.');
		 	return;
		 
	 }
	
  
 }




// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
//rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");


// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";
//jsVars += "&dataType=xml"; 
rMateGridH5.create("grid1", "gridHolder1", jsVars+"&dataType=xml", "100%", "560px");    
//rMateGridH5.create("grid2", "gridHolder2", jsVars );                                  
 
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
			gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);
			 
			
		    var dataCompletedHandler = function(event) {
			        dataGrid = gridRoot1.getDataGrid();    // 그리드 객체
			        columns = dataGrid1.getColumns();
			        
			        
					//  // 헤더 타이틀 동적으로 뿌려주기
					//  for (var i = 0 ; i < columns.length ; i++ ) { 
					//     columns[i].setHeaderText("헤더 타이틀");
					//  }
			    	
			        jQuery.ajax({
			    	    type:"POST",
			    	    url:"/getStoreCode.do",
			    	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
//			    	    data:postValue,
			    	    async:false,
			    	    success : function(data) {
			    			
			    	    	allStrColNum = data.length; 
//			    	    	var startStrColNum = 16;  // 전역변수로 뺐음 . 점의 컬럼이 시작되는 index ( 점포 컬럼의 앞쪽 컬럼의 갯수가 변동되면 여기는 바꾸어준다. 이때 점포컬럼 앞쪽의 컬럼들은 visible 이 true 인것만 해당 된다.)
			    	    	var maxTempColumn = 20;  // layoutStr1 에서  템프 점포의 갯수가 변경되면 여기도 변경해준다 ( 현재는  storeNameX 가 최대 20 이다. ) 
			    	    	var j = 0;
			    	    	var c = 0;
			    	    	dataGrid = gridRoot1.getDataGrid();
			    	    	columns = dataGrid1.getColumns();
			    	    	for(var i = 0; i < data.length; i++){
			    	    		
			    				j = parseInt(startStrColNum) + parseInt(i)  ;    // 점의 시작 인덱스 부터 컬럼명을 점포명으로 바꾸어준다. 
			    				columns[j].setHeaderText( data[i].STR_NAME+"<br>"+data[i].STR_CODE    );   
//			    				columns[j].setDataField(  data[i].STR_NAME );  
			    				
			    				c = c + 1; 
			    			}
			    	    	
			    	    	// ( 점 컬럼 앞 부분갯수 + 실제 점 컬럼 갯수 ) 부터 ( 점 컬럼 앞 부분갯수 + 템프 점 최대컬럼 갯수 ) 까지의 컬럼은 안보이게 한다. ( 이부분은 실제점포코드가 안들어가므로 안보이게 한다. )
			    	    	//        
			    	    	//                                |    ~~~~~~~~~~~~~   템프 점 최대컬럼   ~~~~~~~~~~~~~~~~     |  
			    	    	//    | ~~~~~ 점 컬럼 앞 부분갯수 ~~~~~~ |    ~~~ 사용되는  점 컬럼 ~~~   |  ~~~ 사용되지 않은 점 컬럼  ~~~  | 
			    	    	//   
			    	    	//                                                       아래 for 에서  사용되지 않은 점 컬럼을 삭제 한다.
			    	    	//                                                                  
			    	    	for(var k = startStrColNum + c ;      k < startStrColNum + maxTempColumn  ;      k++){
			    	    		columns[k].setVisible(false);
			    	    	}
			    	    	
			    	    },
			    	    complete : function(data) {
			    	    },
			    	    error : function(xhr, status, error) { 
			    	    }
			    	});
			         
			};
			gridRoot1.addEventListener("dataComplete", dataCompletedHandler);
		}   
 
 
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1; 
//var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2; 

//----------------------- 그리드 설정 끝 -----------------------
 
 
// 발주상품  그리드 - 그리드1 헤더 설정        itemRenderer="IconItem" icon="Magnifier"    selectionMode="multipleRows"    singleCell
var layoutStr1 =
'<rMateGrid>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<NumberFormatter   	 id="numfmt" 	useThousandsSeparator="true"   />\
	<DataGrid id="dg1"  sortableColumns="true"  editable="true" horizontalScrollPolicy="auto"  headerHeight="37" showDeletedRows="true"  selectionMode="multipleCells"   dragSelectable="true" doubleClickEnabled="false" >\
		<columns>\
			<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"  visible="true"  />\
			<DataGridSelectorColumn id="selector" width="40" textAlign="center"  headerText=""  backgroundColor="#EDEDF0" allowAllSelection="true"   />\
			<DataGridColumn  id="SEQ_NO"		 dataField="SEQ_NO"     	visible="true"  headerText="No"			editable="false" 	itemRenderer="IndexNoItem"	textAlign="center"   width="35"  	 />\
			<DataGridColumn  id="SEQ"		     dataField="SEQ"   		    visible="false"    width="5"    />\
			<DataGridColumn  id="VEN_CODE"		 dataField="VEN_CODE"     	headerText="코드"			editable="false" 		textAlign="center"   width="52"  		/>\
			<DataGridColumn  id="VEN_NAME"		 dataField="VEN_NAME"    	headerText="매입처"		editable="true"			showEditableIcon="always"   itemRenderer="EditableIconItem" textAlign="left"	 width="160"    		/>\
			<DataGridColumn  id="SCAN_CODE"		 dataField="SCAN_CODE"     	headerText="스캔코드"		editable="false" 	    textAlign="center"	 width="110"  editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem" />\
			<DataGridColumn  id="ITM_NAME"		 dataField="ITM_NAME"     	headerText="상품명"		editable="false" 		textAlign="left"	 width="145"   		/>\
			<DataGridColumn  id="CFM_DT"		 dataField="CFM_DT"    		headerText="발주생성일"    editable="false"		textAlign="center"	 width="82"    formatter="{datefmt}"		/>\
			<DataGridColumn  id="IPSU_QTY"		 dataField="IPSU_QTY"    	headerText="입수"    		editable="false"		textAlign="right"    width="60"    formatter="{numfmt}"  	/>\
			<DataGridColumn  id="ITM_GB_NM"	 	 dataField="ITM_GB_NM"      headerText="상품구분"     editable="false"		    textAlign="center"   width="65"      	/>\
			<DataGridColumn  id="ITM_GB"	 	 dataField="ITM_GB"         headerText="ITM_GB"     editable="false"		visible="false"        	/>\
			<DataGridColumn  id="ROUTE_GB"	 	 dataField="ROUTE_GB"       headerText="배송구분"     editable="false"		    textAlign="center"  visible="true"       width="65"   	/>\
			<DataGridColumn  id="PUR_AVR_AMT"    dataField="PUR_AVR_AMT"   	headerText="단가"  		editable="true"		    textAlign="right"	 width="72"    type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
			<DataGridColumn  id="PUR_WPRC"	 	 dataField="PUR_WPRC"   	headerText="원가"  		editable="false"		textAlign="right"	 width="72"   formatter="{numfmt}"  	/>\
			<DataGridColumn  id="PUR_WVAT"		 dataField="PUR_WVAT"   	headerText="부가세"		editable="false"		textAlign="right"	 width="72"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="STORENAME1"	 dataField="STORENAME1"     headerText="STORENAME1"        	editable="true"		textAlign="right"    width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	  />\
	        <DataGridColumn  id="STORENAME2"	 dataField="STORENAME2"     headerText="STORENAME2"    		editable="true"		textAlign="right"    width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	 />\
			<DataGridColumn  id="STORENAME3"	 dataField="STORENAME3"     headerText="STORENAME3"    		editable="true"		textAlign="right"    width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	 />\
			<DataGridColumn  id="STORENAME4"	 dataField="STORENAME4"     headerText="STORENAME4"    		editable="true"		textAlign="right"    width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
			<DataGridColumn  id="STORENAME5"	 dataField="STORENAME5"     headerText="STORENAME5"		    editable="true"		textAlign="right"	 width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 			/>\
			<DataGridColumn  id="STORENAME6"	 dataField="STORENAME6"     headerText="STORENAME6"		    editable="true"		textAlign="right"	 width="65"    	 maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME7"	 dataField="STORENAME7"     headerText="STORENAME7"		    editable="true"		textAlign="right"	 width="65"    	 maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME8"	 dataField="STORENAME8"     headerText="STORENAME8"		    editable="true"		textAlign="right"	 width="65"    	 maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME9"	 dataField="STORENAME9"     headerText="STORENAME9"		    editable="true"		textAlign="right"	 width="65"    	 maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME10"	 dataField="STORENAME10"    headerText="STORENAME10"	    editable="true"		textAlign="right"	 width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME11"	 dataField="STORENAME11"    headerText="STORENAME11"	    editable="true"		textAlign="right"	 width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 			/>\
			<DataGridColumn  id="STORENAME12"	 dataField="STORENAME12"    headerText="STORENAME12"	    editable="true"		textAlign="right"	 width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME13"	 dataField="STORENAME13"    headerText="STORENAME13"	    editable="true"		textAlign="right"	 width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 			/>\
			<DataGridColumn  id="STORENAME14"	 dataField="STORENAME14"    headerText="STORENAME14"	    editable="true"		textAlign="right"	 width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME15"	 dataField="STORENAME15"    headerText="STORENAME15"	    editable="true"		textAlign="right"	 width="65"    	 maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME16"	 dataField="STORENAME16"    headerText="STORENAME16"	    editable="true"		textAlign="right"	 width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME17"	 dataField="STORENAME17"    headerText="STORENAME17"	    editable="true"		textAlign="right"	 width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 			/>\
			<DataGridColumn  id="STORENAME18"	 dataField="STORENAME18"    headerText="STORENAME18"	    editable="true"		textAlign="right"	 width="65"      maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 			/>\
			<DataGridColumn  id="STORENAME19"	 dataField="STORENAME19"    headerText="STORENAME19"	    editable="true"		textAlign="right"	 width="65"    	 maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 		/>\
			<DataGridColumn  id="STORENAME20"	 dataField="STORENAME20"    headerText="STORENAME20"	    editable="true"		textAlign="right"	 width="65"    	 maxChars="6" type="int"      formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
			<DataGridColumn  id="CFM_QTY"	 	 dataField="CFM_QTY" 		headerText="확정수량"  visible="false" 	editable="false"		textAlign="right"     maxChars="6" type="int"   width="70"    formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
			<DataGridColumn  id="CFM_YN"		 dataField="CFM_YN"         visible="false" />\
			<DataGridColumn  id="ORD_DT"		 dataField="ORD_DT"         visible="false" />\
			<DataGridColumn  id="ERR_CHK"		 dataField="ERR_CHK"        visible="false" />\
			<DataGridColumn  id="REG_PATH"		 dataField="REG_PATH"       visible="false" />\
			<DataGridColumn  id="TAX_GB"		 dataField="TAX_GB"         visible="false" />\
			<DataGridColumn  id="VEN_CODE_OLD"   dataField="VEN_CODE_OLD"   visible="false" />\
	</columns>\
	</DataGrid>\
</rMateGrid>';
 
//그리드  데이터 초기화
var gridData1 = []; 
 

// ----------------------- 그리드 설정 끝 -------------------------------------

function secondLabelFunc(item, value, column) {
	    
	 if(  item.CFM_DT ==  undefined   )
		 return true;
	 else
		 return false;
} 
	
function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

  
//그리드내의 협력업체검색 팝업
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
}




// 상품상세 부분 내에서 (협력업체검색) 팝업 호출 function
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

 
function init() {
  
	$(".datepicker1").datepicker({
		 showMonthAfterYear:true 
	});
	$(".datepicker2").datepicker({
		 showMonthAfterYear:true 
	});
 
	$(".datepicker").datepicker({ onSelect: function(dateText) 
		{ 	 
//			var CUR_DT  = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
//			var PLUS_DT = new CommDateManager().after(0, 0, 3).getDate("yyyy-mm-dd"); 
			
			// 날짜가 바뀌면 그리드에도 바꾸어준다.
			var rowCnt  = gridRoot1.getCollection().getSource() ;    
			for(var i=0 ; i < rowCnt.length ; i++)
			{
				gridRoot1.setItemFieldAt( $("#ORD_DT").val()  , i, "ORD_DT"); 
			} 
		}, showMonthAfterYear:true 
	}); 
	
	//  추가 발주 상품 명에서 엔터시 검색되게....
	$("input[name=ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_product_search();
        } 
	});
	
	//  추가 발주 상품 수량에서 엔터시 검색되게....
	$("input[name=ORD_QTY]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_itm_add();
        } 
	});
	
	//  협력업체에서 엔터시 검색되게....
	$("input[name=VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        } 
	});
	   
	//발주일자는 시스템 날짜   해서 default 로 넣는다
	var ORD_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#ORD_DT").val( ORD_DT );
	    
	$("#CFM_YN").val( "N" );
	$("#GRE_GB").val( "" ) ;  
	$("#S_ITM_GB").val( "" ) ;  
	$("#PUR_GB    option[value!='']").remove(); 
	getCommonCodeSelectBoxList("PUR_GB"  ,   "PUR_GB"	);
	
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

//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
  
  

function  btn_pop_close(){ 
	 $( "#show_product_pop" ).dialog( 'close' );	 
}
 

function chgPurGb()
{
	$('#excelFile').val(""); 

}



// R2 발주 엑셀 데이터 다운로드 
function  r2OrderExcelData() {
	 
	if(   $('#ORD_DT' ).val() == ""   )
	{    alert("발주일을 선택 하세요.");
		 $('#ORD_DT' ).focus();
		 return;
	}
  
	var ORD_DT        = $('#ORD_DT').val().replace(/-/g, "");
	var LRG_CODE      = $('#LRG_CODE').val() ;
	
	//엑셀 다운 호출  wmsInReportExcelDown.do
	$.download('/r2OrderExcelDataBuyer.do',"ORD_DT="+ORD_DT  
										  +"&LRG_CODE="+LRG_CODE 
									      ,"post" );
	 
}



// 엑셀양식 다운로드
function excelDownload() {
	  
	$.download('/resources/ORDER_EXCEL_FORM/ORDER_UPLOAD_FRESH.xlsx',"null" ,"post" );
	
} 
function chk_order_day()
{ 
	var CUR_DT  = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
	var PLUS_DT = new CommDateManager().after(0, 0, 3).getDate("yyyy-mm-dd"); 
	 
	if( CUR_DT  >  $("#ORD_DT").val()  )
	{   $("#ORD_DT").val( CUR_DT );
		alert("발주일자는 과거 일수 없습니다."); 
		return false;  
	} else {
		
		if( PLUS_DT  < $("#ORD_DT").val()  )
		{ 	$("#ORD_DT").val( CUR_DT );
			alert("발주일자는 최대 3일을 넘겨 지정 할 수 없습니다."); 
			return false;  
		}  
	} 
	return true;
}

function  btn_load()
{  
	if(  $('#excelFile' ).val() == ""  )
	{   alert("발주 엑셀파일을 선택 하세요.");
		$('#excelFile' ).focus();
		return;
	} 
	
//	if( $("#SESSION_ROLE_ID").val()    == "ROLE009" || $("#SESSION_ROLE_ID").val()    == "ROLE010")  // 바이어(ROLE009) 물류(ROLE010) 
//	{
//		if(  $('#ITM_GB_UPLOAD' ).val() == ""  )
//		{   alert("업로드구분을 선택 하세요.");
//			$('#ITM_GB_UPLOAD' ).focus();
//			return;
//		}  
//		if(  $('#ITM_GB_UPLOAD' ).val() == "9" &&  $('#CENTA_CODE' ).val() == ""  )
//		{   alert("물류센터를 선택 하세요.");
//			$('#CENTA_CODE' ).focus();
//			return;
//		} 
//	}
	  
	if(! chk_order_day() )
	{ return;}
	 
	loadExcelFile(  G_FILE  ); 
	
	EXCEL_LOAD_BIT = "Y";
	 
}

function btn_order()
{  
	
	
	selectorColumn  = gridRoot1.getObjectById("selector"); 
	var selectedProduct = selectorColumn .getSelectedIndices() ; 
	
	if( selectedProduct.length == 0)
	{   alert("발주생성 할 상품이 체크되지 않았습니다.");
		return;
	}
	
	if (confirm("선택한 상품을 발주  하시겠습니까?") == false){  
		return;
	}
	
	// 체크한것만 발주하기
	var chkOrderProduct = "/"; 
	for(var i=0; i < selectedProduct.length ; i++) 
	{     
		if(    gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "CFM_DT")   ==  'undefined'  )
		{
			chkOrderProduct = chkOrderProduct +""+gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "SCAN_CODE") +"/";
			
		} 
	}
	 
	
	
	
	
	// 업로드 주체가 바이어 인지 점포인지 구분. REG_PATH :   1- 점등록   , 2 -  바이어등록   
	var REG_PATH = "";
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009" || $("#SESSION_ROLE_ID").val()    == "ROLE010"|| $("#SESSION_ROLE_ID").val()    == "ROLE014")  // 바이어(ROLE009) 
	{   REG_PATH = "2";
	} else {    // 점포
		REG_PATH = "1";
	}
	
	//   바이어 발주생성      
	jQuery.ajax({ 
	    url:"/jobUploadToOrderBuyer.do",           
	    type:"POST",
		datatype:"xml",
		async:true,
		data: {     
		           "REG_PATH"   : REG_PATH
        ,          "STR_CODE"   : $("#STR_CODE").val()
        ,   	   "ITM_GB"     : $("#ITM_GB").val() 
        ,		   "LRG_CODE"   : $("#LRG_CODE").val()
        ,          "CHK_ORDER_PRODUCT" : chkOrderProduct
	    }, 
		success:function(data){   
			 
			if(  data[0].RETURN_CNT == 0)
			{
				alert("처리된 엑셀 발주 확정 건이 없습니다.");
			}	else { 
				if(  data[0].RETURN_CODE  == "0000")
				{   alert("엑셀 발주 확정에 성공 하였습니다");
				} else {
					alert("엑셀 발주 확정에 실패 하였습니다");
				}   
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



function btn_save(){
	     
	
	// 엑셀 업로드와 저장이 한꺼번에 처리 되므로 없앤다.
//	if(! chk_order_day() )
//	{ return;}
//	
//	if(  $('#ORD_DT' ).val() == ""  )
//	{   alert("발주일자를 선택 하세요");
//		$('#ORD_DT' ).focus();
//		return;
//	}
//	 
//	if(  $('#excelFile' ).val() == ""  )
//	{   alert("발주 엑셀파일을 선택 하세요.");
//		$('#excelFile' ).focus();
//		return;
//	}
//	
//	if(EXCEL_LOAD_BIT == "N"  )
//	{   alert('[엑셀업로드] 버튼을 클릭하여 발주데이터를 검증하세요.');
//		return;
//	} 
//	if (confirm("업로드 한  엑셀 발주데이터를 저장 하시겠습니까?") == false){  
//		return;
//	}
	 
	
	// 그리드에 대한 유효성 검사
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
	if(rowCnt.length == 0)
	{   alert("등록된 발주상품이 없습니다.");
		return;
	}
	  
		//	for(var i=0 ; i < rowCnt.length ; i++)
		//	{   
		//		if( typeof gridRoot1.getItemFieldAt( i , "ITM_CODE") == 'undefined' || gridRoot1.getItemFieldAt( i , "ITM_CODE") == '' )
		//		{   alert("하단 그리드의 발주상품(스캔코드)을 등록  하세요");
		//			return;
		//		}
		//		if(  typeof  gridRoot1.getItemFieldAt( i , "ORD_QTY") == 'undefined' || gridRoot1.getItemFieldAt( i , "ORD_QTY") == '0' || gridRoot1.getItemFieldAt( i , "ORD_QTY") == ''  )
		//		{   alert("하단 그리드의 발주수량을 입력 하세요");
		//			return;
		//		} 
		// 엑셀 업로드와 저장을 한번에 하기 때문에, 로드에서 검증시 오류가 았을때   excelBarCodeErr 에 값이 들어간다. 이것을 여기서 처리한다. 
		// 그리드에  바코드 검증 오류 체크      
		//		if(  typeof gridRoot1.getItemFieldAt( i , "ERR_CHK") != 'undefined'   )
		//		{   alert("엑셀데이터에 존재하지 않는 스캔코드가 있습니다. 엑셀을 수정하여 재 업로드 하세요");
		//			return; 
		//		} 
		//	}   
	 
		// 로드시 에러가 나면 excelBarCodeErr에 값이 들어가므로 여기서는 별도의 경고메세지 안뿌리고 바로 리턴한다. 
		// 그러나 유맥의 요청으로 에러가 나도 에러 제외하고 올려달라는 요청이 있어서 주석 처리함
		//	if( excelBarCodeErr  != "")
		//	{
		//		excelBarCodeErr = "";
		//		return;
		//	}
	
	
 
	// 점 명 가져와서 배열에 넣기(형식: 일곡점_10015). 엑셀에서 점명을 가져올 수 없으므로 배열에 담아서 사용.
    var strArray = new Array();
    jQuery.ajax({ 
	    url:"/getStoreInfo.do",            
	    type:"POST",
		datatype:"xml",
 		async:false, 
		success:function(data){  
			var strText = "";
			for( var i = 0 ;  i < data.length ; i++ )
			{   // 점포정보 배열에 넣기
				strArray[i] = data[i].STR_NAME+"_"+data[i].STR_CODE ;  
			} 
	    },
	    complete : function(data) { 
	    },
	    error : function(xhr, status, error) { 
	    }
	});
	
	var rowCnt  = gridRoot1.getCollection().getSource() ; 
	
	var orderStoreDetail    = "";
	for( var i = 0 ;  i < rowCnt.length ; i++ ) 
	{ 
			// 점포수 만큼 루프 돈다.
			var getStrCode 		 = null; 
			for( var k = 1 ;  k < strArray.length+1 ; k++ ) 
			{ 
				// 점포 코드 가져오기
				getStrCode 		 = strArray[k-1].split("_"); 
				 
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
        		
        		var	ORD_DT    = xmlDoc.createElement('ORD_DT');  
        		var	SCAN_CODE  = xmlDoc.createElement('SCAN_CODE'); 
        		var	ITM_GB	  = xmlDoc.createElement('ITM_GB');
        		var	VEN_CODE  = xmlDoc.createElement('VEN_CODE'); 
        		var	PUR_WPRC  = xmlDoc.createElement('PUR_WPRC');
        		var	PUR_WVAT  = xmlDoc.createElement('PUR_WVAT'); 
        		var	STR_CODE  = xmlDoc.createElement('STR_CODE'); 
        		var	ORD_QTY	  = xmlDoc.createElement('ORD_QTY'); 
    			
        		ORD_DT.appendChild(  	xmlDoc.createTextNode(  	gridRoot1.getItemFieldAt( i , "ORD_DT")   	 )	);  
        		SCAN_CODE.appendChild(  xmlDoc.createTextNode(  	gridRoot1.getItemFieldAt( i , "SCAN_CODE")    )	);  
        		ITM_GB.appendChild(  	xmlDoc.createTextNode(  	gridRoot1.getItemFieldAt( i , "ITM_GB")   	 )	); 
        		VEN_CODE.appendChild(  	xmlDoc.createTextNode(  	gridRoot1.getItemFieldAt( i , "VEN_CODE")    )	); 
        		PUR_WPRC.appendChild(  	xmlDoc.createTextNode(  	gridRoot1.getItemFieldAt( i , "PUR_WPRC")    )	); 
        		PUR_WVAT.appendChild(  	xmlDoc.createTextNode(  	gridRoot1.getItemFieldAt( i , "PUR_WVAT")    )	); 
        		STR_CODE.appendChild(  	xmlDoc.createTextNode(  	getStrCode[1]   	 						 )	);
        		ORD_QTY.appendChild(  	xmlDoc.createTextNode(  	gridRoot1.getItemFieldAt(i , "STORENAME"+k)	 )	); 
        		 
        		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT	 ); 
        		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE	 ); 
        		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE ); 
        		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY	 ); 
        		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB	 ); 
        		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE	 ); 
        		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WPRC	 ); 
        		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WVAT	 ); 
        		
        		orderStoreDetail =   getXmlString(   xmlDoc   ) +""+ orderStoreDetail; 
				 
			}
		  
	}
	orderStoreDetail =  "<GRIDLIST>"+orderStoreDetail+"</GRIDLIST>" ;
	 
 
	
	// 업로드 주체가 바이어 인지 점포인지 구분. REG_PATH :   1- 점등록   , 2 -  바이어등록   
	var REG_PATH = "";
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009"  ||  $("#SESSION_ROLE_ID").val()    == "ROLE010"  ||  $("#SESSION_ROLE_ID").val()    == "ROLE014" )  // 바이어(ROLE009) 
	{ 
		REG_PATH = "2";
	} else {    // 점포
		REG_PATH = "1";
	}
	 
 
	 
	
	//  엑셀  발주 저장      
	jQuery.ajax({ 
	    url:"/orderStoreProductExcelRegisterBuyer.do",      
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {    
			       "ORD_DT"             : $('#ORD_DT').val().replace(/-/g, "") 
		,		   "orderStoreDetail"   : orderStoreDetail  
		,          "REG_PATH"           : REG_PATH
		,          "PUR_GB"             : $("#PUR_GB").val() 
	    }, 
		success:function(data){   
			if(  data[0].RETURN_CODE  == "0000")
			{   alert("엑셀   업로드에 성공 하였습니다");
			} else {
				alert("엑셀   업로드에 실패 하였습니다");
			}    
	    },
	    complete : function(data) {
//	    	gridRoot1.removeAll(); 
	    	$('#excelFile').val(""); 
	    	
	    	$('#CFM_YN').val("N");   // 업로드후 조회시 비처리된것을 보여주기 위해서 사용
	    	
	    	btn_search();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
 
	
}
 
//// 발주 삭제
//function orderDel(){
//	
//	selectorColumn2 = gridRoot2.getObjectById("selector2"); 
//	var chkArr = selectorColumn2.getSelectedIndices() ; 
//	
//	if( chkArr.length == 0)
//	{   alert("삭제할 발주 건이 체크되지 않았습니다.");
//		return;
//	}
//	
//	if (confirm("발주 건을 삭제 하시겠습니까?") == false){  
//		return;
//	}
//	
//	var orderDelXml = "";  
//	
//	for(var i = 0; i < chkArr.length ; i++)
//	{  // 발주 삭제 - 슬립넘버를 xml 로  만든다.  
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
//		    orderDelXml = orderDelXml + getXmlString(   xmlDoc   );
//	} 
//	orderDelXml  =  "<GRIDLIST>"+ orderDelXml +"</GRIDLIST>" ; 
//	  
//    //  발주 삭제   
//	jQuery.ajax({ 
//	    url:"/orderDel.do",          // orderStoreProductRegister 
//	    type:"POST",
//		datatype:"xml",
//		async:false,
//		data: {      "orderDelXml"   : orderDelXml       
//	    }, 
//		success:function(data){   
//			if(  data[0].RETURN_CODE  == "0000")
//			{     
//				
//				alert("발주 삭제에 성공 하였습니다");
//				
//			} else {
//				alert("발주 삭제에 실패 하였습니다");
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
 



function btn_del()
{ 
	var selectorColumn = gridRoot1.getObjectById("selector");
	var selectedProduct = selectorColumn.getSelectedIndices();
 
	if( selectedProduct.length == "0" )
	{
		alert('삭제할 상품을 선택 하세요.');
		return;
	}
	 
	for(var i=0; i < selectedProduct.length ; i++) 
	{  
		if(      gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "CFM_YN") ==  "Y"  ) 
		{   alert('발주생성일자(확정)가 존재하는 열은 삭제 할 수 없습니다.');
			return;
		}
	}
	  
	if (confirm("선택 한 상품을 삭제 하시겠습니까?") == false){  
		return;
	}
	  
	for(var i=0; i < selectedProduct.length ; i++) 
	{ 
		jQuery.ajax({ 
	    url:"/orderUploadDelBuyer.do",           
	    type:"POST",
//		datatype:"xml",
//		async:false,
		data: {      "ORD_DT"     : gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "ORD_DT") 
		// ,	 		 "STR_CODE"   : gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "STR_CODE") 
		,	 		 "VEN_CODE"   : gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "VEN_CODE") 
		,            "REG_PATH"   : gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "REG_PATH") 
		,            "SEQ"        : gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "SEQ") 
		,            "SCAN_CODE"  : gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "SCAN_CODE") 
	    }, 
	    beforeSend : function(){ 
            gridRoot1.addLoadingBar(); 
	    }, 
	    success:function(data){   
//			if(  data[0].RETURN_CODE  == "0000")
//			{      
//				alert("발주 삭제에 성공 하였습니다");
//				
//			} else {
//				alert("발주 삭제에 실패 하였습니다");
//			}    
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
	alert("삭제 되었습니다.");
	btn_search();
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
	 
	// 그리드 초기화
	gridRoot1.removeAll();  
	
	// 신규모드로 전환
	crudBit = "C";
	
	//체크박스 초기화
	var selectorColumn = gridRoot1.getObjectById("selector");
	selectorColumn.clearSelection();
  
	$("#VEN_CODE").val("") ;
	$("#VEN_NAME").val("") ;
	
	$("#ITM_NAME").val("") ;
	$("#SCAN_CODE").val("") ; 
	$("#ORD_QTY").val("");
	 
}

function clearVen()
{
	if( $.trim(  $("#VEN_NAME").val() ) == "" )
	{
		$("#VEN_CODE").val("");		
	}	
}

function btn_search(){
	    
	EXCEL_LOAD_BIT = "N";
	   	
	if(  $("#ORD_DT").val() == ""   )
	{   alert("검색할 발주 일자를 선택  하세요.");
		$("#ORD_DT").focus();
		return;
	}
	
	
	var ITM_GB_VAR = "";
	if( $("#REG_PATH").val()  == "1" )  // 발주구분 : 점발주 선택시   ITM_GB 는 생식(1) 로 변환하여 서치한다. 왜냐면 점에서 올린 생식만 보여야 하기 때문에
	{
		ITM_GB_VAR = "1";
	} else {
		
		ITM_GB_VAR =  $("#ITM_GB").val() ;
	}
	  
	// PO_ORDER_UPLOAD 에 있는 데이터 보여주기
	jQuery.ajax({ 
	    url:"/orderUploadSearchBuyer.do",              
	    type:"POST",
		datatype:"xml",
 		async:true,
		data: {  	"ORD_DT"       : $("#ORD_DT").val().replace(/-/g, "")
		,           "REG_PATH"     : $("#REG_PATH").val() 
		,		    "ITM_GB"       : ITM_GB_VAR   //$("#ITM_GB").val() 
		,           "LRG_CODE"     : $("#LRG_CODE").val()
		,           "CFM_YN"       : $("#CFM_YN").val()
		,           "VEN_CODE"     : $("#VEN_CODE").val()
		,           "ROUTE_GB"     : $("#ROUTE_GB").val()
		,           "PUR_GB"       : $("#PUR_GB").val()
		}, 
	    beforeSend : function(){ 
            gridRoot1.addLoadingBar(); 
	    }, 
		success:function(data){ 
			 
			//그리드1 초기화 
			gridRoot1.removeAll( ); 
			
			if(data.length == 0) 
			{ 
//				alert("검색  상품이 존재하지 않습니다.");
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
				var ERR_CHK 		= xmlDoc.createElement('ERR_CHK'); 
				var SEQ 		    = xmlDoc.createElement('SEQ'); 
				var SEQ_NO 		    = xmlDoc.createElement('SEQ_NO'); 
				var REG_PATH 	    = xmlDoc.createElement('REG_PATH'); 
				var STR_CODE 	    = xmlDoc.createElement('STR_CODE');  
				var STR_NAME 	    = xmlDoc.createElement('STR_NAME');  
//				var ITM_CODE		= xmlDoc.createElement('ITM_CODE'); 
				var SCAN_CODE		= xmlDoc.createElement('SCAN_CODE'); 
				var ITM_NAME		= xmlDoc.createElement('ITM_NAME'); 
//				var UNIT_NM 		= xmlDoc.createElement('UNIT_NM'); 
				var IPSU_QTY		= xmlDoc.createElement('IPSU_QTY');  
				var ORD_QTY 		= xmlDoc.createElement('ORD_QTY');  
				var CFM_QTY 		= xmlDoc.createElement('CFM_QTY');    
				var PUR_WPRC		= xmlDoc.createElement('PUR_WPRC'); 
				var PUR_WVAT 	    = xmlDoc.createElement('PUR_WVAT');   
				var VEN_CODE		= xmlDoc.createElement('VEN_CODE'); 
				var VEN_CODE_OLD 	= xmlDoc.createElement('VEN_CODE_OLD'); 
				var VEN_NAME		= xmlDoc.createElement('VEN_NAME');  
				var ORD_DT  		= xmlDoc.createElement('ORD_DT'); 
				var	ITM_GB    		= xmlDoc.createElement('ITM_GB'); 
				var	ITM_GB_NM 		= xmlDoc.createElement('ITM_GB_NM');
				var	CFM_DT 		    = xmlDoc.createElement('CFM_DT');
				var	CFM_YN 		    = xmlDoc.createElement('CFM_YN');
				var	ROUTE_GB        = xmlDoc.createElement('ROUTE_GB'); 
				var	rowState 		= xmlDoc.createElement('rowState');
				var	selector 		= xmlDoc.createElement('selector'); 
				var	PUR_AVR_AMT 	= xmlDoc.createElement('PUR_AVR_AMT');
				var	TAX_GB 			= xmlDoc.createElement('TAX_GB');
				
				var	STORENAME1 		= xmlDoc.createElement('STORENAME1');
				var	STORENAME2 		= xmlDoc.createElement('STORENAME2');
				var	STORENAME3 		= xmlDoc.createElement('STORENAME3');
				var	STORENAME4 		= xmlDoc.createElement('STORENAME4');
				var	STORENAME5 		= xmlDoc.createElement('STORENAME5');
				var	STORENAME6 		= xmlDoc.createElement('STORENAME6');
				var	STORENAME7 		= xmlDoc.createElement('STORENAME7');
				var	STORENAME8 		= xmlDoc.createElement('STORENAME8');
				var	STORENAME9 		= xmlDoc.createElement('STORENAME9');
				var	STORENAME10 	= xmlDoc.createElement('STORENAME10');
				var	STORENAME11 	= xmlDoc.createElement('STORENAME11');
				var	STORENAME12 	= xmlDoc.createElement('STORENAME12');
				var	STORENAME13 	= xmlDoc.createElement('STORENAME13');
				var	STORENAME14 	= xmlDoc.createElement('STORENAME14');
				var	STORENAME15 	= xmlDoc.createElement('STORENAME15');
				var	STORENAME16 	= xmlDoc.createElement('STORENAME16');
				var	STORENAME17 	= xmlDoc.createElement('STORENAME17');
				var	STORENAME18 	= xmlDoc.createElement('STORENAME18'); 
				var	STORENAME19 	= xmlDoc.createElement('STORENAME19'); 
				var	STORENAME20 	= xmlDoc.createElement('STORENAME20');
				STORENAME1.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME1  	    )	);  
				STORENAME2.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME2  	    )	);  
				STORENAME3.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME3  	    )	);  
				STORENAME4.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME4  	    )	);  
				STORENAME5.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME5  	    )	);  
				STORENAME6.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME6  	    )	);  
				STORENAME7.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME7  	    )	);  
				STORENAME8.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME8  	    )	);  
				STORENAME9.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME9  	    )	);  
				STORENAME10.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME10  	    )	);  
				STORENAME11.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME11  	    )	);  
				STORENAME12.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME12  	    )	);  
				STORENAME13.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME13  	    )	);  
				STORENAME14.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME14  	    )	);  
				STORENAME15.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME15  	    )	);  
				STORENAME16.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME16  	    )	);  
				STORENAME17.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME17  	    )	);  
				STORENAME18.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME18  	    )	);  
				STORENAME19.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME19  	    )	);  
				STORENAME20.appendChild(  		xmlDoc.createTextNode( 	data[i].STORENAME20  	    )	);  
    			 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME1			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME2			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME3			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME4			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME5			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME6			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME7			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME8			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME9			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME10			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME11			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME12			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME13			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME14			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME15			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME16			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME17			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME18			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME19			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME20			);
				
				 
				
				rowState.appendChild(  	    xmlDoc.createTextNode( " " 	 					)	);
				selector.appendChild(  	    xmlDoc.createTextNode( ""	 					)	); 
				SEQ.appendChild(  	        xmlDoc.createTextNode(  data[i].SEQ 	 		)	);
				SEQ_NO.appendChild(  	    xmlDoc.createTextNode(  i+1	        			)	);
				REG_PATH.appendChild(  		xmlDoc.createTextNode( 	data[i].REG_PATH  	    )	); 
				ERR_CHK.appendChild(  	    xmlDoc.createTextNode(  ""          			)	);  
				STR_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].STR_NAME  	    )	);
				STR_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].STR_CODE  	    )	); 
//				ITM_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_CODE    	)	);
				SCAN_CODE.appendChild(  	xmlDoc.createTextNode( 	data[i].SCAN_CODE     	)	);
				ITM_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_NAME     	)	);
//				UNIT_NM.appendChild(  		xmlDoc.createTextNode( 	data[i].UNIT       		)	);
				IPSU_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].IPSU_QTY   		)	); 
				ORD_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_QTY       	)	);
				CFM_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].CFM_QTY         )	);
				TAX_GB.appendChild(  		xmlDoc.createTextNode( 	data[i].TAX_GB         )	);
				
				 

				PUR_AVR_AMT.appendChild(  	xmlDoc.createTextNode( 	parseInt(data[i].PUR_WPRC)  + parseInt(data[i].PUR_WVAT )  		)	);   //  단가
 				PUR_WPRC.appendChild(  		xmlDoc.createTextNode( 	data[i].PUR_WPRC   		)	);   //  원가
				PUR_WVAT.appendChild(  		xmlDoc.createTextNode(  data[i].PUR_WVAT     	)	);   // 부가세
				VEN_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_CODE      	)	);
				VEN_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_NAME       	)	); 
				ORD_DT.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_DT        	)	);
				ITM_GB.appendChild(     	xmlDoc.createTextNode(  data[i].ITM_GB			)	); 
    			ITM_GB_NM.appendChild( 	 	xmlDoc.createTextNode(  data[i].ITM_GB_NM		)	); 
    			CFM_DT.appendChild( 	 	xmlDoc.createTextNode(  data[i].CFM_DT			)	); 
    			CFM_YN.appendChild( 	 	xmlDoc.createTextNode(  data[i].CFM_YN			)	); 
    			ROUTE_GB.appendChild( 	 	xmlDoc.createTextNode(  data[i].ROUTE_GB		)	); 
    			VEN_CODE_OLD.appendChild(  	xmlDoc.createTextNode(  data[i].VEN_CODE_OLD	)	); 
    			
    			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE_OLD		);
    			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_AVR_AMT		);
    			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB			);
    			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB_NM		);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_NAME      	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE      	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ERR_CHK      	);   
//				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_CODE      	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE     	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME       	);  
//				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( UNIT_NM       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IPSU_QTY       	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY       	);    
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_QTY        	);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WPRC         );  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WVAT         );    
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE     	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_NAME       	);    
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT          	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ_NO          	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( REG_PATH     	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_DT     		); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_YN     		); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( rowState     	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( selector     	); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ROUTE_GB     	);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TAX_GB       	); 
				 
				gridRoot1.addItemAt(  xmlDoc  , 0 ,false ); 
				 
			} 
			
			
			// 로우스테이트 초기화 하기
			for(var i=0 ; i < data.length ; i++ )
			{ 
				var selectedItem = gridRoot1.getItemAt(i);
				gridRoot1.removeChangedData(selectedItem);
			} 
			dataGrid1.invalidateList();
			
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
	 
	
	//체크박스 초기화
	var selectorColumn = gridRoot1.getObjectById("selector");
	selectorColumn.clearSelection();
	
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
{ 		 if(window.XMLHttpRequest) {//분기하지 않으면 IE에서만 작동된다. 
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
		WSPRC_VAL = PUR_AVR_AMT- Math.round( PUR_AVR_AMT / 11 ) ;  
		WVAT_VAL =    Math.round( PUR_AVR_AMT / 11 ) ; 
		 
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
 	 
	if(newValue == "")    {  return; }   // 선택한 값이 ""  일때  빠져나감
	 
	// 단가 수정
	if( dataField == "PUR_AVR_AMT"  ) {  
		    
		if( typeof gridRoot1.getItemFieldAt(rowIndex , "TAX_GB")   ==   'undefined' )
		{   alert('상품을 선택 하세요.');
			return;			
		}		
		  
		var priceVat = calPriceVat( newValue , gridRoot1.getItemFieldAt( rowIndex , "TAX_GB"  )   );		 
//		gridRoot1.setItemFieldAt( priceVat[0]  				, rowIndex, "PUR_AVR_AMT");     // 단가 
		gridRoot1.setItemFieldAt( priceVat[1]  				, rowIndex, "PUR_WPRC");   		// 대출원가
		gridRoot1.setItemFieldAt( priceVat[2]  				, rowIndex, "PUR_WVAT");     	// 부가세
	 
	}
	 
 
//	// 생식일 때 점포별 수량 수정 시 에만 수행 
//	if( dataField == "STORENAME1"  ) 
//	{   
//		alert( oldValue );  
//		alert( newValue );   
//	
//	}   
//	
//	if( dataField == "STORENAME2"  ) 
//	{   alert("2");  }   
//	if( dataField == "STORENAME3"  ) 
//	{   alert("3");  }   
//	if( dataField == "STORENAME4"  ) 
//	{   alert("4");  }   
//	if( dataField == "STORENAME5"  ) 
//	{   alert("5");  }   
//	if( dataField == "STORENAME6"  ) 
//	{   alert("6");  }   
//	if( dataField == "STORENAME7"  ) 
//	{   alert("7");  }   
//	if( dataField == "STORENAME8"  ) 
//	{   alert("8");  }   
//	if( dataField == "STORENAME9"  ) 
//	{   alert("9");  }   
//	if( dataField == "STORENAME10" ) 
//	{   alert("10");  }   
//	if( dataField == "STORENAME11" ) 
//	{   alert("11");  }   
	
	
	
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
 


function btn_comm_product_search(){
	
	$("#ORD_QTY").focus() ;
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#P_CALLBACK_NM1").val('fn_comm_product_callback(dataRow11)');
	if($("#ITM_NAME").val() != null && $("#ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#ITM_NAME").val());
		btn_comm_search('2');
	}
	  
} 


function fn_comm_product_callback( dataRow ){
	$("#ITM_NAME").val(  dataRow.ITM_NAME  ) ;
	$("#SCAN_CODE").val( dataRow.SCAN_CODE ) ; 
	$("#GRE_GB").val( dataRow.GRE_GB ) ;
	$("#S_ITM_GB").val( dataRow.ITM_GB ) ;
	  
	 
}
 
 
// 상품단건 추가
function btn_itm_add()
{ 
	// 해당 날짜에 저장되어진 것을 미리 조회한다. 
	if( $.trim( $("#SCAN_CODE").val() )  == "" )
	{   alert("추가할 발주 상품을 검색 하세요");
		$("#ITM_NAME").focus();
		return;
	} 
	
	if(   $("#GRE_GB").val()  == "2" )
	{   alert("임대을 상품은 발주 할수없습니다."); 
	   
	    $("#GRE_GB").val("");
	    $("#SCAN_CODE").val("");
	    $("#ITM_NAME").val("");
	    
		return;
	}
	
	if( $.trim( $( "#ORD_QTY" ).val()  )  == ""  ||   $.trim( $( "#ORD_QTY" ).val()  )  == "0" )
	{	alert("발주상품 수량을 입력 하세요");
		$("#ORD_QTY").focus();	
		return; 
	} 
	 
	var rowCnt  = gridRoot1.getCollection().getSource() ;   
//	if(rowCnt.length == 0)
//	{   alert("조회버튼을 눌러 현 날짜의 발주상품을 조회 하세요.");
//		return;
//	}
	
	
	if (  $("#S_ITM_GB").val() != "1"   )  // 비생식일경우 물류 에만 발주된다.
	{
		if (confirm("해당 발주상품은 비생식이므로 물류센터로 발주됩니다.\n["+ $("#PUR_GB option:selected").text()  +"] 등록하시겠습니까?") != true)
		{  
		    return;
	    }
	} else {
		if (confirm("해당 발주상품을 ["+ $("#PUR_GB option:selected").text()  +"] 등록하시겠습니까?") != true)
		{  
		    return;
	    }	
	}
	
	
	
	 
	// 디비에서 해당 추가 발주 상품 검색해서 데이터 가져와서 그리드에 뿌려준다.   
	jQuery.ajax({ 
	    url:"/orderAddItmBuyer.do",      
	    type:"POST",
		datatype:"json",
		async:false,
	 	data: {      "SCAN_CODE"   : $('#SCAN_CODE').val() 
	 		,		 "PUR_GB"      : $('#PUR_GB').val() 
	 	},
		success:function(data){
	   
			if(  data.length == 1 )
			{   // SCAN_CODE   AND  VEN_CODE 가 이미 존재하면 추가 못함. 
				for(var i=0 ; i < rowCnt.length ; i++)
				{   
					if(    gridRoot1.getItemFieldAt( i , "VEN_CODE")  ==  data[0].VEN_CODE  
						&& gridRoot1.getItemFieldAt( i , "SCAN_CODE") ==  $("#SCAN_CODE").val()  
				      )
					{   alert("추가할 거래처 ["+data[0].VEN_NAME+"]의 상품 ["+$("#ITM_NAME").val()+"] 은 이미 등록 되었습니다.");
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
			    var	SEQ_NO		= xmlDoc.createElement('SEQ_NO'); 
				var	SEQ			= xmlDoc.createElement('SEQ');
				var	REG_PATH	= xmlDoc.createElement('REG_PATH');
				var	ERR_CHK		= xmlDoc.createElement('ERR_CHK'); 
				var	ORD_DT		= xmlDoc.createElement('ORD_DT'); 
				var	CFM_DT		= xmlDoc.createElement('CFM_DT');
				var	SCAN_CODE	= xmlDoc.createElement('SCAN_CODE');
				var	ITM_NAME	= xmlDoc.createElement('ITM_NAME');
				var	IPSU_QTY	= xmlDoc.createElement('IPSU_QTY'); 
				var	ITM_GB_NM 	= xmlDoc.createElement('ITM_GB_NM');
				var	ITM_GB		= xmlDoc.createElement('ITM_GB');
				var	ORD_QTY		= xmlDoc.createElement('ORD_QTY'); 
				var	CFM_QTY		= xmlDoc.createElement('CFM_QTY');
				var	PUR_WPRC	= xmlDoc.createElement('PUR_WPRC');
				var	PUR_WVAT	= xmlDoc.createElement('PUR_WVAT');
				var	VEN_CODE	= xmlDoc.createElement('VEN_CODE');

				var	VEN_CODE_OLD	= xmlDoc.createElement('VEN_CODE_OLD');
				var	VEN_NAME	= xmlDoc.createElement('VEN_NAME');
				var	CFM_YN		= xmlDoc.createElement('CFM_YN'); 
				var	ROUTE_GB    = xmlDoc.createElement('ROUTE_GB'); 
				var PUR_AVR_AMT = xmlDoc.createElement('PUR_AVR_AMT');
				var TAX_GB 		= xmlDoc.createElement('TAX_GB');
				
				
				SEQ_NO.appendChild(  	xmlDoc.createTextNode(  "" 										)	); 			
				SEQ.appendChild(  		xmlDoc.createTextNode(  "" 										)	); 				     	
				REG_PATH.appendChild(  	xmlDoc.createTextNode(  $("#REG_PATH").val()    				)	); 				
				ERR_CHK.appendChild(  	xmlDoc.createTextNode(  "" 										)	); 					
				ORD_DT.appendChild(  	xmlDoc.createTextNode(  $("#ORD_DT").val().replace(/-/g, "")  	)	); 					
				CFM_DT.appendChild(  	xmlDoc.createTextNode(  "" 										)	); 					
				SCAN_CODE.appendChild(  xmlDoc.createTextNode(  $("#SCAN_CODE").val()  					)	); 				
				ITM_NAME.appendChild(  	xmlDoc.createTextNode(  $("#ITM_NAME").val()  					)	); 				
				IPSU_QTY.appendChild(  	xmlDoc.createTextNode(  data[0].IPSU_QTY 						)	); 				
				ITM_GB_NM.appendChild(  xmlDoc.createTextNode(  data[0].ITM_GB_NM						)	); 		 	
				ITM_GB.appendChild(  	xmlDoc.createTextNode(  data[0].ITM_GB 							)	); 			 		
				ORD_QTY.appendChild(  	xmlDoc.createTextNode(  $("#ORD_QTY").val()	 					)	); 					
				CFM_QTY.appendChild(  	xmlDoc.createTextNode(  "0" 									)	); 			 	 	
				
				PUR_AVR_AMT.appendChild(xmlDoc.createTextNode(  parseInt(data[0].PUR_WPRC)  + parseInt(data[0].PUR_WVAT)						)	); 
				PUR_WPRC.appendChild(  	xmlDoc.createTextNode(  data[0].PUR_WPRC 						)	); 			 	
				PUR_WVAT.appendChild(  	xmlDoc.createTextNode(  data[0].PUR_WVAT 						)	); 				
				VEN_CODE.appendChild(  	xmlDoc.createTextNode(  data[0].VEN_CODE 						)	); 				
				VEN_NAME.appendChild(  	xmlDoc.createTextNode(  data[0].VEN_NAME 						)	); 				
				CFM_YN.appendChild(  	xmlDoc.createTextNode(  "" 										)	); 					
				ROUTE_GB.appendChild(  	xmlDoc.createTextNode(  data[0].ROUTE_GB 						)	); 					
				TAX_GB.appendChild(  	xmlDoc.createTextNode(  data[0].TAX_GB 						)	); 					
				VEN_CODE_OLD.appendChild(  	xmlDoc.createTextNode(  data[0].VEN_CODE_OLD 						)	); 					
				 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE_OLD    );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_AVR_AMT    );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ_NO    );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ       );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( REG_PATH  );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ERR_CHK   ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT    );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_DT    );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME  );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IPSU_QTY  );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB_NM );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB    );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY   );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_QTY   );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WPRC  );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WVAT  );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE  );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_NAME  );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_YN    ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ROUTE_GB  ); 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TAX_GB  );
				 
				var	STORENAME1 		= xmlDoc.createElement('STORENAME1');
				var	STORENAME2 		= xmlDoc.createElement('STORENAME2');
				var	STORENAME3 		= xmlDoc.createElement('STORENAME3');
				var	STORENAME4 		= xmlDoc.createElement('STORENAME4');
				var	STORENAME5 		= xmlDoc.createElement('STORENAME5');
				var	STORENAME6 		= xmlDoc.createElement('STORENAME6');
				var	STORENAME7 		= xmlDoc.createElement('STORENAME7');
				var	STORENAME8 		= xmlDoc.createElement('STORENAME8');
				var	STORENAME9 		= xmlDoc.createElement('STORENAME9');
				var	STORENAME10 	= xmlDoc.createElement('STORENAME10');
				var	STORENAME11 	= xmlDoc.createElement('STORENAME11');
				var	STORENAME12 	= xmlDoc.createElement('STORENAME12');
				var	STORENAME13 	= xmlDoc.createElement('STORENAME13');
				var	STORENAME14 	= xmlDoc.createElement('STORENAME14');
				var	STORENAME15 	= xmlDoc.createElement('STORENAME15');
				var	STORENAME16 	= xmlDoc.createElement('STORENAME16');
				var	STORENAME17 	= xmlDoc.createElement('STORENAME17');
				var	STORENAME18 	= xmlDoc.createElement('STORENAME18'); 
				var	STORENAME19 	= xmlDoc.createElement('STORENAME19'); 
				var	STORENAME20 	= xmlDoc.createElement('STORENAME20');
				STORENAME1.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME2.appendChild(  		xmlDoc.createTextNode(  $("#ORD_QTY").val()  	    )	);  
				STORENAME3.appendChild(  		xmlDoc.createTextNode(  $("#ORD_QTY").val()  	    )	);  
				STORENAME4.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val()	    	)	);  
				STORENAME5.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME6.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME7.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME8.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME9.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val()	   		)	);  
				STORENAME10.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME11.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME12.appendChild(  		xmlDoc.createTextNode(  $("#ORD_QTY").val()  	    )	);  
				STORENAME13.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME14.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val()  	    )	);  
				STORENAME15.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val()  	    )	);  
				STORENAME16.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val()  	    )	);  
				STORENAME17.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME18.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val()	    	)	);  
				STORENAME19.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
				STORENAME20.appendChild(  		xmlDoc.createTextNode( 	$("#ORD_QTY").val() 	    )	);  
    			 
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME1			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME2			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME3			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME4			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME5			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME6			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME7			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME8			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME9			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME10			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME11			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME12			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME13			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME14			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME15			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME16			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME17			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME18			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME19			);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STORENAME20			);
				 
				gridRoot1.addItemAt(  xmlDoc  , 0 , false);
				girdMoveSelctedIndex(0 , gridRoot1.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기
				   
				// 추가된 상품을 저장한다. 
				// 바로 PO_ORDER_UPLOAD 저장 하기  
				btn_itm_add_save_buyer( data );
				 
				// 로우스테이트 초기화 하기 
				var selectedItem = gridRoot1.getItemAt(0);
				gridRoot1.removeChangedData(selectedItem); 
				dataGrid1.invalidateList();
				
			 
			} else { 
				alert("해당 상품은 취급하지 않거나, 판매중단 된 상품입니다.");
				return;
			}
			 
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	 });
	  
	$("#SCAN_CODE").val();
	$("#ITM_NAME").val();
	$("#ORD_QTY").val();
	$("#S_ITM_GB").val("") ;
}



function btn_itm_add_save_buyer( data )
{
	// 조회된 점포중 수량이 0인것은 제외하고 업로드 한다.
	// 조회된 점포 만큼 for 를 돌린다.
 
	dataGrid = gridRoot1.getDataGrid();
	columns = dataGrid1.getColumns();
	// 점포 시작 컬럼 부터    ~  (점포 시작 컬럼 + 보여줄 전체 점 컬럼) 의 컬럼명 중에서 뒷자리 5자리를 가져온후 , 각각 점별로 insert 한다.
	
	var strCodeArray  = null;
	for( var i = startStrColNum ;  i < startStrColNum + allStrColNum ; i++ ) 
	{ 
//				var strCodeStr = "";
//				for( var i = startStrColNum ;  i < startStrColNum + allStrColNum ; i++ ) 
//				{ 
//				    strCodeArray = columns[i].getHeaderText().split("<br>");
//					strCodeStr = strCodeStr +"|"+  strCodeArray[1];
//				}
	
				strCodeArray = columns[i].getHeaderText().split("<br>");
		   
				// 점포별 PO_ORDER_UPLOAD 에 insert
				jQuery.ajax({ 
				    url:"/orderAddItmSaveBuyer.do",             
				    type:"POST", 
					data: {     "ORD_DT"     :   $("#ORD_DT").val().replace(/-/g, "")     
					, 			"STR_CODE"   :   strCodeArray[1]   
					, 			"REG_PATH"   :   $("#REG_PATH").val()  
					, 			"SCAN_CODE"  :   $("#SCAN_CODE").val()  
					, 			"ORD_QTY"    :   $("#ORD_QTY").val()  
					, 			"ITM_GB"     :   data[0].ITM_GB
					, 			"VEN_CODE"   :   data[0].VEN_CODE
					, 			"PUR_WPRC"   :   data[0].PUR_WPRC
					, 			"PUR_WVAT"   :   data[0].PUR_WVAT  
					, 			"PUR_GB"    :   $("#PUR_GB").val()
				    }, 
				    beforeSend : function(){ 
			            gridRoot1.addLoadingBar(); 
				    }, 
				    success:function(data){   
//						if(  data[0].RETURN_CODE  == "0000")
//						{   alert("상품 추가에  성공 하였습니다");
//							$("#SCAN_CODE").val("");
//							$("#ITM_NAME").val("");
//							$("#ORD_QTY").val("");
//						 	
//						} else {
//							alert("상품 추가에  실패 하였습니다");
//						}    
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
	
    alert("상품 추가에  성공 하였습니다");
	$("#SCAN_CODE").val("");
	$("#ITM_NAME").val("");
	$("#ORD_QTY").val("");
	   		 
}

   


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder2").width($(window).width()-371);
	$("#gridHolder2").height("206px");	
	$(window).on('resize',function (){		
		$("#gridHolder2").width($(window).width()-371);
		$("#gridHolder2").height("206px");			
	});
	
});


// AI 레포트 테스트
function btn_report(report)
{ 
	alert('');
	window.open(report + params,'AIViewer','width=900,height=800,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no')

}





//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################