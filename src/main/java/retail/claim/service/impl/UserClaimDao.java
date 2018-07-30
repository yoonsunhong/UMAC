package retail.claim.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("UserClaimDao")
public class UserClaimDao extends  EgovAbstractDAO{
	
	/**
	 * 클레임접수등록 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectUserClaimRegist(Map<String, Object> paramMap) throws Exception{
		list("userClaim.selectUserClaimRegist", paramMap);
	}
	
	public void excelUserClaimRegist(Map<String, Object> paramMap) throws Exception{
		list("userClaim.excelUserClaimRegist", paramMap);
	}
	
	/**
	 * 컴플레인접수등록 저장
	 * @param paramMap
	 * @throws Exception
	 */
	public void registUserClaimRegist(Map<String, Object> paramMap) throws Exception{
		list("userClaim.registUserClaimRegist", paramMap);
	}
	
	/**
	 * 컴플레인접수등록 삭제
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteUserClaimRegist(Map<String, Object> paramMap) throws Exception{
		list("userClaim.deleteUserClaimRegist", paramMap);
	}
	
	/**
	 * 컴플레인관리 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectUserClaimManage(Map<String, Object> paramMap) throws Exception{
		list("userClaim.selectUserClaimManage", paramMap);
	}
	
	/**
	 * 컴플레인관리 저장
	 * @param paramMap
	 * @throws Exception
	 */
	public void registUserClaimManage(Map<String, Object> paramMap) throws Exception{
		list("userClaim.registUserClaimManage", paramMap);
	}
}
