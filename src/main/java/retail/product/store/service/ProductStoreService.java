package retail.product.store.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retail.groupGridTest.service.GroupGridTestVO;


public interface ProductStoreService {




	List<Map<String, Object>>  productStoreSearchList(Map<String, Object> params) throws Exception;
 
	List<Map<String, Object>> productStoreUpdate(  Map<String, Object> param) throws Exception;
	

	Map<String, Object> excelProductMasterStore(Map<String, Object> paramMap) throws Exception;

	
	
}