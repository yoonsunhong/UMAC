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
	설명: 상품 마스터 관리
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

 

<script type="text/javascript" src="/resources/js/page/product/master/productMaster.js"" charset="utf-8"></script>


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
				<button type="button" id=""  class="btn btn_style2" onclick="">확정</button>
				<button type="button" id=""  class="btn btn_style2" onclick="btn_new()" >신규</button>
		    	<button type="button" id=""  class="btn btn_style2" onclick="btn_save()">저장</button>
				<button type="button" id="" class="btn btn_style3"  onclick="btn_search()"><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<div class="search_area"    id="top_search"  >
		<form id="frmSearch" name="frmSearch">
			<div class="last">
				<label for="">대표 상품명</label>
				<input type="text" id="GRP_ITM_NAME" name="GRP_ITM_NAME" class="wid2 search_txt" disabled > 
				&nbsp;&nbsp;&nbsp;
				<label for="">상품명(코드)</label> 
				<input type="text" id="S_ITM_CODE" name="S_ITM_CODE" class="wid2 search_txt" disabled  > 
				<input type="text" id="S_ITM_NAME" name="S_ITM_NAME" maxlength="50" class="search_txt" style="width:200px">
										
				<button type="button" class="search_btn" onclick="btn_comm_product_search()">검색 아이콘</button>
				* 상품명, 단축명, 스캔코드, 협력업체 조건으로 검색할 수 있습니다
				
			</div>
		</form>
		</div>
		<!-- //조회폼 영역 -->
		

		<h3 class="bul_arr">상품관리 등록</h3>
		<div id="tab1" class="tab">
			<ul>
				<li class="tab1 on">
<!-- 					<button class="tab_btn">상품정보</button> -->
					<ul>
					<div id="product_detail"  >
					
						<table class="tbl_st2 tbl_st3">
							<tbody>
							<form id="frmBody" name="frmBody">
								<tr>
									<th scope="row"><em>필수입력항목</em><label>대표상품명</label></th>
									<td colspan="7">
										<input type="hidden" 	id="GRP_ITM_CODE"   name="GRP_ITM_CODE"   >
										<input type="hidden" 	id="GRP_LINK_CODE"  name="GRP_LINK_CODE"  >
										<input type="text" 		id="GRP_ITM_NAME" 	name="GRP_ITM_NAME" class="wid4 wid_marL">
										<button type="button" class="search_btn" onclick="  ">검색 아이콘</button>
									</td>
								</tr>
								<tr>
									<th scope="row"><em>필수입력항목</em><label>관리구분</label></th>
									<td>
										<select id="ITM_STD" name="ITM_STD" class="wid2" onChange="setItmStd()">
											<option value="">선택</option>   
										</select>  
									</td>
									<th scope="row"><em>필수입력항목</em><label>상품구분</label></th>
									<td>
										<select id="ITM_GB" name="ITM_GB" class="wid2">
											<option value="">선택</option>   
										</select>
