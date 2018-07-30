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
package retail.groupGridTest.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

import retail.groupGridTest.service.GroupGridTestVO; 

/**
 * @Class Name : GroupGridTestDao.java
 * @Description : GroupGridTestDao Class
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
@Repository("GroupGridTestDao")
public class GroupGridTestDao extends EgovAbstractDAO {

	
 
	//  메뉴 리스트
	public List<GroupGridTestVO> groupGridTest( Map<String, Object> paramMap) throws Exception{
		return (List<GroupGridTestVO>) list("groupGridTest.groupGridTest", paramMap);
	}
	
	
//	// 메뉴 수정
//	public Integer updateMenuInfo(GroupGridTestVO params) throws Exception {
//		return (Integer) this.update("groupGridTest.updateMenuInfo", params);
//	}
//	
//	
//	// 메뉴 저장
//	public Integer insertMenuInfo(GroupGridTestVO params) throws Exception {
//		return (Integer) this.update("groupGridTest.insertMenuInfo", params);
//	}
//	
//	// 메뉴 삭제
//	public Integer deleteMenuInfo(GroupGridTestVO params) throws Exception {
//		return (Integer) this.delete("groupGridTest.deleteMenuInfo", params);
//	}
//
//
//	public String selectMenuBigo(GroupGridTestVO params)throws Exception {
//		return (String) select("groupGridTest.selectMenuBigo", params);
//	}
	
	 
	
}
