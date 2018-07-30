package retail.commonPopup.service;

import java.util.List;
import java.util.Map;

public interface CommPopupService {
	
	List<Map<String, Object>> selectCommPopList(Map<String, Object> paramMap) throws Exception;
	Map<String, Object> getStrName(Map<String, Object> params) throws Exception;

	List<Map<String, Object>> storeRouteGbProduct(Map<String, Object> paramMap) throws Exception;
	 

	List<Map<String, Object>> selectedStoreProduct(Map<String, Object> paramMap) throws Exception;
	 
	List<Map<String, Object>> getPaymentSelectBoxList_2(Map<String, Object> paramMap) throws Exception;

}
