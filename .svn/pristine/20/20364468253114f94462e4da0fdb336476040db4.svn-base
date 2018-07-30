/********************************************************
 * 설명:  컴플레인관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2017.04.11
 * version : 1.0
 ********************************************************/

//행사 시작 종료일 중복체크를 위한 Date조회용 변수
var checkDate = {};
var cardList;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
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

	$(".memo").height(100);
	
	var P_RCPT_DTTM_STR =new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var P_RCPT_DTTM_END = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#top_search input[name=P_RCPT_DTTM_STR]').val(P_RCPT_DTTM_STR);
	$('#top_search input[name=P_RCPT_DTTM_END]').val(P_RCPT_DTTM_END);
	
	//$("#MOBIL_NO").on("keyup", "input:text[numberOnly]", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});
	$("#MOBIL_NO").keyup(function(){
		$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
	});
	
	$("input:radio[name='USER_YN']").change(function(){
		
		$("#body_area input[name=CUST_NAME]").val("");
		$("#body_area input[name=CUST_NO]").val("");
		$("#body_area input[name=MOBIL_NO]").val("");
		
		if($("input:radio[id='USER_YN_Y']").is(":checked") == true){
			$("#btnCustSerach").attr("disabled", false);
		}else{
			$("#btnCustSerach").attr("disabled", true);
		}
	});
	
	$("#body_area2 select[name=SEQ]").change(function(){
		jQuery.ajax({ 
		    url:"/selectUserClaimManage.do",         
		    type:"POST",
			datatype:"json",
			//async:false,
			data: {
						'P_RCPT_NO' : dataRow1.RCPT_NO
					,	'P_SEQ' : $("#body_area2 select[name=SEQ]").val()
					},
			success:function(data){  
				//gridApp1.setData(data);
				$("#body_area2 textarea[name=CONTS]").val(data[0].CONTS);
				$("#body_area2 input[name=IEMP_NAME]").val(data[0].IEMP_NAME);
				$("#body_area2 input[name=IDATE]").val(data[0].IDATE);
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	});
	
	$('#P_CUST_NAME').on('keydown', function(e) {
		$("#P_CUST_NO").val("");
	    if (e.which == 13) {
	    	btn_comm_user_search_top();
	    }
	});
	
	$('#CUST_NAME').on('keydown', function(e) {
	    if (e.which == 13) {
	    	if($("input:radio[id='USER_YN_Y']").is(":checked") == true){
	    		btn_comm_user_search_body();
	    	}
	    }
	});

	$('#RCPT_EMP_NAME').on('keydown', function(e) {
	    if (e.which == 13) {
	    	btn_comm_member_search();
	    }
	});
	
	
	//달력설정
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var startDate = parseInt($("#P_RCPT_DTTM_STR").val().replace(/-/g, ""));
			var endDate = parseInt($("#P_RCPT_DTTM_END").val().replace(/-/g, ""));
			if(startDate > endDate)
			{
				alert(msgDateValidation);
				
				if(this.id == "P_RCPT_DTTM_STR")
					$("#P_RCPT_DTTM_STR").val(P_RCPT_DTTM_STR);
				else if(this.id == "P_RCPT_DTTM_END")
					$("#P_RCPT_DTTM_END").val(P_RCPT_DTTM_END);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
	// 팝업설정
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 700,
	    resizable : false,
	    open: function(){
	        $("body").css("overflow-y", "hidden");
	    },
		close: function(){
			$("body").css("overflow-y", "scroll");
		}
	});
	
	var timer = setInterval(function() {
		btnSearch();
    }, $("#SEARCH_TIME option:selected").val()); //1000 = 1초
});


// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%");

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp1.setLayout(layoutStr);
		gridApp1.setData(gridData1);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData1 = dataRow1[dataField];
			
			$("#body_area input[name=RCPT_NO]").val(dataRow1.RCPT_NO);
			$("#body_area input[name=CUST_NAME]").val(dataRow1.CUST_NAME);
			$("#body_area input[name=CUST_NO]").val(dataRow1.CUST_NO);
			$("#body_area input[name=MOBIL_NO]").val(dataRow1.MOBIL_NO);
			$("#body_area select[name=CLAIM_TP]").val(dataRow1.CLAIM_TP);
			$("#body_area select[name=STR_CODE]").val(dataRow1.STR_CODE);
			$("#body_area input[name=RCPT_EMP]").val(dataRow1.RCPT_EMP);
			$("#body_area input[name=RCPT_EMP_NAME]").val(dataRow1.RCPT_EMP_NAME);
			$("#body_area select[name=CLAIM_STAT]").val(dataRow1.CLAIM_STAT);
			$("#body_area input[name=IEMP_NAME]").val(dataRow1.IEMP_NAME);
			$("#body_area input[name=IDATE]").val(dataRow1.IDATE);
			$("#body_area input[name=SUBJECT]").val(dataRow1.SUBJECT);
			$("#body_area textarea[name=CONTS]").val(dataRow1.CONTS);
			
			//$("input:radio[id='USER_YN_Y']").is(":checked")
			if(dataRow1.CUST_NO == "" || dataRow1.CUST_NO == null || dataRow1.CUST_NO == undefined){
				$("input:radio[id='USER_YN_N']").attr("checked", true);
			}else{
				$("input:radio[id='USER_YN_Y']").attr("checked", true);
			}
			
			if(dataRow1.CLAIM_STAT == "3"){
				
				$("input:radio[name='USER_YN']").attr("disabled", true);
				$("#body_area input[name=CUST_NAME]").attr("disabled", true);
				$("#body_area input[name=RCPT_EMP_NAME]").attr("disabled", true);
				$("#body_area input[name=MOBIL_NO]").attr("disabled", true);
				$("#btnCustSerach").attr("disabled", true);
				$("#body_area select[name=CLAIM_TP]").attr("disabled", true);
				$("#body_area select[name=STR_CODE]").attr("disabled", true);
				//$("#body_area select[name=CLAIM_STAT]").attr("disabled", true);
				$("#btnUserSearch").attr("disabled", true);
				$("#body_area input[name=SUBJECT]").attr("disabled", true);
				$("#body_area textarea[name=CONTS]").attr("disabled", true);
				
			}else{
				
				$("input:radio[name='USER_YN']").attr("disabled", false);
				$("#body_area input[name=CUST_NAME]").attr("disabled", false);
				$("#body_area input[name=RCPT_EMP_NAME]").attr("disabled", false);
				$("#body_area input[name=MOBIL_NO]").attr("disabled", false);
				$("#btnCustSerach").attr("disabled", false);
				$("#body_area select[name=CLAIM_TP]").attr("disabled", false);
				$("#body_area select[name=STR_CODE]").attr("disabled", false);
				//$("#body_area select[name=CLAIM_STAT]").attr("disabled", false);
				$("#btnUserSearch").attr("disabled", false);
				$("#body_area input[name=SUBJECT]").attr("disabled", false);
				$("#body_area textarea[name=CONTS]").attr("disabled", false);
				
			}
			
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			
			//그리드1 셀선택 이벤트
			dataGrid1.addEventListener("itemClick", itemClickHandler);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		
		
	} 
}
//그리드1 데이터 초기화
var gridData1 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="RCPT_DT"  headerText="' + orderDate + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="RCPT_NO"  headerText="접수번호" textAlign="center" width="90" />\
			<DataGridColumn dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="STR_NAME"  headerText="' + storNm + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="RCPT_EMP"  headerText="RCPT_EMP" textAlign="center" visible="false" />\
			<DataGridColumn dataField="RCPT_EMP_NAME"  headerText="' + employeeName + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="CLAIM_TP"  headerText="CLAIM_TP" textAlign="center" visible="false" />\
			<DataGridColumn dataField="CLAIM_TP_NAME"  headerText="' + claimTp + '" textAlign="center"  width="100" />\
			<DataGridColumn dataField="CUST_NAME"  headerText="' + customerNm + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="CUST_NO"  headerText="' + customerNumber + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="SUBJECT"  headerText="' + title + '" textAlign="left" />\
			<DataGridColumn dataField="CLAIM_STAT"  headerText="CLAIM_STAT" textAlign="center" visible="false" />\
			<DataGridColumn dataField="CLAIM_STAT_NAME"  headerText="' + claimStat + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="CLAIM_CNT_HTML"  headerText="' + manageDetail + '" textAlign="center" width="80" itemRenderer="HtmlItem" style="text-decoration:underline;" />\
			<DataGridColumn dataField="CLAIM_CNT"  headerText="' + manageDetail + '" visible="false" />\
			<DataGridColumn dataField="MOBIL_NO"  headerText="MOBIL_NO" visible="false" />\
			<DataGridColumn dataField="CONTS"  headerText="CONTS" visible="false" />\
			<DataGridColumn dataField="IDATE"  headerText="IDATE" visible="false" />\
			<DataGridColumn dataField="IEMP_NO"  headerText="IEMP_NO" visible="false" />\
			<DataGridColumn dataField="IEMP_NAME"  headerText="IEMP_NAME" visible="false" />\
			<DataGridColumn dataField="RCPT_DTTM"  headerText="' + orderDate + '" textAlign="center" visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';


