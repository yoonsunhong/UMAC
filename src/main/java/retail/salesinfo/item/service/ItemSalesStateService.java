package retail.salesinfo.item.service;

import java.util.List;
import java.util.Map;

public interface ItemSalesStateService {
 
	Map<String, Object> itemSalesEventStateList(Map<String, Object> param) throws Exception;
	
	Map<String, Object> itemSalesEventPopupList(Map<String, Object> param) throws Exception;
	
	Map<String, Object> itemSalesStateList(Map<String, Object> param) throws Exception;
	
	Map<String, Object> itemSalesStateDetailList(Map<String, Object> param) throws Exception;

	Map<String, Object> commonSearchDownload(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>>  deliverDayStateHeader(Map<String, Object> param) throws Exception;
	List<Map<String, Object>>  deliverDayStateListCount(Map<String, Object> param) throws Exception;
	List<Map<String, Object>>  deliverDayStateListSum(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>>  itemSalesCustStateSelect(Map<String, Object> param) throws Exception;
}
