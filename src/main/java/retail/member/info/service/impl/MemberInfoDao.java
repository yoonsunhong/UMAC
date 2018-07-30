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

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : MemberInfoDao.java
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
@Repository("MemberInfoDao")
public class MemberInfoDao extends EgovAbstractDAO {
	
	public Map<String, Object> getMemberInfoDetail(Map<String, Object> param) throws Exception {
		select("memberInfo.getMemberInfoDetail", param);
		return param;
	}
	
	public Map<String, Object> memberInfoCount(Map<String, Object> param) throws Exception {
		select("memberInfo.memberInfoCount", param);
		return param;
	}
	
	public Map<String, Object> memberPhoneCount(Map<String, Object> param) throws Exception {
		select("memberInfo.memberPhoneCount", param);
		return param;
	}
	
	public Map<String, Object> memberBusiNoCount(Map<String, Object> param) throws Exception {
		select("memberInfo.memberBusiNoCount", param);
		return param;
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> memberInfoSelect(Map<String, Object> param) throws Exception {
		return (Map<String, Object>) select("memberInfo.memberInfoSelect", param);
	}
	
	public Map<String, Object> updateMemberInfoPersonal(Map<String, Object> param) throws Exception {
		select("memberInfo.updateMemberInfoPersonal", param);
		return param;
	}
	
	public Map<String, Object> updateMemberInfoBuisness(Map<String, Object> param) throws Exception {
		select("memberInfo.updateMemberInfoBuisness", param);
		return param;
	}
	
	
	
}
