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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.wms.stock.wmsStockLocationItem.service.WmsStockLocationItemService;
import retail.wms.stock.wmsStockLocationItem.service.WmsStockLocationItemVO;



/**
 * WMS -Location 재고조회
 * @author 문희훈
 * @since 2017. 03.16
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("WmsStockLocationItemService")
public class WmsStockLocationItemServiceImpl  implements WmsStockLocationItemService {

	@Autowired
	private WmsStockLocationItemDao wmsStockLocationItemDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(WmsStockLocationItemServiceImpl.class);


	/*  Location 재고조회
	 * @see retail.wms.stock.wmsStockLocation.service.WmsStockLocationService#getWmsStockLocationList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsStockLocationItemList(Map<String, Object> param)throws Exception {
		wmsStockLocationItemDao.getWmsStockLocationItemList(param);
	}


	/* Location 재고조회 엑셀다운로드
	 * @see retail.wms.stock.wmsStockLocation.service.WmsStockLocationService#wmsStockLocationExcelDown(java.util.Map)
	 */
	@Override
	@Transactional
	public Map<String, Object> wmsStockLocationItemExcelDown(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("ZONE");
		colName.add("RACK");
		colName.add("LINE");
		colName.add("협력업체명");
		colName.add("상품코드");
		colName.add("상품명");
		colName.add("스캔코드");
		colName.add("단위");
		colName.add("재고수량");
		
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		wmsStockLocationItemDao.wmsStockLocationItemExcelDown(paramMap);		
		
		
		List<WmsStockLocationItemVO> RETURN_CUR = (List<WmsStockLocationItemVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ZONE_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("RACK_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("LINE_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("UNIT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CUR_INV_QTY")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
			// 데이터를 담는 부분
			map.put("sheetName", "Sheet1");  // 시트이름
			map.put("colName", colName);                 // 제목값
			map.put("colValue", _map);			    // 데이터
			map.put("excelname", "Location 재고조회");  // 엑셀파일명
		}else{
			//널처리
			colValue = new ArrayList<String>();
			
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");

			_map.put("time"+0, colValue);
			
			map.put("sheetName", "Sheet1");
			map.put("colName", colName);
			map.put("colValue", _map);					
			map.put("excelname", "Location 재고조회");
		}
			
		 // 담은 값을 Controller로 return
		return map;
	}


	@Override
	@Transactional
	public List<Map<String, Object>> updateValidEndDt(  Map<String, Object> param) throws Exception { 
		return wmsStockLocationItemDao.updateValidEndDt(param);
	}
 
}
