<%@ page language="java" import="java.sql.*,java.io.*,java.lang.*,java.text.*,java.net.*,java.util.*" %>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="com.activeintra.manager.*" %>
<%@ page import="org.apache.log4j.Logger" %>
<%@ page import="org.jdom.*" %>
<%@ page import="com.activeintra.chartdirector.ParseXml" %>

<%

    final Logger logger = Logger.getLogger("com.activeintra");

    try{

        out.clear();
        out=pageContext.pushBody();

        AIScriptManager manager = new AIScriptManager(request, response, pageContext, out, logger, null);
        if(manager.init()){
            //AIReport.properties에서 각종 option을 읽어 AIreqres객체의 각종member에 해당 값을 setting.
            Enumeration keys=AIScriptManager.aiProps.propertyNames();
            while(keys.hasMoreElements()){

                String key=(String)keys.nextElement();
                String value=AIScriptManager.aiProps.getProperties(key);
                manager.reqres.setParam(key,value);

            }

            AR5toAI converter = new AR5toAI(pageContext,request,response,logger, manager.reqres);
            converter.convert();
        }
        else{
            throw new Exception("manager init error");
        }

    }
    catch(NullPointerException e){
        logger.error("#9991" + e);
    }
    catch(IOException e){
        logger.error("#9992" + e);
    }
    catch(Exception e){
        logger.error("#999" + e);
    }
    finally{

    }

%>