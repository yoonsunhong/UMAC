package retail.business.campaignproduct.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.business.campaignproduct.service.BusinessCampaignProductService;

@Service("BusinessCampaignProductService")
public class BusinessCampaignProductServiceImpl implements BusinessCampaignProductService{
	
	@Autowired
	private BusinessCampaignProductDao bcpDao;
	
	@Override
	@Transactional
	public void selectDetailProduct(Map<String, Object> paramMap) throws Exception{
		bcpDao.selectDetailProduct(paramMap);
	}
	
	@Override
	@Transactional
	public void selectDetailProductCmn(Map<String, Object> paramMap) throws Exception{
		bcpDao.selectDetailProductCmn(paramMap);
	}
	
	@Override
	@Transactional
	public void campaignProductRegist(Map<String, Object> paramMap) throws Exception{
		bcpDao.campaignProductRegist(paramMap);
	}
	
	@Override
	@Transactional
	public void campaignProductRegistExcel(Map<String, Object> paramMap) throws Exception{
		bcpDao.campaignProductRegistExcel(paramMap);
	}
	
	@Override
	@Transactional
	public void selectEVTItem(Map<String, Object> paramMap) throws Exception{
		bcpDao.selectEVTItem(paramMap);
	}
	
	@Override
	@Transactional
	public void selectBusinessCampaignItmChk(Map<String, Object> paramMap) throws Exception{
		bcpDao.selectBusinessCampaignItmChk(paramMap);
	}
	
	@Override
	@Transactional
	public void selectUserOrgType(Map<String, Object> paramMap) throws Exception{
		bcpDao.selectUserOrgType(paramMap);
	}
	
	@Override
	@Transactional
	public void campaignProductExcelLoad(Map<String, Object> paramMap) throws Exception{
		bcpDao.campaignProductExcelLoad(paramMap);
	}
	

}
