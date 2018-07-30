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
	설명: 조직마스터 관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2016-12-23    문희훈       초기작성 
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
<script type="text/javascript" src="/resources/js/page/organization/organization_management.js?ver=20171023_002" charset="utf-8"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<style type="text/css">
    option.disabled { color: lightgrey; }
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
	    	//alert(data);
	    	
	    	//사용자 기능별 권한관리 데이터가 없으면 모든 버튼 숨김
	    	if(data == ""){
	    		$("#btn_create").hide();
	    		$("#btn_update").hide();
	    		$("#btn_read").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_create").hide();
	    		$("#btn_update").hide();
	    		$("#btn_read").hide();
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
					<a href="" class="close_btn p_a">도움말 닫기</a>
				</div>
				<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
				<span class="txt">※ <spring:message code="msgOrganization"/></span>
				<div class="f_r">
					<!-- 권한에 따른 버튼 show/hide -->
					<button type="button" id="btn_create"  class="btn btn_style2" onclick="btn_create()" ><spring:message code="btnNew"/></button>
				    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="btn_update()"><spring:message code="btnSave"/></button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="btn_read()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
		<div class="sec_category" id="form1" name="form1">
			<div class="organization"> 
				<div id="tree_menu">
				</div> 
			</div>
			<section class="sec_menu_info">
				<input type="hidden" id="GRADE" name="GRADE"/>
				<h3 class="bul_arr f_l"><spring:message code="organizationDetails"/></h3>
				<table class="tbl_st2 tbl_st3">
					<tbody>
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="topGroupCode"/></label></th>
							<td colspan="3">
								<input type="text" id="UPPER_DEPT" name="UPPER_DEPT" maxlength="" class="wid2" readonly>
								<input type="text" id="UPPER_DEPT_NAME" name="UPPER_DEPT_NAME" maxlength="" class="wid1 wid_marL" readonly>
							</td>
						</tr>
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="deptCode"/></label></th>
							<td colspan="3">
								<input type="text" id="DEPT_CODE" name="DEPT_CODE" maxlength="5" class="wid2"  style="background-image: url('/resources/img/common/icon_no.png');background-repeat: no-repeat;background-position:99% 50%;padding-right: 20px;">
								<input type="text" id="DEPT_NAME" name="DEPT_NAME" maxlength="10" class="wid1 wid_marL">
								<input type="hidden" id="deptCodeYN" name="deptCodeYN" value="N">
							</td>
						</tr> 						
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="organizationType"/></label></th>
							<td>
								<select id="ORG_TYPE" name="ORG_TYPE" class="wid1"></select>
							</td>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="useYn"/></label></th>
							<td>
								<select id="USE_YN" name="USE_YN" class="wid1"></select>
							</td>							
						</tr>	
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="bizNo"/></label></th>
							<td>
								<input type="text" id="BUSI_NO" name="BUSI_NO" maxlength="12" class="wid1">
								<!-- <a href="#" onclick="checkBizRegNo()">dddd</a> -->
							</td> 
							<th scope="row"><em>필수입력항목</em><label><spring:message code="ceoName"/></label></th>
							<td><input type="text" id="REP_NAME" name="REP_NAME" maxlength="10" class="wid1"></td>
						</tr>   						
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="business"/></label></th>
							<td><input type="text" id="UPTAE" name="UPTAE" maxlength="25" class="wid1"></td>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="sectors"/></label></th>
							<td><input type="text" id="UPJONG" name="UPJONG" maxlength="25" class="wid1"></td>
						</tr>   						
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="addr"/></label></th>
							<td colspan="3">
								<input type="text" id="POST_NO" name="POST_NO" maxlength="" class="wid2" disabled="disabled">
								<button type="button" id="ZIP_BUTTON" class="search_btn" onClick="execDaumPostcode( 'POST_NO','ADDR', 'ADDR_DTL' );">검색 아이콘</button>
								<input type="text" id="ADDR" name="ADDR" maxlength="" class="wid1 wid_marL" disabled="disabled">
								<input type="text" id="ADDR_DTL" name="ADDR_DTL" maxlength="25" class="wid1 wid_marL" >
							</td>
						</tr>						
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="category"/></label></th>
							<td>
								<select id="UPTAE_FLAG" name="UPTAE_FLAG" class="wid2" onchange="fnUptaeFkag()"></select>
							</td>	
							<th scope="row"><label><spring:message code="phoneNumber"/></label></th>
							<td>								
								<select id="TEL_NO1" name="TEL_NO1" class="wid3"></select>
								<input type="text" id="TEL_NO2" name="TEL_NO2" maxlength="4" class="wid3 wid_marL" >
								<input type="text" id="TEL_NO3" name="TEL_NO3" maxlength="4" class="wid3 wid_marL" >
								<input type="hidden" id="TEL_NO" name="TEL_NO">
							</td>
						</tr>  										
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="startDay"/></label></th>
							<td><input type="text"   id="OPEN_DT" name="OPEN_DT"  class="wid2 datepicker" /></td>
							<th scope="row"><label><spring:message code="faxNumber"/></label></th>
							<td>								
								<input type="text" id="FAX_NO1" name="FAX_NO1" maxlength="3" class="wid3" >
								<input type="text" id="FAX_NO2" name="FAX_NO2" maxlength="4" class="wid3 wid_marL" >
								<input type="text" id="FAX_NO3" name="FAX_NO3" maxlength="4" class="wid3 wid_marL" >
								<input type="hidden" id="FAX_NO" name="FAX_NO">
							</td>
						</tr>						
						<tr>
							<th scope="row"><label><spring:message code="area"/></label></th>
							<td><input type="text" id="STR_AREA" name="STR_AREA" maxlength="7" class="wid2"></td>
							<th scope="row"><label><spring:message code="parkingArea"/></label></th>
							<td><input type="text" id="CAR_AREA" name="CAR_AREA" maxlength="7" class="wid2"></td>
						</tr>  						
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="accountingCode"/></label></th>
							<td><input type="text" id="ACCT_DEPT" name="ACCT_DEPT" maxlength="5" class="wid2"></td>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="accountingDepartmentCode"/></label></th>
							<td><input type="text" id="ACCT_UPPER_DEPT" name="ACCT_UPPER_DEPT" maxlength="5" class="wid2"></td>
						</tr>
						<tr>
							<th scope="row"><!-- <em>필수입력항목</em> --><label><spring:message code="terminalID"/></label></th>
							<td><select id="TERM_ID_VAN" name="TERM_ID_VAN" class="wid1"></select></td>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="centerCode"/></label></th>
							<td><select id="CENTA_CODE" name="CENTA_CODE" class="wid1"></select></td>
						</tr>
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="daysOfSales"/></label></th>
							<td><input type="text" id="SALE_TRM" name="SALE_TRM" maxlength="3" class="wid2" style="text-align: right; padding-right:5px;" ></td>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="signAmount"/></label></th>
							<td><input type="text" id="SIGN_AMT" name="SIGN_AMT" maxlength="12" class="wid2" style="text-align: right; padding-right:5px;" ></td>
						</tr>													
						<tr> 
							<th scope="row"><label><spring:message code="properties"/></label></th>
							<td>								
								<input type="text" id="IEMP_NO" name="IEMP_NO" maxlength="" class="wid2" readonly="">
								<input type="text" id="IDATE" name="IDATE" maxlength="" class="wid2 wid_marL" readonly="">
							</td>
							<th scope="row"><label><spring:message code="aboutFixes"/></label></th>
							<td>
								<input type="text" id="UEMP_NO" name="UEMP_NO" maxlength="" class="wid2" readonly="">
								<input type="text" id="UDATE" name="UDATE" maxlength="" class="wid2 wid_marL" readonly="">
							</td>	 
						</tr>
						<!-- <tr> 
							<th scope="row"><label>지역정보</label></th>
							<td colspan="3">				
								<div class="store_area">영업 매장 위치 정보</div>	
							</td> 
						</tr> -->						
					</tbody>
				</table>			
			</section>	
		</div>		
	</div>
	<!-- 다음 우편번호 레이어 시작 -->
	<div id="daumZipLayer" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;">
		<img src="http://i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
	</div>
	<!-- 다음 우편번호 레이어 끝 -->
	<script src="/resources/js/daumZip.js"></script>
</body>
</html>
	
