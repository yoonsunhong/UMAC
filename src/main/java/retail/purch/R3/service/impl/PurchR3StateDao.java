package retail.purch.R3.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("PurchR3StateDao")
public class PurchR3StateDao extends EgovAbstractDAO {

    /** log */
    private final Log log = LogFactory.getLog(this.getClass());

    public List<Map<String, Object>> selectPurchR3StateList(Map<String, Object> param) throws Exception {
        String url = param.get("URL").toString();
        log.debug("selectPurchR3StateList :"+url);
        log.debug("param :"+param);

        List<Map<String, Object>> resultMap = null;
        resultMap = (List<Map<String, Object>>) list(url, param);
        return resultMap;
    }

}
