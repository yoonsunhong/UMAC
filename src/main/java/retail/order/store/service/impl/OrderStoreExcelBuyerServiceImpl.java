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
package retail.order.store.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
  
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
  



import retail.common.service.impl.CommDAO;
import retail.order.store.service.OrderStoreExcelBuyerService;
import retail.order.store.service.OrderStoreExcelBuyerVO; 


/**
 * @Class Name : OrderStoreExcelBuyerServiceImpl.java
 * @Description : OrderStoreExcelBuyerServiceImpl Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.12.05           최초생성
 *
 * @author 유재훈
 * @since 2016.12.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("OrderStoreExcelBuyerService")
public class OrderStoreExcelBuyerServiceImpl  implements OrderStoreExcelBuyerService {

	@Autowired
	private OrderStoreExcelBuyerDao orderStoreExcelBuyerDao;
	 
	
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrderStoreExcelBuyerServiceImpl.class);

	
	 
	@Override 
	public List<Map<String, Object>> orderUploadSearchBuyer(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelBuyerDao.orderUploadSearchBuyer(param);
	}
	
	

	@Override
	public List<Map<String, Object>> orderAddItmBuyer(Map<String, Object> param) throws Exception {
		return orderStoreExcelBuyerDao.orderAddItmBuyer(param);
	}
 
	
	@Override 
	public List<Map<String, Object>> orderAddItmSaveBuyer(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelBuyerDao.orderAddItmSaveBuyer(param);
	}
	
	@Override 
	public List<Map<String, Object>> orderUploadDelBuyer(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelBuyerDao.orderUploadDelBuyer(param);
	}
	

	@Override 
	public List<Map<String, Object>> orderUploadUpdateBuyer(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelBuyerDao.orderUploadUpdateBuyer(param);
	}

	@Override 
	public List<Map<String, Object>> getStoreInfo(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelBuyerDao.getStoreInfo(param);
	}
	

	/* R2 발주 엑셀 데이터 다운로드  엑셀다운 
	 */
	@SuppressWarnings("unchecked")
	@Override
	@Transactional 
	public Map<String, Object> r2OrderExcelDataBuyer(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		
		
		colName.add("ORD_DT");
		colName.add("바코드");   //SCAN_CODE
		colName.add("ITM_NAME");
		colName.add("ITM_GB");
		colName.add("VEN_CODE");
		colName.add("VEN_NAME");
		colName.add("원가");    // PUR_WPRC
		colName.add("부가세");       // PUR_WVAT

		List<Map<String, Object>>  STR_CUR = orderStoreExcelBuyerDao.getStoreInfo(map );	 
		int strDataLength = Math.round(STR_CUR.size());
		for(int i = 0; i < strDataLength; i++){
			  
			colName.add(      ((Map<String, Object>) STR_CUR.get(i)).get("STR_NAME").toString()
						 +"_"+((Map<String, Object>) STR_CUR.get(i)).get("STR_CODE").toString()
					   );
		}
		  
		  
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		 
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		orderStoreExcelBuyerDao.r2OrderExcelDataBuyer(paramMap );		 
		List<OrderStoreExcelBuyerVO> RETURN_CUR = (List<OrderStoreExcelBuyerVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(    String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ORD_DT"))    );
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_WVAT")));
				  
				
				// 점별 주문 수량 가져오기
				for(int k = 1; k < strDataLength+1; k++){
					
					colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STORENAME"+k)));
					 
				}
				  
				_map.put("time"+i, colValue);
				colValue = null;
			}
		
		}else{
			// 조회건이 없으면 널처리
			colValue = new ArrayList<String>();
			 
			colValue.add("");
			colValue.add(""); 
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add(""); 
			colValue.add("");
			colValue.add("");
 
			_map.put("time"+0, colValue);
			 
		}
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	    Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime());
		map.put("sheetName", "Sheet1");  				 // 시트이름
		map.put("colName", colName);                 	 // 제목값
		map.put("colValue", _map);			    		 // 데이터
		map.put("excelname", "점발주엑셀데이터_"+strToday );  // 엑셀파일명
		map.put("colColor", "1,6,7");			    	 // 색 칠할 컬럼인덱스 . 0 부터 시작
		 
		 // 담은 값을 Controller로 return
		return map;
	}	
	
	

	@Override 
	public List<Map<String, Object>> excelDataLoadBuyerAll(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelBuyerDao.excelDataLoadBuyerAll(param);
	}
	
	@Override
	@Transactional
	public List<Map<String, Object>> orderStoreProductExcelRegisterBuyer(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelBuyerDao.orderStoreProductExcelRegisterBuyer(param);
	}
 
	@Override
	@Transactional
	public List<Map<String, Object>> jobUploadToOrderBuyer(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelBuyerDao.jobUploadToOrderBuyer(param);
	}
	
	
	
	
	
}
