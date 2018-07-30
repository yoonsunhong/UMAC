package retail.wms.stock.wmsStockDivision.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.common.SessionModel;
import retail.wms.stock.wmsStockDivision.service.WmsStockDivisionService;

/**
*
* @Class Name : WmsStockDivisionController.java
* @Description :
* @Modification Information
* @
* @   수정일         수정자                  수정내용
* @ ---------   ---------   -------------------------------
* @ 2017.05.15     최호정                 최초생성
*
* @author 최호정
* @since 2017.05.15
* @version 1.0
* @see Copyright (C) by Retailtech All right reserved.
*/
@Controller
public class WmsStockDivisionController {

    @Autowired
    private WmsStockDivisionService wmsStockDivisionService;

    /**
     * 소분상품관리 화면 이동
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/wmsStockDivision.do", method = RequestMethod.GET)
    public ModelAndView wmsStockDivision(HttpServletRequest request, HttpServletResponse response ) throws Exception {
        ModelAndView mav = new  ModelAndView("retail/wms/stock/wmsStockDivision/wmsStockDivision");
        return   mav;
    }

    /**
     * 소분상품으로 관리할 상품 검색
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/wmsStockDivisionItem.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> wmsStockDivisionItem(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            SessionModel sessionModel = CommonUtil.getEnv(session);
            param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
            param.put("P_STR_CODE",  sessionModel.getSTR_CODE());
            System.out.println("@@SEARCH-PARAM : " + param);

            param = wmsStockDivisionService.searchWmsStockDivisionItem(param);

            Gson gson = new Gson();
            String jsonList = gson.toJson( param.get("CUR") );
            System.out.println("@@RESULT : " + jsonList);
            result.put("list", jsonList);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 소분상품 List
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/wmsStockDivisionList.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> wmsStockDivisionList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            SessionModel sessionModel = CommonUtil.getEnv(session);
            param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
            System.out.println("@@SELECT-PARAM : " + param);

            param = wmsStockDivisionService.selectWmsStockDivisionList(param);

            Gson gson = new Gson();
            String jsonList = gson.toJson( param.get("CUR") );
            result.put("list", jsonList);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 신규 소분상품 생성 (insert)
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/wmsStockDivisionInsert.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> wmsStockDivisionInsert(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        try {
            // P_USER_ID
            SessionModel sessionModel = CommonUtil.getEnv(session);
            param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
            param.put("P_IEMP_NO",   sessionModel.getUserId());
            System.out.println("@@INSERT-PARAM : " + param);

            param = wmsStockDivisionService.insertWmsStockDivisionItem(param);

            System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
            System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));

            result.put("RETURN_CODE", param.get("RETURN_CODE"));
            result.put("RETURN_MSG", param.get("RETURN_MSG"));
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    /**
     * 소분상품 정보 수정 (update)
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/wmsStockDivisionUpdate.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> wmsStockDivisionUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        try {
            // P_USER_ID
            SessionModel sessionModel = CommonUtil.getEnv(session);
            param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
            param.put("P_UEMP_NO",   sessionModel.getUserId());
            System.out.println("@@UPDATE-PARAM : " + param);

            param = wmsStockDivisionService.updateWmsStockDivisionItem(param);

            System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
            System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));

            result.put("RETURN_CODE", param.get("RETURN_CODE"));
            result.put("RETURN_MSG", param.get("RETURN_MSG"));
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    /**
     * 소분상품 정보 확정 (Confirm)
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/wmsStockDivisionConfirm.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> wmsStockDivisionConfirm(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        try {
            // P_USER_ID
            SessionModel sessionModel = CommonUtil.getEnv(session);
            param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
            System.out.println("@@UPDATE-PARAM : " + param);

            param = wmsStockDivisionService.confirmWmsStockDivisionItem(param);

            System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
            System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));

            result.put("RETURN_CODE", param.get("RETURN_CODE"));
            result.put("RETURN_MSG", param.get("RETURN_MSG"));
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

}
