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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.stock.stockChange.service.StockChangeService;




/**
 * 재고조정 등록
 * @author 문희훈
 * @since 2017. 04.17
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Service("StockChangeService")
public class StockChangeServiceImpl  implements StockChangeService {

	@Autowired
	private StockChangeDao stockChangeDao;
	 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(StockChangeServiceImpl.class);


	/* 재고조정 상품 등록여부 체크
	 * @see retail.stock.stockChange.service.StockChangeService#getProductInsertCheck(java.util.Map)
	 */
	@Override
	@Transactional
	public void getProductInsertCheck(Map<String, Object> param)	throws Exception {
		stockChangeDao.getProductInsertCheck(param);
	}
	
	/* 
	 * 일수불 상품정보 가지고오기
	 * @see retail.stock.stockChange.service.StockChangeService#getProductCollDtlInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void getProductCollDtlInfo(Map<String, Object> param) 	throws Exception {
		stockChangeDao.getProductCollDtlInfo(param);
	}

	/* 재고조정등록
	 * @see retail.stock.stockChange.service.StockChangeService#insertProductChangeInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void insertProductChangeInfo(Map<String, Object> param) throws Exception {
		stockChangeDao.insertProductChangeInfo(param);
	}

	/* 재고등록목록조회
	 * @see retail.stock.stockChange.service.StockChangeService#selectProductChangeInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectProductChangeInfo(Map<String, Object> param)	throws Exception {
		stockChangeDao.selectProductChangeInfo(param);
	}

	/* 재고조정수정
	 * @see retail.stock.stockChange.service.StockChangeService#updateProductChangeInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void updateProductChangeInfo(Map<String, Object> param)	throws Exception {
		stockChangeDao.updateProductChangeInfo(param);
	}

	/* 재고조정 삭제
	 * @see retail.stock.stockChange.service.StockChangeService#deleteProductChangeInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteProductChangeInfo(Map<String, Object> param) throws Exception {
		stockChangeDao.deleteProductChangeInfo(param);
	}

	/* 재고조정 확정
	 * @see retail.stock.stockChange.service.StockChangeService#submitProductChangeInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void submitProductChangeInfo(Map<String, Object> param) throws Exception {
		stockChangeDao.submitProductChangeInfo(param);
	}


	

	
 
}
