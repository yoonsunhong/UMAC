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

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;


/**
 * 사용자관리 관리
 * @author 문희훈
 * @since 2016. 12.23
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("UserDao")
public class UserDao extends EgovAbstractDAO {

	/**
	 * 사용자 목록 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getUserList(Map<String, Object> paramMap) throws Exception{
		select("user.getUserList", paramMap);
	}

	/**
	 * 사용자정보 상세조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getUserDetail(Map<String, Object> paramMap)  throws Exception{
		select("user.getUserDetail", paramMap);
	}

	/**
	 * 아이디 중복검사
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectCountUserId(Map<String, Object> paramMap) throws Exception{
		select("user.selectCountUserId", paramMap);
	}

	/**
	 * 사용자 정보 등록/수정
	 * @param paramMap
	 * @throws Exception
	 */
	public void setUserInfo(Map<String, Object> paramMap) throws Exception{
		update("user.setUserInfo", paramMap);
	}

	/**
	 * 사원비밀번호 초기화
	 * @param paramMap
	 * @throws Exception
	 */
	public void resetUserPassWd(Map<String, Object> paramMap)  throws Exception{
		update("user.resetUserPassWd", paramMap);
	}

	
}
