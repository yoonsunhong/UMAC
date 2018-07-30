var CommPopup = function (asPopupId, asCallbackId, rowClickFunc, asSqlMapId) {
	
	this.ref = null;
	this.popupId = asPopupId;
	this.sqlMapId = asSqlMapId;
	this.callbackId = asCallbackId;
	this.title = "공통팝업";
	this.grid = null;
	this.width = 410;
	this.height = 410;
	this.rowClickFunc = rowClickFunc;
	
	this.init();
	
};
CommPopup.prototype.init = function () {
	top.$("#DialogCommTop").html(top.$("#" + this.popupId).html());
	top.$("#DialogCommGridDiv").html('<table id="DialogCommGrid"></table>'); 
	$("#DialogComm").html(top.$("#DialogComm").html());
};
CommPopup.prototype.searchBind = function (aoData) {
	$("#DialogCommTop").bindData(aoData);
};

CommPopup.prototype.open = function () {
	
//	Comm.alert("open : popupId : " + this.popupId);

	//###############################################################################
	//###   요기서 꼭 추가해 줘야 한다 !!!!!!!!!!!!!!!!!!!!!! (시작)
	//###############################################################################
	
	switch(this.popupId) {
	
		case "POP_CORP" :			// 회사검색공통
			this.setPOP_CORP();
			break;
		case "POP_PPTCO" :			// 참여기업검색(참여기업,단체본부,컨설턴트배정후)
			this.setPOP_PPTCO();
			break;
		case "POP_CTNT" :			// 컨설턴트검색(참여기업,단체본부,컨설턴트배정후)
			this.setPOP_CTNT();
			break;
		case "POP_CTNTCO" :			// 컨설턴트기업검색
			this.setPOP_CTNTCO();
			break;
		case "POP_DONCO" :			// 출연기업검색
			this.setPOP_DONCO();
			break;
		case "POP_RESULT_PPTCO" :			// 성과점검단에 배정된 참여기업
			this.setPOP_RESULT_PPTCO();
			break;
		case "POP_CHECKER" :			// 성과점검단에 배정된 참여기업
			this.setPOP_CHECKER();
			break;
		case "POP_FTHCONNCO" :			// 1차협력사
			this.setPOP_FTHCONNCO();
			break;
		default :
			break;
	}
	
	//###############################################################################
	//###   요기서 꼭 추가해 줘야 한다 !!!!!!!!!!!!!!!!!!!!!! (끝)
	//###############################################################################

	$("#DialogComm").dialog({
		title:  this.title,
		width: this.width,
		height: this.height,
		modal: true,
		show: "fadeIn",
		hide: "fadeOut",
		resizable: false
	});

	$("#DialogComm *[name=btnPopSearch]").click(function () {
		gDialogComm.search();
	});

	$("#DialogComm *[name=btnPopCancel]").click(function () {
		gDialogComm.close();
	});
	
	$(".ui-dialog-titlebar").addClass("pop_head");
	
};
CommPopup.prototype.search = function () {

	gDialogComm.grid.showLoading();

	var loData = $("#DialogCommTop").serializeObject();
	
	if($("#BIZ_REG_NO1").val() != undefined || $("#BIZ_REG_NO1").val() != undefined || $("#BIZ_REG_NO1").val() != undefined){
		if($("#BIZ_REG_NO1").val() != "" && $("#BIZ_REG_NO2").val() != "" && $("#BIZ_REG_NO3").val() != ""){
			loData.BIZ_REG_NO = $("#BIZ_REG_NO1").val()+"-"+$("#BIZ_REG_NO2").val()+"-"+$("#BIZ_REG_NO3").val();
		}
	}
	
	Comm.callAjax({
		DATAFORM	: null,
		DATA		: loData,
		DATABLOCK	: null,
		CMD			: "SELECT",
		SQLMAPID	: this.sqlMapId,
		TRANSKEY	: "CommPopupSearch"
	},
	function (data, context, method) {
		
		var loTrans = top.gSite.trans["CommPopupSearch"];
		
		loTrans.success(data);
		
//		Comm.printMap(loTrans.header);
//		Comm.printArrayMap(loTrans.datablock);
		
		gDialogComm.grid.dataBind(loTrans);
		
		delete top.gSite.trans["CommPopupSearch"];
		
	},
	function (data, context, method) {	// error callback
		gDialogComm.grid.hideLoading();
		Comm.alert(method);
	});
};
CommPopup.prototype.close = function () {
	$("#DialogComm").dialog("close");
};


//###############################################################################
//###   요기서 위에서 추가한 함수를 만들자 !!!!!!!!!!!!!!!!!!!!!! (시작)
//###############################################################################

