package retail.wms.in.service;

import java.util.Map;


/**
 * WMS -미납현황조회
 * @author 문희훈
 * @since 2017. 01.13
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface WmsInNonPaymentService {

	/**
	 * 미납현황 조회
	 * @param param
	 * @throws Exception
	 */
	void getWmsNonPaymentList(Map<String, Object> param) throws Exception;

	/**
	 * 미납현황 엑셀다운
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	Map<String, Object> wmsNonPaymentExcelDown(Map<String, Object> paramMap) throws Exception;
	
}