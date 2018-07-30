package retail.business.callreceipt.service;

import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("serial") 
public class BusinessCallReceiptInputVO extends WisModelData{
	
	private String CUST_NO;
	private String CUST_NAME;
	private String STR_CODE;
	private String LAST_STR_CODE;
	private String PAY_TYPE;
	private String SMS_YN;
	private String CREDIT_LIMIT;
	private String ACCT_REABLE;
	private String CREDIT_USE_LIMIT;
	private String TEL_NO;
	private String END_TEL_NO;
	private String MOBIL_NO;
	private String MBR_GRADE;
	private String MBR_GROUP;
	private String BUSI_FLAG;
	private String BUSI_FLAG_NAME;
	private String ADDR;
	private String ADDR_DTL;
	private String ORD_ADDR;
	private String ORD_ADDR_DTL;
	private String SLIP_NO;
	private String RESERVE_DT;
	private String RESERVE_TIME;
	private String ORD_STAT;
	private String ORD_STAT_CD;
	private String ORD_MTHD;
	private String REMARK;
	private String ORD_DT;
	private String STR_NAME;
	private String ITM_CODE;
	private String ITM_NAME;
	private String ITM_FORM;
	private String UNIT;
	private String IPSU_QTY;
	private String WPRC;
	private String SPRC;
	private String EVT_SPRC;
	private String EVT_SPRC_TOTAL;
	private String INV_END_QTY;
	private String SCAN_CODE;
	private String VEN_CODE;
	private String VEN_NAME;
	private String SEARCH_WORD;
	private String IMAGE_NUM;
	private String INPUT_YN;
	private String ORD_QTY;
	
	private String RETURN_CODE;
	private String RETURN_MESSAGE;
	
	private String IEMP_NO;
	private String IEMP_NM;
	private String IDATE;
	private String UEMP_NO;
	private String UEMP_NM;
	private String UDATE;
	
	private String SALE_DT;
	private String POS_NO;
	private String TRXN_NO;
	private String SALE_QTY;
	private String SALE_AMT;
	
	private String ORD_CNT;
	private String ORD_FLAG;
	private String ORD_FLAG_NAME;
	private String RN;
	
	private String GRE_GB;
	
	private String PAY_METH;
	private String PAY_METH_NAME;
	private String LAST_PAY_METH;
	
	private String EVT_STR_DT;
	private String EVT_END_DT;
	private String EVT_CODE;
	private String EVT_GB;
	private String EVT_YN;
	
