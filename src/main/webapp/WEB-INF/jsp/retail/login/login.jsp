<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="retail.common.BaseEnv"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

 <jsp:include page="/WEB-INF/jsp/retail/inc_common/inc_head.jsp" /> 
 
<!DOCTYPE html>
<html lang="ko">
 <head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>㈜유맥유통</title>
  <link type="text/css" rel="stylesheet" href="/resources/css/common.css"><!-- css 파일 추가 -->
 <link type="text/css" rel="stylesheet" href="/resources/css/font-awesome.min.css"><!-- 아이콘 css 파일 추가 -->
 <!--[if lt IE 9]>
 <script src="/resources/js/html5shiv.js"></script>
 <script src="/resources/js/IE9.js"></script>
 <link type="text/css" rel="stylesheet" href="/resources/css/ie8.css">
 <![endif]-->
 
 <script type="text/javascript" src="/resources/js/style.js" charset="utf-8"></script><!-- 추가되는 js 파일 -->
</head>


<script type="text/javascript">
		
	$(document).ready(function () {
		$("#USER_ID").focus();
	
	});

	
	//IE9 버전을 체크하여, 9버전일경우 새로고침
	function getInternetExplorerVersion() {    
         var rv = -1; // Return value assumes failure.    
         if (navigator.appName == 'Microsoft Internet Explorer') {        
              var ua = navigator.userAgent;        
              var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
              if (re.exec(ua) != null)            
                  rv = parseFloat(RegExp.$1);    
             }    
         return rv; 
    }
	if(getInternetExplorerVersion() == 9){
		 var loc = location.search.split("=");
		  if(!(loc[0].substring(1) && loc[1] == 'yes')){
		   document.write("<meta id='refresh' http-equiv='refresh' content='0.1; URL=login.do?loop=yes'>");
		  } 
	}
	
	//로그인 요청 시작
	function login(){
		   
		if( $("#USER_ID").val()  == "" )
		{
			alert("아이디를 입력하세요.");
			 $("#USER_ID").focus();
			return;
		}
		if( $("#PASSWD_NO").val()  == "" )
		{
			alert("암호를 입력하세요.");
			 $("#PASSWD_NO").focus();
			return;
		}
		
		<!--로그인 정보 확인-->
		var form = document.getElementById("form1");
		$.ajax({
			url:"/login.do" ,
			type:"POST",
			datatype:"json",
			data:{ USER_ID: $("#USER_ID").val()   ,  PASSWD_NO :$("#PASSWD_NO").val() },
			beforeSend : function(xhr) {} ,
			success:function(data){  
				if(data.MESSAGE_CODE == "0000" ) {
					if($("#USER_ID").val() == $("#PASSWD_NO").val()){
						if (confirm("최초 로그인 입니다. \n비밀번호 변경을 하셔야 접속이 가능합니다.\n비밀번호를 변경 하시겠습니까?") == true){    //확인
							pwdInquiry_open();
						}else{   //취소
						    return;
						}
						return;
					}else{
						location.replace("/main.do");	
					}
				} else {
					alert("아이디 암호를 확인하세요.");
					location.replace("/"); 
				} 
			},
			error:function(x,e){
			}	 
		}); 
	}
	
	//엔터입력시 로그인 요청 
	function search_check(){
		login();
	}

	//팝업을 위한 쿠키 (추후 사용)
	function getCookie(cname) 
	{   var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	    } 
	    return "";
	}
	
	// 비밀번호찾기
	/* 초기 그리드 사이즈 조절 */
	function init() {
		
		$(function() {
			$("#pop_wrap").dialog({
			    autoOpen : false,
			    modal : true,
			    width : 400,
			    resizable : false
			});
		});
		//팝업 타이틀
		$("span.ui-dialog-title").text('비밀번호변경');
	}
	
	/* 비밀번호찾기 열기 */
	function pwdInquiry_open() {
		init();
		 $( '#pop_wrap' ).dialog( 'open' );	
		 $('#USERID').val('');
		 $('#PWD').val('');
	 	 $('#PWD_AFTER1').val('');
	 	 $('#PWD_AFTER2').val('');
	}
	
	
	//비밀번호 변경
	function changePwd(){
		validPwd();
	}

	 //비밃번호 유효성 체크 
	 function validPwd(){
		 
		 if($("#USERID").val()==""){
			 alert("아이디는 필수입력 항목입니다.");
			 $('#USERID').focus(); 
			 return false;
		 }
		 
		 var passWd1 = $("#PWD");
		 var passWd2 = $("#PWD_AFTER1");
		 var passWd3 = $("#PWD_AFTER2");
		 var str1 = passWd1.val();
		 var str2 = passWd2.val();
		 var str3 = passWd3.val();
		 
		 if(!checkPwd( $.trim(str2)) || !checkPwd( $.trim(str3))){ 

		 	alert('비밀번호를 확인하세요. \n(영문과 최소 1개의 특수문자를 포함한 8~20자 이내로 작성해야 합니다.)');    

		 	$('#PWD_AFTER1').val('');
		 	$('#PWD_AFTER2').val('');

		 	$('#PWD').focus(); 
		 
		 	return false;
		}; 
		 
		if(str2 == $("#USERID").val()){
				alert('비밀번호를 확인하세요. \n(아이디와 같은 암호를 사용할 수 없습니다.)');    
			 	$('#PWD_AFTER1').focus(); 
			 	return false;
		};  
		
		if(str1 == str2 ){
			alert('비밀번호를 확인하세요. \n(변경할 비밀번호는 현재 비밀번호와 달라야 합니다.)');    
		 	$('#PWD_AFTER1').focus(); 
		 	return false;
		}; 
		 
		if(str2 != str3){
			alert('비밀번호를 확인하세요. \n(변경할 비밀번호와 변경할 비밀번호 확인이 서로 다릅니다.)');    
		 	$('#PWD_AFTER1').focus(); 
		 	return false;
		}; 
		
		
		/**
		 * 비밀번호 변경
		 * 메세지 코드정의
		 * 0001 : 아이디가 존재하지 않음 
		 * 0002 : 아이디는 있으나 비밀번호입력 틀림
		 * 0000 : 아이디, 비밀번호가 모두 맞음 -> 비밀번호 변경처리
		 * */
		jQuery.ajax({ 
		    url:"/changeUserPassward.do",         
		    type:"POST",
			datatype:"json",
			async:false,
			data: {  USER_ID : $('#USERID').val(),
					    USER_PW : $('#PWD').val(),
					    USER_AFTER_PW : $('#PWD_AFTER1').val(),
					},
			success:function(data){  
				//아이디가 존재하면, 비밀번호 변경처리
				//alert(data.MSG_CODE);
				if(data.CUR[0].return_CODE == '0001'){
					alert("존재하지 않는 아이디 입니다.");
					$('#USERID').focus(); 
				}else if(data.CUR[0].return_CODE == '0002'){
					alert("현재 비밀번호가 맞지 않습니다.");
					$('#PWD').focus(); 
				}else if(data.CUR[0].return_CODE == '0000'){
					alert("비밀번호가 변경 되었습니다.");
					jQuery('#pop_wrap').dialog('close');
				}else{
					alert("오류가 발생했습니다. 관리자에게 문의하새요.");
					return;
				}
		    },
		    complete : function(data) {
		    },
		    error : function(xhr, status, error) {
		    	CommonJs.alertErrorStatus(xhr.status, error);   
		    }
		});
	 }
	 
	 
	 //비밀번호  유효성  정규식 체크 
	 function checkPwd(str){
		 //비밀번호 영문+숫자 조합 8자리이상 정규식
		 //var reg_pwd = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
		 
		 //조건1. 8~20 영문 대소문자
		//조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함
		 var reg_pwd = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-]).{8,20}$/;

		 if(!reg_pwd.test(str)){
	  		return false;
		 }else{
		 	return true;
		 }
	}
	
