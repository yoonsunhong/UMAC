package retail.stock.stockStatus.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : StockStatusDao.java
 * @Description : 현상품재고현황
 * @Modification Information
 * @
 * @  수정일                수정자                              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.06.05    최호정           최초생성
 *
 * @author 최호정
 * @since 2017. 06. 05.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@SuppressWarnings("unchecked")
@Repository("StockStatusDao")
public class StockStatusDao extends EgovAbstractDAO {

    /** log */
    private final Log log = LogFactory.getLog(this.getClass());

    public List<Map<String, Object>> getStockStatus(Map<String, Object> param) throws Exception {
        log.debug("DAO param :"+param);
        List<Map<String, Object>> resultMap = null;
        resultMap = (List<Map<String, Object>>) list("stockStatus.stockStatusList", param);
        return resultMap;
    }

    /**
     * 재고현황 엑셀다운
     * @param paramMap
     * @return
     * @throws Exception
     */
    public void stockStatusExcelDown(Map<String, Object> paramMap) throws Exception{
        list("stockStatus.stockStatusExcel", paramMap);
    }

}