//그리드 row의 값을 변경하여 보여주기
function labelFunc(item, value, column){
  var str = item["DEL_YN"];//삭제여부 컬럼의 필드명
  if(str=="N")
    return "사용";
  else if(str=="Y")
   return "미사용";
}
// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}


function init() {
	$("#top_search select[name=P_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=P_STR_CODE]");
	
	$("#STR_CODE").append('<option value="">'+ select +'</option>');
	getStoreCode("STR_CODE");
	
	$("#top_search select[name=P_CLAIM_STAT]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("top_search select[name=P_CLAIM_STAT]", "CLAIM_STAT");
	
	$("#CLAIM_STAT").append('<option value="">'+ select +'</option>');
	//getCommonCodeSelectBoxList("CLAIM_STAT", "CLAIM_STAT");
	getCommonCodeSelectBoxListSelected("CLAIM_STAT", "CLAIM_STAT", "0");
	
	$("#P_CLAIM_TP").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("P_CLAIM_TP", "CLAIM_TP");
	
	$("#CLAIM_TP").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("CLAIM_TP", "CLAIM_TP");
	
	$("#B_DC_FLAG").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("B_DC_FLAG", "DC_FLAG");
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

function selectGo(num1){
	location.href="/userClaimRegist.do?SEARCH_TIME="+num1;
}

function btn_comm_user_search_top(){
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM1").val('fn_comm_user_callback_top(dataRow10)');
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUST_NAME").val());
		btn_comm_search('1');
	}
	
}

function fn_comm_user_callback_top(dataRow){
	$("#top_search input[name=P_CUST_NO]").val(dataRow.CUST_NO);
	$("#top_search input[name=P_CUST_NAME]").val(dataRow.CUST_NAME);
}

function btn_comm_user_search_body(){
	
	$("#btnCustSerach").blur();
	
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM1").val('fn_comm_user_callback_body(dataRow10)');
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#CUST_NAME").val() != null && $("#CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#CUST_NAME").val());
		btn_comm_search('1');
	}
	
}

function fn_comm_user_callback_body(dataRow){
	$("#body_area input[name=CUST_NO]").val(dataRow.CUST_NO);
	$("#body_area input[name=CUST_NAME]").val(dataRow.CUST_NAME);
	$("#body_area input[name=MOBIL_NO]").val(dataRow.MOBIL_NO);
}

//(사원검색) 팝업 호출 function
function btn_comm_member_search(){
	
	$("#btnUserSearch").blur();
	
	$('#comm_pop_wrap4' ).dialog( 'open' );
	gridApp13.resize();
	
	// $("#P_CALLBACK_NM4").val('fn_comm_member_callback1(dataRow13)');
	if($("#RCPT_EMP_NAME").val() != null && $("#RCPT_EMP_NAME").val() != ""){
		$("#P_TEXT4").val($("#RCPT_EMP_NAME").val());
		btn_comm_search('4');
	}
}

function fn_comm_member_callback(dataRow){
	$("#RCPT_EMP").val(dataRow.USER_ID);
	$("#RCPT_EMP_NAME").val(dataRow.USER_NM);
}

