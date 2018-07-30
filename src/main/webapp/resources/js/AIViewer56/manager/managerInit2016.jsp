<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.sql.*,java.io.*,java.lang.*,java.text.*,java.util.*,java.net.URL,javax.servlet.http.*"%>
<%@ page import="com.solbitech.common.web.*, com.activeintra.manager.*"%>
<%
try{
	AIScriptManager aiscript = new AIScriptManager(request, response, pageContext, out, null, null);
	WebInformation2016 information = new WebInformation2016(aiscript, request);
	information.getInitJsonMsg(out);
} catch (IOException e) {
	System.err.println("#manager IOException...");
} catch (NullPointerException e) {
	System.err.println("#manager NullPointerException...");
} catch(Exception e) {
	System.err.println("#manager Exception...");
} finally { }
%>