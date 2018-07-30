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
package retail.code.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

import retail.code.service.CodeVO;

/**
 * @Class Name : CodeDao.java
 * @Description : CodeDao Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@SuppressWarnings("unchecked")
@Repository("CodeDao")
public class CodeDao extends EgovAbstractDAO {

	/**
	 * 공통코드 리스트 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getCodeCategory(Map<String, Object> paramMap) throws Exception{
		list("code.getCodeCategory", paramMap);
	}
	
	/**
	 * 공통코드 상세 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getCodeDetail(Map<String, Object> paramMap) throws Exception{
		list("code.getCodeDetail", paramMap);
	}
	
	/**
	 * 공통코드 중복 검사
	 * @param paramMap
	 * @throws Exception
	 */
	public  void selectCountCode(Map<String, Object> paramMap) throws Exception {
		select ("code.selectCountCode", paramMap);
		 
	}
	
	/**
	 * 공통분류 신규등록
	 * @param paramMap
	 * @throws Exception
	 */
	public void insertCategory(Map<String, Object> paramMap) throws Exception {
		insert("code.insertCategory", paramMap);
	}
	
	/**
	 * 공통코드 수정 
	 * @param paramMap
	 * @throws Exception
	 */
	public void updateCategory(Map<String, Object> paramMap) throws Exception {
		update("code.updateCategory", paramMap);
	}
	
	/**
	 * 공통코드 삭제
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteCode(Map<String, Object> paramMap) throws Exception {
		delete("code.deleteCode", paramMap);
	}
		
	/**
	 * 공통코드 상세 등록
	 * @param paramMap
	 * @throws Exception
	 */
	public void insertCodeDetail(Map<String, Object> paramMap) throws Exception {
		insert("code.insertCodeDetail", paramMap);
	}
	
	/**
	 * 공통코드 상세 수정
	 * @param paramMap
	 * @throws Exception
	 */
	public void updateCodeDetail(Map<String, Object> paramMap) throws Exception {
		
		//System.out.println(paramMap);
		update("code.updateCodeDetail", paramMap);
	}
	 
	/**
	 * 공통코드 상세 삭제
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteCodeDetail(Map<String, Object> paramMap) throws Exception {
		delete("code.deleteCodeDetail", paramMap);
	}
	
}
