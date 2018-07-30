package retail.member.report.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.member.report.service.MemberSalesCategoryService;

@Service("MemberSalesCategoryService")
public class MemberSalesCategoryServiceImpl implements MemberSalesCategoryService {


	@Autowired
	private MemberSalesCategoryDao memberSalesCategoryDao;
	
	
	@Override
	public List<Map<String, Object>> memberSalesCategoryHdrList(Map<String, Object> param) throws Exception {
		return memberSalesCategoryDao.memberSalesCategoryHdrList(param);
	}
	
	@Override
	public List<Map<String, Object>> memberSalesCategoryDtlList(Map<String, Object> param) throws Exception {
		return memberSalesCategoryDao.memberSalesCategoryDtlList(param);
	}
	
}
