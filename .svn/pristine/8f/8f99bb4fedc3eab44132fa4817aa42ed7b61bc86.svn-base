package retail.business.notice.web;

import java.io.File;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import retail.business.notice.service.BusinessNoticeService;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.common.SessionModel;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 
 * @Class Name : BusinessNoticeController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.29           최초생성
 *
 * @author 김창열
 * @since 2016. 12. 29.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class BusinessNoticeController {

	@Autowired
	private BusinessNoticeService businessNoticeService;
		
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
    // 글로벌 파일 경로    
    @Value("#{props['Globals.FileUrl']}")
    private String globalsFileUrl;
	
	
	/**
	 * 공지사항(유맥)
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessNotice.do", method = RequestMethod.GET)
	public ModelAndView businessNotice(@RequestParam Map<String, Object> param, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/notice/businessNotice"); 
		
		return mav; 
	}
	
	/**
	 * 공지사항(유맥) 리스트
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessNoticeInputList.do", method = RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object> businessNoticeInputList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session, HttpServletRequest request)throws Exception { 
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			param.put("P_OPEN_DT", ((String)param.get("P_OPEN_DT")).replaceAll("-",""));
			param.put("P_END_DT", ((String)param.get("P_END_DT")).replaceAll("-",""));							
						
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());			
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("BusinessNoticeController.businessNoticeInputList param :: " + param.toString());
			param = businessNoticeService.businessNoticeInputList(param);
			log.debug("result : " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));		
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
		
		return result;
	}
	
	
	
	/**
	 * 공지사항(유맥) 팝업 저장  
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessNoticeInputInsert.do", method = RequestMethod.POST)
	@ResponseBody
	public void businessNoticeInputInsert(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session, MultipartHttpServletRequest req, HttpServletRequest request)throws Exception { 
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("D_IEMP_NO", sessionModel.getUserId());
			param.put("D_CORP_CODE", sessionModel.getCORP_CODE());
			
			param.put("D_OPEN_DT", ((String)param.get("D_OPEN_DT")).replaceAll("-",""));
			param.put("D_END_DT", ((String)param.get("D_END_DT")).replaceAll("-",""));
			
			log.debug("===========================================================================");
			log.debug("BusinessNoticeController.businessNoticeInputInsert param :: " + param.toString());			
						
			businessNoticeService.businessNoticeInputInsert(param,req);     
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}	
	
	/**
	 * 공지사항(유맥) 팝업 수정 삭제 
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessNoticeInputUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public void businessNoticeInputUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session, MultipartHttpServletRequest req, HttpServletRequest request)throws Exception { 
		try {
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());

			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("D_UEMP_NO", sessionModel.getUserId());			
			param.put("D_OPEN_DT", ((String)param.get("D_OPEN_DT")).replaceAll("-",""));
			param.put("D_END_DT", ((String)param.get("D_END_DT")).replaceAll("-",""));
			
			log.debug("===========================================================================");
			log.debug("BusinessNoticeController.businessNoticeInputUpdate param :: " + param.toString());			
						
			businessNoticeService.businessNoticeInputUpdate(param,req);			
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}	

	/**
	 * 공지사항(유맥) 첨부파일 삭제 
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessNoticeInputFileDelete.do", method = RequestMethod.POST)
	@ResponseBody
	public void businessNoticeInputFileDelete(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception { 
		try {
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("BusinessNoticeController.businessNoticeInputFileDelete param :: " + param.toString());
			
			businessNoticeService.businessNoticeInputFileDelete(param);			
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
	}	
	
	
	/**
	 * 공지사항(유맥) 첨부파일 다운로드 
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessNoticeInputFileDownload.do", method = RequestMethod.POST)
	public void businessNoticeInputFileDownload(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		log.debug("===========================================================================");
		log.debug("BusinessNoticeController.businessNoticeInputFileDownload param :: " + param.toString());
		
		List<Map<String, Object>> resultList = businessNoticeService.businessNoticeInputFileDownload(param);
		log.debug("result : " + resultList);
					
		String FILE_NAME = (String) resultList.get(0).get("FILE_NAME");		//오리지널 이름	
		String FILE_NAME1 = (String) resultList.get(0).get("FILE_NAME1");	//랜덤이름
		File file = new File(globalsFileUrl+FILE_NAME1);
		if(file.isFile()){
			//byte fileByte[] = FileUtils.readFileToByteArray(new File(globalsFileUrl+FILE_NAME1));
			byte fileByte[] = FileUtils.readFileToByteArray(file);
			
		    response.setContentType("application/octet-stream");
		    response.setContentLength(fileByte.length);
		    response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(FILE_NAME,"UTF-8")+"\";");
		    response.setHeader("Content-Transfer-Encoding", "binary");
		    response.getOutputStream().write(fileByte);

		    response.getOutputStream().flush();
		    response.getOutputStream().close();
		}else{
			log.debug("BusinessNoticeController.businessNoticeInputFileDownload :: " + FILE_NAME + " 파일이 없습니다.");			
		}		
	}
	
	/**
	 * 공지사항(유맥)
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessNoticeV2.do", method = RequestMethod.GET)
	public ModelAndView businessNoticeV2(@RequestParam Map<String, Object> param, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/notice/businessNoticeV2"); 
		
		return mav; 
	}	
	
	
	/**
	 * 공지사항(유맥) 리스트
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessNoticeV2InputList.do", method = RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object> businessNoticeV2InputList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session, HttpServletRequest request)throws Exception { 
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			param.put("P_OPEN_DT", ((String)param.get("P_OPEN_DT")).replaceAll("-",""));
			param.put("P_END_DT", ((String)param.get("P_END_DT")).replaceAll("-",""));							
						
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());			
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("BusinessNoticeController.businessNoticeV2InputList param :: " + param.toString());
			param = businessNoticeService.businessNoticeV2InputList(param);
			log.debug("result : " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));		
			
		} catch (Exception e) {
			e.printStackTrace();			
		}
		
		return result;
	}
		
}








