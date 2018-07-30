<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8" %>
<!-- 스프링 메세지 테그사용 :: 다국어 -->
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%--
    파일명: inc_head.jsp
    설명:  공통으로 include 할 head 용 tag 들
    author  : 문희훈
    since   : 2016.10.25
    version : 1.0
--%>
    <title>㈜유맥유통 - 영업관리</title>  

	<!-- 기본 개발 프레임워크에는 무료버전의 JqGrid를 사용합니다. 유료 그리드 사용시, 그리드 컴포넌트 변경 작업 또는 JqGrid와 상용그리드를 병행 하여 사용하세요. -->
    <!-- <link rel="stylesheet" type="text/css" media="screen" href="/resources/css/ui.jqgrid.css" /> -->
    <script type="text/javascript" src="/resources/js/jquery-1.7.1.min.js" charset="utf-8"></script>
 	<script type="text/javascript" src="/resources/js/jquery-ui-1.10.3.custom.js" charset="utf-8"></script> 
    <script type="text/javascript" src="/resources/js/jquery.form.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="/resources/js/comCodeUtil.js" charset="utf-8"></script>
    <script type="text/javascript" src="/resources/js/comm.js" charset="utf-8"></script>
    <script type="text/javascript" src="/resources/js/common.js" charset="utf-8"></script>
    <script type="text/javascript" src="/resources/js/CommPopup.js" charset="utf-8"></script>
    <script type="text/javascript" src="/resources/js/vtrans.js" charset="utf-8"></script>
    <script type="text/javascript" src="/resources/js/datetime.js" charset="utf-8"></script>
    
    <!-- 달력을 사용하기위한 js/css -->
    <script type="text/javascript" src="/resources/js/jquery.ui-1.10.4.datepicker.min.js" charset="utf-8"></script> 
    <link rel="stylesheet"type="text/css"  href="/resources/js/jquery-ui.css">
    
    <!--  input 숫자와 콤마만 입력되게 하기 필수 include --> 
	<script type="text/javascript" src="/resources/js/jquery.number.js" charset="utf-8"></script>
	
	<!-- rMate 관련 유틸 모음 -->
	<script type="text/javascript" src="/resources/js/rMateUtil.js" charset="utf-8"></script>
	
    <!-- <script type="text/javascript" src="/resources/js/CommGrid.js" charset="utf-8"></script> -->
    <!-- <script type="text/javascript" src="/resources/js/jqgrid/i18n/grid.locale-kr.js" charset="utf-8"></script> -->
    <!-- <script type="text/javascript" src="/resources/js/jqgrid/jquery.jqGrid.src.js" charset="utf-8"></script> -->
    
    
    <script type="text/javascript">
    
    $(document).ready(function(){
    	
    	// IE 에서 BackSpace 키 방지 이벤트.   ( 입력컨트롤 제외 )
        $(document).keydown(function(e){   
            if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA"){   
                if(e.keyCode === 8){   
                return false;
                }
            }
        }); 
        window.history.forward(0);
    	
    	
    	$(document).keyup(function(e) {
	   		if (e.keyCode == 27) { 
	   		   if(typeof(gDialogComm) != "undefined") {
	   			   e.preventEvent();
	   			   gDialogComm.close();
	   		   }
	   		}
   		});
    	
    	var obj = {};
    	
    	var url = location.href;
		var arrUrl = url.split("/");
		//console.log(arrUrl[arrUrl.length - 1].split(".")[0]);
		obj.MENU_ID = arrUrl[arrUrl.length - 1].split(".")[0];
		var postData = JSON.stringify(obj);
		// console.log(postData);
    	
		$('input').on('keydown', function (e) {
    	    if (e.keyCode === 13) {
    	      e.preventDefault();
    	    }
    	});
    	
    });
    </script>
     <style type="text/css">
         .ui-jqgrid .ui-state-highlight { background: #FAED7D; }  
     </style>
     
<!-- 다국어 프로퍼티 변수와 스프링 메세지 사용을 위한  스크립트 전역 변수와의 맵핑을 위한 include -->
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_language.jsp" %>     
