/********************************************************
*   설명:  WMS-실사재고 등록
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-02-26    문희훈       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/


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
rMateGridH5.create("grid1", "gridHolder1", jsVars1+"&dataType=xml");
rMateGridH5.create("grid2", "gridHolder2", jsVars2+"&dataType=xml");

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1,	rowIndex1;
var gridApp2, gridRoot2, dataGrid2, dataRow2,clickData2,selectorColumn2, collection2,	rowIndex2;

var gridData1 =[];
var gridData2 =[];

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridApp1.setDataType("xml");
	
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
}


//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	//drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
}


//그리드2 레디 핸들러
function gridReadyHandler2(id) {
	// rMateGrid 관련 객체
	gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp2.setLayout(layoutStr2);
	
	//최초 로딩시 그리드2 데이터 조회 X
	gridApp2.setData(gridData2);

	//값 변경 이벤트
	gridRoot2.addEventListener("itemDataChanged", itemDataChangeHandler2);
	gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
	gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	
}

//그리드2 layoutCompleteHandler2
function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
}


//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 그리드 객체
	dataGrid2 = gridRoot2.getDataGrid(); 
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
	//그리드2 셀선택 이벤트
	dataGrid2.addEventListener("itemClick", itemClickHandler2);
	
}

//그리드2 클릭 이벤트 핸들러
function itemClickHandler2(event){
	
	var rowIndex = event.rowIndex;
	rowIndex2 = rowIndex;
	var columnIndex = event.columnIndex;
	dataRow2 = gridRoot2.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid2.getDisplayableColumns()[columnIndex];
	//선택한 필드명
	var dataField = column.getDataField();
	
}

//저장가능 상태 체크 :: N->저장불가능  Y->저장가능
var saveFlag="Y";
//재고 금액
var stockMoney = 0;
//전일재고
var invQty = 0;
//확정수량
var surveyqty2 = 0;
//그리드2 컬럼데이터 변경 핸들러
function itemDataChangeHandler2(event){
	var rowIndex = event.rowIndex;                  // 변경된 행번호
	//데이터가 변경된 행 셋팅
	rowIndex2	=	rowIndex;
	var columnIndex = event.columnIndex;        // 변경된 열번호
	var dataField = event.dataField;                // 변경된 열의 데이터 필드
	var dataRow = gridRoot2.getItemAt(rowIndex); // 변경된 데이터 레코드
	var oldValue = event.value;                     // 변경전 값
	var newValue = event.newValue;                  // 변경후 값

	//확정 수량
	surveyqty2 = gridRoot2.getItemFieldAt( rowIndex , "SURVEYQTY2");
	//재고 단가
	stockMoney = gridRoot2.getItemFieldAt( rowIndex , "SPRC");
	//전일재고 
	invQty = gridRoot2.getItemFieldAt( rowIndex , "INV_QTY");
	
	//alert("로우인덱스:"+ rowIndex);
	//alert("컬럼인덱스:"+ columnIndex);
	
	//업데이트, 델리트 상태값 셋팅
	if (rowIndex2 >= 0){
		if(oldValue == newValue){
			gridRoot2.setItemFieldAt( "N" , rowIndex2, "INPUT_YN");
		}else{
			gridRoot2.setItemFieldAt( "U" , rowIndex2, "INPUT_YN");
		}
	}	
  
	if (dataField == "SURVEYQTY2") {
		if (newValue == null || newValue == ""){
			//값을 입력하세요.
			alert(mentWmsIn1);
			gridRoot2.setItemFieldAt(0, rowIndex , "SURVEYQTY2");
			gridRoot2.setItemFieldAt(0, rowIndex , "STOCK_PRICE");
			saveFlag="N";
			return;
		}else if(isNaN(Number(newValue))){
			//값은 숫자만 가능합니다.
			alert(mentWmsIn2);
			gridRoot2.setItemFieldAt(0, rowIndex , "SURVEYQTY2");
			gridRoot2.setItemFieldAt(0, rowIndex , "STOCK_PRICE");
			saveFlag="N";
			return;
		}else{
			 //최종 확정 재고금액 셋팅
			 gridRoot2.setItemFieldAt(newValue*stockMoney, rowIndex , "STOCK_PRICE");
			 //차이수량 조정
			 gridRoot2.setItemFieldAt( newValue-invQty, rowIndex , "DIFF_INV_QTY");
			 
			 //푸터 합산 금액조정
			 var footer = gridRoot2.getObjectById("footer");
			 footer.invalidateData();
			 saveFlag="Y";
		 }
	} 
}


//----------------------- 그리드 설정 끝 -----------------------


//<DataGridColumn dataField="RNUM" headerText="No"  textAlign="center" sortable="false" width="40" /> 넘버링을 하면 병합오류 발생
//그리드1 헤더 설정
var layoutStr1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg1" sortableColumns="true" selectionMode="multipleRows"   verticalAlign="middle"  showDataTips="true" >\
			<groupedColumns>\
				<DataGridColumn id="colNo" dataField="No" itemRenderer="IndexNoItem" textAlign="center" width="40"  sortable="false"/>\
				<DataGridColumn id="SEQ" dataField="SEQ" headerText="SEQ" visible="false"/>\
				<DataGridColumn id="STR_CODE" dataField="STR_CODE" headerText="'+storCode+'" textAlign="center" width="70"  sortable="false"/>\
				<DataGridColumn id="STR_NAME" dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" width="100"  />\
				<DataGridColumn id="ZONE_NAME" dataField="ZONE_NAME" headerText="ZONE" textAlign="center" width="60"  />\
				<DataGridColumn id="ZONE_CODE" dataField="ZONE_CODE" headerText="ZONE" textAlign="center" width="60"   visible="false"/>\
				<DataGridColumn id="RACK_NAME" dataField="RACK_NAME" headerText="RACK" textAlign="center" width="60"  />\
				<DataGridColumn id="RACK_CODE" dataField="RACK_CODE" headerText="RACK" textAlign="center" width="60"   visible="false"/>\
				<DataGridColumn id="LINE_NAME" dataField="LINE_NAME" headerText="LINE" textAlign="center" width="70"  />\
				<DataGridColumn id="LINE_CODE" dataField="LINE_CODE" headerText="LINE" textAlign="center" width="70"   visible="false"/>\
				<DataGridColumn id="SCAN_CODE" dataField="SCAN_CODE" headerText="'+scanningCode+'" textAlign="center" width="140"  sortable="false"/>\
				<DataGridColumn id="INV_QTY" dataField="INV_QTY" headerText="'+actualQuantity+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="80"/>\
				<DataGridColumn id="ITM_NAME" dataField="ITM_NAME"  headerText="'+itmName+'" textAlign="lefr" width="150"  sortable="false"/>\
				<DataGridColumn id="CLS_NAME" dataField="CLS_NAME"  headerText="'+goodsCl+'" textAlign="center" width="100" />\
				<DataGridColumn id="MKT_GB" dataField="MKT_GB"  headerText="'+storeType+'" textAlign="center" width="80" />\
				<DataGridColumn id="MKT_GB_CODE" dataField="MKT_GB_CODE"  headerText="매장구분코드" visible="false"/>\
				<DataGridColumn id="UNIT" dataField="UNIT"  headerText="'+unit+'" textAlign="center" width="80" sortable="false"/>\
				<DataGridColumn id="SPRC" dataField="SPRC"  headerText="'+wprc+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="100" visible="false"/>\
				<DataGridColumn id="STOCK_PRICE" dataField="STOCK_PRICE"  headerText="'+stockAmount+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="120" visible="false"/>\
				<DataGridColumn id="VEN_NAME" dataField="VEN_NAME"  headerText="'+supply+'" textAlign="left" width="150" />\
				<DataGridColumn id="INV_FLAG" dataField="INV_FLAG"  headerText="'+inventorySurveyMethod+'" textAlign="center" width="70" />\
				<DataGridColumn id="INV_FLAG_CODE" dataField="INV_FLAG_CODE"  headerText="방법코드" visible="false"/>\
				<DataGridColumn id="SURVEY_NO" dataField="SURVEY_NO"  headerText="'+investigator+'" textAlign="center" width="80"  sortable="false"/>\
				<DataGridColumn id="CFM_FLAG" dataField="CFM_FLAG"  headerText="'+btnSubmit+'" textAlign="center" width="60"  sortable="false"/>\
				<DataGridColumn id="CFM_FLAG_CODE" dataField="CFM_FLAG_CODE"  headerText="CFM_FLAG_CODE"  visible="false"/>\
				<DataGridColumn id="VALID_YN" dataField="VALID_YN"  headerText="체크플래그"  visible="false"/>\
			</groupedColumns>\
			<dataProvider>\
				<!-- 그리드의 자료를 일반 dataProvider가 아닌 별도의 컴포넌트에 입력해야 할 경우 아래와 같이 source에 $gridData를 넣어줍니다 -->\
				<SpanArrayCollection source="{$gridData}"/>\
			</dataProvider>\
	</DataGrid>\
</rMateGrid>';

var layoutStr2 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg2"  showDeletedRows="true"  editable="true" doubleClickEnabled="true"  sortableColumns="true" selectionMode="multipleRows" itemRenderer="EditableIconItem"    verticalAlign="middle" showDataTips="true" >\
			<columns>\
				<DataGridRowStateColumn id="rowState" textAlign="center" visible="true"/>\
				<DataGridColumn id="INPUT_YN"	dataField="INPUT_YN"  headerText="INPUT_YN" textAlign="center" visible="false" />\
				<DataGridColumn id="colNo" dataField="No" itemRenderer="IndexNoItem" textAlign="center" width="40"  sortable="false" editable="false"  />\
				<DataGridColumn id="SEQ" dataField="SEQ" headerText="SEQ" visible="false" editable="false" />\
				<DataGridColumn id="STR_CODE" dataField="STR_CODE" headerText="'+storCode+'" textAlign="center" width="70"  sortable="false" editable="false" />\
				<DataGridColumn id="STR_NAME" dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" width="100" editable="false"  />\
				<DataGridColumn id="ZONE_NAME" dataField="ZONE_NAME" headerText="ZONE" textAlign="center" width="60"  editable="false"  />\
				<DataGridColumn id="ZONE_CODE" dataField="ZONE_CODE" headerText="ZONE" textAlign="center" width="60"   editable="false"  visible="false"/>\
				<DataGridColumn id="RACK_NAME" dataField="RACK_NAME" headerText="RACK" textAlign="center" width="60"   editable="false" />\
				<DataGridColumn id="RACK_CODE" dataField="RACK_CODE" headerText="RACK" textAlign="center" width="60"  editable="false"   visible="false"/>\
				<DataGridColumn id="LINE_NAME" dataField="LINE_NAME" headerText="LINE" textAlign="center" width="70"   editable="false" />\
				<DataGridColumn id="LINE_CODE" dataField="LINE_CODE" headerText="LINE" textAlign="center" width="70"   editable="false"  visible="false"/>\
				<DataGridColumn id="SCAN_CODE" dataField="SCAN_CODE" headerText="'+scanningCode+'" textAlign="center" width="140"  sortable="false" editable="false" />\
				<DataGridColumn id="ITM_NAME" dataField="ITM_NAME"  headerText="'+itmName+'" textAlign="lefr" width="150"  sortable="false" editable="false" />\
				<DataGridColumn id="CLS_NAME" dataField="CLS_NAME"  headerText="'+goodsCl+'" textAlign="center" width="100" editable="false" />\
				<DataGridColumn id="MKT_GB" dataField="MKT_GB"  headerText="'+storeType+'" textAlign="center" width="80" editable="false" />\
				<DataGridColumn id="MKT_GB_CODE" dataField="MKT_GB_CODE"  headerText="매장구분코드" visible="false" editable="false" />\
				<DataGridColumn id="UNIT" dataField="UNIT"  headerText="'+unit+'" textAlign="center" width="80" sortable="false" editable="false" />\
				<DataGridColumn id="INV_QTY" dataField="INV_QTY" headerText="'+theDayBeforeStock+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="80" editable="false" />\
				<DataGridColumn id="SURVEYQTY1" dataField="SURVEYQTY1" headerText="'+actualQuantity+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="80" editable="false" />\
				<DataGridColumn id="SURVEYQTY2" dataField="SURVEYQTY2" headerText="'+fixedQuantity+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="80" showEditableIcon="always" />\
				<DataGridColumn id="DIFF_INV_QTY" dataField="DIFF_INV_QTY" headerText="'+differenceQuantity+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="80" editable="false" />\
				<DataGridColumn id="SPRC" dataField="SPRC"  headerText="'+wprc+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="100" editable="false" />\
				<DataGridColumn id="STOCK_PRICE" dataField="STOCK_PRICE"  headerText="'+stockAmount+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="140" editable="false" />\
				<DataGridColumn id="VEN_NAME" dataField="VEN_NAME"  headerText="'+supply+'" textAlign="left" width="150" editable="false" />\
				<DataGridColumn id="INV_FLAG" dataField="INV_FLAG"  headerText="'+inventorySurveyMethod+'" textAlign="center" width="70" editable="false" />\
				<DataGridColumn id="INV_FLAG_CODE" dataField="INV_FLAG_CODE"  headerText="방법코드" visible="false" editable="false" />\
				<DataGridColumn id="SURVEY_NO" dataField="SURVEY_NO"  headerText="'+investigator+'" textAlign="center" width="80"  sortable="false" editable="false" />\
				<DataGridColumn id="CFM_FLAG" dataField="CFM_FLAG"  headerText="'+btnSubmit+'" textAlign="center" width="60"  sortable="false" editable="false" />\
				<DataGridColumn id="CFM_FLAG_CODE" dataField="CFM_FLAG_CODE"  headerText="CFM_FLAG_CODE"  visible="false" editable="false" />\
			</columns>\
			<footers>\
				<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" colSpan="5"/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn summaryOperation="SUM" id="footer" dataColumn="{STOCK_PRICE}" formatter="{numfmt}" textAlign="right"/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
					<DataGridFooterColumn/>\
				</DataGridFooter>\
			</footers>\
		</DataGrid>\
	</rMateGrid>';

// ----------------------- 그리드 설정 끝 -------------------------------------


//########################################################
//###	8. init ( 시작 )   							   												###
//########################################################

$(document).ready(function(){
	
	init();
	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));

	//실사재고등록 팝업
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 950,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	var loadData= {};
	// 재고조사 물류센터 리스트 조회
	$("#iframeCnt select[name=P_STR_NAME]").append('<option value="">'+ select +'</option>');
	$("#pop_wrap1 select[name=P_POP_STR_NAME]").append('<option value="">'+ select +'</option>');
	jQuery.ajax({
	    type:"POST",
	    url:"/getWmsStockOrganizationList.do", 	//WmsStockScheduleController.java 호출
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:loadData,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#P_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
				 $("#P_POP_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//매장구분
	$("#iframeCnt select[name=P_MKT_GB]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=P_MKT_GB]", "MKT_GB");
	$("#P_MKT_GB").val(1);
	
	///등록팝업 매장구분
	getCommonCodeSelectBoxList("pop_wrap1 select[name=P_POP_MKT_GB]", "MKT_GB");
	$("#P_POP_MKT_GB").val(1);
	
	//검색조건 Location 셀렉트 박스 셋팅
	$("#iframeCnt select[name=P_ZONE_CODE]").append('<option value="">'+ all +'</option>');
	$("#iframeCnt select[name=P_RACK_CODE]").append('<option value="">'+ all +'</option>');
	$("#iframeCnt select[name=P_LINE_CODE]").append('<option value="">'+ all +'</option>');
	
	//행추가 팝업 Location 셀렉트 박스 셋팅
	$("#iframeCnt select[name=P_POP_ZONE_CODE]").append('<option value="">'+ select +'</option>');
	$("#iframeCnt select[name=P_POP_RACK_CODE]").append('<option value="">'+ select +'</option>');
	$("#iframeCnt select[name=P_POP_LINE_CODE]").append('<option value="">'+ select +'</option>');
	
	
	/** 
	 * input 숫자와 콤마만 입력되게 하기. 
	 * 매우중요 : jquery.number.js 파일 인크루드하기
	 * include js : jquery.number.js
	 * input 속성에 numberOnly 추가
	 * jsp : <input type="text" id="amount" name="amount" numberOnly placeholder="0" />
	 * $(this).number(true);
	 * $.number( 5020.2364 );				// Outputs 5,020
	 * $.number( 5020.2364, 2 );			// Outputs: 5,020.24
	 * $.number( 135.8729, 3, ',' );		// Outputs: 135,873
	 * $.number( 5020.2364, 1, ',', ' ' );	// Outputs: 5 020,2 
	 */
	$('#P_POP_INV_QTY').number( true);
	
	
	/**
	 * 실사재고등록 스캔 또는 입력시
	 * 13자리일경우 스캔번호에 대한 상품정보 조회
	  */
	$("#P_POP_SCAN_CODE").on('keyup', function(){

		if($("#P_POP_STR_CODE").val()==""){
			$("#P_POP_SCAN_CODE").val("");
			//점포는 필수입력 입니다.
			alert(stockRealMent4);
			$('#P_POP_STR_NAME').focus();
			$("#P_POP_SCAN_CODE").val("");
			return;
		}
		
		if($("#P_POP_ZONE_CODE").val()==""){
			$("#P_POP_ZONE_CODE").val("");
			//ZONE은 필수선택입니다.
			alert(wmsStockRealMent2);
			$('#P_POP_ZONE_CODE').focus();
			$("#P_POP_SCAN_CODE").val("");
			return;
		}
		
		if($("#P_POP_RACK_CODE").val()==""){
			$("#P_POP_RACK_CODE").val("");
			//RACK은 필수선택입니다.
			alert(wmsStockRealMent3);
			$('#P_POP_RACK_CODE').focus();
			$("#P_POP_SCAN_CODE").val("");
			return;
		}
		
		if($("#P_POP_LINE_CODE").val()==""){
			$("#P_POP_LINE_CODE").val("");
			//LINE은 필수선택입니다.
			alert(wmsStockRealMent4);
			$('#P_POP_LINE_CODE').focus();
			
			return;
		}
		
		//팝업 데이터 초기화
		clearePop();
		var postValue ={};	
		postValue = { 
				 "P_STR_CODE"			: $("#P_POP_STR_CODE").val(),
				 "P_POP_SCAN_CODE"	: $("#P_POP_SCAN_CODE").val()
		};
		
		if($("#P_POP_SCAN_CODE").val().length == 13){
	    	jQuery.ajax({
			    type:"POST",
			    url:"/getWmsProductDtlInfo.do",
			    dataType:"JSON",  
			    data:postValue,
			    async:false,
			    success : function(data) {
			    	if(data.length == 1){
			    		$("#P_POP_ITM_NAME").val(data[0].ITM_NAME);
				    	$("#P_POP_CLS_NAME").val(data[0].CLS_NAME);
				    	$("#P_POP_UNIT").val(data[0].UNIT);
				    	$("#P_POP_SPRC").val(data[0].SPRC);
				    	$("#P_POP_VEN_NAME").val(data[0].VEN_NAME);
				    	$("#P_POP_VEN_CODE").val(data[0].VEN_CODE);
				    	$("#P_POP_ITM_CODE").val(data[0].ITM_CODE);
				    	
				    	//정보를 불러왔을경우 수량입력을 위한 포커스 처리
				    	$('#P_POP_INV_QTY').focus();
			    		return;
			    	}else{
				    	//alert("상품이 존재하지 않습니다.");
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
		
	   
	});
	
	//엑셀파일 업로드시 실행
	$("#excelFile").on('change', function(){
		
		//엑셀파일이 업로드 되었을때 실행
	    if($("#excelFile").val() != ""){
	    	//엑셀 폼 서브밋
	    	checkFile();
	    }
	    
	});
	

});

/***************************************************
 * 메인화면 검색 조건 이벤트 시작
 ***************************************************/
//점포명 변경 EVENT
function fnStrChange(){
	
	//그리드1,2 데이터 초기화 (엑셀등록 또는 행추가 등록은 점포명, 재고조사일정id가 key이기 때문임)
	 gridRoot1.removeAll( );
	 gridRoot2.removeAll( );
	
	 $("#P_STR_CODE").val($("#P_STR_NAME").val());
	 //조사일자 초기화
	 $("#P_INV_INSP_DT").val("");
	 
	 if($("#P_STR_NAME").val() == ""){
		  $("#P_INV_INSP_SCHD_ID").find("option").remove();
		  $("#iframeCnt select[name=P_INV_INSP_SCHD_ID]").append('<option value="">'+ all +'</option>');
	 }else{
		 
		var loadData ={};	
		loadData = { 
				  "STR_CODE"	: $("#P_STR_CODE").val() 
		};
			
		//재고조사일정 ID조회
		jQuery.ajax({
		    type:"POST",
		    url:"/getWmsInvInspSchdIdList.do",
		    dataType:"JSON",  
		    data:loadData,
		    async:false,
		    success : function(data) {
		    	
		    	$("#P_INV_INSP_SCHD_ID").find("option").remove();
				$("#iframeCnt select[name=P_INV_INSP_SCHD_ID]").append('<option value="">'+ all +'</option>');
		    	
				for(var i = 0; i < data.length; i++){
					 $("#P_INV_INSP_SCHD_ID").append('<option value="'+ data[i].INV_INSP_SCHD_ID +'">'+ data[i].INV_INSP_SCHD_ID +'</option>'); 
			   	}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	 }
	 
	 //ZONE 정보 조회
	 //1.모든 로케이션 셀렉트박스 초기화처리
	 $("#P_ZONE_CODE").find("option").remove();
	 $("#iframeCnt select[name=P_ZONE_CODE]").append('<option value="">'+ all +'</option>');
	 $("#P_RACK_CODE").find("option").remove();
     $("#iframeCnt select[name=P_RACK_CODE]").append('<option value="">'+ all +'</option>');	 
     $("#P_LINE_CODE").find("option").remove();
	 $("#iframeCnt select[name=P_LINE_CODE]").append('<option value="">'+ all +'</option>');
	  
	 //2.점포(물류창고)를 선택 했다면 선택한 점포의 ZONE코드 리스트 조회
	 if($("#P_STR_NAME").val() != ""){

		 loadData.STR_CODE = $("#P_STR_NAME").val();
			 
		 jQuery.ajax({
		    type:"POST",
		    url:"/selectWmsInZone.do", 
		    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		    data:loadData,
		    async:false,
		    success : function(data) {
		    	if(data.length > 0){
					for(var i=0 ; i < data.length ; i++){
						$("#P_ZONE_CODE").append('<option value="'+ data[i].ZONE_CODE +'">'+ data[i].ZONE_NAME +'</option>'); 
					}
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

//ZONE 셀렉트 박스 체인지 이벤트
function fnZoneSelect(){
	
	//RACK 정보 조회
	//1.RACK, LINE 셀렉트박스 초기화처리
	$("#P_RACK_CODE").find("option").remove();
	$("#iframeCnt select[name=P_RACK_CODE]").append('<option value="">'+ all +'</option>');	 
	$("#P_LINE_CODE").find("option").remove();
	$("#iframeCnt select[name=P_LINE_CODE]").append('<option value="">'+ all +'</option>');
	
	//2.ZONE를 선택 했다면 선택한 RACK코드 리스트 조회
	if($("#P_ZONE_CODE").val() != ""){
		jQuery.ajax({ 
	    url:"/selectWmsInRack.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#top_search select[name=P_STR_NAME]").val()
				,	'ZONE_CODE' : $("#top_search select[name=P_ZONE_CODE]").val()
				},
		success:function(data){  
			if(data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					$("#P_RACK_CODE").append('<option value="'+ data[i].RACK_CODE +'">'+ data[i].RACK_NAME +'</option>'); 
					}
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	}
	
	$('#P_RACK_CODE').focus();
	
}

//RACK 셀렉트 박스 체인지 이벤트
function fnRackSelect(){
	//LINE 정보 조회
	//1. LINE 셀렉트박스 초기화처리
	$("#P_LINE_CODE").find("option").remove();
	$("#iframeCnt select[name=P_LINE_CODE]").append('<option value="">'+ all +'</option>');
	
	//2.RACK를 선택 했다면 선택한 점포의 LINE코드 리스트 조회
	if($("#P_RACK_CODE").val() != ""){
		jQuery.ajax({ 
		    url:"/selectWmsInLine.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {	
						'STR_CODE' : $("#top_search select[name=P_STR_NAME]").val()
					   ,'RACK_CODE' : $("#top_search select[name=P_RACK_CODE]").val()
			},
			success:function(data){  
				if(data.length > 0){
					for(var i=0 ; i < data.length ; i++){
						$("#P_LINE_CODE").append('<option value="'+ data[i].LINE_CODE +'">'+ data[i].LINE_NAME +'</option>'); 
					}
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	}
	$('#P_LINE_CODE').focus();
}

//LINE 셀렉트 박스 체인지 이벤트
function fnLineSelect(){
	$('#P_SCAN_CODE').focus();
}

//재고조사일정 ID 변경 EVENT
function fnInspSchdIdChange(){
	//그리드1,2 데이터 초기화 (엑셀등록 또는 행추가 등록은 점포명, 재고조사일정id가 key이기 때문임)
	 gridRoot1.removeAll( );
	 gridRoot2.removeAll( );
	
	//조사일정 아이디 NULL일시 조사일자 초기화 
	 if($("#P_INV_INSP_SCHD_ID").val() == ""){
		  $("#P_INV_INSP_DT").val("");
	 }else{
		 
		var postValue ={};	
		postValue = { 
				  "P_INV_INSP_SCHD_ID"	: $("#P_INV_INSP_SCHD_ID").val() 
				 ,"P_STR_CODE"				: $("#P_STR_CODE").val()
		};
			
		jQuery.ajax({
		    type:"POST",
		    url:"/getWmsInvInspDt.do",
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	$("#P_INV_INSP_DT").val(data.INV_INSP_DT);
		    	$("#CFM_FLAG").val(data.CFM_FLAG);
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	 }
	
}
/***************************************************
 * 메인화면 검색 조건 이벤트 끝
 ***************************************************/


/***************************************************
 * 행추가 팝업 검색 조건 이벤트 시작
 ***************************************************/
//팝업 점포선택 이벤트
function fnPopStrChange(){
	
	if($("#P_STR_CODE").val() == "00000"){
		$("#P_POP_STR_NAME").removeAttr('disabled');
	}else{
		$("#P_POP_STR_NAME").val($("#P_STR_CODE").val());
		$("#P_POP_STR_CODE").val($("#P_POP_STR_NAME").val());
		$("#P_POP_STR_NAME").attr("disabled", 'disabled');
	}
	fnSelectChangeText();
	
	 //행추가 POP_ZONE 정보 조회
	 //1.모든 행추가 팝업의 로케이션 셀렉트박스 초기화처리
	 $("#P_POP_ZONE_CODE").find("option").remove();
	 $("#pop_wrap1 select[name=P_POP_ZONE_CODE]").append('<option value="">'+ select +'</option>');
	 $("#P_POP_RACK_CODE").find("option").remove();
	 $("#pop_wrap1 select[name=P_POP_RACK_CODE]").append('<option value="">'+ select +'</option>');	 
     $("#P_POP_LINE_CODE").find("option").remove();
	 $("#pop_wrap1 select[name=P_POP_LINE_CODE]").append('<option value="">'+ select +'</option>');
	  
	 //2.점포(물류창고)를 선택 했다면 선택한 점포의 ZONE코드 리스트 조회
	 if($("#P_POP_STR_NAME").val() != ""){
		 
		 var loadData ={};	
		 loadData.STR_CODE = $("#P_POP_STR_NAME").val();
			 
		 jQuery.ajax({
		    type:"POST",
		    url:"/selectWmsInZone.do", 
		    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		    data:loadData,
		    async:false,
		    success : function(data) {
		    	if(data.length > 0){
					for(var i=0 ; i < data.length ; i++){
						$("#P_POP_ZONE_CODE").append('<option value="'+ data[i].ZONE_CODE +'">'+ data[i].ZONE_NAME +'</option>'); 
					}
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
//팝업 점포코드 데이터 셋팅
function fnSelectChangeText(){
	
	$("#P_POP_STR_CODE").val($("#P_POP_STR_NAME").val());
}

//팝업 : ZONE 셀렉트 박스 체인지 이벤트
function fnPopZoneSelect(){
	
	//RACK 정보 조회
	//1.RACK, LINE 셀렉트박스 초기화처리
	$("#P_POP_RACK_CODE").find("option").remove();
	$("#pop_wrap1 select[name=P_POP_RACK_CODE]").append('<option value="">'+ select +'</option>');	 
	$("#P_POP_LINE_CODE").find("option").remove();
	$("#pop_wrap1 select[name=P_POP_LINE_CODE]").append('<option value="">'+ select +'</option>');
	
	//2.ZONE를 선택 했다면 선택한 RACK코드 리스트 조회
	if($("#P_POP_ZONE_CODE").val() != ""){
		jQuery.ajax({ 
	    url:"/selectWmsInRack.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {
					'STR_CODE' : $("#pop_wrap1 select[name=P_POP_STR_NAME]").val()
				,	'ZONE_CODE' : $("#pop_wrap1 select[name=P_POP_ZONE_CODE]").val()
				},
		success:function(data){  
			if(data.length > 0){
				for(var i=0 ; i < data.length ; i++){
					$("#P_POP_RACK_CODE").append('<option value="'+ data[i].RACK_CODE +'">'+ data[i].RACK_NAME +'</option>'); 
					}
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	}
	
	$('#P_POP_RACK_CODE').focus();
	
}

//팝업 : RACK 셀렉트 박스 체인지 이벤트
function fnPopRackSelect(){
	//LINE 정보 조회
	//1. LINE 셀렉트박스 초기화처리
	$("#P_POP_LINE_CODE").find("option").remove();
	$("#pop_wrap1 select[name=P_POP_LINE_CODE]").append('<option value="">'+ select +'</option>');
	
	//2.RACK를 선택 했다면 선택한 점포의 LINE코드 리스트 조회
	if($("#P_POP_RACK_CODE").val() != ""){
		jQuery.ajax({ 
		    url:"/selectWmsInLine.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {	
						'STR_CODE' : $("#pop_wrap1 select[name=P_POP_STR_NAME]").val()
					   ,'RACK_CODE' : $("#pop_wrap1 select[name=P_POP_RACK_CODE]").val()
			},
			success:function(data){  
				if(data.length > 0){
					for(var i=0 ; i < data.length ; i++){
						$("#P_POP_LINE_CODE").append('<option value="'+ data[i].LINE_CODE +'">'+ data[i].LINE_NAME +'</option>'); 
					}
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	}
	
	$('#P_POP_LINE_CODE').focus();
}

//팝업 : LINE 셀렉트 박스 체인지 이벤트
function fnPopLineSelect(){
	$('#P_POP_SCAN_CODE').focus();
}

/***************************************************
 * 행추가 팝업 검색 조건 이벤트 끝
 ***************************************************/

function init() {

	
	
}

  

//########################################################
//###   상단 버튼 구현																				###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1, #gridHolder2").height( $(window).height()-150);
	$(".ui-dialog-titlebar").text("실사재고등록");
	$(".tab_btn").on("click focus",function (){
		var btnNum = $(this).parent().index();
		
		$(".tab_area1 > div").eq(btnNum).show().siblings().hide();
		
		//if ( btnNum==0 ) $(".tab_area2 select:last").hide().prev().last().hide();
		//else  $(".tab_area2 select:last").show().prev().last().show();
	});
	$(window).on('resize',function (){	
		$("#gridHolder1, #gridHolder2").height( $(window).height()-150);
	});
});

//탭1을 선택 했을때의 그리드1 조회
function tab1_search(){
	//var nStart = new Date().getTime();      //시작시간 체크(단위 ms)
	//var nEnd;
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	if($("#P_INV_INSP_SCHD_ID").val()==""){
		//재고조사일정ID를 선택하세요.
		alert(stockRealMent6);
		$('#P_INV_INSP_SCHD_ID').focus();
		return;
	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	//실사재고 조회
	jQuery.ajax({ 
	    url:"/getWmsStockRealData.do",         
	    type:"POST",
		datatype:"xml",
		//async:false,
		data: loadData, 
		beforeSend : function(){ 
			//로딩바 show
			showLoadingBar();
	    }, 
		success:function(data){  
			//그리드1 초기화
			gridRoot1.removeAll( );
			
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
				var SEQ							= xmlDoc.createElement('SEQ');
				var STR_CODE 				= xmlDoc.createElement('STR_CODE');
				var STR_NAME 				= xmlDoc.createElement('STR_NAME');
				var ZONE_NAME 				= xmlDoc.createElement('ZONE_NAME');
				var ZONE_CODE 				= xmlDoc.createElement('ZONE_CODE');
				var RACK_NAME 				= xmlDoc.createElement('RACK_NAME');
				var RACK_CODE 				= xmlDoc.createElement('RACK_CODE');
				var LINE_NAME 				= xmlDoc.createElement('LINE_NAME');
				var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
				var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE');
				var INV_QTY					= xmlDoc.createElement('INV_QTY');
				var ITM_NAME 				= xmlDoc.createElement('ITM_NAME');
				var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
				var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
				var MKT_GB_CODE			= xmlDoc.createElement('MKT_GB_CODE'); 
				var UNIT 						= xmlDoc.createElement('UNIT');
				var SPRC 						= xmlDoc.createElement('SPRC'); 
				var STOCK_PRICE 			= xmlDoc.createElement('STOCK_PRICE'); 
				var VEN_NAME 				= xmlDoc.createElement('VEN_NAME'); 
				var INV_FLAG 					= xmlDoc.createElement('INV_FLAG'); 
				var INV_FLAG_CODE 		= xmlDoc.createElement('INV_FLAG_CODE');
				var SURVEY_NO 				= xmlDoc.createElement('SURVEY_NO');  
				var CFM_FLAG 				= xmlDoc.createElement('CFM_FLAG');
				var CFM_FLAG_CODE 		= xmlDoc.createElement('CFM_FLAG_CODE');
				var VALID_YN 					= xmlDoc.createElement('VALID_YN');
				 
				SEQ.appendChild(				  		xmlDoc.createTextNode( 	data[i].SEQ					));
				STR_CODE.appendChild(  			xmlDoc.createTextNode( 	data[i].STR_CODE		));
				STR_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].STR_NAME		));
				ZONE_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].ZONE_NAME		));
				ZONE_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].ZONE_CODE		));
				RACK_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].RACK_NAME		));
				RACK_CODE.appendChild(  			xmlDoc.createTextNode( 	data[i].RACK_CODE		));
				LINE_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].LINE_NAME		));
				LINE_CODE.appendChild(  			xmlDoc.createTextNode( 	data[i].LINE_CODE		));
				SCAN_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].SCAN_CODE		));
				INV_QTY.appendChild(    			xmlDoc.createTextNode( 	data[i].INV_QTY  			));
				ITM_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].ITM_NAME  		));
				CLS_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].CLS_NAME  		));
				MKT_GB.appendChild(  				xmlDoc.createTextNode(	data[i].MKT_GB 			));
				MKT_GB_CODE.appendChild(  		xmlDoc.createTextNode(	data[i].MKT_GB_CODE	));
				UNIT.appendChild( 					xmlDoc.createTextNode(	data[i].UNIT 				));
				SPRC.appendChild( 					xmlDoc.createTextNode(	data[i].SPRC				));
				STOCK_PRICE.appendChild(		xmlDoc.createTextNode(	data[i].STOCK_PRICE	));
				VEN_NAME.appendChild( 			xmlDoc.createTextNode(	data[i].VEN_NAME   		)); 
				INV_FLAG.appendChild(				xmlDoc.createTextNode(	data[i].INV_FLAG	    	));
				INV_FLAG_CODE.appendChild(		xmlDoc.createTextNode(	data[i].INV_FLAG_CODE	));
				SURVEY_NO.appendChild(			xmlDoc.createTextNode(	data[i].SURVEY_NO		));
				CFM_FLAG.appendChild(				xmlDoc.createTextNode(	data[i].CFM_FLAG			));
				CFM_FLAG_CODE.appendChild(	xmlDoc.createTextNode(	data[i].CFM_FLAG_CODE ));
				VALID_YN.appendChild(				xmlDoc.createTextNode(	data[i].VALID_YN			));
				  
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_QTY);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STOCK_PRICE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_FLAG);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_FLAG_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEY_NO);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CFM_FLAG);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CFM_FLAG_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VALID_YN);   
				
				gridRoot1.addItemAt(  xmlDoc  , 0 , false);
			}
            //로딩바 숨기기
            hideLoadingBar();

		},
	    complete : function(data) {
	    	//nEnd =  new Date().getTime();      //종료시간 체크(단위 ms)
	    },
	    error : function(xhr, status, error) {
	    	hideLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	//var nDiff = nEnd - nStart;      //두 시간차 계산(단위 ms)
	//alert(nDiff + "ms");
	
	
}



//행추가 팝업 오픈
function btn_popup() {
	
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	if($("#P_INV_INSP_SCHD_ID").val()==""){
		//재고조사일정ID를 선택하세요.
		alert(stockRealMent6);
		$('#P_INV_INSP_SCHD_ID').focus();
		return;
	}
	
	//재고조사일정ID의 재고실사등록 확정 여부 체크
	if($("#CFM_FLAG").val()=="2"){
		//선택하신 재고실사조사가 완료되어 행추가를 할 수 없습니다.
		alert(stockRealMent7);
		return;
	}
	
	$('#pop_wrap1').dialog( 'open' );	
	
	//팝업오픈시 스캔코드 포커스 
	$('#P_POP_ZONE_CODE').focus();
	$('#P_POP_SCAN_CODE').val("");
	$("#P_POP_STR_NAME").val("");
	//팝업 점포 선택
	fnPopStrChange();
	
	//팝업 데이터 초기화
	clearePop();
}

//팝업 데이터 초기화
function clearePop(){
	$('#P_POP_INV_QTY').val("");
	
	$('#P_POP_ITM_NAME').val("");
	$('#P_POP_CLS_NAME').val("");
	$('#P_POP_UNIT').val("");
	$('#P_POP_SPRC').val("");
	$('#P_POP_VEN_NAME').val("");
	
}


//엑셀 샘플포맷 다운
function downSmapleExcel(){
	location.href="/resources/js/page/wms/stock/wmsStockReal/WMS_실사재고등록_SAMPLE.xlsx";
}


//엑셀 업로드
function excelUpload(){
	/*var option = {
			forceUseServer : true,				// 서버로 전송
			layoutChangeOption:1,				// 레이아웃 변경 방식 - 0 : 사용자에게 질의, 1 : 현재 레이아웃에 데이터만 import, 2 : 헤더나 데이터에 따라 레이아웃을 재설정하고 데이터를 import
			headerRowCount:1,					// 헤더라인 수. 기본 값 0
			headerRowCountVisible:false,		// 헤더라인 수 표시 여부
			selectSheet:false,					// import한 파일내에 여러 Sheet가 있을 경우 사용자가 Sheet를 선택할 수 있도록 할 지 여부. (false일 경우 첫번째 Sheet를 가져옵니다) 기본 값 false
			useGroupedColumn:true,           // 그룹컬럼 생성 여부. false일 경우 1줄의 컬럼만 생성됩니다.
		};		
		
		gridRoot1.excelImport(option, "/stockGridExcelUpload.do");	
		//gridRoot4.addEventListener("importComplete", importCompleteHandler4);
*/
	
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	if($("#P_INV_INSP_SCHD_ID").val()==""){
		//재고조사일정ID를 선택하세요.
		alert(stockRealMent6);
		$('#P_INV_INSP_SCHD_ID').focus();
		return;
	}
	
	if($("#CFM_FLAG").val()=="2"){
		//선택하신 재고실사조사가 완료되어 수정 할 수 없습니다.
		alert(stockRealMent8);
		return;
	}
	
	//오늘날짜
	var lsToDate = new CommDateManager().getDate("yyyymmdd");
	var doDate = $("#P_INV_INSP_DT").val().replace(/-/gi, '');	
	
	if(lsToDate > doDate ){
		//재고조사기간이 지나 수정 할 수 없습니다.
		alert(inventorySurveyMent11);
		return;
	}
	
	$("#excelFile").val("");
	$('#excelFile').trigger('click');
	
}

//파일형식 체크 (엑셀만)
function checkFile(){
	//엑셀 업로드 플래그 체크 초기화
	if($("#excelFile").val()==""){
		//엑셀파일을 선택하세요.
		alert(stockRealMent9);
		return;
	}
	
	if( $("#excelFile").val() != "" ){
		var ext = $('#excelFile').val().split('.').pop().toLowerCase();
	    if($.inArray(ext, ['xls','xlsx']) == -1) {
	    	//xls,xlsx 파일만 업로드 할수 있습니다.
	    	alert(stockRealMent10);
			$("#excelFile").val("");
			return;
	    }
	}
	
	$("#PARAM1").val($("#P_STR_CODE").val());
	$("#PARAM2").val($("#P_INV_INSP_SCHD_ID").val());
	$("#PARAM3").val($("#P_INV_INSP_DT").val());
	$("#PARAM4").val($("#P_MKT_GB").val());
	
	//업로드 하시겠습니까?
	if (confirm(stockRealMent11)) {
		
		//엑셀 업로드 체크 플러그 N 처리
		$("#VALID_YN").val("N");
		
		//그리드1 로딩바 호출
		showLoadingBar();
        var options = {
            success : function(data) {
            	$("#VALID_YN").val(data.VALID_YN);
            	//alert(data.VALID_YN);
                //그리드 로딩바 숨기기
                hideLoadingBar();
                
                //xml포맷 데이터 변경으로 인한 주석
                //gridApp1.setData(data.list);
                
                //업로드 완료후 그리드1,2 모두 초기화
                gridRoot1.removeAll( );
                gridRoot2.removeAll( );
                for(var i=0 ; i < data.CUR.length ; i++ )
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
    				var SEQ							= xmlDoc.createElement('SEQ');
    				var STR_CODE 				= xmlDoc.createElement('STR_CODE');
    				var STR_NAME 				= xmlDoc.createElement('STR_NAME');
    				var ZONE_NAME 				= xmlDoc.createElement('ZONE_NAME');
    				var ZONE_CODE 				= xmlDoc.createElement('ZONE_CODE');
    				var RACK_NAME 				= xmlDoc.createElement('RACK_NAME');
    				var RACK_CODE 				= xmlDoc.createElement('RACK_CODE');
    				var LINE_NAME 				= xmlDoc.createElement('LINE_NAME');
    				var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
    				var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE');
    				var INV_QTY					= xmlDoc.createElement('INV_QTY');
    				var ITM_NAME 				= xmlDoc.createElement('ITM_NAME');
    				var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
    				var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
    				var MKT_GB_CODE			= xmlDoc.createElement('MKT_GB_CODE'); 
    				var UNIT 						= xmlDoc.createElement('UNIT');
    				var SPRC 						= xmlDoc.createElement('SPRC'); 
    				var STOCK_PRICE 			= xmlDoc.createElement('STOCK_PRICE'); 
    				var VEN_NAME 				= xmlDoc.createElement('VEN_NAME'); 
    				var INV_FLAG 					= xmlDoc.createElement('INV_FLAG'); 
    				var INV_FLAG_CODE 		= xmlDoc.createElement('INV_FLAG_CODE');
    				var SURVEY_NO 				= xmlDoc.createElement('SURVEY_NO');  
    				var CFM_FLAG 				= xmlDoc.createElement('CFM_FLAG');
    				var CFM_FLAG_CODE 		= xmlDoc.createElement('CFM_FLAG_CODE');
    				var VALID_YN 					= xmlDoc.createElement('VALID_YN');
    				 
    				SEQ.appendChild(				  		xmlDoc.createTextNode( 	data.CUR[i].SEQ					));
    				STR_CODE.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].STR_CODE			));
    				STR_NAME.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].STR_NAME			));
    				ZONE_NAME.appendChild(  		xmlDoc.createTextNode( 	data.CUR[i].ZONE_NAME		));
    				ZONE_CODE.appendChild(  		xmlDoc.createTextNode( 	data.CUR[i].ZONE_CODE		));
    				RACK_NAME.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].RACK_NAME		));
    				RACK_CODE.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].RACK_CODE			));
    				LINE_NAME.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].LINE_NAME			));
    				LINE_CODE.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].LINE_CODE			));
    				SCAN_CODE.appendChild(  		xmlDoc.createTextNode( 	data.CUR[i].SCAN_CODE		));
    				INV_QTY.appendChild(    			xmlDoc.createTextNode( 	data.CUR[i].INV_QTY  			));
    				ITM_NAME.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].ITM_NAME  		));
    				CLS_NAME.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].CLS_NAME  		));
    				MKT_GB.appendChild(  				xmlDoc.createTextNode(	data.CUR[i].MKT_GB 				));
    				MKT_GB_CODE.appendChild(  		xmlDoc.createTextNode(	data.CUR[i].MKT_GB_CODE		));
    				UNIT.appendChild( 					xmlDoc.createTextNode(	data.CUR[i].UNIT 					));
    				SPRC.appendChild( 					xmlDoc.createTextNode(	data.CUR[i].SPRC					));
    				STOCK_PRICE.appendChild(		xmlDoc.createTextNode(	data.CUR[i].STOCK_PRICE		));
    				VEN_NAME.appendChild( 			xmlDoc.createTextNode(	data.CUR[i].VEN_NAME   		)); 
    				INV_FLAG.appendChild(				xmlDoc.createTextNode(	data.CUR[i].INV_FLAG	    	));
    				INV_FLAG_CODE.appendChild(		xmlDoc.createTextNode(	data.CUR[i].INV_FLAG_CODE	));
    				SURVEY_NO.appendChild(			xmlDoc.createTextNode(	data.CUR[i].SURVEY_NO		));
    				CFM_FLAG.appendChild(				xmlDoc.createTextNode(	data.CUR[i].CFM_FLAG			));
    				CFM_FLAG_CODE.appendChild(	xmlDoc.createTextNode(	data.CUR[i].CFM_FLAG_CODE ));
    				VALID_YN.appendChild(				xmlDoc.createTextNode(	data.CUR[i].VALID_YN			));
    				  
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_QTY);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STOCK_PRICE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_FLAG);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_FLAG_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEY_NO);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CFM_FLAG);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CFM_FLAG_CODE);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VALID_YN);   
    				
    				gridRoot1.addItemAt(  xmlDoc  , -1 , false);
    			}
    			
                if(collection1.getSource().length !=0){
            		//업로드한 엑셀 데이터 유효성 검증 벗어난것 체크
            		checkData();
            	}
                
                if(data.VALID_YN == "Y"){
                	//모든 데이터가 업로드 되었습니다. \n내용 확인 후 저장하여 서버에 등록하세요.
                	alert(stockRealMent12+"\n"+stockRealMent13);
                }else{
                	//업로드 데이터중 점포코드, ,LINE코드, 스캐닝코드, 조사수량, 매장구분의\n데이터 형식이 잘못 되었습니다.\n데이터를 올바르게 수정 한 뒤 엑셀업로드를 하세요.
                	alert(wmsStockRealMent5+"\n"+stockRealMent15+"\n"+stockRealMent16);
                }
                
            },
            error : function(xhr, status, error){
            	CommonJs.alertErrorStatus(xhr.status, error);
            	hideLoadingBar();
            },
            datatype:"xml",
            type : "POST"
        };
        $("#frmUpload").attr("action", "/wmsStockGridExcelUpload.do");
        $("#frmUpload").ajaxSubmit(options);

    }
	//$("#frmUpload").attr("action", "/stockGridExcelUpload.do");
	//$("#frmUpload").submit();
	
}

