package retail.login.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.login.service.LoginService;
import retail.login.service.LoginVO;


/**
 * @Class Name : LoginServiceImpl.java
 * @Description : 로그인
 * @Modification Information 
 * @author 문희훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("LoginService")
public class LoginServiceImpl  implements LoginService {

	@Autowired
	private LoginDao loginDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginServiceImpl.class);



	/* 로그인
	 * @see retail.login.service.LoginService#login(java.util.HashMap)
	 */
	@Override
	@Transactional
	public void login(HashMap<String, Object> map) throws Exception {
		loginDao.login(map);
	}

	
	/* 비밀번호 변경
	 * @see retail.login.service.LoginService#changeUserPassward(java.util.HashMap)
	 */
	@Override
	@Transactional
	public LoginVO changeUserPassward(HashMap<String, Object> map) throws Exception {
		return loginDao.changeUserPassward(map);
	}


	/* 북마크설정
	 * @see retail.login.service.LoginService#setMyBookMark(java.util.Map)
	 */
	@Override
	@Transactional
	public void setMyBookMark(Map<String, Object> paramMap) throws Exception {
		loginDao.setMyBookMark(paramMap);
	}


	/* 북마크 등록여부 조회
	 * @see retail.login.service.LoginService#getBookMarkStat(java.util.Map)
	 */
	@Override
	@Transactional
	public void getBookMarkStat(Map<String, Object> paramMap) throws Exception {
		loginDao.getBookMarkStat(paramMap);
	}



}
