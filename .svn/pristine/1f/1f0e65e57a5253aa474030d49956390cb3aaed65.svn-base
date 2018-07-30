/********************************************************
*    설명: WMS - 입고예정관리
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-01-04    문희훈       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/
	
$(document).ready(function(){
	
	init();
	
	

	/**검색조건 날짜 체크*/
	 $(".datepicker1").datepicker({ onSelect: function(dateText){ 	 	 
			 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			 if($("#P_PUR_SDAY").val()  >  $("#P_PUR_EDAY").val()){   
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_PUR_SDAY").val(CUR_DT);
				return;
			}	 
		}, 	
		showMonthAfterYear:true 
	});
		 
	$(".datepicker2").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if($("#P_PUR_SDAY").val()  >  $("#P_PUR_EDAY").val()){
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_PUR_EDAY").val(CUR_DT);
				return;
			}	 
		}, 	
		showMonthAfterYear:true 
	});

	
	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeMonthDate = new CommDateManager().before(0, 0).getDate("yyyy-mm"); // 일주일전 before(년,월,일)
	
	$("#P_PUR_EDAY").val(lsToDate);
	$("#P_PUR_SDAY").val(beforeMonthDate+'-01');
	
	//배송구분
	$("#iframeCnt select[name=P_ROUTE_GB]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=P_ROUTE_GB]", "ROUTE_GB");
	
	
	// 팝업의 조회조건절의 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) { 
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_supply_search();
		} 
	});
	$("input[name=P_ITEM_NAME]").keydown(function (key) { 
		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			btn_comm_product_search();
		} 
	});
	
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";
var jsVars2 = "rMateOnLoadCallFunction=gridReadyHandler2";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);
rMateGridH5.create("grid2", "gridHolder2", jsVars2+"&dataType=xml");

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1;
var gridApp2, gridRoot2, dataGrid2, dataRow2,clickData2,selectorColumn2, collection2;

//입고 확정 금액
var purMoney = 0;
//발주수량
var ordQty = 0;
//그리드1 데이터 초기화
var gridData1 = [];
//그리드2 데이터 초기화
var gridData2 = [];
//헤더정렬을 위한 FALG
var searchFlag ="";

var totalCnt="0";	// 전체건수
var RowsPerPage = 20;// 1페이지에서 보여줄 행 수
var pageIndex = 1;	// 요청페이지번호
var orderBy = "";
var columnName = ""; 

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp1.setData(gridData1);

	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	
}

//그리드1 layoutCompleteHandler1
function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	// 헤드 정렬 초기화
	rMateSortHeadInit(dataGrid1);
}


//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	
	//셀렉트박스 선택 이벤트
	selectorColumn1 = gridRoot1.getObjectById("selector1");
	
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	//그리드1 헤더 클릭 이벤트
	dataGrid1.addEventListener("headerRelease", headerRelease1);
	
	
	drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
}

