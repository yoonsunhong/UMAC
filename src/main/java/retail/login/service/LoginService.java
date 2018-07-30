package retail.login.service;

import java.util.HashMap;
import java.util.Map;

public interface LoginService {
	
	//로그인
	void login(HashMap<String, Object> map) throws Exception;
	
	
	//비밀번호 변경
	LoginVO changeUserPassward(HashMap<String, Object> map)throws Exception;


	/**
	 * 북마크 설정
	 * @param paramMap
	 */
	void setMyBookMark(Map<String, Object> paramMap)throws Exception;


	/**
	 * 즐겨찾기 등록여부 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getBookMarkStat(Map<String, Object> paramMap)throws Exception;

	
}