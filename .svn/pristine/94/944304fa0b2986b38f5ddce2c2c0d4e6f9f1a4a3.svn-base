package retail.posclosed.report.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("CreditDpotDtlStateDao")
public class CreditDpotDtlStateDao extends EgovAbstractDAO{
	
	public List<Map<String, Object>> creditDpotDtlSelect(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("creditDpotDtl.creditDpotDtlSelect",param);
	}
	
	public List<Map<String, Object>> getDpotFlag(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("creditDpotDtl.getDpotFlag",param);
	}
}
