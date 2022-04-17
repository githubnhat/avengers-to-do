package com.avengers.todo.common;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.avengers.todo.entity.Users;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Slf4j
@Component
public class JwtService {

    private static final Algorithm algorithm = Algorithm.HMAC256(Constant.SECRET_KEY);
    @Value("${token.life-time-hours}")
    private int tokenLifeTimeHours;

    public boolean isValidToken(String token) {
        return !isNoneValidToken(token);
    }

    private boolean isNoneValidToken(String token) {
        if (StringUtils.isEmpty(token)) return true;
        try {
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decoded = verifier.verify(token);
            Long expiredTime = decoded.getExpiresAt().getTime();
            return System.currentTimeMillis() >= expiredTime;
        } catch (JWTVerificationException ex) {
            log.error("Token is invalid: {}", token, ex);
        }
        return true;
    }

    public Users getUserFromToken(String token) {
        if (isNoneValidToken(token)) return null;
        return Users.builder()
                .username(JWT.decode(token).getSubject())
                .build();
    }

    public String generateToken(Users user) {
        return this.getToken(user, this.tokenLifeTimeHours);
    }

    private String getToken(Users appUser, int expiredHours) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR, expiredHours);

        JWTCreator.Builder creator = JWT.create()
                .withSubject(appUser.getUsername())
                .withExpiresAt(calendar.getTime())
                .withIssuedAt(new Date())
                .withClaim("fullName", appUser.getFullName());
        return creator.sign(algorithm);
    }
}