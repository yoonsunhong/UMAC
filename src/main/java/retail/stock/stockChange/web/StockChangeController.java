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
package retail.stock.stockChange.web;

 
import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;





import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.tika.Tika;
import org.apache.tomcat.util.codec.binary.Base64;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.common.BaseEnv;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.common.EgovWebUtil;
import retail.common.ExcelRead;
import retail.common.ExcelReadOption;
import retail.common.JqGridResult;
import retail.stock.stockChange.service.StockChangeService;



/**
 * 재고조정 등록
 * @author 문희훈
 * @since 2017. 04.17
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class StockChangeController {

	@Autowired
	private StockChangeService stockChangeService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	 // 글로벌 파일 경로    
    @Value("#{props['Globals.FileUrl']}")
    private String globalsFileUrl;     	

	/**
	 * 재고조정 등록
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/stockChange.do", method = RequestMethod.GET)
	public ModelAndView stockChange(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/stock/stockChange/stockChange"); 
		return   mav; 
	}
	
	/**
	 * 재고조정 상품 등록여부 체크
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getProductInsertCheck.do", method = RequestMethod.POST)
	@ResponseBody
	public void getProductInsertCheck(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("CUR", CUR);
		
		stockChangeService.getProductInsertCheck(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 일수불 상품정보 가지고오기
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getProductCollDtlInfo.do", method = RequestMethod.POST)
	@ResponseBody
	public void getProductCollDtlInfo(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("CUR", CUR);
		
		stockChangeService.getProductCollDtlInfo(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	
	/**
	 * 재고조정 등록
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertProductChangeInfo.do", method = RequestMethod.POST)
	@ResponseBody
	public void insertProductChangeInfo(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_IEMP_NO" 	, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("CUR", CUR);
		
		stockChangeService.insertProductChangeInfo(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 재고조정목록조회
	 * @param param
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectProductChangeInfo.do", method=RequestMethod.POST)
	@ResponseBody
	public void selectProductChangeInfo(@RequestParam Map<String, Object> param, HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("CUR", CUR);
		
		//재고조정목록조회
		stockChangeService.selectProductChangeInfo(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
			
	}
	
	/**
	 * 재고조정수정
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateProductChangeInfo.do	", method = RequestMethod.POST)
	@ResponseBody
	public void updateProductChangeInfo(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_IEMP_NO" 	, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("CUR", CUR);
		
		//log.debug("===========================================================================");
		//log.debug("stockChangeService.updateProductChangeInfo param :: " + param.toString());
		
		stockChangeService.updateProductChangeInfo(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		//log.debug("param.get(CUR) :: " + param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 재고조정삭제
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteProductChangeInfo.do", method = RequestMethod.POST)
	@ResponseBody
	public void deleteProductChangeInfo(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_IEMP_NO" 	, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		
		param.put("P_INV_DT", ((String) param.get("INV_DT")).replaceAll("-", "") );
		param.put("P_STR_CODE", param.get("STR_CODE"));
		param.put("P_ITM_CODE", param.get("ITM_CODE"));
		param.put("P_SCAN_CODE", param.get("SCAN_CODE"));
		param.put("P_INV_GB", param.get("INV_GB_CODE"));
		
		param.put("CUR", CUR);
		
		stockChangeService.deleteProductChangeInfo(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	
	/**
	 * 재고조정확정
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/submitProductChangeInfo.do", method = RequestMethod.POST)
	@ResponseBody
	public void submitProductChangeInfo(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		param.put("P_CORP_CODE", 	CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_IEMP_NO", 		CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("P_INV_DT", 		((String) param.get("INV_DT")).replaceAll("-", "") );
		param.put("P_INV_GB", 		param.get("INV_GB_CODE"));
		param.put("P_STR_CODE", 	param.get("STR_CODE"));
		param.put("P_ITM_CODE", 	param.get("ITM_CODE"));
		param.put("P_SCAN_CODE", 	param.get("SCAN_CODE"));
		param.put("CUR", CUR);
		
		//log.debug("===========================================================================");
		//log.debug("stockChangeService.submitProductChangeInfo param :: " + param.toString());
		
		stockChangeService.submitProductChangeInfo(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		//log.debug("param.get(CUR) :: " + param.get("CUR"));
		
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
}
