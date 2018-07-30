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
	설명: 재고조정등록
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-04-17    문희훈       초기작성 
	------------------------------------------------------
	version : 1.0
--%> 

<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js?ver=32" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<script type="text/javascript" src="/resources/js/page/stock/stockChange/stockChange.js?ver=20180121_002" charset="utf-8"></script>
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
	    		$("#tab1_search").hide();
	    		$("#tab1_new").hide();
	    		$("#tab1_delete").hide();
	    		$("#tab1_submit").hide();
	    		$("#btn_excel_down").hide();
	    		$("#popSave").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#tab1_search").hide();
	    		$("#tab1_new").hide();
	    		$("#tab1_delete").hide();
	    		$("#tab1_submit").hide();
	    		$("#btn_excel_down").hide();
	    		$("#popSave").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#tab1_search").show();
		    	}else{
		    		$("#tab1_search").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#tab1_new").show();
		    	}else{
		    		$("#tab1_new").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#popSave").show();
		    	}else{
		    		$("#popSave").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#tab1_delete").show();
		    	}else{
		    		$("#tab1_delete").hide();
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#btn_excel_down").show();
		    	}else{
		    		$("#btn_excel_down").hide();
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
				<span class="txt">※ <spring:message code="stockChangeMent1"/></span>
				<div class="tab_area1 f_r">
					<div>
						<!-- 권한에 따른 버튼 show/hide -->
					    <button type="button" id="tab1_new"  class="btn btn_style2"  onclick="btn_popup()"><spring:message code="btnNew"/></button>
					    <button type="button" id="tab1_delete" class="btn btn_style2"  onclick="btn_delete()"><spring:message code="btnDel"/></button>
					    <button type="button" id="tab1_submit" class="btn btn_style2"  onclick="btn_submit()"><spring:message code="btnSubmit"/></button>
						<button type="button" class="btn btn_style2"  id="btn_excel_down" name="btn_excel_down" onclick="excelDownload()"><i class="fa"></i><spring:message code="btnExcelDown"/></button>
					    <button type="button" id="tab1_search" class="btn btn_style3"  onclick="btn_search()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
					</div>
				</div>
			</div>
			<!-- 조회폼 영역 -->
			<div class="tab_area2">
				<div class="search_area" id="top_search">
					<div class="last">
						<label for=""><spring:message code="adjustmentDate"/></label>
						<input type="text" class="datepicker1 datepicker" id="P_INV_SDT" name="P_INV_SDT"> ~ <input type="text" class="datepicker2 datepicker" id="P_INV_EDT" name="P_INV_EDT">
						<label for=""><em>필수입력사항</em><spring:message code="storNm"/></label> 
						<select id="P_STR_NAME" name="P_STR_NAME" style="width:initial;margin-right:0;" onchange="fnStrChange()"></select>
						<input type="text" id="P_STR_CODE" name="P_STR_CODE" class="wid2" disabled />
						<label for=""><spring:message code="goodsCl"/></label>
						<select id="P_LRG_CODE" name="P_LRG_CODE" class="wid2 wid_marR" >
							<option value=""><spring:message code="select"/></option>   
						</select>
						<label for=""><spring:message code="reasonForAdjustment"/></label>
						<select id="P_INV_GB" name="P_INV_GB" style="width:90px"></select>		
						<label for=""><spring:message code="approvalStatus"/></label> 
						<select id="P_CFM_FLAG" name="P_CFM_FLAG" style="width:70px;"></select>	
						
						<label for="">상품명(코드)</label> 
						<input type="hidden" id="S_SCAN_CODE" name="S_SCAN_CODE" /> 
						<input type="hidden" id="S_ITM_CODE" name="S_ITM_CODE" />
						<input type="text" id="S_ITM_NAME" name="S_ITM_NAME" maxlength="50" class="search_txt" style="width:200px" onBlur="clearItmCode()" />
						<button type="button" class="search_btn" onclick="btn_comm_product_search()">검색 아이콘</button>
																	
					</div>
				</div>				
			</div>
			<!-- //조회폼 영역 -->
			<div class="sec_grid">
				<div class="content">
					<!-- 탭시작 -->
					<div id="tab1" class="tab clear">
						<h3 class="bul_arr"><spring:message code="inventoryAdjustmentList"/></h3>
						<ul>
							<li class="tab1">
								<ul>
									<div id="gridHolder1"></div>
								</ul>
							</li>
						</ul>
					</div>
					<!-- //탭종료 -->
				</div>
			</div>
		</div>
		<!-- //Content : 본문 영역 -->


		<!-- 상세 팝업 영역 시작 -->
		<div id="pop_wrap1">
			<header id="pop_head" class="clear">
				<p class="f_l" style="height:21px;line-height:21px;">※ <spring:message code="stockChangeMent2"/></p>
				<div class="f_r">
					<button type="button" id="popSave" class="btn btn_style4" onclick="pop1_save()"><spring:message code="btnSave"/></button>
					<%-- <button type="button" class="btn btn_style4" onclick="pop1_search()"><spring:message code="btnSearch"/></button> --%>
					<button type="button" class="btn btn_style4" onclick="pop1_close()"><spring:message code="btnClose"/></button>
				</div>
			</header>
			<div class="search_area" id="POP_SEARCH" name="POP_SEARCH">
				<div>
					<label for=""><em>필수입력사항</em><spring:message code="adjustmentDate" /></label> 
					<input type="text" class="wid2" id="P_POP_INV_DT" name="P_POP_INV_DT" disabled="disabled" />
					<input type="hidden" class="wid2" id="P_INV_DT" name="P_INV_DT" disabled="disabled" />
					<label for=""><em>필수입력사항</em><spring:message code="storCode" /></label> 
					<select id="P_POP_STR_NAME" name="P_POP_STR_NAME" style="width:initial;margin-right:0;"></select>
					<input type="text" id="P_POP_STR_CODE" name="P_POP_STR_CODE" class="wid2" disabled style="width:80px;">
					<label for=""><em>필수입력사항</em><spring:message code="itmName"/></label>
					<input type="hidden" id="P_POP_SCAN_CODE"   name="P_POP_SCAN_CODE" /> 
					<input type="text" id="P_POP_ITM_CODE" name="P_POP_ITM_CODE" class="wid2 search_txt" disabled /> 
					<input type="text" id="P_POP_ITM_NAME" name="P_POP_ITM_NAME" maxlength="50" class="search_txt" style="width:134px" />
					<button type="button" class="search_btn" id="popItmIcon" onclick="btn_comm_product_search_pop()" tabindex="-1">검색 아이콘</button>
				</div>
				<div class="last">
					<label for=""><em>필수입력사항</em><spring:message code="reasonForAdjustment"/></label>
					<select id="P_POP_INV_GB" name="P_POP_INV_GB" class="wid2"></select>
					<label for=""><em>필수입력사항</em><spring:message code="adjustedQuantity"/></label>
					<input type="text" id="P_POP_APP_QTY" name="P_POP_APP_QTY"  style="text-align: right; padding-right:5px; width:150px;" maxlength="7" numberOnly />
					&nbsp;
					<label for="" ><spring:message code="remarks"/></label>&nbsp;&nbsp;
					<input type="text" id="P_POP_REMARK" name="P_POP_REMARK" style="width:282px;" maxlength="200" > 
				</div>
			</div>
			<table class="tbl_st2">
				<tbody>
					<tr>
						<th scope="row"><spring:message code="itmName"/></th>
						<td><input type="text" id="POP_ITM_NAME" name="POP_ITM_NAME" class="wid2" disabled style="text-align: center;"></td>
						<th scope="row"><spring:message code="scanCode"/></th>
						<td><input type="text" id="POP_SCAN_CODE" name="POP_SCAN_CODE" class="wid2" disabled style="text-align: center;"></td>
						<th scope="row"><spring:message code="standard"/></th>
						<td><input type="text" id="POP_UNIT" name="POP_UNIT" class="wid2" disabled style="text-align: center;"></td>								
					</tr>
					<tr>
						<th scope="row"><spring:message code="stockQty"/></th>
						<td><input type="text" id="POP_INV_QTY" name="POP_INV_QTY" class="wid2" disabled style="text-align: center;"></td>
						<th scope="row"><spring:message code="productSprc"/></th>
						<td><input type="text" id="POP_SPRC" name="POP_SPRC" class="wid2" disabled style="text-align: center;"></td>
						<th scope="row"><spring:message code="purSamt"/></th>
						<td><input type="text" id="POP_SPRC_AMT" name="POP_SPRC_AMT" class="wid2" disabled style="text-align: center;"></td>
					</tr>					
				</tbody>
			</table>
		</div>
		<!-- 	 상세 팝업 영역 끝  -->		 
<script>
$(document).ready(function(){
	$("#P_STR_NAME").val(SSSC);
	$("#P_STR_CODE").val(SSSC);
	//$("#P_STR_NAME").attr("disabled", 'disabled');
});
</script>
</body>
</html>
	
