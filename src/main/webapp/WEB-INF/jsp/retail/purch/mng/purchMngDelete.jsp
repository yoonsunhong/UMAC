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
<title>상품 마스터 관리</title>
<link type="text/css" rel="stylesheet" href="/resources/css/jquery-ui.css">
<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">
<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->
<script type="text/javascript" src="/resources/js/jquery-1.12.4.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery-ui.js"></script>
<script src="/resources/js/style.js"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	
<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<script type="text/javascript" src="/resources/js/page/purch/mng/purchMngDelete.js?ver=20180405_000" charset="utf-8"></script>
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
	    	//alert("ORG_TYPE = " + data[0].ORG_TYPE + " / loadData.STR_CODE = " + loadData.STR_CODE);
	    	
	    	//사용자 기능별 권한관리 데이터가 없으면 모든 버튼 숨김
	    	if(data == ""){
	    		$("#btn_clear").hide();
	    		$("#btn_search").hide();
	    		$("#btn_pur_update").hide();
	    		$("#btn_magam_cancel").hide();
	    		$("#btn_del").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_clear").hide();
	    		$("#btn_search").hide();
	    		$("#btn_pur_update").hide();
	    		$("#btn_magam_cancel").hide();
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
		    		$("#btn_clear").show();
		    	}else{
		    		$("#btn_clear").hide();
		    	}
		    	
		    	//저장버튼 제어 
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_pur_update").show();
		    		$("#btn_magam_cancel").show();
		    	}else{
		    		$("#btn_pur_update").hide();
		    		$("#btn_magam_cancel").hide();
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
	    	
	    	//관리구분별 점포조회권한설정
	    	if(data[0].ORG_TYPE == "3") {
	    		//점포조회조건 제어.
	    		$("#STR_CODE").val(loadData.STR_CODE);
	    		$("#STR_CODE").prop("disabled", true);
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
			<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png">도움말</button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a">도움말 닫기</a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
			<div class="f_r">
		    	<button type="button" id="btn_clear"      	name="btn_clear"	class="btn btn_style2" onclick="btn_clear();" />초기화</button>
		        <button type="button" id="btn_del"    		name="btn_del"    	class="btn btn_style2" onclick="btn_del();" />매입삭제</button>   
		        <button type="button" id="btn_magam_cancel" name="btn_del"    	class="btn btn_style2" onclick="btn_magam_cancel();" />마감취소</button>   
				<button type="button" id="btn_search"		name="btn_search"	class="btn btn_style3" onclick="btn_search();" /><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 시작 -->
		<form id="frmSearch" name="frmSearch">
			<div class="search_area" id="top_search" name="top_search" style="height:50px" />
				<input type="hidden" id="selectedPrintRow"  name="selectedPrintRow" />
				<input type="hidden" id="P_PRINT_CORP_CODE"  name="P_PRINT_CORP_CODE" value="" />
				<input type="hidden" id="P_PRINT_PUR_DT"  name="P_PRINT_PUR_DT" />
				<input type="hidden" id="P_PRINT_STR_CODE"  name="P_PRINT_STR_CODE" />
				<input type="hidden" id="CORP_CODE"  name="CORP_CODE" value="${sessionScope.CORP_CODE}" />
				<table>
					<tr>
						<th><label for=""><em>필수입력사항</em>점포</label></th>
						<td>
							<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE }" />
							<input type="hidden" id="SESSION_ROLE_ID"  name="SESSION_ROLE_ID"  value="${sessionScope.ROLE_ID}" />
							<select id="STR_CODE" name="STR_CODE" class="wid2">
								<option value=""><spring:message code="select"/></option>
							</select>
						</td>
				 		<th><label for="">매입처</label></th>
				 		<td>
					 		<input type="hidden" id="VEN_CODE" name="VEN_CODE" class="wid2" />
							<input type="text"   id="VEN_NAME" name="VEN_NAME" class="search_txt" onBlur="clearVenCode();" />
							<button type="button" class="search_btn" onclick="btn_comm_supply_search();">검색 아이콘</button>
				 		</td>
				 		<th><label for=""><em>필수입력사항</em>발주일자</label></th>
				 		<td colspan="4">
					 		  <input type="text" id="PUR_DT_FROM"  name="PUR_DT_FROM" class="datepicker1 datepicker" />
							~ <input type="text" id="PUR_DT_TO"    name="PUR_DT_TO"   class="datepicker2 datepicker" />		
				 		</td>
				 	</tr>
				 	<tr>
				 		<th><label for="">확정구분</label></th>
				 		<td>
				 		  	<select id="CFM_YN" name="CFM_YN" class="wid2">
								<option value=""><spring:message code="all"/></option> 
						  	</select>
				 		</td>
				 		<th><label for="">매입구분</label></th>
				 		<td>
							<select id="PUR_GB" name="PUR_GB" class="wid2">
								<option value=""><spring:message code="all"/></option> 
							</select>
				 		</td>
				 		<th><label for="">입고일자</label></th>
				 		<td>
							<input type="text" id="PUR_CFM_DT" name="PUR_CFM_DT" class="datepicker2 datepicker" />
				 		</td>
				 		<th><label for="">전표번호</label></th>
				 		<td>
							<input type="text" id="SLIP_NO" name="SLIP_NO" class="search_txt" />
				 		</td>
					</tr>
				</table>
			</div>				
 		</form>
		<!-- //조회폼 영역 끝 -->
		
		<!-- 그리드 영역 -->
		<div class="clear">
			<div class="f_l tit_top">
				<div class="clear">
					<h3 class="bul_arr f_l">매입전표    &nbsp;&nbsp;  * 지불마감 된 전표는 삭제 할 수 없습니다.</h3>  
					<dlv class="f_r">
<!-- 					[매입삭제]박부장님 요청으로 주석으로 막아놓음 -->
<!-- 						<button type="button" id="" name="" class="btn btn_style4" onclick="purchDel()">매입삭제</button> -->
 						<input type="text" id="PUR_DT_CHG" name="PUR_DT_CHG" placeholder="수정 전표 일" class="datepicker2 datepicker"  style="width:85px;text-align:center" />
 						<button type="button" id="btn_pur_update" class="btn btn_style4" onclick="purchChangeDate();">전표날짜수정</button>
					</dlv>
				</div>
				<div id="gridHolder2"><!-- 그리드2 영역, 스타일 삭제 --></div>
			</div>
			<table class="tbl_st2 f_r" style="width:312px;margin-top:32px;margin-left:10px">
				<colgroup>
					<col width="50%" />
					<col width="50%" />
				</colgroup>				
				<tbody>
					<tr>
						<th scope="row">면세원가 금액합계</th>
						<td><input type="text" id="TOT_WSPRC_TAX_FREE" name="TOT_WSPRC_TAX_FREE" class="wid100"  style="text-align:right;" readonly /></td>
					</tr>
					<tr>
						<th scope="row">과세원가 금액합계</th>
						<td><input type="text" id="TOT_WSPRC_TAX_ADD" name="TOT_WSPRC_TAX_ADD" class="wid100" style="text-align:right;" readonly /></td>
					</tr>						
					<tr>
						<th scope="row">부가세 금액합계</th>
						<td><input type="text" id="TOT_WVAT" name="TOT_WVAT" class="wid100" style="text-align:right;" readonly /></td>
					</tr>						
					<tr>
						<th scope="row">구입 금액합계</th>
						<td><input type="text" id="TOT_PRICE" name="TOT_PRICE" class="wid100" style="text-align:right;" readonly /></td>
					</tr>						
					<tr>
						<th scope="row">매가 금액합계</th>
						<td><input type="text" id="TOT_SPRC" name="TOT_SPRC" class="wid100" style="text-align:right;" readonly /></td>
					</tr>						
					<tr>
						<th scope="row">공병 금액합계</th>
						<td><input type="text" id="BOT_SPRC_TOT" name="BOT_SPRC_TOT" class="wid100" style="text-align:right;" readonly /></td>
					</tr>
				</tbody>
			</table>			
		</div> 
		
		<div>
			<div class="tit_top clear">
				<h3 class="bul_arr f_l">매입전표 상세</h3>	 
				<div class="f_r">  
					 * 원가단가: 부가세포함
				</div>	
			</div>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
			</div>
		</div>		
		<!-- //그리드 영역 끝-->
	</div>
	<!-- //Content : 본문 영역 -->

</body>
</html>