package retail.member.info.service;

import java.util.List;
import java.util.Map;

public interface MemberInfoService {
	
	Map<String, Object> getMemberInfoDetail(Map<String, Object> param) throws Exception;
	
	Map<String, Object> memberInfoCount(Map<String, Object> param) throws Exception;
	
	Map<String, Object> memberPhoneCount(Map<String, Object> param) throws Exception;
	
	Map<String, Object> memberBusiNoCount(Map<String, Object> param) throws Exception;
	
	Map<String, Object> memberInfoSelect(Map<String, Object> param) throws Exception;
	
	Map<String, Object> updateMemberInfoPersonal(Map<String, Object> param) throws Exception;
	
	Map<String, Object> updateMemberInfoBuisness(Map<String, Object> param) throws Exception;
	
	
	
}