<!-- 										<button type="button" class="search_btn">검색 아이콘</button> -->
									</td>	
									<th scope="row"><em>필수입력항목</em><label>상품분류</label></th>
									<td colspan="3">
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
								 
								<tr>
									<th scope="row"><em>필수입력항목</em><label>상품명</label></th>
									<td colspan="3">
										<input type="text" id="ITM_CODE" name="ITM_CODE" class="wid2" readonly>
										   
										<input type="text" id="ITM_NAME" name="ITM_NAME" maxlength="50" class="wid4 wid_marL">
 
									</td>									
									<th scope="row"><em>필수입력항목</em><label>단축상품명</label></th>
									<td colspan="3"><input type="text" id="ITM_SHORT_NAME" name="ITM_SHORT_NAME" maxlength="20" class="wid4"></td>															 
								</tr>
								<tr>
									<th scope="row"><em>필수입력항목</em><label>협력업체</label></th>
									<td colspan="3">
										<!-- 수수료율 hidden  -->
										<input type="hidden"  id="GRE_GB_NM"  name="GRE_GB_NM"  >
										<input type="hidden" id="GRE_GB"      name="GRE_GB"     >
										
										<input type="hidden" id="PRGT_RATE" name="PRGT_RATE"  >
										<input type="text" id="VEN_CODE" name="VEN_CODE" class="wid2"    readonly >
										<input type="text" id="VEN_NAME" name="VEN_NAME" class="wid4 wid_marL">
										<button type="button" class="search_btn" onclick="btn_comm_supply_search()">검색 아이콘</button>
									</td>										
									<th scope="row"><em>필수입력항목</em><label>스캔코드</label></th>
									<td ><input type="text" id="SCAN_CODE" name="SCAN_CODE" maxlength="13" class="wid2" numberOnly onBlur="productMasterScanCodeDup()"></td>
									<th scope="row"><em>필수입력항목</em><label>유효기간관리유무</label></th>
									<td  >
										<select id="VALID_DT_YN" name="VALID_DT_YN" class="wid3"  onChange="chgValidDtYn()">
											<option value="">선택</option>   
										</select> 
										<input type="text" id="VALID_DD" name="VALID_DD" style="text-align:right" numberOnly  maxlength="3" readonly class="wid3 wid_marL"> 일
									</td>
							
								</tr>
								<tr>
									<th scope="row"><em>필수입력항목</em><label>과세구분</label></th>
									<td>
										<select id="TAX_GB" name="TAX_GB" class="wid2"  onChange="setSurTax()">
											<option value="">선택</option>   
										</select>  
									</td>	
									<th scope="row"><em>필수입력항목</em><label>기준원가(VAT별도)</label></th>
									<td><input type="text" id="BASE_WPRC" name="BASE_WPRC" class="wid2" style="text-align:right" numberOnly    onBlur="setSurTax()"></td>										
									<th scope="row"><label>부가세</label></th>
									<td><input type="text" id="SUR_TAX" name="SUR_TAX" class="wid2" style="text-align:right" numberOnly readonly ></td>										
									<th scope="row"><em>필수입력항목</em><label>기준매가(VAT포함)</label></th>
									<td><input type="text" id="BASE_SPRC" name="BASE_SPRC" class="wid2" style="text-align:right" numberOnly onBlur="setSurProfit()"></td>										
								</tr>   
								<tr>
									<th scope="row"><em>필수입력항목</em><label>상품형태</label></th>
									<td>
										<select id="ITM_FORM" name="ITM_FORM" class="wid2">
											<option value="">선택</option>   
										</select>
									</td>		
									<th scope="row"><em>필수입력항목</em><label>입수</label></th>
									<td><input type="text" id="IPSU_QTY" name="IPSU_QTY" class="wid2" style="text-align:right" maxlength="4" numberOnly></td>										
									<th scope="row"><em>필수입력항목</em><label>규격</label></th>
									<td>
										<select id="UNIT" name="UNIT" class="wid2">
											<option value="">선택</option>   
										</select>
									</td>										
									<th scope="row"><em>필수입력항목</em><label>표시단위</label></th>
									<td><input type="text" id="DP_PRC_UNIT" name="DP_PRC_UNIT" class="wid2" maxlength="10" ></td>										
								</tr>								
								<tr>
									<th scope="row"><em>필수입력항목</em><label>배송루트</label></th>
									<td>
										<select id="ROUTE_GB" name="ROUTE_GB" class="wid2">
											<option value="">선택</option>   
										</select>
									</td>	
									<th scope="row"><em>필수입력항목</em><label>보관방법</label></th>
									<td>
										<select id="TPER_MTHD" name="TPER_MTHD" class="wid2">
											<option value="">선택</option>   
										</select>
									</td>										
									<th scope="row"><label>제조사명</label></th>
									<td><input type="text" id="MAKE_VEN_NAME" name="MAKE_VEN_NAME" maxlength="20"  class="wid2"></td>										
									<th scope="row"><label>원산지</label></th>
									<td> 
										<select id="ORG_CODE" name="ORG_CODE" class="wid2">
											<option value="">선택</option>   
										</select>
									</td>										
								</tr>			
								<tr>
