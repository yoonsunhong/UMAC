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
package retail.stock.stockRealExcel.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.stock.stockRealExcel.service.StockRealExcelService;





/**
 * 실사재고엑셀조정
 * @author 문희훈
 * @since 2017. 05.03
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("StockRealExcelService")
public class StockRealExcelServiceImpl  implements StockRealExcelService {

	@Autowired
	private StockRealExcelDao stockRealExcelDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(StockRealExcelServiceImpl.class);


	/* 점포별 재고조사 날짜 리스트 조회
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#getInvInspDtList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getInvInspDtList(Map<String, Object> paramMap) throws Exception {
		stockRealExcelDao.getInvInspDtList(paramMap);
	}


	/* 점포별 전  재고조사 날짜 조회
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#getInvBeforeDt(java.util.Map)
	 */
	@Override
	@Transactional
	public void getInvBeforeDt(Map<String, Object> paramMap) throws Exception {
		stockRealExcelDao.getInvBeforeDt(paramMap);
	}
	
	
	/* 특정점포 전 재고조사일자 목록조회
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#getInvBeforeDtList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getInvBeforeDtList(Map<String, Object> paramMap) throws Exception {
		stockRealExcelDao.getInvBeforeDtList(paramMap);
	}
	

	/* 실사재고엑셀조정 조회
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#getStockRealExcelList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getStockRealExcelList(Map<String, Object> param) throws Exception {
		stockRealExcelDao.getStockRealExcelList(param);
	}
	
	/*
	 * 실사재고엑셀조정 팝업 행추가 저장시 그리드 세부내역 조회에서 그리드에 추가
	 */
	@Override
	public List<Map<String, Object>> stockExcelUploadSave(Map<String, Object> param) throws Exception {
		return stockRealExcelDao.stockExcelUploadSave(param);
	}


	/*  
	 * EXCEL 업로드 데이터 TEMP디비에 저장 후 유효성 체크 
	 * 1.해당 점포에 취급하는 상품 인지 체크
	 * 2.재고수량이 숫자인지 체크
	 * 3.매장구분 1 OR 2로 입력했는지
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#stockExcelUpload(java.util.Map)
	 */
	@Override
	@Transactional
	public void stockExcelUpload(Map<String, Object> result) throws Exception {
		stockRealExcelDao.stockExcelUpload(result);
	}


	/* 실사재고엑셀조정 엑셀 업로드 데이터 저장
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#saveStockExcelData(java.util.Map)
	 */
	@Override
	@Transactional
	public void saveStockExcelData(Map<String, Object> param) throws Exception {
		stockRealExcelDao.saveStockExcelData(param);
	}

	
 
	/* 실사재고엑셀조정 엑셀 업로드 데이터 확정
	 */
	@Override
	@Transactional
	public void confirmStockRealExcelFinish(Map<String, Object> param) throws Exception {
		stockRealExcelDao.confirmStockRealExcelFinish(param);
	}
	
	
	@Override
	public List<Map<String, Object>> stockRealExcelPreview(Map<String, Object> param) throws Exception {
		return stockRealExcelDao.stockRealExcelPreview(param);
	}	
}
