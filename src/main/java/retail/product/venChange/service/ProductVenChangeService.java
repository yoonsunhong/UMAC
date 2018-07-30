package retail.product.venChange.service;

import java.util.List;
import java.util.Map;

public interface ProductVenChangeService {

	List<Map<String, Object>> productVenChangeList(Map<String, Object> param) throws Exception;

	Map<String, Object> productVenChangeUpdate(Map<String, Object> param) throws Exception;

}
