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

  

<script type="text/javascript" src="/resources/js/page/inoutcenter/carDivision/inOutCenterCarDivision.js?ver=1.1"  charset="utf-8"></script>


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
	    		$("#btn_clear").hide();
	    		$("#btn_search").hide();
	    		$("#btn_save").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_clear").hide();
	    		$("#btn_search").hide();
	    		$("#btn_save").hide();
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
			<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png">도움말</button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a">도움말 닫기</a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
			<div class="f_r"> 
<!-- 			<button type="button" id="btn_purch_creat"      name="btn_purch_creat"      class="btn btn_style2"  onclick="btn_purch_creat()">매입데이터 생성</button> -->
		    	<button type="button" id="btn_clear"      name="btn_clear"      class="btn btn_style2"  onclick="btn_clear()">초기화</button>
<!-- 		    <button type="button" id="btn_confirm"    name="btn_confirm"    class="btn btn_style2"  onclick="btn_confirm()" >확정</button>    -->
<!-- 		    <button type="button" id="btn_report"     name="btn_report"     class="btn btn_style2"  onclick="btn_report('inOutCenterMngPrint.do')"   title="CTRL 키를 누른채 마우스로 매입전표를 클릭하시면 다중선택이 됩니다."  >출력</button> -->
		    	<button type="button" id="btn_save"       name="btn_save"       class="btn btn_style2"  onclick="btn_save()">분기저장</button> <!-- PUR_CFM_DT 업데이트 -->
				<button type="button" id="btn_search"     name="btn_search"     class="btn btn_style3"  onclick="btn_search()"><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 시작 -->
		<form id="frmSearch" name="frmSearch">
		<div class="search_area"    id="top_search"  name="top_search"  >
			<input type="hidden"       id="selectedPrintRow"  name="selectedPrintRow"/>
				<div class="last">
<!-- 					<label for=""><em>필수입력사항</em>구분</label>  -->
<!-- 						<input type="radio" id="INOUT_GB" name="INOUT_GB" value="OUT" checked>대출</radio> -->
						 
						<input type="radio" id="INOUT_GB" name="INOUT_GB" value="IN">대입</radio>
						&nbsp;&nbsp;&nbsp;
					<label for=""><em>필수입력사항</em>대입,출 점포</label> 
					 	<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE }"> 
						<input type="hidden" id="SESSION_ROLE_ID"  name="SESSION_ROLE_ID"  value="${sessionScope.ROLE_ID}"   > 
						
						<select id="STR_CODE" name="STR_CODE" class="wid2">
							<option value="">선택</option> 
						</select>	
						 
					
					<label for="">매입처</label>
						<input type="hidden" id="VEN_CODE" name="VEN_CODE" class="wid2"      >
						<input type="text"   id="VEN_NAME" name="VEN_NAME" class="search_txt"  onBlur="clearVenCode()"  >
						<button type="button" class="search_btn" onclick="btn_comm_supply_search()">검색 아이콘</button>

					
					
					<label for=""><em>필수입력사항</em>납품예정일</label>   
					  <input type="text" id="DIN_OUT_DT_FROM"  name="DIN_OUT_DT_FROM" class="datepicker1 datepicker" >
					~ <input type="text" id="DIN_OUT_DT_TO"    name="DIN_OUT_DT_TO"   class="datepicker2 datepicker" >					
					
					
<!-- 					<label for="">매입구분</label>  -->
<!-- 					<select id="PUR_GB" name="PUR_GB" class="wid2"  > -->
<!-- 							<option value="">전체</option>  -->
<!-- 					</select>		 -->
					
					<label for="">확정구분</label>
					<select id="CFM_YN" name="CFM_YN" class="wid2"  >
						  
					</select>					
				</div>
			
		</div>				
<!-- 		<table class="tbl_st2"> -->
<%-- 			<colgroup> --%>
<%-- 				<col width="12%" /> --%>
<%-- 				<col width="13%" /> --%>
<%-- 				<col width="12%" /> --%>
<%-- 				<col width="13%" /> --%>
<%-- 				<col width="12%" /> --%>
<%-- 				<col width="13%" /> --%>
<%-- 				<col width="12%" /> --%>
<%-- 				<col width="13%" /> --%>
<%-- 			</colgroup>			 --%>
<!-- 			<tbody> -->
<!-- 				<tr> -->
<!-- 					<input type="hidden" id="SLIP_NO" name="SLIP_NO"  > -->
					
<!-- 					<th scope="row"><em>필수입력항목</em>점포코드</th> -->
<!-- 					<td> -->
<!-- 						<select id="STR_CODE" name="STR_CODE" class="wid2"> -->
<!-- 							<option value="">선택</option>  -->
<!-- 						</select>	 -->
						  
