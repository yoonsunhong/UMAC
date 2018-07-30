package retail.business.gift.service;

import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("serial") 
public class BusinessGiftVO extends WisModelData  {
	
	private String INPUT_YN;
	private String CORP_CODE;

	private String GIFT_CODE;
	private String GIFT_NAME;
	private String STR_CODE;
	private String STR_NAME;
	private String GIFT_CMP_FLAG;
	private String GIFT_CMP_FLAG_NM;
	private String GIFT_STR_DT;
	private String GIFT_END_DT;
	private String POINT;
	private String POINT_SAVE;
	private String REMARK;
	private String TGET_CUST;
	private String PUBLISH_CNT; 
	
	private String RETURN_CODE;
	private String RETURN_MESSAGE;
	
	private String SEARCH_WORD;
	private String EVT_CODE;
	private String EVT_NAME;
	private String EVT_STR_DT;
	private String EVT_END_DT;
	private String ORD_STR_DT;
	private String ORD_END_DT;
	private String EVT_FLAG;
	private String EVT_FLAG_NM;
	private String EVT_TYPE;
	private String EVT_TYPE_NM;
	
	private String GIFT_ITM_CODE;
	private String GIFT_ITM_NM;
	private String USE_YN;
	private String BASE_MIN_AMT;
	private String BASE_MAX_AMT;
	
	private String SALE_DT;
	private String SALE_AMT;
	private String POS_NO;
	private String CUST_NO;
	private String PAY_AMT;
	private String TRXN_NO;
	private String PAY_QTY;
	
