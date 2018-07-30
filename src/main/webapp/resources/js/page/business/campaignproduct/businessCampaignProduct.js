/********************************************************
 * 설명:  행사코드마스터관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2016.12.26
 * version : 1.0
 ********************************************************/

var selectedIndex = -1;
var G_FILE 			 =   "";

//행사 시작 종료일 중복체크를 위한 Date조회용 변수
var checkDate = {};

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

//로그인한 사용자의 추가정보 조회
var sessionOrgType = "";
var sessionOrgName = "";
var sessionStrCode = "";

$(document).ready(function(){
	
	init();
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	$(".memo").height(100);
	
	var EVT_STR_DT =new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var EVT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#top_search input[name=P_EVT_STR_DT]').val(EVT_STR_DT);
	$('#top_search input[name=P_EVT_END_DT]').val(EVT_END_DT);
	

	//달력설정
	$(".datepicker").datepicker({
		onSelect: function(dateText, e) {
			if(e.id == "EVT_STR_DT" || e.id == "EVT_END_DT"){
				var startDate = parseInt($("#EVT_STR_DT").val().replace(/-/g, ""));
				var endDate = parseInt($("#EVT_END_DT").val().replace(/-/g, ""));
				if(startDate > endDate)
				{
					alert("입력 날자 범위가 옳바르지 않습니다.");
					
					if(this.id == "EVT_STR_DT")
						$("#EVT_STR_DT").val("");
					else if(this.id == "EVT_END_DT")
						$("#EVT_END_DT").val("");
					
					return;
				}
			}else if(e.id == "P_EVT_STR_DT" || e.id == "P_EVT_END_DT"){
				var startDate = parseInt($("#P_EVT_STR_DT").val().replace(/-/g, ""));
				var endDate = parseInt($("#P_EVT_END_DT").val().replace(/-/g, ""));
				if(startDate > endDate)
				{
					alert(msgDateValidation);
					
					if(this.id == "P_EVT_STR_DT")
						$("#P_EVT_STR_DT").val(EVT_STR_DT);
					else if(this.id == "P_EVT_END_DT")
						$("#P_EVT_END_DT").val(EVT_END_DT);
					
					return;
				}
			}
			
		},showMonthAfterYear:true
	});
	
	// 팝업 초기설정
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
	
	$("#pop_wrap2").dialog({
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
	
	 $('#SPRC, #EVT_SPRC').number( true, 0 );
	 
	 /*$("#EVT_WPRC, #EVT_SPRC, #EVT_WVAT").keyup(function(){
		 
		 $("#EVT_TOTAL").val(Number($("#EVT_WPRC").val()) + Number($("#EVT_WVAT").val()));
		 
		 if($("#EVT_WPRC").val() != undefined && $("#EVT_WPRC").val() != "" && $("#EVT_SPRC").val() != undefined && $("#EVT_SPRC").val() != "" && $("#EVT_SPRC").val() != "0" && $("#EVT_WPRC").val() != "0"){
			 var MARGIN_EVT = (Number($("#EVT_SPRC").val()) - Number($("#EVT_WPRC").val())) / Number($("#EVT_SPRC").val()) * 100;
			 $("#MARGIN_EVT").val(MARGIN_EVT.toFixed(1));
		 }else{
			 $("#MARGIN_EVT").val("-");
		 }
	 });*/
	 $("#EVT_TOTAL").keyup(function(){
		 $(this).val( $(this).val().replace(/[^0-9.]/gi,"") );
		 var resultArr = calPriceVat($(this).val(), $("#TAX_GB").val());
		 $("#EVT_WPRC").val(resultArr[1]);
		 $("#EVT_WVAT").val(resultArr[2]);
	 });
	 
	 //$(document).on("keyup", "#EVT_TOTAL", function() {$(this).val( $(this).val().replace(/[^a-z0-9.:-]/gi,"") );});
	 $("#EVT_SPRC, #EVT_TOTAL").keyup(function(){
		 
		 //$("#EVT_TOTAL").val(Number($("#EVT_WPRC").val()) + Number($("#EVT_WVAT").val()));
		 if($("#EVT_TOTAL").val() != undefined && $("#EVT_TOTAL").val() != "" && $("#EVT_SPRC").val() != undefined && $("#EVT_SPRC").val() != "" && $("#EVT_SPRC").val() != "0" && $("#EVT_TOTAL").val() != "0"){
			 var MARGIN_EVT = (Number($("#EVT_SPRC").val()) - Number($("#EVT_TOTAL").val())) / Number($("#EVT_SPRC").val()) * 100;
			 $("#MARGIN_EVT").val(MARGIN_EVT.toFixed(1));
		 }else{
			 $("#MARGIN_EVT").val("-");
		 }
	 });
	 
	 $("#mid_search input[name=P_VEN_NAME]").keydown(function(event){
			$("#top_search input[name=P_VEN_CODE]").val("");
			if(event.keyCode == 13){
				btn_comm_supply_search_product();
			}
		});
		
		$("#mid_search input[name=P_ITM_NAME").keydown(function(event){
			$("#top_search input[name=P_ITM_CODE]").val("");
			if(event.keyCode == 13){
				btn_comm_product_search();
			}
		});
	 
	// 내용이 다른 같은 이름의 엑셀을 연속  올리면 file 의 change 에서 인식 못하므로 "엑셀 로드" 버튼을 만들고, G_FILE이라는 전역변수를 사용했음 
		$('#excelFile').change(function (e) {
			G_FILE  = e;    
		});
	 
	 //사용자 권한정보 조회
	 var psotValue = {};
	 
	 jQuery.ajax({ 
		    url:"/selectUserOrgType.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: psotValue,
			success:function(data){  
				//alert(data[0].ORG_TYPE);
				//alert(data[0].ORG_NAME);
				sessionOrgType = data[0].ORG_TYPE;
				sessionOrgName = data[0].ORG_NAME;
				sessionStrCode = data[0].STR_CODE;
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
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
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%", "200px");
rMateGridH5.create("grid2", "gridHolder2", jsVars+"&dataType=xml", "100%");
rMateGridH5.create("grid3", "gridHolder3", jsVars, "300px", "350px");
rMateGridH5.create("grid4", "gridHolder4", jsVars, "100%", "350px");
rMateGridH5.create("grid5", "gridHolder5", jsVars+"&dataType=xml", "100%", "350px");

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
		
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData1 = dataRow1[dataField];
			
			rowIndex2 = -1;
			selectEVTItem();
			
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
		gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp2.setDataType("xml");
		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData2);
		
		var itemClickHandler2 = function(event) {
			var rowIndex = event.rowIndex;
			rowIndex2 = rowIndex;
			selectedIndex = rowIndex;
			var columnIndex = event.columnIndex;
			dataRow2 = gridRoot2.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid2.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData1 = dataRow2[dataField];
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
			if (dataField == "SCAN_CODE") {
				editRowIndex = rowIndex;
				editDataRow = dataRow;
				editDataField = dataField;
				// pop up edit window
				btn_comm_store_search();
			}
		};
		
		//그리드2 핸들러
		var layoutCompleteHandler2 = function(event) {
			dataGrid2 = gridRoot2.getDataGrid();	// 그리드 객체 

			var POINT_SAVE_NM = gridRoot2.getObjectById("POINT_SAVE_NM");
			POINT_SAVE_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid('POINT_SAVE') );
			
			dataGrid2.addEventListener("itemClick", itemClickHandler2);
			
			//그리드2 더블클릭 이벤트
			dataGrid2.setDoubleClickEnabled(true);
			dataGrid2.addEventListener("itemDoubleClick", itemDoubleClickHandler2);
		};
		
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot2.addEventListener("itemDataChanged", itemDataChangeHandler2);
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드2 핸들러 생성.
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2); 
		
		
	}else if (id == "grid3") {
		
		gridApp3 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot3 = gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp3.setLayout(layoutStr3);
		gridApp3.setData(gridData3);
		
		var itemClickHandler3 = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow3 = gridRoot3.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData3 = dataRow3[dataField];
		};
		
		var layoutCompleteHandler3 = function(event) {
			dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체
			
			dataGrid3.addEventListener("itemClick", itemClickHandler3);

		};
		
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		
	}else if (id == "grid4") {
		
		gridApp4 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot4 = gridApp4.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp4.setLayout(layoutStr4);
		gridApp4.setData(gridData4);
		
		var itemClickHandler4 = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow4 = gridRoot4.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData4 = dataRow4[dataField];
		};
		
		var layoutCompleteHandler4 = function(event) {
			dataGrid4 = gridRoot4.getDataGrid();	// 그리드 객체
			
			dataGrid4.addEventListener("itemClick", itemClickHandler4);

		};
		
		gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4);
		
	}else if(id == "grid5"){
		gridApp5 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot5 = gridApp5.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp5.setDataType("xml");
		gridApp5.setLayout(layoutStr5);
		gridApp5.setData(gridData5);
		
		var itemClickHandler5 = function(event) {
			var rowIndex = event.rowIndex;
			rowIndex5 = rowIndex;
			selectedIndex = rowIndex;
			var columnIndex = event.columnIndex;
			dataRow5 = gridRoot5.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid5.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData5 = dataRow5[dataField];
		};
		
		var itemDoubleClickHandler5 = function(event) {
			var rowIndex = event.rowIndex;
			selectedIndex = rowIndex;
			var columnIndex = event.columnIndex;
			var dataRow = gridRoot5.getItemAt(rowIndex);
			dataRow5 = gridRoot5.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid5.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			/*
			if (dataField == "SCAN_CODE") {
				editRowIndex = rowIndex;
				editDataRow = dataRow;
				editDataField = dataField;
				// pop up edit window
				btn_comm_store_search();
			}
			*/
		};
		
		//그리드5 핸들러
		var layoutCompleteHandler5 = function(event) {
			dataGrid5 = gridRoot5.getDataGrid();	// 그리드 객체 

			var POINT_SAVE_NM = gridRoot5.getObjectById("POINT_SAVE_NM");
			POINT_SAVE_NM.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid('POINT_SAVE') );
			
			dataGrid5.addEventListener("itemClick", itemClickHandler5);
			
			//그리드2 더블클릭 이벤트
			dataGrid5.setDoubleClickEnabled(true);
			dataGrid5.addEventListener("itemDoubleClick", itemDoubleClickHandler5);
		};
		
		// 그리드내 콤보박스 change 시 이벤트
		gridRoot5.addEventListener("itemDataChanged", itemDataChangeHandler5);
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드2 핸들러 생성.
		gridRoot5.addEventListener("layoutComplete", layoutCompleteHandler5); 
		
		
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
	
	if(dataField == "EVT_WVAT"){
		var EVT_WPRC = gridRoot2.getItemFieldAt(rowIndex, "EVT_WPRC");
		gridRoot2.setItemFieldAt( Number(EVT_WPRC) + Number(newValue) , rowIndex, "EVT_TOTAL");
	}
	
	if(dataField == "EVT_TOTAL"){
		if(newValue > 0){
			//var EVT_WVAT = Number(newValue)/11;
			//var EVT_WPRC = Number(newValue) - Number(EVT_WVAT);
			
			//gridRoot2.setItemFieldAt( EVT_WPRC , rowIndex, "EVT_WPRC");
			//gridRoot2.setItemFieldAt( EVT_WVAT , rowIndex, "EVT_WVAT");
			
			var resultArr = calPriceVat(newValue, gridRoot2.getItemFieldAt(rowIndex, "TAX_GB"));
			gridRoot2.setItemFieldAt( resultArr[1] , rowIndex, "EVT_WPRC");
			gridRoot2.setItemFieldAt( resultArr[2] , rowIndex, "EVT_WVAT");
			//$("#EVT_WPRC").val(resultArr[1]);
			//$("#EVT_WVAT").val(resultArr[2]);
		}
	}

	if(dataField == "EVT_WPRC" || dataField == "EVT_SPRC"){
		
		var EVT_WPRC = gridRoot2.getItemFieldAt(rowIndex, "EVT_WPRC");
		var EVT_SPRC = gridRoot2.getItemFieldAt(rowIndex, "EVT_SPRC");
		var EVT_TOTAL = gridRoot2.getItemFieldAt(rowIndex, "EVT_TOTAL");
		
		if(newValue == "0"){
			alert("행사원가 및 행사매가에는 0원을 입력 할 수 없습니다.");
			return;
		}
		
		if(dataField == "EVT_WPRC"){
			var EVT_WVAT = Math.round(Number(EVT_WPRC) * 0.1);
			gridRoot2.setItemFieldAt( EVT_WVAT , rowIndex, "EVT_WVAT");
			gridRoot2.setItemFieldAt( Number(newValue) + Number(EVT_WVAT) , rowIndex, "EVT_TOTAL");
		}
		
		if(EVT_TOTAL != undefined && EVT_SPRC != undefined && EVT_TOTAL != "" && EVT_SPRC != ""){
			var MARGIN_EVT = (Number(EVT_SPRC) - Number(EVT_TOTAL)) / Number(EVT_SPRC) * 100;
			gridRoot2.setItemFieldAt( Math.round(MARGIN_EVT) , rowIndex, "MARGIN_EVT");
		}
		
		if(EVT_WPRC == undefined || EVT_SPRC == undefined){
			gridRoot2.setItemFieldAt( "0" , rowIndex, "MARGIN_EVT");
		}
		
	}
	
	if(dataField == "EVT_STR_DT" || dataField == "EVT_END_DT"){
		if(gridRoot2.getItemFieldAt(rowIndex, "EVT_STR_DT") != undefined  && gridRoot2.getItemFieldAt(rowIndex, "EVT_END_DT") != undefined ){
			//alert(gridRoot2.getItemFieldAt(rowIndex, "EVT_STR_DT"));
			//alert(gridRoot2.getItemFieldAt(rowIndex, "EVT_END_DT"));
			var EVT_STR_DT = gridRoot2.getItemFieldAt(rowIndex, "EVT_STR_DT");
			EVT_STR_DT = EVT_STR_DT.replace(/[^0-9]/gi,"");
			//EVT_STR_DT = EVT_STR_DT.replace("/", "");
			var EVT_END_DT = gridRoot2.getItemFieldAt(rowIndex, "EVT_END_DT");
			EVT_END_DT = EVT_END_DT.replace(/[^0-9]/gi,"");
			//EVT_END_DT = EVT_END_DT.replace("/", "");
			
			if(Number(EVT_STR_DT) > Number(EVT_END_DT)){
				alert("행사의 시작날짜 종료날짜보다 클 수 없습니다.");
				if(dataField == "EVT_STR_DT"){
					gridRoot2.setItemFieldAt( oldValue , rowIndex, "EVT_STR_DT");
				}else{
					gridRoot2.setItemFieldAt( oldValue , rowIndex, "EVT_END_DT");
				}
			}
		}
	}
	
	if(dataField == "ORD_STR_DT" || dataField == "ORD_END_DT"){
		if(gridRoot2.getItemFieldAt(rowIndex, "ORD_STR_DT") != undefined  && gridRoot2.getItemFieldAt(rowIndex, "ORD_END_DT") != undefined ){
			//alert(gridRoot2.getItemFieldAt(rowIndex, "ORD_STR_DT"));
			//alert(gridRoot2.getItemFieldAt(rowIndex, "ORD_END_DT"));
			var ORD_STR_DT = gridRoot2.getItemFieldAt(rowIndex, "ORD_STR_DT");
			ORD_STR_DT = ORD_STR_DT.replace(/[^0-9]/gi,"");
			//ORD_STR_DT = ORD_STR_DT.replace("/", "");
			var ORD_END_DT = gridRoot2.getItemFieldAt(rowIndex, "ORD_END_DT");
			ORD_END_DT = ORD_END_DT.replace(/[^0-9]/gi,"");
			//ORD_END_DT = ORD_END_DT.replace("/", "");
			
			if(Number(ORD_STR_DT) > Number(ORD_END_DT)){
				alert("발주의 시작날짜 종료날짜보다 클 수 없습니다.");
				if(dataField == "ORD_STR_DT"){
					gridRoot2.setItemFieldAt( oldValue , rowIndex, "ORD_STR_DT");
				}else{
					gridRoot2.setItemFieldAt( oldValue , rowIndex, "ORD_END_DT");
				}
			}
		}
	}
	
}

