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

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

import retail.groupGridTest.service.GroupGridTestVO;
import retail.product.customer.service.ProductCustomerVO; 

/**
 * @Class Name : GroupGridTestDao.java
 * @Description : GroupGridTestDao Class
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
@Repository("ProductCustomerDao")
public class ProductCustomerDao extends EgovAbstractDAO {

	
  
	
	
    //  사업자번호 중복 검사
	public List<ProductCustomerVO> productCustomerBusiNoDup( Map<String, Object> paramMap) throws Exception{
		return (List<ProductCustomerVO>) list("productCustomer.productCustomerBusiNoDup", paramMap);
	}
	
	
    //  협력업체 코드 중복 검사
	public List<ProductCustomerVO> productCustomerVenCodeDup( Map<String, Object> paramMap) throws Exception{
		return (List<ProductCustomerVO>) list("productCustomer.productCustomerVenCodeDup", paramMap);
	}
	
    //  매입구간의 최대 최소값 - 공통코드의 관리필드 두개 뽑아오기
	public List<ProductCustomerVO> purSectionStdPrice( Map<String, Object> paramMap) throws Exception{
		return (List<ProductCustomerVO>) list("productCustomer.purSectionStdPrice", paramMap);
	}
	
	
//    //  협력업체등록
//	public List<ProductCustomerVO> productCustomerRegister( Map<String, Object> paramMap) throws Exception{
//		return (List<ProductCustomerVO>) list("productCustomer.productCustomerRegister", paramMap);
//	}
	
    //  협력업체등록
	public  List<Map<String, Object>>  productCustomerRegister( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("productCustomer.productCustomerRegister", param);
	}
	 
	
	//  협력업체 리스트
	public List<Map<String, Object>> productCustomerList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productCustomer.productCustomerList", param);
	}

	//  협력업체  상세
	public List<Map<String, Object>> productCustomerInfoSelect(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productCustomer.productCustomerInfoSelect", param);
	}
	//   getPayMgmtEntry
	public List<Map<String, Object>> getPayMgmtEntry(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productCustomer.getPayMgmtEntry", param);
	}
	
	
    //  지불조건 리스트
	public List<Map<String, Object>> productCustomerPyPayNumList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productCustomer.productCustomerPyPayNumList", param);
	}
	
    //  장려금 리스트
	public List<Map<String, Object>> productCustomerPyPayRateList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productCustomer.productCustomerPyPayRateList", param);
	}
	
    //  장려금 제외 상품 리스트
	public List<Map<String, Object>> productCustomerPyExclItemList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productCustomer.productCustomerPyExclItemList", param);
	}
	
    //  담당자 리스트
	public List<Map<String, Object>> productCustomerCdSupplyPsnList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productCustomer.productCustomerCdSupplyPsnList", param);
	}
	
	
	//  협력업체 상품 리스트
	public List<Map<String, Object>> venProductList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productCustomer.venProductList", param);
	}	
	
}
