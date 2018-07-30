/********************************************************
 * 설명: 영업정보 > 매입관리 > 직매입현황출력 메뉴화면
 * 수정일      수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author   : 최 호 정
 * since    : 2017.05.23
 * version  : 1.0
 ********************************************************/

$(document).ready(function () {
	//최초 도움말 불러오기
	setHelpMessage($(location).attr('pathname').replace('/',''));
	init();

});

// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1, collection1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2, collection2;
//var gridApp2, gridRoot2, dataGrid2, dataRow2;

var gridData1 = [];
var gridData2 = [];

//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid2", "gridHolder2", jsVars2);

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


function gridReadyHandler2(id) {
	if(id == "grid2"){
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp2.setLayout(layoutStr2);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler2);
	}
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}
//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<CurrencyFormatter  id="maskfmt"   precision="2"/>\
			<DataGrid id="dg1" sortableColumns="false" showDataTips="true"  horizontalScrollPolicy="auto" lockedColumnCount="8" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
					<DataGridColumn dataField="PUR_DT"      headerText="'+ store + date +'"          width="100" textAlign="center" />\
					<DataGridColumn dataField="PUR_CFM_DT"      headerText="'+ dateOfReceipt +'"          width="100" textAlign="center" />\
					<DataGridColumn dataField="SLIP_NO"     headerText="'+docNo+'"          width="120" textAlign="center" />\
					<DataGridColumn dataField="PUR_GB_NM"   headerText="'+purchGubun+'"     width="80"  textAlign="center" />\
					<DataGridColumn dataField="VEN_CODE"    headerText="'+venCode+'"        width="80"  textAlign="center" />\
					<DataGridColumn dataField="VEN_NAME"    headerText="'+venName+'"        width="140" textAlign="left"   />\
					<DataGridColumn dataField="SCAN_CODE"   headerText="'+scanCode+'"       resizable="false" width="110" textAlign="center" />\
					<DataGridColumn dataField="ITM_NAME"    headerText="'+itmName+'"        resizable="false" width="200" textAlign="left"   />\
					<DataGridColumn dataField="UNIT"        headerText="'+standard+'"       resizable="false" width="80"  textAlign="left"   />\
					<DataGridColumn dataField="ORD_FLAG_NM" headerText="'+ordFlag+'"        resizable="false" width="80"  textAlign="center" />\
					<DataGridColumn dataField="TAX_GB_NM"   headerText="'+taxGb+'"          resizable="false" width="80"  textAlign="center" />\
					<DataGridColumn dataField="DEC_QTY"     headerText="'+qY+'"             id="dg1col1" resizable="false" width="80"  textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="PUR_WPRC"    headerText="'+purchasePrice+'"  id="dg1col2" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="PUR_WVAT"    headerText="'+taxGubun+'"       id="dg1col3" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="PUR_WAMT"    headerText="'+puchasAmount+'"   id="dg1col4" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="PUR_SAMT"    headerText="'+r3ExpectedSAMT+'" id="dg1col5" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="BOT_SAMT"    headerText="'+botSum+'"         id="dg1col6" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="EXPECTED_PROFIT" headerText="'+r3ExpectedProfic+'" id="dg1col7" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="PROFIT_RATE" headerText="'+ProfitRt+'"       resizable="true" width="80" textAlign="center" styleJsFunction="styleFunction1"  />\
				</groupedColumns>\
				<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="PUR_DT"/>\
						<SpanMergingField name="SLIP_NO">\
							<SpanSummaryRow label="'+subTotal+'" labelDataField="SLIP_NO" rowAttribute="{sumRowAttr}" cellAttribute="{sum2CellAttr}" >\
								<SpanSummaryField dataField="DEC_QTY"   summaryOperation="SUM" />\
								<SpanSummaryField dataField="PUR_WPRC"  summaryOperation="SUM" />\
								<SpanSummaryField dataField="PUR_WVAT"  summaryOperation="SUM" />\
								<SpanSummaryField dataField="PUR_WAMT"  summaryOperation="SUM" />\
								<SpanSummaryField dataField="PUR_SAMT"  summaryOperation="SUM" />\
								<SpanSummaryField dataField="BOT_SAMT"  summaryOperation="SUM" />\
								<SpanSummaryField dataField="EXPECTED_PROFIT" summaryOperation="SUM" />\
								<SpanSummaryField dataField="PROFIT_RATE"     summaryOperation="AVG"  />\
							</SpanSummaryRow>\
						</SpanMergingField >\
					</mergingFields>\
				</SpanSummaryCollection>\
				</dataProvider>\
				<footers>\
				<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col1}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col2}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col3}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col4}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col5}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col6}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col7}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="ProfitRateSummary" textAlign="center"/>\
				</DataGridFooter>\
				</footers>\
			</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
	<CurrencyFormatter  id="maskfmt"   precision="2"/>\
	<DataGrid id="dg1" sortableColumns="false" showDataTips="true"  horizontalScrollPolicy="auto" lockedColumnCount="8" lastColumnWidthPolicy="balance" >\
	<groupedColumns>\
	<DataGridColumn dataField="PUR_DT"      headerText="'+ store + date +'"          width="100" textAlign="center" />\
	<DataGridColumn dataField="PUR_CFM_DT"      headerText="'+ dateOfReceipt +'"          width="100" textAlign="center" />\
	<DataGridColumn dataField="SLIP_NO"     headerText="'+docNo+'"          width="120" textAlign="center" />\
	<DataGridColumn dataField="PUR_GB_NM"   headerText="'+purchGubun+'"     width="80"  textAlign="center" />\
	<DataGridColumn dataField="VEN_CODE"    headerText="'+venCode+'"        width="80"  textAlign="center" />\
	<DataGridColumn dataField="VEN_NAME"    headerText="'+venName+'"        width="140" textAlign="left"   />\
	<DataGridColumn dataField="SCAN_CODE"   headerText="'+scanCode+'"       resizable="false" width="110" textAlign="center" />\
	<DataGridColumn dataField="ITM_NAME"    headerText="'+itmName+'"        resizable="false" width="200" textAlign="left"   />\
	<DataGridColumn dataField="UNIT"        headerText="'+standard+'"       resizable="false" width="80"  textAlign="left"   />\
	<DataGridColumn dataField="ORD_FLAG_NM" headerText="'+ordFlag+'"        resizable="false" width="80"  textAlign="center" />\
	<DataGridColumn dataField="TAX_GB_NM"   headerText="'+taxGb+'"          resizable="false" width="80"  textAlign="center" />\
	<DataGridColumn dataField="DEC_QTY"     headerText="'+qY+'"             id="dg1col1" resizable="false" width="80"  textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
	<DataGridColumn dataField="PUR_WPRC"    headerText="'+purchasePrice+'"  id="dg1col2" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
	<DataGridColumn dataField="PUR_WVAT"    headerText="'+taxGubun+'"       id="dg1col3" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
	<DataGridColumn dataField="PUR_WAMT"    headerText="'+puchasAmount+'"   id="dg1col4" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
	<DataGridColumn dataField="PUR_SAMT"    headerText="'+r3ExpectedSAMT+'" id="dg1col5" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
	<DataGridColumn dataField="BOT_SAMT"    headerText="'+botSum+'"         id="dg1col6" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
	<DataGridColumn dataField="EXPECTED_PROFIT" headerText="'+r3ExpectedProfic+'" id="dg1col7" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
	<DataGridColumn dataField="PROFIT_RATE" headerText="'+ProfitRt+'"       resizable="true" width="80" textAlign="center" styleJsFunction="styleFunction1"  />\
	</groupedColumns>\
	</DataGrid>\
	</rMateGrid>';

