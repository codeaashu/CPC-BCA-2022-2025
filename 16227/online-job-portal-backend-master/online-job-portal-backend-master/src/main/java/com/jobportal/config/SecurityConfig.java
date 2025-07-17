package com.jobportal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.jobportal.filter.JwtAuthFilter;
import com.jobportal.utility.Constants.UserRole;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtAuthFilter authFilter;

	@Bean
	// authentication
	public UserDetailsService userDetailsService() {
		return new CustomUserDetailsService();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable())
		        .cors(cors -> cors.disable())
		    
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/api/user/login", "/api/user/register").permitAll()
						
						// this APIs are only accessible by ADMIN
						.requestMatchers("/api/user/admin/register","/api/job/category/add", "/api/job/category/update",
								"/api/job/category/delete", "/api/user/fetch/role-wise", "/api/job/application/fetch/all")
						.hasAuthority(UserRole.ROLE_ADMIN.value())

						// this APIs are only accessible by EMPLOYEE
						.requestMatchers("/api/user/profile/add","/api/user/profile/skill/update", "/api/user/profile/work-experience/update",
								"/api/user/profile/education/update","/api/job/application/add","/api/job/application/fetch/all/employee")
						.hasAuthority(UserRole.ROLE_EMPLOYEE.value())
						
						// this APIs are only accessible by ADMIN & EMPLOYER
						.requestMatchers("/api/job/fetch/employer-wise","/api/job/application/fetch/all/employer")
						.hasAnyAuthority(UserRole.ROLE_ADMIN.value(), UserRole.ROLE_EMPLOYER.value())
						
						// this APIs are only accessible by EMPLOYER
						.requestMatchers("/api/job/add","/api/job/delete")
						.hasAuthority(UserRole.ROLE_EMPLOYER.value())
						
						// this APIs are only accessible by ADMIN & EMPLOYER
						.requestMatchers("/api/job/application/update/status")
						.hasAnyAuthority(UserRole.ROLE_EMPLOYEE.value(), UserRole.ROLE_EMPLOYER.value())
						
						.anyRequest()
						.permitAll())
		        
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();

	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService());
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}
