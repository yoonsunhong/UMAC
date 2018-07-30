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
	설명: 사용자 관리
		
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
<script type="text/javascript" src="/resources/js/page/user/user_management.js?ver=20180316_001" charset="utf-8"></script>
<!-- 공통 팝업 -->
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
	    	//alert(data);
	    	
	    	//사용자 기능별 권한관리 데이터가 없으면 모든 버튼 숨김
	    	if(data == ""){
	    		$("#btn_create").hide();
	    		$("#btn_update").hide();
	    		$("#btn_read").hide();
	    		$("#BTN_RESET_PW").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_create").hide();
	    		$("#btn_update").hide();
	    		$("#btn_read").hide();
	    		$("#BTN_RESET_PW").hide();
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
		    		$("#BTN_RESET_PW").show();
		    	}else{
		    		$("#btn_update").hide();
		    		$("#BTN_RESET_PW").hide();
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
				<div class="f_r">
					<!-- 권한에 따른 버튼 show/hide -->
					<button type="button" id="btn_create"  class="btn btn_style2" onclick="btn_create()"><spring:message code="btnNew"/></button>
				    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="btn_update()"><spring:message code="btnSave"/></button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="btn_search()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><spring:message code="staff"/></label>
					<input type="text" id="TOP_USER_NM" name="TOP_USER_NM" maxlength="15" onkeydown="setSearch(event);" />
					<label for=""><spring:message code="staffClassification"/></label>
					<select  id="TOP_EMP_DUTY" name="TOP_EMP_DUTY"></select>
					<label for=""><spring:message code="classification"/></label>
					<select  id="TOP_JOB_FLAG" name="TOP_JOB_FLAG"></select>		
				</div>

			</div>
			<!-- //조회폼 영역 -->
			
			<div class="col2 sub_cnt">

				<div class="box_lft">
					<h3 class="bul_arr"><spring:message code="staffLlist"/></h3>
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder1"></div>
						</div>
					</div>
				</div>
				
				<div class="box_rgt" id="form1">
					<h3 class="bul_arr f_l"><spring:message code="staffDetailInformation"/><span style="font-weight: normal;">※ <spring:message code="msgUserPw"/></span></h3>
					<table class="tbl_st2 tbl_st3">
						<tbody>
							<tr>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="staffId"/></label></th>
								<td>
									<input type="text" id="USER_ID" name="USER_ID" maxlength="8" class="wid1"style="background-image: url('/resources/img/common/icon_no.png');background-repeat: no-repeat;background-position:99% 50%;padding-right: 20px;"/>
									<input type="hidden" id="userIdYN" name="userIdYN" value="N">
								</td>
								<th scope="row"><label><spring:message code="password"/></label></th>
								<td><input type="password" id="PASSWD" disabled="disabled" name="PASSWD" maxlength="" class="wid1" value=""></td>
							</tr> 
							<tr>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="staffName"/></label></th>
								<td><input type="text" id="USER_NM" name="USER_NM" maxlength="" class="wid1"></td>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="mobilePhoneNumber"/></label></th>
								<td>								
									<select id="MOBIL_NO1" name="MOBIL_NO1" class="wid3"></select>
									<input type="text" id="MOBIL_NO2" name="MOBIL_NO2" maxlength="4" class="wid3 wid_marL" />
									<input type="text" id="MOBIL_NO3" name="MOBIL_NO3" maxlength="4" class="wid3 wid_marL" />
									<input type="hidden" id="MOBIL_NO" name="MOBIL_NO" />
								</td>
							</tr>    
							<tr>  
								<th scope="row"><em>필수입력항목</em><label><spring:message code="departmentCode"/></label></th>
								<td>
									<input type="text" id="DEPT_CODE" name="DEPT_CODE" maxlength="" class="search_txt" disabled="disabled">
									<button type="button" class="search_btn" onclick="btn_comm_dept_search()">검색 아이콘</button>
								</td>
								<th scope="row"><label><spring:message code="departmentName"/></label></th>
								<td><input type="text" id="DEPT_NAME" name="DEPT_NAME" maxlength="" class="wid1" readonly></td>
							</tr> 
							<tr>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="position"/></label></th>
								<td>
									<select id="POSITION" name="POSITION" class="wid1"></select>
								</td>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="staffClassification"/></label></th>
								<td>
									<select id="EMP_DUTY" name="EMP_DUTY" class="wid1"></select>
								</td>							
							</tr>  
							<tr>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="rightsGroup"/></label></th>
								<td>
									<select id="ROLE_ID" name="ROLE_ID" class="wid1"></select>
								</td>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="classification"/></label></th>
								<td>
									<select id="JOB_FLAG" name="JOB_FLAG" class="wid1"></select>
								</td>						
							</tr>  						
							<tr>
								<th scope="row"><label><spring:message code="passwordInitialProcessing"/></label></th>
								<td class="wid1" colspan="3">
									<button type="button" id="BTN_RESET_PW" name="" class="btn btn btn_style3" onclick="resetPw()"><spring:message code="passwordInitialProcessing"/></button>
									<span>※ <spring:message code="msgComment"/></span>
								</td>						
							</tr>  							
							<tr> 
								<th scope="row"><label><spring:message code="properties"/></label></th>
								<td>								
									<input type="text" id="IEMP_NO" name="IEMP_NO" maxlength="" class="wid2" readonly="">
									<input type="text" id="REGDT" name="REGDT" maxlength="" class="wid2 wid_marL" readonly="">
								</td>
								<th scope="row"><label><spring:message code="aboutFixes"/></label></th>
								<td>
									<input type="text" id="UEMP_NO" name="UEMP_NO" maxlength="" class="wid2" readonly="">
									<input type="text" id="UPDDT" name="UPDDT" maxlength="" class="wid2 wid_marL" readonly="">
								</td>	 
							</tr>
							<tr> 
								<th scope="row">
								<label><spring:message code="remarks"/></label>
								<br/> <br/><span id="byteInfo">0</span>/500 Byte
								</th>
								<td colspan="3">								
									<textarea name="REMARK" id="REMARK" class="note1" onKeyUp="javascript:fnChkByte(this,'500')"></textarea>
								</td> 
							</tr>						
						</tbody>
					</table>			
				</div>
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	
	
</body>
</html>
	
