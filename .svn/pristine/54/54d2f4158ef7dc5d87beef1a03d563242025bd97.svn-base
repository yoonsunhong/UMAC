package retail.payment.close.service;

import java.util.List;
import java.util.Map;

public interface PaymentCloseService {
	
	Map<String, Object> selectPaymentClose(Map<String, Object> params) 	throws Exception;
	Map<String, Object> updatePaymentClose(Map<String, Object> params) 	throws Exception;

	Map<String, Object> purchClosedList(Map<String, Object> params) 	throws Exception;
	
	
	/**
	 * 마감생성 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	Map<String, Object> updatePurchClose(Map<String, Object> params) 	throws Exception;
	
	/**
	 * 담당자 확정
	 * @param params
	 * @return
	 * @throws Exception
	 */
	Map<String, Object> updatePurchClosedConf(Map<String, Object> params) 	throws Exception;
	
	/** 회계승인
	 * @param params
	 * @return
	 * @throws Exception
	 */
	Map<String, Object> insertPurchClosedDouzone(Map<String, Object> params) 	throws Exception;
	
	/**
	 * 매입전표 출력
	 * @param paramMap
	 * @throws Exception
	 */
	void selectPurchClosed(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 매입 상세 전표 출력
	 * @param paramMap
	 * @throws Exception
	 */
	void selectPurchClosedDetail(Map<String, Object> paramMap) throws Exception;
	
	List<Map<String, Object>> insertPurchClosedDouzoneSend(Map<String, Object> params) throws Exception;
}
