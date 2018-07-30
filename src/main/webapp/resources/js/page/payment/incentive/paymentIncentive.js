/********************************************************
 * 설명:  보류등록(해제) 관리
 * 수정일          수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author   : 최호정
 * since    : 2017.05.04
 * version  : 1.0
 ********************************************************/

$(document).ready(function(){
	init();
	//최초 도움말 불러오기
	setHelpMessage($(location).attr('pathname').replace('/',''));
	$(".datepicker").datepicker();
	datePickerYearMonth();

	//숫자만 입력
	$('#P_CFM_JANG_AMT').number( true);

	//장려금생성 팝업
	$("#pop_wrap1").dialog({
		autoOpen : false,
		modal : true,
		width : 400,
		resizable : false,
		open: function(){
		$("body").css("overflow-y", "hidden");
		},
		close: function(){
		$("body").css("overflow-y", "scroll");
		}
	});
	
	$("#pop_wrap2").dialog({
		autoOpen : false,
		modal : true,
		width : 400,
		resizable : false,
		open: function(){
		$("body").css("overflow-y", "hidden");
		},
		close: function(){
		$("body").css("overflow-y", "scroll");
		}
	});
	
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

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

		gridApp1.setLayout(layoutStr1);
		gridApp1.setData(gridData);

		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData1 = dataRow1[dataField];

			$('#P_VEN_NAME').val(dataRow1.VEN_NAME);
			$('#P_VEN_CODE').val(dataRow1.VEN_CODE);
			$('#P_APPL_MON').val(dataRow1.APPL_MON);
			$('#P_STR_CODE').val(dataRow1.STR_CODE);
			$('#P_CHASU').val(dataRow1.CHASU);
			$('#P_CFM_JANG_AMT').val(dataRow1.CFM_JANG_AMT);
			$('#P_JANG_AMT').val(dataRow1.JANG_AMT);
			$('#P_REMARK').val(dataRow1.REMARK);
		};

		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();    // 그리드 객체
			dataGrid1.addEventListener("itemClick", itemClickHandler);
		};

		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//----------------------- 그리드 설정 끝 -----------------------
var layoutStr1;
//그리드1 헤더 설정

layoutStr1 =
'<rMateGrid>\
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="9" />\
	<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows" >\
		<columns>\
			<DataGridColumn dataField="No"              headerText="' + rowNumber + '"       itemRenderer="IndexNoItem" textAlign="center" width="50"  secondLabelJsFunction="secondFunc"/>\
			<DataGridColumn dataField="VEN_CODE"        headerText="' + venCode + '"         textAlign="center"    width="90" />\
			<DataGridColumn dataField="VEN_NAME"        headerText="' + venName + '"         textAlign="left" />\
			<DataGridColumn dataField="STR_NAME"        headerText="' + storNm + '"          textAlign="left" />\
			<DataGridColumn dataField="CHASU"           headerText="' + paySeq + '"          textAlign="center"    width="60" />\
			<DataGridColumn dataField="GUGAN"           headerText="' + pyGugan + '"         textAlign="center"    width="60" />\
			<DataGridColumn dataField="MIN_STD_AMT"     headerText="' + pyMinAmt + '"        textAlign="right"     width="120"/>\
			<DataGridColumn dataField="MAX_STD_AMT"     headerText="' + pyMaxAmt + '"        textAlign="right"/>\
			<DataGridColumn dataField="PUR_RATE"        headerText="' + pyPurRate + '"       textAlign="center"    width="80" />\
			<DataGridColumn dataField="TOTAL_AMT"       headerText="' + puchasAmount + '"    textAlign="right" labelJsFunction="labelFunc" />\
			<DataGridColumn dataField="CFM_JANG_AMT"    headerText="' + pyCfmJangAmt + '"    textAlign="right" labelJsFunction="labelFunc" />\
			<DataGridColumn dataField="APPL_MON_WOL"    headerText="' + pyApplMon + '"       textAlign="center"    width="60" />\
			<DataGridColumn dataField="APPL_TGT"        headerText="' + pyApplTgt + '"       textAlign="center"    width="80" />\
			<DataGridColumn dataField="APPL_MON_DASH"   headerText="' + pyApplDt + '"        textAlign="center"    width="80" />\
			<DataGridColumn dataField="APPL_MON"        headerText="' + pyApplDt + '"        visible="false" />\
			<DataGridColumn dataField="STR_CODE"        headerText="' + storCode + '"        visible="false" />\
			<DataGridColumn dataField="JANG_AMT_WON"    headerText="' + pyJangAmt + '"       visible="false" />\
			<DataGridColumn dataField="JANG_AMT"        headerText="' + pyJangAmt + '"       visible="false" />\
			<DataGridColumn dataField="REMARK"          headerText="' + remarks + '"         visible="false" />\
		</columns>\
		<dataProvider>\
		<SpanSummaryCollection source="{$gridData}">\
			<summaries>\
		        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="No" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
		            <SpanSummaryField dataField="TOTAL_AMT"    summaryOperation="SUM" />\
		            <SpanSummaryField dataField="CFM_JANG_AMT" summaryOperation="SUM" />\
		        </SpanSummaryRow>\
		    </summaries>\
	    </SpanSummaryCollection>\
      </dataProvider>\
	</DataGrid>\
