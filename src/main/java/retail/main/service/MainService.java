package retail.main.service;

import java.util.List;
import java.util.Map;


public interface MainService {
	
	void getBigMenu(Map<String, Object> paramMap) throws Exception;
	
	void getMiddleMenu(Map<String, Object> paramMap) throws Exception;

	/**
	 * 즐겨찾기 메뉴 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getBookMarkMenu(Map<String, Object> paramMap) throws Exception;
	
	
	
	
}