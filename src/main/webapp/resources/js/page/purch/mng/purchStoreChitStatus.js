/********************************************************
 * 설명:  점포별매입전표현황
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.04.19
 * version : 1.0
 ********************************************************/
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
rMateGridH5.create("grid2", "gridHolder2", jsVars1);

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
	}else if(id == "grid2"){
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
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);

	if(dataRow1["CORP_CODE"] != undefined && dataRow1["STR_CODE"] != undefined && dataRow1["PUR_CFM_DT"] != undefined && dataRow1["SLIP_NO"] != undefined){
		getGridData2(dataRow1["CORP_CODE"],dataRow1["STR_CODE"],dataRow1["PUR_CFM_DT"],dataRow1["SLIP_NO"]);
	};
}

function styleTextPurGb(item, column) {
	var value= column.getDataField();
	if(item[value] =="반품"){
		return { color:"#FF0000"};
	}else{
		return null;
	}
}
//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#c5c5c5" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#acacac" colSpan="6" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"  />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" 		headerText="'+storNm+'"		textAlign="center"		width="110"/>\
				<DataGridColumn dataField="PUR_CFM_DT"		headerText="입고일자"		textAlign="center"		formatter="{datefmt}"/>\
				<DataGridColumn dataField="PUR_DT"		headerText="전표일자"		textAlign="center"		formatter="{datefmt}"/>\
				<DataGridColumn dataField="SLIP_NO" 		headerText="'+docNo+'"		textAlign="center"/>\
				<DataGridColumn dataField="PUR_GB_TXT" 		headerText="'+purchGubun+'"		textAlign="center"		width="80" styleJsFunction="styleTextPurGb"  />\
				<DataGridColumn dataField="INV_FLAG_TXT" 	headerText="'+inputSection+'"		textAlign="center"		width="80"/>\
				<DataGridColumn dataField="VEN_NAME" 		headerText="'+venName+'"		/>\
				<DataGridColumn dataField="PUR_WPRC" 		headerText="공급가"		textAlign="right"		formatter="{numfmt}" id="dg1col6"/>\
				<DataGridColumn dataField="PUR_WVAT" 		headerText="'+purchaseVAT+'"		textAlign="right"		formatter="{numfmt}" id="dg1col7"/>\
				<DataGridColumn dataField="PUR_WAMT" 		headerText="매입'+sumAmount+'"		textAlign="right"		formatter="{numfmt}" id="dg1col8"/>\
				<DataGridColumn dataField="PUR_SAMT" 		headerText="'+salePrcSum+'"		textAlign="right"		formatter="{numfmt}" id="dg1col9"/>\
			</groupedColumns>\
			<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#c5c5c5" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal" >\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg1col6}"  textAlign="right"/>\
					<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg1col7}"  textAlign="right"/>\
					<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg1col8}"  textAlign="right"/>\
					<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg1col9}"  textAlign="right"/>\
				</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="5" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<NumberFormatter id="numfmt2" useThousandsSeparator="true" precision="-2" />\
		<DataGrid id="dg1" sortableColumns="true">\
			<groupedColumns>\
				<DataGridColumn dataField="SEQ" 			headerText="'+rowNumber+'"		textAlign="center"		width="80"/>\
				<DataGridColumn dataField="SCAN_CODE" 		headerText="'+scanCode+'"		textAlign="center"		width="150"/>\
				<DataGridColumn dataField="ITM_SHORT_NAME" 	headerText="'+itmName+'"	width="160"/>\
				<DataGridColumn dataField="UNIT" 			headerText="'+standard+'"	/>\
				<DataGridColumn dataField="SPECS" 			headerText="'+unit+'"/>\
				<DataGridColumn dataField="DEC_QTY" 		headerText="'+qY+'"		textAlign="right"		formatter="{numfmt}"/>\
				<DataGridColumn dataField="PUR_WAMT" 		headerText="'+purchasePrice+'"	textAlign="right"		formatter="{numfmt}"/>\
				<DataGridColumn dataField="PUR_WPRC" 		headerText="공급가"	textAlign="right"		formatter="{numfmt}"/>\
				<DataGridColumn dataField="PUR_WVAT" 		headerText="'+purchaseVAT+'"	textAlign="right"		formatter="{numfmt}"/>\
				<DataGridColumn dataField="PUR_T" 			headerText="매입'+sumAmount+'"	textAlign="right"		formatter="{numfmt}"/>\
				<DataGridColumn dataField="PUR_SPRC" 		headerText="'+productSprc+'"	textAlign="right"		formatter="{numfmt}"/>\
				<DataGridColumn dataField="PUR_SAMT" 		headerText="'+purSamt+'"	textAlign="right"		formatter="{numfmt}"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="SEQ" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
				            <SpanSummaryField dataField="DEC_QTY" summaryOperation="SUM" />\
					        <SpanSummaryField dataField="PUR_WPRC" summaryOperation="SUM" />\
				        	<SpanSummaryField dataField="PUR_WVAT" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="PUR_WAMT" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="PUR_T" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="PUR_SPRC" summaryOperation="SUM" />\
				        	<SpanSummaryField dataField="PUR_SAMT" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';
