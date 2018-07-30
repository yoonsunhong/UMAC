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
package retail.order.store.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;
  
import retail.order.store.service.OrderStoreExcelVO; 

/**
 * @Class Name : OrderStoreExcelDao.java
 * @Description : OrderStoreExcelDao Class
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
@Repository("OrderStoreExcelDao")
public class OrderStoreExcelDao extends EgovAbstractDAO {
 

	
   
	public  List<Map<String, Object>>  excelDataLoad( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcel.excelDataLoad", param);
	}
	

	public  List<Map<String, Object>>  excelDataLoadBuyerR1( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcel.excelDataLoadBuyerR1", param);
	}

	public  List<Map<String, Object>>  excelDataLoadBuyer( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcel.excelDataLoadBuyer", param);
	}
	
	
    // 엑셀 발주 등록  
	public  List<Map<String, Object>>  orderStoreProductExcelRegister( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcel.orderStoreProductExcelRegister", param);
	}

    // 엑셀 발주 확정 
	public  List<Map<String, Object>>  jobUploadToOrder( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcel.jobUploadToOrder", param);
	}
	
	
	/**
	 * R2 발주 엑셀 데이터 다운로드  엑셀다운
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public void r2OrderExcelData(Map<String, Object> paramMap) throws Exception{
		list("orderStoreExcel.r2OrderExcelData", paramMap);
	}


	public  List<Map<String, Object>>  orderUploadSearch( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcel.orderUploadSearch", param);
	}
	

	public  List<Map<String, Object>>  orderUploadDel( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcel.orderUploadDel", param);
	}
	

	public  List<Map<String, Object>>  orderUploadUpdate( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcel.orderUploadUpdate", param);
	}
	
	
	public  List<Map<String, Object>>  orderAddItmSave( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcel.orderAddItmSave", param);
	}
	
	
 
	public List<Map<String, Object>> orderAddItm(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreExcel.orderAddItm", param);
	}

	
}
