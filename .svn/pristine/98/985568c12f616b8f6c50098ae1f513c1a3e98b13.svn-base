/********************************************************
 * 설명:  best/worst 20선
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
//var gridApp2, gridRoot2, dataGrid2, dataRow2;

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
		//gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
			<DataGrid id="dg1" sortableColumns="true">\
				<columns>\
					<DataGridColumn dataField="RN" 				headerText="'+rank+'" 			width="70" 		textAlign="center"/>\
					<DataGridColumn dataField="ITM_CODE"   		headerText="'+itmCode+'"    	width="150"		textAlign="center" />\
					<DataGridColumn dataField="SCAN_CODE"   	headerText="'+scanCode+'"    	width="150"		textAlign="center" />\
					<DataGridColumn dataField="ITM_SHORT_NAME" 	headerText="'+itmName+'"  		textAlign="left" />\
					<DataGridColumn dataField="SQ" 	 			headerText="'+saleQy+'"  		width="100"	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="QTY_COUNT" 	 	headerText="'+cmpntrt+'"  		width="100"	textAlign="right" />\
					<DataGridColumn dataField="SA" 	 			headerText="'+cellSPRC+'"  		width="100"	textAlign="right"  formatter="{numfmt}"/>\
					<DataGridColumn dataField="AMT_COUNT" 	 	headerText="'+cmpntrt+'"  		width="100"	textAlign="right" />\
					<DataGridColumn dataField="CT" 	 			headerText="'+cstmrCnt+'"  		width="100"	textAlign="right" formatter="{numfmt}"/>\
					<DataGridColumn dataField="CLS_NAME" 	 	headerText="'+goodsClSmall+'" 	width="100"	textAlign="center" />\
				</columns>\
			</DataGrid>\
	</rMateGrid>';



//목록 그리드 조회
function getGridData() {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR 	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt 			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt 			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff 		= ((endDt.getTime() - strDt.getTime()) / 1000 / 60 / 60 / 24) + 1;

	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//유효성검사
	if(dateDiff > 60) {
		alert("조회일자 간 60일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return false;
	}
	
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesAnalReportWorstList.do",
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
			gridApp1.setData(data.list1);
			
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
//업태구분
function uptaeFunction(){
	var uptaeFlagCode = $('#P_UPTAE_FLAG' ).val();
	updateStrCodeSelectBox("P_STR_CODE",uptaeFlagCode);
	
}
function strCodeFunction(){
	
}

function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportFileName = bestWorst20Sttus+date+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	getCommonCodeSelectBoxList2("P_UPTAE_FLAG","UPTAE_FLAG","S");
	//updateStrCodeSelectBox("");
	
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
	
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	getCateCodeSelectBoxList("P_MID_CODE"   , "2" ,  ""   );    // 중 분류
	getCateCodeSelectBoxList("P_CLS_CODE"   , "3" ,  ""   );    // 소 분류
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 135 );
	
	$(window).on('resize',function (){			
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 135 );		
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















