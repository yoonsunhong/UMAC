package retail.check.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("ProductCheckInOutDao")
public class ProductCheckInOutDao extends EgovAbstractDAO{
	
	public void selectProductCheckOut(Map<String, Object> paramMap) throws Exception{
		list("productCheckInOut.selectProductCheckOut", paramMap);
	}
	
	public void registProductCheckOut(Map<String, Object> paramMap) throws Exception{
		update("productCheckInOut.registProductCheckOut", paramMap);
	}
	
	public void selectProductCheckOutDtl(Map<String, Object> paramMap) throws Exception{
		list("productCheckInOut.selectProductCheckOutDtl", paramMap);
	}

	public void determineProductCheckOut(Map<String, Object> paramMap) throws Exception{
		update("productCheckInOut.determineProductCheckOut", paramMap);
	}
	
	public void selectProductCheckIn(Map<String, Object> paramMap) throws Exception{
		list("productCheckInOut.selectProductCheckIn", paramMap);
	}
	
	public void selectProductCheckInDtl(Map<String, Object> paramMap) throws Exception{
		list("productCheckInOut.selectProductCheckInDtl", paramMap);
	}
	
	public void registProductCheckIn(Map<String, Object> paramMap) throws Exception{
		update("productCheckInOut.registProductCheckIn", paramMap);
	}
}
