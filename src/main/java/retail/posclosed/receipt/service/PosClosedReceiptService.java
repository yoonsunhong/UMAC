package retail.posclosed.receipt.service;

import java.util.Map;

public interface PosClosedReceiptService {
	
	Map<String, Object> getPosClosedReceipt(Map<String, Object> params) throws Exception;
	
	
	
}