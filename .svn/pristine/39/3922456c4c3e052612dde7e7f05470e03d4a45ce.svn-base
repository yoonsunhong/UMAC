package retail.product.category.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.product.category.service.ProductCategoryService;


/**
 * @Class Name : GroupGridTestController.java
 * @Description : 상품분류체계 관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2016. 12.21
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class ProductCategoryController {
	
	@Autowired
	private ProductCategoryService productService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/productCategory.do", method = RequestMethod.GET)
	public ModelAndView productCustomer(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/product/category/productCategory"); 
		 
		return   mav; 
	}
	
	/**
	 * 상품분류체계 조회 (대분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/selectLRGCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void selectLRGCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_LRG_NAME", request.getParameter("LRG_NAME"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		productService.selectLRGCode(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 상품분류체계 최대값 조회 (대분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/selectLRGMaxCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void selectLRGMaxCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		productService.selectLRGMaxCode(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 상품분류체계 조회 (중분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/selectMIDCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void selectMIDCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_LRG_CODE", request.getParameter("LRG_CODE"));
		paramMap.put("CUR", CUR);
		
		productService.selectMIDCode(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 상품분류체계 조회 (소분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/selectSMLCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void selectSMLCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_MID_CODE", request.getParameter("MID_CODE"));
		paramMap.put("CUR", CUR);
		
		productService.selectSMLCode(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 상품분류체계 저장 (대분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/registerLRGCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void registerLRGCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_LRG_CODE", request.getParameter("LRG_CODE"));
		paramMap.put("P_LRG_NAME", toTEXT(request.getParameter("LRG_NAME")));
		paramMap.put("P_ITM_GB", request.getParameter("ITM_GB"));
		paramMap.put("P_IEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		productService.registerLRGCode(paramMap);
	}
	
	/**
	 * 상품분류체계 저장 (중분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/registerMIDCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void registerMIDCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_MID_CODE", request.getParameter("MID_CODE"));
		paramMap.put("P_LRG_CODE", request.getParameter("LRG_CODE"));
		paramMap.put("P_MID_NAME", toTEXT(request.getParameter("MID_NAME")));
		paramMap.put("P_EMP_NO", request.getParameter("EMP_NO"));
		paramMap.put("P_IEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		productService.registerMIDCode(paramMap);
	}
	
	/**
	 * 상품분류체계 저장 (소분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/registerSMLCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void registerSMLCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CLS_CODE", request.getParameter("CLS_CODE"));
		paramMap.put("P_MID_CODE", request.getParameter("MID_CODE"));
		paramMap.put("P_CLS_NAME", toTEXT(request.getParameter("CLS_NAME")));
		paramMap.put("P_IEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		productService.registerSMLCode(paramMap);
	}
	
	
	/**
	 * 상품분류체계 삭제 (대분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteLRGCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void deleteLRGCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_LRG_CODE", request.getParameter("LRG_CODE"));
		paramMap.put("CUR", CUR);
		
		productService.deleteLRGCode(paramMap);
	}
	
	/**
	 * 상품분류체계 삭제 (중분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteMIDCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void deleteMIDCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_MID_CODE", request.getParameter("MID_CODE"));
		paramMap.put("P_LRG_CODE", request.getParameter("LRG_CODE"));
		paramMap.put("CUR", CUR);
		
		productService.deleteMIDCode(paramMap);
	}
	
	/**
	 * 상품분류체계 삭제 (대분류)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteSMLCode.do", method=RequestMethod.POST)
	@ResponseBody
	public void deleteSMLCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CLS_CODE", request.getParameter("CLS_CODE"));
		paramMap.put("P_MID_CODE", request.getParameter("MID_CODE"));
		paramMap.put("CUR", CUR);
		
		productService.deleteSMLCode(paramMap);
	}
	
	public static String toTEXT(String str) {
		if(str == null)
		return null;

		String returnStr = str;
		returnStr = returnStr.replaceAll("<br>", "\n");
		returnStr = returnStr.replaceAll("&gt;", ">");
		returnStr = returnStr.replaceAll("&lt;", "<");
		returnStr = returnStr.replaceAll("&quot;", "\"");
		returnStr = returnStr.replaceAll("&nbsp;", " ");
		returnStr = returnStr.replaceAll("&amp;", "&");
		returnStr = returnStr.replaceAll("\"", "&#34;");
		// returnStr = returnStr.replaceAll("&#34;", "\"");

		return returnStr;
	}

}
