package retail.business.credit.service;

import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("serial") 
public class BusinessCreditVO extends WisModelData{
	
	private String SALE_DT;
	private String STR_CODE;
	private String STR_NAME;
	private String POS_NO;
	private String TRXN_NO;
	private String CUST_NO;
	private String CUST_NAME;
	private String PAY_AMT;
	private String DPOT_AMT;
	private String PAY_PLAN_DT;
	private String REQ_EMP_NO;
	private String REQ_EMP_NAME;
	private String DPOT_FISH_YN;
	private String INPUT_YN;
	private String ZAN_AMT;
	
	private String RCP_DT;
	private String RCP_DT_OLD;
	private String SLIP_NO;
	private String SEQ;
	private String DPOT_FLAG;
	private String CARD_NO;
	private String CARD_TYPE;
	private String APP_NO;
	private String PAY_PERIOD;
	private String DPOT_EMP_NO;
	private String IEMP_NO;
	private String IEMP_NAME;
	private String IDATE;
	
	private String RETURN_MESSAGE;
	private String RETURN_CODE;
	
	private String CANC_FLAG;
	private String CANC_FLAG_NM;
	
	private String DPOT_STR_CODE;
	private String DPOT_STR_NAME;
	
	private String PREPAY;
	private String PREPAY_SETT;
	private String PREPAY_ZAN_AMT;
	
	private String TODAY_CUST_NAME;
	private String TODAY_DPOT_AMT;
	
	private String MBR_DSNT;
	
	private String SALE_UPOINT;
	
	private String REMARK;
	private String EDIT_AVAILABLE;
	
