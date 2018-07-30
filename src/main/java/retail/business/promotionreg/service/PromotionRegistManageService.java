package retail.business.promotionreg.service;

import java.util.List;
import java.util.Map;

public interface PromotionRegistManageService {
	
	/**
	 * 프로모션 상품마스터 조회
	 * @param paramMap
	 * @throws Exception
	 */
	List<Map<String, Object>> promotionMasterSearch(Map<String, Object> param) throws Exception;
	
	/**
	 * 프로모션 적용 상품 조회
	 * @param paramMap
	 * @throws Exception
	 */
	List<Map<String, Object>> promotionItemSearch(Map<String, Object> param) throws Exception;
	
	/**
	 * 프로모션 마스터 등록
	 * @param paramMap
	 * @throws Exception
	 */
	List<Map<String, Object>> promotionMasterRegister(Map<String, Object> param) throws Exception;
	
	/**
	 * 프로모션 Store 조회
	 * @param paramMap
	 * @throws Exception
	 */
	List<Map<String, Object>> promotionStoreSearch(Map<String, Object> param) throws Exception;
	
	
	/**
	 * 프로모션 상품 유효성검사
	 * @param paramMap
	 * @throws Exception
	 */
	void promotionMasterValidation(Map<String, Object> paramMap) throws Exception;

}
