/********************************************************
 * 설명:  POS 마스터 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2016.12.21
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridApp2, gridRoot2, dataGrid2, dataRow2;
var gridApp3, gridRoot3, dataGrid3, dataRow3;
var gridApp4, gridRoot4, dataGrid4, dataRow4;

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
rMateGridH5.create("grid3", "gridHolder3", jsVars1, "409px", "400px");
rMateGridH5.create("grid4", "gridHolder4", jsVars1, "409px", "400px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

var gridData1ClickStrCode = "";
var grid1YYYY = "";	//조회년도

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
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData2();	
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}else if(id == "grid3"){
		// rMateGrid 관련 객체
		gridApp3 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot3 = gridApp3.getRoot(); // 데이터와 그리드를 포함하는 객체		
		gridApp3.setLayout(layoutStr3);		
	}else if(id == "grid4"){
		// rMateGrid 관련 객체	
		gridApp4 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot4 = gridApp4.getRoot(); // 데이터와 그리드를 포함하는 객체
		gridApp4.setData(null);
		gridApp4.setLayout(layoutStr4);	
		
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
	//그리드 펼치기	
	dataGrid2.expandLevel(1);
	//더블클릭 이벤트는 setDoubleClickEnabled 사용후 해야 적용됨
	dataGrid2.setDoubleClickEnabled(true);
	dataGrid2.addEventListener("itemDoubleClick", itemClickHandler2);
}

function layoutCompleteHandler3() {
	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
}
function dataCompleteHandler3(event) {
	//선택 객체 
	selectorColumn3 = gridRoot3.getObjectById("selector");
}

function layoutCompleteHandler4() {
	dataGrid4 = gridRoot4.getDataGrid();  // 그리드 객체
}
function dataCompleteHandler4(event) {
	//선택 객체 
	selectorColumn4 = gridRoot4.getObjectById("selector");	
}
function dataCompleteHandlerAuto3(event) {
	selectorColumn3 = gridRoot3.getObjectById("selector");
    selectorColumn3.setAllItemSelected(!selectorColumn3.getAllItemSelected());
    
    var timer = setTimeout(function() {
    	fn_btn_right();
        clearTimeout(timer);
    }, 500); //1000 = 1초
            
    //이벤트 삭제!
    gridRoot3.removeEventListener("dataComplete", dataCompleteHandlerAuto3);
    
}


//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	//clickData1 = dataRow1[dataField];
	//alert(dataRow1.ROLE_NM);
	//alert(dataRow1["STR_CODE"]);	
	
	if(dataRow1["STR_CODE"] != undefined){
		getGridData2(dataRow1["STR_CODE"]);
		//매출/매출이익 목표 클릭 시 점포코드
		gridData1ClickStrCode = dataRow1["STR_CODE"];
	}
}
//상품분류별목표 클릭시
function itemClickHandler2(event){	
	//var rowIndex = event.rowIndex;
	//var columnIndex = event.columnIndex;
	//dataRow2 = gridRoot2.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	//var column = dataGrid2.getDisplayableColumns()[columnIndex];
	//var dataField = column.getDataField();
	//clickData1 = dataRow1[dataField];
	//alert(dataRow1.ROLE_NM);
	//alert(dataRow1["STR_CODE"]);	
	//alert(rowIndex);
	
	//$("#P_STR_CODE").val()
	//$("#P_YYYY").val()
	
/*	fn_btn_new();	
	$("#pop_frm select[id='P_STR_CODE']").val($("#P_STR_CODE").val());
	$("#pop_frm select[id='P_YYYY']").val($("#P_YYYY").val());
	fn_btn_pop_search();
	toggleAllItemSelected();*/
	
	$("#pop_wrap").dialog("open");
	gridApp3.setData(null);
	gridApp4.setData(null);
	
	//$("#pop_frm select[id='P_STR_CODE']").val($("#P_STR_CODE").val());
	
	$("#pop_frm select[id='P_STR_CODE']").val(gridData1ClickStrCode);
	//$("#pop_frm select[id='P_YYYYMM']").val("2017-01");
	$("#P_YYYYMM").val(grid1YYYY +"-"+ length2(String(event.columnIndex -1)));	
	$("#CREAT_YYYYMM").val(grid1YYYY +"-"+ length2(String(event.columnIndex -1)));	

	
	getGridData3(); 
	
	gridRoot3.addEventListener("dataComplete", dataCompleteHandlerAuto3);			
	
}
function length2(num1){
	if(num1.length < 2){
		num1 = "0"+num1;
	}
	return num1;
}

