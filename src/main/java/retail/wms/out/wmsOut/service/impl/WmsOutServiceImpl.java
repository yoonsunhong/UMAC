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

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.wms.out.wmsOut.service.WmsOutService;



/**
 * WMS -출고조회/수정
 * @author 문희훈
 * @since 2017. 01.17
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("WmsOutService")
public class WmsOutServiceImpl  implements WmsOutService {

	@Autowired
	private WmsOutDao wmsOutDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(WmsOutServiceImpl.class);


	/* 출고목록조회
	 * @see retail.wms.out.wmsOut.service.WmsOutService#getWmsOutList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsOutList(Map<String, Object> param) throws Exception {
		wmsOutDao.getWmsOutList(param);
	}


	/* 출고상세조회
	 * @see retail.wms.out.wmsOut.service.WmsOutService#getWmsOutDtlList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsOutDtlList(Map<String, Object> paramMap) throws Exception {
		wmsOutDao.getWmsOutDtlList(paramMap);
	}


	/* 출고저장
	 * @see retail.wms.out.wmsOut.service.WmsOutService#saveWmsOutCnt(java.util.Map)
	 */
	@Override
	@Transactional
	public void saveWmsOutCnt(Map<String, Object> param) throws Exception {
		wmsOutDao.saveWmsOutCnt(param);
	}


	/* 출고확정
	 * @see retail.wms.out.wmsOut.service.WmsOutService#sumitWmsOut(java.util.Map)
	 */
	@Override
	@Transactional
	public void sumitWmsOut(Map<String, Object> paramMap) throws Exception {
		wmsOutDao.sumitWmsOut(paramMap);
	}

}
