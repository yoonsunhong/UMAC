package retail.product.reservation.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.business.callorder.service.BusinessCallOrderVO;
import retail.product.reservation.service.ChangeReservationPriceService;
import retail.product.reservation.service.ChangeReservationPriceVO;

@Service("ChangeReservationPriceService")
public class ChangeReservationPriceServiceImpl implements  ChangeReservationPriceService{
	
	@Autowired
	private ChangeReservationPriceDao crpDao;
	
	@Override
	@Transactional
	public void selectChangeReservationPrice(Map<String, Object> paramMap) throws Exception{
		crpDao.selectChangeReservationPrice(paramMap);
	}
	
	@Override
	@Transactional
	public void registChangeReservationPrice(Map<String, Object> paramMap) throws Exception{
		crpDao.registChangeReservationPrice(paramMap);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> excelChangeReservationPrice(Map<String, Object> paramMap) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행
		
		colName.add("점포코드");
		colName.add("점포명");
		colName.add("적용일자");
		colName.add("스캔코드");
		colName.add("상품코드");
		colName.add("상품명");
		//colName.add("VEN_CODE");
		colName.add("협력업체명");
		//colName.add("CLS_CODE");
		colName.add("소분류명");
		//colName.add("TAX_GB");
		colName.add("과세구분");
		colName.add("원가");
		colName.add("부가세");
		colName.add("매가");
		colName.add("변경원가");
		colName.add("변경부가세");
		colName.add("변경매가");
		//colName.add("IEMP_NO");
		colName.add("등록자");
		colName.add("등록일자");
		//colName.add("UEMP_NO");
		colName.add("수정자");
		colName.add("수정일자");

		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
		crpDao.selectChangeReservationPrice(paramMap);
		
		List<ChangeReservationPriceVO> RC = (List<ChangeReservationPriceVO>) paramMap.get("CUR");
		
		if (RC != null && RC.size() > 0) {
			
			int dataLength = Math.round(RC.size());
			
			for(int i=0; i < dataLength ; i++){
				
				colValue = new ArrayList<String>();
				
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("APPL_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SCAN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ITM_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("VEN_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CLS_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CLS_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("TAX_GB")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("TAX_GB_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("WVAT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CHG_WPRC")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CHG_WVAT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CHG_SPRC")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IEMP_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IEMP_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IDATE")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("UEMP_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("UEMP_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("UDATE")));
				
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
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			colValue.add("");
			//colValue.add("");
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
		map.put("excelname", "예약매가변경엑셀데이터_"+strToday );  // 엑셀파일명
		//map.put("colColor", "5,8,9");			    	// 색 칠할 컬럼인덱스 . 0 부터 시작
		
		return map;
	}
	
	@Override 
	public List<Map<String, Object>> changeReserExcel(  Map<String, Object> param) throws Exception { 
		return crpDao.changeReserExcel(param);
	}
	
	
/*	@Override
	public Map<String, Object> changeReserExcel_map(Map<String, Object> params) throws Exception {
		return crpDao.changeReserExcel_map(params);
	}*/
	
	@Override
	@Transactional
	public void changeReserExcel_map(Map<String, Object> result)throws Exception {
		crpDao.changeReserExcel_map(result);
	}

}
