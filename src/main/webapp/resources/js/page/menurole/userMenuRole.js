/********************************************************
 * 설명:  사용자 기능별 권한 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 문희훈
 * since	: 2017.12.18
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------
//그리드2 데이터 초기화
var gridData2 = [];
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";


//rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid2", "gridHolder2", jsVars2+"&dataType=xml", "100%");

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
	
	var loadData =  $("#top_search").serializeAllObject();
	
	gridRoot1.addLoadingBar();
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/getUserRoleList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: loadData,
		success:function(data){  
			gridApp1.setData(data);
	    },
	    complete : function(data) {
	    	gridRoot1.removeLoadingBar();	       	
	    },
	    error : function(xhr, status, error) {
	    	gridRoot1.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});

	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

//그리드2 레디 핸들러
function gridReadyHandler2(id) {
	gridApp2 = document.getElementById(id);	// 그리드를 포함하는 div 객체	
	gridRoot2 = gridApp2.getRoot();	// 데이터와 그리드를 포함하는 객체

	gridApp2.setDataType("xml");
	gridApp2.setLayout(layoutStr2);
	gridApp2.setData(gridData2);
	
	gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
	gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
}

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2,selectorColumn2,collection2;


//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	dataGrid1 = gridRoot1.getDataGrid(); // 그리드 객체
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	//그리드1 첫번째 행 선택
	//dataGrid1.setSelectedIndex(0);
	//dataRow1 = gridRoot1.getItemAt(0);
	
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
	//alert(dataRow1.USER_ID);
	
	gridRoot2.addLoadingBar();
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/getUserMenuRoleList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: dataRow1,
		success:function(data){  
			gridApp2.setData(data);
	    },
	    complete : function(data) {
	    	gridRoot2.removeLoadingBar();	       	
	    },
	    error : function(xhr, status, error) {
	    	gridRoot2.removeLoadingBar();	       	
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	// 현재 선택된 권한에 속해있는 메뉴 목록을 읽어온다. 
	//readAppointMenuList($('#ROLE_ID').val());
}

//그리드2 레이아웃 컴플릿트 핸들러
function layoutCompleteHandler2(event) {
	switch(event['target'].id){
		case "grid2":
			dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체	
			// 헤드 정렬 초기화
			rMateSortHeadInit(dataGrid2);	
			dataGrid2.setDoubleClickEnabled(true);
			break;
	}
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	switch(event['target'].id){
	case "grid2":
		dataGrid2 = gridRoot2.getDataGrid(); 
		
		// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
		collection2 = gridRoot2.getCollection();	
		dataGrid2 = gridRoot2.getDataGrid();
		break;
	}
}



//----------------------- 그리드 설정 끝 -----------------------




//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
	<DataGrid id="dg1">\
		<columns>\
			<DataGridColumn dataField="No" id="colNo" itemRenderer="IndexNoItem" textAlign="center" width="40"/>\
			<DataGridColumn dataField="USER_ID"  headerText="'+staffId+'" textAlign="center" />\
			<DataGridColumn dataField="USER_NM"  headerText="'+staffName+'" textAlign="center"/>\
			<DataGridColumn dataField="POSITION"  headerText="'+rank+'" textAlign="center"/>\
			<DataGridColumn dataField="DEPT_NAME"  headerText="'+departmentName+'" textAlign="center" />\
			<DataGridColumn dataField="DEPT_CODE"  headerText="'+deptCode+'" textAlign="center"  visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//그리드2 헤더 및 레이아웃 (ROW 추가/삭제기능을 하기위해 소트기능은 디스에이블 처리)
var layoutStr2 =
	'<rMateGrid>\
	<DataGrid id="dg2" editable="true" selectionMode="singleRow" itemRenderer="EditableIconItem" sortableColumns="false">\
		<columns>\
			<DataGridRowStateColumn id="rowState" 		textAlign="center" /> \
			<DataGridColumn dataField="MENU_ID"    		headerText="메뉴ID"  textAlign="left" editable="false"/>\
			<DataGridColumn dataField="MENU_NM"   		headerText="메뉴명" textAlign="left" editable="false" />\
			<DataGridColumn dataField="AUTH_NEW"     	headerText="신규"  textAlign="center" width="60" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'Y\',\'code\':\'Y\'},{\'label\':\'N\',\'code\':\'N\'}]"/>\
			<DataGridColumn dataField="AUTH_SAVE"    	headerText="저장"  textAlign="center" width="60" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'Y\',\'code\':\'Y\'},{\'label\':\'N\',\'code\':\'N\'}]"/>\
			<DataGridColumn dataField="AUTH_SEARCH" 	headerText="조회"  textAlign="center" width="60" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'Y\',\'code\':\'Y\'},{\'label\':\'N\',\'code\':\'N\'}]"/>\
			<DataGridColumn dataField="AUTH_DELETE" 	headerText="삭제"  textAlign="center" width="60" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'Y\',\'code\':\'Y\'},{\'label\':\'N\',\'code\':\'N\'}]"/>\
			<DataGridColumn dataField="AUTH_SUBMIT" 	headerText="확정"  textAlign="center" width="60" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'Y\',\'code\':\'Y\'},{\'label\':\'N\',\'code\':\'N\'}]"/>\
			<DataGridColumn dataField="AUTH_CREATE" 	headerText="생성"  textAlign="center" width="60" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'Y\',\'code\':\'Y\'},{\'label\':\'N\',\'code\':\'N\'}]"/>\
			<DataGridColumn dataField="AUTH_PRINT"    headerText="인쇄"  textAlign="center" width="60" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'Y\',\'code\':\'Y\'},{\'label\':\'N\',\'code\':\'N\'}]"/>\
			<DataGridColumn dataField="AUTH_EXCEL"    headerText="엑셀"  textAlign="center" width="60" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'Y\',\'code\':\'Y\'},{\'label\':\'N\',\'code\':\'N\'}]"/>\
			<DataGridColumn dataField="ORG_TYPE"    	headerText="관리구분"  textAlign="center" width="80" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'본부\',\'code\':\'1\'},{\'label\':\'관리\',\'code\':\'2\'},{\'label\':\'영업\',\'code\':\'3\'}]"/>\
			<DataGridColumn dataField="USE_YN"      		headerText="사용구분"  textAlign="center" width="80" showEditableIcon="always" editableIcon="DownArrow"  itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="ComboxItem" itemRendererDataProvider="[{\'label\':\'Y\',\'code\':\'Y\'},{\'label\':\'N\',\'code\':\'N\'}]"/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';



 
//########################################################
//###	1. 최초 DB에서 세팅에 필요한 데이터를 가져온다 ( 시작 )          ###
//########################################################

$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/','')); 
	
	//순위(직급)
	$("#iframeCnt select[name=TOP_POSITION]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=TOP_POSITION]", "POSITION");
	
	// 부서명 가져오기
	var loadData= {};
	$("#iframeCnt select[name=TOP_DEPT_CODE]").append('<option value="">'+ all +'</option>');
	jQuery.ajax({
	    type:"POST",
	    url:"/getDeptCodeList.do", 
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:loadData,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#TOP_DEPT_CODE").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	/*검색조건 엔터 제어 시작*/
	$('#TOP_USER_NM').on('keyup', function(e) {
	    if (e.which == 13) {
	    	readUserList();
	    }
	});
	$('#ORI_USER_NM').on('keyup', function(e) {
	    if (e.which == 13) {
	    	popSearchUser1();
	    }
	});
	$('#TO_USER_NM').on('keyup', function(e) {
	    if (e.which == 13) {
	    	popSearchUser1();
	    }
	});
	/*검색조건 엔터 제어 끝*/
	
	
	// 저장버튼 클릭
	$('#btn_update').click(function () {
		
		var myVar1 = "";
		// 셀렉트 박스 포커스 아웃을 위한 처리
		myVar1 = setTimeout(fnSave, 400);
		
	});
	
	
	// 조회버튼 클릭
	$('#btn_read').click(function () {
		
		readUserList();
		
	});
	
	
});

