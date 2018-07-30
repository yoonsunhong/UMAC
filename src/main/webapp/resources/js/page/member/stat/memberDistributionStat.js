/********************************************************
 * 설명: 회원정보 > 멤버쉽관리 > 회원매출분포현황 매뉴화면
 * 수정일      수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author   : 최 호 정
 * since    : 2017.06.13
 * version  : 1.0
 ********************************************************/

$(document).ready(function () {
	//최초 도움말 불러오기
	setHelpMessage($(location).attr('pathname').replace('/',''));
	init();

});

//----------------------- 사용자 정의 유틸 -------------------------------------
//기준월 첫날
function getFirstDate(dt){
	var newDt = new Date(dt);
	newDt.setDate(1);
	return converDateString(newDt);
}

//기준월 말일 
function getLastDate(dt){
	var newDt = new Date(dt);
	newDt.setMonth(newDt.getMonth() + 1);
	newDt.setDate(0);
	return converDateString(newDt);
}

//date --> string
function converDateString(dt){
	//alert("[converDateString]dt="+dt);
	var strDate = dt.getFullYear() + "-" + addZero(eval(dt.getMonth()+1)) + "-" + addZero(dt.getDate());
	//alert("[converDateString]strDate="+strDate);
	return strDate;
}

function addZero(i){
	var rtn = i + 100;
	return rtn.toString().substring(1,3);
}

//----------------------- 사용자 정의 유틸 -------------------------------------

// ----------------------- 그리드 설정 시작 -------------------------------------
//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridApp2, gridRoot2, dataGrid2, dataRow2;

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
rMateGridH5.create("grid2", "gridHolder2", jsVars1, "100%", "250px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

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
	else if(id == "grid2"){
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		gridApp2.setLayout(layoutStr2);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData2();	
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}

function dataCompleteHandler2(event) {
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	var iStartDate, iEndDate;
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	if(dataRow1["SALE_DT"] != undefined){
		var strDt  = $("#S_STR_DATE").val().replace(/-/g, "");
		var endDt  = $("#S_END_DATE").val().replace(/-/g, "");
		var dataDt = dataRow1["SALE_DT"].replace(/-/g, "");
		//alert("strDt="+strDt+", endDt="+endDt+", dataDt="+dataDt);
		if (dataDt == strDt.substr(0,6)){
			iStartDate = dataDt + strDt.substr(6,2);
			iEndDate   = getLastDate(dataRow1["SALE_DT"]+"-01");
			//alert("iEndDate="+iEndDate);
		}
		else if (dataDt == endDt.substr(0,6)){
			iStartDate = getFirstDate(dataRow1["SALE_DT"]+"-01");
			iEndDate   = dataDt + endDt.substr(6,2);
		}
		else {
			iStartDate = getFirstDate(dataRow1["SALE_DT"]+"-01");
			iEndDate   = getLastDate(dataRow1["SALE_DT"]+"-01");
		}
		$("#I_STR_DATE").val(iStartDate);
		$("#I_END_DATE").val(iEndDate);
		var iStrDt = $("#I_STR_DATE").val().replace(/-/g, "");
		var iEndDt = $("#I_END_DATE").val().replace(/-/g, "");
		getGridData2($("#S_CORP_CODE").val(), $("#S_STR_CODE").val(), iStrDt, iEndDt);
	};
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<NumberFormatter  id="numfmt" useThousandsSeparator="true" />\
		<PercentFormatter id="perfmt" useThousandsSeparator="true" precision="2" />\
			<DataGrid id="dg1" sortableColumns="true" showDataTips="true"  horizontalScrollPolicy="auto" lockedColumnCount="3" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
					<DataGridColumn dataField="SALE_DT"  headerText="'+memStatColumn1+'" width="70" textAlign="center" />\
					<DataGridColumn dataField="DAY_CNT"  headerText="'+memStatColumn2+'" width="60" textAlign="right" />\
					<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'"         width="70" textAlign="center" />\
					<DataGridColumnGroup headerText="'+all+'">\
						<DataGridColumn dataField="TOTL_TOTAL_SALE_AMT" headerText="'+totalSales+'" id="dg1col1" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="TOTL_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col2" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="TOTL_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col3" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+member+'">\
						<DataGridColumn dataField="MEMB_TOTAL_SALE_AMT" headerText="'+selngAm+'"    id="dg1col4" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="MEMB_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col5" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="MEMB_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col6" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="MEMB_RATIO"          headerText="'+cmpntrt+'"                 width="80" textAlign="right" formatter="{perfmt}" styleJsFunction="styleFunction1" />\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memDistNorm+'">\
						<DataGridColumn dataField="NORM_TOTAL_SALE_AMT" headerText="'+selngAm+'"    id="dg1col7" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="NORM_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col8" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="NORM_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col9" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="NORM_RATIO"          headerText="'+cmpntrt+'"                 width="80" textAlign="right" formatter="{perfmt}" styleJsFunction="styleFunction1" />\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memDistIndi+'">\
						<DataGridColumn dataField="INDI_TOTAL_SALE_AMT" headerText="'+selngAm+'"    id="dg1col10" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="INDI_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col11" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="INDI_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col12" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="INDI_RATIO"          headerText="'+cmpntrt+'"                  width="80" textAlign="right" formatter="{perfmt}" styleJsFunction="styleFunction1" />\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memDistBusi+'">\
						<DataGridColumn dataField="BUSI_TOTAL_SALE_AMT" headerText="'+selngAm+'"    id="dg1col13" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="BUSI_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col14" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="BUSI_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col15" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
						<DataGridColumn dataField="BUSI_RATIO"          headerText="'+cmpntrt+'"                  width="80" textAlign="right" formatter="{perfmt}" styleJsFunction="styleFunction1" />\
					</DataGridColumnGroup>\
				</groupedColumns>\
				<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col1}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col2}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="cup1ASummary"                 formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col4}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col5}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="cup1MSummary"                 formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="ratio1MSummary"               formatter="{perfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col7}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col8}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="cup1NSummary"                 formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="ratio1NSummary"               formatter="{perfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col10}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col11}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="cup1ISummary"                 formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="ratio1ISummary"               formatter="{perfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col13}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col14}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="cup1BSummary"                 formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn labelJsFunction="ratio1BSummary"               formatter="{perfmt}" textAlign="right" />\
				</DataGridFooter>\
				</footers>\
			</DataGrid>\
	</rMateGrid>';

