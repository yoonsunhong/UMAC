package retail.menurole.service;

import java.util.List;
import java.util.Map;

public interface MenuRoleService {

	/**
	 * 사용자 리스트 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getUserRoleList(Map<String, Object> paramMap) throws Exception;

	/**
	 * 부서 리스트박스 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getDeptCodeList(Map<String, Object> paramMap)  throws Exception;

	/**
	 * 사용자 기능별 권한 리스트 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getUserMenuRoleList(Map<String, Object> param) throws Exception;

	/**
	 * 메뉴별 권한 복사 등록 실행 DELETE/SELECT/INSERT
	 * @param param
	 * @throws Exception
	 */
	void copyUserRoleList(Map<String, Object> param) throws Exception;

	
	/**
	 * 사용자 메뉴별 권한 저장
	 * @param param
	 * @throws Exception
	 */
	void userMenuRoleUpdate(Map<String, Object> param) throws Exception;
	
	
}