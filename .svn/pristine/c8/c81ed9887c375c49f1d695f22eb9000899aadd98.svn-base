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

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : MemberGradeStandardDao.java
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
@Repository("MemberGradeStandardDao")
public class MemberGradeStandardDao extends EgovAbstractDAO {
	
	/**
	 * 회원등급변경기준 관리 리스트
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getMemberGradeStandardList(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("memberGradeStandard.getMemberGradeStandardList", params);
	}
	
	/**
	 * 회원등급변경기준 등록 수정
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updateMemberGradeStandard(Map<String, Object> params) throws Exception {
		select("memberGradeStandard.updateMemberGradeStandard", params);
		return params;
	}
	
	
	
	
}
