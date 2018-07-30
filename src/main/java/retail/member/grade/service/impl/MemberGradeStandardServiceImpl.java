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
package retail.member.grade.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.member.grade.service.MemberGradeStandardService;

/**
 * 
 * @Class Name : MemberGradeStandardServiceImpl.java
 * @Description : 회원정보 > 멤버십관리 > 회원등급변경기준 관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.23           최초생성
 *
 * @author 김경진
 * @since 2017. 01. 23.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("MemberGradeStandardService")
public class MemberGradeStandardServiceImpl implements MemberGradeStandardService {
	
	@Autowired
	private MemberGradeStandardDao memberGradeStandardDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberGradeStandardServiceImpl.class);

	@Override
	public List<Map<String, Object>> getMemberGradeStandardList(Map<String, Object> params) throws Exception {
		return memberGradeStandardDao.getMemberGradeStandardList(params);
	}
	
	@Override
	public Map<String, Object> updateMemberGradeStandard(Map<String, Object> params) throws Exception {
		return memberGradeStandardDao.updateMemberGradeStandard(params);
	}
	
	
 
}