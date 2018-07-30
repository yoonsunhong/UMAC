<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.sql.*,java.io.*,java.lang.*,java.text.*,java.util.*,java.net.URL,javax.servlet.http.*"%>
<%@ page import="com.solbitech.common.web.*, com.activeintra.manager.*"%>
<%
try{
	AIScriptManager aiscript = new AIScriptManager(request, response, pageContext, out, null, null);
	WebManager2016 manager = new WebManager2016(request, response, aiscript, pageContext, session);
	manager.getDrowWeb(out);
} catch (IOException e) {
	System.err.println("#manager IOException...");
} catch (NullPointerException e) {
	System.err.println("#manager NullPointerException...");
} catch(Exception e) {
	System.err.println("#manager Exception...");
}
%>