package retail.business.campaignproduct.service;

import java.util.Map;

public interface BusinessCampaignProductService {
	
	/**
	 * 행사상품 상세 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectDetailProduct(Map<String, Object> paramMap) throws Exception;
	void selectDetailProductCmn(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 행사상품 등록 or 업데이트
	 * @param paramMap
	 * @throws Exception
	 */
	void campaignProductRegist(Map<String, Object> paramMap) throws Exception;
	
	void campaignProductRegistExcel(Map<String, Object> paramMap) throws Exception;
	
	void selectEVTItem(Map<String, Object> paramMap) throws Exception;
	
	void selectBusinessCampaignItmChk(Map<String, Object> paramMap) throws Exception;
	
	void selectUserOrgType(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 상품 엑셀 업로드
	 * @param paramMap
	 * @throws Exception
	 */
	void campaignProductExcelLoad(Map<String, Object> paramMap) throws Exception;

}
