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

<script type="text/javascript" src="/resources/js/page/product/master/productMaster.js?ver=20180403_000" charset="utf-8"></script>
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
	    		$("#BTN_AUTH_NEW").hide();
	    		$("#BTN_AUTH_UPDATE").hide();
	    		$("#BTN_AUTH_SEARCH").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#BTN_AUTH_NEW").hide();
	    		$("#BTN_AUTH_UPDATE").hide();
	    		$("#BTN_AUTH_SEARCH").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#BTN_AUTH_SEARCH").show();
		    	}else{
		    		$("#BTN_AUTH_SEARCH").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#BTN_AUTH_NEW").show();
		    	}else{
		    		$("#BTN_AUTH_NEW").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#BTN_AUTH_UPDATE").show();
		    	}else{
		    		$("#BTN_AUTH_UPDATE").hide();
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
				<button type="button" id="BTN_AUTH_NEW"  class="btn btn_style2" onclick="btn_new('Y');">신규</button>
		    	<button type="button" id="BTN_AUTH_UPDATE"  class="btn btn_style2" onclick="btn_saveCheck();">저장</button>
				<button type="button" id="BTN_AUTH_SEARCH" class="btn btn_style3"  onclick="btn_search();"><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<div id="top_search" class="search_area">
			<form id="frmSearch" name="frmSearch">
				<div class="last">
					<label for="">상품명(코드)</label> 
					<input type="hidden" id="S_SCAN_CODE" name="S_SCAN_CODE" />
					
					<input type="text" id="S_ITM_CODE" name="S_ITM_CODE" class="wid2 search_txt" disabled /> 
					<input type="text" id="S_ITM_NAME" name="S_ITM_NAME" maxlength="50" class="search_txt" style="width:200px" />
					<button type="button" class="search_btn" onclick="btn_comm_product_search();">검색 아이콘</button>
					* 상품명, 바코드, 스캔코드를 입력하여 검색할 수 있습니다
				</div>
			</form>
		</div>
		<!-- //조회폼 영역 -->
		

		<h3 class="bul_arr">상품관리 등록</h3>
		
		<div id="product_detail">
			<table class="tbl_st2 mar_T0">
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
					<input type="hidden" id="WSAL_RATE_2" name="WSAL_RATE_2" value="0.00" />
					<input type="hidden" id="WSAL_RATE_3" name="WSAL_RATE_3" value="0.00" />
					<input type="hidden" id="WSAL_RATE_4" name="WSAL_RATE_4" value="0.00" />
					<input type="hidden" id="WSAL_RATE_5" name="WSAL_RATE_5" value="0.00" />
					<form id="frmBody" name="frmBody">
						<tr>
							<th scope="row"><em>필수입력항목</em><label>묶음상품</label></th>
							<td colspan="3">
								<table>
									<tr>
										<td>
									 		<input type="radio" id="REPT_YN" name="REPT_YN" value="NORMAL" onChange="chgReptYn()"; checked /> 일반 
											&nbsp;&nbsp;
											<input type="radio" id="REPT_YN" name="REPT_YN" value="MULTI" onChange="chgReptYn()"; > 묶음
									    </td>
										<td>
											<div id="REPT_YN_DIV" name="REPT_YN_DIV" style="display:none;"> 
										 		<input type="hidden" id="REPT_ITM_CODE" name="REPT_ITM_CODE" /> 
												<input type="hidden" id="REPT_SCAN_CODE" name="REPT_SCAN_CODE" /> 
											 	<input type="text" id="REPT_ITM_NAME" name="REPT_ITM_NAME" placeholder="대표 묶음상품 선택" maxlength="50" class="search_txt" style="width:200px;" />
											 	<button type="button" id="BTN_REPT_ITM_NAME" name="BTN_REPT_ITM_NAME" onclick="btn_comm_product_rept_search();" class="search_btn">검색 아이콘</button>
											</div>
										</td>
									</tr>
								</table>
								<!-- </div> -->
							</td>
							<th scope="row"><em>필수입력항목</em><label>상품분류</label></th>
							<td colspan="3">
								<select id="LRG_CODE" name="LRG_CODE" class="wid2" onchange="chgCate('MID_CODE','2');">
									<option value=""><spring:message code="select"/></option>
								</select>
								<select id="MID_CODE" name="MID_CODE" class="wid2 wid_marL" onchange="chgCate('CLS_CODE','3');">
									<option value=""><spring:message code="select"/></option>
								</select>
								<select id="CLS_CODE" name="CLS_CODE" class="wid2 wid_marL">
									<option value=""><spring:message code="select"/></option>   
								</select>
							</td>
							<th scope="row"><em>필수입력항목</em><label>권고발주</label></th>
							<td>
								<select id="ORD_GB" name="ORD_GB" class="wid2" onchange="chgOrdGb();">
									<option value=""><spring:message code="select"/></option>
								</select>  
							</td>
						</tr>
						<tr> 
							<th scope="row"><em>필수입력항목</em><label>관리구분</label></th>
							<td>
								<select id="ITM_STD" name="ITM_STD" class="wid2" onChange="setItmStd();">
									<option value=""><spring:message code="select"/></option>
								</select>
								<select id="NO_BARCODE" name="NO_BARCODE" class="wid2" style="width:85px;display:none;" onChange="chgNoBarcode();" title="바코드가 없는 공산품일 경우 '바코드 미존재'를 선택 하세요.">
									<option value="1">바코드 유</option>
									<option value="0">바코드 무</option> 
								</select>
								<!-- 공산품일경우에도 바코드가 없을수있으므로,  체크하면 내부코드를 스캔 코드에 넣어준다. -->
								<!-- <input  type="checkbox" id="NO_BARCODE" name ="NO_BARCODE"  />  -->
							</td>
							<th scope="row"><label>상품구분</label></th>
							<td>
								<input type="hidden" id="ITM_GB" name="ITM_GB" />
								<input type="text" id="ITM_GB_NM" name="ITM_GB_NM" readonly class="wid2" />
							</td>
							<th scope="row"><em>필수입력항목</em><label>취급여부</label></th>
							<td> 
								<select id="END_IND" name="END_IND" class="wid2" onChange="chgEndInd_add();"></select>
							</td>
							<th scope="row"><em>필수입력항목</em><label>취급일자</label></th>
							<td><input type="text" id="STR_DT" name="STR_DT" class="wid2 datepicker" /></td>
							<th scope="row"><label>종료일자</label></th>
							<td><input type="text" id="END_DT" name="END_DT" class="wid2 datepicker" /></td>
						</tr>
						<tr>
							<th scope="row"><em>필수입력항목</em><label>스캔코드</label></th> 
							<td>
								<input type="text" id="SCAN_CODE" name="SCAN_CODE" maxlength="13" class="wid2" numberOnly onBlur="productMasterScanCodeDup();" />
								<div id="FRESH_BARCODE_DIV" name="FRESH_BARCODE_DIV" style="display:none;">
									<input type="checkbox" id="FRESH_BARCODE" name="FRESH_BARCODE" onChange="chgFreshBarcode();" title="비규격임에도 불고하고 바코드가 존재하는경우 체크한다.">
									<font size="1">88바코드입력</font>
								</div>
							</td>
							<th scope="row"><em>필수입력항목</em><label>상품명</label></th>
							<td colspan="3">
								<input type="text" id="ITM_CODE" name="ITM_CODE" class="wid2" readonly />
								<input type="text" id="ITM_NAME" name="ITM_NAME" maxlength="50" class="wid4 wid_marL" style="width:225px" />
								</td>	
							<th scope="row"><em>필수입력항목</em><label>단축상품명</label></th>
							<td><input type="text" id="ITM_SHORT_NAME" name="ITM_SHORT_NAME" maxlength="20" class="wid2" /></td>															 
							<th scope="row"><em>필수입력항목</em><label>입수</label></th>
							<td><input type="text" id="IPSU_QTY" name="IPSU_QTY" class="wid2" style="text-align:right" maxlength="4" numberOnly onChange="chgIpsuQty();"></td>										
						</tr>
						<tr>
							<th scope="row"><em>필수입력항목</em><label>상품형태</label></th>
							<td>
								<select id="ITM_FORM" name="ITM_FORM" class="wid2">
									<option value=""><spring:message code="select"/></option>   
								</select>
							</td>
							<th scope="row"><em>필수입력항목</em><label>협력업체</label></th>
							<td colspan="3">
								<input type="hidden" id="GRE_GB" name="GRE_GB" />
								<input type="text" id="VEN_CODE" name="VEN_CODE" class="wid2" readonly />
								<input type="text" id="VEN_NAME" name="VEN_NAME" class="wid4 wid_marL" style="width:155px" />
								<button type="button" class="search_btn" onclick="btn_comm_supply_search();">검색 아이콘</button>
							</td>
							<th scope="row"><em>필수입력항목</em><label>배송루트</label></th>
							<td>
								<select id="ROUTE_GB" name="ROUTE_GB" class="wid2">
									<option value=""><spring:message code="select"/></option>   
								</select>
							</td>
							<th scope="row"><em>필수입력항목</em><label>유효기간</label></th>
							<td>
								<select id="VALID_DT_YN" name="VALID_DT_YN" class="wid3" onChange="chgValidDtYn();">
									<option value=""><spring:message code="select"/></option>
								</select>
								<input type="text" id="VALID_DD" name="VALID_DD" style="width:30px;text-align:right" numberOnly maxlength="3" readonly class="wid3 wid_marL"> 일
							</td>
						</tr>
						<tr>
							<th scope="row"><em>필수입력항목</em><label>과세구분</label></th>
							<td>
								<select id="TAX_GB" name="TAX_GB" class="wid2" onChange="setSurTax();">
									<option value=""><spring:message code="select"/></option>
								</select>
							</td>	
							<th scope="row"><em>필수입력항목</em><label>원가합계</label></th> 
							<td>
								<input type="text" id="BASE_WPRC_TOT" name="BASE_WPRC_TOT" class="wid2" numberOnly style="text-align:right" onBlur="setSurTax();" />
							</td>
							<th scope="row"><label>원가</label></th>
							<td><input type="text" id="BASE_WPRC" name="BASE_WPRC" class="wid2" style="text-align:right" numberOnly readonly /></td>										
							<th scope="row"><label>부가세</label></th>
							<td><input type="text" id="BASE_WVAT" name="BASE_WVAT" class="wid2" style="text-align:right" numberOnly readonly /></td>										
							<th scope="row"><em>필수입력항목</em><label>매가</label></th> 
							<td><input type="text" id="BASE_SPRC" name="BASE_SPRC" class="wid2" style="text-align:right" numberOnly maxlength="8" onBlur="setSurProfit();" /></td>										
						</tr>
						<tr> 
							<th scope="row"><em>필수입력항목</em><label>보관방법</label></th>
							<td>
								<select id="TPER_MTHD" name="TPER_MTHD" class="wid2">
									<option value=""><spring:message code="select"/></option>   
								</select>
							</td>										
							<th scope="row"><label>제조사명</label></th>
							<td><input type="text" id="MAKE_VEN_NAME" name="MAKE_VEN_NAME" maxlength="10" class="wid2" /></td>										
							<th scope="row"><label>주류용량</label></th>
							<td><input type="text"  id="IN_CAPACITY"   name="IN_CAPACITY"   class="wid2" style="text-align:right" /></td>   
							<th scope="row"><em>필수입력항목</em><label>표시단위</label></th>
							<td><input type="text" id="DP_PRC_UNIT" name="DP_PRC_UNIT" class="wid2" maxlength="10" /></td>
							<th scope="row"><em>필수입력항목</em><label>규격</label></th>
							<td><input type="text" id="UNIT" name="UNIT" class="wid2" maxlength="20" /></td>	
						</tr>			
						<tr>
							<th scope="row"><label>공병코드</label></th>
							<td>
								<select id="BOT_CODE" name="BOT_CODE" class="wid2">
									<option value=""><spring:message code="select"/></option>   
								</select>
							</td>
							<th scope="row"><label>공병단가</label></th>
							<td><input type="text" id="BOT_SPRC" name="BOT_SPRC" class="wid2" style="text-align:right" maxlength="5" numberOnly /></td>
							<th scope="row"><label>이익액</label></th>
							<td><input type="text" id="PROFIT_PRC" name="PROFIT_PRC" style="text-align:right" class="wid2" readonly /></td>						
							<th scope="row"><label>이익율(%)</label></th>
							<td><input type="text" id="PROFIT_PER" name="PROFIT_PER" style="text-align:right" class="wid2" readonly /></td>										
							<th scope="row"><label>거래구분<br>/수수료율</label></th>
							<td>
								 <input type="text" id="GRE_GB_NM" name="GRE_GB_NM" style="width:55px" readonly />
								 /
								 <input type="text" id="PRGT_RATE" name="PRGT_RATE" style="width:30px" readonly />
							</td>
						</tr>		
						<tr>
							<th scope="row"><label>원산지</label></th>
							<td colspan="9"> 
								<select id="ORG_CODE" name="ORG_CODE" class="wid2">
									<option value=""><spring:message code="select"/></option>   
								</select>
							</td>	
						</tr>
					</form>
				</tbody>
			</table>
						 
						
						
			<h3 class="bul_arr tit_top">상태관리등록</h3>
			<form id="frmStatus" name="frmStatus">
				<table class="tbl_st2 mar_T0">
					<tbody>
						<tr>
							<th scope="row">유통이력관리</th>
							<td class="t_c"><input type="checkbox" id="FTRACE_YN" name="FTRACE_YN" /></td>
							<th scope="row">수산이력</th>
							<td class="t_c"><input type="checkbox" id="STRACE_YN" name="STRACE_YN" /></td>	
							<th scope="row">축산물이력</th>
							<td class="t_c"><input type="checkbox" id="MTRACE_YN" name="MTRACE_YN" /></td>									
							<th scope="row">식자재상품</th>
							<td class="t_c"><input type="checkbox" id="INGR_YN" name="INGR_YN" /></td>									
							<th scope="row">특단가여부</th>
							<td class="t_c"><input type="checkbox" id="MBR_DC_YN" name="MBR_DC_YN"  onChange="chgMbrDcYn()"  /></td>									
							<th scope="row">포인트적립</th>
							<td class="t_c"><input type="checkbox" id="POINT_SAVE" name="POINT_SAVE"   onChange="chgPointSave()"   /></td>									
						</tr>
					</tbody>
				</table> 
			</form>
		</div>

		
		<div class="tit_top">
			<h3 class="bul_arr f_l">취급점포등록</h3>
			<div class="f_r">
			* 아래의 "점포선택" 리스트박스를 활성화 시키려면, "업태구분"의 체크를 모두 제거하십시요.
				<button type="button" id="MUL_ADD_ROW" class="btn btn_style4" onclick="gridHolder1MulAddRow();">점포 추가</button>
				<!-- <button type="button" id="SINGLE_ADD_ROW" class="btn btn_style4" onclick="gridHolder1SingleAddRow()">점포추가</button> -->
				<button type="button" id="" class="btn btn_style4" onclick="gridHolder1DelRow();">행삭제</button>
			</div>
		</div>
		<table class="tbl_st2 mar_T0">
			<colgroup>
				<col width="10%">
				<col>
				<col width="11%">
				<col>								
				<col width="11%">
				<col>								
				<col width="10%">
				<col>								
				<col width="10%">
				<col>								
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">안전재고</th>
					<td><input type="text" id="STKLM_QTY" name="STKLM_QTY" class="wid2" style="text-align:right;width:60px" numberOnly /></td>
					<th scope="row">Lead Time</th>
					<td><input type="text" id="LEAD_TIME" name="LEAD_TIME" class="wid2" style="text-align:right;width:30px" numberOnly />일</td>									
					<th scope="row">점포일괄적용</th>
					<td class="t_c"><input type="checkbox" id="SET_ALL_STORE" name="SET_ALL_STORE" onChange="setAllStore();" /></td>									
					<th scope="row">업태구분</th>
					<td>
						<label fol="FOOD_MART">식자재마트</label>
						<input type="checkbox" id="FOOD_MART" name="FOOD_MART" onChange="setStoreSelect();" />   
						<label fol="MART_AND_MART" class="mar_L10">마트앤마트</label>
						<input type="checkbox" id="MART_AND_MART" name="MART_AND_MART" onChange="setStoreSelect();" />
						<label fol="DC_CENTER" class="mar_L10">물류센터</label>
						<input type="checkbox" id="DC_CENTER" name="DC_CENTER" onChange="setStoreSelect();" />
					</td>	
					<th scope="row">점포선택</th>
					<td>
						<select id="ONE_STR_CODE" name="ONE_STR_CODE">
						    <option value="">점포선택</option>
						</select>  
					</td>									
				</tr>
			</tbody>
		</table>	
		
		
		<div id="gridHolder1"></div>	
		
		<div class="tit_top">
			<h3 class="bul_arr f_l">묶음상품</h3>
		</div>	
		<div id="gridHolder2"></div>		
				
		<div class="tit_top">
			<h3 class="bul_arr f_l">박스상품</h3>
		</div>	
		<div id="gridHolder3"></div>	

	</div>
	<!-- //Content : 본문 영역 -->

</body>
</html>