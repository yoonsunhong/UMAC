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
//import retail.product.customer.service.ProductCustomerVO;
import retail.order.store.service.OrderStoreExcelBuyerService;
import retail.order.store.service.OrderStoreExcelBuyerVO;
import retail.product.box.service.ProductBoxVO;
import retail.product.customer.service.ProductCustomerVO;
import retail.login.service.LoginVO;
 
 
/**
 * @Class Name : OrderStoreExcelBuyerController.java
 * @Description : 엑셀  발주(바이어)
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class OrderStoreExcelBuyerController {

	@Autowired
	private OrderStoreExcelBuyerService orderStoreExcelBuyerService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	 
	
	                           
	@RequestMapping(value = "/orderStoreRegisterExcelBuyer.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView orderStoreBuyerRegister(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/order/store/orderStoreRegisterExcelBuyer");  
		return   mav; 
	}
	 
	 

	/**
	 *   PO_ORDER_UPLOAD의 데이터 조회   
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderUploadSearchBuyer.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderUploadSearchBuyer(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelBuyerVO  RETURN_CUR  = new  OrderStoreExcelBuyerVO();  
		    
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ;  
//		param.put("STR_CODE" 	, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("REG_PATH" 	, request.getParameter("REG_PATH" )    				 		) ; 
		param.put("ITM_GB"    	, request.getParameter("ITM_GB" )    				 		) ;  
		param.put("LRG_CODE"    , request.getParameter("LRG_CODE" )                  		) ; 
		param.put("CFM_YN"      , request.getParameter("CFM_YN" )                   		) ; 
		param.put("VEN_CODE"    , request.getParameter("VEN_CODE" )                   		) ; 
		param.put("ROUTE_GB"    , request.getParameter("ROUTE_GB" )                   		) ;  
		param.put("PUR_GB"    , request.getParameter("PUR_GB" )                   		) ;  
		param.put("CUR"			, CUR														) ; 
		  
		List<Map<String, Object>> resultList = orderStoreExcelBuyerService.orderUploadSearchBuyer(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
		

	
	/**
	 * 발주 상품 단건 추가 ( 바이어)      
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderAddItmBuyer.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  orderAddItmBuyer( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		   
		param.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE()  ) ;   
		param.put("SCAN_CODE"    , request.getParameter("SCAN_CODE")  ) ;  
		param.put("PUR_GB"    , request.getParameter("PUR_GB")  ) ;  
		
		param.put("CUR"			 , CUR); 
 	   
		List<Map<String, Object>> resultList = orderStoreExcelBuyerService.orderAddItmBuyer(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	

	/**
	 *   바이어 - PO_ORDER_UPLOAD에 상품 추가 저장 ( 단건 )
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderAddItmSaveBuyer.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderAddItmSaveBuyer(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelBuyerVO  RETURN_CUR  = new  OrderStoreExcelBuyerVO();  
   
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("EMP_NO"      , CommonUtil.getEnv(request.getSession()).getUserId()		) ;  
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ;  
		param.put("STR_CODE" 	, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("REG_PATH" 	, request.getParameter("REG_PATH" )    				 		) ;  
		param.put("SCAN_CODE" 	, request.getParameter("SCAN_CODE" )   				 		) ;  
		param.put("ORD_QTY" 	, request.getParameter("ORD_QTY" )    				 		) ;  
		param.put("ITM_GB" 		, request.getParameter("ITM_GB" )    				 		) ;  
		param.put("VEN_CODE" 	, request.getParameter("VEN_CODE" )    				 		) ;  
		param.put("PUR_WPRC" 	, request.getParameter("PUR_WPRC" )    				 		) ;  
		param.put("PUR_WVAT" 	, request.getParameter("PUR_WVAT" )    				 		) ;   
		param.put("PUR_GB" 	, request.getParameter("PUR_GB" )    				 		) ;   
		
		param.put("RETURN_CUR"  , RETURN_CUR								 				) ; 
		  
		List<Map<String, Object>> resultList = orderStoreExcelBuyerService.orderAddItmSaveBuyer(param);   //orderUploadSearch
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}	
	
	
	
	

	/**
	 *   PO_ORDER_UPLOAD의 데이터  삭제  
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderUploadDelBuyer.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderUploadDelBuyer(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelBuyerVO  RETURN_CUR  = new  OrderStoreExcelBuyerVO();  
   
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ; 
		param.put("VEN_CODE" 	, request.getParameter("VEN_CODE" )    				 		) ; 
//		param.put("STR_CODE" 	, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("REG_PATH" 	, request.getParameter("REG_PATH" )    				 		) ; 
		param.put("SEQ"    	    , request.getParameter("SEQ" )    				 		    ) ;  
		param.put("SCAN_CODE"   , request.getParameter("SCAN_CODE" )    				    ) ;  
		param.put("CUR"			, CUR														) ; 
		  
		List<Map<String, Object>> resultList = orderStoreExcelBuyerService.orderUploadDelBuyer(param);   //orderUploadSearch
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	



	/**
	 *   바이어 PO_ORDER_UPLOAD의 발주수량 및 매입처 수정   
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderUploadUpdateBuyer.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderUploadUpdateBuyer(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelBuyerVO  RETURN_CUR  = new  OrderStoreExcelBuyerVO();  
   
		param.put("CORP_CODE" 		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("EMP_NO"      	, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
		param.put("ORD_DT" 			, request.getParameter("ORD_DT" )    				 		) ;  
		param.put("STR_CODE" 		, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("REG_PATH" 		, request.getParameter("REG_PATH" )    				 		) ; 
		param.put("SEQ"    	    	, request.getParameter("SEQ" )    				 		    ) ;  
		param.put("SCAN_CODE"   	, request.getParameter("SCAN_CODE" )    				    ) ;   
		param.put("ORD_QTY"     	, request.getParameter("ORD_QTY" )    					    ) ;  
		param.put("VEN_CODE"    	, request.getParameter("VEN_CODE" )    					    ) ;  
		param.put("VEN_CODE_OLD"    , request.getParameter("VEN_CODE_OLD" )    					) ; 
		param.put("PUR_WPRC"    	, request.getParameter("PUR_WPRC" )    						) ; 
		param.put("PUR_WVAT"    	, request.getParameter("PUR_WVAT" )    						) ; 
		param.put("ITM_GB"    		, request.getParameter("ITM_GB" )    						) ; 
		
		
		
		param.put("RETURN_CUR"  	, RETURN_CUR				  								) ; 
		  
		List<Map<String, Object>> resultList = orderStoreExcelBuyerService.orderUploadUpdateBuyer(param);   //orderUploadSearch
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	

	/**
	 * 점에서 발주한 발주데이터 엑셀 데이터 다운로드 을 다운한다.
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/r2OrderExcelDataBuyer.do", method=RequestMethod.POST)
	public ModelAndView r2OrderExcelDataBuyer(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		//Map<String, Object> paramMap = new HashMap<String, Object>();
		Map<String, Object>  CUR =  new HashMap<String, Object>();
		  
	    paramMap.put("P_CORP_CODE",   CommonUtil.getEnv(request.getSession()).getCORP_CODE());
//		paramMap.put("P_STR_CODE",    (String) paramMap.get("STR_CODE")) ; 
	    paramMap.put("P_LRG_CODE",    (String) paramMap.get("LRG_CODE")) ;  
		paramMap.put("P_ORD_DT",   ((String) paramMap.get("ORD_DT")).replaceAll("-", "")  ); 
		paramMap.put("CUR", CUR);
		   
		map = orderStoreExcelBuyerService.r2OrderExcelDataBuyer(paramMap);
 
		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");
 
		return mav;
	}
	
	
	
	

	/**
	 *   점포   조회   
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getStoreInfo.do", method = RequestMethod.POST)
	@ResponseBody
	public   void getStoreInfo(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelBuyerVO  RETURN_CUR  = new  OrderStoreExcelBuyerVO();  
		     
		param.put("CUR"			, CUR														) ; 
		  
		List<Map<String, Object>> resultList = orderStoreExcelBuyerService.getStoreInfo(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	/**
	 * 바이어 엑셀데이터 로드(생식/비생식) - 엑셀 데이터를 DB 에 던지고 다시 리턴 받는다. 
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/excelDataLoadBuyerAll.do", method = RequestMethod.POST)
	@ResponseBody
	public   void excelDataLoadBuyerAll(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelBuyerVO  RETURN_CUR  = new  OrderStoreExcelBuyerVO();  
		    
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ;  
		param.put("IEMP_NO" 	, CommonUtil.getEnv(request.getSession()).getUserId()	    ) ;  
		param.put("EXCEL_DATA" 	, request.getParameter("EXCEL_DATA" )    				 	) ;  
		param.put("CUR"			, CUR														); 
		     
		List<Map<String, Object>> resultList = orderStoreExcelBuyerService.excelDataLoadBuyerAll(param);
	 
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	

	/**
	 *  바이어 엑셀 발주  등록  ( 생식/비생식) - 일반 상품일때는 물류센터 코드 넣는다.     
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderStoreProductExcelRegisterBuyer.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderStoreProductExcelRegisterBuyer(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelBuyerVO  RETURN_CUR  = new  OrderStoreExcelBuyerVO();  
		    
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
		param.put("ORD_DT"      			, request.getParameter("ORD_DT" )    						) ;   
		param.put("ORDER_STORE_DETAIL"    	, request.getParameter("orderStoreDetail" )    				) ; 
		param.put("REG_PATH"    	        , request.getParameter("REG_PATH" )    						) ; 
		param.put("PUR_GB"    	        , request.getParameter("PUR_GB" )    						) ; 
		
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		    
		List<Map<String, Object>> resultList = orderStoreExcelBuyerService.orderStoreProductExcelRegisterBuyer(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	
	
	
	/**
	 *  바이어 엑셀 발주 확정 등록      
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/jobUploadToOrderBuyer.do", method = RequestMethod.POST)
	@ResponseBody
	public   void jobUploadToOrderBuyer(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelBuyerVO  RETURN_CUR  = new  OrderStoreExcelBuyerVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
         
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT"      			, curDate.format(d)   										) ;   
		param.put("REG_PATH"    	        , request.getParameter("REG_PATH" )    						) ; 
		param.put("STR_CODE"    	        , request.getParameter("STR_CODE" )    						) ;  
		
		param.put("ITM_GB"    	            , request.getParameter("ITM_GB" )    						) ;  
		param.put("LRG_CODE"    	        , request.getParameter("LRG_CODE" )    						) ;  
		param.put("CHK_ORDER_PRODUCT"       , request.getParameter("CHK_ORDER_PRODUCT" )    	    	) ; 
		
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		   
		
		List<Map<String, Object>> resultList = orderStoreExcelBuyerService.jobUploadToOrderBuyer(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	
	
}
