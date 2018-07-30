package retail.salesinfo.sales.service;

import java.util.List;
import java.util.Map;

public interface SalesPerformanceService {

    List<Map<String, Object>> getSalesPerformanceList(Map<String, Object> param) throws Exception;

}
