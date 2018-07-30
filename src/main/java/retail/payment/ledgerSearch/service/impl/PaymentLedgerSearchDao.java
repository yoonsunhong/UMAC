package retail.payment.ledgerSearch.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("PaymentLedgerSearchDao")
public class PaymentLedgerSearchDao extends EgovAbstractDAO {
	
	/**
	 * 거래선별 매입집계조회 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectPaymentLedgerPurch(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("paymentLedgerSearch.selectPaymentLedgerPurch", params);
	}
	
	/**
	 * 거래선별 매출집계조회 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectPaymentLedgerSales(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("paymentLedgerSearch.selectPaymentLedgerSales", params);
	}
	
	/**
	 * 거래선별 지불 예정조회 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectPaymentLedgerSearch(Map<String, Object> params) throws Exception {
		return (List<Map<String, Object>>) list("paymentLedgerSearch.selectPaymentLedgerSearch", params);
	}

}
