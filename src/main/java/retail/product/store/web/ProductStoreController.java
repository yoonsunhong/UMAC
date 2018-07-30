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
package retail.product.store.web;
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
import retail.product.customer.service.ProductCustomerVO;
import retail.product.store.service.ProductStoreService;
import retail.product.store.service.ProductStoreVO;
import retail.login.service.LoginVO;
 

/**
 * @Class Name : ProductStoreController.java
 * @Description : 점상품 관리관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class ProductStoreController {

	@Autowired
	private ProductStoreService productStoreService;

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
	@RequestMapping(value = "/productStore.do", method = RequestMethod.GET)
	public ModelAndView productStore(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/product/store/productStore"); 
		 
		return   mav; 
	}
	
	
	 


	/**
	 *  점별 상품 리스트
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productStoreSearchList.do", method = RequestMethod.POST)
	@ResponseBody
	public void productStoreSearchList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		  
		try {
			param.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;   
			 
			 
			
			if(  request.getParameter("LRG_CODE").equals("") && request.getParameter("MID_CODE" ).equals("")  && request.getParameter("CLS_CODE" ).equals("")   )
			{
				param.put("CLS_CODE"    , null ) ;    
			}
			
			if(request.getParameter("MID_CODE" ).equals("") && request.getParameter("CLS_CODE" ).equals("") )
			{
				param.put("CLS_CODE"    , request.getParameter("LRG_CODE") ) ;   
			}
			if( !request.getParameter("MID_CODE" ).equals("") && request.getParameter("CLS_CODE" ).equals("") )
			{
				param.put("CLS_CODE"    , request.getParameter("MID_CODE") ) ;   
			}
			
			if( ! request.getParameter("CLS_CODE" ).equals(""))
			{
				param.put("CLS_CODE"    , request.getParameter("CLS_CODE") ) ;    
			}
			
			 
			
			List<Map<String, Object>> resultList =   productStoreService.productStoreSearchList(param);
			Gson gson = new Gson(); 
			String jsonStr 				= gson.toJson(  resultList  );
	  
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonStr);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
	}

	
	
	


	/**
	 *  점별 상품 엑셀 다운 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/excelProductMasterStore.do", method = RequestMethod.POST)
//	@ResponseBody
	public ModelAndView excelProductMasterStore(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
//		Map<String, Object> result = new HashMap<String, Object>();
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
//		try {
			param.put("P_CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;   
			  
			if(  request.getParameter("P_LRG_CODE").equals("") && request.getParameter("P_MID_CODE" ).equals("")  && request.getParameter("P_CLS_CODE" ).equals("")   )
			{
				param.put("P_CLS_CODE"    , null ) ;    
			}
			
			if(request.getParameter("P_MID_CODE" ).equals("") && request.getParameter("P_CLS_CODE" ).equals("") )
			{
				param.put("P_CLS_CODE"    , request.getParameter("P_LRG_CODE") ) ;   
			}
			if( !request.getParameter("P_MID_CODE" ).equals("") && request.getParameter("P_CLS_CODE" ).equals("") )
			{
				param.put("P_CLS_CODE"    , request.getParameter("P_MID_CODE") ) ;   
			}
			
			if( ! request.getParameter("P_CLS_CODE" ).equals(""))
			{
				param.put("P_CLS_CODE"    , request.getParameter("P_CLS_CODE") ) ;    
			}
			  
			map =  productStoreService.excelProductMasterStore(param);
			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");
			
			return mav;
			
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		 
	}

	
	
	
	

	/**
	 * 점 상품 수정.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productStoreUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public   void productStoreUpdate(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		ProductStoreVO  RETURN_CUR  = new  ProductStoreVO ();
		String GRID_XML_DATA1		 = request.getParameter("gridXmlData1" );  
		   
		 
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()) ;  
	       
		param.put("GRID_XML_DATA1"    		, GRID_XML_DATA1 ) ;     
		param.put("RETURN_CUR"	      		, RETURN_CUR);
		 
		List<Map<String, Object>> resultList = productStoreService.productStoreUpdate(param);
 		  
 		
 		 
 		 
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		 
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	 
}