	public String getGIFT_CODE() {
		return GIFT_CODE;
	}
	public void setGIFT_CODE(String gIFT_CODE) {
		GIFT_CODE = gIFT_CODE;
	}
	public String getGIFT_NAME() {
		return GIFT_NAME;
	}
	public void setGIFT_NAME(String gIFT_NAME) {
		GIFT_NAME = gIFT_NAME;
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
	public String getGIFT_CMP_FLAG() {
		return GIFT_CMP_FLAG;
	}
	public void setGIFT_CMP_FLAG(String gIFT_CMP_FLAG) {
		GIFT_CMP_FLAG = gIFT_CMP_FLAG;
	}
	public String getGIFT_STR_DT() {
		return GIFT_STR_DT;
	}
	public void setGIFT_STR_DT(String gIFT_STR_DT) {
		GIFT_STR_DT = gIFT_STR_DT;
	}
	public String getGIFT_END_DT() {
		return GIFT_END_DT;
	}
	public void setGIFT_END_DT(String gIFT_END_DT) {
		GIFT_END_DT = gIFT_END_DT;
	}
	public String getPOINT() {
		return POINT;
	}
	public void setPOINT(String pOINT) {
		POINT = pOINT;
	}
	public String getREMARK() {
		return REMARK;
	}
	public void setREMARK(String rEMARK) {
		REMARK = rEMARK;
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
	public String getPOINT_SAVE() {
		return POINT_SAVE;
	}
	public void setPOINT_SAVE(String pOINT_SAVE) {
		POINT_SAVE = pOINT_SAVE;
	}
	public String getTGET_CUST() {
		return TGET_CUST;
	}
	public void setTGET_CUST(String tGET_CUST) {
		TGET_CUST = tGET_CUST;
	}
	public String getPUBLISH_CNT() {
		return PUBLISH_CNT;
	}
	public void setPUBLISH_CNT(String pUBLISH_CNT) {
		PUBLISH_CNT = pUBLISH_CNT;
	}
	public String getSEARCH_WORD() {
		return SEARCH_WORD;
	}
	public void setSEARCH_WORD(String sEARCH_WORD) {
		SEARCH_WORD = sEARCH_WORD;
	}
	public String getEVT_CODE() {
		return EVT_CODE;
	}
	public void setEVT_CODE(String eVT_CODE) {
		EVT_CODE = eVT_CODE;
	}
	public String getEVT_NAME() {
		return EVT_NAME;
	}
	public void setEVT_NAME(String eVT_NAME) {
		EVT_NAME = eVT_NAME;
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
	public String getORD_STR_DT() {
		return ORD_STR_DT;
	}
	public void setORD_STR_DT(String oRD_STR_DT) {
		ORD_STR_DT = oRD_STR_DT;
	}
	public String getORD_END_DT() {
		return ORD_END_DT;
	}
	public void setORD_END_DT(String oRD_END_DT) {
		ORD_END_DT = oRD_END_DT;
	}
	public String getEVT_FLAG() {
		return EVT_FLAG;
	}
	public void setEVT_FLAG(String eVT_FLAG) {
		EVT_FLAG = eVT_FLAG;
	}
	public String getEVT_FLAG_NM() {
		return EVT_FLAG_NM;
	}
	public void setEVT_FLAG_NM(String eVT_FLAG_NM) {
		EVT_FLAG_NM = eVT_FLAG_NM;
	}
	public String getEVT_TYPE() {
		return EVT_TYPE;
	}
	public void setEVT_TYPE(String eVT_TYPE) {
		EVT_TYPE = eVT_TYPE;
	}
	public String getEVT_TYPE_NM() {
		return EVT_TYPE_NM;
	}
	public void setEVT_TYPE_NM(String eVT_TYPE_NM) {
		EVT_TYPE_NM = eVT_TYPE_NM;
	}
	public String getINPUT_YN() {
		return INPUT_YN;
	}
	public void setINPUT_YN(String iNPUT_YN) {
		INPUT_YN = iNPUT_YN;
	}
	public String getGIFT_ITM_CODE() {
		return GIFT_ITM_CODE;
	}
	public void setGIFT_ITM_CODE(String gIFT_ITM_CODE) {
		GIFT_ITM_CODE = gIFT_ITM_CODE;
	}
	public String getGIFT_ITM_NM() {
		return GIFT_ITM_NM;
	}
	public void setGIFT_ITM_NM(String gIFT_ITM_NM) {
		GIFT_ITM_NM = gIFT_ITM_NM;
	}
	public String getUSE_YN() {
		return USE_YN;
	}
	public void setUSE_YN(String uSE_YN) {
		USE_YN = uSE_YN;
	}
	public String getBASE_MIN_AMT() {
		return BASE_MIN_AMT;
	}
	public void setBASE_MIN_AMT(String bASE_MIN_AMT) {
		BASE_MIN_AMT = bASE_MIN_AMT;
	}
	public String getBASE_MAX_AMT() {
		return BASE_MAX_AMT;
	}
	public void setBASE_MAX_AMT(String bASE_MAX_AMT) {
		BASE_MAX_AMT = bASE_MAX_AMT;
	}
	public String getGIFT_CMP_FLAG_NM() {
		return GIFT_CMP_FLAG_NM;
	}
	public void setGIFT_CMP_FLAG_NM(String gIFT_CMP_FLAG_NM) {
		GIFT_CMP_FLAG_NM = gIFT_CMP_FLAG_NM;
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
	public String getCUST_NO() {
		return CUST_NO;
	}
	public void setCUST_NO(String cUST_NO) {
		CUST_NO = cUST_NO;
	}
	public String getPAY_AMT() {
		return PAY_AMT;
	}
	public void setPAY_AMT(String pAY_AMT) {
		PAY_AMT = pAY_AMT;
	}
	public String getCORP_CODE() {
		return CORP_CODE;
	}
	public void setCORP_CODE(String cORP_CODE) {
		CORP_CODE = cORP_CODE;
	}
	public String getTRXN_NO() {
		return TRXN_NO;
	}
	public void setTRXN_NO(String tRXN_NO) {
		TRXN_NO = tRXN_NO;
	}
	public String getSALE_AMT() {
		return SALE_AMT;
	}
	public void setSALE_AMT(String sALE_AMT) {
		SALE_AMT = sALE_AMT;
	}
	public String getPAY_QTY() {
		return PAY_QTY;
	}
	public void setPAY_QTY(String pAY_QTY) {
		PAY_QTY = pAY_QTY;
	}
	
	
}
