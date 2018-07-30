package retail.payment.deduction.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.payment.deduction.service.PaymentDeductionService;


/**
 * 
 * @Class Name : PaymentDeductionServiceImpl.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.16           최초생성
 *
 * @author 오동근
 * @since 2017. 01. 16.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("PaymentDeductionServiceImpl")
public class PaymentDeductionServiceImpl implements PaymentDeductionService{

	@Autowired
	private PaymentDeductionDao paymentDeductionDao;
	
	/**
	 * 공제등록 관리 List
	 */
	public Map<String, Object> selectPaymentDeduction(Map<String, Object> params) throws Exception {
		return paymentDeductionDao.selectPaymentDeduction(params);
	}

	/**
	 * 보류등록(해제) 관리 List
	 */
	public Map<String, Object> selectPaymentDeductionHold(Map<String, Object> params) throws Exception {
		return paymentDeductionDao.selectPaymentDeductionHold(params);
	}

	/**
	 * 공제등록 관리 Update
	 */
	public Map<String, Object> updatePaymentDeduction(Map<String, Object> params) throws Exception {
		return paymentDeductionDao.updatePaymentDeduction(params);
	}

	/**
	 * 보류등록 관리 Update
	 */
	public Map<String, Object> updatePaymentDeductionHold(Map<String, Object> params) throws Exception {
		return paymentDeductionDao.updatePaymentDeductionHold(params);
	}

	/**
	 * 보류등록(해제) 관리 Update
	 */
	public Map<String, Object> updatePaymentReleHold(Map<String, Object> params) throws Exception {
		return paymentDeductionDao.updatePaymentReleHold(params);
	}

	/**
	 * 협력업체, 지불주기, 지불차수 selectBoxList
	 */
	public Map<String, Object> getPaymentSelectBoxList(Map<String, Object> params) throws Exception {
		return paymentDeductionDao.getPaymentSelectBoxList(params);
	}


}
