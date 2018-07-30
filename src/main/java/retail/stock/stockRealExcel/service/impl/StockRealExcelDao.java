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
package retail.stock.stockRealExcel.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;



/**
 * 실사재고엑셀조정
 * @author 문희훈
 * @since 2017. 05.03
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Repository("StockRealExcelDao")
public class StockRealExcelDao extends EgovAbstractDAO {

	/**
	 * 점포별 재고조사 날짜 리스트 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getInvInspDtList(Map<String, Object> paramMap) throws Exception{
		list("stockRealExcel.getInvInspDtList", paramMap);	
	}

	 
	/**
	 * 점포별 전  재고조사 날짜 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getInvBeforeDt(Map<String, Object> paramMap)  throws Exception{
		select("stockRealExcel.getInvBeforeDt", paramMap);		
	}

	
	/**
	 * 특정점포 전 재고조사일자 목록조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void getInvBeforeDtList(Map<String, Object> paramMap) throws Exception {
		list("stockRealExcel.getInvBeforeDtList", paramMap);
	}

	
	/**
	 * 실사재고엑셀조정 조회
	 * @param param
	 * @throws Exception
	 */
	public void getStockRealExcelList(Map<String, Object> param)  throws Exception{
		list("stockRealExcel.getStockRealExcelList", param);	
	}
	
	
	/**
	 * 실사재고엑셀조정 팝업 행추가 저장시 그리드 세부내역 조회에서 그리드에 추가
	 * @param param
	 * @return 
	 * @throws Exception
	 */
	public List<Map<String, Object>> stockExcelUploadSave(Map<String, Object> param)  throws Exception{
		return (List<Map<String, Object>>) list("stockRealExcel.stockExcelUploadSave", param);	
	}


	/**
	 * EXCEL 업로드 데이터 TEMP디비에 저장 후 유효성 체크 
	 * 1.해당 점포에 취급하는 상품 인지 체크
	 * 2.재고수량이 숫자인지 체크
	 * 3.매장구분 1 OR 2로 입력했는지
	 * @param result
	 * @throws Exception
	 */
	public void stockExcelUpload(Map<String, Object> result)  throws Exception{
		insert("stockRealExcel.stockExcelUpload", result);	
	}


	
	/**
	 * 실사재고엑셀조정 엑셀 업로드 데이터 저장
	 * @param param
	 * @throws Exception
	 */
	public void saveStockExcelData(Map<String, Object> param) throws Exception{
		update("stockRealExcel.saveStockExcelData", param);	
	}
	
	/**
	 * 실사재고엑셀조정 엑셀 업로드 데이터 확정
	 * @param param
	 * @throws Exception
	 */
	public void confirmStockRealExcelFinish(Map<String, Object> param) throws Exception{
		update("stockRealExcel.confirmStockRealExcelFinish", param);	
	}

	
	/**
	 * 실사재고 미리보기
	 * @param param
	 * @return 
	 * @throws Exception
	 */
	public List<Map<String, Object>> stockRealExcelPreview(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("stockRealExcel.stockRealExcelPreview", param);
	}
	
}
