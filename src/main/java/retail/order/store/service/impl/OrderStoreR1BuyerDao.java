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

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;
  
import retail.order.store.service.OrderStoreR1BuyerVO; 

/**
 * @Class Name : OrderStoreR1BuyerDao.java
 * @Description : OrderStoreR1BuyerDao Class
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
@Repository("OrderStoreR1BuyerDao")
public class OrderStoreR1BuyerDao extends EgovAbstractDAO {
 

	//  바코드로 점 상품 가져오기
	public List<Map<String, Object>> orderStoreProductSelectR1Buyer(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR1Buyer.orderStoreProductSelectR1Buyer", param);
	}

	//  공통코드 테이블의 MGMT_ENTRY 들 가져오기
	public List<Map<String, Object>> getCommonMgmtEntryR1Buyer(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR1Buyer.getCommonMgmtEntryR1Buyer", param);
	}
	
	
	
	
    // 발주 등록  
	public  List<Map<String, Object>>  orderStoreProductRegisterR1Buyer( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreR1Buyer.orderStoreProductRegisterR1Buyer", param);
	}

	

	//  발주헤더 조회 리스트
	public List<Map<String, Object>> orderHeadSearchR1Buyer(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR1Buyer.orderHeadSearchR1Buyer", param);
	}

	
	//  발주헤더  상세
	public List<Map<String, Object>> orderHeadInfoR1Buyer(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR1Buyer.orderHeadInfoR1Buyer", param);
	}

    //  발주상품 리스트 정보 보여주기
	public List<Map<String, Object>> orderDetailInfoR1Buyer(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR1Buyer.orderDetailInfoR1Buyer", param);
	}

	
    // 발주 삭제
	public  List<Map<String, Object>>  orderDelR1Buyer( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreR1Buyer.orderDelR1Buyer", param);
	}
	
}
