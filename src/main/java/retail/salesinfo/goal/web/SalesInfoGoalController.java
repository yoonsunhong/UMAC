package retail.salesinfo.goal.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
import retail.salesinfo.goal.service.SalesInfoGoalService;

import com.google.gson.Gson;


/**
 * 
 * @Class Name : SalesInfoGoalController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.20           최초생성
 *
 * @author 김창열
 * @since 2016. 12. 20.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class SalesInfoGoalController {

	@Autowired
	private SalesInfoGoalService salesInfoGoalService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 매출목표관리  
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesInfoGoal.do", method = RequestMethod.GET)
	public ModelAndView salesInfoGoal(@RequestParam Map<String, Object> param, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/salesinfo/goal/salesInfoGoal"); 
				
		return mav; 
	}

	/**
	 * 매출목표관리 리스트 (매출/매출이익 목표)
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesInfoGoalList.do", method = RequestMethod.POST)
	@ResponseBody
	public void salesInfoGoalList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		try {
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoGoalList param :: " + param.toString());					
			
			List<Map<String, Object>> resultList = salesInfoGoalService.salesInfoGoalList(param);			
			log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}
	
	/**
	 * 매출목표관리 리스트(상품분류별 목표)  
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesInfoGoalGoodsList.do", method = RequestMethod.POST)
	@ResponseBody
	public void salesInfoGoalGoodsList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		try {
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoGoalGoodsList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoGoalService.salesInfoGoalGoodsList(param);			
			log.debug("result :: " + resultList);	
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}	
	
	/**
	 * 매출목표관리 팝업  
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesInfoGoalPopBefore.do", method = RequestMethod.POST)
	@ResponseBody
	public void salesInfoGoalPopBefore(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		try {
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoGoalPopBefore param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoGoalService.salesInfoGoalPopBefore(param);			
			log.debug("result :: " + resultList);	
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}	
	
	/**
	 * 매출목표관리 팝업 저장  
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesInfoGoalPopInsert.do", method = RequestMethod.POST)
	@ResponseBody
	public void salesInfoGoalPopInsert(HttpServletRequest request, HttpServletResponse response)throws Exception{
		try {
			String json = jsonStringParser(request, "menus");
			log.debug(json);
			
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObject = (JSONObject) jsonParser.parse(json);			
			JSONArray arrMenus = (JSONArray) jsonObject.get("menus");
			Map<String, Object>  paramMap = new HashMap<String, Object>();
			Map<String, Object>  paramMap2 = new HashMap<String, Object>();
			
			JSONObject tempObj2 = (JSONObject) arrMenus.get(0);
			//tempObj2.get("YYYYMM").toString().substring(0,4);
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoGoalPopInsert YYYYMM :: " + tempObj2.get("YYYYMM").toString());
			log.debug("SalesInfoGoalController.salesInfoGoalPopInsert STR_CODE :: " + tempObj2.get("STR_CODE").toString());
			log.debug("SalesInfoGoalController.salesInfoGoalPopInsert P_CORP_CODE :: " + CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			//기존 데이터 삭제
			paramMap2.put("P_YYYYMM", tempObj2.get("YYYYMM").toString());
			paramMap2.put("P_STR_CODE", tempObj2.get("STR_CODE").toString());
			paramMap2.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			salesInfoGoalService.salesInfoGoalPopDelete(paramMap2);
			
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoGoalPopInsert ::");
			for(int i=0; i<arrMenus.size(); i++) {
				JSONObject tempObj = (JSONObject) arrMenus.get(i);
				log.debug(tempObj);		
				
				paramMap.put("P_STR_CODE", tempObj.get("STR_CODE").toString());
				paramMap.put("P_SALE_PROFIT", tempObj.get("SALE_PROFIT").toString());
				paramMap.put("P_MID_CODE", tempObj.get("MID_CODE").toString());
				paramMap.put("P_YYYYMM", tempObj.get("YYYYMM").toString());
				paramMap.put("P_GOAL_AMT", tempObj.get("GOAL_AMT").toString());
				paramMap.put("P_IEMP_NO", tempObj.get("IEMP_NO").toString());
				paramMap.put("P_CFM_YN", tempObj.get("CFM_YN").toString());
				paramMap.put("P_CORP_CODE", tempObj.get("CORP_CODE").toString());
				
				salesInfoGoalService.salesInfoGoalPopInsert(paramMap);
				//log.debug(tempObj.get("SALE_PROFIT").toString());
			}			
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}		
	
	
	/**
	 * 매출목표관리 팝업에서 점포명과 년도로 이미 등록된 데이터가 있느지 확인
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesInfoGoalPopSearch.do", method = RequestMethod.POST)
	@ResponseBody
	public void salesInfoGoalPopSearch(HttpServletRequest request, HttpServletResponse response)throws Exception{
		try {
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoGoalPopSearch param :: " + request.getParameter("P_STR_CODE"));
			log.debug("SalesInfoGoalController.salesInfoGoalPopSearch param :: " + request.getParameter("P_CREAT_YYYY"));
			log.debug("SalesInfoGoalController.salesInfoGoalPopSearch P_CORP_CODE :: " + CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			Map<String, Object>  paramMap = new HashMap<String, Object>();
			paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
			paramMap.put("P_CREAT_YYYY", request.getParameter("P_CREAT_YYYY"));
			paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			Map<String, Object> resultList = salesInfoGoalService.salesInfoGoalPopSearch(paramMap);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList.get("CT"));
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}
	
	/**
	 * 매출목표관리 확정
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesInfoGoalDcsnUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public void salesInfoGoalDcsnUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		try {
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoGoalDcsnUpdate param :: " + param.toString());
			salesInfoGoalService.salesInfoGoalDcsnUpdate(param);
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}
	
	/**
	 * 매출목표관리 삭제
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesInfoGoalDcsnDelete.do", method = RequestMethod.POST)
	@ResponseBody
	public void salesInfoGoalDcsnDelete(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		try {
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoGoalDcsnDelete param :: " + param.toString());
			salesInfoGoalService.salesInfoGoalDcsnDelete(param);
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}	
	
	/**
	 * 매출목표관리 확정여부 체크 
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesInfoGoalDcsnYn.do", method = RequestMethod.POST)
	@ResponseBody
	public void salesInfoGoalDcsnYn(HttpServletRequest request, HttpServletResponse response)throws Exception{
		try {			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoGoalDcsnYn param P_STR_CODE :: " + request.getParameter("P_STR_CODE"));
			log.debug("SalesInfoGoalController.salesInfoGoalDcsnYn param P_YYYY :: " + request.getParameter("P_YYYY"));
			log.debug("SalesInfoGoalController.salesInfoGoalDcsnYn param P_CORP_CODE :: " + CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			Map<String, Object>  paramMap = new HashMap<String, Object>();
			paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
			paramMap.put("P_YYYY", request.getParameter("P_YYYY"));
			paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			Map<String, Object> resultList = salesInfoGoalService.salesInfoGoalDcsnYn(paramMap);
			log.debug("SalesInfoGoalController.salesInfoGoalDcsnYn resultList :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList.get("CMF_YN"));
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
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