</script>
	
	
 <body id="loginArea"><!-- 아이디 추가 -->
	<!-- ========== header ========== -->
	<header id="loginHeader"><!-- 아이디 변경 -->
		<!-- <h1 class="logo f_l"><img src="/resources/img/ruckus/logo.png" width="82" height="25" alt="루커스 로고"></h1>
		<h2 class="title f_l">(주)유맥유통</h2> -->
	</header>
	<!-- ========== //header ========== -->

	<!-- ========== content ========== -->
	<div id="loginMain" class="login" role="main">
		<div class="login_cnt clear">
			<h2><img src="resources/img/common/logo.png" alt="유맥유통 로고"></h2>
			<img class="f_l "src="resources/img/common/login_img.jpg" alt="로그인 메인 이미지">
			<div class="well no-padding f_r">
				<form action="">
					<header>LOG IN</header>
					<fieldset>
						<section>
							<label class="label">아이디</label>
							<label class="input">
								<i class="icon-append fa fa-user"></i>
								<input type=text name="USER_ID" id ="USER_ID" maxlength="15" tabindex="1" value="retail" />
							</label>
						</section>
						<section>
							<label class="label">비밀번호</label>
							<label class="input">
								<i class="icon-append fa fa-lock"></i>
								<input type=password name="PASSWD_NO" id="PASSWD_NO" tabindex="2" maxlength="15" onKeyDown="javascript:if (event.keyCode == 13) search_check();" value="smart!@#$" />
						</section>
						<input type="button" onClick="login();" class="log_in" value="로그인" />
						<input type="button" onClick="pwdInquiry_open();" class="pwd_inquiry f_r"  value="비밀번호변경" />
					</fieldset>
				</form>
			</div>
			<address>Copyrights © 2016 umac. All Rights Reserved.</address>		
		</div>
	</div>	
	<!-- ========== //content ========== -->
		
	<!-- ========== footer ========== -->

	<!-- ========== //footer ========== -->
	
<!-- 	 비밀번호 변경 팝업 영역 시작  -->
<div id="pop_wrap">
	<form action="">
		<div id="pop_cnt">
			<table class="tbl_st2">
				<tbody>
					<tr>
						<th scope="row">아이디</th>   
						<td><input type="text"  id="USERID" name=""></td>
					</tr>
					<tr>
						<th scope="row">현재 비밀번호</th>   
						<td><input type="password"  id="PWD" name="PWD" maxlength="20"></td>
					</tr>
					<tr>
						<th scope="row">변경할 비밀번호</th>
						<td><input type="password" id="PWD_AFTER1" name="PWD_AFTER1" maxlength="20"></td>
					</tr>
					<tr>
						<th scope="row">변경할 비밀번호 확인</th>
						<td><input type="password" id="PWD_AFTER2" name="PWD_AFTER2" maxlength="20"></td>
					</tr>
				</tbody>
			</table>
			<br/><span>※ 비밀번호는 최소8자리 특수문자 1개이상을 포함해야 합니다.</span>
			<button type="button" class="btn btn_style4 pwd_change"onclick="changePwd()">변경</button> 
		</div>
	</form>
</div>
<!-- 	 상세 팝업 영역 끝  -->	

 </body>
</html>