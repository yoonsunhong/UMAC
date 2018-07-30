/********************************************************
	설명: WMS-재고조사 일정 관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-21    문희훈       초기작성 
	------------------------------------------------------
	version : 1.0
 ********************************************************/
	
var crudBit          =   "C";   // 최초 신규로 시작함
var crudBitDetail    =   "C";   // 최초 신규로 시작함

$(document).ready(function(){
	
	init();

	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	//달력설정
	$(".datepicker").datepicker();
	
	//var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	//var beforeMonthDate = new CommDateManager().before(0, 0, 7).getDate("yyyy-mm-01"); // 일주일전 before(년,월,일)
	
	$("#P_INV_INSP_DT").val("");
	
	//재고조사구분
	$("#iframeCnt select[name=P_INV_INSP_GB]").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=P_INV_INSP_GB]", "INV_SURL_GB");
	//재고조사방법
	$("#iframeCnt select[name=P_INV_SURL_MTHD]").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=P_INV_SURL_MTHD]", "INV_SURL_MTHD");
	
	//재고조사 물류센터 리스트 조회
	var postValue ={};	
	jQuery.ajax({
	    type:"POST",
	    url:"/getWmsStockOrganizationList.do",
	    dataType:"JSON",  
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	$("#P_STR_NAME").append('<option value="">'+select+'</option>'); 
			for(var i = 0; i < data.length; i++){
				 $("#P_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});

	
});

//----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1;

//그리드1 데이터 초기화
var gridData1 = [];

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//재고조사 일정 조회 그리드1
	getInventorySchedule();

	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	
}

//그리드1 layoutCompleteHandler1
function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}


//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//셀렉트박스 선택 이벤트
	selectorColumn1 = gridRoot1.getObjectById("selector1");
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	
	//alert(dataRow1.STR_NAME);
	$("#P_STR_NAME").val(dataRow1.STR_CODE);
	$("#P_STR_CODE").val(dataRow1.STR_CODE);
	$("#P_INV_INSP_SCHD_ID").val(dataRow1.INV_INSP_SCHD_ID);
	$("#P_INV_INSP_DT").val(dataRow1.INV_INSP_DT);
	
	$("#P_INV_INSP_GB").val(dataRow1.INV_INSP_GB_CD);
	$("#P_INV_SURL_MTHD").val(dataRow1.INV_SURL_MTHD_CD);
	/*$("#P_LRG_CODE").val(dataRow1.LRG_CODE_CD);*/
	
	//상태 업데이트로 저장
	crudFlag = "U";
	
}


//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows" showDataTips="true" >\
		<columns>\
			<DataGridColumn dataField="No" id="colNo" itemRenderer="IndexNoItem" textAlign="center" width="40"/>\
			<DataGridColumn dataField="STR_NAME"  headerText="'+storNm+'" textAlign="center"  width="100"/>\
			<DataGridColumn dataField="STR_CODE"  headerText="'+storCode+'" textAlign="center"  width="100" visible="false"/>\
			<DataGridColumn dataField="INV_INSP_SCHD_ID"  headerText="'+inventorySurveyScheduleID+'" textAlign="center"  width="100"/>\
			<DataGridColumn dataField="INV_INSP_DT" headerText="'+inventorySurveyScheduleDate+'" textAlign="center"  width="100"/>\
			<DataGridColumn dataField="INV_INSP_GB" headerText="'+inventorySurveyClassification+'" textAlign="center"   width="80"/>\
			<DataGridColumn dataField="INV_INSP_GB_CD" headerText="조사구분코드" textAlign="center"   width="80" visible="false"/>\
			<DataGridColumn dataField="INV_SURL_MTHD" headerText="'+inventorySurveyMethod+'" textAlign="center" width="100"/>\
			<DataGridColumn dataField="INV_SURL_MTHD_CD" headerText="조사방법코드" textAlign="center" width="100" visible="false"/>\
			<DataGridColumn dataField="LRG_CODE" headerText="'+scopeOfInvestigation+'" textAlign="center" width="100" visible="false"/>\
		    <DataGridColumn dataField="LRG_CODE_CD" headerText="조사범위코드" textAlign="center" width="100" visible="false"/>\
		    <DataGridColumn dataField="CFM_FLAG" headerText="확정유무" textAlign="center" width="100" visible="false"/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';


//----------------------- 그리드 설정 끝 -------------------------------------


function init() {
	
	//재고조사일정 ID 발번
	getSchdId();
	
	//최초 로그인시 로그인한 사용자의 점포코드, 점포명을 보여준다.
	//$("#P_STR_CODE").val(STR_CODE);
	//$("#P_STR_NAME").val(STR_NAME);
	
}

//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

//점포명 셀렉트박스 체인지 이벤트
function setStrCode(){
	//셀렉트박스 값을 넣어주기
	$("#P_STR_CODE").val($("#P_STR_NAME").val());
	//클리어폼데이터
	clearForm();
	//그리드1 데이터 조회
	getInventorySchedule();
	//재고조사일정 ID 발번
	getSchdId();
	//상태 신규로 저장
	crudFlag = "C";
	
}

