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
package retail.wms.auto.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * WMS 
 * @author 정해성
 * @since 2017. 07.03
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@SuppressWarnings("unchecked")
@Repository("WmsAutoDao")
public class WmsAutoDao extends EgovAbstractDAO {

	/**
	 * WMS 자동할당 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectWmsAutoAssignList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("wmsAuto.selectWmsAutoAssignList", param);
	}
	
	
	/**
	 * WMS 자동할당 재고 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectWmsAutoStockList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("wmsAuto.selectWmsAutoStockList", param);
	}

	/**
	 * WMS 자동할당
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectWmsAutoAssignSave(Map<String, Object> param) throws Exception {
		select("wmsAuto.selectWmsAutoAssignSave", param);
		return param;
	}
	
	
	/**
	 * WMS 자동할당 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectWmsAutoAssignCancelList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("wmsAuto.selectWmsAutoAssignCancelList", param);
	}
	
	
	/**
	 * WMS 자동할당 취소의 출고상세
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectWmsAutoAssignCancelDetail(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("wmsAuto.selectWmsAutoAssignCancelDetail", param);
	}
	
	/**
	 * WMS 자동할당 취소
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> deleteWmsAutoAssign(Map<String, Object> param) throws Exception {
		select("wmsAuto.deleteWmsAutoAssign", param);
		return param;
	}
	

}
