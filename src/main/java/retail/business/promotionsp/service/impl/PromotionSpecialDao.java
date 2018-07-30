package retail.business.promotionsp.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("PromotionSpecialDao")
public class PromotionSpecialDao extends EgovAbstractDAO{
	
	/**
	 * 프로모션 특단가 상품관리
	 * @param paramMap
	 * @throws Exception
	 */
	public Map<String, Object> selectPromotionSpecialCustom(Map<String, Object> param) throws Exception {
		select("PSP.selectPromotionSpecialCustom", param);
		return  param;
	}

	public List<Map<String, Object>> selectPromotionSpecialItem(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("PSP.selectPromotionSpecialItem", param);
	}	

	public List<Map<String, Object>> promotionSpecialItemRegister(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("PSP.promotionSpecialItemRegister", param);
	}	

}
