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

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * @Class Name : PurchMngDao.java
 * @Description : PurchMngDao Class
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
@Repository("PurchMngDao")
public class PurchMngDao extends EgovAbstractDAO {
 
	
	
	//  매입헤더 조회 리스트
	public List<Map<String, Object>> purchHeadSearch(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("purchMng.purchHeadSearch", param);
	}
	
    //  매입상품 리스트 정보 보여주기
	public List<Map<String, Object>> purchDetailInfo(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("purchMng.purchDetailInfo", param);
	}
	

    // 매입저장  
	public  List<Map<String, Object>>  purchRegister( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("purchMng.purchRegister", param);
	}
	
  
	public  List<Map<String, Object>>  purchRegisterAmt( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("purchMng.purchRegisterAmt", param);
	}
	 

    // 매입 생성
	public  List<Map<String, Object>>  jobOrderToPurch( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("purchMng.jobOrderToPurch", param);
	}
	

    // 매입 확정
	public  List<Map<String, Object>>  purchConfirm( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("purchMng.purchConfirm", param);
	}
	
	/**
	 * 시세정보등록 관리 List
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectPurchMarketPrice(Map<String, Object> param) throws Exception {
		select("purchMng.selectPurchMarketPrice", param);
		return param;
	}
	
	/**
	 * 시세정보등록 Insert
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> insertPurchMarketPrice(Map<String, Object> param) throws Exception {
		select("purchMng.insertPurchMarketPrice", param);
		return param;
	}
	
	/**
	 * 시세정보등록 Insert
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> deletePurchMarketPrice(Map<String, Object> param) throws Exception {
		select("purchMng.deletePurchMarketPrice", param);
		return param;
	}

	public List<Map<String, Object>> purchStoreChitStatusList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("purchMng.purchStoreChitStatusList", param);
	}

	public List<Map<String, Object>> purchStoreChitStatusDetail(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("purchMng.purchStoreChitStatusDetail", param);
	}
	
    // 매입 삭제
	public  List<Map<String, Object>>  purchDel( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("purchMng.purchDel", param);
	}
	 
	
}
