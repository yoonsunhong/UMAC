/********************************************************
*   설명:  실사재고엑셀조정
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-05-03    문희훈       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/


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

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1,	rowIndex1;

var gridData1 =[];

//----------------------- 그리드 설정 끝 -----------------------


//<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="40" /> 넘버링을 하면 병합오류 발생
//그리드1 헤더 설정

// ----------------------- 그리드 설정 끝 -------------------------------------


//########################################################
//###	8. init ( 시작 )   							   												###
//########################################################

$(document).ready(function(){
	
	init();
	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var loadData= {};
	// 점포코드 가져오기
	$("#iframeCnt select[name=P_STR_NAME]").append('<option value="">'+ select +'</option>');
	
	jQuery.ajax({
	    type:"POST",
	    url:"/getSelectStoreCode.do", 
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:loadData,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#P_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
				 $("#P_POP_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});


});

function btn_preview() {
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	if($("#P_INV_DT").val()=="" || $("#P_INV_DT").val() == null){
		//재고실사일이 존재하지 않습니다.
		alert(stockExcelMent3);
		$('#P_INV_DT').focus();
		return;
	}
	
	$('#pop_wrap2').dialog( 'open' );
	gridApp3.resize();
	gridApp4.resize();
	gridApp5.resize();
    gridRoot3.removeAll( );
    gridRoot4.removeAll( );
    gridRoot5.removeAll( );
}
function pop2_close() {
	$("#pop_wrap2").dialog("close");
}	

function pop2_search(){
	
	//재고조사일정ID의 재고실사등록 확정 여부 체크
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
//	if(dataCnt == 0){
//		//확정할 데이터가 없습니다.
//		alert("데이터가 없습니다.");
//		return;
//	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	loadData.P_INV_INSP_SCHD_ID = loadData.P_INV_DT.replace(/-/gi, '');
	loadData.P_INV_DT = $("#P_INV_DT option:selected").text().replace(/-/gi, '');
	loadData.P_LRG_CODE = $("#P_POP_LRG_CODE").val();
	loadData.P_MID_CODE = $("#P_POP_MID_CODE").val();
	loadData.P_CLS_CODE = $("#P_POP_CLS_CODE").val();
	
	jQuery.ajax({ 
	    url:"/stockRealExcelPreview.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: loadData,
		beforeSend : function(){ 	    
			if(tabClickNum == "1"){
				gridRoot3.addLoadingBar();		
			}else if(tabClickNum == "2"){
				gridRoot4.addLoadingBar();		
			}else if(tabClickNum == "3"){
				gridRoot5.addLoadingBar();		
			}
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
	       	if(tabClickNum == "1"){
				gridApp3.setData(data);			
				dataGrid3.setEnabled(true);
		       	gridRoot3.removeLoadingBar();		
			}else if(tabClickNum == "2"){
				gridApp4.setData(data);			
				dataGrid4.setEnabled(true);
		       	gridRoot4.removeLoadingBar();	
			}else if(tabClickNum == "3"){
				gridApp5.setData(data);			
				dataGrid5.setEnabled(true);
		       	gridRoot5.removeLoadingBar();	
			}	    
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	if(tabClickNum == "1"){
		dataGrid3.exportFileName = "재고결과현황_"+majorCategory+date+".xlsx";
		gridRoot3.excelExportSave("/gridExcelDown.do", false);		
	}else if(tabClickNum == "2"){
		dataGrid4.exportFileName = "재고결과현황_"+middleCategory+date+".xlsx";
		gridRoot4.excelExportSave("/gridExcelDown.do", false);
	}else if(tabClickNum == "3"){
		dataGrid5.exportFileName = "재고결과현황_"+subCategory+date+".xlsx";
		gridRoot5.excelExportSave("/gridExcelDown.do", false);
	}
}

//달성율
function perFunction12(item, value, column){
	var num1 = (item["SALE_PROFIT"] / item["SALE_SPRC"]) * 100;
	debugger;
	return perFunction(num1);    
}

function chgCate1(){ 
	$("select[name='P_POP_CLS_CODE'] option").remove();
	$("#P_POP_CLS_CODE").prepend("<option value=''>"+select+"</option>");
	   
	getCateCodeSelectBoxList("P_POP_MID_CODE","2",$('#P_POP_LRG_CODE' ).val());	 
}
function chgCate2(){	
	var num1 = $('#P_POP_MID_CODE' ).val().substr(0,2);
	$("#P_POP_LRG_CODE").val(num1).prop("selected", true);
		
	getCateCodeSelectBoxList("P_POP_CLS_CODE","3",$('#P_POP_MID_CODE' ).val());
}
function chgCate3(){	
	var num1 = $('#P_POP_CLS_CODE' ).val().substr(0,2);
	var num2 = $('#P_POP_CLS_CODE' ).val().substr(0,4);
	$("#P_POP_LRG_CODE").val(num1).prop("selected", true);
	$("#P_POP_MID_CODE").val(num2).prop("selected", true);		
}


//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#SET_VEN_CODE").val( $("#P_VEN_CODE").val() );
	if($("#P_ITEM_NAME").val() != null && $("#P_ITEM_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITEM_NAME").val());
		btn_comm_search('2');
	}
}


//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
}

//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#P_ITEM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
}


//점포명 변경 EVENT
function fnStrChange(){
	
	//그리드1 데이터 초기화 
	
	 $("#P_STR_CODE").val($("#P_STR_NAME").val());
	 
	 if($("#P_STR_NAME").val() == ""){
		  $("#P_INV_DT").find("option").remove();
		  $("#iframeCnt select[name=P_INV_DT]").append('<option value="">'+ select +'</option>');
		  $("#P_INV_BEFORE_DT").val("");
		  $("#P_INV_BEFORE_ID").val("");
	 }else{
		 
		var postValue ={};	
		postValue = { 
				  "STR_CODE"	: $("#P_STR_CODE").val() 
		};
			
		jQuery.ajax({
		    type:"POST",
		    url:"/getInvInspDtList.do",
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	
		    	$("#P_INV_DT").find("option").remove();
				//$("#iframeCnt select[name=P_INV_DT]").append('<option value="">'+ select +'</option>');
		    	
				for(var i = 0; i < data.length; i++){
					$("#P_INV_DT").append('<option data-CFM_FLAG="'+ data[i].CFM_FLAG +'" data-P_INV_INSP_GB="'+ data[i].INV_INSP_GB +'" value="'+ data[i].INV_INSP_SCHD_ID +'">'+ data[i].INV_DT+'</option>'); 
			   	}
				
				//전 재고조사일 조회
//				fnInvDtChange();
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	 }
	
}


//재고조사일정 ID 변경 EVENT
function fnInvDtChange(){
	//그리드1  데이터 초기화 
	 gridRoot1.removeAll( );
	 
	 $("#P_INV_BEFORE_DT").val("");
	//조사일정 아이디 NULL일시 조사일자 초기화 
	 if($("#P_INV_DT").val() == ""){
		  $("#P_INV_BEFORE_DT").val("");
		  $("#P_INV_BEFORE_ID").val("");
	 }else{
		 
		var postValue ={};	
		postValue = { 
				  "P_INV_DT"		: 	$("#P_INV_DT").val()
				 ,"P_STR_CODE"	: 	$("#P_STR_CODE").val()
		};
			
		jQuery.ajax({
		    type:"POST",
		    url:"/getInvBeforeDt.do",
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	if(data.length == 0){
		    		$("#P_INV_BEFORE_DT").val('');
		    		$("#P_INV_BEFORE_ID").val("");
		    	}else{
		    		$("#P_INV_BEFORE_DT").val(data[0].INV_BEFORE_DT);
		    		$("#P_INV_BEFORE_ID").val(data[0].INV_INSP_SCHD_ID);
		    	}
		    	
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	 }
	
}



function init() {

	
	
}

  

//########################################################
//###   상단 버튼 구현																				###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height( $(window).height() - 125);

	$(window).on('resize',function (){	
		$("#gridHolder1").height( $(window).height() - 125 );
	});
});

//탭1을 선택 했을때의 그리드1 조회
function tab1_search(){
	//var nStart = new Date().getTime();      //시작시간 체크(단위 ms)
	//var nEnd;
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	if($("#P_INV_DT").val()=="" || $("#P_INV_DT").val() == null){
		//재고실사일이 존재하지 않습니다.
		alert(stockExcelMent3);
		$('#P_INV_DT').focus();
		return;
	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	loadData.P_INV_INSP_SCHD_ID = loadData.P_INV_DT.replace(/-/gi, ''); 
	
	if(($.trim(loadData.P_VEN_NAME) == "" || $.trim(loadData.P_VEN_NAME) == null) &&
			   ($.trim(loadData.P_LRG_CODE) == "" || $.trim(loadData.P_LRG_CODE) == null))
	{
		alert("협력업체 또는 상품분류를 선택 해 주세요.");
		return;
	}
	
	//실사재고 조회
	jQuery.ajax({ 
	    url:"/getStockRealExcelList.do",         
	    type:"POST",
		datatype:"xml",
		//async:false,
		data: loadData, 
		beforeSend : function(){ 
			//로딩바 show
			showLoadingBar();
	    }, 
		success:function(data){  
			
			//그리드 JSON으로 변경
			gridApp1.setDataType("json");
			gridApp1.setLayout(layoutStr1);
			
			//그리드1 초기화
			gridRoot1.removeAll();
			
			gridApp1.setData(data);
			
            //로딩바 숨기기
            hideLoadingBar();

		},
	    complete : function(data) {
	    	//nEnd =  new Date().getTime();      //종료시간 체크(단위 ms)
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	//var nDiff = nEnd - nStart;      //두 시간차 계산(단위 ms)
	//alert(nDiff + "ms");
	
}

function labelFunc_SALE_WPRC(item, value, column)
{
	G_SALE_WPRC   =  value  ; 
	return value;
}

function labelFunc_SALE_PROFIT(item, value, column)
{
	G_SALE_PROFIT =  value  ; 
	return value;
}

// 원가율 :  (원가계/매가계) * 100 , 소수3자리에서  반올림
function labelFunc_SALE_WPRC_PER(item, value, column)
{
	var pTab	=	$("#P_TAB").val();
	if(pTab =="2"){
		var src =gridRoot4.getChangedData(true);
		for (var i = 0; i < src.length; i++){
			var  dataSet = src[i].data;
			if(dataSet.LRG_CODE == "소계"){
				var sum = (dataSet.SALE_WPRC/dataSet.SALE_PROFIT*100).toFixed(2);
				if(dataSet.SALE_PROFIT == "0" || dataSet.SALE_PROFIT == 0 ){
					sum=0;
				}
				gridRoot4.setItemFieldAt( sum , i, "SALE_WPRC_PER");
				gridRoot4.setItemFieldAt((100 - sum).toFixed(2) , i, "PROFIT");
			}
		}
	}
	
	if(pTab =="3"){
		var src =gridRoot5.getChangedData(true);
		for (var i = 0; i < src.length; i++){
			var  dataSet = src[i].data;
			if(dataSet.LRG_CODE == "소계" || dataSet.MID_CODE == "소계"){
				var sum = (dataSet.SALE_WPRC/dataSet.SALE_PROFIT*100).toFixed(2);
				if(dataSet.SALE_PROFIT == "0" || dataSet.SALE_PROFIT == 0 ){
					sum=0;
				}
				gridRoot5.setItemFieldAt( sum , i, "SALE_WPRC_PER");
				gridRoot5.setItemFieldAt((100 - sum).toFixed(2) , i, "PROFIT");
			}
		}
	}
	
	var rt = ( G_SALE_WPRC / G_SALE_PROFIT ) * 100 ;
	return  rt.toFixed(2)  ;
	 
} 

// 매익율 : 100-원가율, 소수3자리에서  반올림
function labelFunc_PROFIT()
{
	var rt =     100 -  ( ( G_SALE_WPRC / G_SALE_PROFIT ) * 100  ) ; 
	return  rt.toFixed(2)  ;
}




//엑셀 업로드
function excelUpload(){
	
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	
	$("#excelFile").val("");
	$('#excelFile').trigger('click');
	
}

//파일형식 체크 (엑셀만)
function checkFile(){
	
	//엑셀 업로드 플래그 체크 초기화
	if($("#excelFile").val()==""){
		//엑셀파일을 선택하세요.
		alert(stockRealMent9);
		return;
	}
	
	if( $("#excelFile").val() != "" ){
		var ext = $('#excelFile').val().split('.').pop().toLowerCase();
	    if($.inArray(ext, ['xls','xlsx']) == -1) {
	    	//xls,xlsx 파일만 업로드 할수 있습니다.
	    	alert(stockRealMent10);
			$("#excelFile").val("");
			return;
	    }
	}
	
	$("#PARAM1").val($("#P_STR_CODE").val());
	//P_INV_INSP_SCHD_ID 파라미터 셋팅
	$("#PARAM2").val($("#P_INV_DT").val().replace(/-/gi, ''));
	$("#PARAM3").val($("#P_INV_BEFORE_ID").val());
	
	//업로드 하시겠습니까?
	if (confirm(stockRealMent11)) {
		
		//엑셀 업로드 체크 플러그 N 처리
		$("#VALID_YN").val("N");
		
		//그리드1 로딩바 호출
		showLoadingBar();
        var options = {
            success : function(data) {
            	
            	//그리드 XML로 변경
            	gridApp1.setDataType("xml");
                gridApp1.setLayout(layoutStr1);
            	
            	$("#VALID_YN").val(data.VALID_YN);
            	//alert(data.VALID_YN);
                //그리드 로딩바 숨기기
                hideLoadingBar();
                
                //xml포맷 데이터 변경으로 인한 주석
                //gridApp1.setData(data.list);
                
                //업로드 완료후 그리드1,2 모두 초기화
                gridRoot1.removeAll( );
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
    				var STR_CODE 				= xmlDoc.createElement('STR_CODE');
    				var STR_NAME 				= xmlDoc.createElement('STR_NAME');
    				var INV_DT 					= xmlDoc.createElement('INV_DT');
    				var INV_INSP_SCHD_ID		= xmlDoc.createElement('INV_INSP_SCHD_ID');
    				var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
    				var MKT_GB_CODE 			= xmlDoc.createElement('MKT_GB_CODE'); 
    				var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
    				var VEN_CODE					= xmlDoc.createElement('VEN_CODE'); 
    				var VEN_NAME 				= xmlDoc.createElement('VEN_NAME');
    				var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE'); 
    				var ITM_CODE 				= xmlDoc.createElement('ITM_CODE'); 
    				var ITM_NAME 				= xmlDoc.createElement('ITM_NAME'); 
    				var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
    				var PUR_SALE_QTY 			= xmlDoc.createElement('PUR_SALE_QTY');
    				var INV_END_QTY 			= xmlDoc.createElement('INV_END_QTY');  
    				var SURVEYQTY2 					= xmlDoc.createElement('SURVEYQTY2');
    				var DEC_QTY 					= xmlDoc.createElement('DEC_QTY');
    				var LOSS_QTY 				= xmlDoc.createElement('LOSS_QTY');
    				var BEFORE_LOSS_QTY 	= xmlDoc.createElement('BEFORE_LOSS_QTY');
    				var WAMT 						= xmlDoc.createElement('WAMT');
    				var SPRC 						= xmlDoc.createElement('SPRC');
    				var LOSS_WAMT 				= xmlDoc.createElement('LOSS_WAMT');
    				var LOSS_SPRC 				= xmlDoc.createElement('LOSS_SPRC');
    				var VALID_YN 					= xmlDoc.createElement('VALID_YN');
    				 
    				STR_CODE.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].STR_CODE				));
    				STR_NAME.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].STR_NAME				));
    				INV_DT.appendChild(  					xmlDoc.createTextNode( 	data.CUR[i].INV_DT					));
    				INV_INSP_SCHD_ID.appendChild(    	xmlDoc.createTextNode( 	data.CUR[i].INV_INSP_SCHD_ID  	));
    				LINE_CODE.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].LINE_CODE  			));
    				MKT_GB_CODE.appendChild(  			xmlDoc.createTextNode(	data.CUR[i].MKT_GB_CODE			));
    				MKT_GB.appendChild(  					xmlDoc.createTextNode(	data.CUR[i].MKT_GB 					));
    				VEN_CODE.appendChild( 				xmlDoc.createTextNode(	data.CUR[i].VEN_CODE 				));
    				VEN_NAME.appendChild( 				xmlDoc.createTextNode(	data.CUR[i].VEN_NAME 				));
    				SCAN_CODE.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].SCAN_CODE			));
    				ITM_CODE.appendChild( 				xmlDoc.createTextNode(	data.CUR[i].ITM_CODE 				));
    				ITM_NAME.appendChild( 				xmlDoc.createTextNode(	data.CUR[i].ITM_NAME 				));
    				CLS_NAME.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].CLS_NAME  			));
    				PUR_SALE_QTY.appendChild( 			xmlDoc.createTextNode(	data.CUR[i].PUR_SALE_QTY		));
    				INV_END_QTY.appendChild(			xmlDoc.createTextNode(	data.CUR[i].INV_END_QTY			));
    				INV_END_QTY.appendChild(			xmlDoc.createTextNode(	data.CUR[i].INV_END_QTY			));
    				SURVEYQTY2.appendChild( 					xmlDoc.createTextNode(	data.CUR[i].SURVEYQTY2   				)); 
    				DEC_QTY.appendChild( 					xmlDoc.createTextNode(	data.CUR[i].DEC_QTY   				)); 
    				LOSS_QTY.appendChild(				xmlDoc.createTextNode(	data.CUR[i].LOSS_QTY	    		));
    				BEFORE_LOSS_QTY.appendChild(		xmlDoc.createTextNode(	data.CUR[i].BEFORE_LOSS_QTY	));
    				WAMT.appendChild(						xmlDoc.createTextNode(	data.CUR[i].WAMT					));
    				SPRC.appendChild(						xmlDoc.createTextNode(	data.CUR[i].SPRC						));
    				LOSS_WAMT.appendChild(				xmlDoc.createTextNode(	data.CUR[i].LOSS_WAMT 			));
    				LOSS_SPRC.appendChild(				xmlDoc.createTextNode(	data.CUR[i].LOSS_SPRC 			));
    				VALID_YN.appendChild(					xmlDoc.createTextNode(	data.CUR[i].VALID_YN				));
    				  
    				
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_DT);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_INSP_SCHD_ID);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SALE_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEYQTY2);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BEFORE_LOSS_QTY);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WAMT);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_WAMT);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_SPRC);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VALID_YN);   
    				
    				//xml데이터 형변환 후 row add
    				gridRoot1.addItemAt(  xmlDoc  , -1 , false);
    			}
    			
                
                if(data.VALID_YN == "Y"){
                	//모든 데이터가 업로드 되었습니다. \n내용 확인 후 저장하여 서버에 등록하세요.
                	alert(stockRealMent12+"\n"+stockRealMent13);
                }else{
                	//엑셀 업로드 데이터 형식이 잘못 되었습니다.\n데이터를 올바르게 수정 한 뒤 엑셀업로드를 하세요.
                	alert(stockExcelMent4+'\n'+stockExcelMent5);
                }
                
            },
            error : function(xhr, status, error){
            	CommonJs.alertErrorStatus(xhr.status, error);
            	hideLoadingBar();
            },
            datatype:"json",
            type : "POST"
        };
        $("#frmUpload").attr("action", "/stockExcelUpload.do");
        $("#frmUpload").ajaxSubmit(options);

    }
	//$("#frmUpload").attr("action", "/stockGridExcelUpload.do");
	//$("#frmUpload").submit();
	//checkData();
}

//엑셀업로드시 유효성체크에 걸린 row 체크하여 색갈칠하기
function checkData(){
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	var valueCheckCnt = 0;
	for (var i = 0; i < dataCnt; i++) {
		var VALID_YN = gridRoot1.getItemFieldAt( i , "VALID_YN");	
		if(VALID_YN =="N"){
			 collection1.addRowAttributeDetailAt(i , "", "#ff6666", "", false, '');
			 //alert(rowData.SCAN_CODE);
			 
			 valueCheckCnt++;
			 
			 //문제가 발생시 플래그 N
			 $("#VALID_YN").val("N");
		}
	};
	
	if(valueCheckCnt == 0){
		//모든 검증작업 후 데이터 이상이 없을경우 플래그 Y
		 $("#VALID_YN").val("Y");
	}
	
	
}


//그리드 로딩바  보이기
function showLoadingBar() {
    gridRoot1.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar() {
    gridRoot1.removeLoadingBar();
}


//탭1 저장
function tab1_saveCheck(){
	
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	

	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//저장할 데이터가 없습니다.
		alert(stockRealMent17);
		return;
	}
	
	//데이터 유효성 검사
	checkData();
	
	if($("#VALID_YN").val()=="N"){
		//엑셀 업로드 데이터 형식이 잘못 되었습니다.\n데이터를 올바르게 수정 한 뒤 엑셀업로드를 하세요.
		alert(stockExcelMent4+'\n'+stockExcelMent5);
		return;
	}
	
	//엑셀 업로드 유무 체크
		if(gridRoot1.dataType == 'json' ){
			//업로드된 엑셀데이터가 없습니다.
//			alert(stockExcelMent6);
			alert("변경된 항목이 없습니다.");
			return;
	}
	
	var gridXmlData1 = "";
	//실사재고등록 데이터  XML로 뽑기  - xml
	var rowCnt  = gridRoot1.getCollection().getSource() ;  
	for(var i=0 ; i < rowCnt.length ; i++)
	{    
		gridXmlData1 = gridXmlData1 + getXmlString(gridRoot1.getItemAt(i));     
	}
	
	gridXmlData1 =  "<GRIDLIST>"+gridXmlData1+"</GRIDLIST>" ;
	//alert(gridXmlData1);
	
	var loadData = $("#top_search").serializeAllObject();
	loadData.gridXmlData1 = gridXmlData1;
	
	//저장하시겠습니까?
	if(confirm(msgSaveConfirm) == false) return;
	
	//실사재고 저장
	jQuery.ajax({ 
	    url:"/saveStockExcelData.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: loadData, 
		success:function(data){  
			//결과리턴
			var obj = jQuery.parseJSON(data.CUR);
			if(  obj[0].RETURN_CODE  == "0000")
			{   
				//저장되었습니다.
				alert(msgSave);
				//조회
				tab1_search();
			}else{
				//요청중 문제가 발생했습니다.관리자에게 문의하세요.
				alert(msgErrorDefault);
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
 

function tab1_saveFinishCheck(){
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	
	//재고조사일정ID의 재고실사등록 확정 여부 체크
	if($("#P_INV_DT option:selected").data("cfm_flag")=="2"){
		//선택하신 재고실사조사가 완료되어 수정 할 수 없습니다.
		alert(stockRealMent8);
		return;
	}else if($("#P_INV_DT").val()==""){
		alert("재고실사일을 선택 해 주세요.");
		return;
	}
	
	
	var loadData = $("#top_search").serializeAllObject();
	
	//일곡점(2017-001) 재고조사를 확정처리 하시겠습니까?
	if(confirm($("#P_STR_NAME option:selected").text()+"("+ $("#P_INV_DT").val() +") "+stockRealMent20+'\n'+"확정 후 더 이상 수정이 불가능 합니다.") == false) return;
	
	
	jQuery.ajax({ 
	    url:"/confirmStockRealExcelFinish.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: loadData, 
		success:function(data){   
			//결과리턴
			var obj = jQuery.parseJSON(data.CUR);
			if(  obj[0].RETURN_CODE  == "0000")
			{   
				//확정처리되었습니다.
				alert(mentWmsIn8);
//				//조회
//				tab1_search();
				$("#P_INV_DT option:selected").data("cfm_flag","2");
			}else{
				//요청중 문제가 발생했습니다.관리자에게 문의하세요.
				alert(msgErrorDefault);
				return;
			}
			
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//alert(gridXmlData2);
	//alert("확정");
	
}





//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################



// 엑셀 export (엑셀다운로드 그리드기능 이용)
//excelExportSave(url:String, async:Boolean);
// url : 업로드할 서버의 url, 기본값 null
// async : 비동기 모드로 수행여부, 기본값 false
function ExcelDownload1() {
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	
	//엑셀다운 필드 지정                     
	dataGrid1.exportColumns = [1,2,3,4,5,6,11,12,18,22];
	dataGrid1.exportFileName = "실사재고엑셀등록_"+$("#P_STR_NAME option:selected").text()+"_"+$("#P_INV_DT option:selected").text()+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
	
};

function btnExcell() {
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	dataGrid1.exportColumns = [];
	dataGrid1.exportFileName = "실사재고엑셀등록_"+$("#P_STR_NAME option:selected").text()+"_"+$("#P_INV_DT option:selected").text()+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
	
};

//행추가 팝업 오픈
function btn_popup() {
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	$('#pop_wrap1').dialog( 'open' );
	
	//그리드 XML로 변경
	gridApp1.setDataType("xml");
    gridApp1.setLayout(layoutStr1);
	
    //업로드 완료후 그리드1,2 모두 초기화
    gridRoot1.removeAll( );
	
	//팝업오픈시 스캔코드 포커스 
	$('#P_POP_SCAN_CODE').focus();
	$('#P_POP_SCAN_CODE').val("");
	
	$("#P_POP_STR_NAME").val("");
	//팝업 점포 선택
	fnPopStrChange();
	
	//팝업 데이터 초기화
	clearePop();
}

//실사재고등록 팝업 닫기
function pop1_close() {
	$("#pop_wrap1").dialog("close");
}	


//팝업 점포선택 이벤트
function fnPopStrChange(){
	
	if($("#P_STR_CODE").val() == "00000"){
		$("#P_POP_STR_NAME").removeAttr('disabled');
	}else{
		$("#P_POP_STR_NAME").val($("#P_STR_CODE").val());
		$("#P_POP_STR_CODE").val($("#P_POP_STR_NAME").val());
		$("#P_POP_STR_NAME").attr("disabled", 'disabled');
	}
	fnSelectChangeText();
	
}

function fnSelectChangeText(){
	
	$("#P_POP_STR_CODE").val($("#P_POP_STR_NAME").val());
}

//팝업 데이터 초기화
function clearePop(){
	$('#P_POP_INV_QTY').val("");
	$('#P_POP_MKT_GB').val("1");
	
	$('#P_POP_ITM_NAME').val("");
	$('#P_POP_CLS_NAME').val("");
	$('#P_POP_UNIT').val("");
	$('#P_POP_SPRC').val("");
	$('#P_POP_VEN_NAME').val("");
	$('#P_POP_SPRC').attr("disabled","true");
}

function pop1_save() {
	
	if($("#P_POP_STR_CODE").val()==""){
		//점포는 필수입력 입니다.
		alert(stockRealMent4);
		$('#P_POP_STR_NAME').focus();
		return;
	}
	
	if($("#P_POP_SCAN_CODE").val()==""){
		//스캐닝 코드는 필수입력 입니다.
		alert(stockRealMent24);
		$('#P_POP_SCAN_CODE').focus();
		return;
	}
	if($("#P_POP_INV_QTY").val()==0){
		//조사수량은 필수입력 입니다.
		alert(stockRealMent25);
		$('#P_POP_INV_QTY').focus();
		return;
	}
	if($("#P_POP_ITM_NAME").val()==""){
		//조회된 상품이 없습니다. 스캐닝코드를 확인하세요.
		alert(stockRealMent28);
		return;
	}
	
	//소팅상태에서는 행추가가 되지 않으므로 초기화
	collection1.setSort(null);
  // collection 정보를 새로고침합니다.
  collection1.refresh();
	

	
	//P_INV_INSP_SCHD_ID 파라미터 셋팅
	var P_INV_DT =$("#P_INV_DT").val().replace(/-/gi, '');
	var P_INV_INSP_SCHD_ID =$("#P_INV_DT option:selected").text().replace(/-/gi, '');
	
	var postValue = { 
			  "P_STR_CODE"	: $("#P_STR_CODE").val()
			, "P_INV_DT"	: P_INV_INSP_SCHD_ID
			, "P_INV_BEFORE_ID" : $("#P_INV_BEFORE_ID").val()
			, "P_INV_INSP_SCHD_ID" : P_INV_DT
			, "P_POP_SCAN_CODE" : $("#P_POP_SCAN_CODE").val()
			, "P_POP_INV_QTY" : $("#P_POP_INV_QTY").val()
			, "P_POP_MKT_GB" : $("#P_POP_MKT_GB").val()
			, "P_POP_ITM_CODE" : $("#P_POP_ITM_CODE").val()
			, "P_POP_SPRC" : $("#P_POP_SPRC").val()
			, "P_LINE_CODE" : "0"
	};
	jQuery.ajax({
	    type:"POST",
	    url:"/stockExcelUploadSave.do",
	    dataType:"JSON",  
	    data:postValue,
	    async:false,
	    success : function(data) {
	        gridApp1.setDataType("xml");
	        gridApp1.setLayout(layoutStr1);
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
	    	var STR_CODE 				= xmlDoc.createElement('STR_CODE');
	    	var STR_NAME 				= xmlDoc.createElement('STR_NAME');
	    	var INV_DT 					= xmlDoc.createElement('INV_DT');
	    	var INV_INSP_SCHD_ID		= xmlDoc.createElement('INV_INSP_SCHD_ID');
	    	var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
	    	var MKT_GB_CODE 			= xmlDoc.createElement('MKT_GB_CODE'); 
	    	var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
	    	var VEN_CODE					= xmlDoc.createElement('VEN_CODE'); 
	    	var VEN_NAME 				= xmlDoc.createElement('VEN_NAME');
	    	var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE'); 
	    	var ITM_CODE 				= xmlDoc.createElement('ITM_CODE'); 
	    	var ITM_NAME 				= xmlDoc.createElement('ITM_NAME'); 
	    	var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
	    	var PUR_SALE_QTY 			= xmlDoc.createElement('PUR_SALE_QTY');
	    	var INV_END_QTY 			= xmlDoc.createElement('INV_END_QTY');  
	    	var DEC_QTY 					= xmlDoc.createElement('DEC_QTY');
	    	var LOSS_QTY 				= xmlDoc.createElement('LOSS_QTY');
	    	var BEFORE_LOSS_QTY 	= xmlDoc.createElement('BEFORE_LOSS_QTY');
	    	var WAMT 						= xmlDoc.createElement('WAMT');
	    	var SPRC 						= xmlDoc.createElement('SPRC');
	    	var LOSS_WAMT 				= xmlDoc.createElement('LOSS_WAMT');
	    	var LOSS_SPRC 				= xmlDoc.createElement('LOSS_SPRC');
	    	var VALID_YN 					= xmlDoc.createElement('VALID_YN');
	    	
			STR_CODE.appendChild(  				xmlDoc.createTextNode( 	data[0].STR_CODE				));
			STR_NAME.appendChild(  				xmlDoc.createTextNode( 	data[0].STR_NAME				));
			INV_DT.appendChild(  					xmlDoc.createTextNode( 	data[0].INV_DT					));
			INV_INSP_SCHD_ID.appendChild(    	xmlDoc.createTextNode( 	data[0].INV_INSP_SCHD_ID  	));
			LINE_CODE.appendChild(  				xmlDoc.createTextNode( 	data[0].LINE_CODE  			));
			MKT_GB_CODE.appendChild(  			xmlDoc.createTextNode(	data[0].MKT_GB_CODE			));
			MKT_GB.appendChild(  					xmlDoc.createTextNode(	data[0].MKT_GB 					));
			VEN_CODE.appendChild( 				xmlDoc.createTextNode(	data[0].VEN_CODE 				));
			VEN_NAME.appendChild( 				xmlDoc.createTextNode(	data[0].VEN_NAME 				));
			SCAN_CODE.appendChild(  			xmlDoc.createTextNode( 	data[0].SCAN_CODE			));
			ITM_CODE.appendChild( 				xmlDoc.createTextNode(	data[0].ITM_CODE 				));
			ITM_NAME.appendChild( 				xmlDoc.createTextNode(	data[0].ITM_NAME 				));
			CLS_NAME.appendChild(  				xmlDoc.createTextNode( 	data[0].CLS_NAME  			));
			PUR_SALE_QTY.appendChild( 			xmlDoc.createTextNode(	data[0].PUR_SALE_QTY		));
			INV_END_QTY.appendChild(			xmlDoc.createTextNode(	data[0].INV_END_QTY			));
			DEC_QTY.appendChild( 					xmlDoc.createTextNode(	data[0].DEC_QTY   				)); 
			LOSS_QTY.appendChild(				xmlDoc.createTextNode(	data[0].LOSS_QTY	    		));
			BEFORE_LOSS_QTY.appendChild(		xmlDoc.createTextNode(	data[0].BEFORE_LOSS_QTY	));
			WAMT.appendChild(						xmlDoc.createTextNode(	data[0].WAMT					));
			SPRC.appendChild(						xmlDoc.createTextNode(	data[0].SPRC						));
			LOSS_WAMT.appendChild(				xmlDoc.createTextNode(	data[0].LOSS_WAMT 			));
			LOSS_SPRC.appendChild(				xmlDoc.createTextNode(	data[0].LOSS_SPRC 			));
			VALID_YN.appendChild(					xmlDoc.createTextNode(	data[0].VALID_YN				));

	    	
	    	
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_DT);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_INSP_SCHD_ID);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SALE_QTY);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_QTY);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BEFORE_LOSS_QTY);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WAMT);
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_WAMT);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_SPRC);   
	    	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VALID_YN);   
	    	
	    	// 0 : 맨위에 추가 ,  -1 :맨 아래에 추가 
	    	gridRoot1.addItemAt(  xmlDoc  , -1 , false);
	    	
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
		
    				
	
	//계속등록기능 변경으로 주석처리
	//$("#pop_wrap1").dialog("close");
	
	//팝업내용 초기화 처리
	clearePop();
	$('#P_POP_SCAN_CODE').val("");
	//새로운 스캔코드 입력을 위한 포커스 처리
	$('#P_POP_SCAN_CODE').focus();
}	


/********************************************************
 * 분류공통코드의 SELECT BOX 리스트를 생성한다. 대중소리스트 박스 사용가능
 * SELECTBOX_ID		:  html오브젝트ID        
 * CATE_GUBUN	    :  대(1)중(2)소(3) 구분
 * CATE_CODE        :  분류코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. ex) 010101
 ******************************************************/
