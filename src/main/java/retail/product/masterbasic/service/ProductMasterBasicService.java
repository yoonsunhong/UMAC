package retail.product.masterbasic.service;

import java.util.Map;

public interface ProductMasterBasicService {
	
	/**
	 * 기본상품마스터조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectProductMasterBasic(Map<String, Object> paramMap) throws Exception;
	
	Map<String, Object> excelProductMasterBasic(Map<String, Object> paramMap) throws Exception;

}
