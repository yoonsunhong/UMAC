package retail.business.orderdelivery.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.business.orderdelivery.service.BusinessOrderDeliveryService;
import retail.business.orderdelivery.service.BusinessOrderDeliveryVO;

@Service("BusinessOrderDeliveryService")
public class BusinessOrderDeliveryServiceImpl implements BusinessOrderDeliveryService{
	
	@Autowired
	private BusinessOrderDeliveryDao bodDao;
	
	@Override
	@Transactional
	public void selectCallOrderPay(Map<String, Object> paramMap) throws Exception{
		bodDao.selectCallOrderPay(paramMap);
	}
	
	@Override
	@Transactional
	public void selectCallOrderPayRegist(Map<String, Object> paramMap) throws Exception{
		bodDao.selectCallOrderPayRegist(paramMap);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> excelCallOrderPay(Map<String, Object> paramMap) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행
		
		colName.add("매출일자");
		//colName.add("STR_CODE");
		colName.add("점포명");
		colName.add("주문번호");
		colName.add("POS");
		colName.add("영수증번호");
		//colName.add("EMP_NO");
		colName.add("배달사원명");
		//colName.add("PAY_TYPE");
		colName.add("결제방법");
		colName.add("결제금액");
		colName.add("고객명");
		colName.add("고객번호");
		//colName.add("ORD_STAT");
		colName.add("주문상태");
		colName.add("등록일자");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
		bodDao.excelCallOrderPay(paramMap);
		
		List<BusinessOrderDeliveryVO> RC = (List<BusinessOrderDeliveryVO>) paramMap.get("CUR");

		if (RC != null && RC.size() > 0) {
			
			int dataLength = Math.round(RC.size());
			
			for(int i=0; i < dataLength ; i++){
				
				colValue = new ArrayList<String>();
				
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("SALE_DT")));
				//colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_CODE")));
				colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_NAME")));
				colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("SLIP_NO")));
				colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("POS_NO")));
				colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("TRXN_NO")));
				//colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("EMP_NO")));
				colValue.add("'"+String.valueOf(((Map<String, Object>) RC.get(i)).get("EMP_NAME")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PAY_METH")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PAY_METH_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("PAY_AMT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CUST_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CUST_NO")));
				//colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORD_STAT")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("ORD_STAT_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IDATE")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
		}else{
			
			colValue = new ArrayList<String>();
		
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			//colValue.add("");
			colValue.add("");
			colValue.add("");
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
		map.put("excelname", "주문배달관리엑셀데이터_"+strToday );  // 엑셀파일명
		//map.put("colColor", "5,8,9");			    	// 색 칠할 컬럼인덱스 . 0 부터 시작
		
		return map;
	}
	
	@Override
	@Transactional
	public void selectCallOrderDetail(Map<String, Object> paramMap) throws Exception{
		bodDao.selectCallOrderDetail(paramMap);
	}
	
	@Override
	public List<Map<String, Object>> getOrderEmp(Map<String, Object> param) throws Exception {
		return bodDao.getOrderEmp(param);
	}	
}
