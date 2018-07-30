/********************************************************
 * 설명:  상품재고조회
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
/*rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "270px");
rMateGridH5.create("grid2", "gridHolder2", jsVars1, "100%", "330px");*/
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
				
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}else if(id == "grid2"){
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		gridApp2.setLayout(layoutStr2);
		
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
	//그리드 펼치기	
	dataGrid2.expandLevel(1);	
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
	//날짜 , 점포코드
	getGridData2(dataRow1.INV_MT,dataRow1.STR_CODE,dataRow1.CLS_CODE,dataRow1.MID_CODE,dataRow1.LRG_CODE);	
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

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="1">\
			<groupedColumns>\
				<DataGridColumn 	dataField="STR_NAME" 		headerText="'+storNm+'" 		width="170" />\
				<DataGridColumn 	dataField="BASE_SPRC"		headerText="'+lsmthCyfdAm+'"    	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumnGroup headerText="'+thsMon+'">\
					<DataGridColumn dataField="PUR_SPRC_RTN_SPRC" 	 	headerText="'+puchasAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_SPRC" 	 			headerText="'+selngAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SDIN_SPRC_DIN_SPRC" 	 	headerText="'+deAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SDOUT_SPRC_DOUT_SPRC" 	headerText="'+lonAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="UP_SPRC" 	 			headerText="'+incrseAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="DOWN_SPRC" 	 			headerText="'+rdctnAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
				</DataGridColumnGroup>\
				<DataGridColumn 	dataField="BPSSSI"		headerText="'+thsMonInvntryAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn 	dataField="INV_MT"         visible = "false" />\
				<DataGridColumn 	dataField="STR_CODE"       visible = "false" />\
			</groupedColumns>\
			<dataProvider>\
			<GroupingCollection  source="{$gridData}">\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
					        	<SummaryField dataField="BASE_SPRC" 			summaryOperation="SUM" label="BASE_SPRC" />\
								<SummaryField dataField="PUR_SPRC_RTN_SPRC" 	summaryOperation="SUM" label="PUR_SPRC_RTN_SPRC" />\
								<SummaryField dataField="SALE_SPRC" 			summaryOperation="SUM" label="SALE_SPRC" />\
								<SummaryField dataField="SDIN_SPRC_DIN_SPRC" 	summaryOperation="SUM" label="SDIN_SPRC_DIN_SPRC" />\
								<SummaryField dataField="SDOUT_SPRC_DOUT_SPRC" 	summaryOperation="SUM" label="SDOUT_SPRC_DOUT_SPRC" />\
								<SummaryField dataField="UP_SPRC" 				summaryOperation="SUM" label="UP_SPRC" />\
								<SummaryField dataField="DOWN_SPRC" 			summaryOperation="SUM" label="DOWN_SPRC" />\
								<SummaryField dataField="BPSSSI"				summaryOperation="SUM" label="BPSSSI" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="CD_SHORT_NM">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="BASE_SPRC" 			summaryOperation="SUM" label="BASE_SPRC" />\
								<SummaryField dataField="PUR_SPRC_RTN_SPRC" 	summaryOperation="SUM" label="PUR_SPRC_RTN_SPRC" />\
								<SummaryField dataField="SALE_SPRC" 			summaryOperation="SUM" label="SALE_SPRC" />\
								<SummaryField dataField="SDIN_SPRC_DIN_SPRC" 	summaryOperation="SUM" label="SDIN_SPRC_DIN_SPRC" />\
								<SummaryField dataField="SDOUT_SPRC_DOUT_SPRC" 	summaryOperation="SUM" label="SDOUT_SPRC_DOUT_SPRC" />\
								<SummaryField dataField="UP_SPRC" 				summaryOperation="SUM" label="UP_SPRC" />\
								<SummaryField dataField="DOWN_SPRC" 			summaryOperation="SUM" label="DOWN_SPRC" />\
								<SummaryField dataField="BPSSSI"				summaryOperation="SUM" label="BPSSSI" />\
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
				<DataGridColumn 	dataField="ITM_SHORT_NAME" 		headerText="'+goodsCl+'/'+itmName+'" 		width="170" />\
				<DataGridColumn 	dataField="BASE_SPRC"		headerText="'+lsmthCyfdAm+'"    	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumnGroup headerText="'+thsMon+'">\
					<DataGridColumn dataField="PUR_SPRC_RTN_SPRC" 	 	headerText="'+puchasAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SALE_SPRC" 	 			headerText="'+selngAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SDIN_SPRC_DIN_SPRC" 	 	headerText="'+deAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="SDOUT_SPRC_DOUT_SPRC" 	headerText="'+lonAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="UP_SPRC" 	 			headerText="'+incrseAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="DOWN_SPRC" 	 			headerText="'+rdctnAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
				</DataGridColumnGroup>\
				<DataGridColumn 	dataField="BPSSSI"		headerText="'+thsMonInvntryAmount+'"  	textAlign="right" formatter="{numfmt}"/>\
			</groupedColumns>\
			<dataProvider>\
			<GroupingCollection  source="{$gridData}" beforeSorting="false" >\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="BASE_SPRC" 			summaryOperation="SUM" label="BASE_SPRC" />\
								<SummaryField dataField="PUR_SPRC_RTN_SPRC" 	summaryOperation="SUM" label="PUR_SPRC_RTN_SPRC" />\
								<SummaryField dataField="SALE_SPRC" 			summaryOperation="SUM" label="SALE_SPRC" />\
								<SummaryField dataField="SDIN_SPRC_DIN_SPRC" 	summaryOperation="SUM" label="SDIN_SPRC_DIN_SPRC" />\
								<SummaryField dataField="SDOUT_SPRC_DOUT_SPRC" 	summaryOperation="SUM" label="SDOUT_SPRC_DOUT_SPRC" />\
								<SummaryField dataField="UP_SPRC" 				summaryOperation="SUM" label="UP_SPRC" />\
								<SummaryField dataField="DOWN_SPRC" 			summaryOperation="SUM" label="DOWN_SPRC" />\
								<SummaryField dataField="BPSSSI"				summaryOperation="SUM" label="BPSSSI" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="LRG_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="BASE_SPRC" 			summaryOperation="SUM" label="BASE_SPRC" />\
								<SummaryField dataField="PUR_SPRC_RTN_SPRC" 	summaryOperation="SUM" label="PUR_SPRC_RTN_SPRC" />\
								<SummaryField dataField="SALE_SPRC" 			summaryOperation="SUM" label="SALE_SPRC" />\
								<SummaryField dataField="SDIN_SPRC_DIN_SPRC" 	summaryOperation="SUM" label="SDIN_SPRC_DIN_SPRC" />\
								<SummaryField dataField="SDOUT_SPRC_DOUT_SPRC" 	summaryOperation="SUM" label="SDOUT_SPRC_DOUT_SPRC" />\
								<SummaryField dataField="UP_SPRC" 				summaryOperation="SUM" label="UP_SPRC" />\
								<SummaryField dataField="DOWN_SPRC" 			summaryOperation="SUM" label="DOWN_SPRC" />\
								<SummaryField dataField="BPSSSI"				summaryOperation="SUM" label="BPSSSI" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="MID_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="BASE_SPRC" 			summaryOperation="SUM" label="BASE_SPRC" />\
								<SummaryField dataField="PUR_SPRC_RTN_SPRC" 	summaryOperation="SUM" label="PUR_SPRC_RTN_SPRC" />\
								<SummaryField dataField="SALE_SPRC" 			summaryOperation="SUM" label="SALE_SPRC" />\
								<SummaryField dataField="SDIN_SPRC_DIN_SPRC" 	summaryOperation="SUM" label="SDIN_SPRC_DIN_SPRC" />\
								<SummaryField dataField="SDOUT_SPRC_DOUT_SPRC" 	summaryOperation="SUM" label="SDOUT_SPRC_DOUT_SPRC" />\
								<SummaryField dataField="UP_SPRC" 				summaryOperation="SUM" label="UP_SPRC" />\
								<SummaryField dataField="DOWN_SPRC" 			summaryOperation="SUM" label="DOWN_SPRC" />\
								<SummaryField dataField="BPSSSI"				summaryOperation="SUM" label="BPSSSI" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="CLS_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="BASE_SPRC" 			summaryOperation="SUM" label="BASE_SPRC" />\
								<SummaryField dataField="PUR_SPRC_RTN_SPRC" 	summaryOperation="SUM" label="PUR_SPRC_RTN_SPRC" />\
								<SummaryField dataField="SALE_SPRC" 			summaryOperation="SUM" label="SALE_SPRC" />\
								<SummaryField dataField="SDIN_SPRC_DIN_SPRC" 	summaryOperation="SUM" label="SDIN_SPRC_DIN_SPRC" />\
								<SummaryField dataField="SDOUT_SPRC_DOUT_SPRC" 	summaryOperation="SUM" label="SDOUT_SPRC_DOUT_SPRC" />\
								<SummaryField dataField="UP_SPRC" 				summaryOperation="SUM" label="UP_SPRC" />\
								<SummaryField dataField="DOWN_SPRC" 			summaryOperation="SUM" label="DOWN_SPRC" />\
								<SummaryField dataField="BPSSSI"				summaryOperation="SUM" label="BPSSSI" />\
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
	var params = $("#frm").serializeObject();

	params.P_INV_MT 	= params.P_INV_MT.replace("-","");	//조회년월 에서 - 제거 하기  
	params.P_STR_CODE 	= $("#P_STR_CODE").val();
	
	
	
	jQuery.ajax({
	    url:"/salesAnalReportStockList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
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

//상품분류별현황
function getGridData2(num1,num2,num3,num4,num5) {	
	jQuery.ajax({ 
	    url:"/salesAnalReportStockDList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {'P_INV_MT':num1,'P_STR_CODE':num2,'P_CLS_CODE':num3,'P_MID_CODE':num4,'P_LRG_CODE':num5},
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
    dataGrid2.exportSheetName = goodsClSttus;
    
	dataGrid1.exportFileName = goodsInvntrySearch+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);
}



$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#P_STR_CODE").val(SSSC).prop("selected", true);
	
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류	
	
	
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
	
	
	//조회
	$("#btn_search").click(function(){
		getGridData();
	});
	//btn_excel_down
	$("#btn_excel_down").click(function(){
		excelExport();
	});
	
	
});



