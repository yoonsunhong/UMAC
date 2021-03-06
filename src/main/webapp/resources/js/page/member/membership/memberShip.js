// ----------------------- 그리드 설정 시작 -------------------------------------
$(document).ready(function() {
	
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	// 회원명 입력창 엔터시
	$("#P_CUST_NAME").keydown(function(key) {
		if(key.keyCode == 13) {
			btn_comm_user_search();
		}
	});
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	// 회원 구분
	getCommonCodeSelectBoxList("P_BUSI_FLAG", "BUSI_FLAG");
	// 회원 등급
	getCommonCodeSelectBoxList("P_MBR_GRADE", "MBR_GRADE");
	// 업종 유형
	getCommonCodeSelectBoxList("P_INDUST_FLAG", "INDUST_FLAG");
	// 할인 적용
	getCommonCodeSelectBoxList("P_MBR_DC_YN", "MBR_DC_YN");
	// 외상 가능 여부
	getCommonCodeSelectBoxList("P_CREDIT_USE_YN", "CREDIT_USE_YN");
	// 포인트 사용
	getCommonCodeSelectBoxList("P_POINT_USE_YN", "POINT_USE_YN");
	
	// grid 컬럼 설정
	rMateGrid.gridColumns = [
				               new rMateGrid.RMateGridColumn('G_STR_CODE'		, 'STR_CODE'		, '점포코드'		, '70'),
				               new rMateGrid.RMateGridColumn('G_STR_NAME'		, 'STR_NAME'		, '점포명'			, '80'),
				               new rMateGrid.RMateGridColumn('G_CUST_NO'		, 'CUST_NO'			, '회원번호'		, '100'),
				               new rMateGrid.RMateGridColumn('G_CUST_NAME'		, 'CUST_NAME'		, '회원명'			, '100'),
				               new rMateGrid.RMateGridColumn('G_BUSI_FLAG'		, 'BUSI_FLAG'		, '회원구분코드'	, '100'),
				               new rMateGrid.RMateGridColumn('G_BUSI_FLAG_NM'	, 'BUSI_FLAG_NM'	, '회원구분'		, '100'),
				               new rMateGrid.RMateGridColumn('G_MBR_GRADE'		, 'MBR_GRADE'		, '회원등급'		, '100'),
				               new rMateGrid.RMateGridColumn('G_INDUST_FLAG'	, 'INDUST_FLAG'		, '업종유형'		, '100'),
				               new rMateGrid.RMateGridColumn('G_TEL_NO'			, 'TEL_NO'			, '전화번호'		, '100'),
				               new rMateGrid.RMateGridColumn('G_MOBIL_NO'		, 'MOBIL_NO'		, '휴대전화1'		, '100'),
				               new rMateGrid.RMateGridColumn('G_MOBIL_NO1'		, 'MOBIL_NO1'		, '휴대전화2'		, '100'),
				               new rMateGrid.RMateGridColumn('G_BUSI_NO'		, 'BUSI_NO'			, '사업자번호'		, '100'),
				               new rMateGrid.RMateGridColumn('CUST_STATUS'		, 'CUST_STATUS'		, '회원상태'		, '80'),
				               new rMateGrid.RMateGridColumn('G_TO_DT'			, 'TO_DT'			, '최종거래일'		, '100'),
				               new rMateGrid.RMateGridColumn('G_SALE_UPOINT'	, 'SALE_UPOINT'		, '가용포인트'		, '100'),
				               new rMateGrid.RMateGridColumn('G_MBR_DC_YN'		, 'MBR_DC_YN'		, '할인적용'		, '80'),
				               new rMateGrid.RMateGridColumn('G_CREDIT_USE_YN'	, 'CREDIT_USE_YN'	, '외상유무'		, '80'),
				               new rMateGrid.RMateGridColumn('G_POINT_USE_YN'	, 'POINT_USE_YN'	, '포인트사용'		, '80'),
				               new rMateGrid.RMateGridColumn('G_SMS_YN'			, 'SMS_YN'			, '이메일수신'		, '80'),
				               new rMateGrid.RMateGridColumn('G_POST_NO'		, 'POST_NO'			, '우편번호'		, '80'),
				               new rMateGrid.RMateGridColumn('G_ADDR'			, 'ADDR'			, '주소'			, '300'),
				               new rMateGrid.RMateGridColumn('G_ADDR_DTL'		, 'ADDR_DTL'		, '상세주소'		, '100')
			               	];
	
	rMateGrid.gridColumns[4].visible 	= 'false';
	rMateGrid.gridColumns[14].textAlign = 'right';
	rMateGrid.gridColumns[14].formatter = '{numfmt}';
	rMateGrid.gridColumns[20].textAlign = 'left';
	rMateGrid.gridColumns[21].textAlign = 'left';
	
	// grid 바인딩
	rMateGrid.createGrid();
	
	$("#btn_search").click(function() {
		gridMovePage(1);
	});
	
});

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
		this.id 		= id;
		this.dataField 	= dataField;
		this.headerText = headerText;
		this.width 		= width;
		this.visible 	= true;
		this.editable 	= false;
		this.textAlign 	= 'center';
		this.formatter 	= '';
	},
	getGridLayout: function() {
		var gridLayout = '<rMateGrid>\
					          <NumberFormatter id="numfmt" useThousandsSeparator="true" />\
							  <DataGrid id="' + this.gridId + '" sortableColumns="true" editable="false" horizontalScrollPolicy="auto" showDeletedRows="true" doubleClickEnabled="true" selectionMode="multipleRows">\
						  <columns>';
		
		for(var i = 0; i < this.gridColumns.length; i++) {
			var column = '<DataGridColumn';
			
			if(this.gridColumns[i].id) 
				column += (' id="' + this.gridColumns[i].id + '" ');
			
			if(this.gridColumns[i].dataField) 
				column += (' dataField="' + this.gridColumns[i].dataField + '" ');
			
			if(this.gridColumns[i].headerText) 
				column += (' headerText="' + this.gridColumns[i].headerText + '" ');
			
			if(this.gridColumns[i].width) 
				column += (' width="' + this.gridColumns[i].width + '" ');
			
			if(this.gridColumns[i].visible) 
				column += (' visible="' + this.gridColumns[i].visible + '" ');
			
			if(this.gridColumns[i].editable) 
				column += (' editable="' + this.gridColumns[i].editable + '" ');
			
			if(this.gridColumns[i].textAlign) 
				column += (' textAlign="' + this.gridColumns[i].textAlign + '" ');
			
			if(this.gridColumns[i].formatter) 
				column += (' formatter="' + this.gridColumns[i].formatter + '" ');
			
			column += '/>';
			gridLayout += column;
		}
		
		gridLayout += '</columns>\
						</DataGrid>\
				</rMateGrid>';
		
		return gridLayout;
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
			
			var rowIndex = event.rowIndex;
			
			parent.Tabs_On('memberInfo.do', '회원정보관리', 'memberInfo.do?CUST_NO=' + this.rMateGrid.gridRoot.getItemAt(rowIndex).CUST_NO, 'true', [{ type: 'function', name: 'getMemberInfoSet', parameter: { CUST_NO: this.rMateGrid.gridRoot.getItemAt(rowIndex).CUST_NO } }]);
		});
	},
	gridRowClickHandler: function() {
		console.log(arguments);
	}
};