function itemDataChangeHandler5(event) {
	 
	var rowIndex = event.rowIndex;					// 변경된 행번호
	var columnIndex = event.columnIndex;		// 변경된 열번호
	var dataField = event.dataField;				// 변경된 열의 데이터 필드
	var dataRow = gridRoot5.getItemAt(rowIndex);	// 변경된 데이터 레코드
	var oldValue = event.value;						// 변경전 값
	var newValue = event.newValue;					// 변경후 값
	
	//수정값과 이전값이 같지 않은 경우 내용이 수정된것으로 판단 저장시 값을 전달한다.
	if(oldValue != newValue){
		if(gridRoot5.getItemFieldAt(rowIndex, "INPUT_YN") == "N"){
			gridRoot5.setItemFieldAt( "U" , rowIndex, "INPUT_YN");
		}
	}
	
	if(dataField == "EVT_TOTAL"){
		if(newValue > 0){
			//var EVT_WVAT = Number(newValue)/11;
			//var EVT_WPRC = Number(newValue) - Number(EVT_WVAT);
			
			//gridRoot2.setItemFieldAt( EVT_WPRC , rowIndex, "EVT_WPRC");
			//gridRoot2.setItemFieldAt( EVT_WVAT , rowIndex, "EVT_WVAT");
			
			var resultArr = calPriceVat(newValue, gridRoot5.getItemFieldAt(rowIndex, "TAX_GB"));
			gridRoot5.setItemFieldAt( resultArr[1] , rowIndex, "EVT_WPRC");
			gridRoot5.setItemFieldAt( resultArr[2] , rowIndex, "EVT_WVAT");
			//$("#EVT_WPRC").val(resultArr[1]);
			//$("#EVT_WVAT").val(resultArr[2]);
		}
	}
	
	if(dataField == "EVT_WVAT"){
		var EVT_WPRC = gridRoot5.getItemFieldAt(rowIndex, "EVT_WPRC");
		gridRoot5.setItemFieldAt( Number(EVT_WPRC) + Number(newValue) , rowIndex, "EVT_TOTAL");
	}

	if(dataField == "EVT_WPRC" || dataField == "EVT_SPRC"){
		
		var EVT_WPRC = gridRoot5.getItemFieldAt(rowIndex, "EVT_WPRC");
		var EVT_SPRC = gridRoot5.getItemFieldAt(rowIndex, "EVT_SPRC");
		var EVT_TOTAL = gridRoot5.getItemFieldAt(rowIndex, "EVT_TOTAL");
		
		if(newValue == "0"){
			alert("행사원가 및 행사매가에는 0원을 입력 할 수 없습니다.");
			return;
		}
		
		if(dataField == "EVT_WPRC"){
			var EVT_WVAT = Math.round(Number(EVT_WPRC) * 0.1);
			gridRoot5.setItemFieldAt( EVT_WVAT , rowIndex, "EVT_WVAT");
			gridRoot5.setItemFieldAt( Number(newValue) + Number(EVT_WVAT) , rowIndex, "EVT_TOTAL");
		}
		
		if(EVT_TOTAL != undefined && EVT_SPRC != undefined && EVT_TOTAL != "" && EVT_SPRC != ""){
			var MARGIN_EVT = (Number(EVT_SPRC) - Number(EVT_TOTAL)) / Number(EVT_SPRC) * 100;
			gridRoot5.setItemFieldAt( Math.round(MARGIN_EVT) , rowIndex, "MARGIN_EVT");
		}
		
		if(EVT_WPRC == undefined || EVT_SPRC == undefined){
			gridRoot5.setItemFieldAt( "0" , rowIndex, "MARGIN_EVT");
		}
		
	}
	
	if(dataField == "EVT_STR_DT" || dataField == "EVT_END_DT"){
		if(gridRoot5.getItemFieldAt(rowIndex, "EVT_STR_DT") != undefined  && gridRoot5.getItemFieldAt(rowIndex, "EVT_END_DT") != undefined ){
			var EVT_STR_DT = gridRoot5.getItemFieldAt(rowIndex, "EVT_STR_DT");
			EVT_STR_DT = EVT_STR_DT.replace(/[^0-9]/gi,"");
			//EVT_STR_DT = EVT_STR_DT.replace("/", "");
			var EVT_END_DT = gridRoot5.getItemFieldAt(rowIndex, "EVT_END_DT");
			EVT_END_DT = EVT_END_DT.replace(/[^0-9]/gi,"");
			//EVT_END_DT = EVT_END_DT.replace("/", "");
			
			if(Number(EVT_STR_DT) > Number(EVT_END_DT)){
				alert("행사의 시작날짜 종료날짜보다 클 수 없습니다.");
				if(dataField == "EVT_STR_DT"){
					gridRoot5.setItemFieldAt( oldValue , rowIndex, "EVT_STR_DT");
				}else{
					gridRoot5.setItemFieldAt( oldValue , rowIndex, "EVT_END_DT");
				}
			}
		}
	}
	
	if(dataField == "ORD_STR_DT" || dataField == "ORD_END_DT"){
		if(gridRoot5.getItemFieldAt(rowIndex, "ORD_STR_DT") != undefined  && gridRoot5.getItemFieldAt(rowIndex, "ORD_END_DT") != undefined ){
			//alert(gridRoot2.getItemFieldAt(rowIndex, "ORD_STR_DT"));
			//alert(gridRoot2.getItemFieldAt(rowIndex, "ORD_END_DT"));
			var ORD_STR_DT = gridRoot5.getItemFieldAt(rowIndex, "ORD_STR_DT");
			ORD_STR_DT = ORD_STR_DT.replace(/[^0-9]/gi,"");
			//ORD_STR_DT = ORD_STR_DT.replace("/", "");
			var ORD_END_DT = gridRoot5.getItemFieldAt(rowIndex, "ORD_END_DT");
			ORD_END_DT = ORD_END_DT.replace(/[^0-9]/gi,"");
			//ORD_END_DT = ORD_END_DT.replace("/", "");
			
			if(Number(ORD_STR_DT) > Number(ORD_END_DT)){
				alert("발주의 시작날짜 종료날짜보다 클 수 없습니다.");
				if(dataField == "ORD_STR_DT"){
					gridRoot5.setItemFieldAt( oldValue , rowIndex, "ORD_STR_DT");
				}else{
					gridRoot5.setItemFieldAt( oldValue , rowIndex, "ORD_END_DT");
				}
			}
		}
	}
	
}

