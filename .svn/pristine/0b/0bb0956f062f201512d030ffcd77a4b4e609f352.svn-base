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
  
import retail.order.store.service.OrderStoreBonusVO; 

/**
 * @Class Name : OrderStoreBonusDao.java
 * @Description : OrderStoreBonusDao Class
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
@Repository("OrderStoreBonusDao")
public class OrderStoreBonusDao extends EgovAbstractDAO {
 
	//  바코드로 점 상품 가져오기
	public List<Map<String, Object>> orderStoreProductSelectBonus(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreBonus.orderStoreProductSelectBonus", param);
	}

	//  공통코드 테이블의 MGMT_ENTRY 들 가져오기
	public List<Map<String, Object>> getCommonMgmtEntryBonus(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreBonus.getCommonMgmtEntryBonus", param);
	}
	
    // 발주 등록  
	public List<Map<String, Object>> orderStoreProductRegisterBonus( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>) list("orderStoreBonus.orderStoreProductRegisterBonus", param);
	}

	//  발주헤더 조회 리스트
	public List<Map<String, Object>> orderHeadSearchBonus(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreBonus.orderHeadSearchBonus", param);
	}
	
	//  발주헤더  상세
	public List<Map<String, Object>> orderHeadInfoBonus(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreBonus.orderHeadInfoBonus", param);
	}

    //  발주상품 리스트 정보 보여주기
	public List<Map<String, Object>> orderDetailInfoBonus(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreBonus.orderDetailInfoBonus", param);
	}
	
    // 발주 삭제
	public List<Map<String, Object>> orderDelBonus( Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreBonus.orderDelBonus", param);
	}

	public List<Map<String, Object>> purchConfirmBonus( Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreBonus.purchConfirmBonus", param);
	}
	
	// 확정취소
	public List<Map<String, Object>> orderConfirmCancelBonus( Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreBonus.orderConfirmCancelBonus", param);
	}
	
	
	
	
}
