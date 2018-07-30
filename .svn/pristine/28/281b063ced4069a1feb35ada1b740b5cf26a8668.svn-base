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
<title> </title>

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
<script type="text/javascript" src="/resources/js/page/order/store/orderStoreRegister.js?ver=20180405_000" charset="utf-8"></script>
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
	    		$("#btn_purch_creat").hide();
	    		$("#btn_clear").hide();
	    		$("#btn_save").hide();
	    		$("#orderDel").hide();
	    		$("#btn_add").hide();
	    		$("#btn_del").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_purch_creat").hide();
	    		$("#btn_clear").hide();
	    		$("#btn_save").hide();
	    		$("#orderDel").hide();
	    		$("#btn_add").hide();
	    		$("#btn_del").hide();
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
		    		$("#btn_add").show();
		    	}else{
		    		$("#btn_clear").hide();
		    		$("#btn_add").hide();
		    	}
		    	
		    	//저장버튼 제어 
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_save").show();
		    	}else{
		    		$("#btn_save").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#orderDel").show();
		    		$("#btn_del").show();
		    	}else{
		    		$("#orderDel").hide();
		    		$("#btn_del").hide();
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
		    		$("#btn_purch_creat").show();
		    	}else{
		    		$("#btn_purch_creat").hide();
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
			<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png">도움말</button>
			<div class="advice p_a">
				<h4>information</h4>
				<pre id="helpText"></pre>
				<a href="" class="close_btn p_a">도움말 닫기</a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
			<div class="f_r">
				<button type="button" id="btn_purch_creat" name="btn_purch_creat" class="btn btn_style2" onclick="btn_purch_creat();">발주 생성</button>
		    	<button type="button" id="btn_clear" name="btn_clear" class="btn btn_style2" onclick="btn_clear();">신규</button>
		    	<button type="button" id="btn_save" name="btn_save" class="btn btn_style2" onclick="btn_save();">저장</button>
				<button type="button" id="btn_search" name="btn_search" class="btn btn_style3" onclick="btn_search();"><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 시작 -->
		<form id="frmSearch" name="frmSearch">
			<div class="search_area" id="top_search" name="top_search">
				<div class="last">
					<label for=""><em>필수입력사항</em>점포</label>
				 	<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE }" />
					<input type="hidden" id="SESSION_ROLE_ID"  name="SESSION_ROLE_ID"  value="${sessionScope.ROLE_ID}" /> 
					
					<select id="S_STR_CODE" name="S_STR_CODE" class="wid2">
						<option value=""><spring:message code="select"/></option> 
					</select>
						 
					<label for=""><em>필수입력사항</em>발주일자</label>
					<input type="text" id="ORD_DT_FROM" name="ORD_DT_FROM" class="datepicker1 datepicker" />
					~ <input type="text" id="ORD_DT_TO" name="ORD_DT_TO" class="datepicker2 datepicker" />
					
					<label for="">배송구분</label>
					<select id="S_ROUTE_GB" name="S_ROUTE_GB" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>	
					
					<label for="">확정구분</label>
					<select id="S_CFM_YN" name="S_CFM_YN" class="wid2">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for="">매입구분</label>
					<select id="S_PUR_GB" name="S_PUR_GB" class="wid2">
						<option value=""><spring:message code="all"/></option> 
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
						<input type="hidden" id="SLIP_NO" name="SLIP_NO" /> 
						<input type="hidden" id="CENTA_CODE" name="CENTA_CODE" />
						
						<th scope="row"><em>필수입력항목</em>점포코드</th>
						<td>
							<select id="STR_CODE" name="STR_CODE" class="wid2" onChange="chgStrCode();">
								<option value=""><spring:message code="select"/></option> 
							</select>	 
						</td>
						<th scope="row"><em>필수입력항목</em>발주일자</th> 
						<td>
							<input type="text" id="ORD_DT" name="ORD_DT" class="datepicker wid2" style="float:left;" readonly />
						</td>

						<th scope="row"><em>필수입력항목</em>배송구분</th>
						<td>
							<!-- 물류센터의 거래처에는 상품이 없어서 상품 추가가 안된다. 그래서, 이 함수를 업앴다. onChange="chgRouteGb()"  onChange="chgMustIcon()" -->
							<select id="ROUTE_GB" name="ROUTE_GB" class="wid2" onChange="chgRouteGb();">
								<option value=""><spring:message code="select"/></option>
							</select>
						</td>
						<th scope="row"><em>필수입력항목</em> 매입처</th>
						<td>  
							<input type="hidden" id="SLIP_DIV_YN" name="SLIP_DIV_YN" />
							<input type="hidden" id="VEN_CODE" name="VEN_CODE" class="wid2" />
							<input type="text" id="VEN_NAME" name="VEN_NAME" class="wid2" onChange="chgVenName();" />
							<button type="button" id="VEN_SEARCH_BTN" name="VEN_SEARCH_BTN" class="search_btn"  onclick="btn_comm_supply_search();">검색 아이콘</button>
						</td>
					</tr>
					<tr>
						<th scope="row"><em>필수입력항목</em>매입구분</th>
						<td colspan=7>
							<select id="PUR_GB" name="PUR_GB" class="wid2" onChange="chgPurGb();"> 
								<option value=""><spring:message code="select"/></option>
							</select>						
						</td>
					</tr>					
				</tbody>
			</table>
		</form>
		<!-- //조회폼 영역 끝 -->
		
		<!-- 그리드 영역 --> 
		<div class="clear">
			<div class="f_l tit_top">
				<div class="clear" >
					<h3 class="bul_arr f_l">발주목록  &nbsp;&nbsp; <label id="HEAD_STRING" name="HEAD_STRING"></label></h3>
					<dlv class="f_r">
						 <button type="button" id="orderDel" class="btn btn_style4" onclick="orderDel();">발주삭제</button> 
					</dlv>
				</div>
				<div id="gridHolder2"><!-- 그리드2 영역, 스타일 삭제 --></div>
			</div>
			<table class="tbl_st2 f_r" style="width:311px;margin-top:32px;margin-left:10px">
				<colgroup>
					<col width="50%" />
					<col width="50%" />
				</colgroup>				
				<tbody>
					<tr>
						<th scope="row">면세원가 금액합계</th>
						<td><input type="text" id="TOT_WSPRC_TAX_FREE" name="TOT_WSPRC_TAX_FREE" class="wid100" style="text-align:right;" readonly /></td>
					</tr>
					<tr>
						<th scope="row">과세원가 금액합계</th>
						<td><input type="text" id="TOT_WSPRC_TAX_ADD" name="TOT_WSPRC_TAX_ADD" class="wid100" style="text-align:right;" readonly /></td>
					</tr>
					<tr>
						<th scope="row">부가세 금액합계</th>
						<td><input type="text" id="TOT_WVAT" name="TOT_WVAT" class="wid100" style="text-align:right;" readonly /></td>
					</tr>
					<tr>
						<th scope="row">구입 금액합계</th>
						<td><input type="text" id="TOT_PRICE" name="TOT_PRICE" class="wid100" style="text-align:right;" readonly /></td>
					</tr>
					<tr>
						<th scope="row">매가 금액합계</th>
						<td><input type="text" id="TOT_SPRC" name="TOT_SPRC" class="wid100" style="text-align:right;" readonly /></td>
					</tr>
					<tr>
						<th scope="row">공병 금액합계</th>
						<td><input type="text" id="BOT_SPRC_TOT" name="BOT_SPRC_TOT" class="wid100" style="text-align:right;" readonly /></td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<div>
			<div class="tit_top clear">
				<h3 class="bul_arr f_l">발주상품   
				&nbsp;&nbsp;&nbsp;
				<input type="checkbox" name="SHOW_COL" id="SHOW_COL" onClick="setColumnVisible(25, this); setColumnVisible(26, this); setColumnVisible(27, this);setColumnVisible(28, this);" />숨겨진 컬럼보기</h3>	 
				<div class="f_r">  
					 * 원가단가: 세액포함 
					<button type="button" id="btn_add" name="btn_add" class="btn btn_style4" onclick="gridHolder1AddRow();">행추가</button>
					<button type="button" id="btn_del" name="btn_del" class="btn btn_style4" onclick="gridHolder1DelRow();">행삭제</button>
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
</html>