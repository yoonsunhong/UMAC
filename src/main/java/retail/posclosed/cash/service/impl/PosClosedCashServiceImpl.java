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
package retail.posclosed.cash.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.posclosed.cash.service.PosClosedCashService;

/**
 * 
 * @Class Name : PosClosedCashServiceImpl.java
 * @Description : 영업정보 > POS정산 > POS마감정산
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 03.15           최초생성
 *
 * @author 김경진
 * @since 2017. 03. 15.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("PosClosedCashService")
public class PosClosedCashServiceImpl implements PosClosedCashService {
	
	@Autowired
	private PosClosedCashDao posClosedCashDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedCashServiceImpl.class);
	
	@Override
	public Map<String, Object> getPosClosedCash(Map<String, Object> params) throws Exception {
		return posClosedCashDao.getPosClosedCash(params);
	}
	
	@Override
	public Map<String, Object> getPosClosedCash2(Map<String, Object> params) throws Exception {
		return posClosedCashDao.getPosClosedCash2(params);
	}
	
	@Override
	public Map<String, Object> updatePosClosedCash(Map<String, Object> params) throws Exception {
		return posClosedCashDao.updatePosClosedCash(params);
	}
	
	
 
}
