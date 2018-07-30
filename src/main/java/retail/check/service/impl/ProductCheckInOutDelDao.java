package retail.check.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
  
@SuppressWarnings("unchecked")
@Repository("ProductCheckInOutDelDao")
public class ProductCheckInOutDelDao extends EgovAbstractDAO{
	
	public void selectProductCheckOutDel(Map<String, Object> paramMap) throws Exception{
		list("productCheckInOutDel.selectProductCheckOutDel", paramMap);
	}


	public  List<Map<String, Object>>  productCheckOutDelete( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("productCheckInOutDel.productCheckOutDelete", param);
	}

	public void selectProductCheckOutDtlDel(Map<String, Object> paramMap) throws Exception{
	list("productCheckInOutDel.selectProductCheckOutDtlDel", paramMap);
	}
	
	 
	public  List<Map<String, Object>>  productCheckOutCancel( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("productCheckInOutDel.productCheckOutCancel", param);
	}
	
//	public void registProductCheckOut(Map<String, Object> paramMap) throws Exception{
//		update("productCheckInOut.registProductCheckOut", paramMap);
//	}
//	

//
//	public void determineProductCheckOut(Map<String, Object> paramMap) throws Exception{
//		update("productCheckInOut.determineProductCheckOut", paramMap);
//	}
//	
//	public void selectProductCheckIn(Map<String, Object> paramMap) throws Exception{
//		list("productCheckInOut.selectProductCheckIn", paramMap);
//	}
//	
//	public void selectProductCheckInDtl(Map<String, Object> paramMap) throws Exception{
//		list("productCheckInOut.selectProductCheckInDtl", paramMap);
//	}
//	
//	public void registProductCheckIn(Map<String, Object> paramMap) throws Exception{
//		update("productCheckInOut.registProductCheckIn", paramMap);
//	}
}
