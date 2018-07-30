package retail.member.report.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("MemberSalesMonthStateDao")
public class MemberSalesMonthStateDao extends EgovAbstractDAO{

	public List<Map<String, Object>> memberSalesMonthStateList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("memberSalesMonthState.memberSalesMonthStateList", param);
	}

}
