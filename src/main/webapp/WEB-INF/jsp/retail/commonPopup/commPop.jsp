<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%--
	설명: 공통팝업 관리
	
	공통코드를 쓸 페이지에 commPop.jsp 를 include 하시고 사용하시면 됩니다.
	** 예제는 commPopTest.jsp 에 호출 및 콜백function 예제가 있습니다. **
	예제 외적으로 필요한 정보가 있다면 fn_comm_****_callback function 에 
	추가로 받을 필드를 정의 후 사용하시면 되고(commPop.jsp, 해당 jsp callBack Function 두곳)
	현재 그리드에 받지 않는 필드값이 필요하다면 요청해 주시면 추가하도록 하겠습니다.
	 	
	수정일      	   수정자        수정내용
	------------------------------------------------------
	2016-12-16    오동근       초기작성 
	------------------------------------------------------
	version : 1.0
--%> 
<!-- 다이얼로그 옵션 설정 - dialogClass: "p_f" 추가 -->

<script type="text/javascript">
$(document).ready(function(){
	$("#comm_pop_wrap1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	}); 
	
	$("#comm_pop_wrap2").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,	    
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#comm_pop_wrap3").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 700,
	    height: 520,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	$("#comm_pop_wrap3_2").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 700,
	    height: 520,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#comm_pop_wrap4").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#comm_pop_wrap4_1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	
	$("#comm_pop_wrap5").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 450, 
	    height: 383, 
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#comm_pop_wrap6").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#comm_pop_wrap6_1").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	// 세션이 아닌 부모페이지 에서 선택한 STR_CODE 에 따라 상품을 조회하는  팝업 
	$("#comm_pop_wrap6_6").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	// 	상품구분별 검색  - 유재훈 추가 시작 
	$("#comm_pop_wrap7").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	// 	상품구분별 검색  - 유재훈 추가 끝 
	
	// 	주문상품 검색  - 권용욱 추가 시작 
	$("#comm_pop_wrap8").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 1100,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#comm_pop_wrap9").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 1100,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#comm_pop_wrap10").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	
	$("#comm_pop_wrap11").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	});
	// 	주문상품 검색  - 권용욱 추가 끝 
	
	// 묶음대표 상품
	$("#comm_pop_wrap12").dialog({
		  autoOpen : false,
		    modal : true,
		    width : 900,
		    height : 483,
		    resizable : false,
		    open: function(){
	    	$("body").css("overflow-y", "hidden");
	        },
	        close: function(){
	    	$("body").css("overflow-y", "scroll");
	        }
	});
	// 점별 배송구분(ROUTE_GB)별 상품검색  
	$("#comm_pop_wrap13").dialog({
		  autoOpen : false,
		    modal : true,
		    width : 900,
		    height: 483,
		    resizable : false,
		    open: function(){
	    	$("body").css("overflow-y", "hidden"); 
	        },
	        close: function(){
	    	$("body").css("overflow-y", "scroll");
	        }
	});	   
	
	//카드행사 카드 정보 조회
	$("#comm_pop_wrap14").dialog({
		  autoOpen : false,
		    modal : true,
		    width : 900,
		    height : 483,
		    resizable : false,
		    open: function(){
	    	$("body").css("overflow-y", "hidden");
	        },
	        close: function(){
	    	$("body").css("overflow-y", "scroll");
	        }
	});
	$("#comm_pop_wrap15").dialog({
		  autoOpen : false,
		    modal : true,
		    width : 600,
		    height : 483,
		    resizable : false,
		    open: function(){
	    	$("body").css("overflow-y", "hidden");
	        },
	        close: function(){
	    	$("body").css("overflow-y", "scroll");
	        }
	});
	$("#comm_pop_wrap16").dialog({
		  autoOpen : false,
		    modal : true,
		    width : 600,
		    height: 483, 
		    resizable : false,
		    open: function(){
	    	$("body").css("overflow-y", "hidden");
	        },
	        close: function(){
	    	$("body").css("overflow-y", "scroll");
	        }
	});
	
	//사은행사 마스터 증정권용 행사조회
	$("#comm_pop_wrap17").dialog({
		  autoOpen : false,
		    modal : true,
		    width : 900,
		    height : 483,
		    resizable : false,
		    open: function(){
	    	$("body").css("overflow-y", "hidden");
	        },
	        close: function(){
	    	$("body").css("overflow-y", "scroll");
	        }
	});
	//사은행사검색팝업	
	$("#comm_pop_wrap18").dialog({
		  autoOpen : false,
		    modal : true,
		    width : 900,
		    height : 433,
		    resizable : false,
		    open: function(){
	    	$("body").css("overflow-y", "hidden");
	        },
	        close: function(){
	    	$("body").css("overflow-y", "scroll");
	        }
	});
	
	// 점 발주시 상품이 R2 일 경우에는 물류센터의 상품이 검색 되는 팝업창 : 점상품조회(comm_pop_wrap6) 를 기반으로 제작함   
	$("#comm_pop_wrap19").dialog({
		  autoOpen : false,
		    modal : true,
		    width : 900,
		    height : 433,
		    resizable : false,
		    open: function(){
	    	$("body").css("overflow-y", "hidden");
	        },
	        close: function(){
	    	$("body").css("overflow-y", "scroll");
	        }
	});
	
	$("#comm_pop_wrap20").dialog({
	    autoOpen : false,
	    modal : true,
	    width : 900,
	    height : 483,
	    resizable : false,
	    open: function(){
    	$("body").css("overflow-y", "hidden");
        },
        close: function(){
    	$("body").css("overflow-y", "scroll");
        }
	}); 
	
	$('#P_TEXT1').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('1');
	    }
	});
	
	$('#P_TEXT2').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('2');
	    }
	});
	
	$('#P_TEXT3').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('3');
	    }
	});
	$('#P_TEXT3_2').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('3_2');
	    }
	});
	
	$('#P_TEXT4').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('4');
	    }
	});
	
	$('#P_TEXT4_1').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('4_1');
	    }
	});
	
	$('#P_TEXT5').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('5');
	    }
	});
	
	$('#P_TEXT6').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('6');
	    }
	});
	
	$('#P_TEXT6_1').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('6_1');
	    }
	});
	
	$('#P_TEXT6_6').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search6_6();
	    }
	});
	
	
	// 	상품구분별 검색  - 유재훈 추가 시작 
	$('#P_TEXT7').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search('7');
	    }
	});
	// 	상품구분별 검색  - 유재훈 추가 끝
	
	$('#P_TEXT8').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search8();
	    }
	});
	
	$('#P_TEXT9_1, #P_TEXT9_2').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search9();
	    }
	});
	
	$('#P_CUST_NM').on('keyup', function(e) {
	    if (e.which == 13) {
	        btn_comm_search10();
	    }
	});
	
	$('#P_TEXT11').on('keyup', function(e) {
	    if (e.which == 13) {
	    	btn_comm_search11();
	    }
	});
	
	// 묶음 대표 상품 검색
	$('#P_TEXT12').on('keyup', function(e) {
	    if (e.which == 13) {
	     
	    	btn_comm_search('12');
	    }
	});
	
	// 점별 배송구분(ROUTE_GB)별 상품검색
	$('#P_TEXT13').on('keyup', function(e) {
	    if (e.which == 13) {
	     
	    	btn_comm_search13() ;
	    }
	});
	// 점포조회
	$('#P_TEXT16').on('keyup', function(e) {
	    if (e.which == 13) {
	    	btn_comm_search('16') ;
	    }
	});
	
	$('#P_TEXT20').on('keyup', function(e) {
	    if (e.which == 13) {
	    	btn_comm_search('20') ;
	    }
	});
	
	
	// 결과내 검색 입력란에서  엔터키 시 작동
	$('#IN_SEARCH').on('keyup', function(e) {
	    if (e.which == 13) {
	    	runFilterFunction( ) ;
	    }
	});
	
	
	
	 
	
});

// ----------------------- 그리드 설정 시작 -------------------------------------
//rMate그리드 경로정보 셋팅
rMateGridH5.setAssetsPath("/resources/js/rMateGridH5/Assets/");
rMateGridH5.setConfig(rMateGridH5.style);

// rMate 그리드 생성 준비가 완료된 상태 시 호출할 함수를 지정합니다.
var jsVarsPopup = "rMateOnLoadCallFunction=gridReadyHandlerPopup";



// rMateDataGrid 를 생성합니다.
// 파라메터 (순서대로)
//  1. 그리드의 id ( 임의로 지정하십시오. )
//  2. 그리드가 위치할 div 의 id (즉, 그리드의 부모 div 의 id 입니다.)
//  3. 그리드 생성 시 필요한 환경 변수들의 묶음인 jsVars
//  4. 그리드의 가로 사이즈 (생략 가능, 생략 시 100%)
//  5. 그리드의 세로 사이즈 (생략 가능, 생략 시 100%)
rMateGridH5.create("grid10", "gridHolder10", jsVarsPopup, "100%", "300px");//1 회원검색
rMateGridH5.create("grid11", "gridHolder11", jsVarsPopup, "100%", "300px");//2 상품검색
rMateGridH5.create("grid12", "gridHolder12", jsVarsPopup, "100%", "337px");//3 협력업체검색
rMateGridH5.create("grid12_2", "gridHolder12_2", jsVarsPopup, "100%", "337px"); // 협력업체검색 - 공제/보류
rMateGridH5.create("grid13", "gridHolder13", jsVarsPopup, "100%", "300px");//4 사원검색
rMateGridH5.create("grid13_1", "gridHolder13_1", jsVarsPopup, "100%", "300px");//4 배달사원검색
rMateGridH5.create("grid14", "gridHolder14", jsVarsPopup, "100%", "200px");//5 부서검색
rMateGridH5.create("grid15", "gridHolder15", jsVarsPopup, "100%", "300px");//6 점별상품검색 
rMateGridH5.create("grid15_1", "gridHolder15_1", jsVarsPopup, "100%", "300px");//6 점별상품검색 _1
rMateGridH5.create("grid15_6", "gridHolder15_6", jsVarsPopup, "100%", "300px");//  부모창에서 선택한 점별상품검색
rMateGridH5.create("grid16", "gridHolder16", jsVarsPopup, "100%", "300px");//7 상품검색
rMateGridH5.create("grid17", "gridHolder17", jsVarsPopup, "100%", "300px");
rMateGridH5.create("grid18", "gridHolder18", jsVarsPopup, "100%", "300px");//9 행사상품검색	
rMateGridH5.create("grid19", "gridHolder19", jsVarsPopup, "100%", "300px");//10 주문번호검색
rMateGridH5.create("grid20", "gridHolder20", jsVarsPopup, "100%", "300px");//11 소분류 Category 검색
rMateGridH5.create("grid21", "gridHolder21", jsVarsPopup, "100%", "300px");//12 상품검색
rMateGridH5.create("grid22", "gridHolder22", jsVarsPopup, "100%", "300px");
rMateGridH5.create("grid23", "gridHolder23", jsVarsPopup, "100%", "300px"); //카드행사 카드 정보조회
rMateGridH5.create("grid24", "gridHolder24", jsVarsPopup, "100%", "300px"); //카드행사 카드 정보조회
rMateGridH5.create("grid25", "gridHolder25", jsVarsPopup, "100%", "300px"); //점포조회
rMateGridH5.create("grid26", "gridHolder26", jsVarsPopup, "100%", "300px"); //증정권 행사 조회
rMateGridH5.create("grid27", "gridHolder27", jsVarsPopup, "100%", "250px"); //18 사은행사검색팝업
rMateGridH5.create("grid28", "gridHolder28", jsVarsPopup, "100%", "250px"); // 점 발주 상품 조회 : R2 일 경우 물류센터 상품 보여주기
rMateGridH5.create("grid29", "gridHolder29", jsVarsPopup, "100%", "300px");//19 회원검색(사용중인 회원만)


