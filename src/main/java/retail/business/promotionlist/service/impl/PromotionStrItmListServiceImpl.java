package retail.business.promotionlist.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.business.promotionlist.service.PromotionStrItmListService;

@Service("PromotionStrItmListService")
public class PromotionStrItmListServiceImpl implements PromotionStrItmListService{
	
	@Autowired
	private PromotionStrItmListDao pssDao;
	
	/* 프로모션 점상품내역 조회
	 * @see retail.business.promotionlist.service.PromotionStrItmListService#promotionStoreItemSearch(java.util.Map)
	 */
	@Override
	@Transactional
	public Map<String, Object> promotionStoreItemSearch(Map<String, Object> param)	throws Exception {
		return pssDao.promotionStoreItemSearch(param);
	}
//	public void promotionStoreItemSearch(Map<String, Object> paramMap) throws Exception{
//		pssDao.promotionStoreItemSearch(paramMap);
//	}

	

 
}
