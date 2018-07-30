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
package retail.inoutcenter.mng.service.impl;

import java.util.HashMap;
import java.util.List;
  
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
  

import retail.inoutcenter.mng.service.InOutCenterMngDeleteService;
import retail.inoutcenter.mng.service.InOutCenterMngDeleteVO; 
 

/**
 * @Class Name : InOutCenterMngDeleteServiceImpl.java
 * @Description : InOutCenterMngDeleteServiceImpl Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.12.05           최초생성
 *
 * @author 유재훈
 * @since 2016.12.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("InOutCenterMngDeleteService")
public class InOutCenterMngDeleteServiceImpl  implements InOutCenterMngDeleteService {

	@Autowired
	private InOutCenterMngDeleteDao inOutCenterMngDeleteDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(InOutCenterMngDeleteServiceImpl.class);

	
	
 
	@Override
	public List<Map<String, Object>> inOutCenterHeadSearchDelete(Map<String, Object> param) throws Exception {
		return inOutCenterMngDeleteDao.inOutCenterHeadSearchDelete(param);
	}
 
 
  
	@Override
	public List<Map<String, Object>> inOutCenterDetailInfoDelete(Map<String, Object> param) throws Exception {
		return inOutCenterMngDeleteDao.inOutCenterDetailInfoDelete(param);
	}
 
  
	@Override
	@Transactional
	public List<Map<String, Object>> inoutCenterDeleteAll(  Map<String, Object> param) throws Exception { 
		return inOutCenterMngDeleteDao.inoutCenterDeleteAll(param);
	}
 
	
	@Override
	@Transactional
	public List<Map<String, Object>> inOutCenterConfirmCancel(  Map<String, Object> param) throws Exception { 
		return inOutCenterMngDeleteDao.inOutCenterConfirmCancel(param);
	}
	
	
	
//	@Override
//	@Transactional
//	public List<Map<String, Object>> inOutRegister(  Map<String, Object> param) throws Exception { 
//		return inOutCenterMngDao.inOutRegister(param);
//	}
 
  


	
	 
	
 
}