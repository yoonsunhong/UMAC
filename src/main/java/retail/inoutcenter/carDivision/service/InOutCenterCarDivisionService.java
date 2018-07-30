package retail.inoutcenter.carDivision.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
 

public interface InOutCenterCarDivisionService {

	 
	List<Map<String, Object>> inOutCenterHeadCarDivisionSearch(Map<String, Object> param) throws Exception;


	List<Map<String, Object>> inOutCenterDetailCarDivisionInfo(Map<String, Object> param) throws Exception;

//	List<Map<String, Object>>  inOutCenterConfirm(  Map<String, Object> param) throws Exception;
	
 
//	List<Map<String, Object>>  purchRegister(  Map<String, Object> param) throws Exception;
//	
//	List<Map<String, Object>>  jobOrderToPurch(  Map<String, Object> param) throws Exception;
//	
	
	
	 


}