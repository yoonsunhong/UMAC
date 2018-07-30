package retail.business.campaignmaster.service;

import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("serial") 
public class BusinessCampaignMasterVO extends WisModelData{

	private String RN;						//순번
	private String STR_CODE;				//점포코드
	private String EVT_CODE;				//행사코드
	private String EVT_NAME;				//행사명
	private String EVT_STR_DT;			//행사시작일
	private String EVT_END_DT;			//행사종료일
	private String ORD_STR_DT;			//발주시작일자
	private String ORD_END_DT;			//발주종료일자
	private String EVT_FLAG;				//행사구분
	private String EVT_FLAG_NM;		//행사구분명
	private String IEMP_NO;				//등록사원번호
	private String IEMP_NAME;			//등록사원명
	private String IDATE;					//등록일자
	private String UEMP_NO;				//수정사원번호
	private String UEMP_NAME;			//수정사원명
	private String UDATE;					//수정일자
	private String REMARK;					//비고
	private String RETURN_CODE;		//결과코드
	private String RETURN_MESSAGE;	//결과메시지
	
	private String CARD_CODE;
	private String CARD_NAME;
	private String CARD_TYPE;
	private String CARD_PREFIX;
	private String MBR_DSNT;
	
	private String EXCHG_PRT_YN;
	private String EXCHG_BASE_AMT;
	private String EXCHG_CONTS;
	private String CARD_BASE_AMT;
	private String DC_FLAG;
	private String DC_AMT;
	private String DC_RATE;
	private String EVT_TYPE;
	private String EVT_TYPE_NM; 
	
	private String TGET_CUST;
	private String POINT_NET_YN;
	
	private String PRODUCT_CNT;
	
	public String getRN() {
		return RN;
	}
	public void setRN(String rN) {
		RN = rN;
	}
	public String getSTR_CODE() {
		return STR_CODE;
	}
	public void setSTR_CODE(String sTR_CODE) {
		STR_CODE = sTR_CODE;
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
	public String getREMARK() {
		return REMARK;
	}
	public void setREMARK(String rEMARK) {
		REMARK = rEMARK;
	}
	public String getCARD_CODE() {
		return CARD_CODE;
	}
	public void setCARD_CODE(String cARD_CODE) {
		CARD_CODE = cARD_CODE;
	}
	public String getCARD_NAME() {
		return CARD_NAME;
	}
	public void setCARD_NAME(String cARD_NAME) {
		CARD_NAME = cARD_NAME;
	}
	public String getCARD_TYPE() {
		return CARD_TYPE;
	}
	public void setCARD_TYPE(String cARD_TYPE) {
		CARD_TYPE = cARD_TYPE;
	}
	public String getMBR_DSNT() {
		return MBR_DSNT;
	}
	public void setMBR_DSNT(String mBR_DSNT) {
		MBR_DSNT = mBR_DSNT;
	}
	public String getEXCHG_PRT_YN() {
		return EXCHG_PRT_YN;
	}
	public void setEXCHG_PRT_YN(String eXCHG_PRT_YN) {
		EXCHG_PRT_YN = eXCHG_PRT_YN;
	}
	public String getEXCHG_BASE_AMT() {
		return EXCHG_BASE_AMT;
	}
	public void setEXCHG_BASE_AMT(String eXCHG_BASE_AMT) {
		EXCHG_BASE_AMT = eXCHG_BASE_AMT;
	}
	public String getEXCHG_CONTS() {
		return EXCHG_CONTS;
	}
	public void setEXCHG_CONTS(String eXCHG_CONTS) {
		EXCHG_CONTS = eXCHG_CONTS;
	}
	public String getCARD_BASE_AMT() {
		return CARD_BASE_AMT;
	}
	public void setCARD_BASE_AMT(String cARD_BASE_AMT) {
		CARD_BASE_AMT = cARD_BASE_AMT;
	}
	public String getDC_FLAG() {
		return DC_FLAG;
	}
	public void setDC_FLAG(String dC_FLAG) {
		DC_FLAG = dC_FLAG;
	}
	public String getDC_AMT() {
		return DC_AMT;
	}
	public void setDC_AMT(String dC_AMT) {
		DC_AMT = dC_AMT;
	}
	public String getDC_RATE() {
		return DC_RATE;
	}
	public void setDC_RATE(String dC_RATE) {
		DC_RATE = dC_RATE;
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
	public String getPRODUCT_CNT() {
		return PRODUCT_CNT;
	}
	public void setPRODUCT_CNT(String pRODUCT_CNT) {
		PRODUCT_CNT = pRODUCT_CNT;
	}
	public String getCARD_PREFIX() {
		return CARD_PREFIX;
	}
	public void setCARD_PREFIX(String cARD_PREFIX) {
		CARD_PREFIX = cARD_PREFIX;
	}
	public String getTGET_CUST() {
		return TGET_CUST;
	}
	public void setTGET_CUST(String tGET_CUST) {
		TGET_CUST = tGET_CUST;
	}
	public String getPOINT_NET_YN() {
		return POINT_NET_YN;
	}
	public void setPOINT_NET_YN(String pOINT_NET_YN) {
		POINT_NET_YN = pOINT_NET_YN;
	}
	
	
}
