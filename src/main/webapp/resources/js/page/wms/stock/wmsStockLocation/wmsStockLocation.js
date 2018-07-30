/********************************************************
*    설명: WMS - Location 재고조회
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-03-16    문희훈       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/
	
$(document).ready(function(){
	
	init();
//	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
//	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
//	var beforeMonthDate = new CommDateManager().before(0, 0,1).getDate("yyyy-mm-dd"); // 일주일전 before(년,월,일)
//	
//	$("#P_INV_DT").val(beforeMonthDate);
	
	// 재고조사 물류센터 리스트 조회
	$("#iframeCnt select[name=P_STR_NAME]").append('<option value="">'+ select +'</option>');
	
	var loadData= {};
	
	jQuery.ajax({
	    type:"POST",
	    url:"/getWmsStockOrganizationList.do", 	//WmsStockScheduleController.java 호출
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:loadData,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#P_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//검색조건 Location 셀렉트 박스 셋팅
	$("#iframeCnt select[name=P_ZONE_CODE]").append('<option value="">'+ all +'</option>');
	$("#iframeCnt select[name=P_RACK_CODE]").append('<option value="">'+ all +'</option>');
	$("#iframeCnt select[name=P_LINE_CODE]").append('<option value="">'+ all +'</option>');
	
	// 팝업의 조회조건절의 엔터시 검색되게....
	$("input[name=P_ITM_NAME]").keydown(function (key) { 
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_product_search();
		} 
	});
	
});

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
rMateGridH5.create("grid1", "gridHolder1", jsVars1);

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1;

//그리드1 데이터 초기화
var gridData = [];

//헤더정렬을 위한 FALG
var searchFlag ="";

var totalCnt="0";	// 전체건수
var RowsPerPage = 25;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호
var orderBy = "";
var columnName = ""; 


//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp1.setData(gridData);

	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	
}

//그리드1 layoutCompleteHandler1
function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
	
}


//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
	
	drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
}




//----------------------- 그리드 설정 끝 -----------------------


//<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="40" /> 넘버링을 하면 병합오류 발생
//그리드1 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle" showDataTips="true">\
			<groupedColumns>\
			 	<DataGridColumn dataField="ZONE_CODE" headerText="ZONE_CODE" visible="false" sortable="false"/>\
				<DataGridColumn dataField="ZONE_NAME" headerText="ZONE" textAlign="center" width="100" sortable="false"/>\
				<DataGridColumn dataField="RACK_CODE" headerText="RACK_CODE" visible="false" sortable="false"/>\
				<DataGridColumn dataField="RACK_NAME" headerText="RACK" textAlign="center"  width="100" sortable="false"/>\
				<DataGridColumn dataField="LINE_CODE" headerText="LINE_CODE" visible="false" sortable="false"/>\
				<DataGridColumn dataField="LINE_NAME" headerText="LINE" textAlign="center" width="100" sortable="false"/>\
				<DataGridColumn dataField="VEN_NAME" headerText="'+venName+'" textAlign="left"/>\
				<DataGridColumn dataField="ITM_CODE" headerText="'+itmCode+'" textAlign="center" sortable="false"  width="120"/>\
				<DataGridColumn dataField="ITM_NAME" headerText="'+itmName+'" textAlign="left" />\
				<DataGridColumn dataField="SCAN_CODE" headerText="'+scanCode+'" textAlign="center" width="120" sortable="false"/>\
				<DataGridColumn dataField="UNIT" headerText="'+unit+'" textAlign="center" sortable="false" width="70" />\
			    <DataGridColumn dataField="CUR_INV_QTY" headerText="' + realStock + '" textAlign="right"   formatter="{numfmt}" width="80" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="ZONE_CODE"/>\
						<SpanMergingField name="ZONE_NAME"/>\
						<SpanMergingField name="RACK_CODE"/>\
						<SpanMergingField name="RACK_NAME"/>\
						<SpanMergingField name="LINE_CODE"/>\
						<SpanMergingField name="LINE_NAME"/>\
						<SpanMergingField name="VEN_NAME"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
		</dataProvider>\
	</DataGrid>\
</rMateGrid>';

//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {
	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	btn_search(false);
}

//그리드 페이지 이동
function gridMovePage(page) {
	
	//alert(page);
	$("#pageIndex").val(page);
	pageIndex = page;
	
	btn_search(false);
	
}
// ----------------------- 그리드 설정 끝 -------------------------------------


function init() {

	
	
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
 
//점포명 변경 EVENT
function fnStrChange(){
	
	 var loadData ={};	
	
	 //그리드1, 페이징 데이터 초기화 (엑셀등록 또는 행추가 등록은 점포명, 재고조사일정id가 key이기 때문임)
	 gridRoot1.removeAll( );
	 drawGridPagingNavigation(0, RowsPerPage, pageIndex, "gridMovePage");
	
	 $("#P_STR_CODE").val($("#P_STR_NAME").val());
	 
	 
	 //ZONE 정보 조회
	 //1.모든 로케이션 셀렉트박스 초기화처리
	 $("#P_ZONE_CODE").find("option").remove();
	 $("#iframeCnt select[name=P_ZONE_CODE]").append('<option value="">'+ all +'</option>');
	 $("#P_RACK_CODE").find("option").remove();
     $("#iframeCnt select[name=P_RACK_CODE]").append('<option value="">'+ all +'</option>');	 
     $("#P_LINE_CODE").find("option").remove();
	 $("#iframeCnt select[name=P_LINE_CODE]").append('<option value="">'+ all +'</option>');
	  
	 //2.점포(물류창고)를 선택 했다면 선택한 점포의 ZONE코드 리스트 조회
	 if($("#P_STR_NAME").val() != ""){

		 loadData.STR_CODE = $("#P_STR_NAME").val();
			 
		 jQuery.ajax({
		    type:"POST",
		    url:"/selectWmsInZone.do", 
		    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		    data:loadData,
		    async:false,
		    success : function(data) {
		    	if(data.length > 0){
					for(var i=0 ; i < data.length ; i++){
						$("#P_ZONE_CODE").append('<option value="'+ data[i].ZONE_CODE +'">'+ data[i].ZONE_NAME +'</option>'); 
					}
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

//팝업 : ZONE 셀렉트 박스 체인지 이벤트
function fnPopZoneSelect(){
	
	//RACK 정보 조회
	//1.RACK, LINE 셀렉트박스 초기화처리
	$("#P_RACK_CODE").find("option").remove();
	$("#top_search select[name=P_RACK_CODE]").append('<option value="">'+ select +'</option>');	 
	$("#P_LINE_CODE").find("option").remove();
	$("#top_search select[name=P_LINE_CODE]").append('<option value="">'+ select +'</option>');
	
	//2.ZONE를 선택 했다면 선택한 RACK코드 리스트 조회
	if($("#P_ZONE_CODE").val() != ""){
		jQuery.ajax({ 
	    url:"/selectWmsInRack.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#top_search select[name=P_STR_NAME]").val()
				,	'ZONE_CODE' : $("#top_search select[name=P_ZONE_CODE]").val()
				},
		success:function(data){  
			if(data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					$("#P_RACK_CODE").append('<option value="'+ data[i].RACK_CODE +'">'+ data[i].RACK_NAME +'</option>'); 
					}
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	}
	
	$('#P_RACK_CODE').focus();
	
}

//팝업 : RACK 셀렉트 박스 체인지 이벤트
function fnPopRackSelect(){
	//LINE 정보 조회
	//1. LINE 셀렉트박스 초기화처리
	$("#P_LINE_CODE").find("option").remove();
	$("#top_search select[name=P_LINE_CODE]").append('<option value="">'+ select +'</option>');
	
	//2.RACK를 선택 했다면 선택한 점포의 LINE코드 리스트 조회
	if($("#P_RACK_CODE").val() != ""){
		jQuery.ajax({ 
		    url:"/selectWmsInLine.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {	
						'STR_CODE' : $("#top_search select[name=P_STR_NAME]").val()
					   ,'RACK_CODE' : $("#top_search select[name=P_RACK_CODE]").val()
			},
			success:function(data){  
				if(data.length > 0){
					for(var i=0 ; i < data.length ; i++){
						$("#P_LINE_CODE").append('<option value="'+ data[i].LINE_CODE +'">'+ data[i].LINE_NAME +'</option>'); 
					}
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	}
	
	$('#P_LINE_CODE').focus();
}

//팝업 : LINE 셀렉트 박스 체인지 이벤트
function fnPopLineSelect(){
	$('#P_INV_DT').focus();
}


//조회 (searchFlag -> true : 헤더정렬 기본값으로    false : 헤더정렬 값 유지)
function btn_search(searchFlag){
	
	//조회시 그리드1 선택 데이터 초기화
	dataRow1 = null;
	
	
	if(searchFlag  ==  true){
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
		//페이지 1페이지로 이동
		pageIndex = 1;
		$("#pageIndex").val(pageIndex);
	}
	
	var loadData =  $("#top_search").serializeAllObject();
	
	if(loadData.P_STR_CODE==""){
		//점포는 필수입력 입니다.
		alert(stockRealMent4);
		$('#P_STR_NAME').focus();
		return;
	}
	
//	loadData.P_INV_DT = loadData.P_INV_DT.replace(/-/gi, '');	
	//alert(loadData.P_ITM_NAME);
	gridApp1.setData(gridData);

	//로딩바 보이기
	showLoadingBar1();
	//그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/getWmsStockLocationList.do",         
	    type:"POST",
		datatype:"json",
		
		data: loadData,
		success:function(data){  
			gridData = data.list; 
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
	    },
	    complete : function(data) {
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITM_NAME").val());
		btn_comm_search('2');
	}
}


//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#P_ITM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
	//$('#P_ITEM_CODE' ).val(ITM_CODE);				// 상품코드
	//$('#SCAN_CODE' ).val(SCAN_CODE);			// 스캔코드
	//$('#ITM_SHORT_NAME' ).val(ITM_SHORT_NAME);	// 단축상품명
}


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 137 );

	$(window).on('resize',function (){	
		
		$("#gridHolder1").width("100%");
		$("#gridHolder1").height( $(window).height() - 137 );
		
	});
});

//XML스트링 변환
function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}



//엑셀다운로드
function ExcelDownload() {
	var P_STR_CODE = $.trim($('#P_STR_CODE').val()); 
	var P_ITM_NAME = $.trim($('#P_ITM_NAME').val());
	var P_ZONE_CODE = $.trim($('#P_ZONE_CODE').val());
	var P_RACK_CODE = $.trim($('#P_RACK_CODE').val()); 
	var P_LINE_CODE = $.trim($('#P_LINE_CODE').val());
	//var P_INV_DT = $.trim($('#P_INV_DT').val().replace(/-/gi, '')); 
	var P_COLUMN_NAME = $.trim($('#P_COLUMN_NAME').val());
	var P_ORDERBY = $.trim($('#P_ORDERBY').val());
	
	if(P_STR_CODE==""){
		//점포는 필수입력 입니다.
		alert(stockRealMent4);
		$('#P_STR_NAME').focus();
		return;
	}
	//로딩바 보이기
	showLoadingBar1();
	//엑셀호출
	$.download('/wmsStockLocationExcelDown.do',"P_STR_CODE="+P_STR_CODE 
															+"&P_ITM_NAME="+P_ITM_NAME
															+"&P_ZONE_CODE="+P_ZONE_CODE
															+"&P_RACK_CODE="+P_RACK_CODE
															+"&P_LINE_CODE="+P_LINE_CODE
															//+"&P_INV_DT="+P_INV_DT
															+"&P_COLUMN_NAME="+P_COLUMN_NAME
															+"&P_ORDERBY="+P_ORDERBY
															,"post" );
	
	var loadData =  $("#top_search").serializeAllObject();
	//loadData.P_INV_DT = loadData.P_INV_DT.replace(/-/gi, '');	
	
	//로딩바 숨기기를 위한 url호출
	jQuery.ajax({ 
	    url:"/wmsStockLocationExcelDown.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		success:function(data){  
			//console.log(data);
	    },
	    complete : function(data) {
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
};


//엑셀다운을 위한 폼 생성 함수
jQuery.download = function(url, data, method) {
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


//그리드 로딩바  보이기
function showLoadingBar1() {
  gridRoot1.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar1() {
  gridRoot1.removeLoadingBar();
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