//그리드1 헤더 및 레이아웃
var layoutStr2 =
	'<rMateGrid>\
	<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
	<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
	<NumberFormatter  id="numfmt" useThousandsSeparator="true" />\
	<PercentFormatter id="perfmt" useThousandsSeparator="true" precision="2" />\
		<DataGrid id="dg1" sortableColumns="true" showDataTips="true"  horizontalScrollPolicy="auto" lockedColumnCount="3" lastColumnWidthPolicy="balance" >\
			<groupedColumns>\
				<DataGridColumn dataField="SALE_DT"   headerText="'+memStatColumn1+'" width="90" textAlign="center" />\
				<DataGridColumn dataField="SALE_WEEK" headerText="'+memStatColumn3+'" width="60" textAlign="center" labelJsFunction="dayNM"/>\
				<DataGridColumn dataField="STR_NAME"  headerText="'+storNm+'"         width="70" textAlign="center" />\
				<DataGridColumnGroup headerText="'+all+'">\
					<DataGridColumn dataField="TOTL_TOTAL_SALE_AMT" headerText="'+totalSales+'" id="dg1col1" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="TOTL_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col2" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="TOTL_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col3" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+member+'">\
					<DataGridColumn dataField="MEMB_TOTAL_SALE_AMT" headerText="'+selngAm+'"    id="dg1col4" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="MEMB_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col5" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="MEMB_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col6" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="MEMB_RATIO"          headerText="'+cmpntrt+'"                 width="80" textAlign="right" formatter="{perfmt}" styleJsFunction="styleFunction1" />\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+memDistNorm+'">\
					<DataGridColumn dataField="NORM_TOTAL_SALE_AMT" headerText="'+selngAm+'"    id="dg1col7" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="NORM_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col8" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="NORM_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col9" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="NORM_RATIO"          headerText="'+cmpntrt+'"                 width="80" textAlign="right" formatter="{perfmt}" styleJsFunction="styleFunction1" />\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+memDistIndi+'">\
					<DataGridColumn dataField="INDI_TOTAL_SALE_AMT" headerText="'+selngAm+'"    id="dg1col10" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="INDI_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col11" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="INDI_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col12" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="INDI_RATIO"          headerText="'+cmpntrt+'"                  width="80" textAlign="right" formatter="{perfmt}" styleJsFunction="styleFunction1" />\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+memDistBusi+'">\
					<DataGridColumn dataField="BUSI_TOTAL_SALE_AMT" headerText="'+selngAm+'"    id="dg1col13" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="BUSI_TOTAL_SALE_CNT" headerText="'+ct+'"         id="dg1col14" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="BUSI_CTRANSACTION"   headerText="'+unitPrice+'"  id="dg1col15" width="80" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="BUSI_RATIO"          headerText="'+cmpntrt+'"                  width="80" textAlign="right" formatter="{perfmt}" styleJsFunction="styleFunction1" />\
				</DataGridColumnGroup>\
			</groupedColumns>\
			<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col1}"  formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col2}"  formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="cup2ASummary"                 formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col4}"  formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col5}"  formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="cup2MSummary"                 formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="ratio2MSummary"               formatter="{perfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col7}"  formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col8}"  formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="cup2NSummary"                 formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="ratio2NSummary"               formatter="{perfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col10}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col11}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="cup2ISummary"                 formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="ratio2ISummary"               formatter="{perfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col13}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col14}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="cup2BSummary"                 formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn labelJsFunction="ratio2BSummary"               formatter="{perfmt}" textAlign="right" />\
			</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';

