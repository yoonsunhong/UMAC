/********************************************************
 * 설명:  회원정보 > 멤버십관리 > 회원정보관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.01.19
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "155px");
rMateGridH5.create("grid2", "gridHolder2", jsVars1, "100%", "120px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

// 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var gridApp2, gridRoot2, dataGrid2, dataRow2, selectorColumn2;
var collection1, collection2; // 그리드의 데이터 객체
var tabType = "P";		// 탭클릭 구분 (P : 개인, B : 사업자)

//그리드1 레디 핸들러
function gridReadyHandler(id) {
	// rMateGrid 관련 객체
	
	if(id == "grid1")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp1.setLayout(layoutStr1);	// 데이터와 그리드를 포함하는 객체
		gridApp1.setData([]);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
	else if(id == "grid2")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (사업자탭)
		gridApp2 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot2 = gridApp2.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp2.setLayout(layoutStr2);
		gridApp2.setData([]);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot2.addEventListener("layoutComplete", layoutCompleteHandler2);
		gridRoot2.addEventListener("dataComplete", dataCompleteHandler2);
	}
	
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	var USE_YN1 = gridRoot1.getObjectById("USE_YN1");
	USE_YN1.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("USE_YN") );
	
	var STR_CODE1 = gridRoot1.getObjectById("STR_CODE1");
	STR_CODE1.setItemRendererDataProvider( getStoreCodeGrid() );
	
	var CARD_ISSUE_FLAG1 = gridRoot1.getObjectById("CARD_ISSUE_FLAG1");
	CARD_ISSUE_FLAG1.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("CARD_ISSUE_FLAG") );
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
}

function layoutCompleteHandler2() {
	dataGrid2 = gridRoot2.getDataGrid();  // 그리드 객체
	
	var USE_YN2 = gridRoot2.getObjectById("USE_YN2");
	USE_YN2.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("USE_YN") );
	
	var STR_CODE2 = gridRoot2.getObjectById("STR_CODE2");
	STR_CODE2.setItemRendererDataProvider( getStoreCodeGrid() );
	
	var CARD_ISSUE_FLAG2 = gridRoot2.getObjectById("CARD_ISSUE_FLAG2");
	CARD_ISSUE_FLAG2.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("CARD_ISSUE_FLAG") );
	
	//
	if($('#CUST_NO').val()) {
		getMemberInfoSet($('#CUST_NO').val());
		$('#CUST_NO').val('');
	}
}

//그리드2 컴플릿트 핸들러
function dataCompleteHandler2(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection2 = gridRoot2.getCollection();
	
}

//itemEditEndJsFunction 기능을 이용하여 에티팅후 값을 받아 편집 적용여부를 제어할 수 있습니다.
//rowIndex: 해당 행의 index번호
//columnIndex: 해당 열의 index번호
//item: 해당 행의 data 객체
//dataField: 필드명
//oldValue: 수정전의 값
//newValue: 수정후의 값
//reason: 수정이 끝난 이유 (cancelled : 사용자가 수정 취소, sameValue : 같은 값을 유지, newColumn : 수정후 다른 열로 이동, newRow : 수정후 다른 행으로 이동, other : 포커스 이동이나 설정값 변경등등)
//에러메세지를 반환할 경우 에디팅 결과가 반영되지 않으며 해당 셀에 에러메세지가 표시되며, null을 반환할 경우 에디팅 결과가 적용됩니다.
function itemEditEndFunction(rowIndex, columnIndex, item, dataField, oldValue, newValue, reason) {
	// 실제 수정이 안 일어났으면 return
	if (reason == "cancelled" || reason == "sameValue")
		return null;
	
	/*if (columnIndex == 3) {
		if (newValue == "GMC-1 Release2")
		return "GMC-1 Release2는 선택할 수 없습니다";
	} else if (columnIndex == 6) {
		if (newValue == null || newValue == "")
			return dataField + "값을 입력하시기 바랍니다.";
	if (isNaN(Number(newValue)))
		return dataField + "값은 숫자만 가능합니다.";
	if (newValue < 1000)
		
	}*/
	
	if (columnIndex == 2)
	{
		if (newValue == null || newValue == "")
		{
			return "카드번호를 입력하시기 바랍니다.";
		}
		
		if (newValue.length != 12)
		{
			return "카드번호는 12 자리로 입력하셔야 합니다.";
		}
	}
	
	return null;
}

//<DataGridColumn dataField="Selected" headerText="'+select+'" itemRenderer="CheckBoxItem" rendererIsEditor="true" editorDataField="selected" width="40" textAlign="center" backgroundColor="#EDEDF0"/>\
//그리드1 헤더 및 레이아웃 (개인탭)
var layoutStr1 =
	'<rMateGrid>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg1" editable="true" doubleClickEnabled="true" itemEditEndJsFunction="itemEditEndFunction" >\
			<columns>\
				<DataGridRowStateColumn id="rowState" textAlign="center"/>\
				<DataGridColumn id="USE_YN1" dataField="USE_YN" headerText="'+useYn+'" textAlign="center" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="MBR_CARD_NO" headerText="'+cardNo+'" textAlign="center" maxChars="12" type="int"  />\
				<DataGridColumn id="STR_CODE1" dataField="STR_CODE" headerText="'+issueStore+'" textAlign="center" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="FROM_DT" headerText="'+issueDate+'" textAlign="center" formatter="{datefmt}" itemEditor="DateEditor" />\
				<DataGridColumn id="CARD_ISSUE_FLAG1" dataField="CARD_ISSUE_FLAG" headerText="'+cardIssuanceReason+'" textAlign="left" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="IDATE" headerText="'+inputDate+'" textAlign="center" editable="false" formatter="{datefmt}" />\
				<DataGridColumn dataField="USER_NM" headerText="'+inputName+'" textAlign="center" editable="false" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CUST_NO" headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//그리드1 헤더 및 레이아웃 (사업자탭)
var layoutStr2 =
	'<rMateGrid>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<DataGrid id="dg2" editable="true" doubleClickEnabled="true" itemEditEndJsFunction="itemEditEndFunction" >\
			<columns>\
				<DataGridRowStateColumn id="rowState" textAlign="center"/>\
				<DataGridColumn id="USE_YN2" dataField="USE_YN" headerText="'+useYn+'" textAlign="center" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="MBR_CARD_NO" headerText="'+cardNo+'" textAlign="center" maxChars="12" type="int" />\
				<DataGridColumn id="STR_CODE2" dataField="STR_CODE" headerText="'+issueStore+'" textAlign="center" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="FROM_DT" headerText="'+issueDate+'" textAlign="center" formatter="{datefmt}" itemEditor="DateEditor" />\
				<DataGridColumn id="CARD_ISSUE_FLAG2" dataField="CARD_ISSUE_FLAG" headerText="'+cardIssuanceReason+'" textAlign="left" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="IDATE" headerText="'+inputDate+'" textAlign="center" editable="false" formatter="{datefmt}" />\
				<DataGridColumn dataField="USER_NM" headerText="'+inputName+'" textAlign="center" editable="false" />\
				<DataGridColumn dataField="CORP_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE" headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="CUST_NO" headerText="" textAlign="center" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';
//----------------------- 그리드 설정 끝 -----------------------

//회원포인트 행추가
function fn_addRow() {
	
	if($("#"+tabType+"_CUST_NO").val() == "")
	{
		alert("회원 등록 후 멤버십카드 등록이 가능합니다!");
		return;
	}
	
	var item = { "USE_YN" : "Y"
					, "MBR_CARD_NO" : ""
					, "STR_CODE" : $("#"+tabType+"_STR_CODE").val()
					, "FROM_DT" : new CommDateManager().getDate("yyyy-mm-dd")
					, "CARD_ISSUE_FLAG" : "1"
				};
	
	if(tabType == "P")		// 개인탭
	{
		/* addItemAt(item, index, ediMode, editColumnNo)
		 * item	: 등록할 행의 data객체
		 * index : 등록할 행의 index번호, 넣지 않거나 -1을 넣어주면 맨마지막에 등록합니다.
		 * ediMode : 등록을 수행한 후 해당 행의 수정모드로 전환할지 여부. (기본값 : true)
		 * editColumnNo : 등록을 수행한 후 수정모드로 전환할 컬럼의 번호. (기본값 : -1)
		 */
		gridRoot1.addItemAt(item, -1, true, 1);
	}
	else if(tabType == "B")	// 사업자탭
	{
		gridRoot2.addItemAt(item, -1, true, 1);
	}
}

