package retail.common;

import net.winis.common.shared.model.WisModelData;

/**
 * @project	RETAIL
 * @file	BaseVO.java
 * @comment
 * <pre>
 * </pre>
 *
 * @author	문희훈
 * @since	2016. 10. 31.
 */
@SuppressWarnings("serial")
public class BaseVO extends WisModelData {

	
	/** getter - 결과코드 */
	public String getRet_cd() {
		return get("ret_cd");
	}
	/** setter - 결과코드 */
	public void setRet_cd(String cd) {
		set("ret_cd", cd);
	}
	
	/** getter - 결과메세지 */
	public String getRet_msg() {
		return get("ret_msg");
	}
	/** setter - 결과메세지 */
	public void setRet_msg(String msg) {
		set("ret_msg", msg);
	}
	
	/** 결과코드 및 메세지 설정 */
	public void setResult(String ercd, String erMsg) {
		setRet_cd(ercd);
		setRet_msg(erMsg);
	}
	
	/** getter - 총row건수 */
	public Integer getTotCnt() {
	    return get("totCnt");
	}
	/** setter - 총row건수 */
	public void setTotCnt(Integer value) {
	    set("totCnt", value);
	}

	/** getter - 시작전 row */
	public Integer getOffset() {
		return get("offset");
	}
	/** setter - 시작전 row */
	public void setOffset(Integer offset) {
		set("offset", offset);
	}
	
	/** getter - 최대 row */
	public Integer getLimit() {
		return get("limit");
	}
	/** setter - 최대 row */
	public void setLimit(Integer limit) {
		set("limit", limit);
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
	 * getter 사용자IP
	 */
	public String getUSER_IP() {
		return get("USER_IP");
	}
	
	/**
	 * setter 사용자IP
	 */
	public void setUSER_IP(String value) {
		set("USER_IP", value);
	}
}
