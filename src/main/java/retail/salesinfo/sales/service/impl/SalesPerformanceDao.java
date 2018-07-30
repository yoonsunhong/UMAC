package retail.salesinfo.sales.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : SalesPerformanceDao.java
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
@SuppressWarnings("unchecked")
@Repository("SalesPerformanceDao")
public class SalesPerformanceDao extends EgovAbstractDAO {

    /** log */
    private final Log log = LogFactory.getLog(this.getClass());

    public List<Map<String, Object>> getSalesPerformanceView(Map<String, Object> param) throws Exception {
        log.debug("DAO param :"+param);
        List<Map<String, Object>> resultMap = null;
        resultMap = (List<Map<String, Object>>) list("salesPerformanceView.salesPerformanceList", param);
        return resultMap;
    }

}
