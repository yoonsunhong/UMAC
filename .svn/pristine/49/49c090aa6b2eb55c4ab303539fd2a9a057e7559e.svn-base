/********************************************************
 * 설명:  콜센터주문등록
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2017.01.12
 * version : 1.0
 ********************************************************/

//행사 시작 종료일 중복체크를 위한 Date조회용 변수
var checkDate = {};
var selectedIndex = -1;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();
var ss = today.getSeconds();
if(dd < 10) {
    dd = '0' + dd;
} 
if(mm<10) {
    mm = '0' + mm;
}
if(hh < 10){
	hh = '0' + hh;
}
if(min<10){
	min = '0' + min;
}
var todayGetDate = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min;

$(document).ready(function(){
	
	init();
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	$(".memo").height(100);
	
	var RESERVE_DT = new CommDateManager().getDate("yyyy-mm-dd");
	$('#RESERVE_DT').val(RESERVE_DT);
	$("#RESERVE_TIME").val(hh + ":" + min);
	$('#P_ORD_DT').val(RESERVE_DT);
	
	$("#IDATE").val(todayGetDate);
	$("#IEMP_NM").val($("#SESSION_USER_NM").val());
	
	$('#CREDIT_LIMIT, #ACCT_REABLE, #CREDIT_USE_LIMIT').number( true, 0 );
	
	/*$("#RESERVE_TIME").keyup(function(event){
		
		//alert($("#RESERVE_TIME").val().length);
		var str = $("#RESERVE_TIME").val();
		str = str.replace(/[^0-9]/g, '');
		
		var tmp = "";
		
		if(str.length < 2){
			return; 
		}else if(str.length == 2){
			if(event.which != 8 && event.witch != 46){
				tmp += str.substr(0,2);
				tmp += ":";
				$("#RESERVE_TIME").val(tmp);
			}
		}else{
			if(str.length == 4){
				tmp += str.substr(0,2);
				tmp += ":";
				tmp += str.substr(4);
				$("#RESERVE_TIME").val(tmp);
			}else{
				tmp += str.substr(0,2);
				tmp += ":";
				tmp += str.substr(3,2);
				$("#RESERVE_TIME").val(tmp);
			}
		}
		
	});*/
	
	
	$("#ADDR_SAME_YN").change(function(){
		if($(this).is(":checked")){
			$("#ORD_ADDR").val($("#ADDR").val());
			$("#ORD_ADDR_DTL").val($("#ADDR_DTL").val());
		}else{
			$("#ORD_ADDR").val("");
			$("#ORD_ADDR_DTL").val("");
		}
	});

	$("#STR_CODE").change(function(){
		
		if($(this).val() != "" && ($("#CUST_NO").val() != "" || $("#CUST_NO").val() != null || $("#CUST_NO").val() != "undefined")){
			selectOrderHistory($("#CUST_NO").val(), $(this).val());
		}
		
	});
	
	$('#CUST_NAME').on('keydown', function(e) {
		$("#P_CUST_NO").val("");
	    if (e.which == 13) {
	    	btn_comm_user_search();
	    }
	});
	
	$("#S_SLIP_NO").on('keydown', function(e){
		if(e.keyCode == "13"){
			
			/*if($("#S_SLIP_NO").val().length != 10){
				alert("주문번호는 10자리를 입력해야 합니다.");
				return;
			}*/
			btnSearchSlip("S");
		}
	});
	
	$("#S_CUST_NAME").on('keydown', function(e){
		if(e.keyCode == "13"){
			btnSearchSlip("C");
		}
	});
	
	$("#body_area2 select[name=SEQ]").change(function(){
		jQuery.ajax({ 
		    url:"/selectUserClaimManage.do",         
		    type:"POST",
			datatype:"json",
			//async:false,
			data: {
						'P_RCPT_NO' : dataRow4.RCPT_NO
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
	
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#pop_wrap0").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 1000,
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
	    width : 900,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});

	//달력설정
	$(".datepicker").datepicker();
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
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%", "180px");
//rMateGridH5.create("grid2", "gridHolder2", jsVars+"&dataType=xml", "100%", "180px");
rMateGridH5.create("grid2", "gridHolder2", jsVars+"&dataType=xml", "100%","300px");
rMateGridH5.create("grid3", "gridHolder3", jsVars, "100%", "180px");
rMateGridH5.create("grid4", "gridHolder4", jsVars, "100%", "300px");

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
			
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			
			//그리드1 셀선택 이벤트
			dataGrid1.addEventListener("itemClick", itemClickHandler);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		
		
	}else if(id == "grid2"){
		
		// rMateGrid 관련 객체
		gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData2);

		//로우 클릭 이벤트 제어
		var itemClickHandler2 = function(event) {
			var rowIndex = event.rowIndex;
			selectedIndex = rowIndex;
			rowIndex2 = rowIndex;
			var columnIndex = event.columnIndex;
			dataRow2 = gridRoot2.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid2.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData2 = dataRow2[dataField];
			
		};
		
		var itemDoubleClickHandler2 = function(event) {
			var rowIndex = event.rowIndex;
			selectedIndex = rowIndex;
			var columnIndex = event.columnIndex;
			var dataRow = gridRoot2.getItemAt(rowIndex);
			dataRow2 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid2.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			if (dataField == "ITM_NAME") {
				editRowIndex = rowIndex;
				editDataRow = dataRow;
				editDataField = dataField;
				// pop up edit window
				//alert("팝업오픈");
				
				if($("#STR_CODE").val() == ""){
					alert(selectStore);
					return;
				}
				
				btn_comm_product_search();
			}
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler2 = function(event) {
			dataGrid2 = gridRoot2.getDataGrid();	// 그리드 객체
			
			//그리드2 셀선택 이벤트
			dataGrid2.addEventListener("itemClick", itemClickHandler2);
			
			//그리드2 더블클릭 이벤트
			//dataGrid2.setDoubleClickEnabled(true);
			//dataGrid2.addEventListener("itemDoubleClick", itemDoubleClickHandler2);

		};
		
		var dataCompleteHandler2 = function(event){
			// 그리드 객체
			dataGrid2 = gridRoot2.getDataGrid(); 
			
			// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
			collection2 = gridRoot2.getCollection();
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
		
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot2.addEventListener("itemDataChanged", itemDataChangeHandler2);
		
	}else if(id == "grid3"){
		// rMateGrid 관련 객체
		gridApp3 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot3 = gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp3.setLayout(layoutStr3);
		gridApp3.setData(gridData3);

		//로우 클릭 이벤트 제어
		/*var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow3 = gridRoot3.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid3.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData3 = dataRow3[dataField];
			
		};*/
		
		//그리드3 핸들러
		var layoutCompleteHandler3 = function(event) {
			dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체
			
			//그리드3 셀선택 이벤트
			//dataGrid3.addEventListener("itemClick", itemClickHandler);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드3 핸들러 생성.
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		
		
	}else if(id == "grid4"){
		
		// rMateGrid 관련 객체
		gridApp4 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot4 = gridApp4.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp4.setLayout(layoutStr4);
		gridApp4.setData(gridData4);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow4 = gridRoot4.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid4.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData4 = dataRow4[dataField];
			$("#body_area textarea[name=CONTS]").val(dataRow4.CONTS);
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler4 = function(event) {
			dataGrid4 = gridRoot4.getDataGrid();	// 그리드 객체
			
			//그리드1 셀선택 이벤트
			dataGrid4.addEventListener("itemClick", itemClickHandler);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4);
		
	}
}

function itemDataChangeHandler2(event) {
	
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot2.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	
	//수정값과 이전값이 같지 않은 경우 내용이 수정된것으로 판단 저장시 값을 전달한다.
	if(oldValue != newValue){
		if(gridRoot2.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "U" , rowIndex, "INPUT_YN");
		}
	}
	
	if(dataField == "REMARK"){
		addRow();
	}
	
	if(dataField == "ORD_QTY"){
		if(isNaN(Number(newValue))){
			alert("상품의 수량은 숫자만 입력할 수 있습니다.");
			gridRoot2.setItemFieldAt( "" , rowIndex, "ORD_QTY");
			gridRoot2.setItemFieldAt( "" , rowIndex, "ORD_QTY");
			//합계금액 초기화
			var rowCnt2 = gridRoot2.getCollection().getSource();
			var rowCnt = 0;
			var sumPrice = 0;
			if(rowCnt2.length > 0){
				for(var i=0 ; i < rowCnt2.length ; i++){
					//gridRoot2.getItemFieldAt(i, "ITM_CODE")
					if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "D"){
						rowCnt++;
						if(gridRoot2.getItemFieldAt(i, "ORD_QTY") != "" && gridRoot2.getItemFieldAt(i, "ORD_QTY") != undefined){
							sumPrice = sumPrice + (Number(gridRoot2.getItemFieldAt(i, "ORD_QTY")) * Number(gridRoot2.getItemFieldAt(i, "EVT_SPRC")));
						}
					}
				}
			}
			$("#ORD_CNT").val(rowCnt);
			$("#ORD_TOT").val(sumPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			gridRoot2.setItemFieldAt( 0 , rowIndex, "EVT_SPRC_TOTAL");
			return ;
		}else{
		var EVT_SPRC = Number(gridRoot2.getItemFieldAt(rowIndex, "EVT_SPRC"));

			if(isNaN(Number(EVT_SPRC)) ){
				gridRoot2.setItemFieldAt( 0 , rowIndex, "EVT_SPRC_TOTAL");
				return;
			}
			gridRoot2.setItemFieldAt( newValue * EVT_SPRC , rowIndex, "EVT_SPRC_TOTAL");
		}
		
		
		var selectedItem = gridRoot2.getItemAt(rowIndex);
		/*
		if(gridRoot2.getItemFieldAt(rowIndex, "GRE_GB") == "1"){
			if(Number(newValue) > Number(gridRoot2.getItemFieldAt(rowIndex, "INV_END_QTY"))){
				alert("직매입 상품의 경우 재고수량보다 많은 수량을 입력할 수 없습니다.");
				gridRoot2.setItemFieldAt( oldValue , rowIndex, "ORD_QTY");
				
				//i (index) 입력하여 그리드 아이템 가져오기
				//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
				//gridRoot2.removeChangedData(selectedItem);
			}
		}
		*/
		var rowCnt2 = gridRoot2.getCollection().getSource();
		var rowCnt = 0;
		var sumPrice = 0;
		if(rowCnt2.length > 0){
			for(var i=0 ; i < rowCnt2.length ; i++){
				//gridRoot2.getItemFieldAt(i, "ITM_CODE")
				if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "D"){
					rowCnt++;
					if(gridRoot2.getItemFieldAt(i, "ORD_QTY") != "" && gridRoot2.getItemFieldAt(i, "ORD_QTY") != undefined){
						sumPrice = sumPrice + (Number(gridRoot2.getItemFieldAt(i, "ORD_QTY")) * Number(gridRoot2.getItemFieldAt(i, "EVT_SPRC")));
					}
				}
			}
		}
		$("#ORD_CNT").val(rowCnt);
		$("#ORD_TOT").val(sumPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	}
	
	if(dataField == "ITM_NAME"){
		if($("#STR_CODE").val() == ""){
			alert(selectStore);
			return;
		}
		
		//alert(dataGrid2._selectedIndex);
		btn_comm_product_search(newValue);
		
		var value = {};
		value.rowIndex = rowIndex;
		value.columnIndex = 7;
		dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
	}
	
	if(dataField == "IMAGE_NUM"){
		if($("#STR_CODE").val() == ""){
			alert(selectStore);
			return;
		}
		
		if(newValue > 0){
			$("#P_TEXT9_1").val(newValue);
			btn_comm_search9();
			
			openEventPopEnterKey();
			
			var value = {};
			value.rowIndex = rowIndex;
			value.columnIndex = 7;
			dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
		}
	}
}

//그리드1 데이터 초기화
var gridData1 = [];
var gridData2 = [];
var gridData3 = [];
var gridData4 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2,dataRow2,clickData2,selectorColumn2, collection2, rowIndex2;
var gridApp3, gridRoot3, dataGrid3,dataRow3,clickData3,selectorColumn3;
var gridApp4, gridRoot4, dataGrid4,dataRow4,clickData4,selectorColumn4;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" headerHeight="24" sortableColumns="true" selectionMode="multipleCells" >\
		<columns>\
			<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0" />\
			<DataGridColumn dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="STR_NAME"  headerText="' + storNm + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="ITM_CODE"  headerText="' + itmCode + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="SCAN_CODE"  headerText="' + scanCode + '" textAlign="center" />\
			<DataGridColumn dataField="ITM_NAME"  headerText="' + itmName + '" textAlign="left" />\
			<DataGridColumn dataField="UNIT"  headerText="' + unit + '" textAlign="center" width="80" visible="false"/>\
			<DataGridColumn dataField="ORD_QTY"  headerText="' + orderQuantity + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="IPSU_QTY"  headerText="' + ipsuQty + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="SPRC"  headerText="' + sprc + '" textAlign="right" formatter="{numfmt}" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';
//<DataGridColumn id="ITM_NAME"				dataField="ITM_NAME"  headerText="' + itmName + '"  textAlign="left" itemRenderer="IconItem" icon="Magnifier" editable="false"  backgroundColor="#EFEFEF" width="200"  />\

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<NumberFormatter id="onlynum" useThousandsSeparator="false"/>\
		<PercentFormatter id="percfmt" useThousandsSeparator="true"/>\
		<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>\
		<DataGrid id="dg2" editable="true" horizontalScrollPolicy="auto" showDeletedRows="true">\
			<columns>\
		 		<DataGridRowStateColumn id="rowState" 	dataField=" " textAlign="center" visible="true"/>\
				<DataGridColumn id="INPUT_YN"				dataField="INPUT_YN"  headerText="INPUT_YN" textAlign="center" visible="false" />\
				<DataGridColumn id="RN"						dataField="RN"  headerText="' + rowNumber + '" textAlign="center" width="55" editable="false"  backgroundColor="#EFEFEF" />\
				<DataGridColumn id="IMAGE_NUM"			dataField="IMAGE_NUM"  headerText="' + imageNumber + '" textAlign="center" width="55"/>\
				<DataGridColumn id="STR_CODE"				dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
				<DataGridColumn id="ITM_NAME"				dataField="ITM_NAME"  headerText="' + itmName + '"  textAlign="left" editable="true" width="200"  />\
				<DataGridColumn id="INV_END_QTY"		dataField="INV_END_QTY"  headerText="' + invEndQty + '" formatter="{numfmt}"  textAlign="right" editable="false" backgroundColor="#EFEFEF" width="80"/>\
				<DataGridColumn id="ORD_QTY"				dataField="ORD_QTY"  headerText="' + orderQuantity + '" formatter="{numfmt}" textAlign="right" width="80" maxChars="6" />\
				<DataGridColumn id="IPSU_QTY"				dataField="IPSU_QTY"  headerText="' + ipsuQty + '" formatter="{numfmt}"  textAlign="right" width="80" editable="false" backgroundColor="#EFEFEF" visible="false" />\
				<DataGridColumn id="ITM_CODE"				dataField="ITM_CODE"  headerText="ITM_CODE" textAlign="center" visible="false" backgroundColor="#EFEFEF" />\
				<DataGridColumn id="SCAN_CODE"			dataField="SCAN_CODE" headerText="' + scanCode + '"  textAlign="center" editable="false"  backgroundColor="#EFEFEF" width="120"  />\
				<DataGridColumn id="UNIT"						dataField="UNIT"  headerText="' + unit + '" textAlign="center" width="80" maxChars="10" visible="false" />\
				<DataGridColumn id="WPRC"					dataField="WPRC"  headerText="' + wprc + '" editable="false" textAlign="right" formatter="{numfmt}" backgroundColor="#EFEFEF" visible="false" />\
				<DataGridColumn id="SPRC"					dataField="SPRC"  headerText="정상금액" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}" width="80"  />\
				<DataGridColumn id="EVT_SPRC"				dataField="EVT_SPRC"  headerText="행사금액" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}" width="80"  />\
				<DataGridColumn id="EVT_SPRC_TOTAL"	dataField="EVT_SPRC_TOTAL"  headerText="판매금액" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}" width="80"  />\
				<DataGridColumn id="ORD_FLAG"				dataField="ORD_FLAG"  headerText="ORD_FLAG" textAlign="center" visible="false" />\
				<DataGridColumn id="ORD_FLAG_NAME"	dataField="ORD_FLAG_NAME"  headerText="구분" textAlign="center" width="80" editable="false" backgroundColor="#EFEFEF" />\
				<DataGridColumn id="REMARK"					dataField="REMARK"  headerText="' + remark + '" textAlign="left" maxChars="250" />\
				<DataGridColumn id="GRE_GB"					dataField="GRE_GB"  headerText="GRE_GB" textAlign="center" visible="false" />\
				<DataGridColumn id="EVT_CODE"				dataField="EVT_CODE"  headerText="EVT_CODE" textAlign="center" visible="false" />\
			</columns>\
			<dataProvider>\
				<!-- 그리드의 자료를 일반 dataProvider가 아닌 별도의 컴포넌트에 입력해야 할 경우 아래와 같이 source에 $gridData를 넣어줍니다 -->\
				<SpanArrayCollection source="{$gridData}"/>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg3" sortableColumns="true" selectionMode="singleCell" >\
			<columns>\
				<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0" />\
				<DataGridColumn dataField="SALE_DT"  headerText="' + selngDate + '" textAlign="center" width="90" />\
				<DataGridColumn dataField="SCAN_CODE"  headerText="' + scanCode + '" textAlign="center" />\
				<DataGridColumn dataField="ITM_CODE"  headerText="' + scanCode + '"  visible="false" />\
				<DataGridColumn dataField="ITM_NAME"  headerText="' + itmName + '" textAlign="left" />\
				<DataGridColumn dataField="UNIT"  headerText="' + unit + '" textAlign="center" width="80" />\
				<DataGridColumn dataField="SALE_QTY"  headerText="' + orderQuantity + '" textAlign="center" width="80" />\
				<DataGridColumn dataField="SALE_AMT"  headerText="' + sprc + '" textAlign="right" formatter="{numfmt}" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr4 =
	'<rMateGrid>\
		<DataGrid id="dg4" sortableColumns="true">\
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
	
	$("#STR_CODE").append('<option value="">'+ select +'</option>');
	getStoreCode("STR_CODE");
	
	$("#P_10_STR_CODE").append('<option value="">'+ select +'</option>');
	getStoreCode("P_10_STR_CODE");
	
	$("#PAY_METH").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("PAY_METH", "PAY_METH");
	
	//$("#RESERVE_TIME").append('<option value="">'+ select +'</option>');
	//getCommonCodeSelectBoxList("RESERVE_TIME", "RESERVE_TIME");
	
	$("#PAY_METH").val("2");
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

function btn_open_claim(){

	$('#pop_wrap0' ).dialog( 'open' );
	gridApp4.resize();
	
	//btnSearchClaim();
}

//행사 코드 마스터 조회
function btnSearchClaim(){
	
	if($("#CUST_NO").val() == "" || $("#CUST_NO").val() == undefined){
		alert("클레임내역을 확인하고자 하는 고객을 조회하세요.");
		return;
	}
	
	gridRoot4.removeAll();
	
	jQuery.ajax({ 
	    url:"/selectUserClaimRegist.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {
					'P_STR_CODE' : ""
				,	'P_RCPT_DTTM_STR' : "1999-01-01"
				,	'P_RCPT_DTTM_END' : yyyy+mm+dd
				,	'P_CLAIM_STAT' : $("#top_search select[name=P_CLAIM_STAT]").val()
				,	'P_CUST_NO'	:	$("#CUST_NO").val()
				},
		success:function(data){  
			if(data.length > 0){
				gridApp4.setData(data);
				btn_open_claim();
			}else{
				alert("고객이 등록한 클레임 내용이 없습니다.");
			}
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function btnPopup() {
	
    $("#pop_wrap1").dialog({
        dialogClass: "p_f"
     });	
	
	$("#body_area2 select[name=SEQ] option").remove();
	$("#body_area2 input[name=IEMP_NAME]").val("");
	$("#body_area2 input[name=IDATE]").val("");
	$("#body_area2 textarea[name=CONTS]").val("");
	$("#body_area2 input[name=SUBJECT]").val("");
	
	var detailCnt = dataRow4.CLAIM_CNT;
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
					'P_RCPT_NO' : dataRow4.RCPT_NO
				,	'P_SEQ' : "1"
				},
		success:function(data){  
			//gridApp1.setData(data);
			$("#body_area2 input[name=SUBJECT]").val(dataRow4.SUBJECT);
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

//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	
	$("#CUST_NAME").focus();
	
	$('#comm_pop_wrap20' ).dialog( 'open' );
	gridApp29.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM20").val('fn_comm_alive_user_callback(dataRow29)');
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#CUST_NAME").val() != null && $("#CUST_NAME").val() != ""){
		$("#P_TEXT20").val($("#CUST_NAME").val());
		btn_comm_search('20');
	}
	
}

function btn_comm_product_search(newValue){
	
	$("#P_TEXT8").val(newValue);
	btn_comm_search8();
	
	//$('#comm_pop_wrap8' ).dialog( 'open' );
	//gridApp17.resize();
	
	// callback함수명을 P_CALLBACK_NM8에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM8").val('fn_comm_order_product_callback(dataRow17)');
}


function openEventPopEnterKey(){
	$("#btn_event").blur();
	
	if($("#ORD_STAT_CD").val() != "00" && $("#SLIP_NO").val() != ""){
		alert("상품등록은 가접수 상태일때만 가능합니다.");
		return;
	}
	
	if($("#CUST_NO").val() == "" ){
		alert(selectCust);
		return;
	}
	
	if($("#STR_CODE").val() == "" ){
		alert(selectStore);
		return;
	}
	
	$('#comm_pop_wrap9' ).dialog( 'open' );
	gridApp18.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM9").val('fn_comm_order_event_product_callback2(dataRow18)');
}

function openEventPop(){
	
	$("#btn_event").blur();
	
	if($("#ORD_STAT_CD").val() != "00" && $("#SLIP_NO").val() != ""){
		alert("상품등록은 가접수 상태일때만 가능합니다.");
		return;
	}
	
	if($("#CUST_NO").val() == "" ){
		alert(selectCust);
		return;
	}
	
	if($("#STR_CODE").val() == "" ){
		alert(selectStore);
		return;
	}
	
	$('#comm_pop_wrap9' ).dialog( 'open' );
	gridApp18.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM9").val('fn_comm_order_event_product_callback(dataRow18)');
}


function btnSearchSlip(flag){
	
	//S일경우 Slip(주문번호로 조회) - C 인경우 Cust로 조회
	if(flag == "S"){
		$("#S_SLIP_NO").focus();
	}else{
		$("#S_CUST_NAME").focus();
	}
	
	$("#P_CUST_NM").val("");
	$("#COMM_SLIP_NO10").val("");
	
	$('#comm_pop_wrap10' ).dialog( 'open' );
	gridApp19.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM10").val('fn_comm_order_slip_callback(dataRow19)');
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if(($("#S_SLIP_NO").val() != null && $("#S_SLIP_NO").val() != "") || ($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != "")){
		if($("#S_SLIP_NO").val() != null && $("#S_SLIP_NO").val() != ""){
			var slipNo = $("#S_SLIP_NO").val();
			var searchYear = slipNo.substring(0,2);
			var searchMonth = slipNo.substring(2,4);
			var searchDay = slipNo.substring(4,6);
			var searchDate = "20" + searchYear + "-" + searchMonth + "-" + searchDay;
			$("#P_ORD_DT").val(searchDate);
			$("#COMM_SLIP_NO10").val($("#S_SLIP_NO").val());
			//btn_comm_search10();
			
			
		}
		
		if($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != ""){
			$("#P_CUST_NM").val($("#S_CUST_NAME").val());
			//btn_comm_search10();
			
			
		}
		
		btn_comm_search10();
	}
	
}

function btnSearchSlipCust(){
	
	$("#P_CUST_NM").val("");
	$("#COMM_SLIP_NO10").val("");
	
	$('#comm_pop_wrap10' ).dialog( 'open' );
	gridApp19.resize();
	
	$("#P_CUST_NM").focus();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM10").val('fn_comm_order_slip_callback(dataRow19)');
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != ""){
		$("#P_CUST_NM").val($("#S_CUST_NAME").val());
		btn_comm_search10();
	}
}

//(회원검색) 팝업 callback function
function fn_comm_alive_user_callback(dataRow){
	
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("회원정보 조회 실패");
		return;
	}
	
	if(dataRow.CREDIT_USE_YN == "N"){
		alert("외상불가 설정에 의해 콜센터 접수가 불가능한 회원입니다.");
		return;
	}
	
	jQuery.ajax({ 
	    url:"/businessCallReceiptUserInfo.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'CUST_NO' : dataRow.CUST_NO
				},
		success:function(data){  
			//alert(data);
			
			btnNew();
			
			$("#CUST_NO").val(data[0].CUST_NO);
			$("#CUST_NAME").val("(" + data[0].CUST_NO + ")" + data[0].CUST_NAME);
			if(data[0].SMS_YN == "Y"){
				$("#SMS_YN_Y").attr("checked", true);
			}else{
				$("#SMS_YN_N").attr("checked", true);
			}
			$("#CREDIT_LIMIT").val(data[0].CREDIT_LIMIT);
			$("#ACCT_REABLE").val(data[0].ACCT_REABLE);
			$("#CREDIT_USE_LIMIT").val(data[0].CREDIT_USE_LIMIT);
			//$("#TEL_NO").val("");
			if(data[0].TEL_NO != "" && data[0].TEL_NO != null){
				//var telNo = CommonJs.phoneFomatterArr(data[0].TEL_NO + data[0].END_TEL_NO);
				var telNo = CommonJs.phoneFomatterArr(data[0].TEL_NO);
				if(telNo.length == 3){
					$("#TEL_NO_1").val(telNo[0]);
					$("#TEL_NO_2").val(telNo[1]);
					$("#TEL_NO_3").val(telNo[2]);
				}else{
					$("#TEL_NO_2").val(telNo[0]);
					$("#TEL_NO_3").val(telNo[1]);
				}
			}
			if(data[0].MOBIL_NO != "" && data[0].MOBIL_NO != null){
				var mobilNo = CommonJs.phoneFomatterArr(data[0].MOBIL_NO);
				if(mobilNo.length == 3){
					$("#MOBIL_NO_1").val(mobilNo[0]);
					$("#MOBIL_NO_2").val(mobilNo[1]);
					$("#MOBIL_NO_3").val(mobilNo[2]);
				}
			}
			//$("#MOBIL_NO").val("");
			$("#MBR_GRADE").val(data[0].MBR_GRADE);
			$("#ADDR").val(data[0].ADDR);
			$("#ADDR_DTL").val(data[0].ADDR_DTL);
			$("#BUSI_FLAG_NAME").val(data[0].BUSI_FLAG_NAME);
			$("#STR_CODE").val(data[0].LAST_STR_CODE);
			$("#PAY_METH").val(data[0].LAST_PAY_METH);
			
			selectOrderHistory(data[0].CUST_NO, "");
			selectPos(data[0].CUST_NO, "");
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function fn_comm_order_product_callback(dataRow){
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	for(var i=0 ; i < rowCnt2.length ; i++){
		if(dataRow.ITM_CODE == gridRoot2.getItemFieldAt(i, "ITM_CODE")){
			alert(duplicateProduct);
			return;
		}
	}
	
	var _selectedIndex = dataGrid2._selectedIndex;
	
	if(dataRow != null && dataRow != "" || dataRow != undefined){
		
		if(_selectedIndex != -1){
			
			//gridRoot2.setItemFieldAt( 'I' , _selectedIndex, "INPUT_YN");
			gridRoot2.setItemFieldAt( dataRow.ITM_NAME , _selectedIndex, "ITM_NAME");
			gridRoot2.setItemFieldAt( dataRow.IPSU_QTY , _selectedIndex, "IPSU_QTY");
			gridRoot2.setItemFieldAt( dataRow.INV_END_QTY , _selectedIndex, "INV_END_QTY");
			gridRoot2.setItemFieldAt( dataRow.ITM_CODE , _selectedIndex, "ITM_CODE");
			gridRoot2.setItemFieldAt( dataRow.SCAN_CODE , _selectedIndex, "SCAN_CODE");
			gridRoot2.setItemFieldAt( dataRow.UNIT , _selectedIndex, "UNIT");
			gridRoot2.setItemFieldAt( dataRow.WPRC , _selectedIndex, "WPRC");
			gridRoot2.setItemFieldAt( dataRow.SPRC , _selectedIndex, "EVT_SPRC");
			gridRoot2.setItemFieldAt( dataRow.EVT_SPRC , _selectedIndex, "SPRC");
			gridRoot2.setItemFieldAt( dataRow.GRE_GB , _selectedIndex, "GRE_GB");
			
			if(dataRow.EVT_GB == "행사"){
				gridRoot2.setItemFieldAt( "2" , _selectedIndex, "ORD_FLAG");
				gridRoot2.setItemFieldAt( "행사" , _selectedIndex, "ORD_FLAG_NAME");
				gridRoot2.setItemFieldAt( dataRow.IMAGE_NUM , _selectedIndex, "IMAGE_NUM");
				gridRoot2.setItemFieldAt( dataRow.EVT_CODE , _selectedIndex, "EVT_CODE");

			}else{
				if(dataRow.EVT_YN == "Y"){
					gridRoot2.setItemFieldAt( "2" , _selectedIndex, "ORD_FLAG");
					gridRoot2.setItemFieldAt( "행사" , _selectedIndex, "ORD_FLAG_NAME");
					gridRoot2.setItemFieldAt( dataRow.IMAGE_NUM , _selectedIndex, "IMAGE_NUM");
					gridRoot2.setItemFieldAt( dataRow.EVT_CODE , _selectedIndex, "EVT_CODE");

				}else{
					gridRoot2.setItemFieldAt( "1" , _selectedIndex, "ORD_FLAG");
					gridRoot2.setItemFieldAt( "정상" , _selectedIndex, "ORD_FLAG_NAME");
					gridRoot2.setItemFieldAt( dataRow.IMAGE_NUM , _selectedIndex, "IMAGE_NUM");
					gridRoot2.setItemFieldAt( dataRow.EVT_CODE , _selectedIndex, "EVT_CODE");

				}
			}
			
			if(gridRoot2.getItemFieldAt(_selectedIndex, "ORD_QTY") != "" && gridRoot2.getItemFieldAt(_selectedIndex, "ORD_QTY") != null && gridRoot2.getItemFieldAt(_selectedIndex, "ORD_QTY") != undefined){
				var ORD_QTY = Number(gridRoot2.getItemFieldAt(_selectedIndex, "ORD_QTY"));
				var EVT_SPRC = Number(dataRow.EVT_SPRC);
				
				gridRoot2.setItemFieldAt( ORD_QTY*EVT_SPRC , _selectedIndex, "EVT_SPRC_TOTAL");
				
				var rowCnt2 = gridRoot2.getCollection().getSource();
				var rowCnt = 0;
				var sumPrice = 0;
				if(rowCnt2.length > 0){
					for(var i=0 ; i < rowCnt2.length ; i++){
						//gridRoot2.getItemFieldAt(i, "ITM_CODE")
						if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "D"){
							rowCnt++;
							if(gridRoot2.getItemFieldAt(i, "ORD_QTY") != "" && gridRoot2.getItemFieldAt(i, "ORD_QTY") != undefined){
								sumPrice = sumPrice + (Number(gridRoot2.getItemFieldAt(i, "ORD_QTY")) * Number(gridRoot2.getItemFieldAt(i, "EVT_SPRC")));
							}
						}
					}
				}
				$("#ORD_CNT").val(rowCnt);
				$("#ORD_TOT").val(sumPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			}
			
			var value = {};
			value.rowIndex = dataGrid2._selectedIndex;
			value.columnIndex = 7;
			dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
		}
	}
}

function fn_comm_order_slip_callback(dataRow){
	//alert(dataRow);
	$("#S_SLIP_NO").val(dataRow.SLIP_NO);
	$("#S_CUST_NO").val(dataRow.CUST_NO);
	$("#S_CUST_NAME").val(dataRow.CUST_NAME);
}

function fn_comm_order_event_product_callback(dataRow){
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	for(var i=0 ; i < rowCnt2.length ; i++){
		if(dataRow.ITM_CODE == gridRoot2.getItemFieldAt(i, "ITM_CODE")){
			alert(duplicateProduct);
			return;
		}
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
	
	var INPUT_YN = xmlDoc.createElement("INPUT_YN");
	var RN = xmlDoc.createElement("RN");
	var IMAGE_NUM = xmlDoc.createElement("IMAGE_NUM");
	var STR_CODE = xmlDoc.createElement("STR_CODE");
	var ITM_NAME = xmlDoc.createElement("ITM_NAME");
	var ORD_QTY = xmlDoc.createElement("ORD_QTY");
	var IPSU_QTY = xmlDoc.createElement("IPSU_QTY");
	var INV_END_QTY = xmlDoc.createElement("INV_END_QTY");
	var ITM_CODE = xmlDoc.createElement("ITM_CODE");
	var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
	var UNIT = xmlDoc.createElement("UNIT");
	var WPRC = xmlDoc.createElement("WPRC");
	var SPRC = xmlDoc.createElement("SPRC");
	var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
	var EVT_SPRC_TOTAL = xmlDoc.createElement("EVT_SPRC_TOTAL");
	var ORD_FLAG = xmlDoc.createElement("ORD_FLAG");
	var ORD_FLAG_NAME = xmlDoc.createElement("ORD_FLAG_NAME");
	var REMARK = xmlDoc.createElement("REMARK");
	var GRE_GB = xmlDoc.createElement("GRE_GB");
	var EVT_CODE = xmlDoc.createElement("EVT_CODE");
	
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	RN.appendChild(xmlDoc.createTextNode( rowCnt2.length+1 ));
	IMAGE_NUM.appendChild(xmlDoc.createTextNode( dataRow.IMAGE_NUM ));
	STR_CODE.appendChild(xmlDoc.createTextNode( $("#STR_CODE").val() ));
	ITM_NAME.appendChild(xmlDoc.createTextNode( dataRow.ITM_NAME ));
	ORD_QTY.appendChild(xmlDoc.createTextNode( '' ));
	IPSU_QTY.appendChild(xmlDoc.createTextNode( dataRow.IPSU_QTY ));
	INV_END_QTY.appendChild(xmlDoc.createTextNode( dataRow.INV_END_QTY ));
	ITM_CODE.appendChild(xmlDoc.createTextNode( dataRow.ITM_CODE ));
	SCAN_CODE.appendChild(xmlDoc.createTextNode( dataRow.SCAN_CODE ));
	UNIT.appendChild(xmlDoc.createTextNode( dataRow.UNIT ));
	WPRC.appendChild(xmlDoc.createTextNode( dataRow.WPRC ));
	SPRC.appendChild(xmlDoc.createTextNode( dataRow.SPRC ));
	EVT_SPRC.appendChild(xmlDoc.createTextNode( dataRow.EVT_SPRC ));
	EVT_SPRC_TOTAL.appendChild(xmlDoc.createTextNode( '' ));
	ORD_FLAG.appendChild(xmlDoc.createTextNode( '2' ));
	ORD_FLAG_NAME.appendChild(xmlDoc.createTextNode( '행사' ));
	REMARK.appendChild(xmlDoc.createTextNode( '' ));
	GRE_GB.appendChild(xmlDoc.createTextNode( dataRow.GRE_GB ));
	EVT_CODE.appendChild(xmlDoc.createTextNode( dataRow.EVT_CODE ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IMAGE_NUM);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_QTY);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IPSU_QTY);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC_TOTAL);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_FLAG);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_FLAG_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(GRE_GB);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_CODE);
	
	gridRoot2.addItemAt(  xmlDoc  , -1);
	//girdMoveSelctedIndex();
	var rowIndex = gridRoot2.getCollection().getSource().length-1;
	var value = {};
	value.rowIndex = rowIndex;
	value.columnIndex = 7;
	dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
	
}


function fn_comm_order_event_product_callback2(dataRow){
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	for(var i=0 ; i < rowCnt2.length ; i++){
		if(dataRow.ITM_CODE == gridRoot2.getItemFieldAt(i, "ITM_CODE")){
			alert(duplicateProduct);
			return;
		}
	}
	
	var _selectedIndex = dataGrid2._selectedIndex;
	
	if(dataRow != null && dataRow != "" || dataRow != undefined){
		
		if(_selectedIndex != -1){
			
			//gridRoot2.setItemFieldAt( 'I' , _selectedIndex, "INPUT_YN");
			gridRoot2.setItemFieldAt( dataRow.ITM_NAME , _selectedIndex, "ITM_NAME");
			gridRoot2.setItemFieldAt( dataRow.IPSU_QTY , _selectedIndex, "IPSU_QTY");
			gridRoot2.setItemFieldAt( dataRow.INV_END_QTY , _selectedIndex, "INV_END_QTY");
			gridRoot2.setItemFieldAt( dataRow.ITM_CODE , _selectedIndex, "ITM_CODE");
			gridRoot2.setItemFieldAt( dataRow.SCAN_CODE , _selectedIndex, "SCAN_CODE");
			gridRoot2.setItemFieldAt( dataRow.UNIT , _selectedIndex, "UNIT");
			gridRoot2.setItemFieldAt( dataRow.WPRC , _selectedIndex, "WPRC");
			gridRoot2.setItemFieldAt( dataRow.SPRC , _selectedIndex, "SPRC");
			gridRoot2.setItemFieldAt( dataRow.EVT_SPRC , _selectedIndex, "EVT_SPRC");
			gridRoot2.setItemFieldAt( dataRow.GRE_GB , _selectedIndex, "GRE_GB");
			
			if(dataRow.EVT_GB == "행사"){
				gridRoot2.setItemFieldAt( "2" , _selectedIndex, "ORD_FLAG");
				gridRoot2.setItemFieldAt( "행사" , _selectedIndex, "ORD_FLAG_NAME");
				gridRoot2.setItemFieldAt( dataRow.IMAGE_NUM , _selectedIndex, "IMAGE_NUM");
				gridRoot2.setItemFieldAt( dataRow.EVT_CODE , _selectedIndex, "EVT_CODE");
			}else{
				gridRoot2.setItemFieldAt( "1" , _selectedIndex, "ORD_FLAG");
				gridRoot2.setItemFieldAt( "정상" , _selectedIndex, "ORD_FLAG_NAME");
			}
			
			var value = {};
			value.rowIndex = dataGrid2._selectedIndex;
			value.columnIndex = 7;
			dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
		}
	}
	
}

//행추가
function addRow(){
	
	if($("#ORD_STAT_CD").val() != "00" && $("#SLIP_NO").val() != ""){
		alert("상품등록은 가접수 상태일때만 가능합니다.");
		return;
	}
	
	if($("#CUST_NO").val() == "" ){
		alert(selectCust);
		return;
	}
	
	if($("#STR_CODE").val() == "" ){
		alert(selectStore);
		return;
	}
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	
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
	
	var INPUT_YN = xmlDoc.createElement("INPUT_YN");
	var RN = xmlDoc.createElement("RN");
	var IMAGE_NUM = xmlDoc.createElement("IMAGE_NUM");
	var STR_CODE = xmlDoc.createElement("STR_CODE");
	var ITM_NAME = xmlDoc.createElement("ITM_NAME");
	var ORD_QTY = xmlDoc.createElement("ORD_QTY");
	var IPSU_QTY = xmlDoc.createElement("IPSU_QTY");
	var INV_END_QTY = xmlDoc.createElement("INV_END_QTY");
	var ITM_CODE = xmlDoc.createElement("ITM_CODE");
	var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
	var UNIT = xmlDoc.createElement("UNIT");
	var WPRC = xmlDoc.createElement("WPRC");
	var SPRC = xmlDoc.createElement("SPRC");
	var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
	var EVT_SPRC_TOTAL = xmlDoc.createElement("EVT_SPRC_TOTAL");
	var ORD_FLAG = xmlDoc.createElement("ORD_FLAG");
	var ORD_FLAG_NAME = xmlDoc.createElement("ORD_FLAG_NAME");
	var REMARK = xmlDoc.createElement("REMARK");
	var GRE_GB = xmlDoc.createElement("GRE_GB");
	var EVT_CODE = xmlDoc.createElement("EVT_CODE");
	
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	RN.appendChild(xmlDoc.createTextNode( rowCnt2.length+1 ));
	IMAGE_NUM.appendChild(xmlDoc.createTextNode( '' ));
	STR_CODE.appendChild(xmlDoc.createTextNode( '' ));
	ITM_NAME.appendChild(xmlDoc.createTextNode( '' ));
	ORD_QTY.appendChild(xmlDoc.createTextNode( '' ));
	IPSU_QTY.appendChild(xmlDoc.createTextNode( '' ));
	INV_END_QTY.appendChild(xmlDoc.createTextNode( '' ));
	ITM_CODE.appendChild(xmlDoc.createTextNode( '' ));
	SCAN_CODE.appendChild(xmlDoc.createTextNode( '' ));
	UNIT.appendChild(xmlDoc.createTextNode( '' ));
	WPRC.appendChild(xmlDoc.createTextNode( '' ));
	SPRC.appendChild(xmlDoc.createTextNode( '' ));
	EVT_SPRC.appendChild(xmlDoc.createTextNode( '' ));
	EVT_SPRC_TOTAL.appendChild(xmlDoc.createTextNode( '' ));
	ORD_FLAG.appendChild(xmlDoc.createTextNode( '' ));
	ORD_FLAG_NAME.appendChild(xmlDoc.createTextNode( '' ));
	REMARK.appendChild(xmlDoc.createTextNode( '' ));
	GRE_GB.appendChild(xmlDoc.createTextNode( '' ));
	EVT_CODE.appendChild(xmlDoc.createTextNode( '' ));
	
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IMAGE_NUM);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_QTY);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IPSU_QTY);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC_TOTAL);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_FLAG);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_FLAG_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(GRE_GB);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_CODE);
	
	gridRoot2.addItemAt(  xmlDoc  , -1);
	//girdMoveSelctedIndex();
	
	//var rowCnt = gridRoot2.getCollection().getSource();
	//alert(rowCnt.length);
	
	//주문상품건수 확인
	var rowCnt = 0;
	var sumPrice = 0;
	if(rowCnt2.length+1 > 0){
		for(var i=0 ; i < rowCnt2.length ; i++){
			//gridRoot2.getItemFieldAt(i, "ITM_CODE")
			if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "D"){
				rowCnt++;
				if(gridRoot2.getItemFieldAt(i, "ORD_QTY") != "" && gridRoot2.getItemFieldAt(i, "ORD_QTY") != undefined){
					sumPrice = sumPrice + (Number(gridRoot2.getItemFieldAt(i, "ORD_QTY")) * Number(gridRoot2.getItemFieldAt(i, "EVT_SPRC")));
				}
			}
		}
	}
	$("#ORD_CNT").val(rowCnt);
	$("#ORD_TOT").val(sumPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	
	//selectedIndex =  rowCnt2.length+1;
}

