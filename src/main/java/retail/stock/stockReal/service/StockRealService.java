package retail.stock.stockReal.service;

import java.util.List;
import java.util.Map;


/**
 * 실사재고등록
 * @author 문희훈
 * @since 2017. 01.24
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface StockRealService {
	
	/**
	 * 점포리스트박스 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getSelectStoreCode(Map<String, Object> paramMap)throws Exception;

	/**
	 *  점포에 예정된 재고조사 일정 ID 리스트 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getInvInspSchdIdList(Map<String, Object> paramMap) throws Exception;

	/**
	 * 재고조사 일정 ID로 조사일정 조회
	 * @param param
	 * @throws Exception
	 */
	void getInvInspDt(Map<String, Object> param)throws Exception;
	
	/**
	 * 바코드로 상품정보 가지고오기
	 * @param param
	 * @throws Exception
	 */
	void getProductDtlInfo(Map<String, Object> param)throws Exception;

	/**
	 * EXCEL 업로드 데이터 TEMP디비에 저장 후 유효성 체크 
	 * 1.해당 점포에 취급하는 상품 인지 체크
	 * 2.스캔코드가 13자리 인지 체크 (숫자형)
	 * 3.재고수량이 숫자인지 체크
	 * 4.매장구분 1 OR 2로 입력했는지
	 * @param result
	 * @throws Exception
	 */
	void stockGridExcelUpload(Map<String, Object> result)throws Exception;
	
	/**
	 * 실사재고 그리드1데이터 저장
	 * @param param
	 * @throws Exception
	 */
	void saveStockRealData(Map<String, Object> param)throws Exception;

	/**
	 * 실사재고 조회
	 * @param param
	 * @throws Exception
	 */
	void getStockRealData(Map<String, Object> param)throws Exception;

	/**
	 * 실사재고 조회(확정) - 탭2
	 * @param param
	 * @throws Exception
	 */
	void getStockRealDataCheckList(Map<String, Object> param)throws Exception;

	/**
	 * 실사재고 그리드2 데이터 수정/삭제
	 * @param param
	 * @throws Exception
	 */
	void updateStockRealData(Map<String, Object> param) throws Exception;

	/**
	 * 실사재고 그리드2
	 * @param param
	 * @throws Exception
	 */
	void submitStockRealData(Map<String, Object> param)throws Exception;

	
	/**
	 * 실사재고 미리보기
	 * @param param
	 * @throws Exception
	 */
	List<Map<String, Object>> stockRealPreview(Map<String, Object> param) throws Exception;	
	
}