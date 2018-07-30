package retail.payment.request.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 
 * @Class Name : PaymentRequestDao.java
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
@Repository("PaymentRequestDao")
public class PaymentRequestDao extends EgovAbstractDAO{
	
	/**
	 * 대금지불 의뢰조회 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectPaymentRequest(Map<String, Object> params) throws Exception {
		select("paymentRequest.selectPaymentRequest", params);
		return params;
	}
	
	/**
	 * 대금지불 의뢰조회 은행제출용 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectPaymentRequest_Bank(Map<String, Object> params) throws Exception {
		select("paymentRequest.selectPaymentRequest_Bank", params);
		return params;
	}

}
