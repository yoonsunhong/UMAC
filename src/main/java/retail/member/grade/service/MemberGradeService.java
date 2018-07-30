package retail.member.grade.service;

import java.util.Map;

public interface MemberGradeService {
	
	Map<String, Object> getMemberGradeDetail(Map<String, Object> param) throws Exception;
	
	Map<String, Object> updateMemberGrade(Map<String, Object> param) throws Exception;
	
	
	
	
}