//엑셀업로드 완료 이벤트
function importCompleteHandler4() {	
	//업로드 완료시 생성년도 엑셀업로드한 생성년도로 변경하기 위해
	var num1 = gridRoot4.getCollection().getSource()[0];
	var num2 = num1["YYYYMM"].substr(0,4);
	//selectbox 선택
	$("#CREAT_YYYYMM").val(num2);
}

//신규버튼 클릭시
/*function fn_btn_new(){
	$("#pop_wrap").dialog("open");
	gridApp3.setData(null);
	gridApp4.setData(null);
}*/

//팝업 에서 조회 클릭시
/*function fn_btn_pop_search(){
	getGridData3(); 
	
	gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
	gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
	
	gridApp4.setData(null);		
}*/


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="2">\
			<columns>\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" width="110"/>\
				<DataGridColumn dataField="SM"   headerText="'+sm+'"    textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M1" 	 headerText="1'+mt+'"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M2" 	 headerText="2'+mt+'"   textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M3"   headerText="3'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M4"   headerText="4'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M5"   headerText="5'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M6"   headerText="6'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M7"   headerText="7'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M8"   headerText="8'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M9"   headerText="9'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M10"   headerText="10'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M11"   headerText="11'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M12"   headerText="12'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
			</columns>\
			<dataProvider>\
			<GroupingCollection  source="{$gridData}">\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
					        	<SummaryField dataField="SM" summaryOperation="SUM" label="SM" />\
						        <SummaryField dataField="M1" summaryOperation="SUM" label="M1" />\
								<SummaryField dataField="M2" summaryOperation="SUM" label="M2" />\
								<SummaryField dataField="M3" summaryOperation="SUM" label="M3" />\
								<SummaryField dataField="M4" summaryOperation="SUM" label="M4" />\
								<SummaryField dataField="M5" summaryOperation="SUM" label="M5" />\
								<SummaryField dataField="M6" summaryOperation="SUM" label="M6" />\
								<SummaryField dataField="M7" summaryOperation="SUM" label="M7" />\
								<SummaryField dataField="M8" summaryOperation="SUM" label="M8" />\
								<SummaryField dataField="M9" summaryOperation="SUM" label="M9" />\
								<SummaryField dataField="M10" summaryOperation="SUM" label="M10" />\
								<SummaryField dataField="M11" summaryOperation="SUM" label="M11" />\
								<SummaryField dataField="M12" summaryOperation="SUM" label="M12" />\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="CD_SHORT_NM">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
					        	<SummaryField dataField="SM" summaryOperation="SUM" label="SM"/>\
						        <SummaryField dataField="M1" summaryOperation="SUM" label="M1" />\
								<SummaryField dataField="M2" summaryOperation="SUM" label="M2" />\
								<SummaryField dataField="M3" summaryOperation="SUM" label="M3" />\
								<SummaryField dataField="M4" summaryOperation="SUM" label="M4" />\
								<SummaryField dataField="M5" summaryOperation="SUM" label="M5" />\
								<SummaryField dataField="M6" summaryOperation="SUM" label="M6" />\
								<SummaryField dataField="M7" summaryOperation="SUM" label="M7" />\
								<SummaryField dataField="M8" summaryOperation="SUM" label="M8" />\
								<SummaryField dataField="M9" summaryOperation="SUM" label="M9" />\
								<SummaryField dataField="M10" summaryOperation="SUM" label="M10" />\
								<SummaryField dataField="M11" summaryOperation="SUM" label="M11" />\
								<SummaryField dataField="M12" summaryOperation="SUM" label="M12" />\
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
		<DataGrid id="dg2" sortableColumns="true" lockedColumnCount="2">\
			<columns>\
				<DataGridColumn dataField="MID_NAME" headerText="'+goodsCl+'" width="110" />\
				<DataGridColumn dataField="SM"  headerText="'+sm+'"   	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M1" 	 headerText="1'+mt+'"  	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M2" 	 headerText="2'+mt+'"   textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M3"   headerText="3'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M4"   headerText="4'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M5"   headerText="5'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M6"   headerText="6'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M7"   headerText="7'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M8"   headerText="8'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M9"   headerText="9'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M10"   headerText="10'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M11"   headerText="11'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="M12"   headerText="12'+mt+'" 	textAlign="right" formatter="{numfmt}"/>\
			</columns>\
			<dataProvider>\
			<GroupingCollection source="{$gridData}" beforeSorting="false">\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
					        	<SummaryField dataField="SM" summaryOperation="SUM" label="SM"/>\
						        <SummaryField dataField="M1" summaryOperation="SUM" label="M1"/>\
								<SummaryField dataField="M2" summaryOperation="SUM" label="M2"/>\
								<SummaryField dataField="M3" summaryOperation="SUM" label="M3"/>\
								<SummaryField dataField="M4" summaryOperation="SUM" label="M4"/>\
								<SummaryField dataField="M5" summaryOperation="SUM" label="M5"/>\
								<SummaryField dataField="M6" summaryOperation="SUM" label="M6"/>\
								<SummaryField dataField="M7" summaryOperation="SUM" label="M7"/>\
								<SummaryField dataField="M8" summaryOperation="SUM" label="M8"/>\
								<SummaryField dataField="M9" summaryOperation="SUM" label="M9"/>\
								<SummaryField dataField="M10" summaryOperation="SUM" label="M10"/>\
								<SummaryField dataField="M11" summaryOperation="SUM" label="M11"/>\
								<SummaryField dataField="M12" summaryOperation="SUM" label="M12"/>\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="LRG_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
					        	<SummaryField dataField="SM" summaryOperation="SUM" label="SM"/>\
						        <SummaryField dataField="M1" summaryOperation="SUM" label="M1"/>\
								<SummaryField dataField="M2" summaryOperation="SUM" label="M2"/>\
								<SummaryField dataField="M3" summaryOperation="SUM" label="M3"/>\
								<SummaryField dataField="M4" summaryOperation="SUM" label="M4"/>\
								<SummaryField dataField="M5" summaryOperation="SUM" label="M5"/>\
								<SummaryField dataField="M6" summaryOperation="SUM" label="M6"/>\
								<SummaryField dataField="M7" summaryOperation="SUM" label="M7"/>\
								<SummaryField dataField="M8" summaryOperation="SUM" label="M8"/>\
								<SummaryField dataField="M9" summaryOperation="SUM" label="M9"/>\
								<SummaryField dataField="M10" summaryOperation="SUM" label="M10"/>\
								<SummaryField dataField="M11" summaryOperation="SUM" label="M11"/>\
								<SummaryField dataField="M12" summaryOperation="SUM" label="M12"/>\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
				</Grouping>\
			</GroupingCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" sortableColumns="true">\
			<columns>\
    			<DataGridSelectorColumn id="selector" 	  textAlign="center" 		secondLabelJsFunction="secondLabelFunc" />\
				<DataGridColumn dataField="YYYYMM"        headerText="'+yymt+'"   			textAlign="center" />\
				<DataGridColumn dataField="MID_CODE" 	  headerText="'+goodsClMiddl+'"  	textAlign="center" width="100"/>\
				<DataGridColumn dataField="GOAL_AMT" 	  headerText="'+selngAm+'"    		textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_PROFIT"   headerText="'+selngProfit+'" 		textAlign="right" formatter="{numfmt}"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr4 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" sortableColumns="true" editable="true" doubleClickEnabled="true" >\
			<columns>\
				<DataGridSelectorColumn id="selector" 	  textAlign="center" 		secondLabelJsFunction="secondLabelFunc" />\
				<DataGridColumn dataField="YYYYMM"        headerText="'+yymt+'"   		textAlign="center" 		editable="false" />\
				<DataGridColumn dataField="MID_CODE" 	  headerText="'+goodsClMiddl+'"  	textAlign="center" 	editable="false" />\
				<DataGridColumn dataField="GOAL_AMT" 	  headerText="'+selngAm+'"    		textAlign="right"  formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_PROFIT"   headerText="'+selngProfit+'" 		textAlign="right"  formatter="{numfmt}"/>\
				<DataGridColumn dataField="CORP_CODE"     visible = "false" />\
				<DataGridColumn dataField="STR_CODE"      visible = "false" />\
				<DataGridColumn dataField="CFM_YN"        visible = "false" />\
				<DataGridColumn dataField="IEMP_NO"       visible = "false" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';