//그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	//그리드2에 소팅이 되어있다면 초기화 처리
	collection2.setSort(null);
    // collection 정보를 새로고침합니다.
    collection2.refresh();
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	//alert(dataRow1.ROLE_NM);
	
	//로딩바보이기
	showLoadingBar2();
	//그리드2 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/getWmsInDtlList.do",         
	    type:"POST",
		datatype:"xml",
		data: dataRow1,
		success:function(data){  
			//gridApp2.setData(data);
			//그리드2 초기화 
			gridRoot2.removeAll( );
  
			for(var i=0 ; i < data.length ; i++ )
			{ 
				/*XML 기본 구성 헤더 시작*/
				var firstTag="<GRIDROW></GRIDROW>";  
				if (window.DOMParser)
			    {   parser = new DOMParser();
			        xmlDoc = parser.parseFromString(firstTag,"text/xml");
				}
				else // 인터넷 익스플로러
				{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				    xmlDoc.async=false;
			        xmlDoc.loadXML(firstTag); 
			    }  
				/*XML 기본 구성 헤더 끝*/
				var SEQ 				= xmlDoc.createElement('SEQ');
				var SLIP_NO			= xmlDoc.createElement('SLIP_NO');
				var PUR_DT 			= xmlDoc.createElement('PUR_DT');
				var ITM_CODE 		= xmlDoc.createElement('ITM_CODE'); 
				var ITM_NAME 		= xmlDoc.createElement('ITM_NAME'); 
				var UNIT 				= xmlDoc.createElement('UNIT'); 
				var IPSU_QTY 		= xmlDoc.createElement('IPSU_QTY'); 
				var PUR_WPRC 		= xmlDoc.createElement('PUR_WPRC');
				var PUR_WVAT 		= xmlDoc.createElement('PUR_WVAT'); 
				var PUR_WCOST 		= xmlDoc.createElement('PUR_WCOST'); 
				var ORD_QTY 			= xmlDoc.createElement('ORD_QTY'); 
				var ORD_WAMT 		= xmlDoc.createElement('ORD_WAMT'); 
				var SCM_QTY 			= xmlDoc.createElement('SCM_QTY');
				var DEC_QTY 			= xmlDoc.createElement('DEC_QTY'); 
				var PUR_WAMT 		= xmlDoc.createElement('PUR_WAMT');  
				var STR_CODE 		= xmlDoc.createElement('STR_CODE');
				 
				SEQ.appendChild(  			xmlDoc.createTextNode( 	data[i].SEQ  			)	);
				SLIP_NO.appendChild(    	xmlDoc.createTextNode( 	data[i].SLIP_NO  		)	);
				PUR_DT.appendChild(  		xmlDoc.createTextNode( 	data[i].PUR_DT  		)	);
				ITM_CODE.appendChild(  	xmlDoc.createTextNode( 	data[i].ITM_CODE  	)	);
				ITM_NAME.appendChild(  	xmlDoc.createTextNode(	data[i].ITM_NAME 	)	);
				UNIT.appendChild( 			xmlDoc.createTextNode(	data[i].UNIT 			)	);
				IPSU_QTY.appendChild( 	xmlDoc.createTextNode(	data[i].IPSU_QTY		) 	);
				PUR_WPRC.appendChild( 	xmlDoc.createTextNode(	data[i].PUR_WPRC	) 	);
				PUR_WVAT.appendChild( 	xmlDoc.createTextNode(	data[i].PUR_WVAT	) 	);
				PUR_WCOST.appendChild( 	xmlDoc.createTextNode(	data[i].PUR_WCOST	) 	);
				ORD_QTY.appendChild(		xmlDoc.createTextNode(	data[i].ORD_QTY		) 	);
				ORD_WAMT.appendChild( 	xmlDoc.createTextNode(	data[i].ORD_WAMT   )	); 
				SCM_QTY.appendChild(		xmlDoc.createTextNode(	data[i].SCM_QTY	    )	);
				DEC_QTY.appendChild(		xmlDoc.createTextNode(	data[i].DEC_QTY	    )	);
				PUR_WAMT.appendChild(	xmlDoc.createTextNode(	data[i].PUR_WAMT	)	);
				STR_CODE.appendChild(	xmlDoc.createTextNode(	data[i].STR_CODE	)	);
				  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SLIP_NO);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_DT);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(IPSU_QTY);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_WPRC);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_WVAT);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_WCOST);  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_QTY);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ORD_WAMT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCM_QTY);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_WAMT);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);   
				
				gridRoot2.addItemAt(  xmlDoc  , 0 , false);
  	
			}
	    },
	    complete : function(data) {
	    	hideLoadingBar2();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar2();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

//그리드2 레디 핸들러
function gridReadyHandler2(id) {
	// rMateGrid 관련 객체
	gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridApp2.setDataType("xml");
	gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
	
	//그리드2에 헤더 및 레이아웃 셋팅
	gridApp2.setLayout(layoutStr2);
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp2.setData(gridData2);
	
	gridRoot2.addEventListener("itemDataChanged", itemDataChangeHandler2);
	gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
}


//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	dataGrid2 = gridRoot2.getDataGrid(); // 그리드 객체
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
	//그리드2 셀선택 이벤트
	//dataGrid2.addEventListener("itemClick", itemClickHandler2);
}


