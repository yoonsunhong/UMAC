<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>공통코드 관리</title>

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
	설명: POS단축키관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-01-03    김경진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/posmaster/shortcuts/posMasterShortcuts.js?ver=201723613221" charset="utf-8"></script>
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
	    		$("#btn_search").hide();
	    		$("#btn_new").hide();
	    		$("#pop_btn_save").hide();
	    		$("#btn_del").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_new").hide();
	    		$("#pop_btn_save").hide();
	    		$("#btn_del").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_search").show();
		    	}else{
		    		$("#btn_search").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#btn_new").show();
		    	}else{
		    		$("#btn_new").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#pop_btn_save").show();
		    	}else{
		    		$("#pop_btn_save").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#btn_del").show();
		    	}else{
		    		$("#btn_del").hide();
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
				<button type="button" class="btn btn_style2" id="btn_new" ><spring:message code="btnNew"/></button>
				<button type="button" class="btn btn_style2" id="btn_del" ><spring:message code="btnDel"/></button>
				<button type="button" class="btn btn_style3" id="btn_search" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 상품검색 form -->
		<form name="frm2" id="frm2">
			<input type="hidden" name="PD_CORP_CODE" id="PD_CORP_CODE" value="${sessionScope.CORP_CODE }" />
			<input type="hidden" name="PD_STR_CODE" id="PD_STR_CODE" value="${sessionScope.STR_CODE }" />
			<input type="hidden" name="PD_POS_NO" id="PD_POS_NO" />
			<input type="hidden" name="PD_KEY_POSITION" id="PD_KEY_POSITION" />
			<input type="hidden" name="PD_POS_KEY_NO" id="PD_POS_KEY_NO" />
		</form>
		
		<form name="frm" id="frm">
			<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" />
			<input type="hidden" name="S_STR_CODE" id="S_STR_CODE" value="${sessionScope.STR_CODE }" />
			<input type="hidden" name="P_COLUMN_NAME" id="P_COLUMN_NAME" />
			<input type="hidden" name="P_ORDERBY" id="P_ORDERBY" />
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><spring:message code="store"/></label>
					<select id="P_STR_CODE" name="P_STR_CODE" >
					</select>
					<label for=""><spring:message code="pos"/></label>
					<select id="P_POS_NO" name="P_POS_NO" >
					</select>
					<label for=""><spring:message code="locationType"/></label>
					<select id="P_KEY_POSITION" name="P_KEY_POSITION" >
						<option value=""><spring:message code="all"/></option>
					</select>
					<label for="" id="useKeyNo" >생성 단축키 수 : </label>
				</div>
			</div>
			<!-- //조회폼 영역 -->
		</form>
		
		<div class="col2 sub_cnt">
			<!-- <h3 class="bul_arr">POS관리 > POS단축키관리</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1">
					</div>
					<div class="gridPaging" id="gridPageNavigationDiv">
					</div>
				</div>
			</div> -->
			
			<div class="lft_wid f_l">
				<h3 class="bul_arr">POS단축키관리</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1">
						</div>
					</div>
				</div>
			</div>
			
			<div class="rgt_wid f_r">
				<h3 class="bul_arr">상품</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder2">
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
	<!-- //Content : 본문 영역 -->

<!-- 등록 수정 팝업 영역 시작  -->
<div id="pop_wrap1">
	<header id="pop_head" class="clear">
		<h1 class="bul_arr f_l">POS단축키관리</h1>
		<div class="f_r">
			<button type="button" class="btn btn_style4" id="pop_btn_save" onclick="updateDetail('update');"><spring:message code="btnSave"/></button>
			<button type="button" class="btn btn_style4" onclick="btn_close()"><spring:message code="btnClose"/></button>
		</div>
	</header>
 
	<form name="reg_frm" id="reg_frm">
		<input type="hidden" name="D_CORP_CODE" id="D_CORP_CODE" value="${sessionScope.CORP_CODE }" />	<!-- 기업코드 -->
		<input type="hidden" name="D_TYPE" id="D_TYPE" />			<!-- 1:insert, 2:update, 3:delete -->
		<input type="hidden" name="D_USER_ID" id="D_USER_ID" value="${sessionScope.ID }" />
		<input type="hidden" name="D_ALL_POS_CODE" id="D_ALL_POS_CODE" value="" />
		
		<div id="pop_cnt">
			<table class="tbl_st2">
				<tbody>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="storNm"/></th>
						<td colspan="3">
							<select id="D_STR_CODE" name="D_STR_CODE" >
								
							</select>
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="pos"/></th>
						<td colspan="3">
							<p id="posAll" style="float:left;height:20px;line-height:20px;margin-right:4px;"><input type="checkbox" name="D_ALL_POS" id="D_ALL_POS" value="" /><label for="D_ALL_POS" class="mar_L2">전체</label></p>
							<select id="D_POS_NO" name="D_POS_NO" class="wid2">
								
							</select>
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="locationType"/></label></th>
						<td colspan="3">
							<select id="D_KEY_POSITION" name="D_KEY_POSITION">
								
							</select>
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="hotkeyNumber"/></label></th>
						<td colspan="3"><input type="text" id="D_POS_KEY_NO" name="D_POS_KEY_NO" ></td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="hotkeyName"/></label></th>
						<td colspan="3"><input type="text" id="D_POS_KEY_NAME" name="D_POS_KEY_NAME" maxlength="20" ></td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="rowNumber"/></label></th>
						<td colspan="3"><input type="text" id="D_SEQ" name="D_SEQ" maxlength="5" ></td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="scanCode"/></label></th>
						<td colspan="3"><input type="text" id="D_SCAN_CODE" name="D_SCAN_CODE" onclick="popupProd();" ></td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="useYn"/></label></th>
						<td colspan="3">
							<input type="radio" name="D_USE_YN" id="use" value="Y" checked="checked" /><label for="use"><spring:message code="use"/></label>
							<input type="radio" name="D_USE_YN" id="unused" value="N" /><label for="unused"><spring:message code="unused"/></label>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</form>

</div>
<!--  등록 수정 팝업 영역 끝  -->

</body>
</html>