function styleFunction1(item, column) {
	var value = column.getDataField();
	if (item[value] == "소계" || item[value] == "합계")
	{
		return { color:"#000000", textAlign:"center" };
	}
	else
	{
		return { color:"#000000" };
	}
}

function ProfitRateSummary(){
	//이익율 = (예정이익 / 판매예가) * 100
	// item["PUR_TSAMT"]=="0"?0:(item["EXPECTED_PROFIT"] / item["PUR_TSAMT"] * 100).toFixed(2);
	var chkdata = gridRoot1.getItemAt(0);
	var rs="0";
	var data;
	var e_profit = 0;
	var pu_tsamt = 0;
	if(chkdata !="" && chkdata != null)
	{
		src1 = gridRoot1.getChangedData(true);
		for (var i = 0; i < src1.length; i++)
		{
			data = src1[i].data;
			if(data.PUR_DT == "합계")
				continue;
			if(data.SLIP_NO == "소계")
			{
				var temp = data.PUR_SAMT == "0" ? 0.00 : (data.EXPECTED_PROFIT / Math.abs(data.PUR_SAMT)) * 100 ;
				temp = temp.toFixed(2);
				temp = temp+"";
				if(temp.indexOf('.') == -1){
					temp=temp+".00";
				}else{
					
					var tempArray = temp.split('.');
					var len = tempArray[1].length;
					if(len ==1){
						temp = temp+"0";
					}
				}
				if(data.PUR_SAMT == "0" ){
					temp="0.00";
				}
				gridRoot1.setItemFieldAt(temp,i,"PROFIT_RATE");
			}
			else
			{
				e_profit += data.EXPECTED_PROFIT;
				pu_tsamt += data.PUR_SAMT;
			}
		}
		rs = pu_tsamt == 0 ? 0.00 : (e_profit / Math.abs(pu_tsamt)) *100;
		rs = rs.toFixed(2);
	}
	return rs; // 평균을 구합니다.
}

