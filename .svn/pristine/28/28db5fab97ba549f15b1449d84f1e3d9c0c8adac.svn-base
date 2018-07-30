/********************************************************
 * 설명:  공통코드관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 권용욱
 * since	: 2016.12.27
 * version : 1.0
 ********************************************************/

var maxLRGCode = "";

$(document).ready(function(){
	
	init();

	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	$(document).on("keyup", "#pop_cnt2 input[name=EMP_NO]", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});
	checkLRGMaxCode();
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars);
rMateGridH5.create("grid2", "gridHolder2", jsVars);
rMateGridH5.create("grid3", "gridHolder3", jsVars);

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp1.setLayout(layoutStr);
		gridApp1.setData(gridData1);
		
		//로우 클릭 이벤트 제어
		var itemClickHandler1 = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			//var column = dataGrid1.getDisplayableColumns()[columnIndex];
			//var dataField = column.getDataField();
			//clickData1 = dataRow1[dataField];
			var clearData = [];
			gridApp2.setData(clearData);
			gridApp3.setData(clearData);
			dataRow2 = "";
			dataRow3 = "";
			$("#pop_cnt2 input[name=LRG_CODE]").val(dataRow1.LRG_CODE);
	    	btnSearchMid(dataRow1.LRG_CODE);
		};
		
		var itemDoubleClickHandler1 = function(event) {
			
			//더블 클릭시 기존 입력폼 초기화 후 더블클릭한 로우의 상세 값을 입력
			fnClearFormLRG();
			$("#pop_wrap1").dialog( "open" );
			
	    	$("#pop_cnt1 input[name=LRG_CODE]").val(dataRow1.LRG_CODE);
	    	$("#pop_cnt1 input[name=LRG_NAME]").val(dataRow1.LRG_NAME);
	    	$("#pop_cnt1 select[name=ITM_GB]").val(dataRow1.ITM_GB);
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			
			//그리드1 셀선택 이벤트
			dataGrid1.addEventListener("itemClick", itemClickHandler1);
			dataGrid1.setDoubleClickEnabled(true);
			dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		
	} else if(id =="grid2") {
		
		gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp2.setLayout(layoutStr2);
		gridApp2.setData(gridData2);
		
		//로우 클릭 이벤트 제어
		var itemClickHandler2 = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow2 = gridRoot2.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			//var column = dataGrid2.getDisplayableColumns()[columnIndex];
			//var dataField = column.getDataField();
			//clickData2 = dataRow2[dataField];
			var clearData = [];
			gridApp3.setData(clearData);			
			dataRow3 = "";
			$("#pop_cnt3 input[name=MID_CODE]").val(dataRow2.MID_CODE);
	    	btnSearchSML(dataRow2.MID_CODE);
		};
		
		var itemDoubleClickHandler2 = function(event) {
			
			//더블 클릭시 기존 입력폼 초기화 후 더블클릭한 로우의 상세 값을 입력
			fnClearFormMID();
			$("#pop_wrap2").dialog( "open" );
			
	    	$("#pop_cnt2 input[name=MID_CODE]").val(dataRow2.MID_CODE);
	    	$("#pop_cnt2 input[name=MID_NAME]").val(dataRow2.MID_NAME);
	    	$("#pop_cnt2 input[name=EMP_NO]").val(dataRow2.EMP_NO);
	    	$("#pop_cnt2 input[name=EMP_NAME]").val(dataRow2.EMP_NAME);
	    	
		};
		
		//그리드2 핸들러
		var layoutCompleteHandler2 = function(event) {
			dataGrid2 = gridRoot2.getDataGrid();	// 그리드 객체
			
			//그리드2 셀선택 이벤트
			dataGrid2.addEventListener("itemClick", itemClickHandler2);
			
			//그리드2 더블클릭 이벤트
			dataGrid2.setDoubleClickEnabled(true);
			dataGrid2.addEventListener("itemDoubleClick", itemDoubleClickHandler2);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		
	} else if(id == "grid3"){
		gridApp3 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot3 = gridApp3.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp3.setLayout(layoutStr3);
		gridApp3.setData(gridData3);
		
		
		//로우 클릭 이벤트 제어
		var itemClickHandler3 = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow3 = gridRoot3.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			//var column = dataGrid2.getDisplayableColumns()[columnIndex];
			//var dataField = column.getDataField();
			//clickData2 = dataRow2[dataField];
		};
		
		var itemDoubleClickHandler3 = function(event) {
			
			//더블 클릭시 기존 입력폼 초기화 후 더블클릭한 로우의 상세 값을 입력
			fnClearFormSML();
			$("#pop_wrap3").dialog( "open" );
			
	    	$("#pop_cnt3 input[name=CLS_CODE]").val(dataRow3.CLS_CODE);
	    	$("#pop_cnt3 input[name=CLS_NAME]").val(dataRow3.CLS_NAME);
	    	
		};
		
		//그리드3 핸들러
		var layoutCompleteHandler3 = function(event) {
			dataGrid3 = gridRoot3.getDataGrid();	// 그리드 객체
			
			//그리드3 셀선택 이벤트
			dataGrid3.addEventListener("itemClick", itemClickHandler3);
			
			//그리드3 더블클릭 이벤트
			dataGrid3.setDoubleClickEnabled(true);
			dataGrid3.addEventListener("itemDoubleClick", itemDoubleClickHandler3);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot3.addEventListener("layoutComplete", layoutCompleteHandler3);
	}
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2,clickData2,selectorColumn2;
var gridApp3, gridRoot3, dataGrid3, dataRow3,clickData3,selectorColumn3;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
	'<rMateGrid>\
		<DataGrid id="dg1">\
			<columns>\
				<DataGridColumn dataField="RN"  headerText="' + rowNumber + '" textAlign="center" width="60" />\
				<DataGridColumn dataField="LRG_CODE" headerText="' + categoryCode + '" textAlign="center" />\
				<DataGridColumn dataField="LRG_NAME" headerText="' + majorCategoryName + '" textAlign="center" />\
			 	<DataGridColumn dataField="ITM_GB" headerText="' + itemGubun + '" textAlign="center" visible="false" />\
			 	<DataGridColumn dataField="ITM_GB_NM" headerText="' + itemGubun + '" textAlign="center" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<DataGrid id="dg2">\
			<columns>\
				<DataGridColumn dataField="RN"  headerText="' + rowNumber + '" textAlign="center" width="60" />\
				<DataGridColumn dataField="MID_CODE" headerText="' + categoryCode + '" textAlign="center" />\
				<DataGridColumn dataField="MID_NAME" headerText="' + middleCategoryName + '" textAlign="center" />\
				<DataGridColumn dataField="EMP_NO" headerText="' + employeeNumber + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="EMP_NAME" headerText="' + employeeName + '" textAlign="center" />\
				<DataGridColumn dataField="LRG_CODE" headerText="' + categoryCode + '" textAlign="center" visible="false" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

