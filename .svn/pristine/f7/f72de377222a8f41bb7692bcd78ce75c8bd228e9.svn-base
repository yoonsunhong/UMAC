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
<title>엑셀발주(바이어)</title>

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
	설명: 점포 별 상품  관리
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
 
<!-- <script src="/resources/js/xlsx.core.min.js"></script>  -->
<!-- <script src="/resources/js/xls.core.min.js"></script> -->


<script src="/resources/js/xlsx/shim.js"></script>
<script src="/resources/js/xlsx/jszip.js"></script>
<script src="/resources/js/xlsx/xlsx.js"></script>
<script>
var X = XLSX;
var XW = {
	/* worker message */
	msg: 'xlsx',
	/* worker scripts */
	rABS: './xlsxworker2.js',
	norABS: './xlsxworker1.js',
	noxfer: './xlsxworker.js'
};

var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
if(!rABS) {
	document.getElementsByName("userabs")[0].disabled = true;
	document.getElementsByName("userabs")[0].checked = false;
}

var use_worker = typeof Worker !== 'undefined';
if(!use_worker) {
	document.getElementsByName("useworker")[0].disabled = true;
	document.getElementsByName("useworker")[0].checked = false;
}

var transferable = use_worker;
if(!transferable) {
	document.getElementsByName("xferable")[0].disabled = true;
	document.getElementsByName("xferable")[0].checked = false;
}

var wtf_mode = false;

function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
}

function ab2str(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint16Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint16Array(data.slice(l*w)));
	return o;
}

function s2ab(s) {
	var b = new ArrayBuffer(s.length*2), v = new Uint16Array(b);
	for (var i=0; i != s.length; ++i) v[i] = s.charCodeAt(i);
	return [v, b];
}

function xw_noxfer(data, cb) {
	var worker = new Worker(XW.noxfer);
	worker.onmessage = function(e) {
		switch(e.data.t) {
			case 'ready': break;
			case 'e': console.error(e.data.d); break;
			case XW.msg: cb(JSON.parse(e.data.d)); break;
		}
	};
	var arr = rABS ? data : btoa(fixdata(data));
	worker.postMessage({d:arr,b:rABS});
}

function xw_xfer(data, cb) {
	var worker = new Worker(rABS ? XW.rABS : XW.norABS);
	worker.onmessage = function(e) {
		switch(e.data.t) {
			case 'ready': break;
			case 'e': console.error(e.data.d); break;
			default: xx=ab2str(e.data).replace(/\n/g,"\\n").replace(/\r/g,"\\r"); console.log("done"); cb(JSON.parse(xx)); break;
		}
	};
	if(rABS) {
		var val = s2ab(data);
		worker.postMessage(val[1], [val[1]]);
	} else {
		worker.postMessage(data, [data]);
	}
}

function xw(data, cb) {
	transferable = document.getElementsByName("xferable")[0].checked;
	if(transferable) xw_xfer(data, cb);
	else xw_noxfer(data, cb);
}

function get_radio_value( radioName ) {
	var radios = document.getElementsByName( radioName );
	for( var i = 0; i < radios.length; i++ ) {
		if( radios[i].checked || radios.length === 1 ) {
			return radios[i].value;
		}
	}
}

function to_json(workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}

function to_csv(workbook) {
	var result = [];
	workbook.SheetNames.forEach(function(sheetName) {
		var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
		if(csv.length > 0){
			result.push("SHEET: " + sheetName);
			result.push("");
			result.push(csv);
		}
	});
	return result.join("\n");
}

function to_formulae(workbook) {
	var result = [];
	workbook.SheetNames.forEach(function(sheetName) {
		var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
		if(formulae.length > 0){
			result.push("SHEET: " + sheetName);
			result.push("");
			result.push(formulae.join("\n"));
		}
	});
	return result.join("\n");
}

var tarea = document.getElementById('b64data');
function b64it() {
	if(typeof console !== 'undefined') console.log("onload", new Date());
	var wb = X.read(tarea.value, {type: 'base64',WTF:wtf_mode});
	process_wb(wb);
}

