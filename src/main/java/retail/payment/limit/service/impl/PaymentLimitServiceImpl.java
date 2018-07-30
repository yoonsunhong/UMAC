package retail.payment.limit.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.payment.limit.service.PaymentLimitService;

/**
 * 
 * @Class Name : PaymentLimitServiceImpl.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.01           최초생성
 *
 * @author 오동근
 * @since 2017. 02. 01.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("PaymentLimitServiceImpl")
public class PaymentLimitServiceImpl implements PaymentLimitService{
	
	@Autowired
	private PaymentLimitDao paymentLimitDao;

	/**
	 * 업체별 여신한도관리 List
	 */
	public Map<String, Object> selectPaymentLimit(Map<String, Object> params)	throws Exception {
		return paymentLimitDao.selectPaymentLimit(params);
	}

	
	/**
	 * 업체별 여신한도관리  Update
	 */
	public Map<String, Object> updatePaymentLimit(Map<String, Object> params)	throws Exception {
		return paymentLimitDao.updatePaymentLimit(params);
	}

}
