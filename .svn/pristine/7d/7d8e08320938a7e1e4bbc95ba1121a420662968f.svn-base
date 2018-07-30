<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
<META HTTP-EQUIV='Cache-Control' ConTENT='no-cache'>
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
/********************************************************
*    설명: 영업정보 > 매입관리 > 평균단가조정등록(대출입)
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2018-03-23     송원두        초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/
--%> 

<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<!-- 수정 -->
<script type="text/javascript" src="/resources/js/page/inoutcenter/mng/inoutUnitpriceAvg.js?ver20180326_008" charset="utf-8"></script>
<!-- 공통 팝업 -->
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
	    		$("#btn_read").hide();
	    		$("#btn_save").hide();
	    		$("#btn_gen").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_save").hide();
	    		$("#btn_gen").hide();
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
		    		$("#btn_save").show();
		    	}else{
		    		$("#btn_save").hide();
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
				<!-- 신규 -->
				<button type="button" id="btn_gen" class="btn btn_style2"  onclick="btn_new();"><spring:message code="btnNew"/></button>
				<!-- 저장 -->
				<button type="button" id="btn_save" class="btn btn_style2"  onclick="btn_save();"><spring:message code="btnSave"/></button>
				<!-- 조회 -->
				<button type="button" id="btn_read" class="btn btn_style3"  onclick="btn_search();"><i class="fa fa-searlch"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>

		<!-- 조회폼 영역 -->
		<div class="search_area" id="top_search">
			<div class="last">
				<!-- 점포명 -->
				<label for=""><spring:message code="storNm" /></label>
				<select id="P_STR_CODE" name="P_STR_CODE">
					<option value=""><spring:message code="all"/></option>
				</select>
				<!-- 적용일자 -->
				<label for=""><spring:message code="pyApplDt"/></label>
				<input type="text" id="P_APP_DT" name="P_APP_DT" class="datepicker1 datepicker" />
				<!-- 상품명 -->
				<label for=""><spring:message code="itmName" /></label>
				<input type="text" id="P_ITM_NAME" name="P_ITM_NAME" class="search_txt" />
				<input type="hidden" id="P_ITM_CODE" name="P_ITM_CODE" />
				<button type="button" class="search_btn" onclick="btn_comm_store_search();">검색 아이콘</button>
			</div>
		</div>
	
		<!-- //Content : 본문 영역 -->
		<h3 class="bul_arr">평균 단가등록</h3>
			<div id="inoutunitprice_detail" class="unitprice">
				<table class="tbl_st2"> 
					<tbody>
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="storNm"/></label></th> 	
							<td>
							<select id="P_INS_STR_CODE" name="P_INS_STR_CODE" class="" disabled="disabled" style="width: 100px"></select>
							</td>
							<th scope="row"><em>필수입력항목</em><label>적용일자</label></th>
							<td><input type="text" class="datepicker2 datepicker" id="P_INS_APP_DT" name="P_INS_APP_DT" style="width: 150px;" readonly /></td>
							<th scope="row"><label>상품명</label></th>
							<td>
								<div class="last">
									<input type="text" id="P_INS_ITM_NAME" name="P_INS_ITM_NAME" class="search_txt" style="width:150px;" readonly />
									<button type="button" class="search_btn" onclick="btn_comm_store_search2();">검색 아이콘</button>
									<input type="hidden" id="P_INS_ITM_CODE" name="P_INS_ITM_CODE" />
									<input type="hidden" id="P_INS_SCAN_CODE" name="P_INS_SCAN_CODE" />
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row"><em>필수입력항목</em><label>마스터 단가</label></th> 
							<td><input type="text" id="P_INS_WPRC" name="P_INS_WPRC" class="" style="text-align:right; width:150px;" readonly /></td>
							<th scope="row"><em>필수입력항목</em><label>평균 단가</label></th> 
							<td><input type="text" id="P_INS_PUR_AVR_AMT" name="P_INS_PUR_AVR_AMT" class="" style="text-align:right; width: 150px;" readonly /></td>
							<th scope="row"><label>변경 단가</label></th> 
							<td colspan="5"><input type="text" id="P_INS_CHG_AVR_AMT" name="P_INS_CHG_AVR_AMT" class="" style="width:150px; text-align:right;" readonly /></td>
						</tr>						
					</tbody>
					
				</table>
			</div>
			
	<!-- 평균단가 내역 -->
		<div class="col2 sub_cnt" >
			<h3 class="bul_arr tit_top">평균단가 내역</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
				</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
</body>
</html>
