/********************************************************
	설명: 사용자 관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2016-12-23    문희훈       초기작성 
	------------------------------------------------------
	version : 1.0
 ********************************************************/
	
$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//직원구분
	$("#iframeCnt select[name=TOP_EMP_DUTY]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=TOP_EMP_DUTY]", "EMP_DUTY");
	//재직구분
	$("#iframeCnt select[name=TOP_JOB_FLAG]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=TOP_JOB_FLAG]", "JOB_FLAG");
	
	//휴대폰 앞자기
	$("#iframeCnt select[name=MOBIL_NO1]").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=MOBIL_NO1]", "TELCOM");
	//직급
	$("#iframeCnt select[name=POSITION]").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=POSITION]", "POSITION");
	//직원구분
	$("#iframeCnt select[name=EMP_DUTY]").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=EMP_DUTY]", "EMP_DUTY");
	//재직구분
	$("#iframeCnt select[name=JOB_FLAG]").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=JOB_FLAG]", "JOB_FLAG");
	
	//숫자만 입력
	CommonJs.addInputHandler({input:$("#MOBIL_NO2"), dataType:"N", maxlength:4});
	CommonJs.addInputHandler({input:$("#MOBIL_NO3"), dataType:"N", maxlength:4});
	
	btn_create();
});

//------------------------ 그리드 설정 시작 -------------------------------------


//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1,selectorColumn1;

//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";

//rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	var loadData =  $("#top_search").serializeAllObject();
	
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/getUserList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: loadData,
		success:function(data){  
			gridApp1.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});

	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	dataGrid1 = gridRoot1.getDataGrid(); // 그리드 객체
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	//그리드1 첫번째 행 선택
	dataGrid1.setSelectedIndex(0);
	dataRow1 = gridRoot1.getItemAt(0);

	// 현재 선택된 권한에 대한 자세한 정보를 표시한다.
	//$('#ROLE_ID').val(dataRow1.ROLE_ID);
	//$('#ROLE_NM_DTL').val(dataRow1.ROLE_NM);
	//$('#ROLE_DC_DTL').val(dataRow1.ROLE_DC);
		
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
	//alert(dataRow1.ROLE_NM);
	
	//$('#USER_ID').val(dataRow1.USER_ID);
	
	jQuery.ajax({ 
	    url:"/getUserDetail.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: dataRow1,
		success:function(data){  
			
			//상세정보 셋팅
			$("#PASSWD").val("********");
			$("#USER_ID").val(data[0].USER_ID);
			$("#USER_NM").val(data[0].USER_NM);
			if(data[0].MOBIL_NO != ""){
				
				var tel = CommonJs.phoneFomatterArr(data[0].MOBIL_NO);
				
				//$("#MOBIL_NO1").val(data[0].MOBIL_NO.substring( 0, 3 ));
				//$("#MOBIL_NO2").val(data[0].MOBIL_NO.substring( 3, 7 ));
				//$("#MOBIL_NO3").val(data[0].MOBIL_NO.substring( 7, 11 ));
				$("#MOBIL_NO1").val(tel[0]);
				$("#MOBIL_NO2").val(tel[1]);
				$("#MOBIL_NO3").val(tel[2]);
				
			}
			$("#MOBIL_NO").val(data[0].MOBIL_NO);
			$("#DEPT_CODE").val(data[0].DEPT_CODE);
			$("#DEPT_NAME").val(data[0].DEPT_NAME);
			$("#POSITION").val(data[0].POSITION);
			$("#EMP_DUTY").val(data[0].EMP_DUTY);
			$("#ROLE_ID").val(data[0].ROLE_ID);
			$("#JOB_FLAG").val(data[0].JOB_FLAG);
			$("#IEMP_NO").val(data[0].IEMP_NO);
			$("#REGDT").val(data[0].REGDT);
			$("#UEMP_NO").val(data[0].UEMP_NO);
			$("#UPDDT").val(data[0].UPDDT);
			$("#REMARK").val(data[0].REMARK);
			
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	$("#USER_ID").attr("readonly", true);
	$("#userIdYN").val("Y");
	$("#USER_ID").css("background-image", "url('/resources/img/common/icon_yes.png')");
	
}


//----------------------- 그리드 설정 끝 -----------------------


//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
	<DataGrid id="dg1">\
		<columns>\
			<DataGridColumn dataField="No" id="colNo" itemRenderer="IndexNoItem" textAlign="center" width="40"/>\
			<DataGridColumn dataField="USER_ID"  headerText="'+staffId+'" textAlign="center" />\
			<DataGridColumn dataField="USER_NM"  headerText="'+staffName+'" textAlign="center"/>\
			<DataGridColumn dataField="POSITION"  headerText="'+rank+'" textAlign="center"/>\
			<DataGridColumn dataField="DEPT_NAME"  headerText="'+departmentName+'" textAlign="center" />\
			<DataGridColumn dataField="DEPT_CODE"  headerText="'+deptCode+'" textAlign="center"  visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

// ----------------------- 그리드 설정 끝 ---------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}


function init() {
	 
	//권한그룹 리스트 박스 
	getAuthSelectBoxList();
	
	//휴대폰번호 자동 포커스 이동
	 $("#MOBIL_NO1").change (function () {
		 if($("#MOBIL_NO1").val() != ""){
			 $("#MOBIL_NO2").focus(); 
		 }else if($("#MOBIL_NO1").val() == ""){
			 $("#MOBIL_NO2").val("");
			 $("#MOBIL_NO3").val("");
		 }
		 return false;
	});
	$("#MOBIL_NO2").keyup (function () {
	        var charLimit = $(this).attr("maxlength");
	        if (this.value.length >= charLimit) {
	        	$("#MOBIL_NO3").focus();
	            return false;
	        }
	});
	
	//유저 id 입력체크 (영어.숫자만 입력)
	$("#USER_ID").keyup(function(event){
        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
            //아이디 중복체크
        	btnConfirm();
        }
    });
	
}


//(부서검색) 팝업 호출 function
function btn_comm_dept_search(){
	$('#comm_pop_wrap5' ).dialog( 'open' );
	gridApp14.resize();
}

//(부서검색) 팝업 callback function
function fn_comm_dept_callback(dataRow){
	$('#DEPT_CODE' ).val(dataRow.DEPT_CODE);		// 조직코드
	$('#DEPT_NAME' ).val(dataRow.DEPT_NAME);		// 조직명
}

//신규
function btn_create(){
	
	//입력값 초기화
	$("#PASSWD").val("");
	$("#USER_ID").val("");
	$("#USER_NM").val("");
	$("#MOBIL_NO1").val("010");
	$("#MOBIL_NO2").val("");
	$("#MOBIL_NO3").val("");
	$("#DEPT_CODE").val("");
	$("#DEPT_NAME").val("");
	$("#POSITION").val("");
	$("#EMP_DUTY").val("01");
	$("#ROLE_ID").val("");
	$("#JOB_FLAG").val("01");
	$("#IEMP_NO").val("");
	$("#REGDT").val("");
	$("#UEMP_NO").val("");
	$("#UPDDT").val("");
	$("#REMARK").val("");
	
	$("#USER_ID").attr("readonly", false);
	$("#userIdYN").val("N");
	$("#USER_ID").css("background-image", "url('/resources/img/common/icon_no.png')");
	
	$("#USER_ID").focus();
}


function setSearch(event){
	if(event.keyCode == "13"){
		btn_search();
	}
}


//조회
function btn_search(){
	
	//상세정보 초기화
	btn_create();
	
	$("#USER_ID").attr("readonly", false);
	$("#userIdYN").val("N");
	$("#USER_ID").css("background-image", "url('/resources/img/common/icon_no.png')");
	
	var loadData =  $("#top_search").serializeAllObject();
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/getUserList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: loadData,
		success:function(data){  
			gridApp1.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//저장
function btn_update(){
	
	var flag = "N";
	var msg = "";
	
	if($("#PASSWD").val()==""){
		//신규
		flag = 'Y';
		//사원을 신규등록 하시겠습니까?
		msg =msgInsertComment; 
	}else{
		//수정
		flag = "N";
		//사원정보를 수정 하시겠습니까?
		msg = msgUpdateComment;
	}
	
	var loadData =  $("#form1").serializeAllObject();
	
	loadData.SET_FLAG = flag;
	
	//휴대폰번호가 작성되어 있다면 번호 체크를 위한 값 셋팅
	loadData.MOBIL_NO = loadData.MOBIL_NO1+loadData.MOBIL_NO2+loadData.MOBIL_NO3;
	
	loadData.CHECK_USER_ID = $("#userIdYN").val();
	
	if(loadData.USER_ID==""){
		//사용자ID는 필수입력 입니다.
		alert(msgValidateComment1);
		$("#USER_ID").focus();
		return;
	}else if(loadData.CHECK_USER_ID == 'N'){
		//이미 사용중인 사용자ID 입니다.
		alert(msgValidateComment2);
		$("#USER_ID").focus();
		return;
	}else if(loadData.USER_NM ==""){
		//사원명는 필수입력 입니다.
		alert(msgValidateComment3);
		$("#USER_NM").focus();
		return;
	}else if(loadData.MOBIL_NO == ""){
		//휴대폰번호는 필수입력 입니다.
		alert(msgValidateComment4);
		$("#MOBIL_NO1").focus();
		return;
	}else if(loadData.MOBIL_NO != "" ){
		var regPhone =  /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;

        //휴대폰 입력 및 유효성 체크
        if(!regPhone.test(loadData.MOBIL_NO)) {
        	//잘못된 휴대폰 번호입니다.
        	alert(msgValidateComment5);
        	$("#MOBIL_NO1").focus();
            return;
        }
        
	}
	
	if(loadData.DEPT_CODE ==""){
		//부서코드는 필수입력 입니다.
		alert(msgValidateComment6);
		$("#DEPT_CODE").focus();
		return;
	}else if(loadData.POSITION ==""){
		//직급은 필수입력 입니다.
		alert(msgValidateComment7);
		$("#POSITION").focus();
		return;
	}else if(loadData.EMP_DUTY ==""){
		//직원구분은 필수입력 입니다.
		alert(msgValidateComment8);
		$("#EMP_DUTY").focus();
		return;
	}else if(loadData.ROLE_ID ==""){
		//권한그룹은 필수입력 입니다.
		alert(msgValidateComment9);
		$("#ROLE_ID").focus();
		return;
	}else if(loadData.JOB_FLAG ==""){
		//재직구분은 필수입력 입니다.
		alert(msgValidateComment10);
		$("#JOB_FLAG").focus();
		return;
	}
	
	
	if(confirm(msg) == false) return;
	
	//사용자정보 INSERT/UPDATE
	jQuery.ajax({ 
	    url:"/setUserInfo.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: loadData,
		success:function(data){  
			//
			var obj = jQuery.parseJSON(data.CUR);
			if(obj[0].RETURN_CODE == '0000'){
				
				if(flag =='Y'){
					//저장되었습니다.
					alert(msgSave);
				}else{
					//수정되었습니다.
					alert(msgModify);
				}
				
				//검색초기화
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

//비밀번호 초기화
function resetPw(){
	
	if($("#PASSWD").val()==""){
		//사원을 선택하세요.
		alert(msgValidateComment11);
		return;
	}
	
	//비밀번호를 초기화 하시겠습니까?
	if(confirm(msgResetPW) == false) return;
	
	jQuery.ajax({ 
	    url:"/resetUserPassWd.do",         
	    type:"POST",
		datatype:"json",
		data:  {USER_ID: $("#USER_ID").val()},
		beforeSend : function(xhr) {} ,
		success:function(data){ 
			var obj = jQuery.parseJSON(data.CUR);
			if(obj[0].RETURN_CODE == '0000'){
				//비밀번호가 초기화 되었습니다.
				alert(msgComplatePW);
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


//유저아이디 중복체크
function btnConfirm(){
	
	if($("#USER_ID").val().trim() == "" ||$("#USER_ID").val().trim() == null || $("#USER_ID").val().trim() == "undefined"){
		$("#userIdYN").val("N");
		$("#USER_ID").css("background-image", "url('/resources/img/common/icon_no.png')");
		return;
	}
	
	if(dataRow1 != undefined && dataRow1 != "undefined"){
		if($("#USER_ID").val() == dataRow1.USER_ID){
			$("#userIdYN").val("Y");
			$("#USER_ID").css("background-image", "url('/resources/img/common/icon_yes.png')");
			return;
		}
	}

	var loadData = {};
	loadData.USER_ID = "";
	loadData.USER_ID = $("#USER_ID").val();
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/selectCountUserId.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: loadData,
		success:function(data){
			
			var obj = jQuery.parseJSON(data.CUR);
			
			//결과가 1일 경우 중복되는 CD_ID가 있음 0일 경우 없음
			if(obj[0].CNT == "0"){
				$("#userIdYN").val("Y");
				$("#USER_ID").css("background-image", "url('/resources/img/common/icon_yes.png')");
			}else{
				$("#userIdYN").val("N");
				$("#USER_ID").css("background-image", "url('/resources/img/common/icon_no.png')");
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
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

/************************************************
 * 권한그룹 SELECT BOX 리스트를 생성한다
 * checkBoxId		: 셀렉트 박스 ID
 * groupCode	    : 권한그룹 코드 
 ************************************************/
function getAuthSelectBoxList(){
	
	// 권한그룹 리스트를  가져온다.
	
	jQuery.ajax({ 
	    url:"/getAuthSelectBoxList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		success:function(data){  
			
			$("#iframeCnt select[name=ROLE_ID]").append('<option value="">'+ select +'</option>');
			for(var i = 0; i < data.length; i++){
				$("#ROLE_ID").append('<option value="'+ data[i].ROLE_ID +'">'+ data[i].ROLE_NM +'</option>'); 
		   	}
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

/**
 * 글자수(바이트 체크)
 * @param oid : 글자를 받을 Textarea 오브젝트
 * @param maxByte : 바이트 체크할 값
 */
function fnChkByte(obj, maxByte){
	var str = obj.value;
	var str_len = str.length;

	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";

	for(var i=0; i<str_len; i++){
	one_char = str.charAt(i);
	if(escape(one_char).length > 4){
	    rbyte += 2;                                         //한글2Byte
	}else{
	    rbyte++;                                            //영문 등 나머지 1Byte
	}

	if(rbyte <= maxByte){
	    rlen = i+1;                                          //return할 문자열 갯수
	}
	}

	if(rbyte > maxByte){
	    //alert("한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
		alert(msgValueLength); //입력할 수 있는 문자열의 길이를 초과하였습니다.
	    str2 = str.substr(0,rlen);                                  //문자열 자르기
	    obj.value = str2;
	    fnChkByte(obj, maxByte);
	}else{
	    document.getElementById('byteInfo').innerText = rbyte;
	}
}

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").width("100%");

	var hei1 = $(window).height() - 105;
	
	$("#gridHolder1").height(hei1);
	$(".box_rgt").height(hei1+22);
	
	$(".note1").height(200);
	
	$(window).on('resize',function (){	
		
		var hei1 = $(window).height() - 105;
		
		$("#gridHolder1").height(hei1);
		$(".box_rgt").height(hei1+22);
	});
});

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################