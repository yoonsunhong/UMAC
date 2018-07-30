package retail.business.manage.web;

import java.util.HashMap;
import java.util.List;
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

import retail.business.manage.service.BusinessManageService;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.common.SessionModel;
import retail.posmaster.info.service.PosMasterInfoService;

import com.google.gson.Gson;

@Controller
public class BusinessManageController {
	
	@Autowired
	private BusinessManageService businessManageService;
	
	@Autowired
	private PosMasterInfoService posMasterInfoService;
	
	/**
	 * 카드프리픽스 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessManageCardInfo.do", method = RequestMethod.GET)
	public ModelAndView businessManageCardInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/manage/businessManageCard");
		return   mav; 
	}
	
	/**
	 * 주류판매대장관리 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessManageDrinkInfo.do", method = RequestMethod.GET)
	public ModelAndView businessManageDrinkInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/manage/businessManageDrink");
		return   mav; 
	}
	
	/**
	 * 카드프리픽스 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessManageCardList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> businessManageCardList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = businessManageService.selectBusinessManageCard(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			String codeList = gson.toJson(  param.get("CUR2") );
			result.put("list", jsonList);
			result.put("codeList", codeList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 카드프리픽스 Insert
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessManageCardUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> businessManageCardUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = businessManageService.insertBusinessManageCard(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 주류판매대장 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessManageDrinkList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> businessManageDrinkList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			List<Map<String, Object>> resultList = businessManageService.selectBusinessManageDrink(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson( resultList );
			
			//System.out.println(jsonList);
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 주류판매대장 Update
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessManageDrinkUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> businessManageDrinkUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = businessManageService.updateBusinessManageDrink(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

}
