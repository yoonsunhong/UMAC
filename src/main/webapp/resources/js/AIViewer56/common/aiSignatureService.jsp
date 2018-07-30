<%@ page contentType="text/plain; charset=utf-8" %>
<%@ page language="java" %>
<%@ page import="java.io.*, java.net.*, java.util.*, java.sql.*" %>
<%@ page import="com.activeintra.manager.*" %>
<%@ page import="org.apache.log4j.Logger" %>

<%!
	final private Logger logger = Logger.getLogger("com.activeintra");

    //임시화일등을 저장하기 위한 경로로 사용가능한 디렉토리.
    //(현재 사용자 권한에 따른 문제점등을 피하기 위해 "java.io.tmpdir" 시스템 property 경로를 사용)
    //private static final File tmpDir = new File(System.getProperty("java.io.tmpdir"));
    private File imgDir; // 전자서명이미지의 저장경로(dir)

    private static final String DATE_FILENAME_FORMAT = "yyyyMMdd-HHmmss";
    // java.text.SimpleDateFormat은 스레딩환경에서는 사용할 수 없음
    private static final FastDateFormat dateFilenameFormat = // thread-safe
                                FastDateFormat.getInstance(DATE_FILENAME_FORMAT, null, null);
    
    
    //private AIScriptManager manager;
    //private String frames=null;
    //private ArrayList<String> aaa;

    public void jspInit() {
    	
    	/*
        ServletContext context = getServletConfig().getServletContext();
        String contextRoot = context.getRealPath("/");
        if (contextRoot == null) { // war로 배치되어 물리적인 dir(파일)의 사용이 불가능한 경우
        	
            // this서블릿(전자서명기능)이 서비스되지 않게 함
            throw new RuntimeException("Unable to create file");
        }
		*/
		
		
		
		/*
		//String contextRoot=AIScriptManager.aiURL.getImagePath();
		String contextRoot="/log/";
        imgDir = new File(contextRoot, "signature-images");
        if (!imgDir.exists()) {
            boolean success = imgDir.mkdirs(); // SecurityExp.
            if (!success) throw new RuntimeException("Failed to create image directory");
        }
        */
        
        
    }

    /**
     * InputStream으로부터 가능한 모든 데이타를 읽어 return한다.
     * return하기전 input stream을 close한다.
     */
    private byte[] readStreamAll(InputStream in) throws IOException {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream(1024);
            final int capa = 512;
            byte[] data = new byte[capa];
            BufferedInputStream bin = new BufferedInputStream(in, capa);
            int reads;
            while ((reads = bin.read(data, 0, capa)) != -1) {
                out.write(data, 0, reads);
            }

            return out.toByteArray();
        } finally {
            in.close();
        }
    }

    /**
     * 백업화일명 등에 적용할 현재시간 문자열을 생성함.
     * (이 값으로는 유일성이 보장되지 않으므로 보고서ID prefix등을 적절히 혼용해야 함)
     *
     * @return [yyyyMMdd-HHmmss]형식으로 포맷팅된 시간 문자열.
     */
    private String currDateFilenameStr() {
        return (dateFilenameFormat.format(new java.util.Date()));
    }
%>

<%
	String contextRoot=AIScriptManager.aiURL.getImagePath();
    imgDir = new File(contextRoot, "signature-images");
    if (!imgDir.exists()) {
        boolean success = imgDir.mkdirs(); // SecurityExp.
        if (!success) throw new RuntimeException("Failed to create image directory");
    }
      
    byte[] base64 = readStreamAll(request.getInputStream()); // (input)closed when return
    byte[] imgData = Base64.decode(base64); // B64스트링을 원래의 binary로 디코딩

    // java 1.5이상인 경우에는 아래대신 UUID로 간단히 화일명을 생성할 수 있음
    // Unique한 empty화일 생성
    String namePart = "img_" + currDateFilenameStr();
    File result = new File(imgDir, namePart + ".png");
    // createNewFile() : 새로생성된 경우에만 true임 (시스템동기화가 보장되는 operation)
    for (int i = 1; !result.createNewFile(); i++) {
        result = new File(imgDir, namePart + "_" + i + ".png");
    }
    File pngFile = result;

	//File pngFile = new File(imgDir, "aireport-sign.png");
    // empty화일에 이미지데이타를 write (통상 3-5 KB size)
    BufferedOutputStream bout = null;
    try {
        // FileNotFo~ (dir, not exists but cannot be created, or cannot opened)
        bout = new BufferedOutputStream(new FileOutputStream(pngFile), 1024); // 버퍼크기
        bout.write(imgData);
        bout.flush();
    } finally {
        if (bout != null) bout.close();
    }

    base64 = imgData = null;
    String imgPath = pngFile.getPath(); // 절대경로
    
    logger.debug("@6010 " + imgPath);
%>