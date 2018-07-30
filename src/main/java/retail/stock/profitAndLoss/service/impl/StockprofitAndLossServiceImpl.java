package retail.stock.profitAndLoss.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.stock.profitAndLoss.service.StockprofitAndLossService;
import retail.stock.stockChange.service.impl.StockChangeServiceImpl;

@Service("StockprofitAndLossService")
public class StockprofitAndLossServiceImpl implements StockprofitAndLossService{

	@Autowired
	private StockprofitAndLossDao stockprofitAndLossDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(StockChangeServiceImpl.class);


	@Override
	@Transactional
	public List<Map<String, Object>> batch_iv_dt_item_coll_ver2(  Map<String, Object> param) throws Exception { 
		return stockprofitAndLossDao.batch_iv_dt_item_coll_ver2(param);
	}

	@Override
	public List<Map<String, Object>> batch_iv_mt_item_coll_ver2(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return stockprofitAndLossDao.batch_iv_mt_item_coll_ver2(param);
	}


	@Override
	public List<Map<String, Object>> stock_excel_upload_finish_ver2(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return stockprofitAndLossDao.stock_excel_upload_finish_ver2(param);
	}
	
	
	@Override
	public List<Map<String, Object>> stock_excel_upload_cancel_ver2(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return stockprofitAndLossDao.stock_excel_upload_cancel_ver2(param);
	}


	@Override
	public List<Map<String, Object>> stock_profit_rate_ver2(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return stockprofitAndLossDao.stock_profit_rate_ver2(param);
	}


	@Override
	public List<Map<String, Object>> batch_iv_mt_item_coll_profit_ver2_b(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return stockprofitAndLossDao.batch_iv_mt_item_coll_profit_ver2_b(param);
	}
	
	@Override
	public List<Map<String, Object>> batch_iv_mt_item_coll_profit_ver2_s(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return stockprofitAndLossDao.batch_iv_mt_item_coll_profit_ver2_s(param);
	}
	
	
}
