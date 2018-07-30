package retail.code.service;

import java.util.List;
import java.util.Map;

public interface CodeService {
	
	/**
	 * 공통코드 리스트 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getCodeCategory(Map<String, Object> paramMap) throws Exception;
	
	
	/**
	 * 공통코드 상세 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getCodeDetail(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 코드 중복검사
	 * @param paramMap
	 * @throws Exception
	 */
	void selectCountCode(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 공통코드 신규등록
	 * @param paramMap
	 * @throws Exception
	 */
	void insertCategory(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 공통코드 수정
	 * @param paramMap
	 * @throws Exception
	 */
	void updateCategory(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 공통코드 삭제
	 * @param paramMap
	 * @throws Exception
	 */
	void deleteCode(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 공통코드 상세 등록 
	 * @param paramMap
	 * @throws Exception
	 */
	void insertCodeDetail(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 공통코드 상세 수정
	 * @param paramMap
	 * @throws Exception
	 */
	void updateCodeDetail(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 공통코드 상세 삭제
	 * @param paramMap
	 * @throws Exception
	 */
	void deleteCodeDetail(Map<String, Object> paramMap) throws Exception;
	


	
	
}