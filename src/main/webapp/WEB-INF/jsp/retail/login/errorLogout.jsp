<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>  
<%@include file="/WEB-INF/jsp/retail/inc_common/inc_language.jsp" %>

<% session.invalidate(); %>                        <!-- 세션 정보 제거 --> 

<script>
alert(msgErrorLogout);
location.href="login.do";                                    <!-- 로그아웃 페이지로 이동 -->
</script>
          