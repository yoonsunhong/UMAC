package retail.common;

public class EgovWebUtil {
    public static String clearXSSMinimum(String value) {
        if (value == null || value.trim().equals("")) {
	    return "";
	}
        
        value = value.replaceAll("&", "&amp;");
        value = value.replaceAll("<", "&lt;");
	value = value.replaceAll(">", "&gt;");
	value = value.replaceAll("\"", "&#34;");
	value = value.replaceAll("\'", "&#39;");
	return value;
    }
    
    public static String clearXSSMaximum(String value) {
	value = clearXSSMinimum(value);
	
	value = value.replaceAll("%00", null);
	
	value = value.replaceAll("%", "&#37;");
	
	//	\\. => .
	
	value = value.replaceAll("\\.\\./", "");	//	../
	value = value.replaceAll("\\.\\.\\\\", "");	//	..\
	value = value.replaceAll("\\./", "");		//	./
	value = value.replaceAll("%2F", "");
	
	return value;
    }
    
    public static String filePathBlackList(String value) {
	if (value == null || value.trim().equals("")) {
	    return "";
	}
	
	value = value.replaceAll("\\.\\./", "");	// ../
	value = value.replaceAll("\\.\\.\\\\", "");	// ..\
	
	return value;
    }
    
    /**
     * 행안부 보안취약점 점검 조치 방안.
     * 
     * @param value
     * @return
     */
    public static String filePathReplaceAll(String value) {
	if (value == null || value.trim().equals("")) {
	    return "";
	}
	
	value = value.replaceAll("/", "");
	value = value.replaceAll("\\", "");
	value = value.replaceAll("\\.\\.", "");	// ..
	value = value.replaceAll("&", "");
        
        return value;
    }
    
    public static String filePathWhiteList(String value) {
	return value;
    }
    
    /*
    public static void main(String[] args) {
	String test = null;
	
	test = "<script language='javascript' encoding=\"utf-8\">q&a</script>";
	System.out.println("clearXSSMinimum() Test");
	System.out.println(test);
	System.out.println("=>");
	System.out.println(clearXSSMinimum(test));
	System.out.println();
	
	test = "/a/b/c../..\\";
	System.out.println("clearXSSMaximum() Test");
	System.out.println(test);
	System.out.println(" =>");
	System.out.println(clearXSSMaximum(test));
	System.out.println();
	
	test = "/a/b/c/../../../..\\..\\";
	System.out.println("filePathBlackList() Test");
	System.out.println(test);
	System.out.println("=>");
	System.out.println(filePathBlackList(test));
	System.out.println();
    }
    //*/
}