//저장
function fnSave(){
	
	if(dataGrid1.getSelectedIndex()  == -1){
		alert("사원목록을 선택하세요.");		
		return;
	}
	window.returnVal = "";
	var changeStrArray = gridRoot2.getChangedData();
	if(changeStrArray == '' || changeStrArray.legnth == 0){
		alert("변경한 데이터가 없습니다.");		
		return;
	}	
	
	
	if(confirm(msgSaveConfirm)){
		var object = new Array();
		var idx = "";
		var job = "";
		var data = "";
		var tranxml = "";
		
		var firstTag="<GRIDROW></GRIDROW>";  
		
		//alert(dataRow1.USER_ID);
		
		var USER_ID= "";
		var MENU_ID= "";
		var AUTH_NEW= "";
		var AUTH_SAVE= "";
		var AUTH_SEARCH= "";
		var AUTH_DELETE= "";
		var AUTH_SUBMIT= "";
		var AUTH_CREATE= "";
		var AUTH_PRINT= "";
		var AUTH_EXCEL= "";
		var ORG_TYPE= "";
		var USE_YN= "";
		
		for(var j = 0 ;j < changeStrArray.length ; j++){
			if (window.DOMParser)
		    {   parser = new DOMParser();
		        xmlDoc = parser.parseFromString(firstTag,"text/xml");
			}
			else // 인터넷 익스플로러
			{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			    xmlDoc.async=false;
		        xmlDoc.loadXML(firstTag); 
		    }  
			
			USER_ID= xmlDoc.createElement('USER_ID'); 
			MENU_ID= xmlDoc.createElement('MENU_ID');  
			AUTH_NEW= xmlDoc.createElement('AUTH_NEW');  
			AUTH_SAVE= xmlDoc.createElement('AUTH_SAVE');  
			AUTH_SEARCH= xmlDoc.createElement('AUTH_SEARCH');  
			AUTH_DELETE= xmlDoc.createElement('AUTH_DELETE');  
			AUTH_SUBMIT= xmlDoc.createElement('AUTH_SUBMIT');  
			AUTH_CREATE= xmlDoc.createElement('AUTH_CREATE');  
			AUTH_PRINT= xmlDoc.createElement('AUTH_PRINT');  
			AUTH_EXCEL= xmlDoc.createElement('AUTH_EXCEL');  
			ORG_TYPE= xmlDoc.createElement('ORG_TYPE');  
			USE_YN= xmlDoc.createElement('USE_YN');  
			
			object = new Array();
			object = changeStrArray[j];
			idx = object.idx; // idx 변경 행수
			job = object.job; // job : U update job : I Insert, job : D Delete
			data = object.data; // data
			
			USER_ID.appendChild(xmlDoc.createTextNode(dataRow1.USER_ID));
			MENU_ID.appendChild(xmlDoc.createTextNode(data.MENU_ID));
			AUTH_NEW.appendChild( xmlDoc.createTextNode(data.AUTH_NEW));
			AUTH_SAVE.appendChild(  xmlDoc.createTextNode(data.AUTH_SAVE));
			AUTH_SEARCH.appendChild( xmlDoc.createTextNode(data.AUTH_SEARCH));
			AUTH_DELETE.appendChild( xmlDoc.createTextNode(data.AUTH_DELETE));
			AUTH_SUBMIT.appendChild( xmlDoc.createTextNode(data.AUTH_SUBMIT));
			AUTH_CREATE.appendChild( xmlDoc.createTextNode(data.AUTH_CREATE));
			AUTH_PRINT.appendChild(  xmlDoc.createTextNode(data.AUTH_PRINT));
			AUTH_EXCEL.appendChild(xmlDoc.createTextNode(data.AUTH_EXCEL));
			ORG_TYPE.appendChild( xmlDoc.createTextNode(data.ORG_TYPE));
			USE_YN.appendChild( xmlDoc.createTextNode(data.USE_YN));
			

			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USER_ID);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MENU_ID);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AUTH_NEW);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AUTH_SAVE);	
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AUTH_SEARCH);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AUTH_DELETE);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AUTH_SUBMIT);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AUTH_CREATE);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AUTH_PRINT);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(AUTH_EXCEL);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORG_TYPE);		
			xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(USE_YN);		
			
			
			tranxml = tranxml +  getXmlString(xmlDoc);		
		}
		tranxml =  "<GRIDLIST>"+tranxml+"</GRIDLIST>" ;
		
		//alert(tranxml);
		
		jQuery.ajax({ 
		    url:"/userMenuRoleUpdate.do",         
		    type:"POST",
			datatype:"xml",
			async:false,
			data: {
						"gridXmlData" : tranxml
			        }, 
			success:function(data){   			

				//결과리턴
				var obj = jQuery.parseJSON(data.CUR);
				if(obj[0].RETURN_CODE == '0000'){
					
					//저장 되었습니다.
					alert("저장 되었습니다.");
					
					gridRoot2.addLoadingBar();
					//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
					jQuery.ajax({ 
					    url:"/getUserMenuRoleList.do",         
					    type:"POST",
						datatype:"json",
						//async:false,
						data: dataRow1,
						success:function(data){  
							gridApp2.setData(data);
					    },
					    complete : function(data) {
					    	gridRoot2.removeLoadingBar();	       	
					    },
					    error : function(xhr, status, error) {
					    	gridRoot2.removeLoadingBar();	       	
					    	CommonJs.alertErrorStatus(xhr.status, error);
					    }
					});
				}else{
					//요청중 문제가 발생했습니다.관리자에게 문의하세요.
					alert(msgErrorDefault);
					return;
				}
		    },
		    complete : function(data) {
				
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	}
}

function fnCopy(){
	
	if($("#ORI_USER_NAME").val() =="" || $("#ORI_IEMP_NO").val() ==""){
		alert("기 사원을 선택해 주세요.");
		return;
	}
	
	if($("#TO_USER_NAME").val() =="" || $("#TO_IEMP_NO").val() ==""){
		alert("대상 사원을 선택해 주세요.");
		return;
	}
	
	if($("#ORI_IEMP_NO").val() == $("#TO_IEMP_NO").val()){
		alert("동일한 사원의 권한 복사 등록은 할 수 없습니다.");
		return;
	}
	
	if(confirm($("#ORI_USER_NAME").val()+"사원의 메뉴별 권한을 "+$("#TO_USER_NAME").val()+"사원에게 복사 하시겠습니까?"   )){
		var loadData =  $("#copyLayer").serializeAllObject();
		
		//메뉴별 권한 복사 등록 실행
		jQuery.ajax({ 
		    url:"/copyUserRoleList.do",         
		    type:"POST",
			datatype:"json",
			//async:false,
			data: loadData,
			success:function(data){  
				//결과리턴
				var obj = jQuery.parseJSON(data.CUR);
				if(obj[0].RETURN_CODE == '0000'){
					
					//메뉴 별 권한이 복사 등록 되었습니다.
					alert("메뉴 별 권한이 복사 등록 되었습니다.");
					
					//초기화
					$("#ORI_USER_NAME").val("");
					$("#ORI_DEPT_CODE").val("");
					$("#ORI_IEMP_NO").val("");
					$("#TO_USER_NAME").val("");
					$("#TO_DEPT_CODE").val("");
					$("#TO_IEMP_NO").val("");
					return;
				}else{
					//요청중 문제가 발생했습니다.관리자에게 문의하세요.
					alert(msgErrorDefault);
					return;
				}
			},
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	}
	
	
	
}

// 사원목록 조회
function readUserList() {
	
	//초기화
	$("#ORI_USER_NAME").val("");
	$("#ORI_DEPT_CODE").val("");
	$("#ORI_IEMP_NO").val("");
	$("#TO_USER_NAME").val("");
	$("#TO_DEPT_CODE").val("");
	$("#TO_IEMP_NO").val("");
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	var loadData =  $("#top_search").serializeAllObject();
	
	gridRoot1.addLoadingBar();
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/getUserRoleList.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: loadData,
		success:function(data){  
			gridApp1.setData(data);
			//그리드2 초기화
			gridApp2.setData(null);
	    },
	    complete : function(data) {
	    	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	gridRoot1.removeLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

/*********************************************************************************************************************************************
 ** 권한그룹목록을 보여주는 그리드의 행을 클릭했을경우 발생하는 함수(이벤트)
 *********************************************************************************************************************************************/

//권한복사등록 사용자 검색1
function popSearchUser1(){
	$('#comm_pop_wrap4' ).dialog( 'open' );
	gridApp13.resize();

	$("#P_CALLBACK_NM4").val('fn_comm_member_callback1(dataRow13)');
	if($("#ORI_USER_NAME").val() != null && $("#ORI_USER_NAME").val() != ""){
		$("#P_TEXT4").val($("#ORI_USER_NAME").val());
		btn_comm_search('4');
	}else{
		$("#P_TEXT4").val("");
		btn_comm_search('4');
	}

}
//권한복사등록 사용자 검색1 콜백함수
function fn_comm_member_callback1(dataRow13){
	//alert(dataRow13);
	$("#ORI_USER_NAME").val(dataRow13.USER_NM);
	$("#ORI_DEPT_CODE").val(dataRow13.DEPT_CODE);
	$("#ORI_IEMP_NO").val(dataRow13.USER_ID);
}

//권한복사등록 사용자 검색2 
function popSearchUser2(){
	$('#comm_pop_wrap4' ).dialog( 'open' );
	gridApp13.resize();

	$("#P_CALLBACK_NM4").val('fn_comm_member_callback2(dataRow13)');
	if($("#TO_USER_NAME").val() != null && $("#TO_USER_NAME").val() != ""){
		$("#P_TEXT4").val($("#TO_USER_NAME").val());
		btn_comm_search('4');
	}else{
		$("#P_TEXT4").val("");
		btn_comm_search('4');
	}

}
//권한복사등록 사용자 검색2 콜백함수
function fn_comm_member_callback2(dataRow13){
	//alert(dataRow13);
	$("#TO_USER_NAME").val(dataRow13.USER_NM);
	$("#TO_DEPT_CODE").val(dataRow13.DEPT_CODE);
	$("#TO_IEMP_NO").val(dataRow13.USER_ID);
}

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$(".col2 .box_lft").width(457);
	$(".col2 .box_rgt").css("marginLeft","457px");
	$("#gridHolder1").width($(".col2 .box_lft").width()-15);
	$("#gridHolder2").width("100%");
	/*if ( $(window).width <= 1200 ) $($("#frame_box").width(960));*/
	
	var hei1 = $(window).height() - 105;
	var hei2 = $(window).height() - 165;
	
	$("#gridHolder1").height(hei1);
	$("#gridHolder2").height(hei2);
	
	$(window).on('resize',function (){	
		
		var hei1 = $(window).height() - 105;
		var hei2 = $(window).height() - 165;
		
		$("#gridHolder1").height(hei1);
		$("#gridHolder2").height(hei2);
	});
});
 

function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################