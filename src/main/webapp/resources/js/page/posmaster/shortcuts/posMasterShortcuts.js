/********************************************************
 * 설명:  POS단축키관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.01.03
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler";

//rMateDataGrid 를 생성합니다.
//파라메터 (순서대로)
//1. 그리드의 id ( 임의로 지정하십시오. )
//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%");
rMateGridH5.create("grid2", "gridHolder2", jsVars1, "100%");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

// 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var gridApp2, gridRoot2, dataGrid2, dataRow2;
var collection1, collection2; // 그리드의 데이터 객체
var gridData = [];
var totalCnt = 0;	// 전체건수
var src2;

// 전체 선택 체인지 플래그 팝업시
var chgFlag="N";

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	// rMateGrid 관련 객체
	
	if(id == "grid1")
	{
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		gridApp1.setData(gridData);
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
	else if(id == "grid2")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp2.setLayout(layoutStr2);	// 데이터와 그리드를 포함하는 객체
		gridApp2.setData(gridData);
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	//rMateSortHeadInit(dataGrid1);
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	//그리드1 헤더 클릭 이벤트
	//dataGrid1.addEventListener("headerRelease", headerRelease1);
	
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
	// 전체 데이타 가져오기
	src2 = collection2.getSource();
	
	//그리드2 셀선택 이벤트
	dataGrid2.addEventListener("itemClick", itemClickHandler2);
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	
	$("#PD_CORP_CODE").val(dataRow1.CORP_CODE);
	$("#PD_STR_CODE").val(dataRow1.STR_CODE);
	$("#PD_KEY_POSITION").val(dataRow1.KEY_POSITION);
	$("#PD_POS_NO").val(dataRow1.POS_NO);
	$("#PD_POS_KEY_NO").val(dataRow1.POS_KEY_NO);
	
	getGridData2();
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler2(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow2 = gridRoot2.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid2.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
//	$("#posAll").hide();
	
	// 1. disabled 항목들 먼저 해제 ~
	$("#D_STR_CODE").removeAttr("disabled");
	$("#D_POS_NO").removeAttr("disabled");
	$("#D_KEY_POSITION").removeAttr("disabled");
	
	// 2. 값 셋팅~
	$("#D_CORP_CODE").val(dataRow2.CORP_CODE);
	$("#D_STR_CODE").val(dataRow2.STR_CODE);
	$("#D_STR_CODE").trigger("change");// 초기 진입시 트리거로 강제 체인지 이벤트 발생
	$("#D_KEY_POSITION").val(dataRow2.KEY_POSITION);
	$("#D_POS_NO").val(dataRow2.POS_NO);
	$("#D_POS_KEY_NO").val(dataRow2.POS_KEY_NO);
	$("#D_POS_KEY_NAME").val(dataRow2.POS_KEY_NAME);
	$("#D_SEQ").val(dataRow2.SEQ);
	$("#D_SCAN_CODE").val(dataRow2.SCAN_CODE);
	
	if(typeof dataRow2.USE_YN != "undefined" && dataRow2.USE_YN == "N")
	{
		$("input:radio[name='D_USE_YN']:input[value='N']").attr("checked", true);
	}
	else
	{
		$("input:radio[name='D_USE_YN']:input[value='Y']").attr("checked", true);
	}
	
	// 3. disabled 항목들 다시 disabled
	$("#D_STR_CODE").attr("disabled", "disabled");
	$("#D_POS_NO").attr("disabled", "disabled");
	$("#D_KEY_POSITION").attr("disabled", "disabled");
	$("#D_POS_KEY_NO").attr("readonly", "readonly");
	$("#D_SEQ").attr("readonly", "readonly");
	
	$("#pop_btn_save").attr("onclick", "updateDetail('update');");
	$("input:checkbox[name='D_ALL_POS']").attr("checked", false);
	chgFlag="U";
	$("#pop_wrap1").dialog("open");
}

// 페이징 처리를 안하기때문에 sorting 기능 서버처리 안해도됨.
// 그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {
	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	getGridData(false);
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 	
var layoutStr1 =
	'<rMateGrid>\
		<DataGrid id="dg1" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="60" />\
				<DataGridColumn dataField="KEY_POSITION_NAME" headerText="'+locationType+'" textAlign="center" />\
				<DataGridColumn dataField="POS_KEY_NO" headerText="'+hotkeyNumber+'" textAlign="center" />\
				<DataGridColumn dataField="POS_KEY_NAME" headerText="'+hotkeyName+'" textAlign="left" width="250" />\
				<DataGridColumn dataField="SEQ" headerText="'+rowNumber+'" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SCAN_CODE" headerText="'+scanCode+'" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="ITM_NAME" headerText="'+itmName+'" textAlign="left" width="400" visible="false"/>\
				<DataGridColumn dataField="USE_NM" headerText="'+useYn+'" textAlign="center" sortable="false" visible="false"/>\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="POS_NO"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="ITM_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="KEY_POSITION"  headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//그리드1 헤더 및 레이아웃 	
var layoutStr2 =
	'<rMateGrid>\
		<DataGrid id="dg2" sortableColumns="true" >\
			<columns>\
				<DataGridColumn dataField="SEQ" headerText="'+rowNumber+'" textAlign="center" />\
				<DataGridColumn dataField="SCAN_CODE" headerText="'+scanCode+'" textAlign="center" width="110" />\
				<DataGridColumn dataField="ITM_NAME" headerText="'+itmName+'" textAlign="left" width="300" />\
				<DataGridColumn dataField="USE_NM" headerText="'+useYn+'" textAlign="center" sortable="false" />\
				<DataGridColumn dataField="POS_KEY_NO" headerText="'+hotkeyNumber+'" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="POS_KEY_NAME" headerText="'+hotkeyName+'" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="POS_NO"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="ITM_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="KEY_POSITION"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="KEY_POSITION_NAME" headerText="'+locationType+'" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//목록 그리드 조회
function getGridData() {
	
	gridRoot2.removeAll();
	var param = $("#frm").serializeArray();
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/posMasterShortcutsList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid1.setEnabled(false);
			gridRoot1.addLoadingBar();
		},
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			gridData = data.list;
			gridApp1.setData(gridData);
			totalCnt = data.count;
			
			$("#useKeyNo").text("생성 단축키 수 : " + (totalCnt));
	    },
	    complete : function(data) {
	    	dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
	    }
	});
}

// 상품 그리드 조회
function getGridData2() {
	
	var param = $("#frm2").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler2 실행된다.
	jQuery.ajax({ 
	    url:"/posMasterShortcutsList2.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid2.setEnabled(false);
			gridRoot2.addLoadingBar();
		},
		success:function(data){
			//debugger;
			gridData = data.list;
			gridApp2.setData(gridData);
	    },
	    complete : function(data) {
	    	dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	dataGrid2.setEnabled(true);
			gridRoot2.removeLoadingBar();
	    }
	});
}

// POS 공지 등록,수정
function updateDetail(flag) {
	
	if($("#D_STR_CODE").val() == null || $("#D_STR_CODE").val() == "")
	{
		alert(storNm + msgConfirm);
		$("#D_STR_CODE").focus();
		return;
	}
	
	if($("#D_POS_NO").val() == null || $("#D_POS_NO").val() == "")
	{
		alert(pos + msgConfirm);
		$("#D_POS_NO").focus();
		return;
	}
	
	if($("#D_KEY_POSITION").val() == null || $("#D_KEY_POSITION").val() == "")
	{
		alert(locationType + msgConfirm);
		$("#D_KEY_POSITION").focus();
		return;
	}
	
	if($("#D_POS_KEY_NO").val() == null || $("#D_POS_KEY_NO").val() == "")
	{
		alert(hotkeyNumber + msgConfirm);
		$("#D_POS_KEY_NO").focus();
		return;
	}
	
	if($("#D_POS_KEY_NAME").val() == null || $("#D_POS_KEY_NAME").val() == "")
	{
		alert(hotkeyName + msgConfirm);
		$("#D_POS_KEY_NAME").focus();
		return;
	}
	
	if($("#D_SEQ").val() == null || $("#D_SEQ").val() == "")
	{
		alert(rowNumber + msgConfirm);
		$("#D_SEQ").focus();
		return;
	}
	
	if($("#D_SCAN_CODE").val() == null || $("#D_SCAN_CODE").val() == "")
	{
		alert(scanCode + msgConfirm);
		$("#D_SCAN_CODE").focus();
		return;
	}
	
	$("#D_STR_CODE").removeAttr("disabled");
	$("#D_POS_NO").removeAttr("disabled");
	$("#D_KEY_POSITION").removeAttr("disabled");
	
	$("#D_TYPE").val(flag);
	var param = $("#reg_frm").serializeArray();
	if($("#D_ALL_POS_CODE").val() == null || $("#D_ALL_POS_CODE").val() ==""){
		$("#D_ALL_POS_CODE").val($("#D_POS_NO").val());
		param =$("#reg_frm").serializeArray();
	}
	jQuery.ajax({ 
	    url:"/updatePosMasterShortcuts.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					btn_close();
					getGridData();
					getGridData2();
				}
				else
				{
					alert(data.RETURN_MSG);
					//btn_close();
				}
			}
			else
			{
				alert(msgErrorDefault);
				btn_close();
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    	btn_close();
	    }
	});
}

//해당 점포의 POS 가져오기
function getPosList(gb) {
	
	var html = "";
	var selId = "";
	var param;
	
	if(gb == "0")	// 메인화면 점포 체인지 이벤트
	{
		selId = "P_POS_NO";
		if($("#P_STR_CODE").val() == "")
		{
			//$("#"+selId).html("<option value=\"\">" + all + "</option>");
			return;
		}
		
		param = $("#frm").serializeArray();
	}
	else			// 팝업화면 점포 체인지 이벤트
	{
		selId = "D_POS_NO";
		param = $("#reg_frm").serializeArray();
	}
	
	jQuery.ajax({ 
	    url:"/getPosList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			if(typeof data != "undefined" && data != null)
			{
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].POS_NO + "\">" + data[i].POS_NAME + "</option>";
				}
				$("#"+selId).html(html);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//해당 점포의 POS 단축키 삭제
function delPosShortCuts() {
	var param = $("#frm2").serializeArray();
	
	jQuery.ajax({ 
		url:"/delPosShortCuts.do",         
		type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			if(data.RETURN_CODE == 1111)
			{
				alert(data.RETURN_MSG);
				getGridData();
				gridRoot2.removeAll();
			}
		},
		complete : function(data) {
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

//상품 검색 팝업호출
function popupProd()
{
	$("#comm_pop_wrap2").dialog({
		dialogClass: "p_f"
	});
	
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#P_CALLBACK_NM2").val('btn_comm_product_search(dataRow11)');
	/*if($("#I_TEXT").val() != null && $("#I_TEXT").val() != ""){
		$("#P_TEXT2").val($("#I_TEXT").val());
		btn_comm_search('2');
	}*/
}

