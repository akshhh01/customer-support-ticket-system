//package com.dollop.app.config;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//	@Autowired
//	private BCryptPasswordEncoder passwordEncoder;
//	@Autowired
//	private UserDetailsService detailsService;
//
//	@Bean
//	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//		System.out.println("SecurityConfig/authenticationManager/configuration->"+configuration);
//		return configuration.getAuthenticationManager();
//	}
//
//	
//	public DaoAuthenticationProvider authenticationProvider() {
//		System.err.println("SecurityConfig/authenticationProvider");
//		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//		provider.setPasswordEncoder(passwordEncoder);
//		provider.setUserDetailsService(detailsService);
//		System.err.println("SecurityConfig/authenticationProvider provider->" +provider);
//		return provider;
//	}
//	
//	@Bean
//	public SecurityFilterChain configurePath(HttpSecurity http) throws Exception {
//	    System.out.println("SecurityConfig/configurePath/http ->" + http);
//
//	    http
//	        .cors(withDefaults()) // ✅ Enable CORS
//	        .csrf(csrf -> csrf.disable()) // ✅ Disable CSRF for testing (especially if frontend is calling APIs directly)
//	        .authorizeHttpRequests(request -> request
//	            .requestMatchers("/user/login","/user/register").permitAll()
//	            .requestMatchers("/user/getall").hasAuthority("ADMIN")
//	            .requestMatchers("/user/**" , "/ticket/**","/comment/**").hasRole("CUSTOMER")
//	            .requestMatchers("/user/**" , "/ticket/**","/comment/**").hasAuthority("CSR")
//	            .anyRequest().authenticated())
//	        .logout(logout -> logout.permitAll());
//	    return http.build();
//	}
//	
//
//
//	
//	@Bean
//	public CorsConfigurationSource corsConfigurationSource() {
//	    CorsConfiguration configuration = new CorsConfiguration();
//	    configuration.setAllowedOrigins(List.of("http://localhost:4200")); // frontend origin
//	    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//	    configuration.setAllowedHeaders(List.of("*"));
//	    configuration.setAllowCredentials(true);
//
//	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	    source.registerCorsConfiguration("/**", configuration);
//	    return source;
//	}
//
//}
package com.dollop.app.config;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.dollop.app.config.filter.JwtAuthFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    
    public SecurityConfig( JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }
   
    @Bean
    public SecurityFilterChain configurePath(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/user/login", "/user/register","/user/otp/**").permitAll()
                .requestMatchers("/user/getall","/user/filter/{date}").hasRole("ADMIN")
                .requestMatchers("/ticket/create").hasAnyRole("ADMIN","CUSTOMER","CSR")
                .requestMatchers("/comment/create","/ticket/get/**","/ticket/{id}/{status}","/comment/filter/{date}","/ticket/filter/{date}").hasAnyRole("ADMIN","CUSTOMER","CSR")
                .requestMatchers("/ticket/csr/get/**").hasAnyRole("CSR" , "ADMIN")
                .requestMatchers("/comment/get/**").authenticated()
                .anyRequest().authenticated()
            		).sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthFilter ,  UsernamePasswordAuthenticationFilter.class)
            .logout(logout -> logout.permitAll());
        return http.build();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200")); // Change for production
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
