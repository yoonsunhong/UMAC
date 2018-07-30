package retail.posclosed.douzoneDay.service;

import java.util.List;
import java.util.Map;

public interface PosClosedDouzoneDayService {
	
	Map<String, Object> getPosClosedDouzoneDay(Map<String, Object> params) throws Exception;
	
	Map<String, Object> posClosedDouzoneDaySum(Map<String, Object> param) throws Exception;
	
	Map<String, Object> updatePosClosedDouzoneDay(Map<String, Object> params) throws Exception;
	
	Map<String, Object> updatePosClosedDouzoneDay1(Map<String, Object> params) throws Exception;
	
	Map<String, Object> updatePosClosedDouzoneDay2(Map<String, Object> params) throws Exception;
	
	Map<String, Object> updatePosClosedDouzoneDay3(Map<String, Object> params) throws Exception;
	
	Map<String, Object> updatePosClosedDouzoneDay4(Map<String, Object> params) throws Exception;
	
	Map<String, Object> updatePosClosedDouzoneDay5(Map<String, Object> params) throws Exception;
	
	List<Map<String, Object>> oracleToXmlFileSave(Map<String, Object> params) throws Exception;
	
	Map<String, Object> canclePosClosedDouzoneDay(Map<String, Object> params) throws Exception;
	
	List<Map<String, Object>> posClosedDouzoneDayList_excel(Map<String, Object> params) throws Exception;
	
	Map<String, Object> posClosedDouzoneDayList_excel_ch(Map<String, Object> params) throws Exception;
}