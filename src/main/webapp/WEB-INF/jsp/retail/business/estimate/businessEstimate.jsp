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
	설명: 영업정보 > 영업관리 > 견적서관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-02-27    김경진       초기작성 
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
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />
<script type="text/javascript" src="/resources/js/page/business/estimate/businessEstimate.js?ver=20180406_000" charset="utf-8"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
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
	    		$("#btn_new").hide();
	    		$("#btn_copy").hide();
	    		$("#btn_update").hide();
	    		$("#btn_print").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_new").hide();
	    		$("#btn_copy").hide();
	    		$("#btn_update").hide();
	    		$("#btn_print").hide();
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
		    		$("#btn_copy").show();
		    		$("#btn_update").show();
		    	}else{
		    		$("#btn_copy").hide();
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
		    		$("#btn_print").show();
		    	}else{
		    		$("#btn_print").hide();
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
				<button type="button" id="btn_print"  class="btn btn_style2"  onclick="btn_print1()"><spring:message code="print"/></button>
				<button type="button" class="btn btn_style2" id="btn_new" ><spring:message code="btnNew"/></button>
				<button type="button" class="btn btn_style3" id="btn_search" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<form name="sertch_frm" id="sertch_frm" >
			<input type="hidden" name="S_CORP_CODE" id="S_CORP_CODE" value="${sessionScope.CORP_CODE }" >
			<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
			<input type="hidden" name="pageUnit" id="pageUnit" value="10" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
			<input type="hidden" name="pageSize" id="pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
			<input type="hidden" name="S_COLUMN_NAME" id="S_COLUMN_NAME" />
			<input type="hidden" name="S_ORDERBY" id="S_ORDERBY" />
			<input type="hidden" name="S_EMATE_DT" id="S_EMATE_DT" />
			<input type="hidden" name="S_EMATE_NO" id="S_EMATE_NO" />
			
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수입력항목</em><spring:message code="btnSearchDate"/></label>
					<input type="text" name="S_GONG_DT" id="S_GONG_DT" class="datepicker" /> ~ <input type="text" name="S_END_DT" id="S_END_DT" class="datepicker" />
					
					<label for=""><spring:message code="cusName"/></label>
					<input type="text" id="S_CUST_NAME" name="S_CUST_NAME" class="search_txt">
					<input type="hidden" id="S_CUST_NO" name="S_CUST_NO" class="search_txt">
					<input type="hidden" id="S_CORP_CODE" name="S_CORP_CODE" class="search_txt" value="${sessionScope.CORP_CODE }" >
					<button type="button" onclick="btn_comm_user_search('S')" class="search_btn">검색 아이콘</button>
					
					<label for="">견적NO</label>
					<input type="text" id="SS_EMATE_NO" name="SS_EMATE_NO" class="search_txt">
				</div>
			</div>
		</form>
		<!-- //조회폼 영역 -->
		
		<!-- 본문 영역 -->
		<div class="col2 sub_cnt">
			<!-- <h3 class="bul_arr">견적서 목록</h3> -->
			<div class="sec_grid">
				<div class="content">
					<div class="tit_top">
						<h3 class="bul_arr f_l">견적서 목록</h3>
						<div class="f_r">
							<button type="button" id="btn_copy" class="btn btn_style4" onclick="javascript:fn_copy();">복사</button>
							<button type="button" id="btn_update" class="btn btn_style4" onclick="javascript:fn_update();">수정</button>
						</div>
					</div>
					<div id="gridHolder1">
					</div>
					<div class="gridPaging" id="gridPageNavigationDiv">
					</div>
				</div>
			</div>
			
			<!-- <div class="sec_grid">
				<div class="content">
					<div class="tit_top">
						<h3 class="bul_arr f_l">견적서 상품</h3>
						<div class="f_r">
							(VAT 포함)
						</div>
					</div>
					<div id="gridHolder2">
					</div>
				</div>
			</div> -->
			
			<h3 class="bul_arr">견적서 상품</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder2">
					</div>
				</div>
			</div>
		</div>
		<!-- 본문 영역 -->
		
	</div>
	<!-- //Content : 본문 영역 -->

<!-- 등록 수정 팝업 영역 시작  -->
<div id="pop_wrap1">
	<%-- <header id="pop_head" class="clear">
		<h1 class="bul_arr f_l">견적서 등록</h1>
		<div class="f_r">
			<c:if test="${sessionScope.AUTH_SAVE eq 'Y'}">
				<button type="button" class="btn btn_style4" id="pop_btn_save" onclick="updateDetail('update');"><spring:message code="btnSave"/></button>
			</c:if>
			<button type="button" class="btn btn_style4" onclick="btn_close()"><spring:message code="btnClose"/></button>
		</div>
	</header> --%>
 	
 	<form name="reg_frm" id="reg_frm">
		<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE}" />	<!-- 기업코드 -->
		<input type="hidden" name="P_TYPE" id="P_TYPE" />			<!-- 1:insert, 2:update, 3:delete -->
		<input type="hidden" name="P_REG_ID" id="P_REG_ID" value="${sessionScope.ID }" />
		<input type="hidden" name="P_CUST_NO" id="P_CUST_NO" />
		<input type="hidden" name="P_EMP_NO" id="P_EMP_NO" />
		<input type="hidden" name="P_EMATE_AMT" id="P_EMATE_AMT" />
		<input type="hidden" name="P_PRO_LIST" id="P_PRO_LIST" />
		
 		<div class="clear">
			<div class="box_lft f_l">
				<h3 class="bul_arr">수신처</h3>
				<table class="tbl_st2">
					<colgroup>
						<col style="width:25%" />
						<col style="width:75%" />
					</colgroup>
					<tr>
						<th><em>필수입력사항</em>수신</th>
						<td>
							<input type="text" id="P_CUST_NAME" name="P_CUST_NAME" class="wid2 mar_R0" />
							<button type="button" class="search_btn" id="userSearch_btn" onclick="btn_comm_user_search('P')" >검색 아이콘</button>
							<input type="checkbox" name="P_NON_CUST" id="P_NON_CUST" class="mar_L10" /><label for="P_NON_CUST" class="tbl_mid">비회원 직접 입력</label>
						</td>
					</tr>
					<tr>
						<th><spring:message code="busiNo"/></th>
						<td>
							<input type="text" id="P_BUSI_NO" name="P_BUSI_NO" maxlength="12" class="wid1">
						</td>
					</tr>
					<tr>
						<th><spring:message code="ceoName"/></th>
						<td><input type="text" id="P_REP_NAME" name="P_REP_NAME" maxlength="10" class="wid1"></td>
					</tr>
					<tr>
						<th><spring:message code="addr"/></th>
						<td>
							<input type="text" id="P_POST_NO" name="P_POST_NO" class="wid2 mar_R4" readonly="readonly" />
							<button type="button" class="btn btn_style3 f_l" id="P_ZIP_BUTTON" onclick="execDaumPostcode('P_POST_NO', 'P_ADDR', 'P_ADDR_DTL');"><i class="fa fa-search"></i>우편번호찾기</button>
							<input type="text" id="P_ADDR" name="P_ADDR" class="wid1 mar_T4" maxlength=""  readonly="readonly" />
							<input type="text" id="P_ADDR_DTL" name="P_ADDR_DTL" class="wid4 mar_T4" maxlength="25"  />
						</td>
					</tr>
					<tr>
						<th><spring:message code="business"/></th>
						<td><input type="text" id="P_UPTAE" name="P_UPTAE" maxlength="25" class="wid1"></td>
					</tr>
					<tr>
						<th><spring:message code="sectors"/></th>
						<td><input type="text" id="P_UPJONG" name="P_UPJONG" maxlength="25" class="wid1"></td>
					</tr>
					<tr>
						<th>참조</th>
						<td><input type="text" id="P_MEMO" name="P_MEMO" class="wid100" maxlength="25" /></td>
					</tr>
					<tr>
						<th><em>필수입력사항</em><spring:message code="phoneNumber"/><!-- 연락처 --></th>
						<td>
							<select id="P_TEL_NO_1" name="P_TEL_NO_1" class="wid3">
								<option value=""><spring:message code="select"/></option>
							</select>
							<input type="text" id="P_TEL_NO_2" name="P_TEL_NO_2" class="wid3 wid_marL" >
							<input type="text" id="P_TEL_NO_3" name="P_TEL_NO_3" class="wid3 wid_marL" >
						</td>
					</tr>
					<tr>
						<th><em>필수입력사항</em>E-Mail</th>
						<td>
							<input type="text" id="P_EMAIL_1" name="P_EMAIL_1" class="wid2">
							<label class="f_l tbl_mid">@</label>
							<input type="text" id="P_EMAIL_2" name="P_EMAIL_2" class="wid2 wid_marL">
						</td>
					</tr>
					<tr>
						<th><em>필수입력사항</em>견적일자</th>
						<td><input type="text" id="P_EMATE_DT" name="P_EMATE_DT" class="datepicker"></td>
					</tr>
					<tr>
						<th><em>필수입력사항</em>유효기간</th>
						<td><input type="text" id="P_VALID_DT" name="P_VALID_DT" class="datepicker"></td>
					</tr>
					<tr>
						<th><em>필수입력사항</em>견적명</th>
						<td><input type="text" id="P_EMATE_NM" name="P_EMATE_NM" class="wid100" /></td>
					</tr>
				</table>
			</div>
			<div class="box_rgt f_r">
				<div class="clear">
					<h3 class="bul_arr f_l">발신처</h3>
					<div class="f_r">
