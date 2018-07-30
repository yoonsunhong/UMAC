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
<script type="text/javascript" src="/resources/js/jquery-1.7.1.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery.ui-1.10.4.datepicker.min.js"></script>
<script src="/resources/js/style.js"></script>
<%--
	설명: 매출부가세전송
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-04-03    김경진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/payment/close/purchClosed.js?ver=20180410_000" charset="utf-8"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>	

<style>
 	.DATE_YM table.ui-datepicker-calendar { display:none; }
</style>

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
	    		$("#btn_update2").hide();
	    		$("#btn_update3").hide();
	    		$("#btn_update").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_update2").hide();
	    		$("#btn_update3").hide();
	    		$("#btn_update").hide();
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
		    		$("#btn_update2").show();
		    		$("#btn_update3").show();
		    	}else{
		    		$("#btn_update2").hide();
		    		$("#btn_update3").hide();
		    	}
		    	
		    	//생성 버튼 제어
		    	if(data[0].AUTH_CREATE == 'Y'){
		    		$("#btn_update").show();
		    	}else{
		    		$("#btn_update").hide();
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
				<!-- 권한에 따른 버튼 show/hide -->
				<!--
				<c:if test="${sessionScope.AUTH_EXCEL_DOWN eq 'Y'}">
					<button type="button" class="btn btn_style2" id="btn_excel_down1" ><spring:message code="btnExcelDown"/>(자동분개)</button>
				</c:if>
				<c:if test="${sessionScope.AUTH_EXCEL_DOWN eq 'Y'}">
					<button type="button" class="btn btn_style2" id="btn_excel_down2" ><spring:message code="btnExcelDown"/>(면과세)</button>
				</c:if>
				<c:if test="${sessionScope.AUTH_SAVE eq 'Y'}">
				    <button type="button" class="btn btn_style2" id="btn_update1" >확정/전송</button>
				</c:if>
				 -->
				<button type="button" class="btn btn_style2" id="btn_update3" >회계승인</button>
				<button type="button" class="btn btn_style2" id="btn_update2" >담당자승인</button>
				<button type="button" class="btn btn_style2" id="btn_update" >마감생성</button>
				<button type="button" class="btn btn_style3" id="btn_search" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<form name="frm" id="frm">
			<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" />
			<input type="hidden" name="P_REG_ID" id="P_REG_ID" value="${sessionScope.ID }" />
			<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
			<input type="hidden" name="pageUnit" id="pageUnit" value="25" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
			<input type="hidden" name="pageSize" id="pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
			<input type="hidden" name="P_COLUMN_NAME" id="P_COLUMN_NAME" />
			<input type="hidden" name="P_ORDERBY" id="P_ORDERBY" />
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수입력사항</em><spring:message code="purDt"/></label>
					<input type="text" class="datepicker2 datepickerYm" id="P_PUR_DT" name="P_PUR_DT">
					
					<label for=""><em>필수입력항목</em><spring:message code="store"/></label>
					<select id="P_STR_CODE" name="P_STR_CODE"></select>
				</div>
			</div>
			<!-- //조회폼 영역 -->
		</form>
		
		<div class="col2 sub_cnt">
			<h3 class="bul_arr">매입마감조회</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1">
					</div>
					<!-- <div class="gridPaging" id="gridPageNavigationDiv">
					</div> -->
				</div>
			</div>
		</div>
		
		<div class="col2 sub_cnt" style="margin-top: 10px;">
			<h3 class="bul_arr">매입마감상세</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder2">
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- //Content : 본문 영역 -->
	
</body>
</html>