/********************************************************
 * 설명:  공통코드관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 문희훈
 * since	: 2016.10.31
 * version : 1.0
 ********************************************************/
	
var crudBit          =   "C";   // 최초 신규로 시작함
var crudBitDetail    =   "C";   // 최초 신규로 시작함

$(document).ready(function(){
	
	init();

	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");


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

		gridApp1.setLayout(layoutStr);
		gridApp1.setData(gridData);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow1 = gridRoot1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData1 = dataRow1[dataField];
			
			//alert(clickData1.CD_ID);
			
			$('#CD_NM').val(dataRow1.CD_NM); 
			$('#CD_ID').val(dataRow1.CD_ID); 
	    	$('#CD_DESCRIPTION').val(dataRow1.CD_DESCRIPTION);  
	    	
	    	if(dataRow1.DEL_YN == "N"){
	    		$("input:radio[name='DEL_YN']:radio[value='N']").attr("checked",true);
	    	}else if(dataRow1.DEL_YN == "Y"){
	    		$("input:radio[name='DEL_YN']:radio[value='Y']").attr("checked",true);
	    	}
	    	 
	    	
	    	crudBit = "U";   // 수정
			
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler1 = function(event) {
			dataGrid1 = gridRoot1.getDataGrid();	// 그리드 객체
			
			//그리드1 셀선택 이벤트
			dataGrid1.addEventListener("itemClick", itemClickHandler);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		
		
	}  
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp1, gridRoot1, dataGrid1,dataRow1,clickData1,selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2,clickData2,selectorColumn2;

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 설정
var layoutStr =
'<rMateGrid>\
	<DataGrid id="dg1" headerColors="[#f2f2f2]" borderColor="#ddd" rollOverColor="#ddffdc" selectionColor="#ffe6cd" color="#4c4f53" headerHeight="25" rowHeight="25" headerPaddingTop="5" headerPaddingBottom="5" paddingTop="3" paddingBottom="3" headerBorderTopColor="#2c2c2c" headerBorderTopWidth="2" textSelectedColor = "#4c4f53" fontFamily= "돋움">\
		<columns>\
	<DataGridColumn id="col1" dataField="GroupLabel" headerText="Group Label" width="110"/>\
			<DataGridColumn dataField="YEAR_Y"  headerText="년"   textAlign="center" />\
			<DataGridColumn dataField="QUARTER" headerText="분기"  textAlign="center" />\
			<DataGridColumn dataField="MONTH_M" headerText="월"    textAlign="center"  />\
			<DataGridColumn dataField="CURR1"   headerText="숫자1" textAlign="center" />\
			<DataGridColumn dataField="CURR2"   headerText="숫자2" textAlign="center" />\
			<DataGridColumn dataField="CURR3"   headerText="숫자3" textAlign="center" />\
		</columns>\
	<dataProvider>\
	<GroupingCollection  source="{$gridData}">\
		<Grouping>\
			<GroupingField name="YEAR_Y">\
			    <summaries>\
			        <SummaryRow summaryPlacement="group">\
			            <SummaryField dataField="CURR1" summaryOperation="SUM" label="CURR1"/>\
			            <SummaryField dataField="CURR2" summaryOperation="SUM" label="CURR2"/>\
			            <SummaryField dataField="CURR3" summaryOperation="SUM" label="CURR3"/>\
			        </SummaryRow>\
			    </summaries>\
			</GroupingField>\
			<GroupingField name="QUARTER">\
			    <summaries>\
			        <SummaryRow summaryPlacement="group">\
			            <SummaryField dataField="CURR1" summaryOperation="SUM" label="CURR1"/>\
			            <SummaryField dataField="CURR2" summaryOperation="SUM" label="CURR2"/>\
			            <SummaryField dataField="CURR3" summaryOperation="SUM" label="CURR3"/>\
			        </SummaryRow>\
			    </summaries>\
			</GroupingField>\
		</Grouping>\
	</GroupingCollection>\
	</dataProvider>\
	</DataGrid>\
</rMateGrid>';
 

 
//그리드1 데이터 초기화
var gridData = [];

//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
jQuery.ajax({ 
    url:"/groupGridTest.do",         
    type:"POST",
	datatype:"json",
	async:false,
	data: {'A':'A','A':'A'},
	success:function(data){  
		gridData = data.CUR;
		 
		
    },
    complete : function(data) {
    },
    error : function(xhr, status, error) {
           
    }
});

//그리드2 데이터 초기화
var gridData2 = [];

// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}


function init() {
 
	//숫자만 입력받기
	$("#D_SORT_ORDER").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
	  
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
 
  
 

//코드 상세 조회 클릭 후 이벤트 리스너 호출 테스트
function test(event){
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	
	alert(dataField.CD_ID);
}

 

function btn_search(){
	 
	var loadData = $("#top_search").serializeAllObject(); 
 
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    url:"/groupGridTest.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: loadData, 
		success:function(data){  
			gridApp1.setData(data.CUR);     
			
			
			alert(data.RETURN_CUR   );    
			var obj = jQuery.parseJSON( data.RETURN_CUR );
			alert(obj.RETURN_CODE);
			alert(obj.RETURN_MESSAGE);
			 
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	           
	    }
	});
	
}

/* 추가 js */
//그리드 너비 제어
$(document).ready(function (){
	$("#gridHolder1, #gridHolder2").width("100%");
	
	var hei1 = $(window).height() - 322;
	var hei2 = $(window).height() - 133;
	
	$("#gridHolder1").height(hei1);
	$("#gridHolder2").height(hei2);
	$(".box_rgt").height( hei2 + 22 );
	
	/*if (hei1 <= 319) hei1 = 319;
	if (hei2 <= 508) hei2 = 508;*/
	
	$(window).on('resize',function (){	
		
		var hei1 = $(window).height() - 322;
		var hei2 = $(window).height() - 133;
		
		$("#gridHolder1").height(hei1);
		$("#gridHolder2").height(hei2);
		$(".box_rgt").height( hei2 + 22 );
		
		/*console.log(hei1, hei2);
		
		if (hei1 <= 319) hei1 = 319;
		if (hei2 <= 508) hei2 = 508;*/
		
	});
});
 
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################