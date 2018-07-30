/********************************************************
 * 설명:  포인트임의관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2016.12.23
 * version : 1.0
 ********************************************************/



$(document).ready(function(){
	//$(".datepicker1").datepicker();
	//$(".datepicker2").datepicker();
	
	//$('#P_MNUL_POINT').number( true, 0 );
	
	init();
	
	$("#P_CUS_NAME").on('keydown', function(e){
		$("#top_search input[name=P_CUST_NO]").val("");
		if(e.keyCode == "13"){
			btn_comm_user_search();
		}
	});
	
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
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%", "500px");
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
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="2" />\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="APP_DT"  	headerText="' + occurDate + '"  	textAlign="center" 	width="130"	labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="STR_NAME" 	headerText="' + store + '" 			textAlign="center" 	width="130" />\
			<DataGridColumn dataField="MNUL_POINT"  headerText="' + point + '" 			textAlign="right" 	width="130" formatter="{numfmt}"/>\
			<DataGridColumn dataField="MNUL_REASON"	headerText="' + reasonGubun + '" 	textAlign="center" 	width="200" />\
			<DataGridColumn dataField="REMARK"   	headerText="' + detailMemo + '" 	textAlign="left" 	/>\
			<DataGridColumn dataField="IDATE"  		headerText="' + inputDate + '" 		textAlign="center"  width="130" />\
			<DataGridColumn dataField="IEMP_NO"		headerText="' + inputName + '" 		textAlign="center" 	width="130" />\
		</columns>\
		<dataProvider>\
			<SpanSummaryCollection source="{$gridData}">\
				<summaries>\
			        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="APP_DT" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
			            <SpanSummaryField dataField="MNUL_POINT" summaryOperation="SUM" />\
			        </SpanSummaryRow>\
			    </summaries>\
		    </SpanSummaryCollection>\
	    </dataProvider>\
	</DataGrid>\
</rMateGrid>';
//그리드1 데이터 초기화
var gridData = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################


//그리드 row의 값을 변경하여 보여주기
function labelFunc(item, value, column){
  var str = item["APP_DT"];
  if(str != sm){
	  var str1 = str.substring(0,4);
	  var str2 = str.substring(4,6);
	  var str3 = str.substring(6);
	  return str1 + "-" + str2 + "-" + str3;
  }else{
	  return str;
  }
}

//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
//	$('#comm_pop_wrap1' ).dialog( 'open' );
//	gridApp10.resize();
//	  
//	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
//	if($("#P_CUS_NAME").val() != null && $("#P_CUS_NAME").val() != ""){
//		$("#P_TEXT1").val($("#P_CUS_NAME").val());
//		btn_comm_search('1');
//	}
	
	$("#comm_pop_wrap20").dialog("open");
	gridApp29.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM20").val("fn_comm_user_callback(dataRow29)");
	
	if($("#P_CUS_NAME").val()) {
		
		$("#P_TEXT20").val($("#P_CUS_NAME").val());
		btn_comm_search('20');
		
	}

	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
//	if($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != ""){
//		$("#P_TEXT20").val($("#S_CUST_NAME").val());
//		btn_comm_search('20');
//	}
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow){
	var telNo = CommonJs.phoneFomatter(dataRow.TEL_NO);
	var MOBILE = CommonJs.phoneFomatter(dataRow.MOBIL_NO);
	var birDate = CommonJs.dateFormat(dataRow.BIR_DATE, "-");
	
	$('#P_CUS_NAME' ).val(dataRow.CUST_NAME);		// 회원명
	$('#CUS_NAME_TEXT' ).text(dataRow.CUST_NAME);	// 회원명
	$('#P_CUST_NO' ).val(dataRow.CUST_NO);			// 회원번호
	$('#MOBIL_NO' ).text(MOBILE);			// 휴대전화
	$('#ADDR' ).text(dataRow.ADDR);					// 주소
	$('#P_CORP_CODE' ).val(dataRow.CORP_CODE);		// 기업코드
	$('#BUSI_NAME' ).text(dataRow.BUSI_NAME);		// 상호명
	$('#SEX' ).text(dataRow.SEX_NAME);				// 성별
	$('#BIR_DATE' ).text(birDate);			// 생년월일
	$('#BUSI_NO' ).text(dataRow.BUSI_NO);			// 사업자번호
	$('#MBR_GRADE' ).text(dataRow.MBR_GRADE_NAME);	// 회원등급
	$('#BUSI_FLAG' ).text(dataRow.BUSI_FLAG_NAME);	// 회원그룹
	$('#TEL_NO' ).text(telNo);				// 전화번호
	$('#SEARCH_YN' ).val("Y");				// 전화번호
	
	// 포인트 조회 내역 쵸기화
	$('#SAL_AMT' ).text('');
	$('#MINUS_POINT').text('');
	$('#SAL_UPOINT').text('');
	$('#P_MNUL_REASON option:eq(0)').attr('selected', 'selected');
	$('#P_MNUL_POINT').val('');
	$('#P_REMARK').val('');
	gridApp1.setData(null);
}

function fnSearch(){
	var loadData 		= $("#top_search").serializeAllObject(); 
	var P_STR_DT_ARR	= $("#P_SEARCH_START_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_SEARCH_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;

	
	//유효성검사
	if($('#SEARCH_YN' ).val() != "Y"){
		alert(msgMemberSearch);
		return;
	}
	
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SEARCH_START_DT").focus();
		return;
	}
 
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
			
			if(resultList.length > 0){
				$('#SAL_AMT' ).text(moneyComma(String(resultList[0].SAL_AMT)));
				$('#MINUS_POINT' ).text(moneyComma(String(resultList[0].MINUS_POINT)));
				$('#SAL_UPOINT' ).text(moneyComma(String(resultList[0].SAL_UPOINT)));
			}else{
				$('#SAL_AMT' ).text("0");
				$('#MINUS_POINT' ).text("0");
				$('#SAL_UPOINT' ).text("0");
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

function fnUpdate(){
	if($('#SEARCH_YN' ).val() != "Y"){
		alert(msgMemberSearch);
		return;
	}
	if($.trim($("#P_MNUL_POINT").val() ) == null || $.trim($("#P_MNUL_POINT").val() ) == "" || $.trim($("#P_MNUL_POINT").val() ) == "0")
	{
		alert(point + msgConfirm);
		$("#P_MNUL_POINT").focus();
		return;
	}
	
	if(!confirm(msgSaveConfirm)) return;
	
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
	var nowDate = new CommDateManager().getDate("yyyy-mm-dd");
	var firstDate = new CommDateManager().getDate("yyyy-mm") + "-01";
	
	$("#P_SEARCH_END_DT").val(nowDate);
	$("#P_SEARCH_START_DT").val(firstDate);
	$("#P_APP_DT").val(nowDate);
	
	// 달력체크
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var gongDt = parseInt($("#P_SEARCH_START_DT").val().replace(/-/g, ""));
			var endDt = parseInt($("#P_SEARCH_END_DT").val().replace(/-/g, ""));
			if(gongDt > endDt)
			{
				alert(msgStartDateAndEndDate);
				
				if(this.id == "P_SEARCH_START_DT")
					$("#P_SEARCH_START_DT").val(firstDate);
				else if(this.id == "P_SEARCH_END_DT")
					$("#P_SEARCH_END_DT").val(nowDate);
				
				return;
			}
		},showMonthAfterYear:true
	});
	
	getStoreCode("P_STR_CODE");
	
	if( $("#SESSION_ROLE_ID").val()    == "ROLE009")  // 바이어 로그인시 다보여줌
	{ 
	} else {         // 점포 로그인시 해당 점포만 보여줌, 조회조건의 점포코드도 마찬가지
		$("#P_STR_CODE  option[value!='"+$("#SESSION_STR_CODE").val()+"']").remove(); 
	}
	
	// $("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
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

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	var w = $(".mem_tbl").width() / 5;
	$(".mem_tbl .f_l, .mem_tbl .f_l .tbl_st2").width( w*3 );
	$(".mem_tbl .f_r, .mem_tbl .f_r .tbl_st2").width( w*2 - 10 );
	$(".mem_tbl .f_l .tbl_st2 th").width("18%");
	$(window).on('resize',function (){	
		var w = $(".mem_tbl").width() / 5;
		$(".mem_tbl .f_l, .mem_tbl .f_l .tbl_st2").width( w*3 );
		$(".mem_tbl .f_r, .mem_tbl .f_r .tbl_st2").width( w*2 - 10 );
		$(".mem_tbl .f_l .tbl_st2 th").width("18%");
	});
	
	// 회원이름 입력 텍스트 박스 값이 없을 경우 회원번호 히든값 제거
	$('#P_CUS_NAME').keyup(function() {
		
		if($(this).val().replace(/\s/gi, "").length <= 0) {
			
			$('#' + $(this).data('for')).val('');
			$('#SEARCH_YN' ).val('N');
			
		}
		
	});
});
 
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################