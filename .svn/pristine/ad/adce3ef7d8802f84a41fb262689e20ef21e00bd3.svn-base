package retail.member.receivables.service.impl;

import java.util.List;



import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("CustReceivablesLedgerDao")
public class CustReceivablesLedgerDao extends EgovAbstractDAO{

	
	public List<Map<String, Object>> custReceivablesLedgerHdrList(Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)list("custReceivablesLedger.custReceivablesLedgerHdrList", param);
	}
	
	public List<Map<String, Object>> custReceivablesLedgerDtlList(Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)list("custReceivablesLedger.custReceivablesLedgerDtlList", param);
	}
	public List<Map<String, Object>> custReceivablesLedgerSalesPop(Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)list("custReceivablesLedger.custReceivablesLedgerSalesPop", param);
	}
	
	public List<Map<String, Object>> custReceivablesLedgerDpotPop(Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)list("custReceivablesLedger.custReceivablesLedgerDpotPop", param);
	}
}
