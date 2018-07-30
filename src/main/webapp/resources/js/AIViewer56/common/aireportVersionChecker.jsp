<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/plain; charset=utf-8" %>

<%@ page import="com.activeintra.manager.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>

<%
    String info;
    if (designerVersion == null) {
        info =  "0";
    } else {
        info = designerVersion;
        if (designerSetupPath != null) {
            info = info + ';' + designerSetupPath;
        }
    }

    response.setHeader("AIReport-designerVersionInfo", info);
    out.println(info);
%>

<%!
    private String designerVersion;
    private String designerSetupPath;

    public void jspInit() {
        if (AIScriptManager.aiProps != null) {
            designerVersion = AIScriptManager.aiProps.getProperties("designerVersion");
            designerSetupPath = AIScriptManager.aiProps.getProperties("designerSetupPath");
        } else {
            ServletContext context = getServletConfig().getServletContext();
            InputStream in = findResourceStream("/WEB-INF/", "AIReport.properties", context);
            if (in != null) {
                Properties props = new Properties();
                try {
                    props.load(in);
                    designerVersion = props.getProperty("designerVersion");
                    designerSetupPath = props.getProperty("designerSetupPath");
                } catch (IOException e) {
                } finally {
                    try { in.close(); } catch (IOException e) {}
                }
            }
        }
    }

    private InputStream findResourceStream(String startDir, String fileName,
                                           ServletContext context) {
        Set<String> dir = context.getResourcePaths(startDir);
        if (dir == null) return null; // empty

        List<String> list = new ArrayList<String>(dir.size());
        for (String path : dir) {
            if (path.endsWith(fileName)) {
                return (context.getResourceAsStream(path));
            }
            if (path.charAt(path.length()-1) == '/') { // 디렉토리 by API spec.
                list.add(path);
            }
        }

        for (String subDir : list) {
            InputStream in = findResourceStream(subDir, fileName, context);
            if (in != null) return in;
        }

        return null;
    }
%>