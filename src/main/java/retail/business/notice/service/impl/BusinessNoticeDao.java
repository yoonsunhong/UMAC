package retail.business.notice.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("BusinessNoticeDao")
public class BusinessNoticeDao extends EgovAbstractDAO {

	public void businessNoticeInputInsert(Map<String, Object> param) throws Exception {
		insert("businessNotice.businessNoticeInputInsert",param);
	}

	public Map<String, Object> businessNoticeInputList(Map<String, Object> param) throws Exception {
		select("businessNotice.businessNoticeInputList", param);
		return param;
	}

	public void businessNoticeInputUpdate(Map<String, Object> param) throws Exception {
		update("businessNotice.businessNoticeInputUpdate", param);
	}

	public void businessNoticeInputFileDelete(Map<String, Object> param) throws Exception {
		update("businessNotice.businessNoticeInputFileDelete", param);
	}

	public List<Map<String, Object>> businessNoticeInputFileDownload(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("businessNotice.businessNoticeInputFileDownload", param);
	}

	public Map<String, Object> businessNoticeV2InputList(Map<String, Object> param) {
		select("businessNotice.businessNoticeV2InputList", param);
		return param;
	}


}
