package retail.product.box.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
 

public interface ProductBoxService {




	List<Map<String, Object>>  productBoxSearchList(Map<String, Object> params) throws Exception;
 
	List<Map<String, Object>>  productBoxUpdate(  Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>>  productBoxalready_ch(  Map<String, Object> param) throws Exception;
	
	
}