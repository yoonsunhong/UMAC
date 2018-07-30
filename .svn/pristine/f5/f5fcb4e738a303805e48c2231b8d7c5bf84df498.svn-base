/********************************************************
 * 설명:  영업정보 > 영업관리 > 교환권출력현황
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 윤태희
 * since	: 2017.08.25
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridPopupApp, gridPopupRoot, dataPopupGrid, dataPopupRow, clickPopupData;

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
rMateGridH5.create("gridPopup", "gridUser_Holder26", jsVars1, "100%", "250px");


//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

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
	}else if(id == "gridPopup"){
		// rMateGrid 관련 객체
		gridPopupApp = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridPopupRoot = gridPopupApp.getRoot(); // 데이터와 그리드를 포함하는 객체
		//그리드1에 헤더 및 레이아웃 셋팅
		gridPopupApp.setLayout(layoutStrPopup);
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataPopupRow = gridPopupRoot.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataPopupGrid.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickPopupData = dataPopupRow[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#U_CALLBACK_NM1").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_event_callback(dataPopupRow);
			}
			btn_user_close();
		};
		
		var enterClickHandler = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataPopupGrid.getSelectedIndex();
			dataPopupRow = gridPopupRoot.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#U_CALLBACK_NM1").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_event_callback(dataPopupRow);
			}			
			btn_user_close();
		};

		var layoutCompleteHandlerPopup = function(event){
			dataPopupGrid = gridPopupRoot.getDataGrid();  // 그리드 객체
			dataPopupGrid.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataPopupGrid.addEventListener("itemDoubleClick", itemClickHandler);
			dataPopupGrid.addEvent("keydown", enterClickHandler);

		};
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅		
		gridPopupRoot.addEventListener("layoutComplete", layoutCompleteHandlerPopup);

		//조회 완료 후 포커스 
		var dataCompleteHandlerPopup = function(event) { 
			dataPopupGrid = gridPopupRoot.getDataGrid();    // 그리드 객체
			dataPopupGrid.setSelectedIndices([0]);
			dataPopupGrid.setVerticalScrollPosition(0);  
			dataPopupGrid.focus(); 
		 };
		 gridPopupRoot.addEventListener("dataComplete", dataCompleteHandlerPopup);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {

}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" verticalAlign="middle" sortableColumns="true" >\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" />\
				<DataGridColumn dataField="SALE_DT"  headerText="'+selngDate+'" textAlign="center" />\
				<DataGridColumn dataField="POS_NO" headerText="'+posNumber+'" textAlign="center" />\
				<DataGridColumn dataField="TRXN_NO" headerText="'+dealingsNumber+'"  textAlign="center" />\
				<DataGridColumn dataField="CUST_NO" headerText="'+cusNo+'" textAlign="center"  />\
				<DataGridColumn dataField="CUST_NAME"   headerText="'+cusName+'" textAlign="center"  />\
				<DataGridColumn dataField="CARD_NO"   headerText="'+cardNumber+'" textAlign="center"  />\
				<DataGridColumn dataField="MBR_DSNT"   headerText="'+cardCompanyNm+'" textAlign="center"/>\
				<DataGridColumn dataField="EXCHG_ISSUED_CNT"   headerText="발행수량" textAlign="right" id="dg1col9" formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_AMT"   headerText="'+selngAm+'" textAlign="right" id="dg1col10" formatter="{numfmt}"/>\
				<DataGridColumn dataField="CANC_FLAG"   headerText="'+cancelFlag+'" textAlign="center" />\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="EMP_NO"  headerText="" textAlign="center" visible="false"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="STR_NAME"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
			<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg1col9}"  textAlign="right"/>\
					<DataGridFooterColumn		summaryOperation="SUM" formatter="{numfmt}" dataColumn="{dg1col10}"  textAlign="right"/>\
				</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';

var layoutStrPopup =
	'<rMateGrid>\
			<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
			<DataGrid id="dg1" sortableColumns="false" showDataTips="true"  horizontalScrollPolicy="auto" lastColumnWidthPolicy="balance" >\
				<groupedColumns>\
					<DataGridColumn dataField="CORP_CODE" 	headerText="법인코드" 	visible="false"	width="100" 	textAlign="center"/>\
					<DataGridColumn dataField="STR_CODE" 	headerText="점포코드" 	visible="false"	width="100" 	textAlign="center"  />\
					<DataGridColumn dataField="EVT_CODE" 	headerText="행사코드" 	width="80" 	textAlign="center"  />\
					<DataGridColumn dataField="EVT_NAME" 	headerText="행사명" 	width="200" textAlign="left"  />\
					<DataGridColumn dataField="EVT_FLAG_NM" headerText="행사구분" 	width="80" 	textAlign="left"  />\
					<DataGridColumn dataField="EVT_STR_DT" 	headerText="시작일" 	width="100" textAlign="center" formatter="{datefmt}" />\
					<DataGridColumn dataField="EVT_END_DT" 	headerText="종료일" 	width="100" textAlign="center" formatter="{datefmt}" />\
				</groupedColumns>\
			</DataGrid>\
	</rMateGrid>';

//목록 그리드 조회
function getGridData() {
	var param 			= $("#frm").serializeAllObject();
	var sDt 			= $("#S_SALE_DT").val().replace(/-/g, "");
	var eDt 			= $("#S_SALE_DT_E").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#S_SALE_DT").val().split("-");
	var P_END_DT_ARR 	= $("#S_SALE_DT_E").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if($("#S_SALE_DT").val() == null || $("#S_SALE_DT").val() == "")
	{
		alert("영업일자" + msgConfirm);
		$("#S_SALE_DT").focus();
		return;
	}
	
	if($("#S_SALE_DT_E").val() == null || $("#S_SALE_DT_E").val() == "")
	{
		alert("영업일자" + msgConfirm);
		$("#S_SALE_DT_E").focus();
		return;
	}
	
	if(sDt > eDt)
	{
		alert(msgDateValidation);
		$("#S_SALE_DT_E").focus();
		return;
	}
	
	if($("#S_EVT_NO").val() == null || $("#S_EVT_NO").val() == "")
	{
		alert("행사명" + msgConfirm);
		$("#S_EVT_NO").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#S_SALE_DT").focus();
		return;
	}

	param.S_STR_CODE = $("#S_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/businessExchangePrintList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			gridRoot1.addLoadingBar();
			dataGrid1.setEnabled(false);
		},
		success:function(data){
			gridData = data.list;
			gridApp1.setData(gridData);
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


function fn_event_callback(dataRow){
	$("#S_EVT_NO").val(dataRow.EVT_CODE);
	$("#P_EVT_CODE").val( dataRow.EVT_CODE ) ;
	$("#P_EVT_NAME_V").val( dataRow.EVT_NAME ) ;
	$("#P_SALES_SD2").val( dataRow.EVT_STR_DT ) ;
	$("#P_SALES_ED2").val( dataRow.EVT_END_DT ) ;
}



/*function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportFileName = "행사상품로그조회_"+date+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);		
}*/

