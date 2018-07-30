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
 


import retail.order.store.service.OrderStoreR3Service;
import retail.order.store.service.OrderStoreR3VO; 


/**
 * @Class Name : OrderStoreR3ServiceImpl.java
 * @Description : OrderStoreR3ServiceImpl Class
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

@Service("OrderStoreR3Service")
public class OrderStoreR3ServiceImpl  implements OrderStoreR3Service {

	@Autowired
	private OrderStoreR3Dao orderStoreR3Dao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrderStoreServiceImpl.class);

	@Override
	public List<Map<String, Object>> orderStoreProductSelectR3(Map<String, Object> param) throws Exception {
		return orderStoreR3Dao.orderStoreProductSelectR3(param);
	}
	
	@Override
	public List<Map<String, Object>> getCommonMgmtEntryR3(Map<String, Object> param) throws Exception {
		return orderStoreR3Dao.getCommonMgmtEntryR3(param);
	}
	

	@Override
	public List<Map<String, Object>> orderHeadSearchR3(Map<String, Object> param) throws Exception {
		return orderStoreR3Dao.orderHeadSearchR3(param);
	}

	

	@Override
	@Transactional
	public List<Map<String, Object>> orderStoreProductRegisterR3(  Map<String, Object> param) throws Exception { 
		return orderStoreR3Dao.orderStoreProductRegisterR3(param);
	}

	@Override
	public List<Map<String, Object>> orderHeadInfoR3(Map<String, Object> param) throws Exception {
		return orderStoreR3Dao.orderHeadInfoR3(param);
	}
	
	@Override
	public List<Map<String, Object>> orderDetailInfoR3(Map<String, Object> param) throws Exception {
		return orderStoreR3Dao.orderDetailInfoR3(param);
	}
	
	
	@Override
	@Transactional
	public List<Map<String, Object>> orderDelR3(  Map<String, Object> param) throws Exception { 
		return orderStoreR3Dao.orderDelR3(param);
	}

	
 
}
