<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
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
<title>공통코드 관리</title>

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
	설명: 영업정보 > 재고정보 > 손익생산
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-11-10    윤태희       초기작성 
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
<script type="text/javascript" src="/resources/js/page/stock/profitandloss/stockprofitAndLoss.js?ver=20180306_01" charset="utf-8"></script>
<script language="javascript">
	$(document).ready(function () {	    
		datePickerYearMonth();
	});
</script>
</head>
<style type="text/css">
	#loading_bar {
		position:absolute;
		top:50%;
		left:50%;
		width:70px;
		height:70px;
		overflow:hidden;
		/*background-color:#FC0;*/
		margin-top:-90px;
		margin-left:-100px;
	}
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
	    	//alert(data);
	    	
	    	//사용자 기능별 권한관리 데이터가 없으면 모든 버튼 숨김
	    	if(data == ""){
	    		$("#btn_profitAndLoss").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_profitAndLoss").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		
		    	}else{
		    		
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
		    		
		    	}else{
		    		
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
		    		$("#btn_profitAndLoss").show();
		    	}else{
		    		$("#btn_profitAndLoss").hide();
		    	}
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
				<!-- 권한에 따른 버튼 show/hide -->
				<%-- <c:if test="${sessionScope.AUTH_EXCEL_DOWN eq   'Y'}">
					    <button type="button" id="btn_excel"  class="btn btn_style2"  onclick="excelExport()"><spring:message code="btnExcelDown"/></button>
					</c:if>
				<c:if test="${sessionScope.AUTH_SEARCH eq 'Y'}">
					<button type="button" class="btn btn_style3" id="btn_search" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</c:if> --%>
			</div>
		</div>
		
		<form id="frm" name="frm">
			<input type="hidden" id="S_CORP_CODE" 		name="S_CORP_CODE" 		value="${sessionScope.CORP_CODE }" />
			<input type="hidden" id="SESSION_STR_CODE" 	name="SESSION_STR_CODE" value="${sessionScope.STR_CODE}" />
			<input type="hidden" id="P_WORK_DT" 		name="P_WORK_DT" 		value="" />
			<input type="hidden" id="P_WORK_TYPE" 		name="P_WORK_TYPE" 		value="" />
						
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><spring:message code="store"/></label>
					<!-- <select id="S_STR_CODE" name="S_STR_CODE"  onchange="changeTopSelectStrCode(this.value)"> -->
					<select id="S_STR_CODE" name="S_STR_CODE" >
						<option value=""><spring:message code="all"/></option>
					</select>
						<label for=""><em>필수입력항목</em>작업년월</label>
						<input type="text" id="P_INV_MT" name="P_INV_MT" class="datepicker1 datepickerYm"  readonly="readonly">
					</select>
				</div>
				
				<br />
				실사확정여부 : <input type="radio" id="ad_y" name="ad_yn" value="Y" onchange="ad_yn_change(this.value)"/>
							   <label for="ad_y" style="cursor:pointer;">확정</label>
				&nbsp;&nbsp; <input type="radio" id="ad_n" name="ad_yn" value="N" onchange="ad_yn_change(this.value)"/>
							 <label for="ad_n" style="cursor:pointer;">취소</label>
				&nbsp;&nbsp; <input type="radio" id="ad_m" name="ad_yn" value="M" onchange="ad_yn_change(this.value)" />
							 <label for="ad_m" style="cursor:pointer;">비대상</label>
				&nbsp;&nbsp; <button type="button" id="btn_profitAndLoss" onclick="profitAndLoss_pr()" class="btn btn_style3">체크목록실행</button>
				<br />
				일재고마감(조정 전)
				<input type="checkbox" id="day_closed" name="day_closed" disabled />
				<span id="day_closed_dis" style="display:none;"><em>필수항목</em>필수항목</span>
				<br />
				월재고마감(조정 전)
				<input type="checkbox" id="month_closed" name="month_closed" disabled />
				<span id="month_closed_dis" style="display:none;"><em>필수항목</em>필수항목</span>
				<br />
				실사확정 <input type="checkbox" id="ad_real" name="ad_real" disabled />
				<span id="ad_real_dis" style="display:none;"><em>필수항목</em>필수항목</span>
				<br />
				일재고마감(조정 후)
				<input type="checkbox" id="day_real_closed" name="day_real_closed" disabled />
				<span id="day_real_closed_dis" style="display:none;"><em>필수항목</em>필수항목</span>
				<br />
				월재고마감(조정 후)
				<input type="checkbox" id="month_real_closed" name="month_real_closed" disabled />
				<span id="month_real_closed_dis" style="display:none;"><em>필수항목</em>필수항목</span>
				<br />
				원가율
				<input type="checkbox" id="profit" name="profit" />
				<br />
				손익생성
				<input type="checkbox" id="profitandloss" name="profitandloss" value="pal_y" />
			</div>
			<!-- //조회폼 영역 -->
		</form>
		
		<div id="loading_bar" style="display:none;">
			<img id="img_loading_bar" src="resources/img/common/circle_loading_bar.gif" style="width:40px;height:40px;" />
		</div>
		
		
		<div class="col2 sub_cnt">
			<h3 class="bul_arr">손익생성</h3>
			<hr />
			<hr />
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1">
					</div>
				</div>
			</div>
		</div>

	</div>
	<!-- //Content : 본문 영역 -->

</body>
</html>