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
package retail.auth.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.auth.service.AuthService;
import retail.auth.service.AuthVO;


/**
 * @Class Name : AuthServiceImpl.java
 * @Description : 권한그룹 설정
 * @Modification Information
 * @ 수정일				수정자			수정내용
 * @ ---------   		---------   -------------------------------
 * @ 2016.12.05       문희훈    		최초생성
 * @author 문희훈
 * @since 2016.12.05
 * @version 1.0
 * @see
 *  Copyright (C) by Retailtech All right reserved.
 */

@Service("AuthService")
public class AuthServiceImpl  implements AuthService {

	@Autowired
	private AuthDao authDao;

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthServiceImpl.class);

	/* 권한그룹 목록 조회
	 * @see retail.auth.service.AuthService#readAthGroupList(java.util.Map)
	 */
	@Override
	@Transactional
	public void readAthGroupList(Map<String, Object> paramMap) throws Exception {
		authDao.readAthGroupList(paramMap);
	}
	
	/* 사용가능 메뉴 목록조회
	 * @see retail.auth.service.AuthService#readAppointMenuList(java.util.Map)
	 */
	@Override
	@Transactional
	public void readAppointMenuList(Map<String, Object> paramMap) throws Exception {
		authDao.readAppointMenuList(paramMap);
	}
	
	/**
	 * 사용불가메뉴 목록 조회
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@Override
	@Transactional
	public void notAppointMenuList(Map<String, Object> paramMap) throws Exception {
		authDao.notAppointMenuList(paramMap);
	}
	
	/* 권한그룹 아이디 생성
	 * @see retail.auth.service.AuthService#selectAthGroupId(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectAthGroupId(Map<String, Object> paramMap) throws Exception {
		 authDao.selectAthGroupId(paramMap);
	}

	/* 권한그룹 추가(관리자,사용자등의 권한)
	 * @see retail.auth.service.AuthService#insertAth(java.util.Map)
	 */
	@Override
	@Transactional
	public void insertAth(Map<String, Object> paramMap) throws Exception {
		authDao.insertAth(paramMap);
	}
	
	/* 권한에 사용할  메뉴 등록
	 * @see retail.auth.service.AuthService#saveAth(java.util.Map)
	 */
	@Override
	@Transactional
	public void saveAth(Map<String, Object> paramMap) throws Exception {
		authDao.saveAth(paramMap);
	}
	
	
	/* 권한명, 비고, 사용유무등 수정
	 * @see retail.auth.service.AuthService#updateAth(java.util.Map)
	 */
	@Override
	@Transactional
	public void updateAth(Map<String, Object> paramMap) throws Exception {
		authDao.updateAth(paramMap);
	}
	
	/* 권한에 지정된  메뉴 삭제
	 * @see retail.auth.service.AuthService#deleteAth(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteAth(Map<String, Object> paramMap) throws Exception {
		authDao.deleteAth(paramMap);
	}
	
	
	/* 권한 그룹 삭제
	 * @see retail.auth.service.AuthService#deleteAthGroup(retail.auth.service.AuthVO)
	 */
	@Override
	@Transactional
	public void deleteAthGroup(Map<String, Object> paramMap) throws Exception {
		authDao.deleteAthGroup(paramMap);
	}

	

	
	
}
