<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="utf-8" import="java.util.*, java.io.*, java.net.*" %>
<%@ page import="org.apache.log4j.Logger" %>
<%@ page import="com.activeintra.manager.*"%>

<%!

	final Logger logger = Logger.getLogger("com.activeintra");

    /*
    private String browserSearchString[] = {
            "Android",
            "rv:11.0","MSIE",
            "IEMobile",
            "Chrome",
            "Firefox",
            "Firefox/3.5 Maemo",
            "Safari",
            "Mobile Safari/530","Mobile/5A347 Safari/5","Mobile/3A101a Safari/419","Mobile/7B367 Safari/531","Mobile/8B117 Safari/6531",
            "J2ME/MIDP","Opera/8.0","Opera/9","Opera/9.80"
    };
    */

	private BufferedInputStream getPdfFile(String filename) throws Exception {
		BufferedInputStream bis = null;
		try {
			bis = new BufferedInputStream(new FileInputStream(filename));
			
		}
        catch(IOException e){
            logger.error("#9011 " + e);
        }
        catch(NullPointerException e){
            logger.error("#9012 " + e);
        }
        catch (Exception e) {
			logger.error("#9013 pdffile open error");
			logger.error("#9020 " + e);
			throw new Exception(e);
		}
		finally{
			
		}
		
		return bis;
	}

	public byte[] readStreamAll(InputStream in){
	       
		ByteArrayOutputStream out = new ByteArrayOutputStream(1024);
        final int capa = 512;
        byte[] data = new byte[capa];
        BufferedInputStream bin = new BufferedInputStream(in, capa);
        int reads;
        try {
			while ((reads = bin.read(data, 0, capa)) != -1) {
				out.write(data, 0, reads);
			}
		} catch (IOException e) {
			logger.error("#9030 " + e);
		}
		finally{
			
		}
        return out.toByteArray();
    }

%>

