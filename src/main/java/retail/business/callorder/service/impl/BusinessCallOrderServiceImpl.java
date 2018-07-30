package retail.business.callorder.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retail.business.callorder.service.BusinessCallOrderService;
import retail.business.callorder.service.BusinessCallOrderVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("BusinessCallOrderService")
public class BusinessCallOrderServiceImpl implements BusinessCallOrderService{
	
	@Autowired
	private BusinessCallOrderDao bcoDao;
	
	@Override
	@Transactional
	public void selectCallOrder(Map<String, Object> paramMap) throws Exception{
		bcoDao.selectCallOrder(paramMap);
	}
	
	@Override
	@Transactional
	public void registCallOrder(Map<String, Object> paramMap) throws Exception{
		bcoDao.registCallOrder(paramMap);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> excelCallOrder(Map<String, Object> paramMap) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행
		
		colName.add("점포코드");
		colName.add("점포명");
		colName.add("주문일자");
		colName.add("주문번호");
		colName.add("고객번호");
		colName.add("고객명");
		colName.add("대표자명");
		//colName.add("PAY_TYPE");
		colName.add("지불수단");
		colName.add("건수");
		colName.add("주문금액");
		colName.add("배달요청일시");
		//colName.add("ORD_STAT");
		colName.add("주문상태");
		//colName.add("SEND_EMP_NO");
		colName.add("배달사원");
		colName.add("접수일시");
		//colName.add("IEMP_NO");
		colName.add("접수자");
		colName.add("비고");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
		bcoDao.excelCallOrder(paramMap);
		
		List<BusinessCallOrderVO> RC = (List<BusinessCallOrderVO>) paramMap.get("CUR");
		
		if (RC != null && RC.size() > 0) {
			
			int dataLength = Math.round(RC.size());
			
			for(int i=0; i < dataLength ; i++){
				
				colValue = new ArrayList<String>();
				
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_CODE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORD_DT")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RC.get(i)).get("SLIP_NO")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RC.get(i)).get("CUST_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CUST_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("OWN_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PAY_METH")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PAY_METH_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORD_CNT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORD_TOT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("RESERVE_DT")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORD_STAT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORD_STAT_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SEND_EMP_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SEND_EMP_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IDATE")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IEMP_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IEMP_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("REMARK")));
				
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
			//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PAY_TYPE")));
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORD_STAT")));
			colValue.add("");
			//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SEND_EMP_NO")));
			colValue.add("");
			colValue.add("");
			//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IEMP_NO")));
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
		map.put("excelname", "주문서관리엑셀데이터_"+strToday );  // 엑셀파일명
		//map.put("colColor", "5,8,9");			    	// 색 칠할 컬럼인덱스 . 0 부터 시작
		
		return map;
	}
}
