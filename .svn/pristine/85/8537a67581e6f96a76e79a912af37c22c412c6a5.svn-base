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
package retail.wms.stock.wmsStockChange.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.wms.stock.wmsStockChange.service.WmsStockChangeService;



/**
 * WMS - StockChange 할당조정
 * @author 송원두
 * @since 2018. 02.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("WmsStockChangeService")
public class WmsStockChangeServiceImpl  implements WmsStockChangeService {

	@Autowired
	private WmsStockChangeDao wmsStockChangeDao;
	

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(WmsStockChangeServiceImpl.class);

	/**
	 * 할당내역 조회
	 * @param param
	 * @throws Exception
	 */
	@Override
	@Transactional
	public void getWmsStockChangeList(Map<String, Object> param) throws Exception {
		wmsStockChangeDao.getWmsStockChangeList(param);
	}

	/**
	 * 할당변경 수정
	 * @param param
	 * @throws Exception
	 */
	@Override
	@Transactional
	public void saveWmsStockChangeUpdate(Map<String, Object> param) throws Exception {
		wmsStockChangeDao.saveWmsStockChangeUpdate(param);
	}

	/**
	 * 현 재고 조회
	 * @param param
	 * @throws Exception
	 */
	@Override
	@Transactional
	public void getWmsStockChangePreList(Map<String, Object> param) throws Exception {
		wmsStockChangeDao.getWmsStockChangePreList(param);
	}

	/**
	 * 변경내역 조회
	 * @param param
	 * @throws Exception
	 */
	@Override
	@Transactional
	public void getWmsStockChangeInfoList(Map<String, Object> param)throws Exception {
		wmsStockChangeDao.getWmsStockChangeInfoList(param);
	}
}
