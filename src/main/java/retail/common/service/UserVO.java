package retail.common.service;

//import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import retail.common.BaseVO;

/**
 * @project	RETAIL
 * @file	UserVO.java
 * @comment
 * @author	문희훈
 * @since	2016. 10. 24.
 */
@SuppressWarnings("serial")
public class UserVO extends BaseVO {
	
	/** 현재페이지*/
	private String PAGE;
	/** 리스트 갯수*/
	private String ROW_LIST;
	/** 로우수*/
	private String ROW_SEQ;
	/** 검색된 총 페이지수*/
	private String TOTAL_CNT;
	/** 목록 순번 */
	private String RN;
	/** 목록 총수 */
	private String TOT_CNT;
	/**헤더정렬기준*/
	private String SORTHEADER;
	/**DESC,ASC*/
	private String SORT;
	private String ROLE_ID;

	/** 배열데이터 */
	private List ARRAY_DATA;
	
	private String S_DT;
	private String E_DT;
	

	private String PASSWD_NO;
	private String  LOGIN_ID;
	
	
	private String ROLE_NM;
	
	
	
	public String getROLE_NM() {
		return ROLE_NM;
	}


	public void setROLE_NM(String rOLE_NM) {
		ROLE_NM = rOLE_NM;
	}


	public String getLOGIN_ID() {
		return LOGIN_ID;
	}


	public void setLOGIN_ID(String lOGIN_ID) {
		LOGIN_ID = lOGIN_ID;
	}


	public String getPASSWD_NO() {
		return PASSWD_NO;
	}


	public void setPASSWD_NO(String pASSWD_NO) {
		PASSWD_NO = pASSWD_NO;
	}


	public String getS_DT() {
		return S_DT;
	}


	public void setS_DT(String s_DT) {
		S_DT = s_DT;
	}


	public String getE_DT() {
		return E_DT;
	}


	public void setE_DT(String e_DT) {
		E_DT = e_DT;
	}


	public List getARRAY_DATA() {
		return ARRAY_DATA;
	}


	public void setARRAY_DATA(List aRRAY_DATA) {
		ARRAY_DATA = aRRAY_DATA;
	}

	
	
	/** getter - 결과코드 */
	public String getResult() {
		return get("result");
	}
	/** setter - 결과코드 */
	public void setResult(String result) {
		set("result", result);
	}
	
