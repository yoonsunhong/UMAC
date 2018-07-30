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
<%@page import ="java.util.Calendar" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><spring:message code="monthGoodsRcvPaySearch"/></title>

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
	설명: 월상품수불장조회
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-04-06    김창열       초기작성 
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
<script type="text/javascript" src="/resources/js/page/salesinfo/report/salesInfoReportRcvPayMonth.js?ver=20180409_009" charset="utf-8"></script>
</head>

<script language="javascript">
	$(document).ready(function () {	    
		datePickerYearMonth();
	});
</script>
</head>
<style>  
 	.DATE_YM table.ui-datepicker-calendar { display:none; }
</style>
<%
	//전달구하기
	Calendar mon = Calendar.getInstance();
	String nowMonth = new java.text.SimpleDateFormat("yyyy-MM").format(mon.getTime());	
	mon.add(Calendar.MONTH , -1);	
	String beforeMonth = new java.text.SimpleDateFormat("yyyy-MM").format(mon.getTime());		
	
	String P_START_DATE = beforeMonth + "-01";
	String P_END_DATE = beforeMonth + "-" + mon.getActualMaximum(Calendar.DATE);
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
	    		$("#btn_excel_search").hide();
	    		$("#btn_search").hide();
	    		$("#btn_batch_search").hide();
	    		$("#btn_batch_execution").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_excel_search").hide();
	    		$("#btn_search").hide();
	    		$("#btn_batch_search").hide();
	    		$("#btn_batch_execution").hide();
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
		    		$("#btn_batch_search").show();
		    		$("#btn_batch_execution").show();
		    	}else{
		    		$("#btn_batch_search").hide();
		    		$("#btn_batch_execution").hide();
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
						<button type="button" class="btn btn_style2"  id="btn_batch_search" name="btn_batch_search"><spring:message code="monthGoodsRcvPayCreate"/></button>
						<button type="button" class="btn btn_style2"  id="btn_excel_search" name="btn_excel_search"><spring:message code="btnExcelDown"/></button>
						<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><spring:message code="storNm"/></label>

					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for=""><spring:message code="selngDate"/></label>
					<input type="text" id="P_INV_MT" name="P_INV_MT" class="datepicker1 datepickerYm" value="<%=beforeMonth%>" readonly="readonly">
					&nbsp;&nbsp;
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
			
			<!-- 점포별 -->
			<div class="col2 sub_cnt">
				<div class="clear">
					<h3 class="bul_arr f_l"><spring:message code="storeTy"/></h3>
				</div>	 		
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
				</div> 		 
			</div>
			
			<!-- 상품분류별 -->
			<div class="col2 sub_cnt">
				<div class="tit_top clear">		 
					<h3 class="bul_arr f_l"><spring:message code="goodsClAccto"/></h3>
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
			<h1 class="bul_arr f_l"><spring:message code="monthGoodsRcvPayCreate"/></h1>
		</header>
		
		<form name="pop_frm" id="pop_frm">
			<input type="hidden" name="P_START_DATE" id="P_START_DATE" value="<%=P_START_DATE%>">
			<input type="hidden" name="P_END_DATE" id="P_END_DATE" value="<%=P_END_DATE%>">
		<!-- 조회폼 영역 -->
		<div class="search_area" id="top_search">
			<div class="last">
				<label for=""><spring:message code="createDate"/></label>
				<input type="text" value="<%=beforeMonth%>" readonly="readonly" style="text-align:center; width:100px;">
				
				<div class="f_r">
					<button type="button" class="btn btn_style4" id="btn_batch_execution" name="btn_batch_execution"><spring:message code="batchExecution"/></button>
				</div>				
			</div>
		</div>
		<!-- //조회폼 영역 -->		
		</form>
	</div>
	<!--  등록 수정 팝업 영역 끝  -->				 
		
</body>
</html>
	
