package retail.user.service;

import java.util.Map;

public interface UserService {

	/**
	 * 사용자 목록조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getUserList(Map<String, Object> paramMap) throws Exception;

	/**
	 * 사용자정보 상세조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getUserDetail(Map<String, Object> paramMap) throws Exception;

	/**
	 * 사용자id중복검사
	 * @param paramMap
	 * @throws Exception
	 */
	void selectCountUserId(Map<String, Object> paramMap)throws Exception;

	/**
	 * 사용자 정보 등록/수정
	 * @param paramMap
	 * @throws Exception
	 */
	void setUserInfo(Map<String, Object> paramMap)throws Exception;
	
	/**
	 * 사원 비밀번호 초기화
	 * @param paramMap
	 * @throws Exception
	 */
	void resetUserPassWd(Map<String, Object> paramMap)throws Exception;

	
	
}