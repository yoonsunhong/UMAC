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
	설명: WMS - Location 재고조회
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-03-16    문희훈       초기작성 
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
<script type="text/javascript" src="/resources/js/page/wms/stock/wmsStockLocation/wmsStockLocation.js?ver=20170729" charset="utf-8"></script>
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
	    		$("#btn_excel").hide();
	    		$("#btn_read").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_excel").hide();
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
					<button type="button" id="btn_excel" class="btn btn_style2"  onclick="ExcelDownload()"><spring:message code="btnExcelDown"/></button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="btn_search(true)"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area"    id="top_search">
				<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
				<input type="hidden" name="pageUnit" id="pageUnit" value="25" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
				<input type="hidden" name="pageSize" id="pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
				<input type="hidden" name="P_COLUMN_NAME" id="P_COLUMN_NAME" />
				<input type="hidden" name="P_ORDERBY" id="P_ORDERBY" />
				<div class="last">
					<label for=""><em>필수입력사항</em><spring:message code="storNm"/></label>
					<select id="P_STR_NAME" name="P_STR_NAME" style="margin-right:0;" onchange="fnStrChange()"></select>
					<input type="text" id="P_STR_CODE" name="P_STR_CODE" class="wid2" disabled>	
					<label for=""><spring:message code="itmName"/></label>
					<input type="text" id="P_ITM_NAME" name="P_ITM_NAME" class="search_txt"  style="width:300px;" >
					<input type="hidden" id="P_ITM_CODE" name="P_ITM_CODE" class=""/>
					<button type="button" class="search_btn" onclick="btn_comm_product_search()">검색 아이콘</button>
					<label for="">Location</label>					
					<select id="P_ZONE_CODE" name="P_ZONE_CODE" onchange="fnPopZoneSelect()" style="margin-right:0"></select>
					<select id="P_RACK_CODE" name="P_RACK_CODE" onchange="fnPopRackSelect()" style="margin-right:0"></select>
					<select id="P_LINE_CODE" name="P_LINE_CODE" onchange="fnPopLineSelect()"></select>
<%-- 					<label for=""><spring:message code="btnSearchDate"/></label> --%>
<!-- 					<input type="text" class="datepicker1 datepicker" id="P_INV_DT" name="P_INV_DT"> -->
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<div class="col2 sub_cnt" id="dataForm" name="dataForm">
				<h3 class="bul_arr"><spring:message code="wmsTitle"/></h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1" style="width:355px"></div>
					</div>
					<div class="gridPaging" id="gridPageNavigationDiv"></div>
				</div>
			</div>

		</div>
		<!-- //Content : 본문 영역 -->
	 
	
</body>
</html>
	
