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
	
	$("#P_ORD_SD").val(lsToDate);
	$("#P_ORD_ED").val(lsToDate);
	$("#FISH_DT").val(lsToDate);
	
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
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
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");
rMateGridH5.create("grid2", "gridHolder2", jsVars2, "100%", "200px");

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
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
	
	dataGrid1.setDoubleClickEnabled(true);
	dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
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
	
	btnSearchGrid(false);
}

//그리드 페이지 이동
function gridMovePage(page) {
	
	//alert(page);
	$("#pageIndex").val(page);
	pageIndex = page;
	
	btnSearchGrid(false);
	
}

function itemDoubleClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
	//alert("double Click");
	
	$("#pop_wrap1").dialog('open');
	gridApp2.resize();
	
	btnSearchDetail(dataRow1.STR_CODE, dataRow1.SLIP_NO);
	
}

//그리드2
function gridReadyHandler2(id) {
	// rMateGrid 관련 객체
	gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp2.setLayout(layoutStr2);
	gridApp2.setData(gridData2);
	
	gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
	gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid2);
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 그리드 객체
	dataGrid2 = gridRoot2.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
}



//그리드1 데이터 초기화
var gridData1 = [];
var gridData2 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2,dataRow2,clickData2,selectorColumn2, collection2, rowIndex2;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true">\
		<groupedColumns>\
			<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0"/>\
			<DataGridColumn id="RNUM"			dataField="RNUM"            headerText="No" 					textAlign="center" 	width="35" sortable="false" formatter="{numfmt}" />\
			<DataGridColumn id="SALE_DT"		dataField="SALE_DT"  		headerText="' + selngDate + '" 		textAlign="center" 	width="85" />\
			<DataGridColumn id="STR_CODE"		dataField="STR_CODE"  		headerText="' + storeCode + '" 		textAlign="center" 	visible="false" />\
			<DataGridColumn id="STR_NAME"		dataField="STR_NAME"  		headerText="' + storNm + '" 		textAlign="center" 	width="70" />\
			<DataGridColumn id="STR_NAME"		dataField="SLIP_NO"  		headerText="' + slipNo + '" 		textAlign="center" 	width="100" />\
			<DataGridColumn id="POS_NO"			dataField="POS_NO"  		headerText="' + pos + '" 			textAlign="center" 	width="60" />\
			<DataGridColumn id="TRXN_NO"		dataField="TRXN_NO"  		headerText="' + dealingsNumber + '" textAlign="center" 	width="70" />\
			<DataGridColumn id="EMP_NO"			dataField="EMP_NO"  		headerText="EMP_NO" 				textAlign="center" 	visible="false" />\
			<DataGridColumn id="EMP_NAME"		dataField="EMP_NAME"  		headerText="' + bsnEmpl + '" 		textAlign="center" 	width="80" sortable="true" />\
			<DataGridColumn id="aaaaaaa"		dataField="PAY_METH"  		headerText="PAY_METH" 				textAlign="center" 	visible="false" />\
			<DataGridColumn id="PAY_METH_NAME"	dataField="PAY_METH_NAME"	headerText="' + payType + '" 		textAlign="center" 	width="100" />\
			<DataGridColumn id="PAY_AMT"		dataField="PAY_AMT"  		headerText="' + payAmt + '" 		textAlign="right"	width="100" formatter="{numfmt}" />\
			<DataGridColumn id="CUST_NAME"		dataField="CUST_NAME"  		headerText="' + cusName + '" 		textAlign="center" 	/>\
			<DataGridColumn id="CUST_NO"		dataField="CUST_NO" 		headerText="' + cusNo + '" 			textAlign="center" 	width="70"	/>\
			<DataGridColumn id="ORD_STAT"		dataField="ORD_STAT"  		headerText="ORD_STAT" 				textAlign="center" 	width="100" visible="false" />\
			<DataGridColumn id="ORD_STAT_NAME"	dataField="ORD_STAT_NAME"  	headerText="' + ordStat + '" 		textAlign="center" 	width="90" 	styleJsFunction="stylePurGbNm" />\
			<DataGridColumn id="IDATE"			dataField="IDATE"           headerText="' + iDateTime + '" 		textAlign="center" 	width="140" />\
			<DataGridColumn id="FISH_DATETIME"	dataField="FISH_DATETIME"	headerText="배송완료일시" 			textAlign="center" 	width="140" />\
		</groupedColumns>\
	</DataGrid>\
