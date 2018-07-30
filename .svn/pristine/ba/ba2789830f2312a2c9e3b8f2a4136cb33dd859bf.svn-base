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

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.organization.service.OrganizationService;



/**
* 조직마스터 관리
* @author 문희훈
* @since 2016. 12.23
* @version 1.0
* @see Copyright (C) by Retailtech All right reserved.
*/

@Service("OrganizationService")
public class OrganizationServiceImpl  implements OrganizationService {

	@Autowired
	private OrganizationDao organizationDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrganizationServiceImpl.class);


	/* 조직목록의 트리메뉴 리스트 조회
	 * @see retail.organization.service.OrganizationService#getOrganizationList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getOrganizationList(Map<String, Object> paramMap) throws Exception {
		organizationDao.getOrganizationList(paramMap);
	}


	/* 조직 상세정보 조회
	 * @see retail.organization.service.OrganizationService#getOrganizationDetailInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void getOrganizationDetailInfo(Map<String, Object> paramMap) throws Exception {
		organizationDao.getOrganizationDetailInfo(paramMap);
	}


	/* 부서코드 중복검사
	 * @see retail.organization.service.OrganizationService#selectCountDeptCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectCountDeptCode(Map<String, Object> paramMap) throws Exception {
		organizationDao.selectCountDeptCode(paramMap);
	}


	/* 조직마스터 신규/수정
	 * @see retail.organization.service.OrganizationService#setDeptInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void setDeptInfo(Map<String, Object> paramMap) throws Exception {
		organizationDao.setDeptInfo(paramMap);
	}

	 
	
 
}
