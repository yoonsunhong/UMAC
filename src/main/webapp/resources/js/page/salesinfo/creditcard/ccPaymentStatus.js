/********************************************************
 * 설명: 영업분석 > 매출정보 > 신용카드지불현황 메뉴화면
 * 수정일      수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author   : 최 호 정
 * since    : 2017.06.05
 * version  : 1.0
 ********************************************************/

$(document).ready(function () {
	//최초 도움말 불러오기
	setHelpMessage($(location).attr('pathname').replace('/',''));
	init();
});

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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1, collection1;

var gridData1 = [];

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

		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

function itemDataChangeHandler1(event){
	var rowIndex = event.rowIndex;                  // 변경된 행번호
    var columnIndex = event.columnIndex;        // 변경된 열번호
    var dataField = event.dataField;                // 변경된 열의 데이터 필드
    var dataRow = gridRoot1.getItemAt(rowIndex); // 변경된 데이터 레코드
    var oldValue = event.value;                     // 변경전 값
    var newValue = event.newValue;                  // 변경후 값
    
    card_no = gridRoot1.getItemFieldAt( rowIndex , "CARD_NO");
 
   // alert("로우인덱스:"+ rowIndex);
    //alert("컬럼인덱스:"+ columnIndex);
	if (dataField == "CARD_PREFIX") {
		if (newValue == null || newValue == ""){
			//값을 입력하세요.
			alert(mentWmsIn1);
			gridRoot1.setItemFieldAt(oldValue, rowIndex , "CARD_PREFIX");
			saveFlag="N";
			return;
		}else if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot1.setItemFieldAt(oldValue, rowIndex , "CARD_PREFIX");
			saveFlag="N";
			return;
		}else if(newValue.length != 6){
			//현재고수량보다 값이 클 수 없습니다.
			alert("6자리의 숫자로 입력 하세요.");
			gridRoot1.setItemFieldAt(oldValue, rowIndex , "CARD_PREFIX");
			saveFlag="N";
			return;
		}else{
			 //최종 확정 입고금액 셋팅
			 gridRoot1.setItemFieldAt(newValue, rowIndex , "CARD_PREFIX");
			 gridRoot1.setItemFieldAt( newValue+card_no.substring(7), rowIndex , "CARD_NO");
			 saveFlag="Y";
		 }
	}
	
	if (dataField == "SALE_AMT") {
		if (newValue == null || newValue == ""){
			//값을 입력하세요.
			alert(mentWmsIn1);
			gridRoot1.setItemFieldAt(oldValue, rowIndex , "SALE_AMT");
			saveFlag="N";
			return;
		}else if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot1.setItemFieldAt(oldValue, rowIndex , "SALE_AMT");
			saveFlag="N";
			return;
		}else if(newValue.length > 9){
			//현재고수량보다 값이 클 수 없습니다.
			alert("9자리까지 입력이 가능합니다.");
			gridRoot1.setItemFieldAt(oldValue, rowIndex , "SALE_AMT");
			saveFlag="N";
			return;
		}else{
			 //최종 확정 입고금액 셋팅
			 gridRoot1.setItemFieldAt(newValue, rowIndex , "SALE_AMT");
			 saveFlag="Y";
		 }
	}
}

//그리드1 헤더 및 레이아웃
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr" styleName="allTotalStyle" backgroundColor="#FFF19F"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD" returnValueWhenError="true" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<DataGrid id="dg1" editable="true"   sortableColumns="true" showDataTips="true"  itemRenderer="EditableIconItem"  horizontalScrollPolicy="auto" lastColumnWidthPolicy="balance"  itemEditBeginningJsFunction="itemFunc">\
			<groupedColumns>\
				<DataGridColumn  dataField="SALE_DT"          headerText="'+selngDate+'"        width="100" textAlign="center" formatter="{datefmt}"  editable="false"  />\
				<DataGridColumn  dataField="POS_NO"           headerText="'+pos+'"              width="80"  textAlign="center" editable="false" />\
				<DataGridColumn  dataField="TRXN_NO"          headerText="'+dealingsNumber+'"   width="100" textAlign="center" editable="false" />\
				<DataGridColumn  dataField="CANC_FLAG_STR"    headerText="'+cancelFlag+'"       width="80"  textAlign="center" editable="false" />\
				<DataGridColumn  dataField="CARD_PREFIX"        headerText="CARD_PREFIX"   width="100" textAlign="center" showEditableIcon="always" />\
				<DataGridColumn  dataField="CARD_NO"          headerText="'+cardNo+'"           width="140" textAlign="center" editable="false" />\
				<DataGridColumn  dataField="APP_NO"           headerText="'+consentNumber+'"    width="100" textAlign="center" editable="false" />\
				<DataGridColumn  dataField="PAY_PERIOD"       headerText="'+payPeriod+'"        width="80"  textAlign="center" editable="false"  />\
				<DataGridColumn  dataField="SALE_AMT"         headerText="'+selngAmount+'"      id="dg1col1" width="100" textAlign="right" formatter="{numfmt}" showEditableIcon="always" />\
				<DataGridColumn  dataField="CARD_COM_NM"      headerText="'+cardCompany+'"      width="100" textAlign="center" editable="false" />\
				<DataGridColumn  dataField="APP_INQ_TYPE_STR" headerText="'+slCardAppInqType+'" width="80"  textAlign="center" editable="false" />\
				<DataGridColumn  dataField="POS_TIMES"        headerText="'+slCardSaleTime+'"   width="100" textAlign="center" editable="false" />\
				<DataGridColumn  dataField="SEQ"        headerText="'+slCardSaleTime+'"   width="100" textAlign="center" visible="false" editable="false"  />\
				<DataGridColumn  dataField="STR_CODE"        headerText="'+slCardSaleTime+'"   width="100" textAlign="center" visible="false" editable="false"  />\
			</groupedColumns>\
			<footers>\
			<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col1}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
			</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';