</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" sortableColumns="true" verticalAlign="middle" >\
			<groupedColumns>\
				<DataGridColumn dataField="SLIP_NO"  	headerText="' + slipNo + '" 	textAlign="center" 	width="90" />\
				<DataGridColumn dataField="STR_CODE"  	headerText="STR_CODE" 			textAlign="center" 	visible="false" sortable="false" />\
				<DataGridColumn dataField="STR_NAME"  	headerText="' + storeName + '" 	textAlign="center" 	width="70" sortable="false" />\
				<DataGridColumn dataField="SALE_DT"  	headerText="' + selngDate + '" 	textAlign="center" 	width="90" />\
				<DataGridColumn dataField="POS_NO"  	headerText="' + pos + '" 		textAlign="center" 	width="60" />\
				<DataGridColumn dataField="TRXN_NO"  	headerText="' + trxnNo + '" 	textAlign="center" 	width="70" />\
				<DataGridColumn dataField="ITM_NAME"  	headerText="' + itmName + '" 	textAlign="left" />\
				<DataGridColumn dataField="SALE_QTY"  	headerText="' + qY + '" 		textAlign="center" 	width="50" />\
				<DataGridColumn dataField="SALE_AMT"  	headerText="' + cellSPRC + '" 	textAlign="right" 	width="120" formatter="{numfmt}" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="SLIP_NO"/>\
						<SpanMergingField name="STR_CODE"/>\
						<SpanMergingField name="STR_NAME"/>\
						<SpanMergingField name="SALE_DT"/>\
						<SpanMergingField name="POS_NO"/>\
						<SpanMergingField name="TRXN_NO"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
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

function btn_comm_user_search_top(){
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM1").val('fn_comm_user_callback_top(dataRow10)');
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUST_NAME").val());
		btn_comm_search('1');
	}
	
}

function fn_comm_user_callback_top(dataRow){
	$("#top_search input[name=P_CUST_NO]").val(dataRow.CUST_NO);
	$("#top_search input[name=P_CUST_NAME]").val(dataRow.CUST_NAME);
}

