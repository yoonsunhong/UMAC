package retail.wms.in.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.wms.in.service.WmsInLocationService;

@Service("WmsInLocationService")
public class WmsInLocationServiceImpl implements WmsInLocationService{
	
	@Autowired
	private WmsInLocationDao wmsDao;
	
	@Override
	@Transactional
	public void selectWmsInZone(Map<String, Object> paramMap) throws Exception{
		wmsDao.selectWmsInZone(paramMap);
	}
	
	@Override
	@Transactional
	public void selectWmsInRack(Map<String, Object> paramMap) throws Exception{
		wmsDao.selectWmsInRack(paramMap);
	}
	
	@Override
	@Transactional
	public void selectWmsInLine(Map<String, Object> paramMap) throws Exception{
		wmsDao.selectWmsInLine(paramMap);
	}
	
	@Override
	@Transactional
	public void selectWmsInCategory(Map<String, Object> paramMap) throws Exception{
		wmsDao.selectWmsInCategory(paramMap);
	}
	
	@Override
	@Transactional
	public void selectWmsInCategoryPop(Map<String, Object> paramMap) throws Exception{
		wmsDao.selectWmsInCategoryPop(paramMap);
	}
	
	@Override
	@Transactional
	public void registWmsInLocation(Map<String, Object> paramMap) throws Exception{
		wmsDao.registWmsInLocation(paramMap);
	}

}
