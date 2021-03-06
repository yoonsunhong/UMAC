/********************************************************
*   설명:  긴급매가변경
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-04-27    문희훈       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/
var saveFlag ="I";

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1,	rowIndex1;

var gridData1 =[];

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp1.setData(gridData1);

	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	
 
   /* var layoutCompleteHandler = function(event) {
        dataGrid1 = gridRoot1.getDataGrid();    // 그리드 객체
        dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
    };
    gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler);*/
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
}


//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	saveFlag ="U";
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	
	$("#ADD_STR_CODE").val(dataRow1.STR_CODE);
	$("#ADD_STR_NAME").val(dataRow1.STR_NAME);
	$("#ADD_ITM_CODE").val(dataRow1.ITM_CODE);
	$("#ADD_SCAN_CODE").val(dataRow1.SCAN_CODE);
	$("#ADD_ITM_NAME").val(dataRow1.ITM_NAME);
	$("#ADD_TAX_GB").val(dataRow1.TAX_GB);
	$("#ADD_CLS_NAME").val(dataRow1.UNIT.trim());
	$("#ADD_VEN_NAME").val(dataRow1.VEN_NAME.trim());
	$("#ADD_SPRC").val(dataRow1.SPRC);
	$("#ADD_CHG_SPRC").val(dataRow1.CHG_SPRC);
	
	//지태수이사님 요청으로 수정 제거 후 원가 이익률 추가 KYW
	$("#ADD_WPRC").val(dataRow1.WPRC.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	
	var pWPRC = Number(dataRow1.WPRC);
	var pCHG_SPRC = Number(dataRow1.CHG_SPRC);
	var pBENEFIT =(pCHG_SPRC-pWPRC)/pCHG_SPRC*100;
	
	$("#ADD_BENEFIT").val(pBENEFIT.toFixed(2));
	$("#ADD_IEMP_NM").val(dataRow1.IEMP_NM);
	$("#ADD_IDATE").val(dataRow1.IDATE);
	//$("#ADD_UEMP_NM").val(dataRow1.UEMP_NM);
	//$("#ADD_UDATE").val(dataRow1.UDATE);
}

//----------------------- 그리드 설정 끝 -----------------------


//<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="40" /> 넘버링을 하면 병합오류 발생
//그리드1 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle"  showDataTips="true" >\
			<groupedColumns>\
				<DataGridColumn id="colNo" dataField="No" itemRenderer="IndexNoItem" textAlign="center" width="40" />\
				<DataGridColumn id="STR_NAME" dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" width="100"  />\
				<DataGridColumn id="IDATE" dataField="IDATE" headerText="'+iDateTime+'" textAlign="center" width="170" />\
				<DataGridColumn id="UDATE" dataField="UDATE" headerText="'+modifiedDate+'" textAlign="center" width="170" />\
				<DataGridColumn id="SCAN_CODE" dataField="SCAN_CODE" headerText="'+scanningCode+'" textAlign="center" width="140" />\
				<DataGridColumn id="ITM_CODE" dataField="ITM_CODE" headerText="상품코드" textAlign="center"  visible="false"/>\
				<DataGridColumn id="ITM_NAME" dataField="ITM_NAME"  headerText="'+itmName+'" textAlign="lefr" width="150"/>\
				<DataGridColumn id="TAX_GB" dataField="TAX_GB"  headerText="'+se+'" textAlign="center" width="80" />\
				<DataGridColumn id="UNIT" dataField="UNIT"  headerText="'+standard+'" textAlign="center" width="80" />\
				<DataGridColumn id="SPRC" dataField="SPRC"  headerText="'+sprc+'" textAlign="right" width="120" formatter="{numfmt}" />\
				<DataGridColumn id="CHG_SPRC" dataField="CHG_SPRC"  headerText="'+changeSalePrice+'"   textAlign="right" formatter="{numfmt}"  width="120" />\
				<DataGridColumn id="VEN_NM" dataField="VEN_NM" headerText="협력업체명" visible="false" />\
				<DataGridColumn id="IEMP_NM" dataField="IEMP_NM" headerText="등록자" visible="false" />\
				<DataGridColumn id="UEMP_NM" dataField="UEMP_NM" headerText="수정자" visible="false" />\
				<DataGridColumn id="WPRC" dataField="WPRC" headerText="WPRC" visible="false" />\
			</groupedColumns>\
			<dataProvider>\
				<!-- 그리드의 자료를 일반 dataProvider가 아닌 별도의 컴포넌트에 입력해야 할 경우 아래와 같이 source에 $gridData를 넣어줍니다 -->\
				<SpanArrayCollection source="{$gridData}"/>\
			</dataProvider>\
	</DataGrid>\
</rMateGrid>';

