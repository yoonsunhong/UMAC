<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!-- 스프링 메세지 테그사용 :: 다국어 -->
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><spring:message code="deliverySummationStatus"/></title>

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
	설명: 매입처일괄변경
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-04-12    김창열       초기작성 
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

<script type="text/javascript" src="/resources/js/page/product/venChange/productVenChange.js?ver=20170803w" charset="utf-8"></script>
	  
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
	    		$("#btn_initl").hide();
	    		$("#btn_save").hide();
	    		$("#btn_search").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_initl").hide();
	    		$("#btn_save").hide();
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
		    		$("#btn_initl").show();
		    	}else{
		    		$("#btn_initl").hide();
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
					<button type="button" class="btn btn_style2"  id="btn_initl" name="btn_initl"><spring:message code="initl"/></button>
					<button type="button" class="btn btn_style2"  id="btn_save" name="btn_save"><spring:message code="btnSave"/></button>
					<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수입력사항</em><spring:message code="supply"/></label>		
					<input type="text" id="P_VEN_NAME" name="P_VEN_NAME" class="search_txt"/> 
					<input type="hidden" id="P_VEN_CODE" name="P_VEN_CODE"/> 
					<button type="button" class="search_btn"  id="P_VEN_NAME_SEARCH" name="P_VEN_NAME_SEARCH">searchIcon</button>									
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<!-- 배달집계현황 -->
			<div class="col2 sub_cnt">
				<div class="lft_wid f_l">
					<h3 class="bul_arr"><spring:message code="goodsMaster"/></h3>
					<div id="gridHolder1"></div>
				</div>
				<div class="rgt_wid f_r">
					<h3 class="bul_arr"><spring:message code="enterpriseChangeRegister"/></h3>
					<table class="tbl_st2">
						<tr>
							<th><em>필수입력사항</em><spring:message code="txtChangeTarget"/></th>
							<td>
								<input type="checkbox" id="P_TARGET1" name="P_TARGET1"><label for="P_TARGET1" class="wid_marL">공통상품</label>
						 		&nbsp;&nbsp;&nbsp;&nbsp;
						 		<input type="checkbox" id="P_TARGET2" name="P_TARGET2" onChange="chkStrCode()"><label for="P_TARGET2" class="wid_marL">점상품</label>	
						 		
						 		<select id="P_STR_CODE" name="P_STR_CODE" style="width:120px;display:none;"    >
									<option value="">점상품 전체변경</option> 
								</select>																
							</td>
						</tr>
						<tr>
							<th><em>필수입력사항</em><spring:message code="txtChangeBeforeVan"/></th>
							<td>
								<input type="text" id="P_BEFORE_CODE" name="P_BEFORE_CODE" class="wid2" readonly="readonly">
								<input type="text" id="P_BEFORE_VEN_NAME" name="P_BEFORE_VEN_NAME" class="wid1 wid_marL" readonly="readonly">
							</td>
						</tr>						
						<tr>
							<th><em>필수입력사항</em><spring:message code="txtChangeVan"/></th>
							<td>
								<input type="text" id="P_AFTER_CODE" name="P_AFTER_CODE" class="wid2" readonly="readonly">
								<input type="text" id="P_AFTER_VEN_NAME" name="P_AFTER_VEN_NAME" class="search_txt wid_marL" >  
								<button type="button" class="search_btn" id="P_VEN_NAME_SEARCH2" name="P_VEN_NAME_SEARCH2">검색 아이콘</button>
							</td>
						</tr>						
						<tr>
							<th><spring:message code="txtChangeStr"/></th>
							<td>
								<table class="tbl_st8" id="valTable" name="valTable">
									<!-- <tr>
										<th scope="row">일곡점</th>
										<td>1,250건</td>
										<td>성공</td>
									</tr>
									<tr>
										<th scope="row">일곡점</th>
										<td>0건</td>
										<td>실패</td>
									</tr> -->									
								</table>
							</td>
						</tr>					
					</table>
				</div> 
			</div>
		</div>
	</form>		
	<!-- //Content : 본문 영역 -->	 
		
</body>
</html>
	
