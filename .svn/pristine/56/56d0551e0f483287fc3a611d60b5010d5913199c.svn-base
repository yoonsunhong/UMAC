package retail.payment.limit.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.common.CommonUtil;
import retail.common.SessionModel;
import retail.payment.limit.service.PaymentLimitService;

import com.google.gson.Gson;

/**
 * 
 * @Class Name : PaymentLimitController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.01           최초생성
 *
 * @author 오동근
 * @since 2017. 02. 01.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PaymentLimitController {
	
	@Autowired
	private PaymentLimitService paymentLimitService;
	
	/**
	 * 업체별 여신한도관리 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLimitInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentLimitInfo(HttpServletRequest limit, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/payment/limit/paymentLimitInfo");
		return   mav; 
	}
	
	/**
	 * 업체별 여신한도관리 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLimitInfoList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> PaymentLimitList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = paymentLimitService.selectPaymentLimit(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 공제등록 관리 Update
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLimitUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentLimitUpdate(HttpServletRequest request, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			String json = jsonStringParser(request, "menus");
			System.out.println("json : " + json);
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObject = (JSONObject) jsonParser.parse(json);			
			JSONArray arrMenus = (JSONArray) jsonObject.get("menus");
			
			Map<String, Object>  param = new HashMap<String, Object>();
			
			for(int i=0; i<arrMenus.size(); i++) {
				JSONObject tempObj = (JSONObject) arrMenus.get(i);
				System.out.println("@@tempObj : " + tempObj);
				
				if(tempObj.get("P_CORP_CODE") == null || tempObj.get("P_CORP_CODE") == ""){
					result.put("RETURN_CODE", "-4");
					result.put("RETURN_MSG", "기업코드를 입력해주세요.");
					return result;
				}else{
					param.put("P_CORP_CODE", 	tempObj.get("P_CORP_CODE").toString());
				}
				if(tempObj.get("P_PAY_YM") == null || tempObj.get("P_PAY_YM") == ""){
					result.put("RETURN_CODE", "-4");
					result.put("RETURN_MSG", "지불년월을 입력해주세요.");
					return result;
				}else{
					param.put("P_PAY_YM", 		tempObj.get("P_PAY_YM").toString());
				}
				if(tempObj.get("P_VEN_CODE") == null || tempObj.get("P_VEN_CODE") == ""){
					result.put("RETURN_CODE", "-4");
					result.put("RETURN_MSG", "협력업체코드를 입력해주세요.");
					return result;
				}else{
					param.put("P_VEN_CODE", 	tempObj.get("P_VEN_CODE").toString());
				}
				if(tempObj.get("P_PAY_SEQ") == null || tempObj.get("P_PAY_SEQ") == ""){
					result.put("RETURN_CODE", "-4");
					result.put("RETURN_MSG", "지불차수를 입력해주세요.");
					return result;
				}else{
					param.put("P_PAY_SEQ", 		tempObj.get("P_PAY_SEQ").toString());
				}
				if(tempObj.get("P_PUR_AMT") == null || tempObj.get("P_PUR_AMT") == ""){
					param.put("P_PUR_AMT", "0");
				}else{
					param.put("P_PUR_AMT", 		tempObj.get("P_PUR_AMT").toString());
				}
				if(tempObj.get("P_PAY_AMT") == null || tempObj.get("P_PAY_AMT") == ""){
					param.put("P_PAY_AMT", "0");
				}else{
					param.put("P_PAY_AMT", 		tempObj.get("P_PAY_AMT").toString());
				}
				if(tempObj.get("P_ADJUST_AMT") == null || tempObj.get("P_ADJUST_AMT") == ""){
					param.put("P_ADJUST_AMT", "0");
				}else{
					param.put("P_ADJUST_AMT", 	tempObj.get("P_ADJUST_AMT").toString());
				}
				if(tempObj.get("P_IEMP_NO") == null || tempObj.get("P_IEMP_NO") == ""){
					param.put("P_IEMP_NO", "");
				}else{
					param.put("P_IEMP_NO", 		tempObj.get("P_IEMP_NO").toString());
				}
				
				param = paymentLimitService.updatePaymentLimit(param);
			}
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	private String jsonStringParser(HttpServletRequest request, String key)
	{
		String rtnVal = null;
		
		try
		{
			
			StringBuffer json = new StringBuffer();
			String line = null;
			
			BufferedReader reader = request.getReader();
			
			while ((line = reader.readLine()) != null) {
				json.append(line);
			}
			
			if(key != null && !key.equals(""))
			{
				rtnVal = "{\"" + key + "\":" + json.toString() + "}";
				System.out.println("rtnVal : " + rtnVal);
			}
			else
			{
				rtnVal = json.toString();
			}
		}
		catch(IOException e)
		{
			System.err.println("IOException Occured");
		}
		
		return rtnVal;
	}

}
