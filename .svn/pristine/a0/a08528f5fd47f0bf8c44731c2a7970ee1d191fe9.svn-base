package retail.salesinfo.item.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;


@SuppressWarnings("unchecked")
@Repository("ItemSalesStateDao")
public class ItemSalesStateDao extends EgovAbstractDAO{

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/*public List<Map<String, Object>> supplySalesStateList(Map<String, Object> param) throws Exception {		
	String url  = param.get("URL").toString();
	log.debug("supplySalesStateList :"+url);
	
	List<Map<String, Object>> resultMap = null;
	resultMap = (List<Map<String, Object>>) list(url, param);		
	return resultMap;		
	}*/
	
	public Map<String, Object> itemSalesEventStateList(Map<String, Object> param) throws Exception {		
		list("itemSalesState.itemSalesEventStateList", param);
		return param;	
	}
	
	public Map<String, Object> itemSalesStateList(Map<String, Object> param) throws Exception {		
		list("itemSalesState.itemSalesStateList", param);
		return param;	
	}
	
	public Map<String, Object> itemSalesStateDetailList(Map<String, Object> param) throws Exception {		
		list("itemSalesState.itemSalesStateDetailList", param);
		return param;	
	}
	
	public Map<String, Object> itemSalesEventPopupList(Map<String, Object> param) throws Exception {		
		list("itemSalesState.itemSalesEventPopupList", param);
		return param;	
	}

	public void commonSearchDownload(Map<String, Object> paramMap) throws Exception {	
		list("itemSalesState.itemSalesStateDownload", paramMap);
	}
	
	public List<Map<String, Object>>   deliverDayStateHeader(Map<String, Object> paramMap) throws Exception {	
		return (List<Map<String, Object>>) list("itemSalesState.deliverDayStateHeader", paramMap);
	}
	
	public List<Map<String, Object>>   deliverDayStateListCount(Map<String, Object> paramMap) throws Exception {	
		return (List<Map<String, Object>>) list("itemSalesState.deliverDayStateListCount", paramMap);
	}
	
	public List<Map<String, Object>>   deliverDayStateListSum(Map<String, Object> paramMap) throws Exception {	
		return (List<Map<String, Object>>) list("itemSalesState.deliverDayStateListSum", paramMap);
	}
	
	public List<Map<String, Object>>   itemSalesCustStateSelect(Map<String, Object> paramMap) throws Exception {	
		return (List<Map<String, Object>>) list("itemSalesState.itemSalesCustStateList", paramMap);
	}

}
