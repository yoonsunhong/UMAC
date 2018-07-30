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
package retail.business.exchangeprint.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.business.exchangeprint.service.BusinessExchangePrintService;
import retail.posclosed.overandshorts.service.impl.PosClosedOverAndShortsServiceImpl;

/**
 * 
 * @Class Name : BusinessExchangePrintServiceImpl.java
 * @Description : 영업정보 > 영업관리 > 교환권출력현황
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 08.23           최초생성
 *
 * @author 윤태희
 * @since 2017. 08. 23
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("BusinessExchangePrintService")
public class BusinessExchangePrintServiceImpl implements BusinessExchangePrintService {
	
	@Autowired
	private BusinessExchangePrintDao BusinessExchangePrintDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedOverAndShortsServiceImpl.class);
	
	@Override
	public Map<String, Object> businessExchangePrintList(Map<String, Object> params) throws Exception {
		return BusinessExchangePrintDao.businessExchangePrintList(params);
	}
	
	@Override
	public List<Map<String, Object>> businessExchangePrintListExcel(Map<String, Object> params) throws Exception {
		return BusinessExchangePrintDao.businessExchangePrintListExcel(params);
	}
	
	@Override
	public Map<String, Object> BusinessExchangePrintPopupList(Map<String, Object> param) throws Exception {
		return BusinessExchangePrintDao.BusinessExchangePrintPopupList(param);
	}
	
 
}