//엑셀다운로드
function excelExport()
{
	var frm 			= document.frm;
	var sDt 			= $("#S_SALE_DT").val().replace(/-/g, "");
	var eDt 			= $("#S_SALE_DT_E").val().replace(/-/g, "");
	var P_STR_DT_ARR	= $("#S_SALE_DT").val().split("-");
	var P_END_DT_ARR 	= $("#S_SALE_DT_E").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if($("#S_SALE_DT").val() == null || $("#S_SALE_DT").val() == "")
	{
		alert("영업일자" + msgConfirm);
		$("#S_SALE_DT").focus();
		return;
	}
	
	if($("#S_SALE_DT_E").val() == null || $("#S_SALE_DT_E").val() == "")
	{
		alert("영업일자" + msgConfirm);
		$("#S_SALE_DT_E").focus();
		return;
	}
	
	if(sDt > eDt)
	{
		alert(msgDateValidation);
		$("#S_SALE_DT_E").focus();
		return;
	}
	
	if($("#S_EVT_NO").val() == null || $("#S_EVT_NO").val() == "")
	{
		alert("행사명" + msgConfirm);
		$("#S_EVT_NO").focus();
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#S_STD_STR_DT").focus();
		return;
	}
	
	frm.action = "/businessExchangePrintListExcel.do";
	frm.method = "post";
   	frm.submit();
}

