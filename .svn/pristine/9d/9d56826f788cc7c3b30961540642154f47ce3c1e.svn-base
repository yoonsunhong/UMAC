package retail.wms.stock.wmsStockRealExcel.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 실사재고엑셀조정
 * @author 문희훈
 * @since 2017. 05.03
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("WmsStockRealExcelDao")
public class WmsStockRealExcelDao extends EgovAbstractDAO{

	/**
	 * 점포별 재고조사 날짜 리스트 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getWmsInvInspDtList(Map<String, Object> paramMap) throws Exception{
		list("wmsStockRealExcel.getWmsInvInspDtList", paramMap);	
	}

	 
	/**
	 * 점포별 전  재고조사 날짜 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getWmsInvBeforeDt(Map<String, Object> paramMap)  throws Exception{
		select("wmsStockRealExcel.getWmsInvBeforeDt", paramMap);		
	}

	
	/**
	 * 실사재고엑셀조정 조회
	 * @param param
	 * @throws Exception
	 */
	public void getWmsStockRealExcelList(Map<String, Object> param)  throws Exception{
		list("wmsStockRealExcel.getWmsStockRealExcelList", param);	
	}


	/**
	 * EXCEL 업로드 데이터 TEMP디비에 저장 후 유효성 체크 
	 * 1.해당 점포에 취급하는 상품 인지 체크
	 * 2.재고수량이 숫자인지 체크
	 * 3.매장구분 1 OR 2로 입력했는지
	 * @param result
	 * @throws Exception
	 */
	public void wmsStockExcelUpload(Map<String, Object> result)  throws Exception{
		insert("wmsStockRealExcel.wmsStockExcelUpload", result);	
	}


	
	/**
	 * 실사재고엑셀조정 엑셀 업로드 데이터 저장
	 * @param param
	 * @throws Exception
	 */
	public void saveWmsStockExcelData(Map<String, Object> param) throws Exception{
		update("wmsStockRealExcel.saveWmsStockExcelData", param);	
	}
}
