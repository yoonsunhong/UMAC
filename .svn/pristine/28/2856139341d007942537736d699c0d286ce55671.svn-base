/********************************************************
 * 설명:  업체별 여신한도관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.02.01
 * version : 1.0
 ********************************************************/

$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	datePickerYearMonth();
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	$("#P_SEARCH_DT").val(nowDateYm);
});

var tabClickNum = "P";

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";



// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%");
rMateGridH5.create("grid2", "gridHolder2", jsVars, "100%");

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1  = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot();	         // 데이터와 그리드를 포함하는 객체

		gridApp1.setLayout(layoutStr1);
		gridApp1.setData(gridData);
		
		var layoutCompleteHandler1 = function(event) {
			dataGrid1   = gridRoot1.getDataGrid();   // 그리드 객체
			collection1 = gridRoot1.getCollection(); // 그리드의 데이터 객체
		}

		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		
	}else if (id == "grid2") {
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData);
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		
	}  
}

//function layoutCompleteHandler1() {
//	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
//}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1, collection1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2, selectorColumn2, collection2;


//----------------------- 그리드 설정 끝 -----------------------

function writeCount1(column, data) {
	return "전체";
}
function writeCount2(column, data) {
    if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    if (collection1) {
    	var clen = collection1.getLength();
    	var cnt = 0;
    	for (var i = 0; i < clen; i++) {
            var fv = gridRoot1.getItemFieldAt(i, "VEN_NAME");
            if(fv) {
            	//fv++;
                //gridRoot.setItemFieldAt(fv, i, "BEF_HOLD_AMT");
            	
            	cnt++;
            }
        }
    	
    	return moneyComma(String(cnt)) + " 건";
    }
    else
        return "";
}

function sumBEF_HOLD_AMT(column, data) {
    if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	//var fcolumn = dataGrid.getFooters()[0].getColumns()[3];
    	//a1 = dataGrid1.getDataGrid()[0].getColumns()[6];
    	
    	//dataGridColumn = dataGrid1.getColumns()[0];
    	//dataField = dataGrid1.getColumns()[0];
    	
    	var clen = collection1.getLength();
    	/*for (var i = 0; i < clen; i++) {
            var fv = gridRoot1.getItemFieldAt(i, "BEF_HOLD_AMT");
            //fv++;
            //gridRoot.setItemFieldAt(fv, i, "BEF_HOLD_AMT");
            sum += fv;
        }*/
    	
    	sum = gridRoot1.getItemFieldAt((clen-1), "BEF_HOLD_AMT");
    }
    
    if (sum)
    	return sum; //moneyComma(String(sum));
    else
    	return '0';
}
function sumPUR_AMT(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "PUR_AMT");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}
function sumTOT_PUR_AMT(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "TOT_PUR_AMT");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}
function sumJANG_AMT(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "JANG_AMT");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}
function sumDUCT_AMT(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "DUCT_AMT");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}
function sumTOT_DUCT_AMT(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "TOT_DUCT_AMT");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}
function sumPAY_TGT_AMT(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "PAY_TGT_AMT");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}
function sumHOLD_AMT(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "HOLD_AMT");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}
function sumRELE_AMT(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "RELE_AMT");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}
function sumPAY_NET_AMT(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "PAY_NET_AMT");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}
function sumPAY_ABLE(column, data) {
	if (!collection1 && gridRoot1)
        collection1 = gridRoot1.getCollection();

    var sum;
    if (collection1) {
    	var clen = collection1.getLength();
    	sum = gridRoot1.getItemFieldAt((clen-1), "PAY_ABLE");
    }

    if (sum)
    	return sum;
    else
    	return '0';
}

var layoutStr1;
var layoutStr2;
//그리드1 헤더 설정

layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_V" styleName="allTotalStyle" backgroundColor="#eeeeee" />\
		<SpanCellAttribute id="sum1CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#dddddd" colSpan="6" />\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="6" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" horizontalScrollPolicy="auto" sortableColumns="true" verticalAlign="middle">\
			<columns>\
				<DataGridColumn id="VEN_CODE"		dataField="VEN_CODE"  		headerText="' + venCode + '"  		textAlign="center" 	width="80"	/>\
				<DataGridColumn id="VEN_NAME"		dataField="VEN_NAME"  		headerText="' + venName + '"		textAlign="left" 	width="150"	/>\
				<DataGridColumn id="STR_NAME"		dataField="STR_NAME"  		headerText="' + storNm + '"			textAlign="left"	width="60" />\
				<DataGridColumn id="DT"				dataField="DT"  			headerText="' + purSeDt + '"		textAlign="center"	width="140"/>\
				<DataGridColumn id="PAY_CON"		dataField="PAY_CON"  		headerText="' + payCon + '"			textAlign="center"	width="140" />\
				<DataGridColumn id="PAY_SEQ"		dataField="PAY_SEQ"  		headerText="' + paySeq + '"			textAlign="center"	width="105" />\
				<DataGridColumn id="BEF_HOLD_AMT"	dataField="BEF_HOLD_AMT"	headerText="' + payTgtAmt + '" 		textAlign="right" 	labelJsFunction="labelFunc" styleJsFunction="styleAmount" />\
				<DataGridColumn id="PUR_AMT"		dataField="PUR_AMT"  		headerText="' + purchaseSales2 + amount + '" 	textAlign="right" 	labelJsFunction="labelFunc"/>\
				<DataGridColumn id="TOT_PUR_AMT"	dataField="TOT_PUR_AMT"  	headerText="' + purchaseSales2 + sm + '" 	textAlign="right" 	labelJsFunction="labelFunc"/>\
				<DataGridColumn id="JANG_AMT"		dataField="JANG_AMT"  		headerText="' + pyCfmJangAmt + '" 	textAlign="right" 	labelJsFunction="labelFunc"/>\
				<DataGridColumn id="DUCT_AMT"		dataField="DUCT_AMT"		headerText="' + ductAmt + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
				<DataGridColumn id="TOT_DUCT_AMT"	dataField="TOT_DUCT_AMT"  	headerText="' + ductTotal + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
				<DataGridColumn id="PAY_TGT_AMT"	dataField="PAY_TGT_AMT" 	headerText="' + payable + '" 		textAlign="right"   labelJsFunction="labelFunc"/>\
				<DataGridColumn id="HOLD_AMT"		dataField="HOLD_AMT"		headerText="' + holdAmt + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
				<DataGridColumn id="RELE_AMT"		dataField="RELE_AMT"		headerText="' + holdCancleAmt + '" 	textAlign="right" 	labelJsFunction="labelFunc"/>\
				<DataGridColumn id="PAY_NET_AMT"	dataField="PAY_NET_AMT"		headerText="' + payNetAmt + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
				<DataGridColumn id="PAY_ABLE"		dataField="PAY_ABLE"		headerText="' + accountsPayable2 + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
				<DataGridColumn id="RES_PAY_DT"		dataField="RES_PAY_DT"		headerText="' + resPayDt + '" 		textAlign="center" 	width="90" formatter="{datefmt}" />\
			</columns>\
			<dataProvider>\
			<SpanSummaryCollection source="{$gridData}">\
				<mergingFields>\
			        <SpanMergingField name="VEN_NAME">\
			            <SpanSummaryRow label="소계" labelDataField="VEN_CODE" rowAttribute="{sumRowAttr_V}" cellAttribute="{sum1CellAttr}">\
			                <SpanSummaryField dataField="BEF_HOLD_AMT"	summaryOperation="SUM" />\
			                <SpanSummaryField dataField="PUR_AMT"		summaryOperation="SUM" />\
			                <SpanSummaryField dataField="TOT_PUR_AMT"	summaryOperation="SUM" />\
			                <SpanSummaryField dataField="JANG_AMT"		summaryOperation="SUM" />\
			                <SpanSummaryField dataField="DUCT_AMT"		summaryOperation="SUM" />\
			                <SpanSummaryField dataField="TOT_DUCT_AMT"	summaryOperation="SUM" />\
			                <SpanSummaryField dataField="PAY_TGT_AMT"	summaryOperation="SUM" />\
			                <SpanSummaryField dataField="HOLD_AMT"		summaryOperation="SUM" />\
			                <SpanSummaryField dataField="RELE_AMT"		summaryOperation="SUM" />\
			                <SpanSummaryField dataField="PAY_NET_AMT"	summaryOperation="SUM" />\
			                <SpanSummaryField dataField="PAY_ABLE"		summaryOperation="SUM" />\
			            </SpanSummaryRow>\
			        </SpanMergingField>\
			    </mergingFields>\
				<summaries>\
			        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="VEN_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
			            <SpanSummaryField dataField="BEF_HOLD_AMT"	summaryOperation="SUM" />\
			            <SpanSummaryField dataField="PUR_AMT"		summaryOperation="SUM" />\
			            <SpanSummaryField dataField="TOT_PUR_AMT"	summaryOperation="SUM" />\
			            <SpanSummaryField dataField="JANG_AMT"		summaryOperation="SUM" />\
			            <SpanSummaryField dataField="DUCT_AMT"		summaryOperation="SUM" />\
			            <SpanSummaryField dataField="TOT_DUCT_AMT"	summaryOperation="SUM" />\
			            <SpanSummaryField dataField="PAY_TGT_AMT"	summaryOperation="SUM" />\
			            <SpanSummaryField dataField="HOLD_AMT"		summaryOperation="SUM" />\
			            <SpanSummaryField dataField="RELE_AMT"		summaryOperation="SUM" />\
			            <SpanSummaryField dataField="PAY_NET_AMT"	summaryOperation="SUM" />\
			            <SpanSummaryField dataField="PAY_ABLE"		summaryOperation="SUM" />\
			        </SpanSummaryRow>\
			    </summaries>\
			</SpanSummaryCollection>\
			</dataProvider>\
		    <footers>\
            <DataGridFooter height="30" backgroundColor="#bbd713">\
                <DataGridFooterColumn labelJsFunction="writeCount2" textAlign="right" />\
                <DataGridFooterColumn label="' + sm + '" textAlign="center" backgroundColor="#a8c305" />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn labelJsFunction="sumBEF_HOLD_AMT"		formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumPUR_AMT"			formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumTOT_PUR_AMT"		formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumJANG_AMT"			formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumDUCT_AMT"			formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumTOT_DUCT_AMT"		formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumPAY_TGT_AMT"		formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumHOLD_AMT"			formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumRELE_AMT"			formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumPAY_NET_AMT"		formatter="{numfmt}" textAlign="right" />\
                <DataGridFooterColumn labelJsFunction="sumPAY_ABLE"			formatter="{numfmt}" textAlign="right" />\
            </DataGridFooter>\
            </footers>\
		</DataGrid>\
	</rMateGrid>';
