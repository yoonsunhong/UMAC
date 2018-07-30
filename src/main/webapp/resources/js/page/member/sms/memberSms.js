/********************************************************
 * 설명:  회원정보 > 고객관리 > SMS발송관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.02.07
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------
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

// 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, selectorColumn2;
var collection1, collection2; // 그리드의 데이터 객체
var gridData = [];
var strCheck = false;	// sms mms 체크

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	// rMateGrid 관련 객체
	
	if(id == "grid1")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp1.setLayout(layoutStr1);	// 데이터와 그리드를 포함하는 객체
		gridApp1.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
	else if(id == "grid2")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (사업자탭)
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}
	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//선택 객체 
	selectorColumn1 = gridRoot1.getObjectById("selector");
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
	//선택 객체 
	selectorColumn2 = gridRoot2.getObjectById("selector");
	
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
	$("#P_CUST_NO").val(dataRow1.CUST_NO);
	
}

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" >\
			<columns>\
				<DataGridSelectorColumn id="selector" textAlign="center" secondLabelJsFunction="secondLabelFunc" />\
				<DataGridColumn dataField="BUSI_NAME" headerText="'+supplyName+'" textAlign="left" />\
				<DataGridColumn dataField="CUST_NAME" headerText="'+cusName+'" textAlign="center" />\
				<DataGridColumn dataField="MOBIL_NO" headerText="'+mobilePhoneNumber+'" textAlign="center" labelJsFunction="rMateLabelPhoneFunc" />\
				<DataGridColumn dataField="SALE_AMT_SUM" headerText="매출액" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CUST_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE" headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//그리드2 헤더 및 레이아웃
var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2" >\
			<columns>\
				<DataGridSelectorColumn id="selector" textAlign="center" secondLabelJsFunction="secondLabelFunc" />\
				<DataGridColumn dataField="BUSI_NAME" headerText="'+supplyName+'" textAlign="left" />\
				<DataGridColumn dataField="CUST_NAME" headerText="'+cusName+'" textAlign="center" />\
				<DataGridColumn dataField="MOBIL_NO" headerText="'+mobilePhoneNumber+'" textAlign="center" labelJsFunction="rMateLabelPhoneFunc" />\
				<DataGridColumn dataField="SALE_AMT_SUM" headerText="매출액" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CUST_NO" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE" headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';
//----------------------- 그리드 설정 끝 -----------------------

// 회원정보 조회
function getGridData() {
	var param 			= $("#sertch_frm").serializeAllObject();
	var gongDt 			= $("#P_GONG_DT").val().replace(/-/g, "");
	var endDt 			= $("#P_END_DT").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#P_GONG_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if($("#P_GONG_DT").val() == null || $("#P_GONG_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_GONG_DT").focus();
		return;
	}
	
	if($("#P_END_DT").val() == null || $("#P_END_DT").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#P_END_DT").focus();
		return;
	}
	
	if(gongDt > endDt)
	{
		alert(msgDateValidation);
		$("#P_END_DT").focus();
		return;
	}

	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_GONG_DT").focus();
		return;
	}
	
	if($("#P_SALE_AMT_S").val() == null || $("#P_SALE_AMT_S").val() == "")
	{
		alert(selngAm + msgConfirm);
		$("#P_SALE_AMT_S").focus();
		return;
	}
	
	if($("#P_SALE_AMT_E").val() == null || $("#P_SALE_AMT_E").val() == "")
	{
		alert(selngAm + msgConfirm);
		$("#P_SALE_AMT_E").focus();
		return;
	}
	
	if($("#P_MOD_CUST_CNT").val() == null || $("#P_MOD_CUST_CNT").val() == "")
	{
		alert(visits + msgConfirm);
		$("#P_MOD_CUST_CNT").focus();
		return;
	}
	
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberSmsList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid1.setEnabled(false);
			gridRoot1.addLoadingBar();
		},
		success:function(data){
			
			if(typeof data.list != "undefiend" && data.list != null)
			{
				//그리드1 데이터 조회
				gridData = data.list;
				gridApp1.setData(gridData);
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

//grid 오른쪽으로 데이터 옮기기 버튼
function fn_btn_right()
{
	//첫번째 로우에 값이 들어 있는경우 (grid를 불러왔을경우)
	if(gridRoot1.getItemAt(0) != null){
		//전체삭제
		gridRoot2.removeAll();
		
		var sItemArr = selectorColumn1.getSelectedIndices();
		
		for (var i = 0; i < sItemArr.length; i++) {
			//clone하지 않으면  grid자체 오류가 발생할수있다
			dataRow = gridRoot1.clone(gridRoot1.getItemAt(sItemArr[i]));
			gridRoot2.addItemAt(dataRow);
			
			gridRoot2.setItemFieldAt(dataRow["BUSI_NAME"], i, "BUSI_NAME");
			gridRoot2.setItemFieldAt(dataRow["CUST_NAME"], i, "CUST_NAME");
			gridRoot2.setItemFieldAt(dataRow["MOBIL_NO"], i, "MOBIL_NO");
			gridRoot2.setItemFieldAt(dataRow["CORP_CODE"], i, "CORP_CODE");
			gridRoot2.setItemFieldAt(dataRow["CUST_NO"], i, "CUST_NO");
			gridRoot2.setItemFieldAt(dataRow["SALE_AMT_SUM"], i, "SALE_AMT_SUM");
		}
	}
}

//grid 오른쪽 데이타 삭제
function fn_btn_left()
{
	//선택행 삭제
	gridRoot2.removeSelectorColumnSelectedIndices("selector");
	
}

// 예약실행
function fn_btn_exce()
{
	if($("#D_MEMO").val() == null || $("#D_MEMO").val() == "")
	{
		alert(contents + msgConfirm);
		$("#D_MEMO").focus();
		return;
	}
	
	if($("#D_RESULT").val() == "R")	// 예약전송시
	{
		if($("#D_SEND_DT").val() == null || $("#D_SEND_DT").val() == "")
		{
			alert(reservationDate + msgConfirm);
			$("#P_SEND_DT").focus();
			return;
		}
		$("#D_RESERVE_TIME").val($("#D_RESERVE_HOUR").val()+$("#D_RESERVE_MIN").val());
	}
	
	// SMS발송대상자 체크
	var changedData = gridRoot2.getChangedData();
	if(changedData.length < 1)
	{
		alert(msgSmsNoReception);	// SMS 수신자를 선택해주세요.
		return;
	}
	
	fn_strCheck($("#D_MEMO").val());
	
	// SMS발송대상자 저장
	setMemList(changedData);
	
	var param = $("#frm").serializeArray();
	
	jQuery.ajax({
	    url:"/memberSmsSend.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					alert(msgSendSuccess);
					gridApp2.setData([]);
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
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 문자 발송대상자 파라미터 조합
function setMemList(changedData)
{
	/* 회원카드 정보 셋팅
	 * 수정 작업 결과 가져오기 (그리드에서 작업된 입력,수정,삭제 내용을 가져옵니다)
	 * 데이터는 배열 형태로
	 * idx: 행번호
	 * job: 수행 작업 (I:입력, U:수정, D:삭제)
	 * data: 행의 자료
	 * 를 가지고 있으며 삭제가 먼저 오도록 정렬되어 있습니다.
	 */
	//var changedData = gridRoot2.getChangedData();
	var paramData = "";
	
	if (changedData.length > 0)
	{
		// D_MEM_LIST 파리미터에 아래와 같은 형식의 스트링을 ',' '|' 두개의 구분자로 서버에전송 = '111|222|333,111|222|333,111|222|333'
		/* 업체명   |회원명	|카드번호|기업코드 |회원번호
		 * BUSI_NAME|CUST_NAME |MOBIL_NO|CORP_CODE|CUST_NO
		 */
		var data;
		for (var i = 0; i < changedData.length; i++)
		{
			//console.log("index:"+changedData[i].idx+"\n"+"job:"+changedData[i].job+"\n"+"data:"+changedData[i].data);
			
			data = changedData[i].data;
			if(paramData != "")
			{
				paramData += ",";
			}
			
			paramData += CommonJs.isNullToString(data.BUSI_NAME, "") + "|" + CommonJs.isNullToString(data.CUST_NAME, "") + "|" + CommonJs.isNullToString(data.MOBIL_NO, "") + "|" + data.CUST_NO + "|" + data.STR_CODE;
		}
		$("#D_MEM_LIST").val(paramData);
	}
	//console.log(paramData);
}

