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
package retail.organization.service.impl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
* 조직마스터 관리
* @author 문희훈
* @since 2016. 12.23
* @version 1.0
* @see Copyright (C) by Retailtech All right reserved.
*/
@SuppressWarnings("unchecked")
@Repository("OrganizationDao")
public class OrganizationDao extends EgovAbstractDAO {

	/**
	 * 조직목록의 트리메뉴 리스트 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getOrganizationList(Map<String, Object> paramMap) throws Exception{
		list("organization.getOrganizationList", paramMap);
	}

	/**
	 * 조직정보 상세조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getOrganizationDetailInfo(Map<String, Object> paramMap)  throws Exception{
		select("organization.getOrganizationDetailInfo", paramMap);		
	}

	/**
	 * 부서코드 중복검사
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectCountDeptCode(Map<String, Object> paramMap)  throws Exception{
		select("organization.selectCountDeptCode", paramMap);		
	}

	/**
	 * 조직마스터 신규/수정
	 * @param paramMap
	 * @throws Exception
	 */
	public void setDeptInfo(Map<String, Object> paramMap) throws Exception{
		insert("organization.setDeptInfo", paramMap);		
	}

	
}
