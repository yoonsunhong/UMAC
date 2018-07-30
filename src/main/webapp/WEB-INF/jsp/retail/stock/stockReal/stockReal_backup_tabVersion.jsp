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
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>
<%--
	설명: 실사재고등록
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-07    문희훈       초기작성 
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
<script type="text/javascript" src="/resources/js/page/stock/stockReal/stockReal.js" charset="utf-8"></script>
<!-- 공통 팝업 -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />	
</head>
 <script>
var USER_ID = "${sessionScope.ID}";
var STR_CODE = "${sessionScope.STR_CODE}";
var STR_NAME = "${sessionScope.STR_NAME}";
</script>
 <body id="in_frame">
		<div id="iframeCnt">
			<input type="hidden" id="VALID_YN" name="VALID_YN" />
			<div class="btn_area clear">
				<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png"><spring:message code="btnHelp"/></button>
				<div class="advice p_a">
					<h4>information</h4>
					<pre id="helpText"></pre>
					<a href="" class="close_btn p_a">도움말 닫기</a>
				</div>
				<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
				<span class="txt">※ <spring:message code="stockRealMent1"/></span>
				<div class="tab_area1 f_r">
					<div>
						<!-- 권한에 따른 버튼 show/hide -->
						<%-- <c:if test="${sessionScope.AUTH_NEW eq   'Y'}">
						    <button type="button" id="tab1_new"  class="btn btn_style2"  onclick="tab1_new()"><spring:message code="btnNew"/></button>
						</c:if>
						<c:if test="${sessionScope.AUTH_DELETE eq   'Y'}">
						    <button type="button" id="tab1_delete" class="btn btn_style2"  onclick="tab1_delete()"><spring:message code="btnDel"/></button>
						</c:if> --%>
						<c:if test="${sessionScope.AUTH_SAVE eq   'Y'}">
						    <button type="button" id="tab1_update"  class="btn btn_style2"  onclick="tab1_saveCheck()"><spring:message code="btnSave"/></button>
						</c:if>
						<%-- <c:if test="${sessionScope.AUTH_EXCEL_UPLOAD eq   'Y'}">
						    <button type="button" id="tab1_excelUpload"  class="btn btn_style2"  onclick="tab1_excelUpload()"><spring:message code="btnExcelUpload"/></button>
						</c:if> --%>
						<c:if test="${sessionScope.AUTH_SEARCH eq   'Y'}">
						    <button type="button" id="tab1_search" class="btn btn_style3"  onclick="tab1_search()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
						</c:if>
					</div>
					<div style="display:none;">
						<!-- 권한에 따른 버튼 show/hide -->
						<c:if test="${sessionScope.AUTH_SUBMIT eq   'Y'}">
						    <button type="button" id="tab2_submit" class="btn btn_style2"  onclick="tab2_submitCheck()"><spring:message code="btnSubmit"/></button>
						</c:if>
						<%-- <c:if test="${sessionScope.AUTH_DELETE eq   'Y'}">
						    <button type="button" id="tab2_delete" class="btn btn_style2"  onclick="tab2_delete()"><spring:message code="btnDel"/></button>
						</c:if> --%>
						<c:if test="${sessionScope.AUTH_SAVE eq   'Y'}">
						    <button type="button" id="tab2_update"  class="btn btn_style2"  onclick="tab2_saveCheck()"><spring:message code="btnSave"/></button>
						</c:if>
						<c:if test="${sessionScope.AUTH_SEARCH eq   'Y'}">
						    <button type="button" id="tab2_search" class="btn btn_style3"  onclick="tab2_search()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
						</c:if>
					</div>					
				</div>
			</div>
			<!-- 조회폼 영역 -->
			<div class="tab_area2">
				<div class="search_area" id="top_search">
					<div class="last">
						<label for=""><em>필수입력사항</em><spring:message code="storNm"/></label> 
						<select id="P_STR_NAME" name="P_STR_NAME" style="width:initial;margin-right:0;" onchange="fnStrChange()"></select>
						<input type="text" id="P_STR_CODE" name="P_STR_CODE" class="wid2" disabled>
						<label for=""><em>필수입력사항</em><spring:message code="inventorySurveyScheduleID"/></label> 
						<select id="P_INV_INSP_SCHD_ID" name="P_INV_INSP_SCHD_ID" style="width:initial; width: 100px;" onchange="fnInspSchdIdChange()">
							<option value=""><spring:message code="select"/></option>
						</select>	
						<label for=""><em>필수입력사항</em><spring:message code="inventorySurveyScheduleDate"/></label> 					
						<input type="text" id="P_INV_INSP_DT" name="P_INV_INSP_DT" class="wid2" disabled>
						</select>
						<label for=""><spring:message code="storeType"/></label> 
						<select id="P_MKT_GB" name="P_MKT_GB" style="width:70px;"></select>
						<!-- <label for="" style="display: none;">분류코드</label> 
						<select id="P_CLS_CODE" name="P_CLS_CODE" style="width:initial; display: none;">	</select> -->																				
					</div>
				</div>				
			</div>
			<!-- //조회폼 영역 -->
			<div class="sec_grid">
				<div class="content">
					<h3 class="bul_arr"><spring:message code="dueDiligenceInventoryRegister"/></h3>
					<!-- 탭시작 -->
					<div id="tab1" class="tab clear">
						<ul>
							<li class="tab1 on">
								<button class="tab_btn" id=""><spring:message code="dueDiligenceInventoryRegister"/></button>
								<ul>
									<div class="f_r" style="margin-top:-21px">
										<span class="txt">※ <spring:message code="stockRealMent2"/></span>
										<!-- 권한에 따른 버튼 show/hide -->
										<button type="button" id="" class="btn btn_style4" onclick="downSmapleExcel()"><spring:message code="btnExcelUploadSample"/></button>
										<c:if test="${sessionScope.AUTH_EXCEL_UPLOAD eq   'Y'}">
											<button type="button" id="" class="btn btn_style4" onclick="excelUpload()"><spring:message code="btnExcelUpload"/></button>
										</c:if>
										<button type="button" id="" class="btn btn_style4" onclick="ExcelDownload1();"><spring:message code="btnExcelDown"/></button>
										<button type="button" id="" class="btn btn_style4" onclick="btn_popup();"><spring:message code="addRow"/></button>
										<%-- <button type="button" id="" class="btn btn_style4" onclick="pop1_delete();"><spring:message code="delRow"/></button> --%>
									</div>
									<form name="frmUpload" id="frmUpload" method="post" enctype="multipart/form-data"  >
									<div id="gridHolder1"></div>
										<input type="file" name="excelFile" id="excelFile" hidden="hidden"/>
										<input type="text" id="PARAM1" name="PARAM1" hidden="hidden">
										<input type="text" id="PARAM2" name="PARAM2" hidden="hidden">
										<input type="text" id="PARAM3" name="PARAM3" hidden="hidden">
										<input type="text" id="PARAM4" name="PARAM4" hidden="hidden">
										<!-- 재고조사ID별 확정여부 플래그 -->
										<input type="text" id="CFM_FLAG" name="CFM_FLAG" hidden="hidden" value="1">
									</form>
								</ul>
							</li>
							<li class="tab2">
								<button class="tab_btn" id=""><spring:message code="actualStockInquiry"/></button>
								<ul>
									<div class="f_r" style="margin-top:-21px">
										<span class="txt">※ <spring:message code="stockRealMent3"/></span>
										<!-- 권한에 따른 버튼 show/hide -->
										<button type="button" id="" class="btn btn_style4" onclick="tab2_delete();"><spring:message code="delRow"/></button> 
										<button type="button" id="" class="btn btn_style4" onclick="ExcelDownload2();"><spring:message code="btnExcelDown"/></button>
									</div>								
									<div id="gridHolder2"></div>
								</ul>
							</li>							
						</ul>
					</div>
					<!-- //탭종료 -->
				</div>
			</div>
		</div>
		<!-- //Content : 본문 영역 -->


		<!-- 	 상세 팝업 영역 시작  -->
		<div id="pop_wrap1">
			<header id="pop_head" class="clear">
				<p class="f_l" style="height:21px;line-height:21px;">※ <spring:message code="stockRealMent27"/></p>
				<div class="f_r">
					<button type="button" class="btn btn_style4" onclick="pop1_save()"><spring:message code="btnSave"/></button>
					<button type="button" class="btn btn_style4" onclick="pop1_close()"><spring:message code="btnClose"/></button>
				</div>
			</header>
			<div class="search_area" id="POP_SEARCH" name="POP_SEARCH">
				<div class="last">
					<label for=""><em>필수입력사항</em><spring:message code="storNm"/></label> 
					<select id="P_POP_STR_NAME" name="P_POP_STR_NAME" style="width:initial;margin-right:0;" onchange="fnPopStrChange()"></select>
					<input type="text" id="P_POP_STR_CODE" name="P_POP_STR_CODE" class="wid2" disabled style="width:80px;">
					<label for=""><em>필수입력사항</em><spring:message code="scanningCode"/></label>
					<input type="text" id="P_POP_SCAN_CODE" name="P_POP_SCAN_CODE" class=wid2"   maxlength="13"/>
					<label for=""><em>필수입력사항</em><spring:message code="surveyQuantity"/></label>
					<input type="text" id="P_POP_INV_QTY" name="P_POP_INV_QTY" class="wid3"  style="text-align: right; padding-right:5px; "  maxlength="7"/>
					<label for=""><em>필수입력사항</em><spring:message code="storeType"/></label>
					<select id="P_POP_MKT_GB" name="P_POP_MKT_GB" style="width:70px"></select>
					<!-- <label for=""><em>필수입력사항</em>실사일자</label> 					
					<input type="text" id="P_INV_INSP_DT" name="P_INV_INSP_DT" class="wid2" disabled> -->
				</div>
			</div>
			<table class="tbl_st2">
				<tbody>
					<tr>
						<th scope="row"><spring:message code="itmName"/></th>
						<td><input type="text" id="P_POP_ITM_NAME" name="P_POP_ITM_NAME" class="wid2" disabled></td>
						<th scope="row"><spring:message code="goodsCl"/></th>
						<td><input type="text" id="P_POP_CLS_NAME" name="P_POP_CLS_NAME" class="wid2" disabled></td>
						<th scope="row"><spring:message code="unit"/></th>
						<td><input type="text" id="P_POP_UNIT" name="P_POP_UNIT" class="wid2" disabled></td>								
					</tr>
					<tr>
						<th scope="row"><spring:message code="wprc"/></th>
						<td><input type="text" id="P_POP_SPRC" name="P_POP_SPRC" class="wid2" disabled></td>
						<th scope="row"><spring:message code="supply"/></th>
						<td colspan="3"><input type="text" id="P_POP_VEN_NAME" name="P_POP_VEN_NAME" class="wid1" disabled></td>
					</tr>					
				</tbody>
			</table>
			<input type="hidden" id="P_POP_ITM_CODE" name="P_POP_ITM_CODE"/>
			<input type="hidden" id="P_POP_VEN_CODE" name="P_POP_VEN_CODE"/>
		</div>
		<!-- 	 상세 팝업 영역 끝  -->		 
	
</body>
</html>
	
