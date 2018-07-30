package retail.payment.ledgerSearch.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.payment.ledgerSearch.service.PaymentLedgerSearchService;

@Service("PaymentLedgerSearchServiceImpl")
public class PaymentLedgerSearchServiceImpl implements PaymentLedgerSearchService{
	
	@Autowired
	private PaymentLedgerSearchDao paymentLedgerSearchDao;

	/**
	 * 거래선별 매입집계조회 List
	 */
	public List<Map<String, Object>> selectPaymentLedgerPurch(Map<String, Object> params) throws Exception {
		return paymentLedgerSearchDao.selectPaymentLedgerPurch(params);
	}

	/**
	 * 거래선별 매출집계조회 List
	 */
	public List<Map<String, Object>> selectPaymentLedgerSales(Map<String, Object> params) throws Exception {
		return paymentLedgerSearchDao.selectPaymentLedgerSales(params);
	}

	/**
	 * 거래선별 지불 예정조회 List
	 */
	public List<Map<String, Object>> selectPaymentLedgerSearch(Map<String, Object> params) throws Exception {
		return paymentLedgerSearchDao.selectPaymentLedgerSearch(params);
	}

}
