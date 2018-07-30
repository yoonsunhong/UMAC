package retail.inoutcenter.mng.service;

import java.util.List;
import java.util.Map;
 

public interface InOutCenterMngService {

	List<Map<String, Object>> inOutCenterHeadSearch(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> inOutCenterDetailInfo(Map<String, Object> param) throws Exception;

	List<Map<String, Object>>  inOutCenterConfirm(  Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>>  inOutRegister(  Map<String, Object> param) throws Exception;
 
//	List<Map<String, Object>>  jobOrderToPurch(  Map<String, Object> param) throws Exception;
//	
	Map<String, Object> inoutcenterSumMng_check(Map<String, Object> params) throws Exception;
	
	Map<String, Object> supplyPurchStateInout_list(Map<String, Object> params) 	throws Exception;

	/**
	 * 평균단가 조정등록(대출입) 내역조회
	 * @param param
	 * @throws Exception
	 */
	void getUnitPriceAvgList(Map<String, Object> param) throws Exception;

	/**
	 * 같은날 같은상품 중복등록 불가능
	 * @param param
	 * @throws Exception
	 */
	void countInoutUnitpriceAvgInfo(Map<String, Object> param)throws Exception;
	
	/**
	 * 평균단가 조정등록(대출입) 저장
	 * @param param
	 * @throws Exception
	 */
	void saveInoutUnitpriceAvg(Map<String, Object> param)throws Exception;

	/**
	 * 평균단가 조정등록(대출입) 수정
	 * @param param
	 * @throws Exception
	 */
	void updateInoutUnitpriceAvg(Map<String, Object> param)throws Exception;
	 
}