/*layoutStr1 =
'<rMateGrid>\
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="7" />\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg1" horizontalScrollPolicy="auto" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="No"  			headerText="' + rowNumber + '"		textAlign="center" 	width="60"	itemRenderer="IndexNoItem"  secondLabelJsFunction="secondFunc"/>\
			<DataGridColumn dataField="VEN_CODE"  		headerText="' + venCode + '"  		textAlign="center" 	width="80"	/>\
			<DataGridColumn dataField="VEN_NAME"  		headerText="' + venName + '"		textAlign="left" 	width="150"	/>\
			<DataGridColumn dataField="STR_NAME"  		headerText="' + storNm + '"			textAlign="left"	width="60" />\
			<DataGridColumn dataField="DT"  			headerText="' + purSeDt + '"		textAlign="center"	width="140"/>\
			<DataGridColumn dataField="PAY_CON"  		headerText="' + payCon + '"			textAlign="center"	width="140" />\
			<DataGridColumn dataField="PAY_SEQ"  		headerText="' + paySeq + '"			textAlign="center"	width="105" />\
			<DataGridColumn dataField="BEF_HOLD_AMT"	headerText="' + payTgtAmt + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="PUR_AMT"  		headerText="' + puchasAmount + '" 	textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="TOT_PUR_AMT"  	headerText="' + purchTotal + '" 	textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="JANG_AMT"  		headerText="' + pyCfmJangAmt + '" 	textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="DUCT_AMT"		headerText="' + ductAmt + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="TOT_DUCT_AMT"  	headerText="' + ductTotal + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="PAY_TGT_AMT" 	headerText="' + payable + '" 		textAlign="right"   labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="HOLD_AMT"		headerText="' + holdAmt + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="RELE_AMT"		headerText="' + holdCancleAmt + '" 	textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="PAY_NET_AMT"		headerText="' + payNetAmt + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="PAY_ABLE"		headerText="' + accountsPayable2 + '" 		textAlign="right" 	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="RES_PAY_DT"		headerText="' + resPayDt + '" 		textAlign="center" 	width="90" formatter="{datefmt}" />\
		</columns>\
		<dataProvider>\
			<SpanSummaryCollection source="{$gridData}">\
				<summaries>\
			        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="No" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
			            <SpanSummaryField dataField="BEF_HOLD_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="PUR_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="TOT_PUR_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="JANG_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="DUCT_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="PAY_TGT_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="TOT_DUCT_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="PAY_NET_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="HOLD_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="RELE_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="PAY_NET_AMT" summaryOperation="SUM" />\
			            <SpanSummaryField dataField="PAY_ABLE" summaryOperation="SUM" />\
			        </SpanSummaryRow>\
			    </summaries>\
		    </SpanSummaryCollection>\
	    </dataProvider>\
	</DataGrid>\
</rMateGrid>';
*/

