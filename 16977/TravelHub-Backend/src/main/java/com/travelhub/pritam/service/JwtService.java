package com.travelhub.pritam.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.travelhub.pritam.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class JwtService {
	@Value("${spring.secretkey}")
	private  String SECRET;
	private SecretKey key;
	
	@PostConstruct
	public void init() {
		this.key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
	}
	
	public String generateToken(User user) {
	    return Jwts.builder()
	            .setSubject(user.getUsername())
	            .claim("role", user.getRole().name()) // ✅ Add role claim
	            .setIssuedAt(new Date(System.currentTimeMillis()))
	            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
	            .signWith(key, SignatureAlgorithm.HS256)
	            .compact();
	}

	
//	
//	public String generateToken(String username) {
//		return Jwts.builder()
//				.setSubject(username)
//				.setIssuedAt(new Date(System.currentTimeMillis()))
//				.setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 60 * 10))
//				.signWith(key, SignatureAlgorithm.HS256)
//				.compact();
//	}
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
	public boolean isTokenValid(String token, String username) {
		return (extractUsername(token).equals(username) && !isTokenExpired(token));
	}
	
	public boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	    final Claims claims = extractAllClaims(token);
	    return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder()
	            .setSigningKey(key)
	            .build()
	            .parseClaimsJws(token)
	            .getBody();
	}

	
}
