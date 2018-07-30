<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>포인트기준관리</title>

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
	설명: 회원정보 > 멤버십관리 > 포인트기준관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-01-05         김경진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/member/point/memberPoint.js" charset="utf-8"></script>
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
	    		$("#btn_new").hide();
	    		$("#btn_update").hide();
	    		$("#btn_search").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_new").hide();
	    		$("#btn_update").hide();
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
		    		$("#btn_new").show();
		    	}else{
		    		$("#btn_new").hide();
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
				<button type="button" id="btn_new" class="btn btn_style2" ><spring:message code="btnNew"/></button>
				<button type="button" id="btn_search" class="btn btn_style3" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form name="sertch_frm" id="sertch_frm" >
			<input type="hidden" name="S_CORP_CODE" id="S_CORP_CODE" value="${sessionScope.CORP_CODE }" />	<!-- 기업코드 -->
			
			<%-- <div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수입력항목</em><spring:message code="cusName"/></label>
					<input type="text" id="S_CUST_NAME" name="S_CUST_NAME" class="search_txt">
					<input type="hidden" id="S_CUST_NO" name="S_CUST_NO" class="search_txt">
					<input type="hidden" id="S_CORP_CODE" name="S_CORP_CODE" class="search_txt" value="${sessionScope.CORP_CODE }" >
					<button type="button" onclick="btn_comm_user_search('S')" class="search_btn">검색 아이콘</button>
				</div>
			</div> --%>
		</form>
		<!-- //조회폼 영역 -->
		<br />
		
		<!-- 본문 영역 -->
		<div class="col2 sub_cnt">
			<h3 class="bul_arr">포인트적립기준(매출/결제액 기준 적립율(%))</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1">
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
		<h1 class="bul_arr f_l">포인트기준관리</h1>
		<div class="f_r">
			<button type="button" class="btn btn_style4" id="btn_update" ><spring:message code="btnSave"/></button>
			<button type="button" class="btn btn_style4" onclick="btn_close()"><spring:message code="btnClose"/></button>
		</div>
	</header>
	
	<form name="reg_frm" id="reg_frm">
		<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" />	<!-- 기업코드 -->
		<input type="hidden" name="P_TYPE" id="P_TYPE" />			<!-- insert, update, delete -->
		<input type="hidden" name="P_REG_ID" id="P_REG_ID" value="${sessionScope.ID }" />
		
		<div id="pop_cnt">
			<table class="tbl_st2">
				<tbody>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="category"/></th>
						<td>
							<select id="P_UPTAE_FLAG" name="P_UPTAE_FLAG" >
							</select>
						</td>
						<th scope="row"><em>필수항목</em><label><spring:message code="busiFlag"/></th>
						<td>
							<select id="P_BUSI_FLAG" name="P_BUSI_FLAG" >
							</select>
						</td>
						<th scope="row"><em>필수항목</em><label><spring:message code="mbrGrade"/></th>
						<td>
							<select id="P_MBR_GRADE" name="P_MBR_GRADE" >
							</select>
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="memberDiscountRate"/></label></th>
						<td>
							<input type="text" class="t_r" id="P_DC_RATE" name="P_DC_RATE" maxlength="6" numberOnly value="0" >
						</td>
						<th scope="row"><em>필수항목</em><label><spring:message code="referenceValue"/></label></th>
						<td>
							<input type="text" class="t_r" id="P_BASE_AMT" name="P_BASE_AMT" numberOnly maxlength="15" value="0" >
						</td>
						<th scope="row"><em>필수항목</em><label><spring:message code="availablePoints"/></label></th>
						<td>
							<input type="text" class="t_r" id="P_MIN_USE_POINT" name="P_MIN_USE_POINT" numberOnly maxlength="8" value="2000" >
						</td>
					</tr>
					<tr>	
						<th scope="row"><em>필수항목</em><label><spring:message code="cashRate"/></label></th>
						<td>
							<input type="text" class="t_r" id="P_CASH_RATE" name="P_CASH_RATE" maxlength="6" numberOnly value="0" >
						</td>
						<th scope="row"><em>필수항목</em><label><spring:message code="cardRate"/></label></th>
						<td>
							<input type="text" class="t_r" id="P_CARD_RATE" name="P_CARD_RATE" maxlength="6" numberOnly value="0" >
						</td>
						<th scope="row"><em>필수항목</em><label><spring:message code="pointRate"/></label></th>
						<td>
							<input type="text" class="t_r" id="P_POINT_RATE" name="P_POINT_RATE" maxlength="6" numberOnly value="0" >
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="creditRate"/></label></th>
						<td>
							<input type="text" class="t_r" id="P_CREDIT_RATE" name="P_CREDIT_RATE" maxlength="6" numberOnly value="0" readonly="readonly" tabindex="-1" onfocus="this.blur()" >
						</td>
						<th scope="row"><em>필수항목</em><label><spring:message code="etcRate"/></label></th>
						<td colspan="3">
							<input type="text" class="t_r" id="P_ETC_RATE" name="P_ETC_RATE" style="width:108px;" maxlength="6" numberOnly value="0" readonly="readonly" tabindex="-1" onfocus="this.blur()" >
						</td>
					</tr>
					<tr>
						<th scope="row"><label><spring:message code="inputDate"/></label></th>
						<td>
							<input type="text" id="P_IDATE" name="P_IDATE" readonly="readonly" tabindex="-1" onfocus="this.blur()" >
						</td>
						<th scope="row"><label><spring:message code="inputName"/></label></th>
						<td colspan="3">
							<input type="text" id="P_IEMP_NO" name="P_IEMP_NO" readonly="readonly" style="width:108px;" tabindex="-1" onfocus="this.blur()" >
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</form>

</div>
<!--  등록 수정 팝업 영역 끝  -->

</body>
</html>