package retail.business.manage.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.business.manage.service.BusinessManageService;

@Service("BusinessManageServiceImpl")
public class BusinessManageServiceImpl implements BusinessManageService{
	
	@Autowired
	private BusinessManageDao businessManagerDao;

	/**
	 *카드프리픽스 관리 List
	 */
	public Map<String, Object> selectBusinessManageCard(Map<String, Object> param) throws Exception {
		return	businessManagerDao.selectBusinessManageCard(param);
	}

	/**
	 *카드프리픽스 Insert
	 */
	public Map<String, Object> insertBusinessManageCard(Map<String, Object> param) throws Exception {
		return businessManagerDao.insertBusinessManageCard(param);
	}
	
	/**
	 *주류판매대장 관리 List
	 */
	public List<Map<String, Object>> selectBusinessManageDrink(Map<String, Object> param) throws Exception {
		return	businessManagerDao.selectBusinessManageDrink(param);
	}

	/**
	 *주류판매대장 Update
	 */
	public Map<String, Object> updateBusinessManageDrink(Map<String, Object> param) throws Exception {
		return businessManagerDao.updateBusinessManageDrink(param);
	}

}
