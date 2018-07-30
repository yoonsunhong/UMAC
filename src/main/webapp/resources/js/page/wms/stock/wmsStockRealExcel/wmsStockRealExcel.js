/********************************************************
*   설명:  실사재고엑셀조정
*		
*	수정일      	   수정자        수정내용
*	------------------------------------------------------
*	2017-05-03    문희훈       초기작성 
*	------------------------------------------------------
*	version : 1.0
 ********************************************************/


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
	
	//데이터 조회 및 엑셀 업로드 후 데이터 유효성 검사 실시
	checkData();
	
	//drawGridPagingNavigation(totalCnt, RowsPerPage, pageIndex, "gridMovePage");
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
				<DataGridColumn id="STR_CODE" dataField="STR_CODE" headerText="'+storCode+'" textAlign="center" width="100"   visible="false"/>\
				<DataGridColumn id="STR_NAME" dataField="STR_NAME" headerText="'+storNm+'" textAlign="center" width="100"  />\
				<DataGridColumn id="ZONE_NAME" dataField="ZONE_NAME" headerText="ZONE" textAlign="center" width="60"   />\
				<DataGridColumn id="ZONE_CODE" dataField="ZONE_CODE" headerText="ZONE" textAlign="center" width="60"   visible="false"/>\
				<DataGridColumn id="RACK_NAME" dataField="RACK_NAME" headerText="RACK" textAlign="center" width="60"  />\
				<DataGridColumn id="RACK_CODE" dataField="RACK_CODE" headerText="RACK" textAlign="center" width="60"   visible="false"/>\
				<DataGridColumn id="LINE_NAME" dataField="LINE_NAME" headerText="LINE" textAlign="center" width="70"  />\
				<DataGridColumn id="LINE_CODE" dataField="LINE_CODE" headerText="LINE" textAlign="center" width="70"   visible="false"/>\
				<DataGridColumn id="INV_DT" dataField="INV_DT" headerText="'+inventoryDate+'" textAlign="center" width="100"  visible="false"/>\
				<DataGridColumn id="INV_INSP_SCHD_ID" dataField="INV_INSP_SCHD_ID" headerText="'+dueDiligenceInventoryId+'" textAlign="center" visible="false"  />\
				<DataGridColumn id="MKT_GB_CODE" dataField="MKT_GB_CODE" headerText="'+storeTypeCode+'" textAlign="center" width="100"  visible="false" />\
				<DataGridColumn id="MKT_GB" dataField="MKT_GB" headerText="'+storeType+'" textAlign="center" width="100"  />\
				<DataGridColumn id="VEN_CODE" dataField="VEN_CODE" headerText="'+venCode+'" textAlign="center" width="100"  visible="false" />\
				<DataGridColumn id="VEN_NAME" dataField="VEN_NAME"  headerText="'+venName+'" textAlign="left" width="150" />\
				<DataGridColumn id="SCAN_CODE" dataField="SCAN_CODE" headerText="'+scanningCode+'" textAlign="center" width="140"  />\
				<DataGridColumn id="ITM_CODE" dataField="ITM_CODE"  headerText="'+itmCode+'" textAlign="center" width="150" visible="false" />\
				<DataGridColumn id="ITM_NAME" dataField="ITM_NAME"  headerText="'+itmName+'" textAlign="left" width="150" />\
				<DataGridColumn id="CLS_NAME" dataField="CLS_NAME"  headerText="'+goodsCl+'" textAlign="center" width="100" />\
				<DataGridColumn id="INV_END_QTY" dataField="INV_END_QTY"  headerText="'+accountingBookQuantity+'" textAlign="right" formatter="{numfmt}"   width="100" />\
				<DataGridColumn id="DEC_QTY" dataField="DEC_QTY"  headerText="'+actualQuantity+'"   textAlign="right" formatter="{numfmt}"   width="100" />\
				<DataGridColumn id="LOSS_QTY" dataField="LOSS_QTY"  headerText="'+quantityDifference+'"   textAlign="right" formatter="{numfmt}"  width="100" />\
				<DataGridColumn id="BEFORE_LOSS_QTY" dataField="BEFORE_LOSS_QTY"  headerText="'+beforeQuantityDifference+'"   textAlign="right" formatter="{numfmt}"  width="100" />\
				<DataGridColumn id="WAMT" dataField="WAMT"  headerText="'+supplyUnitPrice+'" textAlign="right" formatter="{numfmt}"  width="100" />\
				<DataGridColumn id="SPRC" dataField="SPRC"  headerText="'+productSprc+'" textAlign="right" formatter="{numfmt}"  width="100" />\
				<DataGridColumn id="LOSS_WAMT" dataField="LOSS_WAMT"  headerText="'+differenceCost+'" textAlign="right" formatter="{numfmt}"  width="100" />\
				<DataGridColumn id="LOSS_SPRC" dataField="LOSS_SPRC"  headerText="'+differenceSellingPrice+'" textAlign="right" formatter="{numfmt}"  width="100" />\
				<DataGridColumn id="VALID_YN" dataField="VALID_YN"  headerText="체크플래그"  visible="false"/>\
			</groupedColumns>\
			<dataProvider>\
				<!-- 그리드의 자료를 일반 dataProvider가 아닌 별도의 컴포넌트에 입력해야 할 경우 아래와 같이 source에 $gridData를 넣어줍니다 -->\
				<SpanArrayCollection source="{$gridData}"/>\
			</dataProvider>\
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
	
	var loadData= {};
	// 점포코드 가져오기
	$("#iframeCnt select[name=P_STR_NAME]").append('<option value="">'+ select +'</option>');
	
	jQuery.ajax({
	    type:"POST",
	    url:"/getWmsStockOrganizationList.do", 	//WmsStockScheduleController.java 호출
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:loadData,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#P_STR_NAME").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});

	//검색조건 Location 셀렉트 박스 셋팅
	$("#iframeCnt select[name=P_ZONE_CODE]").append('<option value="">'+ all +'</option>');
	$("#iframeCnt select[name=P_RACK_CODE]").append('<option value="">'+ all +'</option>');
	$("#iframeCnt select[name=P_LINE_CODE]").append('<option value="">'+ all +'</option>');
	
	
	// 대 중 소 분류 바인딩  : 첫번째인자=html오브젝트     두번째인자=대(1)중(2)소(3) 구분      세번째인자=분류 구분 코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. 
	$("#iframeCnt select[name=P_LRG_CODE]").append('<option value="">'+ all +'</option>'); 
	getCateCodeSelectBoxList("P_LRG_CODE"   , "1" ,  ""   );    // 대 분류     
	/********************************************************
	 * 조사범위 SELECT BOX 리스트를 생성한다. 대중소리스트 박스 사용가능
	 * SELECTBOX_ID		:  html오브젝트ID        
	 * CATE_GUBUN	    :  대(1)중(2)소(3) 구분
	 * CATE_CODE        :  분류코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. ex) 010101
	 ******************************************************/

	
	$("#excelFile").on('change', function(){
		
		//엑셀파일이 업로드 되었을때 실행
	    if($("#excelFile").val() != ""){
	    	//엑셀 폼 서브밋
	    	checkFile();
	    }
	    
	});
	
	// 팝업의 조회조건절의 협력업체에서 엔터시 검색되게....
	$("input[name=P_VEN_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_supply_search();
        } 
	});
	// 팝업의 조회조건절의 상품에서 엔터시 상품검색되게....
	$("input[name=P_ITEM_NAME]").keydown(function (key) { 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	btn_comm_product_search();
        } 
	});
	
	
	//숫자만 입력
	CommonJs.addInputHandler({input:$("#P_DIFF_CNT"), dataType:"N", maxlength:10});
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
	$('#P_DIFF_CNT').number( true);
});



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
	
	if($("#P_ITEM_NAME").val() != null && $("#P_ITEM_NAME").val() != ""){
		$("#P_TEXT2").val($("#P_ITEM_NAME").val());
		btn_comm_search('2');
	}
}


