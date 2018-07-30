/********************************************************
 * 설명: 영업분석 > 매출정보 > 매출대비실적조회 메뉴화면
 * 수정일      수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author   : 최 호 정
 * since    : 2017.06.09
 * version  : 1.0
 ********************************************************/

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
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";

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

var gridData1 = [];

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

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<PercentFormatter id="perfmt" useThousandsSeparator="true" precision="2" />\
		<NumberFormatter  id="numfmt" useThousandsSeparator="true" precision="0" />\
		<DataGrid id="dg1" sortableColumns="true" showDataTips="true" horizontalScrollPolicy="auto" lastColumnWidthPolicy="balance" >\
			<groupedColumns>\
				<DataGridColumnGroup headerText="'+majorCategory+'">\
					<DataGridColumn  dataField="LRG_CODE"            headerText="'+slSaleCode+'"  width="60"  textAlign="center" />\
					<DataGridColumn  dataField="LRG_NAME"            headerText="'+categoryNm+'"  width="80" textAlign="center" />\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+slSaleStdDate+'">\
					<DataGridColumn  dataField="STD_NET_SALES"       headerText="'+selngAm+'"     id="dg1col1" width="90" textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn  dataField="STD_TRXN_CNT"        headerText="'+ct+'"          id="dg1col2" width="80" textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn  dataField="STD_CTRANSACTION"    headerText="'+unitPrice+'"   id="dg1col3" width="90" textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn  dataField="STD_CLS_RATIO"       headerText="'+cmpntrt+'"     id="dg1col4" width="80" textAlign="right" />\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+slSaleCtrDate+'">\
					<DataGridColumn  dataField="CTR_NET_SALES"       headerText="'+selngAm+'"  	  id="dg1col5" backgroundColor="#e6ffe6" width="90" textAlign="right" formatter="{numfmt}" />\
					<DataGridColumn  dataField="CTR_TRXN_CNT"        headerText="'+ct+'"          id="dg1col6" backgroundColor="#e6ffe6" width="80" textAlign="right" formatter="{numfmt}" />\
					<DataGridColumn  dataField="CTR_CTRANSACTION"    headerText="'+unitPrice+'"   id="dg1col7" backgroundColor="#e6ffe6" width="90" textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn  dataField="CTR_CLS_RATIO"       headerText="'+cmpntrt+'"     id="dg1col8" backgroundColor="#e6ffe6" width="80" textAlign="right" />\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+slSaleEvaluation+'">\
					<DataGridColumn  dataField="AMT_REDUCED"         headerText="'+selngIrDsAmount+'" id="dg1col9"  backgroundColor="#ffffcc" width="100" textAlign="right" formatter="{numfmt}" />\
					<DataGridColumn  dataField="RATIO_AMT_REDUCED"   headerText="'+slSaleIncrease+'"  id="dg1col10" backgroundColor="#ffffcc" width="80"  textAlign="right" />\
					<DataGridColumn  dataField="TRXN_REDUCED"        headerText="'+ct+'"              id="dg1col11" backgroundColor="#ffffcc" width="80"  textAlign="right" formatter="{numfmt}" />\
					<DataGridColumn  dataField="RATIO_TRXN_REDUCED"  headerText="'+slSaleIncrease+'"  id="dg1col12" backgroundColor="#ffffcc" width="80"  textAlign="right" />\
					<DataGridColumn  dataField="TRAN_REDUCED"        headerText="'+unitPrice+'"       id="dg1col13" backgroundColor="#ffffcc" width="90"  textAlign="right" formatter="{numfmt}" />\
					<DataGridColumn  dataField="RATIO_TRXN_REDUCED"  headerText="'+slSaleIncrease+'"  id="dg1col14" backgroundColor="#ffffcc" width="80"  textAlign="right" />\
				</DataGridColumnGroup>\
			</groupedColumns>\
			<footers>\
			<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col1}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col2}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="col3Summary" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col4}" formatter="{perfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col5}" formatter="{numfmt}" textAlign="right" backgroundColor="#e6ffe6" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col6}" formatter="{numfmt}" textAlign="right" backgroundColor="#e6ffe6" />\
				<DataGridFooterColumn labelJsFunction="col7Summary" formatter="{numfmt}" textAlign="right" backgroundColor="#e6ffe6" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col8}" formatter="{perfmt}" textAlign="right" backgroundColor="#e6ffe6" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col9}" formatter="{numfmt}" textAlign="right" backgroundColor="#ffffcc" />\
				<DataGridFooterColumn labelJsFunction="col10Summary" formatter="{perfmt}" textAlign="right" backgroundColor="#ffffcc" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col11}" formatter="{numfmt}" textAlign="right" backgroundColor="#ffffcc" />\
				<DataGridFooterColumn labelJsFunction="col12Summary" formatter="{perfmt}" textAlign="right" backgroundColor="#ffffcc" />\
				<DataGridFooterColumn labelJsFunction="col13SUmmary" formatter="{numfmt}" textAlign="right" backgroundColor="#ffffcc" />\
				<DataGridFooterColumn labelJsFunction="col14Summary" formatter="{perfmt}" textAlign="right" backgroundColor="#ffffcc" />\
			</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';

