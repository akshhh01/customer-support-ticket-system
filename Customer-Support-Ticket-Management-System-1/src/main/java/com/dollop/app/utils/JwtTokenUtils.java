package com.dollop.app.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenUtils {
 
	    @Value("${jwt.secret}")
	    private String jwtSecret;

	    @Value("${jwt.expiration}")
	    private long jwtExpiration;

	    @Value("${jwt.refresh.expiration}")
	    private long refreshExpiration;
	
	  private SecretKey getSecretKey() {
	        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
	    }
	
	  // Generate access token with custom claims
	public String generateToken(String username, Map<String, Object> customClaims) {
		return Jwts.builder()
				.subject(username)
				.claims(customClaims)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis()+jwtExpiration))
				.signWith(getSecretKey())
				.compact();
	}
	
	// Overload for basic access token generation
    public String generateToken(String username) {
        return generateToken(username, new HashMap<>());
    }
    
	// Generate refresh token with custom claims
	public String generateRefreshToken(String username , Map<String , Object> custom) {
		return Jwts.builder()
				.subject(username)
				.claims(custom)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis()+refreshExpiration))
				.signWith(getSecretKey())
				.id(UUID.randomUUID().toString())
				.compact();
		}
	
	  // Overload for basic refresh token generation
    public String generateRefreshToken(String username) {
        return generateRefreshToken(username, new HashMap<>());
    }
	
    // Extract username from token
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }
	
 // Extract specific claim from token
    public <T> T getClaimFromToken(String token, String claimKey, Class<T> type) {
        Claims claims = Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.get(claimKey, type);
    }

    // Extract all claims
    public Map<String, Object> getAllClaimsFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return new HashMap<>(claims);
    }

    // Validate token
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
}

    