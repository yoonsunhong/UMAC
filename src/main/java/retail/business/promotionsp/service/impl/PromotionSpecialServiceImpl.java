package retail.business.promotionsp.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.business.promotionsp.service.PromotionSpecialService;

@Service("PromotionSpecialService")
public class PromotionSpecialServiceImpl implements PromotionSpecialService{
	
	@Autowired
	private PromotionSpecialDao pspDao;
	
	/* 프로모션 점상품내역 조회
	 * @see retail.business.promotionsp.service.PromotionSpecialService#selectPromotionSpecialCustom(java.util.Map)
	 */
	@Override
	@Transactional
	public Map<String, Object> selectPromotionSpecialCustom(Map<String, Object> param)	throws Exception {
		return pspDao.selectPromotionSpecialCustom(param);
	}

	

	@Override
	@Transactional
	public List<Map<String, Object>> selectPromotionSpecialItem(Map<String, Object> param) throws Exception {
		return pspDao.selectPromotionSpecialItem(param);
	}
	
	
	@Override
	@Transactional
	public List<Map<String, Object>> promotionSpecialItemRegister(Map<String, Object> param) throws Exception {
		return pspDao.promotionSpecialItemRegister(param);
	}
	

 
}
