var CommGrid = function (asId, aoProp) {

	this.id = asId;

	// 기본 jqGrid prop 를 저장
	this.prop = {
		datatype: "local",					// 로컬 데이터를 사용
		autowidth: true,					// 자동으로 width 조정
		height: 300,						// 높이
		resizable: true,					// 컬럼 사이즈를 자유자제로 조절할 수 있음
		frozon: true,						// 컬럼 틀고정 기능 사용 ( editable, multiselect 기능과 중복사용불가 )
		shrinkToFit: true,					// 그리드에 각각의 width 적용없이 꽉채우기 여부
		gridview: true,						// 처리속도를 빠르게 해준다. 시간측정시 절반가량 로딩시간 감소!!! 하지만 다음 모듈엔 사용할 수 없다!! ==> treeGrid, subGrid, afterInsertRow(event)
		loadonce: false,					// reload 여부
		rownumbers: true,					// 맨앞에 줄번호 보이기 여부
		rownumWidth: 35,					// 줄번호의 width
		scroll: 1,							// 스크롤 페이징 처리(에러발생하니 잘 고쳐서 사용 ^^;)
		rowTotal: -1,						// 결과 전부 조회하기
		rowNum: 999999,							// row 갯수
		viewrecords: false,					// 총페이지 현재페이지 정보를 노출
		sortable: true,						// 컬럼간의 위치를 바꿀수 있다. (틀고정(frozen) 기능사용시 컬럼이동 불가)
		jsonReader: { repeatitems: false },	// repeatitems : true 의 row type => [{"id":"", "cell":[{}{}{}.....]}]   // repeatitems : false 의 row type => [{}{}{}.....]
		multiselect: false,     			// 다중선택불가
		multiboxonly: false,				// 체크박스로만 체크
		footerrow: false,					// 하단합계 표시하고자 할때
		userDataOnFooter: false,			// 하단합계를 실행중 구하여 적용.
		emptyrecords:"데이터가 존재하지 않습니다."
	};
	
	this.pager = null;				// pager class instance
	
	this.rowCnt = 0;
	this.rows = null;

	this.clickedRowData = null;		// GRID 클릭 데이터 저장
	this.clickedRowId = null;		// GRID 클릭 ROWID를 저장
	this.clickedRowIndex = null;	// GRID 클릭 ROW INDEX 를 저장
	
	this.checkRowIds  = [];			// checkbox checked 인 rowid 저장배열
	this.selectRowId  = null;		// 현재 선택된 rowid를 저장
	this.bChkAll  	  = false;		// multiselect,checkboxonly 일경우 전체선택여부

	this.init(aoProp);
	
};
CommGrid.prototype.showLoading = function() {
	this.initGridData();
	$("#load_" + this.id).show();
};
CommGrid.prototype.init = function (aoProp) {
	$.extend(this.prop, aoProp);
	for (var i = 0; i < aoProp.colModel.length; i++) {
		if( Comm.containsKey(aoProp.colModel[i], "name") == false) break;
		if( Comm.containsKey(aoProp.colModel[i], "index") == false ) {
			aoProp.colModel[i].index = aoProp.colModel[i].name; 
		}
		if( Comm.containsKey(aoProp.colModel[i], "width") == false ) {
			aoProp.colModel[i].width = 100; 
		}
		if( Comm.containsKey(aoProp.colModel[i], "align") == false ) {
			aoProp.colModel[i].align = "center"; 
		}
		if( Comm.containsKey(aoProp.colModel[i], "hidden") == true ) {
			if( aoProp.colModel[i].hidden == true ) {
				aoProp.colModel[i].width = 0;
			}
		}
	}
//	if(this.prop.multiselect == true) {
//		this.prop.rownumbers = false;
//	}
		
};
CommGrid.prototype.loadGrid = function () {
	$("#" + this.id).jqGrid(this.prop);
};
CommGrid.prototype.dataBind = function (aoTrans, abMsg) {
	
	this.hideLoading();
	this.initGridData();

	if (aoTrans.header.RESULT == "SUCCESS") {
	
		this.rowCnt = aoTrans.datablock.length;
		this.rows = Comm.objectCopy(aoTrans.datablock);
		
		if (aoTrans.datablock.length > 0) {
			
			if ($("#" + this.id).get(0).p.treeGrid) {
				$("#" + this.id).get(0).addJSONData({
					total: 1,
					page: 1,
					records: aoTrans.datablock.length,
					rows: aoTrans.datablock
				});
			} else {
				$("#" + this.id).jqGrid('setGridParam', {
					datatype: 'local',
					data: aoTrans.datablock,
					rowNum: aoTrans.datablock.length
				});
			}
			// 페이저 전체갯수 세팅
			if (this.pager != null) {
				// 전체갯수를 header 에서 가져온다.
				this.pager.prop.TOTROWCNT = aoTrans.header.TOTROWCNT;
				// prop 변경후에 모든 pager변수를 초기화해야 한다.
				this.pager.initPager();
				// pager를 보여준다.
				this.pager.show();
			}
			// 합계표시
			if (Comm.containsKey(aoTrans.header, "USERDATA") == true) {
				var loData = Comm.objectCopy(aoTrans.header["USERDATA"]);
				$("#" + this.id).jqGrid("footerData", "set", loData);
			}
			
			$("#" + this.id).trigger("reloadGrid");
		
		} else {
			
			this.hideLoading();
			
			if (typeof (abMsg) != "undefined") {
				// 결과 메시지 창 띄우기
				Comm.alert("해당 검색조건으로 조회한 데이터가 존재하지 않습니다.\n다른 조건으로 검색해 주세요");
			} else {
				if (abMsg == true) {
					// 결과 메시지 창 띄우기
					Comm.alert("해당 검색조건으로 조회한 데이터가 존재하지 않습니다.\n다른 조건으로 검색해 주세요");
				}
			}
			
			// 합계빈값으로 표시
			if (Comm.containsKey(aoTrans.header, "USERDATA") == true) {
				var loData = Comm.objectCopy(aoTrans.header["USERDATA"]);
				for (var key in loData) {
					loData[key] = "";
				}
				this.sumBind(loData);
			}
			
			$("#" + this.id).trigger("reloadGrid");
			
		}
		
	} else {
		
		if( abMsg == true ) { 
			Comm.alert(aoTrans.data.ERROR);
		}
		
	}
};
CommGrid.prototype.initClickedData = function() {
	this.clickedRowData = null;
	this.clickedRowId = null;
	this.clickedRowIndex = null;
};
CommGrid.prototype.initGridData = function () {
	this.initClickedData();
	this.rowCnt = 0;
	this.rows = null;
	this.checkRowIds = [];
	$("#" + this.id).jqGrid('clearGridData');
	this.bChkAll = false;
};
CommGrid.prototype.setClickedProp = function (asRowId) {
	this.clickedRowId = asRowId;
	if (Comm.containsKey(this.prop, "grouping") == true) {
		if (this.prop["grouping"] == true) {
			this.clickedRowIndex = (this.clickedRowId - 1);
		} else {
			this.clickedRowIndex = ($('#' + $.jgrid.jqID(asRowId))[0].rowIndex - 1);
		}
	} else {
		this.clickedRowIndex = ($('#' + $.jgrid.jqID(asRowId))[0].rowIndex - 1);
	}
	this.clickedRowData = $("#" + this.id).jqGrid("getRowData", this.clickedRowId);
};
CommGrid.prototype.loading = function () {
	this.showLoading();
};
CommGrid.prototype.hideLoading = function () {
	$("#load_" + this.id).hide();
};
CommGrid.prototype.reload = function() {
	$("#" + this.id).trigger("reloadGrid");			// grid 다시로딩
	this.initClickedData();							// grid click 정보 초기화
};
CommGrid.prototype.beforeSelectRow = function(rowId,e) {
//	alert("beforeSelectRow");
	if(e.target.type == "checkbox" ) {
//		alert($('input:checkbox:checked[id^="jqg_' + this.id + '"]').length );
//		var rowIds = $("#" + this.id).jqGrid('getDataIDs');		// 전체 rowid 가져오기
		var gridId = this.id;
		this.checkRowIds = [];
		var lsrcheckRowIds = [];
		$('input:checkbox:checked[id^="jqg_' + this.id + '"]').each(function(){
			lsrcheckRowIds.push($(this).attr("id").replace("jqg_" + gridId + "_", ""));
		});
		this.checkRowIds = lsrcheckRowIds;
//		Comm.printArray("this.checkRowIds", this.checkRowIds)
//		for (var i = 0; i < rowIds.length; i++) {
//			if($("input:checkbox[id='jqg_" + this.id + "_" + rowIds[i] + "']").is(":checked")){
//				this.checkRowIds.push(rowIds[i]); 
//			}
//		}
		return false;
	} 
	else if(e.target.type == "radio" ) {
		var rowIds = $("#" + this.id).jqGrid('getDataIDs');		// 전체 rowid 가져오기
		this.checkRowIds = [];
		
		for (var i = 0; i < rowIds.length; i++) {
			if($("input:radio[id='jqg_" + this.id + "_" + rowIds[i] + "']").is(":checked")){
				this.checkRowIds = [rowIds[i]]; 
			}
		}
		return false;
	} else {
		return true;
	}
	
};
CommGrid.prototype.onSelectRow = function(rowId, status, e) {
	$("input:checkbox[id^=jqg_" + this.id + "_]").attr("checked", false);
	for (var i = 0; i < this.checkRowIds.length; i++) {
		$("input:checkbox[id='jqg_" + this.id + "_" + this.checkRowIds[i] + "']").attr("checked", true);
	}
	this.selectRowId = rowId;
	$("#cb_" + this.id).attr("checked", this.bChkAll);
	
};
CommGrid.prototype.onSelectAll = function(aRowids,status) {
	$("#" + this.id).resetSelection();
	$("#" + this.id).setSelection(this.selectRowId, true);
	this.bChkAll = status;
	if(status == true) {
		$("#cb_" + this.id).attr("checked", true);
		$("input:checkbox[id^=jqg_" + this.id + "_]").attr("checked", true);
		var rowIds = $("#" + this.id).jqGrid('getDataIDs');		// 전체 rowid 가져오기
		this.checkRowIds = [];
		for (var i = 0; i < rowIds.length; i++) {
			if($("input:checkbox[id='jqg_" + this.id + "_" + rowIds[i] + "']").is(":checked")){
				this.checkRowIds.push(rowIds[i]); 
			}
		}
	} else {  
		$("#cb_" + this.id).attr("checked", false);
		$("input:checkbox[id^=jqg_" + this.id + "_]").attr("checked", false);
		this.checkRowIds = [];
	}
};
CommGrid.prototype.setSum = function(aoMap) {
	
	var grid = $("#" + this.id);
	var loSum = {};
	for (var i = 0; i < aoMap.col.length; i++) {
		loSum[aoMap.col[i]] = grid.jqGrid('getCol',aoMap.col[i],false,'sum');
	}
	var loSumProp = {};
	
	Comm.appendObject(loSumProp, aoMap.label);
	Comm.appendObject(loSumProp, loSum);
//	Comm.printMap("loSumProp", loSumProp);
	
	grid.jqGrid('footerData','set', loSumProp);
}