function styleFunction1(item, column) {
	var value = column.getDataField();
	if (item[value] == "소계" || item["value"] == "합계" ){
		return { color:"#000000", textAlign:"center" };
	}else{
		return { color:"#000000" };
	}
}

function dayNM(item, value, column){
	if(value == "1"){
		return "일";
	}else if (value == "2"){
		return "월";
	}else if (value == "3"){
		return "화";
	}else if (value == "4"){
		return "수";
	}else if (value == "5"){
		return "목";
	}else if (value == "6"){
		return "금";
	}else if (value == "7"){
		return "토";
	}else{
		return value;
	}
}

//목록 그리드 조회
function getGridData() {
	var params 			= $("#search_frm").serializeAllObject();
	var strDt 			= $("#S_STR_DATE").val().replace(/-/g, "");
	var endDt 			= $("#S_END_DATE").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#S_STR_DATE").val().split("-");
	var P_END_DT_ARR 	= $("#S_END_DATE").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if($("#S_STR_DATE").val() == null || $("#S_STR_DATE").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#S_STR_DATE").focus();
		return;
	}
	if( $("#S_END_DATE").val() == null || $("#S_END_DATE").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#S_END_DATE").focus();
		return;
	}

	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#S_END_DATE").focus();
		return;
	}

	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#S_STR_DATE").focus();
		return;
	}
	
	params.S_STR_CODE = $("#S_STR_CODE").val();

	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({
		url:"/memberDistributionStatList.do",
		type:"POST",
		datatype:"json",
		async:false,
		data: params,
		beforeSend : function(){
			gridRoot1.removeAll();
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

function getGridData2(num1,num2,num3,num4) {
	jQuery.ajax({ 
		url:"/memberDistributionStatByDayList.do",
		type:"POST",
		datatype:"json",
		//async:false,
		data: {'S_CORP_CODE':num1,'S_STR_CODE':num2,'I_STR_DATE':num3,'I_END_DATE':num4},
		beforeSend : function(){
			gridRoot2.addLoadingBar();
		}, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			//gridApp2.setData(data);
			var returnCode = eval(data['code']);
			var returnValue = "";
			if(returnCode == "9999"){
				returnValue = data['Alert'];
				//alert(returnValue);
			}else{
				returnValue = eval(data['result']);
				gridApp2.setData(returnValue);
			}
			dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
		},
		complete : function(data) {
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

function excelExport(gubun){
	var nowDate = new CommDateManager().getDate("yyyymmdd");
	var str_name = $("#S_STR_CODE option:selected").text();
	if (gubun == 1) {
		dataGrid1.exportFileName = "월별회원매출"+nowDate+"_"+str_name+"_"+".xlsx";
		gridRoot1.excelExportSave("/gridExcelDown.do", false);
	}
	else {
		dataGrid2.exportFileName = "일별회원매출"+nowDate+"_"+str_name+"_"+".xlsx";
		gridRoot2.excelExportSave("/gridExcelDown.do", false);
	}
}

function init() {
	// 점포코드 콤보 가져오기
	getStoreCode("S_STR_CODE");
	$("#search_frm select[id='S_STR_CODE']").val(SSSC).prop("selected", true);

	//달력설정
	$("#S_STR_DATE").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_STR_DATE").val() > $("#S_END_DATE").val()){
					alert(msgDateValidation);
					$("#S_STR_DATE").val(CUR_DT);
					return;
			}
		}, showMonthAfterYear:true
	});
	$("#S_END_DATE").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_STR_DATE").val() > $("#S_END_DATE").val()){
					alert(msgDateValidation);
					$("#S_END_DATE").val(CUR_DT);
					return;
			}
		 }, showMonthAfterYear:true
	});
	var date       = new CommDateManager().getDate("yyyy-mm-dd");
	var firstDayOfYear = new CommDateManager().getDate("yyyy") + "-01-01";
	//var firstDay   = getFirstDayOfYear(date);
	$("#S_STR_DATE").val(firstDayOfYear);
	$("#S_END_DATE").val(date);

	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height(280);

	$("#gridHolder2").width("100%");
	$("#gridHolder2").height(280);

	//조회
	$("#btn_search").click(function(){
		getGridData();
		//상품 분류별 목표 내용 삭제 
		gridApp2.setData(null);
	});

	$("#btn_excel_down").click(function(){
		excelExport(1);
	});

	$("#btn_excel_down_2").click(function(){
		excelExport(2);
	});
}