var layoutStr3 =
	'<rMateGrid>\
		<DataGrid id="dg3">\
			<columns>\
				<DataGridColumn dataField="RN"  headerText="' + rowNumber + '" textAlign="center" width="60" />\
				<DataGridColumn dataField="CLS_CODE" headerText="' + categoryCode + '" textAlign="center" />\
				<DataGridColumn dataField="CLS_NAME" headerText="' + subCategoryName + '" textAlign="center" />\
				<DataGridColumn dataField="MID_CODE" headerText="' + categoryCode + '" textAlign="center" visible="false" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';




//그리드 row의 값을 변경하여 보여주기
function labelFunc(item, value, column){
  var str = item["DEL_YN"];//삭제여부 컬럼의 필드명
  if(str=="N")
    return "사용";
  else if(str=="Y")
   return "미사용";
}

//그리드1 데이터 초기화
var gridData1 = [];
//그리드2, 3 데이터 초기화
var gridData2 = [];
var gridData3 = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}


function init() {

	//초기 그리드 사이즈 조절
	$(function() {
		$("#pop_wrap1").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 500,
		    resizable : false,
		    open: function(){
		    	$("body").css("overflow-y", "hidden");
		        },
		        close: function(){
		    	$("body").css("overflow-y", "scroll");
		        }
		});
		
		$("#pop_wrap2").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 500,
		    resizable : false,
		    open: function(){
		    	$("body").css("overflow-y", "hidden");
		        },
		        close: function(){
		    	$("body").css("overflow-y", "scroll");
		        }
		});
		
		$("#pop_wrap3").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 500,
		    resizable : false,
		    open: function(){
		    	$("body").css("overflow-y", "hidden");
		        },
		        close: function(){
		    	$("body").css("overflow-y", "scroll");
		        }
		});
		
	});
	
	//회사검색 팝업
	$("#dialog1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 650,
	    resizable : false
	});
	
	$("#pop_cnt1 select[name=ITM_GB]").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("pop_cnt1 select[name=ITM_GB]", "ITM_GB");
	
}


