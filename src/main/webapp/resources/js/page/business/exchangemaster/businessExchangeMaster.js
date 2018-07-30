/********************************************************
 * 설명:  행사코드마스터관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2016.12.26
 * version : 1.0
 ********************************************************/

//행사 시작 종료일 중복체크를 위한 Date조회용 변수
var checkDate = {};
var cardList = "";

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
	validationCampaignDate();
	
	$(".memo").height(100);
	
	var EVT_STR_DT =new CommDateManager().getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	var EVT_END_DT = new CommDateManager().getDate("yyyy-mm-dd");
	
	$('#top_search input[name=EVT_STR_DT]').val(EVT_STR_DT);
	$('#top_search input[name=EVT_END_DT]').val(EVT_END_DT);
	//$('#top_search input[name=EVT_STR_DT]').val($.datepicker.formatDate('yy-mm-dd', new Date()));
	//$('#top_search input[name=EVT_END_DT]').val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	/*$("#B_STR_CODE").change(function() {
		validationCampaignDate();
	});*/
	
	$("#B_EXCHG_CONTS").keyup(function(e) {
	    var $this = $(this);
	    var length = $this.val().length;
	    if(length == 1 || length == 0) return;
	    if(length % 25 == 0) {
	        if(e.keyCode == 8) {
	        	$this.val($this.val().substring(0, $this.val().length - 1));
	        } else {
	        	$this.val($this.val() + "\n");
	        }
	    }
	});
	
	$('#B_EXCHG_BASE_AMT, #B_DC_AMT, #B_CARD_BASE_AMT').number( true, 0 );
	
	$("#B_EVT_FLAG").change(function(){
		
		var selectorColumn = gridRoot3.getObjectById("selector");
		if($("#B_EVT_FLAG").val() == "1"){
			selectorColumn.setAllItemSelected(true);
		}else if($("#B_EVT_FLAG").val() == "2"){
			selectorColumn.setAllItemSelected(false);
		}else{
			selectorColumn.setAllItemSelected(false);
		}
		
	});
	
	$("#B_EVT_TYPE").change(function(){
		cardList = "";
		$("#B_CARD_BASE_AMT").val("");
		$("#B_DC_FLAG").val("");
		$("#B_DC_AMT").val("");
		$("#B_DC_RATE").val("");
		$("#B_EXCHG_PRT_YN").val("");
		$("#B_EXCHG_BASE_AMT").val("");
		$("#B_EXCHG_CONTS").val("");
		$("#P_CARD_LIST").val("");
		//행사가 카드행사 및 카드 제휴 행사일 경우 카드 선택 팝업 출력
		if($("#B_EVT_TYPE").val() == "2" || $("#B_EVT_TYPE").val() == "3"){
			btn_comm_card_search();
			
			$("#B_CARD_BASE_AMT").attr("disabled", false);
			$("#B_DC_FLAG").attr("disabled", false);
			$("#B_DC_AMT").attr("disabled", true);
			$("#B_DC_RATE").attr("disabled", true);
			$("#B_EXCHG_BASE_AMT").attr("disabled", true);
			$("#B_EXCHG_CONTS").attr("disabled", true);
			
			return;
		}else{
			
			$("#B_CARD_BASE_AMT").attr("disabled", true);
			$("#B_DC_FLAG").attr("disabled", true);
			$("#B_DC_AMT").attr("disabled", true);
			$("#B_DC_RATE").attr("disabled", true);
			$("#B_EXCHG_BASE_AMT").attr("disabled", true);
			$("#B_EXCHG_CONTS").attr("disabled", true);
			
		}
		
	});
	
	$("#B_DC_FLAG").change(function(){
		
		$("#B_DC_AMT").val("");
		$("#B_DC_RATE").val("");
		
		if($("#B_DC_FLAG").val() == "1"){
			$("#B_DC_AMT").attr("disabled", false);
			$("#B_DC_RATE").attr("disabled", true);
		}else if($("#B_DC_FLAG").val() == "2"){
			$("#B_DC_AMT").attr("disabled", true);
			$("#B_DC_RATE").attr("disabled", false);
		}else{
			$("#B_DC_AMT").attr("disabled", true);
			$("#B_DC_RATE").attr("disabled", true);
		}
		
	});
	
	$("#B_EXCHG_PRT_YN").change(function(){
		
		$("#B_EXCHG_BASE_AMT").val("");
		$("#B_EXCHG_CONTS").val("");
		
		if($("#B_EXCHG_PRT_YN").val() == "Y"){
			$("#B_EXCHG_BASE_AMT").attr("disabled", false);
			$("#B_EXCHG_CONTS").attr("disabled", false);
		}else{
			$("#B_EXCHG_BASE_AMT").attr("disabled", true);
			$("#B_EXCHG_CONTS").attr("disabled", true);
		}
		
	});
	
	//$("#B_DC_RATE").on("keyup", "#IP_ADDR", function() {$(this).val( $(this).val().replace(/[^0-9.]/gi,"") );});
	$("#B_DC_RATE").keyup(function(){
		$(this).val( $(this).val().replace(/[^0-9.]/gi,"") );
	});
	
	//달력설정
	$(".datepicker").datepicker({
		onSelect: function(dateText, e) {
			if(e.id == "EVT_STR_DT" || e.id == "EVT_END_DT"){
				var startDate = parseInt($("#EVT_STR_DT").val().replace(/-/g, ""));
				var endDate = parseInt($("#EVT_END_DT").val().replace(/-/g, ""));
				if(startDate > endDate)
				{
					alert(msgDateValidation);
					
					if(this.id == "EVT_STR_DT")
						$("#EVT_STR_DT").val(EVT_STR_DT);
					else if(this.id == "EVT_END_DT")
						$("#EVT_END_DT").val(EVT_END_DT);
					
					return;
				}
			}else if(e.id == "B_EVT_STR_DT" || e.id == "B_EVT_END_DT"){
				var startDate = parseInt($("#B_EVT_STR_DT").val().replace(/-/g, ""));
				var endDate = parseInt($("#B_EVT_END_DT").val().replace(/-/g, ""));
				if(startDate > endDate)
				{
					alert("입력 날자 범위가 옳바르지 않습니다.");
					
					if(this.id == "B_EVT_STR_DT")
						$("#B_EVT_STR_DT").val("");
					else if(this.id == "B_EVT_END_DT")
						$("#B_EVT_END_DT").val("");
					
					return;
				}
			}else if(e.id == "B_ORD_STR_DT" || e.id == "B_ORD_END_DT"){
				var startDate = parseInt($("#B_ORD_STR_DT").val().replace(/-/g, ""));
				var endDate = parseInt($("#B_ORD_END_DT").val().replace(/-/g, ""));
				if(startDate > endDate)
				{
					alert("입력 날자 범위가 옳바르지 않습니다.");
					
					if(this.id == "B_ORD_STR_DT")
						$("#B_ORD_STR_DT").val("");
					else if(this.id == "B_ORD_END_DT")
						$("#B_ORD_END_DT").val("");
					
					return;
				}
			}
			
		},showMonthAfterYear:true
	});
	
	//카드행사 카드 정보 조회
	$("#pop_wrap1").dialog({
		  autoOpen : false,
		    modal : true,
		    width : 900,
		    height : 500,
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
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%", "350px");
rMateGridH5.create("grid3", "gridHolder3", jsVars, "100%", "350px");
rMateGridH5.create("grid4", "gridHolder4", jsVars, "100%", "350px");

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
			
			var selectorColumn = gridRoot3.getObjectById("selector");
			if(dataRow1.EVT_FLAG == "1"){
				selectorColumn.setAllItemSelected(true);
			}else{
				//해당 점포 grid에 체크하기
				var rowCnt  = gridRoot3.getCollection().getSource() ;   
				for(var i=0 ; i < rowCnt.length ; i++){
					if(gridRoot3.getItemFieldAt(i, "STR_CODE") == dataRow1.STR_CODE){
						selectorColumn.setSelectedIndices([i]);
					}
				}
			}

			var evtStartDate = dataRow1.EVT_STR_DT.split("-");
			var evtEndDate = dataRow1.EVT_END_DT.split("-");
			
			if(Number(evtStartDate[0]+evtStartDate[1]+evtStartDate[2]) <= Number(yyyy.toString()+mm.toString()+dd.toString())){
				//$("#B_STR_CODE").attr("disabled", true);
				$("#B_EVT_STR_DT").attr("disabled", true);
				$("#B_EVT_STR_DT").datepicker("destroy");
				$("#B_EVT_STR_DT").blur();
				
				if(Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2]) <= Number(yyyy.toString()+mm.toString()+dd.toString())){
					$("#B_EVT_END_DT").attr("disabled", true);				
					$("#B_EVT_END_DT").datepicker("destroy");
				}

				$("#B_ORD_STR_DT").attr("disabled", true);
				$("#B_ORD_STR_DT").datepicker("destroy");
				$("#B_ORD_END_DT").attr("disabled", true);
				$("#B_ORD_END_DT").datepicker("destroy");
				$("#B_EVT_FLAG").attr("disabled", true);
				$("#B_EVT_NAME").attr("disabled", true);
				$("#B_REMARK").attr("disabled", true);
				
				
			}else{
				//$("#B_STR_CODE").attr("disabled", false);
				$("#B_EVT_STR_DT").attr("disabled", false);
				$("#B_EVT_STR_DT").datepicker();				
				$("#B_EVT_END_DT").attr("disabled", false);
				$("#B_EVT_END_DT").datepicker();
				$("#B_ORD_STR_DT").attr("disabled", false);
				$("#B_ORD_STR_DT").datepicker();
				$("#B_ORD_END_DT").attr("disabled", false);
				$("#B_ORD_END_DT").datepicker();
				$("#B_EVT_FLAG").attr("disabled", false);
				$("#B_EVT_NAME").attr("disabled", false);
				$("#B_REMARK").attr("disabled", false);
				
			}
			
			/*if(dataRow1.EVT_FLAG == "1"){
				$("#B_STR_CODE").val("");
				$("#B_STR_CODE").attr("disabled", true);
			}else{
				$("#B_STR_CODE").val(dataRow1.STR_CODE);
			}*/
			
			$("#B_EVT_TYPE").val(dataRow1.EVT_TYPE);
			if(dataRow1.EVT_TYPE == "2" || dataRow1.EVT_TYPE == "3"){
				$("#B_CARD_BASE_AMT").val(dataRow1.CARD_BASE_AMT);
				$("#B_CARD_BASE_AMT").attr("disabled", false);
				$("#B_DC_FLAG").val(dataRow1.DC_FLAG);
				$("#B_DC_FLAG").attr("disabled", false);
				$("#B_EXCHG_PRT_YN").attr("disabled", false);
				if(dataRow1.DC_FLAG == "1"){
					$("#B_DC_AMT").val(dataRow1.DC_AMT);
					$("#B_DC_AMT").attr("disabled", false);
					$("#B_DC_RATE").val("");
					$("#B_DC_RATE").attr("disabled", true);
				}else{
					$("#B_DC_AMT").val("");
					$("#B_DC_AMT").attr("disabled", true);
					$("#B_DC_RATE").val(dataRow1.DC_RATE);
					$("#B_DC_RATE").attr("disabled", false);
				}
				
			}else{
				
				$("#B_CARD_BASE_AMT").val("");
				$("#B_DC_FLAG").val("");
				$("#B_DC_AMT").val("");
				$("#B_DC_RATE").val("");
				$("#B_EXCHG_PRT_YN").val("");
				$("#B_EXCHG_BASE_AMT").val("");
				$("#B_EXCHG_CONTS").val("");
				$("#P_CARD_LIST").val("");
				
				$("#B_CARD_BASE_AMT").attr("disabled", true);
				$("#B_DC_FLAG").attr("disabled", true);
				$("#B_DC_AMT").attr("disabled", true);
				$("#B_DC_RATE").attr("disabled", true);
				$("#B_EXCHG_BASE_AMT").attr("disabled", true);
				$("#B_EXCHG_CONTS").attr("disabled", true);
				
			}
			
			$("#B_EXCHG_PRT_YN").val(dataRow1.EXCHG_PRT_YN);
			if(dataRow1.EXCHG_PRT_YN == "Y"){
				$("#B_EXCHG_BASE_AMT").val(dataRow1.EXCHG_BASE_AMT);
				$("#B_EXCHG_BASE_AMT").attr("disabled", false);
				$("#B_EXCHG_CONTS").val(dataRow1.EXCHG_CONTS);
				$("#B_EXCHG_CONTS").attr("disabled", false);
			}else{
				$("#B_EXCHG_BASE_AMT").val("");
				$("#B_EXCHG_BASE_AMT").attr("disabled", true);
				$("#B_EXCHG_CONTS").val("");
				$("#B_EXCHG_CONTS").attr("disabled", true);
			}
			
			$("#B_EVT_CODE").val(dataRow1.EVT_CODE);
			$("#B_EVT_STR_DT").val(dataRow1.EVT_STR_DT);
			$("#B_EVT_END_DT").val(dataRow1.EVT_END_DT);
			$("#B_ORD_STR_DT").val(dataRow1.ORD_STR_DT);
			$("#B_ORD_END_DT").val(dataRow1.ORD_END_DT);
			$("#B_EVT_FLAG").val(dataRow1.EVT_FLAG);
			$("#B_EVT_NAME").val(dataRow1.EVT_NAME);
			$("#B_REMARK").val(dataRow1.REMARK);
			$("#B_IDATE").val(dataRow1.IDATE);
			$("#B_IEMP_NAME").val(dataRow1.IEMP_NAME);
			$("#B_UDATE").val(dataRow1.UDATE);
			$("#B_UEMP_NAME").val(dataRow1.UEMP_NAME);
			$("#B_TGET_CUST").val(dataRow1.TGET_CUST);
			$("#B_POINT_NET_YN").val(dataRow1.POINT_NET_YN);
			
			//cardList = "";
			
			//selectEventCard(dataRow1.EVT_CODE);
			
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			
			//그리드1 셀선택 이벤트
			dataGrid1.addEventListener("itemClick", itemClickHandler);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		
		
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
			var column = dataGrid3.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData3 = dataRow3[dataField];
			
			//alert(gridRoot3.getObjectById("selector").getSelectedIndices());
		};
		
		var layoutCompleteHandler3 = function(event) {
			dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체
			dataGrid3.invalidateList();
			dataGrid3.addEventListener("itemClick", itemClickHandler3);
			getStrCode();

		};
		
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
		
	}else if (id == "grid4") {
		
		gridApp4 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
		gridRoot4 = gridApp4.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp4.setLayout(layoutStr4);
		gridApp4.setData(gridData4);
		
		
		var layoutCompleteHandler4 = function(event) {
			dataGrid4 = gridRoot4.getDataGrid();	// 그리드 객체
		};
		
		gridRoot4.addEventListener("layoutComplete", layoutCompleteHandler4);
		
	}
}

