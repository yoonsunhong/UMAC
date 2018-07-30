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
<meta name="description" content="사이트에 대한 설명">
<meta name="keywords" content="키워드, 태그">
<title>메뉴관리</title>
<link type="text/css" rel="stylesheet" href="/resources/css/jquery-ui.css">
<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">

<!--[if lt IE 9]>
<script src="/resources/_js/html5shiv.js"></script>
<script src="/resources/_js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/_css/ie8.css">
<![endif]-->

<script type="text/javascript" src="/resources/js/jquery-1.7.1.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery.ui-1.10.4.datepicker.min.js"></script>
<script src="/resources/js/style.js"></script>

<%--
	설명: 메뉴관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2016-10-31    문희훈       초기작성 
	------------------------------------------------------
	version : 1.0
--%> 

<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	
<script type="text/javascript" src="/resources/js/page/menu/menu_management.js" charset="utf-8"></script>
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
	    		$("#BTN_AUTH_NEW").hide();
	    		$("#BTN_AUTH_SAVE").hide();
	    		$("#BTN_AUTH_DELETE").hide();
	    		$("#BTN_AUTH_SEARCH").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#BTN_AUTH_NEW").hide();
	    		$("#BTN_AUTH_SAVE").hide();
	    		$("#BTN_AUTH_DELETE").hide();
	    		$("#BTN_AUTH_SEARCH").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#BTN_AUTH_SEARCH").show();
		    	}else{
		    		$("#BTN_AUTH_SEARCH").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#BTN_AUTH_NEW").show();
		    	}else{
		    		$("#BTN_AUTH_NEW").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#BTN_AUTH_SAVE").show();
		    	}else{
		    		$("#BTN_AUTH_SAVE").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#BTN_AUTH_DELETE").show();
		    	}else{
		    		$("#BTN_AUTH_DELETE").hide();
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
 	<div id="iframeCnt"><!-- 아이디 iframeCnt 추가 -->
		<div class="btn_area clear"><!-- 클래스 clear 추가 -->
			<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png"><spring:message code="btnHelp"/></button>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a"><spring:message code="btnHelpClose"/></a>
			</div>
			
			<span class="txt">* <spring:message code="menuInformation"/></span>
			<div class="f_r">
				<!-- div 감싼 후 클래스 f_r 추가 -->
				<button type="button" id="BTN_AUTH_NEW" class="btn btn_style2" onclick="btn_new()"><spring:message code="btnNew"/></button>
				<button type="button" id="BTN_AUTH_SAVE" class="btn btn_style2" onclick="btn_save()"><spring:message code="btnSave"/></button>
				<button type="button" id="BTN_AUTH_DELETE" class="btn btn_style2"onclick="btn_del()"><spring:message code="btnDel"/></button>
				<button type="button" id="BTN_AUTH_SEARCH" class="btn btn_style3" onclick="btn_search()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				<!-- 클래스 btn btn_style2 추가, 아이콘 추가 -->		
			</div>
		</div>
		<div class="sec_category">
			<div class="box_menu"> 
				<div id="tree_menu">
				</div> 
			</div>
			<section class="sec_menu_info">
				<h3 class="bul_arr"><spring:message code="menuDetail"/></h3> 
				<table class="tbl_st2">
					<tbody>
						<tr>
							<th scope="row">
								<em>필수항목</em>
								<!-- 상위메뉴 -->
								<label for="UP_MENU_NM"><spring:message code="upMenuName"/></label>
							</th>
							<td colspan="3">
							<input type="text"  id="UP_MENU_NM" name="UP_MENU_NM" class="wid1" readonly>
							<input type=hidden  id="UP_MENU_ID" name="UP_MENU_ID" class="wid1" >
							</td>
						</tr>
						<tr>
							<th scope="row">
								<em>필수항목</em>
								<!-- 메뉴 ID -->
								<label for="MENU_ID"><spring:message code="menuID"/></label>
							</th>
							<td colspan="3"><input type="text"  id="MENU_ID" name="MENU_ID" class="wid1" maxlength="30" readonly></td>
						</tr>
						<tr>
							<th scope="row">
								<em>필수항목</em>
								<label for="MENU_NM"><spring:message code="menuName"/></label>
							</th>
							<td colspan="3"><input type="text" id="MENU_NM" name="MENU_NM" class="wid1" maxlength="50"></td>
						</tr>    

						<tr>
							<th scope="row">
								<label for="CLASS_NM"><spring:message code="menuClassName"/></label>
							</th>
							<td colspan="3"><input type="text" id="CLASS_NM" name="CLASS_NM" class="wid1" maxlength="30"></td>
						</tr>   
						<tr>
							<th scope="row">
								<em>필수항목</em>
								<label for="MENU_GB"><spring:message code="menuGubun"/></label>
							</th>
							<td colspan="3">
								<select id="MENU_GB" name="MENU_GB" class="selectbox wid1" disabled >
									<option value=""><spring:message code="select"/></option>
									<option value="1"><spring:message code="topMenu"/></option>
									<option value="2"><spring:message code="middleMenu"/></option>
									<option value="3"><spring:message code="bottonMenu"/></option>
								</select>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<em>필수항목</em>
									<label for="SORT_ORDER"><spring:message code="sortOrder"/></label>
								</th>
							<td width="350">
								<input type="text" id="SORT_ORDER" name="SORT_ORDER" style="width:50px;text-align: center;" maxlength="5">
								<p class="tip">※ <spring:message code="menuOrderMsg"/></p>
							</td>
							<th scope="row">
								<em>필수항목</em>
								<label for="USE_YN"><spring:message code="useYn"/></label>
							</th>
							<td>
								<select id="USE_YN" name="USE_YN" style="width:100%;min-width:100px;" class="selectbox">
									<option value=""><spring:message code="select"/></option>
									<option value="Y"><spring:message code="use"/></option>
									<option value="N"><spring:message code="unused"/></option>
								</select>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<label for="BIGO" id="bigoText"><spring:message code="btnHelp"/></label>
								<br/> <br/><span id="byteInfo">0</span>/3500 Byte
							</th>
							<td class="p_r" colspan="3">
								<textarea  id="BIGO" name="BIGO" class="menu_note" onKeyUp="javascript:fnChkByte(this,'3500')"></textarea>
							</td>
						</tr>
					</tbody>
				</table>	
			</section>	
		</div>		
	</div>

			

		<!-- //Content : 본문 영역 -->
	
</body>
</html>
	

	
