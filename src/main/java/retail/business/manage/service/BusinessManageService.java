package retail.business.manage.service;

import java.util.List;
import java.util.Map;

public interface BusinessManageService {
	
	Map<String, Object> selectBusinessManageCard(Map<String, Object> param) 	throws Exception;
	Map<String, Object> insertBusinessManageCard(Map<String, Object> param) 	throws Exception;
	List<Map<String, Object>> selectBusinessManageDrink(Map<String, Object> param) 	throws Exception;
	Map<String, Object> updateBusinessManageDrink(Map<String, Object> param) 	throws Exception;
}
