package retail.product.venChange.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("ProductVenChangeDao")
public class ProductVenChangeDao extends EgovAbstractDAO {

	public List<Map<String, Object>> productVenChangeList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("productVenChange.productVenChangeList", param);
	}

	public Map<String, Object> productVenChangeUpdate(Map<String, Object> param) throws Exception {
		list("productVenChange.productVenChangeUpdate", param);
		return param;
	}

}