<!-- 								상품구분을 공병 으로 선택 했을 경우에 필수코드 -->
									<th scope="row"><label>공병코드</label></th>
									<td>
										<select id="BOT_CODE" name="BOT_CODE" class="wid2">
											<option value="">선택</option>   
										</select>
										
<!-- 										<input type="text" id=" " name=" " class="wid2 search_txt"> -->
<!-- 										<button type="button" class="search_btn">검색 아이콘</button> -->
									</td>
									<th scope="row"><label>공병단가</label></th>
									<td><input type="text" id="BOT_SPRC" name="BOT_SPRC" class="wid2" style="text-align:right" maxlength="5" numberOnly></td>
									<th scope="row"><em>필수입력항목</em><label>권고발주대상</label></th>
									<td>
										<select id="ORD_GB" name="ORD_GB" class="wid2">
											<option value="">선택</option>  
										</select>  
									</td>
									<th scope="row"><label>이익액</label></th> 
									<td><input type="text" id="PROFIT_PRC" name="PROFIT_PRC" style="text-align:right" class="wid2" readonly></td>						
								</tr>					
								<tr> 
									<th scope="row"><em>필수입력항목</em><label>취급일자</label></th>
									<td><input type="text" id="STR_DT" name="STR_DT" class="wid2 datepicker"></td>
									<th scope="row"><label>종료일자</label></th>
									<td><input type="text" id="END_DT" name="END_DT" class="wid2 datepicker"></td>
									<th scope="row"><em>필수입력항목</em><label>취급여부</label></th>
									<td>
										<select id="END_IND" name="END_IND" class="wid2">
											<option value="">선택</option>   
										</select>
									</td>									
									<th scope="row"><label>이익율(%)</label></th>
									<td><input type="text" id="PROFIT_PER" name="PROFIT_PER" style="text-align:right" class="wid2" readonly></td>										
								</tr>
 						</form>
 						
 						
 						<form name="frmImg" id="frmImg" method="post"   enctype="multipart/form-data"> 
								<tr> 
									<th scope="row"><label>상품이미지   <button type="button" class="addImage">추가</button></label></th>
									<td colspan = "7">
									<table>
									<tr>
									<div class="productImages">
									
										<!--   <div><input name="imageFile[]" type="file" /></div> -->
									</div>
									</tr>
									</table>
									
									</td>										
								</tr> 
						</form>		
 

<script type="text/javascript">
//name="imageFile['+imgCnt+']"
var imgCnt = 0;

$('.addImage').click(function(e) {
    if(imgCnt > 2)
    {   alert('이미지는 3개까지 추가 가능합니다.');
    	return;
    }
	e.preventDefault();
	 
    $(".productImages").append(
        '<td><input type=hidden id=imgBit name=imgBit>'
      + '<input name="imageFile" id="imageFile" type="file" accept="image/*" class="newImage" onchange="fileInfo(this,'+imgCnt+')"   /> '
      + '<a href="#" class="removeImage" border="2">삭제</a>'
      + '<div id="img_box'+imgCnt+'"></div>' 
      + '</td>'); 
    imgCnt = imgCnt + 1;
});
 
// 이미지 제거
$('.productImages').on('click', '.removeImage', function(e) {
    e.preventDefault(); 
    $(this).parent().remove();
    imgCnt = imgCnt - 1;
});

// 선택한 이미지 화면에 표출
function fileInfo(f, cnt){ 
	var file = f.files; // files 를 사용하면 파일의 정보를 알 수 있음 
	if(file[0].size > 1024 * 1024){ 
		alert('1MB 이상의 이미지는 업로드가 불가능합니다.');
		return;
	} 
	var reader = new FileReader(); // FileReader 객체 사용
	reader.onload = function(rst){ // 이미지를 선택후 로딩이 완료되면 실행될 부분
		$('#img_box'+cnt).html('<img src="' + rst.target.result + '"  style="width:100px;border:2">'); // append 메소드를 사용해서 이미지 추가
		// 이미지는 base64 문자열로 추가
		// 이 방법을 응용하면 선택한 이미지를 미리보기 할 수 있음 
	}
	reader.readAsDataURL(file[0]); // 파일을 읽는다, 배열이기 때문에 0 으로 접근
}
 
