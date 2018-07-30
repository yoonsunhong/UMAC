package retail.payment.incentive.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 *
 * @Class Name : paymentDeductionDao.java
 * @Description :
 * @Modification Information
 * @
 * @  수정일          수정자                 수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.05.10     최호정                 최초생성
 *
 * @author 최호정
 * @since 2017.05.10
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("PaymentIncentiveDao")
public class PaymentIncentiveDao extends EgovAbstractDAO {

    /**
     * 생성된 장려금 List
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> selectPaymentIncentive(Map<String, Object> params) throws Exception {
        select("paymentIncentive.selectPaymentIncentive", params);
        return params;
    }


    /**
     * 장려금 생성 (신규 장려금 정보 insert)
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> insertPaymentIncentive(Map<String, Object> params) throws Exception {
        select("paymentIncentive.insertPaymentIncentive", params);
        return params;
    }

    /**
     * 생성된 장려금에 대한 부분 update
     * 확정장려금과 비고 부분이 update 됨
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> updatePaymentIncentive(Map<String, Object> params) throws Exception {
        select("paymentIncentive.updatePaymentIncentive", params);
        return params;
    }
    
    //
    public Map<String, Object> deletePaymentIncentive(Map<String, Object> params) throws Exception {
        select("paymentIncentive.deletePaymentIncentive", params);
        return params;
    }

}
