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
<title>행사상품마스터</title>

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
<script type="text/javascript" src="/resources/js/page/business/campaignproduct/businessCampaignProduct.js?ver=20180406_000" charset="utf-8"></script>
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
	    		$("#btn_read").hide();
	    		$("#btnSearchDetail").hide();
	    		$("#addRow").hide();
	    		$("#btn_update").hide();
	    		$("#delRow").hide();
	    		$("#btn_excelDownload").hide();
	    		$("#addRowExcel").hide();
	    		return;
	    	}
	    	
	    	//사용유무가 N이면 모든 버튼 숨김
	    	if(data[0].USE_YN=='N'){
	    		$("#btn_read").hide();
	    		$("#btnSearchDetail").hide();
	    		$("#addRow").hide();
	    		$("#btn_update").hide();
	    		$("#delRow").hide();
	    		$("#btn_excelDownload").hide();
	    		$("#addRowExcel").hide();
	    	}else{
	    		//조회버튼 제어
		    	if(data[0].AUTH_SEARCH == 'Y'){
		    		$("#btn_read").show();
		    		$("#btnSearchDetail").show();
		    	}else{
		    		$("#btn_read").hide();
		    		$("#btnSearchDetail").hide();
		    	}
		    	
		    	//신규버튼 제어
		    	if(data[0].AUTH_NEW == 'Y'){
		    		$("#addRow").show();
		    	}else{
		    		$("#addRow").hide();
		    	}
		    	
		    	//저장버튼 제어
		    	if(data[0].AUTH_SAVE == 'Y'){
		    		$("#btn_update").show();
		    	}else{
		    		$("#btn_update").hide();
		    	}
		    	
		    	//삭제버튼 제어
		    	if(data[0].AUTH_DELETE == 'Y'){
		    		$("#delRow").show();
		    	}else{
		    		$("#delRow").hide();
		    	}
		    	
		    	//엑셀다운버튼 제어
		    	if(data[0].AUTH_EXCEL_DOWN == 'Y'){
		    		$("#btn_excelDownload").show();
		    	}else{
		    		$("#btn_excelDownload").hide();
		    	}
		    	
		    	//엑셀업로드버튼 제어
		    	if(data[0].AUTH_EXCEL_UPLOAD == 'Y'){
		    		$("#addRowExcel").show();
		    	}else{
		    		$("#addRowExcel").hide();
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
					<a href="" class="close_btn p_a">도움말 닫기</a>
				</div>
				<button id="bookMarkIcon" type="button" class="fav fav_inactive"></button>
				<div class="f_r">
					<!-- 권한에 따른 버튼 show/hide -->
					<button type="button" id="btn_excelDownload"  class="btn btn_style2" onclick="excelDownload()"><spring:message code="btnExcelUploadSample"/></button>
				    <button type="button" id="btn_update"  class="btn btn_style2"  onclick="btnSaveCheck()"><spring:message code="btnSave"/></button>
					<button type="button" id="btn_read" class="btn btn_style3"  onclick="btnSearch()"><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
				</div>
			</div>
			
			<!-- 조회폼 영역 -->
			<div class="search_area"    id="top_search">
				<div class="last">
					<label for=""><spring:message code="eventDate"/></label>
					<input type="text" class="datepicker1 datepicker" id="P_EVT_STR_DT" name="P_EVT_STR_DT"> ~ <input type="text" class="datepicker2 datepicker" id="P_EVT_END_DT" name="P_EVT_END_DT">
					<select id="STR_CODE" name="STR_CODE" class="wid2" style="visibility: hidden;"></select>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			
			<h3 class="bul_arr f_l">행사관리조회</h3>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder1"></div>
				</div>
			</div>
			<div class="tit_top">
				<h3 class="bul_arr f_l">행사상품정보</h3>
				<div class="tbl_rdo" id="mid_search">
					<label for="">점포명</label>
					<select id="P_STR_CODE" name="P_STR_CODE" class="wid2"></select>
					<label for="" class="mar_L10"><spring:message code="supply"/></label>
					<input type="hidden" id="P_VEN_CODE" name="P_VEN_CODE">
					<input type="text" id="P_VEN_NAME" name="P_VEN_NAME" class="search_txt wid2" onblur="clearVenCode()" >
					<button type="button" id="" class="search_btn" onclick="btn_comm_supply_search_product()">검색 아이콘</button>
					<label for=""><spring:message code="itmName"/></label>
					<input type="hidden" id="P_ITM_CODE" name="P_ITM_CODE">
					<input type="text" id="P_ITM_NAME" name="P_ITM_NAME" class="search_txt wid2">
					<button type="button" id="" class="search_btn" onclick="btn_comm_product_search()">검색 아이콘</button>
					<button type="button" id="btnSearchDetail" class="btn btn_style4" onclick="btnSearchDetail()">필터링</button>
				</div>
				<div class="f_r">
					<button type="button" id="addRowExcel" class="btn btn_style4" onclick="addRowExcel()">엑셀업로드</button>
					<button type="button" id="addRow" class="btn btn_style4" onclick="addRow('${sessionScope.STR_CODE}')"><spring:message code="addRow"/></button>
					<button type="button" id="delRow" class="btn btn_style4" onclick="deleteRow()"><spring:message code="delRow"/></button>
				</div>
			</div>
			<div class="sec_grid">
				<div class="content">
					<div id="gridHolder2"></div>
				</div>
			</div>

		</div>
		<!-- //Content : 본문 영역 -->
		
<!-- 	 상세 팝업 영역 시작  -->
	<div id="pop_wrap1">
		<header id="pop_head" class="clear">
			<div class="f_r">
				<button type="button" class="btn btn_style4" onclick="btnRegist()"><spring:message code="regist"/></button>
				<button type="button" class="btn btn_style4" onclick="btn_close()"><spring:message code="btnClose"/></button>
			</div>
		</header>
		<div id="pop_cnt">
			<div class="clear">
				<div class="f_l">
					<h1 class="bul_arr">점포명</h1>		
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder3"></div>
						</div>
					</div>
				</div>
				<div class="f_r" style="width:558px;">
					<h1 class="bul_arr">상품내용</h1>
					<input type="hidden" id="ITM_CODE" name="ITM_CODE" />
					<input type="hidden" id="BOT_CODE" name="BOT_CODE" />
					<input type="hidden" id="BOT_SPRC" name="BOT_SPRC" />
					<table class="tbl_st2">
						<tbody>
							<tr>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="scanCode"/></label></th>
								<td>
									<input type="text" id="SCAN_CODE" name="SCAN_CODE" class="wid2" disabled />
									<button type="button" class="search_btn" onclick="btn_comm_store_search2()"></button>
								</td>
								<th scope="row"><label><spring:message code="itmName"/></label></th>
								<td>
									<input type="text" id="ITM_NAME" name="ITM_NAME" class="wid2" disabled />
								</td>
							</tr>
							<tr>
								<th scope="row"><label><spring:message code="unit"/></label></th>
								<td>
									<input type="text" id="UNIT" name="UNIT" class="wid2" />
								</td>
								<th scope="row"><label><spring:message code="point"/></label></th>
								<td>
									<select id="POINT_SAVE" name="POINT_SAVE" class="wid2"></select>
								</td>
							</tr>
							<tr>
								<th scope="row"><label><spring:message code="taxGubun"/></label></th>
								<td>
									<select id="TAX_GB" name="TAX_GB" class="wid2" disabled></select>
								</td>
								<th scope="row"><label><spring:message code="baseWPRC"/></label></th>
								<td>
									<input type="text" id="BASE_WPRC" name="BASE_WPRC" class="wid2" style="text-align: right;"  disabled/>원
								</td>
							</tr>					
							<tr>
								<th scope="row"><label><spring:message code="baseWVAT"/></label></th>
								<td>
									<input type="text" id="BASE_WVAT" name="BASE_WVAT" class="wid2" style="text-align: right;" disabled />원
								</td>
								<th scope="row"><label><spring:message code="baseTOTAL"/></label></th>
								<td>
									<input type="text" id="BASE_TOTAL" name="BASE_TOTAL" class="wid2" style="text-align: right;" disabled />원
								</td>
							</tr>
							<tr>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="evtTOTAL"/></label></th>
								<td>
									<input type="text" id="EVT_TOTAL" name="EVT_TOTAL" class="wid2" style="text-align: right;" />원
								</td>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="evtSPRC"/></label></th>
								<td>
									<input type="text" id="EVT_SPRC" name="EVT_SPRC" class="wid2" style="text-align: right;" numberOnly />원
								</td>
							</tr>
							<tr>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="evtWPRC"/></label></th>
								<td>
									<input type="text" id="EVT_WPRC" name="EVT_WPRC" class="wid2" style="text-align: right;" numberOnly disabled />원
								</td>
								<th scope="row"><em>필수입력항목</em><label><spring:message code="evtWVAT"/></label></th>
								<td>
									<input type="text" id="EVT_WVAT" name="EVT_WVAT" class="wid2" style="text-align: right;" numberOnly disabled />원
								</td>
							</tr>
							<tr>
								<th scope="row"><label><spring:message code="sprc"/></label></th>
								<td>
									<input type="text" id="SPRC" name="SPRC" class="wid2" style="text-align: right;"  disabled numberOnly />원
								</td>
								<th scope="row"><label><spring:message code="margin"/></label></th>
								<td>
									<input type="text" id="MARGIN" name="MARGIN" class="wid2" style="text-align: right;"  disabled />
								</td>
							</tr>
							<tr>
								<th scope="row"><label><spring:message code="marginEVT"/></label></th>
								<td>
									<input type="text" id="MARGIN_EVT" name="MARGIN_EVT" class="wid2" style="text-align: right;" disabled />
								</td>
								<th scope="row"><label><spring:message code="imageNumber"/></label></th>
								<td>
									<input type="text" id="IMAGE_NUM" name="IMAGE_NUM" class="wid2" style="text-align: right;" />
								</td>
							</tr>
							<tr>
								<th scope="row"><label><spring:message code="eventStartDate"/></label></th>
								<td>
									<input type="text" id="EVT_STR_DT" name="EVT_STR_DT" class="datepicker datepicker3 wid2" />
								</td>
								<th scope="row"><label><spring:message code="eventEndDate"/></label></th>
								<td>
									<input type="text" id="EVT_END_DT" name="EVT_END_DT" class="datepicker datepicker4 wid2" />
								</td>
							</tr>
							<tr>
								<th scope="row"><label><spring:message code="orderStartDate"/></label></th>
								<td>
									<input type="text" id="ORD_STR_DT" name="ORD_STR_DT" class="datepicker datepicker5 wid2" />
								</td>
								<th scope="row"><label><spring:message code="orderEnddate"/></label></th>
								<td>
									<input type="text" id="ORD_END_DT" name="ORD_END_DT" class="datepicker datepicker6 wid2" />
								</td>
							</tr>
						</tbody>
					</table>					
				</div>
				<%-- <div class="f_r" style="width:558px;margin-top: 22px;">
					<h1 class="bul_arr">엑셀일괄등록</h1>
					<table class="tbl_st2">
						<tbody>
							<tr>
								<th scope="row"><em>필수입력항목</em>엑셀 업로드</label></th>
								<td>
									<input type="file" id="excelFile" name="excelFile" style=""  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" >
									<button type="button" class="btn btn_style4" onclick="btn_load()"><spring:message code="btnExcelUpload"/></button>
								</td>
							</tr>
						</tbody>
					</table>
				</div> --%>			
			</div>
		</div>
	</div>	
<!-- 	 상세 팝업 영역 끝  -->
<!-- 	 상세 팝업 영역 시작  -->
	<div id="pop_wrap2">
		<header id="pop_head" class="clear">
			<div class="f_r">
				<button type="button" class="btn btn_style4" onclick="btnSaveExcel()"><spring:message code="btnSave"/></button>
				<button type="button" class="btn btn_style4" onclick="btn_close_excel()"><spring:message code="btnClose"/></button>
			</div>
		</header>
		<div class="clear">
			<div>
				<h1 class="bul_arr">엑셀일괄등록</h1>
				<table class="tbl_st2">
					<tbody>
						<tr>
							<th scope="row"><em>필수입력항목</em>엑셀 업로드</label></th>
							<td>
								<input type="file" id="excelFile" name="excelFile" style=""  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" >
								<button type="button" class="btn btn_style4" onclick="btn_load()"><spring:message code="btnExcelUpload"/></button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
	 		<div id="pop_cnt" class="clear tit_top">
				<div class="f_l">
					<h1 class="bul_arr">점포명</h1>		
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder4"></div>
						</div>
					</div>
				</div>
				<div class="f_r">
					<h1 class="bul_arr">엑셀데이터</h1>		
					<div class="sec_grid">
						<div class="content">
							<div id="gridHolder5"></div>
						</div>
					</div>
				</div>			
			</div>
		</div>
	</div>
<!-- 	 상세 팝업 영역 끝  -->		
	
</body>
</html>
	