</rMateGrid>';
//그리드1 데이터 초기화
var gridData = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )                            ###
//########################################################
function secondFunc(item, value, column){
	if(item["No"])
		return item["No"];
	else
		return value;
}

function labelFunc(item, value, column){
	var str = value;
	return moneyComma(String(str));
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();

	if($("#S_VEN_NAME").val() != null && $("#S_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#S_VEN_NAME").val());
		btn_comm_search('3');
	}
}

//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#S_VEN_NAME' ).val(dataRow.VEN_NAME);        // 협력업체명
	$('#S_VEN_CODE' ).val(dataRow.VEN_CODE);        // 협력업체코드
	
	//협력업체의 지불주기/지불차수 선택
	getPayNum(dataRow.VEN_CODE, '','S_PAY_SEQ');
}

function fnSearch(){
	if($.trim($("#S_SEARCH_DT").val() ) == null || $.trim($("#S_SEARCH_DT").val() ) == "")
	{
		confirm(payYm + msgConfirm);
		$("#S_SEARCH_DT").focus();
		return;
	}

	if($.trim($("#S_VEN_NAME").val() ) == null || $.trim($("#S_VEN_NAME").val() ) == "")
		$("#S_VEN_CODE").val("");

	var loadData = $("#top_search").serializeAllObject();
	loadData.S_APPL_MON = loadData.S_SEARCH_DT.replace(/-/gi, '');
	
	//지불년월 = 장려금생성 = 장려금취소
	var searchDate = $("#S_SEARCH_DT").val(); //loadData.S_SEARCH_DT
	//$("#S_SEARCH_DT").val(searchDate);  //지불년월
	//$("#S_APPL_MON").val(searchDate.replace(/-/gi, ''));
	$("#I_APPL_MON").val(searchDate); //장려금생성
	$("#I_APPL_MON_2").val(searchDate); //장려금취소
	
	//var loadData1 = $("#pop_wrap1").serializeAllObject();
	//var loadData2 = $("#pop_wrap2").serializeAllObject();
	//loadData1.I_APPL_MON = searchDate;
	//loadData2.I_APPL_MON_2 = searchDate;

	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({
		url:"/paymentIncentiveList.do",
		type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){
			gridRoot1.addLoadingBar();
		},
		success:function(data){
			gridApp1.setData(data.list);
		},
		complete : function(data) {
			dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
			dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
		}
	});
}

function fnUpdate(){

	if(!fnValidation()) return;
	if(!confirm(msgSaveConfirm)) return;

	var loadData = $("#reg_form").serializeAllObject();

	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({
		url:"/paymentIncentiveUpdate.do",
		type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){
			gridRoot1.addLoadingBar();
		},
		success:function(data){

			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					//입력폼만 리셋
					$("#reg_form").each(function() {
						this.reset();
					});
					//성공메시지
					alert(msgSave);
					//재조회
					fnSearch();
				}
				else
				{
					alert(data.RETURN_MSG);
				}
			}
			else
			{
				alert(msgErrorDefault);
			}

		},
		complete : function(data) {
			dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
			dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
		}
	});
}

