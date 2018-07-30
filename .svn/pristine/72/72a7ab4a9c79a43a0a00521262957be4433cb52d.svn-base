<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!-- 스프링 메세지 테그사용 :: 다국어 -->
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@page import ="java.util.List" %>
<%@page import ="java.util.HashMap" %>
<%@page import ="java.util.ArrayList" %>
<%@page import ="java.util.List" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>공통팝업</title>

<link type="text/css" rel="stylesheet" href="/resources/css/jquery-ui.css">
<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">

<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->
<script type="text/javascript" src="/resources/js/jquery-1.7.1.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery.ui-1.10.4.datepicker.min.js"></script>
<script src="/resources/js/style.js"></script>
<%--
	설명: 공통코드관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2016-12-16    오동근       초기작성 
	------------------------------------------------------
	version : 1.0
--%> 

<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script><!-- 그리드 스타일 제어 -->
<!-- 공통 팝업을 쓸 때 반드시 추가해야 한다. -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />	

<script type="text/javascript">

// (회원검색) 팝업 호출 function
function btn_comm_user_search(){
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM1").val('fn_comm_user_callback(dataRow10)');
	
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT1").val($("#I_TEXT").val());
		btn_comm_search('1');
	}
	
}

function btn_comm_user_search1(){
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	
	$("#P_CALLBACK_NM1").val('fn_comm_user_callback1(dataRow10)');
	
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT1").val($("#I_TEXT").val());
		btn_comm_search('1');
	}
}


// (상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#P_CALLBACK_NM2").val('btn_comm_product_search(dataRow11)');
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT2").val($("#I_TEXT").val());
		btn_comm_search('2');
	}
}

// (협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	$("#P_CALLBACK_NM3").val('fn_comm_supply_callback1(dataRow12)');
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT3").val($("#I_TEXT").val());
		btn_comm_search('3');
	}
}

//(사원검색) 팝업 호출 function
function btn_comm_member_search(){
	$('#comm_pop_wrap4' ).dialog( 'open' );
	gridApp13.resize();
	
	// $("#P_CALLBACK_NM4").val('fn_comm_member_callback1(dataRow13)');
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT4").val($("#I_TEXT").val());
		btn_comm_search('4');
	}
}

//(부서검색) 팝업 호출 function
function btn_comm_dept_search(){
	$('#comm_pop_wrap5' ).dialog( 'open' );
	gridApp14.resize();
	
	// $("#P_CALLBACK_NM5").val('fn_comm_dept_callback1(dataRow14)');
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT5").val($("#I_TEXT").val());
		btn_comm_search('5');
	}
}

//(점별상품검색) 팝업 호출 function
function btn_comm_store_search(){
	$('#comm_pop_wrap6' ).dialog( 'open' );
	gridApp15.resize();
	fnGetStrName();
	// $("#P_CALLBACK_NM6").val('fn_comm_store_callback1(dataRow15)');
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT6").val($("#I_TEXT").val());
		btn_comm_search('6');
	}
}


// 상품구분별 검색  - 유재훈 추가 시작
//(상품구분별 검색) 팝업 호출 function
// [ ITM_FORM ]   
//  01 : 낱개상품               
//  03 : 묶음상품               
//  02 : 박스상품
function btn_comm_product_itm_form_search( ITM_FORM ){
	$('#comm_pop_wrap7' ).dialog( 'open' );
	gridApp16.resize();
// 	fnGetStrName();
	$("#P_CALLBACK_NM7").val('fn_comm_product_itm_form_callback(dataRow16)'); 
    // 	여기서는 STR_CODE가 필요 없으나, ITM_FORM를 넘기기위해서 사용했음  
	$("#P_ITM_FORM").val(  ITM_FORM  );
	 
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT7").val($("#I_TEXT").val());
		btn_comm_search('7');
	}
}
// 상품구분별 검색  - 유재훈 추가 끝


