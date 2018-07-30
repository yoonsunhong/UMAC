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
package retail.product.customer.service.impl;

import java.util.HashMap;
import java.util.List;
  
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.groupGridTest.service.GroupGridTestVO;
import retail.product.customer.service.ProductCustomerService;
import retail.product.customer.service.ProductCustomerVO; 


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

@Service("ProductCustomerService")
public class ProductCustomerServiceImpl  implements ProductCustomerService {

	@Autowired
	private ProductCustomerDao productCustomerDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductCustomerServiceImpl.class);

	 
	 
	
	@Override
	@Transactional
	public List<ProductCustomerVO> productCustomerVenCodeDup(  Map<String, Object> paramMap) throws Exception { 
		return productCustomerDao.productCustomerVenCodeDup(paramMap);
	}
	
	@Override
	@Transactional
	public List<ProductCustomerVO> productCustomerBusiNoDup(  Map<String, Object> paramMap) throws Exception { 
		return productCustomerDao.productCustomerBusiNoDup(paramMap);
	}
	
	
	@Override
	@Transactional
	public List<ProductCustomerVO> purSectionStdPrice(  Map<String, Object> paramMap) throws Exception { 
		return productCustomerDao.purSectionStdPrice(paramMap);
	}
	
//	@Override
//	@Transactional
//	public List<ProductCustomerVO> productCustomerRegister(  Map<String, Object> paramMap) throws Exception { 
//		return productCustomerDao.productCustomerRegister(paramMap);
//	}
	
	@Override
	@Transactional
	public List<Map<String, Object>> productCustomerRegister(  Map<String, Object> param) throws Exception { 
		return productCustomerDao.productCustomerRegister(param);
	}
	
 
	
	
	@Override
	public List<Map<String, Object>> productCustomerList(Map<String, Object> param) throws Exception {
		return productCustomerDao.productCustomerList(param);
	}
	
	@Override
	public List<Map<String, Object>> productCustomerInfoSelect(Map<String, Object> param) throws Exception {
		return productCustomerDao.productCustomerInfoSelect(param);
	}
	
	@Override
	public List<Map<String, Object>> getPayMgmtEntry(Map<String, Object> param) throws Exception {
		return productCustomerDao.getPayMgmtEntry(param);
	}
	

	@Override
	public List<Map<String, Object>> productCustomerPyPayNumList(Map<String, Object> param) throws Exception {
		return productCustomerDao.productCustomerPyPayNumList(param);
	}
	
	@Override
	public List<Map<String, Object>> productCustomerPyPayRateList(Map<String, Object> param) throws Exception {
		return productCustomerDao.productCustomerPyPayRateList(param);
	}
	
	@Override
	public List<Map<String, Object>> productCustomerPyExclItemList(Map<String, Object> param) throws Exception {
		return productCustomerDao.productCustomerPyExclItemList(param);
	}
	
	@Override
	public List<Map<String, Object>> productCustomerCdSupplyPsnList(Map<String, Object> param) throws Exception {
		return productCustomerDao.productCustomerCdSupplyPsnList(param);
	}
	
	
	@Override
	public List<Map<String, Object>> venProductList(Map<String, Object> param) throws Exception {
		return productCustomerDao.venProductList(param);
	}
 
}
