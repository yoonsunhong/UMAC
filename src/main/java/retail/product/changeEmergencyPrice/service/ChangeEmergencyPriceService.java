package retail.product.changeEmergencyPrice.service;

import java.util.Map;


/**
 * 긴급매가변경
 * @author 문희훈
 * @since 2017. 04.27
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface ChangeEmergencyPriceService {

	/**
	 * 긴급매가변경 조회
	 * @param param
	 * @throws Exception
	 */
	void getChangePriceInfo(Map<String, Object> param) throws Exception;

	/**
	 * 긴급매가변경중복 등록 체크
	 * @param param
	 * @throws Exception
	 */
	void checkChangePriceInfo(Map<String, Object> param) throws Exception;
	
	/**
	 * 긴급매가변경 등록
	 * @param param
	 * @throws Exception
	 */
	void insertChangePriceInfo(Map<String, Object> param)throws Exception;
	
	/**
	 * 긴급매가변경 수정
	 * @param param
	 * @throws Exception
	 */
	void updateChangePriceInfo(Map<String, Object> param)throws Exception;
	
	
	/**
	 * POS마스터 테이터 수신
	 * @param param
	 * @throws Exception
	 */
	void posMasterSend(Map<String, Object> param)throws Exception;
	
	
	/**
	 * //POS데이터 생성 이전 당일 긴급매가 복원
	 * @param param
	 * @throws Exception
	 */
	void changeEmergency_Re(Map<String, Object> param)throws Exception;

	
}