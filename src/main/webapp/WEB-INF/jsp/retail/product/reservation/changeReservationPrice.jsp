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
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/jszip.min.js"></script>
<script type="text/javascript" src="/resources/js/rMateGridH5/JS/xlsx.min.js"></script>
<%--
	설명: 긴급매가변경
		
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-04-27    문희훈       초기작성 
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
<script type="text/javascript" src="/resources/js/page/product/reservation/changeReservationPrice.js?ver=20180410_000" charset="utf-8"></script>
<!-- 공통 팝업 -->
<jsp:include page="/WEB-INF/jsp/retail/commonPopup/commPop.jsp" />	
</head>
 <script>
var USER_ID = "${sessionScope.ID}";
var STR_CODE = "${sessionScope.STR_CODE}";
var STR_NAME = "${sessionScope.STR_NAME}";
</script>

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
	    		$("#btn_excel").hide();
	    		$("#tab1_new").hide();
	    		$("#tab1_save").hide();
	    		$("#tab1_search").hide();
	    		$("#btn_excel_load").hide();
	    		$("#btn_excel_download").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_excel").hide();
	    		$("#tab1_new").hide();
	    		$("#tab1_save").hide();
	    		$("#tab1_search").hide();
	    		$("#btn_excel_load").hide();
	    		$("#btn_excel_download").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#tab1_search").show();
		    	}else{
		    		$("#tab1_search").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#tab1_new").show();
		    	}else{
		    		$("#tab1_new").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#tab1_save").show();
		    	}else{
		    		$("#tab1_save").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		
		    	}else{
		    	
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#btn_excel_download").show();
		    		$("#btn_excel").show();
		    	}else{
		    		$("#btn_excel_download").hide();
		    		$("#btn_excel").hide();
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
		    		
		    	}else{
		    		
		    	}
	    	}
	    	
	    	//관리구분별 점포조회권한설정
			if(data[0].ORG_TYPE == "3") {
				//점포조회조건 제어.
				$("#P_STR_NAME").val(loadData.STR_CODE);
				$("#P_STR_NAME").prop("disabled", true);
				fnStrChange("F");
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
			<input type="hidden" id="VALID_YN" name="VALID_YN" />
			<div class="btn_area clear">
				<button type="button" class="btn btn_style1 f_l"><img src="resources/img/common/help_ico.png"><spring:message code="btnHelp"/></button>
				<div class="advice p_a">
					<h4>information</h4>
					<pre id="helpText"></pre>
					<a href="" class="close_btn p_a">도움말 닫기</a>
				</div>
				<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
				<div class="tab_area1 f_r">
					<div>
						<!-- 권한에 따른 버튼 show/hide -->
						<button type="button" id="btn_excel" class="btn btn_style2"  onclick="btnExcelDown()"><spring:message code="btnExcelDown"/></button>
					    <button type="button" id="tab1_new"  class="btn btn_style2"  onclick="btn_new()"><spring:message code="btnNew"/></button>
					    <button type="button" id="tab1_save" class="btn btn_style2"  onclick="btn_save()"><spring:message code="btnSave"/></button>
					    <button type="button" id="tab1_search" class="btn btn_style3"  onclick="btn_search()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
					</div>
				</div>
			</div>
			<!-- 조회폼 영역 -->
			<div class="tab_area2">
				<div class="search_area" id="top_search">
					<div class="last">
						<label for=""><em>필수입력사항</em><spring:message code="storNm"/></label>
						<select id="P_STR_NAME" name="P_STR_NAME" style="width:initial;margin-right:0;" onchange="fnStrChange('');"></select>
						<input type="text" id="P_STR_CODE" name="P_STR_CODE" class="wid2" disabled>	
						
						<label for=""><em>필수입력사항</em><spring:message code="changedDay"/></label>
						<input type="text" class="datepicker1 datepicker" id="P_APPL_STR_DT" name="P_APPL_STR_DT"> ~ 
						<input type="text" class="datepicker2 datepicker" id="P_APPL_END_DT" name="P_APPL_END_DT">						
						
						<label for=""><spring:message code="itmName"/></label>		
						<input type="text" id="P_ITM_CODE" name="P_ITM_CODE" class="wid2 search_txt" disabled="">			
						<input type="text" id="P_ITM_NAME" name="P_ITM_NAME" class="wid7 search_txt">
						<button type="button" class="search_btn" onclick="btn_comm_product_search()">검색 아이콘</button>
					</div>
				</div>				
			</div>
			<!-- //조회폼 영역 -->
			<span style="float : left">
				<h3 class="bul_arr">예약매가등록</h3>
			</span>
			<span style="float : right">
				<input type="file" id="excelFile" name="excelFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" >
				<div class="f_r" style="margin-left: 5px;"> 
		    		<button type="button" id="btn_excel_load" name="btn_excel_load" class="btn btn_style3" onclick="btn_load();">엑셀업로드</button>
		    	</div>
		    	<div class="f_r" > 
		    		<button type="button" id="btn_excel_download" name="btn_excel_download" class="btn btn_style2" onclick="btn_download();">엑셀 업로드샘플</button>
		    	</div>
			</span>
			<table class="tbl_st2">
				<colgroup>
					<col style="width:9%">
					<col>
					<col style="width:9%">
					<col>					
					<col style="width:9%">
					<col>					
					<col style="width:9%">
					<col>					
				</colgroup>
				<tr>
					<th><spring:message code="storNm"/></th>
					<td>
						<input type="hidden" id="ADD_STR_CODE" name="ADD_STR_CODE" class="wid2" disabled>
						<input type="text" id="ADD_STR_NAME" name="ADD_STR_NAME" class="wid2" disabled style="text-align: center;">
					</td>
					<th><em>필수입력사항</em><spring:message code="itmName"/></label></th>
					<td colspan="3">
						<input type="hidden" id="ADD_ITM_CODE" name="ADD_ITM_CODE" class="wid2" disabled >
						<input type="text" id="ADD_SCAN_CODE" name="ADD_SCAN_CODE" class="wid2" disabled>
						<input type="text" id="ADD_ITM_NAME" name="ADD_ITM_NAME" class="wid7 wid_marL" style="width:180px;">
						<button type="button" class="search_btn" onclick="btn_add_product_search()" >검색 아이콘</button>
 					</td>					
					<th><spring:message code="taxGb"/></th>
					<td>
						<input type="text" id="ADD_TAX_GB" name="ADD_TAX_GB" class="wid2" disabled style="text-align: center;">
					</td>					
				</tr>
				<tr>
					<th><em>필수입력사항</em>적용일자</th>
					<td>
						<input type="text" class="datepicker3 datepicker" id="ADD_APPL_DT" name="ADD_APPL_DT">
					</td>
					<th><em>필수입력사항</em>변경매가</th>
					<td>
						<input type="text" id="ADD_CHG_SPRC" name="ADD_CHG_SPRC" class="wid2" style="text-align: center;">
					</td>
					<th>변경원가</th>
					<td>
						<input type="text" id="ADD_CHG_WPRC" name="ADD_CHG_WPRC" class="wid2" style="text-align: center;">
					</td>
					<th>변경원가부가세</th>
					<td>
						<input type="text" id="ADD_CHG_WVAT" name="ADD_CHG_WVAT" class="wid2" style="text-align: center;">
					</td>
				</tr>
				<tr>
					<th><spring:message code="supply"/></th>
					<td><input type="text" id="ADD_VEN_NAME" name="ADD_VEN_NAME" class="wid2" disabled style="width:180px;text-align: center;"></td>
					<th><spring:message code="sprc"/></th>
					<td><input type="text" id="ADD_SPRC" name="ADD_SPRC" class="wid2" disabled style="text-align: center;"></td>	
					<th><spring:message code="baseWprc"/></th>
					<td><input type="text" id="ADD_WPRC" name="ADD_WPRC" class="wid2" disabled style="text-align: center;"></td>
					<th>기준부가세</th>
					<td><input type="text" id="ADD_WVAT" name="ADD_WVAT" class="wid2" disabled style="text-align: center;"></td>
				</tr>	
				<tr>
					<th><spring:message code="subCategoryName"/></th>
					<td>
						<input type="text" id="ADD_CLS_NAME" name="ADD_CLS_NAME" class="wid2" disabled style="text-align: center;">
					</td>
					<th><spring:message code="inputName"/></th>
					<td>
						<input type="text" id="ADD_IEMP_NM" name="ADD_IEMP_NM" class="wid2" disabled style="text-align: center;">
					</td>
					<th><spring:message code="iDateTime"/></th>
					<td colspan="3">
						<input type="text" id="ADD_IDATE" name="ADD_IDATE" class="wid2" disabled style="text-align: center; width:180px;">
					</td>				
					<%-- <th><spring:message code="modifier"/></th>
					<td><input type="text" id="ADD_UEMP_NM" name="ADD_UEMP_NM" class="wid2" disabled style="text-align: center;"></td>					
					<th>수정일시</th>
					<td><input type="text" id="ADD_UDATE" name="ADD_UDATE" class="wid2" disabled style="text-align: center; width:180px;"></td> --%>									
			</tr>				
			</table>
			<div class="sec_grid">
				<div class="content">
					<h3 class="bul_arr tit_top">예약매가등록현황</h3>
					<div id="gridHolder1"></div>
				</div>
				<!-- //탭종료 -->
			</div>
			</div>
		</div>
		<!-- //Content : 본문 영역 -->

<script>
$(document).ready(function(){
	$("#P_STR_NAME").val(SSSC);
	$("#P_STR_CODE").val(SSSC);
	$("#ADD_STR_NAME").val(STR_NAME);
	$("#ADD_STR_CODE").val(SSSC);
});
</script>
</body>
</html>
	