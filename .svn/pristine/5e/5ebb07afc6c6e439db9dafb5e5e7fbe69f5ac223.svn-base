package retail.member.report.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.member.report.service.MemberSalesMonthStateService;

@Service("MemberSalesMonthStateService")
public class MemberSalesMonthStateServiceImpl implements MemberSalesMonthStateService{
	
	@Autowired
	private MemberSalesMonthStateDao memberSalesMonthStateDao; 
	
	@Override
	public List<Map<String, Object>> memberSalesMonthStateList(Map<String, Object> param) throws Exception {
		return memberSalesMonthStateDao.memberSalesMonthStateList(param);
	}
	
}
