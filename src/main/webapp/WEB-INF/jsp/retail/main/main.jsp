<%@ page language="java"   contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_common.jsp" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!-- 스프링 메세지 테그사용 :: 다국어 -->
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@page import ="java.util.List" %>
<%@page import ="java.util.HashMap" %>
<%@page import ="java.util.ArrayList" %>
<%@page import ="java.util.List" %>
<%@page import ="retail.main.service.MainVO" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="사이트에 대한 설명">
<meta name="keywords" content="키워드, 태그">
<title>㈜유맥유통 - 영업관리</title>
<link type="text/css" rel="stylesheet" href="/resources/css/common.css">
<link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css">
<!--[if lt IE 9]>
<script src="/resources/js/html5shiv.js"></script>
<script src="/resources/js/IE9.js"></script>
<link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
<![endif]-->

<jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" />
<%  
  List<MainVO> getBigMenu = (List<MainVO>)request.getAttribute("getBigMenu");
%>


<script type="text/javascript" src="/resources/js/jquery-1.7.1.min.js" charset="utf-8"></script>
<script type="text/javascript" src="/resources/js/jquery.cookie.js" charset="utf-8"></script>    
<script type="text/javascript" src="/resources/js/tabs.js" charset="utf-8"></script>
<script type="text/javascript" src="/resources/js/style.js" charset="utf-8"></script>
<script type="text/javascript">
		//폴딩을 위한 전역변수
		var tType = 'O';
		//다국어 디폴트 언어 전역변수
		var languge = 'ko';
		$(document).ready(function () { 
			
			
			// 대메뉴 클릭시 포커스 토글
		    $('#gnb li').click(function() {		
		        $('#gnb li').removeClass('on');
		        $(this).addClass('on');
		    });
			
			
		  /*최초 탭 열기(기본화면 : tabs.js에 함수가 있음)
		  	파라미터 : 클래스패스, URL
		  */
		  Tabs_Onload('mainContents','mainContents.do');
			
		});
		 
		
		// 레프트 메뉴 생성
		function  getMiddleMenu(menu_id, menu_nm) 
		{ 
			
			$.ajaxSetup({ cache: false });
			$.ajax({
				url      : "/getMiddleMenu.do",
				cache: false,
				type     : "POST",
				datatype : "json",
				async    : "false",
				data     : { 'MENU_ID' : menu_id },
				success  : function(data, textStatus) { 
						/* 레프트 메뉴 그리기 신규 버전 시작*/
						var getMiddleMenuDiv = "";
						getMiddleMenuDiv += "<h2>"+menu_nm+"</h2>";
						getMiddleMenuDiv += '<ul class="left_menu">';
						
						if(data.length > 0){
							getMiddleMenuDiv += '<li>';
						}
						
						var prevMenuGubun = "0";						
						for(var i = 0; i < data.length; i++){
							
							if(data[i].MENU_GB == "2" && prevMenuGubun == "0"){
								getMiddleMenuDiv += '<a href="#">' + data[i].MENU_NM + '</a>';
							}
							else if(data[i].MENU_GB == "2" && prevMenuGubun == "2"){
								getMiddleMenuDiv += '</li><li><a href="#">' + data[i].MENU_NM + '</a>';
							}
							else if(data[i].MENU_GB == "2" && prevMenuGubun == "3"){
								getMiddleMenuDiv += '</ul>';
								getMiddleMenuDiv += '</li>';
								getMiddleMenuDiv += '<li>';
								getMiddleMenuDiv += '<a href="#">' + data[i].MENU_NM + '</a>';
							}
							else if(data[i].MENU_GB == "3" && prevMenuGubun == "2"){
								getMiddleMenuDiv += '<ul>';
								getMiddleMenuDiv +=  '<li id="'+data[i].CLASS_NM.split('.')[0]+'"><a href="javascript:Tabs_On(\''+data[i].CLASS_NM +'\' ,  \''+data[i].MENU_NM+'\' ,  \''+data[i].CLASS_NM+'\',\'true\' );">'+data[i].MENU_NM+"</a></li>" ;
							}
							else if(data[i].MENU_GB == "3" && prevMenuGubun == "3"){
								getMiddleMenuDiv +=  '<li id="'+data[i].CLASS_NM.split('.')[0]+'"><a href="javascript:Tabs_On(\''+data[i].CLASS_NM+'\' ,  \''+data[i].MENU_NM+'\' ,  \''+data[i].CLASS_NM+'\',\'true\' );">'+data[i].MENU_NM+"</a></li>" ;
							}
							
							if(i == data.length-1 && data[i].MENU_GB  == "2"){
								getMiddleMenuDiv += '</li>';
							}else if(i == data.length-1 && data[i].MENU_GB  == "3"){
								getMiddleMenuDiv += '</ul></li>';
							}
							prevMenuGubun = data[i].MENU_GB;
						}
						
						getMiddleMenuDiv += '</ul>';
						$("#getMiddleMenuDiv").html( getMiddleMenuDiv );
						scrollMenu();
						
						$(".left_menu").height( $(window).height() - 102 );
						
						$(window).on('resize',function  () {
							$(".left_menu").height( $(window).height() - 102 );
						});
						 
				},
				error:function(x,e){
					CommonJs.alertErrorStatus(xhr.status, error);
				}	 
			});
			    
		}
		
		
		
		// 즐겨찾기 레프트 메뉴 생성 
		function  getBookMarkMenu(menu_nm) { 
			
			var param = "";
			
			$.ajaxSetup({ cache: false });
			$.ajax({
				url      : "/getBookMarkMenu.do",
				cache: false,
				type     : "POST",
				datatype : "json",
				async    : "false",
				data     : { 'param' :  param},
				success  : function(data) { 
					/* 레프트 메뉴 그리기 시작 */	 
				    var getMiddleMenuDiv = "<h2>"+menu_nm+"</h2>"; 
				   	getMiddleMenuDiv +="<ul  class='favorite'>";
				   	
				   	for(var i = 0; i < data.length; i++){
				   		
				   		
				   		/**
				   		 * 함수명 : bookMarkAdd(?,?,?)
				   		 * 즐겨찾기 추가/삭제
				   		 * 파라미터 정보 (?,?,?)
				   		 * 1, 프로그램 ID (URL) 
				   		 * 2. 즐겨찾기 등록, 삭제여부 (Y : 등록 , N: 삭제), 
				   		 * 3.즐겨찾기 대메뉴 호출여부 (즐겨찾기면 N, 아니면 Y)
				   		 * 
				   		 */
				   		getMiddleMenuDiv +=  '<li><a href="#" onclick="Tabs_On(\''+data[i].PROGRAM_ID+'\' ,  \''+data[i].PROGRAM_NM+'\' ,  \''+data[i].PROGRAM_ID+'\',\'true\' );">'+data[i].PROGRAM_NM+'</a><button type="button" class="fav_ico" onclick="bookMarkAdd(\''+data[i].PROGRAM_ID+'\',\'N\',\'N\' )"></button></li>' ;
				   		
				   	}
					getMiddleMenuDiv += "</ul>";
					$("#getMiddleMenuDiv").html( getMiddleMenuDiv );
					
					//hover event설정
					bookMarkMenu();
					
					//스크롤 영역 설정
					$(".left_menu, .favorite").height( $(window).height() - 110 );
					/* 레프트 메뉴 그리기 끝 */
						 
				},
				error:function(x,e){
					CommonJs.alertErrorStatus(xhr.status, error);
				}	 
			});
			    
		}

		//로그아웃 처리
		function logOut()
		{ 
			window.location = "/logout.do";
			//window.location = '/';
		}
		
		
		//폴딩 토글
		function togle(){
			if(tType == 'O') {tType='C'}
			else if(tType == 'C') {tType='O';}
			$('#wrap').toggleClass('folded');
		}

		
		/**
		*다국어 설정 변경을 위한 Script 시작
		**/
		//다국어 설정
		function changeLocation(location){
				Language = location.value;
				if(location.value !=""){
					window.location ="/location/changLang.do?lang="+location.value;	
				}
		} 
		
		//다국어 셀렉트 박스 셀렉트
		$(document).ready(function () {
			//alert(getQuerystring('lang'));
			if(typeof getQuerystring('lang') == 'undefined'){
				//최초 로그인시 디폴트 랭귀지 설정
				$("#selectLanguage").val(languge);	
			}else{
				//사용자가 선택 했을때 변경
				$("#selectLanguage").val(getQuerystring('lang'));
			}
		});
		
		//url의 파라미터 값 가지고 오기
		function getQuerystring(paramName){

			var _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제
			var _tempArray = _tempUrl.split('&'); // '&'을 기준으로 분리하기
			
			for(var i = 0; _tempArray.length; i++) {
				if(typeof _tempArray[i] != 'undefined'){
					var _keyValuePair = _tempArray[i].split('='); // '=' 을 기준으로 분리하기
					
					if(_keyValuePair[0] == paramName){ // _keyValuePair[0] : 파라미터 명
						// _keyValuePair[1] : 파라미터 값
						
						return _keyValuePair[1];
					}	
				}else{
					return _keyValuePair[1];
				}
			}
		}
		//alert(getQuerystring('lang'));
		/**
		*다국어 설정 변경을 위한 Script 끝
		**/
		
		//로고 클릭 이벤트
		function goHome(){
			
			$(location).attr('href','main.do');
			
		}
