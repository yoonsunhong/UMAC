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
package retail.menu.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

import retail.menu.service.MenuVO; 

/**
 * @Class Name : MenuDao.java
 * @Description : MenuDao Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.12.05           최초생성
 *
 * @author 문희훈
 * @since 2016.12.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@SuppressWarnings("unchecked")
@Repository("MenuDao")
public class MenuDao extends EgovAbstractDAO {

	
 
	/**
	 * 메뉴 목록 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getMenuTree(Map<String, Object> paramMap) throws Exception{
		//System.out.println(paramMap.get("P_CORP_CODE"));
		list("menu.getMenuTree", paramMap);
	}
	
	/**
	 * 메뉴 정보 업데이트
	 * @param paramMap
	 * @throws Exception
	 */
	public void updateMenuInfo(Map<String, Object> paramMap) throws Exception {
		update("menu.updateMenuInfo", paramMap);
	}
	
	
	/**
	 * 메뉴 정보 신규등록 
	 * @param paramMap
	 * @throws Exception
	 */
	public void insertMenuInfo(Map<String, Object>  paramMap) throws Exception {
		update("menu.insertMenuInfo", paramMap);
	}
	
	
	/**
	 * 메뉴정보 삭제
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteMenuInfo(Map<String, Object>  paramMap) throws Exception {
		delete("menu.deleteMenuInfo", paramMap);
	}


	/**
	 * 메뉴 도움말정보 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectMenuBigo(Map<String, Object>  paramMap)throws Exception {
		select("menu.selectMenuBigo", paramMap);
	}
	
	 
	
}
