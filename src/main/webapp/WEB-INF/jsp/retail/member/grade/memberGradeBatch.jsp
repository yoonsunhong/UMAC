<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>회원등급변경(일괄)</title>

<link type="text/css" rel="stylesheet" href="/resources/css/jquery-ui.css">
<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">

<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->
<script type="text/javascript" src="/resources/js/jquery-1.12.4.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery-ui.js"></script>
<script src="/resources/js/style.js"></script>
<%--
	설명: 회원정보 > 멤버십관리 > 회원등급변경(일괄)
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-01-20         김경진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/member/grade/memberGradeBatch.js" charset="utf-8"></script>
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
	    	//alert(data);
	    	
	    	//사용자 기능별 권한관리 데이터가 없으면 모든 버튼 숨김
	    	if(data == ""){
	    		$("#pop_btn_save").hide();
	    		$("#btn_search").hide();
	    		$("#btn_preview").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#pop_btn_save").hide();
	    		$("#btn_search").hide();
	    		$("#btn_preview").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_search").show();
		    		$("#btn_preview").show();
		    	}else{
		    		$("#btn_search").hide();
		    		$("#btn_preview").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#pop_btn_save").show();
		    	}else{
		    		$("#pop_btn_save").hide();
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
		    		
		    	}else{
		    		
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
				<button type="button" id="btn_search" class="btn btn_style3" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form name="sertch_frm" id="sertch_frm" >
		<input type="hidden" name="S_CORP_CODE" id="S_CORP_CODE" value="${sessionScope.CORP_CODE }" />	<!-- 기업코드 -->
		
		<div class="search_area" id="top_search">
			<div class="last">
				<label for="">변경일자</label>
				<input type="text" name="P_CHANGE_DT" id="P_CHANGE_DT" class="t_c" style="width:100px;" readonly="readonly" tabindex="-1" onfocus="this.blur()" />
			</div>
		</div>
		<br />
		<!-- //조회폼 영역 -->
		</form>
		
		<!-- 본문 영역 -->
		<div class="col2 sub_cnt">
			<h3 class="bul_arr">매출발생기간</h3>
			<div class="search_area" id="top_search">
				<div class="last">
					<form name="preview_frm" id="preview_frm" >
					<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" />	<!-- 기업코드 -->
					<input type="hidden" name="P_REG_ID" id="P_REG_ID" value="${sessionScope.ID }" />
					
					<label for="">매출발생기간</label>
					<input type="text" name="P_GONG_DT" id="P_GONG_DT" class="datepicker" /> ~ <input type="text" name="P_END_DT" id="P_END_DT" class="datepicker" />
					<button type="button" id="btn_preview" class="btn btn_style3" ><i class="fa fa-search"></i><spring:message code="btnPreview"/></button>
					</form>
				</div>
			</div>
			<br />
			
			<div class="box_lft">
				<h3 class="bul_arr">회원등급현황(변경전 현재일 기준)</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1">
						</div>
					</div>
				</div>
			</div>
			
			<div class="box_rgt">
				<h3 class="bul_arr">회원등급변경기준</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder2">
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 본문 영역 -->
		
	</div>
	<!-- //Content : 본문 영역 -->
	
<!-- 등록 수정 팝업 영역 시작  -->
<div id="pop_wrap">
	<header id="pop_head" class="clear">
		<h1 class="bul_arr f_l">회원등급생성</h1>
		<div class="f_r">
			<button type="button" class="btn btn_style4" id="pop_btn_save" ><spring:message code="btnExec"/></button>
			<button type="button" class="btn btn_style4" onclick="btn_close();"><spring:message code="btnClose"/></button>
		</div>
	</header>
	
	<div id="pop_cnt">
		<div class="sec_grid">
			<div class="content">
				<div id="gridHolder3">
				</div>
			</div>
		</div>
	</div>
</div>
<!--  등록 수정 팝업 영역 끝  -->


</body>
</html>