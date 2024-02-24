package the.framemy.filter;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import the.framemy.service.AuthorizationService;
import the.framemy.util.JwtUtil;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class RequestValidator extends OncePerRequestFilter {

    private static final String AUTH_PREFIX = "Bearer ";
    private final AuthorizationService authorizationService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        var authorizationHeader = httpServletRequest.getHeader("Authorization");

        String email = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith(AUTH_PREFIX)) {
            jwt = authorizationHeader.substring(AUTH_PREFIX.length());
            try {
                email = jwtUtil.getUser(jwt);
            } catch (ExpiredJwtException ex) {
                httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization failure");
                return;
            }

        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            var userDetails = authorizationService.loadUserByUsername(email);

            if (jwtUtil.validateToken(jwt, userDetails)) {
                var usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                usernamePasswordAuthenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(
                                httpServletRequest
                        )
                );
                SecurityContextHolder.getContext()
                        .setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
