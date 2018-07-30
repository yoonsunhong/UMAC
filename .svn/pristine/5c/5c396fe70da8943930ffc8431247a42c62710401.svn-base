package retail.member.stat.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.member.stat.service.MemberSalesStatService;

/**
 * 
 * @Class Name : MemberSalesStatServiceImpl.java
 * @Description : 사업자매출관리
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
@Service("MemberSalesStatService")
public class MemberSalesStatServiceImpl implements MemberSalesStatService {

    @Autowired
    private MemberSalesStatDao memberSalesStatDao;

    private final Log log = LogFactory.getLog(this.getClass());

    @Override
    public List<Map<String, Object>> getMemberSalesStat(Map<String, Object> param) throws Exception {
        log.debug("param :"+param);
        return memberSalesStatDao.getMemberSalesStat(param);
    }

    @Override
    public List<Map<String, Object>> getMemberStatByDay(Map<String, Object> param) throws Exception {
        return memberSalesStatDao.getMemberStatByDay(param);
    }

    @Override
    public List<Map<String, Object>> getMemberDistributionStat(Map<String, Object> param) throws Exception {
        return memberSalesStatDao.getMemberDistributionStat(param);
    }

    @Override
    public List<Map<String, Object>> getMemberDistributionStatByDay(Map<String, Object> param) throws Exception {
        return memberSalesStatDao.getMemberDistributionStatByDay(param);
    }

}
