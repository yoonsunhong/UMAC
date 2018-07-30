package retail.salesinfo.creditcard.web;

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
import retail.salesinfo.creditcard.service.CCPaymentStatusService;

import com.google.gson.Gson;

/**
 * 신용카드지불현황
 * @author 최호정
 * @since 2017.06.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class CCPaymentStatusController {
    /** log */
    private final Log log = LogFactory.getLog(this.getClass());

    @Autowired
    private CCPaymentStatusService ccPaymentStatusService;

    /**
     * 초기 화면 로드
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/ccPaymentStatus.do", method = RequestMethod.GET)
    public ModelAndView ccPaymentStatus(HttpServletRequest request, HttpServletResponse response) throws Exception { 
        ModelAndView mav = new  ModelAndView("retail/salesinfo/creditcard/ccPaymentStatus"); 
        return   mav; 
    }

    /**
     * 신용카드지불현황
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value ="/ccPaymentStatusList.do",  method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> ccPaymentStatusList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception { 
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
            List<Map<String, Object>> resultList = ccPaymentStatusService.getPaymentStatusList(param);

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
    /**
     * 신용카드지불현황 저장
     * @param request
     * @param response
     * @throws Exception
     */
	@RequestMapping(value = "/saveCcPaymentStatus.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveWmsOutCnt(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		String P_GRID_XML_DATA = request.getParameter("gridXmlData" ); 
		
		System.out.println("GRID_XML_DATA : " + P_GRID_XML_DATA );
		 
		param.put("P_CORP_CODE"    		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_GRID_XML_DATA"    , P_GRID_XML_DATA ) ;   
		param.put("CUR"	     	, CUR);
		
		
		
		//WMS 출고 저장.
		ccPaymentStatusService.saveCcPaymentStatus(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  param.get("CUR") );
		param.put("CUR"	, jsonStr);           
				
		return param;
	}

}
