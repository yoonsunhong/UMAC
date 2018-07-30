package retail.member.point.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 
 * @Class Name : MemberPointDao.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.26           최초생성
 *
 * @author 오동근
 * @since 2016. 12. 26.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("MemberPointDao")
public class MemberPointDao extends EgovAbstractDAO {
	
	/**
	 * 포인트 임의관리 회원포인트 및 임의등록현황 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectMemberPoint(Map<String, Object> params) throws Exception {
		select("memberPoint.selectMemberPoint", params);
		return params;
	}
	
	/**
	 * 점포명 ComboBox List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getStrNameSelectBoxList(Map<String, Object> params) throws Exception {
		select("memberPoint.getStrNameSelectBoxList", params);
		return params;
	}
	
	/**
	 * 포인트 임의관리 Insert
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> memberPointOptionInsert(Map<String, Object> params) throws Exception {
		select("memberPoint.memberPointOptionInsert", params);
		return params;
	}
	
	/**
	 * 포인트 기준관리 리스트
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getMemberPointList(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("memberPoint.getMemberPointList", params);
	}
	
	/**
	 * 포인트 기준관리 등록 수정
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updateMemberPoint(Map<String, Object> params) throws Exception {
		select("memberPoint.updateMemberPoint", params);
		return params;
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> memberPointStatusList(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("memberPoint.memberPointStatusList", params);
	}

	/**
	 * 출고현황 엑셀을 다운한다.
	 * @param paramMap
	 * @throws Exception
	 */
	public void memberPointStatusListExcelDown(Map<String, Object> paramMap)  throws Exception {
		list("memberPoint.memberPointStatusListExcelDown", paramMap);
	}
	

}
