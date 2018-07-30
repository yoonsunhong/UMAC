/********************************************************
 * 설명:  영업정보 > POS정산 > POS마감정산
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.04.20
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
rMateGridH5.create("grid1", "gridHolder1", jsVars1, "100%", "526px");

//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.

//그리드 데이터활용을 위한 전역변수
var gridApp1, gridRoot1, dataGrid1, dataRow1, selectorColumn1;
var collection1; // 그리드의 데이터 객체
var src1;
var gridData = [];
var fgAmt3 = -1;	// 대변 차변 차이
var rowCnt = 0;		// row 갯수
var delFlag = "";
var isGridEdit;
var saleAmt;
//그리드1 레디 핸들러
function gridReadyHandler(id) {
	if(id == "grid1")
	{
		//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
		gridApp1 = document.getElementById(id); // 그리드를 포함하는 div 객체
		gridRoot1 = gridApp1.getRoot(); // 데이터와 그리드를 포함하는 객체
		
		gridApp1.setLayout(layoutStr1);	// 데이터와 그리드를 포함하는 객체
		gridApp1.setData(gridData);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
		
		gridRoot1.addEventListener("layoutComplete", layoutCompleteHandler1);
		gridRoot1.addEventListener("itemDataChanged", itemDataChangeHandler1);
		gridRoot1.addEventListener("dataComplete", dataCompleteHandler1);
	}
}

function layoutCompleteHandler1() {
	dataGrid1 = gridRoot1.getDataGrid();  // 그리드 객체
	
	var T_DRCR_FG = gridRoot1.getObjectById("T_DRCR_FG");
	T_DRCR_FG.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid2("DRCR_FG") );
	
	var T_ACCT_CD = gridRoot1.getObjectById("T_ACCT_CD");
	T_ACCT_CD.setItemRendererDataProvider( getCommonCodeSelectBoxListInGrid3("ACCT_CD") );
}

//그리드1 컴플릿트 핸들러
function dataCompleteHandler1(event) {
	
	// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
	collection1 = gridRoot1.getCollection();
	
	// 전체 데이타 가져오기
	src1 = collection1.getSource();
	rowCnt = src1.length;
	
	setGridEdit();
	
	// 그리드1 셀선택 이벤트
	dataGrid1.addEventListener("itemClick", itemClickHandler1);
	
	// 더블클릭 이벤트
	dataGrid1.addEventListener("itemDoubleClick", itemDoubleClickHandler1);
}

function itemDoubleClickHandler1(event) {
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	
}

function itemDataChangeHandler1(event){
	var rowIndex = event.rowIndex;                  // 변경된 행번호
    var columnIndex = event.columnIndex;        // 변경된 열번호
    var dataField = event.dataField;                // 변경된 열의 데이터 필드
    var dataRow = gridRoot1.getItemAt(rowIndex); // 변경된 데이터 레코드
    var oldValue = event.value;                     // 변경전 값
    var newValue = event.newValue;                  // 변경후 값
    
   // alert("로우인덱스:"+ rowIndex);
    //alert("컬럼인덱스:"+ columnIndex);
	if (dataField == "SALE_AMT") {
		if (newValue == null || newValue == ""){
			//값을 입력하세요.
			alert(mentWmsIn1);
			gridRoot1.setItemFieldAt(oldValue, rowIndex , "SALE_AMT");
			return;
		}else{
			 gridRoot1.setItemFieldAt(newValue, rowIndex , "SALE_AMT");
			 
			 src1 = collection1.getSource();
			rowCnt = src1.length;
			 for(var i=0;rowCnt > i;i++){
				var acctNm = gridRoot1.getItemFieldAt(i, "ACCT_NAME");
				if(acctNm=="현금판매대금"){
					var amt = gridRoot1.getItemFieldAt(i, "SALE_AMT");
					if(amt == undefined || amt == null){
						amt=0;
					}
					if(oldValue == undefined || oldValue == null){
						oldValue=0;
					}
					gridRoot1.setItemFieldAt(parseInt(amt)-parseInt(newValue)+parseInt(oldValue), i, "SALE_AMT");
					break;
				}
			 }
		 }
	}
	
	if(dataField == "ACCT_CD"){
		var data = getCommonCodeSelectBoxListInGrid2("ACCT_CD");
		for(var i=0; i<data.length;i++){
			if(newValue == data[i].code){
				acctNm=data[i].label;
				gridRoot1.setItemFieldAt(data[i].label, rowIndex, "ACCT_NAME");
				
				//점포별로 값 세팅
				jQuery.ajax({ 
					url:"/getCommonMgmtEntry.do",           
					type:"POST",
					datatype:"json",
					async:false,
					data: {   "CD_CL"  : "VEN_CODE"
						  ,       "CD_ID"  : $('#P_STR_CODE').val()   
					},
					success:function(data){
					  
					if(  data.length > 0 )
					{   
						if(newValue !="10800"){
							gridRoot1.setItemFieldAt(data[0].MGMT_ENTRY_1, rowIndex, "VEN_CODE");
							gridRoot1.setItemFieldAt(data[0].CD_NM, rowIndex, "VEN_NAME");
						}else{
							gridRoot1.setItemFieldAt("09999", rowIndex, "VEN_CODE");
							gridRoot1.setItemFieldAt("점포지출", rowIndex, "VEN_NAME");
						}
					} else {
					    
					   return;
					}
					},
					complete : function(data) {
					  
					},
					error : function(xhr, status, error) {
					 CommonJs.alertErrorStatus(xhr.status, error);
					}
				});

				
				break;
			}
		}
	}
	
}


// 그리드1 ROW 원클릭 이벤트
function itemClickHandler1(event){
	
	var rowIndex = event.rowIndex;
	var columnIndex = event.columnIndex;
	dataRow1 = gridRoot1.getItemAt(rowIndex);
	// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
	var column = dataGrid1.getDisplayableColumns()[columnIndex];
	var dataField = column.getDataField();
	clickData1 = dataRow1[dataField];
	
	delFlag = dataRow1.IN_FLAG;
	saleAmt = dataRow1.SALE_AMT;
}

// 행추가 row 만 편집 가능하도록
// <DataGrid id="dg1" editable="true" doubleClickEnabled="true" itemEditBeginningJsFunction="itemEditBeginningFunction">\
function itemEditBeginningFunction(rowIndex, columnIndex, item, dataField) {
    var changedData = gridRoot1.getChangedData();//추가, 수정, 삭제된 행의 데이터를 가져옵니다
    var inFlag = gridRoot1.getItemFieldAt( rowIndex , "IN_FLAG");
    
    if(inFlag == "M"){
		if(  columnIndex >= 0  ){
			return true;  //return 값이 true면 editable이 가능하고. false면 editable이 불가능합니다.
		}else{
			return false;
		}
    }
    
    for (var i = 0; i < changedData.length; i++) {
        // 변경된 데이터에 insert로 들어 있으면
        if (item === changedData[i].data && changedData[i].job == "I" ){
        	return true;
        }else{
        	return false;
        }
    }

}


//----------------------- 그리드 설정 끝 -----------------------
var layoutStr1 =
	'<rMateGrid>\
		<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg1" sortableColumns="true" editable="true" doubleClickEnabled="true" itemEditBeginningJsFunction="itemEditBeginningFunction"   >\
			<columns>\
				<DataGridColumn dataField="SEQ" headerText="순번"  textAlign="center" sortable="false" width="50" editable="false" />\
				<DataGridColumn dataField="DRCR_FG" id="T_DRCR_FG" headerText="차대구분" textAlign="center" width="70" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="ACCT_CD" id="" headerText="계정코드" textAlign="center" width="70" maxChars="5" type="int" editable="false" />\
				<DataGridColumn dataField="ACCT_CD" id="T_ACCT_CD" headerText="계정과목" textAlign="center" width="100" itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code" itemRenderer="DataProviderItem" />\
				<DataGridColumn dataField="ACCT_NAME" headerText="계정명칭" textAlign="left" width="130"  />\
				<DataGridColumn dataField="VEN_CODE" id="T_VEN_CODE" headerText="회계코드" textAlign="center" width="70" maxChars="5" type="int" />\
				<DataGridColumn dataField="VEN_NAME" id="T_VEN_NAME" headerText="협력업체" textAlign="left" width="130" />\
				<DataGridColumn dataField="SALE_AMT" id="T_SALE_AMT" headerText="금액" textAlign="right" width="100" formatter="{numfmt}" maxChars="12" type="int" />\
				<DataGridColumn dataField="RMK_DC" id="T_RMK_DC" headerText="적요" textAlign="left" />\
				<DataGridColumn dataField="CONF_TYPE" headerText="확정" textAlign="center" width="60" editable="false" />\
				<DataGridColumn dataField="IEMP_NAME" headerText="등록자" textAlign="center" width="60" editable="false" />\
				<DataGridColumn dataField="IDATE" headerText="등록일" textAlign="center" formatter="{datefmt}" width="80" editable="false" />\
				<DataGridColumn dataField="CORP_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="STR_CODE"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="SALE_DT"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="IN_FLAG"  headerText="" textAlign="center" visible="false"/>\
				<DataGridColumn dataField="BUSI_NO" headerText="사업자번호" textAlign="center" width="100" labelJsFunction="rMateLabelBusiFunc" maxChars="10" type="int" visible="false"/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

//목록 그리드 조회
function getGridData() {
	var param = $("#frm").serializeAllObject();
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	fgAmt3 = -1;
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/posClosedDouzoneDayList.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		beforeSend : function(){
			dataGrid1.setEnabled(false);
			gridRoot1.addLoadingBar();
		},
		success:function(data){
			gridData = data.list;
			gridApp1.setData(gridData);
			
			getGridData2();
	    },
	    complete : function(data) {
	    	dataGrid1.setEnabled(true);
			gridRoot1.removeLoadingBar();
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

// 그리드 수정 가능 & 불가 조정
function setGridEdit()
{
	isGridEdit = true;
	if(src1 != "undefined" && src1 != null)
	{
		for(var i=0; i<src1.length; i++)
		{
			if(src1[i].CONF_TYPE != "undefined" && src1[i].CONF_TYPE != null && src1[i].CONF_TYPE != "")
			{
				isGridEdit = false;
				break;
			}
		}
		
		var T_DRCR_FG = gridRoot1.getObjectById("T_DRCR_FG");//컬럼의 id 속성으로 설정된 값
		T_DRCR_FG.editable = isGridEdit;
		
		var T_ACCT_CD = gridRoot1.getObjectById("T_ACCT_CD");//컬럼의 id 속성으로 설정된 값
		T_ACCT_CD.editable = isGridEdit;
		
		var T_VEN_CODE = gridRoot1.getObjectById("T_VEN_CODE");//컬럼의 id 속성으로 설정된 값
		T_VEN_CODE.editable = isGridEdit;
		
		var T_VEN_NAME = gridRoot1.getObjectById("T_VEN_NAME");//컬럼의 id 속성으로 설정된 값
		T_VEN_NAME.editable = isGridEdit;
		
		var T_SALE_AMT = gridRoot1.getObjectById("T_SALE_AMT");//컬럼의 id 속성으로 설정된 값
		T_SALE_AMT.editable = isGridEdit;
		
		var T_RMK_DC = gridRoot1.getObjectById("T_RMK_DC");//컬럼의 id 속성으로 설정된 값
		T_RMK_DC.editable = isGridEdit;
		
	}
}

// 대변 차변 합계 가져오기
function getGridData2() {
	
	var param = $("#frm").serializeAllObject();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/posClosedDouzoneDaySum.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		success:function(data){
			
			$("#DRCR_FG_AMT1").text(CommonJs.numberFormat(CommonJs.isNullToString(data.DRCR_FG_AMT1, "0")));
			$("#DRCR_FG_AMT2").text(CommonJs.numberFormat(CommonJs.isNullToString(data.DRCR_FG_AMT2, "0")));
			$("#DRCR_FG_AMT3").text(CommonJs.numberFormat(CommonJs.isNullToString(data.DRCR_FG_AMT3, "0")));
			fgAmt3 = CommonJs.isNullToString(data.DRCR_FG_AMT3, -1);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


function insertAccountMsSql(   IN_DT      
					        ,  IN_SQ      		,  LN_SQ      ,  CO_CD      	,  IN_DIV_CD  
					        ,  LOGIC_CD   		,  ISU_DT     ,  ISU_SQ     	,  DIV_CD     
					        ,  DEPT_CD    	    ,  EMP_CD     ,  ACCT_CD    	,  DRCR_FG    
					        ,  ACCT_AM          ,  RMK_NB     ,  RMK_DC     	,  ATTR_CD    
					        ,  TRCD_TY    	    ,  TRNM_TY    ,  DEPTCD_TY  	,  PJTCD_TY   
					        ,  CTNB_TY    	    ,  FRDT_TY    ,  TODT_TY    	,  QT_TY      
					        ,  AM_TY      	    ,  RT_TY      ,  DEAL_TY    	,  USER1_TY   
					        ,  USER2_TY   	    ,  TR_CD      ,  TR_NM      	,  CT_DEPT    
					        ,  DEPT_NM    	    ,  PJT_CD     ,  PJT_NM     	,  CT_NB      
					        ,  FR_DT      	    ,  TO_DT      ,  CT_QT          ,  CT_AM                            
					        ,  CT_RT       		,  CT_DEAL    ,  DEAL_NM    	,  CT_USER1   
					        ,  USER1_NM   	    ,  CT_USER2   ,  USER2_NM   	,  EXCH_TY   
					        ,  EXCH_AM          ,  PAYMENT    ,  ISU_NM     	,  ENDORS_NM  
					        ,  BILL_FG1   	    ,  BILL_FG2   ,  DUMMY1     	,  DUMMY2     
					        ,  DUMMY3     	    ,  ISU_DOC    ,  JEONJA_YN  	,  EX_FG      
					        ,  YN         	    ,  INSERT_DT 		
 
)
{
	jQuery.ajax({
	    url:"/insertAccountMsSql.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: {    IN_DT    : IN_DT         
		        ,  IN_SQ    : IN_SQ 		,  LN_SQ     :  LN_SQ       ,  CO_CD     : CO_CD	 ,  IN_DIV_CD  :  IN_DIV_CD
		        ,  LOGIC_CD : LOGIC_CD 		,  ISU_DT    :  ISU_DT      ,  ISU_SQ    : ISU_SQ	 ,  DIV_CD     :  DIV_CD
		        ,  DEPT_CD  : DEPT_CD 	    ,  EMP_CD    :  EMP_CD      ,  ACCT_CD   : ACCT_CD	 ,  DRCR_FG    :  DRCR_FG
		        ,  ACCT_AM  : ACCT_AM       ,  RMK_NB    :  RMK_NB 	    ,  RMK_DC    : RMK_DC	 ,  ATTR_CD    :  ATTR_CD
		        ,  TRCD_TY  : TRCD_TY 	    ,  TRNM_TY   :  TRNM_TY     ,  DEPTCD_TY : DEPTCD_TY ,  PJTCD_TY   :  PJTCD_TY
		        ,  CTNB_TY  : CTNB_TY	    ,  FRDT_TY   :  FRDT_TY     ,  TODT_TY   : TODT_TY	 ,  QT_TY      :  QT_TY
		        ,  AM_TY    : AM_TY 	    ,  RT_TY     :  RT_TY       ,  DEAL_TY   : DEAL_TY	 ,  USER1_TY   :  USER1_TY
		        ,  USER2_TY : USER2_TY	    ,  TR_CD     :  TR_CD       ,  TR_NM     : TR_NM	 ,  CT_DEPT    :  CT_DEPT
		        ,  DEPT_NM  : DEPT_NM 	    ,  PJT_CD    :  PJT_CD      ,  PJT_NM    : PJT_NM	 ,  CT_NB      :  CT_NB
		        ,  FR_DT    : FR_DT 	    ,  TO_DT     :  TO_DT  	    ,  CT_QT     : CT_QT     ,  CT_AM      :  CT_AM                   
		        ,  CT_RT    : CT_RT   		,  CT_DEAL   :  CT_DEAL     ,  DEAL_NM   : DEAL_NM	 ,  CT_USER1   :  CT_USER1
		        ,  USER1_NM : USER1_NM 	    ,  CT_USER2  :  CT_USER2 	,  USER2_NM  : USER2_NM	 ,  EXCH_TY    :  EXCH_TY
		        ,  EXCH_AM  : EXCH_AM       ,  PAYMENT   :  PAYMENT  	,  ISU_NM    : ISU_NM	 ,  ENDORS_NM  :  ENDORS_NM
		        ,  BILL_FG1 : BILL_FG1 	    ,  BILL_FG2  :  BILL_FG2 	,  DUMMY1    : DUMMY1	 ,  DUMMY2     :  DUMMY2
		        ,  DUMMY3   : DUMMY3	    ,  ISU_DOC   :  ISU_DOC 	,  JEONJA_YN : JEONJA_YN ,  EX_FG      :  EX_FG
		        ,  YN       : YN 	    	,  INSERT_DT :  INSERT_DT
	        
		},
		success:function(data){

		
		
		
		},
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);
		    }
		});
	
}


// 회계승인 
function updatePosClosedDouzoneDay()
{
	var param = $("#frm").serializeAllObject();
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({
	    url:"/updatePosClosedDouzoneDay.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					getGridData();
					
					 //////////  회계서버이관 - 시작        ////////  updatePosClosedDouzoneDay.do 의 complete 헨들러에 넣는다.
			    	
			    	// ORACLE 에서 select 하고 결과를 java 에서 반복하여  MSSQL 서블릿에서 읽어서 처리한다. 
			    	// oracle 에서 select하는 작업
					//20171012 더존에 데이터 보내지 말라하여, 주석
			    	/*jQuery.ajax({
				    	    url:"/oracleToXmlFileSave.do",
				    	    type:"POST",
				    		datatype:"json",
				    		async:false,
				    		data: {
				    			   P_CORP_CODE :  'U1'
				    			,  P_SALE_DT   :  $("#P_SALE_DT").val().replace(/-/g, "") 
				    			,  P_STR_CODE  :  $("#P_STR_CODE").val()  
				    		},
				    		success:function(data){
				    			alert("회계서버 이관에 성공했습니다. "); 
				    	    },
				    	    complete : function(data) {
				    	    },
				    	    error : function(xhr, status, error) {
				    	    	alert("회계서버 이관 시 문제가 있습니다.\n관리자에게 문의하세요."); 
				    	    }
			    	});*/
					console.log("succes");			    	 
			    	// return;
			    	
			    	//////////		회계서버이관 - 끝         //////////////
			    	
				}
				else if(data.RETURN_CODE == -2)	// 마감생성 체크
				{
					alert("마감생성 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -3)	// 담당자 확정체크
				{
					alert("담당확정 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -4)	// 점장확정 체크
				{
					alert("점장확정 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -5)	// 회계승인 체크
				{
					alert("이미 회계승인 완료된 내역 입니다.");
				}
				else
				{
					alert(msgErrorDefault);
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


// 회계승인취소 
function canclePosClosedDouzoneDay()
{
	var param = $("#frm").serializeAllObject();
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({
	    url:"/canclePosClosedDouzoneDay.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert("회계승인이 취소 되었습니다.");
				}
				else if(data.RETURN_CODE == -2)	// 마감생성 체크
				{
					alert("마감생성 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -3)	// 담당자 확정체크
				{
					alert("담당확정 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -4)	// 점장확정 체크
				{
					alert("점장확정 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -5)	// 점장확정 체크
				{
					alert("회계승인이 되지 않았습니다.");
				}
				else
				{
					alert(msgErrorDefault);
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

// 점장확정
function updatePosClosedDouzoneDay1()
{
	var param = $("#frm").serializeAllObject();
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({
	    url:"/updatePosClosedDouzoneDay1.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					getGridData();
				}
				else if(data.RETURN_CODE == -2)	// 마감생성 체크
				{
					alert("마감생성 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -3)	// 담당자 확정체크
				{
					alert("담당확정 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -4)	// 점장확정 체크
				{
					alert("이미 점장확정 완료된 내역 입니다.");
				}
				else if(data.RETURN_CODE == -5)	// 회계승인 체크
				{
					alert("이미 회계승인 완료된 내역 입니다.");
				}
				else
				{
					alert(msgErrorDefault);
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

// 담당확정
function updatePosClosedDouzoneDay2()
{
	var param = $("#frm").serializeAllObject();
	
	if(rowCnt < 1)
	{
		alert("마감생성 후 담당확정 해주세요.");
		return;
	}
	
	if(fgAmt3 != 0)
	{
		alert("차변과 대변의 합계가 다릅니다. 확인하십시오.");
		return;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({
	    url:"/updatePosClosedDouzoneDay2.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					getGridData();
				}
				else if(data.RETURN_CODE == -2)	// 마감생성 체크
				{
					alert("마감생성 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -3)	// 담당자 확정체크
				{
					alert("이미 담당확정 완료된 내역 입니다.");
				}
				else if(data.RETURN_CODE == -4)	// 점장확정 체크
				{
					alert("이미 점장확정 완료된 내역 입니다.");
				}
				else if(data.RETURN_CODE == -5)	// 회계승인 체크
				{
					alert("이미 회계승인 완료된 내역 입니다.");
				}
				else
				{
					alert(msgErrorDefault);
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

// 마감생성
function updatePosClosedDouzoneDay3()
{
	var param = $("#frm").serializeAllObject();
	var salDt = parseInt($("#P_SALE_DT").val().replace(/-/g, ""));
	var nowDt = parseInt(date.replace(/-/g, ""));
	
	if(salDt > nowDt)
	{
		alert("현재일보다 클수 없습니다.");
		$("#P_SALE_DT").val(beforeDate);
		return;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({ 
	    url:"/updatePosClosedDouzoneDay3.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					getGridData();
				}
				else if(data.RETURN_CODE == 0)
				{
					alert("마감생성할 매출이 없습니다.");
				}
				else if(data.RETURN_CODE == -2)
				{
					alert("회계 승인 처리되어 마감생성 할수 없습니다.");
				}
				else
				{
					alert(msgErrorDefault);
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

// 행추가 항목 저장
function updatePosClosedDouzoneDay4()
{
	var param = $("#frm").serializeAllObject();
	var salDt = parseInt($("#P_SALE_DT").val().replace(/-/g, ""));
	var nowDt = parseInt(date.replace(/-/g, ""));
	
	if(salDt > nowDt)
	{
		alert("현재일보다 클수 없습니다.");
		$("#P_SALE_DT").val(beforeDate);
		return;
	}
	
	setAddList();
	if($("#P_ADD_LIST").val() == "")
	{
		alert("변경된 내역이 없습니다.");
		return;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({ 
	    url:"/updatePosClosedDouzoneDay4.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					getGridData();
				}
				else if(data.RETURN_CODE == -2)
				{
					alert("담당확정되어 마감생성 할수 없습니다.");
				}
				else
				{
					alert(msgErrorDefault);
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

// 재생성
function updatePosClosedDouzoneDay5()
{
	var param = $("#frm").serializeAllObject();
	var salDt = parseInt($("#P_SALE_DT").val().replace(/-/g, ""));
	var nowDt = parseInt(date.replace(/-/g, ""));
	
	if(salDt > nowDt)
	{
		alert("현재일보다 클수 없습니다.");
		$("#P_SALE_DT").val(beforeDate);
		return;
	}
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({ 
	    url:"/updatePosClosedDouzoneDay5.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					getGridData();
				}
				else if(data.RETURN_CODE == -2)	// 마감생성 체크
				{
					alert("마감생성 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -5)	// 회계승인 체크
				{
					alert("이미 회계승인 완료된 내역 입니다.");
				}
				else
				{
					alert(msgErrorDefault);
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

// 행추가 항목 set
function setAddList()
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
	var changedData = gridRoot1.getChangedData();
	
	$("#P_ADD_LIST").val("");
	if (changedData.length > 0)
	{
		// P_ADD_LIST 파리미터에 아래와 같은 형식의 스트링을 ',' '|' 두개의 구분자로 서버에전송 = '111|222|333,111|222|333,111|222|333'
		/* 순번	|차대구분	|계정코드	|회계코드		|협력업체		|사업자번호	|금액			|적요		|입력구분(M:수기 A:자동 )
		 * SEQ	|DRCR_FG|ACCT_CD|VEN_CODE	|VEN_NAME	|BUSI_NO|SALE_AMT	|RMK_DC	|M
		 */
		var data;
		for (var i = 0; i < changedData.length; i++)
		{
			//console.log("index:"+changedData[i].idx+"\n"+"job:"+changedData[i].job+"\n"+"data:"+changedData[i].data);
			data = changedData[i].data;
			
			if(paramData != "")
			{
				paramData += "@";
			}
			paramData += changedData[i].job + "|" + CommonJs.isNullToString(data.SEQ, "") + "|" + CommonJs.isNullToString(data.DRCR_FG, "") + "|" + CommonJs.isNullToString(data.ACCT_CD, "")
				+ "|" + CommonJs.isNullToString(data.ACCT_NAME, "") + "|" + CommonJs.isNullToString(data.VEN_CODE, "") + "|" + CommonJs.isNullToString(data.VEN_NAME, "")
				+ "|" + CommonJs.isNullToString(data.BUSI_NO, "") + "|" + CommonJs.isNullToString(data.SALE_AMT, "") + "|" + CommonJs.isNullToString(data.RMK_DC, "") + "|" + CommonJs.isNullToString(data.IN_FLAG, "");
		}
		$("#P_ADD_LIST").val(paramData);
	}
	//console.log(paramData);
}

// 행추가
function fn_addRow() {
	
	/*
	<DataGridColumn dataField="SEQ" headerText="순번"  textAlign="center" sortable="false" width="50" />\
	<DataGridColumn dataField="DRCR_FG" headerText="차대구분"  textAlign="center" sortable="false" width="70" />\
	<DataGridColumn dataField="ACCT_CD" headerText="계정코드" textAlign="center" width="80" />\
	<DataGridColumn dataField="ACCT_NAME" headerText="계정과목" textAlign="center" width="120" />\
	<DataGridColumn dataField="VEN_CODE" headerText="회계코드" textAlign="center" width="90" />\
	<DataGridColumn dataField="VEN_NAME" headerText="협력업체" textAlign="left" />\
	<DataGridColumn dataField="BUSI_NO" headerText="사업자번호" textAlign="center" width="100" labelJsFunction="rMateLabelBusiFunc" />\
	<DataGridColumn dataField="SALE_AMT" headerText="금액" textAlign="right" width="100" formatter="{numfmt}" />\
	<DataGridColumn dataField="RMK_DC" headerText="적요" textAlign="left" width="250" />\
	*/
	
	src1 = collection1.getSource();
	rowCnt = src1.length;
	
	if(rowCnt < 1)
	{
		alert("마감생성 후 수정 가능 합니다.");
		return;
	}
	
	if(isGridEdit == false)
	{
		alert("확정된 내역은 수정할 수 없습니다.");
		return;
	}
	
	var seq = 1;
	if(rowCnt > 0)
	{
		dataRow1 = gridRoot1.getItemAt(rowCnt-1);
		seq = dataRow1.SEQ+1;
	}
	
	var item = { 	"SEQ" : seq
					, "IN_FLAG" : "M"
					//, "DRCR_FG_NM" : ""
				};
	
	/* addItemAt(item, index, ediMode, editColumnNo)
	 * item	: 등록할 행의 data객체
	 * index : 등록할 행의 index번호, 넣지 않거나 -1을 넣어주면 맨마지막에 등록합니다.
	 * ediMode : 등록을 수행한 후 해당 행의 수정모드로 전환할지 여부. (기본값 : true)
	 * editColumnNo : 등록을 수행한 후 수정모드로 전환할 컬럼의 번호. (기본값 : -1)
	 */
	gridRoot1.addItemAt(item, -1, true, 1);
}

// 행삭제
function fn_delRow() {
	
	if(src1.length < 1)
	{
		alert("마감생성 후 수정 가능 합니다.");
		return;
	}
	
	if(isGridEdit == false)
	{
		alert("확정된 내역은 수정할 수 없습니다.");
		return;
	}
	
	var lastRollOverIndex;
	lastRollOverIndex = gridRoot1.getLastRollOverIndex();
    if (lastRollOverIndex >= 0)
    {
    	if(delFlag == "M")
    	{
			src1 = collection1.getSource();
			rowCnt = src1.length;
			 for(var i=0;rowCnt > i;i++){
				var acctNm = gridRoot1.getItemFieldAt(i, "ACCT_NAME");
				if(acctNm=="현금판매대금"){
					var amt = gridRoot1.getItemFieldAt(i, "SALE_AMT");
					if(amt == undefined || amt == null){
						amt=0;
					}
					
					
				    var selectedIndex = dataGrid1.getSelectedIndex();
					saleAmt = gridRoot1.getItemFieldAt(selectedIndex, "SALE_AMT");
					if(saleAmt == undefined || saleAmt == null){
						saleAmt=0;
					}
					amt = parseInt(amt)+parseInt(saleAmt);
					gridRoot1.setItemFieldAt(amt, i, "SALE_AMT");
					gridRoot1.removeItemAt();
					break;
				}
			 }
    	}
    	else
    	{
    		alert("수기로 등록한 항목만 삭제 가능합니다.");
    	}
    }
    else
    {
    	alert(msgDeleteRowSel);	// 삭제할 행을 선택해주세요.
    }
}


//엑셀다운로드
function btn_excel_down_douzone_wait()
{
	var frm = document.frm;
	frm.action = "/posClosedDouzoneDayList_excel.do";
	frm.method = "post";
   	frm.submit();
}


//엑셀다운로드 (더존)
function btn_excel_down_douzone(){
	var frm = document.frm;
	var param = $("#frm").serializeAllObject();
	var go_excel_flag = "";
	
	param.P_STR_CODE = $("#P_STR_CODE").val();
	
	jQuery.ajax({
	    url:"/posClosedDouzoneDayList_excel_ch.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			console.log("ajax 성공 : ");
			console.log("date.return_code : " + data.RETURN_CODE);
				if(data.RETURN_CODE > 0){
					
					go_excel_flag = "Y";
					if(go_excel_flag == "Y"){
						frm.action = "/posClosedDouzoneDayList_excel.do";
						frm.method = "post";
					   	frm.submit();
					}
				}
				else if(data.RETURN_CODE == -2)	// 마감생성 체크
				{
					alert("마감생성 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -3)	// 담당자 확정체크
				{
					alert("담당확정 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -4)	// 점장확정 체크
				{
					alert("점장확정 되지 않았습니다.");
				}
				else if(data.RETURN_CODE == -5)	// 회계승인 체크
				{
					alert("회계승인이 되지 않았습니다.");
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


//엑셀다운로드
function excelExport()
{
	var date = new CommDateManager().getDate("yyyymmdd");
	
	dataGrid1.exportFileName = "POS마감정산_"+date+".xlsx";
	gridRoot1.excelExportSave("/gridExcelDown.do", false);
}

//출력
function btn_print(){
	
	var P_CORP_CODE	= $("#P_CORP_CODE").val();
	var P_STR_CODE		= $("#P_STR_CODE").val();
	var P_SALE_DT		= $("#P_SALE_DT").val().replace(/-/gi,'');
	var P_SALE_TEXT_DT	= $("#P_SALE_DT").val();
	var params = "?reportMode=HTML"	+
	"&P_CORP_CODE="		+P_CORP_CODE+
	"&P_STR_CODE="		+P_STR_CODE+
	"&P_SALE_DT="			+P_SALE_DT+
	"&P_SALE_TEXT_DT="	+P_SALE_TEXT_DT;
	 // AIViewer 파라미터
	window.open("aireportPosClosedDouzoneDayPrint.do"+params,'AIViewer','width=1180,height=900,top=10,left=10,toolbar=no,menubar=no,lacation=no,scrollbars=no,status=no,resizable=yes');
	
}

$(document).ready(function () {
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
	
	//초기 팝업 사이즈 조절
	$("#pop_wrap").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 380,
	    resizable : false,
	    position : "center",
	    open: function(){
	    	$("body").css("overflow-y", "hidden");
	    },
	    close: function(){
	    	$("body").css("overflow-y", "scroll");
	    }
	});
	
	// 점포코드 콤보 가져오기
	getStoreCode("P_STR_CODE");
	$("#P_STR_CODE").val($("#SESSION_STR_CODE").val());
	
	getCommonCodeSelectBoxList("P_TAX_GB", "TAX_GB");
	
	//달력설정
	//$(".datepicker").datepicker();
	
	var date = new CommDateManager().getDate("yyyy-mm-dd");
	var beforeDate = new CommDateManager().before(0, 0, 1).getDate("yyyy-mm-dd");	// 하루전
	
	$("#P_SALE_DT").val(beforeDate);
	
	// 달력체크
	$(".datepicker").datepicker({
		onSelect: function(dateText) {
			var salDt = parseInt($("#P_SALE_DT").val().replace(/-/g, ""));
			var nowDt = parseInt(date.replace(/-/g, ""));
			
			if(this.id == "P_SALE_DT")
			{
				if(salDt > nowDt)
				{
					alert("현재일보다 클수 없습니다.");
					$("#P_SALE_DT").val(beforeDate);
					return;
				}
			}
		},showMonthAfterYear:true
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function(){
		getGridData();
	});
	
	// 엑셀 다운(더존)
	$("#btn_excel_down_douzone").click(function() {
		btn_excel_down_douzone();
	});
	
	// 엑셀 다운 (자동분개)
	$("#btn_excel_down").click(function() {
		excelExport();
	});
	
	// 회계승인
	$("#btn_update").click(function() {
		updatePosClosedDouzoneDay();
	});
	
	// 회계승인취소
	$("#btn_cancle").click(function() {
		canclePosClosedDouzoneDay();
	});
	
	// 점장확정 버튼 클릭
	$("#btn_update1").click(function() {
		updatePosClosedDouzoneDay1();
	});
	
	// 담당확정 버튼 클릭
	$("#btn_update2").click(function() {
		updatePosClosedDouzoneDay2();
	});
	
	// 마감생성 버튼 클릭
	$("#btn_update3").click(function() {
		updatePosClosedDouzoneDay3();
	});
	
	// 행추가 저장 버튼 클릭
	$("#btn_update4").click(function() {
		updatePosClosedDouzoneDay4();
	});
	
	// 재생성
	$("#btn_update5").click(function() {
		updatePosClosedDouzoneDay5();
	});
	
	//사용자 권한정보 조회
	 var psotValue = {};
	 
	 jQuery.ajax({ 
	    url:"/selectUserOrgType.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: psotValue,
		success:function(data){  
			var sessionGroupCode = data[0].GROUP_CODE;
			if(sessionGroupCode == "ROLE001" || sessionGroupCode == "ROLE025" || sessionGroupCode == "ROLE026" || sessionGroupCode == "ROLE002"){
				$("#P_STR_CODE").attr("disabled", false);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);   
	    }
	});
	
});

