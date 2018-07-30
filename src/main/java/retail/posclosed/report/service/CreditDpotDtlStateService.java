package retail.posclosed.report.service;

import java.util.List;
import java.util.Map;

public interface CreditDpotDtlStateService {
	List<Map<String, Object>> creditDpotDtlSelect(Map<String, Object> param) throws Exception;
	List<Map<String, Object>> getDpotFlag(Map<String, Object> param) throws Exception;
}
