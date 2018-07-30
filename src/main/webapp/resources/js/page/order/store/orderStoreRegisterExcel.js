/********************************************************
 * 설명: 엑셀발주   관리
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
var excelBarCodeErr = "";
var params = "?reportMode=HTML"; // AIViewer 파라미터

$(document).ready(function(){
	
	// 내용이 다른 같은 이름의 엑셀을 연속  올리면 file 의 change 에서 인식 못하므로 "엑셀 로드" 버튼을 만들고, G_FILE이라는 전역변수를 사용했음 
	$('#excelFile').change(function (e) {
		G_FILE  = e;    
	});
	 
	 
	
	//	getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	); 
	//	// 배송구분에서 R3 는 뺀다.
	//	$("#ROUTE_GB  option[value='R3']").remove(); 
	//	getCommonCodeSelectBoxList("ITM_GB"  ,   "ITM_GB"	);  
	//	getStoreCode("S_STR_CODE");
	
	
	// 수량  - 숫자만 입력받기
	$("#ORD_QTY").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
	

	// 유맥에서 리스트 박스를 전체 / R1 / R2R3 (디폴트) 로 해달라는 요청에 의해  삭제하고 jsp 에서 그냥 박음
//	getCommonCodeSelectBoxList("ROUTE_GB"  ,   "ROUTE_GB"	); 
	
	// CD_STORE 에서 UPTAE_FLAG 가 3인것(물류) 만 가져오기
	getStoreCodeFlag("CENTA_CODE","3");
	
	getCommonCodeSelectBoxList("REG_PATH"  ,   "REG_PATH"	); 
	
	getStoreCode("STR_CODE");
 
	getCateCodeSelectBoxList("LRG_CODE"   , "1" ,  ""   );    // 대 분류     
	
	init();
	 
	// 점포 로그인시 점포 select를 해당 점포만 나오게 한다. 바이어인 경우에는 다나오게 한다.
	// 점 일때는 "엑셀 양식다운로드"(btn_excel_form) 버튼이   나오고,
	// 바이어 일때는 "발주데이터 엑셀 다운로드"(btn_excel_fresh) 버튼이 나오게 해야 한다.	
	// BUYER_CONTENTS 는 조건 절에서 로그인별 분기 처리
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009"  ||  $("#SESSION_ROLE_ID").val()    == "ROLE010")  // 바이어(ROLE009) 로그인시 다보여줌
	{  
		$('#btn_excel_fresh').show(); 
		$('#btn_excel_form').hide(); 
		$("#STR_CODE    option[value!='']").remove(); 
	    
		$('#DIV_ITM_GB_UPLOAD_TITLE').show();
		$('#DIV_ITM_GB_UPLOAD').show();
		
		$('#REG_PATH').val("2");
		 
		if(  $('#ITM_GB_UPLOAD').val() == '9'   )
		{
			$('#DIV_CENTA_CODE_TITLE').show();
			$('#DIV_CENTA_CODE').show();	
		} else {
			$('#DIV_CENTA_CODE_TITLE').hide();
			$('#DIV_CENTA_CODE').hide();
		}
		  
	} else {         // 점포 로그인시 해당 점포만 보여줌, 조회조건의 점포코드도 마찬가지 
		$('#btn_excel_fresh').hide();
		$('#btn_excel_form').show();
		 
		$("#STR_CODE    option[value!='"+$("#SESSION_STR_CODE").val()+"']").remove(); 
		
		// 점포 로그인시 발주구분을 점으로만 해주기
		$("#REG_PATH    option[value!='1']").remove(); 
		 
		$('#DIV_ITM_GB_UPLOAD_TITLE').hide();
		$('#DIV_ITM_GB_UPLOAD').hide();
		
		$('#DIV_CENTA_CODE_TITLE').hide();
		$('#DIV_CENTA_CODE').hide();
	}
	 
  
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
});

 
function chgItmGbUpload()
{ 
	if( $('#ITM_GB_UPLOAD').val() == '9' )
	{   $('#DIV_CENTA_CODE_TITLE').show();
		$('#DIV_CENTA_CODE').show();
	} else {
		$('#DIV_CENTA_CODE_TITLE').hide();
		$('#DIV_CENTA_CODE').hide();
	}
}


function chgPurGb()
{
	$('#excelFile').val(""); 

}



function btn_qty_save()
{ 
	var changedData = gridRoot1.getChangedData();
	if (changedData.length == 0)
	{	
		alert("변경된 데이터가 없습니다");
	} else {
		
		for (var i = 0; i < changedData.length; i++)
		{	 //alert("index:"+changedData[i].idx+"\n"+"job:"+changedData[i].job+"\n"+"data:"+changedData[i].data);
			 
			jQuery.ajax({ 
				    url:"/orderUploadUpdate.do",       //  orderUploadDel    
				    type:"POST",
//					datatype:"xml",
//					async:false,
					data: {      "ORD_DT"     : gridRoot1.getItemFieldAt( changedData[i].idx , "ORD_DT")
					,	 		 "STR_CODE"   : gridRoot1.getItemFieldAt( changedData[i].idx , "STR_CODE")
					,            "REG_PATH"   : gridRoot1.getItemFieldAt( changedData[i].idx , "REG_PATH")
					,            "SEQ"        : gridRoot1.getItemFieldAt( changedData[i].idx , "SEQ") 
					,            "SCAN_CODE"  : gridRoot1.getItemFieldAt( changedData[i].idx , "SCAN_CODE")
					,			 "ORD_QTY"    : gridRoot1.getItemFieldAt( changedData[i].idx , "ORD_QTY")
					,            "VEN_CODE"   : gridRoot1.getItemFieldAt( changedData[i].idx , "VEN_CODE")
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
		 	 
		}
		 
		alert("데이터가 수정 되었습니다.");
		
	}
	
}

function buyer_fresh_upload(e)
{
	    // 발주 수량과 확정 수량는 디폴트로 편집 불가임. 발주 수량 셀  편집 불가, 확정 수량 편집 가능
	    var CFM_QTY_COL = gridRoot1.getObjectById("CFM_QTY");//컬럼의 id 속성으로 설정된 값
	    CFM_QTY_COL.editable = true; 
	    var files = e.target.files;
	    var i, f; 
	    for (i = 0, f = files[i]; i != files.length; ++i) { 
	        var reader = new FileReader();
	        var name = f.name;
	        reader.onload = function (e) {
	            var data = e.target.result; 
	            var result = 0;
	//            var workbook = XLSX.read(data, { type: 'binary' });  // XLS 파일은 인식 못하므로 아래와 같이 사용했음
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
	            // 두번째 열의 첫 번째 셀 값 가져 오기
	            if( typeof result.length == 'undefined' )   
	            {   alert("업로드한 엑셀에 발주데이터가 존재 하지 않습니다.");
	         	   return; 
	            }
	           
	            if( typeof result[0].BAR_CODE == 'undefined'  || typeof result[0].ORD_QTY == 'undefined' )
	            { 	alert("[ 엑셀양식 오류 ]\n업로드 엑셀의 첫 행은  BAR_CODE  과   QTY  이어야 합니다.\n첫행을   BAR_CODE  과   QTY  로 바꾸고 업로드 하거나, 양식을 다운로드 하여 사용하세요 ");
	     	   		return;  
	            }
	            
	            var num_check  		 =/^[0-9]*$/; 
	            var errStrBarCode     = "";
	            var errStrFreshBarCode     = ""; 
	            var errStrBarCodeDup  = "";
	            var errStrCfmQty      = "";
	            var errStrVenCode     = "";
	            var errStrStrCode     = "";
	            var errStrPurWprc     = "";
	            var errStrPurWvat     = "";
	            var errCnt            = 0;
	            var rowNum 			 = 0;
	            var barCodeString     = "";
	            for( var i = 0 ;  i < result.length ; i++ )   // result : 헤더 한줄 제외하고 읽는다.
	            {
	         	   // STR_CODE별 BAR_CODE중복 체크 위하여,  STR_CODE+BAR_CODE 결합. 중간에  "_"주기
	         	   barCodeString = result[i].STR_CODE+""+result[i].BAR_CODE + "_" + barCodeString; 
	            } 
	            
	            for( var i = 0 ;  i < result.length ; i++ )   // result : 헤더 한줄 제외하고 읽는다.
	            {     
	         	   // 확정수량 유효성 검증 
	         	   var CFM_QTY_VAL = $.trim( result[i].CFM_QTY.replace(/,/g, "") ); 
	         	   if( ! num_check.test( CFM_QTY_VAL )  
	         			   || CFM_QTY_VAL == 0  
	         			   || typeof CFM_QTY_VAL == 'undefined'
	         			   || CFM_QTY_VAL.length  >= 10 
	         	   )
	         	   {   rowNum = i + 2 ;
	         		   errCnt = errCnt + 1;
	         		   errStrCfmQty = errStrCfmQty +"확정수량 "+ rowNum + " 번째 열에  문자, 공백, 0 이 있거나, 숫자가 너무 큽니다.\n"; 
	         	   } 
	         	    
	         	   // 점포 코드 유효성 검증
	         	   var STR_CODE_VAL = $.trim( result[i].STR_CODE.replace(/,/g, "") ); 
	         	   if(      ! num_check.test( STR_CODE_VAL )  
	         			   || STR_CODE_VAL == 0  
	         			   || typeof STR_CODE_VAL == 'undefined'
	         			   || STR_CODE_VAL.length  != 5 
	         	   )
	         	   {   rowNum = i + 2 ;
	         		   errCnt = errCnt + 1;
	         		   errStrStrCode = errStrStrCode +"점포 코드 "+ rowNum + " 번째 열에  문자, 공백, 0 이 있거나, 5자리를 초과합니다.\n";  
	         	   }  
	         	   
	         	   // 협력업체 코드 유효성 검증 
	         	   var VEN_CODE_VAL = result[i].VEN_CODE;
	         	   if( typeof VEN_CODE_VAL == 'undefined' )
	         	   {  VEN_CODE_VAL = "";  }
	         	   VEN_CODE_VAL = $.trim( VEN_CODE_VAL.replace(/,/g, "") );
	         	   if(      ! num_check.test( VEN_CODE_VAL )  
	         			   || VEN_CODE_VAL == 0  
	         			   || VEN_CODE_VAL == ''
	         		       || VEN_CODE_VAL.length  > 6    
	         		)
	         	   {   rowNum = i + 2 ;
	         		   errCnt = errCnt + 1;
	         		   errStrVenCode = errStrVenCode +"협력업체 코드 "+ rowNum + " 번째 열에  문자, 공백, 0 이 있거나, 6자리를 초과합니다.\n";  
	         	   }  
	         	   
		               // 단가 유효성 검증
	         	   var PUR_WPRC_VAL = $.trim( result[i].PUR_WPRC.replace(/,/g, "") ); 
	         	   if(      ! num_check.test( PUR_WPRC_VAL )  
	         			   || PUR_WPRC_VAL         == 0  
	         			   || typeof PUR_WPRC_VAL  == 'undefined'
	         			   || PUR_WPRC_VAL.length  >= 13 
	         	   )
	         	   {   rowNum = i + 2 ;
	         		   errCnt = errCnt + 1;
	         		   errStrPurWprc = errStrPurWprc +"단가 "+ rowNum + " 번째 열에  문자, 공백, 0 이 있거나, 숫자가 너무 큽니다.\n";  
	         	   } 
	         	   
	         	   // 부가세 유효성 검증
	         	   var PUR_WVAT_VAL = $.trim( result[i].PUR_WVAT.replace(/,/g, "") );
	         	   if( 	    ! num_check.test( PUR_WVAT_VAL )   
	         			   || typeof PUR_WVAT_VAL   == 'undefined'
	         			   || PUR_WVAT_VAL.length   >= 13 
	         	   )
	         	   {   rowNum = i + 2 ;
	         		   errCnt = errCnt + 1;
	         		   errStrPurWvat = errStrPurWvat +"부가세 "+ rowNum + " 번째 열에  문자, 공백 이 있거나, 숫자가 너무 큽니다.\n";  
	         	   }  
	            }   
	           
	            if(errCnt != 0)
	            {     
	         	   if(errStrBarCodeDup != "")
	         	   {    prompt("다음의 스캔코드가 중복 됩니다.", errStrBarCodeDup  );    } 
	                
	         	   
	         	   if(       errStrBarCode      != ""
	         		      || errStrFreshBarCode != ""
		         		  || errStrBarCodeDup   != ""
		         		  || errStrStrCode      != ""
		         		  || errStrVenCode      != ""
		         		  || errStrCfmQty       != ""
		         		  || errStrPurWprc      != ""
		         		  || errStrPurWvat      != ""
	         	   )
	         	   {     alert( "[엑셀 오류]"
		             		   +"\n"+ errStrBarCode 
		             		   +"\n"+ errStrFreshBarCode
		             		   +"\n"+ errStrBarCodeDup  
		             		   +"\n"+ errStrStrCode 
		             		   +"\n"+ errStrVenCode 
		             		   +"\n"+ errStrCfmQty
		             		   +"\n"+ errStrPurWprc 
		             		   +"\n"+ errStrPurWvat  
		                );
	         	   } 
	            } else { 
	         	    //  DB 로 던지기 위해 XML 로 변경하는 작업
	         	    var excelLoadProduct = ""; 
	         		for( var i = 0 ;  i < result.length ; i++ ) 
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
			                		var	STR_CODE  = xmlDoc.createElement('STR_CODE');
			                		var	STR_NAME  = xmlDoc.createElement('STR_NAME');
			                		var	BAR_CODE  = xmlDoc.createElement('BAR_CODE');
			                		var	ITM_NAME  = xmlDoc.createElement('ITM_NAME');
			                		var	ORD_QTY	  = xmlDoc.createElement('ORD_QTY'); 
			                		var	CFM_QTY	  = xmlDoc.createElement('CFM_QTY'); 
			                		var	VEN_CODE  = xmlDoc.createElement('VEN_CODE');
			                		var	VEN_NAME  = xmlDoc.createElement('VEN_NAME');
			                		var	PUR_WPRC  = xmlDoc.createElement('PUR_WPRC');
			                		var	PUR_WVAT  = xmlDoc.createElement('PUR_WVAT');
			                		var	IDATE	  = xmlDoc.createElement('IDATE');   
			                		var	IEMP_NO	  = xmlDoc.createElement('IEMP_NO'); 
			                		var	USER_NM   = xmlDoc.createElement('USER_NM'); 
			            			var	ORD_DT    = xmlDoc.createElement('ORD_DT');   
			            			 
			            			STR_CODE.appendChild(  xmlDoc.createTextNode(  result[i].STR_CODE	)	); 
			            			STR_NAME.appendChild(  xmlDoc.createTextNode(  result[i].STR_NAME 	)	); 
			            			BAR_CODE.appendChild(  xmlDoc.createTextNode(  result[i].BAR_CODE 	)	); 
			            			ITM_NAME.appendChild(  xmlDoc.createTextNode(  result[i].ITM_NAME 	)	); 
			            			ORD_QTY.appendChild(   xmlDoc.createTextNode(  result[i].ORD_QTY   	)	); 
			            			CFM_QTY.appendChild(   xmlDoc.createTextNode(  result[i].CFM_QTY 	)	); 
			            			VEN_CODE.appendChild(  xmlDoc.createTextNode(  result[i].VEN_CODE 	)	); 
			            			VEN_NAME.appendChild(  xmlDoc.createTextNode(  result[i].VEN_NAME 	)	); 
			            			PUR_WPRC.appendChild(  xmlDoc.createTextNode(  result[i].PUR_WPRC.replace(/,/g, "") 	)	); 
			            			PUR_WVAT.appendChild(  xmlDoc.createTextNode(  result[i].PUR_WVAT.replace(/,/g, "") 	)	); 
			            			IDATE.appendChild(     xmlDoc.createTextNode(  result[i].IDATE   	)	); 
			            			IEMP_NO.appendChild(   xmlDoc.createTextNode(  result[i].IEMP_NO  	)	); 
			            			USER_NM.appendChild(   xmlDoc.createTextNode(  result[i].USER_NM  	)	); 
			            			ORD_DT.appendChild(    xmlDoc.createTextNode(  $("#ORD_DT").val().replace(/-/g, "")      )	);
			            			   
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_NAME	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BAR_CODE	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_QTY	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_NAME	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WPRC	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WVAT	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IDATE	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IEMP_NO	);
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( USER_NM	); 
			            			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT 	);
			            			 
			            			excelLoadProduct = excelLoadProduct + getXmlString(   xmlDoc   );
	         		} 
		            	excelLoadProduct  =  "<GRIDLIST>"+ excelLoadProduct +"</GRIDLIST>" ; 
		                 
		            	// 엑셀 (excelLoadProduct)의 발주 데이터를 DB 로 넘겨 , 상품 정보를 조회후 그리드에 출력하기
	             	jQuery.ajax({ 
	         	    url:"/excelDataLoadBuyer.do",            
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
	         				 
	         				var priceVat = calPriceVat( data[i].PUR_WPRC , data[i].TAX_GB       );	 
	         				PUR_WPRC.appendChild(  		xmlDoc.createTextNode( 		priceVat[1]  		)	);   // 대출원가
	         				PUR_WVAT.appendChild(  		xmlDoc.createTextNode(      priceVat[2]     	)	);   // 부가세
	         				VEN_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_CODE      	)	);
	         				VEN_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_NAME       	)	); 
	         				ORD_DT.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_DT        	)	);
	         				ITM_GB.appendChild(     	xmlDoc.createTextNode(  data[i].ITM_GB			)	); 
		            		ITM_GB_NM.appendChild( 	 	xmlDoc.createTextNode(  data[i].ITM_GB_NM		)	); 
		            		CFM_DT.appendChild( 	 	xmlDoc.createTextNode(  ""	     	)	); 
	
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
	         				
	         				gridRoot1.addItemAt(  xmlDoc  , i ,false ); 
	         			} 
//	         			var excelBarCodeErr = "";
	         			for(var i=0 ; data.length > i  ; i++ )
	         			{   // 상품명이 없을경우, 즉 바코드가 존재 안할때 ... (undefined) 확인란에 빨간색으로 표기 
	         				if(     gridRoot1.getItemFieldAt( i , "ITM_NAME")  == "undefined"   
	         					||  gridRoot1.getItemFieldAt( i , "ITM_NAME")         == ""   )
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
	         				prompt("아래 보이는 엑셀 라인의  스캔코드는 DB에 존재 하지 않습니다.\n오류 데이터를 제거하고 업로드 하십시요!", excelBarCodeErr ); 
	         			}
	         			
	         			dataGrid1.setEnabled(true);
	         	    	gridRoot1.removeLoadingBar();
	         	    },
	         	    complete : function(data) { 
	         	    	

            	    	// PO_ORDER_UPLOAD 에 저장
            	    	btn_save();
            	    	
	         	    },
	         	    error : function(xhr, status, error) {
	         	    	dataGrid1.setEnabled(true);
	         	    	gridRoot1.removeLoadingBar();
	         	    	CommonJs.alertErrorStatus(xhr.status, error);
	         	    }
	         	});
		                  
	            } 
	        };
	        reader.readAsArrayBuffer(f);
	    }
}


function buyer_non_fresh_upload(e)   // 바이어 R1 비생식
{ 
    // 발주 수량과 확정 수량는 디폴트로 편집 불가임. 발주 수량 셀  편집 가능, 확정 수량  셀  편집 불가
    var ORD_QTY_COL = gridRoot1.getObjectById("ORD_QTY");//컬럼의 id 속성으로 설정된 값
    ORD_QTY_COL.editable = true; 
    var files = e.target.files;
    var i, f; 
    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            var data = e.target.result; 
            var result = 0;
            // var workbook = XLSX.read(data, { type: 'binary' });
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
            
            if( typeof result[0].BAR_CODE == 'undefined'  || typeof result[0].QTY == 'undefined' )
            { 	alert("[ 엑셀양식 오류 ]\n업로드 엑셀의 첫 행은  BAR_CODE  과   QTY  이어야 합니다.\n첫행을   BAR_CODE  과   QTY  로 바꾸고 업로드 하거나, 양식을 다운로드 하여 사용하세요 ");
     	   		return;  
            }
            
            var num_check  		 =/^[0-9]*$/;
            var errStrBarCode     = "";
            var errStrFreshBarCode ="";
            var errStrBarCodeDup  = "";
            var errStrQty         = "";
            var errCnt            = 0;
            var rowNum 			  = 0;
            var barCodeString     = "";
            for( var i = 0 ;  i < result.length ; i++ )   // result : 헤더 한줄 제외하고 읽는다.
            {
         	   // 바코드 중복 체크 위하여 바코드 결합. 중간에  "_"주기
         	   barCodeString = result[i].BAR_CODE + "_" + barCodeString; 
            } 
            for( var i = 0 ;  i < result.length ; i++ )   // result : 헤더 한줄 제외하고 읽는다.
            {     
            	
               var BAR_CODE_TEMP = result[i].BAR_CODE.toString();
               BAR_CODE_TEMP = BAR_CODE_TEMP.trim();
 	   		   if(   num_check.test( BAR_CODE_TEMP ) &&   BAR_CODE_TEMP.length == 13   )
 	   		   {
 	   			   
 	   		   } else {  
        		   rowNum = i + 2 ;
        		   errCnt = errCnt + 1; 
        		   errStrBarCode = errStrBarCode +"스캔코드 "+ rowNum + " 번째 열에  문자, 공백, 길이(13자리 )가 맞지 않습니다.\n"; 
        	   }
         	    
         	   // 수량 유효성 검증 
         	   var QTY_VAL = "";
         	   if(  typeof   result[i].QTY    == "undefined"   )
         	   {    QTY_VAL = "";
         	   } else {                              
         		    QTY_VAL = $.trim( result[i].QTY.replace(/,/g, "") ); 
         	   } 
         	   if(      ! num_check.test( QTY_VAL )  
         			   || QTY_VAL 			== 0
         			   || QTY_VAL 			== ""
         			   || QTY_VAL.length    >= 13 
         		)
         	   {   rowNum = i + 2 ;
         		   errCnt = errCnt + 1;
         		   errStrQty = errStrQty +"수량 "+ rowNum + " 번째 열에  문자, 공백, 0 이 있거나, 숫자가 너무 큽니다.\n"; 
         	   } 
         	    
         	   // 바코드 중복 검사  <- 위에서 문자열로 만든것에서 첫번째 중복 지우고도, 또 중복되면 중복에러를 발생한다.
         	   barCodeString = barCodeString.replace( result[i].BAR_CODE , ""); 
         	   if(barCodeString.indexOf( result[i].BAR_CODE ) != -1)
         	   { 
         		   	   rowNum = i + 2 ;
	        		   errCnt = errCnt + 1;
	        		   errStrBarCodeDup = errStrBarCodeDup +  result[i].BAR_CODE + ", ";  
         	   } 
            }  
            if(errCnt != 0)
            {   
         	   if(errStrBarCodeDup != "")
         	   {
         		   prompt("다음의 스캔코드가 중복 됩니다.", errStrBarCodeDup );     
         	   }
                
         	   if(
         			    errStrBarCode        != ""
         			 || errStrFreshBarCode   != ""
         			 || errStrQty            != ""
         	   )
         		{ 
	                alert( "[엑셀 오류]"
	             		   +"\n"+ errStrBarCode 
	             		   +"\n"+ errStrFreshBarCode
	             		   +"\n"+ errStrQty 
	                );
         	   }
            } else { 
         	    // DB 로 던지기 위해 XML 로 변경 하는 작업 
         	    var excelLoadProduct = ""; 
         		for( var i = 0 ;  i < result.length ; i++ ) 
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
		                		 var	STR_CODE	  = xmlDoc.createElement('STR_CODE'); 
		            			 var	BAR_CODE	  = xmlDoc.createElement('BAR_CODE'); 
		            			 var	QTY  		  = xmlDoc.createElement('QTY'); 
		            			 var	ORD_DT  	  = xmlDoc.createElement('ORD_DT'); 
		            			 
		            			 var BAR_CODE  = result[i].BAR_CODE.trim() ;
		            			 STR_CODE.appendChild(  xmlDoc.createTextNode(  $("#STR_CODE").val()    )	); 
		            			 BAR_CODE.appendChild(  xmlDoc.createTextNode(  BAR_CODE      )	); 
		            			 QTY.appendChild(  		xmlDoc.createTextNode(  result[i].QTY    	    )	); 
		            			 ORD_DT.appendChild(    xmlDoc.createTextNode(  $("#ORD_DT").val().replace(/-/g, "")      )	);
		            			 
		            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE );
		            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BAR_CODE );
		            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( QTY );
		            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT );
		            			 
		            			 excelLoadProduct = excelLoadProduct + getXmlString(   xmlDoc   );
         		} 
	            	excelLoadProduct  =  "<GRIDLIST>"+ excelLoadProduct +"</GRIDLIST>" ; 
	                     
	            	// 엑셀 (excelLoadProduct)의 점 발주 데이터를 DB 로 넘겨 , 상품 정보를 조회후 그리드에 출력하기
             	jQuery.ajax({ 
         	    url:"/excelDataLoadBuyerR1.do",             //excelDataLoad.do       
         	    type:"POST",
         		datatype:"xml",
         		async:false,
         		beforeSend : function(){ 
                     gridRoot1.addLoadingBar(); 
         	    }, 
         		data: {     "STR_CODE"    : $("#CENTA_CODE").val()
         		,           "ORD_DT"      :	$("#ORD_DT").val().replace(/-/g, "")
         		,			"EXCEL_DATA"  : excelLoadProduct   },
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
         				var ERR_CHK 		= xmlDoc.createElement('ERR_CHK'); 
         				var SEQ 		    = xmlDoc.createElement('SEQ');  
         				var SEQ_NO 		    = xmlDoc.createElement('SEQ_NO');  
         				var REG_PATH 	    = xmlDoc.createElement('REG_PATH');  
         				var STR_CODE		= xmlDoc.createElement('STR_CODE'); 
         				var STR_NAME		= xmlDoc.createElement('STR_NAME');
         				var ITM_CODE		= xmlDoc.createElement('ITM_CODE'); 
         				var SCAN_CODE		= xmlDoc.createElement('SCAN_CODE'); 
         				var ITM_NAME		= xmlDoc.createElement('ITM_NAME');  
         				var IPSU_QTY		= xmlDoc.createElement('IPSU_QTY');  
         				var ORD_QTY 		= xmlDoc.createElement('ORD_QTY');  
         				var CFM_QTY 		= xmlDoc.createElement('CFM_QTY');    
         				var PUR_WPRC		= xmlDoc.createElement('PUR_WPRC'); 
         				var PUR_WVAT 		= xmlDoc.createElement('PUR_WVAT');  
         				var VEN_CODE		= xmlDoc.createElement('VEN_CODE'); 
         				var VEN_NAME		= xmlDoc.createElement('VEN_NAME');  
         				var ORD_DT  		= xmlDoc.createElement('ORD_DT'); 
         				var	ITM_GB    		= xmlDoc.createElement('ITM_GB'); 
         				var	ITM_GB_NM 		= xmlDoc.createElement('ITM_GB_NM');
         				var	CFM_DT 		    = xmlDoc.createElement('CFM_DT');
         				    
         				SEQ.appendChild(  	        xmlDoc.createTextNode(  data[i].SEQ     		)	);
         				SEQ_NO.appendChild(  	    xmlDoc.createTextNode(  i+1	        			)	);
         				REG_PATH.appendChild(  	    xmlDoc.createTextNode(  data[i].REG_PATH        )	); 
         				ERR_CHK.appendChild(  	    xmlDoc.createTextNode(  ""          			)	); 
         				STR_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].STR_CODE     	)	);
         				STR_NAME.appendChild(  		xmlDoc.createTextNode( $("#CENTA_CODE option:selected").text()	)	);
         				ITM_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_CODE   	)	);
         				SCAN_CODE.appendChild(  	xmlDoc.createTextNode( 	data[i].SCAN_CODE     	)	);
         				ITM_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_NAME     	)	); 
         				IPSU_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].IPSU_QTY   		)	); 
         				ORD_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_QTY       	)	);
         				CFM_QTY.appendChild(  		xmlDoc.createTextNode( 	"0"				        )	);
         				 
         				var priceVat = calPriceVat( data[i].PUR_WPRC , data[i].TAX_GB       );	
         				PUR_WPRC.appendChild(  		xmlDoc.createTextNode( 	priceVat[1]  		    )	);   // 대출원가
         				PUR_WVAT.appendChild(  		xmlDoc.createTextNode( 	priceVat[2]      		)	);   // 부가세
         				VEN_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_CODE     	)	);
         				VEN_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_NAME    	)	); 
         				ORD_DT.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_DT       	)	);
         				ITM_GB.appendChild(     	xmlDoc.createTextNode(  data[i].ITM_GB			)	); 
	            		ITM_GB_NM.appendChild(  	xmlDoc.createTextNode(  data[i].ITM_GB_NM		)	); 
	            		CFM_DT.appendChild(  	    xmlDoc.createTextNode(  ""		)	); 
	            			
	            			
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ERR_CHK      	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE       	); 
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_NAME       	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_CODE      	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE     	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME       	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IPSU_QTY       	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY       	);    
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_QTY        	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WPRC        	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WVAT        	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE     	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_NAME       	);    
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT          	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ          	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ_NO          	);  
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( REG_PATH     	);   
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB			);
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB_NM		);
         				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_DT	    	);
         					            			
         				gridRoot1.addItemAt(  xmlDoc  , i ,false); 
         			}
//         			var excelBarCodeErr = "";
         			for(var i=0 ; i < data.length ; i++ )
         			{   // 상품명이 없을경우, 즉 바코드가 존재 안할때 ... (undefined) 확인란에 빨간색으로 표기 
         				if(     gridRoot1.getItemFieldAt( i , "ITM_NAME")  == "undefined"    
         					||  gridRoot1.getItemFieldAt( i , "ITM_NAME")  == ""   )
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
         	    	btn_save();
         	    	
         	    },
         	    error : function(xhr, status, error) {
         	    	dataGrid1.setEnabled(true);
         	    	gridRoot1.removeLoadingBar();
         	    	CommonJs.alertErrorStatus(xhr.status, error);
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
	 
	 // 바이어(ROLE009) 로그인 시
	 if( $("#SESSION_ROLE_ID").val()    == "ROLE009" ||  $("#SESSION_ROLE_ID").val()    == "ROLE010")  
	 { 
			 if(   $("#ITM_GB_UPLOAD").val() == "1") // 바이어 생식 업로드
			 {
				 buyer_fresh_upload(e);
				 
			 } else {   // 바이어 R1 비생식 업로드
				 
				 buyer_non_fresh_upload(e);
				 
			 }
		   
	 } else {  // 점포 로그인 : 점에서만 로그인해서 사용하므로 이것만 쓴다.
		  
			   // 발주 수량과 확정 수량는 디폴트로 편집 불가임. 발주 수량 셀  편집 가능, 확정 수량  셀  편집 불가
			   var ORD_QTY_COL = gridRoot1.getObjectById("ORD_QTY");//컬럼의 id 속성으로 설정된 값
			   ORD_QTY_COL.editable = true;
		  
		       //Get the files from Upload control
		       var files = e.target.files;
		       var i, f;
		       //Loop through files
		       for (i = 0, f = files[i]; i != files.length; ++i) {
		           var reader = new FileReader();
		           var name = f.name;
		           reader.onload = function (e) {
		               var data = e.target.result; 
		               var result = 0;
//		               var workbook = XLSX.read(data, { type: 'binary' });
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
		               //Get the first column first cell value 
		               if( typeof result.length == 'undefined' )   
		               {   alert("업로드한 엑셀에 발주데이터가 존재 하지 않습니다.");
		            	   return; 
		               }
		               
		               if( typeof result[0].BAR_CODE == 'undefined'  || typeof result[0].QTY == 'undefined' )
		               { 	alert("[ 엑셀양식 오류 ]\n업로드 엑셀의 첫 행은  BAR_CODE  과   QTY  이어야 합니다.\n첫행을   BAR_CODE  과   QTY  로 바꾸고 업로드 하거나, 양식을 다운로드 하여 사용하세요 ");
		        	   		return;  
		               }
		               
		               var num_check  		 =/^[0-9]*$/;
		               var errStrBarCode     = "";
		               var errStrFreshBarCode ="";
		               var errStrBarCodeDup  = "";
		               var errStrQty         = "";
		               var errCnt            = 0;
		               var rowNum 			 = 0;
		               var barCodeString     = "";
		               for( var i = 0 ;  i < result.length ; i++ )   // result : 헤더 한줄 제외하고 읽는다.
		               {
		            	   // 바코드 중복 체크 위하여 바코드 결합. 중간에  "_"주기
		            	   barCodeString = result[i].BAR_CODE + "_" + barCodeString; 
		               } 
		               for( var i = 0 ;  i < result.length ; i++ )   // result : 헤더 한줄 제외하고 읽는다.
		               {    
		            	   // 일반 바코드 유효성 검증
//		            	   if( ! num_check.test( result[i].BAR_CODE ) || ( result[i].BAR_CODE.length != 13 )   )
//		            	   {   rowNum = i + 2 ;
//		            		   errCnt = errCnt + 1;
//		            		   errStrBarCode = errStrBarCode +"바코드 "+ rowNum + " 번째 열에  문자, 공백, 길이(13자리)가 맞지 않습니다.\n"; 
//		            	   }
		            	  
		            	   var BAR_CODE_TEMP = result[i].BAR_CODE.toString();
		            	   BAR_CODE_TEMP = BAR_CODE_TEMP.trim(); 
		            	   if(   num_check.test( BAR_CODE_TEMP ) 
		  	            		 && ( BAR_CODE_TEMP.length == 13   ||  BAR_CODE_TEMP.length == 6 )  
		  	            	   )
		  	            	   { 
		  	            		   // 생식(6자리) 일경우 맨앞 두자리는 20이어야 한다.
		  	            		   if( BAR_CODE_TEMP.length == 6 )
		  	            		   { 
		  	            			   if( BAR_CODE_TEMP.substr(0, 2) != "20" )
		  	            			   {   rowNum = i + 2 ;
		  	    	            		   errCnt = errCnt + 1;
		  	            				   errStrFreshBarCode = errStrFreshBarCode +"생식 스캔코드 "+ rowNum + " 번째 열은   반드시 20으로 시작하여야 합니다.\n"; 
		  	            			   }
		  	            		   } 
		  	            		   
		  	            	   } else  {  
		  	            		   rowNum = i + 2 ;
		  	            		   errCnt = errCnt + 1; 
		  	            		   errStrBarCode = errStrBarCode +"스캔코드 "+ rowNum + " 번째 열에  문자, 공백, 길이(13자리,생식6자리)가 맞지 않습니다.\n"; 
		  	            	   }
		            	    
		            	   // 수량 유효성 검증 
		            	   var QTY_VAL = "";
		            	   if(  typeof   result[i].QTY    == "undefined"   )
		            	   {    QTY_VAL = "";
		            	   } else {                              
		            		    QTY_VAL = $.trim( result[i].QTY.replace(/,/g, "") ); 
		            	   } 
		            	   if(      ! num_check.test( QTY_VAL )  
		            			   || QTY_VAL 			== 0
		            			   || QTY_VAL 			== ""
		            			   || QTY_VAL.length    >= 13 
		            		)
		            	   {   rowNum = i + 2 ;
		            		   errCnt = errCnt + 1;
		            		   errStrQty = errStrQty +"수량 "+ rowNum + " 번째 열에  문자, 공백, 0 이 있거나, 숫자가 너무 큽니다.\n"; 
		            	   } 
		            	    
		            	   // 바코드 중복 검사  <- 위에서 문자열로 만든것에서 첫번째 중복 지우고도, 또 중복되면 중복에러를 발생한다.
		            	   barCodeString = barCodeString.replace( result[i].BAR_CODE , ""); 
		            	   if(barCodeString.indexOf( result[i].BAR_CODE ) != -1)
		            	   { 
		            		   rowNum = i + 2 ;
			        		   errCnt = errCnt + 1;
			        		   errStrBarCodeDup = errStrBarCodeDup +  result[i].BAR_CODE + ", ";  
		            	   } 
		               }  
		               if(errCnt != 0)
		               {   
		            	   if(errStrBarCodeDup != "")
		            	   {
		            		   prompt("다음의 스캔코드가 중복 됩니다.", errStrBarCodeDup );     
		            	   }
			               if(
			            		     errStrBarCode        != ""
			            		 ||  errStrFreshBarCode   != ""
			            		 ||  errStrQty            != ""
			               )    
			               {   alert( "[엑셀 오류]"
			                		   +"\n"+ errStrBarCode 
			                		   +"\n"+ errStrFreshBarCode
			                		   +"\n"+ errStrQty 
			                   );
			               }
		               } else { 
		            	    // DB 로 던지기 위해 XML 로 변경 하는 작업 
		            	    var excelLoadProduct = ""; 
		            		for( var i = 0 ;  i < result.length ; i++ ) 
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
				                		 var	STR_CODE	  = xmlDoc.createElement('STR_CODE'); 
				            			 var	BAR_CODE	  = xmlDoc.createElement('BAR_CODE'); 
				            			 var	QTY  		  = xmlDoc.createElement('QTY'); 
				            			 var	ORD_DT  	  = xmlDoc.createElement('ORD_DT'); 
				            			 
				            			 STR_CODE.appendChild(  xmlDoc.createTextNode(  $("#STR_CODE").val()    )	); 
				            			 BAR_CODE.appendChild(  xmlDoc.createTextNode(  result[i].BAR_CODE      )	); 
				            			 QTY.appendChild(  		xmlDoc.createTextNode(  result[i].QTY    	    )	); 
				            			 ORD_DT.appendChild(    xmlDoc.createTextNode(  $("#ORD_DT").val().replace(/-/g, "")      )	);
				            			 
				            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE );
				            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( BAR_CODE );
				            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( QTY );
				            			 xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT );
				            			 
				            			 excelLoadProduct = excelLoadProduct + getXmlString(   xmlDoc   );
		            		} 
			            	excelLoadProduct  =  "<GRIDLIST>"+ excelLoadProduct +"</GRIDLIST>" ; 
			                     
			            	// 엑셀 (excelLoadProduct)의 점 발주 데이터를 TEMP_DB 로 넘겨 , 상품 정보를 조회후 그리드에 출력하기
		                	jQuery.ajax({ 
		            	    url:"/excelDataLoad.do",            
		            	    type:"POST",
		            		datatype:"xml",
		            		async:false,
		            		beforeSend : function(){ 
		                        gridRoot1.addLoadingBar(); 
		            	    }, 
		            		data: {     "STR_CODE"    : $("#STR_CODE").val()
		            		,           "ORD_DT"      :	$("#ORD_DT").val().replace(/-/g, "")
		            		,			"EXCEL_DATA"  : excelLoadProduct   },
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
		            				var ERR_CHK 		= xmlDoc.createElement('ERR_CHK'); 
		            				var SEQ 		    = xmlDoc.createElement('SEQ');  
		            				var SEQ_NO 		    = xmlDoc.createElement('SEQ_NO');  
		            				var REG_PATH 	    = xmlDoc.createElement('REG_PATH');  
		            				var STR_CODE		= xmlDoc.createElement('STR_CODE'); 
		            				var STR_NAME		= xmlDoc.createElement('STR_NAME');
		            				var ITM_CODE		= xmlDoc.createElement('ITM_CODE'); 
		            				var SCAN_CODE		= xmlDoc.createElement('SCAN_CODE'); 
		            				var ITM_NAME		= xmlDoc.createElement('ITM_NAME'); 
//		            				var UNIT_NM 		= xmlDoc.createElement('UNIT_NM'); 
		            				var IPSU_QTY		= xmlDoc.createElement('IPSU_QTY');  
		            				var ORD_QTY 		= xmlDoc.createElement('ORD_QTY');  
		            				var CFM_QTY 		= xmlDoc.createElement('CFM_QTY');    
		            				var PUR_WPRC		= xmlDoc.createElement('PUR_WPRC'); 
		            				var PUR_WVAT 		= xmlDoc.createElement('PUR_WVAT');  
		            				var VEN_CODE		= xmlDoc.createElement('VEN_CODE'); 
		            				var VEN_NAME		= xmlDoc.createElement('VEN_NAME');  
		            				var ORD_DT  		= xmlDoc.createElement('ORD_DT'); 
		            				var	ITM_GB    		= xmlDoc.createElement('ITM_GB'); 
		            				var	ITM_GB_NM 		= xmlDoc.createElement('ITM_GB_NM');
		            				var	CFM_DT 		    = xmlDoc.createElement('CFM_DT');
		            				 
		            				 
		            				
		            				SEQ.appendChild(  	        xmlDoc.createTextNode(  data[i].SEQ     		)	);
		            				SEQ_NO.appendChild(  	    xmlDoc.createTextNode(  i+1	        			)	);
		            				REG_PATH.appendChild(  	    xmlDoc.createTextNode(  data[i].REG_PATH        )	); 
		            				ERR_CHK.appendChild(  	    xmlDoc.createTextNode(  ""          			)	); 
		            				STR_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].STR_CODE     	)	);
		            				STR_NAME.appendChild(  		xmlDoc.createTextNode( 	$("#STR_CODE").text() 	)	);
		            				ITM_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_CODE    	)	);
		            				SCAN_CODE.appendChild(  	xmlDoc.createTextNode( 	data[i].SCAN_CODE     	)	);
		            				ITM_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].ITM_NAME     	)	);
//		            				UNIT_NM.appendChild(  		xmlDoc.createTextNode( 	data[i].UNIT_NM      	)	);
		            				IPSU_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].IPSU_QTY   		)	); 
		            				ORD_QTY.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_QTY       	)	);
		            				CFM_QTY.appendChild(  		xmlDoc.createTextNode( 	"0"				        )	);
		            				 
//		            				var priceVat = calPriceVat( data[i].PUR_WPRC , data[i].TAX_GB       );	
		            				
		            				// 공병일경우
		            				if( data[i].ITM_GB == "4" || data[i].ITM_GB == "5"  )
		            				{
		            					// 매입구분(PUR_GB) 이 반품(2) 일때 는SPRC 적용하고 , 매입(1)이면  WPRC 적용한다.
		            					if( $("#PUR_GB").val() == "2" )
		            					{
		            						PUR_WPRC.appendChild(  		xmlDoc.createTextNode( 	data[i].PUR_SPRC        )	);   // 대출원가
				            				
		            					} else {
		            						PUR_WPRC.appendChild(  		xmlDoc.createTextNode( 	data[i].PUR_WPRC        )	);   // 대출원가
				            				
		            					}
		            					
		            					
		            				} else {
		            					PUR_WPRC.appendChild(  		xmlDoc.createTextNode( 	data[i].PUR_WPRC        )	);   // 대출원가
			            				
		            				}
		            				
		            				
		            				
		            				
		            				PUR_WVAT.appendChild(  		xmlDoc.createTextNode( 	data[i].PUR_WVAT        )	);   // 부가세
		            				 
		            				
		            				VEN_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_CODE     	)	);
		            				VEN_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_NAME    	)	); 
		            				ORD_DT.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_DT       	)	);
		            				ITM_GB.appendChild(     	xmlDoc.createTextNode(  data[i].ITM_GB			)	); 
			            			ITM_GB_NM.appendChild(  	xmlDoc.createTextNode(  data[i].ITM_GB_NM		)	); 
			            			CFM_DT.appendChild(  	    xmlDoc.createTextNode(  ""		)	); 
			            			 
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ERR_CHK      	);   
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE       	); 
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_NAME       	);  
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_CODE      	);  
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE     	);  
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_NAME       	);  
//		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( UNIT_NM       	);  
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IPSU_QTY       	);   
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY       	);    
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_QTY        	);   
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WPRC        	);  
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( PUR_WVAT        	);   
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_CODE     	);  
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( VEN_NAME       	);    
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_DT          	);  
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ          	);  
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ_NO          	);  
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( REG_PATH     	);   
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB			);
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ITM_GB_NM		);
		            				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( CFM_DT	    	);
		            					            			
		            				gridRoot1.addItemAt(  xmlDoc  , i ,false); 
		            			} 
		            			
//		            			var excelBarCodeErr = "";
		            			for(var i=0 ; i < data.length ; i++ )
		            			{   // 상품명이 없을경우, 즉 바코드가 존재 안할때 ... (undefined) 확인란에 빨간색으로 표기 
		            				if(     gridRoot1.getItemFieldAt( i , "ITM_NAME")  == "undefined"    
		            					||  gridRoot1.getItemFieldAt( i , "ITM_NAME")  == ""   )
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
		             				prompt("아래 보이는 엑셀 라인의 스캔코드는 DB에 존재 하지 않습니다.\n오류 데이터를 제거하고 업로드 합니다.", excelBarCodeErr ); 
		             			}
		             			
		            			dataGrid1.setEnabled(true);
		            	    	gridRoot1.removeLoadingBar();
		            	    },
		            	    complete : function(data) { 
		            	    	 
		            	    	 // PO_ORDER_UPLOAD 에 저장
		            	    	 // btn_save 함수 안에는 오류시 리턴해버리는 코드가 들어있어서 위에서 에러가 나도  저장이 안된다. 
		            	    	 // 하지만 유맥의 요청으로 오류제거후 저장되게 바꿈
		            	    	
		            	          btn_save();
		            	    	
		            	    },
		            	    error : function(xhr, status, error) {
		            	    	dataGrid1.setEnabled(true);
		            	    	gridRoot1.removeLoadingBar();
		            	    	CommonJs.alertErrorStatus(xhr.status, error);
		            	    }
		            	});
			                  
		               }
		               
		           };
		           reader.readAsArrayBuffer(f);
		            
		       }
		       
	 }  // end if
	
  
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
rMateGridH5.create("grid1", "gridHolder1", jsVars+"&dataType=xml", "100%", "560px");    
//rMateGridH5.create("grid2", "gridHolder2", jsVars );                                  

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
//				alert("파싱된 "+dataField+"의 값:"+value+"\n\n전달된 XML\n\n"+getXmlString(dataRow));
			};
			 
			//그리드1 핸들러
			var layoutCompleteHandler1 = function(event) {
				dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체 
 
			    //  매입형태 콤보박스
				//	var COMBO_ORD_FLAG_NM = gridRoot1.getObjectById("ORD_FLAG_NM");    
				//	COMBO_ORD_FLAG_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2('ORD_FLAG') );
   
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
	<DataGrid id="dg1"  sortableColumns="true"  editable="true" horizontalScrollPolicy="auto" showDeletedRows="true"  selectionMode="multipleCells"   dragSelectable="true" doubleClickEnabled="false" >\
		<columns>\
			<DataGridRowStateColumn id="rowState" dataField=" "  textAlign="center"  visible="true"  />\
			<DataGridSelectorColumn id="selector" width="40" textAlign="center"  headerText=""  backgroundColor="#EDEDF0" allowAllSelection="true"  allowMultipleSelection="true"  secondLabelJsFunction="secondLabelFunc" />\
			<DataGridColumn  id="SEQ_NO"		 dataField="SEQ_NO"     	headerText="순번"			editable="false" 	itemRenderer="IndexNoItem"	textAlign="center"   width="45"  	 />\
			<DataGridColumn  id="SEQ"		     dataField="SEQ"   		    visible="false" />\
			<DataGridColumn  id="REG_PATH"		 dataField="REG_PATH"       visible="false" />\
			<DataGridColumn  id="ERR_CHK"		 dataField="ERR_CHK"        headerText="엑셀확인"     	editable="false"		textAlign="left"   width="65"   />\
	<DataGridColumn  id="CFM_DT"		 dataField="CFM_DT"    		headerText="발주생성일"   editable="false"		textAlign="center"	 width="85"    formatter="{datefmt}"		/>\
	<DataGridColumn  id="STR_CODE"		 dataField="STR_CODE"       headerText="점포코드"     	editable="false"		textAlign="center"   width="65"   />\
	<DataGridColumn  id="STR_NAME"		 dataField="STR_NAME"       headerText="점포명"     	editable="false"		textAlign="center"   width="80"   />\
	<DataGridColumn  id="VEN_CODE"		 dataField="VEN_CODE"     	headerText="매입처코드"	editable="false" 		textAlign="center"   width="85"  		/>\
	<DataGridColumn  id="VEN_NAME"		 dataField="VEN_NAME"    	headerText="매입처"		editable="true"			showEditableIcon="always"   itemRenderer="EditableIconItem" textAlign="left"	 width="160"    		/>\
	<DataGridColumn  id="ROUTE_GB"	 	 dataField="ROUTE_GB"       headerText="배송구분"     editable="false"		    textAlign="center"  visible="true"       width="65"   	/>\
	<DataGridColumn  id="SCAN_CODE"		 dataField="SCAN_CODE"     	headerText="스캔코드"		editable="false" 	    textAlign="center"	 width="110"  editorUsesEnterKey="false" showEditableIcon="always" itemRenderer="EditableIconItem" />\
	<DataGridColumn  id="ITM_NAME"		 dataField="ITM_NAME"     	headerText="상품명"		editable="false" 		textAlign="left"	 width="145"   		/>\
	<DataGridColumn  id="ITM_GB_NM"	 	 dataField="ITM_GB_NM"      headerText="상품구분"     editable="false"		    textAlign="center"   width="65"      	/>\
	<DataGridColumn  id="IPSU_QTY"		 dataField="IPSU_QTY"    	headerText="입수"    		editable="false"		textAlign="right"    width="65"    formatter="{numfmt}"  	/>\
	<DataGridColumn  id="ORD_QTY"		 dataField="ORD_QTY"     	headerText="발주수량"		editable="true" 		textAlign="right"	  maxChars="6" type="int"   width="70"    formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
	<DataGridColumn  id="CFM_QTY"	 	 dataField="CFM_QTY" 		headerText="확정수량"  	editable="false"		textAlign="right"     maxChars="6" type="int"   width="70"    formatter="{numfmt}"  showEditableIcon="always" itemRenderer="EditableIconItem" 	/>\
	<DataGridColumn  id="PUR_WPRC"	 	 dataField="PUR_WPRC"   	headerText="원가"  		editable="false"		textAlign="right"	 width="80"   formatter="{numfmt}"  	/>\
	<DataGridColumn  id="PUR_WVAT"		 dataField="PUR_WVAT"   	headerText="부가세"		editable="false"		textAlign="right"	 width="80"    formatter="{numfmt}"		/>\
			<DataGridColumn  id="ORD_DT"		 dataField="ORD_DT"    		headerText="발주일자"		editable="false"		textAlign="center"	 width="85"    formatter="{datefmt}"		/>\
			<DataGridColumn  id="ITM_GB"	 	 dataField="ITM_GB"         headerText="ITM_GB"     editable="false"		visible="false"        	/>\
			<DataGridColumn  id="CFM_YN"		 dataField="CFM_YN"       visible="false" />\
	<DataGridColumn  id="SLIP_DIV_YN"		 dataField="SLIP_DIV_YN"       visible="false" />\
	<DataGridColumn  id="TPER_MTHD"		 	 dataField="TPER_MTHD"         visible="false" />\
	</columns>\
	</DataGrid>\
</rMateGrid>';

//<DataGridColumn  id="CFM_DT	"		 dataField="CFM_DT"     	headerText="확정일자"		editable="false" 		visible="false" />\
//<DataGridColumn  id="IDATE"		 	 dataField="IDATE"     		headerText="등록일시"		editable="false" 		visible="false" />\

//그리드  데이터 초기화
var gridData1 = []; 
//var gridData2 = []; 
  


// ----------------------- 그리드 설정 끝 -------------------------------------

function secondLabelFunc(item, value, column) 
{ 
	 if( typeof  item.CFM_DT   ==   undefined  || item.CFM_DT   ==   'undefined'  || item.CFM_DT   ==   ''   )
		 return false;
	 else
		 return true;

} ;


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
	gridRoot1.setItemFieldAt( dataRow.SLIP_DIV_YN , selectedIndex, "SLIP_DIV_YN"); 
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
        	btn_comm_store_order_search();
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
	

	$("#GRE_GB").val( "" ) ;  
	
	
	
	
	
	
	
	
 
	//조회조건  from 발주일자는 시스템 날짜 - 1 해서 default 로 넣는다
//	var ORD_DT_FROM = new CommDateManager().after(0, 0, -1).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
//	$("#ORD_DT_FROM").val( ORD_DT_FROM );
	//조회조건  to 발주일자는 시스템 날짜   해서 default 로 넣는다
//	var ORD_DT_TO = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
//	$("#ORD_DT_TO").val( ORD_DT_TO );
	  
	//발주일자는 시스템 날짜   해서 default 로 넣는다
	var ORD_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); // 일주일전/후  before / after(년,월,일) 
	$("#ORD_DT").val( ORD_DT );
	    
	
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
 



// R2 발주 엑셀 데이터 다운로드 
function  r2OrderExcelData() {
	
//	if(   $('#ORD_DT_FROM' ).val() == ""   )
//	{    alert("발주 시작일을 선택 하세요.");
//		 $('#ORD_DT_FROM' ).focus();
//		 return;
//	}
	if(   $('#ORD_DT' ).val() == ""   )
	{    alert("발주일을 선택 하세요.");
		 $('#ORD_DT' ).focus();
		 return;
	}
 
	var STR_CODE  = $('#STR_CODE').val();
//	var ORD_DT_FROM = $('#ORD_DT_FROM').val().replace(/-/g, "");
	var ORD_DT      = $('#ORD_DT').val().replace(/-/g, "");
	 
	
	//엑셀 다운 호출  wmsInReportExcelDown.do
	$.download('/r2OrderExcelData.do',"STR_CODE="+STR_CODE
//									 +"&ORD_DT_FROM="+ORD_DT_FROM
									 +"&ORD_DT="+ORD_DT 
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
	 
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009" || $("#SESSION_ROLE_ID").val()    == "ROLE010" )  // 바이어(ROLE009) 
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
	}
	 
	
	if(! chk_order_day() )
	{ return;}
	 
	loadExcelFile(  G_FILE  ); 
	
	EXCEL_LOAD_BIT = "Y";
	
	 
	
	
}


// 발주생성
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
	// 이 화면은 항상 점에서 로그인 하므로 REG_PATH 는 항상 1이다.
	var REG_PATH = "1";
	
//	if( $("#SESSION_ROLE_ID").val()    == "ROLE009" || $("#SESSION_ROLE_ID").val()    == "ROLE010")  // 바이어(ROLE009) 
//	{   REG_PATH = "2";
//	} else {    // 점포
//		REG_PATH = "1";
//	}
	
	//  발주생성      
	//  체크박스를 선택한것만 발주하기 :  체크한것만 XML 로 만들어 row 수 만큼 디비에서 for 를 돌린다.
	
	 
	
	jQuery.ajax({ 
	    url:"/jobUploadToOrder.do",         
	    type:"POST",
		datatype:"xml",
		async:true,
		data: {     
		           "REG_PATH"   	 : REG_PATH
        ,          "STR_CODE"   	 : $("#STR_CODE").val()
        ,   	   "ITM_GB"     	 : $("#ITM_GB").val() 
        ,		   "LRG_CODE"   	 : $("#LRG_CODE").val()
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
	    	
	    	btn_search();
	    },
	    error : function(request,status,error) {
	    	 
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
	  
	for(var i=0 ; i < rowCnt.length ; i++)
	{   if( typeof gridRoot1.getItemFieldAt( i , "ITM_CODE") == 'undefined' || gridRoot1.getItemFieldAt( i , "ITM_CODE") == '' )
		{   alert("하단 그리드의 발주상품(스캔코드)을 등록  하세요");
			return;
		}
		if(  typeof  gridRoot1.getItemFieldAt( i , "ORD_QTY") == 'undefined' || gridRoot1.getItemFieldAt( i , "ORD_QTY") == '0' || gridRoot1.getItemFieldAt( i , "ORD_QTY") == ''  )
		{   alert("하단 그리드의 발주수량을 입력 하세요");
			return;
		}
		 
		
		// 엑셀 ㅇ로드와 저장을 한번에 하기 때문에, 로드에서 검증시 오류가 았을때   excelBarCodeErr 에 값이 들어간다. 이것을 여기서 처리한다. 
		// 그리드에  바코드 검증 오류 체크      
		//		if(  typeof gridRoot1.getItemFieldAt( i , "ERR_CHK") != 'undefined'   )
		//		{   alert("엑셀데이터에 존재하지 않는 스캔코드가 있습니다. 엑셀을 수정하여 재 업로드 하세요");
		//			return; 
		//		}

		
	}   
	
	
	// 로드시 에러가 나면 excelBarCodeErr에 값이 들어가므로 여기서는 별도의 경고메세지 안뿌리고 바로 리턴한다. 
	// 그러나 유맥의 요청으로 에러가 나도 에러 제외하고 올려달라는 요청이 있어서 주석 처리함
//	if( excelBarCodeErr  != "")
//	{
//		excelBarCodeErr = "";
//		return;
//	}
	
	
 
    
	// 엑셀 발주 상품 등록 위해서 XML로 만듬 
    var orderStoreDetail = ""; 
	var rowCnt  = gridRoot1.getCollection().getSource() ;  
	for(var i=0 ; i < rowCnt.length ; i++)
	{    orderStoreDetail = orderStoreDetail + getXmlString(   gridRoot1.getItemAt(i)   );     }  
	orderStoreDetail =  "<GRIDLIST>"+orderStoreDetail+"</GRIDLIST>" ;
	 
	// 업로드 주체가 바이어 인지 점포인지 구분. REG_PATH :   1- 점등록   , 2 -  바이어등록   
	var REG_PATH = "";
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009" || $("#SESSION_ROLE_ID").val()    == "ROLE010" )  // 바이어(ROLE009) 
	{ 
		REG_PATH = "2";
	} else {    // 점포
		REG_PATH = "1";
	}
	 
	 
	//  엑셀  발주 저장      
	jQuery.ajax({ 
	    url:"/orderStoreProductExcelRegister.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {    
			       "ORD_DT"             : $('#ORD_DT').val().replace(/-/g, "")
		,      	   "STR_CODE"           : $('#STR_CODE').val() 
		,		   "orderStoreDetail"   : orderStoreDetail  
		,          "REG_PATH"           : REG_PATH
		,          "PUR_GB"             : $("#PUR_GB").val() 
	    }, 
		success:function(data){   
			if(  data[0].RETURN_CODE  == "0000")
			{   alert("엑셀 발주 업로드에 성공 하였습니다");
			} else {
				alert("엑셀 발주 업로드에 실패 하였습니다");
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
	    url:"/orderUploadDel.do",           
	    type:"POST",
//		datatype:"xml",
//		async:false,
		data: {      "ORD_DT"     : gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "ORD_DT") 
		,	 		 "STR_CODE"   : gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "STR_CODE") 
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
	
	 
	if( $("#SESSION_ROLE_ID").val() != "ROLE009")  // 점포 로그인 
	{   if(  $("#STR_CODE").val() == ""   )
		{   alert("조회 점포를 선택  하세요.");
			$("#STR_CODE").focus();
			return;
		}
	}  
	  
	if(  $("#ORD_DT").val() == ""   )
	{   alert("검색할 발주 일자를 선택  하세요.");
		$("#ORD_DT").focus();
		return;
	}
	 
 
  
	
//	var REG_PATH = "";
//	if( $("#SESSION_ROLE_ID").val() == "ROLE009")  // 바이어(ROLE009) 
//	{   REG_PATH = "2";
//	} else {    // 점포
//		REG_PATH = "1";
//	}
	 
	// PO_ORDER_UPLOAD 에 있는 데이터 보여주기
	jQuery.ajax({ 
	    url:"/orderUploadSearch.do",            
	    type:"POST",
		datatype:"xml",
//		async:false,
		data: {  	"STR_CODE"     : $("#STR_CODE").val()  
		,			"ORD_DT"       : $("#ORD_DT").val().replace(/-/g, "")
		,           "REG_PATH"     : $("#REG_PATH").val() 
		,		    "ITM_GB"       : $("#ITM_GB").val() 
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
				var VEN_NAME		= xmlDoc.createElement('VEN_NAME');  
				var ORD_DT  		= xmlDoc.createElement('ORD_DT'); 
				var	ITM_GB    		= xmlDoc.createElement('ITM_GB'); 
				var	ITM_GB_NM 		= xmlDoc.createElement('ITM_GB_NM');
				var	CFM_DT 		    = xmlDoc.createElement('CFM_DT');
				var	CFM_YN 		    = xmlDoc.createElement('CFM_YN');
				var	ROUTE_GB        = xmlDoc.createElement('ROUTE_GB');
				var	TPER_MTHD       = xmlDoc.createElement('TPER_MTHD');
				var	SLIP_DIV_YN       = xmlDoc.createElement('SLIP_DIV_YN');
				
				
				var	rowState 		= xmlDoc.createElement('rowState');
				var	selector 		= xmlDoc.createElement('selector');
				rowState.appendChild(  	        xmlDoc.createTextNode( " " 	 		)	);
				selector.appendChild(  	        xmlDoc.createTextNode( ""	 		)	);
				
				
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
 				PUR_WPRC.appendChild(  		xmlDoc.createTextNode( 	data[i].PUR_WPRC   		)	);   // 대출원가
				PUR_WVAT.appendChild(  		xmlDoc.createTextNode(  data[i].PUR_WVAT     	)	);   // 부가세
				VEN_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_CODE      	)	);
				VEN_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].VEN_NAME       	)	); 
				ORD_DT.appendChild(  		xmlDoc.createTextNode( 	data[i].ORD_DT        	)	);
				ITM_GB.appendChild(     	xmlDoc.createTextNode(  data[i].ITM_GB			)	); 
    			ITM_GB_NM.appendChild( 	 	xmlDoc.createTextNode(  data[i].ITM_GB_NM		)	); 
    			CFM_DT.appendChild( 	 	xmlDoc.createTextNode(  data[i].CFM_DT			)	); 
    			CFM_YN.appendChild( 	 	xmlDoc.createTextNode(  data[i].CFM_YN			)	); 
    			ROUTE_GB.appendChild( 	 	xmlDoc.createTextNode(  data[i].ROUTE_GB		)	); 
    			TPER_MTHD.appendChild( 	 	xmlDoc.createTextNode(  data[i].TPER_MTHD		)	); 
    			SLIP_DIV_YN.appendChild( 	 	xmlDoc.createTextNode(  data[i].SLIP_DIV_YN		)	); 
    			
    			

    			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SLIP_DIV_YN			);
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
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TPER_MTHD     	); 
				
				
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
	
	// 유재훈
	if(newValue == "")    {  return; }   // 선택한 값이 ""  일때  빠져나감
	 
	 
	
	
	/*
	// 발주수량 수정  및 행추가 기능
	if(   dataField == "ORD_QTY"  ) {  
		
		// 공병 금액 계산해서 보여주기 :  IPSU_QTY(입수)  * ORD_QTY(발주수량) * BOT_SPRC(공병단가)  = BOT_SPRC_TOT(공병금액) 
		var IPSU_QTY = gridRoot1.getItemFieldAt( rowIndex , "IPSU_QTY") ;
		var ORD_QTY  = newValue ;
		var BOT_SPRC = gridRoot1.getItemFieldAt( rowIndex , "BOT_SPRC") ; 
		gridRoot1.setItemFieldAt( IPSU_QTY * ORD_QTY * BOT_SPRC  , rowIndex, "BOT_SPRC_TOT"); 
		gridRoot1.setItemFieldAt(  ORD_QTY  , rowIndex, "DEC_QTY"); 
//		setTotalSum();
		
		// 상품 선택이 있고, 수량 없을때  -> 행추가  // 유재훈
		if(     typeof gridRoot1.getItemFieldAt(rowIndex , "ITM_CODE")   !=   'undefined' 
			 && typeof oldValue   										 ==   'undefined'
		)
		{   // 발주수량을 처음 입력 할때만 행 추가 
			gridHolder1AddRow();  
		}    
	}
	 
	// 단가   수정
	if(   dataField == "PUR_AVR_AMT"  ) {  
		    
		if( typeof gridRoot1.getItemFieldAt(rowIndex , "TAX_GB")   ==   'undefined' )
		{   alert('상품을 선택 하세요.');
			return;			
		}		
		var priceVat = calPriceVat( newValue , gridRoot1.getItemFieldAt( rowIndex , "TAX_GB"  )   );		 
		gridRoot1.setItemFieldAt( priceVat[0]  				, rowIndex, "PUR_AVR_AMT");     // 단가 
		gridRoot1.setItemFieldAt( priceVat[1]  				, rowIndex, "WSPRC");   		// 대출원가
		gridRoot1.setItemFieldAt( priceVat[2]  				, rowIndex, "WVAT");    		// 부가세
		
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
				 
				// 점별 바코드 상세 ajax 로 뿌리기 -- 시작 
				jQuery.ajax({ 
				    url:"/orderStoreProductSelect.do",              
				    type:"POST",
					datatype:"json",
					async:false,
				 	data: {   "SCAN_CODE"  : SCAN_CODE
				 	,         "STR_CODE"   : $('#STR_CODE').val()
				 	,         "ROUTE_GB"   : $('#ROUTE_GB').val()   
				 	},
					success:function(data){
				 
						// 점포 상품 상세   - 일치하는것이 하나일 대는 그냥 뿌려준다.
						if(  data.length == 1 )
						{   
							setOrderProduct(
									  rowIndex
									, data[0].ORD_TERM   
									, data[0].STR_CODE 
									, data[0].ITM_CODE		 
									, data[0].SCAN_CODE	 
									, data[0].ITM_NAME	 
									, data[0].UNIT_NM		 
									, data[0].IPSU_QTY	 
									, data[0].DP_PRC_UNIT 
									, data[0].ORD_QTY		 
									, data[0].ORD_FLAG	 
									, data[0].ORD_FLAG_NM    
									, data[0].STKLM_QTY	 
									, data[0].INV_END_QTY    
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
							);
							// 발주 수량 셀 편집 모드 변경  // 유재훈
							value.rowIndex = rowIndex;         // 이동할 행의 index 입니다.
						    value.columnIndex = 11;    // 이동할 열의 index 입니다.
						    dataGrid1.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
							    	
						} else if(  data.length >= 2 ){
							
							// 상품 팝업을 띄운다.   
						    btn_comm_store_route_gb_product_search(   rowIndex 
													    		   ,  $('#STR_CODE').val() 
													    		   ,  $('#ROUTE_GB').val() 
													    		   ,  gridRoot1.getItemFieldAt( rowIndex , "SCAN_CODE"  ) 
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
	
	 
	  */
	
}



