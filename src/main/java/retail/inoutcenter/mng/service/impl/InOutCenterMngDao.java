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
package retail.inoutcenter.mng.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * @Class Name : InOutCenterMngDao.java
 * @Description : InOutCenterMngDao Class
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
@Repository("InOutCenterMngDao")
public class InOutCenterMngDao extends EgovAbstractDAO {
 
	
 	
	//  대출입헤더 조회 리스트
	public List<Map<String, Object>> inOutCenterHeadSearch(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("inOutCenterMng.inOutCenterHeadSearch", param);
	}


	
	
    //  대출입상품 리스트 정보 보여주기
	public List<Map<String, Object>> inOutCenterDetailInfo(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("inOutCenterMng.inOutCenterDetailInfo", param);
	}
 
	

    // 대출입  확정
	public  List<Map<String, Object>>  inOutCenterConfirm( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("inOutCenterMng.inOutCenterConfirm", param);
	}
	
	
	
 
    // 매입저장  
	public  List<Map<String, Object>>  inOutRegister( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("inOutCenterMng.inOutRegister", param);
	}
 
	
	
//    // 매입 생성
//	public  List<Map<String, Object>>  jobOrderToPurch( Map<String, Object> param) throws Exception{
//		return (List<Map<String, Object>>)  list("purchMng.jobOrderToPurch", param);
//	}
//	
//
	
	//점대출,점매입,센터대출,센터매입
	public Map<String, Object> inoutcenterSumMng_check(Map<String, Object> params) throws Exception {
		select("inOutCenterMng.inoutcenterSumMng_check", params);
		return params;
	}
	
	//매입집계표(대출입포함)
	public Map<String, Object> supplyPurchStateInout_list(Map<String, Object> params) throws Exception {
		select("inOutCenterMng.supplyPurchStateInout_list", params);
		return params;
	}

	/**
	 * 평균단가 조정등록 내역조회(대출입)
	 * @param param
	 * @throws Exception
	 */
	public void getUnitPriceAvgList(Map<String, Object> param) throws Exception {
		list("inOutUnitpriceAvg.getUnitPriceAvgList", param);
	}
	
	/**
	 * 같은날 같은상품 중복등록 불가능
	 * @param param
	 * @throws Exception
	 */
	public void countInoutUnitpriceAvgInfo(Map<String, Object> param) throws Exception {
		select("inOutUnitpriceAvg.countInoutUnitpriceAvgInfo", param);
	}
	
	/**
	 * 평균단가 조정등록 신규저장(대출입)
	 * @param param
	 * @throws Exception
	 */
	public void saveInoutUnitpriceAvg(Map<String, Object> param)throws Exception {
		insert("inOutUnitpriceAvg.saveInoutUnitpriceAvg", param);		
	}

	/**
	 * 평균단가 조정등록 내역수정(대출입)
	 * @param param
	 * @throws Exception
	 */
	public void updateInoutUnitpriceAvg(Map<String, Object> param)throws Exception {
		update("inOutUnitpriceAvg.updateInoutUnitpriceAvg", param);
		
	}




	
}
