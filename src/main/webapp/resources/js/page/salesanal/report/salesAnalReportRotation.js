/********************************************************
 * 설명:  재고회전율분석
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
	//그리드 펼치기	
	dataGrid1.expandAll();
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);		
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}
function dataCompleteHandler2(event) {
	dataGrid2.expandLevel(1);
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	if(dataRow1["STR_CODE"] != undefined){
		getGridData2(dataRow1["STR_CODE"]);		
	}
}


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="1">\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" width="170" />\
				<DataGridColumnGroup headerText="'+selngAm+'">\
					<DataGridColumn dataField="GOAL_AMT"   headerText="'+goal+'"    	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_SPRC" 	 headerText="'+acmSlt+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+achivPer+'"  	textAlign="right" labelJsFunction="perFunction1" />\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+invEndQty+amount+'">\
					<DataGridColumn dataField="BASE_WPRC" 	 headerText="'+basis+invEndQty+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="ENVNR" 	 headerText="'+trmend+invEndQty+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+average+invEndQty+'"  	textAlign="right" labelJsFunction="perFunction2" formatter="{numfmt}" />\
				</DataGridColumnGroup>\
				<DataGridColumn headerText="'+inventoryTurnover+'"  	textAlign="right" 	labelJsFunction="perFunction3"/>\
			</groupedColumns>\
			<dataProvider>\
			<GroupingCollection  source="{$gridData}">\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="GOAL_AMT" summaryOperation="SUM" 				label="GOAL_AMT" />\
								<SummaryField dataField="SALE_SPRC" summaryOperation="SUM" 				label="SALE_SPRC" />\
								<SummaryField dataField="BASE_WPRC" summaryOperation="SUM" 				label="BASE_WPRC" />\
								<SummaryField dataField="ENVNR" summaryOperation="SUM" 					label="ENVNR" />\
								<SummaryField dataField="BASE_WPRC_ENVNR_AVRG" summaryOperation="SUM" 	label="BASE_WPRC_ENVNR_AVRG" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="CD_SHORT_NM">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="GOAL_AMT" summaryOperation="SUM" 				label="GOAL_AMT" />\
								<SummaryField dataField="SALE_SPRC" summaryOperation="SUM" 				label="SALE_SPRC" />\
								<SummaryField dataField="BASE_WPRC" summaryOperation="SUM" 				label="BASE_WPRC" />\
								<SummaryField dataField="ENVNR" summaryOperation="SUM" 					label="ENVNR" />\
								<SummaryField dataField="BASE_WPRC_ENVNR_AVRG" summaryOperation="SUM" 	label="BASE_WPRC_ENVNR_AVRG" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
				</Grouping>\
			</GroupingCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="1">\
		<groupedColumns>\
			<DataGridColumn dataField="MID_NAME" headerText="'+goodsCl+'" width="170" />\
			<DataGridColumnGroup headerText="'+selngAm+'">\
				<DataGridColumn dataField="GOAL_AMT"   headerText="'+goal+'"    	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_SPRC" 	 headerText="'+acmSlt+'"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn headerText="'+achivPer+'"  	textAlign="right" labelJsFunction="perFunction1"/>\
			</DataGridColumnGroup>\
			<DataGridColumnGroup headerText="'+invEndQty+amount+'">\
				<DataGridColumn dataField="BASE_WPRC" 	 headerText="'+basis+invEndQty+'"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="ENVNR" 	 headerText="'+trmend+invEndQty+'"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn headerText="'+average+invEndQty+'"  	textAlign="right" labelJsFunction="perFunction2" formatter="{numfmt}" />\
			</DataGridColumnGroup>\
			<DataGridColumn headerText="'+inventoryTurnover+'"  	textAlign="right" 	labelJsFunction="perFunction3"/>\
		</groupedColumns>\
		<dataProvider>\
		<GroupingCollection  source="{$gridData}" beforeSorting="false" >\
			<Grouping>\
				<GroupingField name="TOTAL_NAME">\
				    <summaries>\
				        <SummaryRow summaryPlacement="group">\
							<SummaryField dataField="GOAL_AMT" summaryOperation="SUM" 				label="GOAL_AMT" />\
							<SummaryField dataField="SALE_SPRC" summaryOperation="SUM" 				label="SALE_SPRC" />\
							<SummaryField dataField="BASE_WPRC" summaryOperation="SUM" 				label="BASE_WPRC" />\
							<SummaryField dataField="ENVNR" summaryOperation="SUM" 					label="ENVNR" />\
							<SummaryField dataField="BASE_WPRC_ENVNR_AVRG" summaryOperation="SUM" 	label="BASE_WPRC_ENVNR_AVRG" />\
				        </SummaryRow>\
				    </summaries>\
				</GroupingField>\
				<GroupingField name="LRG_NAME">\
				    <summaries>\
				        <SummaryRow summaryPlacement="group">\
							<SummaryField dataField="GOAL_AMT" summaryOperation="SUM" 				label="GOAL_AMT" />\
							<SummaryField dataField="SALE_SPRC" summaryOperation="SUM" 				label="SALE_SPRC" />\
							<SummaryField dataField="BASE_WPRC" summaryOperation="SUM" 				label="BASE_WPRC" />\
							<SummaryField dataField="ENVNR" summaryOperation="SUM" 					label="ENVNR" />\
							<SummaryField dataField="BASE_WPRC_ENVNR_AVRG" summaryOperation="SUM" 	label="BASE_WPRC_ENVNR_AVRG" />\
				        </SummaryRow>\
				    </summaries>\
				</GroupingField>\
			</Grouping>\
		</GroupingCollection>\
		</dataProvider>\
	</DataGrid>\
</rMateGrid>';
    


//목록 그리드 조회
function getGridData() {
	var params = $("#frm").serializeAllObject();

	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesAnalReportRotationList.do",
	    
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	  
            gridRoot1.addLoadingBar();
            //상품 분류별 목표 내용 삭제 
    		gridApp2.setData(null);
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

//목록 그리드 조회
function getGridData2(num1) {
	jQuery.ajax({ 
	    url:"/salesAnalReportRotationIList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		//data: params,
		data: {'P_STR_CODE':num1,'P_OPEN_DT':$("#P_OPEN_DT").val(),'P_END_DT':$("#P_END_DT").val()},
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
	
	dataGrid1.exportSheetName = bsnSttus;
    dataGrid2.exportSheetName = goodsClAcmSlt;
    
	dataGrid1.exportFileName = inventoryTurnoverAnalysis+"_"+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);
}

//달성율
function perFunction1(item, value, column){	
	var num1 = (item["SALE_SPRC"] / item["GOAL_AMT"]) * 100;
	return perFunction(num1);    
}

//평균재고
function perFunction2(item, value, column){
	var num1 = Math.round((item["BASE_WPRC"] + item["ENVNR"])/2);
	return perFunction(num1);    
}

//재고회전율
function perFunction3(item, value, column){
	//개월수차이 구하기
	var strtDate = $("#P_OPEN_DT").val().replace(/-/gi,"");
	var endDate = $("#P_END_DT").val().replace(/-/gi,"");
	var strtYear = parseInt(strtDate.substring(0,4));
	var strtMonth = parseInt(strtDate.substring(4,6));
	var endYear = parseInt(endDate.substring(0,4));
	var endMonth = parseInt(endDate.substring(4,6));
	var month = (endYear - strtYear) * 12 + (endMonth - strtMonth) + 1;
	
	
	
	//(실적/해당개월수) / 평균재고액 * 100
	
	var num1 = '0.00';
	
	if(((item["BASE_WPRC"] + item["ENVNR"]) / 2) != 0) {
		num1 = (((item["SALE_SPRC"] / month) / ((item["BASE_WPRC"] + item["ENVNR"]) / 2)) ).toFixed(2);
	}
	
	return num1;
}

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	//그리드 너비 제어
	$("#gridHolder1, #gridHolder2").width("100%");
	
	var hei = ($(window).height() - 157) / 5;
	
	$("#gridHolder1").height(hei*2);
	$("#gridHolder2").height(hei*3);

	$(window).on('resize',function (){	
		
		var hei = ($(window).height() - 157) / 5;
		
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
	});
	
	$("#btn_excel_down").click(function(){
		excelExport();
	});

});