/*
<DataGrid id="dg1" sortableColumns="true">\
<groupedColumns>\
	<DataGridColumn dataField="SEQ" 			headerText="'+rowNumber+'"		textAlign="center"		width="80"/>\
	<DataGridColumn dataField="SCAN_CODE" 		headerText="'+scanCode+'"		textAlign="center"		width="150"/>\
	<DataGridColumn dataField="ITM_SHORT_NAME" 	headerText="'+itmName+'"	width="160"/>\
	<DataGridColumn dataField="UNIT" 			headerText="'+standard+'"	/>\
	<DataGridColumn dataField="SPECS" 			headerText="'+unit+'"/>\
	<DataGridColumn dataField="DEC_QTY" 		headerText="'+qY+'"		textAlign="right"		formatter="{numfmt}"/>\
	<DataGridColumn dataField="PUR_WPRC" 		headerText="'+purchasePrice+'"	textAlign="right"		formatter="{numfmt}"/>\
	<DataGridColumn dataField="PUR_WVAT" 		headerText="'+purchaseVAT+'"	textAlign="right"		formatter="{numfmt}"/>\
	<DataGridColumn dataField="PUR_WAMT" 		headerText="'+puchasAmount+'"	textAlign="right"		formatter="{numfmt}"/>\
	<DataGridColumn dataField="PUR_SPRC" 		headerText="'+productSprc+'"	textAlign="right"		formatter="{numfmt}"/>\
	<DataGridColumn dataField="PUR_SAMT" 		headerText="'+purSamt+'"	textAlign="right"		formatter="{numfmt}"/>\
</groupedColumns>\
<dataProvider>\
	<SpanSummaryCollection source="{$gridData}">\
		<summaries>\
	        <SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="SEQ" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
	            <SpanSummaryField dataField="DEC_QTY" summaryOperation="SUM" />\
		        <SpanSummaryField dataField="PUR_WPRC" summaryOperation="SUM" />\
	        	<SpanSummaryField dataField="PUR_WVAT" summaryOperation="SUM" />\
	            <SpanSummaryField dataField="PUR_WAMT" summaryOperation="SUM" />\
	            <SpanSummaryField dataField="PUR_SPRC" summaryOperation="SUM" />\
	        	<SpanSummaryField dataField="PUR_SAMT" summaryOperation="SUM" />\
	        </SpanSummaryRow>\
	    </summaries>\
	</SpanSummaryCollection>\
</dataProvider>\
</DataGrid>\
*/

//목록 그리드 조회
function getGridData() {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return;
	}
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/purchStoreChitStatusList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridApp1.setData(data);
			
			dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();	
	    },  
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function getGridData2(num1,num2,num3,num4) {	
	jQuery.ajax({ 
		url:"/purchStoreChitStatusDetail.do",
		type:"POST",
		datatype:"json",
		//async:false,	
		data: {'P_CORP_CODE':num1,'P_STR_CODE':num2,'P_PUR_CFM_DT':num3,'P_SLIP_NO':num4},
		beforeSend : function(){ 	    	
            gridRoot2.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridApp2.setData(data);
			
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

function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportSheetName = selngAcmslt;
    dataGrid2.exportSheetName = goodsClAcmSlt;
    
	dataGrid1.exportFileName = storePurchaseChitStatus+"_"+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	/*if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT3").val($("#I_TEXT").val());
		btn_comm_search('3');
	}*/
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

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	getCommonCodeSelectBoxList("P_PUR_GB", "PUR_GB");				// 매입구분
	getCommonCodeSelectBoxList("P_INV_FLAG", "INV_FLAG");				// 입력구분	
	
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
	$("#gridHolder1, #gridHolder2").width("100%");
	
	var hei = ($(window).height() - 165) / 5;
	
	$("#gridHolder1").height(hei*2);
	$("#gridHolder2").height(hei*3);

	$(window).on('resize',function (){	
		
		var hei = ($(window).height() - 165) / 5;
		
		$("#gridHolder1").height(hei*2);
		$("#gridHolder2").height(hei*3);	
		
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
		getGridData();
		//상품 분류별 목표 내용 삭제 
		gridApp2.setData(null);
	});	

	$("#btn_excel_search").click(function(){
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
	
});



