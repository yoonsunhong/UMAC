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
<script type="text/javascript" src="/resources/js/jquery-1.12.4.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery-ui.js"></script>
<script src="/resources/js/style.js"></script>
<%--
	설명: 회원정보 > 멤버십관리 > 회원정보관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-01-05         김경진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/member/info/memberInfo.js?ver=2017023724_1" charset="utf-8"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
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
	    		$("#btn_update").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_new").hide();
	    		$("#btn_update").hide();
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
	
	<input type="hidden" id="CUST_NO" value="${CUST_NO}">
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
				<button type="button" id="btn_new" class="btn btn_style2" ><spring:message code="btnNew"/></button>
			    <button type="button" id="btn_update" class="btn btn_style2" ><spring:message code="btnSave"/></button>
				<button type="button" id="btn_search" class="btn btn_style3" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form name="sertch_frm" id="sertch_frm" onsubmit="return false;">
			<input type="hidden" name="S_MOBIL_NO" id="S_MOBIL_NO" />
			
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수입력항목</em><spring:message code="cusName"/></label>
					<input type="text" id="S_CUST_NAME" name="S_CUST_NAME" class="search_txt">
					<input type="hidden" id="S_CUST_NO" name="S_CUST_NO" class="search_txt">
					<input type="hidden" id="S_CORP_CODE" name="S_CORP_CODE" class="search_txt" value="${sessionScope.CORP_CODE }" >
					<button type="button" class="search_btn" onclick="btn_comm_user_search('S')" >검색 아이콘</button>
				</div>
			</div>
		</form>
		<!-- //조회폼 영역 -->
		
		<!-- 본문 영역 -->
		
		<h3 class="bul_arr">회원정보</h3>
		<div id="tab1" class="tab">
			<ul>
				<li class="tab1 on">
				
				<form name="frm1" id="frm1" >
					<input type="hidden" name="P_TYPE" id="P_TYPE" value="insert" />
					<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" />
					<input type="hidden" name="P_STR_CODE" id="P_STR_CODE" value="${sessionScope.STR_CODE }" />
					<input type="hidden" name="P_REG_ID" id="P_REG_ID" value="${sessionScope.ID }" />
					<input type="hidden" name="P_CARD_LIST" id="P_CARD_LIST" />
					
					<button class="tab_btn" id="tab_p" tabindex="-1" >개인</button>
					<ul>
						<table class="tbl_st2 tbl_st3">
							<tbody>
								<tr>
									<th scope="row"><em>필수입력항목</em><label><spring:message code="cusName"/></label></th>
									<td>
										<input type="text" class="wid2" id="P_CUST_NAME" name="P_CUST_NAME">
										<div class="tbl_mid">
											<input type="radio" id="P_SEX_1" name="P_SEX" value="M" class="wid_marL"  ><label for="P_SEX_1" class="wid_marL">남</label>
									 		<input type="radio" id="P_SEX_2" name="P_SEX" value="F" ><label for="P_SEX_2" class="wid_marL">여</label>										
										</div>
									</td>
									<th scope="row"><label><spring:message code="cusNo"/></label></th>
									<td><input type="text" class="wid2" id="P_CUST_NO" name="P_CUST_NO" readonly="readonly" tabindex="-1" onfocus="this.blur()" ></td>
									<th scope="row"><em>필수입력항목</em><label><spring:message code="birthDate"/></label></th>
									<td>
										<input type="text" class="datepicker" id="P_BIR_DATE" name="P_BIR_DATE">
										<input type="radio" id="P_BIR_TYPE_1" name="P_BIR_TYPE" value="1" class="wid_marL"><label for="P_BIR_TYPE_1" class="wid_marL">양력</label>
									 	<input type="radio" id="P_BIR_TYPE_2" name="P_BIR_TYPE" value="2" ><label for="P_BIR_TYPE_2" class="wid_marL">음력</label>
										<!-- <div class="tbl_mid">
											
										</div> -->
									</td>
								</tr>
								<tr>
									<th scope="row"><label><spring:message code="phoneNumber"/></label></th>
									<td>
										<select id="P_TEL_NO_1" name="P_TEL_NO_1" class="wid3">
											<option value=""><spring:message code="select"/></option>
										</select>
										<input type="text" id="P_TEL_NO_2" name="P_TEL_NO_2" class="wid3 wid_marL" >
										<input type="text" id="P_TEL_NO_3" name="P_TEL_NO_3" class="wid3 wid_marL" >
									</td>
									<th scope="row"><label><spring:message code="mobilNo"/></label></th>
									<td>
										<select id="P_MOBIL_NO_1" name="P_MOBIL_NO_1" class="wid3">
											<option value=""><spring:message code="select"/></option>
										</select>
										<input type="text" id="P_MOBIL_NO_2" name="P_MOBIL_NO_2" class="wid3 wid_marL" >
										<input type="text" id="P_MOBIL_NO_3" name="P_MOBIL_NO_3" class="wid3 wid_marL" >
										&nbsp;&nbsp;<button type="button" class="btn btn_style4" onclick="fn_moblieChk()" >중복확인</button>
									</td>
									<th scope="row"><label><spring:message code="cashReceipts"/></label></th>
									<td>
										<!-- <input type="checkbox" id="P_CASH_APP_YN" name="P_CASH_APP_YN" class="tbl_rdo" value="" /> -->
										<select id="P_CASH_APP_YN" name="P_CASH_APP_YN" style="width:65px;" >
											<option value=""><spring:message code="select"/></option>
										</select>
										<div id="P_CASH_DISPY1" style="display:none;" >
											<select id="P_CASH_MOBIL_NO_1" name="P_CASH_MOBIL_NO_1" class="wid3" disabled="disabled" >
												<option value=""><spring:message code="select"/></option>
											</select>
											<input type="text" id="P_CASH_MOBIL_NO_2" name="P_CASH_MOBIL_NO_2" class="wid3 wid_marL" disabled="disabled" >
											<input type="text" id="P_CASH_MOBIL_NO_3" name="P_CASH_MOBIL_NO_3" class="wid3 wid_marL" disabled="disabled" >
										</div>
										<div id="P_CASH_DISPY2" style="display:none;" >
											<input type="text" id="P_CASH_MOBIL_NO_4" name="P_CASH_MOBIL_NO_4" class="wid2" disabled="disabled" >
										</div>
										<div id="P_CASH_DISPY3" style="display:none;" >
											<input type="text" id="P_CASH_MOBIL_NO_5" name="P_CASH_MOBIL_NO_5" class="wid1" disabled="disabled" >
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row"><label><spring:message code="email"/></label></th>
									<td colspan="3">
										<input type="text" id="P_SEND_EMAIL_1" name="P_SEND_EMAIL_1" class="wid2">
										<label class="f_l tbl_mid">@</label>
										<input type="text" id="P_SEND_EMAIL_2" name="P_SEND_EMAIL_2" class="wid2 wid_marL" >
										<select id="P_SEND_EMAIL_3" name="P_SEND_EMAIL_3" class="wid2 wid_marL">
											<option value=""><spring:message code="directInput"/></option>
										</select>
										<div class="tbl_mid">
									 		<%-- <input type="checkbox" id="P_EMAIL_YN" name="P_EMAIL_YN" class="wid_marL" value="Y" checked="checked" /><label for="P_EMAIL_YN" class="wid_marL">세금계산서 <spring:message code="receiveEmail"/></label> --%>
											<input type="checkbox" id="P_SMS_YN" name="P_SMS_YN" style="margin-left:10px;" value="Y" checked="checked" /><label for="P_SMS_YN" class="wid_marL"><spring:message code="receiveSMS"/></label>
										 	<input type="checkbox" id="P_DM_YN" name="P_DM_YN" style="margin-left:10px;" value="Y" checked="checked" /><label for="P_DM_YN" class="wid_marL" style="margin-right:50px;">DM 수신</label>
										</div>
									</td>
									<th scope="row"><label><spring:message code="discountApplied"/></label></th>
									<td>
										<select id="P_MBR_DC_YN" name="P_MBR_DC_YN" class="wid2" >
										</select>
									</td>
								</tr>
								<tr>
									<%-- 회계코드 미사용
									<th scope="row"><label><spring:message code="accountingCode"/></label></th>
									<td><input type="text" class="wid2" id="P_ACCT_DEPT" name="P_ACCT_DEPT" ></td> --%>
									<th scope="row"><label>조회용 번호</label></th>
									<td>
										<input type="text" class="wid2" id="P_END_TEL_NO" name="P_END_TEL_NO" >
									</td>
									<th scope="row"><em>필수입력항목</em><label><spring:message code="mbrGrade"/></label></th>
									<td>
										<select id="P_MBR_GRADE" name="P_MBR_GRADE" class="wid2" >
										</select>
									</td>
									<th scope="row"><label><spring:message code="managerName"/></label></th>
									<td>
										<input type="text" class="wid2" id="P_EMP_NAME" name="P_EMP_NAME">
										<input type="hidden" id="P_EMP_NO" name="P_EMP_NO" class="search_txt">
										<button type="button" id="P_EMP_SEARCH" onclick="btn_comm_user_search('P')" class="search_btn">검색 아이콘</button>
										
										<input type="hidden" id="P_BAL_TYPE" name="P_BAL_TYPE" value="3" /><!-- 발행구분 3으로 default 셋팅 -->
									</td>
									<%-- <th scope="row"><em>필수입력항목</em><label><spring:message code="publishType"/></label></th>
									<td>
										<select id="P_BAL_TYPE" name="P_BAL_TYPE" class="wid2" >
										</select>
									</td> --%>
								</tr>
								<tr>
									<th scope="row"><em>필수입력항목</em><label><spring:message code="usePoints"/></label></th>
									<td>
										<select id="P_POINT_USE_YN" name="P_POINT_USE_YN" class="wid2" >
										</select>
									</td>
									<th scope="row"><label>외상거래유무</label></th>
									<td>
										<select id="P_CREDIT_USE_YN" name="P_CREDIT_USE_YN" class="wid2" >
										</select>
									</td>
									<th scope="row"><label><spring:message code="creditLimit"/></label></th>
									<td><input type="text" class="wid2 t_r" id="P_CREDIT_LIMIT" name="P_CREDIT_LIMIT" numberOnly placeholder="0" maxlength="12" ><label class="tbl_mid">원</label></td>
								</tr>
								<tr>
									<th scope="row"><em>필수입력항목</em><label><spring:message code="addr"/></label></th>
									<td colspan="5">
										<div class="clear">
											<input type="text" id="P_POST_NO" name="P_POST_NO" class="f_l wid2 mar_R4" readonly="readonly" tabindex="-1" onfocus="this.blur()" >
											<button type="button" class="btn btn_style3 f_l" id="P_ZIP_BUTTON" onclick="execDaumPostcode('P_POST_NO', 'P_ADDR', 'P_ADDR_DTL');"><i class="fa fa-search"></i>우편번호찾기</button>
											<input type="text" id="P_ADDR" name="P_ADDR" class="f_l" style="width:450px;"  readonly="readonly" tabindex="-1" onfocus="this.blur()" >
											<input type="text" id="P_ADDR_DTL" name="P_ADDR_DTL" class="f_l wid4 wid_marL" maxlength="25" >
										</div>
										<!-- <div class="clear mar_T4">
											<input type="text" id="P_ADDR" name="P_ADDR" class="f_l wid4" maxlength=""  readonly="readonly">
											<input type="text" id="P_ADDR_DTL" name="P_ADDR_DTL" class="f_l wid4 wid_marL" maxlength="25" >
										</div> -->
									</td>
								</tr>
								<tr>
									<th scope="row"><label><spring:message code="remark"/></label></th>
									<td colspan="5"><textarea style="height:55px;" name="P_REMARK" id="P_REMARK"></textarea></td>
								</tr>
							</tbody>
						</table>
						<h3 class="bul_arr tit_top"><spring:message code="memberPoint"/></h3>
						<table class="tbl_st2 tbl_st3">
							<tbody>
								<tr>
