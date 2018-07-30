package retail.member.receivables.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.member.receivables.service.CustReceivablesLedgerService;

@Service("CustReceivablesLedgerService")
public class CustReceivablesLedgerServiceImpl implements CustReceivablesLedgerService {
	
	@Autowired
	CustReceivablesLedgerDao cRLDao;
	
	/**
	 * 고객미수원장 조회(HDR)
	 */
	public List<Map<String, Object>>  custReceivablesLedgerHdrList(Map<String, Object> param) throws Exception {
		return cRLDao.custReceivablesLedgerHdrList(param);
	}
	/**
	 * 고객미수원장 조회(DTL)
	 */
	public List<Map<String, Object>>  custReceivablesLedgerDtlList(Map<String, Object> param) throws Exception {
		return cRLDao.custReceivablesLedgerDtlList(param);
	}
	/**
	 * 고객미수원장 조회(팝업:외상매출발생)
	 */
	public List<Map<String, Object>>  custReceivablesLedgerSalesPop(Map<String, Object> param) throws Exception {
		return cRLDao.custReceivablesLedgerSalesPop(param);
	}
	/**
	 * 고객미수원장 조회(팝업:외상매출입금)
	 */
	public List<Map<String, Object>>  custReceivablesLedgerDpotPop(Map<String, Object> param) throws Exception {
		return cRLDao.custReceivablesLedgerDpotPop(param);
	}
}
