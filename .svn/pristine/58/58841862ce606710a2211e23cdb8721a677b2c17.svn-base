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
import retail.order.store.service.OrderStoreExcelService;
import retail.order.store.service.OrderStoreExcelVO;
import retail.product.box.service.ProductBoxVO;
import retail.product.customer.service.ProductCustomerVO;
import retail.login.service.LoginVO;
 

/**
 * @Class Name : OrderStoreExcelController.java
 * @Description : 엑셀  발주
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class OrderStoreExcelController {

	@Autowired
	private OrderStoreExcelService orderStoreExcelService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	 
	
	 //	발주 등록 화면 
	@RequestMapping(value = "/orderStoreRegisterExcel.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView orderStoreRegister(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/order/store/orderStoreRegisterExcel");  
		return   mav; 
	}
	 
	

	/**
	 * 점포 엑셀데이터 로드 - 엑셀 데이터를 DB 에 던지고 다시 리턴 받는다. 
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/excelDataLoad.do", method = RequestMethod.POST)
	@ResponseBody
	public   void excelDataLoad(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
		    
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ;  
		param.put("STR_CODE" 	, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("EXCEL_DATA" 	, request.getParameter("EXCEL_DATA" )    				 	) ;  
		param.put("CUR"			, CUR														); 
		  
		List<Map<String, Object>> resultList = orderStoreExcelService.excelDataLoad(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}


/**
	 * 바이어 비생식 R1 엑셀데이터 로드 - 엑셀 데이터를 DB 에 던지고 다시 리턴 받는다. 
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/excelDataLoadBuyerR1.do", method = RequestMethod.POST)
	@ResponseBody
	public   void excelDataLoadBuyerR1(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
		    
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ;  
		param.put("STR_CODE" 	, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("EXCEL_DATA" 	, request.getParameter("EXCEL_DATA" )    				 	) ;  
		param.put("CUR"			, CUR														); 
		  
		List<Map<String, Object>> resultList = orderStoreExcelService.excelDataLoadBuyerR1(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}

	/**
	 * 바이어 엑셀데이터 로드 - 엑셀 데이터를 DB 에 던지고 다시 리턴 받는다. 
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/excelDataLoadBuyer.do", method = RequestMethod.POST)
	@ResponseBody
	public   void excelDataLoadBuyer(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
		    
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ;  
//		param.put("STR_CODE" 	, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("EXCEL_DATA" 	, request.getParameter("EXCEL_DATA" )    				 	) ;  
		param.put("CUR"			, CUR														); 
		  
		List<Map<String, Object>> resultList = orderStoreExcelService.excelDataLoadBuyer(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}


	/**
	 * 엑셀 발주  등록 ( 상품디테일)     
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderStoreProductExcelRegister.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderStoreProductExcelRegister(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
		    
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
		param.put("ORD_DT"      			, request.getParameter("ORD_DT" )    						) ;  
		param.put("STR_CODE"      			, request.getParameter("STR_CODE" )    						) ;  
		param.put("ORDER_STORE_DETAIL"    	, request.getParameter("orderStoreDetail" )    				) ; 
		param.put("REG_PATH"    	        , request.getParameter("REG_PATH" )    						) ; 
		param.put("PUR_GB"    	        , request.getParameter("PUR_GB" )    						) ; 
		
		
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		   
		
		List<Map<String, Object>> resultList = orderStoreExcelService.orderStoreProductExcelRegister(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	/**
	 * 엑셀 발주 확정 등록      
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/jobUploadToOrder.do", method = RequestMethod.POST)
	@ResponseBody
	public   void jobUploadToOrder(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
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
		   
		
		List<Map<String, Object>> resultList = orderStoreExcelService.jobUploadToOrder(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	

	/**
	 * R2 발주 엑셀 데이터 다운로드 을 다운한다.
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/r2OrderExcelData.do", method=RequestMethod.POST)
	public ModelAndView r2OrderExcelData(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		//Map<String, Object> paramMap = new HashMap<String, Object>();
		Map<String, Object>  CUR =  new HashMap<String, Object>();
		  
	    paramMap.put("P_CORP_CODE",   CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE",    (String) paramMap.get("STR_CODE")) ;
//		paramMap.put("P_ORD_DT_FROM", ((String) paramMap.get("ORD_DT_FROM")).replaceAll("-", "")  );
		paramMap.put("P_ORD_DT",   ((String) paramMap.get("ORD_DT")).replaceAll("-", "")  ); 
		paramMap.put("CUR", CUR);
		   
		map = orderStoreExcelService.r2OrderExcelData(paramMap);
 
		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");
 
		return mav;
	}

	

	/**
	 *   PO_ORDER_UPLOAD의 데이터 조회   
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderUploadSearch.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderUploadSearch(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
		    
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ;  
		param.put("STR_CODE" 	, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("REG_PATH" 	, request.getParameter("REG_PATH" )    				 		) ; 
		param.put("ITM_GB"    	, request.getParameter("ITM_GB" )    				 		) ;  
		param.put("LRG_CODE"    , request.getParameter("LRG_CODE" )                  		) ; 
		param.put("CFM_YN"      , request.getParameter("CFM_YN" )                   		) ; 
		param.put("VEN_CODE"    , request.getParameter("VEN_CODE" )                   		) ; 
		param.put("ROUTE_GB"    , request.getParameter("ROUTE_GB" )                   		) ; 
		param.put("PUR_GB"    , request.getParameter("PUR_GB" )                   		) ; 
		
		param.put("CUR"			, CUR														) ; 
		  
		List<Map<String, Object>> resultList = orderStoreExcelService.orderUploadSearch(param);
 		   
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
	@RequestMapping(value = "/orderUploadDel.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderUploadDel(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
   
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ;  
		param.put("STR_CODE" 	, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("REG_PATH" 	, request.getParameter("REG_PATH" )    				 		) ; 
		param.put("SEQ"    	    , request.getParameter("SEQ" )    				 		    ) ;  
		param.put("SCAN_CODE"   , request.getParameter("SCAN_CODE" )    				    ) ;  
		param.put("CUR"			, CUR														) ; 
		  
		List<Map<String, Object>> resultList = orderStoreExcelService.orderUploadDel(param);   //orderUploadSearch
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	 
	
	/**
	 *   PO_ORDER_UPLOAD의 발주수량 및 매입처 수정   
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderUploadUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderUploadUpdate(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
   
		param.put("CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("EMP_NO"      , CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
		param.put("ORD_DT" 		, request.getParameter("ORD_DT" )    				 		) ;  
		param.put("STR_CODE" 	, request.getParameter("STR_CODE" )    				 		) ;  
		param.put("REG_PATH" 	, request.getParameter("REG_PATH" )    				 		) ; 
		param.put("SEQ"    	    , request.getParameter("SEQ" )    				 		    ) ;  
		param.put("SCAN_CODE"   , request.getParameter("SCAN_CODE" )    				    ) ;   
		param.put("ORD_QTY"     , request.getParameter("ORD_QTY" )    					    ) ;  
		param.put("VEN_CODE"    , request.getParameter("VEN_CODE" )    					    ) ;  
		param.put("RETURN_CUR"  , RETURN_CUR				  								) ; 
		  
		List<Map<String, Object>> resultList = orderStoreExcelService.orderUploadUpdate(param);   //orderUploadSearch
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	

	/**
	 * 발주 상품 추가  .    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderAddItm.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  orderAddItm( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		   
		param.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE()  ) ;   
		param.put("SCAN_CODE"    , request.getParameter("SCAN_CODE")  ) ; 
		param.put("STR_CODE"     , request.getParameter("STR_CODE")   ) ;   
		param.put("PUR_GB"    , request.getParameter("PUR_GB")  ) ;  
		
		param.put("CUR"			 , CUR); 
 	   
		List<Map<String, Object>> resultList = orderStoreExcelService.orderAddItm(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}

	 
 
	
	
	/**
	 *   PO_ORDER_UPLOAD에 상품 추가 저장 ( 단건)
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderAddItmSave.do", method = RequestMethod.POST)
	@ResponseBody
	public   void orderAddItmSave(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
   
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
		  
		List<Map<String, Object>> resultList = orderStoreExcelService.orderAddItmSave(param);   //orderUploadSearch
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}	
	
	
	
	
		
	 
}