//(회원검색) 팝업 호출 function
function btn_comm_user_search() {
	$("#comm_pop_wrap20").dialog("open");
	gridApp29.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM20").val("fn_comm_user_callback(dataRow29)");
	
	if($("#P_CUST_NAME").val()) {
		$("#P_TEXT20").val($("#P_CUST_NAME").val());
		btn_comm_search('20');
	}
}

// 회원검색 팝업에서 그리드 로우를 클릭했을 경우 발생하는 이벤트
function fn_comm_user_callback(dataRow) {
	$("#P_CUST_NO").val(dataRow.CUST_NO);     // 회원번호	
	$("#P_CUST_NAME").val(dataRow.CUST_NAME); // 회원명		
	gridMovePage(1);
}

// 조회
function search(gridRowsPerPage, goPage) {
	var param = $("#search_frm").serializeAllObject();
	
	param.P_STR_CODE = $("#P_STR_CODE").val();

	jQuery.ajax({ 
	    url: "/memberShipList.do",
	    type: "POST",
		datatype: "JSON",
		data: param,
		beforeSend:function(x){
			CommonJs.addLodingBar("in_frame");
		},
		success:function(data) {
			if(data) { 
				rMateGrid.gridObj.setData(data);
				if(data.length > 0)
					drawGridPagingNavigation(data[0].TOTAL_CNT, gridRowsPerPage, goPage, "gridMovePage");
			}
			$("#P_CUST_NO").val('');
	    },
	    complete : function(data) {
	    	CommonJs.removeLoadingBar("in_frame");
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function gridMovePage(displayPageNo) {
	
	var gridRowsPerPage = $("#P_PAGE_DISPLAY_TOTAL").val();
	$('#P_PAGE_INDEX').val(displayPageNo);
	
	search(gridRowsPerPage, displayPageNo);
}