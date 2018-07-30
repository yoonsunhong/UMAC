/**
 * 
 */
/**
 * @author jhs
 *
 */
package retail.member.membership.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.member.membership.service.MemberShipService;

@Service("MemberShipService")
public class MemberShipServiceImpl implements MemberShipService {

	@Autowired
	private MemberShipDao memberShipDao;
	
	@Override
	@Transactional
	public List<Map<String, Object>> getMemberShipList(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		
		return memberShipDao.getMemberShipList(paramMap);
	}
}