package retail.check.service;

import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("serial")
public class ProductCheckInOutVO extends WisModelData{
	
	private String CORP_CODE;
	private String STR_CODE;
	private String STR_NAME;
	private String DOUT_DT;
	private String SLIP_NO;
	private String DIN_STR_CODE;
	private String DIN_STR_NAME;
	private String DOUT_CFM_DT;
	private String DIN_CFM_DT;
	private String DOUT_SPRC;
	private String REMARK;
	private String IEMP_NO;
	private String IEMP_NAME;
	private String IDATE;
	private String UEMP_NO;
	private String UEMP_NAME;
	private String UDATE;
	private String CFM_YN;
	private String DOUT_CFM_YN;
	private String DIN_CFM_YN;
	private String INPUT_YN;
	private String SEQ;
	private String SCAN_CODE;
	private String ITM_CODE;
	private String ITM_NAME;
	private String DP_PRC_UNIT;
	private String UNIT;
	private String TAX_GB;
	private String DOUT_QTY;
	private String DOUT_WPRC;
	private String DOUT_WVAT;
	
	private String DIN_QTY;
	private String DIN_WPRC;
	private String DIN_WVAT;
	private String DIN_SPRC;
	
	private String BOT_SPRC;
	
	private String DOUT_TOTAL;
	private String DIN_TOTAL;
	
	private String DOUT_CFM_QTY;
	private String DIN_CFM_QTY;
	
	private String ITM_GB;
	
	private String RETURN_CODE;
	private String RETURN_MESSAGE;	
	
