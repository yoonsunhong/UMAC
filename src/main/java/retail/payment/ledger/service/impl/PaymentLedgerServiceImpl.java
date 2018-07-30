package retail.payment.ledger.service.impl;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.common.service.CommService;
import retail.payment.ledger.service.PaymentLedgerService;

/**
 * 
 * @Class Name : PaymentLedgerServiceImpl.java
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
@Service("PaymentLedgerServiceImpl")
public class PaymentLedgerServiceImpl implements PaymentLedgerService{
	
	@Autowired
	private PaymentLedgerDao paymentLedgerDao;
	
	/** service */
	@Autowired 
	private CommService commService;
	
	/**
	 * 외상대금(회차별) 생성
	 */
	public Map<String, Object> paymentLedgerProcess(Map<String, Object> params)	throws Exception {
		Map<String, Object> resultParam = new HashMap<String, Object>() ;
		
		String dbPK = "Y";
		
		// ---- 차수의 시작,종료일 설정. (Start)
		params = searchDate(params);
		
		String pStartSearchDt = params.get("P_START_SEARCH_DT").toString();
		String pEndSearchDt = params.get("P_END_SEARCH_DT").toString();
		
		String jangType = params.get("P_JANG_TYPE").toString();
		
		String pSearchDt = (String) params.get("P_SEARCH_DT");
		
		String[] dateYM = pSearchDt.split("-");
		int dateYY = Integer.parseInt(dateYM[0]);
		int dateMM = Integer.parseInt(dateYM[1]);
		
		pSearchDt = pSearchDt.replace("-", "");
		//pSearchDt = params.get("P_PAY_YM").toString();
		// ---- 차수의 시작,종료일 설정. (End)
		
		System.out.println("@@PARAMS : " + params);
		
		
		// [ADD]
		// 이전 차수가 있어야 다음 차수 생성 가능 하도록..
		// 최초 차수의 경우 전월 차수 확인 여부는? 이럴 경우 신규는 전월이나 이전 차수가 없는 경우 발생.
		
		
		// ** PY_PAY_CLOSE테이블에서 해당 지불년월의 SELECT했을 때  ROW가 없거나 PUR_CLOSE, SALE_CLOSE, JANG_CLOSE 필드가 NULL일때 매입,매출 집계가 가능하다.
		if(Integer.parseInt(paymentLedgerDao.selectPayCloseCheck(params).get("CNT").toString()) != 0){
			System.out.println("@@값좀보자 : " + Integer.parseInt(paymentLedgerDao.selectPayCloseCheck(params).get("CNT").toString()) );
			resultParam.put("RETURN_CODE", "-3");
			resultParam.put("RETURN_MSG", "이미 집계가 완료되었습니다.");
			return resultParam;
		}
		
		// 'CD_JOB_CLOSE' 테이블 사용 안함.
		// ** CD_JOB_CLOSE테이블에서 해당 지불년월의 지불차수의 마지막 날로 PUR_CLOSE_DT, SALE_CLOSE_DT 필드를 SELECT했을 때  ROW가 없거나 해당 필드가 NULL이면 집계 불가.
		// 원장생성같은 경우는 PAY_CLOSE테이블에서 매입, 매출집계가 완료되었는지를 판단한다.
		/*
		if(Integer.parseInt(paymentLedgerDao.selectPayJobCheck(params).get("CNT").toString()) == 0){
			if(params.get("P_TYPE").equals("3")){
				resultParam.put("RETURN_CODE", "-4");
				resultParam.put("RETURN_MSG", "매입,매출 집계가 완료되어야 원장생성이 가능합니다.");
			}else{
				resultParam.put("RETURN_CODE", "-4");
				resultParam.put("RETURN_MSG", "마감 완료후에 집계가 가능합니다.");
			}
			return resultParam;
		}
		*/
		if(params.get("P_TYPE").equals("3")){
			if(Integer.parseInt(paymentLedgerDao.selectPayJobCheck(params).get("CNT").toString()) == 0){
				if(params.get("P_TYPE").equals("3")){
					resultParam.put("RETURN_CODE", "-4");
					resultParam.put("RETURN_MSG", "매입,매출 집계가 완료되어야 원장생성이 가능합니다.");
				}else{
					resultParam.put("RETURN_CODE", "-4");
					resultParam.put("RETURN_MSG", "마감 완료후에 집계가 가능합니다.");
				}
				return resultParam;
			}
		}
		
		String insertDataList = "";
		//String insertDataListCheck = "";
		
		// ################################
		// # 매입집계 start
		// ################################
		if(params.get("P_TYPE").equals("1")){
			
			// 매입집계 테이블에 INSERT할때 들어갈 시작, 종료일자
			params.put("P_PUR_STR_DT", pStartSearchDt);
			params.put("P_PUR_END_DT", pEndSearchDt);

			if(dbPK.equals("Y")) {

				//params.put("P_JANG_TYPE", jangType);
				System.out.println("@@PARAMS : " + params);
				
				//P_CORP_CODE, P_PAY_YM, P_TYPE, P_SEARCH_DT, P_START_SEARCH_DT, P_END_SEARCH_DT, P_PAY_SEQ, P_USER_ID, P_JANG_TYPE
				resultParam = paymentLedgerDao.paymentPurchResult(params);
			}

		// ################################
		// # 매출집계 start	
		// ################################
		}else if(params.get("P_TYPE").equals("2")){
			
			// 모든 차수 실행.
			// 차수가 없는 경우 '' 로 표기.
			resultParam = calSaleList(params, resultParam);
			
		// ################################
		// # 원장생성 Start
		// ################################
		}else if(params.get("P_TYPE").equals("3")){
			
			int beforeYY = 0;
			int beforeMM = 0;
			if(dateMM == 1){
				beforeYY = dateYY-1;
				beforeMM = 12;
			}else{
				beforeYY = dateYY;
				beforeMM = dateMM-1;
			}
			
			String startYear = String.valueOf(beforeYY);
			String startMonth = String.valueOf(beforeMM);
			
			if(startMonth.length() == 1){
				startMonth = "0" + startMonth;
			}
			params.put("P_BEFORE_SEARCH_DT", startYear + startMonth);
			
			Calendar cal = Calendar.getInstance();
			int nowDay = cal.get(Calendar.DATE);
			int nowYY = cal.get(Calendar.YEAR);
			int nowMM = cal.get(Calendar.MONTH)+1;
			String nowYYstr = String.valueOf(nowYY);
			String nowMMstr = String.valueOf(nowMM);
			if(nowMMstr.length() == 1){
				nowMMstr = "0" + nowMMstr;
			}
			// 지불예정일에 들어갈 실행시 년월날짜
			String nowYm = nowYYstr + nowMMstr;
			System.out.println("@@오늘날짜 : " + nowDay);
			System.out.println("@@오늘달 : " + nowMM);
			
			
			// [ADD]
			// 매입/매출 집계가 있는지 확인
			// PY_PURCH_MD & PY_SPECIAL_SALE 또는 PY_PAY_CLOSE
			
			
			if(dbPK.equals("Y")) {
				//params.put("P_JANG_TYPE", jangType);
				System.out.println("@@PARAMS : " + params);
				
				//P_CORP_CODE, P_PAY_YM, P_TYPE, P_SEARCH_DT, P_START_SEARCH_DT, P_END_SEARCH_DT, P_PAY_SEQ, P_USER_ID, P_JANG_TYPE
				resultParam = paymentLedgerDao.paymentPefHoldAmtResult(params);
			}
			
		}
		
		return resultParam;
	}
	
	// 차수의 시작,종료일 설정.
	private Map<String, Object> searchDate(Map<String, Object> params) throws Exception{
		// 지불차수에 맞는 조건에 넣을 일자를 가져온다.
		params.put("P_CD_CL", "PAY_SEQ");
		params.put("P_CD_ID", params.get("P_PAY_SEQ"));
		//System.out.println("@@PARAMS : " + params);
		
		Map<String,Object> paySeqParam = paymentLedgerDao.selectPaySeqList(params);
		int mgmtEntry1 = Integer.parseInt(paySeqParam.get("MGMT_ENTRY_1").toString());
		int mgmtEntry2 = Integer.parseInt(paySeqParam.get("MGMT_ENTRY_2").toString());
		// 지불차수의 날짜가 전월과 당월에 걸쳐있는 데이터는 장려율 계산시에 해당 날짜의 매입데이터 그대로 장려율 계산을 한다. (이때 jangType에 Y값을 넣어준다.)
		// 다른 보통의(ex1~31, 1~15, 1~31)등등의 지불차수를 가진 데이터는 당월 1~31일의 매입데이터를 가져와서 장려율 계산을 한다.
		String jangType = "N";
		

		String pSearchDt = (String) params.get("P_SEARCH_DT");
		String[] dateYM = pSearchDt.split("-");
		int dateYY = Integer.parseInt(dateYM[0]);
		int dateMM = Integer.parseInt(dateYM[1]);
		
		pSearchDt = pSearchDt.replace("-", "");
		params.put("P_PAY_YM", pSearchDt);
		
		String pStartSearchDt = ""; 
		String pEndSearchDt = "";
		String startDay = (String) paySeqParam.get("MGMT_ENTRY_1");
		String endDay = (String) paySeqParam.get("MGMT_ENTRY_2");
		
		if(startDay.length() == 1){
			startDay = "0" + startDay;
		}
		if(endDay.length() == 1){
			endDay = "0" + endDay;
		}
		// 지불차수가 31일 까지인 경우는 해당월의 마지막 일로 치환해서 넘긴다.
		if(endDay.equals("31")){
			DecimalFormat df = new DecimalFormat("00");
			Calendar cal = Calendar.getInstance();
			cal.set(dateYY, dateMM-1, 1);
			endDay = df.format(cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		}
		
		// 지불차수의 해당하는 날짜 종료일보다 시작일이 크면 전월 시작일부터 당월 종료일로 날짜 파라미터를 만든다.
		if(mgmtEntry1 > mgmtEntry2){
			jangType = "Y";
			int beforeYY = 0;
			int beforeMM = 0;
			if(dateMM == 1){
				beforeYY = dateYY-1;
				beforeMM = 12;
			}else{
				beforeYY = dateYY;
				beforeMM = dateMM-1;
			}
			
			String startYear = String.valueOf(beforeYY);
			String startMonth = String.valueOf(beforeMM);
			
			String endYear = String.valueOf(dateYY);
			String endMonth = String.valueOf(dateMM);
			
			if(startMonth.length() == 1){
				startMonth = "0" + startMonth;
			}
			if(endMonth.length() == 1){
				endMonth = "0" + endMonth;
			}
			
			pStartSearchDt = startYear + startMonth + startDay;
			pEndSearchDt = endYear + endMonth + endDay;
		}else{
			// 지불년월 + 지불차수에 해당하는 일자로 날짜 파라미터를 만든다.
			pStartSearchDt = pSearchDt + startDay;
			pEndSearchDt = pSearchDt + endDay;
		}
		
		params.put("P_JANG_TYPE", jangType);

		params.put("P_START_SEARCH_DT", pStartSearchDt);
		params.put("P_END_SEARCH_DT", pEndSearchDt);
		System.out.println("P_END_SEARCH_DT : " + pEndSearchDt);
		
		//System.out.println("@@PARAMS : " + params);
		
		return params;
	}
	
	// 매출집계 처리
	private Map<String, Object> calSaleList(Map<String, Object> params, Map<String, Object> resultParam) throws Exception {
		// 모든 차수 실행.
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", "U1");
		paramMap.put("P_CD_CL", "PAY_SEQ");
		paramMap.put("CUR", CUR);
		
		//P_CORP_CODE, P_PAY_YM, P_TYPE, P_SEARCH_DT, P_USER_ID
		resultParam = paymentLedgerDao.paymentSaleResult(params);
		
		return resultParam;
	}

	/**
	 * 원장생성 집계 취소
	 */
	public Map<String, Object> updatePaymentLedgerCancle(Map<String, Object> params) throws Exception {
		return paymentLedgerDao.updatePayLedgerCancle(params);
	}
	
	public Map<String, Object> paymentLedgerInfo_PayList(Map<String, Object> params) throws Exception {
		return paymentLedgerDao.paymentLedgerInfo_PayList(params);
	}
	
}
