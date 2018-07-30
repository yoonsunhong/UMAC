package retail.business.estimate.service;

import java.util.Map;

public interface BusinessEstimateService {
	
	Map<String, Object> getBusinessEstimateList(Map<String, Object> param) throws Exception;
	
	Map<String, Object> getBusinessEstimateProList(Map<String, Object> param) throws Exception;
	
	Map<String, Object> updateBusinessEstimate(Map<String, Object> param) throws Exception;
	
	
	
}