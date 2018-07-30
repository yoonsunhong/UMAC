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
<title><spring:message code="divDivisionMenuName"/></title>

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
	2017-05-15    최호정        초기작성
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
<!--
<script type="text/javascript" src="/resources/js/page/wms/stock/wmsStockDivision/wmsStockDivision.js?ver=20170531_2" charset="utf-8"></script>
--> 
<script type="text/javascript" src="/resources/js/page/wms/stock/wmsStockDivision/wmsStockDivision.js?ver=20170710swsssss1_001" charset="utf-8"></script>
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
	    		$("#btn_update").hide();
	    		$("#btn_gen").hide();
	    		$("#btn_confirm").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_update").hide();
	    		$("#btn_gen").hide();
	    		$("#btn_confirm").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_read").show();
		    	}else{
		    		$("#btn_read").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#btn_gen").show();
		    	}else{
		    		$("#btn_gen").hide();
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
		    		$("#btn_confirm").show();
		    	}else{
		    		$("#btn_confirm").hide();
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
				<button type="button" id="btn_gen" class="btn btn_style2" onclick="fnNew()"><spring:message code="btnNew"/></button>
				<button type="button" id="btn_update" class="btn btn_style2" onclick="fnUpdate()"><spring:message code="btnSave"/></button>
				<button type="button" id="btn_read" class="btn btn_style3" onclick="fnSearch('')"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		<!-- 조회폼 영역 -->
		<div class="search_area" id="top_search">
			<div class="last">
				<label for=""><em>필수입력항목</em><spring:message code="storeName"/></label>
				<select id="S_STR_NAME" id="S_STR_NAME" name="S_STR_NAME" onchange="setStrCode()"></select>
				<input type="hidden" id="S_STR_CODE" name="S_STR_CODE">
				<label for=""><spring:message code="divDvionDt"/></label>
				<input type="text" class="datepicker1 datepicker" id="S_STR_DATE" name="S_STR_DATE"> ~ <input type="text" class="datepicker2 datepicker" id="S_END_DATE" name="S_END_DATE">
			</div>
		</div>
		<!-- //조회폼 영역 -->

		<!-- //Content : 본문 영역 -->
		<div class="col2 sub_cnt">
			<form name="reg_form" id="reg_form">
			<input type="hidden" id="P_CORP_CODE"    name="P_CORP_CODE" value="${sessionScope.CORP_CODE }" /> <!-- 기업코드 -->
			<input type="hidden" id="P_STR_CODE"     name="P_STR_CODE"  value="${sessionScope.STR_CODE }" /> <!--  점포코드 -->
			<input type="hidden" id="P_DVION_DT"     name="P_DVION_DT">
			<input type="hidden" id="P_SEQ"          name="P_SEQ">
			<input type="hidden" id="P_ITM_CODE"     name="P_ITM_CODE">
			<input type="hidden" id="P_TAX_GB"       name="P_TAX_GB">
			<input type="hidden" id="P_PUR_WPRC"     name="P_PUR_WPRC">
			<input type="hidden" id="P_PUR_WVAT"     name="P_PUR_WVAT">
			<input type="hidden" id="P_PUR_SPRC"     name="P_PUR_SPRC">
			<input type="hidden" id="P_DIV_ITM_CODE" name="P_DIV_ITM_CODE">
			<input type="hidden" id="P_DIV_PUR_WPRC" name="P_DIV_PUR_WPRC">
			<input type="hidden" id="P_DIV_PUR_WVAT" name="P_DIV_PUR_WVAT">
			<input type="hidden" id="P_DIV_PUR_SPRC" name="P_DIV_PUR_SPRC">
			<input type="hidden" id="P_CFM_DT"       name="P_CFM_DT">
			<div class="clear">
				<h3 class="bul_arr f_l"><spring:message code="divOriginProduct"/></h3>
				<div class="f_r">
					<button type="button" id="btn_confirm" class="btn btn_style4" onclick="fnConfirm()"><spring:message code="btnSubmit"/></button>
				</div>
				<table class="tbl_st2">
					<colgroup>
						<col style="width:25%">
						<col style="width:25%">
						<col style="width:5%">
						<col style="width:5%">
						<col style="width:10%">
						<col style="width:15%">
						<col style="width:15%">
					</colgroup>
					<thead>
						<th><spring:message code="divOriginScan"/></th>
						<th><spring:message code="itmName"/></th>
						<th><spring:message code="ipsuQty"/></th>
						<th><spring:message code="unit"/></th>
						<th><spring:message code="divTaxGb"/></th>
						<th><spring:message code="purchaseCost"/></th>
						<th><spring:message code="purchaseSprc"/></th>
					</thead>
					<tbody>
						<tr>
							<td><input type="text" id="P_SCAN_CODE"    name="P_SCAN_CODE"    class="wid1 search_txt" disabled><button type="button" id="search1" class="search_btn" onclick="btn_item_search('a')">검색 아이콘</button></td>
							<td><input type="text" id="P_ITM_NAME"     name="P_ITM_NAME"     class="wid100" disabled></td>
							<td><input type="text" id="P_QTY"          name="P_QTY"          class="wid100" disabled></td>
							<td><input type="text" id="P_UNIT"         name="P_UNIT"         class="wid100" disabled></td>
							<td><input type="text" id="P_TAX_GB_STR"   name="P_TAX_GB_STR"   class="wid100" disabled></td>
							<td><input type="text" id="P_PUR_WPRC_DS"  name="P_PUR_WPRC_DS"  class="wid100" style="text-align: right; padding-right:1px"></td>
							<td><input type="text" id="P_PUR_SPRC_DS"  name="P_PUR_SPRC_DS"  class="wid100" style="text-align: right; padding-right:1px"></td>
							<!--
							<td><input type="text" id="P_PUR_WPRC_DS"  name="P_PUR_WPRC_DS"  class="wid100" onkeyup="fn_check_number('P_PUR_WPRC')" style="text-align: right; padding-right:1px"></td>
							<td><input type="text" id="P_PUR_SPRC_DS"  name="P_PUR_SPRC_DS"  class="wid100" onkeyup="fn_check_number('P_PUR_SPRC')" style="text-align: right; padding-right:1px"></td>
							-->
						</tr>
					</tbody>
				</table>
			</div>
			<h3 class="bul_arr tit_top"><spring:message code="divDividedProduct"/></h3>
			<table class="tbl_st2">
				<colgroup>
					<col style="width:25%">
					<col style="width:25%">
					<col style="width:20%">
					<col style="width:15%">
					<col style="width:15%">
				</colgroup>
				<thead>
					<th><spring:message code="divDividedScan"/></th>
					<th><spring:message code="itmName"/></th>
					<th><spring:message code="qY"/></th>
					<th><spring:message code="purchaseCost"/></th>
					<th><spring:message code="purchaseSprc"/></th>
				</thead>
				<tbody>
					<tr>
						<td><input type="text" id="P_DIV_SCAN_CODE"   name="P_DIV_SCAN_CODE"   class="wid1 search_txt" disabled><button type="button" id="search2" class="search_btn" onclick="btn_item_search('b')">검색 아이콘</button></td>
						<td><input type="text" id="P_DIV_ITM_NAME"    name="P_DIV_ITM_NAME"    class="wid100" disabled></td>
						<td><input type="text" id="P_DIV_QTY"         name="P_DIV_QTY"         class="wid100" style='IME-MODE: disabled; text-align:right;'></td>
						<td><input type="text" id="P_DIV_PUR_WPRC_DS" name="P_DIV_PUR_WPRC_DS" class="wid100" disabled style="text-align: right; padding-right:1px"></td>
						<td><input type="text" id="P_DIV_PUR_SPRC_DS" name="P_DIV_PUR_SPRC_DS" class="wid100" disabled style="text-align: right; padding-right:1px"></td>
						<!--
						<td><input type="text" id="P_DIV_QTY"         name="P_DIV_QTY"         class="wid100" onkeyup="fn_check_number('P_DIV_QTY')" style='IME-MODE: disabled; text-align:right;'></td>
						<td><input type="text" id="P_DIV_PUR_WPRC_DS" name="P_DIV_PUR_WPRC_DS" class="wid100" disabled style="text-align: right; padding-right:1px"></td>
						<td><input type="text" id="P_DIV_PUR_SPRC_DS" name="P_DIV_PUR_SPRC_DS" class="wid100" disabled style="text-align: right; padding-right:1px"></td>
						-->
					</tr>
				</tbody>
			</table>
			<h3 class="bul_arr tit_top"><spring:message code="divDivisionStatus"/></h3>
			<div id="gridHolder1"></div>
			</form>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>

	<!--  상세 팝업 영역 시작  -->
	<div id="pop_wrap1" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="productSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search2">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="product"/></label> 
					<input type="text"    name="P_KEYWORD"  id="P_KEYWORD" class="search_txt">
					<input type="hidden"  name="P_CALLBACK" id="P_CALLBACK">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_weight_item_search()"></button>
					<input type="hidden"  name="P_FLAG"     id="P_FLAG" value="N">
					<input type="hidden"  name="P_CLS_CODE" id="P_CLS_CODE">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_popup_close()"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder2"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--  상세 팝업 영역 끝  -->

</body>
</html>