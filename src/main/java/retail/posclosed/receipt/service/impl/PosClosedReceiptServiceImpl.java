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
package retail.posclosed.receipt.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.posclosed.receipt.service.PosClosedReceiptService;

/**
 * 
 * @Class Name : PosClosedReceiptServiceImpl.java
 * @Description : 영업정보 > POS정산 > POS영수증조회
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 03.21           최초생성
 *
 * @author 김경진
 * @since 2017. 03. 21.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("PosClosedReceiptService")
public class PosClosedReceiptServiceImpl implements PosClosedReceiptService {
	
	@Autowired
	private PosClosedReceiptDao posClosedReceiptDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedReceiptServiceImpl.class);
	
	@Override
	public Map<String, Object> getPosClosedReceipt(Map<String, Object> params) throws Exception {
		return posClosedReceiptDao.getPosClosedReceipt(params);
	}
	
	
 
}
