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
package retail.wms.out.wmsOut.service.impl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * WMS -출고조회/수정
 * @author 문희훈
 * @since 2017. 01.17
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("WmsOutDao")
public class WmsOutDao extends EgovAbstractDAO {

	public void getWmsOutList(Map<String, Object> param) throws Exception{
		list("wmsOut.getWmsOutList", param);
	}

	/**
	 * 출고상세조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getWmsOutDtlList(Map<String, Object> paramMap)  throws Exception{
		list("wmsOut.getWmsOutDtlList", paramMap);
	}

	/**
	 * 출고저장
	 * @param param
	 * @throws Exception
	 */
	public void saveWmsOutCnt(Map<String, Object> param) throws Exception{
		update("wmsOut.saveWmsOutCnt", param);
	}

	/**
	 * 출고확정
	 * @param paramMap
	 * @throws Exception
	 */
	public void sumitWmsOut(Map<String, Object> paramMap)  throws Exception{
		update("wmsOut.sumitWmsOut", paramMap);
	}

	
}
