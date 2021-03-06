/********************************************************
 * 설명: 영업정보 > 재고정보 > 현상품재고현황 메뉴화면
 * 수정일      수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author   : 최 호 정
 * since    : 2017.06.05
 * version  : 1.0
 ********************************************************/

//헤더정렬을 위한 FALG
var searchFlag ="";
var totalCnt="0";	// 전체건수
var RowsPerPage = 25;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호
var orderBy = "";
var columnName = ""; 
//그리드1 데이터 초기화
var gridData1 = [];

$(document).ready(function () {
	//최초 도움말 불러오기
	setHelpMessage($(location).attr('pathname').replace('/',''));
	init();
});

// ----------------------- 그리드 설정 시작 -------------------------------------

//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1, collection1;


var gridData1ClickStrCode = "";

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		//최초 로딩시 그리드1 데이터 조회 X
		gridApp1.setData(gridData1);
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
	//그리드1 페이징 셋팅
	drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
}

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

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
			<DataGrid id="dg1" sortableColumns="true" showDataTips="true" horizontalScrollPolicy="auto" lockedColumnCount="5" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
					<DataGridColumn  dataField="ITM_CODE"     headerText="'+itmCode+'"          width="110" textAlign="center"  sortable="false"   />\
					<DataGridColumn  dataField="SCAN_CODE"    headerText="'+scanCode+'"         width="110" textAlign="center" sortable="false"  />\
					<DataGridColumn  dataField="ITM_NAME"     headerText="'+itmName+'"          width="220" textAlign="left"   />\
					<DataGridColumn  dataField="VEN_NAME"     headerText="'+venName+'"          width="160" textAlign="left"  sortable="false"   />\
					<DataGridColumn  dataField="STR_NAME"     headerText="'+storNm+'"           width="100" textAlign="center" sortable="false"  />\
					<DataGridColumn  dataField="ITM_SALE_CNT" headerText="'+sellingQy+'"        id="dg1col1" width="100"  textAlign="right" formatter="{numfmt}" />\
					<DataGridColumn  dataField="ITM_INV_CNT"  headerText="'+stockQty+'"         id="dg1col2" width="100"  textAlign="right" formatter="{numfmt}" />\
					<DataGridColumn  dataField="CLS_CODE"     headerText="'+subCategory+'"      width="100" textAlign="center"  sortable="false" />\
					<DataGridColumn  dataField="CLS_NAME"     headerText="'+subCategoryName+'"  width="110" textAlign="left"   sortable="false"  />\
				</groupedColumns>\
			</DataGrid>\
	</rMateGrid>';
/*<footers>\
<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
	<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col1}" formatter="{numfmt}" textAlign="right" />\
	<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col2}" formatter="{numfmt}" textAlign="right" />\
	<DataGridFooterColumn/>\
	<DataGridFooterColumn/>\
</DataGridFooter>\
</footers>\*/
//----------------------- 그리드 설정 끝 -----------------------

