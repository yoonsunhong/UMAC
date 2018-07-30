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
<script type="text/javascript" src="/resources/js/jquery-1.12.4.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery-ui.js"></script>
<script src="/resources/js/style.js"></script>
<%--
	설명: 회원정보 > 고객관리 > SMS발송관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-07         김경진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/member/sms/memberSms.js?ver=20180410_000" charset="utf-8"></script>
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
	    		$("#btn_search").hide();
	    		$("#btn_new").hide();
	    		$("#btn_update").hide();
	    		$("#btn_exce").hide();
	    		$("#btn_exce2").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_new").hide();
	    		$("#btn_update").hide();
	    		$("#btn_exce").hide();
	    		$("#btn_exce2").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_search").show();
		    	}else{
		    		$("#btn_search").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#btn_new").show();
		    	}else{
		    		$("#btn_new").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_update").show();
		    		$("#btn_exce").show();
		    		$("#btn_exce2").show();
		    	}else{
		    		$("#btn_update").hide();
		    		$("#btn_exce").hide();
		    		$("#btn_exce2").hide();
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
				<a href="" class="close_btn p_a"><spring:message code="btnHelpClose"/></a>
			</div>
			<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button> 
			<div class="f_r">
				<!-- 권한에 따른 버튼 show/hide -->
				<button type="button" id="btn_new" class="btn btn_style2" ><spring:message code="btnNew"/></button>
			    <button type="button" id="btn_update" class="btn btn_style2" ><spring:message code="btnSave"/></button>
				<button type="button" id="btn_search" class="btn btn_style3" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form name="sertch_frm" id="sertch_frm" >
			<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" >
			<input type="hidden" name="P_CUST_NO" id="P_CUST_NO" />
			
			<div class="search_area" id="top_search">
				<div>
					<label for=""><em>필수입력항목</em><spring:message code="selngDate"/></label>
					<input type="text" name="P_GONG_DT" id="P_GONG_DT" class="datepicker" /> ~ <input type="text" name="P_END_DT" id="P_END_DT" class="datepicker" />
					
					<label for="" class="pad_R16"><em>필수입력항목</em>매출액</label>
					<input type="text" name="P_SALE_AMT_S" id="P_SALE_AMT_S" style="width:100px;margin-right:0;padding-left:0;" class="t_r" maxlength="16" numberOnly value="0" />
					 ~ <input type="text" name="P_SALE_AMT_E" id="P_SALE_AMT_E" style="width:100px;padding-left:0;" class="t_r" maxlength="16" numberOnly value="9999999999" />
					
					<label for=""><em>필수입력항목</em><spring:message code="visits"/></label>
					<input type="text" name="P_MOD_CUST_CNT" id="P_MOD_CUST_CNT" class="wid3 t_r" style="padding-right:4px;" value="0" />
				</div>
				<div class="last">
					<label for="" class="pad_L10" ><spring:message code="busiFlag"/></label>
					<select id="P_BUSI_FLAG" name="P_BUSI_FLAG" style="width:120px;margin-left:0px;">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for="" style="padding-left:148px;"><spring:message code="mbrGrade"/></label>
					<select id="P_MBR_GRADE" name="P_MBR_GRADE" style="width:120px;">
						<option value=""><spring:message code="all"/></option>
					</select>
					
					<label for="" style="padding-left:107px; padding-right:16px;"><spring:message code="cusName"/></label>
					<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" style="width:120px;">
					
				</div>
			</div>
		</form>
		<!-- //조회폼 영역 -->
		
		<!-- 본문 영역 -->
		<div class="col2 sub_cnt">
			<div class="p_r clear">
				<div class="f_l">
					<h3 class="bul_arr">대상자 리스트</h3>
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder1">
							</div>
						</div>
					</div>
				</div>
				<div class="f_l p_a pop_btn_updown">
					<button type="button" class="btn btn_up btn_style4" id="btn_right" ></button>
					<button type="button" class="btn btn_down btn_style4" id="btn_left" ></button>
				</div>
				<div class="f_r">
					<h3 class="bul_arr">SMS발송대상자</h3>
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder2">
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<form name="frm" id="frm" >
				<input type="hidden" name="D_CORP_CODE" id="D_CORP_CODE" value="${sessionScope.CORP_CODE }" >
				<input type="hidden" name="D_REG_ID" id="D_REG_ID" value="${sessionScope.ID }" />
				<input type="hidden" name="D_MEM_LIST" id="D_MEM_LIST" />			<!-- 발송대상 회원 리스트 -->
				<input type="hidden" name="D_RESERVE_TIME" id="D_RESERVE_TIME" />	<!-- 예약시간 -->
				<input type="hidden" name="D_MEMO_HDR" id="D_MEMO_HDR" />			<!-- 머리글 -->
				<input type="hidden" name="D_RESULT" id="D_RESULT" value="0" />		<!-- 전송상태( 0 : 즉시전송(숫자 0) R : 예약전송 ) -->
				<input type="hidden" name="D_KIND" id="D_KIND" value="S" />			<!-- 문자종류( M : MMS, S : SMS ) -->
				
				<div class="clear">
					<div class="f_l">
						<h3 class="bul_arr tit_top">SMS 작성 (<span id="txtbyte"></span>byte)</h3>
						<div class="sms_send">
							<div>
								<table>
									<colgruop>
										<col style="width:35px">
										<col>
									</colgruop>
									<tr>
										<th><label for=""><spring:message code="title"/></label></th>
										<td><select id="D_SMS_FLAG" name="D_SMS_FLAG" class="sms_tit"></select></td>
									</tr>
									<tr>
										<th><label for="" style="vertical-align:top;"><spring:message code="contents"/></label></th>
										<td><textarea class="sms_cnt1" id="D_MEMO" name="D_MEMO" ></textarea></td>
									</tr>
								</table>							
							</div>
						</div>
						<div class="sms_date">
							<label for=""><spring:message code="reservationDate"/></label>
							<input type="text" class="datepicker mar_R4 t_c" id="D_SEND_DT" name="D_SEND_DT" style="width:90px;">
							<select id="D_RESERVE_HOUR" name="D_RESERVE_HOUR" class="mar_L10">
								<c:forEach var="item" varStatus="i" begin="0" end="24" step="1">
									<option value="<c:if test="${item < 10}">0</c:if><c:out value="${item}" />" >
										<c:if test="${item < 10}">0</c:if><c:out value="${item}" />
									</option>
								</c:forEach>
							</select>
							
							<select id="D_RESERVE_MIN" name="D_RESERVE_MIN">
								<c:forEach var="item" varStatus="i" begin="0" end="59" step="1">
									<option value="<c:if test="${item < 10}">0</c:if><c:out value="${item}" />" >
										<c:if test="${item < 10}">0</c:if><c:out value="${item}" />
									</option>
								</c:forEach>
							</select>
							
							<label for="D_RESERVE_MIN"><spring:message code="txtMinute"/></label>
							<button type="button" class="btn btn_style4" id="btn_exce"><spring:message code="btnExec"/></button>
						</div>												
					</div>
					
					<div class="f_r">
						<h3 class="bul_arr tit_top">비회원 SMS 작성 (<span id="txtbyte2"></span>byte)</h3>
						<div class="sms_send">
							<div>
								<table>
									<colgroup>
										<col style="width:55px">
										<col>
									</colgroup>
									<tr>
										<th><label for="">전화번호</label></th>
										<td><input type="text" name="D_MOBIL_NO2" id="D_MOBIL_NO2" class="sms_num" /></td>
									</tr>
									<tr>
										<th><label for=""><spring:message code="title"/></label></th>
										<td><input type="text" name="D_SMS_FLAG2" id="D_SMS_FLAG2" class="sms_num" /></td>
									</tr>
									<tr>
										<th><label for="" style="vertical-align:top;"><spring:message code="contents"/></label></th>
										<td><textarea class="sms_cnt2" id="D_MEMO2" name="D_MEMO2" ></textarea></td>
									</tr>
								</table>
							</div>
						</div>
						<div class="sms_date">
							<label for="">즉시 발송</label>
							<button type="button" class="btn btn_style4" id="btn_exce2"><spring:message code="btnExec"/></button>
						</div>
					</div>										
				</div>
			</form>
		</div>
		<!-- 본문 영역 -->
		
		
	</div>
	<!-- //Content : 본문 영역 -->
	
</body>
</html>