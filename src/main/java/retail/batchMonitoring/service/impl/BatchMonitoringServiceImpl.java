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
package retail.batchMonitoring.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.batchMonitoring.service.BatchMonitoringService;



/**
 * SYS - BatchMonitoring
 * @author 송원두
 * @since 2018. 02.14
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("BatchMonitoringService")
public class BatchMonitoringServiceImpl  implements BatchMonitoringService {

	@Autowired
	private BatchMonitoringDao batchMonitoringDao;
	

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(BatchMonitoringServiceImpl.class);


	/**
	 * Batch Log 조회
	 * @param param
	 * @throws Exception
	 */
	@Override
	@Transactional
	public void getBatchMonitoringList(Map<String, Object> param) throws Exception {
		batchMonitoringDao.getBatchMonitoringList(param);
	}

	/**
	 * Batch Log_Name 리스트
	 * @param param
	 * @throws Exception
	 */
	@Override
	public void getBatchLogNameList(Map<String, Object> paramMap) throws Exception {
		batchMonitoringDao.getBatchLogNameList(paramMap);		
	}

	/**
	 * Batch Log_Status  리스트
	 * @param param
	 * @throws Exception
	 */
	@Override
	public void getBatchLogStatusList(Map<String, Object> paramMap) throws Exception {
		batchMonitoringDao.getBatchLogStatusList(paramMap);
		
	}
}
