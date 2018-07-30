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
package retail.member.sms.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.common.EgovStringUtil;
import retail.member.sms.service.MemberSmsService;

/**
 * 
 * @Class Name : MemberSmsServiceImpl.java
 * @Description : SMS발송관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.07           최초생성
 *
 * @author 김경진
 * @since 2017. 02. 07.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("MemberSmsService")
public class MemberSmsServiceImpl implements MemberSmsService {
	
	@Autowired
	private MemberSmsDao memberSmsDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberSmsServiceImpl.class);
	
	@Override
	public Map<String, Object> getMemberSms(Map<String, Object> params) throws Exception {
		return memberSmsDao.getMemberSms(params);
	}
	
	@Override
	public Map<String, Object> updateMemberSmsSend(Map<String, Object> params) throws Exception {
		return memberSmsDao.updateMemberSmsSend(params);
	}
	
	@Override
	public Map<String, Object> updateMemberSmsSend2(Map<String, Object> params) throws Exception {
		return memberSmsDao.updateMemberSmsSend2(params);
	}
	
	@Override
	public Map<String, Object> updateAlimtalSend(Map<String, Object> params) throws Exception {
		
		Map<String, Object> result = null;
		String templateCode = EgovStringUtil.isNullToString(params.get("P_TEMPLATECODE"), "");
		
		if("dadam_106".equals(templateCode))	// 회원가입 알림톡
		{
			result = memberSmsDao.updateAlimtalSend1(params);
		}
		else if("dadam_101".equals(templateCode))	// 회원등급 변경
		{
			result = memberSmsDao.updateAlimtalSend2(params);
		}
		else if("dadam_104".equals(templateCode))	// 주문배달관리 배송중 변경
		{
			result = memberSmsDao.updateAlimtalSend3(params);
		}
		else if("dadam_102".equals(templateCode))	// 입금처리 임시테이블 저장
		{
			result = memberSmsDao.updateAlimtalSend5(params);
		}
		else if("dadam_102_2".equals(templateCode))	// 입금처리 알림톡 발송
		{
			result = memberSmsDao.updateAlimtalSend5_2(params);
		}
		else if("dadam_103".equals(templateCode))	// 발주등록
		{
			result = memberSmsDao.updateAlimtalSend4(params);
		}
		
		return result;
	}
	
	@Override
	public Map<String, Object> getAlimtalkList102(Map<String, Object> params) throws Exception {
		return memberSmsDao.getAlimtalkList102(params);
	}
	
}
