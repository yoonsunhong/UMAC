package retail.common.service;

import retail.common.BaseVO;

/**
 * @project	RETAIL
 * @file	FileVO.java
 * @comment 첨부파일
 * <pre>
 * </pre>
 *
 * @author	문희훈
 * @since	2016. 10. 24.
 */
@SuppressWarnings("serial")
public class FileVO extends BaseVO {
	
	
	/**
	 * getter 순번
	 */
	public String getSEQNO() {
	    return get("SEQNO");
	}

	/**
	 * setter 순번
	 */
	public void setSEQNO(String value) {
	    set("SEQNO", value);
	}

 

	/**
	 * getter 키1
	 */
	public String getKEY1() {
	    return get("KEY1");
	}

	/**
	 * setter 키1
	 */
	public void setKEY1(String value) {
	    set("KEY1", value);
	}


	/**
	 * getter 키2
	 */
	public String getKEY2() {
	    return get("KEY2");
	}

	/**
	 * setter 키2
	 */
	public void setKEY2(String value) {
	    set("KEY2", value);
	}


	/**
	 * getter 키3
	 */
	public String getKEY3() {
	    return get("KEY3");
	}

	/**
	 * setter 키3
	 */
	public void setKEY3(String value) {
	    set("KEY3", value);
	}


	/**
	 * getter 키4
	 */
	public String getKEY4() {
	    return get("KEY4");
	}

	/**
	 * setter 키4
	 */
	public void setKEY4(String value) {
	    set("KEY4", value);
	}


	/**
	 * getter 키5
	 */
	public String getKEY5() {
	    return get("KEY5");
	}

	/**
	 * setter 키5
	 */
	public void setKEY5(String value) {
	    set("KEY5", value);
	}


	/**
	 * getter 키6
	 */
	public String getKEY6() {
	    return get("KEY6");
	}

	/**
	 * setter 키6
	 */
	public void setKEY6(String value) {
	    set("KEY6", value);
	}


	/**
	 * getter 키7
	 */
	public String getKEY7() {
	    return get("KEY7");
	}

	/**
	 * setter 키7
	 */
	public void setKEY7(String value) {
	    set("KEY7", value);
	}


	/**
	 * getter 구분
	 */
	public String getGUBUN() {
	    return get("GUBUN");
	}

	/**
	 * setter 구분
	 */
	public void setGUBUN(String value) {
	    set("GUBUN", value);
	}


	/**
	 * getter 파일경로
	 */
	public String getFILE_LOC() {
	    return get("FILE_LOC");
	}

	/**
	 * setter 파일경로
	 */
	public void setFILE_LOC(String value) {
	    set("FILE_LOC", value);
	}


	/**
	 * getter 파일명
	 */
	public String getFILE_NM() {
	    return get("FILE_NM");
	}

	/**
	 * setter 파일명
	 */
	public void setFILE_NM(String value) {
	    set("FILE_NM", value);
	}


	/**
	 * getter 파일확장자
	 */
	public String getFILE_EXT() {
	    return get("FILE_EXT");
	}

	/**
	 * setter 파일확장자
	 */
	public void setFILE_EXT(String value) {
	    set("FILE_EXT", value);
	}


	/**
	 * getter 파일크기
	 */
	public Integer getFILE_SIZE() {
	    return get("FILE_SIZE");
	}

	/**
	 * setter 파일크기
	 */
	public void setFILE_SIZE(Integer value) {
	    set("FILE_SIZE", value);
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
	 * getter 파일경로
	 */
	public String getFILE_PATH() {
	    return get("FILE_PATH");
	}
	/**
	 * setter 파일경로
	 */
	public void setFILE_PATH(String value) {
	    set("FILE_PATH", value);
	}
	
	/**
	 * getter MIME_TYPE
	 */
	public String getMIME_TYPE() {
	    return get("MIME_TYPE");
	}
	/**
	 * setter MIME_TYPE
	 */
	public void setMIME_TYPE(String value) {
	    set("MIME_TYPE", value);
	}
	
	/**
	 * getter ORG_FILE_NM
	 */
	public String getORG_FILE_NM() {
	    return get("ORG_FILE_NM");
	}
	/**
	 * setter ORG_FILE_NM
	 */
	public void setORG_FILE_NM(String value) {
	    set("ORG_FILE_NM", value);
	}
	
	
	/**
	 * getter FILE_OWNER
	 */
	public String getFILE_OWNER() {
	    return get("FILE_OWNER");
	}
	/**
	 * setter FILE_OWNER
	 */
	public void setFILE_OWNER(String value) {
	    set("FILE_OWNER", value);
	}
	
	/**
	 * getter USER_TYPE
	 */
	public String getUSER_TYPE() {
	    return get("USER_TYPE");
	}
	/**
	 * setter USER_TYPE
	 */
	public void setUSER_TYPE(String value) {
	    set("USER_TYPE", value);
	}
	
	

}
