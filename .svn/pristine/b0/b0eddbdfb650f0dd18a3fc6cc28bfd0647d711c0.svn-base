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

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.wms.in.service.WmsInService;



/**
 * WMS -입고예정관리
 * @author 문희훈
 * @since 2017. 01.04
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("WmsInService")
public class WmsInServiceImpl  implements WmsInService {

	@Autowired
	private WmsInDao wmsInDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(WmsInServiceImpl.class);


	/* WMS 입고목록 조회
	 * @see retail.wms.in.service.WmsInService#getWmsInList(java.util.Map)
	 */
	@Override
	@Transactional
	public Map<String, Object> getWmsInList(Map<String, Object> param)	throws Exception {
		return wmsInDao.getWmsInList(param);
	}


	/* 입고현황 상세조회
	 * @see retail.wms.in.service.WmsInService#getWmsInDtlList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsInDtlList(Map<String, Object> paramMap) throws Exception {
		wmsInDao.getWmsInDtlList(paramMap);
	}


	/* 
	 * WMS 입고 저장.
	 * @see retail.wms.in.service.WmsInService#saveWmsInCnt(java.util.Map)
	 */
	@Override
	@Transactional
	public void saveWmsInCnt(Map<String, Object> param) throws Exception {
		wmsInDao.saveWmsInCnt(param);
	}


	/* WMS 입고확정
	 * @see retail.wms.in.service.WmsInService#sumitWmsIn(java.util.Map)
	 */
	@Override
	@Transactional
	public void sumitWmsIn(Map<String, Object> paramMap) throws Exception {
		wmsInDao.sumitWmsIn(paramMap);
	}


	
 
}
