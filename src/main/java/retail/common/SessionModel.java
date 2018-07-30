package retail.common;

 
public class SessionModel   {

	//기업코드
	private String CORP_CODE;
	
	//아이디
	private String userId;
	
	//성명
	private String userNm;
	
	 
	 
	
	// 핸드폰
	private String PHON_NO;
	
	// 이메일
	private String EMAIL_ACCNT; 
	  
	private String AUTH_SEARCH;
	private String AUTH_NEW;
	private String AUTH_SAVE;
	private String AUTH_DELETE;
	private String AUTH_EXCEL_DOWN;
	private String AUTH_EXCEL_UPLOAD;
	private String AUTH_PRINT;
	private String AUTH_SUBMIT;
	private String AUTH_CREATE;
	
	private String ROLE_ID;
	private String GROUP_CODE;
	private String STR_CODE;
	private String STR_NAME;
	private String DEPT_CODE;
	private String POSITION;
	private String EMP_DUTY;
	private String SYS_CODE;
	private String LIMIT_LEVEL;
	
	
	 
	public String getSTR_NAME() {
		return STR_NAME;
	}
	public void setSTR_NAME(String sTR_NAME) {
		STR_NAME = sTR_NAME;
	}
	public String getROLE_ID() {
		return ROLE_ID;
	}
	public void setROLE_ID(String rOLE_ID) {
		ROLE_ID = rOLE_ID;
	}
	public String getCORP_CODE() {
		return CORP_CODE;
	}
	public void setCORP_CODE(String cORP_CODE) {
		CORP_CODE = cORP_CODE;
	}
	public String getUserId() {
		return userId; 		
	} 
	public void setUserId(String value) {
		this.userId = value; 
	}
	 
	public String getUserNm() {
		return userNm; 		
	} 
	public void setUserNm(String value) {
		this.userNm = value; 
	}
 
	
	public String getPHON_NO()
	{
		return this.PHON_NO;
	}
	
	public void setPHON_NO(String pPHON_NO)
	{
		this.PHON_NO = pPHON_NO;
	}
	
	public String getEMAIL_ACCNT()
	{
		return this.EMAIL_ACCNT;
	}
	
	public void setEMAIL_ACCNT(String pEMAIL_ACCNT)
	{
		this.EMAIL_ACCNT = pEMAIL_ACCNT;
	}
	public String getAUTH_SEARCH() {
		return AUTH_SEARCH;
	}
	public void setAUTH_SEARCH(String aUTH_SEARCH) {
		AUTH_SEARCH = aUTH_SEARCH;
	}
	public String getAUTH_NEW() {
		return AUTH_NEW;
	}
	public void setAUTH_NEW(String aUTH_NEW) {
		AUTH_NEW = aUTH_NEW;
	}
	public String getAUTH_SAVE() {
		return AUTH_SAVE;
	}
	public void setAUTH_SAVE(String aUTH_SAVE) {
		AUTH_SAVE = aUTH_SAVE;
	}
	public String getAUTH_DELETE() {
		return AUTH_DELETE;
	}
	public void setAUTH_DELETE(String aUTH_DELETE) {
		AUTH_DELETE = aUTH_DELETE;
	}
	public String getAUTH_EXCEL_DOWN() {
		return AUTH_EXCEL_DOWN;
	}
	public void setAUTH_EXCEL_DOWN(String aUTH_EXCEL_DOWN) {
		AUTH_EXCEL_DOWN = aUTH_EXCEL_DOWN;
	}
	public String getAUTH_EXCEL_UPLOAD() {
		return AUTH_EXCEL_UPLOAD;
	}
	public void setAUTH_EXCEL_UPLOAD(String aUTH_EXCEL_UPLOAD) {
		AUTH_EXCEL_UPLOAD = aUTH_EXCEL_UPLOAD;
	}
	public String getAUTH_PRINT() {
		return AUTH_PRINT;
	}
	public void setAUTH_PRINT(String aUTH_PRINT) {
		AUTH_PRINT = aUTH_PRINT;
	}
	public String getAUTH_SUBMIT() {
		return AUTH_SUBMIT;
	}
	public void setAUTH_SUBMIT(String aUTH_SUBMIT) {
		AUTH_SUBMIT = aUTH_SUBMIT;
	}
	public String getAUTH_CREATE() {
		return AUTH_CREATE;
	}
	public void setAUTH_CREATE(String aUTH_CREATE) {
		AUTH_CREATE = aUTH_CREATE;
	}
	public String getGROUP_CODE() {
		return GROUP_CODE;
	}
	public void setGROUP_CODE(String gROUP_CODE) {
		GROUP_CODE = gROUP_CODE;
	}
	public String getSTR_CODE() {
		return STR_CODE;
	}
	public void setSTR_CODE(String sTR_CODE) {
		STR_CODE = sTR_CODE;
	}
	public String getDEPT_CODE() {
		return DEPT_CODE;
	}
	public void setDEPT_CODE(String dEPT_CODE) {
		DEPT_CODE = dEPT_CODE;
	}
	public String getPOSITION() {
		return POSITION;
	}
	public void setPOSITION(String pOSITION) {
		POSITION = pOSITION;
	}
	public String getEMP_DUTY() {
		return EMP_DUTY;
	}
	public void setEMP_DUTY(String eMP_DUTY) {
		EMP_DUTY = eMP_DUTY;
	}
	public String getSYS_CODE() {
		return SYS_CODE;
	}
	public void setSYS_CODE(String sYS_CODE) {
		SYS_CODE = sYS_CODE;
	}
	public String getLIMIT_LEVEL() {
		return LIMIT_LEVEL;
	}
	public void setLIMIT_LEVEL(String lIMIT_LEVEL) {
		LIMIT_LEVEL = lIMIT_LEVEL;
	}
	
}
