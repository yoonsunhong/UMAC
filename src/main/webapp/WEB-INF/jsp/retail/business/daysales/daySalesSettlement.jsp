<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

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
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><spring:message code="daySalesSettlement"/></title>

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
<!--[if IE]><script language="javascript" type="text/javascript" src="/resources/js/rMateGridH5/JS/shim.js"></script><![endif]-->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>

<%--
	설명: 일매출정산집계조회 매뉴화면
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-05-10   추황영       초기작성 
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
<script type="text/javascript" src="/resources/js/page/business/daysales/daySalesSettlement.js?ver=20170618_001" charset="utf-8"></script>
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
	    	//alert("ORG_TYPE = " + data[0].ORG_TYPE + " / loadData.STR_CODE = " + loadData.STR_CODE);
	    	
	    	//사용자 기능별 권한관리 데이터가 없으면 모든 버튼 숨김
	    	if(data == ""){
	    		$("#btn_search").hide();
	    		$("#pop_btn_excel1").hide();
	    		$("#btn_print").hide();
	    		$("#pop_btn_print1").hide();
	    		$("#pop_btn_print2").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#pop_btn_excel1").hide();
	    		$("#btn_print").hide();
	    		$("#pop_btn_print1").hide();
	    		$("#pop_btn_print2").hide();
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
		    		
		    	}else{
		    		
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#pop_btn_excel1").show();
		    	}else{
		    		$("#pop_btn_excel1").hide();
		    	}
		    	
		    	//엑셀업로드버튼 제어
		    	if(data[0].AUTH_EXCEL_UPLOAD == 'Y'){
		    		
		    	}else{
		    		
		    	}
		    	
		    	//프린트, 출력 버튼 제어
		    	if(data[0].AUTH_PRINT == 'Y'){
		    		$("#btn_print").show();
		    		$("#pop_btn_print1").show();
		    		$("#pop_btn_print2").show();
		    	}else{
		    		$("#btn_print").hide();
		    		$("#pop_btn_print1").hide();
		    		$("#pop_btn_print2").hide();
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
				$("#P_STR_CODE").val(loadData.STR_CODE);
				$("#P_STR_CODE").prop("disabled", true);
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
 	<form name="frm" id="frm">
		<div id="iframeCnt">
			<div class="btn_area clear">
				<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png"><spring:message code="btnHelp"/></button>
				<div class="advice p_a">
					<h4>information</h4>
					<pre id="helpText"></pre>
					<a href="" class="close_btn p_a"><spring:message code="btnHelpClose"/></a>
				</div>
				<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
				<div class="f_r">
			    	<button type="button" id="btn_print" class="btn btn_style2"><spring:message code="print"/></button>
					<button type="button" id="btn_search" name="btn_search" class="btn btn_style3"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">	
					<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" >
					<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE}" />
						
					<label for=""><em>필수입력항목</em><spring:message code="storNm"/></label>
					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2" disabled>
					</select>					
					
					<label for=""><em>필수입력항목</em>영업일자</label>
					<input type="text" id="P_BUSI_DT" name="P_BUSI_DT" class="datepicker datepicker1 wid2">
				</div>				
			</div>
			<!-- //조회폼 영역 -->
			
			<div class="col2 sub_cnt">
			<div class="clear">
				<div class="lft_wid f_l">
					<h3 class="bul_arr"><spring:message code="totalSales"/></h3>
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder1"></div>
						</div>
					</div>				
				</div>
				<div class="rgt_wid f_r">
					<div class="tit_top" style="padding-top:0px;">
						<h3 class="bul_arr f_l"><spring:message code="accntReceivalbe"/></h3>
						<div class="f_r">
							<button type="button" id="btn_pop" class="btn btn_style4" >외상입금상세</button>
						</div>
					</div>
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder2"></div>
						</div>
					</div>					
				</div>			
			</div>
			<div class="mar_T10">
				<div class="tit_top" style="padding-top:0px;">
						<h3 class="bul_arr f_l">계산원별마감정산</h3>
						<div class="f_r">
							<button type="button" id="btn_pop2" class="btn btn_style4" >외상발생상세</button>
						</div>
					</div>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder3"></div>
					</div>
				</div>				
			</div>
			
			<!-- 합계 -->
			<div style="margin-top: 5px;">
				<div>
					<h3 class="bul_arr f_l">합계</h3>
					<table class="tbl_st2 tbl_st5 tbl2" style="margin:0;">
						<colgroup>
							<col style="width:50px;" />
							<col style="width:200px;" />
							<col style="width:50px;" />
							<col style="width:200px;" />
							<col style="width:50px;" />
							<col style="width:200px;" />
							<col style="width:50px;" />
							<col style="width:200px;" />
						</colgroup>
						<tbody>
							<tr>
								<th>현금 합계</th>
								<td id="sumCash">0</td>
								<th>신용카드 합계</th>
								<td id="sumCard">0</td>
								<th>포인트 합계</th>
								<td id="sumPoint">0</td>
								<th>계좌이체 합계</th>
								<td id="sumTransfer">0</td>
							</tr>
						</tbody>
					</table>
				</div>
			
			</div>
			
			</div>
		</div>
	</form>		
	<!-- //Content : 본문 영역 -->	 
	<div id="pop_wrap1" >
		<header id="pop_head" class="clear">
			<h1 class="bul_arr f_l">외상입금상세내역</h1>
			<div class="f_r">
				<button type="button" id="pop_btn_print1" class="btn btn_style4" onclick="btnPopPrint('C')">출력</button>
				<button type="button" id="pop_btn_excel1" class="btn btn_style4" onclick="btnExcell()"><spring:message code="btnExcel"/></button>
				<button type="button" class="btn btn_style4" onclick="btn_close('D')"><spring:message code="btnClose"/></button>
			</div>			
		</header>
		<div class="col2 sub_cnt">
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder4"></div>
				</div>
			</div> 		 
		</div>
	</div>		
	<div id="pop_wrap2" >
		<header id="pop_head" class="clear">
			<h1 class="bul_arr f_l">외상매출상세내역</h1>
			<div class="f_r">
				<button type="button" id="pop_btn_print2" class="btn btn_style4" onclick="btnPopPrint('P')">출력</button>
<%-- 				<button type="button" id="" class="btn btn_style4" onclick="btnExcell()"><spring:message code="btnExcel"/></button> --%>
				<button type="button" class="btn btn_style4" onclick="btn_close('P')"><spring:message code="btnClose"/></button>
			</div>			
		</header>
		<div class="col2 sub_cnt">
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder5"></div>
				</div>
			</div> 		 
		</div>
	</div>		
</body>
</html>
	
