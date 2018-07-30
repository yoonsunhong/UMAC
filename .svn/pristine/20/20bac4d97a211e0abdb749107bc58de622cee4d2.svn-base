package retail.business.promotionreg.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.business.promotionreg.service.PromotionRegistManageService;

@Service("PromotionRegistManageService")
public class PromotionRegistManageServiceImpl implements PromotionRegistManageService{
	
	@Autowired
	private PromotionRegistManageDao prmDao;
	
	/* 프로모션 마스터 조회
	 * @see retail.business.callreceipt.service.PromotionRegistManageService#promotionMasterSearch(java.util.Map)
	 */
	@Override
	@Transactional
	public List<Map<String, Object>> promotionMasterSearch(Map<String, Object> param) throws Exception {
		return prmDao.promotionMasterSearch(param);
	}
	
	/* 프로모션 적용 상품 조회
	 * @see retail.business.promotionreg.service.PromotionRegistManageService#promotionItemSearch(java.util.Map)
	 */
	@Override
	@Transactional
	public List<Map<String, Object>> promotionItemSearch(Map<String, Object> param) throws Exception {
		return prmDao.promotionItemSearch(param);
	}
	

	/* 프로모션 마스터 등록
	 * @see retail.business.promotionreg.service.PromotionRegistManageService#promotionItemSearch(java.util.Map)
	 */
	@Override
	@Transactional
	public List<Map<String, Object>> promotionMasterRegister(Map<String, Object> param) throws Exception {
		return prmDao.promotionMasterRegister(param);
	}

	/* 프로모션 Store 조회
	 * @see retail.business.callreceipt.service.PromotionRegistManageService#promotionMasterSearch(java.util.Map)
	 */
	@Override
	@Transactional
	public List<Map<String, Object>> promotionStoreSearch(Map<String, Object> param) throws Exception {
		return prmDao.promotionStoreSearch(param);
	}
	
	@Override
	@Transactional
	public void promotionMasterValidation(Map<String, Object> paramMap) throws Exception {
		prmDao.promotionMasterValidation(paramMap);
	}


}