//협력업체의 지불주기/지불차수 선택
//getPayNum(dataRow.VEN_CODE, 'P_PAY_CON_SEARCH','S_PAY_SEQ');
function getPayNum(venCode, pPayCon,pPaySeq){
	var postValue ={};	
	postValue = { 
			  "P_VEN_CODE"	: venCode
	};

	jQuery.ajax({
	    type:"POST",
	    url:"/getPayNum.do",
	    dataType:"JSON",
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	//alert('PAY_CON: '+data[0].PAY_CON + ', PAY_SEQ:' + data[0].PAY_SEQ);

    		$("#"+pPaySeq).empty();
    		$("select[name="+pPaySeq+"   ] option").remove();
    		$("#"+pPaySeq).append('<option value="">' + all + '</option>');
    		
	    	for(var i = 0; i < data.length; i++){
//			    $("#"+pPaySeq+"").val(data[i].PAY_SEQ).attr("selected","selected");

	    		$("#"+pPaySeq).append('<option value="'+ data[i].PAY_SEQ +'">'+ data[i].PAY_SEQ_NM +'</option>');
		    	$("#"+pPaySeq).val(data[i].PAY_SEQ).attr("selected","selected");
		   	}
	    	
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function init() {
	getCommonCodeSelectBoxList("S_PAY_SEQ", "PAY_SEQ");
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	$("#S_SEARCH_DT").val(nowDateYm);
	
//	$("#S_STR_CODE").append('<option value="">'+ all +'</option>');
//	getStoreCode("S_STR_CODE");
//	$("select[id='S_STR_CODE']").val(SSSC).prop("selected", true); // 회원의 점포 선택
	
	// 협력(매입)업체에서 엔터시 검색되게....
	$("input[name=S_VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        }
        
      //협력업체 없으면 지불주기/지불차수 전체
        var venName = $('#P_VEN_NAME' ).val();
    	if(venName == null || venName == ''){
    		//$("#P_PAY_CON").empty();
    		$("#S_PAY_SEQ").empty();
    		//$("#P_PAY_CON" ).append('<option value="">' + all + '</option>');
    		$("#S_PAY_SEQ" ).append('<option value="">' + all + '</option>');
			//getCommonCodeSelectBoxList("P_PAY_CON",   "PAY_CON"); // 지불주기  조회조건
			getCommonCodeSelectBoxList("S_PAY_SEQ",   "PAY_SEQ"); // 지불차수
    	}
	});
}

function frmReset(){
	$("#reg_form").each(function() {
		this.reset();
	});

	//var nowDate = new CommDateManager().getDate("yyyy-mm");
	//$("#S_SEARCH_DT").val(nowDate);
}

function fnValidation(){
	if($.trim($("#P_VEN_CODE").val() ) == null || $.trim($("#P_VEN_CODE").val() ) == "")
	{
		alert(supply + msgConfirm);
		$("#P_VEN_NAME").focus();
		return false;
	}

	if($.trim($("#P_STR_CODE").val() ) == null || $.trim($("#P_STR_CODE").val() ) == "")
	{
		alert(storCode + msgConfirm);
		$("#P_STR_CODE").focus();
		return false;
	}

	if($.trim($("#P_CFM_JANG_AMT").val() ) == null || $.trim($("#P_CFM_JANG_AMT").val() ) == "")
	{
		alert(pyCfmJangAmt + msgConfirm);
		$("#P_CFM_JANG_AMT").focus();
		return false;
	}

	return true;
}

//장려금생성 팝업 오픈
function btn_popup(type) {
	//팝업데이터 클리어
	//clearePop();

	if(type == 'AMT') {
		//장려금생성 팝업
		$(".ui-dialog-titlebar").text(pyJangGenPopup);

		$("#popSave").show();
		$("#popItmIcon").show();
		$('#pop_wrap1').dialog( 'open' );
	}
	else { // if (type == 'CANCLE')
		//장려금취소 팝업
		$(".ui-dialog-titlebar").text(pyJangCanclePopup);
		
		$("#popCancle").show();
		$("#popItmIcon").show();
		$('#pop_wrap2').dialog( 'open' );
	}
}

//장려금생성 팝업 닫기
function pop1_close() {
	$("#pop_wrap1").dialog("close");
	$("#pop_wrap2").dialog("close");
}

//장려금생성 팝업 데이터 초기화
function clearePop(){
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	$("#I_APPL_MON").val(nowDateYm);
	$("#I_APPL_MON_2").val(nowDateYm);
}

//팝업 -> 작업년월에 맞게 전체 협력업체 중 장려금을 받는 협력업체에 한하여 장려금 자동 계산 및 생성
function pop1_exec() {
	pop1_close(); //팝업닫기
	
	//재고조정등록
	var loadData = $("#pop_wrap1").serializeAllObject();
	loadData.I_APPL_MON = loadData.I_APPL_MON.replace('-', '');
	
	//지불년월 = 장려금생성 = 장려금취소
	var searchDate = $("#I_APPL_MON").val(); //loadData.S_SEARCH_DT
	$("#S_SEARCH_DT").val(searchDate);  //지불년월
	$("#S_APPL_MON").val(searchDate.replace(/-/gi, ''));
	//$("#I_APPL_MON").val(searchDate); //장려금생성
	$("#I_APPL_MON_2").val(searchDate); //장려금취소

	//신규,수정 질문 코멘트
	var msgConfirm ="";
	//신규,수정 완료 메세지 코멘트
	var cuMent = "";
	//신규, 수정 url호출
	var callUrl = "";

	//신규
	msgConfirm = msgJangGenConfirm; //선택하신 년월에 해당하는 장려금을 생성하시겠습니까?
	cuMent = msgJangGenComplete; //장려금이 생성되었습니다.
	callUrl = '/paymentIncentiveInsert.do';

	if(confirm(msgConfirm) == false) return;

	//상품 일 수불 정보 검색
	jQuery.ajax({
		type:"POST",
		url: callUrl,
		dataType:"JSON",
		data:loadData,
		async:false,
		beforeSend : function(){
			//pop1_close(); //팝업닫기
			gridRoot1.addLoadingBar();
		},
		success : function(data) {
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					frmReset();
					alert(cuMent);

					fnSearch(); //조회
					//pop1_close(); //팝업닫기
				}
				else
				{
					alert(data.RETURN_MSG);

					//pop1_close(); //팝업닫기
				}
			}
			else
			{
				//요청중 문제가 발생했습니다.관리자에게 문의하세요.
				alert(msgErrorDefault);
			}

		},
		complete : function(data) {
			gridRoot1.removeLoadingBar();
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

function pop1_cancle() {
	pop1_close(); //팝업닫기
	
	//재고조정등록
	var loadData = $("#pop_wrap2").serializeAllObject();
	loadData.I_APPL_MON_2 = loadData.I_APPL_MON_2.replace('-', '');
	
	//지불년월 = 장려금생성 = 장려금취소
	var searchDate = $("#I_APPL_MON_2").val(); //loadData.S_SEARCH_DT
	$("#S_SEARCH_DT").val(searchDate);  //지불년월
	$("#S_APPL_MON").val(searchDate.replace(/-/gi, ''));
	$("#I_APPL_MON").val(searchDate); //장려금생성
	//$("#I_APPL_MON_2").val(searchDate); //장려금취소

	//신규,수정 질문 코멘트
	var msgConfirm ="";
	//신규,수정 완료 메세지 코멘트
	var cuMent = "";
	//신규, 수정 url호출
	var callUrl = "";

	//신규
	msgConfirm = msgJangCancleConfirm; //선택하신 년월에 해당하는 장려금을 취소하시겠습니까?
	cuMent = msgJangCancleComplete; //장려금이 취소되었습니다.
	callUrl = '/paymentIncentiveCancle.do';

	if(confirm(msgConfirm) == false) return;

	//상품 일 수불 정보 검색
	jQuery.ajax({
		type:"POST",
		url: callUrl,
		dataType:"JSON",
		data:loadData,
		async:false,
		beforeSend : function(){
			//pop1_close(); //팝업닫기
			gridRoot1.addLoadingBar();
		},
		success : function(data) {
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					frmReset();
					alert(cuMent);

					fnSearch(); //조회
					//pop1_close(); //팝업닫기
				}
				else
				{
					alert(data.RETURN_MSG);
				}
			}
			else
			{
				//요청중 문제가 발생했습니다.관리자에게 문의하세요.
				alert(msgErrorDefault);
			}

		},
		complete : function(data) {
			gridRoot1.removeLoadingBar();
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});

}

//그리드 로딩바  보이기
function showLoadingBar() {
	gridRoot1.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar() {
	gridRoot1.removeLoadingBar();
}

//########################################################
//###   상단 버튼 구현 ( 끝 )                                 ###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-220);

	//장려금생성 팝업
	//$(".ui-dialog-titlebar").text(pyJangGenPopup);

	$(".tab_btn").on("click focus",function (){
		var btnNum = $(this).parent().index();
		
		$(".tab_area1 > div").eq(btnNum).show().siblings().hide();
		
		//if ( btnNum==0 ) $(".tab_area2 select:last").hide().prev().last().hide();
		//else  $(".tab_area2 select:last").show().prev().last().show();
	});

	$(window).on('resize',function (){
		$("#gridHolder1").height($(window).height()-220);
	});
});