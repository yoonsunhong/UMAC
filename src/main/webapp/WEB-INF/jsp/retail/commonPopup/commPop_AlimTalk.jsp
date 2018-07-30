<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%--
	설명: 알림톡 발송 공통팝업 관리
	
	알림톡 발송 commPop_AlimTalk.jsp 를 include 하시고 사용하시면 됩니다.
	
	 	
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2017-06-09    김경진       초기작성 
	------------------------------------------------------
	version : 1.0
--%> 
<!-- 다이얼로그 옵션 설정 - dialogClass: "p_f" 추가 -->
	
	<!-- 알림톡 대상 리스트 조회  -->
	<div id="alimtalk_pop1" style="display:none;">
		<div id="pop_wrap3">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l">외상매출입금_알림톡</h1>
				<div class="f_r">
					<c:if test="${sessionScope.AUTH_SAVE eq 'Y'}">
						<button type="button" class="btn btn_style4" id="btn_atk_save" ><spring:message code="btnSave"/></button>
					</c:if>
					<c:if test="${sessionScope.AUTH_SEARCH eq 'Y'}">
						<button type="button" class="btn btn_style4" id="btn_atk_search" ><i class="fa fa-search"></i><spring:message code="btnSearch"/></button>
					</c:if>
					<%-- <button type="button" class="btn btn_style4" id="btn_atk_close" ><spring:message code="btnClose"/></button> --%>
				</div>
			</header>
			
			<form name="frm_alimTalk" id="frm_alimTalk">
				<input type="hidden" name="ATK_CORP_CODE" id="ATK_CORP_CODE" value="${sessionScope.CORP_CODE }" />	<!-- 기업코드 -->
				<input type="hidden" name="ATK_REG_ID" id="ATK_REG_ID" value="${sessionScope.ID }" />
				<input type="hidden" name="ATK_MEM_LIST" id="ATK_MEM_LIST" />	<!-- 회원정보 array -->
				<input type="hidden" name="ATK_pageIndex" id="ATK_pageIndex" value="1" />
				<input type="hidden" name="ATK_pageUnit" id="ATK_pageUnit" value="20" />	<!-- 한 페이지당 게시되는 게시물 건 수 -->
				<input type="hidden" name="ATK_pageSize" id="ATK_pageSize" value="10" />	<!-- 페이지 리스트에 게시되는 페이지 건수, -->
				<input type="hidden" name="ATK_COLUMN_NAME" id="ATK_COLUMN_NAME" />
				<input type="hidden" name="ATK_ORDERBY" id="ATK_ORDERBY" />
				
				<!-- 조회폼 영역 -->
				<div class="search_area" id="top_search">
					<div class="last">
						<label for=""><em>필수입력항목</em><spring:message code="store"/></label>
						<select id="ATK_STR_CODE" name="ATK_STR_CODE" >
						</select>
						
						<label for=""><em>필수입력항목</em>입금일자</label>
						<input type="text" id="ATK_DT_S" name="ATK_DT_S" class="datepicker" /> ~ <input type="text" name="ATK_DT_E" id="ATK_DT_E" class="datepicker" />
						
					</div>
				</div>
				<!-- //조회폼 영역 -->
				
			</form>
			
			<div id="pop_cnt" class="clear p_r">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder_atk1">
						</div>
						<div class="gridPaging" id="gridPageNavigationDiv">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 알림톡 대상 리스트 조회  -->
	
	<script type="text/javascript">
		
		// ----------------------- 그리드 설정 시작 -------------------------------------
		//rMate그리드 경로정보 셋팅
		rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
		rMateGridH5.setConfig(rMateGridH5.style);
		
		//rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
		var jsVars_atk1 = "rMateOnLoadCallFunction=gridReadyHandler";
		
		//rMateDataGrid 를 생성합니다.
		//파라메터 (순서대로)
		//1. 그리드의 id ( 임의로 지정하십시오. )
		//2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
		//3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
		//4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
		//5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
		rMateGridH5.create("grid_atk1", "gridHolder_atk1", jsVars_atk1, "100%", "500px");
		
		//그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
		//rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
		//이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
		//파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
		
		// 전역변수
		var gridApp_atk1, gridRoot_atk1, dataGrid_atk1, dataRow_atk1, selectorColumn_atk1;
		var collection_atk1; // 그리드의 데이터 객체
		var gridData_atk = [];
		var totalCnt_atk = 0;	// 전체건수
		var RowsPerPage_atk = 20;// 1페이지에서 보여줄 행 수
		var pageIndex_atk = 1;	// 요청페이지번호
		
		//그리드1 레디 핸들러
		function gridReadyHandler(id) {
			// rMateGrid 관련 객체
			
			if(id == "grid_atk1")
			{
				//그리드1에 헤더 및 레이아웃 셋팅 (개인탭)
				gridApp_atk1 = document.getElementById(id); // 그리드를 포함하는 div 객체
				gridRoot_atk1 = gridApp_atk1.getRoot(); // 데이터와 그리드를 포함하는 객체
				
				gridApp_atk1.setLayout(layoutStr_atk1);	// 데이터와 그리드를 포함하는 객체
				gridApp_atk1.setData(gridData_atk);	// 초기 그리드 행추가를 위해 null 데이터 셋팅
				
				gridRoot_atk1.addEventListener("layoutComplete", layoutCompleteHandler_talk1);
				gridRoot_atk1.addEventListener("dataComplete", dataCompleteHandler_talk1);
			}
			
		}
		
		function layoutCompleteHandler_talk1() {
			dataGrid_atk1 = gridRoot_atk1.getDataGrid();  // 그리드 객체
			
			// 헤드 정렬 초기화
			rMateSortHeadInit(dataGrid_atk1);
		}
		
		//그리드1 컴플릿트 핸들러
		function dataCompleteHandler_talk1(event) {
			
			// 데이터 그리드의 내부의 데이터를 담고있는 객체 입니다.
			collection_atk1 = gridRoot_atk1.getCollection();
			
			selectorColumn_atk1 = gridRoot_atk1.getObjectById("selector");
			
			//그리드1 셀선택 이벤트
			dataGrid_atk1.addEventListener("itemClick", itemClickHandler_talk1);
			
			//그리드1 헤더 클릭 이벤트
			dataGrid_atk1.addEventListener("headerRelease", headerRelease1);
			
			drawGridPagingNavigation(totalCnt_atk, RowsPerPage_atk, pageIndex_atk, "gridMovePage");
		}
		
		//그리드1 ROW 원클릭 이벤트
		function itemClickHandler_talk1(event){
			
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow_atk1 = gridRoot_atk1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid_atk1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			
			//$("#P_CUST_NO").val(dataRow_atk1.CUST_NO);
			
		}
		
		// 그리드 헤더 정렬 기능 이벤트
		function headerRelease1(event) {
			
			//헤드 정렬 설정
			rMateSortHeadRelease(dataGrid_atk1, event, "ATK_COLUMN_NAME", "ATK_ORDERBY");
			
			getAtkGridData(false);
		}
		
		function gridMovePage(page) {
			$("#pageIndex").val(page);
			pageIndex = page;
			getAtkGridData(false);
		}
		
		//그리드1 헤더 및 레이아웃
		var layoutStr_atk1 =
			'<rMateGrid>\
				<DateFormatter id="datefmt" formatString="YYYY-MM-DD HH:MM:SS"/>\
				<DataGrid id="dg_atk1" sortableColumns="true" selectionMode="multipleRows" horizontalScrollPolicy="on">\
					<columns>\
						<DataGridSelectorColumn id="selector" textAlign="center" sortable="false" width="50" />\
						<DataGridColumn dataField="CUST_NAME" headerText="'+cusName+'" textAlign="center" width="90" />\
						<DataGridColumn dataField="CALLPHONE" headerText="'+mobilePhoneNumber+'" textAlign="center" width="120" sortable="false" labelJsFunction="rMateLabelPhoneFunc2" />\
						<DataGridColumn dataField="INTIME" headerText="생성일시" textAlign="center" width="140" formatter="{datefmt}" />\
						<DataGridColumn dataField="MSG" headerText="알림톡 메세지" textAlign="center" width="1500" />\
						<DataGridColumn dataField="SEQNO" headerText="" textAlign="center" visible="false"/>\
					</columns>\
				</DataGrid>\
			</rMateGrid>';
		
		//----------------------- 그리드 설정 끝 -----------------------
		
		// 회원정보 조회
		function getAtkGridData(isHeadDefault) {
			
			if(isHeadDefault == true)
			{
				// 헤더 기본값 셋팅
				rMateSortHeadSetDefault(dataGrid_atk1, "ATK_COLUMN_NAME", "ATK_ORDERBY");
			}
			
			var param = $("#frm_alimTalk").serializeArray();
			
			//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
			jQuery.ajax({
			    url:"/alimtalkList102.do",
			    type:"POST",
				datatype:"json",
				async:false,
				data: param,
				success:function(data){
					
					if(typeof data.list != "undefiend" && data.list != null)
					{
						//그리드1 데이터 조회
						gridData_atk = data.list;
						gridApp_atk1.setData(gridData_atk);
						totalCnt_atk = data.totalCount;
						
						drawGridPagingNavigation(totalCnt_atk, RowsPerPage_atk, pageIndex_atk, "gridMovePage");
					}
			    },
			    complete : function(data) {
			    },
			    error : function(xhr, status, error) {
			    	CommonJs.alertErrorStatus(xhr.status, error);
			    }
			});
		}
		
		// 알림톡 발송
		function sendAtkData()
		{
			var selectedOrder = selectorColumn_atk1.getSelectedItems();
			var memList = "";
			
			if(selectedOrder.length < 1)
			{
				alert("알림톡 전송할 회원을 선택 해주세요.");
				return;
			}
			
			for(var i=0; i<selectedOrder.length; i++)
			{
				if(memList != "")
				{
					memList += "@";
				}
				memList += selectedOrder[i].SEQNO + "|" + selectedOrder[i].CUST_NAME +  "|" + selectedOrder[i].CALLPHONE;
			}
			
			CommonJs.sendAlimtalk("", memList, "dadam_102_2", 0);	// 알림톡 발송
			
			getAtkGridData(true);
		}
		
		$(document).ready(function(){
			$("#alimtalk_pop1").dialog({
		        autoOpen : false,
			    modal : true,
			    width : 900,
			    resizable : false,
			    position : "center",
			    open: function(){
			    	$("body").css("overflow-y", "hidden");
			    },
			    close: function(){
			    	$("body").css("overflow-y", "scroll");
			    }
			}); 
			
			var date = new CommDateManager().getDate("yyyy-mm-dd");
			var bDate = new CommDateManager().getDate("yyyy-mm") + "-01";
			
			$("#ATK_DT_S").val(bDate);
			$("#ATK_DT_E").val(date);
			
			getStoreCode("ATK_STR_CODE");
			
			$("#btn_atk_close").click(function() {
				$("#alimtalk_pop1").dialog( "close" );
			});
			
			$("#btn_atk_search").click(function() {
				getAtkGridData(true);
			});
			
			$("#btn_atk_save").click(function() {
				sendAtkData();
			});
			
		});
		
		
	</script>
	