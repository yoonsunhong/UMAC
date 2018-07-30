package retail.wms.stock.wmsStockRealExcel.web;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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

import retail.common.BaseEnv;
import retail.common.CommonUtil;
import retail.common.ExcelRead;
import retail.common.ExcelReadOption;
import retail.wms.stock.wmsStockRealExcel.service.WmsStockRealExcelService;

import com.google.gson.Gson;

/**
 * 실사재고엑셀조정
 * @author 문희훈
 * @since 2017. 05.03
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class WmsStockRealExcelController {
	@Autowired
	private WmsStockRealExcelService wmsStockRealExcelService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	 // 글로벌 파일 경로    
    @Value("#{props['Globals.FileUrl']}")
    private String globalsFileUrl;     	

	/**
	 * 실사재고엑셀조정
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/wmsStockRealExcel.do", method = RequestMethod.GET)
	public ModelAndView wmsStockRealExcel(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/wms/stock/wmsStockRealExcel/wmsStockRealExcel"); 
		return   mav; 
	}
	
	
	/**
	 * 점포별 재고조사 날짜 리스트 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsInvInspDtList.do", method=RequestMethod.POST)
	public void getWmsInvInspDtList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("CUR", CUR);
		
		//점포별 재고조사 날짜 리스트 조회
		wmsStockRealExcelService.getWmsInvInspDtList(paramMap);
		
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);	
		
	}
	
	/**
	 * 점포별 전  재고조사 날짜 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "getWmsInvBeforeDt.do", method=RequestMethod.POST)
	public void getWmsInvBeforeDt( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		paramMap.put("P_INV_DT", request.getParameter("P_INV_DT").replaceAll("-", ""));
		paramMap.put("CUR", CUR);
		
		//점포별 전  재고조사 날짜 조회
		wmsStockRealExcelService.getWmsInvBeforeDt(paramMap);
		
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);	
		
	}
	
	
	/**
	 * 실사재고엑셀조정 조회
	 * @param param
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsStockRealExcelList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getStockRealExcelList(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		 
		param.put("P_CORP_CODE"    			, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("CUR"	     					, CUR);
		
		
		//실사재고엑셀조정 조회
		wmsStockRealExcelService.getWmsStockRealExcelList(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   
				
	}
	
	
	/**
	 * 엑셀업로드
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsStockExcelUpload.do", method = RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object> stockExcelUpload(MultipartHttpServletRequest request, HttpServletResponse response)throws Exception{
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		String CORP_CODE = CommonUtil.getEnv(request.getSession()).getCORP_CODE();
		String IEMP_NO = CommonUtil.getEnv(request.getSession()).getUserId();
		String STR_CODE = request.getParameter("PARAM1");
		String INV_INSP_SCHD_ID = request.getParameter("PARAM2").replaceAll("-", "");
		String INV_BEFORE_ID = request.getParameter("PARAM3").replaceAll("-", "");
		
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
        /**
         * A:점포코드
         * B:점포명	
         * C:ZONE	
         * D:RACK
         * E:LINE
         * F:재고조사일
         * G:실사재고ID	
         * H:매장종류코드
         * I:상품코드
         * J:상품명
         * K:실사수량
         * */
        excelReadOption.setOutputColumns("A","B","C","D","E","F","G","H","I","J","K");

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
        	Element P_STR_CODE = new Element("P_STR_CODE");
  		    Element P_INV_INSP_SCHD_ID = new Element("P_INV_INSP_SCHD_ID");
  		    Element P_INV_BEFORE_ID = new Element("P_INV_BEFORE_ID");
  		    Element P_INV_DT = new Element("P_INV_DT");
  		    Element P_ITM_CODE = new Element("P_ITM_CODE");
  		    Element P_MKT_GB = new Element("P_MKT_GB");
  		    Element P_LINE_CODE = new Element("P_LINE_CODE");
  		    Element P_DEC_QTY = new Element("P_DEC_QTY");
  		    Element P_IEMP_NO = new Element("P_IEMP_NO");
  		    
  		  
  		    ////3DEPT설정 (엘리먼트에 값 맵핑)
  		  	P_CORP_CODE.setText(CORP_CODE);							//기업코드
  		  	P_STR_CODE.setText(article.get("A"));							//점포코드
  		  	P_INV_INSP_SCHD_ID.setText(INV_INSP_SCHD_ID);		//재고조사일정ID
  		    P_INV_BEFORE_ID.setText(INV_BEFORE_ID);				    //전재고조사일정ID
  		    P_INV_DT.setText(article.get("F"));				    			//재고조사일
  		    P_ITM_CODE.setText(article.get("I"));			    			//제품코드
  		    P_MKT_GB.setText(article.get("H"));							//매장구분
  		    P_LINE_CODE.setText(article.get("E"));						//라인코드
  		    P_DEC_QTY.setText(article.get("K"));							//실사수량
  		  	P_IEMP_NO.setText(IEMP_NO);									//등록ID
		  
  		  	//2DEPT 하위에 3DEPT 데이터항목 넣기
  		  	GRIDROW.addContent(P_CORP_CODE); 				//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_STR_CODE); 					//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_INV_INSP_SCHD_ID); 		//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_INV_BEFORE_ID); 			//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_INV_DT); 						//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_ITM_CODE); 					//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_MKT_GB); 					 	//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_LINE_CODE); 					//package element 의 하위로 package-name 만들기
  		  	GRIDROW.addContent(P_DEC_QTY); 					//package element 의 하위로 package-name 만들기
  		    GRIDROW.addContent(P_IEMP_NO); 					//package element 의 하위로 package-name 만들기
  		  	
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
	  	result.put("P_INV_INSP_SCHD_ID", INV_INSP_SCHD_ID);
	  	result.put("P_INV_BEFORE_ID", INV_BEFORE_ID);
	  	result.put("P_IEMP_NO", IEMP_NO);
	  	result.put("P_EXCEL_UPLOAD_XML_DATA1", P_EXCEL_UPLOAD_XML_DATA1);
		result.put("CUR", CUR);
		System.out.println(result.toString());
		//System.out.println(P_EXCEL_UPLOAD_XML_DATA1);
		/**
		 * EXCEL 업로드 데이터 TEMP디비에 저장 후 유효성 체크 
		 * 1.해당 점포에 취급하는 상품 인지 체크
		 * 2.재고수량이 숫자인지 체크
		 * 3.매장구분 1 OR 2로 입력했는지
		 */
		wmsStockRealExcelService.wmsStockExcelUpload(result);
		
        Gson gson = new Gson(); 
		String jsonList = gson.toJson(  result.get("CUR") );
		
		result.put("list", jsonList);
		
		//System.out.println(result.get("VALID_YN"));
		
		//1개의 ROW라도 문제가 있으면 VALID_YN 값 -> N  , Y일경우만 업로드 가능
		result.put("VALID_YN", result.get("VALID_YN"));
			
		return result;
	}
	
	/**
	 * 실사재고엑셀조정 엑셀 업로드 데이터 저장
	 * @param param
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/saveWmsStockExcelData.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveStockExcelData(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		String P_GRID_XML_DATA1 = request.getParameter("gridXmlData1" ); 
		
		//System.out.println("GRID_XML_DATA2 : " + P_GRID_XML_DATA1 );
		 
		param.put("P_CORP_CODE"    			, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_UEMP_NO" 	    		, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("P_GRID_XML_DATA1"   	, P_GRID_XML_DATA1 ) ;   
		param.put("CUR"	     					, CUR);
		
		
		//실사재고엑셀조정 엑셀 업로드 데이터 저장
		wmsStockRealExcelService.saveWmsStockExcelData(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  param.get("CUR") );
		param.put("CUR"	, jsonStr);           
				
		return param;
	}
	
	
}
