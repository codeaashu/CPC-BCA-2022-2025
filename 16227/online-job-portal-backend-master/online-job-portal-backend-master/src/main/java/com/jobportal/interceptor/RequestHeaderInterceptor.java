package com.jobportal.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestHeaderInterceptor implements HandlerInterceptor {

	private final Logger LOG = LoggerFactory.getLogger(RequestHeaderInterceptor.class);

	// This method is called before the controller's handler method is invoked
	// You can perform pre-processing here
	// If you return 'true', the request will continue processing; 'false' will stop
	// the request

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		LOG.info("preHandle() method invoked");

		LOG.info("---------------- Request Start ---------------");
		LOG.info("Request URL: " + request.getRequestURI());
		LOG.info("Method Type: " + request.getMethod());

		return true;
	}

	// This method is called after the controller's handler method is invoked but
	// before rendering the view
	// You can perform operations after the handler method and before rendering the
	// view

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// LOG.info("postHandle() method invoked");

		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}

	// This method is called after the request has been completed
	// You can perform cleanup or logging here

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

		LOG.info("afterCompletion() method invoked");

		LOG.info("Request URL: " + request.getRequestURI());
		LOG.info("Method Type: " + request.getMethod());
		LOG.info("Status: " + response.getStatus());
		LOG.info("---------------- Request End ---------------");

		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}

}
