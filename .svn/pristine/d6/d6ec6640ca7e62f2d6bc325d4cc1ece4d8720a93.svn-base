package retail.member.stat.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

/**
 * 
 * @Class Name : MemberSalesStatDao.java
 * @Description : 사업자매출현황
 * @Modification Information
 * @
 * @  수정일                수정자                              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.05.31    최호정           최초생성
 *
 * @author 최호정
 * @since 2017. 05. 31.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@SuppressWarnings("unchecked")
@Repository("MemberSalesStatDao")
public class MemberSalesStatDao extends EgovAbstractDAO {

    /** log */
    private final Log log = LogFactory.getLog(this.getClass());

    public List<Map<String, Object>> getMemberSalesStat(Map<String, Object> param) throws Exception {
        log.debug("DAO param :"+param);
        List<Map<String, Object>> resultMap = null;
        resultMap = (List<Map<String, Object>>) list("memberSalesStat.memberSalesStatList", param);
        return resultMap;
    }

    public List<Map<String, Object>> getMemberStatByDay(Map<String, Object> param) throws Exception {
        log.debug("DAO param :"+param);
        List<Map<String, Object>> resultMap = null;
        resultMap = (List<Map<String, Object>>) list("memberSalesStat.memberStatByDayList", param);
        return resultMap;
    }

    public List<Map<String, Object>> getMemberDistributionStat(Map<String, Object> param) throws Exception {
        log.debug("DAO param :"+param);
        List<Map<String, Object>> resultMap = null;
        resultMap = (List<Map<String, Object>>) list("memberSalesStat.memberDistributionStatList", param);
        return resultMap;
    }

    public List<Map<String, Object>> getMemberDistributionStatByDay(Map<String, Object> param) throws Exception {
        log.debug("DAO param :"+param);
        List<Map<String, Object>> resultMap = null;
        resultMap = (List<Map<String, Object>>) list("memberSalesStat.memberDistributionStatByDayList", param);
        return resultMap;
    }

}
