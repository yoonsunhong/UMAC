package retail.payment.close.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 
 * @Class Name : PaymentCloseDao.java
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
@Repository("PaymentCloseDao")
public class PaymentCloseDao extends EgovAbstractDAO {
	
	/**
	 * 대금지불 마감관리 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectPaymentClose(Map<String, Object> params) throws Exception {
		select("paymentClose.selectPaymentClose", params);
		return params;
	}
	
	/**
	 * 대금지불 마감관리 Update
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updatePaymentClose(Map<String, Object> params) throws Exception {
		select("paymentClose.updatePaymentClose", params);
		return params;
	}
	
	/**
	 * 매입마감 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> purchClosedList(Map<String, Object> params) throws Exception {
		select("paymentClose.purchClosedList", params);
		return params;
	}
	
	public Map<String, Object> updatePurchClose(Map<String, Object> params) throws Exception {
		select("paymentClose.updatePurchClose", params);
		return params;
	}
	
	public void selectPurchClosed(Map<String, Object> paramMap) throws Exception{
		select("paymentClose.selectPurchClosed", paramMap);
	}
	
	public void selectPurchClosedDetail(Map<String, Object> paramMap) throws Exception{
		select("paymentClose.selectPurchClosedDetail", paramMap);
	}
	
	public Map<String, Object> updatePurchClosedConf(Map<String, Object> params) throws Exception {
		select("paymentClose.updatePurchClosedConf", params);
		return params;
	}
	
	public Map<String, Object> insertPurchClosedDouzone(Map<String, Object> params) throws Exception {
		select("paymentClose.insertPurchClosedDouzone", params);
		return params;
	}
	
	public List<Map<String, Object>>  insertPurchClosedDouzoneSend(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("paymentClose.insertPurchClosedDouzoneSend", params);
	}

}