//----------------------- 그리드 설정 끝 -----------------------
var saveFlag="Y";
function btn_saveCheck() {
    myVar = setTimeout(btn_update, 500);
}

//저장
function btn_update(){
	
	if(saveFlag == "N"){
		saveFlag = "Y";
		return;
	}

	
	 var changedDataXML = gridRoot1.getChangedDataXML();
	if (changedDataXML == null){
		alert("변경된 자료가 없습니다");
		return;
	}
	var gridXmlData =  "<GRIDLIST>"+changedDataXML+"</GRIDLIST>" ;
		//저장하시겠습니까?
		if(confirm(msgSaveConfirm) == false) return;
		
		//입고수량 저장
		jQuery.ajax({ 
		    url:"/saveCcPaymentStatus.do",         
		    type:"POST",
			datatype:"xml",
			async:false,
			data: {"gridXmlData" : gridXmlData}, 
			success:function(data){  
				//결과리턴
				var obj = jQuery.parseJSON(data.CUR);
				if(  obj[0].RETURN_CODE  == "0000")
				{   
					//저장되었습니다.
					alert(msgSave);
					//조회
					getGridData() 
				}else{
					//요청중 문제가 발생했습니다.관리자에게 문의하세요.
					alert(msgErrorDefault);
					return;
				}
		    },
		    complete : function(data) {
		    	 
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
}



//해당 점포의 POS 가져오기
function getPosList() {
	var html = "";
	
	$("#S_STR_CODE").removeAttr("disabled");
	
	if($("#S_STR_CODE").val() == "")
	{
		$("#S_POS_NO").html("<option value=\"\">" + all + "</option>");
		return;
	}
	var param = $("#search_frm").serializeArray();
	
	$("#S_STR_CODE").attr("disabled","true");
	
	jQuery.ajax({ 
		url:"/getPosList.do",
		type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			if(typeof data != "undefined" && data != null)
			{
				html += "<option value=\"\">" + all + "</option>";
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].POS_NO + "\">" + data[i].POS_NAME + "</option>";
				}
				$("#S_POS_NO").html(html);
			}
		},
		complete : function(data) {
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

String.prototype.cut = function(len) {
	var str = this;
	var l = 0;
	for (var i=0; i < str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len)
			return str.substring(0,i);
	}
	return str;
}

//미등록 카드만 수정가능하게
function itemFunc(rowIndex, columnIndex, item, dataField){
	var cardNm = gridRoot1.getItemFieldAt( rowIndex , "CARD_COM_NM");
	var appType = gridRoot1.getItemFieldAt( rowIndex , "APP_INQ_TYPE_STR");
	if(cardNm=="미등록카드" && appType == "수기"){
		if( columnIndex == 4 || columnIndex == 8){
			return true;  //return 값이 true면 editable이 가능하고. false면 editable이 불가능합니다.
		}
	}else if(cardNm=="미등록카드"){
		if( columnIndex == 4 ){
			return true;  //return 값이 true면 editable이 가능하고. false면 editable이 불가능합니다.
		}
	}else if(appType == "수기"){
		if( columnIndex == 8 ){
			return true;  //return 값이 true면 editable이 가능하고. false면 editable이 불가능합니다.
		}
	}
	else{
		return false;
	}
}

function getChangedDataXML() {
var changedDataXML = gridRoot1.getChangedDataXML();
	if (changedDataXML == null){
		alert("변경된 자료가 없습니다");
	}else{
		alert(changedDataXML);
	}
}
	// labelJsFunctin 기능을 이용하여 Selected 컬럼을 true/false대신 Yes,No로 바꿉니다.
function convertYesNo(item, value, column) {
if (column.getDataField() == "Selected") {
// 데이터가 xml인 경우에는 문자열 비교를 하셔야 합니다.
		if (value == true){
			return "Yes";
		}else{
			return "No";
		}
	}
	return "";
}
//목록 그리드 조회
function getGridData() {
	var params 			= $("#search_frm").serializeAllObject();
	var strDt 			= $("#S_STR_DATE").val().replace(/-/g, "");
	var endDt 			= $("#S_END_DATE").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#S_STR_DATE").val().split("-");
	var P_END_DT_ARR 	= $("#S_END_DATE").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if($("#S_STR_DATE").val() == null || $("#S_STR_DATE").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#S_STR_DATE").focus();
		return;
	}
	if( $("#S_END_DATE").val() == null || $("#S_END_DATE").val() == "")
	{
		alert(selngDate + msgConfirm);
		$("#S_END_DATE").focus();
		return;
	}

	if(strDt > endDt)
	{
		alert(msgDateValidation);
		$("#S_END_DATE").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#S_STR_DATE").focus();
		return;
	}

	if ($("#S_CARD_CODE").val() != null && $("#S_CARD_CODE").val() != "")
	{
		var target = document.getElementById("S_CARD_CODE");
		var cardNm = target.options[target.selectedIndex].text;
		cardNm = cardNm.cut(4);
		//alert("card name="+cardNm);
		$("#S_CARD_NAME").val(cardNm);
	}
	else
	{
		$("#S_CARD_NAME").val("");
	}

	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	gridRoot1.addLoadingBar();
	
	jQuery.ajax({
		url:"/ccPaymentStatusList.do",
		type:"POST",
		datatype:"json",
		async:false,
		data: params,
		beforeSend : function(){
			gridRoot1.removeAll();
		},
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			var returnCode = eval(data['code']);
			var returnValue = "";
			if(returnCode == "9999"){
				returnValue = data['Alert'];
				//alert(returnValue);
			}else{
				returnValue = eval(data['result']);
				gridApp1.setData(returnValue);
			}
			gridRoot1.removeLoadingBar();
		},
		complete : function(data) {
			gridRoot1.removeLoadingBar();
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
			gridRoot1.removeLoadingBar();
		}
	});
}

function excelExport(){
	var nowDate = new CommDateManager().getDate("yyyymmdd");
	var str_name = $("#S_STR_CODE option:selected").text();
	dataGrid1.exportFileName = "신용카드지불현황"+nowDate+"_"+str_name+"_"+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}

function init() {
	// 점포코드 콤보 가져오기
	getStoreCode("S_STR_CODE");
	//$("#search_frm select[id='S_STR_CODE']").val(SSSC).prop("selected", true);
	$("#search_frm select[id='S_STR_CODE']").val($("#SESSION_STR_CODE").val());
	getPosList('0');

	//달력설정
	$("#S_STR_DATE").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_STR_DATE").val() > $("#S_END_DATE").val()){
					alert(msgDateValidation);
					$("#S_STR_DATE").val(CUR_DT);
					return;
			}
		}, showMonthAfterYear:true
	});
	$("#S_END_DATE").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd");
			if($("#S_STR_DATE").val() > $("#S_END_DATE").val()){
					alert(msgDateValidation);
					$("#S_END_DATE").val(CUR_DT);
					return;
			}
		 }, showMonthAfterYear:true
	});
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().before(0, 0, 1).getDate("yyyy-mm-dd");
	$("#S_STR_DATE").val(beforeDate);
	$("#S_END_DATE").val(date);
	
	$("#P_SELNG_AMOUNT1").number(true);
	$("#P_SELNG_AMOUNT2").number(true);

	// 취소구분 (전표)
	getCommonCodeSelectBoxList("S_CANC_FLAG", "CANC_FLAG");

	// 카드사
	getCommonCodeSelectBoxList("S_CARD_CODE", "CARD_CODE");

	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 137 );

	$(window).on('resize',function (){
		$("#gridHolder1").width("100%");
		$("#gridHolder1").height( $(window).height() - 137 );
	});

	// 점포명 체인지 이벤트
	$("#S_STR_CODE").change(function(){
		getPosList('0');
	});
	
	//조회
	$("#btn_search").click(function(){
		getGridData();
	});

	$("#btn_excel_down").click(function(){
		excelExport();
	});

}


$(document).ready(function () {
	
	//사용자 권한정보 조회
	 var psotValue = {};
	 
	 jQuery.ajax({ 
		    url:"/selectUserOrgType.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: psotValue,
			success:function(data){  
				var sessionGroupCode = data[0].GROUP_CODE;
				if(sessionGroupCode == "ROLE001" || sessionGroupCode == "ROLE025" || sessionGroupCode == "ROLE026" || sessionGroupCode == "ROLE002"){
					$("#S_STR_CODE").attr("disabled", false);
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	
});