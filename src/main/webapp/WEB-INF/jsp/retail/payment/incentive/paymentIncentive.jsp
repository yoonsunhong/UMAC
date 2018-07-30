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
<title><spring:message code="pyIncentiveMenuName"/></title>

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
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>
<%--
	설명: 보류등록 관리

	수정일          수정자        수정내용
	------------------------------------------------------
	2017-05-04    최호정        초기작성
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
<script type="text/javascript" src="/resources/js/page/payment/incentive/paymentIncentive.js?ver=1.33" charset="utf-8"></script>
<!-- 공통 팝업 -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />	
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
	    		$("#btn_read").hide();
	    		$("#btn_gen").hide();
	    		$("#btn_update").hide();
	    		$("#btn_delete").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_gen").hide();
	    		$("#btn_update").hide();
	    		$("#btn_delete").hide();
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
		    		$("#btn_gen").show();
		    	}else{
		    		$("#btn_gen").hide();
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
				<button type="button" id="btn_gen" class="btn btn_style2" onclick="btn_popup('AMT')"><spring:message code="btnJangAmt"/></button>
				<button type="button" id="btn_delete"  class="btn btn_style2" onclick="btn_popup('CANCLE')" ><spring:message code="btnJangCancle"/></button>
				<button type="button" id="btn_update" class="btn btn_style2" onclick="fnUpdate()"><spring:message code="btnSave"/></button>
				<button type="button" id="btn_read" class="btn btn_style3" onclick="fnSearch()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>

		<!-- 조회폼 영역 -->
		<div class="search_area" id="top_search">
			<div class="last">
				<label for=""><em>필수입력항목</em><spring:message code="payYm"/></label>
				<input type="hidden" id="S_APPL_MON" name="S_APPL_MON">
				<input type="text" class="datepicker2 datepickerYm" id="S_SEARCH_DT" name="S_SEARCH_DT">
				
				<label for=""><spring:message code="supply"/></label>
				<input type="text" id="S_VEN_NAME" name="S_VEN_NAME" class="search_txt" style="width:200px">
				<input type="hidden" id="S_VEN_CODE" name="S_VEN_CODE">
				<button type="button" class="search_btn" onclick="btn_comm_supply_search()">검색 아이콘</button>
				
				<!--
				<label for=""><spring:message code="storeName"/></label>
				<select id="S_STR_CODE" name="S_STR_CODE" class="wid2"></select>
				-->
					
				<label for=""><spring:message code="paySeq"/></label>
				<select id="S_PAY_SEQ" name="S_PAY_SEQ" class="wid1" style="width:160px">
					<option value=""><spring:message code="all"/></option>
				</select>
			</div>
		</div>

		<h3 class="bul_arr f_l"><spring:message code="pyJangMng"/></h3>
		<form name="reg_form" id="reg_form">
		<table class="tbl_st2 th_wid">
			<tbody>
				<tr>
					<th scope="row"><label><spring:message code="supply"/></label></th>
					<td>
						<input type="text" id="P_VEN_NAME" name="P_VEN_NAME" class="wid1" disabled="disabled">
						<input type="hidden" id="P_VEN_CODE" name="P_VEN_CODE">
						<input type="hidden" id="P_APPL_MON" name="P_APPL_MON">
					</td>
					<th scope="row"><label><spring:message code="storCode"/></label></th>
					<td>
						<input type="text" id="P_STR_CODE" name="P_STR_CODE" class="wid2" disabled="disabled">
					</td>
					<th scope="row"><label><spring:message code="paySeq"/></label></th>
					<td>
						<input type="text" id="P_CHASU" name="P_CHASU" class="wid2" disabled="disabled">
						<input type="hidden" id="P_PAY_SEQ" name="P_PAY_SEQ">
					</td>
				</tr>
				<tr>
					<th scope="row"><em>필수입력항목</em><label for=""><spring:message code="btnSubmit"/><spring:message code="pyCfmJangAmt"/></label></th>
					<td>
						<input type="text" class="wid1" style="text-align:right" numberonly="" id="P_CFM_JANG_AMT" name="P_CFM_JANG_AMT">
					</td>
					<th scope="row"><!--<label><spring:message code="pyJangAmt"/></label>--><label><spring:message code="btnCreate"/><spring:message code="pyCfmJangAmt"/></th>
					<td colspan="3">
						<input type="text" class="wid1" style="text-align:right" numberonly="" id="P_JANG_AMT" name="P_JANG_AMT" disabled="disabled">
					</td>
				</tr>
				<tr>
					<th scope="row"><spring:message code="remarks"/></label></th>
					<td colspan="5">
						<input type="text" class="wid100" id="P_REMARK" name="P_REMARK">
					</td>
				</tr>
			</tbody>
		</table>
		</form>

		<!-- //조회폼 영역 -->
 		<div class="sec_grid">
 			<div class="content">
				<h3 class="bul_arr tit_top f_l"><spring:message code="pyVenCurrJang"/></h3>
 				<div id="gridHolder1"></div>
			</div>
 		</div> 

	</div>
	<!-- //Content : 본문 영역 -->

	<!-- 	 상세 팝업 영역 시작  -->
	<div id="pop_wrap1">
		<header id="pop_head" class="clear">
			<p class="f_l" style="height:21px;line-height:21px;">※ <spring:message code="pyNotiPopup"/></p>
			<div class="f_r">
				<button type="button" id="popSave" class="btn btn_style4" onclick="pop1_exec()"><spring:message code="btnExec"/></button>
				<button type="button" class="btn btn_style4" onclick="pop1_close()"><spring:message code="btnClose"/></button>
			</div>
		</header>
		<div class="search_area" id="POP_SEARCH">
			<div>
				<label for=""><em>필수입력사항</em><spring:message code="pyJangDtPopup"/></label>
				<input type="text" class="datepicker2 datepickerYm" id="I_APPL_MON" name="I_APPL_MON">
			</div>
		</div>
	</div>
	<!--  상세 팝업 영역 끝  -->
	
	<!-- 	 상세 팝업 영역 시작  -->
	<div id="pop_wrap2">
		<header id="pop_head_2" class="clear">
			<p class="f_l" style="height:21px;line-height:21px;">※ <spring:message code="pyNotiCanclePopup"/></p>
			<div class="f_r">
				<button type="button" id="popCancle" class="btn btn_style4" onclick="pop1_cancle()"><spring:message code="btnExec"/></button>
				<button type="button" class="btn btn_style4" onclick="pop1_close()"><spring:message code="btnClose"/></button>
			</div>
		</header>
		<div class="search_area" id="POP_SEARCH_2">
			<div>
				<label for=""><em>필수입력사항</em><spring:message code="pyJangDtPopup"/></label>
				<input type="text" class="datepicker2 datepickerYm" id="I_APPL_MON_2" name="I_APPL_MON_2">
			</div>
		</div>
	</div>
	<!--  상세 팝업 영역 끝  -->

</body>
</html>
