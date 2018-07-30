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

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : MemberGradeDao.java
 * @Description : 회원정보 > 멤버십관리 > 회원등급변경(개별)
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.01           최초생성
 *
 * @author 김경진
 * @since 2017. 02. 01.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("MemberGradeDao")
public class MemberGradeDao extends EgovAbstractDAO {
	
	public Map<String, Object> getMemberGradeDetail(Map<String, Object> param) throws Exception {
		select("memberGrade.getMemberGradeDetail", param);
		return param;
	}
	
	public Map<String, Object> updateMemberGrade(Map<String, Object> param) throws Exception {
		select("memberGrade.updateMemberGrade", param);
		return param;
	}
	
	
	
	
}
