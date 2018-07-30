package retail.payment.deduction.service;

import java.util.Map;

public interface PaymentDeductionService {
	
	Map<String, Object> selectPaymentDeduction(Map<String, Object> params) 		throws Exception;
	Map<String, Object> selectPaymentDeductionHold(Map<String, Object> params) 	throws Exception;
	Map<String, Object> getPaymentSelectBoxList(Map<String, Object> params) 	throws Exception;
	Map<String, Object> updatePaymentDeduction(Map<String, Object> params) 		throws Exception;
	Map<String, Object> updatePaymentDeductionHold(Map<String, Object> params) 	throws Exception;
	Map<String, Object> updatePaymentReleHold(Map<String, Object> params) 		throws Exception;

}
