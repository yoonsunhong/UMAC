package retail.member.grade.service;

import java.util.Map;

public interface MemberGradeBatchService {
	
	Map<String, Object> getMemberGradeBatchDetail(Map<String, Object> param) throws Exception;
	
	Map<String, Object> memberGradeBatchPreview(Map<String, Object> param) throws Exception;
	
	Map<String, Object> updateMemberGradeBatch(Map<String, Object> param) throws Exception;
	
	
	
	
}