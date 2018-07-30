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
package retail.posmaster.shortcuts.service.impl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : PosMasterShortcutsDao.java
 * @Description : POS관리 > POS단축키 관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.03           최초생성
 *
 * @author 김경진
 * 2017. 01. 03.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("PosMasterShortcutsDao")
public class PosMasterShortcutsDao extends EgovAbstractDAO {
	
	public Map<String, Object> getPosMasterShortcuts(Map<String, Object> params) throws Exception {
		select("posMasterShortcuts.getPosMasterShortcuts", params);
		return params;
	}
	
	public Map<String, Object> getPosMasterShortcuts2(Map<String, Object> params) throws Exception {
		select("posMasterShortcuts.getPosMasterShortcuts2", params);
		return params;
	}
	
	public Map<String, Object> delPosShortCuts(Map<String, Object> params) throws Exception {
		select("posMasterShortcuts.delPosShortCuts", params);
		return params;
	}
	
	public Map<String, Object> updatePosMasterShortcuts(Map<String, Object> param) {
		select("posMasterShortcuts.updatePosMasterShortcuts", param);
		return param;
	}
	
}
