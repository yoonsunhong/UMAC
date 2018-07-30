/********************************************************
 * 설명:  외상매출관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2017.02.12
 * version : 1.0
 ********************************************************/

var selectedIndex = -1;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();

var src1, src6;	// 그리드1 데이터 담기
var alimtalkList;	// 알림톡 대상 key 셋팅

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
	
	var SALE_STR_DT =new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var SALE_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#top_search input[name=P_SALE_STR_DT]').val(SALE_STR_DT);
	$('#top_search input[name=P_SALE_END_DT]').val(SALE_END_DT);
	
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 350,
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
			var startDate = parseInt($("#top_search input[name=P_SALE_STR_DT]").val().replace(/-/g, ""));
			var endDate = parseInt($("#top_search input[name=P_SALE_END_DT]").val().replace(/-/g, ""));
			if(startDate > endDate)
			{
				alert(msgDateValidation);
				
				if(this.id == "P_SALE_STR_DT")
					$("#top_search input[name=P_SALE_STR_DT]").val(SALE_STR_DT);
				else if(this.id == "P_SALE_END_DT")
					$("#top_search input[name=P_SALE_END_DT]").val(SALE_END_DT);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
	// 점포명 체인지 이벤트
	$("#top_search select[name=P_STR_CODE]").change(function(){
		getPosList();
	});
	
	$('#P_CUST_NAME').on('keydown', function(e) {
		$("#P_CUST_NO").val("");
	    if (e.which == 13) {
	    	btn_comm_user_search();
	    }
	});

});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";
var jsVars3 = "rMateOnLoadCallFunction=gridReadyHandler3";
var jsVars4 = "rMateOnLoadCallFunction=gridReadyHandler4";
var jsVars5 = "rMateOnLoadCallFunction=gridReadyHandler5";
var jsVars6 = "rMateOnLoadCallFunction=gridReadyHandler6";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");
rMateGridH5.create("grid2", "gridHolder2", jsVars2 + "&dataType=xml", "100%", "200px");
rMateGridH5.create("grid3", "gridHolder3", jsVars3, "100%", "200px");
rMateGridH5.create("grid4", "gridHolder4", jsVars4, "100%", "200px");
rMateGridH5.create("grid5", "gridHolder5", jsVars5, "100%", "50px");
rMateGridH5.create("grid6", "gridHolder6", jsVars6);
/*rMateGridH5.create("grid3", "gridHolder3", jsVars3, "100%", "200px");*/

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp1.setLayout(layoutStr);
	gridApp1.setData(gridData1);
	
	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

function layoutCompleteHandler1() {
	
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	// 전체데이터 가져오기
	src1 = collection1.getSource();
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
}

function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	btnSearchLedger(dataRow1);
	btnSearchSlip(dataRow1);
}


//GRID2 Event Handler
function gridReadyHandler2(id) {
	// rMateGrid 관련 객체
	gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp2.setLayout(layoutStr2);
	gridApp2.setData(gridData2);
	
	gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
	gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	
	gridRoot2.addEventListener("itemDataChanged", itemDataChangeHandler2);
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
}

