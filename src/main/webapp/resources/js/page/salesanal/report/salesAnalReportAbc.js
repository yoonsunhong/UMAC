/********************************************************
 * 설명:  상품ABC분석
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

var gridData1ClickStrCode = "";
var totalCnt;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

var selectorColumn1 = "";

var T_SALE_QTY = 0;
var T_SALE_WAMT = 0;            
var T_SALE_AMT = 0;              
var T_SALE_PROFIT = 0;           
var T_PROFIT_PER = 0;            
var T_COMPOSITION_PER = 0;       


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
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713"/>\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="4" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" precision="0" rounding="nearest"/>\
		<NumberFormatter id="numfmt2" useThousandsSeparator="true" precision="2" rounding="nearest"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"  />\
			<DataGrid id="dg1" sortableColumns="false">\
				<columns>\
					<DataGridColumn dataField="STR_NAME" 		headerText="'+storNm+'" 		id="STR_NAME1"	width="110" textAlign="center" />\
					<DataGridColumn dataField="SCAN_CODE"  		headerText="'+scanCode+'"    	textAlign="center" />\
					<DataGridColumn dataField="ITM_SHORT_NAME" 	headerText="'+itmName+'"  		textAlign="left" />\
					<DataGridColumn dataField="VEN_NAME" 	 	headerText="'+venName+'" 		width="200"  	textAlign="left"  />\
					<DataGridColumn dataField="SALE_QTY" 	 	headerText="'+sellingQy+'" 		id="SALE_QTY1"	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_WAMT" 	 	headerText="'+selngPrimeCost+'" textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_AMT" 	 	headerText="'+selngAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_PROFIT" 	headerText="'+selngProfitAm+'"  textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="PROFIT_PER" 	 	headerText="'+ProfitRt+'"  		textAlign="right" formatter="{numfmt2}"/>\
					<DataGridColumn dataField="COMPOSITION_PER" headerText="'+cmpntrt+'" 		textAlign="right" formatter="{numfmt2}"/>\
					<DataGridColumn dataField="COMPOSITION_ACCUMUL_PER" headerText="누적구성비(%)" 		textAlign="right" formatter="{numfmt2}"/>\
					<DataGridColumn dataField="ABC_GROUP" headerText="ABC그룹" 		textAlign="center" />\
				</columns>\
			</DataGrid>\
	</rMateGrid>';

function labelFunc(item, value, column){
	//item.getLabel()
	//return "11"
	var num = 0;
	if(item.getLabel() == "T_SALE_QTY"){
		num = T_SALE_QTY;
	}else if(item.getLabel() == "T_SALE_WAMT"){
		num = T_SALE_WAMT;
	}else if(item.getLabel() == "T_SALE_AMT"){
		num = T_SALE_AMT;
	}else if(item.getLabel() == "T_SALE_PROFIT"){
		num = T_SALE_PROFIT;
	}else if(item.getLabel() == "T_PROFIT_PER"){
		num = T_PROFIT_PER;
	}else if(item.getLabel() == "T_COMPOSITION_PER"){
		num = T_COMPOSITION_PER;
	};
	
	return num;
}

/*
				<footers>\
				<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn	dataField="SALE_QTY"	labelJsFunction="STR_NAME"/>\
				</DataGridFooter>\
				</footers>\
 */


//목록 그리드 조회
function getGridData(isFirstPage) {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;

	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//유효성검사
	if(dateDiff > 365) {
		alert("조회일자 간 365일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return false;
	}
	
	
	if(isFirstPage) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}
	
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesAnalReportAbcList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
	    beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			
			//그리드1 데이터 조회
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");			
			
			dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	       	
	       	//합계부분
	       	var jsonObject = eval(data.list);
	       	
	       	if(jsonObject.length > 0) {
	       		T_SALE_QTY = jsonObject[0]["SALE_QTY"];
		       	T_SALE_WAMT = jsonObject[0]["SALE_WAMT"];
		       	T_SALE_AMT = jsonObject[0]["SALE_AMT"];
		       	T_SALE_PROFIT = jsonObject[0]["SALE_PROFIT"];
		       	T_PROFIT_PER = jsonObject[0]["PROFIT_PER"];
		       	T_COMPOSITION_PER = jsonObject[0]["COMPOSITION_PER"];
	       	}
	       	
	       	
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
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

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();

	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}	
}
//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	//$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체CODE
}

