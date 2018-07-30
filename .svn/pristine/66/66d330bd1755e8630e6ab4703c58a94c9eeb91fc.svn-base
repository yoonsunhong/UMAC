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
<title>매입집계표</title>

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
	설명: 매입집계표(대출입포함)
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-11-24    윤태희       초기작성 
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
<script type="text/javascript" src="/resources/js/page/inoutcenter/mng/supplyPurchStateInout.js?ver=20180405_000" charset="utf-8"></script>	
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>	

<style type="text/css">
	.point {padding-left:4px;background:url("/resources/img/common/ico_require.png") no-repeat 0px 0px;width:6px;height:5px;display:inline-block;text-indent:100%;white-space:nowrap;overflow:hidden;vertical-align:middle}
</style>
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
	    		$("#btn_read").hide();
	    		$("#btn_excel").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_print").hide();
	    		$("#btn_read").hide();
	    		$("#btn_excel").hide();
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
				<!-- 권한에 따른 버튼 show/hide -->
				<c:if test="${sessionScope.AUTH_SEARCH eq   'Y'}">
					* 엑셀 다운로드는 건수(65,500) 한정으로 인해 점포별 다운로드 가능. &nbsp;
					<button type="button" id="btn_print" class="btn btn_style2" onclick="btn_print();">출력</button>
					<button type="button" id="btn_excel" class="btn btn_style2" onclick="fnExcelExport();"><spring:message code="btnExcel"/></button>
					<button type="button" id="btn_read" class="btn btn_style3" onclick="fnSearch();"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</c:if>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<div class="search_area" id="top_search">
			<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
			<input type="hidden" name="pageUnit" id="pageUnit" value="25" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
			<input type="hidden" name="pageSize" id="pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
			<input type="hidden" name="P_COLUMN_NAME" id="P_COLUMN_NAME" />
			<input type="hidden" name="P_ORDERBY" id="P_ORDERBY" />
			<input type="hidden" id="P_CORP_CODE" name="P_CORP_CODE" value="${sessionScope.CORP_CODE}" />
			
			<label for=""><em>필수입력사항</em><spring:message code="storeName"/></label>
			<select id="P_STR_CODE" name="P_STR_CODE" class="wid2">
				<option value=""><spring:message code="select"/></option>
			</select>
			
			<label for=""><em>필수입력사항</em>매입일자</label>
			<input type="text" id="P_SEARCH_START_DT" name="P_SEARCH_START_DT" class="datepicker1 datepicker" />~
			<input type="text" id="P_SEARCH_END_DT" name="P_SEARCH_END_DT" class="datepicker2 datepicker" />
			
			<label for=""><spring:message code="supply"/></label>
			<input type="text" id="P_VEN_NAME" name="P_VEN_NAME" class="search_txt" style="width:100px" onBlur="clearVenCode();" /><!-- class="search_txt wid2" -->
			<input type="hidden" id="P_VEN_CODE" name="P_VEN_CODE" />
			<button type="button" class="search_btn" onclick="btn_comm_supply_search();">검색 아이콘</button>
			
			<label for=""><spring:message code="greGb"/></label>
			<select id="P_GRE_GB" name="P_GRE_GB" class="wid2">
				<option value="" ><spring:message code="all"/></option>
				<option value="1" >직매입</option>
				<option value="2" >특정매입</option>
				<option value="3" >대출입</option>
			</select>
			
			<label for=""><spring:message code="chitFlag"/></label>
			<select id="P_PUR_GB" name="P_PUR_GB" class="wid2">
				<option value="" ><spring:message code="all"/></option>
				<option value="1" >매입</option>
				<option value="3" >대입</option>
				<option value="2" >반품</option>
				<option value="4" >대출</option>
			</select>
			<%-- <label for=""><spring:message code="purchGubun"/></label>
			<select id="P_PUR_GB" name="P_PUR_GB" class="mar_R0"  style="width:80px">
				<option value=""><spring:message code="all"/></option>
			</select> --%>
			
			<%-- <label for=""  style="margin-left: 20px;"><spring:message code="greGb"/></label>
			<select id="P_GRE_GB" name="P_GRE_GB" class="mar_R0"  style="width:80px">
				<option value=""><spring:message code="all"/></option>
				<option value="1">직매입</option>
				<option value="2">임대을</option>
			</select> --%>
		</div>
		<!-- //조회폼 영역 -->
		
		<div class="col2 sub_cnt" id="dataForm" name="dataForm">
			<h3 class="bul_arr"><spring:message code="purchSearch"/></h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1" ></div>
				</div>
				<!-- <div class="gridPaging" id="gridPageNavigationDiv"></div> -->
			</div>
		</div>
		
		<%-- <div class="sec_grid">
			<div class="content">
				<h3 class="bul_arr"><spring:message code="purchTotal"/></h3>
				<div id="gridHolder1"></div>
				<table class="tbl_st2 tbl_st5">
					<colgroup>
						<col width="8%" />
						<col width="15%" />
						<col width="15%" />
						<col width="21%" />
						<col width="20%" />
						<col width="21%" />
					</colgroup>
					<thead>
				  		<tr>
				  			<th><spring:message code="se"/></th>
			  				<th><spring:message code="co"/></th>
			  				<th><spring:message code="qY"/></th>
			  				<th><spring:message code="purchaseCost"/><spring:message code="sm"/></th>
			  				<th><spring:message code="taxGubun"/><spring:message code="sm"/></th>
			  				<th><spring:message code="purchTotal"/></th>
			  			</tr>
			  		</thead>
			  		<tfoot>
				  		<tr>
				  			<td>&nbsp;</td>
				  			<td colspan="2" class="t_c" id="TOT_BOT_SUM"></td>
			  				<td colspan="3" class="t_c" id="TOT_PAY"></td>
			  			</tr>				  			
			  		</tfoot>
					<tbody id="tbody">
					
			  		</tbody>			  		
				</table>
			</div>
		</div> --%>
		
	</div>
	<!-- //Content : 본문 영역 -->
	 

</body>
</html>