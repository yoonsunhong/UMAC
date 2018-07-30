/********************************************************
 * 설명:  자동할당(R1) 취소
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 정해성
 * since	: 2017.06.29
 * version : 1.0
 ********************************************************/

// 전역 변수
var GstrCodeWms = '';
var GchkAssign = '';
var GisAutoAssign = false;     // 자동할당 생성이 가능한지를 체크하는 상태 값 (출고목록을 조회하거나 목록 체크를 선택 해제 할 경우 false로 변경)
var dataRow1 ='';

$(document).ready(function() {
	
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 점포 바인딩
	getStoreCodeFlag("P_STR_CODE_WMS", "3");
	getStoreCode("P_STR_CODE_STORE");
	
	$('#P_STR_CODE_STORE option[value="10030"]').remove();
	
	// 달력 컨트롤 바인딩
	$("#P_DOUT_DT").datepicker({
		onSelect: function(dateText) {
			GisAutoAssign = false;
		},
		showMonthAfterYear: true 
	});
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_DOUT_DT").val(date);
	
	$("#P_STR_CODE_STORE").change(function() {
		GisAutoAssign = false;
	});
	
	$("#P_STR_CODE_WMS").change(function() {
		GisAutoAssign = false;
	});
	
	$('#P_DOUT_DT').change(function() {
		GisAutoAssign = false;
	});
	
	
	
	// 출고현황 그리드 레이아웃 설정
	rMateGrid.gridColumns = [
	               new rMateGrid.RMateGridColumn('G_NO', 'NO', 'No', '50'),
	               new rMateGrid.RMateGridColumn('G_DOUT_DT', 'DOUT_DT', '출고예정일자', '100'),
	               new rMateGrid.RMateGridColumn('G_SLIP_NO', 'SLIP_NO', '출고번호', '150'),
	               new rMateGrid.RMateGridColumn('G_DIN_STR_CODE', 'DIN_STR_CODE', '점포코드', '100'),
	               new rMateGrid.RMateGridColumn('G_STR_NAME', 'STR_NAME', '점포명', '100'),
	               new rMateGrid.RMateGridColumn('G_RELEASE_CNT', 'RELEASE_CNT', '출고건수', '100'),
	               new rMateGrid.RMateGridColumn('G_TOTAL_AMT', 'TOTAL_AMT', '총출고금액', '100'),
	               new rMateGrid.RMateGridColumn('G_ROUTE_GB', 'ROUTE_GB', '배송구분', '100'),
	               new rMateGrid.RMateGridColumn('G_STR_CODE', 'STR_CODE', '물류센터', '100')
               	];
	
	rMateGrid.gridColumns[5].textAlign = 'right';
	rMateGrid.gridColumns[5].formatter = '{numfmt}';
	rMateGrid.gridColumns[6].textAlign = 'right';
	rMateGrid.gridColumns[6].formatter = '{numfmt}';
	rMateGrid.gridColumns[8].visible = false;
	
	// 그리드 바인딩
	rMateGrid.createGrid();
	
	// 재고현황 그리드 레이아웃 설정
	rMateGrid2.gridColumns = [
	      	               new rMateGrid2.RMateGridColumn('G_SLIP_NO', 'SLIP_NO', '출고번호', '150'),
	      	               new rMateGrid2.RMateGridColumn('G_SCAN_CODE', 'SCAN_CODE', '상품코드', '150'),
	      	               new rMateGrid2.RMateGridColumn('G_ITM_NAME', 'ITM_NAME', '상품명', '350'),
	      	               new rMateGrid2.RMateGridColumn('G_DOUT_QTY', 'DOUT_QTY', '주문수량', '100'),
	      	               new rMateGrid2.RMateGridColumn('G_W_LINE_CODE', 'W_LINE_CODE', 'Location', '100')
                     	];
	
	rMateGrid2.gridColumns[2].textAlign = 'left';
  	rMateGrid2.gridColumns[3].textAlign = 'right';
  	rMateGrid2.gridColumns[3].formatter = '{numfmt}';
	      	
  	// 그리드 바인딩
  	rMateGrid2.createGrid();
	
  	// 조회 버튼 클릭
	$('#btn_search').click(function() {
		gridMovePage(1);
	});
	
	$('#btn_assign_print').click(function() {
		btn_print();
	});
	
	// 할당 취소 버튼 클릭
	$('#btn_assign_cancel').click(function() {
		var selectorColumn = rMateGrid.gridRoot.getObjectById("selector");
		var selectedAssign = selectorColumn.getSelectedIndices();
		
		if(GisAutoAssign) {
			alert('조건 변경이 있으므로 다시 조회 후 할당취소 하세요.');
			return;
		}
		
		if( selectedAssign.length == 0) {   
			alert("취소할 자동할당 목록을 선택하세요.");
			return;
		}
		   
		// 체크한것만 발주하기
		var chkAssign = "/";
		   
		for(var i=0; i < selectedAssign.length ; i++)  {
			chkAssign += rMateGrid.gridRoot.getItemFieldAt(Number(selectedAssign[i]), "SLIP_NO") + '/';
		}
		
		autoAssignCancel(chkAssign);
		
	});
	
});

