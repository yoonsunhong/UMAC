package retail.business.notice.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface BusinessNoticeService {

	void businessNoticeInputInsert(Map<String, Object> param, MultipartHttpServletRequest req) throws Exception ;

	Map<String, Object> businessNoticeInputList(Map<String, Object> param)  throws Exception ;

	void businessNoticeInputUpdate(Map<String, Object> param, MultipartHttpServletRequest req) throws Exception ;

	void businessNoticeInputFileDelete(Map<String, Object> param) throws Exception ;

	List<Map<String, Object>> businessNoticeInputFileDownload(Map<String, Object> param) throws Exception;

	
	Map<String, Object> businessNoticeV2InputList(Map<String, Object> param) throws Exception;

}
