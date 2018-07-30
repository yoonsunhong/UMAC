<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- 스프링 메세지 테그사용 :: 다국어 -->
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><spring:message code="bestWorst20"/></title>

<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">

<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	
<script src="/resources/js/style.js"></script>

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<!-- 공통 팝업 -->


<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->
<!--[if IE]><script language="javascript" type="text/javascript" src="/resources/js/rMateGridH5/JS/shim.js"></script><![endif]-->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>	 
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />	

<script type="text/javascript" src="/resources/js/page/salesinfo/item/itemSalesState.js?ver=20180309_002" charset="utf-8"></script>
</head>
<script type="text/javascript">

$(document).ready(function(){
	//사용자의 버튼 권한 조회	
	//PKG_COMMON.GET_AUTH_BUTTON_LIST 쿼리 수정해야함
	var loadData =  $("#in_frame").serializeAllObject();
    
	//필수 파라메터 셋팅 (url, 사용자아이디, 점포코드)
	//loadData.URL = $(location).attr('pathname').replace(/\//gi, ""); 
	loadData.URL = $(location).attr('pathname').replace(/\//gi, "")+$(location).attr('search');  
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
	    		$("#btn_search").hide();
	    		$("#btn_excel_detail_down").hide();
	    		$("#btn_excel_down").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_excel_detail_down").hide();
	    		$("#btn_excel_down").hide();
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
		    		$("#btn_excel_detail_down").show();
		    		$("#btn_excel_down").show();
		    	}else{
		    		$("#btn_excel_detail_down").hide();
		    		$("#btn_excel_down").hide();
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
					<a href="" class="close_btn p_a"><spring:message code="btnHelpClose"/></a>
				</div>
				<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
				<div class="f_r">
					<button type="button" class="btn btn_style2"  id="btn_excel_down" name="btn_excel_down"><i class="fa fa-file-excel-o"></i> <spring:message code="btnExcelDown"/></button>
					<button type="button" class="btn btn_style3"  id="btn_search" name="btn_search"><i class="fa fa-search"></i> <spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<form name="sertch_frm" id="sertch_frm">			
				<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
				<input type="hidden" name="pageUnit" id="pageUnit" value="20" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
				<input type="hidden" name="pageSize" id="pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
				<input type="hidden" name="P_COLUMN_NAME" id="P_COLUMN_NAME" />
				<input type="hidden" name="P_ORDERBY" id="P_ORDERBY" />			
				<div class="search_area" id="top_search">
					<div>
						<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" >
						<input type="hidden" name="P_EMP_NO" id="P_EMP_NO" value="<%=getEnv().getUserId()%>" >
						<input type="hidden" name="URL" id="URL" value="itemSalesState.itemSalesStateList" >
								
						<label for="" class=""><em>필수입력항목</em><spring:message code="storNm"/></label> &nbsp;&nbsp;
						<select id="P_STR_CODE" name="P_STR_CODE" class="wid2">
							<option value=""><spring:message code="all"/></option>
						</select>		
						
						<label for="" ><em>필수입력항목</em><spring:message code="selngDate"/></label>
						<input type="text"  id="P_SALES_SD" name="P_SALES_SD" class="datepicker" >
						~
						<input type="text"  id="P_SALES_ED" name="P_SALES_ED" class="datepicker" >
						
						<label for=""><spring:message code="supply"/></label>		
						<input type="text" id="P_VEN_NAME" name="P_VEN_NAME" class="search_txt"  onBlur="clearVenCode()" /> 
						<input type="hidden" id="P_VEN_CODE" name="P_VEN_CODE"/> 
						<button type="button" class="search_btn"  id="P_VEN_NAME_SEARCH" name="P_VEN_NAME_SEARCH">searchIcon</button>		
					</div>
					<div class="last">
						<label for=""><spring:message code="goodsCl"/></label>											
						<select id="P_LRG_CODE" name="P_LRG_CODE" class="wid2 wid_marR" onchange="chgCate1()">
							<option value=""><spring:message code="select"/></option>   
						</select>
						<select id="P_MID_CODE" name="P_MID_CODE" class="wid2 wid_marR" onchange="chgCate2()">
							<option value=""><spring:message code="select"/></option>   
						</select>
						<select id="P_CLS_CODE" name="P_CLS_CODE" class="wid2" onchange="chgCate3()">
							<option value=""><spring:message code="select"/></option>   
						</select>
						<span style="white-space: nowrap;width:163px; display:inline-block;">&nbsp;</span>
						<label for="">상품명</label>		
						<input type="hidden" id="P_SCAN_CODE" name="P_SCAN_CODE"   >
						<input type="text" id="P_ITM_NAME" name="P_ITM_NAME" class="search_txt" >  
						<!--<button type="button" class="search_btn" onclick="btn_comm_store_search()">검색 아이콘</button>-->
						<button type="button" class="search_btn" onclick="btn_comm_product_search()">검색 아이콘</button>
					</div>
					
				</div>
			</form>		
			<!-- //조회폼 영역 -->
			
			<!-- 매출속보 -->
			<div class="col2 sub_cnt">
				<div class="clear">
					<h3 class="bul_arr f_l">단품매출판매내역</h3>
				</div>	 		
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
					<div class="gridPaging" id="gridPageNavigationDiv"/>						
				</div> 		 
			</div>
			
			<div class="col2 sub_cnt">
				<div class="clear">
					<h3 class="bul_arr f_l">단품매출판매상세내역</h3>
					<button type="button" class="btn btn_style2" style="float:right; margin-bottom: 3px;"  id="btn_excel_detail_down" name="btn_excel_detail_down"><i class="fa"></i><spring:message code="btnExcelDown"/></button>
				</div>	 		
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder2"></div>
					</div>
				</div> 		 
			</div>
			
		</div>
	<!-- //Content : 본문 영역 -->	 
		
</body>
</html>
	