//신규 버튼 클릭 이벤트 (폼 초기화)
function btnNew(){
	
	//btnSearch();
	//grid1 셀렉트 된 내용 초기화
	dataGrid1.setSelectedIndex(-1);
	dataRow1 = "";
	
	$("input:radio[id='USER_YN_Y']").attr("checked", true);
	
	$("#body_area input[name=RCPT_NO]").val("");
	$("#body_area input[name=CUST_NAME]").val("");
	$("#body_area input[name=CUST_NO]").val("");
	$("#body_area input[name=MOBIL_NO]").val("");
	$("#body_area select[name=CLAIM_TP]").val("");
	$("#body_area select[name=STR_CODE]").val("");
	$("#body_area input[name=RCPT_EMP]").val("");
	$("#body_area input[name=RCPT_EMP_NAME]").val("");
	$("#body_area select[name=CLAIM_STAT]").val("1");
	$("#body_area input[name=IEMP_NAME]").val("");
	$("#body_area input[name=IDATE]").val("");
	$("#body_area input[name=SUBJECT]").val("");
	$("#body_area textarea[name=CONTS]").val("");
	
	$("input:radio[name='USER_YN']").attr("disabled", false);
	$("#body_area input[name=CUST_NAME]").attr("disabled", false);
	$("#body_area input[name=RCPT_EMP_NAME]").attr("disabled", false);
	$("#body_area input[name=MOBIL_NO]").attr("disabled", false);
	$("#btnCustSerach").attr("disabled", false);
	$("#body_area select[name=CLAIM_TP]").attr("disabled", false);
	$("#body_area select[name=STR_CODE]").attr("disabled", false);
	//$("#body_area select[name=CLAIM_STAT]").attr("disabled", false);
	$("#btnUserSearch").attr("disabled", false);
	$("#body_area input[name=SUBJECT]").attr("disabled", false);
	$("#body_area textarea[name=CONTS]").attr("disabled", false);
	
}