//(협력업체검색) 팝업 callback function
function fn_comm_supply_callback(dataRow){
	$('#P_VEN_NAME' ).val(dataRow.VEN_NAME);		// 협력업체명
	$('#P_VEN_CODE' ).val(dataRow.VEN_CODE);		// 협력업체코드
}

//(상품검색) 팝업 callback function
function fn_comm_product_callback(dataRow){
	$('#P_ITEM_NAME' ).val(dataRow.ITM_NAME);				// 상품명
}


//점포명 변경 EVENT
function fnStrChange(){
	
	//그리드1 데이터 초기화 
	 gridRoot1.removeAll( );
	
	 $("#P_STR_CODE").val($("#P_STR_NAME").val());
	 
	 if($("#P_STR_NAME").val() == ""){
		  $("#P_INV_DT").find("option").remove();
		  $("#iframeCnt select[name=P_INV_DT]").append('<option value="">'+ select +'</option>');
		  $("#P_INV_BEFORE_DT").val("");
		  $("#P_INV_BEFORE_ID").val("");
	 }else{
		 
		var postValue ={};	
		postValue = { 
				  "STR_CODE"	: $("#P_STR_CODE").val() 
		};
			
		jQuery.ajax({
		    type:"POST",
		    url:"/getWmsInvInspDtList.do",
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	
		    	$("#P_INV_DT").find("option").remove();
				//$("#iframeCnt select[name=P_INV_DT]").append('<option value="">'+ select +'</option>');
		    	
				for(var i = 0; i < data.length; i++){
					 $("#P_INV_DT").append('<option value="'+ data[i].INV_INSP_SCHD_ID +'">'+ data[i].INV_DT+'</option>'); 
			   	}
				
				//전 재고조사일 조회
				fnInvDtChange();
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
		 
		 postValue.STR_CODE = $("#P_STR_NAME").val();
			 
		 jQuery.ajax({
		    type:"POST",
		    url:"/selectWmsInZone.do", 
		    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		    data:postValue,
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


//재고조사일정 ID 변경 EVENT
function fnInvDtChange(){
	//그리드1  데이터 초기화 
	 gridRoot1.removeAll( );
	 
	 $("#P_INV_BEFORE_DT").val("");
	//조사일정 아이디 NULL일시 조사일자 초기화 
	 if($("#P_INV_DT").val() == ""){
		  $("#P_INV_BEFORE_DT").val("");
		  $("#P_INV_BEFORE_ID").val("");
	 }else{
		 
		var postValue ={};	
		postValue = { 
				  "P_INV_DT"		: 	$("#P_INV_DT").val()
				 ,"P_STR_CODE"	: 	$("#P_STR_CODE").val()
		};
			
		jQuery.ajax({
		    type:"POST",
		    url:"/getWmsInvBeforeDt.do",
		    dataType:"JSON",  
		    data:postValue,
		    async:false,
		    success : function(data) {
		    	if(data.length == 0){
		    		$("#P_INV_BEFORE_DT").val('');
		    		$("#P_INV_BEFORE_ID").val("");
		    	}else{
		    		$("#P_INV_BEFORE_DT").val(data[0].INV_BEFORE_DT);
		    		$("#P_INV_BEFORE_ID").val(data[0].INV_INSP_SCHD_ID);
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

function init() {

	
	
}

  

//########################################################
//###   상단 버튼 구현																				###
//########################################################
/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1").height( $(window).height() - 153);

	$(window).on('resize',function (){	
		$("#gridHolder1").height( $(window).height() - 153 );
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
	
	if($("#P_INV_DT").val()=="" || $("#P_INV_DT").val() == null){
		//재고실사일이 존재하지 않습니다.
		alert(stockExcelMent3);
		$('#P_INV_DT').focus();
		return;
	}
	
	var loadData = $("#top_search").serializeAllObject();
	
	loadData.P_INV_INSP_SCHD_ID = loadData.P_INV_DT.replace(/-/gi, ''); 
	
	
	//실사재고 조회
	jQuery.ajax({ 
	    url:"/getWmsStockRealExcelList.do",         
	    type:"POST",
		datatype:"xml",
		//async:false,
		data: loadData, 
		beforeSend : function(){ 
			//로딩바 show
			showLoadingBar();
	    }, 
		success:function(data){  
			
			//그리드 JSON으로 변경
			gridApp1.setDataType("json");
			gridApp1.setLayout(layoutStr1);
			
			//그리드1 초기화
			gridRoot1.removeAll();
			
			gridApp1.setData(data);
			
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




//엑셀 업로드
function excelUpload(){
	
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
		return;
	}
	
	
	var dataCnt = gridRoot1.getCollection().getSource().length;
	
	if(dataCnt == 0){
		//데이터 조회를 해주세요.
		alert(stockRealMent23);
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
	//P_INV_INSP_SCHD_ID 파라미터 셋팅
	$("#PARAM2").val($("#P_INV_DT").val().replace(/-/gi, ''));
	$("#PARAM3").val($("#P_INV_BEFORE_ID").val());
	
	//업로드 하시겠습니까?
	if (confirm(stockRealMent11)) {
		
		//엑셀 업로드 체크 플러그 N 처리
		$("#VALID_YN").val("N");
		
		//그리드1 로딩바 호출
		showLoadingBar();
        var options = {
            success : function(data) {
            	
            	//그리드 XML로 변경
            	gridApp1.setDataType("xml");
                gridApp1.setLayout(layoutStr1);
            	
            	$("#VALID_YN").val(data.VALID_YN);
            	//alert(data.VALID_YN);
                //그리드 로딩바 숨기기
                hideLoadingBar();
                
                //xml포맷 데이터 변경으로 인한 주석
                //gridApp1.setData(data.list);
                
                //업로드 완료후 그리드1,2 모두 초기화
                gridRoot1.removeAll( );
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
    				var STR_CODE 				= xmlDoc.createElement('STR_CODE');
    				var STR_NAME 				= xmlDoc.createElement('STR_NAME');
    				var INV_DT 					= xmlDoc.createElement('INV_DT');
    				var INV_INSP_SCHD_ID		= xmlDoc.createElement('INV_INSP_SCHD_ID');
    				var ZONE_CODE 				= xmlDoc.createElement('ZONE_CODE');
    				var ZONE_NAME 				= xmlDoc.createElement('ZONE_NAME');
    				var RACK_CODE 				= xmlDoc.createElement('RACK_CODE');
    				var RACK_NAME 				= xmlDoc.createElement('RACK_NAME');
    				var LINE_CODE 				= xmlDoc.createElement('LINE_CODE');
    				var LINE_NAME 				= xmlDoc.createElement('LINE_NAME');
    				var MKT_GB_CODE 			= xmlDoc.createElement('MKT_GB_CODE'); 
    				var MKT_GB 					= xmlDoc.createElement('MKT_GB'); 
    				var VEN_CODE					= xmlDoc.createElement('VEN_CODE'); 
    				var VEN_NAME 				= xmlDoc.createElement('VEN_NAME');
    				var SCAN_CODE 				= xmlDoc.createElement('SCAN_CODE'); 
    				var ITM_CODE 				= xmlDoc.createElement('ITM_CODE'); 
    				var ITM_NAME 				= xmlDoc.createElement('ITM_NAME'); 
    				var CLS_NAME 				= xmlDoc.createElement('CLS_NAME'); 
    				var PUR_SALE_QTY 			= xmlDoc.createElement('PUR_SALE_QTY');
    				var INV_END_QTY 			= xmlDoc.createElement('INV_END_QTY');  
    				var DEC_QTY 					= xmlDoc.createElement('DEC_QTY');
    				var LOSS_QTY 				= xmlDoc.createElement('LOSS_QTY');
    				var BEFORE_LOSS_QTY 	= xmlDoc.createElement('BEFORE_LOSS_QTY');
    				var WAMT 						= xmlDoc.createElement('WAMT');
    				var SPRC 						= xmlDoc.createElement('SPRC');
    				var LOSS_WAMT 				= xmlDoc.createElement('LOSS_WAMT');
    				var LOSS_SPRC 				= xmlDoc.createElement('LOSS_SPRC');
    				var VALID_YN 					= xmlDoc.createElement('VALID_YN');
    				 
    				STR_CODE.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].STR_CODE				));
    				STR_NAME.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].STR_NAME				));
    				INV_DT.appendChild(  					xmlDoc.createTextNode( 	data.CUR[i].INV_DT					));
    				INV_INSP_SCHD_ID.appendChild(    	xmlDoc.createTextNode( 	data.CUR[i].INV_INSP_SCHD_ID  	));
    				ZONE_CODE.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].ZONE_CODE  			));
    				ZONE_NAME.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].ZONE_NAME  			));
    				RACK_CODE.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].RACK_CODE  			));
    				RACK_NAME.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].RACK_NAME  			));
    				LINE_CODE.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].LINE_CODE  			));
    				LINE_NAME.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].LINE_NAME  			));
    				MKT_GB_CODE.appendChild(  			xmlDoc.createTextNode(	data.CUR[i].MKT_GB_CODE			));
    				MKT_GB.appendChild(  					xmlDoc.createTextNode(	data.CUR[i].MKT_GB 					));
    				VEN_CODE.appendChild( 				xmlDoc.createTextNode(	data.CUR[i].VEN_CODE 				));
    				VEN_NAME.appendChild( 				xmlDoc.createTextNode(	data.CUR[i].VEN_NAME 				));
    				SCAN_CODE.appendChild(  			xmlDoc.createTextNode( 	data.CUR[i].SCAN_CODE			));
    				ITM_CODE.appendChild( 				xmlDoc.createTextNode(	data.CUR[i].ITM_CODE 				));
    				ITM_NAME.appendChild( 				xmlDoc.createTextNode(	data.CUR[i].ITM_NAME 				));
    				CLS_NAME.appendChild(  				xmlDoc.createTextNode( 	data.CUR[i].CLS_NAME  			));
    				PUR_SALE_QTY.appendChild( 			xmlDoc.createTextNode(	data.CUR[i].PUR_SALE_QTY		));
    				INV_END_QTY.appendChild(			xmlDoc.createTextNode(	data.CUR[i].INV_END_QTY			));
    				DEC_QTY.appendChild( 					xmlDoc.createTextNode(	data.CUR[i].DEC_QTY   				)); 
    				LOSS_QTY.appendChild(				xmlDoc.createTextNode(	data.CUR[i].LOSS_QTY	    		));
    				BEFORE_LOSS_QTY.appendChild(		xmlDoc.createTextNode(	data.CUR[i].BEFORE_LOSS_QTY	));
    				WAMT.appendChild(						xmlDoc.createTextNode(	data.CUR[i].WAMT					));
    				SPRC.appendChild(						xmlDoc.createTextNode(	data.CUR[i].SPRC						));
    				LOSS_WAMT.appendChild(				xmlDoc.createTextNode(	data.CUR[i].LOSS_WAMT 			));
    				LOSS_SPRC.appendChild(				xmlDoc.createTextNode(	data.CUR[i].LOSS_SPRC 			));
    				VALID_YN.appendChild(					xmlDoc.createTextNode(	data.CUR[i].VALID_YN				));
    				  
    				
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_CODE);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(STR_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_DT);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_INSP_SCHD_ID);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ZONE_NAME);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(RACK_NAME);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LINE_NAME);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(MKT_GB);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VEN_NAME);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SCAN_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_CODE);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(ITM_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(CLS_NAME);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(PUR_SALE_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(INV_END_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(DEC_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_QTY);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(BEFORE_LOSS_QTY);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(WAMT);
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(SPRC);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_WAMT);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(LOSS_SPRC);   
    				xmlDoc.getElementsByTagName("GRIDROW")[0].appendChild(VALID_YN);   
    				
    				//xml데이터 형변환 후 row add
    				gridRoot1.addItemAt(  xmlDoc  , -1 , false);
    			}
    			
                
                if(data.VALID_YN == "Y"){
                	//모든 데이터가 업로드 되었습니다. \n내용 확인 후 저장하여 서버에 등록하세요.
                	alert(stockRealMent12+"\n"+stockRealMent13);
                }else{
                	//엑셀 업로드 데이터 형식이 잘못 되었습니다.\n데이터를 올바르게 수정 한 뒤 엑셀업로드를 하세요.
                	alert(stockExcelMent4+'\n'+stockExcelMent5);
                }
                
            },
            error : function(xhr, status, error){
            	CommonJs.alertErrorStatus(xhr.status, error);
            	hideLoadingBar();
            },
            datatype:"json",
            type : "POST"
        };
        $("#frmUpload").attr("action", "/wmsStockExcelUpload.do");
        $("#frmUpload").ajaxSubmit(options);

    }
	//$("#frmUpload").attr("action", "/stockGridExcelUpload.do");
	//$("#frmUpload").submit();
	//checkData();
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
}
 
