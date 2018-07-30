package retail.business.callorder.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("BusinessCallOrderDao")
public class BusinessCallOrderDao extends EgovAbstractDAO {
	
	public void selectCallOrder(Map<String, Object> paramMap) throws Exception {
		list("BCO.selectCallOrder", paramMap);
	}
	
	public void excelCallOrder(Map<String, Object> paramMap) throws Exception {
		list("BCO.excelCallOrder", paramMap);
	}
	
	public void registCallOrder(Map<String, Object> paramMap) throws Exception{
		update("BCO.registCallOrder", paramMap);
	}
	
}