//그리드 페이징 클래스
var CommGridPager = function (amArg) {

	this.refName = "";
	this.parent = null;

	this.selectFunc = null;
	this.selectFuncCallback = null;

	this.elementId = "";    // pager element id

	this.prop = {
		TOTROWCNT: 0,       // 전체ROW수
		PAGECNT: 20,        // 페이지당ROW수
		PAGENOW: 1,         // 현재PAGE번호
		BLOCKCNT: 10,       // 블록당페이지수
		BLOCKNOW: 1,        // 현재BLOCK번호
		PAGESTART: 0,       // 현재페이지시작번호
		PAGEEND: 0,         // 현재페이지끝번호
		TOTPAGECNT: 0,      // 전체페이지수
		BLOCKSTART: 1,      // BLOCK시작페이지
		BLOCKEND: 1,        // BLOCK마지막페이지
		TOTBLOCKCNT: 0,     // 전체블럭수
		PAGEPREV: 0,        // 이전페이지
		PAGENEXT: 0,        // 다음페이지
		BLOCKPREV: 0,       // 이전BLOCKCNT마지막페이지
		BLOCKNEXT: 0        // 다음BLOCKCNT첫페이지
	};

	this.init(amArg["var"], amArg["prop"]);

};
CommGridPager.prototype.bindVar = function (aoVar) {
    for (var key in aoVar) {
        this[key] = aoVar[key];
    }
};
CommGridPager.prototype.bindProp = function (aoProp) {
    for (var key in aoProp) {
        this.prop[key] = aoProp[key];
    }
};
CommGridPager.prototype.init = function (amVar, amProp) {
	this.bindVar(amVar);
	this.bindProp(amProp);
	this.initPager();
};
CommGridPager.prototype.initPager = function () {

	// 현재 BLOCK 번호
	this.prop.BLOCKNOW = parseInt(this.prop.PAGENOW / this.prop.BLOCKCNT) + ((parseInt(this.prop.PAGENOW % this.prop.BLOCKCNT) == 0) ? 0 : 1);

	// 현재페이지시작번호
	this.prop.PAGESTART = (this.prop.PAGENOW - 1) * this.prop.PAGECNT + 1;

	// 현재페이지끝번호
	this.prop.PAGEEND = this.prop.PAGENOW * this.prop.PAGECNT;
	if (this.prop.PAGEEND > this.prop.TOTROWCNT) this.prop.PAGEEND = this.prop.TOTROWCNT;

	// 전체페이지수
	this.prop.TOTPAGECNT = parseInt(this.prop.TOTROWCNT / this.prop.PAGECNT) + ((parseInt(this.prop.TOTROWCNT % this.prop.PAGECNT) == 0) ? 0 : 1);

	// BLOCK시작페이지
	this.prop.BLOCKSTART = (this.prop.BLOCKNOW - 1) * this.prop.BLOCKCNT + 1;

	// BLOCK마지막페이지
	this.prop.BLOCKEND = this.prop.BLOCKSTART + this.prop.BLOCKCNT - 1;
	if (this.prop.BLOCKEND > this.prop.TOTPAGECNT) this.prop.BLOCKEND = this.prop.TOTPAGECNT;

	// 전체블럭수
	this.prop.TOTBLOCKCNT = parseInt(this.prop.TOTPAGECNT / this.prop.BLOCKCNT) + ((parseInt(this.prop.TOTPAGECNT % this.prop.BLOCKCNT) == 0) ? 0 : 1);

	// PAGEPREV: 이전페이지 세팅 => (1페이지보다크다면) 현재 PAGE 번호 - 1
	this.prop.PAGEPREV = (this.prop.PAGENOW > 1) ? (this.prop.PAGENOW - 1) : 1;

	// PAGENEXT: 다음페이지 세팅 => (마지막페이지보다작다면) 현재 PAGE 번호 + 1
	this.prop.PAGENEXT = (this.prop.PAGENOW < this.prop.TOTPAGECNT) ? (this.prop.PAGENOW + 1) : this.prop.TOTPAGECNT;

	// 이전 BLOCK의 첫페이지로 이동
	this.prop.BLOCKPREV = (this.prop.BLOCKNOW - 2) * this.prop.BLOCKCNT + 1;
	if (this.prop.BLOCKPREV < 1) this.prop.BLOCKPREV = 1;

	// 다음 BLOCK의 첫페이지로 이동
	this.prop.BLOCKNEXT = this.prop.BLOCKNOW * this.prop.BLOCKCNT + 1;
	if (this.prop.BLOCKNEXT > this.prop.TOTPAGECNT) this.prop.BLOCKNEXT -= this.prop.BLOCKCNT;

};
CommGridPager.movePage = function (aiPageNo, asRefName) {
	top.gSite.pager[asRefName].prop.PAGENOW = aiPageNo;
	top.gSite.pager[asRefName].initPager();
	top.gSite.pager[asRefName].selectFunc(top.gSite.pager[asRefName].selectFuncCallback);
	top.gSite.pager[asRefName].show();
};
CommGridPager.prototype.show = function () {

	var lsPager = '<div class="paging_wrap01">';

	// 좌측 페이지 정보 ( 현재페이지 / 전체페이지 [전페ROW수] ) 나중에 필요하면 아래 소스를 참고한다.

	// 페이져 좌측 정보 ( 처음페이지 , 이전BLOCKCNT마지막페이지 )
	lsPager += '<span><a href="javascript:CommGridPager.movePage(1, \'' + this.refName + '\')"><img src="/resources/_img/button/paging_prive02.gif" alt="처음페이지"></a></span>';
	lsPager += '<span><a href="javascript:CommGridPager.movePage(' + this.prop.BLOCKPREV + ', \'' + this.refName + '\')"><img src="/resources/_img/button/paging_prive01.gif" alt="이전 ' + this.prop.BLOCKCNT + '개"></a></span>';

	// 페이징 ( BLOCKSTART ~ BLOCKEND )
	lsPager += '<ul>';
	for (var i = this.prop.BLOCKSTART; i <= this.prop.BLOCKEND; i++) {
		// 현재페이지
		if (this.prop.PAGENOW == i) {
			lsPager += '<li>' + i + '</li>';
		} else {
			lsPager += '<li><a href="javascript:CommGridPager.movePage(' + i + ', \'' + this.refName + '\')" title="' + i + '페이지로">' + i + '</a></li>';
		}
		
	}
	lsPager += '</ul>';
	lsPager += '<span><a href="javascript:CommGridPager.movePage(' + this.prop.BLOCKNEXT + ', \'' + this.refName + '\')"><img src="/resources/_img/button/paging_next01.gif" alt="다음 ' + this.prop.BLOCKCNT + '개"></a></span>';
	lsPager += '<span><a href="javascript:CommGridPager.movePage(' + this.prop.TOTPAGECNT + ', \'' + this.refName + '\')"><img src="/resources/_img/button/paging_next02.gif" alt="마지막페이지로"></a></span>';
	lsPager += '</div>';


	$("#" + this.elementId).html(lsPager);

};