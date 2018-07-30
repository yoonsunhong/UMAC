package retail.wms.out.wmsOutReport.service;

import java.util.Map;


/**
 * WMS -출고현황조회
 * @author 문희훈
 * @since 2017. 01.20
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface WmsOutReportService {

	/**
	 * 출고현황목록 조회
	 * @param param
	 * @throws Exception
	 */
	void getWmsOutReportList(Map<String, Object> param) throws Exception;

	/**
	 * 출고현황 엑셀다운
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	Map<String, Object> wmsOutReportExcelDown(Map<String, Object> paramMap) throws Exception;

	
	
}