// ----------------------- 그리드 설정 끝 -------------------------------------


//########################################################
//###	8. init ( 시작 )   							   												###
//########################################################

$(document).ready(function(){
	
	init();
	
	/**검색조건 날짜 체크*/
	 $(".datepicker1").datepicker({ onSelect: function(dateText){ 	 	 
			 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			 if($("#P_SPRC_SDT").val()  >  $("#P_SPRC_EDT").val()){   
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_SPRC_SDT").val(CUR_DT);
				return;
			}	 
	 	}, 	
	 	showMonthAfterYear:true 
	});
		 
	$(".datepicker2").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if($("#P_SPRC_SDT").val()  >  $("#P_SPRC_EDT").val()){
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_SPRC_EDT").val(CUR_DT);
				return;
			}	 
	 	}, 	
	 	showMonthAfterYear:true 
	});
	
	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().before(0, 0,1).getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)

	$("#P_SPRC_SDT").val(lsToDate);
	$("#P_SPRC_EDT").val(lsToDate);
	
	
	//점포명 가지고오기
	getStoreCode("P_STR_NAME");
	//숫자만 입력
	/** 
	 * input 숫자와 콤마만 입력되게 하기. 
	 * 매우중요 : jquery.number.js 파일 인크루드하기
	 * include js : jquery.number.js
	 * input 속성에 numberOnly 추가
	 * jsp : <input type="text" id="amount" name="amount" numberOnly placeholder="0" />
	 * $(this).number(true);
	 * $.number( 5020.2364 );				// Outputs 5,020
	 * $.number( 5020.2364, 2 );			// Outputs: 5,020.24
	 * $.number( 135.8729, 3, ',' );		// Outputs: 135,873
	 * $.number( 5020.2364, 1, ',', ' ' );	// Outputs: 5 020,2 
	 */
	$('#ADD_SPRC').number( true);
	$('#ADD_WPRC').number( true);
	$('#ADD_CHG_SPRC').number( true);
	$("#ADD_CHG_SPRC").on('blur', function(){
		
		if($("#ADD_WPRC").val() != "" && $("#ADD_WPRC").val() != undefined && $("#ADD_WPRC").val() != null &&
				$("#ADD_CHG_SPRC").val() != "0" && $("#ADD_CHG_SPRC").val() != ""){
			var pWPRC = Number($("#ADD_WPRC").val().replace(/,/g, ''));
			var pCHG_SPRC = Number($("#ADD_CHG_SPRC").val().replace(/,/g, ''));
			var pBENEFIT = (pCHG_SPRC-pWPRC)/pCHG_SPRC*100;
			$("#ADD_BENEFIT").val(pBENEFIT.toFixed(2));
		}
	});
	
	
	//조회조건절의 상품에서 엔터시 상품검색되게....
	$("input[name=P_ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_product_search();
        } 
	});
	$("input[name=ADD_ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_add_product_search();
        } 
	});
	
});

//점포명 변경 EVENT
function fnStrChange(){
	
	//그리드1 데이터 초기화 , 저장플래그 I 
	 gridRoot1.removeAll( );
	 clearData();
	 saveFlag ="I";
	 
	$("#P_STR_CODE").val($("#P_STR_NAME").val());
	
	$("#ADD_STR_CODE").val($("#P_STR_NAME").val());
	$("#ADD_STR_NAME").val($("#P_STR_NAME option:selected").text());
	
	
	
}


function init() {
	
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	 
	$('#comm_pop_wrap6_6' ).dialog( 'open' );
	$("#P_TEXT6_6").val("");
	gridApp15_6.setData([]);
	gridApp15_6.resize();
	fnGetStrName();
	$("#P_CALLBACK_NM6_6").val('fn_comm_store_callback(dataRow15_6)');
	$("#P_SELECTED_STR_CODE").val(  $("#P_STR_NAME").val()  );    // $("#P_STR_CODE").val() 는 부모창의 코드값
	if($("#P_ITM_NAME").val() != null && $("#P_ITM_NAME").val() != ""){
		$("#P_TEXT6_6").val($("#P_ITM_NAME").val());
		btn_comm_search6_6(); 
	}else{
		//검색된 데이터가 없으면 검색조건에 포커스 이동
		fnDelay();
	}
} 

//(상품검색) 팝업 호출 function
function btn_add_product_search(){
	
	$('#comm_pop_wrap6_6' ).dialog( 'open' );
	$("#P_TEXT6_6").val("");
	gridApp15_6.setData([]);
	gridApp15_6.resize();
	fnGetStrName();	
	$("#P_CALLBACK_NM6_6").val('fn_add_product_callback(dataRow15_6)');	
	$("#P_SELECTED_STR_CODE").val(  $("#P_STR_NAME").val()  );    // $("#P_STR_CODE").val() 는 부모창의 코드값
	if($("#ADD_ITM_NAME").val() != null && $("#ADD_ITM_NAME").val() != ""){
		$("#P_TEXT6_6").val($("#ADD_ITM_NAME").val());
		btn_comm_search6_6(); 		
	}else{
		//검색된 데이터가 없으면 검색조건에 포커스 이동
		fnDelay();
	}
	
} 

