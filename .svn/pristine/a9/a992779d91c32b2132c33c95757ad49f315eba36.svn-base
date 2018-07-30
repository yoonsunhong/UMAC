package retail.payment.ledger.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 
 * @Class Name : PaymentLedgerDao.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.08           최초생성
 *
 * @author 오동근
 * @since 2017. 02. 08.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("PaymentLedgerDao")
public class PaymentLedgerDao extends EgovAbstractDAO{
	
	/**
	 * 지불주기, 차수에 맞는 날짜 값 return
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectPaySeqList(Map<String, Object> params) throws Exception{
		return (Map<String, Object>) select("paymentLedger.selectPaySeqList", params);
	}
	
	/**
	 * 조건에 맞는 협력업체 List
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectVencodeList(Map<String, Object> params) throws Exception{
		return (List<Map<String, Object>>) list("paymentLedger.selectVencodeList", params);
	}
	
	/**
	 * 매입 기초 데이터 List
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectPurchList(Map<String, Object> params) throws Exception{
		return (List<Map<String, Object>>) list("paymentLedger.selectPurchList", params);
	}
	
	/**
	 * 지불차수에 해당하는 협력업체 및 마지막 차수의 협력업체가 맞는지 CHECK return
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectPayNumCheck(Map<String, Object> params) throws Exception{
		return (Map<String, Object>) select("paymentLedger.selectPayNumCheck", params);
	}
	
	
	/**
	 * 장려금 제외상품 총 SUM
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectLinkCodeList(Map<String, Object> params) throws Exception{
		return (List<Map<String, Object>>) list("paymentLedger.selectLinkCodeList", params);
	}
	
	/**
	 * 매입구간에 해당하는 장려율 SELECT
	 * @param params
	 * @return
	 * @throws Exception
	 */
	/*
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectPayRate(Map<String, Object> params) throws Exception {
		return (Map<String, Object>) select("paymentLedger.selectPayRate", params);
	}
	*/
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectPayRate_2(Map<String, Object> params) throws Exception {
		return (Map<String, Object>) select("paymentLedger.selectPayRate_2", params);
	}
	
	/**
	 * 매입집계
	 * @param params
	 * @return
	 * @throws Exception
	 */
	/*
	public Map<String, Object> insertPayPurch(Map<String, Object> params) throws Exception {
		select("paymentLedger.insertPayPurch", params);
		return params;
	}
	*/
	public Map<String, Object> insertPayPurch_2(Map<String, Object> params) throws Exception {
		select("paymentLedger.insertPayPurch_2", params);
		return params;
	}
	
	/**
	 * 집계 전 대금지불 마감이 되었는지 CHECK(집계까지 끝난건 다시 집계불가)
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectPayCloseCheck(Map<String, Object> params) throws Exception{
		return (Map<String, Object>) select("paymentLedger.selectPayCloseCheck", params);
	}
	
	/**
	 * 집계 전 일 혹은 월마감이 되었는지 CHECK(집계날짜의 마지막날짜로 CHECK.)
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectPayJobCheck(Map<String, Object> params) throws Exception{
		return (Map<String, Object>) select("paymentLedger.selectPayJobCheck", params);
	}

	/**
	 * 매입 기초 데이터 List
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	/*
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectSaleList(Map<String, Object> params) throws Exception{
		return (List<Map<String, Object>>) list("paymentLedger.selectSaleList", params);
	}
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectSaleList_2(Map<String, Object> params) throws Exception{
		return (List<Map<String, Object>>) list("paymentLedger.selectSaleList_2", params);
	}
	*/
	
	/**
	 * 매출집계
	 * @param params
	 * @return
	 * @throws Exception
	 */
	/*
	public Map<String, Object> insertPaySale(Map<String, Object> params) throws Exception {
		select("paymentLedger.insertPaySale", params);
		return params;
	}
	*/
	public Map<String, Object> insertPaySale_2(Map<String, Object> params) throws Exception {
		select("paymentLedger.insertPaySale_2", params);
		return params;
	}
	
	/**
	 * 집계 완료 후 대금지불 마감관리 INSERT OR UPDATE
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updatePayLedgerClose(Map<String, Object> params) throws Exception {
		select("paymentLedger.updatePayLedgerClose", params);
		return params;
	}
	
	/**
	 * 해당 협력업체의 지불차수에 맞는 지불주기 select
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectPayCon(Map<String, Object> params) throws Exception {
		return (Map<String, Object>) select("paymentLedger.selectPayCon", params);
	}
	
	/**
	 * 매입, 매출집계 데이터  List
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectLedgerPurch(Map<String, Object> params) throws Exception{
		return (List<Map<String, Object>>) list("paymentLedger.selectLedgerPurch", params);
	}
	
	/**
	 * 기반영보류금액(전월) LIST
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectBefHoldAmt(Map<String, Object> params) throws Exception{
		return (List<Map<String, Object>>) list("paymentLedger.selectBefHoldAmt", params);
	}
	/**
	 * 원장생성중 기반영보류금액(전월) select 데이터중 하나를 가져와서 조회 후 없으면 기반영보류금액만 INSERT한다.(여기선 COUNT만 RETURN)
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectBefHoldCnt(Map<String, Object> params) throws Exception {
		return (Map<String, Object>) select("paymentLedger.selectBefHoldCnt", params);
	}
	/**
	 * 전월 기반영보류금액 당월로 INSERT
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> insertPayBefHoldAmt(Map<String, Object> params) throws Exception {
		select("paymentLedger.insertPayBefHoldAmt", params);
		return params;
	}
	
	/**
	 * 원장생성 INSERT OR UPDATE
	 * @param params
	 * @return
	 * @throws Exception
	 */
	/*
	public Map<String, Object> insertPayLedger(Map<String, Object> params) throws Exception {
		select("paymentLedger.insertPayLedger", params);
		return params;
	}
	*/
	public Map<String, Object> insertPayLedger_2(Map<String, Object> params) throws Exception {
		select("paymentLedger.insertPayLedger_2", params);
		return params;
	}
	
	/**
	 * 원장생성 집계 취소
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updatePayLedgerCancle(Map<String, Object> params) throws Exception {
		select("paymentLedger.updatePayLedgerCancle", params);
		return params;
	}
	
	public Map<String, Object> paymentLedgerInfo_PayList(Map<String, Object> params) throws Exception {
		select("paymentLedger.paymentLedgerInfo_PayList", params);
		return params;
	}

	// 매입집계 실행
	public Map<String, Object> paymentPurchResult(Map<String, Object> params) throws Exception {
		select("paymentLedger.paymentPurchResult", params);
		return params;
	}
	
	// 매출집계 실행
	public Map<String, Object> paymentSaleResult(Map<String, Object> params) throws Exception {
		select("paymentLedger.paymentSaleResult", params);
		return params;
	}
	
	// 원장생성 실행
	public Map<String, Object> paymentPefHoldAmtResult(Map<String, Object> params) throws Exception {
		select("paymentLedger.paymentPefHoldAmtResult", params);
		return params;
	}
	
}
