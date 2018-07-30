/********************************************************
 * 설명:  보류등록(해제) 관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 오동근
 * since	: 2017.01.11
 * version : 1.0
 ********************************************************/



$(document).ready(function(){
	init();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	$(".datepicker").datepicker();
	datePickerYearMonth();
	datePickerYearMonth();
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
rMateGridH5.create("grid1", "gridHolder1", jsVars, "100%");
//rMateGridH5.create("grid2", "gridHolder2", jsVars);

// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandler(id) {
	if (id == "grid1") {
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot();	// 데이터와 그리드를 포함하는 객체

		gridApp1.setLayout(layoutStr1);
		gridApp1.setData(gridData);
		
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData1 = dataRow1[dataField];
			
			$('#I_VEN_CODE' ).val(dataRow1.VEN_CODE);
			$('#I_VEN_NAME' ).val(dataRow1.VEN_NAME);
			
			fnSelectPaymentBoxList('B', dataRow1.VEN_CODE);
			fnSelectPaymentBoxList('C', dataRow1.PAY_CON);
			$('#P_PAY_CON' ).val(dataRow1.PAY_CON);
			$('#P_PAY_SEQ' ).val(dataRow1.PAY_SEQ);
			$('#P_DUCT_CODE' ).val(dataRow1.DUCT_CODE);
			$('#P_DUCT_DT' ).val(dataRow1.DUCT_DT);
			$('#P_DUCT_YM' ).val(dataRow1.DUCT_YM);
			$('#P_DUCT_AMT' ).val(dataRow1.DUCT_AMT);
			$('#P_EMP_NAME' ).val(dataRow1.EMP_NAME);
			$('#P_EMP_NO' ).val(dataRow1.EMP_NO);
			$('#P_REMARK' ).val(dataRow1.REMARK);
			$('#IDATE' ).val(dataRow1.IDATE);
			$('#IEMP_NO' ).val(dataRow1.IEMP_NO);
			$('#UDATE' ).val(dataRow1.UDATE);
			$('#UEMP_NO' ).val(dataRow1.UEMP_NO);
			$('#I_STR_CODE' ).val(dataRow1.STR_CODE);
			$('#P_PAY_CLOSE').val(dataRow1.PAY_CLOSE); // 지불마감
		};
		
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			dataGrid1.addEventListener("itemClick", itemClickHandler);

		};
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	}  
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1, clickData1, selectorColumn1;

//----------------------- 그리드 설정 끝 -----------------------
var layoutStr1;
//그리드1 헤더 설정