var fnVal="";
function fnDelay() {
	fnVal = setTimeout(focusGo, 300);
}

function focusGo(){
	//alert(111);
	$("#P_TEXT6").focus();
}

//(점별상품검색) 팝업 callback function
function fn_comm_store_callback( dataRow15 ){
	$('#P_ITM_NAME' ).val(dataRow15.ITM_NAME);				// 상품명
	$('#P_ITM_CODE' ).val(dataRow15.ITM_CODE);				// 상품코드
}

//(점별상품검색) 팝업 callback function
function fn_add_product_callback( dataRow15 ){
	
	saveFlag ="I";
	
	$('#ADD_ITM_NAME' ).val(dataRow15.ITM_NAME);				// 상품명
	$('#ADD_ITM_CODE' ).val(dataRow15.ITM_CODE);				// 상품코드
	$('#ADD_SCAN_CODE' ).val(dataRow15.SCAN_CODE);			// 스캔코드
	
	//팝업닫기
	$("#comm_pop_wrap6").dialog( "close" );
	$('#ADD_CHG_SPRC' ).val('');				
	$("#ADD_CHG_SPRC").focus();
	
	var loadData = $("#in_frame").serializeAllObject();
	
	//긴급매가변경등록 체크(동일날짜, 동일점, 동일상품이 2건 등록 안되게)
	jQuery.ajax({
	    type:"POST",
	    url:"/checkChangePriceInfo.do",
	    dataType:"JSON",  
	    data:loadData,
	    async:false,
	    success : function(data) {
	    	//alert(data[0].CNT);
	    	if(data[0].CNT != 0){
	    		//동일한 상품을 적용기간내에 등록할수 없습니다.
	    		alert(promMessg16);
	    		clearData();
	    		$("#ADD_ITM_NAME").focus();
	    		return;
	    	}else{
	    		$("#ADD_TAX_GB").val(dataRow15.TAX_GB);
	    		$("#ADD_CLS_NAME").val(dataRow15.CLS_NAME);
	    		$("#ADD_VEN_NAME").val(dataRow15.VEN_NAME);
	    		$("#ADD_SPRC").val(dataRow15.SPRC);
	    		$("#ADD_CHG_SPRC").val('');
	    		$("#ADD_IEMP_NM").val('');
	    		$("#ADD_IDATE").val('');
	    		$("#ADD_UEMP_NM").val('');
	    		$("#ADD_UDATE").val('');
	    		$("#ADD_WPRC").val(dataRow15.WPRC);
	    		
	    		
	    	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


 
//########################################################
//###   상단 버튼 구현																				###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-220);

	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-220);	
	});
});