	public String getCORP_CODE() {
		return CORP_CODE;
	}
	public void setCORP_CODE(String cORP_CODE) {
		CORP_CODE = cORP_CODE;
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
	public String getDOUT_DT() {
		return DOUT_DT;
	}
	public void setDOUT_DT(String dOUT_DT) {
		DOUT_DT = dOUT_DT;
	}
	public String getSLIP_NO() {
		return SLIP_NO;
	}
	public void setSLIP_NO(String sLIP_NO) {
		SLIP_NO = sLIP_NO;
	}
	public String getDIN_STR_CODE() {
		return DIN_STR_CODE;
	}
	public void setDIN_STR_CODE(String dIN_STR_CODE) {
		DIN_STR_CODE = dIN_STR_CODE;
	}
	public String getDIN_STR_NAME() {
		return DIN_STR_NAME;
	}
	public void setDIN_STR_NAME(String dIN_STR_NAME) {
		DIN_STR_NAME = dIN_STR_NAME;
	}
	public String getDOUT_CFM_DT() {
		return DOUT_CFM_DT;
	}
	public void setDOUT_CFM_DT(String dOUT_CFM_DT) {
		DOUT_CFM_DT = dOUT_CFM_DT;
	}
	public String getDIN_CFM_DT() {
		return DIN_CFM_DT;
	}
	public void setDIN_CFM_DT(String dIN_CFM_DT) {
		DIN_CFM_DT = dIN_CFM_DT;
	}
	public String getDOUT_SPRC() {
		return DOUT_SPRC;
	}
	public void setDOUT_SPRC(String dOUT_SPRC) {
		DOUT_SPRC = dOUT_SPRC;
	}
	public String getREMARK() {
		return REMARK;
	}
	public void setREMARK(String rEMARK) {
		REMARK = rEMARK;
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
	public String getCFM_YN() {
		return CFM_YN;
	}
	public void setCFM_YN(String cFM_YN) {
		CFM_YN = cFM_YN;
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
	public String getINPUT_YN() {
		return INPUT_YN;
	}
	public void setINPUT_YN(String iNPUT_YN) {
		INPUT_YN = iNPUT_YN;
	}
	public String getSEQ() {
		return SEQ;
	}
	public void setSEQ(String sEQ) {
		SEQ = sEQ;
	}
	public String getSCAN_CODE() {
		return SCAN_CODE;
	}
	public void setSCAN_CODE(String sCAN_CODE) {
		SCAN_CODE = sCAN_CODE;
	}
	public String getITM_CODE() {
		return ITM_CODE;
	}
	public void setITM_CODE(String iTM_CODE) {
		ITM_CODE = iTM_CODE;
	}
	public String getITM_NAME() {
		return ITM_NAME;
	}
	public void setITM_NAME(String iTM_NAME) {
		ITM_NAME = iTM_NAME;
	}
	public String getDP_PRC_UNIT() {
		return DP_PRC_UNIT;
	}
	public void setDP_PRC_UNIT(String dP_PRC_UNIT) {
		DP_PRC_UNIT = dP_PRC_UNIT;
	}
	public String getUNIT() {
		return UNIT;
	}
	public void setUNIT(String uNIT) {
		UNIT = uNIT;
	}
	public String getTAX_GB() {
		return TAX_GB;
	}
	public void setTAX_GB(String tAX_GB) {
		TAX_GB = tAX_GB;
	}
	public String getDOUT_QTY() {
		return DOUT_QTY;
	}
	public void setDOUT_QTY(String dOUT_QTY) {
		DOUT_QTY = dOUT_QTY;
	}
	public String getDOUT_WPRC() {
		return DOUT_WPRC;
	}
	public void setDOUT_WPRC(String dOUT_WPRC) {
		DOUT_WPRC = dOUT_WPRC;
	}
	public String getDOUT_WVAT() {
		return DOUT_WVAT;
	}
	public void setDOUT_WVAT(String dOUT_WVAT) {
		DOUT_WVAT = dOUT_WVAT;
	}
	public String getBOT_SPRC() {
		return BOT_SPRC;
	}
	public void setBOT_SPRC(String bOT_SPRC) {
		BOT_SPRC = bOT_SPRC;
	}
	public String getDIN_QTY() {
		return DIN_QTY;
	}
	public void setDIN_QTY(String dIN_QTY) {
		DIN_QTY = dIN_QTY;
	}
	public String getDIN_WPRC() {
		return DIN_WPRC;
	}
	public void setDIN_WPRC(String dIN_WPRC) {
		DIN_WPRC = dIN_WPRC;
	}
	public String getDIN_WVAT() {
		return DIN_WVAT;
	}
	public void setDIN_WVAT(String dIN_WVAT) {
		DIN_WVAT = dIN_WVAT;
	}
	public String getDIN_SPRC() {
		return DIN_SPRC;
	}
	public void setDIN_SPRC(String dIN_SPRC) {
		DIN_SPRC = dIN_SPRC;
	}
	public String getDOUT_TOTAL() {
		return DOUT_TOTAL;
	}
	public void setDOUT_TOTAL(String dOUT_TOTAL) {
		DOUT_TOTAL = dOUT_TOTAL;
	}
	public String getDIN_TOTAL() {
		return DIN_TOTAL;
	}
	public void setDIN_TOTAL(String dIN_TOTAL) {
		DIN_TOTAL = dIN_TOTAL;
	}
	public String getDOUT_CFM_YN() {
		return DOUT_CFM_YN;
	}
	public void setDOUT_CFM_YN(String dOUT_CFM_YN) {
		DOUT_CFM_YN = dOUT_CFM_YN;
	}
	public String getDIN_CFM_YN() {
		return DIN_CFM_YN;
	}
	public void setDIN_CFM_YN(String dIN_CFM_YN) {
		DIN_CFM_YN = dIN_CFM_YN;
	}
	public String getITM_GB() {
		return ITM_GB;
	}
	public void setITM_GB(String iTM_GB) {
		ITM_GB = iTM_GB;
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
	public String getDOUT_CFM_QTY() {
		return DOUT_CFM_QTY;
	}
	public void setDOUT_CFM_QTY(String dOUT_CFM_QTY) {
		DOUT_CFM_QTY = dOUT_CFM_QTY;
	}
	public String getDIN_CFM_QTY() {
		return DIN_CFM_QTY;
	}
	public void setDIN_CFM_QTY(String dIN_CFM_QTY) {
		DIN_CFM_QTY = dIN_CFM_QTY;
	}

	
}
