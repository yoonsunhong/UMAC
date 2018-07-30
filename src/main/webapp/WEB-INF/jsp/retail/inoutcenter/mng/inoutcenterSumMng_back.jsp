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
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title><spring:message code="commonCodeManagement"/></title>
<link type="text/css" rel="stylesheet" href="/resources/css/jquery-ui.css">
<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">
<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->
<script type="text/javascript" src="/resources/js/jquery-1.7.1.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery-ui.js"></script>
<script src="/resources/js/style.js"></script>
<%--
	설명: 주문배달관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-12    권용욱       초기작성 
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
<script type="text/javascript" src="/resources/js/page/inoutcenter/mng/inoutcenterSumMng.js"  charset="utf-8"></script>
<!-- 공통 팝업을 쓸 때 반드시 추가해야 한다. -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
	
</head>
 
 <body id="in_frame">
	<div id="iframeCnt">
		<div class="btn_area clear">
			<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png"><spring:message code="btnHelp"/></button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a">도움말 닫기</a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
			<div class="f_r">
				<!-- 권한에 따른 버튼 show/hide -->
				<button type="button" id="btn_create" class="btn btn_style2" onclick="btn_print()">총합계출력</button>
				<button type="button" id="btn_create" class="btn btn_style2" onclick="btn_print2()">내부거래출력</button>
				<c:if test="${sessionScope.AUTH_SEARCH eq 'Y'}">
					<button type="button" class="btn btn_style3" id="btn_search" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</c:if>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<div class="search_area"    id="top_search">
			<div class="last">
				<form name="frm" id="frm">
					<!-- 	다중 출력용 파라미터  -->
					<input type="hidden"       id="CORP_CODE"  name="CORP_CODE" value="${sessionScope.CORP_CODE}" />
					
					<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE}" />
					<label for=""><em>필수입력항목</em>대출점포</label>
					<select id="P_STR_CODE" name="P_STR_CODE" class="" >
					</select>
					<label for="">대입점포</label>
					<select id="P_DIN_STR_CODE" name="P_DIN_STR_CODE" class="">
					</select>
					<label fol=""><spring:message code="selngDate"/></label>
					<input type="text" id="P_DOUT_STR_DT" name="P_DOUT_STR_DT" class="datepicker datepicker1 wid2"> ~ 
					<input type="text" id="P_DOUT_END_DT" name="P_DOUT_END_DT" class="datepicker datepicker2 wid2">
					<label for="">확정여부</label>
					<select id="P_CFM_YN" name="P_CFM_YN" class="">
						<option value="">전체</option>
						<option value="Y">확정</option>
						<option value="N">미확정</option>
					</select>
				</form>
			</div>
		</div>
		<!-- //조회폼 영역 -->
		<div class="p_r clear">
			<div class="lft_wid f_l">
				<h3 class="bul_arr">점 대출</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1">
						</div>
					</div>
				</div>
			</div>
			
			<div class="rgt_wid f_r">
				<h3 class="bul_arr">센터 대출</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder3">
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<br />
		<div class="p_r clear">
			<div class="lft_wid f_l">
				<h3 class="bul_arr">점 대입</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder2">
						</div>
					</div>
				</div>
			</div>
			<div class="rgt_wid f_r">
				<h3 class="bul_arr">센터 대입</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder4">
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<br />
		<div class="col2 sub_cnt">
			<h3 class="bul_arr">총합계</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder5">
					</div>
				</div>
			</div>
		</div>
		
	</div>
	<!-- //Content : 본문 영역 -->
		
</body>
</html>
	
