<%@ page language="java" contentType="image/png; charset=UTF-8"
    pageEncoding="utf-8" import="java.util.*, java.io.*, java.net.*" %>
    
<%@ page import="org.apache.log4j.Logger" %>
<%@ page import="org.apache.log4j.Logger" %>
<%@ page import="com.activeintra.manager.*"%>
    
<%!

    final Logger logger = Logger.getLogger("com.activeintra");

	private BufferedInputStream getImageFile(String filename) throws Exception {
		BufferedReader  reader = null;
		BufferedInputStream bis = null;
		try {
			bis = new BufferedInputStream(new FileInputStream(filename));
			
		} catch (Exception e) {
			logger.error("#9010 pngImagefile open error");
			throw new Exception(e);
		}
		finally{
			
		}
		
		return bis;
	}

%>

<%

    BufferedInputStream reader=null;
	try{
		AIScriptManager manager = new AIScriptManager(request, response, pageContext, out, logger, null);
		
		out.clear();
		out=pageContext.pushBody();
		String filename = request.getParameter("nameTag");

		if(filename==null){
			logger.error("#9020 parameter pass error: pngImagefilename not give......");
		}
		else{

            //시큐어 코딩 관련
            //특수문자열("../") 포함여부 체크
            //실제 의미없슴다.
            if(filename.contains("/") || filename.contains("\\") || filename.contains(".") || filename.contains("&")){
                String error=String.format("#9010 parameter bad : %s",filename);
                logger.error(error);
                throw new Exception(error);
            }


            //URLDecoding이 않된경우 처리
            try {
                if (filename.indexOf("+") == -1)
                    filename = URLDecoder.decode(filename, "UTF-8");

                filename = manager.getDecryptString(filename);
            }
            catch(NullPointerException e){
                logger.error("#9020 " + e);
                throw new Exception(e);
            }

			java.io.BufferedOutputStream outs = new java.io.BufferedOutputStream(response.getOutputStream());
			reader = getImageFile(filename);
			
			byte[] b = new byte[1024];
			
			int read = 0;
			while( (read = reader.read(b)) != -1){
			
				outs.write(b,0,read);	
			}
			
			outs.close();
			reader.close();
		}
	}
    catch(IOException e){
        logger.error("#9031 " + e);
    }
    catch(NullPointerException e){
        logger.error("#9032 " + e);
    }
	catch(Exception e){
		logger.error("#9033 " + e);
	}
	finally{
	    if(reader!=null){
            try{
                reader.close();
            }
            catch(Exception e){
                logger.error("#9040 " + e);
            }
        }
	}

%>
