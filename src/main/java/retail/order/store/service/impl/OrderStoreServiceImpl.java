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
 


import retail.order.store.service.OrderStoreService;
import retail.order.store.service.OrderStoreVO; 


/**
 * @Class Name : ProductBoxServiceImpl.java
 * @Description : ProductBoxServiceImpl Class
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

@Service("OrderStoreService")
public class OrderStoreServiceImpl  implements OrderStoreService {

	@Autowired
	private OrderStoreDao orderStoreDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrderStoreServiceImpl.class);

	@Override
	public List<Map<String, Object>> orderStoreProductSelect(Map<String, Object> param) throws Exception {
		return orderStoreDao.orderStoreProductSelect(param);
	}
	
	@Override
	public List<Map<String, Object>> getCommonMgmtEntry(Map<String, Object> param) throws Exception {
		return orderStoreDao.getCommonMgmtEntry(param);
	}
	

	@Override
	public List<Map<String, Object>> orderHeadSearch(Map<String, Object> param) throws Exception {
		return orderStoreDao.orderHeadSearch(param);
	}

	

	@Override
	@Transactional
	public List<Map<String, Object>> orderStoreProductRegister(  Map<String, Object> param) throws Exception { 
		return orderStoreDao.orderStoreProductRegister(param);
	}

	@Override
	public List<Map<String, Object>> orderHeadInfo(Map<String, Object> param) throws Exception {
		return orderStoreDao.orderHeadInfo(param);
	}
	
	@Override
	public List<Map<String, Object>> orderDetailInfo(Map<String, Object> param) throws Exception {
		return orderStoreDao.orderDetailInfo(param);
	}
	
	
	@Override
	@Transactional
	public List<Map<String, Object>> orderDel(  Map<String, Object> param) throws Exception { 
		return orderStoreDao.orderDel(param);
	}

	@Override
	public List<Map<String, Object>> getVenInfoR1(Map<String, Object> param) throws Exception {
		return orderStoreDao.getVenInfoR1(param);
	}
	
	@Override
	public List<Map<String, Object>> getCentaCode(Map<String, Object> param) throws Exception {
		return orderStoreDao.getCentaCode(param);
	}
	
	
	
	
	
}
