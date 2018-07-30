package retail.member.point.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.member.point.service.MemberPointService;
import retail.member.point.service.MemberPointServiceVO;
import retail.wms.out.wmsOutReport.service.WmsOutVO;

/**
 * 
 * @Class Name : MemberPointServiceImpl.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.26           최초생성
 *
 * @author 오동근
 * @since 2016. 12. 26.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("MemberPointService")
public class MemberPointServiceImpl implements MemberPointService {

	@Autowired
	private MemberPointDao memberPointDao;
	
	/**
	 * 포인트 임의관리 회원포인트 및 임의등록현황 List
	 */
	public Map<String, Object> selectMemberPoint(Map<String, Object> params) throws Exception {
		return memberPointDao.selectMemberPoint(params);
	}

	/**
	 * 점포명 ComboBox List
	 */
	public Map<String, Object> getStrNameSelectBoxList(Map<String, Object> params) throws Exception {
		return memberPointDao.getStrNameSelectBoxList(params);
	}

	/**
	 * 포인트 임의관리  Insert
	 */
	public Map<String, Object> memberPointOptionInsert(Map<String, Object> params) throws Exception {
		return memberPointDao.memberPointOptionInsert(params);
	}
	
	@Override
	public List<Map<String, Object>> getMemberPointList(Map<String, Object> params) throws Exception {
		return memberPointDao.getMemberPointList(params);
	}
	
	@Override
	public Map<String, Object> updateMemberPoint(Map<String, Object> params) throws Exception {
		return memberPointDao.updateMemberPoint(params);
	}

	@Override
	public List<Map<String, Object>> memberPointStatusList(Map<String, Object> params) throws Exception {
		return memberPointDao.memberPointStatusList(params);
	}

	/* 출고현황 엑셀을 다운한다.
	 * @see retail.member.point.service.MemberPointService#memberPointStatusListExcelDown(java.util.Map)
	 */
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> memberPointStatusListExcelDown(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행

		colName.add("회원번호");
		colName.add("회원명");
		colName.add("가용포인트");
		colName.add("매출일자");
		colName.add("POS");
		colName.add("거래번호");
		colName.add("취소구분");
		colName.add("매출액");
		colName.add("적립점수");
		colName.add("현금");
		colName.add("신용카드");
		colName.add("포인트");
		colName.add("현금승인");
		
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
                            
        // Vo에 있는 변수를 DAO로 넘겨 데이터를 가져온다.
		memberPointDao.memberPointStatusListExcelDown(paramMap);		
		
		
		List<MemberPointServiceVO> RETURN_CUR = (List<MemberPointServiceVO>) paramMap.get("CUR");
		
		if (RETURN_CUR != null && RETURN_CUR.size() > 0) {
								
			int dataLength = Math.round(RETURN_CUR.size());
			 
			// 데이터의 로우수 만큼 반복하면서 ArrayList에 담는다.
			for(int i = 0; i < dataLength; i++){
				
				colValue = new ArrayList<String>();
				
				//System.out.println(((Map<String, Object>) RETURN_CUR.get(i)).get("SLIP_NO"));
				
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CUST_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CUST_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_UPOINT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_DT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("POS_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("TRXN_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CANC_FLAG_NM")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SDSM")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("SALE_POINT")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PAY_AMT_01")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PAY_AMT_03")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("PAY_AMT_18")));
				colValue.add(String.valueOf(((Map<String, Object>) RETURN_CUR.get(i)).get("CASH_AMOUNT")));
				
				_map.put("time"+i, colValue);
				colValue = null;
			}
			// 데이터를 담는 부분
			map.put("sheetName", "Sheet1");  // 시트이름
			map.put("colName", colName);                 // 제목값
			map.put("colValue", _map);			    // 데이터
			map.put("excelname", "포인트적립/사용현황");  // 엑셀파일명
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

			_map.put("time"+0, colValue);
			
			map.put("sheetName", "Sheet1");
			map.put("colName", colName);
			map.put("colValue", _map);					
			map.put("excelname", "포인트적립/사용현황");
		}
			
		 // 담은 값을 Controller로 return
		return map;
	}
	

}
