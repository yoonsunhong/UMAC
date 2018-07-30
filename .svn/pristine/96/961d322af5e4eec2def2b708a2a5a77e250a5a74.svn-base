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
package retail.posclosed.receipt.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

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
import retail.posclosed.receipt.service.PosClosedReceiptService;

/**
 * 
 * @Class Name : PosClosedReceiptController.java
 * @Description : 영업정보 > POS정산 > POS영수증조회
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 03.21           최초생성
 *
 * @author 김경진
 * @since 2017. 03. 21
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PosClosedReceiptController {

	@Autowired
	private PosClosedReceiptService posClosedReceiptService;
	
	@Autowired
	private CommService commService;

	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedReceiptController.class);
	
	/**
	 * POS영수증조회 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedReceipt.do", method = RequestMethod.GET)
	public ModelAndView posClosedReceipt(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posclosed/receipt/posClosedReceipt");
		
		return mav; 
	}
	
	/**
	 * POS영수증조회 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedReceiptList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedReceiptList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 25));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedReceiptService.getPosClosedReceipt(param);
			//LOGGER.debug("result :: " + param.toString());
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));
			
			/*List<HashMap<String, Object>> resultList = (List<HashMap<String, Object>>) param.get("CUR");
			if(resultList != null)
			{
				for (HashMap<String, Object> info : resultList) {
					{
						if( info.get("JURNAL") instanceof java.sql.Clob ) {
							info.put("JURNAL", EgovStringUtil.clobToString(((java.sql.Clob)info.get("JURNAL"))));
							System.out.println("JURNAL ::::" + info.get("JURNAL"));
						}
						
						if( info.get("RECEIPT") instanceof java.sql.Clob ) {
							info.put("RECEIPT", EgovStringUtil.clobToString(((java.sql.Clob)info.get("RECEIPT"))));
							System.out.println("RECEIPT ::::" + info.get("RECEIPT"));
						}
					}
					
					Gson gson = new Gson();
					String jsonList = gson.toJson(  resultList );
					
					result.put("list", jsonList);
					result.put("totalCount", param.get("TOT_CNT"));
				}
			}*/
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