//엑셀업로드시 유효성체크에 걸린 row 체크하여 색갈칠하기
function checkData(){
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	var valueCheckCnt = 0;
	for (var i = 0; i < dataCnt; i++) {
		var VALID_YN = gridRoot1.getItemFieldAt( i , "VALID_YN");	
		if(VALID_YN =="N"){
			 collection1.addRowAttributeDetailAt(i , "", "#ff6666", "", false, '');
			 //alert(rowData.SCAN_CODE);
			 
			 valueCheckCnt++;
			 
			 //문제가 발생시 플래그 N
			 $("#VALID_YN").val("N");
		}
	};
	
	if(valueCheckCnt == 0){
		//모든 검증작업 후 데이터 이상이 없을경우 플래그 Y
		 $("#VALID_YN").val("Y");
	}
	
	
}


//그리드 로딩바  보이기
function showLoadingBar() {
    gridRoot1.addLoadingBar();
    gridRoot2.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar() {
    gridRoot1.removeLoadingBar();
    gridRoot2.removeLoadingBar();
}


//탭1 저장
function tab1_saveCheck(){
	
	if($("#CFM_FLAG").val()=="2"){
		//선택하신 재고실사조사가 완료되어 수정 할 수 없습니다.
		alert(stockRealMent8);
		return;
	}
	
	//오늘날짜
	var lsToDate = new CommDateManager().getDate("yyyymmdd");
	var doDate = $("#P_INV_INSP_DT").val().replace(/-/gi, '');	
	
	if(lsToDate > doDate ){
		//재고조사기간이 지나 수정 할 수 없습니다.
		alert(inventorySurveyMent11);
		return;
	}
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//저장할 데이터가 없습니다.
		alert(stockRealMent17);
		return;
	}
	
	//데이터 유효성 검사
	checkData();
	
	if($("#VALID_YN").val()=="N"){
		//데이터중 점포코드, LINE코드, 스캐닝코드, 조사수량, 매장구분의\n데이터 형식이 잘못 되었습니다.\n데이터를 올바르게 수정 한 뒤 다시 시도하여 주세요.
		alert(wmsStockRealMent6+"\n"+stockRealMent15+"\n"+stockRealMent16);
		return;
	}
	
	var gridXmlData1 = "";
	//실사재고등록 데이터  XML로 뽑기  - xml
	var rowCnt  = gridRoot1.getCollection().getSource() ;  
	for(var i=0 ; i < rowCnt.length ; i++)
	{    
		gridXmlData1 = gridXmlData1 + getXmlString(gridRoot1.getItemAt(i));     
	}
	
	gridXmlData1 =  "<GRIDLIST>"+gridXmlData1+"</GRIDLIST>" ;
	//alert(gridXmlData1);
	
	var loadData = $("#top_search").serializeAllObject();
	loadData.gridXmlData1 = gridXmlData1;
	
	//저장하시겠습니까?
	if(confirm(msgSaveConfirm) == false) return;
	
	//실사재고 저장
	jQuery.ajax({ 
	    url:"/saveWmsStockRealData.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: loadData, 
		success:function(data){  
			//결과리턴
			var obj = jQuery.parseJSON(data.CUR);
			if(  obj[0].RETURN_CODE  == "0000")
			{   
				//저장되었습니다.
				alert(msgSave);
				//조회
				tab1_search();
				//그리드2 초기화 : 신규건이 저장되었기 때문에 재조회 해야됨
				gridRoot2.removeAll();
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
 





var myVar1 = "";
function tab2_submitCheck() {
    myVar1 = setTimeout(tab2_submit, 400);
}
//탭2 그리드 확정
function tab2_submit(){
	
	if(saveFlag == "N"){
		saveFlag = "Y";
		return;
	}
	
	//재고조사일정ID의 재고실사등록 확정 여부 체크
	if($("#CFM_FLAG").val()=="2"){
		//선택하신 재고실사조사가 완료되어 수정 할 수 없습니다.
		alert(stockRealMent8);
		return;
	}
	
	var dataCnt = gridRoot2.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//확정할 데이터가 없습니다.
		alert(stockRealMent18);
		return;
	}
	
	// 지불조건 XML로 뽑기  - xml
	var rowCnt  = gridRoot2.getCollection().getSource() ;
	var updateRowCnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			updateRowCnt++;
		}
	}
	
	if(updateRowCnt != 0){
		//수정된 값이 존재합니다. 먼저 저장 하신 후 확정 할 수 있습니다.
		alert(stockRealMent19);
		return;
	}
	
	/*var gridXmlData2 = "";
	
	// 실사재고조회(확정) 데이터  XML로 뽑기  - xml
	var rowCnt  = gridRoot2.getCollection().getSource() ;
	
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
			gridXmlData2 = gridXmlData2 + getXmlString(   gridRoot2.getItemAt(i)   );
	}
	
	gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;*/
	
	var loadData = $("#top_search").serializeAllObject();
	//loadData.gridXmlData2 = gridXmlData2;
	
	//alert(gridXmlData2);
	
	//일곡점(2017-001) 재고조사를 확정처리 하시겠습니까?
	if(confirm($("#P_STR_NAME option:selected").text()+"("+ $("#P_INV_INSP_SCHD_ID").val() +") "+stockRealMent20) == false) return;
	
	
	jQuery.ajax({ 
	    url:"/submitWmsStockRealData.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: loadData, 
		success:function(data){   
			//결과리턴
			var obj = jQuery.parseJSON(data.CUR);
			if(  obj[0].RETURN_CODE  == "0000")
			{   
				//확정처리되었습니다.
				alert(mentWmsIn8);
				//조회
				tab2_search();
				
				//그리드1 초기화 : 데이터가 삭제 및 수정 되었기 때문에 재조회 해야됨
				gridRoot1.removeAll( );
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
	
	//alert(gridXmlData2);
	//alert("확정");
	
}


var myVar2 = "";
function tab2_saveCheck() {
    myVar2 = setTimeout(tab2_update, 500);
}
//탭2 그리드 저장
function tab2_update(){
	
	if(saveFlag == "N"){
		saveFlag = "Y";
		return;
	}
	
	//재고조사일정ID의 재고실사등록 확정 여부 체크
	if($("#CFM_FLAG").val()=="2"){
		//선택하신 재고실사조사가 완료되어 수정 할 수 없습니다.
		alert(stockRealMent8);
		return;
	}
	
	//오늘날짜
	var lsToDate = new CommDateManager().getDate("yyyymmdd");
	var doDate = $("#P_INV_INSP_DT").val().replace(/-/gi, '');	
	
	if(lsToDate > doDate ){
		//재고조사기간이 지나 수정 할 수 없습니다.
		alert(inventorySurveyMent11);
		return;
	}
	
	var gridXmlData2 = "";
	
	// 실사재고조회(확정) 데이터  XML로 뽑기  - xml
	var rowCnt  = gridRoot2.getCollection().getSource() ;
	var updateRowCnt = 0;
	for(var i=0 ; i < rowCnt.length ; i++)
	{   
		if(gridRoot2.getItemFieldAt(i, "INPUT_YN") != "N" ){
			gridXmlData2 = gridXmlData2 + getXmlString(   gridRoot2.getItemAt(i)   );
			updateRowCnt++;
		}
	}
	
	if(updateRowCnt == 0){
		//추가, 수정, 삭제된 행이 존재하지 않습니다.
		alert(msgNoneItem);
		return;
	}
	
	gridXmlData2 =  "<GRIDLIST>"+gridXmlData2+"</GRIDLIST>" ;
	
	var loadData = $("#top_search").serializeAllObject();
	loadData.gridXmlData2 = gridXmlData2;
	
	//alert(gridXmlData2);
	
	////저장하시겠습니까?
	if(confirm(msgSaveConfirm) == false) return;
	
	jQuery.ajax({ 
	    url:"/updateWmsStockRealData.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: loadData, 
		success:function(data){   
			//결과리턴
			var obj = jQuery.parseJSON(data.CUR);
			if(  obj[0].RETURN_CODE  == "0000")
			{   
				//저장되었습니다.
				alert(msgSave);
				//조회
				tab2_search();
				
				//그리드1 초기화 : 데이터가 삭제 및 수정 되었기 때문에 재조회 해야됨
				gridRoot1.removeAll( );
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
	
	//alert(gridXmlData2);
	//alert("저장");
	
}


//탭2을 선택 했을때의 그리드2 조회
function tab2_search(){
	
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	if($("#P_INV_INSP_SCHD_ID").val()==""){
		//재고조사일정ID를 선택하세요.
		alert(stockRealMent6);
		$('#P_INV_INSP_SCHD_ID').focus();
		return;
	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	//조회시 해당건에 대한 확정 유무 조회
	jQuery.ajax({
	    type:"POST",
	    url:"/getWmsInvInspDt.do",
	    dataType:"JSON",  
	    data:loadData,
	    //async:false,
	    beforeSend : function(){ 
	    	//로딩바 쇼
	    	showLoadingBar();
	    }, 
	    success : function(data) {
	    	$("#P_INV_INSP_DT").val(data.INV_INSP_DT);
	    	$("#CFM_FLAG").val(data.CFM_FLAG);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
            hideLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
            hideLoadingBar();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//실사재고 조회(확정)-탭2
	jQuery.ajax({ 
	    url:"/getWmsStockRealDataCheckList.do",         
	    type:"POST",
		datatype:"xml",
		async:false,
		data: loadData, 
		success:function(data){  
			//그리드1 초기화
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
				var INPUT_YN 				= xmlDoc.createElement("INPUT_YN");
				var SEQ							= xmlDoc.createElement('SEQ');
				var STR_CODE 				= xmlDoc.createElement('STR_CODE');
				var STR_NAME 				= xmlDoc.createElement('STR_NAME');
				var ZONE_NAME 				= xmlDoc.createElement('ZONE_NAME');
				var ZONE_CODE 				= xmlDoc.createElement('ZONE_CODE');
				var RACK_NAME 				= xmlDoc.createElement('RACK_NAME');
				var RACK_CODE 				= xmlDoc.createElement('RACK_CODE');
				var LINE_NAME 				= xmlDoc.createElement('LINE_NAME');
				var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
				var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE');
				var ITM_NAME 				= xmlDoc.createElement('ITM_NAME');
				var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
				var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
				var MKT_GB_CODE			= xmlDoc.createElement('MKT_GB_CODE'); 
				var UNIT 						= xmlDoc.createElement('UNIT');
				var INV_QTY					= xmlDoc.createElement('INV_QTY');
				var SURVEYQTY1				= xmlDoc.createElement('SURVEYQTY1');
				var SURVEYQTY2				= xmlDoc.createElement('SURVEYQTY2');
				var DIFF_INV_QTY			= xmlDoc.createElement('DIFF_INV_QTY');
				var SPRC 						= xmlDoc.createElement('SPRC'); 
				var STOCK_PRICE 			= xmlDoc.createElement('STOCK_PRICE'); 
				var VEN_NAME 				= xmlDoc.createElement('VEN_NAME'); 
				var INV_FLAG 					= xmlDoc.createElement('INV_FLAG'); 
				var INV_FLAG_CODE 		= xmlDoc.createElement('INV_FLAG_CODE');
				var SURVEY_NO 				= xmlDoc.createElement('SURVEY_NO');  
				var CFM_FLAG 				= xmlDoc.createElement('CFM_FLAG');
				var CFM_FLAG_CODE 		= xmlDoc.createElement('CFM_FLAG_CODE');
				 
				INPUT_YN.appendChild(				xmlDoc.createTextNode( 	"N"				));
				SEQ.appendChild(				  		xmlDoc.createTextNode( 	data[i].SEQ					));
				STR_CODE.appendChild(  			xmlDoc.createTextNode( 	data[i].STR_CODE		));
				STR_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].STR_NAME		));
				ZONE_NAME.appendChild(  		xmlDoc.createTextNode( 	data[i].ZONE_NAME		));
				ZONE_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].ZONE_CODE		));
				RACK_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].RACK_NAME		));
				RACK_CODE.appendChild(  			xmlDoc.createTextNode( 	data[i].RACK_CODE		));
				LINE_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].LINE_NAME		));
				LINE_CODE.appendChild(  			xmlDoc.createTextNode( 	data[i].LINE_CODE		));
				SCAN_CODE.appendChild(  		xmlDoc.createTextNode( 	data[i].SCAN_CODE		));
				ITM_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].ITM_NAME  		));
				CLS_NAME.appendChild(  			xmlDoc.createTextNode( 	data[i].CLS_NAME  		));
				MKT_GB.appendChild(  				xmlDoc.createTextNode(	data[i].MKT_GB 			));
				MKT_GB_CODE.appendChild(  		xmlDoc.createTextNode(	data[i].MKT_GB_CODE	));
				UNIT.appendChild( 					xmlDoc.createTextNode(	data[i].UNIT 				));
				INV_QTY.appendChild(    			xmlDoc.createTextNode( 	data[i].INV_QTY  			));
				SURVEYQTY1.appendChild(    		xmlDoc.createTextNode( 	data[i].SURVEYQTY1  	));
				SURVEYQTY2.appendChild(    		xmlDoc.createTextNode( 	data[i].SURVEYQTY2  	));
				DIFF_INV_QTY.appendChild(   	xmlDoc.createTextNode( 	data[i].DIFF_INV_QTY  	));
				SPRC.appendChild( 					xmlDoc.createTextNode(	data[i].SPRC				));
				STOCK_PRICE.appendChild(		xmlDoc.createTextNode(	data[i].STOCK_PRICE	));
				VEN_NAME.appendChild( 			xmlDoc.createTextNode(	data[i].VEN_NAME   		)); 
				INV_FLAG.appendChild(				xmlDoc.createTextNode(	data[i].INV_FLAG	    	));
				INV_FLAG_CODE.appendChild(		xmlDoc.createTextNode(	data[i].INV_FLAG_CODE	));
				SURVEY_NO.appendChild(			xmlDoc.createTextNode(	data[i].SURVEY_NO		));
				CFM_FLAG.appendChild(				xmlDoc.createTextNode(	data[i].CFM_FLAG			));
				CFM_FLAG_CODE.appendChild(	xmlDoc.createTextNode(	data[i].CFM_FLAG_CODE ));
				  
				
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INPUT_YN);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_NAME);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_QTY);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEYQTY1);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEYQTY2);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DIFF_INV_QTY);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STOCK_PRICE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_FLAG);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_FLAG_CODE);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEY_NO);   
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CFM_FLAG);
				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CFM_FLAG_CODE);
				
				gridRoot2.addItemAt(  xmlDoc  , 0 , false );
				
				//i (index) 입력하여 그리드 아이템 가져오기
	            //var selectedItem = gridRoot2.getItemAt(i);
	            //해당 로우의 아이템 속성 중 delete, insert, update  속성 제거
	            //gridRoot2.removeChangedData(selectedItem);
			}
      
		},
	    complete : function(data) {
	    	
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	//탭2 조회시 그리드 수정,삭제 상태값 초기화처리
	gridRoot2.resetChangedData() ;
	//dataGrid2.invalidateList();
	
}

