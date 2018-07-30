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
package retail.wms.in.service.impl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * WMS -입고예정관리
 * @author 문희훈
 * @since 2017. 01.04
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("WmsInDao")
public class WmsInDao extends EgovAbstractDAO {

	/**
	 * WMS 입고목록 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getWmsInList(Map<String, Object> param) throws Exception {
		select("wmsIn.getWmsInList", param);
		return  param;
	}

	/**
	 * 입고현황 상세조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getWmsInDtlList(Map<String, Object> paramMap)  throws Exception {
		list("wmsIn.getWmsInDtlList", paramMap);
	}

	/**
	 *  WMS 입고 저장.    
	 * @param param
	 * @throws Exception
	 */
	public void saveWmsInCnt(Map<String, Object> param) throws Exception {
		update("wmsIn.saveWmsInCnt", param);
	}

	/**
	 * WMS 입고확정
	 * @param paramMap
	 * @throws Exception
	 */
	public void sumitWmsIn(Map<String, Object> paramMap) throws Exception{
		update("wmsIn.sumitWmsIn", paramMap);
	}


	
}
