package retail.common.service; 
import retail.common.BaseVO;

/**
 * @project	UMAC 공통
 * @file	CommVO.java
 * @comment 업체 , 공통코드 등의  공통 VO
 * <pre>
 * </pre>
 *
 * @author	권용욱
 * @since	2016. 10. 07.
 */
@SuppressWarnings("serial")
public class CommVO extends BaseVO {
	
	 
	public String getCD_CL(){
		return get("CD_CL");
	}
	 
	public void setCD_CL(String value){
		set("CD_CL", value);
	}
	 
	public String getCD_NM(){
		return get("CD_NM");
	}
	 
	public void setCD_NM(String value){
		set("CD_NM", value);
	}
	public String getCD_ID(){
		return get("CD_ID");
	}
	 
	public void setCD_ID(String value){
		set("CD_ID", value);
	}
	
	 
	 
	public String  CORP_CODE;



	public String getCORP_CODE() {
		return CORP_CODE;
	}

	public void setCORP_CODE(String cORP_CODE) {
		CORP_CODE = cORP_CODE;
	}
	
	
	
	
}
