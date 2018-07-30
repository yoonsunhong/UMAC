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
	설명: 외상매출미수채권
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-01-02    오동근       초기작성 
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
<script type="text/javascript" src="/resources/js/page/salesmng/credit/salesMngCredit.js" charset="utf-8"></script>	

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
					<button type="button" id=""  class="btn btn_style2"  onclick="">출력</button>
				    <button type="button" id=""  class="btn btn_style2"  onclick="">엑셀</button>
					<button type="button" id="" class="btn btn_style3"  onclick=""><i class="fa fa-search"></i>조회</button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for="">조회일자</label>
					<input type="text" class="datepicker1 datepicker" id="" name=""> ~ <input type="text" class="datepicker2 datepicker" id="" name="">			
					<label for="">점포명</label>
					<select id="" name="">
						<option value="">전체</option> 
						<option value="1"></option>
						<option value="2"></option>
						<option value="3"></option>
					</select>
					<label for="">회원그룹</label>
					<select id="" name="">
						<option value="">전체</option> 
						<option value="1"></option>
						<option value="2"></option>
						<option value="3"></option>
					</select>	
					<label for="">회원명</label>
					<input type="text" id="" name="" class="search_txt">
					<button type="button" class="search_btn">검색 아이콘</button>					
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<h3 class="bul_arr f_l">외상매출미수채권내역 (더블클릭시 상세내역 제공)</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
			</div>
			
		</div>
		<!-- //Content : 본문 영역 -->
	 

	<div id="wrap1">
		<div id="iframeCnt">
			<div class="col2 sub_cnt">
	 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
</body>
</html>
	
