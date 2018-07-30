package retail.wms.stock.wmsStockRealExcel.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.stock.stockRealExcel.service.impl.StockRealExcelDao;
import retail.stock.stockRealExcel.service.impl.StockRealExcelServiceImpl;
import retail.wms.stock.wmsStockRealExcel.service.WmsStockRealExcelService;

/**
 * 실사재고엑셀조정
 * @author 문희훈
 * @since 2017. 05.03
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("WmsStockRealExcelService")
public class WmsStockRealExcelServiceImpl implements WmsStockRealExcelService{
	@Autowired
	private WmsStockRealExcelDao wmsStockRealExcelDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(StockRealExcelServiceImpl.class);


	/* 점포별 재고조사 날짜 리스트 조회
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#getInvInspDtList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsInvInspDtList(Map<String, Object> paramMap) throws Exception {
		wmsStockRealExcelDao.getWmsInvInspDtList(paramMap);
	}


	/* 점포별 전  재고조사 날짜 조회
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#getInvBeforeDt(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsInvBeforeDt(Map<String, Object> paramMap) throws Exception {
		wmsStockRealExcelDao.getWmsInvBeforeDt(paramMap);
	}


	/* 실사재고엑셀조정 조회
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#getStockRealExcelList(java.util.Map)
	 */
	@Override
	@Transactional
	public void getWmsStockRealExcelList(Map<String, Object> param) throws Exception {
		wmsStockRealExcelDao.getWmsStockRealExcelList(param);
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
	public void wmsStockExcelUpload(Map<String, Object> result) throws Exception {
		wmsStockRealExcelDao.wmsStockExcelUpload(result);
	}


	/* 실사재고엑셀조정 엑셀 업로드 데이터 저장
	 * @see retail.stock.stockRealExcel.service.StockRealExcelService#saveStockExcelData(java.util.Map)
	 */
	@Override
	@Transactional
	public void saveWmsStockExcelData(Map<String, Object> param) throws Exception {
		wmsStockRealExcelDao.saveWmsStockExcelData(param);
	}

	
}
