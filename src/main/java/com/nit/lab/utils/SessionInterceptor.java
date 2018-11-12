package com.nit.lab.utils;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Description: SESSION拦截器，用于验证用户身份
 *
 * @Author: SN
 * @Date: 2017/2/22 14:52
 * 须手动添加tomcat library
 */
public class SessionInterceptor extends HandlerInterceptorAdapter {

    // 拦截前处理
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        HttpSession wjLoginSession = request.getSession();
        //UserDto userDto = (UserDto)wjLoginSession.getAttribute("wjLoginSession");
        if (true) {
            //response.setHeader("SESSIONSTATUS", "TIMEOUT");
            return true;
        } else {
            return true;
        }
        //return false;
    }

    // 拦截后处理
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object obj, ModelAndView mav)
            throws Exception {
    }

    // 全部完成后处理
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object obj, Exception e)
            throws Exception {
    }

}