//그리드의 selctedIndex를 전달된 행으로 이동
function girdMoveSelctedIndex(idx) {
	// addItemAt나 removeItemAt후에 바로 selctedIndex를 변경하면 무시되는 경우가 발생하여 setTimeout로 지연후 실행토록 함
	setTimeout("gridSetSelectedIndex("+idx+")", 100);
}

function gridSetSelectedIndex(idx) {
	// 현재 그리드의 verticalScrollPosition을 조사하여 스크롤을 일으킬지 조사하여 필요시 세팅
	var verticalScrollPosition = dataGrid2.getVerticalScrollPosition();
	// 그리드의 행수를 가져옵니다 (이 값은 화면에 제대로 표시되지 않는 행을 포함하기 때문에 실제와 다른 값으로 보일 수 있으며, DataGrid의 variableRowHeight가 true일 경우에는 추정치를 의미합니다.
	var rowCount = dataGrid2.getRowCount();
	if (rowCount > 0)
		rowCount = rowCount - 1;
	var halfRowCount = (rowCount / 2).toFixed();

	// idx가 값이 없는 경우 collection에서 현재 데이터의 레코드수를 가져와 맨 마지막 행값을 계산.
	if (idx == null || idx == undefined) {
		if (!collection2)
			collection2 = gridRoot2.getCollection();
		idx = collection2.getLength() - 1;
	}
	dataGrid2.setSelectedIndex(idx);
	if (idx < verticalScrollPosition || idx > verticalScrollPosition + rowCount) {
		if (idx - halfRowCount >= 0)	// 화면 중간에 위치하도록 계산
			dataGrid2.setVerticalScrollPosition(idx - halfRowCount);
		else
			dataGrid2.setVerticalScrollPosition(0);
	}
}

