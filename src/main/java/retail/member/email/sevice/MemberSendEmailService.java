package retail.member.email.sevice;

import java.util.Map;

public interface MemberSendEmailService {
	Map<String, Object> getMemberSend(Map<String, Object> params) throws Exception;	
	
}
