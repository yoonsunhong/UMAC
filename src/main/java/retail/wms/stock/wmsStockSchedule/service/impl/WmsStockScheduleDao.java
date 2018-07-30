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
package retail.wms.stock.wmsStockSchedule.service.impl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;




/**
 * WMS -재고조사 일정 관리
 * @author 문희훈
 * @since 2017. 02.21
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("WmsStockScheduleDao")
public class WmsStockScheduleDao extends EgovAbstractDAO {

	/**
	 * 조직목록의 트리메뉴 리스트 조회(물류센터만)
	 * @param paramMap
	 * @throws Exception
	 */
	public void getWmsStockOrganizationList(Map<String, Object> paramMap) throws Exception{
		list("wmsStockSchedule.getWmsStockOrganizationList", paramMap);	
	}
	
	/**
	 * 재고조사 일정 목록조회
	 * @param param
	 * @throws Exception
	 */
	public void getWmsInventorySchedule(Map<String, Object> param)  throws Exception{
		list("wmsStockSchedule.getWmsInventorySchedule", param);	
	}
	

}
