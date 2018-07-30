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
	설명: POS안내문관리
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2016-12-26    김경진       초기작성 
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
<script type="text/javascript" src="/resources/js/page/posmaster/alram/posMasterAlram.js" charset="utf-8"></script>
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
	    		$("#pop_btn_save").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_new").hide();
	    		$("#pop_btn_save").hide();
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
		    		$("#pop_btn_save").show();
		    	}else{
		    		$("#pop_btn_save").hide();
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
				<button type="button" class="btn btn_style2" id="btn_new" ><spring:message code="btnNew"/></button>
				<button type="button" class="btn btn_style3" id="btn_search" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
			</div>
		</div>
		
		<form name="frm" id="frm">
			<input type="hidden" name="P_CORP_CODE" id="P_CORP_CODE" value="${sessionScope.CORP_CODE }" />
			<input type="hidden" name="S_STR_CODE" id="S_STR_CODE" value="${sessionScope.STR_CODE }" />
			
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><spring:message code="store"/></label>
					<select id="P_STR_CODE" name="P_STR_CODE" >
						
					</select>
					<label for=""><spring:message code="guideNumber"/></label>
					<select id="P_LOGO_NO" name="P_LOGO_NO" >
						
					</select>
				</div>
			</div>
			<!-- //조회폼 영역 -->
		</form>
		
		<div class="col2 sub_cnt">
			<h3 class="bul_arr">POS관리 > POS 안내문관리</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1">
					</div>
				</div>
			</div>
		</div>

	</div>
	<!-- //Content : 본문 영역 -->

<!-- 등록 수정 팝업 영역 시작  -->
<div id="pop_wrap">
	<header id="pop_head" class="clear">
		<h1 class="bul_arr f_l">POS 안내문 등록</h1>
		<div class="f_r">
			<%-- <c:if test="${sessionScope.AUTH_DELETE eq 'Y'}">
				<button type="button" id="pop_btn_del" class="btn btn_style4" onclick="updateDetail('delete');"><spring:message code="btnDel"/></button>
			</c:if> --%>
			<button type="button" class="btn btn_style4" id="pop_btn_save" onclick="updateDetail('update');"><spring:message code="btnSave"/></button>
			<button type="button" class="btn btn_style4" onclick="btn_close()"><spring:message code="btnClose"/></button>
		</div>
	</header>
 
	<form name="reg_frm" id="reg_frm">
		<input type="hidden" name="D_CORP_CODE" id="D_CORP_CODE" value="${sessionScope.CORP_CODE}" />	<!-- 기업코드 -->
		<input type="hidden" name="D_LOG_NO" id="D_LOG_NO" />		<!-- 안내문번호 -->
		<input type="hidden" name="D_TYPE" id="D_TYPE" />			<!-- 1:insert, 2:update, 3:delete -->
		<input type="hidden" name="D_MSG_SEQ" id="D_MSG_SEQ" />	<!-- 메세지,seq 배열로 셋팅함 -->
		
		<div id="pop_cnt">
			<div class="search_area" id="top_search">
				<div class="last">
					<label for=""><em>필수항목</em><spring:message code="storNm"/></label>
					<select id="D_STR_CODE" name="D_STR_CODE" >
						
					</select>
				</div>			
			</div>
			<table class="tbl_st2 tbl_st4">
				<tbody>
					<tr class="tbl_head">
						<th><spring:message code="guideNumber"/></th>
						<th><spring:message code="locationType"/></th>
						<th colspan="3"><spring:message code="guideMessage"/></th>
						<th>글자표현</th>
						<th><spring:message code="characterLength"/></th>
						<th><spring:message code="rowNumber"/></th>
					</tr>
					<tr>
						<th rowspan="20" class="t_c" id="g_logNo"><spring:message code="automaticNumbering"/></th>
						<th rowspan="10" class="t_c" >[0]상단메시지</td>
						<td colspan="3"><input type="text" id="MSG_1" name="MSG_1" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte1', 40);" ></td>
						<td><select name="FONT_STYLE_1" id="FONT_STYLE_1"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte1"></span>/40byte</td>
						<td>1</td>
					</tr> 					
					<tr>
						<td colspan="3"><input type="text" id="MSG_2" name="MSG_2" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte2', 40);" ></td>
						<td><select name="FONT_STYLE_2" id="FONT_STYLE_2"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte2"></span>/40byte</td>
						<td>2</td>
					</tr> 					
					<tr>
						<td colspan="3"><input type="text" id="MSG_3" name="MSG_3" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte3', 40);" ></td>
						<td><select name="FONT_STYLE_3" id="FONT_STYLE_3"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte3"></span>/40byte</td>
						<td>3</td>
					</tr> 					
					<tr>
						<td colspan="3"><input type="text" id="MSG_4" name="MSG_4" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte4', 40);" ></td>
						<td><select name="FONT_STYLE_4" id="FONT_STYLE_4"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte4"></span>/40byte</td>
						<td>4</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_5" name="MSG_5" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte5', 40);" ></td>
						<td><select name="FONT_STYLE_5" id="FONT_STYLE_5"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte5"></span>/40byte</td>
						<td>5</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_6" name="MSG_6" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte6', 40);" ></td>
						<td><select name="FONT_STYLE_6" id="FONT_STYLE_6"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte6"></span>/40byte</td>
						<td>6</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_7" name="MSG_7" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte7', 40);" ></td>
						<td><select name="FONT_STYLE_7" id="FONT_STYLE_7"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte7"></span>/40byte</td>
						<td>7</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_8" name="MSG_8" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte8', 40);" ></td>
						<td><select name="FONT_STYLE_8" id="FONT_STYLE_8"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte8"></span>/40byte</td>
						<td>8</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_9" name="MSG_9" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte9', 40);" ></td>
						<td><select name="FONT_STYLE_9" id="FONT_STYLE_9"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte9"></span>/40byte</td>
						<td>9</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_10" name="MSG_10" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte10', 40);" ></td>
						<td><select name="FONT_STYLE_10" id="FONT_STYLE_10"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte10"></span>/40byte</td>
						<td>10</td>
					</tr>
					<tr>
						<th rowspan="10" class="t_c" >[1]하단메시지</th>
						<td colspan="3"><input type="text" id="MSG_11" name="MSG_11" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte11', 40);" ></td>
						<td><select name="FONT_STYLE_11" id="FONT_STYLE_11"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte11"></span>/40byte</td>
						<td>11</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_12" name="MSG_12" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte12', 40);" ></td>
						<td><select name="FONT_STYLE_12" id="FONT_STYLE_12"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte12"></span>/40byte</td>
						<td>12</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_13" name="MSG_13" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte13', 40);" ></td>
						<td><select name="FONT_STYLE_13" id="FONT_STYLE_13"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte13"></span>/40byte</td>
						<td>13</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_14" name="MSG_14" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte14', 40);" ></td>
						<td><select name="FONT_STYLE_14" id="FONT_STYLE_14"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte14"></span>/40byte</td>
						<td>14</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_15" name="MSG_15" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte15', 40);" ></td>
						<td><select name="FONT_STYLE_15" id="FONT_STYLE_15"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte15"></span>/40byte</td>
						<td>15</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_16" name="MSG_16" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte16', 40);" ></td>
						<td><select name="FONT_STYLE_16" id="FONT_STYLE_16"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte16"></span>/40byte</td>
						<td>16</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_17" name="MSG_17" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte17', 40);" ></td>
						<td><select name="FONT_STYLE_17" id="FONT_STYLE_17"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte17"></span>/40byte</td>
						<td>17</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_18" name="MSG_18" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte18', 40);" ></td>
						<td><select name="FONT_STYLE_18" id="FONT_STYLE_18"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte18"></span>/40byte</td>
						<td>18</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_19" name="MSG_19" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte19', 40);" ></td>
						<td><select name="FONT_STYLE_19" id="FONT_STYLE_19"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte19"></span>/40byte</td>
						<td>19</td>
					</tr>
					<tr>
						<td colspan="3"><input type="text" id="MSG_20" name="MSG_20" class="wid1" onkeyUp="CommonJs.displayBytesTxt(this, 'txtbyte20', 40);" ></td>
						<td><select name="FONT_STYLE_20" id="FONT_STYLE_20"><option value="1">보통</option><option value="2">굵게</option></select></td>
						<td><span id="txtbyte20"></span>/40byte</td>
						<td>20</td>
					</tr>
				</tbody>
			</table>	
		</div>
	</form>

</div>
<!--  등록 수정 팝업 영역 끝  -->

</body>
</html>