//그리드2 ROW 원클릭 이벤트
/*function itemClickHandler2(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	//발주입고 수량
	ordQty = gridRoot2.getItemFieldAt( rowIndex , "ORD_QTY");
	//매입 원가
	purMoney = gridRoot2.getItemFieldAt( rowIndex , "PUR_WPRC");
	//alert(dataRow1.ROLE_NM);
}*/


//그리드2 컬럼데이터 변경 핸들러
function itemDataChangeHandler2(event){
	var rowIndex = event.rowIndex;                  // 변경된 행번호
    var columnIndex = event.columnIndex;        // 변경된 열번호
    var dataField = event.dataField;                // 변경된 열의 데이터 필드
    var dataRow = gridRoot2.getItemAt(rowIndex); // 변경된 데이터 레코드
    var oldValue = event.value;                     // 변경전 값
    var newValue = event.newValue;                  // 변경후 값
 
    //SCM납품 수량
	ordQty = gridRoot2.getItemFieldAt( rowIndex , "SCM_QTY");
	//매입 원가
	purMoney = gridRoot2.getItemFieldAt( rowIndex , "PUR_WCOST");
	
   // alert("로우인덱스:"+ rowIndex);
    //alert("컬럼인덱스:"+ columnIndex);
    
	if (dataField == "DEC_QTY") {
		if (newValue == null || newValue == ""){
			//값을 입력하세요.
			alert(mentWmsIn1);
			gridRoot2.setItemFieldAt(0, rowIndex , "DEC_QTY");
			gridRoot2.setItemFieldAt(0, rowIndex , "PUR_WAMT");
			saveFlag="N";
			return;
		}else if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot2.setItemFieldAt(0, rowIndex , "DEC_QTY");
			gridRoot2.setItemFieldAt(0, rowIndex , "PUR_WAMT");
			saveFlag="N";
			return;
		}else if(Number(ordQty) < Number(newValue)){
			//납품수량보다 값이 클 수 없습니다.
		    alert(mentWmsIn9);
		    gridRoot2.setItemFieldAt(0, rowIndex , "DEC_QTY");
		    gridRoot2.setItemFieldAt(0, rowIndex , "PUR_WAMT");
		    saveFlag="N";
		    return;
		 }else{
			 //최종 확정 입고금액 셋팅
			 gridRoot2.setItemFieldAt(newValue*purMoney, rowIndex , "PUR_WAMT");
			 saveFlag="Y";
		 }
	} 
}



//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows">\
		<columns>\
			<DataGridSelectorColumn id="selector1" width="40" textAlign="center"  headerText="'+select+'"  backgroundColor="#EDEDF0" allowAllSelection="false" secondLabelJsFunction="secondLabelFunc" showDataTips="true" />\
			<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="60" />\
			<DataGridColumn dataField="PUR_DT"  headerText="발주일자" textAlign="center"  width="100"/>\
			<DataGridColumn dataField="SLIP_NO" headerText="전표번호" textAlign="center"  width="150" />\
			<DataGridColumn dataField="PUR_GB" headerText="'+goodsReceiptType+'" textAlign="center" sortable="false"  width="70"/>\
			<DataGridColumn dataField="ROUTE_GB" headerText="'+routeGb+'" textAlign="center" sortable="false"  width="70"/>\
		 	<DataGridColumn dataField="VEN_CODE" headerText="'+venCode+'" textAlign="center" sortable="false"  width="100"/>\
			<DataGridColumn dataField="VEN_NAME" headerText="'+venName+'" textAlign="left" sortable="false" />\
		    <DataGridColumn dataField="ORD_WAMT" headerText="'+orderAmount+'" textAlign="right" formatter="{numfmt}"/>\
			<DataGridColumn dataField="PUR_WAMT" headerText="'+amountOfGoodsReceipt+'" textAlign="right" formatter="{numfmt}"/>\
			<DataGridColumn dataField="PUR_CFM_DT" headerText="'+inspectionDate+'" textAlign="center" visible="false"  width="100"/>\
			<DataGridColumn dataField="STR_CODE" headerText="STR_CODE" visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//그리드2 헤더 설정
