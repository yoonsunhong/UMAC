package retail.member.membership.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@Repository("MemberShipDao")
public class MemberShipDao extends EgovAbstractDAO {
	
	public List<Map<String, Object>> getMemberShipList(Map<String, Object> param) {
		
		return (List<Map<String, Object>>) list("memberShip.getMemberShipList", param);

	}
	
}
