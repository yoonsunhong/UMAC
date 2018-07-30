package retail.business.daysales.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.business.daysales.service.DaySalesSettlementService;

@Service("DaySalesSettlementService")
public class DaySalesSettlementServiceImpl implements DaySalesSettlementService{
	@Autowired
	private DaySalesSettlementDao dSSDao;
	
	@Override
	public List<Map<String, Object>> daySalesSettlementList(Map<String, Object> param) throws Exception {
		return dSSDao.daySalesSettlementList(param);
	}
	@Override
	public List<Map<String, Object>> daySalesSettlementList2(Map<String, Object> param) throws Exception {
		return dSSDao.daySalesSettlementList2(param);
	}
	@Override
	public List<Map<String, Object>> daySalesSettlementList3(Map<String, Object> param) throws Exception {
		return dSSDao.daySalesSettlementList3(param);
	}
	@Override
	public List<Map<String, Object>> daySalesSettlementList4(Map<String, Object> param) throws Exception {
		return dSSDao.daySalesSettlementList4(param);
	}
	
	@Override
	public List<Map<String, Object>> daySalesSettlementList5(Map<String, Object> param) throws Exception {
		return dSSDao.daySalesSettlementList5(param);
	}
}
