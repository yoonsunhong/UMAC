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
package retail.menu.service.impl;

import java.util.ArrayList;
import java.util.List;
 



import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.menu.service.MenuService;
import retail.menu.service.MenuVO; 


/**
 * @Class Name : MenuService.java
 * @Description : MenuService Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.12.05           최초생성
 *
 * @author 문희훈
 * @since 2016.12.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("MenuService")
public class MenuServiceImpl  implements MenuService {

	@Autowired
	private MenuDao menuDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MenuServiceImpl.class);

	 
	
	/* 메뉴관리 목록 조회
	 * @see retail.menu.service.MenuService#getMenuTree(java.util.Map)
	 */
	@Override
	@Transactional
	public void getMenuTree(Map<String, Object> paramMap) throws Exception { 
		menuDao.getMenuTree(paramMap);
	}
	
	/* 메뉴 정보 업데이트
	 * @see retail.menu.service.MenuService#updateMenuInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void updateMenuInfo(Map<String, Object> paramMap) throws Exception { 
		menuDao.updateMenuInfo(paramMap);
	}
	
	/* 메뉴정보 신규 등록
	 * @see retail.menu.service.MenuService#insertMenuInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void insertMenuInfo(Map<String, Object>  paramMap) throws Exception { 
		menuDao.insertMenuInfo(paramMap);
	}
	
	/* 메뉴정보 삭제
	 * @see retail.menu.service.MenuService#deleteMenuInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteMenuInfo(Map<String, Object>  paramMap) throws Exception { 
		menuDao.deleteMenuInfo(paramMap);
	}

	/* 메뉴 도움말 정보 조회
	 * @see retail.menu.service.MenuService#selectMenuBigo(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectMenuBigo(Map<String, Object>  paramMap) throws Exception {
		menuDao.selectMenuBigo(paramMap);
	}
 
}