// 점별 배송구분(ROUTE_GB)별 상품검색 팝업 호출 function
function btn_comm_store_route_gb_product_search( STR_CODE , ROUTE_GB , VEN_CODE){
	$('#comm_pop_wrap13' ).dialog( 'open' );
	gridApp22.resize(); 
	$("#P_CALLBACK_NM13").val('btn_comm_store_route_gb_product_callback(dataRow22)'); 
    // STR_CODE , ROUTE_GB를 넘기기위해서 사용했음  
    $("#P_STR_CODE").val(  STR_CODE  );
	$("#P_ROUTE_GB").val(  ROUTE_GB  );
	$("#P_VEN_CODE").val(  VEN_CODE  );
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT13").val($("#I_TEXT").val());
		btn_comm_search13() ;
	}
}
function btn_comm_store_route_gb_product_callback(dataRow)
{
// 	$('#ITM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
// 	$('#ITM_CODE' ).val(dataRow.ITM_CODE);				// 상품코드
// 	$('#SCAN_CODE' ).val(dataRow.SCAN_CODE);			// 스캔코드
// 	$('#ITM_SHORT_NAME' ).val(dataRow.ITM_SHORT_NAME);	// 단축상품명

}

// (묶음대표상품검색) 팝업 호출 function
function btn_comm_product_rept_search( ITM_FORM ){
	$('#comm_pop_wrap12' ).dialog( 'open' );
	gridApp21.resize();
// 	fnGetStrName();
	$("#P_CALLBACK_NM12").val('fn_comm_product_rept_callback(dataRow21)'); 
    // 	 ITM_FORM를 넘기기위해서 사용했음  
	$("#P_ITM_FORM").val(  ITM_FORM  );
	 
	if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT12").val($("#I_TEXT").val());
		btn_comm_search('12');
	}
}


//(묶음대표상품검색)  - 유재훈 추가 시작
// (묶음대표상품검색) 팝업 callback function
function fn_comm_product_rept_callback(dataRow)
{
	$('#ITM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
	$('#ITM_CODE' ).val(dataRow.ITM_CODE);				// 상품코드
	$('#SCAN_CODE' ).val(dataRow.SCAN_CODE);			// 스캔코드
	$('#ITM_SHORT_NAME' ).val(dataRow.ITM_SHORT_NAME);	// 단축상품명

}
// (묶음대표상품검색)  - 유재훈 추가 끝



// 상품구분별 검색  - 유재훈 추가 시작
//(상품구분별 검색) 팝업 callback function
function fn_comm_product_itm_form_callback(dataRow)
{
	$('#ITM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
	$('#ITM_CODE' ).val(dataRow.ITM_CODE);				// 상품코드
	$('#SCAN_CODE' ).val(dataRow.SCAN_CODE);			// 스캔코드
	$('#ITM_SHORT_NAME' ).val(dataRow.ITM_SHORT_NAME);	// 단축상품명

}
//상품구분별 검색  - 유재훈 추가 끝



//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow){
	$('#CUST_NAME' ).val(dataRow.CUST_NAME);		// 회원명
	$('#CUST_NO' ).val(dataRow.CUST_NO);		// 회원번호
	$('#MOBIL_NO' ).val(dataRow.MOBIL_NO);		// 휴대전화
	$('#ADDR' ).val(dataRow.ADDR);				// 주소
	$('#CORP_CODE' ).val(dataRow.CORP_CODE);	// 기업코드
	$('#BUSI_NAME' ).val(dataRow.BUSI_NAME);	// 상호명
	$('#SEX' ).val(dataRow.SEX);				// 성별
	$('#BIR_DATE' ).val(dataRow.BIR_DATE);		// 생년월일
	$('#BUSI_NO' ).val(dataRow.BUSI_NO);		// 사업자번호
	$('#MBR_GRADE' ).val(dataRow.MBR_GRADE);	// 회원등급
	$('#BUSI_FLAG' ).val(dataRow.BUSI_FLAG);	// 회원그룹
	$('#TEL_NO' ).val(dataRow.TEL_NO);			// 전화번호
	
}

// (상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#ITM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
	$('#ITM_CODE' ).val(dataRow.ITM_CODE);				// 상품코드
	$('#SCAN_CODE' ).val(dataRow.SCAN_CODE);			// 스캔코드
	$('#ITM_SHORT_NAME' ).val(dataRow.ITM_SHORT_NAME);	// 단축상품명
}

// (협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
	$('#BUSI_NO' ).val(busyNoComma(dataRow.BUSI_NO));		// 사업자번호
}