	public String getSALE_DT() {
		return SALE_DT;
	}
	public void setSALE_DT(String sALE_DT) {
		SALE_DT = sALE_DT;
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
	public String getPOS_NO() {
		return POS_NO;
	}
	public void setPOS_NO(String pOS_NO) {
		POS_NO = pOS_NO;
	}
	public String getTRXN_NO() {
		return TRXN_NO;
	}
	public void setTRXN_NO(String tRXN_NO) {
		TRXN_NO = tRXN_NO;
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
	public String getPAY_AMT() {
		return PAY_AMT;
	}
	public void setPAY_AMT(String pAY_AMT) {
		PAY_AMT = pAY_AMT;
	}
	public String getDPOT_AMT() {
		return DPOT_AMT;
	}
	public void setDPOT_AMT(String dPOT_AMT) {
		DPOT_AMT = dPOT_AMT;
	}
	public String getPAY_PLAN_DT() {
		return PAY_PLAN_DT;
	}
	public void setPAY_PLAN_DT(String pAY_PLAN_DT) {
		PAY_PLAN_DT = pAY_PLAN_DT;
	}
	public String getREQ_EMP_NO() {
		return REQ_EMP_NO;
	}
	public void setREQ_EMP_NO(String rEQ_EMP_NO) {
		REQ_EMP_NO = rEQ_EMP_NO;
	}
	public String getREQ_EMP_NAME() {
		return REQ_EMP_NAME;
	}
	public void setREQ_EMP_NAME(String rEQ_EMP_NAME) {
		REQ_EMP_NAME = rEQ_EMP_NAME;
	}
	public String getDPOT_FISH_YN() {
		return DPOT_FISH_YN;
	}
	public void setDPOT_FISH_YN(String dPOT_FISH_YN) {
		DPOT_FISH_YN = dPOT_FISH_YN;
	}
	public String getRETURN_MESSAGE() {
		return RETURN_MESSAGE;
	}
	public void setRETURN_MESSAGE(String rETURN_MESSAGE) {
		RETURN_MESSAGE = rETURN_MESSAGE;
	}
	public String getRETURN_CODE() {
		return RETURN_CODE;
	}
	public void setRETURN_CODE(String rETURN_CODE) {
		RETURN_CODE = rETURN_CODE;
	}
	public String getRCP_DT() {
		return RCP_DT;
	}
	public void setRCP_DT(String rCP_DT) {
		RCP_DT = rCP_DT;
	}
	public String getSLIP_NO() {
		return SLIP_NO;
	}
	public void setSLIP_NO(String sLIP_NO) {
		SLIP_NO = sLIP_NO;
	}
	public String getSEQ() {
		return SEQ;
	}
	public void setSEQ(String sEQ) {
		SEQ = sEQ;
	}
	public String getDPOT_FLAG() {
		return DPOT_FLAG;
	}
	public void setDPOT_FLAG(String dPOT_FLAG) {
		DPOT_FLAG = dPOT_FLAG;
	}
	public String getCARD_NO() {
		return CARD_NO;
	}
	public void setCARD_NO(String cARD_NO) {
		CARD_NO = cARD_NO;
	}
	public String getCARD_TYPE() {
		return CARD_TYPE;
	}
	public void setCARD_TYPE(String cARD_TYPE) {
		CARD_TYPE = cARD_TYPE;
	}
	public String getAPP_NO() {
		return APP_NO;
	}
	public void setAPP_NO(String aPP_NO) {
		APP_NO = aPP_NO;
	}
	public String getPAY_PERIOD() {
		return PAY_PERIOD;
	}
	public void setPAY_PERIOD(String pAY_PERIOD) {
		PAY_PERIOD = pAY_PERIOD;
	}
	public String getDPOT_EMP_NO() {
		return DPOT_EMP_NO;
	}
	public void setDPOT_EMP_NO(String dPOT_EMP_NO) {
		DPOT_EMP_NO = dPOT_EMP_NO;
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
	public String getINPUT_YN() {
		return INPUT_YN;
	}
	public void setINPUT_YN(String iNPUT_YN) {
		INPUT_YN = iNPUT_YN;
	}
	public String getZAN_AMT() {
		return ZAN_AMT;
	}
	public void setZAN_AMT(String zAN_AMT) {
		ZAN_AMT = zAN_AMT;
	}
	public String getCANC_FLAG() {
		return CANC_FLAG;
	}
	public void setCANC_FLAG(String cANC_FLAG) {
		CANC_FLAG = cANC_FLAG;
	}
	public String getCANC_FLAG_NM() {
		return CANC_FLAG_NM;
	}
	public void setCANC_FLAG_NM(String cANC_FLAG_NM) {
		CANC_FLAG_NM = cANC_FLAG_NM;
	}
	public String getDPOT_STR_CODE() {
		return DPOT_STR_CODE;
	}
	public void setDPOT_STR_CODE(String dPOT_STR_CODE) {
		DPOT_STR_CODE = dPOT_STR_CODE;
	}
	public String getDPOT_STR_NAME() {
		return DPOT_STR_NAME;
	}
	public void setDPOT_STR_NAME(String dPOT_STR_NAME) {
		DPOT_STR_NAME = dPOT_STR_NAME;
	}
	public String getPREPAY() {
		return PREPAY;
	}
	public void setPREPAY(String pREPAY) {
		PREPAY = pREPAY;
	}
	public String getPREPAY_SETT() {
		return PREPAY_SETT;
	}
	public void setPREPAY_SETT(String pREPAY_SETT) {
		PREPAY_SETT = pREPAY_SETT;
	}
	public String getPREPAY_ZAN_AMT() {
		return PREPAY_ZAN_AMT;
	}
	public void setPREPAY_ZAN_AMT(String pREPAY_ZAN_AMT) {
		PREPAY_ZAN_AMT = pREPAY_ZAN_AMT;
	}
	public String getTODAY_CUST_NAME() {
		return TODAY_CUST_NAME;
	}
	public void setTODAY_CUST_NAME(String tODAY_CUST_NAME) {
		TODAY_CUST_NAME = tODAY_CUST_NAME;
	}
	public String getTODAY_DPOT_AMT() {
		return TODAY_DPOT_AMT;
	}
	public void setTODAY_DPOT_AMT(String tODAY_DPOT_AMT) {
		TODAY_DPOT_AMT = tODAY_DPOT_AMT;
	}
	public String getMBR_DSNT() {
		return MBR_DSNT;
	}
	public void setMBR_DSNT(String mBR_DSNT) {
		MBR_DSNT = mBR_DSNT;
	}
	public String getSALE_UPOINT() {
		return SALE_UPOINT;
	}
	public void setSALE_UPOINT(String sALE_UPOINT) {
		SALE_UPOINT = sALE_UPOINT;
	}
	public String getREMARK() {
		return REMARK;
	}
	public void setREMARK(String rEMARK) {
		REMARK = rEMARK;
	}
	public String getRCP_DT_OLD() {
		return RCP_DT_OLD;
	}
	public void setRCP_DT_OLD(String rCP_DT_OLD) {
		RCP_DT_OLD = rCP_DT_OLD;
	}
	public String getEDIT_AVAILABLE() {
		return EDIT_AVAILABLE;
	}
	public void setEDIT_AVAILABLE(String eDIT_AVAILABLE) {
		EDIT_AVAILABLE = eDIT_AVAILABLE;
	}
	
	

}