//사업관련기업검색
CommPopup.prototype.setPOP_CORP = function () {

	var lsGroupGubun = $("#DialogCommTop input[name=GROUP_GUBUN]").val();	// 회사구분코드
	var lsTitle = "";	// POPUP TITLE
	var liW = 500;		// POPUP WIDTH
	var liH = 500;		// POPUP HEIGHT
	
	// 기업구분에 따른 팝업 TITLE 설정
	switch(lsGroupGubun) {
		case "02" :
			lsTitle = "참여기업";
			break;
		case "03" :
			lsTitle = "1차연계기업";
			break;
		case "05" :
			lsTitle = "단체본부";
			break;
		case "06" :
			lsTitle = "출연기업";
			break;
		case "10" :
			lsTitle = "컨설턴트회사";
			break;
		case "11" :
			lsTitle = "자체사업 업체";
			break;
		default :
			Comm.alert("기업구분코드[" + lsGroupGubun + "]가 올바르지 않습니다");
			this.close();
			break;
	}

	this.title = lsTitle;
	$("#popup_grid_title").html(lsTitle + " 목록");			// 그리드 타이틀
//	$("#DialogCommTop").css({ "height": "50px" });			// 조회영역 높이

	// 조회 label 세팅
	$("#DialogCommTop label[name=pop_search_title_01]").text(lsTitle + "명");
	
	// 높이 너비 설정
	this.width	= liW;
	this.height	= liH;
	
	// grid 생성
	this.grid = new CommGrid("DialogCommGrid", {
		colNames: [lsTitle+"코드", lsTitle+"명", "대표자명", "사업자번호"],
		colModel: [
			   		{ name: "CORP_CD", 						hidden: true },
					{ name: "CORP_NM", 		width: 150 },
					{ name: "CEO_NM",  		width: 80 },
					{ name: "BIZ_REG_NO",	width: 100 }
				  ],
		onSelectRow: this.rowClickFunc
	});
	
	this.grid.loadGrid();
	
	$("#DialogCommGrid").jqGrid('setGridWidth', this.width - 30);
	$("#DialogCommGrid").jqGrid('setGridHeight', this.height - 200);

};

/** 참여기업 조회 **/ 
CommPopup.prototype.setPOP_PPTCO = function () {

	this.width	= 600;	// POPUP WIDTH
	this.height	= 500;	// POPUP HEIGHT
	
	this.title = "참여기업 선택";		// 타이틀
	$("#popup_grid_title").html("참여기업 목록");			// 그리드 타이틀
	
	// grid 생성
	this.grid = new CommGrid("DialogCommGrid", {
		colNames: ["참여기업코드", "참여기업명", "대표자명", "사업자번호"],
		colModel: [
			   		{ name: "CORP_CD", 						hidden: true },
					{ name: "CORP_NM", 		width: 150 , align:"left"},
					{ name: "CEO_NM",  		width: 80 },
					{ name: "BIZ_REG_NO",	width: 100 }
				  ],
		onSelectRow: this.rowClickFunc
	});
	
	this.grid.loadGrid();
	
	$("#DialogCommGrid").jqGrid('setGridWidth', this.width - 30);
	$("#DialogCommGrid").jqGrid('setGridHeight', this.height - 200);

};

/** 컨설턴트 조회 **/
CommPopup.prototype.setPOP_CTNT = function () {
	
	this.width	= 500;	// POPUP WIDTH
	this.height	= 500;	// POPUP HEIGHT

	this.title =  "컨설턴트 조회";							// 타이틀
	$("#popup_grid_title").html("컨설턴트 목록");			// 그리드 타이틀

	this.grid = new CommGrid("DialogCommGrid", {
		colNames: ["컨설턴트 ID", "컨설턴트명", "휴대폰 번호", "전화번호"],
		colModel: [
	   		{ name: "CTNT_ID", hidden:true },
			{ name: "CTNT_NM" },
			{ name: "HP_NO" },
			{ name: "TEL_NO" }
		],
		onSelectRow: this.rowClickFunc
	});
	
	this.grid.loadGrid();
	
	$("#DialogCommGrid").jqGrid('setGridWidth', this.width - 30);
	$("#DialogCommGrid").jqGrid('setGridHeight', this.height - 200);

};

/** 컨설턴트 소속회사 조회 **/
CommPopup.prototype.setPOP_CTNTCO = function () {
	
	this.width	= 600;	// POPUP WIDTH
	this.height	= 500;	// POPUP HEIGHT

	this.title = "수행비용 지급처";							// 타이틀
	$("#popup_grid_title").html("컨설턴트 목록");			// 그리드 타이틀
	
	// grid 생성
	this.grid = new CommGrid("DialogCommGrid", {
		colNames: ["기업코드", "기업명", "대표자명", "사업자번호"],
		colModel: [
			   		{ name: "CORP_CD", 	hidden: true },
					{ name: "CORP_NM", 	width: 150 },
					{ name: "CEO_NM",  		width: 80 },
					{ name: "BIZ_REG_NO",	width: 100 }
				  ],
		onSelectRow: this.rowClickFunc
	});
	
	this.grid.loadGrid();
	
	$("#DialogCommGrid").jqGrid('setGridWidth', this.width - 30);
	$("#DialogCommGrid").jqGrid('setGridHeight', this.height - 200);

};