//그리드 로딩바  숨기기
function hideLoadingBar() {
    gridRoot1.removeLoadingBar();
}


//탭1 저장
function tab1_saveCheck(){
	
	if($("#P_STR_CODE").val()==""){
		//점포를 선택하세요.
		alert(stockRealMent5);
		$('#P_STR_NAME').focus();
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
		//엑셀 업로드 데이터 형식이 잘못 되었습니다.\n데이터를 올바르게 수정 한 뒤 엑셀업로드를 하세요.
		alert(stockExcelMent4+'\n'+stockExcelMent5);
		return;
	}
	
	//엑셀 업로드 유무 체크
	if(gridRoot1.dataType == 'json'){
		//업로드된 엑셀데이터가 없습니다.
		alert(stockExcelMent6);
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
	    url:"/saveWmsStockExcelData.do",         
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
	
	//엑셀다운 필드 지정
	dataGrid1.exportColumns = [1,2,4,6,8,9,10,11,16,17,21];
	
	dataGrid1.exportFileName = "WMS실사재고엑셀등록_"+$("#P_STR_NAME option:selected").text()+"_"+$("#P_INV_DT option:selected").text()+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
	
};



/********************************************************
 * 분류공통코드의 SELECT BOX 리스트를 생성한다. 대중소리스트 박스 사용가능
 * SELECTBOX_ID		:  html오브젝트ID        
 * CATE_GUBUN	    :  대(1)중(2)소(3) 구분
 * CATE_CODE        :  분류코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. ex) 010101
 ******************************************************/
function getCateCodeSelectBoxList(SELECTBOX_ID , CATE_GUBUN, CATE_CODE ){
	var postValue ={};	
	postValue = { 
			  "CATE_GUBUN"	: CATE_GUBUN 
			, "CATE_CODE"	: CATE_CODE  
	};
	 
	jQuery.ajax({
	    type:"POST",
	    url:"/getCateCodeSelectBoxList.do",
	    dataType:"JSON",  
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	$("select[name="+SELECTBOX_ID+"   ] option").remove();
	    	$("#"+SELECTBOX_ID).append('<option value="">'+all+'</option>'); 
			for(var i = 0; i < data.length; i++){
				 $("#"+SELECTBOX_ID).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

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


//XML 형태로 데이터 넣기
function changeXMLData() {
    gridApp1.setDataType("xml");
    gridApp1.setLayout(layoutStr1);
    gridApp1.setData(gridData1);
}

//JSON 형태로 데이터 넣기
function changeJSONData() {
	gridApp1.setDataType("json");
	gridApp1.setLayout(layoutStr1);
	gridApp1.setData(gridData1);
}
