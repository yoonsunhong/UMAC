/********************************************************
 * 설명:  권한그룹 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 문희훈
 * since	: 2016.11.03
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";
var jsVars3 = "rMateOnLoadCallFunction=gridReadyHandler3";


//rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid2", "gridHolder2", jsVars2);
rMateGridH5.create("grid3", "gridHolder3", jsVars3);

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/readAthGroupList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {USE_YN : $('#use_yn').val()},
		success:function(data){  
			gridApp1.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});

	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

//그리드2 레디 핸들러
function gridReadyHandler2(id) {
	// rMateGrid 관련 객체
	gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드2에 헤더 및 레이아웃 셋팅
	gridApp2.setLayout(layoutStr2);
	
	gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
}
//그리드3 레디 핸들러
function gridReadyHandler3(id) {
	// rMateGrid 관련 객체
	gridApp3 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot3 = gridApp3.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드3에 헤더 및 레이아웃 셋팅
	gridApp3.setLayout(layoutStr3);

	gridRoot3.addEventListener("dataComplete", dataCompleteHandler3);
}

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2,selectorColumn2;
var gridApp3, gridRoot3, dataGrid3, dataRow3,selectorColumn3;


//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	dataGrid1 = gridRoot1.getDataGrid(); // 그리드 객체
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	//그리드1 첫번째 행 선택
	dataGrid1.setSelectedIndex(0);
	dataRow1 = gridRoot1.getItemAt(0);

	// 현재 선택된 권한에 대한 자세한 정보를 표시한다.
	$('#ROLE_ID').val(dataRow1.ROLE_ID);
	$('#ROLE_NM_DTL').val(dataRow1.ROLE_NM);
	$('#ROLE_DC_DTL').val(dataRow1.ROLE_DC);
	
	//권한이 바뀌기 때문에 체크박스 전체 해제
	$('input:checkbox[name="AUTH_BTN"]').each(function() {
		$('input:checkbox[name="AUTH_BTN"]').attr("checked", false);
	});
	
	if(dataRow1.AUTH_SEARCH == 'Y'){
		$('input:checkbox[id="AUTH_SEARCH"]').attr("checked", true);
	}
	if(dataRow1.AUTH_NEW == 'Y'){
		$('input:checkbox[id="AUTH_NEW"]').attr("checked", true);
	}
	if(dataRow1.AUTH_SAVE == 'Y'){
		$('input:checkbox[id="AUTH_SAVE"]').attr("checked", true);
	}
	if(dataRow1.AUTH_DELETE == 'Y'){
		$('input:checkbox[id="AUTH_DELETE"]').attr("checked", true);
	}
	if(dataRow1.AUTH_EXCEL_DOWN == 'Y'){
		$('input:checkbox[id="AUTH_EXCEL_DOWN"]').attr("checked", true);
	}
	if(dataRow1.AUTH_EXCEL_UPLOAD == 'Y'){
		$('input:checkbox[id="AUTH_EXCEL_UPLOAD"]').attr("checked", true);
	}
	if(dataRow1.AUTH_PRINT == 'Y'){
		$('input:checkbox[id="AUTH_PRINT"]').attr("checked", true);
	}
	if(dataRow1.AUTH_SUBMIT == 'Y'){
		$('input:checkbox[id="AUTH_SUBMIT"]').attr("checked", true);
	}
	if(dataRow1.AUTH_CREATE == 'Y'){
		$('input:checkbox[id="AUTH_CREATE"]').attr("checked", true);
	}
	
	$('input[type="radio"][name="use"][value="' + dataRow1.USE_YN + '"]').attr('checked', true);
	$('#REG_INFO_DTL').val(dataRow1.REG_INFO);
	$('#UPD_INFO_DTL').val(dataRow1.UPD_INFO);
	
	// 현재 선택된 권한에 속해있는 메뉴 목록을 읽어온다. 
	readAppointMenuList($('#ROLE_ID').val());
	
	// 현재 선택된 권한에 속해있지 않은 메뉴 목록을 읽어온다.
	readNotAppointMenuList($('#ROLE_ID').val());
	
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
	//alert(dataRow1.ROLE_NM);
	
	// 현재 선택된 권한에 대한 자세한 정보를 표시한다.
	$('#ROLE_ID').val(dataRow1.ROLE_ID);
	$('#ROLE_NM_DTL').val(dataRow1.ROLE_NM);
	$('#ROLE_DC_DTL').val(dataRow1.ROLE_DC);
	
	//권한이 바뀌기 때문에 체크박스 전체 해제
	$('input:checkbox[name="AUTH_BTN"]').each(function() {
		$('input:checkbox[name="AUTH_BTN"]').attr("checked", false);
	});
	
	if(dataRow1.AUTH_SEARCH == 'Y'){
		$('input:checkbox[id="AUTH_SEARCH"]').attr("checked", true);
	}
	if(dataRow1.AUTH_NEW == 'Y'){
		$('input:checkbox[id="AUTH_NEW"]').attr("checked", true);
	}
	if(dataRow1.AUTH_SAVE == 'Y'){
		$('input:checkbox[id="AUTH_SAVE"]').attr("checked", true);
	}
	if(dataRow1.AUTH_DELETE == 'Y'){
		$('input:checkbox[id="AUTH_DELETE"]').attr("checked", true);
	}
	if(dataRow1.AUTH_EXCEL_DOWN == 'Y'){
		$('input:checkbox[id="AUTH_EXCEL_DOWN"]').attr("checked", true);
	}
	if(dataRow1.AUTH_EXCEL_UPLOAD == 'Y'){
		$('input:checkbox[id="AUTH_EXCEL_UPLOAD"]').attr("checked", true);
	}
	if(dataRow1.AUTH_PRINT == 'Y'){
		$('input:checkbox[id="AUTH_PRINT"]').attr("checked", true);
	}
	if(dataRow1.AUTH_SUBMIT == 'Y'){
		$('input:checkbox[id="AUTH_SUBMIT"]').attr("checked", true);
	}
	if(dataRow1.AUTH_CREATE == 'Y'){
		$('input:checkbox[id="AUTH_CREATE"]').attr("checked", true);
	}
	
	$('input[type="radio"][name="use"][value="' + dataRow1.USE_YN + '"]').attr('checked', true);
	$('#REG_INFO_DTL').val(dataRow1.REG_INFO);
	$('#UPD_INFO_DTL').val(dataRow1.UPD_INFO);
	
	// 현재 선택된 권한에 속해있는 메뉴 목록을 읽어온다. 
	readAppointMenuList($('#ROLE_ID').val());
	
	// 현재 선택된 권한에 속해있지 않은 메뉴 목록을 읽어온다.
	readNotAppointMenuList($('#ROLE_ID').val());
	
	
	//dataGrid2.removeEventListener("itemClick", itemClickHandler2);
	//dataGrid3.removeEventListener("itemClick", itemClickHandler3);
	
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	dataGrid2 = gridRoot2.getDataGrid(); // 그리드 객체
	
	//그리드2 ROW 클릭 정보를 전역변수에 저장
	selectorColumn2 = gridRoot2.getObjectById("selector2");

	//그리드2 row선택시 체크박스 선택을 위한 핸들러
	dataGrid2.addEventListener("itemClick", itemClickHandler2);
	//채크박스
	 selectorColumn  = gridRoot2.getObjectById("selector2");//<DataGridSeletorColumn>의 아이디
     selectorColumn.addEventListener("change",changeHandler2);

	
}


function changeHandler2(event){
        collection = gridRoot2.getCollection();
        if (collection == null) {
        alert("collection 객체를 찾을 수 없습니다");
        return;
    }
        var selectedIndices = selectorColumn.getSelectedIndices();
        collection.removeAllAttribute();//모든 행의 속성을 제거합니다.
        for(var i = 0; i < selectedIndices.length; i++){
            collection.addRowAttributeDetailAt(selectedIndices[i],"","#ffd48b","","","");
        }
    }

//그리드2 ROW 클릭 이벤트
function itemClickHandler2 (event){
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	var rowData = gridRoot2.getItemAt(rowIndex);
	var sArr = dataGrid2.getSelectedIndices();
	var selectedIndices = selectorColumn2.getSelectedIndices();
	var checked = true;
	if ( event.columnIndex == 0 ){
		return;
	};
	for ( var i=0 ; i < selectedIndices.length ; i++ ) {
		if ( selectedIndices[i] == rowIndex ) {
			selectedIndices.splice(i, 1);
			checked = false;
		}
	}
	if ( checked ) {
		selectedIndices.push(rowIndex);
	}
	//alert(selectedIndices);
	selectorColumn2.setSelectedIndices(selectedIndices);
}

//그리드3 컴플릿트 핸들러
function dataCompleteHandler3(event) {
	dataGrid3 = gridRoot3.getDataGrid(); // 그리드 객체
	
	//그리드3 ROW 클릭 정보를 전역변수에 저장
	selectorColumn3 = gridRoot3.getObjectById("selector3");
	
	//그리드3 row선택시 체크박스 선택을 위한 핸들러
	dataGrid3.addEventListener("itemClick", itemClickHandler3);
}

//그리드3 ROW클릭 이벤트
function itemClickHandler3(event) {
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	var rowData = gridRoot3.getItemAt(rowIndex);
	var sArr = dataGrid3.getSelectedIndices();
	var selectedIndices = selectorColumn3.getSelectedIndices();
	var checked = true;
	if ( event.columnIndex == 0 ){
		return;
	};
		
	for ( var i=0 ; i < selectedIndices.length ; i++ ) {
		if ( selectedIndices[i] == rowIndex ) {
			selectedIndices.splice(i, 1);
			checked = false;
		}
	}
	if ( checked ) {
		selectedIndices.push(rowIndex);
	}
	
	//alert(selectedIndices);
	selectorColumn3.setSelectedIndices(selectedIndices);
}

//----------------------- 그리드 설정 끝 -----------------------




//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
	<DataGrid id="dg1">\
		<columns>\
			<DataGridColumn dataField="ROLE_ID"  headerText="권한그룹ID" textAlign="center"  visible="false"/>\
			<DataGridColumn dataField="ROLE_NM"  headerText="'+authGroupList+'" textAlign="center" />\
			<DataGridColumn dataField="AUTH_SEARCH"  headerText="조회권한" textAlign="center" visible="false" />\
			<DataGridColumn dataField="AUTH_NEW"  headerText="신규권한" textAlign="center" visible="false" />\
			<DataGridColumn dataField="AUTH_SAVE"  headerText="저장권한" textAlign="center" visible="false" />\
			<DataGridColumn dataField="AUTH_DELETE"  headerText="삭제권한" textAlign="center" visible="false" />\
			<DataGridColumn dataField="AUTH_EXCEL_DOWN"  headerText="엑셀다운권한" textAlign="center" visible="false" />\
			<DataGridColumn dataField="AUTH_EXCEL_UPLOAD"  headerText="엑셀업로드권한" textAlign="center" visible="false" />\
			<DataGridColumn dataField="AUTH_PRINT"  headerText="프린트권한" textAlign="center" visible="false" />\
			<DataGridColumn dataField="AUTH_SUBMIT"  headerText="확정권한" textAlign="center" visible="false" />\
			<DataGridColumn dataField="AUTH_CREATE"  headerText="생성권한" textAlign="center" visible="false" />\
			<DataGridColumn dataField="USE_YN"  headerText="'+useYn+'" textAlign="center"  labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="ROLE_DC"  headerText="'+explanation+'" textAlign="center" visible="false"/>\
			<DataGridColumn dataField="REG_INFO"  headerText="'+properties+'" textAlign="center" visible="false"/>\
			<DataGridColumn dataField="UPD_INFO"  headerText="'+aboutFixes+'" textAlign="center" visible="false"/>\
			<DataGridColumn dataField="USER_COUNT"  headerText="사용자수" textAlign="center" visible="false"/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//그리드2 헤더 및 레이아웃 (ROW 추가/삭제기능을 하기위해 소트기능은 디스에이블 처리)
var layoutStr2 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1">\
		<columns>\
			<DataGridSelectorColumn id="selector2" width="40" textAlign="center" backgroundColor="#EDEDF0" allowAllSelection="true"  />\
			<DataGridColumn dataField="MENU_NM"  headerText="'+commonCode+'" textAlign="center" />\
			<DataGridColumn dataField="BIGO"  headerText="'+remarks+'" textAlign="center" />\
			<DataGridColumn dataField="MENU_ID"  headerText="'+shortName+'" textAlign="center" />\
		</columns>\
		  <dataProvider>\
          <SpanArrayCollection source="{$gridData}"/>\
          </dataProvider>\
	</DataGrid>\
</rMateGrid>';

//그리드3 헤더 및 레이아웃  (ROW 추가/삭제기능을 하기위해 소트기능은 디스에이블 처리)
var layoutStr3 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1">\
		<columns>\
			<DataGridSelectorColumn id="selector3" width="40" textAlign="center" backgroundColor="#EDEDF0" allowAllSelection="true" />\
			<DataGridColumn dataField="MENU_NM"  headerText="'+commonCode+'" textAlign="center" />\
			<DataGridColumn dataField="BIGO"  headerText="'+remarks+'" textAlign="center" />\
			<DataGridColumn dataField="MENU_ID"  headerText="'+shortName+'" textAlign="center" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';


//그리드 row의 값을 변경하여 보여주기
function labelFunc(item, value, column){
  var str = item["USE_YN"];//삭제여부 컬럼의 필드명
  if(str=="N")
    return "미사용";
  else if(str=="Y")
   return "사용";
}


//지정메뉴 다운
function moveDown() {
	//사용자가 선택한 행의 index번호들 가져오기
	var selector = gridRoot2.getObjectById("selector2");
	var sIndexArr = selector.getSelectedIndices();
	if (sIndexArr == null || sIndexArr.length == 0){
		return;
	}
	// 선택한 행을 오른쪽 rMateGrid에 삽입한다.
	selectorColumn2 = gridRoot2.getObjectById("selector2");
	selectorColumn2.getSelectedIndices();

	var sItemArr2 = selectorColumn2.getSelectedIndices();
	
	
	//그리드 ROW삭제를 위해 역순 정렬을 해준다 : 3->2->1->0 순으로, 0부터 오면 오류 발생
	sItemArr2 = sItemArr2.sort(function(a, b){return b-a;});
	
	//alert(sItemArr2.length +'---------'+ sItemArr2);
	
	for (var i = 0; i < sItemArr2.length; i++) {
		
		dataRow = gridRoot2.getItemAt(sItemArr2[i]);
		
		gridRoot3.addItemAt(dataRow);
		
		gridRoot2.removeItemAt(sItemArr2[i]);
	};
	
	selectorColumn2.setAllItemSelected(false);
	selectorColumn3.setAllItemSelected(false);
	
	
}

//지정메뉴 업
function moveUp() {
	//사용자가 선택한 행의 index번호들 가져오기
	var selector = gridRoot3.getObjectById("selector3");
	var sIndexArr = selector.getSelectedIndices();
	if (sIndexArr == null || sIndexArr.length == 0){
		return;
	}

	// 선택한 행을 왼쪽 rMateGrid에 삽입한다.
	selectorColumn3 = gridRoot3.getObjectById("selector3");
	selectorColumn3.getSelectedIndices();

	var sItemArr3 = selectorColumn3.getSelectedIndices();
	
	//그리드 ROW삭제를 위해 역순 정렬을 해준다 : 3->2->1->0 순으로, 0부터 오면 오류 발생
	sItemArr3 = sItemArr3.sort(function(a, b){return b-a;});
	//alert(sItemArr3.length +'---------'+ sItemArr3);
	
	for (var i = 0; i < sItemArr3.length; i++) {
		
		dataRow = gridRoot3.getItemAt(sItemArr3[i]);
		
		gridRoot2.addItemAt(dataRow);
		
		gridRoot3.removeItemAt(sItemArr3[i]);
	};
	
	selectorColumn2.setAllItemSelected(false);
	selectorColumn3.setAllItemSelected(false);
}

 
//########################################################
//###	1. 최초 DB에서 세팅에 필요한 데이터를 가져온다 ( 시작 )          ###
//########################################################

$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/','')); 
	
	// 신규버튼 클릭
	$('#btn_create').click(function () {
		
		//그리드1 선택해제 : 옵션값 -1
		dataGrid1.setSelectedIndex(-1);
		
		// 권한그룹 목록 초기화
		$('#ROLE_ID').val('');
		$('#ROLE_NM_DTL').val('');
		$('#ROLE_DC_DTL').val('');
		$('input[type="radio"][name="use"][value="Y"]').attr('checked', true);
		$('#REG_INFO_DTL').val('');
		$('#UPD_INFO_DTL').val('');
		
		//신규 시 체크박스 전체 해제
		$('input:checkbox[name="AUTH_BTN"]').each(function() {
			$('input:checkbox[name="AUTH_BTN"]').attr("checked", false);
		});
		
		// 지정 메뉴 목록
		readAppointMenuList('');
		
		// 미지정 메뉴 목록
		readNotAppointMenuList('');
		$("#ROLE_NM_DTL").focus();
	});
	
	
	// 저장버튼 클릭
	$('#btn_update').click(function () {
		if(validationCheck()) {
			
			if(confirm(msgSaveConfirm)){
				var arrPostData = new Array();
				
				/********************************************************************************
				 ** 권한아이디 설정
				 ********************************************************************************/
				
				var role = {};
				role.ROLE_ID = $('#ROLE_ID').val();
				role.ROLE_NM = $('#ROLE_NM_DTL').val();
				role.ROLE_DC = $('#ROLE_DC_DTL').val(); 
				
				role.USE_YN  = $(':radio[name="use"]:checked').val();
				
				//버튼에대한 권한 설정 정보 셋팅 시작
				role.AUTH_SEARCH = 'N';	//조회
				role.AUTH_NEW = 'N';		//신규
				role.AUTH_SAVE = 'N';		//저장
				role.AUTH_DELETE = 'N';	//삭제
				role.AUTH_EXCEL_DOWN = 'N';	//엑셀다운
				role.AUTH_EXCEL_UPLOAD = 'N';	//엑셀업로드
				role.AUTH_PRINT = 'N';	//인쇄
				role.AUTH_SUBMIT = 'N';	//확정
				role.AUTH_CREATE = 'N';	//생성
				
				//조회
				if($('input:checkbox[id="AUTH_SEARCH"]').is(":checked") == true){
					role.AUTH_SEARCH = 'Y';
				}
				
				//신규
				if($('input:checkbox[id="AUTH_NEW"]').is(":checked") == true){
					role.AUTH_NEW = 'Y';
				}
				
				//저장
				if($('input:checkbox[id="AUTH_SAVE"]').is(":checked") == true){
					role.AUTH_SAVE = 'Y';
				}
				
				//삭제
				if($('input:checkbox[id="AUTH_DELETE"]').is(":checked") == true){
					role.AUTH_DELETE = 'Y';
				}
				
				//엑셀다운
				if($('input:checkbox[id="AUTH_EXCEL_DOWN"]').is(":checked") == true){
					role.AUTH_EXCEL_DOWN = 'Y';
				}
				
				//엑셀업로드
				if($('input:checkbox[id="AUTH_EXCEL_UPLOAD"]').is(":checked") == true){
					role.AUTH_EXCEL_UPLOAD = 'Y';
				}
				
				//인쇄
				if($('input:checkbox[id="AUTH_PRINT"]').is(":checked") == true){
					role.AUTH_PRINT = 'Y';
				}
				
				//확정
				if($('input:checkbox[id="AUTH_SUBMIT"]').is(":checked") == true){
					role.AUTH_SUBMIT = 'Y';
				}
				
				//생성
				if($('input:checkbox[id="AUTH_CREATE"]').is(":checked") == true){
					role.AUTH_CREATE = 'Y';
				}
				
				arrPostData[0] = role;
				
				/********************************************************************************/
				
				var idx = 0;
				
				for (var i = 0; i < gridRoot2.getCollection().getSource().length; i++) {
					
					var rowData = gridRoot2.getCollection().getSource()[i];
					if(rowData.BIGO ==undefined || rowData.BIGO == 'undefined' || rowData.BIGO == null){
						rowData.BIGO = "";
					}
					
					arrPostData[idx + 1] = rowData;
					idx ++;
				};
				
				arrPostData = JSON.stringify(arrPostData);
				var postData = arrPostData;
				
				console.log(postData);
				
				$.ajax({
				    type     : "POST",
				    url      : "/saveAth.do", 
				    dataType : "JSON",
				    data     : postData,
				    async    : true,
				    success  : function(data) {
				    	//저장되었습니다.
				    	alert(msgSave);
						readAthGroupList();
				    },
				    complete : function(data) {
				    },
				    error    : function(xhr, status, error) {
				    	//alert("에러발생");
				    	CommonJs.alertErrorStatus(xhr.status, error);
				    }
				});
			}
		}
		
	});
	
	
	// 조회버튼 클릭
	$('#btn_read').click(function () {
		
		readAthGroupList();
		
	});
	
	// 삭제 버튼 클릭
	$('#btn_delete').click(function () {
		
		var role_id = $('#ROLE_ID').val();
		
		if(role_id != '') {
			var count = dataRow1.USE_COUNT;
			
			var msg = '';
			
			if(count == '0') {
				//권한을 삭제 하시겠습니까?
				msg = msgAuthDel; 
			} else {
				 // 명의 사용자가 권한을 사용하고있습니다.
				msg = count + msgAutUser;
				//권한을 삭제 하시겠습니까?
				msg +=msgAuthDel; 
			}
			
			var role = {};
			role.ROLE_ID = $('#ROLE_ID').val();
			
			var postData = JSON.stringify(role);
			
			if(confirm(msg)) {
				
				$.ajax({
				    type     : "POST",
				    url      : "/deleteAthGroup.do",
				    dataType : "JSON",
				    data     : postData,
				    async    : true,
				    success  : function(data) {
				    	//삭제되었습니다.
				    	alert(msgDelete); 
						readAthGroupList();
				    },
				    complete : function(data) {
				    },
				    error    : function(xhr, status, error) {
				    	CommonJs.alertErrorStatus(xhr.status, error);  
				    	//alert("에러발생");
				    }
				});
			}
		}
		
	});
	
});

