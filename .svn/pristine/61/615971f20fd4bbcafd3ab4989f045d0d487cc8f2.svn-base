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
	설명: 공통코드관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2016-12-26    권용욱       초기작성 
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
<script type="text/javascript" src="/resources/js/page/claim/regist/userClaimRegist.js?ver=20180406_000" charset="utf-8"></script>
<!-- 공통팝업호출 -->
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
	    		$("#btn_update").hide();
	    		$("#btn_read").hide();
	    		$("#btn_excel").hide();
	    		$("#btn_create").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_update").hide();
	    		$("#btn_read").hide();
	    		$("#btn_excel").hide();
	    		$("#btn_create").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_read").show();
		    	}else{
		    		$("#btn_read").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#btn_create").show();
		    	}else{
		    		$("#btn_create").hide();
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
		    		$("#btn_excel").show();
		    	}else{
		    		$("#btn_excel").hide();
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
				<a href="" class="close_btn p_a">도움말 닫기</a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
			<div class="f_r">
				<!-- 권한에 따른 버튼 show/hide -->
			    <button type="button" id="btn_excel" class="btn btn_style2" onclick="btnExcelDown();"><spring:message code="btnExcelDown"/></button>
				<button type="button" id="btn_create" class="btn btn_style2" onclick="btnNew();" ><spring:message code="btnNew"/></button>
			    <button type="button" id="btn_update" class="btn btn_style2" onclick="btnSave();"><spring:message code="btnSave"/></button>
				<button type="button" id="btn_read" class="btn btn_style3" onclick="btnSearch();"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<div id="top_search" class="search_area">
			<div class="last">
				<label for=""><spring:message code="storNm"/></label>
				<select id="P_STR_CODE" name="P_STR_CODE" class="wid2"></select>
				
				<label for=""><spring:message code="date"/></label>
				<input type="text" id="P_RCPT_DTTM_STR" name="P_RCPT_DTTM_STR" class="datepicker1 datepicker" style="width:80px;" /> ~
				<input type="text" id="P_RCPT_DTTM_END" name="P_RCPT_DTTM_END" class="datepicker2 datepicker" style="width:80px;" />
				
				<label for="">상태</label>
				<select id="P_CLAIM_STAT" name="P_CLAIM_STAT" class="wid2"></select>
				
				<label for=""><spring:message code="customerNm"/></label>
				<input type="hidden" id="P_CUST_NO" name="P_CUST_NO" />
				<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt" style="width:80px;" />
				<button type="button" class="search_btn" onclick="btn_comm_user_search_top();">검색 아이콘</button>
				
				<label for="">타입</label>
				<select id="P_CLAIM_TP" name="P_CLAIM_TP" class="wid2"></select>
				
				<div class="f_r">
					<label for=""><spring:message code="reSearch"/></label>
					<select id="SEARCH_TIME" name="SEARCH_TIME" style="width:80px" class="mar_R0" onchange="selectGo(this.value);">
						<option value="300000"  <c:if test="${param.SEARCH_TIME eq '300000'}">selected</c:if>>5<spring:message code="txtMinute"/></option>
						<option value="600000"  <c:if test="${param.SEARCH_TIME eq '600000'}">selected</c:if>>10<spring:message code="txtMinute"/></option>
						<option value="900000"  <c:if test="${param.SEARCH_TIME eq '900000'}">selected</c:if>>15<spring:message code="txtMinute"/></option>
						<option value="1200000" <c:if test="${param.SEARCH_TIME eq '1200000'}">selected</c:if>>20<spring:message code="txtMinute"/></option>
						<option value="1500000" <c:if test="${param.SEARCH_TIME eq '1500000'}">selected</c:if>>25<spring:message code="txtMinute"/></option>
						<option value="2000000" <c:if test="${param.SEARCH_TIME eq '2000000'}">selected</c:if>>30<spring:message code="txtMinute"/></option>
					</select>
				</div>
			</div>
		</div>
		<!-- //조회폼 영역 -->
		
		<h3 class="bul_arr"><spring:message code="claimList"/></h3>
		<div id="gridHolder1"></div>
		<h3 class="bul_arr tit_top"><spring:message code="claimDetail"/></h3>
		<table class="tbl_st2" id="body_area">
			<colgroup>
				<col style="width:10%">
				<col>
				<col style="width:10%">
				<col>
				<col style="width:10%">
				<col>
				<col style="width:10%">
				<col>
			</colgroup>			
			<tr>
				<th><em>필수입력사항</em><spring:message code="busiFlag"/></th>
				<td>
				 	<input type="radio" id="USER_YN_Y" name="USER_YN" checked><label for="" class="wid_marL"><spring:message code="yes"/></label>
				 	<input type="radio" id="USER_YN_N" name="USER_YN"><label for="" class="wid_marL"><spring:message code="no"/></label>
				</td>	
				<th><spring:message code="customerNm"/></th>
				<td>
					<input type="text" class="wid2" id="CUST_NAME" name="CUST_NAME" maxlength="15" />
					<button type="button" id="btnCustSerach" name="btnCustSerach" class="search_btn" onclick="btn_comm_user_search_body();">검색 아이콘</button>
				</td>			
				<th><spring:message code="customerNumber"/></th>
				<td><input type="text" class="wid2" id="CUST_NO" name="CUST_NO" disabled /></td>					
				<th><spring:message code="phoneNumber"/></th>
				<td><input type="text" class="wid2" id="MOBIL_NO" name="MOBIL_NO" maxlength="11" /></td>
			</tr>
			<tr>
				<th><em>필수입력사항</em><spring:message code="claimTp"/></th>
				<td><select id="CLAIM_TP" name="CLAIM_TP" class="wid2"></select></td>
				<th><em>필수입력사항</em><spring:message code="storNm"/></th>
				<td><select id="STR_CODE" name="STR_CODE" class="wid2"></select></td>
				<th><spring:message code="employeeName"/></th>
				<td>
					<input type="hidden" id="RCPT_NO" name="RCPT_NO" />
					<input type="hidden" id="RCPT_EMP" name="RCPT_EMP" />
					<input type="text" id="RCPT_EMP_NAME" name="RCPT_EMP_NAME" class="wid2" />
					<button type="button" id="btnUserSearch" class="search_btn" onclick="btn_comm_member_search();">검색 아이콘</button>
				</td>					
				<th><em>필수입력사항</em><spring:message code="claimStat"/></th>
				<td>
					<select id="CLAIM_STAT" name="CLAIM_STAT" class="wid2" disabled></select>
				</td>			
			</tr>				
			<tr>
				<th><spring:message code="orderEmp"/></th>
				<td><input type="text" class="wid2" id="IEMP_NAME" name="IEMP_NAME" disabled /></td>
				<th><spring:message code="orderDatetime"/></th>
				<td colspan="5"><input type="text" class="wid1" id="IDATE" name="IDATE" disabled /></td>	
			</tr>		
			<tr>
				<th><em>필수입력사항</em><spring:message code="title"/></th>
				<td colspan="7"><input type="text" class="wid100" id="SUBJECT" name="SUBJECT" maxlength="250" /></td>	
			</tr>					
			<tr>
				<th><em>필수입력사항</em><spring:message code="conts"/></th>
				<td colspan="7"><textarea class="note" id="CONTS" name="CONTS" maxlength="1000"></textarea></td>	
			</tr>									
		</table>
		<!-- //Content : 본문 영역 -->
		
		<div id="pop_wrap1">
			<div id="pop_cnt">
				<h3 class="bul_arr"><spring:message code="claimManageSearch"/></h3>
				<table class="tbl_st2" id="body_area2">
					<tr>
						<th><spring:message code="title"/></th>
						<td colspan="5">
							<input type="text" class="wid4 mar_R4" id="SUBJECT" name="SUBJECT" disabled />
							<button type="button" id="" class="btn btn_style4" onclick="btn_close();"><spring:message code="btnClose"/></button>
						</td>
						<!-- 버튼 삭제할 경우 <input type="text" class="wid100 mar_R4" id="" name="">로 변경 -->
					</tr>
					<tr>
						<th><spring:message code="manageDetail"/></th>
						<td colspan="5"><textarea id="CONTS" name="CONTS" class="" style="background-color: #ebebeb;" disabled></textarea></td>
					</tr>
					<tr>
						<th><spring:message code="manageRowNum"/></th>
						<td>
							<select id="SEQ" name="SEQ" class="wid3"></select>
						</td>
						<th><spring:message code="inputName"/></th>
						<td><input type="text" class="wid2" id="IEMP_NAME" name="IEMP_NAME" disabled /></td>							
						<th><spring:message code="iDateTime"/></th>
						<td><input type="text" class="wid1" id="IDATE" name="IDATE" disabled /></td>
					</tr>												
				</table>
			</div>
		</div>		
	</div>
	
</body>
</html>