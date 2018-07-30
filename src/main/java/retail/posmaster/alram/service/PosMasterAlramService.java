package retail.posmaster.alram.service;

import java.util.List;
import java.util.Map;

public interface PosMasterAlramService {
	
	List<Map<String, Object>> getPosMasterAlramLogNo(Map<String, Object> param) throws Exception;
	
	Map<String, Object> getPosMasterAlram(Map<String, Object> params) throws Exception;
	
	Map<String, Object> updatePosMasterAlram(Map<String, Object> param) throws Exception;
	
	
	
	
}