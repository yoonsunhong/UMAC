/********************************************************
 * 설명:  현금영수증적립내역
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.01.10
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
//var gridApp2, gridRoot2, dataGrid2, dataRow2;

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

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

var gridData1ClickStrCode = "";
var totalCnt;	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호

var selectorColumn1 = "";

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
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	dataGrid1.addEventListener("headerRelease", headerRelease1);
	selectorColumn1 = gridRoot1.getObjectById("selector");
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){	
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713"/>\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="8" />\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
			<DataGrid id="dg1" sortableColumns="true">\
				<columns>\
					<DataGridColumn dataField="STR_NAME" headerText="'+storNm+'" width="90" textAlign="center"/>\
					<DataGridColumn dataField="SALE_DT"   headerText="'+selngDate+'"    	textAlign="center"				formatter="{datefmt}"/>\
					<DataGridColumn dataField="POS_NO" 	 headerText="POS"  	textAlign="center" width="90"/>\
					<DataGridColumn dataField="TRXN_NO" 	 headerText="'+dealingsNumber+'"  	textAlign="center" width="90"/>\
					<DataGridColumn dataField="CASH_TRXN_NO_OLD" 	 headerText="'+originalDealingsNumber+'"  	textAlign="center" width="200"/>\
					<DataGridColumn dataField="CANC_FLAG" 	 headerText="'+sellingSection+'"  	textAlign="center" width="90" />\
					<DataGridColumn dataField="CASH_COMP_NO" 	 headerText="확인번호"  	textAlign="center" />\
					<DataGridColumn dataField="CASH_APP_NO" 	 headerText="'+certificationNumber+'"  	textAlign="center" />\
					<DataGridColumn dataField="CASH_AMOUNT" 	 headerText="'+publicationAmount+'"  	textAlign="right" 	formatter="{numfmt}"/>\
					<DataGridColumn dataField="CUST_NO" 	 headerText="'+customerNumber+'"  	textAlign="center" />\
					<DataGridColumn dataField="CUST_NAME" 	 headerText="'+customerNm+'" 	textAlign="center" />\
				</columns>\
				<dataProvider>\
					<SpanSummaryCollection source="{$gridData}">\
						<summaries>\
							<SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="STR_NAME" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
								<SpanSummaryField dataField="CASH_AMOUNT" summaryOperation="SUM" />\
							</SpanSummaryRow>\
						</summaries>\
					</SpanSummaryCollection>\
				</dataProvider>\
			</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData(isFirstPage) {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return;
	}
	
	if(isFirstPage) {
		$("#pageIndex").val(1);
		pageIndex = 1;
	}
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/salesAnalReportCashList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
			
			dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();			
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
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	  
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUST_NAME").val());
		btn_comm_search('1');
	}
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow){
	$('#P_CUST_NAME' ).val(dataRow.CUST_NAME);		// 회원명
	//$('#CUS_NAME_TEXT' ).text(dataRow.CUST_NAME);	// 회원명
}

function gridMovePage(page) {
	$("#pageIndex").val(page);
	pageIndex = page;
	getGridData();
}

//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	getGridData();
}

function excelExport(){
	var P_STR_CODE 		= $.trim($('#P_STR_CODE').val()); 
	var P_OPEN_DT 		= $.trim($('#P_OPEN_DT').val());
	var P_END_DT 		= $.trim($('#P_END_DT').val());
	var P_CUST_NAME 	= $.trim($('#P_CUST_NAME').val());
	var P_STR_DT_ARR	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return;
	}
	
	//엑셀호출
	$.download('/salesAnalReportCashListExcelDownload.do',"P_STR_CODE="+P_STR_CODE
														+"&P_OPEN_DT="+P_OPEN_DT
														+"&P_END_DT="+P_END_DT
														+"&P_CUST_NAME="+P_CUST_NAME
			,"post");
};

//엑셀다운을 위한 폼 생성 함수
jQuery.download = function(url, data, method){
  // url과 data를 입력받음
  if( url && data ){ 
      // data 는  string 또는 array/object 를 파라미터로 받는다.
      data = typeof data == 'string' ? data : jQuery.param(data);
      // 파라미터를 form의  input으로 만든다.
      var inputs = '';
      jQuery.each(data.split('&'), function(){ 
          var pair = this.split('=');
          inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
      });
      // request를 보낸다.
      jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
      .appendTo('body').submit().remove();
  };
};



$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#P_STR_CODE").val($("#SESSION_STR_CODE").val());
	//$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
				$("#P_OPEN_DT").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
		});
	 
	$(".datepicker2").datepicker({ onSelect: function(dateText) 
	 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
			$("#P_END_DT").val(CUR_DT);
				return;
			}	 
	 }, 	 showMonthAfterYear:true 
	});	
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 130 );
	
	$(window).on('resize',function (){			
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 130 );		
	});	
	
	//조회
	$("#btn_search").click(function(){
		getGridData(true);
		//상품 분류별 목표 내용 삭제 
		//gridApp2.setData(null);
		//gridData1ClickStrCode = "";
	});	

	$("#btn_excel_down").click(function(){
		excelExport();
	});	
	
	$("#P_CUST_NAME").keydown(function(key) {		
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
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
			var sessionGroupCode = data[0].GROUP_CODE;
			if(sessionGroupCode == "ROLE001" || sessionGroupCode == "ROLE025" || sessionGroupCode == "ROLE026" || sessionGroupCode == "ROLE002"){
				$("#P_STR_CODE").attr("disabled", false);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
});



