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
package retail.purch.mng.service.impl;

import java.util.HashMap;
import java.util.List;
  
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
  



import retail.purch.mng.service.PurchMngService;
import retail.purch.mng.service.PurchMngVO; 


/**
 * @Class Name : PurchMngServiceImpl.java
 * @Description : PurchMngServiceImpl Class
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
 
@Service("PurchMngService")
public class PurchMngServiceImpl  implements PurchMngService {

	@Autowired
	private PurchMngDao purchMngDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PurchMngServiceImpl.class);

	
	

	@Override
	public List<Map<String, Object>> purchHeadSearch(Map<String, Object> param) throws Exception {
		return purchMngDao.purchHeadSearch(param);
	}
	
	
	@Override
	public List<Map<String, Object>> purchDetailInfo(Map<String, Object> param) throws Exception {
		return purchMngDao.purchDetailInfo(param);
	}
	
	

	@Override
	@Transactional
	public List<Map<String, Object>> purchRegister(  Map<String, Object> param) throws Exception { 
		return purchMngDao.purchRegister(param);
	}
	
	@Override
	@Transactional
	public List<Map<String, Object>> purchRegisterAmt(  Map<String, Object> param) throws Exception { 
		return purchMngDao.purchRegisterAmt(param);
	}
	
	@Override
	@Transactional
	public List<Map<String, Object>> jobOrderToPurch(  Map<String, Object> param) throws Exception { 
		return purchMngDao.jobOrderToPurch(param);
	}
	
	@Override
	@Transactional
	public List<Map<String, Object>> purchConfirm(  Map<String, Object> param) throws Exception { 
		return purchMngDao.purchConfirm(param);
	}


	/**
	 *시세정보등록 관리 List
	 */
	public Map<String, Object> selectPurchMarketPrice(Map<String, Object> param) throws Exception {
		return purchMngDao.selectPurchMarketPrice(param);
	}


	/**
	 *시세정보등록 관리 Insert
	 */
	public Map<String, Object> insertPurchMarketPrice(Map<String, Object> param) throws Exception {
		return purchMngDao.insertPurchMarketPrice(param);
	}
	
	/**
	 *시세정보등록 관리 DEL
	 */
	public Map<String, Object> deletePurchMarketPrice(Map<String, Object> param) throws Exception {
		return purchMngDao.deletePurchMarketPrice(param);
	}


	@Override
	public List<Map<String, Object>> purchStoreChitStatusList(Map<String, Object> param) throws Exception {
		return purchMngDao.purchStoreChitStatusList(param);
	}


	@Override
	public List<Map<String, Object>> purchStoreChitStatusDetail(Map<String, Object> param) throws Exception {
		return purchMngDao.purchStoreChitStatusDetail(param);
	}

	
	@Override
	@Transactional
	public List<Map<String, Object>> purchDel(  Map<String, Object> param) throws Exception { 
		return purchMngDao.purchDel(param);
	}
	 

	
 
}
