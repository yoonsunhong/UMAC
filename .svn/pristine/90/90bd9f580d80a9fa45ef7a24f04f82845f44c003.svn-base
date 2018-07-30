package retail.payment.deduction.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 
 * @Class Name : paymentDeductionDao.java
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
@Repository("PaymentDeductionDao")
public class PaymentDeductionDao extends EgovAbstractDAO {
	
	/**
	 * 공제등록 관리 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectPaymentDeduction(Map<String, Object> params) throws Exception {
		select("paymentDeduction.selectPaymentDeduction", params);
		return params;
	}
	
	/**
	 * 보류등록(해제) 관리 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectPaymentDeductionHold(Map<String, Object> params) throws Exception {
		select("paymentDeduction.selectPaymentDeductionHold", params);
		return params;
	}
	
	/**
	 * 협력업체, 지불주기, 지불차수 selectBoxList
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getPaymentSelectBoxList(Map<String, Object> params) throws Exception {
		select("paymentDeduction.getPaymentSelectBoxList", params);
		return params;
	}
	
	/**
	 * 공제등록 관리 Update
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updatePaymentDeduction(Map<String, Object> params) throws Exception {
		select("paymentDeduction.updatePaymentDeduction", params);
		return params;
	}
	
	/**
	 * 보류등록 관리 Update
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updatePaymentDeductionHold(Map<String, Object> params) throws Exception {
		select("paymentDeduction.updatePaymentDeductionHold", params);
		return params;
	}
	
	/**
	 * 보류등록(해제) 관리 Update
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updatePaymentReleHold(Map<String, Object> params) throws Exception {
		select("paymentDeduction.updatePaymentReleHold", params);
		return params;
	}

}
