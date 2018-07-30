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
	설명: 공통코드관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2016-10-31    문희훈       초기작성 
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
<script type="text/javascript" src="/resources/js/page/code/code_management.js?var=20170629" charset="utf-8"></script>
	
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
	    		$("#BTN_AUTH_SEARCH").hide();
	    		$("#POP_BTN_AUTH_SAVE").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#BTN_AUTH_NEW").hide();
	    		$("#BTN_AUTH_SAVE").hide();
	    		$("#BTN_AUTH_SEARCH").hide();
	    		$("#POP_BTN_AUTH_SAVE").hide();
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
		    		$("#POP_BTN_AUTH_SAVE").show();
		    	}else{
		    		$("#BTN_AUTH_SAVE").hide();
		    		$("#POP_BTN_AUTH_SAVE").hide();
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
					<button type="button" id="BTN_AUTH_NEW"  class="btn btn_style2" onclick="btn_create()" ><spring:message code="btnNew"/></button>
				    <button type="button" id="BTN_AUTH_SAVE"  class="btn btn_style2"  onclick="btn_update()"><spring:message code="btnSave"/></button>
					<%-- <button type="button" id="btn_delete" class="btn btn_style2" onclick="btn_delete()" ><spring:message code="btnDel"/></button> --%>
					<button type="button" id="BTN_AUTH_SEARCH" class="btn btn_style3"  onclick="btn_read()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area"    id="top_search">
				<div class="last">
					<label for=""><spring:message code="commonCodeName"/></label>
					<input type="text" id="P_CD_NM" name="P_CD_NM"   maxlength="50">
					<label for=""><spring:message code="useYn"/></label>
					<select  id="P_DEL_YN" name="P_DEL_YN" >
						<option value=""><spring:message code="all"/></option>
						<option value="N"><spring:message code="use"/></option>
						<option value="Y"><spring:message code="unused"/></option>
					</select>
					<%-- <label for=""><spring:message code="useYn"/></label>
						<input type="text"  id="datepicker1"/> ~ <input type="text"  id="datepicker2"/> --%>			
				</div>
				<!-- <div>
					<label for="">분류명</label>
					<input type="text" maxlength="50" class="search_txt">
					<button type="button" class="search_btn">검색 아이콘</button>
					<label for="">분류명</label>
					<input type="text" maxlength="50">
				</div> -->
			</div>
			<!-- //조회폼 영역 -->
			
			<div class="col2 sub_cnt">

				<div class="box_lft">
					<h3 class="bul_arr"><spring:message code="commonCode"/></h3>
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder1" style="width:355px"></div>
						</div>
					</div>
					<table class="tbl_st2">
						<tbody>
							<tr>
								<th scope="row">
									<em>필수입력항목</em>
									<label><spring:message code="commonCodeName"/></label>
								</th>
								<td><input type="text" id="CD_NM" name="CD_NM" maxlength="50"></td>
							</tr>     
							<tr>
								<th scope="row"><spring:message code="commonCode"/></th>
								<td>
									<input type="text" id="CD_ID" name="CD_ID" style="background-image: url('/resources/img/common/icon_no.png');background-repeat: no-repeat;background-position:99% 50%;padding-right: 20px;" onkeyup="btnConfirm();">
									<input type="hidden" id="codeUseYN" name="codeUseYN" value="N">
									<!-- <button type="button" class="btn btn_style2"  onclick="btnConfirm();">중복확인</button> -->
								</td>
							</tr>
							<tr>
								<th scope="row"><spring:message code="explanation"/></th>   
								<td><textarea id="CD_DESCRIPTION" name="CD_DESCRIPTION"  maxlength="1500" ></textarea></td>
							</tr>
							<tr>
								<th scope="row"><spring:message code="useYn"/></th>
								<td>
									<label class="radio">
										<input type="radio" value="N" id="DEL_YN" name="DEL_YN" >
										<span><spring:message code="use"/></span>
									</label>
									<label class="radio">
										<input type="radio" value="Y"  name="DEL_YN" >
										<span><spring:message code="unused"/></span>
									</label>
								</td>
							</tr>
						</tbody>
					</table>					
				</div>
				
				<div class="box_rgt">
					<section class="sec_grid">
							<h3 class="bul_arr f_l"><spring:message code="commonCodeDetail"/></h3>
							<button type="button" class="btn btn_style4 f_r" onclick="btn_new_detail();"><spring:message code="commonCodeDetailInsert"/></button>
							<div class="content">
								<div id="gridHolder2"></div>
							</div>
					</section>
				</div>
			
			</div>

		</div>
		<!-- //Content : 본문 영역 -->
	 
<!-- 	 상세 팝업 영역 시작  -->
<div id="pop_wrap">
	<header id="pop_head" class="clear">
		<h1 class="bul_arr f_l"><spring:message code="commonCodeDetail"/></h1>
		<div class="f_r">
			<!-- <button type="button" id="pop_btn_del" class="btn btn_style4" onclick="btn_del_detail()"><spring:message code="btnDel"/></button>  -->
			<button type="button" class="btn btn_style4" onclick="btn_save_detail()" id="POP_BTN_AUTH_SAVE"><spring:message code="btnSave"/></button>
			<button type="button" class="btn btn_style4" onclick="btn_close()"><spring:message code="btnClose"/></button>
		</div>
	</header>
 
	<form action="">
		<div id="pop_cnt">
	
			<table class="tbl_st2">
						<input type="hidden"  id="D_ORIGIN_CD_ID" name="D_ORIGIN_CD_ID">
				<tbody>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="detailCodeId"/></label></th>   
						<td colspan="3"><input type="text"  id="D_CD_ID" name="D_CD_ID"></td>
					</tr>
					<tr>
						<th scope="row"><em>필수항목</em><label><spring:message code="detailCodeName"/></label></th>
						<td><input type="text" id="D_CD_NM" name="D_CD_NM"></td>
						<th scope="row"><spring:message code="shortName"/></th>
						<td><input type="text" id="D_CD_SHORT_NM" name="D_CD_SHORT_NM"></td>
					</tr>
					<tr>
						<th scope="row"><label><spring:message code="detailCodeExplanation"/></label></th>
						<td colspan="3"><textarea id="D_CD_DESCRIPTION" name="D_CD_DESCRIPTION"></textarea></td>
					</tr>
					<tr>
						<th scope="row"><spring:message code="managementTopics"/>1</th>
						<td><input type="text" id="D_MGMT_ENTRY_1" name="D_MGMT_ENTRY_1"></td>
						<th scope="row"><spring:message code="managementExplanation"/>1</th>
						<td><input type="text" id="D_MGMT_ENTRY_DESCRIPTION_1" name="D_MGMT_ENTRY_DESCRIPTION_1"></td>
					</tr>
					<tr>
						<th scope="row"><spring:message code="managementTopics"/>2</th>
						<td><input type="text" id="D_MGMT_ENTRY_2" name="D_MGMT_ENTRY_2"></td>
						<th scope="row"><spring:message code="managementExplanation"/>2</th>
						<td><input type="text" id="D_MGMT_ENTRY_DESCRIPTION_2" name="D_MGMT_ENTRY_DESCRIPTION_2"></td>
					</tr>
					<tr>
						<th scope="row"><spring:message code="managementTopics"/>3</th>
						<td><input type="text" id="D_MGMT_ENTRY_3" name="D_MGMT_ENTRY_3"></td>
						<th scope="row"><spring:message code="managementExplanation"/>3</th>
						<td><input type="text" id="D_MGMT_ENTRY_DESCRIPTION_3" name="D_MGMT_ENTRY_DESCRIPTION_3"></td>
					</tr>
					<tr>
						<th scope="row"><spring:message code="managementTopics"/>4</th>
						<td><input type="text" id="D_MGMT_ENTRY_4" name="D_MGMT_ENTRY_4"></td>
						<th scope="row"><spring:message code="managementExplanation"/>4</th>
						<td><input type="text" id="D_MGMT_ENTRY_DESCRIPTION_4" name="D_MGMT_ENTRY_DESCRIPTION_4"></td>
					</tr>
					<tr>
						<th scope="row"><spring:message code="managementTopics"/>5</th>
						<td><input type="text" id="D_MGMT_ENTRY_5" name="D_MGMT_ENTRY_5"></td>
						<th scope="row"><spring:message code="managementExplanation"/>5</th>
						<td><input type="text" id="D_MGMT_ENTRY_DESCRIPTION_5" name="D_MGMT_ENTRY_DESCRIPTION_5"></td>
					</tr>
					<%-- <tr>
						<th scope="row"><spring:message code="managementExplanation"/></th>
						<td colspan="3"><textarea id="D_MGMT_ENTRY_DESCRIPTION_1" name="D_MGMT_ENTRY_DESCRIPTION_1"></textarea></td>
					</tr> --%>
					<tr>
						<th scope="row"><em>필수항목</em><spring:message code="order"/></th>
						<td><input type="text" id="D_SORT_ORDER" name="D_SORT_ORDER" maxlength="4" ></td>
						<th scope="row"><em>필수항목</em><spring:message code="useYn"/></th>
						<td>
							<select id="D_DEL_YN" name="D_DEL_YN">
								<option value="Y"><spring:message code="unused"/></option>
								<option value="N"><spring:message code="use"/></option>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</form>

</div>
<!-- 	 상세 팝업 영역 끝  -->
	
</body>
</html>
	