//탭2 그리드2 행삭제
function tab2_delete(){
	//재고조사일정ID의 재고실사등록 확정 여부 체크
	if($("#CFM_FLAG").val()=="2"){
		//선택하신 재고실사조사가 완료되어 수정 할 수 없습니다.
		alert(stockRealMent8);
		return;
	}
	
	//오늘날짜
	var lsToDate = new CommDateManager().getDate("yyyymmdd");
	var doDate = $("#P_INV_INSP_DT").val().replace(/-/gi, '');	
	
	if(lsToDate > doDate ){
		//재고조사기간이 지나 수정 할 수 없습니다.
		alert(inventorySurveyMent11);
		return;
	}
	
	var grid2Index = dataGrid2.getSelectedIndex();

	if(grid2Index == -1){
		//삭제할 재고목록을 선택해 해주세요.
		alert(stockRealMent21);
		return;
	}
	
	if(gridRoot2.getItemFieldAt( grid2Index , "CFM_FLAG_CODE") == 2 ){
		//실사재고가 확정되어 삭제 할 수 없습니다.
		alert(stockRealMent22);
		return;
	}else{
		//선택하신 ""
		//if(confirm("실사재고목록(확정)에서 선택하신\n상품명(스캐닝코드) : "+gridRoot2.getItemFieldAt( grid2Index , "ITM_NAME")+"("+gridRoot2.getItemFieldAt( grid2Index , "SCAN_CODE")+") \n확정수량 : "+gridRoot2.getItemFieldAt( grid2Index , "SURVEYQTY2")+" 을 삭제하시겠습니까?") == false) return;
		//삭제
		//gridRoot2.removeItemAt();
		
		if (grid2Index >= 0){
			gridRoot2.removeItemAt(grid2Index);
			gridRoot2.setItemFieldAt( "D" , grid2Index, "INPUT_YN");
		}	
		
	}
	//alert(dataGrid2.getSelectedIndex());
	//gridRoot2.removeItemAt();
}