<%-- 						<button type="button" class="btn btn_style4" id="pop_btn_print" ><spring:message code="print"/></button> --%>
						<c:if test="${sessionScope.AUTH_SAVE eq 'Y'}">
							<button type="button" class="btn btn_style4" id="pop_btn_save" ><spring:message code="btnSave"/></button>
						</c:if>
					</div>
				</div>
				<table class="tbl_st2 mar_T0">
					<colgroup>
						<col style="width:25%" />
						<col style="width:25%" />
						<col style="width:25%" />
						<col style="width:25%" />
					</colgroup>
					<tr>
						<th><em>필수입력사항</em>견적유형</th>
						<td>
							<select id="P_INDUST_FLAG" name="P_INDUST_FLAG" class="wid2"></select>
						</td>
						<th>견적No</th>
						<td><input type="text" id="P_EMATE_NO" name="P_EMATE_NO" class="wid3" readonly="readonly" /></td>
					</tr>
					<tr>
						<th><spring:message code="busiNo"/></th>
						<td colspan="3">
							<input type="text" id="D_BUSI_NO" name="D_BUSI_NO" maxlength="12" class="wid1" readonly="readonly" >
						</td>
					</tr>
					<tr>
						<th><spring:message code="ceoName"/></th>
						<td colspan="3"><input type="text" id="D_REP_NAME" name="D_REP_NAME" maxlength="10" class="wid1" readonly="readonly" ></td>
					</tr>
					<tr>
						<th><spring:message code="addr"/></th>
						<td colspan="3">
							<input type="text" id="D_POST_NO" name="D_POST_NO" class="wid2 mar_R4" readonly="readonly" />
							<!-- <button type="button" class="btn btn_style3 f_l" id="P_ZIP_BUTTON" onclick="execDaumPostcode('D_POST_NO', 'D_ADDR', 'D_ADDR_DTL');"><i class="fa fa-search"></i>우편번호찾기</button> -->
							<input type="text" id="D_ADDR" name="D_ADDR" class="wid1 mar_R4" maxlength="" readonly="readonly" />
							<input type="text" id="D_ADDR_DTL" name="D_ADDR_DTL" class="wid4 mar_T4" maxlength="25" readonly="readonly" />
						</td>
					</tr>
					<tr>
						<th><spring:message code="business"/></th>
						<td colspan="3"><input type="text" id="D_UPTAE" name="D_UPTAE" maxlength="25" class="wid1" readonly="readonly" ></td>
					</tr>
					<tr>
						<th><spring:message code="sectors"/></th>
						<td colspan="3"><input type="text" id="D_UPJONG" name="D_UPJONG" maxlength="25" class="wid1" readonly="readonly" ></td>
					</tr>
					<tr>
						<th><em>필수입력사항</em>담당자</th>
						<td colspan="3">
							<input type="text" id="P_EMP_NAME" name="P_EMP_NAME" class="wid2" />
							<button type="button" class="search_btn" onclick="btn_comm_user_search('B')" >검색 아이콘</button>
						</td>
					</tr>
					<tr>
						<th><em>필수입력사항</em><spring:message code="phoneNumber"/><!-- 연락처 --></th>
						<td colspan="3">
							<select id="P_SEND_TEL_NO_1" name="P_SEND_TEL_NO_1" class="wid3">
								<option value=""><spring:message code="select"/></option>
							</select>
							<input type="text" id="P_SEND_TEL_NO_2" name="P_SEND_TEL_NO_2" class="wid3 wid_marL" >
							<input type="text" id="P_SEND_TEL_NO_3" name="P_SEND_TEL_NO_3" class="wid3 wid_marL" >
						</td>
					</tr>
					<tr>
						<th><em>필수입력사항</em>E-Mail</th>
						<td colspan="3">
							<input type="text" id="P_SEND_EMAIL_1" name="P_SEND_EMAIL_1" class="wid2">
							<label class="f_l tbl_mid">@</label>
							<input type="text" id="P_SEND_EMAIL_2" name="P_SEND_EMAIL_2" class="wid2 wid_marL">
						</td>
					</tr>
					<tr>
						<th><em>필수입력사항</em>결제조건</th>
						<td colspan="3">
							<select id="P_PAY_TYPE" name="P_PAY_TYPE" class="wid2">
								<option value=""><spring:message code="select"/></option>
							</select>
						</td>
					</tr>
					<tr>
						<th><em>필수입력사항</em>납기조건</th>
						<td colspan="3"><input type="text" id="P_DLIVRY_TYPE" name="P_DLIVRY_TYPE" class="wid100" /></td>
					</tr>
					<tr>
						<th><em>필수입력사항</em>견적용도</th>
						<td colspan="3"><input type="text" id="P_EMATE_USAGE" name="P_EMATE_USAGE" class="wid100" /></td>
					</tr>
				</table>
			</div>
		</div>
		<table class="tbl_st2 tbl_st6">
			<tr>
				<th>견적금액</th>
				<td id="T_EMATE_AMT">0</td>
				<th>일금</th>
				<td id="T_EMATE_AMT_KOR"></td>
				<!-- <td class="vat">(VAT포함)</td> -->
			</tr>
		</table>
		<div>
			<div class="clear tit_top">
				<h3 class="bul_arr f_l">견적상품 (VAT포함)</h3>
				<div class="tbl_rdo">
					<!-- <input type="radio" name="chk_user" id="chk_user_0" checked="checked" value="0" ><label for="chk_user_0" class="marR_2">회원용</label>	
					<input type="radio" name="chk_user" id="chk_user_1" value="1" ><label for="chk_user_1" class="marR_2">직원용</label> -->
					<!-- <input type="radio" name="chk_user" id="chk_user_0" checked="checked" value="0" ><label for="chk_user_0" class="marR_2">VAT 포함</label>	
					<input type="radio" name="chk_user" id="chk_user_1" value="1" ><label for="chk_user_1" class="marR_2">VAT 별도</label> -->
				</div>				
				<div class="f_r">
					<button type="button" class="btn btn_style4" onclick="javascript:fn_addRow();">행추가</button>
					<button type="button" class="btn btn_style4" onclick="javascript:fn_delRow();">행삭제</button>
				</div>
			</div>
			<div id="gridHolder3" >
			</div>
		</div>
		<div>
			<h3 class="bul_arr tit_top">특이사항</h3>
			<textarea class="wid100" style="height:70px" id="P_REMARK" name="P_REMARK" ></textarea>
		</div>
	</form>
</div>
<!--  등록 수정 팝업 영역 끝  -->

	<!-- 다음 우편번호 레이어 시작 -->
	<div id="daumZipLayer" style="display:none;position:fixed;overflow:hidden;z-index:99999;-webkit-overflow-scrolling:touch;">
		<img src="http://i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
	</div>
	<!-- 다음 우편번호 레이어 끝 -->
	<script src="/resources/js/daumZip.js"></script>

</body>
</html>