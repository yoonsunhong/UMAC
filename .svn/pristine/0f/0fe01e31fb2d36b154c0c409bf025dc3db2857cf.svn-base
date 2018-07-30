package retail.business.gift.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.business.gift.service.BusinessGiftService;

@Service("BusinessGiftService")
public class BusinessGiftServiceImpl implements BusinessGiftService{
	
	@Autowired
	private BusinessGiftDao bgDao;
	
	/* 사은행사마스터 조회
	 * @see retail.business.gift.service.BusinessGiftService#selectBusinessGiftMaster(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectBusinessGiftMaster(Map<String, Object> paramMap) throws Exception{
		bgDao.selectBusinessGiftMaster(paramMap);
	}
	
	/* 사은행사마스터 저장, 수정
	 * @see retail.business.gift.service.BusinessGiftService#registBusinessGiftMaster(java.util.Map)
	 */
	@Override
	@Transactional
	public void registBusinessGiftMaster(Map<String, Object> paramMap) throws Exception{
		bgDao.registBusinessGiftMaster(paramMap);
	}
	
	/* 사은행사 교환권 행사 조회
	 * @see retail.business.gift.service.BusinessGiftService#selectPresentEvent(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectPresentEvent(Map<String, Object> paramMap) throws Exception{
		bgDao.selectPresentEvent(paramMap);
	}
	
	@Override
	@Transactional
	public void selectGiftEvent(Map<String, Object> paramMap) throws Exception{
		bgDao.selectGiftEvent(paramMap);
	}
	
	/* 사은행사 사은품 조회
	 * @see retail.business.gift.service.BusinessGiftService#selectGiftItem(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectGiftItem(Map<String, Object> paramMap) throws Exception{
		bgDao.selectGiftItem(paramMap);
	}
	
	/* 영수증번호 조회
	 * @see retail.business.gift.service.BusinessGiftService#selectTrxnNo(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectTrxnNo(Map<String, Object> paramMap) throws Exception{
		bgDao.selectTrxnNo(paramMap);
	}
	
	/* 사은품증정 저장
	 * @see retail.business.gift.service.BusinessGiftService#registBusinessGiftGrant(java.util.Map)
	 */
	@Override
	@Transactional
	public void registBusinessGiftGrant(Map<String, Object> paramMap) throws Exception{
		bgDao.registBusinessGiftGrant(paramMap);
	}
	
	/* 사은품증정내역 조회 리스트
	 * @see retail.business.gift.service.BusinessGiftService#selectBusinessGiftGrant(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectBusinessGiftGrant(Map<String, Object> paramMap) throws Exception{
		bgDao.selectBusinessGiftGrant(paramMap);
	}
	
	/* 사은품증정내역 조회 사은품
	 * @see retail.business.gift.service.BusinessGiftService#selectBusinessGiftGrantItem(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectBusinessGiftGrantItem(Map<String, Object> paramMap) throws Exception{
		bgDao.selectBusinessGiftGrantItem(paramMap);
	}
	
	

}
