package retail.product.venChange.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.product.venChange.service.ProductVenChangeService;

@Service("ProductVenChangeService")
public class ProductVenChangeServiceImpl implements ProductVenChangeService{
	@Autowired
	private ProductVenChangeDao productVenChangeDao; 
	
	@Override
	public List<Map<String, Object>> productVenChangeList(Map<String, Object> param)throws Exception {		
		return productVenChangeDao.productVenChangeList(param);
	}

	@Override
	public Map<String, Object> productVenChangeUpdate(Map<String, Object> param) throws Exception {
		return productVenChangeDao.productVenChangeUpdate(param);
	}

}
