package retail.business.promotionreg.web;

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
import retail.business.promotionreg.service.PromotionRegistManageService;
import retail.business.promotionreg.service.PromotionRegistManageVO;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.product.customer.service.ProductCustomerVO;


/**
 * @Class Name : BusinessCallReceiptInput.java
 * @Description : 프로모션등록관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 이성진
 * @since 2017. 03.06
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PromotionRegistManageController {
	
	@Autowired
	private PromotionRegistManageService prmService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/promotionRegistManage.do", method = RequestMethod.GET)
	public ModelAndView promotionRegistManage(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/promotionreg/promotionRegistManage"); 
		 
		return   mav; 
	}
	
	/**
	 * 프로모션 상품마스터 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/promotionMasterSearch.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  promotionMasterSearch( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		
		param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_EVT_TP",     request.getParameter("EVT_TP"));
		param.put("P_EVT_STR_DT", request.getParameter("EVT_STR_DT"));
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = prmService.promotionMasterSearch(param);
		
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
		System.out.println("[ CUR ] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}


	/**
	 * 프로모션 적용 상품 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/promotionItemSearch.do", method = RequestMethod.POST)
	public void  promotionItemSearch( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();  
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_PMT_CODE", request.getParameter("PMT_CODE"));
		param.put("CUR"			, CUR); 
		 
		prmService.promotionItemSearch(param);
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  param.get("CUR")  );
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
 
	}

	/**
	 * 프로모션 마스터 등록    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/promotionMasterRegister.do", method = RequestMethod.POST)
	@ResponseBody
	//public   void promotionMasterRegister(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
	public    Map<String, Object>  promotionMasterRegister(HttpServletRequest request, HttpServletResponse response )throws Exception {
		Map<String, Object>  paramMap = new HashMap<String, Object>();
	    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		PromotionRegistManageVO  RETURN_CUR  = new  PromotionRegistManageVO ();
		
		
		paramMap.put("P_CORP_CODE"     	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		paramMap.put("GRID_XML_DATA"    , request.getParameter("gridXmlData" ) ) ;
		paramMap.put("P_PMT_CODE"      	, request.getParameter("PMT_CODE" )) ;
		paramMap.put("P_PMT_NAME"    	, request.getParameter("PMT_NAME" )) ;
		paramMap.put("P_EVT_STR_DT"    	, request.getParameter("EVT_STR_DT" )) ;
		paramMap.put("P_EVT_END_DT"    	, request.getParameter("EVT_END_DT" )) ;
		paramMap.put("P_TGET_CUST"     	, request.getParameter("TGET_CUST" )) ;
		paramMap.put("P_EVT_TP"      	, request.getParameter("EVT_TP" )) ;
		paramMap.put("P_ORD_STR_DT"    	, request.getParameter("ORD_STR_DT" )) ;
		paramMap.put("P_ORD_END_DT"    	, request.getParameter("ORD_END_DT" )) ;
		paramMap.put("P_PUR_COND"    	, request.getParameter("PUR_COND" )) ;
		paramMap.put("P_DC_FLAG"    	, request.getParameter("DC_FLAG" )) ;
		paramMap.put("P_BASE_AMT1"    	, request.getParameter("BASE_AMT1" )) ;
		paramMap.put("P_BASE_AMT2"    	, request.getParameter("BASE_AMT2" )) ;
		paramMap.put("P_BASE_AMT3"    	, request.getParameter("BASE_AMT3" )) ;
		paramMap.put("P_DC_AMT1"    	, request.getParameter("DC_AMT1" )) ;
		paramMap.put("P_DC_AMT2"    	, request.getParameter("DC_AMT2" )) ;
		paramMap.put("P_DC_AMT3"    	, request.getParameter("DC_AMT3" )) ;
		paramMap.put("P_RMK"      		, request.getParameter("RMK" )) ;
		paramMap.put("P_EMP_NO"      	, CommonUtil.getEnv(request.getSession()).getUserId()		) ;
		paramMap.put("RETURN_CUR"		, RETURN_CUR);
		    
		prmService.promotionMasterRegister(paramMap);
		   
		@SuppressWarnings("unchecked")
		List<PromotionRegistManageVO> RETURN_CUR_LIST = (List<PromotionRegistManageVO>) paramMap.get("RETURN_CUR"); 		  
		  
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson(  RETURN_CUR_LIST.get(0) );
		    
		paramMap.put("RETURN_CUR"	, jsonStr_RETURN_CUR );
		
		System.out.println("[ jsonStr_RETURN_CUR ] : "         + jsonStr_RETURN_CUR);
		 
		return paramMap;
		
	}
	
	/**
	 * 프로모션 Store 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/promotionStoreSearch.do", method = RequestMethod.POST)
	public void  promotionStoreSearch( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();  
		
		param.put("P_CORP_CODE"	, CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("CUR"	, CUR); 
		 
		List<Map<String, Object>> resultList = prmService.promotionStoreSearch(param);
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );

		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 
	}
	
	/**
	 * 프로모션 아이템 유효성 검사
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/promotionMasterValidation.do", method = RequestMethod.POST)
	public void  promotionMasterValidation( HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();  
		
		paramMap.put("P_CORP_CODE"	, CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_PMT_CODE"      	, request.getParameter("P_PMT_CODE" )) ;
		paramMap.put("P_EVT_STR_DT"      	, request.getParameter("P_EVT_STR_DT" )) ;
		paramMap.put("P_EVT_END_DT"      	, request.getParameter("P_EVT_END_DT" )) ;
		paramMap.put("GRID_XML_DATA"      	, request.getParameter("GRID_XML_DATA" )) ;
		paramMap.put("CUR"	, CUR); 
		 
		prmService.promotionMasterValidation(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println("jsonStr : " + jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 
	}
	
	
}
