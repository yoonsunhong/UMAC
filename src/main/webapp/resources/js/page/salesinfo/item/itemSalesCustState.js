/********************************************************
 * 설명: 협력업체매출현황 매뉴화면
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 추황영
 * since	: 2017.04.26
 * version : 1.0
 ********************************************************/
$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	init();
	
});
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1;
//var gridApp2, gridRoot2, dataGrid2, dataRow2;

var gridData1 = [];
//그리드2 데이터 초기화

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

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
			<DataGrid id="dg1" sortableColumns="false" showDataTips="true"  horizontalScrollPolicy="auto" lockedColumnCount="4" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
					<DataGridColumn dataField="STR_NAME" 	headerText="점포명" 			width="100" textAlign="center"/>\
					<DataGridColumn dataField="SALE_DT" 	headerText="매출일자" 			resizable="false" width="80" 	textAlign="left"/>\
					<DataGridColumn dataField="CUST_NO" 	headerText="매출처코드" 		width="90" textAlign="center"/>\
					<DataGridColumn dataField="CUST_NAME" 	headerText="매출처명" 			width="120" textAlign="left"/>\
					<DataGridColumn dataField="SCAN_CODE" 	headerText="스캔코드" 			resizable="false" width="100" 	textAlign="center"/>\
					<DataGridColumn dataField="ITM_NAME" 	headerText="상품명" 			width="280" textAlign="left"/>\
					<DataGridColumn dataField="CLS_NAME" 	headerText="소분류명" 			width="130" textAlign="center"/>\
					<DataGridColumn dataField="SALE_QTY" 	headerText="수량" 			id="dg1col1"  width="50" 	textAlign="right"  formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="SALE_TOTAL" 	headerText="매출금액" 		    id="dg1col2" width="110" 	textAlign="right"  formatter="{numfmt}" styleJsFunction="styleFunction1" />\
				</groupedColumns>\
				<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="STR_NAME">\
							<SpanSummaryRow label="'+subTotal+'" labelDataField="STR_NAME" rowAttribute="{sumRowAttr}" cellAttribute="{sum2CellAttr}">\
								<SpanSummaryField dataField="SALE_QTY" 		summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_TOTAL" 	summaryOperation="SUM" />\
							</SpanSummaryRow>\
						</SpanMergingField >\
						<SpanMergingField name="SALE_DT">\
								<SpanSummaryRow label="'+subTotal+'" labelDataField="SALE_DT" rowAttribute="{sumRowAttr}" cellAttribute="{sum2CellAttr}">\
								<SpanSummaryField dataField="SALE_QTY" 		summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_TOTAL" 	summaryOperation="SUM" />\
							</SpanSummaryRow>\
						</SpanMergingField >\
						<SpanMergingField name="CUST_NO">\
							<SpanSummaryRow label="'+subTotal+'" labelDataField="CUST_NAME" rowAttribute="{sumRowAttr}" cellAttribute="{sum2CellAttr}">\
								<SpanSummaryField dataField="SALE_QTY" 		summaryOperation="SUM" />\
								<SpanSummaryField dataField="SALE_TOTAL" 	summaryOperation="SUM" />\
							</SpanSummaryRow>\
						</SpanMergingField >\
						<SpanMergingField name="CUST_NAME">\
						</SpanMergingField >\
					</mergingFields>\
				</SpanSummaryCollection>\
				</dataProvider>\
				<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col1}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col2}" formatter="{numfmt}" textAlign="right" />\
				</DataGridFooter>\
			</footers>\
			</DataGrid>\
	</rMateGrid>';

function SALE_AVGSummary(item, value, column){
	//평균단가
    if(item["ITM_NAME"] == "소계" || item["ITM_NAME"] == "합계")
        return item["SALE_QTY"]=="0"?0:(item["SALE_AMT"] / item["SALE_QTY"]).toFixed(2);
    else
        return value;
}

function CNT_PRICESummary(item, value, column){
	//객단가
    if(item["ITM_NAME"] == "소계" || item["ITM_NAME"] == "합계")
        return item["CNT"]=="0"?0:(item["SALE_TOTAL"] / item["CNT"]).toFixed(-1);
    else
        return value;
}

