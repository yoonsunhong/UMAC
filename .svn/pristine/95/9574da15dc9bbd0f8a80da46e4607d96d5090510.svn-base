package retail.wms.stock.wmsStockChange.service;

import java.util.Map;


/**
 * WMS - StockChange 할당조정
 * @author 송원두
 * @since 2018. 02.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface WmsStockChangeService {

	/**
	 * 상품조회(입고수량 <> 할당수량 )
	 * @param param
	 * @throws Exception
	 */
	void getWmsStockChangeList(Map<String, Object> param)throws Exception;

	/**
	 * 할당변경 수정
	 * @param param
	 * @throws Exception
	 */
	void saveWmsStockChangeUpdate(Map<String, Object> param)throws Exception;

	/**
	 * WMS 변경내역 조회
	 * @param param
	 * @throws Exception
	 */
	void getWmsStockChangeInfoList(Map<String, Object> param)throws Exception;
	
	/**
	 * WMS 현 재고 조회
	 * @param param
	 * @throws Exception
	 */
	void getWmsStockChangePreList(Map<String, Object> param)throws Exception;
}