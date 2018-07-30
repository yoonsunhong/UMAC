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
<title><spring:message code="ThngPrflosSttus"/></title>

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
<script type="text/javascript" src="/resources/js/page/salesanal/report/salesAnalReportSingle.js" charset="utf-8"></script>

	 
</head>
 
<c:set var="today" value="<%=new java.util.Date()%>" />
<fmt:formatDate value="${today}" pattern="yyyy-MM-dd" var="today"/>
<c:set value="${fn:substring(today,0,7)}-01" var="today2"/>
 
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
				    <c:if test="${sessionScope.AUTH_EXCEL_DOWN eq   'Y'}">
						<button type="button" class="btn btn_style3"  id="btn_excel_search" name="btn_excel_search"><i class="fa fa-search"></i><spring:message code="btnExcelDown"/></button>
					</c:if>			
					<c:if test="${sessionScope.AUTH_SEARCH eq   'Y'}">
						<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
					</c:if>			
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div>
					<label for=""><spring:message code="storNm"/>&nbsp;&nbsp;</label>
					<select id="P_STR_CODE" name="P_STR_CODE" style="width:100px">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for=""><spring:message code="selngDate"/></label>					
					<input type="text" id="P_OPEN_DT" name="P_OPEN_DT" class="datepicker1" value="<c:out value="${today2}"/>" readonly="readonly"> ~ 
					<input type="text" id="P_END_DT" name="P_END_DT" class="datepicker2" value="<c:out value="${today}"/>" readonly="readonly">	
					
					&nbsp;&nbsp;
					<label for=""><spring:message code="supply"/></label>		
					<input type="text" id="P_VEN_NAME" name="P_VEN_NAME" class="search_txt"/> <button type="button" class="search_btn"  id="P_VEN_NAME_SEARCH" name="P_VEN_NAME_SEARCH">searchIcon</button>
					
					<label for=""><spring:message code="itmName"/></label>		
					<input type="text" id="P_ITM_SHORT_NAME" name="P_ITM_SHORT_NAME" class="search_txt"/> <button type="button" class="search_btn"  id="P_ITM_NAME_SEARCH" name="P_ITM_NAME_SEARCH">searchIcon</button>
				</div>
				<div class="last">
					<label for=""><spring:message code="goodsCl"/></label>
					<select id="P_LRG_CODE" name="P_LRG_CODE" style="width:100px" onchange="chgCate1()">
						<option value=""><spring:message code="select"/></option>   
					</select>
					<select id="P_MID_CODE" name="P_MID_CODE" style="width:100px" onchange="chgCate2()">
						<option value=""><spring:message code="select"/></option>   
					</select>
					<select id="P_CLS_CODE" name="P_CLS_CODE" style="width:150px" onchange="chgCate3()">
						<option value=""><spring:message code="select"/></option>   
					</select>					
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<!-- 매출속보 -->
			<div class="col2 sub_cnt">
				<div class="clear">
					<h3 class="bul_arr f_l"><spring:message code="ThngPrflosSttus"/></h3>
				</div>	 		
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
					<div class="gridPaging" id="gridPageNavigationDiv"/>
				</div> 		
			</div>
		</div>
	</form>		
	<!-- //Content : 본문 영역 -->	 
		
</body>
</html>
	
