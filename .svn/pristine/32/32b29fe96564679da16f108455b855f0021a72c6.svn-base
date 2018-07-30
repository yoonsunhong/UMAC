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
package retail.stock.stockReal.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.stock.stockReal.service.StockRealService;




/**
 * 실사재고 등록
 * @author 문희훈
 * @since 2017. 02.07
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("StockRealService")
public class StockRealServiceImpl  implements StockRealService {

	@Autowired
	private StockRealDao stockRealDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(StockRealServiceImpl.class);

	/* 점포코드 리스트 조회
	 * @see retail.stock.stockReal.service.StockRealService#getSelectStoreCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void getSelectStoreCode(Map<String, Object> paramMap)throws Exception {
		stockRealDao.getSelectStoreCode(paramMap);
	}
	
	
	/*  점포에 예정된 재고조사 일정 ID 리스트 조회
	 * @see retail.stock.stockReal.service.StockRealService#getStoreCodeFlag(java.util.Map)
	 */
	@Override
	@Transactional
	public void getInvInspSchdIdList(Map<String, Object> paramMap) throws Exception {
		stockRealDao.getInvInspSchdIdList(paramMap);
	}


	/* 재고조사 일정 ID로 조사일정 조회
	 * @see retail.stock.stockReal.service.StockRealService#getInvInspDt(java.util.Map)
	 */
	@Override
	@Transactional
	public void getInvInspDt(Map<String, Object> param) throws Exception {
		stockRealDao.getInvInspDt(param);
	}


	/* 바코드로 상품정보 가지고오기
	 * @see retail.stock.stockReal.service.StockRealService#getProductDtlInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void getProductDtlInfo(Map<String, Object> param) throws Exception {
		stockRealDao.getProductDtlInfo(param);
	}

	/**
	 * EXCEL 업로드 데이터 TEMP디비에 저장 후 유효성 체크 
	 * 1.해당 점포에 취급하는 상품 인지 체크
	 * 2.스캔코드가 13자리 인지 체크 (숫자형)
	 * 3.재고수량이 숫자인지 체크
	 * 4.매장구분 1 OR 2로 입력했는지
	 * @param result
	 * @throws Exception
	 */
	@Override
	@Transactional
	public void stockGridExcelUpload(Map<String, Object> result)throws Exception {
		stockRealDao.stockGridExcelUpload(result);
	}


	/* 실사재고 그리드1데이터 저장
	 * @see retail.stock.stockReal.service.StockRealService#saveStockRealData(java.util.Map)
	 */
	@Override
	@Transactional
	public void saveStockRealData(Map<String, Object> param) throws Exception {
		stockRealDao.saveStockRealData(param);
	}


	
	/* 실사재고 조회
	 * @see retail.stock.stockReal.service.StockRealService#getStockRealData(java.util.Map)
	 */
	@Override
	@Transactional
	public void getStockRealData(Map<String, Object> param) throws Exception {
		stockRealDao.getStockRealData(param);
	}

	
	/* 실사재고 조회(확정) - 탭2
	 * @see retail.stock.stockReal.service.StockRealService#getStockRealDataCheckList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getStockRealDataCheckList(Map<String, Object> param) throws Exception {
		stockRealDao.getStockRealDataCheckList(param);
	}


	/* 실사재고 그리드2 데이터 수정/삭제
	 * @see retail.stock.stockReal.service.StockRealService#updateStockRealData(java.util.Map)
	 */
	@Override
	@Transactional
	public void updateStockRealData(Map<String, Object> param) throws Exception {
		stockRealDao.updateStockRealData(param);
	}


	/* 실사재고 그리드2 확정
	 * @see retail.stock.stockReal.service.StockRealService#submitStockRealData(java.util.Map)
	 */
	@Override
	@Transactional
	public void submitStockRealData(Map<String, Object> param) throws Exception {
		stockRealDao.submitStockRealData(param);
	}

	
	@Override
	public List<Map<String, Object>> stockRealPreview(Map<String, Object> param) throws Exception {
		return stockRealDao.stockRealPreview(param);
	}
	
	
 
}
