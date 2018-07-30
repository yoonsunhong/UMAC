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
<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	
<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<script type="text/javascript" src="/resources/js/page/check/in/productCheckIn.js?ver=20180405_000" charset="utf-8"></script>
<!-- 공통 팝업을 쓸 때 반드시 추가해야 한다. -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
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
	    		$("#btn_read").hide();
	    		$("#btn_update").hide();
	    		$("#btn_print").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_update").hide();
	    		$("#btn_print").hide();
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
		    	}else{
		    		$("#btn_update").hide();
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
				<a href="" class="close_btn p_a">도움말 닫기</a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
			<div class="f_r">
				<!-- 권한에 따른 버튼 show/hide -->
				<button type="button" id="btn_print" class="btn btn_style2" onclick="btn_print();"><spring:message code="print"/></button>
			    <button type="button" id="btn_update"  class="btn btn_style2" onclick="btnSaveCheck();"><spring:message code="btnSave"/></button>
				<button type="button" id="btn_read" class="btn btn_style3" onclick="btnSearch();"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<div class="search_area"    id="top_search">
			<div class="last">
				<!-- 	다중 출력용 파라미터  -->
				<input type="hidden" id="selectedPrintRow"  name="selectedPrintRow" />
				<input type="hidden" id="P_PRINT_CORP_CODE"  name="P_PRINT_CORP_CODE" value="" />
				<input type="hidden" id="P_PRINT_PUR_DT"  name="P_PRINT_PUR_DT" />
				<input type="hidden" id="P_PRINT_STR_CODE"  name="P_PRINT_STR_CODE" />
				<input type="hidden" id="CORP_CODE"  name="CORP_CODE" value="${sessionScope.CORP_CODE}" />
				<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE}" />
				
				<label for=""><em>필수입력항목</em><spring:message code="storNm"/></label>
				<select id="P_DIN_STR_CODE" name="P_DIN_STR_CODE" disabled></select>
				<label for="">대출점포</label>
				<select id="P_STR_CODE" name="P_STR_CODE"></select>
				<label fol="">대입일자</label>
				<input type="text" id="P_DOUT_STR_DT" name="P_DOUT_STR_DT" class="datepicker datepicker1 wid2" /> ~ 
				<input type="text" id="P_DOUT_END_DT" name="P_DOUT_END_DT" class="datepicker datepicker2 wid2" />
				<label for="">확정여부</label>
				<select id="P_CFM_YN" name="P_CFM_YN">
					<option value=""><spring:message code="all"/></option>
					<option value="Y">확정</option>
					<option value="N">미확정</option>
				</select>
			</div>
		</div>
		<!-- //조회폼 영역 -->
		
		<!--  그리드 영역 -->
		<div class="col2 sub_cnt" id="dataForm" name="dataForm">
			<div>
				<h3 class="bul_arr">상품대출목록</h3>
				<div id="gridHolder1"></div>	
			</div>
			<div class="mar_T10">
				<div class="clear">
					<h3 class="bul_arr f_l">상품대입상세</h3>
					<div class="pro_price f_r" style="visibility: hidden;">
						<label for=""><em>필수입력항목</em>대입점</label>
						<select id="DIN_STR_CODE" name="DIN_STR_CODE" class="wid2" disabled></select>
						<label for="">비고</label>
						<input type="text" id="REMARK" name="REMARK" class="wid4 mar_R22" disabled>
						<button type="button" class="btn btn_style4" onclick="addRow();">행추가</button>
						<button type="button" class="btn btn_style4">행삭제</button>
					</div>				
				</div>
				<div id="gridHolder2"></div>
			</div>
		</div>
	</div>
	<!-- //Content : 본문 영역 -->
		
</body>
</html>