/*function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportFileName = goodsAbcAnalysis+date+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}*/

function excelExport(){
	var P_INGR_YN		= $.trim($('#P_INGR_YN').val());
	var P_STR_CODE 		= $.trim($('#P_STR_CODE').val()); 
	var P_OPEN_DT 		= $.trim($('#P_OPEN_DT').val());
	var P_END_DT 		= $.trim($('#P_END_DT').val());
	var P_VEN_NAME 		= $.trim($('#P_VEN_NAME').val());
	var P_LRG_CODE 		= $.trim($('#P_LRG_CODE').val());
	var P_MID_CODE 		= $.trim($('#P_MID_CODE').val());
	var P_CLS_CODE 		= $.trim($('#P_CLS_CODE').val());
	var P_TAX_YN 		= $("input:radio[name=P_TAX_YN]:checked").val();
	var P_UPTAE_FLAG 	= $.trim($('#P_UPTAE_FLAG').val());
	var P_GROUP_TP 		= $("input:radio[name=P_GROUP_TP]:checked").val();
	var P_GROUP_A 		= $.trim($('#P_GROUP_A').val());
	var P_GROUP_B 		= $.trim($('#P_GROUP_B').val());
	var P_GROUP_C 		= $.trim($('#P_GROUP_C').val());
	

	//엑셀호출
	$.download('/salesAnalReportAbcDownload.do',"P_STR_CODE="		+ P_STR_CODE
												+"&P_OPEN_DT="		+ P_OPEN_DT
												+"&P_END_DT="		+ P_END_DT
												+"&P_VEN_NAME="		+ P_VEN_NAME
												+"&P_LRG_CODE="		+ P_LRG_CODE
												+"&P_MID_CODE="		+ P_MID_CODE
												+"&P_CLS_CODE="		+ P_CLS_CODE
												+"&P_TAX_YN="		+ P_TAX_YN
												+"&P_GROUP_TP="		+ P_GROUP_TP
												+"&P_GROUP_A="		+ P_GROUP_A
												+"&P_GROUP_B="		+ P_GROUP_B
												+"&P_GROUP_C="		+ P_GROUP_C
												+"&P_UPTAE_FLAG="	+ P_UPTAE_FLAG
												+"&P_INGR_YN="		+ P_INGR_YN
			,"post");
};

//업태구분
function uptaeFunction(){
	var uptaeFlagCode = $('#P_UPTAE_FLAG' ).val();
	updateStrCodeSelectBox("P_STR_CODE",uptaeFlagCode);	
}


$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getCommonCodeSelectBoxList2("P_UPTAE_FLAG", "UPTAE_FLAG", "S");		// 업태구분
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류
	
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
				$("#P_OPEN_DT").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
		});
	 
	$(".datepicker2").datepicker({ onSelect: function(dateText) 
	 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
			$("#P_END_DT").val(CUR_DT);
				return;
			}	 
	 }, 	 showMonthAfterYear:true 
	});
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 160 );
	
	$(window).on('resize',function (){	
		
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 160 );
		
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
		getGridData(true);
	});	
	
	$("#btn_excel_down").click(function(){
		excelExport();
	});		
	
	
	//협력업체 검색
	$("#P_VEN_NAME_SEARCH").click(function(){		
		btn_comm_supply_search();
	});			
	
	$("#P_VEN_NAME").keydown(function(key) {		
		if(key.keyCode == 13){
			btn_comm_supply_search();
		}
	});			
	
});

function fncValichk(){
	var groupA = $("#P_GROUP_A").val();
	var groupB = $("#P_GROUP_B").val();
	
	if(groupA  > 100 || groupB > 100){
		alert("그룹A,B는 100을 넘을 수 가 없습니다.\n재정의 해주세요.");
		$("#P_GROUP_A").val("70");
		$("#P_GROUP_B").val("90");
	}
	
	if(groupA  > groupB ){
		alert("그룹A는 그룹B보다 클 수 가 없습니다.\n재정의 해주세요.");
		$("#P_GROUP_A").val("70");
		$("#P_GROUP_B").val("90");
	}
	
}


