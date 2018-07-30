/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package retail.inoutcenter.mng.web;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
  

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.xml.XMLSerializer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.code.service.CodeVO;
import retail.common.CommonUtil; 
import retail.order.store.service.OrderStoreExcelVO; 
import retail.inoutcenter.mng.service.InOutCenterMngDeleteService;
import retail.inoutcenter.mng.service.InOutCenterMngDeleteVO;
import retail.product.box.service.ProductBoxVO;
import retail.product.customer.service.ProductCustomerVO;
import retail.login.service.LoginVO;
  

/**
 * @Class Name : InOutCenterMngDeleteController.java
 * @Description : 대출입 삭제
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class InOutCenterMngDeleteController {

	@Autowired
	private InOutCenterMngDeleteService   inOutCenterMngDeleteService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	 
	
	 //	대출입 삭제  화면 
	@RequestMapping(value = "/inOutCenterMngDelete.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView inoutcenterMngDelete(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/inoutcenter/mng/inOutCenterMngDelete");  
		return   mav; 
	}
	
	

	/**
	 * 대출입헤더 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/inOutCenterHeadSearchDelete.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  inOutCenterHeadSearchDelete( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("CORP_CODE"		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("INOUT_GB" 		, request.getParameter("INOUT_GB" )		) ; 
		param.put("STR_CODE"    	, request.getParameter("STR_CODE" )  	) ;  
		param.put("VEN_CODE"    	, request.getParameter("VEN_CODE" )  	) ;  
		
		param.put("DIN_OUT_DT_FROM" , request.getParameter("DIN_OUT_DT_FROM" )	) ; 
		param.put("DIN_OUT_DT_TO"   , request.getParameter("DIN_OUT_DT_TO" )	) ;  
		param.put("CFM_YN"    		, request.getParameter("CFM_YN" )		) ;  
		param.put("CUR"				, CUR	); 
		 
		List<Map<String, Object>> resultList = inOutCenterMngDeleteService.inOutCenterHeadSearchDelete(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
   
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}

	
	
	/**
	 * 대출입상품 리스트 정보 보여주기    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/inOutCenterDetailInfoDelete.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  inOutCenterDetailInfoDelete( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
 
		param.put("CORP_CODE"		  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		
		
		param.put("INOUT_GB"    	  ,  request.getParameter("INOUT_GB")						) ; 
		param.put("STR_CODE"    	  ,  request.getParameter("STR_CODE")						) ; 
		 
		param.put("SLIP_NO"    		  ,  request.getParameter("SLIP_NO")						) ; 
		param.put("CUR"				  ,  CUR													) ; 
		 
		log.debug("===========================================================================");
		log.debug("InOutCenterMngController.inOutCenterDetailInfo param :: " + param.toString());
		
		List<Map<String, Object>> resultList = inOutCenterMngDeleteService.inOutCenterDetailInfoDelete(param);
  
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
   
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
 
 
	
	/**
	 * 대출입  삭제 
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/inoutCenterDeleteAll.do", method = RequestMethod.POST)
	@ResponseBody
	public   void inoutCenterDeleteAll(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
         
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;   
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;   
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		    
		List<Map<String, Object>> resultList = inOutCenterMngDeleteService.inoutCenterDeleteAll(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	 
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 대출입  확정  취소  
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/inOutCenterConfirmCancel.do", method = RequestMethod.POST)
	@ResponseBody
	public   void inOutCenterConfirmCancel(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
 
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
        
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;   
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;  
		param.put("INOUT_GB"    	        , request.getParameter("INOUT_GB" )    						) ; 
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;  
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		   
		
		List<Map<String, Object>> resultList = inOutCenterMngDeleteService.inOutCenterConfirmCancel(param);
		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}


//	 //	report  
//	@RequestMapping(value = "/inOutCenterMngPrint.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
//	public ModelAndView inOutCenterMngPrint(HttpServletRequest request, HttpServletResponse response )throws Exception { 
//		ModelAndView mav = new  ModelAndView("retail/aireport/inoutcenter/mng/inOutCenterMngPrint");  
//		 
//		return   mav; 
//	}
//	
//	
//	
//	
//	
//	/**
//	 * 대출입  저장 ( 디테일) 업데이트     
//	 * 
//	 * @param  
//	 * @param model
//	 * @return "mav"
//	 * @exception Exception
//	 */
//	@RequestMapping(value = "/inOutRegister.do", method = RequestMethod.POST)
//	@ResponseBody
//	public   void inOutRegister(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
// 
////		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
//		ArrayList<Object> CUR = new ArrayList<Object>(); 
//	 
//		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
//		    
//		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
//		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
//		param.put("SLIP_NO"      			, request.getParameter("SLIP_NO" )    				) ;  
//		param.put("PURCH_DETAIL"      	    , request.getParameter("purchDetail" )    				) ; 
//		param.put("INOUT_GB"      	        , request.getParameter("INOUT_GB" )    				) ; 
//		
//		param.put("RETURN_CUR"	      		, RETURN_CUR);
//		   
//		
//		List<Map<String, Object>> resultList = inOutCenterMngService.inOutRegister(param);
//		   
//		Gson gson = new Gson();  
//		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
//		 
//		response.setContentType("text/json; charset=utf-8");
//		response.getWriter().print(jsonStr_RETURN_CUR);
//		  
//	}
  
	
	 
//	 //	대출입 등록 화면 
//	@RequestMapping(value = "/inoutcenterSumMng.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
//	public ModelAndView inoutcenterSumMng(HttpServletRequest request, HttpServletResponse response )throws Exception { 
//		ModelAndView mav = new  ModelAndView("retail/inoutcenter/mng/inoutcenterSumMng");  
//		return   mav; 
//	}
	
	 
}
