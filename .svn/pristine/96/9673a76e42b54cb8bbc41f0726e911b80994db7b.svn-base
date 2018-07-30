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
<meta http-equiv="Cache-Control" content="no-cache" />
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
<script type="text/javascript" src="/resources/js/page/business/orderdelivery/businessOrderDelivery.js?ver=20180405_000" charset="utf-8"></script>
<!-- 공통 팝업을 쓸 때 반드시 추가해야 한다. -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
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
	    		$("#btn_update").hide();
	    		$("#btn_read").hide();
	    		$("#btn_excel").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_update").hide();
	    		$("#btn_read").hide();
	    		$("#btn_excel").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_read").show();
		    	}else{
		    		$("#btn_read").hide();
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
		    		$("#btn_excel").show();
		    	}else{
		    		$("#btn_excel").hide();
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
				<button type="button" id="btn_excel"  class="btn btn_style2" onclick="btnExcelDown();"><spring:message code="btnExcelDown"/></button>
				<%-- 출력 일단 보류 --%>
	   			<%-- <button type="button" id="btn_print"  class="btn btn_style2"  onclick="btn_print()"><spring:message code="print"/></button> --%>
			    <button type="button" id="btn_update"  class="btn btn_style2" onclick="btnSave();"><spring:message code="btnSave"/></button>
				<button type="button" id="btn_read" class="btn btn_style3" onclick="btnSearchGrid(false, true);"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<div id="top_search" class="search_area">
			<input type="hidden" id="pageIndex" 		name="pageIndex" 			value="1" />
			<input type="hidden" id="pageUnit" 			name="pageUnit" 			value="25" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
			<input type="hidden" id="pageSize" 			name="pageSize" 			value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
			<input type="hidden" id="P_COLUMN_NAME" 	name="P_COLUMN_NAME" />
			<input type="hidden" id="P_ORDERBY" 		name="P_ORDERBY" />
			<input type="hidden" id="P_PRINT_CORP_CODE"	name="P_PRINT_CORP_CODE"	value="" />
			<input type="hidden" id="P_PRINT_ORD_DT"  	name="P_PRINT_ORD_DT"/>
			<input type="hidden" id="P_PRINT_SLIP_NO"  	name="P_PRINT_SLIP_NO"/>
			<input type="hidden" id="CORP_CODE" 		name="CORP_CODE" 			value="${sessionScope.CORP_CODE}" />
			
			<div>
				<label for=""><em>필수입력항목</em><spring:message code="storNm"/></label>
				<select id="P_STR_CODE" name="P_STR_CODE" onchange="getOrdEmp();"></select>
				
				<label fol="" style="margin-left:32px;"><em>필수입력항목</em><spring:message code="orderDate"/></label>
				<input type="text" id="P_ORD_SD" name="P_ORD_SD" class="datepicker datepicker1 wid2" />
				~
				<input type="text" id="P_ORD_ED" name="P_ORD_ED" class="datepicker datepicker2 wid2" />
				
				<label for="" style="margin-left:17px;"><spring:message code="ordStat"/></label>
				<select id="P_ORD_STAT" name="P_ORD_STAT" class="wid2"></select>
				
				<label for=""><spring:message code="slipNo"/></label>
				<input type="text" id="P_SLIP_NO" name="P_SLIP_NO" class="wid2" />						
			</div>
			<div class="last">
				&nbsp;
				<label for=""><spring:message code="cusName"/></label>
				<input type="hidden" id="P_CUST_NO" name="P_CUST_NO" />
				<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt" />
				<button type="button" class="search_btn" onclick="btn_comm_user_search_top();">검색 아이콘</button>
				<label for="">배달사원</label>
				<select id="P_ORD_EMP" name="P_ORD_EMP" class="wid2">
					<option value=""><spring:message code="all"/></option>
				</select>
			</div>
		</div>
		<!-- //조회폼 영역 -->
		
		<!-- <h3 class="bul_arr f_l">주문접수현황</h3>
		<span class="mar_L10 pad_T2 f_l">(더블 클릭시 '콜센터접수관리' 팝업을 제공합니다)</span>
		<div class="content">	
			<div id="gridHolder1"></div>
		</div>
		<div class="gridPaging" id="gridPageNavigationDiv"></div> -->
		
		<!--  그리드 영역 -->
		<div id="dataForm" name="dataForm" class="col2 sub_cnt">
			<div class="mar_B2 clear">
				<h3 class="bul_arr f_l">주문배달관리</h3>
				<div class="tit_sech f_l">
					<label for=""><em>필수입력항목</em><spring:message code="ordStat"/></label>
					<select id="ORD_STAT" name="ORD_STAT"></select>
					<label for=""><em>필수입력항목</em><spring:message code="fishDate"/></label>
					<input type="text" id="FISH_DT" name="FISH_DT" class="datepicker1 datepicker" />
				</div>
				<div class="tit_sech f_r">
					<label for="">총 배달건수</label>
					<input type="text" id="T_TOT_CNT" name="T_TOT_CNT" class="wid2" style="width:50px;text-align:right;" readonly />	
					<label for="">총 금액</label>
					<input type="text" id="T_TOT_AMT" name="T_TOT_AMT" class="wid2" style="width:90px;text-align:right;margin-right:0px;" readonly />	
				</div>
			</div>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
				<div class="gridPaging" id="gridPageNavigationDiv"></div>
			</div>
		</div>
	</div> 
	<!-- //Content : 본문 영역 -->
		
	<div id="pop_wrap1">
		<header id="pop_head" class="clear">
			<div class="f_r">
				<!-- 
				<button type="button" class="btn btn_style4" onclick="btn_pop_new()"><spring:message code="btnNew"/></button>
				<button type="button" class="btn btn_style4" onclick="btn_pop_add()"><spring:message code="add"/></button>
				<button type="button" class="btn btn_style4" onclick="btn_pop_apply()"><spring:message code="apply"/></button>
				<button type="button" class="btn btn_style4" onclick="btn_pop_cancel()"><spring:message code="btnCancle"/></button>
				 -->
			</div>
		</header>
		<div id="pop_cnt">
			<h3 class="bul_arr">매출세부내역</h3>
			<div id="gridHolder2"></div>
		</div>
	</div>		
		
</body>
</html>