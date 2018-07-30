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
 


import retail.order.store.service.OrderStoreR1BuyerService;
import retail.order.store.service.OrderStoreR1BuyerVO; 


/**
 * @Class Name : OrderStoreR1BuyererviceImpl.java
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

@Service("OrderStoreR1BuyerService")
public class OrderStoreR1BuyerServiceImpl  implements OrderStoreR1BuyerService {

	@Autowired
	private OrderStoreR1BuyerDao orderStoreR1BuyerDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrderStoreServiceImpl.class);

	@Override
	public List<Map<String, Object>> orderStoreProductSelectR1Buyer(Map<String, Object> param) throws Exception {
		return orderStoreR1BuyerDao.orderStoreProductSelectR1Buyer(param);
	}
	
	@Override
	public List<Map<String, Object>> getCommonMgmtEntryR1Buyer(Map<String, Object> param) throws Exception {
		return orderStoreR1BuyerDao.getCommonMgmtEntryR1Buyer(param);
	}
	

	@Override
	public List<Map<String, Object>> orderHeadSearchR1Buyer(Map<String, Object> param) throws Exception {
		return orderStoreR1BuyerDao.orderHeadSearchR1Buyer(param);
	}

	

	@Override
	@Transactional
	public List<Map<String, Object>> orderStoreProductRegisterR1Buyer(  Map<String, Object> param) throws Exception { 
		return orderStoreR1BuyerDao.orderStoreProductRegisterR1Buyer(param);
	}

	@Override
	public List<Map<String, Object>> orderHeadInfoR1Buyer(Map<String, Object> param) throws Exception {
		return orderStoreR1BuyerDao.orderHeadInfoR1Buyer(param);
	}
	
	@Override
	public List<Map<String, Object>> orderDetailInfoR1Buyer(Map<String, Object> param) throws Exception {
		return orderStoreR1BuyerDao.orderDetailInfoR1Buyer(param);
	}
	
	
	@Override
	@Transactional
	public List<Map<String, Object>> orderDelR1Buyer(  Map<String, Object> param) throws Exception { 
		return orderStoreR1BuyerDao.orderDelR1Buyer(param);
	}

	
 
}
