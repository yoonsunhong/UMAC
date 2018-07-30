package retail.business.campaignproduct.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("BusinessCampaignProductDao")
public class BusinessCampaignProductDao extends EgovAbstractDAO {
	

	/**
	 * 행사상품 상세 조회 (상황별 공통, 점별 선택)
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectDetailProduct(Map<String, Object> paramMap) throws Exception{
		select("BCP.selectDetailProduct", paramMap);
	}
	public void selectDetailProductCmn(Map<String, Object> paramMap) throws Exception{
		select("BCP.selectDetailProductCmn", paramMap);
	}
	
	/**
	 * 행사상품 등록 및 업데이트
	 * @param paramMap
	 * @throws Exception
	 */
	public void campaignProductRegist(Map<String, Object> paramMap) throws Exception{
		insert("BCP.campaignProductRegist", paramMap );
	}
	
	public void campaignProductRegistExcel(Map<String, Object> paramMap) throws Exception{
		insert("BCP.campaignProductRegistExcel", paramMap);
	}
	
	public void selectEVTItem(Map<String, Object> paramMap) throws Exception{
		list("BCP.selectEVTItem", paramMap);
	}
	
	public void selectBusinessCampaignItmChk(Map<String, Object> paramMap) throws Exception{
		list("BCP.selectBusinessCampaignItmChk", paramMap);
	}
	
	public void selectUserOrgType(Map<String, Object> paramMap) throws Exception{
		selectByPk("BCP.selectUserOrgType", paramMap);
	}

	public void campaignProductExcelLoad(Map<String, Object> paramMap) throws Exception{
		select("BCP.campaignProductExcelLoad", paramMap);
	}
	
}