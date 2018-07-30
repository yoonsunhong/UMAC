package retail.common.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;


/**
 * @project	RETAIL
 * @file	CommService.java
 * @comment
 * <pre>
 * </pre>
 *
 * @author	문희훈
 * @since	2016. 10. 24.
 */
public interface CommService {

	
	List<Map> sqlMapCallSelect(String asSqlMapId, Map paramMap) throws Exception;
	
	Integer sqlMapCallUpdate(String asSqlMapId, Map paramMap) throws Exception;
	
	String ajaxServiceUpdateService(HttpServletRequest request, String asMsg) throws Exception;
	
	String ajaxServiceUpdateMultiService(HttpServletRequest request, String asMsg) throws Exception;
	
	/**
	 * 공통코드 그룹 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getCommonCodeSelectBoxList(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 공통코드의 회원등급을 회원구분 별로 SELECT BOX 리스트를 생성한다
	 * @param paramMap
	 * @throws Exception
	 */
	void getCommonCodeGradeSelectBoxList(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 대중소 분류 코드  조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getCateCodeSelectBoxList(Map<String, Object> paramMap) throws Exception;
	
	
	void getPaySeqCodeSelectBoxList(Map<String, Object> paramMap) throws Exception;
	
	
	
	
	
	/**
	 * 관리부서   조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getDeptCodeSelectBoxListInGrid(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 관리담당자   조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getEmpNoSelectBoxListInGrid(Map<String, Object> paramMap) throws Exception;
	
	
	
	
	
	
	/**
	 * 점포코드 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getStoreCode(Map<String, Object> paramMap) throws Exception;
	
	void getStoreCodeFlag(Map<String, Object> paramMap) throws Exception;
 
	 
	/**
	 *  사용자 팝업 리스트 조회
	 */
	List<UserVO> getUserList(UserVO params) throws Exception;
	
	/**
	 * 권한그룹 리스트 조회
	 * @param paramMap
	 * @return 
	 * @return
	 * @throws Exception
	 */
	void getAuthSelectBoxList(Map<String, Object> paramMap)throws Exception;
	
	/**
	 * 해당 점포의 POS 마스터 계산원을 조회하여 SELECT BOX를 만든다
	 * @param paramMap
	 */
	void getPosMasterMember(Map<String, Object> paramMap) throws Exception;
	
	
	/**
	 * 발주 입고 예정일 조회
	 * @param paramMap
	 */
	List<Map<String, Object>> orderPurDtSelect(Map<String, Object> param) throws Exception;

	void getCommonCodeSelectBoxList2(Map<String, Object> paramMap) throws Exception;
	
	
	/*
	 * 협력업체(VEN_CODE) 조회하여 지불주기(PAY_CON),지불차수(PAY_SEQ)를 가져온다.
	 * */
	void getPayNum(Map<String, Object> paramMap) throws Exception;

	/**
	 *  로그인한 사용자의 권한에 따른 프로그램 버튼 권한 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	void getAuthButtonList(Map<String, Object> paramMap) throws Exception;
	
	
}
