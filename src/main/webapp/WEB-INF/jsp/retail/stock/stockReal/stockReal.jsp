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
<script type="text/javascript" src="/resources/js/page/stock/stockReal/stockReal.js?ver=20180219_000" charset="utf-8"></script>
<!-- 공통 팝업 -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />	
</head>
 <script>
var USER_ID = "${sessionScope.ID}";
var STR_CODE = "${sessionScope.STR_CODE}";
var STR_NAME = "${sessionScope.STR_NAME}";
</script>
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
	    		$("#addRow").hide();
	    		$("#tab1_submit").hide();
	    		$("#tab1_search").hide();
	    		$("#btn_preview").hide();
	    		$("#excelUpload").hide();
	    		$("#downSmapleExcel").hide();
	    		$("#ExcelDownload1").hide();
	    		$("#tab1_update").hide();
	    		$("#pop1_save").hide();
	    		$("#delRow").hide();
	    		$("#pop2_search").hide();
	    		$("#excelExport").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#addRow").hide();
	    		$("#tab1_submit").hide();
	    		$("#tab1_search").hide();
	    		$("#btn_preview").hide();
	    		$("#excelUpload").hide();
	    		$("#downSmapleExcel").hide();
	    		$("#ExcelDownload1").hide();
	    		$("#tab1_update").hide();
	    		$("#pop1_save").hide();
	    		$("#delRow").hide();
	    		$("#pop2_search").hide();
	    		$("#excelExport").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#tab1_search").show();
		    		$("#btn_preview").show();
		    		$("#pop2_search").show();
		    	}else{
		    		$("#tab1_search").hide();
		    		$("#btn_preview").hide();
		    		$("#pop2_search").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#addRow").show();
		    	}else{
		    		$("#addRow").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#tab1_update").show();
		    		$("#pop1_save").show();
		    	}else{
		    		$("#pop1_save").hide();
		    		$("#tab1_update").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#delRow").show();
		    	}else{
		    		$("#delRow").hide();
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#downSmapleExcel").show();
		    		$("#ExcelDownload1").show();
		    	}else{
		    		$("#ExcelDownload1").hide();
		    		$("#downSmapleExcel").hide();
		    	}
		    	
		    	//엑셀업로드버튼 제어
		    	if(data[0].AUTH_EXCEL_UPLOAD == 'Y'){
		    		$("#excelUpload").show();
		    		$("#excelExport").show();
		    	}else{
		    		$("#excelUpload").hide();
		    		$("#excelExport").hide();
		    	}
		    	
		    	//프린트, 출력 버튼 제어
		    	if(data[0].AUTH_PRINT == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//승인 버튼 제어
		    	if(data[0].AUTH_SUBMIT == 'Y'){
		    		$("#tab1_submit").show();
		    	}else{
		    		$("#tab1_submit").hide();
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
					    <button type="button" id="btn_preview" class="btn btn_style2"  onclick="btn_preview()">미리보기</button>
					    <button type="button" id="tab1_submit" class="btn btn_style2"  onclick="tab1_submitCheck()"><spring:message code="btnSubmit"/></button>
					    <button type="button" id="tab1_update"  class="btn btn_style2"  onclick="tab1_saveCheck()"><spring:message code="btnSave"/></button>
					    <button type="button" id="tab1_search" class="btn btn_style3"  onclick="tab1_search()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
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
						<input type="hidden" id="P_INV_INSP_GB" name="P_INV_INSP_GB" >
						<label for=""><spring:message code="storeType"/></label> 
						<select id="P_MKT_GB" name="P_MKT_GB" style="width:70px;"></select>
						<label for=""><spring:message code="goodsCl"/></label> 
						<select id="P_LRG_CODE" name="P_LRG_CODE" class="wid2"></select> 																				
						<input type="hidden" id="P_TAB" name="P_TAB" class="wid2" value="1" >
					</div>
				</div>				
			</div>
			<!-- //조회폼 영역 -->
			<div class="sec_grid">
				<div class="content">
					<!-- 탭시작 -->
					<div id="tab1" class="tab clear">
						<h3 class="bul_arr"><spring:message code="dueDiligenceInventoryRegister"/></h3>
						<ul>
							<li class="tab1 on">
								<button class="tab_btn" id="" style="display:none"><spring:message code="dueDiligenceInventoryRegister"/></button>
								<ul>
									<div class="f_r" style="margin-top:-21px">
										<span class="txt">※ <spring:message code="stockRealMent2"/></span>
										<!-- 권한에 따른 버튼 show/hide -->
										<button type="button" id="downSmapleExcel" class="btn btn_style4" onclick="downSmapleExcel()"><spring:message code="btnExcelUploadSample"/></button>
										<button type="button" id="excelUpload" class="btn btn_style4" onclick="excelUpload()"><spring:message code="btnExcelUpload"/></button>
										<button type="button" id="ExcelDownload1" class="btn btn_style4" onclick="ExcelDownload1();"><spring:message code="btnExcelDown"/></button>
										<button type="button" id="addRow" class="btn btn_style4" onclick="btn_popup();"><spring:message code="addRow"/></button>
										<button type="button" id="delRow" class="btn btn_style4" onclick="btn_del();">행삭제</button>
										<%-- <button type="button" id="" class="btn btn_style4" onclick="pop1_delete();"><spring:message code="delRow"/></button> --%>
									</div>
									<form name="frmUpload" id="frmUpload" method="post" enctype="multipart/form-data"  >
									<div id="gridHolder1"></div>
										<input type="file" name="excelFile" id="excelFile" hidden="hidden"/>
										<input type="text" id="PARAM1" name="PARAM1" hidden="hidden">
										<input type="text" id="PARAM2" name="PARAM2" hidden="hidden">
										<input type="text" id="PARAM3" name="PARAM3" hidden="hidden">
										<input type="text" id="PARAM4" name="PARAM4" hidden="hidden">
										<input type="text" id="PARAM5" name="PARAM5" hidden="hidden">
										<!-- 재고조사ID별 확정여부 플래그 -->
										<input type="text" id="CFM_FLAG" name="CFM_FLAG" hidden="hidden" value="0">
									</form>
								</ul>
							</li>
							<li class="tab2">
								<button class="tab_btn" id="" style="display:none"><spring:message code="actualStockInquiry"/></button>
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
					111<button type="button" id="pop1_save" class="btn btn_style4" onclick="pop1_save()"><spring:message code="btnSave"/></button>
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
					<input type="text" id="P_POP_INV_QTY" name="P_POP_INV_QTY" class="wid3"  style="text-align: right; padding-right:5px;" maxlength="7"/>
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
						<td><input type="text" id="P_POP_SPRC" name="P_POP_SPRC" class="wid2" style="text-align:right;" disabled numberonly></td>
						<th scope="row"><spring:message code="supply"/></th>
						<td colspan="3"><input type="text" id="P_POP_VEN_NAME" name="P_POP_VEN_NAME" class="wid1" disabled></td>
					</tr>					
				</tbody>
			</table>
			<input type="hidden" id="P_POP_ITM_CODE" name="P_POP_ITM_CODE"/>
			<input type="hidden" id="P_POP_VEN_CODE" name="P_POP_VEN_CODE"/>
		</div>
		<div id="pop_wrap2">
			<header id="pop_head" class="clear">
				<div class="f_r">
					<button type="button" class="btn btn_style4" id="excelExport" onclick="excelExport()"><spring:message code="btnExcel"/></button>
					<button type="button" class="btn btn_style4" id="pop2_search" onclick="pop2_search()"><spring:message code="btnSearch"/></button>
					<button type="button" class="btn btn_style4" onclick="pop2_close()"><spring:message code="btnClose"/></button>
				</div>
			</header>
			<div class="search_area" id="POP_SEARCH" name="POP_SEARCH">
				<div class="last">
					<label for=""><spring:message code="goodsCl"/></label>
					<select id="P_POP_LRG_CODE" name="P_POP_LRG_CODE" class="wid2 wid_marR" onchange="chgCate1()">
						<option value=""><spring:message code="select"/></option>   
					</select>
					<select id="P_POP_MID_CODE" name="P_POP_MID_CODE" class="wid2 wid_marR" onchange="chgCate2()">
						<option value=""><spring:message code="select"/></option>   
					</select>
					<select id="P_POP_CLS_CODE" name="P_POP_CLS_CODE" class="wid2" onchange="chgCate3()">
						<option value=""><spring:message code="select"/></option>   
					</select>		
				</div>
			</div>
			<div id="tab1" class="tab">
				<ul>	
					<li class="tab1 on">							
						<button class="tab_btn" id="bt_tab1"><spring:message code="majorCategory"/></button>
						<ul>
							<div id="gridHolder3"></div>
						</ul>						
					</li>
					<li class="tab2">						
						<button class="tab_btn" id="bt_tab2"><spring:message code="middleCategory"/></button>
						<ul>
							<div id="gridHolder4"></div>				
						</ul>
					</li>
					<li class="tab3">						
						<button class="tab_btn" id="bt_tab3"><spring:message code="subCategory"/></button>
						<ul>
							<div id="gridHolder5"></div>				
						</ul>
					</li>						
				</ul>			
			</div>
		</div>
		<!-- 	 상세 팝업 영역 끝  -->		 
</body>
</html>
	