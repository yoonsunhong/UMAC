package retail.member.sales.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.member.sales.service.MemberSalesStateService;

/**
 * 회원매출상세내역
 * @author 문희훈
 * @since 2017. 04.18
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("MemberSalesStateService")
public class MemberSalesStateServiceImpl implements MemberSalesStateService{

	@Autowired
	private MemberSalesStateDao mSSDao;
	
	/**
	 * 회원매출상세내역 조회 
	 */
	public List<Map<String, Object>>  memberSalesStateList(Map<String, Object> param) throws Exception {
		return mSSDao.memberSalesStateList(param);
	}
	
	/**
	 * 회원매출상세출력 헤더 조회 
	 */
	public List<Map<String, Object>>  memberSalesStateHdrList(Map<String, Object> param) throws Exception {
		return mSSDao.memberSalesStateHdrList(param);
	}
	
	/**
	 * 회원매출상세출력 상세 조회 
	 */
	public List<Map<String, Object>>  memberSalesStateDtlList(Map<String, Object> param) throws Exception {
		return mSSDao.memberSalesStateDtlList(param);
	}
}