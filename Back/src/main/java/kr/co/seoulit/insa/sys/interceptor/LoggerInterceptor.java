package kr.co.seoulit.insa.sys.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@SuppressWarnings("deprecation")
public class LoggerInterceptor extends HandlerInterceptorAdapter{
	private final Log log = LogFactory.getLog(getClass());
	private static final String SECRET_KEY = "dkssudsksmstlflqekgkrhtlvdjTeksrhdtjddnrdlfkrhgoakssktjqkdrkqkdrk";

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		// 로그인 요청에 대한 JWT 토큰 검증을 건너뛰기
		if (request.getRequestURI().equals("/hr/login/login")) {
			System.out.println("request : "+ request);
			return true;
		} else {
			System.out.println("request : "+ request);
			String token = request.getParameter("token");
			System.out.println("token : " + token);
			try {
				// 토큰 검증
				Claims claims = Jwts.parserBuilder()
						.setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
						.build()
						.parseClaimsJws(token)
						.getBody();
				String result = claims.getSubject();
				System.out.println("요청사원 : "+ result);
				log.debug("======================================          START         ======================================");
				log.debug(" Request URI \t:  " + request.getRequestURI());
				return super.preHandle(request, response, handler);
			} catch (Exception e) {
				System.out.println("This is not an authorized token. token : " + e.getMessage());
				return false;
			}
		}
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		log.debug("======================================           END          ======================================\n");
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		if(ex!=null) {
			log.debug("======================================           END          ======================================\n");
		}
		super.afterCompletion(request, response, handler, ex);
	}
	
}
