/********************************************************
 * 설명:  공지사항
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2016.12.29
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;

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

var totalCnt;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호
//var orderBy = "";
//var columnName = "";
//var collection; // 그리드의 데이터 객체

function gridMovePage(page) {
	$("#pageIndex").val(page);
	pageIndex = page;
	getGridData();
}

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
	}	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {	
	//더블클릭 이벤트는 setDoubleClickEnabled 사용후 해야 적용됨
	dataGrid1.setDoubleClickEnabled(true);
	dataGrid1.addEventListener("itemDoubleClick", itemClickHandler1);
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);	
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	//신규팝업 초기화
	$("#D_PRIORITY").val("");
	$("#D_TITLE").val("");
	$("#D_OPEN_DT").val("");
	$("#D_END_DT").val("");
	$("#D_CONTENTS").val("");
	$("#D_UPFILE").val("");
	$("#D_OPEN_FLAG").val("");
	
	//내부에서 작성한건지 외부에서 작성한건지 확인 1내부 2외부
	//if(dataRow1["REGI_CHNL"] == "1"){		
	$("#pop_wrap1").dialog("open");	
	
	$("#D_PRIORITY").val(dataRow1["PRIORITY"]);
	$("#D_TITLE").val(dataRow1["TITLE"]);
	$("#D_OPEN_DT").val(dateConvert(dataRow1["OPEN_DT"]));
	$("#D_END_DT").val(dateConvert(dataRow1["END_DT"]));
	$("#D_CONTENTS").val(dataRow1["CONTENTS"]);
	$("#D_SEQ").val(dataRow1["SEQ"]);
	$("#D_UPFILE").val("");
	$("#fn").html("");
	$("#D_OPEN_FLAG").val(dataRow1["OPEN_FLAG"]);
	
	
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+jari(month)+""+jari(day);
	//alert(btnSaveFlag);
	//팝업버튼 
	if(date <= dataRow1["END_DT"]){
		$("#btn_pop_update").show();
		$("#btn_pop_delete").show();
		
		if(btnSaveFlag == "Y"){
			$("#btn_pop_update").show();
		}else if(btnSaveFlag == "N"){
			$("#btn_pop_update").hide();
		}
		if(btnDelFlag == "Y"){
			$("#btn_pop_delete").show();
		}else if(btnDelFlag == "N"){
			$("#btn_pop_delete").hide();
		}
		
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
	var FILE_NAME = dataRow1["FILE_NAME"];
	if(FILE_NAME != "" && FILE_NAME != undefined && FILE_NAME != null){
		FILE_NAME = "<a href='javascript:file_download()'>"+FILE_NAME+"</a>"
		var txt = "<br/>"+FILE_NAME + "(" + dataRow1["FILE_SIZE"] + "kb)";
		if(SSAD == "Y"){
			txt = txt + " <button type='button' class='btn btn_style4' id='btn_pop_file_delete' name='btn_pop_file_delete' onclick='file_delete();'>"+fileDelete+"</button>"	
		}
		$("#fn").html(txt);	
	}	
	//}

}


//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
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
				<DataGridColumn dataField="OPEN_FLAG"     	visible = "false" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//headerText="수도&lt;img src=\'..\/rMateGridH5\/Assets\/arrow_down.png\'&gt;"/>\
//목록 그리드 조회
function getGridData() {
	var params 			= $("#frm").serializeArray();
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
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/businessNoticeInputList.do",         
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
			//alert(data);
			//gridApp1.setData(data);
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
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

//공지사항 팝업 저장
function getGridData2() {
	$("#D_UD").val("");
	
	var form = new FormData(document.getElementById('pop_frm'));
	jQuery.ajax({ 
	    url:"/businessNoticeInputInsert.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
        processData: false,
        contentType: false,		
		data: form,
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			//gridApp1.setData(data);
			alert(msgSave);
			//팝업 닫고 다시 조회하기 
			$("#pop_wrap1").dialog("close");
			getGridData();
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//공지사항 팝업 수정 삭제
function getGridData3(num1) {
	//수정인지 삭제인지
	$("#D_UD").val(num1);
	var form = new FormData(document.getElementById('pop_frm'));
	jQuery.ajax({ 
	    url:"/businessNoticeInputUpdate.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		cache: false,
        processData: false,
        contentType: false,		
		data: form,
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			//gridApp1.setData(data);
			//alert("저장되었습니다.");
			//alert(data);
			if(num1 == "UPDATE"){
				alert(msgModify);
				$("#pop_wrap1").dialog("close");
				getGridData();
			}else if(num1 == "DELETE"){
				alert(msgDelete);
				$("#pop_wrap1").dialog("close");
				getGridData();
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//첨부파일 삭제
function getGridData4() {
	jQuery.ajax({ 
	    url:"/businessNoticeInputFileDelete.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {'P_SEQ':$("#D_SEQ").val()},
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			//gridApp1.setData(data);
			alert(msgDelete);
			$("#pop_wrap1").dialog("close");
			getGridData();			
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

function validation(){
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+jari(month)+""+jari(day);
	
	var num1 = "ok";
	if($("#D_TITLE").val() == ""){
		alert(title + msgConfirm);
		num1 = "no";
	}else if($("#D_OPEN_DT").val() == ""){
		alert(startDay + msgConfirm);
		num1 = "no";
	}else if($("#D_END_DT").val() == ""){
		alert(stopDay + msgConfirm);
		num1 = "no";
	}else if($("#D_CONTENTS").val() == ""){
		alert(contents + msgConfirm);
		num1 = "no";
	}else if($("#D_CONTENTS").val().length < "10"){
		alert(msgContent10);
		num1 = "no";	
	}
	/*else if(date > $("#D_OPEN_DT").val().replace(/-/g,"") || date > $("#D_END_DT").val().replace(/-/g,"")){
		alert("현재일 보다 이전일은 등록할수 없습니다.");
		num1 = "no";
	}*/
	else if($("#D_OPEN_DT").val().replace(/-/g,"") > $("#D_END_DT").val().replace(/-/g,"")){
		alert("시작일이 종료일 보다 클 수 없습니다.");
		num1 = "no";
	}	
	return num1;
}

