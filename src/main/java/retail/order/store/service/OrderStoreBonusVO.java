package retail.order.store.service;
 
import java.util.ArrayList;
import java.util.List;
import java.util.Map; 

import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("serial") 
public class OrderStoreBonusVO extends WisModelData {

	private String  RETURN_CODE;
	private String  RETURN_MESSAGE;
	private String  EMP_NO;
	 
	private String  SCAN_CODE;

	public String getSCAN_CODE() {
		return SCAN_CODE;
	}

	public void setSCAN_CODE(String sCAN_CODE) {
		SCAN_CODE = sCAN_CODE;
	}

	public String getEMP_NO() {
		return EMP_NO;
	}

	public void setEMP_NO(String eMP_NO) {
		EMP_NO = eMP_NO;
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
	private String  CORP_CODE;
	private String  CD_NM;
	private String  USE_YN;
	private String  CD_CL;
	private String  CD_ID;
	private String  CD_DC;
	private String  REG_ID;
	private String  REG_IP;
	private String  UPD_IP;
	private String  UPD_ID;
	private String  ORIGIN_CD_ID;
	private String  Ret_cd; 
	private String  Result;
	private String  CNT;
	private String 	STD_PRICE_MIN;
	private String 	STD_PRICE_MAX;
 
	private String RESULT;
	
	public String getSTD_PRICE_MIN() {
		return STD_PRICE_MIN;
	}

	public void setSTD_PRICE_MIN(String sTD_PRICE_MIN) {
		STD_PRICE_MIN = sTD_PRICE_MIN;
	}

	public String getSTD_PRICE_MAX() {
		return STD_PRICE_MAX;
	}

	public void setSTD_PRICE_MAX(String sTD_PRICE_MAX) {
		STD_PRICE_MAX = sTD_PRICE_MAX;
	}

	public String getRESULT() {
		return RESULT;
	}

	public void setRESULT(String rESULT) {
		RESULT = rESULT;
	}
	private String  MENU_ID;
	private String  MENU_NM;
	private String  UP_MENU_ID; 
	private String  MENU_GB;
	private String  CLASS_NM;
	private String  BIGO; 
	private String  DEL_YN;
	private String  UP_MENU_NM; 
	
	
	private String REG_DTTM;
	private String UPD_DTTM;
	

	private String YEAR_Y    ;
	private String QUARTER   ;
	private String MONTH_M   ;
	private String CURR1     ;
	private String CURR2    ;
	private String  CURR3;
	private String ITM_NAME;
	
	public String getITM_NAME() {
		return ITM_NAME;
	}

	public void setITM_NAME(String iTM_NAME) {
		ITM_NAME = iTM_NAME;
	}

	public String getYEAR_Y() {
		return YEAR_Y;
	}

	public void setYEAR_Y(String yEAR_Y) {
		YEAR_Y = yEAR_Y;
	}

	public String getQUARTER() {
		return QUARTER;
	}

	public void setQUARTER(String qUARTER) {
		QUARTER = qUARTER;
	}

	public String getMONTH_M() {
		return MONTH_M;
	}

	public void setMONTH_M(String mONTH_M) {
		MONTH_M = mONTH_M;
	}

	public String getCURR1() {
		return CURR1;
	}

	public void setCURR1(String cURR1) {
		CURR1 = cURR1;
	}

	public String getCURR2() {
		return CURR2;
	}

	public void setCURR2(String cURR2) {
		CURR2 = cURR2;
	}

	public String getCURR3() {
		return CURR3;
	}

	public void setCURR3(String cURR3) {
		CURR3 = cURR3;
	}

	public String getCORP_CODE() {
		return CORP_CODE;
	}

	public void setCORP_CODE(String cORP_CODE) {
		CORP_CODE = cORP_CODE;
	}

	public String getREG_DTTM() {
		return REG_DTTM;
	}

	public void setREG_DTTM(String rEG_DTTM) {
		REG_DTTM = rEG_DTTM;
	}

	public String getUPD_DTTM() {
		return UPD_DTTM;
	}

	public void setUPD_DTTM(String uPD_DTTM) {
		UPD_DTTM = uPD_DTTM;
	}

	public String getUP_MENU_NM() {
		return UP_MENU_NM;
	}

	public void setUP_MENU_NM(String uP_MENU_NM) {
		UP_MENU_NM = uP_MENU_NM;
	}

	public String getMENU_ID() {
		return MENU_ID;
	}

	public void setMENU_ID(String mENU_ID) {
		MENU_ID = mENU_ID;
	}

	public String getMENU_NM() {
		return MENU_NM;
	}

	public void setMENU_NM(String mENU_NM) {
		MENU_NM = mENU_NM;
	}

	public String getUP_MENU_ID() {
		return UP_MENU_ID;
	}

	public void setUP_MENU_ID(String uP_MENU_ID) {
		UP_MENU_ID = uP_MENU_ID;
	}

	public String getMENU_GB() {
		return MENU_GB;
	}

	public void setMENU_GB(String mENU_GB) {
		MENU_GB = mENU_GB;
	}

	public String getCLASS_NM() {
		return CLASS_NM;
	}

	public void setCLASS_NM(String cLASS_NM) {
		CLASS_NM = cLASS_NM;
	}

	public String getBIGO() {
		return BIGO;
	}

	public void setBIGO(String bIGO) {
		BIGO = bIGO;
	}

	public String getDEL_YN() {
		return DEL_YN;
	}

	public void setDEL_YN(String dEL_YN) {
		DEL_YN = dEL_YN;
	}

	public String getCNT() {
		return CNT;
	}

	public void setCNT(String cNT) {
		CNT = cNT;
	}

	public String getRet_cd() {
		return Ret_cd;
	}

	public void setRet_cd(String ret_cd) {
		Ret_cd = ret_cd;
	}

	/** getter - 결과값 리스트 */
	public List<?> getContent() {
		List<?> list = get("content");
		if( list == null ) {
			list = new ArrayList<Map<String, Object>>();
			this.setContent(list);
		}
		return list;
	} 
	/** setter - 결과값 리스트 */
	public void setContent(List<?> list) {
		set("content", list);
	}

	public String getResult() {
		return Result;
	}

	public void setResult(String result) {
		Result = result;
	}

	public String getORIGIN_CD_ID() {
		return ORIGIN_CD_ID;
	}

	public void setORIGIN_CD_ID(String oRIGIN_CD_ID) {
		ORIGIN_CD_ID = oRIGIN_CD_ID;
	}

	public String getCD_SHORT_NM() {
		return CD_SHORT_NM;
	}

	public void setCD_SHORT_NM(String cD_SHORT_NM) {
		CD_SHORT_NM = cD_SHORT_NM;
	}

	public String getSORT_ORDER() {
		return SORT_ORDER;
	}

	public void setSORT_ORDER(String sORT_ORDER) {
		SORT_ORDER = sORT_ORDER;
	}

	public String getMGMT_ITEM_1() {
		return MGMT_ITEM_1;
	}

	public void setMGMT_ITEM_1(String mGMT_ITEM_1) {
		MGMT_ITEM_1 = mGMT_ITEM_1;
	}

	public String getMGMT_ITEM_DC_1() {
		return MGMT_ITEM_DC_1;
	}

	public void setMGMT_ITEM_DC_1(String mGMT_ITEM_DC_1) {
		MGMT_ITEM_DC_1 = mGMT_ITEM_DC_1;
	}

	private String CD_SHORT_NM;
	private String SORT_ORDER;
	private String MGMT_ITEM_1;
	private String MGMT_ITEM_DC_1;
	
	
	public String getUPD_IP() {
		return UPD_IP;
	}

	public void setUPD_IP(String uPD_IP) {
		UPD_IP = uPD_IP;
	}

	public String getUPD_ID() {
		return UPD_ID;
	}

	public void setUPD_ID(String uPD_ID) {
		UPD_ID = uPD_ID;
	}

	public String getREG_IP() {
		return REG_IP;
	}

	public void setREG_IP(String rEG_IP) {
		REG_IP = rEG_IP;
	}

	public String getREG_ID() {
		return REG_ID;
	}

	public void setREG_ID(String rEG_ID) {
		REG_ID = rEG_ID;
	}

	public String getCD_DC() {
		return CD_DC;
	}

	public void setCD_DC(String cD_DC) {
		CD_DC = cD_DC;
	}

	public String getCD_ID() {
		return CD_ID;
	}

	public void setCD_ID(String cD_ID) {
		CD_ID = cD_ID;
	}

	/** 아이디 */
	private String USER_ID;

	/** 이름 */
	private String USER_NM;

	/** 내용 */
	private String PASSWD;

	/** 사용여부 */
	private String MOBILE_NO;

	public String getUSER_ID() {
		return USER_ID;
	}

	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}

	public String getUSER_NM() {
		return USER_NM;
	}

	public void setUSER_NM(String uSER_NM) {
		USER_NM = uSER_NM;
	}

	public String getPASSWD() {
		return PASSWD;
	}

	public void setPASSWD(String pASSWD) {
		PASSWD = pASSWD;
	}

	public String getMOBILE_NO() {
		return MOBILE_NO;
	}

	public void setMOBILE_NO(String mOBILE_NO) {
		MOBILE_NO = mOBILE_NO;
	}

	public String getCD_NM() {
		return CD_NM;
	}

	public void setCD_NM(String cD_NM) {
		CD_NM = cD_NM;
	}

	public String getUSE_YN() {
		return USE_YN;
	}

	public void setUSE_YN(String uSE_YN) {
		USE_YN = uSE_YN;
	}
	

	public String getCD_CL() {
		return CD_CL;
	}

	public void setCD_CL(String cD_CL) {
		CD_CL = cD_CL;
	}
	
}
