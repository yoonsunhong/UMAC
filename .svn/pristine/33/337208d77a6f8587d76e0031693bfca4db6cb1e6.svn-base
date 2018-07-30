/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package retail.user.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.user.service.UserService;


/**
 * 사용자관리 관리
 * @author 문희훈
 * @since 2016. 12.23
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("UserService")
public class UserServiceImpl  implements UserService {

	@Autowired
	private UserDao userDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);


	/* 사용자 목록 조회
	 * @see retail.user.service.UserService#getUserList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getUserList(Map<String, Object> paramMap) throws Exception {
		userDao.getUserList(paramMap);
	}


	/* 사용자정보 상세조회
	 * @see retail.user.service.UserService#getUserDetail(java.util.Map)
	 */
	@Override
	@Transactional
	public void getUserDetail(Map<String, Object> paramMap) throws Exception {
		userDao.getUserDetail(paramMap);
	}


	/* 아이디 중복검사
	 * @see retail.user.service.UserService#selectCountUserId(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectCountUserId(Map<String, Object> paramMap) throws Exception {
		userDao.selectCountUserId(paramMap);
	}


	/* 사용자 정보 등록/수정
	 * @see retail.user.service.UserService#setUserInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void setUserInfo(Map<String, Object> paramMap) throws Exception {
		userDao.setUserInfo(paramMap);
	}


	/* 사원비밀번호 초기화
	 * @see retail.user.service.UserService#resetUserPassWd(java.util.Map)
	 */
	@Override
	@Transactional
	public void resetUserPassWd(Map<String, Object> paramMap) throws Exception {
		userDao.resetUserPassWd(paramMap);
	}

	 
	
 
}
