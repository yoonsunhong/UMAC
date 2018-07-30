package retail.business.salesmst.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("SalesMstDao")
public class SalesMstDao extends EgovAbstractDAO {
	public List<Map<String, Object>>  salesMstInit(Map<String, Object> param){
		return (List<Map<String, Object>>)list("salesMst.SalesMstInit", param);
	}
	
	public List<Map<String, Object>> salesMstSearch(Map<String, Object> param){
		return (List<Map<String, Object>>)list("salesMst.salesMstSearch",param);
	}
	
	public List<Map<String, Object>> updateSalesMst(Map<String, Object> param){
		return (List<Map<String, Object>>)list("salesMst.updateSalesMst",param);
	}

	public List<Map<String, Object>> updateSalesMstAll(Map<String, Object> param){
		return (List<Map<String, Object>>)list("salesMst.updateSalesMstAll",param);
	}

}