var layoutStr2 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true" />\
	<DataGrid id="dg1" editable="true" doubleClickEnabled="true"  horizontalScrollPolicy="fasle" itemRenderer="EditableIconItem"  verticalAlign="middle"  textAlign="center" sortableColumns="true" showDataTips="true" >\
		<columns>\
			<DataGridColumn dataField="SEQ" headerText="No" visible="false"/>\
			<DataGridColumn dataField="SLIP_NO" headerText="입고번호" visible="false"/>\
			<DataGridColumn dataField="PUR_DT" headerText="입고일자" visible="false"/>\
			<DataGridColumn dataField="ITM_CODE" headerText="'+itmCode+'" textAlign="center" editable="false"  width="100"/>\
			<DataGridColumn dataField="ITM_NAME" headerText="'+itmName+'" textAlign="left" editable="false"  />\
			<DataGridColumn dataField="UNIT" headerText="'+unit+'" textAlign="center" editable="false"  width="50"/>\
			<DataGridColumn dataField="IPSU_QTY" headerText="'+ipsuQty+'" textAlign="right" formatter="{numfmt}" editable="false"  width="50"/>\
			<DataGridColumn dataField="PUR_WPRC" headerText="'+purchasePrice+'" textAlign="right" formatter="{numfmt}" editable="false" width="80"/>\
			<DataGridColumn dataField="PUR_WVAT" headerText="'+baseWVAT+'" textAlign="right" formatter="{numfmt}" editable="false" id="dg1col09" width="70"/>\
			<DataGridColumn dataField="PUR_WCOST" headerText="'+purchaseCost+'" textAlign="right" formatter="{numfmt}" editable="false" id="dg1col10"  width="80"/>\
			<DataGridColumn dataField="ORD_QTY" headerText="'+orderQuantity+'" textAlign="right" formatter="{numfmt}" editable="false"  width="70"/>\
			<DataGridColumn dataField="ORD_WAMT" headerText="'+orderAmount+'" textAlign="right" formatter="{numfmt}" editable="false" id="dg1col11"  width="100"/>\
			<DataGridColumn dataField="SCM_QTY" headerText="'+deliveryQuantity+'" textAlign="right" formatter="{numfmt}"   editable="false"  width="70"/>\
			<DataGridColumn dataField="DEC_QTY" headerText="'+quantityReceived+'" textAlign="right" formatter="{numfmt}" showEditableIcon="always"  width="70"/>\
			<DataGridColumn dataField="PUR_WAMT" headerText="'+amountOfGoodsReceipt+'" textAlign="right" formatter="{numfmt}" editable="false" id="dg1col13"  width="100"/>\
			<DataGridColumn dataField="STR_CODE" headerText="점포코드" visible="false"/>\
			<DataGridColumn dataField="DOUT_SLIP_NO" headerText="매입번호" visible="false"/>\
		</columns>\
		<footers>\
			<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col11}" formatter="{numfmt}" textAlign="right"/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" dataColumn="{dg1col13}" formatter="{numfmt}" textAlign="right"/>\
			</DataGridFooter>\
		</footers>\
	</DataGrid>\
</rMateGrid>';


/*********************체크박스 disable******************************************
secondLabelJsFunction 기능을 이용하여 셀럭터 컬럼에 표시되는 체크박스의 enabled를 조작합니다.
secondLabelJsFunction 함수의 파라메터는 다음과 같습니다.
function secondLabelJsFunction(item:Object, value:Object, column:Column)
item : 해당 행의 data 객체
value : 해당 셀의 라벨(셀렉터이므로 값은 undefined임)
column : 해당 셀의 열을 정의한 Column 객체
true를 반환하면 해당 행은 선택가능하고, false를 반환하면 해당 행은 선택할 수 없게 됩니다.
***************************************************************************/
function secondLabelFunc(item, value, column) {
 if (item.PUR_CFM_DT != "" )
	 return false;
 else
	 return true;
};

