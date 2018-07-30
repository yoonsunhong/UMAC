package retail.login.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.common.SessionModel;
import retail.login.service.LoginService;
import retail.login.service.LoginVO;

/**
 * @Class Name : LoginController.java
 * @Description : 로그인
 * @Modification Information 
 * @author 문희훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class LoginController {

	@Autowired
	private LoginService loginService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 로그인페이지 이동 
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */ 
	@RequestMapping(value = "/login.do", method = RequestMethod.GET)
	public ModelAndView goLogin(HttpServletRequest request, HttpServletResponse response, ModelMap model)throws Exception 
	{
		
		ModelAndView mavLogin = new ModelAndView("retail/login/login");
		 
		    
		System.out.println("===========Server Start==========="); 
		request.setAttribute("ISLOGIN", "N");
		request.setAttribute("CONF",    "00");
		request.setAttribute("USERNAME", "");
		request.setAttribute("CORP_CODE", "");
		
		return mavLogin;
 
	}
	 
	
	
	/**
	 * 로그인 요청
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/login.do", method=RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> login( HttpServletRequest request,HttpServletResponse response )throws Exception {
		
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		try {
			 
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			ArrayList<Object> CUR = new ArrayList<Object>();
			
			
			paramMap.put("P_USER_ID", request.getParameter("USER_ID"));
			paramMap.put("P_PASSWD_NO", request.getParameter("PASSWD_NO"));
			paramMap.put("CUR", CUR);
			
			//로그인요청
			loginService.login(paramMap);
			
			
			List<LoginVO> RETURN_CUR = (List<LoginVO>) paramMap.get("CUR");
			
			//System.out.println(RETURN_CUR.get(0).getUSER_ID());
			if(RETURN_CUR.size() != 0){
				SessionModel env = new SessionModel();
				env.setUserId(RETURN_CUR.get(0).getUSER_ID()); 
				env.setUserNm(RETURN_CUR.get(0).getUSER_NM());  
				env.setCORP_CODE(RETURN_CUR.get(0).getCORP_CODE());
				
				env.setGROUP_CODE(RETURN_CUR.get(0).getGROUP_CODE());
				env.setSTR_CODE(RETURN_CUR.get(0).getSTR_CODE());
				env.setSTR_NAME(RETURN_CUR.get(0).getSTR_NAME());
				env.setDEPT_CODE(RETURN_CUR.get(0).getDEPT_CODE());
				env.setPOSITION(RETURN_CUR.get(0).getPOSITION());
				env.setEMP_DUTY(RETURN_CUR.get(0).getEMP_DUTY());
				env.setSYS_CODE(RETURN_CUR.get(0).getSYS_CODE());
				env.setLIMIT_LEVEL(RETURN_CUR.get(0).getLIMIT_LEVEL());
				env.setROLE_ID(RETURN_CUR.get(0).getROLE_ID());
				
				//사용자 권한별 버튼 활성권한 저장
				env.setAUTH_SEARCH(RETURN_CUR.get(0).getAUTH_SEARCH());
				env.setAUTH_NEW(RETURN_CUR.get(0).getAUTH_NEW());
				env.setAUTH_SAVE(RETURN_CUR.get(0).getAUTH_SAVE());
				env.setAUTH_DELETE(RETURN_CUR.get(0).getAUTH_DELETE());
				env.setAUTH_EXCEL_DOWN(RETURN_CUR.get(0).getAUTH_EXCEL_DOWN());
				env.setAUTH_EXCEL_UPLOAD(RETURN_CUR.get(0).getAUTH_EXCEL_UPLOAD());
				env.setAUTH_PRINT(RETURN_CUR.get(0).getAUTH_PRINT());
				env.setAUTH_SUBMIT(RETURN_CUR.get(0).getAUTH_SUBMIT());
				env.setAUTH_CREATE(RETURN_CUR.get(0).getAUTH_CREATE());
				 
				CommonUtil.setEnv(request.getSession(), env); 
				
				map.put("MESSAGE_CODE", "0000");
			}else{
				map.put("MESSAGE_CODE", "9999");
			}
			
		} catch (IOException e) {
			System.err.println("IOException Occured");
		}
		
		
		return map;
	}
	
	
	/**
	 * 비밀번호 변경
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/changeUserPassward.do", method=RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object>  changeUserPassward( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		LoginVO CUR = new LoginVO(); 
		
		LoginVO loginVO = new LoginVO(); 
		  
		map.put("P_USER_ID", request.getParameter("USER_ID"));
		map.put("P_PASSWD_NO", request.getParameter("USER_PW"));
		map.put("P_NEW_PASSWD_NO", request.getParameter("USER_AFTER_PW"));
		map.put("CUR", CUR);
		
		//비밀번호 변경
		/**
		 * 메세지 코드정의
		 * 0001 : 아이디가 존재하지 않음 
		 * 0002 : 아이디는 있으나 비밀번호입력 틀림
		 * 0000 : 아이디, 비밀번호가 모두 맞음 -> 비밀번호 변경처리
		 * */
		
		loginService.changeUserPassward(map);
		
		return map;
	}	

	/**
	 * 로그아웃 요청
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/logout.do", method = RequestMethod.GET)
	public ModelAndView goLogout(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		 
		CommonUtil.setEnv(request.getSession() , null);
		ModelAndView mav = new  ModelAndView("retail/login/logout");
		
		return   mav; 
	}
	
	
	/**
	 * 북마크 설정(즐겨찾기)
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/setMyBookMark.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  setMyBookMark( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_PROGRAM_ID", request.getParameter("PROGRAM_ID"));
		paramMap.put("P_FLAG", request.getParameter("FLAG"));
		paramMap.put("P_USER_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//북마크 설정(즐겨찾기)  
		loginService.setMyBookMark(paramMap);
 
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}	
	
	/**
	 * 즐겨찾기 등록여부 조회
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/getBookMarkStat.do", method=RequestMethod.POST, produces = "application/text; charset=utf8")
	//@ResponseBody 
	public void getBookMarkStat( HttpServletRequest request,HttpServletResponse response  )throws Exception {
		 
		 Map<String, Object>  paramMap = new HashMap<String, Object>();
		 ArrayList<Object> CUR = new ArrayList<Object>();
		
		 //request.getParameter("")
		 paramMap.put("P_PROGRAM_ID", request.getParameter("CLASS_NM"));
		 paramMap.put("P_USER_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		 paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		 paramMap.put("CUR", CUR);
		  
		 //즐겨찾기 등록여부 조회
		 loginService.getBookMarkStat(paramMap);
		 
		 Gson gson = new Gson(); 
		 String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		 System.out.println(jsonStr);
		 response.setContentType("text/json; charset=utf-8");
		 response.getWriter().print(jsonStr);
		 
	}
	

	@RequestMapping(value = "/error.do", method = RequestMethod.GET)
	public ModelAndView goerror(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		 
		CommonUtil.setEnv(request.getSession() , null);
		ModelAndView mav = new  ModelAndView("retail/login/error");
		
		return   mav; 
	}
	
	@RequestMapping(value = "/errorServlet.do", method = RequestMethod.GET)
	public ModelAndView goerrorServlet(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		 
		CommonUtil.setEnv(request.getSession() , null);
		ModelAndView mav = new  ModelAndView("retail/login/errorServlet");
		
		return   mav; 
	}
	
	@RequestMapping(value = "/errorLogout.do", method = RequestMethod.GET)
	public ModelAndView goerrorLogout(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		 
		CommonUtil.setEnv(request.getSession() , null);
		ModelAndView mav = new  ModelAndView("retail/login/errorLogout");
		
		return   mav; 
	}
	
	

}