function process_wb(wb) {
	var output = "";
	switch(get_radio_value("format")) {
		case "json":
			output = JSON.stringify(to_json(wb), 2, 2);
			break;
		case "form":
			output = to_formulae(wb);
			break;
		default:
		output = to_csv(wb);
	}
	if(out.innerText === undefined) out.textContent = output;
	else out.innerText = output;
	if(typeof console !== 'undefined') console.log("output", new Date());
}

var drop = document.getElementById('drop');
function handleDrop(e) {
	e.stopPropagation();
	e.preventDefault();
	rABS = document.getElementsByName("userabs")[0].checked;
	use_worker = document.getElementsByName("useworker")[0].checked;
	var files = e.dataTransfer.files;
	var f = files[0];
	{
		var reader = new FileReader();
		var name = f.name;
		reader.onload = function(e) {
			if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
			var data = e.target.result;
			if(use_worker) {
				xw(data, process_wb);
			} else {
				var wb;
				if(rABS) {
					wb = X.read(data, {type: 'binary'});
				} else {
					var arr = fixdata(data);
					wb = X.read(btoa(arr), {type: 'base64'});
				}
				process_wb(wb);
			}
		};
		if(rABS) reader.readAsBinaryString(f);
		else reader.readAsArrayBuffer(f);
	}
}

function handleDragover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
}

// if(drop.addEventListener) {
// 	drop.addEventListener('dragenter', handleDragover, false);
// 	drop.addEventListener('dragover', handleDragover, false);
// 	drop.addEventListener('drop', handleDrop, false);
// }


var xlf = document.getElementById('xlf');
function handleFile(e) {
	rABS = document.getElementsByName("userabs")[0].checked;
	use_worker = document.getElementsByName("useworker")[0].checked;
	var files = e.target.files;
	var f = files[0];
	{
		var reader = new FileReader();
		var name = f.name;
		reader.onload = function(e) {
			if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
			var data = e.target.result;
			if(use_worker) {
				xw(data, process_wb);
			} else {
				var wb;
				if(rABS) {
					wb = X.read(data, {type: 'binary'});
				} else {
				var arr = fixdata(data);
					wb = X.read(btoa(arr), {type: 'base64'});
				}
				process_wb(wb);
			}
		};
		if(rABS) reader.readAsBinaryString(f);
		else reader.readAsArrayBuffer(f);
	}
}

// if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
</script>
    

