package retail.stock.stockStatus.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.stock.stockStatus.service.StockStatusService;

/**
 * 
 * @Class Name : StockStatusServiceImpl.java
 * @Description : 현상품재고관리
 * @Modification Information
 * @
 * @  수정일                수정자                              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.06.05    최호정           최초생성
 *
 * @author 최호정
 * @since 2017. 06. 05.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("StockStatusService")
public class StockStatusServiceImpl implements StockStatusService {

    @Autowired
    private StockStatusDao stockStatusDao;

    private final Log log = LogFactory.getLog(this.getClass());

    @Override
    public List<Map<String, Object>> getStockStatusList(Map<String, Object> param) throws Exception {
        log.debug("param :"+param);
        return stockStatusDao.getStockStatus(param);
    }

    @SuppressWarnings("unchecked")
    @Override
    public Map<String, Object> stockStatusExcelDown(Map<String, Object> paramMap) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        List<String> colName = new ArrayList<String>();  //excel 제목행

        colName.add("No");
        colName.add("상품코드");
        colName.add("스캔코드");
        colName.add("상품명");
        colName.add("협력업체명");
        colName.add("점포명");
        colName.add("매출수량");
        colName.add("재고수량");
        colName.add("소분류");
        colName.add("소분류명");

        Map<String, Object> _map = new HashMap<String, Object>();
        List<String> colValue = null;  // excel 데이터 행

        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
        stockStatusDao.stockStatusExcelDown(paramMap);
/*
    private String CORP_CODE;
    private String ITM_CODE;
    private String SCAN_CODE;
    private String ITM_NAME;
    private String VEN_CODE;
    private String VEN_NAME;
    private String STR_CODE;
    private String STR_NAME;
    private String CLS_CODE;
    private String CLS_NAME;
    private String ITM_SALE_CNT;
    private String ITM_INV_CNT;
 */
        List<StockStatusVO> RETURN_CUR = (List<StockStatusVO>) paramMap.get("CUR");
        log.debug("RETURN_CUR SIZE:: " + RETURN_CUR.size());

        if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
            int dataLength = Math.round(RETURN_CUR.size());

            // 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
            for(int i = 0; i < dataLength; i++){
                colValue = new ArrayList<String>();
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("RNUM")));
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_CODE")));
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SCAN_CODE")));
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_NAME")));
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_SALE_CNT")));
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_INV_CNT")));
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CLS_CODE")));
                colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CLS_NAME")));
                _map.put("time"+i, colValue);
                colValue = null;
            }
            // 데이터를 담는 부분
            map.put("sheetName", "Sheet1");      // 시트이름
            map.put("colName",   colName);       // 제목값
            map.put("colValue",  _map);          // 데이터
            map.put("excelname", "현상품재고현황");  // 엑셀파일명
        }
        else{
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

            map.put("sheetName", "Sheet1");
            map.put("colName",   colName);
            map.put("colValue",  _map);
            map.put("excelname", "현상품재고현황");
        }

        // 담은 값을 Controller로 return
       return map;
    }

}
