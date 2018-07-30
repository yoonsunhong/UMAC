<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- 스프링 메세지 테그사용 :: 다국어 -->
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@page import ="java.util.Calendar" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><spring:message code="bestWorst20"/></title>

<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">

<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	
<script src="/resources/js/style.js"></script>

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<!-- 공통 팝업 -->


<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->
<!--[if IE]><script language="javascript" type="text/javascript" src="/resources/js/rMateGridH5/JS/shim.js"></script><![endif]-->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>	 
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />	

<script type="text/javascript" src="/resources/js/page/salesinfo/item/deliverDayState.js?ver=20180406_000" charset="utf-8"></script>
</head>
<style>  
 	.DATE_YM table.ui-datepicker-calendar { display:none; }
</style>
<%
	//전달구하기
	Calendar mon = Calendar.getInstance();
	String nowMonth = new java.text.SimpleDateFormat("yyyy-MM").format(mon.getTime());
	String beforeMonth = nowMonth.substring(0,4).concat("-01");	
%>
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
				<button type="button" class="btn btn_style2"  id="btn_print" name="btn_print" onclick="fnPrint();">차트</button>
				<button type="button" class="btn btn_style2"  id="btn_excel_down" name="btn_excel_down"><i class="fa fa-file-excel-o"></i> <spring:message code="btnExcelDown"/></button>
				<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i> <spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form name="sertch_frm" id="sertch_frm">			
			<div class="search_area" id="top_search">
				<div class="last">
					<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE}" />
					<input type="hidden" name="P_EMP_NO" id="P_EMP_NO" value="<%=getEnv().getUserId()%>" />
					<input type="hidden" name="URL" id="URL" value="" />
							
					<label for="" class=""><em>필수입력항목</em><spring:message code="storNm"/></label> &nbsp;&nbsp;
					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2"></select>		
					
					<label for=""><em>필수입력항목</em><spring:message code="inqireYear"/></label>					
					<input type="text" id="P_START_MM" name="P_START_MM" class="datepicker1 datepickerYm3" value="<%=beforeMonth%>" readonly="readonly" /> ~ 
					<input type="text" id="P_END_MM" name="P_END_MM" class="datepicker2 datepickerYm4" value="<%=nowMonth%>" readonly="readonly" />
				</div>
			</div>
		</form>
		<!-- //조회폼 영역 -->
		
		<!-- >요일별/월별배달집계(배달건수) -->
		<div class="col2 sub_cnt">
			<div class="clear">
				<h3 class="bul_arr f_l">요일별/월별배달집계(배달건수)</h3>
			</div>	 		
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
			</div> 		 
		</div>
		<br>
		<!-- >요일별/월별배달집계(배달매출액) -->
		<div class="col2 sub_cnt">
			<div class="clear">
				<h3 class="bul_arr f_l">요일별/월별배달집계(배달매출액)</h3>
			</div>	 		
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder2"></div>
				</div>
			</div> 		 
		</div>
		
	</div>
		
</body>
</html>