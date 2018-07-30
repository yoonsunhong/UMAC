package retail.wms.stock.wmsStockLocationItem.service;

import java.util.List;
import java.util.Map;


/**
 * WMS -Location 재고조회
 * @author 문희훈
 * @since 2017. 03.16
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface WmsStockLocationItemService {

	/**
	 *  Location 재고조회
	 * @param param
	 * @throws Exception
	 */
	void getWmsStockLocationItemList(Map<String, Object> param) throws Exception;

	/**
	 *   Location 재고조회 엑셀다운로드
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	Map<String, Object> wmsStockLocationItemExcelDown(Map<String, Object> paramMap)throws Exception;


	List<Map<String, Object>>  updateValidEndDt(  Map<String, Object> param) throws Exception;
	

	
}