<!-- 					</td> -->
<!-- 					<th scope="row"><em>필수입력항목</em>발주일자</th> -->
<!-- 					<td> -->
<!-- 						<input type="text" id="ORD_DT" name="ORD_DT" class="datepicker wid2" style="float:left;" readonly onBlur="chgOrderDay()" > -->
<!-- 					</td> -->
<!-- 					<th scope="row">입고예정일자</th> -->
<!-- 					<td> -->
<!-- 						<input type="text" id="PUR_DT" name="PUR_DT" class="wid2" readonly style="text-align:center;" > -->
<!-- 					</td> -->
<!-- 					<th scope="row">발주가능시간</th>    -->
<!-- 					<td> -->
<!-- 						<input type="text" id="MGMT_ENTRY" name="MGMT_ENTRY" class="wid2"  style="color:red;"  readonly  > -->
<!-- 					</td> -->
<!-- 				</tr> -->
<!-- 				<tr> -->
<!-- 					<th scope="row"><em>필수입력항목</em>배송구분</th> -->
<!-- 					<td> -->
<!-- 						<select id="ROUTE_GB" name="ROUTE_GB" class="wid2" onChange="chgRouteGb()"> -->
<!-- 							<option value="">선택</option>  -->
<!-- 						</select>						 -->
<!-- 					</td>   -->
<!-- 					<th scope="row"> </th> -->
<!-- 					<td> -->
						 						
<!-- 					</td> -->
<!-- 					<th scope="row"> </th> -->
<!-- 					<td>  -->
						 
<!-- 					</td> -->
<!-- 					<th scope="row"> </th> -->
<!-- 					<td>  -->
						  
<!-- 					</td> -->
<!-- 				</tr>					 -->
				 	
<!-- 			</tbody> -->
<!-- 		</table> -->
		</form>
		<!-- //조회폼 영역 끝 -->
		
		<!-- 그리드 영역 -->
		<div class="p_r clear">
			<div class="lft_wid f_l">
				<div>
					<h3 class="bul_arr">대출입전표</h3>
					<div id="gridHolder2"></div>			
				</div>
				<div>
					<div class="clear tit_top">
						<h3 class="bul_arr f_l">대출입전표상세</h3>
						<p class="txt f_r">* 원가단가: 세액포함</p>
					</div>
					<div id="gridHolder1"></div>
				</div>
			</div>
			<div class="p_a pop_btn_updown">
				 <p>전표분기</p> 
				<button type="button" class="btn btn_up btn_style4"   id="btn_right"  onClick="carDivision()"></button>
<!-- 				<button type="button" class="btn btn_down btn_style4" id="btn_left"   onClick=""></button> -->
<!-- 				<p>전표분기</p> -->
			</div>
			<div class="rgt_wid f_r">
				<div class="clear">
					<h3 class="bul_arr f_l">대출입 분기 전표</h3>
					<p class="txt f_r">* 원가단가: 세액포함</p>
				</div>
				<div id="gridHolder3" ></div>
			</div>
		</div>
<%-- 		
<!-- 		<h3 class="bul_arr">상품발주관리</h3> -->
<!-- 		<p class="t_r">* 원가단가: 세액포함</p> --> 
		<div class="clear">
			<div class="f_l tit_top">
				<div class="clear">
					<h3 class="bul_arr f_l">대출입전표</h3>
					<dlv class="f_r">
<!-- 						<button type="button" id="" name="" class="btn btn_style4" onclick="orderDel()">발주삭제</button> -->
<!-- 						<button type="button" id="" name="" class="btn btn_style4" >행삭제</button> -->
					</dlv>
				</div>
				<div id="gridHolder2"></div>
			</div>
		</div> 
		
		<div  class="clear">
			<div class="tit_top clear">
				<h3 class="bul_arr f_l">대출입전표 상세</h3>	 
				<div class="f_r">  
						 * 원가단가: 부가세포함 
 				</div>	
			</div>
			
		</div>	
<!-- 		<div class="sec_grid"> -->
<!-- 				<div class="content"> -->
					<div id="gridHolder1"></div>
<!-- 				</div> -->
<!-- 			</div>	 --> --%>
		<!-- //그리드 영역 끝-->
		
		
		
		
	</div>
	<!-- //Content : 본문 영역 -->
</body>

<script type="text/javascript"> 

$(document).ready(function (){

// 	$("#show_product_pop").dialog({
// 	    autoOpen : false,
// 	    modal : true,
// 	    width : 980,
// 	    height : 480,
// 	    resizable : false
// // 	    , open: function (event, ui) { 
// //             $('.ui-dialog').css('z-index',950);
// //             $('.ui-widget-overlay').css('z-index',949);
// //         },
// 	});
	 
});



// function showProductPop(){ 
    
// 	 $( "#show_product_pop" ).dialog( 'open' );		   
// 	 gridApp6.resize();  // 이걸해줘야지 레이어 팝업에 그리드가 제대로 나타난다.
	 
// } 	
</script>
  
	

<!-- 	 상품정보 리스트 팝업 영역 시작  -->
<!-- <div id="show_product_pop"  > -->
<!-- 	<header id="pop_head" class="clear"> -->
<!-- 		<div class="f_r">   -->
<!-- 			 <button type="button" id="btn_update"  class="btn btn_style2" onclick="btn_pop_close()" >닫기</button> -->
<!-- 		</div> -->
<!-- 	</header>  -->
<!-- 	<form action=""> -->
<!-- 		<div id="pop_cnt">   -->
<!-- 				<div class="clear"> -->
<!-- 					<h3 class="bul_arr f_l">취급 상품 리스트</h3>  -->
<!-- 				</div> -->
<!-- 				<div class="content"> -->
<!-- 					<div id="gridHolder6"></div> -->
<!-- 				</div>  -->
<!-- 		</div> -->
<!-- 	</form> -->

<!-- </div> -->
<!-- 	  상품정보 리스트 팝업 영역  끝  -->
 
 
<!-- <script src="/resources/js/daumZip.js"></script> -->
 

</html>