<script type="text/javascript" src="/resources/js/page/order/store/orderStoreRegisterExcelBuyer.js?ver=20dd1ss707040122dsssss22sw2swwss2sssss003s11_1111" charset="utf-8"></script>
 
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
	    		$("#btn_search").hide();
	    		$("#btn_order").hide();
	    		$("#btn_clear").hide();
	    		$("#btn_del").hide();
	    		$("#btn_save").hide();
	    		$("#btn_excel_load").hide();
	    		$("#btn_excel_form").hide();
	    		$("#btn_itm_add").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_search").hide();
	    		$("#btn_order").hide();
	    		$("#btn_clear").hide();
	    		$("#btn_del").hide();
	    		$("#btn_save").hide();
	    		$("#btn_excel_load").hide();
	    		$("#btn_excel_form").hide();
	    		$("#btn_itm_add").hide();
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
		    		$("#btn_itm_add").show();
		    	}else{
		    		$("#btn_clear").hide();
		    		$("#btn_itm_add").hide();
		    	}
		    	
		    	//저장버튼 제어 
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_save").show();
		    	}else{
		    		$("#btn_save").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#btn_del").show();
		    	}else{
		    		$("#btn_del").hide();
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#btn_excel_form").show();
		    	}else{
		    		$("#btn_excel_form").hide();
		    	}
		    	
		    	//엑셀업로드버튼 제어
		    	if(data[0].AUTH_EXCEL_UPLOAD == 'Y'){
		    		$("#btn_excel_load").show();
		    	}else{
		    		$("#btn_excel_load").hide();
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
		    		$("#btn_order").show();
		    	}else{
		    		$("#btn_order").hide();
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
<!-- 			<button type="button" id="btn_clear"   name="btn_clear"   class="btn btn_style2"  onclick="btn_report('sample.do')">REPORT TEST</button> -->
				<button type="button" id="btn_order"   name="btn_order"   class="btn btn_style2"  onclick="btn_order()">발주생성</button>
				<button type="button" id="btn_excel_fresh" name="btn_excel_fresh" class="btn btn_style4"   style="display:none" onclick="r2OrderExcelData()" >엑셀 다운</button>
		    	<button type="button" id="btn_clear"   name="btn_clear"   class="btn btn_style2"  onclick="btn_clear()">신규</button>
		    	<button type="button" id="btn_del"   name="btn_del"   class="btn btn_style2"  onclick="btn_del()">삭제</button>
		    	<button type="button" id="btn_save"   name="btn_save"   class="btn btn_style2"  onclick="btn_qty_save()">저장</button>
<!-- 		    <button type="button" id="btn_save2"    name="btn_save2"    class="btn btn_style2"  onclick="btn_save();">엑셀 저장(2)</button> -->
				<button type="button" id="btn_search"  name="btn_search"  class="btn btn_style3"  onclick="btn_search()"><i class="fa fa-search"></i>조회</button>
			</div>
		</div>
		
		<!-- 조회폼 영역 시작 -->
		<form id="frmSearch" name="frmSearch">
		 
	 	<input type="hidden" id="SESSION_STR_CODE" name="SESSION_STR_CODE" value="${sessionScope.STR_CODE }"> 
	 	<input type="hidden" id="SESSION_ROLE_ID"  name="SESSION_ROLE_ID"  value="${sessionScope.ROLE_ID}"   > 
				 			
		<table class="tbl_st2">
			<colgroup>   
				<col width="7%" />
				<col width="11%" />  
				<col width="7%" /> 
				<col width="11%" />  
				<col width="7%" />
				<col width="15%" />  
				<col width="7%" /> 
				<col width="11%" />  
				<col width="9%" />
				<col width="33%" /> 
			</colgroup>			
			<tbody>
				<tr> 
					
					<th scope="row"><em>필수입력항목</em>발주일자</th>
					<td>
						<input type="text" id="ORD_DT" name="ORD_DT" class="datepicker wid2" style="float:left;" readonly   >
					</td> 
					
					<th scope="row">상품구분</th>
					<td>
						   <!-- 일반 상품: 생식을 제외한 상품이여서 코드에 없는 9를 넣었음 -->
						   <select id="ITM_GB" name="ITM_GB" class="wid2">
								<option value="">전체</option> 
								<option value="1">생식상품</option> 
								<option value="9">일반상품</option>  
						   </select>
					</td> 
				    
					<th scope="row">매입처</th>
					<td>
							<input type="hidden" id="VEN_CODE" name="VEN_CODE"     >
							<input type="text" id="VEN_NAME" name="VEN_NAME" class="wid4 wid_marL" style="width:125px" onBlur="clearVen();">
							<button type="button" class="search_btn" onclick="btn_comm_supply_search()">검색 아이콘</button>
					</td> 
					<th scope="row"><em>필수입력항목</em>매입구분</th>
					<td>
						    <select id="PUR_GB" name="PUR_GB" class="wid2"   onChange="chgPurGb()">  
						    </select>
					</td>
					<th scope="row">배송구분</th>
					<td>
						    <select id="ROUTE_GB" name="ROUTE_GB" class="wid2">
								<option value="">전체</option>  
						    </select>
					</td>
					
				</tr>  
				<tr>
					<th scope="row">대분류</th>
					<td>
						    <select id="LRG_CODE" name="LRG_CODE" class="wid2"  style="width:90px"  >
								<option value="">전체</option>   
							</select> 
					</td>  
				    <th scope="row">발주구분</th>
					<td>
					 		<select id="REG_PATH" name="REG_PATH" class="wid2"> 
					 		<option value="">전체</option>  
						    </select>
					</td>
				    <th scope="row">처리구분</th>
					<td>
						    <select id="CFM_YN" name="CFM_YN" class="wid2">
								<option value="">전체</option>   
								<option value="Y">처리</option>  
								<option value="N">미처리</option> 
						    </select>
					</td> 
 					<th scope="row"><em>필수입력항목</em>엑셀</th>
					<td colspan=3>
							<input type="file" id="excelFile" name="excelFile"   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" >
							<div class="f_r"> 
					    		<button type="button" id="btn_excel_load"   name="btn_excel_load"   class="btn btn_style2"  onclick="btn_load();">엑셀업로드</button>
					    	   
					    	</div>
					</td> 
					
					
					
				</tr>  
			    
<!-- 			    <tr>  -->
<!-- 					<th scope="row"> -->
<!-- 						<div  id="DIV_ITM_GB_UPLOAD_TITLE" style="display: none;"  ><em>필수입력항목</em>업로드구분</div> -->
<!-- 					</th> -->
<!-- 					<td> -->
<!-- 						<div  id="DIV_ITM_GB_UPLOAD" style="display: none;"  onchange="chgItmGbUpload()" > -->
<!-- 						   <select id="ITM_GB_UPLOAD" name="ITM_GB_UPLOAD" class="wid2"  > -->
<!-- 								<option value="">선택</option>  -->
<!-- 								<option value="1">생식상품</option>  -->
<!-- 								<option value="9">비생식상품</option>   -->
<!-- 						   </select> -->
<!-- 						</div>  -->
<!-- 					</td>  -->
<!-- 					<th scope="row">  -->
<!-- 						<div  id="DIV_CENTA_CODE_TITLE" style="display: none;"  ><em>필수입력항목</em>물류센터</div> -->
<!-- 					</th> -->
<!-- 					<td colspan="7"> -->
<!-- 						<div  id="DIV_CENTA_CODE" style="display: none;"  > -->
<!-- 							<select id="CENTA_CODE" name="CENTA_CODE" class="wid2"  > -->
<!-- 								<option value="">선택</option>    -->
<!-- 						    </select> -->
<!-- 						</div> -->
<!-- 					</td>  -->
<!-- 				</tr>  -->
				 
				 
				  
				
				
			</tbody>
		</table>
		</form>
		<!-- //조회폼 영역 끝 -->
		
		<!-- 그리드 영역 -->
<!-- 		<h3 class="bul_arr">상품발주관리</h3> -->
<!-- 		<p class="t_r">* 원가단가: 세액포함</p> -->

		<div class="tit_top clear">
			<h3 class="bul_arr f_l">엑셀발주</h3>	 
			<div class="f_r">   
					 
					 
<style type="text/css">
 <!--
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:   gray; 
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    gray;
   opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    gray;
   opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:    gray;
} 
 
 -->
