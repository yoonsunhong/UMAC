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
	설명: 주문배달관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-12    권용욱       초기작성 
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
<script type="text/javascript" src="/resources/js/page/product/masterbasic/productMasterBasic.js?ver=20180410_000" charset="utf-8"></script>
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
				<label style="margin-right: 10px; font-weight: bold;color: red;">※ 검색조건의 점포명이 "전체"일 경우 협력업체 또는 상품명은 필수 검색조건입니다.</label>
				<!-- 권한에 따른 버튼 show/hide -->
				<button type="button" id="btn_excel"  class="btn btn_style2"  onclick="btnExcelDown()"><spring:message code="btnExcelDown"/></button>
				<button type="button" id="btn_clear"  class="btn btn_style2"  onclick="btn_clear()">초기화</button>
				<button type="button" id="btn_read" class="btn btn_style3"  onclick="btnSearch(true)"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form id="frmBody" name="frmBody">
		<div class="search_area"    id="top_search">
			<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
			<input type="hidden" name="pageUnit" id="pageUnit" value="25" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
			<input type="hidden" name="pageSize" id="pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
			<input type="hidden" name="P_COLUMN_NAME" id="P_COLUMN_NAME" />
			<input type="hidden" name="P_ORDERBY" id="P_ORDERBY" />
			<table>
				<tr>
					<th><label for=""><spring:message code="storeName"/></label></th>
					<td><select id="P_STR_CODE" name="P_STR_CODE" class="wid2"></select></td>
					<th><label for=""><spring:message code="supply"/></label></th>
					<td>
						<input type="hidden" id="P_VEN_CODE" name="P_VEN_CODE">
						<input type="text" id="P_VEN_NAME" name="P_VEN_NAME" class="search_txt wid2">
						<button type="button" id="" class="search_btn" onclick="btn_comm_supply_search_product()">검색 아이콘</button>
					</td>
					<th><label for=""><spring:message code="greGb"/></label></th>
					<td><select id="P_GRE_GB" name="P_GRE_GB" class="wid2"></select></td>
					<th><label for=""><spring:message code="mbrDcYn"/></label></th>
					<td><select id="P_MBR_DC_YN" name="P_MBR_DC_YN" class="wid2"></select></td>
				</tr>
				<tr>					
					<th><label for=""><spring:message code="routeGb"/></label></th>
					<td><select id="P_ROUTE_GB" name="P_ROUTE_GB" class="wid2"></select></td>
					<th><label for=""><spring:message code="goodsCl"/></label></th>
					<td colspan="3">
						<select id="P_LRG_CODE" name="P_LRG_CODE" class="wid2" style="margin-right: 0px; width: 132px;"></select>
						<select id="P_MID_CODE" name="P_MID_CODE" class="wid2" style="margin-right: 0px; width: 132px;"></select>
						<select id="P_CLS_CODE" name="P_CLS_CODE" class="wid2" style="margin-right: 0px; width: 132px;"></select>
					</td>
					<th><label for=""><spring:message code="itmName"/></label></th>
					<td>
						<input type="hidden" id="P_ITM_CODE" name="P_ITM_CODE">
						<input type="text" id="P_ITM_NAME" name="P_ITM_NAME" class="search_txt wid2"  onBlur="clearItemName()">
						<button type="button" id="" class="search_btn" onclick="btn_comm_product_search()">검색 아이콘</button>
					</td>
				</tr>
			</table>
			<%-- <div class="last">
				<label for=""><em>필수입력항목</em><spring:message code="storNm"/></label>
				<select id="P_STR_CODE" name="P_STR_CODE" class="">
				</select>
				<label fol=""><em>필수입력항목</em><spring:message code="orderDate"/></label>
				<input type="text" id="P_ORD_DT" name="P_ORD_DT" class="datepicker datepicker1 wid2">
				<label for="" style="margin-left: 23px;"><spring:message code="ordStat"/></label>
				<select id="P_ORD_STAT" name="P_ORD_STAT" class="wid2">
				</select>
				<label for=""><spring:message code="slipNo"/></label>
				<input type="text" id="P_SLIP_NO" name="P_SLIP_NO" class="wid2">						
			</div> --%>
		</div>
		</form>
		<!-- //조회폼 영역 -->
		
		<!-- <h3 class="bul_arr f_l">주문접수현황</h3>
		<span class="mar_L10 pad_T2 f_l">(더블 클릭시 '콜센터접수관리' 팝업을 제공합니다)</span>
		<div class="content">	
			<div id="gridHolder1"></div>
		</div>
		<div class="gridPaging" id="gridPageNavigationDiv"></div> -->
		
		<!--  그리드 영역 -->
		<div class="col2 sub_cnt" id="dataForm" name="dataForm">
			<h3 class="bul_arr"><spring:message code="itmMasterCmn"/></h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
				<div class="gridPaging" id="gridPageNavigationDiv"></div>
			</div>
		</div>
		
		
	</div>
	<!-- //Content : 본문 영역 -->
		
</body>
</html>
	
