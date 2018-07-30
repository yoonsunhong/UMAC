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
package retail.member.deal.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.member.deal.service.MemberDealService;

/**
 * 
 * @Class Name : MemberDealServiceImpl.java
 * @Description : 회원거래 현황
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.03           최초생성
 *
 * @author 김경진
 * @since 2017. 02. 03.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("MemberDealService")
public class MemberDealServiceImpl implements MemberDealService {
	
	@Autowired
	private MemberDealDao memberDealDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberDealServiceImpl.class);
	
	@Override
	public Map<String, Object> getMemberDeal(Map<String, Object> params) throws Exception {
		return memberDealDao.getMemberDeal(params);
	}
	
	@Override
	public Map<String, Object> getMemberDealStatus(Map<String, Object> params) throws Exception {
		return memberDealDao.getMemberDealStatus(params);
	}
 
}