// 그리드의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 그리드의 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 그리드에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateGridH5.create() 사용 시 사용자가 지정한 id 입니다.
function gridReadyHandlerPopup(id) {
	// 회원검색 팝업
	if (id == "grid10") {
		// rMateGrid 관련 객체
		gridApp10 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot10 = gridApp10.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp10.setLayout(layoutStr10);
		
		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow10 = gridRoot10.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid10.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData10 = dataRow10[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM1").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_user_callback(dataRow10);	
			}

			$("#comm_pop_wrap1").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler10 = function(event) {
			
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid10.getSelectedIndex();
			dataRow10 = gridRoot10.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM1").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_user_callback(dataRow10);	
			}

			$("#comm_pop_wrap1").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler10 = function(event) {
			dataGrid10 = gridRoot10.getDataGrid();	// 그리드 객체
			
			dataGrid10.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid10.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid10.addEvent("keydown", enterClickHandler10);
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot10.addEventListener("layoutComplete", layoutCompleteHandler10);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler10 = function(event) { 
		       dataGrid = gridRoot10.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot10.addEventListener("dataComplete", dataCompleteHandler10);
	
	// 상품검색 팝업
	}else if (id == "grid11") {
		// rMateGrid 관련 객체
		gridApp11 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot11 = gridApp11.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp11.setLayout(layoutStr11);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow11 = gridRoot11.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid11.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData11 = dataRow11[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM2").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_product_callback(dataRow11);
			}
			$("#IN_SEARCH").val("");  //  ROW 클릭 시 결과내 검색 입력란 초기화
			$("#comm_pop_wrap2").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler11 = function(event) {
			
			if(event.keyCode != "13") return;

			var rowIndex = dataGrid11.getSelectedIndex();
			dataRow11 = gridRoot11.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM2").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_product_callback(dataRow11);
			}
			$("#IN_SEARCH").val("");  //  ROW 클릭 시 결과내 검색 입력란 초기화
			$("#comm_pop_wrap2").dialog( "close" );
			
			return false;
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler11 = function(event) {
			dataGrid11 = gridRoot11.getDataGrid();	// 그리드 객체
			
			dataGrid11.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid11.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid11.addEvent("keydown", enterClickHandler11);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot11.addEventListener("layoutComplete", layoutCompleteHandler11);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler11 = function(event) {
				venCodeFilter("gridRoot11");
			
		       dataGrid = gridRoot11.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot11.addEventListener("dataComplete", dataCompleteHandler11);
	
		// 협력업체검색 팝업	
	}else if (id == "grid12") {
		// rMateGrid 관련 객체
		gridApp12 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot12 = gridApp12.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp12.setLayout(layoutStr12);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow12 = gridRoot12.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid12.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData12 = dataRow12[dataField];

			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM3").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_supply_callback(dataRow12);
			}
			
			$("#comm_pop_wrap3").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler12 = function(event) {
			if(event.keyCode != "13") return;
			dataGrid12.focus();
	 		var rowIndex = dataGrid12.getSelectedIndex();
			dataRow12 = gridRoot12.getItemAt(rowIndex);

			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM3").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_supply_callback(dataRow12);
			}
			
			$("#comm_pop_wrap3").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler12 = function(event) {
			dataGrid12 = gridRoot12.getDataGrid();	// 그리드 객체
			
			dataGrid12.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid12.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid12.addEvent("keydown", enterClickHandler12);
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot12.addEventListener("layoutComplete", layoutCompleteHandler12);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler12 = function(event) { 
		       dataGrid = gridRoot12.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot12.addEventListener("dataComplete", dataCompleteHandler12);
		
	 // 협력업체검색 - 공제/보류 팝업	
	}else if (id == "grid12_2") {
		// rMateGrid 관련 객체
		gridApp12_2 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot12_2 = gridApp12_2.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp12_2.setLayout(layoutStr12_2);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow12_2 = gridRoot12_2.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid12_2.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData12_2 = dataRow12_2[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM3_2").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_supply_callback_2(dataRow12_2);
			}
			
			$("#comm_pop_wrap3_2").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler12_2 = function(event) {
			if(event.keyCode != "13") return;
			dataGrid12_2.focus();
	 		var rowIndex = dataGrid12_2.getSelectedIndex();
			dataRow12_2 = gridRoot12_2.getItemAt(rowIndex);

			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM3_2").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_supply_callback_2(dataRow12_2);
			}
			
			$("#comm_pop_wrap3_2").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler12_2 = function(event) {
			dataGrid12_2 = gridRoot12_2.getDataGrid();	// 그리드 객체
			
			dataGrid12_2.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid12_2.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid12_2.addEvent("keydown", enterClickHandler12_2);
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot12_2.addEventListener("layoutComplete", layoutCompleteHandler12_2);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler12_2 = function(event) { 
		       dataGrid = gridRoot12_2.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot12_2.addEventListener("dataComplete", dataCompleteHandler12_2);
		
		// 사원검색 팝업
	}else if (id == "grid13") {
		// rMateGrid 관련 객체
		gridApp13 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot13 = gridApp13.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp13.setLayout(layoutStr13);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow13 = gridRoot13.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid13.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData13 = dataRow13[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM4").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_member_callback(dataRow13);
			}
			
			$("#comm_pop_wrap4").dialog( "close" );
			
		};
		
		//엔터 이벤트 제어
		var enterClickHandler13 = function(event) {
			
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid13.getSelectedIndex();
			dataRow13 = gridRoot13.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM4").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_member_callback(dataRow13);
			}
			
			$("#comm_pop_wrap4").dialog( "close" );
			
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler13 = function(event) {
			dataGrid13 = gridRoot13.getDataGrid();	// 그리드 객체
			
			dataGrid13.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid13.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid13.addEvent("keydown", enterClickHandler13);
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot13.addEventListener("layoutComplete", layoutCompleteHandler13);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler13 = function(event) { 
		       dataGrid = gridRoot13.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot13.addEventListener("dataComplete", dataCompleteHandler13);
	
	    //배달사원 검색
	}else if (id == "grid13_1") {
			// rMateGrid 관련 객체
			gridApp13_1 = document.getElementById(id);	// 그리드를 포함하는 div 객체
			gridRoot13_1 = gridApp13_1.getRoot();	// 데이터와 그리드를 포함하는 객체
			gridApp13_1.setLayout(layoutStr13_1);

			//로우 클릭 이벤트 제어
			var itemClickHandler = function(event) {
				var rowIndex = event.rowIndex;
				var columnIndex = event.columnIndex;
				dataRow13_1 = gridRoot13_1.getItemAt(rowIndex);
				// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
				var column = dataGrid13_1.getDisplayableColumns()[columnIndex];
				var dataField = column.getDataField();
				clickData13_1 = dataRow13_1[dataField];
				
				// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
				var callbackName = $("#P_CALLBACK_NM4_1").val();
				if(callbackName != null && callbackName != ""){
					eval(callbackName);
				}else{//ㅅㅅㅅㅅ
					fn_comm_member_callback_02(dataRow13_1);
				}
				
				$("#comm_pop_wrap4_1").dialog( "close" );
				
			};
			
			//엔터 이벤트 제어
			var enterClickHandler13_1 = function(event) {
				
				if(event.keyCode != "13") return;
				
				var rowIndex = dataGrid13_1.getSelectedIndex();
				dataRow13_1 = gridRoot13_1.getItemAt(rowIndex);
				
				// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
				var callbackName = $("#P_CALLBACK_NM4_1").val();
				if(callbackName != null && callbackName != ""){
					eval(callbackName);
				}else{
					fn_comm_member_callback_02(dataRow13_1);
				}
				
				$("#comm_pop_wrap4_1").dialog( "close" );
				
			};
			
			//그리드1 핸들러
			var layoutCompleteHandler13_1 = function(event) {
				dataGrid13_1 = gridRoot13_1.getDataGrid();	// 그리드 객체
				
				dataGrid13_1.setDoubleClickEnabled(true);
				//그리드1 셀선택 이벤트
				dataGrid13_1.addEventListener("itemDoubleClick", itemClickHandler);
				dataGrid13_1.addEvent("keydown", enterClickHandler13_1);
			};
			
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot13_1.addEventListener("layoutComplete", layoutCompleteHandler13_1);
			
			//조회 완료 후 포커스 
			var dataCompleteHandler13_1 = function(event) { 
			       dataGrid = gridRoot13_1.getDataGrid();    // 그리드 객체
			       dataGrid.setSelectedIndices([0]);
			       dataGrid.setVerticalScrollPosition(0);  
			       dataGrid.focus(); 
			 };
		    gridRoot13_1.addEventListener("dataComplete", dataCompleteHandler13_1);
		
	   
	// 부서검색 팝업
	}else if (id == "grid14") {
		// rMateGrid 관련 객체
		gridApp14 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot14 = gridApp14.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp14.setLayout(layoutStr14);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow14 = gridRoot14.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid14.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData14 = dataRow14[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM5").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_dept_callback(dataRow14);
			}
			
			$("#comm_pop_wrap5").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler14 = function(event) {
			
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid14.getSelectedIndex();
			dataRow14 = gridRoot14.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM5").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_dept_callback(dataRow14);
			}
			
			$("#comm_pop_wrap5").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler14 = function(event) {
			dataGrid14 = gridRoot14.getDataGrid();	// 그리드 객체
			
			dataGrid14.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid14.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid14.addEvent("keydown", enterClickHandler14);
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot14.addEventListener("layoutComplete", layoutCompleteHandler14);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler14 = function(event) { 
		       dataGrid = gridRoot14.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot14.addEventListener("dataComplete", dataCompleteHandler14);
		
	// 점별 상품검색 팝업
	} else if (id == "grid15") {
		// rMateGrid 관련 객체
		gridApp15 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot15 = gridApp15.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp15.setLayout(layoutStr15);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow15 = gridRoot15.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid15.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData15 = dataRow15[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM6").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_store_callback(dataRow15);
			}
			$("#IN_SEARCH").val(""); 
			$("#comm_pop_wrap6").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler15 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid15.getSelectedIndex();
			dataRow15 = gridRoot15.getItemAt(rowIndex);
			
			//alert(dataRow15.DP_PRC_UNIT); return;
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM6").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_store_callback(dataRow15);
			}
			$("#IN_SEARCH").val(""); 
			$("#comm_pop_wrap6").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler15 = function(event) {
			dataGrid15 = gridRoot15.getDataGrid();	// 그리드 객체
			
			dataGrid15.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid15.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid15.addEvent("keydown", enterClickHandler15);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot15.addEventListener("layoutComplete", layoutCompleteHandler15);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler15 = function(event) { 
			   
			 
		       dataGrid = gridRoot15.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		       
		       venCodeFilter("gridRoot15");  // 협력업체별 상품을 검색하기 위해서 사용
		 };
	    gridRoot15.addEventListener("dataComplete", dataCompleteHandler15);
		
	}  
	
	
	else if (id == "grid15_1") {
		// rMateGrid 관련 객체
		gridApp15_1 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot15_1 = gridApp15_1.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp15_1.setLayout(layoutStr15_1);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow15_1 = gridRoot15_1.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid15_1.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData15_1 = dataRow15_1[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM6_1").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_store_callback1(dataRow15_1);
			}
			$("#IN_SEARCH").val(""); 
			$("#comm_pop_wrap6_1").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler15_1 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid15_1.getSelectedIndex();
			dataRow15_1 = gridRoot15_1.getItemAt(rowIndex);
			
			//alert(dataRow15.DP_PRC_UNIT); return;
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM6_1").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_store_callback1(dataRow15_1);
			}
			$("#IN_SEARCH").val(""); 
			$("#comm_pop_wrap6_1").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler15_1 = function(event) {
			dataGrid15_1 = gridRoot15_1.getDataGrid();	// 그리드 객체
			
			dataGrid15_1.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid15_1.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid15_1.addEvent("keydown", enterClickHandler15_1);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot15_1.addEventListener("layoutComplete", layoutCompleteHandler15_1);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler15_1 = function(event) { 
			   
			 
		       dataGrid = gridRoot15_1.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		       
		       venCodeFilter("gridRoot15_1");  // 협력업체별 상품을 검색하기 위해서 사용
		 };
	    gridRoot15_1.addEventListener("dataComplete", dataCompleteHandler15_1);
		
	}  
	
			//  부모창에서 선택한 점별 상품검색 팝업
		 else if (id == "grid15_6") {
			// rMateGrid 관련 객체
			gridApp15_6 = document.getElementById(id);	// 그리드를 포함하는 div 객체
			gridRoot15_6 = gridApp15_6.getRoot();	// 데이터와 그리드를 포함하는 객체
			gridApp15_6.setLayout(layoutStr15_6);
		
			//로우 클릭 이벤트 제어
			var itemClickHandler = function(event) {
				var rowIndex = event.rowIndex;
				var columnIndex = event.columnIndex;
				dataRow15_6 = gridRoot15_6.getItemAt(rowIndex);
				// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
				var column = dataGrid15_6.getDisplayableColumns()[columnIndex];
				var dataField = column.getDataField();
				clickData15_6 = dataRow15_6[dataField];
				
				// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
				var callbackName = $("#P_CALLBACK_NM6_6").val();
				if(callbackName != null && callbackName != ""){
					eval(callbackName);
				}else{
					fn_comm_store_callback(dataRow15_6);
				}
				$("#IN_SEARCH").val(""); 
				$("#comm_pop_wrap6_6").dialog( "close" );
			};
			
			//엔터 이벤트 제어
			var enterClickHandler15_6 = function(event) {
				if(event.keyCode != "13") return;
				
				var rowIndex = dataGrid15_6.getSelectedIndex();
				dataRow15_6 = gridRoot15_6.getItemAt(rowIndex);
				
				//alert(dataRow15.DP_PRC_UNIT); return;
				
				// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
				var callbackName = $("#P_CALLBACK_NM6_6").val();
				if(callbackName != null && callbackName != ""){
					eval(callbackName);
				}else{
					fn_comm_store_callback(dataRow15_6);
				}
				$("#IN_SEARCH").val(""); 
				$("#comm_pop_wrap6_6").dialog( "close" );
			};
			
			//그리드1 핸들러
			var layoutCompleteHandler15_6 = function(event) {
				dataGrid15_6 = gridRoot15_6.getDataGrid();	// 그리드 객체
				
				dataGrid15_6.setDoubleClickEnabled(true);
				//그리드1 셀선택 이벤트
				dataGrid15_6.addEventListener("itemDoubleClick", itemClickHandler);
				dataGrid15_6.addEvent("keydown", enterClickHandler15_6);
		
			};
			
			//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
			gridRoot15_6.addEventListener("layoutComplete", layoutCompleteHandler15_6);
			
			//조회 완료 후 포커스 
			var dataCompleteHandler15_6 = function(event) { 
				   
				 
			       dataGrid = gridRoot15_6.getDataGrid();    // 그리드 객체
			       dataGrid.setSelectedIndices([0]);
			       dataGrid.setVerticalScrollPosition(0);  
			       dataGrid.focus(); 
			       venCodeFilter("gridRoot15_6"); 
			 };
		    gridRoot15_6.addEventListener("dataComplete", dataCompleteHandler15_6);
			
		} 
	
	 
	else if (id == "grid16") {
		// rMateGrid 관련 객체
		gridApp16 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot16 = gridApp16.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp16.setLayout(layoutStr11);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow16 = gridRoot16.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid16.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData16 = dataRow16[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM7").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_product_callback(dataRow16);
			}
			
			$("#comm_pop_wrap7").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler16 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid16.getSelectedIndex();
			dataRow16 = gridRoot16.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM7").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_product_callback(dataRow16);
			}
			
			$("#comm_pop_wrap7").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler16 = function(event) {
			dataGrid16 = gridRoot16.getDataGrid();	// 그리드 객체
			
			dataGrid16.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid16.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid16.addEvent("keydown", enterClickHandler16);
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot16.addEventListener("layoutComplete", layoutCompleteHandler16);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler16 = function(event) { 
		       dataGrid = gridRoot16.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot16.addEventListener("dataComplete", dataCompleteHandler16);
		
	}else if (id == "grid17") {
		// rMateGrid 관련 객체
		gridApp17 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot17 = gridApp17.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp17.setLayout(layoutStr17);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow17 = gridRoot17.getItemAt(rowIndex);
			
// 			if(dataRow17.EVT_GB =="판매이력"){
// 				alert("판매이력은 선택 할 수 없습니다.");
// 				return;
// 			}
			
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid17.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData17 = dataRow17[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM8").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_order_product_callback(dataRow17);
			}
			
			$("#comm_pop_wrap8").dialog( "close" );
		};
		
		var enterClickHandler17 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid17.getSelectedIndex();
			dataRow17 = gridRoot17.getItemAt(rowIndex);
			
// 			if(dataRow17.EVT_GB =="판매이력"){
// 				alert("판매이력은 선택 할 수 없습니다.");
// 				return;
// 			}
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM8").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_order_product_callback(dataRow17);
			}
			
			$("#comm_pop_wrap8").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler17 = function(event) {
			dataGrid17 = gridRoot17.getDataGrid();	// 그리드 객체
			
			dataGrid17.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid17.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid17.addEvent("keydown", enterClickHandler17);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot17.addEventListener("layoutComplete", layoutCompleteHandler17);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler17 = function(event) { 
		       dataGrid = gridRoot17.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot17.addEventListener("dataComplete", dataCompleteHandler17);
		
	}else if (id == "grid18") {
		// rMateGrid 관련 객체
		gridApp18 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot18 = gridApp18.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp18.setLayout(layoutStr18);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow18 = gridRoot18.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid18.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData18 = dataRow18[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM9").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_order_event_product_callback(dataRow18);
			}
			
			$("#comm_pop_wrap9").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler18 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid18.getSelectedIndex();
			dataRow18 = gridRoot18.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM9").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_order_event_product_callback(dataRow18);
			}
			
			$("#comm_pop_wrap9").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler18 = function(event) {
			dataGrid18 = gridRoot18.getDataGrid();	// 그리드 객체
			
			dataGrid18.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid18.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid18.addEvent("keydown", enterClickHandler18);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot18.addEventListener("layoutComplete", layoutCompleteHandler18);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler18 = function(event) { 
		       dataGrid = gridRoot18.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot18.addEventListener("dataComplete", dataCompleteHandler18);
		
	}else if (id == "grid19") {
		// rMateGrid 관련 객체
		gridApp19 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot19 = gridApp19.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp19.setLayout(layoutStr19);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow19 = gridRoot19.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid19.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData19 = dataRow19[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM10").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_order_slip_callback(dataRow19);
			}
			
			$("#comm_pop_wrap10").dialog( "close" );
		};
		
		//로우 클릭 이벤트 제어
		var enterClickHandler19 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid19.getSelectedIndex();
			dataRow19 = gridRoot19.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM10").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_order_slip_callback(dataRow19);
			}
			
			$("#comm_pop_wrap10").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler19 = function(event) {
			dataGrid19 = gridRoot19.getDataGrid();	// 그리드 객체
			
			dataGrid19.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid19.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid19.addEvent("keydown", enterClickHandler19);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot19.addEventListener("layoutComplete", layoutCompleteHandler19);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler19 = function(event) { 
		       dataGrid = gridRoot19.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot19.addEventListener("dataComplete", dataCompleteHandler19);
		
	} else if (id == "grid20") {
		// rMateGrid 관련 객체
		gridApp20 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot20 = gridApp20.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp20.setLayout(layoutStr20);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow20 = gridRoot20.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid20.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData20 = dataRow20[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM11").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_category_callback(dataRow20);
			}
			
			$("#comm_pop_wrap11").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler20 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid20.getSelectedIndex();
			dataRow20 = gridRoot20.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM11").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_category_callback(dataRow20);
			}
			
			$("#comm_pop_wrap11").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler20 = function(event) {
			dataGrid20 = gridRoot20.getDataGrid();	// 그리드 객체
			
			dataGrid20.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid20.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid20.addEvent("keydown", enterClickHandler20);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot20.addEventListener("layoutComplete", layoutCompleteHandler20);
		
		
		//조회 완료 후 포커스 
		var dataCompleteHandler20 = function(event) { 
		       dataGrid = gridRoot20.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot20.addEventListener("dataComplete", dataCompleteHandler20);
		
	}  else if (id == "grid21") {  // 묶음 대표 상품
		// rMateGrid 관련 객체
		gridApp21 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot21 = gridApp21.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp21.setLayout(layoutStr21);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow21 = gridRoot21.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid21.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData21 = dataRow21[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM12").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_product_callback(dataRow21);   
			}
			
			$("#comm_pop_wrap12").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler21 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid21.getSelectedIndex();
			dataRow21 = gridRoot21.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM12").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_product_callback(dataRow21);   
			}
			
			$("#comm_pop_wrap12").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler21 = function(event) {
			dataGrid21 = gridRoot21.getDataGrid();	// 그리드 객체
			
			dataGrid21.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid21.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid21.addEvent("keydown", enterClickHandler21);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot21.addEventListener("layoutComplete", layoutCompleteHandler21);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler21 = function(event) { 
		       dataGrid = gridRoot21.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot21.addEventListener("dataComplete", dataCompleteHandler21);
		
	}  else if (id == "grid22") {  // 점별 배송구분(ROUTE_GB)별 상품검색  
		// rMateGrid 관련 객체
		gridApp22 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot22 = gridApp22.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp22.setLayout(layoutStr22);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow22 = gridRoot22.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid22.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData22 = dataRow22[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM13").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_product_callback(dataRow22);   
			}
			$("#IN_SEARCH").val("");  //  ROW 클릭 시 결과내 검색 입력란 초기화
			$("#comm_pop_wrap13").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler22 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid22.getSelectedIndex();
			dataRow22 = gridRoot22.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM13").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_product_callback(dataRow22);   
			}
			
			$("#comm_pop_wrap13").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler22 = function(event) {
			dataGrid22 = gridRoot22.getDataGrid();	// 그리드 객체
			
			dataGrid22.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid22.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid22.addEvent("keydown", enterClickHandler22);
		
		};
// 		datagrid22.addEvent("keyDown", itemClickHandler);
// 		dataGrid22.addEventListener("keyDown", itemClickHandler);
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot22.addEventListener("layoutComplete", layoutCompleteHandler22);
		
	    var dataCompleteHandler = function(event) { 
	       dataGrid = gridRoot22.getDataGrid();    // 그리드 객체
	       dataGrid.setSelectedIndices([0]);
	       dataGrid.setVerticalScrollPosition(0);  
	       dataGrid.focus(); 
	    };
	    gridRoot22.addEventListener("dataComplete", dataCompleteHandler);
	   
	     
	} else if (id == "grid23") {  // 카드행사 카드 정보 조회  
		// rMateGrid 관련 객체
		gridApp23 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot23 = gridApp23.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp23.setLayout(layoutStr23);

		
		//그리드1 핸들러
		var layoutCompleteHandler23 = function(event) {
			dataGrid23 = gridRoot23.getDataGrid();	// 그리드 객체
			
			dataGrid23.setDoubleClickEnabled(true);
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot23.addEventListener("layoutComplete", layoutCompleteHandler23);
		
	} else if (id == "grid24") {  // 카드행사 카드 정보 조회  
		// rMateGrid 관련 객체
		gridApp24 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot24 = gridApp24.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp24.setLayout(layoutStr24);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow24 = gridRoot24.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid24.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData24 = dataRow24[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM15").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_card_detail_callback(dataRow24);   
			}
			
			$("#comm_pop_wrap15").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler24 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid24.getSelectedIndex();
			dataRow24 = gridRoot24.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.    
			var callbackName = $("#P_CALLBACK_NM15").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_card_detail_callback(dataRow24);   
			}
			
			$("#comm_pop_wrap15").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler24 = function(event) {
			dataGrid24 = gridRoot24.getDataGrid();	// 그리드 객체
			
			dataGrid24.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid24.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid24.addEvent("keydown", enterClickHandler24);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot24.addEventListener("layoutComplete", layoutCompleteHandler24);
		
	}else if (id == "grid25") {
		// rMateGrid 관련 객체
		gridApp25 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot25 = gridApp25.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp25.setLayout(layoutStr25);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow25 = gridRoot25.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid25.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData25 = dataRow25[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM16").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_cd_store_callback(dataRow25);
			}
			
			$("#comm_pop_wrap16").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler25 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid25.getSelectedIndex();
			dataRow25 = gridRoot25.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM16").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_cd_store_callback(dataRow25);
			}
			
			$("#comm_pop_wrap16").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler25 = function(event) {
			dataGrid25 = gridRoot25.getDataGrid();	// 그리드 객체
			
			dataGrid25.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid25.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid25.addEvent("keydown", enterClickHandler25);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot25.addEventListener("layoutComplete", layoutCompleteHandler25);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler25 = function(event) { 
		       dataGrid = gridRoot25.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot25.addEventListener("dataComplete", dataCompleteHandler25);
	
		// 협력업체검색 팝업	
	}else if (id == "grid26") {
		// rMateGrid 관련 객체
		gridApp26 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot26 = gridApp26.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp26.setLayout(layoutStr26);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow26 = gridRoot26.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid26.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData26 = dataRow26[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM17").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_event_callback(dataRow26);
			}
			
			$("#comm_pop_wrap17").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler26 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid26.getSelectedIndex();
			dataRow26 = gridRoot26.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM17").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_event_callback(dataRow26);
			}
			
			$("#comm_pop_wrap17").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler26 = function(event) {
			dataGrid26 = gridRoot26.getDataGrid();	// 그리드 객체
			
			dataGrid26.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid26.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid26.addEvent("keydown", enterClickHandler26);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot26.addEventListener("layoutComplete", layoutCompleteHandler26);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler26 = function(event) { 
		       dataGrid = gridRoot26.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot26.addEventListener("dataComplete", dataCompleteHandler26);
	
		// 협력업체검색 팝업	
	}else if (id == "grid27") {
		// rMateGrid 관련 객체
		gridApp27 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot27 = gridApp27.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp27.setLayout(layoutStr27);

		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow27 = gridRoot27.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid27.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData27 = dataRow27[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM18").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_gift_callback(dataRow27);
			}
			
			$("#comm_pop_wrap18").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler27 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid27.getSelectedIndex();
			dataRow27 = gridRoot27.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM18").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_gift_callback(dataRow27);
			}
			
			$("#comm_pop_wrap18").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler27 = function(event) {
			dataGrid27 = gridRoot27.getDataGrid();	// 그리드 객체
			
			dataGrid27.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid27.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid27.addEvent("keydown", enterClickHandler27);

		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot27.addEventListener("layoutComplete", layoutCompleteHandler27);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler27 = function(event) { 
		       dataGrid = gridRoot27.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot27.addEventListener("dataComplete", dataCompleteHandler27);
	
		
	}  else if (id == "grid28") {   //  	
		// rMateGrid 관련 객체
		gridApp28 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot28 = gridApp28.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp28.setLayout(layoutStr28);
	
		//로우 클릭 이벤트 제어
		var itemClickHandler = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow28 = gridRoot28.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid28.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData28 = dataRow28[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM19").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_store_callback(dataRow28);
			}
			
			$("#comm_pop_wrap19").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler28 = function(event) {
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid28.getSelectedIndex();
			dataRow28 = gridRoot28.getItemAt(rowIndex);
			 
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM19").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_store_callback(dataRow28);
			}
			
			$("#comm_pop_wrap19").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler28 = function(event) {
			dataGrid28 = gridRoot28.getDataGrid();	// 그리드 객체
			
			dataGrid28.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid28.addEventListener("itemDoubleClick", itemClickHandler);
			dataGrid28.addEvent("keydown", enterClickHandler28);
	
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot28.addEventListener("layoutComplete", layoutCompleteHandler28);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler28 = function(event) { 
		       dataGrid = gridRoot28.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot28.addEventListener("dataComplete", dataCompleteHandler28 );
		
	}else if(id == "grid29"){
		
		// rMateGrid 관련 객체
		gridApp29 = document.getElementById(id);	// 그리드를 포함하는 div 객체
		gridRoot29 = gridApp29.getRoot();	// 데이터와 그리드를 포함하는 객체
		gridApp29.setLayout(layoutStr29);
		
		//로우 클릭 이벤트 제어
		var itemClickHandler29 = function(event) {
			var rowIndex = event.rowIndex;
			var columnIndex = event.columnIndex;
			dataRow29 = gridRoot29.getItemAt(rowIndex);
			// 컬럼중 숨겨진 컬럼(visible false인 컬럼)이 있으면 getDisplayableColumns()를 사용하여 컬럼을 가져옵니다.
			var column = dataGrid29.getDisplayableColumns()[columnIndex];
			var dataField = column.getDataField();
			clickData29 = dataRow29[dataField];
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM20").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_alive_user_callback(dataRow29);	
			}

			$("#comm_pop_wrap20").dialog( "close" );
		};
		
		//엔터 이벤트 제어
		var enterClickHandler29 = function(event) {
			
			if(event.keyCode != "13") return;
			
			var rowIndex = dataGrid29.getSelectedIndex();
			dataRow29 = gridRoot29.getItemAt(rowIndex);
			
			// 한 화면에서 여러개의 같은 공통함수를 띄울 경우 P_CALLBACK_NM1에 정의한 callback 함수를 만들어준다.
			var callbackName = $("#P_CALLBACK_NM20").val();
			if(callbackName != null && callbackName != ""){
				eval(callbackName);
			}else{
				fn_comm_alive_user_callback(dataRow29);	
			}

			$("#comm_pop_wrap20").dialog( "close" );
		};
		
		//그리드1 핸들러
		var layoutCompleteHandler29 = function(event) {
			dataGrid29 = gridRoot29.getDataGrid();	// 그리드 객체
			
			dataGrid29.setDoubleClickEnabled(true);
			//그리드1 셀선택 이벤트
			dataGrid29.addEventListener("itemDoubleClick", itemClickHandler29);
			dataGrid29.addEvent("keydown", enterClickHandler29);
		};
		
		//레이아웃을 읽어와 그리드 생성을 완료하면 그리드1 핸들러 생성.
		gridRoot29.addEventListener("layoutComplete", layoutCompleteHandler29);
		
		//조회 완료 후 포커스 
		var dataCompleteHandler29 = function(event) { 
		       dataGrid = gridRoot29.getDataGrid();    // 그리드 객체
		       dataGrid.setSelectedIndices([0]);
		       dataGrid.setVerticalScrollPosition(0);  
		       dataGrid.focus(); 
		 };
	    gridRoot29.addEventListener("dataComplete", dataCompleteHandler29);
	    
	} 
	
	 
	
}

//그리드의 데이터 제어를 위한 전역변수 설정
var gridApp10, gridRoot10, dataGrid10, dataRow10, clickData10, selectorColumn10;
var gridApp11, gridRoot11, dataGrid11, dataRow11, clickData11, selectorColumn11;
var gridApp12, gridRoot12, dataGrid12, dataRow12, clickData12, selectorColumn12;
var gridApp12_2, gridRoot12_2, dataGrid12_2, dataRow12_2, clickData12_2, selectorColumn12_2; // 협력업체 - 공제/보류
var gridApp13, gridRoot13, dataGrid13, dataRow13, clickData13, selectorColumn13;
var gridApp13_1, gridRoot13_1, dataGrid13_1, dataRow13_1, clickData13_1, selectorColumn13_1;	//배달사원
var gridApp14, gridRoot14, dataGrid14, dataRow14, clickData14, selectorColumn14;
var gridApp15, gridRoot15, dataGrid15, dataRow15, clickData15, selectorColumn15; 
var gridApp15_1, gridRoot15_1, dataGrid15_1, dataRow15_1, clickData15_1, selectorColumn15_1; 
var gridApp15_6, gridRoot15_6, dataGrid15_6, dataRow15_6, clickData15_6, selectorColumn15_6;
 
var gridApp16, gridRoot16, dataGrid16, dataRow16, clickData16, selectorColumn16;
var gridApp17, gridRoot17, dataGrid17, dataRow17, clickData17, selectorColumn17;
var gridApp18, gridRoot18, dataGrid18, dataRow18, clickData18, selectorColumn18;
var gridApp19, gridRoot19, dataGrid19, dataRow19, clickData19, selectorColumn19;
var gridApp20, gridRoot20, dataGrid20, dataRow20, clickData20, selectorColumn20;
var gridApp21, gridRoot21, dataGrid21, dataRow21, clickData21, selectorColumn21;

var gridApp22, gridRoot22, dataGrid22, dataRow22, clickData22, selectorColumn22;

var gridApp23, gridRoot23, dataGrid23, dataRow23, clickData23, selectorColumn23; // 카드행사 카드 정보 조회
var gridApp24, gridRoot24, dataGrid24, dataRow24, clickData24, selectorColumn24; // 카드행사 카드 정보 조회
var gridApp25, gridRoot25, dataGrid25, dataRow25, clickData25, selectorColumn25; // 점포조회
var gridApp26, gridRoot26, dataGrid26, dataRow26, clickData26, selectorColumn26; // 증정권 행사조회
var gridApp27, gridRoot27, dataGrid27, dataRow27, clickData27, selectorColumn27; // 사은행사조회

var gridApp28, gridRoot28, dataGrid28, dataRow28, clickData28, selectorColumn28;
var gridApp29, gridRoot29, dataGrid29, dataRow29, clickData29, selectorColumn29;

//----------------------- 그리드 설정 끝 -----------------------
//각 그리드 헤더 설정
var layoutStr10;
var layoutStr11;
var layoutStr12;
var layoutStr12_2; // 협력업체 - 공제/보류
var layoutStr13;
var layoutStr13;	//배달사원
var layoutStr14;
var layoutStr15; 
var layoutStr15_1;
var layoutStr15_6;

var layoutStr17;
var layoutStr18;
var layoutStr19;
var layoutStr20;
var layoutStr21;
var layoutStr22;
var layoutStr23;  // 카드행사 카드 정보 조회
var layoutStr24;  // 카드행사 카드 정보 조회
var layoutStr25;  // 점포조회
var layoutStr26;
var layoutStr27;

var layoutStr28;
var layoutStr29;

// 회원명, 회원번호, 회원구분, 회원등급, 휴대전화, 전화번호, 주소, 상세주소, 기업코드
layoutStr10 =
'<rMateGrid>\
	<DataGrid id="dg10" sortableColumns="true"   selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="CUST_NAME"  		headerText="' + cusName + '"  	textAlign="center"  />\
			<DataGridColumn dataField="OWN_NAME"		headerText="대표자"				textAlign="center" 	/>\
			<DataGridColumn dataField="CUST_NO" 		headerText="' + cusNo + '" 		textAlign="center" 	/>\
			<DataGridColumn dataField="BUSI_FLAG_NAME" 	headerText="' + busiFlag + '" 	textAlign="center" 	/>\
			<DataGridColumn dataField="BUSI_FLAG" 		headerText="' + busiFlag + '" 	visible="false" 	/>\
			<DataGridColumn dataField="MBR_GRADE_NAME" 	headerText="' + mbrGrade + '" 	textAlign="center" 	/>\
			<DataGridColumn dataField="MBR_GRADE"   	headerText="' + mbrGrade + '" 	visible="false" 	/>\
			<DataGridColumn dataField="MOBIL_NO"		headerText="' + mobilNo + '" 	textAlign="center" 	/>\
			<DataGridColumn dataField="TEL_NO"   		headerText="' + phoneNumber +'" textAlign="center" />\
			<DataGridColumn dataField="ADDR"   			headerText="' + addr + '" 		textAlign="left" 	width="210"/>\
			<DataGridColumn dataField="ADDR_DTL"		headerText="' + addrDtl + '" 	visible="false" 	/>\
			<DataGridColumn dataField="CORP_CODE"		headerText="' + corpCode + '" 	visible="false" 	/>\
			<DataGridColumn dataField="BUSI_NAME"		headerText="상호명" 				visible="false" 	/>\
			<DataGridColumn dataField="SEX"				headerText="성별" 				visible="false" 	/>\
			<DataGridColumn dataField="SEX_NAME"		headerText="성별명" 				visible="false" 	/>\
			<DataGridColumn dataField="BIR_DATE"		headerText="생년월일" 				visible="false" 	/>\
			<DataGridColumn dataField="BUSI_NO"			headerText="사업자번호"				visible="false" 	/>\
			<DataGridColumn dataField="POST_NO"			headerText="우편번호"				visible="false" 	/>\
			<DataGridColumn dataField="UPTAE"			headerText="업태"					visible="false" 	/>\
			<DataGridColumn dataField="UPJONG"			headerText="종목"					visible="false" 	/>\
			<DataGridColumn dataField="INDUST_FLAG"		headerText=""					visible="false" 	/>\
			<DataGridColumn dataField="POINT_SAVE"		headerText="포인트적립여부"			visible="false" 	/>\
			<DataGridColumn dataField="POINT_USE_YN"	headerText="포인트사용유무"			visible="false" 	/>\
			<DataGridColumn dataField="LIQUOR_SALE_YN"	headerText="할인율"				visible="false" 	/>\
			<DataGridColumn dataField="CREDIT_LIMIT_YN"	headerText="여신관리유무"			visible="false" 	/>\
			<DataGridColumn dataField="CREDIT_LIMIT"	headerText="여신한도"				visible="false" 	/>\
			<DataGridColumn dataField="VTL_ACC_NO"		headerText="가상계좌"				visible="false" 	/>\
			<DataGridColumn dataField="VTL_ACC_YN"		headerText="계좌유효유무"			visible="false" 	/>\
			<DataGridColumn dataField="VTL_STR_DT"		headerText="가상계좌적용일자"			visible="false" 	/>\
			<DataGridColumn dataField="VTL_END_DT"		headerText="가상계좌종료일자"			visible="false" 	/>\
			<DataGridColumn dataField="CREDIT_USE_YN"	headerText="외상거래가능유무"			visible="false" 	/>\
			<DataGridColumn dataField="LEAVE_YN"		headerText="탈퇴여부"				visible="false" 	/>\
			<DataGridColumn dataField="LEAVE_DT"		headerText="탈퇴일자"				visible="false" 	/>\
			<DataGridColumn dataField="SMS_YN"			headerText="SMS수신여부"			visible="false" 	/>\
			<DataGridColumn dataField="DM_YN"			headerText="DM수신여부"			visible="false" 	/>\
			<DataGridColumn dataField="END_TEL_NO"		headerText="전화번호끝자리"			visible="false" 	/>\
			<DataGridColumn dataField="CASH_APP_YN"		headerText="현금영수증적립구분"		visible="false" 	/>\
			<DataGridColumn dataField="CASH_MOBIL_NO"	headerText="현금영수증적립번호"		visible="false" 	/>\
			<DataGridColumn dataField="FAX_NO"			headerText="팩스번호"				visible="false" 	/>\
			<DataGridColumn dataField="EMAIL_YN"		headerText="이메일수신여부"			visible="false" 	/>\
			<DataGridColumn dataField="SEND_EMAIL"		headerText=""					visible="false" 	/>\
			<DataGridColumn dataField="STR_CODE"		headerText="점포코드"				visible="false" 	/>\
			<DataGridColumn dataField="ZON_AREA"		headerText="지역구분"				visible="false" 	/>\
			<DataGridColumn dataField="BIR_TYPE"		headerText="음력구분"				visible="false" 	/>\
			<DataGridColumn dataField="EMP_PWD"			headerText=""					visible="false" 	/>\
			<DataGridColumn dataField="REMARK"			headerText="적요"					visible="false" 	/>\
			<DataGridColumn dataField="BAL_TYPE"		headerText="발행구분"				visible="false" 	/>\
			<DataGridColumn dataField="ACCT_DEPT"		headerText="회계코드"				visible="false" 	/>\
			<DataGridColumn dataField="EMP_NO"			headerText="사원번호"				visible="false" 	/>\
			<DataGridColumn dataField="USER_NM"			headerText="사원명"				visible="false" 	/>\
			<DataGridColumn dataField="MBR_DC_YN"	    headerText="회원할인가능여부"		visible="true" 	/>\
			<DataGridColumn dataField="IEMP_NO"			headerText="등록사원번호"			visible="false" 	/>\
			<DataGridColumn dataField="IDATE"			headerText="등록일시"				visible="false" 	/>\
			<DataGridColumn dataField="UEMP_NO"			headerText="수정사원 번호"			visible="false" 	/>\
			<DataGridColumn dataField="UDATE"			headerText="수정일시"				visible="false" 	/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//상품명, 상품코드,  스캔코드, 규격, 단위, 입수, 협력업체, 기준원가, 협력업체코드, 단축상품명
layoutStr11 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg11" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="ITM_CODE" 		headerText="' + itmCode + '" 	textAlign="center" 	width="100"	/>\
			<DataGridColumn dataField="SCAN_CODE" 		headerText="' + scanCode + '" 	textAlign="center" 	width="100"	/>\
			<DataGridColumn dataField="ITM_NAME"  		headerText="' + itmName + '"  	textAlign="left" 	/>\
			<DataGridColumn dataField="UNIT"   			headerText="' + unit + '" 		textAlign="center" 	width="70"	/>\
			<DataGridColumn dataField="DP_PRC_UNIT" 	headerText="' + dpPrcUnit + '" 	textAlign="center" 	width="70"	/>\
			<DataGridColumn dataField="IPSU_QTY"   		headerText="' + ipsuQty + '" 	textAlign="center" 	width="50"	/>\
			<DataGridColumn dataField="VEN_NAME"		headerText="' + venName + '" 	textAlign="left" 	/>\
			<DataGridColumn dataField="BASE_WPRC"		headerText="' + baseWprc + '" 	textAlign="right" 	width="70"	labelJsFunction="perFunction1"/>\
			<DataGridColumn dataField="BASE_WVAT"		headerText="기준원가부가세 " 		visible="false"		/>\
			<DataGridColumn dataField="VEN_CODE"		headerText="' + venCode + '" 	visible="false"		/>\
			<DataGridColumn dataField="ITM_SHORT_NAME"	headerText="' + itmShortName + '" visible="false"	/>\
			<DataGridColumn dataField="ITM_STD"			headerText="관리구분"				visible="false" 	/>\
			<DataGridColumn dataField="STR_DT"			headerText="시작일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_DT"			headerText="종료일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_IND"			headerText="취급여부"				visible="false" 	/>\
			<DataGridColumn dataField="CLS_CODE"		headerText="소분류코드"				visible="false" 	/>\
			<DataGridColumn dataField="ITM_GB"			headerText="상품구분"				visible="false" 	/>\
			<DataGridColumn dataField="ITM_FORM"		headerText="상품형태"				visible="false" 	/>\
			<DataGridColumn dataField="TAX_GB"			headerText="과세구분"				visible="false" 	/>\
			<DataGridColumn dataField="IN_CAPACITY"		headerText="제품용량"				visible="false" 	/>\
			<DataGridColumn dataField="UNIT_CAPACITY"	headerText="표시용량"				visible="false" 	/>\
			<DataGridColumn dataField="MAKE_VEN_NAME"	headerText="제조사명"				visible="false" 	/>\
			<DataGridColumn dataField="ORG_CODE"		headerText="원산지코드"				visible="false" 	/>\
			<DataGridColumn dataField="ROUTE_GB"		headerText="배송구분"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_GB"			headerText="발주구분"				visible="false" 	/>\
			<DataGridColumn dataField="BASE_SPRC"		headerText="기준원가"				visible="false" 	/>\
			<DataGridColumn dataField="BOT_CODE"		headerText="공병코드"				visible="false" 	/>\
			<DataGridColumn dataField="BOT_SPRC"		headerText="공병단가"				visible="false" 	/>\
			<DataGridColumn dataField="FTRACE_YN"		headerText="영유아식품이력"			visible="false" 	/>\
			<DataGridColumn dataField="STRACE_YN"		headerText="수산물이력"				visible="false" 	/>\
			<DataGridColumn dataField="MTRACE_YN"		headerText="축산물이력"				visible="false" 	/>\
			<DataGridColumn dataField="INGR_YN"			headerText="공산식자재유무"			visible="false" 	/>\
			<DataGridColumn dataField="POINT_SAVE"		headerText="포인트 적립여부"			visible="false" 	/>\
			<DataGridColumn dataField="MBR_CD_YN"		headerText="회원할인가능여부"			visible="false" 	/>\
			<DataGridColumn dataField="VALID_DT_YN"		headerText="유효일자관리유무"			visible="false" 	/>\
			<DataGridColumn dataField="VALID_DD"		headerText="유효일수"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_1"		headerText="도매할인1"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_2"		headerText="도매할인2"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_3"		headerText="도매할인3"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_4"		headerText="도매할인4"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_5"		headerText="도매할인5"				visible="false" 	/>\
			<DataGridColumn dataField="TPER_MTHD"		headerText="보관방법"				visible="false" 	/>\
			<DataGridColumn dataField="CFM_FLAG"		headerText="확정여부"				visible="false" 	/>\
			<DataGridColumn dataField="USE_YN"			headerText="사용여부"				visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"			headerText="등록사원번호"			visible="false" 	/>\
			<DataGridColumn dataField="IDATE"			headerText="등록일시"				visible="false" 	/>\
			<DataGridColumn dataField="UEMP_NO"			headerText="수정사원 번호"			visible="false" 	/>\
			<DataGridColumn dataField="UDATE"			headerText="수정일시"				visible="false" 	/>\
			<DataGridColumn dataField="GRE_GB"		headerText="거래구분"				visible="false" 	/>\
			</columns>\
	</DataGrid>\
</rMateGrid>';

//협력업체명, 협력업체코드, 사업자번호, 전화번호, 주소, 상세주소
layoutStr12 =
'<rMateGrid>\
	<NumberMaskFormatter id="maskfmt" formatString="###-##-#####"/>\
	<DataGrid id="dg12" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="VEN_NAME"  	headerText="' + venName + '"  	textAlign="left" 	width="150"/>\
			<DataGridColumn dataField="VEN_CODE" 	headerText="' + venCode + '" 	textAlign="center" 	width="110" />\
			<DataGridColumn dataField="BUSI_NO" 	headerText="' + busiNo + '" 	textAlign="center" 	width="120" formatter="{maskfmt}"/>\
			<DataGridColumn dataField="TEL_NO"	   	headerText="' + phoneNumber + '" textAlign="center" width="100" />\
			<DataGridColumn dataField="ADDR"   		headerText="' + addr + '" 		textAlign="left" 	/>\
			<DataGridColumn dataField="ADDR_DTL"   	headerText="' + addrDtl + '" 	visible="false" 	/>\
			<DataGridColumn dataField="REP_NAME"	headerText="대표자명"				visible="false" 	/>\
			<DataGridColumn dataField="POST_NO"		headerText="우편번호"				visible="false" 	/>\
			<DataGridColumn dataField="UPJONG"		headerText="업종"					visible="false" 	/>\
			<DataGridColumn dataField="UPTAE"		headerText="업태"					visible="false" 	/>\
			<DataGridColumn dataField="FAX_NO"		headerText="팩스번호"				visible="false" 	/>\
			<DataGridColumn dataField="REP_MAIL_ID"	headerText="대표이메일"				visible="false" 	/>\
			<DataGridColumn dataField="PAY_CON"		headerText="지불주기"				visible="false" 	/>\
			<DataGridColumn dataField="PAY_SEQ"		headerText="지불차수"				visible="false" 	/>\
			<DataGridColumn dataField="PAY_TYPE"	headerText="지불조건"				visible="false" 	/>\
			<DataGridColumn dataField="BANK_CODE"	headerText="은행코드"				visible="false" 	/>\
			<DataGridColumn dataField="BANK_ACC_NO"	headerText="계좌번호"				visible="false" 	/>\
			<DataGridColumn dataField="BANK_ACOWN"	headerText="예금주 명칭"				visible="false" 	/>\
			<DataGridColumn dataField="ENTR_DT"		headerText="입점일"				visible="false" 	/>\
			<DataGridColumn dataField="OUT_DT"		headerText="퇴점일"				visible="false" 	/>\
			<DataGridColumn dataField="BUSI_FLAG"	headerText="회원구분"				visible="false" 	/>\
			<DataGridColumn dataField="REP_VEN_CODE" headerText="대표협력업체"			visible="false" 	/>\
			<DataGridColumn dataField="GRE_GB_NM"	headerText="거래구분명"				visible="false" 	/>\
			<DataGridColumn dataField="GRE_GB"		headerText="거래구분"				visible="false" 	/>\
			<DataGridColumn dataField="SALE_RATE"	headerText="판매분수수료율"			visible="false" 	/>\
			<DataGridColumn dataField="JANG_YN"		headerText="장려금유무"				visible="false" 	/>\
			<DataGridColumn dataField="PUR_RATE"	headerText="매입장려율"				visible="false" 	/>\
			<DataGridColumn dataField="TAX_TYPE"	headerText="세금계산서발행방법"		visible="false" 	/>\
			<DataGridColumn dataField="ORDER_TYPE"	headerText="발주유형"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_TERM"	headerText="발주주기"				visible="false" 	/>\
			<DataGridColumn dataField="CREDIT_LIMIT" headerText="여신한도"				visible="false" 	/>\
			<DataGridColumn dataField="SCM_PUR_OPN"	headerText="SCM매입원가노출여부"		visible="false" 	/>\
			<DataGridColumn dataField="ACCT_DEPT"	headerText="회계코드"				visible="false" 	/>\
			<DataGridColumn dataField="CFM_YN"		headerText="확정여부"				visible="false" 	/>\
			<DataGridColumn dataField="USE_YN"		headerText="사용여부"			textAlign="center" 		width="65"  visible="true" 	/>\
			<DataGridColumn dataField="REMARK"		headerText="비고"					visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"		headerText="등록사원번호"			visible="false" 	/>\
			<DataGridColumn dataField="IDATE"		headerText="등록일시"				visible="false" 	/>\
			<DataGridColumn dataField="UEMP_NO"		headerText="수정사원 번호"			visible="false" 	/>\
			<DataGridColumn dataField="UDATE"		headerText="수정일시"				visible="false" 	/>\
			<DataGridColumn dataField="SLIP_DIV_YN"		headerText="전표분할유무"				visible="false" 	/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

layoutStr12_2 =
	'<rMateGrid>\
		<NumberMaskFormatter id="maskfmt" formatString="###-##-#####"/>\
		<DataGrid id="dg12_2" sortableColumns="true" selectionMode="multipleCells">\
			<columns>\
				<DataGridColumn dataField="VEN_NAME"  	headerText="' + venName + '"  	textAlign="left" 	width="150"/>\
				<DataGridColumn dataField="VEN_CODE" 	headerText="' + venCode + '" 	textAlign="center" 	width="110" />\
				<DataGridColumn dataField="BUSI_NO" 	headerText="' + busiNo + '" 	textAlign="center" 	width="120" formatter="{maskfmt}"/>\
				<DataGridColumn dataField="TEL_NO"	   	headerText="' + phoneNumber + '" textAlign="center" width="100" />\
				<DataGridColumn dataField="ADDR"   		headerText="' + addr + '" 		textAlign="left" 	/>\
				<DataGridColumn dataField="ADDR_DTL"   	headerText="' + addrDtl + '" 	visible="false" 	/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

// 사원명, 사원번호, 조직명, 직원구분, 업무구분
layoutStr13 =
'<rMateGrid>\
	<DataGrid id="dg13" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="USER_NM"  		headerText="' + staffName + '"  			textAlign="center" 	/>\
			<DataGridColumn dataField="USER_ID" 		headerText="' + staffNo + '" 				textAlign="center" 	/>\
			<DataGridColumn dataField="DEPT_NAME" 		headerText="' + deptNm + '" 				textAlign="center" 	/>\
			<DataGridColumn dataField="EMP_DUTY_NAME"	headerText="' + staffClassification + '"	textAlign="center"  />\
			<DataGridColumn dataField="SYS_NAME"   		headerText="' + sysGubun + '" 				textAlign="center" 	/>\
			<DataGridColumn dataField="EMP_DUTY"   		headerText="' + staffClassification + '"	visible="false" 	/>\
			<DataGridColumn dataField="SYS_CODE"   		headerText="' + sysGubun + '" 				visible="false" 	/>\
			<DataGridColumn dataField="CORP_CODE"		headerText="기업코드"							visible="false" 	/>\
			<DataGridColumn dataField="PASSWD_NO"		headerText="패스워드 번호"						visible="false" 	/>\
			<DataGridColumn dataField="GROUP_CODE"		headerText="권한그룹"							visible="false" 	/>\
			<DataGridColumn dataField="STR_CODE"		headerText="점포코드"							visible="false" 	/>\
			<DataGridColumn dataField="DEPT_CODE"		headerText="조직코드"							visible="false" 	/>\
			<DataGridColumn dataField="POSITION"		headerText="직급"								visible="false" 	/>\
			<DataGridColumn dataField="LIMIT_LEVEL"		headerText="권한레벨"							visible="false" 	/>\
			<DataGridColumn dataField="PWD_COUNT"		headerText="오류횟수"							visible="false" 	/>\
			<DataGridColumn dataField="JOB_FLAG"		headerText="재직구분"							visible="false" 	/>\
			<DataGridColumn dataField="MOBIL_NO"		headerText="휴대폰"							visible="false" 	/>\
			<DataGridColumn dataField="REMARK"			headerText="비고"								visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"			headerText="등록사원번호"						visible="false" 	/>\
			<DataGridColumn dataField="IDATE"			headerText="등록일시"							visible="false" 	/>\
			<DataGridColumn dataField="UEMP_NO"			headerText="수정사원 번호"						visible="false" 	/>\
			<DataGridColumn dataField="UPDDT"			headerText="수정일시"							visible="false" 	/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//사원명, 사원번호, 조직명, 직원구분, 업무구분
layoutStr13_1 =
'<rMateGrid>\
	<DataGrid id="dg13_1" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="USER_NM"  		headerText="' + staffName + '"  			textAlign="center" 	/>\
			<DataGridColumn dataField="USER_ID" 		headerText="' + staffNo + '" 				textAlign="center" 	/>\
			<DataGridColumn dataField="DEPT_NAME" 		headerText="' + deptNm + '" 				textAlign="center" 	/>\
			<DataGridColumn dataField="EMP_DUTY_NAME"	headerText="' + staffClassification + '"	textAlign="center"  />\
			<DataGridColumn dataField="SYS_NAME"   		headerText="' + sysGubun + '" 				textAlign="center" 	/>\
			<DataGridColumn dataField="EMP_DUTY"   		headerText="' + staffClassification + '"	visible="false" 	/>\
			<DataGridColumn dataField="SYS_CODE"   		headerText="' + sysGubun + '" 				visible="false" 	/>\
			<DataGridColumn dataField="CORP_CODE"		headerText="기업코드"							visible="false" 	/>\
			<DataGridColumn dataField="PASSWD_NO"		headerText="패스워드 번호"						visible="false" 	/>\
			<DataGridColumn dataField="GROUP_CODE"		headerText="권한그룹"							visible="false" 	/>\
			<DataGridColumn dataField="STR_CODE"		headerText="점포코드"							visible="false" 	/>\
			<DataGridColumn dataField="DEPT_CODE"		headerText="조직코드"							visible="false" 	/>\
			<DataGridColumn dataField="POSITION"		headerText="직급"								visible="false" 	/>\
			<DataGridColumn dataField="LIMIT_LEVEL"		headerText="권한레벨"							visible="false" 	/>\
			<DataGridColumn dataField="PWD_COUNT"		headerText="오류횟수"							visible="false" 	/>\
			<DataGridColumn dataField="JOB_FLAG"		headerText="재직구분"							visible="false" 	/>\
			<DataGridColumn dataField="MOBIL_NO"		headerText="휴대폰"							visible="false" 	/>\
			<DataGridColumn dataField="REMARK"			headerText="비고"								visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"			headerText="등록사원번호"						visible="false" 	/>\
			<DataGridColumn dataField="IDATE"			headerText="등록일시"							visible="false" 	/>\
			<DataGridColumn dataField="UEMP_NO"			headerText="수정사원 번호"						visible="false" 	/>\
			<DataGridColumn dataField="UPDDT"			headerText="수정일시"							visible="false" 	/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

// 부서명, 부서코드, 조직구분
layoutStr14 =
'<rMateGrid>\
	<DataGrid id="dg14" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="DEPT_NAME" 		headerText="' + deptName + '" 	textAlign="center" 	/>\
			<DataGridColumn dataField="DEPT_CODE"  		headerText="' + deptCode + '"  	textAlign="center" 	/>\
			<DataGridColumn dataField="UPPER_DEPT" 		headerText="' + upperDept + '" 	visible="false" 	/>\
			<DataGridColumn dataField="GRADE_NAME"	   	headerText="' + grade + '" 		visible="false" 	/>\
			<DataGridColumn dataField="GRADE"	   		headerText="' + grade + '" 		visible="false" 	/>\
			<DataGridColumn dataField="ORG_TYPE_NAME"   headerText="' + orgType + '" 	textAlign="center" 	/>\
			<DataGridColumn dataField="ORG_TYPE"   		headerText="' + orgType + '" 	visible="false" 	/>\
			<DataGridColumn dataField="SALE_YN"   		headerText="' + saleYn + '" 	visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"			headerText="등록사원번호"			visible="false" 	/>\
			<DataGridColumn dataField="IDATE"			headerText="등록일시"				visible="false" 	/>\
			<DataGridColumn dataField="USE_YN"			headerText="사용여부"				visible="false" 	/>\
			<DataGridColumn dataField="UEMP_NO"			headerText="수정사원 번호"			visible="false" 	/>\
			<DataGridColumn dataField="UDATE"			headerText="수정일시"				visible="false" 	/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';

//상품명, 상품코드, 스캔코드, 규격, 단위, 입수, 협력업체, 기준원가, 협력업체코드, 단축상품명, 
layoutStr15 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg15" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="ITM_NAME"  	headerText="' + itmName + '"  	textAlign="left" 	/>\
			<DataGridColumn dataField="ITM_CODE" 	headerText="' + itmCode + '" 	textAlign="center" width="100"	/>\
			<DataGridColumn dataField="SCAN_CODE" 	headerText="' + scanCode + '" 	textAlign="center" width="100"	/>\
			<DataGridColumn dataField="UNIT"   		headerText="' + unit + '" 		textAlign="center" width="70"	/>\
			<DataGridColumn dataField="ORD_UNIT" 	headerText="' + dpPrcUnit + '" 	textAlign="center" width="70"	/>\
			<DataGridColumn dataField="IPSU_QTY"   	headerText="' + ipsuQty + '" 	textAlign="center" width="50"	/>\
			<DataGridColumn dataField="VEN_NAME"	headerText="' + venName + '" 	textAlign="left" 	/>\
			<DataGridColumn dataField="WPRC"		headerText="' + baseWprc + '" 	textAlign="right"  width="70"	formatter="{numfmt}"/>\
			<DataGridColumn dataField="WVAT"		headerText="부가세" 	textAlign="right"  width="70"	formatter="{numfmt}" visible="false" />\
			<DataGridColumn dataField="SPRC"		headerText="' + sprc + '" 		textAlign="right"  width="70"	formatter="{numfmt}"/>\
			<DataGridColumn dataField="STR_DT"		headerText="시작일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_DT"		headerText="종료일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_IND"		headerText="취급여부"				visible="false" 	/>\
			<DataGridColumn dataField="CLS_CODE"	headerText="소분류코드"				visible="false" 	/>\
			<DataGridColumn dataField="VEN_CODE"	headerText="협력업체코드"			visible="true" 	/>\
			<DataGridColumn dataField="VEN_CODE_OUT" headerText="협력업체코드[출고거래처]"	visible="false" 	/>\
			<DataGridColumn dataField="ORG_CODE"	headerText="원산지코드"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_TERM"	headerText="발주주기"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_CYCLE"	headerText="발주 cycle"			visible="false" 	/>\
			<DataGridColumn dataField="LEAD_TIME"	headerText="입고예정일수"			visible="false" 	/>\
			<DataGridColumn dataField="ORD_GB"		headerText="발주구분"				visible="false" 	/>\
			<DataGridColumn dataField="GRE_GB"		headerText="거래구분"				visible="false" 	/>\
			<DataGridColumn dataField="PRGT_RATE"	headerText="수수료율"				visible="false" 	/>\
			<DataGridColumn dataField="WEIGHT_YN"	headerText="수중량관리여부"			visible="false" 	/>\
			<DataGridColumn dataField="POINT_SAVE"	headerText="포인트 적립여부"			visible="false" 	/>\
			<DataGridColumn dataField="GIFT_APP_YN"	headerText="사은품인정여부"			visible="false" 	/>\
			<DataGridColumn dataField="MBR_DC_YN"	headerText="회원할인가능여부"			visible="false" 	/>\
			<DataGridColumn dataField="DP_PRC_UNIT"	headerText="표시단위"			visible="false" 	/>\
			<DataGridColumn dataField="BOT_SPRC"	headerText="공병매가"			visible="false" 	/>\
			<DataGridColumn dataField="USE_YN"		headerText="사용여부"				visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"		headerText="등록사원번호"			visible="false" 	/>\
			<DataGridColumn dataField="IDATE"		headerText="등록일시"				visible="false" 	/>\
			<DataGridColumn dataField="UDATE"		headerText="수정일시"				visible="false" 	/>\
			<DataGridColumn dataField="ITM_GB"		headerText="상품구분"				visible="false" 	/>\
			</columns>\
	</DataGrid>\
</rMateGrid>';


//상품명, 상품코드, 스캔코드, 규격, 단위, 입수, 협력업체, 기준원가, 협력업체코드, 단축상품명, 
layoutStr15_1 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg15_1" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="ITM_NAME"  			headerText="' + itmName + '"  			textAlign="left" 	/>\
			<DataGridColumn dataField="ITM_CODE" 			headerText="' + itmCode + '" 				textAlign="center" width="100"	/>\
			<DataGridColumn dataField="SCAN_CODE" 		headerText="' + scanCode + '" 			textAlign="center" width="100"	/>\
			<DataGridColumn dataField="UNIT"   				headerText="' + unit + '" 					textAlign="center" width="70"	/>\
			<DataGridColumn dataField="ORD_UNIT" 			headerText="' + dpPrcUnit + '" 			textAlign="center" width="70"	/>\
			<DataGridColumn dataField="IPSU_QTY"   			headerText="' + ipsuQty + '" 				textAlign="center" width="50"	/>\
			<DataGridColumn dataField="VEN_NAME"			headerText="' + venName + '" 			textAlign="left" 	/>\
			<DataGridColumn dataField="PUR_AVR_AMT"		headerText="매입기준원가" 					textAlign="right"  width="70"	formatter="{numfmt}" 	/>\
			<DataGridColumn dataField="PUR_AVR_AMT_TAX"		headerText="부가세" 					textAlign="right"  width="70"	formatter="{numfmt}" 	/>\
			<DataGridColumn dataField="WVAT"					headerText="부가세" 							textAlign="right"  width="70"	formatter="{numfmt}" visible="false" />\
			<DataGridColumn dataField="SPRC"					headerText="' + sprc + '" 					textAlign="right"  width="70"	formatter="{numfmt}"/>\
			<DataGridColumn dataField="WPRC"					headerText="' + baseWprc + '" 			textAlign="right"  width="70"	formatter="{numfmt}" visible="false" />\
			<DataGridColumn dataField="STR_DT"				headerText="시작일자"						visible="false" 	/>\
			<DataGridColumn dataField="END_DT"				headerText="종료일자"						visible="false" 	/>\
			<DataGridColumn dataField="END_IND"				headerText="취급여부"						visible="false" 	/>\
			<DataGridColumn dataField="CLS_CODE"			headerText="소분류코드"						visible="false" 	/>\
			<DataGridColumn dataField="VEN_CODE"			headerText="협력업체코드"					visible="true" 	/>\
			<DataGridColumn dataField="VEN_CODE_OUT" 	headerText="협력업체코드[출고거래처]"	visible="false" 	/>\
			<DataGridColumn dataField="ORG_CODE"			headerText="원산지코드"						visible="false" 	/>\
			<DataGridColumn dataField="ORD_TERM"			headerText="발주주기"						visible="false" 	/>\
			<DataGridColumn dataField="ORD_CYCLE"			headerText="발주 cycle"						visible="false" 	/>\
			<DataGridColumn dataField="LEAD_TIME"			headerText="입고예정일수"					visible="false" 	/>\
			<DataGridColumn dataField="ORD_GB"				headerText="발주구분"						visible="false" 	/>\
			<DataGridColumn dataField="GRE_GB"				headerText="거래구분"						visible="false" 	/>\
			<DataGridColumn dataField="PRGT_RATE"			headerText="수수료율"						visible="false" 	/>\
			<DataGridColumn dataField="WEIGHT_YN"			headerText="수중량관리여부"				visible="false" 	/>\
			<DataGridColumn dataField="POINT_SAVE"		headerText="포인트 적립여부"				visible="false" 	/>\
			<DataGridColumn dataField="GIFT_APP_YN"		headerText="사은품인정여부"				visible="false" 	/>\
			<DataGridColumn dataField="MBR_DC_YN"			headerText="회원할인가능여부"				visible="false" 	/>\
			<DataGridColumn dataField="DP_PRC_UNIT"		headerText="표시단위"						visible="false" 	/>\
			<DataGridColumn dataField="BOT_SPRC"			headerText="공병매가"						visible="false" 	/>\
			<DataGridColumn dataField="USE_YN"				headerText="사용여부"						visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"				headerText="등록사원번호"					visible="false" 	/>\
			<DataGridColumn dataField="IDATE"					headerText="등록일시"						visible="false" 	/>\
			<DataGridColumn dataField="UDATE"				headerText="수정일시"						visible="false" 	/>\
			<DataGridColumn dataField="ITM_GB"				headerText="상품구분"						visible="false" 	/>\
			</columns>\
	</DataGrid>\
</rMateGrid>';



//상품명, 상품코드, 스캔코드, 규격, 단위, 입수, 협력업체, 기준원가, 협력업체코드, 단축상품명, 
layoutStr15_6 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg15_6" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="ITM_NAME"  	headerText="' + itmName + '"  	textAlign="left" 	/>\
			<DataGridColumn dataField="ITM_CODE" 	headerText="' + itmCode + '" 	textAlign="center" width="100"	/>\
			<DataGridColumn dataField="SCAN_CODE" 	headerText="' + scanCode + '" 	textAlign="center" width="100"	/>\
			<DataGridColumn dataField="UNIT"   		headerText="' + unit + '" 		textAlign="center" width="70"	/>\
			<DataGridColumn dataField="ORD_UNIT" 	headerText="' + dpPrcUnit + '" 	textAlign="center" width="70"	/>\
			<DataGridColumn dataField="IPSU_QTY"   	headerText="' + ipsuQty + '" 	textAlign="center" width="50"	/>\
			<DataGridColumn dataField="VEN_NAME"	headerText="' + venName + '" 	textAlign="left" 	/>\
			<DataGridColumn dataField="WPRC"		headerText="' + baseWprc + '" 	textAlign="right"  width="70"	formatter="{numfmt}"/>\
			<DataGridColumn dataField="WVAT"		headerText="부가세" 	textAlign="right"  width="70"	formatter="{numfmt}" visible="false" />\
			<DataGridColumn dataField="SPRC"		headerText="' + sprc + '" 		textAlign="right"  width="70"	formatter="{numfmt}"/>\
			<DataGridColumn dataField="PUR_AVR_AMT"		headerText="매입기준원가" textAlign="right"  width="70"	formatter="{numfmt}" 	/>\
			<DataGridColumn dataField="STR_DT"		headerText="시작일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_DT"		headerText="종료일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_IND"		headerText="취급여부"				visible="false" 	/>\
			<DataGridColumn dataField="CLS_CODE"	headerText="소분류코드"				visible="false" 	/>\
			<DataGridColumn dataField="VEN_CODE"	headerText="협력업체코드"			visible="false" 	/>\
			<DataGridColumn dataField="VEN_CODE_OUT" headerText="협력업체코드[출고거래처]"	visible="false" 	/>\
			<DataGridColumn dataField="ORG_CODE"	headerText="원산지코드"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_TERM"	headerText="발주주기"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_CYCLE"	headerText="발주 cycle"			visible="false" 	/>\
			<DataGridColumn dataField="LEAD_TIME"	headerText="입고예정일수"			visible="false" 	/>\
			<DataGridColumn dataField="ORD_GB"		headerText="발주구분"				visible="false" 	/>\
			<DataGridColumn dataField="GRE_GB"		headerText="거래구분"				visible="false" 	/>\
			<DataGridColumn dataField="PRGT_RATE"	headerText="수수료율"				visible="false" 	/>\
			<DataGridColumn dataField="WEIGHT_YN"	headerText="수중량관리여부"			visible="false" 	/>\
			<DataGridColumn dataField="POINT_SAVE"	headerText="포인트 적립여부"			visible="false" 	/>\
			<DataGridColumn dataField="GIFT_APP_YN"	headerText="사은품인정여부"			visible="false" 	/>\
			<DataGridColumn dataField="MBR_DC_YN"	headerText="회원할인가능여부"			visible="false" 	/>\
			<DataGridColumn dataField="DP_PRC_UNIT"	headerText="표시단위"			visible="false" 	/>\
			<DataGridColumn dataField="BOT_SPRC"	headerText="공병매가"			visible="false" 	/>\
			<DataGridColumn dataField="USE_YN"		headerText="사용여부"				visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"		headerText="등록사원번호"			visible="false" 	/>\
			<DataGridColumn dataField="IDATE"		headerText="등록일시"				visible="false" 	/>\
			<DataGridColumn dataField="UDATE"		headerText="수정일시"				visible="false" 	/>\
			<DataGridColumn dataField="ITM_GB"		headerText="상품구분"				visible="false" 	/>\
			</columns>\
	</DataGrid>\
</rMateGrid>';

function commPop17Style(item, column) { 
	return { color:"#0054FF", fontWeight:"bold" };
}
function commPop17Style2(item, column) {
    var value = column.getDataField();
    if (item[value] == "행사")
        return { color:"#DF4D4D", fontWeight:"bold"  };
    return null;
}

layoutStr17 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg17" sortableColumns="true">\
		<columns>\
			<DataGridColumn dataField="EVT_GB"  headerText="상품유형" textAlign="center" width="80" styleJsFunction="commPop17Style2"  />\
			<DataGridColumn dataField="ITM_NAME"  headerText="상품명" textAlign="left" width="300" />\
			<DataGridColumn dataField="ITM_CODE"  headerText="상품코드" textAlign="center" visible="false" />\
			<DataGridColumn dataField="SCAN_CODE"  headerText="스캔코드" textAlign="center" />\
			<DataGridColumn dataField="ORD_DT"  headerText="최근구매일자" textAlign="center" styleJsFunction="commPop17Style" />\
			<DataGridColumn dataField="UNIT"  headerText="규격" textAlign="center" width="80" />\
			<DataGridColumn dataField="ITM_FORM"  headerText="단위" textAlign="center" width="80" />\
			<DataGridColumn dataField="INV_END_QTY"  headerText="점포재고" textAlign="center" width="80" />\
			<DataGridColumn dataField="SPRC"  headerText="판매금액" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn dataField="VEN_NAME"  headerText="협력업체" textAlign="center" />\
			<DataGridColumn dataField="WPRC"  headerText="단가" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_SPRC"  headerText="행사금액" textAlign="center" visible="false" />\
			<DataGridColumn dataField="VEN_CODE"  headerText="협력업체코드" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_CODE"  headerText="단가" textAlign="center" visible="false" />\
			<DataGridColumn dataField="IMAGE_NUM"  headerText="단가" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_YN"  headerText="행사상품포함여부" textAlign="center" visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

layoutStr18 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg18" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="IMAGE_NUM"  headerText="행사전단번호" textAlign="center" width="80" />\
			<DataGridColumn dataField="ITM_NAME"  headerText="상품명" textAlign="left" width="180"/>\
			<DataGridColumn dataField="ITM_CODE"  headerText="상품코드" textAlign="center" width="120" />\
			<DataGridColumn dataField="SCAN_CODE"  headerText="스캔코드" textAlign="center" />\
			<DataGridColumn dataField="ITM_FORM"  headerText="단위" textAlign="center" width="80" />\
			<DataGridColumn dataField="INV_END_QTY"  headerText="점포재고" textAlign="right" width="80" formatter="{numfmt}" />\
			<DataGridColumn dataField="IPSU_QTY"  headerText="입수" textAlign="right" width="70" formatter="{numfmt}" visible="false" />\
			<DataGridColumn dataField="VEN_NAME"  headerText="협력업체" textAlign="left" width="120" />\
			<DataGridColumn dataField="SPRC"  headerText="정상매가" textAlign="right" formatter="{numfmt}" />\
			<DataGridColumn dataField="WPRC"  headerText="단가" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_SPRC"  headerText="행사매가" textAlign="center" />\
			<DataGridColumn dataField="VEN_CODE"  headerText="협력업체코드" textAlign="center" visible="false" />\
			<DataGridColumn dataField="EVT_STR_DT"  headerText="' + eventStartDate + '" textAlign="center" />\
			<DataGridColumn dataField="EVT_END_DT"  headerText="' + eventEndDate + '" textAlign="center" />\
			<DataGridColumn dataField="EVT_CODE"  headerText="협력업체코드" textAlign="center" visible="false" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';


layoutStr19 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg19" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="SLIP_NO"  headerText="주문번호" textAlign="center" />\
			<DataGridColumn dataField="STR_NAME"  headerText="점포명" textAlign="center" />\
			<DataGridColumn dataField="CUST_NO"  headerText="고객명" textAlign="center" visible="false" />\
			<DataGridColumn dataField="CUST_NAME"  headerText="고객명" textAlign="center" />\
			<DataGridColumn dataField="ORD_DT"  headerText="주문일자" textAlign="center" />\
			<DataGridColumn dataField="PAY_METH"  headerText="결제방법" textAlign="center" />\
			<DataGridColumn dataField="ORD_MTHD"  headerText="주문방법" textAlign="center" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';

layoutStr20 =
	'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg20" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="LRG_NAME"  headerText="' + majorCategoryName + '" textAlign="center" />\
			<DataGridColumn dataField="MID_NAME"  headerText="' + middleCategoryName + '" textAlign="center" />\
			<DataGridColumn dataField="CLS_CODE"  headerText="' + subCategory + '" textAlign="center" />\
			<DataGridColumn dataField="CLS_NAME"  headerText="' + subCategoryName + '" textAlign="center" />\
		</columns>\
	</DataGrid>\
</rMateGrid>';


// 묶음대표 상품 검색
//상품명, 상품코드, 스캔코드, 규격, 단위, 입수, 협력업체, 기준원가, 협력업체코드, 단축상품명
layoutStr21 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg21" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="ITM_NAME"  		headerText="' + itmName + '"  	textAlign="left" 	/>\
			<DataGridColumn dataField="ITM_CODE" 		headerText="' + itmCode + '" 	textAlign="center" 	width="100"	/>\
			<DataGridColumn dataField="SCAN_CODE" 		headerText="' + scanCode + '" 	textAlign="center" 	width="100"	/>\
			<DataGridColumn dataField="UNIT"   			headerText="' + unit + '" 		textAlign="center" 	width="70"	/>\
			<DataGridColumn dataField="DP_PRC_UNIT" 	headerText="' + dpPrcUnit + '" 	textAlign="center" 	width="70"	/>\
			<DataGridColumn dataField="IPSU_QTY"   		headerText="' + ipsuQty + '" 	textAlign="center" 	width="50"	/>\
			<DataGridColumn dataField="VEN_NAME"		headerText="' + venName + '" 	textAlign="left" 	/>\
			<DataGridColumn dataField="BASE_WPRC"		headerText="' + baseWprc + '" 	textAlign="right" 	width="70"	formatter="{numfmt}"/>\
			<DataGridColumn dataField="VEN_CODE"		headerText="' + venCode + '" 	visible="false"		/>\
			<DataGridColumn dataField="ITM_SHORT_NAME"	headerText="' + itmShortName + '" visible="false"	/>\
			<DataGridColumn dataField="ITM_STD"			headerText="관리구분"				visible="false" 	/>\
			<DataGridColumn dataField="STR_DT"			headerText="시작일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_DT"			headerText="종료일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_IND"			headerText="취급여부"				visible="false" 	/>\
			<DataGridColumn dataField="CLS_CODE"		headerText="소분류코드"				visible="false" 	/>\
			<DataGridColumn dataField="ITM_GB"			headerText="상품구분"				visible="false" 	/>\
			<DataGridColumn dataField="ITM_FORM"		headerText="상품형태"				visible="false" 	/>\
			<DataGridColumn dataField="TAX_GB"			headerText="과세구분"				visible="false" 	/>\
			<DataGridColumn dataField="IN_CAPACITY"		headerText="제품용량"				visible="false" 	/>\
			<DataGridColumn dataField="UNIT_CAPACITY"	headerText="표시용량"				visible="false" 	/>\
			<DataGridColumn dataField="MAKE_VEN_NAME"	headerText="제조사명"				visible="false" 	/>\
			<DataGridColumn dataField="ORG_CODE"		headerText="원산지코드"				visible="false" 	/>\
			<DataGridColumn dataField="ROUTE_GB"		headerText="배송구분"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_GB"			headerText="발주구분"				visible="false" 	/>\
			<DataGridColumn dataField="BASE_SPRC"		headerText="기준원가"				visible="false" 	/>\
			<DataGridColumn dataField="BOT_CODE"		headerText="공병코드"				visible="false" 	/>\
			<DataGridColumn dataField="BOT_SPRC"		headerText="공병단가"				visible="false" 	/>\
			<DataGridColumn dataField="FTRACE_YN"		headerText="영유아식품이력"			visible="false" 	/>\
			<DataGridColumn dataField="STRACE_YN"		headerText="수산물이력"				visible="false" 	/>\
			<DataGridColumn dataField="MTRACE_YN"		headerText="축산물이력"				visible="false" 	/>\
			<DataGridColumn dataField="INGR_YN"			headerText="공산식자재유무"			visible="false" 	/>\
			<DataGridColumn dataField="POINT_SAVE"		headerText="포인트 적립여부"			visible="false" 	/>\
			<DataGridColumn dataField="MBR_CD_YN"		headerText="회원할인가능여부"			visible="false" 	/>\
			<DataGridColumn dataField="VALID_DT_YN"		headerText="유효일자관리유무"			visible="false" 	/>\
			<DataGridColumn dataField="VALID_DD"		headerText="유효일수"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_1"		headerText="도매할인1"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_2"		headerText="도매할인2"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_3"		headerText="도매할인3"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_4"		headerText="도매할인4"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_5"		headerText="도매할인5"				visible="false" 	/>\
			<DataGridColumn dataField="TPER_MTHD"		headerText="보관방법"				visible="false" 	/>\
			<DataGridColumn dataField="CFM_FLAG"		headerText="확정여부"				visible="false" 	/>\
			<DataGridColumn dataField="USE_YN"			headerText="사용여부"				visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"			headerText="등록사원번호"			visible="false" 	/>\
			<DataGridColumn dataField="IDATE"			headerText="등록일시"				visible="false" 	/>\
			<DataGridColumn dataField="UEMP_NO"			headerText="수정사원 번호"			visible="false" 	/>\
			<DataGridColumn dataField="UDATE"			headerText="수정일시"				visible="false" 	/>\
		</columns>\
	</DataGrid>\
</rMateGrid>';


//점별 배송구분(ROUTE_GB)별 상품검색
//상품명, 상품코드, 스캔코드, 규격, 단위, 입수, 협력업체, 기준원가, 협력업체코드, 단축상품명
layoutStr22 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg22" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="ITM_NAME"  		headerText="' + itmName + '"  	textAlign="left" 	/>\
			<DataGridColumn dataField="ITM_CODE" 		headerText="' + itmCode + '" 	textAlign="center" 	width="100"	/>\
			<DataGridColumn dataField="SCAN_CODE" 		headerText="' + scanCode + '" 	textAlign="center" 	width="100"	/>\
			<DataGridColumn dataField="UNIT"   			headerText="' + unit + '" 		textAlign="center" 	width="70"	/>\
			<DataGridColumn dataField="DP_PRC_UNIT" 	headerText="' + dpPrcUnit + '" 	textAlign="center" 	width="70"	/>\
			<DataGridColumn dataField="IPSU_QTY"   		headerText="' + ipsuQty + '" 	textAlign="center" 	width="50"	/>\
			<DataGridColumn dataField="VEN_NAME"		headerText="' + venName + '" 	textAlign="left" 	/>\
			<DataGridColumn dataField="BASE_WPRC"		headerText="' + baseWprc + '" 	textAlign="right" 	width="70"	formatter="{numfmt}"/>\
			<DataGridColumn dataField="VEN_CODE"		headerText="' + venCode + '" 	visible="false"		/>\
			<DataGridColumn dataField="ITM_SHORT_NAME"	headerText="' + itmShortName + '" visible="false"	/>\
			<DataGridColumn dataField="ITM_STD"			headerText="관리구분"				visible="false" 	/>\
			<DataGridColumn dataField="STR_DT"			headerText="시작일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_DT"			headerText="종료일자"				visible="false" 	/>\
			<DataGridColumn dataField="END_IND"			headerText="취급여부"				visible="false" 	/>\
			<DataGridColumn dataField="CLS_CODE"		headerText="소분류코드"				visible="false" 	/>\
			<DataGridColumn dataField="ITM_GB"			headerText="상품구분"				visible="false" 	/>\
			<DataGridColumn dataField="ITM_FORM"		headerText="상품형태"				visible="false" 	/>\
			<DataGridColumn dataField="TAX_GB"			headerText="과세구분"				visible="false" 	/>\
			<DataGridColumn dataField="IN_CAPACITY"		headerText="제품용량"				visible="false" 	/>\
			<DataGridColumn dataField="UNIT_CAPACITY"	headerText="표시용량"				visible="false" 	/>\
			<DataGridColumn dataField="MAKE_VEN_NAME"	headerText="제조사명"				visible="false" 	/>\
			<DataGridColumn dataField="ORG_CODE"		headerText="원산지코드"				visible="false" 	/>\
			<DataGridColumn dataField="ROUTE_GB"		headerText="배송구분"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_GB"			headerText="발주구분"				visible="false" 	/>\
			<DataGridColumn dataField="BASE_SPRC"		headerText="기준원가"				visible="false" 	/>\
			<DataGridColumn dataField="BOT_CODE"		headerText="공병코드"				visible="false" 	/>\
			<DataGridColumn dataField="BOT_SPRC"		headerText="공병단가"				visible="false" 	/>\
			<DataGridColumn dataField="FTRACE_YN"		headerText="영유아식품이력"			visible="false" 	/>\
			<DataGridColumn dataField="STRACE_YN"		headerText="수산물이력"				visible="false" 	/>\
			<DataGridColumn dataField="MTRACE_YN"		headerText="축산물이력"				visible="false" 	/>\
			<DataGridColumn dataField="INGR_YN"			headerText="공산식자재유무"			visible="false" 	/>\
			<DataGridColumn dataField="POINT_SAVE"		headerText="포인트 적립여부"			visible="false" 	/>\
			<DataGridColumn dataField="MBR_CD_YN"		headerText="회원할인가능여부"			visible="false" 	/>\
			<DataGridColumn dataField="VALID_DT_YN"		headerText="유효일자관리유무"			visible="false" 	/>\
			<DataGridColumn dataField="VALID_DD"		headerText="유효일수"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_1"		headerText="도매할인1"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_2"		headerText="도매할인2"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_3"		headerText="도매할인3"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_4"		headerText="도매할인4"				visible="false" 	/>\
			<DataGridColumn dataField="WSAL_RATE_5"		headerText="도매할인5"				visible="false" 	/>\
			<DataGridColumn dataField="TPER_MTHD"		headerText="보관방법"				visible="false" 	/>\
			<DataGridColumn dataField="CFM_FLAG"		headerText="확정여부"				visible="false" 	/>\
			<DataGridColumn dataField="USE_YN"			headerText="사용여부"				visible="false" 	/>\
			<DataGridColumn dataField="IEMP_NO"			headerText="등록사원번호"			visible="false" 	/>\
			<DataGridColumn dataField="IDATE"			headerText="등록일시"				visible="false" 	/>\
			<DataGridColumn dataField="UEMP_NO"			headerText="수정사원 번호"			visible="false" 	/>\
			<DataGridColumn dataField="UDATE"			headerText="수정일시"				visible="false" 	/>\
			<DataGridColumn dataField="STR_CODE"			headerText="STR_CODE"				visible="false" 	/>\
			<DataGridColumn dataField="UNIT_NM"			headerText="UNIT_NM"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_FLAG"			headerText="ORD_FLAG"				visible="false" 	/>\
			<DataGridColumn dataField="TAX_GB_NM"			headerText="TAX_GB_NM"				visible="false" 	/>\
			<DataGridColumn dataField="ORD_FLAG_NM"			headerText="ORD_FLAG_NM"				visible="false" 	/>\
			<DataGridColumn dataField="INV_END_QTY"			headerText="INV_END_QTY"				visible="false" 	/>\
			<DataGridColumn dataField="PUR_AVR_AMT"			headerText="PUR_AVR_AMT"				visible="false" 	/>\
			<DataGridColumn dataField="CREDIT_LIMIT"			headerText="CREDIT_LIMIT"				visible="false" 	/>\
			<DataGridColumn dataField="TPER_MTHD"		headerText="보관방법"				visible="false" 	/>\
			<DataGridColumn dataField="TPER_MTHD_NM"		headerText="보관방법명"				visible="false" 	/>\
			</columns>\
	</DataGrid>\
</rMateGrid>';

// 카드행사 카드 정보 조회  
layoutStr23 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg23" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="CARD_CODE"  		headerText="카드사코드"  	textAlign="center" 	/>\
			<DataGridColumn dataField="CARD_NAME" 		headerText="카드사명" 		textAlign="center"	/>\
			<DataGridColumn dataField="CARD_PREFIX" 		headerText="카드식별번호" 	textAlign="center"	/>\
			<DataGridColumn dataField="MBR_DSNT"   		headerText="카드명칭" 		textAlign="center"	/>\
			<DataGridSelectorColumn id="selector"				headerText="선택"			textAlign="center" backgroundColor="#EDEDF0"/>\
		 </columns>\
	</DataGrid>\
</rMateGrid>';
layoutStr24 =
'<rMateGrid>\
	<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
	<DataGrid id="dg24" sortableColumns="true" selectionMode="multipleCells">\
		<columns>\
			<DataGridColumn dataField="CARD_CODE"  		headerText="카드사코드"  	textAlign="center" 	/>\
			<DataGridColumn dataField="CARD_NAME" 		headerText="카드사명" 		textAlign="center"	/>\
		 </columns>\
	</DataGrid>\
</rMateGrid>';

layoutStr25 =
	'<rMateGrid>\
		<DataGrid id="dg25" sortableColumns="true" selectionMode="multipleCells">\
			<columns>\
				<DataGridColumn dataField="STR_NAME" 		headerText="' + storNm + '" 	textAlign="center" 	/>\
				<DataGridColumn dataField="STR_CODE"  		headerText="' + storCode + '"  	textAlign="center" 	/>\
				<DataGridColumn dataField="REP_NAME" 		headerText="' + ceoName + '" 	textAlign="center" 	/>\
				<DataGridColumn dataField="ADDR"	   		headerText="' + addr + '" 		textAlign="left" width="180"	/>\
				<DataGridColumn dataField="BUSI_NO"	   		headerText="' + bizNo + '" 		textAlign="center" width="120"	/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';
	
layoutStr26 = 
	'<rMateGrid>\
		<DataGrid id="dg26" sortableColumns="true" selectionMode="multipleCells">\
			<columns>\
				<DataGridColumn dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="EVT_CODE"  headerText="' + eventCode + '" textAlign="center" width="70" />\
				<DataGridColumn dataField="EVT_NAME"  headerText="' + eventName + '" textAlign="left"  width="200"/>\
				<DataGridColumn dataField="EVT_STR_DT"  headerText="' + eventStartDate + '" textAlign="center" />\
				<DataGridColumn dataField="EVT_END_DT"  headerText="' + eventEndDate + '" textAlign="center" />\
				<DataGridColumn dataField="ORD_STR_DT"  headerText="' + orderStartDate + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="ORD_END_DT"  headerText="' + orderEnddate + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="EVT_FLAG"  headerText="' + eventType + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="EVT_FLAG_NM"  headerText="' + eventType + '" textAlign="center" width="70" />\
				<DataGridColumn dataField="EVT_TYPE"  headerText="' + evtType + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="EVT_TYPE_NM"  headerText="' + evtType + '" textAlign="center" width="70" />\
				<DataGridColumn dataField="REMARK"  headerText="' + remark + '" textAlign="left" width="200" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';

layoutStr27 = 
	'<rMateGrid>\
		<DataGrid id="dg27" sortableColumns="true" selectionMode="multipleCells">\
			<columns>\
				<DataGridColumn dataField="STR_CODE"  headerText="' + storeCode + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="STR_NAME"  headerText="' + tgetStr + '" textAlign="center" width="70" />\
				<DataGridColumn dataField="GIFT_CODE"  headerText="' + eventCode + '" textAlign="center" width="70" />\
				<DataGridColumn dataField="GIFT_NAME"  headerText="' + giftName + '" textAlign="left"  width="200"/>\
				<DataGridColumn dataField="GIFT_STR_DT"  headerText="' + giftStrDt + '" textAlign="center" />\
				<DataGridColumn dataField="GIFT_END_DT"  headerText="' + giftEndDt + '" textAlign="center" />\
				<DataGridColumn dataField="GIFT_CMP_FLAG"  headerText="' + giftCmpFlag + '" textAlign="center" visible="false" />\
				<DataGridColumn dataField="GIFT_CMP_FLAG_NM"  headerText="' + giftCmpFlag + '" textAlign="center" width="70" />\
				<DataGridColumn dataField="REMARK"  headerText="' + remark + '" textAlign="left" width="200" />\
			</columns>\
		</DataGrid>\
	</rMateGrid>';
	
	
	

//상품명, 상품코드, 스캔코드, 규격, 단위, 입수, 협력업체, 기준원가, 협력업체코드, 단축상품명, 
layoutStr28 =
	'<rMateGrid>\
		<NumberFormatter id="numfmt" useThousandsSeparator="true"/>\
		<DataGrid id="dg28" sortableColumns="true" selectionMode="multipleCells">\
			<columns>\
				<DataGridColumn dataField="ITM_NAME"  	headerText="' + itmName + '"  	textAlign="left" 	/>\
				<DataGridColumn dataField="ITM_CODE" 	headerText="' + itmCode + '" 	textAlign="center" width="100"	/>\
				<DataGridColumn dataField="SCAN_CODE" 	headerText="' + scanCode + '" 	textAlign="center" width="100"	/>\
				<DataGridColumn dataField="UNIT"   		headerText="' + unit + '" 		textAlign="center" width="70"	/>\
				<DataGridColumn dataField="ORD_UNIT" 	headerText="' + dpPrcUnit + '" 	textAlign="center" width="70"	/>\
				<DataGridColumn dataField="IPSU_QTY"   	headerText="' + ipsuQty + '" 	textAlign="center" width="50"	/>\
				<DataGridColumn dataField="VEN_NAME"	headerText="' + venName + '" 	textAlign="left" 	/>\
				<DataGridColumn dataField="WPRC"		headerText="' + baseWprc + '" 	textAlign="right"  width="70"	formatter="{numfmt}"/>\
				<DataGridColumn dataField="WVAT"		headerText="부가세" 	textAlign="right"  width="70"	formatter="{numfmt}" visible="false" />\
				<DataGridColumn dataField="SPRC"		headerText="' + sprc + '" 		textAlign="right"  width="70"	formatter="{numfmt}"/>\
				<DataGridColumn dataField="STR_DT"		headerText="시작일자"				visible="false" 	/>\
				<DataGridColumn dataField="END_DT"		headerText="종료일자"				visible="false" 	/>\
				<DataGridColumn dataField="END_IND"		headerText="취급여부"				visible="false" 	/>\
				<DataGridColumn dataField="CLS_CODE"	headerText="소분류코드"				visible="false" 	/>\
				<DataGridColumn dataField="VEN_CODE"	headerText="협력업체코드"			visible="false" 	/>\
				<DataGridColumn dataField="VEN_CODE_OUT" headerText="협력업체코드[출고거래처]"	visible="false" 	/>\
				<DataGridColumn dataField="ORG_CODE"	headerText="원산지코드"				visible="false" 	/>\
				<DataGridColumn dataField="ORD_TERM"	headerText="발주주기"				visible="false" 	/>\
				<DataGridColumn dataField="ORD_CYCLE"	headerText="발주 cycle"			visible="false" 	/>\
				<DataGridColumn dataField="LEAD_TIME"	headerText="입고예정일수"			visible="false" 	/>\
				<DataGridColumn dataField="ORD_GB"		headerText="발주구분"				visible="false" 	/>\
				<DataGridColumn dataField="GRE_GB"		headerText="거래구분"				visible="false" 	/>\
				<DataGridColumn dataField="PRGT_RATE"	headerText="수수료율"				visible="false" 	/>\
				<DataGridColumn dataField="WEIGHT_YN"	headerText="수중량관리여부"			visible="false" 	/>\
				<DataGridColumn dataField="POINT_SAVE"	headerText="포인트 적립여부"			visible="false" 	/>\
				<DataGridColumn dataField="GIFT_APP_YN"	headerText="사은품인정여부"			visible="false" 	/>\
				<DataGridColumn dataField="MBR_DC_YN"	headerText="회원할인가능여부"			visible="false" 	/>\
				<DataGridColumn dataField="DP_PRC_UNIT"	headerText="표시단위"			visible="false" 	/>\
				<DataGridColumn dataField="BOT_SPRC"	headerText="공병매가"			visible="false" 	/>\
				<DataGridColumn dataField="USE_YN"		headerText="사용여부"				visible="false" 	/>\
				<DataGridColumn dataField="IEMP_NO"		headerText="등록사원번호"			visible="false" 	/>\
				<DataGridColumn dataField="IDATE"		headerText="등록일시"				visible="false" 	/>\
				<DataGridColumn dataField="UDATE"		headerText="수정일시"				visible="false" 	/>\
				</columns>\
		</DataGrid>\
	</rMateGrid>';	
	
	// 회원명, 회원번호, 회원구분, 회원등급, 휴대전화, 전화번호, 주소, 상세주소, 기업코드
	layoutStr29 =
	'<rMateGrid>\
		<DataGrid id="dg29" sortableColumns="true"   selectionMode="multipleCells">\
			<columns>\
				<DataGridColumn dataField="CUST_NAME"  		headerText="' + cusName + '"  	textAlign="center"  />\
				<DataGridColumn dataField="OWN_NAME"		headerText="대표자"				textAlign="center" 	/>\
				<DataGridColumn dataField="CUST_NO" 		headerText="' + cusNo + '" 		textAlign="center" 	/>\
				<DataGridColumn dataField="BUSI_FLAG_NAME" 	headerText="' + busiFlag + '" 	textAlign="center" 	/>\
				<DataGridColumn dataField="BUSI_FLAG" 		headerText="' + busiFlag + '" 	visible="false" 	/>\
				<DataGridColumn dataField="MBR_GRADE_NAME" 	headerText="' + mbrGrade + '" 	textAlign="center" 	/>\
				<DataGridColumn dataField="MBR_GRADE"   	headerText="' + mbrGrade + '" 	visible="false" 	/>\
				<DataGridColumn dataField="MOBIL_NO"		headerText="' + mobilNo + '" 	textAlign="center" 	/>\
				<DataGridColumn dataField="TEL_NO"   		headerText="' + phoneNumber +'" textAlign="center" />\
				<DataGridColumn dataField="ADDR"   			headerText="' + addr + '" 		textAlign="left" 	width="210"/>\
				<DataGridColumn dataField="ADDR_DTL"		headerText="' + addrDtl + '" 	visible="false" 	/>\
				<DataGridColumn dataField="CORP_CODE"		headerText="' + corpCode + '" 	visible="false" 	/>\
				<DataGridColumn dataField="BUSI_NAME"		headerText="상호명" 				visible="false" 	/>\
				<DataGridColumn dataField="SEX"				headerText="성별" 				visible="false" 	/>\
				<DataGridColumn dataField="SEX_NAME"		headerText="성별명" 				visible="false" 	/>\
				<DataGridColumn dataField="BIR_DATE"		headerText="생년월일" 				visible="false" 	/>\
				<DataGridColumn dataField="BUSI_NO"			headerText="사업자번호"				visible="false" 	/>\
				<DataGridColumn dataField="POST_NO"			headerText="우편번호"				visible="false" 	/>\
				<DataGridColumn dataField="UPTAE"			headerText="업태"					visible="false" 	/>\
				<DataGridColumn dataField="UPJONG"			headerText="종목"					visible="false" 	/>\
				<DataGridColumn dataField="INDUST_FLAG"		headerText=""					visible="false" 	/>\
				<DataGridColumn dataField="POINT_SAVE"		headerText="포인트적립여부"			visible="false" 	/>\
				<DataGridColumn dataField="POINT_USE_YN"	headerText="포인트사용유무"			visible="false" 	/>\
				<DataGridColumn dataField="LIQUOR_SALE_YN"	headerText="할인율"				visible="false" 	/>\
				<DataGridColumn dataField="CREDIT_LIMIT_YN"	headerText="여신관리유무"			visible="false" 	/>\
				<DataGridColumn dataField="CREDIT_LIMIT"	headerText="여신한도"				visible="false" 	/>\
				<DataGridColumn dataField="VTL_ACC_NO"		headerText="가상계좌"				visible="false" 	/>\
				<DataGridColumn dataField="VTL_ACC_YN"		headerText="계좌유효유무"			visible="false" 	/>\
				<DataGridColumn dataField="VTL_STR_DT"		headerText="가상계좌적용일자"			visible="false" 	/>\
				<DataGridColumn dataField="VTL_END_DT"		headerText="가상계좌종료일자"			visible="false" 	/>\
				<DataGridColumn dataField="CREDIT_USE_YN"	headerText="외상거래가능유무"			visible="false" 	/>\
				<DataGridColumn dataField="LEAVE_YN"		headerText="탈퇴여부"				visible="false" 	/>\
				<DataGridColumn dataField="LEAVE_DT"		headerText="탈퇴일자"				visible="false" 	/>\
				<DataGridColumn dataField="SMS_YN"			headerText="SMS수신여부"			visible="false" 	/>\
				<DataGridColumn dataField="DM_YN"			headerText="DM수신여부"			visible="false" 	/>\
				<DataGridColumn dataField="END_TEL_NO"		headerText="전화번호끝자리"			visible="false" 	/>\
				<DataGridColumn dataField="CASH_APP_YN"		headerText="현금영수증적립구분"		visible="false" 	/>\
				<DataGridColumn dataField="CASH_MOBIL_NO"	headerText="현금영수증적립번호"		visible="false" 	/>\
				<DataGridColumn dataField="FAX_NO"			headerText="팩스번호"				visible="false" 	/>\
				<DataGridColumn dataField="EMAIL_YN"		headerText="이메일수신여부"			visible="false" 	/>\
				<DataGridColumn dataField="SEND_EMAIL"		headerText=""					visible="false" 	/>\
				<DataGridColumn dataField="STR_CODE"		headerText="점포코드"				visible="false" 	/>\
				<DataGridColumn dataField="ZON_AREA"		headerText="지역구분"				visible="false" 	/>\
				<DataGridColumn dataField="BIR_TYPE"		headerText="음력구분"				visible="false" 	/>\
				<DataGridColumn dataField="EMP_PWD"			headerText=""					visible="false" 	/>\
				<DataGridColumn dataField="REMARK"			headerText="적요"					visible="false" 	/>\
				<DataGridColumn dataField="BAL_TYPE"		headerText="발행구분"				visible="false" 	/>\
				<DataGridColumn dataField="ACCT_DEPT"		headerText="회계코드"				visible="false" 	/>\
				<DataGridColumn dataField="EMP_NO"			headerText="사원번호"				visible="false" 	/>\
				<DataGridColumn dataField="USER_NM"			headerText="사원명"				visible="false" 	/>\
				<DataGridColumn dataField="MBR_DC_YN"	    headerText="회원할인가능여부"		visible="true" 	/>\
				<DataGridColumn dataField="IEMP_NO"			headerText="등록사원번호"			visible="false" 	/>\
				<DataGridColumn dataField="IDATE"			headerText="등록일시"				visible="false" 	/>\
				<DataGridColumn dataField="UEMP_NO"			headerText="수정사원 번호"			visible="false" 	/>\
				<DataGridColumn dataField="UDATE"			headerText="수정일시"				visible="false" 	/>\
			</columns>\
		</DataGrid>\
	</rMateGrid>';
	
// ----------------------- 그리드 설정 끝 -------------------------------------

function applyFormElementJquery() {
	$("#top_search").applyCommJquery();
}

 

jQuery.download = function(url, data, method){
    // url과 data를 입력받음
    if( url && data ){ 
        // data 는  string 또는 array/object 를 파라미터로 받는다.
        data = typeof data == 'string' ? data : jQuery.param(data);
        // 파라미터를 form의  input으로 만든다.
        var inputs = '';
        jQuery.each(data.split('&'), function(){ 
            var pair = this.split('=');
            inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
        });
        // request를 보낸다.
        jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
        .appendTo('body').submit().remove();
    };
};
//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  

//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################

function filterFunctionSupplyUseYn_Y(item) { 
	if (  (item["USE_YN"]).indexOf("Y") >= 0   )
		return true;
	return false;
}
function filterFunctionSupplyUseYn_N(item) { 
	if (  (item["USE_YN"]).indexOf("N") >= 0   )
		return true;
	return false;
}

// 협력업체 라디오 버튼 클릭시 사용 유무 보여주기 -필터
function chgSupplyUseYn( VAL )
{
	 
	if( VAL == "" )  
	{
		gridRoot12.setFilterFunction(null);
	}
	if( VAL == "Y" )
	{    
		gridRoot12.setFilterFunction("filterFunctionSupplyUseYn_Y");
	}
	if( VAL == "N" )
	{ 
		gridRoot12.setFilterFunction("filterFunctionSupplyUseYn_N");
	}
	
}

function chgSupplyUseYn_new(val){
	$('#SUPPLY_USE_YN').val(val);
	btn_comm_search('3');
}

function chgEndInd(val){
	$('#P_ENDIND_FLAG').val(val);
	btn_comm_search('2');
	console.log("ddd : " + $('#P_ENDIND_FLAG').val());
}


// 숫자 콤마 및 소수점 한자리까지 표시 
function perFunction1(item, value, column){	
	var num1 = (item["BASE_WPRC"]);
	return perFunction2(num1);    
}

// 입력값의 byte수를 리턴해 준다.
function byteCheck(text){
	var byte = 0;
	for(var i=0, len = text.length; i < len; i++){
		if(escape(text.charAt(i)).length > 4){
			byte+=2;
		}else{
			byte++;
		}
	}
	return byte;
}

 
// 부모창에서 선택한 점포별 상품 검색
function btn_comm_search6_6(){
	 var loadData; 
	 loadData = $("#top_search15_6").serializeAllObject();
	  
	jQuery.ajax({ 
	    url:"/selectedStoreProduct.do",        //  storeRouteGbProduct.do
	    type:"POST",
		datatype:"json",
		async:false,
		data: loadData,
		success:function(data){
		 
			gridApp15_6.setData(data); 
				
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	           
	    }
	});
		  
}


function btn_comm_search13(){
	 var loadData;
	 // 점별 배송구분(ROUTE_GB)별 상품검색  
	 loadData = $("#top_search22").serializeAllObject();
	  
	jQuery.ajax({ 
	    url:"/storeRouteGbProduct.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: loadData,
		success:function(data){
		 
				gridApp22.setData(data); 
				
	    },
	    complete : function(data) {
	    	 
	    },
	    error : function(xhr, status, error) {
	           
	    }
	});
		  
}



function filterFunctionVenCode(item) 
{  
	var SET_VEN_CODE_VAL = $('#SET_VEN_CODE').val(); 
	 
	if  (   SET_VEN_CODE_VAL != "" || typeof SET_VEN_CODE_VAL != 'undefined' )
	{	 
		if (  (item["VEN_CODE"]).indexOf(  SET_VEN_CODE_VAL   )    >= 0     )
			return true;
		return false;
	}
}
 
function venCodeFilter(gridRoot)
{ 
	//gridRoot15.setFilterFunction("filterFunctionVenCode");
	  
	var SET_VEN_CODE_VAL = $('#SET_VEN_CODE').val();
		
	if( SET_VEN_CODE_VAL == "" || typeof SET_VEN_CODE_VAL == 'undefined' )
	{  
		eval( gridRoot + ".setFilterFunction(null); " );
	} else {   
		eval( gridRoot + ".setFilterFunction('filterFunctionVenCode'); " ); 
	} 
}

function btn_comm_search(val){
	 
	var loadData;
	if(val != '5' && val != '4'){
		if(byteCheck($("#P_TEXT" + val).val()) < 4){
			alert(msgCommonInput);
			return;
		}	
	}
	
	if(val == '1'){
		loadData = $("#top_search10").serializeAllObject();
	}else if(val == '2'){
		loadData = $("#top_search11").serializeAllObject();
	}else if(val == '3'){
		loadData = $("#top_search12").serializeAllObject();
	}else if(val == '3_2'){
		loadData = $("#top_search12_2").serializeAllObject();
	}else if(val == '4'){
		loadData = $("#top_search13").serializeAllObject();
	}else if(val == '4_1'){
		loadData = $("#top_search13_1").serializeAllObject();
	}else if(val == '5'){
		loadData = $("#top_search14").serializeAllObject();
	}else if(val == '6'){
		loadData = $("#top_search15").serializeAllObject();
	}else if(val == '6_1'){
		loadData = $("#top_search15_1").serializeAllObject();
	}else if(val == '7'){
		loadData = $("#top_search16").serializeAllObject();
	}else if(val == '12'){  // 묶음대표 상품  
		loadData = $("#top_search21").serializeAllObject();
	}else if(val == '16'){  // 점포조회
		loadData = $("#top_search25").serializeAllObject();
	}else if(val == '19'){  
		loadData = $("#top_search28").serializeAllObject();
	}else if(val == '20'){  
		loadData = $("#top_search29").serializeAllObject();
	}
	
	var strUrl;
	if(val == '3_2'){
		strUrl = '/getPaymentSelectBoxList_2.do';
	}
	else {
		strUrl = '/commPopList.do';
	}
	
	//최초 로딩시 그리드1 데이터 조회 및 그리드 데이터 셋팅
	jQuery.ajax({ 
	    //url:"/commPopList.do",
	    url:strUrl,
	    type:"POST",
		datatype:"json",
		data: loadData,
		beforeSend : function(){ 
			if(val == '1'){
				gridRoot10.addLoadingBar();
			}else if(val == '2'){
				gridRoot11.addLoadingBar();
			}else if(val == '3'){
				gridRoot12.addLoadingBar();
				
				// 협력업체 검색후 라디오 버튼 전체로 바꾸기
//  				 $('input:radio[name=SUPPLY_USE_YN]:input[value='']]).attr("checked", true);
 //				$('input:radio[name="SUPPLY_USE_YN"][value="Y"]').attr('checked',true);
 				$('input:radio[name="SUPPLY_USE_YN"][value=""]').attr('checked',true);
				
			}else if(val == '3_2'){
				gridRoot12_2.addLoadingBar();
			}else if(val == '4'){
				gridRoot13.addLoadingBar();
			}else if(val == '4_1'){
				gridRoot13_1.addLoadingBar();
			}else if(val == '5'){
				gridRoot14.addLoadingBar();
			}else if(val == '6'){
				gridRoot15.addLoadingBar();
		 
			}else if(val == '6_1'){
				gridRoot15_1.addLoadingBar();
		 
			}else if(val == '7'){
				gridRoot16.addLoadingBar();
			}else if(val == '12'){
				gridRoot21.addLoadingBar();
			}else if(val == '16'){
				gridRoot25.addLoadingBar();
			}else if(val == '19'){
				gridRoot28.addLoadingBar();
			}else if(val == '20'){
				gridRoot29.addLoadingBar();
			}
	    },
		success:function(data){
			if(val == '1'){
				gridApp10.setData(data);
				dataGrid10.setEnabled(true);
		       	gridRoot10.removeLoadingBar();
			}else if(val == '2'){
				gridApp11.setData(data);
				dataGrid11.setEnabled(true);
		       	gridRoot11.removeLoadingBar();
			}else if(val == '3'){
				gridApp12.setData(data);
				dataGrid12.setEnabled(true);
		       	gridRoot12.removeLoadingBar();
		       //	console.log(JSON.stringify(data));
			}else if(val == '3_2'){
				gridApp12_2.setData(data);
				dataGrid12_2.setEnabled(true);
		       	gridRoot12_2.removeLoadingBar();
			}else if(val == '4'){
				gridApp13.setData(data);
				dataGrid13.setEnabled(true);
		       	gridRoot13.removeLoadingBar();
			}else if(val == '4_1'){
				gridApp13_1.setData(data);
				dataGrid13_1.setEnabled(true);
		       	gridRoot13_1.removeLoadingBar();
			}else if(val == '5'){
				gridApp14.setData(data);
				dataGrid14.setEnabled(true);
		       	gridRoot14.removeLoadingBar();
			}else if(val == '6'){
				gridApp15.setData(data);
				dataGrid15.setEnabled(true);
				 
		       	gridRoot15.removeLoadingBar(); 
			}else if(val == '6_1'){
				gridApp15_1.setData(data);
				dataGrid15_1.setEnabled(true);
				 
		       	gridRoot15_1.removeLoadingBar(); 
			}else if(val == '7'){
				gridApp16.setData(data);
				dataGrid16.setEnabled(true);
		       	gridRoot16.removeLoadingBar();
			}else if(val == '12'){ // 묶음대표 상품 
				gridApp21.setData(data);
				dataGrid21.setEnabled(true);
		       	gridRoot21.removeLoadingBar();
			}else if(val == '16'){ // 묶음대표 상품 
				gridApp25.setData(data);
				dataGrid25.setEnabled(true);
		       	gridRoot25.removeLoadingBar();
			}else if(val == '19'){  
				gridApp28.setData(data);
				dataGrid28.setEnabled(true);
		       	gridRoot28.removeLoadingBar();
			}else if(val == '20'){  
				gridApp29.setData(data);
				dataGrid29.setEnabled(true);
		       	gridRoot29.removeLoadingBar();
			}
			
	    },
	    complete : function(data) {
	    	 
	    	
	    	
	    },
	    error : function(xhr, status, error) {
	    }
	});
	

	
	
}

function btn_comm_search8(){
	
	if(byteCheck($("#P_TEXT8").val()) < 2){
		return;
	} 
	
	$('#comm_pop_wrap8' ).dialog( 'open' );
	gridApp17.resize();

	//로딩바 출력
	showLoadingBar17();
	
	jQuery.ajax({ 
	    url:"/businessCallSelectProduct.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'STR_CODE' : $("#STR_CODE").val()
				,	'SEARCH_WORD' : $("#P_TEXT8").val()
				,	'P_CUST_NO' : $("#CUST_NO").val()
				},
		success:function(data){ 
			//gridApp17.setData(data);
			//alert(data.length);
			if(data.length > 0){
				if(data.length == 1){
					$('#comm_pop_wrap8' ).dialog( 'close' );
					fn_comm_order_product_callback(data[0]);
				}else{
					//$('#comm_pop_wrap8' ).dialog( 'open' );
					//gridApp17.resize();
					gridApp17.setData(data);
				}
			}
			
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar17();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar17();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btn_comm_search9(){
	
	//로딩바 출력
	showLoadingBar18();
	
	jQuery.ajax({ 
	    url:"/businessCallSelectEvent.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'STR_CODE' : $("#STR_CODE").val()
				,	'SEARCH_WORD1' : $("#P_TEXT9_1").val()
				,	'SEARCH_WORD2' : $("#P_TEXT9_2").val()
				},
		success:function(data){
			gridApp18.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar18();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar18();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btn_comm_search10(){
	
	if(byteCheck($("#P_ORD_DT").val()) < 10){
		alert("주문일자는 필수 조회 조건입니다.");
		return;
	}
	
	//로딩바 출력
	showLoadingBar19();

	jQuery.ajax({ 
	    url:"/businessCallSelectSlip.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'CUST_NM' : $("#P_CUST_NM").val()
				,	'ORD_DT' : $("#P_ORD_DT").val()
				,	'STR_CODE' : $("#P_10_STR_CODE").val()
				,	'SLIP_NO' :$("#COMM_SLIP_NO10").val()
				},
		success:function(data){
			gridApp19.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar19();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar19();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btn_comm_search11(){
	
	/* if(byteCheck($("#P_TEXT11").val()) < 4){
		alert(msgCommonInput);
		return;
	} */
	
	//로딩바 출력
	showLoadingBar20();
	
	jQuery.ajax({ 
	    url:"/selectWmsInCategoryPop.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'SEARCH_WORD' : $("#P_TEXT11").val()
				},
		success:function(data){
			gridApp20.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar20();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar20();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btn_comm_search14(){
	
	//로딩바 출력
	showLoadingBar23();
	
	var B_EVT_TYPE = "2";
	
	jQuery.ajax({ 
	    url:"/selectBusinessCampaignCard.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'P_CARD_CODE' : $("#P_CARD_CODE").val()	
				,	'P_MBR_DSNT' : $("#P_MBR_DSNT").val()
				,	'B_EVT_TYPE' :$(":input:radio[name=P_CARD_PREFIX]:checked").val()
				},
		success:function(data){
			gridApp23.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar23();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar23();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}
function btn_comm_search15(){
	
	//로딩바 출력
	showLoadingBar24();
	
	jQuery.ajax({ 
	    url:"/selectBusinessCampaignCard.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'B_EVT_TYPE' : '2'
				},
		success:function(data){
			gridApp24.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar24();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar24();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btn_comm_search17(){
	
	//로딩바 출력
	showLoadingBar26();

	
	jQuery.ajax({ 
	    url:"/selectPresentEvent.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'SEARCH_WORD' : $("#P_TEXT17").val()
				},
		success:function(data){
			gridApp26.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar26();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar26();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function btn_comm_search18(){
	
	//로딩바 출력
	showLoadingBar27();

	
	jQuery.ajax({ 
	    url:"/selectGiftEvent.do",         
	    type:"POST",
		datatype:"json",
		data: {
					'SEARCH_WORD' : $("#P_TEXT18").val()
				},
		success:function(data){
			gridApp27.setData(data);
	    },
	    complete : function(data) {
	    	//로딩바 숨기기
	    	hideLoadingBar27();
	    },
	    error : function(xhr, status, error) {
	    	//로딩바 숨기기
	    	hideLoadingBar27();
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function call_back_card_14(){
	var selectorColumn = gridRoot23.getObjectById("selector");

	var selectedCard = selectorColumn.getSelectedIndices();

	if(selectedCard.length < 1){
		alert("카드사" + msgConfirm);
		return;
	}

	fn_comm_card_callback(selectedCard);

	$("#comm_pop_wrap14").dialog( "close" );	
}

function fnGetStrName(){
	// 점포명을 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getStrName.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:{P_STR_CODE : $("#P_STR_CODE").val()},
	    success : function(data) {
	    	var result = data.result;
			$("#STORE_NAME").val(result[0].STR_NAME);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function fnGetStrName_1(){
	// 점포명을 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getStrName.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:{P_STR_CODE : $("#P_STR_CODE").val()},
	    success : function(data) {
	    	var result = data.result;
			$("#STORE_NAME_1").val(result[0].STR_NAME);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//그리드 로딩바  보이기
function showLoadingBar17() {
    gridRoot17.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar17() {
	gridRoot17.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar18() {
    gridRoot18.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar18() {
	gridRoot18.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar19() {
    gridRoot19.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar19() {
	gridRoot19.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar20() {
    gridRoot20.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar20() {
	gridRoot20.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar23() {
    gridRoot23.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar23() {
	gridRoot23.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar24() {
    gridRoot24.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar24() {
	gridRoot24.removeLoadingBar();
}

//그리드 로딩바  보이기
function showLoadingBar26() {
    gridRoot26.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar26() {
	gridRoot26.removeLoadingBar();
}
	
//그리드 로딩바  보이기
function showLoadingBar27() {
    gridRoot27.addLoadingBar();
}
//그리드 로딩바  숨기기
function hideLoadingBar27() {
	gridRoot27.removeLoadingBar();
}
function hideLoadingBar28() {
	gridRoot28.removeLoadingBar();
}

//공통코드 상세 정보 팝업 닫기
function btn_comm_close(val){
	$("#comm_pop_wrap" + val).dialog( "close" );
}

 


function filterFunction(item) {
	var IN_SEARCH_LEN = $("#IN_SEARCH").val(); 
	if (IN_SEARCH_LEN.length == 0)
		return true;
	if ((item["ITM_NAME"]).toLowerCase().indexOf(IN_SEARCH_LEN.toLowerCase()) >= 0)
		return true;
	return false;
}

function runFilterFunction() {
	  
	var IN_SEARCH_GRID_ROOT  = $("#IN_SEARCH_GRID_ROOT").val();  
	 
	eval( IN_SEARCH_GRID_ROOT + ".setFilterFunction('filterFunction'); " );
//  	gridRoot16.setFilterFunction("filterFunction");

}


 
 

/* 추가 js */
//그리드 너비 제어
/*  $(document).ready(function (){
	
	var height = $(window).height() - 322;
	var height1 = $(window).height() - 560; // 10건 472;
	console.log(height1)
	
	$("#gridHolder10").height(height);
	$("#gridHolder11").height(height);
	$("#gridHolder12").height(height1);
	$("#gridHolder13").height(height);
	$("#gridHolder14").height(height1);
	$("#gridHolder15").height(height);
	$("#gridHolder16").height(height);
	$("#gridHolder17").height(height);
	$("#gridHolder18").height(height);
	$("#gridHolder19").height(height);
	$("#gridHolder20").height(height);
	$("#gridHolder21").height(height);
	$("#gridHolder22").height(height);
	$("#gridHolder23").height(height);
	$("#gridHolder24").height(height);
	$("#gridHolder25").height(height1);
	$("#gridHolder26").height(height);
	$("#gridHolder27").height(height);
}); */
 
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
</script>
	
	<div id="comm_pop_wrap1" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l">회원전체검색 팝업</h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search10">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="member"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT1" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM1" id="P_CALLBACK_NM1">
					<button type="button" class="search_btn" onclick="btn_comm_search('1')">검색 아이콘</button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="U">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('1')"><spring:message code="btnClose"/></button> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder10"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<div id="comm_pop_wrap2" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="productSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search11">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="product"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT2" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM2" id="P_CALLBACK_NM2">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('2')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="P">
					<!-- 	 결과내 재검색 시작  -->
					<input type="hidden" name="IN_SEARCH_GRID_ROOT"  id="IN_SEARCH_GRID_ROOT"  value="gridRoot11" /> 
					<input type="text" name="IN_SEARCH" id="IN_SEARCH" class="search_txt"  placeholder="결과 내 재검색">
					<button type="button" id="btn_read" class="search_btn"  onclick="runFilterFunction()"></button>
					
					<!-- <input type="radio" id="P_ENDIND_FLAG" name="P_ENDIND_FLAG"  onChange="chgEndInd('')"   value="" >전체
					<input type="radio" id="P_ENDIND_FLAG" name="P_ENDIND_FLAG"  onChange="chgEndInd('0,2')"  value="0,2"   checked="checked" >취급
					<input type="radio" id="P_ENDIND_FLAG" name="P_ENDIND_FLAG"  onChange="chgEndInd('1')"  value="1" >미취급
					<input type="radio" id="P_ENDIND_FLAG" name="P_ENDIND_FLAG"  onChange="chgEndInd('2')"  value="2" >발주중단 -->
					
					<!-- 	 결과내 재검색 끝  -->
					
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('2')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder11"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<div id="comm_pop_wrap3"  style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="supplySearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search12">
				<div class="last"> 
					<label><em>필수입력항목</em><spring:message code="supply"/></label>  
					<input type="text" name="P_TEXT" id="P_TEXT3" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM3" id="P_CALLBACK_NM3">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('3')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="S">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('3')"><spring:message code="btnClose"/></button> 				
					&nbsp;
					<input type="radio" id="SUPPLY_USE_YN" name="SUPPLY_USE_YN"  onChange="chgSupplyUseYn('')"   value="" >전체
					<input type="radio" id="SUPPLY_USE_YN" name="SUPPLY_USE_YN"  onChange="chgSupplyUseYn('Y')"  value="Y"   checked="checked" >사용
					<input type="radio" id="SUPPLY_USE_YN" name="SUPPLY_USE_YN"  onChange="chgSupplyUseYn('N')"  value="N" >미사용
					<!-- <input type="radio" id="SUPPLY_USE_YN" name="SUPPLY_USE_YN"  onChange="chgSupplyUseYn_new('')"   value="" >전체
					<input type="radio" id="SUPPLY_USE_YN" name="SUPPLY_USE_YN"  onChange="chgSupplyUseYn_new('Y')"  value="Y"   checked="checked" >사용
					<input type="radio" id="SUPPLY_USE_YN" name="SUPPLY_USE_YN"  onChange="chgSupplyUseYn_new('N')"  value="N" >미사용 -->
					
				</div>   
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder12"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	<div id="comm_pop_wrap3_2"  style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="supplySearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search12_2">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="supply"/></label>  
					<input type="text" name="P_TEXT" id="P_TEXT3_2" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM3_2" id="P_CALLBACK_NM3_2">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('3_2')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="S">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('3_2')"><spring:message code="btnClose"/></button> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder12_2"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<div id="comm_pop_wrap4" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="userSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search13">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="staff"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT4" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM4" id="P_CALLBACK_NM4">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('4')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="M">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('4')"><spring:message code="btnClose"/></button> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder13"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	
	<div id="comm_pop_wrap4_1" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l">배달사원 팝업</h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search13_1">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="staff"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT4_1" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM4_1" id="P_CALLBACK_NM4_1">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('4_1')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="M_1">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('4_1')"><spring:message code="btnClose"/></button> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder13_1"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	
	<div id="comm_pop_wrap5" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="deptSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search14">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="dept"/></label>
					<input type="text" name="P_TEXT" id="P_TEXT5" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM5" id="P_CALLBACK_NM5">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('5')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="D">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('5')"><spring:message code="btnClose"/></button> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder14"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<div id="comm_pop_wrap6" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="storeProductSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search15">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="storNm"/></label>
					<input type="text" name="STORE_NAME" id="STORE_NAME" class="search_txt" disabled="disabled">
					<label><spring:message code="product"/></label>
					<input type="text" name="P_TEXT" id="P_TEXT6" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM6" id="P_CALLBACK_NM6">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('6');"></button>
					 
					
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="R_1">
					
					<!-- 협력업체별 상품 검색 -->
					<input type="hidden" name="SET_VEN_CODE" id="SET_VEN_CODE"  >
					
					
					<!-- 	 결과내 재검색 시작  -->
<!-- 					<input type="hidden" name="IN_SEARCH_GRID_ROOT"  id="IN_SEARCH_GRID_ROOT"  value="gridRoot15" />  -->
<!-- 					<input type="text" 	 name="IN_SEARCH" id="IN_SEARCH" class="search_txt"  placeholder="결과 내 재검색"> -->
<!-- 					<button type="button" id="btn_read" class="search_btn"  onclick="runFilterFunction( )"></button> -->
					<!-- 	 결과내 재검색 끝  -->
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('6')"><spring:message code="btnClose"/></button>
					<input type="hidden" name="P_STR_CODE" id="P_STR_CODE" value="${sessionScope.STR_CODE}" /> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder15"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<div id="comm_pop_wrap6_1" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="storeProductSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search15_1">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="storNm"/></label>
					<input type="text" name="STORE_NAME" id="STORE_NAME_1" class="search_txt" disabled="disabled">
					<label><spring:message code="product"/></label>
					<input type="text" name="P_TEXT" id="P_TEXT6_1" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM6_1" id="P_CALLBACK_NM6_1">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('6_1');"></button>
					 
					
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="R">
					
					<!-- 협력업체별 상품 검색 -->
					<input type="hidden" name="SET_VEN_CODE" id="SET_VEN_CODE"  >
					
					
					<!-- 	 결과내 재검색 시작  -->
<!-- 					<input type="hidden" name="IN_SEARCH_GRID_ROOT"  id="IN_SEARCH_GRID_ROOT"  value="gridRoot15" />  -->
<!-- 					<input type="text" 	 name="IN_SEARCH" id="IN_SEARCH" class="search_txt"  placeholder="결과 내 재검색"> -->
<!-- 					<button type="button" id="btn_read" class="search_btn"  onclick="runFilterFunction( )"></button> -->
					<!-- 	 결과내 재검색 끝  -->
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('6_1')"><spring:message code="btnClose"/></button>
					<input type="hidden" name="P_STR_CODE" id="P_STR_CODE" value="${sessionScope.STR_CODE}" /> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder15_1"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<div id="comm_pop_wrap6_6" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="storeProductSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search15_6">
				<div class="last">
<%-- 					<label><em>필수입력항목</em><spring:message code="storNm"/></label> --%>
<!-- 					<input type="text" name="STORE_NAME" id="STORE_NAME" class="search_txt" disabled="disabled"> -->
					<label><spring:message code="product"/></label>
					<input type="text" name="P_TEXT" id="P_TEXT6_6" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM6_6" id="P_CALLBACK_NM6_6">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search6_6()"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="R_6">
					<!-- 	 결과내 재검색 시작  -->
<!-- 					<input type="hidden" name="IN_SEARCH_GRID_ROOT"  id="IN_SEARCH_GRID_ROOT"  value="gridRoot15" />  -->
<!-- 					<input type="text" 	 name="IN_SEARCH" id="IN_SEARCH" class="search_txt"  placeholder="결과 내 재검색"> -->
<!-- 					<button type="button" id="btn_read" class="search_btn"  onclick="runFilterFunction( )"></button> -->
					<!-- 	 결과내 재검색 끝  -->
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('6_6')"><spring:message code="btnClose"/></button>
					<input type="hidden" name="P_SELECTED_STR_CODE" id="P_SELECTED_STR_CODE" value="" /> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder15_6"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	
	<!-- 상품 구분별 상품조회  -->
	<div id="comm_pop_wrap7" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="productSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search16">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="product"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT7" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM7" id="P_CALLBACK_NM7"> 
					<input type="hidden" name="P_ITM_FORM"  id="P_ITM_FORM"    /> 	
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('7')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="ITM_FORM" >
					<!-- 	 결과내 재검색 시작  -->
<!-- 					<input type="hidden" name="IN_SEARCH_GRID_ROOT"  id="IN_SEARCH_GRID_ROOT"  value="gridRoot16" />  -->
<!-- 					<input type="text" name="IN_SEARCH" id="IN_SEARCH" class="search_txt"  placeholder="결과 내 재검색"> -->
<!-- 					<button type="button" id="btn_read" class="search_btn"  onclick="runFilterFunction()"></button> -->
					<!-- 	 결과내 재검색 끝  -->
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('7')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder16"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<!-- 주문상품검색 팝업  -->
	<div id="comm_pop_wrap8" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l">주문상품검색팝업</h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search17">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="product"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT8" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM8" id="P_CALLBACK_NM8"> 
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search8()"></button>
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('8')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder17"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>

	
	<!-- 행사 상품검색 팝업  -->
	<div id="comm_pop_wrap9" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l">행사상품검색팝업</h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search18">
				<div class="last">
				<label><spring:message code="itmName"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT9_2" class="search_txt" style="width:200px;">
					<label style="margin-left: 10px;"><spring:message code="eventName"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT9_1" class="search_txt" style="width:200px;">
					<input type="hidden" name="P_CALLBACK_NM9" id="P_CALLBACK_NM9"> 
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search9()"></button>
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('9')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder18"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<!-- 주문번호검색 팝업  -->
	<div id="comm_pop_wrap10" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l">주문번호검색팝업</h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search19">
				<div class="last">
					<em>필수입력항목</em><label>주문일자</label> 
					<input type="text" name="P_TEXT" id="P_ORD_DT" class="datepicker">
					<label>점포명</label> 
					<select id="P_10_STR_CODE" name="P_TEXT" class="wid2">
					</select>
					<label>주문번호</label> 
					<input type="text" name="P_TEXT" id="COMM_SLIP_NO10" class="search_txt" autofocus>
					<label>회원명</label> 
					<input type="text" name="P_TEXT" id="P_CUST_NM" class="search_txt" autofocus>
					<input type="hidden" name="P_CALLBACK_NM10" id="P_CALLBACK_NM10"> 
					<button type="button" id="btn_read" class="btn btn_style4 f_r"  onclick="btn_comm_search10()">조회</button>
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('10')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder19"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<!-- 소분류검색 팝업  -->
	<div id="comm_pop_wrap11" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l">소분류 Category 검색 팝업</h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search20">
				<div class="last">
					<label>분류명</label> 
					<input type="text" name="P_TEXT" id="P_TEXT11" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM11" id="P_CALLBACK_NM11"> 
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search11()">조회</button>
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('11')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder20"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	
	<!-- 묶음대표 상품 상품조회  -->
	<div id="comm_pop_wrap12" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="productSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search21">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="product"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT12" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM12" id="P_CALLBACK_NM12"> 
					<input type="hidden" name="P_ITM_FORM"  id="P_ITM_FORM"    /> 	
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('12')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="REPT_YN" >
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('12')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder21"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<!-- 점별 배송구분(ROUTE_GB)별 상품검색    -->
	<div id="comm_pop_wrap13" style="display:none;"     >
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="productSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search22">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="product"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT13" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM13" id="P_CALLBACK_NM13"> 
					<!--  아랫줄을 P_STR_CODE 로 하면 값이 안넘어감 왜그런지 몰라서 P_STR_CODE_CODE 로 변경해서 사용했음 -->
					<input type="hidden"   name="P_STR_CODE_CODE"  id="P_STR_CODE_CODE"    /> 
					<input type="hidden" name="P_ROUTE_GB"  id="P_ROUTE_GB"    /> 	
					<input type="hidden" name="P_VEN_CODE"  id="P_VEN_CODE"    /> 	
					<input type="hidden" name="P_PUR_GB"  id="P_PUR_GB"    /> 
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search13()"></button>
					<!-- 	 결과내 재검색 시작  -->
					<input type="hidden" name="IN_SEARCH_GRID_ROOT"  id="IN_SEARCH_GRID_ROOT"  value="gridRoot22" /> 
					<input type="text" name="IN_SEARCH" id="IN_SEARCH" class="search_txt"  placeholder="결과 내 재검색">
					<button type="button" id="btn_read" class="search_btn"  onclick="runFilterFunction()"></button>
					<!-- 	 결과내 재검색 끝  -->
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="ROUTE_GB" >
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('13')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder22"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<!-- 카드행사 카드 정보 조회    -->
	<div id="comm_pop_wrap14" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l">카드행사 카드 정보 조회</h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search23">
				<div class="last">
					<label><em>필수입력항목</em>카드사</label> 
					<input type="text" id="P_CARD_NAME" name="P_CARD_NAME" class="search_txt" disabled>
					<input type="hidden" id="P_CARD_CODE" name="P_CARD_CODE" disabled>
					<button type="button" id="btn_read" class="search_btn"  onclick="open_comm_pop_wrap15()"></button>
					<label><em>필수입력항목</em>카드명칭</label> 
					<input type="text" id="P_MBR_DSNT" name="P_MBR_DSNT">					
					<input type="radio" id="P_CARD_PREFIX_2" name="P_CARD_PREFIX" value="2">카드사
					<input type="radio" id="P_CARD_PREFIX_3" name="P_CARD_PREFIX" value="3">제휴사
					<input type="hidden" name="P_CALLBACK_NM14" id="P_CALLBACK_NM14">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_search14()"><spring:message code="btnSearch"/></button>
					<button type="button" class="btn btn_style4 f_r" onclick="call_back_card_14()"><spring:message code="btnSave"/></button>
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('14')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder23"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	<div id="comm_pop_wrap15" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l">카드사 조회</h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search24">
				<div class="last">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_search15()"><spring:message code="btnSearch"/></button>
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('15')"><spring:message code="btnClose"/></button>
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder24"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	<div id="comm_pop_wrap16" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="storePop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search25">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="store"/></label>
					<input type="text" name="P_TEXT" id="P_TEXT16" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM16" id="P_CALLBACK_NM16">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('16')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="CS">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('16')"><spring:message code="btnClose"/></button> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder25"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	<div id="comm_pop_wrap17" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="eventPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search26">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="eventName"/></label>
					<input type="text" name="P_TEXT" id="P_TEXT17" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM17" id="P_CALLBACK_NM17">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search17()"></button>
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('17')"><spring:message code="btnClose"/></button> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder26"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	<div id="comm_pop_wrap18" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="giftPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search27">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="eventName"/></label>
					<input type="text" name="P_TEXT" id="P_TEXT18" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM18" id="P_CALLBACK_NM18">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search18()"></button>
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('18')"><spring:message code="btnClose"/></button> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder27"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<div id="comm_pop_wrap19" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="storeProductSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search28">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="storNm"/></label>
					<input type="text" name="STORE_NAME" id="STORE_NAME" class="search_txt" disabled="disabled">
					<label><spring:message code="product"/></label>
					<input type="text" name="P_TEXT" id="P_TEXT19" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM19" id="P_CALLBACK_NM19">
					<button type="button" id="btn_read" class="search_btn"  onclick="btn_comm_search('19')"></button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="ORDER_R2">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('19')"><spring:message code="btnClose"/></button>
					<input type="hidden" name="P_STR_CODE" id="P_STR_CODE" value="${sessionScope.STR_CODE}" /> 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder28"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	
	<!-- 회원검색 팝업 -->
	<div id="comm_pop_wrap20" style="display:none;">
		<div id="pop_wrap">
			<header id="pop_head" class="clear">
				<h1 class="bul_arr f_l"><spring:message code="memberSearchPop"/></h1>
			</header>
			<!-- 조회폼 영역 -->
			<div class="search_area" id="top_search29">
				<div class="last">
					<label><em>필수입력항목</em><spring:message code="member"/></label> 
					<input type="text" name="P_TEXT" id="P_TEXT20" class="search_txt">
					<input type="hidden" name="P_CALLBACK_NM20" id="P_CALLBACK_NM20">
					<button type="button" class="search_btn" onclick="btn_comm_search('20')">검색 아이콘</button>
					<input type="hidden" name="P_FLAG" id="P_FLAG" value="Z">
					<button type="button" class="btn btn_style4 f_r" onclick="btn_comm_close('20')"><spring:message code="btnClose"/></button>
					<input type="radio" id="P_SUPPLY_USE_YN" name="P_SUPPLY_USE_YN"  value="" >전체
					<input type="radio" id="P_SUPPLY_USE_YN" name="P_SUPPLY_USE_YN"  value="Y"   checked="checked" >사용
					<input type="radio" id="P_SUPPLY_USE_YN" name="P_SUPPLY_USE_YN"  value="N" >미사용 				
				</div>
			</div>
			<!-- //조회폼 영역 -->
			<div class="col2 sub_cnt">
				<div class="sec_grid">
					<div class="content">
						<div id="gridHolder29"></div>
					</div>
				</div> 		 
			</div>
		</div>
		<!-- //Content : 본문 영역 -->
	</div>
	