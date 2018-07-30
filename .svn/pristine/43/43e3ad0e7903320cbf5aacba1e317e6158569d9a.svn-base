package retail.login.service.impl;

import java.util.HashMap;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

import retail.login.service.LoginVO;

/**
 * @Class Name : LoginDao.java
 * @Description : 로그인
 * @Modification Information 
 * @author 문희훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@SuppressWarnings("unchecked")
@Repository("LoginDao")
public class LoginDao extends EgovAbstractDAO {

	public void login(HashMap<String, Object> map) throws Exception{
		 select("login.login", map);
	}

	/**
	 * 비밀번호 변경
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public LoginVO changeUserPassward(HashMap<String, Object> map) throws Exception{
		return (LoginVO) select("login.changeUserPassward", map);
	}

	/**
	 * 북마크 설정
	 * @param paramMap
	 */
	public void setMyBookMark(Map<String, Object> paramMap) throws Exception{
		insert("login.setMyBookMark", paramMap);
	}

	/**
	 * 북마크 등록여부 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getBookMarkStat(Map<String, Object> paramMap)  throws Exception{
		select("login.getBookMarkStat", paramMap);		
	}
}
