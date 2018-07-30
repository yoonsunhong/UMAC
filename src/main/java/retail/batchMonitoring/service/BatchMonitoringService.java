package retail.batchMonitoring.service;

import java.util.Map;

/**
 * SYS - BatchMonitoring
 * @author 송원두
 * @since 2018. 02.014
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

public interface BatchMonitoringService {

	/**
	 * Batch Log 조회
	 * @param param
	 * @throws Exception
	 */
	void getBatchMonitoringList(Map<String, Object> param)throws Exception;

	/**
	 * Batch LogName List
	 * @param param
	 * @throws Exception
	 */
	void getBatchLogNameList(Map<String, Object> paramMap)throws Exception;

	/**
	 * Batch LogStatus List
	 * @param param
	 * @throws Exception
	 */
	void getBatchLogStatusList(Map<String, Object> paramMap)throws Exception;
}