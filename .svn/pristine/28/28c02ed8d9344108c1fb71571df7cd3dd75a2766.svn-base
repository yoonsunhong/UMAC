<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
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
	설명: WMS - Location 재고조회
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2018-02-07    송원두 		 초기작성 
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
<script type="text/javascript" src="/resources/js/page/wms/stock/wmsStockChange/wmsStockChange.js?ver20180202_009" charset="utf-8"></script>
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
	    	//alert(data);
	    	
	    	//사용자 기능별 권한관리 데이터가 없으면 모든 버튼 숨김
	    	if(data == ""){
	    		$("#btn_save").hide();
	    		$("#btn_read").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_save").hide();
	    		$("#btn_read").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_read").show();
		    	}else{
		    		$("#btn_read").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		
		    	}else{
		    		
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
					<button type="button" id="btn_save" class="btn btn_style2"  onclick="btn_save()">저장</button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="btn_search()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			<!-- 조회폼 영역 -->
			<div class="search_area"	id="top_search">
				<div class="last">
					<!-- 점포명 -->
					<label for=""><em>필수입력사항</em><spring:message code="storNm"/></label>
					<select id="P_STR_NAME" name="P_STR_NAME" style="margin-right:0;" onchange="fnStrChange()"></select>
					<input type="text" id="P_STR_CODE" name="P_STR_CODE" class="wid2" readonly="readonly" >
					<!-- 상품명 -->
					<label for=""><spring:message code="itmName"/></label>
					<input type="text" id="P_ITM_NAME" name="P_ITM_NAME" class="search_txt"  style="width:300px;" >
					<input type="hidden" id="P_ITM_CODE" name="P_ITM_CODE" />
					<button type="button" class="search_btn" onclick="btn_comm_product_search()">검색 아이콘</button>
					<!-- 라인코드 -->
					<label for=""><spring:message code="lineCode"/></label>
					<input type="text" id="P_LINE_CODE" name="P_LINE_CODE" class="wid2">
					<!-- 차이수량 -->
					<label for=""><spring:message code="differenceQuantity"/></label>
					<input type="text" id="P_DIFF_QTY" name="P_DIFF_QTY" class="wid2" style="text-align:right;">
				</div>
			</div>
			<!-- //Content : 본문 영역 -->
			<h3 class="bul_arr">WMS 할당변경</h3>
			<div id="wmsproduct_detail"  >
				<table class="tbl_st2 mar_T0" > 
					<colgroup>
						<col width="10%" />
						<col width="16%" />
						<col width="8%" />
						<col width="10%" />
						<col width="7%" />
						<col width="11%" />  
						<col width="8%" />
						<col width="11%" />
						<col width="8%" />
						<col width="11%" /> 
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><em>필수입력항목</em><label>입고일자</label></th> 
							<td><input type="text" id="INS_PUR_DT" name="INS_PUR_DT" class="" style="text-align:center;" readonly ></td>	
							<th scope="row"><em>필수입력항목</em><label>순번</label></th>
							<td><input type="text" id="INS_SEQ" name="INS_SEQ" class="" style="text-align:center;" numberonly readonly ></td>
							<th scope="row"><label>상품코드</label></th>
							<td><input type="text" id="INS_ITM_CODE" name="INS_ITM_CODE" class="" style="text-align:center;" readonly ></td>
							<th scope="row"><em>필수입력항목</em><label>상품명</label></th>
							<td><input type="text" id="INS_ITM_NAME" name="INS_ITM_NAME" class="" style="text-align:center;" readonly ></td>	
						</tr>
						<tr>
							<th scope="row"><em>필수입력항목</em><label>LineCode</label></th> 
							<td><input type="text" id="INS_LINE_CODE" name="INS_LINE_CODE" class="" style="text-align:center;" readonly ></td>
							<th scope="row"><em>필수입력항목</em><label>입고수량</label></th> 
							<td><input type="text" id="INS_PUR_QTY" name="INS_PUR_QTY" class="" style="text-align:right;" readonly ></td>
							<th scope="row"><label>조정수량</label></th> 
							<td><input type="text" id="INS_ALLO_QTY" name="INS_ALLO_QTY" class="" style="text-align:right;" /></td>
							<th scope="row"><label>차이수량</label></th> 
							<td><input type="text" id="INS_DIFF_QTY" name="INS_DIFF_QTY" class="" style="text-align:right;" numberonly readonly ></td>
						</tr>
						<tr>
							<th scope="row"><label>변경사유</label></th> 
							<td><input type="text" id="INS_REMARK" name="INS_REMARK" class="" style="text-align:left;" onKeyUp="javascript:fnChkByte(this,'190')" ></td>
							<th scope="row"><label for="">유효기간</label></th>
							<td colspan="5"><input type="text"  id="INS_VALID_STR_DT" name="INS_VALID_STR_DT" style="width: 150px; text-align: center;" pattern="yyyy-mm-dd" readonly> ~ <input type="text" id="INS_VALID_END_DT" name="INS_VALID_END_DT" style="width: 150px; text-align: center;" pattern="yyyy-mm-dd" readonly ></td>
						</tr>
					</tbody>
				</table>
			</div>
			
			
		<div class="col2 sub_cnt" >
			<h3 class="bul_arr tit_top">WMS 입고내역</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
				</div>
		</div>
		<div class="col2 sub_cnt">
			<div class="box_lft" >
				<h3 class="bul_arr tit_top">WMS 현 재고</h3>
					<div class="content">
						<div id="gridHolder3"></div>
					</div>
			</div>
			<div class="box_rgt" style="padding-left:0;border-left:0;">
				<h3 class="bul_arr tit_top">WMS 변경내역</h3>
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder2"></div>
						</div>
					</div>
			</div>
		</div>		
		<!-- //Content : 본문 영역 -->
	</div>
</body>
</html>
