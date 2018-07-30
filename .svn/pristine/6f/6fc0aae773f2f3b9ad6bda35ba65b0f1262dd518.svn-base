<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
<title><spring:message code="memSalesList" /></title>

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
<!--[if IE]><script language="javascript" type="text/javascript" src="/resources/js/rMateGridH5/JS/shim.js"></script><![endif]-->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>
<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>

<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
<script type="text/javascript" src="/resources/js/page/member/receivables/custReceivablesLedger.js?ver=20180406_000" charset="utf-8"></script>	

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
	    		$("#btn_print").hide();
	    		$("#btn_print2").hide();
	    		$("#btn_search").hide();
	    		$("#btn_excel_down").hide();
	    		$("#btn_excel_down2").hide();
	    		$("#btnExcell1").hide();
	    		$("#btnExcell2").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_print").hide();
	    		$("#btn_print2").hide();
	    		$("#btn_search").hide();
	    		$("#btn_excel_down").hide();
	    		$("#btn_excel_down2").hide();
	    		$("#btnExcell1").hide();
	    		$("#btnExcell2").hide();
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
		    		
		    	}else{
		    		
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#btn_excel_down").show();
		    		$("#btn_excel_down2").show();
		    		$("#btnExcell1").show();
		    		$("#btnExcell2").show();
		    	}else{
		    		$("#btn_excel_down").hide();
		    		$("#btn_excel_down2").hide();
		    		$("#btnExcell1").hide();
		    		$("#btnExcell2").hide();
		    	}
		    	
		    	//엑셀업로드버튼 제어
		    	if(data[0].AUTH_EXCEL_UPLOAD == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//프린트, 출력 버튼 제어
		    	if(data[0].AUTH_PRINT == 'Y'){
		    		$("#btn_print").show();
		    		$("#btn_print2").show();
		    	}else{
		    		$("#btn_print").hide();
		    		$("#btn_print2").hide();
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
				<a href="" class="close_btn p_a"><spring:message code="btnHelpClose"/></a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
			<div class="f_r">
				<!-- 권한에 따른 버튼 show/hide -->
			    <button type="button" id="btn_print" class="btn btn_style2" onclick="btn_print('1');"><spring:message code="print"/></button>
				<button type="button" id="btn_excel_down" name="btn_excel_down" class="btn btn_style2"  onclick="btnExcell('1');"><i class="fa"></i><spring:message code="btnExcelDown"/></button>
				<button type="button" id="btn_search" class="btn btn_style3" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form id="sertch_frm" name="sertch_frm" method="post">
			<input type="hidden" id="P_CORP_CODE" name="P_CORP_CODE" value="${sessionScope.CORP_CODE}" />
			<input type="hidden" id="P_EMP_NO" name="P_EMP_NO" value="<%=getEnv().getUserId()%>" />
			<input type="hidden" id="P_STR_NAME" name="P_STR_NAME" />
			
			<div id="top_search" class="search_area">
				<div class="last">		
					<label for="" class=""><em>필수입력사항</em><spring:message code="storNm"/></label>
					<input type="hidden" id="STR_CODE" name="STR_CODE" />
					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for="" ><spring:message code="btnSearchDate"/></label>
					<input type="text"  id="P_SALE_SD" name="P_SALE_SD" class="datepicker" /> ~
					<input type="text"  id="P_SALE_ED" name="P_SALE_ED" class="datepicker" />
					
					<label for=""><spring:message code="cusName"/></label>
					<input type="hidden" id="P_CUST_NO" name="P_CUST_NO" />
					<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt" />
					<button type="button" onclick="btn_comm_user_search();" class="search_btn">검색 아이콘</button>
				</div>
			</div>
		</form>
		<!-- //조회폼 영역 -->
		
		<!-- 본문 영역 -->
		<div class="col2 sub_cnt">
			<h3 class="bul_arr">고객미수금원장</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1">
					</div>
				</div>
			</div>
			
			<div class="sec_grid">
				<div class="content">
					<div class="tit_top">
						<h3 class="bul_arr f_l">회원미수원장</h3>
						<div class="f_r">
							<button type="button" id="btn_print2" class="btn btn_style4" onclick="btn_print('2');" ><spring:message code="print"/></button>
							<button type="button" id="btn_excel_down2" class="btn btn_style4" onclick="btnExcell('2');"><spring:message code="btnExcelDown"/></button>
						</div>
					</div>
					<div id="gridHolder2">
					</div>
				</div>
			</div>
		<!-- 본문 영역 -->
	</div>
	</div>
	<!-- //Content : 본문 영역 -->
	<!-- 	 상세 팝업 영역 시작  -->
		
	<div id="pop_wrap1" >
		<header id="pop_head" class="clear">
			<h1 class="bul_arr f_l">외상매출발생내역</h1>
			<div class="f_r">
				<button type="button" id="btnExcell1" class="btn btn_style4" onclick="btnExcell('3');"><spring:message code="btnExcel"/></button>
				<button type="button" class="btn btn_style4" onclick="btn_close('1');"><spring:message code="btnClose"/></button>
			</div>			
		</header>
		<div class="col2 sub_cnt">
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder3"></div>
				</div>
			</div> 		 
		</div>
	</div>
	<div id="pop_wrap2" >
		<header id="pop_head" class="clear">
			<h1 class="bul_arr f_l">외상매출입금내역</h1>
			<div class="f_r">
				<button type="button" id="btnExcell2" class="btn btn_style4" onclick="btnExcell('4');"><spring:message code="btnExcel"/></button>
				<button type="button" class="btn btn_style4" onclick="btn_close('2');"><spring:message code="btnClose"/></button>
			</div>		
		</header>
		<div class="col2 sub_cnt">
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder4"></div>
				</div>
			</div> 		 
		</div>
	</div>
	
</body>
</html>