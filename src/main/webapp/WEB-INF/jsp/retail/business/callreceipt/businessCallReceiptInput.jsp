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
<title><spring:message code="commonCodeManagement"/></title>
<link type="text/css" rel="stylesheet" href="/resources/css/jquery-ui.css">
<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">
<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->
<script type="text/javascript" src="/resources/js/jquery-1.7.1.min.js" charset="utf-8"></script>
<script src="/resources/js/jquery-ui.js"></script>
<script src="/resources/js/style.js"></script>
<%--
	설명: 공통코드관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-01-12    권용욱       초기작성 
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
<script type="text/javascript" src="/resources/js/page/business/callreceipt/businessCallReceiptInput.js?ver=20317070232_1" charset="utf-8"></script>
<!-- 공통 팝업을 쓸 때 반드시 추가해야 한다. -->
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
	    		$("#btn_read").hide();
	    		$("#btn_read2").hide();
	    		$("#btn_event").hide();
	    		$("#btn_create").hide();
	    		$("#btn_create2").hide();
	    		$("#btn_create3").hide();
	    		$("#btn_addRow").hide();
	    		$("#btn_update").hide();
	    		$("#btn_delRow").hide();
	    		$("#btn_submit").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_read2").hide();
	    		$("#btn_event").hide();
	    		$("#btn_create").hide();
	    		$("#btn_create2").hide();
	    		$("#btn_create3").hide();
	    		$("#btn_addRow").hide();
	    		$("#btn_update").hide();
	    		$("#btn_delRow").hide();
	    		$("#btn_submit").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_read").show();
		    		$("#btn_read2").show();
		    		$("#btn_event").show();
		    	}else{
		    		$("#btn_read").hide();
		    		$("#btn_read2").hide();
		    		$("#btn_event").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#btn_create").show();
		    		$("#btn_create2").show();
		    		$("#btn_create3").show();
		    		$("#btn_addRow").show();
		    	}else{
		    		$("#btn_create").hide();
		    		$("#btn_create2").hide();
		    		$("#btn_create3").hide();
		    		$("#btn_addRow").hide();
		    	}
		    	
		    	//저장버튼 제어 
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_update").show();
		    	}else{
		    		$("#btn_update").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#btn_delRow").show();
		    	}else{
		    		$("#btn_delRow").hide();
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
		    		$("#btn_submit").show();
		    	}else{
		    		$("#btn_submit").hide();
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
					<a href="" class="close_btn p_a">도움말 닫기</a>
				</div>
				<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
				<div class="f_r">
					<!-- 권한에 따른 버튼 show/hide -->
					<button type="button" id="btn_submit" class="btn btn_style2" onclick="btnDetermine()"><spring:message code="btnSubmit"/></button>
					<button type="button" id="btn_create"  class="btn btn_style2" onclick="btnNew()" ><spring:message code="btnNew"/></button>
				    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="btnSaveCheck()"><spring:message code="btnSave"/></button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="btnSearch()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
					 <input type="hidden" id="SESSION_USER_NM" name="SESSION_USER_NM" value="<%=getEnv().getUserNm() %>" />
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area"    id="top_search">
				<div class="last">
					<label for=""><em>필수입력항목</em><spring:message code="slipNo"/></label>
					<input type="text" id="S_SLIP_NO" name="S_SLIP_NO" class="search_txt" maxlength="10">
					<button type="button" class="search_btn" onclick="btnSearchSlip('S')">검색 아이콘</button>
					<label for="">회원명</label>
					<input type="text" id="S_CUST_NAME" name="S_CUST_NAME" class="search_txt">
					<button type="button" class="search_btn" onclick="btnSearchSlip('C')">검색 아이콘</button>	
					<input type="hidden" id="S_CUST_NO" name="S_CUST_NO" class="search_txt">
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<h3 class="bul_arr f_l"><spring:message code="registOrder"/></h3>
			<div class="f_r">
				<button type="button" id="btn_read2" class="btn btn_style4" onclick="btnSearchClaim()">고객 클레임현황 조회</button>
			</div>
			<table class="tbl_st2">
				<colgroup>
					<col style="width:9%">
					<col>
					<col style="width:9%">
					<col>					
					<col style="width:9%">
					<col>				
					<col style="width:11%">
					<col>			
				</colgroup>
				<tbody>
					<tr>
						<th scope="row"><em>필수입력항목</em><label><spring:message code="cusName"/></label></th>
						<td>
							<input type="hidden" id="CUST_NO" name="CUST_NO" >
							<input type="hidden" id="ORD_DT" name="ORD_DT" >
							<input type="text" id="CUST_NAME" name="CUST_NAME" class="search_txt wid7">
							<button type="button" class="search_btn" onclick="btn_comm_user_search()">검색 아이콘</button>
						</td>
						<th scope="row"><em>필수입력항목</em><label><spring:message code="storNm"/></label></th>
						<td>
							<select id="STR_CODE" name="STR_CODE" class="wid2">
							</select>
						</td>
						<th scope="row"><em>필수입력항목</em><label><spring:message code="payType"/></label></th>
						<td>
							<select id="PAY_METH" name="PAY_METH" class="wid2">
							</select>
						</td>
						<th scope="row"><label><spring:message code="reserveDate"/></label></th>
						<td colspan="3">
							<input type="text" class="datepicker wid2" id="RESERVE_DT" name="RESERVE_DT">
							<select id="RESERVE_TIME" name="RESERVE_TIME" class="wid3 wid_marL t_c">
								<option value=""><spring:message code="select"/></option>
								<option value="10:00">10:00</option>
								<option value="14:00">14:00</option>
								<option value="16:00">16:00</option>
							</select>
							<!-- <input type="text" class="wid3 wid_marL t_c" id="RESERVE_TIME" name="RESERVE_TIME" maxlength="5"> -->
						</td>		
					</tr>
					<tr>
						<th scope="row"><label><spring:message code="creditLimit"/></label></th>
						<td><input type="text" class="wid2 t_r" id="CREDIT_LIMIT" name="CREDIT_LIMIT" value="0" disabled></td>
						<%-- <th scope="row"><label><spring:message code="acctReable"/></label></th> --%>
						<th scope="row"><label>외상잔액</label></th>
						<td><input type="text" class="wid2 t_r" id="ACCT_REABLE" name="ACCT_REABLE" value="0" disabled></td>
						<th scope="row"><label><spring:message code="creditUseLimit"/></label></th>
						<td><input type="text" class="wid2 t_r" id="CREDIT_USE_LIMIT" name="CREDIT_USE_LIMIT" value="0" disabled></td> 
						<%-- <th scope="row"><em>필수입력항목</em><label><spring:message code="receiveSMS"/></label></th> --%>
						<th scope="row"><em>필수입력항목</em><label>문자수신여부</label></th>
						<td>
					 		<input type="radio" id="SMS_YN_Y" name="SMS_YN" checked="checked"><label for="" class="wid_marL"><spring:message code="yes"/></label>
					 		<input type="radio" id="SMS_YN_N" name="SMS_YN"><label for="" class="wid_marL"><spring:message code="no"/></label>
					 	</td>
					</tr>
					 <tr>
					 	<th scope="row"><label><spring:message code="phoneNumber"/></label></th>
					 	<td>
							<input type="text" id="TEL_NO_1" name="TEL_NO_1" class="wid5 t_c" disabled>
							<input type="text" id="TEL_NO_2" name="TEL_NO_2" class="wid5 t_c wid_marL" disabled>
							<input type="text" id="TEL_NO_3" name="TEL_NO_3" class="wid5 t_c wid_marL" disabled>								 	
					 	</td>
					 	<th scope="row"><label><spring:message code="mobilNo"/></label></th>
					 	<td>
							<input type="text" id="MOBIL_NO_1" name="MOBIL_NO_1" class="wid5 t_c" disabled>
							<input type="text" id="MOBIL_NO_2" name="MOBIL_NO_2" class="wid5 t_c wid_marL" disabled>
							<input type="text" id="MOBIL_NO_3" name="MOBIL_NO_3" class="wid5 t_c wid_marL" disabled>								 	
					 	</td>
					 	<th scope="row"><label><spring:message code="mbrGrade"/></label></th>
					 	<td><input type="text" class="wid2 t_c" id="MBR_GRADE" name="MBR_GRADE" disabled></td>
					 	<th scope="row"><label><spring:message code="busiFlag"/></label></th>
					 	<td><input type="text" class="wid2 t_c" id="BUSI_FLAG_NAME" name="BUSI_FLAG_NAME" disabled></td>					 	
					 </tr>
					<tr>
						<th scope="row"><label><spring:message code="addr"/></label></th>
						<td colspan="3">
							<input type="text" class="wid1" id="ADDR" name="ADDR" disabled style="width:280px;"><input type="text" class="wid1 wid_marL" id="ADDR_DTL" name="ADDR_DTL" disabled style="width:105px;" >
						</td>
						<th scope="row"><label><spring:message code="orderAddr"/></label></th>
						<td colspan="3">
							<input type="text" class="wid1" id="ORD_ADDR" name="ORD_ADDR" maxlength="25" style="width:266px;" >
							<input type="text" class="wid1 wid_marL" id="ORD_ADDR_DTL" name="ORD_ADDR_DTL" maxlength="25"  style="width:105px;" >
							<input type="checkbox" id="ADDR_SAME_YN" name="ADDR_SAME_YN" class="tbl_rdo mar_L10"><label for="" class="tbl_rdo"><spring:message code="addrSame"/></label>
						</td>
					</tr>
					<tr>
						<th scope="row"><label><spring:message code="slipNo"/></label></th>
						<td><input type="text" class="wid2 t_c" id="SLIP_NO" name="SLIP_NO" disabled></td>
						<th scope="row"><label><spring:message code="ordStat"/></label></th>
						<td>
							<input type="text" class="wid2 t_c" id="ORD_STAT" name="ORD_STAT" disabled>
							<input type="hidden" id="ORD_STAT_CD" name="ORD_STAT_CD" disabled>
						</td>
						<th scope="row"><label><spring:message code="orderDatetime"/></label></th>
						<td><input type="text" class="wid2 t_c" id="IDATE" name="IDATE" style="width:120px;" disabled></td>
						<th scope="row"><label><spring:message code="orderEmp"/></label></th>
						<td><input type="text" class="wid2 t_c" id="IEMP_NM" name="IEMP_NM" disabled></td>						
					</tr>
					<tr>
						<%-- <th scope="row"><label><spring:message code="orderMth"/></label></th>
						<td>
							<select id="ORD_MTHD" name="ORD_MTHD" class="wid2" disabled>
							</select>
						</td> --%>
						<th scope="row"><label><spring:message code="remark"/></label></th>
						<td colspan="7">
							<!-- <input type="text" class="wid100" id="REMARK" name="REMARK"> -->
							<input type="hidden" id="ORD_MTHD" name="ORD_MTHD" value="1"> 
							<textarea class="wid100" id="REMARK" name="REMARK" style="height:40px; "></textarea>
						</td>
					</tr>					
				</tbody>
			</table>
			
			<div class="sec_grid">
				<div class="content">
					<div class="tit_top mar_B2 clear">
						<h3 class="bul_arr f_l"><spring:message code="orderProduct"/></h3>
						<div class="tbl_rdo">
							<label for=""><spring:message code="co"/></label>
							<input type="text" id="ORD_CNT" name="ORD_CNT" class="wid1 t_c" disabled>
							<label for="" class="mar_L10"><spring:message code="sm"/></label>
							<input type="text" id="ORD_TOT" name="ORD_TOT" class="wid2 t_r pad_R4 mar_R4" disabled>원						
						</div>
						<div class="f_r">
							<label style="margin-right: 10px; font-weight: bold;color: red;">※ 상품명은 1글자 이상 입력해야 조회가 가능합니다. </label>
							<button type="button" id="btn_event" class="btn btn_style4" onclick="openEventPop()"><spring:message code="eventProduct"/></button>
							<button type="button" id="btn_addRow" class="btn btn_style4" onclick="addRow()"><spring:message code="addRow"/></button>
							<button type="button" id="btn_delRow" class="btn btn_style4" onclick="deleteRow()"><spring:message code="delRow"/></button>
						</div>
					</div>				
					<div id="gridHolder2"></div>
				</div>
			</div>	
			
			<div class="sec_grid">
				<div class="content clear">
					<div class="f_l lft_box">
						<div class="tit_top clear">
							<h3 class="bul_arr f_l">상품매출(POS)</h3>
							<button type="button" id="btn_create2" class="btn btn_style4 f_r" onclick="btnChoosePOS()"><spring:message code="select"/></button>
						</div>					
							<div id="gridHolder3"></div>
					</div>
					<div class="f_r rgt_box mar_L10">
						
						<div class="tit_top clear">
							<h3 class="bul_arr f_l"><spring:message code="orderHistory"/></h3>
							<button type="button" id="btn_create3" class="btn btn_style4 f_r" onclick="btnChoose()"><spring:message code="select"/></button>
						</div>
						<div id="gridHolder1"></div>
					</div>
				</div>
			</div>					

		</div>
		<!-- //Content : 본문 영역 -->
		
		<div id="pop_wrap0">
			<div id="pop_cnt">
				<h3 class="bul_arr"><spring:message code="claimList"/></h3>
				<div id="gridHolder4"></div>
				<h3 class="bul_arr tit_top"><spring:message code="claimDetail"/></h3>
				<table class="tbl_st2" id="body_area">
				<tr>
					<th><em>필수입력사항</em><spring:message code="conts"/></th>
					<td colspan="7"><textarea class="note" id="CONTS" name="CONTS" maxlength="1000" disabled></textarea></td>	
				</tr>									
			</table>
			</div>
		</div>
			
		<div id="pop_wrap1">
			<div id="pop_cnt">
				<h3 class="bul_arr"><spring:message code="claimManageSearch"/></h3>
				<table class="tbl_st2" id="body_area2">
					<tr>
						<th><spring:message code="title"/></th>
						<td colspan="5">
							<input type="text" class="wid4 mar_R4" id="SUBJECT" name="SUBJECT" disabled>
							<button type="button" id="" class="btn btn_style4" onclick="$('#pop_wrap1' ).dialog( 'close' );"><spring:message code="btnClose"/></button>
						</td>
						<!-- 버튼 삭제할 경우 <input type="text" class="wid100 mar_R4" id="" name="">로 변경 -->
					</tr>
					<tr>
						<th><spring:message code="manageDetail"/></th>
						<td colspan="5"><textarea id="CONTS" name="CONTS" class="" style="background-color: #ebebeb;" disabled></textarea></td>
					</tr>
					<tr>
						<th><spring:message code="manageRowNum"/></th>
						<td>
							<select id="SEQ" name="SEQ" class="wid3">
							</select>
						</td>
						<th><spring:message code="inputName"/></th>
						<td><input type="text" class="wid2" id="IEMP_NAME" name="IEMP_NAME" disabled></td>							
						<th><spring:message code="iDateTime"/></th>
						<td><input type="text" class="wid1" id="IDATE" name="IDATE" disabled></td>			
					</tr>												
				</table>
			</div>
		</div>
	
</body>
</html>
	