//점포명 체인지 이벤트 (onchange 시, 행사명 select box 다시 불러옴.
function changeTopSelectStrCode(STR_CODE) {
	$("#S_STR_CODE").html("<option value=\"\">" + all + "</option>");	//점포 select box 초기화
	getStoreCode("S_STR_CODE");		//점포 select box 다시 불러오기
	$("#S_STR_CODE").val(STR_CODE);//바뀐 점포코드 value
	
	
	//행사명 콤보 가져오기
	getEventBOx("S_EVT_NO",$("#S_STR_CODE").val(),$("#S_SALE_DT").val(),$("#S_SALE_DT_E").val(),true,true);
	
	$('#S_EMP_NO').val("");
	
}


//행사명 체인지 이벤트 (onchange 시, 행사명 코드 값 변겅
function chnageEvtCode(P_EVT_CODE){
	$('#P_EVT_CODE').val(P_EVT_CODE);
}



$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	/*getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);*/
	
	// 점포코드 콤보 가져오기
	getStoreCode("S_STR_CODE");
	$("#S_STR_CODE").val($("#SESSION_STR_CODE").val());
	
	$("#P_EVT_CODE").number( false, 0 );
	
	
	//달력설정
	//$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var date_only_one = new CommDateManager().getDate("yyyy-mm-01");	//초기 화면 로딩시 시작 날짜 1일로 셋팅
	$("#S_SALE_DT").val(date_only_one);
	$("#S_SALE_DT_E").val(date);
	
	// 달력체크
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var gongDt = parseInt($("#S_SALE_DT").val().replace(/-/g, ""));
			var endDt = parseInt($("#S_SALE_DT_E").val().replace(/-/g, ""));
			if(gongDt > endDt)
			{
				alert(msgStartDateAndEndDate);
				
				if(this.id == "S_SALE_DT")
					$("#S_SALE_DT").val(date);
				else if(this.id == "S_SALE_DT_E")
					$("#S_SALE_DT_E").val(date);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
	
	//행사명 콤보 가져오기
	getEventBOx("S_EVT_NO",$("#P_STR_CODE").val(),$("#S_SALE_DT").val(),$("#S_SALE_DT_E").val(),true,true);

	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 160 );
	
	$(window).on('resize',function (){	
		
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 160 );
		
	});	

	//조회
	$("#btn_search").click(function(){
		getGridData();
	});	
	
	$("#btn_excel_down").click(function(){
		excelExport();
	});		
	
	
	$(function() {
		$("#user_pop_wrap1").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 700,
		    height : 483,
		    resizable : false,
		    open: function(){
		    	$("body").css("overflow-y", "hidden");
		        },
		        close: function(){
		    	$("body").css("overflow-y", "scroll");
		        }
		});	
	});
	
	var EVT_STR_DT =new CommDateManager().getDate("yyyy-mm-01"); // 날짜 시작값 1일로 셋팅
	var EVT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#P_EVT_STR_DT').val(EVT_STR_DT);
	$('#P_EVT_END_DT').val(EVT_END_DT);
	
	//행사 팝업에서 엔터
	$("input[name=P_TEXT]").keydown(function (key) { 
	    if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
	    	btn_pop_search();
	    } 
	});

});




btn_evt_search = function(){
	// 행사 popup
	$("#user_pop_wrap1").dialog("open");	
	gridPopupApp.resize();
	btn_pop_search();
};

btn_user_close=function(){
	$("#user_pop_wrap1").dialog("close");
};

btn_pop_search = function(){
	gridPopupRoot.addLoadingBar();
	jQuery.ajax({ 
	    url:"/commonSearch.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'P_STR_CODE' : $("#S_STR_CODE").val()
					,'P_EVT_NAME' : $("#P_U_TEXT17").val()
					,'P_SALES_SD' : $("#P_EVT_STR_DT").val()
					,'P_SALES_ED' : $("#P_EVT_END_DT").val()
					,'URL' :'itemSalesState.itemSalesEventPopupList'
				},
		success:function(data){
			var returnCode = eval(data['code']);
			var returnValue = "";
			if(returnCode == "9999"){
				returnValue = data['Alert'];
			}else{
				returnValue = eval(data['list']);
				gridPopupApp.setData(returnValue);				
			}
			
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	gridPopupRoot.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	gridPopupRoot.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
};