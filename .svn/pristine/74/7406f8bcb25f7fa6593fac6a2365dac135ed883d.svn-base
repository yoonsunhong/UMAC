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
<%@page import ="java.util.Calendar" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><spring:message code="goalContrastAchiv"/></title>

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
	설명: 배달내역조회
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-05-11    김창열       초기작성 
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
<script type="text/javascript" src="/resources/js/page/salesinfo/report/salesInfoReportDlvr.js?ver=20180406_000" charset="utf-8"></script>
</head>
<c:set var="today" value="<%=new java.util.Date()%>" />
<fmt:formatDate value="${today}" pattern="yyyy-MM-dd" var="today"/>
<c:set value="${fn:substring(today,0,7)}-01" var="today2"/> 
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
	    		$("#btn_excel_search").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_excel_search").hide();
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
		    		$("#btn_excel_search").show();
		    	}else{
		    		$("#btn_excel_search").hide();
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

 	<form id="frm" name="frm">
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
					<button type="button" id="btn_excel_search" name="btn_excel_search" class="btn btn_style2"><spring:message code="btnExcelDown"/></button>
					<button type="button" id="btn_search" name="btn_search" class="btn btn_style3"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div id="top_search" class="search_area">
				<input type="hidden" id="P_USER_ID" name="P_USER_ID" />
				<input type="hidden" id="P_EMP_GUBUN" name="P_EMP_GUBUN" />
				<div>
					<label for=""><spring:message code="storNm"/></label>
					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for=""><spring:message code="inqireYear"/></label>					
					<input type="text" id="P_OPEN_DT" name="P_OPEN_DT" class="datepicker1" value="<c:out value="${today2}"/>" readonly="readonly" /> ~
					<input type="text" id="P_END_DT" name="P_END_DT" class="datepicker2" value="<c:out value="${today}"/>" readonly="readonly" />
					
					&nbsp;
					<!-- 영업사원 -->
					<input type="radio" id="member_ch_01" name="member_ch" value="01" onclick="member_change(this.value)" checked />
					<label for="member_ch_01" style="cursor:pointer;"><spring:message code="businessEmployee"/></label>					
					<input type="text" id="P_USER_NM_01" name="P_USER_NM_01" class="search_txt" />
					<button type="button" onclick="btn_comm_user_search();" class="search_btn" id="search_01">검색 아이콘</button>
					
					<!-- 배달사원 -->
					<input type="radio" id="member_ch_02" name="member_ch" value="02" onclick="member_change(this.value)" />
					<label for="member_ch_02" style="cursor:pointer;"><spring:message code="bsnEmpl"/></label>					
					<input type="text" id="P_USER_NM_02" name="P_USER_NM_02" class="search_txt" disabled />
					<button type="button" onclick="btn_comm_user_search_02();" class="search_btn" id="search_02" disabled>검색 아이콘</button>
				</div>
				<div class="last">	
					<label for="">주문방법</label>
					<select id="P_ORD_MTHD_FLAG" name="P_ORD_MTHD_FLAG" class="wid2">
						<option value=""><spring:message code="all"/></option>
						<option value="C">전화주문</option>
						<option value="V">방문주문</option>
					</select>
					<label for="">회원구분</label>
					<select id="P_BUSI_FLAG" name="P_BUSI_FLAG" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					<label for="">업종</label>
					<select id="P_INDUST_FLAG" name="P_INDUST_FLAG" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<!-- 매출속보 -->
			<div class="col2 sub_cnt">
				<div class="clear">
					<h3 class="bul_arr f_l"><spring:message code="deliveryList"/></h3>
				</div>	 		
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
				</div> 		 
			</div>
			
			<!-- 상품분류별 속보 -->
			<div class="col2 sub_cnt">
				<div class="tit_top clear">		 
					<h3 class="bul_arr f_l"><spring:message code="deliveryDetail"/></h3>
				</div>	
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder2"></div>
					</div>
				</div> 		 
			</div>			

		</div>
	</form>		
	<!-- //Content : 본문 영역 -->
	
</body>
</html>