layoutStr2 =
	'<rMateGrid>\
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="4" />\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" verticalAlign="middle">\
			<columns>\
				<DataGridColumn id="No"				dataField="No"  		headerText="' + rowNumber + '"		textAlign="center" 	width="100"	itemRenderer="IndexNoItem"  secondLabelJsFunction="secondFunc"/>\
				<DataGridColumn id="BANK_CODE"		dataField="BANK_CODE" 	headerText="' + bankCode + '" 		textAlign="center" />\
				<DataGridColumn id="BANK_NAME"		dataField="BANK_NAME" 	headerText="' + bankCode + '" 		textAlign="center" />\
				<DataGridColumn id="BANK_ACC_NO"	dataField="BANK_ACC_NO"	headerText="' + bankAccNo + '" 		textAlign="center" />\
				<DataGridColumn id="PAY_NET_AMT"	dataField="PAY_NET_AMT"	headerText="' + payAmt + '" 		textAlign="right" labelJsFunction="labelFunc"/>\
				<DataGridColumn id="BANK_ACOWN"		dataField="BANK_ACOWN"  headerText="' + bankAcown + '" 		textAlign="center" />\
				<DataGridColumn id="REP_NAME"		dataField="REP_NAME"	headerText="' + ceoName + '" 		textAlign="center" />\
			</columns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="No" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
				            <SpanSummaryField dataField="PAY_NET_AMT" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
			    </SpanSummaryCollection>\
		    </dataProvider>\
		</DataGrid>\
	</rMateGrid>';
