package retail.stock.profitAndLoss.service;

import java.util.List;
import java.util.Map;

public interface StockprofitAndLossService {
	 
	
	List<Map<String, Object>> batch_iv_dt_item_coll_ver2(  Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> batch_iv_mt_item_coll_ver2(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> stock_excel_upload_finish_ver2(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> stock_excel_upload_cancel_ver2(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> stock_profit_rate_ver2(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> batch_iv_mt_item_coll_profit_ver2_b(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> batch_iv_mt_item_coll_profit_ver2_s(Map<String, Object> param) throws Exception;
	
	
}



//손익생성