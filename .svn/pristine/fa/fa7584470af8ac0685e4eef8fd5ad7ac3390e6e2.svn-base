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
package retail.posclosed.cal.service.impl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : PosClosedCalDao.java
 * @Description : 영업정보 > POS정산 > POS마감정산
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 03.15           최초생성
 *
 * @author 김경진
 * @since 2017. 03. 15.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("PosClosedCalDao")
public class PosClosedCalDao extends EgovAbstractDAO {
	
	public Map<String, Object> getPosClosedCal(Map<String, Object> params) throws Exception {
		select("posClosedCal.getPosClosedCal", params);
		return params;
	}
	
	
}
