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
package retail.posclosed.douzoneDay.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : PosClosedDouzoneDayDao.java
 * @Description : 영업정보 > POS정산 > POS마감정산
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 04.20           최초생성
 *
 * @author 김경진
 * @since 2017. 04. 20.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("PosClosedDouzoneDayDao")
public class PosClosedDouzoneDayDao extends EgovAbstractDAO {
	
	public Map<String, Object> getPosClosedDouzoneDay(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.getPosClosedDouzoneDay", params);
		return params;
	}
	
	public Map<String, Object> posClosedDouzoneDaySum(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.posClosedDouzoneDaySum", params);
		return params;
	}
	
	public Map<String, Object> updatePosClosedDouzoneDay(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.updatePosClosedDouzoneDay", params);
		return params;
	}
	
	public Map<String, Object> canclePosClosedDouzoneDay(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.canclePosClosedDouzoneDay", params);
		return params;
	}
	
	public Map<String, Object> updatePosClosedDouzoneDay1(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.updatePosClosedDouzoneDay1", params);
		return params;
	}
	
	public Map<String, Object> updatePosClosedDouzoneDay2(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.updatePosClosedDouzoneDay2", params);
		return params;
	}
	
	public Map<String, Object> updatePosClosedDouzoneDay3(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.updatePosClosedDouzoneDay3", params);
		return params;
	}
	
	public Map<String, Object> updatePosClosedDouzoneDay4(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.updatePosClosedDouzoneDay4", params);
		return params;
	}
	
	public Map<String, Object> updatePosClosedDouzoneDay5(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.updatePosClosedDouzoneDay5", params);
		return params;
	}
	
	
	public List<Map<String, Object>>  oracleToXmlFileSave(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("posClosedDouzoneDay.oracleToXmlFileSave", params);
		 
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> posClosedDouzoneDayList_excel(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("posClosedDouzoneDay.posClosedDouzoneDayList_excel", params);
	}
	
	
	public Map<String, Object> posClosedDouzoneDayList_excel_ch(Map<String, Object> params) throws Exception {
		select("posClosedDouzoneDay.posClosedDouzoneDayList_excel_ch", params);
		return params;
	}
	
}
