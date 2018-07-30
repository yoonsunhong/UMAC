/********************************************************
 * 설명:  점간대출등록
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2017.05.03
 * version : 1.0
 ********************************************************/

var selectedIndex = -1;
var gridRoot2Flag = "add";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();
if(dd < 10) {
    dd = '0' + dd;
} 
if(mm<10) {
    mm = '0' + mm;
}

$(document).ready(function(){
	
	init();
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var P_DOUT_STR_DT =new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var P_DOUT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#top_search input[name=P_DOUT_STR_DT]').val(P_DOUT_STR_DT);
	$('#top_search input[name=P_DOUT_END_DT]').val(P_DOUT_END_DT);
	
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : "95%",
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	//달력설정
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var startDate = parseInt($("#top_search input[name=P_DOUT_STR_DT]").val().replace(/-/g, ""));
			var endDate = parseInt($("#top_search input[name=P_DOUT_END_DT]").val().replace(/-/g, ""));
			if(startDate > endDate)
			{
				alert(msgDateValidation);
				
				if(this.id == "P_DOUT_STR_DT")
					$("#top_search input[name=P_DOUT_STR_DT]").val(P_DOUT_STR_DT);
				else if(this.id == "P_DOUT_END_DT")
					$("#top_search input[name=P_DOUT_END_DT]").val(P_DOUT_END_DT);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
	// 점포명 체인지 이벤트
	$("#top_search select[name=P_STR_CODE]").change(function(){
		getPosList();
	});

});

//----------------------- 그리드 설정 시작 -------------------------------------
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "200px");
rMateGridH5.create("grid2", "gridHolder2", jsVars1, "100%", "200px");
rMateGridH5.create("grid3", "gridHolder3", jsVars1, "100%", "200px");
rMateGridH5.create("grid4", "gridHolder4", jsVars1, "100%", "200px");
rMateGridH5.create("grid5", "gridHolder5", jsVars1, "100%", "200px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridApp2, gridRoot2, dataGrid2, dataRow2;
var gridApp3, gridRoot3, dataGrid3, dataRow3;
var gridApp4, gridRoot4, dataGrid4, dataRow4;
var gridApp5, gridRoot5, dataGrid5, dataRow5;
var collection; // 그리드의 데이터 객체
var gridData1 = [];
var gridData2 = [];
var gridData3 = [];
var gridData4 = [];
var gridData5 = [];

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	// rMateGrid 관련 객체
	if(id == "grid1"){
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
	
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		gridApp1.setData(gridData1);
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}else if(id == "grid2"){
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
	
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp2.setLayout(layoutStr2);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		gridApp2.setData(gridData2);
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}else if(id == "grid3"){
		gridApp3 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot3 = gridApp3.getRoot(); // 데이터와 그리드를 포함하는 객체
	
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp3.setLayout(layoutStr3);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		gridApp3.setData(gridData3);
		
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
	}else if(id == "grid4"){
		gridApp4 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot4 = gridApp4.getRoot(); // 데이터와 그리드를 포함하는 객체
	
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp4.setLayout(layoutStr4);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		gridApp4.setData(gridData4);
		
		gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4);
		gridRoot4.addEventListener("dataComplete", dataCompleteHandler4);
	}else if(id == "grid5"){
		gridApp5 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot5 = gridApp5.getRoot(); // 데이터와 그리드를 포함하는 객체
	
		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp5.setLayout(layoutStr5);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		gridApp5.setData(gridData5);
		
		gridRoot5.addEventListener("layoutComplete", layoutCompleteHandler5);
		gridRoot5.addEventListener("dataComplete", dataCompleteHandler5);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}
function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}
function layoutCompleteHandler3() {
	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
}
function layoutCompleteHandler4() {
	dataGrid4 = gridRoot4.getDataGrid();  // 그리드 객체
}
function layoutCompleteHandler5() {
	dataGrid5 = gridRoot5.getDataGrid();  // 그리드 객체
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	//collection = gridRoot1.getCollection();
	
	// 그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	//collection = gridRoot1.getCollection();
	
	// 그리드2 셀선택 이벤트
	dataGrid2.addEventListener("itemClick", itemClickHandler2);
	
}

//그리드3 컴플릿트 핸들러
function dataCompleteHandler3(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	//collection = gridRoot1.getCollection();
	
	// 그리드3 셀선택 이벤트
	dataGrid3.addEventListener("itemClick", itemClickHandler3);
	
}

