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
	2017-01-12    권용욱       초기작성 
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
<script type="text/javascript" src="/resources/js/page/business/gift/businessGiftMaster.js?ver=20170531_1" charset="utf-8"></script>
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
	    	//alert(data);
	    	
	    	//사용자 기능별 권한관리 데이터가 없으면 모든 버튼 숨김
	    	if(data == ""){
	    		$("#btn_read").hide();
	    		$("#btn_create").hide();
	    		$("#addRow").hide();
	    		$("#btn_update").hide();
	    		$("#delRow").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_create").hide();
	    		$("#addRow").hide();
	    		$("#btn_update").hide();
	    		$("#delRow").hide();
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
		    		$("#addRow").show();
		    	}else{
		    		$("#btn_create").hide();
		    		$("#addRow").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_update").show();
		    	}else{
		    		$("#btn_update").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#delRow").show();
		    	}else{
		    		$("#delRow").hide();
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
					<button type="button" id="btn_create"  class="btn btn_style2" onclick="btnNew()" ><spring:message code="btnNew"/></button>
				    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="btnSave()"><spring:message code="btnSave"/></button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="btnSearch()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area"    id="top_search">
				<div class="last">
					<label for=""><spring:message code="giftName"/></label>
					<input type="text" id="P_GIFT_NAME" name="P_GIFT_NAME" class="search_txt">
					<button type="button" class="search_btn" onclick="btnSearch()">검색 아이콘</button>	
					<input type="hidden" id="S_CUST_NO" name="S_CUST_NO" class="search_txt">
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<div class="clear">
				<div class="lft_wid f_l">
					<h3 class="bul_arr"><spring:message code="giftList"/></h3>
					<div id="gridHolder1"></div>
				</div>
				<div class="rgt_wid f_r">
					<h3 class="bul_arr"><spring:message code="giftList"/></h3>
					<table class="tbl_st2">
						<tr>
							<th><em>필수입력사항</em><spring:message code="giftCmpFlag"/></th>
							<td><select id="GIFT_CMP_FLAG" name="GIFT_CMP_FLAG" class="wid2"></select></td>
							<th>
								<spring:message code="giftChangeFlag"/>
							</th>
							<td>
								<input type="text" id="EVT_NAME" name="EVT_NAME" class="search_txt" disabled>
								<button type="button" class="search_btn" onclick="btn_comm_user_search()" id="BTN_EVT" name="BTN_EVT" disabled>검색 아이콘</button>	
								<input type="hidden" id="EVT_CODE" name="EVT_CODE" />
							</td>	
						</tr>
						<tr>
							<th><em>필수입력사항</em><spring:message code="giftName"/></th>
							<td colspan="3"><input type="text" id="GIFT_CODE" name="GIFT_CODE" class="wid2 mar_R4" disabled><input type="text" id="GIFT_NAME" name="GIFT_NAME" class="wid4"></td>
						</tr>
						<tr>
							<th><em>필수입력사항</em><spring:message code="giftDt"/></th>
							<td colspan="3">
								<input type="text" id="GIFT_STR_DT" name="GIFT_STR_DT" class="datepicker"> ~ <input type="text" id="GIFT_END_DT" name="GIFT_END_DT" class="datepicker">
							</td>						
						</tr>
						<tr>
							<th><em>필수입력사항</em><spring:message code="tgetCust"/></th>
							<td><select id="TGET_CUST" name="TGET_CUST" class="wid2"></select></td>		
							<th><em>필수입력사항</em><spring:message code="tgetStr"/></th>
							<td><select id="STR_CODE" name="STR_CODE" class="wid2"></select></td>													
						</tr>
						<tr>
							<th><spring:message code="publishCnt"/></th>
							<td colspan="3"><input type="text" id="PUBLISH_CNT" name="PUBLISH_CNT" class="wid2" disabled></td>						
						</tr>
						<!-- <tr>
							<th><em>필수입력사항</em>포인트포함</th>
							<td colspan="3">
								<input type="radio" id="" name="" value="" /><label for="" class="mar_L2 mar_R4">예</label><input type="radio" id="" name="" value="" /><label for="" class="mar_L2">아니오</label>
							</td>						
						</tr> -->
						<tr>
							<th><spring:message code="remark"/></th>
							<td colspan="3"><textarea id="REMARK" name="REMARK"></textarea></td>						
						</tr>						
					</table>
					<div class="clear tit_top">
						<h3 class="bul_arr f_l">사은품</h3>
						<div class="f_r">
							<button type="button" id="addRow"  class="btn btn_style4" onclick="addRow()"><spring:message code="addRow"/></button>
							<button type="button" id="delRow"  class="btn btn_style4" onclick="deleteRow()"><spring:message code="delRow"/></button>
						</div>
					</div>
					<div id="gridHolder2"></div>					
				</div>
			</div>
		<!-- //Content : 본문 영역 -->
	
</body>
</html>
	
