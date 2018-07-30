package retail.business.promotionlist.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("PromotionStrItmListDao")
public class PromotionStrItmListDao extends EgovAbstractDAO{
	
	/**
	 * 프로모션 상품마스터 조회
	 * @param paramMap
	 * @throws Exception
	 */

//	public void promotionStoreItemSearch(Map<String, Object> paramMap) throws Exception {
//		System.out.println("paramMap:: "+ paramMap);
//		list("PSS.promotionStoreItemSearch", paramMap);
//	}
	public Map<String, Object> promotionStoreItemSearch(Map<String, Object> param) throws Exception {
		select("PSS.promotionStoreItemSearch", param);
		return  param;
	}

}
