package retail.member.sales.service;

import java.util.List;
import java.util.Map;

/**
 * 회원매출상세내역
 * @author 문희훈
 * @since 2017. 01.17
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
public interface MemberSalesStateService {
	List<Map<String, Object>> memberSalesStateList(Map<String, Object> param) throws Exception;
	List<Map<String, Object>> memberSalesStateHdrList(Map<String, Object> param) throws Exception;
	List<Map<String, Object>> memberSalesStateDtlList(Map<String, Object> param) throws Exception;
}
