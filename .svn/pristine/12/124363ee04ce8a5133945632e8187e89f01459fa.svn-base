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
package retail.posclosed.douzoneDay.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import retail.posclosed.douzoneDayMsSql.service.DouzoneDayMsSqlVO;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.common.EgovStringUtil;
import retail.common.service.CommService;
import retail.posclosed.douzoneDay.service.PosClosedDouzoneDayService;
import retail.posclosed.douzoneDayMsSql.service.DouzoneDayMsSqlService ;



/**
 * 
 * @Class Name : PosClosedDouzoneDayController.java
 * @Description : 영업정보 > POS정산 > POS마감정산
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 04.20           최초생성
 *
 * @author 김경진
 * @since 2017. 04. 20
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PosClosedDouzoneDayController {

	@Autowired
	private PosClosedDouzoneDayService posClosedDouzoneDayService;
	
	@Autowired
	private DouzoneDayMsSqlService douzoneDayMsSqlService;
	
	@Autowired
	private CommService commService;

	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedDouzoneDayController.class);
	
	/**
	 * POS마감정산 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedDouzoneDay.do", method = RequestMethod.GET)
	public ModelAndView posClosedDouzoneDay(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posclosed/douzoneDay/posClosedDouzoneDay");
		
		return mav; 
	}
	
	/**
	 * POS마감정산 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedDouzoneDayList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedDouzoneDayList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.getPosClosedDouzoneDay(param);
			//LOGGER.debug("result :: " + param.toString());
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 대변 차변 합계 및 차이 구하기
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedDouzoneDaySum.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedDouzoneDaySum(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.posClosedDouzoneDaySum(param);
			LOGGER.debug("result :: " + param.toString());
			
			result.put("DRCR_FG_AMT1", param.get("DRCR_FG_AMT1"));	// 차변
			result.put("DRCR_FG_AMT2", param.get("DRCR_FG_AMT2"));	// 대변
			result.put("DRCR_FG_AMT3", param.get("DRCR_FG_AMT3"));	// 대변
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 회계승인
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosClosedDouzoneDay.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosClosedDouzoneDay(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.updatePosClosedDouzoneDay(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 회계승인취소
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/canclePosClosedDouzoneDay.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> canclePosClosedDouzoneDay(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.canclePosClosedDouzoneDay(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 점장확정
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosClosedDouzoneDay1.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosClosedDouzoneDay1(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.updatePosClosedDouzoneDay1(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 담당자 확정
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosClosedDouzoneDay2.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosClosedDouzoneDay2(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.updatePosClosedDouzoneDay2(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 마감생성
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosClosedDouzoneDay3.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosClosedDouzoneDay3(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.updatePosClosedDouzoneDay3(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 행추가 항목 저장
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosClosedDouzoneDay4.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosClosedDouzoneDay4(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.updatePosClosedDouzoneDay4(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 재생성
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosClosedDouzoneDay5.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosClosedDouzoneDay5(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.updatePosClosedDouzoneDay5(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	
	
	
	/**
	 * oracle 에서 XML 추출해서 파일로 저장하기
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/oracleToXmlFileSave.do", method = RequestMethod.POST)
	@ResponseBody
	public void oracleToXmlFileSave(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();  
		try {
			
			LOGGER.debug("param :: " + param.toString());
//			param.put("CUR"			, CUR); 
			System.out.println( "====== oracle - select start ========="    );
			List<Map<String, Object>> resultList  = posClosedDouzoneDayService.oracleToXmlFileSave(param);
			LOGGER.debug("param :: " + param);
			LOGGER.debug("resultList :: " + resultList);  
			System.out.println("*************************** " + resultList.size() + "건 ************************************");
			System.out.println( "====== MSSQL - insert start ========="   );
			for(int i=0; i<resultList.size(); i++) { 
						DouzoneDayMsSqlVO params = new DouzoneDayMsSqlVO();
						
						System.out.println("*************************** SEQ : " + resultList.get(i).get("LN_SQ").toString() + " ************************************");
						params.setIN_DT(		resultList.get(i).get("IN_DT").toString() );
						params.setIN_SQ(		resultList.get(i).get("IN_SQ").toString() );
						params.setLN_SQ(		resultList.get(i).get("LN_SQ").toString() );
						params.setCO_CD(		resultList.get(i).get("CO_CD").toString() );
						params.setIN_DIV_CD(	resultList.get(i).get("IN_DIV_CD").toString() );
						params.setLOGIC_CD(		resultList.get(i).get("LOGIC_CD").toString() );
						params.setISU_DT(		resultList.get(i).get("ISU_DT").toString() );
						params.setISU_SQ(		resultList.get(i).get("ISU_SQ").toString() );
						params.setDIV_CD(		resultList.get(i).get("DIV_CD").toString() );
						params.setDEPT_CD(		resultList.get(i).get("DEPT_CD").toString() );
						params.setEMP_CD(		resultList.get(i).get("EMP_CD").toString() );
						params.setACCT_CD(		resultList.get(i).get("ACCT_CD").toString() );
						params.setDRCR_FG(		resultList.get(i).get("DRCR_FG").toString() );
						params.setACCT_AM(		resultList.get(i).get("ACCT_AM").toString() );
						params.setRMK_NB(		resultList.get(i).get("RMK_NB").toString() );
						params.setRMK_DC(		resultList.get(i).get("RMK_DC").toString() );
						params.setATTR_CD(		resultList.get(i).get("ATTR_CD").toString() );
						params.setTRCD_TY(		resultList.get(i).get("TRCD_TY").toString() );
						params.setTRNM_TY(		resultList.get(i).get("TRNM_TY").toString() );
						params.setDEPTCD_TY(	resultList.get(i).get("DEPTCD_TY").toString() );
						params.setPJTCD_TY(		resultList.get(i).get("PJTCD_TY").toString() );
						params.setCTNB_TY(		resultList.get(i).get("CTNB_TY").toString() );
						params.setFRDT_TY(		resultList.get(i).get("FRDT_TY").toString() );
						params.setTODT_TY(		resultList.get(i).get("TODT_TY").toString() );
						params.setQT_TY(		resultList.get(i).get("QT_TY").toString() );
						params.setAM_TY(		resultList.get(i).get("AM_TY").toString() );
						params.setRT_TY(		resultList.get(i).get("RT_TY").toString() );
						params.setDEAL_TY(		resultList.get(i).get("DEAL_TY").toString() );
						params.setUSER1_TY(		resultList.get(i).get("USER1_TY").toString() );
						params.setUSER2_TY(		resultList.get(i).get("USER2_TY").toString() );
						params.setTR_CD(		resultList.get(i).get("TR_CD").toString() );
						params.setTR_NM(		resultList.get(i).get("TR_NM").toString() );
						params.setCT_DEPT(		resultList.get(i).get("CT_DEPT").toString() );
						params.setDEPT_NM(		resultList.get(i).get("DEPT_NM").toString() );
						params.setPJT_CD(		resultList.get(i).get("PJT_CD").toString() );
						params.setPJT_NM(		resultList.get(i).get("PJT_NM").toString() );
						params.setCT_NB(		resultList.get(i).get("CT_NB").toString() );
						params.setFR_DT(		resultList.get(i).get("FR_DT").toString() );
						params.setTO_DT(		resultList.get(i).get("TO_DT").toString() );
						params.setCT_QT(		resultList.get(i).get("CT_QT").toString() );
						params.setCT_AM(		resultList.get(i).get("CT_AM").toString() );
						params.setCT_RT(		resultList.get(i).get("CT_RT").toString() );
						params.setCT_DEAL(		resultList.get(i).get("CT_DEAL").toString() );
						params.setDEAL_NM(		resultList.get(i).get("DEAL_NM").toString() );
						params.setCT_USER1(		resultList.get(i).get("CT_USER1").toString() );
						params.setUSER1_NM(		resultList.get(i).get("USER1_NM").toString() );
						params.setCT_USER2(		resultList.get(i).get("CT_USER2").toString() );
						params.setUSER2_NM(		resultList.get(i).get("USER2_NM").toString() );
						params.setEXCH_TY(		resultList.get(i).get("EXCH_TY").toString() );
						params.setEXCH_AM(		resultList.get(i).get("EXCH_AM").toString() );
						params.setPAYMENT(		resultList.get(i).get("PAYMENT").toString() );
						params.setISU_NM(		resultList.get(i).get("ISU_NM").toString() );
						params.setENDORS_NM(	resultList.get(i).get("ENDORS_NM").toString() );
						params.setBILL_FG1(		resultList.get(i).get("BILL_FG1").toString() );
						params.setBILL_FG2(		resultList.get(i).get("BILL_FG2").toString() );
						params.setDUMMY1(		resultList.get(i).get("DUMMY1").toString() );
						params.setDUMMY2(		resultList.get(i).get("DUMMY2").toString() );
						params.setDUMMY3(		resultList.get(i).get("DUMMY3").toString() );
						params.setISU_DOC(		resultList.get(i).get("ISU_DOC").toString() );
						params.setJEONJA_YN(	resultList.get(i).get("JEONJA_YN").toString() );
						params.setEX_FG(		resultList.get(i).get("EX_FG").toString() );
						params.setYN(			resultList.get(i).get("YN").toString() );
//						params.setINSERT_DT(	resultList.get(i).get("INSERT_DT").toString() );
						
						System.out.println("IN_DT : " + resultList.get(i).get("IN_DT"));
						
						// 일단 주석 
					    douzoneDayMsSqlService.insertAccountMsSql(params);
				 
				 
			}
			 
		 
			
//			Gson gson = new Gson(); 
//			String jsonStr 				= gson.toJson(  resultList  );
//	  
//			response.setContentType("text/json; charset=utf-8");
//			response.getWriter().print(jsonStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		 
	}
	
	
	/**
	 * POS마감정산 엑셀다운(더존) 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedDouzoneDayList_excel.do", method = RequestMethod.POST)
	public ModelAndView posClosedCardListExcel(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		//엑셀부분과 조건 체크하는 부분 자바 컨트롤러 및 DB 프로시저 나누기. 작업 해야함.  진행중.
		ModelAndView mav = new  ModelAndView();
		List<Map<String, Object>> result = null;
		Map<String, Object> result_out = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			result = posClosedDouzoneDayService.posClosedDouzoneDayList_excel(param);
			LOGGER.debug("result :: " + result.toString());
		
			
			mav.addObject("sale_dt",(((String) param.get("P_SALE_DT")).replace("-","_")));
			mav.addObject("str_code", param.get("P_STR_CODE"));
			mav.addObject("excelList", result);
			mav.setViewName("retail/posclosed/douzoneDay/posClosedDouzoneDayList_excel");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return mav;
	}
	
	
	/**
	 * POS마감정산 > 엑셀다운로드(더존) 조건 체크
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedDouzoneDayList_excel_ch.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedDouzoneDayList_excel_ch(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result_out = new HashMap<String, Object>();
		param.put("P_RETURN_CODE", "1111");	//1111 성공코드셋팅하고
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneDayService.posClosedDouzoneDayList_excel_ch(param);
			LOGGER.debug("result :: " + result_out);
			
			
			result_out.put("RETURN_CODE", param.get("RETURN_CODE"));
			result_out.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result_out;
	}
	
	
}