	public String getCUST_NO() {
		return CUST_NO;
	}
	public void setCUST_NO(String cUST_NO) {
		CUST_NO = cUST_NO;
	}
	public String getCUST_NAME() {
		return CUST_NAME;
	}
	public void setCUS_NAME(String cUST_NAME) {
		CUST_NAME = cUST_NAME;
	}
	public String getSTR_CODE() {
		return STR_CODE;
	}
	public void setSTR_CODE(String sTR_CODE) {
		STR_CODE = sTR_CODE;
	}
	public String getPAY_TYPE() {
		return PAY_TYPE;
	}
	public void setPAY_TYPE(String pAY_TYPE) {
		PAY_TYPE = pAY_TYPE;
	}
	public String getSMS_YN() {
		return SMS_YN;
	}
	public void setSMS_YN(String sMS_YN) {
		SMS_YN = sMS_YN;
	}
	public String getCREDIT_LIMIT() {
		return CREDIT_LIMIT;
	}
	public void setCREDIT_LIMIT(String cREDIT_LIMIT) {
		CREDIT_LIMIT = cREDIT_LIMIT;
	}
	public String getACCT_REABLE() {
		return ACCT_REABLE;
	}
	public void setACCT_REABLE(String aCCT_REABLE) {
		ACCT_REABLE = aCCT_REABLE;
	}
	public String getCREDIT_USE_LIMIT() {
		return CREDIT_USE_LIMIT;
	}
	public void setCREDIT_USE_LIMIT(String cREDIT_USE_LIMIT) {
		CREDIT_USE_LIMIT = cREDIT_USE_LIMIT;
	}
	public String getTEL_NO() {
		return TEL_NO;
	}
	public void setTEL_NO(String tEL_NO) {
		TEL_NO = tEL_NO;
	}
	public String getMOBIL_NO() {
		return MOBIL_NO;
	}
	public void setMOBIL_NO(String mOBIL_NO) {
		MOBIL_NO = mOBIL_NO;
	}
	public String getMBR_GRADE() {
		return MBR_GRADE;
	}
	public void setMBR_GRADE(String mBR_GRADE) {
		MBR_GRADE = mBR_GRADE;
	}
	public String getMBR_GROUP() {
		return MBR_GROUP;
	}
	public void setMBR_GROUP(String mBR_GROUP) {
		MBR_GROUP = mBR_GROUP;
	}
	public String getADDR() {
		return ADDR;
	}
	public void setADDR(String aDDR) {
		ADDR = aDDR;
	}
	public String getADDR_DTL() {
		return ADDR_DTL;
	}
	public void setADDR_DTL(String aDDR_DTL) {
		ADDR_DTL = aDDR_DTL;
	}
	public String getORD_ADDR() {
		return ORD_ADDR;
	}
	public void setORD_ADDR(String oRD_ADDR) {
		ORD_ADDR = oRD_ADDR;
	}
	public String getSLIP_NO() {
		return SLIP_NO;
	}
	public void setSLIP_NO(String sLIP_NO) {
		SLIP_NO = sLIP_NO;
	}
	public String getRESERVE_DT() {
		return RESERVE_DT;
	}
	public void setRESERVE_DT(String rESERVE_DT) {
		RESERVE_DT = rESERVE_DT;
	}
	public String getRESERVE_TIME() {
		return RESERVE_TIME;
	}
	public void setRESERVE_TIME(String rESERVE_TIME) {
		RESERVE_TIME = rESERVE_TIME;
	}
	public String getORD_STAT() {
		return ORD_STAT;
	}
	public void setORD_STAT(String oRD_STAT) {
		ORD_STAT = oRD_STAT;
	}
	public String getORD_MTHD() {
		return ORD_MTHD;
	}
	public void setORD_MTHD(String oRD_MTHD) {
		ORD_MTHD = oRD_MTHD;
	}
	public String getREMARK() {
		return REMARK;
	}
	public void setREMARK(String rEMARK) {
		REMARK = rEMARK;
	}
	public String getEND_TEL_NO() {
		return END_TEL_NO;
	}
	public void setEND_TEL_NO(String eND_TEL_NO) {
		END_TEL_NO = eND_TEL_NO;
	}
	public String getBUSI_FLAG() {
		return BUSI_FLAG;
	}
	public void setBUSI_FLAG(String bUSI_FLAG) {
		BUSI_FLAG = bUSI_FLAG;
	}
	public String getBUSI_FLAG_NAME() {
		return BUSI_FLAG_NAME;
	}
	public void setBUSI_FLAG_NAME(String bUSI_FLAG_NAME) {
		BUSI_FLAG_NAME = bUSI_FLAG_NAME;
	}
	public String getORD_DT() {
		return ORD_DT;
	}
	public void setORD_DT(String oRD_DT) {
		ORD_DT = oRD_DT;
	}
	public String getSTR_NAME() {
		return STR_NAME;
	}
	public void setSTR_NAME(String sTR_NAME) {
		STR_NAME = sTR_NAME;
	}
	public String getITM_CODE() {
		return ITM_CODE;
	}
	public void setITM_CODE(String iTM_CODE) {
		ITM_CODE = iTM_CODE;
	}
	public String getUNIT() {
		return UNIT;
	}
	public void setUNIT(String uNIT) {
		UNIT = uNIT;
	}
	public String getIPSU_QTY() {
		return IPSU_QTY;
	}
	public void setIPSU_QTY(String iPSU_QTY) {
		IPSU_QTY = iPSU_QTY;
	}
	public String getSPRC() {
		return SPRC;
	}
	public void setSPRC(String sPRC) {
		SPRC = sPRC;
	}
	public void setCUST_NAME(String cUST_NAME) {
		CUST_NAME = cUST_NAME;
	}
	public String getSCAN_CODE() {
		return SCAN_CODE;
	}
	public void setSCAN_CODE(String sCAN_CODE) {
		SCAN_CODE = sCAN_CODE;
	}
	public String getITM_NAME() {
		return ITM_NAME;
	}
	public void setITM_NAME(String iTM_NAME) {
		ITM_NAME = iTM_NAME;
	}
	public String getWPRC() {
		return WPRC;
	}
	public void setWPRC(String wPRC) {
		WPRC = wPRC;
	}
	public String getEVT_SPRC() {
		return EVT_SPRC;
	}
	public void setEVT_SPRC(String eVT_SPRC) {
		EVT_SPRC = eVT_SPRC;
	}
	public String getINV_END_QTY() {
		return INV_END_QTY;
	}
	public void setINV_END_QTY(String iNV_END_QTY) {
		INV_END_QTY = iNV_END_QTY;
	}
	public String getITM_FORM() {
		return ITM_FORM;
	}
	public void setITM_FORM(String iTM_FORM) {
		ITM_FORM = iTM_FORM;
	}
	public String getVEN_CODE() {
		return VEN_CODE;
	}
	public void setVEN_CODE(String vEN_CODE) {
		VEN_CODE = vEN_CODE;
	}
	public String getVEN_NAME() {
		return VEN_NAME;
	}
	public void setVEN_NAME(String vEN_NAME) {
		VEN_NAME = vEN_NAME;
	}
	public String getSEARCH_WORD() {
		return SEARCH_WORD;
	}
	public void setSEARCH_WORD(String sEARCH_WORD) {
		SEARCH_WORD = sEARCH_WORD;
	}
	public String getIMAGE_NUM() {
		return IMAGE_NUM;
	}
	public void setIMAGE_NUM(String iMAGE_NUM) {
		IMAGE_NUM = iMAGE_NUM;
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
	public String getORD_QTY() {
		return ORD_QTY;
	}
	public void setORD_QTY(String oRD_QTY) {
		ORD_QTY = oRD_QTY;
	}
	public String getORD_ADDR_DTL() {
		return ORD_ADDR_DTL;
	}
	public void setORD_ADDR_DTL(String oRD_ADDR_DTL) {
		ORD_ADDR_DTL = oRD_ADDR_DTL;
	}
	public String getIEMP_NO() {
		return IEMP_NO;
	}
	public void setIEMP_NO(String iEMP_NO) {
		IEMP_NO = iEMP_NO;
	}
	public String getIEMP_NM() {
		return IEMP_NM;
	}
	public void setIEMP_NM(String iEMP_NM) {
		IEMP_NM = iEMP_NM;
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
	public String getUEMP_NM() {
		return UEMP_NM;
	}
	public void setUEMP_NM(String uEMP_NM) {
		UEMP_NM = uEMP_NM;
	}
	public String getUDATE() {
		return UDATE;
	}
	public void setUDATE(String uDATE) {
		UDATE = uDATE;
	}
	public String getORD_STAT_CD() {
		return ORD_STAT_CD;
	}
	public void setORD_STAT_CD(String oRD_STAT_CD) {
		ORD_STAT_CD = oRD_STAT_CD;
	}
	public String getSALE_DT() {
		return SALE_DT;
	}
	public void setSALE_DT(String sALE_DT) {
		SALE_DT = sALE_DT;
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
	public String getSALE_QTY() {
		return SALE_QTY;
	}
	public void setSALE_QTY(String sALE_QTY) {
		SALE_QTY = sALE_QTY;
	}
	public String getSALE_AMT() {
		return SALE_AMT;
	}
	public void setSALE_AMT(String sALE_AMT) {
		SALE_AMT = sALE_AMT;
	}
	public String getLAST_STR_CODE() {
		return LAST_STR_CODE;
	}
	public void setLAST_STR_CODE(String lAST_STR_CODE) {
		LAST_STR_CODE = lAST_STR_CODE;
	}
	public String getORD_CNT() {
		return ORD_CNT;
	}
	public void setORD_CNT(String oRD_CNT) {
		ORD_CNT = oRD_CNT;
	}
	public String getRN() {
		return RN;
	}
	public void setRN(String rN) {
		RN = rN;
	}
	public String getGRE_GB() {
		return GRE_GB;
	}
	public void setGRE_GB(String gRE_GB) {
		GRE_GB = gRE_GB;
	}
	public String getPAY_METH() {
		return PAY_METH;
	}
	public void setPAY_METH(String pAY_METH) {
		PAY_METH = pAY_METH;
	}
	public String getPAY_METH_NAME() {
		return PAY_METH_NAME;
	}
	public void setPAY_METH_NAME(String pAY_METH_NAME) {
		PAY_METH_NAME = pAY_METH_NAME;
	}
	public String getLAST_PAY_METH() {
		return LAST_PAY_METH;
	}
	public void setLAST_PAY_METH(String lAST_PAY_METH) {
		LAST_PAY_METH = lAST_PAY_METH;
	}
	public String getORD_FLAG() {
		return ORD_FLAG;
	}
	public void setORD_FLAG(String oRD_FLAG) {
		ORD_FLAG = oRD_FLAG;
	}
	public String getORD_FLAG_NAME() {
		return ORD_FLAG_NAME;
	}
	public void setORD_FLAG_NAME(String oRD_FLAG_NAME) {
		ORD_FLAG_NAME = oRD_FLAG_NAME;
	}
	public String getEVT_SPRC_TOTAL() {
		return EVT_SPRC_TOTAL;
	}
	public void setEVT_SPRC_TOTAL(String eVT_SPRC_TOTAL) {
		EVT_SPRC_TOTAL = eVT_SPRC_TOTAL;
	}
	public String getEVT_STR_DT() {
		return EVT_STR_DT;
	}
	public void setEVT_STR_DT(String eVT_STR_DT) {
		EVT_STR_DT = eVT_STR_DT;
	}
	public String getEVT_END_DT() {
		return EVT_END_DT;
	}
	public void setEVT_END_DT(String eVT_END_DT) {
		EVT_END_DT = eVT_END_DT;
	}
	public String getEVT_CODE() {
		return EVT_CODE;
	}
	public void setEVT_CODE(String eVT_CODE) {
		EVT_CODE = eVT_CODE;
	}
	public String getEVT_GB() {
		return EVT_GB;
	}
	public void setEVT_GB(String eVT_GB) {
		EVT_GB = eVT_GB;
	}
	public String getEVT_YN() {
		return EVT_YN;
	}
	public void setEVT_YN(String eVT_YN) {
		EVT_YN = eVT_YN;
	}
	
	

}
