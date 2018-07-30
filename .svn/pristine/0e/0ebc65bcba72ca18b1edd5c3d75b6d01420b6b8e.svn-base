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
package retail.product.master.web;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

     
 



import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.xml.XMLSerializer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.code.service.CodeVO;
import retail.common.CommonUtil; 
import retail.product.customer.service.ProductCustomerVO;
import retail.product.master.service.ProductMasterService;
import retail.product.master.service.ProductMasterVO;
import retail.login.service.LoginVO;
 

/**
 * @Class Name : GroupGridTestController.java
 * @Description : 메뉴관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 문희훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class ProductMasterController {

	@Autowired
	private ProductMasterService productMasterService;
 
	
	
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
	@RequestMapping(value = "/productMaster.do", method = RequestMethod.GET)
	public ModelAndView productMaster(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/product/master/productMaster"); 
		 
		return   mav; 
	}
	
	
	

	/**
	 * 상품 마스터 상세 정보 보기.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productMasterDetail.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productMasterDetail( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("P_CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;    
		param.put("P_ITM_CODE"     , request.getParameter("ITM_CODE")  ) ; 
		param.put("P_SCAN_CODE"    , request.getParameter("SCAN_CODE")  ) ; 
		param.put("CUR"			, CUR); 
 	    
		
		List<Map<String, Object>> resultList = productMasterService.productMasterDetail(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
  
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	/**
	 * 상품 마스터 저장.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productMasterRegister.do", method = RequestMethod.POST)
	@ResponseBody
	public   void productMasterRegister(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		   
		ProductMasterVO  RETURN_CUR  = new  ProductMasterVO ();
		 
		String CRUD_BIT      		 = request.getParameter("CRUD_BIT" ); 
		String PRODUCT_MASTER_DETAIL = request.getParameter("PRODUCT_MASTER_DETAIL" ); 
		String GRID_XML_DATA1		 = request.getParameter("gridXmlData1" );  
		String GRID_XML_DATA2		 = request.getParameter("gridXmlData2" );  
		   
		 
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()) ;  
		param.put("CRUD_BIT"    			, CRUD_BIT ) ;   
		param.put("PRODUCT_MASTER_DETAIL" 	, PRODUCT_MASTER_DETAIL ) ;   
		param.put("GRID_XML_DATA1"    		, GRID_XML_DATA1 ) ;     
		param.put("GRID_XML_DATA2"    		, GRID_XML_DATA2 ) ;     
		param.put("RETURN_CUR"	      		, RETURN_CUR);
		 
		List<Map<String, Object>> resultList = productMasterService.productMasterRegister(param);
 		 
//		List<Map<String, Object>> resultList = null;
 		
 		 
 		 
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		
		System.out.println( "strXml3 : " + jsonStr_RETURN_CUR );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		 
		  
	}
	

	 
	 /**
	 * 취급 점포  목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productStoreList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productStoreList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
  
		param.put("CORP_CODE"	  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("ITM_CODE"      ,  request.getParameter("ITM_CODE")) ; 
		param.put("CUR"			  , CUR); 
		 
		List<Map<String, Object>> resultList = productMasterService.productStoreList(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
		System.out.println("[ CUR ] : "         + jsonStr);
 
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
 
	

	/**
	 * 공병코드를 조회 하여 select box 를 만든다.  
	 * 
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getBotCodeSelectBoxList.do", method=RequestMethod.POST)
	public void getBotCodeSelectBoxList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
//		paramMap.put("P_CD_CL", request.getParameter("CD_CL"));
		paramMap.put("CUR", CUR);
		
		//공병코드 그룹을 조회
		productMasterService.getBotCodeSelectBoxList(paramMap);
		
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
//		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);	
		
	}

	
	
	/**
	 * 대분류 코드를  조회 하여 ITM_GB ITM_GB_NM을 가져온다.   
	 * 
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getItmGb.do", method=RequestMethod.POST)
	public void getItmGb( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_LRG_CODE", request.getParameter("LRG_CODE"));
		paramMap.put("CUR", CUR);
		
		//공병코드 그룹을 조회
		productMasterService.getItmGb(paramMap);
		
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
//		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);	
		
	}

	 
 	/**
	 * 취급점포 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productStoreNewList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productStoreNewList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
  
		param.put("P_CORP_CODE"	  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ; 
	 	param.put("P_FOOD_MART_UPTAE_FLAG"    	,  request.getParameter("FOOD_MART_UPTAE_FLAG")) ; 
		param.put("P_MART_AND_MART_UPTAE_FLAG"    ,  request.getParameter("MART_AND_MART_UPTAE_FLAG")) ; 
		param.put("P_DC_CENTER_UPTAE_FLAG"    	,  request.getParameter("DC_CENTER_UPTAE_FLAG")) ; 
		param.put("P_DC_BONBU_UPTAE_FLAG"    	,  request.getParameter("DC_BONBU_UPTAE_FLAG")) ; 
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = productMasterService.productStoreNewList(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
 
		System.out.println("[ CUR ] : "         + jsonStr);
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
		
	
	
	
	/**
	 * 스캔코코드 중복검사.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productMasterScanCodeDup.do", method = RequestMethod.POST)
	@ResponseBody
	public    Map<String, Object>  productMasterScanCodeDup(HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		ProductCustomerVO  RETURN_CUR  = new  ProductCustomerVO ();
		  
		paramMap.put("CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;  
		paramMap.put("SCAN_CODE"    , request.getParameter("SCAN_CODE") ) ;  
		paramMap.put("RETURN_CUR"	, RETURN_CUR);
		    
		productMasterService.productMasterScanCodeDup(paramMap);
		   
		@SuppressWarnings("unchecked")
		List<ProductCustomerVO> RETURN_CUR_LIST = (List<ProductCustomerVO>) paramMap.get("RETURN_CUR"); 		  
		  
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson(  RETURN_CUR_LIST.get(0) );
		    
		paramMap.put("RETURN_CUR"	, jsonStr_RETURN_CUR );
		 
		return paramMap;
		  
	}
	
	 
	
	
	@RequestMapping(value = "/productImageFileUpload.do" , method = RequestMethod.POST ) 
//	@ResponseBody  
//	public String productImageFileUpload(@ModelAttribute("uploadForm") ProductMasterVO uploadForm ,HttpSession session, HttpServletRequest request) throws Exception {
	public String productImageFileUpload( MultipartHttpServletRequest req,   HttpSession session, HttpServletRequest request) throws Exception {

		
		MultipartFile file = req.getFile("files");
		// 단일 파일일 경우 html의 name에 설정된 이름으로 파일을 가져올 수 있다.
		System.out.println(file.getOriginalFilename());
 
		/*
		 String filePath="c:/temp/kk/";
         StringBuffer result=new StringBuffer();
         byte[] bytes=null;
		 for (int i=0;i<files.length;i++) {
             if (!files[i].isEmpty()) {
                 bytes = files[i].getBytes();
                 BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath+files[i].getOriginalFilename())));
                 stream.write(bytes);
                 stream.close();

                result.append(files[i].getOriginalFilename() + " Ok. ") ;
             }
             else {
                               result.append( files[i].getOriginalFilename() + " Failed. ");
             }
		 }
             
             System.out.println( "result.toString() : " + result.toString());
            */
             return "1";
		 /*
		List<MultipartFile> files = uploadForm.getFiles();
		List<String> fileNames = new ArrayList<String>(); 
		 
		System.out.println( "files.size() : " + files.size() );
		if (null != files && files.size() > 0) {
			System.out.println( "if : " );
			for (MultipartFile multipartFile : files) {
				String fileName = multipartFile.getOriginalFilename();

				String  path = uploadForm.getUpDir() + fileName;
				System.out.println( "path : " );
				System.out.println(  path );
				File f = new File(path);

				multipartFile.transferTo(f);

				fileNames.add(fileName);

			}
		}
*/
		
		//Iterator<String> itr =  req.getFileNames();
    	//MultipartFile files = req.getFile(itr.next());
    	// 파일이 여러개일경우 위와같이 사용 할 수 있다