function test(event){
	alert(gridRoot3.getObjectById("selector").getSelectedIndices());
}

//그리드1 데이터 초기화
var gridData1 = [];
var gridData3 = [];
var gridData4 = [];
//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1;
var gridApp3, gridRoot3, dataGrid3, dataRow3,clickData3,selectorColumn3;
var gridApp4, gridRoot4, dataGrid4, dataRow4,clickData4,selectorColumn4;


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="RN"  headerText="' + rowNumber + '" textAlign="center" width="41" />\
			<DataGridColumn dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_CODE"  headerText="' + eventCode + '" textAlign="center" width="70" />\
			<DataGridColumn dataField="EVT_NAME"  headerText="' + eventName + '" textAlign="left"  width="200"/>\
			<DataGridColumn dataField="EVT_STR_DT"  headerText="' + eventStartDate + '" textAlign="center" />\
			<DataGridColumn dataField="EVT_END_DT"  headerText="' + eventEndDate + '" textAlign="center" />\
			<DataGridColumn dataField="ORD_STR_DT"  headerText="' + orderStartDate + '" textAlign="center" />\
			<DataGridColumn dataField="ORD_END_DT"  headerText="' + orderEnddate + '" textAlign="center" />\
			<DataGridColumn dataField="EVT_FLAG"  headerText="' + eventType + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_FLAG_NM"  headerText="' + eventType + '" textAlign="center" width="70" />\
			<DataGridColumn dataField="EVT_TYPE"  headerText="' + evtType + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_TYPE_NM"  headerText="' + evtType + '" textAlign="center" width="70" />\
			<DataGridColumn dataField="IEMP_NO"  headerText="' + inputNo + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="IDATE"  headerText="' + inputDate + '" textAlign="center" />\
			<DataGridColumn dataField="IEMP_NAME"  headerText="' + inputName + '" textAlign="center" width="60" />\
			<DataGridColumn dataField="UEMP_NO"  headerText="UEMP_NO" textAlign="center" visible="false" />\
			<DataGridColumn dataField="UDATE"  headerText="' + modifiedDate + '" textAlign="center" />\
			<DataGridColumn dataField="UEMP_NAME"  headerText="' + modifier + '" textAlign="center" width="60" />\
			<DataGridColumn dataField="REMARK"  headerText="' + remark + '" textAlign="left" width="200" />\
			<DataGridColumn dataField="CARD_BASE_AMT"  headerText="' + cardBaseAmt + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="DC_FLAG"  headerText="' + dcFlag + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="DC_AMT"  headerText="' + dcAmt + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="DC_RATE"  headerText="' + dcRate + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EXCHG_PRT_YN"  headerText="' + exchgPrtYn + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EXCHG_BASE_AMT"  headerText="' + exchgBaseAmt + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EXCHG_CONTS"  headerText="' + exchgConts + '" textAlign="center" visible="false" />\
			<DataGridColumn dataField="PRODUCT_CNT"  headerText="PRODUCT_CNT" textAlign="center" visible="false" />\
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
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg4" sortableColumns="true" selectionMode="multipleCells">\
			<columns>\
				<DataGridColumn dataField="CARD_CODE"  		headerText="카드사코드"  	textAlign="center" 	/>\
				<DataGridColumn dataField="CARD_NAME" 		headerText="카드사명" 		textAlign="center"	/>\
				<DataGridColumn dataField="CARD_PREFIX" 		headerText="카드식별번호" 	textAlign="center"	/>\
				<DataGridColumn dataField="MBR_DSNT"   		headerText="카드명칭" 		textAlign="center"	/>\
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
	$("#top_search select[name=STR_CODE]").append('<option value="">'+ all +'</option>');
	getStoreCode("top_search select[name=STR_CODE]");
	
	//$("#B_STR_CODE").append('<option value="">'+ select +'</option>');
	//getStoreCode("B_STR_CODE");
	
	$("#top_search select[name=EVT_FLAG]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("top_search select[name=EVT_FLAG]", "EVT_FLAG");
	
	$("#B_EVT_FLAG").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("B_EVT_FLAG", "EVT_FLAG");
	
	$("#B_EVT_TYPE").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("B_EVT_TYPE", "EVT_TYPE");
	$("#B_EVT_TYPE option:[value='0']").remove();
	$("#B_EVT_TYPE option:[value='2']").remove();
	
	$("#B_DC_FLAG").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("B_DC_FLAG", "DC_FLAG");
	
	$("#B_TGET_CUST").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("B_TGET_CUST", "TGET_CUST");
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

//카드행사 카드 정보 조회
function btn_comm_card_search(){
	
	gridRoot23.removeAll();
	gridRoot24.removeAll();
	$("#P_CARD_CODE").val("");
	$("#P_CARD_NAME").val("");
	$("#P_MBR_DSNT").val("");
	
	$("#P_CARD_PREFIX_2").attr("checked", true);
	/*
	if($("#B_EVT_TYPE").val() == "2"){
		$("#P_CARD_PREFIX_2").attr("checked", true);
	}else{
		$("#P_CARD_PREFIX_3").attr("checked", true);
	}
	*/
	$('#comm_pop_wrap14' ).dialog( 'open' );
	gridApp23.resize();

	$("#P_CALLBACK_NM14").val('fn_comm_card_callback(selectedCard)');
}

function btnCardList(){
	
	if(dataRow1 == "" || dataRow1 == undefined || dataRow1 == null){
		alert("선택된 교환권 행사가 없습니다.");
		return;
	}
	
	$("#pop_wrap1").dialog( "open" );
	gridApp4.resize();
	
	selectEventCard(dataRow1.EVT_CODE);
	
}

function fn_comm_card_callback(selectedCard){
	
	var P_CARD_LIST = "";
	
	for(var i=0 ; i < selectedCard.length ; i++){
		if($("#B_EVT_TYPE").val() == "2"){
			if(i == selectedCard.length-1){
				P_CARD_LIST = P_CARD_LIST + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_NAME");
				cardList = cardList + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_CODE") + ",000000";
			}else{
				P_CARD_LIST = P_CARD_LIST + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_NAME") + " / ";
				cardList = cardList + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_CODE") + ",000000" + "/";
			}
		}else{
			if(i == selectedCard.length-1){
				P_CARD_LIST = P_CARD_LIST + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_NAME") + "(" + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "MBR_DSNT").trim() + ")";
				cardList = cardList + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_CODE") + "," + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_PREFIX");
			}else{
				P_CARD_LIST = P_CARD_LIST + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_NAME") + "(" + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "MBR_DSNT").trim() + ")" + " / ";
				cardList = cardList + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_CODE") + "," + gridRoot23.getItemFieldAt(Number(selectedCard[i]), "CARD_PREFIX") + "/";
			}
		}
	}
	
	$("#P_CARD_LIST").val(P_CARD_LIST);
	
}

