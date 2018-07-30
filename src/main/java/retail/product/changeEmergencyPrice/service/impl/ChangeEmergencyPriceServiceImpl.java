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
package retail.product.changeEmergencyPrice.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.product.changeEmergencyPrice.service.ChangeEmergencyPriceService;




/**
 * 긴급매가변경
 * @author 문희훈
 * @since 2017. 04.27
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("ChangeEmergencyPriceService")
public class ChangeEmergencyPriceServiceImpl  implements ChangeEmergencyPriceService {

	@Autowired
	private ChangeEmergencyPriceDao stockChangeDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ChangeEmergencyPriceServiceImpl.class);


	/* 긴급매가변경 조회
	 * @see retail.product.changeEmergencyPrice.service.ChangeEmergencyPriceService#getChangePriceInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void getChangePriceInfo(Map<String, Object> param) throws Exception {
		stockChangeDao.getChangePriceInfo(param);
	}

	
	/* 긴급매가변경중복 등록 체크 
	 * @see retail.product.changeEmergencyPrice.service.ChangeEmergencyPriceService#checkChangePriceInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void checkChangePriceInfo(Map<String, Object> param) throws Exception {
		stockChangeDao.checkChangePriceInfo(param);
	}


	/* 긴급매가변경 등록 
	 * @see retail.product.changeEmergencyPrice.service.ChangeEmergencyPriceService#insertChangePriceInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void insertChangePriceInfo(Map<String, Object> param) throws Exception {
		stockChangeDao.insertChangePriceInfo(param);
	}


	/* 긴급매가변경 수정
	 * @see retail.product.changeEmergencyPrice.service.ChangeEmergencyPriceService#updateChangePriceInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void updateChangePriceInfo(Map<String, Object> param) 	throws Exception {
		stockChangeDao.updateChangePriceInfo(param);
	}


	/* POS데이터 생성
	 * @see retail.product.changeEmergencyPrice.service.ChangeEmergencyPriceService#updateChangePriceInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void posMasterSend(Map<String, Object> param) 	throws Exception {
		stockChangeDao.posMasterSend(param);
	}
	
	/* //POS데이터 생성 이전 당일 긴급매가 복원
	 * @see retail.product.changeEmergencyPrice.service.ChangeEmergencyPriceService#updateChangePriceInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void changeEmergency_Re(Map<String, Object> param) 	throws Exception {
		stockChangeDao.changeEmergency_Re(param);
	}
	
	
}
