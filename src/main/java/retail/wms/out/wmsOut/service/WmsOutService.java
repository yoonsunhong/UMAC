package retail.wms.out.wmsOut.service;

import java.util.Map;


/**
 * WMS -출고조회/수정
 * @author 문희훈
 * @since 2017. 01.17
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface WmsOutService {

	/**
	 * 출고목록조회
	 * @param param
	 * @throws Exception
	 */
	void getWmsOutList(Map<String, Object> param) throws Exception;

	/**
	 * 출고상세조회
	 * @param paramMap
	 * @throws Exception
	 */
	void getWmsOutDtlList(Map<String, Object> paramMap)throws Exception;

	/**
	 * 출고저장
	 * @param param
	 * @throws Exception
	 */
	void saveWmsOutCnt(Map<String, Object> param)throws Exception;

	/**
	 * 출고확정
	 * @param paramMap
	 * @throws Exception
	 */
	void sumitWmsOut(Map<String, Object> paramMap)throws Exception;

	
	
}