//그리드1 데이터 초기화
var gridData1 = [];
var gridData2 = [];
var gridData3 = [];
var gridData4 = [];
var gridData5 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, clickData2,selectorColumn2, collection2, rowIndex2;
var gridApp3, gridRoot3, dataGrid3, dataRow3, clickData3,selectorColumn3;
var gridApp4, gridRoot4, dataGrid4, dataRow4, clickData4,selectorColumn4;
var gridApp5, gridRoot5, dataGrid5, dataRow5, clickData5,selectorColumn5;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<DataGrid id="dg1"  sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="RN"  	sortCompareFunction="numericSort"	 headerText="' + rowNumber + '" textAlign="center" width="41" />\
			<DataGridColumn dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_CODE"  headerText="' + eventCode + '" textAlign="center" width="80" />\
			<DataGridColumn dataField="EVT_NAME"  headerText="' + eventName + '" textAlign="left" width="240" />\
			<DataGridColumn dataField="EVT_STR_DT"  headerText="' + eventStartDate + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="EVT_END_DT"  headerText="' + eventEndDate + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="ORD_STR_DT"  headerText="' + orderStartDate + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="ORD_END_DT"  headerText="' + orderEnddate + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="EVT_FLAG"  headerText="' + eventType + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_FLAG_NM"  headerText="' + eventType + '" textAlign="center" width="70"/>\
			<DataGridColumn dataField="IEMP_NO"  headerText="' + inputNo + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="IDATE"  headerText="' + inputDate + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="IEMP_NAME"  headerText="' + inputName + '" textAlign="center" width="60" />\
			<DataGridColumn dataField="UEMP_NO"  headerText="UEMP_NO" textAlign="center" visible="false" />\
			<DataGridColumn dataField="UDATE"  headerText="' + modifiedDate + '" textAlign="center" width="90" />\
			<DataGridColumn dataField="UEMP_NAME"  headerText="' + modifier + '" textAlign="center" width="60" />\
			<DataGridColumn dataField="REMARK"  headerText="' + remark + '" textAlign="center" visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//그리드2 헤더 설정
var layoutStr2 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<PercentFormatter id="percfmt" useThousandsSeparator="true"/>\
	<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg2" editable="true" selectionMode="singleCell" horizontalScrollPolicy="auto" showDeletedRows="true"  sortableColumns="true">\
		<columns>\
	 		<DataGridRowStateColumn id="rowState" textAlign="center" visible="true"/>\
			<DataGridColumn id="INPUT_YN"				dataField="INPUT_YN"  headerText="INPUT_YN" textAlign="center" visible="false" />\
			<DataGridColumn id="RN"     		sortCompareFunction="numericSort"					dataField="RN"  headerText="' + rowNumber + '" textAlign="center" editable="false"  backgroundColor="#EFEFEF" width="41" />\
			<DataGridColumn id="EVT_CODE"     		dataField="EVT_CODE"  headerText="EVT_CODE" textAlign="center" visible="false" />\
			<DataGridColumn id="STR_CODE"				dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
			<DataGridColumn id="STR_NAME"				dataField="STR_NAME"  headerText="' + storeName + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="60" />\
			<DataGridColumn id="SCAN_CODE"			dataField="SCAN_CODE" headerText="' + scanCode + '"  textAlign="right" itemRenderer="IconItem" icon="Magnifier" editable="false"  backgroundColor="#EFEFEF" width="140" />\
			<DataGridColumn id="ITM_CODE"				dataField="ITM_CODE"  headerText="ITM_CODE" textAlign="center" visible="false" />\
			<DataGridColumn id="ITM_NAME"				dataField="ITM_NAME"  headerText="' + itmName + '" textAlign="left" editable="false" backgroundColor="#EFEFEF" width="120" />\
			<DataGridColumn id="VEN_CODE" 			dataField="VEN_CODE"  headerText="' + venCode + '" textAlign="center" visible="false" />\
			<DataGridColumn id="VEN_NAME" 			dataField="VEN_NAME"  headerText="' + venName + '" textAlign="left" width="120" />\
			<DataGridColumn id="UNIT"						dataField="UNIT"  headerText="' + unit + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="60" />\
			<DataGridColumn id="POINT_SAVE"			dataField="POINT_SAVE"  headerText="POINT_SAVE" textAlign="center" visible="false" />\
			<DataGridColumn id="POINT_SAVE_NM"		dataField="POINT_SAVE_NM"  headerText="' + point + '" textAlign="center" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" width="70" />\
			<DataGridColumn id="TAX_GB"					dataField="TAX_GB"  headerText="부가세" textAlign="center" editable="false" backgroundColor="#EFEFEF" visible="false" />\
			<DataGridColumn id="TAX_GB_NAME"		dataField="TAX_GB_NAME"  headerText="' + taxGubun + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="70" />\
			<DataGridColumn id="BASE_WPRC"			dataField="BASE_WPRC"  headerText="' + baseWPRC + '" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}" />\
			<DataGridColumn id="BASE_WVAT"			dataField="BASE_WVAT"  headerText="' + baseWVAT + '" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}" />\
			<DataGridColumn id="BASE_TOTAL"			dataField="BASE_TOTAL"  headerText="' + baseTOTAL + '" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}" />\
			<DataGridColumn id="EVT_WPRC"				dataField="EVT_WPRC"  headerText="' + evtWPRC + '" textAlign="right" formatter="{numfmt}" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="EVT_WVAT"			dataField="EVT_WVAT"  headerText="' + evtWVAT + '" textAlign="right" formatter="{numfmt}" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="EVT_TOTAL"			dataField="EVT_TOTAL"  headerText="' + evtTOTAL + '" textAlign="right"  formatter="{numfmt}" />\
			<DataGridColumn id="SPRC"					dataField="SPRC"  headerText="' + sprc + '" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}"  />\
			<DataGridColumn id="EVT_SPRC"				dataField="EVT_SPRC"  headerText="' + evtSPRC + '" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn id="MARGIN"					dataField="MARGIN"  headerText="' + margin + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="MARGIN_EVT"			dataField="MARGIN_EVT"  headerText="' + marginEVT + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="IMAGE_NUM"			dataField="IMAGE_NUM"  headerText="' + imageNumber + '" textAlign="right"/>\
			<DataGridColumn id="BOT_CODE"				dataField="BOT_CODE"  headerText="BOT_CODE" textAlign="center" visible="false" />\
			<DataGridColumn id="BOT_SPRC"				dataField="BOT_SPRC"  headerText="BOT_SPRC" textAlign="center" visible="false" />\
			<DataGridColumn id="EVT_STR_DT"			dataField="EVT_STR_DT" headerText="' + eventStartDate + '" itemEditor="DateEditor" formatter="{datefmt}" textAlign="center" width="90" />\
			<DataGridColumn id="EVT_END_DT"			dataField="EVT_END_DT" headerText="' + eventEndDate + '" itemEditor="DateEditor" formatter="{datefmt}" textAlign="center" width="90" />\
			<DataGridColumn id="ORD_STR_DT"			dataField="ORD_STR_DT" headerText="' + orderStartDate + '" itemEditor="DateEditor" formatter="{datefmt}" textAlign="center" width="90" />\
			<DataGridColumn id="ORD_END_DT"			dataField="ORD_END_DT" headerText="' + orderEnddate + '" itemEditor="DateEditor" formatter="{datefmt}" textAlign="center" width="90" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
		<DataGrid id="dg3">\
			<columns>\
				<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="' + storCode + '" textAlign="left" />\
				<DataGridColumn dataField="STR_NAME" headerText="' + storNm + '" textAlign="left" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr4 =
	'<rMateGrid>\
		<DataGrid id="dg4" headerHeight="24">\
			<columns>\
				<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="' + storCode + '" textAlign="left" />\
				<DataGridColumn dataField="STR_NAME" headerText="' + storNm + '" textAlign="left" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//그리드5 헤더 설정
var layoutStr5 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<PercentFormatter id="percfmt" useThousandsSeparator="true"/>\
	<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<DataGrid id="dg5" editable="true" selectionMode="singleCell" horizontalScrollPolicy="auto" showDeletedRows="true"  sortableColumns="true">\
		<columns>\
	 		<DataGridRowStateColumn id="rowState" textAlign="center" visible="true"/>\
			<DataGridColumn id="INPUT_YN"				dataField="INPUT_YN"  headerText="INPUT_YN" textAlign="center" visible="false" />\
			<DataGridColumn id="RN"     			sortCompareFunction="numericSort"		dataField="RN"  headerText="' + rowNumber + '" textAlign="center" editable="false"  backgroundColor="#EFEFEF" width="41" />\
			<DataGridColumn id="SEQ"     					dataField="SEQ"  headerText="SEQ" textAlign="center" editable="false"  backgroundColor="#A1EFEF" width="41" visible="false"  />\
			<DataGridColumn id="EVT_CODE"     		dataField="EVT_CODE"  headerText="EVT_CODE" textAlign="center" visible="false" />\
			<DataGridColumn id="SCAN_CODE"			dataField="SCAN_CODE" headerText="' + scanCode + '"  textAlign="right" itemRenderer="IconItem" icon="Magnifier" editable="false"  backgroundColor="#EFEFEF" width="140" />\
			<DataGridColumn id="ITM_CODE"				dataField="ITM_CODE"  headerText="ITM_CODE" textAlign="center" visible="false" />\
			<DataGridColumn id="ITM_NAME"				dataField="ITM_NAME"  headerText="' + itmName + '" textAlign="left" editable="false" backgroundColor="#EFEFEF" width="120" />\
			<DataGridColumn id="UNIT"						dataField="UNIT"  headerText="' + unit + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="60" />\
			<DataGridColumn id="POINT_SAVE"			dataField="POINT_SAVE"  headerText="POINT_SAVE" textAlign="center" visible="false" />\
			<DataGridColumn id="POINT_SAVE_NM"		dataField="POINT_SAVE_NM"  headerText="' + point + '" textAlign="center" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" width="70" />\
			<DataGridColumn id="TAX_GB"					dataField="TAX_GB"  headerText="부가세" textAlign="center" editable="false" backgroundColor="#EFEFEF" visible="false" />\
			<DataGridColumn id="TAX_GB_NAME"		dataField="TAX_GB_NAME"  headerText="' + taxGubun + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" width="70" />\
			<DataGridColumn id="BASE_WPRC"			dataField="BASE_WPRC"  headerText="' + baseWPRC + '" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}" />\
			<DataGridColumn id="BASE_WVAT"			dataField="BASE_WVAT"  headerText="' + baseWVAT + '" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}" />\
			<DataGridColumn id="BASE_TOTAL"			dataField="BASE_TOTAL"  headerText="' + baseTOTAL + '" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}" />\
			<DataGridColumn id="EVT_WPRC"				dataField="EVT_WPRC"  headerText="' + evtWPRC + '" textAlign="right" formatter="{numfmt}" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="EVT_WVAT"			dataField="EVT_WVAT"  headerText="' + evtWVAT + '" textAlign="right" formatter="{numfmt}" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="EVT_TOTAL"			dataField="EVT_TOTAL"  headerText="' + evtTOTAL + '" textAlign="right"  formatter="{numfmt}" />\
			<DataGridColumn id="SPRC"					dataField="SPRC"  headerText="' + sprc + '" textAlign="right" editable="false" backgroundColor="#EFEFEF" formatter="{numfmt}"  />\
			<DataGridColumn id="EVT_SPRC"				dataField="EVT_SPRC"  headerText="' + evtSPRC + '" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn id="MARGIN"					dataField="MARGIN"  headerText="' + margin + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="MARGIN_EVT"			dataField="MARGIN_EVT"  headerText="' + marginEVT + '" textAlign="center" editable="false" backgroundColor="#EFEFEF" />\
			<DataGridColumn id="IMAGE_NUM"			dataField="IMAGE_NUM"  headerText="' + imageNumber + '" textAlign="right"/>\
			<DataGridColumn id="BOT_CODE"				dataField="BOT_CODE"  headerText="BOT_CODE" textAlign="center" visible="false" />\
			<DataGridColumn id="BOT_SPRC"				dataField="BOT_SPRC"  headerText="BOT_SPRC" textAlign="center" visible="false" />\
			<DataGridColumn id="EVT_STR_DT"			dataField="EVT_STR_DT" headerText="' + eventStartDate + '" itemEditor="DateEditor" formatter="{datefmt}" textAlign="center" width="90" />\
			<DataGridColumn id="EVT_END_DT"			dataField="EVT_END_DT" headerText="' + eventEndDate + '" itemEditor="DateEditor" formatter="{datefmt}" textAlign="center" width="90" />\
			<DataGridColumn id="ORD_STR_DT"			dataField="ORD_STR_DT" headerText="' + orderStartDate + '" itemEditor="DateEditor" formatter="{datefmt}" textAlign="center" width="90" />\
			<DataGridColumn id="ORD_END_DT"			dataField="ORD_END_DT" headerText="' + orderEnddate + '" itemEditor="DateEditor" formatter="{datefmt}" textAlign="center" width="90" />\
			<DataGridColumn id="EVT_FLAG"				dataField="EVT_FLAG"  headerText="' + eventType + '" textAlign="center" visible="false" />\
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
	
	$("#mid_search [name=P_STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("mid_search [name=P_STR_CODE]");
	
	getCommonCodeSelectBoxList("POINT_SAVE",     "POINT_SAVE");      //	포인트저장여부
	getCommonCodeSelectBoxList("TAX_GB",     "TAX_GB");      //	과세
	
}