//상품 검색 콜백
function btn_comm_product_search(dataRow)
{
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("상품정보 조회 실패");
		return;
	}
	
	$("#D_SCAN_CODE").val(dataRow.SCAN_CODE);
}

// 선택한 단축키의 마지막 seq 가져오기
function getMaxSeq()
{
	var seq = 0;
	var lastDataRow;
	if(src2 != null && src2.length > 0)
	{
		lastDataRow = gridRoot2.getItemAt(src2.length-1);
		seq = lastDataRow.SEQ;
	}
	
	return seq;
}

//팝업 닫기
function btn_close(){
	$("#pop_wrap1").dialog( "close" );
}

$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//그리드 너비 제어
	$(".lft_wid, .rgt_wid").width(($(window).width()-58)*0.5);
	$("#gridHolder1, #gridHolder2").height($(window).height()-105);

	$(window).on('resize',function (){	
		$(".lft_wid, .rgt_wid").width(($(window).width()-58)*0.5);
		$("#gridHolder1, #gridHolder2").height($(window).height()-105);
	});
	
	// 리스트 위치구분 콤보
	getCommonCodeSelectBoxList("P_KEY_POSITION", "KEY_POSITION");
	
	// 등록팝업 위치구분 콤보
	getCommonCodeSelectBoxList("D_KEY_POSITION", "KEY_POSITION");
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	
	// 점포코드 콤보 가져오기(팝업)
	getStoreCode("D_STR_CODE");
	
	//초기 팝업 사이즈 조절
	$(function() {
		$("#pop_wrap1").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 500,
		    resizable : false,
		    position : "center",
		    open: function(){
		    	$("body").css("overflow-y", "hidden");
		    },
		    close: function(){
		    	$("body").css("overflow-y", "scroll");
		    }
		});
		
	});
	
	// 숫자만 입력 처리
	try {
		
		CommonJs.addInputHandler({input:$("#D_POS_KEY_NO"), dataType:"N", maxlength:"3"});
		CommonJs.addInputHandler({input:$("#D_SCAN_CODE"), dataType:"N", maxlength:"13"});
		
    } catch(e) {
    	console.log(e);
    }
    
