package retail.purch.R3.web;

import java.io.IOException;
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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.purch.R3.service.PurchR3StateService;

/**
 *
 * @Class Name : PurchR3StateController.java
 * @Description :
 * @Modification Information
 * @
 * @  수정일                수정자                                수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.05.22    최호정             최초생성
 *
 * @author
 * @since 2017-05-22
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller

public class PurchR3StateController {

    /** log */
    private final Log log = LogFactory.getLog(this.getClass());

    @RequestMapping(value="/purchR3State.do", method=RequestMethod.GET)
    public ModelAndView itemSalesState(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
        String s_type = request.getParameter("type1")==null?"":request.getParameter("type1");
        /*
        request.setAttribute("ISLOGIN", "Y");
        request.setAttribute("CONF",    "00");
        request.setAttribute("USERNAME", "");
        request.setAttribute("CORP_CODE", "");

        request.setAttribute("URL_GUBN", s_type);

        SessionModel env = new SessionModel();
        env.setUserId("retail");
        env.setUserNm("테스트");
        env.setCORP_CODE("U1");

        env.setGROUP_CODE("");
        env.setSTR_CODE("10015");
        env.setSTR_NAME("외부2");
        env.setDEPT_CODE("");
        env.setPOSITION("");
        env.setEMP_DUTY("");
        env.setSYS_CODE("");
        env.setLIMIT_LEVEL("");
        env.setROLE_ID("");

        //사용자 권한별 버튼 활성권한 저장
        env.setAUTH_SEARCH("Y");
        env.setAUTH_NEW("Y");
        env.setAUTH_SAVE("Y");
        env.setAUTH_DELETE("Y");
        env.setAUTH_EXCEL_DOWN("Y");
        env.setAUTH_EXCEL_UPLOAD("Y");
        env.setAUTH_PRINT("Y");
        env.setAUTH_SUBMIT("Y");
        env.setAUTH_CREATE("Y");
        CommonUtil.setEnv(request.getSession(), env);
        */
        //retail.purch.R3.web
        String url = "";
        if(s_type.equals("V1")){
            //상품별일자별매입현황
            url = "retail/purch/R3/purchaseStateByDayProduct";
        }
        else if (s_type.equals("V2")){
            //단품별매입/판매가현황
            url = "retail/purch/R3/salePriceStateByItem";
        }
        else if (s_type.equals("V3")){
            //직매입현황출력
            url = "retail/purch/R3/r3PurchaseState";
        }
        else if (s_type.equals("V4")){
            //상품별매입단가현황
            url = "retail/purch/R3/purchaseUnitPriceByProduct";
        }
        ModelAndView mav = new ModelAndView(url);
        return mav;
    }

    @RequestMapping(value="/purchaseStateByDayProduct.do", method=RequestMethod.GET)
    public ModelAndView purchaseStateByDayProduct(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
        String url = "retail/purch/R3/purchaseStateByDayProduct";
        ModelAndView mav = new ModelAndView(url);
        return mav;
    }

    @RequestMapping(value="/salePriceStateByItem.do", method=RequestMethod.GET)
    public ModelAndView salePriceStateByItem(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
        String url = "retail/purch/R3/salePriceStateByItem";
        ModelAndView mav = new ModelAndView(url);
        return mav;
    }

    @RequestMapping(value="/r3PurchaseState.do", method=RequestMethod.GET)
    public ModelAndView r3PurchaseState(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
        String url = "retail/purch/R3/r3PurchaseState";
        ModelAndView mav = new ModelAndView(url);
        return mav;
    }

    @RequestMapping(value="/purchaseUnitPriceByProduct.do", method=RequestMethod.GET)
    public ModelAndView purchaseUnitPriceByProduct(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
        String url = "retail/purch/R3/purchaseUnitPriceByProduct";
        ModelAndView mav = new ModelAndView(url);
        return mav;
    }

    @Autowired
    private PurchR3StateService purchR3StateService;

    /**
     * @param request
     * @param response
     * @throws IOException
     * @throws Exception
     */
    @RequestMapping(value ="/purchR3StateSearch.do",  method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> purchR3StateSearch(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws IOException {
        //client에서 던지고 싶은 URL을 호출한다. param의 해당 url은 sqlMap하고 일치, 하나로 통일
        Gson gson = new Gson();
        String jsonStr = "";

        Map<String, Object> result = new HashMap<String, Object>();
        try{
            ArrayList<Object> CUR = new ArrayList<Object>();
            param.put("S_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
            param.put("S_STR_DT",  ((String)param.get("S_STR_DT")).replaceAll("-", ""));
            param.put("S_END_DT",  ((String)param.get("S_END_DT")).replaceAll("-", ""));
            param.put("CUR", CUR);
            log.debug("param>>>>>>>>>>"+param.toString());
            List<Map<String, Object>> resultList = purchR3StateService.purchR3StateList(param);

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