//저장
function btn_save(){
	//긴급매가변경등록/수정
	var loadData = $("#in_frame").serializeAllObject();
	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyymmdd"); 
	
	//신규등록
	if(saveFlag == 'I'){
		//수정
		if(loadData.ADD_SCAN_CODE == ""){
			//조회된 상품이 없습니다. 스캐닝코드를 확인하세요.
			alert(stockRealMent28);
			$("#ADD_ITM_NAME").focus();
			return;
		}
	}else{
		loadData.ADD_SPRC_DT = CUR_DT;
		
		//수정
		if(loadData.ADD_IDATE.substring(0,10).replace(/-/gi, '')  !=  CUR_DT){
			//당일등록한 상품만 수정 가능합니다.
			alert(emergencySalesMent1);
			return;
		}
	}
	
	if(loadData.ADD_CHG_SPRC == "" || loadData.ADD_CHG_SPRC == 0){
		//변경매가는 필수입력 입니다.
		alert(emergencySalesMent2);
		$("#ADD_CHG_SPRC").focus();
		return;
	}
	if(isNaN(Number(loadData.ADD_CHG_SPRC ))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			$("#ADD_CHG_SPRC").val('');
			$("#ADD_CHG_SPRC").focus();
			return;
	}
	
	var msgConfirm = "";
	var cuMent = "";
	var callUrl = "";
	
	if(saveFlag == "I"){
		//신규
		msgConfirm = msgSaveConfirm; //저장 하시겠습니까?
		cuMent = msgSave; //저장되었습니다.
		callUrl = '/insertChangePriceInfo.do';
	}else if(saveFlag == "U"){
		//수정
		msgConfirm = msgModifyConfirm; //수정 하시겠습니까?
		cuMent = msgModify; //수정되었습니다.
		callUrl = '/updateChangePriceInfo.do';
	}else{
		//요청중 문제가 발생했습니다.관리자에게 문의하세요.
		alert(msgErrorDefault);
		return;
	}
	
	if(confirm(msgConfirm) == false) return;
	
	//긴급매가변경 저장
	jQuery.ajax({
	    type:"POST",
	    url: callUrl,
	    dataType:"JSON",  
	    data:loadData,
	    async:false,
	    success : function(data) {
	    	if(  data[0].RETURN_CODE  == "0000")
			{   
				alert(cuMent);
				//조회
				btn_search();
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

//신규
function btn_new(){
	//데이터 초기화
	saveFlag ="I";
	clearData();
	
	$("#P_ITM_NAME").val('');
	$("#P_ITM_CODE").val('');
	
	$("#ADD_ITM_NAME").focus();
}

//조회
function btn_search(){
	var loadData 		= $("#top_search").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_SPRC_SDT").val().split("-");
	var P_END_DT_ARR 	= $("#P_SPRC_EDT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
	
	
	//긴급매가변경조회 파라메터 셋팅
	loadData.P_SPRC_SDT = loadData.P_SPRC_SDT.replace(/-/gi, '');
	loadData.P_SPRC_EDT = loadData.P_SPRC_EDT.replace(/-/gi, '');
	saveFlag ="I";
	
	//유효성검사
	if(loadData.P_SPRC_SDT > loadData.P_SPRC_EDT){
		//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
		alert(msgDateValidation);
		$("#P_SPRC_SDT").focus();
		return;
	}

	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_SPRC_SDT").focus();
		return;
	}
	
	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	
	//긴급매가변경조회
	jQuery.ajax({
	    type:"POST",
	    url:"/getChangePriceInfo.do",
	    dataType:"JSON",  
	    data:loadData,
	    async:false,
	    success : function(data) {
	    	gridApp1.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//등록초기화
	clearData();
}

//데이터 클리어
function clearData(){
	
	//$("#ADD_STR_CODE").val('');
	//$("#ADD_STR_NAME").val('');
	$("#ADD_ITM_CODE").val('');
	$("#ADD_SCAN_CODE").val('');
	$("#ADD_ITM_NAME").val('');
	$("#ADD_TAX_GB").val('');
	$("#ADD_CLS_NAME").val('');
	$("#ADD_VEN_NAME").val('');
	$("#ADD_SPRC").val('');
	$("#ADD_CHG_SPRC").val('');
	$("#ADD_IEMP_NM").val('');
	$("#ADD_IDATE").val('');
	
	//지태수 이사님 요청으로 수정일자 쪽 제거 KYW 2017-05-23
	//$("#ADD_UEMP_NM").val('');
	//$("#ADD_UDATE").val('');
	$("#ADD_WPRC").val("");
	$("#ADD_BENEFIT").val("");
}

//그리드 로딩바  보이기
function showLoadingBar() {
    gridRoot1.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar() {
    gridRoot1.removeLoadingBar();
}



//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################



//숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function(){
    if(this==0) return 0;
 
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
 
    return n;
};
 
// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0";
 
    return num.format();
};



//엑셀 export (엑셀다운로드 그리드기능 이용)
//excelExportSave(url:String, async:Boolean);
//url : 업로드할 서버의 url, 기본값 null
//async : 비동기 모드로 수행여부, 기본값 false
function ExcelDownload1() {
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	
	dataGrid1.exportFileName = "긴급매가변경_"+$("#P_STR_NAME option:selected").text()+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
	
};


//POS데이터 생성
function btn_pos(){
	var message = "1. 긴급매가만 적용 할 경우 본 작업을 절대 수행하지 마세요. \n2. 상품마스타 당일 신규, 수정건을 반영할 경우 “POS데이타생성” 후 매장 POS에서 전체 수신 하여야 함.\n" +
			"3. POS데이터생성 이전 등록한 긴급매가는 긴급매가로 적용됩니다.\n4. POS데이터생성이후에 등록한 긴급매가는 매장 POS에서 수신 해야합니다.";
	if(confirm(message) == true){
		$.ajax({
			url :'/posMasterSend.do',
			type : 'POST',
			//data : params,
			dataType : "JSON",
			async: false,		//순차적 AJAX 진행을 위해 비동기로 진행.
			beforeSend : function(){
				console.log("before");
				showLoadingBar();
		    }, 
			success:function(data){
				
				alert("POS마스터 수신이 완료되었습니다");
				
		    },
		    complete : function() {
		    	console.log("complete");
		    	hideLoadingBar();
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	}
	
	
	//alert("POS데이터생성 프로그램 점검중입니다.");
}
