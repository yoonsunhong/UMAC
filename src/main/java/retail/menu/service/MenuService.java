package retail.menu.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public interface MenuService {
	
	/**
	 * 메뉴관리 목록 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getMenuTree(Map<String, Object> paramMap) throws Exception;
	
	
	/**
	 * 메뉴관리 업데이트
	 * @param params
	 * @throws Exception
	 */
	public void updateMenuInfo(Map<String, Object> paramMap) throws Exception;

	
	/**
	 * 메뉴정보 신규등록
	 * @param paramMap
	 * @throws Exception
	 */
	public void insertMenuInfo(Map<String, Object>  paramMap) throws Exception;
	
	/**
	 * 메뉴정보 삭제
	 * @param params
	 * @throws Exception
	 */
	public void deleteMenuInfo(Map<String, Object>  paramMap) throws Exception;
	
	
	/**
	 * 도움말 정보 조회
	 * @param params
	 * @throws Exception
	 */
	public void selectMenuBigo(Map<String, Object>  paramMap)throws Exception;
	
	
	
}