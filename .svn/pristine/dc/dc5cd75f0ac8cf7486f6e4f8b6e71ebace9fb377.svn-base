package retail.business.promotionsp.web;

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

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.business.promotionreg.service.PromotionRegistManageVO;
import retail.business.promotionsp.service.PromotionSpecialService;
import retail.business.promotionsp.service.PromotionSpecialVO;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.product.customer.service.ProductCustomerVO;


/**
 * @Class Name : PromotionStrItmListController.java
 * @Description : 프로모션 특단가 상품관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 이성진
 * @since 2017. 03.24
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PromotionSpecialController {
	
	@Autowired
	private PromotionSpecialService pspService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/promotionSpecial.do", method = RequestMethod.GET)
	public ModelAndView promotionSpecial(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/promotionsp/promotionSpecial"); 
		 
		return   mav; 
	}
	
	/**
	 * 프로모션 특단가 상품관리
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectPromotionSpecialCustom.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> selectPromotionSpecialCustom(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {

		Map<String, Object> result = new HashMap<String, Object>();

		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE",   	request.getParameter("P_STR_CODE"));
		param.put("P_CUST_NO",     	request.getParameter("P_CUST_NO"));
		param.put("P_STR_DT", 		request.getParameter("P_STR_DT"));

		System.out.println("param:::" + param);	
		pspService.selectPromotionSpecialCustom(param);
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		
		result.put("list", jsonList);
		result.put("totalCount", param.get("TOT_CNT"));
		
		return result;
	}

	/**
	 * 프로모션 특단가 상품관리
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectPromotionSpecialItem.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  selectPromotionSpecialItem( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		
		param.put("P_CORP_CODE",  	CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_CUST_NO",     	request.getParameter("P_CUST_NO"));
		param.put("CUR", 			CUR); 
		 
		List<Map<String, Object>> resultList = pspService.selectPromotionSpecialItem(param);
		
		Gson gson 		= new Gson(); 
		String jsonStr 	= gson.toJson(  resultList  );
 
		System.out.println("[ CUR ] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
//	@RequestMapping(value = "/selectPromotionSpecialItem.do",  method = RequestMethod.POST)
//	@ResponseBody
//	public void  selectPromotionSpecialItem( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
//		   
//		Map<String, Object>  paramMap = new HashMap<String, Object>();
// 	  
//		ArrayList<Object> CUR = new ArrayList<Object>();  
//		
//		param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
//		param.put("P_CUST_NO",   request.getParameter("P_CUST_NO"));
//		param.put("CUR"			, CUR); 
//System.out.println("param:::"+param);
//		pspService.selectPromotionSpecialItem(param);
//System.out.println("param:::"+param);		
//		Gson gson = new Gson(); 
//		String jsonStr 				= gson.toJson(  param.get("CUR")  );
// 
//		System.out.println("[ CUR ] : "         + jsonStr);
// 
//		
//		response.setContentType("text/json; charset=utf-8");
//		response.getWriter().print(jsonStr);
//		 
//	}
	
	
	/**
	 * 프로모션 특단가 적용상품 등록    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/promotionSpecialItemRegister.do", method = RequestMethod.POST)
	@ResponseBody
	public    Map<String, Object>  promotionSpecialItemRegister(HttpServletRequest request, HttpServletResponse response )throws Exception {
		Map<String, Object>  paramMap = new HashMap<String, Object>();
	    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		PromotionRegistManageVO  RETURN_CUR  = new  PromotionRegistManageVO ();
	
		paramMap.put("P_CORP_CODE"     	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		paramMap.put("GRID_XML_DATA"    , request.getParameter("GRID_XML_DATA" )) ;
		paramMap.put("P_CUST_NO"    		, request.getParameter("P_CUST_NO" )) ;
		paramMap.put("P_EMP_NO"      		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;
		paramMap.put("RETURN_CUR"			, RETURN_CUR);
		
		/* 기존버전 백업 후 XML 형태로 다시 구현 KYW */
		/*paramMap.put("P_REG_FLAG"    	, request.getParameter("P_REG_FLAG" )) ;
		paramMap.put("P_CORP_CODE"     	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		paramMap.put("P_STR_CODE"      	, request.getParameter("P_STR_CODE" )) ;
		paramMap.put("P_CUST_NO"    	, request.getParameter("P_CUST_NO" )) ;
		paramMap.put("P_SCAN_CODE"    	, request.getParameter("P_SCAN_CODE" )) ;
		paramMap.put("P_STR_DT"    		, request.getParameter("P_STR_DT" )) ;
		paramMap.put("P_END_DT"    		, request.getParameter("P_END_DT" )) ;
		paramMap.put("P_SPECIAL_SPRC"	, request.getParameter("P_SPECIAL_SPRC" )) ;
		paramMap.put("P_RMK"    		, request.getParameter("P_RMK" )) ;
		paramMap.put("P_EMP_NO"      	, CommonUtil.getEnv(request.getSession()).getUserId()		) ;
		paramMap.put("RETURN_CUR"		, RETURN_CUR);*/

		pspService.promotionSpecialItemRegister(paramMap);
		   
		@SuppressWarnings("unchecked")
		List<PromotionRegistManageVO> RETURN_CUR_LIST = (List<PromotionRegistManageVO>) paramMap.get("RETURN_CUR"); 		  
		  
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson(  RETURN_CUR_LIST.get(0) );
		    
		paramMap.put("RETURN_CUR"	, jsonStr_RETURN_CUR );
		
		System.out.println("[ jsonStr_RETURN_CUR ] : "         + jsonStr_RETURN_CUR);
		 
		return paramMap;
		
	}


	
	
}
