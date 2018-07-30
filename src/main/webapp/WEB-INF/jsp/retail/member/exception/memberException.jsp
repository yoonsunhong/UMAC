<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

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
<script type="text/javascript" src="/resources/js/jquery-1.12.4.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery-ui.js"></script>
<script src="/resources/js/style.js"></script>
<%--
	설명: 회원정보 > 멤버십관리 > 예외고개관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-15         김경진       초기작성 
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
<!--[if IE]><script language="javascript" type="text/javascript" src="/resources/js/rMateGridH5/JS/shim.js"></script><![endif]-->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>
<script type="text/javascript" src="/resources/js/page/member/exception/memberException.js?ver=20170628_02" charset="utf-8"></script>
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
	    		$("#btn_search").hide();
	    		$("#btn_excel_down").hide();
	    		$("#btn_save").hide();
	    		$("#btn_excel_sample_down").hide();
	    		$("#btn_excel_pop").hide();
	    		$("#btn_excel_upload").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_excel_down").hide();
	    		$("#btn_save").hide();
	    		$("#btn_excel_sample_down").hide();
	    		$("#btn_excel_pop").hide();
	    		$("#btn_excel_upload").hide();
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
		    		$("#btn_save").show();
		    	}else{
		    		$("#btn_save").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#btn_excel_down").show();
		    		$("#btn_excel_sample_down").show();
		    	}else{
		    		$("#btn_excel_down").hide();
		    		$("#btn_excel_sample_down").hide();
		    	}
		    	
		    	//엑셀업로드버튼 제어
		    	if(data[0].AUTH_EXCEL_UPLOAD == 'Y'){
		    		$("#btn_excel_pop").show();
		    		$("#btn_excel_upload").show();
		    	}else{
		    		$("#btn_excel_pop").hide();
		    		$("#btn_excel_upload").hide();
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
				<button type="button" class="btn btn_style2" id="btn_excel_down" ><spring:message code="btnExcelDown"/></button>
				<button type="button" class="btn btn_style3" id="btn_search" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form name="sertch_frm" id="sertch_frm" >
			<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" >
			<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
			<input type="hidden" name="pageUnit" id="pageUnit" value="20" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
			<input type="hidden" name="pageSize" id="pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
			<input type="hidden" name="P_COLUMN_NAME" id="P_COLUMN_NAME" />
			<input type="hidden" name="P_ORDERBY" id="P_ORDERBY" />
			
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><spring:message code="cusName"/></label>
					<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt" style="width:100px;">
					<%-- <label for=""><spring:message code="mobilePhoneNumber"/></label>
					<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt" style="width:100px;"> --%>
					
					<label for="" style="padding-left:20px;">DM여부</label>
					<select id="P_DM_YN" name="P_DM_YN" class="wid3">
						<option value=""><spring:message code="select"/></option>
					</select>
				</div>
			</div>
			
		</form>
		<!-- //조회폼 영역 -->
		
		<!-- 본문 영역 -->
		<div class="col2 sub_cnt">
			<!-- <h3 class="bul_arr">예외고객현황</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1">
					</div>
					<div class="gridPaging" id="gridPageNavigationDiv">
					</div>
				</div>
			</div> -->
			
			<div class="sec_grid">
				<div class="content">
					<div class="tit_top">
						<h3 class="bul_arr f_l">예외고객현황</h3>
						<div class="f_r">
							<button type="button" id="btn_excel_pop" class="btn btn_style4" ><spring:message code="btnExcelUpload"/></button>
						</div>
					</div>
					<div id="gridHolder1">
					</div>
					<div class="gridPaging" id="gridPageNavigationDiv">
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
		<h1 class="bul_arr f_l">예외고객현황</h1>
		<div class="f_r">
			<button type="button" class="btn btn_style4" id="btn_excel_sample_down" ><spring:message code="btnExcelUploadSample"/></button>
			<button type="button" class="btn btn_style4" id="btn_excel_upload" ><spring:message code="btnExcelUpload"/></button>
			<button type="button" class="btn btn_style4" id="btn_save" ><spring:message code="btnSave"/></button>
			<button type="button" class="btn btn_style4" onclick="btn_close()"><spring:message code="btnClose"/></button>
		</div>
	</header>
	
	<form name="reg_frm" id="reg_frm">
		<input type="hidden" name="D_CORP_CODE" id="D_CORP_CODE" value="${sessionScope.CORP_CODE }" />	<!-- 기업코드 -->
		<input type="hidden" name="D_REG_ID" id="D_REG_ID" value="${sessionScope.ID }" />
		<input type="hidden" name="D_MEM_LIST" id="D_MEM_LIST" />	<!-- 회원정보 array -->
	</form>
	
	<div id="pop_cnt" class="clear p_r">
		<div class="sec_grid">
			<div class="content">
				<div id="gridHolder2"></div>
			</div>
		</div>
	</div>

</div>
<!--  등록 수정 팝업 영역 끝  -->
	
</body>
</html>