</script>








<!-- 								<input type="hidden" id="WSAL_RATE_1" name="WSAL_RATE_1" value="0.00"> -->
								<input type="hidden" id="WSAL_RATE_2" name="WSAL_RATE_2" value="0.00" >
								<input type="hidden" id="WSAL_RATE_3" name="WSAL_RATE_3" value="0.00" >
								<input type="hidden" id="WSAL_RATE_4" name="WSAL_RATE_4" value="0.00" >
								<input type="hidden" id="WSAL_RATE_5" name="WSAL_RATE_5" value="0.00" >
								
<!-- 								<tr>  -->
<!-- 									<th scope="row"><em>필수입력항목</em><label>도매할인</label></th> -->
<!-- 									<td  colspan="">     -->
<!-- 										<input type="text" id="WSAL_RATE_1" name="WSAL_RATE_1" class="wid2" style="text-align:right" numberOnly     > -->
<!-- 									</td> -->
<!-- 									<td  colspan="">     -->
<!-- 										<input type="text" id="WSAL_RATE_2" name="WSAL_RATE_2" class="wid2" style="text-align:right" numberOnly     > -->
<!-- 									</td>	 -->
<!-- 									<td  colspan="">     -->
<!-- 										<input type="text" id="WSAL_RATE_3" name="WSAL_RATE_3" class="wid2" style="text-align:right" numberOnly     > -->
<!-- 									</td>	 -->
<!-- 									<td  colspan="">     -->
<!-- 										<input type="text" id="WSAL_RATE_4" name="WSAL_RATE_4" class="wid2" style="text-align:right" numberOnly     > -->
<!-- 									</td>	 -->
<!-- 									<td  colspan="3">     -->
<!-- 										<input type="text" id="WSAL_RATE_5" name="WSAL_RATE_5" class="wid2" style="text-align:right" numberOnly     > -->
<!-- 									</td>					 -->
<!-- 								</tr> -->
								 
								
<!-- 								<tr> -->
<!-- 									<td colspan="6"> -->
<!-- 										<div class="f_r"> -->
<!-- 											<button type="button" id="" class="btn btn_style4" onclick="">이미지제공1</button> -->
<!-- 											<button type="button" id="" class="btn btn_style4" onclick="">이미지제공2</button> -->
<!-- 									    	<button type="button" id="" class="btn btn_style4" onclick="">이미지제공3</button> -->
<!-- 										</div> -->
<!-- 									</td> -->
<!-- 									<td colspan="2" class="t_c"><button type="button" id="" class="t_c btn btn_style4" onclick="">상품이미지첨부</button></td> -->
<!-- 								</tr>								 -->



							</tbody>
						</table>
						 
						
						
						<h3 class="bul_arr tit_top">상태관리등록</h3>
						<form id="frmStatus" name="frmStatus">
							<table class="tbl_st2 tbl_st3">
								<tbody>
									<tr>
										<th scope="row">영유아식품이력</th>
										<td class="t_c"><input type="checkbox" id="FTRACE_YN" name="FTRACE_YN" /></td>
										<th scope="row">수산이력</th>
										<td class="t_c"><input type="checkbox" id="STRACE_YN" name="STRACE_YN" /></td>	
										<th scope="row">축산물이력</th>
										<td class="t_c"><input type="checkbox" id="MTRACE_YN" name="MTRACE_YN" /></td>									
										<th scope="row">공산식자재</th>
										<td class="t_c"><input type="checkbox" id="INGR_YN" name="INGR_YN" /></td>									
										<th scope="row">회원할인</th>
										<td class="t_c"><input type="checkbox" id="MBR_DC_YN" name="MBR_DC_YN" /></td>									
										<th scope="row">포인트적립</th>
										<td class="t_c"><input type="checkbox" id="POINT_SAVE" name="POINT_SAVE" /></td>									
									</tr>
								</tbody>
							</table> 
						</form>
					</div>	
						
						
						
						<div class="tit_top">
							<h3 class="bul_arr f_l">취급점포등록</h3>
							<div class="f_r">
								<button type="button" id="MUL_ADD_ROW"    class="btn btn_style4" onclick="gridHolder1MulAddRow()">점포 추가</button>
