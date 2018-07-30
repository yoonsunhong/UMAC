package retail.payment.ledger.service;

import java.util.Map;

public interface PaymentLedgerService {
	
	Map<String, Object> paymentLedgerProcess(Map<String, Object> params) 	throws Exception;
	Map<String, Object> updatePaymentLedgerCancle(Map<String, Object> params) 	throws Exception;
	
	Map<String, Object> paymentLedgerInfo_PayList(Map<String, Object> params) 	throws Exception;

}
