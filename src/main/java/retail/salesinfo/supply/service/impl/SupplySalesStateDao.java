package retail.salesinfo.supply.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;


@SuppressWarnings("unchecked")
@Repository("SupplySalesStateDao")
public class SupplySalesStateDao extends EgovAbstractDAO{

	public Map<String, Object> supplySalesStateList(Map<String, Object> param) throws Exception {
		list("supplySalesState.supplySalesStateList", param);
		return param;		
	}
	
	public Map<String, Object> supplySalesStateDtList(Map<String, Object> param) throws Exception {
		list("supplySalesState.supplySalesStateDetailList", param);
		return param;		
	}

	public void supplySalesStateListDownload(Map<String, Object> paramMap) throws Exception{
		list("supplySalesState.supplySalesStateListDownload", paramMap);
	}
}