//(사원검색) 팝업 callback function
function fn_comm_member_callback(dataRow){
	$('#USER_NM' ).val(dataRow.USER_NM);			// 사원명
	$('#USER_ID' ).val(dataRow.USER_ID);			// 사원번호
	$('#MEMBER_DEPT_NAME' ).val(dataRow.DEPT_NAME);	// 조직명
	$('#EMP_DUTY_NAME' ).val(dataRow.EMP_DUTY_NAME);// 직원구분명
	$('#SYS_NAME' ).val(dataRow.SYS_NAME);			// 업무구분명
	$('#EMP_DUTY' ).val(dataRow.EMP_DUTY);			// 직원구분
	$('#SYS_CODE' ).val(dataRow.SYS_CODE);			// 업무구분
}

//(부서검색) 팝업 callback function
function fn_comm_dept_callback(dataRow){
	$('#DEPT_CODE' ).val(dataRow.DEPT_CODE);		// 조직코드
	$('#DEPT_NAME' ).val(dataRow.DEPT_NAME);		// 조직명
	$('#GRADE' ).val(dataRow.GRADE);				// 레벨
	$('#ORG_TYPE' ).val(dataRow.ORG_TYPE);			// 조직구분
}

//(점별상품검색) 팝업 callback function
function fn_comm_store_callback(dataRow){
	$('#ITM_NAME_STORE' ).val(dataRow.ITM_NAME);				// 상품명
	$('#ITM_CODE_STORE' ).val(dataRow.ITM_CODE);				// 상품코드
	$('#SCAN_CODE_STORE' ).val(dataRow.SCAN_CODE);			// 스캔코드
	$('#ITM_SHORT_NAME_STORE' ).val(dataRow.ITM_SHORT_NAME);	// 단축상품명
	$('#SPRC' ).val(SPRC);	// 판매가
}

function fn_comm_user_callback1(dataRow){
	alert("회원검색 2번째 function");
}
function fn_comm_user_callback2(dataRow){
	alert("회원검색 3번째 function");
}

function fn_comm_product_callback1(dataRow){
	alert("상품검색 2번째 function");
}

function fn_comm_product_callback2(dataRow){
	alert("상품검색 3번째 function");
}

function fn_comm_supply_callback1(dataRow){
	alert("협력업체검색 2번째 function");
}

function fn_comm_supply_callback2(dataRow){
	alert("협력업체검색 3번째 function");
}

function fn_comm_supply_callback3(dataRow){
	alert("협력업체검색 4번째 function");
}

function fn_test(){
	
}

$(document).ready(function(){
	$("#testSelect").attr("disabled", "disabled");
	
	$("input[name='testRadio']").click(function(){
		var a = $("input[name='testRadio']:checked").val();
		if(a == "1"){
			$("#testSelect").val("2");
			$("#testSelect").attr("disabled", "disabled");
		}else{
			$("#testSelect").removeAttr("disabled");
		}
	});
});

</script>
	
