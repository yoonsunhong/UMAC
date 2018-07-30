/********************************************************
 * 설명:  외상매출미수채권
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.01.02
 * version : 1.0
 ********************************************************/



$(document).ready(function(){
	$(".datepicker").datepicker();
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	
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
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%", "700px");
//rMateGridH5.create("grid2", "gridHolder2", jsVars);

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

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
			
			$('#P_MNUL_POINT' ).val(dataRow1.MNUL_POINT);
			$('#P_MNUL_REASON' ).val(dataRow1.MNUL_REASON);
			$('#P_REMARK' ).val(dataRow1.REMARK);
		};
		
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			dataGrid1.addEventListener("itemClick", itemClickHandler);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	}  
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;

//----------------------- 그리드 설정 끝 -----------------------
var layoutStr1;
//그리드1 헤더 설정

layoutStr1 =
'<rMateGrid>\
	<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1">\
		<columns>\
			<DataGridColumn dataField="APP_DT"  	headerText="점포명"  	textAlign="center" 	formatter="{datefmt}"/>\
			<DataGridColumn dataField="STR_NAME" 	headerText="회원번호" 			textAlign="center" 	/>\
			<DataGridColumn dataField="MNUL_POINT"  headerText="회원명" 			textAlign="center" 	formatter="{numfmt}"/>\
			<DataGridColumn dataField="MNUL_REASON"	headerText="전일이월" 	textAlign="center" 	/>\
			<DataGridColumn dataField="REMARK"   	headerText="발생금액" 	textAlign="center" 	/>\
			<DataGridColumn dataField="IDATE"  		headerText="입금금액" 		textAlign="center"  formatter="{datefmt}"/>\
			<DataGridColumn dataField="IEMP_NO"		headerText="미수잔액" 		textAlign="center" 	/>\
			<DataGridColumn dataField="IEMP_NO"		headerText="총미수잔액" 		textAlign="center" 	/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';
//그리드1 데이터 초기화
var gridData = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
 
//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	  $('#comm_pop_wrap1' ).dialog( 'open' );
	  gridApp10.resize();
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback(CUS_NAME, CUST_NO, MOBIL_NO, ADDR, CORP_CODE, BUSI_NAME, SEX, BIR_DATE, BUSI_NO, MBR_GRADE, BUSI_FLAG, TEL_NO, MBR_GRADE_NAME, BUSI_FLAG_NAME){
	$('#P_CUS_NAME' ).val(CUS_NAME);		// 회원명
	$('#CUS_NAME_TEXT' ).text(CUS_NAME);	// 회원명
	$('#P_CUST_NO' ).val(CUST_NO);			// 회원번호
	$('#MOBIL_NO' ).text(MOBIL_NO);			// 휴대전화
	$('#ADDR' ).text(ADDR);					// 주소
	$('#P_CORP_CODE' ).val(CORP_CODE);		// 기업코드
	$('#BUSI_NAME' ).text(BUSI_NAME);		// 상호명
	$('#SEX' ).text(SEX);					// 성별
	$('#BIR_DATE' ).text(BIR_DATE);			// 생년월일
	$('#BUSI_NO' ).text(BUSI_NO);			// 사업자번호
	$('#MBR_GRADE' ).text(MBR_GRADE_NAME);	// 회원등급
	$('#BUSI_FLAG' ).text(BUSI_FLAG_NAME);	// 회원그룹
	$('#TEL_NO' ).text(TEL_NO);				// 전화번호
	$('#SEARCH_YN' ).val("Y");				// 전화번호
}

function fnSearch(){
	if($('#SEARCH_YN' ).val() != "Y"){
		alert(msgMemberSearch);
		return;
	}
	var loadData = $("#top_search").serializeAllObject(); 
 
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/memberPointOptionList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){  
			gridApp1.setData(data.list);
			resultList = data.result;
			
			$('#SAL_AMT' ).text(moneyComma(String(resultList[0].SAL_AMT)));
			$('#MINUS_POINT' ).text(moneyComma(String(resultList[0].MINUS_POINT)));
			$('#SAL_UPOINT' ).text(moneyComma(String(resultList[0].SAL_UPOINT)));
			
	    },
	    complete : function(data) {
	    	dataGrid1.setEnabled(true);
	       	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

function fnUpdate(){
	if(!confirm(msgSaveConfirm)) return;
	
	if($.trim($("#P_MNUL_POINT").val() ) == null || $.trim($("#P_MNUL_POINT").val() ) == "")
	{
		alert(point + msgConfirm);
		$("#P_MNUL_POINT").focus();
		return;
	}
	
	var loadData = $("#reg_form").serializeAllObject(); 
 
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/memberPointOptionInsert.do",         
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
					$('#P_MNUL_POINT' ).val("");
					$('#P_REMARK' ).val("");
					alert(msgSave);
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

function init() {
	// SELECT BOX 바인딩
	getCommonCodeSelectBoxList("P_MNUL_REASON",   "MNUL_POINT");    //	포인트임의등록사유
	fnSelectBoxList();
	var nowDate = new CommDateManager().getDate("yyyy-mm-dd");
	var firstDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	
	$("#P_SEARCH_END_DT").val(nowDate);
	$("#P_SEARCH_START_DT").val(firstDate);
	$("#P_APP_DT").val(nowDate);
}

function fnSelectBoxList(){
	
	// 점포명을 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getStrNameSelectBoxList.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    success : function(data) {
	    	var list = data.list;
			for(var i = 0; i < list.length; i++){
				 $("#P_STR_CODE").append('<option value="'+ list[i].STR_CODE +'">'+ list[i].STR_NAME +'</option>'); 
		   	}
			$("#P_STR_CODE").val($("#STR_CODE").val());
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

 
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################