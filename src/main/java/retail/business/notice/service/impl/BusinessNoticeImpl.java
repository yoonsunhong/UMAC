package retail.business.notice.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import retail.business.notice.service.BusinessNoticeService;
import retail.common.FileUtils;

@Service("BusinessNoticeService")
public class BusinessNoticeImpl implements BusinessNoticeService {
	
    @Resource(name="fileUtils")
    private FileUtils fileUtils;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	private BusinessNoticeDao businessNoticeDao;

	@Override
	public void businessNoticeInputInsert(Map<String, Object> param, MultipartHttpServletRequest req) throws Exception {
        /*List<Map<String,Object>> list = fileUtils.parseInsertFileInfo(param, req);
        for(int i=0, size=list.size(); i<size; i++){
        	//businessNoticeDao.insertFile(list.get(i));
        }*/
		
		Map<String, Object> param2 = fileUtils.parseInsertFileInfo(param, req);
		businessNoticeDao.businessNoticeInputInsert(param2);		
	}

	@Override
	public Map<String, Object> businessNoticeInputList(Map<String, Object> param) throws Exception {
		return businessNoticeDao.businessNoticeInputList(param);
	}

	@Override
	public void businessNoticeInputUpdate(Map<String, Object> param, MultipartHttpServletRequest req) throws Exception {
		Map<String, Object> param2 = fileUtils.parseInsertFileInfo(param, req);
		businessNoticeDao.businessNoticeInputUpdate(param2);
	}

	@Override
	public void businessNoticeInputFileDelete(Map<String, Object> param) throws Exception {
		businessNoticeDao.businessNoticeInputFileDelete(param);
	}
	
	@Override
	public List<Map<String, Object>> businessNoticeInputFileDownload(Map<String, Object> param) throws Exception {
		return businessNoticeDao.businessNoticeInputFileDownload(param);
	}

	@Override
	public Map<String, Object> businessNoticeV2InputList(Map<String, Object> param) throws Exception {
		return businessNoticeDao.businessNoticeV2InputList(param);
	}

	/*@Override
	public Map<String, Object> businessNoticeInputList(Map<String, Object> param) throws Exception {
		return businessNoticeDao.businessNoticeInputList(param);
	} */
}
