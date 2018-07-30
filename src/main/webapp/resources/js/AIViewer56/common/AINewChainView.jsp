<%@ page language="java" import="java.sql.*,java.io.*,java.lang.*,java.text.*,java.net.*,java.util.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.activeintra.manager.*" %>
<%@ page import="org.apache.log4j.Logger" %>

<%
    //out.clear();
    //out=pageContext.pushBody();

    final Logger logger = Logger.getLogger("com.activeintra");

    try{

        AIScriptManager manager = new AIScriptManager(request, response, pageContext, out, logger, null);
        if(manager.init()){

            if (AIScriptManager.aiProps.getProperties("AES128parameter") != null) {
                HttpParameterDecoder decoder = HttpParameterDecoder.newInstance(request, application);
                request.setAttribute("paramsDecoder", decoder);
                if (decoder != null)
                    manager.reqres.setParameterDecoder(decoder);
            }

            //AIReport.properties에서 각종 option을 읽어 AIreqres객체의 각종member에 해당 값을 setting.
            Enumeration keys=AIScriptManager.aiProps.propertyNames();
            while(keys.hasMoreElements()){

                String key=(String)keys.nextElement();
                String value=AIScriptManager.aiProps.getProperties(key);
                manager.reqres.setParam(key,value);

            }
            manager.setParam(manager.reqres.getParameterB("chainReportParams"));
            String reportMode = manager.reqres.getParameter("reportMode");
            String reportParams = manager.reqres.getParameter("reportParams");

            if(reportMode!=null) {
                if (reportMode.equals("PDF")) {
                    if (reportParams == null || reportParams.toLowerCase().indexOf("pdfserversave:true") == -1) {
                        out.clear();
                        out = pageContext.pushBody();
                    }
                } else if (reportMode.equals("EXCEL")) {
                    if (reportParams == null || reportParams.toLowerCase().indexOf("excelserversave:true") == -1) {
                        out.clear();
                        out = pageContext.pushBody();
                    }
                } else if (reportMode.equals("AR5")) {
                    out.clear();
                    out = pageContext.pushBody();
                }
            }

            AR5toAI converter = new AR5toAI(pageContext,request,response,out,logger, manager.reqres);
            converter.convert();
        }
        else{
            throw new Exception("manager init error");
        }

    }
    catch(Exception e){
        logger.error("#9999 " + e);
    }
    finally{

    }

%>