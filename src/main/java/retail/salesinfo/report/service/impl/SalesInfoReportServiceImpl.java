package retail.salesinfo.report.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.salesinfo.report.service.SalesInfoReportService;
import retail.wms.in.service.WmsInVO;

@Service("SalesInfoReportPromptService")
public class SalesInfoReportServiceImpl implements SalesInfoReportService{
	@Autowired
	private SalesInfoReportDao salesInfoReportPromptDao; 
	
	@Override
	public List<Map<String, Object>> salesInfoReportPromptList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportPromptList(param);
	}
	
	@Override
	public List<Map<String, Object>> salesInfoReportPromptSalesList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportPromptSalesList(param);
	}	

	@Override
	public List<Map<String, Object>> salesInfoReportYieldList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportYieldList(param);
	}
	
	@Override
	public List<Map<String, Object>> salesInfoReportYieldDetailList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportYieldDetailList(param);
	}	

	@Override
	public List<Map<String, Object>> salesInfoReportTermList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportTermList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportTermDetailList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportTermDetailList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportMonthList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportMonthList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportMonthDetailList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportMonthDetailList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportPaymentList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportPaymentList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportPaymentDetailList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportPaymentDetailList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportLeaseList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportLeaseList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportRcvPayDateList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportRcvPayDateList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportRcvPayDateDetailList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportRcvPayDateDetailList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportRcvPayMonthList(Map<String, Object> param) throws Exception {		
		return salesInfoReportPromptDao.salesInfoReportRcvPayMonthList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportRcvPayMonthDetailList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportRcvPayMonthDetailList(param);
	}

	@Override
	public Map<String, Object> salesInfoReportRcvPayMonthBatch(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportRcvPayMonthBatch(param);
	}

	@Override
	public Map<String, Object> salesInfoReportGISList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportGISList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportDlvrList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportDlvrList(param);
	}
	
	@Override
	public List<Map<String, Object>> salesInfoReportvrList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportvrList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportDlvrDList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportDlvrDList(param);
	}

	@Override
	public List<Map<String, Object>> salesInfoReportEGLList(Map<String, Object> param) throws Exception {
		return salesInfoReportPromptDao.salesInfoReportEGLList(param);
	}

	@Override
	public Map<String, Object> salesInfoReportGISDownload(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("스캔코드");
		colName.add("상품명");
		colName.add("재고일자");
		colName.add("전일재고수량");
		colName.add("매입수량");
		colName.add("매입원가");
		colName.add("반품수량");
		colName.add("반품원가");
		colName.add("매출수량");
		colName.add("매출매가");
		colName.add("대입수량");
		colName.add("대입원가");
		colName.add("대출수량");
		colName.add("대출원가");
		colName.add("재고조정수량");
		colName.add("재고조정원가");
		colName.add("기말재고수량");
		colName.add("당일재고금액");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		salesInfoReportPromptDao.salesInfoReportGISDownload(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_SHORT_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("INV_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("BASE_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PUR_WAMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("RTN_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("RTN_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DIN_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DIN_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DOUT_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DOUT_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("INV_ADJ_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("INV_ADJ_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("INV_END_QTY")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("INV_END_WAMT")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
		}else{
			//널처리
			colValue = new ArrayList<String>();
			
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			colName.add("");
			
			_map.put("time"+0, colValue);
		}
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  // 시트이름
		map.put("colName", colName);                 // 제목값
		map.put("colValue", _map);			    // 데이터
		map.put("excelname", "단품별재고이력현황");  // 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;		
	}

	@Override
	public List<Map<String, Object>> salesInfoReportNewsFlashList(Map<String, Object> param) throws Exception {
		// TODO Auto-generated method stub
		return salesInfoReportPromptDao.salesInfoReportNewsFlashList(param);
	}

}