function open_comm_pop_wrap15(){
	$('#comm_pop_wrap15' ).dialog( 'open' );
	gridApp24.resize();

	$("#P_CALLBACK_NM15").val('fn_comm_card_detail_callback(dataRow24)');
}

function fn_comm_card_detail_callback(dataRow){
	$("#P_CARD_CODE").val(dataRow.CARD_CODE);
	$("#P_CARD_NAME").val(dataRow.CARD_NAME);
}

//신규 버튼 클릭 이벤트 (폼 초기화)
function btnNew(){
	
	//grid1 셀렉트 된 내용 초기화
	dataGrid1.setSelectedIndex(-1);
	dataRow1 = "";
	
	//$("#B_STR_CODE").val("");
	$("#B_EVT_CODE").val("");
	$("#B_EVT_STR_DT").val("");
	$("#B_EVT_END_DT").val("");
	$("#B_ORD_STR_DT").val("");
	$("#B_ORD_END_DT").val("");
	$("#B_EVT_FLAG").val("");
	$("#B_EVT_NAME").val("");
	$("#B_REMARK").val("");
	$("#B_IDATE").val("");
	$("#B_IEMP_NAME").val("");
	$("#B_UDATE").val("");
	$("#B_UEMP_NAME").val("");
	
	//$("#B_STR_CODE").attr("disabled", false);
	
	$("#B_EVT_STR_DT").attr("disabled", false);
	$("#B_EVT_STR_DT").datepicker();
	$("#B_EVT_END_DT").attr("disabled", false);
	$("#B_EVT_END_DT").datepicker();
	$("#B_ORD_STR_DT").attr("disabled", false);
	$("#B_ORD_STR_DT").datepicker();
	$("#B_ORD_END_DT").attr("disabled", false);
	$("#B_ORD_END_DT").datepicker();
	
	$("#B_EVT_FLAG").attr("disabled", false);
	$("#B_EVT_NAME").attr("disabled", false);
	$("#B_REMARK").attr("disabled", false);
	
	$("#B_EVT_TYPE").val("");
	$("#B_CARD_BASE_AMT").val("");
	$("#B_DC_FLAG").val("");
	$("#B_DC_AMT").val("");
	$("#B_DC_RATE").val("");
	$("#B_EXCHG_PRT_YN").val("");
	$("#B_EXCHG_BASE_AMT").val("");
	$("#B_EXCHG_CONTS").val("");
	$("#P_CARD_LIST").val("");
	
	$("#B_CARD_BASE_AMT").attr("disabled", true);
	$("#B_DC_FLAG").attr("disabled", true);
	$("#B_DC_AMT").attr("disabled", true);
	$("#B_DC_RATE").attr("disabled", true);
	$("#B_EXCHG_BASE_AMT").attr("disabled", true);
	$("#B_EXCHG_CONTS").attr("disabled", true);
	
	$("#B_TGET_CUST").val("");
	$("#B_POINT_NET_YN").val("");
	
	getStrCode();
	
}

