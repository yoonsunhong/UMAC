package retail.wms.stock.wmsStockRealExcel.service;

import java.util.Map;

public interface WmsStockRealExcelService {
	
	/**
	 * 점포별 재고조사 날짜 리스트 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getWmsInvInspDtList(Map<String, Object> paramMap) throws Exception;

	/**
	 * 점포별 전  재고조사 날짜 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getWmsInvBeforeDt(Map<String, Object> paramMap) throws Exception;

	/**
	 * 실사재고엑셀조정 조회
	 * @param param
	 * @throws Exception
	 */
	void getWmsStockRealExcelList(Map<String, Object> param) throws Exception;

	/**
	 *  EXCEL 업로드 데이터 TEMP디비에 저장 후 유효성 체크 
	 * 1.해당 점포에 취급하는 상품 인지 체크
	 * 2.재고수량이 숫자인지 체크
	 * 3.매장구분 1 OR 2로 입력했는지
	 * @param result
	 * @throws Exception
	 */
	void wmsStockExcelUpload(Map<String, Object> result) throws Exception;

	
	/**
	 * 실사재고엑셀조정 엑셀 업로드 데이터 저장
	 * @param param
	 * @throws Exception
	 */
	void saveWmsStockExcelData(Map<String, Object> param) throws Exception;
}
