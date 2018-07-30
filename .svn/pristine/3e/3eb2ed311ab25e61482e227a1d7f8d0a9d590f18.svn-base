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
package retail.wms.stock.wmsStockLocationItem.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * WMS -Location 재고조회
 * @author 문희훈
 * @since 2017. 03.16
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("WmsStockLocationItemDao")
public class WmsStockLocationItemDao extends EgovAbstractDAO {

	/**
	 * Location 재고조회
	 * @param param
	 * @throws Exception
	 */
	public void getWmsStockLocationItemList(Map<String, Object> param) throws Exception{
		list("wmsStockLocationItem.getWmsStockLocationItemList", param);	
	}

	public void wmsStockLocationItemExcelDown(Map<String, Object> paramMap) throws Exception{
		list("wmsStockLocationItem.getWmsStockLocationItemExcel", paramMap);	
	}


	public  List<Map<String, Object>>  updateValidEndDt( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("wmsStockLocationItem.updateValidEndDt", param);
	}

	
}
