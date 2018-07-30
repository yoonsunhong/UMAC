package retail.stock.stockStatus.service;

import java.util.List;
import java.util.Map;

public interface StockStatusService {

    List<Map<String, Object>> getStockStatusList(Map<String, Object> param) throws Exception;

    /**
     * 재고현황 엑셀다운
     * @param paramMap
     * @throws Exception
     */
    Map<String, Object> stockStatusExcelDown(Map<String, Object> paramMap) throws Exception;

}