//----------------------- 그리드 설정 끝 -----------------------

String.prototype.cut = function(len) {
	var str = this;
	var l = 0;
	for (var i=0; i < str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len)
			return str.substring(0,i);
	}
	return str;
}

//목록 그리드 조회
function getGridData() {
	var params 				= $("#search_frm").serializeAllObject();
	var S_STD_STR_DT_ARR 	= $("#S_STD_STR_DT").val().split("-");
	var S_STD_END_DT_ARR 	= $("#S_STD_END_DT").val().split("-");
	var S_CTR_STR_DT_ARR 	= $("#S_CTR_STR_DT").val().split("-");
	var S_CTR_END_DT_ARR 	= $("#S_CTR_END_DT").val().split("-");
	var strDt1 				= new Date(S_STD_STR_DT_ARR[0], Number(S_STD_STR_DT_ARR[1])-1, S_STD_STR_DT_ARR[2]); 
	var endDt1 				= new Date(S_STD_END_DT_ARR[0], Number(S_STD_END_DT_ARR[1])-1, S_STD_END_DT_ARR[2]); 
	var strDt2 				= new Date(S_CTR_STR_DT_ARR[0], Number(S_CTR_STR_DT_ARR[1])-1, S_CTR_STR_DT_ARR[2]); 
	var endDt2 				= new Date(S_CTR_END_DT_ARR[0], Number(S_CTR_END_DT_ARR[1])-1, S_CTR_END_DT_ARR[2]); 
	var dateDiff1 			= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	var dateDiff2 			= ((endDt2.getTime() - strDt2.getTime()) / 1000 / 60 / 60 / 24) + 1;
	
	params.S_STR_CODE = $("#S_STR_CODE").val();
	
	
	//유효성검사
	if(dateDiff1 > 60) {
		alert("기준기간 60일 이상은 조회하실 수 없습니다.");
		$("#S_STD_STR_DT").focus();
		return;
	}
	
	if(dateDiff2 > 60) {
		alert("대비기간 60일 이상은 조회하실 수 없습니다.");
		$("#S_CTR_STR_DT").focus();
		return;
	}

	//날짜 체크
	if($("#S_STD_STR_DT").val() == null || $("#S_STD_STR_DT").val() == "")
	{
		alert(slSaleStdPeriod + msgConfirm);
		$("#S_STD_STR_DT").focus();
		return;
	}
	if( $("#S_STD_END_DT").val() == null || $("#S_STD_END_DT").val() == "")
	{
		alert(slSaleStdPeriod + msgConfirm);
		$("#S_STD_END_DT").focus();
		return;
	}
	var strDt = $("#S_STD_STR_DT").val().replace(/-/g, "");
	var endDt = $("#S_STD_END_DT").val().replace(/-/g, "");
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#S_STD_END_DT").focus();
		return;
	}

	if($("#S_CTR_STR_DT").val() == null || $("#S_CTR_STR_DT").val() == "")
	{
		alert(slSaleCtrPeriod + msgConfirm);
		$("#S_CTR_STR_DT").focus();
		return;
	}
	if( $("#S_CTR_END_DT").val() == null || $("#S_CTR_END_DT").val() == "")
	{
		alert(slSaleCtrPeriod + msgConfirm);
		$("#S_CTR_END_DT").focus();
		return;
	}
	var strDt = $("#S_CTR_STR_DT").val().replace(/-/g, "");
	var endDt = $("#S_CTR_END_DT").val().replace(/-/g, "");
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#S_CTR_END_DT").focus();
		return;
	}

	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({
		url:"/salesPerformanceList.do",
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
			var returnCode = eval(data['code']);
			var returnValue = "";
			if(returnCode == "9999"){
				returnValue = data['Alert'];
				//alert(returnValue);
			}else{
				returnValue = eval(data['result']);
				gridApp1.setData(returnValue);
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

function excelExport(){
	var nowDate = new CommDateManager().getDate("yyyymmdd");
	var str_name = $("#S_STR_CODE option:selected").text();
	dataGrid1.exportFileName = "매출대비실적조회"+nowDate+"_"+str_name+"_"+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}

function init() {
	// 점포코드 콤보 가져오기
	getStoreCode("S_STR_CODE");
	$("#search_frm select[id='S_STR_CODE']").val(SSSC).prop("selected", true);

	//달력설정
	$("#S_STD_STR_DT").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_STD_STR_DT").val() > $("#S_STD_END_DT").val()){
				alert(msgDateValidation);
				$("#S_STD_STR_DT").val(CUR_DT);
				return;
			}
		}, showMonthAfterYear:true
	});
	$("#S_STD_END_DT").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_STD_STR_DT").val() > $("#S_STD_END_DT").val()){
				alert(msgDateValidation);
				$("#S_STD_END_DT").val(CUR_DT);
				return;
			}
		}, showMonthAfterYear:true
	});
	$("#S_CTR_STR_DT").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_CTR_STR_DT").val() > $("#S_CTR_END_DT").val()){
				alert(msgDateValidation);
				$("#S_CTR_STR_DT").val(CUR_DT);
				return;
			}
		}, showMonthAfterYear:true
	});
	$("#S_CTR_END_DT").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_CTR_STR_DT").val() > $("#S_CTR_END_DT").val()){
				alert(msgDateValidation);
				$("#S_CTR_END_DT").val(CUR_DT);
				return;
			}
	 	}, showMonthAfterYear:true
	});
	//var date = new CommDateManager().before(0, 0, 1).getDate("yyyy-mm-dd");
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var oneDayBefore = new CommDateManager().before(0, 0, 1).getDate("yyyy-mm-dd");
	$("#S_STD_STR_DT").val(date);
	$("#S_STD_END_DT").val(date);
	$("#S_CTR_STR_DT").val(oneDayBefore);
	$("#S_CTR_END_DT").val(oneDayBefore);

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
}

