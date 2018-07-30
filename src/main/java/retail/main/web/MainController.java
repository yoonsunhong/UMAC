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
package retail.main.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;





import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.common.JqGridResult;
import retail.main.service.MainService;
import retail.main.service.MainVO;

/**
 * @Class Name : MainController.java
 * @Description : 메인화면
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ 
 * @author 문희훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class MainController {

	@Autowired
	private MainService mainService;
	@Autowired
	private MessageSource messageSource;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 대메뉴 만들기
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/main.do", method = RequestMethod.GET)
	public ModelAndView goMain(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		
		//세션체크
		//CommonUtil.validateSession(request);
	
		ModelAndView mav = new  ModelAndView("retail/main/main");
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_USER_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		mainService.getBigMenu(paramMap); 
		
		List<MainVO> getBigMenu = (List<MainVO>) paramMap.get("CUR");
		mav.addObject("getBigMenu", getBigMenu);
			
		return   mav; 
	}
	
	/*@RequestMapping(value = "/main.do", method = RequestMethod.GET)
	public ModelAndView goMain(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		
			//세션체크
			//CommonUtil.validateSession(request);
		
			ModelAndView mav = new  ModelAndView("retail/main/main");
			
			MainVO params = new MainVO();
			params.setUSER_ID(CommonUtil.getEnv(request.getSession()).getUserId());
			params.setCORP_CODE(CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			List<MainVO> getBigMenu = mainService.getBigMenu(params); 
			mav.addObject("getBigMenu",getBigMenu);
			
		return   mav; 
	}*/
	
	/**
	 * 다국어 언어 변경
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/location/changLang.do", method = RequestMethod.GET)
	public ModelAndView goLogout(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		 
		ModelAndView mav = new  ModelAndView("retail/main/location");
		/*System.out.println(request.getParameter("lang"));*/
		mav.addObject("lang",request.getParameter("lang"));
		
		return   mav; 
	}
	
	
	/**
	 * 중메뉴 만들기.  
	 * @param menu_id 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getMiddleMenu.do", method = RequestMethod.POST)
	public void getMiddleMenu(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_USER_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_MENU_ID", request.getParameter("MENU_ID"));
		paramMap.put("CUR", CUR);
		
		mainService.getMiddleMenu(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 	
	}
	
	/*@RequestMapping(value = "/getMiddleMenu.do", method = RequestMethod.POST)
	public void getMiddleMenu(HttpServletRequest request, HttpServletResponse response )throws Exception { 

		MainVO result = new MainVO();
		String menu_id = request.getParameter("menu_id");
		
		MainVO params = new MainVO();
		
		params.setMENU_ID(menu_id);
		
		// System.out.println("공통세션 정보 : " + CommonUtil.getEnv(request.getSession()));
		
		params.setUSER_ID(CommonUtil.getEnv(request.getSession()).getUserId());
		params.setCORP_CODE(CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		List<MainVO> getMiddleMenu = mainService.getMiddleMenu(params);
		
		JqGridResult jqGridResult = new JqGridResult(getMiddleMenu.size());
		
		for(MainVO MainVO : getMiddleMenu) {
			jqGridResult.addData(
					//key  
					 MainVO.getMENU_ID() 
               		,MainVO.getMENU_NM() 
					,MainVO.getCLASS_NM()
					,MainVO.getMENU_GB()
					);
		}
		String jsonStr = jqGridResult.getJsonString();
		// System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 	
	}*/
	
	/**
	 * 즐겨찾기 메뉴 조회
	 * @param menu_id 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getBookMarkMenu.do", method = RequestMethod.POST)
	public void getBookMarkMenu(HttpServletRequest request, HttpServletResponse response )throws Exception { 

		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_USER_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		//즐겨찾기 메뉴 조회
		mainService.getBookMarkMenu(paramMap);
		
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);	
		
	}
	 
	
	/**
	 * 메인화면
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mainContents.do", method = RequestMethod.GET)
	public ModelAndView mainContents(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		
		/**
		 * 다국어 프로퍼티 가지고 오는 샘플
		 * */
		String korMessage = messageSource.getMessage("title.sample.regUser",null, "no surch", Locale.KOREA);
		String engMessage = messageSource.getMessage("title.sample.regUser",null, "no surch", Locale.ENGLISH);
		System.out.println("KOR: "+korMessage+" ENG: "+engMessage);
		
		ModelAndView mav = new  ModelAndView("retail/main/main_contents");
		return   mav; 
	}

}