<%-- 									<th scope="row"><spring:message code="salPoint"/></th> --%>
<!-- 									<td class="t_c"><input type="text" id="P_SAL_AMT" name="P_SAL_AMT" class="wid2 t_r" readonly="readonly" tabindex="-1" onfocus="this.blur()" ></td> -->
<%-- 									<th scope="row"><spring:message code="minusPoint"/></th> --%>
<!-- 									<td class="t_c"><input type="text" id="P_MINUS_POINT" name="P_MINUS_POINT" class="wid2 t_r" readonly="readonly" tabindex="-1" onfocus="this.blur()" ></td> -->
									<th scope="row"><spring:message code="salUpPoint"/></th>
									<td class="t_c"><input type="text" id="P_SAL_UPOINT" name="P_SAL_UPOINT" class="wid2 t_r" readonly="readonly" tabindex="-1" onfocus="this.blur()" ></td>
								</tr>
							</tbody>
						</table>
						<div class="tit_top">
							<h3 class="bul_arr f_l"><spring:message code="membershipCard"/></h3>
							<div class="f_r">
								<button type="button" id="" class="btn btn_style4" onclick="javascript:fn_addRow();"><spring:message code="addRow"/></button>
								<button type="button" id="" class="btn btn_style4" onclick="javascript:fn_delRow();"><spring:message code="delRow"/></button>
							</div>
						</div>
						<div id="gridHolder1"></div>
					</ul>
					</form>
				</li>
				
				
				<li class="tab2">
				
					<form name="frm2" id="frm2" >
						<input type="hidden" name="B_TYPE" id="B_TYPE" value="insert" />
						<input type="hidden" name="B_CORP_CODE" id="B_CORP_CODE" value="${sessionScope.CORP_CODE }" />
						<input type="hidden" name="B_STR_CODE" id="B_STR_CODE" value="${sessionScope.STR_CODE }" />
						<input type="hidden" name="B_REG_ID" id="B_REG_ID" value="${sessionScope.ID }" />
						<input type="hidden" name="B_CARD_LIST" id="B_CARD_LIST" />
						
						<button class="tab_btn" id="tab_b" tabindex="-1" >사업자</button>
						<ul>
							<table class="tbl_st2 tbl_st3">
								<tbody>
									<tr>
										<th scope="row"><em>필수입력항목</em><label>회원명/회원번호</label></th>
										<td>
											<input type="text" class="wid1" id="B_CUST_NAME" name="B_CUST_NAME" style="width:170px;">
											<input type="text" class="wid1" id="B_CUST_NO" name="B_CUST_NO" readonly="readonly" tabindex="-1" onfocus="this.blur()" style="width:70px;text-align:center" >
										</td>
										<th scope="row"><label>상호명</label></th>
										<td>
											<input type="text" class="wid1" id="B_BUSI_NAME" name="B_BUSI_NAME">
										</td>
										<th scope="row"><em>필수입력항목</em><label><spring:message code="busiNo"/></label></th>
										<td>
											<input type="text" class="wid2" id="B_BUSI_NO" name="B_BUSI_NO" >
											&nbsp;&nbsp;<button type="button" class="btn btn_style4" onclick="fn_businoChk();" >중복확인</button>
										</td>
									</tr>
									<tr>
										<th scope="row"><label><spring:message code="ceoName"/></label></th>
										<td><input type="text" class="wid1" id="B_OWN_NAME" name="B_OWN_NAME"></td>
										<th scope="row"><label><spring:message code="business"/></label></th>
										<td><input type="text" class="wid1" id="B_UPTAE" name="B_UPTAE"></td>
										<th scope="row"><label><spring:message code="sectors"/></label></th>
										<td><input type="text" class="wid1" id="B_UPJONG" name="B_UPJONG"></td> 
									</tr>
									<tr>
										<th scope="row"><label><spring:message code="mainPhone"/></label></th>
										<td>
											<select id="B_TEL_NO_1" name="B_TEL_NO_1" class="wid3">
												<option value=""><spring:message code="select"/></option>
											</select>
										<input type="text" id="B_TEL_NO_2" name="B_TEL_NO_2" class="wid3 wid_marL" >
										<input type="text" id="B_TEL_NO_3" name="B_TEL_NO_3" class="wid3 wid_marL" >
										</td>
										<th scope="row"><label><spring:message code="mobilNo"/></label></th>
										<td>
											<select id="B_MOBIL_NO_1" name="B_MOBIL_NO_1" class="wid3">
												<option value=""><spring:message code="select"/></option>
											</select>
											<input type="text" id="B_MOBIL_NO_2" name="B_MOBIL_NO_2" class="wid3 wid_marL" >
											<input type="text" id="B_MOBIL_NO_3" name="B_MOBIL_NO_3" class="wid3 wid_marL" >
											&nbsp;&nbsp;<button type="button" class="btn btn_style4" onclick="fn_moblieChk()" >중복확인</button>
										</td>
										<th scope="row"><label><spring:message code="mobilNo"/>2</label></th>
										<td>
											<select id="B_FAX_NO_1" name="B_FAX_NO_1" class="wid3">
												<option value=""><spring:message code="select"/></option>
											</select>
											<input type="text" id="B_FAX_NO_2" name="B_FAX_NO_2" class="wid3 wid_marL" >
											<input type="text" id="B_FAX_NO_3" name="B_FAX_NO_3" class="wid3 wid_marL" >								 	
										</td>
									</tr>
									<tr>
										<th scope="row"><label>조회용 번호</label></th>
										<td>
											<input type="text" class="wid2" id="B_END_TEL_NO" name="B_END_TEL_NO" >
										</td>
										<th scope="row"><label>외상거래유무</label></th>
										<td>
											<select id="B_CREDIT_USE_YN" name="B_CREDIT_USE_YN" class="wid1" >
											</select>
										</td>
										<th scope="row"><label><spring:message code="creditLimit"/></label></th>
										<td><input type="text" class="wid2 t_r" id="B_CREDIT_LIMIT" name="B_CREDIT_LIMIT" numberOnly placeholder="0" maxlength="12" ><label class="tbl_mid">원</label></td>
									</tr>
									<tr>
										<th scope="row"><em>필수입력항목</em><label><spring:message code="industFlag"/></label></th>
										<td>
										<select id="B_INDUST_FLAG" name="B_INDUST_FLAG" class="wid2">
											<option value=""><spring:message code="select"/></option>
										</select>
										</td>
										<th scope="row"><em>필수입력항목</em><label><spring:message code="mbrGrade"/></label></th>
										<td>
											<select id="B_MBR_GRADE" name="B_MBR_GRADE" class="wid1" >
											</select>
										</td>
										<th scope="row"><label><spring:message code="cashReceipts"/></label></th>
										<td>
											<!-- <input type="radio" class="wid_marL" name="B_CASH_APP_YN" id="B_CASH_APP_YN_1" value="1" /><label for="B_CASH_APP_YN_1" class="wid_marL">휴대폰번호</label>
											<input type="radio" class="wid_marL" name="B_CASH_APP_YN" id="B_CASH_APP_YN_2" value="2" /><label for="B_CASH_APP_YN_2" class="wid_marL">사업자번호</label> -->
											<!-- <input type="checkbox" class="wid_marL" name="B_CASH_APP_YN" id="B_CASH_APP_YN" value="N" /><label for="B_CASH_APP_YN" class="wid_marL">사용유무</label> -->
											<%-- <select id="B_CASH_MOBIL_NO_1" name="B_CASH_MOBIL_NO_1" class="wid3" disabled="disabled" >
												<option value=""><spring:message code="select"/></option>
											</select>
											<input type="text" id="B_CASH_MOBIL_NO_2" name="B_CASH_MOBIL_NO_2" class="wid3 wid_marL" disabled="disabled" >
											<input type="text" id="B_CASH_MOBIL_NO_3" name="B_CASH_MOBIL_NO_3" class="wid3 wid_marL" disabled="disabled" > --%>
											<select id="B_CASH_APP_YN" name="B_CASH_APP_YN" style="width:65px;" >
												<option value=""><spring:message code="select"/></option>
											</select>&nbsp;
											<div id="B_CASH_DISPY1" style="display:none;" >
												<select id="B_CASH_MOBIL_NO_1" name="B_CASH_MOBIL_NO_1" class="wid3" disabled="disabled" >
													<option value=""><spring:message code="select"/></option>
												</select>
												<input type="text" id="B_CASH_MOBIL_NO_2" name="B_CASH_MOBIL_NO_2" class="wid3 wid_marL" disabled="disabled" >
												<input type="text" id="B_CASH_MOBIL_NO_3" name="B_CASH_MOBIL_NO_3" class="wid3 wid_marL" disabled="disabled" >
											</div>
											<div id="B_CASH_DISPY2" style="display:none;" >
												<input type="text" id="B_CASH_MOBIL_NO_4" name="B_CASH_MOBIL_NO_4" class="wid2" disabled="disabled" >
											</div>
											<div id="B_CASH_DISPY3" style="display:none;" >
												<input type="text" id="B_CASH_MOBIL_NO_5" name="B_CASH_MOBIL_NO_5" class="wid1" disabled="disabled" >
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><label><spring:message code="discountApplied"/></label></th>
										<td>
											<select id="B_MBR_DC_YN" name="B_MBR_DC_YN" class="wid2" >
											</select>
										</td>
										<th scope="row"><em>필수입력항목</em><label>주류판매여부</label></th>
										<td>
											<!-- <input type="text" class="wid2 t_r" id="B_DC_RATE" name="B_DC_RATE" maxlength="8" numberOnly > -->
											<select id="B_LIQUOR_SALE_YN" name="B_LIQUOR_SALE_YN" class="wid1" >
											</select>
										</td>
										<th scope="row"><label><spring:message code="accountingCode"/></label></th>
										<td>
											<input type="text" class="wid2" id="B_ACCT_DEPT" name="B_ACCT_DEPT" maxlength="6" readonly="readonly" tabindex="-1" onfocus="this.blur()" >
										</td>
									</tr>
									<tr>
										<th scope="row"><label><spring:message code="managerName"/></label></th>
										<td>
											<input type="text" class="wid2" id="B_EMP_NAME" name="B_EMP_NAME">
											<input type="hidden" id="B_EMP_NO" name="B_EMP_NO" class="search_txt">
											<button type="button" id="B_EMP_SEARCH" onclick="btn_comm_user_search('B')" class="search_btn">검색 아이콘</button>
										</td>
										<th scope="row"><label><spring:message code="birthDate"/></label></th>
										<td>
											<input type="text" class="datepicker" id="B_BIR_DATE" name="B_BIR_DATE">
											<input type="radio" id="B_BIR_TYPE_1" name="B_BIR_TYPE" value="1" class="wid_marL"><label for="B_BIR_TYPE_1" class="wid_marL">양력</label>
										 	<input type="radio" id="B_BIR_TYPE_2" name="B_BIR_TYPE" value="2" ><label for="B_BIR_TYPE_2" class="wid_marL">음력</label>
										</td>
										<th scope="row"><em>필수입력항목</em><label><spring:message code="usePoints"/></label></th>
										<td>
											<select id="B_POINT_USE_YN" name="B_POINT_USE_YN" class="wid2" >
											</select>
										</td>
									</tr>
									<tr>
										<th scope="row"><em>필수입력항목</em><label><spring:message code="email"/></label></th>
										<td colspan="5">
											<input type="text" id="B_SEND_EMAIL_1" name="B_SEND_EMAIL_1" class="wid2">
											<label class="f_l tbl_mid">@</label>
											<input type="text" id="B_SEND_EMAIL_2" name="B_SEND_EMAIL_2" class="wid2 wid_marL" >
											<select id="B_SEND_EMAIL_3" name="B_SEND_EMAIL_3" class="wid2 wid_marL">
												<option value=""><spring:message code="directInput"/></option>
											</select>
											<div class="tbl_mid t_r">
												<input type="checkbox" id="B_EMAIL_YN" name="B_EMAIL_YN" class="wid_marL" value="Y" checked="checked" /><label for="B_EMAIL_YN" class="wid_marL">세금계산서 <spring:message code="receiveEmail"/></label>
												<input type="checkbox" id="B_SMS_YN" name="B_SMS_YN" style="margin-left:50px;" value="Y" checked="checked" /><label for="B_SMS_YN" class="wid_marL"><spring:message code="receiveSMS"/></label>
												<input type="checkbox" id="B_DM_YN" name="B_DM_YN" style="margin-left:50px;" value="Y" checked="checked" /><label for="B_DM_YN" class="wid_marL" style="margin-right:50px;">DM 수신</label>
											</div>
										</td>
										<%-- 발행구분 미사용
										<th scope="row"><em>필수입력항목</em><label><spring:message code="publishType"/></label></th>
										<td>
											<select id="B_BAL_TYPE" name="B_BAL_TYPE" class="wid2" >
											</select>
										</td> --%>
										<input type="hidden" name="B_BAL_TYPE" id="B_BAL_TYPE" value="3" />	<!-- 발행구분 디폴트 (방문:3) -->
									</tr>
									<tr>
										<th scope="row"><em>필수입력항목</em><label><spring:message code="addr"/></label></th>
										<td colspan="5">
											<div class="clear">
												<input type="text" id="B_POST_NO" name="B_POST_NO" class="f_l wid2 mar_R4" readonly="readonly" tabindex="-1" onfocus="this.blur()" >
												<button type="button" class="btn btn_style3 f_l" id="B_ZIP_BUTTON" onclick="execDaumPostcode('B_POST_NO', 'B_ADDR', 'B_ADDR_DTL');"><i class="fa fa-search"></i>우편번호찾기</button>
												<input type="text" id="B_ADDR" name="B_ADDR" class="f_l" style="width:450px;" readonly="readonly" tabindex="-1" onfocus="this.blur()" >
												<input type="text" id="B_ADDR_DTL" name="B_ADDR_DTL" class="f_l wid4 wid_marL" maxlength="25" >
											</div>
											<!-- <div class="clear mar_T4">
												<input type="text" id="B_ADDR" name="B_ADDR" class="f_l wid4" maxlength=""  readonly="readonly">
												<input type="text" id="B_ADDR_DTL" name="B_ADDR_DTL" class="f_l wid4 wid_marL" maxlength="25" >
											</div> -->
										</td>
									</tr>
									<tr>
										<th scope="row"><label><spring:message code="remark"/></label></th>
										<td colspan="5"><textarea style="height:55px;" name="B_REMARK" id="B_REMARK"></textarea></td>
									</tr>
								</tbody>
							</table>
							<h3 class="bul_arr tit_top"><spring:message code="memberPoint"/></h3>
							<table class="tbl_st2 tbl_st3">
								<tbody>
									<tr>
