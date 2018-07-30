package retail.member.report.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("MemberSalesCategoryDao")
public class MemberSalesCategoryDao extends EgovAbstractDAO {

	public List<Map<String, Object>> memberSalesCategoryHdrList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("memberSalesCategory.memberSalesCategoryHdrList", param);
	}
	
	public List<Map<String, Object>> memberSalesCategoryDtlList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("memberSalesCategory.memberSalesCategoryDtlList", param);
	}

}