layoutStr1 =
'<rMateGrid>\
	<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
	<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="6" />\
	<DataGrid id="dg1" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="No"  			headerText="' + rowNumber + '"		itemRenderer="IndexNoItem" textAlign="center" width="50" secondLabelJsFunction="secondFunc"/>\
			<DataGridColumn dataField="DUCT_YM"  		headerText="' + ductYm + '"  		textAlign="center" 	width="80"	/>\
			<DataGridColumn dataField="VEN_CODE"  		headerText="' + venCode + '"  		textAlign="center" 	width="80"	/>\
			<DataGridColumn dataField="VEN_NAME"  		headerText="' + venName + '"  		textAlign="left" />\
			<DataGridColumn dataField="PAY_CON_NAME"  	headerText="' + payCon + '"			textAlign="center" 	width="130"	/>\
			<DataGridColumn dataField="PAY_SEQ_NAME"	headerText="' + paySeq + '" 		textAlign="center" 	width="130"	/>\
			<DataGridColumn dataField="DUCT_NAME"  		headerText="' + ductCode + '" 		textAlign="center" 	width="100"	/>\
			<DataGridColumn dataField="STR_NAME"  		headerText="' + storNm + '"  		textAlign="center" 	width="60"	/>\
			<DataGridColumn dataField="DUCT_DT" 		headerText="' + requestDt + '" 		textAlign="center"  width="100" />\
			<DataGridColumn dataField="EMP_NAME"		headerText="' + requestEmp + '" 	textAlign="center"	/>\
			<DataGridColumn dataField="DUCT_AMT"		headerText="' + ductAmt + '" 		textAlign="right" labelJsFunction="labelFunc"/>\
			<DataGridColumn dataField="REMARK"			headerText="' + remarks + '" 		textAlign="left" />\
			<DataGridColumn dataField="ORG_CREAT"		headerText="' + orgCreat + '" 		textAlign="center"	width="90" />\
			<DataGridColumn dataField="PAY_CON"			headerText="지불주기" 		visible="false"	/>\
			<DataGridColumn dataField="PAY_SEQ"			headerText="지불차수" 		visible="false"	/>\
			<DataGridColumn dataField="DUCT_CODE"		headerText="보류코드" 		visible="false"	/>\
			<DataGridColumn dataField="IEMP_NO"			headerText="등록사원번호" 	visible="false"	/>\
			<DataGridColumn dataField="EMP_NO"			headerText="요청사원번호" 	visible="false"	/>\
			<DataGridColumn dataField="IDATE"			headerText="등록일시" 		visible="false"	/>\
			<DataGridColumn dataField="UEMP_NO"			headerText="수정사원번호" 	visible="false"	/>\
			<DataGridColumn dataField="UDATE"			headerText="수정일시" 		visible="false"	/>\
			<DataGridColumn dataField="VEN_CODE"		headerText="협력업체코드" 	visible="false"	/>\
			<DataGridColumn dataField="PUR_CLOSE"		headerText="매입집계"	 	visible="false"	/>\
		</columns>\
		<dataProvider>\
			<SpanSummaryCollection source="{$gridData}">\
				<summaries>\
			        <SpanSummaryRow summaryPlacement="last" label="' + sm + '" labelDataField="No" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}" >\
			            <SpanSummaryField dataField="DUCT_AMT" summaryOperation="SUM" />\
			        </SpanSummaryRow>\
			    </summaries>\
		    </SpanSummaryCollection>\
	    </dataProvider>\
	</DataGrid>\
</rMateGrid>';
//그리드1 데이터 초기화
var gridData = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################
function secondFunc(item, value, column){
	if(item["No"])
		return item["No"];
	else 
		return value;
}

