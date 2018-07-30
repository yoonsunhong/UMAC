package retail.salesinfo.goal.service;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;

public interface SalesInfoGoalService {

	List<Map<String, Object>> salesInfoGoalList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoGoalGoodsList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoGoalPopBefore(Map<String, Object> param) throws Exception;

	void salesInfoGoalPopInsert(Map<String, Object> paramMap) throws Exception;

	Map<String, Object> salesInfoGoalPopSearch(Map<String, Object> paramMap) throws Exception;

	void salesInfoGoalPopDelete(Map<String, Object> paramMap2) throws Exception;

	void salesInfoGoalDcsnUpdate(Map<String, Object> param) throws Exception;

	void salesInfoGoalDcsnDelete(Map<String, Object> param) throws Exception;

	Map<String, Object> salesInfoGoalDcsnYn(Map<String, Object> paramMap) throws Exception;
}
