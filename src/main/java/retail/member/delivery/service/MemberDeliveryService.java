package retail.member.delivery.service;

import java.util.Map;

public interface MemberDeliveryService {

	Map<String, Object> memberDeliveryList(Map<String, Object> param) throws Exception;
	Map<String, Object> memberDeliveryDtlList(Map<String, Object> param) throws Exception;

}