function labelFunc(item, value, column){
	var str = value;
	return moneyComma(String(str));
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
function btn_comm_supply_search_2(){
	$('#comm_pop_wrap3_2' ).dialog( 'open' );
	gridApp12_2.resize();
	
	if($("#I_VEN_NAME").val() != null && $("#I_VEN_NAME").val() != ""){
		$("#P_TEXT3_2").val($("#I_VEN_NAME").val());
		btn_comm_search('3_2');
	}
}

//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
	
	//협력업체의 지불주기/지불차수 선택
	getPayNum(dataRow.VEN_CODE, 'P_PAY_CON_SEARCH','S_PAY_SEQ');
}
function fn_comm_supply_callback_2(dataRow){
	$('#I_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#I_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
	
	// onchange="fnSelectPaymentBoxList('B', this.value);"
	fnSelectPaymentBoxList('B', dataRow.VEN_CODE);
	
	//협력업체의 지불주기/지불차수 선택
	getPayNum(dataRow.VEN_CODE, 'P_PAY_CON','P_PAY_SEQ');
}

//(사원검색) 팝업 호출 function
function btn_comm_member_search(){
	$('#comm_pop_wrap4' ).dialog( 'open' );
	gridApp13.resize();
	
	if($("#P_EMP_NAME").val() != null && $("#P_EMP_NAME").val() != ""){
		$("#P_TEXT4").val($("#P_EMP_NAME").val());
		btn_comm_search('4');
	}
}

//(사원검색) 팝업 callback function
function fn_comm_member_callback(dataRow){
	$('#P_EMP_NAME' ).val(dataRow.USER_NM);			// 사원명
	$('#P_EMP_NO' ).val(dataRow.USER_ID);			// 사원번호
}

function fnSearch(){
	var loadData = $("#top_search").serializeAllObject();  
	
	if($.trim($("#P_START_SEARCH_DT").val() ) == null || $.trim($("#P_START_SEARCH_DT").val() ) == "")
	{
		confirm(ductYm + msgConfirm);
		$("#P_START_SEARCH_DT").focus();
		return;
	}
	
	if($.trim($("#P_VEN_NAME").val() ) == null || $.trim($("#P_VEN_NAME").val() ) == "") $("#P_VEN_CODE").val("");
	
	loadData.P_STR_CODE = $("#P_STR_CODE").val();
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/paymentDeductionInfoList.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){  
			gridApp1.setData(data.list);
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

function fnUpdate(){
	var loadData = $("#reg_form").serializeAllObject();

	if(!fnValidation()) return;
	if(!confirm(msgSaveConfirm)) return;
	
	if($.trim($("#P_DUCT_YM").val() ) == null || $.trim($("#P_DUCT_YM").val() ) == "")
		$("#P_DUCT_YM").val( $("#P_START_SEARCH_DT").val() );

	loadData.I_STR_CODE = $("#I_STR_CODE").val();
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/paymentDeductionUpdate.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){
			
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					frmReset();
					fnSearch();
					alert(msgSave);
				}
				else
				{
					alert(data.RETURN_MSG);
				}
			}
			else
			{
				alert(msgErrorDefault);
			}
			
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

function fnDelete (){
	var loadData = $("#reg_form").serializeAllObject();
	
	if($.trim($("#I_VEN_CODE").val() ) == null || $.trim($("#I_VEN_CODE").val() ) == "")
	{
		alert(supply + msgConfirm);
		$("#I_VEN_CODE").focus();
		return; //return false;
	}
	
	loadData.I_STR_CODE = $("#I_STR_CODE").val();
	
	if(!confirm(msgDeleteConfirm)) return;
	
	 
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/paymentDeductionDelete.do",         
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    },
		success:function(data){
			
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					frmReset();
					fnSearch();
					alert(msgDelete);
				}
				else
				{
					alert(data.RETURN_MSG);
				}
			}
			else
			{
				alert(msgErrorDefault);
			}
			
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

