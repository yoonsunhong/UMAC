package retail.business.promotionsp.service;

import java.util.List;
import java.util.Map;

public interface PromotionSpecialService {
	
	/**
	 * 프로모션 특단가 회원조회
	 * @param paramMap
	 * @throws Exception
	 */
	Map<String, Object> selectPromotionSpecialCustom(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> selectPromotionSpecialItem(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> promotionSpecialItemRegister(Map<String, Object> param) throws Exception;	

	

}
