package retail.business.credit.service;

import java.util.Map;

public interface BusinessCreditService {
	
	/**
	 * 외상매출내역 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCredit(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 외상매출 입금등록
	 * @param paramMap
	 * @throws Exception
	 */
	void registBusinessCredit(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 외상매출 입금 내역 조회(입금기준)
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCreditLedger(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 외상매출 입금 내역 조회(전표기준)
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCreditSlip(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 외상매출 입금 내역 조회(상세 전표)
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCreditDetail(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 외상매출 선입금 내역조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCreditOverDpot(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 외상매출내역 조회 (점별)
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCreditStore(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 외상매출내역 당일 입금 내역 조회
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCreditToday(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 카드프리픽스 유효성검사
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCreditCard(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 일자변경 유효성검사
	 * @param paramMap
	 * @throws Exception
	 */
	void selectBusinessCreditEditAvailable(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 입금전표 수정
	 * @param paramMap
	 * @throws Exception
	 */
	void updateBusinessCreditEditSlip(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * 외상매출 강제 생성
	 * @param paramMap
	 * @throws Exception
	 */
	void insertBusinessCreditAccount(Map<String, Object> paramMap) throws Exception;
}

