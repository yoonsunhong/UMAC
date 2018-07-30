<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>교환권출련현황 관리</title>

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
	설명: 영업정보 > 영업관리 > 교환권출력현황
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-08-25    윤태희       초기작성 
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
<!-- 공통 팝업을 쓸 때 반드시 추가해야 한다. -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
<script type="text/javascript" src="/resources/js/page/business/exchangeprint/businessExchangePrint.js?ver=20180406_000" charset="utf-8"></script>
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
	    		$("#btn_search").hide();
	    		$("#btn_u_read").hide();
	    		$("#btn_excel").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_u_read").hide();
	    		$("#btn_excel").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_search").show();
		    		$("#btn_u_read").show();
		    	}else{
		    		$("#btn_search").hide();
		    		$("#btn_u_read").hide();
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
	    		$("#S_STR_CODE").val(loadData.STR_CODE);
	    		$("#S_STR_CODE").prop("disabled", true);
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
				<!-- 권한에 따른 버튼 show/hide -->
				<button type="button" id="btn_excel" class="btn btn_style2" onclick="excelExport();"><spring:message code="btnExcelDown"/></button>
				<button type="button" id="btn_search" class="btn btn_style3"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<form id="frm" name="frm">
			<input type="hidden" id="S_CORP_CODE" name="S_CORP_CODE" value="${sessionScope.CORP_CODE}" />
			<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE}" />
			
			<!-- 조회폼 영역 -->
			<div id="top_search" class="search_area">
				<div class="last">
					<label for=""><spring:message code="store"/></label>
					<select id="S_STR_CODE" name="S_STR_CODE" onchange="changeTopSelectStrCode(this.value);">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for=""><em>필수입력항목</em>영업일자</label>
					<input type="text" id="S_SALE_DT" name="S_SALE_DT" class="datepicker" /> ~ 
					<input type="text" id="S_SALE_DT_E" name="S_SALE_DT_E" class="datepicker" />
					
					<label for=""><em>필수입력항목</em><spring:message code="giftName"/></label>
					<input type="hidden" id="P_EVT_CODE" name="P_EVT_CODE" />
					<select id="S_EVT_NO" name="S_EVT_NO" class="wid2" onchange="chnageEvtCode(this.value);"></select>
					<button class="search_btn" onclick="btn_evt_search();" style="padding-left:40px;">검색 아이콘</button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
		</form>
		
		<div class="col2 sub_cnt">
			<h3 class="bul_arr">교환권출력현황</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1">
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- //Content : 본문 영역 -->
	
	<!-- //Content : 본문 영역 -->	 
	<div id="user_pop_wrap1" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="eventPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div id="top_search26" class="search_area">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="eventName"/></label>
					<input type="hidden" id="U_CALLBACK_NM1" name="U_CALLBACK_NM1" />
					<input type="text" id="P_U_TEXT17" name="P_TEXT" class="search_txt" />
					<label for=""><em>필수입력항목</em><spring:message code="eventDate"/></label>
					<input type="text" id="P_EVT_STR_DT" name="P_EVT_STR_DT" class="datepicker1 datepicker" /> ~ 
					<input type="text" id="P_EVT_END_DT" name="P_EVT_END_DT" class="datepicker2 datepicker" />
					<button type="button" id="btn_u_read" class="search_btn"  onclick="btn_pop_search();"></button>
					<button type="button" class="btn btn_style4 f_r" onclick="btn_user_close();"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridUser_Holder26"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
</body>
</html>