package retail.business.orderdelivery.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("BusinessOrderDeliveryDao")
public class BusinessOrderDeliveryDao extends EgovAbstractDAO {
	
	public void selectCallOrderPay(Map<String, Object> paramMap) throws Exception{
		list("BOD.selectCallOrderPay", paramMap);
	}
	
	public void selectCallOrderPayRegist(Map<String, Object> paramMap) throws Exception{
		update("BOD.selectCallOrderPayRegist", paramMap);
	}
	
	public void excelCallOrderPay(Map<String, Object> paramMap) throws Exception{
		list("BOD.excelCallOrderPay", paramMap);
	}
	
	public void selectCallOrderDetail(Map<String, Object> paramMap) throws Exception{
		list("BOD.selectCallOrderDetail", paramMap);
	}
	
	public List<Map<String, Object>> getOrderEmp(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("BOD.getOrderEmp",param);
	}
	
}
