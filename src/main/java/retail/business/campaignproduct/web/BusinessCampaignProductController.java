package retail.business.campaignproduct.web;

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
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.business.campaignproduct.service.BusinessCampaignProductService;
import retail.common.CommonUtil;


/**
 * @Class Name : GroupGridTestController.java
 * @Description : 행사상품마스터관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2016. 01.02
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class BusinessCampaignProductController {
	
	@Autowired
	private BusinessCampaignProductService bcpService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCampaignProduct.do", method = RequestMethod.GET)
	public ModelAndView businessCampaignProduct(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/campaignproduct/businessCampaignProduct"); 
		 
		return   mav; 
	}
	
	/**
	 * 행사상품마스터 등록을 위한 상세 상품 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectDetailProduct.do", method = RequestMethod.POST)
	public void selectDetailProduct(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_ITM_CODE", request.getParameter("ITM_CODE"));
		paramMap.put("CUR", CUR);
		
		String ORG_TYPE = request.getParameter("ORG_TYPE");
		
		if(ORG_TYPE == "3"){
			bcpService.selectDetailProduct(paramMap);
		}else{
			bcpService.selectDetailProductCmn(paramMap);
		}
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 행사상품마스터 등록
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/campaignProductRegist.do", method = RequestMethod.POST)
	public void campaignProductRegist(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("GRID_XML_DATA2"    , request.getParameter("gridXmlData2" ) ) ;
		paramMap.put("P_EVT_CODE"    , request.getParameter("EVT_CODE" ) ) ;
		paramMap.put("P_EVT_STR_DT"    , request.getParameter("EVT_STR_DT" ) ) ;
		paramMap.put("P_EVT_END_DT"    , request.getParameter("EVT_END_DT" ) ) ;
		paramMap.put("P_ORD_STR_DT"    , request.getParameter("ORD_STR_DT" ) ) ;
		paramMap.put("P_ORD_END_DT"    , request.getParameter("ORD_END_DT" ) ) ;
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		bcpService.campaignProductRegist(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	@RequestMapping(value = "/campaignProductRegistExcel.do", method = RequestMethod.POST)
	public void campaignProductRegistExcel(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("GRID_XML_DATA"    , request.getParameter("gridXmlData" ) ) ;
		paramMap.put("GRID_XML_DATA2"    , request.getParameter("gridXmlData2" ) ) ;
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		bcpService.campaignProductRegistExcel(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	@RequestMapping(value = "/selectEVTItem.do", method = RequestMethod.POST)
	public void selectEVTItem(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_EVT_CODE"    , request.getParameter("EVT_CODE" ) ) ;
		paramMap.put("P_STR_CODE"    , request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_VEN_CODE"    , request.getParameter("P_VEN_CODE" ) ) ;
		paramMap.put("P_ITM_CODE"    , request.getParameter("P_ITM_CODE" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcpService.selectEVTItem(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	@RequestMapping(value = "/selectUserOrgType.do", method = RequestMethod.POST)
	public void selectUserOrgType(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		bcpService.selectUserOrgType(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 행사상품마스터 등록
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/campaignProductExcelLoad.do", method = RequestMethod.POST)
	public void campaignProductExcelLoad(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("GRID_XML_DATA"    , request.getParameter("GRID_XML_DATA" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcpService.campaignProductExcelLoad(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	@RequestMapping(value = "/selectBusinessCampaignItmChk.do", method = RequestMethod.POST)
	public void selectBusinessCampaignItmChk(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_EVT_CODE", request.getParameter("P_EVT_CODE" ));
		paramMap.put("P_SCAN_CODE", request.getParameter("P_SCAN_CODE" ));
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ));
		paramMap.put("CUR", CUR);
		
		bcpService.selectBusinessCampaignItmChk(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}

}
