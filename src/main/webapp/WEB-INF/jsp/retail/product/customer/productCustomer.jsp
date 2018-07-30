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
<title>협력업체관리</title>

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
	설명: 협력업체관리
	version : 1.0
--%> 

<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />	

<!-- rMateGridH5 CSS -->
<link rel="stylesheet" type="text/css" href="/resources/js/rMateGridH5/Assets/rMateH5.css"/> 
<!-- rMateGridH5 라이센스 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/LicenseKey/rMateGridH5License.js" charset="utf-8"></script> 
<!-- rMateGridH5 라이브러리 -->
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/rMateGridH5.js"></script>

<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateStyle.js"></script>

 

<script type="text/javascript" src="/resources/js/page/product/customer/productCustomer.js?ver=20170920_002" charset="utf-8"></script>


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
	    		$("#btn_update").hide();
	    		$("#btn_create").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btn_update").hide();
	    		$("#btn_create").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_read").show();
		    	}else{
		    		$("#btn_read").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#btn_create").show();
		    	}else{
		    		$("#btn_create").hide();
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
				<button type="button" id="btn_create"  class="btn btn_style2" onclick="btn_new()">신규</button>
		    	<button type="button" id="btn_update"  class="btn btn_style2" onclick="btn_save()">저장</button>
				<button type="button" id="btn_read" class="btn btn_style3" onclick="btn_search()"><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 -->
		<div class="search_area"    id="top_search">
			<div class="last">
				<label for="">거래구분</label>
				<select id="S_GRE_GB" name="S_GRE_GB">
					<option value="">전체</option> 
				</select>
				
<!-- 				<button type="button" class="search_btn">검색 아이콘</button> -->

				<label for="">업체상태</label>
				<select id="S_USE_YN" name="S_USE_YN">
					<option value="">전체</option> 
				</select>
				
				<label for="">협력업체명</label>
				<input type="text" id="S_VEN" name="S_VEN" maxlength="" style="width:99px" class="search_txt">
				
<!-- 				<input type="text" id="" name="" maxlength="" class="search_txt"> -->
<!-- 				<button type="button" class="search_btn">검색 아이콘</button>	 -->
			</div>
		</div>
		<!-- //조회폼 영역 -->
		
		<div class="col2 sub_cnt">
			<div class="box_lft">
				<h3 class="bul_arr">협력업체목록</h3>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder1"></div>
					</div>
				</div>			
			</div>
			<div class="box_rgt"  >
				<div>
					<h3 class="bul_arr f_l">협력업체기본정보</h3>
					<button type="button" class="btn btn_style4 f_r" onClick="showProductPop()">취급상품정보</button>
				</div>
				
			 
				<form id="frmBody" name="frmBody">
<!-- 				<table class="tbl_st2 tbl_st3" >   -->
				<table class="tbl_st2" > 
					<colgroup>
						<col width="10%" />
						<col width="16%" />
						<col width="12%" />
						<col width="16%" />
						<col width="10%" />
						<col width="12%" />  
					</colgroup>
					<tbody> 
						<tr>
							<th scope="row" ><em>필수입력항목</em><label>업체구분</label></th>
							<td  >
								<select id="BUSI_FLAG" name="BUSI_FLAG"      class="wid3" style="width:99px"  onChange="chgBusiFlag()">
									<option value="">선택</option>  
								</select>
							</td>
							<th scope="row"><em>필수입력항목</em><label>협력업체코드</label></th>
							<td  >
								<input type="text" id="VEN_CODE" name="VEN_CODE" maxlength="5"  class="wid1"    style="width: 74px;"  onBlur="chgVenCode();" >
								&nbsp;<button type="button" id="btnDup"   name="btnDup"  class="btn btn_style3" onclick="productCustomerVenCodeDup()"><i class="fa fa-search"></i><font size="1">중복검사</font></button>
							</td>
							<th scope="row"><em>필수입력항목</em><label>협력업체명</label></th>
							<td  >
								<input type="text" id="VEN_NAME" name="VEN_NAME" maxlength=""  class="wid1" style="width:129px">
							</td>
						</tr>   
						<tr>
							<th scope="row"><em>필수입력항목</em><label>사업자번호</label></th>
							<td  >
								<input type="text" id="BUSI_NO" name="BUSI_NO" maxlength="12" class="wid1"  style="width: 100px;"  onBlur="chgBusiNo();">
								&nbsp;<button type="button" id="btnBusiNoDup"   name="btnBusiNoDup"  class="btn btn_style3" onclick="productCustomerBusiNoDup()"><i class="fa fa-search"></i><font size="1">중복검사</font></button>
							</td>
							<th scope="row"><em>필수입력항목</em><label>대표자명</label></th>
							<td  >
								<input type="text" id="REP_NAME" name="REP_NAME" maxlength="10" class="wid2">
							</td>	
							<th scope="row"><em>필수입력항목</em><label>이메일</label></th>
							<td  >
								<input type="text" id="REP_MAIL_ID" name="REP_MAIL_ID" maxlength="254" class="wid1" style="width:129px"> 
							</td>
						</tr>     
						<tr>  
							<th scope="row"><em>필수입력항목</em><label>장려금 유무</label></th>
							<td  >
								<select id="JANG_YN" name="JANG_YN" class="wid3" style="width:99px"  onChange="chgJangYn()">
									<option value="">선택</option>  
								</select>
							</td>
							<th scope="row"><em>필수입력항목</em><label>업태</label></th>
							<td  >
								<input type="text" id="UPTAE" name="UPTAE" class="wid2" maxlength="50">
							</td>
							 
							<th scope="row"><em>필수입력항목</em><label>업종</label></th>
							<td  >
								<input type="text" id="UPJONG" name="UPJONG" maxlength="50" class="wid1"  style="width:129px">
							</td>
						</tr> 
						<tr>
							<th scope="row"><em>필수입력항목</em><label>주소</label></th>
							<td  colspan="5">		
								<div class="clear">
									<input type="text" id="POST_NO" name="POST_NO" maxlength="5"  readonly   class="f_l wid2 mar_R4"  style="width:60px; background-color: #F2F2F2;" >
									<button type="button" class="search_btn" onClick="execDaumPostcode( 'POST_NO','ADDR' , 'ADDR_DTL' );">검색 아이콘</button>
									  
									<input type="text" id="ADDR" name="ADDR" maxlength="100" class="f_l wid4" style="width:240px" >
									<input type="text" id="ADDR_DTL" name="ADDR_DTL" maxlength="100" class="f_l wid4 wid_marL" style="width:240px"  >
								</div>	
<!-- 								<div class="clear mar_T4">					 -->
									
<!-- 								</div>	 -->
							</td>  
						</tr>  
						<tr> 
							<th scope="row"><em>필수입력항목</em><label>전화번호</label></th>
							<td >
								<select id="TEL_NO1" name="TEL_NO1" class="wid3">
									<option value="">선택</option>  
								</select>
								<input type="text" id="TEL_NO2" name="TEL_NO2" maxlength="4" class="wid3 wid_marL" style="width:45px" numberonly="true">
								<input type="text" id="TEL_NO3" name="TEL_NO3" maxlength="4" class="wid3 wid_marL" style="width:45px" numberonly="true">
							</td>
							 
							 
							<th scope="row"><label>FAX번호</label></th>
							<td>
								<select id="FAX_NO1" name="FAX_NO1" class="wid3">
									<option value="">선택</option>  
								</select>
								<input type="text" id="FAX_NO2" name="FAX_NO2" maxlength="4" class="wid3 wid_marL"  style="width:45px"  numberonly="true"  >
								<input type="text" id="FAX_NO3" name="FAX_NO3" maxlength="4" class="wid3 wid_marL"   style="width:45px" numberonly="true"  >
							</td>
						    
							<th scope="row"><em>필수입력항목</em><label>전표분할유무</label></th>
							<td >
								<select id="SLIP_DIV_YN" name="SLIP_DIV_YN" class="wid3"  style="width:99px"> 
								</select>
						    </td>
							 
							 
						</tr> 
						<tr>  
							
							<th scope="row"><em>필수입력항목</em><label>거래시작일</label></th>
							<td >
								<input type="text"   id="ENTR_DT" name="ENTR_DT"  class="wid2 datepicker"    />
							</td> 
							
							
						    
							<th scope="row"><label>거래종료일</label></th>
							<td>
								 <input type="text"   id="OUT_DT" name="OUT_DT"    class="wid2 datepicker"    />
							</td>
							
							<th scope="row"></th>
							<td >
						    </td>
						    
						</tr> 
					</tbody>
				</table>	
				<h3 class="bul_arr tit_top f_l">결제정보</h3>
				<table class="tbl_st2" > 
					<colgroup>
						<col width="13%" />
						<col width="15%" />
						<col width="12%" />
						<col width="14%" />
						<col width="10%" />
						<col width="12%" />  
						<col width="10%" />
						<col width="12%" />   
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><em>필수입력항목</em><label>결제은행</label></th>
							<td>
								<select id="BANK_CODE" name="BANK_CODE" class="wid1" style="width:90px">
									<option value="">선택</option>  
								</select>
							</td>
							<th scope="row"><em>필수입력항목</em><label>결제계좌</label></th>
							<td><input type="text" id="BANK_ACC_NO" name="BANK_ACC_NO" class="wid1" maxlength="20" style="width:150px"></td>
							<th scope="row"><em>필수입력항목</em><label>예금주</label></th>
							<td><input type="text" id="BANK_ACOWN" name="BANK_ACOWN" class="wid1" maxlength="10" style="width:90px"></td>
							<th scope="row"><em>필수입력항목</em><label>거래구분</label></th>
							<td>
								<select id="GRE_GB" name="GRE_GB" class="wid1" style="width:90px" onChange="chgGreGb()">
									<option value="">선택</option>  
								</select>
							</td>
						</tr>     
						<tr> 
							<th scope="row"><em>필수입력항목</em><label>수수료율</label></th>
							<td>
								<input type="text" id="SALE_RATE" name="SALE_RATE" class="wid1"  value="0" maxlength="6" style="width:90px;text-align: right;"  >
							</td>
							<th scope="row"><label>여신한도</label></th>
							<td><input type="text" id="CREDIT_LIMIT" name="CREDIT_LIMIT"  value="0" numberOnly   class="wid1" maxlength="10" style="width:150px;text-align: right;"></td>					
							<th scope="row"><em>필수입력항목</em><label>원가노출</label></th>
							<td>
								<select id="SCM_PUR_OPN" name="SCM_PUR_OPN" class="wid1" style="width:90px">
									<option value="">선택</option>  
								</select>
							</td>
							<th scope="row"><em>필수입력항목</em><label>발주유형</label></th>
							<td>
								<select id="ORDER_TYPE" name="ORDER_TYPE" class="wid1" style="width:90px">
									<option value="">선택</option>  
								</select>
							</td>
						</tr> 
						<tr> 
							
							<th scope="row"><em>필수입력항목</em><label>발주가능요일</label></th>
							<td colspan="3"> 
								 <input type="hidden" id="ORD_TERM" name="ORD_TERM" />
								 <label for="" class="col_red"><b>일 </b></label><input type="checkbox" id="ORD_TERM_CHK" name="ORD_TERM_CHK" checked="checked"/>
								 <label for=""><b> &nbsp; &nbsp;월 </b></label><input type="checkbox" id="ORD_TERM_CHK" name="ORD_TERM_CHK" checked="checked"/>
								 <label for=""><b> &nbsp; &nbsp;화 </b></label><input type="checkbox" id="ORD_TERM_CHK" name="ORD_TERM_CHK"  checked="checked"/>
								 <label for=""><b> &nbsp; &nbsp;수 </b></label><input type="checkbox" id="ORD_TERM_CHK" name="ORD_TERM_CHK"  checked="checked" />
								 <label for=""><b> &nbsp; &nbsp;목 </b></label><input type="checkbox" id="ORD_TERM_CHK" name="ORD_TERM_CHK"  checked="checked"/>
								 <label for=""><b> &nbsp; &nbsp;금 </b></label><input type="checkbox" id="ORD_TERM_CHK" name="ORD_TERM_CHK" checked="checked"/>
								 <label for="" class="col_blu"><b> &nbsp; &nbsp;토 </b></label><input type="checkbox" id="ORD_TERM_CHK" name="ORD_TERM_CHK"  checked="checked"/>
							</td> 
							<th scope="row"><label>등록일</label></th>
							<td align=center>
<!-- 								 <label id="IDATE" name="IDATE"></label>	 -->
								 <input type="text" id="IDATE" name="IDATE" class="wid1"  readonly style="width:90px;background-color: #F2F2F2;text-align: center;">
								 <label id="IEMP_NO" name="IEMP_NO"   style="display:none;" ></label> 
								
							</td>
							<th scope="row"><label>수정일</label></th>
							<td  align=center>
<!-- 								 <label id="UDATE" name="UDATE"></label>	 -->
								 <input type="text" id="UDATE" name="UDATE" class="wid1"  readonly style="width:90px;background-color: #F2F2F2;text-align: center;">
								 <label id="UEMP_NO" name="UEMP_NO"  style="display:none;" ></label> 	
															
						    </td>
							 
						</tr>
						 					
					</tbody>
				</table>
				<div class="tit_top clear">
				<h3 class="bul_arr f_l">지불조건등록</h3>	
					<div class="f_r">
<!-- 					<button type="button" class="btn btn_style4" onclick="getXMLTest()">그리드저장시 XML 리턴 테스트</button> -->
							<button type="button" class="btn btn_style4" onclick="gridHolder2AddRow()">행추가</button>
							<button type="button" class="btn btn_style4" onclick="gridHolder2DelRow()">행삭제</button>
					</div>	
				</div>		
				<form id="gridHolder2InputForm" name="gridHolder2InputForm">
				<table class="tbl_st2 tbl_st3">
					<tbody> 
						<tr>
							
							<th scope="row"><em>필수입력항목</em><label>지불주기</label></th>
							<td>
								<select id="PAY_CON" name="PAY_CON" class="wid2" onchange="chgPay('PAY_CON');"> 
									<option value="">선택</option>  
								</select>
								<input type="hidden" id="PAY_CON_MGMT_ENTRY_1" name="PAY_CON_MGMT_ENTRY_1">
							</td>
							
							<th scope="row"><em>필수입력항목</em><label>지불차수</label></th>
							<td>
								<select id="PAY_SEQ" name="PAY_SEQ" class="wid2" onchange="chgPay('PAY_SEQ');">
									<option value="">선택</option>  
								</select>
								<input type="hidden" id="PAY_SEQ_MGMT_ENTRY_1" name="PAY_SEQ_MGMT_ENTRY_1">
								<input type="hidden" id="PAY_SEQ_MGMT_ENTRY_2" name="PAY_SEQ_MGMT_ENTRY_2">
								<input type="hidden" id="PAY_SEQ_MGMT_ENTRY"   name="PAY_SEQ_MGMT_ENTRY">
							</td>
							
							<th scope="row"><em>필수입력항목</em><label>지불조건</label></th>
							<td colspan="3">
								<select id="PAY_TYPE" name="PAY_TYPE" class="wid2">
<!-- 									<option value="">선택</option>   -->
								</select>
							</td> 
							<th scope="row"><em>필수입력항목</em><label>사용여부</label></th>
							<td colspan="3">
								<select id="USE_YN" name="USE_YN" class="wid2">
<!-- 									<option value="">선택</option>   -->
									<option value="Y">사용</option> 
									<option value="N">미사용</option> 
								</select>
							</td>
							<th scope="row"><label>비고</label></th>
							<td colspan="7"><input type="text" id="REMARK" name="REMARK" class="wid1" style="width:105px" maxlength="50"></td>
						</tr>					
					</tbody>
				</table>
				</form>
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder2"></div>
					</div>
				</div>		
				<div class="tit_top clear">
					<h3 class="bul_arr f_l">장려율등록</h3>
					<div class="f_r">
						<button type="button" class="btn btn_style4"  id="JANG_BTN_ADD" name="JANG_BTN_ADD" onclick="gridHolder3AddRow()">행추가</button>
						<button type="button" class="btn btn_style4"  id="JANG_BTN_DEL" name="JANG_BTN_DEL" onclick="gridHolder3DelRow()">행삭제</button>
					</div>
				</div>
				<div class="content">
					<div id="gridHolder3"></div>
				</div>
				
				<div class="tit_top clear">
					<h3 class="bul_arr f_l">장려제외상품등록</h3>
					<div class="f_r">
						<button type="button" class="btn btn_style4" onclick="gridHolder4AddRow()">행추가</button>
						<button type="button" class="btn btn_style4" onclick="gridHolder4DelRow()">마지막행 삭제</button>
					</div>
				</div>	
				<div class="content">
					<div id="gridHolder4"></div>
				</div>				

				<div class="tit_top clear">
					<h3 class="bul_arr f_l">담당자정보등록</h3>
					<div class="f_r">
						<button type="button" class="btn btn_style4" onclick="gridHolder5AddRow()">행추가</button>
						<button type="button" class="btn btn_style4" onclick="gridHolder5DelRow()">행삭제</button>
					</div>
				</div>	
				<div class="content">
					<div id="gridHolder5"></div>
				</div>			 
			</div>
			</form>
		</div>
	</div>
	<!-- //Content : 본문 영역 -->
</body>

	

<!-- 	 상품정보 리스트 팝업 영역 시작  -->
<div id="show_product_pop"  >
	<header id="pop_head" class="clear">
		<div class="f_r">  
			
		</div>
	</header> 
	<form action="">
		<div id="pop_wrap">  
				<header id="pop_head" class="clear">
					<h3 class="bul_arr f_l"> 취급 상품 리스트 <label id="SHOW_VEN_NAME" name="SHOW_VEN_NAME"></label> </h3> 
						
					 <div class="last"  style="text-align:right">
					       점포선택
					 	<select id="STR_CODE" name="STR_CODE">
							<option value="">전체</option> 
						</select>
						
						포인트적립여부 
						<select id="POINT_SAVE" name="POINT_SAVE">
							<option value="">전체</option> 
							<option value="Y">적립</option> 
							<option value="N">미적립</option> 
						</select>
						
						상품명
						    <input type="hidden" id="SCAN_CODE" name="SCAN_CODE"   >
							<input type="hidden" id="ITM_CODE" name="ITM_CODE"   >
							<input type="text" id="ITM_NAME" name="ITM_NAME" class="search_txt" onBlur="chgItmName()">  
							 
							<img src="/resources/img/common/search_ico.png" onclick="btn_comm_store_search()" >
<!-- 							<button type="button" class="search_btn"   >검색 아이콘</button> -->
						
					 	 <button type="button" id="btn_update"  class="btn btn_style2" onclick="venProductExcelDown()" >엑셀다운로드</button>
						 <button type="button" id="btn_update"  class="btn btn_style2" onclick="venProductList()" >조회</button>
						 <button type="button" id="btn_update"  class="btn btn_style2" onclick="btn_pop_close()" >닫기</button>
					 </div>
				</header>
<!-- 				<div class="search_area" id="top_search11"> -->
<!-- 					<div class="last"  style="text-align:right"> -->
						
<!-- 					</div>  -->
<!-- 				</div>  -->
				<div class="content">
					<div id="gridHolder6"></div>
				</div> 
		</div>
	</form>

</div>
<!-- 	  상품정보 리스트 팝업 영역  끝  -->

<!-- 다음 우편번호 레이어 시작 -->
<div id="daumZipLayer" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;">
	<img src="http://i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
</div>
<!-- 다음 우편번호 레이어 끝 -->
 
<script src="/resources/js/daumZip.js"></script>
 

</html>

