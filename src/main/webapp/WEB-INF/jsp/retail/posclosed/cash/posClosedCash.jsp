<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>공통코드 관리</title>

<link type="text/css" rel="stylesheet" href="/resources/css/jquery-ui.css">
<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">

<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->
<script type="text/javascript" src="/resources/js/jquery-1.7.1.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery.ui-1.10.4.datepicker.min.js"></script>
<script src="/resources/js/style.js"></script>
<%--
	설명: POS시재등록
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-03-15    김경진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/posclosed/cash/posClosedCash.js?ver=20180409_009" charset="utf-8"></script>
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
	    		$("#btn_update").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_update").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_search").show();
		    	}else{
		    		$("#btn_search").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//저장버튼 제어 
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_update").show();
		    	}else{
		    		$("#btn_update").hide();
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
	    	
	    	//관리구분별 점포조회권한설정
			if(data[0].ORG_TYPE == "3") {
				//점포조회조건 제어.
				$("#S_STR_CODE").val(loadData.STR_CODE);
				$("#S_STR_CODE").prop("disabled", true);
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
			<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png"><spring:message code="btnHelp"/></button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a"><spring:message code="btnHelpClose"/></a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
			<span class="txt">※ 분홍색의 마감내역목록은 마감시재등록을 하지 않은 항목입니다. 마감시재등록을 하신 목록만 POS마감집계시 금액이 반영됩니다. </span>
			<div class="f_r">
				<!-- 권한에 따른 버튼 show/hide -->
				<%-- <c:if test="${sessionScope.AUTH_NEW eq   'Y'}">
					<button type="button" class="btn btn_style2" id="btn_create" ><spring:message code="btnNew"/></button>
				</c:if> --%>
			    <button type="button" class="btn btn_style2" id="btn_update" ><spring:message code="btnSave"/></button>
				<button type="button" class="btn btn_style3" id="btn_search" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<form name="frm" id="frm">
			<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" />
			<input type="hidden" name="P_REG_ID" id="P_REG_ID" value="${sessionScope.ID }" />
			<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE}" />
			<input type="hidden" name="P_TYPE" id="P_TYPE" />
			<input type="hidden" name="P_CASH_SHORT_OVER" id="P_CASH_SHORT_OVER" />	<!-- 현금과부족 -->
			<input type="hidden" name="P_STR_CODE" id="P_STR_CODE" />	
			<input type="hidden" name="P_SALE_DT" id="P_SALE_DT" />
			<input type="hidden" name="P_POS_NO" id="P_POS_NO" />	
			<input type="hidden" name="P_EMP_NO" id="P_EMP_NO" />	
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수입력항목</em><spring:message code="store"/></label>
					<select id="S_STR_CODE" name="S_STR_CODE" disabled onchange="changeTopSelectStrCode()">
						
					</select>
					
					<label for=""><em>필수입력항목</em>영업일자</label>
					<input type="text" id="S_SALE_DT" name="S_SALE_DT" class="datepicker" />
					
					<label for=""><spring:message code="pos"/></label>
					<select id="S_POS_NO" name="S_POS_NO" >
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for="">계산원</label>
					<select id="S_EMP_NO" name="S_EMP_NO" style="width:130px;">
						
					</select>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<div class="col2 sub_cnt">
				<h3 class="bul_arr">마감내역</h3> 
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1">
						</div>
					</div>
				</div>
				<div class="tit_top">
					<h3 class="bul_arr">마감시재등록</h3>
					
					<div class="search_area" id="top_search">
						<div class="last">
							<label for=""><spring:message code="store"/></label>
							<select id="T_STR_CODE" name="T_STR_CODE" disabled >
								
							</select>
							
							<label for="">영업일자</label>
							<!-- <input type="text" id="P_SALE_DT" name="P_SALE_DT" class="datepicker" /> -->
							<input type="text" id="T_SALE_DT" name="T_SALE_DT" disabled style="text-align: center;"/>
							
							<label for="" style="margin-left:22px;" ><spring:message code="pos"/></label>
							<select id="T_POS_NO" name="T_POS_NO" disabled >
								<option value="">선택</option>
							</select>
							
							<label for="">계산원</label>
							<select id="T_EMP_NO" name="T_EMP_NO" style="width:130px;" disabled>
								<option value="">선택</option>
							</select>
						</div>
					</div>
					
					<div class="clear" id="inputBox">
						<div class="tbl1">
							<table class="tbl_st2 tbl_st5 mar_T0">
								<thead>
									<th scope="row">구분</th>
									<th scope="row">건수</th>
									<th scope="row">금액</th>
								</thead>
								<tbody>
									<tr>
										<th>외상매출발생</th>
										<td id="D_CREDIT_CNT" ></td>
										<td id="D_CREDIT_AMT" ></td>
									</tr>
									<tr>
										<th>공병판매</th>
										<td id="D_SALE_BOT_CNT"></td>
										<td id="D_SALE_BOT_AMT"></td>
									</tr>
								</tbody>
							</table>	
							<table class="tbl_st2 tbl_st5 mar_T10">	
								<tbody>
									<tr>
										<th rowspan="6" scope="col" style="background-color:#f2f2f2;">POS정산</th>
										<th scope="row" style="background-color:#f2f2f2;font-weight:bold">구분</th>
										<th scope="row" style="background-color:#f2f2f2;font-weight:bold">금액</th>										
									</tr>										
									<tr>
										<th>현금매출</th>
										<td><p id="D_POS_CASH_AMT"></p></td>
									</tr>
									
									<tr>
										<th>준비금</th>
										<td><p id="D_RES_FUND_AMT"></p></td>
									</tr>
									<tr>
										<th style="color:red;">중간입금</th>
										<td><p id="D_MID_CASH_AMT" style="color:red;"></p></td>
									</tr>
									<tr>
										<td class="bac_col">소계</td>
										<td class="bac_col"><p id="D_POS_AMT"></p></td>
									</tr>		
								</tbody>
							</table>															
						</div>
						<table class="tbl_st2 tbl_st5 tbl2">
							<colgroup>
								<col style="width:60px">
							</colgroup>
							<thead>
								<th scope="row">구분</th>
								<th scope="row">권종</th>
								<th scope="row">수량</th>
								<th scope="row">금액</th>
							</thead>
							<tbody>
								<tr>
									<th scope="row" rowspan="6">수표</th>
									<td>10만원</td>
									<td class="p_r"><input type="text" id="P_CHECK_10" name="P_CHECK_10" class="wid3 t_r" onblur="fn_check_onblur(this);" /></td>
									<td><p id="D_CHECK_10"></p></td>
								</tr>
								<tr>
									<td>30만원</td>
									<td class="p_r"><input type="text" id="P_CHECK_30" name="P_CHECK_30" class="wid3 t_r" onblur="fn_check_onblur(this);" /></td>
									<td><p id="D_CHECK_30"></p></td>
								</tr>
								<tr>
									<td>50만원</td>
									<td class="p_r"><input type="text" id="P_CHECK_50" name="P_CHECK_50" class="wid3 t_r" onblur="fn_check_onblur(this);" /></td>
									<td><p id="D_CHECK_50"></p></td>
								</tr>
								<tr>
									<td>100만원</td>
									<td class="p_r"><input type="text" id="P_CHECK_100" name="P_CHECK_100" class="wid3 t_r" onblur="fn_check_onblur(this);" /></td>
									<td><p id="D_CHECK_100"></p></td>
								</tr>
								<tr>
									<td>기타</td>
									<td class="p_r"><input type="text" id="P_CHECK_QTY_ETC" name="P_CHECK_QTY_ETC" class="wid3 t_r" onblur="fn_check_onblur(this);" /></td>
									<td class="p_r">
										<input type="text" id="P_CHECK_AMT_ETC" name="P_CHECK_AMT_ETC" class="wid3 t_r" maxlength="13" style="IME-MODE:disabled;width:90%;" onKeyPress="CommonJs.numberCheck2(this);" onKeyUp="CommonJs.input_comma(this);" onblur="fn_check_onblur(this);" />
									</td>
								</tr>
								<tr>
									<td class="bac_col">소계</td>
									<td class="bac_col" ><p id="D_CHECK_CNT"></p></td>
									<td class="bac_col" ><p id="D_CHECK_AMT"></p></td>
								</tr>
								<tr>
									<th scope="row" rowspan="3">기타</th>
									<td>쿠폰</td>
									<td class="p_r"><input type="text" id="P_GIFT_QTY1" name="P_GIFT_QTY1" class="wid3 t_r" onblur="fn_gift_onblur(this);" /></td>
									<td class="p_r">
										<input type="text" id="P_GIFT_AMT1" name="P_GIFT_AMT1" class="wid3 t_r" maxlength="13" style="IME-MODE:disabled;width:90%;" onKeyPress="CommonJs.numberCheck2(this);" onKeyUp="CommonJs.input_comma(this);" onblur="fn_gift_onblur(this);" />
									</td>
								</tr>
								<tr>
									<td>기타</td>
									<td class="p_r"></td>
									<td class="p_r">
										<input type="text" id="P_GIFT_AMT_ETC" name="P_GIFT_AMT_ETC" class="wid3 t_r" maxlength="13" style="IME-MODE:disabled;width:90%;" onKeyPress="CommonJs.numberCheck2(this);" onKeyUp="CommonJs.input_comma(this);" onblur="fn_gift_onblur(this);" />
									</td>
								</tr>
								<tr>
									<td class="bac_col">소계</td>
									<td class="bac_col" ><p id="D_GIFT_CNT"></p></td>
									<td class="bac_col" ><p id="D_GIFT_AMT"></p></td>
								</tr>
							</tbody>
						</table>
						<table class="tbl_st2 tbl_st5 tbl3">
							<thead>
								<th scope="row">구분</th>
								<th scope="row">권종</th>
								<th scope="row">수량</th>
								<th scope="row">금액</th>
							</thead>
							<tbody>
								<tr>
									<th scope="row" rowspan="9">현금</th>
									<td>50,000원</td>
									<td class="p_r"><input type="text" id="P_CASH_50000" name="P_CASH_50000" class="wid3 t_r" onblur="fn_cash_onblur(this);" /></td>
									<td><p id="D_CASH_50000"></p></td>
								</tr>
								<tr>
									<td>10,000원</td>
									<td class="p_r"><input type="text" id="P_CASH_10000" name="P_CASH_10000" class="wid3 t_r" onblur="fn_cash_onblur(this);" /></td>
									<td><p id="D_CASH_10000"></p></td>
								</tr>
								<tr>
									<td>5,000원</td>
									<td class="p_r"><input type="text" id="P_CASH_5000" name="P_CASH_5000" class="wid3 t_r" onblur="fn_cash_onblur(this);" /></td>
									<td><p id="D_CASH_5000"></p></td>
								</tr>
								<tr>
									<td>1,000원</td>
									<td class="p_r"><input type="text" id="P_CASH_1000" name="P_CASH_1000" class="wid3 t_r" onblur="fn_cash_onblur(this);" /></td>
									<td><p id="D_CASH_1000"></p></td>
								</tr>
								<tr>
									<td>500원</td>
									<td class="p_r"><input type="text" id="P_CASH_500" name="P_CASH_500" class="wid3 t_r" onblur="fn_cash_onblur(this);" /></td>
									<td><p id="D_CASH_500"></p></td>
								</tr>
								<tr>
									<td>100원</td>
									<td class="p_r"><input type="text" id="P_CASH_100" name="P_CASH_100" class="wid3 t_r" onblur="fn_cash_onblur(this);" /></td>
									<td><p id="D_CASH_100"></p></td>
								</tr>
								<tr>
									<td>50원</td>
									<td class="p_r"><input type="text" id="P_CASH_50" name="P_CASH_50" class="wid3 t_r" onblur="fn_cash_onblur(this);" /></td>
									<td><p id="D_CASH_50"></p></td>
								</tr>
								<tr>
									<td>10원</td>
									<td class="p_r"><input type="text" id="P_CASH_10" name="P_CASH_10" class="wid3 t_r" onblur="fn_cash_onblur(this);" /></td>
									<td><p id="D_CASH_10"></p></td>
								</tr>
								<tr>
									<td class="bac_col">소계</td>
									<td class="bac_col"><p id="D_CASH_CNT"></p></td>
									<td class="bac_col"><p id="D_CASH_AMT"></p></td>
								</tr>
								<!-- <tr>
									<td colspan="3" style="text-align:center">현금과부족</td>
									<td class="p_r">
										<p id="P_CASH_SHORT_OVER_TXT"></p>
									</td>
								</tr> -->
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</form>
	</div>
	<!-- //Content : 본문 영역 -->

</body>
</html>