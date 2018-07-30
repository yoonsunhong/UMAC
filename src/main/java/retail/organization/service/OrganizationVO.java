package retail.organization.service;
 
import java.util.ArrayList;
import java.util.List;
import java.util.Map; 

import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("serial") 
public class OrganizationVO extends WisModelData {

	private String  CORP_CODE;
	private String  CD_NM;
	private String  USE_YN;
	private String  CD_CL;
	private String  CD_ID;
	private String  CD_DESCRIPTION;
	private String  REG_ID;
	private String  REG_IP;
	private String  UPD_IP;
	private String  UPD_ID;
	private String  ORIGIN_CD_ID;
	private String  Ret_cd; 
	private String  Result;
	private String  CNT;
	private String  MGMT_ENTRY_1;
	private String  MGMT_ENTRY_DESCRIPTION_1;
	private String  DEL_YN;
	private String CD_SHORT_NM;
	private String SORT_ORDER;
	private String RETURN_CODE;
	private String RETURN_MESSAGE;
	
	public String getCORP_CODE() {
		return CORP_CODE;
	}

	public void setCORP_CODE(String cORP_CODE) {
		CORP_CODE = cORP_CODE;
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

	public String getCD_DESCRIPTION() {
		return CD_DESCRIPTION;
	}

	public void setCD_DESCRIPTION(String cD_DESCRIPTION) {
		CD_DESCRIPTION = cD_DESCRIPTION;
	}

	public String getCD_ID() {
		return CD_ID;
	}

	public void setCD_ID(String cD_ID) {
		CD_ID = cD_ID;
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

	public String getMGMT_ENTRY_1() {
		return MGMT_ENTRY_1;
	}

	public void setMGMT_ENTRY_1(String mGMT_ENTRY_1) {
		MGMT_ENTRY_1 = mGMT_ENTRY_1;
	}

	public String getMGMT_ENTRY_DESCRIPTION_1() {
		return MGMT_ENTRY_DESCRIPTION_1;
	}

	public void setMGMT_ENTRY_DESCRIPTION_1(String mGMT_ENTRY_DESCRIPTION_1) {
		MGMT_ENTRY_DESCRIPTION_1 = mGMT_ENTRY_DESCRIPTION_1;
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


	
}