//재고조사일정 ID 발번
function getSchdId(){
	
	jQuery.ajax({ 
	    url:"/getSchdId.do",         
	    type:"POST",
		datatype:"json",
		data: "",
		success:function(data){  
			$("#P_INV_INSP_SCHD_ID").val(data.INV_INSP_SCHD_ID);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//재고조사 일정 조회
function getInventorySchedule(){
	
	var loadData =  $("#form1").serializeAllObject();
	//그리드 로딩바  보이기
	showLoadingBar();
	loadData.STR_CODE	= loadData.P_STR_CODE; 
	
	//최초 jsp 에서 셋팅한 세션에서 저장한 str_code를  넘긴다.
	//alert(loadData.P_STR_CODE);
	
	/**
	* 그리드1 데이터 조회 및 그리드 데이터 셋팅
	* 최초에는 로그인한 사용자의 점포로 그리드 데이터 조회
	*/
	jQuery.ajax({ 
	    url:"/getWmsInventorySchedule.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		success:function(data){  
			gridApp1.setData(data);
	    },
	    complete : function(data) {
	    	//그리드 로딩바  숨기기
	    	hideLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	//그리드 로딩바  숨기기
	    	hideLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

var crudFlag = "C";

//신규
function btn_create(){

	//폼클리어
	clearForm();
	
	//재고조사일정 ID 발번 현재년도+ MAX +1
	getSchdId();

	//상태 신규로 저장
	crudFlag = "C";
	
	//grid1 셀렉트 된 내용 초기화
	dataGrid1.setSelectedIndex(-1);
	
	//재고조사일자 포커스
	$("#P_INV_INSP_DT").focus();
}

//조회
function btn_read(){
	
	if($("#P_STR_NAME").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		
		return;
	}
	
	//재고조사 일정 조회 그리드1
	getInventorySchedule();
	
	//재고조사일정 ID 발번 현재년도+ MAX +1
	getSchdId();
	
	//CRUD플래그 초기화
	crudFlag = "C";
	
	//폼데이터 초기화
	clearForm();

}



//저장
function btn_update(){
	
	//오늘날짜
	var lsToDate = new CommDateManager().getDate("yyyymmdd");
	var loadData =  $("#form1").serializeAllObject();

	//재고조사일자
	var selectData = dataGrid1.getSelectedItem();
	var doDate = "";
	if(selectData != null){
		doDate = selectData.INV_INSP_DT.replace(/-/gi, '');	
	}
	
	if(crudFlag == "U"){
		if(selectData.CFM_FLAG == '2'){
			//확정처리된 데이터는 저장할수 없습니다.
			alert(msgDcsnSaveNo);
			return;
		}
	}
	
	if(loadData.P_STR_NAME == ""){
		//점포명은 필수입력 입니다.
		alert(inventorySurveyMent2);
		$('#P_STR_NAME').focus();
		return;
	}
	
	if(loadData.P_STR_CODE == ""){
		//점포코드는 필수입력 입니다.
		alert(inventorySurveyMent3);
		$('#P_STR_CODE').focus();
		return;
	}
	
	if(loadData.P_INV_INSP_SCHD_ID == ""){
		//재고조사일정ID는 필수입력 입니다.	
		alert(inventorySurveyMent4);
		return;
	}
	
	if(loadData.P_INV_INSP_DT == ""){
		//재고조사일자는 필수입력 입니다.
		alert(inventorySurveyMent5);
		$('#P_INV_INSP_DT').focus();
		return;
	}
	
	if(doDate != ""){
		if(lsToDate > doDate ){
			//재고조사기간이 지나 수정 할 수 없습니다.
			alert(inventorySurveyMent11);
			return;
		}
	}
	
	if(lsToDate > $('#P_INV_INSP_DT').val().replace(/-/gi, '')){
		//오늘날짜보다 작을 수 없습니다.
		alert(inventorySurveyMent12);
		$('#P_INV_INSP_DT').focus();
		return;
	}
	
	if(loadData.P_INV_INSP_GB == ""){
		//재고조사구분은 필수입력 입니다.
		alert(inventorySurveyMent6);
		$('#P_INV_INSP_GB').focus();
		return;
	}
	
	if(loadData.P_INV_SURL_MTHD == ""){
		//재고조사방법은 필수입력 입니다.
		alert(inventorySurveyMent7);
		$('#P_INV_SURL_MTHD').focus();
		return;
	}
	
	//alert(loadData.P_INV_PERIOD_FR );
	//alert(crudFlag);
	
	
	var msg = "";
	if(crudFlag == "C"){
		//신규
		loadData.P_CRUD_FLAG = "C";
		//저장 하시겠습니까?
		msg = msgSaveConfirm;
	}else{
		//수정
		loadData.P_CRUD_FLAG = "U";
		//수정 하시겠습니까?
		msg = msgModifyConfirm;
	}
	
	if(confirm(msg) == false) return;
	
	//재고조사 일정  INSERT/UPDATE
	jQuery.ajax({ 
	    url:"/setInvInspSchdtInfo.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: loadData,
		success:function(data){  
			//결과리턴
			var obj = jQuery.parseJSON(data.CUR);
			if(obj[0].RETURN_CODE == '0000'){
				
				if(crudFlag =='C'){
					//저장되었습니다.
					alert(msgSave);
				}else{
					//수정되었습니다.
					alert(msgModify);
				}
				
				//재고조사 일정 조회 그리드1
				getInventorySchedule();
				//재고조사일정 ID 발번 현재년도+ MAX +1
				getSchdId();
				//CRUD플래그 초기화
				crudFlag = "C";
				//폼데이터 초기화
				clearForm();
				
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


//폼데이터 초기화
function clearForm(){

	$("#P_INV_INSP_SCHD_ID").val("");
	$("#P_INV_INSP_GB").val("");
	$("#P_INV_SURL_MTHD").val("");
	/*$("#P_LRG_CODE").val("00");*/
	//var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_INV_INSP_DT").val("");
	
}



/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$('.box_menu').height($(window).height()-48);
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height($(window).height()-157);
	
	$(window).resize(function() {
		$('.box_menu').height($(window).height()-48);
		$("#gridHolder1").height($(window).height()-157);
	});
});

//그리드 로딩바  보이기
function showLoadingBar() {
    gridRoot1.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar() {
    gridRoot1.removeLoadingBar();
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################