//그리드 헤더 정렬 기능 이벤트
function headerRelease1(event) {
	
	//헤드 정렬 설정
	rMateSortHeadRelease(dataGrid1, event, "P_COLUMN_NAME", "P_ORDERBY");
	
	btn_search(false);
}

//그리드 페이지 이동
function gridMovePage(page) {
	
	//alert(page);
	$("#pageIndex").val(page);
	pageIndex = page;
	
	btn_search(false);
	
}
// ----------------------- 그리드 설정 끝 -------------------------------------


function init() {

	
	
}


//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
 
//조회 (searchFlag -> true : 헤더정렬 기본값으로    false : 헤더정렬 값 유지)
function btn_search(searchFlag){
	
	//조회시 그리드1 선택 데이터 초기화
	dataRow1 = null;
	
	if(searchFlag  ==  true){
		// 헤더 기본값 셋팅
		rMateSortHeadSetDefault(dataGrid1, "P_COLUMN_NAME", "P_ORDERBY");
		//페이지 1페이지로 이동
		pageIndex = 1;
		$("#pageIndex").val(pageIndex);
	}
	
	var loadData =  $("#top_search").serializeAllObject();
	
	loadData.P_PUR_SDAY = loadData.P_PUR_SDAY.replace(/-/gi, '');
	loadData.P_PUR_EDAY = loadData.P_PUR_EDAY.replace(/-/gi, '');

	if(loadData.P_PUR_SDAY  >  loadData.P_PUR_EDAY){
		//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
		alert(msgDateValidation);
		$("#P_PUR_SDAY").focus();
		return;
	}
	
	gridApp1.setData(gridData1);
	//그리드2 초기화 
	gridRoot2.removeAll( );
	//로딩바 보기기
	showLoadingBar1();
	//그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/getWmsInList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		success:function(data){  
			//alert(data.list);
			gridApp1.setData(data.list);
			totalCnt = data.totalCount;
			
			drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
	    },
	    complete : function(data) {
	    	hideLoadingBar1();
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar1();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}

//저장가능 상태 체크 :: N->저장불가능  Y->저장가능
var saveFlag="Y";
var myVar = "";
function btn_saveCheck() {
    myVar = setTimeout(btn_update, 500);
}

