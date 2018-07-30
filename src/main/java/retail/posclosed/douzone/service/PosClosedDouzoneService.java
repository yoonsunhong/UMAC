package retail.posclosed.douzone.service;

import java.util.List;
import java.util.Map;

public interface PosClosedDouzoneService {
	
	Map<String, Object> getPosClosedDouzone(Map<String, Object> params) throws Exception;
	
	Map<String, Object> updatePosClosedDouzone1(Map<String, Object> params) throws Exception;
	
	Map<String, Object> updatePosClosedDouzone2(Map<String, Object> params) throws Exception;
	
	List<Map<String, Object>> posClosedDouzoneListExcel1(Map<String, Object> params) throws Exception;
	
	List<Map<String, Object>> posClosedDouzoneListExcel2(Map<String, Object> params) throws Exception;
	
}