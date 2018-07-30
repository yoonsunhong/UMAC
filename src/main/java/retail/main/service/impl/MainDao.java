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
package retail.main.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

import retail.main.service.MainVO;

/**
 * @Class Name : MainDao.java
 * @Description : MainDao Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.05           최초생성
 *
 * @author 문희훈
 * @since 2016. 12.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@SuppressWarnings("unchecked")
@Repository("MainDao")
public class MainDao extends EgovAbstractDAO {

	// 메인 대메뉴 조회
	public void getBigMenu(Map<String, Object> paramMap) throws Exception{
		list("Main.getBigMenu", paramMap);
	}

	// 메뉴 중메뉴 조회
	public void getMiddleMenu(Map<String, Object> paramMap) throws Exception{
		list("Main.getMiddleMenu", paramMap);
	}

	/**
	 * 즐겨찾기 메뉴 조회
	 * @param paramMap
	 */
	public void getBookMarkMenu(Map<String, Object> paramMap)  throws Exception{
		list("Main.getBookMarkMenu", paramMap);
	}
	

}