//나중에 js로 빼
jQuery.download = function(url, data, method){
    // url과 data를 입력받음
    if( url && data ){ 
        // data 는  string 또는 array/object 를 파라미터로 받는다.
        data = typeof data == 'string' ? data : jQuery.param(data);
        // 파라미터를 form의  input으로 만든다.
        var inputs = '';
        jQuery.each(data.split('&'), function(){ 
            var pair = this.split('=');
            inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
        });
        // request를 보낸다.
        jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
        .appendTo('body').submit().remove();
    };
};
//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
//행추가 레이어 팝업 오픈 대분류, 중분류, 소분류
function popOpen1(){
	
	if(maxLRGCode == "99"){
		alert(msgInsertCodeMax);
		return;
	}
	
	fnClearFormLRG();
	$("#pop_wrap1").dialog( "open" );
}
function popOpen2(){
	
	if(dataRow1 == null || dataRow1 == ""){
		alert(majorCategory + msgSelectData);
		return;
	}
	
	//Grid의 총 Row Count 조회하는 방법
	var rowCnt2 = gridRoot2.getCollection().getSource() ; 
	var maxCode = gridRoot2.getItemFieldAt( rowCnt2.length-1 , "MID_CODE");
	
	if(maxCode != null && maxCode != "null"){
		//alert(maxCode);
		var subMaxCode = maxCode.substring(2,4);
		if(subMaxCode == "99"){
			alert(msgInsertCodeMax);
			return;
		}
	}
	
	fnClearFormMID();
	$("#pop_wrap2").dialog( "open" );
} 
function popOpen3(){
	
	if(dataRow2 == null || dataRow2 == ""){
		alert(middleCategory + msgSelectData);
		return;
	}
	
	//Grid의 총 Row Count 조회하는 방법
	var rowCnt3 = gridRoot3.getCollection().getSource() ; 
	var maxCode = gridRoot3.getItemFieldAt( rowCnt3.length-1 , "MID_CODE");
	
	if(maxCode != null && maxCode != "null"){
		//alert(maxCode);
		var subMaxCode = maxCode.substring(4,6);
		if(subMaxCode == "99"){
			alert(msgInsertCodeMax);
			return;
		}
	}
	
	fnClearFormSML();
	$("#pop_wrap3").dialog( "open" );
} 

//공통코드 상세 정보 팝업 닫기
function btn_close1(){ 
	// btn_search();
	$("#pop_wrap1").dialog( "close" );
}
function btn_close2(){ 
	// btn_search();
	$("#pop_wrap2").dialog( "close" );
}
function btn_close3(){ 
	// btn_search();
	$("#pop_wrap3").dialog( "close" );
}

