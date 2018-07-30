/********************************************************
 * 설명:  자동할당(R1)
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

$(document).ready(function() {
	
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 점포 바인딩
	getStoreCodeFlag("P_STR_CODE_WMS", "3");
	getStoreCode("P_STR_CODE_STORE");
	
	$('#P_STR_CODE_STORE option[value="10030"]').remove();
	
	// 달력 컨트롤 바인딩
	$("#P_DOUT_DT").datepicker({
		onSelect: function(dateText) {
		}, 	 
		showMonthAfterYear: true 
	});
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	$("#P_DOUT_DT").val(date);
	
	
	// 출고현황 그리드 레이아웃 설정
	rMateGrid.gridColumns = [
	               new rMateGrid.RMateGridColumn('G_NO', 'NO', 'No', '50'),
	               new rMateGrid.RMateGridColumn('G_DOUT_DT', 'DOUT_DT', '출고예정일자', '100'),
	               new rMateGrid.RMateGridColumn('G_SLIP_NO', 'SLIP_NO', '출고번호', '150'),
	               new rMateGrid.RMateGridColumn('G_STR_CODE', 'STR_CODE', '점포코드', '100'),
	               new rMateGrid.RMateGridColumn('G_STR_NAME', 'STR_NAME', '점포명', '100'),
	               new rMateGrid.RMateGridColumn('G_RELEASE_CNT', 'RELEASE_CNT', '출고건수', '100'),
	               new rMateGrid.RMateGridColumn('G_TOTAL_AMT', 'TOTAL_AMT', '총출고금액', '100'),
	               new rMateGrid.RMateGridColumn('G_ROUTE_GB', 'ROUTE_GB', '배송구분', '100')
               	];
	
	rMateGrid.gridColumns[5].textAlign = 'right';
	rMateGrid.gridColumns[5].formatter = '{numfmt}';
	rMateGrid.gridColumns[6].textAlign = 'right';
	rMateGrid.gridColumns[6].formatter = '{numfmt}';
	
	// 그리드 바인딩
	rMateGrid.createGrid();
	
	// 재고현황 그리드 레이아웃 설정
	rMateGrid2.gridColumns = [
	      	               new rMateGrid2.RMateGridColumn('G_LINK_CODE', 'LINK_CODE', 'SCAN 코드', '150'),
	      	               new rMateGrid2.RMateGridColumn('G_ITM_NAME', 'ITM_NAME', '상품명', '250'),
	      	               new rMateGrid2.RMateGridColumn('G_TOT_DOUT_CFM_QTY', 'TOT_DOUT_CFM_QTY', '총 발주수량', '150'),
	      	               new rMateGrid2.RMateGridColumn('G_TOT_INV_QTY', 'TOT_INV_QTY', '실시간 재고 현황', '150')
                     	];
	
	rMateGrid2.gridColumns[1].textAlign = 'left';
  	rMateGrid2.gridColumns[2].textAlign = 'right';
  	rMateGrid2.gridColumns[2].formatter = '{numfmt}';
  	rMateGrid2.gridColumns[3].textAlign = 'right';
  	rMateGrid2.gridColumns[3].formatter = '{numfmt}';
	      	
  	// 그리드 바인딩
  	rMateGrid2.createGrid();
	
	$('#btn_search').click(function() {
		gridMovePage(1);
	});
	
	$('#btn_stock_search').click(function() {
		
		GisAutoAssign = false; // 자동할당 생성 불가능
		selectorColumn  = rMateGrid.gridRoot.getObjectById("selector"); 
		var selectedAssign = selectorColumn .getSelectedIndices();
		   
		if( selectedAssign.length == 0) {   
			alert("출고목록을 선택하세요.");
			return;
		}
		   
		// 체크한것만 발주하기
		var chkAssign = "/";
		   
		for(var i=0; i < selectedAssign.length ; i++)  {
			chkAssign += rMateGrid.gridRoot.getItemFieldAt(Number(selectedAssign[i]), "SLIP_NO") + '/';
		}
			
		stockSearch(chkAssign);
	});
	
	// 자동할당 생성 버튼 클릭
	$('#btn_auto_assign').click(function() {
		
		if(GisAutoAssign) {
			
			var P_CORP_CODE = $('#P_CORP_CODE').val();
			var P_STR_CODE_WMS = GstrCodeWms;
			var P_SLIP_NO = GchkAssign;

			jQuery.ajax({ 
			    url: "/wmsAutoAssignCreate.do",
			    type: "POST",
				datatype: "JSON",
				data: { 
					P_STR_CODE_WMS: P_STR_CODE_WMS, 
					P_SLIP_NO : P_SLIP_NO,
				    P_CORP_CODE: P_CORP_CODE
				},
				beforeSend:function(x){
					CommonJs.addLodingBar("in_frame");
				},
				success:function(data) {
					
					if(data.RETURN_CODE < 0) {
						alert(data.RETURN_MSG);
						return;
					}
					else if(data.RETURN_CODE == 0) {
						alert('자동할당된 내역이 없습니다.');
						return;
					}
					else {
						alert('자동할당 되었습니다.');
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
		else {
			alert('재고현황을 확인하세요.');
			return;
		}
		
	});
});

// 출고목록 조회
function search(gridRowsPerPage, goPage) {
	
	var P_CORP_CODE = $('#P_CORP_CODE').val();
	var P_STR_CODE_WMS = $('#P_STR_CODE_WMS').val();
	var P_DOUT_DT = $('#P_DOUT_DT').val();
	var P_STR_CODE_STORE = $('#P_STR_CODE_STORE').val();
	var P_PAGE_DISPLAY_TOTAL = $('#P_PAGE_DISPLAY_TOTAL').val();
	var P_PAGE_INDEX = $('#P_PAGE_INDEX').val();

	jQuery.ajax({ 
	    url: "/wmsAutoAssignList.do",
	    type: "POST",
		datatype: "JSON",
		data: { P_STR_CODE_WMS: P_STR_CODE_WMS, P_DOUT_DT: P_DOUT_DT, P_STR_CODE_STORE: P_STR_CODE_STORE, P_PAGE_DISPLAY_TOTAL: P_PAGE_DISPLAY_TOTAL, P_PAGE_INDEX: P_PAGE_INDEX, P_CORP_CODE: P_CORP_CODE },
		beforeSend:function(x){
			CommonJs.addLodingBar("in_frame");
		},
		success:function(data) {
			
			if(data && Array.isArray(data)) {
				rMateGrid.gridObj.setData(data);
				
				// 데이터 한건 이상 조회시 페이징 처리
				if(data.length > 0) {
					drawGridPagingNavigation(data[0].TOTAL_CNT, gridRowsPerPage, goPage, "gridMovePage");
					GstrCodeWms = P_STR_CODE_WMS; // 최종 검색 조거인 점표명을 할당
				}
			}
			
			rMateGrid2.gridObj.setData(null);
			
	    },
	    complete : function(data) {
	    	CommonJs.removeLoadingBar("in_frame");
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 출고목록 조회 페이지
function gridMovePage(displayPageNo) {
	
	var gridRowsPerPage = $("#P_PAGE_DISPLAY_TOTAL").val();
	$('#P_PAGE_INDEX').val(displayPageNo);
	
	search(gridRowsPerPage, displayPageNo);
}

// 재고현황 리스트
function stockSearch(slipNos) {
	
	var P_CORP_CODE = $('#P_CORP_CODE').val();
	var P_STR_CODE_WMS = GstrCodeWms;
	var P_SLIP_NO = slipNos;

	jQuery.ajax({ 
	    url: "/wmsAutoStockList.do",
	    type: "POST",
		datatype: "JSON",
		data: { 
			P_STR_CODE_WMS: P_STR_CODE_WMS, 
			P_SLIP_NO : P_SLIP_NO,
		    P_CORP_CODE: P_CORP_CODE
		},
		beforeSend:function(x){
			CommonJs.addLodingBar("in_frame");
		},
		success:function(data) {
			
			if(data && data.length > 0) {
				rMateGrid2.gridObj.setData(data);
				
				//GisAutoAssign = true;
				//GchkAssign = slipNos;
				
			}
			else {
				alert('자동할당이 가능합니다.');
				
				GisAutoAssign = true;
				GchkAssign = slipNos;
				rMateGrid2.gridObj.setData(null);
				
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

// 

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
							  <DataGrid id="' + this.gridId + '" sortableColumns="true" editable="false" horizontalScrollPolicy="auto">\
						          <columns>\
						              <DataGridSelectorColumn id="selector" width="40" textAlign="center" headerText="선택" backgroundColor="#EDEDF0" allowAllSelection="false" secondLabelJsFunction="secondLabelFunc" showDataTips="true" />\
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
		
		this.rMateGrid.gridRoot.getDataGrid().addEventListener('itemDoubleClick', function(event) {
			
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