function itemDataChangeHandler2(event) {
	 
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot2.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	
	if(oldValue != newValue){
		if(gridRoot2.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "U" , rowIndex, "INPUT_YN");
		}
	}
	
	if(dataField == "DPOT_FLAG"){
		//gridRoot1.setItemFieldAt("Y", rowIndex, "DPOT_FISH_YN");
		gridRoot2.setItemFieldAt("", rowIndex, "CARD_NO");
		gridRoot2.setItemFieldAt("", rowIndex, "APP_NO");
		gridRoot2.setItemFieldAt("", rowIndex, "PAY_PERIOD");
		gridRoot2.setItemFieldAt("0", rowIndex, "DPOT_AMT");
		
		//현금을 선택할 경우
		if(newValue == "01"){
			var value = {};
			value.rowIndex = rowIndex;
			value.columnIndex = 6;
			dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
		}else if(newValue == "02"){
			var value = {};
			value.rowIndex = rowIndex;
			value.columnIndex = 3;
			dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
		}else if(newValue == "03"){
			gridRoot2.setItemFieldAt( $("#SALE_UPOINT").val() , rowIndex, "DPOT_AMT");
			
			var value = {};
			value.rowIndex = rowIndex;
			value.columnIndex = 6;
			dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
		}
	}
	
	if(dataField == "DPOT_AMT"){

		/*if(newValue < 1){
			alert("입금액은 0 또는 마이너스 일 수 없습니다.");
			gridRoot2.setItemFieldAt(oldValue, rowIndex, "DPOT_AMT");
			return;
		}*/
		
		if(gridRoot2.getItemFieldAt(rowIndex, "DPOT_FLAG") == "04"){
			if(Number(newValue) > Number(gridRoot5.getItemFieldAt(0, "PREPAY_ZAN_AMT"))){
				alert("입금한 금액이 선입금 잔액보다 크기 때문에 입력이 불가능합니다.");
				gridRoot2.setItemFieldAt(oldValue, rowIndex, "DPOT_AMT");
				return;
			}
		}else if(gridRoot2.getItemFieldAt(rowIndex, "DPOT_FLAG") == "03"){
			if(Number(newValue) > Number($("#SALE_UPOINT").val())){
				alert("사용가능한 포인트보다 큽니다.");
				gridRoot2.setItemFieldAt(oldValue, rowIndex, "DPOT_AMT");
				return;
			}
			if(Number(newValue) < 1){
				alert("포인트 사용액은 0 또는 마이너스 일 수 없습니다.");
				gridRoot2.setItemFieldAt(oldValue, rowIndex, "DPOT_AMT");
				return;
			}
		}
	}
	
	if(dataField == "CARD_NO"){
		
		if(newValue.length > 6){
			//alert(newValue.substring(0,6));
			
			//그리드1 데이터 조회 및 그리드 데이터 셋팅
			jQuery.ajax({ 
			    url:"/selectBusinessCreditCard.do",         
			    type:"POST",
				datatype:"json",
				data: {
					'P_CARD_PREFIX' : newValue.substring(0,6)
				},
				success:function(data){  
					if(data.length == 0){
						gridRoot2.setItemFieldAt("", rowIndex, "CARD_NO");
						alert("옳바르지 않은 카드 번호 입니다.");
					}else{
						gridRoot2.setItemFieldAt(newValue.toString(), rowIndex, "CARD_NO");
					}
			    },
			    complete : function(data) {
			    	//로딩바 숨김
			    	hideLoadingBar1();
			    },
			    error : function(xhr, status, error) {
			    	//로딩바 숨김
			    	hideLoadingBar1();
			    	CommonJs.alertErrorStatus(xhr.status, error);
			    }
			});
			
		}else{
			gridRoot2.setItemFieldAt("", rowIndex, "CARD_NO");
			alert("옳바르지 않은 카드 번호 입니다.");
		}
	}
	
	if(dataField == "RCP_DT"){
		
		//그리드1 데이터 조회 및 그리드 데이터 셋팅
		jQuery.ajax({ 
		    url:"/selectBusinessCreditEditAvailable.do",         
		    type:"POST",
			datatype:"json",
			data: {
				'P_STR_CODE' : $("#P_STR_CODE").val()
			,	'P_RCP_DT' : newValue
			},
			success:function(data){  
				if(data.length > 0){
					if(data[0].EDIT_AVAILABLE == "N"){
						alert("해당일자에는 정산이 완료되어 변경이 불가능합니다.");
						gridRoot2.setItemFieldAt(oldValue.toString(), rowIndex, "RCP_DT");
					}
				}
		    },
		    complete : function(data) {
		    	//로딩바 숨김
		    	hideLoadingBar1();
		    },
		    error : function(xhr, status, error) {
		    	//로딩바 숨김
		    	hideLoadingBar1();
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
		
		
	}
}



//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 그리드 객체
	dataGrid2 = gridRoot2.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
	var DPOT_FLAG = gridRoot2.getObjectById("DPOT_FLAG");	
	var dataProvider = [];
	
	var defaultValue = {'label':select, 'code':''};
	dataProvider.push(defaultValue);
	
	var postValue ={};	
	postValue = { "CD_CL"	: "DPOT_FLAG" };
	
	// 공통코드를 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getCommonCodeSelectBoxList.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				var providerValue = {'label':data[i].CD_NM, 'code':data[i].CD_ID};
				dataProvider.push(providerValue);
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	DPOT_FLAG.setItemRendererDataProvider(dataProvider);
	
}

//GRID3 Event Handler
function gridReadyHandler3(id) {
	// rMateGrid 관련 객체
	gridApp3 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot3 = gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp3.setLayout(layoutStr3);
	gridApp3.setData(gridData3);
	
	gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
	gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
}

function layoutCompleteHandler3() {
	dataGrid3 = gridRoot3.getDataGrid();  // 그리드 객체
	
	dataGrid3.setDoubleClickEnabled(true);
	dataGrid3.addEventListener("itemDoubleClick", itemDoubleClickHandler3);
}

//그리드3 컴플릿트 핸들러
function dataCompleteHandler3(event) {
	// 그리드 객체
	dataGrid3 = gridRoot3.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection3 = gridRoot3.getCollection();
}

function itemDoubleClickHandler3(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow3 = gridRoot3.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	//var column = dataGrid1.getDisplayableColumns()[columnIndex];
	//var dataField = column.getDataField();
	
	//alert("double Click");
	
	$( '#pop_wrap1' ).dialog( 'open' );	
	gridApp4.resize();
	
	jQuery.ajax({ 
	    url:"/selectBusinessCreditDetail.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'P_SLIP_NO' : dataRow3.SLIP_NO
		},
		success:function(data){  
			gridApp4.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

//GRID4 Event Handler
function gridReadyHandler4(id) {
	// rMateGrid 관련 객체
	gridApp4 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot4 = gridApp4.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp4.setLayout(layoutStr4);
	gridApp4.setData(gridData4);
	
	gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4);
	gridRoot4.addEventListener("dataComplete", dataCompleteHandler4);
}

function layoutCompleteHandler4() {
	dataGrid4 = gridRoot4.getDataGrid();  // 그리드 객체
}

//그리드4 컴플릿트 핸들러
function dataCompleteHandler4(event) {
	// 그리드 객체
	dataGrid4 = gridRoot4.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection4 = gridRoot4.getCollection();
}

//GRID5 Event Handler
function gridReadyHandler5(id) {
	// rMateGrid 관련 객체
	gridApp5 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot5 = gridApp5.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp5.setLayout(layoutStr5);
	gridApp5.setData(gridData5);
	
	gridRoot5.addEventListener("layoutComplete", layoutCompleteHandler5);
	gridRoot5.addEventListener("dataComplete", dataCompleteHandler5);
}

function layoutCompleteHandler5() {
	dataGrid5 = gridRoot5.getDataGrid();  // 그리드 객체
}

//그리드5 컴플릿트 핸들러
function dataCompleteHandler5(event) {
	// 그리드 객체
	dataGrid5 = gridRoot5.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection5 = gridRoot5.getCollection();
}

//GRID6 Event Handler
function gridReadyHandler6(id) {
	// rMateGrid 관련 객체
	gridApp6 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot6 = gridApp6.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp6.setLayout(layoutStr6);
	gridApp6.setData(gridData6);
	
	gridRoot6.addEventListener("layoutComplete", layoutCompleteHandler6);
	gridRoot6.addEventListener("dataComplete", dataCompleteHandler6);
}

function layoutCompleteHandler6() {
	dataGrid6 = gridRoot6.getDataGrid();  // 그리드 객체
}

//그리드6 컴플릿트 핸들러
function dataCompleteHandler6(event) {
	// 그리드 객체
	dataGrid6 = gridRoot6.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection6 = gridRoot6.getCollection();
	
	// 전체데이터 가져오기
	src6 = collection6.getSource();
	
	// 미수입 입금시 알림톡 대상자 존재시 발송함.
	if(typeof alimtalkList != "undefined" && alimtalkList != null && alimtalkList.length > 0)	// 알림톡 대상 존재시 발송
	{
		fn_alimtalkSend();
	}
}

//그리드1 데이터 초기화
var gridData1 = [];
var gridData2 = [];
var gridData3 = [];
var gridData4 = [];
var gridData5 = [];
var gridData6 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1, collection1;
var gridApp2, gridRoot2, dataGrid2,dataRow2,clickData2,selectorColumn2, collection2, rowIndex2;
var gridApp3, gridRoot3, dataGrid3,dataRow3,clickData3,selectorColumn3, collection3, rowIndex3;
var gridApp4, gridRoot4, dataGrid4,dataRow4,clickData4,selectorColumn4, collection4, rowIndex4;
var gridApp5, gridRoot5, dataGrid5,dataRow5,clickData5,selectorColumn5, collection5, rowIndex5;
var gridApp6, gridRoot6, dataGrid6,dataRow6,clickData6,selectorColumn6, collection6, rowIndex6;

//----------------------- 그리드 설정 끝 -----------------------

function secondLabelFunc(item, value, column) {
	if (item.DPOT_FISH_YN == "N" && item.CANC_FLAG =="0" )
		return true;
	else
		return false;
};

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="false">\
		<groupedColumns>\
			<DataGridColumn dataField="STR_CODE"  headerText="STR_CODE" textAlign="center" visible="false" />\
			<DataGridColumn dataField="STR_NAME"  headerText="' + storNm + '" textAlign="center" width="80" visible="false" />\
			<DataGridColumn dataField="SALE_DT"  headerText="' + selngDate + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="POS_NO"  headerText="' + pos + '" textAlign="center" width="70" />\
			<DataGridColumn dataField="TRXN_NO"  headerText="' + trxnNo + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="CANC_FLAG" 			headerText="CANC_FLAG" textAlign="center" editable="false" visible="false" />\
			<DataGridColumn dataField="CANC_FLAG_NM" 		headerText="' + sellingSection + '" textAlign="center" editable="false" width="80" />\
			<DataGridColumn dataField="CUST_NAME"  headerText="' + cusName + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="CUST_NO"  headerText="' + cusNo + '" textAlign="center" width="90"/>\
			<DataGridColumn dataField="PAY_AMT"  headerText="' + credit + '" textAlign="right" formatter="{numfmt}" id="dg2col7" />\
			<DataGridColumn dataField="DPOT_AMT"  headerText="' + dpotAmt + '" textAlign="right" formatter="{numfmt}" id="dg2col9"  />\
			<DataGridColumn dataField="ZAN_AMT"  headerText="' + zanAmt + '" textAlign="right" formatter="{numfmt}" id="dg2col8"  />\
			<DataGridColumn dataField="PAY_PLAN_DT"  headerText="' + payPlanDt + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="REQ_EMP_NO"  headerText="REQ_EMP_NO" textAlign="center" visible="false" />\
			<DataGridColumn dataField="REQ_EMP_NAME"  headerText="' + employeeName + '" textAlign="center" width="100" visible="false" />\
			<DataGridColumn dataField="R_DPOT_AMT"  headerText="R_DPOT_AMT" visible="false"  />\
			<DataGridColumn dataField="DPOT_FISH_YN"  headerText="입금완료여부" width="80" textAlign="center"  />\
			<DataGridColumn dataField="SLIP_NO"  headerText="SLIP_NO" visible="false"  />\
		</groupedColumns>\
		<footers>\
			<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg2col7}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg2col9}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg2col8}" formatter="{numfmt}" textAlign="right" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
			</DataGridFooter>\
		</footers>\
	</DataGrid>\
</rMateGrid>';

/*var layoutStr_bak =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="false">\
			<groupedColumns>\
				<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0" secondLabelJsFunction="secondLabelFunc"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="STR_CODE" textAlign="center" visible="false" />\
				<DataGridColumn dataField="STR_NAME"  headerText="' + storNm + '" textAlign="center" width="80" visible="false" />\
				<DataGridColumn dataField="SALE_DT"  headerText="' + selngDate + '" textAlign="center" width="90" />\
				<DataGridColumn dataField="POS_NO"  headerText="' + pos + '" textAlign="center" width="70" />\
				<DataGridColumn dataField="TRXN_NO"  headerText="' + trxnNo + '" textAlign="center" width="80" />\
				<DataGridColumn dataField="CANC_FLAG" 			headerText="CANC_FLAG" textAlign="center" editable="false" visible="false" />\
				<DataGridColumn dataField="CANC_FLAG_NM" 		headerText="' + sellingSection + '" textAlign="center" editable="false" width="80" />\
				<DataGridColumn dataField="CUST_NAME"  headerText="' + cusName + '" textAlign="center" width="80" />\
				<DataGridColumn dataField="CUST_NO"  headerText="' + cusNo + '" textAlign="center" width="90"/>\
				<DataGridColumn dataField="PAY_AMT"  headerText="' + credit + '" textAlign="right" formatter="{numfmt}" id="dg2col7" />\
				<DataGridColumn dataField="ZAN_AMT"  headerText="' + zanAmt + '" textAlign="right" formatter="{numfmt}" id="dg2col8"  />\
				<DataGridColumn dataField="DPOT_AMT"  headerText="' + dpotAmt + '" textAlign="right" formatter="{numfmt}" id="dg2col9"  />\
				<DataGridColumn dataField="PAY_PLAN_DT"  headerText="' + payPlanDt + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="REQ_EMP_NO"  headerText="REQ_EMP_NO" textAlign="center" visible="false" />\
				<DataGridColumn dataField="REQ_EMP_NAME"  headerText="' + employeeName + '" textAlign="center" width="100" visible="false" />\
				<DataGridColumn dataField="R_DPOT_AMT"  headerText="R_DPOT_AMT" visible="false"  />\
				<DataGridColumn dataField="DPOT_FISH_YN"  headerText="DPOT_FISH_YN" visible="false"  />\
				<DataGridColumn dataField="SLIP_NO"  headerText="SLIP_NO" visible="false"  />\
			</groupedColumns>\
			<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg2col7}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg2col8}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg2col9}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
				</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';
*/
function itemFunc(rowIndex, columnIndex, item, dataField){
	
	if(gridRoot2.getItemFieldAt(rowIndex, "SLIP_NO") != undefined && (columnIndex == 2 ||  columnIndex == 6)){
		return false;
	}
	
	if(gridRoot2.getItemFieldAt(rowIndex, "DPOT_FLAG") != "02" && (columnIndex == 3 ||  columnIndex == 4 ||  columnIndex == 5) ){
		return false;
	}
	return true;  //return 값이 true면 editable이 가능하고. false면 editable이 불가능합니다.
}

//<DataGridColumn id="RCP_DT" 				dataField="RCP_DT"  				headerText="' + rcpDt + '" textAlign="center" itemEditor="DateEditor" formatter="{datefmt}" width="100"  />\
/*
<DataGridColumn id="SLIP_NO" 				dataField="SLIP_NO"  				headerText="' + dpotNo + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" />\
<DataGridColumn id="SEQ" 						dataField="SEQ"  						headerText="' + rowNumber + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="45" />\
<DataGridColumn id="IDATE" 					dataField="IDATE"  					headerText="' + iDateTime + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" />\
 */
var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter id="onlynum" useThousandsSeparator="false"/>\
		<DataGrid id="dg2" editable="true" horizontalScrollPolicy="auto" showDeletedRows="true" itemEditBeginningJsFunction="itemFunc" editalbe="true" showDataTips="true">\
			<groupedColumns>\
				<DataGridColumn id="STR_CODE" 			dataField="STR_CODE"  				headerText="IEMP_NO" visible="false" />\
				<DataGridColumn id="RCP_DT" 				dataField="RCP_DT"  				headerText="' + rcpDt + '" textAlign="center" width="100" editable="true"  itemEditor="DateEditor" formatter="{datefmt}"  />\
				<DataGridColumn id="DPOT_FLAG"			dataField="DPOT_FLAG"  			headerText="' + dpotFlag +'" textAlign="center" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" width="80" />\
				<DataGridColumn id="CARD_NO" 				dataField="CARD_NO"  				headerText="' + cardNo + '" textAlign="center" maxChars="16" />\
				<DataGridColumn id="APP_NO" 				dataField="APP_NO"  				headerText="' + consentNumber + '" textAlign="center" maxChars="8"  />\
				<DataGridColumn id="PAY_PERIOD" 			dataField="PAY_PERIOD"  			headerText="' + payPeriod + '" textAlign="center" width="80" maxChars="2" formatter="{onlynum}"  />\
				<DataGridColumn id="DPOT_AMT" 			dataField="DPOT_AMT"  			headerText="' + dpotAmt + '" textAlign="right" formatter="{numfmt}" maxChars="13" />\
				<DataGridColumn id="SLIP_NO" 				dataField="SLIP_NO"  				headerText="' + dpotNo + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" />\
				<DataGridColumn id="IDATE" 					dataField="IDATE"  					headerText="' + iDateTime + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" />\
				<DataGridColumn id="IEMP_NAME" 			dataField="IEMP_NAME"  			headerText="' + inputName + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="80"/>\
				<DataGridColumn id="IEMP_NO" 				dataField="IEMP_NO"  				headerText="IEMP_NO" textAlign="center" visible="false" />\
				<DataGridColumn id="CUST_NO" 				dataField="CUST_NO"  				headerText="CUST_NO" textAlign="center" visible="false" />\
				<DataGridColumn id="INPUT_YN" 				dataField="INPUT_YN"  				headerText="INPUT_YN" textAlign="center" visible="false" />\
				<DataGridColumn id="REMARK"					dataField="REMARK"  				headerText="' + remark + '" textAlign="left" maxChars="250" />\
				<DataGridColumn id="RCP_DT_OLD"			dataField="RCP_DT_OLD"  			headerText="RCP_DT_OLD" textAlign="center" visible="false" />\
			</groupedColumns>\
			<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DPOT_AMT}" formatter="{numfmt}" textAlign="right" />\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
				</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg3" sortableColumns="true">\
			<groupedColumns>\
				<DataGridColumn dataField="RCP_DT"  headerText="' + rcpDt + '" textAlign="center" />\
				<DataGridColumn dataField="DPOT_STR_CODE"  headerText="DPOT_STR_CODE" textAlign="center" visible="false" />\
				<DataGridColumn dataField="DPOT_STR_NAME"  headerText="' + dpotStrName + '" textAlign="center" width="80" />\
				<DataGridColumn dataField="SLIP_NO"  headerText="' + dpotSlipNo + '" textAlign="center"  />\
				<DataGridColumn dataField="DPOT_AMT"  headerText="' + dpotAmt + '" id="DPOT_AMT" formatter="{numfmt}" textAlign="right"  />\
			</groupedColumns>\
			<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{DPOT_AMT}" formatter="{numfmt}" textAlign="right" />\
				</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr4 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg4" sortableColumns="true">\
			<groupedColumns>\
				<DataGridColumn dataField="SEQ"			headerText="' + rowNumber + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="45" />\
				<DataGridColumn dataField="STR_CODE"  headerText="STR_CODE" textAlign="center" visible="false" />\
				<DataGridColumn dataField="STR_NAME"  headerText="' + storNm + '" textAlign="center" width="80" />\
				<DataGridColumn dataField="SALE_DT"  headerText="' + selngDate + '" textAlign="center" width="90" />\
				<DataGridColumn dataField="POS_NO"  headerText="' + pos + '" textAlign="center" width="70" />\
				<DataGridColumn dataField="TRXN_NO"  headerText="' + trxnNo + '" textAlign="center" width="80" />\
				<DataGridColumn dataField="CUST_NAME"  headerText="' + cusName + '" textAlign="center" width="80" />\
				<DataGridColumn dataField="CUST_NO"  headerText="' + cusNo + '" textAlign="center" width="90"/>\
				<DataGridColumn dataField="DPOT_AMT"  headerText="' + dpotAmt + '" textAlign="right" formatter="{numfmt}" />\
			</groupedColumns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr5 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg5" sortableColumns="true">\
			<groupedColumns>\
				<DataGridColumn dataField="RCP_DT"  					headerText="' + rcpDt + '" textAlign="center" width="120" formatter="{datefmt}" />\
				<DataGridColumn dataField="PREPAY" 		 			headerText="' + prePay + '" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="PREPAY_SETT"  			headerText="' + prePaySett + '" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="PREPAY_ZAN_AMT"  	headerText="' + prePayZanAmt + '" textAlign="right" formatter="{numfmt}" />\
				<DataGridColumn dataField="IEMP_NAME"  			headerText="' + inputName + '" textAlign="center" editable="false" width="100"/>\
				<DataGridColumn dataField="IEMP_NO"  				headerText="IEMP_NO" textAlign="center" visible="false" />\
			</groupedColumns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr6 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg6" sortableColumns="true">\
			<groupedColumns>\
				<DataGridColumn dataField="STR_NAME"  headerText="' + storNm + '" textAlign="center" width="80" />\
				<DataGridColumn dataField="ZAN_AMT"  headerText="' + zanAmt + '" textAlign="right" formatter="{numfmt}" id="dg2col8"  />\
			</groupedColumns>\
			<footers>\
				<DataGridFooter  height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn />\
					<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg2col8}" formatter="{numfmt}" textAlign="right" />\
				</DataGridFooter>\
			</footers>\
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
	$("#top_search select[name=P_STR_CODE]").val($("#SESSION_STR_CODE").val());
	//SESSION_STR_CODE
	
	$("#top_search select[name=P_CANC_FLAG]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("top_search select[name=P_CANC_FLAG]", "CANC_FLAG");
	
	getPosList();
	
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
//해당 점포의 POS 가져오기
function getPosList() {
	
	var html = "";
	
	if($("#P_STR_CODE").val() == "")
	{
		$("#P_POS_NO").html("<option value=\"\">" + all + "</option>");
		return;
	}
	
	jQuery.ajax({ 
	    url:"/getPosList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
			'P_STR_CODE' : $("#P_STR_CODE").val()
		},
		success:function(data){
			if(typeof data != "undefined" && data != null)
			{
				html += "<option value=\"\">" + all + "</option>";
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].POS_NO + "\">" + data[i].POS_NAME + "</option>";
				}
				$("#P_POS_NO").html(html);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	$('#comm_pop_wrap20' ).dialog( 'open' );
	gridApp29.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM20").val('fn_comm_alive_user_callback(dataRow29)');
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT20").val($("#P_CUST_NAME").val());
		btn_comm_search('20');
	}
	
}

//(회원검색) 팝업 callback function
function fn_comm_alive_user_callback(dataRow){
	$("#P_CUST_NO").val(dataRow.CUST_NO);
	$("#P_CUST_NAME").val(dataRow.CUST_NAME);
}

//행추가
function addRow(){
	
	/*
	var selectorColumn = gridRoot1.getObjectById("selector");
	var selectedCredit = selectorColumn.getSelectedIndices();
	
	if(selectedCredit.length < 1){
		//입금등록을 수행할 외상건을 선택하세요.
		alert(msgSelectCredit);
		return;
	}
	*/
	
	var collection = gridRoot2.getCollection();
	var source = collection.getSource();
	
	var totalNumber = source.length;
	var cntSlip = 0;
	
	var DPOT_FLAG_CODE = "02"; //결제수단 기본 02 : 신용카드
	var PREPAY_ZAN_AMT = 0; //선수금
	
	if(Number(gridRoot5.getItemFieldAt(0, "PREPAY_ZAN_AMT")) > 0){
		DPOT_FLAG_CODE = "04";
		PREPAY_ZAN_AMT = gridRoot5.getItemFieldAt(0, "PREPAY_ZAN_AMT");
	}
	
	for(var i=0 ; i < source.length; i++){
		if(gridRoot2.getItemFieldAt(i, "SLIP_NO") == undefined){
			cntSlip++;
		}
	}
	
	if(cntSlip > 0){
		alert("한 건의 입금등록만이 등록 가능합니다.");
		return;
	}
	
	var firstTag="<GRIDROW></GRIDROW>";  
	if (window.DOMParser)
    {   parser = new DOMParser();
        xmlDoc = parser.parseFromString(firstTag,"text/xml");
	}
	else // 인터넷 익스플로러
	{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	    xmlDoc.async=false;
        xmlDoc.loadXML(firstTag); 
    }
	
	var STR_CODE = xmlDoc.createElement("STR_CODE");
	var RCP_DT = xmlDoc.createElement("RCP_DT");
	var DPOT_FLAG = xmlDoc.createElement("DPOT_FLAG");
	var CARD_NO = xmlDoc.createElement("CARD_NO");
	var APP_NO = xmlDoc.createElement("APP_NO");
	var PAY_PERIOD = xmlDoc.createElement("PAY_PERIOD");
	var DPOT_AMT = xmlDoc.createElement("DPOT_AMT");
	var SLIP_NO = xmlDoc.createElement("SLIP_NO");
	var IDATE = xmlDoc.createElement("IDATE");
	var IEMP_NAME = xmlDoc.createElement("IEMP_NAME");
	var IEMP_NO = xmlDoc.createElement("IEMP_NO");
	var CUST_NO = xmlDoc.createElement("CUST_NO");
	var INPUT_YN = xmlDoc.createElement("INPUT_YN");
	var REMARK = xmlDoc.createElement("REMARK");
	var RCP_DT_OLD = xmlDoc.createElement("RCP_DT_OLD");
	
	STR_CODE.appendChild(xmlDoc.createTextNode( $("#SESSION_STR_CODE").val() ));
	RCP_DT.appendChild(xmlDoc.createTextNode( new CommDateManager().getDate("yyyy-mm-dd") ));
	DPOT_FLAG.appendChild(xmlDoc.createTextNode( DPOT_FLAG_CODE ));
	CARD_NO.appendChild(xmlDoc.createTextNode( "" ));
	APP_NO.appendChild(xmlDoc.createTextNode( "" ));
	PAY_PERIOD.appendChild(xmlDoc.createTextNode( "" ));
	DPOT_AMT.appendChild(xmlDoc.createTextNode( PREPAY_ZAN_AMT ));
	SLIP_NO.appendChild(xmlDoc.createTextNode( "" ));
	IDATE.appendChild(xmlDoc.createTextNode( "" ));
	IEMP_NAME.appendChild(xmlDoc.createTextNode( "" ));
	IEMP_NO.appendChild(xmlDoc.createTextNode( "" ));
	CUST_NO.appendChild(xmlDoc.createTextNode( $("#P_CUST_NO").val() ));
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	REMARK.appendChild(xmlDoc.createTextNode( '' ));
	RCP_DT_OLD.appendChild(xmlDoc.createTextNode( '' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RCP_DT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DPOT_FLAG);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CARD_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APP_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_PERIOD);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DPOT_AMT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SLIP_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IDATE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IEMP_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IEMP_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CUST_NO);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RCP_DT_OLD);
	
	gridRoot2.addItemAt(  xmlDoc  , -1, false);
	
	var value = {};
	value.rowIndex = totalNumber;
	value.columnIndex = 1;
	dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
	
}

//주문내용저장
function btnSave(){
	
	var rowCnt1 = gridRoot1.getCollection().getSource();
	var rowCnt  = gridRoot2.getCollection().getSource() ;
	
	/*
	var selectorColumn = gridRoot1.getObjectById("selector");
	var selectedCredit = selectorColumn.getSelectedIndices();
	*/
	
	var beforeCustNo = "";
	
	/*
	if(selectedCredit.length < 1){
		//입금등록을 수행할 외상건을 선택하세요.
		alert(msgSelectCredit);
		return;
	}
	*/
	
	//selectedCredit.sort();
	
	if(rowCnt.legnth < 1){
		//입금 등록할 내용을 입력해주세요. 
		alert(msgSelectDpot);
		return;
	}
	
	var totalPayAmt = 0;
	var totalDpotAmt = 0;
	var prepayZanAmt = 0;
	var dpotFlag = "";
	var custNo = "";
	var strCode = "";
	var updateCnt = 0;
	//입금 등록을 통해 등록한 입금액 측정
	for(var x=0; x < rowCnt.length; x++){
		if(gridRoot2.getItemFieldAt(x, "SLIP_NO") == undefined){
			
			updateCnt++;
			
			if(gridRoot2.getItemFieldAt(x, "DPOT_FLAG") == "02"){
				if(gridRoot2.getItemFieldAt(x, "CARD_NO") == undefined || gridRoot2.getItemFieldAt(x, "CARD_NO") == "" ||
				   gridRoot2.getItemFieldAt(x, "APP_NO") == undefined || gridRoot2.getItemFieldAt(x, "APP_NO") == "" ||
				   gridRoot2.getItemFieldAt(x, "PAY_PERIOD") == undefined || gridRoot2.getItemFieldAt(x, "PAY_PERIOD") == ""
					)
					{
						alert("결제수단이 신용카드인 경우 카드번호, 승인번호, 할부개월은 필수 입력사항입니다. ");
						return;
					}
			}
			
			totalDpotAmt = totalDpotAmt + Number(gridRoot2.getItemFieldAt(x, "DPOT_AMT"));
			dpotFlag = gridRoot2.getItemFieldAt(x, "DPOT_FLAG");
		}
	}
	if(updateCnt == 0){
		alert("추가된 입금등록건이 존재하지 않습니다.");
		return;
	}
	//입금 등록한 금액과 비교하기위해 입금 가능한 금액을 측정
	/*for(var y=0; y < selectedCredit.length; y++){
		var rowIndex = Number(selectedCredit[y]);
		var dataRow = gridRoot1.getItemAt(rowIndex);
		if(beforeCustNo != dataRow.CUST_NO && beforeCustNo != ""){
			//동일한 사용자만 다중 입금등록이 가능합니다.
			alert(msgSameCust);
			return;
		}
		beforeCustNo = dataRow.CUST_NO;
		
		totalPayAmt = totalPayAmt + (Number(dataRow.PAY_AMT) - Number(dataRow.DPOT_AMT));
	}*/
	var dpotFishYnCnt = 0;
	for(var y=0; y < rowCnt1.length; y++){
		var rowIndex = Number(y);
		var dataRow = gridRoot1.getItemAt(rowIndex);		
		if(dataRow.DPOT_FISH_YN == "N"){
			totalPayAmt = totalPayAmt + (Number(dataRow.PAY_AMT) - Number(dataRow.DPOT_AMT));
			dpotFishYnCnt++;
		}
	}
	
	if(dpotFishYnCnt == 0){
		alert("입금을 등록할 매출건이 없거나 모두 완료된 상태입니다.");
		return;
	}
	
	//초과입금 가능 처리를 위해 주석 선입금 잔액을 계산하기 위해 용도 변경 KYW
	/*if(totalDpotAmt > totalPayAmt){
		//입금할 금액이 외상매출 금액보다 클 수 없습니다.
		alert(msgDpotPayAmt);
		return;
	}*/
	prepayZanAmt = Number(totalDpotAmt) - Number(totalPayAmt);
	/*if(prepayZanAmt < 0){
		prepayZanAmt = 0;
	}*/
	
	//alert("정산진행시 남는 잔액 : " + prepayZanAmt);
	//return;
	
	if(confirm(msgSaveConfirm) == false) return;
	
	//상세 입금액을 추가하기 위한 xml 데이터
	var gridXmlData = "";
	
	//입금등록에 입력된 xml데이터
	var gridXmlData2 = "";
	
	// 알림톡 발송할 대상 리스트
	alimtalkList = new Array();
	
	for(var x=0; x < rowCnt.length; x++){
		
		if(gridRoot2.getItemFieldAt(x, "SLIP_NO") != "" && gridRoot2.getItemFieldAt(x, "SLIP_NO") != undefined && gridRoot2.getItemFieldAt(x, "SLIP_NO") != null) continue;
		
		var zanAmt = Number(gridRoot2.getItemFieldAt(x, "DPOT_AMT"));
		
		for(var y=0; y < rowCnt1.length; y++){
			
			var rowIndex = Number(y);
			var dataRow = gridRoot1.getItemAt(rowIndex);
			
			custNo = dataRow.CUST_NO;
			strCode = dataRow.STR_CODE;
			
			//선택 항목이 완료된 상태면 다음 건으로
			if(dataRow.DPOT_FISH_YN == "Y") continue;
			//남은 잔액이 0원이라면 해당 for문 종료
			if(zanAmt == 0) break;
			
			var payAmt = Number(dataRow.PAY_AMT) - Number(dataRow.DPOT_AMT);
			
			// 알림톡 발송 대상 수정전 key 값 담기
			if(gridRoot2.getItemFieldAt(x, "DPOT_FLAG") != "04"){
				var alimtalData = {
						SALE_DT : dataRow.SALE_DT
						, STR_CODE : dataRow.STR_CODE
						, POS_NO : dataRow.POS_NO
						, TRXN_NO : dataRow.TRXN_NO
				};
				alimtalkList.push(alimtalData);
			}
			
			if(zanAmt >= payAmt){
				gridRoot1.setItemFieldAt("Y", rowIndex, "DPOT_FISH_YN");
				gridRoot1.setItemFieldAt(payAmt + Number(dataRow.DPOT_AMT), rowIndex, "DPOT_AMT");
				zanAmt = zanAmt - payAmt;
				
				gridXmlData = gridXmlData + "<GRIDROW>";
					gridXmlData = gridXmlData + "<SALE_DT>" + dataRow.SALE_DT + "</SALE_DT>";
					gridXmlData = gridXmlData + "<STR_CODE>" + dataRow.STR_CODE + "</STR_CODE>";
					gridXmlData = gridXmlData + "<POS_NO>" + dataRow.POS_NO + "</POS_NO>";
					gridXmlData = gridXmlData + "<TRXN_NO>" + dataRow.TRXN_NO + "</TRXN_NO>";
					gridXmlData = gridXmlData + "<RCP_DT>" + gridRoot2.getItemFieldAt(x, "RCP_DT") + "</RCP_DT>";
					gridXmlData = gridXmlData + "<DPOT_STR_CODE>" + gridRoot2.getItemFieldAt(x, "STR_CODE") + "</DPOT_STR_CODE>";
					gridXmlData = gridXmlData + "<CUST_NO>" + dataRow.CUST_NO + "</CUST_NO>";
					gridXmlData = gridXmlData + "<DPOT_AMT>" + dataRow.ZAN_AMT + "</DPOT_AMT>";
					//gridXmlData = gridXmlData + "<DPOT_AMT>" + totalDpotAmt + "</DPOT_AMT>";
					gridXmlData = gridXmlData + "<DPOT_FISH_YN>Y</DPOT_FISH_YN>";
				gridXmlData = gridXmlData + "</GRIDROW>";	
					
			}
			else{
				
				if(zanAmt < 0){
					
					var dpotAmt = 0;
					dpotAmt = zanAmt;
					zanAmt = zanAmt + Number(dataRow.DPOT_AMT);
					gridRoot1.setItemFieldAt("N", rowIndex, "DPOT_FISH_YN");
					gridRoot1.setItemFieldAt(zanAmt, rowIndex, "DPOT_AMT");
					
					if( x == rowCnt.length -1){
						gridXmlData = gridXmlData + "<GRIDROW>";
							gridXmlData = gridXmlData + "<SALE_DT>" + dataRow.SALE_DT + "</SALE_DT>";
							gridXmlData = gridXmlData + "<STR_CODE>" + dataRow.STR_CODE + "</STR_CODE>";
							gridXmlData = gridXmlData + "<POS_NO>" + dataRow.POS_NO + "</POS_NO>";
							gridXmlData = gridXmlData + "<TRXN_NO>" + dataRow.TRXN_NO + "</TRXN_NO>";
							gridXmlData = gridXmlData + "<RCP_DT>" + gridRoot2.getItemFieldAt(x, "RCP_DT") + "</RCP_DT>";
							gridXmlData = gridXmlData + "<DPOT_STR_CODE>" + gridRoot2.getItemFieldAt(x, "STR_CODE") + "</DPOT_STR_CODE>";
							gridXmlData = gridXmlData + "<CUST_NO>" + dataRow.CUST_NO + "</CUST_NO>";
							gridXmlData = gridXmlData + "<DPOT_AMT>0</DPOT_AMT>";
							//gridXmlData = gridXmlData + "<DPOT_AMT>" + totalDpotAmt + "</DPOT_AMT>";
							gridXmlData = gridXmlData + "<DPOT_FISH_YN>Y</DPOT_FISH_YN>";
						gridXmlData = gridXmlData + "</GRIDROW>";
					}
					
					break;
					
				}else{
					
					var dpotAmt = 0;
					dpotAmt = zanAmt;
					zanAmt = zanAmt + Number(dataRow.DPOT_AMT);
					gridRoot1.setItemFieldAt("N", rowIndex, "DPOT_FISH_YN");
					gridRoot1.setItemFieldAt(zanAmt, rowIndex, "DPOT_AMT");
					
					if( x == rowCnt.length -1){
						gridXmlData = gridXmlData + "<GRIDROW>";
							gridXmlData = gridXmlData + "<SALE_DT>" + dataRow.SALE_DT + "</SALE_DT>";
							gridXmlData = gridXmlData + "<STR_CODE>" + dataRow.STR_CODE + "</STR_CODE>";
							gridXmlData = gridXmlData + "<POS_NO>" + dataRow.POS_NO + "</POS_NO>";
							gridXmlData = gridXmlData + "<TRXN_NO>" + dataRow.TRXN_NO + "</TRXN_NO>";
							gridXmlData = gridXmlData + "<RCP_DT>" + gridRoot2.getItemFieldAt(x, "RCP_DT") + "</RCP_DT>";
							gridXmlData = gridXmlData + "<DPOT_STR_CODE>" + gridRoot2.getItemFieldAt(x, "STR_CODE") + "</DPOT_STR_CODE>";
							gridXmlData = gridXmlData + "<CUST_NO>" + dataRow.CUST_NO + "</CUST_NO>";
							gridXmlData = gridXmlData + "<DPOT_AMT>" + dpotAmt + "</DPOT_AMT>";
							//gridXmlData = gridXmlData + "<DPOT_AMT>" + totalDpotAmt + "</DPOT_AMT>";
							gridXmlData = gridXmlData + "<DPOT_FISH_YN>N</DPOT_FISH_YN>";
						gridXmlData = gridXmlData + "</GRIDROW>";
					}
					
					break;
					
				}
				
				
			}
		}
	}
	
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData2 = gridXmlData2 + getXmlString(   gridRoot2.getItemAt(i)   );
		}
	}
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ; 
	gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
	
	jQuery.ajax({ 
	    url:"/registBusinessCredit.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {
					"gridXmlData" : gridXmlData
				,	"gridXmlData2" : gridXmlData2
				,	"P_DPOT_FLAG" : dpotFlag
				,	"P_PREPAY_ZAN_AMT" : prepayZanAmt
				,	"P_STR_CODE" : strCode
				,	"P_CUST_NO" : custNo
		        }, 
		success:function(data){   
			
			gridRoot1.removeAll();
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

//주문내용저장
function btnSaveOverCharge(){
	
	var rowCnt1 = gridRoot1.getCollection().getSource();
	var rowCnt  = gridRoot2.getCollection().getSource() ;
	
	/*
	var selectorColumn = gridRoot1.getObjectById("selector");
	var selectedCredit = selectorColumn.getSelectedIndices();
	*/
	
	var beforeCustNo = "";
	
	/*
	if(selectedCredit.length < 1){
		//입금등록을 수행할 외상건을 선택하세요.
		alert(msgSelectCredit);
		return;
	}
	*/
	
	//selectedCredit.sort();
	
	if(rowCnt.legnth < 1){
		//입금 등록할 내용을 입력해주세요. 
		alert(msgSelectDpot);
		return;
	}
	
	var totalPayAmt = 0;
	var totalDpotAmt = 0;
	var prepayZanAmt = 0;
	var dpotFlag = "";
	var custNo = "";
	var strCode = "";
	
	//입금 등록을 통해 등록한 입금액 측정
	for(var x=0; x < rowCnt.length; x++){
		if(gridRoot2.getItemFieldAt(x, "SLIP_NO") == undefined){
			
			if(gridRoot2.getItemFieldAt(x, "DPOT_FLAG") == "02"){
				if(gridRoot2.getItemFieldAt(x, "CARD_NO") == undefined || gridRoot2.getItemFieldAt(x, "CARD_NO") == "" ||
				   gridRoot2.getItemFieldAt(x, "APP_NO") == undefined || gridRoot2.getItemFieldAt(x, "APP_NO") == "" ||
				   gridRoot2.getItemFieldAt(x, "PAY_PERIOD") == undefined || gridRoot2.getItemFieldAt(x, "PAY_PERIOD") == ""
					)
					{
						alert("결제수단이 신용카드인 경우 카드번호, 승인번호, 할부개월은 필수 입력사항입니다. ");
						return;
					}
			}
			
			totalDpotAmt = totalDpotAmt + Number(gridRoot2.getItemFieldAt(x, "DPOT_AMT"));
			dpotFlag = gridRoot2.getItemFieldAt(x, "DPOT_FLAG");
		}
	}
	//입금 등록한 금액과 비교하기위해 입금 가능한 금액을 측정
	/*for(var y=0; y < selectedCredit.length; y++){
		var rowIndex = Number(selectedCredit[y]);
		var dataRow = gridRoot1.getItemAt(rowIndex);
		if(beforeCustNo != dataRow.CUST_NO && beforeCustNo != ""){
			//동일한 사용자만 다중 입금등록이 가능합니다.
			alert(msgSameCust);
			return;
		}
		beforeCustNo = dataRow.CUST_NO;
		
		totalPayAmt = totalPayAmt + (Number(dataRow.PAY_AMT) - Number(dataRow.DPOT_AMT));
	}*/
	for(var y=0; y < rowCnt1.length; y++){
		var rowIndex = Number(y);
		var dataRow = gridRoot1.getItemAt(rowIndex);		
		if(dataRow.DPOT_FISH_YN == "N"){
			totalPayAmt = totalPayAmt + (Number(dataRow.PAY_AMT) - Number(dataRow.DPOT_AMT));
		}
	}
	
	//초과입금 가능 처리를 위해 주석 선입금 잔액을 계산하기 위해 용도 변경 KYW
	/*if(totalDpotAmt > totalPayAmt){
		//입금할 금액이 외상매출 금액보다 클 수 없습니다.
		alert(msgDpotPayAmt);
		return;
	}*/
	prepayZanAmt = Number(totalDpotAmt) - Number(totalPayAmt);
	if(prepayZanAmt < 0){
		prepayZanAmt = 0;
	}
	
	//alert("정산진행시 남는 잔액 : " + prepayZanAmt);
	//return;
	
	if(confirm(msgSaveConfirm) == false) return;
	
	//상세 입금액을 추가하기 위한 xml 데이터
	var gridXmlData = "";
	
	//입금등록에 입력된 xml데이터
	var gridXmlData2 = "";
	
	// 알림톡 발송할 대상 리스트
	alimtalkList = new Array();
	
	for(var x=0; x < rowCnt.length; x++){
		
		if(gridRoot2.getItemFieldAt(x, "SLIP_NO") != "" && gridRoot2.getItemFieldAt(x, "SLIP_NO") != undefined && gridRoot2.getItemFieldAt(x, "SLIP_NO") != null) continue;
		
		var zanAmt = Number(gridRoot2.getItemFieldAt(x, "DPOT_AMT"));
		
		for(var y=0; y < rowCnt1.length; y++){
			
			var rowIndex = Number(y);
			var dataRow = gridRoot1.getItemAt(rowIndex);
			
			custNo = dataRow.CUST_NO;
			strCode = dataRow.STR_CODE;
			
			//선택 항목이 완료된 상태면 다음 건으로
			if(dataRow.DPOT_FISH_YN == "Y") continue;
			//남은 잔액이 0원이라면 해당 for문 종료
			if(zanAmt == 0) break;
			
			var payAmt = Number(dataRow.PAY_AMT) - Number(dataRow.DPOT_AMT);
			
			// 알림톡 발송 대상 수정전 key 값 담기
			if(gridRoot2.getItemFieldAt(x, "DPOT_FLAG") != "04"){
				var alimtalData = {
						SALE_DT : dataRow.SALE_DT
						, STR_CODE : dataRow.STR_CODE
						, POS_NO : dataRow.POS_NO
						, TRXN_NO : dataRow.TRXN_NO
				};
				alimtalkList.push(alimtalData);
			}
			
			if(zanAmt >= payAmt){
				gridRoot1.setItemFieldAt("Y", rowIndex, "DPOT_FISH_YN");
				gridRoot1.setItemFieldAt(payAmt + Number(dataRow.DPOT_AMT), rowIndex, "DPOT_AMT");
				zanAmt = zanAmt - payAmt;
				
				gridXmlData = gridXmlData + "<GRIDROW>";
					gridXmlData = gridXmlData + "<SALE_DT>" + dataRow.SALE_DT + "</SALE_DT>";
					gridXmlData = gridXmlData + "<STR_CODE>" + dataRow.STR_CODE + "</STR_CODE>";
					gridXmlData = gridXmlData + "<POS_NO>" + dataRow.POS_NO + "</POS_NO>";
					gridXmlData = gridXmlData + "<TRXN_NO>" + dataRow.TRXN_NO + "</TRXN_NO>";
					gridXmlData = gridXmlData + "<RCP_DT>" + gridRoot2.getItemFieldAt(x, "RCP_DT") + "</RCP_DT>";
					gridXmlData = gridXmlData + "<DPOT_STR_CODE>" + gridRoot2.getItemFieldAt(x, "STR_CODE") + "</DPOT_STR_CODE>";
					gridXmlData = gridXmlData + "<CUST_NO>" + dataRow.CUST_NO + "</CUST_NO>";
					gridXmlData = gridXmlData + "<DPOT_AMT>" + dataRow.ZAN_AMT + "</DPOT_AMT>";
					//gridXmlData = gridXmlData + "<DPOT_AMT>" + totalDpotAmt + "</DPOT_AMT>";
					gridXmlData = gridXmlData + "<DPOT_FISH_YN>Y</DPOT_FISH_YN>";
				gridXmlData = gridXmlData + "</GRIDROW>";	
					
			}
			else{
				var dpotAmt = 0;
				dpotAmt = zanAmt;
				zanAmt = zanAmt + Number(dataRow.DPOT_AMT);
				gridRoot1.setItemFieldAt("N", rowIndex, "DPOT_FISH_YN");
				gridRoot1.setItemFieldAt(zanAmt, rowIndex, "DPOT_AMT");
				
				if( x == rowCnt.length -1){
					gridXmlData = gridXmlData + "<GRIDROW>";
						gridXmlData = gridXmlData + "<SALE_DT>" + dataRow.SALE_DT + "</SALE_DT>";
						gridXmlData = gridXmlData + "<STR_CODE>" + dataRow.STR_CODE + "</STR_CODE>";
						gridXmlData = gridXmlData + "<POS_NO>" + dataRow.POS_NO + "</POS_NO>";
						gridXmlData = gridXmlData + "<TRXN_NO>" + dataRow.TRXN_NO + "</TRXN_NO>";
						gridXmlData = gridXmlData + "<RCP_DT>" + gridRoot2.getItemFieldAt(x, "RCP_DT") + "</RCP_DT>";
						gridXmlData = gridXmlData + "<DPOT_STR_CODE>" + gridRoot2.getItemFieldAt(x, "STR_CODE") + "</DPOT_STR_CODE>";
						gridXmlData = gridXmlData + "<CUST_NO>" + dataRow.CUST_NO + "</CUST_NO>";
						gridXmlData = gridXmlData + "<DPOT_AMT>" + dpotAmt + "</DPOT_AMT>";
						//gridXmlData = gridXmlData + "<DPOT_AMT>" + totalDpotAmt + "</DPOT_AMT>";
						gridXmlData = gridXmlData + "<DPOT_FISH_YN>N</DPOT_FISH_YN>";
					gridXmlData = gridXmlData + "</GRIDROW>";
				}
				
				break;
			}
		}
	}
	
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData2 = gridXmlData2 + getXmlString(   gridRoot2.getItemAt(i)   );
		}
	}
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ; 
	gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
	
	jQuery.ajax({ 
	    url:"/registBusinessCredit.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {
					"gridXmlData" : gridXmlData
				,	"gridXmlData2" : gridXmlData2
				,	"P_DPOT_FLAG" : dpotFlag
				,	"P_PREPAY_ZAN_AMT" : prepayZanAmt
				,	"P_STR_CODE" : strCode
				,	"P_CUST_NO" : custNo
		        }, 
		success:function(data){   
			
			gridRoot1.removeAll();
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

// 알림톡 발송
function fn_alimtalkSend()
{
	//alimtalkList
	var memList = "";
	
	var zanAmt = 0;
	var dataRow;
	// alimtalkList += dataRow.SALE_DT + "|" + dataRow.STR_CODE + "|" + dataRow.POS_NO + "|" + dataRow.TRXN_NO;
	for(var i=0; i<src1.length; i++)
	{
		for(var k=0; k<alimtalkList.length; k++)
		{
			dataRow = alimtalkList[k];
			if(dataRow.SALE_DT == src1[i].SALE_DT && dataRow.STR_CODE == src1[i].STR_CODE
					&& dataRow.POS_NO == src1[i].POS_NO && dataRow.TRXN_NO == src1[i].TRXN_NO)
			{
				for(var j=0; j<src6.length; j++)
				{
					if(src6[j].STR_NAME == src1[i].STR_NAME)
					{
						zanAmt = src6[j].ZAN_AMT;	// 해당점포의 총 미수금
						break;
					}
				}
				
				if(memList != "")
				{
					memList += "@";
				}
				memList += src1[i].CUST_NO + "|" + src1[i].SALE_DT + "|" + src1[i].STR_CODE + "|" + src1[i].POS_NO + "|" + src1[i].TRXN_NO + "|" + src1[i].SLIP_NO
					+ "|" + src1[i].ZAN_AMT + "|" + src1[i].DPOT_AMT + "|" + src1[i].DPOT_FISH_YN + "|" + zanAmt;
			}
		}
	}
	
	//alert(memList);return;
	CommonJs.sendAlimtalk("", memList, "dadam_102", 0);	// 알림톡 발송
	
	alimtalkList = new Array();	// 알림톡 발송 후 초기화
}

function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

function btnSearch(){
	
	if($("#top_search input[name=P_CUST_NO]").val() == ""){
		alert("회원번호는 필수 검색 조건입니다.");
		return;
	}
	
	gridRoot2.removeAll();
	
	var loadData =  $("#top_search").serializeAllObject();
	
	//로딩바 출력
	showLoadingBar1();
	
	//그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/selectBusinessCredit.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		success:function(data){  
			//alert(data.list);
			gridApp1.setData(data);
			btnSearchOverDpot();
			btnSearchStore();
			btnSearchToday();
	    },
	    complete : function(data) {
	    	//로딩바 숨김
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨김
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btnSearchStore(){
	
	gridRoot6.removeAll();
	
	var loadData =  $("#top_search").serializeAllObject();
	
	//로딩바 출력
	showLoadingBar6();
	
	jQuery.ajax({ 
	    url:"/selectBusinessCreditStore.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		success:function(data){  
			//alert(data.list);
			gridApp6.setData(data);
			//btnSearchOverDpot();
	    },
	    complete : function(data) {
	    	//로딩바 숨김
	    	hideLoadingBar6();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨김
	    	hideLoadingBar6();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

function btnSearchToday(){

	var loadData =  $("#top_search").serializeAllObject();
	
	jQuery.ajax({ 
	    url:"/selectBusinessCreditToday.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		success:function(data){  
			if(data.length > 0){
				$("#TODAY_CUST_NAME").html(data[0].TODAY_CUST_NAME);
				$("#TODAY_DPOT_AMT").html(data[0].TODAY_DPOT_AMT.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#SALE_UPOINT").val(data[0].SALE_UPOINT);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//선입금내역 조회
function btnSearchOverDpot(){
	
	//로딩바 출력
	showLoadingBar5();
	
	jQuery.ajax({ 
	    url:"/selectBusinessCreditOverDpot.do",         
	    type:"POST",
		datatype:"json",
		data: {
			'P_STR_CODE' : $("#top_search select[name=P_STR_CODE]").val()
		,	'P_CUST_NO' : $("#top_search input[name=P_CUST_NO]").val()
		},
		success:function(data){
			
			if(data.length > 0){
				gridApp5.setData(data);
			}else{
				var item = {
					'RCP_DT' : '-'
				,	'PREPAY' : '0'
				,	'PREPAY_SETT' : '0'
				,	'PREPAY_ZAN_AMT' : '0'
				,	'IEMP_NAME' : '-'
				,	'IEMP_NO' : '-'
				};
				gridRoot5.addItemAt(item, 0);
			}
			
	    },
	    complete : function(data) {
	    	//로딩바 숨김
	    	hideLoadingBar5();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨김
	    	hideLoadingBar5();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function addAccount(){
	
	var rowCnt  = gridRoot1.getCollection().getSource() ;
	
	var dpotFishYnCnt = 0;
	for(var y=0; y < rowCnt.length; y++){
		var rowIndex = Number(y);
		var dataRow = gridRoot1.getItemAt(rowIndex);		
		if(dataRow.DPOT_FISH_YN == "N"){
			dpotFishYnCnt++;
		}
	}
	
	if(dpotFishYnCnt == 0){
		
		if(confirm("입금 가능한 외상매출건이 존재하지 않습니다. 매출건 추가 후 진행하시겠습니까?") == false) return;
		
		var loadData =  $("#top_search").serializeAllObject();
		
		jQuery.ajax({ 
		    url:"/insertBusinessCreditAccount.do",         
		    type:"POST",
			datatype:"json",
			data: loadData,
			success:function(data){
				btnSearch();
				addRow();
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	}else{
		addRow();
	}
	
}

function editSlip(){
	
	var rowIndex = dataGrid2.getSelectedIndex();
	
	if(rowIndex == -1){
		alert("수정하고자 하는 매출전표를 선택 후 진행 하세요.");
		return;
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/updateBusinessCreditEditSlip.do",         
	    type:"POST",
		datatype:"json",
		data: {
			'P_STR_CODE' : $("#top_search select[name=P_STR_CODE]").val()
		,	'P_CUST_NO' : gridRoot2.getItemFieldAt(rowIndex, "CUST_NO")
		,	'P_RCP_DT' : gridRoot2.getItemFieldAt(rowIndex, "RCP_DT")
		,	'P_RCP_DT_OLD' : gridRoot2.getItemFieldAt(rowIndex, "RCP_DT_OLD")
		,	'P_SLIP_NO' : gridRoot2.getItemFieldAt(rowIndex, "SLIP_NO")
		,	'P_DPOT_FLAG' : gridRoot2.getItemFieldAt(rowIndex, "DPOT_FLAG")
		,	'P_CARD_NO' : gridRoot2.getItemFieldAt(rowIndex, "CARD_NO")
		,	'P_APP_NO' : gridRoot2.getItemFieldAt(rowIndex, "APP_NO")
		,	'P_PAY_PERIOD' : gridRoot2.getItemFieldAt(rowIndex, "PAY_PERIOD")
		},
		success:function(data){
			btnSearch();
			alert(msgSave);
	    },
	    complete : function(data) {
	    	//로딩바 숨김
	    	hideLoadingBar5();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨김
	    	hideLoadingBar5();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

//상세 입금등록 내역 저장
function btnSearchLedger(dataRow){
	
	gridRoot2.removeAll();
	
	//로딩바 출력
	showLoadingBar2();
	
	jQuery.ajax({ 
	    url:"/selectBusinessCreditLedger.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'STR_CODE' : dataRow.STR_CODE
				,	'POS_NO' : dataRow.POS_NO
				,	'TRXN_NO' : dataRow.TRXN_NO
				,	'CUST_NO' : dataRow.CUST_NO
			    ,	'SALE_DT' :dataRow.SALE_DT
		},
		success:function(data){  
			
			if(data.length > 0){
				
				for(var i=0 ; i < data.length ; i++){
					var firstTag="<GRIDROW></GRIDROW>";  
					if (window.DOMParser)
				    {   parser = new DOMParser();
				        xmlDoc = parser.parseFromString(firstTag,"text/xml");
					}
					else // 인터넷 익스플로러
					{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
					    xmlDoc.async=false;
				        xmlDoc.loadXML(firstTag); 
				    }
					
					var STR_CODE = xmlDoc.createElement("STR_CODE");
					var RCP_DT = xmlDoc.createElement("RCP_DT");
					var DPOT_FLAG = xmlDoc.createElement("DPOT_FLAG");
					var CARD_NO = xmlDoc.createElement("CARD_NO");
					var APP_NO = xmlDoc.createElement("APP_NO");
					var PAY_PERIOD = xmlDoc.createElement("PAY_PERIOD");
					var DPOT_AMT = xmlDoc.createElement("DPOT_AMT");
					var SLIP_NO = xmlDoc.createElement("SLIP_NO");
					var IDATE = xmlDoc.createElement("IDATE");
					var IEMP_NAME = xmlDoc.createElement("IEMP_NAME");
					var IEMP_NO = xmlDoc.createElement("IEMP_NO");
					var CUST_NO = xmlDoc.createElement("CUST_NO");
					var INPUT_YN = xmlDoc.createElement("INPUT_YN");
					var REMARK = xmlDoc.createElement("REMARK");
					var RCP_DT_OLD = xmlDoc.createElement("RCP_DT_OLD");
					
					STR_CODE.appendChild(xmlDoc.createTextNode( data[i].STR_CODE ));
					RCP_DT.appendChild(xmlDoc.createTextNode( data[i].RCP_DT ));
					DPOT_FLAG.appendChild(xmlDoc.createTextNode( data[i].DPOT_FLAG ));
					CARD_NO.appendChild(xmlDoc.createTextNode( data[i].CARD_NO ));
					APP_NO.appendChild(xmlDoc.createTextNode( data[i].APP_NO ));
					PAY_PERIOD.appendChild(xmlDoc.createTextNode( data[i].PAY_PERIOD ));
					DPOT_AMT.appendChild(xmlDoc.createTextNode( data[i].DPOT_AMT ));
					SLIP_NO.appendChild(xmlDoc.createTextNode( data[i].SLIP_NO ));
					IDATE.appendChild(xmlDoc.createTextNode( data[i].IDATE ));
					IEMP_NAME.appendChild(xmlDoc.createTextNode( data[i].IEMP_NAME ));
					IEMP_NO.appendChild(xmlDoc.createTextNode( data[i].IEMP_NO ));
					CUST_NO.appendChild(xmlDoc.createTextNode( data[i].CUST_NO ));
					INPUT_YN.appendChild(xmlDoc.createTextNode( data[i].INPUT_YN ));
					REMARK.appendChild(xmlDoc.createTextNode( data[i].REMARK ));
					RCP_DT_OLD.appendChild(xmlDoc.createTextNode( data[i].RCP_DT_OLD ));
					
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RCP_DT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DPOT_FLAG);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CARD_NO);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(APP_NO);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PAY_PERIOD);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DPOT_AMT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SLIP_NO);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IDATE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IEMP_NAME);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IEMP_NO);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CUST_NO);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RCP_DT_OLD);
					
					gridRoot2.addItemAt(  xmlDoc  , -1, false);
				}
				
			}
			
			
	    },
	    complete : function(data) {
	    	//로딩바 숨김
	    	hideLoadingBar2();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨김
	    	hideLoadingBar2();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

function btnSearchSlip(dataRow){
	gridRoot3.removeAll();
	
	//로딩바 출력
	showLoadingBar3();
	
	jQuery.ajax({ 
	    url:"/selectBusinessCreditSlip.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'STR_CODE' : dataRow.STR_CODE
				,	'POS_NO' : dataRow.POS_NO
				,	'TRXN_NO' : dataRow.TRXN_NO
				,	'CUST_NO' : dataRow.CUST_NO
				,	'SALE_DT' :dataRow.SALE_DT
		},
		success:function(data){  
			if(data.length > 0){
				gridApp3.setData(data);
			}
	    },
	    complete : function(data) {
	    	//로딩바 숨김
	    	hideLoadingBar3();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨김
	    	hideLoadingBar3();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//해당 점포의 POS 가져오기
function getPosList() {
	
	var html = "";
	
	if($("#P_STR_CODE").val() == "")
	{
		$("#P_POS_NO").html("<option value=\"\">" + all + "</option>");
		return;
	}
	
	jQuery.ajax({ 
	    url:"/getPosList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {'P_STR_CODE' : $("#top_search select[name=P_STR_CODE]").val()},
		success:function(data){
			if(typeof data != "undefined" && data != null)
			{
				html += "<option value=\"\">" + all + "</option>";
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].POS_NO + "\">" + data[i].POS_NAME + "</option>";
				}
				$("#P_POS_NO").html(html);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
/*$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-162);
	$(".ui-dialog-titlebar").text("콜센터접수관리 팝업");
	
	$(window).on('resize',function  () {
		$("#gridHolder1").height($(window).height()-104);
	})
});*/
function openPop() {
	$( '#pop_wrap1' ).dialog( 'open' );	
	gridApp4.resize();
}

function closePop() {
	$("#pop_wrap1").dialog("close");
}

function btnAlimTalk()
{
	gridApp_atk1.setData([]);
	$("#alimtalk_pop1").dialog("open");
}

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	var w = ($(window).width()-58)/10;
	$(".lft_box").width(w*7);
	$(".rgt_box").width(w*3);
	
	$(".lft_wid").width(w*8);
	$(".rgt_wid").width(w*2);
	
	//368
	$("#gridHolder1, #gridHolder6").height( $(window).height() - 453 );
	$(window).on('resize',function (){	
		var w = ($(window).width()-58)/10;
		$(".lft_box").width(w*7);
		$(".rgt_box").width(w*3);

		$(".lft_wid").width(w*8);
		$(".rgt_wid").width(w*2);
		
		$("#gridHolder1, #gridHolder6").height( $(window).height() - 453 );
	});
});

//그리드 로딩바  보이기
function showLoadingBar1() {
    gridRoot1.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar1() {
    gridRoot1.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar2() {
    gridRoot2.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar2() {
    gridRoot2.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar3() {
    gridRoot3.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar3() {
    gridRoot3.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar5() {
    gridRoot4.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar5() {
    gridRoot4.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar6() {
    gridRoot6.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar6() {
    gridRoot6.removeLoadingBar();
}