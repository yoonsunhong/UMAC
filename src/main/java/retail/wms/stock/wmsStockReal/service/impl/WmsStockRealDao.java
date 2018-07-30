package retail.wms.stock.wmsStockReal.service.impl;

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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * WMS-실사재고 등록
 * @author 문희훈
 * @since 2017. 02.26
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("WmsStockRealDao")
public class WmsStockRealDao extends EgovAbstractDAO {

	/**
	 *  점포에 예정된 재고조사 일정 ID 리스트 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getWmsInvInspSchdIdList(Map<String, Object> paramMap)  throws Exception{
		list("wmsStockReal.getWmsInvInspSchdIdList", paramMap);	
	}

	/**
	 * 재고조사 일정 ID로 조사일정 조회
	 * @param param
	 * @throws Exception
	 */
	public void getWmsInvInspDt(Map<String, Object> param) throws Exception{
		select("wmsStockReal.getWmsInvInspDt", param);	
	}

	/**
	 * 바코드로 상품정보 가지고오기
	 * @param param
	 * @throws Exception
	 */
	public void getWmsProductDtlInfo(Map<String, Object> param) throws Exception{
		select("wmsStockReal.getWmsProductDtlInfo", param);	
	}

	/**
	 * EXCEL 업로드 데이터 TEMP디비에 저장 후 유효성 체크 
	 * 1.해당 점포에 취급하는 상품 인지 체크
	 * 2.스캔코드가 13자리 인지 체크 (숫자형)
	 * 3.재고수량이 숫자인지 체크
	 * 4.매장구분 1 OR 2로 입력했는지
	 * @param result
	 * @throws Exception
	 */
	public void wmsStockGridExcelUpload(Map<String, Object> result)  throws Exception{
		insert("wmsStockReal.wmsStockGridExcelUpload", result);	
	}
	
	/**
	 * 실사재고 그리드1데이터 저장
	 * @param param
	 * @throws Exception
	 */
	public void saveWmsStockRealData(Map<String, Object> param) throws Exception{
		insert("wmsStockReal.saveWmsStockRealData", param);	
	}

	/**
	 * 실사재고 조회
	 * @param param
	 * @throws Exception
	 */
	public void getWmsStockRealData(Map<String, Object> param) throws Exception{
		list("wmsStockReal.getWmsStockRealData", param);	
	}

	
	/**
	 * 실사재고 조회(확정) - 탭2
	 * @param param
	 * @throws Exception
	 */
	public void getWmsStockRealDataCheckList(Map<String, Object> param)throws Exception{
		list("wmsStockReal.getWmsStockRealDataCheckList", param);	
	}


	/**
	 * 실사재고 그리드2 데이터 수정/삭제
	 * @param param
	 * @throws Exception
	 */
	public void updateWmsStockRealData(Map<String, Object> param) throws Exception{
		update("wmsStockReal.updateWmsStockRealData", param);	
	}

	
	/**
	 * 실사재고 그리드2 확정
	 * @param param
	 * @throws Exception
	 */
	public void submitWmsStockRealData(Map<String, Object> param) throws Exception{
		insert("wmsStockReal.submitWmsStockRealData", param);	
	}
	
	
}
