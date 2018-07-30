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
package retail.menurole.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.menurole.service.MenuRoleService;


/**
 * @Class Name : MenuRoleServiceImpl.java
 * @Description : 사용자 기능별 권한관리
 * @Modification Information
 * @ 수정일				수정자			수정내용
 * @ ---------   		---------   -------------------------------
 * @ 2017.12.18       mhh    		최초생성
 * @author mhh
 * @since 2017.12.18
 * @version 1.0
 * @see
 *  Copyright (C) by Retailtech All right reserved.
 */

@Service("MenuRoleService")
public class MenuRoleServiceImpl  implements MenuRoleService {

	@Autowired
	private MenuRoleDao menuRoleDao;

	private static final Logger LOGGER = LoggerFactory.getLogger(MenuRoleServiceImpl.class);

	/* 사용자 리스트 조회
	 * @see retail.menurole.service.MenuRoleService#getUserRoleList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getUserRoleList(Map<String, Object> paramMap) throws Exception {
		menuRoleDao.getUserRoleList(paramMap);
	}

	/* 부서 리스트박스 조회
	 * @see retail.menurole.service.MenuRoleService#getDeptCodeList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getDeptCodeList(Map<String, Object> paramMap) throws Exception {
		menuRoleDao.getDeptCodeList(paramMap);
		
	}
	
	/* 사용자 기능별 권한 리스트 조회
	 * @see retail.menurole.service.MenuRoleService#getUserMenuRoleList(java.util.Map)
	 */
	@Override
	@Transactional
	public List<Map<String, Object>> getUserMenuRoleList(Map<String, Object> param) throws Exception {
		return menuRoleDao.getUserMenuRoleList(param);
	}

	/* 메뉴별 권한 복사 등록 실행 DELETE/SELECT/INSERT
	 * @see retail.menurole.service.MenuRoleService#copyUserRoleList(java.util.Map)
	 */
	@Override
	@Transactional
	public void copyUserRoleList(Map<String, Object> param) throws Exception {
		menuRoleDao.copyUserRoleList(param);
	}
	
	/*사용자 메뉴별 권한 저장
	 * @see retail.menurole.service.MenuRoleService#userMenuRoleUpdate(java.util.Map)
	 */
	@Override
	@Transactional
	public void userMenuRoleUpdate(Map<String, Object> param) throws Exception {
		menuRoleDao.userMenuRoleUpdate(param);
	}

	
	
}
