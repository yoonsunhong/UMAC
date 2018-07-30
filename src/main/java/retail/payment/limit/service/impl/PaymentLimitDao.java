package retail.payment.limit.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 
 * @Class Name : PaymentLimitDao.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.25           최초생성
 *
 * @author 오동근
 * @since 2017. 02. 01.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("PaymentLimitDao")
public class PaymentLimitDao extends EgovAbstractDAO{
	
	/**
	 * 업체별 여신한도관리 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectPaymentLimit(Map<String, Object> params) throws Exception {
		select("paymentLimit.selectPaymentLimit", params);
		return params;
	}
	
	/**
	 * 업체별 여신한도관리  Update
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updatePaymentLimit(Map<String, Object> params) throws Exception {
		select("paymentLimit.updatePaymentLimit", params);
		return params;
	}

}
