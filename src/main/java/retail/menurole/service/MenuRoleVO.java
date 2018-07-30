package retail.menurole.service;

import java.util.List;

import retail.common.BaseVO;


@SuppressWarnings("serial")
public class MenuRoleVO extends BaseVO {

	/*********************************************************************************************************************************
	 * * 변수 선언 
	 *********************************************************************************************************************************/
	private String CORP_CODE;
	private String ROLE_ID;
	private String ROLE_NM;
	private String ROLE_DC;
	private String REG_INFO;
	private String UPD_INFO;
	private String USE_YN;
	private String DEL_YN;
	
	private String MENU_NM;
	private String BIGO;
	private String MENU_ID;
	
	private String REG_ID;
	private String REG_IP;
	
	private String UPD_IP;
	private String UPD_ID;
	
	private String USE_COUNT;
	
	private List ARRAY_DATA;
	
	
	private String AUTH_SEARCH;
	private String AUTH_NEW;
	private String AUTH_SAVE;
	private String AUTH_DELETE;
	private String AUTH_EXCEL_DOWN;
	private String AUTH_EXCEL_UPLOAD;
	private String AUTH_PRINT;
	private String AUTH_SUBMIT;
	private String AUTH_CREATE;
	
	private String RETURN_CODE;
	private String RETURN_MESSAGE;
	
	/*********************************************************************************************************************************/
	
	
	
	
	



	/*********************************************************************************************************************************
	 * * Getter
	 *********************************************************************************************************************************/
	
	public String getROLE_ID() 
	{
		return this.ROLE_ID;
	}
	
	public String getCORP_CODE() {
		return CORP_CODE;
	}

	public void setCORP_CODE(String cORP_CODE) {
		CORP_CODE = cORP_CODE;
	}

	public String getDEL_YN() {
		return DEL_YN;
	}

	public String getROLE_NM()
	{
		return this.ROLE_NM;
	}
	
	public String getROLE_DC()
	{
		return this.ROLE_DC;
	}
	
	public String getREG_INFO()
	{
		return this.REG_INFO;
	}
	
	public String getUPD_INFO()
	{
		return this.UPD_INFO;
	}
	
	public String getUSE_YN() 
	{
		return this.USE_YN; 
	}
	
	public String getMENU_NM()
	{
		return this.MENU_NM;
	}
	
	public String getBIGO()
	{
		return this.BIGO;
	}
	
	public String getMENU_ID()
	{
		return this.MENU_ID;
	}
	
	public String getREG_IP()
	{
		return this.REG_IP;
	}
	
	public String getREG_ID() {
		return REG_ID;
	}
	
	
	public String getUPD_IP() {
		return UPD_IP;
	}
	
	public String getUPD_ID() {
		return UPD_ID;
	}
	
	public String getUSE_COUNT() {
		return this.USE_COUNT;
	}
	
	public String setDEL_YN() {
		return this.DEL_YN;
	}
	
	public List getARRAY_DATA() {
		return ARRAY_DATA;
	}
	

	
	/*********************************************************************************************************************************/
	
	
	
	
	

	

	


	/*********************************************************************************************************************************
	 * * Setter
	 *********************************************************************************************************************************/
	
	public void setROLE_ID(String pROLE_ID)
	{
		this.ROLE_ID = pROLE_ID;
	}
	
	public void setROLE_NM(String pROLE_NM)
	{
		this.ROLE_NM = pROLE_NM;
	}
	
	public void setROLE_DC(String pROLE_DC)
	{
		this.ROLE_DC = pROLE_DC;
	}
	
	public void setREG_INFO(String pREG_INFO)
	{
		this.REG_INFO = pREG_INFO;
	}
	
	public void setUPD_INFO(String pUPD_INFO)
	{
		this.UPD_INFO = pUPD_INFO;
	}
	
	public void setUSE_YN(String pUSE_YN) 
	{
		this.USE_YN = pUSE_YN;
	}
	
	public void setMENU_NM(String pMENU_NM)
	{
		this.MENU_NM = pMENU_NM;
	}
	
	public void setBIGO(String pBIGO)
	{
		this.BIGO = pBIGO;
	}
	
	public void setMENU_ID(String pMENU_ID)
	{
		this.MENU_ID = pMENU_ID;
	}
	
	public void setREG_IP(String pREG_IP)
	{
		this.REG_IP = pREG_IP;
	}
	
	public void setREG_ID(String rEG_ID) {
		REG_ID = rEG_ID;
	}
	
	public void setUPD_IP(String uPD_IP) {
		UPD_IP = uPD_IP;
	}

	public void setUPD_ID(String uPD_ID) {
		UPD_ID = uPD_ID;
	}
	
	public void setUSE_COUNT(String pUSE_COUNT) {
		this.USE_COUNT = pUSE_COUNT;
	}
	
	public void setDEL_YN(String pDEL_YN) {
		this.DEL_YN = pDEL_YN;
	}
	
	public void setARRAY_DATA(List aRRAY_DATA) {
		ARRAY_DATA = aRRAY_DATA;
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

	public String getAUTH_PRINT() {
		return AUTH_PRINT;
	}

	public void setAUTH_PRINT(String aUTH_PRINT) {
		AUTH_PRINT = aUTH_PRINT;
	}

	public String getAUTH_CREATE() {
		return AUTH_CREATE;
	}

	public void setAUTH_CREATE(String aUTH_CREATE) {
		AUTH_CREATE = aUTH_CREATE;
	}

	public String getAUTH_SUBMIT() {
		return AUTH_SUBMIT;
	}

	public void setAUTH_SUBMIT(String aUTH_SUBMIT) {
		AUTH_SUBMIT = aUTH_SUBMIT;
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

	public String getRETURN_CODE() {
		return RETURN_CODE;
	}

	public void setRETURN_CODE(String rETURN_CODE) {
		RETURN_CODE = rETURN_CODE;
	}

	public String getRETURN_MESSAGE() {
		return RETURN_MESSAGE;
	}

	public void setRETURN_MESSAGE(String rETURN_MESSAGE) {
		RETURN_MESSAGE = rETURN_MESSAGE;
	}

	
	
	/*********************************************************************************************************************************/
}
