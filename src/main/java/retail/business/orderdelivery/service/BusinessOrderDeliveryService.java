package retail.business.orderdelivery.service;

import java.util.List;
import java.util.Map;

public interface BusinessOrderDeliveryService {
	
	/**
	 * 주문배달관리 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectCallOrderPay(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 주문배달관리 상태 저장
	 * @param paramMap
	 * @throws Exception
	 */
	void selectCallOrderPayRegist(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 주문배달관리 엑셀 다운로드
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	Map<String, Object> excelCallOrderPay(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 주문배달관리 상세 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectCallOrderDetail(Map<String, Object> paramMap) throws Exception;

	List<Map<String, Object>> getOrderEmp(Map<String, Object> param) throws Exception;
}