//목록 그리드 조회
function getGridData() {
	var params 			= $("#search_frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#S_STR_DT").val().split("-");
	var P_END_DT_ARR 	= $("#S_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	var strDt 			= $("#S_STR_DT").val().replace(/-/g, "");
	var endDt 			= $("#S_END_DT").val().replace(/-/g, "");


	//유효성검사
	if($("#S_STR_DT").val() == null || $("#S_STR_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#S_STR_DT").focus();
		return;
	}

	if( $("#S_END_DT").val() == null || $("#S_END_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#S_END_DT").focus();
		return;
	}

	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#S_END_DT").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#S_STR_DT").focus();
		return;
	}
	
	if($.trim($("#S_VEN_NAME").val() ) == null || $.trim($("#S_VEN_NAME").val() ) == "")
		$("#S_VEN_CODE").val("");

	if($.trim($("#S_ITM_NAME").val() ) == null || $.trim($("#S_ITM_NAME").val() ) == "")
		$("#S_ITM_CODE").val("");

	if($.trim($("#S_LRG_CODE").val() ) != null && $.trim($("#S_LRG_CODE").val() ) != "")
		$("#S_CLS_CODE").val($("#S_LRG_CODE").val());
	else
		$("#S_CLS_CODE").val("");
	if($.trim($("#S_MID_CODE").val() ) != null && $.trim($("#S_MID_CODE").val() ) != "")
		$("#S_CLS_CODE").val($("#S_MID_CODE").val());
	if($.trim($("#S_SML_CODE").val() ) != null && $.trim($("#S_SML_CODE").val() ) != "")
		$("#S_CLS_CODE").val($("#S_SML_CODE").val());

	
	params.S_STR_CODE = $("#S_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({
		url:"/purchR3StateSearch.do",
		type:"POST",
		datatype:"json",
		async:false,
		data: params,
		beforeSend : function(){
			gridRoot1.addLoadingBar();
			gridRoot1.removeAll();
			gridRoot2.removeAll();
		},
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			var returnCode = eval(data['code']);
			var returnValue = "";
			if(returnCode == "9999"){
				returnValue = data['Alert'];
				//alert(returnValue);
			}else{
				returnValue = eval(data['result']);
				gridApp1.setData(returnValue);
				gridApp2.setData(returnValue);
			}
			gridRoot1.removeLoadingBar();
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
	$("select[name='S_SML_CODE'] option").remove();
	$("#S_SML_CODE").prepend("<option value=''>"+select+"</option>");
	getCateCodeSelectBoxList("S_MID_CODE","2",$('#S_LRG_CODE').val());
}

function chgCate2(){
	var num1 = $('#S_MID_CODE').val().substr(0,2);
	$("#S_LRG_CODE").val(num1).prop("selected", true);
	getCateCodeSelectBoxList("S_SML_CODE","3",$('#S_MID_CODE').val());
}

function chgCate3(){
	var num1 = $('#S_SML_CODE').val().substr(0,2);
	var num2 = $('#S_SML_CODE').val().substr(0,4);
	$("#S_LRG_CODE").val(num1).prop("selected", true);
	$("#S_MID_CODE").val(num2).prop("selected", true);
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();

	if($("#S_VEN_NAME").val() != null && $("#S_VEN_NAME").val() != "")
	{
		$("#P_TEXT3").val($("#S_VEN_NAME").val());
		btn_comm_search('3');
	}
}

//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
		$('#S_VEN_NAME').val(dataRow.VEN_NAME); // 협력업체명
		$('#S_VEN_CODE').val(dataRow.VEN_CODE); // 협력업체CODE
}

