package retail.business.salesmst.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.business.salesmst.service.SalesMstService;

@Service("SalesMstService")
public class SalesMstServiceImpl implements SalesMstService{

	@Autowired
	private SalesMstDao salesMstDao;
	
	@Override
	public List<Map<String, Object>> salesMstInit(Map<String, Object> param)
			throws Exception {
		// TODO Auto-generated method stub
		return salesMstDao.salesMstInit(param);
	}

	@Override
	public List<Map<String, Object>> salesMstSearch(Map<String, Object> param)
			throws Exception {
		// TODO Auto-generated method stub
		return salesMstDao.salesMstSearch(param);
	}


	@Override
	public List<Map<String, Object>> updateSalesMst(Map<String, Object> param)
			throws Exception {
		// TODO Auto-generated method stub
		return salesMstDao.updateSalesMst(param);
	}

	@Override
	public List<Map<String, Object>> updateSalesMstAll(Map<String, Object> param)
			throws Exception {
		// TODO Auto-generated method stub
		return salesMstDao.updateSalesMstAll(param);
	}

}
