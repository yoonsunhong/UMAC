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
package retail.inoutcenter.carDivision.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;
  
import retail.inoutcenter.carDivision.service.InOutCenterCarDivisionVO; 

/**
 * @Class Name : InOutCenterCarDivisionDao.java
 * @Description : InOutCenterCarDivisionDao Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.12.05           최초생성
 *
 * @author 유재훈
 * @since 2016.12.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@SuppressWarnings("unchecked")
@Repository("InOutCenterCarDivisionDao")
public class InOutCenterCarDivisionDao extends EgovAbstractDAO {
 
 
	//  대출입헤더 조회 리스트
	public List<Map<String, Object>> inOutCenterHeadCarDivisionSearch(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("inOutCenterCarDivision.inOutCenterHeadCarDivisionSearch", param);
	}

	
	
	
 
    //  대출입상품 리스트 정보 보여주기
	public List<Map<String, Object>> inOutCenterDetailCarDivisionInfo(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("inOutCenterCarDivision.inOutCenterDetailCarDivisionInfo", param);
	}
 
 	
 
//    // 대출입  확정
//	public  List<Map<String, Object>>  inOutCenterConfirm( Map<String, Object> param) throws Exception{
//		return (List<Map<String, Object>>)  list("inOutCenterMng.inOutCenterConfirm", param);
//	}
//	
//	
//	 
	
	
	
	
	 
	
}
