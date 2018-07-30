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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.wms.auto.service.WmsAutoService;
import retail.wms.in.service.WmsInService;



/**
 * WMS -입고예정관리
 * @author 문희훈
 * @since 2017. 01.04
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("WmsAutoService")
public class WmsAutoServiceImpl  implements WmsAutoService {

	@Autowired
	private WmsAutoDao wmsAutoDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(WmsAutoServiceImpl.class);


	@Override
	@Transactional
	public List<Map<String, Object>> selectWmsAutoAssignList(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return wmsAutoDao.selectWmsAutoAssignList(paramMap);
	}
	
	@Override
	@Transactional
	public List<Map<String, Object>> selectWmsAutoStockList(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return wmsAutoDao.selectWmsAutoStockList(paramMap);
	}
	
	@Override
	@Transactional
	public Map<String, Object> selectWmsAutoAssignSave(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return wmsAutoDao.selectWmsAutoAssignSave(paramMap);
	}


	@Override
	@Transactional
	public List<Map<String, Object>> selectWmsAutoAssignCancelList(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return wmsAutoDao.selectWmsAutoAssignCancelList(paramMap);
	}

	@Override
	@Transactional
	public List<Map<String, Object>> selectWmsAutoAssignCancelDetail(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return wmsAutoDao.selectWmsAutoAssignCancelDetail(paramMap);
	}
	
	@Override
	@Transactional
	public Map<String, Object> deleteWmsAutoAssign(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return wmsAutoDao.deleteWmsAutoAssign(paramMap);
	}
	

}
