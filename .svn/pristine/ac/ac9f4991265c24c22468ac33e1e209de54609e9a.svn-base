package retail.salesinfo.sales.web;

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
import retail.salesinfo.sales.service.SalesPerformanceService;

import com.google.gson.Gson;

/**
 * 매출대비실적조회
 * @author 최호정
 * @since 2017.06.09
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class SalesPerformanceController {

    /** log */
    private final Log log = LogFactory.getLog(this.getClass());

    @Autowired
    private SalesPerformanceService salesPerformanceService;

    /**
     * 초기 화면 로드
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/salesPerformanceView.do", method = RequestMethod.GET)
    public ModelAndView salesPerformanceView(HttpServletRequest request, HttpServletResponse response) throws Exception { 
        ModelAndView mav = new  ModelAndView("retail/salesinfo/sales/salesPerformanceView"); 
        return   mav; 
    }

    /**
     * 매출대비실적조회
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value ="/salesPerformanceList.do",  method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> salesPerformanceList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception { 
        Gson gson = new Gson();
        String jsonStr = "";

        Map<String, Object> result = new HashMap<String, Object>();
        try{
            ArrayList<Object> CUR = new ArrayList<Object>();
            param.put("S_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
            param.put("S_STD_STR_DT", ((String)param.get("S_STD_STR_DT")).replaceAll("-",""));
            param.put("S_STD_END_DT", ((String)param.get("S_STD_END_DT")).replaceAll("-",""));
            param.put("S_CTR_STR_DT", ((String)param.get("S_CTR_STR_DT")).replaceAll("-",""));
            param.put("S_CTR_END_DT", ((String)param.get("S_CTR_END_DT")).replaceAll("-",""));
            param.put("CUR", CUR);
            log.debug("Controller param>>>>>>>>>>"+param.toString());
            List<Map<String, Object>> resultList = salesPerformanceService.getSalesPerformanceList(param);

            if(resultList.size() > 0 ){
                jsonStr = gson.toJson(resultList);
                result.put("code", "0000");
                result.put("result", jsonStr);
                //log.debug("result>>>>>>>>>"+jsonStr);
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