//행사 코드 마스터 조회
function btnSearch(){
	var startDate 		= $("#P_RCPT_DTTM_STR").val().split("-");
	var endDate 		= $("#P_RCPT_DTTM_END").val().split("-");
	var strDt1			= new Date(startDate[0], Number(startDate[1])-1, startDate[2]); 
	var endDt1			= new Date(endDate[0], Number(endDate[1])-1, endDate[2]);
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if(Number(startDate[0] + startDate[1] + startDate[2]) > Number(endDate[0] + endDate[1] + endDate[2])){
		alert(msgDateValidation);
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_RCPT_DTTM_STR").focus();
		return;
	}
	
	
	//로딩바 출력
	showLoadingBar1();
	
	jQuery.ajax({ 
	    url:"/selectUserClaimRegist.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {
				'P_STR_CODE' : $("#top_search select[name=P_STR_CODE]").val()
			,	'P_RCPT_DTTM_STR' : $("#top_search input[name=P_RCPT_DTTM_STR]").val()
			,	'P_RCPT_DTTM_END' : $("#top_search input[name=P_RCPT_DTTM_END]").val()
			,	'P_CLAIM_STAT' : $("#top_search select[name=P_CLAIM_STAT]").val()
			,	'P_CUST_NO'	:	$("#top_search input[name=P_CUST_NO]").val()
			,	'P_CLAIM_TP' : $("#top_search select[name=P_CLAIM_TP]").val()
		},
		success:function(data){  
			gridApp1.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function btnSave(){
	
	if($("#body_area input[name=RCPT_NO]").val() != undefined && $("#body_area input[name=RCPT_NO]").val() != ""){
		if(dataRow1.CLAIM_STAT == "3"){
			//처리상태가 완료인 컴플레인건은 저장 할 수 없습니다.
			alert(noneSaveClaim);
			return;
		}
	}
	
	if($("#body_area select[name=CLAIM_TP]").val() == ""){
		//컴플레인유형은(는) 필수 입력항목 입니다.
		alert(claimTp + msgConfirm);
		return;
	}
	
	if($("#body_area select[name=STR_CODE]").val() == ""){
		//점포명은(는) 필수 입력항목 입니다.
		alert(storNm + msgConfirm);
		return;
	}
	
	if($("#body_area select[name=CLAIM_STAT]").val() == ""){
		//처리상태은(는) 필수 입력항목 입니다.
		alert(claimStat + msgConfirm);
		return;
	}
	
	if($("#body_area input[name=SUBJECT]").val() == ""){
		//제목은(는) 필수 입력항목 입니다.
		alert(title + msgConfirm);
		return;
	}
	
	if($("#body_area textarea[name=CONTS]").val() == ""){
		//상세내역은(는) 필수 입력항목 입니다.
		alert(conts + msgConfirm);
		return;
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/registUserClaimRegist.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'P_RCPT_NO' : $("#body_area input[name=RCPT_NO]").val()					
				,	'P_STR_CODE' : $("#body_area select[name=STR_CODE]").val()
				,	'P_RCPT_EMP' : $("#body_area input[name=RCPT_EMP]").val()
				,	'P_SUBJECT' : $("#body_area input[name=SUBJECT]").val()
				,	'P_CUST_NO' : $("#body_area input[name=CUST_NO]").val()
				,	'P_CUST_NAME' : $("#body_area input[name=CUST_NAME]").val()
				,	'P_CLAIM_TP' : $("#body_area select[name=CLAIM_TP]").val()
				,	'P_CLAIM_STAT' : $("#body_area select[name=CLAIM_STAT]").val()
				,	'P_MOBIL_NO' : $("#body_area input[name=MOBIL_NO]").val()
				,	'P_CONTS' : $("#body_area textarea[name=CONTS]").val()
				},
		success:function(data){
			btnNew();
			btnSearch();
			
			alert(msgSave);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function btnExcelDown(){
	
	/*'P_STR_CODE' : $("#top_search select[name=P_STR_CODE]").val()
	,	'P_RCPT_DTTM_STR' : $("#top_search input[name=P_RCPT_DTTM_STR]").val()
	,	'P_RCPT_DTTM_END' : $("#top_search input[name=P_RCPT_DTTM_END]").val()
	,	'P_CLAIM_STAT' : $("#top_search select[name=P_CLAIM_STAT]").val()
	,	'P_CUST_NO'	:	$("#top_search input[name=P_CUST_NO]").val()*/
	
	$.download('/excelUserClaimRegist.do',"P_STR_CODE="+$("#top_search select[name=P_STR_CODE]").val()
														 +"&P_RCPT_DTTM_STR="+$("#top_search input[name=P_RCPT_DTTM_STR]").val()
														 +"&P_RCPT_DTTM_END="+$("#top_search input[name=P_RCPT_DTTM_END]").val()
														 +"&P_CLAIM_STAT="+$("#top_search select[name=P_CLAIM_STAT]").val()
														 +"&P_CUST_NO="+$("#top_search input[name=P_CUST_NO]").val()
			 ,"post" );
	
}

function btnPopup() {
	
	$("#body_area2 select[name=SEQ] option").remove();
	$("#body_area2 input[name=IEMP_NAME]").val("");
	$("#body_area2 input[name=IDATE]").val("");
	$("#body_area2 textarea[name=CONTS]").val("");
	$("#body_area2 input[name=SUBJECT]").val("");
	
	var detailCnt = dataRow1.CLAIM_CNT;
	if(detailCnt > 0){
		for(var i=0; i < detailCnt ; i++){
			$("#body_area2 select[name=SEQ]").append('<option value="' + (Number(i)+1) + '">'+ (Number(i)+1) +'</option>');
		}
	}
	
	jQuery.ajax({ 
	    url:"/selectUserClaimManage.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {
					'P_RCPT_NO' : dataRow1.RCPT_NO
				,	'P_SEQ' : "1"
				},
		success:function(data){  
			//gridApp1.setData(data);
			$("#body_area2 input[name=SUBJECT]").val(dataRow1.SUBJECT);
			$("#body_area2 textarea[name=CONTS]").val(data[0].CONTS);
			$("#body_area2 input[name=IEMP_NAME]").val(data[0].IEMP_NAME);
			$("#body_area2 input[name=IDATE]").val(data[0].IDATE);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
	$("#pop_wrap1").dialog("open");
}

//공통코드 상세 정보 팝업 닫기
function btn_close(){ 
	// btn_search();
	$("#pop_wrap1").dialog( "close" );
}

//그리드 로딩바  보이기
function showLoadingBar1() {
    gridRoot1.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar1() {
    gridRoot1.removeLoadingBar();
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################

$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-334);
	
	$(window).on('resize',function  () {
		$("#gridHolder1").height($(window).height()-334);
	});
});