//조회 항목 초기화
function btnNew(){
	$("#CUST_NO").val("");
	$("#CUST_NAME").val("");
	$("#STR_CODE").val("");
	$("#PAY_METH").val("2");
	$("#SMS_YN").val("");
	$("#CREDIT_LIMIT").val("");
	$("#ACCT_REABLE").val("");
	$("#CREDIT_USE_LIMIT").val("");
	$("#TEL_NO_1").val("");
	$("#TEL_NO_2").val("");
	$("#TEL_NO_3").val("");
	$("#MOBIL_NO_1").val("");
	$("#MOBIL_NO_2").val("");
	$("#MOBIL_NO_3").val("");
	$("#MBR_GRADE").val("");
	$("#MBR_GROUP").val("");
	$("#BUSI_FLAG_NAME").val("");
	$("#ADDR").val("");
	$("#ADDR_DTL").val("");
	$("#ORD_ADDR").val("");
	$("#ORD_ADDR_DTL").val("");
	$("#SLIP_NO").val("");
	$("#RESERVE_DT").val("");
	$("#RESERVE_TIME").val("");
	$("#ORD_STAT").val("");
	$("#REMARK").val("");
	$("#SMS_YN_Y").attr("checked", "checked");
	$("#ADDR_SAME_YN").attr("checked", false);
	
	$("#IEMP_NM").val($("#SESSION_USER_NM").val());
	$("#IDATE").val(todayGetDate);
	
	var RESERVE_DT = new CommDateManager().getDate("yyyy-mm-dd");
	$('#RESERVE_DT').val(RESERVE_DT);
	//$("#RESERVE_TIME").val(hh + ":" + min);
	
	$("#ORD_CNT").val("");
	$("#ORD_TOT").val("");
	
	var clearData = [];
	gridApp1.setData(clearData);
	gridRoot2.removeAll();
	gridRoot3.removeAll();
}


