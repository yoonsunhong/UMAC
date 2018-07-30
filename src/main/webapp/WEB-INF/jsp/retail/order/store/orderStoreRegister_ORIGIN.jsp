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

  

<script type="text/javascript" src="/resources/js/page/order/store/orderStoreRegister.js?ver=20170414"  charset="utf-8"></script>


<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />

</head>

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
				<button type="button" id="btn_purch_creat"      name="btn_purch_creat"      class="btn btn_style2"  onclick="btn_purch_creat()">매입데이터 생성</button>
			 
			
		    	<button type="button" id="btn_clear"   name="btn_clear"   class="btn btn_style2"  onclick="btn_clear()">신규</button>
		    	<button type="button" id="btn_save"    name="btn_save"    class="btn btn_style2"  onclick="btn_save()">저장</button>
				<button type="button" id="btn_search"  name="btn_search"  class="btn btn_style3"  onclick="btn_search()"><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 시작 -->
		<form id="frmSearch" name="frmSearch">
		<div class="search_area"    id="top_search"  name="top_search"  >
			
				<div class="last">
					<label for=""><em>필수입력사항</em>점포</label> 
					 	<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE }"> 
						<input type="hidden" id="SESSION_ROLE_ID"  name="SESSION_ROLE_ID"  value="${sessionScope.ROLE_ID}"   > 
						
						<select id="S_STR_CODE" name="S_STR_CODE" class="wid2">
							<option value="">선택</option> 
						</select>	
						
<!-- 					<input type="text" id="S_STR_CODE" name="S_STR_CODE" class="" readonly > -->
<!-- 					<input type="text" id="S_STR_NAME" name="S_STR_NAME" class="search_txt"> -->
<!-- 					<button type="button" class="search_btn" style="margin-right:0;">검색 아이콘</button> -->
					
					<label for=""><em>필수입력사항</em>발주일자</label>
					  <input type="text" id="ORD_DT_FROM"  name="ORD_DT_FROM" class="datepicker1 datepicker" >
					~ <input type="text" id="ORD_DT_TO"    name="ORD_DT_TO"   class="datepicker2 datepicker" >					
					
					<label for="">배송구분</label>
					<select id="S_ROUTE_GB" name="S_ROUTE_GB" class="wid2"  >
							<option value="">전체</option> 
					</select>					
				</div>
			
		</div>				
		<table class="tbl_st2">
			<colgroup>
				<col width="12%" />
				<col width="13%" />
				<col width="12%" />
				<col width="13%" />
				<col width="12%" />
				<col width="13%" />
				<col width="12%" />
				<col width="13%" />
			</colgroup>			
			<tbody>
				<tr>
					<input type="hidden" id="SLIP_NO" name="SLIP_NO"  >
					
					<th scope="row"><em>필수입력항목</em>점포코드</th>
					<td>
						<select id="STR_CODE" name="STR_CODE" class="wid2">
							<option value="">선택</option> 
						</select>	
						  
					</td>
					<th scope="row"><em>필수입력항목</em>발주일자</th>
					<td>
						<input type="text" id="ORD_DT" name="ORD_DT" class="datepicker wid2" style="float:left;" readonly onBlur="chgOrderDay()" >
					</td>
					<th scope="row">입고예정일자</th>
					<td>
						<input type="text" id="PUR_DT" name="PUR_DT" class="wid2" readonly style="text-align:center;" >
					</td>
					<th scope="row">발주가능시간</th>   
					<td>
						<input type="text" id="MGMT_ENTRY" name="MGMT_ENTRY" class="wid2"  style="color:red;"  readonly  >
					</td>
				</tr>
				<tr>
					<th scope="row"><em>필수입력항목</em>배송구분</th>
					<td>
						<select id="ROUTE_GB" name="ROUTE_GB" class="wid2" onChange="chgRouteGb()">
							<option value="">선택</option> 
						</select>						
					</td>
