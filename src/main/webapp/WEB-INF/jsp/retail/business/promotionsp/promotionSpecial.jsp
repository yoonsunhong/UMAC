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
	설명: 프로모션특단가 상품관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-03-24    이성진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/business/promotionsp/promotionSpecial.js?ver=20180406_009" charset="utf-8"></script>
<!-- 공통 팝업을 쓸 때 반드시 추가해야 한다. -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />

<script type="text/javascript">
/*@cc_on @*/ 
/*@if (@_win32 && @_jscript_version>=5) 

function confirmMessage‎(str) 
{ 
execScript('n = msgbox("'+str+'","4132")', "vbscript‎"); 
return(n == 6); 
} 

@end @*/ 
</script>
	
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
	    		$("#btn_update").hide();
	    		$("#btnRegist").hide();
	    		$("#btn_update").hide();
	    		$("#btnRegist").hide();
	    		$("#btn_delRow").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_update").hide();
	    		$("#btnRegist").hide();
	    		$("#btn_update").hide();
	    		$("#btnRegist").hide();
	    		$("#btn_delRow").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_read").show();
		    	}else{
		    		$("#btn_read").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#btn_addRow").show();
		    		$("#btn_create").show();
		    	}else{
		    		$("#btn_addRow").hide();
		    		$("#btn_create").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_update").show();
		    		$("#btnRegist").show();
		    	}else{
		    		$("#btn_update").hide();
		    		$("#btnRegist").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#btn_delRow").show();
		    	}else{
		    		$("#btn_delRow").hide();
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
	    	
	    	//관리구분별 점포조회권한설정
	    	if(data[0].ORG_TYPE == "3") {
	    		//점포조회조건 제어.
	    		$("#S_STR_CODE").val(loadData.STR_CODE);
	    		$("#S_STR_CODE").prop("disabled", true);
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
					<button type="button" id="btn_create" class="btn btn_style2" onclick="btnNew()"><spring:message code="btnNew"/></button>
				    <button type="button" id="btn_update" class="btn btn_style2" onclick="btnSaveCheck()"><spring:message code="btnSave"/></button>
					<button type="button" id="btn_read" class="btn btn_style3" onclick="btnSearch()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area"    id="top_search">
				<div class="last">
					<label for=""><em>필수입력항목</em><spring:message code="storCode"/></label>
					<select id="S_STR_CODE" name="S_STR_CODE" class="wid2"></select>
					<label for=""><em>필수입력항목</em><spring:message code="appStrDay"/></label>
					<input type="text" class="datepicker wid2" id="S_STR_DT" name="S_STR_DT" />
					<label for=""><spring:message code="cusNo"/></label>
					<input type="text" id="S_CUST_NAME" name="S_CUST_NAME" class="search_txt" />
					<input type="hidden" id="S_CUST_NO" name="S_CUST_NO" class="search_txt" />
					<input type="hidden" id="S_CORP_CODE" name="S_CORP_CODE" class="search_txt" value="${sessionScope.CORP_CODE}" />
					<button type="button" class="search_btn" onclick="btn_comm_user_search('S');">검색 아이콘</button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<div class="clear">
				<div class="lft_wid f_l">
					<h3 class="bul_arr"><spring:message code="specPrcCustom"/></h3>
					<div id="gridHolder1"></div>
				</div>
				<div class="rgt_wid f_r">
					<h3 class="bul_arr f_l"><spring:message code="specPriceItem"/></h3>
					<div class="f_r">
						<button type="button" id="btn_addRow" class="btn btn_style4" onclick="addRow()"><spring:message code="addRow"/></button>
						<button type="button" id="btn_delRow" class="btn btn_style4" onclick="deleteRow()"><spring:message code="delRow"/></button>
					</div>
					<div id="gridHolder2"></div>					
				</div>
			</div>
		<!-- //Content : 본문 영역 -->
		
		<!-- 	 상세 팝업 영역 시작  -->
	<div id="pop_wrap1">
		<header id="pop_head" class="clear">
			<div class="f_r">
				<button type="button" class="btn btn_style4" onclick="btnRegist()"><spring:message code="regist"/></button>
				<button type="button" class="btn btn_style4" onclick="btn_close()"><spring:message code="btnClose"/></button>
			</div>
		</header>
		<div id="pop_cnt">
			<div class="clear">
				<div class="f_l">
					<h1 class="bul_arr">점포명</h1>		
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder3"></div>
						</div>
					</div>
				</div>
				<div class="f_r" style="width:758px;">
					<h3 class="bul_arr"><spring:message code="specPrcItemReg"/></h3>
					<table class="tbl_st2">
						<colgroup>
							<col style="width:16%">
							<col>
							<col style="width:11%">
							<col>
						</colgroup>
						<tr>
							<th><em>필수입력사항</em><spring:message code="cstCodeName"/></th>
							<td colspan="3">
								<input type="text" id="CUST_NO" name="CUST_NO" class="search_txt" style="width:100px;margin-right:4px" disabled>
								<input type="text" id="CUST_NAME" name="CUST_NAME" class="search_txt" style="width:170px" >
								<button type="button" id="btnCustName" onclick="btn_comm_user_search('R')" class="search_btn">검색 아이콘</button>
							</td>
						</tr>
						<tr>
							<th><em>필수입력사항</em><spring:message code="scanCode"/>/<spring:message code="itmName"/></th>
							<td colspan="3">
								<input type="text" id="SCAN_CODE" name="SCAN_CODE" class="search_txt" style="width:100px;margin-right:4px"  disabled>
								<input type="text" id="ITM_NAME" name="ITM_NAME" class="search_txt" style="width:170px"  >
								<button type="button" class="search_btn" onclick="btn_comm_product_search()" >검색 아이콘</button>
								<input type="hidden" id="ITM_CODE" name="ITM_CODE">
							</td>		
						</tr>
						<tr>
							<th><em>필수입력사항</em><spring:message code="dcPrc"/></th>
							<td colspan="3">
								<input type="text" id="SPECIAL_SPRC" name="SPECIAL_SPRC"   style="text-align: right; padding-right:5px; width:100px;" maxlength="13" />
								<input type="text" id="WPRC" name="WPRC" style="text-align: right; padding-right:5px; width:200px;"  disabled/>
								<input type="hidden" id="BASE_SPRC" name="BASE_SPRC">
								<input type="hidden" id="BASE_WPRC" name="BASE_WPRC">
							</td>
						</tr>
						<tr>
							<th><em>필수입력사항</em><spring:message code="appDay"/></th>
							<td colspan="3">
								<input type="text" id="STR_DT" name="STR_DT" onChange="fnChangeable('STR_DT')" class="datepicker" style="width:85px"> ~ <input type="text" id="END_DT" name="END_DT" class="datepicker" style="width:85px">							
							</td>	
						</tr>
					</table>					
				</div>
			</div>
		</div>
	</div>
<!-- 	 상세 팝업 영역 끝  -->
<div id="dialog-confirm">
  <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>추가로 특단가 상품을 등록하시겠습니까?</p>
</div>

	
</body>
</html>
	