function excelExport(){
	var nowDate = new CommDateManager().getDate("yyyymmdd");
	var str_name = $("#S_STR_CODE option:selected").text();
	dataGrid2.exportFileName = "직매입현황"+nowDate+"_"+str_name+"_"+".xlsx";
	gridRoot2.excelExportSave("/gridExcelDown.do", false);
}

function clearVenCode(){
	if($('#S_VEN_NAME').val() == "" )
	{
		$('#S_VEN_CODE').val("");
	}
}

//(점별상품검색) 팝업 호출 function
function btn_comm_store_search(){
	$('#comm_pop_wrap6' ).dialog( 'open' );
	gridApp15.resize();
	fnGetStrName();
	
	//	협력업체별상품 보이기 시작
	//  현 페이지에서 VEN_NAME 삭제 시 VEN_CODE 도 삭제 하기 기능이 있어야 한다.
	$("#SET_VEN_CODE").val( $("#S_VEN_CODE").val() ); 
	//	협력업체별상품 보이기 끝
	
	if($("#S_ITM_NAME").val() != null && $("#S_ITM_NAME").val() != ""){
		$("#P_TEXT6").val($("#S_ITM_NAME").val());
		btn_comm_search('6');
	}
}

function fn_comm_store_callback(dataRow){
	$("#S_ITM_NAME").val(dataRow.ITM_NAME);
	$("#S_ITM_CODE").val(dataRow.ITM_CODE);
}

//출력
function btn_print(){
	
		var P_CORP_CODE			=	$("#S_CORP_CODE").val();
		var P_STR_CODE			= 	$("#S_STR_CODE").val();
		var P_VEN_CODE			=	$("#S_VEN_CODE").val();
		var P_TEXT_SALE_SD		= 	$("#S_STR_DT").val();
		var P_TEXT_SALE_ED		= 	$("#S_END_DT").val();
		var P_SALE_SD			= 	$("#S_STR_DT").val().replace(/-/gi,'');
		var P_SALE_ED			= 	$("#S_END_DT").val().replace(/-/gi,'');
		var P_ITM_CODE			= 	$("#S_ITM_CODE").val();
		var P_PUR_GB			= 	$("#S_PUR_GB").val();
		var P_CLS_CODE			= 	$("#S_CLS_CODE").val();
		var params = "?reportMode=HTML"	+
					"&P_CORP_CODE="		+P_CORP_CODE+
					"&P_STR_CODE="		+P_STR_CODE+
					"&P_VEN_CODE="		+P_VEN_CODE+
					"&P_TEXT_SALE_SD="	+P_TEXT_SALE_SD+
					"&P_TEXT_SALE_ED="	+P_TEXT_SALE_ED+
					"&P_SALE_SD="		+P_SALE_SD+
					"&P_SALE_ED="		+P_SALE_ED+
					"&P_ITM_CODE="		+P_ITM_CODE+
					"&P_CLS_CODE="		+P_CLS_CODE+
					"&P_PUR_GB="		+P_PUR_GB;
		
		// AIViewer 파라미터
		window.open("aireportR3PurchaseStatePrint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
}


function init() {
	// 점포코드 콤보 가져오기
	getStoreCode("S_STR_CODE");
	$("#search_frm select[id='S_STR_CODE']").val(SSSC).prop("selected", true);

	// 상품분류
	getCateCodeSelectBoxList("S_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("S_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("S_CLS_CODE"   , "3" ,  ""   );    // 소 분류

	//달력설정
	$("#S_STR_DT").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_STR_DT").val() > $("#S_END_DT").val()){
					alert(msgDateValidation);
					$("#S_STR_DT").val(CUR_DT);
					return;
			}
		}, showMonthAfterYear:true
	});
	$("#S_END_DT").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_STR_DT").val() > $("#S_END_DT").val()){
					alert(msgDateValidation);
					$("#S_END_DT").val(CUR_DT);
					return;
			}
		 }, showMonthAfterYear:true
	});
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	$("#S_STR_DT").val(beforeDate);
	$("#S_END_DT").val(date);

	getCommonCodeSelectBoxList("S_PUR_GB", "PUR_GB");  //매입구분

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
	$("#S_VEN_NAME_SEARCH").click(function(){
		btn_comm_supply_search();
	});

	// 협력(매입)업체에서 엔터시 검색되게....
	$("input[name=S_VEN_NAME]").keydown(function (key) {
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_supply_search();
		}
	});
	
	// 상품에서 엔터시 검색되게....
	$("input[name=S_ITM_NAME]").keydown(function (key) {
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_store_search();
		}
	});
	

		
}