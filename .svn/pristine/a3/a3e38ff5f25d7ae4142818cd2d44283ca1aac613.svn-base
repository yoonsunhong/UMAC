<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>공지사항조회</title>

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
<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" /> 
<script type="text/javascript" src="/resources/js/page/business/notice/businessNoticeV2.js?ver=20180406_000" charset="utf-8"></script>
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
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
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
				<button type="button" id="btn_search" name="btn_search" class="btn btn_style3"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
			
		<form id="frm" name="frm">
			<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
			<input type="hidden" name="pageUnit" id="pageUnit" value="20" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
			<input type="hidden" name="pageSize" id="pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
			<input type="hidden" name="P_COLUMN_NAME" id="P_COLUMN_NAME" />
			<input type="hidden" name="P_ORDERBY" id="P_ORDERBY" />
			<input type="hidden" name="P_REGI_CHNL" id="P_REGI_CHNL" value="2"/>	<!-- 1이면 유맥 2이면 외부업체 -->				
			<input type="hidden" name="P_US" id="P_US" value="1"/>	 				
							
			<!-- 조회폼 영역 -->
			<c:set var="today" value="<%=new java.util.Date()%>" />
			<fmt:formatDate value="${today}" pattern="yyyy-MM-dd" var="today"/>
			<c:set value="${fn:substring(today,0,7)}-01" var="today2"/>
			<div id="top_search" class="search_area">
				<div class="last">
					<label for=""><spring:message code="noticeDate"/></label>
					<input type="text" id="P_OPEN_DT" name="P_OPEN_DT" class="datepicker1" value="<c:out value="${today2}"/>" readonly="readonly" /> ~ 
					<input type="text" id="P_END_DT" name="P_END_DT" class="datepicker2" value="<c:out value="${today}"/>" readonly="readonly" />
					
					<label for="">&nbsp;&nbsp;&nbsp;<spring:message code="supply"/></label>
					<input type="text" id="P_VEN_NAME" name="P_VEN_NAME" class="search_txt" />
					<button type="button" id="P_VEN_NAME_SEARCH" name="P_VEN_NAME_SEARCH" class="search_btn">searchIcon</button>						
					
					<label for=""><spring:message code="title"/></label>
					<input type="text" id="P_TITLE" name="P_TITLE" style="width:216px;"/>
				</div>
			</div>
			<!-- //조회폼 영역 -->
		</form>
			
		<!-- 공지사항 -->
		<div class="col2 sub_cnt">
			<div class="clear">
				<h3 class="bul_arr f_l">SCM <spring:message code="notice"/></h3>
				<span class="txt f_l"><spring:message code="msgDoubleClick"/></span>
			</div>	 		
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
				<div class="gridPaging" id="gridPageNavigationDiv"/>
			</div>				
		</div>
	</div>		
	<!-- //Content : 본문 영역 -->	 
	
	<!-- 등록 수정 팝업 영역 시작  -->
	<div id="pop_wrap1">
		<header id="pop_head" class="clear">
			<h1 class="bul_arr f_l"><spring:message code="notice"/><spring:message code="btnSearch"/></h1>
		</header>		
		
		<div id="pop_cnt">
			<table class="tbl_st2">
				<tbody>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="title"/></label></th>
						<td colspan="3"><input type="text" id="D_TITLE" name="D_TITLE" readonly="readonly" /></td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="pd"/></label></th>
						<td>								
							<input type="text" id="D_OPEN_DT" name="D_OPEN_DT" style="width:100px" readonly="readonly" /> ~ 
							<input type="text" id="D_END_DT" name="D_END_DT" style="width:100px" readonly="readonly" />
						</td>
						
						<th scope="row"><em>필수항목</em><label><spring:message code="supply"/></label></th>
						<td>
							<input type="text" id="D_VEN_NAME" name="D_VEN_NAME" readonly="readonly" />
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="contents"/></label></th>
						<td colspan="3">
							<textarea id="D_CONTENTS" name="D_CONTENTS" style="height:200px" readonly="readonly"></textarea>
						</td>
					</tr>
					<tr>
						<th scope="row"><label><spring:message code="atchmnfl"/></label></th>
						<td colspan="3">
							<div id="fn" name="fn"></div>					
						</td>
					</tr>
				</tbody>
			</table>
		</div>	
	</div>
	
	<%-- <div id="pop_wrap2">
		<div id="pop_cnt">
			<table class="tbl_st2">
				<tbody>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="title"/></label></th>
						<td colspan="3"><input type="text" id="D_TITLE2" name="D_TITLE2" readonly="readonly"></td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="pd"/></label></th>
						<td>
							<input type="text" id="D_OPEN_DT2" name="D_OPEN_DT2" class="f_l datepicker1" readonly="readonly" style="width:100px">
							<span class="f_l" style="padding:4px;">~</span> 
							<input type="text" id="D_END_DT2" name="D_END_DT2" class="f_l datepicker2" readonly="readonly" style="width:100px">								
						</td>
						<th scope="row"><em>필수항목</em><label><spring:message code="supply"/></label></th>
						<td>
							<input type="text" id="D_VEN_NAME2" name="D_VEN_NAME2" readonly="readonly" >
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="contents"/></label></th>
						<td colspan="3">
							<textarea id="D_CONTENTS2" name="D_CONTENTS2" style="height:200px" readonly="readonly"></textarea>
						</td>
					</tr>
					<tr>
						<th scope="row"><label><spring:message code="atchmnfl"/></label></th>
						<td colspan="3"><div id="fn2" name="fn2"></div></td>
					</tr>
				</tbody>
			</table>
		</div>	
	</div> --%>
	
	
	<form id="fileForm" name="fileForm">
		<input type="hidden" name="P_SEQ" id="P_SEQ">
	</form>
	<input type="hidden" name="D_SEQ" id="D_SEQ" />
	<!--  등록 수정 팝업 영역 끝  -->		

</body>
</html>