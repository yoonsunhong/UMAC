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
<title></title>
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
<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>
<script type="text/javascript" src="/resources/js/page/product/store/productStore.js?ver=20180406_000" charset="utf-8"></script>
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
	    		$("#btn_search").hide();
	    		$("#btn_excel").hide();
	    		$("#btn_clear").hide();
	    		$("#btn_save").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_excel").hide();
	    		$("#btn_clear").hide();
	    		$("#btn_save").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_search").show();
		    		$("#btn_clear").show();
		    	}else{
		    		$("#btn_search").hide();
		    		$("#btn_clear").hide();
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
		    		$("#btn_excel").show();
		    	}else{
		    		$("#btn_excel").hide();
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
				<button type="button" id="btn_excel" class="btn btn_style2" onclick="btnExcelDown();">엑셀다운</button>
		    	<button type="button" id="btn_clear" class="btn btn_style2" onclick="btn_clear();">초기화</button>
		    	<button type="button" id="btn_save" class="btn btn_style2" onclick="btn_save();">저장</button>
				<button type="button" id="btn_search" class="btn btn_style3" onclick="btn_search('Y');"><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 시작 -->
		<div id="top_search" name="top_search" class="search_area">
		<form id="frmSearch" name="frmSearch">
			<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
			<input type="hidden" name="pageUnit"  id="pageUnit"  value="25" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
			<input type="hidden" name="pageSize"  id="pageSize"  value="10" />	<!-- 페이지 리스트에 게시되는 페이지징 건수, -->
		
			<table>
				<tbody>
					<tr>
						<th scope="row"><label for="">점포</label></th>
						<td> 
							<input type="hidden" id="SESSION_ROLE_ID"  name="SESSION_ROLE_ID"  value="${sessionScope.ROLE_ID}"   > 
	   						<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE }"> 
							<select id="STR_CODE" name="STR_CODE" class="wid1">
								<option value="">전체</option>  
							</select>	 
						</td>	
						<th scope="row"><label for="">상품명</label></th>
						<td> 
						    <input type="hidden" id="SCAN_CODE" name="SCAN_CODE"   >
							<input type="hidden" id="ITM_CODE" name="ITM_CODE"   >
							<input type="text" id="ITM_NAME" name="ITM_NAME" class="search_txt" onBlur="chgItmName()">  
							<button type="button" class="search_btn"   onclick="btn_comm_store_search()">검색 아이콘</button>
						</td>						
						<th scope="row"><label for="">매입업체</label></th>
						<td>
							<input type="hidden" id="VEN_CODE" name="VEN_CODE"   >
							<input type="text"   id="VEN_NAME" name="VEN_NAME" class="search_txt" onBlur="chgVenName()">
							<button type="button" class="search_btn"   onclick="btn_comm_supply_search()">검색 아이콘</button>
						</td> 					
					</tr>
					<tr>
						<th scope="row"><label for="">관리구분</label></th>
						<td>
							<select id="ITM_STD" name="ITM_STD" class="wid1">
								<option value="">전체</option>  
							</select> 
						</td>	
						
						<th scope="row"><label for="">상품분류</label></th>
						<td>
							<select id="LRG_CODE" name="LRG_CODE" class="wid1" onchange="chgCate('MID_CODE','2')">
								<option value="">선택</option>   
							</select>
							<select id="MID_CODE" name="MID_CODE" class="wid1 wid_marL" onchange="chgCate('CLS_CODE','3')">
								<option value="">선택</option>   
							</select>
							<select id="CLS_CODE" name="CLS_CODE" class="wid1 wid_marL">
								<option value="">선택</option>   
							</select>					
						</td>	
							
											
						<th scope="row"><label for="">거래구분</label></th>
						<td>  
							<select id="GRE_GB" name="GRE_GB" class="wid1">
								<option value="">전체</option>  
							</select> 
						</td>	 				
					</tr>
					<tr>
						<th scope="row"><label for="">상품형태</label></th>
						<td>
							<select id="ITM_FORM" name="ITM_FORM" class="wid1">
								<option value="">전체</option>  
							</select>						
						</td>
					
						
						
						<th scope="row"><label for="">배송루트</label></th>
						<td>
							<select id="ROUTE_GB" name="ROUTE_GB" class="wid1">
								<option value="">전체</option>  
							</select>												
						</td>			
						<th scope="row"><label for="">취급여부</label></th>
						<td>
							<select id="END_IND" name="END_IND" class="wid3">
								<option value="">전체</option>  
							</select>						
						</td>	 					
					</tr>		
					<tr> 
						<th scope="row"><label for="">발주단위</label></th>   
						<td>
							<select id="ORD_UNIT" name="ORD_UNIT" class="wid1">
								<option value="">전체</option>  
							</select>	
						</td>
						<th scope="row"><label for="">마진율</label></th>
						<td>
							 <input type="text" id="MARGIN_PER_FROM"  name="MARGIN_PER_FROM" value="0"    numberOnly class="wid2 range1">
							~<input type="text" id="MARGIN_PER_TO"    name="MARGIN_PER_TO"   value="100"  numberOnly class="wid2 range2">
						</td>								
						<th scope="row"><label for="">포인트적립여부</label></th>   
						<td>
							<select id="POINT_SAVE" name="POINT_SAVE" class="wid1">
								<option value="">전체</option>  
							</select>	
						</td>	 		
					</tr>	
					<tr class="last"><!-- 마지막 tr에 클래스명 부여 -->
						
						<th scope="row"><label for="">취급일자</label></th>
						<td>
							   <input type="text" class="datepicker1 datepicker" id="STR_DT_FROM" name="STR_DT_FROM">
							 ~ <input type="text" class="datepicker2 datepicker" id="STR_DT_TO"   name="STR_DT_TO">
						</td>	