<%
	try {
		AIScriptManager manager = new AIScriptManager(request, response, pageContext, out, logger, null);

        /*
		charSet=AIScriptManager.aiProps.getProperties("charSetEncoding");
         
		if(charSet==null)
			charSet="8859_1";
		*/

		String reportFlag=request.getParameter("reportFlag");
        String requestMethod=request.getMethod();
		if(requestMethod==null)
			requestMethod="GET";
		
        if(reportFlag==null)
            reportFlag="";
		if(!reportFlag.equals("pdfserversave")){
			
			out.clear();
			out=pageContext.pushBody();
		}

		String filename = request.getParameter("nameTag");
		if(filename==null){
		
			filename = request.getParameter("key");
            //시큐어 코딩 관련
            //특수문자열("../") 포함여부 체크
            //실제 의미없슴다.
            if(filename.contains("/") || filename.contains("\\") || filename.contains(".") || filename.contains("&")){
                String error=String.format("#9091 parameter bad : %s",filename);
                logger.error(error);
                throw new Exception(error);
            }

            //URLDecoding이 않된경우 처리
            try {
                if (filename.indexOf("+") == -1)
                    filename = URLDecoder.decode(filename, "UTF-8");
            }
            catch(NullPointerException e){
                logger.error("#9040 " + e);
            }

			String reportUrl = manager.getReportUrl(filename);

            String domainName=AIScriptManager.aiProps.getProperties("domainName");
            String ipAddress=AIScriptManager.aiProps.getProperties("ipAddress");
            if(domainName!=null && ipAddress!=null)
                reportUrl=reportUrl.replace(domainName,ipAddress);

			//logger.error("#9040 " + "reportUrl " + reportUrl);

            String splitUrl[]=reportUrl.split("/");
            StringBuilder realUrl= new StringBuilder();
            for(int i=3; i<splitUrl.length; i++){
                realUrl.append("/");
                realUrl.append(splitUrl[i]);
            }

            if(AIScriptManager.aiProps.getProperties("domainNameToLocalIpAddress") !=null &&
                    AIScriptManager.aiProps.getProperties("domainNameToLocalIpAddress").equals("false")){
                    reportUrl=reportUrl.replace("https","http");
            }
            else{
                String ipAddr = "http://" +  "127.0.0.1:" + request.getLocalPort();
                reportUrl = ipAddr + realUrl;
            }

            /*
            //dispatcher.forward구간 시작
            String parameter = manager.getReportParameters(filename, "UTF-8");

            System.out.println(parameter);

            ServletContext context = pageContext.getServletContext();
            String contextName=context.getContext(realUrl.toString()).getContextPath();

            //url에서 context name를 삭제함
            String forwardUrl = null;
            if(!contextName.equals("/")){
                forwardUrl = realUrl.toString().replaceFirst(contextName, "");
            }
            else
                forwardUrl = realUrl.toString();

            if(requestMethod.equals("POST"))
                forwardUrl=forwardUrl+"?"+parameter;
            RequestDispatcher dispatcher = request.getRequestDispatcher(forwardUrl);
            dispatcher.forward(request, response);
            //dispatcher.forward구간 end
            */

            //logger.error(reportUrl);
            //urlConnection구간 시작
			HttpURLConnection conn;
			conn = (HttpURLConnection) new URL(reportUrl).openConnection();
			if(!requestMethod.toUpperCase().equals("GET"))
				conn.setRequestMethod("POST");
			else
				conn.setRequestMethod("GET");

            String userAgent=request.getHeader("user-agent");

            //********************************************************************
            /*
            boolean headerChk=false;
            for(String browser : browserSearchString){
                if(userAgent.indexOf(browser)!=-1){
                    headerChk=true;
                    break;
                }
            }
            if(!headerChk){
                logger.error("#8888 " + "invalid user-agent ");
                logger.error("#8889 " + "user-agent=" + userAgent);

                response.setContentType("text/html; charset=UTF-8");
                BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
                outs.write("#8888 invalid user-agent ...\n".getBytes("utf-8"));
                outs.write(String.format("#8889 user-agent=%s",userAgent).getBytes("utf-8"));
                outs.flush();
                outs.close();

                return;
            }
            */
            //********************************************************************

			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=" + "utf-8");
			conn.setRequestProperty("user-agent", userAgent);
		
			conn.setUseCaches(false);
			conn.setDoOutput(true);
			conn.setDoInput(true);
			
			if(request.getCookies()!=null){
				
				Iterator<Cookie> iHeader = java.util.Arrays.asList(
						request.getCookies()).iterator();
 
				StringBuilder buf = new StringBuilder();
				while (iHeader.hasNext()) {
	
					Cookie cookie = iHeader.next();
	     
					if (!cookie.getValue().equals("")) {
						buf.append(cookie.getName());
						buf.append("=");
						buf.append(cookie.getValue());
						buf.append("; ");
					}
				}
			
				conn.setRequestProperty("Cookie", buf.toString());
					
			}
			
			if(!requestMethod.toUpperCase().equals("GET")){
				
				String parameter = manager.getReportParameters(filename, "UTF-8");
				PrintWriter pw=new PrintWriter(new OutputStreamWriter(conn.getOutputStream(),"utf-8"));
				
				pw.write(parameter);
				pw.flush();
				pw.close();

				//logger.error("#9050 " + "parameter " + parameter);
				
			}


			int resultCode = conn.getResponseCode();
			if (resultCode != 200) { // 보고서 호출 결과가 성공이 아닌 경우
				logger.error("#9060 " + "url request responded with code[" + resultCode + "]");
                logger.error("#9061 " + "url=[" + reportUrl + "]");

                response.setContentType("text/html; charset=UTF-8");
                BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
                outs.write("#9060 변환중 에라가 발생하였습니다...\n".getBytes("utf-8"));
                outs.write(String.format("error code : %d",resultCode).getBytes("utf-8"));
                outs.flush();
                outs.close();

				return;
			}

			if(!reportFlag.equals("pdfserversave")){

				String headerString=conn.getHeaderField("Content-Disposition");
                if(headerString==null || headerString.equals("")){
                    logger.error("#9091 " + "headerString no value...");
                    return;
                }

                //외부 입력값의 null 여부를 체크하고, 해더값이 두 개로 나누어 지는 것을 방지하기
                //위해 replaceAll()을 이용하여 개행문자를 제거합니다.
                headerString=headerString.replaceAll("\r","").replaceAll("\n","");

				response.setContentType(conn.getContentType());
                String result="success";
                if(conn.getContentType().indexOf("text/html")!=-1)
                    result="fail";
                else
                    response.setHeader("Content-Disposition",headerString);

                //Cookie cookie = new Cookie("fileDownloadToken", result);
                //cookie.setMaxAge(60*60*24);                // 쿠키 유지 기간 - 1일
                //cookie.setPath("/");                       // 모든 경로에서 접근 가능하도록
                //cookie.setHttpOnly(false);
                //response.addCookie(cookie);

                String cookieValue="fileDownloadToken=" + result + "; Path=/";
                response.setHeader("Set-Cookie",cookieValue);

                java.io.BufferedOutputStream outs = new java.io.BufferedOutputStream(response.getOutputStream());
				
				byte[] data=readStreamAll(conn.getInputStream());
                response.setContentLength(data.length);

				outs.write(data);
				outs.flush();
				outs.close();

			}
			else{
				String data=new String(readStreamAll(conn.getInputStream()),"utf-8");
				out.print(data);
			}
			//urlConnection구간 end

			return;
			
		}

        //URLDecoding이 않된경우 처리
        if(filename.indexOf("+") == -1)
            filename=URLDecoder.decode(filename, "UTF-8");

        //시큐어 코딩 관련
        //특수문자열("../") 포함여부 체크
        //실제 의미없슴다.
        if(filename.contains("/") || filename.contains("\\") || filename.contains(".") || filename.contains("&")){
            String error=String.format("#9091 parameter bad : %s",filename);
            logger.error(error);
            throw new Exception(error);
        }

		filename=manager.getDecryptString(filename);
		//logger.error("#9099 " +filename);

        //String headerString = "attachment; filename=" + filename;
        //response.setHeader("Content-Disposition", headerString);
		response.setContentType("application/pdf");
		java.io.BufferedOutputStream outs = new java.io.BufferedOutputStream(response.getOutputStream());
		BufferedInputStream reader = getPdfFile(filename);
		
		byte[] b = new byte[1024];
		
		int read = 0;
		while( (read = reader.read(b)) != -1){
		
			outs.write(b,0,read);	
		}
		
		outs.close();
        
		reader.close();
	
	}
    catch(IOException e){
        logger.error("#9997 " + e);
    }
    catch(NullPointerException e){
        logger.error("#9998 " + e);
    }
	catch(Exception e){
		logger.error("#9999 " + e);
	}
	finally{
	
	}
	

%>