function col3Summary(){
	//객단가 = (매출액 / 객수)
	var chkdata = gridRoot1.getItemAt(0);
	var data;
	var std_transaction = "0";
	var std_net_sales = 0;
	var std_trxn_cnt  = 0;
	if(chkdata !="" && chkdata != null)
	{
		src1 = gridRoot1.getChangedData(true);
		for (var i = 0; i < src1.length; i++)
		{
			data = src1[i].data;
			if(data.LRG_CODE == "합계")
				continue;
			else
			{
				std_net_sales += data.STD_NET_SALES;
				std_trxn_cnt  += data.STD_TRXN_CNT;
			}
		}
		std_transaction = std_trxn_cnt == 0 ? 0: (std_net_sales / Math.abs(std_trxn_cnt));
		std_transaction = std_transaction.toFixed(0);
	}
	return std_transaction; // 평균을 구합니다.
}

function col7Summary(){
	//객단가 = (매출액 / 객수)
	var chkdata = gridRoot1.getItemAt(0);
	var data;
	var ctr_transaction = "0";
	var ctr_net_sales = 0;
	var ctr_trxn_cnt  = 0;
	if(chkdata !="" && chkdata != null)
	{
		src1 = gridRoot1.getChangedData(true);
		for (var i = 0; i < src1.length; i++)
		{
			data = src1[i].data;
			if(data.LRG_CODE == "합계")
				continue;
			else
			{
				ctr_net_sales += data.CTR_NET_SALES;
				ctr_trxn_cnt  += data.CTR_TRXN_CNT;
			}
		}
		ctr_transaction = ctr_trxn_cnt == 0 ? 0: (ctr_net_sales / Math.abs(ctr_trxn_cnt));
		ctr_transaction = ctr_transaction.toFixed(0);
	}
	return ctr_transaction; // 평균을 구합니다.
}

