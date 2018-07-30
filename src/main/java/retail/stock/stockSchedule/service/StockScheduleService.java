package retail.stock.stockSchedule.service;

import java.util.Map;



/**
 * 영업정보 -재고조사 일정 관리
 * @author 문희훈
 * @since 2017. 02.01
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface StockScheduleService {

	/**
	 * 조직목록의 트리메뉴 리스트 조회(물류센터 제외)
	 * @param paramMap
	 * @throws Exception
	 */
	void getStockOrganizationList(Map<String, Object> paramMap)throws Exception;
	
	/**
	 * 재고조사 일정 목록조회
	 * @param param
	 * @throws Exception
	 */
	void getInventorySchedule(Map<String, Object> param) throws Exception;

	/**
	 * 재고조사일정ID 발번
	 * @param param
	 * @throws Exception
	 */
	void getSchdId(Map<String, Object> param)throws Exception;

	/**
	 * 재고조사일정 INSERT/UPDATE
	 * @param param
	 * @throws Exception
	 */
	void setInvInspSchdtInfo(Map<String, Object> param)throws Exception;

	
}