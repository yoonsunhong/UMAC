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
<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<script type="text/javascript" src="/resources/js/page/business/campaignmaster/businessCampaignMaster.js?ver=20180406_00" charset="utf-8"></script>
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
	    		$("#btn_read").hide();
	    		$("#btn_create").hide();
	    		$("#btn_delete").hide();
	    		$("#btn_update").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_create").hide();
	    		$("#btn_delete").hide();
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
		    		$("#btn_delete").show();
		    	}else{
		    		$("#btn_delete").hide();
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
					<button type="button" id="btn_delete"  class="btn btn_style2" onclick="btnDelete()" ><spring:message code="btnDel"/></button>
				    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="btnSave()"><spring:message code="btnSave"/></button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="btnSearch()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area"    id="top_search">
				<div class="last">
					<label for=""><spring:message code="eventDate"/></label>
					<input type="text" class="datepicker1 datepicker" id="EVT_STR_DT" name="EVT_STR_DT"> ~ <input type="text" class="datepicker2 datepicker" id="EVT_END_DT" name="EVT_END_DT">
					<select id="STR_CODE" name="STR_CODE" class="wid2" style="visibility: hidden;"></select>
					<select id="EVT_FLAG" name="EVT_FLAG" class="wid2" style="visibility: hidden;"></select>	
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
			</div>
			
			<h3 class="bul_arr tit_top f_l"><spring:message code="evtDetail"/></h3>
			<table class="tbl_st2" id="form1" name="form1">
				<colgroup>
					<col style="width:12%">
					<col style="width:13%">
					<col style="width:12%">
					<col style="width:13%">
					<col style="width:12%">
					<col style="width:13%">
					<col style="width:12%">
					<col style="width:13%">
				</colgroup>
				<tbody>
					<tr>
						<th scope="row"><label><spring:message code="eventType"/></label></th>
						<td>
							<select id="B_EVT_FLAG" name="B_EVT_FLAG" class="wid2" disabled></select>
						</td>
						<th scope="row"><label><spring:message code="storeName"/></label></th>
						<td>
							<select id="B_STR_CODE" name="B_STR_CODE" class="wid2" disabled></select>
						</td>
						<th scope="row"><label><spring:message code="evtType"/></label></th>
						<td>
							<select id="B_EVT_TYPE" name="B_EVT_TYPE" class="wid2" disabled>
							</select>
						</td>
						<th scope="row"><label><spring:message code="eventCode"/></label></th>
						<td>
							<input type="text" id="B_EVT_CODE" name="B_EVT_CODE" maxlength="" class="wid2" readonly>
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수입력항목</em><label><spring:message code="eventName"/></label></th>
						<td colspan="7"><input type="text" id="B_EVT_NAME" name="B_EVT_NAME" maxlength="25" class="wid1"></td>
					</tr>
					<tr>
						<th scope="row"><em>필수입력항목</em><label><spring:message code="eventStartDate"/></label></th>
						<td colspan="3">
							<input type="text" class="datepicker1 datepicker" id="B_EVT_STR_DT" name="B_EVT_STR_DT"> ~ 
							<input type="text" class="datepicker2 datepicker" id="B_EVT_END_DT" name="B_EVT_END_DT">
						</td>
						<th scope="row"><label><spring:message code="orderStartDate"/></label></th>
						<td colspan="3">
							<input type="text" class="datepicker1 datepicker" id="B_ORD_STR_DT" name="B_ORD_STR_DT"> ~ 
							<input type="text" class="datepicker2 datepicker" id="B_ORD_END_DT" name="B_ORD_END_DT">
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수입력항목</em><label><spring:message code="exchgPrtYn"/></label></th>
						<td>
							<select id="B_EXCHG_PRT_YN" name="B_EXCHG_PRT_YN" class="wid2">
								<option value=""><spring:message code="select"/></option>
								<option value="Y"><spring:message code="print"/></option>
								<option value="N"><spring:message code="nonePrint"/></option>
							</select>
						</td>
						<th scope="row"><label><spring:message code="exchgBaseAmt"/></label></th>
						<td>
							<input type="text" id="B_EXCHG_BASE_AMT" name="B_EXCHG_BASE_AMT" style="text-align: right;"  maxlength="" class="wid2" numberOnly disabled>
						</td>
						<th scope="row"><label>회원구분</label></th>
						<td><select id="B_TGET_CUST" name="B_TGET_CUST" class="wid2"></select></td>
						<th scope="row"><label>포인트 제외상품 포함여부</label></th>
						<td>
							<select id="B_POINT_NET_YN" name="B_POINT_NET_YN" class="wid2">
								<option value=""><spring:message code="select"/></option>
								<option value="Y">포함</option>
								<option value="N">미포함</option>
							</select>
						</td>
						<%-- <th scope="row"><em>필수입력항목</em><label><spring:message code="exchgConts"/></label></th>
						<td colspan="3">
							<!-- <input type="text" id="B_EXCHG_CONTS" name="B_EXCHG_CONTS" maxlength="" class="wid100" disabled> -->
							<textarea id="B_EXCHG_CONTS" name="B_EXCHG_CONTS" maxlength="1000" class="wid100" style="height:50px;" disabled></textarea>
						</td> --%>
					</tr>
					<tr> 
						<th scope="row"><label><spring:message code="exchgConts"/></label></th>
						<td colspan="3">
							<!-- <input type="text" id="B_EXCHG_CONTS" name="B_EXCHG_CONTS" maxlength="" class="wid100" disabled> -->
							<textarea id="B_EXCHG_CONTS" name="B_EXCHG_CONTS" cols="10" wrap="hard" maxlength="1000" style="height:50px; width:350px;" disabled></textarea>
						</td>
						<th scope="row"><em>필수입력항목</em><label><spring:message code="remark"/></label></th>
						<td colspan="3">				
							<textarea name="B_REMARK" id="B_REMARK"  maxlength="250" style="height:50px;"></textarea>
						</td> 
					</tr>	
					<tr> 
						<th scope="row"><label><spring:message code="evtCardList"/></label></th>
						<td colspan="7">				
							<input type="text" id="P_CARD_LIST" name="P_CARD_LIST" maxlength="" disabled>
						</td> 
					</tr>						
					<tr> 
						<th scope="row"><label><spring:message code="properties"/></label></th>
						<td colspan="3">								
							<input type="text" id="B_IDATE" name="" maxlength="" class="wid2" readonly>
							<input type="text" id="B_IEMP_NAME" name="B_IEMP_NAME" maxlength="" class="wid2 wid_marL" readonly>
						</td>
						<th scope="row"><label><spring:message code="aboutFixes"/></label></th>
						<td colspan="3">
							<input type="text" id="B_UDATE" name="B_UDATE" maxlength="" class="wid2" readonly>
							<input type="text" id="B_UEMP_NAME" name="B_UEMP_NAME" maxlength="" class="wid2 wid_marL" readonly>
						</td>	
					</tr>
					<tr style="visibility: hidden;">
						<th scope="row"><label><spring:message code="cardBaseAmt"/></label></th>
						<td>
							<input type="text" id="B_CARD_BASE_AMT" name="B_CARD_BASE_AMT" maxlength="13" class="wid2"  style="text-align: right;" numberOnly disabled>
						</td>
						<th scope="row"><label><spring:message code="dcFlag"/></label></th>
						<td>
							<select id="B_DC_FLAG" name="B_DC_FLAG" class="wid2" disabled></select>
						</td>
						<th scope="row"><label><spring:message code="dcAmt"/></label></th>
						<td>
							<input type="text" id="B_DC_AMT" name="B_DC_AMT" maxlength="13" class="wid2"  style="text-align: right;" numberOnly disabled>
						</td>
						<th scope="row"><label><spring:message code="dcRate"/></label></th>
						<td>
							<input type="text" id="B_DC_RATE" name="B_DC_RATE" maxlength="7" class="wid2" style="text-align: right;" disabled>
						</td>
					</tr>
				</tbody>
			</table>						

		</div>
		<!-- //Content : 본문 영역 -->
	
</body>
</html>
	