function col10Summary(){
	//증감액 증감율 = (증감액 / 대비일 매출액) * 100
	var chkdata = gridRoot1.getItemAt(0);
	var data;
	var rt_amt_reduced  = "0";
	var sum_amt_reduced = 0;
	var ctr_net_sales   = 0;
	if(chkdata !="" && chkdata != null)
	{
		src1 = gridRoot1.getChangedData(true);
		for (var i = 0; i < src1.length; i++)
		{
			data = src1[i].data;
			if(data.LRG_CODE == "합계")
				continue;
			else
			{
				ctr_net_sales   += data.CTR_NET_SALES;
				sum_amt_reduced += data.AMT_REDUCED;
			}
		}
		rt_amt_reduced = ctr_net_sales == 0 ? 0: (sum_amt_reduced / Math.abs(ctr_net_sales)) * 100;
		rt_amt_reduced = rt_amt_reduced.toFixed(2);
	}
	return rt_amt_reduced; // 평균을 구합니다.
}

function col12Summary(){
	//객수 증감율 = (객수 / 대비일 객수) * 100
	var chkdata = gridRoot1.getItemAt(0);
	var data;
	var rt_trxn_reduced  = "0";
	var sum_trxn_reduced = 0;
	var ctr_trxn_cnt     = 0;
	if(chkdata !="" && chkdata != null)
	{
		src1 = gridRoot1.getChangedData(true);
		for (var i = 0; i < src1.length; i++)
		{
			data = src1[i].data;
			if(data.LRG_CODE == "합계")
				continue;
			else
			{
				ctr_trxn_cnt     += data.CTR_TRXN_CNT;
				sum_trxn_reduced += data.TRXN_REDUCED;
			}
		}
		rt_trxn_reduced = ctr_trxn_cnt == 0 ? 0: (sum_trxn_reduced / Math.abs(ctr_trxn_cnt)) * 100;
		rt_trxn_reduced = rt_trxn_reduced.toFixed(2);
	}
	return rt_trxn_reduced; // 평균을 구합니다.
}


//평가-객단가
function col13SUmmary(){
	var std_ctransaction 	= 0;
	var ctr_transaction 	= 0;
	var rt_transaction 		= 0;
	
	std_ctransaction 	= Math.abs(col3Summary());	//기준일 객단가
	ctr_transaction 	= Math.abs(col7Summary());	//대비일 객단가
	
	
	rt_transaction = std_ctransaction - ctr_transaction;
	
	return rt_transaction;
}


//객단가 증감율
function col14Summary(){
	
	var chkdata = gridRoot1.getItemAt(0);
	var data;
	var rt_tran_reduced  	= "0";
	var ctr_transaction  	= 0;
	
	if(chkdata !="" && chkdata != null)
	{
		src1 = gridRoot1.getChangedData(true);
		for (var i = 0; i < src1.length; i++)
		{
			data = src1[i].data;
			if(data.LRG_CODE == "합계")
				continue;
			else
			{
				data.STD_NET_SALES;
				data.STD_TRXN_CNT;
			}
		}
		
		std_ctransaction 	= Math.abs(col3Summary());	//기준일 객단가
		ctr_transaction 	= Math.abs(col7Summary());	//대비일 객단가
		
		if(ctr_transaction == 0){
			rt_tran_reduced = 0;
		}else{
			//증감율 객단가 = ((객단가 / 대비일 객단가) / 대비일 객단가) * 100
			rt_tran_reduced = ((std_ctransaction - ctr_transaction) / ctr_transaction) * 100;
		}
		
		rt_tran_reduced = rt_tran_reduced.toFixed(2);
	}
	return rt_tran_reduced; // 평균을 구합니다.
}
