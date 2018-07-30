package retail.payment.purchase.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.payment.purchase.service.PaymentPurchaseService;
import retail.payment.purchase.service.impl.PaymentPurchaseDao;
import retail.payment.purchase.service.PaymentPurchaseService;
import retail.payment.purchase.service.PaymentPurchaseVO;
import retail.payment.purchase.service.PaymentSalesVO;

@Service("PaymentPurchaseServiceImpl")
public class PaymentPurchaseServiceImpl implements PaymentPurchaseService{
	
	@Autowired
	private PaymentPurchaseDao paymentPurchaseDao;

	/**
	 *거래선 매입조회 List
	 */
	public Map<String, Object> selectPaymentPurchase(Map<String, Object> params)	throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		int totCount = 0; // 건수합
		int totDecQty = 0; // 수량 합
		long totPurWprc = 0; // 매입원가 합
		long totPurWvat = 0; // 부가세 합
		//int totSum = 0; // 매입합계 합
		long totSum = 0; // 매입합계 합
		long totBotSum = 0; // 공병예수금 (공병단가 * 확정수량)
		//int totPay = 0; // 공병포함 원가 총합 
		long totPay = 0; // 공병포함 원가 총합 
		
		result = paymentPurchaseDao.selectPaymentPurchase(params);
		/*
		// 매입집계/거래건별
		if(params.get("P_LIMIT_LEVEL").equals("2"))
			result = paymentPurchaseDao.selectPaymentPurchase_2(params);
		else
			result = paymentPurchaseDao.selectPaymentPurchase(params);
		*/
			
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> resultList = (List<Map<String, Object>>) result.get("CUR2");
		if(resultList.size() != 0){
			for(Map<String, Object> data : resultList){
				//TOT_TAX_GB
				totCount += Integer.parseInt(data.get("TOT_TAX_COUNT").toString());
				totDecQty += Integer.parseInt(data.get("TOT_DEC_QTY").toString());
				totPurWprc += Long.parseLong(data.get("TOT_PUR_WPRC").toString());
				totPurWvat += Long.parseLong(data.get("TOT_PUR_WVAT").toString());
				//totSum += Integer.parseInt(data.get("TOT_SUM").toString());
				totSum += Long.parseLong(data.get("TOT_SUM").toString());
				totBotSum += Long.parseLong(data.get("TOT_BOT_SUM").toString());
				//totPay += Integer.parseInt(data.get("TOT_TAX_COUNT").toString());
				totPay += Long.parseLong(data.get("TOT_TAX_COUNT").toString());
				
			}
		}
		
		totPay = totSum + totBotSum;
		
