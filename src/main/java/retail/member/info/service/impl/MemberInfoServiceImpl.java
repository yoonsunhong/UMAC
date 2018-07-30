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
package retail.member.info.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.member.info.service.MemberInfoService;

/**
 * 
 * @Class Name : MemberInfoServiceImpl.java
 * @Description : 회원정보 > 멤버십관리 > 회원정보관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.05           최초생성
 *
 * @author 김경진
 * @since 2017. 01. 15.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("MemberInfoService")
public class MemberInfoServiceImpl implements MemberInfoService {
	
	@Autowired
	private MemberInfoDao memberInfoDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberInfoServiceImpl.class);

	@Override
	public Map<String, Object> getMemberInfoDetail(Map<String, Object> param) throws Exception {
		return memberInfoDao.getMemberInfoDetail(param);
	}
	
	@Override
	public Map<String, Object> memberInfoCount(Map<String, Object> param) throws Exception {
		return memberInfoDao.memberInfoCount(param);
	}
	
	@Override
	public Map<String, Object> memberPhoneCount(Map<String, Object> param) throws Exception {
		return memberInfoDao.memberPhoneCount(param);
	}
	
	@Override
	public Map<String, Object> memberBusiNoCount(Map<String, Object> param) throws Exception {
		return memberInfoDao.memberBusiNoCount(param);
	}
	
	@Override
	public Map<String, Object> memberInfoSelect(Map<String, Object> param) throws Exception {
		return memberInfoDao.memberInfoSelect(param);
	}
	
	@Override
	public Map<String, Object> updateMemberInfoPersonal(Map<String, Object> param) throws Exception {
		return memberInfoDao.updateMemberInfoPersonal(param);
	}
	
	@Override
	public Map<String, Object> updateMemberInfoBuisness(Map<String, Object> param) throws Exception {
		return memberInfoDao.updateMemberInfoBuisness(param);
	}
	
 
}