//조회 (searchFlag -> true : 헤더정렬 기본값으로    false : 헤더정렬 값 유지)
function btn_search(searchFlag){
	var params 			= $("#search_frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_STR_DATE").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DATE").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	dataRow1 = null;

	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_STR_DATE").focus();
		return;
	}
		
	if(searchFlag  ==  true){
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
		//페이지 1페이지로 이동
		pageIndex = 1;
		$("#pageIndex").val(pageIndex);
	}
	
	//날짜 체크
	if($("#P_STR_DATE").val() == null || $("#P_STR_DATE").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_STR_DATE").focus();
		return;
	}
	if( $("#P_END_DATE").val() == null || $("#P_END_DATE").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_END_DATE").focus();
		return;
	}

	var strDt = $("#P_STR_DATE").val().replace(/-/g, "");
	var endDt = $("#P_END_DATE").val().replace(/-/g, "");
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_END_DATE").focus();
		return;
	}

	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "")
		$("#P_VEN_CODE").val("");

	if($.trim($("#P_ITM_NAME").val() ) == null || $.trim($("#P_ITM_NAME").val() ) == "")
		$("#P_ITM_CODE").val("");

	if($.trim($("#P_LRG_CODE").val() ) != null && $.trim($("#P_LRG_CODE").val() ) != "")
		$("#P_CLS_CODE").val($("#P_LRG_CODE").val());
	else
		$("#P_CLS_CODE").val("");
	if($.trim($("#P_MID_CODE").val() ) != null && $.trim($("#P_MID_CODE").val() ) != "")
		$("#P_CLS_CODE").val($("#P_MID_CODE").val());
	if($.trim($("#P_SML_CODE").val() ) != null && $.trim($("#P_SML_CODE").val() ) != "")
		$("#P_CLS_CODE").val($("#P_SML_CODE").val());

	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//로딩바 보이기
	showLoadingBar1();
	
	gridApp1.setData(gridData1);
	
	jQuery.ajax({
		url:"/stockStatusList.do",
		type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){
		},
		success:function(data){
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

function chgCate1(){
	$("select[name='P_SML_CODE'] option").remove();
	$("#P_SML_CODE").prepend("<option value=''>"+select+"</option>");
	getCateCodeSelectBoxList("P_MID_CODE","2",$('#P_LRG_CODE').val());
}

function chgCate2(){
	var num1 = $('#P_MID_CODE').val().substr(0,2);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
	getCateCodeSelectBoxList("P_SML_CODE","3",$('#P_MID_CODE').val());
}

function chgCate3(){
	var num1 = $('#P_SML_CODE').val().substr(0,2);
	var num2 = $('#P_SML_CODE').val().substr(0,4);
	$("#P_LRG_CODE").val(num1).prop("selected", true);
	$("#P_MID_CODE").val(num2).prop("selected", true);
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();

	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != "")
	{
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}
}

//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
		$('#P_VEN_NAME').val(dataRow.VEN_NAME); // 협력업체명
		$('#P_VEN_CODE').val(dataRow.VEN_CODE); // 협력업체CODE
}

//XML스트링 변환
function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

function excelExport(){
	var P_STR_CODE 		= $.trim($('#P_STR_CODE').val()); 
	var P_STR_DATE 		= $.trim($('#P_STR_DATE').val()); 
	var P_END_DATE 		= $.trim($('#P_END_DATE').val());
	var P_VEN_CODE 		= $.trim($('#P_VEN_CODE').val());
	var P_ITM_CODE 		= $.trim($('#P_ITM_CODE').val()); 
	var P_CLS_CODE 		= $.trim($('#P_CLS_CODE').val()); 
	var P_COLUMN_NAME 	= $.trim($('#P_COLUMN_NAME').val());
	var P_ORDERBY 		= $.trim($('#P_ORDERBY').val());
	var P_STR_DT_ARR	= $("#P_STR_DATE").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DATE").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_STR_DATE").focus();
		return;
	}
	
	if($("#P_STR_DATE").val() == null || $("#P_STR_DATE").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_STR_DATE").focus();
		return;
	}
	if( $("#P_END_DATE").val() == null || $("#P_END_DATE").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_END_DATE").focus();
		return;
	}
	var strDt = $("#P_STR_DATE").val().replace(/-/g, "");
	var endDt = $("#P_END_DATE").val().replace(/-/g, "");
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_END_DATE").focus();
		return;
	}

	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "")
		$("#P_VEN_CODE").val("");

	if($.trim($("#P_ITM_NAME").val() ) == null || $.trim($("#P_ITM_NAME").val() ) == "")
		$("#P_ITM_CODE").val("");

	if($.trim($("#P_LRG_CODE").val() ) != null && $.trim($("#P_LRG_CODE").val() ) != "")
		$("#P_CLS_CODE").val($("#P_LRG_CODE").val());
	else
		$("#P_CLS_CODE").val("");
	if($.trim($("#P_MID_CODE").val() ) != null && $.trim($("#P_MID_CODE").val() ) != "")
		$("#P_CLS_CODE").val($("#P_MID_CODE").val());
	if($.trim($("#P_SML_CODE").val() ) != null && $.trim($("#P_SML_CODE").val() ) != "")
		$("#P_CLS_CODE").val($("#P_SML_CODE").val());

	
	//엑셀호출
	$.download('/stockStatusExcel.do',"P_STR_CODE="+P_STR_CODE
													+"&P_STR_DATE="+P_STR_DATE
													+"&P_END_DATE="+P_END_DATE
													+"&P_VEN_CODE="+P_VEN_CODE
													+"&P_ITM_CODE="+P_ITM_CODE
													+"&P_CLS_CODE="+P_CLS_CODE
													+"&P_COLUMN_NAME="+P_COLUMN_NAME
													+"&P_ORDERBY="+P_ORDERBY
										,"post");
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
        jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>').appendTo('body').submit().remove();
    };
};

