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
package retail.order.store.service.impl;

import java.util.HashMap;
import java.util.List;
  
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
 


import retail.order.store.service.OrderStoreR2Service;
import retail.order.store.service.OrderStoreR2VO; 


/**
 * @Class Name : OrderStoreR2ServiceImpl.java
 * @Description : OrderStoreR2ServiceImpl Class
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

@Service("OrderStoreR2Service")
public class OrderStoreR2ServiceImpl  implements OrderStoreR2Service {

	@Autowired
	private OrderStoreR2Dao orderStoreR2Dao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrderStoreServiceImpl.class);

	@Override
	public List<Map<String, Object>> orderStoreProductSelectR2(Map<String, Object> param) throws Exception {
		return orderStoreR2Dao.orderStoreProductSelectR2(param);
	}
	
	@Override
	public List<Map<String, Object>> getCommonMgmtEntryR2(Map<String, Object> param) throws Exception {
		return orderStoreR2Dao.getCommonMgmtEntryR2(param);
	}
	

	@Override
	public List<Map<String, Object>> orderHeadSearchR2(Map<String, Object> param) throws Exception {
		return orderStoreR2Dao.orderHeadSearchR2(param);
	}

	

	@Override
	@Transactional
	public List<Map<String, Object>> orderStoreProductRegisterR2(  Map<String, Object> param) throws Exception { 
		return orderStoreR2Dao.orderStoreProductRegisterR2(param);
	}

	@Override
	public List<Map<String, Object>> orderHeadInfoR2(Map<String, Object> param) throws Exception {
		return orderStoreR2Dao.orderHeadInfoR2(param);
	}
	
	@Override
	public List<Map<String, Object>> orderDetailInfoR2(Map<String, Object> param) throws Exception {
		return orderStoreR2Dao.orderDetailInfoR2(param);
	}
	
	
	@Override
	@Transactional
	public List<Map<String, Object>> orderDelR2(  Map<String, Object> param) throws Exception { 
		return orderStoreR2Dao.orderDelR2(param);
	}

	
 
}