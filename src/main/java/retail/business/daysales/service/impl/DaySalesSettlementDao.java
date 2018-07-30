package retail.business.daysales.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("DaySalesSettlementDao")
public class DaySalesSettlementDao extends EgovAbstractDAO{
	public List<Map<String, Object>> daySalesSettlementList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("daySales.daySalesSettlementList",param);
	}
	public List<Map<String, Object>> daySalesSettlementList2(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("daySales.daySalesSettlementList2",param);
	}
	public List<Map<String, Object>> daySalesSettlementList3(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("daySales.daySalesSettlementList3",param);
	}
	public List<Map<String, Object>> daySalesSettlementList4(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("daySales.daySalesSettlementList4",param);
	}
	public List<Map<String, Object>> daySalesSettlementList5(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("daySales.daySalesSettlementList5",param);
	}

}
