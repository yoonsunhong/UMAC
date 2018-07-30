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

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.wms.stock.wmsStockSchedule.service.WmsStockScheduleService;




/**
 * WMS -재고조사 일정 관리
 * @author 문희훈
 * @since 2017. 02.21
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("WmsStockScheduleService")
public class WmsStockScheduleServiceImpl  implements WmsStockScheduleService {

	@Autowired
	private WmsStockScheduleDao wmsStockScheduleOutDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(WmsStockScheduleServiceImpl.class);

	
	/* 조직목록의 트리메뉴 리스트 조회(물류센터 제외)
	 * @see retail.stock.stockSchedule.service.StockScheduleService#getStockOrganizationList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsStockOrganizationList(Map<String, Object> paramMap)throws Exception {
		wmsStockScheduleOutDao.getWmsStockOrganizationList(paramMap);
		
	}

	
	/* 재고조사 일정 목록조회
	 * @see retail.wms.stock.wmsStockSchedule.service.WmsStockScheduleService#getWmsInventorySchedule(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsInventorySchedule(Map<String, Object> param)throws Exception {
		wmsStockScheduleOutDao.getWmsInventorySchedule(param);
	}


}