function btn_popup() {
	$( '#pop_wrap1' ).dialog( 'open' );	
}

function btn_close() {
	$("#pop_wrap1").dialog("close");
}

function btn_popup_excel() {
	
	gridApp4.resize();
	gridApp5.resize();
	
	$( '#pop_wrap2' ).dialog( 'open' );	
}

function btn_close_excel() {
	$("#pop_wrap2").dialog("close");
}

//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search_product(){
	
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	$("#P_CALLBACK_NM3").val('fn_comm_supply_callback1(dataRow12)');
	
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}
}

function fn_comm_supply_callback1(dataRow){
	$("#mid_search input[name=P_VEN_CODE]").val(dataRow.VEN_CODE);
	$("#mid_search input[name=P_VEN_NAME]").val(dataRow.VEN_NAME);
	
	$("#comm_pop_wrap3").dialog( "close" );
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#SET_VEN_CODE").val( $("#P_VEN_CODE").val() ); 
	$("#P_CALLBACK_NM2").val('btn_comm_product_search_call_back(dataRow11)');
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITM_NAME").val());
		btn_comm_search('2');
	}
}

function clearVenCode(){
	if($('#P_VEN_NAME').val() == "" )
	{
		$('#P_VEN_CODE').val("");
	}
}


function btn_comm_product_search_call_back(dataRow){
	$("#mid_search input[name=P_ITM_CODE]").val(dataRow.ITM_CODE);
	$("#mid_search input[name=P_ITM_NAME]").val(dataRow.ITM_NAME);
}

//엑셀양식 다운로드
function excelDownload() {
	$.download('/resources/CAMPAIGN_PRODUCT_UPLOAD/CAMPAIGN_PRODUCT_UPLOAD.xlsx',"null" ,"post" );
} 

function  btn_load()
{  
	if(  $('#excelFile' ).val() == ""  )
	{   alert("업로드할 엑셀파일을 선택 하세요.");
		$('#excelFile' ).focus();
		return;
	} 
	
	/*
	var selectorColumn = gridRoot4.getObjectById("selector");
	
	var selectedStrore = selectorColumn.getSelectedIndices();
	
	if(selectedStrore.length < 1){
		alert(storeName + msgConfirm);
		return;
	}
	*/
	
	loadExcelFile(  G_FILE  ); 
}

function loadExcelFile(e) {
	
	var files = e.target.files;
	var i, f;
	
	for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
        	var data = e.target.result; 
            var result = 0;
//            var workbook = XLSX.read(data, { type: 'binary' });
            var arr = fixdata(data);
            var workbook = X.read(btoa(arr), {type: 'base64'});
            var sheet_cnt = 0;
            var sheet_name_list = workbook.SheetNames; 
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
               
         	   if(sheet_cnt == 0) // 첫번째 시트만 읽는다.
	               {   //Convert the cell value to Json
	                   var roa = X.utils.sheet_to_json( workbook.Sheets[y] );  
	                   if (roa.length > 0) {
	                       result = roa;
	                   }  
                 } 
                 sheet_cnt = sheet_cnt + 1; 
            });
            //Get the first column irst cell value 
            if( typeof result.length == 'undefined' )   
            {   alert("업로드한 엑셀에 상품데이터가 존재 하지 않습니다.");
         	   return; 
            }
            
            var excelLoadProduct = ""; 
            var selectorColumn = gridRoot3.getObjectById("selector");
        	var selectedStrore = selectorColumn.getSelectedIndices();
        	
        	//for(var x=0; x < selectedStrore.length ; x++){
    		for( var i = 0 ;  i < result.length ; i++ ) 
    		{
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
	    		
	    		console.log(i);
	    		
	    		//var STR_CODE		= xmlDoc.createElement('STR_CODE');
	    		var EVT_CODE		= xmlDoc.createElement('EVT_CODE');
	    		var SCAN_CODE	= xmlDoc.createElement('SCAN_CODE');
	    		var EVT_STR_DT	= xmlDoc.createElement('EVT_STR_DT');
	    		var EVT_END_DT	= xmlDoc.createElement('EVT_END_DT');
	    		var ORD_STR_DT	= xmlDoc.createElement('ORD_STR_DT');
	    		var ORD_END_DT	= xmlDoc.createElement('ORD_END_DT');
	    		var EVT_WPRC	= xmlDoc.createElement('EVT_WPRC');
	    		var EVT_SPRC		= xmlDoc.createElement('EVT_SPRC');
	    		var IMAGE_NUM	= xmlDoc.createElement('IMAGE_NUM');
	    		var SEQ	= xmlDoc.createElement('SEQ');
	    		
	    		//STR_CODE.appendChild(  xmlDoc.createTextNode(  gridRoot3.getItemFieldAt(Number(selectedStrore[x]), "STR_CODE")    )	);
	    		EVT_CODE.appendChild(  xmlDoc.createTextNode(  dataRow1.EVT_CODE    )	); 
	    		SCAN_CODE.appendChild(  xmlDoc.createTextNode(  $.trim(result[i].바코드.toString().replace(' ', ''))    )	); 
	    		EVT_STR_DT.appendChild(  xmlDoc.createTextNode(  dataRow1.EVT_STR_DT.replace(/[^0-9]/gi,"")    )	); 
	    		EVT_END_DT.appendChild(  xmlDoc.createTextNode(   dataRow1.EVT_END_DT.replace(/[^0-9]/gi,"")    )	); 
	    		ORD_STR_DT.appendChild(  xmlDoc.createTextNode(  dataRow1.ORD_STR_DT.replace(/[^0-9]/gi,"")    )	); 
	    		ORD_END_DT.appendChild(  xmlDoc.createTextNode(  dataRow1.ORD_END_DT.replace(/[^0-9]/gi,"")    )	); 
	    		EVT_WPRC.appendChild(  xmlDoc.createTextNode(  Number($.trim(result[i].행사단가.toString().replace(/,/g, '')))  )	); 
	    		EVT_SPRC.appendChild(  xmlDoc.createTextNode(  Number($.trim(result[i].행사매가.toString().replace(/,/g, '')))    )	);
	    		IMAGE_NUM.appendChild(  xmlDoc.createTextNode(  (result[i].행사전단번호==undefined)?'':result[i].행사전단번호.trim()    )	); 
	    		SEQ.appendChild(xmlDoc.createTextNode(   i	)); 
	    		
	    		//xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( STR_CODE );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( EVT_CODE );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SCAN_CODE );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( EVT_STR_DT );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( EVT_END_DT );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_STR_DT );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( ORD_END_DT );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( EVT_WPRC );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( EVT_SPRC );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( IMAGE_NUM );
	    		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild( SEQ );
				 
				excelLoadProduct = excelLoadProduct + getXmlString(   xmlDoc   );
    		} 
        	//}
        	excelLoadProduct  =  "<GRIDLIST>"+ excelLoadProduct +"</GRIDLIST>" ; 
        	
