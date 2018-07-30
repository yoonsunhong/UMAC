package retail.check.service;

import java.util.List;
import java.util.Map;

public interface ProductCheckInOutDelService {
	
	/**
	 * 점대출 삭제 목록 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectProductCheckOutDel(Map<String, Object> paramMap) throws Exception;

	List<Map<String, Object>>  productCheckOutDelete(  Map<String, Object> param) throws Exception;
	   
	
	/**
	 * 점대출 상세 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectProductCheckOutDtlDel(Map<String, Object> paramMap) throws Exception;

	
	List<Map<String, Object>>  productCheckOutCancel(  Map<String, Object> param) throws Exception;
	
	
//	/**
//	 * 점대출 목록 저장
//	 * @param paramMap
//	 * @throws Exception
//	 */
//	void registProductCheckOut(Map<String, Object> paramMap) throws Exception;
//	
//	
	
//	
//	/**
//	 * 점대출 목록 확정
//	 * @param paramMap
//	 * @throws Exception
//	 */
//	void determineProductCheckOut(Map<String, Object> paramMap) throws Exception;
//	
//	/**
//	 * 점대입 목록 조회
//	 * @param paramMap
//	 * @throws Exception
//	 */
//	void selectProductCheckIn(Map<String, Object> paramMap) throws Exception;
//	
//	/**
//	 * 점대입 상세 조회
//	 * @param paramMap
//	 * @throws Exception
//	 */
//	void selectProductCheckInDtl(Map<String, Object> paramMap) throws Exception;
//	
//	/**
//	 * 점대입 목록 저장
//	 * @param paramMap
//	 * @throws Exception
//	 */
//	void registProductCheckIn(Map<String, Object> paramMap) throws Exception;

}
