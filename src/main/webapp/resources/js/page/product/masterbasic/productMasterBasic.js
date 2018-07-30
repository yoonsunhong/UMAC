/********************************************************
 * 설명:  주문배달관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2017.02.12
 * version : 1.0
 ********************************************************/

//페이징 관련 변수
var totalCnt="0";	// 전체건수
var RowsPerPage = 25;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

//행사 시작 종료일 중복체크를 위한 Date조회용 변수
var checkDate = {};
var selectedIndex = -1;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();
if(dd < 10) {
    dd = '0' + dd;
} 
if(mm<10) {
    mm = '0' + mm;
}

$(document).ready(function(){
	
	init();
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	$(".memo").height(100);
	
	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	
	$("#top_search input[name=P_ORD_DT]").val(lsToDate);
	$("#FISH_DT").val(lsToDate);
	
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : "95%",
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	//달력설정
	$(".datepicker").datepicker();
	
	$("#top_search input[name=P_VEN_NAME]").keydown(function(event){
		$("#top_search input[name=P_VEN_CODE]").val("");
		if(event.keyCode == 13){
			btn_comm_supply_search_product();
		}
	});
	
	$("#top_search input[name=P_ITM_NAME").keydown(function(event){
		$("#top_search input[name=P_ITM_CODE]").val("");
		if(event.keyCode == 13){
			btn_comm_product_search();
		}
	});
	
	$("#P_LRG_CODE").change(function(){
		$("#P_MID_CODE").find("option").remove();
		$("#top_search select[name=P_MID_CODE]").append('<option value="">'+ all +'</option>');
		$("#P_CLS_CODE").find("option").remove();
		$("#top_search select[name=P_CLS_CODE]").append('<option value="">'+ all +'</option>');
		
		if($(this).val() != ""){
			btnSearchMid($(this).val());
		}
	});
	
	$("#P_MID_CODE").change(function(){
		$("#P_CLS_CODE").find("option").remove();
		$("#top_search select[name=P_CLS_CODE]").append('<option value="">'+ all +'</option>');
		
		if($(this).val() != ""){
			btnSearchSML($(this).val());
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;

//그리드1 데이터 초기화
var gridData1 = [];

function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp1.setLayout(layoutStr);
	gridApp1.setData(gridData1);
	
	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

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

//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {
	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	btnSearch();
}

//그리드 페이지 이동
function gridMovePage(page) {
	
	//alert(page);
	$("#pageIndex").val(page);
	pageIndex = page;
	
	btnSearch();
	
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" horizontalScrollPolicy="auto" selectionMode="multipleCells">\
		<groupedColumns>\
			<DataGridColumn dataField="STR_CODE"  					headerText="STR_CODE" textAlign="center" visible="false" />\
			<DataGridColumn dataField="STR_NAME"  					headerText="' + storNm + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="SCAN_CODE"  				headerText="' + scanCode + '" textAlign="center" width="130" />\
			<DataGridColumn dataField="ITM_NAME"  					headerText="' + itmName + '" textAlign="left" width="150" />\
			<DataGridColumn dataField="ITM_CODE"  					headerText="' + itmCode + '" textAlign="center" width="130"/>\
			<DataGridColumn dataField="BASE_WPRC"  				headerText="' + baseWprcCmn + '" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn dataField="BASE_SPRC"  				headerText="' + baseSprcCmn + '" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn dataField="WPRC"  						headerText="' + wprcStore + '" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn dataField="SPRC"  						headerText="' + sprcStore + '" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn dataField="VEN_CODE"  					headerText="' + venCode + '" textAlign="center" />\
			<DataGridColumn dataField="VEN_NAME"  					headerText="' + venName + '" textAlign="left" width="120" />\
			<DataGridColumn dataField="REPT_YN"  					headerText="REPT_YN" textAlign="center" visible="false" />\
			<DataGridColumn dataField="REPT_YN_NAME"  			headerText="' + reptYn + '" textAlign="center" width="70"/>\
			<DataGridColumn dataField="ITM_SHORT_NAME"  		headerText="' + itmShortName + '" textAlign="left" />\
			<DataGridColumn dataField="STR_DT"  						headerText="' + strDt + '" textAlign="center" />\
			<DataGridColumn dataField="END_DT"  						headerText="' + endDt + '" textAlign="center" />\
			<DataGridColumn dataField="CLS_CODE"  					headerText="CLS_CODE" textAlign="center" visible="false" />\
			<DataGridColumn dataField="CLS_NAME"  					headerText="' + subCategory + '" textAlign="center" width="60" />\
			<DataGridColumn dataField="ITM_GB"  						headerText="ITM_GB" textAlign="center" visible="false" />\
			<DataGridColumn dataField="ITM_GB_NAME"  			headerText="' + itmGb + '" textAlign="center" width="65" />\
			<DataGridColumn dataField="TAX_GB"  						headerText="TAX_GB" textAlign="center" visible="false" />\
			<DataGridColumn dataField="TAX_GB_NAME"  			headerText="' + taxGb + '" textAlign="center" width="65" />\
			<DataGridColumn dataField="UNIT"  							headerText="' + unit + '" textAlign="center" />\
			<DataGridColumn dataField="IPSU_QTY" 			 		headerText="' + ipsuQty + '" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn dataField="IN_CAPACITY"  				headerText="' + inCapacity + '" textAlign="center" />\
			<DataGridColumn dataField="DP_PRC_UNIT"  				headerText="' + dpPrcUnit + '" textAlign="center" />\
			<DataGridColumn dataField="MAKE_VEN_NAME"  		headerText="' + makeVenName + '" textAlign="center" />\
			<DataGridColumn dataField="ORG_CODE"  					headerText="ORG_CODE" textAlign="center" visible="false" />\
			<DataGridColumn dataField="ORG_NAME"  					headerText="' + orgName + '" textAlign="center" />\
			<DataGridColumn dataField="ROUTE_GB"  					headerText="ROUTE_GB" textAlign="center" visible="false" />\
			<DataGridColumn dataField="ROUTE_GB_NAME"  		headerText="' + routeGb + '" textAlign="center" />\
			<DataGridColumn dataField="BOT_CODE"  					headerText="BOT_CODE" textAlign="center" visible="false" />\
			<DataGridColumn dataField="BOT_SPRC"  					headerText="' + botSprc + '" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn dataField="GRE_GB"  						headerText="GRE_GB" textAlign="center" visible="false" />\
			<DataGridColumn dataField="GRE_GB_NAME"  			headerText="' + greGb + '" textAlign="center" width="70" />\
			<DataGridColumn dataField="PRGT_RATE"  				headerText="' + cmisRate + '" textAlign="right" />\
			<DataGridColumn dataField="FTRACE_YN"  				headerText="' + ftraceYn + '" textAlign="center" width="110" />\
			<DataGridColumn dataField="STRACE_YN"  				headerText="' + straceYn + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="MTRACE_YN"  				headerText="' + mtraceYn + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="INGR_YN"  					headerText="' + ingrYn + '" textAlign="center" width="110" />\
			<DataGridColumn dataField="MBR_DC_YN"  				headerText="' + mbrDcYn + '" textAlign="center" width="115" />\
			<DataGridColumn dataField="POINT_SAVE"  				headerText="' + pointSave + '" textAlign="center" width="110" />\
			<DataGridColumn dataField="GIFT_APP_YN"  				headerText="' + giftAppYn + '" textAlign="center" width="110" />\
			<DataGridColumn dataField="WEIGHT_YN"  				headerText="' + weightYn + '" textAlign="center" width="110"  />\
			<DataGridColumn dataField="TPER_MTHD"  				headerText="TPER_MTHD" textAlign="center" visible="false" />\
			<DataGridColumn dataField="TPER_MTHD_NAME"  		headerText="' + tperMthd + '" textAlign="center" />\
			<DataGridColumn dataField="VALID_DT_YN"  				headerText="' + validDtYn + '" textAlign="center" />\
			<DataGridColumn dataField="VALID_DD"  					headerText="' + validDD + '" textAlign="center" />\
			<DataGridColumn dataField="IDATE_CMN"  				headerText="' + idateCmn + '" textAlign="center" />\
			<DataGridColumn dataField="UDATE_CMN"  				headerText="' + udateCmn + '" textAlign="center" />\
			<DataGridColumn dataField="IEMP_NAME_CMN"  		headerText="' + iempNameCmn + '" textAlign="center" />\
			<DataGridColumn dataField="UEMP_NAME_CMN" 		 	headerText="' + uempNameCmn + '" textAlign="center" />\
			<DataGridColumn dataField="IDATE_STORE"  				headerText="' + idateStore + '" textAlign="center" />\
			<DataGridColumn dataField="UDATE_STORE"  			headerText="' + udateStore + '" textAlign="center" />\
			<DataGridColumn dataField="IEMP_NAME_STORE"  		headerText="' + iempNameStore + '" textAlign="center" />\
			<DataGridColumn dataField="UEMP_NAME_STORE"  		headerText="' + uempNameStore + '" textAlign="center" />\
		</groupedColumns>\
	</DataGrid>\
</rMateGrid>';


//그리드 row의 값을 변경하여 보여주기
function labelFunc(item, value, column){
  var str = item["DEL_YN"];//삭제여부 컬럼의 필드명
  if(str=="N")
    return "사용";
  else if(str=="Y")
   return "미사용";
}
// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}


function init() {
	
	$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
	
	$("#top_search select[name=P_GRE_GB]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("top_search select[name=P_GRE_GB]", "GRE_GB");
	
	$("#top_search select[name=P_MBR_DC_YN]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("top_search select[name=P_MBR_DC_YN]", "MBR_DC_YN");
	
	$("#top_search select[name=P_ROUTE_GB]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("top_search select[name=P_ROUTE_GB]", "ROUTE_GB");
	
	$("#top_search select[name=P_LRG_CODE]").append('<option value="">'+ all +'</option>');
	$("#top_search select[name=P_MID_CODE]").append('<option value="">'+ all +'</option>');
	$("#top_search select[name=P_CLS_CODE]").append('<option value="">'+ all +'</option>');
	var postValue = {};
	//대분류조회
	jQuery.ajax({
	    type:"POST",
	    url:"/selectLRGCode.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#top_search select[name=P_LRG_CODE]").append('<option value="'+ data[i].LRG_CODE +'">'+ data[i].LRG_NAME +'</option>'); 
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
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
function btnSearchMid(LRG_CODE){
	
	jQuery.ajax({ 
	    url:"/selectMIDCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {'LRG_CODE' : LRG_CODE},
		success:function(data){  
			for(var i = 0; i < data.length; i++){
				 $("#top_search select[name=P_MID_CODE]").append('<option value="'+ data[i].MID_CODE +'">'+ data[i].MID_NAME +'</option>'); 
		   	}
			//alert(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

//소분류 조회
function btnSearchSML(MID_CODE){
	
	jQuery.ajax({ 
	    url:"/selectSMLCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {'MID_CODE' : MID_CODE},
		success:function(data){  
			for(var i = 0; i < data.length; i++){
				 $("#top_search select[name=P_CLS_CODE]").append('<option value="'+ data[i].CLS_CODE +'">'+ data[i].CLS_NAME +'</option>'); 
		   	}
			//alert(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}


//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#P_CALLBACK_NM2").val('btn_comm_product_search_call_back(dataRow11)');
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITM_NAME").val());
		btn_comm_search('2');
	}
}

function btn_comm_product_search_call_back(dataRow){
	$("#top_search input[name=P_ITM_CODE]").val(dataRow.ITM_CODE);
	$("#top_search input[name=P_ITM_NAME]").val(dataRow.ITM_NAME);
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search_product(){
	
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	$("#P_CALLBACK_NM3").val('fn_comm_supply_callback1(dataRow12)');
	
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}
}

function fn_comm_supply_callback1(dataRow){
	$("#top_search input[name=P_VEN_CODE]").val(dataRow.VEN_CODE);
	$("#top_search input[name=P_VEN_NAME]").val(dataRow.VEN_NAME);
	
	$("#comm_pop_wrap3").dialog( "close" );
}

function btnSearch(isFirstPage){
	var loadData =  $("#top_search").serializeAllObject();
	
	if($("#top_search select[name=P_STR_CODE]").val() == ""){
		if($("#P_VEN_CODE").val() == "" && $("#P_ITM_CODE").val() == ""){
			alert("검색조건의 점포명이 '전체'인 경우 협력업체 또는 상품명은 필수 검색조건입니다.");
			return;
		}
	}
	
	if(isFirstPage) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}
	
	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	
	showLoadingBar1();
	
	//그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/selectProductMasterBasic.do",         
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



function btn_clear()
{ 
		$("form").each(function() {  
		    if(this.id == "frmBody") this.reset();  
		 });  
		$("#P_ITM_CODE").val("");
		$("#P_VEN_CODE").val("");
		
}



function clearItemName()
{
	if(  $("#P_ITM_NAME").val() == ""  )
	{
		$("#P_ITM_CODE").val("");
	}
 
}


function btnExcelDown(){
	var loadData = $("#top_search").serializeAllObject();
	
	if($("#top_search select[name=P_STR_CODE]").val() == ""){
		if($("#P_VEN_CODE").val() == "" && $("#P_ITM_CODE").val() == ""){
			alert("검색조건의 점포명이 '전체'인 경우 협력업체 또는 상품명은 필수 검색조건입니다.");
			return;
		}
	}
	
	loadData.P_STR_CODE = $("#P_STR_CODE").val();

	$.download('/excelProductMasterBasic.do',"P_STR_CODE="+loadData.P_STR_CODE
											 +"&P_VEN_CODE="+loadData.P_VEN_CODE
											 +"&P_GRE_GB="+loadData.P_GRE_GB 
											 +"&P_MBR_DC_YN="+loadData.P_MBR_DC_YN 
											 +"&P_ROUTE_GB="+loadData.P_ROUTE_GB 
											 +"&P_LRG_CODE="+loadData.P_LRG_CODE 
											 +"&P_ITM_CODE="+loadData.P_ITM_CODE 
											 +"&P_ITM_NAME="+loadData.P_ITM_NAME
			 ,"post" );
	
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
/*$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-162);
	$(".ui-dialog-titlebar").text("콜센터접수관리 팝업");
	
	$(window).on('resize',function  () {
		$("#gridHolder1").height($(window).height()-104);
	})
});*/
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-166);
	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-166);
		
	});
});

//그리드 로딩바  보이기
function showLoadingBar1() {
    gridRoot1.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar1() {
    gridRoot1.removeLoadingBar();
}