</head>
 
 <body id="in_frame">
		<div id="iframeCnt">
			<div class="btn_area clear">
				<div class="advice p_a">
					<h4>공통 팝업 Test</h4>
				</div>
				<div class="f_r">
				텍스트 입력 : <input type="text" name="I_TEXT" id="I_TEXT" class="search_txt">
					<button type="button" class="btn btn_style3"  onclick="btn_comm_user_search()"><i class="fa fa-search"></i>회원검색 팝업</button>
					<button type="button" class="btn btn_style3"  onclick="btn_comm_user_search1()"><i class="fa fa-search"></i>회원검색 팝업2</button>
					<button type="button" class="btn btn_style3"  onclick="btn_comm_product_search()"><i class="fa fa-search"></i>상품검색 팝업</button>
					<button type="button" class="btn btn_style3"  onclick="btn_comm_supply_search()"><i class="fa fa-search"></i>협력업체검색 팝업</button>
					<button type="button" class="btn btn_style3"  onclick="btn_comm_member_search()"><i class="fa fa-search"></i>사원검색 팝업</button>
					<button type="button" class="btn btn_style3"  onclick="btn_comm_dept_search()"><i class="fa fa-search"></i>부서검색 팝업</button>
					<button type="button" class="btn btn_style3"  onclick="btn_comm_store_search()"><i class="fa fa-search"></i>점별상품검색 팝업</button>
					<button type="button" class="btn btn_style3"  onclick="fn_test()"><i class="fa fa-search"></i>테스트</button>
					
					<!-- 상품구분별  ( ITM_FORM :  낱개,묶음,박스)   검색  - 유재훈 추가 시작 -->
					<button type="button" class="btn btn_style3"  onclick="btn_comm_product_itm_form_search('02')"><i class="fa fa-search"></i>상품구분별 상품검색</button>
					<!-- 상품구분별  ( ITM_FORM :  낱개,묶음,박스)   검색  - 유재훈 추가 끝 -->
					
					<!-- 묶음대표상품검색 (REPT_YN)    - 유재훈 추가 시작 -->
					<button type="button" class="btn btn_style3"  onclick="btn_comm_product_rept_search()"><i class="fa fa-search"></i>묶음대표상품 검색</button>
					<!-- 묶음대표상품검색 (REPT_YN)    - 유재훈 추가 끝 -->
					
					<!-- 점별 배송구분(ROUTE_GB)별 상품검색    - 유재훈 추가 시작 -->
					<button type="button" class="btn btn_style3"  onclick="btn_comm_store_route_gb_product_search()"><i class="fa fa-search"></i>점별 배송구분(ROUTE_GB)별 상품검색 </button>
					<!--  점별 배송구분(ROUTE_GB)별 상품검색      - 유재훈 추가 끝 -->
					
				</div>
		</div>
		<div class="search_area"    id="top_search">
			<div class="last">
				회  원  명 : <input type="text" name="CUS_NAME" id="CUS_NAME" >
				회원번호 : <input type="text" name="CUST_NO" id="CUST_NO">
				휴대전화 : <input type="text" name="MOBIL_NO" id="MOBIL_NO">
				주     소 : <input type="text" name="ADDR" id="ADDR">
				기업코드 : <input type="text" name="CORP_CODE" id="CORP_CODE">
				생년월일 : <input type="text" name="BIR_DATE" id="BIR_DATE">
			</div>
			<div class="last">
				상 품 명 : <input type="text" name="ITM_NAME" id="ITM_NAME">
				상품코드 : <input type="text" name="ITM_CODE" id="ITM_CODE">
				스캔코드 : <input type="text" name="SCAN_CODE" id="SCAN_CODE">
				단축상품명 : <input type="text" name="ITM_SHORT_NAME" id="ITM_SHORT_NAME">
			</div>
			<div class="last">
				협력업체명 : <input type="text" name="VEN_NAME" id="VEN_NAME">
				협력업체코드 : <input type="text" name="VEN_CODE" id="VEN_CODE">
				사업자번호 : <input type="text" name="BUSI_NO" id="BUSI_NO">
			</div>
			<div class="last">
				사원명 : <input type="text" name="USER_NM" id="USER_NM">
				사원번호 : <input type="text" name="USER_ID" id="USER_ID">
				조직명 : <input type="text" name="MEMBER_DEPT_NAME" id="MEMBER_DEPT_NAME">
				직원구분명 : <input type="text" name="EMP_DUTY_NAME" id="EMP_DUTY_NAME">
				업무구분명 : <input type="text" name="SYS_NAME" id="SYS_NAME">
			</div>
			<div class="last">
				조직명 : <input type="text" name="DEPT_NAME" id="DEPT_NAME">
				조직코드 : <input type="text" name="DEPT_CODE" id="DEPT_CODE">
				레벨 : <input type="text" name="GRADE" id="GRADE">
				조직구분 : <input type="text" name="ORG_TYPE" id="ORG_TYPE">
			</div>
			<div class="last">
				상 품 명 : <input type="text" name="ITM_NAME_STORE" id="ITM_NAME_STORE">
				상품코드 : <input type="text" name="ITM_CODE_STORE" id="ITM_CODE_STORE">
				스캔코드 : <input type="text" name="SCAN_CODE_STORE" id="SCAN_CODE_STORE">
				단축상품명 : <input type="text" name="ITM_SHORT_NAME_STORE" id="ITM_SHORT_NAME_STORE">
				판매가 : <input type="text" name="SPRC" id="SPRC">
			</div>
			<div class="last">
				<input type="radio" name="testRadio" id="testRadio1" checked="checked" value="1">1
				<input type="radio" name="testRadio" id="testRadio2" value="2">2
				<input type="radio" name="testRadio" id="testRadio3" value="3">3
				<select id="testSelect" name="testSelect" class="wid2">
					<option value="1">직매입</option>
					<option value="2">임대율</option>
				</select>
			</div>
		</div>
	
</body>
</html>
	
