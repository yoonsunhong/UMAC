package retail.wms.in.service;

import java.util.Map;

public interface WmsInLocationService {
	
	void selectWmsInZone(Map<String, Object> paramMap) throws Exception;
	
	void selectWmsInRack(Map<String, Object> paramMap) throws Exception;
	
	void selectWmsInLine(Map<String, Object> paramMap) throws Exception;
	
	void selectWmsInCategory(Map<String, Object> paramMap) throws Exception;
	
	void selectWmsInCategoryPop(Map<String, Object> paramMap) throws Exception;
	
	void registWmsInLocation(Map<String, Object> paramMap) throws Exception;

}
