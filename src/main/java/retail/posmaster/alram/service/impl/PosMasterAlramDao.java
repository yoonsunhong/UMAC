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
package retail.posmaster.alram.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : PosMasterAlramDao.java
 * @Description : POS관리 > POS안내문관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.26           최초생성
 *
 * @author 김경진
 * @since 2016. 12. 26.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("PosMasterAlramDao")
public class PosMasterAlramDao extends EgovAbstractDAO {
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getPosMasterAlramLogNo(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("posMasterAlram.getPosMasterAlramLogNo", param);
	}
	
	public Map<String, Object> getPosMasterAlram(Map<String, Object> params) throws Exception {
		select("posMasterAlram.getPosMasterAlram", params);
		return params;
	}
	
	public Map<String, Object> updatePosMasterAlram(Map<String, Object> param) throws Exception {
		select("posMasterAlram.updatePosMasterAlram", param);
		return param;
	}
	
	
}
