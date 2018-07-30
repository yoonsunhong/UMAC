package retail.business.credit.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import net.winis.common.shared.model.WisModelData;

@SuppressWarnings("unchecked")
@Repository("BusinessCreditDao")
public class BusinessCreditDao extends EgovAbstractDAO{
	
	/**
	 * 외상매출내역조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCredit(Map<String, Object> paramMap) throws Exception{
		list("businessCredit.selectBusinessCredit", paramMap);
	}
	
	/**
	 * 외상매출 입금등록
	 * @param paramMap
	 * @throws Exception
	 */
	public void registBusinessCredit(Map<String, Object> paramMap) throws Exception{
		update("businessCredit.registBusinessCredit", paramMap);
	}
	
	/**
	 * 외상매출 입금내역조회(상세)
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCreditLedger(Map<String, Object> paramMap) throws Exception{
		list("businessCredit.selectBusinessCreditLedger", paramMap);
	}
	
	/**
	 * 외상매출 입금내역 조회(입금)
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCreditSlip(Map<String, Object> paramMap) throws Exception{
		list("businessCredit.selectBusinessCreditSlip", paramMap);
	}
	
	public void selectBusinessCreditDetail(Map<String, Object> paramMap) throws Exception{
		list("businessCredit.selectBusinessCreditDetail", paramMap);
	}
	
	/**
	 * 외상매출 선입금 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCreditOverDpot(Map<String, Object> paramMap) throws Exception{
		list("businessCredit.selectBusinessCreditOverDpot", paramMap);
	}
	
	/**
	 * 외상매출내역조회(점별)
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCreditStore(Map<String, Object> paramMap) throws Exception{
		list("businessCredit.selectBusinessCreditStore", paramMap);
	}
	
	public void selectBusinessCreditToday(Map<String, Object> paramMap) throws Exception{
		list("businessCredit.selectBusinessCreditToday", paramMap);
	}
	
	/**
	 *  카드프리픽스 유효성검사
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCreditCard(Map<String, Object> paramMap) throws Exception{
		list("businessCredit.selectBusinessCreditCard", paramMap);
	}
	
	
	/**
	 * 일자변경 유효성검사
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCreditEditAvailable(Map<String, Object> paramMap) throws Exception{
		list("businessCredit.selectBusinessCreditEditAvailable", paramMap);
	}
	
	
	/**
	 * 일자변경
	 * @param paramMap
	 * @throws Exception
	 */
	public void updateBusinessCreditEditSlip(Map<String, Object> paramMap) throws Exception{
		update("businessCredit.updateBusinessCreditEditSlip", paramMap);
	}
	
	
	/**
	 * 외상매출입금관리 강제 외상 생성
	 * @param paramMap
	 * @throws Exception
	 */
	public void insertBusinessCreditAccount(Map<String, Object> paramMap) throws Exception{
		update("businessCredit.insertBusinessCreditAccount", paramMap);
	}
	
}
