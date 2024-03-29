package the.framemy.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import the.framemy.model.User;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Service
public class JwtUtil {
    private final String SECRET_KEY;

    public JwtUtil(@Value("${jwt.secret}") String SECRET_KEY) {
        this.SECRET_KEY = SECRET_KEY;
    }

    public String getUser(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date getExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, user.getEmail(), user.getId(), user.getRoles().toArray()[0]);
    }

    private String createToken(Map<String, Object> claims, String subject, Object id, Object role) {

        return Jwts.builder().setClaims(claims).setSubject(subject)
                .addClaims(Collections.singletonMap("id", id))
                .addClaims(Collections.singletonMap("role", role))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(12)))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();

    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUser(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
