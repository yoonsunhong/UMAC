package retail.common;

import javax.servlet.ServletContext;

import net.winis.common.config.ConfigReader;

public class BaseEnv {
	
	
	/*********************************** 시스템 관련 ******************************************/
	/** 시스템 이름 */
	public static final String SYSTEM_NAME = "리테일 JAVA 시스템";
	
	
	/*********************************** 세션환경정보  관련 ******************************************/
	/** 세션환경정보 속성이름  */
	public static final String PROP_ENV = "env";
	
	/** BaseEnv singleton */
	private static BaseEnv baseEnv;
	 
	/** BaseEnv 반환 */
	public static BaseEnv get(ServletContext context) {
		if(baseEnv == null) {
			baseEnv = new BaseEnv(context.getRealPath("/WEB-INF/properties/env.properties"));
		}		
		return baseEnv;
	}
	
	
	/*********************************** 파일 저장 PATH 관련 ******************************************/
	/**   파일이 들어갈 루트  */
	public static final String ROOT_FILE = "C:\\UMAC_FILE";  
 
	 
	/** temporary 파일 저장경로 */
	public static final String FILE_PATH_TEMP   = ROOT_FILE + "\\temp_file\\";
	
	
	/*********************************** 파일 저장 설정 관련 ******************************************/
	/** 업로드 파일 메모리 크기 (메모리 사용영역 한계용량 ) : 1MB */
	public static final Integer FILE_SIZE_THRESHOLD = 1024*1024*1;
	
	/** 업로드 파일 크기 제한 : 10MB */
	public static final Integer FILE_SIZE = 1024*1024*10;
	 
	
	
	
	/** 외부로부터 요청시 session 체크를 피하기 위해 사용 */
	public static final String OUTSIDE_CHANNAL = "outSideChannal"; 
	
	/** 접근 허용체널 리스트 */
	public static final String[] CHANNAL_LIST = {"channal1", "channal2"};
	 
	/** 속성파일 loader */
	private ConfigReader configReader;
	
	
	/** 생성자 - singleton */
	private BaseEnv(String configureFilename) {
		configReader = new ConfigReader(configureFilename);
	}
	
	/** SSL 사용여부 */
	public boolean isSSL() {
		return "true".equals(configReader.getProperties().get("ssl"));
	}
	
	public String goodsImageHost() {
		return configReader.getProperties().get("goods_image_host").toString();
	}
	
}