</style> 		 

					 
					 
					 
					 
					 
					<button type="button" id="btn_excel_form" name="btn_excel_form" class="btn btn_style4"  style="display:none" onclick="excelDownload()" >발주엑셀양식다운로드</button>
					
					&nbsp;&nbsp;
					
					<input type="hidden" id="S_ITM_GB" name="S_ITM_GB"   >
					<input type="hidden" id="GRE_GB" name="GRE_GB"   >
					<input type="hidden" id="SCAN_CODE" name="SCAN_CODE"   >
					<input type="text"   id="ITM_NAME"  name="ITM_NAME" class="search_txt"   style="text-align:center;"  placeholder="추가 발주상품 검색"   >  
					<button type="button" class="search_btn"     onclick="btn_comm_product_search()"><img src="/resources/img/common/search_ico.png"></button>
					<input type="text"   id="ORD_QTY"      name="ORD_QTY"    numberOnly  class="search_txt"  maxlength=5  style="text-align:center;width:50px" placeholder="수량" > 
					<button type="button" id="btn_itm_add" class="btn btn_style4"  onclick="btn_itm_add()">추가</button>
					
	 			</div>	
		</div>
		<div class="sec_grid">
			<div class="content">
				<div id="gridHolder1"></div>
			</div>
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
 
 
<!-- <script src="/resources/js/daumZip.js"></script> -->
 

</html>

