package retail.member.sales.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 회원매출상세내역 조회
 * @author 문희훈
 * @since 2017. 04.19
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@SuppressWarnings("unchecked")
@Repository("MemberSalesStateDao")
public class MemberSalesStateDao extends EgovAbstractDAO{

	public List<Map<String, Object>> memberSalesStateList(Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>) list("memberSalesState.memberSalesStateList", param);
	}
	
	public List<Map<String, Object>> memberSalesStateHdrList(Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>) list("memberSalesState.memberSalesStateHdrList", param);
	}
	
	public List<Map<String, Object>> memberSalesStateDtlList(Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>) list("memberSalesState.memberSalesStateDtlList", param);
	}
	
}
