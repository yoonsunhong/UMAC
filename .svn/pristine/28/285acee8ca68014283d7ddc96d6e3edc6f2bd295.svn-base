/********************************************************
 * 설명:  단품별매출손익
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.01.10
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
//var gridApp2, gridRoot2, dataGrid2, dataRow2;

//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//var gridData1ClickStrCode = "";

var totalCnt;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData();
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
	selectorColumn1 = gridRoot1.getObjectById("selector");	
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter 	id="numfmt" 	useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true">\
				<columns>\
					<DataGridColumn dataField="STR_NAME" 		headerText="'+storNm+'" 		textAlign="center" 	width="100"/>\
					<DataGridColumn dataField="ITM_CODE"   		headerText="'+itmCode+'"    	textAlign="center" />\
					<DataGridColumn dataField="ITM_SHORT_NAME" 	headerText="'+itmName+'"  		textAlign="left" />\
					<DataGridColumn dataField="VEN_NAME" 	 	headerText="'+venName+'"  	textAlign="left" />\
					<DataGridColumn dataField="SALE_QTY" 	 	headerText="'+saleQy+'"  	textAlign="right" 	width="80"/>\
					<DataGridColumn dataField="SALE_WAMT" 	 	headerText="'+PrmpcAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_AMT" 	 	headerText="'+cellSPRC+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_AMT_WAMT" 	headerText="'+selngProfit+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_AMT_WAMT_PER" 	 headerText="'+ProfitRt+'" 	textAlign="right" width="80"/>\
				</columns>\
			</DataGrid>\
	</rMateGrid>';

//목록 그리드 조회
function getGridData() {
	
	var params = $("#frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesAnalReportSingleList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			//gridApp1.setData(data.list);
			//alert(data.list);
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
			dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT3").val($("#I_TEXT").val());
		btn_comm_search('3');
	}
}

//(협력업체검색) 팝업 callback function
//function fn_comm_supply_callback(dataRow){
//	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
//}
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	//$('#VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
	//$('#BUSI_NO' ).val(busyNoComma(dataRow.BUSI_NO));		// 사업자번호
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT2").val($("#I_TEXT").val());
		btn_comm_search('2');
	}
}

//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#P_ITM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
}


function chgCate1(){ 
	$("select[name='P_CLS_CODE'] option").remove();
	$("#P_CLS_CODE").prepend("<option value=''>"+select+"</option>");
	   
	getCateCodeSelectBoxList("P_MID_CODE","2",$('#P_LRG_CODE' ).val());	 
}
function chgCate2(){	
	var num1 = $('#P_MID_CODE' ).val().substr(0,2);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
		
	getCateCodeSelectBoxList("P_CLS_CODE","3",$('#P_MID_CODE' ).val());
}
function chgCate3(){	
	var num1 = $('#P_CLS_CODE' ).val().substr(0,2);
	var num2 = $('#P_CLS_CODE' ).val().substr(0,4);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
	$("#P_MID_CODE").val(num2).prop("selected", true);		
}

function gridMovePage(page) {
	$("#pageIndex").val(page);
	pageIndex = page;
	getGridData();
}

//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	getGridData();
}

function excelExport(){
	var P_STR_CODE = $.trim($('#P_STR_CODE').val()); 
	var P_OPEN_DT = $.trim($('#P_OPEN_DT').val()); 
	var P_END_DT = $.trim($('#P_END_DT').val()); 
	var P_VEN_NAME = $.trim($('#P_VEN_NAME').val()); 
	var P_CLS_CODE = $.trim($('#P_CLS_CODE').val()); 
	var P_MID_CODE = $.trim($('#P_MID_CODE').val()); 
	var P_LRG_CODE = $.trim($('#P_LRG_CODE').val()); 
	var P_ITM_SHORT_NAME = $.trim($('#P_ITM_SHORT_NAME').val()); 
	 
	//엑셀호출
	$.download('/salesAnalReportSingleExcelDownload.do',"P_STR_CODE="+P_STR_CODE
			+"&P_OPEN_DT="+P_OPEN_DT
			+"&P_END_DT="+P_END_DT
			+"&P_VEN_NAME="+P_VEN_NAME
			+"&P_CLS_CODE="+P_CLS_CODE
			+"&P_MID_CODE="+P_MID_CODE
			+"&P_LRG_CODE="+P_LRG_CODE
			+"&P_ITM_SHORT_NAME="+P_ITM_SHORT_NAME
			,"post");
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

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	$(".datepicker1").datepicker();
	$(".datepicker2").datepicker();
	
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류	
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 170 );
	
	$(window).on('resize',function (){	
		
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 170 );
		
	});	
	
	$(function() {
		$("#pop_wrap").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 900,
		    resizable : false,
		    position : "center"
		});
		
	});
	
	//조회
	$("#btn_search").click(function(){
		getGridData();
	});
	$("#btn_excel_search").click(function(){
		excelExport();
	});
	
	//협력업체 검색
	$("#P_VEN_NAME_SEARCH").click(function(){		
		btn_comm_supply_search();
	});
	
	//상품명
	$("#P_ITM_NAME_SEARCH").click(function(){		
		btn_comm_product_search();
	});		
});



