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


 

<%--
	설명: 점포 별 상품  관리
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

 

<script type="text/javascript" src="/resources/js/page/product/box/productBox.js?ver=20171027_001"" charset="utf-8"></script>


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
	    		$("#BTN_AUTH_UPDATE").hide();
	    		$("#BTN_AUTH_SEARCH").hide();
	    		$("#BTN_AUTH_ADDROW").hide();
	    		$("#BTN_AUTH_DELLROW").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#BTN_AUTH_UPDATE").hide();
	    		$("#BTN_AUTH_SEARCH").hide();
	    		$("#BTN_AUTH_ADDROW").hide();
	    		$("#BTN_AUTH_DELLROW").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#BTN_AUTH_SEARCH").show();
		    	}else{
		    		$("#BTN_AUTH_SEARCH").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#BTN_AUTH_ADDROW").show();
		    	}else{
		    		$("#BTN_AUTH_ADDROW").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#BTN_AUTH_UPDATE").show();
		    	}else{
		    		$("#BTN_AUTH_UPDATE").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#BTN_AUTH_DELLROW").show();
		    	}else{
		    		$("#BTN_AUTH_DELLROW").hide();
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
			<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png">도움말</button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a">도움말 닫기</a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
			<div class="f_r"> 
		    	<button type="button" id=""  class="btn btn_style2"  onclick="btn_clear()">초기화</button>
		    	<button type="button" id="BTN_AUTH_UPDATE"  class="btn btn_style2"  onclick="btn_save()">저장</button>
				<button type="button" id="BTN_AUTH_SEARCH"  class="btn btn_style3"  onclick="btn_search()"><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 시작 -->
		<div class="search_area"    id="top_search"  name="top_search"  >
		<form id="frmSearch" name="frmSearch">
			<table>
				<tbody>
				   <tr>
						<th scope="row"><label for="">박스(스캔코드)상품명</label></th>
						<td colspan=3> 
	   						<input type="text"   id="BOX_CODE" 		name="BOX_CODE" 	    placeholder="박스상품코드"	class="search_txt"   style="text-align:center"  readonly>
	   						<input type="text"   id="BOX_SCAN_CODE" name="BOX_SCAN_CODE" 	placeholder="박스스캔코드"	 class="search_txt"   style="text-align:center"   readonly>
	   						<input type="text"   id="BOX_NAME" 		name="BOX_NAME" 	    placeholder="박스상품검색" 	class="search_txt"   onBlur="chgBoxName();"  >
	   						<button type="button" class="search_btn"   onclick="btn_product_search('02')">검색 아이콘</button>
						</td>	 				
						 		<th scope="row"><label for="">협력업체</label></th>
						<td>
							<input type="hidden" id="VEN_CODE" name="VEN_CODE"   >
							<input type="text"   id="VEN_NAME" name="VEN_NAME" class="search_txt" onBlur="chgVenName()">
							<button type="button" class="search_btn"   onclick="btn_comm_supply_search()">검색 아이콘</button>
						</td>		
					</tr> 
				 	<tr>
						<th scope="row"><label for="">낱개(스캔코드)상품명</label></th>
						<td colspan=3> 
	   						<input type="text"   id="ITM_CODE" 		name="ITM_CODE" 		  placeholder="낱개상품코드"  class="search_txt" style="text-align:center"  readonly>
	   						<input type="text"   id="ITM_SCAN_CODE" name="ITM_SCAN_CODE" 	  placeholder="낱개스캔코드"   class="search_txt" style="text-align:center"  readonly>
	   						<input type="text"   id="ITM_NAME" 		name="ITM_NAME" 		   placeholder="낱개상품검색"   class="search_txt"  onBlur="chgItmName();">
	   						<button type="button" class="search_btn"   onclick="btn_product_search('01')">검색 아이콘</button>
						</td>	 				
						 			<th scope="row"><label for="">상품분류</label></th>
						<td>
							<select id="LRG_CODE" name="LRG_CODE" class="wid2" onchange="chgCate('MID_CODE','2')">
								<option value="">선택</option>   
							</select>
							<select id="MID_CODE" name="MID_CODE" class="wid2 wid_marL" onchange="chgCate('CLS_CODE','3')">
								<option value="">선택</option>   
							</select>
							<select id="CLS_CODE" name="CLS_CODE" class="wid2 wid_marL">
								<option value="">선택</option>   
							</select>					
						</td>	 	
					</tr> 
				  
					 
				</tbody>
			</table>
		</form>
		</div>
		<!-- //조회폼 영역 끝 -->
		
		<!-- 그리드 영역 -->
		<div class="tit_top clear">
		<h3 class="bul_arr f_l">박스상품등록</h3>	 
			<div class="f_r">  
					<button type="button" id="BTN_AUTH_ADDROW" class="btn btn_style4" onclick="gridHolder1AddRow()">행추가</button>
					<button type="button" id="BTN_AUTH_DELLROW" class="btn btn_style4" onclick="gridHolder1DelRow()">행삭제</button>
			</div>	
		</div>	
		<div class="sec_grid">
			<div class="content">
				<div id="gridHolder1"></div>
			</div>
		</div>
		<!-- //그리드 영역 끝-->
	</div>
	<!-- //Content : 본문 영역 -->
</body>
 
	
 
  

<!-- 	  상품정보 리스트 팝업 영역  끝  -->

<!-- 다음 우편번호 레이어 시작 -->
<!-- <div id="daumZipLayer" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;"> -->
<!-- 	<img src="http://i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼"> -->
<!-- </div> -->
<!-- 다음 우편번호 레이어 끝 -->
 
<!-- <script src="/resources/js/daumZip.js"></script> -->
 

</html>

