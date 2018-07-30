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
package retail.stock.stockSchedule.service.impl;

import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;




/**
 * 영업정보 -재고조사 일정 관리
 * @author 문희훈
 * @since 2017. 02.01
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("StockScheduleDao")
public class StockScheduleDao extends EgovAbstractDAO {

	/**
	 * 조직목록의 트리메뉴 리스트 조회(물류센터 제외)
	 * @param paramMap
	 * @throws Exception
	 */
	public void getStockOrganizationList(Map<String, Object> paramMap) throws Exception{
		list("stockSchedule.getStockOrganizationList", paramMap);	
	}
	
	
	/**
	 * 재고조사 일정 목록조회
	 * @param param
	 * @throws Exception
	 */
	public void getInventorySchedule(Map<String, Object> param) throws Exception{
		list("stockSchedule.getInventorySchedule", param);	
	}

	/**
	 * 재고조사일정ID 발번
	 * @param param
	 * @throws Exception
	 */
	public void getSchdId(Map<String, Object> param) throws Exception{
		select("stockSchedule.getSchdId", param);	
	}
	
	/**
	 * 재고조사일정 INSERT/UPDATE
	 * @param param
	 * @throws Exception
	 */
	public void setInvInspSchdtInfo(Map<String, Object> param)throws Exception{
		update("stockSchedule.setInvInspSchdtInfo", param);	
	}

}
