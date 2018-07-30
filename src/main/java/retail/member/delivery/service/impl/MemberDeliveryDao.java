package retail.member.delivery.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("MemberDeliveryDao")
public class MemberDeliveryDao extends EgovAbstractDAO {

	public Map<String, Object> memberDeliveryList(Map<String, Object> param) throws Exception {
		list("memberDelivery.memberDeliveryList",param);
		return param;
	}
	
	public Map<String, Object> memberDeliveryDtlList(Map<String, Object> param) throws Exception {
		list("memberDelivery.memberDeliveryDtlList",param);
		return param;
	}
		

}
