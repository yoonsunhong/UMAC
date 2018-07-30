/********************************************************
*   설명:  재고조정등록
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-04-17    문희훈       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/
var saveFlag ="I";

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler1";

// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid1", "gridHolder1", jsVars1);

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1, dataRow1,clickData1,selectorColumn1, collection1,	rowIndex1;

var gridData1 =[];

//그리드1 레디 핸들러
function gridReadyHandler1(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 X
	gridApp1.setData(gridData1);

	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	
 
   /* var layoutCompleteHandler = function(event) {
        dataGrid1 = gridRoot1.getDataGrid();    // 그리드 객체
        dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
    };
    gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler);*/
	
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 그리드 객체
	dataGrid1 = gridRoot1.getDataGrid(); 
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	//그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	//그리드1 더블클릭 이벤트
	dataGrid1.setDoubleClickEnabled(true);
	dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
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
}

//그리드1 ROW 더블클릭 이벤트
function itemDoubleClickHandler1(event){
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	
	//alert(dataRow1.INV_GB_CODE);
	//팝업 데이터 초기화
	clearePop();
	$("#P_POP_INV_DT").val(dataRow1.INV_DT);
	$("#P_POP_STR_NAME").val(dataRow1.STR_CODE);
	$("#P_POP_STR_CODE").val(dataRow1.STR_CODE);
	
	$("#P_POP_SCAN_CODE").val(dataRow1.SCAN_CODE);
	$("#P_POP_ITM_CODE").val(dataRow1.ITM_CODE);
	$("#P_POP_ITM_NAME").val(dataRow1.ITM_NAME);
	
	$("#P_POP_INV_GB").val(dataRow1.INV_GB_CODE);
	$("#P_POP_APP_QTY").val(dataRow1.REQ_QTY);
	$("#P_POP_REMARK").val(dataRow1.REMARK);
	$("#P_POP_STR_NAME").attr("disabled", 'disabled');
	
	
	//확정이 되면 팝업의 저장버튼 숨김처리
	if(dataRow1.CFM_FLAG_CODE == 2){
		$("#popSave").hide();
		$("#P_POP_ITM_NAME").attr("disabled", 'disabled');
		$("#popItmIcon").hide();
	}else{
		$("#popSave").show();
		$("#P_POP_ITM_NAME").attr("disabled", 'disabled'); 
		$("#popItmIcon").hide();
	}
	
	var postValue ={};	
	postValue = { 
			 "P_STR_CODE"			: dataRow1.STR_CODE,
			 "P_POP_ITM_CODE"	    : dataRow1.ITM_CODE,
			 "P_POP_INV_DT"			: dataRow1.INV_DT.replace(/-/gi, '')
	};
	
	//상품 일 수불 정보 검색
	jQuery.ajax({
	    type:"POST",
	    url:"/getProductCollDtlInfo.do",
	    dataType:"JSON",  
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	if(data.length == 1){
	    		$("#POP_ITM_NAME").val(data[0].ITM_NAME);
	    		$("#POP_SCAN_CODE").val(data[0].SCAN_CODE);
		    	$("#POP_UNIT").val(data[0].UNIT);
		    	
		    	//3자리마다 콤마
		    	$("#POP_INV_QTY").val(data[0].INV_END_QTY.format());
		    	$("#POP_SPRC").val(data[0].SPRC.format());
		    	$("#POP_SPRC_AMT").val(data[0].POP_SPRC_AMT.format());
		    	
		    	//정보를 불러왔을경우 수량입력을 위한 포커스 처리
		    	$('#P_POP_INV_GB').focus();
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
	
	
	//저장 플래그 수정으로 변경 변수
	saveFlag = "U";
	$('#pop_wrap1').dialog( 'open' );	
	
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
			<DataGridColumn id="STR_CODE" dataField="STR_CODE" headerText="'+storCode+'" textAlign="center" width="70"  sortable="false" visible="false"/>\
			<DataGridColumn id="STR_NAME" dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" width="100"  />\
			<DataGridColumn id="LRG_NAME" dataField="LRG_NAME"  headerText="'+majorCategoryName+'" textAlign="center" width="80"  sortable="false"/>\
			<DataGridColumn id="INV_DT" dataField="INV_DT" headerText="'+adjustmentDate+'" textAlign="center" width="100"  />\
			<DataGridColumn id="SCAN_CODE" dataField="SCAN_CODE" headerText="'+scanningCode+'" textAlign="center" width="140"  sortable="false"/>\
			<DataGridColumn id="ITM_CODE" dataField="ITM_CODE" headerText="상품코드" textAlign="center"  visible="false"/>\
			<DataGridColumn id="ITM_NAME" dataField="ITM_NAME"  headerText="'+itmName+'" textAlign="lefr" width="150"  sortable="false"/>\
			<DataGridColumn id="UNIT" dataField="UNIT"  headerText="'+standard+'" textAlign="center" width="80" sortable="false"/>\
			<DataGridColumn id="DP_PRC_UNIT" dataField="DP_PRC_UNIT"  headerText="'+unit+'" textAlign="center" width="80" sortable="false" />\
			<DataGridColumn id="SPRC" dataField="SPRC"  headerText="'+productSprc+'"   textAlign="right" sortable="false" formatter="{numfmt}"  width="100"/>\
			<DataGridColumn id="REQ_QTY" dataField="REQ_QTY" headerText="'+adjustedQuantity+'"   textAlign="center" sortable="false" formatter="{numfmt}"  width="80"/>\
			<DataGridColumn id="ITEM_CODE_EA" dataField="ITEM_CODE_EA" headerText="낱개코드"   textAlign="center" sortable="false"   width="110"/>\
			<DataGridColumn id="INV_QTY_EA" dataField="INV_QTY_EA" headerText="박스낱개수량"   textAlign="center" sortable="false" formatter="{numfmt}"  width="120"/>\
			<DataGridColumn id="PUR_WPRC" dataField="PUR_WPRC" headerText="LOSS금액"   textAlign="right" sortable="false" formatter="{numfmt}"  width="80"/>\
			<DataGridColumn id="INV_GB" dataField="INV_GB"  headerText="'+reasonForAdjustment+'" textAlign="center" width="100" />\
			<DataGridColumn id="INV_GB_CODE" dataField="INV_GB_CODE"  headerText="조정사유코드" textAlign="center"  visible="false"/>\
			<DataGridColumn id="REMARK" dataField="REMARK"  headerText="'+remarks+'" textAlign="left"/>\
			<DataGridColumn id="CFM_FLAG" dataField="CFM_FLAG"  headerText="'+approvalStatus+'" textAlign="center" width="80"  sortable="false"/>\
			<DataGridColumn id="CFM_FLAG_CODE" dataField="CFM_FLAG_CODE"  headerText="CFM_FLAG_CODE"  visible="false"/>\
		</groupedColumns>\
		<footers>\
			<DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#c5c5c5" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal" >\
				<DataGridFooterColumn label="'+sm+'" textAlign="center" backgroundColor="#acacac" />\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" formatter="{numfmt}" dataColumn="{SPRC}" textAlign="right"/>\
				<DataGridFooterColumn summaryOperation="SUM" formatter="{numfmt}" dataColumn="{REQ_QTY}" textAlign="right"/>\
				<DataGridFooterColumn/>\
				<DataGridFooterColumn summaryOperation="SUM" formatter="{numfmt}" dataColumn="{INV_QTY_EA}" textAlign="right"/>\
				<DataGridFooterColumn summaryOperation="SUM" formatter="{numfmt}" dataColumn="{PUR_WPRC}" textAlign="right"/>\
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
//###	8. init ( 시작 )   							   ###
//########################################################

$(document).ready(function(){
	
	init();
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류
	/**검색조건 날짜 체크*/
	 $(".datepicker1").datepicker({ onSelect: function(dateText){ 	 	 
			 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			 if($("#P_INV_SDT").val()  >  $("#P_INV_EDT").val()){   
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_INV_SDT").val(CUR_DT);
				return;
			}	 
	 	}, 	
	 	showMonthAfterYear:true 
	});
		 
	$(".datepicker2").datepicker({ onSelect: function(dateText){
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if($("#P_INV_SDT").val()  >  $("#P_INV_EDT").val()){
				//날자 검색조건의 시작일이 종료일보다 클 수 없습니다.
				alert(msgDateValidation);
				$("#P_INV_EDT").val(CUR_DT);
				return;
			}	 
	 	}, 	
	 	showMonthAfterYear:true 
	});
	
	$(".datepicker").datepicker();
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().before(0, 0,1).getDate("yyyymmdd"); // 일주일전 before(년,월,일)

	$("#P_INV_SDT").val(lsToDate);
	$("#P_INV_EDT").val(lsToDate);
	

	//실사재고등록 팝업
	$("#pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	//점포명 가지고오기
	getStoreCode("P_STR_NAME");
	getStoreCode("P_POP_STR_NAME");
	
	//확정구분
	$("#iframeCnt select[name=P_CFM_FLAG]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=P_CFM_FLAG]", "CFM_FLAG");
	
	//조정사유
	$("#iframeCnt select[name=P_INV_GB]").append('<option value="">'+ all +'</option>');
	getCommonCodeSelectBoxList("iframeCnt select[name=P_INV_GB]", "INV_GB");
	$("#pop_wrap1 select[name=P_POP_INV_GB]").append('<option value="">'+ select +'</option>');
	getCommonCodeSelectBoxList("pop_wrap1 select[name=P_POP_INV_GB]", "INV_GB");
	
	
	//숫자만 입력
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
	$('#P_POP_APP_QTY').number( true);
	
	
	// 재고조정 팝업의 조회조건절의 상품에서 엔터시 상품검색되게....
	$("input[name=P_POP_ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_product_search_pop();
        } 
	});
	
	// 조회조건절의 상품에서 엔터시 상품검색되게....
	$("input[name=S_ITM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_product_search();
        } 
	});
	
	
});

function clearItmCode()
{ 	
	if(  $('#S_ITM_NAME').val()  == "" )
	{
		 $('#S_ITM_CODE').val("");
		 $('#S_SCAN_CODE').val("");
	}
}

//점포명 변경 EVENT
function fnStrChange(){
	
	//그리드1,2 데이터 초기화 (엑셀등록 또는 행추가 등록은 점포명, 재고조사일정id가 key이기 때문임)
	 gridRoot1.removeAll( );
	
	$("#P_STR_CODE").val($("#P_STR_NAME").val());
	
	
}


function init() {
	
}

//(상품검색) 팝업 호출 function
function btn_comm_product_search_pop(){
	$('#comm_pop_wrap6' ).dialog( 'open' );
	$("#P_TEXT6").val("");
	gridApp15.setData([]);
	gridApp15.resize();
	fnGetStrName();
	if($("#P_POP_ITM_NAME").val() != null && $("#P_POP_ITM_NAME").val() != ""){
		$("#P_TEXT6").val($("#P_POP_ITM_NAME").val());
		btn_comm_search('6');
	}
	
} 
//(점별상품검색) 팝업 callback function
function fn_comm_store_callback( dataRow ){
	
	$('#P_POP_ITM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
	$('#P_POP_ITM_CODE' ).val(dataRow.ITM_CODE);				// 상품코드
	$('#P_POP_SCAN_CODE' ).val(dataRow.SCAN_CODE);			// 스캔코드
	
	if(dataRow.ITM_CODE != ""){
		
		var postValue ={};	
		postValue = { 
				 "P_STR_CODE"			: $("#P_POP_STR_CODE").val(),
				 "P_POP_ITM_CODE"	    : $("#P_POP_ITM_CODE").val(),
				 "P_POP_INV_DT"			: $("#P_POP_INV_DT").val().replace(/-/gi, '')
		};
		
		//재고조정 등록여부 체크(같은날 , 같은 점포코드에 상품은 등록될 수 없다.
		jQuery.ajax({
		    type:"POST",
		    url:"/getProductInsertCheck.do",
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
	    		if(data[0].TOTAL_CNT == 1){
	    			//이미 등록된 상품이 존재합니다.
	    			alert(duplicateProduct);
	    			clearePop();
	    			return;
	    		}else{
	    			//상품 일 수불 정보 검색
	    	    	jQuery.ajax({
	    			    type:"POST",
	    			    url:"/getProductCollDtlInfo.do",
	    			    dataType:"JSON",  
	    			    data:postValue,
	    			    async:false,
	    			    success : function(data) {
	    			    	if(data.length == 1){
	    			    		$("#POP_ITM_NAME").val(data[0].ITM_NAME);
	    			    		$("#POP_SCAN_CODE").val(data[0].SCAN_CODE);
	    				    	$("#POP_UNIT").val(data[0].UNIT);
	    				    	
	    				    	//3자리마다 콤마
	    				    	$("#POP_INV_QTY").val(data[0].INV_END_QTY.format());
	    				    	$("#POP_SPRC").val(data[0].SPRC.format());
	    				    	$("#POP_SPRC_AMT").val(data[0].POP_SPRC_AMT.format());
	    				    	
	    				    	//정보를 불러왔을경우 수량입력을 위한 포커스 처리
	    				    	$('#P_POP_INV_GB').focus();
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

 
//########################################################
//###   상단 버튼 구현																				###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height( $(window).height() - 103 );
	//재고조정 등록
	$(".ui-dialog-titlebar").text(inventoryAdjustmentRegistration);
	$(".tab_btn").on("click focus",function (){
		var btnNum = $(this).parent().index();
		
		$(".tab_area1 > div").eq(btnNum).show().siblings().hide();
		
		//if ( btnNum==0 ) $(".tab_area2 select:last").hide().prev().last().hide();
		//else  $(".tab_area2 select:last").show().prev().last().show();
	});
	$(window).on('resize',function (){	
		$("#gridHolder1").height( $(window).height() - 103 );
	});
});



//행추가 팝업 오픈
function btn_popup() {
	//오늘날짜
	var lsToDate = new CommDateManager().getDate("yyyy-mm-dd");
	
	//신규등록 변수
	saveFlag = "I";
	
	$("#P_POP_INV_DT").val(lsToDate);
	$("#P_POP_STR_NAME").val($("#P_STR_NAME").val());
	$("#P_POP_STR_CODE").val($("#P_STR_CODE").val());
	$("#P_POP_STR_NAME").attr("disabled", 'disabled');
	
	//팝업데이터 클리어
	clearePop();
	
	$("#popSave").show();
	$("#popItmIcon").show();
	$("#P_POP_ITM_NAME").removeAttr('disabled'); 
	$('#pop_wrap1').dialog( 'open' );	
	$('#P_POP_ITM_NAME').focus();	
}


//삭제
function btn_delete(){
	
	var grid1Index = dataGrid1.getSelectedIndex();

	if(grid1Index == -1){
		//삭제할 재고목록을 선택해 해주세요.
		alert(stockRealMent21);
		return;
	}
	
	if(dataRow1.CFM_FLAG_CODE == '2'){
		//확정된 재고조정 정보는 삭제 할수 없습니다.
		alert(stockChangeMent3);
		return;
	}
	
	//삭제 하시겠습니까?
	if(confirm(msgDeleteConfirm) == false) return;
	
	//재고조정목록 삭제
	jQuery.ajax({
	    type:"POST",
	    url: "/deleteProductChangeInfo.do",
	    dataType:"JSON",  
	    data:dataRow1,
	    async:false,
	    success : function(data) {
	    	if(  data[0].RETURN_CODE  == "0000")
			{   
				//삭제되었습니다.
				alert(msgDelete);
				//조회
				btn_search();
				//팝업닫기
				pop1_close();
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

//확정
function btn_submit(){
	
	var grid1Index = dataGrid1.getSelectedIndex();

	if(grid1Index == -1){
		//확정할 재고목록을 선택해 주세요.
		alert("확정할 재고목록을 선택해 주세요.");
		return;
	}
	
	if(dataRow1.CFM_FLAG_CODE == '2'){
		//이미 확정된 재고조정 정보입니다.
		alert("이미 확정된 재고조정 정보입니다.");
		return;
	}
	
	//선택하신 재고조정항목을 확정 하시겠습니까?
	if(confirm("선택하신 재고조정항목을 확정 하시겠습니까?") == false) return;
	
	//재고조정 확정
	jQuery.ajax({
	    type:"POST",
	    url: "/submitProductChangeInfo.do",
	    dataType:"JSON",  
	    data:dataRow1,
	    async:false,
	    success : function(data) {
	    	if(  data[0].RETURN_CODE  == "0000")
			{   
				//확정되었습니다.
				alert(dcsnSave);
				//조회
				btn_search();
				//팝업닫기
				pop1_close();
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

//조회
function btn_search(){
	
	//재고조정등록 
	var loadData 		= $("#top_search").serializeAllObject();
	loadData.P_INV_SDT 	= loadData.P_INV_SDT.replace(/-/gi, '');
	loadData.P_INV_EDT 	= loadData.P_INV_EDT.replace(/-/gi, '');
	
	if(loadData.P_INV_SDT  >  loadData.P_INV_EDT){
		alert(msgDateValidation);
		$("#P_INV_SDT").focus();
		return;
	}
	
	//재고조정목록조회
	jQuery.ajax({
	    type:"POST",
	    url:"/selectProductChangeInfo.do",
	    dataType:"JSON",  
	    data:loadData,
	    async:false,
		beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    }, 
	    success : function(data) {
	    	
	    	gridApp1.setData(data);
	    },
	    complete : function(data) {
	    	gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


//팝업 데이터 초기화
function clearePop(){
	$('#P_POP_SCAN_CODE').val("");
	$('#P_POP_ITM_CODE').val("");
	$('#P_POP_ITM_NAME').val("");
	$('#P_POP_INV_GB').val("");
	$('#P_POP_APP_QTY').val("");
	$('#P_POP_REMARK').val("");
	
	$('#POP_ITM_NAME').val("");
	$('#POP_SCAN_CODE').val("");
	$('#POP_UNIT').val("");
	$('#POP_INV_QTY').val("");
	$('#POP_SPRC').val("");
	$('#POP_SPRC_AMT').val("");
}


//그리드 로딩바  보이기
function showLoadingBar() {
    gridRoot1.addLoadingBar();
}
 
//그리드 로딩바  숨기기
function hideLoadingBar() {
    gridRoot1.removeLoadingBar();
}



//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

//실사재고등록 팝업 닫기
function pop1_close() {
	$("#pop_wrap1").dialog("close");
}	

function excelDownload() {
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
		return;
	}
	
	dataGrid1.exportFileName = "재고조정등록"+$("#P_STR_NAME option:selected").text()+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
	
};


//팝업 -> 실사재고등록 그리드1에 row추가 
function pop1_save() {
	
	if($("#P_POP_ITM_CODE").val()==""){
		//상품을 조회하세요.
		alert("상품을 조회하세요.");
		$('#P_POP_ITM_NAME').focus();
		return;
	}
	if($("#POP_ITM_NAME").val()==""){
		// 조회된 상품이 없습니다.
		alert(stockChangeMent4);
		$('#P_POP_ITM_NAME').focus();
		return;
	}
	if($("#P_POP_INV_GB").val()==""){
		//조정사유를 선택하세요.
		alert(stockChangeMent5);
		$('#P_POP_INV_GB').focus();
		return;
	}
	if($("#P_POP_APP_QTY").val()=="" || $("#P_POP_APP_QTY").val()== 0 ){
		//조정수량을 입력하세요.
		alert(stockChangeMent6);
		$('#P_POP_APP_QTY').val("");
		$('#P_POP_APP_QTY').focus();
		return;
	}
	
	if(isNaN(Number($("#P_POP_APP_QTY").val()))){
		//값은 숫자만 가능합니다.
		alert(mentWmsIn2);
		$('#P_POP_APP_QTY').focus();
		return;
	}
	
	/*if(parseInt($("#POP_INV_QTY").val().replace(/,/gi, '')) < parseInt($("#P_POP_APP_QTY").val().replace(/,/gi, '')) ){
		//재고수량보다 조정수량이 클 수 없습니다.
		alert(stockChangeMent7);
		$('#P_POP_APP_QTY').focus();
		return;
	}*/
	
	//재고조정등록 
	var loadData = $("#pop_wrap1").serializeAllObject();
	loadData.P_POP_INV_DT = loadData.P_POP_INV_DT.replace(/-/gi, '');
	
	//alert(saveFlag);
	//신규,수정 완료 메세지 코멘트
	var cuMent = "";
	//신규,수정 질문 코멘트
	var msgConfirm ="";
	//신규, 수정 url호출
	var callUrl = "";
	
	if(saveFlag == "I"){
		//신규
		msgConfirm = msgSaveConfirm; //저장 하시겠습니까?
		cuMent = msgSave; //저장되었습니다.
		callUrl = '/insertProductChangeInfo.do';
	}else if(saveFlag == "U"){
		//수정
		msgConfirm = msgModifyConfirm; //수정 하시겠습니까?
		cuMent = msgModify; //수정되었습니다.
		callUrl = '/updateProductChangeInfo.do';
	}else{
		//요청중 문제가 발생했습니다.관리자에게 문의하세요.
		alert(msgErrorDefault);
		return;
	}
	
	//저장하시겠습니까? 수정하시겠습니까?
	if(confirm(msgConfirm) == false) return;
	
	//상품 일 수불 정보 검색
	jQuery.ajax({
	    type:"POST",
	    url: callUrl,
	    dataType:"JSON",  
	    data:loadData,
	    async:false,
	    success : function(data) {
	    	if(  data[0].RETURN_CODE  == "0000")
			{   
				
				alert(cuMent);
				//조회
				btn_search();
				//팝업닫기
				pop1_close();
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


//숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function(){
    if(this==0) return 0;
 
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
 
    return n;
};
 
// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0";
 
    return num.format();
};








//(상품검색) 팝업 호출 function
function btn_comm_product_search(){
	$('#comm_pop_wrap2' ).dialog( 'open' );
	gridApp11.resize();
	
	$("#P_CALLBACK_NM1").val('fn_comm_product_callback(dataRow11)');
	if($("#S_ITM_NAME").val() != null && $("#S_ITM_NAME").val() != ""){
		$("#P_TEXT2").val($("#S_ITM_NAME").val());
		btn_comm_search('2');
	}
	  
} 
//(상품검색) 팝업 callback function
function fn_comm_product_callback( dataRow ){
	$('#S_ITM_CODE' ).val(dataRow.ITM_CODE);	// 상품코드
	$('#S_ITM_NAME' ).val(dataRow.ITM_NAME);	// 상품명 
	$('#S_SCAN_CODE' ).val(dataRow.SCAN_CODE);	//  
}
