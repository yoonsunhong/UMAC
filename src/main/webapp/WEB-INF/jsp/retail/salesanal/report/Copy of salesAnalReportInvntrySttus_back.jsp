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
<title><spring:message code="inventoryResult"/></title>

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
	설명: 재고결과현황
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-05-29    김창열       초기작성 
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

<script type="text/javascript" src="/resources/js/page/salesanal/report/salesAnalReportInvntrySttus.js?ver=20ssssdssddssssssssssssssㄴ_001" charset="utf-8"></script>
  
</head>
 <style>
 	.DATE_YM table.ui-datepicker-calendar { display:none; }  
</style> 

 <body id="in_frame">
 	<form name="frm" id="frm">
 		<input type="hidden" name="P_TAB" id="P_TAB" value="1"/>
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
						<button type="button" class="btn btn_style3"  id="btn_excel_down" name="btn_excel_down"><i class="fa fa-search"></i><spring:message code="btnExcelDown"/></button>
					</c:if>			
					<c:if test="${sessionScope.AUTH_SEARCH eq   'Y'}">
						<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
					</c:if>					
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div>
					<label for=""><spring:message code="storNm"/></label>
					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2" onchange="strCodeFunction()">
						<option value=""><spring:message code="all"/></option>
					</select>					
					
					<label for=""><spring:message code="btnSearchDate"/></label>					
					<input type="text" id="P_INV_DT" name="P_INV_DT" class="datepicker2 datepickerYm datepicker" value="" readonly="readonly">
					&nbsp;&nbsp;
					
					<label for=""><spring:message code="greGb"/></label>
					<select id="P_GRE_GB" name="P_GRE_GB">
						<option value=""><spring:message code="select"/></option>
					</select>
					
					<label for=""><spring:message code="goodsCl"/></label>
					<select id="P_LRG_CODE" name="P_LRG_CODE" class="wid2 wid_marR" onchange="chgCate1()">
						<option value=""><spring:message code="select"/></option>   
					</select>
					<select id="P_MID_CODE" name="P_MID_CODE" class="wid2 wid_marR" onchange="chgCate2()">
						<option value=""><spring:message code="select"/></option>   
					</select>
					<select id="P_CLS_CODE" name="P_CLS_CODE" class="wid2" onchange="chgCate3()">
						<option value=""><spring:message code="select"/></option>   
					</select>																											
				</div>				
			</div>
			<!-- //조회폼 영역 -->
			
			<!-- 재고결과현황 --> 			
			<div id="tab1" class="tab">
				<ul>	
					<li class="tab1 on">							
						<button class="tab_btn" id="bt_tab1"><spring:message code="majorCategory"/></button>
						<ul>
							<div id="gridHolder1"></div>
						</ul>						
					</li>
					<li class="tab2">						
						<button class="tab_btn" id="bt_tab2"><spring:message code="middleCategory"/></button>
						<ul>
							<div id="gridHolder2"></div>				
						</ul>
					</li>
					<li class="tab3">						
						<button class="tab_btn" id="bt_tab3"><spring:message code="subCategory"/></button>
						<ul>
							<div id="gridHolder3"></div>				
						</ul>
					</li>						
				</ul>			
			</div>
		</div>
	</form>		
	<!-- //Content : 본문 영역 -->	 
		
		
		

<!-- 	 상품정보 리스트 팝업 영역 시작  -->
<div id="show_product_pop"  >
	<header id="pop_head" class="clear">
		<div class="f_r"> 
		</div>
	</header> 
	<form action="">
		<div id="pop_wrap">  
				<header id="pop_head" class="clear">
					<h3 class="bul_arr f_l">  상품 리스트 <label id="SHOW_VEN_NAME" name="SHOW_VEN_NAME"></label> </h3> 
						
					 <div class="last"  style="text-align:right">
<!-- 					       점포선택 -->
<!-- 					 	<select id="STR_CODE" name="STR_CODE"> -->
<!-- 							<option value="">전체</option>  -->
<!-- 						</select> -->
						
<!-- 						포인트적립여부  -->
<!-- 						<select id="POINT_SAVE" name="POINT_SAVE"> -->
<!-- 							<option value="">전체</option>  -->
<!-- 							<option value="Y">적립</option>  -->
<!-- 							<option value="N">미적립</option>  -->
<!-- 						</select> -->
						
<!-- 						        상품명 -->
<!-- 						    <input type="hidden" id="SCAN_CODE" name="SCAN_CODE"   > -->
<!-- 							<input type="hidden" id="ITM_CODE" name="ITM_CODE"   > -->
<!-- 							<input type="text" id="ITM_NAME" name="ITM_NAME" class="search_txt" >   -->
<!-- 							 onBlur="chgItmName()" -->
<!-- 							<img src="/resources/img/common/search_ico.png" onclick="btn_comm_store_search()" > -->
<!-- 							<button type="button" class="search_btn"   >검색 아이콘</button> -->
						
					 	 <button type="button" id="btn_update"  class="btn btn_style2" onclick="venProductExcelDown()" >엑셀다운로드</button>
						 <button type="button" id="btn_update"  class="btn btn_style2" onclick="salesAnalProductList()" >조회</button>
						 <button type="button" id="btn_update"  class="btn btn_style2" onclick="btn_pop_close()" >닫기</button>
					 </div>
				</header>
<!-- 				<div class="search_area" id="top_search11"> -->
<!-- 					<div class="last"  style="text-align:right"> -->
						
<!-- 					</div>  -->
<!-- 				</div>  -->
				<div class="content">
					<div id="gridHolder4"></div>
				</div> 
		</div>
	</form>

</div>
<!-- 	  상품정보 리스트 팝업 영역  끝  -->
		
		
		
		
		
		
		
		
</body>
</html>
	