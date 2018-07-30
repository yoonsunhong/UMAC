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
<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<script type="text/javascript" src="/resources/js/page/business/callorder/businessCallOrder.js?ver=20180405_000" charset="utf-8"></script>
<!-- 공통 팝업을 쓸 때 반드시 추가해야 한다. -->
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
				<c:if test="${sessionScope.AUTH_EXCEL_DOWN eq 'Y'}">
				    <button type="button" id="btn_excel" class="btn btn_style2" onclick="btnExcelDown();"><spring:message code="btnExcelDown"/></button>
				</c:if>
				<c:if test="${sessionScope.AUTH_PRINT eq 'Y'}">
				    <button type="button" id="btn_print" class="btn btn_style2" onclick="btn_print1();"><spring:message code="print"/></button>
				</c:if>	
				<c:if test="${sessionScope.AUTH_SAVE eq 'Y'}">
				    <button type="button" id="btn_update" class="btn btn_style2" onclick="btnSaveGrid();"><spring:message code="btnSave"/></button>
				</c:if>
				<c:if test="${sessionScope.AUTH_SEARCH eq 'Y'}">
					<button type="button" id="btn_read" class="btn btn_style3" onclick="btnSearchGrid(false);"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</c:if>
			</div>
		</div>
			
		<!-- 조회폼 영역 -->
		<div id="top_search" class="search_area">
			<input type="hidden" id="P_PRINT_CORP_CODE" name="P_PRINT_CORP_CODE" />
			<input type="hidden" id="P_PRINT_ORD_DT" name="P_PRINT_ORD_DT" />
			<input type="hidden" id="P_PRINT_SLIP_NO" name="P_PRINT_SLIP_NO" />
			<input type="hidden" id="CORP_CODE" name="CORP_CODE" value="${sessionScope.CORP_CODE}" />
				
			<div class="last">
				<label for="">점포명</label>
				<select id="P_STR_CODE" name="P_STR_CODE" class=""></select>
				
				<label fol=""><em>필수입력항목</em>주문일자</label>
				<input type="text" id="ORD_DT_START" name="ORD_DT_START" class="datepicker datepicker1 wid2" /> ~
				<input type="text" id="ORD_DT_END" name="ORD_DT_END" class="datepicker datepicker2 wid2" />
				
				<label for="">주문상태</label>
				<select id="P_ORD_STAT" name="P_ORD_STAT" class=""></select>
				
				<label for=""><spring:message code="cusName"/></label>
				<input type="hidden" id="P_CUST_NO" name="P_CUST_NO" />
				<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="search_txt" />
				<button type="button" class="search_btn" onclick="btn_comm_user_search_top();">검색 아이콘</button>
				
				<div class="f_r">
					<label for=""><spring:message code="reSearch"/></label>
					<select id="SEARCH_TIME" name="SEARCH_TIME" style="width:80px" class="mar_R0" onchange="selectGo(this.value);">
						<option value="300000"  <c:if test="${param.SEARCH_TIME eq '300000'}">selected</c:if>>5<spring:message code="txtMinute"/></option>
						<option value="600000"  <c:if test="${param.SEARCH_TIME eq '600000'}">selected</c:if>>10<spring:message code="txtMinute"/></option>
						<option value="900000"  <c:if test="${param.SEARCH_TIME eq '900000'}">selected</c:if>>15<spring:message code="txtMinute"/></option>
						<option value="1200000" <c:if test="${param.SEARCH_TIME eq '1200000'}">selected</c:if>>20<spring:message code="txtMinute"/></option>
						<option value="1500000" <c:if test="${param.SEARCH_TIME eq '1500000'}">selected</c:if>>25<spring:message code="txtMinute"/></option>
						<option value="2000000" <c:if test="${param.SEARCH_TIME eq '2000000'}">selected</c:if>>30<spring:message code="txtMinute"/></option>
					</select>					
				</div>
			</div>
		</div>
		<!-- //조회폼 영역 -->

		<!--  그리드 영역 -->
		<div class="col2 sub_cnt" id="dataForm" name="dataForm">
			<div class="clear">
				<h3 class="bul_arr f_l">주문서관리</h3>
				<div class="tit_sech f_l">
					<label for=""><em>필수입력항목</em><spring:message code="ordStat"/></label>
					<select id="B_ORD_STAT" name="B_ORD_STAT">
					</select>
					<label for=""><em>필수입력항목</em><spring:message code="fishDate"/></label>
					<input type="text" class="datepicker1 datepicker" id="B_FISH_DT" name="B_FISH_DT">
				</div>				
			</div>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
				<!-- <div class="gridPaging" id="gridPageNavigationDiv"></div> -->
			</div>
		</div>
	</div>
	<!-- //Content : 본문 영역 -->
	
	<!-- 상세 팝업 영역 시작  -->
	<div id="pop_wrap1">
		<header id="pop_head" class="clear">
			<div class="f_r">
				<button type="button" id="btnDetermine" class="btn btn_style4" onclick="btnDetermine();" style="outline: none;">확정</button>
				<button type="button" id="btnSavePop" class="btn btn_style4" onclick="btnSaveCheck();">저장</button>
				<%-- <c:if test="${sessionScope.AUTH_DELETE eq   'Y'}">
					<button type="button" id="pop_btn_del" class="btn btn_style4" onclick="btn_del_detail()"><spring:message code="btnDel"/></button>
				</c:if>
				<c:if test="${sessionScope.AUTH_SAVE eq   'Y'}">
					<button type="button" class="btn btn_style4" onclick="btn_save_detail()"><spring:message code="btnSave"/></button>
				</c:if>
				 --%>
				<button type="button" class="btn btn_style4" onclick="btn_close();"><spring:message code="btnClose"/></button>
			</div>
		</header>
	 
		<form action="">
			<div id="pop_cnt">
				<div class="search_area">
					<div class="last">
						<label for="">주문번호</label>
						<input type="text" id="T_SLIP_NO" name="T_SLIP_NO" class="search_txt" disabled />
						<label for="">회원명</label>
						<input type="text" id="T_CUST_NAME" name="T_CUST_NAME" class="search_txt" disabled />
					</div>
				</div>
				<h1 class="bul_arr f_l">주문접수</h1>
				<table class="tbl_st2 tbl_st4">
					<tbody>
						<tr>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="cusName"/></label></th>
							<td>
								<input type="hidden" id="CUST_NO" name="CUST_NO" />
								<input type="hidden" id="ORD_DT" name="ORD_DT" />
								<input type="text" id="CUST_NAME" name="CUST_NAME" class="search_txt wid2" disabled />
								<!-- <button type="button" class="search_btn" onclick="btn_comm_user_search()">검색 아이콘</button> -->
							</td>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="storNm"/></label></th>
							<td>
								<select id="STR_CODE" name="STR_CODE" class="wid2" disabled /></select>
							</td>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="payType"/></label></th>
							<td>
								<select id="PAY_METH" name="PAY_METH" class="wid2"></select>
							</td>
							<th scope="row"><label><spring:message code="reserveDate"/></label></th>
							<td colspan="3">
								<input type="text" id="RESERVE_DT" name="RESERVE_DT" class="datepicker wid2" />
								<select id="RESERVE_TIME" name="RESERVE_TIME" class="wid3 wid_marL t_c">
									<option value=""><spring:message code="select"/></option>
									<option value="10:00">10:00</option>
									<option value="14:00">14:00</option>
									<option value="16:00">16:00</option>
								</select>
							</td>		
						</tr>
						<tr>
							<th scope="row"><label><spring:message code="creditLimit"/></label></th>
							<td><input type="text" class="wid2 t_r" id="CREDIT_LIMIT" name="CREDIT_LIMIT" disabled /></td>
							<th scope="row"><label><spring:message code="acctReable"/></label></th>
							<td><input type="text" class="wid2 t_r" id="ACCT_REABLE" name="ACCT_REABLE" disabled /></td>
							<th scope="row"><label><spring:message code="creditUseLimit"/></label></th>
							<td><input type="text" class="wid2 t_r" id="CREDIT_USE_LIMIT" name="CREDIT_USE_LIMIT" disabled /></td> 
							<th scope="row"><em>필수입력항목</em><label><spring:message code="receiveSMS"/></label></th>
							<td>
						 		<input type="radio" id="SMS_YN_Y" name="SMS_YN" checked="checked" /><label for="" class="wid_marL"><spring:message code="yes"/></label>
						 		<input type="radio" id="SMS_YN_N" name="SMS_YN" /><label for="" class="wid_marL"><spring:message code="no"/></label>
						 	</td>
						</tr>
						 <tr>
						 	<th scope="row"><label><spring:message code="phoneNumber"/></label></th>
						 	<td>
								<input type="text" id="TEL_NO_1" name="TEL_NO_1" class="wid5 t_c" disabled />
								<input type="text" id="TEL_NO_2" name="TEL_NO_2" class="wid5 t_c wid_marL" disabled />
								<input type="text" id="TEL_NO_3" name="TEL_NO_3" class="wid5 t_c wid_marL" disabled />								 	
						 	</td>
						 	<th scope="row"><label><spring:message code="mobilNo"/></label></th>
						 	<td>
								<input type="text" id="MOBIL_NO_1" name="MOBIL_NO_1" class="wid5 t_c" disabled />
								<input type="text" id="MOBIL_NO_2" name="MOBIL_NO_2" class="wid5 t_c wid_marL" disabled />
								<input type="text" id="MOBIL_NO_3" name="MOBIL_NO_3" class="wid5 t_c wid_marL" disabled />								 	
						 	</td>
						 	<th scope="row"><label><spring:message code="mbrGrade"/></label></th>
						 	<td><input type="text" id="MBR_GRADE" name="MBR_GRADE" class="wid2 t_c" disabled /></td>
						 	<th scope="row"><label><spring:message code="busiFlag"/></label></th>
						 	<td><input type="text" id="BUSI_FLAG_NAME" name="BUSI_FLAG_NAME" class="wid2 t_c" disabled /></td>					 	
						 </tr>
						<tr>
							<th scope="row"><label><spring:message code="addr"/></label></th>
							<td colspan="3">
								<input type="text" id="ADDR" name="ADDR" class="wid1" disabled />
								<input type="text" id="ADDR_DTL" name="ADDR_DTL" class="wid1 wid_marL" disabled />
							</td>
							<th scope="row"><em>필수입력항목</em><label><spring:message code="orderAddr"/></label></th>
							<td colspan="3">
								<input type="text" id="ORD_ADDR" name="ORD_ADDR" class="wid1" maxlength="25" />
								<input type="text" id="ORD_ADDR_DTL" name="ORD_ADDR_DTL" class="wid1 wid_marL" maxlength="25" />
								<input type="checkbox" id="ADDR_SAME_YN" name="ADDR_SAME_YN" class="tbl_rdo mar_L10">
								<label for="" class="tbl_rdo"><spring:message code="addrSame"/></label>
							</td>
						</tr>
						<tr>
							<th scope="row"><label><spring:message code="slipNo"/></label></th>
							<td><input type="text" id="SLIP_NO" name="SLIP_NO" class="wid2 t_c" disabled /></td>
							<th scope="row"><label><spring:message code="ordStat"/></label></th>
							<td>
								<input type="text" id="ORD_STAT" name="ORD_STAT" class="wid2 t_c" disabled />
								<input type="hidden" id="ORD_STAT_CD" name="ORD_STAT_CD" />
							</td>
							<th scope="row"><label><spring:message code="orderDate"/></label></th>
							<td><input type="text" id="IDATE" name="IDATE" class="wid2 t_c" disabled /></td>
							<th scope="row"><label><spring:message code="orderEmp"/></label></th>
							<td><input type="text" id="IEMP_NM" name="IEMP_NM" class="wid2 t_c" disabled /></td>						
						</tr>
						<tr>
							<th scope="row"><label><spring:message code="orderMth"/></label></th>
							<td>
								<select id="ORD_MTHD" name="ORD_MTHD" class="wid2" disabled></select>
							</td>
							<th scope="row"><label><spring:message code="remark"/></label></th>
							<td colspan="5"><input type="text" class="wid100" id="REMARK" name="REMARK"></td>
						</tr>					
					</tbody>
				</table>

				<div class="sec_grid">
					<div class="content">
						<div class="tit_top mar_B2 clear">
							<h3 class="bul_arr f_l"><spring:message code="orderProduct"/></h3>
							<div class="tbl_rdo">
								<label for=""><spring:message code="co"/></label>
								<input type="text" id="ORD_CNT" name="ORD_CNT" class="wid1 t_c" disabled />
								<label for="" class="mar_L10"><spring:message code="sm"/></label>
								<input type="text" id="ORD_TOT" name="ORD_TOT" class="wid2 t_r pad_R4 mar_R4" readonly />원
							</div>
							<div class="f_r">
								<button type="button" id="btn_create" id="btn_event" name="btn_event" class="btn btn_style4" onclick="openEventPop();"><spring:message code="eventProduct"/></button>
								<button type="button" id="btn_create" class="btn btn_style4" onclick="addRow();" /><spring:message code="addRow"/></button>
								<button type="button" id="btn_create" class="btn btn_style4" onclick="deleteRow();" /><spring:message code="delRow"/></button>
							</div>
						</div>				
						<div id="gridHolder2"></div>
					</div>
				</div>		
			</div>
		</form>
	
	</div>
<!-- 	 상세 팝업 영역 끝  -->	

</body>
</html>