<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page import ="java.util.Calendar" %>

<!-- 스프링 메세지 테그사용 :: 다국어 -->
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><spring:message code="slCardTitle"/></title>

<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">

<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />
<script src="/resources/js/style.js"></script>

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/>
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script>
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<!-- 공통 팝업 -->

<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->
<!--[if IE]><script language="javascript" type="text/javascript" src="/resources/js/rMateGridH5/JS/shim.js"></script><![endif]-->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
<script type="text/javascript" src="/resources/js/page/salesinfo/creditcard/ccPaymentStatus.js?ver=20180409_008" charset="utf-8"></script>
</head>
<script type="text/javascript">

$(document).ready(function(){
	//사용자의 버튼 권한 조회	
	//PKG_COMMON.GET_AUTH_BUTTON_LIST 쿼리 수정해야함
	var loadData =  $("#in_frame").serializeAllObject();
    
	//필수 파라메터 셋팅 (url, 사용자아이디, 점포코드)
	loadData.URL = $(location).attr('pathname').replace(/\//gi, ""); 
	loadData.USER_ID = '${sessionScope.ID}';
	loadData.STR_CODE = '${sessionScope.STR_CODE}';
	
	//alert(loadData.URL+loadData.USER_ID+loadData.CORP_CODE+loadData.STR_CODE);
	
	jQuery.ajax({
	    type:"POST",
	    url:"/getAuthButtonList.do",
	    data:loadData,
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    async:false,
	    success : function(data) {
	    	//alert("ORG_TYPE = " + data[0].ORG_TYPE + " / loadData.STR_CODE = " + loadData.STR_CODE);
	    	
	    	//사용자 기능별 권한관리 데이터가 없으면 모든 버튼 숨김
	    	if(data == ""){
	    		$("#btn_search").hide();
	    		$("#btn_excel_down").hide();
	    		$("#btn_update").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_excel_down").hide();
	    		$("#btn_update").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_search").show();
		    	}else{
		    		$("#btn_search").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//저장버튼 제어 
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_update").show();
		    	}else{
		    		$("#btn_update").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#btn_excel_down").show();
		    	}else{
		    		$("#btn_excel_down").hide();
		    	}
		    	
		    	//엑셀업로드버튼 제어
		    	if(data[0].AUTH_EXCEL_UPLOAD == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//프린트, 출력 버튼 제어
		    	if(data[0].AUTH_PRINT == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//승인 버튼 제어
		    	if(data[0].AUTH_SUBMIT == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//생성 버튼 제어
		    	if(data[0].AUTH_CREATE == 'Y'){
		    		
		    	}else{
		    		
		    	}
	    	}
	    	
	    	//관리구분별 점포조회권한설정
	    	if(data[0].ORG_TYPE == "3") {
	    		//점포조회조건 제어.
	    		$("#S_STR_CODE").val(loadData.STR_CODE);
	    		$("#S_STR_CODE").prop("disabled", true);
	    	} else {
	    		//
	    	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
});

</script>
<body id="in_frame">
	<div id="iframeCnt">
		<div class="btn_area clear">
			<button type="button" class="btn btn_style1 f_l">
				<img src="resources/img/common/help_ico.png">
				<spring:message code="btnHelp" />
			</button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a"><spring:message code="btnHelpClose" /></a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
			<div class="f_r">
				<button type="button" class="btn btn_style2" id="btn_excel_down" name="btn_excel_down">
					<i class="fa fa-file-excel-o"></i>
					<spring:message code="btnExcelDown" />
				</button>
			    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="btn_saveCheck(this)"><spring:message code="btnSave"/></button>
				<button type="button" class="btn btn_style3" id="btn_search" name="btn_search">
					<i class="fa fa-search"></i>
					<spring:message code="btnSearch" />
				</button>
			</div>
		</div>

		<!-- 조회폼 영역 -->
		<form name="search_frm" id="search_frm">
			<div class="search_area" id="top_search">
				<div>
					<input type="hidden" name="S_CORP_CODE" id="S_CORP_CODE" value="${sessionScope.CORP_CODE }">
					<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE}" />
					<label for="" class=""><spring:message code="storNm" /></label>&nbsp;&nbsp;<!-- 점포명 -->
					<select id="S_STR_CODE" name="S_STR_CODE" class="wid2" disabled></select>
					<label for=""><spring:message code="btnSearchDate" /></label><!-- 조회일자 -->
					<input type="text" id="S_STR_DATE" name="S_STR_DATE" class="datepicker">
					~
					<input type="text" id="S_END_DATE" name="S_END_DATE" class="datepicker">
					<label for=""><spring:message code="posNumber"/></label><!-- POS번호 -->
					<select id="S_POS_NO" name="S_POS_NO" >
						<option value=""><spring:message code="all"/></option>
					</select>
					<label for=""><spring:message code="selngAmount"/></label>
					<input type="text" id="P_SELNG_AMOUNT1" name="P_SELNG_AMOUNT1" class="search_txt" value="-9999999" maxlength="9" style="text-align:right;" /> ~ <input type="text" id="P_SELNG_AMOUNT2" name="P_SELNG_AMOUNT2" class="search_txt" value="9999999" maxlength="9"  style="text-align:right;" /> 					
				</div>
				<div class="last">
					<label for=""><spring:message code="cancelFlag"/></label><!-- 취소구분 -->
					<select id="S_CANC_FLAG" name="S_CANC_FLAG" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					<label for=""><spring:message code="cardCompanyNm"/></label><!-- 카드사 -->
					<select id="S_CARD_CODE" name="S_CARD_CODE" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					<input type="hidden" name="S_CARD_NAME" id="S_CARD_NAME">
					<label for=""><spring:message code="consentNumber"/></label><!-- 승인번호 -->
					<input type="text" id="S_APP_NO" name="S_APP_NO" class="wid2" >
					<label for=""><spring:message code="cardNo"/></label><!-- 카드번호 -->
					<input type="text" id="S_CARD_NO" name="S_CARD_NO" class="wid1" >
				</div>
			</div>
		</form>
		<!-- //조회폼 영역 -->

		<!-- 상품현황 -->
		<div class="col2 sub_cnt">
			<div class="clear">
				<h3 class="bul_arr f_l"><spring:message code="slCardTitle" /></h3>
			</div>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- //Content : 본문 영역 -->

</body>
</html>
