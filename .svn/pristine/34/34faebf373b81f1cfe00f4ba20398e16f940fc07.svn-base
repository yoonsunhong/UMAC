package retail.salesinfo.supply.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.salesinfo.supply.service.SupplySalesStateService;
import retail.wms.in.service.WmsInVO;

@Service("SupplySalesStateService")
public class SupplySalesStateServiceImpl implements SupplySalesStateService{

	
	@Autowired
	private SupplySalesStateDao supplySalesDao; 
	
	@Override
	public Map<String, Object> supplySalesStateList(Map<String, Object> param) throws Exception {
		return supplySalesDao.supplySalesStateList(param);
	}
	
	@Override
	public Map<String, Object> supplySalesStateDtList(Map<String, Object> param) throws Exception {
		return supplySalesDao.supplySalesStateDtList(param);
	}
	
	@Override
	public Map<String, Object> supplySalesStateListDownload(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("점포코드");
		colName.add("점포명");
		colName.add("협력업체코드");
		colName.add("협력업체명");		
		colName.add("스캔코드");
		colName.add("상품명");
		colName.add("수량");
		colName.add("매출원가금액");
		colName.add("매출합계");
		colName.add("공병금액");
		colName.add("상품할인");
		colName.add("회원할인");
		colName.add("매출금액");
		colName.add("이익액");
		colName.add("이익율(%)");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		supplySalesDao.supplySalesStateListDownload(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("VEN_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_QTY")));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_SAMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("BOT_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DC_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("MBR_DC_AMT")));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PROPIT_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PROPIT_RT")));				
				
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
			
			_map.put("time"+0, colValue);
		}
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  			// 시트이름
		map.put("colName", colName);                // 제목값
		map.put("colValue", _map);			    	// 데이터
		map.put("excelname", "협력업체매출현황");	// 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;		
	}
}
