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
package retail.stock.stockChange.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * 재고조정 등록
 * @author 문희훈
 * @since 2017. 04.17
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("StockChangeDao")
public class StockChangeDao extends EgovAbstractDAO {
	
	/**
	 * 재고조정 상품 등록여부 체크
	 * @param param
	 * @throws Exception
	 */
	public void getProductInsertCheck(Map<String, Object> param) throws Exception{
		select("stockChange.getProductInsertCheck", param);	
	}

	/**
	 * 일수불 상품정보 가지고오기
	 * @param param
	 * @throws Exception
	 */
	public void getProductCollDtlInfo(Map<String, Object> param) throws Exception{
		select("stockChange.getProductCollDtlInfo", param);	
	}

	/**
	 * 재고조정등록
	 * @param param
	 * @throws Exception
	 */
	public void insertProductChangeInfo(Map<String, Object> param) throws Exception{
		insert("stockChange.insertProductChangeInfo", param);	
	}
	
	/**
	 * 재고등록목록조회
	 * @param param
	 * @throws Exception
	 */
	public void selectProductChangeInfo(Map<String, Object> param)  throws Exception{
		list("stockChange.selectProductChangeInfo", param);	
	}

	/**
	 *  재고조정수정
	 * @param param
	 * @throws Exception
	 */
	public void updateProductChangeInfo(Map<String, Object> param) throws Exception{
		update("stockChange.updateProductChangeInfo", param);	
	}

	/**
	 * 재고조정삭제
	 * @param param
	 * @throws Exception
	 */
	public void deleteProductChangeInfo(Map<String, Object> param)  throws Exception{
		update("stockChange.deleteProductChangeInfo", param);	
	}

	/**
	 * 재고조정 확정
	 * @param param
	 * @throws Exception
	 */
	public void submitProductChangeInfo(Map<String, Object> param) throws Exception{
		update("stockChange.submitProductChangeInfo", param);
		
	}


}
