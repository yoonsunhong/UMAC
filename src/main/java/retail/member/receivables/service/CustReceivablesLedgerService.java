package retail.member.receivables.service;

import java.util.List;
import java.util.Map;

public interface CustReceivablesLedgerService {
	List<Map<String, Object>>  custReceivablesLedgerHdrList(Map<String, Object> param) throws Exception;
	List<Map<String, Object>>  custReceivablesLedgerDtlList(Map<String, Object> param) throws Exception;
	List<Map<String, Object>>  custReceivablesLedgerSalesPop(Map<String, Object> param) throws Exception;
	List<Map<String, Object>>  custReceivablesLedgerDpotPop(Map<String, Object> param) throws Exception;
}