//첨부파일삭제
function file_delete(){
	var contest = confirm(msgDeleteConfirm);
	if(contest == true){
		getGridData4();
	}	
}
//file다운
function file_download(){
	$("#P_SEQ").val($("#D_SEQ").val());
	var frm = $("#fileForm")[0];	
	frm.action = "/businessNoticeInputFileDownload.do";
	frm.method = "post";
	frm.submit();	
}
//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT3").val($("#I_TEXT").val());
		btn_comm_search('3');
	}
}
//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	//$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
}


$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//공통코드 구분(중요도)
	getCommonCodeSelectBoxList("D_PRIORITY", "PRIORITY");
	getCommonCodeSelectBoxList("D_OPEN_FLAG", "OPEN_FLAG");
	
	
	//초기 팝업 사이즈 조절
	$(function() {
		$("#pop_wrap1").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 900,
		    resizable : false,
		    position : "center"
		});	
	});
	
	//달력설정	
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

	
	//조회
	$("#btn_search").click(function(){
		// 헤드 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
		
		gridMovePage("1");	
	});	
	//신규
	$("#btn_new").click(function(){
		//팝업버튼 
		$("#btn_pop_save").show();
		$("#btn_pop_update").hide();
		$("#btn_pop_delete").hide();
		
		//신규팝업 초기화
		$("#D_PRIORITY").val("");
		$("#D_TITLE").val("");
		$("#D_OPEN_DT").val("");
		$("#D_END_DT").val("");
		$("#D_CONTENTS").val("");
		$("#D_UPFILE").val("");		
		$("#fn").html("");
		$("#D_OPEN_FLAG").val("");
		
		//첨부파일명 
		//$("#fn").hide();
		
		$("#pop_wrap1").dialog("open");	
	});
	//저장
	$("#btn_pop_save").click(function(){
		if(validation() == "ok"){
			getGridData2();	
		}
	});	
	//수정
	$("#btn_pop_update").click(function(){		
		var contest = confirm(msgModifyConfirm);
		if(contest == true && validation() == "ok"){
			getGridData3("UPDATE");
		}
	});
	//삭제
	$("#btn_pop_delete").click(function(){		
		var contest = confirm(msgDeleteConfirm);
		if(contest == true){
			getGridData3("DELETE");
		}
	});	
	
	//협력업체 검색
	$("#P_VEN_NAME_SEARCH").click(function(){		
		btn_comm_supply_search();
	});
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 135 );
	
	$(window).on('resize',function (){	
		
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 135 );
		
	});
	
		
});