//주문 이력조회
function selectOrderHistory(CUST_NO, STR_CODE){
	
	//로딩바 출력
	showLoadingBar1();
	
	jQuery.ajax({ 
	    url:"/businessCallOrderHistory.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'CUST_NO' : CUST_NO
				,	'STR_CODE' : STR_CODE
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

function selectPos(CUST_NO, SLIP_NO){
	
	//로딩바 출력
	showLoadingBar3();
	
	jQuery.ajax({ 
	    url:"/selectBusinessCallPos.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'CUST_NO' : CUST_NO
				,	'SLIP_NO' : SLIP_NO
				},
		success:function(data){
			gridApp3.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar3();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar3();
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function selectOrderSearch(CUST_NO, SLIP_NO){
	
	//로딩바 출력
	showLoadingBar2();
	
	jQuery.ajax({ 
	    url:"/businessCallOrderProduct.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {
					'CUST_NO' : CUST_NO
				,	'SLIP_NO' : SLIP_NO
				},
		success:function(data){
			
			gridRoot2.removeAll();
			
			if(data.length > 0){
				
				var ORD_CNT = data.length;
				var ORD_TOT = 0;
				
				for(var i=0; i <data.length ; i++){
				
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
					
					var INPUT_YN = xmlDoc.createElement("INPUT_YN");
					var RN = xmlDoc.createElement("RN");
					var IMAGE_NUM = xmlDoc.createElement("IMAGE_NUM");
					var STR_CODE = xmlDoc.createElement("STR_CODE");
					var ITM_NAME = xmlDoc.createElement("ITM_NAME");
					var ORD_QTY = xmlDoc.createElement("ORD_QTY");
					var IPSU_QTY = xmlDoc.createElement("IPSU_QTY");
					var INV_END_QTY = xmlDoc.createElement("INV_END_QTY");
					var ITM_CODE = xmlDoc.createElement("ITM_CODE");
					var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
					var UNIT = xmlDoc.createElement("UNIT");
					var WPRC = xmlDoc.createElement("WPRC");
					var SPRC = xmlDoc.createElement("SPRC");
					var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
					var EVT_SPRC_TOTAL = xmlDoc.createElement("EVT_SPRC_TOTAL");
					var ORD_FLAG = xmlDoc.createElement("ORD_FLAG");
					var ORD_FLAG_NAME = xmlDoc.createElement("ORD_FLAG_NAME");
					var REMARK = xmlDoc.createElement("REMARK");
					var GRE_GB = xmlDoc.createElement("GRE_GB");
					var EVT_CODE = xmlDoc.createElement("EVT_CODE");
					
					INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
					RN.appendChild(xmlDoc.createTextNode( data[i].RN ));
					IMAGE_NUM.appendChild(xmlDoc.createTextNode( data[i].IMAGE_NUM ));
					STR_CODE.appendChild(xmlDoc.createTextNode( data[i].STR_CODE ));
					ITM_NAME.appendChild(xmlDoc.createTextNode( data[i].ITM_NAME ));
					ORD_QTY.appendChild(xmlDoc.createTextNode( data[i].ORD_QTY ));
					IPSU_QTY.appendChild(xmlDoc.createTextNode( data[i].IPSU_QTY ));
					INV_END_QTY.appendChild(xmlDoc.createTextNode( data[i].INV_END_QTY ));
					ITM_CODE.appendChild(xmlDoc.createTextNode( data[i].ITM_CODE ));
					SCAN_CODE.appendChild(xmlDoc.createTextNode( data[i].SCAN_CODE ));
					UNIT.appendChild(xmlDoc.createTextNode( toTEXT(data[i].UNIT) ));
					WPRC.appendChild(xmlDoc.createTextNode( data[i].WPRC ));
					SPRC.appendChild(xmlDoc.createTextNode( data[i].SPRC ));
					EVT_SPRC.appendChild(xmlDoc.createTextNode( data[i].EVT_SPRC ));
					EVT_SPRC_TOTAL.appendChild(xmlDoc.createTextNode( data[i].EVT_SPRC_TOTAL ));
					ORD_FLAG.appendChild(xmlDoc.createTextNode( data[i].ORD_FLAG ));
					ORD_FLAG_NAME.appendChild(xmlDoc.createTextNode( data[i].ORD_FLAG_NAME ));
					REMARK.appendChild(xmlDoc.createTextNode( toTEXT(data[i].REMARK) ));
					GRE_GB.appendChild(xmlDoc.createTextNode( toTEXT(data[i].GRE_GB) ));
					EVT_CODE.appendChild(xmlDoc.createTextNode( toTEXT(data[i].EVT_CODE) ));
					
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RN);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IMAGE_NUM);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_QTY);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IPSU_QTY);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WPRC);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC_TOTAL);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_FLAG);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_FLAG_NAME);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(GRE_GB);
					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_CODE);
					
					ORD_TOT = ORD_TOT + (Number(data[i].EVT_SPRC) * Number(data[i].ORD_QTY));
					
					gridRoot2.addItemAt(  xmlDoc  , -1, false);
					
					//i (index) 입력하여 그리드 아이템 가져오기
					var selectedItem = gridRoot2.getItemAt(i);
					//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
					gridRoot2.removeChangedData(selectedItem);
				}
				
				$("#ORD_CNT").val(ORD_CNT);
				$("#ORD_TOT").val(ORD_TOT.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				
				dataGrid2.invalidateList();
				
			}
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar2();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar2();
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

function selectUserSearch(CUST_NO, SLIP_NO){
	jQuery.ajax({ 
	    url:"/businessCallOrderUser.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'CUST_NO' : CUST_NO
				,	'SLIP_NO' : SLIP_NO
				},
		success:function(data){
			
			if(data != null && data != "undefined" && data != "[]"){
				
				$("#CUST_NO").val(data[0].CUST_NO);
				$("#CUST_NAME").val("(" + data[0].CUST_NO + ")" + data[0].CUST_NAME);
				if(data[0].SMS_YN == "2"){
					$("#SMS_YN_Y").attr("checked", "checked");
				}else{
					$("#SMS_YN_N").attr("checked", "checked");
				}
				$("#CREDIT_LIMIT").val(data[0].CREDIT_LIMIT);
				$("#ACCT_REABLE").val(data[0].ACCT_REABLE);
				$("#CREDIT_USE_LIMIT").val(data[0].CREDIT_USE_LIMIT);
				if(data[0].TEL_NO != "" && data[0].TEL_NO != null){
					var telNo = CommonJs.phoneFomatterArr(data[0].TEL_NO + data[0].END_TEL_NO);
					if(telNo.length == 3){
						$("#TEL_NO_1").val(telNo[0]);
						$("#TEL_NO_2").val(telNo[1]);
						$("#TEL_NO_3").val(telNo[2]);
					}else{
						$("#TEL_NO_2").val(telNo[0]);
						$("#TEL_NO_3").val(telNo[1]);
					}
				}
				if(data[0].MOBIL_NO != "" && data[0].MOBIL_NO != null){
					var mobilNo = CommonJs.phoneFomatterArr(data[0].MOBIL_NO);
					if(mobilNo.length == 3){
						$("#MOBIL_NO_1").val(mobilNo[0]);
						$("#MOBIL_NO_2").val(mobilNo[1]);
						$("#MOBIL_NO_3").val(mobilNo[2]);
					}
				}
				$("#MBR_GRADE").val(data[0].MBR_GRADE);
				$("#ADDR").val(data[0].ADDR);
				$("#ADDR_DTL").val(data[0].ADDR_DTL);
				$("#ORD_ADDR").val(data[0].ORD_ADDR);
				$("#ORD_ADDR_DTL").val(data[0].ORD_ADDR_DTL);
				$("#BUSI_FLAG").val(data[0].BUSI_FLAG);
				$("#BUSI_FLAG_NAME").val(data[0].BUSI_FLAG_NAME);
				$("#ORD_STAT").val(data[0].ORD_STAT);
				$("#ORD_STAT_CD").val(data[0].ORD_STAT_CD);
				$("#RESERVE_DT").val(data[0].RESERVE_DT);
				$("#RESERVE_TIME").val(data[0].RESERVE_TIME);
				$("#REMARK").val(data[0].REMARK);
				$("#STR_CODE").val(data[0].STR_CODE);
				$("#SLIP_NO").val(data[0].SLIP_NO);
				$("#ORD_DT").val(data[0].ORD_DT);
				$("#IEMP_NM").val(data[0].IEMP_NM);
				$("#IDATE").val(data[0].IDATE);
				$("#PAY_METH").val(data[0].PAY_METH);
			}
			
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}



//주문번호 조회
function btnSearch(){
	
	if($("#S_SLIP_NO").val() == ""){
		//조회할 주문번호를 입력하세요.
		alert(msgSelectSlip);
		return;
	}
	
	btnNew();
	
	var CUST_NO = $("#S_CUST_NO").val();
	var SLIP_NO = $("#S_SLIP_NO").val();
	
	selectUserSearch(CUST_NO, SLIP_NO);
	selectOrderSearch(CUST_NO, SLIP_NO);
	selectOrderHistory(CUST_NO, '');
	selectPos(CUST_NO, SLIP_NO);
}

var myVar = "";
function btnSaveCheck() {
    myVar = setTimeout(btnSave, 500);
}

function btnSave(){
	
	var nullCheck = gridRoot2.getCollection().getSource().length;
	for(var i=0 ; i < nullCheck ; i++){
		if(gridRoot2.getItemFieldAt(i, "ITM_CODE") == undefined || gridRoot2.getItemFieldAt(i, "ITM_NAME") == undefined || gridRoot2.getItemFieldAt(i, "SCAN_CODE") == undefined){
			gridRoot2.removeItemAt(i);
		}
	}
	
	if($("#ORD_STAT_CD").val() != "00" && $("#SLIP_NO").val() != ""){
		alert("접수내용의 수정은 가접수 상태일때만 가능합니다.");
		return;
	}
	
	/*if($("#ORD_STAT_CD").val() == "30" || $("#ORD_STAT_CD").val() == "20"){
		//배달완료 상태인 주문은 저장할 수 없습니다.
		alert(msgOrderCantUpdate);
		return;
	}*/
	
	if($("#CUST_NO").val() == ""){
		alert("회원명은 필수 입력항목입니다. 회원을 조회 후 실행해주세요.");
		return;
	}
	
	if($("#STR_CODE").val() == ""){
		alert(storeName + msgConfirm);
		return;
	}
	
	if($("#PAY_METH").val() == ""){
		alert(payType + msgConfirm);
		return;
	}
	
	var CREDIT_USE_LIMIT = Number($("#CREDIT_USE_LIMIT").val());
	var ORD_TOT = Number($("#ORD_TOT").val().replace(/,/g, ''));
	
	if(CREDIT_USE_LIMIT != 0 && $("#CREDIT_LIMIT").val() != "0"){
		if(ORD_TOT > CREDIT_USE_LIMIT){
			alert("주문금액이 가용한도를 초과하여 접수등록을 수행할 수 없습니다.");
			return;
		}
	}
	/*if($("#ORD_ADDR").val() == "" || $("#ORD_ADDR_DTL").val() == ""){
		alert(mentOrganization18);
		return;
	}*/
	var tAmt = $("#ORD_TOT").val().replace(/,/gi,'');
	
	if(isNaN(Number(tAmt)) ){
		alert("합계금액이 맞지 않습니다. 주문수량을 확인 해 주세요.");
		return;
	}
	
	var gridXmlData = "";
	
	var rowCnt = gridRoot2.getCollection().getSource();
	
	var updateRowCnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "ORD_QTY") == "" || gridRoot2.getItemFieldAt(i, "ORD_QTY") == "0" || gridRoot2.getItemFieldAt(i, "ORD_QTY") == undefined ||
				gridRoot2.getItemFieldAt(i, "ITM_CODE") == "" || gridRoot2.getItemFieldAt(i, "ITM_CODE") == "0" || gridRoot2.getItemFieldAt(i, "ITM_CODE") == undefined){
			//주문내용이 공백이거나 수량이 0인 상품이 존재합니다.
			alert(msgProductNull);
			return;
		}
		
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData = gridXmlData + getXmlString(   gridRoot2.getItemAt(i)   );
			updateRowCnt++;
		}
	}
	
	/*if(updateRowCnt == 0){
		alert(noneChangeData);
		return;
	}*/
	
	if(confirm(msgSaveConfirm) == false) return;
	
	var SMS_YN = "1";
	
	if($("#SMS_YN_Y").is(":checked")){
		SMS_YN = "2";
	}
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ;
	
	jQuery.ajax({ 
	    url:"/businessCallReceiptRegist.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {
					"gridXmlData" : gridXmlData
				,	"CUST_NO"	: $("#CUST_NO").val()
				,	"ORD_DT" : $("#ORD_DT").val()
				,	"CUST_NAME" : $("#CUST_NAME").val()
				,	"STR_CODE" : $("#STR_CODE").val()
				,	"PAY_METH" : $("#PAY_METH").val()
				,	"SMS_YN" : SMS_YN
				,	"ORD_ADDR" : $("#ORD_ADDR").val()
				,	"ORD_ADDR_DTL" : $("#ORD_ADDR_DTL").val()
				,	"SLIP_NO" : $("#SLIP_NO").val()
				,	"RESERVE_DT" : $("#RESERVE_DT").val()
				,	"RESERVE_TIME" : $("#RESERVE_TIME").val()
				,	"ORD_MTHD" : $("#ORD_MTHD").val()
				,	"REMARK" : $("#REMARK").val()
		        }, 
		success:function(data){   
			
			btnNew();
			if($("#S_SLIP_NO").val() != ""){
				btnSearch();
			}
			alert(msgSave);
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btnDetermine(){
	
	if($("#SLIP_NO").val() == "" || $("#SLIP_NO").val() == undefined){
		alert("신규 등록시에는 '저장' 후 확정이 가능합니다.");
		return;
	}
	
	if($("#ORD_STAT_CD").val() == "30" || $("#ORD_STAT_CD").val() == "20"){
		//배달완료 상태인 주문은 저장할 수 없습니다.
		alert(msgOrderCantUpdate);
		return;
	}
	
	if($("#ORD_DT").val() == ""){
		alert(determineOrder);
		return;
	}
	
	if(confirm(confirmDetermine) == false) return;
	
	jQuery.ajax({ 
	    url:"/businessCallDetermine.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {
					"CUST_NO"	: $("#CUST_NO").val()
				,	"SLIP_NO" : $("#SLIP_NO").val()
		        }, 
		success:function(data){   
			
			alert(msgSave);
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

function deleteRow(){
	var rowIndex2 = dataGrid2.getSelectedIndex();
	if (rowIndex2 >= 0){
		gridRoot2.removeItemAt(rowIndex2);
		if(gridRoot2.getItemFieldAt(rowIndex2, "INPUT_YN") == "N"){
			gridRoot2.setItemFieldAt( "D" , rowIndex2, "INPUT_YN");
		}
	}
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	var rowCnt = 0;
	var sumPrice = 0;
	if(rowCnt2.length > 0){
		for(var i=0 ; i < rowCnt2.length ; i++){
			//gridRoot2.getItemFieldAt(i, "ITM_CODE")
			if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "D"){
				rowCnt++;
				if(gridRoot2.getItemFieldAt(i, "ORD_QTY") != "" && gridRoot2.getItemFieldAt(i, "ORD_QTY") != undefined){
					sumPrice = sumPrice + (Number(gridRoot2.getItemFieldAt(i, "ORD_QTY")) * Number(gridRoot2.getItemFieldAt(i, "EVT_SPRC")));
				}
			}
		}
	}
	$("#ORD_CNT").val(rowCnt);
	$("#ORD_TOT").val(sumPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	
}

function btnChoose(){
	
	var selectorColumn = gridRoot1.getObjectById("selector");
	var selectedProduct = selectorColumn.getSelectedIndices();
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	
	if(rowCnt2.length > 0){
		for(var i=0; i < selectedProduct.length ; i++){
			for(var ii=0 ; ii < rowCnt2.length ; ii++){
				if(gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "SCAN_CODE") == gridRoot2.getItemFieldAt(ii, "SCAN_CODE")){
					alert(duplicateProduct);
					return;
				}
			}
		}
	}
	
	if(selectedProduct.length < 1){
		alert("주문이력" + msgConfirm);
		return;
	}
	
	if(confirm(confirmOrder) == false) return;
	
	for(var i=0; i < selectedProduct.length ; i++){
		//gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_CODE")
		btnChooseInsert(gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "STR_CODE"), gridRoot1.getItemFieldAt(Number(selectedProduct[i]), "ITM_CODE"));
	}
	
	var value = {};
	value.rowIndex = gridRoot2.getCollection().getSource().length-1;
	value.columnIndex = 7;
	dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
}

function btnChoosePOS(){
	
	var selectorColumn = gridRoot3.getObjectById("selector");
	var selectedProduct = selectorColumn.getSelectedIndices();
	
	var rowCnt2 = gridRoot2.getCollection().getSource();
	
	if(rowCnt2.length > 0){
		for(var i=0; i < selectedProduct.length ; i++){
			for(var ii=0 ; ii < rowCnt2.length ; ii++){
				if(gridRoot3.getItemFieldAt(Number(selectedProduct[i]), "SCAN_CODE") == gridRoot2.getItemFieldAt(ii, "SCAN_CODE")){
					alert(duplicateProduct);
					return;
				}
			}
		}
	}
	
	if(selectedProduct.length < 1){
		alert("선택 된 내역이 없습니다.");
		return;
	}
	
	if(confirm(confirmOrder) == false) return;
	
	for(var i=0; i < selectedProduct.length ; i++){
		//gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_CODE")
		btnChooseInsert(gridRoot3.getItemFieldAt(Number(selectedProduct[i]), "STR_CODE"), gridRoot3.getItemFieldAt(Number(selectedProduct[i]), "ITM_CODE"));
	}
	
	var value = {};
	value.rowIndex = gridRoot2.getCollection().getSource().length-1;
	value.columnIndex = 7;
	dataGrid2.setEditedItemPosition(value);   // dateGrid 객체에서 불러오는 함수입니다.
}

function btnChooseInsert(STR_CODE, ITM_CODE){
	jQuery.ajax({ 
	    url:"/businessCallSelectProduct2.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : STR_CODE
				,	'ITM_CODE' : ITM_CODE
				},
		success:function(data){
			if(data != null && data.length > 0){
				
				var rowCnt2 = gridRoot2.getCollection().getSource();
				
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
				
				var INPUT_YN = xmlDoc.createElement("INPUT_YN");
				var RN = xmlDoc.createElement("RN");
				var IMAGE_NUM = xmlDoc.createElement("IMAGE_NUM");
				var STR_CODE = xmlDoc.createElement("STR_CODE");
				var ITM_NAME = xmlDoc.createElement("ITM_NAME");
				var ORD_QTY = xmlDoc.createElement("ORD_QTY");
				var IPSU_QTY = xmlDoc.createElement("IPSU_QTY");
				var INV_END_QTY = xmlDoc.createElement("INV_END_QTY");
				var ITM_CODE = xmlDoc.createElement("ITM_CODE");
				var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
				var UNIT = xmlDoc.createElement("UNIT");
				var WPRC = xmlDoc.createElement("WPRC");
				var SPRC = xmlDoc.createElement("SPRC");
				var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
				var EVT_SPRC_TOTAL = xmlDoc.createElement("EVT_SPRC_TOTAL");
				var ORD_FLAG = xmlDoc.createElement("ORD_FLAG");
				var ORD_FLAG_NAME = xmlDoc.createElement("ORD_FLAG_NAME");
				var REMARK = xmlDoc.createElement("REMARK");
				var GRE_GB = xmlDoc.createElement("GRE_GB");
				var EVT_CODE = xmlDoc.createElement("EVT_CODE");
				
				INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
				RN.appendChild(xmlDoc.createTextNode( rowCnt2.length+1 ));
				IMAGE_NUM.appendChild(xmlDoc.createTextNode( '' ));
				STR_CODE.appendChild(xmlDoc.createTextNode( '' ));
				ITM_NAME.appendChild(xmlDoc.createTextNode( data[0].ITM_NAME ));
				ORD_QTY.appendChild(xmlDoc.createTextNode( '' ));
				IPSU_QTY.appendChild(xmlDoc.createTextNode( data[0].IPSU_QTY ));
				INV_END_QTY.appendChild(xmlDoc.createTextNode( data[0].INV_END_QTY ));
				ITM_CODE.appendChild(xmlDoc.createTextNode( data[0].ITM_CODE ));
				SCAN_CODE.appendChild(xmlDoc.createTextNode( data[0].SCAN_CODE ));
				UNIT.appendChild(xmlDoc.createTextNode( data[0].UNIT ));
				WPRC.appendChild(xmlDoc.createTextNode( data[0].WPRC ));
				SPRC.appendChild(xmlDoc.createTextNode( data[0].SPRC ));
				EVT_SPRC.appendChild(xmlDoc.createTextNode( data[0].EVT_SPRC ));
				EVT_SPRC_TOTAL.appendChild(xmlDoc.createTextNode( '' ));
				ORD_FLAG.appendChild(xmlDoc.createTextNode( '1' ));
				ORD_FLAG_NAME.appendChild(xmlDoc.createTextNode( '정상' ));
				REMARK.appendChild(xmlDoc.createTextNode( '' ));
				GRE_GB.appendChild(xmlDoc.createTextNode( data[0].GRE_GB ));
				EVT_CODE.appendChild(xmlDoc.createTextNode( '' ));
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IMAGE_NUM);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_QTY);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IPSU_QTY);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC_TOTAL);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_FLAG);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_FLAG_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(REMARK);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(GRE_GB);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_CODE);
				
				gridRoot2.addItemAt(  xmlDoc  , -1);
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

function toTEXT(strValue){
	
	if(strValue == undefined || strValue == "") return strValue;
	
	var returnStr = strValue;
	returnStr = returnStr.replace("<br>", "\n");
	returnStr = returnStr.replace("&gt;", ">");
	returnStr = returnStr.replace("&lt;", "<");
	returnStr = returnStr.replace("&quot;", "\"");
	returnStr = returnStr.replace("&nbsp;", " ");
	returnStr = returnStr.replace("&amp;", "&");
	returnStr = returnStr.replace("\"", "&#34;");
	
	return returnStr;
}


//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
$(document).ready(function (){
	$("#iframeCnt").width($(window).width()-48);
	$(".tbl_st2 .ui-datepicker-trigger").css({float:"left"});
	$("#gridHolder2").height( $(window).height() - 537 );
	
	$(".lft_box, .rgt_box").width(($(window).width()-58)/2);

	$(window).on('resize',function (){	
		$("#iframeCnt").width($(window).width()-48);
		$("#gridHolder2").height( $(window).height() - 537 );
		
		$(".lft_box, .rgt_box").width(($(window).width()-58)/2);
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