/*
layoutStr2 =
	'<rMateGrid>\
	<SpanRowAttribute id="sumRowAttr_V" styleName="allTotalStyle" backgroundColor="#eeeeee" />\
	<SpanCellAttribute id="sum1CellAttr" colNo="0" styleName="subTotalStyle" backgroundColor="#dddddd" colSpan="8" />\
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="8" />\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" verticalAlign="middle">\
			<columns>\
				<DataGridColumn id="VEN_CODE"		dataField="VEN_CODE"  	headerText="' + venCode + '"  		textAlign="center" 	width="100"	/>\
				<DataGridColumn id="VEN_NAME"		dataField="VEN_NAME"  	headerText="' + venName + '"		textAlign="left" />\
				<DataGridColumn id="STR_NAME"		dataField="STR_NAME"  	headerText="' + storNm + '"			textAlign="center"	width="60" />\
				<DataGridColumn id="PAY_SEQ"		dataField="PAY_SEQ"  	headerText="' + paySeq + '"			textAlign="center"	width="105" />\
				<DataGridColumn id="REP_NAME"		dataField="REP_NAME"	headerText="' + ceoName + '" 		textAlign="center" />\
				<DataGridColumn id="BANK_ACOWN"		dataField="BANK_ACOWN"  headerText="' + bankAcown + '" 		textAlign="center" />\
				<DataGridColumn id="BANK_CODE"		dataField="BANK_CODE" 	headerText="' + bankCode + '" 		textAlign="center" />\
				<DataGridColumn id="BANK_ACC_NO"	dataField="BANK_ACC_NO"	headerText="' + bankAccNo + '" 		textAlign="center" />\
				<DataGridColumn id="PAY_NET_AMT"	dataField="PAY_NET_AMT"	headerText="' + payAmt + '" 		textAlign="right" labelJsFunction="labelFunc"/>\
				<DataGridColumn id="RES_PAY_DT"		dataField="RES_PAY_DT"	headerText="' + resPayDt + '" 		textAlign="center" 	width="90" formatter="{datefmt}" />\
			</columns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
				    <mergingFields>\
	                    <SpanMergingField name="VEN_NAME">\
	                        <SpanSummaryRow label="협력업체 소계" labelDataField="VEN_CODE" rowAttribute="{sumRowAttr_V}" cellAttribute="{sum1CellAttr}">\
	                            <SpanSummaryField dataField="PAY_NET_AMT" summaryOperation="SUM" />\
	                        </SpanSummaryRow>\
	                    </SpanMergingField>\
	                </mergingFields>\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="VEN_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
				            <SpanSummaryField dataField="PAY_NET_AMT" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
			    </SpanSummaryCollection>\
		    </dataProvider>\
		    <footers>\
            <DataGridFooter height="30" backgroundColor="#bbd713">\
                <DataGridFooterColumn labelJsFunction="writeCount2" textAlign="right" />\
                <DataGridFooterColumn label="' + sm + '" textAlign="center" backgroundColor="#a8c305" />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn />\
                <DataGridFooterColumn labelJsFunction="sumPAY_NET_AMT"		formatter="{numfmt}" textAlign="right" />\
            </DataGridFooter>\
            </footers>\
		</DataGrid>\
	</rMateGrid>';
*/
/*layoutStr2 =
	'<rMateGrid>\
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanRowAttribute id="sumRowAttr_V" styleName="allTotalStyle" backgroundColor="#d1e844" />\
	<SpanCellAttribute id="sum1CellAttr" colNo="3" styleName="subTotalStyle" backgroundColor="#CCDD66" colSpan="6" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="9" />\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true">\
			<columns>\
				<DataGridColumn id="No"				dataField="No"  		headerText="' + rowNumber + '"		textAlign="center" 	width="50"	itemRenderer="IndexNoItem"  secondLabelJsFunction="secondFunc"/>\
				<DataGridColumn id="STR_NAME"		dataField="STR_NAME"  	headerText="' + storNm + '"			textAlign="center"	width="60" />\
				<DataGridColumn id="PAY_SEQ"		dataField="PAY_SEQ"  	headerText="' + paySeq + '"			textAlign="center"	width="105" />\
				<DataGridColumn id="VEN_CODE"		dataField="VEN_CODE"  	headerText="' + venCode + '"  		textAlign="center" 	width="100"	/>\
				<DataGridColumn id="VEN_NAME"		dataField="VEN_NAME"  	headerText="' + venName + '"		textAlign="left" />\
				<DataGridColumn id="REP_NAME"		dataField="REP_NAME"	headerText="' + ceoName + '" 		textAlign="center" />\
				<DataGridColumn id="BANK_ACOWN"		dataField="BANK_ACOWN" 	headerText="' + bankAcown + '" 		textAlign="center" />\
				<DataGridColumn id="BANK_CODE"		dataField="BANK_CODE" 	headerText="' + bankCode + '" 		textAlign="center" />\
				<DataGridColumn id="BANK_ACC_NO"	dataField="BANK_ACC_NO"	headerText="' + bankAccNo + '" 		textAlign="center" />\
				<DataGridColumn id="PAY_NET_AMT"	dataField="PAY_NET_AMT"	headerText="' + payAmt + '" 		textAlign="right" labelJsFunction="labelFunc"/>\
				<DataGridColumn id="RES_PAY_DT"		dataField="RES_PAY_DT"	headerText="' + resPayDt + '" 		textAlign="center" 	width="90" formatter="{datefmt}" />\
			</columns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
				    <mergingFields>\
	                    <SpanMergingField name="VEN_NAME">\
	                        <SpanSummaryRow label="협력업체 소계" labelDataField="VEN_CODE" rowAttribute="{sumRowAttr_V}" cellAttribute="{sum1CellAttr}">\
	                            <SpanSummaryField dataField="PAY_NET_AMT" summaryOperation="SUM" />\
	                        </SpanSummaryRow>\
	                    </SpanMergingField>\
	                </mergingFields>\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="No" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
				            <SpanSummaryField dataField="PAY_NET_AMT" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
			    </SpanSummaryCollection>\
		    </dataProvider>\
		</DataGrid>\
	</rMateGrid>';
*/

