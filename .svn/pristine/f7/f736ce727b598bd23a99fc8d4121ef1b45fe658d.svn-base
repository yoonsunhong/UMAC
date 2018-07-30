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
 





import retail.order.store.service.OrderStoreExcelService;
import retail.order.store.service.OrderStoreExcelVO; 


/**
 * @Class Name : OrderStoreExcelServiceImpl.java
 * @Description : OrderStoreExcelServiceImpl Class
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

@Service("OrderStoreExcelService")
public class OrderStoreExcelServiceImpl  implements OrderStoreExcelService {

	@Autowired
	private OrderStoreExcelDao orderStoreExcelDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrderStoreExcelServiceImpl.class);

	
	
	@Override 
	public List<Map<String, Object>> excelDataLoad(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelDao.excelDataLoad(param);
	}
	 

	@Override 
	public List<Map<String, Object>> excelDataLoadBuyerR1(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelDao.excelDataLoadBuyerR1(param);
	}

	@Override 
	public List<Map<String, Object>> excelDataLoadBuyer(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelDao.excelDataLoadBuyer(param);
	}
	
	
	@Override
	@Transactional
	public List<Map<String, Object>> orderStoreProductExcelRegister(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelDao.orderStoreProductExcelRegister(param);
	}
	@Override
	@Transactional
	public List<Map<String, Object>> jobUploadToOrder(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelDao.jobUploadToOrder(param);
	}
	
	
	@Override 
	public List<Map<String, Object>> orderUploadSearch(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelDao.orderUploadSearch(param);
	}

	@Override 
	public List<Map<String, Object>> orderUploadDel(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelDao.orderUploadDel(param);
	}
	
	@Override 
	public List<Map<String, Object>> orderUploadUpdate(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelDao.orderUploadUpdate(param);
	}
	
	
	@Override 
	public List<Map<String, Object>> orderAddItmSave(  Map<String, Object> param) throws Exception { 
		return orderStoreExcelDao.orderAddItmSave(param);
	}
	
	

	/* R2 발주 엑셀 데이터 다운로드  엑셀다운 
	 */
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> r2OrderExcelData(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

//		colName.add("CORP_CODE");
//		colName.add("ORD_DT");
		colName.add("STR_CODE");
		colName.add("STR_NAME");
//		colName.add("SEQ");
		colName.add("BAR_CODE");
		colName.add("ITM_NAME");
		colName.add("ORD_QTY");
		colName.add("CFM_QTY");
//		colName.add("ITM_GB");
		colName.add("VEN_CODE");
		colName.add("VEN_NAME");
		colName.add("PUR_WPRC");
		colName.add("PUR_WVAT");
//		colName.add("REG_PATH");
//		colName.add("CFM_DT");
//		colName.add("INV_FLAG");
		colName.add("IDATE");
		colName.add("IEMP_NO");
		colName.add("USER_NM");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		orderStoreExcelDao.r2OrderExcelData(paramMap);		
		
		
		List<OrderStoreExcelVO> RETURN_CUR = (List<OrderStoreExcelVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
//				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CORP_CODE")));
//				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ORD_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
//				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SEQ")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ORD_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CFM_QTY")));
//				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_WVAT")));
//				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("REG_PATH")));
//				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CFM_DT")));
//				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("INV_FLAG")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("IDATE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("IEMP_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("USER_NM")));
			 
				_map.put("time"+i, colValue);
				colValue = null;
			}
		
		}else{
			//널처리
			colValue = new ArrayList<String>();
			
//			colValue.add("");
//			colValue.add("");
			colValue.add("");
			colValue.add("");
//			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
//			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
//			colValue.add("");
//			colValue.add("");
//			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			
			_map.put("time"+0, colValue);
			 
		}
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	    Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime());
		map.put("sheetName", "Sheet1");  				// 시트이름
		map.put("colName", colName);                 	// 제목값
		map.put("colValue", _map);			    		// 데이터
		map.put("excelname", "생식R2점발주엑셀데이터_"+strToday );  // 엑셀파일명
		map.put("colColor", "5,8,9");			    	// 색 칠할 컬럼인덱스 . 0 부터 시작
		 
		 // 담은 값을 Controller로 return
		return map;
	}	

	@Override
	public List<Map<String, Object>> orderAddItm(Map<String, Object> param) throws Exception {
		return orderStoreExcelDao.orderAddItm(param);
	}
 

	
 
}
