/********************************************************
 * 설명:  영업정보 > POS정산 > 매출부가세 신용카드안분
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.06.07
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "526px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var collection1; // 그리드의 데이터 객체
var src1;
var gridData = [];
var totalCnt = 0;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

//그리드1 레디 핸들러
function gridReadyHandler(id) {
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
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	// 전체 데이타 가져오기
	src1 = collection1.getSource();
	
	// 그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
	
	drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	
}

//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {
	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	getGridData(false);
}

function gridMovePage(page) {
	$("#pageIndex").val(page);
	pageIndex = page;
	getGridData(false);
}


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="60" />\
				<DataGridColumn dataField="CUST_NO" headerText="회원번호" textAlign="center" />\
				<DataGridColumn dataField="ACCT_DEPT" headerText="회계코드" textAlign="center" />\
				<DataGridColumn dataField="CUST_NAME" headerText="거래처명" textAlign="left" width="190" />\
				<DataGridColumn dataField="BUSI_NO" headerText="사업자번호" textAlign="center" labelJsFunction="rMateLabelBusiFunc" />\
				<DataGridColumn dataField="TAX_GB_NM" headerText="세무구분" textAlign="center" />\
				<DataGridColumn dataField="SALE_AMT" headerText="공급가액" textAlign="right" formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="TAX_AMT" headerText="부가세" textAlign="right" formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="SUM_SALE_AMT" headerText="합계액" textAlign="right" formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="SUM_AN_AMT" headerText="신용카드(안분)" textAlign="right" formatter="{numfmt}" sortable="false" />\
	            <DataGridColumn dataField="SUM_CASH_AMT" headerText="현금영수증" textAlign="right" formatter="{numfmt}" sortable="false" />\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SALE_DT"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="TAX_GB"  headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData(isHeadDefault, isPageMove) {
	var param = $("#frm").serializeAllObject();
	
	if(isHeadDefault == true)
	{
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
	}
	
	if($("#P_SALE_DT").val() == null || $("#P_SALE_DT").val() == "")
	{
		alert("매출년월" + msgConfirm);
		$("#P_SALE_DT").focus();
		return;
	}
	
	// 페이지 이동이 아닌 조회 버튼 클릭으로 조회할 경우 페이지 인덱스는 1페이지임
	if(isPageMove) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/posClosedCardList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid1.setEnabled(false);
			gridRoot1.addLoadingBar();
		},
		success:function(data){
			gridData = data.list;
			gridApp1.setData(gridData);
			
			var sumList = JSON.parse(data.list2);
			
			if(sumList && sumList.length > 0) {
				
				totalCnt = sumList[0].TOT_COUNT;
				
				var TOT_SALE_AMT1 = 0;
				var TOT_SALE_AMT2 = 0;
				var TOT_TAX_AMT1 = 0;
				var TOT_TAX_AMT2 = 0;
				var TOT_SUM_SALE_AMT1 = 0;
				var TOT_SUM_SALE_AMT2 = 0;
				var TOT_SUM_AN_AMT1 = 0;
				var TOT_SUM_AN_AMT2 = 0;
				var TOT_SUM_CASH_AMT1 = 0;
				var TOT_SUM_CASH_AMT2 = 0;
				
				$('#TOT_SALE_AMT1').text(0);
				$('#TOT_SALE_AMT2').text(0);
				$('#TOT_TAX_AMT1').text(0);
				$('#TOT_TAX_AMT2').text(0);
				$('#TOT_SUM_SALE_AMT1').text(0);
				$('#TOT_SUM_SALE_AMT2').text(0);
				$('#TOT_SUM_AN_AMT1').text(0);
				$('#TOT_SUM_AN_AMT2').text(0);
				$('#TOT_SUM_CASH_AMT1').text(0);
				$('#TOT_SUM_CASH_AMT2').text(0);
				
				for(var i =0; i<sumList.length; i++) {
					
					// 과세
					if(sumList[i].TAX_GB == '1') {
						TOT_SALE_AMT1 = sumList[i].TOT_SALE_AMT;
						TOT_TAX_AMT1 = sumList[i].TOT_TAX_AMT;
						TOT_SUM_SALE_AMT1 = sumList[i].TOT_SUM_SALE_AMT;
						TOT_SUM_AN_AMT1 = sumList[i].TOT_SUM_AN_AMT;
						TOT_SUM_CASH_AMT1 = sumList[i].TOT_SUM_CASH_AMT;
						
						$('#TOT_SALE_AMT1').text(CommonJs.numberFormat(sumList[i].TOT_SALE_AMT));
						$('#TOT_TAX_AMT1').text(CommonJs.numberFormat(sumList[i].TOT_TAX_AMT));
						$('#TOT_SUM_SALE_AMT1').text(CommonJs.numberFormat(sumList[i].TOT_SUM_SALE_AMT));
						$('#TOT_SUM_AN_AMT1').text(CommonJs.numberFormat(sumList[i].TOT_SUM_AN_AMT));
						$('#TOT_SUM_CASH_AMT1').text(CommonJs.numberFormat(sumList[i].TOT_SUM_CASH_AMT));
					}
					else if(sumList[i].TAX_GB == '2') {
						TOT_SALE_AMT2 = sumList[i].TOT_SALE_AMT;
						TOT_TAX_AMT2 = sumList[i].TOT_TAX_AMT;
						TOT_SUM_SALE_AMT2 = sumList[i].TOT_SUM_SALE_AMT;
						TOT_SUM_AN_AMT2 = sumList[i].TOT_SUM_AN_AMT;
						TOT_SUM_CASH_AMT2 = sumList[i].TOT_SUM_CASH_AMT;
						
						
						$('#TOT_SALE_AMT2').text(CommonJs.numberFormat(sumList[i].TOT_SALE_AMT));
						$('#TOT_TAX_AMT2').text(CommonJs.numberFormat(sumList[i].TOT_TAX_AMT));
						$('#TOT_SUM_SALE_AMT2').text(CommonJs.numberFormat(sumList[i].TOT_SUM_SALE_AMT));
						$('#TOT_SUM_AN_AMT2').text(CommonJs.numberFormat(sumList[i].TOT_SUM_AN_AMT));
						$('#TOT_SUM_CASH_AMT2').text(CommonJs.numberFormat(sumList[i].TOT_SUM_CASH_AMT));
					}
					
				}

				$('#SUM1').text(CommonJs.numberFormat(TOT_SALE_AMT1 * 1 + TOT_SALE_AMT2 * 1));
				$('#SUM2').text(CommonJs.numberFormat(TOT_TAX_AMT1 * 1 + TOT_TAX_AMT2 * 1));
				$('#SUM3').text(CommonJs.numberFormat(TOT_SUM_SALE_AMT1 * 1 + TOT_SUM_SALE_AMT2 * 1));
				$('#SUM4').text(CommonJs.numberFormat(TOT_SUM_AN_AMT1 * 1 + TOT_SUM_AN_AMT2 * 1));
				$('#SUM5').text(CommonJs.numberFormat(TOT_SUM_CASH_AMT1 * 1 + TOT_SUM_CASH_AMT2 * 1));

//				$('#TOT_SALE_AMT1').text(CommonJs.numberFormat(sumList[0].TOT_SALE_AMT));
//				$('#TOT_SALE_AMT2').text(CommonJs.numberFormat(sumList[1].TOT_SALE_AMT));
//				$('#SUM1').text(CommonJs.numberFormat(sumList[0].TOT_SALE_AMT * 1 + sumList[1].TOT_SALE_AMT * 1));
//				
//				$('#TOT_TAX_AMT1').text(CommonJs.numberFormat(sumList[0].TOT_TAX_AMT));
//				$('#TOT_TAX_AMT2').text(CommonJs.numberFormat(sumList[1].TOT_TAX_AMT));
//				$('#SUM2').text(CommonJs.numberFormat(sumList[0].TOT_TAX_AMT * 1 + sumList[1].TOT_TAX_AMT * 1));
//				
//				$('#TOT_SUM_SALE_AMT1').text(CommonJs.numberFormat(sumList[0].TOT_SUM_SALE_AMT));
//				$('#TOT_SUM_SALE_AMT2').text(CommonJs.numberFormat(sumList[1].TOT_SUM_SALE_AMT));
//				$('#SUM3').text(CommonJs.numberFormat(sumList[0].TOT_SUM_SALE_AMT * 1 + sumList[1].TOT_SUM_SALE_AMT * 1));
//				
//				$('#TOT_SUM_AN_AMT1').text(CommonJs.numberFormat(sumList[0].TOT_SUM_AN_AMT));
//				$('#TOT_SUM_AN_AMT2').text(CommonJs.numberFormat(sumList[1].TOT_SUM_AN_AMT));
//				$('#SUM4').text(CommonJs.numberFormat(sumList[0].TOT_SUM_AN_AMT * 1 + sumList[1].TOT_SUM_AN_AMT * 1));
//				
//				$('#TOT_SUM_CASH_AMT1').text(CommonJs.numberFormat(sumList[0].TOT_SUM_CASH_AMT));
//				$('#TOT_SUM_CASH_AMT2').text(CommonJs.numberFormat(sumList[1].TOT_SUM_CASH_AMT));
//				$('#SUM5').text(CommonJs.numberFormat(sumList[0].TOT_SUM_CASH_AMT * 1 + sumList[1].TOT_SUM_CASH_AMT * 1));
			}
			
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
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

//(회원검색) 팝업 호출 function
function btn_comm_user_search(type)
{
	$("#comm_pop_wrap1").dialog("open");
	gridApp10.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM1").val("fn_comm_user_callback_"+type+"(dataRow10)");
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUST_NAME").val());
		btn_comm_search('1');
	}
}

//회원검색 팝업 callback function
function fn_comm_user_callback_S(dataRow)
{
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("회원정보 조회 실패");
		return;
	}
	
	$("#P_CUST_NAME").val(dataRow.CUST_NAME);	// 회원명
	$("#P_CUST_NO").val(dataRow.CUST_NO);		// 회원번호
}

// 엑셀다운로드
function excelExport()
{
	var frm = document.frm;
	frm.action = "/posClosedCardListExcel.do";
	frm.method = "post";
   	frm.submit();
}

$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	
	//달력설정
	/*$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_SALE_DT").val(date);*/
	
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	$("#P_SALE_DT").val(nowDateYm);
	datePickerYearMonth();
	
	$("#P_CUST_NAME").keydown(function(key) {
		
		if(key.keyCode == 13){
			btn_comm_user_search('S');
		}
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData(true, true);
	});
	
	// 엑셀 다운
	$("#btn_excel_down").click(function() {
		excelExport();
	});
	
	
	$('#P_CUST_NAME').keyup(function() {
		if($(this).val().replace(/(\s*)/g, "").length <= 0) {
			$('#P_CUST_NO').val('');
		}
	});
});

