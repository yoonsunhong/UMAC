package retail.business.doc.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("BusinessDocDao")
public class BusinessDocDao extends EgovAbstractDAO {

	public List<Map<String, Object>> businessDocMemberList(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>)list("businessDoc.businessDocMemberList",param);
	}

}
