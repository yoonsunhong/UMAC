/********************************************************
 * 설명:  기간별매출실적
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * 2017-09-14		윤태희		하단그리드 구성비 100%로 표시.
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

var TYPE1_SALE_AMT_STR_TOTAL = "";
var TYPE2_SALE_AMT_STR_TOTAL = "";
var TYPE3_SALE_AMT_STR_TOTAL = ""; //하단 그리드 매출액 셋팅. 상당그리드 클릭시마다 변동되어짐.
var TYPE4_SALE_AMT_STR_TOTAL = ""; //하단 그리드 대비매출액 셋팅. 상당그리드 클릭시마다 변동되어짐.

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
	//dataGrid2.expandAll();
	dataGrid2.expandLevel(1);
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	console.log(dataRow1);
	if(dataRow1["STR_CODE"] != undefined && dataRow1["P_STR_DT_TYPE1"] != undefined && dataRow1["P_STR_DT_TYPE2"] != undefined && dataRow1["P_END_DT_TYPE1"] != undefined && dataRow1["P_END_DT_TYPE2"] != undefined){
		getGridData2(dataRow1["STR_CODE"],dataRow1["P_STR_DT_TYPE1"],dataRow1["P_STR_DT_TYPE2"],dataRow1["P_END_DT_TYPE1"],dataRow1["P_END_DT_TYPE2"],dataRow1["TYPE1_SALE_AMT_TOTAL"],dataRow1["TYPE2_SALE_AMT_TOTAL"]);
	};
}
//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="1" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" width="150" />\
				<DataGridColumnGroup headerText="'+selngDate+'">\
					<DataGridColumn headerText="'+selngAm+'"    	dataField="TYPE1_SALE_AMT_TOTAL"   	textAlign="right" formatter="{numfmt}"	/>\
					<DataGridColumn headerText="'+cstmrCnt+'"  		dataField="TYPE1_CT" 	 			textAlign="right" formatter="{numfmt}"	width="70"/>\
					<DataGridColumn headerText="'+unitPrice+'"  	labelJsFunction="perFunction1_1"	textAlign="right"  						/>\
					<DataGridColumn headerText="'+cmpntrt+'"  		labelJsFunction="perFunction1_2"	textAlign="right" 	 					width="80"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+provisDate+'">\
					<DataGridColumn headerText="'+selngAm+'"  		dataField="TYPE2_SALE_AMT_TOTAL" 	textAlign="right" backgroundColor="#e6ffe6"	formatter="{numfmt}"	/>\
					<DataGridColumn headerText="'+cstmrCnt+'"  		dataField="TYPE2_CT" 	 			textAlign="right" backgroundColor="#e6ffe6"	formatter="{numfmt}"	width="70"/>\
					<DataGridColumn headerText="'+unitPrice+'"  	labelJsFunction="perFunction1_1_2"	textAlign="right" backgroundColor="#e6ffe6" />\
					<DataGridColumn headerText="'+cmpntrt+'"  		labelJsFunction="perFunction1_2_2"	textAlign="right" backgroundColor="#e6ffe6" width="80"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+provisResult+'">\
					<DataGridColumn headerText="'+selngIrDsAmount+'"  	dataField="TYPE1_2_SALE_AMT_TOTAL" 	textAlign="right" backgroundColor="#ffffcc"	formatter="{numfmt}" 	/>\
					<DataGridColumn headerText="'+irDsPer+'(%)"  		styleJsFunction="styleFunction2"	textAlign="right" backgroundColor="#ffffcc" labelJsFunction="perFunction1_3"	width="80"/>\
					<DataGridColumn headerText="'+unitIrDs+'"  			dataField="TYPE1_2_CT" 	 			textAlign="right" backgroundColor="#ffffcc"	formatter="{numfmt}"	width="80"/>\
					<DataGridColumn headerText="'+irDsPer+'(%)"  		styleJsFunction="styleFunction2"	textAlign="right" backgroundColor="#ffffcc"	labelJsFunction="perFunction1_4"	width="80"/>\
				</DataGridColumnGroup>\
			</groupedColumns>\
			<dataProvider>\
			<GroupingCollection  source="{$gridData}">\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="TYPE1_SALE_AMT_TOTAL"			summaryOperation="SUM" 		label="TYPE1_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE1_CT"						summaryOperation="SUM" 		label="TYPE1_CT" 				/>\
								<SummaryField dataField="TYPE2_SALE_AMT_TOTAL"			summaryOperation="SUM" 		label="TYPE2_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE2_CT"						summaryOperation="SUM" 		label="TYPE2_CT" 				/>\
								<SummaryField dataField="TYPE1_2_SALE_AMT_TOTAL"		summaryOperation="SUM" 		label="TYPE1_2_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE1_2_CT"					summaryOperation="SUM" 		label="TYPE1_2_CT" 				/>\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="CD_SHORT_NM">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="TYPE1_SALE_AMT_TOTAL"			summaryOperation="SUM" 		label="TYPE1_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE1_CT"						summaryOperation="SUM" 		label="TYPE1_CT" 				/>\
								<SummaryField dataField="TYPE2_SALE_AMT_TOTAL"			summaryOperation="SUM" 		label="TYPE2_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE2_CT"						summaryOperation="SUM" 		label="TYPE2_CT" 				/>\
								<SummaryField dataField="TYPE1_2_SALE_AMT_TOTAL"		summaryOperation="SUM" 		label="TYPE1_2_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE1_2_CT"					summaryOperation="SUM" 		label="TYPE1_2_CT" 				/>\
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
		<DataGrid id="dg1" sortableColumns="true" lockedColumnCount="1" >\
			<groupedColumns>\
				<DataGridColumn dataField="MID_NAME" headerText="'+goodsCl+'" width="150" />\
				<DataGridColumnGroup headerText="'+selngDate+'">\
					<DataGridColumn headerText="'+selngAm+'"	dataField="TYPE1_SALE_AMT_TOTAL"   		textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+cstmrCnt+'"  	dataField="TYPE1_CT" 	 				textAlign="right" formatter="{numfmt}"	width="70"/>\
					<DataGridColumn headerText="'+unitPrice+'"  labelJsFunction="perFunction1_1"		textAlign="right" />\
					<DataGridColumn headerText="'+cmpntrt+'"  	labelJsFunction="perFunction1_2_detail"	textAlign="right" width="80"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+provisDate+'">\
					<DataGridColumn headerText="'+selngAm+'"  	dataField="TYPE2_SALE_AMT_TOTAL" 			textAlign="right" 	backgroundColor="#e6ffe6"	formatter="{numfmt}"/>\
					<DataGridColumn headerText="'+cstmrCnt+'"	dataField="TYPE2_CT" 	 			  		textAlign="right"	backgroundColor="#e6ffe6"	formatter="{numfmt}"	width="70"/>\
					<DataGridColumn headerText="'+unitPrice+'"  labelJsFunction="perFunction1_1_2"			textAlign="right" 	backgroundColor="#e6ffe6"	/>\
					<DataGridColumn headerText="'+cmpntrt+'"  	labelJsFunction="perFunction1_2_2_detail"	textAlign="right" 	backgroundColor="#e6ffe6"	width="80"/>\
				</DataGridColumnGroup>\
				<DataGridColumnGroup headerText="'+provisResult+'">\
					<DataGridColumn headerText="'+selngIrDsAmount+'"  	dataField="TYPE1_2_SALE_AMT_TOTAL" 	textAlign="right"	backgroundColor="#ffffcc"	formatter="{numfmt}"	/>\
					<DataGridColumn headerText="'+irDsPer+'(%)"  		labelJsFunction="perFunction1_3"	textAlign="right" 	backgroundColor="#ffffcc"	styleJsFunction="styleFunction2"	width="80"/>\
					<DataGridColumn headerText="'+unitIrDs+'"			dataField="TYPE1_2_CT" 	 			textAlign="right" 	backgroundColor="#ffffcc"	formatter="{numfmt}"	width="80"/>\
					<DataGridColumn headerText="'+irDsPer+'(%)"  		labelJsFunction="perFunction1_4"	textAlign="right" 	backgroundColor="#ffffcc"	styleJsFunction="styleFunction2"	width="80"/>\
				</DataGridColumnGroup>\
			</groupedColumns>\
			<dataProvider>\
			<GroupingCollection  source="{$gridData}"  beforeSorting="false"  >\
				<Grouping>\
					<GroupingField name="TOTAL_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="TYPE1_SALE_AMT_TOTAL"			summaryOperation="SUM" 		label="TYPE1_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE1_CT"						summaryOperation="SUM" 		label="TYPE1_CT" 				/>\
								<SummaryField dataField="TYPE2_SALE_AMT_TOTAL"			summaryOperation="SUM" 		label="TYPE2_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE2_CT"						summaryOperation="SUM" 		label="TYPE2_CT" 				/>\
								<SummaryField dataField="TYPE1_2_SALE_AMT_TOTAL"		summaryOperation="SUM" 		label="TYPE1_2_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE1_2_CT"					summaryOperation="SUM" 		label="TYPE1_2_CT" 				/>\
					        </SummaryRow>\
					    </summaries>\
					</GroupingField>\
					<GroupingField name="LRG_NAME">\
					    <summaries>\
					        <SummaryRow summaryPlacement="group">\
								<SummaryField dataField="TYPE1_SALE_AMT_TOTAL"			summaryOperation="SUM" 		label="TYPE1_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE1_CT"						summaryOperation="SUM" 		label="TYPE1_CT" 				/>\
								<SummaryField dataField="TYPE2_SALE_AMT_TOTAL"			summaryOperation="SUM" 		label="TYPE2_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE2_CT"						summaryOperation="SUM" 		label="TYPE2_CT" 				/>\
								<SummaryField dataField="TYPE1_2_SALE_AMT_TOTAL"		summaryOperation="SUM" 		label="TYPE1_2_SALE_AMT_TOTAL" 	/>\
								<SummaryField dataField="TYPE1_2_CT"					summaryOperation="SUM" 		label="TYPE1_2_CT" 				/>\
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
	var params 				= $("#frm").serializeAllObject();
	var P_STR_DT_TYPE1_ARR 	= $("#P_STR_DT_TYPE1").val().split("-");
	var P_END_DT_TYPE1_ARR 	= $("#P_END_DT_TYPE1").val().split("-");
	var P_STR_DT_TYPE2_ARR 	= $("#P_STR_DT_TYPE2").val().split("-");
	var P_END_DT_TYPE2_ARR 	= $("#P_END_DT_TYPE2").val().split("-");
	var strDt1 				= new Date(P_STR_DT_TYPE1_ARR[0], Number(P_STR_DT_TYPE1_ARR[1])-1, P_STR_DT_TYPE1_ARR[2]); 
	var endDt1 				= new Date(P_END_DT_TYPE1_ARR[0], Number(P_END_DT_TYPE1_ARR[1])-1, P_END_DT_TYPE1_ARR[2]); 
	var strDt2 				= new Date(P_STR_DT_TYPE2_ARR[0], Number(P_STR_DT_TYPE2_ARR[1])-1, P_STR_DT_TYPE2_ARR[2]); 
	var endDt2 				= new Date(P_END_DT_TYPE2_ARR[0], Number(P_END_DT_TYPE2_ARR[1])-1, P_END_DT_TYPE2_ARR[2]); 
	var dateDiff1 			= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	var dateDiff2 			= ((endDt2.getTime() - strDt2.getTime()) / 1000 / 60 / 60 / 24) + 1;
	

	//유효성검사
	if(dateDiff1 > 60) {
		alert("매출일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_STR_DT_TYPE1").focus();
		return false;
	}
	
	if(dateDiff2 > 60) {
		alert("대비일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_STR_DT_TYPE2").focus();
		return false;
	}
	
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesInfoReportTermList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot1.removeAll();
			gridRoot1.addLoadingBar();
    		//상품 분류별 목표 내용 삭제 
    		gridApp2.setData(null);
	    }, 
		success:function(data){
			if(data.length > 0) {
				//그리드1 데이터 조회
				TYPE1_SALE_AMT_STR_TOTAL = data[0].TYPE1_SALE_AMT_STR_TOTAL;	//매출액총합계
				TYPE2_SALE_AMT_STR_TOTAL = data[0].TYPE2_SALE_AMT_STR_TOTAL;	//대비일자 매출액 총합계
			}
				
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
function getGridData2(num1,num2,num3,num4,num5,num6,num7) {	
	jQuery.ajax({ 
		url:"/salesInfoReportTermDetailList.do",
		type:"POST",
		datatype:"json",
		//async:false,
		data: {'P_STR_CODE':num1,'P_STR_DT_TYPE1':num2,'P_STR_DT_TYPE2':num3,'P_END_DT_TYPE1':num4,'P_END_DT_TYPE2':num5},
		beforeSend : function(){ 	    	
            gridRoot2.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			TYPE3_SALE_AMT_STR_TOTAL = num6;
			TYPE4_SALE_AMT_STR_TOTAL = num7;
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

function styleFunction1(item, column) {
	var value = column.getDataField();
	if (item[value] < 0 ){
		return { color:"#FF0000", fontWeight:"bold" };
	}
}
function styleFunction2(item, column) {
	var value = column.getDataField();
	if (item[value] < 100 ){
		return { color:"#FF0000", fontWeight:"bold" };
	}
}

//매출일자객단가
function perFunction1_1(item, value, column){	
	var num1 = (item["TYPE1_SALE_AMT_TOTAL"] / item["TYPE1_CT"]);
	return numFunction(num1);
}
//매출구성비
function perFunction1_2(item, value, column){
	var num1 = (item["TYPE1_SALE_AMT_TOTAL"] / TYPE1_SALE_AMT_STR_TOTAL) * 100;
	return perFunction(num1);    	
}
//매출구성비_디테일
function perFunction1_2_detail(item, value, column){
	var num1 = (item["TYPE1_SALE_AMT_TOTAL"] / TYPE3_SALE_AMT_STR_TOTAL) * 100;
	return perFunction(num1);    	
}
//대비일자객단가
function perFunction1_1_2(item, value, column){
	var num1 = (item["TYPE2_SALE_AMT_TOTAL"] / item["TYPE2_CT"]);
	return numFunction(num1);
}
//대비구성비
function perFunction1_2_2(item, value, column){
	var num1 = (item["TYPE2_SALE_AMT_TOTAL"] / TYPE2_SALE_AMT_STR_TOTAL) * 100;
	return perFunction(num1);    	
}
//대비구성비_디테일
function perFunction1_2_2_detail(item, value, column){
	var num1 = (item["TYPE2_SALE_AMT_TOTAL"] / TYPE4_SALE_AMT_STR_TOTAL) * 100;
	return perFunction(num1);    	
}
//대비결과 매출 신장율
function perFunction1_3(item, value, column){
	var num1 = (item["TYPE1_2_SALE_AMT_TOTAL"] / item["TYPE2_SALE_AMT_TOTAL"]) * 100;
	return perFunction(num1);	
}
//대비결과 객수 신장율
function perFunction1_4(item, value, column){
	var num1 = (item["TYPE1_2_CT"] / item["TYPE2_CT"]) * 100;
	return perFunction(num1);
}

function excelExport(){    
	
	if(   dataRow1["STR_NAME"] == undefined )
	{
		alert('상단 그리드에서 점포명을 선택하시고 [엑셀다운] 버튼을 누르세요.');
		return;
	}
	
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;

	 
	dataGrid1.exportSheetName = selngAcmslt;
    dataGrid2.exportSheetName = goodsClAcmSlt;
    
	dataGrid1.exportFileName = dataRow1["STR_NAME"]+"_"+periodSellingActualResult+"_"+date+".xlsx";
	gridRoot1.excelMultiExportSave([dataGrid2], "/gridExcelDown.do", true);
}

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//getStoreCode("P_STR_CODE");
	
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if(     $("#P_STR_DT_TYPE1").val()  >  $("#P_END_DT_TYPE1").val()     )
			{   alert(msgStartDateAndEndDate);
				$("#P_STR_DT_TYPE1").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
		});
	 
	$(".datepicker2").datepicker({ onSelect: function(dateText) 
	 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_STR_DT_TYPE1").val()  >  $("#P_END_DT_TYPE1").val()     )
			{   alert(msgStartDateAndEndDate);
			$("#P_END_DT_TYPE1").val(CUR_DT);
				return;
			}	 
	 }, 	 showMonthAfterYear:true 
	});	

	$(".datepicker3").datepicker({ onSelect: function(dateText) 
		{ 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
		if(     $("#P_STR_DT_TYPE2").val()  >  $("#P_END_DT_TYPE2").val()     )
		{   alert(msgStartDateAndEndDate);
		$("#P_STR_DT_TYPE2").val(CUR_DT);
		return;
		}	 
		}, 	 showMonthAfterYear:true 
	});
	
	$(".datepicker4").datepicker({ onSelect: function(dateText) 
		{ 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
		if(     $("#P_STR_DT_TYPE2").val()  >  $("#P_END_DT_TYPE2").val()     )
		{   alert(msgStartDateAndEndDate);
		$("#P_END_DT_TYPE2").val(CUR_DT);
		return;
		}	 
		}, 	 showMonthAfterYear:true 
	});	
	
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

	$("#btn_excel_search").click(function(){
		excelExport();
	});	
	
	$('#btn_excel_detail_down').click(function() {
		var nowDate = new CommDateManager().getDate("yyyymmdd");
		dataGrid2.exportFileName = "기간별대비실적(상품분류별실적)"+ nowDate +".xlsx";
		gridRoot2.excelExportSave("/gridExcelDown.do", false);
	});
	
	
});



