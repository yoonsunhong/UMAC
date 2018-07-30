package retail.member.stat.service;

import java.util.List;
import java.util.Map;

public interface MemberSalesStatService {

    List<Map<String, Object>> getMemberSalesStat(Map<String, Object> param) throws Exception;

    List<Map<String, Object>> getMemberStatByDay(Map<String, Object> param) throws Exception;

    List<Map<String, Object>> getMemberDistributionStat(Map<String, Object> param) throws Exception;

    List<Map<String, Object>> getMemberDistributionStatByDay(Map<String, Object> param) throws Exception;

}
