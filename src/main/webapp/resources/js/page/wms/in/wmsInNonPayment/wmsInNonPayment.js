/********************************************************
*    설명: WMS - 미납현황조회
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-01-13    문희훈       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/
	
$(document).ready(function(){
	
	init();
	
	/**검색조건 날짜 체크*/
	 $(".datepicker1").datepicker({ onSelect: function(dateText){ 	 	 
			 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			 if($("#P_PUR_SDAY").val()  >  $("#P_PUR_EDAY").val()){   
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_PUR_SDAY").val(CUR_DT);
				return;
			}	 
		}, 	
		showMonthAfterYear:true 
	});
		 
	$(".datepicker2").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if($("#P_PUR_SDAY").val()  >  $("#P_PUR_EDAY").val()){
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_PUR_EDAY").val(CUR_DT);
				return;
			}	 
		}, 	
		showMonthAfterYear:true 
	});
	
	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeMonthDate = new CommDateManager().before(0, 0).getDate("yyyy-mm"); // 일주일전 before(년,월,일)
	
	$("#P_PUR_EDAY").val(lsToDate);
	$("#P_PUR_SDAY").val(beforeMonthDate+'-01');
	
	//입고구분
	$("#iframeCnt select[name=P_PUR_GB]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=P_PUR_GB]", "PUR_GB");
	
	// 팝업의 조회조건절의 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) { 
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_supply_search();
		} 
	});
	// 팝업의 조회조건절의 엔터시 검색되게....
	$("input[name=P_ITEM_NAME]").keydown(function (key) { 
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

//입고 확정 금액
var purMoney = 0;
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
	<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle" showDataTips="true" >\
			<groupedColumns>\
			 	<DataGridColumn dataField="VEN_CODE" headerText="'+venCode+'" textAlign="center" sortable="false" width="100"/>\
				<DataGridColumn dataField="VEN_NAME" headerText="'+venName+'" textAlign="left" sortable="false"/>\
				<DataGridColumn dataField="ITM_CODE" headerText="'+itmCode+'" textAlign="center" sortable="false"  width="120"/>\
				<DataGridColumn dataField="ITM_NAME" headerText="'+itmName+'" textAlign="left" sortable="false" />\
				<DataGridColumn dataField="UNIT" headerText="'+unit+'" textAlign="center" sortable="false" width="80" />\
				<DataGridColumn dataField="PUR_GB"  headerText="'+goodsReceiptType+'" textAlign="center" width="80" />\
				<DataGridColumn dataField="PUR_DT"  headerText="'+dateOfReceipt+'" textAlign="center" width="80" />\
				<DataGridColumn dataField="ORD_QTY" headerText="'+orderQuantity+'" textAlign="right"  formatter="{numfmt}" width="80" />\
			    <DataGridColumn dataField="DEC_QTY" headerText="'+quantityReceived+'" textAlign="right"   formatter="{numfmt}" width="80" />\
				<DataGridColumn dataField="NON_QTY" headerText="'+nonQty+'"  textAlign="right"  formatter="{numfmt}" width="80" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="VEN_CODE"/>\
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
	
	loadData.P_PUR_SDAY = loadData.P_PUR_SDAY.replace(/-/gi, '');
	loadData.P_PUR_EDAY = loadData.P_PUR_EDAY.replace(/-/gi, '');
	
	if(loadData.P_PUR_SDAY  >  loadData.P_PUR_EDAY){
		//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
		alert(msgDateValidation);
		$("#P_PUR_SDAY").focus();
		return;
	}
	
	gridApp1.setData(gridData);

	//로딩바 보이기
	showLoadingBar1();
	//그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/getWmsNonPaymentList.do",         
	    type:"POST",
		datatype:"json",
		
		data: loadData,
		success:function(data){  
			//alert(data.list);
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
	//$('#BUSI_NO' ).val(BUSI_NO);		// 사업자번호
}


//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#P_ITEM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
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
	
	var P_PUR_SDAY = $.trim($('#P_PUR_SDAY').val()); 
	var P_PUR_EDAY = $.trim($('#P_PUR_EDAY').val());
	var P_VEN_NAME = $.trim($('#P_VEN_NAME').val());
	var P_PUR_GB = $.trim($('#P_PUR_GB').val()); 
	var P_ITEM_NAME = $.trim($('#P_ITEM_NAME').val()); 
	var P_COLUMN_NAME = $.trim($('#P_COLUMN_NAME').val());
	var P_ORDERBY = $.trim($('#P_ORDERBY').val());
	 
	//엑셀호출
	$.download('/wmsNonPaymentExcelDown.do',"P_PUR_SDAY="+P_PUR_SDAY 
															+"&P_PUR_EDAY="+P_PUR_EDAY
															+"&P_VEN_NAME="+P_VEN_NAME
															+"&P_PUR_GB="+P_PUR_GB
															+"&P_ITEM_NAME="+P_ITEM_NAME
															+"&P_COLUMN_NAME="+P_COLUMN_NAME
															+"&P_ORDERBY="+P_ORDERBY
															,"post" );
	
};


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


//그리드 로딩바  보이기
function showLoadingBar1() {
  gridRoot1.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar1() {
  gridRoot1.removeLoadingBar();
}

function clearVenCode(){
	if($('#P_VEN_NAME').val() == "" )
	{
		$('#P_VEN_CODE').val("");
	}
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
