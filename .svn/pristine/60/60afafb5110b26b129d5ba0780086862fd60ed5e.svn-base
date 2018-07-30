package retail.product.master.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retail.groupGridTest.service.GroupGridTestVO;


public interface ProductMasterService {


	
	List<Map<String, Object>> productMasterDetail(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> productMasterRegister(  Map<String, Object> param) throws Exception;
	
	/**
	 * 취급점포 신규 조회
	 * @param paramMap
	 * @throws Exception
	 */
	List<Map<String, Object>> productStoreNewList(Map<String, Object> param) throws Exception;
	 
	
	/**
	 * 저장된 취급점포  조회
	 * @param paramMap
	 * @throws Exception
	 */
	 List<Map<String, Object>> productStoreList(Map<String, Object> param) throws Exception;
		
	 
	 

	/**
	 * 공병코드 그룹 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getBotCodeSelectBoxList(Map<String, Object> paramMap) throws Exception;
	
	

	/**
	 * 대분류 선택에 따른 ITM_GB 가져오기  
	 * @param paramMap
	 * @throws Exception
	 */
	void getItmGb(Map<String, Object> paramMap) throws Exception;
	
	
	
	 //  협력업체 코드 중복 검사
	List<ProductMasterVO> productMasterScanCodeDup(  Map<String, Object> paramMap) throws Exception;
	
	
	
	//묶음상품 조회
	List<Map<String, Object>> productMukkum(Map<String, Object> param) throws Exception;
	
	//박스상품 조회
	List<Map<String, Object>> productBoxList(Map<String, Object> param) throws Exception;
	
	
}