package retail.payment.request.service;

import java.util.Map;

public interface PaymentRequestService {
	
	Map<String, Object> selectPaymentRequest(Map<String, Object> params) 	throws Exception;
	
	Map<String, Object> selectPaymentRequest_Bank(Map<String, Object> params) 	throws Exception;

}