//그리드1 데이터 초기화
var gridData = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
function secondFunc(item, value, column){
	if(item["No"])
		return item["No"];
	else 
		return value;
}

function labelFunc(item, value, column){
	var str = value;
	return moneyComma(String(str));
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
	$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
	
	//협력업체의 지불주기/지불차수 선택
	getPayNum(dataRow.VEN_CODE, 'P_PAY_CON','P_PAY_SEQ');
}

/*function fnSearch(){
	var venName = $('#P_VEN_NAME' ).val();
	if(venName == null || venName == ''){
		$('#P_VEN_CODE' ).val('');
	}
	
	if(tabClickNum == "B") {
		if(!$.trim($('#P_PAY_SEQ' ).val())) {
			alert('은행제출용은 지불차수를 선택해주세요.');
			$("#P_PAY_SEQ").focus();
			return false;
		}
	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/paymentRequestInfoList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
            gridRoot2.addLoadingBar();
	    },
		success:function(data){  
			gridApp1.setData(data.list);
			gridApp2.setData(data.list);
	    },
	    complete : function(data) {
	    	dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	       	dataGrid2.setEnabled(true);
	       	gridRoot2.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	       	dataGrid2.setEnabled(true);
	       	gridRoot2.removeLoadingBar();
	    }
	});
}
*/
function fnSearch(){
	var venName = $('#P_VEN_NAME' ).val();
	if(venName == null || venName == ''){
		$('#P_VEN_CODE' ).val('');
	}
	
	if(tabClickNum == "B") {
		if(!$.trim($('#P_PAY_SEQ' ).val())) {
			alert('은행제출용은 지불차수를 선택해주세요.');
			$("#P_PAY_SEQ").focus();
			return false;
		}
	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	if(tabClickNum == "B") {
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		jQuery.ajax({ 
		    url:"/paymentRequestInfoList_Bank.do",         
		    type:"POST",
			datatype:"json",
			data: loadData,
			beforeSend : function(){
				gridRoot2.addLoadingBar();
		    },
			success:function(data){
				gridApp2.setData(data.list);
		    },
		    complete : function(data) {
		    	dataGrid2.setEnabled(true);
		       	gridRoot2.removeLoadingBar();
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    	dataGrid2.setEnabled(true);
		       	gridRoot2.removeLoadingBar();
		    }
		});
	}
	else {
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		jQuery.ajax({ 
		    url:"/paymentRequestInfoList.do",         
		    type:"POST",
			datatype:"json",
			data: loadData,
			beforeSend : function(){
				gridRoot1.addLoadingBar();
		    },
			success:function(data){
				gridApp1.setData(data.list);
		    },
		    complete : function(data) {
		    	dataGrid1.setEnabled(true);
		       	gridRoot1.removeLoadingBar();
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    	dataGrid1.setEnabled(true);
		       	gridRoot1.removeLoadingBar();
		    }
		});
	}
}



//출력
function btn_print1(){
	
	//출력전표 발리데이션 체크
	if(tabClickNum == "B") {
		if(!$.trim($('#P_PAY_SEQ' ).val())) {
			alert('은행제출용은 지불차수를 선택해주세요.');
			$("#P_PAY_SEQ").focus();
			return false;
		}
	}
	
		var P_CORP_CODE	= $("#P_CORP_CODE").val();
		var P_PAY_YM		= $("#P_SEARCH_DT").val();
		var P_GRE_GB 		= $("#P_GRE_GB option:selected").val();
		var P_VEN_CODE	= $("#P_VEN_CODE").val();
		var P_PAY_CON		= $("#P_PAY_CON option:selected").val();
		var P_PAY_SEQ		= $("#P_PAY_SEQ option:selected").val();
		
		var params = "?reportMode=HTML"+"&P_CORP_CODE="+P_CORP_CODE+
							"&P_PAY_YM="+P_PAY_YM+
							"&P_GRE_GB="+P_GRE_GB+
							"&P_VEN_CODE="+P_VEN_CODE+
							"&P_PAY_CON="+P_PAY_CON+
							"&P_PAY_SEQ="+P_PAY_SEQ+
							"&P_BANK_GB="+tabClickNum;
							; // AIViewer 파라미터
		window.open("aireportPaymentRequestInfoPrint.do" + params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	
}

//지불주기 선택 > 지불차수 출력.
function chgPay( PAY_GB ) { 
	if( PAY_GB == "PAY_CON")
	{
		if( $('#P_PAY_CON').val() == "" )
		{    
			$('#PAY_CON_MGMT_ENTRY_1').val( "" );

			$("#P_PAY_CON").empty();
			$("#P_PAY_CON option").remove();
			$("#P_PAY_CON" ).append('<option value="">' + all + '</option>');
			getCommonCodeSelectBoxList("P_PAY_CON",   "PAY_CON"); // 지불주기  조회조건
			
			$("#P_PAY_SEQ").empty();
			$("#P_PAY_SEQ option").remove();
			$("#P_PAY_SEQ" ).append('<option value="">' + all + '</option>');
			getCommonCodeSelectBoxList("P_PAY_SEQ",   "PAY_SEQ"); // 지불차수
			
			return;
		}
		
		var MGMT_ENTRY_VAL = "";
		jQuery.ajax({ 
		    url:"/getPayMgmtEntry.do",         
		    type:"POST",
			datatype:"json",
			async:false,
		 	data: {   "CD_CL"  : "PAY_CON"
		 	,         "CD_ID"  : $('#P_PAY_CON').val()
		    },
			success:function(data){ 
				MGMT_ENTRY_VAL  =  data[0].MGMT_ENTRY_1  ;
				$('#PAY_CON_MGMT_ENTRY_1').val(   data[0].MGMT_ENTRY_1   ); 
		    },
		    complete : function(data) { 
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	
		 
		var postValue ={};	
		postValue = { 
				  "MGMT_ENTRY"	: MGMT_ENTRY_VAL  
		}; 
		jQuery.ajax({
		    type:"POST",
		    url:"/getPaySeqCodeSelectBoxList.do",    // getCateCodeSelectBoxList
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	$("#P_PAY_SEQ").empty();
		    	$("select[name=P_PAY_SEQ   ] option").remove();
		    	$("#P_PAY_SEQ" ).append('<option value="">' + all + '</option>'); 
				for(var i = 0; i < data.length; i++){
					 $("#P_PAY_SEQ"  ).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
			   	}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	}
	else if( PAY_GB == "PAY_SEQ"){
		if(tabClickNum == "B") {
			if($.trim($('#P_PAY_SEQ' ).val())) {
				fnSearch();
				
				$('#tab1').closest(".tab").find("ul > li").removeClass("on").find(".tab_btn").next().css("visibility","visible");
				$('#tab1').siblings().css("visibility","hidden").closest("li").addClass("on");
			}
		}
	}

}

//협력업체의 지불주기/지불차수 선택
//getPayNum(dataRow.VEN_CODE, 'P_PAY_CON_SEARCH','S_PAY_SEQ');
function getPayNum(venCode, pPayCon,pPaySeq){
	var postValue ={};	
	postValue = { 
			  "P_VEN_CODE"	: venCode
	};

	jQuery.ajax({
	    type:"POST",
	    url:"/getPayNum.do",
	    dataType:"JSON",
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	//data[0].PAY_CON, PAY_SEQ, PAY_TYPE, PAY_CON_NM, PAY_SEQ_NM
	    	//alert('PAY_CON: '+data[0].PAY_CON + ', PAY_SEQ:' + data[0].PAY_SEQ);
	    	
	    	$("#"+pPayCon).empty();
	    	$("select[name="+pPayCon+"   ] option").remove();
    		$("#"+pPayCon).append('<option value="">' + all + '</option>');
    		
    		$("#"+pPaySeq).empty();
    		$("select[name="+pPaySeq+"   ] option").remove();
    		$("#"+pPaySeq).append('<option value="">' + all + '</option>');
    		
	    	for(var i = 0; i < data.length; i++){
//	    		$("#"+pPayCon+"").val(data[i].PAY_CON).attr("selected","selected");
//	    		chgPay('PAY_CON');
//	    		
//			    $("#"+pPaySeq+"").val(data[i].PAY_SEQ).attr("selected","selected");
	    		
	    		$("#"+pPayCon).append('<option value="'+ data[i].PAY_CON +'">'+ data[i].PAY_CON_NM +'</option>');
	    		$("#"+pPayCon).val(data[i].PAY_CON).attr("selected","selected");
	    		
	    		$("#"+pPaySeq).append('<option value="'+ data[i].PAY_SEQ +'">'+ data[i].PAY_SEQ_NM +'</option>');
		    	$("#"+pPaySeq).val(data[i].PAY_SEQ).attr("selected","selected");
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//엑셀 export
function fnExcelExport(){
	var nowDate = new CommDateManager().getDate("yyyymmdd");
	
	dataGrid2.exportFileName = "export_"+nowDate+".xlsx";
	gridRoot2.excelExportSave("/gridExcelDown.do", false);
}

function init() {
	getCommonCodeSelectBoxList("P_GRE_GB",   "GRE_GB");
	getCommonCodeSelectBoxList("P_PAY_CON",   "PAY_CON");
	getCommonCodeSelectBoxList("P_PAY_SEQ",   "PAY_SEQ");
	
	// 협력(매입)업체에서 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        }
        
        //협력업체 없으면 지불주기/지불차수 전체
        var venName = $('#P_VEN_NAME' ).val();
    	if(venName == null || venName == ''){
    		$("#P_PAY_CON").empty();
    		$("select[name=P_PAY_CON   ] option").remove();
    		$("#P_PAY_CON" ).append('<option value="">' + all + '</option>');
    		getCommonCodeSelectBoxList("P_PAY_CON",   "PAY_CON"); // 지불주기  조회조건
    		
    		$("#P_PAY_SEQ").empty();
    		$("select[name=P_PAY_SEQ   ] option").remove();
    		$("#P_PAY_SEQ" ).append('<option value="">' + all + '</option>');
			getCommonCodeSelectBoxList("P_PAY_SEQ",   "PAY_SEQ"); // 지불차수
    	}
	});
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	//탭클릭시 은행or개인 구분값
	$("#bt_tab1").click(function(){
		tabClickNum = "P";
	});
	//$("#bt_tab2").click(function(){
	$("#bt_tab2").on("click focus",function  () {
		tabClickNum = "B";
		
		if(!$.trim($('#P_PAY_SEQ' ).val())) {
			//$(this).closest(".tab").find("ul > li").addClass("on").find(".tab_btn").next().css("visibility","visible");
			//$(this).siblings().css("visibility","hidden").closest("li").removeClass("on");
			
			$(this).closest(".tab").find("ul > li").removeClass("on").find(".tab_btn").next().css("visibility","visible");
			$(this).siblings().css("visibility","hidden").closest("li").addClass("on");
			
			alert('은행제출용은 지불차수를 선택해주세요.');
			$("#P_PAY_SEQ").focus();

			return false;
		}
	});
	
	$("#gridHolder1, #gridHolder2").height($(window).height()-125);

	$(window).on('resize',function (){	
		$("#gridHolder1, #gridHolder2").height($(window).height()-125);
	});
});