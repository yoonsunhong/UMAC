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
<script type="text/javascript" src="/resources/js/page/business/credit/businessCredit.js?ver=20170628_001" charset="utf-8"></script>
<!-- 공통 팝업을 쓸 때 반드시 추가해야 한다. -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop_AlimTalk.jsp" />

</head>
 
 <body id="in_frame">
 	<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE}" />
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
				<button type="button" id="btn_update"  class="btn btn_style2"  onclick="btnAlimTalk()">알림톡전송</button>
				<!-- 권한에 따른 버튼 show/hide -->
				<c:if test="${sessionScope.AUTH_SAVE eq   'Y'}">
				    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="btnSave()"><spring:message code="btnSave"/></button>
				</c:if>
				<c:if test="${sessionScope.AUTH_SEARCH eq   'Y'}">
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="btnSearch()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</c:if>
				<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE}" />
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<div class="search_area"    id="top_search">
			<table>
				<tr>
					<th><label for=""><em>필수입력항목</em><spring:message code="storNm"/></label></th>
					<td>
						<select id="P_STR_CODE" name="P_STR_CODE" class="" disabled>
						</select>
					</td>
					<th><label fol=""><spring:message code="selngDate"/></label></th>
					<td>
						<input type="text" id="P_SALE_STR_DT" name="P_SALE_STR_DT" class="datepicker datepicker1 wid2"> ~ 
						<input type="text" id="P_SALE_END_DT" name="P_SALE_END_DT" class="datepicker datepicker2 wid2">
					</td>
					<th><label for=""><em>필수입력항목</em><spring:message code="cusName"/></label></th>
					<td>
						<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt">
						<input type="hidden" id="P_CUST_NO" name="P_CUST_NO">
						<button type="button" class="search_btn" onclick="btn_comm_user_search()">검색 아이콘</button>
					</td>				
				</tr>
				<tr>
					<th><label for=""><spring:message code="sellingSection"/></label></th>
					<td>
						<select id="P_CANC_FLAG" name="P_CANC_FLAG" class="mar_L2">
						</select>
					</td>
					<th><label for=""><spring:message code="pos"/></label></th>
					<td>
						<select id="P_POS_NO" name="P_POS_NO" class="mar_L2">
							<option value=""><spring:message code="all"/></option>
						</select>
					</td>
					<th><label for=""><spring:message code="trxnNo"/></label></th>
					<td>
						<input type="text" class="wid2" id="P_TRXN_NO" name="P_TRXN_NO">
					</td>
				</tr>
			</table>			
		</div>
		<%-- <div class="search_area"    id="top_search">
			<div>
				<label for=""><em>필수입력항목</em><spring:message code="storNm"/></label>
				&nbsp;&nbsp;
				<select id="P_STR_CODE" name="P_STR_CODE" class="" disabled>
				</select>
				<label fol="" class="mar_L8"><spring:message code="selngDate"/></label>
				<input type="text" id="P_SALE_STR_DT" name="P_SALE_STR_DT" class="datepicker datepicker1 wid2"> ~ 
				<input type="text" id="P_SALE_END_DT" name="P_SALE_END_DT" class="datepicker datepicker2 wid2">
				<label for=""><em>필수입력항목</em><spring:message code="cusName"/></label>
				<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt">
				<input type="hidden" id="P_CUST_NO" name="P_CUST_NO">
				<button type="button" class="search_btn" onclick="btn_comm_user_search()">검색 아이콘</button>				
			</div>
			<div class="last">
				<label for="">&nbsp; <spring:message code="sellingSection"/></label>
				<select id="P_CANC_FLAG" name="P_CANC_FLAG" class="mar_L2">
				</select>
				<label for="">&nbsp; <spring:message code="pos"/></label>
				&nbsp;&nbsp;&nbsp;
				<select id="P_POS_NO" name="P_POS_NO" class="mar_L2">
					<option value=""><spring:message code="all"/></option>
				</select>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;
				<label for="">&nbsp;<spring:message code="trxnNo"/></label>
				<input type="text" class="wid2" id="P_TRXN_NO" name="P_TRXN_NO">			
			</div>
		</div> --%>
		<!-- //조회폼 영역 -->
		
		<!-- <h3 class="bul_arr f_l">주문접수현황</h3>
		<span class="mar_L10 pad_T2 f_l">(더블 클릭시 '콜센터접수관리' 팝업을 제공합니다)</span>
		<div class="content">	
			<div id="gridHolder1"></div>
		</div>
		<div class="gridPaging" id="gridPageNavigationDiv"></div> -->
		
		<!--  그리드 영역 -->
		<div class="col2 sub_cnt" id="dataForm" name="dataForm">
			<div class="clear">
				<div class="lft_wid f_l">
					<h3 class="bul_arr f_l"><spring:message code="businessCredit"/></h3>
					<div class="f_r txt">
						<span id="TODAY_CUST_NAME" style="font-weight: bold;">..</span>
						님 당일 입금금액은 
						<span id="TODAY_DPOT_AMT" style="font-weight: bold; color: red;">0</span>
						원 입니다.
						<input type="hidden" id="SALE_UPOINT" name="SALE_UPOINT">
					</div>
					<!-- <div class="tit_sech f_r">
						<label for="">입금예정일</label>
						<input type="text" class="datepicker1 datepicker" id="" name="">
						<label for="" class="pad_L10">담당자</label>
						<input type="text" id="" name="" class="search_txt">
						<button type="button" class="search_btn mar_R0">검색 아이콘</button>						
					</div> -->
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder1"></div>
						</div>
						<!-- <div class="gridPaging" id="gridPageNavigationDiv"></div> -->
					</div>				
				</div>
				<div class="rgt_wid f_r">
					<h3 class="bul_arr">점별외상내역</h3>
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder6"></div>
						</div>
					</div>					
				</div>			
			</div>
			<div class="mar_T10">
				<div class="clear">
					<div class="lft_box f_l">
						<div class="clear">
							<h3 class="bul_arr f_l"><spring:message code="sellingSection"/></h3>
							<div class="f_r">
								<!-- <button type="button" class="btn btn_style4" onclick="addAccount()">외상매출추가</button> -->
								<button type="button" class="btn btn_style4" onclick="editSlip()">매출전표 수정</button>
								<button type="button" class="btn btn_style4" onclick="addAccount()"><spring:message code="insertCredit"/></button>
								<!-- <button type="button" class="btn btn_style4">행삭제</button> -->
							</div>
						</div>
						<div id="gridHolder2"></div>					
					</div>
					<div class="rgt_box f_r">
						<h3 class="bul_arr"><spring:message code="registCredit"/></h3>
						<!-- <div id="gridHolder3" style="background:red;width:100%;height:200px"></div> -->
						<div id="gridHolder3"></div>
					</div>
				</div>
			</div>
			<div class="mar_T10">
				<h3 class="bul_arr">선입금내역</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder5"></div>
					</div>
				</div>				
			</div>
		</div>
		
		
	</div>
	<!-- //Content : 본문 영역 -->
	
	<div id="pop_wrap1" style="display:none;">
		<header id="pop_head" class="clear">
			<h1 class="bul_arr f_l">입금외상매출내역</h1>
		</header>
		<div class="col2 sub_cnt">
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder4"></div>
				</div>
			</div> 		 
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
		
</body>
</html>
	
