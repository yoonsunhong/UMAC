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
  
import retail.order.store.service.OrderStoreExcelBuyerVO; 

/**
 * @Class Name : OrderStoreExcelBuyerDao.java
 * @Description : OrderStoreExcelBuyerDao Class
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
@Repository("OrderStoreExcelBuyerDao")
public class OrderStoreExcelBuyerDao extends EgovAbstractDAO {
 


	public  List<Map<String, Object>>  orderUploadSearchBuyer( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcelBuyer.orderUploadSearchBuyer", param);
	}
	
	public List<Map<String, Object>> orderAddItmBuyer(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("orderStoreExcelBuyer.orderAddItmBuyer", param);
	}


	
	public  List<Map<String, Object>>  orderAddItmSaveBuyer( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcelBuyer.orderAddItmSaveBuyer", param);
	}
	

	public  List<Map<String, Object>>  orderUploadDelBuyer( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcelBuyer.orderUploadDelBuyer", param);
	}

 
	public  List<Map<String, Object>>  orderUploadUpdateBuyer( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcelBuyer.orderUploadUpdateBuyer", param);
	}
	 
	
	 
	public void r2OrderExcelDataBuyer(Map<String, Object> paramMap) throws Exception{
		list("orderStoreExcelBuyer.r2OrderExcelDataBuyer", paramMap);
	}
	
	public List<Map<String, Object>>  getStoreInfo(Map<String, Object> param ) throws Exception{
		return (List<Map<String, Object>>)   list("orderStoreExcelBuyer.getStoreInfo", param);
	}
	
	
	public  List<Map<String, Object>>  excelDataLoadBuyerAll( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcelBuyer.excelDataLoadBuyerAll", param);
	}

    // 바이어 엑셀 발주 등록  
	public  List<Map<String, Object>>  orderStoreProductExcelRegisterBuyer( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcelBuyer.orderStoreProductExcelRegisterBuyer", param);
	}
	
	
	 // 바이어 엑셀 발주 확정 
	public  List<Map<String, Object>>  jobUploadToOrderBuyer( Map<String, Object> param) throws Exception{
		return (List<Map<String, Object>>)  list("orderStoreExcelBuyer.jobUploadToOrderBuyer", param);
	}
	
}
