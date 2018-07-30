package retail.business.doc.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.business.doc.service.BusinessDocService;

@Service("BusinessDocService")
public class BusinessDocImpl implements BusinessDocService {
	@Autowired
	private BusinessDocDao businessDocDao;
	
	@Override
	public List<Map<String, Object>> businessDocMemberList(Map<String, Object> param) throws Exception {
		return businessDocDao.businessDocMemberList(param);
	}

}