//목록 그리드 조회
function getGridData() {
	grid1YYYY = $("#P_YYYY").val();
	
	var params = $("#frm").serializeAllObject();
	
	params.P_STR_CODE = $("#frm select[id='P_STR_CODE']").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesInfoGoalList.do",         
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

function getGridData2(num1) {
	/*alert($("#P_YYYY").val());
	alert($('input:radio[name="P_SELNG"]:checked').val());*/
	//var params = $("#frm").serializeArray();
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesInfoGoalGoodsList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		//data: params,
		data: {'P_STR_CODE':num1,'P_YYYY':$("#P_YYYY").val(),'P_SELNG':$('input:radio[name="P_SELNG"]:checked').val()},	
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

//목록 그리드 조회
function getGridData3() {
	
	var params = $("#pop_frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesInfoGoalPopBefore.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridApp3.setData(data);
			//gridApp3.setData('{"YYYYMM":201616, "MID_CODE":"0000", "GOAL_AMT":1111, "SALE_PROFIT":109520}');
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});	
}

//매출목표관리 팝업 저장
function getGridData4(num1) {
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesInfoGoalPopInsert.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: num1,
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			//gridApp3.setData(data);
			//gridApp3.setData('{"YYYYMM":201616, "MID_CODE":"0000", "GOAL_AMT":1111, "SALE_PROFIT":109520}');
			alert(msgSave);	//저장되었습니다
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});	
}

