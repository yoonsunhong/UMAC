package retail.check.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.check.service.ProductCheckInOutDelService;

@Service("ProductCheckInOutDelService")
public class ProductCheckInOutDelServiceImpl implements ProductCheckInOutDelService{
	
	@Autowired
	private ProductCheckInOutDelDao pcioDao;
	
	@Override
	@Transactional
	public void selectProductCheckOutDel(Map<String, Object> paramMap) throws Exception{
		pcioDao.selectProductCheckOutDel(paramMap);
	}
   
	
	@Override
	@Transactional
	public List<Map<String, Object>> productCheckOutDelete(  Map<String, Object> param) throws Exception { 
		return pcioDao.productCheckOutDelete(param);
	}
	
	
	@Override
	@Transactional
	public void selectProductCheckOutDtlDel(Map<String, Object> paramMap) throws Exception{
		pcioDao.selectProductCheckOutDtlDel(paramMap);
	}
	
	
	
	@Override
	@Transactional
	public List<Map<String, Object>> productCheckOutCancel(  Map<String, Object> param) throws Exception { 
		return pcioDao.productCheckOutCancel(param);
	}
	
	
	
	
	
	
	
	
	
//	@Override
//	@Transactional
//	public void registProductCheckOut(Map<String, Object> paramMap) throws Exception{
//		pcioDao.registProductCheckOut(paramMap);
//	}
//	

//	
//	@Override
//	@Transactional
//	public void determineProductCheckOut(Map<String, Object> paramMap) throws Exception{
//		pcioDao.determineProductCheckOut(paramMap);
//	}
//	
//	@Override
//	@Transactional
//	public void selectProductCheckIn(Map<String, Object> paramMap) throws Exception{
//		pcioDao.selectProductCheckIn(paramMap);
//	}
//	
//	@Override
//	@Transactional
//	public void selectProductCheckInDtl(Map<String, Object> paramMap) throws Exception{
//		pcioDao.selectProductCheckInDtl(paramMap);
//	}
//	
//	@Override
//	@Transactional
//	public void registProductCheckIn(Map<String, Object> paramMap) throws Exception{
//		pcioDao.registProductCheckIn(paramMap);
//	}
	

}
