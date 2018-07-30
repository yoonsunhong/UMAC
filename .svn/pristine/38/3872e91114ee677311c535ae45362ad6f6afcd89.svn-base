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
package retail.product.store.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;
 


import retail.product.store.service.ProductStoreVO; 

/**
 * @Class Name : ProductStoreDao.java
 * @Description : ProductStoreDao Class
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

@SuppressWarnings("unchecked")
@Repository("ProductStoreDao")
public class ProductStoreDao extends EgovAbstractDAO {
 
	
	/**
	 * 점별 상품 조회 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> productStoreSearchList(Map<String, Object> params) throws Exception {
	 
		return (List<Map<String, Object>>) list("productStore.productStoreSearchList", params);
		 
	}
 
	


    // 점 상품 업데이트 
	public  List<Map<String, Object>>  productStoreUpdate( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("productStore.productStoreUpdate", param);
	}
	
	public void excelProductMasterStore(Map<String, Object> paramMap) throws Exception{
		list("productStore.excelProductMasterStore", paramMap);
	}
	
	
}