//        	alert(excelLoadProduct);
//        	return;
            
        	// 엑셀 (excelLoadProduct)의 점 발주 데이터를 TEMP_DB 로 넘겨 , 상품 정보를 조회후 그리드에 출력하기
        	jQuery.ajax({ 
    	    url:"/campaignProductExcelLoad.do",            
    	    type:"POST",
    		datatype:"xml",
    		async:false,
    		beforeSend : function(){ 
    	    }, 
    		data: {
    			"GRID_XML_DATA" : excelLoadProduct
    		},
    		success:function(data){   
    			 
    			var rowCnt  = gridRoot2.getCollection().getSource();
    			var rowNumber = rowCnt.length+1;
    			for(var i=0 ; i < data.length ; i++ )
    			{ 
    				if(data[i].INPUT_YN =="X"){
    					var msg =data[i].SCAN_CODE;
    					msg  = msg.replace(/,/gi,'\n');
    					if($.trim(msg) == null || $.trim(msg) ==""){
    						alert("업로드 완료");
    					}else{
    						alert("업로드 제외 된 바코드 목록\n"+msg);
    					}
    				}else{
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
    					var EVT_CODE = xmlDoc.createElement("EVT_CODE");
    					var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
    					var ITM_CODE = xmlDoc.createElement("ITM_CODE");
    					var ITM_NAME = xmlDoc.createElement("ITM_NAME");
    					var UNIT = xmlDoc.createElement("UNIT");
    					var POINT_SAVE = xmlDoc.createElement("POINT_SAVE");
    					var POINT_SAVE_NM = xmlDoc.createElement("POINT_SAVE_NM");
    					var TAX_GB = xmlDoc.createElement("TAX_GB");
    					var TAX_GB_NAME = xmlDoc.createElement("TAX_GB_NAME");
    					var BASE_WPRC = xmlDoc.createElement("BASE_WPRC");
    					var BASE_WVAT = xmlDoc.createElement("BASE_WVAT");
    					var BASE_TOTAL = xmlDoc.createElement("BASE_TOTAL");
    					var EVT_WPRC = xmlDoc.createElement("EVT_WPRC");
    					var EVT_WVAT = xmlDoc.createElement("EVT_WVAT");
    					var EVT_TOTAL = xmlDoc.createElement("EVT_TOTAL");
    					var SPRC = xmlDoc.createElement("SPRC");
    					var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
    					var MARGIN = xmlDoc.createElement("MARGIN");
    					var MARGIN_EVT = xmlDoc.createElement("MARGIN_EVT");
    					var IMAGE_NUM = xmlDoc.createElement("IMAGE_NUM");
    					var BOT_CODE = xmlDoc.createElement("BOT_CODE");
    					var BOT_SPRC = xmlDoc.createElement("BOT_SPRC");
    					var EVT_STR_DT = xmlDoc.createElement("EVT_STR_DT");
    					var EVT_END_DT = xmlDoc.createElement("EVT_END_DT");
    					var ORD_STR_DT = xmlDoc.createElement("ORD_STR_DT");
    					var ORD_END_DT = xmlDoc.createElement("ORD_END_DT");
    					var EVT_FLAG = xmlDoc.createElement("EVT_FLAG");
    					var SEQ = xmlDoc.createElement("SEQ");
    					
    					INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
    					RN.appendChild(xmlDoc.createTextNode( rowNumber ));
    					EVT_CODE.appendChild(xmlDoc.createTextNode(  data[i].EVT_CODE ));
    					SCAN_CODE.appendChild(xmlDoc.createTextNode( data[i].SCAN_CODE ));
    					ITM_CODE.appendChild(xmlDoc.createTextNode( data[i].ITM_CODE ));
    					ITM_NAME.appendChild(xmlDoc.createTextNode( data[i].ITM_NAME ));
    					UNIT.appendChild(xmlDoc.createTextNode( data[i].UNIT ));
    					POINT_SAVE.appendChild(xmlDoc.createTextNode( data[i].POINT_SAVE ));
    					POINT_SAVE_NM.appendChild(xmlDoc.createTextNode( data[i].POINT_SAVE_NM ));
    					TAX_GB.appendChild(xmlDoc.createTextNode( data[i].TAX_GB ));
    					var TAX_GB_NM = "";
    					if(data[i].TAX_GB == "1"){
    						TAX_GB_NM =  "과세";
    					}else{
    						TAX_GB_NM = "면세";
    					}
    					TAX_GB_NAME.appendChild(xmlDoc.createTextNode( TAX_GB_NM ));
    					BASE_WPRC.appendChild(xmlDoc.createTextNode( data[i].BASE_WPRC ));
    					BASE_WVAT.appendChild(xmlDoc.createTextNode( data[i].BASE_WVAT ));
    					BASE_TOTAL.appendChild(xmlDoc.createTextNode( data[i].BASE_TOTAL ));
    					EVT_WPRC.appendChild(xmlDoc.createTextNode( data[i].EVT_WPRC ));
    					EVT_WVAT.appendChild(xmlDoc.createTextNode( data[i].EVT_WVAT ));
    					EVT_TOTAL.appendChild(xmlDoc.createTextNode( data[i].EVT_TOTAL ));
    					SPRC.appendChild(xmlDoc.createTextNode( data[i].SPRC ));
    					EVT_SPRC.appendChild(xmlDoc.createTextNode( data[i].EVT_SPRC ));
    					MARGIN.appendChild(xmlDoc.createTextNode( data[i].MARGIN ));
    					MARGIN_EVT.appendChild(xmlDoc.createTextNode( data[i].MARGIN_EVT ));
    					IMAGE_NUM.appendChild(xmlDoc.createTextNode( data[i].IMAGE_NUM ));
    					BOT_CODE.appendChild(xmlDoc.createTextNode( data[i].BOT_CODE ));
    					BOT_SPRC.appendChild(xmlDoc.createTextNode( data[i].BOT_SPRC ));
    					EVT_STR_DT.appendChild(xmlDoc.createTextNode(data[i].EVT_STR_DT.substring(0,10) ));
    					EVT_END_DT.appendChild(xmlDoc.createTextNode( data[i].EVT_END_DT.substring(0,10) ));
    					ORD_STR_DT.appendChild(xmlDoc.createTextNode( data[i].ORD_STR_DT.substring(0,10) ));
    					ORD_END_DT.appendChild(xmlDoc.createTextNode( data[i].ORD_END_DT.substring(0,10) ));
    					EVT_FLAG.appendChild(xmlDoc.createTextNode( dataRow1.EVT_FLAG ));
    					SEQ.appendChild(xmlDoc.createTextNode( data[i].SEQ ));
    					
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RN);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_CODE);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE_NM);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB_NAME);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WPRC);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WVAT);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_TOTAL);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WPRC);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WVAT);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_TOTAL);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN_EVT);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IMAGE_NUM);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_CODE);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_SPRC);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_STR_DT);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_END_DT);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_STR_DT);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_END_DT);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_FLAG);
    					xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);
    					
    					gridRoot5.addItemAt(  xmlDoc  , -1, false ); 
    					rowNumber++;
    					
    				} 
    					
    				}
    			
    			for(var i=0 ; i < data.length ; i++ )
    			{   // 상품명이 없을경우, 즉 바코드가 존재 안할때 ... (undefined) 확인란에 빨간색으로 표기
    				if(     gridRoot2.getItemFieldAt( i , "SCAN_CODE")  == "undefined"    
    					||  gridRoot2.getItemFieldAt( i , "SCAN_CODE")  == ""   )
    				{ 
    					gridRoot2.setItemFieldAt( '오류_'+(i+2)  , i, "ERR_CHK");     
    					excelBarCodeErr = excelBarCodeErr +  (i+2)+ "라인, "   ;
    					
    					// 유맥의 요청 사항 : 오류가 발생한 행은 오류 얼럿만 보여주고, 정상적인 데이터만 업로드한다.( 오류제외하고 올림 )
    					// 그리드에서  오류가 발생한 ROW는 삭제 한다. 
    					gridRoot2.removeItemAt(i);
    					
    				}
    				
    			}  
    	    },
    	    complete : function(data) { 
    	    	 
    	    	 // PO_ORDER_UPLOAD 에 저장
    	    	 // btn_save 함수 안에는 오류시 리턴해버리는 코드가 들어있어서 위에서 에러가 나도  저장이 안된다. 
    	    	 // 하지만 유맥의 요청으로 오류제거후 저장되게 바꿈
    	    	
    	    },
    	    error : function(xhr, status, error) {
    	    	dataGrid1.setEnabled(true);
    	    	gridRoot1.removeLoadingBar();
    	    	CommonJs.alertErrorStatus(xhr.status, error);
    	    }
    	});
        };
        reader.readAsArrayBuffer(f);
         
    }
}

function addRow(){
	
	if(dataRow1 == undefined || dataRow1 == ""){
		alert(msgSelectEvent);
		return;
	}
	
	if(dataRow1.EVT_FLAG != "1"){
		if(sessionOrgType == "3" && dataRow1.STR_CODE != sessionStrCode){
			alert(msgEventOtherStore);
			return;
		}
	}
	
	fnClearForm();
	$( '#pop_wrap1' ).dialog( 'open' );
	
	gridApp3.resize();
	
	$("#EVT_STR_DT").val(dataRow1.EVT_STR_DT);
	$("#EVT_END_DT").val(dataRow1.EVT_END_DT);
	$("#ORD_STR_DT").val(dataRow1.ORD_STR_DT);
	$("#ORD_END_DT").val(dataRow1.ORD_END_DT);
	
	var postValue = {};
	
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:"/getStoreCode.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	
	    	gridRoot3.removeAll();
	    	
	    	if(data.length > 0){
	    		if(sessionOrgType == "3"){
	    			
	    			if(dataRow1.STR_CODE == "00000"){
	    				for(var i = 0; i < data.length; i++){
		    				if(sessionStrCode == data[i].STR_CODE){
		    					gridRoot3.addItemAt(data[i]);
		    				}
		    			}
	    			}else{
	    				for(var i = 0; i < data.length; i++){
		    				if(sessionStrCode == dataRow1.STR_CODE && dataRow1.STR_CODE == data[i].STR_CODE){
		    					gridRoot3.addItemAt(data[i]);
		    				}
		    			}
	    			}
	    		}else{
	    			if(dataRow1.STR_CODE == "00000"){
	    				gridApp3.setData(data);
	    			}else{
	    				for(var i = 0; i < data.length; i++){
		    				if(dataRow1.STR_CODE == data[i].STR_CODE){
		    					gridRoot3.addItemAt(data[i]);
		    				}
		    			}
	    			}
	    		}
	    	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function addRowExcel(){
	
	if(dataRow1 == undefined || dataRow1 == ""){
		alert(msgSelectEvent);
		return;
	}
	
	if(dataRow1.EVT_FLAG != "1"){
		if(sessionOrgType == "3" && dataRow1.STR_CODE != sessionStrCode){
			alert(msgEventOtherStore);
			return;
		}
	}
	$( '#pop_wrap2' ).dialog( 'open' );
	
	gridApp4.resize();
	gridApp5.resize();
	
	$("#excelFile").val("");
	gridRoot5.removeAll();
	
	var postValue = {};
	
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:"/getStoreCode.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	
	    	gridRoot4.removeAll();
	    	
	    	if(data.length > 0){
	    		if(sessionOrgType == "3"){
	    			
	    			if(dataRow1.STR_CODE == "00000"){
	    				for(var i = 0; i < data.length; i++){
		    				if(sessionStrCode == data[i].STR_CODE){
		    					gridRoot4.addItemAt(data[i]);
		    				}
		    			}
	    			}else{
	    				for(var i = 0; i < data.length; i++){
		    				if(sessionStrCode == dataRow1.STR_CODE && dataRow1.STR_CODE == data[i].STR_CODE){
		    					gridRoot4.addItemAt(data[i]);
		    				}
		    			}
	    			}
	    		}else{
	    			if(dataRow1.STR_CODE == "00000"){
	    				gridApp4.setData(data);
	    			}else{
	    				for(var i = 0; i < data.length; i++){
		    				if(dataRow1.STR_CODE == data[i].STR_CODE){
		    					gridRoot4.addItemAt(data[i]);
		    				}
		    			}
	    			}
	    		}
	    	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btnRegist(){
	var selectorColumn = gridRoot3.getObjectById("selector");
	
	var selectedStrore = selectorColumn.getSelectedIndices();
	
	if(selectedStrore.length < 1){
		alert(storeName + msgConfirm);
		return;
	}
	
	if($("#SCAN_CODE").val() == ""){
		alert(scanCode + msgConfirm);
		return;
	}
	if($("#UNIT").val() == ""){
		alert(unit + msgConfirm);
		return;
	}
	if($("#EVT_WPRC").val() == ""){
		alert(evtWPRC + msgConfirm);
		return;
	}
	if($("#EVT_WVAT").val() == ""){
		alert(evtWVAT + msgConfirm);
		return;
	}
	if($("#EVT_TOTAL").val() == ""){
		alert(evtTOTAL + msgConfirm);
		return;
	}
	if($("#EVT_SPRC").val() == ""){
		alert(evtSPRC + msgConfirm);
		return;
	}
	
	if($("#EVT_STR_DT").val() == ""){
		alert(eventStartDate + msgConfirm);
		return;
	}
	if($("#EVT_END_DT").val() == ""){
		alert(eventEndDate + msgConfirm);
		return;
	}
	
	var collection = gridRoot2.getCollection();
	var source = collection.getSource();
	
	var GRID_NUMBER = source.length+1;
	
	for(var i=0; i < selectedStrore.length ; i++){
		//alert(gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_CODE") + " / " + gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_NAME"));
		
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
		var EVT_CODE = xmlDoc.createElement("EVT_CODE");
		var STR_CODE = xmlDoc.createElement("STR_CODE");
		var STR_NAME = xmlDoc.createElement("STR_NAME");
		var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
		var ITM_CODE = xmlDoc.createElement("ITM_CODE");
		var ITM_NAME = xmlDoc.createElement("ITM_NAME");
		var UNIT = xmlDoc.createElement("UNIT");
		var POINT_SAVE = xmlDoc.createElement("POINT_SAVE");
		var POINT_SAVE_NM = xmlDoc.createElement("POINT_SAVE_NM");
		var TAX_GB = xmlDoc.createElement("TAX_GB");
		var TAX_GB_NAME = xmlDoc.createElement("TAX_GB_NAME");
		var BASE_WPRC = xmlDoc.createElement("BASE_WPRC");
		var BASE_WVAT = xmlDoc.createElement("BASE_WVAT");
		var BASE_TOTAL = xmlDoc.createElement("BASE_TOTAL");
		var EVT_WPRC = xmlDoc.createElement("EVT_WPRC");
		var EVT_WVAT = xmlDoc.createElement("EVT_WVAT");
		var EVT_TOTAL = xmlDoc.createElement("EVT_TOTAL");
		var SPRC = xmlDoc.createElement("SPRC");
		var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
		var MARGIN = xmlDoc.createElement("MARGIN");
		var MARGIN_EVT = xmlDoc.createElement("MARGIN_EVT");
		var IMAGE_NUM = xmlDoc.createElement("IMAGE_NUM");
		var BOT_CODE = xmlDoc.createElement("BOT_CODE");
		var BOT_SPRC = xmlDoc.createElement("BOT_SPRC");
		var EVT_STR_DT = xmlDoc.createElement("EVT_STR_DT");
		var EVT_END_DT = xmlDoc.createElement("EVT_END_DT");
		var ORD_STR_DT = xmlDoc.createElement("ORD_STR_DT");
		var ORD_END_DT = xmlDoc.createElement("ORD_END_DT");
		
		INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
		RN.appendChild(xmlDoc.createTextNode( GRID_NUMBER ));
		EVT_CODE.appendChild(xmlDoc.createTextNode(  dataRow1.EVT_CODE ));
		STR_CODE.appendChild(xmlDoc.createTextNode( gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_CODE") ));
		STR_NAME.appendChild(xmlDoc.createTextNode( gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_NAME") ));
		SCAN_CODE.appendChild(xmlDoc.createTextNode( $("#SCAN_CODE").val() ));
		ITM_CODE.appendChild(xmlDoc.createTextNode( $("#ITM_CODE").val() ));
		ITM_NAME.appendChild(xmlDoc.createTextNode( $("#ITM_NAME").val() ));
		UNIT.appendChild(xmlDoc.createTextNode( $("#UNIT").val() ));
		POINT_SAVE.appendChild(xmlDoc.createTextNode( $("#pop_cnt select[name=POINT_SAVE]").val() ));
		POINT_SAVE_NM.appendChild(xmlDoc.createTextNode( $("#pop_cnt select[name=POINT_SAVE] option:selected").text() ));
		TAX_GB.appendChild(xmlDoc.createTextNode( $("#pop_cnt select[name=TAX_GB]").val() ));
		TAX_GB_NAME.appendChild(xmlDoc.createTextNode( $("#pop_cnt select[name=TAX_GB] option:selected").text() ));
		BASE_WPRC.appendChild(xmlDoc.createTextNode( $("#BASE_WPRC").val() ));
		BASE_WVAT.appendChild(xmlDoc.createTextNode( $("#BASE_WVAT").val() ));
		BASE_TOTAL.appendChild(xmlDoc.createTextNode( $("#BASE_TOTAL").val()));
		EVT_WPRC.appendChild(xmlDoc.createTextNode( $("#EVT_WPRC").val() ));
		EVT_WVAT.appendChild(xmlDoc.createTextNode( $("#EVT_WVAT").val() ));
		EVT_TOTAL.appendChild(xmlDoc.createTextNode( $("#EVT_TOTAL").val() ));
		SPRC.appendChild(xmlDoc.createTextNode( $("#SPRC").val() ));
		EVT_SPRC.appendChild(xmlDoc.createTextNode( $("#EVT_SPRC").val() ));
		MARGIN.appendChild(xmlDoc.createTextNode( $("#MARGIN").val() ));
		MARGIN_EVT.appendChild(xmlDoc.createTextNode( $("#MARGIN_EVT").val() ));
		IMAGE_NUM.appendChild(xmlDoc.createTextNode( $("#IMAGE_NUM").val() ));
		BOT_CODE.appendChild(xmlDoc.createTextNode( $("#BOT_CODE").val() ));
		BOT_SPRC.appendChild(xmlDoc.createTextNode( $("#BOT_SPRC").val() ));
		EVT_STR_DT.appendChild(xmlDoc.createTextNode( $("#EVT_STR_DT").val() ));
		EVT_END_DT.appendChild(xmlDoc.createTextNode( $("#EVT_END_DT").val() ));
		ORD_STR_DT.appendChild(xmlDoc.createTextNode( $("#ORD_STR_DT").val() ));
		ORD_END_DT.appendChild(xmlDoc.createTextNode( $("#ORD_END_DT").val() ));
			
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RN);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_CODE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE_NM);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB_NAME);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WPRC);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WVAT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_TOTAL);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WPRC);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WVAT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_TOTAL);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN_EVT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IMAGE_NUM);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_CODE);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_SPRC);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_STR_DT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_END_DT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_STR_DT);
		xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_END_DT);
		
		var strNm =gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_NAME");
		jQuery.ajax({ 
		    url:"/selectBusinessCampaignItmChk.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {
						'P_EVT_CODE' : dataRow1.EVT_CODE
					,	'P_SCAN_CODE' : $("#SCAN_CODE").val()
					,	'P_STR_CODE' : gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_CODE") 
					},
			success:function(data){  
				 if(data[0].EVT_ITM_CNT == 0 || data[0].EVT_ITM_CNT == "0"){
					 gridRoot2.addItemAt(xmlDoc,0,false);
					 GRID_NUMBER++;
				 }else{
					 alert(strNm+"의 중복 상품입니다.");
				 }				
		    },
		    complete : function(data) {
		    	//로딩바 숨기기
		    },
		    error : function(xhr, status, error) {
		    	//로딩바 숨기기
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});

	}	
	
	fnClearForm();
	//$("#pop_wrap1").dialog("close");
}