	/** getter - 결과코드 */
	public String getRet_cd() {
		return get("ret_cd");
	}
	/** setter - 결과코드 */
	public void setRet_cd(String cd) {
		set("ret_cd", cd);
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
	
	
	
	
	/**
	 * getter 사용자ID
	 */
	public String getUSER_ID() {
	    return get("USER_ID");
	}

	/**
	 * setter 사용자ID
	 */
	public void setUSER_ID(String value) {
	    set("USER_ID", value);
	}


	/**
	 * getter 그룹구분
	 */
	public String getUSER_TYPE() {
	    return get("USER_TYPE");
	}

	/**
	 * setter 그룹구분
	 */
	public void setUSER_TYPE(String value) {
	    set("USER_TYPE", value);
	}
	
	/**
	 * getter 그룹명
	 */
	public String getUSER_TYPE_NM() {
	    return get("USER_TYPE_NM");
	}

	/**
	 * setter 그룹명
	 */
	public void setUSER_TYPE_NM(String value) {
	    set("USER_TYPE_NM", value);
	}
	
	  

	/**
	 * getter 사용자명
	 */
	public String getUSER_NM() {
	    return get("USER_NM");
	}

	/**
	 * setter 사용자명
	 */
	public void setUSER_NM(String value) {
	    set("USER_NM", value);
	}


	 
	 


	/**
	 * getter 전화번호
	 */
	public String getPHON_NO() {
	    return get("PHON_NO");
	}

	/**
	 * setter 전화번호
	 */
	public void setPHON_NO(String value) {
	    set("PHON_NO", value);
	}

	/**
	 * getter 휴대폰번호
	 */
	public String getMOBILE_NO() {
	    return get("MOBILE_NO");
	}

	/**
	 * setter 휴대폰번호
	 */
	public void setMOBILE_NO(String value) {
	    set("MOBILE_NO", value);
	}
	
	
	
	/**
	 * getter 첨부파일순번
	 */
	public String getATTCH_FILE_SEQ() {
	    return get("ATTCH_FILE_SEQ");
	} 
	/**
	 * setter 첨부파일순번
	 */
	public void setATTCH_FILE_SEQ(String value) {
	    set("ATTCH_FILE_SEQ", value);
	}
	
	


	/**
	 * getter FAX
	 */
	public String getFAX_NO() {
	    return get("FAX_NO");
	}

	/**
	 * setter FAX
	 */
	public void setFAX_NO(String value) {
	    set("FAX_NO", value);
	}


	/**
	 * getter 이메일
	 */
	public String getEMAIL_ACCNT() {
	    return get("EMAIL_ACCNT");
	}

	/**
	 * setter 이메일
	 */
	public void setEMAIL_ACCNT(String value) {
	    set("EMAIL_ACCNT", value);
	}

 


	/**
	 * getter 사용여부
	 */
	public String getUSE_YN() {
	    return get("USE_YN");
	}

	/**
	 * setter 사용여부
	 */
	public void setUSE_YN(String value) {
	    set("USE_YN", value);
	}


	/**
	 * getter 삭제여부
	 */
	public String getDEL_YN() {
	    return get("DEL_YN");
	}

	/**
	 * setter 삭제여부
	 */
	public void setDEL_YN(String value) {
	    set("DEL_YN", value);
	}

	 
 
	
	
	
	
	/**
	 * getter 승인상태명
	 */
	public String getCONF_NM() {
	    return get("CONF_NM");
	}

	/**
	 * setter 승인상태명
	 */
	public void setCONF_NM(String value) {
	    set("CONF_NM", value);
	}
	
	
	/**
	 * getter 등록일시
	 */
	public String getREG_DTTM() {
	    return get("REG_DTTM");
	}

	/**
	 * setter 등록일시
	 */
	public void setREG_DTTM(String value) {
	    set("REG_DTTM", value);
	}
	
	/**
	 * getter  시작 등록일시
	 */
	public String getS_REG_DTTM() {
	    return get("S_REG_DTTM");
	} 
	/**
	 * setter 시작등록일시
	 */
	public void setS_REG_DTTM(String value) {
	    set("S_REG_DTTM", value);
	}
	
	
	
	/**
	 * getter  끝 등록일시
	 */
	public String getE_REG_DTTM() {
	    return get("E_REG_DTTM");
	}

	/**
	 * setter 끝 등록일시
	 */
	public void setE_REG_DTTM(String value) {
	    set("E_REG_DTTM", value);
	}
	
	


	/**
	 * getter 등록ID
	 */
	public String getREG_ID() {
	    return get("REG_ID");
	}

	/**
	 * setter 등록ID
	 */
	public void setREG_ID(String value) {
	    set("REG_ID", value);
	}


	/**
	 * getter 등록IP
	 */
	public String getREG_IP() {
	    return get("REG_IP");
	}

	/**
	 * setter 등록IP
	 */
	public void setREG_IP(String value) {
	    set("REG_IP", value);
	}


	/**
	 * getter 수정일시
	 */
	public String getUPD_DTTM() {
	    return get("UPD_DTTM");
	}

	/**
	 * setter 수정일시
	 */
	public void setUPD_DTTM(String value) {
	    set("UPD_DTTM", value);
	}


	/**
	 * getter 수정ID
	 */
	public String getUPD_ID() {
	    return get("UPD_ID");
	}

	/**
	 * setter 수정ID
	 */
	public void setUPD_ID(String value) {
	    set("UPD_ID", value);
	}

	
	/**
	 * getter 수정ID명
	 */
	public String getUPD_NM() {
	    return get("UPD_NM");
	}

	/**
	 * setter 수정ID명
	 */
	public void setUPD_NM(String value) {
	    set("UPD_NM", value);
	}
	

	/**
	 * getter 수정IP
	 */
	public String getUPD_IP() {
	    return get("UPD_IP");
	}

	/**
	 * setter 수정IP
	 */
	public void setUPD_IP(String value) {
	    set("UPD_IP", value);
	}

      
 
	
	/**
	 * getter 회사코드
	 */
	public String getCMPNY_CD() {
	    return get("CMPNY_CD");
	} 
	/**
	 * setter 회사코드
	 */
	public void setCMPNY_CD(String value) {
	    set("CMPNY_CD", value);
	}
	
	/**
	 * getter 회사명
	 */
	public String getCMPNY_NM() {
	    return get("CMPNY_NM");
	} 
	/**
	 * setter 회사명
	 */
	public void setCMPNY_NM(String value) {
	    set("CMPNY_NM", value);
	}
 
	
	/**
	 * getter 실제 파일명
	 */
	public String getREAL_FILE_NM() {
	    return get("REAL_FILE_NM");
	} 
	/**
	 * setter 실제 파일명
	 */
	public void setREAL_FILE_NM(String value) {
	    set("REAL_FILE_NM", value);
	}
	
	
	/**
	 * getter 첨부 파일명
	 */
	public String getATTCH_FILE_NM() {
	    return get("ATTCH_FILE_NM");
	} 
	/**
	 * setter 첨부  파일명
	 */
	public void setATTCH_FILE_NM(String value) {
	    set("ATTCH_FILE_NM", value);
	}
	
	/**
	 * getter 첨부 경로
	 */
	public String getATTCH_FILE_PATH() {
	    return get("ATTCH_FILE_PATH");
	} 
	/**
	 * setter 첨부  경로
	 */
	public void setATTCH_FILE_PATH(String value) {
	    set("ATTCH_FILE_PATH", value);
	}
	
	/**
	 * getter 파일 사이즈
	 */
	public String getATTCH_FILE_SIZE() {
	    return get("ATTCH_FILE_SIZE");
	} 
	/**
	 * setter 파일 사이즈
	 */
	public void setATTCH_FILE_SIZE(String value) {
	    set("ATTCH_FILE_SIZE", value);
	}
	public String getPAGE() {
		return PAGE;
	}
	public void setPAGE(String pAGE) {
		PAGE = pAGE;
	}
	public String getROW_LIST() {
		return ROW_LIST;
	}
	public void setROW_LIST(String rOW_LIST) {
		ROW_LIST = rOW_LIST;
	}
	public String getROW_SEQ() {
		return ROW_SEQ;
	}
	public void setROW_SEQ(String rOW_SEQ) {
		ROW_SEQ = rOW_SEQ;
	}
	public String getTOTAL_CNT() {
		return TOTAL_CNT;
	}
	public void setTOTAL_CNT(String tOTAL_CNT) {
		TOTAL_CNT = tOTAL_CNT;
	}
	public String getRN() {
		return RN;
	}
	public void setRN(String rN) {
		RN = rN;
	}
	public String getTOT_CNT() {
		return TOT_CNT;
	}
	public void setTOT_CNT(String tOT_CNT) {
		TOT_CNT = tOT_CNT;
	}
	public String getSORTHEADER() {
		return SORTHEADER;
	}
	public void setSORTHEADER(String sORTHEADER) {
		SORTHEADER = sORTHEADER;
	}
	public String getSORT() {
		return SORT;
	}
	public void setSORT(String sORT) {
		SORT = sORT;
	}
	
	public String getROLE_ID() {
		return ROLE_ID;
	}
	public void setROLE_ID(String rOLE_ID) {
		ROLE_ID = rOLE_ID;
	}
 
  
	
}
