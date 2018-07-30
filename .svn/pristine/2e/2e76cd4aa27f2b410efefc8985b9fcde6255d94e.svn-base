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
  
import retail.order.store.service.OrderStoreR2VO; 

/**
 * @Class Name : OrderStoreR2Dao.java
 * @Description : OrderStoreR2Dao Class
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
@Repository("OrderStoreR2Dao")
public class OrderStoreR2Dao extends EgovAbstractDAO {
 

	//  바코드로 점 상품 가져오기
	public List<Map<String, Object>> orderStoreProductSelectR2(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR2.orderStoreProductSelectR2", param);
	}

	//  공통코드 테이블의 MGMT_ENTRY 들 가져오기
	public List<Map<String, Object>> getCommonMgmtEntryR2(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR2.getCommonMgmtEntryR2", param);
	}
	
	
	
	
    // 발주 등록  
	public  List<Map<String, Object>>  orderStoreProductRegisterR2( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreR2.orderStoreProductRegisterR2", param);
	}

	

	//  발주헤더 조회 리스트
	public List<Map<String, Object>> orderHeadSearchR2(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR2.orderHeadSearchR2", param);
	}

	
	//  발주헤더  상세
	public List<Map<String, Object>> orderHeadInfoR2(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR2.orderHeadInfoR2", param);
	}

    //  발주상품 리스트 정보 보여주기
	public List<Map<String, Object>> orderDetailInfoR2(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreR2.orderDetailInfoR2", param);
	}

	
    // 발주 삭제
	public  List<Map<String, Object>>  orderDelR2( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreR2.orderDelR2", param);
	}
	
}