<!-- 						<th scope="row"><label for="">바코드</label></th> -->
<!-- 						<td> -->
<!-- 							<input type="text" id="SCAN_CODE" name="SCAN_CODE" class="search_txt">	 -->
<!-- 						</td>					 -->
						<th scope="row"><label for="">  </label></th>
						<td> 	 
						</td>
						<th scope="row"><label for="">  </label></th>
						<td> 	 
						</td>	
						<th scope="row"><label for="">  </label></th>
						<td>
							  
						</td>	
					</tr>
				</tbody>
			</table>
		</form>
		</div>
		<!-- //조회폼 영역 끝 -->
		
		<!-- 그리드 영역 -->
		<h3 class="bul_arr">상품관리등록</h3>
		<div class="sec_grid">
			<div class="content">
				<div id="gridHolder1"></div>
			</div>
			<div class="gridPaging" id="gridPageNavigationDiv"></div>
		</div>
		<!-- //그리드 영역 끝-->
	</div>
	<!-- //Content : 본문 영역 -->
</body>

<script type="text/javascript"> 

$(document).ready(function (){

	$("#show_product_pop").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 980,
	    height : 480,
	    resizable : false
// 	    , open: function (event, ui) { 
//             $('.ui-dialog').css('z-index',950);
//             $('.ui-widget-overlay').css('z-index',949);
//         },
	});
	 
});



function showProductPop(){ 
    
	 $( "#show_product_pop" ).dialog( 'open' );		   
	 gridApp6.resize();  // 이걸해줘야지 레이어 팝업에 그리드가 제대로 나타난다.
	 
} 	
</script>
  
	

<!-- 	 상품정보 리스트 팝업 영역 시작  -->
<div id="show_product_pop"  >
	<header id="pop_head" class="clear">
		<div class="f_r">  
			 <button type="button" id="btn_update"  class="btn btn_style2" onclick="btn_pop_close()" >닫기</button>
		</div>
	</header> 
	<form action="">
		<div id="pop_cnt">  
				<div class="clear">
					<h3 class="bul_arr f_l">취급 상품 리스트</h3> 
				</div>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder6"></div>
					</div>  
				</div>
		</div>
	</form>

</div>
<!-- 	  상품정보 리스트 팝업 영역  끝  -->

<!-- 다음 우편번호 레이어 시작 -->
<!-- <div id="daumZipLayer" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;"> -->
<!-- 	<img src="http://i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼"> -->
<!-- </div> -->
<!-- 다음 우편번호 레이어 끝 -->
 
<!-- <script src="/resources/js/daumZip.js"></script> -->
 

</html>

