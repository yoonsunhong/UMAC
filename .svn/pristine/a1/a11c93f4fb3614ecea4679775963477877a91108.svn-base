package retail.business.campaignmaster.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.business.campaignmaster.service.BusinessCampaignMasterService;

@Service("BusinessCampaignMasterService")
public class BusinessCampaignMasterImpl implements BusinessCampaignMasterService{
	
	@Autowired
	private BusinessCampaignMasterDao bcmDao;
	
	/* 행사코드마스터 조회
	 * @see retail.business.campaignmaster.service.BusinessCampaignMasterService#selectBusinessCampaignMst(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectBusinessCampaignMst(Map<String, Object> paramMap) throws Exception{ 
		bcmDao.selectBusinessCampaignMst(paramMap);
		
	}
	
	@Override
	@Transactional
	public void validationCampaignDate(Map<String, Object> paramMap) throws Exception{
		bcmDao.validationCampaignDate(paramMap);
	}
	
	/* 행사코드마스터 저장
	 * @see retail.business.campaignmaster.service.BusinessCampaignMasterService#registBusinessCampaignMst(java.util.Map)
	 */
	@Override
	@Transactional
	public void registBusinessCampaignMst(Map<String, Object> paramMap) throws Exception{ 
		bcmDao.registBusinessCampaignMst(paramMap);
		
	}
	
	/* 행사코드마스터 삭제
	 * @see retail.business.campaignmaster.service.BusinessCampaignMasterService#deleteBusinessCampaignMst(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteBusinessCampaignMst(Map<String, Object> paramMap) throws Exception{ 
		bcmDao.deleteBusinessCampaignMst(paramMap);
		
	}
	
	/* 카드행사 카드 정보 조회
	 * @see retail.business.campaignmaster.service.BusinessCampaignMasterService#selectBusinessCampaignCard(java.util.Map)
	 */
	@Override
	@Transactional
	 public void selectBusinessCampaignCard(Map<String, Object> paramMap) throws Exception{
		bcmDao.selectBusinessCampaignCard(paramMap);
	}
	
	/* 행사 등록된 카드 조회
	 * @see retail.business.campaignmaster.service.BusinessCampaignMasterService#selectEventCard(java.util.Map)
	 */
	@Override
	@Transactional
	 public void selectEventCard(Map<String, Object> paramMap) throws Exception{
		bcmDao.selectEventCard(paramMap);
	}
	

}
