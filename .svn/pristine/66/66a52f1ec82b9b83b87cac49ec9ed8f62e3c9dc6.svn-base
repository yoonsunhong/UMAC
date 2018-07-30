package retail.payment.incentive.web;

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
import retail.payment.incentive.service.PaymentIncentiveService;


/**
 *
 * @Class Name : PaymentIncentiveController.java
 * @Description :
 * @Modification Information
 * @
 * @   수정일         수정자                  수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.05.10     최호정                 최초생성
 *
 * @author 최호정
 * @since 2017.05.10
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PaymentIncentiveController {

    @Autowired
    private PaymentIncentiveService paymentIncentiveService;

    /**
     * 장려금생성관리 화면 이동
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/paymentIncentive.do", method = RequestMethod.GET)
    public ModelAndView paymentIncentive(HttpServletRequest request, HttpServletResponse response )throws Exception {
        ModelAndView mav = new  ModelAndView("retail/payment/incentive/paymentIncentive");
        return   mav;
    }

    /**
     * 장려금 생성 List
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/paymentIncentiveList.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> paymentIncentiveList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            SessionModel sessionModel = CommonUtil.getEnv(session);
            param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
            System.out.println("@@PARAM : " + param);

            param = paymentIncentiveService.selectPaymentIncentive(param);

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
     * 신규 장여금 리스트 생성 (insert)
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/paymentIncentiveInsert.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> paymentIncentiveInsert(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();

        try {
            // P_USER_ID
            SessionModel sessionModel = CommonUtil.getEnv(session);
            param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
            param.put("P_IEMP_NO",   sessionModel.getUserId());

            param = paymentIncentiveService.insertPaymentIncentive(param);

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
     * 장려금 정보 Update, cfm_jang_amt / remark / uemp_no
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/paymentIncentiveUpdate.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> paymentIncentiveUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {

        Map<String, Object> result = new HashMap<String, Object>();
        try {
            SessionModel sessionModel = CommonUtil.getEnv(session);
            param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
            param.put("P_UEMP_NO",   sessionModel.getUserId());

            param = paymentIncentiveService.updatePaymentIncentive(param);

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
     * 장여금 취소 (cancle)
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/paymentIncentiveCancle.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> paymentIncentiveCancle(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
    	Map<String, Object> result = new HashMap<String, Object>();

        try {
            // P_USER_ID
            SessionModel sessionModel = CommonUtil.getEnv(session);
            param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
            param.put("P_IEMP_NO",   sessionModel.getUserId());

            System.out.println("@@PARAM : " + param);
            
            param = paymentIncentiveService.deletePaymentIncentive(param);

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
