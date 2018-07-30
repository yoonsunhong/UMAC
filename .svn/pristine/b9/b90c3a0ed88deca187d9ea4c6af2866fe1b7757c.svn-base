/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package retail.member.dm.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.common.EgovStringUtil;
import retail.member.dm.service.MemberDmService;

/**
 * 
 * @Class Name : MemberDmServiceImpl.java
 * @Description : DM발송관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.13           최초생성
 *
 * @author 김경진
 * @since 2017. 02. 13.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("MemberDmService")
public class MemberDmServiceImpl implements MemberDmService {
	
	@Autowired
	private MemberDmDao memberDmDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberDmServiceImpl.class);
	
	@Override
	public Map<String, Object> getMemberDm(Map<String, Object> params) throws Exception {
		return memberDmDao.getMemberDm(params);
	}
	
	@Override
	public List<Map<String, Object>> getMemberDmExcel(Map<String, Object> param) throws Exception {
		
		return memberDmDao.getMemberDmExcel(param);
		
		/*Map<String, Object> resultMap = new HashMap<String, Object>();
		List<String> colName = new ArrayList<String>();  //excel 제목행
		
		colName.add("회원명");
		colName.add("회원번호");
		colName.add("전화번호");
		colName.add("휴대전화");
		colName.add("업체명");
		colName.add("매출액");
		colName.add("방문횟수");
		colName.add("우편번호");
		colName.add("주소");
		colName.add("상세주소");
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> colValue = null;  // excel 데이터 행
		
		List<Map<String, Object>> resultList = memberDmDao.getMemberDmExcel(param);
		
		if (resultList != null && resultList.size() > 0) {
			
			for(int i = 0; i < resultList.size(); i++){
				
				colValue = new ArrayList<String>();
				
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("CUST_NAME"), ""));
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("CUST_NO"), ""));
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("TEL_NO"), ""));
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("MOBIL_NO"), ""));
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("BUSI_NAME"), ""));
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("SALE_AMT_SUM"), ""));
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("TRXN_NO_CNT"), ""));
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("POST_NO"), ""));
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("ADDR"), ""));
				colValue.add(EgovStringUtil.isNullToString(resultList.get(i).get("ADDR_DTL"), ""));
				
				map.put("time"+i, colValue);
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
			
			map.put("time"+0, colValue);
		}
		
		// 데이터를 담는 부분
		resultMap.put("sheetName", "Sheet1");  		// 시트이름
		resultMap.put("colName", colName);			// 제목값
		resultMap.put("colValue", map);		// 데이터
		resultMap.put("excelname", "DM발송관리");		// 엑셀파일명
		
		return resultMap;*/
	}
	
 
}
