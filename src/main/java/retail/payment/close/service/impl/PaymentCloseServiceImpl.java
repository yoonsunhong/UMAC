package retail.payment.close.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.payment.close.service.PaymentCloseService;
import retail.payment.deduction.service.PaymentDeductionService;
import retail.payment.deduction.service.impl.PaymentDeductionDao;
import retail.posclosed.douzoneDay.service.impl.PosClosedDouzoneDayDao;

/**
 * 
 * @Class Name : PaymentDeductionServiceImpl.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.24           최초생성
 *
 * @author 오동근
 * @since 2017. 01. 24.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("PaymentCloseServiceImpl")
public class PaymentCloseServiceImpl implements PaymentCloseService{
	
	@Autowired
	private PaymentCloseDao paymentCloseDao;
	
	/**
	 * 대금지불 마감관리 List
	 */
	public Map<String, Object> selectPaymentClose(Map<String, Object> params)	throws Exception {
		return paymentCloseDao.selectPaymentClose(params);
	}

	/**
	 * 대금지불 마감관리 Update
	 */
	public Map<String, Object> updatePaymentClose(Map<String, Object> params)	throws Exception {
		return paymentCloseDao.updatePaymentClose(params);
	}
	
	/**
	 * 매입마감 List
	 */
	public Map<String, Object> purchClosedList(Map<String, Object> params)	throws Exception {
		return paymentCloseDao.purchClosedList(params);
	}
	
	public Map<String, Object> updatePurchClose(Map<String, Object> params)	throws Exception {
		return paymentCloseDao.updatePurchClose(params);
	}
	
	public Map<String, Object> updatePurchClosedConf(Map<String, Object> params)	throws Exception {
		return paymentCloseDao.updatePurchClosedConf(params);
	}
	
	public Map<String, Object> insertPurchClosedDouzone(Map<String, Object> params)	throws Exception {
		return paymentCloseDao.insertPurchClosedDouzone(params);
	}
	
	@Override
	@Transactional
	public void selectPurchClosed(Map<String, Object> paramMap) throws Exception{
		paymentCloseDao.selectPurchClosed(paramMap);
	}
	
	@Override
	@Transactional
	public void selectPurchClosedDetail(Map<String, Object> paramMap) throws Exception{
		paymentCloseDao.selectPurchClosedDetail(paramMap);
	}
	
	@Override
	public  List<Map<String, Object>> insertPurchClosedDouzoneSend(Map<String, Object> params) throws Exception {
		return paymentCloseDao.insertPurchClosedDouzoneSend(params);
	}

}
