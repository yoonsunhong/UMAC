package retail.salesanal.report.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.salesanal.report.service.SalesAnalReportService;
import retail.salesinfo.report.service.impl.SalesInfoReportDao;
import retail.wms.in.service.WmsInVO;
import retail.salesanal.report.service.SalesAnalReportVO;

@Service("SalesAnalReportService")
public class SalesAnalReportServiceImpl implements SalesAnalReportService{
	@Autowired
	private SalesAnalReportDao salesAnalReportDao; 

	@Override
	public Map<String, Object> salesAnalReportWorstList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportWorstList(param);
	}

	@Override
	public Map<String, Object> salesAnalReportSingleList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportSingleList(param);
	}

	@Override
	public List<Map<String, Object>> salesAnalReportGoalList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportGoalList(param);
	}

	@Override
	public List<Map<String, Object>> salesAnalReportGoalIList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportGoalIList(param);
	}
	
	
	@Override
	public List<Map<String, Object>> salesAnalReportRotationList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportRotationList(param);
	}
	
	@Override
	public List<Map<String, Object>> salesAnalReportRotationIList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportRotationIList(param);
	}	

	@Override
	public Map<String, Object> salesAnalReportAbcList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportAbcList(param);
	}

	@Override
	public Map<String, Object> salesAnalReportNoYieldList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportNoYieldList(param);
	}

	@Override
	public Map<String, Object> salesAnalReportNoYieldPurchaseList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportNoYieldPurchaseList(param);
	}

	@Override
	public List<Map<String, Object>> salesAnalReportStockList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportStockList(param);
	}
	
	@Override
	public List<Map<String, Object>> salesAnalReportStockDList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportStockDList(param);
	}	

	@Override
	public List<Map<String, Object>> salesAnalReportOrderList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportOrderList(param);
	}

	@Override
	public Map<String, Object> salesAnalReportCashList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportCashList(param);
	}

	@Override
	public List<Map<String, Object>> salesAnalReportCardList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportCardList(param);
	}
	
	@Override
	public List<Map<String, Object>> salesAnalReportCardDList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportCardDList(param);
	}	

	@Override
	public List<Map<String, Object>> salesAnalReportCardTList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportCardTList(param);
	}	
	
	@Override
	public Map<String, Object> salesAnalReportTrList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportTrList(param);
	}

	@Override
	public List<Map<String, Object>> salesAnalReportTrDList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportTrDList(param);
	}
	
	@Override
	public List<Map<String, Object>> salesAnalReportOrderBsnEmplList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportOrderBsnEmplList(param);
	}

	@Override
	public List<Map<String, Object>> salesAnalReportOrderUserList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportOrderUserList(param);
	}

	@Override
	public Map<String, Object> salesAnalReportNoYieldPurchaseUpdate(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportNoYieldPurchaseUpdate(param);
	}
	
	@Override
	@Transactional
	public void selectSalesAnalReportTrPay(Map<String, Object> paramMap) throws Exception{
		salesAnalReportDao.selectSalesAnalReportTrPay(paramMap);
	}

	@Override
	public Map<String, Object> salesAnalReportNoYieldPurchaseExcelDownload(Map<String, Object> paramMap) throws Exception {
		//return salesAnalReportDao.salesAnalReportNoYieldPurchaseList(paramMap);
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("번호");
		colName.add("점포명");
		colName.add("상품코드");
		colName.add("상품명");
		colName.add("협력업체명");
		colName.add("대");
		colName.add("중");
		colName.add("소");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		salesAnalReportDao.salesAnalReportNoYieldPurchaseExcelDownload(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("RNUM")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_SHORT_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("LRG_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("MID_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CLS_NAME")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
		}else{
			//널처리
			colValue = new ArrayList<String>();
			
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
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  // 시트이름
		map.put("colName", colName);                 // 제목값
		map.put("colValue", _map);			    // 데이터
		map.put("excelname", "무실적(매입/대입)현황");  // 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;		
	}

	@Override
	public Map<String, Object> salesAnalReportSingleExcelDownload(Map<String, Object> paramMap) throws Exception {
		//return salesAnalReportDao.salesAnalReportNoYieldPurchaseList(paramMap);
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("점포명");
		colName.add("상품코드");
		colName.add("상품명");
		colName.add("협력업체명");
		colName.add("판매수량");
		colName.add("원가금액");
		colName.add("판매금액");
		colName.add("판매이익");
		colName.add("이익율");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		salesAnalReportDao.salesAnalReportSingleExcelDownload(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_SHORT_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_WAMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_AMT_WAMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_AMT_WAMT_PER")));
			
				_map.put("time"+i, colValue);
				colValue = null;
			}
		}else{
			//널처리
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
			
			_map.put("time"+0, colValue);
		}
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  // 시트이름
		map.put("colName", colName);                 // 제목값
		map.put("colValue", _map);			    // 데이터
		map.put("excelname", "단품별손익현황");  // 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;		
	}

	@Override
	public Map<String, Object> salesAnalReportNoYieldExcelDownload(Map<String, Object> paramMap) throws Exception {
		//return salesAnalReportDao.salesAnalReportNoYieldPurchaseList(paramMap);
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("번호");
		colName.add("점포명");
		colName.add("상품코드");
		colName.add("상품명");
		colName.add("협력업체명");
		colName.add("대");
		colName.add("중");
		colName.add("소");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		salesAnalReportDao.salesAnalReportNoYieldExcelDownload(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("RNUM")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_SHORT_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("LRG_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("MID_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CLS_NAME")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
		}else{
			//널처리
			colValue = new ArrayList<String>();
			
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
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  // 시트이름
		map.put("colName", colName);                 // 제목값
		map.put("colValue", _map);			    // 데이터
		map.put("excelname", "무실적(매출)현황");  // 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;				
	}

	@Override
	public Map<String, Object> salesAnalReportAbcDownload(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("점포명");		
		colName.add("스캔코드");
		colName.add("상품명");
		colName.add("협력업체명");
		colName.add("매출수량");
		colName.add("매출원가");
		colName.add("매출금액");
		colName.add("매출이익");
		colName.add("이익율(%)");
		colName.add("구성비(%)");
		
		colName.add("누적구성비(%)");
		colName.add("ABC그룹");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		salesAnalReportDao.salesAnalReportAbcDownload(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_SHORT_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_QTY")));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_WAMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_PROFIT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PROFIT_PER")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("COMPOSITION_PER")));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("COMPOSITION_ACCUMUL_PER")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ABC_GROUP")));
											
				_map.put("time"+i, colValue);
				colValue = null;
			}
		}else{
			//널처리
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
			
			
			_map.put("time"+0, colValue);
		}
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  // 시트이름
		map.put("colName", colName);                 // 제목값
		map.put("colValue", _map);			    // 데이터
		map.put("excelname", "상품ABC분석");  // 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;
	}

	@Override
	public Map<String, Object> salesAnalReportCashListExcelDownload(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("점포명");
		colName.add("매출일자");		
		colName.add("pos");
		colName.add("거래번호");
		colName.add("매출구분");
		colName.add("인증번호");
		colName.add("발행금액");
		colName.add("고객번호");
		colName.add("고객명");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		salesAnalReportDao.salesAnalReportCashListExcelDownload(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("POS_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("TRXN_NO")));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CANC_FLAG")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CASH_COMP_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CASH_AMOUNT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CUST_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CUST_NAME")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
		}else{
			//널처리
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
			
			_map.put("time"+0, colValue);
		}
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  // 시트이름
		map.put("colName", colName);                 // 제목값
		map.put("colValue", _map);			    // 데이터
		map.put("excelname", "현금영수증적립내역");  // 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;		
	}

	@Override
	public List<Map<String, Object>> salesAnalReportClStoreList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportClStoreList(param);
	}

	@Override
	public List<Map<String, Object>> salesAnalReportInvntrySttusList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportInvntrySttusList(param);
	}
	
	@Override
	public Map<String, Object> salesAnalReportInvntrySttusListExcel(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("년월");
		colName.add("점코드");
		colName.add("거래선코드");
		colName.add("거래선명");
		colName.add("대분류");

		colName.add("대분류명");
		colName.add("중분류");
		colName.add("중분류명");
		colName.add("소분류");
		colName.add("소분류명");

		colName.add("상품코드");
		colName.add("스캔코드");
		colName.add("상품명");
		colName.add("기초원가");
		colName.add("기초매가");

		colName.add("기초수량");
		colName.add("매입원가");
		colName.add("매입매가");
		colName.add("매입수량");
		colName.add("대입원가");

		colName.add("대입매가");
		colName.add("대입수량");
		colName.add("반품원가");
		colName.add("반품매가");
		colName.add("반품수량");
		
		colName.add("대출원가");
		colName.add("대출매가");
		colName.add("대출수량");
		colName.add("부가세 포함 매출금액");
		colName.add("매출원가");

		colName.add("매출매가");
		colName.add("매출수량");
		colName.add("차기이월재고원가");
		colName.add("차기이월말매가");
		colName.add("매익율");

		colName.add("매출이익");
		colName.add("재고수량");
		colName.add("실사확정수량");
		colName.add("차기이월수량");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		salesAnalReportDao.salesAnalReportInvntrySttusListExcel(paramMap);
		
		List<SalesAnalReportVO> RETURN_CUR = (List<SalesAnalReportVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("INV_MT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("LRG_CODE")));

				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("LRG_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("MID_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("MID_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CLS_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CLS_NAME")));

				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("BASE_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("BASE_SPRC")));

				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("BASE_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NET_PUR_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DIN_WPRC")));

				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NET_DIN_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DIN_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("RTN_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NET_RTN_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("RTN_QTY")));

				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DOUT_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NET_DOUT_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DOUT_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NET_SALE_WPRC")));

				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NET_SALE_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NEXT_BASE_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NET_NEXT_BASE_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PROFIT_RATE")));

				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PROFIT_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("INV_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SIL_DEC_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("NEXT_BASE_QTY")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
		}else{
			//널처리
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
		
		Date d = new Date();
        String s = d.toString();
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		
		// 데이터를 담는 부분
		map.put("sheetName"	, "Sheet1");  				// 시트이름
		map.put("colName"	, colName);             	// 제목값
		map.put("colValue"	, _map);			    	// 데이터
		map.put("excelname"	, "재고결과현황(분류)_" + sdf.format(d));  	// 엑셀파일명
			
		//담은 값을 Controller로 return
		return map;
	}
	
	
	
	@Override
	public List<Map<String, Object>> salesAnalReportInvntrySttusListAccount(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalReportInvntrySttusListAccount(param);
	}

	@Override
	public Map<String, Object> salesAnalReportTrListDownload(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("점포명");
		colName.add("매출일자");		
		colName.add("판매시간");
		colName.add("POS");
		colName.add("거래번호");
		
		colName.add("거래형태");
		colName.add("취소구분");
		colName.add("계산원");
		colName.add("회원카드");
		colName.add("매출합계");
		
		colName.add("행사할인");		
		colName.add("특가할인");
		colName.add("회원할인");
		colName.add("매출금액");
		
		colName.add("외상매출");		
		colName.add("현금");
		colName.add("신용카드");
		colName.add("포인트");
		colName.add("COD발생");		
		colName.add("현금승인");
		colName.add("원거래번호");
		colName.add("포인트점수");
		
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		salesAnalReportDao.salesAnalReportTrListDownload(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("POS_TIMES")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("POS_NO")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("TRXN_NO")));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("GRE_TYPE_NM")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CANC_FLAG_NM")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("EMP_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("MBR_CARD_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_AMT")));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DC_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SPECIAL_DC_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("MBR_DC_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_AMOUNT")));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PAY_AMT_04")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PAY_AMT_01")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PAY_AMT_03")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PAY_AMT_18")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PAY_AMT_34")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("TRXN_NO_OLD")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_POINT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CASH_AMOUNT")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
		}else{
			//널처리
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
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  // 시트이름
		map.put("colName", colName);                 // 제목값
		map.put("colValue", _map);			    // 데이터
		map.put("excelname", "매출정보조회");  // 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;		
	}


	@Override
	public List<Map<String, Object>> salesAnalProductList(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalProductList(param);
	}
	
	@Override
	public List<Map<String, Object>> salesAnalProductList_kungri(Map<String, Object> param) throws Exception {
		return salesAnalReportDao.salesAnalProductList_kungri(param);
	}

	
	@Override
	public Map<String, Object> salesAnalReportTaxHistoryList(Map<String, Object> params) throws Exception {
		return salesAnalReportDao.salesAnalReportTaxHistoryList(params);
	}

	
	/*@Override
	public Map<String, Object> salesAnalReportTaxHistoryListExcel(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("점포명");
		colName.add("매출일자");		
		colName.add("면세금액");
		colName.add("과세금액");
		colName.add("부가세액");
		
		colName.add("공병금액");
		colName.add("소모품");
		colName.add("전체합계");
		
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		salesAnalReportDao.salesAnalReportTaxHistoryList(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_DT")));
				
				
				
				//System.out.println("i : " + String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")) + i);
				//System.out.println("i+1 : " + String.valueOf(((Map<String, Object>) RETURN_CUR.get(i+1)).get("STR_NAME")) + i);
				if((i+1) != dataLength){
					if(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")) != String.valueOf(((Map<String, Object>) RETURN_CUR.get(i+1)).get("STR_NAME"))){
						_map.put("time"+i, colValue);
						colValue.add("소계");
					}
				}
				_map.put("time"+i, colValue);
				
				colValue = null;
			}
		}else{
			//널처리
			colValue = new ArrayList<String>();
			
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
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  // 시트이름
		map.put("colName", colName);                 // 제목값
		map.put("colValue", _map);			    // 데이터
		map.put("excelname", " 면과세매출내역");  // 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;		
	}*/
	
	@Override
	public List<Map<String, Object>> salesAnalReportTaxHistoryListExcel(Map<String, Object> params) throws Exception {
		return salesAnalReportDao.salesAnalReportTaxHistoryListExcel(params);
	}
}