// 비회원 즉시발송
function fn_btn_exce2()
{
	if($("#D_MEMO2").val() == null || $("#D_MEMO2").val() == "")
	{
		alert(contents + msgConfirm);
		$("#D_MEMO2").focus();
		return;
	}
	
	fn_strCheck($("#D_MEMO2").val());
	
	var param = $("#frm").serializeArray();
	
	jQuery.ajax({
	    url:"/memberSmsSend2.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					alert(msgSendSuccess);
					gridApp2.setData([]);
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
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 그리드 초기화
function gridReset()
{
	// 검색 영역 초기화
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().before(0, 0, 7).getDate("yyyy-mm-dd"); // 일주일전 before(년,월,일)
	
	$("#P_GONG_DT").val(beforeDate);
	$("#P_END_DT").val(date);
	
	$("#P_SALE_AMT_S").val("0");
	$("#P_SALE_AMT_E").val("9999999999");
	
	$("#P_MOD_CUST_CNT").val("0");
	
	$("#P_BUSI_FLAG").val("");
	$("#P_MBR_GRADE").val("");
	$("#P_CUST_NAME").val("");
	
	// 그리드 영역 초기화
	gridApp1.setData([]);
	gridApp2.setData([]);
	
	$("#D_SMS_FLAG").val("01");
	$("#D_MEMO").val("");
	$("#D_SEND_DT").val("");
	$("#D_RESERVE_HOUR").val("00");
	$("#D_RESERVE_MIN").val("00");
	
	$("#D_MOBIL_NO2").val("");
	$("#D_SMS_FLAG2").val("");
	$("#D_MEMO2").val("");
}

function fn_strCheck(str)
{
	var strLength = CommonJs.getBytes(str);
	
	if(strCheck == false && strLength > 85)
	{
		strCheck = true;
		alert(msgSendMMS);	// SMS 문자길이를 초과하여 MMS 로 전송 됩니다.
		$("#D_KIND").val("M");
	}
	else if(strCheck == true && strLength <= 85)
	{
		strCheck = false;
		alert(msgSendSMS);	// SMS 로 전환되어 발송됩니다.
		$("#D_KIND").val("S");
	}
}

$(document).ready(function () {
	
	//최초 도움말 불러오기
	setHelpMessage($(location).attr("pathname").replace("/",""));
	
	// 그리드 너비제어
	$("#gridHolder1, #gridHolder2").width(($(window).width()-92)/2);
	$("#gridHolder1, #gridHolder2").height(300);
	
	$(".sms_send").parent().width(($(window).width()-58)*0.5);
	
	//$(".f_l .sms_send input[type='text'], .f_l .sms_send select, .f_l .sms_send textarea").width(($(window).width()-58)*0.5-60);
	//$(".f_r .sms_send input[type='text'], .f_r .sms_send select, .f_r .sms_send textarea").width(($(window).width()-58)*0.5-85);
	
	$(window).on('resize',function (){	
		$("#gridHolder1, #gridHolder2").width(($(window).width()-92)/2);
		$("#gridHolder1, #gridHolder2").height(300);
		
		$(".sms_send").parent().width(($(window).width()-58)*0.5);
		
		//$(".f_l .sms_send input[type='text'], .f_l .sms_send select, .f_l .sms_send textarea").width(($(window).width()-58)*0.5-60);
		//$(".f_r .sms_send input[type='text'], .f_r .sms_send select, .f_r .sms_send textarea").width(($(window).width()-58)*0.5-85);
	});
	
	//달력설정
	//$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().before(0, 0, 7).getDate("yyyy-mm-dd"); // 일주일전 before(년,월,일)
	
	$("#P_GONG_DT").val(beforeDate);
	$("#P_END_DT").val(date);
	
	// 달력체크
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var gongDt = parseInt($("#P_GONG_DT").val().replace(/-/g, ""));
			var endDt = parseInt($("#P_END_DT").val().replace(/-/g, ""));
			var sendDt = parseInt($("#D_SEND_DT").val().replace(/-/g, ""));
			var nowDt = parseInt(date.replace(/-/g, ""));
			
			if(this.id == "D_SEND_DT")
			{
				if(sendDt < nowDt)
				{
					alert("현재일보다 작을수 없습니다.");
					$("#D_SEND_DT").val(date);
					return;
				}
			}
			else
			{
				if(gongDt > endDt)
				{
					alert(msgStartDateAndEndDate);
					
					if(this.id == "P_GONG_DT")
						$("#P_GONG_DT").val(beforeDate);
					else if(this.id == "P_END_DT")
						$("#P_END_DT").val(date);
					
					return;
				}
			}
			
		},showMonthAfterYear:true
	});
	
	// 매출금액 처리
	$("#P_SALE_AMT_S").number( true, 0 );
	$("#P_SALE_AMT_E").number( true, 0 );
	
	// 숫자만 입력 처리
	try {
		
		//CommonJs.addInputHandler({input:$("#P_TRXN_NO_CNT"), dataType:"N", maxlength:"5"});
    } catch(e) {
    	console.log(e);
    }
	
	getCommonCodeSelectBoxList("P_MBR_GRADE", "MBR_GRADE");		// 회원등급
	getCommonCodeSelectBoxList("P_BUSI_FLAG", "BUSI_FLAG");		// 회원구분
	getCommonCodeSelectBoxList("D_SMS_FLAG", "SMS_FLAG");		// SMS기본문자
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		gridApp2.setData([]);
		getGridData();
	});
	
	// 저장 (즉시발송)
	$("#btn_update").click(function() {
		$("#D_RESULT").val("0");	// 즉시전송
		fn_btn_exce();
	});
	
	// 신규 (초기화)
	$("#btn_new").click(function() {
		gridReset();
	});
	
	// 회원정보 오른쪽 옮기기
	$("#btn_right").click(function() {
		fn_btn_right();
	});
	
	// 회원정보 오른쪽 삭제
	$("#btn_left").click(function() {
		fn_btn_left();
	});
	
	// 예약실행
	$("#btn_exce").click(function() {
		$("#D_RESULT").val("R");	// 예약전송
		fn_btn_exce();
	});
	
	// 비회원 즉시발송
	$("#btn_exce2").click(function() {
		$("#D_RESULT").val("0");	// 즉시전송
		fn_btn_exce2();
	});
	
	$("#D_MEMO").keyup(function() {
		
		CommonJs.displayBytesTxt2(this, 'txtbyte');
		
		var str = $(this).val();
		fn_strCheck(str);
	});
	
	$("#D_MEMO2").keyup(function() {
		
		CommonJs.displayBytesTxt2(this, 'txtbyte2');
		
		var str = $(this).val();
		fn_strCheck(str);
	});
	
	// 회원구분 체인지 이벤트 (회원구분 변경시 회원등급 리스트 재조회)
	$("#P_BUSI_FLAG").change(function() {
		getCommonCodeGradeSelectBoxList("P_MBR_GRADE", "MBR_GRADE", $("#P_BUSI_FLAG").val(), true);	// 회원등급
	});
	
});
