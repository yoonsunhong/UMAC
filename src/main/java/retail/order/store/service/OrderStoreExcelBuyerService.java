package retail.order.store.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
 

public interface OrderStoreExcelBuyerService {


	List<Map<String, Object>> orderUploadSearchBuyer(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> getStoreInfo(Map<String, Object> param) throws Exception;
	 
	List<Map<String, Object>> orderAddItmBuyer(Map<String, Object> param) throws Exception;	


	List<Map<String, Object>> orderAddItmSaveBuyer(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> orderUploadDelBuyer(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>> orderUploadUpdateBuyer(Map<String, Object> param) throws Exception;
	

	Map<String, Object> r2OrderExcelDataBuyer(Map<String, Object> paramMap) throws Exception; 
	

	List<Map<String, Object>> excelDataLoadBuyerAll(Map<String, Object> param) throws Exception;
	

	List<Map<String, Object>>  orderStoreProductExcelRegisterBuyer(  Map<String, Object> param) throws Exception;
		
	List<Map<String, Object>>  jobUploadToOrderBuyer(  Map<String, Object> param) throws Exception;
	
	 
}