/********************************************************
 * 설명:  매출속보(시간대별)
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.01.09
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
		//getGridData();
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
	getGridData();
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

	if(dataRow1["STR_CODE"] != undefined && dataRow1["SALE_DT"] != undefined){
		getGridData2(dataRow1["STR_CODE"],dataRow1["SALE_DT"]);
	}
}


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="2" horizontalScrollPolicy="auto">\
			<columns>\
				<DataGridColumn dataField="STR_NAME" 	 headerText="'+storNm+'" width="150" />\
				<DataGridColumn dataField="SALE_AMT"     headerText="'+selngAm+'"    	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT09" 	 headerText="~09:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT10" 	 headerText="~10:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT11" 	 headerText="~11:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT12" 	 headerText="~12:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT13" 	 headerText="~13:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT14" 	 headerText="~14:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT15" 	 headerText="~15:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT16" 	 headerText="~16:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT17" 	 headerText="~17:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT18" 	 headerText="~18:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT19" 	 headerText="~19:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT20" 	 headerText="~20:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT21" 	 headerText="~21:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT22" 	 headerText="~22:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT23" 	 headerText="~23:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT24" 	 headerText="~24:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_DT" 	 visible = "false"/>\
				<DataGridColumn dataField="STR_CODE" 	 visible = "false"/>\
			</columns>\
			<dataProvider>\
			<GroupingCollection  source="{$gridData}">\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="SALE_AMT" summaryOperation="SUM" label="SALE_AMT" />\
								<SummaryField dataField="SALE_AMT09" summaryOperation="SUM" label="SALE_AMT09" />\
								<SummaryField dataField="SALE_AMT10" summaryOperation="SUM" label="SALE_AMT10" />\
								<SummaryField dataField="SALE_AMT11" summaryOperation="SUM" label="SALE_AMT11" />\
								<SummaryField dataField="SALE_AMT12" summaryOperation="SUM" label="SALE_AMT12" />\
								<SummaryField dataField="SALE_AMT13" summaryOperation="SUM" label="SALE_AMT13" />\
								<SummaryField dataField="SALE_AMT14" summaryOperation="SUM" label="SALE_AMT14" />\
								<SummaryField dataField="SALE_AMT15" summaryOperation="SUM" label="SALE_AMT15" />\
								<SummaryField dataField="SALE_AMT16" summaryOperation="SUM" label="SALE_AMT16" />\
								<SummaryField dataField="SALE_AMT17" summaryOperation="SUM" label="SALE_AMT17" />\
								<SummaryField dataField="SALE_AMT18" summaryOperation="SUM" label="SALE_AMT18" />\
								<SummaryField dataField="SALE_AMT19" summaryOperation="SUM" label="SALE_AMT19" />\
								<SummaryField dataField="SALE_AMT20" summaryOperation="SUM" label="SALE_AMT20" />\
								<SummaryField dataField="SALE_AMT21" summaryOperation="SUM" label="SALE_AMT21" />\
								<SummaryField dataField="SALE_AMT22" summaryOperation="SUM" label="SALE_AMT22" />\
								<SummaryField dataField="SALE_AMT23" summaryOperation="SUM" label="SALE_AMT23" />\
								<SummaryField dataField="SALE_AMT24" summaryOperation="SUM" label="SALE_AMT24" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="CD_SHORT_NM">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="SALE_AMT" summaryOperation="SUM" label="SALE_AMT" />\
								<SummaryField dataField="SALE_AMT09" summaryOperation="SUM" label="SALE_AMT09" />\
								<SummaryField dataField="SALE_AMT10" summaryOperation="SUM" label="SALE_AMT10" />\
								<SummaryField dataField="SALE_AMT11" summaryOperation="SUM" label="SALE_AMT11" />\
								<SummaryField dataField="SALE_AMT12" summaryOperation="SUM" label="SALE_AMT12" />\
								<SummaryField dataField="SALE_AMT13" summaryOperation="SUM" label="SALE_AMT13" />\
								<SummaryField dataField="SALE_AMT14" summaryOperation="SUM" label="SALE_AMT14" />\
								<SummaryField dataField="SALE_AMT15" summaryOperation="SUM" label="SALE_AMT15" />\
								<SummaryField dataField="SALE_AMT16" summaryOperation="SUM" label="SALE_AMT16" />\
								<SummaryField dataField="SALE_AMT17" summaryOperation="SUM" label="SALE_AMT17" />\
								<SummaryField dataField="SALE_AMT18" summaryOperation="SUM" label="SALE_AMT18" />\
								<SummaryField dataField="SALE_AMT19" summaryOperation="SUM" label="SALE_AMT19" />\
								<SummaryField dataField="SALE_AMT20" summaryOperation="SUM" label="SALE_AMT20" />\
								<SummaryField dataField="SALE_AMT21" summaryOperation="SUM" label="SALE_AMT21" />\
								<SummaryField dataField="SALE_AMT22" summaryOperation="SUM" label="SALE_AMT22" />\
								<SummaryField dataField="SALE_AMT23" summaryOperation="SUM" label="SALE_AMT23" />\
								<SummaryField dataField="SALE_AMT24" summaryOperation="SUM" label="SALE_AMT24" />\
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
		<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="2" horizontalScrollPolicy="auto">\
			<columns>\
				<DataGridColumn dataField="MID_NAME" 	 headerText="'+goodsCl+'" width="150" />\
				<DataGridColumn dataField="SALE_AMT"     headerText="'+selngAm+'"    	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT09" 	 headerText="~09:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT10" 	 headerText="~10:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT11" 	 headerText="~11:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT12" 	 headerText="~12:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT13" 	 headerText="~13:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT14" 	 headerText="~14:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT15" 	 headerText="~15:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT16" 	 headerText="~16:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT17" 	 headerText="~17:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT18" 	 headerText="~18:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT19" 	 headerText="~19:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT20" 	 headerText="~20:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT21" 	 headerText="~21:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT22" 	 headerText="~22:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT23" 	 headerText="~23:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT24" 	 headerText="~24:00"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_DT" 	 visible = "false"/>\
				<DataGridColumn dataField="STR_CODE" 	 visible = "false"/>\
			</columns>\
			<dataProvider>\
			<GroupingCollection source="{$gridData}" beforeSorting="false">\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="SALE_AMT" summaryOperation="SUM" label="SALE_AMT" />\
								<SummaryField dataField="SALE_AMT09" summaryOperation="SUM" label="SALE_AMT09" />\
								<SummaryField dataField="SALE_AMT10" summaryOperation="SUM" label="SALE_AMT10" />\
								<SummaryField dataField="SALE_AMT11" summaryOperation="SUM" label="SALE_AMT11" />\
								<SummaryField dataField="SALE_AMT12" summaryOperation="SUM" label="SALE_AMT12" />\
								<SummaryField dataField="SALE_AMT13" summaryOperation="SUM" label="SALE_AMT13" />\
								<SummaryField dataField="SALE_AMT14" summaryOperation="SUM" label="SALE_AMT14" />\
								<SummaryField dataField="SALE_AMT15" summaryOperation="SUM" label="SALE_AMT15" />\
								<SummaryField dataField="SALE_AMT16" summaryOperation="SUM" label="SALE_AMT16" />\
								<SummaryField dataField="SALE_AMT17" summaryOperation="SUM" label="SALE_AMT17" />\
								<SummaryField dataField="SALE_AMT18" summaryOperation="SUM" label="SALE_AMT18" />\
								<SummaryField dataField="SALE_AMT19" summaryOperation="SUM" label="SALE_AMT19" />\
								<SummaryField dataField="SALE_AMT20" summaryOperation="SUM" label="SALE_AMT20" />\
								<SummaryField dataField="SALE_AMT21" summaryOperation="SUM" label="SALE_AMT21" />\
								<SummaryField dataField="SALE_AMT22" summaryOperation="SUM" label="SALE_AMT22" />\
								<SummaryField dataField="SALE_AMT23" summaryOperation="SUM" label="SALE_AMT23" />\
								<SummaryField dataField="SALE_AMT24" summaryOperation="SUM" label="SALE_AMT24" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="LRG_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="SALE_AMT" summaryOperation="SUM" label="SALE_AMT" />\
								<SummaryField dataField="SALE_AMT09" summaryOperation="SUM" label="SALE_AMT09" />\
								<SummaryField dataField="SALE_AMT10" summaryOperation="SUM" label="SALE_AMT10" />\
								<SummaryField dataField="SALE_AMT11" summaryOperation="SUM" label="SALE_AMT11" />\
								<SummaryField dataField="SALE_AMT12" summaryOperation="SUM" label="SALE_AMT12" />\
								<SummaryField dataField="SALE_AMT13" summaryOperation="SUM" label="SALE_AMT13" />\
								<SummaryField dataField="SALE_AMT14" summaryOperation="SUM" label="SALE_AMT14" />\
								<SummaryField dataField="SALE_AMT15" summaryOperation="SUM" label="SALE_AMT15" />\
								<SummaryField dataField="SALE_AMT16" summaryOperation="SUM" label="SALE_AMT16" />\
								<SummaryField dataField="SALE_AMT17" summaryOperation="SUM" label="SALE_AMT17" />\
								<SummaryField dataField="SALE_AMT18" summaryOperation="SUM" label="SALE_AMT18" />\
								<SummaryField dataField="SALE_AMT19" summaryOperation="SUM" label="SALE_AMT19" />\
								<SummaryField dataField="SALE_AMT20" summaryOperation="SUM" label="SALE_AMT20" />\
								<SummaryField dataField="SALE_AMT21" summaryOperation="SUM" label="SALE_AMT21" />\
								<SummaryField dataField="SALE_AMT22" summaryOperation="SUM" label="SALE_AMT22" />\
								<SummaryField dataField="SALE_AMT23" summaryOperation="SUM" label="SALE_AMT23" />\
								<SummaryField dataField="SALE_AMT24" summaryOperation="SUM" label="SALE_AMT24" />\
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
	    url:"/salesInfoReportPromptList.do",
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

function getGridData2(num1,num2) {	
	jQuery.ajax({ 
		url:"/salesInfoReportPromptSalesList.do",
		type:"POST",
		datatype:"json",
		//async:false,
		data: {'P_STR_CODE':num1,'P_SALE_DT':num2},
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

function selectGo(num1){
	location.href="/salesInfoReportPrompt.do?SEARCH_TIME="+num1;
}


function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportSheetName = selngBreakingNews;
    dataGrid2.exportSheetName = goodsClAcctoGoal;
    
	dataGrid1.exportFileName = selngBreakingNews+"_"+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);
}


$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
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
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	$(".datepicker1").datepicker();
	
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
		gridData1ClickStrCode = "";
	});	
	
	var timer = setInterval(function() {
		getGridData();
    }, $("#SEARCH_TIME option:selected").val()); //1000 = 1초
	
	$("#btn_excel_down").click(function(){
		excelExport();
	});		
	
	
});



