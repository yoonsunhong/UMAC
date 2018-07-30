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
package retail.posclosed.info.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.posclosed.info.service.PosClosedInfoService;

/**
 * 
 * @Class Name : PosClosedInfoServiceImpl.java
 * @Description : 영업정보 > POS정산 > POS마감정보
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 03.09           최초생성
 *
 * @author 김경진
 * @since 2017. 03. 09.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("PosClosedInfoService")
public class PosClosedInfoServiceImpl implements PosClosedInfoService {
	
	@Autowired
	private PosClosedInfoDao posClosedInfoDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedInfoServiceImpl.class);
	
	@Override
	public Map<String, Object> getPosClosedInfo(Map<String, Object> params) throws Exception {
		return posClosedInfoDao.getPosClosedInfo(params);
	}
	
	
 
}
