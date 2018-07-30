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
package retail.groupGridTest.service.impl;

import java.util.HashMap;
import java.util.List;
 


import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.groupGridTest.service.GroupGridTestService;
import retail.groupGridTest.service.GroupGridTestVO; 


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

@Service("GroupGridTestService")
public class GroupGridTestServiceImpl  implements GroupGridTestService {

	@Autowired
	private GroupGridTestDao groupGridTestDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(GroupGridTestServiceImpl.class);

	 
	
	@Override
	@Transactional
	public List<GroupGridTestVO> groupGridTest(  Map<String, Object> paramMap) throws Exception { 
		return groupGridTestDao.groupGridTest(paramMap);
	}
	
//	@Override
//	@Transactional
//	public List<GroupGridTestVO> getMenuTree(GroupGridTestVO params) throws Exception { 
//		return groupGridTestDao.getMenuTree(params);
//	}
//	
//	@Override
//	@Transactional
//	public Integer updateMenuInfo(GroupGridTestVO params) throws Exception { 
//		return groupGridTestDao.updateMenuInfo(params);
//	}
//	
//	@Override
//	@Transactional
//	public Integer insertMenuInfo(GroupGridTestVO params) throws Exception { 
//		return groupGridTestDao.insertMenuInfo(params);
//	}
//	
//	@Override
//	@Transactional
//	public Integer deleteMenuInfo(GroupGridTestVO params) throws Exception { 
//		return groupGridTestDao.deleteMenuInfo(params);
//	}
//
//	@Override
//	@Transactional
//	public String selectMenuBigo(GroupGridTestVO params) throws Exception {
//		return  groupGridTestDao.selectMenuBigo(params);
//	}
	
	
	
	
 
}
