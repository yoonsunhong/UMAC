package retail.salesinfo.report.service;

import java.util.List;
import java.util.Map;

public interface SalesInfoReportService {

	List<Map<String, Object>> salesInfoReportPromptList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportPromptSalesList(Map<String, Object> param) throws Exception;
	
	
	List<Map<String, Object>> salesInfoReportYieldList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportTermList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportTermDetailList(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> salesInfoReportMonthList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportMonthDetailList(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> salesInfoReportPaymentList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportPaymentDetailList(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> salesInfoReportLeaseList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportYieldDetailList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportRcvPayDateList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportRcvPayDateDetailList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportRcvPayMonthList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportRcvPayMonthDetailList(Map<String, Object> param) throws Exception;

	Map<String, Object> salesInfoReportRcvPayMonthBatch(Map<String, Object> param) throws Exception;

	Map<String, Object> salesInfoReportGISList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportDlvrList(Map<String, Object> param) throws Exception;
	
	List<Map<String, Object>> salesInfoReportvrList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportDlvrDList(Map<String, Object> param) throws Exception;

	List<Map<String, Object>> salesInfoReportEGLList(Map<String, Object> param) throws Exception;

	Map<String, Object> salesInfoReportGISDownload(Map<String, Object> paramMap) throws Exception;

	List<Map<String, Object>> salesInfoReportNewsFlashList(Map<String, Object> param) throws Exception;


}