function clearVenCode(){
	if($('#P_VEN_NAME').val() == "" )
	{
		$('#P_VEN_CODE').val("");
	}
}

//(점별상품검색) 팝업 호출 function
/*
function btn_comm_store_search(){
	$('#comm_pop_wrap6' ).dialog( 'open' );
	gridApp15.resize();
	fnGetStrName();
	$("#SET_VEN_CODE").val( $("#P_VEN_CODE").val() );
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT6").val($("#P_ITM_NAME").val());
		btn_comm_search('6');
	}
}

function fn_comm_store_callback(dataRow){
	$("#P_ITM_NAME").val(dataRow.ITM_NAME);
	$("#P_ITM_CODE").val(dataRow.ITM_CODE);
}
*/


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
	$("#P_ITM_NAME").val(dataRow.ITM_NAME);
	$("#P_ITM_CODE").val(dataRow.ITM_CODE);
}






function init() {
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	$("#search_frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);

	// 상품분류
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류

	//달력설정
	$("#P_STR_DATE").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#P_STR_DATE").val() > $("#P_END_DATE").val()){
					alert(msgDateValidation);
					$("#P_STR_DATE").val(CUR_DT);
					return;
			}
		}, showMonthAfterYear:true
	});
	$("#P_END_DATE").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#P_STR_DATE").val() > $("#P_END_DATE").val()){
					alert(msgDateValidation);
					$("#P_END_DATE").val(CUR_DT);
					return;
			}
		 }, showMonthAfterYear:true
	});
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	$("#P_STR_DATE").val(date);
	$("#P_END_DATE").val(date);

	//getCommonCodeSelectBoxList("P_PUR_GB", "PUR_GB");  //매입구분

	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 162 );

	$(window).on('resize',function (){
		$("#gridHolder1").width("100%");
		$("#gridHolder1").height( $(window).height() - 162 );
	});

	//조회
	/*$("#btn_search").click(function(){
		//alert("작업 진행 중 입니다.");
		//return;
		gridRoot1.addLoadingBar();
		setTimeout(getGridData, 0);
	});*/

	$("#btn_excel_down").click(function(){
		excelExport();
	});

	//협력업체 검색
	$("#P_VEN_NAME_SEARCH").click(function(){
		btn_comm_supply_search();
	});

	// 협력(매입)업체에서 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) {
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_supply_search();
		}
	});
	
	// 상품에서 엔터시 검색되게....
	$("input[name=P_ITM_NAME]").keydown(function (key) {
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_store_search();
		}
	});

}
//그리드 로딩바  보이기
function showLoadingBar1() {
	gridRoot1.addLoadingBar();
}

//그리드 로딩바  숨기기
function hideLoadingBar1() {
	gridRoot1.removeLoadingBar();
}