package retail.payment.request.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.payment.request.service.PaymentRequestService;

/**
 * 
 * @Class Name : PaymentRequestServiceImpl.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.25           최초생성
 *
 * @author 오동근
 * @since 2017. 01. 25.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("PaymentRequestServiceImpl")
public class PaymentRequestServiceImpl implements PaymentRequestService{
	
	@Autowired
	private PaymentRequestDao paymentRequestDao;

	/**
	 * 대금지불 의뢰조회 List
	 */
	public Map<String, Object> selectPaymentRequest(Map<String, Object> params)	throws Exception {
		return paymentRequestDao.selectPaymentRequest(params);
	}
	
	/**
	 * 대금지불 의뢰조회 은행제출용 List
	 */
	public Map<String, Object> selectPaymentRequest_Bank(Map<String, Object> params)	throws Exception {
		return paymentRequestDao.selectPaymentRequest_Bank(params);
	}

}