</script>

</head>
<body>
<div id="wrap">
    <!-- header -->
    <header id="header">
		<h1 class="logo f_l">
			<a href="#" onclick="goHome()">
				<img src="resources/img/common/logo.jpg" alt="유맥유통 로고">
			</a>
		</h1>
		<nav id="gnb" class="f_l"> 
			<ul>
				<!-- 대 메뉴 출력 -->
				<% for(MainVO menu : getBigMenu) { %>
				     
					<li id ="<%=menu.getMENU_ID()%>"><a href="javascript:getMiddleMenu('<%=menu.getMENU_ID()  %>','<%=menu.getMENU_NM()  %>')"><%=menu.getMENU_NM()  %></a></li>
				
				<% } %> 
				<li id="A1000"><a href="javascript:getBookMarkMenu('즐겨찾기')">즐겨찾기</a></li>
			</ul>
		</nav>
    </header> 
	<hr>
    <!-- //header -->
    <!-- container -->
    <div id="container">
		<!-- snb -->
		<nav id="snb"  class="f_l p_r">
				<!-- <div id="menuLeft"> -->
				<div id="getMiddleMenuDiv">
					<!-- <h2>Menu</h2> 
						   <ul class="favorite">
								<li><a href="#">메뉴명 01</a><button type="button" class="fav_ico"></button></li>
								<li><a href="#">메뉴명 02</a><button type="button" class="fav_ico"></button></li>
								<li><a href="#">메뉴명 03</a><button type="button" class="fav_ico"></button></li>
								<li><a href="#">메뉴명 04</a><button type="button" class="fav_ico"></button></li>
								<li><a href="#">메뉴명 05</a><button type="button" class="fav_ico"></button></li>
								<li><a href="#">메뉴명 06</a><button type="button" class="fav_ico"></button></li>
							</ul> -->
					
					<!-- 즐겨찾기 시작 -->
					<!-- 					
					<h2>Menu</h2>
					<ul class="favorite">
						<li><a href="#">메뉴명 01</a><a href="#" >메뉴명 01</a><a></li>
						<li><a href="#">메뉴명 02</a></li>
						<li><a href="#">메뉴명 03</a></li>
						<li><a href="#">메뉴명 04</a></li>
						<li><a href="#">메뉴명 05</a></li>
						<li><a href="#">메뉴명 06</a></li>
					</ul>
					 -->
					<!-- 즐겨찾기 끝 -->
				</div>
				<button type="button" class="btn_fold"></button> 
		</nav>
		
		<div id="content"  class="f_l">	
			<div class="top_log f_r">
				<span class="user_name"><%=getEnv().getUserNm() %></span>님 환영합니다.
				<a href="javascript:logOut();" class="btn_head">로그아웃</a>	 
				<span>다국어</span>
				<select id="selectLanguage" onchange="changeLocation(this)">
					<option value="">선택</option>Tabs_Onload('mainContents','mainContents.do');
					<option value="ko">한국어</option>
					<option value="en">English</option>
				</select>
			</div>
			<div id="tabs" class="tab_st1 f_l">
				<!-- 상단 탭 -->
				<ul id="main_tab"></ul>
				<!-- //상단 탭 -->
				<!-- 탭 내용 -->
				<div id="frame_box" class="frame_box">
					<iframe id="frame0"  class="DivHide"src="" title="frame0"></iframe>
					<iframe id="frame1"  class="DivHide"src="" title="frame1"></iframe>
					<iframe id="frame2"  class="DivHide"src="" title="frame2"></iframe>
					<iframe id="frame3"  class="DivHide"src="" title="frame3"></iframe>
					<iframe id="frame4"  class="DivHide"src="" title="frame4"></iframe>
					<iframe id="frame5"  class="DivHide"src="" title="frame5"></iframe>
					<iframe id="frame6"  class="DivHide"src="" title="frame6"></iframe>
					<iframe id="frame7"  class="DivHide"src="" title="frame7"></iframe>
					<iframe id="frame8"  class="DivHide"src="" title="frame8"></iframe>
				</div>
			</div>
			<!-- //탭 내용 -->
		</div>
		<!-- //Content : 본문 영역 -->
    </div>
    <!-- //container -->
    
    <!-- 탭기능을 위한 셋팅 시작-->
    <input type="hidden" id="hdnFrameCount" value="0" title="" />
    <input type="hidden" id="hdnMenuCode" value="0" title=""/>   <!-- 첫로딩시 왼쪽트리에 뿌려줄 대메뉴의 라지코드  -->
    <input type="hidden" id="hdnActiveId" title="" />
    <!-- 탭기능을 위한 셋팅 끝-->
    
</div>
</body>

<script language="javascript">
	//최초 로그인 시 상단메뉴 포커스
	$('#A100').addClass( "on" );
	//최초 로그인시 나와야 할 메뉴 셋팅
	//레프트메뉴 생성
	getMiddleMenu('A100','기준정보');
</script> 
</html>