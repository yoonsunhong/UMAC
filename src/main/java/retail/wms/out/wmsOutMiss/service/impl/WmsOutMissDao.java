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
package retail.wms.out.wmsOutMiss.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * WMS -미/오출현황
 * @author 문희훈
 * @since 2017. 01.24
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("WmsOutMissDao")
public class WmsOutMissDao extends EgovAbstractDAO {

	/**
	 *  미/오출현황 조회
	 * @param param
	 * @throws Exception
	 */
	public void getWmsOutMissList(Map<String, Object> param) throws Exception{
		list("wmsOutMiss.getWmsOutMissList", param);		
	}

	/**
	 * 미/오출현황 엑셀다운호드
	 * @param paramMap
	 * @throws Exception
	 */
	public void wmsOutMissExcelDown(Map<String, Object> paramMap)  throws Exception{
		list("wmsOutMiss.wmsOutMissExcelDown", paramMap);		
	}




	
}