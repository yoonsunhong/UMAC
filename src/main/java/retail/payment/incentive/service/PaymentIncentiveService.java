package retail.payment.incentive.service;

import java.util.Map;

public interface PaymentIncentiveService {
    
    Map<String, Object> selectPaymentIncentive(Map<String, Object> params) throws Exception;
    Map<String, Object> insertPaymentIncentive(Map<String, Object> params) throws Exception;
    Map<String, Object> updatePaymentIncentive(Map<String, Object> params) throws Exception;
    Map<String, Object> deletePaymentIncentive(Map<String, Object> params) throws Exception;

}
