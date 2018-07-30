/********************************************************
 * 설명: 회원정보 > 멤버쉽관리 > 사업자매출현황 매뉴화면
 * 수정일      수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author   : 최 호 정
 * since    : 2017.05.30
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
	if(dataRow1["YEAR_MONTH"] != undefined){
		var strDt  = $("#S_STR_DATE").val().replace(/-/g, "");
		var endDt  = $("#S_END_DATE").val().replace(/-/g, "");
		var dataDt = dataRow1["YEAR_MONTH"].replace(/-/g, "");
		//alert("strDt="+strDt+", endDt="+endDt+", dataDt="+dataDt);
		if (dataDt == strDt.substr(0,6)){
			iStartDate = dataDt + strDt.substr(6,2);
			iEndDate   = getLastDate(dataRow1["YEAR_MONTH"]+"-01");
			//alert("iEndDate="+iEndDate);
		}
		else if (dataDt == endDt.substr(0,6)){
			iStartDate = getFirstDate(dataRow1["YEAR_MONTH"]+"-01");
			iEndDate   = dataDt + endDt.substr(6,2);
		}
		else {
			iStartDate = getFirstDate(dataRow1["YEAR_MONTH"]+"-01");
			iEndDate   = getLastDate(dataRow1["YEAR_MONTH"]+"-01");
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
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
			<DataGrid id="dg1" sortableColumns="true" showDataTips="true"  horizontalScrollPolicy="auto" lockedColumnCount="3" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
					<DataGridColumn dataField="YEAR_MONTH"  headerText="'+memStatColumn1+'"   width="100" textAlign="center" />\
					<DataGridColumn dataField="DAYSINMONTH" headerText="'+memStatColumn2+'"   width="80"  textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1"/>\
					<DataGridColumn dataField="TOTAL_SUM"   headerText="'+memStatColumn4+'"   id="dg1col3"  resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="A1"          headerText="'+memStatColumnA1+'"  id="dg1col4"  resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="A2"          headerText="'+memStatColumnA2+'"  id="dg1col5"  resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="A3"          headerText="'+memStatColumnA3+'"  id="dg1col6"  resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="A4"          headerText="'+memStatColumnA4+'"  id="dg1col7"  resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="B1"          headerText="'+memStatColumnB1+'"  id="dg1col8"  resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="B2"          headerText="'+memStatColumnB2+'"  id="dg1col9"  resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="C1"          headerText="'+memStatColumnC1+'"  id="dg1col10" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="C2"          headerText="'+memStatColumnC2+'"  id="dg1col11" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="D1"          headerText="'+memStatColumnD1+'"  id="dg1col12" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="E1"          headerText="'+memStatColumnE1+'"  id="dg1col13" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="F1"          headerText="'+memStatColumnF1+'"  id="dg1col14" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="F2"          headerText="'+memStatColumnF2+'"  id="dg1col15" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="G1"          headerText="'+memStatColumnG1+'"  id="dg1col16" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="H1"          headerText="'+memStatColumnH1+'"  id="dg1col17" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="I1"          headerText="'+memStatColumnI1+'"  id="dg1col18" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="I2"          headerText="'+memStatColumnI2+'"  id="dg1col19" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="I3"          headerText="'+memStatColumnI3+'"  id="dg1col20" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="J1"          headerText="'+memStatColumnJ1+'"  id="dg1col21" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="K1"          headerText="'+memStatColumnK1+'"  id="dg1col22" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="K2"          headerText="'+memStatColumnK2+'"  id="dg1col23" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="K3"          headerText="'+memStatColumnK3+'"  id="dg1col24" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="L1"          headerText="'+memStatColumnL1+'"  id="dg1col25" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="L2"          headerText="'+memStatColumnL2+'"  id="dg1col26" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="L3"          headerText="'+memStatColumnL3+'"  id="dg1col27" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="L4"          headerText="'+memStatColumnL4+'"  id="dg1col28" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
					<DataGridColumn dataField="M3"          headerText="'+memStatColumnM3+'"  id="dg1col29" resizable="false" width="100" textAlign="right" formatter="{numfmt}" styleJsFunction="styleFunction1" />\
				</groupedColumns>\
				<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col3}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col4}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col5}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col6}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col7}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col8}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col9}"  formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col10}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col11}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col12}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col13}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col14}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col15}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col16}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col17}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col18}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col19}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col20}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col21}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col22}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col23}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col24}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col25}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col26}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col27}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col28}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn  summaryOperation="SUM" dataColumn="{dg1col29}" formatter="{numfmt}" textAlign="right" />\
				</DataGridFooter>\
				</footers>\
			</DataGrid>\
	</rMateGrid>';

//그리드1 헤더 및 레이아웃
var layoutStr2 =
	'<rMateGrid>\
		<SpanCellAttribute id="sum2CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#FFE048"/>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
			<DataGrid id="dg1" sortableColumns="true" showDataTips="true"  horizontalScrollPolicy="auto" lockedColumnCount="2" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
					<DataGridColumn dataField="SALE_DATE" headerText="'+selngDate+'"      resizable="false" width="100" textAlign="center"/>\
					<DataGridColumn dataField="SALE_DAY"  headerText="'+memStatColumn3+'" resizable="false" width="80" textAlign="center" labelJsFunction="dayNM"/>\
					<DataGridColumnGroup headerText="'+memStatColumn4+'">\
						<DataGridColumn dataField="TODAY_AMT" headerText="'+selngAm+'"        width="100" textAlign="right" formatter="{numfmt}" />\
						<DataGridColumn dataField="DIFF_AMT"  headerText="'+memStatColumn5+'" width="80"  textAlign="right" formatter="{numfmt}" />\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnA1+'">\
						<DataGridColumn dataField="A1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="A1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnA2+'">\
						<DataGridColumn dataField="A2"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="A2_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right" />\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnA3+'">\
						<DataGridColumn dataField="A3"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="A3_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnA4+'">\
						<DataGridColumn dataField="A4"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="A4_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnB1+'">\
						<DataGridColumn dataField="B1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="B1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnB2+'">\
						<DataGridColumn dataField="B2"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="B2_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnC1+'">\
						<DataGridColumn dataField="C1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="C1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnC2+'">\
						<DataGridColumn dataField="C2"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="C2_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnD1+'">\
						<DataGridColumn dataField="D1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="D1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnE1+'">\
						<DataGridColumn dataField="E1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="E1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnF1+'">\
						<DataGridColumn dataField="F1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="F1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnF2+'">\
						<DataGridColumn dataField="F2"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="F2_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnG1+'">\
						<DataGridColumn dataField="G1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="G1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnH1+'">\
						<DataGridColumn dataField="H1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="H1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnI1+'">\
						<DataGridColumn dataField="I1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="I1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnI2+'">\
						<DataGridColumn dataField="I2"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="I2_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnI3+'">\
						<DataGridColumn dataField="I3"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="I3_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnJ1+'">\
						<DataGridColumn dataField="J1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="J1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnK1+'">\
						<DataGridColumn dataField="K1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="K1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnK2+'">\
						<DataGridColumn dataField="K2"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="K2_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnK3+'">\
						<DataGridColumn dataField="K3"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="K3_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnL1+'">\
						<DataGridColumn dataField="L1"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="L1_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnL2+'">\
						<DataGridColumn dataField="L2"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="L2_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnL3+'">\
						<DataGridColumn dataField="L3"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="L3_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnL4+'">\
						<DataGridColumn dataField="L4"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="L4_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
					<DataGridColumnGroup headerText="'+memStatColumnM3+'">\
						<DataGridColumn dataField="M3"  headerText="'+selngAm+'" id="dg1col1" width="80" textAlign="right" formatter="{numfmt}"/>\
						<DataGridColumn dataField="M3_PERCENT"  headerText="'+cmpntrt+'" id="dg1col2" width="80" textAlign="right"/>\
					</DataGridColumnGroup>\
				</groupedColumns>\
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
	if(value == "7"){
		return "일";
	}else if (value == "1"){
		return "월";
	}else if (value == "2"){
		return "화";
	}else if (value == "3"){
		return "수";
	}else if (value == "4"){
		return "목";
	}else if (value == "5"){
		return "금";
	}else if (value == "6"){
		return "토";
	}else{
		return value;
	}
}

//목록 그리드 조회
function getGridData() {
	var P_STR_DT_ARR 	= $("#S_STR_DATE").val().split("-");
	var P_END_DT_ARR 	= $("#S_END_DATE").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if(dateDiff > 60) {
		alert("조회일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#S_STR_DATE").focus();
		return false;
	}
	
	//날짜 체크
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

	var strDt = $("#S_STR_DATE").val().replace(/-/g, "");
	var endDt = $("#S_END_DATE").val().replace(/-/g, "");
	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#S_END_DATE").focus();
		return;
	}

	var params = $("#search_frm").serializeAllObject();
	
	params.P_STR_CODE = $("#S_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({
		url:"/memberSalesStatList.do",
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
		url:"/memberStatByDayList.do",
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
		dataGrid1.exportFileName = "사업자회원매출"+nowDate+"_"+str_name+"_"+".xlsx";
		gridRoot1.excelExportSave("/gridExcelDown.do", false);
	}
	else {
		dataGrid2.exportFileName = "사업자일별요일별매출"+nowDate+"_"+str_name+"_"+".xlsx";
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
	var date       		= new CommDateManager().getDate("yyyy-mm-dd");
	var firstDayOfYear 	= new CommDateManager().getDate("yyyy-mm") + "-01";
	$("#S_STR_DATE").val(firstDayOfYear);
	$("#S_END_DATE").val(date);

	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height(260);

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

