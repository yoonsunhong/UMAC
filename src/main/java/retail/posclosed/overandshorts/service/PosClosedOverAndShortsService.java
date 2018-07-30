package retail.posclosed.overandshorts.service;

import java.util.List;
import java.util.Map;

public interface PosClosedOverAndShortsService {
	Map<String, Object> getPosClosedOverAndShorts(Map<String, Object> params) throws Exception;
	
	List<Map<String, Object>> posClosedOverAndShortsListExcel(Map<String, Object> params) throws Exception;
}