//이미 생성된 목표가 있는지 체크(년도와 점포명으로)
function getGridData5(num1,num2) {
	var returnData;
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesInfoGoalPopSearch.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {'P_STR_CODE':num1,'P_CREAT_YYYYMM':num2},	
		success:function(data){
			returnData = data;
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});	
	return returnData;
}

//확정
function getGridData6(num1,num2) {
	jQuery.ajax({ 
	    url:"/salesInfoGoalDcsnUpdate.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {'P_STR_CODE':gridData1ClickStrCode,'P_YYYY':$("#P_YYYY").val()},	
		success:function(data){
			alert(dcsnSave);//확정되었습니다
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});		
}
//삭제
function getGridData7() {
	jQuery.ajax({ 
		url:"/salesInfoGoalDcsnDelete.do",         
		type:"POST",
		datatype:"json",
		//async:false,
		data: {'P_STR_CODE':gridData1ClickStrCode,'P_YYYY':$("#P_YYYY").val()},	
		success:function(data){
			alert(msgDelete);//삭제되었습니다
			
			getGridData();
			//상품 분류별 목표 내용 삭제 
			gridApp2.setData(null);
			gridData1ClickStrCode = "";			
		},
		complete : function(data) {
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});		
}
//확정여부
function getGridData8(num1,num2) {
	var returnData;
	jQuery.ajax({ 
		url:"/salesInfoGoalDcsnYn.do",         
		type:"POST",
		datatype:"json",
		async:false,
		//data: {'P_STR_CODE':gridData1ClickStrCode,'P_YYYY':$("#P_YYYY").val()},	
		data: {'P_STR_CODE':num1,'P_YYYY':num2},
		success:function(data){
			returnData = data;			
		},
		complete : function(data) {
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});		
	return returnData;
}


// 엑셀 export
// excelExportSave(url:String, async:Boolean);
//    url : 업로드할 서버의 url, 기본값 null
//    async : 비동기 모드로 수행여부, 기본값 false
function excelExport(){	
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	//gridRoot4.exportFileName = "export_"+date+".xlsx";
	dataGrid4.exportFileName = "매출목표관리_"+date+".xlsx";
	gridRoot4.excelExportSave("/gridExcelDown.do", false);
}

// excel 업로드 설정  

function excelImport() {
	
	var option = {
		layoutChangeOption:1,						// 레이아웃 변경 방식 - 0 : 사용자에게 질의, 1 : 현재 레이아웃에 데이터만 import, 2 : 헤더나 데이터에 따라 레이아웃을 재설정하고 데이터를 import
		headerRowCount:1,								// 헤더라인 수. 기본 값 0
		headerRowCountVisible:false,			// 헤더라인 수 표시 여부
		selectSheet:false,			// import한 파일내에 여러 Sheet가 있을 경우 사용자가 Sheet를 선택할 수 있도록 할 지 여부. (false일 경우 첫번째 Sheet를 가져옵니다) 기본 값 false
		useGroupedColumn:true,           // 그룹컬럼 생성 여부. false일 경우 1줄의 컬럼만 생성됩니다.
	};		
	
	gridRoot4.excelImport(option, "/gridExcelUp.do");	
	//gridRoot4.addEventListener("importComplete", importCompleteHandler4);
}

// excel 업로드 설정 끝

function excelExport2(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportSheetName = selngProfitGoal;
    dataGrid2.exportSheetName = goodsClAcctoGoal;
    
	dataGrid1.exportFileName = selngProfitGoal+"_"+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);
}

//grid 오른쪽으로 데이터 옮기기 버튼
function fn_btn_right(){
	
	//첫번째 로우에 값이 들어 있는경우 (grid를 불러왔을경우)		
	//alert(gridRoot3.getItemFieldAt(0,"GOAL_AMT"));
	if(gridRoot3.getItemAt(0) != null){
		//사용자가 입력한 증감하는 매출액,매출이익값
		var P_SELNGAM = $("#P_SELNGAM").val();
		var P_SELNGPROFIT = $("#P_SELNGPROFIT").val();
		
		var MY_P_SELNGAM = "";
		var MY_SELNGPROFIT = "";
		var MY_YYYYMM = "";
		
		//전체삭제
		gridRoot4.removeAll();
		
		var sItemArr2 = selectorColumn3.getSelectedIndices();		
		
		for (var i = 0; i < sItemArr2.length; i++) {
			//clone하지 않으면  grid자체 오류가 발생할수있다 
			dataRow = gridRoot3.clone(gridRoot3.getItemAt(sItemArr2[i]));	
			gridRoot4.addItemAt(dataRow);
			MY_YYYYMM = dataRow["YYYYMM"];
			MY_P_SELNGAM = dataRow["GOAL_AMT"];
			MY_SELNGPROFIT = dataRow["SALE_PROFIT"];				
			
			//생성년도로 년월을 수정한다.
			//var MY_YYYYMM2 = $("#CREAT_YYYYMM").val() + MY_YYYYMM.substring(4,6); 
			var MY_GOAL_AMT = Math.floor((P_SELNGAM/100) * MY_P_SELNGAM + MY_P_SELNGAM);
			var MY_SALE_PROFIT = Math.floor((P_SELNGPROFIT/100) * MY_SELNGPROFIT + MY_SELNGPROFIT);						
			
			gridRoot4.setItemFieldAt($("#CREAT_YYYYMM").val().replace("-",""), i, "YYYYMM");
			gridRoot4.setItemFieldAt(MY_GOAL_AMT, i, "GOAL_AMT");
			gridRoot4.setItemFieldAt(MY_SALE_PROFIT, i, "SALE_PROFIT");				
		};			
					
		//gridRoot4.setItemFieldAt(7, 0, "SALE_PROFIT");
	}
	//아래 이벤트가 먹질 않아서 강제로 함수 호출
	//gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4);
	//gridRoot4.addEventListener("dataComplete", dataCompleteHandler4);
	layoutCompleteHandler4();
	dataCompleteHandler4();		
}

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//$("#gridHolder2").height($(window).height());
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	getStoreCode2("P_STR_CODE");
	
	//초기 팝업 사이즈 조절
	$(function() {
		$("#pop_wrap").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 900,
		    resizable : false,
		    position : "center"
		});
		
	});
	
	//$(".pop_tit2").width(409);
	$("#pop_cnt .sec_grid, .pop_tit2").width(409);
	
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
		//상품 분류별 목표 내용 삭제 
		gridApp2.setData(null);
		gridData1ClickStrCode = "";
	});
	//확정
	$("#btn_save").click(function(){		
		if(gridData1ClickStrCode == ""){
			alert(msgStorNmSelected);//점포명을 선택해주세요
		}else{
			var contest = confirm(msgDcsnConfirm);//선택항목을 확정 하시겠습니까?
			if(contest == true){
				getGridData6();	
			}
		}
	});	
	//삭제
	$("#btn_del").click(function(){		
		if(gridData1ClickStrCode == ""){
			alert(msgStorNmSelected);//점포명을 선택해주세요
		}else{
			/*var contest = confirm(msgDeleteConfirm);//선택항목을 삭제 하시겠습니까?
			if(contest == true){
				//확정여부 검사 해서 확정이 아닌경우
				if(getGridData8(gridData1ClickStrCode,$("#P_YYYY").val()) == "N"){
					//삭제한다
					getGridData7();	
				}else{
					alert(msgDeleteNo);//삭제 할수 없습니다
				}	
			}*/
			if(getGridData8(gridData1ClickStrCode,$("#P_YYYY").val()) == "N"){
				var contest = confirm(msgDeleteConfirm);//선택항목을 삭제 하시겠습니까?
				if(contest == true){
					//삭제한다
					getGridData7();	
				}	
			}else{
				alert(msgDeleteNo);//삭제 할수 없습니다
			}	
		}
	});	
	
	//신규
	$("#btn_new").click(function(){
		$("#pop_wrap").dialog("open");	
		
		gridApp3.setData(null);
		gridApp4.setData(null);
	});
	
	//팝업 에서 조회
	$("#btn_pop_search").click(function(){
		if($("#pop_frm select[id='P_STR_CODE']").val() == ""){
			alert(storNm+" "+promMessg00);
			return;
		}		
		if($("#pop_frm input[id='P_YYYYMM']").val() == ""){
			alert(referYearMonth+" "+promMessg00);
			return;
		}
		getGridData3(); 
		
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
		
		gridApp4.setData(null);
	});	
	
	$("#btn_right").click(function(){
		if($("#CREAT_YYYYMM").val() == ""){
			alert(createDate+" "+promMessg00);
			return;
		}		
		fn_btn_right();
	});		
	   
	$("#btn_left").click(function(){
		//선택행 삭제
		gridRoot4.removeSelectorColumnSelectedIndices("selector");
		//alert(document.pop_frm.P_STR_CODE.value);
		//alert($('#P_STR_CODE option:selected').val());
		//alert();			
		
	    var selectorColumn = gridRoot3.getObjectById("selector");
	    selectorColumn.setAllItemSelected(!selectorColumn.getAllItemSelected());
	});		
	
	//매출목표관리 팝업 저장
	$("#btn_pop_save").click(function(){
		//점포명과 년도로 이미 저장된 데이터가 있는지 확인
		//var dataYn = getGridData5($("#pop_frm select[id='P_STR_CODE']").val(),$("#CREAT_YYYYMM").val());
		//점포명과 생성년도로 확정되있는지 확인		
		var dataYn = getGridData8($("#pop_frm select[id='P_STR_CODE']").val(),$("#CREAT_YYYYMM").val().substr(0,4));
		var gridRoot4Length = gridRoot4.getCollection().getSource().length;
		//alert(gridRoot4Length);
		var arrPostData = new Array();
		var idx = 0;
		var alertMsg = "";

		
		if($("#pop_frm select[id='P_STR_CODE']").val() == ""){
			alert(msgStorNmSelected);//점포명을 선택 해주세요	
			return false;
		}else if(dataYn != "N"){
			alert(msgDcsnSaveNo);//확정처리된 데이터는 저장할수 없습니다	
			return false;
		}else if(gridRoot4Length == 0){
			alert(msgCreateDataNo);//생성할 데이터가 없습니다
			return false;
		}else{
			var contest = confirm(msgSaveConfirm);//저장하시겠습니까
			if(contest == true){
				for (var i = 0; i < gridRoot4Length; i++) {
					//valitaion 체크	(숫자만)
					if(isNaN(Number(gridRoot4.getItemFieldAt(i,"YYYYMM")))){
						alertMsg = alertMsg + (i+1)+"_"+yymt+" "+mentWmsIn2 + "\n";
					}
					if(isNaN(Number(gridRoot4.getItemFieldAt(i,"MID_CODE")))){
						alertMsg = alertMsg + (i+1)+"_"+goodsClMiddl+" "+mentWmsIn2 + "\n";
					}
					if(isNaN(Number(gridRoot4.getItemFieldAt(i,"GOAL_AMT")))){
						alertMsg = alertMsg + (i+1)+"_"+selngAm+" "+mentWmsIn2 + "\n";
					}
					if(isNaN(Number(gridRoot4.getItemFieldAt(i,"SALE_PROFIT")))){
						alertMsg = alertMsg + (i+1)+"_"+selngProfit+" "+mentWmsIn2 + "\n";
					}				
					
					gridRoot4.setItemFieldAt($("#s_corp_code").val(), i, "CORP_CODE");		//기업코드
					gridRoot4.setItemFieldAt($("#pop_frm select[id='P_STR_CODE']").val(), i, "STR_CODE");		//점포코드
					gridRoot4.setItemFieldAt("N", i, "CFM_YN");			//인증여부
					gridRoot4.setItemFieldAt($("#s_id").val(), i, "IEMP_NO");			//등록사원번호

					var rowData = gridRoot4.getCollection().getSource()[i];			
					arrPostData[i] = rowData;
					idx ++;
				};

				if(alertMsg != ""){
					alert(alertMsg);
					return false;
				}else{
					arrPostData = JSON.stringify(arrPostData);
					var postData = arrPostData;
					getGridData4(postData);
				}
			}				
		}
	});		
	
	//팝업의 점포명을 변경하면 팝업의 그리드 내용을 초기화
	$("#pop_frm select[id='P_STR_CODE']").change(function(){
		//var tg = $("#pop_frm select[='P_STR_CODE']");
		//alert($(tg+'option:selected').val());
		//alert($("#pop_frm select[id='P_STR_CODE']").val());
		
		gridApp3.setData(null);
		gridApp4.setData(null);
	});
	
	$("#CREAT_YYYYMM").click(function(){
		gridApp4.setData(null);
	});
	
	$("#btn_pop_down").click(function(){
		excelExport();
	});
	$("#btn_pop_upload").click(function(){
		excelImport();
	});
	$("#btn_pop_upload_sample").click(function(){
		location.href="/resources/js/page/salesinfo/goal/salesInfoGoal.zip";
	});
	
	//점포명 selectbox
	$("#P_STR_CODE").change(function(){
		gridApp1.setData(null);
		gridApp2.setData(null);
	});
	
	//조회년도 selectbox
	$("#P_YYYY").change(function(){
		gridApp1.setData(null);
		gridApp2.setData(null);
	});
	
	$("#btn_excel_down").click(function(){
		excelExport2();
	});

});




