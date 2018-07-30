<%@ page language="java" import="java.sql.*,java.io.*,java.lang.*,java.text.*,java.net.*,java.util.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.activeintra.manager.*" %>
<%@ page import="org.apache.log4j.Logger" %>

<%

    final Logger logger = Logger.getLogger("com.activeintra");

    try {
        AIScriptManager manager = new AIScriptManager(request, response, pageContext, out, logger, null);
        if (manager.init()) {

            HttpParameterDecoder decoder = HttpParameterDecoder.newInstance(request, application);
            request.setAttribute("paramsDecoder", decoder);
            if (decoder != null)
                manager.reqres.setParameterDecoder(decoder);

            Enumeration keys = AIScriptManager.aiProps.propertyNames();
            while (keys.hasMoreElements()) {

                String key = (String) keys.nextElement();
                String value = AIScriptManager.aiProps.getProperties(key);
                manager.reqres.setParam(key, value);

            }

            manager.setParam(manager.reqres.getParameterB("reportParams"));
            String reportMode = manager.reqres.getParameterB("reportMode");
            String reportParams = manager.reqres.getParameterB("reportParams");
            String filename = manager.reqres.getParameterB("fname");
            String pageNum = manager.reqres.getParameterB("page");

            if (reportMode != null) {
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

            manager.reportFilename = filename;
            manager.reportFile = new ReportFile(manager, filename);
            manager.reportFile.readReport();

            if (reportMode.equals("PDF")) {
                manager.setType(2);
            } else if (reportMode.equals("EXCEL")) {
                manager.setType(3);
            } else if (reportMode.equals("WINDOWPRINT")) {
                manager.setType(15);
            } else if (reportMode.equals("AR5")) {
                manager.setType(99);
            } else {
                manager.setType(1);
            }

            manager.close();
        }
    }
    catch(Throwable t){
        logger.error("#9010 " + t.toString());
        throw (new AIException(t.toString(), t.getCause()));
    }

%>