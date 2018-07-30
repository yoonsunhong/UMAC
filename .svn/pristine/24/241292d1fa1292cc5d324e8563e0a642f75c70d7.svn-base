<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>회원등급변경(개별)</title>

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
	설명: 회원정보 > 멤버십관리 > 회원등급변경(개별)
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-01         김경진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/member/grade/memberGrade.js" charset="utf-8"></script>
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
	    		$("#btn_grade_save").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_grade_save").hide();
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
		    		$("#btn_grade_save").show();
		    	}else{
		    		$("#btn_grade_save").hide();
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
				<label for=""><em>필수입력항목</em><spring:message code="cusName"/></label>
				<input type="text" id="S_CUST_NAME" name="S_CUST_NAME" class="search_txt">
				<input type="hidden" id="S_CUST_NO" name="S_CUST_NO" class="search_txt">
				<input type="hidden" id="S_CORP_CODE" name="S_CORP_CODE" class="search_txt" value="${sessionScope.CORP_CODE }" >
				<button type="button" onclick="btn_comm_user_search()" class="search_btn">검색 아이콘</button>
			</div>
		</div>
		<!-- //조회폼 영역 -->
		</form>
		
		<!-- 본문 영역 -->
		<div class="col2 sub_cnt">
			<div class="box_lft">
				<h3 class="bul_arr"><spring:message code="memberInfo"/></h3>
				<table class="tbl_st2 tbl_st5 mar_T0">
					<colgroup>
				    	<col style="width:40%"/>        
				    	<col style="width:60%"/>   
				  	</colgroup>
				  	<thead>
				  		<th><spring:message code="busiFlag"/></th>
				  		<th><spring:message code="memberInfo"/></th>
				  	</thead>			
				  	<tbody>
				  		<tr>
				  			<th scope="row"><spring:message code="cusNo"/></th>
				  			<td><span id="D_CUST_NO"></span></td>
				  		</tr>
				  		<tr>
				  			<th scope="row"><spring:message code="cusName"/></th>
				  			<td><span id="D_CUST_NAME"></span></td>
				  		</tr>
				  		<tr>
				  			<th scope="row"><spring:message code="sex"/></th>
				  			<td><span id="D_SEX"></span></td>
				  		</tr>				  		
				  		<tr>
				  			<th scope="row"><spring:message code="birthDate"/></th>
				  			<td><span id="D_BIR_DATE"></span></td>
				  		</tr>				  		
				  		<tr>
				  			<th scope="row"><spring:message code="phoneNumber"/></th>
				  			<td><span id="D_TEL_NO"></span></td>
				  		</tr>
				  		<tr>
				  			<th scope="row"><spring:message code="mobilePhoneNumber"/></th>
				  			<td><span id="D_MOBIL_NO"></span></td>
				  		</tr>						  						  		
				  		<tr>
				  			<th scope="row"><spring:message code="supplyName"/></th>
				  			<td><span id="D_BUSI_NAME"></span></td>
				  		</tr>
				  		<tr>
				  			<th scope="row"><spring:message code="busiNo"/></th>
				  			<td><span id="D_BUSI_NO"></span></td>
				  		</tr>
				  		<tr>
				  			<th scope="row"><spring:message code="busiFlag"/></th>
				  			<td><span id="D_BUSI_FLAG_NAME"></span></td>
				  		</tr>
				  		<tr>
				  			<th scope="row"><spring:message code="mbrGrade"/></th>
				  			<td><span id="D_MBR_GRADE_NAME"></span></td>
				  		</tr>
				  	</tbody>
				</table>
			</div>
			<div class="box_rgt" style="padding-left:0;border-left:0;">
				<h3 class="bul_arr"><spring:message code="memberPerformance"/></h3>
				<table class="tbl_st2 tbl_st5 mar_T0">
					<colgroup>
						<col style="width:16%">
						<col style="width:28%">
						<col style="width:28%">
						<col style="width:28%">
					</colgroup>
					<thead>
						<th><spring:message code="se"/></th>
						<th><spring:message code="previousYear"/></th>
						<th><spring:message code="theYear"/></th>
						<th><spring:message code="increase"/></th>
					</thead>
					<tbody>
						<tr>
							<th scope="row"><spring:message code="selngAm"/></th>
							<td><span id="D_PRIOR_YEAR_SALE_AMT"></span></td>
							<td><span id="D_THE_YEAR_SALE_AMT"></span></td>
							<td><span id="D_ADD_AMT"></span></td>
						</tr>
					</tbody>
				</table>
				<h3 class="bul_arr tit_top"><spring:message code="memberPoint"/></h3>
				<table class="tbl_st2 tbl_st5 mar_T0">
					<colgroup>
						<col style="width:16%">
						<col style="width:28%">
						<col style="width:28%">
						<col style="width:28%">
					</colgroup>
					<thead>
						<th><spring:message code="se"/></th>
						<th><spring:message code="salPoint"/></th>
						<th><spring:message code="minusPoint"/></th>
						<th><spring:message code="salUpPoint"/></th>
					</thead>
					<tbody>
						<tr>
							<th scope="row"><spring:message code="point"/></th>
							<td><span id="D_SALE_TPOINT"></span></td>
							<td><span id="D_MINUS_POINT"></span></td>
							<td><span id="D_SALE_UPOINT"></span></td>
						</tr>
					</tbody>
				</table>
				
				<form name="update_frm" id="update_frm" >
					<input type="hidden" id="P_CORP_CODE" name="P_CORP_CODE" value="${sessionScope.CORP_CODE }" />	<!-- 기업코드 -->
					<input type="hidden" id="P_CUST_NO" name="P_CUST_NO" >
					<input type="hidden" id="P_REG_ID" name="P_REG_ID" value="${sessionScope.ID }" />
					<input type="hidden" id="P_MBR_GRADE_ORG" name="P_MBR_GRADE_ORG" >	<!-- 알림톡 발송을 위한 param -->
					<input type="hidden" id="P_MBR_GRADE_ORG_NAME" name="P_MBR_GRADE_ORG_NAME" >	<!-- 알림톡 발송을 위한 param -->
					
					<h3 class="bul_arr tit_top"><spring:message code="changeMembershipLevel"/></h3>
					<div class="grade_chg">
						<div>
							<label for="">회원구분 (<spring:message code="txtNow"/>)</label>
							<input type="text" id="P_BUSI_FLAG_NAME" name="P_BUSI_FLAG_NAME" readonly="readonly" tabindex="-1" onfocus="this.blur()" />
							<span>▶</span>
							<label for=""><spring:message code="txtChange"/></label>
							<select id=P_BUSI_FLAG name="P_BUSI_FLAG">
								
							</select>
						</div>
						
						<div>
							<label for="">회원등급 (<spring:message code="txtNow"/>)</label>
							<input type="text" id="P_MBR_GRADE_NAME" name="P_MBR_GRADE_NAME" readonly="readonly" tabindex="-1" onfocus="this.blur()" />
							<span>▶</span>
							<label for=""><spring:message code="txtChange"/></label>
							<select id="P_MBR_GRADE" name="P_MBR_GRADE">
								
							</select>
							<br /><br />
							<button type="button" id="btn_grade_save" class="btn btn_style4" style="margin-left:50px;" ><spring:message code="btnExec"/></button>
							<button type="button" id="btn_memberInfo" class="btn btn_style4" style="margin-left:80px;" >회원정보관리</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- 본문 영역 -->
		
	</div>
	<!-- //Content : 본문 영역 -->
	

</body>
</html>