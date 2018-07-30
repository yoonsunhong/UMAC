package retail.salesinfo.goal.service.impl;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.salesinfo.goal.service.SalesInfoGoalService;

@Service("SalesInfoGoalService")
public class SalesInfoGoalServiceImpl implements SalesInfoGoalService {
	
	@Autowired
	private SalesInfoGoalDao salesInfoGoalDao; 
	
	@Override
	public List<Map<String, Object>> salesInfoGoalList(Map<String, Object> param) throws Exception {
		return salesInfoGoalDao.salesInfoGoalList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoGoalGoodsList(Map<String, Object> param) throws Exception {
		return salesInfoGoalDao.salesInfoGoalGoodsList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoGoalPopBefore(Map<String, Object> param) throws Exception {
		return salesInfoGoalDao.salesInfoGoalPopBefore(param);
	}
 
	@Override
	public void salesInfoGoalPopInsert(Map<String, Object> paramMap) throws Exception {
		salesInfoGoalDao.salesInfoGoalPopInsert(paramMap);
	}

	@Override
	public Map<String, Object> salesInfoGoalPopSearch(Map<String, Object> paramMap) throws Exception {
		return salesInfoGoalDao.salesInfoGoalPopSearch(paramMap);
	}

	@Override
	public void salesInfoGoalPopDelete(Map<String, Object> paramMap2) throws Exception {
		salesInfoGoalDao.salesInfoGoalPopDelete(paramMap2);
	}

	@Override
	public void salesInfoGoalDcsnUpdate(Map<String, Object> param) throws Exception {
		salesInfoGoalDao.salesInfoGoalDcsnUpdate(param);		
	}

	@Override
	public void salesInfoGoalDcsnDelete(Map<String, Object> param) throws Exception {
		salesInfoGoalDao.salesInfoGoalDcsnDelete(param);
	}

	@Override
	public Map<String, Object> salesInfoGoalDcsnYn(Map<String, Object> paramMap) throws Exception {
		return salesInfoGoalDao.salesInfoGoalDcsnYn(paramMap);
	}

}
