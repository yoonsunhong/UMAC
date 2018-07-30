package retail.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SessionCheckInterceptor extends HandlerInterceptorAdapter {
	
	
	/**
	 * 설 명 : controller 호출 전 session 체크
	 * 		interface관련 특정 channal 및 loginController 제외
	 * 		하고 체크한다.
	 * @param request
	 * @param response
	 * @param handler
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		//System.out.println("pre Handle");
		
		for(String channal : BaseEnv.CHANNAL_LIST) {
			/* 등록되어 있는 체널 목록과 요청체널이 같은경우는 session 체크 pass */
			if(channal.equals(request.getParameter(BaseEnv.OUTSIDE_CHANNAL))) {
				return super.preHandle(request, response, handler);
			}
		}
		
		/* session  검사 */
		CommonUtil.validateSession(request);
		
		return super.preHandle(request, response, handler);
	}
	
	@Override
	public void postHandle(HttpServletRequest httpservletrequest, HttpServletResponse httpservletresponse, Object obj, ModelAndView modelandview)
			throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest httpservletrequest, HttpServletResponse httpservletresponse, Object obj, Exception exception) 
			throws Exception {
	}
	    
	
}