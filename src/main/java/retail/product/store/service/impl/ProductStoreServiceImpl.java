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
package retail.product.store.service.impl;

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
 
  
import retail.product.store.service.ProductStoreService;
import retail.product.store.service.ProductStoreVO; 


/**
 * @Class Name : ProductStoreServiceImpl.java
 * @Description : ProductStoreServiceImpl Class
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

@Service("ProductStoreService")
public class ProductStoreServiceImpl  implements ProductStoreService {

	@Autowired
	private ProductStoreDao productStoreDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductStoreServiceImpl.class);

	   
	 

	/**
	 * 점별 상품 조회 List
	 */
	public List<Map<String, Object>>  productStoreSearchList(Map<String, Object> params) throws Exception {
		return productStoreDao.productStoreSearchList(params);
	}
	
 
	@Override
	@Transactional
	public List<Map<String, Object>> productStoreUpdate(  Map<String, Object> param) throws Exception { 
		return productStoreDao.productStoreUpdate(param);
	}

 
	
	

	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> excelProductMasterStore(Map<String, Object> paramMap) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행
		 
		colName.add("상품코드");
		colName.add("스캔코드");
		colName.add("상품명"); 
		colName.add("과세구분");
		colName.add("단가");
		colName.add("원가");
		colName.add("부가세");
		colName.add("매가");
		colName.add("마진율");
		colName.add("입수");
		colName.add("행사매가");
		colName.add("거래구분");
		colName.add("배송구분");
		colName.add("취급여부"); 
		colName.add("수수료율 ");
		colName.add("상품분류코드");
		colName.add("상품분류");
		colName.add("관리구분");
		colName.add("상품구분");
		colName.add("협력업체코드"); 
		colName.add("협력업체명"); 
		colName.add("시작날짜");
		colName.add("포인트적립여부");
		colName.add("상품형태"); 
		
//		colName.add("행사명"); 
		colName.add("현재고");
		
		colName.add("최종매입일");
		colName.add("최종매출일");
		colName.add("직전매입가");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
		productStoreDao.excelProductMasterStore(paramMap);
		
		List<ProductStoreVO> RC = (List<ProductStoreVO>) paramMap.get("CUR");
		 
		if (RC != null && RC.size() > 0) {
			
			int dataLength = Math.round(RC.size());
			
			for(int i=0; i < dataLength ; i++){
				
				colValue = new ArrayList<String>();
				 
				colValue.add(""+String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_CODE")));
				colValue.add(""+String.valueOf(((Map<String, Object>) RC.get(i)).get("SCAN_CODE")));    
				colValue.add(""+String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_NAME")));    
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("TAX_GB_NM"))); 
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("WPRC_TOT")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("WPRC")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("WVAT")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("SPRC")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("MARGIN_PER")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("IPSU_QTY")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("EVT_SPRC"))); 
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("GRE_GB_NM")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("ROUTE_GB")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("END_IND"))); 
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("PRGT_RATE")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("CLS_CODE")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("CLS_NAME")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_STD_NM")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_GB_NM")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_CODE"))); 
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_NAME"))); 
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_DT")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("POINT_SAVE")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_FORM"))); 
//				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("EVT_NM"))); 
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("CUR_INV_QTY"))); 
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("LAST_PUR_DT")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("LAST_SALE_DT")));
				colValue.add(" "+String.valueOf(((Map<String, Object>) RC.get(i)).get("PREV_PRICE")));
				
				_map.put("time"+i, colValue);
				colValue = null;
				
			}
			
		}else{
			
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
		map.put("sheetName", "Sheet1");  				// 시트이름
		map.put("colName", colName);                 	// 제목값
		map.put("colValue", _map);			    		// 데이터
		map.put("excelname", "점상품마스터조회엑셀데이터_"+strToday );  // 엑셀파일명
		//map.put("colColor", "5,8,9");			    	// 색 칠할 컬럼인덱스 . 0 부터 시작
		
		return map;
	}

	 
	
	
	
	
	
	
	
	
	
	
}