function getCateCodeSelectBoxList(SELECTBOX_ID , CATE_GUBUN, CATE_CODE ){
	var postValue ={};	
	postValue = { 
			  "CATE_GUBUN"	: CATE_GUBUN 
			, "CATE_CODE"	: CATE_CODE  
	};
	 
	jQuery.ajax({
	    type:"POST",
	    url:"/getCateCodeSelectBoxList.do",
	    dataType:"JSON",  
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	$("select[name="+SELECTBOX_ID+"   ] option").remove();
	    	$("#"+SELECTBOX_ID).append('<option value="">'+all+'</option>'); 
			for(var i = 0; i < data.length; i++){
				 $("#"+SELECTBOX_ID).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function clearVenCode(){
	if($('#P_VEN_NAME').val() == "" )
	{
		$('#P_VEN_CODE').val("");
	}
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

//XML스트링 변환
function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

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


//XML 형태로 데이터 넣기
function changeXMLData() {
    gridApp1.setDataType("xml");
    gridApp1.setLayout(layoutStr1);
    gridApp1.setData(gridData1);
}

//JSON 형태로 데이터 넣기
function changeJSONData() {
	gridApp1.setDataType("json");
	gridApp1.setLayout(layoutStr1);
	gridApp1.setData(gridData1);
}
