package retail.payment.incentive.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.payment.incentive.service.PaymentIncentiveService;


/**
 * 
 * @Class Name : PaymentIncentiveServiceImpl.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일                            수정자                                                   수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.05.10     최호정                  최초생성
 *
 * @author 최호정
 * @since 2017.05.10
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("PaymentIncentiveServiceImpl")
public class PaymentIncentiveServiceImpl implements PaymentIncentiveService{

    @Autowired
    private PaymentIncentiveDao paymentIncentiveDao;
    
    /**
     * 생성된 장려금 List
     */
    public Map<String, Object> selectPaymentIncentive(Map<String, Object> params) throws Exception {
        return paymentIncentiveDao.selectPaymentIncentive(params);
    }

    /**
     * 새로운 장려금 리스트 insert
     */
    public Map<String, Object> insertPaymentIncentive(Map<String, Object> params) throws Exception {
        return paymentIncentiveDao.insertPaymentIncentive(params);
    }

    /**
     * 기존 장려금 정보 update
     */
    public Map<String, Object> updatePaymentIncentive(Map<String, Object> params) throws Exception {
        return paymentIncentiveDao.updatePaymentIncentive(params);
    }
    
    //
    public Map<String, Object> deletePaymentIncentive(Map<String, Object> params) throws Exception {
        return paymentIncentiveDao.deletePaymentIncentive(params);
    }

}
