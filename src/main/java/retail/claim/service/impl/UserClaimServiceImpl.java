package retail.claim.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.claim.service.UserClaimService;
import retail.claim.service.UserClaimVO;

@Service("UserClaimService")
public class UserClaimServiceImpl implements UserClaimService {
	
	@Autowired
	private UserClaimDao ucDao;
	
	/* 클레임접수등록 조회
	 * @see retail.claim.service.UserClaimService#selectUserClaimRegist(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectUserClaimRegist(Map<String, Object> paramMap) throws Exception{
		ucDao.selectUserClaimRegist(paramMap);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public Map<String, Object> excelUserClaimRegist(Map<String, Object> paramMap) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행
			
		colName.add("접수일자");
		colName.add("접수번호");
		colName.add("점포명");
		colName.add("담당자사원번호");
		colName.add("담당자명");
		colName.add("컴플레인유형");
		colName.add("고객명");
		colName.add("고객번호");
		colName.add("처리상태");
		colName.add("클레임처리건수");
		colName.add("전화번호");
		colName.add("제목");
		colName.add("상세내용");
		colName.add("접수일시");
		colName.add("접수자");
		
		Map<String, Object> _map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
		ucDao.excelUserClaimRegist(paramMap);
		
		List<UserClaimVO> RC = (List<UserClaimVO>) paramMap.get("CUR");
		
		if (RC != null && RC.size() > 0) {
			
			int dataLength = Math.round(RC.size());
			
			for(int i=0; i < dataLength ; i++){

				colValue = new ArrayList<String>();
				
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("RCPT_DT")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RC.get(i)).get("RCPT_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("STR_NAME")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RC.get(i)).get("RCPT_EMP")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("RCPT_EMP_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CLAIM_TP_NAME")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CUST_NAME")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RC.get(i)).get("CUST_NO")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("CLAIM_STAT_NAME")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RC.get(i)).get("CLAIM_CNT")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RC.get(i)).get("MOBIL_NO")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RC.get(i)).get("SUBJECT")));
				colValue.add("'" + String.valueOf(((Map<String, Object>) RC.get(i)).get("CONTS")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IDATE")));
				colValue.add(String.valueOf(((Map<String, Object>) RC.get(i)).get("IEMP_NAME")));
				
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
			
			_map.put("time"+0, colValue);
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	    Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime());
		map.put("sheetName", "Sheet1");  				// 시트이름
		map.put("colName", colName);                 	// 제목값
		map.put("colValue", _map);			    		// 데이터
		map.put("excelname", "컴플레인접수등록엑셀데이터_"+strToday );  // 엑셀파일명
		//map.put("colColor", "5,8,9");			    	// 색 칠할 컬럼인덱스 . 0 부터 시작
		
		return map;
	}
	
	/* 컴플레인접수등록 저장
	 * @see retail.claim.service.UserClaimService#registUserClaimRegist(java.util.Map)
	 */
	@Override
	@Transactional
	public void registUserClaimRegist(Map<String, Object> paramMap) throws Exception{
		ucDao.registUserClaimRegist(paramMap);
	}
	
	/* 컴플레인접수등록 삭제
	 * @see retail.claim.service.UserClaimService#deleteUserClaimRegist(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteUserClaimRegist(Map<String, Object> paramMap) throws Exception{
		ucDao.deleteUserClaimRegist(paramMap);
	}
	
	/* 컴플레인관리 조회
	 * @see retail.claim.service.UserClaimService#selectUserClaimManage(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectUserClaimManage(Map<String, Object> paramMap) throws Exception{
		ucDao.selectUserClaimManage(paramMap);
	}
	
	/* 컴플레인관리 저장
	 * @see retail.claim.service.UserClaimService#registUserClaimManage(java.util.Map)
	 */
	@Override
	@Transactional
	public void registUserClaimManage(Map<String, Object> paramMap) throws Exception{
		ucDao.registUserClaimManage(paramMap);
	}

}
