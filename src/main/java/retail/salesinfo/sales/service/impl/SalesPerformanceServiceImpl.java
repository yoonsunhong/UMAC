package retail.salesinfo.sales.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.salesinfo.sales.service.SalesPerformanceService;
import retail.salesinfo.sales.service.impl.SalesPerformanceDao;

/**
 * 
 * @Class Name : SalesPerformanceServiceImpl.java
 * @Description : 매출대비실적조회
 * @Modification Information
 * @
 * @  수정일                수정자                              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.06.09    최호정           최초생성
 *
 * @author 최호정
 * @since 2017. 06. 09.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("SalesPerformanceService")
public class SalesPerformanceServiceImpl implements SalesPerformanceService {

    @Autowired
    private SalesPerformanceDao salesPerformanceDao;

    private final Log log = LogFactory.getLog(this.getClass());

    @Override
    public List<Map<String, Object>> getSalesPerformanceList(Map<String, Object> param) throws Exception {
        log.debug("param :"+param);
        return salesPerformanceDao.getSalesPerformanceView(param);
    }

}