<%-- 										<th scope="row"><spring:message code="salPoint"/></th> --%>
<!-- 										<td class="t_c"><input type="text" id="B_SAL_AMT" name="B_SAL_AMT" class="wid2 t_r" readonly="readonly" tabindex="-1" onfocus="this.blur()" ></td> -->
<%-- 										<th scope="row"><spring:message code="minusPoint"/></th> --%>
<!-- 										<td class="t_c"><input type="text" id="B_MINUS_POINT" name="B_MINUS_POINT" class="wid2 t_r" readonly="readonly" tabindex="-1" onfocus="this.blur()" ></td> -->
										<th scope="row"><spring:message code="salUpPoint"/></th>
										<td class="t_c"><input type="text" id="B_SAL_UPOINT" name="B_SAL_UPOINT" class="wid2 t_r" readonly="readonly" tabindex="-1" onfocus="this.blur()" ></td>
									</tr>
								</tbody>
							</table>
							<div class="tit_top">
								<h3 class="bul_arr f_l"><spring:message code="membershipCard"/></h3>
								<div class="f_r">
									<button type="button" id="" class="btn btn_style4" onclick="javascript:fn_addRow();"><spring:message code="addRow"/></button>
									<button type="button" id="" class="btn btn_style4" onclick="javascript:fn_delRow();"><spring:message code="delRow"/></button>
								</div>
							</div>
							<div id="gridHolder2"></div>				
						</ul>
					</form>
				</li>
			</ul>
			<div class="bor_B"></div>
		</div>			
		
		<!-- 본문 영역 -->
		
		
	</div>
	<!-- //Content : 본문 영역 -->
	
	
	<!-- 다음 우편번호 레이어 시작 -->
	<div id="daumZipLayer" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;">
		<img src="http://i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
	</div>
	<!-- 다음 우편번호 레이어 끝 -->
	<script src="/resources/js/daumZip.js"></script>
	
</body>
</html>