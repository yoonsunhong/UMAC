<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

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
<title>매출목표관리</title>

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
	2016-12-20    김창열       초기작성 
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

<script type="text/javascript" src="/resources/js/page/salesinfo/goal/salesInfoGoal.js?ver=20180308_005" charset="utf-8"></script>
<script language="javascript">
	$(document).ready(function () {	    
		datePickerYearMonth();
	});
</script>	 
</head>
<style>  
 	.DATE_YM table.ui-datepicker-calendar { display:none; }
</style> 
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
	    		$("#btn_excel_down").hide();
	    		$("#btn_save").hide();
	    		$("#btn_new").hide();
	    		$("#btn_del").hide();
	    		$("#btn_search").hide();

	    		$("#btn_pop_upload_sample").hide();
	    		$("#btn_pop_upload").hide();
	    		$("#btn_pop_down").hide();
	    		$("#btn_pop_save").hide();
	    		$("#btn_pop_search").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_excel_down").hide();
	    		$("#btn_save").hide();
	    		$("#btn_new").hide();
	    		$("#btn_del").hide();
	    		$("#btn_search").hide();

	    		$("#btn_pop_upload_sample").hide();
	    		$("#btn_pop_upload").hide();
	    		$("#btn_pop_down").hide();
	    		$("#btn_pop_save").hide();
	    		$("#btn_pop_search").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_search").show();
		    		$("#btn_pop_search").show();
		    	}else{
		    		$("#btn_search").hide();
		    		$("#btn_pop_search").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#btn_new").show();
		    	}else{
		    		$("#btn_new").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_pop_save").show();
		    	}else{
		    		$("#btn_pop_save").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#btn_del").show();
		    	}else{
		    		$("#btn_del").hide();
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#btn_excel_down").show();
		    		$("#btn_pop_down").show();
		    	}else{
		    		$("#btn_excel_down").hide();
		    		$("#btn_pop_down").hide();
		    	}
		    	
		    	//엑셀업로드버튼 제어
		    	if(data[0].AUTH_EXCEL_UPLOAD == 'Y'){
		    		$("#btn_pop_upload_sample").show();
		    		$("#btn_pop_upload").show();
		    	}else{
		    		$("#btn_pop_upload_sample").hide();
		    		$("#btn_pop_upload").hide();
		    	}
		    	
		    	//프린트, 출력 버튼 제어
		    	if(data[0].AUTH_PRINT == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//승인 버튼 제어
		    	if(data[0].AUTH_SUBMIT == 'Y'){
		    		$("#btn_save").show();
		    	}else{
		    		$("#btn_save").hide();
		    	}
		    	
		    	//생성 버튼 제어
		    	if(data[0].AUTH_CREATE == 'Y'){
		    		
		    	}else{
		    		
		    	}
	    	}
	    	
	    	//관리구분별 점포조회권한설정
	    	if(data[0].ORG_TYPE == "3") {
	    		//점포조회조건 제어.
	    		$("#top_search select[id='P_STR_CODE']").val(loadData.STR_CODE);
	    		$("#top_search select[id='P_STR_CODE']").prop("disabled", true);
	    		$("#pop_frm select[id='P_STR_CODE']").val(loadData.STR_CODE);
	    		$("#pop_frm select[id='P_STR_CODE']").prop("disabled", true);
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
					<button type="button" class="btn btn_style2"  id="btn_excel_down" name="btn_excel_down"><spring:message code="btnExcelDown"/></button>
				    <button type="button" class="btn btn_style2"  id="btn_save" name="btn_save"><spring:message code="btnSubmit"/></button>
					<button type="button" class="btn btn_style2"  id="btn_new" name="btn_new"><spring:message code="btnNew"/></button>
					<button type="button" class="btn btn_style2"  id="btn_del" name="btn_del"><spring:message code="btnDel"/></button>
					<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<!-- 점포명 -->
					<label for=""><spring:message code="storNm"/></label>
					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					<!-- 조회년도 -->
					<label for=""><spring:message code="inqireYear"/></label>
					<select id="P_YYYY" name="P_YYYY" class="wid3">
						<c:set var="today" value="<%=new java.util.Date()%>" />
						<fmt:formatDate value="${today}" pattern="yyyy" var="start"/> 
						<c:forEach begin="0" end="10" var="idx" step="1">
							<c:set var="startNum" value="${start - idx + 1}"/>
							<option value="<c:out value="${start - idx + 1}" />" <c:if test="${startNum eq start}"> selected="selected" </c:if>>
								<c:out value="${start - idx + 1}" />
							</option>
						</c:forEach>
					</select>
					<!-- 구분 -->
					<label for=""><spring:message code="se"/></label>
					<input type="radio" id="P_SELNG1" name="P_SELNG" value="1" checked="checked" />
					<label for="P_SELNG1" style="cursor:pointer;"><spring:message code="selngAm"/></label>
					<input type="radio" id="P_SELNG2" name="P_SELNG" value="2" />
					<label for="P_SELNG2" style="cursor:pointer;"><spring:message code="selngProfit" /></label>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<!-- 매출/매출이익목표 -->
			<div class="col2 sub_cnt">
				<div class="clear">
					<h3 class="bul_arr f_l"><spring:message code="selngProfitGoal"/></h3>
				</div>	 		
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
				</div> 		 
			</div>
			
			<!-- 상품분류별 목표 -->
			<div class="col2 sub_cnt">
				<div class="tit_top clear">		 
					<h3 class="bul_arr f_l"><spring:message code="goodsClAcctoGoal"/></h3>
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
		
	<!-- 등록 수정 팝업 영역 시작  -->
	<div id="pop_wrap">
		<header id="pop_head" class="clear">
			<h1 class="bul_arr f_l"><spring:message code="selngGoalManagePop"/></h1>
		</header>
		
		<form name="pop_frm" id="pop_frm">
			<input type="hidden" name="s_corp_code" id="s_corp_code" value="${sessionScope.CORP_CODE}">
			<input type="hidden" name="s_str_code" id="s_str_code" value="${sessionScope.STR_CODE}">
			<input type="hidden" name="s_id" id="s_id" value="${sessionScope.ID}">
		<!-- 조회폼 영역 -->
		<div class="search_area" id="top_search">
			<div class="last">
				<label for=""><spring:message code="storNm"/></label>
				<!-- 점포명 -->
				<select id="P_STR_CODE" name="P_STR_CODE" class="wid2">
					<option value=""><spring:message code="all"/></option>
				</select>
				<!-- 참고년월 -->
				<label for=""><spring:message code="referYearMonth"/></label>
				<input type="text" id="P_YYYYMM" name="P_YYYYMM" class="datepicker1 datepickerYm" value="" readonly="readonly" />
				<div class="f_r">
					<button type="button" class="btn btn_style4" id="btn_pop_upload_sample" name="btn_pop_upload_sample"><spring:message code="btnExcelUploadSample"/></button>
					<button type="button" class="btn btn_style4" id="btn_pop_upload" name="btn_pop_upload"><spring:message code="btnExcelUpload"/></button>
					<button type="button" class="btn btn_style4" id="btn_pop_down" name="btn_pop_down"><spring:message code="btnExcelDown"/></button>
					<button type="button" class="btn btn_style4" id="btn_pop_save" name="btn_pop_save"><spring:message code="btnSave"/></button>
					<button type="button" class="btn btn_style4" id="btn_pop_search" name="btn_pop_search"><spring:message code="btnSearch"/></button>
				</div>				
			</div>
		</div>
		<!-- //조회폼 영역 -->		
		</form>
				
		<div id="pop_cnt" class="clear p_r">		
			<div class="sec_grid f_l">
				<div class="pop_tit2 clear">
					<h1 class="bul_arr f_l"><spring:message code="IrdsRtBndeApplc"/></h1>
					<div class="f_r">
						<input type="text" id="P_SELNGAM" name="P_SELNGAM" class="variation1" value="0"><span>%</span>
						<input type="text" id="P_SELNGPROFIT" name="P_SELNGPROFIT" class="variation2" value="0"><span>%</span>
					</div>
				</div>				
				<div class="content">
					<div id="gridHolder3"></div>
				</div>
			</div> 
			<div class="pop_btn_updown p_a">
				<button type="button" class="btn btn_up btn_style4" id="btn_right" name="btn_right">&gt;&gt;</button>
				<button type="button" class="btn btn_down btn_style4" id="btn_left" name="btn_left">&lt;&lt;</button>
			</div>
			<div class="sec_grid f_r">
				<div class="pop_tit2">
					<h1 class="bul_arr f_l"><spring:message code="createDate"/></h1>
					<input type="text" id="CREAT_YYYYMM" name="CREAT_YYYYMM" class="datepicker1 datepickerYm" value="" readonly="readonly">					
				</div>	
				<div class="content">
					<div id="gridHolder4"></div>
				</div>
			</div> 
		</div>		
	
	</div>
	<!--  등록 수정 팝업 영역 끝  -->		
</body>
</html>
	
