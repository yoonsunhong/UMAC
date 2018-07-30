package retail.product.category.service;

import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("serial") 
public class ProductCategoryVO  extends WisModelData {
	
	private String CORP_CODE;		//기업코드
	private String LRG_CODE;			//대분류코드
	private String MID_CODE;			//중분류코드
	private String CLS_CODE;			//소분류코드
	private String LRG_NAME;			//대분류명칭
	private String MID_NAME;			//중분류명칭
	private String CLS_NAME;			//소분류명칭
	private String ITM_GB;				//상품구분
	private String ITM_GB_NM;		//상품구분명
	private String IEMP_NO;			//등록사원번호
	private String IDATE;				//등록일자
	private String UEMP_NO;			//수정사원번호
	private String UDATE;				//수정일시
	private String EMP_PWD;			//관리사원번호
	private String EMP_NAME;			//관리사원명
	private String EMP_NO;			//관리사원번호
	private String RN;					//순번
	private String RETURN_CODE;	//결과코드
	private String RETURN_MESSAGE;		//결과메시지
	
	
	public String getCORP_CODE() {
		return CORP_CODE;
	}
	public void setCORP_CODE(String cORP_CODE) {
		CORP_CODE = cORP_CODE;
	}
	public String getLRG_CODE() {
		return LRG_CODE;
	}
	public void setLRG_CODE(String lRG_CODE) {
		LRG_CODE = lRG_CODE;
	}
	public String getMID_CODE() {
		return MID_CODE;
	}
	public void setMID_CODE(String mID_CODE) {
		MID_CODE = mID_CODE;
	}
	public String getCLS_CODE() {
		return CLS_CODE;
	}
	public void setCLS_CODE(String cLS_CODE) {
		CLS_CODE = cLS_CODE;
	}
	public String getLRG_NAME() {
		return LRG_NAME;
	}
	public void setLRG_NAME(String lRG_NAME) {
		LRG_NAME = lRG_NAME;
	}
	public String getMID_NAME() {
		return MID_NAME;
	}
	public void setMID_NAME(String mID_NAME) {
		MID_NAME = mID_NAME;
	}
	public String getCLS_NAME() {
		return CLS_NAME;
	}
	public void setCLS_NAME(String cLS_NAME) {
		CLS_NAME = cLS_NAME;
	}
	public String getITM_GB() {
		return ITM_GB;
	}
	public void setITM_GB(String iTM_GB) {
		ITM_GB = iTM_GB;
	}
	public String getIEMP_NO() {
		return IEMP_NO;
	}
	public void setIEMP_NO(String iEMP_NO) {
		IEMP_NO = iEMP_NO;
	}
	public String getIDATE() {
		return IDATE;
	}
	public void setIDATE(String iDATE) {
		IDATE = iDATE;
	}
	public String getUEMP_NO() {
		return UEMP_NO;
	}
	public void setUEMP_NO(String uEMP_NO) {
		UEMP_NO = uEMP_NO;
	}
	public String getUDATE() {
		return UDATE;
	}
	public void setUDATE(String uDATE) {
		UDATE = uDATE;
	}
	public String getEMP_PWD() {
		return EMP_PWD;
	}
	public void setEMP_PWD(String eMP_PWD) {
		EMP_PWD = eMP_PWD;
	}
	public String getEMP_NAME() {
		return EMP_NAME;
	}
	public void setEMP_NAME(String eMP_NAME) {
		EMP_NAME = eMP_NAME;
	}
	public String getITM_GB_NM() {
		return ITM_GB_NM;
	}
	public void setITM_GB_NM(String iTM_GB_NM) {
		ITM_GB_NM = iTM_GB_NM;
	}
	public String getRN() {
		return RN;
	}
	public void setRN(String rN) {
		RN = rN;
	}
	public String getRETURN_CODE() {
		return RETURN_CODE;
	}
	public void setRETURN_CODE(String rETURN_CODE) {
		RETURN_CODE = rETURN_CODE;
	}
	public String getRETURN_MESSAGE() {
		return RETURN_MESSAGE;
	}
	public void setRETURN_MESSAGE(String rETURN_MSG) {
		RETURN_MESSAGE = rETURN_MSG;
	}
	public String getEMP_NO() {
		return EMP_NO;
	}
	public void setEMP_NO(String eMP_NO) {
		EMP_NO = eMP_NO;
	}
	
	
	

}
