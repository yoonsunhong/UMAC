package retail.common.service.impl;
 
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import retail.common.service.CommVO;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * @project	RETAIL
 * @file	CommDAO.java
 * @comment
 * <pre>
 * </pre>
 *
 * @author	문희훈
 * @since	2016. 10. 24.
 */
@Repository
public class CommDAO extends EgovAbstractDAO {
	
	 
	/**
	 * 공통코드 그룹 조회
	 * @param paramMap
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void getCommonCodeSelectBoxList(Map<String, Object> paramMap) throws Exception{
		list("comm.getCommonCodeSelectBoxList", paramMap);
	}
	
	/**
	 * 공통코드의 회원등급을 회원구분 별로 SELECT BOX 리스트를 생성한다 
	 * @param paramMap
	 * @throws Exception
	 */
	public void getCommonCodeGradeSelectBoxList(Map<String, Object> paramMap) throws Exception{
		list("comm.getCommonCodeGradeSelectBoxList", paramMap);
	}
	
	/**
	 * 대중소 분류 코드 그룹 조회
	 * @param paramMap
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void getCateCodeSelectBoxList(Map<String, Object> paramMap) throws Exception{
		list("comm.getCateCodeSelectBoxList", paramMap);
	}
	
	@SuppressWarnings("unchecked")
	public void getPaySeqCodeSelectBoxList(Map<String, Object> paramMap) throws Exception{
		list("comm.getPaySeqCodeSelectBoxList", paramMap);
	}
	
	
	
	/**
	 * 관리부서 select box 그래드내에 표시 
	 * @param paramMap
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void getDeptCodeSelectBoxListInGrid(Map<String, Object> paramMap) throws Exception{
		list("comm.getDeptCodeSelectBoxListInGrid", paramMap);
	}
	
	/**
	 * 관리담당자select box 그래드내에 표시 
	 * @param paramMap
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void getEmpNoSelectBoxListInGrid(Map<String, Object> paramMap) throws Exception{
		list("comm.getEmpNoSelectBoxListInGrid", paramMap);
	}
	
	
	
	
	@SuppressWarnings("unchecked")
	public void getStoreCode(Map<String, Object> paramMap) throws Exception{
		list("comm.getStoreCode", paramMap);
	}
	
	@SuppressWarnings("unchecked")
	public void getStoreCodeFlag(Map<String, Object> paramMap) throws Exception{
		list("comm.getStoreCodeFlag", paramMap);
	}
	
	@SuppressWarnings({ "unchecked", "deprecation", "rawtypes" })
	public List<Map> sqlMapCallSelect( String asSqlMapId, Map paramMap ) {
		return (List<Map>) this.getSqlMapClientTemplate().queryForList(asSqlMapId, paramMap);
	}
	
	@SuppressWarnings({ "deprecation", "rawtypes" })
	public Integer sqlMapCallUpdate( String asSqlMapId, Map paramMap ) {
		return this.getSqlMapClientTemplate().update(asSqlMapId, paramMap);
	}
	
	/**
	 * 권한그룹 목록 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public void getAuthSelectBoxList(Map<String, Object> paramMap)  throws Exception {
		list("comm.getAuthSelectBoxList", paramMap);
	}
	
	public void getPosMasterMember(Map<String, Object> paramMap) throws Exception {
		list("comm.getPosMasterMember", paramMap);
	}
 
	
	
	// 발주 입고예정일
	public List<Map<String, Object>> orderPurDtSelect(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("comm.orderPurDtSelect", param);
	}

	@SuppressWarnings("unchecked")
	public void getCommonCodeSelectBoxList2(Map<String, Object> paramMap) throws Exception{
		list("comm.getCommonCodeSelectBoxList2", paramMap);
	}
	
	
	@SuppressWarnings("unchecked")
	public void getPayNum(Map<String, Object> paramMap) throws Exception{
		list("comm.getPayNum", paramMap);
	}

	/**
	 * 로그인한 사용자의 권한에 따른 프로그램 버튼 권한 조회
	 * @param param
	 * @throws Exception
	 */
	public void getAuthButtonList(Map<String, Object> paramMap) throws Exception{
		list("comm.getAuthButtonList", paramMap);
	}
	
	
}
