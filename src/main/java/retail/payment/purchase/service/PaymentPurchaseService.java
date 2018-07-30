package retail.payment.purchase.service;

import java.util.List;
import java.util.Map;

public interface PaymentPurchaseService {
	
	Map<String, Object> selectPaymentPurchase(Map<String, Object> params) 	throws Exception;
	Map<String, Object> selectPaymentPurchase_v2(Map<String, Object> params) 	throws Exception;
	//List<Map<String, Object>> selectPaymentSales(Map<String, Object> params) 	throws Exception;
	Map<String, Object> selectPaymentSales(Map<String, Object> params) 	throws Exception;
	Map<String, Object> getPaymentCancelSelectBoxList(Map<String, Object> params) 	throws Exception;
	
	Map<String, Object> excelPaymentPurchaseInfoList(Map<String, Object> paramMap) throws Exception;
	Map<String, Object> excelPaymentSalesInfoList(Map<String, Object> paramMap) throws Exception;

}