/** 출연기업 조회 **/ 
CommPopup.prototype.setPOP_DONCO = function () {

	this.width	= 600;	// POPUP WIDTH
	this.height	= 500;	// POPUP HEIGHT

	this.title = "출연기업 선택";							// 타이틀
	$("#popup_grid_title").html("출연기업 목록");			// 그리드 타이틀
	
	// grid 생성
	this.grid = new CommGrid("DialogCommGrid", {
		colNames: ["출연기업코드", "출연부서코드","출연기업명","대표자명", "사업자번호"],
		colModel: [
			   		{ name: "CORP_CD", 		hidden: true },
			   		{ name: "DONCO_DEPT_CD", 		hidden: true },
					{ name: "CORP_NM", 		width: 150 },
					{ name: "CEO_NM",  		width: 80 },
					{ name: "BIZ_REG_NO",	width: 100 }
				  ],
		onSelectRow: this.rowClickFunc
	});
	
	this.grid.loadGrid();
	
	$("#DialogCommGrid").jqGrid('setGridWidth', this.width - 30);
	$("#DialogCommGrid").jqGrid('setGridHeight', this.height - 200);

};

/** 1차협력사 조회 **/ 
CommPopup.prototype.setPOP_FTHCONNCO = function () {

	this.width	= 600;	// POPUP WIDTH
	this.height	= 500;	// POPUP HEIGHT

	this.title = "1차협력사 선택";							// 타이틀
	$("#popup_grid_title").html("1차협력사 목록");			// 그리드 타이틀
	
	// grid 생성
	this.grid = new CommGrid("DialogCommGrid", {
		colNames: ["1차협력사코드", "1차협력사명","대표자명", "사업자번호"],
		colModel: [
			   		{ name: "CORP_CD", 		hidden: true },
			   		/*{ name: "DONCO_DEPT_CD", 		hidden: true },*/
					{ name: "CORP_NM", 		width: 150 },
					{ name: "CEO_NM",  		width: 80 },
					{ name: "BIZ_REG_NO",	width: 100 }
				  ],
		onSelectRow: this.rowClickFunc
	});
	
	this.grid.loadGrid();
	
	$("#DialogCommGrid").jqGrid('setGridWidth', this.width - 30);
	$("#DialogCommGrid").jqGrid('setGridHeight', this.height - 200);

};

/** 성과점검단에 배정된 참여기업 조회 - add : seok **/ 
CommPopup.prototype.setPOP_RESULT_PPTCO = function () {

	this.width	= 600;	// POPUP WIDTH
	this.height	= 500;	// POPUP HEIGHT
	
	this.title = "참여기업 선택";		// 타이틀
	$("#popup_grid_title").html("참여기업 목록");			// 그리드 타이틀
	
	// grid 생성
	this.grid = new CommGrid("DialogCommGrid", {
		colNames: ["참여기업코드", "참여기업명", "대표자명", "사업자번호"],
		colModel: [
			   		{ name: "CORP_CD", 						hidden: true },
					{ name: "CORP_NM", 		width: 150 , align:"left"},
					{ name: "CEO_NM",  		width: 80 },
					{ name: "BIZ_REG_NO",	width: 100 }
				  ],
		onSelectRow: this.rowClickFunc
	});
	
	this.grid.loadGrid();
	
	$("#DialogCommGrid").jqGrid('setGridWidth', this.width - 30);
	$("#DialogCommGrid").jqGrid('setGridHeight', this.height - 200);

};

/** 성과점검위원 조회 - add : seok **/ 
CommPopup.prototype.setPOP_CHECKER = function () {

	this.width	= 600;	// POPUP WIDTH
	this.height	= 500;	// POPUP HEIGHT
	
	this.title = "점검위원 선택";		// 타이틀
	$("#popup_grid_title").html("점검위원 목록");			// 그리드 타이틀
	
	// grid 생성
	this.grid = new CommGrid("DialogCommGrid", {
		colNames: ["점검위원아이디", "점검위원", "휴대폰번호", "회사"],
		colModel: [
			   		{ name: "CHECKER_ID", 	hidden: true },
					{ name: "CHECKER_NM", 	width: 150 , align:"center"},
					{ name: "HP_NO",  		width: 80 },
					{ name: "REF_CORP_NM",	width: 100 }
				  ],
		onSelectRow: this.rowClickFunc
	});
	
	this.grid.loadGrid();
	
	$("#DialogCommGrid").jqGrid('setGridWidth', this.width - 30);
	$("#DialogCommGrid").jqGrid('setGridHeight', this.height - 200);

};


//###############################################################################
//###   요기서 위에서 추가한 함수를 만들자 !!!!!!!!!!!!!!!!!!!!!! (끝)
//###############################################################################