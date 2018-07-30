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
package retail.wms.in.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.wms.in.service.WmsInNonPaymentService;
import retail.wms.in.service.WmsInVO;



/**
 * WMS -미납현황 조회
 * @author 문희훈
 * @since 2017. 01.13
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("WmsInNonPaymentService")
public class WmsInNonPaymentServiceImpl  implements WmsInNonPaymentService {

	@Autowired
	private WmsInNonPaymentDao wmsInNonPaymentDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(WmsInNonPaymentServiceImpl.class);


	/* 미납현황 조회
	 * @see retail.wms.in.service.WmsInNonPaymentService#getWmsNonPaymentList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsNonPaymentList(Map<String, Object> param) throws Exception {
		wmsInNonPaymentDao.getWmsNonPaymentList(param);
	}


	/* 미납현황 엑셀다운
	 * @see retail.wms.in.service.WmsInNonPaymentService#wmsNonPaymentExcelDown(java.util.Map)
	 */
	@Override
	@Transactional
	public Map<String, Object> wmsNonPaymentExcelDown(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("협력업체코드");
		colName.add("협력업체명");
		colName.add("상품코드");
		colName.add("상품명");
		colName.add("단위");
		colName.add("입고구분");
		colName.add("입고일자");
		colName.add("발주수량");
		colName.add("입고수량");
		colName.add("미납수량");
		
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		wmsInNonPaymentDao.wmsNonPaymentExcelDown(paramMap);		
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("UNIT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ORD_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DEC_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NON_QTY")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
			// 데이터를 담는 부분
			map.put("sheetName", "Sheet1");  // 시트이름
			map.put("colName", colName);                 // 제목값
			map.put("colValue", _map);			    // 데이터
			map.put("excelname", "미납현황");  // 엑셀파일명
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
			colValue.add("");

			_map.put("time"+0, colValue);
			
			map.put("sheetName", "Sheet1");
			map.put("colName", colName);
			map.put("colValue", _map);					
			map.put("excelname", "미납현황");
		}
			
		 // 담은 값을 Controller로 return
		return map;
	}


	
 
}