//    	MultipartFile file = req.getFile("imageFile");
    	// 단일 파일일 경우 html의 name에 설정된 이름으로 파일을 가져올 수 있다.
//    	System.out.println(file.getOriginalFilename()  );
		
//    	System.out.println( req.getFiles().get(0).getOriginalFilename()  );
    	// 이건 그냥 파일 잘 받았나 확인 해본거
//    	return "1";
    	}

 
    		 
    
//    public Object uploadFile(MultipartHttpServletRequest request) {
//        Iterator<String> itr =  request.getFileNames();
//        
//        System.out.println( " uploaded!:" + request.getAttribute("imageFile[0]"));
//        
//        if(itr.hasNext()) {
//            MultipartFile mpf = request.getFile(itr.next());
//            System.out.println(mpf.getOriginalFilename() +" uploaded!");
//            try {
//                //just temporary save file info into ufile
//                System.out.println("file length : " + mpf.getBytes().length);
//                System.out.println("file name : " + mpf.getOriginalFilename());
//            } catch (IOException e) {
//                System.out.println(e.getMessage());
//                e.printStackTrace();
//            }
//            return true;
//        } else {
//            return false;
//        }
//    }
	
	/**
	 * 상품 마스터 묶음상품 정보 보기.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productMukkum.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productMukkum( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("P_CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;    
		param.put("P_ITM_CODE"     , request.getParameter("ITM_CODE")  ) ; 
		param.put("P_SCAN_CODE"     , request.getParameter("SCAN_CODE")  ) ; 
		param.put("CUR"			, CUR); 
 	    
		log.debug("===========================================================================");
		List<Map<String, Object>> resultList = productMasterService.productMukkum(param);
		
		log.debug("resultList : " +resultList);
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
  
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	 
	/**
	 * 박스상품 정보 보기.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productBoxList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  productBoxList( @RequestParam Map<String, Object> param , HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("P_CORP_CODE"    , CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;    
		param.put("P_ITM_CODE"     , request.getParameter("ITM_CODE")  ) ; 
		param.put("P_SCAN_CODE"     , request.getParameter("SCAN_CODE")  ) ; 
		param.put("CUR"			, CUR); 
 	    
		log.debug("===========================================================================");
		List<Map<String, Object>> resultList = productMasterService.productBoxList(param);
		
		log.debug("resultList : " +resultList);
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
  
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	 
	
	 
}
