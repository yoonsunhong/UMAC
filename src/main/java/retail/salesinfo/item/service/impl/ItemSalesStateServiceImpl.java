package retail.salesinfo.item.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.salesinfo.item.service.ItemSalesStateService;
import retail.wms.in.service.WmsInVO;

@Service("ItemSalesStateServiceImpl")
public class ItemSalesStateServiceImpl implements ItemSalesStateService{

	
	@Autowired
	private ItemSalesStateDao itemSalesStateDao; 
	
	@Override
	public Map<String, Object> itemSalesEventStateList(Map<String, Object> param) throws Exception {
		return itemSalesStateDao.itemSalesEventStateList(param);
	}
	
	@Override
	public Map<String, Object> itemSalesStateList(Map<String, Object> param) throws Exception {
		return itemSalesStateDao.itemSalesStateList(param);
	}
	
	@Override
	public Map<String, Object> itemSalesStateDetailList(Map<String, Object> param) throws Exception {
		return itemSalesStateDao.itemSalesStateDetailList(param);
	}
	
	@Override
	public Map<String, Object> itemSalesEventPopupList(Map<String, Object> param) throws Exception {
		return itemSalesStateDao.itemSalesEventPopupList(param);
	}
	
	@Override
	public List<Map<String, Object>>  deliverDayStateHeader(Map<String, Object> param) throws Exception {
		return itemSalesStateDao.deliverDayStateHeader(param);
	}
	@Override
	public List<Map<String, Object>>  deliverDayStateListCount(Map<String, Object> param) throws Exception {
		return itemSalesStateDao.deliverDayStateListCount(param);
	}
	@Override
	public List<Map<String, Object>>  deliverDayStateListSum(Map<String, Object> param) throws Exception {
		return itemSalesStateDao.deliverDayStateListSum(param);
	}
	
	@Override
	public List<Map<String, Object>>  itemSalesCustStateSelect(Map<String, Object> param) throws Exception {
		return itemSalesStateDao.itemSalesCustStateSelect(param);
	}

	@Override
	public Map<String, Object> commonSearchDownload(Map<String, Object> paramMap)throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("점포명");
		colName.add("스캔코드");
		colName.add("상품명");
		colName.add("규격");
		
		colName.add("수량");
		colName.add("평균단가");
		colName.add("매출합계");
		colName.add("공병금액");		
		colName.add("상품할인");
		
		colName.add("회원할인");
		colName.add("매출금액");
		colName.add("객수");
		colName.add("객단가");
				
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		itemSalesStateDao.commonSearchDownload(paramMap);
		
		
		List<WmsInVO> RETURN_CUR = (List<WmsInVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("STR_NAME")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SCAN_CODE")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("ITM_NAME")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("UNIT")));			
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_QTY")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_AVG")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_AMT")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("BOT_AMT")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("DC_AMT")));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("MBR_DC_AMT")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_TOTAL")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CNT")));			
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CNT_PRICE")));
				
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
			
			_map.put("time"+0, colValue);
		}
		
		// 데이터를 담는 부분
		map.put("sheetName", "Sheet1");  // 시트이름
		map.put("colName", colName);                 // 제목값
		map.put("colValue", _map);			    // 데이터
		map.put("excelname", "단품매출판매내역");  // 엑셀파일명		
			
		 // 담은 값을 Controller로 return
		return map;			
	}
}