function addRow_bak(P_STR_CODE){	
	//alert($("#top_search select[name=STR_CODE] option[value='0015']").text());
	
	if(dataRow1 == undefined || dataRow1 == ""){
		alert(msgSelectEvent);
		return;
	}
	
	var collection = gridRoot2.getCollection();
	var source = collection.getSource();
	
	var GRID_NUMBER = source.length+1;
	
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
	var EVT_CODE = xmlDoc.createElement("EVT_CODE");
	var STR_CODE = xmlDoc.createElement("STR_CODE");
	var STR_NAME = xmlDoc.createElement("STR_NAME");
	var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
	var ITM_CODE = xmlDoc.createElement("ITM_CODE");
	var ITM_NAME = xmlDoc.createElement("ITM_NAME");
	var UNIT = xmlDoc.createElement("UNIT");
	var POINT_SAVE = xmlDoc.createElement("POINT_SAVE");
	var POINT_SAVE_NM = xmlDoc.createElement("POINT_SAVE_NM");
	var TAX_GB = xmlDoc.createElement("TAX_GB");
	var TAX_GB_NAME = xmlDoc.createElement("TAX_GB_NAME");
	var BASE_WPRC = xmlDoc.createElement("BASE_WPRC");
	var BASE_WVAT = xmlDoc.createElement("BASE_WVAT");
	var BASE_TOTAL = xmlDoc.createElement("BASE_TOTAL");
	var EVT_WPRC = xmlDoc.createElement("EVT_WPRC");
	var EVT_WVAT = xmlDoc.createElement("EVT_WVAT");
	var EVT_TOTAL = xmlDoc.createElement("EVT_TOTAL");
	var SPRC = xmlDoc.createElement("SPRC");
	var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
	var MARGIN = xmlDoc.createElement("MARGIN");
	var MARGIN_EVT = xmlDoc.createElement("MARGIN_EVT");
	var IMAGE_NUM = xmlDoc.createElement("IMAGE_NUM");
	var BOT_CODE = xmlDoc.createElement("BOT_CODE");
	var BOT_SPRC = xmlDoc.createElement("BOT_SPRC");
	
	INPUT_YN.appendChild(xmlDoc.createTextNode( 'I' ));
	RN.appendChild(xmlDoc.createTextNode( GRID_NUMBER ));
	EVT_CODE.appendChild(xmlDoc.createTextNode(  '' ));
	STR_CODE.appendChild(xmlDoc.createTextNode( P_STR_CODE ));
	STR_NAME.appendChild(xmlDoc.createTextNode( $("#top_search select[name=STR_CODE] option[value='" + P_STR_CODE + "']").text() ));
	SCAN_CODE.appendChild(xmlDoc.createTextNode( '' ));
	ITM_CODE.appendChild(xmlDoc.createTextNode( '' ));
	ITM_NAME.appendChild(xmlDoc.createTextNode( '' ));
	UNIT.appendChild(xmlDoc.createTextNode( '' ));
	POINT_SAVE.appendChild(xmlDoc.createTextNode( '' ));
	POINT_SAVE_NM.appendChild(xmlDoc.createTextNode( '' ));
	TAX_GB.appendChild(xmlDoc.createTextNode( '' ));
	TAX_GB_NAME.appendChild(xmlDoc.createTextNode( '' ));
	BASE_WPRC.appendChild(xmlDoc.createTextNode( '' ));
	BASE_WVAT.appendChild(xmlDoc.createTextNode( '' ));
	BASE_TOTAL.appendChild(xmlDoc.createTextNode( ''));
	EVT_WPRC.appendChild(xmlDoc.createTextNode( '' ));
	EVT_WVAT.appendChild(xmlDoc.createTextNode( '' ));
	EVT_TOTAL.appendChild(xmlDoc.createTextNode( '' ));
	SPRC.appendChild(xmlDoc.createTextNode( '' ));
	EVT_SPRC.appendChild(xmlDoc.createTextNode( '' ));
	MARGIN.appendChild(xmlDoc.createTextNode( '' ));
	MARGIN_EVT.appendChild(xmlDoc.createTextNode( '' ));
	IMAGE_NUM.appendChild(xmlDoc.createTextNode( '' ));
	BOT_CODE.appendChild(xmlDoc.createTextNode( '' ));
	BOT_SPRC.appendChild(xmlDoc.createTextNode( '' ));
		
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE_NM);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WVAT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_TOTAL);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WVAT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_TOTAL);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN_EVT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IMAGE_NUM);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_SPRC);
	
	
	gridRoot2.addItemAt(  xmlDoc  , -1, false);
	//girdMoveSelctedIndex(1 , gridRoot2.getDataGrid() );   // 그리드에 행추가하고 그 row 에 select 포커스 주기
	girdMoveSelctedIndex();
}

function deleteRow(){
	
	if (rowIndex2 >= 0){
		gridRoot2.removeItemAt(rowIndex2);
		gridRoot2.setItemFieldAt( "D" , rowIndex2, "INPUT_YN");
	}	
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

//(점별상품검색) 팝업 호출 function
function btn_comm_store_search(){
	$('#comm_pop_wrap6' ).dialog( 'open' );
	gridApp15.resize();
	fnGetStrName();
	
	$("#P_CALLBACK_NM6").val('fn_comm_store_callback(dataRow15)');
	
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT6").val($("#I_TEXT").val());
		btn_comm_search('6');
	}
}

function btn_comm_store_search2(){
	if(sessionOrgType == "3"){
		$('#comm_pop_wrap6' ).dialog( 'open' );
		gridApp15.resize();
		fnGetStrName();
		
		$("#P_CALLBACK_NM6").val('fn_comm_store_callback2(dataRow15)');
	}else{
		$('#comm_pop_wrap2' ).dialog( 'open' );
		gridApp11.resize();
		
		$("#P_CALLBACK_NM2").val('fn_comm_store_callback2(dataRow11)');
	}
}

function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