//지불주기 선택 > 지불차수 출력.
function chgPay( PAY_GB ) { 
	if( PAY_GB == "PAY_CON")
	{
		if( $('#P_PAY_CON_SEARCH').val() == "" )
		{
			$('#PAY_CON_MGMT_ENTRY_1').val( "" );
			
			$("#P_PAY_CON_SEARCH").empty();
			$("#P_PAY_CON_SEARCH option").remove();
			$("#P_PAY_CON_SEARCH" ).append('<option value="">' + all + '</option>');
			getCommonCodeSelectBoxList("P_PAY_CON_SEARCH",   "PAY_CON"); // 지불주기  조회조건
			
			$("#S_PAY_SEQ").empty();
			$("#S_PAY_SEQ option").remove();
			$("#S_PAY_SEQ" ).append('<option value="">' + all + '</option>');
			getCommonCodeSelectBoxList("S_PAY_SEQ",   "PAY_SEQ"); // 지불차수
			
			return;
		}
		
		var MGMT_ENTRY_VAL = "";
		jQuery.ajax({ 
		    url:"/getPayMgmtEntry.do",         
		    type:"POST",
			datatype:"json",
			async:false,
		 	data: {   "CD_CL"  : "PAY_CON"
		 	,         "CD_ID"  : $('#P_PAY_CON_SEARCH').val()
		    },
			success:function(data){ 
				MGMT_ENTRY_VAL  =  data[0].MGMT_ENTRY_1  ;
				$('#PAY_CON_MGMT_ENTRY_1').val(   data[0].MGMT_ENTRY_1   ); 
		    },
		    complete : function(data) { 
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	
		 
		var postValue ={};	
		postValue = { 
				  "MGMT_ENTRY"	: MGMT_ENTRY_VAL  
		}; 
		jQuery.ajax({
		    type:"POST",
		    url:"/getPaySeqCodeSelectBoxList.do",    // getCateCodeSelectBoxList
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	$("#S_PAY_SEQ").empty();
		    	$("select[name=S_PAY_SEQ   ] option").remove();
		    	$("#S_PAY_SEQ" ).append('<option value="">' + all + '</option>'); 
				for(var i = 0; i < data.length; i++){
					 $("#S_PAY_SEQ"  ).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
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

//지불주기 선택 > 지불차수 출력.
function chgPay_2( PAY_GB ) { 
	if( PAY_GB == "PAY_CON")
	{
		if( $('#P_PAY_CON').val() == "" )
		{
			//$('#PAY_CON_MGMT_ENTRY_1').val( "" );
			return;
		}
		
		var MGMT_ENTRY_VAL = "";
		jQuery.ajax({ 
		    url:"/getPayMgmtEntry.do",         
		    type:"POST",
			datatype:"json",
			async:false,
		 	data: {   "CD_CL"  : "PAY_CON"
		 	,         "CD_ID"  : $('#P_PAY_CON').val()
		    },
			success:function(data){ 
				MGMT_ENTRY_VAL  =  data[0].MGMT_ENTRY_1  ;
				//$('#PAY_CON_MGMT_ENTRY_1').val(   data[0].MGMT_ENTRY_1   ); 
		    },
		    complete : function(data) { 
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});

		var postValue ={};	
		postValue = { 
				  "MGMT_ENTRY"	: MGMT_ENTRY_VAL  
		}; 
		jQuery.ajax({
		    type:"POST",
		    url:"/getPaySeqCodeSelectBoxList.do",    // getCateCodeSelectBoxList
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	$("select[name=P_PAY_SEQ   ] option").remove();
		    	//$("#P_PAY_SEQ" ).append('<option value="">' + all + '</option>'); 
				for(var i = 0; i < data.length; i++){
					 $("#P_PAY_SEQ"  ).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
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

//협력업체의 지불주기/지불차수 선택
//getPayNum(dataRow.VEN_CODE, 'P_PAY_CON_SEARCH','S_PAY_SEQ');
function getPayNum(venCode, pPayCon,pPaySeq){
	var postValue ={};	
	postValue = { 
			  "P_VEN_CODE"	: venCode
	};

	jQuery.ajax({
	    type:"POST",
	    url:"/getPayNum.do",
	    dataType:"JSON",
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	//alert('PAY_CON: '+data[0].PAY_CON + ', PAY_SEQ:' + data[0].PAY_SEQ);
	    	 
	    	$("#"+pPayCon).empty();
	    	$("select[name="+pPayCon+"   ] option").remove();
//	    	$("#P_PAY_CON  option[value!='']").remove();  
    		$("#"+pPayCon).append('<option value="">' + all + '</option>');
    		
    		$("#"+pPaySeq).empty();
    		$("select[name="+pPaySeq+"   ] option").remove();
    		$("#"+pPaySeq).append('<option value="">' + all + '</option>');
    		
    		
    		
    		
	    	for(var i = 0; i < data.length; i++){
//	    		$("#"+pPayCon+"").val(data[i].PAY_CON).attr("selected","selected");
//	    		chgPay('PAY_CON');
//	    		
//			    $("#"+pPaySeq+"").val(data[i].PAY_SEQ).attr("selected","selected");
	    		
	    		 
	    		if(  pPayCon  == 'P_PAY_CON_SEARCH' ) 
	    		{ 
		    		$("#"+pPayCon).append('<option value="'+ data[i].PAY_CON +'">'+ data[i].PAY_CON_NM +'</option>');
		    		$("#"+pPayCon).val(data[i].PAY_CON).attr("selected","selected");
	    		}
	    		
	    		
	    		$("#"+pPaySeq).append('<option value="'+ data[i].PAY_SEQ +'">'+ data[i].PAY_SEQ_NM +'</option>');
		    	$("#"+pPaySeq).val(data[i].PAY_SEQ).attr("selected","selected");
		   	}
	    	
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function init() {
	//$('#P_DUCT_AMT').number( true );
	getCommonCodeSelectBoxList("P_DUCT_CODE",   "DUCT_CODE");    //	공제코드
	getCommonCodeSelectBoxList("P_DUCT_CODE_SEARCH",   "DUCT_CODE");    //	공제코드 조회조건
	
	getCommonCodeSelectBoxList("P_PAY_CON_SEARCH",   "PAY_CON");    //	지불주기  조회조건
	getCommonCodeSelectBoxList("S_PAY_SEQ",   "PAY_SEQ");
	
	
	
	var nowDateYm = new CommDateManager().getDate("yyyy-mm");
	var nowDate = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_START_SEARCH_DT").val(nowDateYm);
	$("#P_END_SEARCH_DT").val(nowDateYm);
	$("#P_DUCT_DT").val(nowDate);
	
	$("#P_STR_CODE").append('<option value="">'+ all +'</option>');
	getStoreCode("P_STR_CODE");
	getStoreCode("I_STR_CODE");
	
	$(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_SEARCH_START_DT").val()  >  $("#P_SEARCH_END_DT").val()     )
			{   alert("검색할 끝 일자는 시작 일자보다 작을수 없습니다.");
				$("#P_SEARCH_START_DT").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
	});

	//$("select[id='P_STR_CODE']").val(SSSC).prop("selected", true); // 회원의 점포 선택
	
	// 협력(매입)업체에서 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        }
        
        //협력업체 없으면 지불주기/지불차수 전체
        var venName = $('#P_VEN_NAME' ).val();
    	if(venName == null || venName == ''){
    		$("#P_PAY_CON_SEARCH").empty();
    		$("#P_PAY_CON_SEARCH" ).append('<option value="">' + all + '</option>');
    		getCommonCodeSelectBoxList("P_PAY_CON_SEARCH",   "PAY_CON"); // 지불주기  조회조건
    		
    		$("#S_PAY_SEQ").empty();
    		$("#S_PAY_SEQ" ).append('<option value="">' + all + '</option>');
			getCommonCodeSelectBoxList("S_PAY_SEQ",   "PAY_SEQ"); // 지불차수
    	}
	});
	$("input[name=I_VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search_2();
        }
        
        //협력업체 없으면 지불주기/지불차수 전체
        var venName = $('#I_VEN_NAME' ).val();
    	if(venName == null || venName == ''){
    		$("#P_PAY_CON").empty();
    		$("#P_PAY_CON" ).append('<option value="">' + all + '</option>');
    		getCommonCodeSelectBoxList("P_PAY_CON",   "PAY_CON"); // 지불주기  조회조건
    		
    		$("#P_PAY_SEQ").empty();
    		$("#P_PAY_SEQ" ).append('<option value="">' + all + '</option>');
			getCommonCodeSelectBoxList("P_PAY_SEQ",   "PAY_SEQ"); // 지불차수
    	}
	});
	
	// 요청사원
	$("input[name=P_EMP_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_member_search();
        } 
	});
	
	// 협력업체
	//fnSelectPaymentBoxList('A','');
}

function fnSelectPaymentBoxList(type,val){
	var param = {};
	
	if(type == 'A'){
		$("#P_PAY_CON option").remove();
		$("#P_PAY_CON").append("<option value=''>선택</option>");
		$("#P_PAY_SEQ option").remove();
		$("#P_PAY_SEQ").append("<option value=''>선택</option>");
	}else if(type == 'B'){
		$("#P_PAY_CON option").remove();
		$("#P_PAY_SEQ option").remove();
	//	$("#P_PAY_SEQ").append("<option value=''>선택</option>");
	}else{
		//$("#P_PAY_SEQ option").remove();
	}
	
	if(type == 'C'){
		param = { "P_TYPE"	: type 
				 ,"P_VEN_CODE": $('#I_VEN_CODE').val()
				 ,"P_PAY_CON" : val};
	}else{
		param = { "P_TYPE"	: type 
				 ,"P_VEN_CODE": val};
	}
	
	jQuery.ajax({
	    type:"POST",
	    url:"/getPaymentSelectBoxList.do",
	    data: param,
	    dataType:"JSON", 
	    success : function(data) {
	    	var list = data.list;
			for(var i = 0; i < list.length; i++){
				if(type == 'A'){
					$("#I_VEN_CODE").append('<option value="'+ list[i].STR_CODE +'">' + list[i].STR_CODE + ': '+ list[i].STR_NAME +'</option>');
				}else if(type == 'B'){
					$("#P_PAY_CON").append('<option value="'+ list[i].STR_CODE +'">'+ list[i].STR_NAME +'</option>');
					if(i == 0){
						fnSelectPaymentBoxList('C',list[0].STR_CODE);
					}
				}else{
					$("#P_PAY_SEQ option").remove();
					$("#P_PAY_SEQ").append('<option value="'+ list[i].STR_CODE +'">'+ list[i].STR_NAME +'</option>');
					
					//chgPay_2('PAY_CON');
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

function frmReset(){
	$("#reg_form").each(function() {
		this.reset();
	});
	
	var nowDate = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_DUCT_DT").val(nowDate);

	$("#P_PAY_CON option").remove();
	$("#P_PAY_SEQ option").remove();
	getCommonCodeSelectBoxList("P_PAY_CON",   "PAY_CON"); // 지불주기  조회조건
	getCommonCodeSelectBoxList("P_PAY_SEQ",   "PAY_SEQ"); // 지불차수
	
	$("#P_PAY_CLOSE").val('');
}

function fnValidation(){

	// 지불마감 확인
	//alert($("#P_PAY_CLOSE").val());
	if($.trim($("#P_PAY_CLOSE").val() ) != null && $.trim($("#P_PAY_CLOSE").val() ) != "")
	{
		alert(msgPayClose);
		return false;
	}
	
	if($.trim($("#I_VEN_CODE").val() ) == null || $.trim($("#I_VEN_CODE").val() ) == "")
	{
		alert(supply + msgConfirm);
		$("#I_VEN_CODE").focus();
		return false;
	}
	
	if($.trim($("#P_PAY_CON").val() ) == null || $.trim($("#P_PAY_CON").val() ) == "")
	{
		alert(payCon + msgConfirm);
		$("#P_PAY_CON").focus();
		return false;
	}
	
	if($.trim($("#P_PAY_SEQ").val() ) == null || $.trim($("#P_PAY_SEQ").val() ) == "")
	{
		alert(paySeq + msgConfirm);
		$("#P_PAY_SEQ").focus();
		return false;
	}
	
	if($.trim($("#P_DUCT_CODE").val() ) == null || $.trim($("#P_DUCT_CODE").val() ) == "")
	{
		alert(ductCode + msgConfirm);
		$("#P_DUCT_CODE").focus();
		return false;
	}
	
	if($.trim($("#P_DUCT_DT").val() ) == null || $.trim($("#P_DUCT_DT").val() ) == "")
	{
		alert(requestDt + msgConfirm);
		$("#P_DUCT_DT").focus();
		return false;
	}
	
	if($.trim($("#P_DUCT_AMT").val() ) == null || $.trim($("#P_DUCT_AMT").val() ) == "") // $.trim($("#P_DUCT_AMT").val() ) == "0"
	{
		alert(ductAmt + msgConfirm);
		$("#P_DUCT_AMT").focus();
		return false;
	}

	if($.isNumeric( $.trim($("#P_DUCT_AMT").val()) ) == false)
	{
		alert(ductAmt + ' 숫자만 입력 가능 합니다.');
		$("#P_DUCT_AMT").focus();
		return false;
	}
	
	return true;
}

//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height($(window).height()-220);

	$(window).on('resize',function (){	
		$("#gridHolder1").height($(window).height()-220);
	});
});