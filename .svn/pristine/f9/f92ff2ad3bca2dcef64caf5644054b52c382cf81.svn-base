package retail.salesinfo.goal.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("SalesInfoGoalDao")
public class SalesInfoGoalDao extends EgovAbstractDAO {

	public List<Map<String, Object>> salesInfoGoalList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("salesInfoGoal.salesInfoGoalList", param);
	}

	public List<Map<String, Object>> salesInfoGoalGoodsList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("salesInfoGoal.salesInfoGoalGoodsList", param);
	}

	public List<Map<String, Object>> salesInfoGoalPopBefore(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("salesInfoGoal.salesInfoGoalPopBefore", param);
	}

	public void salesInfoGoalPopInsert(Map<String, Object> paramMap) throws Exception {
		insert("salesInfoGoal.salesInfoGoalPopInsert", paramMap);
	}

	public Map<String, Object> salesInfoGoalPopSearch(Map<String, Object> paramMap) throws Exception {
		return (Map<String, Object>)select("salesInfoGoal.salesInfoGoalPopSearch", paramMap);
	}

	public void salesInfoGoalPopDelete(Map<String, Object> paramMap2) throws Exception {
		delete("salesInfoGoal.salesInfoGoalPopDelete", paramMap2);
	}

	public void salesInfoGoalDcsnUpdate(Map<String, Object> param) throws Exception {
		update("salesInfoGoal.salesInfoGoalDcsnUpdate", param);
	}

	public void salesInfoGoalDcsnDelete(Map<String, Object> param) throws Exception {
		delete("salesInfoGoal.salesInfoGoalDcsnDelete", param);		
	}

	public Map<String, Object> salesInfoGoalDcsnYn(Map<String, Object> paramMap) throws Exception {
		return (Map<String, Object>)select("salesInfoGoal.salesInfoGoalDcsnYn", paramMap);
	}

}
