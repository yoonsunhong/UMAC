package retail.business.callreceipt.service;

import java.util.Map;

public interface BusinessCallReceiptInputService {
	
	/**
	 * 콜센터 주문등록에서의 고객 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void businessCallReceiptUserInfo(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 콜센터 이용 고객의 주문이력 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void businessCallOrderHistory(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 콜센터 주문상품조회
	 * @param paramMap
	 * @throws Exception
	 */
	void businessCallOrderProduct(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 주문 사용자 정보 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void businessCallOrderUser(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 콜센터 접수 등록건 확정 
	 * @param paramMap
	 * @throws Exception
	 */
	void businessCallDetermine(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 콜센터 접수 번호 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void businessCallSelectSlip(Map<String, Object> paramMap) throws Exception;
	
	
	/**
	 * 콜센터 주문 상품 검색
	 * @param paramMap
	 * @throws Exception
	 */
	void businessCallSelectProduct(Map<String, Object> paramMap) throws Exception;
	
	void businessCallSelectProduct2(Map<String, Object> paramMap) throws Exception;
	
	
	/**
	 * 콜센터 주문접수 행사 상품 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void businessCallSelectEvent(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 콜센터 주문접수 저장 
	 * @param paramMap
	 * @throws Exception
	 */
	void businessCallReceiptRegist(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 콜센터 주문 접수건 POS 상품 등록 현황 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCallPos(Map<String, Object> paramMap) throws Exception;

}
