package retail.claim.service;

import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("serial")
public class UserClaimVO extends WisModelData {
	
	private String CORP_CODE;
	private String RCPT_NO;
	private String RCPT_DTTM;
	private String RCPT_DT;
	private String STR_CODE;
	private String STR_NAME;
	private String RCPT_EMP;
	private String RCPT_EMP_NAME;
	private String SUBJECT;
	private String CUST_NO;
	private String CUST_NAME;
	private String CLAIM_TP;
	private String CLAIM_TP_NAME;
	private String CLAIM_STAT;
	private String CLAIM_STAT_NAME;
	private String CLAIM_CNT;
	private String CLAIM_CNT_HTML;
	private String MOBIL_NO;
	private String CONTS;
	private String IEMP_NO;
	private String IEMP_NAME;
	private String IDATE;
	private String UEMP_NO;
	private String UEMP_NAME;
	private String UDATE;
	
	private String SEQ;
	private String PROSS_DTTM;
	
	private String RETURN_CODE;
	private String RETURN_MESSAGE;
	
	public String getCORP_CODE() {
		return CORP_CODE;
	}
	public void setCORP_CODE(String cORP_CODE) {
		CORP_CODE = cORP_CODE;
	}
	public String getRCPT_NO() {
		return RCPT_NO;
	}
	public void setRCPT_NO(String rCPT_NO) {
		RCPT_NO = rCPT_NO;
	}
	public String getRCPT_DTTM() {
		return RCPT_DTTM;
	}
	public void setRCPT_DTTM(String rCPT_DTTM) {
		RCPT_DTTM = rCPT_DTTM;
	}
	public String getSTR_CODE() {
		return STR_CODE;
	}
	public void setSTR_CODE(String sTR_CODE) {
		STR_CODE = sTR_CODE;
	}
	public String getSTR_NAME() {
		return STR_NAME;
	}
	public void setSTR_NAME(String sTR_NAME) {
		STR_NAME = sTR_NAME;
	}
	public String getRCPT_EMP() {
		return RCPT_EMP;
	}
	public void setRCPT_EMP(String rCPT_EMP) {
		RCPT_EMP = rCPT_EMP;
	}
	public String getRCPT_EMP_NAME() {
		return RCPT_EMP_NAME;
	}
	public void setRCPT_EMP_NAME(String rCPT_EMP_NAME) {
		RCPT_EMP_NAME = rCPT_EMP_NAME;
	}
	public String getSUBJECT() {
		return SUBJECT;
	}
	public void setSUBJECT(String sUBJECT) {
		SUBJECT = sUBJECT;
	}
	public String getCUST_NO() {
		return CUST_NO;
	}
	public void setCUST_NO(String cUST_NO) {
		CUST_NO = cUST_NO;
	}
	public String getCUST_NAME() {
		return CUST_NAME;
	}
	public void setCUST_NAME(String cUST_NAME) {
		CUST_NAME = cUST_NAME;
	}
	public String getCLAIM_TP() {
		return CLAIM_TP;
	}
	public void setCLAIM_TP(String cLAIM_TP) {
		CLAIM_TP = cLAIM_TP;
	}
	public String getCLAIM_TP_NAME() {
		return CLAIM_TP_NAME;
	}
	public void setCLAIM_TP_NAME(String cLAIM_TP_NAME) {
		CLAIM_TP_NAME = cLAIM_TP_NAME;
	}
	public String getCLAIM_STAT() {
		return CLAIM_STAT;
	}
	public void setCLAIM_STAT(String cLAIM_STAT) {
		CLAIM_STAT = cLAIM_STAT;
	}
	public String getCLAIM_STAT_NAME() {
		return CLAIM_STAT_NAME;
	}
	public void setCLAIM_STAT_NAME(String cLAIM_STAT_NAME) {
		CLAIM_STAT_NAME = cLAIM_STAT_NAME;
	}
	public String getMOBIL_NO() {
		return MOBIL_NO;
	}
	public void setMOBIL_NO(String mOBIL_NO) {
		MOBIL_NO = mOBIL_NO;
	}
	public String getCONTS() {
		return CONTS;
	}
	public void setCONTS(String cONTS) {
		CONTS = cONTS;
	}
	public String getIEMP_NO() {
		return IEMP_NO;
	}
	public void setIEMP_NO(String iEMP_NO) {
		IEMP_NO = iEMP_NO;
	}
	public String getIEMP_NAME() {
		return IEMP_NAME;
	}
	public void setIEMP_NAME(String iEMP_NAME) {
		IEMP_NAME = iEMP_NAME;
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
	public String getUEMP_NAME() {
		return UEMP_NAME;
	}
	public void setUEMP_NAME(String uEMP_NAME) {
		UEMP_NAME = uEMP_NAME;
	}
	public String getUDATE() {
		return UDATE;
	}
	public void setUDATE(String uDATE) {
		UDATE = uDATE;
	}
	public String getSEQ() {
		return SEQ;
	}
	public void setSEQ(String sEQ) {
		SEQ = sEQ;
	}
	public String getPROSS_DTTM() {
		return PROSS_DTTM;
	}
	public void setPROSS_DTTM(String pROSS_DTTM) {
		PROSS_DTTM = pROSS_DTTM;
	}
	public String getCLAIM_CNT() {
		return CLAIM_CNT;
	}
	public void setCLAIM_CNT(String cLAIM_CNT) {
		CLAIM_CNT = cLAIM_CNT;
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
	public String getRCPT_DT() {
		return RCPT_DT;
	}
	public void setRCPT_DT(String rCPT_DT) {
		RCPT_DT = rCPT_DT;
	}
	public String getCLAIM_CNT_HTML() {
		return CLAIM_CNT_HTML;
	}
	public void setCLAIM_CNT_HTML(String cLAIM_CNT_HTML) {
		CLAIM_CNT_HTML = cLAIM_CNT_HTML;
	}
	
	
}
