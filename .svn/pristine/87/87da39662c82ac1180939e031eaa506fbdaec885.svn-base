package retail.payment.purchase.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("PaymentPurchaseDao")
public class PaymentPurchaseDao extends EgovAbstractDAO {
	
	/**
	 * 거래선 매입조회 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectPaymentPurchase(Map<String, Object> params) throws Exception {
		select("paymentPurchase.selectPaymentPurchase", params);
		return params;
	}
	/*
	// 매입집계
	public Map<String, Object> selectPaymentPurchase_2(Map<String, Object> params) throws Exception {
		select("paymentPurchase.selectPaymentPurchase_2", params);
		return params;
	}
	*/
	public Map<String, Object> selectPaymentPurchase_v2(Map<String, Object> params) throws Exception {
		select("paymentPurchase.selectPaymentPurchase_v2", params);
		return params;
	}
	
	/**
	 * 거래선별 매출(임대을)조회 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	/*@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectPaymentSales(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("paymentPurchase.selectPaymentSales", params);
	}
	*/
	public Map<String, Object> selectPaymentSales(Map<String, Object> params) throws Exception {
		select("paymentPurchase.selectPaymentSales", params);
		return params;
	}
	/*
	// 매출집계
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectPaymentSales_2(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("paymentPurchase.selectPaymentSales_2", params);
	}
	*/
	
	/**
	 * 취소구분 COMBOBOX
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getPaymentCancelSelectBoxList(Map<String, Object> params) throws Exception {
		select("paymentPurchase.getPaymentCancelSelectBoxList", params);
		return params;
	}
	
	public Map<String, Object> excelPaymentPurchaseInfoList(Map<String, Object> params) throws Exception {
		select("paymentPurchase.excelPaymentPurchaseInfoList", params);
		return params;
	}
	/*
	// 매입집계
	public Map<String, Object> excelPaymentPurchaseInfoList_2(Map<String, Object> params) throws Exception {
		select("paymentPurchase.excelPaymentPurchaseInfoList_2", params);
		return params;
	}
	*/
	
	/*public Map<String, Object> excelPaymentSalesInfoList(Map<String, Object> params) throws Exception {
		select("paymentPurchase.excelPaymentSalesInfoList", params);
		return params;
	}
	*/
	public void excelPaymentSalesInfoList(Map<String, Object> paramMap) throws Exception{
		list("paymentPurchase.excelPaymentSalesInfoList", paramMap);
	}
	/*
	// 매출집계
	public void excelPaymentSalesInfoList_2(Map<String, Object> paramMap) throws Exception{
		list("paymentPurchase.excelPaymentSalesInfoList_2", paramMap);
	}
	*/

}
