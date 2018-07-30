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
package retail.order.store.web;
import java.util.ArrayList;
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
//import retail.product.customer.service.ProductCustomerVO;
import retail.order.store.service.OrderStoreR1BuyerService;
import retail.order.store.service.OrderStoreR1BuyerVO;
import retail.product.box.service.ProductBoxVO;
import retail.product.customer.service.ProductCustomerVO;
import retail.login.service.LoginVO;
 

/**
 * @Class Name : OrderStoreR1BuyerController.java
 * @Description : 바이어발주등록(R1)
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class OrderStoreR1BuyerController {

	@Autowired
	private OrderStoreR1BuyerService orderStoreR1BuyerService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	 
	
	 //	발주 등록 화면 
	@RequestMapping(value = "/orderStoreRegisterR1Buyer.do", method = {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView orderStoreRegisterR1Buyer(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/order/store/orderStoreRegisterR1Buyer");  
		return   mav; 
	}
	 
	
	/**
	 * 공통코드 테이블의 MGMT_ENTRY 가져오기 .    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getCommonMgmtEntryR1Buyer.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  getCommonMgmtEntryR1Buyer( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE()  ) ;   
		param.put("CD_CL"    	 , request.getParameter("CD_CL")  ) ; 
		param.put("CD_ID"     	 , request.getParameter("CD_ID")   ) ;  
		param.put("CUR"			 , CUR); 
 	   
		List<Map<String, Object>> resultList = orderStoreR1BuyerService.getCommonMgmtEntryR1Buyer(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
  
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}

	/**
	 * 바코드로 점 상품 가져오기 .    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderStoreProductSelectR1Buyer.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  orderStoreProductSelectR1Buyer( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE()  ) ;   
		param.put("SCAN_CODE"    , request.getParameter("SCAN_CODE")  ) ; 
		param.put("STR_CODE"     , request.getParameter("STR_CODE")   ) ;  
		param.put("ROUTE_GB"     , request.getParameter("ROUTE_GB")   ) ;  
		param.put("VEN_CODE"     , request.getParameter("VEN_CODE")   ) ; 
		param.put("PUR_GB"       , request.getParameter("PUR_GB")     ) ;  
		param.put("CUR"			 , CUR); 
 	   
		List<Map<String, Object>> resultList = orderStoreR1BuyerService.orderStoreProductSelectR1Buyer(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
		System.out.println("[ orderStoreProductSelect] : "         + jsonStr);
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	

	/**
	 * 발주  등록 (헤더 , 디테일)     
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderStoreProductRegisterR1Buyer.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderStoreProductRegisterR1Buyer(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreR1BuyerVO  RETURN_CUR  = new  OrderStoreR1BuyerVO();  
		    
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
		param.put("CRUD_BIT"      			, request.getParameter("CRUD_BIT" )    				) ; 
		param.put("ORDER_STORE_HEADER"      , request.getParameter("orderStoreHeader" )    				) ; 
		param.put("ORDER_STORE_DETAIL"    	, request.getParameter("orderStoreDetail" )    				) ; 
		param.put("RETURN_CUR"	      		, RETURN_CUR);
		   
		
		List<Map<String, Object>> resultList = orderStoreR1BuyerService.orderStoreProductRegisterR1Buyer(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		
		System.out.println( "strXml3 : " + jsonStr_RETURN_CUR );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	 
	
	
	

	/**
	 * 발주헤더 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderHeadSearchR1Buyer.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  orderHeadSearchR1Buyer( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("CORP_CODE"	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("STR_CODE"    , request.getParameter("STR_CODE" )  	) ; 
		param.put("ORD_DT_FROM" , request.getParameter("ORD_DT_FROM" )	) ; 
		param.put("ORD_DT_TO"   , request.getParameter("ORD_DT_TO" )	) ; 
		param.put("ROUTE_GB"    , request.getParameter("ROUTE_GB" )		) ; 
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = orderStoreR1BuyerService.orderHeadSearchR1Buyer(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
		System.out.println("[ CUR ] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	
	

	/**
	 * 발주헤더  정보 보기 oneSelect.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderHeadInfoR1Buyer.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  orderHeadInfoR1Buyer( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("CORP_CODE"   , CommonUtil.getEnv(request.getSession()).getCORP_CODE()  ) ;    
		param.put("SLIP_NO"     , request.getParameter("SLIP_NO")  ) ; 
		param.put("CUR"			, CUR); 
 	   
		List<Map<String, Object>> resultList = orderStoreR1BuyerService.orderHeadInfoR1Buyer(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
		System.out.println("[ orderHeadInfo] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}

	
	


	/**
	 * 발주상품 리스트 정보 보여주기    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderDetailInfoR1Buyer.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  orderDetailInfoR1Buyer( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
  
		param.put("CORP_CODE"	,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		
		param.put("STR_CODE"    ,  request.getParameter("STR_CODE")) ; 
		param.put("SLIP_NO"    	,  request.getParameter("SLIP_NO")) ; 
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = orderStoreR1BuyerService.orderDetailInfoR1Buyer(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
		System.out.println("[ CUR ] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	 
	


	/**
	 * 발주 삭제 - (헤더 , 디테일)  삭제 
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderDelR1Buyer.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderDelR1Buyer(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreR1BuyerVO  RETURN_CUR  = new  OrderStoreR1BuyerVO();  
		    
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("SLIP_NO_XML"      		, request.getParameter("orderDelXml" )    						) ;  
		param.put("RETURN_CUR"	      		, RETURN_CUR);
		   
		
		List<Map<String, Object>> resultList = orderStoreR1BuyerService.orderDelR1Buyer(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		
		System.out.println( "strXml3 : " + jsonStr_RETURN_CUR );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	  
		
	 
}