//그리드4 컴플릿트 핸들러
function dataCompleteHandler4(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	//collection = gridRoot1.getCollection();
	
	// 그리드4 셀선택 이벤트
	dataGrid4.addEventListener("itemClick", itemClickHandler4);
	
}

//그리드5 컴플릿트 핸들러
function dataCompleteHandler5(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	//collection = gridRoot1.getCollection();
	
	// 그리드5 셀선택 이벤트
	dataGrid5.addEventListener("itemClick", itemClickHandler5);
	
}
//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	
}

//그리드2 ROW 원클릭 이벤트
function itemClickHandler2(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow2 = gridRoot2.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid2.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData2 = dataRow2[dataField];
	
}

//그리드3 ROW 원클릭 이벤트
function itemClickHandler3(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow3 = gridRoot3.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid3.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData3 = dataRow3[dataField];
	
}

//그리드4 ROW 원클릭 이벤트
function itemClickHandler4(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow4 = gridRoot4.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid4.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData4 = dataRow4[dataField];
	
}

//그리드5 ROW 원클릭 이벤트
function itemClickHandler5(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow5 = gridRoot5.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid5.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData5 = dataRow5[dataField];
	
}

//----------------------- 그리드 설정 끝 -----------------------


//<DataGrid id="dg1" sortableColumns="true" editable="true" itemEditBeginningJsFunction="itemFunc2" selectionMode="multipleRows">\
//그리드1 헤더 설정
// ----------------------- 그리드 설정 끝 -------------------------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" verticalAlign="middle" sortableColumns="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" />\
				<DataGridColumn dataField="DOUT_WAMT"  headerText="'+loanPrmpc+'" textAlign="right" formatter="{numfmt}"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData1}">\
					<mergingFields>\
						<SpanMergingField name="STR_NAME"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" verticalAlign="middle" sortableColumns="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" />\
				<DataGridColumn dataField="DIN_WAMT" headerText="'+dePrmpc+'" textAlign="right" formatter="{numfmt}"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData2}">\
					<mergingFields>\
						<SpanMergingField name="STR_NAME"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" verticalAlign="middle" sortableColumns="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" />\
				<DataGridColumn dataField="DOUT_WAMT"  headerText="'+loanPrmpc+'" textAlign="right" formatter="{numfmt}"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData3}">\
					<mergingFields>\
						<SpanMergingField name="STR_NAME"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr4 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" verticalAlign="middle" sortableColumns="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" />\
				<DataGridColumn dataField="DIN_WAMT" headerText="'+dePrmpc+'" textAlign="right" formatter="{numfmt}"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData4}">\
					<mergingFields>\
						<SpanMergingField name="STR_NAME"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr5 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" verticalAlign="middle" sortableColumns="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" />\
				<DataGridColumn dataField="DOUT_WPRC" headerText="'+dePrmpc+'" textAlign="right" formatter="{numfmt}"/>\
				<DataGridColumn dataField="DIN_WPRC" headerText="'+dePrmpc+'" textAlign="right" formatter="{numfmt}"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData5}">\
					<mergingFields>\
						<SpanMergingField name="STR_NAME"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

//목록 그리드 조회
function getGridData() {
	
	if($("#P_DOUT_STR_DT").val() == null || $("#P_DOUT_STR_DT").val() == "")
	{
		alert("매출일자" + msgConfirm);
		$("#P_DOUT_STR_DT").focus();
		return;
	}
	
	if($("#P_DOUT_END_DT").val() == null || $("#P_DOUT_END_DT").val() == "")
	{
		alert("매출일자" + msgConfirm);
		$("#P_DOUT_END_DT").focus();
		return;
	}
	
	var sDt = $("#P_DOUT_STR_DT").val().replace(/-/g, "");
	var eDt = $("#P_DOUT_END_DT").val().replace(/-/g, "");
	if(sDt > eDt)
	{
		alert(msgDateValidation);
		$("#S_SALE_DT_E").focus();
		return;
	}
	
	//var param = $("#frm").serializeArray();
	var param = $("#frm").serializeAllObject();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/inoutcenterSumMng_check.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid1.setEnabled(false);
			gridRoot1.addLoadingBar();
			
			dataGrid2.setEnabled(false);
			gridRoot2.addLoadingBar();
			
			dataGrid3.setEnabled(false);
			gridRoot3.addLoadingBar();
			
			dataGrid4.setEnabled(false);
			gridRoot4.addLoadingBar();
			
			dataGrid5.setEnabled(false);
			gridRoot5.addLoadingBar();
		},
		success:function(data){
			gridData = data.list1;
			gridApp1.setData(gridData);
			
			gridData = data.list2;
			gridApp2.setData(gridData);
			
			gridData = data.list3;
			gridApp3.setData(gridData);
			
			gridData = data.list4;
			gridApp4.setData(gridData);
			
			gridData = data.list5;
			gridApp5.setData(gridData);
			
			//console.log(JSON.stringify(data.list5));
	    },
	    complete : function(data) {
	    	dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
			
			dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
			
			dataGrid3.setEnabled(true);
			gridRoot3.removeLoadingBar();
			
			dataGrid4.setEnabled(true);
			gridRoot4.removeLoadingBar();
			
			dataGrid5.setEnabled(true);
			gridRoot5.removeLoadingBar();
			
			console.log("data : " + JSON.stringify(data.list5));
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
			
			dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
			
			dataGrid3.setEnabled(true);
			gridRoot3.removeLoadingBar();
			
			dataGrid4.setEnabled(true);
			gridRoot4.removeLoadingBar();
			
			dataGrid5.setEnabled(true);
			gridRoot5.removeLoadingBar();
	    }
	});
}