//저장
function btn_update(){
	
	if(saveFlag == "N"){
		saveFlag = "Y";
		return;
	}

	
	 if(dataRow1 == null){
		 //저장할 입고 목록을 선택하세요.
		 alert(mentWmsIn4);
		 return;
	 }else if(dataRow1.PUR_CFM_DT != "" ){
		 //확정된 입고정보는 수정 할 수 없습니다.
		 alert(mentWmsIn5);
		 return;
	 }else{
		 
		 var gridXmlData2 = "";
		// 지불조건 XML로 뽑기  - xml
		var rowCnt  = gridRoot2.getCollection().getSource() ;  
		for(var i=0 ; i < rowCnt.length ; i++)
		{    
			gridXmlData2 = gridXmlData2 + getXmlString(gridRoot2.getItemAt(i));     
		}
		
		gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
		//alert(gridXmlData2);
		
		//저장하시겠습니까?
		if(confirm(msgSaveConfirm) == false) return;
		
		//입고수량 저장
		jQuery.ajax({ 
		    url:"/saveWmsInCnt.do",         
		    type:"POST",
			datatype:"xml",
			async:false,
			data: {"gridXmlData2" : gridXmlData2}, 
			success:function(data){  
				//결과리턴
				var obj = jQuery.parseJSON(data.CUR);
				if(  obj[0].RETURN_CODE  == "0000")
				{   
					//저장되었습니다.
					alert(msgSave);
					//조회
					btn_search(true);
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

//확정
function btn_submit(){
	 var arryDate = selectorColumn1.getSelectedIndices();
	 var processFlag = "N";
	 var checkFlag = "N";
	 
	 if(arryDate.length == 0){
		 //확정할 입고현황을 체크박스로 선택하세요.
		 alert(mentWmsIn6);
		 return;
	 }
	 
	 $("#P_SLIP_LIST").val("");
		//체크하신 목록을 입고확정 하시겠습니까?
		if(confirm(mentWmsIn7) == false) return;
			var paramData = "";
			for(var i =0; i < arryDate.length; i++){
				
				//체크박스 선택된 그리드 ROW데이터
				
				paramData += ",";
				paramData += gridRoot1.getItemFieldAt( arryDate[i],"PUR_DT") + "|" + gridRoot1.getItemFieldAt( arryDate[i],"STR_CODE") + "|" + gridRoot1.getItemFieldAt( arryDate[i],"SLIP_NO");
				
			}	
			
			$("#P_SLIP_LIST").val(paramData);
			var loadData =  $("#top_search").serializeAllObject();
			
			//입고확정 처리
			jQuery.ajax({ 
			    url:"/sumitWmsIn.do",         
			    type:"POST",
				datatype:"json",
				async:false,
				data: loadData, 
				success:function(data){  
					//결과리턴
					var obj = jQuery.parseJSON(data.CUR);
					if(  obj[0].RETURN_CODE  == "0000")
					{   
						checkFlag = "Y";
						if(i == arryDate.length){
							processFlag = "Y";
						}
						
					}else{
						checkFlag = "N";
					}
			    },
			    complete : function(data) {
			    	 
			    },
			    error : function(xhr, status, error) {
			    	CommonJs.alertErrorStatus(xhr.status, error);
			    }
			});
				 
			
			//확정 프로세스 후 최종 메세지
			if(processFlag =="Y" && checkFlag =="Y"){
				//확정처리 되었습니다.
				alert(mentWmsIn8);
				//조회
				btn_search(true);
			}else{
				checkFlag = "N";
				//요청중 문제가 발생했습니다.관리자에게 문의하세요.
				alert(msgErrorDefault);
				return;
			}
}

//(협력업체검색) 팝업 호출 function
function btn_comm_supply_search(){
	$('#comm_pop_wrap3' ).dialog( 'open' );
	gridApp12.resize();
	
	if($("#P_VEN_NAME").val() != null && $("#P_VEN_NAME").val() != ""){
		$("#P_TEXT3").val($("#P_VEN_NAME").val());
		btn_comm_search('3');
	}
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	$("#SET_VEN_CODE").val( $("#P_VEN_CODE").val() ); 
	if($("#P_ITEM_NAME").val() != null && $("#P_ITEM_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITEM_NAME").val());
		btn_comm_search('2');
	}
}

//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
	//$('#BUSI_NO' ).val(BUSI_NO);		// 사업자번호
}


//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#P_ITEM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
	//$('#P_ITEM_CODE' ).val(ITM_CODE);				// 상품코드
	//$('#SCAN_CODE' ).val(SCAN_CODE);			// 스캔코드
	//$('#ITM_SHORT_NAME' ).val(ITM_SHORT_NAME);	// 단축상품명
}


/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1, #gridHolder2").width("100%");
	
	var hei = ($(window).height() - 157) / 5;
	
	$("#gridHolder1").height(hei*2);
	$("#gridHolder2").height(hei*3);

	$(window).on('resize',function (){	
		
		var hei = ($(window).height() - 157) / 5;
		
		$("#gridHolder1").height(hei*2);
		$("#gridHolder2").height(hei*3);	
		
	});
});

//XML스트링 변환
function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

//그리드 로딩바  보이기
function showLoadingBar1() {
    gridRoot1.addLoadingBar();
}
function showLoadingBar2() {
    gridRoot2.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar1() {
    gridRoot1.removeLoadingBar();
}
function hideLoadingBar2() {
    gridRoot2.removeLoadingBar();
}

function clearVenCode(){
	if($('#P_VEN_NAME').val() == "" )
	{
		$('#P_VEN_CODE').val("");
	}
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