function setOrderProduct( 
						  rowIndex
						, ORD_TERM   
					  	, STR_CODE 
					  	, ITM_CODE		 
					  	, SCAN_CODE	 
					  	, ITM_NAME	 
//					  	, UNIT_NM		 
					  	, IPSU_QTY	 
					  	, DP_PRC_UNIT 
					  	, ORD_QTY		 
//					  	, ORD_FLAG	 
//					  	, ORD_FLAG_NM    
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
//		gridRoot1.setItemFieldAt(	 UNIT_NM,		rowIndex,"UNIT_NM"			);
		gridRoot1.setItemFieldAt(	 IPSU_QTY,		rowIndex,"IPSU_QTY"			);
		gridRoot1.setItemFieldAt(	 DP_PRC_UNIT,	rowIndex,"DP_PRC_UNIT"		);
		gridRoot1.setItemFieldAt(	 ORD_QTY,		rowIndex,"ORD_QTY"			);
//		gridRoot1.setItemFieldAt(	 ORD_FLAG,	 	rowIndex,"ORD_FLAG"			);
//		gridRoot1.setItemFieldAt(	 ORD_FLAG_NM,   rowIndex,"ORD_FLAG_NM"		);
		gridRoot1.setItemFieldAt(	 STKLM_QTY,		rowIndex,"STKLM_QTY"		); 
		gridRoot1.setItemFieldAt(	 INV_END_QTY,   rowIndex,"INV_END_QTY"		);
		gridRoot1.setItemFieldAt(	'0',			rowIndex,"DEC_QTY"			);
		gridRoot1.setItemFieldAt(	 TAX_GB,		rowIndex,"TAX_GB"			);
		gridRoot1.setItemFieldAt(	 TAX_GB_NM,		rowIndex,"TAX_GB_NM"		);
		gridRoot1.setItemFieldAt(	 SPRC,			rowIndex,"SPRC"				);
	 
 
		var priceVat = calPriceVat( PUR_AVR_AMT , '1'  ); 
		
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
function btn_comm_store_route_gb_product_search( rowIndex , STR_CODE , ROUTE_GB , ITM_NAME){
	$('#comm_pop_wrap13' ).dialog( 'open' );
	gridApp22.resize(); 
	$("#P_CALLBACK_NM13").val('btn_comm_store_route_gb_product_callback('+rowIndex+', dataRow22)'); 
 // STR_CODE , ROUTE_GB를 넘기기위해서 사용했음  
	 
	$("#P_STR_CODE_CODE").val(  STR_CODE  );
	$("#P_ROUTE_GB").val(  ROUTE_GB  );
	 
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
//		  	, dataRow.UNIT_NM		 
		  	, dataRow.IPSU_QTY	 
		  	, dataRow.DP_PRC_UNIT 
		  	, dataRow.ORD_QTY		 
//		  	, dataRow.ORD_FLAG	 
//		  	, dataRow.ORD_FLAG_NM    
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
 

// ( 점별 발주 상품검색 ) 팝업 호출  : 점에서 R2 발주상품은 선택한 점코드의 상품이 아닌, 물류센터의 상품을 조회한다.
function btn_comm_store_order_search()
{
	$("#ORD_QTY").focus() ;
	
	$('#comm_pop_wrap19' ).dialog( 'open' );
	gridApp28.resize();

	fnGetStrName();

	// $("#P_CALLBACK_NM6").val('fn_comm_store_callback1(dataRow28)');
	if($("#ITM_NAME").val() != null && $("#ITM_NAME").val() != ""){
		$("#P_TEXT19").val($("#ITM_NAME").val());
		btn_comm_search('19');
	}

}
function fn_comm_store_callback(dataRow)
{ 	   
	$("#ITM_NAME").val( dataRow.ITM_NAME ) ;
	$("#SCAN_CODE").val( dataRow.SCAN_CODE ) ;  
	$("#GRE_GB").val( dataRow.GRE_GB ) ;  
}



////(점별상품검색) 팝업 호출 function
//function btn_comm_store_search()
//{ 	
//	$("#ORD_QTY").focus() ;
//	
//	$('#comm_pop_wrap6' ).dialog( 'open' );
//	gridApp15.resize();
//	fnGetStrName();
//	// $("#P_CALLBACK_NM6").val('fn_comm_store_callback1(dataRow15)');
//	if($("#ITM_NAME").val() != null && $("#ITM_NAME").val() != ""){
//		$("#P_TEXT6").val($("#ITM_NAME").val());
//		btn_comm_search('6');
//	}
//	 
//} 
//function fn_comm_store_callback(dataRow)
//{ 	   
//	$("#ITM_NAME").val( dataRow.ITM_NAME ) ;
//	$("#SCAN_CODE").val( dataRow.SCAN_CODE ) ;  
//}
 
 

function btn_itm_add()
{
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
	 
	if (confirm("해당 발주상품을 ["+ $("#PUR_GB option:selected").text()  +"] 등록하시겠습니까?") != true)
	{  
	    return;
    } 
	 
	
	// 디비에서 해당 추가 발주 상품 검색해서 데이터 가져와서 그리드에 뿌려준다.   
	jQuery.ajax({ 
	    url:"/orderAddItm.do",      // orderStoreProductSelect           
	    type:"POST",
		datatype:"json",
		async:false,
	 	data: {   "STR_CODE"    : $('#STR_CODE').val()
	 	,         "SCAN_CODE"   : $('#SCAN_CODE').val()    
	 	,		 "PUR_GB"      : $('#PUR_GB').val() 
	 	},
		success:function(data){
	   
			if(  data.length == 1 )
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
			    var	SEQ_NO		= xmlDoc.createElement('SEQ_NO'); 
				var	SEQ			= xmlDoc.createElement('SEQ');
				var	REG_PATH	= xmlDoc.createElement('REG_PATH');
				var	ERR_CHK		= xmlDoc.createElement('ERR_CHK');
				var	STR_CODE	= xmlDoc.createElement('STR_CODE'); 
				var	STR_NAME	= xmlDoc.createElement('STR_NAME');
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
				var	VEN_NAME	= xmlDoc.createElement('VEN_NAME');
				var	CFM_YN		= xmlDoc.createElement('CFM_YN'); 
				var	ROUTE_GB    = xmlDoc.createElement('ROUTE_GB'); 
				 
				SEQ_NO.appendChild(  	xmlDoc.createTextNode(  "" 										)	); 			
				SEQ.appendChild(  		xmlDoc.createTextNode(  "" 										)	); 				     	
				REG_PATH.appendChild(  	xmlDoc.createTextNode(  $("#REG_PATH").val()    				)	); 				
				ERR_CHK.appendChild(  	xmlDoc.createTextNode(  "" 										)	); 					
				STR_CODE.appendChild(  	xmlDoc.createTextNode(  $("#STR_CODE").val() 					)	); 				
				STR_NAME.appendChild(  	xmlDoc.createTextNode(  $("#STR_CODE").text() 					)	); 				
				ORD_DT.appendChild(  	xmlDoc.createTextNode(  $("#ORD_DT").val().replace(/-/g, "")  	)	); 					
				CFM_DT.appendChild(  	xmlDoc.createTextNode(  "" 										)	); 					
				SCAN_CODE.appendChild(  xmlDoc.createTextNode(  $("#SCAN_CODE").val()  					)	); 				
				ITM_NAME.appendChild(  	xmlDoc.createTextNode(  $("#ITM_NAME").val()  					)	); 				
				IPSU_QTY.appendChild(  	xmlDoc.createTextNode(  data[0].IPSU_QTY 						)	); 				
				ITM_GB_NM.appendChild(  xmlDoc.createTextNode(  data[0].ITM_GB_NM						)	); 		 	
				ITM_GB.appendChild(  	xmlDoc.createTextNode(  data[0].ITM_GB 							)	); 			 		
				ORD_QTY.appendChild(  	xmlDoc.createTextNode(  $("#ORD_QTY").val()	 					)	); 					
				CFM_QTY.appendChild(  	xmlDoc.createTextNode(  "0" 									)	); 			 	 	
				
				// 공병(4)  혹은 Pbox(5) 일때 
				if( data[0].ITM_GB == "4" || data[0].ITM_GB == "5"  )
				{ 
					// 매입구분(PUR_GB) 이 반품(2) 일때 는SPRC 적용하고 , 매입(1)이면  WPRC 적용한다.
					if( $("#PUR_GB").val() == "2" )
					{
						PUR_WPRC.appendChild(  	xmlDoc.createTextNode(  data[0].PUR_SPRC 						)	); 			 	
						
					} else {
						PUR_WPRC.appendChild(  	xmlDoc.createTextNode(  data[0].PUR_WPRC 						)	); 			 	
						
					}
				}  else {
					PUR_WPRC.appendChild(  	xmlDoc.createTextNode(  data[0].PUR_WPRC 						)	); 			 	
					
				}
				
				
				PUR_WVAT.appendChild(  	xmlDoc.createTextNode(  data[0].PUR_WVAT 						)	); 				
				VEN_CODE.appendChild(  	xmlDoc.createTextNode(  data[0].VEN_CODE 						)	); 				
				VEN_NAME.appendChild(  	xmlDoc.createTextNode(  data[0].VEN_NAME 						)	); 				
				CFM_YN.appendChild(  	xmlDoc.createTextNode(  "" 										)	); 					
				ROUTE_GB.appendChild(  	xmlDoc.createTextNode(  data[0].ROUTE_GB 						)	); 					
				
				
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ_NO    );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ       );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( REG_PATH  );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ERR_CHK   );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE  );
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_NAME  );
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
				 
				gridRoot1.addItemAt(  xmlDoc  , 0 , false);
				girdMoveSelctedIndex(0 , gridRoot1.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기
				 
				
				// 추가된 상품을 저장한다. 
				// 바로 PO_ORDER_UPLOAD 저장 하기
				btn_itm_add_save( data );
				
				
				

				// 로우스테이트 초기화 하기 
				var selectedItem = gridRoot1.getItemAt(0);
				gridRoot1.removeChangedData(selectedItem);
				 
				dataGrid1.invalidateList();
				
			 
			} else { 
				alert("해당 상품은 점에서 취급하지 않거나, 판매중단 된 상품입니다.");
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

}



function btn_itm_add_save( data )
{
	// PO_ORDER_UPLOAD 에 insert
	jQuery.ajax({ 
	    url:"/orderAddItmSave.do",             
	    type:"POST",
//		datatype:"xml",
//		async:false,
		data: {     "ORD_DT"     :   $("#ORD_DT").val().replace(/-/g, "")     
		, 			"STR_CODE"   :   $("#STR_CODE").val()      
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
			if(  data[0].RETURN_CODE  == "0000")
			{   
				alert("상품 추가에  성공 하였습니다");
				$("#SCAN_CODE").val("");
				$("#ITM_NAME").val("");
				$("#ORD_QTY").val("");
			 	
			} else {
				alert("상품 추가에  실패 하였습니다");
			}   
			btn_search();
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
//	var	UNIT_NM			= xmlDoc.createElement('UNIT_NM');
	var	IPSU_QTY		= xmlDoc.createElement('IPSU_QTY');
	var	DP_PRC_UNIT		= xmlDoc.createElement('DP_PRC_UNIT');
//	var	ORD_FLAG		= xmlDoc.createElement('ORD_FLAG');
//	var	ORD_FLAG_NM		= xmlDoc.createElement('ORD_FLAG_NM');
	var	STKLM_QTY		= xmlDoc.createElement('STKLM_QTY');
	var	INV_END_QTY		= xmlDoc.createElement('INV_END_QTY');
	var	ORD_QTY			= xmlDoc.createElement('ORD_QTY');
	var	DEC_QTY			= xmlDoc.createElement('DEC_QTY');
//	var	TAX_GB			= xmlDoc.createElement('TAX_GB');
//	var	TAX_GB_NM		= xmlDoc.createElement('TAX_GB_NM'); 
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
//	UNIT_NM.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	IPSU_QTY.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	DP_PRC_UNIT.appendChild(	xmlDoc.createTextNode(  ""	)	);
//	ORD_FLAG.appendChild(  		xmlDoc.createTextNode(  "1"	)	);
//	ORD_FLAG_NM.appendChild(	xmlDoc.createTextNode(  ""	)	);
	STKLM_QTY.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	INV_END_QTY.appendChild(  	xmlDoc.createTextNode(  ""	)	);
	ORD_QTY.appendChild(  		xmlDoc.createTextNode(  ""	)	);
	DEC_QTY.appendChild(  		xmlDoc.createTextNode(  "0"	)	);
//	TAX_GB.appendChild(  		xmlDoc.createTextNode(  ""	)	);
//	TAX_GB_NM.appendChild(  	xmlDoc.createTextNode(  ""	)	);
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
//	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( UNIT_NM		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IPSU_QTY		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( DP_PRC_UNIT	);
//	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_FLAG		);
//	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_FLAG_NM	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STKLM_QTY	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( INV_END_QTY	);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_QTY		);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( DEC_QTY		);
//	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TAX_GB		);
//	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( TAX_GB_NM	);
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