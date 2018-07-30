<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java" import="java.sql.*,java.io.*,java.lang.*,java.text.*,java.util.*,java.net.URL.*,java.net.URLEncoder" %>
<%@ page import="com.solbitech.common.web.*" %>
<%
try {
	WebLoginSession2016 webSession = new WebLoginSession2016(request, response, pageContext, session);
	webSession.setLoginView(out);
} catch (IOException e) {
	System.err.println("#manager IOException...");
} catch (NullPointerException e) {
	System.err.println("#manager NullPointerException...");
} catch(Exception e) {
	System.err.println("#manager Exception...");
} finally { }
%>