function styleFunction1(item, column) {
	/*
	var value = column.getDataField();
	if (item[value] < 0 ){
		return { color:"#FF0000" };
	}else{
		return { color:"#000000" };
	}
	*/
	return { color:"#000000" };

}

//목록 그리드 조회
function getGridData() {
	var params 			= $("#sertch_frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_SALES_SD").val().split("-");
	var P_END_DT_ARR 	= $("#P_SALES_ED").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//유효성검사
	if(dateDiff > 60) {
		alert("조회 일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_SALES_SD").focus();
		return false;
	}
	
	//날짜 체크
	if($("#P_SALES_SD").val() == null || $("#P_SALES_SD").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_SALES_SD").focus();
		return;		
	}
	if( $("#P_SALES_ED").val() == null || $("#P_SALES_ED").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_SALES_ED").focus();
		return;		
	}
	 
	var strDt = $("#P_SALES_SD").val().replace(/-/g, "");
	var endDt = $("#P_SALES_ED").val().replace(/-/g, "");
	
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_SALES_ED").focus();
		return;
	}
	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "") $("#P_VEN_CODE").val("");
	if($.trim($("#ITM_NAME").val() ) == null || $.trim($("#ITM_NAME").val() ) == "") $("#ITM_CODE").val("");
	//$("#P_STR_CODE").val($("#STR_CODE option:selected").val());

	
	jQuery.ajax({ 
	    url:"/itemSalesCustStateSelect.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: params,
		beforeSend : function(){ 
			gridRoot1.removeAll();
			gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
				returnValue = eval(data['result']);
				gridApp1.setData(returnValue);				
	    },
	    complete : function(data) {
	    	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	gridRoot1.removeLoadingBar();
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


//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}
}
//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
		$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명	
		$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체CODE	
}

function excelExport(){    
	var nowDate = new CommDateManager().getDate("yyyymmdd");
	var str_name = $("#P_STR_CODE option:selected").text();
	dataGrid1.exportFileName = "단품매출판매내역"+nowDate+"_"+str_name+"_"+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}

function clearVenCode()
{ 	
	if(  $('#P_VEN_NAME').val()  == "" )
	{
		 $('#P_VEN_CODE').val("");
	}
}


//(점별상품검색) 팝업 호출 function
function btn_comm_store_search(){
	$('#comm_pop_wrap6' ).dialog( 'open' );
	gridApp15.resize();
	fnGetStrName();
	$("#SET_VEN_CODE").val( $("#P_VEN_CODE").val() );
	// $("#P_CALLBACK_NM6").val('fn_comm_store_callback1(dataRow15)');
	if($("#ITM_NAME").val() != null && $("#ITM_NAME").val() != ""){
		$("#P_TEXT6").val($("#ITM_NAME").val());
		btn_comm_search('6');
	}
}


function fn_comm_store_callback(dataRow)
{ 
	$("#ITM_NAME").val( dataRow.ITM_NAME ) ;
	$("#ITM_CODE").val( dataRow.ITM_CODE ) ;
}


function init() {
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
//	$("#sertch_frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류

	
	//달력설정
	$("#P_SALES_SD").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_SALES_SD").val()  >  $("#P_SALES_ED").val()     ){
					alert(msgDateValidation);
					$("#P_SALES_SD").val(CUR_DT);
					return;
			}	 
		}, 	 showMonthAfterYear:true 
	});
	$("#P_SALES_ED").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_SALES_SD").val()  >  $("#P_SALES_ED").val()     ){
					alert(msgDateValidation);
					$("#P_SALES_ED").val(CUR_DT);
					return;
			}	 
		 },	 showMonthAfterYear:true 
	});
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	$("#P_SALES_SD").val(beforeDate);
	$("#P_SALES_ED").val(date);
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 137 );
	
	$(window).on('resize',function (){			
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 137 );		
	});	
	
	//조회
	$("#btn_search").click(function(){
	    setTimeout(getGridData, 0);
	});	
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
}