<!-- 					<th scope="row"><em>필수입력항목</em>상품구분</th> -->
<!-- 					<td> -->
<!-- 						<select id="ITM_GB" name="ITM_GB" class="wid2"> -->
<!-- 							<option value="">선택</option>  -->
<!-- 						</select>						 -->
<!-- 					</td> 				 -->

					<th scope="row"><em>필수입력항목</em>매입구분</th>
					<td>
						<select id="PUR_GB" name="PUR_GB" class="wid2"  onChange="chgPurGb()"> 
							<option value="">선택</option> 
						</select>						
					</td>
					<th scope="row">확정구분</th>
					<td> 
						<select id="CFM_YN" name="CFM_YN" class="wid2"> 
						</select>	 
					</td>
					<th scope="row"> </th>
					<td> 
						  
					</td>
				</tr>					
				 	
			</tbody>
		</table>
		</form>
		<!-- //조회폼 영역 끝 -->
		
		<!-- 그리드 영역 -->
<!-- 		<h3 class="bul_arr">상품발주관리</h3> -->
<!-- 		<p class="t_r">* 원가단가: 세액포함</p> --> 
		<div class="clear">
			<div class="f_l tit_top">
				<div class="clear">
					<h3 class="bul_arr f_l">발주목록</h3>
					<dlv class="f_r">
						<button type="button" id="" name="" class="btn btn_style4" onclick="orderDel()">발주삭제</button>
<!-- 						<button type="button" id="" name="" class="btn btn_style4" >행삭제</button> -->
					</dlv>
				</div>
				<div id="gridHolder2"><!-- 그리드2 영역, 스타일 삭제 --></div>
			</div>
			<table class="tbl_st2 f_r" style="width:312px;margin-top:32px;margin-left:10px">
				<colgroup>
					<col width="50%" />
					<col width="50%" />
				</colgroup>				
				<tbody>
					<tr>
						<th scope="row">면세원가 금액합계</th>
						<td><input type="text" id="TOT_WSPRC_TAX_FREE" name="TOT_WSPRC_TAX_FREE" class="wid100"  style="text-align:right;" readonly></td>
					</tr>
					<tr>
						<th scope="row">과세원가 금액합계</th>
						<td><input type="text" id="TOT_WSPRC_TAX_ADD" name="TOT_WSPRC_TAX_ADD" class="wid100" style="text-align:right;" readonly></td>
					</tr>						
					<tr>
						<th scope="row">부가세 금액합계</th>
						<td><input type="text" id="TOT_WVAT" name="TOT_WVAT" class="wid100" style="text-align:right;" readonly></td>
					</tr>						
					<tr>
						<th scope="row">구입 금액합계</th>
						<td><input type="text" id="TOT_PRICE" name="TOT_PRICE" class="wid100" style="text-align:right;" readonly></td>
					</tr>						
					<tr>
						<th scope="row">매가 금액합계</th>
						<td><input type="text" id="TOT_SPRC" name="TOT_SPRC" class="wid100" style="text-align:right;" readonly></td>
					</tr>						
					<tr>
						<th scope="row">공병 금액합계</th>
						<td><input type="text" id="BOT_SPRC_TOT" name="BOT_SPRC_TOT" class="wid100" style="text-align:right;" readonly></td>
					</tr>		
				</tbody>
			</table>			
		</div> 
		
		<div>
			<div class="tit_top clear">
				<h3 class="bul_arr f_l">발주상품</h3>	 
				<div class="f_r">  
						 * 원가단가: 세액포함 
						<button type="button" id="btn_add" name="btn_add" class="btn btn_style4" onclick="gridHolder1AddRow()">행추가</button>
						<button type="button" id="btn_del" name="btn_del" class="btn btn_style4" onclick="gridHolder1DelRow()">행삭제</button>
				</div>	
			</div>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
			</div>
		</div>		
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