function cupSummary(gridNum, gubun){
	//객단가 = (매출액 / 객수)
	var chkdata, src;
	var data;
	var sales_cup = "0";
	var sales_amt = 0;
	var sales_cnt = 0;
	if (gridNum == 1)
	{
		chkdata = gridRoot1.getItemAt(0);
	}
	else
	{
		chkdata = gridRoot2.getItemAt(0);
	}
	if(chkdata !="" && chkdata != null)
	{
		if (gridNum == 1)
		{
			src = gridRoot1.getChangedData(true);
		}
		else
		{
			src = gridRoot2.getChangedData(true);
		}
		for (var i = 0; i < src.length; i++)
		{
			data = src[i].data;
			if(data.SALE_DT == "합계")
				continue;
			else
			{
				if (gubun == "A")
				{
					sales_amt += data.TOTL_TOTAL_SALE_AMT;
					sales_cnt += data.TOTL_TOTAL_SALE_CNT;
				}
				else if (gubun == "M")
				{
					sales_amt += data.MEMB_TOTAL_SALE_AMT;
					sales_cnt += data.MEMB_TOTAL_SALE_CNT;
				}
				else if (gubun == "N")
				{
					sales_amt += data.NORM_TOTAL_SALE_AMT;
					sales_cnt += data.NORM_TOTAL_SALE_CNT;
				}
				else if (gubun == "I")
				{
					sales_amt += data.INDI_TOTAL_SALE_AMT;
					sales_cnt += data.INDI_TOTAL_SALE_CNT;
				}
				else if (gubun == "B")
				{
					sales_amt += data.BUSI_TOTAL_SALE_AMT;
					sales_cnt += data.BUSI_TOTAL_SALE_CNT;
				}
			}
		}
		sales_cup = sales_cnt == 0 ? 0: (sales_amt / Math.abs(sales_cnt));
		sales_cup = sales_cup.toFixed(0);
	}
	return sales_cup; // 평균을 구합니다.
}

