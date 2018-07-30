<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>멤버십회원조회</title>
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
	설명: 회원정보 > 고객관리 > 멤버십회원조회
		
	수정일      	              수정자       수정내용
	------------------------------------------------------
	2017-06-27         정해성       초기작성 
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
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
<script type="text/javascript" src="/resources/js/page/member/membership/memberShip.js?ver=20180131_009" charset="utf-8"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
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
				<button type="button" id="btn_search" class="btn btn_style3">
					<i class="fa fa-search"></i>
					<spring:message code="btnSearch"/>
				</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form name="search_frm" id="search_frm"  onsubmit="return false;">
			<div class="search_area" id="top_search">
				<div>
					<label for="" class="pad_L10 pad_R16"><spring:message code="store"/></label>
					<select id="P_STR_CODE" name="P_STR_CODE" class="pad_L10">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for="">회원명</label>
					<input type="hidden" id="P_CUST_NO" name="P_CUST_NO" class="search_txt" />
					<input type="hidden" id="P_CORP_CODE" name="P_CORP_CODE" class="search_txt" value="${sessionScope.CORP_CODE }" />
					<input type="hidden" id="P_PAGE_DISPLAY_TOTAL" name="P_PAGE_DISPLAY_TOTAL" value="100" />
					<input type="hidden" id="P_PAGE_INDEX" name="P_PAGE_INDEX" value="1" />
					<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt" />
					<button type="button" class="search_btn" onclick="btn_comm_user_search('S')">검색 아이콘</button>
					
					<label for="">회원상태</label>
					<select id="P_STATUS_YN" name="P_STATUS_YN" class="wid2">
						<option value="">전체</option>
						<option value="Y">사용</option>
						<option value="N">미사용</option>  
					</select>
					
					<label for="">회원구분</label>
					<select id="P_BUSI_FLAG" name="P_BUSI_FLAG" class="wid2">
						<option value="">전체</option> 
					</select>
					
					<label for="">회원등급</label>
					<select id="P_MBR_GRADE" name="P_MBR_GRADE" class="wid2">
						<option value="">전체</option> 
					</select>
				</div>
				<div class="last">
					<label for="">업종유형</label>
					<select id="P_INDUST_FLAG" name="P_INDUST_FLAG" class="wid2">
						<option value="">전체</option> 
					</select>
					
					<label for="">할인적용</label>
					<select id="P_MBR_DC_YN" name="P_MBR_DC_YN" class="wid2">
						<option value="">전체</option> 
					</select>
					
					<label for="">외상유무</label>
					<select id="P_CREDIT_USE_YN" name="P_CREDIT_USE_YN" class="wid2">
						<option value="">전체</option> 
					</select>
					
					<label for="">포인트사용</label>
					<select id="P_POINT_USE_YN" name="P_POINT_USE_YN" class="wid2">
						<option value="">전체</option> 
					</select>
					
					<label for="">계산서발행</label>
					<select id="P_BILL_PUBLISH_YN" name="P_BILL_PUBLISH_YN" class="wid2">
						<option value="">전체</option>
						<option value="Y">발행</option>
						<option value="N">미발행</option>
					</select>
				</div>
			</div>
		</form>
		<!-- //조회폼 영역 -->
		
		<div>
			<div class="tit_top clear">
				<h3 class="bul_arr f_l">멤버십회원목록</h3>	 
			</div>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
				<div class="gridPaging" id="gridPageNavigationDiv"></div>
			</div>
		</div>
		
	</div>
		
</body>
</html>