//    $("#posAll").hide();
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData();
	});
	
	// 신규등록 버튼
	$("#btn_new").click(function(){
		
		var selectData = dataGrid1.getSelectedItem();
		
		$("#D_STR_CODE").val($("#P_STR_CODE").val());
		$("#D_SCAN_CODE").val("");
		$("input:checkbox[name='D_ALL_POS']").attr("checked", false);
		if(selectData != null)	// 단축키관리 그리드 선택 후 신규등록 버튼
		{
//			$("#posAll").hide();
			
			$("#D_KEY_POSITION").val(selectData.KEY_POSITION);
			$("#D_POS_NO").val(selectData.POS_NO);
			$("#D_POS_KEY_NO").val(selectData.POS_KEY_NO);
			$("#D_POS_KEY_NAME").val(selectData.POS_KEY_NAME);
			$("#D_SEQ").val(getMaxSeq()+1);
		}
		else	// 단축키관리 그리드 미선택시
		{
			$("#posAll").show();
			
			$("#D_KEY_POSITION").val("0");
			$("#D_POS_NO").val("");
			$("#D_POS_KEY_NO").val("");
			$("#D_POS_KEY_NAME").val("");
			$("#D_SEQ").val("");
		}
		
		$("#D_STR_CODE").removeAttr("disabled");
		$("#D_POS_NO").removeAttr("disabled");
		$("#D_KEY_POSITION").removeAttr("disabled");
		$("#D_POS_KEY_NO").removeAttr("readonly");
		$("#D_SEQ").removeAttr("readonly");
		
		$("input:radio[name='D_USE_YN']:input[value='Y']").attr("checked", true);
		$("#D_STR_CODE").trigger("change");		// 초기 진입시 트리거로 강제 체인지 이벤트 발생
		
		$("#pop_btn_save").attr("onclick", "updateDetail('insert');");
		chgFlag ="N";
		$("#pop_wrap1").dialog("open");
	});
	
	// 삭제 버튼
	$("#btn_del").click(function(){
		delPosShortCuts();
	});
	
	// 점포명 체인지 이벤트
	$("#P_STR_CODE").change(function(){
		getPosList('0');
	});
	
	// 팝업 점포명 체인지 이벤트
	$("#D_STR_CODE").change(function(){
		getPosList('1');
	});
	
	// 신규 등록시 POS 전체 저장 유무
	$("#D_ALL_POS").click(function(){
		if ($(this).is(":checked"))
		{
			var values = "";
			$.map($("#D_POS_NO > option"), function(e) {
				if(values == "")
					values += e.value;
				else
					values += "," + e.value;
			});
			
			$("#D_ALL_POS_CODE").val(values);
			$("#D_POS_NO").attr("disabled", "disabled");
		}
		else
		{
			$("#D_POS_NO").removeAttr("disabled");
			$("#D_ALL_POS_CODE").val($("#D_POS_NO").val());
			$("#D_POS_NO").attr("disabled", "disabled");
			
			if(chgFlag =="N"){
				$("#D_POS_NO").removeAttr("disabled");
			}
		}
	});
	
	// 초기 진입시 트리거로 강제 체인지 이벤트 발생
	$("#P_STR_CODE").trigger("change");
	
});
