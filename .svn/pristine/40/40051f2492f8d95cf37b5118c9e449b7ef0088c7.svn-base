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
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>
<%--
	설명: 긴급매가변경
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-04-27    문희훈       초기작성 
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
<script type="text/javascript" src="/resources/js/page/product/changeEmergencyPrice/changeEmergencyPrice.js?ver=20180406_000" charset="utf-8"></script>
<!-- 공통 팝업 -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />	
</head>
 <script>
var USER_ID = "${sessionScope.ID}";
var STR_CODE = "${sessionScope.STR_CODE}";
var STR_NAME = "${sessionScope.STR_NAME}";
</script>
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
	    		$("#tab1_search").hide();
	    		$("#tab1_new").hide();
	    		$("#tab1_save").hide();
	    		$("#btn_read").hide();
	    		$("#btn_pos").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#tab1_search").hide();
	    		$("#tab1_new").hide();
	    		$("#tab1_save").hide();
	    		$("#btn_read").hide();
	    		$("#btn_pos").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#tab1_search").show();
		    	}else{
		    		$("#tab1_search").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#tab1_new").show();
		    	}else{
		    		$("#tab1_new").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#tab1_save").show();
		    	}else{
		    		$("#tab1_save").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#btn_read").show();
		    	}else{
		    		$("#btn_read").hide();
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
		    		$("#btn_pos").show();
		    	}else{
		    		$("#btn_pos").hide();
		    	}
	    	}
	    	
	    	//관리구분별 점포조회권한설정
	    	if(data[0].ORG_TYPE == "3") {
	    		//점포조회조건 제어.
	    		$("#P_STR_NAME").val(loadData.STR_CODE);
	    		$("#P_STR_NAME").prop("disabled", true);
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
		<input type="hidden" id="VALID_YN" name="VALID_YN" />
		<div class="btn_area clear">
			<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png"><spring:message code="btnHelp"/></button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a">도움말 닫기</a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
			<div class="tab_area1 f_r">
				<div>
					<!-- 권한에 따른 버튼 show/hide -->
					<span class="txt"><font style="color:red;text-align:right;">※ 등록,수정을 하면 POS에서 상품마스터 수신 후 변경된 매가금액 적용	&nbsp;	&nbsp;</font></span>
					<button type="button" id="btn_pos" class="btn btn_style2"  onclick="btn_pos();">POS데이터 생성</button>
					<button type="button" id="btn_read" class="btn btn_style2"  onclick="ExcelDownload1();"><spring:message code="btnExcelDown"/></button>
				    <button type="button" id="tab1_new"  class="btn btn_style2"  onclick="btn_new();"><spring:message code="btnNew"/></button>
				    <button type="button" id="tab1_save" class="btn btn_style2"  onclick="btn_save();"><spring:message code="btnSave"/></button>
				    <button type="button" id="tab1_search" class="btn btn_style3"  onclick="btn_search();"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
		</div>
		<!-- 조회폼 영역 -->
		<div class="tab_area2">
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수입력사항</em><spring:message code="storNm"/></label>
					<select id="P_STR_NAME" name="P_STR_NAME" style="width:initial;margin-right:0;" onchange="fnStrChange();"></select>
					<input type="hidden" id="P_STR_CODE" name="P_STR_CODE" disabled />
					&nbsp;
					<label for=""><em>필수입력사항</em><spring:message code="changedDay"/></label>
					<input type="text" id="P_SPRC_SDT" name="P_SPRC_SDT" class="datepicker1 datepicker" /> ~
					<input type="text" id="P_SPRC_EDT" name="P_SPRC_EDT" class="datepicker2 datepicker" />
					
					<label for=""><spring:message code="itmName"/></label>		
					<input type="text" id="P_ITM_CODE" name="P_ITM_CODE" class="wid2 search_txt" disabled="" />			
					<input type="text" id="P_ITM_NAME" name="P_ITM_NAME" class="wid7 search_txt" />
					<button type="button" class="search_btn" onclick="btn_comm_product_search();">검색 아이콘</button>
				</div>
			</div>				
		</div>
		<!-- //조회폼 영역 -->
			<h3 class="bul_arr"><spring:message code="urgentSaleRegistration"/></h3>
			<table class="tbl_st2">
				<colgroup>
					<col style="width:9%">
					<col>
					<col style="width:9%">
					<col>					
					<col style="width:9%">
					<col>					
					<col style="width:9%">
					<col>					
				</colgroup>
				<tr>
					<th><spring:message code="storNm"/></th>
					<td>
						<input type="hidden" id="ADD_STR_CODE" name="ADD_STR_CODE" disabled />
						<input type="text" id="ADD_STR_NAME" name="ADD_STR_NAME" class="wid2" disabled style="text-align: center;" />
					</td>
					<th><em>필수입력사항</em><spring:message code="itmName"/></label></th>
					<td colspan="3">
						<input type="hidden" id="ADD_ITM_CODE" name="ADD_ITM_CODE" />
						<input type="text" id="ADD_SCAN_CODE" name="ADD_SCAN_CODE" class="wid2" disabled />
						<input type="text" id="ADD_ITM_NAME" name="ADD_ITM_NAME" class="wid7 wid_marL" style="width:180px;">
						<button type="button" class="search_btn" onclick="btn_add_product_search();">검색 아이콘</button>
 					</td>					
					<th><spring:message code="taxGb"/></th>
					<td><input type="text" id="ADD_TAX_GB" name="ADD_TAX_GB" class="wid2" disabled style="text-align:center;" /></td>					
				</tr>
				<tr>
					<th><spring:message code="subCategoryName"/></th>
					<td>
						<input type="text" id="ADD_CLS_NAME" name="ADD_CLS_NAME" class="wid2" disabled style="text-align:center;" />
					</td>
					<th><spring:message code="supply"/></th>
					<td><input type="text" id="ADD_VEN_NAME" name="ADD_VEN_NAME" class="wid2" disabled style="width:180px;text-align:center;" /></td>					
					<th><spring:message code="sprc"/></th>
					<td><input type="text" id="ADD_SPRC" name="ADD_SPRC" class="wid2" disabled style="text-align:center;" /></td>					
					<th><em>필수입력사항</em><spring:message code="changeSalePrice"/></th>
					<td><input type="text" id="ADD_CHG_SPRC" name="ADD_CHG_SPRC" class="wid2" style="text-align:center;" /></td>					
				</tr>				
				<tr>
					<th><spring:message code="baseWprc"/></th>
					<td><input type="text" id="ADD_WPRC" name="ADD_WPRC" class="wid2" disabled style="text-align:center;" /></td>
					<th><spring:message code="ProfitRt"/></th>
					<td><input type="text" id="ADD_BENEFIT" name="ADD_BENEFIT" class="wid2" disabled style="text-align:center;" /></td>
					<th><spring:message code="inputName"/></th>
					<td><input type="text" id="ADD_IEMP_NM" name="ADD_IEMP_NM" class="wid2" disabled style="text-align:center;"></td>
					<th><spring:message code="iDateTime"/></th>
					<td><input type="text" id="ADD_IDATE" name="ADD_IDATE" class="wid2" disabled style="text-align:center;width:180px;" /></td>				
				</tr>				
			</table>
			<div class="sec_grid">
				<div class="content">
					<h3 class="bul_arr tit_top"><spring:message code="emergencySalesPriceRegistrationStatus"/></h3>
					<div id="gridHolder1"></div>
				</div>
				<!-- //탭종료 -->
			</div>
		</div>
	</div>
	<!-- //Content : 본문 영역 -->

<script>
$(document).ready(function(){
	$("#P_STR_NAME").val(SSSC);
	$("#P_STR_CODE").val(SSSC);
	$("#ADD_STR_NAME").val(STR_NAME);
	$("#ADD_STR_CODE").val(SSSC);
});
</script>

</body>
</html>