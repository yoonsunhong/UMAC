package retail.stock.stockChange.service;

import java.util.Map;


/**
 * 재고조정 등록
 * @author 문희훈
 * @since 2017. 04.17
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface StockChangeService {

	/**
	 * 재고조정 상품 등록여부 체크
	 * @param param
	 * @throws Exception
	 */
	void getProductInsertCheck(Map<String, Object> param) throws Exception;
	
	/**
	 * 일수불 상품정보 가지고오기
	 * @param param
	 * @throws Exception
	 */
	void getProductCollDtlInfo(Map<String, Object> param) throws Exception;

	/**
	 * 재고조정 등록
	 * @param param
	 * @throws Exception
	 */
	void insertProductChangeInfo(Map<String, Object> param) throws Exception;

	/**
	 * 재고등록목록조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectProductChangeInfo(Map<String, Object> param) throws Exception;

	/**
	 * 재고조정수정
	 * @param param
	 * @throws Exception
	 */
	void updateProductChangeInfo(Map<String, Object> param) throws Exception;

	/**
	 * 재고조정삭제
	 * @param param
	 * @throws Exception
	 */
	void deleteProductChangeInfo(Map<String, Object> param)throws Exception;

	/**
	 * 재고조정 확정
	 * @param param
	 * @throws Exception
	 */
	void submitProductChangeInfo(Map<String, Object> param)throws Exception;

	


	
}