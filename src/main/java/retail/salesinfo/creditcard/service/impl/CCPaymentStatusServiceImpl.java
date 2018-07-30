package retail.salesinfo.creditcard.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.salesinfo.creditcard.service.impl.CCPaymentStatusDao;
import retail.salesinfo.creditcard.service.CCPaymentStatusService;

/**
 * 
 * @Class Name : CCPaymentStatusServiceImpl.java
 * @Description : 신용카드지불현황
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
@Service("CCPaymentStatusService")
public class CCPaymentStatusServiceImpl implements CCPaymentStatusService {

    @Autowired
    private CCPaymentStatusDao ccPaymentStatusDao;

    private final Log log = LogFactory.getLog(this.getClass());

    @Override
    public List<Map<String, Object>> getPaymentStatusList(Map<String, Object> param) throws Exception {
        log.debug("param :"+param);
        return ccPaymentStatusDao.getPaymentStatus(param);
    }
    @Override
    public void saveCcPaymentStatus(Map<String, Object> param) throws Exception {
    	ccPaymentStatusDao.saveCcPaymentStatus(param);
    }
    
    
}