function cup1ASummary() {
	var cupResult = cupSummary(1, 'A');
	return cupResult;
}

function cup1MSummary() {
	var cupResult = cupSummary(1, 'M');
	return cupResult;
}

function cup1NSummary() {
	var cupResult = cupSummary(1, 'N');
	return cupResult;
}

function cup1ISummary() {
	var cupResult = cupSummary(1, 'I');
	return cupResult;
}

function cup1BSummary() {
	var cupResult = cupSummary(1, 'B');
	return cupResult;
}

function cup2ASummary() {
	var cupResult = cupSummary(2, 'A');
	return cupResult;
}

function cup2MSummary() {
	var cupResult = cupSummary(2, 'M');
	return cupResult;
}

function cup2NSummary() {
	var cupResult = cupSummary(2, 'N');
	return cupResult;
}

function cup2ISummary() {
	var cupResult = cupSummary(2, 'I');
	return cupResult;
}

function cup2BSummary() {
	var cupResult = cupSummary(2, 'B');
	return cupResult;
}

function ratioSummary(gridNum, gubun){
	//구성비 = (각 항목 매출합계 / 전체 매출 합계) * 100
	var chkdata, src;
	var data;
	var ratio  = "0";
	var total_sum_sales = 0;
	var each_sum_sales  = 0;
	if (gridNum == 1)
	{
		chkdata = gridRoot1.getItemAt(0);
	}
	else
	{
		chkdata = gridRoot2.getItemAt(0);
	}
	if(chkdata !="" && chkdata != null)
	{
		if (gridNum == 1)
		{
			src = gridRoot1.getChangedData(true);
		}
		else
		{
			src = gridRoot2.getChangedData(true);
		}
		for (var i = 0; i < src.length; i++)
		{
			data = src[i].data;
			if(data.SALE_DT == "합계")
				continue;
			else
			{
				total_sum_sales += data.TOTL_TOTAL_SALE_AMT;
				if (gubun == "M")
				{
					each_sum_sales += data.MEMB_TOTAL_SALE_AMT;
				}
				else if (gubun == "N")
				{
					each_sum_sales += data.NORM_TOTAL_SALE_AMT;
				}
				else if (gubun == "I")
				{
					each_sum_sales += data.INDI_TOTAL_SALE_AMT;
				}
				else if (gubun == "B")
				{
					each_sum_sales += data.BUSI_TOTAL_SALE_AMT;
				}
			}
		}
		ratio = total_sum_sales == 0 ? 0: (each_sum_sales / Math.abs(total_sum_sales)) * 100;
		ratio = ratio.toFixed(2);
	}
	return ratio; // 평균을 구합니다.
}

function ratio1MSummary() {
	var ratioResult = ratioSummary(1, 'M');
	return ratioResult;
}

function ratio1NSummary() {
	var ratioResult = ratioSummary(1, 'N');
	return ratioResult;
}

function ratio1ISummary() {
	var ratioResult = ratioSummary(1, 'I');
	return ratioResult;
}

function ratio1BSummary() {
	var ratioResult = ratioSummary(1, 'B');
	return ratioResult;
}

function ratio2MSummary() {
	var ratioResult = ratioSummary(2, 'M');
	return ratioResult;
}

function ratio2NSummary() {
	var ratioResult = ratioSummary(2, 'N');
	return ratioResult;
}

function ratio2ISummary() {
	var ratioResult = ratioSummary(2, 'I');
	return ratioResult;
}

function ratio2BSummary() {
	var ratioResult = ratioSummary(2, 'B');
	return ratioResult;
}
