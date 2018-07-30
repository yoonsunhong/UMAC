package retail.order.store.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
 

public interface OrderStoreR3Service {


	List<Map<String, Object>> orderStoreProductSelectR3(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>> getCommonMgmtEntryR3(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>>  orderStoreProductRegisterR3(  Map<String, Object> param) throws Exception;
	
	 
	List<Map<String, Object>> orderHeadSearchR3(Map<String, Object> param) throws Exception;


	List<Map<String, Object>> orderHeadInfoR3(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>> orderDetailInfoR3(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>>  orderDelR3(  Map<String, Object> param) throws Exception;
	


}