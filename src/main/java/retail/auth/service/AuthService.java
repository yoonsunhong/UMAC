package retail.auth.service;

import java.util.List;
import java.util.Map;

public interface AuthService {
	
	
	/**
	 * 권한그룹 목록 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void readAthGroupList(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 사용가능 메뉴 목록 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void readAppointMenuList(Map<String, Object> paramMap) throws Exception;
	
	
	/**
	 * 사용불가 메뉴 목록 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void notAppointMenuList(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 권한그룹 아이디 생성
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectAthGroupId(Map<String, Object> paramMap) throws Exception;
	
	
	/**
	 * 권한그룹 추가(관리자,사용자등의 권한)
	 * @param paramMap
	 * @throws Exception
	 */
	public void insertAth(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 권한에 사용할  메뉴 등록
	 * @param paramMap
	 * @throws Exception
	 */
	public void saveAth(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 권한명, 비고, 사용유무등 수정
	 * @param paramMap
	 * @throws Exception
	 */
	public void updateAth(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 권한에 지정된  메뉴 삭제
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteAth(Map<String, Object> paramMap) throws Exception;
	
	
	/**
	 * 권한 그룹 삭제
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteAthGroup(Map<String, Object> paramMap) throws Exception;
	
	
}