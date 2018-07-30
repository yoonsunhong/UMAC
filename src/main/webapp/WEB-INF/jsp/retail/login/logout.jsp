<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>  

<% session.invalidate(); %>                        <!-- 세션 정보 제거 --> 

<script>
alert("로그아웃 되었습니다.");
location.href="login.do";                                    <!-- 로그아웃 페이지로 이동 -->
</script>
          