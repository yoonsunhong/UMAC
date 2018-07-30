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
<title>공제등록 관리</title>

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
	설명: 업체별 여신한도관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-01    오동근       초기작성 
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
<script type="text/javascript" src="/resources/js/page/payment/request/paymentRequestInfo.js?ver=1.0" charset="utf-8"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>	

</head>
 <style>
 	.DATE_YM table.ui-datepicker-calendar { display:none; }
</style>
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
	    		$("#btn_excel").hide();
	    		$("#btn_print").hide();
	    		$("#btn_read").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_excel").hide();
	    		$("#btn_print").hide();
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
		    		
		    	}else{
		    		
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		
		    	}else{
		    		
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
		    		$("#btn_print").show();
		    	}else{
		    		$("#btn_print").hide();
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
					<button type="button" id="btn_excel"  class="btn btn_style2"  onclick="fnExcelExport()"><spring:message code="btnExcel"/></button>
					<button type="button" id="btn_print"  class="btn btn_style2"  onclick="btn_print1()"><spring:message code="print"/></button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="fnSearch()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수입력항목</em><spring:message code="payYm"/></label>
					<input type="text" class="datepicker2 datepickerYm datepicker" id="P_SEARCH_DT" name="P_SEARCH_DT">
					
					<label for=""><spring:message code="greGb"/></label>
					<select id="P_GRE_GB" name="P_GRE_GB" class="wid2" style="width:65px">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for=""><spring:message code="supply"/></label>
					<input type="text" id="P_VEN_NAME" name="P_VEN_NAME" class="search_txt">
					<input type="hidden" id="P_VEN_CODE" name="P_VEN_CODE">
					<input type="hidden" id="P_CORP_CODE" name="P_CORP_CODE" value="${sessionScope.CORP_CODE }">
					<button type="button" class="search_btn" onclick="btn_comm_supply_search()">검색 아이콘</button>

					<label for=""><spring:message code="payCon"/></label>
					<select id="P_PAY_CON" name="P_PAY_CON" class="wid2" style="width:150px" onchange="chgPay('PAY_CON');">
						<option value=""><spring:message code="all"/></option>
					</select>
					<input type="hidden" id="PAY_CON_MGMT_ENTRY_1" name="PAY_CON_MGMT_ENTRY_1">
					
					<label for=""><em>필수입력항목</em><spring:message code="paySeq"/></label>
					<select id="P_PAY_SEQ" name="P_PAY_SEQ" class="wid2" style="width:160px" onchange="chgPay('PAY_SEQ');">
						<option value=""><spring:message code="all"/></option>
					</select>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<!-- 
			<table class="tbl_st2 th_wid">
				<tbody>
					<tr>
						<th scope="row"><label><spring:message code="purClose"/></label></th>
						<td>
							<select id=P_PUR_CLOSE name="P_PUR_CLOSE" class="wid2">
							</select>
						</td>
					</tr>
				</tbody>
			</table>
			 -->			
			<div class="sec_grid">
				<div class="content">
					<h3 class="bul_arr"><spring:message code="requestForPayment"/></h3>
					<!-- 탭시작 -->
					<div id="tab1" class="tab clear">
						<ul>
							<li class="tab1 on">
								<form name="" id="">
									<button class="tab_btn" id="bt_tab1"><spring:message code="paymentType"/></button>
									<ul>
										<div id="gridHolder1"></div>
									</ul>
								</form>
							</li>
							<li class="tab2">
								<form name="" id="">
									<button class="tab_btn" id="bt_tab2"><spring:message code="submitBank"/></button>
									<ul>
										<div id="gridHolder2"></div>
									</ul>
								</form>
							</li>							
						</ul>
					</div>
					<!-- //탭종료 -->
				</div>
			</div>
			
		</div>
		<!-- //Content : 본문 영역 -->
	 
</body>
</html>