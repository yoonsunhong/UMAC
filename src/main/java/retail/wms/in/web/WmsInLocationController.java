package retail.wms.in.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.wms.in.service.WmsInLocationService;

/**
 * @Class Name : WmsInLocationController.java
 * @Description : WMS Location 관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 01.25
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class WmsInLocationController {
	
	@Autowired
	private WmsInLocationService wmsService;
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsInLocation.do", method = RequestMethod.GET)
	public ModelAndView wmsInLocation(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/wms/in/wmsInLocation/wmsInLocation"); 
		 
		return   mav;  
	}
	
	@RequestMapping(value = "/selectWmsInZone.do", method = RequestMethod.POST)
	public void selectWmsInZone (HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("CUR", CUR);
		
		wmsService.selectWmsInZone(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	@RequestMapping(value = "/selectWmsInRack.do", method = RequestMethod.POST)
	public void selectWmsInRack (HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_ZONE_CODE", request.getParameter("ZONE_CODE"));
		paramMap.put("CUR", CUR);
		
		wmsService.selectWmsInRack(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	@RequestMapping(value = "/selectWmsInLine.do", method = RequestMethod.POST)
	public void selectWmsInLine (HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_RACK_CODE", request.getParameter("RACK_CODE"));
		paramMap.put("CUR", CUR);
		
		
		wmsService.selectWmsInLine(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	@RequestMapping(value = "/selectWmsInCategory.do", method = RequestMethod.POST)
	public void selectWmsInCategory (HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_LINE_CODE", request.getParameter("LINE_CODE"));
		paramMap.put("CUR", CUR);
		
		wmsService.selectWmsInCategory(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	@RequestMapping(value = "/selectWmsInCategoryPop.do", method = RequestMethod.POST)
	public void selectWmsInCategoryPop (HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_SEARCH_WORD", request.getParameter("SEARCH_WORD"));
		paramMap.put("CUR", CUR);
		
		System.out.println("selectWmsInCategoryPop : " + request.getParameter("SEARCH_WORD"));
		
		wmsService.selectWmsInCategoryPop(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	@RequestMapping(value = "/registWmsInLocation.do", method = RequestMethod.POST)
	public void registWmsInLocation (HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_GRID_DATA1_YN", request.getParameter("P_GRID_DATA1_YN"));
		paramMap.put("P_GRID_DATA2_YN", request.getParameter("P_GRID_DATA2_YN"));
		paramMap.put("P_GRID_DATA3_YN", request.getParameter("P_GRID_DATA3_YN"));
		paramMap.put("P_GRID_DATA4_YN", request.getParameter("P_GRID_DATA4_YN"));
		paramMap.put("GRID_XML_DATA1", request.getParameter("gridXmlData1"));
		paramMap.put("GRID_XML_DATA2", request.getParameter("gridXmlData2"));
		paramMap.put("GRID_XML_DATA3", request.getParameter("gridXmlData3"));
		paramMap.put("GRID_XML_DATA4", request.getParameter("gridXmlData4"));
		paramMap.put("CUR", CUR);
		
		System.out.println("selectWmsInCategoryPop : " + request.getParameter("SEARCH_WORD"));
		
		wmsService.registWmsInLocation(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}

}