		result.put("RESULT_COUNT", totCount);
		result.put("RESULT_DEC_QTY", totDecQty);
		result.put("RESULT_PUR_WPRC", totPurWprc);
		result.put("RESULT_PUR_WVAT", totPurWvat);
		result.put("RESULT_SUM", totSum);
		result.put("TOT_BOT_SUM", totBotSum);
		result.put("TOT_PAY", totPay);
		return result;
	}
	public Map<String, Object> selectPaymentPurchase_v2(Map<String, Object> params)	throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		int totCount = 0; // 건수합
		int totDecQty = 0; // 수량 합
		long totPurWprc = 0; // 매입원가 합
		long totPurWvat = 0; // 부가세 합
		//int totSum = 0; // 매입합계 합
		long totSum = 0; // 매입합계 합
		long totBotSum = 0; // 공병예수금 (공병단가 * 확정수량)
		//int totPay = 0; // 공병포함 원가 총합 
		long totPay = 0; // 공병포함 원가 총합 
		
		result = paymentPurchaseDao.selectPaymentPurchase_v2(params);

		@SuppressWarnings("unchecked")
		List<Map<String, Object>> resultList = (List<Map<String, Object>>) result.get("CUR2");
		if(resultList.size() != 0){
			for(Map<String, Object> data : resultList){
				//TOT_TAX_GB
				totCount += Integer.parseInt(data.get("TOT_TAX_COUNT").toString());
				totDecQty += Integer.parseInt(data.get("TOT_DEC_QTY").toString());
				totPurWprc += Long.parseLong(data.get("TOT_PUR_WPRC").toString());
				totPurWvat += Long.parseLong(data.get("TOT_PUR_WVAT").toString());
				//totSum += Integer.parseInt(data.get("TOT_SUM").toString());
				totSum += Long.parseLong(data.get("TOT_SUM").toString());
				totBotSum += Long.parseLong(data.get("TOT_BOT_SUM").toString());
				//totPay += Integer.parseInt(data.get("TOT_TAX_COUNT").toString());
				totPay += Long.parseLong(data.get("TOT_TAX_COUNT").toString());
				
			}
		}
		
		totPay = totSum + totBotSum;
		
		result.put("RESULT_COUNT", totCount);
		result.put("RESULT_DEC_QTY", totDecQty);
		result.put("RESULT_PUR_WPRC", totPurWprc);
		result.put("RESULT_PUR_WVAT", totPurWvat);
		result.put("RESULT_SUM", totSum);
		result.put("TOT_BOT_SUM", totBotSum);
		result.put("TOT_PAY", totPay);
		return result;
	}

	/**
	 *거래선별 매출(임대을)조회 List
	 */
	//public List<Map<String, Object>> selectPaymentSales(Map<String, Object> params)	throws Exception {
	public Map<String, Object> selectPaymentSales(Map<String, Object> params)	throws Exception {
		//return paymentPurchaseDao.selectPaymentSales(params);
		
		Map<String, Object> result = new HashMap<String, Object>();
		long totSaleAmt = 0;
		int totPrgtRate = 0;
		long totCmisAmt = 0;
		long totPayAmt = 0;
		result = paymentPurchaseDao.selectPaymentSales(params);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> resultList = (List<Map<String, Object>>) result.get("CUR2");
		if(resultList.size() != 0){
			for(Map<String, Object> data : resultList){
				//TOT_TAX_GB
				totSaleAmt += Long.parseLong(data.get("TOT_SALE_AMT").toString());
				totPrgtRate += Integer.parseInt(data.get("TOT_PRGT_RATE").toString());
				totCmisAmt += Long.parseLong(data.get("TOT_CMIS_AMT").toString());
				totPayAmt += Long.parseLong(data.get("TOT_PAY_AMT").toString());
				
			}
		}
		result.put("RESULT_SALE_AMT", totSaleAmt);
		result.put("RESULT_PRGT_RATE", totPrgtRate);
		result.put("RESULT_CMIS_AMT", totCmisAmt);
		result.put("RESULT_PAY_AMT", totPayAmt);
		return result;
		
		/*
		// 매출집계/거래건별
		if(params.get("P_LIMIT_LEVEL").equals("2"))
			return paymentPurchaseDao.selectPaymentSales_2(params);
		else
			return paymentPurchaseDao.selectPaymentSales(params);
		*/
	}
	
	/**
	 *취소구분 COMBOBOX
	 */
	public Map<String, Object> getPaymentCancelSelectBoxList(Map<String, Object> params)	throws Exception {
		return paymentPurchaseDao.getPaymentCancelSelectBoxList(params);
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> excelPaymentPurchaseInfoList(Map<String, Object> paramMap) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행
		
		colName.add("순번");
		colName.add("협력업체코드");
		colName.add("협력업체");
		colName.add("점포명");
		colName.add("거래구분");
		colName.add("전표일자"); //매입일자
		colName.add("상품코드");
		colName.add("스캔코드");
		colName.add("상품명");
		colName.add("과세구분");
		colName.add("매입수량");
		colName.add("매입원가");
		colName.add("부가세");
		colName.add("매입단가");
		colName.add("매입금액");
		colName.add("매가단가");
		colName.add("매가금액");
		colName.add("배송구분");
		colName.add("공병단가");
		colName.add("공병금액");
		colName.add("매입일자"); //확정일자
		colName.add("전표번호");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
		paymentPurchaseDao.excelPaymentPurchaseInfoList(paramMap);
		/*
		// 매입집계/거래건별
		if(paramMap.get("P_LIMIT_LEVEL").equals("2"))
			paymentPurchaseDao.excelPaymentPurchaseInfoList_2(paramMap);
		else
			paymentPurchaseDao.excelPaymentPurchaseInfoList(paramMap);
		*/
		
		List<PaymentPurchaseVO> RC = (List<PaymentPurchaseVO>) paramMap.get("CUR");
		
		if (RC != null && RC.size() > 0) {
			
			int dataLength = Math.round(RC.size());
			
			for(int i=0; i < dataLength ; i++){
				
				colValue = new ArrayList<String>();
				
				//colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("No")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("RNUM")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("GRE_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PUR_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("LINK_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("TAX_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("DEC_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PUR_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PUR_WVAT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PUR_WAMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PUR_WAMT2")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PUR_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PUR_SAMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ROUTE_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("BOT_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("BOT_SUM")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CFM_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SLIP_NO")));
				
				_map.put("time"+i, colValue);
				colValue = null;
				
			}
			
		}else{
			
			colValue = new ArrayList<String>();
			
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			
			_map.put("time"+0, colValue);
			
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	    Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime());
		map.put("sheetName", "Sheet1");  				// 시트이름
		map.put("colName", colName);                 	// 제목값
		map.put("colValue", _map);			    		// 데이터
		map.put("excelname", "거래선별매입조회엑셀데이터_"+strToday );  // 엑셀파일명
		//map.put("colColor", "5,8,9");			    	// 색 칠할 컬럼인덱스 . 0 부터 시작
		
		return map;
	}

	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> excelPaymentSalesInfoList(Map<String, Object> paramMap) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행
		
		//colName.add("순번");
		colName.add("점포명");
		colName.add("협력업체코드");
		colName.add("협력업체명");
		colName.add("매출일자");
		colName.add("상품코드");
		colName.add("스캔코드");
		colName.add("상품명");
		colName.add("매출구분"); //취소구분
		colName.add("매출금액");
		colName.add("수수료율");
		colName.add("수수료액");
		colName.add("지불금액");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
		// Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		paymentPurchaseDao.excelPaymentSalesInfoList(paramMap);
		/*
		// 매출집계/거래건별
		if(paramMap.get("P_LIMIT_LEVEL").equals("2"))
			paymentPurchaseDao.excelPaymentSalesInfoList_2(paramMap);
		else
			paymentPurchaseDao.excelPaymentSalesInfoList(paramMap);
		*/
		
		//List<PaymentPurchaseVO> RC = (List<PaymentPurchaseVO>) paramMap.get("CUR");
		List<PaymentSalesVO> RC = (List<PaymentSalesVO>) paramMap.get("CUR");
		
		if (RC != null && RC.size() > 0) {
			
			int dataLength = Math.round(RC.size());
			
			for(int i=0; i < dataLength ; i++){
				
				colValue = new ArrayList<String>();
				
				//colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("No")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SALE_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CANC_FLAG")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SALE_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PRGT_RATE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CMIS_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PAY_AMT")));

				_map.put("time"+i, colValue);
				colValue = null;
				
			}
			
		}else{
			
			colValue = new ArrayList<String>();
			
			//colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			
			_map.put("time"+0, colValue);
			
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	    Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime());
		map.put("sheetName", "Sheet1");  				// 시트이름
		map.put("colName", colName);                 	// 제목값
		map.put("colValue", _map);			    		// 데이터
		map.put("excelname", "거래선별매출조회엑셀데이터_"+strToday );  // 엑셀파일명
		//map.put("colColor", "5,8,9");			    	// 색 칠할 컬럼인덱스 . 0 부터 시작
		
		return map;
	}
	
}
