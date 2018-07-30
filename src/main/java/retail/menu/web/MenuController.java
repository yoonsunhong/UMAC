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
package retail.menu.web;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.menu.service.MenuService;
import retail.menu.service.MenuVO;



/**
 * @Class Name : MenuController.java
 * @Description : 메뉴관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 문희훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class MenuController {

	@Autowired
	private MenuService menuService;

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
	@RequestMapping(value = "/menuManagement.do", method = RequestMethod.GET)
	public ModelAndView menuManagement(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/menu/menu_management"); 
		 
		return   mav; 
	}
	
	
	

	/**
	 * 메뉴관리의 트리메뉴 리스트 조회
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getMenuTree.do", method = RequestMethod.POST)
	@ResponseBody
	public void getMenuTree(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		menuService.getMenuTree(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 	
	}
	  
	
	/**
	 * 메뉴수정  
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateMenuInfo.do", method=RequestMethod.POST)
	@ResponseBody
	public void updateMenuInfo( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		//request.getParameter("")
		paramMap.put("P_MENU_ID", request.getParameter("MENU_ID"));
		paramMap.put("P_USE_YN", request.getParameter("USE_YN"));
		paramMap.put("P_BIGO", request.getParameter("BIGO")); 
		paramMap.put("P_CLASS_NM", request.getParameter("CLASS_NM"));
		paramMap.put("P_SORT_ORDER", request.getParameter("SORT_ORDER"));
		paramMap.put("P_UPD_IP", CommonUtil.getIpAddr());
		paramMap.put("P_UPD_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_MENU_NM", request.getParameter("MENU_NM"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		menuService.updateMenuInfo(paramMap);
		
	}
	
	
	
	/**
	 * 메뉴 저장  
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/insertMenuInfo.do", method=RequestMethod.POST)
	@ResponseBody
	public void insertMenuInfo( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		//request.getParameter("")
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_MENU_ID", request.getParameter("MENU_ID"));
		paramMap.put("P_MENU_NM", request.getParameter("MENU_NM"));
		paramMap.put("P_UP_MENU_ID", request.getParameter("UP_MENU_ID"));
		paramMap.put("P_SORT_ORDER", request.getParameter("SORT_ORDER"));
		paramMap.put("P_MENU_GB", request.getParameter("MENU_GB"));
		paramMap.put("P_CLASS_NM", request.getParameter("CLASS_NM"));
		paramMap.put("P_BIGO", request.getParameter("BIGO"));
		paramMap.put("P_USE_YN", request.getParameter("USE_YN"));
		paramMap.put("P_REG_IP", CommonUtil.getIpAddr());
		paramMap.put("P_REG_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		menuService.insertMenuInfo(paramMap);
		 
	}
	
	/**
	 * 메뉴삭제 취소
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/deleteMenuInfo.do", method=RequestMethod.POST)
	@ResponseBody
	public void deleteMenuInfo( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		//request.getParameter("")
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_MENU_ID", request.getParameter("MENU_ID"));
		paramMap.put("CUR", CUR);
		
		menuService.deleteMenuInfo(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
		
		
	/**
	 * 메뉴 도움말 정보 가져오기 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/selectMenuBigo.do", method=RequestMethod.POST, produces = "application/text; charset=utf8")
	//@ResponseBody 
	public void selectMenuBigo( HttpServletRequest request,HttpServletResponse response  )throws Exception {
		 
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		 ArrayList<Object> CUR = new ArrayList<Object>();
		
		 //request.getParameter("")
		 paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		 paramMap.put("P_CLASS_NM", request.getParameter("CLASS_NM"));
		 paramMap.put("CUR", CUR);
		  
		 menuService.selectMenuBigo(paramMap);
		 
		 Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
		 /*List<MenuVO> resultList = (List<MenuVO>)paramMap.get("CUR");
		 System.out.println("BIGO : " + resultList.get(0).getBIGO());
		 return resultList.get(0).getBIGO();*/
	}

}
