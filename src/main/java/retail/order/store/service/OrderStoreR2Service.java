package retail.order.store.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
 

public interface OrderStoreR2Service {


	List<Map<String, Object>> orderStoreProductSelectR2(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>> getCommonMgmtEntryR2(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>>  orderStoreProductRegisterR2(  Map<String, Object> param) throws Exception;
	
	 
	List<Map<String, Object>> orderHeadSearchR2(Map<String, Object> param) throws Exception;


	List<Map<String, Object>> orderHeadInfoR2(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>> orderDetailInfoR2(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>>  orderDelR2(  Map<String, Object> param) throws Exception;
	


}