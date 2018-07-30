/********************************************************
 * 설명:  시간대별 매출 속보
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 정해성
 * since	: 2017.06.29
 * version : 1.0
 ********************************************************/

var sum_standard_amt = 0;
var sum_standard_cust = 0;
var sum_contract_amt = 0;
var sum_contract_cust = 0;
var sum_appraisal_amt = 0;
var sum_appraisal_cust = 0;

$(document).ready(function() {
	
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 점포 바인딩
	getStoreCode("P_STR_CODE");
	
	// 달력 컨트롤 바인딩
	$("#P_STANDARD_START_DT").datepicker({
		onSelect: function(dateText) { 	 	 
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
		
			if($("#P_STANDARD_START_DT").val() > $("#P_STANDARD_END_DT").val()) {
				
				alert(msgStartDateAndEndDate);
				$("#P_STANDARD_START_DT").val(CUR_DT);
				return;
			}
		}, 	 
		showMonthAfterYear: true 
	});
		 
	$("#P_STANDARD_END_DT").datepicker({ 
		onSelect: function(dateText) {
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
		
			if($("#P_STANDARD_START_DT").val() > $("#P_STANDARD_END_DT").val()) {
				alert(msgStartDateAndEndDate);
				$("#P_STANDARD_END_DT").val(CUR_DT);
				return;
			}
		},
		showMonthAfterYear:true
	});

	$("#P_CONTRACT_START_DT").datepicker({
		onSelect: function(dateText) { 	 	 
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
		
			if($("#P_STANDARD_START_DT").val() > $("#P_STANDARD_END_DT").val()) {
				
				alert(msgStartDateAndEndDate);
				$("#P_STANDARD_START_DT").val(CUR_DT);
				return;
			}
		}, 	 
		showMonthAfterYear: true 
	});
		 
	$("#P_CONTRACT_END_DT").datepicker({ 
		onSelect: function(dateText) {
			var CUR_DT = new CommDateManager().after(0, 0, 0).getDate("yyyy-mm-dd"); 
		
			if($("#P_STANDARD_START_DT").val() > $("#P_STANDARD_END_DT").val()) {
				alert(msgStartDateAndEndDate);
				$("#P_STANDARD_END_DT").val(CUR_DT);
				return;
			}
		},
		showMonthAfterYear:true
	});
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var oneDayBefore = new CommDateManager().before(0, 0, 1).getDate("yyyy-mm-dd");
	$("#P_STANDARD_START_DT").val(date);
	$("#P_STANDARD_END_DT").val(date);
	$("#P_CONTRACT_START_DT").val(oneDayBefore);
	$("#P_CONTRACT_END_DT").val(oneDayBefore);
	
	
	// grid 컬럼 설정
	rMateGrid.gridColumns = [
	               new rMateGrid.RMateGridColumn('G_HOURS', 'HOURS', '구분', '100'),
	               new rMateGrid.RMateGridColumn('STANDARD_DATE', '', '기준기간', '100'),
	               new rMateGrid.RMateGridColumn('CONTRACT_DATE', '', '대비기간', '100'),
	               new rMateGrid.RMateGridColumn('APPRAISAL', '', '평가', '100')
               	];
	
	rMateGrid.gridColumns[0].formatter = '';
	rMateGrid.gridColumns[0].textAlign = 'center';
	
	rMateGrid.getColumn('STANDARD_DATE').childColumns = [ new rMateGrid.RMateGridColumn('G_S_SALE_AMT', 'S_SALE_AMT', '매출액', '100'),
	                                  	                  new rMateGrid.RMateGridColumn('G_S_CUST_CNT', 'S_CUST_CNT', '객수', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_S_CT', 'S_CT', '객단가', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_S_CR', 'S_CR', '구성비', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_S_ACC', 'S_ACC', '시간대누적', '100') ];
	
	rMateGrid.getColumn('CONTRACT_DATE').childColumns = [ new rMateGrid.RMateGridColumn('G_C_SALE_AMT', 'C_SALE_AMT', '매출액', '100'),
	                                   	                  new rMateGrid.RMateGridColumn('G_C_CUST_CNT', 'C_CUST_CNT', '객수', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_C_CT', 'C_CT', '객단가', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_C_CR', 'C_CR', '구성비', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_C_ACC', 'C_ACC', '시간대누적', '100') ];
	
	rMateGrid.getColumn('APPRAISAL').childColumns =     [ new rMateGrid.RMateGridColumn('G_INCREASE_AMT', 'INCREASE_AMT', '증감액', '100'),
	                                   	                  new rMateGrid.RMateGridColumn('G_INCREASE_AMT_RATE', 'INCREASE_AMT_RATE', '증감율', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_INCREASE_CUST', 'INCREASE_CUST', '객수', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_INCREASE_CUST_RATE', 'INCREASE_CUST_RATE', '증감율', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_CT', 'CT', '객단가', '100'),
	                                	                  new rMateGrid.RMateGridColumn('G_CT_RATE', 'CT_RATE', '증감', '100'),
	                                                      new rMateGrid.RMateGridColumn('G_A_ACC', 'A_ACC', '누적증감', '100'),
	                                                      new rMateGrid.RMateGridColumn('G_A_ACC_RATE', 'A_ACC_RATE', '누적증감율', '100')];
	
	rMateGrid.getColumn('STANDARD_DATE').childColumns[3].formatter = '';
	rMateGrid.getColumn('CONTRACT_DATE').childColumns[3].formatter = '';
	rMateGrid.getColumn('APPRAISAL').childColumns[1].formatter = '';
	rMateGrid.getColumn('APPRAISAL').childColumns[3].formatter = '';
	rMateGrid.getColumn('APPRAISAL').childColumns[5].formatter = '';
	rMateGrid.getColumn('APPRAISAL').childColumns[7].formatter = '';
	
	
	// grid 바인딩
	rMateGrid.createGrid();
	
	
	$('#btn_search').click(function() {
		var param 					= $("#top_search").serializeArray();
		var P_STR_CODE 				= $('#P_STR_CODE').val();
		var P_STANDARD_START_DT 	= $('#P_STANDARD_START_DT').val();
		var P_STANDARD_END_DT 		= $('#P_STANDARD_END_DT').val();
		var P_CONTRACT_START_DT 	= $('#P_CONTRACT_START_DT').val();
		var P_CONTRACT_END_DT 		= $('#P_CONTRACT_END_DT').val();
		var P_STANDARD_START_DT_ARR = $("#P_STANDARD_START_DT").val().split("-");
		var P_STANDARD_END_DT_ARR 	= $("#P_STANDARD_END_DT").val().split("-");
		var P_CONTRACT_START_DT_ARR = $("#P_CONTRACT_START_DT").val().split("-");
		var P_CONTRACT_END_DT_ARR 	= $("#P_CONTRACT_END_DT").val().split("-");
		var strDt1 			= new Date(P_STANDARD_START_DT_ARR[0], Number(P_STANDARD_START_DT_ARR[1])-1, P_STANDARD_START_DT_ARR[2]); 
		var endDt1 			= new Date(P_STANDARD_END_DT_ARR[0], Number(P_STANDARD_END_DT_ARR[1])-1, P_STANDARD_END_DT_ARR[2]); 
		var strDt2 			= new Date(P_CONTRACT_START_DT_ARR[0], Number(P_CONTRACT_START_DT_ARR[1])-1, P_CONTRACT_START_DT_ARR[2]); 
		var endDt2 			= new Date(P_CONTRACT_END_DT_ARR[0], Number(P_CONTRACT_END_DT_ARR[1])-1, P_CONTRACT_END_DT_ARR[2]); 
		var dateDiff1 		= ((endDt1.getTime() - strDt1.getTime()) / 1000 / 60 / 60 / 24) + 1;
		var dateDiff2 		= ((endDt2.getTime() - strDt2.getTime()) / 1000 / 60 / 60 / 24) + 1;
		
		//유효성검사
		if(dateDiff1 > 60) {
			alert("기준기간 간 60일 이상은 조회하실 수 없습니다.");
			$("#P_STANDARD_START_DT").focus();
			return false;
		}
		
		if(dateDiff2 > 60) {
			alert("대비기간 간 60일 이상은 조회하실 수 없습니다.");
			$("#P_CONTRACT_START_DT").focus();
			return false;
		}

		
		jQuery.ajax({ 
		    url: "/salesInfoReportNewsFlashList.do",
		    type: "POST",
			datatype: "JSON",
			data: { P_STR_CODE: P_STR_CODE, P_STANDARD_START_DT: P_STANDARD_START_DT, P_STANDARD_END_DT: P_STANDARD_END_DT, P_CONTRACT_START_DT: P_CONTRACT_START_DT, P_CONTRACT_END_DT: P_CONTRACT_END_DT },
			beforeSend:function(x){
				CommonJs.addLodingBar("in_frame");
			},
			success:function(data) {
				
				//console.log(data);
				
				if(data) {
					rMateGrid.gridObj.setData(data);
					
					// 검색에 성공한 조건을 변수에 할당
					storeNm = $('#P_STR_CODE').text();
					standardStartDate = P_STANDARD_START_DT;
					standardEndDate = P_STANDARD_END_DT;
					contractStartDate = P_CONTRACT_START_DT;
					contractEndDate = P_CONTRACT_END_DT;
				}
				
		    },
		    complete : function(data) {
		    	CommonJs.removeLoadingBar("in_frame");
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	});
	
	$('#btn_excel_down').click(function() {
		
		rMateGrid.excelExport();
	});
	
	
	
});


//function RMateGrid(divId, gridId, width, height) {
//	this.assetsPath = '/resources/js/rMateGridH5/Assets/';
//	this.gridElementId = divId;
//	this.gridId = girdId;
//	this.width = ((width.indexOf('%') >= 0 || width.indexOf('px')) >= 0 ? width : width + 'px');
//	this.height = ((height.indexOf('%') >= 0 || height.indexOf('px')) >= 0 ? height : height + 'px');
//	this.columns = [];
//	this.gridObj = {};
//	this.gridRoot = {};
//	this.sortableColumns = true;
//	this.horizontalScrollPolicy = 'auto';
//	this.showDeletedRows = true;
//	this.doubleClickEnabled = true;
//	this.selectionMode = 'multipleRows';
//}
//
//RMateGrid.prototype.createGrid = function() {
//	if(this.columns.length <= 0)
//		throw '그리드 컬럼이 존재하지 않습니다.';
//	
//	rMateGridH5.setAssetsPath(this.assetsPath);
//	rMateGridH5.create(this.gridId, this.gridElementId, 'rMateOnLoadCallFunction=RMateGrid.gridReadyHandler', this.width, this.height);	
//};
//
//
//RMateGrid.prototype.gridReadyHandler = function() {
//	this.gridObj = document.getElementById(id); 
//	this.gridRoot = this.rMateGrid.gridObj.getRoot();           // 데이터와 그리드를 포함하는 객체
//	
//	this.gridRoot.addEventListener("dataComplete", this.rMateGrid.gridDataCompleteHandler);
//	
//	this.gridObj.setLayout(this.rMateGrid.getGridLayout());	  // 데이터와 그리드를 포함하는 객체
//	this.gridObj.setData([]);	                                  // 초기 그리드 행추가를 위해 null 데이터 셋팅
//};
// 
//// RMateGrid 컬럼 생성자 함수
//RMateGrid.prototype.Column = function(id, dataField, headerText, width) {
//	this.id = id;
//	this.dataField = dataField;
//	this.headerText = headerText;
//	this.width = width;
//	this.visible = true;
//	this.editable = false;
//	this.textAlign = 'center';
//	this.formatter = '';
//};
//
//// RMateGrid 컬럼 추가 함수
//RMateGird.prototype.addColumn = function(column) {
//	this.columns.push(column);
//};

/*********************************************************************************************************************/

var rMateGrid = {
	assetsPath: '/resources/js/rMateGridH5/Assets/',
	gridElementId: 'gridHolder1',
	gridId: 'grid1',
	width: '100%',
	height: '500px',
	gridColumns: [],
	gridObj: {},
	gridRoot: {},
	RMateGridColumn: function(id, dataField, headerText, width) {
		this.id = id;
		this.dataField = dataField;
		this.headerText = headerText;
		this.width = width;
		this.visible = true;
		this.editable = false;
		this.textAlign = 'right';
		this.formatter = '{numfmt}';
		this.childColumns = [];
	},
	getGridLayout: function() {
		var gridLayout = '<rMateGrid>\
					          <NumberFormatter id="numfmt" useThousandsSeparator="true" />\
							  <NumberFormatter id="numfmt1" useThousandsSeparator="true" rounding="nearest"  />\
							  <DataGrid id="' + this.gridId + '" sortableColumns="true" editable="false" horizontalScrollPolicy="auto" lockedColumnCount="1">\
						          <groupedColumns>';
		
		// 컬럼 추가
		gridLayout += this.renderColumn(this.gridColumns);
		
		gridLayout += '</groupedColumns>';
		
		// 하단 추가
		gridLayout += '<footers>\
					       <DataGridFooter height="26" color="#000" backgroundColor="#c5c5c5" borderTopColor="#858585" borderTopWidth="1" borderTopStyle="solid" fontWeight="normal">\
						        <DataGridFooterColumn />\
								<DataGridFooterColumn summaryOperation="SUM" labelJsFunction="setSumStandardAmt" dataColumn="{G_S_SALE_AMT}" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn summaryOperation="SUM" labelJsFunction="setSumStandardCust" dataColumn="{G_S_CUST_CNT}" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn labelJsFunction="standardCalct" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn summaryOperation="SUM" dataColumn="{G_S_CR}" formatter="{numfmt1}" textAlign="right"/>\
								<DataGridFooterColumn summaryOperation="SUM" dataColumn="{G_S_SALE_AMT}" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn summaryOperation="SUM" labelJsFunction="setSumContractAmt" dataColumn="{G_C_SALE_AMT}" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn summaryOperation="SUM" labelJsFunction="setSumContractCust" dataColumn="{G_C_CUST_CNT}" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn labelJsFunction="contractCalct" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn summaryOperation="SUM" dataColumn="{G_C_CR}" formatter="{numfmt1}" textAlign="right" />\
								<DataGridFooterColumn summaryOperation="SUM" dataColumn="{G_C_SALE_AMT}" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn summaryOperation="SUM" labelJsFunction="setSumAppraisalAmt" dataColumn="{G_INCREASE_AMT}" formatter="{numfmt}" textAlign="right" />\
			                    <DataGridFooterColumn labelJsFunction="increaseAmt" textAlign="right" />\
								<DataGridFooterColumn summaryOperation="SUM" labelJsFunction="setSumAppraisalCust" dataColumn="{G_INCREASE_CUST}" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn labelJsFunction="increaseCust" textAlign="right" />\
			                    <DataGridFooterColumn labelJsFunction="increaseCalc" formatter="{numfmt}" textAlign="right" />\
			                    <DataGridFooterColumn labelJsFunction="contractIncrease" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn summaryOperation="SUM" dataColumn="{G_INCREASE_AMT}" formatter="{numfmt}" textAlign="right" />\
								<DataGridFooterColumn labelJsFunction="accIncreaseRate" formatter="{numfmt}" textAlign="right" />\
							</DataGridFooter>\
					</footers>';
		
		gridLayout += '</DataGrid>\
				</rMateGrid>';
		
		//console.log(gridLayout);
		
		return gridLayout;
	},
	renderColumn: function(columns) {
		
		var strColumns = '';
		
		for(var i = 0; i < columns.length; i++) {
			
			var isGroupColumn = false;
			var column = '';
			
			// 자식 컬럼이 존재할 경우 그룹 컬럼으로 인지
			if(columns[i].childColumns.length > 0) {
				isGroupColumn = true;
				column += '<DataGridColumnGroup';
			}
			else {
				column += '<DataGridColumn';
			}
			
			if(columns[i].id) 
				column += (' id="' + columns[i].id + '" ');
			
			if(columns[i].dataField) 
				column += (' dataField="' + columns[i].dataField + '" ');
			
			if(columns[i].headerText) 
				column += (' headerText="' + columns[i].headerText + '" ');
			
			if(columns[i].width) 
				column += (' width="' + columns[i].width + '" ');
			
			if(columns[i].visible) 
				column += (' visible="' + columns[i].visible + '" ');
			
			if(columns[i].editable) 
				column += (' editable="' + columns[i].editable + '" ');
			
			if(columns[i].textAlign) 
				column += (' textAlign="' + columns[i].textAlign + '" ');
			
			if(columns[i].formatter) 
				column += (' formatter="' + columns[i].formatter + '" ');
			
			if(isGroupColumn) {
				column += '>';
			}
			else {
				column += '/>';
			}
			
			if(isGroupColumn) {
				column += this.renderColumn(columns[i].childColumns);
				column += '</DataGridColumnGroup>';
			}
			
			strColumns += column;
		}
		
		return strColumns;
	},
	getColumn: function(columnId) {
		
		for(var i=0; i<this.gridColumns.length; i++) {
			if(this.gridColumns[i].id == columnId) {
				return this.gridColumns[i];
			}
		}
		
	},
	createGrid: function() {
		rMateGridH5.setAssetsPath(this.assetsPath);
		rMateGridH5.create(this.gridId, this.gridElementId, 'rMateOnLoadCallFunction=rMateGrid.gridReadyHandler', this.width, this.height);
	},
	gridReadyHandler: function(id) {
		
		this.rMateGrid.gridObj = document.getElementById(id); 
		this.rMateGrid.gridRoot = this.rMateGrid.gridObj.getRoot();           // 데이터와 그리드를 포함하는 객체
		
		this.rMateGrid.gridRoot.addEventListener("dataComplete", this.rMateGrid.gridDataCompleteHandler);
		
		this.rMateGrid.gridObj.setLayout(this.rMateGrid.getGridLayout());	  // 데이터와 그리드를 포함하는 객체
		this.rMateGrid.gridObj.setData([]);	                                  // 초기 그리드 행추가를 위해 null 데이터 셋팅
	},
	gridDataCompleteHandler: function() {
		
		this.rMateGrid.gridRoot.getDataGrid().addEventListener('itemDoubleClick', function(event) {
			
		});
	},
	gridRowClickHandler: function() {
		//console.log(arguments);
	},
	// 엑셀 다운로드 메서드
	excelExport: function() {
		
		var dt = new Date();
		var month = dt.getMonth() + 1;
		var day = dt.getDate();
		var year = dt.getFullYear();
		var date = year + "" + month + "" + day;
		
		this.gridRoot.getDataGrid().exportFileName = "시간대별매출속보_" + date + ".xlsx" ;  
		this.gridRoot.excelExportSave("", false);
		
	}
};

// 기준 매출액 합계
var setSumStandardAmt = function(column, data) {
	sum_standard_amt = data;
	return data;
};

// 기준 객수 합계
var setSumStandardCust = function(column, data) {
	sum_standard_cust = data;
	return data;
};

// 대비 매출액 합계
var setSumContractAmt = function(column, data) {
	sum_contract_amt = data;
	return data;
};

// 대비 객수 합계
var setSumContractCust = function(column, data) {
	sum_contract_cust = data;
	return data;
};

// 평가 증감액 합계
var setSumAppraisalAmt = function(column, data) {
	sum_appraisal_amt = data;
	return data;
};

// 평가 객수 합계
var setSumAppraisalCust = function(column, data) {
	sum_appraisal_cust = data;
	return data;
};

// 기준 객단가를 구하는 함수
// 매출액 / 객수 (소수점 이하 반올림)
var standardCalct = function(column, data) {
	//console.log('기준객단가 구함', sum_standard_amt, sum_standard_cust);
	return Math.round(sum_standard_amt / sum_standard_cust);
};

// 대비 객단가를 구하는 함수
var contractCalct = function() {
	return Math.round(sum_contract_amt / sum_contract_cust);
};

// 평가 증감액의 증감률을 구하는 함수
// 증감액 / 대비 매출액 * 100
var increaseAmt = function() {
	
	if(sum_contract_amt && sum_contract_amt != 0) {
		return Math.round((sum_appraisal_amt / sum_contract_amt) * 100, 2).toFixed(2);
	}
	else {
		return '0.00';
	}
	
};

// 평가 객수의 증감률을 구하는 함수
// 평가 객수 / 대비 객수 * 100
var increaseCust = function() {
	
	if(sum_contract_cust && sum_contract_cust != 0) {
		return Math.round((sum_appraisal_cust / sum_contract_cust) * 100, 2).toFixed(2);
	}
	else {
		return '0.00';
	}
	
};

// 평가 객단가를 구하는 함수
var increaseCalc = function() {
	return Math.round(sum_appraisal_amt / sum_appraisal_cust);
};

// 평가 증감을 구하는 함수
var contractIncrease = function() {
	
	var rtnVal = Math.round((Math.round(sum_appraisal_amt / sum_appraisal_cust) / sum_appraisal_cust) * 100);

	if(isNaN(rtnVal)) {
		return 0;
	}
	else {
		return rtnVal;
	}
	
	//return Math.round((Math.round(sum_appraisal_amt / sum_appraisal_cust) / sum_appraisal_cust) * 100);
};

// 누적 증감률
var accIncreaseRate = function() {
	
	var rtnVal = rMateGrid.gridRoot.getItemFieldAt(rMateGrid.gridRoot.getLength() - 1, 'A_ACC_RATE');
	
	if(rtnVal) {
		return rtnVal;
	}
	else {
		return '0.00';
	}
	//return rMateGrid.gridRoot.getItemFieldAt(rMateGrid.gridRoot.getLength() - 1, 'A_ACC_RATE');
};


