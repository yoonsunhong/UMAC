package retail.member.stat.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.common.CommonUtil;
import retail.member.stat.service.MemberSalesStatService;

import com.google.gson.Gson;

/**
 * 사업자매출현황
 * @author 최호정
 * @since 2017.05.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class MemberSalesStatController {

    /** log */
    private final Log log = LogFactory.getLog(this.getClass());

    @Autowired
    private MemberSalesStatService mStatService;

    /**
     * 초기 화면 로드
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/memberSalesStat.do", method = RequestMethod.GET)
    public ModelAndView salesTr(HttpServletRequest request, HttpServletResponse response )throws Exception { 
        ModelAndView mav = new  ModelAndView("retail/member/stat/memberSalesStat"); 
        return   mav; 
    }
    
    /**
     * 사업자회원매출
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value ="/memberSalesStatList.do",  method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> memberSalesStatList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response)throws Exception { 
        Gson gson = new Gson();
        String jsonStr = "";

        Map<String, Object> result = new HashMap<String, Object>();
        try{
            ArrayList<Object> CUR = new ArrayList<Object>();
            param.put("S_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
            param.put("S_STR_DATE", ((String)param.get("S_STR_DATE")).replaceAll("-",""));
            param.put("S_END_DATE", ((String)param.get("S_END_DATE")).replaceAll("-",""));
            param.put("CUR", CUR);
            log.debug("Controller param>>>>>>>>>>"+param.toString());
            List<Map<String, Object>> resultList = mStatService.getMemberSalesStat(param);

            if(resultList.size() > 0 ){
                jsonStr = gson.toJson(resultList);
                result.put("code", "0000");
                result.put("result", jsonStr);
                //log.debug("result>>>>>>>>>"+result);
            }
            else{
                result.put("code", "9999");
                result.put("Alert", "조회된 건이 없습니다");
                log.debug("result>>>>>>>>>"+result);
            }
            return result;
        }
        catch(Exception e){
            result.put("code", "9999");
            result.put("Alert", e.getMessage());
            log.error("ERROR>>>>>>>>>>"+result);
            return result;
        }
    }

    /**
     * 일별요일별 매출
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value ="/memberStatByDayList.do",  method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object>  memberStatByDayList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response)throws Exception { 
        Gson gson = new Gson();
        String jsonStr = "";

        Map<String, Object> result = new HashMap<String, Object>();
        try{
            ArrayList<Object> CUR = new ArrayList<Object>();
            param.put("S_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
            param.put("I_STR_DATE", ((String)param.get("I_STR_DATE")).replaceAll("-",""));
            param.put("I_END_DATE", ((String)param.get("I_END_DATE")).replaceAll("-",""));
            param.put("CUR", CUR);
            log.debug("Controller param>>>>>>>>>>"+param.toString());
            List<Map<String, Object>> resultList = mStatService.getMemberStatByDay(param);

            if(resultList.size() > 0 ){
                jsonStr = gson.toJson(resultList);
                result.put("code", "0000");
                result.put("result", jsonStr);
                //log.debug("result>>>>>>>>>"+result);
            }
            else{
                result.put("code", "9999");
                result.put("Alert", "조회된 건이 없습니다");
                log.debug("result>>>>>>>>>"+result);
            }
            return result;
        }
        catch(Exception e){
            result.put("code", "9999");
            result.put("Alert", e.getMessage());
            log.error("ERROR>>>>>>>>>>"+result);
            return result;
        }
    }
}