//회원포인트 행삭제
function fn_delRow() {
	
	var lastRollOverIndex;
	if(tabType == "P")		// 개인탭
	{
		lastRollOverIndex = gridRoot1.getLastRollOverIndex();
        if (lastRollOverIndex >= 0)
        {
        	//gridRoot2.removeItemAt(lastRollOverIndex);
        	gridRoot1.removeItemAt();
        }
        else
        {
        	alert(msgDeleteRowSel);	// 삭제할 행을 선택해주세요.
        }
	}
	else if(tabType == "B")		// 사업자탭
	{
		lastRollOverIndex = gridRoot2.getLastRollOverIndex();
		if (lastRollOverIndex >= 0)
		{
			//gridRoot2.removeItemAt(lastRollOverIndex);
			gridRoot2.removeItemAt();
		}
		else
		{
			alert(msgDeleteRowSel); // 삭제할 행을 선택해주세요.
		}
	}
}

// 회원이름으로 조회 (카운트)
function getMemberInfoCnt() 
{
	var param = $("#sertch_frm").serializeArray();
	
	var rs = null;
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberInfoCount.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			
			if(typeof data != "undefiend" && data != null)
			{
				rs = data;
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	return rs;
}

// 휴대폰 중복 체크
function fn_moblieChk()
{
	var mob1 = $("#"+tabType+"_MOBIL_NO_1").val();
	var mob2 = $("#"+tabType+"_MOBIL_NO_2").val();
	var mob3 = $("#"+tabType+"_MOBIL_NO_3").val();
	
	if(mob1 == null || mob1 == "")
	{
		alert(mobilePhoneNumber + msgConfirm);
		$("#"+tabType+"_MOBIL_NO_1").focus();
		return;
	}
	
	if(mob2 == null || mob2 == "")
	{
		alert(mobilePhoneNumber + msgConfirm);
		$("#"+tabType+"_MOBIL_NO_2").focus();
		return;
	}
	
	if(mob3 == null || mob3 == "")
	{
		alert(mobilePhoneNumber + msgConfirm);
		//$("#"+tabType+"_MOBIL_NO_3").focus();
		return;
	}
	
	$("#S_MOBIL_NO").val(mob1+mob2+mob3);
	var param = $("#sertch_frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({
	    url:"/memberPhoneCount.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend:function(x){
			CommonJs.addLodingBar("in_frame");
		},
		success:function(data){
			
			if(typeof data.count != "undefiend" && data.count != null)
			{
				if(data.count > 0)
				{
					alert("동일한 휴대폰번호가 존재 합니다.");
				}
				else
				{
					alert("미사용 휴대폰번호 입니다.");
				}
			}
			else
			{
				alert(msgErrorDefault);
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

// 사업자 중복체크
function fn_businoChk()
{
	if($("#B_BUSI_NO").val() == null || $("#B_BUSI_NO").val() == "")
	{
		alert(busiNo + msgConfirm);
		//$("#B_BUSI_NO").focus();
		return;
	}
	
	if(CommonJs.checkBusiNo($("#B_BUSI_NO").val()) == false)
	{
		alert("사업자번호가 유효하지 않습니다.");
		//$("#B_BUSI_NO").focus();
		return;
	}
	
	var param = $("#frm2").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({
	    url:"/memberBusiNoCount.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend:function(x){
			CommonJs.addLodingBar("in_frame");
		},
		success:function(data){
			
			if(typeof data.count != "undefiend" && data.count != null)
			{
				if(data.count > 0)
				{
					alert("등록된 사업자번호 입니다.");
				}
				else
				{
					alert("등록되지 않은 사업자번호 입니다.");
				}
			}
			else
			{
				alert(msgErrorDefault);
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

// 회원번호로 조회
function getMemberInfoSet(cust_no)
{
	// APPLY, CALL 함수로 실행된 함수일 경우 cust_no 값을 변경한다.
	if(!cust_no) {
		cust_no = this.CUST_NO;
	}
	
	if(typeof cust_no == "undefiend" || cust_no == null || cust_no == "") {
		return;
	}
	
	$("#S_CUST_NO").val(cust_no);
	var dataRow = getMemberInfo();
	fn_comm_user_callback_S(dataRow);
}

// 회원번호로 조회
function getMemberInfo() 
{
	var param = $("#sertch_frm").serializeArray();
	
	var rs = null;
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberInfoSelect.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			
			if(typeof data.info != "undefiend" && data.info != null)
			{
				rs = data.info;
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	return rs;
}

// 회원포인트 및 멤버십카드 조회
function getGridData() {
	
	var param;
	
	if(tabType == "P")		// 개인
	{
		param = $("#frm1").serializeArray();
	}
	else
	{
		param = $("#frm2").serializeArray();
	}
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberInfoDetail.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			
			if(typeof data.list != "undefiend" && data.list != null)
			{
				if(tabType == "P")		// 개인
				{
					//그리드1 데이터 조회
					gridApp1.setData(data.list);
				}
				else if(tabType == "B")		// 사업자번호
				{
					//그리드2 데이터 조회
					gridApp2.setData(data.list);
				}
			}
			
			if(typeof data.point != "undefiend" && data.point != null && data.point.length > 0)
			{
				//P_SAL_AMT	P_MINUS_POINT	P_SAL_UPOINT
				$("#"+tabType+"_SAL_AMT").val(CommonJs.numberFormat(data.point[0].SAL_AMT));			// 누적포인트
				$("#"+tabType+"_MINUS_POINT").val(CommonJs.numberFormat(data.point[0].MINUS_POINT));	// 사용포인트
				$("#"+tabType+"_SAL_UPOINT").val(CommonJs.numberFormat(data.point[0].SAL_UPOINT));		// 가용포인트
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//회원정보 등록 및 수정 (개인)
function updateMemberInfo()
{
	if($("#P_CUST_NAME").val() == null || $("#P_CUST_NAME").val() == "")
	{
		alert(cusName + msgConfirm);
		$("#P_CUST_NAME").focus();
		return;
	}
	
	if($("input:radio[name='P_SEX']:checked").val() == null || $("input:radio[name='P_SEX']:checked").val() == "")
	{
		alert(sex + msgConfirm);
		$("input:radio[name='P_SEX']").focus();
		return;
	}
	
	if($("#P_BIR_DATE").val() == null || $("#P_BIR_DATE").val() == "")
	{
		alert(birthDate + msgConfirm);
		$("#P_BIR_DATE").focus();
		return;
	}
	
	if($("#P_MBR_GRADE").val() == null || $("#P_MBR_GRADE").val() == "")
	{
		alert(mbrGrade + msgConfirm);
		$("#P_MBR_GRADE").focus();
		return;
	}
	
	/*if($("#P_MOBIL_NO_1").val() == null || $("#P_MOBIL_NO_1").val() == "")
	{
		alert(mobilNo + msgConfirm);
		$("#P_MOBIL_NO_1").focus();
		return;
	}
	
	if($("#P_MOBIL_NO_2").val() == null || $("#P_MOBIL_NO_2").val() == "")
	{
		alert(mobilNo + msgConfirm);
		$("#P_MOBIL_NO_2").focus();
		return;
	}
	
	if($("#P_MOBIL_NO_3").val() == null || $("#P_MOBIL_NO_3").val() == "")
	{
		alert(mobilNo + msgConfirm);
		//$("#P_MOBIL_NO_3").focus();
		return;
	}
	*/
	
	if($("input:radio[name='P_BIR_TYPE']:checked").val() == null || $("input:radio[name='P_BIR_TYPE']:checked").val() == "")
	{
		alert(birthDate + msgConfirm);
		$("input:radio[name='P_BIR_TYPE']").focus();
		return;
	}
	
	/*if($("#P_END_TEL_NO").val() == null || $("#P_END_TEL_NO").val() == "")
	{
		alert("조회용번호" + msgConfirm);
		$("#P_END_TEL_NO").focus();
		return;
	}*/
	
	if($("#P_MBR_GRADE").val() == null || $("#P_MBR_GRADE").val() == "")
	{
		alert(mbrGrade + msgConfirm);
		$("#P_MBR_GRADE").focus();
		return;
	}
	
	/*if($("#P_ACCT_DEPT").val() == null || $("#P_ACCT_DEPT").val() == "")
	{
		alert(accountingCode + msgConfirm);
		$("#P_ACCT_DEPT").focus();
		return;
	}*/
	
	/*if($("#P_EMP_NO").val() == null || $("#P_EMP_NO").val() == "")
	{
		alert(msgRegMemberSearch);
		$("#P_EMP_SEARCH").focus();
		return;
	}*/
	
	if($("#P_POINT_USE_YN").val() == null || $("#P_POINT_USE_YN").val() == "")
	{
		alert(usePoints + msgConfirm);
		$("#P_POINT_USE_YN").focus();
		return;
	}
	
	/*if($("#P_CREDIT_LIMIT_YN option:selected").val() == "Y" && ($("#P_CREDIT_LIMIT").val() == null || $("#P_CREDIT_LIMIT").val() == ""))
	{
		alert(creditLimit + msgConfirm);
		$("#P_CREDIT_LIMIT").focus();
		return;
	}*/
	
	if($("#P_POST_NO").val() == null || $("#P_POST_NO").val() == "" || $("#P_ADDR").val() == null || $("#P_ADDR").val() == "")
	{
		alert(addr + msgConfirm);
		$("#P_ZIP_BUTTON").focus();
		return;
	}
	
	// 멤버십 카드 파라미터 셋팅
	setCardList();
	
	var param = $("#frm1").serializeArray();
	
	 
	
	jQuery.ajax({ 
	    url:"/updateMemberInfoPersonal.do",
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
					
					if(typeof data.RETURN_CUST_NO != "undefined" && data.RETURN_CUST_NO != null)
					{
						$("#P_CUST_NO").val(data.RETURN_CUST_NO);
						
						if($("#P_TYPE").val() == "insert")	// 신규가입시 알림톡 발송..
						{
							alimtalkSend(data.RETURN_CUST_NO);
						}
						
						getMemberInfoSet(data.RETURN_CUST_NO);	// 회원정보 재검색 (P_TYPE : update) 로 바뀜
					}
				}
				else
				{
					if(data.RETURN_MSG != "finish"){
						alert(data.RETURN_MSG);
					}
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

//회원정보 등록 및 수정 (사업자)
function updateMemberInfoBusiness()
{
	if($("#B_CUST_NAME").val() == null || $("#B_CUST_NAME").val() == "")
	{
		alert(memberCompanyName + msgConfirm);
		$("#B_CUST_NAME").focus();
		return;
	}
	
	if($("#B_BUSI_NO").val() == null || $("#B_BUSI_NO").val() == "")
	{
		alert(busiNo + msgConfirm);
		$("#B_BUSI_NO").focus();
		return;
	}
	
	if(CommonJs.checkBusiNo($("#B_BUSI_NO").val()) == false)
	{
		alert("사업자번호가 유효하지 않습니다.");
		$("#B_BUSI_NO").focus();
		return;
	}
	
	/*if($("#B_OWN_NAME").val() == null || $("#B_OWN_NAME").val() == "")
	{
		alert(ceoName + msgConfirm);
		$("#B_OWN_NAME").focus();
		return;
	}
	
	if($("#B_UPTAE").val() == null || $("#B_UPTAE").val() == "")
	{
		alert(business + msgConfirm);
		$("#B_UPTAE").focus();
		return;
	}
	
	if($("#B_UPJONG").val() == null || $("#B_UPJONG").val() == "")
	{
		alert(sectors + msgConfirm);
		$("#B_UPJONG").focus();
		return;
	}*/
	
	/*if($("#B_MOBIL_NO_1").val() == null || $("#B_MOBIL_NO_1").val() == "")
	{
		alert(mobilNo + msgConfirm);
		$("#B_MOBIL_NO_1").focus();
		return;
	}
	
	if($("#B_MOBIL_NO_2").val() == null || $("#B_MOBIL_NO_2").val() == "")
	{
		alert(mobilNo + msgConfirm);
		$("#B_MOBIL_NO_2").focus();
		return;
	}
	
	if($("#B_MOBIL_NO_3").val() == null || $("#B_MOBIL_NO_3").val() == "")
	{
		alert(mobilNo + msgConfirm);
		//$("#B_MOBIL_NO_3").focus();
		return;
	}
	*/
	
	/*if($("#B_END_TEL_NO").val() == null || $("#B_END_TEL_NO").val() == "")
	{
		alert("조회용번호" + msgConfirm);
		$("#B_END_TEL_NO").focus();
		return;
	}*/
	
	/*if($("#B_CREDIT_LIMIT_YN option:selected").val() == "Y" && ($("#B_CREDIT_LIMIT").val() == null || $("#B_CREDIT_LIMIT").val() == ""))
	{
		alert(creditLimit + msgConfirm);
		$("#B_CREDIT_LIMIT").focus();
		return;
	}*/
	
	if($("#B_INDUST_FLAG").val() == null || $("#B_INDUST_FLAG").val() == "")
	{
		alert(industFlag + msgConfirm);
		$("#B_INDUST_FLAG").focus();
		return;
	}
	
	if($("#B_MBR_GRADE").val() == null || $("#B_MBR_GRADE").val() == "")
	{
		alert(mbrGrade + msgConfirm);
		$("#B_MBR_GRADE").focus();
		return;
	}
	
	/*if($("#B_ACCT_DEPT").val() == null || $("#B_ACCT_DEPT").val() == "")
	{
		alert(accountingCode + msgConfirm);
		$("#B_ACCT_DEPT").focus();
		return;
	}*/
	
	/*if($("#B_EMP_NO").val() == null || $("#B_EMP_NO").val() == "")
	{
		alert(msgRegMemberSearch);
		$("#B_EMP_SEARCH").focus();
		return;
	}*/
	
	if($("#B_POINT_USE_YN").val() == null || $("#B_POINT_USE_YN").val() == "")
	{
		alert(usePoints + msgConfirm);
		$("#B_POINT_USE_YN").focus();
		return;
	}
	
	if($("#B_SEND_EMAIL_1").val() == null || $("#B_SEND_EMAIL_1").val() == "")
	{
		alert(email + msgConfirm);
		$("#B_SEND_EMAIL_1").focus();
		return;
	}
	
	if($("#B_SEND_EMAIL_2").val() == null || $("#B_SEND_EMAIL_2").val() == "")
	{
		alert(email + msgConfirm);
		$("#B_SEND_EMAIL_2").focus();
		return;
	}
	
	/*if($("#B_BAL_TYPE").val() == null || $("#B_BAL_TYPE").val() == "")
	{
		alert(publishType + msgConfirm);
		$("#B_BAL_TYPE").focus();
		return;
	}*/
	
	if($("#B_POST_NO").val() == null || $("#B_POST_NO").val() == "" || $("#B_ADDR").val() == null || $("#B_ADDR").val() == "")
	{
		alert(addr + msgConfirm);
		$("#B_ZIP_BUTTON").focus();
		return;
	}
	
	// 멤버십 카드 파라미터 셋팅
	setCardList();
	
	var param = $("#frm2").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updateMemberInfoBuisness.do",
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
					
					if(typeof data.RETURN_CUST_NO != "undefined" && data.RETURN_CUST_NO != null)
					{
						$("#B_CUST_NO").val(data.RETURN_CUST_NO);
						
						if($("#B_TYPE").val() == "insert")	// 신규가입시 알림톡 발송..
						{
							alimtalkSend(data.RETURN_CUST_NO);
						}
						
						getMemberInfoSet(data.RETURN_CUST_NO);	// 회원정보 재검색 (B_TYPE : update) 로 바뀜
					}
				}
				else if(data.RETURN_CODE == -2)
				{
					alert("이미 등록된 사업자번호 입니다.\n다시 확인해주세요.");
				}
				else
				{
					if(data.RETURN_MSG != "finish"){
						alert(data.RETURN_MSG);
					}
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

// 멤버십 카드 데이터 셋팅 (개인,사업자)
function setCardList()
{
	if($("#"+tabType+"_CORP_CODE").val() != "" && $("#"+tabType+"_CUST_NO").val() != "")
	{
		/* 회원카드 정보 셋팅
		 * 수정 작업 결과 가져오기 (그리드에서 작업된 입력,수정,삭제 내용을 가져옵니다)
		 * 데이터는 배열 형태로
		 * idx: 행번호
		 * job: 수행 작업 (I:입력, U:수정, D:삭제)
		 * data: 행의 자료
		 * 를 가지고 있으며 삭제가 먼저 오도록 정렬되어 있습니다.
		 */
		var paramData = "";
		var changedData;
		if(tabType == "P")
		{
			changedData = gridRoot1.getChangedData();
		}
		else
		{
			changedData = gridRoot2.getChangedData();
		}
		
		$("#"+tabType+"_CARD_LIST").val("");
		if (changedData.length > 0)
		{
			// P_CARD_LIST 파리미터에 아래와 같은 형식의 스트링을 ',' '|' 두개의 구분자로 서버에전송 = '111|222|333,111|222|333,111|222|333'
			/* 수정타입|기업코드 |회원번호|카드번호   |점포코드|발급일자|발급구분       |사용여부|등록자
			 * JOB_TYPE|CORP_CODE|CUST_NO |MBR_CARD_NO|STR_CODE|FROM_DT |CARD_ISSUE_FLAG|USE_YN  |USER_ID
			 */
			var data;
			for (var i = 0; i < changedData.length; i++)
			{
				//console.log("index:"+changedData[i].idx+"\n"+"job:"+changedData[i].job+"\n"+"data:"+changedData[i].data);
				
				data = changedData[i].data;
				if(paramData != "")
				{
					paramData += ",";
				}
				paramData += changedData[i].job + "|" + $("#"+tabType+"_CORP_CODE").val() + "|" + $("#"+tabType+"_CUST_NO").val() + "|" + data.MBR_CARD_NO + "|" + data.STR_CODE + "|" + data.FROM_DT + "|" + data.CARD_ISSUE_FLAG + "|" + data.USE_YN + "|" + $("#"+tabType+"_REG_ID").val();
			}
			$("#"+tabType+"_CARD_LIST").val(paramData);
		}
		//console.log(paramData);
	}
}

//알림톡 발송
function alimtalkSend(custNo)
{
	var memList = "";
	
	memList += CommonJs.isNullToString($("#"+tabType+"_CUST_NAME").val(), "") + "|" + custNo
			+ "|" + $("#"+tabType+"_MOBIL_NO_1").val() + $("#"+tabType+"_MOBIL_NO_2").val() + $("#"+tabType+"_MOBIL_NO_3").val();
	
	CommonJs.sendAlimtalk($("#"+tabType+"_CORP_CODE").val(), memList, "dadam_106", 0);
}

//(회원검색) 팝업 호출 function
function btn_comm_user_search(type)
{
	if(type == "S")
	{
		/*$("#comm_pop_wrap1").dialog("open");
		gridApp10.resize();
		
		// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
		$("#P_CALLBACK_NM1").val("fn_comm_user_callback_"+type+"(dataRow10)");
		
		// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
		if($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != ""){
			$("#P_TEXT1").val($("#S_CUST_NAME").val());
			btn_comm_search('1');
		}*/
		//생존회원(맴버십카드의 사용유무가 모두 N인 회원) 만 검색 되도록 수정 2017-06-19 KYW
		$("#comm_pop_wrap20").dialog("open");
		gridApp29.resize();
		
		// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
		$("#P_CALLBACK_NM20").val("fn_comm_user_callback_"+type+"(dataRow29)");
		
		// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
		if($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != ""){
			$("#P_TEXT20").val($("#S_CUST_NAME").val());
			btn_comm_search('20');
		}
	}
	else if(type == "P")
	{
		$('#comm_pop_wrap4' ).dialog( 'open' );
		gridApp13.resize();
		
		$("#P_CALLBACK_NM4").val("fn_comm_user_callback_"+type+"(dataRow13)");
		
		if($("#P_EMP_NAME").val() != null && $("#P_EMP_NAME").val() != ""){
			$("#P_TEXT4").val($("#P_EMP_NAME").val());
			btn_comm_search('4');
		}
	}
	else if(type == "B")
	{
		$('#comm_pop_wrap4' ).dialog( 'open' );
		gridApp13.resize();
		
		$("#P_CALLBACK_NM4").val("fn_comm_user_callback_"+type+"(dataRow13)");
		
		if($("#B_EMP_NAME").val() != null && $("#B_EMP_NAME").val() != ""){
			$("#P_TEXT4").val($("#B_EMP_NAME").val());
			btn_comm_search('4');
		}
	}
}

//(관리자 검색 - 개인탭 관리자) 팝업 callback function
function fn_comm_user_callback_P(dataRow)
{
	$("#P_EMP_NAME").val(dataRow.USER_NM);		// 회원명
	$("#P_EMP_NO" ).val(dataRow.USER_ID);		// 회원번호
}

//(관리자 검색 - 사업자탭 관리자) 팝업 callback function
function fn_comm_user_callback_B(dataRow)
{
	$("#B_EMP_NAME").val(dataRow.USER_NM);		// 회원명
	$("#B_EMP_NO" ).val(dataRow.USER_ID);		// 회원번호
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback_S(dataRow)
{
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("회원정보 조회 실패");
		return
	}
	
	// 개인탭일때 사업자탭으로 전환
	if(tabType == "P" && dataRow.BUSI_FLAG == "2")
	{
		//alert(msgBusinessTabSearch);	// "사업자 탭 화면에서 조회 가능한 회원 입니다."
		//return;
		$("#tab_b").trigger("click");
	}
	
	// 사업자탭일때 개인탭으로 전환
	if(tabType == "B" && (dataRow.BUSI_FLAG == "1" || dataRow.BUSI_FLAG == "0"))
	{
		//alert(msgMemberTabSearch);	// "개인 탭 화면에서 조회 가능한 회원 입니다."
		//return;
		$("#tab_p").trigger("click");
	}
	
	
	$("#"+tabType+"_TYPE").val("update");
	
	var telArr = CommonJs.phoneFomatterArr(dataRow.TEL_NO);
	var faxArr = CommonJs.phoneFomatterArr(dataRow.FAX_NO);
	var mobileArr = CommonJs.phoneFomatterArr(dataRow.MOBIL_NO);
	var cashArr = CommonJs.phoneFomatterArr(dataRow.CASH_MOBIL_NO);
	var emailArr = CommonJs.emailSplit(dataRow.SEND_EMAIL);
	
	if(tabType == "P")		// 개인
	{
		frm1Reset();
		$("#S_CUST_NAME").val(dataRow.CUST_NAME);	// 검색 회원명 재셋팅
		
		$("#P_CORP_CODE").val(dataRow.CORP_CODE);	// 기업코드
		$("#P_CUST_NAME").val(dataRow.CUST_NAME);		// 회원명
		$("input:radio[name='P_SEX']:radio[value='"+dataRow.SEX+"']").prop("checked", true);	// 성별
		$("#P_CUST_NO" ).val(dataRow.CUST_NO);		// 회원번호
		
		$("#P_BIR_DATE").val(CommonJs.dateFormat(dataRow.BIR_DATE, "-"));		// 생년월일
		if(typeof dataRow.BIR_TYPE != "undefined")
		{
			if(dataRow.BIR_TYPE == "1")
				$("input:radio[id='P_BIR_TYPE_1']").attr("checked", true);	// 양력
			else if(dataRow.BIR_TYPE == "2")
				$("input:radio[id='P_BIR_TYPE_2']").attr("checked", true);	// 음력
		}
		
		if(telArr != null && telArr.length == 3)
		{
			$("#P_TEL_NO_1").val(telArr[0]);		// 전화번호
			$("#P_TEL_NO_2").val(telArr[1]);		// 전화번호
			$("#P_TEL_NO_3").val(telArr[2]);		// 전화번호
		}else if (telArr != null && telArr.length == 2){
			$("#P_TEL_NO_2").val(telArr[0]);		// 전화번호
			$("#P_TEL_NO_3").val(telArr[1]);		// 전화번호
		}
		
		if(mobileArr != null && mobileArr.length == 3)
		{
			$("#P_MOBIL_NO_1").val(mobileArr[0]);	// 휴대전화
			$("#P_MOBIL_NO_2").val(mobileArr[1]);	// 휴대전화
			$("#P_MOBIL_NO_3").val(mobileArr[2]);	// 휴대전화
		}
		
		if(typeof dataRow.CASH_APP_YN != "undefined" && dataRow.CASH_APP_YN == "1")
		{
			$("#P_CASH_APP_YN").val(dataRow.CASH_APP_YN);
			
			if(cashArr != null && cashArr.length == 3)
			{
				cashReset(1);	// 휴대폰
				$("#P_CASH_MOBIL_NO_1").val(cashArr[0]);	// 현금영수증 휴대전화
				$("#P_CASH_MOBIL_NO_2").val(cashArr[1]);	// 현금영수증 휴대전화
				$("#P_CASH_MOBIL_NO_3").val(cashArr[2]);	// 현금영수증 휴대전화
			}
		}
		else if(typeof dataRow.CASH_APP_YN != "undefined" && dataRow.CASH_APP_YN == "2")
		{
			$("#P_CASH_APP_YN").val(dataRow.CASH_APP_YN);
			
			cashReset(2);	// 휴대폰
			$("#P_CASH_MOBIL_NO_4").val(dataRow.CASH_MOBIL_NO);	// 현금영수증 사업자
		}
		else if(typeof dataRow.CASH_APP_YN != "undefined" && dataRow.CASH_APP_YN == "3")
		{
			$("#P_CASH_APP_YN").val(dataRow.CASH_APP_YN);
			
			cashReset(3);	// 기타
			$("#P_CASH_MOBIL_NO_5").val(dataRow.CASH_MOBIL_NO);	// 기타
		}
		else
		{
			$("#P_CASH_APP_YN").val("");
			cashReset(0);	// disabled
		}
		
		if(emailArr != null && emailArr.length == 2)
		{
			$("#P_SEND_EMAIL_1").val(emailArr[0]);		// 이메일
			$("#P_SEND_EMAIL_2").val(emailArr[1]);		// 이메일
		}
		
		/*if(typeof dataRow.EMAIL_YN != "undefined" && dataRow.EMAIL_YN == "Y")
		{
			$("input:checkbox[name='P_EMAIL_YN']").attr("checked", true);	// 이메일 수신여부
			$("#P_EMAIL_YN").val("Y");
		}
		else
		{
			$("input:checkbox[name='P_EMAIL_YN']").attr("checked", false);
			$("#P_EMAIL_YN").val("N");
		}*/
		
		if(typeof dataRow.SMS_YN != "undefined" && dataRow.SMS_YN == "Y")
		{
			$("input:checkbox[name='P_SMS_YN']").attr("checked", true);	// SMS 수신여부
			$("#P_SMS_YN").val("Y");
		}
		else
		{
			$("input:checkbox[name='P_SMS_YN']").attr("checked", false);
			$("#P_SMS_YN").val("N");
		}
		
		if(typeof dataRow.DM_YN != "undefined" && dataRow.DM_YN == "Y")
		{
			$("input:checkbox[name='P_DM_YN']").attr("checked", true);	// SMS 수신여부
			$("#P_DM_YN").val("Y");
		}
		else
		{
			$("input:checkbox[name='P_DM_YN']").attr("checked", false);
			$("#P_DM_YN").val("N");
		}
		
		$("#P_MBR_DC_YN").val(dataRow.MBR_DC_YN);		// 할인적용여부
		$("#P_END_TEL_NO").val(dataRow.END_TEL_NO);	// 휴대폰 끝자리
		$("#P_MBR_GRADE").val(dataRow.MBR_GRADE);	// 회원등급
		//$("#P_ACCT_DEPT").val(dataRow.ACCT_DEPT);	// 회계코드
		$("#P_EMP_NO").val(dataRow.EMP_NO);			// 관리자ID
		$("#P_EMP_NAME").val(dataRow.USER_NM);		// 관리자명
		//$("#P_BAL_TYPE").val(dataRow.BAL_TYPE);	// 발행구분
		$("#P_POST_NO").val(dataRow.POST_NO);		// 우편번호
		$("#P_ADDR").val(dataRow.ADDR);				// 주소
		$("#P_ADDR_DTL").val(dataRow.ADDR_DTL);		// 주소상세
		$("#P_REMARK").val(dataRow.REMARK);			// 특이사항
		$("#P_POINT_USE_YN").val(dataRow.POINT_USE_YN);		// 포인트사용유무
		$("#P_CREDIT_USE_YN").val(dataRow.CREDIT_USE_YN);	// 외상거래유무
		$("#P_CREDIT_LIMIT").val(dataRow.CREDIT_LIMIT);		// 여신한도
		
		getGridData();	// 회원포인트, 멤버십카드 가져오기
	}
	else if(tabType == "B")		// 사업자번호
	{
		frm2Reset();
		$("#S_CUST_NAME").val(dataRow.CUST_NAME);	// 검색 회원명 재셋팅
		
		$("#B_CORP_CODE").val(dataRow.CORP_CODE);	// 기업코드
		$("#B_CUST_NAME").val(dataRow.CUST_NAME);		// 회원명
		$("#B_CUST_NO").val(dataRow.CUST_NO);		// 회원번호
		$("#B_BUSI_NO").val(dataRow.BUSI_NO);		// 사업자번호
		$("#B_BUSI_NAME").val(dataRow.BUSI_NAME);		// 상호명
		$("#B_OWN_NAME").val(dataRow.OWN_NAME);		// 대표자명
		$("#B_UPTAE").val(dataRow.UPTAE);			// 업태
		$("#B_UPJONG").val(dataRow.UPJONG);			// 종목
		
		if(telArr != null && telArr.length == 3)
		{
			$("#B_TEL_NO_1").val(telArr[0]);		// 전화번호1
			$("#B_TEL_NO_2").val(telArr[1]);		// 전화번호2
			$("#B_TEL_NO_3").val(telArr[2]);		// 전화번호3
		}else if (telArr != null && telArr.length == 2){
			$("#B_TEL_NO_2").val(telArr[0]);		// 전화번호
			$("#B_TEL_NO_3").val(telArr[1]);		// 전화번호
		}
		
		if(faxArr != null && faxArr.length == 3)
		{
			$("#B_FAX_NO_1").val(faxArr[0]);		// 전화번호1
			$("#B_FAX_NO_2").val(faxArr[1]);		// 전화번호2
			$("#B_FAX_NO_3").val(faxArr[2]);		// 전화번호3
		}
		
		if(mobileArr != null && mobileArr.length == 3)
		{
			$("#B_MOBIL_NO_1").val(mobileArr[0]);	// 휴대전화1
			$("#B_MOBIL_NO_2").val(mobileArr[1]);	// 휴대전화2
			$("#B_MOBIL_NO_3").val(mobileArr[2]);	// 휴대전화3
		}
		
		$("#B_END_TEL_NO").val(dataRow.END_TEL_NO);				// 조회용 번호
		$("#B_POINT_USE_YN").val(dataRow.POINT_USE_YN);			// 포인트사용유무
		$("#B_CREDIT_USE_YN").val(dataRow.CREDIT_USE_YN);		// 외상거래유무
		$("#B_CREDIT_LIMIT").val(dataRow.CREDIT_LIMIT);			// 여신한도
		$("#B_INDUST_FLAG").val(dataRow.INDUST_FLAG);			// 업종유형
		$("#B_MBR_GRADE").val(dataRow.MBR_GRADE);				// 회원등급
		
		if(typeof dataRow.CASH_APP_YN != "undefined" && dataRow.CASH_APP_YN == "1")
		{
			$("#B_CASH_APP_YN").val(dataRow.CASH_APP_YN);
			
			if(cashArr != null && cashArr.length == 3)
			{
				cashReset(1);	// 휴대폰
				$("#B_CASH_MOBIL_NO_1").val(cashArr[0]);	// 현금영수증 휴대전화
				$("#B_CASH_MOBIL_NO_2").val(cashArr[1]);	// 현금영수증 휴대전화
				$("#B_CASH_MOBIL_NO_3").val(cashArr[2]);	// 현금영수증 휴대전화
			}
		}
		else if(typeof dataRow.CASH_APP_YN != "undefined" && dataRow.CASH_APP_YN == "2")
		{
			$("#B_CASH_APP_YN").val(dataRow.CASH_APP_YN);
			
			cashReset(2);	// 사업자
			$("#B_CASH_MOBIL_NO_4").val(dataRow.CASH_MOBIL_NO);	// 현금영수증 사업자
		}
		else if(typeof dataRow.CASH_APP_YN != "undefined" && dataRow.CASH_APP_YN == "3")
		{
			$("#B_CASH_APP_YN").val(dataRow.CASH_APP_YN);
			
			cashReset(3);	// 사업자
			$("#B_CASH_MOBIL_NO_5").val(dataRow.CASH_MOBIL_NO);	// 현금영수증 사업자
		}
		else
		{
			$("#B_CASH_APP_YN").val("");
			cashReset(0);	// disabled
		}
		
		$("#B_MBR_DC_YN").val(dataRow.MBR_DC_YN);		// 할인적용여부
		$("#B_LIQUOR_SALE_YN").val(dataRow.LIQUOR_SALE_YN);			// 주류판매가능여부
		$("#B_ACCT_DEPT").val(dataRow.ACCT_DEPT);		// 회계코드
		$("#B_EMP_NO").val(dataRow.EMP_NO);				// 관리자ID
		$("#B_EMP_NAME").val(dataRow.USER_NM);			// 관리자명
		
		$("#B_BIR_DATE").val(CommonJs.dateFormat(dataRow.BIR_DATE, "-"));		// 생년월일
		if(typeof dataRow.BIR_TYPE != "undefined")
		{
			if(dataRow.BIR_TYPE == "1")
				$("input:radio[id='B_BIR_TYPE_1']").attr("checked", true);	// 양력
			else if(dataRow.BIR_TYPE == "2")
				$("input:radio[id='B_BIR_TYPE_2']").attr("checked", true);	// 음력
		}
		
		if(emailArr != null && emailArr.length == 2)
		{
			$("#B_SEND_EMAIL_1").val(emailArr[0]);		// 이메일
			$("#B_SEND_EMAIL_2").val(emailArr[1]);
		}
		
		if(typeof dataRow.EMAIL_YN != "undefined" && dataRow.EMAIL_YN == "Y")
		{
			$("input:checkbox[name='B_EMAIL_YN']").attr("checked", true);	// 이메일 수신여부
			$("#B_EMAIL_YN").val("Y");
		}
		else
		{
			$("input:checkbox[name='B_EMAIL_YN']").attr("checked", false);
			$("#B_EMAIL_YN").val("N");
		}
		
		if(typeof dataRow.SMS_YN != "undefined" && dataRow.SMS_YN == "Y")
		{
			$("input:checkbox[name='B_SMS_YN']").attr("checked", true);	// SMS 수신여부
			$("#B_SMS_YN").val("Y");
		}
		else
		{
			$("input:checkbox[name='B_SMS_YN']").attr("checked", false);
			$("#B_SMS_YN").val("N");
		}
		
		if(typeof dataRow.DM_YN != "undefined" && dataRow.DM_YN == "Y")
		{
			$("input:checkbox[name='B_DM_YN']").attr("checked", true);	// SMS 수신여부
			$("#B_DM_YN").val("Y");
		}
		else
		{
			$("input:checkbox[name='B_DM_YN']").attr("checked", false);
			$("#B_DM_YN").val("N");
		}
		
		$("#B_BAL_TYPE").val(dataRow.BAL_TYPE);		// 발행구분
		$("#B_POST_NO").val(dataRow.POST_NO);		// 우편번호
		$("#B_ADDR").val(dataRow.ADDR);				// 주소
		$("#B_ADDR_DTL").val(dataRow.ADDR_DTL);		// 주소상세
		$("#B_REMARK").val(dataRow.REMARK);			// 특이사항
		
		getGridData();	// 회원포인트, 멤버십카드 가져오기
	}
}

// 개인 입력폼 초기화
function frm1Reset()
{
	$("#frm1").each(function() {
		this.reset();
	});
	
	// 검색영역 초기화
	$("#sertch_frm").each(function() {  
		this.reset();
	});
	
	$("#P_CARD_LIST").val("");  //카드넘버
	$("#P_CASH_APP_YN").val("");
	cashReset(0);	// disabled
	
	/*$("input:checkbox[name='P_EMAIL_YN']").attr("checked", true);
	$("#P_EMAIL_YN").val("Y");*/
	
	$("input:checkbox[name='P_SMS_YN']").attr("checked", true);
	$("#P_SMS_YN").val("Y");
	
	$("input:checkbox[name='P_DM_YN']").attr("checked", true);
	$("#P_DM_YN").val("Y");
	
	$("input:radio[name='P_BIR_TYPE']:radio[value='1']").prop("checked", true);
	
	$("#P_CREDIT_USE_YN").val("Y");	// 여신관리유무 default 'N'
	
//	gridApp1.setData([]);	// 카드 데이터 초기화
	gridRoot1.removeAll( );
}

//사업자 입력폼 초기화
function frm2Reset()
{
	$("#frm2").each(function() {  
		this.reset();
	});
	
	// 검색영역 초기화
	$("#sertch_frm").each(function() {  
		this.reset();
	});
	
	$("#B_CARD_LIST").val("");	// 카드넘버
	$("#B_CASH_APP_YN").val("");	// 여신관리유무 default 'N'
	cashReset(0);	// disabled
	
	$("input:checkbox[name='B_EMAIL_YN']").attr("checked", true);
	$("#B_EMAIL_YN").val("Y");
	
	$("input:checkbox[name='B_SMS_YN']").attr("checked", true);
	$("#B_SMS_YN").val("Y");
	
	$("input:checkbox[name='B_DM_YN']").attr("checked", true);
	$("#B_DM_YN").val("Y");
	
	$("input:radio[name='B_BIR_TYPE']:radio[value='1']").prop("checked", true);
	
	$("#B_CREDIT_USE_YN").val("Y");	// 여신관리유무 default 'N'
	
//	gridApp2.setData([]);	// 카드 데이터 초기화
	gridRoot2.removeAll( );
}

// 현금영수증 disabled 처리
function cashReset(type)
{
	if(type == 1)	// 휴대폰 활성
	{
		$("#"+tabType+"_CASH_DISPY2").hide();
		$("#"+tabType+"_CASH_DISPY3").hide();
		$("#"+tabType+"_CASH_DISPY1").show();
		
		$("#"+tabType+"_CASH_MOBIL_NO_1").removeAttr("disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_2").removeAttr("disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_3").removeAttr("disabled");
	    
	    $("#"+tabType+"_CASH_MOBIL_NO_4").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_4").val("");
	    $("#"+tabType+"_CASH_MOBIL_NO_5").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_5").val("");
	}
	else if(type == 2)	// 사업자 활성
	{
		$("#"+tabType+"_CASH_DISPY1").hide();
		$("#"+tabType+"_CASH_DISPY3").hide();
		$("#"+tabType+"_CASH_DISPY2").show();
		
		$("#"+tabType+"_CASH_MOBIL_NO_4").removeAttr("disabled");
		
		$("#"+tabType+"_CASH_MOBIL_NO_1").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_2").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_3").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_1").val("");
	    $("#"+tabType+"_CASH_MOBIL_NO_2").val("");
	    $("#"+tabType+"_CASH_MOBIL_NO_3").val("");
	    
	    $("#"+tabType+"_CASH_MOBIL_NO_5").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_5").val("");
	}
	else if(type == 3)	// 기타 활성
	{
		$("#"+tabType+"_CASH_DISPY1").hide();
		$("#"+tabType+"_CASH_DISPY2").hide();
		$("#"+tabType+"_CASH_DISPY3").show();
		
		$("#"+tabType+"_CASH_MOBIL_NO_5").removeAttr("disabled");
		
		$("#"+tabType+"_CASH_MOBIL_NO_1").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_2").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_3").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_1").val("");
	    $("#"+tabType+"_CASH_MOBIL_NO_2").val("");
	    $("#"+tabType+"_CASH_MOBIL_NO_3").val("");
	    
	    $("#"+tabType+"_CASH_MOBIL_NO_4").attr("disabled", "disabled");
	    $("#"+tabType+"_CASH_MOBIL_NO_4").val("");
	}
	else	// 모두 비활성
	{
		$("#"+tabType+"_CASH_DISPY1").hide();
		$("#"+tabType+"_CASH_DISPY2").hide();
		$("#"+tabType+"_CASH_DISPY3").hide();
	}
}

// 현금영수증 클릭 이벤트
function cashCheckboxClick()
{
	if ($("#"+tabType+"_CASH_APP_YN").val() == "1")	// 휴대폰번호 입력 활성
	{
		cashReset(1);	// disabled 해제
		
		//$("#"+tabType+"_CASH_MOBIL_NO_1").val($("#"+tabType+"_MOBIL_NO_1").val());
		//$("#"+tabType+"_CASH_MOBIL_NO_2").val($("#"+tabType+"_MOBIL_NO_2").val());
		//$("#"+tabType+"_CASH_MOBIL_NO_3").val($("#"+tabType+"_MOBIL_NO_3").val());
	}
	else if ($("#"+tabType+"_CASH_APP_YN").val() == "2")	// 사업자번호 입력 활성
	{
		cashReset(2);	// disabled
		//$("#"+tabType+"_CASH_MOBIL_NO_4").val("");
	}
	else if ($("#"+tabType+"_CASH_APP_YN").val() == "3")	// 기타 입력 활성
	{
		cashReset(3);	// disabled
		//$("#"+tabType+"_CASH_MOBIL_NO_4").val("");
	}
	else
	{
		cashReset(0);
	}
}

// 이메일수신 클릭 이벤트
function emailCheckboxClick()
{
	if ($("#"+tabType+"_EMAIL_YN").is(":checked")) {
	    $("#"+tabType+"_EMAIL_YN").val("Y");
	} else {
	    $("#"+tabType+"_EMAIL_YN").val("N");
	}
}

// SMS수신 클릭 이벤트
function smsCheckboxClick()
{
	if ($("#"+tabType+"_SMS_YN").is(":checked")) {
	    $("#"+tabType+"_SMS_YN").val('Y');
	} else {
	    $("#"+tabType+"_SMS_YN").val('N');
	}
}

// DM수신 클릭 이벤트
function dmCheckboxClick()
{
	if ($("#"+tabType+"_DM_YN").is(":checked")) {
	    $("#"+tabType+"_DM_YN").val('Y');
	} else {
	    $("#"+tabType+"_DM_YN").val('N');
	}
}

// 이메일 종류 체인지 이벤트
function emailSelectBoxChange()
{
	if ($("#"+tabType+"_SEND_EMAIL_3").val() == "")
	{
		$("#"+tabType+"_SEND_EMAIL_2").val("");
		$("#"+tabType+"_SEND_EMAIL_2").removeAttr("readonly");
	}
	else
	{
		$("#"+tabType+"_SEND_EMAIL_2").val($("#"+tabType+"_SEND_EMAIL_3 option:selected").text());
		$("#"+tabType+"_SEND_EMAIL_2").attr("readonly", "readonly");
	}
}

$(document).ready(function () {
	
	//최초 도움말 불러오기
	setHelpMessage($(location).attr("pathname").replace("/",""));
	
	$(".datepicker").datepicker({
		yearRange: 'c-120:c+0'	// 생년원일 (현재연도에서 120년전 셋팅)
	});
	
	// 여신한도 금액 처리
	$("#P_CREDIT_LIMIT").number( true, 0 );
	$("#B_CREDIT_LIMIT").number( true, 0 );
	
	// 숫자만 입력 처리
	try {
		
		CommonJs.addInputHandler({input:$("#P_TEL_NO_2"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#P_TEL_NO_3"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#P_MOBIL_NO_2"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#P_MOBIL_NO_3"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#P_CASH_MOBIL_NO_2"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#P_CASH_MOBIL_NO_3"), dataType:"N", maxlength:"4"});
		//CommonJs.addInputHandler({input:$("#P_ACCT_DEPT"), dataType:"N", maxlength:"6"});
		CommonJs.addInputHandler({input:$("#P_CASH_MOBIL_NO_4"), dataType:"N", maxlength:"10"});
		CommonJs.addInputHandler({input:$("#P_CASH_MOBIL_NO_5"), dataType:"N", maxlength:"22"});
		CommonJs.addInputHandler({input:$("#P_END_TEL_NO"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#B_BUSI_NO"), dataType:"N", maxlength:"10"});
		CommonJs.addInputHandler({input:$("#B_TEL_NO_2"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#B_TEL_NO_3"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#B_FAX_NO_2"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#B_FAX_NO_3"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#B_MOBIL_NO_2"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#B_MOBIL_NO_3"), dataType:"N", maxlength:"4"});
		//CommonJs.addInputHandler({input:$("#B_CASH_MOBIL_NO_2"), dataType:"N", maxlength:"4"});
		//CommonJs.addInputHandler({input:$("#B_CASH_MOBIL_NO_3"), dataType:"N", maxlength:"4"});
		CommonJs.addInputHandler({input:$("#B_ACCT_DEPT"), dataType:"N", maxlength:"6"});
		CommonJs.addInputHandler({input:$("#B_CASH_MOBIL_NO_4"), dataType:"N", maxlength:"10"});
		CommonJs.addInputHandler({input:$("#B_CASH_MOBIL_NO_5"), dataType:"N", maxlength:"22"});
		CommonJs.addInputHandler({input:$("#B_END_TEL_NO"), dataType:"N", maxlength:"4"});
		
    } catch(e) {
    	console.log(e);
    }
	
	// 개인
	getCommonCodeSelectBoxList("P_TEL_NO_1", "TEL_NO");				// 지역번호
	getCommonCodeSelectBoxList("P_MOBIL_NO_1", "TELCOM");				// 휴대폰번호 앞자리
	getCommonCodeSelectBoxList("P_CASH_APP_YN", "CASH_APP_YN");			// 현금영수증 종류
	getCommonCodeSelectBoxList("P_CASH_MOBIL_NO_1", "TELCOM");			// 휴대폰번호 앞자리
	getCommonCodeSelectBoxList("P_SEND_EMAIL_3", "EMAIL");				// 이메일 종류
	getCommonCodeSelectBoxList("P_MBR_DC_YN", "MBR_DC_YN");				// 회원할인여부
	//getCommonCodeSelectBoxList("P_MBR_GRADE", "MBR_GRADE");			// 회원등급
	$("#P_MBR_GRADE").append('<option value="">'+ select +'</option>');
	getCommonCodeGradeSelectBoxList("P_MBR_GRADE", "MBR_GRADE", "0");	// 개인 회원등급(직원)	
	getCommonCodeGradeSelectBoxList("P_MBR_GRADE", "MBR_GRADE", "1");	// 개인 회원등급(개인)
	//getCommonCodeSelectBoxList("P_BAL_TYPE", "BAL_TYPE");				// 발행구분 
	getCommonCodeSelectBoxList("P_CREDIT_USE_YN", "CREDIT_USE_YN");		// 여신관리유무
	getCommonCodeSelectBoxList("P_POINT_USE_YN", "POINT_USE_YN");		// 포인트사용유무
	
	// 사업자
	getCommonCodeSelectBoxList("B_TEL_NO_1", "AREA_CODE");				// 지역번호
	getCommonCodeSelectBoxList("B_FAX_NO_1", "TELCOM");					// 휴대폰번호 앞자리
	getCommonCodeSelectBoxList("B_MOBIL_NO_1", "TELCOM");				// 휴대폰번호 앞자리
	getCommonCodeSelectBoxList("B_CASH_APP_YN", "CASH_APP_YN");			// 현금영수증 종류
	getCommonCodeSelectBoxList("B_CASH_MOBIL_NO_1", "TELCOM");			// 휴대폰번호 앞자리
	getCommonCodeSelectBoxList("B_POINT_USE_YN", "POINT_USE_YN");		// 포인트사용유무
	getCommonCodeSelectBoxList("B_CREDIT_USE_YN", "CREDIT_USE_YN");	// 여신관리유무
	getCommonCodeSelectBoxList("B_SEND_EMAIL_3", "EMAIL");				// 이메일 종류
	getCommonCodeSelectBoxList("B_INDUST_FLAG", "INDUST_FLAG");			// 고객구분(업종유형)
	getCommonCodeSelectBoxList("B_MBR_DC_YN", "MBR_DC_YN");				// 회원할인여부
	//getCommonCodeSelectBoxList("B_MBR_GRADE", "MBR_GRADE");				// 회원등급
	getCommonCodeGradeSelectBoxList("B_MBR_GRADE", "MBR_GRADE", "2", false);	// 사업자 회원등급
	//getCommonCodeSelectBoxList("B_BAL_TYPE", "BAL_TYPE");				// 발행구분
	getCommonCodeSelectBoxList("B_LIQUOR_SALE_YN", "LIQUOR_SALE_YN");	// 주류판매가능여부
	
	$("#S_CUST_NAME").keydown(function(key) {
		
		if(key.keyCode == 13){
			btn_comm_user_search('S');
		}
	});
	
	// 탭 클릭 이벤트 체크 (개인)
	$("#tab_p").click(function() {
		
		if(tabType == "P")
		{
			return false;
		}
		
		tabType = "P";
		frm1Reset();
	});
	
	// 탭 클릭 이벤트 체크 (사업자)
	$("#tab_b").click(function() {
		
		if(tabType == "B")
		{
			return false;
		}
		
		tabType = "B";
		frm2Reset();
	});
	
	// 현금영수증 체크 Y, N 셋팅 (개인)
	$("#P_CASH_APP_YN").change(function() {
		cashCheckboxClick();
	});
	
	// 현금영수증 체크 Y, N 셋팅 (사업자)
	$("#B_CASH_APP_YN").change(function() {
		cashCheckboxClick();
	});
	
	// 현금영수증 사업자 휴대폰 이벤트
	$("input:radio[name='B_CASH_APP_YN']").click(function() {
		//alert($(this).val());
	});
	
	// 이메일 수신 체크 Y, N 셋팅 (개인)
	/*$("#P_EMAIL_YN").click(function() {
		emailCheckboxClick();
	});*/
	
	// 이메일 수신 체크 Y, N 셋팅 (사업자)
	$("#B_EMAIL_YN").click(function() {
		emailCheckboxClick();
	});
	
	// SMS 수신 체크 Y, N 셋팅 (개인)
	$("#P_SMS_YN").click(function() {
		smsCheckboxClick();
	});
	
	// SMS 수신 체크 Y, N 셋팅 (사업자)
	$("#B_SMS_YN").click(function() {
		smsCheckboxClick();
	});
	
	// DM 수신 체크 Y, N 셋팅 (개인)
	$("#P_DM_YN").click(function() {
		dmCheckboxClick();
	});
	
	// DM 수신 체크 Y, N 셋팅 (사업자)
	$("#B_DM_YN").click(function() {
		dmCheckboxClick();
	});
	
	// 이메일 체인지 이벤트 (개인)
	$("#P_SEND_EMAIL_3").change(function() {
		emailSelectBoxChange();
	});
	
	// 이메일 체인지 이벤트 (사업자)
	$("#B_SEND_EMAIL_3").change(function() {
		emailSelectBoxChange();
	});
	
	// 여신한도 (개인)
	/*$("#P_CREDIT_LIMIT_YN").change(function() {
		if(this.value == "N")
		{
			$("#P_CREDIT_LIMIT").attr("disabled", "disabled");
		}
		else
		{
			$("#P_CREDIT_LIMIT").removeAttr("disabled");
		}
	});
	
	// 여신한도 (사업자)
	$("#B_CREDIT_LIMIT_YN").change(function() {
		if(this.value == "N")
		{
			$("#B_CREDIT_LIMIT").attr("disabled", "disabled");
		}
		else
		{
			$("#B_CREDIT_LIMIT").removeAttr("disabled");
		}
	});*/
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		
		var data = getMemberInfoCnt();
		if(typeof data.count != "undefiend" && data.count != null)
		{
			if(data.count == 1)		// 검색결과 1명일때
			{
				getMemberInfoSet(data.cust_no);
			}
			else if(data.count > 1)	// 검색결과 복수일때 팝업 오픈
			{
				btn_comm_user_search("S");
			}
		}
	});
	
	// 저장 버튼 클릭
	$("#btn_update").click(function() {
		
		if(tabType == "P")
		{
			updateMemberInfo();
		}
		else if(tabType == "B")
		{
			updateMemberInfoBusiness();
		}
		
	});
	
	// 신규 버튼 클릭
	$("#btn_new").click(function() {
		$("#"+tabType+"_TYPE").val("insert");
		
		if(tabType == "P")
		{
			frm1Reset();
		}
		else
		{
			frm2Reset();
		}
	});
	
	// 휴대폰번호 포커스 잃었을때 최소값 및 중복체크
	$("#P_MOBIL_NO_3").blur(function() {
		if(CommonJs.minLenFocus(this, 4) == true)
		{
			fn_moblieChk();
			$("#P_END_TEL_NO").val(this.value);
		}
	});
	
	$("#B_MOBIL_NO_3").blur(function() {
		if(CommonJs.minLenFocus(this, 4) == true)
		{
			fn_moblieChk();
			$("#B_END_TEL_NO").val(this.value);
		}
	});
	
	// 사업자번호 최소값 및 중복체크
	$("#B_BUSI_NO").blur(function() {
		if(CommonJs.minLenFocus(this, 10) == true)
		{
			fn_businoChk();
		}
	});
	
	// 최소값 체크 ====================================================
	$("#P_MOBIL_NO_2").blur(function() {
		CommonJs.minLenFocus(this, 4);
	});
	
	$("#P_CASH_MOBIL_NO_2").blur(function() {
		CommonJs.minLenFocus(this, 4);
	});
	
	$("#P_CASH_MOBIL_NO_3").blur(function() {
		CommonJs.minLenFocus(this, 4);
	});
	
	$("#P_CASH_MOBIL_NO_4").blur(function() {
		CommonJs.minLenFocus(this, 10);
	});
	
	$("#P_CASH_MOBIL_NO_5").blur(function() {
		CommonJs.minLenFocus(this, 10);
	});
	
	$("#B_MOBIL_NO_2").blur(function() {
		CommonJs.minLenFocus(this, 4);
	});
	
	$("#B_FAX_NO_2").blur(function() {
		CommonJs.minLenFocus(this, 4);
	});
	
	$("#B_FAX_NO_3").blur(function() {
		CommonJs.minLenFocus(this, 4);
	});
	
	$("#B_CASH_MOBIL_NO_2").blur(function() {
		CommonJs.minLenFocus(this, 4);
	});
	
	$("#B_CASH_MOBIL_NO_3").blur(function() {
		CommonJs.minLenFocus(this, 4);
	});
	
	$("#B_CASH_MOBIL_NO_4").blur(function() {
		CommonJs.minLenFocus(this, 10);
	});
	
	$("#B_CASH_MOBIL_NO_5").blur(function() {
		CommonJs.minLenFocus(this, 10);
	});
	// 최소값 체크 ====================================================
	
	//$("#P_CREDIT_USE_YN").val("N");	// 외상거래유무 default 'N'
	//$("#B_CREDIT_USE_YN").val("N");	// 외상거래유무 default 'N'
	
});