//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################



// 엑셀 export (엑셀다운로드 그리드기능 이용)
//excelExportSave(url:String, async:Boolean);
// url : 업로드할 서버의 url, 기본값 null
// async : 비동기 모드로 수행여부, 기본값 false
function ExcelDownload1() {
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	
	dataGrid1.exportFileName = "WMS-실사재고등록_"+$("#P_STR_NAME option:selected").text()+"_"+$("#P_INV_INSP_SCHD_ID").val()+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
	
};


//실사재고등록 팝업 닫기
function pop1_close() {
	$("#pop_wrap1").dialog("close");
}	



//팝업 -> 실사재고등록 그리드1에 row추가 
function pop1_save() {
	
	if($("#P_POP_STR_CODE").val()==""){
		//점포는 필수입력 입니다.
		alert(stockRealMent4);
		$('#P_POP_STR_NAME').focus();
		return;
	}
	
	if($("#P_POP_ZONE_CODE").val()==0){
		//Location은 필수 선택입니다.
		alert(wmsStockRealMent7);
		$('#P_POP_ZONE_CODE').focus();
		return;
	}
	if($("#P_POP_RACK_CODE").val()==0){
		//Location은 필수 선택입니다.
		alert(wmsStockRealMent7);
		$('#P_POP_RACK_CODE').focus();
		return;
	}
	if($("#P_POP_LINE_CODE").val()==0){
		//Location은 필수 선택입니다.
		alert(wmsStockRealMent7);
		$('#P_POP_LINE_CODE').focus();
		return;
	}
	
	if($("#P_POP_SCAN_CODE").val()==""){
		//스캐닝 코드는 필수입력 입니다.
		alert(stockRealMent24);
		$('#P_POP_SCAN_CODE').focus();
		return;
	}
	if($("#P_POP_INV_QTY").val()==0){
		//조사수량은 필수입력 입니다.
		alert(stockRealMent25);
		$('#P_POP_INV_QTY').focus();
		return;
	}
	if($("#P_POP_ITM_NAME").val()==""){
		//실사재고등록 할 상품이 없습니다. 올바른 스캐닝코드를 입력하세요.
		alert(stockRealMent26);
		return;
	}
	
	//소팅상태에서는 행추가가 되지 않으므로 초기화
	collection1.setSort(null);
  // collection 정보를 새로고침합니다.
  collection1.refresh();
	
	//ROW추가를 위한 XML데이터 포맷 생성
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
	var SEQ			 				= xmlDoc.createElement('SEQ');
	var STR_CODE 				= xmlDoc.createElement('STR_CODE');
	var STR_NAME 				= xmlDoc.createElement('STR_NAME');
	var ZONE_NAME 				= xmlDoc.createElement('ZONE_NAME');
	var ZONE_CODE 				= xmlDoc.createElement('ZONE_CODE');
	var RACK_NAME 				= xmlDoc.createElement('RACK_NAME');
	var RACK_CODE 				= xmlDoc.createElement('RACK_CODE');
	var LINE_NAME 				= xmlDoc.createElement('LINE_NAME');
	var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
	var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE');
	var INV_QTY					= xmlDoc.createElement('INV_QTY');
	var ITM_NAME 				= xmlDoc.createElement('ITM_NAME');
	var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
	var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
	var MKT_GB_CODE			= xmlDoc.createElement('MKT_GB_CODE'); 
	var UNIT 						= xmlDoc.createElement('UNIT'); 
	var SPRC 						= xmlDoc.createElement('SPRC'); 
	var STOCK_PRICE 			= xmlDoc.createElement('STOCK_PRICE'); 
	var VEN_NAME 				= xmlDoc.createElement('VEN_NAME'); 
	var INV_FLAG 					= xmlDoc.createElement('INV_FLAG'); 
	var INV_FLAG_CODE 		= xmlDoc.createElement('INV_FLAG_CODE'); 
	var SURVEY_NO 				= xmlDoc.createElement('SURVEY_NO');  
	var CFM_FLAG 				= xmlDoc.createElement('CFM_FLAG');
	var CFM_FLAG_CODE		= xmlDoc.createElement('CFM_FLAG_CODE');
	var VALID_YN 					= xmlDoc.createElement('VALID_YN');
	 
	SEQ.appendChild(  				xmlDoc.createTextNode( 	""																	));
	STR_CODE.appendChild(  		xmlDoc.createTextNode( 	$("#P_POP_STR_CODE").val()								));
	STR_NAME.appendChild(  		xmlDoc.createTextNode( 	$("#P_POP_STR_NAME option:selected").text()		));
	ZONE_NAME.appendChild(  	xmlDoc.createTextNode( 	$("#P_POP_ZONE_CODE option:selected").text()	));
	ZONE_CODE.appendChild(  	xmlDoc.createTextNode( 	$("#P_POP_ZONE_CODE").val()							));
	RACK_NAME.appendChild(  		xmlDoc.createTextNode( 	$("#P_POP_RACK_CODE option:selected").text()	));
	RACK_CODE.appendChild(  		xmlDoc.createTextNode( 	$("#P_POP_RACK_CODE").val()							));
	LINE_NAME.appendChild(  		xmlDoc.createTextNode( 	$("#P_POP_LINE_CODE option:selected").text()		));
	LINE_CODE.appendChild(  		xmlDoc.createTextNode( 	$("#P_POP_LINE_CODE").val()								));
	SCAN_CODE.appendChild(  	xmlDoc.createTextNode( 	$("#P_POP_SCAN_CODE").val()							));
	INV_QTY.appendChild(    		xmlDoc.createTextNode( 	$("#P_POP_INV_QTY").val()  								));
	ITM_NAME.appendChild(  		xmlDoc.createTextNode( 	$("#P_POP_ITM_NAME").val()  							));
	CLS_NAME.appendChild(  		xmlDoc.createTextNode( 	$("#P_POP_CLS_NAME").val()  							));
	MKT_GB.appendChild(  			xmlDoc.createTextNode(	$("#P_POP_MKT_GB option:selected").text()			));
	MKT_GB_CODE.appendChild(  	xmlDoc.createTextNode(	$("#P_POP_MKT_GB").val() 								));
	UNIT.appendChild( 				xmlDoc.createTextNode(	$("#P_POP_UNIT").val()										));
	SPRC.appendChild( 				xmlDoc.createTextNode(	$("#P_POP_SPRC").val()									));
	//재고금액 산출 (단가 * 재고조사 수량)
	var inv_qty = $("#P_POP_INV_QTY").val();
	var sprc = $("#P_POP_SPRC").val();
	var stock_price = inv_qty * sprc;
	
	STOCK_PRICE.appendChild(		xmlDoc.createTextNode(	stock_price								));
	VEN_NAME.appendChild( 			xmlDoc.createTextNode(	$("#P_POP_VEN_NAME").val()     )); 
	INV_FLAG.appendChild(				xmlDoc.createTextNode(	"수기등록"								));
	INV_FLAG_CODE.appendChild(		xmlDoc.createTextNode(	"1"											));
	SURVEY_NO.appendChild(			xmlDoc.createTextNode(	USER_ID									));
	CFM_FLAG.appendChild(				xmlDoc.createTextNode(	"미확정"									));
	CFM_FLAG_CODE.appendChild(	xmlDoc.createTextNode(	"1"											));
	VALID_YN.appendChild(				xmlDoc.createTextNode(	"Y"											));
	  
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SEQ);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_NAME);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_QTY);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(UNIT);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STOCK_PRICE);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_FLAG);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_FLAG_CODE);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SURVEY_NO);   
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CFM_FLAG);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CFM_FLAG_CODE);
	xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VALID_YN);  
	
	// 0 : 맨위에 추가 ,  -1 :맨 아래에 추가 
	gridRoot1.addItemAt(  xmlDoc  , 0, false);
	
	//계속등록기능 변경으로 주석처리
	//$("#pop_wrap1").dialog("close");
	
	//팝업내용 초기화 처리
	clearePop();
	$('#P_POP_SCAN_CODE').val("");
	//새로운 스캔코드 입력을 위한 포커스 처리
	$('#P_POP_SCAN_CODE').focus();
}	

//엑셀 export (엑셀다운로드 그리드기능 이용)
//excelExportSave(url:String, async:Boolean);
//url : 업로드할 서버의 url, 기본값 null
//async : 비동기 모드로 수행여부, 기본값 false
function ExcelDownload2() {
	
	var dataCnt = gridRoot2.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	
	dataGrid2.exportFileName = "WMS-실사재고조정(확정)_"+$("#P_STR_NAME option:selected").text()+"_"+$("#P_INV_INSP_SCHD_ID").val()+".xlsx";
	gridRoot2.excelExportSave("/gridExcelDown.do", false);
	
};

//엑셀다운을 위한 폼 생성 함수
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

//XML스트링 변환
function getXmlString(xmlElement) {
	if (window.XMLSerializer)
		return new XMLSerializer().serializeToString(xmlElement);
	return   xmlElement.xml  ;
}

