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
package retail.posmaster.alram.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.common.SessionModel;
import retail.common.service.CommService;
import retail.posmaster.alram.service.PosMasterAlramService;

/**
 * 
 * @Class Name : PosMasterAlramController.java
 * @Description : POS관리 > POS안내문관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.26           최초생성
 *
 * @author 김경진
 * @since 2016. 12. 26.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PosMasterAlramController {

	@Autowired
	private PosMasterAlramService posMasterAlramService;
	
	@Autowired
	private CommService commService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * POS안내문관리 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posMasterAlram.do", method = RequestMethod.GET)
	public ModelAndView posMasterAlram(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posmaster/alram/posMasterAlram");
		
		return mav; 
	}
	
	/**
	 * 점포의 안내문번호 가져오기
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/getLogNoList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getPosList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		try {
			
			String dStrCode = EgovStringUtil.isNullToString(param.get("D_STR_CODE"), "");
			String pStrCode = EgovStringUtil.isNullToString(param.get("P_STR_CODE"), "");
			if("".equals(pStrCode))
				param.put("P_STR_CODE", dStrCode);
			
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			
			log.debug("param :: " + param.toString());
			List<Map<String, Object>> logNoList = posMasterAlramService.getPosMasterAlramLogNo(param);
			log.debug("result :: " + logNoList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  logNoList );
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * POS안내문관리 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posMasterAlramList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posMasterAlramList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = posMasterAlramService.getPosMasterAlram(param);
			log.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * POS안내문관리 등록, 수정, 삭제 
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosMasterAlram.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosMasterAlram(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			String type = EgovStringUtil.isNullToString(param.get("D_TYPE"), "");
			
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("D_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("D_USER_ID", sessionModel.getUserId());
			
			/*if("insert".equals(type) || "update".equals(type))
			{
				String msg = "";
				for(int i=1; i<=8; i++)	// 안내메세지 8개 고정
				{
					msg = EgovStringUtil.isNullToString(param.get("MSG_"+i), "");
					if(!"".equals(msg))
					{
						if(i < 5)
						{
							param.put("D_POSITION_FLAG", "0");
						}
						else
						{
							param.put("D_POSITION_FLAG", "1");
						}
						param.put("D_SEQ", i);
						param.put("D_MSG", msg);
						
						log.debug("param :: " + param.toString());
						param = posMasterAlramService.updatePosMasterAlram(param);
						log.debug("result :: " + param);
					}
				}
			}
			else
			{
				log.debug("param :: " + param.toString());
				param = posMasterAlramService.updatePosMasterAlram(param);
				log.debug("result :: " + param);
			}*/
			
			log.debug("param :: " + param.toString());
			param = posMasterAlramService.updatePosMasterAlram(param);
			log.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