// 페이지별 자동할당 출고 목록 조회 페이지
function gridMovePage(displayPageNo) {
	
	var gridRowsPerPage = $("#P_PAGE_DISPLAY_TOTAL").val();
	$('#P_PAGE_INDEX').val(displayPageNo);
	
	search(gridRowsPerPage, displayPageNo);
}

// 자동할당 출고 목록 조회
function search(gridRowsPerPage, goPage) {
	
	var P_CORP_CODE = $('#P_CORP_CODE').val();
	var P_STR_CODE_WMS = $('#P_STR_CODE_WMS').val();
	var P_DOUT_DT = $('#P_DOUT_DT').val();
	var P_STR_CODE_STORE = $('#P_STR_CODE_STORE').val();
//	var P_PAGE_DISPLAY_TOTAL = $('#P_PAGE_DISPLAY_TOTAL').val();
//	var P_PAGE_INDEX = $('#P_PAGE_INDEX').val();

	jQuery.ajax({ 
	    url: "/wmsAutoAssignCancelList.do",
	    type: "POST",
		datatype: "JSON",
		data: { 
			P_STR_CODE_WMS: P_STR_CODE_WMS,
			P_DOUT_DT: P_DOUT_DT, 
			P_STR_CODE_STORE: P_STR_CODE_STORE, 
			/*P_PAGE_DISPLAY_TOTAL: P_PAGE_DISPLAY_TOTAL, 
			 * P_PAGE_INDEX: P_PAGE_INDEX,*/ 
			P_CORP_CODE: P_CORP_CODE },
		beforeSend:function(x){
			CommonJs.addLodingBar("in_frame");
		},
		success:function(data) {
			
			if(data && Array.isArray(data)) {
				rMateGrid.gridObj.setData(data);
				rMateGrid2.gridObj.setData(null);
				GisAutoAssign = true;
//				drawGridPagingNavigation(data[0].TOTAL_CNT, gridRowsPerPage, goPage, "gridMovePage");
//				GstrCodeWms = P_STR_CODE_WMS; // 최종 검색 조거인 점표명을 할당
			}
			
	    },
	    complete : function(data) {
	    	CommonJs.removeLoadingBar("in_frame");
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 자동할당 취소
function autoAssignCancel(slipNos) {
	
	var P_CORP_CODE = $('#P_CORP_CODE').val();
	var P_STR_CODE_WMS = $('#P_STR_CODE_WMS').val();
	var P_DOUT_DT = $('#P_DOUT_DT').val();
	var P_STR_CODE_STORE = $('#P_STR_CODE_STORE').val();
	var P_SLIP_NO = slipNos;
	
	jQuery.ajax({ 
	    url: "/wmsAutoAssignDelete.do",
	    type: "POST",
		datatype: "JSON",
		data: { 
			P_STR_CODE_WMS: P_STR_CODE_WMS, 
			P_DOUT_DT: P_DOUT_DT, 
			P_STR_CODE_STORE: P_STR_CODE_STORE, 
			P_CORP_CODE: P_CORP_CODE,
			P_SLIP_NO: P_SLIP_NO
		},
		beforeSend:function(x){
			CommonJs.addLodingBar("in_frame");
		},
		success:function(data) {
			if(data && data.RETURN_MSG == 'FINISH') {
				alert('할당취소가 완료되었습니다.');
				gridMovePage(1);
				return;
			}
	    },
	    complete : function(data) {
	    	CommonJs.removeLoadingBar("in_frame");
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


/*********************************************************************************************************************/
/********************************************           rMate Grid 설정         **************************************************/
/*********************************************************************************************************************/
var rMateGrid = {
	assetsPath: '/resources/js/rMateGridH5/Assets/',
	gridElementId: 'gridHolder1',
	gridId: 'grid1',
	width: '100%',
	height: '300px',
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
		this.textAlign = 'center';
		this.formatter = '';
		this.childColumns = [];
	},
	getGridLayout: function() {
		var gridLayout = '<rMateGrid>\
					          <NumberFormatter id="numfmt" useThousandsSeparator="true" />\
							  <NumberFormatter id="numfmt1" useThousandsSeparator="true" rounding="nearest"  />\
								<DataGrid id="dg1" sortableColumns="true"   selectionMode="multipleRows">\
						          <columns>\
			<DataGridSelectorColumn id="selector" textAlign="center" backgroundColor="#EDEDF0"/>\
						          ';
        
		// 컬럼 추가
		gridLayout += this.renderColumn(this.gridColumns);
		
		gridLayout += '</columns>';
		
		gridLayout += '</DataGrid>\
				</rMateGrid>';
		
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
			
			if(typeof columns[i].visible !== 'undefined') 
				column += (' visible="' + columns[i].visible + '" ');
			
			if(typeof columns[i].editable !== 'undefined') 
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
		
		console.log(strColumns);
		
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
		this.rMateGrid.gridRoot = this.rMateGrid.gridObj.getRoot();               // 데이터와 그리드를 포함하는 객체
		
		this.rMateGrid.gridRoot.addEventListener("dataComplete", this.rMateGrid.gridDataCompleteHandler);
		
		this.rMateGrid.gridObj.setLayout(this.rMateGrid.getGridLayout());	  // 데이터와 그리드를 포함하는 객체
		this.rMateGrid.gridObj.setData([]);	                                                  // 초기 그리드 행추가를 위해 null 데이터 셋팅
	},
	gridDataCompleteHandler: function() {
		
		$('#gridHolder1 input[type="checkbox"]').change(function() {
			GisAutoAssign = false;
		});
		
		// 출고현황 행 더블클릭 시 발생하는 이벤트
		this.rMateGrid.gridRoot.getDataGrid().addEventListener('itemClick', function(event) {
			
			var rowIndex = event.rowIndex;
			
			var P_CORP_CODE = $('#P_CORP_CODE').val();              
		    var P_STR_CODE_WMS = this.rMateGrid.gridRoot.getItemAt(rowIndex).STR_CODE;       
		    var P_STR_CODE_STORE  = this.rMateGrid.gridRoot.getItemAt(rowIndex).DIN_STR_CODE;
		    var P_DOUT_DT = this.rMateGrid.gridRoot.getItemAt(rowIndex).DOUT_DT;
		    var P_SLIP_NO = this.rMateGrid.gridRoot.getItemAt(rowIndex).SLIP_NO;
		    dataRow1 = this.rMateGrid.gridRoot.getItemAt(rowIndex);
		    
			jQuery.ajax({ 
			    url: "/wmsAutoAssignCancelDetail.do",
			    type: "POST",
				datatype: "JSON",
				data: { 
					P_CORP_CODE: P_CORP_CODE, 
					P_STR_CODE_WMS : P_STR_CODE_WMS,
					P_STR_CODE_STORE: P_STR_CODE_STORE,
					P_DOUT_DT: P_DOUT_DT,
					P_SLIP_NO: P_SLIP_NO
				},
				beforeSend:function(x){
					CommonJs.addLodingBar("in_frame");
				},
				success:function(data) {
					console.log('출고 상세', data);
					rMateGrid2.gridObj.setData(data);
			    },
			    complete : function(data) {
			    	CommonJs.removeLoadingBar("in_frame");
			    },
			    error : function(xhr, status, error) {
			    	CommonJs.alertErrorStatus(xhr.status, error);
			    }
			});
		});
	}
};



var rMateGrid2 = {
		assetsPath: '/resources/js/rMateGridH5/Assets/',
		gridElementId: 'gridHolder2',
		gridId: 'grid2',
		width: '100%',
		height: '300px',
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
			this.textAlign = 'center';
			this.formatter = '';
			this.childColumns = [];
		},
		getGridLayout: function() {
			var gridLayout = '<rMateGrid>\
						          <NumberFormatter id="numfmt" useThousandsSeparator="true" />\
								  <NumberFormatter id="numfmt1" useThousandsSeparator="true" rounding="nearest"  />\
								  <DataGrid id="' + this.gridId + '" sortableColumns="true" editable="false" horizontalScrollPolicy="auto">\
							          <columns>\
							          ';
			
			// 컬럼 추가
			gridLayout += this.renderColumn(this.gridColumns);
			
			gridLayout += '</columns>';
			
			gridLayout += '</DataGrid>\
					</rMateGrid>';
			
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
			rMateGridH5.create(this.gridId, this.gridElementId, 'rMateOnLoadCallFunction=rMateGrid2.gridReadyHandler', this.width, this.height);
		},
		gridReadyHandler: function(id) {
			
			this.rMateGrid2.gridObj = document.getElementById(id); 
			this.rMateGrid2.gridRoot = this.rMateGrid2.gridObj.getRoot();               // 데이터와 그리드를 포함하는 객체
			
			this.rMateGrid2.gridRoot.addEventListener("dataComplete", this.rMateGrid2.gridDataCompleteHandler);
			
			this.rMateGrid2.gridObj.setLayout(this.rMateGrid2.getGridLayout());	  // 데이터와 그리드를 포함하는 객체
			this.rMateGrid2.gridObj.setData([]);	                                                  // 초기 그리드 행추가를 위해 null 데이터 셋팅
		},
		gridDataCompleteHandler: function() {
			
			this.rMateGrid.gridRoot.getDataGrid().addEventListener('itemDoubleClick', function(event) {
				
			});
		}
};

//출력
function btn_print(){
	
	//출력전표 발리데이션 체크
	//
	
//	if(dataRow1 == null || dataRow1 == undefined || dataRow1==""){
//		 alert(msgSelectData);
//		 return;
//	}
//	
	var selectorColumn = rMateGrid.gridRoot.getObjectById("selector");
	var selectedOrder = selectorColumn.getSelectedIndices();
	
	var corp_code ='';
	var str_code ='';
	var dout_dt ='';
	var slip_no ='';
	var w_str_code ='';
	for (var i = 0; i < selectedOrder.length; i++) {
		corp_code =  $("#P_CORP_CODE").val()+","+corp_code;
		str_code = rMateGrid.gridRoot.getItemFieldAt( selectedOrder[i] , "STR_CODE" )+","+str_code;
		dout_dt = rMateGrid.gridRoot.getItemFieldAt( selectedOrder[i] , "DOUT_DT" )+","+dout_dt;
		slip_no = rMateGrid.gridRoot.getItemFieldAt( selectedOrder[i] , "SLIP_NO" )+","+slip_no;
		w_str_code = rMateGrid.gridRoot.getItemFieldAt( selectedOrder[i] , "DIN_STR_CODE" )+","+w_str_code;
	
	}
	
	if(slip_no == null || slip_no == ""){
		 alert(msgSelectData);
		 return;
	}

	
	var P_CORP_CODE	= corp_code.substring(0,corp_code.length -1);
	var P_STR_CODE		= str_code.substring(0,str_code.length -1);
	var P_DOUT_DT 		= dout_dt.substring(0,dout_dt.length -1).replace(/-/gi,'');
	var P_SLIP_NO		= slip_no.substring(0,slip_no.length -1);
	var W_STR_CODE	= w_str_code.substring(0,w_str_code.length -1);
	
	var params = "?reportMode=HTML"+"&P_CORP_CODE="+P_CORP_CODE+
						"&P_STR_CODE="+P_STR_CODE+
						"&W_STR_CODE="+W_STR_CODE+
						"&P_DOUT_DT="+P_DOUT_DT+
						"&P_SLIP_NO="+P_SLIP_NO;
						; // AIViewer 파라미터
	window.open("aireportWmsAutoPrint.do" + params,'AIViewer','width=1180,height=950,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	
}


