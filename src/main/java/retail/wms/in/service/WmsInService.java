package retail.wms.in.service;

import java.util.Map;


/**
 * WMS -입고예정관리
 * @author 문희훈
 * @since 2017. 01.04
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface WmsInService {

	/**
	 * WMS 입고목록 조회
	 * @param param
	 * @return
	 * @throws Exception
	 */
	Map<String, Object> getWmsInList(Map<String, Object> param) throws Exception;

	/**
	 * 입고현황 상세조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getWmsInDtlList(Map<String, Object> paramMap) throws Exception;

	/**
	 * WMS 입고 저장.    
	 * @param param
	 * @throws Exception
	 */
	void saveWmsInCnt(Map<String, Object> param) throws Exception;

	/**
	 *  WMS 입고확정
	 * @param paramMap
	 * @throws Exception
	 */
	void sumitWmsIn(Map<String, Object> paramMap) throws Exception;


	
	
}