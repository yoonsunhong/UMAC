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
package retail.product.customer.web;
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
import retail.groupGridTest.service.GroupGridTestVO;
//import retail.groupGridTest.service.GroupGridTestVO;
import retail.product.customer.service.ProductCustomerService;
import retail.product.customer.service.ProductCustomerVO;
import retail.login.service.LoginVO;
 

/**
 * @Class Name : ProductCustomerController.java
 * @Description : 협력업체 관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class ProductCustomerController {

	@Autowired
	private ProductCustomerService productCustomerService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	
	/**
	 * 화면뷰 만들기.  
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomer.do", method = RequestMethod.GET)
	public ModelAndView productCustomer(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/product/customer/productCustomer"); 
		 
		return   mav; 
	}
	
	
	 
	/**
	 * 사업자번호  중복검사.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomerBusiNoDup.do", method = RequestMethod.POST)
	@ResponseBody
	public    Map<String, Object>  productCustomerBusiNoDup(HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		ProductCustomerVO  RETURN_CUR  = new  ProductCustomerVO ();
		  
		paramMap.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;  
		paramMap.put("BUSI_NO"      , request.getParameter("BUSI_NO") ) ;  
		paramMap.put("RETURN_CUR"	, RETURN_CUR);
		    
//		System.out.println("BUSI_NO : " + request.getParameter("BUSI_NO"));
		
 		productCustomerService.productCustomerBusiNoDup(paramMap);
		   
		@SuppressWarnings("unchecked")
		List<ProductCustomerVO> RETURN_CUR_LIST = (List<ProductCustomerVO>) paramMap.get("RETURN_CUR"); 		  
		  
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson(  RETURN_CUR_LIST.get(0) );
		    
		paramMap.put("RETURN_CUR"	, jsonStr_RETURN_CUR );
		 
		return paramMap;
		  
	}
	
	 
	/**
	 * 협력업체코드 중복검사.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomerVenCodeDup.do", method = RequestMethod.POST)
	@ResponseBody
	public    Map<String, Object>  productCustomerVenCodeDup(HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		ProductCustomerVO  RETURN_CUR  = new  ProductCustomerVO ();
		  
		paramMap.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;  
		paramMap.put("VEN_CODE"     , request.getParameter("VEN_CODE") ) ;  
		paramMap.put("RETURN_CUR"	, RETURN_CUR);
		    
 		productCustomerService.productCustomerVenCodeDup(paramMap);
		   
		@SuppressWarnings("unchecked")
		List<ProductCustomerVO> RETURN_CUR_LIST = (List<ProductCustomerVO>) paramMap.get("RETURN_CUR"); 		  
		  
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson(  RETURN_CUR_LIST.get(0) );
		    
		paramMap.put("RETURN_CUR"	, jsonStr_RETURN_CUR );
		 
		return paramMap;
		  
	}
	
	/**
	 * 매입구간 - 최대/최소기준금액 추출.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purSectionStdPrice.do", method = RequestMethod.POST)
	@ResponseBody
	public    Map<String, Object>  purSectionStdPrice(HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		ProductCustomerVO  RETURN_CUR  = new  ProductCustomerVO ();
		  
		paramMap.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;  
		paramMap.put("CD_CL"        , request.getParameter("CD_CL") ) ;  
		paramMap.put("CD_ID"        , request.getParameter("CD_ID") ) ;   
		paramMap.put("RETURN_CUR"	, RETURN_CUR);
		    
 		productCustomerService.purSectionStdPrice(paramMap);
		   
		@SuppressWarnings("unchecked")
		List<ProductCustomerVO> RETURN_CUR_LIST = (List<ProductCustomerVO>) paramMap.get("RETURN_CUR"); 		  
		  
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson(  RETURN_CUR_LIST.get(0) );
		    
		paramMap.put("RETURN_CUR"	, jsonStr_RETURN_CUR );
		 
		return paramMap;
		  
	}
	
	
	
	/**
	 * 협력업체 저장.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomerRegister.do", method = RequestMethod.POST)
	@ResponseBody
	public   void productCustomerRegister(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		  
		
		ProductCustomerVO  RETURN_CUR  = new  ProductCustomerVO ();
		
		String VEN_CODE       = request.getParameter("VEN_CODE" ); 
		String GRID_XML_DATA2 = request.getParameter("gridXmlData2" ); 
		String GRID_XML_DATA3 = request.getParameter("gridXmlData3" ); 
		String GRID_XML_DATA4 = request.getParameter("gridXmlData4" ); 
		String GRID_XML_DATA5 = request.getParameter("gridXmlData5" ); 
		String CD_SUPPLY  	  = request.getParameter("cdSupply" ); 
		
		
		
//		System.out.println("GRID_XML_DATA2 : " + GRID_XML_DATA2 );
//		System.out.println("GRID_XML_DATA3 : " + GRID_XML_DATA3 );
//		System.out.println("GRID_XML_DATA4 : " + GRID_XML_DATA4 );
//		System.out.println("GRID_XML_DATA5 : " + GRID_XML_DATA5 );
		
		 
		param.put("CORP_CODE"    	 , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("VEN_CODE"          , VEN_CODE ) ;   
		param.put("EMP_NO"    	 	 , CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("GRID_XML_DATA2"    , GRID_XML_DATA2 ) ;   
		param.put("GRID_XML_DATA3"    , GRID_XML_DATA3 ) ;   
		param.put("GRID_XML_DATA4"    , GRID_XML_DATA4 ) ;   
		param.put("GRID_XML_DATA5"    , GRID_XML_DATA5 ) ; 
		param.put("CD_SUPPLY"         , CD_SUPPLY ) ;  
		param.put("RETURN_CUR"	     , RETURN_CUR);
		 
		List<Map<String, Object>> resultList = productCustomerService.productCustomerRegister(param);
 		 
 		
 		 
 		 
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		
//		System.out.println( "strXml3 : " + jsonStr_RETURN_CUR );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		 
		  
	}
	
	
	
	
	/**
	 * 협력업체 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomerList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productCustomerList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("P_VEN"    	, request.getParameter("S_VEN" )  ) ; 
		param.put("P_GRE_GB"    , request.getParameter("S_GRE_GB" )) ; 
		param.put("P_USE_YN"    , request.getParameter("S_USE_YN" )) ; 
		param.put("P_CORP_CODE"	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = productCustomerService.productCustomerList(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
//		System.out.println("[ CUR ] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	/**
	 * 협력업체 정보 보기.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomerInfoSelect.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productCustomerInfoSelect( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE()  ) ;    
		param.put("VEN_CODE"     , request.getParameter("VEN_CODE")  ) ; 
		param.put("CUR"			, CUR); 
 	   
		List<Map<String, Object>> resultList = productCustomerService.productCustomerInfoSelect(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
//		System.out.println("[ productCustomerInfoSelect] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	/**
	 * getPayMgmtEntry .    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getPayMgmtEntry.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  getPayMgmtEntry( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
//		"CD_CL"  : "PAY_CON"
//	    "CD_ID"  : $('#PAY_CON').val()
		 	
		param.put("CORP_CODE"  , CommonUtil.getEnv(request.getSession()).getCORP_CODE()  ) ;  
		param.put("CD_CL"      , request.getParameter("CD_CL")  ) ; 
		param.put("CD_ID"      , request.getParameter("CD_ID")  ) ; 
		param.put("CUR"		   , CUR); 
 	   
		List<Map<String, Object>> resultList = productCustomerService.getPayMgmtEntry(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
//		System.out.println("[ productCustomerInfoSelect] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	
	
	/**
	 * 지불조건 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomerPyPayNumList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productCustomerPyPayNumList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
  
		param.put("P_CORP_CODE"	  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("P_VEN_CODE"    ,  request.getParameter("VEN_CODE")) ; 
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = productCustomerService.productCustomerPyPayNumList(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
//		System.out.println("[ CUR ] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 장려율 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomerPyPayRateList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productCustomerPyPayRateList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
  
		param.put("P_CORP_CODE"	  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("P_VEN_CODE"    ,  request.getParameter("VEN_CODE")) ; 
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = productCustomerService.productCustomerPyPayRateList(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
//		System.out.println("[ CUR ] : "         + jsonStr);
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	/**
	 * 장려금 제외 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomerPyExclItemList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productCustomerPyExclItemList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
  
		param.put("P_CORP_CODE"	  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("P_VEN_CODE"    ,  request.getParameter("VEN_CODE")) ; 
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = productCustomerService.productCustomerPyExclItemList(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
//		System.out.println("[ CUR ] : "         + jsonStr);
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	/**
	 * 담당자 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/cdSupplyPsnList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productCustomerCdSupplyPsnList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
  
//		System.out.println("P_VEN_CODE : " + request.getParameter("VEN_CODE"));
		param.put("P_CORP_CODE"	  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("P_VEN_CODE"    ,  request.getParameter("VEN_CODE")) ; 
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = productCustomerService.productCustomerCdSupplyPsnList(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
//		System.out.println("[ CUR productCustomerCdSupplyPsnList] : "         + jsonStr);
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	
	
	/**
	 * 지불조건 화면 뷰 만들기.  
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCustomerPayOption.do", method = RequestMethod.GET)
	public ModelAndView productCustomerPayOption(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/product/customer/productCustomerPayOption"); 
		 
		return   mav; 
	}
	 
	
	
	
	
	/**
	 * 협력업체 상품 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/venProductList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  venProductList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("P_CORP_CODE"	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("P_VEN_CODE"    	, request.getParameter("P_VEN_CODE" )  ) ;  
		param.put("P_STR_CODE"    	, request.getParameter("P_STR_CODE" )  ) ;  
		
		param.put("P_POINT_SAVE"    , request.getParameter("P_POINT_SAVE" )  ) ;  
		param.put("P_SCAN_CODE"    	, request.getParameter("P_SCAN_CODE"  )  ) ;  
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = productCustomerService.venProductList(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
		 
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	
	
	
	
	
	
	
	 
}
