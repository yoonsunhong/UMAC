<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

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
<title><spring:message code="selngTRSearch"/></title>

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
<!--[if IE]><script language="javascript" type="text/javascript" src="/resources/js/rMateGridH5/JS/shim.js"></script><![endif]-->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>

<%--
	설명: 매출TR조회
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-01-10    김창열       초기작성 
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
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>

<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
<script type="text/javascript" src="/resources/js/page/salesanal/report/salesAnalReportTr.js?ver=20180327_001" charset="utf-8"></script>
</head>
<c:set var="today" value="<%=new java.util.Date()%>" />
<fmt:formatDate value="${today}" pattern="yyyy-MM-dd" var="today"/> 
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
	    		$("#btn_print").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_excel_down").hide();
	    		$("#btn_print").hide();
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
		    		
		    	}else{
		    		
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
		    		$("#btn_print").show();
		    	}else{
		    		$("#btn_print").hide();
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
	    		$("#P_STR_CODE").val(loadData.STR_CODE);
	    		$("#P_STR_CODE").prop("disabled", true);
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
 	<form name="frm" id="frm">
		<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
		<input type="hidden" name="pageUnit" id="pageUnit" value="20" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
		<input type="hidden" name="pageSize" id="pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
		<input type="hidden" name="P_COLUMN_NAME" id="P_COLUMN_NAME" />
		<input type="hidden" name="P_ORDERBY" id="P_ORDERBY" />
		  	
		<div id="iframeCnt">
			<div class="btn_area clear">
				<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png"><spring:message code="btnHelp"/></button>
				<div class="advice p_a">
					<h4>information</h4>
					<pre id="helpText"></pre>
					<a href="" class="close_btn p_a"><spring:message code="btnHelpClose"/></a>
				</div>
				<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
				<div class="f_r">
			    	<button type="button" class="btn btn_style2"  id="btn_print" name=""><spring:message code="print"/></button>
					<button type="button" class="btn btn_style2"  id="btn_excel_down" name="btn_excel_down"><spring:message code="btnExcelDown"/></button>
					<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div>
					<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" >
					
					<label for=""><spring:message code="storNm"/></label>
					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2"  style="margin-left: 11px;">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for=""><spring:message code="btnSearchDate"/></label>
					<input type="text" id="P_START_DT" name="P_START_DT" class="datepicker2 datepicker" value="<c:out value="${today}"/>" readonly="readonly">
					~
					<input type="text" id="P_END_DT" name="P_END_DT" class="datepicker2 datepicker" value="<c:out value="${today}"/>" readonly="readonly">
					
					<label for=""><spring:message code="cancelFlag"/></label>
					<select id="P_CANC_FLAG" name="P_CANC_FLAG" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>

					<label for="">POS</label>
					<select id="P_POS_NO" name="P_POS_NO" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>				
					<label for=""><spring:message code="dealingsNumber"/></label>
					<input type="text" id="P_TRXN_NO"  name="P_TRXN_NO" maxlength="6"  class="wid2" value=""   />
				</div>
				<div class="last">					
					<label for=""><spring:message code="greTypeNm"/></label>
					<select id="P_GRE_TYPE" name="P_GRE_TYPE" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for=""><spring:message code="cusName"/></label>
					<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt"/>
					<input type="hidden" id="P_CUST_NO" name="P_CUST_NO" class="search_txt">
					<button type="button" onclick="btn_comm_user_search()" class="search_btn">검색 아이콘</button>					
					
					
					<label for=""><spring:message code="itmName"/></label>
					<input type="hidden" id="ITM_CODE" name="ITM_CODE"   >
					<input type="text" id="P_ITM_NAME" name="P_ITM_NAME" class="search_txt" >  
					<button type="button" class="search_btn"   onclick="btn_comm_store_search()">검색 아이콘</button>

					<label for=""><spring:message code="selngAmount"/></label>
					<input type="text" id="P_SELNG_AMOUNT1" name="P_SELNG_AMOUNT1" class="search_txt"/> ~ <input type="text" id="P_SELNG_AMOUNT2" name="P_SELNG_AMOUNT2" class="search_txt"/> 
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<!-- 매출속보 -->
			<div class="col2 sub_cnt">
				<div class="clear">
					<h3 class="bul_arr f_l"><spring:message code="selngTR"/></h3>
				</div>	 		
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
					<!-- <div class="gridPaging" id="gridPageNavigationDiv"/> -->						
				</div> 		 
			</div>
			
			<!-- 상품분류별 속보 -->
			<div class="col2 sub_cnt">
				<div class="tit_top clear">		 
					<h3 class="bul_arr f_l"><spring:message code="selngDetail" /></h3>
				</div>	
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder2"></div>
					</div>
				</div> 		 
			</div>
			
			<!-- 지불수단 -->
			<div class="col2 sub_cnt">
				<div class="tit_top clear">		 
					<h3 class="bul_arr f_l">지불수단</h3>
				</div>	
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder3"></div>
					</div>
				</div> 		 
			</div>					

		</div>
	</form>		
	<!-- //Content : 본문 영역 -->	 
	
	<div id="pop_wrap1">
		<header id="pop_head" class="clear">
			<h1 class="bul_arr f_l">POS영수증</h1>
			<div class="f_r">
				<button type="button" id="pop_btn_print" class="btn btn_style4" onclick="btn_print()"><spring:message code="print"/></button>
			</div>
		</header>
	 
		<form name="reg_frm" id="reg_frm">
			<input type="hidden" name="D_CORP_CODE" id="D_CORP_CODE" />	<!-- 기업코드 -->
			<input type="hidden" name="D_TYPE" id="D_TYPE" />			<!-- 1:insert, 2:update, 3:delete -->
			
			<div id="pop_cnt">
				<pre id="receipt_content"></pre>
			</div>
		</form>
	
	</div>
			
</body>
</html>
	
