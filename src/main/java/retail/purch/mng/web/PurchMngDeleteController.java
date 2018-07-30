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
package retail.purch.mng.web;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.common.CommonUtil;
import retail.common.SessionModel;
import retail.order.store.service.OrderStoreExcelVO;
//import retail.product.customer.service.ProductCustomerVO;
import retail.purch.mng.service.PurchMngDeleteService;
import retail.purch.mng.service.PurchMngDeleteVO;

import com.google.gson.Gson;
 

/**
 * @Class Name : PurchMngController.java
 * @Description : 매입
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class PurchMngDeleteController {

	@Autowired
	private PurchMngDeleteService   purchMngDeleteService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	 
	
	 //	매입 삭제 화면 
	@RequestMapping(value = "/purchMngDelete.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView purchMngDelete(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/purch/mng/purchMngDelete");  
		return   mav; 
	}
	
	

	/**
	 * 매입헤더 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchHeadSearchDelete.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  purchHeadSearch( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("CORP_CODE"	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("STR_CODE"    , request.getParameter("STR_CODE" )  	) ;  
		param.put("VEN_CODE" 	, request.getParameter("VEN_CODE" )		) ; 
		param.put("PUR_DT_FROM" , request.getParameter("PUR_DT_FROM" )	) ; 
		param.put("PUR_DT_TO"   , request.getParameter("PUR_DT_TO" )	) ; 
		param.put("PUR_GB"    	, request.getParameter("PUR_GB" )		) ; 
		param.put("CFM_YN"    	, request.getParameter("CFM_YN" )		) ; 
		param.put("PUR_CFM_DT"  , request.getParameter("PUR_CFM_DT" )	) ; 
		param.put("SLIP_NO"     , request.getParameter("SLIP_NO" )		) ; 
		
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = purchMngDeleteService.purchHeadSearchDelete(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
   
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	
	/**
	 * 매입상품 리스트 정보 보여주기    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchDetailInfoDelete.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  purchDetailInfo( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
 
		param.put("CORP_CODE"		  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ; 
		param.put("PUR_DT"    		  ,  request.getParameter("PUR_DT")							) ; 
		param.put("STR_CODE"    ,  request.getParameter("STR_CODE")					) ; 
		param.put("SLIP_NO"    		  ,  request.getParameter("SLIP_NO")						) ; 
		param.put("CUR"				  ,  CUR													); 
		 
		List<Map<String, Object>> resultList = purchMngDeleteService.purchDetailInfoDelete(param);
  
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
   
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 매입  삭제 등록      
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchDeleteAll.do", method = RequestMethod.POST)
	@ResponseBody
	public   void purchConfirm(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
         
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;   
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;   
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		    
		List<Map<String, Object>> resultList = purchMngDeleteService.purchDeleteAll(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	 
	
	
	
	/**
	 * 매입  날짜 수정 등록      
	 *   
	 * @param   
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchChangeDate.do", method = RequestMethod.POST)
	@ResponseBody
	public   void purchChangeDate(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
         
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;   
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;   
		param.put("PUR_DT_CHG"    	        , request.getParameter("PUR_DT_CHG" )    				    ) ;  
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;    
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		    
		List<Map<String, Object>> resultList = purchMngDeleteService.purchChangeDate(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	
	
	

	/**
	 * 매입  마감 취소 수정 등록      
	 *   
	 * @param   
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchMagamCancel.do", method = RequestMethod.POST)
	@ResponseBody
	public   void purchMagamCancel(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
         
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;   
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;    
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;    
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		    
		List<Map<String, Object>> resultList = purchMngDeleteService.purchMagamCancel(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	
	
	
	
	
	/**
	 * 매입  저장 (헤더 , 디테일) 업데이트     
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
//	@RequestMapping(value = "/purchRegisterDelete.do", method = RequestMethod.POST)
//	@ResponseBody
//	public   void purchRegister(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
// 
////		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
//		ArrayList<Object> CUR = new ArrayList<Object>(); 
//	 
//		PurchMngDeleteVO  RETURN_CUR  = new  PurchMngDeleteVO();  
//		    
//		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
//		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
//		param.put("SLIP_NO"      			, request.getParameter("SLIP_NO" )    				) ;  
//		param.put("PURCH_DETAIL"      	    , request.getParameter("purchDetail" )    				) ; 
//		param.put("RETURN_CUR"	      		, RETURN_CUR);
//		   
//		
//		List<Map<String, Object>> resultList = purchMngDeleteService.purchRegisterDelete(param);
//		   
//		Gson gson = new Gson();  
//		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
//		 
//		response.setContentType("text/json; charset=utf-8");
//		response.getWriter().print(jsonStr_RETURN_CUR);
//		  
//	}
	


//	/**
//	 * 매입수량 수정  저장  업데이트     
//	 * 
//	 * @param  
//	 * @param model
//	 * @return "mav"
//	 * @exception Exception
//	 */
//	@RequestMapping(value = "/purchRegisterAmtDelete.do", method = RequestMethod.POST)
//	@ResponseBody
//	public   void purchRegisterAmt(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
// 
////		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
//		ArrayList<Object> CUR = new ArrayList<Object>(); 
//	 
//		PurchMngDeleteVO  RETURN_CUR  = new  PurchMngDeleteVO();  
//		    
//		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
//		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
//		param.put("SLIP_NO"      			, request.getParameter("SLIP_NO" )    				) ;  
//		param.put("PURCH_DETAIL"      	    , request.getParameter("purchDetail" )    				) ; 
//		param.put("RETURN_CUR"	      		, RETURN_CUR);
//		    
//		List<Map<String, Object>> resultList = purchMngDeleteService.purchRegisterAmtDelete(param);
//		   
//		Gson gson = new Gson();  
//		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
//		 
//		response.setContentType("text/json; charset=utf-8");
//		response.getWriter().print(jsonStr_RETURN_CUR);
//		  
//	}	
	
	
	
	
	
	 
	 
	
	 //	report  
//	@RequestMapping(value = "/purchMngPrintDelete.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
//	public ModelAndView purchMngPrint(HttpServletRequest request, HttpServletResponse response )throws Exception { 
//		ModelAndView mav = new  ModelAndView("retail/aireport/purch/mng/purchMngPrint");  
//		 
//		return   mav; 
//	}
	
	 
	
	
	
	/**
	 * 매입 삭제 - (헤더 , 디테일)  삭제 
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
//	@RequestMapping(value = "/purchDelDelete.do", method = RequestMethod.POST)
//	@ResponseBody
//	public   void purchDel(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
//   
//		ArrayList<Object> CUR = new ArrayList<Object>(); 
//		    
//		PurchMngDeleteVO  RETURN_CUR  = new  PurchMngDeleteVO();  
//		    
//		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
//		param.put("SLIP_NO_XML"      		, request.getParameter("purchDelXml" )    						) ;  
//		param.put("RETURN_CUR"	      		, RETURN_CUR);
//		    
//		List<Map<String, Object>> resultList = purchMngDeleteService.purchDelDelete(param);
// 		   
//		Gson gson = new Gson();  
//		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
//		 
//		response.setContentType("text/json; charset=utf-8");
//		response.getWriter().print(jsonStr_RETURN_CUR);
//		   
//	}
	
	
	 
	
	
}













