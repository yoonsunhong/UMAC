/********************************************************
 * 설명:  홈
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.05.31
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

var totalCnt;	// 전체건수
var RowsPerPage = 10;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

function gridMovePage(page) {
	$("#pageIndex").val(page);
	pageIndex = page;
	getGridData9();
}

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
	getGridData();
}

function dataCompleteHandler1(event) {	
	dataGrid1.expandAll();	
}


///////////공지사항////////////
function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid2);
	getGridData9();
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler2(event) {	
	//더블클릭 이벤트는 setDoubleClickEnabled 사용후 해야 적용됨
	dataGrid2.setDoubleClickEnabled(true);
	dataGrid2.addEventListener("itemDoubleClick", itemClickHandler2);
	//그리드1 헤더 클릭 이벤트
	dataGrid2.addEventListener("headerRelease", headerRelease2);	


}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler2(event){	
	var rowIndex = event.rowIndex;
	dataRow2 = gridRoot2.getItemAt(rowIndex);
	
	//신규팝업 초기화
	$("#D_PRIORITY").val("");
	$("#D_TITLE").val("");
	$("#D_OPEN_DT").val("");
	$("#D_END_DT").val("");
	$("#D_CONTENTS").val("");
	$("#D_UPFILE").val("");
	
	//내부에서 작성한건지 외부에서 작성한건지 확인 1내부 2외부
	//if(dataRow1["REGI_CHNL"] == "1"){		
	$("#pop_wrap1").dialog("open");	

	$("#D_PRIORITY").val(dataRow2["PRIORITY"]=="1"?"일반":"중요");
	$("#D_TITLE").val(dataRow2["TITLE"]);
	$("#D_OPEN_DT").val(dateConvert(dataRow2["OPEN_DT"]));
	$("#D_END_DT").val(dateConvert(dataRow2["END_DT"]));
	$("#D_CONTENTS").val(dataRow2["CONTENTS"]);
	$("#D_SEQ").val(dataRow2["SEQ"]);
	$("#D_UPFILE").val("");
	$("#fn").html("");
	
	
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+jari(month)+""+jari(day);

	//팝업버튼 
	if(date <= dataRow2["END_DT"]){
		$("#btn_pop_update").show();
		$("#btn_pop_delete").show();
	}else{
		$("#btn_pop_update").hide();
		$("#btn_pop_delete").hide();
	}
	$("#btn_pop_save").hide();
	
	//첨부파일명 
	//$("#fn").show();
	/*alert(dataRow1["FILE_NAME"]);
	alert(dataRow1["FILE_NAME1"]);
	alert(dataRow1["FILE_SIZE"]);*/
	
	//저장된 첨부파일명 보이게
	var FILE_NAME = dataRow2["FILE_NAME"];
	if(FILE_NAME != "" && FILE_NAME != undefined && FILE_NAME != null){
		FILE_NAME = "<a href='javascript:file_download()'>"+FILE_NAME+"</a>";
		var txt = "<br/>"+FILE_NAME + "(" + dataRow2["FILE_SIZE"] + "kb)";		
		$("#fn").html(txt);	
	}	
	//}

}

//그리드 헤더 정렬 기능 이벤트
function headerRelease2(event) {	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid2, event, "P_COLUMN_NAME", "P_ORDERBY");	
	getGridData();
}

//20160101 -> 2016-01-01
function dateConvert(num1){
	var year = num1.substr(0,4);
	var month = num1.substr(4,2);
	var day = num1.substr(6,2);
	
	return year +"-"+ month +"-"+ day;
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
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true">\
			<columns>\
				<DataGridColumn dataField="SEQ" 		headerText="'+noticeNumber+'" 	textAlign="center"	width="80" sortable="false"/>\
				<DataGridColumn dataField="PRIORITY_NM" headerText="'+se+'"   			textAlign="center" 	width="100"	/>\
				<DataGridColumn dataField="TITLE" 	 	headerText="'+title+'"  		textAlign="left" 	width="500"/>\
				<DataGridColumn dataField="OPEN_DT" 	headerText="'+startDay+'"    	textAlign="center" formatter="{datefmt}"/>\
				<DataGridColumn dataField="END_DT"   	headerText="'+stopDay+'" 		textAlign="center" formatter="{datefmt}"/>\
				<DataGridColumn dataField="IDATE"   	headerText="'+inputDate+'" 		textAlign="center" formatter="{datefmt}"/>\
				<DataGridColumn dataField="USER_NM"   	headerText="'+inputName+'" 		textAlign="center" />\
				<DataGridColumn dataField="CONTENTS"     	visible = "false" />\
				<DataGridColumn dataField="FILE_NAME"     	visible = "false" />\
				<DataGridColumn dataField="FILE_NAME1"     	visible = "false" />\
				<DataGridColumn dataField="FILE_SIZE"     	visible = "false" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData() {	
	var params = $("#frm").serializeArray();
	
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
	    	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	gridRoot1.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function getGridData9() {	
	var params = $("#frm2").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/businessNoticeInputList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
	    beforeSend : function(){ 	    	
            gridRoot2.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			//alert(data);
			//gridApp1.setData(data);
			gridApp2.setData(data.list);
			totalCnt = data.totalCount;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
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

function jari(num1){
	if((num1+"").length < 2){
		return "0"+num1;
	}else{
		return num1;
	}
}

function file_download(){
	$("#P_SEQ").val($("#D_SEQ").val());
	var frm = $("#fileForm")[0];	
	frm.action = "/businessNoticeInputFileDownload.do";
	frm.method = "post";
	frm.submit();	
}

$(document).ready(function () {
	//그리드 너비 제어
	$("#gridHolder1, #gridHolder2").width("100%");
	
	var hei = ($(window).height() - 160) / 5;
	
	$("#gridHolder1").height(hei*2.5);
	$("#gridHolder2").height(hei*2.5);	

	$(window).on('resize',function (){	
		
		var hei = ($(window).height() - 180) / 5;
		
		$("#gridHolder1").height(hei*2.5);
		$("#gridHolder2").height(hei*2.5);	
		
	});	
	
	$(function() {
		$("#pop_wrap1").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 900,
		    resizable : false,
		    position : "center"
		});	
	});
	
	$(".datepicker1").datepicker();
	$(".datepicker2").datepicker();
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().before(1, 0, 0).getDate("yyyy-mm-dd"); // 일년전 before(년,월,일)
	$("#P_OPEN_DT").val(beforeDate);
		
	//조회
	$("#btn_search").click(function(){
		getGridData();
		//상품 분류별 목표 내용 삭제 
	});	

	$("#btn_search2").click(function(){
		// 헤드 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid2, "P_COLUMN_NAME", "P_ORDERBY");
		gridMovePage("1");	
	});	

});



