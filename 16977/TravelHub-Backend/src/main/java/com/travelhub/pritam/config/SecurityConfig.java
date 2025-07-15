package com.travelhub.pritam.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.travelhub.pritam.filter.JwtFilter;
import com.travelhub.pritam.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtFilter jwtFilter;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	   
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration config = new CorsConfiguration();
	    config.addAllowedOrigin("http://127.0.0.1:5500"); // your frontend origin
	    config.addAllowedHeader("*");
	    config.addAllowedMethod("*");
	    config.setAllowCredentials(true);

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);
	    return source;
	}

	   @Bean
	   public AuthenticationManager authenticationManager(
	           AuthenticationConfiguration config) throws Exception {
	       return config.getAuthenticationManager();
	   }
	   
	   @Bean
	   public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
	       http
	           .csrf(csrf -> csrf.disable())
	           .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	           .authorizeHttpRequests(auth -> auth
	               .requestMatchers("/api/auth/**").permitAll()
	               .requestMatchers("/api/mail/send","api/user/**").hasAnyRole("SELLER","ADMIN","BUYER")
	               .requestMatchers("/api/admin/**").hasRole("ADMIN")
	               .requestMatchers("/api/user/**").hasAnyRole("ADMIN", "BUYER", "SELLER")
	               .requestMatchers("/api/hotels/search", "/api/hotels/{id}", "/api/hotels/all").permitAll()
	               .requestMatchers("/api/hotels/add").hasAnyRole("SELLER", "ADMIN")
	               .requestMatchers("/api/buyer/**").hasAnyRole("BUYER", "ADMIN")
	               .requestMatchers("/api/seller/**").hasAnyRole("SELLER", "ADMIN")
	               .anyRequest().authenticated()
	           )
	           .cors(cors -> cors.configurationSource(corsConfigurationSource)) // ✅ modern way
	           .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	       return http.build();
	   }


}
