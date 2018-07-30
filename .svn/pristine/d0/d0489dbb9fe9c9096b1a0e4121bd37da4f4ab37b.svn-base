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
package retail.purch.mng.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * @Class Name : PurchMngDeleteDao.java
 * @Description : PurchMngDeleteDao Class
 * @Modification Information
 * @
 * @  수정일       수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.12.05           최초생성
 *
 * @author 유재훈
 * @since 2016.12.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
 
@SuppressWarnings("unchecked")
@Repository("PurchMngDeleteDao")
public class PurchMngDeleteDao extends EgovAbstractDAO {
 
	
	
	//  매입헤더 조회 리스트
	public List<Map<String, Object>> purchHeadSearchDelete(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("purchMngDelete.purchHeadSearchDelete", param);
	}
	
    //  매입상품 리스트 정보 보여주기
	public List<Map<String, Object>> purchDetailInfoDelete(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("purchMngDelete.purchDetailInfoDelete", param);
	}
	
    // 매입 삭제
	public  List<Map<String, Object>>  purchDeleteAll( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("purchMngDelete.purchDeleteAll", param);   // purchConfirmDelete 
	}
	 
    // 매입  날짜 수정
	public  List<Map<String, Object>>  purchChangeDate( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("purchMngDelete.purchChangeDate", param);   // purchConfirmDelete 
	}
	
    // 매입  마감 취소  
	public  List<Map<String, Object>>  purchMagamCancel( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("purchMngDelete.purchMagamCancel", param);   // purchConfirmDelete 
	}
	 	
	
	
}
