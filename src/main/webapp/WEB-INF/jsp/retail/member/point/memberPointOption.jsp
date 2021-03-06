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
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>공통팝업</title>

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
	설명: 포인트임의관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2016-12-23    오동근       초기작성 
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
<script type="text/javascript" src="/resources/js/page/member/point/memberPointOption.js?ver=20180410_000" charset="utf-8"></script>	

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
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_update").hide();
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
		<form id="reg_form" name="reg_form">
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
				    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="fnUpdate()"><spring:message code="btnSave"/></button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="fnSearch()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수입력항목</em><spring:message code="cusName"/></label>
					<input type="text" id="P_CUS_NAME" name="P_CUS_NAME" class="search_txt" data-for="P_CUST_NO">
					<input type="hidden" id="P_CUST_NO" name="P_CUST_NO" class="search_txt">
					<input type="hidden" id="P_CORP_CODE" name="P_CORP_CODE" class="search_txt">
					<button type="button" onclick="btn_comm_user_search()" class="search_btn">검색 아이콘</button>
					<label for=""><em>필수입력항목</em><spring:message code="btnSearchDate"/></label>
					<input type="text" name="P_SEARCH_START_DT" id="P_SEARCH_START_DT" class="datepicker"/> ~ <input type="text" name="P_SEARCH_END_DT" id="P_SEARCH_END_DT" class="datepicker"/>
					<input type="hidden" name="SEARCH_YN" id="SEARCH_YN" value="N" />
					<input type="hidden" name="P_IEMP_NO" id="P_IEMP_NO" value="${sessionScope.ID}" />
					<input type="hidden" name="P_APP_DT" id="P_APP_DT" />
					<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE }"> 
					<input type="hidden" id="SESSION_ROLE_ID"  name="SESSION_ROLE_ID"  value="${sessionScope.ROLE_ID}"   > 
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<div class="col2 sub_cnt">
				<div class="mem_tbl clear">
					<div class="f_l">
						<h1 class="bul_arr f_l"><spring:message code="memberInfo"/></h1>
						<table class="tbl_st2 tbl_st3">
							<tbody>
								<tr>
									<th scope="row"><label><spring:message code="cusName"/></label></th>
									<td id="CUS_NAME_TEXT"></td>
									<th scope="row"><label><spring:message code="birthDate"/></label></th>
									<td id="BIR_DATE"></td>
									<th scope="row"><label><spring:message code="sex"/></label></th>
									<td id="SEX"></td>								
								</tr>     
								<tr>  
									<th scope="row"><label><spring:message code="phoneNumber"/></label></th>
									<td id="TEL_NO"></td>
									<th scope="row"><label><spring:message code="mobilNo"/></label></th>
									<td id="MOBIL_NO"></td>		
									<th scope="row"><label><spring:message code="mbrGrade"/></label></th>
									<td id="MBR_GRADE"></td>														
								</tr> 
								<tr>  
									<th scope="row"><label><spring:message code="supplyName"/></label></th>
									<td id="BUSI_NAME"></td>
									<th scope="row"><label><spring:message code="busiNo"/></label></th>
									<td id="BUSI_NO"></td>	
									<th scope="row"><label><spring:message code="busiFlag"/></label></th>
									<td id="BUSI_FLAG"></td>																	
								</tr>
							</tbody>
						</table>	
					</div>
					<div class="f_r">
						<h1 class="bul_arr f_l"><spring:message code="memberPoint"/></h1>
						<table class="tbl_st2 tbl_st3">
							<tbody>
								<tr>
									<th scope="row" style="width:50%;"><label><spring:message code="salPoint"/></label></th>
									<td id="SAL_AMT" align="right"></td>					
								</tr>							
								<tr>
									<th scope="row" style="width:50%;"><label><spring:message code="minusPoint"/></label></th>
									<td id="MINUS_POINT" align="right"></td>					
								</tr>							
								<tr>
									<th scope="row" style="width:50%;"><label><spring:message code="salUpPoint"/></label></th>
									<td id="SAL_UPOINT" align="right"></td>					
								</tr>							
							</tbody>
						</table>
					</div>					
				</div>
				<h3 class="bul_arr tit_top f_l"><spring:message code="pointOption"/></h3>
				<table class="tbl_st2 tbl_st3">
					<tbody>
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="storNm"/></label></th>
							<td>
								<select id="P_STR_CODE" name="P_STR_CODE" class="wid1" disabled="disabled"></select>
							</td>
							<th scope="row"><label><em>필수입력항목</em><spring:message code="point"/></label></th>
							<td><input type="text" id="P_MNUL_POINT" name="P_MNUL_POINT" maxlength="8" class="wid2 t_r" onkeyup="CommonJs.input_comma(this);" ></td>								
						</tr>
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="reasonGubun"/></label></th>
							<td>
								<select id="P_MNUL_REASON" name="P_MNUL_REASON" class="wid1">
								</select>
							</td>
							<th scope="row"><label><spring:message code="detailMemo"/></label></th>
							<td colspan="3"><input type="text" id="P_REMARK" name="P_REMARK" maxlength="" class="wid100"></td>								
						</tr> 						
					</tbody>
				</table>
				<div class="sec_grid">
					<div class="content">
						<h3 class="bul_arr tit_top f_l"><spring:message code="pointOptionStatus"/></h3>
						<div id="gridHolder1"></div>
					</div>
				</div>				
			</div>
		</form>
		</div>
		<!-- //Content : 본문 영역 -->
	 

	<div id="wrap1">
		<div id="iframeCnt">
			<div class="col2 sub_cnt">
	 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
</body>
</html>
	
