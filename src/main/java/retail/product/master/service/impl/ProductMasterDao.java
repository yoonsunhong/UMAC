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
package retail.product.master.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;
 

import retail.product.master.service.ProductMasterVO; 

/**
 * @Class Name : ProductMasterDao.java
 * @Description : ProductMasterDao Class
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
@Repository("ProductMasterDao")
public class ProductMasterDao extends EgovAbstractDAO {

	//  상품 마스터 상세 조회
	public List<Map<String, Object>> productMasterDetail(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productMaster.productMasterDetail", param);
	}
  
	
    // 상품 마스터  등록
	public  List<Map<String, Object>>  productMasterRegister( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("productMaster.productMasterRegister", param);
	}
	
	 
    //  취급점포 신규  리스트
	public List<Map<String, Object>> productStoreNewList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productMaster.productStoreNewList", param);
	}
 
	
	 
    // 저장된  취급점포    리스트
	public List<Map<String, Object>> productStoreList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productMaster.productStoreList", param);
	}
 
	
	
	/**
	 * 공병코드 그룹 조회
	 * @param paramMap
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void getBotCodeSelectBoxList(Map<String, Object> paramMap) throws Exception{
		list("productMaster.getBotCodeSelectBoxList", paramMap);
	}

	


    //  스캔코드 중복 검사
	public List<ProductMasterVO> productMasterScanCodeDup( Map<String, Object> paramMap) throws Exception{
		return (List<ProductMasterVO>) list("productMaster.productMasterScanCodeDup", paramMap);
	}

	
	 
	@SuppressWarnings("unchecked")
	public void getItmGb(Map<String, Object> paramMap) throws Exception{
		list("productMaster.getItmGb", paramMap);
	}
	 
	
	//  묶음상품 조회
	public List<Map<String, Object>> productMukkum(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productMaster.productMukkum", param);
	}
	
	//  박스상품 조회
	public List<Map<String, Object>> productBoxList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productMaster.productBoxList", param);
	}
	
}
