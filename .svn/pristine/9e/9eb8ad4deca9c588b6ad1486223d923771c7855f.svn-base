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
<title>임대을매출현황</title>

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
	설명: 공통코드관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-01-09    김창열       초기작성 
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

<script type="text/javascript" src="/resources/js/page/salesinfo/report/salesInfoReportLease.js" charset="utf-8"></script>

	 
</head>
 
 <body id="in_frame">
 	<form name="frm" id="frm">
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
						<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i>출력</button>
				    <c:if test="${sessionScope.AUTH_EXCEL_DOWN eq   'Y'}">
						<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i><spring:message code="btnExcelDown"/></button>
					</c:if>						
					<c:if test="${sessionScope.AUTH_SEARCH eq   'Y'}">
						<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
					</c:if>			
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><spring:message code="storNm"/></label>

					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for="">매출일자</label>
					<c:set var="today" value="<%=new java.util.Date()%>" />
					<fmt:formatDate value="${today}" pattern="yyyy-MM-dd" var="today"/>
					<c:set value="${fn:substring(today,0,7)}-01" var="today2"/>
					
					<input type="text" id="" name="" class="datepicker1" value="<c:out value="${today2}"/>" readonly="readonly"> ~ 
					<input type="text" id="" name="" class="datepicker1" value="<c:out value="${today}"/>" readonly="readonly"> 
					
					<label for="">협력업체</label>
					<input type="text" id="" name="" value="" readonly="readonly">
					<button type="button" class="btn btn_style2"  id="" name=""><spring:message code="btnSearch"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<!-- 매출속보 -->
			<div class="col2 sub_cnt">
				<div class="clear">
					<h3 class="bul_arr f_l">임대을매출현황</h3>
				</div>	 		
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
				</div> 		 
			</div>
		</div>
	</form>		
	<!-- //Content : 본문 영역 -->	 
		
</body>
</html>
	
