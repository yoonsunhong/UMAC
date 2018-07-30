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
package retail.menurole.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * @Class Name : MenuRoleDao.java
 * @Description : MenuRoleDao Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.12.18           최초생성
 *
 * @author mhh
 * @since 2017.12.18
 * @version 1.0
 * @see
 *
 *  Copyright (C) by Retailtech All right reserved.
 */

@SuppressWarnings("unchecked")
@Repository("MenuRoleDao")
public class MenuRoleDao extends EgovAbstractDAO {

	/**
	 * 사용자목록조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getUserRoleList(Map<String, Object> paramMap) throws Exception{
		select("menurole.getUserRoleList", paramMap);
	}

	
	/**
	 * 부서 리스트박스 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getDeptCodeList(Map<String, Object> paramMap) throws Exception{
		select("menurole.getDeptCodeList", paramMap);
	}


	/**
	 * 사용자 기능별 권한 리스트 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getUserMenuRoleList(Map<String, Object> param)  throws Exception{
		return (List<Map<String, Object>>)list("menurole.getUserMenuRoleList",param);
	}


	/**
	 * 메뉴별 권한 복사 등록 실행 DELETE/SELECT/INSERT
	 * @param param
	 * @throws Exception
	 */
	public void copyUserRoleList(Map<String, Object> param) throws Exception{
		update("menurole.copyUserRoleList", param);
	}


	/**
	 * 사용자 메뉴별 권한 저장
	 * @param param
	 * @throws Exception
	 */
	public void userMenuRoleUpdate(Map<String, Object> param) throws Exception{
		update("menurole.userMenuRoleUpdate", param);
	}
	
	
	
}
