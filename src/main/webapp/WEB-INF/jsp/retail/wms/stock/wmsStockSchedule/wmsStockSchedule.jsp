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
	설명: WMS-재고조사 일정 관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-21    문희훈       초기작성 
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
<script type="text/javascript" src="/resources/js/page/wms/stock/wmsStockSchedule/wmsStockSchedule.js" charset="utf-8"></script>
<style type="text/css">
    option.disabled { color: lightgrey; }
</style>
<script>
var STR_CODE = "${sessionScope.STR_CODE}";
var STR_NAME = "${sessionScope.STR_NAME}";
</script>
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
	    		$("#btn_read").hide();
	    		$("#btn_update").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_create").hide();
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
			<div class="f_r">
				<!-- 권한에 따른 버튼 show/hide -->
				<button type="button" id="btn_create"  class="btn btn_style2" onclick="btn_create()" ><spring:message code="btnNew"/></button>
			    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="btn_update()"><spring:message code="btnSave"/></button>
				<button type="button" id="btn_read" class="btn btn_style3"  onclick="btn_read()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
			
		<div class="sec_category" id="form1" name="form1">
			<section>
				<input type="hidden" id="GRADE" name="GRADE"/>
				<h3 class="bul_arr f_l"><spring:message code="detailedInventorySurveySchedule"/></h3> 
				<table class="tbl_st2">
					<tbody>
						<tr>
							<th scope="row"><em>필수입력항목</em><spring:message code="storNm"/></th>
							<td><select id="P_STR_NAME" name="P_STR_NAME" class="wid2" onchange="setStrCode()"></select></td>
							<th scope="row"><em>필수입력항목</em><spring:message code="storCode"/></th>
							<td><input type="text" id="P_STR_CODE" name="P_STR_CODE" class="wid2" disabled></td>						
							<th scope="row"><em>필수입력항목</em><spring:message code="inventorySurveyScheduleID"/></th>
							<td><input type="text" id="P_INV_INSP_SCHD_ID" name="P_INV_INSP_SCHD_ID" class="wid2" disabled></td>
						</tr>					
						<tr>							
							<th scope="row"><em>필수입력항목</em><spring:message code="inventorySurveyScheduleDate"/></th>
							<td><input type="text" id="P_INV_INSP_DT" name="P_INV_INSP_DT" class="datepicker wid2"></td>							
							<th scope="row"><em>필수입력항목</em><spring:message code="inventorySurveyClassification"/></th>
							<td>
								<select id="P_INV_INSP_GB" name="P_INV_INSP_GB" class="wid2"></select>
							</td>
							<th scope="row"><em>필수입력항목</em><spring:message code="inventorySurveyMethod"/></th>
							<td>
								<select id="P_INV_SURL_MTHD" name="P_INV_SURL_MTHD" class="wid2"></select>
							</td>
						</tr>						
					</tbody>
				</table>	
				<div class="col2 sub_cnt" id="" name="">
				<h3 class="bul_arr tit_top"><spring:message code="inventorySurveySchedule"/></h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
				</div>
				</div>		
			</section>	
		</div>		
	</div>
</body>
</html>
	