function init() {
	
	$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
	
	$("#top_search select[name=P_ORD_STAT]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("top_search select[name=P_ORD_STAT]", "ORD_STAT");
	
	$("#ORD_STAT").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("ORD_STAT", "ORD_STAT");
	$("#ORD_STAT option:[value='00']").remove();
	$("#ORD_STAT option:[value='10']").remove();

	
	$("#STR_CODE").append('<option value="">'+ select +'</option>');
	getStoreCode("STR_CODE");
	
	$('#P_CUST_NAME').on('keydown', function(e) {
		$("#P_CUST_NO").val("");
	    if (e.which == 13) {
	    	btn_comm_user_search_top();
	    }
	});
	
	$("#T_TOT_AMT").number(true);
	$("#T_TOT_CNT").number(true);
//	getOrdEmp();

}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

function getOrdEmp(){
	if($("#P_STR_CODE").val() == null || $("#P_STR_CODE").val() == ""){
		$("#P_ORD_EMP").html("");
		$("#P_ORD_EMP").append('<option value="">'+ all +'</option>');
	}else{
		jQuery.ajax({
		    type:"POST",
		    url:"/getOrderEmp.do", 
		    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		    data:{P_STR_CODE:$("#P_STR_CODE").val()},
		    async:false,
		    success : function(data) {
		    	$("#P_ORD_EMP").html("");
		    	$("#P_ORD_EMP").append('<option value="">'+ select +'</option>');
				for(var i = 0; i < data.length; i++){
					 $("#P_ORD_EMP").append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
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

//주문내용저장
function btnSave(){
	
	if($("#ORD_STAT").val() == ""){
		alert(ordStat + msgConfirm);
		return;
	}
	
	var selectorColumn = gridRoot1.getObjectById("selector");
	
	var selectedOrder = selectorColumn.getSelectedIndices();
	var gridXmlData = "";
	
	if(selectedOrder.length < 1){
		//주문 접수할 항목을 선택하세요.
		alert(msgSelectOrder);
		return;
	}
	
	for(var i=0 ; i < selectedOrder.length ; i++){
		//gridXmlData = gridXmlData + getXmlString(   gridRoot1.getItemAt(Number(selectedOrder[i]))   );
		gridXmlData = gridXmlData + "<GRIDROW>";
			gridXmlData = gridXmlData + "<SLIP_NO>"+gridRoot1.getItemFieldAt(Number(selectedOrder[i]), "SLIP_NO")+"</SLIP_NO>";
			gridXmlData = gridXmlData + "<SALE_DT>"+gridRoot1.getItemFieldAt(Number(selectedOrder[i]), "SALE_DT")+"</SALE_DT>";
			gridXmlData = gridXmlData + "<STR_CODE>"+gridRoot1.getItemFieldAt(Number(selectedOrder[i]), "STR_CODE")+"</STR_CODE>";
			gridXmlData = gridXmlData + "<POS_NO>"+gridRoot1.getItemFieldAt(Number(selectedOrder[i]), "POS_NO")+"</POS_NO>";
			gridXmlData = gridXmlData + "<TRXN_NO>"+gridRoot1.getItemFieldAt(Number(selectedOrder[i]), "TRXN_NO")+"</TRXN_NO>";
		gridXmlData = gridXmlData + "</GRIDROW>";
	}
	
	//alert($("#ORD_STAT").val() + " / " + $("#FISH_DT").val()); return;
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ;
	//alert(gridXmlData);
	
	jQuery.ajax({ 
	    url:"/selectCallOrderPayRegist.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					"gridXmlData" : gridXmlData
				,	"P_ORD_STAT" : $("#ORD_STAT").val()
				,	"P_FISH_DT" : $("#FISH_DT").val()
		        }, 
		success:function(data){   
			
			var clearData = [];
			gridApp1.setData(clearData);
			
			btnSearchGrid(false);
			
			alert(msgSave);
			
			if($("#ORD_STAT").val() == "30")	// 배달중 변경시 알림톡 발송
			{
				alimtalkSend(selectedOrder);
			}
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

//알림톡 발송
function alimtalkSend(selectedOrder)
{
	var memList = "";
	
	if(selectedOrder.length > 0)
	{
		for(var i=0 ; i < selectedOrder.length ; i++)
		{
			if(memList != "")
			{
				memList += "@";
			}
			
			memList += CommonJs.isNullToString(gridRoot1.getItemFieldAt(Number(selectedOrder[i]), "CUST_NAME"), "") + "|" + CommonJs.isNullToString(gridRoot1.getItemFieldAt(Number(selectedOrder[i]), "CUST_NO"), "")
				+ "|" + gridRoot1.getItemFieldAt(Number(selectedOrder[i]), "SLIP_NO") + "|" + gridRoot1.getItemFieldAt(Number(selectedOrder[i]), "PAY_AMT") + "|";
			
		}
		CommonJs.sendAlimtalk("", memList, "dadam_104", 0);
	}
}

function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

function btnSearchGrid(searchFlag, isFirstPage){
	var loadData 		= $("#top_search").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_ORD_SD").val().split("-");
	var P_END_DT_ARR 	= $("#P_ORD_ED").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_ORD_SD").focus();
		return;
	}

	if(searchFlag == true){
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
	}
	
	if(isFirstPage) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}
	
	
	loadData.P_ORD_STAT = $("#top_search select[name=P_ORD_STAT]").val();
	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	
	showLoadingBar1();
	
	//그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/selectCallOrderPay.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		success:function(data){  
			
			console.log(data);
			
			//alert(data.list);
			gridData = data.list; 
			gridApp1.setData(data.list);
			
			totalCnt = data.totalCount;
			totalAmt = data.totalAmt;
			$("#T_TOT_AMT").val(totalAmt);
			$("#T_TOT_CNT").val(totalCnt);
			
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

//상세 내역 조회
function btnSearchDetail(STR_CODE, SLIP_NO){
	
	gridRoot2.removeAll();
	
	jQuery.ajax({ 
	    url:"/selectCallOrderDetail.do",         
	    type:"POST",
		datatype:"json",
		data: {	"P_STR_CODE" : dataRow1.STR_CODE
			,		"P_SALE_DT" : dataRow1.SALE_DT
			,		"P_POS_NO" : dataRow1.POS_NO
			,		"P_TRXN_NO" : dataRow1.TRXN_NO
			},
		success:function(data){  
			//alert(data.list);
			gridApp2.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//엑셀다운로드
function btnExcelDown(){
	var loadData 		= $("#top_search").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_ORD_SD").val().split("-");
	var P_END_DT_ARR 	= $("#P_ORD_ED").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_ORD_SD").focus();
		return;
	}
	
	loadData.P_ORD_STAT = $("#top_search select[name=P_ORD_STAT]").val();
	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	
	$.download('/excelCallOrderPay.do',"P_STR_CODE="+loadData.P_STR_CODE
													 +"&P_ORD_SD="+loadData.P_ORD_SD
													 +"&P_ORD_STAT="+loadData.P_ORD_STAT
													 +"&P_SLIP_NO="+loadData.P_SLIP_NO
													 +"&P_ORD_ED="+loadData.P_ORD_ED
													 +"&P_CUST_NO="+loadData.P_CUST_NO
													 +"&P_ORD_EMP="+loadData.P_ORD_EMP
			 ,"post" );
	
} 


function stylePurGbNm(item, column) { 
	var value = column.getDataField();
	
	if (item[value] == "배달중"){
		return { color:"#FF0000", fontWeight:"bold" };		   
	}else if(item[value] == "배달완료"){
		return { color:"#0054FF", fontWeight:"bold" };
   }else{
	   	return;
   }
}


//출력 일단 보류
//function btn_print(){
//	$("#P_PRINT_SLIP_NO").val("");//레포트용 파라미터
//	$("#P_PRINT_CORP_CODE").val("");//레포트용 파라미터
//	
//	var selectorColumn = gridRoot1.getObjectById("selector");
//	var selectedOrder = selectorColumn.getSelectedIndices();
//	
//	for (var i = 0; i < selectedOrder.length; i++) {
//		$("#P_PRINT_SLIP_NO").val(   gridRoot1.getItemFieldAt( selectedOrder[i] , "SLIP_NO" )    +","+    $("#P_PRINT_SLIP_NO").val()    );
//		$("#P_PRINT_CORP_CODE").val(   $("#CORP_CODE").val()   +","+    $("#P_PRINT_CORP_CODE").val()    );
//	  
//	}
//		//출력전표 발리데이션 체크
//		if(   $("#P_PRINT_SLIP_NO").val() == "" )
//		{ 	alert(msgSelectData);
//			return;
//		}
//		var P_CORP_CODE =	$("#P_PRINT_CORP_CODE").val().substring(  0,
//									 	$("#P_PRINT_CORP_CODE").val().length - 1);
//		var P_SLIP_NO =	$("#P_PRINT_SLIP_NO").val().substring(  0,
//									$("#P_PRINT_SLIP_NO").val().length - 1);		
//		
//		var params = "?reportMode=HTML"+"&P_CORP_CODE="+P_CORP_CODE+
//							"&P_ORD_DT="+P_ORD_DT+
//							"&P_SLIP_NO="+P_SLIP_NO; // AIViewer 파라미터
//		window.open("aireportBusinessCallOrderPrint.do" + params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
//	
//}

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

function btnPopup() {
	 $("#pop_wrap1").dialog("open");
	gridApp.resize();
}

function btn_close() {
	$("#pop_wrap1").dialog("close");
}



/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height( $(window).height() - 138 );
	$(window).on('resize',function (){	
		$("#gridHolder1").height( $(window).height() - 138 );
		
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