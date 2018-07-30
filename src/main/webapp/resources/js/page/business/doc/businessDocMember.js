/********************************************************
 * 설명:  회원별미수원장
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김창열
 * since	: 2017.04.21
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1;

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

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1"){
		// rMateGrid 관련 객체
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체	
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체

		//그리드1에 헤더 및 레이아웃 셋팅
		gridApp1.setLayout(layoutStr1);
		
		//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
		//getGridData();
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	dataGrid1.addEventListener("menuItemSelect", menuItemSelectedHandler);
	//setSpanAttributes();
}

function setSpanAttributes() {
    if (collection == null)
        collection = gridRoot.getCollection();
    if (collection == null) {
        alert("collection 객체를 찾을 수 없습니다");
        return;
    }
 
    //collection.addRowAttributeDetailAt(4, "subTotalStyle", "#76a4c8", "#,##0", true, 40);
 
    //collection.addCellAttributeDetailAt(0, 0, 12, 1);
    collection.addCellAttributeDetailAt(0, 3, 3, 1, "subTotalStyle", "");
    /*
	for (i = 0; i < collection.getLength(); i++) {
        if (i % 3 == 0)
            collection.addCellAttributeDetailAt(i, 1, 3, 1);
    }*/
}

var menuItemSelectedHandler = function(event) {
    contextMenuHandler(event.menuItemCaption);
}

function contextMenuHandler(caption) {
    if (caption == "선택 복사") {
        // 현재의 선택영역을 클립보드로 복사
        dataGrid1.selectionToClipboard();
    }
}
//----------------------- 그리드 설정 끝 -----------------------

//그리드1 헤더 및 레이아웃 
var layoutStr1 =
	'<rMateGrid>\
		<SpanRowAttribute id="sumRowAttr_T" styleName="allTotalStyle" backgroundColor="#bbd713" />\
		<SpanRowAttribute id="sumRowAttr_T2" styleName="allTotalStyle" backgroundColor="#f3f3f3" />\
		<SpanCellAttribute id="sumTotalCellAttr" colNo="0" styleName="allTotalHeaderStyle" backgroundColor="#a8c305" colSpan="7" />\
		<SpanCellAttribute id="sumTotalCellAttr2" colNo="2" styleName="allTotalHeaderStyle" backgroundColor="#f3f3f3" colSpan="7" />\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<ContextMenu id="cMenu">\
			<ContextMenuItem caption="선택 복사" />\
		</ContextMenu>\
		<DataGrid id="dg1" sortableColumns="true" contextMenu="{cMenu}" selectionMode="multipleCells" dragSelectable="true">\
			<groupedColumns>\
				<DataGridColumn dataField="STR_CODE" 			headerText="점포코드"			textAlign="center"	width="100"/>\
				<DataGridColumn dataField="STR_NAME" 			headerText="점포명"			textAlign="center"	width="100"/>\
				<DataGridColumn dataField="CUST_NO" 		headerText="'+cusNo+'"			textAlign="center"	width="110"/>\
				<DataGridColumn dataField="ACCT_DEPT" 			headerText="회계코드"			textAlign="center"	width="100"/>\
				<DataGridColumn dataField="CUST_NAME" 		headerText="'+cusName+'"		textAlign="center"	width="100"/>\
				<DataGridColumn dataField="BUSI_FLAG_NAME" 			headerText="회원구분"			textAlign="center"	width="100"/>\
				<DataGridColumn dataField="CD_NM" 			headerText="'+mbrGrade+'"		textAlign="center"	/>\
				<DataGridColumn dataField="ACCT_REABLE" 	headerText="'+zanAmt+'"			textAlign="right"	formatter="{numfmt}"/>\
				<DataGridColumn dataField="SALE_DT" 		headerText="'+dealingsDate+'"	textAlign="center"	formatter="{datefmt}"/>\
				<DataGridColumn dataField="PAY_ZAN_AMT" 	headerText="'+selngAm+'"		textAlign="right"	formatter="{numfmt}"/>\
				<DataGridColumn dataField="DPOT_AMT" 		headerText="'+dpotAmt+'"		textAlign="right"	formatter="{numfmt}"/>\
			</groupedColumns>\
			<dataProvider>\
				<SpanSummaryCollection source="{$gridData}">\
					<mergingFields>\
						<SpanMergingField name="STR_CODE">\
							<SpanSummaryRow label="점포소계" labelDataField="STR_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
						        <SpanSummaryField dataField="PAY_ZAN_AMT" summaryOperation="SUM" />\
						        <SpanSummaryField dataField="DPOT_AMT" summaryOperation="SUM" />\
							</SpanSummaryRow>\
						</SpanMergingField>\
						<SpanMergingField name="STR_NAME"/>\
						<SpanMergingField name="CUST_NO">\
							<SpanSummaryRow label="'+subTotal+'" labelDataField="CUST_NO" rowAttribute="{sumRowAttr_T2}" cellAttribute="{sumTotalCellAttr2}">\
							    <SpanSummaryField dataField="PAY_ZAN_AMT" summaryOperation="SUM" />\
								<SpanSummaryField dataField="DPOT_AMT" summaryOperation="SUM" />\
							</SpanSummaryRow>\
						</SpanMergingField>\
						<SpanMergingField name="ACCT_DEPT"/>\
						<SpanMergingField name="CUST_NAME"/>\
						<SpanMergingField name="BUSI_FLAG_NAME"/>\
						<SpanMergingField name="CD_NM"/>\
						<SpanMergingField name="ACCT_REABLE"/>\
						<SpanMergingField name="SALE_DT"/>\
					</mergingFields>\
					<summaries>\
					    <SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="STR_CODE" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
					    	<SpanSummaryField dataField="ACCT_REABLE" summaryOperation="SUM" />\
					        <SpanSummaryField dataField="PAY_ZAN_AMT" summaryOperation="SUM" />\
					        <SpanSummaryField dataField="DPOT_AMT" summaryOperation="SUM" />\
					    </SpanSummaryRow>\
					</summaries>\
				</SpanSummaryCollection>\
			</dataProvider>\
		</DataGrid>\
	</rMateGrid>';

		
