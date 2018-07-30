package retail.business.campaignmaster.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("BusinessCampaignMasterDao")
public class BusinessCampaignMasterDao extends EgovAbstractDAO{

	/**
	 * 행사코드마스터 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCampaignMst(Map<String, Object> paramMap) throws Exception{
		list("BCM.selectBusinessCampaignMst", paramMap);
	}
	
	/**
	 * 행사등록 중복체크
	 * @param paramMap
	 * @throws Exception
	 */
	public void validationCampaignDate(Map<String, Object> paramMap) throws Exception{
		list("BCM.validationCampaignDate", paramMap);
	}
	
	/**
	 * 행사코드마스터 저장
	 * @param paramMap
	 * @throws Exception
	 */
	public void registBusinessCampaignMst(Map<String, Object> paramMap) throws Exception{
		update("BCM.registBusinessCampaignMst", paramMap);
	}
	
	/**
	 * 행사코드마스터 삭제
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteBusinessCampaignMst(Map<String, Object> paramMap) throws Exception{
		delete("BCM.deleteBusinessCampaignMst", paramMap);
	}
	
	/**
	 * 카드행사 카드 정보 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCampaignCard(Map<String, Object> paramMap) throws Exception{
		list("BCM.selectBusinessCampaignCard", paramMap);
	}
	
	/**
	 * 행사 등록된 카드 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectEventCard(Map<String, Object> paramMap) throws Exception{
		list("BCM.selectEventCard", paramMap);
	}
	
	
	
	
	
}