<!-- 								<button type="button" id="SINGLE_ADD_ROW" class="btn btn_style4" onclick="gridHolder1SingleAddRow()">점포추가</button> -->
								<button type="button" id="" class="btn btn_style4" onclick="gridHolder1DelRow()">행삭제</button>
							</div>
						</div>
						<table class="tbl_st2 tbl_st3">
							<tbody>
								<tr>
									<th scope="row">안전재고</th>
									<td><input type="text" id="STKLM_QTY" name="STKLM_QTY" class="wid2"  numberOnly style="text-align:right;width:60px" numberOnly></td>
									<th scope="row">Lead Time</th>
									<td><input type="text" id="LEAD_TIME" name="LEAD_TIME" class="wid2"  numberOnly style="text-align:right;width:60px" numberOnly>일</td>									
									<th scope="row">점포일괄적용</th>
									<td class="t_c"  >
										<input type="checkbox" id="SET_ALL_STORE" name="SET_ALL_STORE"  onChange="setAllStore()" />
<!-- 										<select id="SET_ALL_STORE" name="SET_ALL_STORE"  onChange="setAllStore()"> -->
<!-- 											<option value="">선택</option>  -->
<!-- 											<option value="ALL">점일괄적용</option>   -->
<!-- 											<option value="1">일곡점</option>   -->
<!-- 											<option value="2">천안점</option>   -->
<!-- 										</select>   -->
									
									</td>									
									<th scope="row">업태구분</th>
									<td>
										<label fol="">식자재마트</label>
										<input type="checkbox" id="FOOD_MART" name="FOOD_MART" 			onChange="setStoreSelect()"  />   
										<label fol="" class="mar_L10">마트앤마트</label>
										<input type="checkbox" id="MART_AND_MART" name="MART_AND_MART" 	onChange="setStoreSelect()"  />
										<label fol="" class="mar_L10">물류센터</label>
										<input type="checkbox" id="DC_CENTER" name="DC_CENTER" 			onChange="setStoreSelect()"  />
									</td>	
									<th scope="row">점포선택</th>
									<td>
										<select id="ONE_STR_CODE" name="ONE_STR_CODE"   >
										    <option value="">선택</option>    
										</select>  
									</td>									
								</tr>
							</tbody>
						</table>	
						<div id="gridHolder1"></div>				
					</ul>
				</li>
<!-- 				<li class="tab2"> -->
<!-- 					<button class="tab_btn">상품조회</button> -->
<!-- 					<ul> -->
						
<!-- 					</ul> -->
<!-- 				</li> -->
<!-- 				<li class="tab3"> -->
<!-- 					<button class="tab_btn">점상품조회</button> -->
<!-- 					<ul> -->
			
<!-- 					</ul> -->
<!-- 				</li>					 -->
<!-- 				<li class="tab4"> -->
<!-- 					<button class="tab_btn">상품이력조회</button> -->
<!-- 					<ul> -->
			
<!-- 					</ul> -->
<!-- 				</li>					 -->
			</ul>
			<div class="bor_B"></div>
		</div>	
		


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

<!-- 다음 우편번호 레이어 시작 -->
<!-- <div id="daumZipLayer" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;"> -->
<!-- 	<img src="http://i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼"> -->
<!-- </div> -->
<!-- 다음 우편번호 레이어 끝 -->
 
<!-- <script src="/resources/js/daumZip.js"></script> -->
 

</html>