/*<summaries>\
	<SpanGroupingSummaryRow label="소계" labelDataField="CUST_NO">
	<fields>
	    <SpanGroupingSummaryField dataField="Seoul" />
	    <SpanGroupingSummaryField dataField="Busan" />
	    <SpanGroupingSummaryField dataField="Incheon" />
	</fields>
	</SpanGroupingSummaryRow>
</summaries>\
					<summaries>\
				        <SpanSummaryRow summaryPlacement="last" label="'+sm+'" labelDataField="CUST_NO" rowAttribute="{sumRowAttr_T}" cellAttribute="{sumTotalCellAttr}">\
				            <SpanSummaryField dataField="PAY_ZAN_AMT" summaryOperation="SUM" />\
				            <SpanSummaryField dataField="DPOT_AMT" summaryOperation="SUM" />\
				        </SpanSummaryRow>\
				    </summaries>\
*/

//목록 그리드 조회
function getGridData() {
	var params 			= $("#frm").serializeAllObject();
	var P_STR_DT_ARR	= $("#P_OPEN_DT").val().split("-");
	var P_END_DT_ARR 	= $("#P_END_DT").val().split("-");
	var strDt1			= new Date(P_STR_DT_ARR[0], Number(P_STR_DT_ARR[1])-1, P_STR_DT_ARR[2]); 
	var endDt1			= new Date(P_END_DT_ARR[0], Number(P_END_DT_ARR[1])-1, P_END_DT_ARR[2]); 
	var dateDiff1		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;


	//유효성검사
	if(dateDiff1 > 185) {
		alert("조회기간 185일 이상은 조회하실 수 없습니다.");
		$("#P_OPEN_DT").focus();
		return;
	}
	
	params.P_STR_CODE = $("#P_STR_CODE").val();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/businessDocMemberList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: params,
	    beforeSend : function(){ 	    	
            gridRoot1.addLoadingBar();
	    }, 
		success:function(data){
			//debugger;
			//그리드1 데이터 조회
			//alert(data.list);
			gridApp1.setData(data);
			
			dataGrid1.setEnabled(false);
	       	gridRoot1.removeLoadingBar();
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//(회원검색) 팝업 호출 function
function btn_comm_user_search(){
	$('#comm_pop_wrap1' ).dialog( 'open' );
	gridApp10.resize();
	  
	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
	if($("#P_CUST_NAME").val() != null && $("#P_CUST_NAME").val() != ""){
		$("#P_TEXT1").val($("#P_CUST_NAME").val());
		btn_comm_search('1');
	}
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow){
	$('#P_CUST_NAME' ).val(dataRow.CUST_NAME);		// 회원명
	//$('#CUS_NAME_TEXT' ).text(dataRow.CUST_NAME);	// 회원명
}

function excelExport(){    
	var dt = new Date();
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var date = year+""+month+""+day;
	
	dataGrid1.exportFileName = memberMisDoc+date+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}

//출력
function btn_print1(){
	
	//출력전표 발리데이션 체크
	//
		var P_CORP_CODE	= $("#CORP_CODE").val();
		var P_STR_CODE		= $("#P_STR_CODE").val();
		var P_OPEN_DT 		= $("#P_OPEN_DT").val().replace(/-/gi,'');
		var P_END_DT 		= $("#P_END_DT").val().replace(/-/gi,'');
		var P_TEXT_OPEN_DT 	= $("#P_OPEN_DT").val();
		var P_TEXT_END_DT 	= $("#P_END_DT").val();
		var P_CUST_NAME		= $("#P_CUST_NAME").val();
		
		var params = "?reportMode=HTML"+"&P_CORP_CODE="+P_CORP_CODE+
							"&P_STR_CODE="+P_STR_CODE+
							"&P_OPEN_DT="+P_OPEN_DT+
							"&P_END_DT="+P_END_DT+
							"&P_TEXT_OPEN_DT="+P_TEXT_OPEN_DT+
							"&P_TEXT_END_DT="+P_TEXT_END_DT+
							"&P_CUST_NAME="+P_CUST_NAME;
							; // AIViewer 파라미터
		window.open("aireportBusinessDocMemberPrint.do" + params,'AIViewer','width=1150,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	
}

$(document).ready(function () {	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	getStoreCode("P_STR_CODE");
	$("#frm select[id='P_STR_CODE']").val(SSSC).prop("selected", true);
	
	 $(".datepicker1").datepicker({ onSelect: function(dateText) 
	 { 	 	 var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
				$("#P_OPEN_DT").val(CUR_DT);
				return;
			}	 
		 }, 	 showMonthAfterYear:true 
		});
	 
	$(".datepicker2").datepicker({ onSelect: function(dateText) 
	 { 	 	var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
			if(     $("#P_OPEN_DT").val()  >  $("#P_END_DT").val()     )
			{   alert(msgStartDateAndEndDate);
			$("#P_END_DT").val(CUR_DT);
				return;
			}	 
	 }, 	 showMonthAfterYear:true 
	});
	
	
	//조회
	$("#btn_search").click(function(){
		getGridData();
	});	

	//excel
	$("#btn_excel_down").click(function(){
		excelExport();
	});	
	
	//그리드 너비 제어
	$("#gridHolder1").width("100%");
	$("#gridHolder1").height( $(window).height() - 135 );
	
	$(window).on('resize',function (){	
		
		$("#gridHolder1").width("100%");	
		$("#gridHolder1").height( $(window).height() - 135 );
		
	});
	
	$("#P_CUST_NAME").keydown(function(key) {
		
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
	});	
		
});



