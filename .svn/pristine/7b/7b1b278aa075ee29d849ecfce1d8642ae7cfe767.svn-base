/********************************************************
 * 설명:  POS안내문관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2016.12.19
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1);

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;
var collection; // 그리드의 데이터 객체
var gridData = [];

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	// rMateGrid 관련 객체
	gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
	gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

	//그리드1에 헤더 및 레이아웃 셋팅
	gridApp1.setLayout(layoutStr1);
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	gridApp1.setData(gridData);
	//$("#P_STR_CODE").val($("#S_STR_CODE").val());
	//getGridData();
	
	gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
	gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	//collection = gridRoot1.getCollection();
	
	// 그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	// 셀 병합
	//setCellSpanAttributes1();
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
	
	if(columnIndex == 0)	// 안내문 번호 클릭시
	{
		// 초기화
		for(var i=1; i<=20; i++)
		{
			$("#MSG_"+i).val("");
			$("#txtbyte"+i).text("");
		}
		
		$("#D_CORP_CODE").val(dataRow1.CORP_CODE);
		$("#D_STR_CODE").val(dataRow1.STR_CODE);
		$("#D_LOG_NO").val(dataRow1.LOGO_NO);
		$("#g_logNo").text(dataRow1.LOGO_NO);
		
		//LOGO_INFO	LOGO_INFO_SIZE
		var dataRow;
		for(var i=0; i<20; i++)
		{
			dataRow = gridRoot1.getItemAt(i);
			if(typeof dataRow != "undefined" && dataRow != null)
			{
				$("#MSG_"+dataRow.SEQ).val(dataRow.LOGO_INFO);
				$("#FONT_STYLE_"+dataRow.SEQ).val(dataRow.FONT_STYLE);
				$("#txtbyte"+dataRow.SEQ).text(dataRow.LOGO_INFO_SIZE);
			}
		}
		
		$("#D_STR_CODE").attr("disabled", "disabled");
		$("#pop_btn_save").attr("onclick", "updateDetail('update');");
		
		$("#pop_wrap").dialog("open");
	}
}

//데이터가 로딩된후 불려져 data가 저장된 collection에 셀 속성을 세팅합니다.
//addCellAttributeDetailAt 함수의 파라메터는 다음과 같습니다.
//function addCellAttributeDetailAt(rowNo:int, colNo:int, rowSpan:int, colSpan:int, styleName:String, backgroundColor:Number, formatString:String)
//   rowNo : 행의 index 번호
//   colNo : 열의 index 번호
//   rowSpan : 병합할 행의 갯수 (기본 1개)
//   colSpan : 병합할 열의 갯수 (기본 1개)
//   styleName : 적용할 style명 (layout에서 정의한 스타일명('.'은 제외한 부분)
//   backgroundColor : 배경색 (RGB값으로 적용)
//   formatString : 셀에 적용할 formatString (매뉴얼 참조)
function setCellSpanAttributes1()
{
	if (collection == null)
        collection = gridRoot1.getCollection();
    if (collection == null) {
        alert("collection 객체를 찾을 수 없습니다");
        return;
    }
    
    collection.addCellAttributeDetailAt(0, 0, 10, 1);   // 병합 정보 지정 (안내문번호)
    collection.addCellAttributeDetailAt(0, 1, 5, 1);   // 병합 정보 지정 (상단메세지)
    collection.addCellAttributeDetailAt(5, 1, 5, 1);   // 병합 정보 지정 (하단메세지)
    //collection.addCellAttributeDetailAt(0, 1, 3, 1, "subTotalStyle");   // 셀 스타일(스타일명을 적어줌) 지정 - 스타일은 layout에서 지정합니다
    //collection.addCellAttributeDetailAt(3, 1, 3, 1, null, "#ffd633");   // 셀 배경색
    //collection.addCellAttributeDetailAt(6, 3, 1, 1, null, "#ffd633", "#,##0원"); // 셀에 포맷 지정
}

//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<DataGrid id="dg1" autoHeight="true" verticalAlign="middle" >\
			<groupedColumns>\
				<DataGridColumn dataField="LOGO_NO" headerText="'+guideNumber+'" textAlign="center" color="#315cc9" fontWeight="bold" text-decoration="underline" cursor="pointer" />\
				<DataGridColumn dataField="POSITION_FLAG_INFO" headerText="위치"  textAlign="center" />\
				<DataGridColumn dataField="LOGO_INFO" headerText="안내메세지" textAlign="left" width="450" />\
				<DataGridColumn dataField="FONT_STYLE_NM" headerText="글자표현" textAlign="center" />\
				<DataGridColumn dataField="LOGO_INFO_SIZE" headerText="'+characterLength+'(byte)" textAlign="center" />\
				<DataGridColumn dataField="SEQ"   headerText="'+rowNumber+'" textAlign="center" />\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false" />\
				<DataGridColumn dataField="STR_CODE"  headerText="" textAlign="center" visible="false" />\
				<DataGridColumn dataField="POSITION_FLAG"  headerText="" textAlign="center" visible="false" />\
				<DataGridColumn dataField="FONT_STYLE" headerText="글자표현" textAlign="center" visible="false" />\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="LOGO_NO"/>\
						<SpanMergingField name="POSITION_FLAG_INFO"/>\
					</mergingFields>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';


//목록 그리드 조회
function getGridData() {
	
	var param = $("#frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/posMasterAlramList.do",         
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
			//gridApp1.setData(data.list);
			
			gridData = data.list;
			gridApp1.setData(gridData);
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

// POS안내문 수정
function updateDetail(flag) {
	
	if($("#D_STR_CODE").val() == null || $("#D_STR_CODE").val() == "")
	{
		alert(storNm + msgConfirm);
		$("#D_STR_CODE").focus();
		return;
	}
	
	// D_MSG_SEQ 파리미터에 아래와 같은 형식의 스트링으로 날림 (SEQ|POSITION_FLAG|LOGO_INFO)
	// 1|0|test1,2|0|test2,3|0|test3,4|0|test4,5|1|test5,6|1|test6,7|1|test7,8|1|test8
	var msgSeq = "";
	var postionFlag = "0";
	var msg = "";
	var font = "";
	for(var i=1; i<=20; i++)
	{
		if(i <= 10)	// 위치구분 처리
		{
			postionFlag = "0";
		}
		else
		{
			postionFlag = "1";
		}
		
		msg = $("#MSG_"+i).val();
		font = $("#FONT_STYLE_"+i).val();
		if(msgSeq == "")
		{
			msgSeq += i + "|" + postionFlag + "|" + msg + "|" + font;
		}
		else
		{
			msgSeq += "@" + i + "|" + postionFlag + "|" + msg + "|" + font;
		}
	}
	$("#D_MSG_SEQ").val(msgSeq);
	$("#D_STR_CODE").removeAttr("disabled");
	$("#D_TYPE").val(flag);
	
	var param = $("#reg_frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updatePosMasterAlram.do",
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
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//해당 점포의 안내문 번호
function getLogNoList() {
	
	var html = "";
	
	var param = $("#frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/getLogNoList.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			
			if(typeof data != "undefined" && data != null)
			{
				for(var i=0; i<data.length; i++)
				{
					html += "<option value=\"" + data[i].LOGO_NO + "\">" + data[i].LOGO_NO + "</option>";
				}
				$("#P_LOGO_NO").html(html);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 등록 팝업 초기화
function frmReset()
{
	$("#reg_frm").each(function() {
		this.reset();
	});
}

//팝업 닫기
function btn_close(){
	$("#pop_wrap").dialog( "close" );
}

$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	
	// 점포코드 콤보 가져오기(팝업)
	getStoreCode("D_STR_CODE");
	
	//초기 팝업 사이즈 조절
	$(function() {
		$("#pop_wrap").dialog({
		    autoOpen : false,
		    modal : true,
		    width : 750,
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
	
	// 점포명 체인지 이벤트
	$("#P_STR_CODE").change(function(){
		getLogNoList();
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData();
	});
	
	// 신규등록 버튼
	$("#btn_new").click(function(){
		
		$("#D_STR_CODE").removeAttr("disabled");
		
		$("#pop_btn_save").attr("onclick", "updateDetail('insert');");
		
		$("#D_TYPE").val("insert");
		$("#D_STR_CODE").val($("#P_STR_CODE").val());
		$("#D_LOG_NO").val("");
		$("#g_logNo").text(automaticNumbering);	// "자동발번" 메세지
		
		// 초기화
		for(var i=1; i<=20; i++)
		{
			$("#MSG_"+i).val("");
			$("#FONT_STYLE_"+i).val("1");
			$("#txtbyte"+i).text("");
		}
		
		$("#pop_wrap").dialog("open");
	});
	
	// 초기 진입시 해당 점포에 안내문 리스트 트리거로 change 이벤트 발생
	$("#P_STR_CODE").trigger("change");
	
});

