package retail.salesinfo.supply.service;

import java.util.List;
import java.util.Map;

public interface SupplySalesStateService {

	Map<String, Object> supplySalesStateList(Map<String, Object> param) throws Exception;
	Map<String, Object> supplySalesStateDtList(Map<String, Object> param) throws Exception;

	Map<String, Object> supplySalesStateListDownload(Map<String, Object> param)throws Exception;
}
