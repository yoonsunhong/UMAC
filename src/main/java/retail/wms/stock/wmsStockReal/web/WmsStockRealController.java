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
package retail.wms.stock.wmsStockReal.web;

 
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
import retail.wms.stock.wmsStockReal.service.WmsStockRealService;


/**
 * WMS-실사재고 등록
 * @author 문희훈
 * @since 2017. 02.26
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class WmsStockRealController {

	@Autowired
	private WmsStockRealService wmsStockRealService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	 // 글로벌 파일 경로    
    @Value("#{props['Globals.FileUrl']}")
    private String globalsFileUrl;     	

	/**
	 * 실사재고등록 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/wmsStockReal.do", method = RequestMethod.GET)
	public ModelAndView wmsStockReal(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/wms/stock/wmsStockReal/wmsStockReal"); 
		return   mav; 
	}
	
	/**
	 * 실사재고조정(확정) 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/wmsStockRealConfirm.do", method = RequestMethod.GET)
	public ModelAndView wmsStockRealConfirm(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/wms/stock/wmsStockReal/wmsStockRealConfirm"); 
		return   mav; 
	}
	
	/**
	 * 점포에 예정된 재고조사 일정 ID 리스트 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsInvInspSchdIdList.do", method=RequestMethod.POST)
	public void getWmsInvInspSchdIdList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("CUR", CUR);
		
		//점포에 예정된 재고조사 일정 ID 리스트 조회
		wmsStockRealService.getWmsInvInspSchdIdList(paramMap);
		
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);	
		
	}
	
	/**
	 * 재고조사 일정 ID로 조사일자 조회, 재고조사 확정여부 조회
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsInvInspDt.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getWmsInvInspDt(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		
		param.put("P_INV_INSP_SCHD_ID", ((String) param.get("P_INV_INSP_SCHD_ID")).replaceAll("-", ""));
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		wmsStockRealService.getWmsInvInspDt(param);
		
		result.put("INV_INSP_DT", param.get("INV_INSP_DT"));
		result.put("CFM_FLAG", param.get("CFM_FLAG"));
		
			
		return result;
	}
	
	/**
	 * 바코드로 상품정보 가지고오기
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsProductDtlInfo.do", method = RequestMethod.POST)
	@ResponseBody
	public void getWmsProductDtlInfo(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("CUR", CUR);
		
		wmsStockRealService.getWmsProductDtlInfo(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
		/*result.put("SCAN_CODE", param.get("SCAN_CODE"));
		result.put("ITM_CODE", param.get("ITM_CODE"));
		result.put("ITM_NAME", param.get("ITM_NAME"));
		result.put("LRG_CODE_NAME", param.get("LRG_CODE_NAME"));
		result.put("UNIT", param.get("UNIT"));
		result.put("WPRC", param.get("WPRC"));
		result.put("SPRC", param.get("SPRC"));
		result.put("VEN_CODE", param.get("VEN_CODE"));
		result.put("VEN_NAME", param.get("VEN_NAME"));*/
		
	}
	
	/**
	 * 엑셀업로드
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsStockGridExcelUpload.do", method = RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object> wmsStockGridExcelUpload(MultipartHttpServletRequest request, HttpServletResponse response)throws Exception{
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		String CORP_CODE = CommonUtil.getEnv(request.getSession()).getCORP_CODE();
		String SURVEY_NO = CommonUtil.getEnv(request.getSession()).getUserId();
		String IEMP_NO = CommonUtil.getEnv(request.getSession()).getUserId();
		String STR_CODE = request.getParameter("PARAM1");
		String INV_INSP_SCHD_ID = request.getParameter("PARAM2").replaceAll("-", "");
		String INV_INSP_DT = request.getParameter("PARAM3").replaceAll("-", "");
		String MKT_GB = request.getParameter("PARAM4");
		
		//System.out.println(INV_INSP_SCHD_ID);
		
		MultipartFile excelFile =request.getFile("excelFile");
        System.out.println("엑셀 파일 업로드 컨트롤러");
       
        //temporaryDir 정보 할당
		File temporaryDir = new File(BaseEnv.FILE_PATH_TEMP);
		
		// 디렉토리가 없을경우 디렉토리 생성
		if ( !temporaryDir.isDirectory() ) {
			temporaryDir.mkdirs();
		}
		
        File destFile = new File(temporaryDir+"\\"+excelFile.getOriginalFilename());
        try{
        	//엑셀파일 복사
            excelFile.transferTo(destFile);
        }catch(IllegalStateException | IOException e){
            throw new RuntimeException(e.getMessage(),e);
        }
        
        //Service 단에서 가져온 코드 
        ExcelReadOption excelReadOption = new ExcelReadOption();
        excelReadOption.setFilePath(destFile.getAbsolutePath());
        excelReadOption.setOutputColumns("A","B","C","D","E");
        excelReadOption.setStartRow(2);
        
        
        List<Map<String, String>>excelContent =ExcelRead.read(excelReadOption);
        
        //XML 형식으로 변환 시작
        Document doc = new Document();  
        //최상위 1DEPT ROOT설정
  	  	Element GRIDLIST = new Element("GRIDLIST");
  	  	
  	  	//엑셀 업로드 재고조사 리스트 XML데이터 생성
        for(Map<String, String> article: excelContent){
        	
        	//2DEPT 설정
        	Element GRIDROW = new Element("GRIDROW");
        	
        	//1DEPT 하위에 2DEPT 데이터항목 넣기
        	GRIDLIST.addContent(GRIDROW);//root element 의 하위 element 를 만들기
        	
        	//3DEPT설정 (엘리먼트명 설정)
        	Element P_CORP_CODE = new Element("P_CORP_CODE");
  		  	Element P_INV_DT = new Element("P_INV_DT");
  		    Element P_INV_INSP_SCHD_ID = new Element("P_INV_INSP_SCHD_ID");
  		    Element P_SURVEY_NO = new Element("P_SURVEY_NO");
  		    Element P_MKT_GB = new Element("P_MKT_GB");
  		    Element P_INV_QTY = new Element("P_INV_QTY");
  		    Element P_IEMP_NO = new Element("P_IEMP_NO");
  		    Element P_STR_CODE = new Element("P_STR_CODE");
  		    Element P_SCAN_CODE = new Element("P_SCAN_CODE");
  		    Element P_LINE_CODE = new Element("P_LINE_CODE");
  		  
  		    ////3DEPT설정 (엘리먼트에 값 맵핑)
  		  	P_CORP_CODE.setText(CORP_CODE);							//기업코드
  		  	P_INV_DT.setText(INV_INSP_DT);								//실사일자
  		  	P_INV_INSP_SCHD_ID.setText(INV_INSP_SCHD_ID);		//재고조사일정ID
  		  	P_SURVEY_NO.setText(SURVEY_NO);							//조사자
  		  	P_MKT_GB.setText(article.get("E"));							//매장구분
  		  	P_INV_QTY.setText(article.get("D"));							//조사수량
  		  	P_IEMP_NO.setText(IEMP_NO);									//등록ID
  		  	P_STR_CODE.setText(article.get("A"));							//점포코드
  		  	P_SCAN_CODE.setText(article.get("C"));						//스캔코드
  		  	P_LINE_CODE.setText(article.get("B"));						//라인코드
		  
  		  	//2DEPT 하위에 3DEPT 데이터항목 넣기
  		  	GRIDROW.addContent(P_CORP_CODE); 				//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_INV_DT); 						//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_INV_INSP_SCHD_ID); 		//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_SURVEY_NO); 				//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_MKT_GB); 						//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_INV_QTY); 					//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_IEMP_NO); 					//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_STR_CODE); 					//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_SCAN_CODE); 				//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_LINE_CODE); 					//package element 의 하위로 package-name 만들기
  		  	
  		  	//엑셀에서 추출한 항목 
  		  	//System.out.println(article.get("A")); //점포코드
            //System.out.println(article.get("B")); //스캐님코드
            //System.out.println(article.get("C")); //조사수량
            //System.out.println(article.get("D")); //매장구분(매장:1 창고:2)
        }
        
        //XML 셋팅
	    doc.setRootElement(GRIDLIST);
	  	  
	  	//xml 파일을 떨구기 위한 경로와 파일 이름 지정해 주기
	  	XMLOutputter serializer = new XMLOutputter();                 
	  	Format f = serializer.getFormat();              
	  	  
	  	//String 으로 xml 출력
	  	XMLOutputter outputter = new XMLOutputter(Format.getPrettyFormat().setEncoding("UTF-8")) ;
	  	//System.out.println(outputter.outputString(doc));
	  	
	  	
	  	//DB에 보낼 XML업로드 데이터  셋팅
	  	String P_EXCEL_UPLOAD_XML_DATA1 = "";
	  	
	  	P_EXCEL_UPLOAD_XML_DATA1 = outputter.outputString(doc);
	  	
	  	result.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
	  	result.put("P_STR_CODE", STR_CODE);
	  	result.put("P_SURVEY_NO", SURVEY_NO);
	  	result.put("P_INV_INSP_SCHD_ID", INV_INSP_SCHD_ID);
	  	result.put("P_INV_INSP_DT", INV_INSP_DT);
	  	result.put("P_EXCEL_UPLOAD_XML_DATA1", P_EXCEL_UPLOAD_XML_DATA1);
		result.put("CUR", CUR);
		
		//System.out.println(P_EXCEL_UPLOAD_XML_DATA1);
		/**
		 * EXCEL 업로드 데이터 TEMP디비에 저장 후 유효성 체크 
		 * 1.해당 점포에 취급하는 상품 인지 체크
		 * 2.스캔코드가 13자리 인지 체크 (숫자형)
		 * 3.재고수량이 숫자인지 체크
		 * 4.매장구분 1 OR 2로 입력했는지
		 */
		wmsStockRealService.wmsStockGridExcelUpload(result);
		
        Gson gson = new Gson(); 
		String jsonList = gson.toJson(  result.get("CUR") );
		
		result.put("list", jsonList);
		
		//System.out.println(result.get("VALID_YN"));
		
		//1개의 ROW라도 문제가 있으면 VALID_YN 값 -> N  , Y일경우만 업로드 가능
		result.put("VALID_YN", result.get("VALID_YN"));
			
		return result;
	}
	
	
	/**
	 * 실사재고 그리드1데이터 저장
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/saveWmsStockRealData.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveWmsStockRealData(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		String P_GRID_XML_DATA1 = request.getParameter("gridXmlData1" ); 
		
		//System.out.println("GRID_XML_DATA2 : " + P_GRID_XML_DATA1 );
		 
		param.put("P_CORP_CODE"    			, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_UEMP_NO" 	    		, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("P_INV_INSP_SCHD_ID" 	, ((String) param.get("P_INV_INSP_SCHD_ID")).replaceAll("-", "") ) ;
		param.put("P_INV_INSP_DT" 			, ((String) param.get("P_INV_INSP_DT")).replaceAll("-", "") ) ;
		param.put("P_GRID_XML_DATA1"   	, P_GRID_XML_DATA1 ) ;   
		param.put("CUR"	     					, CUR);
		
		
		//실사재고 그리드1데이터 저장
		wmsStockRealService.saveWmsStockRealData(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  param.get("CUR") );
		param.put("CUR"	, jsonStr);           
				
		return param;
	}
	
	
	/**
	 * 실사재고 조회 - 탭1
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getWmsStockRealData.do", method = RequestMethod.POST)
	@ResponseBody
	public void getWmsStockRealData(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		 
		param.put("P_CORP_CODE"    			, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_INV_INSP_SCHD_ID" 	, ((String) param.get("P_INV_INSP_SCHD_ID")).replaceAll("-", "") ) ;
		param.put("P_INV_INSP_DT" 			, ((String) param.get("P_INV_INSP_DT")).replaceAll("-", "") ) ;
		param.put("CUR"	     					, CUR);
		
		
		//실사재고 조회
		wmsStockRealService.getWmsStockRealData(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   
				
	}
	
	/**
	 * 실사재고 조회(확정) - 탭2
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getWmsStockRealDataCheckList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getWmsStockRealDataCheckList(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		 
		param.put("P_CORP_CODE"    			, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_INV_INSP_SCHD_ID" 	, ((String) param.get("P_INV_INSP_SCHD_ID")).replaceAll("-", "") ) ;
		param.put("P_INV_INSP_DT" 			, ((String) param.get("P_INV_INSP_DT")).replaceAll("-", "") ) ;
		param.put("CUR"	     					, CUR);
		
		
		//실사재고 조회(확정) - 탭2
		wmsStockRealService.getWmsStockRealDataCheckList(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   
				
	}
	
	
	/**
	 * 실사재고 그리드2 데이터 수정/삭제
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateWmsStockRealData.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateWmsStockRealData(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		String P_GRID_XML_DATA2 = request.getParameter("gridXmlData2" ); 
		
		//System.out.println("GRID_XML_DATA2 : " + P_GRID_XML_DATA1 );
		 
		param.put("P_CORP_CODE"    			, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_UEMP_NO" 	    		, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("P_INV_INSP_SCHD_ID" 	, ((String) param.get("P_INV_INSP_SCHD_ID")).replaceAll("-", "") ) ;
		param.put("P_INV_INSP_DT" 			, ((String) param.get("P_INV_INSP_DT")).replaceAll("-", "") ) ;
		param.put("P_GRID_XML_DATA2"   	, P_GRID_XML_DATA2 ) ;   
		param.put("CUR"	     					, CUR);
		
		
		//실사재고 그리드2 데이터 수정/삭제
		wmsStockRealService.updateWmsStockRealData(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  param.get("CUR") );
		param.put("CUR"	, jsonStr);           
				
		return param;
	}
	
	/**
	 * 실사재고 그리드2 데이터 확정
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/submitWmsStockRealData.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> submitWmsStockRealData(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		//String P_GRID_XML_DATA2 = request.getParameter("gridXmlData2" ); 
		
		//System.out.println("GRID_XML_DATA2 : " + P_GRID_XML_DATA1 );
		 
		param.put("P_CORP_CODE"    			, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_UEMP_NO" 	    		, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("P_INV_INSP_SCHD_ID" 	, ((String) param.get("P_INV_INSP_SCHD_ID")).replaceAll("-", "") ) ;
		param.put("P_INV_INSP_DT" 			, ((String) param.get("P_INV_INSP_DT")).replaceAll("-", "") ) ;
		//param.put("P_GRID_XML_DATA2"   	, P_GRID_XML_DATA2 ) ;   
		param.put("CUR"	     					, CUR);
		
		
		//실사재고 그리드2 데이터 확정
		wmsStockRealService.submitWmsStockRealData(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  param.get("CUR") );
		param.put("CUR"	, jsonStr);           
				
		return param;
	}
	
	
}