//대분류 조회
function btnSearch(){
	
	fnClear();
	
	jQuery.ajax({ 
	    url:"/selectLRGCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {'LRG_NAME' : $("#P_LRG_NAME").val()},
		success:function(data){  
			gridApp1.setData(data);
			//alert(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

//중분류 조회
function btnSearchMid(LRG_CODE){
	
	jQuery.ajax({ 
	    url:"/selectMIDCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {'LRG_CODE' : LRG_CODE},
		success:function(data){  
			gridApp2.setData(data);
			//alert(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

//소분류 조회
function btnSearchSML(MID_CODE){
	
	jQuery.ajax({ 
	    url:"/selectSMLCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {'MID_CODE' : MID_CODE},
		success:function(data){  
			gridApp3.setData(data);
			//alert(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
}

//대분류 저장 (code값의 유무로 insert or update)
function btnSaveMajor(){
	
	if($("#pop_cnt1 input[name=LRG_NAME]").val() == "" || $("#pop_cnt1 input[name=LRG_NAME]").val() == null || $("#pop_cnt1 input[name=LRG_NAME]").val() == "undefined"){
		alert(majorCategoryName + msgConfirm);
		return;
	}
	
	if($("#pop_cnt1 select[name=ITM_GB]").val() == "" || $("#pop_cnt1 select[name=ITM_GB]").val() == null || $("#pop_cnt1 select[name=ITM_GB]").val() == "undefined"){
		alert(itemGubun + msgConfirm);
		return;
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/registerLRGCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'LRG_CODE' : $("#pop_cnt1 input[name=LRG_CODE]").val()
				,	'LRG_NAME' : $("#pop_cnt1 input[name=LRG_NAME]").val()
				,	'ITM_GB' : $("#pop_cnt1 select[name=ITM_GB]").val()
				},
		success:function(data){ 
			fnClear();
			btnSearch();
			fnClearFormLRG();
			btn_close1();
			alert(msgSave);
			checkLRGMaxCode();
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

//중분류 저장 (code값의 유무로 insert or update)
function btnSaveMiddle(){
	
	if($("#pop_cnt2 input[name=MID_NAME]").val() == "" || $("#pop_cnt2 input[name=MID_NAME]").val() == null || $("#pop_cnt2 input[name=MID_NAME]").val() == "undefined"){
		alert(middleCategoryName + msgConfirm);
		return;
	}
	
	if($("#pop_cnt2 input[name=EMP_NO]").val() == "" || $("#pop_cnt2 input[name=EMP_NO]").val() == null || $("#pop_cnt2 input[name=EMP_NO]").val() == "undefined"){
		alert(employeeNumber + msgConfirm);
		return;
	}
	
	
	if(confirm(msgSaveConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/registerMIDCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'MID_CODE' : $("#pop_cnt2 input[name=MID_CODE]").val()
				,	'LRG_CODE' : dataRow1.LRG_CODE
				,	'MID_NAME' : $("#pop_cnt2 input[name=MID_NAME]").val()
				,	'EMP_NO' : $("#pop_cnt2 input[name=EMP_NO]").val()
				},
		success:function(data){ 
			//fnClear();
			//btnSearch();
			btnSearchMid(dataRow1.LRG_CODE);
			fnClearFormMID();
			btn_close2();
			alert(msgSave);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

//소분류 저장 (code값의 유무로 insert or update)
function btnSaveSub(){
	
	if($("#pop_cnt3 input[name=CLS_NAME]").val() == "" || $("#pop_cnt3 input[name=CLS_NAME]").val() == null || $("#pop_cnt3 input[name=CLS_NAME]").val() == "undefined"){
		alert(subCategoryName + msgConfirm);
		return;
	}
	
	if(confirm(msgSaveConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/registerSMLCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'MID_CODE' : dataRow2.MID_CODE
				,	'CLS_CODE' : $("#pop_cnt3 input[name=CLS_CODE]").val()
				,	'CLS_NAME' : $("#pop_cnt3 input[name=CLS_NAME]").val()
				},
		success:function(data){ 
			//fnClear();
			//btnSearch();
			fnClearFormSML();
			btn_close3();
			btnSearchSML(dataRow2.MID_CODE);
			alert(msgSave);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

//대분류 삭제
function btnDeleteMajor(){
	
	if(dataRow1 == null || dataRow1 == "null" || dataRow1 == ""){
		alert(msgSelectDelLRGCode);
		return;
	}
	
	//Grid의 총 Row Count 조회하는 방법
	var collection = gridRoot2.getCollection();
	var source = collection.getSource();

	if(source.length > 0){
		alert(msgExistChild);
		return;
	}
	
	if(confirm(msgDeleteConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/deleteLRGCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'LRG_CODE' : dataRow1.LRG_CODE
				},
		success:function(data){ 
			fnClear();
			btnSearch();
			alert(msgDelete);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

//중분류 삭제
function btnDeleteMiddle(){
	
	if(dataRow2 == null || dataRow2 == "null" || dataRow2 == ""){
		alert(msgSelectDelMIDCode);
		return;
	}
	
	//Grid의 총 Row Count 조회하는 방법
	var collection = gridRoot3.getCollection();
	var source = collection.getSource();

	if(source.length > 0){
		alert(msgExistChild);
		return;
	}
	
	if(confirm(msgDeleteConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/deleteMIDCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'LRG_CODE' : dataRow2.LRG_CODE
				,	'MID_CODE' : dataRow2.MID_CODE
				},
		success:function(data){ 
			btnSearchMid(dataRow1.LRG_CODE);
			alert(msgDelete);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

//소분류 삭제
function btnDeleteSub(){
	
	if(dataRow3 == null || dataRow3 == "null" || dataRow3 == ""){
		alert(msgSelectDelSMLCode);
		return;
	}
	
	if(confirm(msgDeleteConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/deleteSMLCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'CLS_CODE' : dataRow3.CLS_CODE
				,	'MID_CODE' : dataRow3.MID_CODE
				},
		success:function(data){ 
			btnSearchSML(dataRow2.MID_CODE);
			alert(msgDelete);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

//그리드 초기화
function fnClear(){
	var clearData = [];
	gridApp1.setData(clearData);
	gridApp2.setData(clearData);
	gridApp3.setData(clearData);
}

//입력폼 초기화
function fnClearFormLRG(){
	$("#pop_cnt1 input[name=LRG_CODE]").val("");
	$("#pop_cnt1 input[name=LRG_NAME]").val("");
	$("#pop_cnt1 select[name=ITM_GB]").val("");
}

function fnClearFormMID(){
	$("#pop_cnt2 input[name=LRG_CODE]").val("");
	$("#pop_cnt2 input[name=MID_CODE]").val("");
	$("#pop_cnt2 input[name=MID_NAME]").val("");
	$("#pop_cnt2 input[name=EMP_NO]").val("");
	$("#pop_cnt2 input[name=EMP_NAME]").val("");
}

function fnClearFormSML(){
	$("#pop_cnt3 input[name=MID_CODE]").val("");
	$("#pop_cnt3 input[name=CLS_CODE]").val("");
	$("#pop_cnt3 input[name=CLS_NAME]").val("");
}

function checkLRGMaxCode(){
	jQuery.ajax({ 
	    url:"/selectLRGMaxCode.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		success:function(data){  
			//alert("최대값 조회 : " + data[0].LRG_CODE);
			maxLRGCode = data[0].LRG_CODE;
			//alert(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
}

//(사원검색) 팝업 호출 function
function btn_comm_member_search(){
	$('#comm_pop_wrap4' ).dialog( 'open' );
	gridApp13.resize();
	
	// $("#P_CALLBACK_NM4").val('fn_comm_member_callback1(dataRow13)');
	if($("#EMP_NAME").val() != null && $("#EMP_NAME").val() != ""){
		$("#P_TEXT4").val($("#EMP_NAME").val());
		btn_comm_search('4');
	}
}

function fn_comm_member_callback(dataRow){
	$("#EMP_NO").val(dataRow.USER_ID);
	$("#EMP_NAME").val(dataRow.USER_NM);
}

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	
	var w = ($(window).width()-110)/10;
	console.log(w);
	
	$(".lft1").width(w*3.5);	
	$(".rgt1").width(w*3.5+1);	
	$(".rgt2").width(w*3);		
	$(".box_rgt").css("marginLeft", "14px");
	
	var hei1 = $(window).height() - 105;
	$("#gridHolder1, #gridHolder2, #gridHolder3").height(hei1);
	
	$(window).on('resize',function (){
		
		var w = ($(window).width()-110)/10;
		console.log(w);
		
		$(".lft1").width(w*3.5);	
		$(".rgt1").width(w*3.5+1);	
		$(".rgt2").width(w*3);	
		$(".box_rgt").css("marginLeft", "14px");
		
		var hei1 = $(window).height() - 105;
		$("#gridHolder1, #gridHolder2, #gridHolder3").height(hei1);
		
	});
});

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