//행사 코드 마스터 조회
function btnSearch(){
	var evtStartDate 	= $("#EVT_STR_DT").val().split("-");
	var evtEndDate 		= $("#EVT_END_DT").val().split("-");
	var strDt1			= new Date(evtStartDate[0], Number(evtStartDate[1])-1, evtStartDate[2]); 
	var endDt1			= new Date(evtEndDate[0], Number(evtEndDate[1])-1, evtEndDate[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if(Number(evtStartDate[0] + evtStartDate[1] + evtStartDate[2]) > Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2])){
		alert(msgDateValidation);
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#EVT_STR_DT").focus();
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
					'EVT_STR_DT' : $("#top_search input[name=EVT_STR_DT]").val()
				,	'EVT_END_DT' : $("#top_search input[name=EVT_END_DT]").val()
				,	'STR_CODE' : $("#top_search select[name=STR_CODE]").val()
				,	'EVT_FLAG'	:	$("#top_search select[name=EVT_FLAG]").val()
				,	'SEARCH_FLAG' : 'EM'
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

function toggleAllItemSelected() {
	var selectorColumn = gridRoot3.getObjectById("selector");
	selectorColumn.setAllItemSelected(!selectorColumn.getAllItemSelected());
}

function getStrCode(){
	gridApp3.resize();
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
	    		gridApp3.setData(data);
	    		/*if(sessionOrgType == "3"){
	    			
	    			if(dataRow1.STR_CODE == "00000"){
	    				for(var i = 0; i < data.length; i++){
		    				if(sessionStrCode == data[i].STR_CODE){
		    					gridRoot2.addItemAt(data[i]);
		    				}
		    			}
	    			}else{
	    				for(var i = 0; i < data.length; i++){
		    				if(sessionStrCode == dataRow1.STR_CODE && dataRow1.STR_CODE == data[i].STR_CODE){
		    					gridRoot2.addItemAt(data[i]);
		    				}
		    			}
	    			}
	    		}else{
	    			if(dataRow1.STR_CODE == "00000"){
	    				gridApp2.setData(data);
	    			}else{
	    				for(var i = 0; i < data.length; i++){
		    				if(dataRow1.STR_CODE == data[i].STR_CODE){
		    					gridRoot2.addItemAt(data[i]);
		    				}
		    			}
	    			}
	    		}*/
	    	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btnSave(){
	
	if($("#B_EVT_NAME").val() == ""){
		alert(eventName + msgConfirm);
		return;
	}
	
	if($("#B_EVT_STR_DT").val() == ""){
		alert(eventStartDate + msgConfirm);
		return;
	}
	
	if($("#B_EVT_END_DT").val() == ""){
		alert(eventEndDate + msgConfirm);
		return;
	}
	
	if($("#B_EVT_FLAG").val() == ""){
		alert(eventType + msgConfirm);
		return;
	}
	
	if($("#B_REMARK").val() == ""){
		alert(remark + msgConfirm);
		return;
	}
	
	if($("#B_EXCHG_PRT_YN").val() == ""){
		alert(exchgPrtYn + msgConfirm);
		return;
	}
	
	if($("#B_EXCHG_PRT_YN").val() == "Y"){
		if($("#B_EXCHG_BASE_AMT").val() == "" || $("#B_EXCHG_BASE_AMT").val() == "0"){
			alert(exchgBaseAmt + msgConfirm);
			return;
		}
		
		if($("#B_EXCHG_CONTS").val() == ""){
			alert(exchgConts + msgConfirm);
			return;
		}
	}
	
	var evtStartDate = $("#B_EVT_STR_DT").val().split("-");
	var evtEndDate = $("#B_EVT_END_DT").val().split("-");
	
	if(Number(evtStartDate[0] + evtStartDate[1] + evtStartDate[2]) > Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2])){
		alert(msgEventDateValidation);
		return;
	} 
	
	if(Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2]) < Number(yyyy+mm+dd)){
		alert(msgEventEndDate);
		return;
	}
	
	if($("#B_EVT_TYPE").val() == "" ){
		alert(evtType + msgConfirm);
		return;
	}else if ($("#B_EVT_TYPE").val() == "2" || $("#B_EVT_TYPE").val() == "3"){
		
		//행사타입이 카드사, 제휴카드 일 경우에는 카드기준금액 OR 교환권출력여부 하나는 입력되어있어야함
		if($("#B_DC_FLAG").val() == "" && $("#B_EXCHG_PRT_YN").val() == ""){
			alert("행사타입이 카드사 또는 제휴카드 인경우 카드기준금액 또는 교환권출력구분은 필수 입력사항입니다.");
			return;
		}
		
	}
	
	var selectorColumn = gridRoot3.getObjectById("selector");
	var selectedStrore = selectorColumn.getSelectedIndices();
	
	if(selectedStrore.length < 1){
		alert(storeName + msgConfirm);
		return;
	}
	
	/* 카드사 목록 */
	var gridXmlData = "";
	if(cardList.length > 0){
		var cardListArr = cardList.split("/");
		for(var i in cardListArr){
			var cardListArrDetail = cardListArr[i].split(","); //[0] : CARD_CODE, [1] : CARD_PREFIX
			gridXmlData = gridXmlData + "<GRIDROW><CARD_CODE>" + cardListArrDetail[0] + "</CARD_CODE><CARD_PREFIX>" + cardListArrDetail[1] + "</CARD_PREFIX></GRIDROW>";
		}
	}
	
	var gridXmldData2 = "";
	for(var i=0; i < selectedStrore.length ; i++){
		gridXmldData2 = gridXmldData2 + "<GRIDROW>";
			gridXmldData2 = gridXmldData2 + "<STR_CODE>" + gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_CODE") + "</STR_CODE>";
			gridXmldData2 = gridXmldData2 + "<STR_NAME>" + gridRoot3.getItemFieldAt(Number(selectedStrore[i]), "STR_NAME") + "</STR_NAME>";
		gridXmldData2 = gridXmldData2 + "</GRIDROW>";
	}
	
	var rowCnt3 = gridRoot3.getCollection().getSource();
	//alert(rowCnt3.length); return;
	if(selectedStrore.length == rowCnt3.length){
		//alert("전사 체인지"); return;
		$("#B_EVT_FLAG").val("1");
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	gridXmlData = "<GRIDLIST>" + gridXmlData + "</GRIDLIST>";
	gridXmldData2 = "<GRIDLIST>" + gridXmldData2 + "</GRIDLIST>";
	
	jQuery.ajax({ 
	    url:"/registBusinessCampaignMst.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'EVT_CODE' : $("#B_EVT_CODE").val()
				,	'EVT_NAME' : $("#B_EVT_NAME").val()
				,	'EVT_FLAG' : $("#B_EVT_FLAG").val()
				,	'EVT_STR_DT' : $("#B_EVT_STR_DT").val()
				,	'EVT_END_DT' : $("#B_EVT_END_DT").val()
				,	'ORD_STR_DT' : $("#B_ORD_STR_DT").val()
				,	'ORD_END_DT' : $("#B_ORD_END_DT").val()
				,	'REMARK' : $("#B_REMARK").val()
				,	'P_EVT_TYPE' : $("#B_EVT_TYPE").val()
				,	'P_CARD_BASE_AMT' : $("#B_CARD_BASE_AMT").val()
				,	'P_DC_FLAG' : $("#B_DC_FLAG").val()
				,	'P_DC_AMT' : $("#B_DC_AMT").val()
				,	'P_DC_RATE' : $("#B_DC_RATE").val()
				,	'P_EXCHG_PRT_YN' : $("#B_EXCHG_PRT_YN").val()
				,	'P_EXCHG_BASE_AMT' : $("#B_EXCHG_BASE_AMT").val()
				,	'P_EXCHG_CONTS' : $("#B_EXCHG_CONTS").val()
				,	'GRID_XML_DATA' : gridXmlData
				,	'GRID_XML_DATA2' : gridXmldData2
				,	'P_TGET_CUST' : $("#B_TGET_CUST").val()
				,	'P_POINT_NET_YN' : $("#B_POINT_NET_YN").val()
				,	'P_CARD_FLAG' : $(":input:radio[name=P_CARD_PREFIX]:checked").val()
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

function btnDelete(){
	
	var evtStartDate = $("#B_EVT_STR_DT").val().split("-");
	var evtEndDate = $("#B_EVT_END_DT").val().split("-");
	//var ordStartDate = $("#B_ORD_STR_DT").val().split("-");
	//var ordEndDate = $("#B_ORD_END_DT").val().split("-");
	//Number(evtStartDate[0]+evtStartDate[1]+evtStartDate[2]) <= Number(yyyy.toString()+mm.toString()+dd.toString())
	
	if(Number(evtEndDate[0]+evtEndDate[1]+evtEndDate[2]) <=  Number(yyyy.toString()+mm.toString()+dd.toString())){
		//종료된 행사는 삭제가 불가능합니다.
		alert(msgDeleteEndEvent);
		return;
	}
	
	/*if(Number(evtEndDate[0]+evtEndDate[1]+evtEndDate[2]) >=  Number(yyyy.toString()+mm.toString()+dd.toString()) &&
			Number(evtStartDate[0]+evtStartDate[1]+evtStartDate[2]) <=  Number(yyyy.toString()+mm.toString()+dd.toString())){
		//진행중인 행사는 삭제가 불가능합니다.
		alert(msgDeleteIngEvent);
		return;
	}*/
	
	if(Number(dataRow1.PRODUCT_CNT) > 0 ){
		//행사상품이 등록된 행사는 삭제가 불가능합니다.
		alert(msgDeleteProductEvent);
		return;
	}
	
	if(confirm(msgDeleteConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/deleteBusinessCampaignMst.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : dataRow1.STR_CODE
				,	'EVT_CODE' : dataRow1.EVT_CODE
				},
		success:function(data){ 
			btnNew();
			btnSearch();
			
			alert(msgDelete);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

function validationCampaignDate(){
	
	var STR_CODE = "";
	
	/*if($("#B_STR_CODE").val() == ""){
		STR_CODE = "00000";
	}else{
		STR_CODE = $("#B_STR_CODE").val();
	}*/
	
	jQuery.ajax({ 
	    url:"/validationCampaignDate.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : STR_CODE		
				},
		success:function(data){
			checkDate = data;
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

function checkValidation(){
	
	var evtStartDate = $("#B_EVT_STR_DT").val().split("-");
	var evtEndDate = $("#B_EVT_END_DT").val().split("-");
	
	//alert(checkDate);
	
	for(var i=0; i < checkDate.length ; i++){
		
		if(checkDate[i].EVT_CODE != $("#B_EVT_CODE").val()){
			
			if(Number(checkDate[i].EVT_STR_DT) <= Number(evtStartDate[0] + evtStartDate[1] + evtStartDate[2]) && Number(checkDate[i].EVT_END_DT) >= Number(evtStartDate[0] + evtStartDate[1] + evtStartDate[2])){
				return false;
			}
			
			if(Number(checkDate[i].EVT_STR_DT) <= Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2]) && Number(checkDate[i].EVT_END_DT) >= Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2])){
				return false;
			}
			
			if(Number(checkDate[i].EVT_STR_DT) >=  Number(evtStartDate[0] + evtStartDate[1] + evtStartDate[2]) && Number(checkDate[i].EVT_END_DT) <= Number(evtEndDate[0] + evtEndDate[1] + evtEndDate[2])){
				return false;
			}
			
			
		}
		
	}
	
	return true;
}

function selectEventCard(EVT_CODE){
	jQuery.ajax({ 
	    url:"/selectEventCard.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'EVT_CODE' : EVT_CODE		
				},
		success:function(data){
			//checkDate = data;
			
			gridApp4.setData(data);
			//INPUT에 뿌리는 형태가 아닌 Grid에 뿌리는 형태로 변경하기 위한 주석처리
			/*
			var P_CARD_LIST = "";
			
			for(var i=0 ; i < data.length ; i++){
				if(dataRow1.EVT_TYPE == "2"){
					if(i == data.length-1){
						P_CARD_LIST = P_CARD_LIST + data[i].CARD_NAME;
						cardList = cardList + data[i].CARD_CODE + ",000000";
					}else{
						P_CARD_LIST = P_CARD_LIST + data[i].CARD_NAME + " / ";
						cardList = cardList + data[i].CARD_CODE + ",000000" + "/";
					}
				}else{
					if(i == data.length-1){
						P_CARD_LIST = P_CARD_LIST + data[i].CARD_NAME + "(" + data[i].MBR_DSNT + ")";
						cardList = cardList + data[i].CARD_CODE + "," + data[i].CARD_PREFIX;
					}else{
						P_CARD_LIST = P_CARD_LIST + data[i].CARD_NAME + "(" + data[i].MBR_DSNT + ")" + " / ";
						cardList = cardList + data[i].CARD_CODE + "," + data[i].CARD_PREFIX + "/";
					}
				}
			}
			
			$("#P_CARD_LIST").val(P_CARD_LIST);
			*/
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

//공통코드 상세 정보 팝업 닫기
function btn_close(){ 
	// btn_search();
	$("#pop_wrap").dialog( "close" );
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
	$(".lft_wid").width(200);
	$(".rgt_wid").width($(window).width()-258);
	
	$(window).on('resize',function  () {
		$(".rgt_wid").width($(window).width()-258);
	});
});