// 권한 그룹 목록 그리드
function readAthGroupList() {
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/readAthGroupList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {USE_YN : $('#use_yn').val()},
		success:function(data){
			
			//그리드1 데이터 조회
			gridApp1.setData(data);
			
			//그리드2,3 초기화
			gridApp2.setData(null);
			gridApp3.setData(null);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	
}

/*********************************************************************************************************************************************
 ** 권한그룹목록을 보여주는 그리드의 행을 클릭했을경우 발생하는 함수(이벤트)
 *********************************************************************************************************************************************/

// 지정 메뉴 목록 그리드2
function readAppointMenuList(aROLE_ID) {

	jQuery.ajax({ 
	    url:"/readAppointMenuList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: { ROLE_ID : aROLE_ID },
		success:function(data){  
			//그리드2에 데이터 셋팅
			gridApp2.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


// 미지정 메뉴 목록 그리드3
function readNotAppointMenuList(aROLE_ID) {
	
	jQuery.ajax({ 
	    url:"/notAppointMenuList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data:  { ROLE_ID : aROLE_ID },
		success:function(data){  
			//그리드3에 데이터 셋팅
			gridApp3.setData(data);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1, #gridHolder2, #gridHolder3").width("100%");
	/*if ( $(window).width <= 1200 ) $($("#frame_box").width(960));*/
	
	var hei1 = $(window).height() - 347;
	var hei2 = $(window).height() - 411;
	var hei3 = 242;
	
	$("#gridHolder1").height(hei1);
	$("#gridHolder2").height(hei2);
	$("#gridHolder3").height(hei3);
	
	$(window).on('resize',function (){	
		
		var hei1 = $(window).height() - 383;
		var hei2 = $(window).height() - 411;
		var hei3 = 242;
		
		$("#gridHolder1").height(hei1);
		$("#gridHolder2").height(hei2);
		$("#gridHolder3").height(hei3);
	});
});
 
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################