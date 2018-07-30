package retail.business.promotionreg.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("PromotionRegistManageDao")
public class PromotionRegistManageDao extends EgovAbstractDAO{
	
	/**
	 * 프로모션 상품마스터 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public List<Map<String, Object>> promotionMasterSearch(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("PRM.promotionMasterSearch", param);
	}

	
	
	/**
	 * 프로모션 적용 상품 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public List<Map<String, Object>> promotionItemSearch(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("PRM.promotionItemSearch", param);
		
	}

	/**
	 * 프로모션 마스터 등록
	 * @param paramMap
	 * @throws Exception
	 */
	public List<Map<String, Object>> promotionMasterRegister(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("PRM.promotionMasterRegister", param);
	}	
	
	/**
	 * 프로모션 Store 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public List<Map<String, Object>> promotionStoreSearch(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("PRM.promotionStoreSearch", param);
	}	
	
	public void promotionMasterValidation (Map<String, Object> paramMap) throws Exception {
		list("PRM.promotionMasterValidation", paramMap);
	}
}
