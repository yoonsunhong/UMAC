package retail.check.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.check.service.ProductCheckInOutService;

@Service("ProductCheckInOutService")
public class ProductCheckInOutServiceImpl implements ProductCheckInOutService{
	
	@Autowired
	private ProductCheckInOutDao pcioDao;
	
	@Override
	@Transactional
	public void selectProductCheckOut(Map<String, Object> paramMap) throws Exception{
		pcioDao.selectProductCheckOut(paramMap);
	}
	
	@Override
	@Transactional
	public void registProductCheckOut(Map<String, Object> paramMap) throws Exception{
		pcioDao.registProductCheckOut(paramMap);
	}
	
	@Override
	@Transactional
	public void selectProductCheckOutDtl(Map<String, Object> paramMap) throws Exception{
		pcioDao.selectProductCheckOutDtl(paramMap);
	}
	
	@Override
	@Transactional
	public void determineProductCheckOut(Map<String, Object> paramMap) throws Exception{
		pcioDao.determineProductCheckOut(paramMap);
	}
	
	@Override
	@Transactional
	public void selectProductCheckIn(Map<String, Object> paramMap) throws Exception{
		pcioDao.selectProductCheckIn(paramMap);
	}
	
	@Override
	@Transactional
	public void selectProductCheckInDtl(Map<String, Object> paramMap) throws Exception{
		pcioDao.selectProductCheckInDtl(paramMap);
	}
	
	@Override
	@Transactional
	public void registProductCheckIn(Map<String, Object> paramMap) throws Exception{
		pcioDao.registProductCheckIn(paramMap);
	}
	

}
