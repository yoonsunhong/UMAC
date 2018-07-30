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
	설명: 사용자 기능별 권한 관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-12-18    문희훈       초기작성 
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
<script type="text/javascript" src="/resources/js/page/menurole/userMenuRole.js" charset="utf-8"></script>

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
	    		$("#btn_read").hide();
	    		$("#btn_update").hide();
	    		$("#btnCopy").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_update").hide();
	    		$("#btnCopy").hide();
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
		    		$("#btnCopy").show();
		    	}else{
		    		$("#btn_update").hide();
		    		$("#btnCopy").hide();
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
	<div  id="iframeCnt">	
		<input type="hidden" id="ROLE_ID" name="ROLE_ID" >
		<div class="btn_area clear">
			<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png">도움말</button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a">도움말 닫기</a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
			<div class="f_r">
				<!-- 권한에 따른 버튼 show/hide -->
				<c:if test="${sessionScope.AUTH_SAVE eq   'Y'}">
				    <button type="button" id="btn_update"  class="btn btn_style2" ><spring:message code="btnSave"/></button>
				</c:if>
				<c:if test="${sessionScope.AUTH_SEARCH eq   'Y'}">
					<button type="button" id="btn_read" class="btn btn_style3" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</c:if>
			</div>
		</div>
		<!-- 조회폼 영역 -->
		<div class="search_area" id="top_search"><!-- 클래스 search_area 추가 -->
			<!-- 마지막 div에 class="last" 추가 -->
			<div class="last">
				<label for=""><spring:message code="staff"/></label>
				<input type="text" id="TOP_USER_NM" name="TOP_USER_NM" maxlength="15" class="">
				<label for="">순위</label>
				<select  id="TOP_POSITION" name="TOP_POSITION" ></select>
				<label for="">부서명</label>
				<select  id="TOP_DEPT_CODE" name="TOP_DEPT_CODE" ></select>		
			</div>
		</div>
		<!-- //조회폼 영역 -->
		
		<div class="col2">
			<div class="box_lft">
				<h3 class="bul_arr">사원 목록</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
				</div>
			</div>
			
			<div class="box_rgt" id="copyLayer">
				<section class="sec_grid">
					<h3 class="bul_arr">메뉴 별 권한 목록</h3>
					<div class="content">
						<div id="gridHolder2"></div>
					</div>
					<br/>
					<h3 class="bul_arr">권한 복사 등록</h3>
					기 사원명(사원ID) 
					<input type="text" id="ORI_USER_NAME" name="ORI_USER_NAME" maxlength="15" class="" disabled="disabled">
					<input type="text" id="ORI_DEPT_CODE" name="ORI_DEPT_CODE" hidden="hidden">
					<input type="text" id="ORI_IEMP_NO" name="ORI_IEMP_NO" disabled="disabled">
					
					<button type="button" class="search_btn"  id="" name="" onclick="popSearchUser1()">searchIcon</button>
					대상 사원명(사원ID) 
					<input type="text" id="TO_USER_NAME" name="TO_USER_NAME" maxlength="15" class="" disabled="disabled">
					<input type="text" id="TO_DEPT_CODE" name="TO_DEPT_CODE" hidden="hidden">
					<input type="text" id="TO_IEMP_NO" name="TO_IEMP_NO" disabled="disabled">
					<button type="button" class="search_btn"  id="" name="" onclick="popSearchUser2()">searchIcon</button>
					<button type="button" id="btnCopy" class="btn btn_style4" onclick="fnCopy()">복사하기</button>
				</section>
			</div>
		</div>
	</div>
</body>
</html>   