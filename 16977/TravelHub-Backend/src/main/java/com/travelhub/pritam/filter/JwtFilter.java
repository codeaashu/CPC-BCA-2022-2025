package com.travelhub.pritam.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.travelhub.pritam.service.JwtService;
import com.travelhub.pritam.service.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtFilter extends OncePerRequestFilter {
	
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {

	    final String authHeader = request.getHeader("Authorization");
	    String username = null;
	    String jwt = null;

	    if (authHeader != null && authHeader.startsWith("Bearer ")) {
	        jwt = authHeader.substring(7);
	        try {
	            username = jwtService.extractUsername(jwt);
	        } catch (Exception e) {
	            System.out.println("Invalid JWT Token");
	        }
	    }

	    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	    	UserDetails userDetails = userDetailsService.loadUserByUsername(username);
	        if (jwtService.isTokenValid(jwt, userDetails.getUsername())) {
	            
	            UsernamePasswordAuthenticationToken authToken =
	            		 new UsernamePasswordAuthenticationToken(
	                             userDetails, // ✅ This must be UserPrincipal
	                             null,
	                             userDetails.getAuthorities()
	                     );
	            SecurityContextHolder.getContext().setAuthentication(authToken);
	        }
	    }

	    filterChain.doFilter(request, response);
	}

}