function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}


function init() {
	$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ select +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
	$("#top_search select[name=P_STR_CODE]").val($("#SESSION_STR_CODE").val());
	
	$("#top_search select[name=P_DIN_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_DIN_STR_CODE]");
	
	$("#DIN_STR_CODE").append('<option value="">'+ select +'</option>');
	getStoreCode("DIN_STR_CODE");
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData();
	});
	
	$(".lft_wid").width($(window).width()-880);
	$(".rgt_wid").width(780);	
	/*$("#gridHolder1").height($(window).height()-500);
	$("#gridHolder3").height($(window).height()-105);	*/
	$(window).on('resize',function (){		
		$(".lft_wid").width($(window).width()-880);
	});
	
	
	
	
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################



//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################

//출력
function btn_print(){
	
	
	
	var P_CORP_CODE =$("#CORP_CODE").val();
	var P_STR_CODE =$("#P_STR_CODE").val();
	var P_DIN_STR_CODE =$("#P_DIN_STR_CODE").val();
	var P_DOUT_STR_DT =$("#P_DOUT_STR_DT").val().replace(/-/gi,"");;
	var P_DOUT_END_DT =$("#P_DOUT_END_DT").val().replace(/-/gi,"");;
	var P_CFM_YN =$("#P_CFM_YN").val();
	
	if(P_STR_CODE == null || P_STR_CODE == ""){
		alert("대출점포를 선택 해 주세요.");
		return;
	}
	
	var params = "?reportMode=HTML"	+
						"&P_CORP_CODE="		+P_CORP_CODE+
						"&P_STR_CODE="		+P_STR_CODE+
						"&P_DIN_STR_CODE="		+P_DIN_STR_CODE+
						"&P_DOUT_STR_DT="		+P_DOUT_STR_DT+
						"&P_DOUT_END_DT="		+P_DOUT_END_DT+
						"&P_CFM_YN="		+P_CFM_YN;
	window.open("/aireportInoutSumPrint.do"+ params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
}
//출력
function btn_print2(){
	
	
	
	var P_CORP_CODE =$("#CORP_CODE").val();
	var P_STR_CODE =$("#P_STR_CODE").val();
	var P_DIN_STR_CODE =$("#P_DIN_STR_CODE").val();
	var P_DOUT_STR_DT =$("#P_DOUT_STR_DT").val().replace(/-/gi,"");;
	var P_DOUT_END_DT =$("#P_DOUT_END_DT").val().replace(/-/gi,"");;
	var P_CFM_YN =$("#P_CFM_YN").val();
	
	if(P_STR_CODE == null || P_STR_CODE == ""){
		alert("대출점포를 선택 해 주세요.");
		return;
	}
	
	
	var params = "?reportMode=HTML"	+
	"&P_CORP_CODE="		+P_CORP_CODE+
	"&P_STR_CODE="		+P_STR_CODE+
	"&P_DIN_STR_CODE="		+P_DIN_STR_CODE+
	"&P_DOUT_STR_DT="		+P_DOUT_STR_DT+
	"&P_DOUT_END_DT="		+P_DOUT_END_DT+
	"&P_CFM_YN="		+P_CFM_YN;
	window.open("/aireportInoutSumStorePrint.do"+ params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
}



/* 추가 js */
//그리드 너비 제어