//행사 코드 마스터 조회
function btnSearch(){
	var evtStartDate 	= $("#P_EVT_STR_DT").val().split("-");
	var evtEndDate 		= $("#P_EVT_END_DT").val().split("-");
	var strDt1			= new Date(evtStartDate[0], Number(evtStartDate[1])-1, evtStartDate[2]); 
	var endDt1			= new Date(evtEndDate[0], Number(evtEndDate[1])-1, evtEndDate[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	fnClear();
	
	$("#mid_search select[name=P_STR_CODE]").val("");
	$("#mid_search input[name=P_VEN_CODE]").val("");
	$("#mid_search input[name=P_VEN_NAME]").val("");
	$("#mid_search input[name=P_ITM_CODE]").val("");
	$("#mid_search input[name=P_ITM_NAME]").val("");

	
	//유효성검사
	if(Number(evtStartDate[0] + evtStartDate[1] + evtStartDate[2]) > Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2])){
		alert(msgDateValidation);
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_EVT_STR_DT").focus();
		return;
	}

	//로딩바 출력
	showLoadingBar1();
	
	jQuery.ajax({ 
	    url:"/selectBusinessCampaignMst.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: {
				'EVT_STR_DT' : $("#top_search input[name=P_EVT_STR_DT]").val()
			,	'EVT_END_DT' : $("#top_search input[name=P_EVT_END_DT]").val()
			,	'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
			,	'EVT_FLAG'	:	$("#top_search select[name=EVT_FLAG]").val()
			,	'SEARCH_FLAG' : 'CM'
		},
		success:function(data){  
			gridApp1.setData(data);
			//alert(data);
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

function btnSearchDetail(){
	
	showLoadingBar2();
	
	jQuery.ajax({ 
	    url:"/selectEVTItem.do",         
	    type:"POST",
		datatype:"xml",
		//async:false,
		data: {'EVT_CODE' : dataRow1.EVT_CODE
			,	 'STR_CODE' : dataRow1.STR_CODE
			,		'P_STR_CODE' : $("#P_STR_CODE").val()
			,		'P_VEN_CODE' : $("#P_VEN_CODE").val()
			,		'P_ITM_CODE' : $("#P_ITM_CODE").val()},
		success:function(data){
			
			//gridApp2.setData(data);
			gridRoot2.removeAll();
			
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
				var EVT_CODE = xmlDoc.createElement("EVT_CODE");
				var STR_CODE = xmlDoc.createElement("STR_CODE");
				var STR_NAME = xmlDoc.createElement("STR_NAME");
				var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
				var ITM_CODE = xmlDoc.createElement("ITM_CODE");
				var ITM_NAME = xmlDoc.createElement("ITM_NAME");
				var VEN_CODE = xmlDoc.createElement("VEN_CODE");
				var VEN_NAME = xmlDoc.createElement("VEN_NAME");
				var UNIT = xmlDoc.createElement("UNIT");
				var POINT_SAVE = xmlDoc.createElement("POINT_SAVE");
				var POINT_SAVE_NM = xmlDoc.createElement("POINT_SAVE_NM");
				var TAX_GB = xmlDoc.createElement("TAX_GB");
				var TAX_GB_NAME = xmlDoc.createElement("TAX_GB_NAME");
				var BASE_WPRC = xmlDoc.createElement("BASE_WPRC");
				var BASE_WVAT = xmlDoc.createElement("BASE_WVAT");
				var BASE_TOTAL = xmlDoc.createElement("BASE_TOTAL");
				var EVT_WPRC = xmlDoc.createElement("EVT_WPRC");
				var EVT_WVAT = xmlDoc.createElement("EVT_WVAT");
				var EVT_TOTAL = xmlDoc.createElement("EVT_TOTAL");
				var SPRC = xmlDoc.createElement("SPRC");
				var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
				var MARGIN = xmlDoc.createElement("MARGIN");
				var MARGIN_EVT = xmlDoc.createElement("MARGIN_EVT");
				var IMAGE_NUM = xmlDoc.createElement("IMAGE_NUM");
				var BOT_CODE = xmlDoc.createElement("BOT_CODE");
				var BOT_SPRC = xmlDoc.createElement("BOT_SPRC");
				var EVT_STR_DT = xmlDoc.createElement("EVT_STR_DT");
				var EVT_END_DT = xmlDoc.createElement("EVT_END_DT");
				var ORD_STR_DT = xmlDoc.createElement("ORD_STR_DT");
				var ORD_END_DT = xmlDoc.createElement("ORD_END_DT");
				
				INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
				RN.appendChild(xmlDoc.createTextNode( data[i].RN ));
				EVT_CODE.appendChild(xmlDoc.createTextNode(  data[i].EVT_CODE ));
				STR_CODE.appendChild(xmlDoc.createTextNode( data[i].STR_CODE ));
				STR_NAME.appendChild(xmlDoc.createTextNode( data[i].STR_NAME ));
				SCAN_CODE.appendChild(xmlDoc.createTextNode( data[i].SCAN_CODE ));
				ITM_CODE.appendChild(xmlDoc.createTextNode( data[i].ITM_CODE ));
				ITM_NAME.appendChild(xmlDoc.createTextNode( data[i].ITM_NAME ));
				VEN_CODE.appendChild(xmlDoc.createTextNode( data[i].VEN_CODE ));
				VEN_NAME.appendChild(xmlDoc.createTextNode( data[i].VEN_NAME ));
				UNIT.appendChild(xmlDoc.createTextNode( data[i].UNIT ));
				POINT_SAVE.appendChild(xmlDoc.createTextNode( data[i].POINT_SAVE ));
				POINT_SAVE_NM.appendChild(xmlDoc.createTextNode( data[i].POINT_SAVE_NM ));
				TAX_GB.appendChild(xmlDoc.createTextNode( data[i].TAX_GB ));
				var TAX_GB_NM = "";
				if(data[i].TAX_GB == "1"){
					TAX_GB_NM =  "과세";
				}else{
					TAX_GB_NM = "면세";
				}
				TAX_GB_NAME.appendChild(xmlDoc.createTextNode( TAX_GB_NM ));
				BASE_WPRC.appendChild(xmlDoc.createTextNode( data[i].BASE_WPRC ));
				BASE_WVAT.appendChild(xmlDoc.createTextNode( data[i].BASE_WVAT ));
				BASE_TOTAL.appendChild(xmlDoc.createTextNode( data[i].BASE_TOTAL ));
				EVT_WPRC.appendChild(xmlDoc.createTextNode( data[i].EVT_WPRC ));
				EVT_WVAT.appendChild(xmlDoc.createTextNode( data[i].EVT_WVAT ));
				EVT_TOTAL.appendChild(xmlDoc.createTextNode( data[i].EVT_TOTAL ));
				SPRC.appendChild(xmlDoc.createTextNode( data[i].SPRC ));
				EVT_SPRC.appendChild(xmlDoc.createTextNode( data[i].EVT_SPRC ));
				MARGIN.appendChild(xmlDoc.createTextNode( data[i].MARGIN ));
				MARGIN_EVT.appendChild(xmlDoc.createTextNode( data[i].MARGIN_EVT ));
				IMAGE_NUM.appendChild(xmlDoc.createTextNode( data[i].IMAGE_NUM ));
				BOT_CODE.appendChild(xmlDoc.createTextNode( data[i].BOT_CODE ));
				BOT_SPRC.appendChild(xmlDoc.createTextNode( data[i].BOT_SPRC ));
				EVT_STR_DT.appendChild(xmlDoc.createTextNode(data[i].EVT_STR_DT ));
				EVT_END_DT.appendChild(xmlDoc.createTextNode( data[i].EVT_END_DT ));
				ORD_STR_DT.appendChild(xmlDoc.createTextNode( data[i].ORD_STR_DT ));
				ORD_END_DT.appendChild(xmlDoc.createTextNode( data[i].ORD_END_DT ));
					
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE_NM);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WVAT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_TOTAL);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WVAT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_TOTAL);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN_EVT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IMAGE_NUM);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_STR_DT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_END_DT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_STR_DT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_END_DT);
				
				
				gridRoot2.addItemAt(  xmlDoc  , -1, false );
				
				//i (index) 입력하여 그리드 아이템 가져오기
				var selectedItem = gridRoot2.getItemAt(i);
				//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
				gridRoot2.removeChangedData(selectedItem);
			}
			//그리드 속성 refresh
			dataGrid2.invalidateList();
			
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

function btnSaveExcel(){
	
	var gridXmlData = "";
	
	// 지불조건 XML로 뽑기  - xml
	var rowCnt  = gridRoot5.getCollection().getSource() ;
	var updateRowCnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot5.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData = gridXmlData + getXmlString(   gridRoot5.getItemAt(i)   );
			updateRowCnt++;
		}
	}
	
	if(updateRowCnt == 0){
		alert("업로드 된 항목이 존재하지 않습니다.");
		return;
	}
	
	var selectorColumn = gridRoot4.getObjectById("selector");

	var selectedStrore = selectorColumn.getSelectedIndices();

	if(selectedStrore.length < 1){
		alert(storeName + msgConfirm);
		return;
	}

	var gridXmlData2 = "";
	for(var i=0; i < selectedStrore.length ; i++){
		gridXmlData2 = gridXmlData2 + "<GRIDROW>";
			gridXmlData2 = gridXmlData2 + "<STR_CODE>" + gridRoot4.getItemFieldAt(Number(selectedStrore[i]), "STR_CODE") + "</STR_CODE>";
			gridXmlData2 = gridXmlData2 + "<STR_NAME>" + gridRoot4.getItemFieldAt(Number(selectedStrore[i]), "STR_NAME") + "</STR_NAME>";
		gridXmlData2 = gridXmlData2 + "</GRIDROW>";
	}
	
	
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData =  "<GRIDLIST>"+gridXmlData+"</GRIDLIST>" ;
	gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
	
	jQuery.ajax({ 
	    url:"/campaignProductRegistExcel.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {
					"gridXmlData" : gridXmlData
				,	"gridXmlData2" : gridXmlData2
		        }, 
		success:function(data){   
			
			gridRoot2.removeAll();
			
			selectEVTItem();
			
			alert(msgSave);
			btn_close_excel();
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

var myVar = "";
function btnSaveCheck() {
    myVar = setTimeout(btnSave, 500);
}

function btnSave(){
	
	var gridXmlData2 = "";
	
	// 지불조건 XML로 뽑기  - xml
	var rowCnt  = gridRoot2.getCollection().getSource() ;
	var updateRowCnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData2 = gridXmlData2 + getXmlString(   gridRoot2.getItemAt(i)   );
			updateRowCnt++;
		}
	}
	
	if(updateRowCnt == 0){
		alert(msgNoneItem);
		return;
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
	
	jQuery.ajax({ 
	    url:"/campaignProductRegist.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: {
					"gridXmlData2" : gridXmlData2
				,	"EVT_CODE"	: dataRow1.EVT_CODE
				,	"EVT_STR_DT" : dataRow1.EVT_STR_DT
				,	"EVT_END_DT" : dataRow1.EVT_END_DT
				,	"ORD_STR_DT" : dataRow1.ORD_STR_DT
				,	"ORD_END_DT" : dataRow1.ORD_END_DT
		        }, 
		success:function(data){   
			
			var clearData = [];
			gridApp2.setData(clearData);
			
			selectEVTItem();
			
			alert(msgSave);
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//alert(gridXmlData2);
	
}

//(점별상품검색) 팝업 callback function
function fn_comm_store_callback(dataRow){
	
	if(selectedIndex == -1){
		alert(itmName + msgSelectData);
		return;
	}
	
	//alert(ITM_NAME);
	//rowIndex2
	//gridRoot2.setItemFieldAt( SCAN_CODE , rowIndex2, "SCAN_CODE");
	
	jQuery.ajax({ 
	    url:"/selectDetailProduct.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {'ITM_CODE' : dataRow.ITM_CODE},
		success:function(data){  
			//alert(data);
			if(data.length > 0){
				gridRoot2.setItemFieldAt( data[0].SCAN_CODE , selectedIndex, "SCAN_CODE");
				gridRoot2.setItemFieldAt( data[0].ITM_CODE , selectedIndex, "ITM_CODE");
				gridRoot2.setItemFieldAt( data[0].ITM_NAME , selectedIndex, "ITM_NAME");
				gridRoot2.setItemFieldAt( data[0].UNIT , selectedIndex, "UNIT");
				gridRoot2.setItemFieldAt( data[0].TAX_GB , selectedIndex, "TAX_GB");
				gridRoot2.setItemFieldAt( data[0].TAX_GB_NAME , selectedIndex, "TAX_GB_NAME");
				gridRoot2.setItemFieldAt( data[0].WPRC , selectedIndex, "BASE_WPRC");
				gridRoot2.setItemFieldAt( data[0].WPRC_WVAT , selectedIndex, "BASE_WVAT");
				gridRoot2.setItemFieldAt( data[0].WPRC_TOTAL , selectedIndex, "BASE_TOTAL");
				gridRoot2.setItemFieldAt( data[0].SPRC , selectedIndex, "SPRC");
				gridRoot2.setItemFieldAt( data[0].BOT_CODE , selectedIndex, "BOT_CODE");
				gridRoot2.setItemFieldAt( data[0].BOT_SPRC , selectedIndex, "BOT_SPRC");
				
				var MARGIN = (Number(data[0].SPRC) - Number(data[0].WPRC)) / Number(data[0].SPRC) * 100;
				gridRoot2.setItemFieldAt( Math.round(MARGIN) , selectedIndex, "MARGIN");
				
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}
function fn_comm_store_callback2(dataRow){
	
	//alert(ITM_NAME);
	//rowIndex2
	//gridRoot2.setItemFieldAt( SCAN_CODE , rowIndex2, "SCAN_CODE");
	
	jQuery.ajax({ 
	    url:"/selectDetailProduct.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {'ITM_CODE' : dataRow.ITM_CODE},
		success:function(data){  
			//alert(data);
			if(data.length > 0){

				$("#SCAN_CODE").val(data[0].SCAN_CODE);
				$("#ITM_CODE").val(data[0].ITM_CODE);
				$("#ITM_NAME").val(data[0].ITM_NAME);
				$("#UNIT").val(data[0].UNIT);
				$("#pop_cnt select[name=TAX_GB]").val(data[0].TAX_GB);
				$("#BASE_WPRC").val(data[0].WPRC);
				$("#BASE_WVAT").val(data[0].WPRC_WVAT);
				$("#BASE_TOTAL").val(data[0].WPRC_TOTAL);
				$("#SPRC").val(data[0].SPRC);
				$("#BOT_CODE").val(data[0].BOT_CODE);
				$("#BOT_SPRC").val(data[0].BOT_SPRC);
				
				var MARGIN = (Number(data[0].SPRC) - Number(data[0].WPRC)) / Number(data[0].SPRC) * 100;
				$("#MARGIN").val(MARGIN.toFixed(1));
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

function selectEVTItem(){
	
	$("#mid_search select[name=P_STR_CODE]").val("");
	$("#mid_search input[name=P_VEN_CODE]").val("");
	$("#mid_search input[name=P_VEN_NAME]").val("");
	$("#mid_search input[name=P_ITM_CODE]").val("");
	$("#mid_search input[name=P_ITM_NAME]").val("");
	
	//var clearData = [];
	//gridApp2.setData(clearData);
	
	//로딩바 출력
	showLoadingBar2();
	
	jQuery.ajax({ 
	    url:"/selectEVTItem.do",         
	    type:"POST",
		datatype:"xml",
		//async:false,
		data: {'EVT_CODE' : dataRow1.EVT_CODE
			,	 'STR_CODE' : dataRow1.STR_CODE},
		success:function(data){
			
			//gridApp2.setData(data);
			gridRoot2.removeAll();
			
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
				var EVT_CODE = xmlDoc.createElement("EVT_CODE");
				var STR_CODE = xmlDoc.createElement("STR_CODE");
				var STR_NAME = xmlDoc.createElement("STR_NAME");
				var SCAN_CODE = xmlDoc.createElement("SCAN_CODE");
				var ITM_CODE = xmlDoc.createElement("ITM_CODE");
				var ITM_NAME = xmlDoc.createElement("ITM_NAME");
				var VEN_CODE = xmlDoc.createElement("VEN_CODE");
				var VEN_NAME = xmlDoc.createElement("VEN_NAME");
				var UNIT = xmlDoc.createElement("UNIT");
				var POINT_SAVE = xmlDoc.createElement("POINT_SAVE");
				var POINT_SAVE_NM = xmlDoc.createElement("POINT_SAVE_NM");
				var TAX_GB = xmlDoc.createElement("TAX_GB");
				var TAX_GB_NAME = xmlDoc.createElement("TAX_GB_NAME");
				var BASE_WPRC = xmlDoc.createElement("BASE_WPRC");
				var BASE_WVAT = xmlDoc.createElement("BASE_WVAT");
				var BASE_TOTAL = xmlDoc.createElement("BASE_TOTAL");
				var EVT_WPRC = xmlDoc.createElement("EVT_WPRC");
				var EVT_WVAT = xmlDoc.createElement("EVT_WVAT");
				var EVT_TOTAL = xmlDoc.createElement("EVT_TOTAL");
				var SPRC = xmlDoc.createElement("SPRC");
				var EVT_SPRC = xmlDoc.createElement("EVT_SPRC");
				var MARGIN = xmlDoc.createElement("MARGIN");
				var MARGIN_EVT = xmlDoc.createElement("MARGIN_EVT");
				var IMAGE_NUM = xmlDoc.createElement("IMAGE_NUM");
				var BOT_CODE = xmlDoc.createElement("BOT_CODE");
				var BOT_SPRC = xmlDoc.createElement("BOT_SPRC");
				var EVT_STR_DT = xmlDoc.createElement("EVT_STR_DT");
				var EVT_END_DT = xmlDoc.createElement("EVT_END_DT");
				var ORD_STR_DT = xmlDoc.createElement("ORD_STR_DT");
				var ORD_END_DT = xmlDoc.createElement("ORD_END_DT");
				
				INPUT_YN.appendChild(xmlDoc.createTextNode( 'N' ));
				RN.appendChild(xmlDoc.createTextNode( data[i].RN ));
				EVT_CODE.appendChild(xmlDoc.createTextNode(  data[i].EVT_CODE ));
				STR_CODE.appendChild(xmlDoc.createTextNode( data[i].STR_CODE ));
				STR_NAME.appendChild(xmlDoc.createTextNode( data[i].STR_NAME ));
				SCAN_CODE.appendChild(xmlDoc.createTextNode( data[i].SCAN_CODE ));
				ITM_CODE.appendChild(xmlDoc.createTextNode( data[i].ITM_CODE ));
				ITM_NAME.appendChild(xmlDoc.createTextNode( data[i].ITM_NAME ));
				VEN_CODE.appendChild(xmlDoc.createTextNode( data[i].VEN_CODE ));
				VEN_NAME.appendChild(xmlDoc.createTextNode( data[i].VEN_NAME ));
				UNIT.appendChild(xmlDoc.createTextNode( data[i].UNIT ));
				POINT_SAVE.appendChild(xmlDoc.createTextNode( data[i].POINT_SAVE ));
				POINT_SAVE_NM.appendChild(xmlDoc.createTextNode( data[i].POINT_SAVE_NM ));
				TAX_GB.appendChild(xmlDoc.createTextNode( data[i].TAX_GB ));
				var TAX_GB_NM = "";
				if(data[i].TAX_GB == "1"){
					TAX_GB_NM =  "과세";
				}else{
					TAX_GB_NM = "면세";
				}
				TAX_GB_NAME.appendChild(xmlDoc.createTextNode( TAX_GB_NM ));
				BASE_WPRC.appendChild(xmlDoc.createTextNode( data[i].BASE_WPRC ));
				BASE_WVAT.appendChild(xmlDoc.createTextNode( data[i].BASE_WVAT ));
				BASE_TOTAL.appendChild(xmlDoc.createTextNode( data[i].BASE_TOTAL ));
				EVT_WPRC.appendChild(xmlDoc.createTextNode( data[i].EVT_WPRC ));
				EVT_WVAT.appendChild(xmlDoc.createTextNode( data[i].EVT_WVAT ));
				EVT_TOTAL.appendChild(xmlDoc.createTextNode( data[i].EVT_TOTAL ));
				SPRC.appendChild(xmlDoc.createTextNode( data[i].SPRC ));
				EVT_SPRC.appendChild(xmlDoc.createTextNode( data[i].EVT_SPRC ));
				MARGIN.appendChild(xmlDoc.createTextNode( data[i].MARGIN ));
				MARGIN_EVT.appendChild(xmlDoc.createTextNode( data[i].MARGIN_EVT ));
				IMAGE_NUM.appendChild(xmlDoc.createTextNode( data[i].IMAGE_NUM ));
				BOT_CODE.appendChild(xmlDoc.createTextNode( data[i].BOT_CODE ));
				BOT_SPRC.appendChild(xmlDoc.createTextNode( data[i].BOT_SPRC ));
				EVT_STR_DT.appendChild(xmlDoc.createTextNode(data[i].EVT_STR_DT ));
				EVT_END_DT.appendChild(xmlDoc.createTextNode( data[i].EVT_END_DT ));
				ORD_STR_DT.appendChild(xmlDoc.createTextNode( data[i].ORD_STR_DT ));
				ORD_END_DT.appendChild(xmlDoc.createTextNode( data[i].ORD_END_DT ));
					
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(POINT_SAVE_NM);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(TAX_GB_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_WVAT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BASE_TOTAL);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_WVAT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_TOTAL);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MARGIN_EVT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IMAGE_NUM);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BOT_SPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_STR_DT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(EVT_END_DT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_STR_DT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_END_DT);
				
				
				gridRoot2.addItemAt(  xmlDoc  , -1, false );
				
				//i (index) 입력하여 그리드 아이템 가져오기
				var selectedItem = gridRoot2.getItemAt(i);
				//해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
				gridRoot2.removeChangedData(selectedItem);
			}
			//그리드 속성 refresh
			dataGrid2.invalidateList();
			
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

//클리어 이벤트
function fnClear(){
	var clearData = [];
	gridApp2.setData(clearData);			
	dataRow1 = "";
}

function fnClearForm(){
	
	$("#EVT_CODE").val("");
	$("#STR_CODE ").val("");
	$("#STR_NAME").val("");
	$("#SCAN_CODE").val("");
	$("#ITM_CODE").val("");
	$("#ITM_NAME").val("");
	$("#UNIT").val("");
	$("#POINT_SAVE").val("");
	$("#TAX_GB").val("");
	$("#BASE_WPRC").val("");
	$("#BASE_WVAT").val("");
	$("#BASE_TOTAL").val("");
	$("#EVT_WPRC").val("");
	$("#EVT_WVAT").val("");
	$("#EVT_TOTAL").val("");
	$("#SPRC").val("");
	$("#EVT_SPRC").val("");
	$("#MARGIN").val("");
	$("#MARGIN_EVT").val("");
	$("#IMAGE_NUM").val("");
	$("#BOT_CODE").val("");
	$("#BOT_SPRC").val("");
	
	$("#excelFile").val("");
}

//단가와 과세구분 입력하여 -> 단가, 운가, 부가세 뽑기
function calPriceVat(  PUR_AVR_AMT  , TAX_GB )
{  
   var WSPRC_VAL = 0;
   var WVAT_VAL = 0;  
   if(  TAX_GB  == "1"   ) // 과세
   {  
      WSPRC_VAL = PUR_AVR_AMT- Math.floor( PUR_AVR_AMT / 11 ) ;  
      WVAT_VAL =    Math.floor( PUR_AVR_AMT / 11 ) ; 
       
   } else {        // 면세 
      WSPRC_VAL  = PUR_AVR_AMT ; 
      WVAT_VAL = 0 ; 
   } 
   return [ PUR_AVR_AMT , WSPRC_VAL , WVAT_VAL];
}

/*$(document).ready(function (){
	$("#gridHolder3").width("100%");
	$("#gridHolder3").height( $(window).height() - 162 );

	$(window).on('resize',function (){	
		
		$("#gridHolder3").width("100%");
		$("#gridHolder3").height( $(window).height() - 162 );
		
	});
});*/

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

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder2").height( $(window).height() - 348 );
	
	$("#pop_wrap2 #pop_cnt .f_l").width(300);
	$("#pop_wrap2 #pop_cnt .f_r").width($(window).width()*0.95-342);
	
	$(window).on('resize',function (){	
		$("#gridHolder2").height( $(window).height() - 348 );
		
		$("#pop_wrap2 #pop_cnt .f_l").width(300);
		$("#pop_wrap2 #pop_cnt .f_r").width($(window).width()*0.95-342);		
	});
});