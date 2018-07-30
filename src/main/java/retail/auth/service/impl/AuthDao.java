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
package retail.auth.service.impl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * @Class Name : AuthDao.java
 * @Description : AuthDao Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.12.05           최초생성
 *
 * @author 문희훈
 * @since 2016.12.05
 * @version 1.0
 * @see
 *
 *  Copyright (C) by Retailtech All right reserved.
 */

@SuppressWarnings("unchecked")
@Repository("AuthDao")
public class AuthDao extends EgovAbstractDAO {
	
	
	/**
	 * 권한그룹 목록 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void readAthGroupList(Map<String, Object> paramMap) throws Exception {
		list("auth.readAthGroupList", paramMap);
	}
	
	/**
	 * 사용가능 메뉴 목록조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void readAppointMenuList(Map<String, Object> paramMap) throws Exception {
		list("auth.readAppointMenuList", paramMap);
	}
	
	/**
	 * 사용불가 메뉴 목록 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public void notAppointMenuList(Map<String, Object> paramMap) throws Exception {
		list("auth.notAppointMenuList", paramMap);
	}
	
	
	/**
	 * 권한그룹 아이디 생성
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectAthGroupId(Map<String, Object> paramMap) throws Exception{
		select("auth.selectAthGroupId", paramMap);
	}
	
	
	
	/**
	 * 권한그룹 추가(관리자,사용자등의 권한)
	 * @param paramMap
	 * @throws Exception
	 */
	public void insertAth(Map<String, Object> paramMap) throws Exception {

		insert("auth.insertAth", paramMap);
		
	}
	
	/**
	 * 권한명, 비고, 사용유무등 수정
	 * @param params
	 * @throws Exception
	 */
	public void updateAth(Map<String, Object> paramMap) throws Exception {
		delete("auth.updateAth", paramMap);
	}
	
	/**
	 * 권한에 사용할  메뉴 등록
	 * @param params
	 * @throws Exception
	 */
	public void saveAth(Map<String, Object> paramMap) throws Exception {

		update("auth.saveAth", paramMap);
	}
	
	/**
	 * 권한에 지정된  메뉴 삭제
	 * @param params
	 * @throws Exception
	 */
	public void deleteAth(Map<String, Object> paramMap) throws Exception {
		delete("auth.deleteAth", paramMap);
	}
	
	/**
	 * 권한 그룹 삭제/지정메뉴목록 삭제 (DEL_YN 값만 Y로 변경) 
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteAthGroup(Map<String, Object> paramMap) throws Exception {

		update("auth.deleteAthGroup", paramMap);
	}
	
}
