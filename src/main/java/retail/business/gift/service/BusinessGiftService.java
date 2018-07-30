package retail.business.gift.service;

import java.util.Map;


public interface BusinessGiftService {
	
	/**
	 * 사은행사마스터 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessGiftMaster(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 사은행사마스터 저장, 수정
	 * @param paramMap
	 * @throws Exception
	 */
	void registBusinessGiftMaster(Map<String, Object> paramMap) throws Exception;
	
	
	/**
	 * 사은행사 교환권 행사 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectPresentEvent(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 사은품 증정 행사 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectGiftEvent(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 사은행사 사은품 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectGiftItem(Map<String, Object> paramMap) throws Exception;

	
	/**
	 * 영수증 번호 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectTrxnNo(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 사은품증정 저장
	 * @param paramMap
	 * @throws Exception
	 */
	void registBusinessGiftGrant(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 사은품증정내역 조회 리스트
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessGiftGrant(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 사은품증정내역 조회 사은품
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessGiftGrantItem(Map<String, Object> paramMap) throws Exception;
}
